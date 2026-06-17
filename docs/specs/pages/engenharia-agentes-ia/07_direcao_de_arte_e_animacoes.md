# 07 — Direção de Arte e Sistema de Animações

> Cobre os entregáveis **14 (Direção de arte)** e **13 (Sistema de animações)**. Ancorado no
> [STYLE_GUIDE.md](../../STYLE_GUIDE.md) existente ("Dark Tech & Developer Centric") **estendido com
> um modo claro**, e elevado à sofisticação de Linear/Stripe/Apple/Vercel pedida no meta-prompt.

---

## Parte A — Direção de Arte

### A.1 Filosofia visual

> **"Engenharia visível, sem ruído."** Sofisticação corporativa + clareza educacional. O visual deve
> sentir-se como uma ferramenta de engenharia bem-feita (Linear/Vercel): minimalista, alto contraste,
> tipografia impecável, cor usada com intenção (semântica, não decoração). Espelha a tese do produto:
> **nada supérfluo no caminho crítico**.

Quatro qualidades-guia: **preciso · calmo · legível · intencional**.

### A.2 Tokens de cor (CSS custom properties)

Base = paleta GitHub-dark do STYLE_GUIDE; modo claro derivado com contraste AA garantido. Definir
como CSS vars e alternar por `:root[data-theme="..."]`.

**Tema escuro (padrão — herda STYLE_GUIDE):**

| Token | Valor | Uso |
| :-- | :-- | :-- |
| `--bg` | `#0d1117` | fundo da página |
| `--bg-elev` | `#161b22` | cards, painéis, nav |
| `--border` | `#30363d` | divisórias |
| `--text` | `#c9d1d9` | corpo |
| `--text-strong` | `#ffffff` | títulos |
| `--text-muted` | `#8b949e` | rótulos/legendas |
| `--accent` | `#3b82f6` | azul primário (ações, links) |
| `--accent-2` | `#8a2be2` | roxo (gradiente secundário) |
| `--grad` | `linear-gradient(90deg,#007bff,#8a2be2)` | CTAs, sublinhados de título |

**Tema claro (derivado — novo):**

| Token | Valor | Uso |
| :-- | :-- | :-- |
| `--bg` | `#ffffff` | fundo |
| `--bg-elev` | `#f6f8fa` | cards/painéis |
| `--border` | `#d0d7de` | divisórias |
| `--text` | `#1f2328` | corpo |
| `--text-strong` | `#0d1117` | títulos |
| `--text-muted` | `#57606a` | rótulos |
| `--accent` | `#0969da` | azul (AA sobre branco) |
| `--accent-2` | `#8250df` | roxo (AA sobre branco) |
| `--grad` | `linear-gradient(90deg,#0969da,#8250df)` | CTAs |

**Cores semânticas (ambos os temas, ajustar luminância por tema):**

| Semântica | Significado no domínio | Token |
| :-- | :-- | :-- |
| Sucesso / determinístico | Task pura, válido, "verde" | `--ok` (#2ea043 / #1a7f37) |
| Atenção / autonomia | Service Task, I/O, custo | `--warn` (#d29922 / #9a6700) |
| Perigo / anti-padrão | loop, alucinação, contrato violado | `--danger` (#f85149 / #cf222e) |
| Humano / trava | User Task, revisão | `--human` (#a371f7 / #8250df) |
| Incerteza / Open-World | "não sei", missing evidence | `--uncertain` (#8b949e / #57606a, tracejado) |

> **Nota de design.** As cores semânticas são **parte da pedagogia**: âmbar = "aqui mora a autonomia/
> custo", vermelho = anti-padrão. Usadas consistentemente em BPMN (05), visualizações (04), simulador
> e playground (06). Documentar a legenda de cor é obrigatório.

### A.3 Tipografia

- **Fonte única: Inter** (300/400/600/700/800), como no STYLE_GUIDE. Mono para código: `JetBrains
  Mono` ou `ui-monospace` (terminais/`eai-code-block`).
- Escala (alinhada ao STYLE_GUIDE, levemente estendida):
  - `display/H1`: `text-5xl md:text-7xl font-extrabold leading-tight`
  - `H2`: `text-4xl font-bold` (+ sublinhado gradiente `.section-title`)
  - `H3`: `text-2xl font-semibold`
  - `corpo`: `text-lg leading-relaxed`
  - `rótulo/label`: `text-xs tracking-widest uppercase text-muted`
  - `código`: `text-sm font-mono`
- **Medida de leitura:** corpo limitado a ~68ch para legibilidade educacional.

### A.4 Ícones, ilustrações, densidade

- **Ícones:** set linear consistente (Lucide/Heroicons outline) — coerente com "dev-centric".
  Stroke 1.5–2px. Ícone por princípio (P1…P10) reutilizado em card, badge BPMN e nav.
- **Ilustrações:** **funcionais, não decorativas** — diagramas, não mascotes. Estilo "blueprint":
  linhas finas, grid sutil, nós geométricos. Tudo em SVG temável por CSS vars.
- **Densidade:** **arejada** nas áreas narrativas (Home/Introdução — respiro Apple-like) e **densa**
  nas ferramentas (Simulador/Playground — eficiência Linear/Vercel). Espaçamento base 4px; seções com
  respiro generoso (`py-20+` em narrativa).
- **Glassmorphism e glow:** preservar (do STYLE_GUIDE) na nav fixa e CTAs — com parcimônia; no tema
  claro, glow vira sombra suave (sem neon estourado).

### A.5 Modos claro/escuro

- **Padrão:** escuro (identidade do portfólio). Alternador `eai-theme-toggle` com opção `system`
  (`prefers-color-scheme`).
- Persistir escolha em `localStorage`. Transição de tema suave (≤200ms) mas **ignorada** se
  `prefers-reduced-motion`.
- **Requisito:** ambos os temas atingem **WCAG AA** em texto e elementos de UI (verificação em
  [08](08_acessibilidade_e_metricas.md)).

---

## Parte B — Sistema de Animações

### B.1 Regra mestra

> **Toda animação ensina algo. Animação que não muda o entendimento é cortada.** (Princípio
> pedagógico de [00 §3.4](00_visao_produto_personas_objetivos.md).) Nada de parallax gratuito,
> nada de "fade só porque sim".

### B.2 Princípios de movimento

- **Propósito:** cada animação tem um objetivo pedagógico declarado (tabela B.4).
- **Rápido e calmo:** durações curtas (150–600ms para microinterações; até ~2–3s para sequências
  explicativas com controle de play). Easing padrão `cubic-bezier(0.22,1,0.36,1)` (saída suave).
- **Reversível e controlável:** sequências explicativas têm play/pause e "passo a passo".
- **Respeita `prefers-reduced-motion`:** toda animação tem fallback estático equivalente (ver B.5).

### B.3 Tecnologias

| Necessidade | Tecnologia | Por quê |
| :-- | :-- | :-- |
| Microinterações (hover, foco, toggle) | **CSS transitions/animations** | leve, sem JS |
| Sequências orquestradas (Hero, desmontagem XAI, DAG) | **GSAP** (+ ScrollTrigger no Hero) | timeline precisa, controle, reversão |
| Movimento físico/declarativo em componentes | **Motion (Framer Motion-like)** opcional | se houver build de componentes |
| Fluxo de muitas partículas (propagação, ledger denso) | **Canvas 2D** (rAF) | performance |

> Carregar GSAP/Canvas **sob demanda** (lazy) por seção — performance é requisito (LCP). Coerente com
> "infra mínima".

### B.4 Catálogo de animações pedagógicas

Cada animação: **objetivo pedagógico · duração · tecnologia · estado inicial → estado final**.

| # | Animação | Objetivo pedagógico | Duração | Tech | Inicial → Final |
| :-: | :-- | :-- | :-- | :-- | :-- |
| AN-1 | **Propagação de erro** | mostrar que um dado falso contamina o vizinho quando não há contrato | ~1.5s loop | Canvas | nó limpo → dado vermelho se espalha pela cadeia |
| AN-2 | **Contrato barra** (firewall) | a validação detém a saída inválida na fronteira | 600ms | GSAP/SVG | payload se aproxima → bate na parede, etiqueta do motivo |
| AN-3 | **Poda precoce** | filtro barato elimina o item antes da etapa cara | 500ms | CSS/SVG | item entra → some no gateway, etapa cara nem acende |
| AN-4 | **Isolamento epistêmico** (lineage) | conclusão rastreia até a evidência; camadas não se misturam | 800ms | SVG path | clique na conclusão → fio desce iluminando evidência |
| AN-5 | **Degradação graciosa** | falha de sensor vira incerteza, não quebra | 700ms | SVG | sensor "cai" (âmbar) → resultado marca incerteza, fluxo segue |
| AN-6 | **Formação da explicação** (XAI) | o score se desmonta em drivers + lacunas + fonte | ~1.8s | GSAP/SVG | número único → explode em drivers etiquetados |
| AN-7 | **Execução do DAG** | etapas fixas acendem em ordem; reproduzível | ~2s | GSAP/SVG | nós apagados → acendem M1→M5; rerun = idêntico |
| AN-8 | **Loop de custo** (anti-padrão) | autonomia livre gira sem parar e o custo sobe | loop | SVG/Canvas | seta volta → ciclo pulsa, contador `$` sobe |
| AN-9 | **Ledger enchendo + reset por onda** | orçamento é estado que recusa gasto; ondas retomam | ~1.5s | Canvas/D3 | barra enche até o teto → "pendente"; "próximo dia" reseta |
| AN-10 | **Medidores reagindo** (simulador) | causa→efeito: mexer parâmetro move impacto | 250ms | CSS/JS | medidor em A → transiciona para B com cor semântica |
| AN-11 | **Hero caos↔disciplina** | a tese inteira em uma sequência | scroll | GSAP+ScrollTrigger | quadros 0→4 (ver [03 Parte C](03_wireframes_e_catalogo_de_componentes.md)) |
| AN-12 | **Microinterações** (hover/foco/check) | affordância e feedback de estado | 120–200ms | CSS | repouso → hover/foco/ativo |

### B.5 Reduced-motion (obrigatório)

Para cada animação acima, o fallback `prefers-reduced-motion: reduce`:
- Sequências (AN-6, AN-7, AN-9, AN-11): viram **passo a passo manual** (botão "próximo") ou estado
  final estático com legenda.
- Loops (AN-1, AN-8): viram **imagem única** representando o defeito + texto.
- Microinterações (AN-12): reduzidas a mudança de cor/borda instantânea, sem movimento.
- O toggle `eai-motion-toggle` permite desligar manualmente além da preferência do SO.

### B.6 Ficha técnica

- **Objetivo:** movimento a serviço da compreensão.
- **UX:** controlável, calmo, reversível; nunca bloqueia leitura.
- **Componentes:** aplica-se a `eai-viz-panel`, `eai-meter`, Hero, BPMN.
- **Tecnologias:** CSS + GSAP + Canvas (lazy), tudo temável por CSS vars.
- **Complexidade:** **Média** (alta no Hero e na desmontagem XAI).
- **Riscos:** peso (libs) e enjoo de movimento. **Mitigação:** lazy-load, reduced-motion completo,
  regra "toda animação ensina".

---

### Referências cruzadas

- STYLE_GUIDE base → [../../STYLE_GUIDE.md](../../STYLE_GUIDE.md)
- Onde cada animação aparece → [04](04_visualizacoes_interativas.md), [05](05_bpmn_diagramas_executaveis.md), [06](06_simulador_e_playground.md)
- Contraste AA e reduced-motion (verificação) → [08](08_acessibilidade_e_metricas.md)
- Componentes que recebem os tokens → [03 Parte B](03_wireframes_e_catalogo_de_componentes.md)
