# DoR / DoD — construção `engenharia-agentes-ia`

Portões de governança por Work Unit (WU). Espelham o DoR/DoD do treinamento (P9, doc 10).
Princípio: **fail-closed** — não concluiu, não marca Done; registra `BLOCKED:` honesto.

## Definition of Ready (a WU pode entrar em execução?)
- [ ] **SDD-fonte** identificado (qual doc/seção de `docs/specs/pages/engenharia-agentes-ia/`).
- [ ] **Contrato de saída** definido: seções, IDs/âncoras, componentes (doc 03), tokens `--eai-*` (doc 07).
- [ ] **3 eixos de cenário** esboçados: caminho feliz · degradado (sem JS / reduced-motion / mobile) ·
      open-world+a11y (equivalente textual, axe, foco por teclado).
- [ ] **Dependências resolvidas** (tokens/base/layout já existem); senão, ordenar antes.
- [ ] **Zero decisão de design em aberto**. Cruza fronteira ou exige lib nova (BPMN/D3/Cytoscape)?
      → **ADR primeiro**.
- [ ] **Fatiável em 1 iteração** dentro do orçamento de tokens da onda.

## Definition of Done (a WU está pronta?)
- [ ] `node scripts/quality-gate.mjs` **verde** local (build + Playwright + axe).
- [ ] **Conteúdo fiel** ao SDD e ao guia-fonte (sem inventar escopo); rastreável ao princípio.
- [ ] **Identidade visual** doc 07 (tema dark, sem cores hardcoded, contraste AA); polimento (BUILD_PLAN §9).
- [ ] **`prefers-reduced-motion`** respeitado; sem `console.error`; sem overflow horizontal mobile.
- [ ] **Commit convencional** (`feat(eai): WU-x ...`) + **push na `main`** com CI de teste verde.
- [ ] **`PROGRESS.md` atualizado** (estado, ledger de tokens, lição em `.ai/learnings.md`).
- [ ] **Fail-closed** explícito se algo faltou (`BLOCKED:` em vez de Done falso).

## Fluxo do board
`Fila (PROGRESS) ──[DoR]──► Em execução ──[gate verde]──► [DoD]──► Done (push main)`

Só avança quem passa o portão. WIP de especificação enxuto: detalhar a WU **ao entrar** na janela de
execução (spec antecipada é perecível).
