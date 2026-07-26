# 08 — Wireframes e Catálogo de Componentes

> Cobre o entregável **11 (Wireframes conceituais e catálogo de componentes)**.
> Para cada componente: ID HTML, props, comportamento e snippet de estrutura.

---

## 1. Componentes Globais

### C-01 — HUD Persistente (`#hud`)

**Objetivo:** Manter o usuário orientado ao estado da simulação em todo momento.

```html
<header id="hud" class="sticky top-0 z-50 backdrop-blur-lg border-b border-blue-500/30">
  <div class="container mx-auto px-4 py-2 flex flex-wrap items-center gap-4 text-sm">

    <!-- Badge de trimestre -->
    <span id="hud-quarter"
          class="font-mono font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
      Q1
    </span>

    <!-- Caixa -->
    <div class="flex flex-col">
      <span class="text-xs text-gray-500 uppercase tracking-wider">Caixa</span>
      <span id="hud-cash" class="font-mono font-bold text-white" aria-live="polite">
        R$ 850.000
      </span>
    </div>

    <!-- UI/$ -->
    <div class="flex flex-col">
      <span class="text-xs text-gray-500 uppercase tracking-wider">UI/$</span>
      <span id="hud-ui-dollar" class="font-mono font-bold text-teal-400" aria-live="polite">
        —
      </span>
    </div>

    <!-- Capital Cognitivo -->
    <div class="flex flex-col">
      <span class="text-xs text-gray-500 uppercase tracking-wider">Capital Cog.</span>
      <span id="hud-capital" class="font-mono font-bold text-purple-400" aria-live="polite">
        —/100
      </span>
    </div>

    <!-- Moral da Equipe (barra) -->
    <div class="flex flex-col flex-1 min-w-[120px]">
      <div class="flex justify-between text-xs text-gray-500 mb-1">
        <span>Moral Devs</span>
        <span id="hud-morale-pct">50%</span>
      </div>
      <progress id="hud-morale" value="50" max="100"
                class="w-full h-1.5 rounded-full overflow-hidden
                       [&::-webkit-progress-bar]:bg-gray-700
                       [&::-webkit-progress-value]:bg-violet-500">
      </progress>
    </div>

    <!-- Breadcrumb de capítulos -->
    <nav id="chapter-breadcrumb" aria-label="Progresso dos capítulos"
         class="flex items-center gap-1 ml-auto">
      <!-- Gerado dinamicamente por JS -->
    </nav>

  </div>
</header>
```

**Comportamento JS (hud.js):**
```javascript
export function updateHUD(state) {
  document.getElementById('hud-quarter').textContent = state.currentPhase.replace('Q', 'Q');
  animateCounter('hud-cash', state.finances.cashBalance, formatCurrency);
  animateCounter('hud-ui-dollar', state.metrics.globalUI, v => v.toFixed(2));
  animateCounter('hud-capital', state.metrics.cognitiveCapitalIndex, v => `${v.toFixed(0)}/100`);
  document.getElementById('hud-morale').value = state.social.devTeamMoral;
  document.getElementById('hud-morale-pct').textContent = `${state.social.devTeamMoral.toFixed(0)}%`;
}
```

---

### C-02 — Toast de Nova Evidência (`#toast-evidence`)

```html
<div id="toast-evidence" role="status" aria-live="polite"
     class="fixed bottom-4 right-4 z-50 hidden
            bg-gray-900 border border-green-500/50 rounded-xl px-4 py-3
            flex items-center gap-3 shadow-xl shadow-green-500/10
            animate-slide-in-right">
  <span class="text-2xl" id="toast-evidence-icon">💸</span>
  <div>
    <p class="text-xs text-green-400 font-semibold uppercase">Nova Evidência</p>
    <p class="text-sm text-white font-medium" id="toast-evidence-title">TCO vs. Custo de API</p>
  </div>
</div>
```

---

### C-03 — Modal de Alerta Executivo (`#event-alert-dialog`)

```html
<dialog id="event-alert-dialog"
        class="backdrop:bg-black/60 bg-[#161b22] border border-amber-500/30
               rounded-2xl p-6 w-full max-w-md mx-auto text-white
               shadow-2xl shadow-amber-500/10">
  <div class="flex items-start gap-4 mb-4">
    <span id="dialog-severity-icon" class="text-4xl">⚡</span>
    <div>
      <p class="text-xs text-amber-400 uppercase tracking-widest font-semibold mb-1">
        Alerta Executivo — <span id="dialog-quarter">Q3</span>
      </p>
      <h2 id="dialog-title" class="text-xl font-bold"></h2>
    </div>
  </div>
  <p id="dialog-description" class="text-gray-300 mb-2"></p>
  <p id="dialog-impact" class="text-sm text-amber-300 bg-amber-500/10 rounded-lg p-3 mb-4"></p>
  <p id="dialog-mitigation" class="text-sm text-gray-400 mb-6 hidden"></p>
  <button id="dialog-close"
          class="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold">
    Entendido — Avançar
  </button>
</dialog>
```

---

## 2. Componentes por Capítulo

### C-04 — Fatura Interativa (Cap. 1, `#invoice-explorer`)

```html
<div id="invoice-explorer" class="bg-[#161b22] rounded-2xl border border-gray-700/50 overflow-hidden">

  <!-- Cabeçalho da fatura -->
  <div class="bg-[#1c2128] px-6 py-4 border-b border-gray-700/50">
    <h3 class="font-mono text-green-400">NEXUS TECH CORP — RELATÓRIO FINANCEIRO DE IA</h3>
    <p class="text-sm text-gray-500">Período: Outubro/2025 | Status: ⚠️ Investigação em curso</p>
  </div>

  <!-- Linhas da fatura (cada uma é um <details>) -->
  <div class="divide-y divide-gray-700/30">

    <details id="invoice-api" class="group">
      <summary class="flex items-center justify-between px-6 py-4 cursor-pointer
                      hover:bg-white/5 transition-colors list-none">
        <div class="flex items-center gap-3">
          <span class="text-lg">🔌</span>
          <span class="font-medium">Custo de API (LLM)</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-mono text-white font-bold">R$ 3.000</span>
          <span class="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">7,5%</span>
          <span class="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
        </div>
      </summary>
      <div class="px-6 pb-4 pt-2 bg-[#0d1117]/50 text-sm text-gray-400">
        <p>Chamadas de inferência ao modelo Model-Lite. 10.000 requests × R$ 0,30 médio.</p>
      </div>
    </details>

    <!-- Linha com mistério "?" -->
    <details id="invoice-human" class="group">
      <summary class="flex items-center justify-between px-6 py-4 cursor-pointer
                      hover:bg-amber-500/5 transition-colors list-none border-l-2 border-amber-500">
        <div class="flex items-center gap-3">
          <span class="text-lg">👥</span>
          <span class="font-medium">Revisão e Refatoração Humana</span>
          <span class="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded">?</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-mono text-amber-400 font-bold">Investigar ↓</span>
        </div>
      </summary>
      <div class="px-6 pb-4 pt-2 bg-amber-500/5 text-sm" id="invoice-human-detail">
        <!-- Preenchido por JS após clique -->
      </div>
    </details>

    <!-- ... demais linhas ... -->

  </div>
</div>
```

---

### C-05 — Gráfico de Pizza em Canvas (Cap. 1, `#tco-pie-chart`)

```html
<div class="flex flex-col items-center gap-4">
  <canvas id="tco-pie-chart" width="280" height="280" role="img"
          aria-label="Gráfico de composição do TCO: API 7,5%, Revisão Humana 72%, Infraestrutura 12%, Overhead 8,5%">
  </canvas>
  <div id="tco-pie-legend" class="flex flex-wrap gap-3 justify-center text-sm">
    <!-- Legenda gerada dinamicamente por JS -->
  </div>
</div>
```

---

### C-06 — Canvas de Montagem de Fórmula (Cap. 3, `#formula-canvas`)

```html
<div id="formula-canvas" class="bg-[#0d1117] rounded-2xl border border-purple-500/20 p-8">

  <!-- Blocos arrastáveis -->
  <div id="formula-blocks" class="flex flex-wrap gap-2 mb-8" aria-label="Blocos de conceito disponíveis">
    <div class="formula-block draggable bg-[#161b22] border border-gray-700
                rounded-lg px-3 py-2 cursor-grab text-sm font-medium text-white
                hover:border-purple-500/60 transition-colors"
         draggable="true" data-concept="work_approved">
      Trabalho Correto Aprovado
    </div>
    <!-- ... outros blocos ... -->
  </div>

  <!-- Área de montagem da fração -->
  <div class="flex items-center justify-center gap-4">
    <!-- Numerador -->
    <div class="flex flex-col items-center gap-2">
      <div id="formula-numerator"
           class="drop-zone min-w-[200px] min-h-[48px] border-2 border-dashed border-gray-600
                  rounded-xl flex items-center justify-center text-gray-500 text-sm
                  hover:border-purple-500/60 transition-colors"
           role="group" aria-label="Numerador da fórmula">
        Arraste aqui
      </div>
    </div>

    <!-- Divisão -->
    <div class="text-4xl text-gray-400 font-thin">÷</div>

    <!-- Denominador -->
    <div id="formula-denominator"
         class="drop-zone min-w-[200px] min-h-[48px] border-2 border-dashed border-gray-600
                rounded-xl flex items-center justify-center text-gray-500 text-sm
                hover:border-purple-500/60 transition-colors"
         role="group" aria-label="Denominador da fórmula">
      Arraste aqui
    </div>
  </div>

  <!-- Validador -->
  <div id="formula-validator" class="mt-6 text-center text-sm hidden"></div>

  <!-- Input de nome -->
  <div id="formula-naming" class="mt-8 hidden">
    <label class="block text-sm text-gray-400 mb-2" for="metric-name-input">
      Dê um nome para esse indicador:
    </label>
    <input type="text" id="metric-name-input" maxlength="60"
           placeholder="Ex.: Índice de Eficiência de IA"
           class="w-full bg-[#161b22] border border-gray-600 rounded-xl px-4 py-3
                  text-white placeholder-gray-600 focus:border-purple-500
                  focus:outline-none focus:ring-1 focus:ring-purple-500/50">
  </div>

</div>
```

---

### C-07 — Painel de Sliders do Cap. 5 (`#sandbox-controls`)

```html
<div id="sandbox-controls" class="bg-[#161b22] rounded-2xl border border-teal-500/20 p-6 space-y-6">

  <!-- RouteLLM Toggle + Slider SLM -->
  <div>
    <div class="flex items-center justify-between mb-3">
      <label class="font-semibold text-white flex items-center gap-2">
        🔀 Roteamento Semântico (RouteLLM)
      </label>
      <input type="checkbox" id="ctrl-routellm" class="toggle-checkbox" role="switch"
             aria-label="Ativar roteamento semântico">
    </div>
    <div id="slm-ratio-group" class="hidden">
      <div class="flex justify-between text-xs text-gray-400 mb-1">
        <span>Proporção de prompts → SLM</span>
        <span id="ctrl-slm-ratio-pct" class="font-mono text-teal-400">0%</span>
      </div>
      <input type="range" id="ctrl-slm-ratio" min="0" max="100" value="0"
             aria-label="Proporção de prompts roteados para SLM"
             class="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-700
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-gradient-to-r
                    [&::-webkit-slider-thumb]:from-teal-500 [&::-webkit-slider-thumb]:to-blue-600">
    </div>
  </div>

  <!-- RAG Depth -->
  <div>
    <div class="flex justify-between text-sm mb-2">
      <label for="ctrl-rag" class="font-semibold text-white">📚 Profundidade RAG</label>
      <span id="ctrl-rag-label" class="font-mono text-blue-400">Nível 1</span>
    </div>
    <input type="range" id="ctrl-rag" min="1" max="5" value="1" step="1"
           aria-label="Profundidade do RAG de 1 a 5"
           class="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-700">
    <div class="flex justify-between text-xs text-gray-500 mt-1">
      <span>Mínimo (+4% Rm)</span>
      <span>Máximo (+20% Rm, +R$6k/mês)</span>
    </div>
  </div>

  <!-- Test-Time Compute -->
  <div>
    <div class="flex justify-between text-sm mb-2">
      <label for="ctrl-ttc" class="font-semibold text-white">🧠 Test-Time Compute</label>
      <span id="ctrl-ttc-label" class="font-mono text-purple-400">Nível 1</span>
    </div>
    <input type="range" id="ctrl-ttc" min="1" max="5" value="1" step="1"
           aria-label="Test-Time Compute Scaling de 1 a 5"
           class="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-700">
    <div id="ttc-warning" class="hidden mt-2 text-xs text-amber-400 bg-amber-500/10 rounded-lg p-2">
      ⚠️ Nível > 3 com carga simples: risco de "overthinking" (-8% Rm)
    </div>
  </div>

  <!-- RAG Reranking (off | conditional | universal) -->
  <div>
    <label for="ctrl-rerank" class="font-semibold text-white block mb-2">🎯 Reranking Semântico</label>
    <select id="ctrl-rerank" aria-label="Estratégia de reranking semântico"
            class="w-full bg-[#0d1117] border border-gray-600 rounded-lg px-3 py-2 text-sm text-white">
      <option value="off">Desligado</option>
      <option value="conditional">Condicional (só consultas de baixa confiança)</option>
      <option value="universal">Universal (100% — +300ms latência/req)</option>
    </select>
  </div>

  <!-- Cache Semântico -->
  <div class="flex items-center justify-between">
    <label for="ctrl-cache" class="font-semibold text-white flex items-center gap-2">
      🧊 Cache Semântico
      <span class="text-xs text-gray-500 font-normal">(−40% a −70% de custo em chamadas repetidas)</span>
    </label>
    <input type="checkbox" id="ctrl-cache" class="toggle-checkbox" role="switch"
           aria-label="Ativar cache semântico de prompts">
  </div>

  <!-- Tamanho médio de contexto + Context Rot -->
  <div>
    <div class="flex justify-between text-sm mb-2">
      <label for="ctrl-context-tokens" class="font-semibold text-white">🪟 Contexto médio/chamada</label>
      <span id="ctrl-context-label" class="font-mono text-blue-400">8k tokens</span>
    </div>
    <input type="range" id="ctrl-context-tokens" min="4000" max="128000" value="8000" step="4000"
           aria-label="Tamanho médio de contexto por chamada, em tokens"
           class="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-700">
    <div id="context-rot-meter" class="hidden mt-2 text-xs bg-orange-900/30 rounded-lg p-2"
         role="status" aria-live="polite">
      🪟 <span class="text-orange-300 font-semibold">Context Rot</span>:
      <span id="context-rot-value" class="font-mono">−0 p.p.</span> de acurácia efetiva
    </div>
  </div>

  <!-- Orquestração Multiagente + Isolamento -->
  <div class="flex items-center justify-between">
    <label for="ctrl-multiagent" class="font-semibold text-white flex items-center gap-2">
      🤖 Orquestração Multiagente
    </label>
    <input type="checkbox" id="ctrl-multiagent" class="toggle-checkbox" role="switch"
           aria-label="Ativar workflow multiagente">
  </div>
  <div id="agent-isolation-group" class="hidden flex items-center justify-between pl-4">
    <label for="ctrl-agent-isolation" class="text-sm text-gray-300 flex items-center gap-2">
      Isolamento de contexto entre agentes
    </label>
    <input type="checkbox" id="ctrl-agent-isolation" class="toggle-checkbox" role="switch" checked
           aria-label="Ativar isolamento de contexto entre agentes">
  </div>
  <div id="cascade-warning" class="hidden text-xs text-orange-400 bg-orange-500/10 rounded-lg p-2">
    🔥 Multiagente sem isolamento: risco de cascata de erros (contexto reenviado até 62% da fatura).
  </div>

  <!-- Botão Avançar Trimestre -->
  <button id="btn-advance-quarter"
          class="w-full py-3 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl
                 font-bold text-white text-lg hover:shadow-lg hover:shadow-teal-500/20
                 transition-all duration-200 hover:scale-[1.02]">
    Avançar para Q2 →
  </button>

</div>
```

---

### C-08 — Diagrama Sankey em SVG (Cap. 5, `#sankey-chart`)

```html
<div class="bg-[#0d1117] rounded-2xl p-4">
  <h4 class="text-sm font-semibold text-gray-400 mb-3">Fluxo de Custos do TCO</h4>
  <svg id="sankey-chart" width="100%" height="200" viewBox="0 0 600 200"
       role="img" aria-label="Diagrama Sankey mostrando distribuição de custos">
    <!-- Gerado dinamicamente por sankey.js -->
    <!-- Nós: GPU/API, RAG, Observabilidade, Horas Dev → TCO Total -->
  </svg>
  <div id="sankey-legend" class="flex gap-4 mt-2 text-xs text-gray-500 flex-wrap">
    <!-- Legenda gerada por JS -->
  </div>
</div>
```

---

### C-09 — Cena do Conselho (Cap. 6, `#scene-cap6`)

```html
<section id="scene-cap6" class="hidden min-h-screen">

  <!-- Header da cena -->
  <div class="text-center py-12 px-4">
    <p class="text-xs text-amber-400 uppercase tracking-widest mb-2">⚖️ Capítulo 6</p>
    <h1 class="text-4xl font-extrabold mb-4">A Sessão do Conselho de Administração</h1>
    <p class="text-gray-400 max-w-2xl mx-auto">O futuro da divisão de IA e seu cargo dependem desta reunião.</p>
  </div>

  <!-- Barra de confiança do Conselho -->
  <div class="max-w-3xl mx-auto px-4 mb-8">
    <div class="flex justify-between text-sm mb-2">
      <span class="text-gray-400">Confiança do Conselho</span>
      <span id="board-confidence-pct" class="font-mono font-bold text-white">60%</span>
    </div>
    <div class="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
      <div id="board-confidence-bar"
           class="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-yellow-500 to-amber-400"
           style="width: 60%">
      </div>
    </div>
  </div>

  <!-- Área de diálogo ativo -->
  <div id="board-dialog-area" class="max-w-3xl mx-auto px-4 space-y-6">
    <!-- Perguntas geradas dinamicamente por board-engine.js -->
  </div>

  <!-- Side panel de evidências -->
  <div id="evidence-panel" class="
    fixed right-0 top-0 h-full w-72 bg-[#0d1117] border-l border-gray-700
    transform translate-x-full transition-transform duration-300 z-40
    flex flex-col">
    <div class="flex justify-between items-center p-4 border-b border-gray-700">
      <h3 class="font-semibold">🗂 Mural de Evidências</h3>
      <button id="evidence-panel-close" aria-label="Fechar painel de evidências"
              class="text-gray-400 hover:text-white text-xl">×</button>
    </div>
    <div id="evidence-panel-cards" class="flex-1 overflow-y-auto p-3 space-y-2">
      <!-- Cards gerados por evidence-board.js -->
    </div>
  </div>

</section>
```

---

### C-10 — Medidor de Carga de Verificação (`#vcore-gauge`)

**Objetivo:** Exibir o $V_{core}$ (0–100) ao lado das métricas do Gêmeo Digital (Cap. 2 em diante),
tornando visível o custo humano não-linear.

```html
<div id="vcore-gauge" class="bg-[#161b22] rounded-xl border border-gray-700/50 p-4"
     role="group" aria-label="Índice de Carga de Verificação">
  <div class="flex justify-between items-baseline mb-2">
    <span class="text-xs text-gray-500 uppercase tracking-wider">Carga de Verificação (V_core)</span>
    <span id="vcore-value" class="font-mono font-bold text-lg" aria-live="polite">68</span>
  </div>
  <div class="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
    <div id="vcore-bar" class="h-full rounded-full transition-all duration-500"
         style="width: 68%; background: var(--sim-vcore);"></div>
  </div>
  <!-- Tooltip com os 5 sinais -->
  <ul id="vcore-signals" class="mt-3 text-xs text-gray-500 space-y-0.5">
    <li>Falhas de teste/compilação · latência 1ª compilação · churn de código</li>
    <li>Pausas longas · trocas de contexto (confiança cega)</li>
  </ul>
</div>
```

**Comportamento JS:** a cor do `#vcore-bar` segue os limiares do
[07 §3.6](07_direcao_de_arte_design_system.md): verde (<40), âmbar (40–74), rosa/vermelho (≥75).

---

## 3. Mapa de IDs HTML

| ID | Componente | Capítulo |
| :-- | :-- | :-- |
| `#hud` | HUD persistente | Global |
| `#chapter-breadcrumb` | Indicador de progresso | Global |
| `#toast-evidence` | Toast de nova evidência | Global |
| `#event-alert-dialog` | Modal de alerta executivo | Global |
| `#scene-intro` | Tela de introdução | Intro |
| `#invoice-explorer` | Fatura interativa expansível | Cap. 1 |
| `#tco-pie-chart` | Canvas de gráfico de pizza | Cap. 1 |
| `#simulation-bars` | Barras de simulação paralelas | Cap. 2 |
| `#cost-comparison-table` | Tabela de custo real | Cap. 2 |
| `#formula-canvas` | Canvas de montagem de fórmula | Cap. 3 |
| `#metric-name-input` | Input de nomeação do UI/$ | Cap. 3 |
| `#math-block-1` | Bloco Cost-of-Pass | Cap. 4 |
| `#math-block-2` | Bloco TCO Agêntico | Cap. 4 |
| `#quiz-cap4` | Quiz de aplicação matemática | Cap. 4 |
| `#sandbox-controls` | Painel de sliders | Cap. 5 |
| `#ctrl-rerank` | Seletor de reranking (off/conditional/universal) | Cap. 5 |
| `#ctrl-cache` | Toggle de cache semântico | Cap. 5 |
| `#ctrl-context-tokens` | Slider de contexto médio | Cap. 5 |
| `#context-rot-meter` | Medidor de Context Rot (>50k tokens) | Cap. 5 |
| `#ctrl-multiagent` | Toggle multiagente | Cap. 5 |
| `#ctrl-agent-isolation` | Toggle isolamento de contexto | Cap. 5 |
| `#cascade-warning` | Aviso de cascata agêntica | Cap. 5 |
| `#sankey-chart` | Diagrama Sankey SVG | Cap. 5 |
| `#history-chart` | Gráfico histórico Canvas | Cap. 5 |
| `#btn-advance-quarter` | Botão "Avançar trimestre" | Cap. 5 |
| `#vcore-gauge` | Medidor de Carga de Verificação | Cap. 2+ |
| `#board-dialog-area` | Área de perguntas do Board | Cap. 6 |
| `#board-confidence-bar` | Barra de confiança | Cap. 6 |
| `#evidence-panel` | Side panel de evidências | Cap. 6 |
| `#answer-drop-zone` | Zona de drop de evidência | Cap. 6 |
| `#scene-victory` | Tela de vitória | Final |
| `#scene-failure` | Tela de falha | Final |
| `#transfer-case` | Caso de transferência | Pós-vitória |

---

### Referências cruzadas

- Tokens visuais para estilização → [07](07_direcao_de_arte_design_system.md)
- Acessibilidade de cada componente → [09](09_acessibilidade_seo_metricas.md)
- Testes que referenciam estes IDs → [10](10_testes_roadmap_riscos.md)
