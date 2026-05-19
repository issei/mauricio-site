# ATMOSPHERIC UI SYSTEM — PRODUCTION SPECIFICATION
## devin.html
### Versão 1.0 · Documento Técnico Interno · Uso exclusivo Claude Code

---

> **Escopo deste documento:** Especificação técnica completa para edição, manutenção e evolução do site `devin.html`. Cobre sistema de background atmosférico, tokens de design, arquitetura de componentes, semântica de seções e protocolos de qualidade. Nenhuma alteração deve ser feita sem conformidade com este documento.

---

## 1. VISION DE EXPERIÊNCIA

### 1.1 Intenção Emocional

O site `devin.html` é uma página de captura de alta conversão para um produto técnico de elite — posicionado para engenheiros sêniores, arquitetos de software e CTOs. O fundo atmosférico deve comunicar **inteligência calma**, não excitação. A emoção alvo é similar à de entrar em uma sala de guerra de uma empresa de tecnologia de ponta: fria, controlada, profunda.

O sistema de background não deve ser percebido conscientemente pelo visitante. Ele deve operar no limiar da percepção — criando sensação de **profundidade material** sem jamais competir com o conteúdo textual que é o elemento de conversão central.

### 1.2 Metas Perceptuais

| Dimensão | Meta |
|---|---|
| Profundidade | O visitante deve perceber camadas atmosféricas, não uma cor plana |
| Movimento | Respiração biológica lenta — 0,03–0,08 Hz máximo |
| Luminância | Nunca acima de 12% de luminância relativa em nenhum ponto do fundo |
| Atenção | 100% do foco deve residir na tipografia e nos CTAs |
| Sofisticação | Equiparável a material de apresentação de Series B/C |

### 1.3 Filosofia Atmosférica

O background funciona como **luz ambiente de estúdio cinematográfico**: presente, rica em nuança, mas invisível para a consciência do observador focado no assunto. A metáfora operacional é a iluminação de bastidores de um teatro de ópera — absolutamente calculada, jamais aleatória.

A paleta existente do site — azul marinho profundo `#0a0e1a` a `#0d1530`, com acento cobre-âmbar `#c45a10` — determina o vocabulário cromático do sistema atmosférico. **Nenhuma cor externa a este vocabulário deve ser introduzida no sistema de background.**

### 1.4 Posicionamento Institucional

O produto (Devin + Vibe Coding) é posicionado como ferramenta de aceleração cognitiva para engenheiros. O design deve refletir:
- **Seriedade técnica** — não leveza de produto consumer
- **Maturidade operacional** — não entusiasmo de startup
- **Confiança estrutural** — não dramatismo visual

### 1.5 Referências Cinematográficas Permitidas (Espírito, Não Mimicria)

- Estética de sala de controle de missão NASA
- Interface de monitoramento financeiro de alta frequência
- Interiores de data center premium fotografados por cinematógrafos
- Abertura de Interstellar (2014) — gradiente de luminosidade controlada
- Design de produto Apple Pro — silêncio visual com profundidade material

### 1.6 Princípios de Silêncio Visual

1. Cada elemento de background deve justificar sua existência por contraste perceptual — não por efeito estético autônomo
2. O sistema deve funcionar com 40% de opacidade reduzida sem perda de qualidade percebida
3. Nenhum frame do sistema em movimento deve parecer mais interessante que o texto sobreposto
4. A remoção de qualquer camada individual não deve causar colapso perceptual — cada camada é suporte, não protagonismo

---

## 2. BENCHMARKING ESTÉTICO

### 2.1 Referências de Ambiente UI Contemporâneo

As referências abaixo são citadas para calibração de espírito e parâmetros perceptuais. **Qualquer mimicria direta, clonagem visual ou reprodução reconhecível é estritamente proibida.**

| Sistema | Elemento de Referência | Aplicação no Devin |
|---|---|---|
| Google Gemini Ambient (2026) | Difusão espectral suave em dark mode | Intensidade máxima 30% da referência |
| Apple Intelligence UI | Silêncio material + profundidade de camadas | Princípio de hierarquia óptica |
| Anthropic Claude.ai | Vinheta azul profundo + contenção de brilho | Saturação máxima análoga |
| Linear.app Dark | Tipografia como protagonista absoluto | Subordinação total do fundo |
| Arc Browser | Gradiente periférico + zona central limpa | Composição espacial |

### 2.2 O Que Distingue Este Sistema

O sistema atmosférico do `devin.html` **não é** um gradiente animado genérico. É um **sistema de iluminação volumétrica simulada** construído exclusivamente em CSS/HTML/JS. Sua distinção está na:

1. Assimetria diagonal calculada das fontes de luz
2. Contenção estrita de luminância por zona
3. Ciclos de movimento assíncronos imperceptíveis individualmente
4. Integração semântica com o scroll da página

### 2.3 Proibições Absolutas de Referência Visual

- Qualquer fundo que pareça com mesh gradient do Figma
- Qualquer fundo que seja identificável como "Aurora Borealis CSS"
- Qualquer fundo que pareça template de landing page SaaS 2022–2024
- Qualquer fundo que provoque associação com gaming, cyberpunk ou neon
- Qualquer fundo que pareça animação gerada por IA de stock

---

## 3. PRINCÍPIOS DE DESIGN PERCEPTUAL

### 3.1 Hierarquia Óptica

O sistema segue uma hierarquia de três camadas perceptuais:

```
CAMADA 1 (Foreground)  → Tipografia, CTAs, Imagens: 100% atenção
CAMADA 2 (Midground)   → Separadores, divisores, linha de crédito: 30% atenção
CAMADA 3 (Background)  → Sistema atmosférico: 0–5% atenção consciente
```

Qualquer elemento do sistema atmosférico que capture mais de 5% da atenção consciente em testes de usuário deve ser atenuado até o limiar.

### 3.2 Contenção de Luminância

| Zona | Luminância Máxima Relativa | Nota |
|---|---|---|
| Centro do viewport | 4% | Zona de leitura — proteção absoluta |
| Periférico (25% das bordas) | 10% | Difusão permitida |
| Cantos | 14% | Permitido para iluminação de borda |
| Off-screen (fonte de luz) | N/A | Origem das fontes de luz simuladas |

### 3.3 Densidade Perceptual

- **Densificação proibida:** Nunca mais de 2 fontes de luz ativas simultaneamente no mesmo quadrante visual
- **Esparsidade cromática:** No máximo 2 matizes distintos ativos no viewport em qualquer momento
- **Regra dos 20%:** No máximo 20% da área do viewport deve ter luminância perceptível acima do fundo base

### 3.4 Comportamento de Saturação

```
Saturação máxima absoluta: HSL(_, 40%, _)
Saturação máxima em zona central: HSL(_, 20%, _)
Saturação mínima aceitável: HSL(_, 8%, _)
Saturação do acento âmbar no fundo: HSL(30°, 35%, 8%) — extremamente contido
```

### 3.5 Respiração Óptica

O sistema deve simular respiração atmosférica com os seguintes parâmetros:

| Parâmetro | Valor |
|---|---|
| Ciclo de respiração primária | 18–24 segundos |
| Ciclo de respiração secundária | 31–47 segundos (assíncrono) |
| Amplitude de expansão | Máximo 8% de deslocamento de opacidade |
| Curva de easing | `cubic-bezier(0.37, 0, 0.63, 1)` — sinusoidal suave |
| Frequência de inversão | Nunca — sem reversões abruptas |

---

## 4. SISTEMA DE COMPOSIÇÃO ESPACIAL

### 4.1 Mapa de Zonas do Viewport

```
┌─────────────────────────────────────────────────┐
│ ZONA PERIFÉRICA SUPERIOR (10% altura)            │
│ ┌─────────────────────────────────────────────┐ │
│ │                                             │ │
│ │         ZONA SEGURA CENTRAL                 │ │
│ │         (80% largura × 85% altura)          │ │
│ │         Luminância máx: 4%                  │ │
│ │         Nenhuma fonte de luz direta          │ │
│ │                                             │ │
│ └─────────────────────────────────────────────┘ │
│ ZONA PERIFÉRICA INFERIOR (5% altura)             │
└─────────────────────────────────────────────────┘
  ↑ BORDA ESQ     ↑ BORDA DIR
  10% largura     10% largura
  Difusão permitida
```

### 4.2 Posicionamento das Fontes de Luz Atmosférica

O sistema opera com **fontes de luz off-screen ou periféricas**. As fontes de luz nunca residem dentro da zona segura central.

**Posições canônicas das fontes de luz:**

| Fonte | Posição | Cor | Propósito |
|---|---|---|---|
| L1 — Âncora Primária | Superior esquerdo (-15%, -10%) | Azul cobalto `hsl(215, 35%, 15%)` | Peso visual dominante |
| L2 — Difusão Diagonal | Inferior direito (110%, 105%) | Azul marinho `hsl(225, 30%, 12%)` | Contrapeso compositivo |
| L3 — Acento Âmbar | Lateral direito (105%, 40%) | Âmbar `hsl(28, 30%, 10%)` | Identidade cromática do produto |
| L4 — Vinheta Base | Centro (50%, 50%) | Preto transparente | Aprofundamento de zona central |

### 4.3 Composições Proibidas

- ❌ Fonte de luz centrada no viewport
- ❌ Duas fontes de luz do mesmo matiz no mesmo eixo horizontal
- ❌ Gradiente radial com centro visível como "ponto quente"
- ❌ Faixa horizontal contínua de luminância elevada
- ❌ Gradiente que coincida com o eixo central vertical da tipografia
- ❌ Qualquer forma geométrica reconhecível (círculo, ellipse bem definida)

### 4.4 Assimetria Estrutural

A composição deve ser permanentemente assimétrica. A regra de ouro é:

- Peso visual esquerdo: 55–65%
- Peso visual direito: 35–45%
- Peso visual superior: 50–60%
- Peso visual inferior: 40–50%

Isso cria tensão compositiva inconsciente que direciona o olhar para baixo (scroll) e para a direita (CTAs).

---

## 5. ARQUITETURA DE ORQUESTRAÇÃO DE CAMADAS

### 5.1 Hierarquia Completa de Renderização

```
z-index: -10  → [BASE]      Cor sólida base do documento
z-index: -9   → [AMBIENT]   Campo ambiente primário (gradiente estático de base)
z-index: -8   → [LIGHT-L1]  Fonte de luz âncora — difusão primária
z-index: -7   → [LIGHT-L2]  Fonte de luz contraponto — difusão secundária
z-index: -6   → [LIGHT-L3]  Acento âmbar — identidade cromática
z-index: -5   → [DIFFUSE]   Difusão cromática secundária — blend mode
z-index: -4   → [NOISE]     Camada de ruído granular (opcional, textura)
z-index: -3   → [VIGNETTE]  Sistema de vinheta — contenção central
z-index: -2   → [MASK]      Máscara de atenuação óptica
z-index: -1   → [OVERLAY]   Overlay de proteção de leitura (extremamente sutil)
z-index: 0+   → [CONTENT]   Todo o conteúdo da página
```

### 5.2 Especificação de Cada Camada

#### CAMADA BASE (`z-index: -10`)
- **Papel perceptual:** Fundação cromática absoluta. Âncora de identidade visual.
- **Papel de profundidade:** Plano mais recuado — infinito visual
- **Papel de luminância:** Luminância mínima absoluta do sistema
- **Comportamento cromático:** Sólido `#080c18` — azul marinho quase-preto
- **Custo GPU:** Zero — propriedade `background-color` pura
- **Animação:** Nenhuma

#### CAMADA AMBIENT (`z-index: -9`)
- **Papel perceptual:** Estabelece a atmosfera base do documento antes de qualquer iluminação
- **Papel de profundidade:** Define o "espaço" — como o fundo de uma câmera escura
- **Papel de luminância:** Gradiente linear sutil de 3% de delta de luminância
- **Comportamento cromático:** `hsl(220, 30%, 6%)` → `hsl(225, 25%, 4%)` — variação mínima
- **Custo GPU:** Baixo — gradiente linear fixo
- **Animação:** Nenhuma — esta camada é âncora estática

#### CAMADA LIGHT-L1 (`z-index: -8`)
- **Papel perceptual:** Fonte de luz atmosférica dominante — cria sensação de espaço tridimensional
- **Papel de profundidade:** Simula iluminação volumétrica vinda do quadrante superior esquerdo
- **Papel de luminância:** Pico de 10–12% na borda superior esquerda, decaindo para 0% na zona central
- **Comportamento cromático:** `radial-gradient` com centro off-screen, azul cobalto profundo
- **CSS:** `background: radial-gradient(ellipse 80% 60% at -15% -10%, hsl(215, 40%, 18%) 0%, transparent 70%)`
- **Custo GPU:** Médio — gradiente radial com blend mode
- **Animação:** Respiração 20s, amplitude ±4% opacidade

#### CAMADA LIGHT-L2 (`z-index: -7`)
- **Papel perceptual:** Contraponto compositivo — equilíbrio diagonal
- **Papel de profundidade:** Luz de preenchimento — evita que o quadrante inferior direito colapse em preto uniforme
- **Papel de luminância:** Pico de 8% no canto inferior direito
- **Comportamento cromático:** Azul mais frio — `hsl(230, 35%, 14%)`
- **CSS:** `background: radial-gradient(ellipse 70% 50% at 110% 110%, hsl(230, 35%, 14%) 0%, transparent 65%)`
- **Custo GPU:** Médio
- **Animação:** Respiração 31s (assíncrona com L1), amplitude ±3% opacidade

#### CAMADA LIGHT-L3 (`z-index: -6`)
- **Papel perceptual:** Identidade cromática do produto — introduz o acento âmbar de forma atmosférica
- **Papel de profundidade:** Luz lateral — simula fonte de luz quente distante à direita
- **Papel de luminância:** Máximo 6% na borda direita, zero antes dos 15% centrais
- **Comportamento cromático:** `hsl(28, 45%, 12%)` — âmbar extremamente dessaturado e escuro
- **CSS:** `background: radial-gradient(ellipse 50% 80% at 108% 38%, hsl(28, 45%, 12%) 0%, transparent 60%)`
- **Custo GPU:** Baixo-médio
- **Animação:** Ciclo 47s, muito sutil — amplitude ±2% opacidade

#### CAMADA DIFFUSE (`z-index: -5`)
- **Papel perceptual:** Suaviza as transições entre fontes de luz — evita bordas duras de gradiente
- **Papel de profundidade:** Cria impressão de difusão atmosférica
- **Comportamento cromático:** `mix-blend-mode: screen` com opacidade 0.04–0.06
- **CSS técnico:** Div `position: fixed`, gradiente cônico suave, blend mode screen
- **Custo GPU:** Alto — blend mode ativo. **Deve ser desabilitado em dispositivos com `prefers-reduced-motion: reduce`**
- **Animação:** Nenhuma — a difusão é estática; o movimento vem das camadas subjacentes

#### CAMADA NOISE (`z-index: -4`)
- **Papel perceptual:** Adiciona textura granular imperceptível — evita banding em gradientes em painéis TN e OLED
- **Implementação:** SVG `<feTurbulence>` inline ou imagem PNG de ruído 200×200px tileable em 3% de opacidade
- **Comportamento cromático:** Monocromático — apenas luminância, sem adição de cor
- **Opacidade:** 0.02–0.04 — abaixo do limiar de percepção consciente em iluminação normal
- **Custo GPU:** Baixo se usada imagem PNG; médio se SVG filter
- **Animação:** Nenhuma — ruído estático é suficiente

#### CAMADA VIGNETTE (`z-index: -3`)
- **Papel perceptual:** Reforça a zona central de leitura — escurece as bordas para concentrar atenção
- **Papel de profundidade:** Cria a ilusão de maior profundidade óptica no centro
- **CSS:** `background: radial-gradient(ellipse 70% 85% at 50% 50%, transparent 40%, rgba(4, 6, 14, 0.7) 100%)`
- **Custo GPU:** Baixo
- **Animação:** Nenhuma — a vinheta é estrutural, não dinâmica

#### CAMADA MASK (`z-index: -2`)
- **Papel perceptual:** Atenuação final — garante que nenhuma camada anterior exceda os limites de luminância
- **Implementação:** `background: rgba(8, 12, 24, 0.15)` fixo
- **Custo GPU:** Zero
- **Animação:** Nenhuma

#### CAMADA OVERLAY (`z-index: -1`)
- **Papel perceptual:** Proteção de leitura — garante contraste mínimo WCAG entre fundo e texto
- **Implementação:** `background: rgba(6, 10, 20, 0.08)` — quase invisível, mas operacional
- **Custo GPU:** Zero
- **Animação:** Transições semânticas de scroll (ver Seção 8)

---

## 6. ENGENHARIA DE PIPELINE DE RENDERIZAÇÃO

### 6.1 Fluxo de Renderização

```
HTML Parse
    ↓
CSS Apply (camadas BASE + AMBIENT — zero JS necessário)
    ↓
DOM Ready
    ↓
JS: Verificar preferências do usuário (prefers-reduced-motion, battery status)
    ↓
JS: Verificar capacidade de dispositivo (navigator.deviceMemory, hardware concurrency)
    ↓
JS: Aplicar nível de enhancement (FULL / REDUCED / MINIMAL / STATIC)
    ↓
CSS Animations Start (somente se FULL ou REDUCED)
    ↓
IntersectionObserver: Monitorar seções semânticas
    ↓
Scroll Handler: Interpolação de estados semânticos
    ↓
(Contínuo) Animation Loop: Apenas transforms e opacity
```

### 6.2 Governança de GPU

**Regra absoluta:** Nenhuma propriedade fora do conjunto `{transform, opacity}` deve ser animada via JavaScript. Animações CSS podem usar adicionalmente `filter: blur()` somente em camadas com `will-change: filter` declarado.

```css
/* Permitido — compositing layer dedicado */
.atm-layer {
  will-change: opacity, transform;
  transform: translateZ(0); /* Força compositing layer */
  backface-visibility: hidden; /* Otimização mobile */
}

/* Proibido em animações */
/* background-position, background-size, width, height, top, left */
```

### 6.3 Limites de Rasterização

| Métrica | Limite Máximo |
|---|---|
| Camadas com `will-change` simultâneas | 4 |
| Gradientes radiais simultâneos | 4 |
| Elementos com `mix-blend-mode` | 1 (somente DIFFUSE) |
| `filter: blur()` simultâneos | 2 |
| FPS mínimo aceitável | 55fps (mobile: 28fps) |

### 6.4 Estratégia de Blur

Blur em CSS (`filter: blur()`) é operação cara em GPU. Regras:

- Nunca usar em elementos que se movem (combinação blur + transform é cara)
- Usar exclusivamente em camadas estáticas para simular desfoque atmosférico
- Valor máximo: `blur(120px)` — valores maiores não produzem resultado perceptual adicional e aumentam custo quadraticamente
- Em mobile: reduzir para `blur(60px)` ou remover

### 6.5 Blend Mode Safety

`mix-blend-mode: screen` na camada DIFFUSE é o único blend mode permitido. Razões:

- `screen` é o blend mode com menor custo de renderização
- `screen` não produz artefatos em fundos escuros
- `multiply`, `overlay`, `hard-light` são proibidos — comportamento inconsistente entre browsers e alto custo

### 6.6 Considerações OLED

Painéis OLED renderizam preto absoluto (`#000000`) como pixel desligado. O fundo base `#080c18` é deliberadamente **não-preto** para:
1. Evitar halos de glow em textos brancos sobre preto absoluto
2. Manter gradientes suaves visíveis (OLED comprime a faixa escura)
3. Preservar a percepção de profundidade na faixa sub-10% de luminância

**Nunca usar `#000000` ou `#000` como cor de fundo** — sempre `#080c18` ou mais claro.

### 6.7 Prevenção de Banding (Painéis TN)

Painéis TN de 6-bit exibem banding visível em gradientes suaves. A camada NOISE com 2–3% de opacidade previne este artefato por dithering perceptual. Esta camada **nunca deve ser removida** em projetos com público corporativo (alto índice de monitores TN em ambiente office).

### 6.8 Resiliência Cross-Browser

| Feature | Chrome | Firefox | Safari |
|---|---|---|---|
| `mix-blend-mode` | ✅ Nativo | ✅ Nativo | ⚠️ Bug em scroll em iOS |
| `will-change` | ✅ | ✅ | ✅ |
| `@keyframes` em background | ❌ Proibido | ❌ Proibido | ❌ Proibido |
| `CSS Custom Properties em animações` | ✅ | ✅ | ⚠️ Verificar versão |

**Protocolo Safari iOS:** Desabilitar `mix-blend-mode` via feature detection. Fallback: opacidade direta sem blend.

```javascript
// Detecção de bug Safari iOS com mix-blend-mode em scroll
const isSafariIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (isSafariIOS) {
  document.documentElement.classList.add('atm--no-blend');
}
```

---

## 7. ARQUITETURA DO SISTEMA DE MOVIMENTO

### 7.1 Filosofia de Movimento Atmosférico

O movimento neste sistema não é decorativo — é **simulação de fenômeno físico**. Especificamente, simula a lenta convecção térmica de massas de ar em uma câmara pressurizada. Este referencial físico governa todas as decisões de timing, easing e amplitude.

**Nenhum movimento deve ser percebido como "animação"** — apenas como a sensação de que o ambiente respira.

### 7.2 Parâmetros de Temporização

```
Ciclo primário (L1):    20s — sin(t/20π)
Ciclo secundário (L2):  31s — sin(t/31π) [número primo — nunca sincroniza com L1]
Ciclo terciário (L3):   47s — sin(t/47π) [número primo — nunca sincroniza com L1 ou L2]
Ciclo quaternário:      67s (reservado para uso futuro)
```

O uso de números primos como base de período **garante que os ciclos nunca se alinhem perfeitamente** — eliminando o loop perceptível.

### 7.3 Curvas de Interpolação

Todas as animações atmosféricas usam exclusivamente:

```css
/* Curva sinusoidal suave — simula inércia física */
animation-timing-function: cubic-bezier(0.37, 0, 0.63, 1);

/* Para transições semânticas entre seções */
transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

**Proibido:** `ease-in-out` padrão do CSS (curva muito simétrica, parece mecânica), `linear` (sem inércia), `bounce` (completamente proibido), `spring` (proibido).

### 7.4 Simulação de Inércia

Transições de estado semântico (ex: Hero → Problem) não são instantâneas. Usam inércia simulada:

```javascript
// Pseudo-código do sistema de inércia semântica
let currentState = lerp(currentState, targetState, 0.03); // 3% de convergência por frame
// Em 60fps: ~2 segundos para atingir 95% do alvo
```

### 7.5 Comportamentos de Movimento Proibidos

- ❌ Qualquer animação que complete um ciclo visível em menos de 15 segundos
- ❌ Movimento linear em qualquer eixo (sempre deve ter aceleração/desaceleração)
- ❌ Animações que criem percepção de "pulsação" ou "batimento cardíaco"
- ❌ Zoom ou scale de qualquer elemento atmosférico
- ❌ Rotação de qualquer elemento
- ❌ Qualquer movimento horizontal que crie percepção de "fluxo" ou "corrente"
- ❌ Dois elementos com a mesma velocidade e direção (cria percepção de peça rígida)
- ❌ Qualquer animação que pause visivelmente (iteration-count: infinite sem seamless loop)

### 7.6 Anti-Loop Strategy

O sistema evita percepção de loop através de três mecanismos:

1. **Números primos como períodos** — ciclos nunca se alinham
2. **Drift randômico** — pequeno offset aleatório adicionado na inicialização: `Math.random() * period`
3. **Amplitude modulation** — a amplitude varia lentamente em um quarto ciclo adicional (89s)

```javascript
// Inicialização com drift anti-loop
const initAtmosphericCycles = () => {
  const drift = {
    l1: Math.random() * 20000,
    l2: Math.random() * 31000,
    l3: Math.random() * 47000,
  };
  // Aplicar como animation-delay negativo
  document.getElementById('atm-l1').style.animationDelay = `-${drift.l1}ms`;
  document.getElementById('atm-l2').style.animationDelay = `-${drift.l2}ms`;
  document.getElementById('atm-l3').style.animationDelay = `-${drift.l3}ms`;
};
```

---

## 8. ENGINE DE ESTADOS SEMÂNTICOS

### 8.1 Mapeamento de Seções

O `devin.html` possui as seguintes seções semânticas identificadas:

| ID | Seção | Âncora CSS | Estado Atmosférico |
|---|---|---|---|
| S1 | Hero / Abertura | `.section-hero` ou primeiro bloco | `STATE_HERO` |
| S2 | Autoridade / Apresentação (Mauricio) | Bloco de autor | `STATE_AUTHORITY` |
| S3 | Tensão / Problema | Bloco de dores ("Quantos de vocês...") | `STATE_TENSION` |
| S4 | Prova Social / Features | Cards de capacidades | `STATE_PROOF` |
| S5 | Manifesto / Visão ("É pensar melhor") | Bloco do manifesto | `STATE_VISION` |
| S6 | Conteúdo Técnico / Corpo | Texto extenso | `STATE_CONTENT` |
| S7 | CTA Final / Conversão | Área de botões | `STATE_CONVERSION` |
| S8 | Footer / Encerramento | Footer + bottom bar | `STATE_CLOSE` |

### 8.2 Especificação Detalhada por Estado

#### STATE_HERO
- **Intenção emocional:** Captura imediata — o visitante deve sentir que entrou em algo premium
- **Densidade óptica:** Máxima do sistema — maior presença atmosférica
- **Distribuição de cor:** L1 dominante (azul cobalto) 70%, L3 acento âmbar 20%, L2 10%
- **Energia de movimento:** Respiração normal — 20s/31s/47s
- **Comportamento atmosférico:** Campo ambiente ativo, vinheta suave

#### STATE_AUTHORITY
- **Intenção emocional:** Confiança, credibilidade, serenidade profissional
- **Densidade óptica:** Redução de 15% — deixar o rosto/nome respirar
- **Distribuição de cor:** L1 recua para 55%, L2 avança para 25%
- **Energia de movimento:** Estabilização — amplitude reduzida em 25%
- **Comportamento atmosférico:** Menor contraste de luz — mais uniforme

#### STATE_TENSION
- **Intenção emocional:** Desconforto controlado, reconhecimento de dor — "esse problema é seu"
- **Densidade óptica:** Redução adicional — espaço para o texto pesado
- **Distribuição de cor:** Azul escurece 10%, âmbar recua completamente (L3: 5%)
- **Energia de movimento:** Desaceleração — ciclos 30% mais lentos (var CSS)
- **Comportamento atmosférico:** Mais frio, mais contido — como noite de inverno

#### STATE_PROOF
- **Intenção emocional:** Clareza, ordem, competência técnica demonstrada
- **Densidade óptica:** Aumenta levemente para separar os cards do fundo
- **Distribuição de cor:** Equilíbrio L1/L2, L3 âmbar retorna sutilmente
- **Energia de movimento:** Normalização — retorno aos parâmetros base
- **Comportamento atmosférico:** Mais equilibrado, menos dramático

#### STATE_VISION
- **Intenção emocional:** Elevação emocional — o momento de convicção máxima
- **Densidade óptica:** Pico controlado — máximo de 80% da capacidade do sistema
- **Distribuição de cor:** L1 e L3 em co-dominância — azul-âmbar em equilíbrio máximo
- **Energia de movimento:** Levíssima aceleração — 5% mais rápido que base
- **Comportamento atmosférico:** Momento mais "vivo" — o pico da respiração

#### STATE_CONTENT
- **Intenção emocional:** Foco, leitura, imersão no texto
- **Densidade óptica:** Mínima — máxima proteção de leitura
- **Distribuição de cor:** Quase monocromático — azul base apenas
- **Energia de movimento:** Mínima — respiração apenas em L1 com amplitude 50% reduzida
- **Comportamento atmosférico:** O sistema se retira para dar lugar ao conteúdo

#### STATE_CONVERSION
- **Intenção emocional:** Urgência calma, ação natural — não pressão agressiva
- **Densidade óptica:** Aumento moderado — volta do âmbar para reforçar a COR do CTA
- **Distribuição de cor:** L3 âmbar sobe para 30% — consonância com botões laranja
- **Energia de movimento:** Normalização
- **Comportamento atmosférico:** Aquecimento leve — cria afinidade emocional com a ação

#### STATE_CLOSE
- **Intenção emocional:** Encerramento elegante — a página "fecha"
- **Densidade óptica:** Redução progressiva — o sistema escurece levemente
- **Distribuição de cor:** Retorno ao azul base — L3 desaparece
- **Energia de movimento:** Desaceleração final
- **Comportamento atmosférico:** Quietude — como o fim de um documentário

### 8.3 Transições entre Estados

```javascript
// Transição semântica — interpolação suave
const SEMANTIC_TRANSITION_DURATION = 1200; // ms
const SEMANTIC_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

// Aplicado como CSS transition nas variáveis das camadas
document.documentElement.style.setProperty('--atm-transition', 
  `${SEMANTIC_TRANSITION_DURATION}ms ${SEMANTIC_EASING}`);
```

---

## 9. CIÊNCIA DE COR & INTEGRIDADE CROMÁTICA

### 9.1 Paleta Canônica do Site

```css
/* TOKENS DE COR — Nunca alterar sem aprovação */
:root {
  /* Fundação atmosférica */
  --color-base:           #080c18;  /* hsl(224, 50%, 6%) */
  --color-ambient:        #0d1530;  /* hsl(222, 55%, 13%) */
  --color-depth:          #0a0f22;  /* hsl(223, 53%, 9%) */

  /* Identidade do produto */
  --color-accent-amber:   #c45a10;  /* hsl(26, 85%, 42%) — CTAs e highlights */
  --color-accent-amber-dark: #7a3508; /* versão escura para uso atmosférico */

  /* Tipografia */
  --color-text-primary:   #e8e8f0;  /* quase-branco frio */
  --color-text-secondary: #8890b0;  /* cinza-azulado para texto secundário */
  --color-text-muted:     #4a5070;  /* texto terciário */

  /* Elementos de interface */
  --color-border:         rgba(255, 255, 255, 0.06);
  --color-separator:      rgba(255, 255, 255, 0.04);

  /* Atmosférico — uso exclusivo do sistema de background */
  --atm-l1-color:         hsl(215, 40%, 18%);
  --atm-l2-color:         hsl(230, 35%, 14%);
  --atm-l3-color:         hsl(28, 45%, 12%);
  --atm-l1-opacity:       0.85;
  --atm-l2-opacity:       0.70;
  --atm-l3-opacity:       0.50;
}
```

### 9.2 Prevenção de Cor Lamacenta

A interação entre azul (L1/L2) e âmbar (L3) pode produzir marrom lamacento em blend modes inadequados. Protocolo:

1. **Nunca sobrepor diretamente** L3 sobre L1/L2 com blend mode `multiply` ou `overlay`
2. L3 deve ser posicionado em zona **sem sobreposição direta** com L1 (ver composição espacial)
3. Se sobreposição for inevitável, usar opacidade máxima de 0.3 em L3
4. Testar sempre com captura de tela e análise de histograma de cor

### 9.3 Pureza Cromática

```
Matiz permitido no sistema atmosférico:
  Azul frio:   195°–240° (cobalto a índigo)
  Âmbar quente: 22°–35° (uso extremamente esparso)

Matizes proibidos no sistema atmosférico:
  Verde: proibido (associação de UI genérica)
  Roxo/Violeta: proibido (SaaS clichê)
  Vermelho: proibido (conotação de erro/alerta)
  Ciano: proibido em pureza (aceitável apenas como tonalidade em azul cobalto)
  Branco: proibido (destabiliza a atmosfera escura)
```

### 9.4 Regras de Decaimento Cromático

Cada fonte de luz deve decair para zero antes de atingir a zona central:

```
L1: 100% na borda → 0% a 35% da largura do viewport
L2: 100% na borda → 0% a 30% da largura do viewport
L3: 100% na borda → 0% a 45% da largura do viewport (decaimento mais agressivo)
```

### 9.5 Combinações Cromáticas Proibidas

- ❌ Âmbar + Verde (qualquer shade)
- ❌ Azul cobalto puro (#0000ff ou saturação > 60%)
- ❌ Branco puro no background (qualquer elemento)
- ❌ Gradiente arco-íris (qualquer sequência de mais de 2 matizes)
- ❌ Cor de saturação > 50% em qualquer elemento atmosférico

---

## 10. ACESSIBILIDADE & FATORES HUMANOS

### 10.1 Proteção WCAG

O sistema atmosférico nunca deve comprometer o contraste do conteúdo. Requisitos mínimos:

| Contexto | Ratio Mínimo | Target |
|---|---|---|
| Texto primário sobre fundo | 7:1 (AAA) | 9:1 |
| Texto secundário sobre fundo | 4.5:1 (AA) | 6:1 |
| CTAs (texto sobre âmbar) | 4.5:1 (AA) | 5:1 |
| Labels e labels de cards | 3:1 (AA Large) | 4:1 |

**Protocolo de verificação:** Antes de qualquer deploy, verificar com WebAIM Contrast Checker usando os valores exatos de cor do fundo na zona de cada elemento de texto.

### 10.2 Sistema Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .atm-animated { animation: none !important; }
  .atm-layer { transition: none !important; }
  /* Manter apenas camadas estáticas — sistema permanece elegante */
}
```

```javascript
const shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const shouldUseBlend = !isSafariIOS && window.devicePixelRatio <= 3;
```

### 10.3 Prevenção de Fadiga Cognitiva

- Nenhum elemento deve piscar a frequências entre 3–50 Hz (risco de fotossensibilidade — WCAG 2.3.1)
- O sistema de respiração (0.03–0.05 Hz) está bem abaixo do limiar de risco
- Em sessões longas de leitura (>5 minutos), o usuário não deve perceber nenhuma mudança no background — o sistema deve ser completamente invisível durante leitura contínua

### 10.4 Adaptação Mobile

| Dispositivo | Nível de Enhancement |
|---|---|
| Desktop ≥ 1440px, hardware concurrency ≥ 4 | FULL |
| Desktop 1024–1439px | FULL |
| Tablet (768–1023px) | REDUCED (sem blend mode, blur 60% do valor desktop) |
| Mobile (≤ 767px) | MINIMAL (L1 apenas, sem animação, sem blend) |
| Mobile com battery < 20% | STATIC (apenas BASE + VIGNETTE) |

### 10.5 Restrições Térmicas/Bateria

```javascript
// Battery API integration
if ('getBattery' in navigator) {
  navigator.getBattery().then(battery => {
    if (battery.level < 0.2 && !battery.charging) {
      setAtmosphericLevel('STATIC');
    }
  });
}
```

---

## 11. ESTRATÉGIA DE PROGRESSIVE ENHANCEMENT

### 11.1 Hierarquia de Degradação

```
NÍVEL 4 — FULL
  Todas as camadas, blend modes, animações, transições semânticas
  Requisito: hardware concurrency ≥ 4, não-mobile, !prefers-reduced-motion

NÍVEL 3 — REDUCED
  Todas as camadas sem blend modes, animações 50% mais lentas
  Requisito: Tablet ou hardware médio

NÍVEL 2 — MINIMAL
  BASE + AMBIENT + L1 estático + VIGNETTE
  Nenhuma animação exceto transição semântica em CSS
  Requisito: Mobile ou hardware limitado

NÍVEL 1 — STATIC
  BASE + VIGNETTE apenas
  Zero animações
  Requisito: prefers-reduced-motion OR battery crítica OR very-low-end device

NÍVEL 0 — FALLBACK
  background-color: #080c18 sólido
  Requisito: JS desabilitado ou erro crítico de renderização
```

### 11.2 Elegância em Todos os Níveis

O design deve ser validado visualmente em cada nível. A regra é: **o site deve parecer "correto" em qualquer nível** — não "quebrado" ou "sem renderizar".

Em NÍVEL 0 (apenas cor sólida), o conteúdo deve ainda transmitir profissionalismo — isso é responsabilidade da escolha de `#080c18` como cor base, que já carrega identidade visual.

### 11.3 Detecção e Inicialização

```javascript
const detectCapability = () => {
  const concurrency = navigator.hardwareConcurrency || 2;
  const deviceMemory = navigator.deviceMemory || 2;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) return 'STATIC';
  if (isMobile && deviceMemory < 4) return 'MINIMAL';
  if (isMobile) return 'REDUCED';
  if (concurrency < 4) return 'REDUCED';
  return 'FULL';
};
```

---

## 12. MANUTENIBILIDADE & GOVERNANÇA DO SISTEMA

### 12.1 Arquitetura de Arquivos

```
devin.html
├── [inline <style>]     → Tokens CSS, camadas atmosféricas estáticas
├── [inline <script>]    → Motor de animação e estados semânticos (< 200 linhas)
└── [assets/]
    └── noise.png        → Textura de ruído 200×200px (opcional)
```

O site é **single-file**. Toda a lógica do sistema atmosférico deve residir inline no HTML. Separação em arquivos externos somente se o projeto evoluir para build system.

### 12.2 Convenções de Nomenclatura

```css
/* Camadas atmosféricas */
.atm-layer          → Classe base de qualquer camada atmosférica
.atm-base           → Camada BASE
.atm-ambient        → Camada AMBIENT
.atm-l1             → Light Layer 1
.atm-l2             → Light Layer 2
.atm-l3             → Light Layer 3
.atm-diffuse        → Camada DIFFUSE
.atm-noise          → Camada NOISE
.atm-vignette       → Camada VIGNETTE
.atm-mask           → Camada MASK
.atm-overlay        → Camada OVERLAY

/* Estados semânticos */
.atm-state--hero
.atm-state--authority
.atm-state--tension
.atm-state--proof
.atm-state--vision
.atm-state--content
.atm-state--conversion
.atm-state--close

/* Modificadores de nível */
.atm--full
.atm--reduced
.atm--minimal
.atm--static

/* Proteções de acessibilidade */
.atm--no-blend      → Safari iOS sem blend mode
.atm--no-animate    → prefers-reduced-motion
.atm--battery-saver → Modo de economia
```

### 12.3 Sistema de CSS Custom Properties

```css
:root {
  /* === TOKENS IMUTÁVEIS === */
  /* Alterar apenas com revisão de design completa */
  --atm-base-color: #080c18;
  --atm-l1-hue: 215;
  --atm-l2-hue: 230;
  --atm-l3-hue: 28;

  /* === TOKENS OPERACIONAIS === */
  /* Modificados por JavaScript durante estados semânticos */
  --atm-l1-opacity: 0.85;
  --atm-l2-opacity: 0.70;
  --atm-l3-opacity: 0.50;
  --atm-vignette-strength: 0.70;
  --atm-overlay-strength: 0.08;

  /* === TOKENS DE PERFORMANCE === */
  /* Modificados por lógica de capability detection */
  --atm-blur-scale: 1;     /* 0–1: escala os blur values */
  --atm-anim-scale: 1;     /* 0–1: escala as durações de animação */
  --atm-transition: 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### 12.4 Regras para Agentes de IA (Claude Code)

> **ATENÇÃO CLAUDE CODE:** As regras abaixo são vinculantes para qualquer modificação neste arquivo.

1. **Nunca alterar os tokens imutáveis** sem instrução explícita do usuário referenciando este documento
2. **Nunca adicionar novas cores** ao sistema atmosférico sem verificar contra a paleta canônica da Seção 9.1
3. **Nunca aumentar opacidades** acima dos valores máximos definidos na Seção 3.2
4. **Nunca adicionar novos keyframes** de animação sem verificar os limites de rasterização da Seção 6.3
5. **Sempre testar** a existência de classes de acessibilidade antes de aplicar efeitos
6. **Nunca usar `!important`** exceto em `.atm-animated { animation: none !important; }` para reduced-motion
7. **Sempre manter** a hierarquia de z-index da Seção 5.1 exatamente como especificado
8. **Ao adicionar seções** de conteúdo, sempre atribuir um `data-atm-state` attribute com o estado semântico correspondente
9. **Nunca modificar** o sistema de camadas atmosféricas para fins de "melhoria estética" sem especificação formal
10. **Sempre verificar** contraste WCAG após qualquer alteração de cor

### 12.5 Anti-Complexity Escalation Policy

O sistema atmosférico deve permanecer **operável por um único desenvolvedor frontend** sem documentação adicional. Sinais de complexidade excessiva:

- Mais de 10 camadas atmosféricas ativas simultaneamente → **refatorar**
- Arquivo JS do motor de animação > 300 linhas → **extrair e documentar**
- Mais de 6 estados semânticos com lógica diferenciada → **consolidar estados similares**
- Qualquer dependência de biblioteca externa para o sistema de background → **remover**

---

## 13. ANTI-PADRÕES VISUAIS — LISTA DE REJEIÇÃO

### 13.1 Estilos Estéticos Proibidos

- ❌ **Aurora Borealis óbvia** — gradientes verdes/roxos em diagonal claramente visíveis
- ❌ **Mesh Gradient** — qualquer background que pareça o recurso Mesh Gradient do Figma
- ❌ **Neon Glow** — qualquer brilho em cor saturada visível a mais de 5% de luminância
- ❌ **Cyberpunk** — qualquer combinação que remeta a estética de gaming/sci-fi
- ❌ **Lava Lamp** — movimento orgânico de blob/forma que lembre movimento de fluido denso
- ❌ **Glassmorphism** — blur + transparência que compete com conteúdo
- ❌ **Neumorphism** — sombras internas/externas em elementos de background
- ❌ **Gradient Text Background** — gradiente visível atrás de texto que altera percepção do texto
- ❌ **AI Wallpaper** — qualquer fundo que pareça gerado por Midjourney/DALL-E
- ❌ **SaaS Purple** — qualquer shade de roxo/violeta no sistema

### 13.2 Comportamentos de Renderização Proibidos

- ❌ Qualquer animação de `background-position` ou `background-size`
- ❌ Uso de `position: absolute` para camadas atmosféricas (usar `position: fixed`)
- ❌ Gradientes com mais de 3 stops de cor
- ❌ `box-shadow` em elementos atmosféricos
- ❌ `text-shadow` em qualquer elemento de conteúdo (exceto CTA principal se absolutamente necessário)
- ❌ Pseudo-elementos `::before`/`::after` com blend modes para efeitos atmosféricos
- ❌ Animação de `filter: blur()` em tempo real
- ❌ `clip-path` animado em camadas atmosféricas

### 13.3 Estilos de Movimento Proibidos

- ❌ Bounce — qualquer easing com overshoot
- ❌ Elastic — qualquer oscilação além do ponto de destino
- ❌ Snap — transições que parecem "clicar" em uma posição
- ❌ Flash — qualquer variação de opacidade acima de 30% em menos de 500ms
- ❌ Parallax agressivo — scroll parallax com fator > 0.05
- ❌ Motion path — animações que seguem paths curvos
- ❌ Particle systems — qualquer simulação de partículas

### 13.4 Comportamentos de Glow Proibidos

- ❌ Glow visível em mais de 10% de saturação relativa ao fundo
- ❌ Glow que define a forma de um objeto (halo circular visível)
- ❌ Glow pulsante (variação de glow sincronizada com tempo)
- ❌ Glow em múltiplas camadas sobrepostas (efeito de amplificação)
- ❌ Glow que "vaza" sobre elementos de conteúdo

### 13.5 Artefatos Cromáticos Proibidos

- ❌ Banding visível em gradientes (prevenido pela camada NOISE)
- ❌ Cor lamacenta por interação de matizes incompatíveis
- ❌ Posterização (faixas visíveis de cor em área que deveria ser gradiente suave)
- ❌ Saturação que "pulsa" ou varia na animação (apenas opacidade e posição são permitidas)
- ❌ Halos brancos em texto sobre fundo escuro (problema de sub-pixel rendering)

### 13.6 Erros de Composição Proibidos

- ❌ Gradiente simétrico (mesma intensidade em dois lados opostos)
- ❌ "Ponto quente" central (radial gradient centrado no viewport)
- ❌ Faixa horizontal de luminância que coincide com bloco de texto
- ❌ Duas fontes de luz no mesmo eixo diagonal
- ❌ Transição abrupta entre fundo claro e escuro sem difusão

### 13.7 Gimmicks de Interação Proibidos

- ❌ Mouse tracking — fundo que reage ao movimento do cursor
- ❌ Click ripple — efeito ondulação ao clicar
- ❌ Scroll-triggered particles — partículas que aparecem ao rolar
- ❌ Hover glow em elementos de background
- ❌ Parallax de cursor — elementos que se movem em relação ao cursor
- ❌ Qualquer resposta do background a interação do usuário (exceto transição semântica de seção)

---

## 14. QUALITY GATE DE PRODUÇÃO

### 14.1 Checklist de Validação Objetiva

Antes de qualquer deploy ou merge de alterações no sistema atmosférico:

#### A. Validação de Renderização
- [ ] Captura de tela em 1440×900 (desktop padrão)
- [ ] Captura de tela em 390×844 (iPhone 14)
- [ ] Captura de tela em 768×1024 (iPad)
- [ ] Verificar em Chrome 120+, Firefox 120+, Safari 17+
- [ ] Nenhuma camada atmosférica visível como forma geométrica definida

#### B. Validação OLED
- [ ] Verificar que fundo base não é `#000000`
- [ ] Verificar que nenhum gradiente tem start color com luminância < 3%
- [ ] Verificar ausência de halos em texto claro sobre fundo escuro
- [ ] Verificar que banding não é visível em área de gradiente

#### C. Validação Mobile
- [ ] Sistema MINIMAL renderiza corretamente sem animações
- [ ] Sistema STATIC renderiza corretamente com apenas cor base
- [ ] Sem elementos `position: fixed` que causem problemas em iOS scroll
- [ ] Performance: nenhuma animação ativa em < 30fps em iPhone SE (2020)

#### D. Validação de Movimento
- [ ] Nenhuma animação completa ciclo visível em < 15 segundos
- [ ] Drift anti-loop funcional: observar 3 minutos sem ver padrão repetitivo
- [ ] prefers-reduced-motion desabilita 100% das animações
- [ ] Transições semânticas de scroll suaves em scroll normal e rápido

#### E. Validação de Frame Estático
- [ ] Pausar sistema de animação: o frame estático deve parecer "correto" e não "congelado"
- [ ] Em qualquer momento do ciclo de animação, o frame deve ser aceitável
- [ ] O background sem animação (STATIC level) deve parecer design intencional, não fallback

#### F. Validação Atmosférica
- [ ] O background não captura atenção quando texto é lido por 30 segundos
- [ ] Um observador novo (não o designer) não consegue descrever o background em detalhes
- [ ] O sistema pode ser descrito como "fundo escuro com profundidade" — não como "efeito animado"
- [ ] Nenhum elemento do background compete com os CTAs em âmbar (#c45a10)

#### G. Validação de Contraste WCAG
- [ ] Texto primário (`.color-text-primary`) ≥ 7:1 sobre fundo em qualquer seção
- [ ] Texto secundário ≥ 4.5:1
- [ ] Texto em botões âmbar ≥ 4.5:1
- [ ] Verificar nas zonas de transição semântica (não apenas nos estados estáticos)

#### H. Validação de Performance
- [ ] Lighthouse Performance Score ≥ 85 em mobile
- [ ] CLS (Cumulative Layout Shift) = 0 — background não causa reflow
- [ ] FCP (First Contentful Paint) ≤ 1.8s — background não bloqueia renderização de conteúdo
- [ ] Nenhum layer atmosférico causa reflow ao animar (apenas opacity/transform)

### 14.2 Critérios de Reprovação Automática

Qualquer um dos seguintes critérios causa **rejeição imediata** da alteração:

1. Qualquer elemento atmosférico visível como forma geométrica clara
2. Qualquer matiz proibido (verde, roxo, vermelho, branco) introduzido no sistema
3. Contraste WCAG AA violado em qualquer elemento de texto
4. Animação com ciclo ≤ 10 segundos visível
5. `background-color`, `background-size` ou `background-position` sendo animados via JS
6. Mais de 4 camadas com `will-change` simultâneas
7. Novo arquivo de dependência adicionado para o sistema de background
8. `mix-blend-mode` adicionado a mais de 1 elemento simultâneo

### 14.3 Protocolo de Review por Claude Code

Quando modificar este arquivo, Claude Code deve:

1. **Antes da modificação:** Ler as seções relevantes desta especificação
2. **Durante a modificação:** Verificar cada token alterado contra os limites definidos
3. **Após a modificação:** Executar mentalmente o checklist das Seções 14.1 A, D, F e G
4. **Reportar ao usuário:** Listar exatamente quais tokens foram alterados e por quê
5. **Sinalizar riscos:** Se qualquer alteração se aproximar dos limites, alertar explicitamente

---

## APÊNDICE A — SNAPSHOT DE IMPLEMENTAÇÃO REFERÊNCIA

### A.1 Estrutura HTML do Sistema Atmosférico

```html
<!-- Sistema Atmosférico — inserir como primeiro filho de <body> -->
<div class="atm-container" aria-hidden="true">
  <div class="atm-layer atm-base"></div>
  <div class="atm-layer atm-ambient"></div>
  <div class="atm-layer atm-l1" id="atm-l1"></div>
  <div class="atm-layer atm-l2" id="atm-l2"></div>
  <div class="atm-layer atm-l3" id="atm-l3"></div>
  <div class="atm-layer atm-diffuse"></div>
  <div class="atm-layer atm-noise"></div>
  <div class="atm-layer atm-vignette"></div>
  <div class="atm-layer atm-mask"></div>
  <div class="atm-layer atm-overlay" id="atm-overlay"></div>
</div>
```

### A.2 CSS Base das Camadas

```css
.atm-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -10;
}

.atm-layer {
  position: absolute;
  inset: 0;
  will-change: opacity, transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.atm-base {
  background-color: var(--atm-base-color, #080c18);
  z-index: 0;
}

.atm-ambient {
  background: linear-gradient(
    160deg,
    hsl(222, 30%, 10%) 0%,
    hsl(225, 25%, 6%) 100%
  );
  z-index: 1;
}

.atm-l1 {
  background: radial-gradient(
    ellipse 80% 60% at -15% -10%,
    hsl(var(--atm-l1-hue), 40%, 18%) 0%,
    transparent 70%
  );
  opacity: var(--atm-l1-opacity, 0.85);
  animation: atm-breathe-l1 20s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  z-index: 2;
}

.atm-l2 {
  background: radial-gradient(
    ellipse 70% 50% at 110% 110%,
    hsl(var(--atm-l2-hue), 35%, 14%) 0%,
    transparent 65%
  );
  opacity: var(--atm-l2-opacity, 0.70);
  animation: atm-breathe-l2 31s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  z-index: 3;
}

.atm-l3 {
  background: radial-gradient(
    ellipse 50% 80% at 108% 38%,
    hsl(var(--atm-l3-hue), 45%, 12%) 0%,
    transparent 60%
  );
  opacity: var(--atm-l3-opacity, 0.50);
  animation: atm-breathe-l3 47s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  z-index: 4;
}

.atm-vignette {
  background: radial-gradient(
    ellipse 70% 85% at 50% 50%,
    transparent 40%,
    rgba(4, 6, 14, 0.70) 100%
  );
  z-index: 7;
}

.atm-mask {
  background: rgba(8, 12, 24, 0.15);
  z-index: 8;
}

@keyframes atm-breathe-l1 {
  0%, 100% { opacity: var(--atm-l1-opacity); }
  50%       { opacity: calc(var(--atm-l1-opacity) * 0.92); }
}

@keyframes atm-breathe-l2 {
  0%, 100% { opacity: var(--atm-l2-opacity); }
  50%       { opacity: calc(var(--atm-l2-opacity) * 0.88); }
}

@keyframes atm-breathe-l3 {
  0%, 100% { opacity: var(--atm-l3-opacity); }
  50%       { opacity: calc(var(--atm-l3-opacity) * 0.85); }
}

@media (prefers-reduced-motion: reduce) {
  .atm-l1, .atm-l2, .atm-l3 {
    animation: none !important;
  }
}
```

---

## APÊNDICE B — MAPA DE SEÇÕES DO DEVIN.HTML

Para uso do IntersectionObserver no sistema de estados semânticos:

```javascript
const SECTION_STATE_MAP = {
  '[data-section="hero"]':       'STATE_HERO',
  '[data-section="authority"]':  'STATE_AUTHORITY',
  '[data-section="tension"]':    'STATE_TENSION',
  '[data-section="proof"]':      'STATE_PROOF',
  '[data-section="vision"]':     'STATE_VISION',
  '[data-section="content"]':    'STATE_CONTENT',
  '[data-section="conversion"]': 'STATE_CONVERSION',
  '[data-section="footer"]':     'STATE_CLOSE',
};

// Ao editar o HTML, sempre adicionar data-section nos elementos de seção:
// <section data-section="hero"> ... </section>
```

---

*Documento gerado para uso exclusivo de manutenção e edição automatizada por Claude Code.*
*Versão 1.0 — Baseado em análise visual de `mauricio.issei.com.br/devin.html`*
*Atualizar este documento ao realizar mudanças arquitetônicas no sistema atmosférico.*
