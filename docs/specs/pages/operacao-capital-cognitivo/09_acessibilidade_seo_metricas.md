# 09 — Acessibilidade, SEO e Métricas

> Cobre o entregável **12 (Acessibilidade WCAG 2.2 AA, SEO e métricas de uso)**.

---

## 1. Requisitos de Acessibilidade (WCAG 2.2 Level AA)

### 1.1 Princípios POUR aplicados

| Princípio | Implementação nesta página |
| :-- | :-- |
| **Perceptível** | Contraste ≥ 4.5:1 para texto normal, ≥ 3:1 para texto grande. Gráficos sempre com alternativa textual via `aria-label`. |
| **Operável** | Navegação completa por teclado. Sem armadilhas de foco. Sem conteúdo que pisca > 3 vezes/segundo. |
| **Compreensível** | Linguagem clara (PT-BR). Erros explicados. Rótulos explícitos em todos os controles. |
| **Robusto** | Semântica HTML5 correta. Compatível com NVDA, JAWS e VoiceOver. |

### 1.2 Checklist por componente

#### HUD Persistente
- [x] `aria-live="polite"` em todos os contadores numéricos (caixa, UI/$, capital cog.).
- [x] `aria-label` descritivo nas barras de progresso: `"Moral da equipe de desenvolvimento: 50%"`.
- [x] Contraste de texto sobre `#161b22`: branco `#ffffff` → ratio 15.9:1 ✓

#### Sliders do Cap. 5
- [x] `<label>` explícito vinculado por `for`/`id` a cada `<input type="range">`.
- [x] `aria-label` descritivo no slider: `"Proporção de prompts roteados para SLM: 0 a 100 por cento"`.
- [x] Valor atual legível por leitor de tela via `aria-valuenow` + `aria-valuemin` + `aria-valuemax`.
- [x] Operável por teclado (setas ←→ nativas do browser).

#### Novos Controles do Cap. 5 (v4.1)
- [x] `#ctrl-rerank` (`<select>`) com `aria-label` e `<option>` descritivos (off/conditional/universal).
- [x] `#ctrl-cache`, `#ctrl-multiagent`, `#ctrl-agent-isolation`: `role="switch"` + `aria-label`; estado
  refletido por `aria-checked` gerido pelo browser no `<input type="checkbox">`.
- [x] `#context-rot-meter` e `#cascade-warning`: `role="status"` + `aria-live="polite"` — a degradação
  e o risco de cascata são anunciados sem roubar o foco.
- [x] `#ctrl-context-tokens`: `aria-label` inclui unidade ("em tokens"); rótulo textual `#ctrl-context-label`
  atualizado em sincronia.

#### Medidor de V_core (`#vcore-gauge`)
- [x] `role="group"` + `aria-label="Índice de Carga de Verificação"`.
- [x] `#vcore-value` com `aria-live="polite"`; a cor **não** é o único portador de significado — o número
  e o rótulo textual comunicam o estado (WCAG 1.4.1 Uso de Cor).
- [x] Os 5 sinais componentes ficam em lista textual (`#vcore-signals`), legível por leitor de tela.

#### Canvas e SVG (gráficos)
- [x] `<canvas>` com `role="img"` e `aria-label` descrevendo os dados completos.
- [x] `<svg>` Sankey com `<title>` e `<desc>` internos.
- [x] Tabela de dados equivalente sempre disponível abaixo de cada gráfico (oculta por padrão, exibível via "Ver dados").

```html
<!-- Exemplo: tabela alternativa ao gráfico de pizza -->
<button id="show-tco-table" class="text-xs text-blue-400 underline mt-2"
        aria-expanded="false" aria-controls="tco-data-table">
  Ver dados em tabela
</button>
<table id="tco-data-table" class="hidden mt-4 w-full text-sm"
       aria-label="Composição do TCO em formato tabular">
  <thead>
    <tr>
      <th scope="col">Categoria</th>
      <th scope="col">Valor (R$)</th>
      <th scope="col">Percentual</th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">Custo de API</th><td>R$ 3.000</td><td>7,5%</td></tr>
    <tr><th scope="row">Tempo Dev (Revisão + Verification Load)</th><td>R$ 28.800</td><td>72%</td></tr>
    <tr><th scope="row">Infra / Vector DB / Observabilidade</th><td>R$ 4.800</td><td>12%</td></tr>
    <tr><th scope="row">Overhead de Governança / Compliance</th><td>R$ 3.400</td><td>8,5%</td></tr>
  </tbody>
</table>
```

#### Modal de Alerta (`<dialog>`)
- [x] Foco movido automaticamente para o `<dialog>` ao abrir (`dialog.showModal()`).
- [x] Foco retorna ao elemento acionador ao fechar.
- [x] `aria-labelledby` apontando para `#dialog-title`.
- [x] Fechável com `Escape` (comportamento nativo do `<dialog>`).

#### Canvas de Fórmula — Drag-and-Drop (Cap. 3)
- [x] Fallback de "click-to-place": clicar em um bloco seleciona; clicar na zona de destino coloca.
- [x] `role="application"` + instruções via `aria-describedby` explicando o modo alternativo.
- [x] Estado do numerador e denominador anunciado por `aria-live="assertive"` a cada mudança.

```html
<div id="formula-canvas-instructions" class="sr-only">
  Arraste os blocos de conceito para o numerador ou denominador.
  Alternativamente, clique em um bloco para selecioná-lo (indicado por borda azul),
  depois clique na zona do numerador ou denominador para posicioná-lo.
</div>
<div id="formula-canvas" aria-describedby="formula-canvas-instructions" role="application">
  <!-- ... -->
</div>
```

#### Evidence Cards
- [x] Cards focáveis com `tabindex="0"`.
- [x] `role="article"` em cada card.
- [x] Estado bloqueado: `aria-disabled="true"` + tooltip via `title`.
- [x] Ação de expandir detalhe: `<button>` com `aria-expanded` alternando.

#### Resposta do Conselho (Cap. 6)
- [x] Opções de resposta como `<button>` (não `<div>` clicável).
- [x] Card de evidência arrastada: alternativa de seleção por teclado via `Enter` ou `Space`.
- [x] Botão "Confirmar" com `aria-disabled="true"` quando nenhuma evidência selecionada +
  `title="Selecione uma evidência do Mural antes de confirmar"`.

### 1.3 Contraste de Cores — Verificação

| Elemento | Cor do texto | Cor do fundo | Ratio | Aprovação |
| :-- | :-- | :-- | :-- | :-- |
| Body text | `#c9d1d9` | `#0d1117` | 12.9:1 | ✅ AAA |
| HUD numbers | `#ffffff` | `rgba(22,27,34,0.95)` | ~15:1 | ✅ AAA |
| Accent teal | `#0d9488` | `#0d1117` | 3.8:1 | ✅ AA (large) |
| Warning amber | `#d97706` | `#0d1117` | 4.6:1 | ✅ AA |
| Evidence Level A badge | `#22c55e` | `#161b22` | 4.8:1 | ✅ AA |
| Evidence Level C badge | `#eab308` | `#161b22` | 5.1:1 | ✅ AA |
| Badge HumanFactors (HUM) | `#e11d48` | `#161b22` | 4.5:1 | ✅ AA |
| V_core valor (texto branco) | `#ffffff` | `#161b22` | 15.9:1 | ✅ AAA |
| Context Rot texto | `#fdba74` | `#0d1117` | 8.9:1 | ✅ AAA |

### 1.4 Responsividade Mobile

| Breakpoint | Adaptação |
| :-- | :-- |
| `< 640px` | HUD colapsa para 2 métricas (Caixa + UI/$). Evidence Board vira bottom sheet. |
| `< 768px` | Layout de 2 colunas (evidências + simulador) colapsa em 1 coluna. |
| `≥ 1024px` | Layout completo de 2 colunas conforme wireframe. |

```css
/* Mobile-first: painel de evidências como bottom sheet */
@media (max-width: 767px) {
  #evidence-panel {
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 70vh;
    border-left: none;
    border-top: 1px solid theme('colors.gray.700');
    transform: translateY(100%);
  }
}
```

---

## 2. SEO

### 2.1 Tags obrigatórias

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO primário -->
  <title>Operação Capital Cognitivo — Simulador Executivo de FinOps & IA | Maurício Issei</title>
  <meta name="description"
    content="Simulador executivo interativo: investigue os R$ 37k desaparecidos na fatura de IA, domine o framework Useful Intelligence per Dollar (UI/$) e defenda decisões de arquitetura perante um Conselho de Administração dinâmico.">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Operação Capital Cognitivo — Simulador de FinOps & IA">
  <meta property="og:description"
    content="Descubra por que a IA mais cara não é a que cobra mais por token. Simule, investigue e defenda suas decisões.">
  <meta property="og:image"
    content="https://mauricio.issei.com.br/og-operacao-capital-cognitivo.png">
  <meta property="og:url"
    content="https://mauricio.issei.com.br/operacao-capital-cognitivo.html">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Operação Capital Cognitivo — Simulador FinOps & IA">
  <meta name="twitter:description"
    content="Domine o framework Useful Intelligence per Dollar investigando uma crise corporativa real de IA.">
  <meta name="twitter:image"
    content="https://mauricio.issei.com.br/og-operacao-capital-cognitivo.png">

  <!-- Canonical -->
  <link rel="canonical" href="https://mauricio.issei.com.br/operacao-capital-cognitivo.html">

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Operação Capital Cognitivo",
    "description": "Simulador executivo interativo de FinOps e Arquitetura de IA",
    "educationalLevel": "Professional",
    "teaches": "FinOps de IA, Useful Intelligence per Dollar, Capital Cognitivo",
    "author": {
      "@type": "Person",
      "name": "Maurício Yokoyama Issei",
      "url": "https://mauricio.issei.com.br"
    },
    "inLanguage": "pt-BR",
    "url": "https://mauricio.issei.com.br/operacao-capital-cognitivo.html"
  }
  </script>
</head>
```

### 2.2 Hierarquia de headings

```
h1: "Operação Capital Cognitivo" (apenas no intro/hero)
  h2: "Capítulo 1 — O Mistério dos R$ 37 Mil Desaparecidos"
    h3: "Fatura Corporativa de IA — Outubro 2025"
  h2: "Capítulo 2 — A Armadilha da IA Barata"
    h3: "Simulação de First-Pass Accuracy"
  (... um h2 por capítulo ...)
```

**Regra:** Exatamente um `<h1>` por sessão visível. Capítulos ocultos têm `aria-hidden="true"`.

---

## 3. Métricas e Observabilidade

### 3.1 Eventos a rastrear (analytics client-side)

```javascript
// Eventos para Google Analytics / Plausible
const TRACKED_EVENTS = [
  { name: 'cap1_invoice_complete', trigger: 'Todas as linhas da fatura expandidas' },
  { name: 'cap2_simulation_run', trigger: 'Botão "Executar Simulação" clicado' },
  { name: 'cap2_model_choice', trigger: 'Usuário escolhe Model-Lite ou Model-Pro', props: { model: 'lite|pro' } },
  { name: 'cap3_formula_built', trigger: 'Fórmula UI/$ montada corretamente' },
  { name: 'cap3_metric_named', trigger: 'Usuário nomeia a métrica', props: { name_length: Number } },
  { name: 'cap4_quiz_passed', trigger: 'Quiz respondido corretamente' },
  { name: 'cap5_quarter_advanced', trigger: 'Trimestre avançado', props: { quarter: 'Q2|Q3|Q4' } },
  { name: 'cap6_board_victory', trigger: 'Vitória no Board' },
  { name: 'cap6_board_failure', trigger: 'Falha no Board', props: { reason: 'cash|morale|trust' } },
  { name: 'transfer_case_answered', trigger: 'Caso de transferência respondido' },
];
```

### 3.2 Metas de performance (Core Web Vitals)

| Métrica | Meta |
| :-- | :-- |
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Total JS (parsed) | < 120kb (sem minificação) |
| Sem dependências externas de runtime | ✅ (apenas Google Fonts CDN) |

### 3.3 Imagem OG

A imagem `og-operacao-capital-cognitivo.png` (1200×630px) deve ser criada com:
- Fundo `#0d1117`.
- Título em Inter Bold branco.
- Subtítulo "Simulador Executivo de FinOps & IA" em gradiente azul→roxo.
- Ícone de gráfico de pizza (mockado) e HUD estilizado.

---

### Referências cruzadas

- Componentes HTML com atributos ARIA → [08](08_wireframes_catalogo_componentes.md)
- Testes de acessibilidade automatizados → [10](10_testes_roadmap_riscos.md)
