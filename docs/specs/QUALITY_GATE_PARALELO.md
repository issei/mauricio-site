# Quality gate mais rápido — paralelismo e seleção por impacto

Status: **plano** (nada implementado) · 2026-10-11 · Autor: Maurício Yokoyama Issei (com Claude)
Complementa a seção "CI/CD Integration" de [`TESTING_GUIDE.md`](TESTING_GUIDE.md).

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
