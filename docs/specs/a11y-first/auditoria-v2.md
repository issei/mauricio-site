---
id: A11Y-AUDIT-002
titulo: Auditoria v2 — o que ainda falta, com MCP/tool discovery e backlog executável
versao: 1.0.0
status: em execução — itens sem dependência humana corrigidos no PR `fix/a11y-auditoria-v2` (ver "Execução")
data: 2026-10-05
base: main @ fa5f4a8 (build de produção, `vite preview`)
relacionado: [accessibility-audit.md, implementation-plan.md, verificacao-independente-fase7.md, ../../../REPORT.md, ../../../EXCEPTIONS.md, ../../../A11Y-DECISIONS.md, ../../a11y/A11Y.md]
sondas: auditoria-v2-sondas/
---

# Auditoria v2: estado, descobertas e backlog executável

**Escopo.** Esta auditoria não refaz as Fases 1–8 (`implementation-plan.md`). Ela parte do `REPORT.md` (status
**CONDICIONAL**) e mede **só o que ninguém mediu**, revalida o que podia ter regredido e decide que ferramentas
(MCP, CLI, bibliotecas) valem a pena antes de propor qualquer código novo.

**Convenções**

| Marca | Significado |
| :-- | :-- |
| **FATO** | medido nesta rodada ou lido no código/CI, com comando reproduzível |
| **INFERÊNCIA** | conclusão a partir de fatos, sem medição direta |
| **HIPÓTESE** | plausível, não verificado |

Status (um por achado): `CONFIRMADO` · `PROVÁVEL` · `POTENCIAL` · `FALSO POSITIVO` · `EXCEÇÃO DOCUMENTADA` · `RESOLVIDO` · `NÃO VALIDADO`.

Severidade, ancorada no `A11Y.md` §1 e nas tarefas T1–T7 de `product-spec.md` §3:

| Nível | Regra |
| :-- | :-- |
| **P0** | barreira 🔴 CRITICAL **no caminho de uma tarefa T1–T7**, sem contorno para um grupo de usuários |
| **P1** | falha A/AA provável ou confirmada que deixa conteúdo inteiro inacessível a um grupo; ou o que impede sair de CONDICIONAL |
| **P2** | falha A/AA localizada; ou falha de processo que deixa regressão chegar à produção |
| **P3** | melhoria (boa prática, UX, coerência, dívida) |
| **P4** | opcional |

Esforço: **S** < 2 h · **M** ½–1 dia · **L** > 1 dia.

## Execução (PR `fix/a11y-auditoria-v2`, 2026-10-05)

O que mudou em relação ao plano está em itálico.

| Item | Situação | Como | Evidência |
| :-- | :-- | :-- | :-- |
| AV2-01 | **RESOLVIDO** | blocos e zonas com `role=button`, Enter/Espaço, `aria-pressed`; sem `role=application`; validador `role=status`. *Blocos seguem `div`: o Firefox não arrasta `<button draggable>`* | `tasks.spec.js` "OCC cap. 3", que falha no código antigo |
| AV2-05 | **RESOLVIDO** | *`scroll-padding-top:6rem` uma vez, no plugin `a11y-focus-base` (especificidade zero), em vez de página a página* | `independent.spec.js` Shift+Tab em 6 páginas; sem a correção falham 5 (`index`, `apresentacao` e `proposta-engenharia-reversa` passam de PROVÁVEL a CONFIRMADO; `knowledge-os-presentation` não falhava) |
| AV2-06 | **RESOLVIDO** | `aria-hidden` no tooltip, `data-dismissed` no Esc, `display:none`, ponte de hover | `widgets.spec.js` nos 3 navegadores; falha no código antigo |
| AV2-07 | **RESOLVIDO** | caixas do diagrama com `flex-shrink` | `spacing:clip` = 0 nas 75 páginas |
| AV2-09 | **RESOLVIDO** (7 páginas) | classe `js` antes do primeiro paint + regras de revelação sob `.js`. *`life3d` é falso positivo: overlays de jogo* | `nojs:hidden` = 0, exceto `life3d` (registrado) |
| AV2-10 | **RESOLVIDO** | *não versionamos o motor: `--all` gerou 650 linhas de ruído em 41 arquivos, com pioras. Guarda pelo sintoma: `tests/i18n-mirror-empty.test.mjs`. Achou mais 6 espelhos com texto vazio (`devin`, `knowledge-os-presentation`, `life3d`, OCC, `proposta-engenharia-reversa`, `terminal-evolutivo`), regenerados com `--files`* | invariante falha no espelho antigo |
| AV2-11 | **RESOLVIDO** | reconfirmação em série das páginas divergentes | 2 rodadas completas iguais |
| AV2-13 | **RESOLVIDO** | *plugin `hreflang-pt` no build, sem editar as 33 fontes (evita retradução)* | `tests/hreflang.spec.js` |
| AV2-14 | **RESOLVIDO** | `REPORT.md` com nota 7 e 2.4.11 revisto | — |
| AV2-15 | **RESOLVIDO** | `<h2>` vazio removido (vazio desde a criação, `31ccdb8`; inventar título seria mudar conteúdo) | `bp:empty-heading` = 0 |
| AV2-17 | **RESOLVIDO** (parcial) | `bp:*`, `spacing:clip`, `nojs:hidden` na catraca. *`motion:infinite` ficou fora: depende de AV2-08* | `baseline.json` |
| AV2-23 | **RESOLVIDO** (`life3d`) | `#intro` era a tela de abertura com o `<h1>`, não modal: saiu o `role=dialog aria-modal`; o foco vai ao `<main>` ao iniciar. *Aba inicial da `engenharia-confianca` mantida sem seleção: é autoavaliação, e o placeholder "Selecione um estágio" é intencional* | — |
| AV2-25 | **RESOLVIDO** (parcial) | agente revisor em 2.2; helper do axe documenta que 2.2 é cobrado pela catraca. *Playwright sobre o build segue em PR próprio* | — |
| AV2-18 | **RESOLVIDO** (`artifice`) | efeito colateral de AV2-06 | sonda: 0 px a 768 |
| AV2-02, 03, 04 | aberto | dependem de humano | — |
| AV2-08 | aberto | depende de ADR-AV2-04 (muda o visual) | — |
| AV2-12 | aberto | ruleset: ação do dono na conta do GitHub | — |
| AV2-16, 19, 20, 21, 22, 24, 26, 27, 28 | aberto | P3/P4; `heading-order` travado na catraca | — |

---

## 1. Executive Summary

- **FATO.** A base automatizada está sólida e se mantém: a catraca axe (WCAG 2.2 AA, 75 páginas PT+EN, build de
  produção) segue **sem regressão**, com 38 ocorrências, todas em páginas de `EXCEPTIONS.md`. O gate estático está no teto
  (21 erros, 18 falsos positivos conhecidos). O CI do `main` passou (run 37234016508, 38 min).
- **FATO.** As sondas novas, sobre critérios que o `REPORT.md` listava como "não medidos", acharam **7 falhas
  confirmadas** que o axe não vê:
  1. **P0:** o capítulo 3 do simulador OCC (tarefa **T4**) não pode ser concluído por teclado. Os blocos da fração são
     `div` com `tabindex=0` só com `click`; as zonas de destino não recebem foco.
  2. SC 2.4.11: foco inteiramente coberto pelo cabeçalho fixo ao voltar com Shift+Tab (`curriculo`, `service-operations-2-0`).
  3. SC 1.4.13: tooltip da `artifice` que Esc não fecha.
  4. SC 1.4.12: texto cortado sob espaçamento ampliado (`devin #calculadora`).
  5. Títulos vazios: espelho EN da `socialselling` e `devin.html:3498`.
  6. A catraca oscila numa métrica (`motion:reduce`).
  7. O deploy não depende do gate, e o `main` não tem proteção de branch.
- **FATO.** Sem JavaScript, 8 páginas escondem de 30 % a 91 % do texto (`opacity:0` à espera do script), o que viola a
  regra "Conteúdo Refém do JavaScript" do `A11Y.md` §6.
- **PROVÁVEL / NÃO VALIDADO.** Mídia: 8 players de áudio em 5 páginas sem transcrição (SC 1.2.1) e cerca de 23 vídeos do
  YouTube sem legenda revisada (SC 1.2.2). Movimento: 118 animações infinitas em 32 páginas sem mecanismo de pausa
  (SC 2.2.2). Leitor de tela: **nenhum par leitor + navegador foi usado até hoje.**
- **Ferramentas.** Nenhum MCP de acessibilidade agrega cobertura ao que o repo já faz. Todos encapsulam o mesmo
  `axe-core`, e o oficial da Deque é pago. Os ganhos reais vêm de **estender a catraca existente** (best-practice,
  espaçamento, sem-JS), de **reusar recursos nativos** (ruleset do GitHub, facade de vídeo que já existe) e de
  **validação humana**.
- **Não se pode afirmar** que o site está conforme WCAG 2.2 AA. Validados por automação ou inspeção (ver §4): 1.3.4,
  1.4.2, 1.4.10, 2.4.1, 2.4.2, 2.4.7, 2.5.3 (só automação), 2.5.7, 2.5.8 e 3.1.1. Ainda dependem de humano ou de
  correção: 1.2.x, 1.3.1/1.3.2 (leitor de tela), 1.4.12, 1.4.13, 2.1.1, 2.2.2, 2.4.11 e 4.1.2.

---

## 2. Evidências: o que foi realmente validado

Ambiente: Windows 11, Node 20+, Chromium do `@playwright/test` 1.58, `@axe-core/playwright` 4.11, build `vite build` de
`main @ fa5f4a8` servido por `vite preview --port 4399`. Sondas e saídas brutas em `auditoria-v2-sondas/`
(`probe.json`, `nojs.json`, `obscured.json`).

| # | O quê | Como | Resultado | Tipo |
| :-- | :-- | :-- | :-- | :-- |
| E1 | Catraca axe WCAG 2.2 AA + `<main>`/skip/h1/reflow 320/movimento | `node scripts/a11y-sweep.mjs` (75 páginas) | sem regressão; 38 ocorrências, todas em EXC. 1 divergência **não determinística** (ver AV2-11) | FATO |
| E2 | Gate estático `verify-a11y.py` | `node scripts/a11y-static.mjs` | 21 erros (= teto), 37 avisos | FATO |
| E3 | CI do `main` | `gh run list` | gate verde em 38 min; deploy em 50 s, **no mesmo push e em paralelo** | FATO |
| E4 | Proteção de branch | `gh api repos/issei/mauricio-site/branches/main/protection` | `404 Branch not protected`; `rulesets` = `[]` | FATO |
| E5 | SC 2.2.2: animações infinitas sem `reduce`, rAF, controles de pausa | `probe.mjs` | 118 animações em 32 páginas; rAF > 5/s em 5 páginas (+EN); controle de pausa só em `artifice`, `curiosidade`, `engenharia-agentes-ia` | FATO (reproduz a Fase 7) |
| E6 | SC 1.4.12: CSS do critério injetado; recorte **novo** | `probe.mjs` + `verify.mjs` + captura | 73/75 sem recorte; `devin`/`en/devin`: caixa "RESULTADO" cortada | FATO |
| E7 | Larguras intermediárias (640×400 = 200 % de 1280; 768; 1024; 812×375 paisagem) | `probe.mjs` | rolagem horizontal em `artifice` (146 px a 768), `socialselling` (57 px), `salesforce-agentic-quickstart` (18 px a 640), `knowledge-os-presentation` (5 px) | FATO |
| E8 | SC 1.3.4: orientação | regras `@media (orientation)` em folhas same-origin + `grep orientation.lock` | 0 / 0 | FATO (CSS de CDN não inspecionado) |
| E9 | SC 1.4.13: CSS que revela conteúdo só em `:hover` + teste real | `probe.mjs`, `tip.mjs` | regra aparece em ~50 páginas, mas só `sustentacao` a usa; tooltip da `artifice` não fecha com Esc | FATO |
| E10 | SC 2.4.11: Shift+Tab de baixo para cima, foco coberto por fixo/sticky (consentimento pré-gravado) | `obscured.mjs` + `coverer.mjs` + capturas | 8 páginas sinalizadas → 2 **confirmadas** por captura, 2 **falsos positivos**, 4 prováveis | FATO + verificação visual |
| E11 | "Conteúdo refém do JS" | `nojs.mjs` (`javaScriptEnabled:false`) | 8 páginas escondem 30–91 % do texto | FATO |
| E12 | T4/OCC por teclado | `occ-kbd.mjs` (dev server, `__DEBUG_skipToChapter(3)`) | Enter/Espaço no bloco: nada; zonas `tabindex=-1`; caminho por mouse funciona | FATO |
| E13 | axe best-practice (fora da catraca) | `probe.mjs` | 8 regras com nós; detalhe em AV2-17 | FATO |
| E14 | Títulos de página | `probe.mjs` | únicos, exceto o par `admin`/`admin-editor` (EXC) | FATO |
| E15 | Inventário de mídia | `probe.mjs` + `grep` | 15 iframes do YouTube em 12 páginas PT (todos com `title`); 1 facade; 8 `<audio>` em 5 páginas; 0 `<track>`; 0 transcrição de áudio | FATO |
| E16 | `hreflang` | `grep` em `dist/` | PT: 0 `hreflang` (ex.: `dist/index.html`, `dist/devin.html`); EN: trio presente | FATO |
| E17 | Pesquisa de MCP/ferramentas | registro de conectores claude.ai, docs oficiais (§5) | ver §5 | FATO (docs lidas) / INFERÊNCIA (adequação) |

**Herdado e não refeito** (evidência em `REPORT.md` e `verificacao-independente-fase7.md`): foco visível por pixel em 15
páginas, 14 tablists por teclado, diálogos (consentimento, currículo, OCC), *label in name* em 75 páginas,
contraste dos pares sólidos, skip link funcional e foco sob banner/`eco-nav` nos 3 navegadores (CI).

---

## 3. Problemas encontrados

### 3.1 Tabela

| ID | Título | Status | Sev | Tipo | Páginas | WCAG |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **AV2-01** | Fração do OCC (cap. 3) só por mouse | CONFIRMADO | **P0** | WCAG obrigatório | `operacao-capital-cognitivo` PT+EN | 2.1.1, 4.1.2 |
| **AV2-02** | Áudio sem transcrição | PROVÁVEL | **P1** | WCAG obrigatório | `know`, `sustentacao`, `service-operations-2-0`, `salesforce-agentic-dev`, `proposta` (+EN) | 1.2.1 |
| **AV2-03** | Vídeos sem legenda revisada nem audiodescrição avaliada | NÃO VALIDADO | **P1** | WCAG obrigatório | 12 páginas com iframe + `engenharia-agentes-ia` (facade) | 1.2.2, 1.2.3, 1.2.5 |
| **AV2-04** | Nenhum teste com leitor de tela real | NÃO VALIDADO | **P1** | Qualidade (processo) | T1–T7 | 1.3.1, 1.3.2, 4.1.2, 4.1.3 |
| **AV2-05** | Foco inteiro sob cabeçalho fixo (Shift+Tab) | CONFIRMADO (2) / PROVÁVEL (4) | P2 | WCAG obrigatório | `curriculo`, `service-operations-2-0` · prováveis: `apresentacao`, `knowledge-os-presentation`, `proposta-engenharia-reversa`, `index` | 2.4.11 |
| **AV2-06** | Tooltip da `artifice`: Esc não fecha; citação vira nome do botão | CONFIRMADO | P2 | WCAG obrigatório | `artifice` PT+EN | 1.4.13, 4.1.2 |
| **AV2-07** | Texto cortado sob espaçamento ampliado | CONFIRMADO | P2 | WCAG obrigatório | `devin` PT+EN | 1.4.12 |
| **AV2-08** | Movimento contínuo sem pausar/parar | PROVÁVEL | P2 | WCAG obrigatório | 32 páginas (PT+EN), canvas de `proposta-engenharia-reversa` | 2.2.2 |
| **AV2-09** | Texto invisível sem JavaScript | CONFIRMADO | P2 | UX Accessibility (regra `A11Y.md` §6) | 8 páginas | — (regra da casa) |
| **AV2-10** | Espelho EN com títulos vazios; manifesto i18n ignora a versão do tradutor | CONFIRMADO | P2 | Qualidade | `en/socialselling` | 1.3.1, 2.4.6 |
| **AV2-11** | Catraca não determinística em `motion:reduce` | CONFIRMADO | P2 | Qualidade | `exemplopdi` (e qualquer página sob carga) | — |
| **AV2-12** | Deploy não espera o gate; `main` sem proteção | CONFIRMADO | P2 | Arquitetura | todas | — |
| **AV2-13** | `hreflang` só no lado EN (não recíproco) | CONFIRMADO | P2 | SEO | 33 páginas PT com espelho | — |
| **AV2-14** | `REPORT.md` afirma mais do que a evidência atual | CONFIRMADO | P2 | Qualidade (processo) | `REPORT.md` | 2.4.11 etc. |
| AV2-15 | `<h2>` vazio no HTML | CONFIRMADO | P3 | WCAG (boa prática) | `devin` PT+EN | 1.3.1, 2.4.6 |
| AV2-16 | Saltos de nível de título (h2→h4) | CONFIRMADO | P3 | UX Accessibility | 7 páginas PT + EN | 1.3.1 (boa prática) |
| AV2-17 | Regras best-practice do axe fora da catraca | CONFIRMADO | P3 | Qualidade | várias | — |
| AV2-18 | Rolagem horizontal entre 640 e 1024 px | CONFIRMADO | P3 | UX Accessibility | `artifice`, `socialselling`, `salesforce-agentic-quickstart`, `knowledge-os-presentation` | 1.4.4 (relacionado) |
| AV2-19 | Consentimento e `<eco-nav>` em português nos espelhos EN (F-18) | CONFIRMADO | P3 | UX Accessibility | 22+ espelhos EN | 3.1.2 mitigado |
| AV2-20 | Iframe do YouTube direto (58 nós de violação de terceiro + peso) | CONFIRMADO | P3 | Performance / Qualidade | 12 páginas + EN | — |
| AV2-21 | `<audio>` sem nome acessível (3 na mesma página) | POTENCIAL | P3 | UX Accessibility | `know`, `sustentacao` e outras | 4.1.2 (boa prática) |
| AV2-22 | Teclas de letra única ativas na janela inteira (jogos) | POTENCIAL | P3 | WCAG obrigatório | `life`, `life3d` | 2.1.4 |
| AV2-23 | `life3d #intro` sem gestão de foco; tablist da confiança sem aba selecionada | CONFIRMADO (Fase 7) | P3 | WCAG / APG | `life3d`, `engenharia-confianca` | 2.4.3 |
| AV2-24 | Infográfico sem alternativa longa; "Clique para ampliar" só no hover | POTENCIAL | P3 | WCAG obrigatório | `sustentacao` | 1.1.1, 1.4.5 |
| AV2-25 | Ferramentas de a11y desalinhadas (axe das specs em 2.1, agente revisor em 2.1, Playwright no dev server) | CONFIRMADO | P3 | Developer Experience | `tests/_helpers/axe.js`, `.claude/agents/a11y-design-reviewer.md`, `playwright.config.js` | — |
| AV2-26 | Nenhum seletor de idioma visível | CONFIRMADO | P4 | UX / i18n | todas | — |
| AV2-27 | Configuração de MCP divergente e servidores falhando | CONFIRMADO | P4 | Developer Experience | `apm.yml`, `.mcp.json` | — |
| AV2-28 | Páginas utilitárias publicadas (`diagnostic`, `test-github`) | EXCEÇÃO DOCUMENTADA | P4 | Tech Debt | EXC-001/002 | 1.3.1, 3.3.2, 4.1.2 |

**Falsos positivos registrados nesta rodada** (para ninguém "corrigir"):
- `verify-a11y.py`: 16 `role="list"` deliberados + 2 `half-climbed-aria` (`A11Y-DECISIONS.md`).
- `obscured.mjs` em `engenharia-agentes-ia`: a borda do item focado aparece sob o cabeçalho (parcialmente visível),
  então passa no **AA** 2.4.11; só falharia no AAA 2.4.12.
- `obscured.mjs` em `devin`: a `nav.devin-nav` tem fundo transparente (`rgba(0,0,0,0)`), e o foco continua visível.
- Regra `.group-hover:opacity-100` em ~50 páginas: está no CSS gerado, mas só `sustentacao` usa a classe.

**Exceções documentadas, sem mudança:** EXC-001…006 e EXC-008 (`EXCEPTIONS.md`, revisão em 2027-04-03).
Achados novos nessas páginas não foram procurados.

### 3.2 Especificação por problema

> Os campos seguem o template pedido. "Ferramenta/MCP existente" registra o que foi procurado **antes** de propor código.

#### AV2-01 — Fração do OCC (capítulo 3) só por mouse
- **Status:** CONFIRMADO · **Severidade:** P0 · **Tipo:** WCAG obrigatório
- **Página(s):** `operacao-capital-cognitivo.html` e `en/operacao-capital-cognitivo.html` · **Componente:** `initCap3` (montador de fração)
- **Critério WCAG:** 2.1.1 Teclado (A); 4.1.2 Nome, Função, Valor (A); 2.5.7 **passa** (há alternativa de ponteiro único)
- **Problema:** os 4 blocos são `div` com `tabindex=0`, `draggable` e **só** `click`. Não há `keydown`. As zonas
  Numerador e Denominador são `div role=group` sem `tabindex`. O contêiner é `role="application"`, o que manda o leitor
  de tela entregar as teclas à página, e a página não trata nenhuma. Sem concluir o capítulo 3, os capítulos 4–6 nunca
  liberam: `ctx.complete(3)` só dispara depois da fração montada.
- **Evidência (FATO):** `occ-kbd.mjs` mostra Enter e Espaço no bloco com `selected=false`, zonas com `tabIndex=-1` e o Tab
  depois do último bloco saindo do componente; o caminho por mouse monta "Trabalho Correto Aprovado". Código em
  `src/js/operacao-capital-cognitivo/chapters.js:169-198`; instrução sr-only em `src/operacao-capital-cognitivo.html:303-306`,
  que fala só em "arraste" e "clique".
- **Impacto:** T4 ("completa o exercício só com teclado") impossível para teclado, switch e leitor de tela no OCC.
- **Causa raiz:** componente de arrastar sem modelo de teclado; `tests/a11y/tasks.spec.js` não tem spec de tarefa do OCC
  (o `testing-strategy.md` §3 previa).
- **Solução recomendada (mínima):**
  1. Blocos viram `<button type="button" aria-pressed="false">` (reusa o clique; Enter e Espaço vêm de graça).
  2. Zonas viram `<button type="button">` com nome "Colocar no numerador" e "Colocar no denominador" (o clique já existe).
  3. Remover `role="application"` do `#formula-canvas`.
  4. Tirar `aria-live="assertive"` das zonas e pôr `role="status"` no `#formula-validator`, que já recebe o texto de progresso.
  5. Instrução: "Selecione um bloco e depois a zona de destino; ou arraste."
  6. Manter o `draggable` e o caminho por mouse.
- **Arquivos envolvidos:** `src/js/operacao-capital-cognitivo/chapters.js`, `src/operacao-capital-cognitivo.html`
  (instrução), espelho EN via `npm run i18n:sync`.
- **Dependências:** nenhuma.
- **Ferramenta/MCP existente:** nenhuma resolve. É comportamento do componente. O padrão vem do APG ("Drag and Drop
  alternative") e de `A11Y-DECISIONS.md` (quiz: `aria-pressed`).
- **Alternativa interna:** reescrever como listbox com setas, que é mais código para o mesmo resultado (rejeitado).
- **Por que essa solução:** HTML nativo antes de ARIA (`A11Y.md`); diff de poucas linhas; o caminho por mouse fica intacto.
- **Teste necessário:** em `tests/a11y/tasks.spec.js`, "OCC cap. 3 só por teclado". No dev server, chamar
  `__DEBUG_skipToChapter(3)`, ir por Tab até o bloco, Enter, Tab até a zona, Enter e repetir. Esperar o texto do
  `#formula-validator` e a liberação de `#formula-naming`. Rodar nos 3 navegadores (CI).
- **Risco de regressão:** baixo; `tests/operacao-capital-cognitivo.spec.js` cobre o motor.
- **Esforço:** S · **Confiança:** alta

#### AV2-02 — Áudio sem transcrição
- **Status:** PROVÁVEL · **Severidade:** P1 · **Tipo:** WCAG obrigatório
- **Página(s):** `know` (3 players), `sustentacao` (2), `service-operations-2-0` (1), `salesforce-agentic-dev` (1),
  `proposta` (1, player próprio) e os espelhos EN · **Componente:** `<audio controls>`
- **Critério WCAG:** 1.2.1 Somente áudio, pré-gravado (A)
- **Problema:** nenhuma das 8 faixas tem transcrição na página nem em link.
- **Evidência:** FATO: `grep -c transcri` dá 0 nessas páginas; nenhum link perto dos players (`know.html:759-791`,
  `sustentacao.html:626-657`, `service-operations-2-0.html:808`, `salesforce-agentic-dev.html:2592`). INFERÊNCIA: os
  títulos ("debate", "crítica", "deep dive") indicam conteúdo **além** do texto da página, então a exceção "mídia
  alternativa ao texto" não se aplica. Precisa de um humano que ouça.
- **Impacto:** pessoas surdas ou com perda auditiva, e quem não pode ouvir no momento, perdem o conteúdo inteiro.
- **Causa raiz:** a mídia entrou antes da regra *Media Evidence* do `A11Y.md`.
- **Solução recomendada:** para cada faixa, um `<details><summary>Transcrição</summary>…</details>` logo abaixo do player,
  com o texto revisado por humano. Se a faixa só repete o texto da página, declarar isso ao lado do player ("versão em
  áudio do texto acima") em vez de transcrever. O espelho EN recebe a tradução pelo `sync-i18n`, como o resto.
- **Arquivos envolvidos:** as 5 páginas PT; `public/*.md` se o gêmeo `.md` refletir a seção.
- **Dependências:** humano ouve e decide (transcrever ou declarar alternativa).
- **Ferramenta/MCP existente:** não há MCP de transcrição nas ferramentas desta sessão. HIPÓTESE: um transcritor local
  (família Whisper) gera o **rascunho**; o `A11Y.md` só aceita saída de máquina como rascunho revisado por humano.
- **Alternativa interna:** nenhuma; transcrição não se gera com código do site.
- **Por que essa solução:** `<details>` é nativo, não pesa a página e já é o padrão do `digital-workplace-agentico` (EXC-008).
- **Teste necessário:** asserção estática em `tests/a11y/` de que todo `<audio>` tem `<details>` de transcrição ou
  `data-alt-to-text` no mesmo card.
- **Risco de regressão:** nenhum.
- **Esforço:** M (por faixa: revisão humana) · **Confiança:** média (falta ouvir)

#### AV2-03 — Vídeos sem legenda revisada nem audiodescrição avaliada
- **Status:** NÃO VALIDADO · **Severidade:** P1 · **Tipo:** WCAG obrigatório
- **Página(s):** `agent-ready`, `artifice`, `case-agents` (3), `devin`, `digital-workplace-agentico` (EXC-008),
  `engenharia-confianca`, `formulacao-de-problemas`, `know` (2), `proposta-observabilidade-mobile`,
  `salesforce-agentic-dev`, `service-operations-2-0`, `sustentacao`, `engenharia-agentes-ia` (facade) e espelhos EN
- **Critério WCAG:** 1.2.2 Legendas (A); 1.2.3 (A); 1.2.5 Audiodescrição (AA)
- **Problema:** cerca de 23 IDs de vídeo distintos no código (lista em `probe.json` e no Anexo B), nenhum com legenda
  revisada declarada. Só o `digital-workplace-agentico` tem exceção registrada (EXC-008).
- **Evidência (FATO):** 0 `<track>`; legendas do YouTube são do canal, fora do repositório. NÃO VALIDADO: se cada vídeo
  tem legenda revisada e se há informação só visual (o que exigiria audiodescrição).
- **Impacto:** pessoas surdas (legenda) e cegas (informação só visual).
- **Causa raiz:** igual à de AV2-02.
- **Solução recomendada:** planilha de triagem por vídeo (ID, página, dono do canal, legenda PT revisada sim/não,
  informação só visual sim/não). Para vídeos do próprio canal: revisar a legenda no YouTube Studio. Para vídeos de
  terceiros: avaliar se há legenda do autor; se não, resumo textual ao lado (`<details>`) ou exceção registrada.
- **Arquivos envolvidos:** nenhum até a triagem; depois `EXCEPTIONS.md` e as páginas (resumos).
- **Dependências:** humano assiste.
- **Ferramenta/MCP existente:** YouTube Studio (nativo, sem código).
- **Alternativa interna:** `<track>` próprio exigiria trocar o player do YouTube (rejeitado).
- **Por que essa solução:** a correção mora na plataforma que hospeda o vídeo; nada para construir.
- **Teste necessário:** nenhum automatizável sobre a qualidade da legenda; registrar a triagem no `REPORT.md` §5.
- **Risco de regressão:** nenhum.
- **Esforço:** L (humano, por vídeo) · **Confiança:** baixa (nada assistido)

#### AV2-04 — Nenhum teste com leitor de tela real
- **Status:** NÃO VALIDADO · **Severidade:** P1 · **Tipo:** Qualidade (processo)
- **Página(s):** caminhos T1–T7 · **Critério WCAG:** 1.3.1, 1.3.2, 4.1.2, 4.1.3 (anúncio real)
- **Problema e evidência (FATO):** `REPORT.md` §3, "Par(es) usado(s): nenhum"; a Q5 (quem valida) segue sem resposta
  desde 2026-10-03.
- **Impacto:** regiões vivas, `role=status`, ordem de leitura, `eco-nav` em shadow DOM e `role="list"` no Safari são
  hipóteses até alguém ouvir.
- **Solução recomendada:** sessão de 2–3 h, NVDA + Firefox (Windows, disponível no ambiente do dono) e VoiceOver + Safari
  (macOS/iOS), roteiro T1–T7 de `product-spec.md` §3. Registrar no `REPORT.md` §3, no formato que o template já tem.
- **Ferramenta/MCP existente:** **Guidepup** (MIT; NVDA e VoiceOver; integra com Playwright) **depois** do teste humano,
  para transformar 2–3 achados em regressão. Não substitui a pessoa; o próprio projeto diz isso.
- **Alternativa interna:** nenhuma.
- **Teste necessário:** roteiro manual; opcionalmente 1 spec Guidepup por widget crítico.
- **Esforço:** M (humano) · **Confiança:** alta (a lacuna é certa)

#### AV2-05 — Foco inteiro sob cabeçalho fixo (Shift+Tab)
- **Status:** CONFIRMADO em `curriculo` e `service-operations-2-0` (capturas); PROVÁVEL em `apresentacao`,
  `knowledge-os-presentation`, `proposta-engenharia-reversa` e `index`; FALSO POSITIVO em `engenharia-agentes-ia` e `devin`
- **Severidade:** P2 · **Tipo:** WCAG obrigatório · **Critério:** 2.4.11 Foco não obscurecido, mínimo (AA, novo no 2.2)
- **Problema:** ao navegar para trás, o navegador rola o elemento focado para o **topo** da janela, sob a `nav` fixa
  (opaca a 64 px no currículo; 80 % opaca a 81 px no ServiceOps). Nenhuma das páginas declara `scroll-padding-top`.
- **Evidência (FATO):** `obscured.mjs` contou 4/67 paradas cobertas no currículo ("Ver Credencial") e 3/39 no ServiceOps
  (links de referência); `coverer.mjs` identificou o elemento que cobre (`nav.fixed.top-0`, `nav#navbar`). As capturas
  confirmam. O `independent.spec.js` cobre banner e `eco-nav` (rodapé), não cabeçalhos.
- **Impacto:** quem navega por teclado perde o rastro do foco ao voltar.
- **Causa raiz:** a decisão "Elemento fixo no canto" do `A11Y-DECISIONS.md` tratou o rodapé (`scroll-padding-bottom`)
  e não o cabeçalho.
- **Solução recomendada:** `html{scroll-padding-top:<altura do cabeçalho + 8px>}` no CSS de cada página com cabeçalho
  fixo/sticky (1 linha por página; nada de JS). Registrar a regra em `A11Y-DECISIONS.md`, junto da do rodapé.
- **Arquivos envolvidos:** CSS inline ou folha de `curriculo`, `service-operations-2-0`, `apresentacao.css`,
  `knowledge-os-presentation`, `proposta-engenharia-reversa`, `index.css`; espelhos via i18n.
- **Ferramenta/MCP existente:** recurso nativo do CSS. Nenhum MCP mede 2.4.11; o Lighthouse não tem essa auditoria.
- **Alternativa interna:** JS de `focusin` com `scrollBy` (o que o banner usa), só se `scroll-padding` não bastar no
  Firefox, a mesma lição do commit `114f40f`.
- **Teste necessário:** estender `tests/a11y/independent.spec.js` com a lógica do `obscured.mjs` (Shift+Tab em 6
  páginas; falha se algum foco tiver os 4 cantos e o centro sob um fixo/sticky **opaco**), nos 3 navegadores.
- **Risco de regressão:** âncoras internas passam a parar 72–90 px mais abaixo (efeito desejado).
- **Esforço:** S · **Confiança:** alta (2 confirmadas), média (4 prováveis)

#### AV2-06 — Tooltip da `artifice`: Esc não fecha; citação vira nome do botão
- **Status:** CONFIRMADO · **Severidade:** P2 · **Tipo:** WCAG obrigatório
- **Página(s):** `artifice` PT+EN (`.art-term`: Dejours, Reilly, Newport e demais)
- **Critério WCAG:** 1.4.13 Conteúdo em hover ou foco (AA), condição "dispensável"; 4.1.2 (nome verboso)
- **Problema:** o tooltip aparece por `:hover` e `:focus-visible` (CSS), mas o `Escape` de `terms.js` só remove
  `.is-open`. Com foco ou ponteiro sobre o termo, Esc não esconde nada. Além disso, o `<span role=tooltip>` fica
  **dentro** do `<button>`, e o nome acessível passa a ser "Christophe Dejours "O sofrimento ético…" (1992)", repetido
  pela descrição.
- **Evidência (FATO):** `tip.mjs` mostra `visibility: visible` antes e depois do Esc, por foco e por hover; o
  `ariaSnapshot` traz o botão com a citação inteira no nome. CSS em `src/artifice.css:131-133`; JS em
  `src/js/artifice/terms.js:24-26`.
- **Impacto:** o tooltip cobre o texto acima e não sai; leitor de tela lê a citação duas vezes.
- **Solução recomendada:** (1) mover o `span.art-term__tip` para **irmão** do botão (mantém `aria-describedby`);
  (2) no Esc, pôr `data-dismissed` no termo, com o CSS
  `.art-term[data-dismissed] + .art-term__tip{visibility:hidden}`, e limpar no `blur`/`mouseleave`; (3) o seletor de
  exibição passa a `.art-term:is(:hover,:focus-visible) + .art-term__tip, .art-term__tip:hover`, o que também cumpre
  "pairável".
- **Arquivos envolvidos:** `src/artifice.html` (markup dos termos), `src/artifice.css`, `src/js/artifice/terms.js`.
- **Ferramenta/MCP existente:** nenhuma; o padrão vem do APG (Tooltip) e de `docs/a11y/references/guide-buttons.md`.
- **Teste necessário:** Playwright: foco no termo, tip visível, Esc, tip oculto; hover, Esc, oculto; nome do botão
  igual ao texto visível.
- **Risco de regressão:** o layout do tooltip depende do ancestral `relative`; conferir a regra de 640 px (`artifice.css:451-458`).
- **Esforço:** S · **Confiança:** alta

#### AV2-07 — Texto cortado sob espaçamento ampliado (`devin #calculadora`)
- **Status:** CONFIRMADO · **Severidade:** P2 · **Tipo:** WCAG obrigatório · **Critério:** 1.4.12 (AA)
- **Página(s):** `devin` PT+EN · **Componente:** diagrama `ep02-diagrama` (PROBLEMA → FERRAMENTA → RESULTADO)
- **Problema:** com o CSS do critério (altura de linha 1,5; letras 0,12 em; palavras 0,16 em; parágrafo 2 em), a
  terceira caixa sai pela direita (`scrollWidth` 1489 > 1280), e `section#calculadora` tem `overflow:hidden`.
- **Evidência (FATO):** `verify.mjs` acusou `span.ep02-diagrama__label` "RESULTADO" e `p.ep02-diagrama__desc` fora da
  caixa, e a captura mostra a caixa cortada. Nenhuma outra das 75 páginas recorta texto novo.
- **Solução recomendada:** a linha do diagrama vira `flex-wrap:wrap`, e os itens `min-width:0; flex:1 1 12rem`
  (padrão do `A11Y-DECISIONS.md`, "Grid responsivo"); sem largura fixa nas caixas.
- **Arquivos envolvidos:** `src/devin.css` (regras `.ep02-diagrama*`).
- **Ferramenta/MCP existente:** nenhuma ferramenta pronta mede 1.4.12; o "Text Spacing bookmarklet" é manual. A sonda
  `probe.mjs` já faz isso (ver AV2-17, métrica nova).
- **Teste necessário:** métrica `spacing:clip` na catraca (AV2-17).
- **Esforço:** S · **Confiança:** alta

#### AV2-08 — Movimento contínuo sem mecanismo de pausar/parar
- **Status:** PROVÁVEL · **Severidade:** P2 · **Tipo:** WCAG obrigatório · **Critério:** 2.2.2 (A)
- **Página(s):** 32 páginas PT+EN com animação infinita (lista abaixo), canvas de `proposta-engenharia-reversa`
  (rAF ~26/s) e jogos `life`/`life3d`
- **Problema:** com a preferência de movimento padrão, 118 animações infinitas rodam em paralelo ao conteúdo; só 3
  páginas oferecem algum controle de pausa. `prefers-reduced-motion` já zera tudo (Fase 5), mas é preferência do
  sistema, não "mecanismo" na página.
- **Evidência (FATO):** `probe.mjs` (`animSample` por página). Exemplos: `index` (`pf-train` ×5, `pf-aurora`), `devin`
  (7 camadas `atm-*`), `terminal-evolutivo` (11), `service-operations-2-0` (6), `proposta` (`float` no ícone).
- **Interpretação (INFERÊNCIA):** o texto normativo diz *"moving, blinking or scrolling information"*. Se "information"
  cobre decoração é ponto disputado. A leitura conservadora (é distração em paralelo, que é o que o Understanding 2.2.2
  quer evitar) exige mecanismo. Decisão de interpretação do dono: **ADR-AV2-04**.
- **Solução recomendada (mínima, técnica G11/G152):** animações **decorativas** param sozinhas em até 5 s
  (`animation-iteration-count` finito). Nada de botão, nem de UI nova. Ficam com controle de pausa: canvas do hero
  (botão "Pausar animação" com `aria-pressed`, padrão de mídia do `A11Y-DECISIONS.md`). Jogos `life`/`life3d`: animação
  essencial da atividade (exceção do critério); registrar em `A11Y-DECISIONS.md`. Indicadores de carregamento
  (`fa-spin` em `admin*`, EXC) ficam fora.
- **Arquivos envolvidos:** CSS das 16 páginas PT listadas no `probe.json`, que propagam para o EN;
  `src/proposta-engenharia-reversa.html` (canvas).
- **Ferramenta/MCP existente:** nenhuma decide "essencial ou decorativa". A contagem já sai do `getAnimations()` (sonda).
- **Teste necessário:** métrica `motion:infinite` (sem `reduce`) na catraca, com baseline atual, para impedir animação
  infinita **nova**.
- **Risco de regressão:** visual (o site "para de respirar" depois de 5 s). Por isso precisa do ADR.
- **Esforço:** M · **Confiança:** média (interpretação)

#### AV2-09 — Texto invisível sem JavaScript
- **Status:** CONFIRMADO · **Severidade:** P2 · **Tipo:** UX Accessibility (regra MUST do `A11Y.md` §6, "Conteúdo Refém do JavaScript"); afeta também SEO/AEO e agentes (P4 de `product-spec.md`)
- **Página(s) (FATO, % do texto escondido):** `engenharia-confianca` 91 %, `engenharia-agentes-ia` 89 %,
  `devops-salesforce` 78 %, `service-operations-2-0` 77 %, `sustentacao` 49 %, `proposta-engenharia-reversa` 45 %,
  `life3d` 40 % (pouco texto), `devin` 30 %
- **Problema:** classes de revelação (`.reveal`, `.animated`, `.ec-reveal`, `.eai-section`, `.ep07-exercise-card`)
  partem de `opacity:0` no CSS e só um script as revela.
- **Evidência:** `nojs.mjs` mede o texto em ancestral com `opacity:0` ou `visibility:hidden` com JS desligado. As 4
  páginas que já têm `*.nojs.spec.js` (`apresentacao`, `formulacao`, `index`, `digital-workplace`) passam.
- **Impacto:** script bloqueado, falho ou lento (CDN, extensão, rede) deixa a página vazia; o leitor de tela lê, mas
  quem enxerga não vê.
- **Solução recomendada:** o estado padrão passa a ser o legível. Condicionar o estado inicial ao JS:
  `<html class="no-js">` + `<script>document.documentElement.classList.remove('no-js')</script>` inline no `<head>`
  (antes do primeiro paint) e reescrever a regra como `html:not(.no-js) .reveal{opacity:0}`. É o padrão que o próprio
  `A11Y.md` sugere.
- **Arquivos envolvidos:** CSS e `<head>` das 8 páginas; espelhos via i18n.
- **Ferramenta/MCP existente:** o projeto `no-js` do Playwright já existe; falta cobertura.
- **Teste necessário:** a métrica `nojs:hidden-pct` (≤ 5 %) entra na catraca para todas as páginas (lógica de `nojs.mjs`).
  Isso substitui criar um `*.nojs.spec.js` por página.
- **Risco de regressão:** flash de conteúdo antes da animação, que o script inline no `<head>` evita.
- **Esforço:** M · **Confiança:** alta

#### AV2-10 — Espelho EN com títulos vazios; manifesto i18n ignora a versão do tradutor
- **Status:** CONFIRMADO · **Severidade:** P2 · **Tipo:** Qualidade · **Critério:** 1.3.1, 2.4.6
- **Página(s):** `en/socialselling.html:1123` ("⛔ Guardrails…") e o h3 "📄 Features Gherkin" → `<h3></h3>`
- **Causa raiz (FATO):** o espelho foi gerado em `0670013` (2026-10-03 22:42), **antes** da correção do tradutor
  (`cb060c6`, 23:35, fallback para o PT quando a tradução volta vazia). O `i18n-manifest.json` registra só o hash da
  fonte; como o PT não mudou, `i18n:check` diz "em dia" e o espelho velho nunca é regenerado. A catraca não pega porque
  `empty-heading` é regra *best-practice* e ela roda só as tags WCAG.
- **Solução recomendada:** (1) `npm run i18n:sync:all` agora; (2) o manifesto passa a guardar o hash de `scripts/i18n/*.py`
  (ou uma `versao_motor`) e o `--check` acusa espelho gerado por motor antigo; (3) AV2-17 adiciona `empty-heading` à catraca.
- **Arquivos envolvidos:** `scripts/sync-i18n.mjs`, `scripts/i18n/i18n-manifest.json`, `src/en/**` (regenerados, nunca à mão).
- **Ferramenta/MCP existente:** não há; o tradutor é local por decisão de arquitetura (AGENTS.md).
- **Teste necessário:** `tests/i18n.test.mjs`: mudar a versão do motor faz o `--check` falhar.
- **Esforço:** S · **Confiança:** alta

#### AV2-11 — Catraca não determinística em `motion:reduce`
- **Status:** CONFIRMADO · **Severidade:** P2 · **Tipo:** Qualidade
- **Problema e evidência (FATO):** a varredura completa (pool 4, com carga paralela) mediu `exemplopdi motion:reduce`
  = 0 e falhou com "a dívida DIMINUIU". Três rodadas isoladas da mesma página no mesmo build mediram 1, igual ao
  baseline e ao CI. A métrica depende de tempo: animação curta ainda rodando depois de `finish()` + 300 ms.
- **Impacto:** gate vermelho sem mudança de código. O caminho fácil vira `--update`, e uma melhoria falsa trava um
  baseline errado; depois, a página "regride" sozinha.
- **Solução recomendada (mínima):** em `a11y-sweep.mjs`, uma página com qualquer divergência é **medida de novo, em
  série, sozinha**, e só a segunda medição conta (≈ 10 linhas). Não mexer na catraca em si.
- **Arquivos envolvidos:** `scripts/a11y-sweep.mjs`.
- **Ferramenta/MCP existente:** nenhuma; a catraca é própria e pequena (§6).
- **Teste necessário:** `tests/a11y-ratchet.test.mjs` não muda (a função pura não muda); validar com 3 rodadas completas iguais.
- **Esforço:** S · **Confiança:** alta

#### AV2-12 — Deploy não espera o gate; `main` sem proteção
- **Status:** CONFIRMADO · **Severidade:** P2 · **Tipo:** Arquitetura
- **Problema e evidência (FATO):** `deploy.yml` roda em `push: main` sem `needs` nem `workflow_run`; no push de
  `fa5f4a8` o deploy terminou em 50 s e o gate em 38 min. A API do GitHub responde "Branch not protected" e não há
  rulesets. Um gate vermelho em PR não impede o merge, e o merge publica.
- **Solução recomendada (Reuse, sem código):** ruleset do GitHub no `main` exigindo o check "Build + Playwright + a11y"
  (`test.yml`) e PR. **Ação do dono:** é configuração da conta; o agente não altera. Opcional: deploy por
  `workflow_run` do gate, que custa 38 min de latência a cada deploy, por isso só se o ruleset não bastar.
- **Arquivos envolvidos:** nenhum (ruleset); opcionalmente `.github/workflows/deploy.yml`.
- **Ferramenta/MCP existente:** recurso nativo do GitHub; o `gh` CLI basta para conferir.
- **Teste necessário:** abrir um PR com o gate vermelho e confirmar que o merge fica bloqueado.
- **Esforço:** S · **Confiança:** alta

#### AV2-13 — `hreflang` só no lado EN
- **Status:** CONFIRMADO · **Severidade:** P2 · **Tipo:** SEO (SEO × i18n)
- **Problema e evidência (FATO):** `SDD-i18n-en.md` §6.1 exige o trio recíproco nas **duas** versões; `dist/index.html`
  e `dist/devin.html` têm 0 `hreflang`, os espelhos EN têm 3. `tests/i18n.test.mjs:75` só confere o lado EN.
  INFERÊNCIA: anotação `hreflang` sem volta é ignorada pelos buscadores.
- **Solução recomendada:** o injetor idempotente já existente (`scripts/seo/`, marcadores) ou o `sync-i18n` escreve o
  trio também no PT de cada página com espelho; o teste passa a conferir os dois lados.
- **Arquivos envolvidos:** `scripts/seo/build-aeo.mjs` ou `scripts/sync-i18n.mjs`; `tests/i18n.test.mjs`; 33 `src/*.html`.
- **Ferramenta/MCP existente:** o próprio injetor (Reuse). O `lighthouse_audit` do Chrome DevTools MCP checa `hreflang`
  válido por página, mas não reciprocidade.
- **Esforço:** S · **Confiança:** alta

#### AV2-14 — `REPORT.md` afirma mais do que a evidência atual
- **Status:** CONFIRMADO · **Severidade:** P2 · **Tipo:** Qualidade (processo)
- **Problema:** marca `[x]` em "Foco não obscurecido (SC 2.4.11)", que AV2-05 refuta para cabeçalhos; lista 1.4.12,
  1.4.13 e 2.5.7 como "não escrevi sondas", que agora têm resultado (AV2-06/07; 2.5.7 passa); não registra AV2-01, que
  quebra T4.
- **Solução recomendada:** atualizar `REPORT.md` com os achados desta auditoria **antes** de qualquer correção, com 2.4.11
  em `[!]`, e referenciar este arquivo. Regra do próprio relatório: não afirmar mais do que a evidência sustenta.
- **Esforço:** S · **Confiança:** alta

#### AV2-15 a AV2-28 (P3/P4), especificação compacta

| ID | Problema e evidência | Causa raiz | Solução (mínima) | Arquivos | Ferramenta existente | Teste | Esforço |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| AV2-15 | `devin.html:3498` `<h2 class="devin-title-lg ep09-sintese__title"></h2>` vazio no HTML; nenhum script o preenche (o `epico-09.js:179` só anima) | texto removido, tag ficou | escrever o título ou remover o `<h2>` | `src/devin.html` | — | `empty-heading` na catraca (AV2-17) | S |
| AV2-16 | `heading-order`: 24 nós PT+EN. `case-agents` (2), `know`, `knowledge-os-presentation`, `proposta-engenharia-reversa`, `salesforce-agentic-dev` (2), `service-operations-2-0` (4), `sustentacao` (h2→h4) | `h4` usado por tamanho visual | trocar para `h3` e manter a classe visual | 7 `src/*.html` | axe `heading-order` | catraca `bp:heading-order` | S |
| AV2-17 | Regras best-practice com nós, fora de EXC: `aria-allowed-role` 34 (`devin` ×17 ×2), `heading-order` 24, `landmark-complementary-is-top-level` 22, `region` 10, `empty-heading` 4, `landmark-banner-is-top-level` 4, `empty-table-header` 2, `landmark-unique` 2. A catraca só roda tags WCAG, e foi assim que AV2-10 escapou | escopo de tags | **estender** a catraca: chaves `bp:<regra>` para essas 8 regras + `spacing:clip` (lógica de `probe.mjs`) + `nojs:hidden-pct` (lógica de `nojs.mjs`) + `motion:infinite`, com baseline gravado hoje; sem runner novo | `scripts/a11y-sweep.mjs`, `tests/a11y/baseline.json` | axe best-practice (instalado) | a própria catraca | M |
| AV2-18 | Rolagem horizontal: `artifice` 146 px a 768 (o `span#tip-newport`, oculto, ainda estende a área), `socialselling` 57 px a 768 (`nav.md:flex` larga), `salesforce-agentic-quickstart` 18 px a 640 (grid `lg:col-span`), `knowledge-os-presentation` 5 px a 640 | regras de layout só para ≤ 640 | tooltip: AV2-06; `socialselling`: menu horizontal só em `lg:`; quickstart: `min-width:0` nos itens | 3 páginas | — | métrica `reflow:768` opcional na catraca | S |
| AV2-19 | F-18: consentimento e `<eco-nav>` em PT nos espelhos EN (marcados `lang="pt-BR"`, 3.1.2 mitigado) | texto jurídico sem tradução revisada | traduzir as strings do `eco-nav` (não jurídicas) pelo Argos; consentimento depois de revisão do dono | `src/js/eco-nav.js`, `src/js/cookie-consent.js` | Argos local (já instalado) | `label-in-name.spec.js` já cobre | M |
| AV2-20 | 15 iframes do YouTube diretos em 12 páginas: 58 nós de violação no DOM de terceiro + o peso do player na carga | facade só no EAI | **reusar** `src/js/eai-video.js` (poster + botão, `youtube-nocookie`) nas 12 páginas | 12 `src/*.html` | componente interno existente | catraca (os 58 nós somem); `perf-budget` | M |
| AV2-21 | 8 `<audio>` sem nome; 3 na mesma página (`know`); o leitor de tela anuncia "áudio" ×3 | — | `aria-labelledby` apontando para o título do card | 5 páginas | — | asserção estática junto de AV2-02 | S |
| AV2-22 | `life`/`life3d`: `window.keydown` trata `a`/`d` (e `w`/`s`) com `preventDefault` na página toda (`life.html:1202-1203`, `life3d.html:1163-1167`) | atalhos de jogo globais | escutar só com o foco no palco do jogo, ou retirar as letras (as setas já existem) | 2 páginas | — | Playwright: tecla `a` fora do palco não move | S |
| AV2-23 | `life3d #intro` com `aria-modal` sem gestão de foco nem fundo `inert`; tablist de maturidade da `engenharia-confianca` sem `aria-selected="true"` ao carregar (Fase 7, achados 11 e 12) | — | `<dialog>` + `showModal()` (padrão do `A11Y-DECISIONS.md`); selecionar a 1ª aba no init | `src/life3d.html`, `src/js/engenharia-confianca.js` | `a11y-tabs.js` (existente) | `widgets.spec.js` | S |
| AV2-24 | `sustentacao`: infográfico (`infosust.png`) com `alt` de 4 palavras; imagem de texto (1.4.5); o rótulo "Clique para ampliar" só aparece no hover; o link abre a imagem em nova aba sem aviso | — | humano confirma se o texto da página cobre o infográfico; senão, `<details>` com a descrição longa; mostrar o rótulo também no `:focus-visible` | `src/sustentacao.html` | — | — | S + humano |
| AV2-25 | `tests/_helpers/axe.js` usa tags até `wcag21aa`; `.claude/agents/a11y-design-reviewer.md` diz "WCAG 2.1 AA"; Playwright roda no dev server (FOUC, retry local declarado em `playwright.config.js`) | deriva desde a Fase 1 | constante de tags única (a da catraca); agente passa a 2.2 AA; `webServer` vira `vite preview` sobre o build (PR próprio, já previsto no comentário do config) | 3 arquivos | — | gate | S / M |
| AV2-26 | Nenhuma página PT liga para o seu espelho `/en/` (0 `href="/en/…"` em `src/*.html`) | i18n só por SEO | link "English" com `lang="en" hreflang="en"` no `eco-nav` ou no rodapé | `src/js/eco-nav.js` | — | `audit-site.mjs` | S |
| AV2-27 | `apm.yml` declara `github-mcp-server`, `context7`, `playwright-mcp` e `filesystem`; `.mcp.json` tem `context7` e `repowise`; nesta sessão `context7` e `chrome-devtools-mcp` deram timeout e o plugin GitHub falhou na autenticação | config em dois lugares | aplicar a decisão de §5/§6: manter só o que tem uso; consertar ou desligar o que falha | `apm.yml`, `.mcp.json` | — | — | S |
| AV2-28 | `diagnostic` e `test-github` publicadas (fora do sitemap, sem `noindex`), com 2 campos sem rótulo cada (EXC-001/002) | utilitários internos no `src/` | **remover do build público** (`EXCLUIR` do `vite.config.js` ou mover para fora de `src/`); zera 2 exceções sem escrever código de a11y. Decisão do dono (D-06) | `vite.config.js`, `scripts/a11y-sweep.mjs` (mesmo filtro) | — | catraca (as chaves somem) | S |

---

## 4. WCAG Matrix (2.2, níveis A e AA; 4.1.1 foi removido no 2.2)

Legenda: ✅ validado (com a fonte) · 🟨 parcial · ❌ falha confirmada · ⚠️ falha provável · ❔ não validado · — N/A (com motivo).
Fontes: **v2** = esta auditoria; **F7** = verificação independente da Fase 7; **C** = catraca/CI.

| SC | Nível | Status | Evidência / lacuna |
| :-- | :-: | :-: | :-- |
| 1.1.1 Conteúdo não textual | A | 🟨 | presença de `alt` 30/30 (F7); qualidade ❔; infográfico AV2-24 |
| 1.2.1 Somente áudio/vídeo | A | ⚠️ | AV2-02 |
| 1.2.2 Legendas (pré-gravado) | A | ❔ | AV2-03; EXC-008 |
| 1.2.3 Audiodescrição ou alternativa | A | ❔ | AV2-03 |
| 1.2.4 Legendas (ao vivo) | AA | — | sem mídia ao vivo (v2, inventário) |
| 1.2.5 Audiodescrição | AA | ❔ | AV2-03 |
| 1.3.1 Informações e relações | A | 🟨 | axe 0 fora de EXC (C); títulos vazios e saltos (AV2-10/15/16); leitor de tela ❔ |
| 1.3.2 Sequência significativa | A | ❔ | precisa de leitor de tela (AV2-04) |
| 1.3.3 Características sensoriais | A | ❔ | instrução do OCC "arraste aqui" (corrigida em AV2-01); resto não revisado |
| 1.3.4 Orientação | AA | ✅ | 0 `@media (orientation)` e 0 `orientation.lock` (v2, E8) |
| 1.3.5 Propósito da entrada | AA | — | nenhum campo público pede dado pessoal (v2: inputs listados); `admin` em EXC |
| 1.4.1 Uso de cor | A | 🟨 | links em texto (axe `link-in-text-block` 0, C); resto ❔ |
| 1.4.2 Controle de áudio | A | ✅ | 0 áudio com `autoplay` (v2); `vsl` é vídeo `muted` (EXC-005) |
| 1.4.3 Contraste mínimo | AA | 🟨 | axe 0 fora de EXC (C); 2 447 nós "incomplete" ❔; EXC-006 |
| 1.4.4 Redimensionar texto | AA | 🟨 | zoom não bloqueado (F7); a 640 px há rolagem horizontal pequena (AV2-18), sem perda comprovada; texto a 200 % real ❔ |
| 1.4.5 Imagens de texto | AA | ❔ | infográfico de `sustentacao` (AV2-24) |
| 1.4.10 Reflow | AA | ✅ | `reflow:320` em 75 páginas, só EXC (C) |
| 1.4.11 Contraste não textual | AA | ❔ | axe não mede; anel de foco 7,49:1 (REPORT); bordas de controle não medidas |
| 1.4.12 Espaçamento de texto | AA | ❌ | `devin` (AV2-07); 73/75 ok (v2) |
| 1.4.13 Conteúdo em hover/foco | AA | ❌ | tooltip da `artifice` (AV2-06) |
| 2.1.1 Teclado | A | ❌ | OCC cap. 3 (AV2-01); 14 tablists ok (F7) |
| 2.1.2 Sem armadilha | A | 🟨 | 8 páginas ok (F7); demais ❔ |
| 2.1.4 Atalhos de caractere | A | ⚠️ | jogos (AV2-22) |
| 2.2.1 Tempo ajustável | A | ❔ | nenhum limite de tempo observado; não procurado de forma sistemática |
| 2.2.2 Pausar, parar, ocultar | A | ⚠️ | AV2-08 |
| 2.3.1 Três flashes | A | ❔ | INFERÊNCIA: as animações vistas (`ping`, `pulse`) ciclam ≤ 1/s; nenhuma ferramenta de flash rodou |
| 2.4.1 Ignorar blocos | A | ✅ | skip link + `<main>` em toda página fora de EXC (C, F7) |
| 2.4.2 Página com título | A | ✅ | únicos, exceto o par `admin` em EXC (v2) |
| 2.4.3 Ordem do foco | A | 🟨 | 8 páginas (F7); `life3d #intro` (AV2-23) |
| 2.4.4 Finalidade do link (contexto) | A | 🟨 | axe `link-name` 0 (C); adequação ❔ |
| 2.4.5 Várias formas | AA | ✅ | catálogo + `<eco-nav>` + sitemap (inspeção) |
| 2.4.6 Cabeçalhos e rótulos | AA | 🟨 | títulos vazios (AV2-10/15) |
| 2.4.7 Foco visível | AA | ✅ | pixel em 15 páginas (C); 3 284 focáveis (F7); Safari ❔ |
| 2.4.11 Foco não obscurecido (mín.) | AA | ❌ | banner e `eco-nav` ok (C); cabeçalhos fixos falham (AV2-05) |
| 2.5.1 Gestos de ponteiro | A | ❔ | nenhum gesto multiponto encontrado no código (grep); não testado |
| 2.5.2 Cancelamento de ponteiro | A | 🟨 | `pointerdown`/`touchstart` só nos controles de jogo (segurar para andar: exceção de essencial / reversão no `up`) |
| 2.5.3 Rótulo no nome | A | ✅ | `label-in-name.spec.js`, 75 páginas (C); uso real de controle por voz ❔ |
| 2.5.4 Atuação por movimento | A | ✅ | 0 `devicemotion`/`deviceorientation` (v2, grep) |
| 2.5.7 Movimentos de arrastar | AA | ✅ | único arrasto (OCC) tem alternativa de ponteiro único, clique e clique (v2, E12) |
| 2.5.8 Tamanho do alvo (mín.) | AA | ✅ | axe `target-size` 0 fora de EXC (C); 8 páginas manuais (F7) |
| 3.1.1 Idioma da página | A | ✅ | `pt-BR`/`en` coerentes, 75 páginas (F7) |
| 3.1.2 Idioma das partes | AA | 🟨 | trechos PT nos EN marcados (F-18 mitigado); termos técnicos em inglês nas PT não marcados (palavras correntes, aceitável) |
| 3.2.1 Em foco | A | 🟨 | nenhuma mudança de contexto nas varreduras de Tab (F7) |
| 3.2.2 Em entrada | A | ❔ | quizzes e rádios não revisados com esse olhar |
| 3.2.3 Navegação consistente | AA | 🟨 | `<eco-nav>` idêntico em todas (INFERÊNCIA); cabeçalhos por página variam, mas cada página é um conjunto próprio |
| 3.2.4 Identificação consistente | AA | ❔ | — |
| 3.2.6 Ajuda consistente | A | ❔ | não há "ajuda" declarada; contato varia por página. Decidir se o rodapé de contato é "mecanismo de ajuda" |
| 3.3.1 Identificação do erro | A | — | sem formulário público com validação (OCC aplica default); `admin` em EXC |
| 3.3.2 Rótulos ou instruções | A | 🟨 | campos públicos rotulados (axe `label` 0 fora de EXC); EXC-001/002 |
| 3.3.3 Sugestão de erro | AA | — | idem 3.3.1 |
| 3.3.4 Prevenção de erro | AA | — | sem transação legal ou financeira |
| 3.3.7 Entrada redundante | A | — | nenhum processo pede o mesmo dado duas vezes |
| 3.3.8 Autenticação acessível (mín.) | AA | — | só no `admin` (token do GitHub, colar permitido: sem `paste` bloqueado); EXC-003 |
| 4.1.2 Nome, função, valor | A | ❌ | blocos do OCC (AV2-01); nome do tooltip (AV2-06); axe 0 fora de EXC (C) |
| 4.1.3 Mensagens de status | AA | 🟨 | regiões vivas existem (F7); o que é anunciado ❔ (AV2-04) |

---

## 5. MCP / Tool Discovery

Busca feita nesta ordem: (1) MCPs/ferramentas já no ambiente; (2) registro de conectores do claude.ai (palavras-chave
"accessibility, a11y, wcag, axe" e "browser, playwright, lighthouse, chrome devtools": **nenhum resultado relevante**);
(3) MCPs públicos, conferidos na documentação oficial de cada projeto; (4) CLIs e bibliotecas.

| Necessidade | MCP / ferramenta encontrada | Capacidade (conferida na doc) | Maturidade | Risco | Integração | Recomendação |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Varredura axe de páginas renderizadas | **`@axe-core/playwright`** (já instalado; usado por `a11y-sweep.mjs`) | axe-core em Playwright, tags WCAG 2.2 | alta (Deque, MPL-2.0) | baixo | já no gate | **USAR** (é a base) |
| Idem, via MCP | **axe MCP Server** (Deque, `dequelabs/axe-mcp-server-public`) | `analyze`, `remediate`; IGTs | oficial, proprietário | **pago** ("requires a paid Axe DevTools for Web subscription"; IGT/remediate gastam créditos de IA); lock-in | Docker ou npm; Claude/Copilot/Cursor | **EVITAR**: mesmo motor; o valor extra (IGT) é semiautomático e pago |
| Idem, via MCP comunitário | `ronantakizawa/a11ymcp` (MIT, ~92★, Puppeteer + axe), AxeCap, `jbuchan/accessibility-mcp-server`, `wcagc-mcp` (pede conta) | `test_accessibility`, `test_html_string`, `check_color_contrast`… | manutenção individual | baixo-médio (traz Puppeteer) | stdio | **EVITAR**: encapsulam o mesmo axe-core, sem cobertura nova |
| Árvore de acessibilidade, inspeção, captura | **Navegador embutido do Claude Code** (`Claude_Browser`: `read_page`, `screenshot`, `javascript_tool`) | árvore de a11y, DOM, capturas | nativo do app | baixo (isolado do Chrome do usuário) | disponível agora | **USAR** em exploração e verificação visual pontual; não no gate |
| Idem, por código | Playwright `ariaSnapshot()` (já instalado) | snapshot da árvore em teste | alta | baixo | já usado na Fase 7 | **USAR** em regressão |
| Lighthouse (a11y, SEO, best practices), traces de performance | **Chrome DevTools MCP** (`ChromeDevTools/chrome-devtools-mcp`, Apache-2.0) | `lighthouse_audit` (a11y, SEO, best practices; **sem** performance), `take_snapshot`, `emulate` (viewport, esquema de cor, rede, CPU), `performance_*` | oficial Google, ativo | baixo | plugin **instalado**, mas `CONNECT_TIMEOUT` nesta sessão | **AVALIAR**: consertar a conexão e usar em exploração de SEO/LCP. Lighthouse a11y é subconjunto do axe: **não** entra no gate |
| Automação de navegador para agentes | **Playwright MCP** (`microsoft/playwright-mcp`, Apache-2.0) | 60+ ferramentas; opera pela árvore de a11y; **sem axe** | oficial, ativo | baixo | declarado no `apm.yml`, ausente do `.mcp.json` | **EVITAR no Claude Code**: duplica o navegador embutido e o `@playwright/test`. O próprio README recomenda CLI + skills para agentes de código. Manter só para harnesses sem navegador (Copilot/Cursor/Codex), se o dono quiser |
| Navegador real do usuário | Claude in Chrome | sessões logadas do usuário | — | contas reais | disponível | **EVITAR** para auditoria: nenhum ganho, risco desnecessário |
| GitHub (CI, PR, proteção de branch) | GitHub MCP (`github/github-mcp-server`) | repos, issues, PRs, actions | oficial | token | plugin **instalado**, falhou (`400 Authorization header is badly formatted`) | **EVITAR/remover**: o `gh` CLI já cobre (foi o que esta auditoria usou para E3/E4) |
| Documentação versionada (Playwright, axe, Vite) | context7 (`@upstash/context7-mcp`) | busca em docs | comunitário, ativo | baixo | `.mcp.json`; timeout nesta sessão | **AVALIAR**: útil, não crítico; consertar ou retirar do `.mcp.json` |
| Leitor de tela real | computer-use (instalado; opera apps nativos) | poderia dirigir o NVDA no Windows | — | médio | disponível | **AVALIAR** só como pré-triagem; não substitui pessoa (AV2-04) |
| Automação de leitor de tela | **Guidepup** (`guidepup/guidepup`, MIT, `@guidepup/playwright`) | NVDA (Windows Server 2022/2025) e VoiceOver (macOS); "complementa, não substitui" o teste manual | ativo, ~568★ | médio (setup de SO, CI dedicado) | biblioteca | **AVALIAR** depois do teste humano, para 2–3 widgets críticos |
| Segundo motor de regras | **IBM Equal Access `accessibility-checker`** (Apache-2.0) | Playwright, baselines, CLI `achecker`; baixa o motor de CDN | ativo | baixo | biblioteca/CLI | **AVALIAR** como piloto **único** (segunda opinião), não gate |
| Idem | Siteimprove **Alfa** (MIT; regras ACT do W3C) | motor ACT, saída EARL | ativo | baixo | biblioteca | alternativa ao IBM: escolher **um** só |
| Lighthouse em CI | Lighthouse CI | auditoria a11y = subconjunto do axe | alta | — | — | **EVITAR** para a11y (duplicado); performance já tem `perf-budget.mjs` |
| Runner axe/HTMLCS | pa11y-ci | axe ou HTML_CodeSniffer | alta | — | — | **EVITAR** (duplicado) |
| Validação de HTML | Nu HTML Checker (`vnu-jar`, Java) | validade de parsing | alta | dependência Java | CLI | **OPCIONAL** (4.1.1 saiu do 2.2; é qualidade, não a11y). Documentação não reconsultada nesta sessão |
| Relatório padronizado | W3C WCAG-EM Report Tool | relatório por critério | W3C | — | web | **OPCIONAL** (o `REPORT.md` já segue o template do `A11Y.md`) |
| Inteligência de código | repowise / CodeGraph (instalados) | grafo de JS | — | — | MCP | **USAR** só para JS: o CodeGraph não indexa HTML, onde está a maior parte do comportamento auditado |

**FATO:** nenhum MCP disponível mede o que esta auditoria achou de novo (2.4.11 com cabeçalho, 1.4.12, 1.4.13, sem-JS,
T4 por teclado). As sondas que acharam isso somam cerca de 350 linhas sobre o Playwright já instalado.

---

## 6. Reuse vs Build

Regra: **Reuse > Integrate > Extend > Build**.

| Necessidade | Solução existente | MCP | Biblioteca/CLI | Implementação própria | Decisão |
| :-- | :-- | :-- | :-- | :-- | :-- |
| axe em todas as páginas, com catraca | `scripts/a11y-sweep.mjs` (184 linhas) + `a11y-ratchet.mjs` | axe MCP (pago), comunitários (mesmo motor) | IBM checker tem baseline, mas é outro motor | — | **Reuse** + **Extend** (AV2-11, AV2-17) |
| Métricas que nenhum motor tem (reflow, movimento, skip, espaçamento, sem-JS) | a própria catraca | — | — | ~80 linhas na catraca (lógica já escrita em `auditoria-v2-sondas/`) | **Extend**: só chaves novas, sem runner novo |
| Tarefas por teclado (T4) | `tests/a11y/tasks.spec.js` | nenhum conhece a tarefa | — | 1 spec por tarefa quebrada | **Build** (justificado: comportamento do produto) |
| 2.4.11 com cabeçalhos | `independent.spec.js` (banner/`eco-nav`) | — | — | ~30 linhas | **Extend** |
| Árvore de acessibilidade | `ariaSnapshot()`; navegador embutido | Chrome DevTools/Playwright MCP | — | — | **Reuse** |
| Lighthouse / SEO pontual | — | Chrome DevTools MCP (`lighthouse_audit`) | — | — | **Integrate** (consertar a conexão; uso exploratório) |
| Leitor de tela | — | — | Guidepup (depois) | — | **Reuse** de pessoa; **Integrate** opcional |
| Legendas e transcrição | — | — | YouTube Studio; transcritor local como rascunho (HIPÓTESE) | — | **Reuse** (plataforma + humano) |
| Contraste sobre gradiente/imagem | — | — | nenhuma decide | — | **Não construir**: amostragem manual |
| Facade de vídeo | `src/js/eai-video.js` | — | — | — | **Reuse** (AV2-20) |
| Bloquear deploy com gate vermelho | — | — | ruleset do GitHub (nativo) | `workflow_run` | **Reuse** (AV2-12) |
| `hreflang` no PT | injetor `scripts/seo/` | — | — | — | **Extend** (AV2-13) |
| Espelho velho | `sync-i18n.mjs --check` | — | — | versão do motor no manifesto | **Extend** (AV2-10) |
| Validação de HTML | — | — | vnu | — | opcional |
| Relatório | `REPORT.md` (template `A11Y.md`) | — | WCAG-EM | — | **Reuse** |
| Sondas descartáveis | `fase7-sondas/` (43 scripts), `auditoria-v2-sondas/` | — | — | — | **Arquivo de evidência**: não manter nem promover; o que vale vira chave da catraca ou spec |

O que **não** construir: crawler (a lista de páginas vem de `src/`), scanner próprio (o axe resolve), MCP próprio,
gerador de relatório, wrapper de Lighthouse.

---

## 7. Backlog

Ordem dentro de cada grupo: impacto × severidade × cobertura × facilidade.

### MUST FIX
1. **AV2-01**: OCC cap. 3 por teclado (P0, S).
2. **AV2-14**: `REPORT.md` reflete esta auditoria (P2, S). Vem primeiro entre os P2 porque não se corrige o que o relatório diz que está ok.
3. **AV2-05**: `scroll-padding-top` nas páginas com cabeçalho fixo (P2, S, 6 páginas).
4. **AV2-06**: tooltip da `artifice` (P2, S).
5. **AV2-07**: diagrama do `devin` sob espaçamento (P2, S).
6. **AV2-10**: `i18n:sync:all` + versão do motor no manifesto (P2, S).
7. **AV2-11**: catraca determinística (P2, S).
8. **AV2-12**: ruleset no `main` (P2, S; ação do dono).
9. **AV2-02**: transcrições de áudio (P1, M; humano).
10. **AV2-03**: triagem de legendas por vídeo (P1, L; humano).
11. **AV2-04**: sessão com leitor de tela, T1–T7 (P1, M; humano).
12. **AV2-08**: movimento: decorativas finitas + pausa no canvas (P2, M; exige ADR-AV2-04).
13. **AV2-09**: estado padrão legível sem JS (P2, M, 8 páginas).

### SHOULD FIX
14. **AV2-17**: chaves novas na catraca (`bp:*`, `spacing:clip`, `nojs:hidden-pct`, `motion:infinite`) (M). Protege 1–13 de voltar.
15. **AV2-13**: `hreflang` recíproco (S).
16. **AV2-15** + **AV2-16**: títulos vazios e saltos (S).
17. **AV2-20**: facade do YouTube nas 12 páginas (M).
18. **AV2-23**: `life3d #intro` com `<dialog>`; aba inicial da confiança (S).
19. **AV2-25**: tags axe únicas, agente revisor em 2.2, Playwright sobre o build (S/M).
20. **AV2-19**: tradução do `eco-nav`; consentimento depois de revisão (M).

### NICE TO HAVE
21. **AV2-18**: rolagem horizontal entre 640 e 1024 px (S).
22. **AV2-21**: nome nos `<audio>` (S).
23. **AV2-22**: teclas de jogo só com foco no palco (S).
24. **AV2-24**: descrição longa do infográfico (S + humano).
25. **AV2-28**: remover `diagnostic`/`test-github` do build (S; decisão do dono).
26. **AV2-26**: link visível para o espelho EN (S).
27. **AV2-27**: limpar a configuração de MCP (S).

---

## 8. Roadmap

Cada fase é um PR com `npm run gate` verde no CI e `sync-i18n` quando tocar ativo PT-BR.

| Fase | Conteúdo | Saída verificável |
| :-- | :-- | :-- |
| **1 — Críticas (P0/P1)** | AV2-14 (relatório honesto) → AV2-01 (OCC) → abrir AV2-02/03/04 com dono e data (planilha de mídia, sessão de leitor de tela) | spec "OCC cap. 3 só por teclado" verde nos 3 navegadores; `REPORT.md` com 2.4.11 `[!]` e T4 `[!]` até o merge |
| **2 — Estruturais (várias páginas)** | AV2-05, AV2-09, AV2-08 (depois do ADR), AV2-10, AV2-13, AV2-16 | sondas da v2 zeradas nas páginas corrigidas; `i18n:check` acusa motor antigo |
| **3 — Componentes** | AV2-06 (tooltip), AV2-07 (diagrama), AV2-20 (facade), AV2-23, AV2-21, AV2-19 | 58 nós de terceiro somem da medição; `widgets.spec.js` cobre o tooltip |
| **4 — Testes** | AV2-17 (chaves novas), AV2-11 (reconfirmação), AV2-25 (tags e build); 2.4.11 com Shift+Tab no `independent.spec.js` | baseline regravado **uma vez**, com cada chave justificada no PR |
| **5 — Validação manual** | NVDA + Firefox, VoiceOver + Safari (T1–T7); revisão de legendas e transcrições; amostragem de contraste sobre gradiente; Safari por teclado; controle por voz | `REPORT.md` §3/§5 com par, pessoa, data e cenário |
| **6 — Tooling** | AV2-12 (ruleset), AV2-27 (MCP), consertar Chrome DevTools MCP; piloto **único** do IBM checker; avaliar Guidepup para 2–3 widgets | decisão registrada (adotar ou descartar) com números do piloto |
| **7 — Refinamento** | AV2-18, AV2-22, AV2-24, AV2-26, AV2-28; reauditoria independente **por outro modelo** (pendência do `REPORT.md`) | `REPORT.md` sai de CONDICIONAL **só** se não restar `[ ]`/`[!]` |

---

## 9. Definition of Done (por correção)

Uma correção só fecha quando **todos** os itens aplicáveis estão marcados no PR:

1. **Código** corrigido no PT; espelho EN regenerado (`npm run i18n:sync && npm run i18n:check`), nunca editado à mão.
2. **Teste** automatizado novo ou existente que **falha sem a correção** (rodar contra o código antigo e anotar no PR).
3. `npx vite build` sem erro.
4. **Catraca** (`node scripts/a11y-sweep.mjs`) sem regressão; `--update` só quando a melhoria se repete em **duas**
   rodadas completas (AV2-11), com a lista de chaves que desceram no PR.
5. **Gate estático** (`node scripts/a11y-static.mjs`) ≤ teto; `--update` só para baixar.
6. **`npm run gate`** verde no CI (3 navegadores); localmente, no mínimo chromium.
7. **Sem baseline subindo, sem exceção nova** para fazer o gate passar. Exceção só com dono, aprovador, critério,
   contorno e data em `EXCEPTIONS.md`.
8. **Documentação**: `A11Y-DECISIONS.md` se surgiu padrão novo; `REPORT.md` com a linha da evidência.
9. **Validação manual** registrada quando o critério exige (mídia, leitor de tela, qualidade de `alt`).
10. **Evidência reproduzível**: comando ou sonda citada no PR.

---

## 10. Decisões arquiteturais (só as necessárias)

| ID | Decisão proposta | Motivo | Estado |
| :-- | :-- | :-- | :-- |
| **ADR-AV2-01** | **Não adotar MCP de acessibilidade.** A medição fica no código (`@axe-core/playwright` na catraca). MCPs (navegador embutido, Chrome DevTools) só para exploração | todos os MCPs de a11y achados usam o mesmo axe-core; o oficial é pago; o gate precisa ser determinístico e rodar no CI sem sessão de agente | proposto |
| **ADR-AV2-02** | **Uma catraca só, com mais chaves.** Best-practice, `spacing:clip`, `nojs:hidden-pct` e `motion:infinite` entram como chaves de `baseline.json`; nenhum runner novo | o que escapou (AV2-07, AV2-09, AV2-10) estava fora das tags medidas, não fora do alcance da ferramenta | proposto |
| **ADR-AV2-03** | **O deploy depende do gate**, via ruleset do GitHub no `main` (check obrigatório + PR) | hoje produção publica em 50 s com o gate ainda rodando (E3/E4) | proposto; **ação do dono** |
| **ADR-AV2-04** | **SC 2.2.2: decorativas param sozinhas em até 5 s; canvas e loops longos ganham botão de pausa; jogos são essenciais** | interpretação conservadora do critério com o menor custo de UI (técnica G11) | proposto; **muda o visual**: dono decide |

---

## Anexo A — Inventário do site

42 páginas PT em `src/*.html` + 33 espelhos EN gerados (`src/en/`). Sem espelho: `404` e as 8 utilitárias e exceções.
Componentes compartilhados: `<eco-nav>` (web component, shadow DOM), `cookie-consent.js` (`<dialog>`),
`a11y-tabs.js`, `a11y-scroll-regions.js`, `eai-video.js` (facade), plugin Vite `a11y-focus-base` (anel de foco), snippet
inline de skip link e de movimento reduzido, bloco AEO (`aeo.css`). Bibliotecas de movimento: GSAP + Lenis (`devin`,
`engenharia-agentes-ia`, `terminal-evolutivo`), CSS/WAAPI no resto, canvas/WebGL em `life`, `life3d`, OCC e
`proposta-engenharia-reversa`.

| Página | Tipo | Interação / componentes | Mídia | Situação |
| :-- | :-- | :-- | :-- | :-- |
| `index` | principal (gerada de `cv.json`) | mapa de linhas, consentimento | — | sitemap |
| `curriculo` | currículo (gerado) | modal, nav fixa | — | sitemap |
| `catalogo` | hub do ecossistema | filtros/nós | — | sitemap |
| `cookies`, `privacidade`, `termos` | legal | consentimento | — | sitemap |
| `404` | erro | — | — | fora do sitemap |
| `agent-ready`, `capacidade-antes-do-acesso` | artigo | tabelas roláveis | YouTube (1) em `agent-ready` | sitemap |
| `case-agents` | case técnico | `<pre>` roláveis, rankings | YouTube (3) | sitemap |
| `curiosidade-e-investigacao` | artigo interativo | textarea, controles de pausa | — | sitemap |
| `artifice` | ensaio interativo | tabs, tooltips (AV2-06) | YouTube (1) | sitemap |
| `apresentacao` | apresentação (paleta `ap-`, ADR-ap-001) | seletor de perfil, hub, dock sticky | — | sitemap |
| `develop-engineering` | ferramenta | checkboxes, comparador | — | sitemap |
| `devin` | experiência longa (GSAP/Lenis) | IDE com tabs, calculadora, exercícios | YouTube (9 IDs) | sitemap |
| `devops-salesforce`, `socialselling`, `sustentacao`, `service-operations-2-0` | landing / guia | nav fixa, revelação no scroll | áudio (sust. 2, svc 1); YouTube | sitemap |
| `digital-workplace-agentico` | estudo interativo | 30 rádios, sequência | YouTube (EXC-008) | sitemap |
| `engenharia-agentes-ia` | curso interativo (Lenis) | quiz, calibrador, playground, ranges | facade de vídeo | sitemap |
| `engenharia-confianca` | artigo interativo | tabs de maturidade, checkboxes/rádios | YouTube | sitemap |
| `formulacao-de-problemas` | ferramenta | ranges, árvore | YouTube | sitemap |
| `know` | artigo multimídia | — | áudio (3), YouTube (2) | sitemap |
| `knowledge-os-presentation` | apresentação | nav fixa | — | sitemap |
| `life` / `life3d` | experimento / jogo (canvas / WebGL) | teclado global, controles de toque, `#intro` | — | sitemap |
| `operacao-capital-cognitivo` | simulador em capítulos | diálogos, fração (AV2-01), painel de evidências | canvas (gráficos) | sitemap |
| `proposta`, `proposta-engenharia-reversa`, `proposta-observabilidade-mobile` | proposta comercial | áudio próprio; canvas no hero; menu móvel | áudio (1); YouTube (1) | sitemap |
| `salesforce-agentic-dev`, `salesforce-agentic-quickstart` | treinamento / guia | checkboxes, menu móvel | áudio (1), YouTube (1) | sitemap |
| `terminal-evolutivo` | scrollytelling (GSAP) | jornada 1982–2026 | — | sitemap |
| `boutique-empresarial-showcase` | showcase | — | — | fora do sitemap, corrigida |
| `admin`, `admin-editor` | administrativa | formulário, token GitHub | — | EXC-003 |
| `diagnostic`, `test-github` | teste interno | campos sem rótulo | — | EXC-001/002 |
| `mapmind` | experimento (`<object>`) | — | — | EXC-004 |
| `vsl` | multimídia | vídeo `autoplay muted` sem controles | `tech.mp4` | EXC-005 |
| `exemplopdi` | exemplo | — | — | EXC-006 |

## Anexo B — Como reproduzir

```bash
npx vite build
npx vite preview --port 4399 --strictPort
node scripts/a11y-sweep.mjs
node scripts/a11y-static.mjs
node docs/specs/a11y-first/auditoria-v2-sondas/probe.mjs http://localhost:4399
node docs/specs/a11y-first/auditoria-v2-sondas/nojs.mjs http://localhost:4399
node docs/specs/a11y-first/auditoria-v2-sondas/obscured.mjs
node docs/specs/a11y-first/auditoria-v2-sondas/coverer.mjs
node docs/specs/a11y-first/auditoria-v2-sondas/tip.mjs
node docs/specs/a11y-first/auditoria-v2-sondas/verify.mjs
```

O `vite preview` fica rodando; o resto vai em outro terminal, a partir da raiz do repositório. `probe.mjs` cobre 75
páginas, 5 contextos cada, e leva cerca de 15 min; `coverer.mjs` e `verify.mjs` gravam capturas em `test-results/`.

O OCC precisa do dev server (`__DEBUG_*` só existe em DEV):

```bash
npx vite --port 5173 --strictPort
node docs/specs/a11y-first/auditoria-v2-sondas/occ-kbd.mjs
```

Vídeos do YouTube no código (para a triagem de AV2-03), por página: `agent-ready` g3JWoT7EGYs · `artifice` FJ4NEOgw_SY ·
`case-agents` HlgRNYHvOtg, JSYL3Ax7A7o, m69fzdS-EG0 · `devin` 8nMyU-C5Dxc, AakO78FwnB8, HlgRNYHvOtg, LbzxZDRUk8Y,
luoGsY5PrLo, m69fzdS-EG0, rYSyiQznInI, ubBJRgWuAMU, zQ453MWvBck · `digital-workplace-agentico` Z-8YtFXi-oo ·
`engenharia-confianca` 0fkru6v1O-c · `formulacao-de-problemas` lhEdMm7qvAU · `know` UzeuGIlyN9M, giKIGxP1QA0 ·
`proposta-observabilidade-mobile` 0xLFIeZovXs · `salesforce-agentic-dev` nGqrVOTiYbY · `service-operations-2-0`
4noeXzwFUnI · `sustentacao` -t8RfEvirds · `engenharia-agentes-ia` (facade; ID em `eai-video.js`/dados da página).

## Anexo C — Não validado, e quem faz

| O quê | Por quê | Quem |
| :-- | :-- | :-- |
| Leitor de tela (NVDA + Firefox, VoiceOver + Safari) em T1–T7 | nenhum par usado até hoje | pessoa usuária de leitor de tela (Q5) |
| Legendas, transcrições, audiodescrição | ninguém assistiu nem ouviu | autor/editor |
| Qualidade de `alt` e do infográfico | julgamento humano (`A11Y.md`, Image Evidence) | autor |
| 2 447 nós de contraste "incomplete" (gradiente, imagem, canvas) | o axe não decide | amostragem manual |
| Safari: Tab em links, regiões roláveis a 375 px (25 páginas), `role="list"` | WebKit do Playwright não reproduz o Safari real | pessoa com Safari/iOS |
| Controle por voz (Voice Control, Voice Access, Dragon) | sem a ferramenta | pessoa com a ferramenta |
| SC 2.4.11 em `apresentacao`, `knowledge-os-presentation`, `proposta-engenharia-reversa`, `index` | sinalizados pela sonda, sem captura | quem corrigir AV2-05 confirma antes |
| 1.4.11, 2.2.1, 2.3.1, 3.2.2, 3.2.4, 3.2.6 | sem sonda nesta rodada | revisão manual (Fase 5) |
| Páginas em EXCEPTIONS | fora do escopo declarado pelo dono | dono do risco, na revisão de 2027-04-03 |
