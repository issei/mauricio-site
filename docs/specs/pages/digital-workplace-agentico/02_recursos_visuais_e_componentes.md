# 02 — Recursos visuais e componentes

## 1. Direção de arte

**Conceito:** *planta de engenharia*. A página desenha a arquitetura como um arquiteto desenharia
num quadro: camadas, setas com rótulo, portões com critério. Nada de ilustração de "robô", ícones
de cérebro ou estética de IA genérica.

Regras:

1. **Diagrama é texto antes de ser desenho.** Toda visualização nasce como HTML semântico
   (`<ol>`, `<table>`, `<dl>`) legível sem CSS e sem JS; o SVG/CSS é camada de apresentação.
2. **A cor carrega significado ou não existe.** As cores semânticas do doc 03 (camada, efeito,
   risco, humano) aparecem sempre com rótulo textual.
3. **O gradiente é assinatura** (`#007bff → #8a2be2`): títulos, sublinhados, borda superior de cartão.
4. **Sem marcas.** Nenhum logotipo de produto, nenhuma captura de tela de portal real, nenhum nome
   de organização em rótulo, `alt`, `aria-label`, `title` de SVG ou nome de arquivo de imagem.
   Nomes de **protocolos e padrões abertos** (AG-UI, MCP, A2A, A2UI, OAuth, OpenTelemetry) são permitidos.

**Movimento:** revelação (opacidade/traço) ≤ 900 ms; sob `prefers-reduced-motion: reduce` tudo
nasce no estado final. **Técnica:** SVG inline à mão ou CSS Grid; sem bibliotecas de gráfico
(`scripts/perf-budget.mjs`).

## 2. Catálogo

Cada ficha: **intenção**, **dado**, **forma**, **comportamento**, **sem JS**, **a11y**.

### V1 — Cadeia "Intenção → Experiência" (hero)

| Campo | Definição |
| :-- | :-- |
| Intenção | Em cinco segundos: o agente é um elo no meio de uma cadeia, não a cadeia inteira. |
| Dado | Fórmula do estágio 5 (`modelo_de_maturidade_cinco_estagios.md` §6): Intenção → Agente → Conhecimento → Ferramentas → Processo de negócio → Experiência dinâmica. |
| Forma | Seis nós em linha (coluna no mobile) ligados por setas; sob cada nó, a pergunta que ele responde ("o que a pessoa quer?", "quem age?", "qual a regra?", "com que capacidade?", "com que dono e estado?", "como a pessoa vê e confirma?"). O nó "Agente" tem o mesmo peso visual dos outros, de propósito. |
| Comportamento | Setas desenham-se em cascata de 120 ms. |
| Sem JS | `<ol class="dw-cadeia">` completo; o SVG é decorativo (`aria-hidden`). |
| a11y | A lista é o conteúdo; figura com `<figcaption>`. |

### V2 — Escada de maturidade + matriz por dimensão

| Campo | Definição |
| :-- | :-- |
| Intenção | Cada estágio acumula os anteriores; pular degrau tem custo nomeado. |
| Dado | §1 (fórmula, pergunta do colaborador, resposta da plataforma), §7 (matriz E1–E5 × 8 dimensões), §9 (custos de pular). |
| Forma | Escada de cinco degraus ascendentes; cada degrau mostra fórmula + par pergunta/resposta. Abaixo, a matriz real (`<table>`) com 8 linhas × 5 colunas. Ao lado, três cartões "Pular estágios" (E2→E4, E2→E5, E3→E5) com borda `--dw-risco`. |
| Comportamento | Com JS, selecionar um degrau destaca a coluna correspondente da matriz (`aria-pressed` nos botões dos degraus). |
| Sem JS | Escada como `<ol>`, matriz como tabela inteira. |
| a11y | `<caption>`, `<th scope>`; destaque nunca só por cor (coluna ganha rótulo "estágio selecionado"). Tabela em contêiner com `overflow-x:auto` e `tabindex="0"` + rótulo. |

### V3 — Diagrama de camadas

| Campo | Definição |
| :-- | :-- |
| Intenção | Onde fica cada responsabilidade, e o que é transversal. |
| Dado | `arquitetura_de_referencia_integrada.md` §1–§2: Colaborador; Experience Layer; Agent/Interaction Layer; Employee Experience Platform; Knowledge e Integration (lado a lado); Corporate Systems (SoR); faixa Transversal (IAM e delegação, políticas, LGPD, governança de IA, auditoria, observabilidade, SRE, DEX). |
| Forma | Pilha de faixas em CSS Grid; Knowledge e Integration em duas colunas; faixa transversal vertical à direita (abaixo, no mobile). Rótulos das conexões: "AG-UI (eventos, estado, interrupções)", "ferramentas (MCP)", "APIs com contrato". |
| Comportamento | Cada faixa é `<details>`: abre a tabela de responsabilidades da camada (§2.x da fonte). |
| Sem JS | Totalmente funcional (`<details>` nativo). |
| a11y | `<section aria-labelledby>` por camada; ordem DOM = ordem de leitura de cima para baixo. |

### V4 — Sequência de um pedido com eventos AG-UI

| Campo | Definição |
| :-- | :-- |
| Intenção | Mostrar o que trafega entre interface, agente, ferramentas e processo num pedido com efeito (ex.: solicitar férias), incluindo a confirmação humana. |
| Dado | `fluxo_agente_ag_ui_ferramentas_processos.md` (fluxo) + `ag_ui_protocolo_eventos_e_estado.md` (oito famílias de eventos: runs/steps, mensagens, tool calls, reasoning, estado, atividade, subagentes, passthrough; interrupções). |
| Forma | Diagrama de sequência com quatro raias (Colaborador · Interface/cliente AG-UI · Agente · Ferramentas/Workflow). Cada mensagem tem o nome do evento em monoespaçado (`RUN_STARTED`, `TOOL_CALL_START`, `STATE_DELTA`, interrupção de confirmação, `RUN_FINISHED`). Um passo "Confirmar" destacado em `--dw-humano`. |
| Comportamento | Botões "anterior/próximo" percorrem os passos; o passo atual é descrito em texto num painel `aria-live="polite"`. Botão "ver tudo" mostra todos. |
| Sem JS | `<ol>` numerado dos passos com evento, emissor, receptor e explicação; SVG estático com todos os passos. |
| a11y | Botões com rótulo; foco visível; teclado (←/→ quando o grupo tem foco). Legenda da tabela das oito famílias como `<table>` recolhível. |
| Nota | **[FATO]** nomes de eventos conforme a especificação AG-UI 1.0 citada na fonte; a sequência é **ilustrativa**, não uma execução real (selo `RECOMENDAÇÃO`). |

### V5 — Cadeia do conhecimento com portões

| Campo | Definição |
| :-- | :-- |
| Intenção | RAG é o último elo; antes dele há fonte canônica, metadados, permissões e índice. |
| Dado | `cadeia_do_conhecimento_ecm_ao_agente.md` (ECM → CSP → Headless → Search → RAG → Agente; checklist de prontidão para RAG). |
| Forma | Seis estações horizontais; entre elas, "portões" com o critério de passagem (ex.: "vigência, dono e permissão em 100% do escopo"). |
| Comportamento | Estático; portões com `<details>` para o checklist. |
| Sem JS | Igual. |
| a11y | Lista ordenada; portões são `<details>` com `<summary>` descritivo. |

### V6 — Escada de autonomia 0–4

| Campo | Definição |
| :-- | :-- |
| Intenção | Autonomia é por classe de ação e sobe com evidência. |
| Dado | `agentes_tool_calling_mcp_a2a.md` §10 (0 informa, 1 sugere, 2 executa com confirmação, 3 executa e notifica, 4 executa sem humano) + recomendação de teto no nível 2 para ações com efeito financeiro, legal ou sobre dados sensíveis em setor regulado. |
| Forma | Cinco degraus com exemplo e controle; linha horizontal tracejada "teto recomendado para ações sensíveis" acima do nível 2. |
| Sem JS | Tabela real com as três colunas. |
| a11y | A linha de teto tem rótulo textual na tabela (coluna "Teto para ações sensíveis"). |

### V7 — Grade fases × trilhas + caminho crítico

| Campo | Definição |
| :-- | :-- |
| Intenção | Trilhas avançam em paralelo; identidade delegada (T2) e conteúdo governado (T3) são o caminho crítico. |
| Dado | `roadmap_e_dependencias.md` §2–§4 (T1–T7, fases 0–5, critérios de passagem, mapa de dependências). |
| Forma | Tabela 7 trilhas × 6 fases com as entregas resumidas; T2 e T3 com marcador "caminho crítico" (texto + borda `--dw-risco`). Critério de passagem de cada fase no rodapé da coluna. |
| Comportamento | Com JS, filtros por trilha (botões `aria-pressed`) esmaecem as outras linhas. |
| Sem JS | Tabela completa. |
| a11y | `<caption>`, `<th scope="row|col">`; esmaecer nunca remove do DOM nem da árvore de acessibilidade. |

### V8 — Índice de prontidão agêntica (interativo)

| Campo | Definição |
| :-- | :-- |
| Intenção | O leitor pontua uma jornada do próprio contexto e vê o que ela suporta hoje. |
| Dado | `roteiro_de_estudo_e_metricas.md` §4.2: 10 critérios × 0/1/2; faixas 0–9 "trabalhar fundações", 10–15 "pronta para RAG e ferramentas de leitura", 16–20 "pronta para ações com confirmação". |
| Forma | `<form>` com 10 `<fieldset>` de três rádios (ausente/parcial/completo); resultado com número, faixa e as lacunas (critérios com 0) listadas. |
| Modelo | Módulo puro `src/js/digital-workplace/prontidao-model.js`: `score(answers) → {total, faixa, lacunas}`. Invariantes testadas em `tests/digital-workplace.model.test.mjs`: total ∈ [0,20]; 9→fundações, 10→RAG, 15→RAG, 16→ações; resposta ausente conta 0; entrada inválida lança erro. |
| Comportamento | Recalcula a cada mudança; resultado em `aria-live="polite"`. Nada sai do navegador; nada é persistido (sem `localStorage`). |
| Sem JS | Os critérios e a tabela de faixas ficam visíveis como instrução de cálculo manual; o botão de resultado nasce `disabled` com texto explicando. |
| a11y | `<legend>` por critério; rádios nativos; alvo ≥ 24 px. |

## 3. Componentes de página

| Componente | Classe | Uso |
| :-- | :-- | :-- |
| Selo epistêmico | `.dw-selo` + `--fato/--inferencia/--hipotese/--recomendacao` | todo bloco derivado da fonte |
| Cartão de pilar | `.dw-pilar` | oito pilares em `#pilares`, cada um com resumo + `<details>` |
| Par de trade-off | `.dw-tradeoff` | "A × B": conflito, como se resolve na prática |
| Anti-pattern | `.dw-anti` | como aparece, por que é problema, como detectar |
| Aprofundamento | `.dw-mais` | `<details>` com tabelas longas |
| Entrada por dor | `.dw-dor` | quatro cartões sob o hero |
| Pergunta crítica | `.dw-pergunta` | `<details>` com resposta e selo |
