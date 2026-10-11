# Quality gate mais rápido — paralelismo e seleção por impacto

Status: **implementado** (P1, P2, P4, P5; P3 avaliado e não adotado) · 2026-10-11 · Autor: Maurício Yokoyama Issei (com Claude)
Complementa a seção "CI/CD Integration" de [`TESTING_GUIDE.md`](TESTING_GUIDE.md).
Resultado e decisões: [§8](#8-implementação-e-medições-2026-10-11). As seções 1–7 são o plano original.

## 1. Problema

`npm run gate` passou de 10 minutos em 2026-10-11 e foi abortado. O gate local
roda tudo, em sequência e nos 5 projetos do Playwright, mesmo quando a mudança é
um parágrafo de uma página.

O CI já é paralelo: o job estático roda ao lado de 6 shards do Playwright
(`.github/workflows/quality-gate.yml`), e o PR roda só a camada `fast`. O gargalo
é o **gate local**.

## 2. Medições (máquina local, 8 núcleos, 2026-10-11)

| Etapa | Tempo | Depende de `dist/` |
| --- | --- | --- |
| `vite build` | 39,5 s | — |
| gêmeos `.md` do sitemap | 0,3 s | sim |
| artefatos gerados em dia (5 `--check`) | 1,7 s | não |
| espelhos `/en/` em dia | 0,4 s | não |
| coerência global (`audit-site`) | 0,3 s | não |
| invariantes `node:test` | 5,0 s | não |
| **Playwright** | **não medido inteiro** (estimativa abaixo) | não (dev server) |
| a11y: varredura WCAG (catraca) | **191 s** | sim |
| a11y: gate estático (`verify-a11y.py`) | 9,0 s | não |
| orçamento de performance | 0,2 s | sim |

Soma das etapas sem Playwright: cerca de **247 s**, em série.

**Playwright:** 9.286 testes = 3.023 × 3 navegadores (chromium, firefox, webkit) +
56 (mobile) + 161 (no-js), em 286 arquivos. Local: `workers: '50%'` (4), dev
server do Vite, `retries: 1`.

No CI (run 38105766894, camada `full`, 2 workers por shard), os 6 shards levaram
204, 284, 294, 306, 398 e 408 s, cerca de 1.900 s de runner. Descontando ~70 s de
setup por shard, são ~2.950 s de worker. Com 4 workers locais, isso dá **~12 min**
só de Playwright, mais ~4 min das etapas em série: **~16 min**. Bate com o que
vimos.

Duas observações:

- **Os shards estão desbalanceados** (204 s × 408 s). O caminho crítico do CI é o
  shard mais lento, não a média.
- **A varredura a11y (191 s) mede as 80 páginas** em toda execução, inclusive
  quando só uma mudou.

## 3. Propostas, por ganho

### P1 — Seleção por impacto no gate local (maior ganho)

O gate local passa a ter duas camadas, como o CI:

- **`npm run gate` (padrão: impacto).** Calcula os arquivos alterados
  (`git diff --name-only origin/main...HEAD` + working tree) e roda:
  - Playwright **só no Chromium**, e só as specs das páginas tocadas. Convenção
    já existente: `src/<pagina>.html` → `tests/<pagina>*.spec.js`.
  - As specs transversais (que percorrem todas as páginas, como `label-in-name`,
    `aeo.spec.js` e `independent.spec.js`) **filtradas para as páginas tocadas**,
    via variável de ambiente lida pela spec (ex.: `GATE_PAGES=a,b`).
  - `a11y-sweep --only` nas páginas tocadas (PT e EN).
- **`npm run gate -- --full`.** O comportamento de hoje, sem mudança.

**Escalada automática para `--full`** quando a mudança toca algo compartilhado:
`src/js/shared/**`, CSS global, `vite.config.*`, `playwright.config.*`,
`scripts/seo/lib.mjs`, `tests/_helpers/**`, `package*.json`. A lista fica em um
arquivo só e é testada.

**Ganho estimado:** mudança em uma página cai de ~16 min para **~1,5–2 min**
(build de 40 s em paralelo com o estático, dezenas de testes no Chromium, sweep
de 2 páginas em ~10 s).

**Risco:** uma página quebrar outra (link, SSOT, ecossistema). Mitigação: o
`audit-site --strict` (0,3 s) continua rodando sempre, porque olha o grafo
inteiro; e o CI continua rodando tudo. O gate imprime o que **não** rodou, para o
resultado nunca parecer mais amplo do que foi.

### P2 — Etapas estáticas em paralelo

Hoje `quality-gate.mjs` usa `spawnSync` em série. Dois grupos:

- **Sem `dist/`:** gerados, i18n, `audit-site`, `node:test`, `a11y-static`
  (~17 s em série). Rodam **ao mesmo tempo que o `vite build`**.
- **Com `dist/`:** gêmeos `.md`, `perf-budget`, `a11y-sweep`. Rodam depois do
  build, em paralelo entre si e **em paralelo com o Playwright** (que usa o dev
  server, não `dist/`).

Fail-closed continua: na primeira falha, o gate mata os processos irmãos e sai
com o código da etapa que falhou. A saída de cada etapa fica em buffer e é
impressa inteira, em ordem, para não intercalar logs.

**Ganho estimado:** no `--full`, as etapas sem Playwright passam de ~247 s para
~40 s no caminho crítico, porque a varredura a11y (191 s) sai do caminho crítico
e corre junto com o Playwright.

### P3 — Playwright contra o build (`vite preview`) em vez do dev server

O próprio `playwright.config.js` registra o motivo do `retries: 1` local: no dev
server, o CSS chega por JavaScript e o axe mede contraste antes da cor temática
(FOUC). Contra o build, o CSS é arquivo real:

- some a causa das falhas rotativas de contraste, e com ela o retry;
- as páginas carregam mais rápido (sem transformação sob demanda do Vite);
- abre espaço para subir `workers` acima de 50%, que hoje foi reduzido por
  determinismo.

**Risco:** afeta as 500+ asserções existentes. Merece PR próprio, depois de P1 e
P2, com a suíte completa rodando nas duas configurações para comparar.

### P4 — Balancear os shards do CI

Com `fullyParallel: true`, o Playwright divide os testes por **contagem**, não
por duração. Os testes de Tab no WebKit (~1,7 s por parada, ~126 paradas na
home) pesam muito mais que a média e caem em poucos shards.

- Marcar os testes caros com a tag `@lento` e rodá-los em um job próprio
  (`--grep @lento`), com os 6 shards rodando `--grep-invert @lento`.
- Medir de novo e ajustar `SHARD_TOTAL`.

**Ganho estimado:** caminho crítico do CI de ~408 s para perto da média (~315 s),
sem mais runners.

### P5 — Instrumentação (pré-requisito barato)

- `quality-gate.mjs` imprime o tempo de cada etapa e um resumo no fim.
- Um relatório JSON do Playwright (`--reporter=json`) local, e um script que
  lista as 20 specs mais lentas. Sem isso, P4 é chute.

## 4. Ordem de implementação

1. **P5** — instrumentação (pequena; mede a linha de base de verdade).
2. **P2** — paralelismo estático (só `quality-gate.mjs`; nenhum teste muda).
3. **P1** — seleção por impacto + `--full` + escalada automática. Inclui um
   `node:test` para o mapeamento arquivo → specs e para a lista de escalada.
4. **P4** — balanceamento do CI, com os números de P5.
5. **P3** — `vite preview`, em PR separado.

## 5. O que não muda

- **Fail-closed:** a primeira falha derruba o gate, em qualquer camada.
- **Catraca a11y:** o baseline só desce. Com `--only`, compara só as páginas
  medidas (já é o comportamento do `a11y-sweep`).
- **CI:** continua rodando tudo (`fast` no PR, `full` em `main`, nightly e
  manual). A seleção por impacto é só local.
- **Hook de Stop** (`scripts/stop-gate.mjs`): continua no smoke rápido.

## 6. Achados laterais (fora deste plano, registrados para não se perderem)

- **`scripts/seo/build-aeo.mjs` não é idempotente.** Rodado em 2026-10-11,
  reescreveu outras 30 páginas (linhas de comentário duplicadas, blocos
  `a11y-skip` e `a11y-motion` reinseridos, linhas em branco). Precisa de um teste
  "rodar duas vezes não muda nada" e da correção.
- **Regra `freshness` do `verify-a11y.py`.** Qualquer commit em `src/`, mesmo só
  de texto, deixa o gate estático vermelho até alguém registrar uma nota no
  `REPORT.md` (foi o caso da nota 14). Não é tempo de máquina, mas é custo por PR.
  Avaliar restringir a regra a mudanças de marcação, CSS ou JS.

## 7. Critérios de aceite

- [ ] Mudança em uma página: `npm run gate` termina em menos de 3 min, com a
      lista do que rodou e do que não rodou.
- [ ] `npm run gate -- --full` cobre exatamente o que o gate de hoje cobre.
- [ ] Mudança em arquivo compartilhado escala para `--full` sem flag manual.
- [ ] Falha em qualquer etapa paralela sai ≠ 0 e mata as irmãs.
- [ ] Shard mais lento do CI `full` a no máximo 1,2× a média.

## 8. Implementação e medições (2026-10-11)

### 8.1 A causa principal não estava no plano

`playwright.config.js` usa `testDir: '.'` com `testMatch: 'tests/**/*.spec.js'`.
O glob também casava com as cópias do repositório em `.claude/worktrees/` (6
worktrees de sessões antigas): **9.286 testes locais contra 1.381 reais**, quase
7× o trabalho. No CI não há worktrees, por isso o CI nunca mostrou o problema.
Correção: `SEMPRE_IGNORAR` (`.claude`, `node_modules`, `dist`) no `testIgnore` de
todo projeto (o de projeto substitui o global).

### 8.2 O que entrou

| Item | Onde | Efeito |
| --- | --- | --- |
| Worktrees fora da suíte | `playwright.config.js` | 9.286 → 1.381 testes locais |
| P5 — tempos por etapa | `scripts/quality-gate.mjs` | resumo `=== tempos ===` no fim de toda execução |
| P2 — etapas em paralelo | `scripts/quality-gate.mjs` | as que leem `dist/` esperam o build; o resto, e o Playwright, começam juntos; fail-closed mata as irmãs (verificado: falha em `node:test` encerra tudo em 6 s, sem navegador órfão) |
| P1 — escopo por impacto | `scripts/gate/impacto.mjs`, `tests/_helpers/gate.js`, `tests/gate-impacto.test.mjs` | padrão local; `--full`, `--paginas`, `--leve`; transversais declaram testes com `testDoGate` (pulados por declaração, sem abrir página) |
| `label-in-name` por página | `tests/a11y/label-in-name.spec.js` | o teste único de ~93 s, o mais longo da suíte, virou 82 testes paralelizáveis e filtráveis; leitura resistente a navegação tardia (falhou uma vez sob carga com "Execution context was destroyed") |
| P4 — shards | `playwright.config.js` | specs só-Chromium (`focus-visible`, `label-in-name`, `hreflang`) saem de firefox/webkit por `testIgnore`. O sharding só desconta testes pulados de forma **estática**; o skip no corpo contava como carga num shard que não rodava nada |
| Hook de Stop | `scripts/stop-gate.mjs` | passou de "Chromium inteiro" para impacto + `--leve` |
| `PW_PORTA`, `PW_SERVIDOR=preview` | `playwright.config.js` | suíte numa porta própria; preview opcional (ver 8.4) |

### 8.2b P4, segunda iteração: shards por navegador

O primeiro CI `full` depois do merge (run 38151493624) **piorou** o caminho crítico:
shards de 208 a 552 s, contra 204 a 408 s antes. O blob de cada shard mostrou o
motivo: o sharding corta a lista ORDENADA (projeto → arquivo → teste) em blocos
contíguos de mesma contagem. O shard 5 pegou `webkit › tests/a11y` inteiro (o
teste do banner, 215 s; o do currículo, 89 s; o `consent`), 965 s de worker.

Correção, simulada com as durações reais daquele run antes de ir para o CI:

- `@lento` (`{ tag: '@lento' }`) nos 22 testes de Tab longos: `focus-visible` e
  o banner de cookies do `independent`. Têm 2 shards próprios.
- O resto é dividido **por navegador**: chromium (+mobile, no-js) 2, firefox 2,
  webkit 4, pela carga medida (626, 709 e 1.203 s de worker).
- Estimativa por shard (2 workers): 91 a 225 s. O teto é o teste do banner no
  WebKit (215 s), que é um teste só e não se divide.
- Na camada `fast` (PR), os shards de firefox/webkit pulam todos os passos.

**Medido no CI `full` da `main` (run 38153163874, PR #110):** shards de 148 a
297 s, contra 208 a 552 s; o caminho crítico caiu 46%. O mais lento é `lento 2/2`
(297 s), que carrega o teste do banner no WebKit. Os demais ficam entre 173 e
257 s. Camada `fast` (PR #110): chromium 229 e 190 s, `lento` 122 e 111 s;
firefox/webkit pulam em 2 a 4 s. Critério da §7 (mais lento ≤ 1,2× a média):
média 231 s, máximo 1,29×: não atende, por causa do teste de 215 s, que é um só e não se divide. Para atender seria preciso encurtar esse teste (hoje ~126 paradas de Tab no WebKit).

Também neste PR: o gate derruba os filhos em SIGINT/SIGTERM/SIGHUP. Um
`playwright test` de um gate abortado às 09:01 seguia vivo horas depois,
segurando a porta 5173 (encerrado à mão). A interrupção em si não foi testada:
no Windows não há como mandar um Ctrl+C real de forma não interativa.

### 8.3 Medições

| Cenário | Antes | Depois |
| --- | --- | --- |
| Mudança em uma página (`--paginas especificacao-conversacional`) | > 10 min (abortado) | **36 s** (14 testes rodaram, 215 pulados por declaração) |
| Etapas sem Playwright, suíte inteira (`--no-e2e`) | ~247 s em série | **192 s** (a varredura a11y, 182 s, é o caminho crítico) |
| Chromium + mobile + no-js (camada `fast` do CI) | — | 562 testes, 391 s, verde |
| `--full` local (5 projetos, Windows) | estimado ~16 min, sem medição | **23,6 min**, 1.401 passaram, 0 falhas |

O `--full` local ficou acima da estimativa: Firefox e WebKit no Windows são lentos,
e a varredura a11y em paralelo com o Playwright disputa CPU (408 s em paralelo
contra 182–191 s sozinha). O tempo de relógio é o do Playwright, o caminho crítico;
quanto a disputa por CPU o alongou não foi medido (exigiria um `--full` com as duas
etapas em série). O `--full`
existe para antes de um merge arriscado; o dia a dia é o escopo por impacto.

### 8.4 P3 avaliado e não adotado

Chromium contra o build (`PW_SERVIDOR=preview`): **352 s**, contra **370 s** no dev
server, só 5% mais rápido. Sete testes do OCC quebram, porque dependem de ganchos
de depuração (`window.__DEBUG_*`) e de imports de módulo (`/js/...`) que só
existem no dev server. O ganho não paga a reescrita desses testes. O modo fica
disponível para quem quiser medir contraste sem FOUC.

### 8.5 Achados laterais

- **`build-aeo.mjs` agora é idempotente.** A causa era o fim de linha: com
  `core.autocrlf`, a cópia de trabalho vem em CRLF e as regex de limpeza esperam
  `\n`. O script processa em LF, devolve o EOL original e só grava o que mudou.
  Segunda execução seguida: 0 arquivos alterados. A primeira, sobre a `main`,
  limpou o acumulado (14 separadores duplicados e blocos `<style>` reordenados
  dentro do `<head>`, sem mudança de conteúdo) e revelou um descompasso de fonte:
  a linha da Especificação Conversacional no `catalogo.md` tinha sido incluída à
  mão, sem entrar em `pages.mjs`, e a regeneração a apagava. Corrigido na fonte.
- **Regra `freshness` do `verify-a11y.py`: mantida.** Restringi-la a "mudanças de
  marcação" exigiria classificar diffs de HTML, e a regra é a garantia de que
  alguém olhou a acessibilidade depois de cada mudança de interface. O custo (uma
  nota no `REPORT.md` por PR que toca `src/`) é o preço dessa garantia.
