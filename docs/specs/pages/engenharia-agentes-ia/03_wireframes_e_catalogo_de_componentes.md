# 03 — Wireframes Conceituais e Catálogo de Componentes

> Cobre os entregáveis **7 (Wireframes conceituais por página)** e **8 (Catálogo de componentes)**.
> Wireframes são de **baixa fidelidade** (estrutura e hierarquia), não visual final — a direção de
> arte está em [07](07_direcao_de_arte_e_animacoes.md). Convenção ASCII: `▓` cheio, `░` secundário,
> `[ ]` botão, `( )` toggle, `▒▒` visualização interativa.

---

## Parte A — Wireframes por área

### A.1 HOME

```
┌──────────────────────────────────────────────────────────────┐
│  nav: Eng. de Agentes de IA      Início Princípios Jornada …  ( )tema │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│   SUPERTÍTULO: ENGENHARIA AGÊNTICA                             │
│   H1: Um sistema de IA bom tem pouca IA no caminho crítico.    │
│   sub: A disciplina que separa a demo encantadora do produto.  │
│                                                                │
│   ┌──── caos ────┐        ⇄        ┌──── disciplina ────┐      │
│   │ ▒▒ agentes  │   [storyboard    │ ▒▒ pipeline DAG   │      │
│   │  em loop,   │    animado,      │  contratos,       │      │
│   │  $ explode  │    scroll-driven]│  previsível       │      │
│   └─────────────┘                  └────────────────────┘      │
│                                                                │
│   [ Começar a trilha ]   [ Explorar princípios ]   [ Só o essencial ] │
├──────────────────────────────────────────────────────────────┤
│   A TESE EM 3 FRASES   (previsibilidade · segurança · escala)  │
├──────────────────────────────────────────────────────────────┤
│   ESCOLHA SEU CAMINHO  (3 cards → modos A / B / C do doc 01)   │
├──────────────────────────────────────────────────────────────┤
│   DOGFOODING: "este site usa os princípios que ensina" ░░      │
├──────────────────────────────────────────────────────────────┤
│   footer: nav · sobre · crédito · (tema) (reduzir movimento)   │
└──────────────────────────────────────────────────────────────┘
```

- **Hierarquia:** H1 domina; o storyboard caos×disciplina é o herói visual; 3 CTAs roteiam as 3
  personas-modo.
- **Storyboard do Hero — ver Parte C** (peça-chave do entregável 7).

### A.2 INTRODUÇÃO

```
┌──────────────────────────────────────────────────────────────┐
│  01 · O PROBLEMA                                               │
│  H2: O caos dos prompts não estruturados                      │
│  ┌──────────┬──────────┬──────────┬──────────┐                │
│  │ loops    │ custo    │ alucina- │ irrepro- │  (4 cards de   │
│  │ ▒ anim   │ ▒ anim   │ ção ▒    │ dutib. ▒ │   patologia)   │
│  └──────────┴──────────┴──────────┴──────────┘                │
│  02 · A VIRADA                                                 │
│  H2: Engenharia sobre o estocástico  ░ (texto + 1 visual)     │
│  03 · BENEFÍCIOS DE NEGÓCIO                                    │
│  [previsibilidade] [segurança] [escala sustentável]            │
│  → CTA: "ver os 10 princípios"                                 │
└──────────────────────────────────────────────────────────────┘
```

### A.3 PRINCÍPIOS (hub de exploração)

```
┌──────────────────────────────────────────────────────────────┐
│  H2: Os 10 princípios da Engenharia Agêntica                  │
│  filtro: [todos] [por persona] [por nível]      busca ⌕       │
│  ┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐                          │
│  │ P1  ││ P2  ││ P3  ││ P4  ││ P5  │  cada card:              │
│  │ ▒   ││ ▒   ││ ▒   ││ ▒   ││ ▒   │  ícone+título+1 linha    │
│  └─────┘└─────┘└─────┘└─────┘└─────┘  + 3 chips de saída:      │
│  ┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐  [visualizar][capítulo]  │
│  │ P6  ││ P7  ││ P8  ││ P9  ││ P10 │  [no caso real]          │
│  └─────┘└─────┘└─────┘└─────┘└─────┘                          │
└──────────────────────────────────────────────────────────────┘
```

- Cada card é o **hub** descrito em [01 §5](01_arquitetura_informacao_e_sitemap.md): 3–4 saídas.

### A.4 JORNADA — Mapa da trilha

```
┌──────────────────────────────────────────────────────────────┐
│  H2: Sua trilha     progresso ●●●○○○○○○○  (3/10)  [continuar]  │
│   (1)──(2)──(3)──(4)──(5)──(6)──(7)──(8)──(9)──(10)            │
│    ✓    ✓    ◉    🔒   🔒   …                                  │
│   nó concluído / em progresso / bloqueado                     │
│  ┌── card do capítulo selecionado ──────────────────────────┐ │
│  │ Cap.3 · Cérebro vs Vitrine · 8min · ★★☆                  │ │
│  │ objetivo… [Iniciar capítulo]                             │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### A.5 JORNADA — Tela de capítulo (template dos 6 blocos)

```
┌──────────────────────────────────────────────────────────────┐
│  ‹ trilha   Cap.5 · Contratos rígidos · ★★☆ · 9 min   ●●●●●○  │
├──────────────────────────────────────────────────────────────┤
│  1 OBJETIVO   "ao final, você consegue…" ░                    │
│  2 CONCEITOS  texto enxuto + analogia-âncora ░                │
│  3 INTERAÇÃO  ┌────────────────────────────────────┐         │
│               │ ▒▒ visualização manipulável (doc04) │         │
│               │ [tente passar este payload ▸]        │         │
│               └────────────────────────────────────┘         │
│  4 EXERCÍCIO  pergunta + opções/arrastar                      │
│  5 AVALIAÇÃO  feedback XAI (por que certo/errado)             │
│  6 RESUMO     "o que levar"            [Próximo capítulo ▸]   │
└──────────────────────────────────────────────────────────────┘
```

### A.6 SIMULADOR

```
┌──────────────────────────────────────────────────────────────┐
│  H2: Simulador de arquitetura     [demo caótica][produção]    │
│  ┌─ PARÂMETROS ────────────┐  ┌─ IMPACTO (tempo real) ──────┐ │
│  │ Autonomia    [====o----] │  │ Custo          ▆▆▆▆▂  alto │ │
│  │ Temperatura  [==o------] │  │ Confiança      ▆▆▂▂▂  baixa│ │
│  │ Schemas      (•) on      │  │ Velocidade     ▆▆▆▆▆       │ │
│  │ Cache        (•) on      │  │ Risco          ▆▆▆▆▆  alto │ │
│  │ Ledger       ( ) off     │  │ Auditabilidade ▆▂▂▂▂       │ │
│  │ Revisão hum. ( ) off     │  │ Previsibilid.  ▆▆▂▂▂       │ │
│  │ BDD/Evals/Obs (•)(•)( )  │  └─────────────────────────────┘ │
│  └──────────────────────────┘  ░ texto: "por que" cada medidor │
└──────────────────────────────────────────────────────────────┘
```

### A.7 PADRÕES

```
┌──────────────────────────────────────────────────────────────┐
│  H2: Padrões e anti-padrões                                   │
│  abas: [ Padrões ] [ Anti-padrões ] [ Diagramas BPMN ]        │
│  grade de cards de padrão (DAG, bimodal, ledger, ondas…)      │
│  ao abrir um → painel com diagrama BPMN (doc 05) + overlays    │
└──────────────────────────────────────────────────────────────┘
```

### A.8 CASOS REAIS (SocialSelling)

```
┌──────────────────────────────────────────────────────────────┐
│  H2: Caso real — SocialSelling (M1→M5 + portal)               │
│  ▒▒ DAG do motor com os 10 princípios "acesos" onde aparecem  │
│  abas: [Implementado] [Especificado V1+]  (honestidade técnica)│
│  cada nó → "qual princípio, qual ADR, qual arquivo"            │
└──────────────────────────────────────────────────────────────┘
```

### A.9 PLAYGROUND

```
┌──────────────────────────────────────────────────────────────┐
│  H2: Playground     briefing: "priorize leads…"  [avaliar ▸]  │
│  ┌─ paleta ──┐  ┌──────── canvas (drag & connect) ─────────┐  │
│  │ LLM       │  │   [Fonte]→[Schema]→[Motor]→[Vitrine]      │  │
│  │ Schema    │  │              ↑ledger   ↑BDD   ↑XAI        │  │
│  │ API  RAG  │  │   (arrastar peças, ligar setas)           │  │
│  │ Ledger    │  └───────────────────────────────────────────┘  │
│  │ BDD Cache │  ┌─ avaliação (XAI) ────────────────────────┐  │
│  │ HumanRev  │  │ ⚠ risco de loop: ciclo sem aprovação      │  │
│  │ Guardrail │  │ ✗ fronteira sem contrato entre API e Motor│  │
│  │ Observab. │  │ ✓ ledger presente · ✓ Cérebro/Vitrine ok  │  │
│  └───────────┘  └───────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### A.10 REFERÊNCIA

```
┌──────────────────────────────────────────────────────────────┐
│  abas: [Glossário] [10 princípios] [Matemática V1+] [Fontes]  │
│  conteúdo de consulta, imprimível/compartilhável              │
└──────────────────────────────────────────────────────────────┘
```

### A.11 GOVERNANÇA AGENT-DRIVEN (masonry — doc 10)

```
┌──────────────────────────────────────────────────────────────┐
│  H2: Governança Agent-Driven & Vibe Coding                    │
│  ┌─ virada 1: contexto sai da cabeça → repositório ░ (largo) ─┐│
│  ┌─ virada 2: ⚠ alucinação sintática ░ (largo) ──────────────┐│
│  ┌SDD ┐┌ADR ┐┌BDD ┐   ← 5 dictionary-cards (ícone SVG) masonry │
│  └────┘└────┘└────┘                                            │
│  ┌DoR/DoD┐┌MCP ┐   ┌─ árvore de diretórios ────────┐          │
│  └───────┘└────┘   │ projeto-to-be/                 │          │
│  🔴 Regra de Ouro: │  .ai/ docs/ tests/ scripts/ … │          │
│  versionar estado  └───────────────────────────────┘          │
│  🟠 ALERTA FINANCEIRO: gates com teto de custo (banner largo)  │
│  ┌─ Meta-Prompt ─┬─ Manual ─┐  convergência: contexto+gates 1º │
│  └───────────────┴──────────┘                                  │
└──────────────────────────────────────────────────────────────┘
```

> **Responsividade (regra global).** Em < 768px: nav vira drawer/bottom-tabs; grades viram 1 coluna;
> Simulador empilha parâmetros acima dos medidores; Playground usa lista+conexões simplificadas ou
> exibe aviso "melhor no desktop" com fallback de leitura (ver [08](08_acessibilidade_e_metricas.md)).
> Esta é a mesma preocupação registrada na nota de UI do `devin/` (Seções 13–15): evitar fadiga de
> scroll usando abas/acordeão.

---

## Parte B — Catálogo de Componentes

> Componentes reutilizáveis, nomeados, com variantes e estados. Servem de base para o design system
> em [07](07_direcao_de_arte_e_animacoes.md). Nomenclatura `eai-` (engenharia-agentes-ia).

### B.1 Navegação e chrome

| Componente | Descrição | Variantes | Estados |
| :-- | :-- | :-- | :-- |
| `eai-topnav` | Nav global fixa, glassmorphism | full / compacta (scroll) | default, scrolled, mobile-drawer |
| `eai-progress-ring` | Anel/barra de progresso da trilha | anel / barra linear | 0–100%, oculto (modo livre) |
| `eai-breadcrumb` | `Princípios › P5 Contratos` | — | default |
| `eai-theme-toggle` | Alterna claro/escuro | — | claro, escuro, system |
| `eai-motion-toggle` | Liga/desliga animações | — | on, off (respeita `prefers-reduced-motion`) |

### B.2 Conteúdo

| Componente | Descrição | Variantes | Estados |
| :-- | :-- | :-- | :-- |
| `eai-principle-card` | Card de princípio (hub) | grade / destaque | default, hover, visitado |
| `eai-chapter-header` | Cabeçalho de capítulo (nº, título, dur., dificuldade, progresso) | — | — |
| `eai-section-label` | Rótulo discreto (`01 · O PROBLEMA`) | — | — |
| `eai-callout` | Bloco de destaque | nota-dev / nota-editorial / benefício-negócio / regra-de-ouro | — |
| `eai-comparison-table` | Tabela comparativa (Cérebro×Vitrine, Skills×Playbooks×Knowledge) | 2-col / 3-col | responsiva (vira cards em mobile) |
| `eai-code-block` | Código com realce | inline / bloco / terminal-sim | copiável |
| `eai-stepper` | Passos sequenciais (Spec→PR; ondas) | horizontal / vertical | passo ativo, concluído |
| `eai-quote-impact` | Frase de impacto em tela | — | entrada animada |

### B.3 Interação e aprendizado

| Componente | Descrição | Variantes | Estados |
| :-- | :-- | :-- | :-- |
| `eai-viz-panel` | Moldura padrão de visualização interativa (título, canvas, controles, legenda textual) | SVG / Canvas / BPMN | idle, playing, paused, reduced-motion |
| `eai-quiz` | Pergunta de avaliação | múltipla escolha / arrastar-classificar / completar | não respondido, certo, errado, tentando de novo |
| `eai-xai-feedback` | Feedback explicativo (drivers do porquê) | sucesso / erro | — |
| `eai-toggle-scenario` | Alterna cenários (caos↔disciplina; mostrar número) | — | A, B |
| `eai-slider-param` | Slider de parâmetro do simulador | contínuo / discreto | default, disabled |
| `eai-meter` | Medidor de impacto (custo, risco…) | barra / gauge | valor + rótulo qualitativo + cor semântica |
| `eai-draggable-node` | Peça arrastável do playground | LLM, Schema, API… (10 tipos) | na paleta, no canvas, selecionada, inválida |
| `eai-connection` | Seta de conexão no canvas | — | válida, inválida (sem contrato), ciclo (loop) |

### B.3.1 Governança Agent-Driven (seção do doc 10)

| Componente | Descrição | Variantes | Estados |
| :-- | :-- | :-- | :-- |
| `eai-masonry-grid` | Grid masonry (alturas variáveis) da seção de governança | 3-col / 2-col / 1-col | responsivo (ordem de DOM = ordem de leitura) |
| `eai-dictionary-card` | Card de pilar com ícone SVG (SDD/ADR/BDD/DoR-DoD/MCP) | frente / verso-expansão | default, hover, expandido |
| `eai-dir-tree` | Árvore de diretórios `ul/li` aninhada com bordas conectivas e cor por pasta | — | nó default, foco/hover (balão de responsabilidade) |
| `eai-warning-banner` | Banner de alerta largo (financeiro/regra de ouro) | warning (âmbar) / danger (vermelho) | estático; microinteração opcional de contador |
| `eai-compare-cols` | Duas colunas comparativas + faixa de convergência | 2-col / empilhado | responsivo |

> Cores das pastas em `eai-dir-tree` reusam os tokens semânticos de [07](07_direcao_de_arte_e_animacoes.md):
> `.ai/.claude`=`--danger`, `docs/`=`--accent`, `tests/`=`--ok`, `scripts/`+`.github/`=`--warn`.

### B.4 Estados transversais (todos os interativos)

- **Vazio / inicial:** instrução clara do que fazer ("arraste uma peça", "mova um slider").
- **Carregando:** skeleton; libs pesadas (D3/bpmn) com lazy-load + placeholder.
- **Erro/indisponível:** mensagem honesta + equivalente textual (nunca tela em branco).
- **Reduced-motion:** versão estática + controle "passo a passo" manual.
- **Foco/teclado:** todo controle alcançável e operável por teclado (ver [08](08_acessibilidade_e_metricas.md)).

---

## Parte C — Storyboard do Hero (entregável 7, peça-chave)

**Objetivo pedagógico:** em ~6 segundos (ou via scroll), transmitir a tese "pouca IA no caminho
crítico" pela oposição visual **caos × disciplina**.

| Quadro | Caos (esquerda) | Disciplina (direita) | Mensagem |
| :-: | :-- | :-- | :-- |
| 0 (repouso) | nós de "agentes" pulsando, setas cruzadas | pipeline linear apagado | "dois jeitos de construir" |
| 1 | uma seta volta → forma um **loop**; contador `$` começa a subir | DAG acende nó a nó, da esquerda p/ direita | "autonomia livre = loop + custo" |
| 2 | nó cospe um dado vermelho que **contamina** o vizinho (alucinação se propaga) | um bloco "contrato" **barra** um dado inválido (fica verde) | "erro se propaga × contrato barra" |
| 3 | "rodar de novo" → resultado **diferente** (irreprodutível) | "rodar de novo" → resultado **idêntico** | "irreprodutível × determinístico" |
| 4 (síntese) | painel caótico esmaece | pipeline disciplinado em foco, medidores calmos | CTA: "Comece a entender por quê" |

- **Transições:** scroll-driven (preferível) ou autoplay curto com loop suave; sempre com pause e
  `prefers-reduced-motion` (vira 4 quadros estáticos navegáveis).
- **Tecnologia:** SVG + GSAP/ScrollTrigger (ver [04](04_visualizacoes_interativas.md) e
  [07](07_direcao_de_arte_e_animacoes.md)).
- **Equivalente textual:** legenda que descreve a oposição em uma frase por quadro.

### Ficha técnica do Hero

- **Objetivo:** fisgar e enunciar a tese visualmente.
- **UX:** assistir/rolar; sem exigir clique; CTA claro ao fim.
- **Componentes:** `eai-viz-panel` (variante hero), `eai-toggle-scenario`, `eai-quote-impact`.
- **Tecnologias:** SVG animado + GSAP; fallback estático.
- **Complexidade:** **Média-Alta** (é a primeira impressão; vale investir).
- **Riscos:** virar enfeite sem ensinar; pesar no LCP. **Mitigação:** cada quadro carrega uma das 4
  patologias (ensina); animação só após conteúdo crítico pintar; respeitar reduced-motion.

---

### Referências cruzadas

- Sitemap e áreas → [01](01_arquitetura_informacao_e_sitemap.md)
- Especificação das visualizações dentro de `eai-viz-panel` → [04](04_visualizacoes_interativas.md)
- Tokens, tipografia e animação dos componentes → [07](07_direcao_de_arte_e_animacoes.md)
- Estados de acessibilidade → [08](08_acessibilidade_e_metricas.md)
