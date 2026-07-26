# 11 — Plano de Desenvolvimento Agêntico

> Como transformar esta especificação (docs 00–10) em código, usando um fluxo **agent-driven**:
> decomposição em pacotes de trabalho verificáveis, papéis de agente, grafo de dependências e
> portões de verificação. O plano é executável no ferramental real do repositório — não é teoria.

---

## 1. Princípios do Fluxo Agêntico

Herdados da governança agent-driven já praticada neste repositório (ver `scripts/quality-gate.mjs` e
a suíte `node --test`):

1. **Gate único, fail-closed.** Nenhum pacote é considerado pronto sem passar em `npm run gate`
   (build Vite → artefatos em dia → auditoria global → invariantes `node:test` → Playwright+axe →
   orçamento de performance). O gate é o árbitro, não o julgamento do agente.
2. **Lógica pura antes de DOM.** Todo motor (Digital Twin, Evidence, Board, Eventos) é um módulo ES
   **sem DOM**, testável por `node:test` em ~100ms. O controlador de DOM é uma casca fina por cima.
   Espelha o padrão `eai-sim-model.js` (lógica) + `eai-sim.js` (DOM).
3. **Verificação adversarial por pacote.** Cada pacote de implementação é seguido por um agente
   **verificador independente** que tenta refutar a conformidade com a spec (não confia no relato do
   implementador). Só sobrevive o que o gate + o verificador confirmam.
4. **Fonte da verdade em JS, espelhada em fixture.** Constantes de simulação (coeficientes de 03,
   catálogo de 04, banco de perguntas de 05, tabela de eventos de 06) vivem em módulos JS e são
   espelhadas em `tests/fixtures/*.json` para teste e documentação.
5. **Escopo travado no MVP.** V2/V3 (doc 10 §2) estão fora. Um agente que "descobre" trabalho de V2
   registra como tarefa futura, não implementa.

---

## 2. Papéis de Agente

| Papel | Responsabilidade | Ferramentas | Referência de agente |
| :-- | :-- | :-- | :-- |
| **Scaffolder** | Estrutura de arquivos, HTML base, tokens CSS, wiring de módulos | Write, Edit, Bash | general-purpose |
| **Engine-dev** | Motores de lógica pura + testes `node:test` | Write, Edit, Bash | general-purpose |
| **Chapter-dev** | Mecânicas de cada capítulo (DOM + canvas/SVG) | Write, Edit, Bash | general-purpose |
| **Verifier** | Refuta conformidade com a spec; roda gate focado | Read, Grep, Bash | Explore / general-purpose |
| **A11y/Design reviewer** | WCAG 2.2 AA, tokens Dark Tech, SEO | Read, Grep, Glob, Bash | `a11y-design-reviewer` |
| **Tone reviewer** | Tom pt-BR "engenharia, não marketing" na copy | Read, Grep, Glob, Bash | `tone-reviewer` |

> **Nota de orquestração:** os pacotes independentes de uma mesma fase rodam em paralelo (fan-out);
> os dependentes seguem em pipeline. O verificador de cada pacote roda assim que o pacote termina —
> não há barreira desnecessária entre pacotes independentes.

---

## 3. Grafo de Dependências (visão macro)

```
FASE 0 — Fundação
   └─▶ FASE 1 — Motores (lógica pura)      [fan-out: 4 motores em paralelo]
          └─▶ FASE 2 — HUD + Navegação
                 └─▶ FASE 3 — Capítulos 1–4  [pipeline por capítulo]
                        └─▶ FASE 4 — Capítulo 5 (sandbox)
                               └─▶ FASE 5 — Capítulo 6 (Board) + Caso de Transferência
                                      └─▶ FASE 6 — A11y/SEO/Perf + Tom
                                             └─▶ FASE 7 — Gate final + PR
```

Regra de barreira: **Fase N+1 só inicia quando o gate da Fase N está verde.** Dentro de uma fase,
pacotes sem dependência mútua correm em paralelo.

---

## 4. Pacotes de Trabalho (Work Packages)

Cada pacote traz: **entradas** (docs da spec), **saídas** (arquivos), **critério de pronto** (Definition
of Done, sempre verificável) e o **papel** responsável.

### FASE 0 — Fundação

**WP-0.1 · Scaffold da página**
- Entradas: [01](01_arquitetura_informacao_navegacao.md), [07](07_direcao_de_arte_design_system.md), [08](08_wireframes_catalogo_componentes.md)
- Saídas: `src/operacao-capital-cognitivo.html` (seções `#scene-*` + `#hud`), tokens CSS de 07 em
  `<style>`, esqueleto de `src/js/operacao-capital-cognitivo/main.js` e dos 12 módulos listados em 01.
- DoD: `npx vite build` verde; página responde 200 no smoke; `<title>`/meta/canonical/JSON-LD de 09
  presentes; único `<h1>`.
- Papel: Scaffolder → Verifier.

### FASE 1 — Motores de Lógica Pura (fan-out)

**WP-1.1 · DigitalTwinEngine**
- Entradas: [03](03_digital_twin_engine.md) integral (estado, equações 3.1–3.8, time lags, state machine).
- Saídas: `digital-twin.js` + `tests/occ-digital-twin.test.mjs`.
- DoD: todos os casos da tabela de testes de 03 §7 passam, incluindo os v4.1 — `V_core bounds`,
  não-linearidade do custo humano (`fatorFadiga`), Context Rot >50k, cache ortogonal à acurácia,
  cascata com/sem isolamento, RAG reindex/rerank. Fixture espelho em `tests/fixtures/occ-twin.json`.
- Papel: Engine-dev → Verifier.

**WP-1.2 · EvidenceBoardManager**
- Entradas: [04](04_evidence_board_system.md) (11 cards, níveis, desbloqueio, validação por categoria).
- Saídas: `evidence-board.js` + `tests/occ-evidence.test.mjs`.
- DoD: catálogo com 11 cards; `isValidForQuestion` respeita categoria (inclusive `HumanFactors`);
  todos os cards têm `evidenceLevel`, `validityContext`, `limitations`.
- Papel: Engine-dev → Verifier.

**WP-1.3 · StatefulBoardEngine**
- Entradas: [05](05_stakeholders_board_engine.md) (perfis, banco de perguntas, geração, confiança agregada).
- Saídas: `board-engine.js` + `tests/occ-board.test.mjs`.
- DoD: toda pergunta tem `stakeholderId` (retrofit das antigas); `generateQuestions` retorna 3–5 com
  diversidade de conselheiros; `evaluateAnswer` exige evidência válida; inclui `S_HF_01` e `M_GOV_02`.
- Papel: Engine-dev → Verifier.

**WP-1.4 · RandomEventEngine**
- Entradas: [06](06_eventos_aleatorios_simulacao.md) (7 eventos, sorteio, handlers, mitigações).
- Saídas: `event-engine.js` + `tests/occ-events.test.mjs`.
- DoD: `rollQuarterEvents(quarter, state)` respeita `requires` (EVT_07 só com multiagente);
  handlers aplicam mitigação; `setRollMock` funciona; EVT_07 gera/limita `resentContextCost`.
- Papel: Engine-dev → Verifier.

> Os 4 motores não têm dependência mútua de código (apenas contratos de tipo compartilhados) —
> rodam **em paralelo**. Barreira ao final: os 4 verdes antes da Fase 2.

### FASE 2 — HUD e Navegação

**WP-2.1 · HUD persistente + breadcrumb**
- Entradas: [01 §3](01_arquitetura_informacao_navegacao.md), [08 C-01/C-10](08_wireframes_catalogo_componentes.md).
- Saídas: `hud.js` (consome `getState()`), inclui `#hud-vcore` e o `#vcore-gauge`.
- DoD: `aria-live` nos contadores; V_core desbloqueia no Cap. 2, UI/$ no Cap. 3; comportamento por fase.

**WP-2.2 · State machine de cenas (`main.js`)**
- Entradas: [01 §2/§4](01_arquitetura_informacao_navegacao.md), [03 §5](03_digital_twin_engine.md).
- Saídas: orquestração `#scene-*`, linearidade forçada, replay granular, `sessionStorage`.
- DoD: navegação sequencial trava capítulos bloqueados; Debug API `window.__DEBUG_*` só em DEV (10 §1.6),
  incluindo `__DEBUG_reset` e `__DEBUG_humanCostAtVcore`.
- Papel: Chapter-dev → Verifier.

### FASE 3 — Capítulos 1–4 (pipeline por capítulo)

Cada capítulo é um pacote independente após a Fase 2; correm em pipeline (implementa → verifica) sem
barreira entre si.

**WP-3.1 · Cap. 1 — Fatura + Iceberg**
- Entradas: [02 Cap. 1](02_jornada_6_capitulos.md), [08 C-04/C-05](08_wireframes_catalogo_componentes.md).
- Saídas: `chapter-1.js` — fatura `<details>`, custo de troca de contexto, pizza→iceberg em `<canvas>`,
  callout Fortune 500, tabela alternativa (09 §1.2). Desbloqueia EVID_01.
- DoD: 4 linhas + investigação; morph iceberg; EVID_01 desbloqueado; teste Playwright de 10 §1.2.

**WP-3.2 · Cap. 2 — Armadilha + V_core**
- Saídas: `chapter-2.js` — simulação de barras, `tentativas = 1/Rm`, tabela com V_core, `#vcore-gauge`.
  Desbloqueia EVID_02 e EVID_08.
- DoD: escolha Model-Lite/Pro registrada; V_core exibido com 5 sinais em tooltip.

**WP-3.3 · Cap. 3 — Invenção da Métrica**
- Saídas: `chapter-3.js` — canvas drag-and-drop com grupos (monetário 🔵 / humano-operacional 🟠),
  validador que achata parênteses, nomeação ativa, revelação. Fallback click-to-place (09 §1.2).
- DoD: aceita agrupamentos algebricamente equivalentes; nome não vaza "UI/$" antes da revelação.

**WP-3.4 · Cap. 4 — Três Modelos Formais**
- Saídas: `chapter-4.js` — Cost-of-Pass, UI/$ (OpenAI 2026), Governed UI/$, TCO Agêntico; callout de
  governança; quiz. Desbloqueia EVID_04, EVID_07, EVID_10.
- DoD: fórmulas com tooltip por termo; quiz valida; callout deixa explícito "convenção operacional".
- Papel (3.1–3.4): Chapter-dev → Verifier.

### FASE 4 — Capítulo 5 (Sandbox)

**WP-4.1 · Painel de controle (sliders/toggles)**
- Entradas: [02 Cap. 5](02_jornada_6_capitulos.md), [08 C-07](08_wireframes_catalogo_componentes.md).
- Saídas: `chapter-5.js` (controles): RouteLLM, RAG depth, reranking (`#ctrl-rerank`), cache
  (`#ctrl-cache`), contexto (`#ctrl-context-tokens` + `#context-rot-meter`), multiagente
  (`#ctrl-multiagent`/`#ctrl-agent-isolation` + `#cascade-warning`). Debounce 150ms.
- DoD: excesso de controles mitigado por acordeões (risco de 10 §4); indicador de Context Rot só >50k.

**WP-4.2 · Sankey + histórico + trimestres**
- Saídas: `sankey.js` (SVG inline, aresta `resentContextCost` com fluxo pulsante), `#history-chart`
  em canvas, `stepQuarter` + modal `<dialog>` de evento (08 C-03). Desbloqueia EVID_05, EVID_06,
  EVID_09, EVID_11.
- DoD: Sankey redraw < 100ms; EVT_07 (ricochete) visível no Q3; testes v4.1 de 10 §1.3b passam.
- Papel: Chapter-dev → Verifier (foco em performance).

### FASE 5 — Capítulo 6 + Capstone

**WP-5.1 · Board dialógico + anexação de evidências**
- Entradas: [02 Cap. 6](02_jornada_6_capitulos.md), [05](05_stakeholders_board_engine.md), [08 C-09](08_wireframes_catalogo_componentes.md).
- Saídas: `chapter-6.js` — perguntas geradas pelo estado, side panel de evidências (11 cards),
  drag/drop com fallback de teclado, barra de confiança, critérios de desfecho.
- DoD: resposta sem evidência bloqueada; arguições de Governed UI/$ e Fadiga de Verificação presentes.

**WP-5.2 · Vitória/Falha + Caso de Transferência**
- Saídas: `#scene-victory`/`#scene-failure`/`#transfer-case` (clínica médica).
- DoD: desfechos de 05 §5; caso usa domínio distinto da narrativa (checklist pedagógico 10 §5).
- Papel: Chapter-dev → Verifier.

### FASE 6 — Qualidade Transversal (fan-out)

**WP-6.1 · A11y + SEO** — reviewer `a11y-design-reviewer` sobre a página completa: contraste, ARIA dos
novos controles (09 §1.2), tabelas alternativas, `prefers-reduced-motion`, JSON-LD. DoD: axe verde no
Playwright; Lighthouse a11y+SEO ≥ 90.

**WP-6.2 · Tom pt-BR** — reviewer `tone-reviewer` sobre toda a copy voltada ao usuário (falas,
callouts, toasts, labels). DoD: sem marketing-speak; substituições aplicadas.

**WP-6.3 · Performance** — orçamento de 09 §3.2: JS parsed < 120kb, LCP < 2.5s, CLS < 0.1, sem
dependência externa de runtime além de Google Fonts. DoD: passo de perf do gate verde.

### FASE 7 — Integração Final

**WP-7.1 · Gate completo + registro no ecossistema**
- Saídas: entrada no catálogo/SSOT do site se aplicável (`scripts/audit-site.mjs --strict`), sitemap.
- DoD: `npm run gate` **verde de ponta a ponta**; sem links órfãos/quebrados na auditoria global.
- Papel: Verifier → PR.

---

## 5. Protocolo de Verificação por Pacote

Cada pacote fecha com um ciclo curto e adversarial:

```
1. Implementer entrega o pacote (arquivos + testes).
2. Verifier roda o gate focado:
     node scripts/quality-gate.mjs --no-build --grep "OCC"     # iteração
     node --test tests/occ-*.test.mjs                          # invariantes do pacote
3. Verifier tenta refutar 3 afirmações da spec para o pacote
   (ex.: "o cache realmente NÃO altera Rm?"; "V_core é mesmo não-linear?").
4. Achou divergência → volta ao passo 1. Confirmou → pacote fechado.
```

Portão de fase: `node scripts/quality-gate.mjs` (completo) verde antes de abrir a fase seguinte.

---

## 6. Estimativa por Fase (referência, não compromisso)

Reaproveita a estimativa qualitativa de [10 §3](10_testes_roadmap_riscos.md), redistribuída por fase e com
o incremento v4.1 (V_core, Context Rot, cache, cascata, RAG real, +4 evidence cards, +2 arguições).

| Fase | Pacotes | Complexidade | Faixa |
| :-- | :-- | :-- | :-- |
| 0 — Fundação | WP-0.1 | Baixa | ~4h |
| 1 — Motores | WP-1.1…1.4 | Alta | ~26h |
| 2 — HUD/Nav | WP-2.1…2.2 | Média | ~10h |
| 3 — Cap. 1–4 | WP-3.1…3.4 | Média-Alta | ~30h |
| 4 — Cap. 5 | WP-4.1…4.2 | Alta | ~24h |
| 5 — Cap. 6 | WP-5.1…5.2 | Alta | ~18h |
| 6 — Qualidade | WP-6.1…6.3 | Média | ~12h |
| 7 — Integração | WP-7.1 | Baixa | ~4h |
| **Total** | | | **~128h** |

---

## 7. Riscos Específicos do Fluxo Agêntico

| Risco | Mitigação |
| :-- | :-- |
| Agente "alucina" conformidade (relata verde sem rodar o gate) | Verificação adversarial independente + gate como árbitro; nunca aceitar relato sem exit code 0 |
| Deriva de contrato entre motores (tipos divergem) | Typedefs de 03/04 como fonte; fixtures espelho quebram se o shape mudar |
| Excesso de paralelismo introduz conflito de arquivos | Pacotes em paralelo tocam arquivos distintos; se compartilharem, usar isolamento (worktree) |
| Escopo vaza para V2/V3 | Regra de escopo travado (§1.5); trabalho novo vira tarefa futura, não commit |
| Coeficientes v4.1 tratados como fato absoluto no código | Comentar no código que são parâmetros pedagógicos; manter `limitations` nos cards |

---

### Referências cruzadas

- Contratos dos motores → [03](03_digital_twin_engine.md), [04](04_evidence_board_system.md), [05](05_stakeholders_board_engine.md), [06](06_eventos_aleatorios_simulacao.md)
- Componentes e IDs → [08](08_wireframes_catalogo_componentes.md)
- Portões de qualidade (a11y/SEO/perf) → [09](09_acessibilidade_seo_metricas.md)
- Plano de testes que alimenta o DoD → [10](10_testes_roadmap_riscos.md)
