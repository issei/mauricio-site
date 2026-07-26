# 07 — Direção de Arte e Design System

> Cobre o entregável **10 (Direção de arte e design system de tokens)**.
> Especificação visual da página — tokens de cor, tipografia, animações e regras de composição.
> Herda a base "Dark Tech" do projeto e define extensões específicas desta página.

---

## 1. Herança da Identidade Visual "Dark Tech"

A página segue integralmente o [STYLE_GUIDE.md](../../STYLE_GUIDE.md) do projeto:

| Role | Valor | Uso |
| :-- | :-- | :-- |
| Background | `#0d1117` | `body` background |
| Secondary BG | `#161b22` | Cards, painel de evidências, HUD |
| Primary text | `#c9d1d9` | Body copy |
| Headings | `#ffffff` | `h1`, `h2`, `h3` |
| Accent Blue | `#007bff` | Botões primários, links, destaques |
| Accent Purple | `#8a2be2` | Gradient secondary |
| Gradient CTA | `linear-gradient(90deg, #007bff, #8a2be2)` | CTAs, sublinhados de seção |

**Fonte:** `Inter` (Google Fonts), pesos 300, 400, 600, 700, 800.
**Fonte de dados/código:** `JetBrains Mono` para fórmulas, valores numéricos do HUD e snippets de equação.

---

## 2. Tokens de Cor Adicionais (específicos desta página)

Definidos como variáveis CSS dentro de `<style>` da própria página:

```css
:root {
  /* Tokens do simulador */
  --sim-teal:    #0d9488;  /* Acento Capital Cognitivo / UI/$ positivo */
  --sim-amber:   #d97706;  /* Alerta / Débito Técnico / Warning */
  --sim-red:     #dc2626;  /* Falha de SLA / Game Over */
  --sim-green:   #22c55e;  /* Vitória / SLA OK / Evidence Level A */
  --sim-orange:  #f97316;  /* Eventos críticos / Level D */

  /* HUD */
  --hud-bg:      rgba(22, 27, 34, 0.95);
  --hud-border:  rgba(0, 123, 255, 0.3);

  /* Evidence Cards por nível */
  --ev-level-a:  #22c55e;  /* Level A — verde */
  --ev-level-b:  #3b82f6;  /* Level B — azul */
  --ev-level-c:  #eab308;  /* Level C — amarelo */
  --ev-level-d:  #f97316;  /* Level D — laranja */

  /* Indicadores de conceito v4.1 */
  --sim-vcore:      #e11d48;  /* Carga de Verificação (V_core) — rosa/vermelho de fadiga */
  --sim-vcore-ok:   #10b981;  /* V_core baixo (saudável) */
  --sim-rot:        #b45309;  /* Context Rot — âmbar escuro de degradação */
  --sim-cascade:    #ea580c;  /* Cascata agêntica / re-sent context */
  --ev-humanfactors: #e11d48; /* Badge da categoria HumanFactors (HUM) */
}
```

---

## 3. Componentes Visuais e Regras de Composição

### 3.1 HUD Persistente

```
Background: var(--hud-bg) com backdrop-filter: blur(12px)
Border bottom: 1px solid var(--hud-border)
Box shadow: 0 4px 20px rgba(0, 123, 255, 0.08)
Posição: sticky top-0 z-50
```

- **Valores numéricos:** `JetBrains Mono`, peso 700, tamanho `text-lg`.
- **Labels:** `Inter`, `text-xs text-gray-400 uppercase tracking-widest`.
- **Barras de progresso:** `<progress>` estilizado com Tailwind `[&::-webkit-progress-value]:bg-...`.

### 3.2 Evidence Cards

```
Container:    bg-[#161b22] border border-gray-700/50 rounded-xl p-4
Hover:        border-blue-500/50, transform translateY(-2px), box-shadow azul-glow
Badge Nível:  rounded-full px-2 py-0.5 text-xs font-bold, cor por var(--ev-level-*)
Ícone:        text-2xl (emoji) ou SVG inline
```

**Estado bloqueado:**
```
opacity: 0.4, filter: grayscale(100%), cursor: not-allowed
Badge "BLOQUEADO" substituindo badge de nível
```

**Animação de desbloqueio:**
```
keyframes: scale 0.3s ease-out → 1.05 → 1.0
border-color: flash var(--sim-green) por 2s
```

### 3.3 Diálogo de Conselheiro (Cap. 6)

```
Layout:       flex items-start gap-4
Avatar:       w-16 h-16 rounded-full, border 2px solid accent color por stakeholder
Balão fala:   bg-[#1c2128] rounded-2xl rounded-tl-none p-4 max-w-prose
Nome:         text-sm font-bold cor do stakeholder
```

**Cores por Stakeholder:**
| Stakeholder | Cor da borda do avatar | Cor do nome |
| :-- | :-- | :-- |
| Helena (CFO) | `#f59e0b` (âmbar) | `text-amber-400` |
| Dr. Aris (CTO) | `#3b82f6` (azul) | `text-blue-400` |
| Sarah (VP Ops) | `#a78bfa` (roxo claro) | `text-violet-400` |
| Marcus (CRO) | `#ef4444` (vermelho) | `text-red-400` |
| Clara (CX) | `#34d399` (verde) | `text-emerald-400` |

### 3.4 Sliders do Cap. 5

```html
<input type="range" class="
  w-full h-2 rounded-full appearance-none cursor-pointer
  bg-gray-700
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:w-5
  [&::-webkit-slider-thumb]:h-5
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-gradient-to-r
  [&::-webkit-slider-thumb]:from-blue-500
  [&::-webkit-slider-thumb]:to-purple-600
  [&::-webkit-slider-thumb]:shadow-lg
  [&::-webkit-slider-thumb]:shadow-blue-500/30
">
```

### 3.5 Botões

**Primário (CTA):**
```
bg-gradient-to-r from-[#007bff] to-[#8a2be2]
text-white font-semibold py-3 px-6 rounded-xl
hover: shadow-lg shadow-blue-500/30, scale-105
transition: all 200ms ease
```

**Secundário:**
```
bg-transparent border border-gray-600
text-gray-300 font-medium py-2 px-5 rounded-lg
hover: border-blue-500/60 text-white
```

**Desabilitado (resposta sem evidência):**
```
opacity: 0.4 cursor-not-allowed
tooltip: "Selecione uma evidência do Mural antes de confirmar"
```

### 3.6 Indicadores de Conceito v4.1 (V_core, Context Rot, Cascata)

**Medidor de Carga de Verificação (V_core):** gauge semicircular ou barra segmentada 0–100.
```
0–39   → var(--sim-vcore-ok)  (verde, "saudável")
40–74  → var(--sim-amber)     (âmbar, "atenção")
75–100 → var(--sim-vcore)     (rosa/vermelho, "fadiga crítica")
Label: "V_core" em JetBrains Mono; tooltip lista os 5 sinais componentes.
```

**Medidor de Context Rot:** aparece apenas quando `avgContextTokens > 50_000`.
```
Barra que cresce de var(--sim-rot) a var(--sim-red) conforme a penalidade (0 → 15 p.p.).
Ícone 🪟 + texto "Context Rot: −X p.p. de acurácia efetiva".
Estado oculto (≤ 50k): não renderizar (evita ruído visual).
```

**Fluxo de Cascata no Sankey:** a aresta `resentContextCost` usa `var(--sim-cascade)` com
`stroke-dasharray` animado (fluxo pulsante) quando `multiAgent && !agentIsolation`, sinalizando
custo "vazando" por contexto reenviado.

---

## 4. Animações e Micro-interações

| Elemento | Animação | Duração | Trigger |
| :-- | :-- | :-- | :-- |
| HUD — valor numérico muda | Counter roll (incremento/decremento suave) | 600ms | `stepQuarter()` |
| Evidence Card desbloqueado | Scale ping + border glow verde | 300ms → 2s | `unlock()` |
| Toast de novo card | Slide in bottom-right | 300ms | `unlock()` |
| Gráfico de pizza (Cap. 1) | `arc()` progressivo, sentido horário | 1.2s | Revelação da fatura |
| Barras de simulação (Cap. 2) | Fill gradual com easing | 800ms | Botão "Executar" |
| Canvas de fórmula (Cap. 3) | Blocos se encaixam com `bounce` | 200ms/bloco | Drop |
| Sankey (Cap. 5) | Redraw com interpolação linear | 500ms | Slider change |
| Linha histórica (Cap. 5) | Grow progressivo da esquerda | 400ms | Novo trimestre |
| Avatar do conselheiro entra | Slide + fade in | 400ms | Nova pergunta |
| Barra de confiança do Board | Fill gradual | 500ms | Avaliação de resposta |
| Vitória | Confetti + scale explosion | 1s | `VICTORY` |
| Falha | Shake + red flash | 600ms | `FAILURE_*` |

> **Regra de ouro de animações:** toda animação deve ser desativável via `prefers-reduced-motion`.
> Usar `@media (prefers-reduced-motion: reduce)` para definir duração 0ms ou transição instantânea.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 5. Wireframe Visual do Layout Geral

```
┌──────────────────────────────────────────────────────────────────────────┐
│ HUD PERSISTENTE (sticky)                                                 │
│ Q3 | CAIXA: R$ 620.000 | UI/$: 7,82 | CAPITAL COG: 82 | ████████░░ 82%  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ [BREADCRUMB] ✓ Cap1 ✓ Cap2 ✓ Cap3 ✓ Cap4 ● Cap5 ○ Cap6                  │
│                                                                          │
├──────────────────────┬───────────────────────────────────────────────────┤
│ PAINEL ESQUERDO      │ ÁREA PRINCIPAL (conteúdo do capítulo atual)       │
│ (Evidence Board)     │                                                   │
│                      │  Cap 5 — Laboratório "E Se?"                     │
│ [EVID_01] ✓          │  ┌──────────────────────────────────────────────┐ │
│ [EVID_02] ✓          │  │ RouteLLM:   [════════|══] 65%               │ │
│ [EVID_03] ✓          │  │ RAG Depth:  [══|══════════] Nível 2          │ │
│ [EVID_04] ✓          │  │ TTC Level:  [════|══════] Nível 3            │ │
│ [EVID_05] ✓          │  └──────────────────────────────────────────────┘ │
│ [EVID_06] ✓          │                                                   │
│ [EVID_07] ○ (locked) │  [DIAGRAMA SANKEY]   [GRÁFICO HISTÓRICO]         │
│                      │                                                   │
│                      │  [AVANÇAR PARA Q4 →]                              │
└──────────────────────┴───────────────────────────────────────────────────┘
```

**Responsividade mobile (< 768px):**
- Layout converte para uma única coluna.
- Evidence Board colapsa em botão "🗂 Evidências (5/7)" que abre como sheet bottom.
- Sliders ocupam largura total.
- HUD colapsa para mostrar apenas Caixa e UI/$.

---

## 6. Identidade Visual dos Capítulos

| Capítulo | Cor de acento de seção | Ícone |
| :-- | :-- | :-- |
| Cap. 1 — O Mistério | `#f59e0b` (âmbar) | 🔍 |
| Cap. 2 — A Armadilha | `#ef4444` (vermelho) | ⚠️ |
| Cap. 3 — A Invenção | `#8a2be2` (roxo) | 💡 |
| Cap. 4 — Formalização | `#3b82f6` (azul) | 📐 |
| Cap. 5 — Laboratório | `#0d9488` (teal) | 🧪 |
| Cap. 6 — O Conselho | `#f59e0b`→`#ef4444` (gradiente tensão) | ⚖️ |

---

### Referências cruzadas

- Componentes HTML concretos → [08](08_wireframes_catalogo_componentes.md)
- Acessibilidade das animações → [09](09_acessibilidade_seo_metricas.md)
