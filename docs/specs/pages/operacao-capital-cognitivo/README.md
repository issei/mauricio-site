# Especificação — "Operação Capital Cognitivo: O Simulador Executivo de FinOps & Arquitetura de IA"

> **O que é isto.** Este conjunto de documentos especifica, de ponta a ponta, uma **página educacional
> interativa** que ensina os fundamentos de FinOps de IA e a métrica *Useful Intelligence per Dollar
> (UI/$)* através de um simulador executivo narrativo com Gêmeo Digital, Mural de Evidências e
> Conselho de Administração dinâmico.
>
> **Natureza do entregável.** Esta é uma **especificação de produto** (SDD — *Spec-Driven
> Development*), **não código**. O objetivo é que uma equipe (Product Designer, UX, Arquiteto de
> Software, Front-end) consiga **iniciar a implementação sem redefinir o conceito**.

---

## Página-alvo e contexto técnico

- **Arquivo:** `src/operacao-capital-cognitivo.html`
- **URL final:** `mauricio.issei.com.br/operacao-capital-cognitivo`
- **Infra:** estática (Vite detecta `src/*.html`), **Tailwind CSS v4 via `input.css`**, vanilla JS
  ES6 modules. **Sem backend, sem frameworks SPA.** Todo estado do simulador é gerido em memória
  (closure de módulo JS).
- **Identidade visual:** base **"Dark Tech"** do site ([STYLE_GUIDE.md](../../STYLE_GUIDE.md) — Inter,
  fundo `#0d1117`, gradientes azul→roxo neon) com tokens de cor adicionais definidos em
  [07_direcao_de_arte_design_system.md](07_direcao_de_arte_design_system.md).
- **Idioma:** Português do Brasil. Tom executivo-narrativo: direto, rigoroso, sem jargão vazio.

> **Premissa de escopo.** A página é **uma única entrega HTML** auto-contida. Toda a simulação roda
> client-side via JS puro. A spec foi faseada em MVP (6 capítulos completos) → V2 (conexão com
> benchmarks ao vivo) → V3 (modo multi-jogador). Esta especificação cobre **apenas o MVP**.

---

## Ordem de leitura

| # | Documento | Para quem importa mais |
| :-- | :-- | :-- |
| — | [`README.md`](README.md) (este) | Todos — comece aqui |
| 00 | [`00_visao_produto_personas_objetivos.md`](00_visao_produto_personas_objetivos.md) | PM, stakeholders, designer instrucional |
| 01 | [`01_arquitetura_informacao_navegacao.md`](01_arquitetura_informacao_navegacao.md) | UX, arquiteto de informação |
| 02 | [`02_jornada_6_capitulos.md`](02_jornada_6_capitulos.md) | Designer instrucional, conteúdo |
| 03 | [`03_digital_twin_engine.md`](03_digital_twin_engine.md) | Front-end, arquiteto de software |
| 04 | [`04_evidence_board_system.md`](04_evidence_board_system.md) | Front-end, UX |
| 05 | [`05_stakeholders_board_engine.md`](05_stakeholders_board_engine.md) | Front-end, designer de interação |
| 06 | [`06_eventos_aleatorios_simulacao.md`](06_eventos_aleatorios_simulacao.md) | Front-end, game designer |
| 07 | [`07_direcao_de_arte_design_system.md`](07_direcao_de_arte_design_system.md) | Product Designer, motion |
| 08 | [`08_wireframes_catalogo_componentes.md`](08_wireframes_catalogo_componentes.md) | UX, Front-end |
| 09 | [`09_acessibilidade_seo_metricas.md`](09_acessibilidade_seo_metricas.md) | Front-end, UX |
| 10 | [`10_testes_roadmap_riscos.md`](10_testes_roadmap_riscos.md) | Tech Lead, QA, PM |
| 11 | [`11_plano_desenvolvimento_agentico.md`](11_plano_desenvolvimento_agentico.md) | Tech Lead, orquestrador de agentes |

**Dois caminhos de leitura:**
- **Quero entender o produto:** 00 → 01 → 02 → 10.
- **Vou implementar:** 11 (plano) → 03 → 04 → 05 → 06 → 08 → 07 → 09, com 10 como checklist de validação.

---

## Mapa entregável → documento

| # | Entregável | Documento |
| :-- | :-- | :-- |
| 1 | Visão do produto e hipótese pedagógica | 00 |
| 2 | Personas e matriz de entrada | 00 |
| 3 | Objetivos de aprendizagem (Bloom) | 00 |
| 4 | Arquitetura de informação e fluxo de navegação | 01 |
| 5 | Jornada dos 6 capítulos (narrativa + mecânicas) | 02 |
| 6 | Digital Twin Engine (estado, equações, state machine) | 03 |
| 7 | Evidence Board System (modelo de dados, grafo) | 04 |
| 8 | Stakeholders e Stateful Board Engine | 05 |
| 9 | Motor de eventos estocásticos | 06 |
| 10 | Direção de arte e design system de tokens | 07 |
| 11 | Wireframes conceituais e catálogo de componentes | 08 |
| 12 | Acessibilidade (WCAG 2.2 AA), SEO e métricas | 09 |
| 13 | Plano de testes Playwright, roadmap e riscos | 10 |

---

## Glossário rápido

- **Capital Cognitivo ($K_{cog}$)** — ativo estratégico intangível: capacidade instalada combinada de modelos, pipelines e expertise humana para executar trabalho autônomo de alto valor.
- **Useful Intelligence per Dollar (UI/$)** — indicador operacional de eficiência: razão entre trabalho útil aprovado e o TCO completo do ciclo de vida.
- **First-Pass Accuracy ($R_m$)** — probabilidade de um modelo gerar resposta correta e operacionalmente aceita na primeira tentativa, sem refatoração.
- **Inference Flip** — transição econômica onde 65%–90% do TCO corporativo migrou de pré-treinamento (CapEx) para inferência/execução (OpEx).
- **RouteLLM** — arquitetura de roteamento semântico que direciona prompts simples a SLMs e prompts complexos a LLMs.
- **Test-Time Compute Scaling** — aumentar o tempo de raciocínio durante a inferência em vez de escalar parâmetros do treino.
- **TCO (Total Cost of Ownership)** — soma de todos os custos: API, infraestrutura, RAG, observabilidade e tempo de revisão humana.
- **Carga de Verificação ($V_{core}$)** — índice (0–100) que agrega 5 sinais comportamentais da revisão humana de outputs de IA (falhas de teste, latência à 1ª compilação, churn de código, pausas longas, trocas de contexto). Formaliza o custo humano **não-linear** (EVID_08 / CHI 2026).
- **Cascata de Erros Agêntica** — propagação topológica de alucinações em pipelines multiagentes; o *contexto reenviado* (re-sent context) pode chegar a 62% da fatura agêntica (EVID_09).
- **Context Rot** — degradação contínua da acurácia quando o contexto ultrapassa ~50k tokens; o fim do mito da "janela infinita" (EVID_11).
- **Semantic Caching** — cache de prompts que corta 50%–90% do custo de tokens repetidos; alavanca primária de FinOps. Ataca custo, não acurácia.
- **Governed UI/$** — variante do UI/$ para setores regulados, dividida por um Prêmio de Risco (R) que pune arquiteturas com risco de alucinação (Swider 2026).
- **Digital Twin / Gêmeo Digital** — modelo de estado em memória que representa a *Nexus Tech Corp* e reage às decisões do usuário com dinâmicas de sistema.
- **Evidence Board / Mural de Evidências** — coleção de **11** cards de evidência científica coletados ao longo da jornada e usados na arguição final.
- **Stateful Board Engine** — motor de diálogo que gera perguntas dos conselheiros baseadas no estado atual do Gêmeo Digital.

> **Nota de governança conceitual.** UI/$, Capital Cognitivo, $V_{core}$ e Governed UI/$ são
> **convenções operacionais de FinOps de IA em fase de consolidação** na indústria — bússolas
> direcionais, não normas regulatórias ISO/IEEE. Cada Evidence Card declara seu nível epistemológico
> e suas limitações; os coeficientes numéricos do motor são parâmetros pedagógicos calibrados, não
> medições absolutas.

---

## Convenções destes documentos

- Cada feature traz a ficha-padrão: **Objetivo · Experiência do usuário · Componentes HTML/JS · Comportamento interativo · Critérios de aceitação**.
- Diagramas conceituais em ASCII (substituídos por renderização DOM/Canvas na implementação).
- `Nota para o desenvolvedor` marca decisões de implementação críticas.
- `Nota editorial` marca decisões de conteúdo/tom.
- Referências cruzadas à *Master Specification* original aparecem como `(MSpec §N)`.
- **Tech stack desta página**: Tailwind CSS v4 (classes utilitárias via `input.css`) + vanilla JS ES6 modules. **Não usar React, Vue, Next.js ou qualquer SPA framework**. Gráficos com `<canvas>` nativo ou SVG inline.

---

## Changelog

### v4.1 — Enriquecimento por estado da arte (FinOps de IA · HCI · Economia de Inferência)

Incorpora quatro lacunas conceituais identificadas em revisão cruzada com literatura de 2025–2026:

| Gap | Conceito incorporado | Onde |
| :-- | :-- | :-- |
| 1 — Fator Humano/HCI | **Carga de Verificação ($V_{core}$)** — 5 sinais comportamentais + custo humano não-linear (`fatorFadiga`) | [03 §3.8](03_digital_twin_engine.md), [02 Cap. 2](02_jornada_6_capitulos.md), EVID_08 |
| 2 — Arquitetura Agêntica | **Cascata de Erros / re-sent context** (até 62% da fatura) + evento `EVT_07` | [03 §3.3c](03_digital_twin_engine.md), [06](06_eventos_aleatorios_simulacao.md), EVID_09 |
| 3 — Economia de RAG | **Custo real de RAG** (HNSW 1.5×, re-indexação, reranking condicional×universal) | [03 §3.3d](03_digital_twin_engine.md), [02 Cap. 5](02_jornada_6_capitulos.md) |
| 4 — Dinâmica de Contexto | **Context Rot** (>50k tokens) + **Semantic Caching** (−50% a −90%) | [03 §3.3b/§3.4b](03_digital_twin_engine.md), EVID_11 |

Também: três modelos formais no Cap. 4 (Cost-of-Pass, UI/$ OpenAI 2026, Governed UI/$); Evidence Board
de 7 → **11 cards** (+ categoria `HumanFactors`); arguições novas de Marcus (Governed UI/$) e Sarah
(Fadiga de Verificação); callout Fortune 500 e iceberg do TCO no Cap. 1; nota de governança conceitual
(métricas são convenções operacionais, não normas ISO/IEEE).
