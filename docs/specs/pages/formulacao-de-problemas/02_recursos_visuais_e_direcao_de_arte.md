# 02 — Recursos visuais e direção de arte

## 1. Direção de arte

**Conceito:** *instrumentação*. A página não ilustra o artigo — ela o instrumenta. Cada
visualização é um mostrador: mede alguma coisa, tem eixo, tem unidade e admite manipulação. A
estética é a de um painel de engenharia em sala escura, não a de um infográfico de consultoria.

Três regras de arte, herdadas do Dark Tech e endurecidas para esta página:

1. **A linha antes do preenchimento.** Traço fino (`1.5px`), preenchimento apenas como área
   semântica (zona útil × zona de degradação). Nada de volumes decorativos.
2. **A cor carrega significado ou não existe.** Azul `#58a6ff` = investigação/benefício;
   âmbar `#d29922` = custo e atraso; vermelho `#f85149` = degradação e viés; verde `#2ea043` =
   suficiência atingida; roxo `#a371f7` = juízo humano (legitimidade, valores). Cor nunca é o
   único portador: toda série tem rótulo textual e todo estado tem palavra.
3. **O gradiente é assinatura, não informação.** `linear-gradient(90deg,#007bff,#8a2be2)` só em
   títulos, sublinhados e bordas superiores de cartão.

**Movimento.** Toda animação é de *revelação* (traço que se desenha, opacidade que sobe) e dura
≤ 900 ms. Sob `prefers-reduced-motion: reduce`, tudo nasce no estado final — nenhuma informação
depende de ter visto o movimento.

**Técnica.** SVG inline escrito à mão, coordenadas calculadas por módulo JS puro quando a curva é
função de parâmetro. Sem D3, sem Chart.js, sem KaTeX (ADR-eai-002 e `scripts/perf-budget.mjs`).
Fórmulas matemáticas são HTML semântico (`.fp-formula`, `<var>`, `<sub>`) com `aria-label` em
português corrido.

---

## 2. Catálogo de visualizações

Cada ficha traz: **intenção** (o que o leitor precisa concluir), **dado** (origem no artigo),
**forma**, **comportamento**, **sem JS** e **a11y**.

### V1 — Arco "Refinar → Parar" (hero)

| Campo | Definição |
| :-- | :-- |
| **Intenção** | Em cinco segundos: o refinamento tem retornos decrescentes e existe um ponto depois do qual continuar piora a decisão. |
| **Dado** | §1.4, §5.5, §7.1 — redução de incerteza não monotônica + regra de parada. |
| **Forma** | Faixa de 1120×260. Curva descendente de incerteza (azul) com achatamento à direita; linha vertical tracejada `PARADA` em ~62% do eixo; à sua direita, área hachurada vermelha rotulada **zona de degradação**; à esquerda, área azul translúcida **zona de refinamento útil**. Quatro marcos no eixo: `S₀ desagregado` → `S₂ estruturado` → `S₄ prontidão` → `S₅ decisão`. |
| **Comportamento** | Traço desenha-se em 900 ms (`stroke-dasharray`); marcos aparecem em cascata de 120 ms. |
| **Sem JS** | SVG estático completo — as coordenadas são fixas, escritas no HTML. |
| **a11y** | `<figure>` + `<figcaption>` visível curto + descrição longa em `.fp-vh` (leitura textual da curva). `role="img"` com `aria-label` no `<svg>`. |

### V2 — Rosácea das seis incertezas

| Campo | Definição |
| :-- | :-- |
| **Intenção** | Incerteza não é uma coisa só; e a tradição que a trata como distribuição de probabilidade cobre só duas das seis faces. |
| **Dado** | §2.4 (as seis dimensões e suas perguntas definidoras) + §5.4 (métrica candidata e limitação de cada uma). |
| **Forma** | Radar hexagonal 520×520, três anéis de grade. Eixos: *Aleatória · Epistêmica · Estrutural · Semântica · De fronteira · De valores*. **Dois polígonos sobrepostos:** (a) traço azul cheio — cobertura típica da Pesquisa Operacional clássica (alta em aleatória/epistêmica, quase nula nas outras quatro); (b) traço roxo tracejado — cobertura pretendida pelo framework. A área entre eles é a lacuna. |
| **Comportamento** | Seis chips (`<a href="#dim-…">`) comandam o painel: ao ativar, ele exibe a **pergunta que define** a dimensão, a **métrica candidata**, o **status** e a **limitação**, e o vértice correspondente do radar ganha halo. Setas ←/→ percorrem os chips. **Decisão de implementação:** chips são âncoras, não o padrão ARIA `tablist` — um chip que não faz nada sem JavaScript seria armadilha, e o salto por âncora já é a operação correta na ausência do enriquecimento (`src/js/formulacao/solo.js`). |
| **Sem JS** | Os seis painéis existem no HTML, visíveis e empilhados na ordem do artigo; o JS entra em "modo solo" e mostra um por vez. Verificado por `tests/formulacao.nojs.spec.js`. |
| **a11y** | Chips com `aria-current`/`aria-expanded`; painel `role="region"` + `aria-live="polite"`, com foco movido ao painel selecionado. Contraste dos traços ≥ 3:1 sobre `#161b22`. |

### V3 — Máquina de estados S₀ → S₅

| Campo | Definição |
| :-- | :-- |
| **Intenção** | A formulação tem estados observáveis, um portão de qualidade antes de qualquer solução, e pode **regredir**. |
| **Forma** | Trilho de seis nós numerados que quebra em coluna abaixo de 720 px (flex, não SVG — o trilho é feito de elementos focáveis, e um `<svg>` decorativo por cima só acrescentaria peso). Logo abaixo, o **portão** em faixa tracejada âmbar: `frame explícito · objetivos identificados · restrições classificadas · incertezas registradas · evidências citadas · desacordos visíveis · fora-de-escopo declarado`. Os dois retornos — `S₄ → S₁` (enquadramento novo) e `S₅ → S₀` (regressão da formulação) — são declarados no painel do estado de origem e na legenda, em texto: são exceções do processo, não a leitura principal do diagrama. |
| **Dado** | §5.2 (definição dos seis estados), §5.3 (portão mínimo e artefato de transição). |
| **Comportamento** | Mesmo padrão de V2 (`solo.js`): o estado ativo revela definição e o que precisa estar registrado para sair dele. Setas ←/→ percorrem os estados. |
| **Sem JS** | Os seis painéis de estado ficam visíveis e empilhados, na ordem S₀→S₅, com o portão descrito em texto entre eles. |
| **a11y** | Chips-âncora com `aria-current`; painéis `role="region"`. O selo `PROPOSTA` acompanha o título — o modelo de seis estados é contribuição não validada. |

### V4 — Curva de parada (peça central, interativa)

| Campo | Definição |
| :-- | :-- |
| **Intenção** | Tornar a regra de parada **experimentável**: o ponto de parada não é universal, ele se move com o custo do atraso e com a penalidade de hiper-resolução. |
| **Dado** | §6.4 — `EVSI_next + DUG_next + V_frame,next < C_next + C_delay + C_overload`; §5.6 — λ. |
| **Forma** | Plano cartesiano 1120×420. Eixo x: rodadas de investigação (0–10). Eixo y: valor marginal por rodada (unidades arbitrárias, declaradas como didáticas). Três séries: **benefício marginal** (azul, decrescente = EVSI′ + V_frame′), **custo marginal** (âmbar, crescente = custo + custo de atraso), **custo cognitivo** (vermelho, superlinear = C_overload com λ). A interseção benefício × (custo total) marca `t*`, desenhado como linha vertical verde rotulada **PARE AQUI**. |
| **Controles** | Dois `<input type="range">` rotulados: `λ — penalidade de hiper-resolução` (0 → 1,5) e `custo de atraso / urgência` (0 → 6). Cada mudança recalcula `t*` e atualiza três leituras numéricas: `t* = n rodadas`, `benefício líquido acumulado`, `veredito` (*investigar mais* / *decidir agora* / *já passou do ponto*). |
| **Modelo** | Módulo puro `src/js/formulacao/parada-model.js`, testado em `tests/formulacao.model.test.mjs`. Funções: `beneficioMarginal(t)`, `custoMarginal(t, urgencia)`, `custoCognitivo(t, lambda)`, `liquido(t, …)`, `pontoDeParada({lambda, urgencia})`. **Invariantes testados:** (i) benefício é monotonicamente decrescente; (ii) `t*` é não crescente em λ; (iii) `t*` é não crescente na urgência; (iv) `t*` sempre existe dentro do domínio; (v) `liquido(t*) ≤ 0 < liquido(t*−1)`. |
| **Honestidade** | Legenda fixa: *"curvas ilustrativas, com parâmetros escolhidos para exposição. O artigo propõe λ como variável experimental a ser calibrada — não como constante conhecida."* Selo `NÃO VALIDADO`. |
| **Sem JS** | O SVG nasce renderizado com os valores padrão (λ = 0,4; urgência = 2) e os `<input>` ficam com `disabled` removido apenas pelo JS. Uma `<table>` recolhida traz os pontos da curva padrão — o dado sobrevive sem gráfico. |
| **a11y** | Sliders com `<label>`, `aria-valuetext` em português ("lambda 0,4 — parada na rodada 5"); leituras numéricas em `aria-live="polite"`; séries identificadas por rótulo textual ancorado ao fim da linha, não só por cor. |

### V5 — Confiança × acurácia (o paradoxo da sobreinformação)

| Campo | Definição |
| :-- | :-- |
| **Intenção** | Mostrar o descolamento: acurácia satura, confiança continua subindo. O espaço entre as curvas é o risco. |
| **Dado** | §7.1 — Slovic (1974) com prognosticadores; Peng et al. (evidência moderada). |
| **Forma** | 720×300. Eixo x: número de variáveis disponibilizadas (5 → 40). Curva **acurácia** (azul, satura ~ rodada 3); curva **confiança** (vermelha, cresce linear). Área entre elas preenchida em vermelho translúcido, rotulada **hiper-resolução**. Anotação apontando o cruzamento: *"a partir daqui, mais informação compra convicção, não acerto"*. |
| **Comportamento** | Traços desenham-se ao entrar na viewport (`IntersectionObserver`), 700 ms, uma vez. |
| **Sem JS** | Estático no estado final. |
| **a11y** | `role="img"` + descrição longa; selo `EVIDÊNCIA` com citação nominal e ano; a fonte é linkada no rodapé. |

### V6 — Painel de dez dimensões (e o índice único riscado)

| Campo | Definição |
| :-- | :-- |
| **Intenção** | Defender a escolha metodológica do artigo: **painel, não escalar**. Um índice composto esconde exatamente o trade-off que interessa. |
| **Dado** | §5.4 (dez dimensões, métrica candidata, status, limitação) e §6.5 (ressalva crítica ao PFQI). |
| **Forma** | Grade de dez linhas. Cada linha: nome da dimensão · barra de maturidade em três degraus (`estabelecida` / `promissora` / `proposta`) · métrica candidata · limitação em texto miúdo. Acima da grade, uma "leitura de mostrador" com o valor agregado **riscado** (`PFQI 0,71`) e a legenda *"o número que esconde a informação que importa"*. |
| **Comportamento** | Hover/foco de linha eleva a superfície e revela a limitação por extenso. Nenhuma dependência de JS. |
| **Sem JS** | Idêntico (é CSS puro). |
| **a11y** | Marcado como `<table>` real com `<caption>` e cabeçalhos; a barra de maturidade é `<td>` com texto ("promissora") + `aria-hidden` na parte gráfica. |

### V7 — Mapa das sete tradições

| Campo | Definição |
| :-- | :-- |
| **Intenção** | Mostrar geograficamente a lacuna: cada tradição cobre um trecho do processo e **nenhuma cobre a junta** entre enquadramento e decisão auditável. |
| **Dado** | §3 (as sete tradições e suas limitações) + §4.2 (matriz "onde começa / onde termina"). |
| **Forma** | Faixa tipo Gantt. Eixo horizontal = processo de formulação em seis estágios (*Situação · Enquadramento · Estruturação · Modelagem · Decisão · Aprendizagem*). Sete barras horizontais, uma por tradição (PSM, Decision Analysis, Teoria da Informação, Bayesian Decision Theory, Ciência Cognitiva, Engenharia de Requisitos/Sistemas, Knowledge Engineering), cada uma cobrindo apenas os estágios em que opera. Abaixo, a barra do **framework proposto** em gradiente, atravessando os seis — com selo `PROPOSTA`. Uma coluna vertical destacada marca a **junta descoberta**: entre Enquadramento e Modelagem, onde as barras rareiam. |
| **Comportamento** | Cada barra é foco-navegável; ao focar, exibe abaixo a contribuição e a limitação residual daquela tradição (texto do artigo, §3.x). |
| **Sem JS** | Todas as descrições presentes em `<dl>` sob o gráfico. |
| **a11y** | Barras com `aria-label` do tipo "Decision Analysis: cobre modelagem e decisão; não cobre situação nem enquadramento". |

---

## 3. Componentes de apoio (não são gráficos)

| Componente | Uso |
| :-- | :-- |
| `.fp-formula` | Bloco de fórmula em HTML semântico, fundo `#161b22`, borda esquerda azul. Máx. 6 na página. **A linha da equação é `aria-hidden`** e vem acompanhada de uma **leitura em prosa** num `.fp-vh` — um leitor de tela recebe "a penalidade lambda no instante t é a soma de quatro parcelas…", não a soletração de subscritos. É por isso que a página não usa KaTeX nem MathJax: além de violarem o orçamento de performance (zero terceiros bloqueantes), o MathML tem suporte irregular entre leitores de tela, e a prosa escrita à mão entrega mais. |
| `.fp-selo` | Selo de status epistêmico (doc 01 §5). |
| `.fp-vh` | Descrição longa de figura, só para leitor de tela (Figuras 2 e 4). |
| `.fp-negacao` | Lista das cinco coisas que a hipótese **não** afirma — tipografia riscada leve + ícone `×`. |
| `.fp-kill` | Cartão de critério de falseabilidade (oito), numerado, borda vermelha à esquerda. |
| `.fp-card--custo` | Cartão dos cinco domínios de inaplicabilidade (triagem Cynefin) — variação do cartão padrão, não um componente novo. |
| Termo de glossário inline | Âncora direta para a entrada correspondente no glossário do fim da página (sem popover e sem componente próprio — um destino real funciona com e sem JavaScript, e `audit-site.mjs` cobra a existência da âncora). |
| `.fp-readbar` | Barra de progresso de leitura no topo (padrão `engenharia-confianca`). |
| `.fp-video` | Embed do complemento em vídeo, com a mesma anatomia de `engenharia-confianca`: legenda em cima, moldura com proporção **16:9** travada por `padding-bottom: 56.25%`. A altura é reservada antes do carregamento — com `loading="lazy"` no iframe, sem isso o player empurraria o conteúdo ao entrar. `title` obrigatório no iframe; embed via `youtube-nocookie`. |

## 4. Orçamento

| Recurso | Teto |
| :-- | :-- |
| CSS da página (`formulacao-de-problemas.css`) | ≤ 28 KB não comprimido |
| JS total (entrada + `src/js/formulacao/*`) | ≤ 18 KB não comprimido, ES modules, sem dependências (medido: ~15,5 KB) |
| SVG inline somado | ≤ 40 KB (contribui para o HTML; a página não usa imagens raster além do OG) |
| Requisições bloqueantes de terceiro | **0** (fonte via `media="print"`+`onload`, padrão de `optimize-critical-path.mjs`) |
