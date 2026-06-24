# SDD — Terminal Evolutivo: A Jornada de Maurício Issei

**Versão**: 2.1 — *Revisão final de UX, narrativa e performance* (sobre a v2.0 Híbrida WebGL)
**Data**: 2026-06-22
**Autor**: Arquitetura SDD (agent-driven)
**Padrão**: Specification-Driven Development (SDD)
**Tipo**: Página única de portfólio interativa (scrollytelling híbrido: Foreground HTML + Background WebGL)
**Status**: Especificação aprovada para implementação — código ainda NÃO escrito

> **Changelog v1.0 → v2.0**
> - **Arquitetura híbrida**: foreground HTML semântico (a11y/SEO intactos) sobre um `<canvas>` WebGL (Three.js) de fundo.
> - **Motor de scroll**: `IntersectionObserver` → **GSAP ScrollTrigger** acoplado à câmera e aos materiais 3D.
> - **Narrativa**: 3 fases → **5 fases** (alinhadas aos 5 arcos de `jornada.txt`).
> - **Tematização CSS**: agora só governa o *foreground* (texto, bordas, botões); ornamentos de fundo (CRT, scanlines, nuvens, glow) migram para **shaders WebGL**.
> - **Nova seção §7**: *Performance Budget WebGL* (object pooling, `dispose()`, resize adaptativo, fallback).
> - **Exceção da v1.0 revogada**: a restrição "sem Three.js/Canvas" do briefing original é substituída por esta v2.0, mantendo a promessa de a11y via *progressive enhancement* (a página funciona 100% sem WebGL).

> **Changelog v2.0 → v2.1 (revisão de maturidade)** — *fundação SEO/a11y/foreground-background mantida intocada*
> - **Narrativa rebalanceada**: STAR *Economia +3MM* e *Sustentação Core Rede (Splunk)* movidos de F5 → **F4**; F5 enxuta (foco em certificações + últimos grandes marcos).
> - **Marco do Arquiteto** (interstício narrativo/visual F4→F5) + **KPI Final Agregado** para recrutadores (novas §4.5 / §4.6).
> - **Morphing semântico** substitui o fade-out/fade-in entre cenas — transição contínua (partículas→wireframe→nós→blocos→rede neural).
> - **GSAP**: `onToggle` → `onEnter`/`onEnterBack` (elimina *flicker* de tema em scrolls curtos em telas menores).
> - **Render sob demanda** corrigido (remove o `ticker` contínuo): modos **Idle / Scroll / Animation**.
> - **Nova §7.5 Safari/iOS**: tratamento de *WebGL Context Loss* e degradação do `backdrop-filter`.

> **Changelog v2.1 → v2.2 (refino de design)** — *layout/UX; arquitetura e narrativa mantidas*
> - **Fase 4 agora "Dark Mode Premium"** (cinza-azulado + glassmorphism): elimina o salto para tema claro e **resolve o risco R1** — a jornada fica luminosamente contínua.
> - **Caso STAR principal de cada fase inline** (visível por padrão, `.star--hero`); secundários permanecem em acordeão.
> - **Marco do Arquiteto em 100svh** (respiro/negative-space agressivo).
> - **Fase 5 dividida**: KPIs viram seção de fechamento própria (`.closing#kpi`); vídeo vira CTA de saída no fim (`.outro`).
> - **`theme-color` dinâmico por fase** (barra do navegador móvel acompanha o tema).

---

## 0. Sumário Executivo

`Terminal Evolutivo` é uma **página única de scrollytelling** que conta a evolução de Maurício Yokoyama Issei de **1982 a 2026** — de **espectador** (TV de tubo, heróis japoneses), para **operador** (computador, internet discada, primeiros sistemas), para **arquiteto/mentor** (liderança técnica, cloud, IA agêntica).

O diferencial de UX é que **a própria estética da página evolui conforme o scroll**: ela "envelhece para frente", atravessando **cinco eras visuais** distintas que espelham a maturidade tecnológica de cada fase da vida do Maurício. Na v2.0 cada era é um **cenário WebGL** ao fundo, com o conteúdo HTML rolando por cima.

| Fase | Era visual (foreground) | Período | Arco narrativo | Cenário WebGL (background) |
|:-----|:------------------------|:--------|:---------------|:---------------------------|
| **1** | O Terminal Analógico | 1982–1994 | Infância · espectador | CRT + partículas lentas (fósforo) |
| **2** | O Treinamento | 1995–1999 | Adolescência · espectador→operador | Low-poly / wireframes verdes (Matrix) |
| **3** | A Rede Discada | 2000–2009 | Início adulto · operador | Linhas de dados conectando nós (web/discada) |
| **4** | A Nuvem Corporativa | 2010–2019 | Família/consolidação · analista→arquiteto | Blocos sólidos e limpos (microsserviços) |
| **5** | O Prompt da IA | 2020–2026 | Maturidade · arquiteto→mentor | Rede neural fluida, etérea e holográfica |

A transição é orquestrada por **GSAP ScrollTrigger**, que mapeia o scroll para (a) **mover a câmera e interpolar os materiais** da cena Three.js de fundo e (b) **trocar a classe de tema do `<body>`**, que governa apenas o *foreground* (texto, bordas, botões) via **CSS Custom Properties**. **Frameworks 3D são, agora, intencionais** (Three.js + GSAP) — mas a narrativa permanece **legível sem WebGL/JS** (fallback CSS).

**Princípio inegociável**: a narrativa precisa ser **100% legível sem JavaScript e por leitores de tela**. O scrollytelling — incluindo o WebGL — é *progressive enhancement* puramente estético, nunca um pré-requisito para o conteúdo.

### Entregável de produto
- **Arquivos**: `src/terminal-evolutivo.html` + `src/js/terminal-evolutivo.js` (orquestrador) + `src/js/te-scene.js` (cena Three.js) — auto-detectados pelo glob do Vite
- **Dependências novas**: `three` e `gsap` (com `ScrollTrigger`) via npm (bundladas pelo Vite; **não** CDN)
- **URL final**: `mauricio.issei.com.br/terminal-evolutivo`
- **Title (SEO)**: `Terminal Evolutivo: A Jornada de Maurício Issei | 1982–2026`
- **Meta description**: `Da TV de tubo à IA agêntica: a evolução de Maurício Issei em uma narrativa interativa cuja estética envelhece conforme você rola — de espectador a operador a arquiteto.` (≤160 chars)

---

## 1. Visão Geral do Projeto & Arquitetura (High-Level Design)

### 1.1 Objetivo e posicionamento no ecossistema

Esta página é o **eixo narrativo-emocional** do portfólio, complementando os artefatos já existentes:

| Artefato | Papel | Relação com o Terminal Evolutivo |
|:---------|:------|:---------------------------------|
| [`src/index.html`](../../../../src/index.html) | Currículo dinâmico (CV) — dados objetivos | "Ver currículo completo" (CTA na Fase 3) |
| [`src/life.html`](../../../../src/life.html) | Jogo 2D pixel-art da jornada | "Jogue a versão pixel-art" (cross-link) |
| [`src/life3d.html`](../../../../src/life3d.html) | Experiência 3D contemplativa | "Explore em 3D" (cross-link) |
| [`src/catalogo.html`](../../../../src/catalogo.html) | Catálogo/SSOT do ecossistema | Nó de entrada; registrar em `specs/ecosystem.nav.yaml` |
| **`terminal-evolutivo.html`** | **Narrativa + casos STAR contextualizados** | **Esta spec** |

> **Diferenciação clara**: `life.html`/`life3d.html` são *jogos/experiências* (a jornada como brincadeira). `terminal-evolutivo.html` é a *narrativa profissional* — a mesma história, mas com os **casos STAR e o currículo embutidos no fluxo emocional**, otimizada para recrutadores, pares técnicos e LLMs (AEO/GEO).

### 1.2 Modelo conceitual: "a página que envelhece para frente"

Duas camadas independentes: o **canvas WebGL fixo** (fundo) e o **fluxo HTML** que rola por cima (foreground com fundo transparente).

```
            Z-STACK                          SCROLL ▼  (foreground HTML, fundo transparente)
┌───────────────────────────┐   ┌──────────────────────────────────────────────────────┐
│  #bg-webgl  (z-index:-1)   │   │ HERO  "44 níveis. Um arquiteto de si mesmo."          │ theme-terminal
│  <canvas> fixo, full-vh    │   ├──────────────────────────────────────────────────────┤
│  Three.js: câmera + cena   │   │ FASE 1 · TERMINAL ANALÓGICO (1982–1994) infância      │ theme-terminal
│  controladas por GSAP      │   │ FASE 2 · O TREINAMENTO (1995–1999) adolescência       │ theme-wire
│  ScrollTrigger (scrub)     │   │ FASE 3 · A REDE DISCADA (2000–2009) início adulto     │ theme-net
│                            │   │ FASE 4 · A NUVEM CORPORATIVA (2010–2019) família+STAR │ theme-cloud
│  cena interpola por fase:  │   │ FASE 5 · O PROMPT DA IA (2020–2026) maturidade+STAR   │ theme-ai
│  CRT→wireframe→nós→        │   ├──────────────────────────────────────────────────────┤
│  blocos→rede neural        │   │ FOOTER + eco-nav                                      │ theme-ai
└───────────────────────────┘   └──────────────────────────────────────────────────────┘
   (pinta os pixels do fundo)        (HTML semântico, fundos transparentes / scrim)
```

> O canvas **nunca** rola: é `position:fixed`. A *sensação* de movimento vem da câmera/cena reagindo ao progresso do scroll (GSAP), enquanto o conteúdo textual rola normalmente por cima. Assim, SEO e leitores de tela enxergam um documento HTML linear comum.

### 1.3 Stack técnico (aderente à `ARCHITECTURE.md`)

| Camada | Tecnologia | Observação |
|:-------|:-----------|:-----------|
| Markup | HTML5 semântico | `<header> <main> <section> <article> <figure> <footer>` + `<canvas id="bg-webgl" aria-hidden="true">` |
| Estilo (foreground) | CSS3 puro (Custom Properties) | Governa **apenas** texto, bordas, botões e scrim dos cards. Fundos = transparentes (o WebGL pinta o fundo) |
| Background 3D | **Three.js** (r16x, ES module) | 1 cena, 1 câmera, 1 `WebGLRenderer` no `<canvas>` fixo; 5 "setups" de cena por fase |
| Animação/Scroll | **GSAP + ScrollTrigger** | `scrub` mapeia scroll→câmera/materiais; callbacks trocam a classe de tema do `<body>` |
| Comportamento | Vanilla JS ES6+ (2 módulos) | `terminal-evolutivo.js` (orquestra) + `te-scene.js` (Three.js); `prefers-reduced-motion`/fallback |
| Build | Vite 6 | Detecta `src/*.html` automaticamente; `three`/`gsap` via npm são tree-shaken/bundlados |
| Fontes | Google Fonts | `VT323`+`IBM Plex Mono` (terminal/wire) já usados em `life.html`; `Inter` (rede/nuvem/IA) é a fonte da casa |
| Testes | Playwright + axe | Gate da casa (a11y AA + smoke); WebGL testado com fallback forçado |
| SEO/AEO | `scripts/seo/*` | Página entra no motor AEO/GEO reexecutável (JSON-LD, OG, `.md` gêmeo) |

### 1.4 Princípios de arquitetura (decisões)

| # | Decisão | Rationale |
|:--|:--------|:----------|
| A1 | **Foreground HTML + Background WebGL desacoplados** | O `<canvas>` fixo (`z-index:-1`) renderiza a atmosfera; o HTML rola por cima com fundo transparente. Separação total → a11y/SEO ficam no HTML; a "mágica" fica no WebGL |
| A2 | **GSAP ScrollTrigger como única fonte de verdade do scroll** | Um `scrub` linka a posição do scroll à câmera e aos uniforms dos materiais, e dispara a troca de tema do foreground. Substitui o `IntersectionObserver` da v1.0 |
| A3 | **CSS governa só o foreground; ornamentos vão p/ shaders** | CRT, scanlines, nuvens, glow saem do CSS e viram efeitos GPU (mais ricos e baratos que `box-shadow`/overlays) |
| A4 | **Conteúdo visível por padrão + fallback sem WebGL** | a11y/SEO/resiliência: se WebGL/JS faltar, cai para fundo CSS sólido por tema; o conteúdo nunca depende do canvas |
| A5 | **`<details>/<summary>` nativos para os casos STAR** | Acordeão acessível por teclado, funciona sem JS, fácil de tematizar |
| A6 | **Tema "Nuvem" claro (F4) é exceção consciente ao Dark-Tech** | Ver §8 Riscos: narrativamente necessário; contraste AA garantido sobre scrim |
| A7 | **`three`/`gsap` via npm (bundle), não CDN** | Tree-shaking do Vite, versão travada, sem dependência de rede de terceiros em runtime |

### 1.5 Arquitetura Híbrida (Foreground HTML + Background WebGL)

**Estrutura de camadas (z-stack):**

```html
<body class="theme-terminal">
  <canvas id="bg-webgl" aria-hidden="true"></canvas>   <!-- fixo, z-index:-1 -->
  <a class="skip" href="#story">Pular para o conteúdo</a>
  <header class="hero">…</header>
  <main id="story">… 5 <section.era> …</main>           <!-- rola por cima, fundo transparente -->
  <footer>…</footer>
</body>
```

```css
#bg-webgl {
  position: fixed; inset: 0;
  width: 100%; height: 100%;
  z-index: -1;                 /* atrás de tudo */
  pointer-events: none;        /* não rouba cliques/scroll */
  display: block;
}
html, body { background: transparent; }            /* deixa o WebGL aparecer */
.hero, main, .era { background: transparent; }      /* foreground translúcido */
```

**Regras da camada híbrida:**
1. O `<canvas id="bg-webgl">` é **`position:fixed`, `z-index:-1`, `pointer-events:none`** e `aria-hidden="true"` — é decoração, invisível para leitores de tela.
2. O `<main id="story">` rola normalmente; suas seções têm **fundo transparente** (ou um *scrim* semi-transparente nos cards para legibilidade — ver §2).
3. O HTML continua **semântico e linear**: remover o `<canvas>` não altera o conteúdo, só remove a atmosfera.
4. **Contrato de legibilidade**: todo texto sobre o WebGL precisa de contraste AA garantido — via scrim (`--surface` com alpha + `backdrop-filter`) quando a cena de fundo for clara/movimentada (ver §2.4 e §7).

---

## 2. Sistema de Tematização (CSS Architecture)

### 2.1 Estratégia

Na v2.0 o CSS governa **apenas o foreground** (texto, títulos, bordas dos cards STAR, botões, scrim). Os **fundos são transparentes** — quem pinta o fundo é o WebGL (§3). Um **único conjunto de nomes de variáveis** é redefinido por **cinco** classes de tema no `<body>` (`.theme-terminal`, `.theme-wire`, `.theme-net`, `.theme-cloud`, `.theme-ai`); os componentes referenciam sempre as variáveis abstratas, nunca cores literais. As variáveis de ornamento de fundo da v1.0 (`--scanline`, `--grain`, `--glow` ambiental) foram **removidas** — esses efeitos agora vivem nos shaders.

```css
/* ---- BASE / FALLBACK (sem WebGL e pré-JS) ---- */
:root {
  /* foreground */
  --text:          #c9d1d9;
  --text-strong:   #ffffff;
  --text-dim:      #8b949e;
  --accent:        #58a6ff;
  --accent-2:      #8a2be2;

  /* superfície dos CARDS = scrim sobre o WebGL */
  --surface:       rgba(22,27,34,.72);   /* alpha → deixa a cena vazar */
  --surface-2:     rgba(33,38,45,.85);
  --border:        rgba(255,255,255,.12);
  --scrim-blur:    8px;

  /* fundo de FALLBACK (usado só quando .no-webgl) */
  --bg-fallback:   #0d1117;

  /* tipografia / forma */
  --font-display:  'Inter', system-ui, sans-serif;
  --font-body:     'Inter', system-ui, sans-serif;
  --font-mono:     'IBM Plex Mono', ui-monospace, monospace;
  --radius:        12px;
  --container:     66ch;

  --theme-fade:    600ms;   /* só p/ COR do foreground */
}

/* O fundo é o WebGL: o body é transparente.
   Só quando o WebGL falha (.no-webgl) usamos cor sólida. */
body          { background: transparent; }
body.no-webgl { background: var(--bg-fallback); }

/* ---- FASE 1 · TERMINAL ANALÓGICO (1982–1994) ---- */
.theme-terminal {
  --text: #33ff66; --text-strong: #b6ff7a; --text-dim: #2a9d4a;
  --accent: #ffb000; --accent-2: #ff7b00;
  --surface: rgba(8,10,2,.66); --border: rgba(51,255,102,.30);
  --font-display: 'VT323','IBM Plex Mono',monospace;
  --font-body: 'IBM Plex Mono',ui-monospace,monospace;
  --radius: 0px; --bg-fallback: #0a0a02;
}

/* ---- FASE 2 · O TREINAMENTO / WIREFRAME (1995–1999) ---- */
.theme-wire {
  --text: #7cffb2; --text-strong: #d8ffe6; --text-dim: #34c172;
  --accent: #00ff9c; --accent-2: #00b3ff;
  --surface: rgba(3,12,8,.62); --border: rgba(0,255,156,.35);
  --font-display: 'IBM Plex Mono',monospace;
  --font-body: 'IBM Plex Mono',ui-monospace,monospace;
  --radius: 2px; --bg-fallback: #02100a;
}

/* ---- FASE 3 · A REDE DISCADA / NÓS (2000–2009) ---- */
.theme-net {
  --text: #cde3ff; --text-strong: #ffffff; --text-dim: #7fa6cc;
  --accent: #36a3ff; --accent-2: #00d2c6;
  --surface: rgba(10,18,32,.70); --border: rgba(54,163,255,.30);
  --font-display: 'Inter',system-ui,sans-serif;
  --font-body: 'Inter',system-ui,sans-serif;
  --radius: 8px; --bg-fallback: #08111f;
}

/* ---- FASE 4 · A NUVEM CORPORATIVA / MICROSSERVIÇOS (2010–2019) ---- */
/* Único tema "claro": scrim claro sobre cena clara (ver §8 / R1) */
.theme-cloud {
  --text: #1f2d3d; --text-strong: #0b1f33; --text-dim: #5a6b7b;
  --accent: #0a66c2; --accent-2: #00a1e0;
  --surface: rgba(255,255,255,.82); --border: rgba(13,71,161,.18);
  --font-display: 'Inter',system-ui,sans-serif;
  --font-body: 'Inter',system-ui,sans-serif;
  --radius: 14px; --bg-fallback: #eef3fb;
}

/* ---- FASE 5 · O PROMPT DA IA / REDE NEURAL (2020–2026) ---- */
.theme-ai {
  --text: #d7dde7; --text-strong: #ffffff; --text-dim: #7d8696;
  --accent: #7c5cff; --accent-2: #19c3a3;
  --surface: rgba(18,21,28,.68); --border: rgba(124,92,255,.28);
  --font-display: 'Inter',system-ui,sans-serif;
  --font-body: 'Inter',system-ui,sans-serif;
  --radius: 16px; --container: 60ch; --bg-fallback: #0b0d12;
}
```

### 2.2 Como o morph acontece (a "mágica")

Os elementos de **foreground** transicionam porque animam as **propriedades concretas**, não as variáveis. O fundo fica transparente (WebGL atrás):

```css
body {
  background: transparent;          /* WebGL aparece por baixo */
  color: var(--text);
  font-family: var(--font-body);
  transition: color var(--theme-fade) ease;
}

.panel,                              /* cards STAR, painéis, callouts */
.star > details {
  background: var(--surface);        /* scrim semi-transparente */
  -webkit-backdrop-filter: blur(var(--scrim-blur));
  backdrop-filter: blur(var(--scrim-blur));   /* legibilidade sobre a cena */
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  transition:
    color var(--theme-fade) ease,
    border-color var(--theme-fade) ease,
    border-radius var(--theme-fade) ease,
    background-color var(--theme-fade) ease;
}
```

> Na v2.0 quem "derrete" o **fundo** é o WebGL (interpolação de materiais/câmera no scrub, §3). O CSS cuida só do **foreground**: ao trocar a classe de tema, `--text`/`--accent`/`--border` mudam de valor e, como `color`/`border-color` têm `transition`, **texto e bordas dos cards** transitam suavemente (≈600 ms). O layout nunca muda — nada "pula".

### 2.3 Ornamentos delegados ao WebGL (saíram do CSS)

Todos os efeitos **de fundo** que na v1.0 eram CSS agora são **shaders / cenas Three.js** (§3) — mais ricos e baratos na GPU:

| Ornamento | v1.0 (CSS) | v2.0 (WebGL) |
|:--|:--|:--|
| CRT + scanlines (F1) | `repeating-linear-gradient` + overlay | post-processing shader (scanline + curvatura + flicker) |
| Wireframe Matrix (F2) | — | `MeshBasicMaterial({wireframe:true})` + glitch |
| Nós / linhas de dados (F3) | — | `LineSegments` + pontos animados pelas arestas |
| Blocos / microsserviços (F4) | `box-shadow` | `InstancedMesh` de cubos com luz |
| Glow / rede neural (F5) | `text-shadow` / `drop-shadow` | partículas + bloom (UnrealBloomPass) |

O CSS de foreground mantém **apenas** ornamentos textuais leves (cursor do prompt):
```css
.cursor::after { content:"▌"; animation: blink 1s steps(2) infinite; color: var(--accent); }
@keyframes blink { 50% { opacity: 0 } }
```
> Glow de *texto* pontual ainda pode usar `text-shadow` no foreground; o glow **ambiental** é do bloom no WebGL.

### 2.4 Acessibilidade & legibilidade do tema

```css
@media (prefers-reduced-motion: reduce) {
  :root { --theme-fade: 0ms; }      /* troca de cor instantânea */
  .cursor::after { animation: none; }
  /* a cena WebGL congela em 1 frame por fase — ver §3.5 */
}
```
- A troca de tema **nunca** altera tamanho/posição do texto — só cor, fonte e borda. Nada "pula".
- **Legibilidade sobre o WebGL**: cards usam scrim (`--surface` com alpha + `backdrop-filter`); blocos de texto longos ganham um `.scrim` de fundo para garantir AA mesmo com a cena em movimento.
- Contraste auditado **nos cinco temas** (ver §6.2). O tema claro (Nuvem, F4) usa `--text:#1f2d3d` sobre scrim branco (`rgba(255,255,255,.82)`) ≈ AA; ver risco R1 (§8).

---

## 3. Engenharia do Scroll (GSAP ScrollTrigger + Three.js)

> **Substitui** todo o motor `IntersectionObserver` da v1.0. Agora o scroll é a *timeline* que dirige a câmera 3D, interpola os materiais de cada cena e troca a classe de tema do foreground.

### 3.1 Contrato HTML que o orquestrador lê

Cada era declara `data-theme`, `data-era` e `data-scene` (qual setup Three.js ativar). **Nenhum estilo essencial depende do JS.**

```html
<canvas id="bg-webgl" aria-hidden="true"></canvas>
<main id="story">
  <section class="era" data-theme="terminal" data-scene="crt"    data-era="1982-1994" aria-labelledby="era1-title">…</section>
  <section class="era" data-theme="wire"     data-scene="wire"   data-era="1995-1999" aria-labelledby="era2-title">…</section>
  <section class="era" data-theme="net"      data-scene="nodes"  data-era="2000-2009" aria-labelledby="era3-title">…</section>
  <section class="era" data-theme="cloud"    data-scene="blocks" data-era="2010-2019" aria-labelledby="era4-title">…</section>
  <section class="era" data-theme="ai"       data-scene="neural" data-era="2020-2026" aria-labelledby="era5-title">…</section>
</main>
```

### 3.2 Estrutura do motor (GSAP ScrollTrigger ⇄ Three.js)

Dois módulos: **`te-scene.js`** (tudo de Three.js) e **`terminal-evolutivo.js`** (orquestra GSAP ↔ cena ↔ tema).

**(a) `te-scene.js` — a cena de fundo**

```js
import * as THREE from 'three';

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true,
                                             powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));      // cap p/ perf (§7)
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, .1, 100);
  camera.position.set(0, 0, 8);

  // MORPHING SEMÂNTICO: UM sistema persistente (campo de partículas + linhas) que
  // MORFA entre 5 estados — nada de cenas separadas com fade. Cada "estado de fase"
  // é um buffer de atributos-alvo (posição, cor, tamanho, densidade de conexões).
  const phaseStates = [
    buildState('crt'),    // partículas lentas (fósforo)
    buildState('wire'),   // vértices em malha wireframe
    buildState('nodes'),  // nós + arestas (rede discada)
    buildState('blocks'), // grade de cubos (microsserviços)
    buildState('neural'), // rede neural fluida
  ];
  const field = makeMorphField(phaseStates);   // 1 geometria, atributos morph-target
  scene.add(field.group);

  let animating = true;   // fases com movimento próprio (drift/flow) mantêm o loop vivo

  return {
    renderer, scene, camera,
    render() { field.tick(); renderer.render(scene, camera); },

    // Progresso GLOBAL do story (0→1) → lerp contínuo entre os 2 estados vizinhos.
    // É isto que faz CRT→wireframe→nós→blocos→rede neural "virarem" um no outro.
    setProgress(p) {
      const seg = p * (phaseStates.length - 1);                 // 0..4
      const i   = Math.min(Math.floor(seg), phaseStates.length - 2);
      field.morph(i, i + 1, seg - i);                           // interpola atributos i→i+1
    },

    isAnimating()    { return animating; },
    setAnimating(on) { animating = on; },                       // reduce-motion → false

    resize()  { /* §7 resize adaptativo */ },
    dispose() { field.dispose(); renderer.dispose(); /* §7 */ },
    rebuild() { field.rebuild(phaseStates); },                  // Safari/iOS context loss (§7.5)
  };
}
```

**(b) `terminal-evolutivo.js` — orquestração com ScrollTrigger**

```js
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { createScene } from './te-scene.js';

gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById('bg-webgl');
const body   = document.body;
const eras   = [...document.querySelectorAll('.era[data-scene]')];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

let S;
try { S = createScene(canvas); }                 // pode lançar se WebGL faltar
catch (e) { body.classList.add('no-webgl'); }    // fallback CSS (§7) e segue sem 3D

if (S) {
  // 1) RENDER SOB DEMANDA — SEM ticker contínuo. Renderiza só quando há razão (§7.2).
  //    Modos: Idle (0 frames) · Scroll (1 frame/evento) · Animation (auto-loop p/ fase viva).
  let rafId = null;
  const requestRender = () => { if (rafId == null) rafId = requestAnimationFrame(tick); };
  function tick() {
    rafId = null;
    S.render();
    if (!reduce && S.isAnimating()) requestRender();   // fase animada auto-mantém o loop
  }
  if (reduce) S.setAnimating(false);                   // reduce-motion → 1 frame por mudança

  // 2) CÂMERA + MORPHING SEMÂNTICO: 1 timeline-mestra "scrubada" pelo story inteiro.
  //    onUpdate alimenta o morph contínuo (setProgress) e pede UM render.
  gsap.timeline({ scrollTrigger: {
        trigger: '#story', start: 'top top', end: 'bottom bottom',
        scrub: reduce ? false : 1,                                  // OFF em reduce-motion
        onUpdate: self => { S.setProgress(self.progress); requestRender(); },
   }})
   .to(S.camera.position, { z: 6, y: -2, ease: 'none' })
   .to(S.camera.rotation, { x: 0.15, ease: 'none' }, 0);

  // 3) FOREGROUND por fase: onEnter / onEnterBack (NÃO onToggle) evitam flicker de
  //    tema em scrolls curtos. Só trocam tema/aria — o fundo morfa continuamente (passo 2).
  const THEMES = ['theme-terminal','theme-wire','theme-net','theme-cloud','theme-ai'];
  const setTheme = section => {
    body.classList.remove(...THEMES);
    body.classList.add('theme-' + section.dataset.theme);
    syncTimeline(section);                                          // §3.4
    requestRender();
  };
  eras.forEach(section => ScrollTrigger.create({
    trigger: section, start: 'top center', end: 'bottom center',
    onEnter:     () => setTheme(section),
    onEnterBack: () => setTheme(section),
  }));

  // 4) RESIZE adaptativo + perda de contexto WebGL (Safari/iOS, §7.5) + cleanup
  addEventListener('resize', debounce(() => { S.resize(); requestRender(); }, 150));
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); body.classList.add('no-webgl'); });
  canvas.addEventListener('webglcontextrestored', () => { body.classList.remove('no-webgl'); S.rebuild(); requestRender(); });
  addEventListener('pagehide', () => { if (rafId) cancelAnimationFrame(rafId); S.dispose(); });

  requestRender();   // primeiro frame
}
```

**Como o scroll vira movimento 3D (resumo):**
- **Câmera** → a *timeline-mestra* com `scrub` interpola `camera.position/rotation` do início ao fim de `#story`. Rolar = voar pela cena (e voltar, se rolar para cima).
- **Morphing semântico (background)** → o `onUpdate` da timeline-mestra passa o **progresso global** (0→1) para `S.setProgress`, que **interpola os atributos** de um único sistema de partículas/linhas entre os estados das fases. **Não há fade-out/fade-in**: as partículas do CRT *viram* wireframes, que *viram* nós, que *viram* blocos, que *viram* rede neural — sensação contínua e ininterrupta.
- **Tema do foreground (discreto)** → `onEnter`/`onEnterBack` de cada `<section.era>` trocam a classe no `<body>`; o CSS (§2) anima só as cores do texto/bordas. Usar `onEnter/onEnterBack` (em vez de `onToggle`) **evita flicker** de tema em scrolls curtos.
- **Render sob demanda** → não há `ticker` contínuo; renderiza-se só em scroll, transição ou enquanto uma fase tiver movimento próprio (passo 1 e §7.2).

### 3.3 Por que GSAP ScrollTrigger (e não `IntersectionObserver`)?

| Aspecto | `IntersectionObserver` (v1.0) | GSAP ScrollTrigger (v2.0) |
|:--|:--|:--|
| Granularidade | Booleano "entrou/saiu" (por threshold) | **Progresso contínuo 0→1** por trigger (`self.progress`) — essencial p/ interpolar câmera/materiais |
| Scrub | Não nativo | `scrub` amarra a animação ao scroll (avança **e volta**) |
| Sincronia c/ render | Manual | render sob demanda (Idle/Scroll/Animation) disparado pelos callbacks (§7.2) |
| Pinning / snap | Manual | `pin`, `snap`, `normalizeScroll` prontos |
| a11y / reduce-motion | Media query | `scrub:false` + frame estático (§3.5) |

> `IntersectionObserver` continua ótimo para *revelar* blocos discretos, mas não entrega o **progresso contínuo** que dirige uma câmera 3D. Daí a troca.

### 3.4 Timeline lateral (dirigida pelo ScrollTrigger)

A `<nav>` de anos-marco reflete a era ativa via `aria-current`. Em vez de um observer dedicado, usamos o callback do próprio ScrollTrigger por fase (chamado no `onEnter`/`onEnterBack`, §3.2):

```js
function syncTimeline(section) {
  document.querySelectorAll('[data-jump]').forEach(a => {
    const on = a.dataset.jump === section.dataset.era;
    a.classList.toggle('is-active', on);
    a.setAttribute('aria-current', on ? 'true' : 'false');
  });
}
```
Links continuam **âncoras nativas** (`href="#era3"`); ScrollTrigger pode animar o scroll até elas (`gsap.to(window, { scrollTo })`), desligado sob `prefers-reduced-motion`.

### 3.5 Reduce-motion & fallback (resumo; detalhes em §7)
- **`prefers-reduced-motion`**: `scrub:false` (sem voo de câmera); cada fase renderiza **1 frame estático** representativo; sem partículas animadas; troca de tema instantânea.
- **Sem WebGL** (`createScene` lança / contexto WebGL ausente): `body.no-webgl` ativa fundo CSS sólido (`--bg-fallback`) por tema; o texto ainda rola, mas nada 3D. Conteúdo 100% intacto.

---

## 4. Mapeamento de Conteúdo (UX / Content Strategy)

Cruzamento **Narrativa (`jornada.txt`) × Cenário WebGL × Caso STAR (`llms-full.txt`) × Currículo (`index.html`) × Foto**. Os casos STAR são todos do período **Rede (2018–2025)**; portanto concentram-se na **Fase 4** (2010–2019) e na **Fase 5** (2020–2026). A experiência pré-2018 (Sysgen, Telefônica, Indra, Serasa) ancora a linha do tempo das Fases 3 e 4.

### 4.1 Hero (pré-fase) — `theme-terminal`
- **Copy**: `> boot sequence... 44 níveis carregados.` / H1: **"A Jornada de um Arquiteto de Si Mesmo"** / sub: "De espectador a operador a mentor — 1982→2026". Cursor piscando.
- **Foto**: `1982.jpeg` (nascimento) em "boot screen".
- **CTA âncora**: "iniciar ▸" → `#era1`.

### 4.2 Tabela de mapeamento (5 fases)

| Fase / Era | Cenário WebGL (background) | Bloco narrativo (`jornada.txt`) | Caso STAR / Currículo | Foto | Componente STAR (foreground) |
|:--|:--|:--|:--|:--|:--|
| **F1 · Terminal Analógico** (1982–1994) | **CRT + partículas lentas**: fósforo âmbar/verde, scanlines e flicker via post-processing; poucas partículas à deriva | Infância — heróis japoneses (Jaspion, Changeman), "SO interno", espectador absorvendo | — (formação de mentalidade) | `infancia.png`, `1982.jpeg` | — (texto-terminal, "boot screen") |
| **F2 · O Treinamento** (1995–1999) | **Low-poly / wireframes verdes (Matrix)**: malhas `wireframe:true`, chuva de glyphs, glitch sutil | Adolescência — Dragon Ball/Zillion (evolução por níveis), Pentium 100MHz, Doom/TIE Fighter; "de espectador → operador" | Currículo: **Curso Técnico em Processamento de Dados** (Colégio Guarani, 1997–1999) | `programa.jpg` | "boot log" / lista ASCII de skills |
| **F3 · A Rede Discada** (2000–2009) | **Linhas de dados conectando nós**: `LineSegments` entre pontos, pacotes viajando pelas arestas (discada→banda larga) | Início adulto — internet discada→banda larga, "quero entender, não só usar"; 2009 o amor | **Bacharelado SI Mackenzie** (2001–2005); **Sysgen** (2003–2012, J2EE/MDA/UML); **Telefônica** (2005–2008) | `formatura.jpg`, `eldorado.jpg`, `callcenter.jpg`, `casamento.jpg` | cards de timeline (nós conectados) |
| **F4 · A Nuvem Corporativa** (2010–2019) | **Blocos sólidos e limpos (microsserviços)**: `InstancedMesh` de cubos em grade, luz suave, profundidade ordenada | Família/consolidação — filha (2012), gêmeos (2016); "de executor a analista→arquitetura"; "proteger redefine propósito" | **Indra** (2012–2017, mobile/AWS/Android); **Serasa** (2017–18, OAuth2/Apigee); **STAR 2018** *Transição do Time de Sustentação*; **STAR 2019** *Sustentação AFVC*; **STAR 2020** *Economia +R$3MM no contrato Salesforce*; *Sustentação Core Rede (GE1/WF1, Splunk)* | `filha.jpeg`, `gemeos.jpeg`, `familia.jpeg` | **acordeão STAR estilo dashboard** + KPI tiles |
| **⟐ O Marco do Arquiteto** *(interstício F4→F5)* | **Clímax do morphing: blocos → rede neural** — os cubos de microsserviço se dissolvem em nós que se reorganizam como rede neural | Transição **Analista → Arquiteto** — *"Deixei de construir sistemas. Passei a desenhar sistemas."* | Síntese de carreira (cf. *Arquitetura de Soluções*, Itaú/Rede) | — | **bloco-marco full-bleed** (frase única, centralizada) — ver §4.5 |
| **F5 · O Prompt da IA** (2020–2026) | **Rede neural fluida, etérea, holográfica**: nuvem de partículas conectada, bloom, fluxo orgânico | Maturidade — "crescer com precisão", tecnologia como extensão da mente; reflexão "de herói a mentor" | **Últimos grandes marcos:** **2024** *Agrupamento Comercial (10d→tempo real)*; **2025** *Pipe Automática (+15% nas metas)*. **Foco atual — certificações IA 2025:** AI Agentic Design Patterns · AI Agents with LangGraph · AI with Knowledge Graphs · GenAI for Leaders. *(demais casos 2022–2023 no `<details>` agregador / CV)* | `careca.jpeg` | **STAR como "respostas geradas" de chat** + **KPI Final Agregado** (§4.6) + CTA final |

### 4.3 Curadoria de casos STAR (evitar sobrecarga)

São ~20 casos no `llms-full.txt`. **Não** exibir todos no fluxo. Política:
- **Em destaque no fluxo (6–7 "hero cases")**: Pipe Automática (+15%), Agrupamento Comercial (10d→tempo real), Economia +3MM, Conta PJ Cockpit, D0/Ipricing 2.0, Callback WF, Transição de Sustentação (2018, marco da era Rede).
- **Demais casos**: colapsados em um `<details>` "Ver todos os casos (2018–2025)" no fim da Fase 5, e/ou delegados ao CV (`index.html`) que já renderiza STAR completo.
- Cada hero case usa o número-resultado como **isca visual** (KPI badge): `+15%`, `−3MM`, `10d→0`, `D0`.

### 4.4 Vídeo do YouTube
Inserido na Fase 5 como **facade leve** (clique-para-carregar): thumbnail estática + botão ▶; o `<iframe>` só é injetado no clique (performance + privacidade). `nocookie` domain.

### 4.5 O Marco do Arquiteto (interstício narrativo F4 → F5)

Entre as Fases 4 e 5, um **beat de transição full-bleed** marca a virada de **Analista → Arquiteto** — a mudança de papel que dá sentido à Fase 5 (mentoria/IA).

- **Copy (frase única, grande, centralizada):** *"Deixei de construir sistemas. Passei a desenhar sistemas."*
- **Apoio (uma linha):** "De executor a analista, de analista a arquiteto — de resolver problemas a antecipá-los."
- **Visual (WebGL):** é o **clímax do morphing semântico** — os blocos de microsserviço (F4) se dissolvem em nós que se reorganizam como rede neural (F5). É o ponto em que `setProgress` cruza a fronteira `blocks→neural` (§3.2).
- **Foreground:** `<section class="era marco" data-theme="ai">` curta (≈1 viewport), **sem card/scrim** — só a frase sobre o morph. `aria-label="Marco: de analista a arquiteto"`.
- **a11y / reduce-motion:** sem WebGL/movimento, a frase aparece sobre `--bg-fallback` (tema ai). É **texto real**, indexável — nunca imagem.

### 4.6 KPI Final Agregado (fechamento da Fase 5)

Bloco visual de fechamento **para recrutadores** — uma *stat band* de leitura imediata, logo após o último STAR e **antes** do CTA. Números agregados como **texto real** (não imagem), contraste AA:

| KPI | Valor |
|:--|:--|
| Experiência em tecnologia | **+20 anos** |
| Em grandes empresas | **+15 anos** (Telefônica · Indra · Serasa · Rede) |
| Como Tech Lead (Rede) | **7 anos** |
| Foco atual | **IA Agêntica & Arquitetura de Soluções** |
| Impacto destacado | **−R$3MM** custos · **+15%** metas · **10 dias → tempo real** |

- **Marcação:** `<section class="kpi-final" aria-label="Resumo de carreira">` com `<dl>` (par rótulo/valor) — semântico e acessível.
- **Estilo:** números grandes com `--accent`/bloom da F5; sem quebrar o fluxo de leitura.

---

## 5. Componentes Chave da Interface

Todos os componentes consomem as variáveis de tema (§2), então **a mesma marcação muda de pele** entre as eras. Os casos STAR aparecem sobretudo em **F4 (Nuvem)** e **F5 (IA)** — onde está a carreira —, com três tratamentos visuais reaproveitáveis. Abaixo, o componente STAR (peça central) e os demais.

### 5.1 Caso STAR — base semântica única (`<details>`)

Marcação **única**, acessível e funcional sem JS:

```html
<article class="star reveal" data-year="2024">
  <details>
    <summary>
      <span class="star__kpi">10d → tempo real</span>
      <span class="star__title">Agrupamento Comercial</span>
      <span class="star__hint">ver detalhes</span>
    </summary>
    <div class="star__body">
      <p class="star__s"><b>Situação:</b> SLA de até 10 dias e processo manual sem validação de arranjo.</p>
      <p class="star__t"><b>Tarefa:</b> modernizar com validação e efetivação em tempo de proposta.</p>
      <p class="star__a"><b>Ação:</b> discovery + app de validação de participantes (Java/AWS/APIs).</p>
      <p class="star__r"><b>Resultado:</b> efetivação <b>em tempo real</b> (de 10 dias para instantâneo).</p>
      <ul class="star__stack"><li>Java</li><li>AWS</li><li>APIs</li></ul>
    </div>
  </details>
</article>
```
- **a11y**: `<summary>` é foco/teclado nativo; expand/collapse sem JS; sem ARIA custom.
- **Não quebra a leitura**: fechado, é uma linha (KPI + título) dentro do fluxo; aberto, expande *empurrando* o conteúdo abaixo (nada sobrepõe, nada vira modal).

### 5.2 As três personalidades do mesmo card

| Tratamento | "Terminal" (F1/F2) | "Dashboard" (F3/F4) | "Chat IA" (F5) |
|:--|:--|:--|:--|
| **Metáfora** | Saída de comando | Card de dashboard | Resposta gerada de chat |
| `summary` | `> case --year 2018` com cursor | linha-título + chevron, hover eleva | bolha "prompt" do usuário |
| `body` aberto | bloco monospace, prefixo `│ ` | grid S/T/A/R + **KPI tiles** | texto que "streama" (typing, §5.4), avatar ◆ |
| Borda/raio | `--radius:0`, verde/wire | `--radius:8–14`, scrim azul | `--radius:16`, glow roxo (bloom) |
| KPI | `[RESULT]=+15%` em âmbar | badge pill colorida | número grande + `drop-shadow` |

CSS comuta via seletor de tema, sem trocar HTML:
```css
.theme-terminal .star summary::before { content:"> "; }
.theme-ai       .star .star__body     { /* streaming styles */ }
```

### 5.3 Demais componentes

| Componente | Descrição | Notas a11y |
|:-----------|:----------|:-----------|
| **Timeline lateral** (`<nav aria-label="Linha do tempo">`) | Anos-marco; era ativa via `aria-current` | Some em mobile (vira barra de progresso fina no topo) |
| **Bloco narrativo** (`.passage`) | Parágrafos da `jornada.txt`; primeira linha como "frase-âncora" grande | Texto real; reveal é só opacidade/translateY curto |
| **Figura/foto** (`<figure>`) | `loading="lazy"`, `width/height` fixos, `<figcaption>` | Alt descritivo por foto (ver §6.3) |
| **KPI badge** | `+15%`, `−3MM`, `D0` | Texto real (não imagem); contraste AA por tema |
| **Hero prompt** | linha de terminal "digitando" | Texto íntegro no DOM; animação `aria-hidden` |
| **Facade de vídeo** | thumb + ▶ → injeta iframe no clique | `<button>` real com label "Assistir vídeo (YouTube)" |
| **CTA de saída** | grid de links: CV, 2D, 3D, contato | Links nativos, foco visível |
| **eco-nav** | componente `<eco-nav>` do ecossistema | Reusar `src/js/eco-nav.js` |

### 5.4 Efeito "digitando/gerando" sem prejudicar SR/SEO

```html
<p class="typed" data-typewriter>
  <span class="typed__real">De herói… para mentor.</span>     <!-- lido por SR, indexável -->
</p>
```
```js
function initTypewriters() {
  document.querySelectorAll('[data-typewriter]').forEach(p => {
    const real = p.querySelector('.typed__real');
    const text = real.textContent;
    real.setAttribute('aria-hidden', 'false');     // SR lê o texto final
    const fx = document.createElement('span');      // clone só-visual
    fx.className = 'typed__fx'; fx.setAttribute('aria-hidden', 'true');
    real.style.position = 'absolute'; real.style.clip = 'rect(0 0 0 0)'; // visualmente oculto, audível
    p.appendChild(fx);
    let i = 0; (function tick(){ fx.textContent = text.slice(0, i++);
      if (i <= text.length) setTimeout(tick, 28); })();
  });
}
```
> O texto verdadeiro permanece no DOM (acessível/indexável); o efeito é um clone `aria-hidden`. Sob `prefers-reduced-motion`, o efeito nem inicia — o texto real volta a ser visível.

---

## 6. Acessibilidade, SEO/AEO, Performance, Responsividade

### 6.1 Acessibilidade (a11y) — gate axe AA obrigatório
- **Landmarks**: `header/main/footer/nav`; uma `<h1>` (hero) e `<h2>` por era, hierarquia sem saltos.
- **Skip link** "Pular para o conteúdo".
- **Foco visível** (`:focus-visible`) em todos os interativos, nos cinco temas.
- **`prefers-reduced-motion`**: desliga o voo de câmera (`scrub:false`), congela a cena WebGL em 1 frame por fase, e desliga typing/smooth-scroll (ver §3.5/§7).
- **Sem armadilha de conteúdo oculto**: nada essencial atrás de animação ou `display:none` dependente de JS.
- **Conteúdo legível sem JS/sem WebGL**: o canvas é `aria-hidden`; sem JS, a página usa fundo CSS sólido (`--bg-fallback`) e mostra tudo. WebGL é puramente decorativo.

### 6.2 Matriz de contraste (verificar no gate)

Contraste medido contra o **scrim** do card (não contra a cena WebGL, que varia) — o scrim define o fundo efetivo.

| Tema (fase) | Texto / Fundo efetivo (scrim) | Ratio alvo |
|:--|:--|:--|
| Terminal (F1) | `#33ff66` / `#0a0a02` | ~12:1 ✅ |
| Terminal âmbar (F1) | `#ffb000` / `#0a0a02` | ~10:1 ✅ |
| Wire (F2) | `#7cffb2` / `#02100a` | ~11:1 ✅ |
| Net (F3) | `#cde3ff` / `#08111f` | ~12:1 ✅ |
| Nuvem (F4 · dark premium, v2.2) | `#c6d3e6` / `#0e141d` | ~11:1 ✅ |
| IA (F5) | `#d7dde7` / `#0b0d12` | ~13:1 ✅ |

### 6.3 Alt-text das fotos (rascunho)

| Arquivo | `alt` proposto | Era |
|:--|:--|:--|
| `1982.jpeg` | "Maurício recém-nascido, 1982 — o início da jornada" | Hero/F1 |
| `infancia.png` | "Infância nos anos 80, diante da TV de tubo" | F1 |
| `programa.jpg` | "Primeiros passos em programação/computador" | F1 |
| `formatura.jpg` | "Formatura em Sistemas de Informação (Mackenzie)" | F2 |
| `eldorado.jpg` | "Início da vida profissional em tecnologia" | F2 |
| `callcenter.jpg` | "Ambiente corporativo no começo da carreira" | F2 |
| `casamento.jpg` | "2009 — casamento, o amor da sua vida" | F2 |
| `filha.jpeg` | "2012 — nascimento da filha" | F2 |
| `gemeos.jpeg` | "2016 — chegada dos gêmeos" | F2 |
| `familia.jpeg` | "A família, eixo central da jornada" | F2 |
| `careca.jpeg` | "Maurício hoje — arquiteto e mentor" | F3 |

> Confirmar a leitura real de cada imagem antes de fixar o `alt` (algumas inferências acima precisam de validação visual).

### 6.4 SEO / AEO-GEO (integra `scripts/seo/*`)
- `title`, `meta description`, canonical, OG/Twitter (gerar `og:image` via `scripts/seo/gen-og`).
- **JSON-LD**: `Person` (Maurício) + `ProfilePage` + `BreadcrumbList`; opcional `ItemList` dos marcos.
- **Bloco visível AEO** + **arquivo `.md` gêmeo** gerados pelo injetor idempotente do motor AEO (a página entra no `tests/aeo.spec.js` que cresce sozinho).
- Registrar nó em `specs/ecosystem.nav.yaml` (pilar narrativo) + crosslinks reais (CV, life, life3d, catálogo).

### 6.5 Performance (orçamento) — foreground
- **JS de foreground** enxuto; o **WebGL (`three`+`gsap`)** tem orçamento próprio em **§7**.
- Imagens: `loading="lazy"`, dimensões explícitas (evitar CLS), servir WebP/AVIF quando possível.
- Vídeo: facade (sem iframe até o clique).
- Fontes: `display=swap`, `preconnect` (padrão já usado em `life.html`).
- Meta: a **narrativa** (texto/HTML) renderiza < 1s e **sem depender do canvas**; o bundle 3D é code-split e carrega em paralelo, nunca bloqueando o conteúdo (ver §7).

### 6.6 Responsividade (mobile-first)
- Base = 1 coluna fluida, `--container` em `ch`.
- Timeline lateral → **barra de progresso fina no topo** em `< 768px`.
- Grid S/T/A/R (F3/F4) → empilha em mobile.
- F5 já é centrada/estreita (combina com mobile).
- Mobile: WebGL em tier "low" (menos partículas, sem bloom, `dpr=1`) — ver §7.3.
- Alvos de toque ≥ 44px; `summary` com padding generoso.
- `100dvh` no hero (padrão de `life3d.html`) para evitar pulo da barra do navegador móvel.

---

## 7. Performance Budget — WebGL (Three.js)

Orçamento e disciplina para o fundo 3D **nunca** travar o navegador nem atrasar o conteúdo. Regra de ouro: **o foreground é sagrado; o WebGL é sacrificável**.

### 7.1 Metas
| Métrica | Alvo |
|:--|:--|
| Bundle `three`+`gsap` (gzip) | ≤ ~160 KB, **code-split** (carrega após o HTML/CSS críticos) |
| Frame budget | 60 fps desktop / ≥ 30 fps mobile; **degradar antes de travar** |
| Draw calls por fase | ≤ ~30 (usar `InstancedMesh` / geometria mesclada) |
| Partículas (F1/F5) | ≤ ~3–5k (`Points` + 1 material), nunca meshes individuais |
| `devicePixelRatio` | `min(dpr, 2)` (cap) — evita render 3× em telas retina |
| Memória GPU | estável: zero crescimento por scroll (sem leaks) |

### 7.2 Técnicas obrigatórias
- **Object pooling**: criar geometrias/materiais **uma vez** em `createScene` e reusá-los; nada de `new` por frame ou por scroll. Partículas e nós saem de pools fixos; trocar de fase só altera `visible`/`opacity`/uniforms.
- **`dispose()` disciplinado**: ao destruir a cena (`pagehide`/navegação), chamar `geometry.dispose()`, `material.dispose()`, `texture.dispose()` e `renderer.dispose()`/`renderTarget.dispose()`. Sem isso, contextos WebGL vazam.
- **Resize adaptativo (debounced)**: `resize` recalcula `camera.aspect`, `renderer.setSize` e `setPixelRatio` com **debounce ~150 ms**; em telas pequenas, reduzir partículas e desligar bloom.
- **Pausar fora de vista**: `IntersectionObserver` no `<canvas>` / `document.hidden` → não solicitar frames quando a aba ou o herói não estão visíveis (economiza bateria).
- **Render sob demanda (3 modos) — sem `ticker` contínuo** (corrige a contradição da v2.0):
  - **Idle**: nada na tela muda → **nenhum** frame renderizado (0% CPU/GPU). Não há `gsap.ticker.add` permanente.
  - **Scroll**: o `onUpdate` da timeline-mestra chama `requestRender()` → **1 frame** por evento de scroll (morph + câmera).
  - **Animation**: fase com movimento próprio (drift do CRT, fluxo neural) → `tick()` se auto-reagenda via `requestAnimationFrame` **enquanto `isAnimating()`**, e para ao sair. Sob `prefers-reduced-motion`, este modo é desligado (`setAnimating(false)` → 1 frame por mudança).
- **Morphing barato (sem recriar cenas)**: a transição entre fases é interpolação de atributos de **um único** sistema (morph contínuo, §3.2) — nunca instanciar/descartar cenas por fase.
- **Bloom só onde paga (F5)**: post-processing pesado restrito à fase neural; desligado em mobile/low-end.

### 7.3 Detecção de capacidade & degradação graciosa
```js
function tier() {
  const gl = document.createElement('canvas').getContext('webgl2')
          || document.createElement('canvas').getContext('webgl');
  if (!gl) return 'none';                                   // → fallback CSS
  const mobile = matchMedia('(max-width: 768px)').matches;
  const lowMem = (navigator.deviceMemory || 4) <= 4;
  return (mobile || lowMem) ? 'low' : 'high';
}
// 'none' → body.no-webgl (fundo CSS sólido por tema)
// 'low'  → menos partículas, sem bloom, dpr=1, scrub mais "duro"
// 'high' → experiência completa
```

### 7.4 Fallback (WebGL ausente ou falho)
- `createScene` dentro de `try/catch`; em falha → `body.classList.add('no-webgl')`.
- `body.no-webgl` aplica `--bg-fallback` sólido por tema (o foreground fica idêntico, só perde a atmosfera 3D).
- **`prefers-reduced-motion`**: sem voo de câmera, 1 frame estático por fase, sem partículas animadas.
- **Sem JS**: sem canvas, sem GSAP — o HTML semântico com fundo CSS sólido permanece 100% legível e indexável.
- O gate (§9, M9) inclui um teste com **WebGL forçadamente desabilitado** para provar que a página continua íntegra.

### 7.5 Safari / iOS — context loss & `backdrop-filter` (validação obrigatória)

iOS Safari é o ambiente de maior risco: GPU/memória restritas, descarte agressivo de contexto WebGL e custo alto de `backdrop-filter`. Tratamento explícito:

**(a) Perda de contexto WebGL (*WebGL Context Loss*)**
- iOS descarta o contexto sob pressão de memória ou ao voltar de *background*. Obrigatório:
  ```js
  canvas.addEventListener('webglcontextlost', e => {
    e.preventDefault();                       // sem isto, o 'restored' nunca dispara
    body.classList.add('no-webgl');           // mostra o fundo CSS sólido (foreground intacto)
  });
  canvas.addEventListener('webglcontextrestored', () => {
    body.classList.remove('no-webgl');
    S.rebuild();                              // recria TODOS os recursos GPU (morrem com o contexto)
    requestRender();
  });
  ```
- Regra: **todo** recurso GPU (geometrias, materiais, render targets, texturas) precisa ser recriável em `rebuild()` — nada de estado GPU "órfão".

**(b) `backdrop-filter` (scrim) no iOS**
- iOS só tem `-webkit-backdrop-filter`; o blur sobre um `<canvas>` fixo é caro e pode causar *flicker*/faixas.
- Mitigação — **feature-detect + degradar**: se `CSS.supports('backdrop-filter','blur(2px)')` falhar **ou** tier iOS/low → aplicar `body.no-backdrop`, trocando o scrim translúcido por um **scrim sólido/opaco** (sem blur), preservando AA:
  ```css
  body.no-backdrop .panel,
  body.no-backdrop .star > details {
    backdrop-filter: none; -webkit-backdrop-filter: none;
    background: var(--surface-solid);   /* versão opaca (alpha ≥ .92) por tema */
  }
  ```
- Cada tema define `--surface-solid` (mesma cor do scrim, alpha alto) — legibilidade garantida sem o filtro.

**(c) Outras notas iOS**
- `100dvh` (já adotado) para a barra dinâmica do Safari.
- Tier **'low'** por padrão em iOS (menos partículas, sem bloom, `dpr=1`).
- Testar com **Low Power Mode** (limita `requestAnimationFrame` a ~30 fps) — o orçamento de fps precisa caber nesse teto.

---

## 8. Riscos e Decisões em Aberto

| # | Risco / Tensão | Severidade | Mitigação |
|:--|:--|:--|:--|
| R1 | ~~Tema "Nuvem" claro (F4) contraria o STYLE_GUIDE~~ — **RESOLVIDO (v2.2)** | — | F4 passou a "Dark Mode Premium" (cinza-azulado + glass); a jornada é toda escura e contínua, sem exceção ao Dark-Tech |
| R2 | Legibilidade do texto sobre cena WebGL animada | **Alta** | Scrim obrigatório (`--surface` alpha + `backdrop-filter`) em todo bloco de texto; fallback `--surface-solid` sem blur onde `backdrop-filter` falha (§7.5); auditar AA no pior frame (mais claro) da cena |
| R3 | WebGL trava/aquece em mobile/low-end | **Alta** | Tiers de capacidade (§7.3), `dpr` cap, menos partículas, sem bloom; pausar fora de vista; degradar antes de travar |
| R4 | Peso do bundle `three`+`gsap` atrasa o conteúdo | Média | Code-split do 3D; HTML/CSS críticos primeiro; canvas carrega depois e nunca bloqueia (§7.1) |
| R5 | Vazamento de memória/contexto WebGL | Média | `dispose()` disciplinado + object pooling; teste de estabilidade de memória no scroll (§7.2) |
| R6 | Excesso de casos STAR sobrecarrega o fluxo | Média | Curadoria de 6–7 hero cases; resto em `<details>` agregador e no CV (§4.3) |
| R7 | `alt` das fotos inferido (não validado) | Baixa | Inspecionar cada imagem antes de fixar legendas (§6.3) |
| R8 | Custo de carregar 3 famílias de fonte | Baixa | VT323 + IBM Plex Mono só em F1/F2; Inter já é da casa; `display=swap` |
| R9 | Conflito de naming/rota no Vite | Baixa | Nome `terminal-evolutivo.html` é único; glob já cobre |
| R10 | Briefing original proibia Three.js/Canvas | Info | **Revogado** pela v2.0; promessa de a11y preservada via fallback (a página funciona sem WebGL) |
| R11 | **iOS Safari: perda de contexto WebGL & custo do `backdrop-filter`** | **Alta** | Handlers `webglcontextlost`/`restored` + `rebuild()`; `body.no-backdrop` com scrim sólido; tier 'low' + Low Power Mode no QA (§7.5) |
| R12 | Anacronismo: STAR 2020 (+3MM/Splunk) exibidos em F4 (2010–2019) | Baixa | Decisão **narrativa** de balanceamento; F4 enquadrada como "Consolidação Corporativa" (ponte 2019→2020), não cronologia estrita |

**Decisões em aberto para o dono do produto** (não bloqueiam o início):
1. Estado pré-JS / sem-WebGL: assumido `theme-ai` com `--bg-fallback`. Confirmar (alternativa: `theme-terminal` como "tela de boot").
2. Profundidade do CV embutido vs. delegar 100% ao `index.html`.
3. Trilha sonora/efeitos (dial-up, beep)? (default: **não**, por a11y/autoplay).
4. Intensidade do 3D: "cena de fundo discreta" (recomendado) vs. "experiência 3D protagonista" — define o orçamento de §7.

---

## 9. Plano de Execução (Milestones)

Construção incremental — cada passo entrega algo verificável; o gate (Playwright+axe) roda ao fim. **Ordem deliberada**: o foreground acessível nasce e é validado **antes** do WebGL, para que a a11y nunca dependa do 3D.

> **M1 · Skeleton HTML semântico + conteúdo real (5 fases)** *(fundação)*
> - `src/terminal-evolutivo.html`: `header` (hero), `<canvas id="bg-webgl" aria-hidden>`, `main#story` com **5** `<section.era data-theme data-scene>`, `footer`.
> - Conteúdo real: passagens da `jornada.txt` (5 arcos), STAR curados (§4.3), `<figure>` das fotos, CTA.
> - **Critério**: página 100% legível e navegável **sem CSS, sem JS e sem WebGL**.

> **M2 · CSS de foreground + 5 temas + scrim** *(a pele)*
> - `:root` foreground + `.theme-terminal/.theme-wire/.theme-net/.theme-cloud/.theme-ai` (§2.1); fundos transparentes; scrim com `backdrop-filter`; `.no-webgl` fallback sólido.
> - **Critério**: trocar a classe do `<body>` no DevTools muda o foreground suavemente; com `.no-webgl`, fundo sólido legível por fase.

> **M3 · Setup Three.js (cena base)** *(o palco 3D)*
> - `src/js/te-scene.js`: `createScene(canvas)` com renderer (`alpha:true`, `dpr` cap), câmera, e **um único campo morph** com 5 estados de fase (`crt/wire/nodes/blocks/neural`) em pools fixos.
> - Expor `render()`, `setProgress(p)` (morph contínuo), `isAnimating()`/`setAnimating()`, `resize()`, `dispose()`, `rebuild()`.
> - **Critério**: variar `setProgress(0→1)` no console morfa continuamente as 5 fases; `dispose()` limpa sem warnings; sem leak.

> **M4 · GSAP ScrollTrigger ⇄ cena ⇄ tema** *(a mágica)*
> - `src/js/terminal-evolutivo.js`: timeline-mestra com `scrub` cujo `onUpdate` chama `setProgress` (morph) + `requestRender`; tema do foreground por `onEnter`/`onEnterBack` (sem flicker); **render sob demanda** (sem `ticker` contínuo).
> - **Critério**: rolar morfa o fundo continuamente e voa a câmera; o tema troca na fase certa, **avançando e voltando**; em repouso, 0 frames renderizados.

> **M5 · Conteúdo das 5 cenas (shaders/efeitos)** *(direção de arte 3D)*
> - Implementar os 5 **estados de morph** (atributos-alvo): CRT+partículas (F1) → wireframes Matrix (F2) → nós/linhas (F3) → blocos/microsserviços (F4) → rede neural+bloom (F5). **Morphing semântico** entre estados (sem fade); clímax no Marco do Arquiteto (§4.5).
> - **Critério**: cada fase tem identidade distinta; a transição é contínua (um *vira* o outro); draw calls dentro do orçamento (§7.1).

> **M6 · Componentes STAR + mídia + cross-links** *(o conteúdo que vende)*
> - `.star` (`<details>`) tematizado por fase (terminal/dashboard/chat) sobre scrim; KPI badges; typewriter (clone `aria-hidden`); facade do vídeo; cross-links (CV, `life.html`, `life3d.html`, catálogo) + `<eco-nav>`.
> - **Marco do Arquiteto** (§4.5, interstício full-bleed F4→F5) + **KPI Final Agregado** (§4.6, `<dl>` para recrutadores).
> - **Critério**: mesmo card muda de pele entre eras; expand/collapse por teclado; vídeo só carrega no clique; Marco e KPI Final legíveis sem WebGL.

> **M7 · Performance Budget WebGL + a11y/responsividade (hardening)**
> - §7: tiers de capacidade, `dpr` cap, **render sob demanda (Idle/Scroll/Animation)**, pausar fora de vista, debounce de resize, `dispose` no `pagehide`, code-split do bundle 3D; **Safari/iOS**: handlers de *context loss* + `.no-backdrop` (scrim sólido) (§7.5).
> - a11y: skip link, foco visível nos 5 temas, matriz de contraste (§6.2), `alt` validados (§6.3); `prefers-reduced-motion` (scrub off + frame estático); fallback `.no-webgl`.
> - Mobile: timeline→barra de progresso; grids empilham; `100dvh`; tier "low" do WebGL.
> - **Critério**: 60/30 fps alvo; reduce-motion e no-WebGL plenamente íntegros; teclado completo.

> **M8 · SEO/AEO + ecossistema**
> - `scripts/seo/*` (meta, JSON-LD, bloco AEO, `.md` gêmeo, OG). Registrar em `ecosystem.nav.yaml` + crosslinks reais.
> - **Critério**: `tests/aeo.spec.js` reconhece a nova página.

> **M9 · Testes + gate verde**
> - Spec Playwright: (a) tema do foreground muda ao rolar até cada uma das 5 eras (via `onEnter`/`onEnterBack`, **sem flicker** em scroll curto); (b) `<details>` STAR expande; (c) `prefers-reduced-motion` desliga voo de câmera/morph animado/typing; (d) **WebGL desabilitado** → `body.no-webgl`, página íntegra e legível; (e) sem JS → conteúdo intacto; (f) axe sem violações AA nos 5 temas; (g) **render sob demanda**: 0 frames em idle; (h) **Marco do Arquiteto** e **KPI Final** presentes e legíveis sem WebGL.
> - **Matriz de navegadores** (CI + manual): Chromium, Firefox, **Safari macOS** e **Safari iOS**. No iOS, simular **WebGL context loss** (extensão `WEBGL_lose_context`) e validar recuperação via `rebuild()`, o fallback `.no-backdrop` (scrim sólido) e o comportamento sob **Low Power Mode** (§7.5).
> - **Critério**: gate completo verde (incluir a nova spec na contagem).

### 9.1 Ordem de dependências
```
M1 ─> M2 ─> M3 ─> M4 ─> M5 ─> M6 ─> M7 ─> M8 ─> M9
HTML  CSS   3D    GSAP  cenas STAR  perf  SEO   gate
  └ M1+M2 (foreground a11y) validados ANTES do WebGL (M3+).
  └ M7/M8 podem correr em paralelo após M6.
```

---

## 10. Apêndice — Esqueleto HTML de referência (resumido)

```html
<!DOCTYPE html>
<html lang="pt-BR" class="no-js">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Terminal Evolutivo: A Jornada de Maurício Issei | 1982–2026</title>
  <meta name="description" content="Da TV de tubo à IA agêntica: a evolução de Maurício Issei…">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=VT323&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet">
  <link href="./input.css" rel="stylesheet">
  <!-- <style> com :root (foreground) + .theme-* + #bg-webgl + scrim (§1.5/§2) -->
</head>
<body class="theme-terminal">
  <canvas id="bg-webgl" aria-hidden="true"></canvas>     <!-- fixo, z-index:-1 -->
  <a class="skip" href="#story">Pular para o conteúdo</a>

  <header class="hero" id="top"> … H1 + prompt piscando + CTA "iniciar ▸" … </header>

  <nav class="timeline" aria-label="Linha do tempo"> … 1982 · 1995 · 2000 · 2010 · 2020 … </nav>

  <main id="story">
    <section class="era" data-theme="terminal" data-scene="crt"    data-era="1982-1994" aria-labelledby="era1-title"> … </section>
    <section class="era" data-theme="wire"     data-scene="wire"   data-era="1995-1999" aria-labelledby="era2-title"> … </section>
    <section class="era" data-theme="net"      data-scene="nodes"  data-era="2000-2009" aria-labelledby="era3-title"> … </section>
    <section class="era" data-theme="cloud"    data-scene="blocks" data-era="2010-2019" aria-labelledby="era4-title"> … </section>
    <section class="era" data-theme="ai"       data-scene="neural" data-era="2020-2026" aria-labelledby="era5-title"> … </section>
  </main>

  <footer> … eco-nav + créditos … </footer>

  <!-- foreground sempre; o módulo decide se há WebGL (try/catch → body.no-webgl) -->
  <script>document.documentElement.classList.replace('no-js','js');</script>
  <script type="module" src="./js/terminal-evolutivo.js"></script>  <!-- importa gsap + te-scene -->
</body>
</html>
```

---

## 11. Referências cruzadas

- Narrativa: [`docs/references/jornada.txt`](../../../references/jornada.txt)
- Casos STAR / CV: [`public/llms-full.txt`](../../../../public/llms-full.txt)
- CV dinâmico: [`src/index.html`](../../../../src/index.html)
- Jogo 2D: [`src/life.html`](../../../../src/life.html) · Jogo 3D: [`src/life3d.html`](../../../../src/life3d.html) *(referência de canvas/loop 3D já no projeto)*
- Vídeo: https://www.youtube.com/watch?v=nQt9JjzXDd4
- Bibliotecas: Three.js (`three`, ES modules) · GSAP + ScrollTrigger (`gsap/ScrollTrigger`)
- Padrões da casa: [`ARCHITECTURE.md`](../../ARCHITECTURE.md) · [`STYLE_GUIDE.md`](../../STYLE_GUIDE.md) · [`TESTING_GUIDE.md`](../../TESTING_GUIDE.md) · [`SEO_ANALYTICS.md`](../../SEO_ANALYTICS.md)

---

**Conformidade SDD (v2.0)**: ✅ arquitetura híbrida (foreground HTML + background WebGL) · ✅ tematização CSS de foreground (5 temas) · ✅ engenharia de scroll GSAP ScrollTrigger ⇄ Three.js · ✅ mapeamento 5 fases × cena WebGL × STAR × foto · ✅ componentes STAR sem quebra de fluxo · ✅ **Performance Budget WebGL (§7)** · ✅ milestones M1–M9 com setup 3D · ✅ a11y/SEO/fallback. **Nenhum código de produção foi escrito** — este documento o especifica.
