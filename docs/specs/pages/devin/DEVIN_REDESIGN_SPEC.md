# ESPECIFICAÇÃO AGÊNTICA DEFINITIVA — REDESIGN DEVIN PAGE
**Projeto:** Vibe Coding com Devin — Mauricio Yokoyama Issei  
**Classificação:** Especificação Técnica Premium para Claude Code  
**Versão:** 1.0  
**Data:** 2026  

---

## CONTEXTO DE EXECUÇÃO PARA O AGENTE

Esta especificação descreve o redesign completo da página `devin.html`. O agente deve **editar os arquivos existentes** — nunca recriar do zero. O conteúdo narrativo está correto e não deve ser alterado. O que muda é:

1. **A arquitetura do código** (organização, separação de concerns)
2. **O sistema visual** (componentes, layouts, hierarquia)
3. **O sistema de motion** (GSAP, Lenis, SplitType)
4. **Novos componentes** (Bento Grid, diagrama ReAct, ToC, tooltips)
5. **A ergonomia cognitiva** (respiros, ritmo, escaneabilidade)

**Princípio de decisão do agente:** Toda alteração deve reduzir carga cognitiva sem perder profundidade intelectual.

---

## 1. DIAGNÓSTICO CONSOLIDADO DO CÓDIGO ATUAL

### 1.1 Problemas de Arquitetura CSS

**Problema crítico:** O arquivo `devin.html` contém um bloco `<style>` massivo dentro do `<body>` (linhas ~2496–4035) com todos os estilos dos Épicos 07, 08 e 09. Isso viola separação de concerns e torna a manutenção impossível.

**Problema secundário:** Dezenas de `style=""` inline ao longo do HTML (ex: `style="margin-top: 1.5rem; padding: 1.25rem; background: rgba(255,98,0,0.07)..."`). Esses devem ser convertidos para classes semânticas.

**Estrutura atual de arquivos:**
```
devin.html        ← 4.044 linhas, contém HTML + <style> inline
devin.css         ← 870 linhas (Base + Épicos 01-06)
[devin.js]        ← referenciado mas não fornecido (reimplementar)
```

**Estrutura alvo:**
```
devin.html        ← apenas HTML semântico + scripts
devin.css         ← todo CSS consolidado (todos os épicos)
js/
  devin.js        ← entry point + Lenis init
  motion.js       ← GSAP + ScrollTrigger + SplitType
  components.js   ← tabs, tooltips, ToC
```

### 1.2 Problemas de UX Cognitiva

| Problema | Localização | Impacto |
|---|---|---|
| Monotonia linear | Todas as seções | Alto — fadiga de scroll |
| Ausência de landmarks visuais | Global | Alto — usuário perde localização |
| 4 Pilares em lista horizontal | Seção 10 | Alto — não transmite framework |
| ReAct loop em linha horizontal | Seção 11 | Alto — não transmite ciclo |
| Chef roles em cards simples | Seção 8 | Médio — não usa diagrama tripartite |
| Estrutura de pastas em `<pre>` puro | Seção 18 | Médio — cognitivamente exaustivo |
| Inline styles nos blocos EPOCH, Human-IA modes | Seção 22, 33 | Médio — código frágil |
| Seção de vídeos como lista de links simples | Seção 33 | Médio — oportunidade de card grid |
| Ausência de ToC sticky | Global | Médio — desorientação em scroll longo |
| Ausência de tooltips em jargões | Múltiplas | Baixo-médio — barreira para leigos |

### 1.3 Problemas de Motion

- `js-hero-title`, `js-split-text`, `js-hero-scroll-icon` etc. estão declarados no HTML mas **não têm implementação GSAP correspondente** no JS fornecido
- Lenis referenciado no CSS (`html.lenis`) mas não implementado
- Nenhum ScrollTrigger implementado
- SplitType não instalado

---

## 2. STACK TECNOLÓGICA

### 2.1 Dependências a adicionar via CDN no `<head>`

```html
<!-- Lenis — smooth scroll -->
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>

<!-- GSAP + plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitType.min.js"></script>
```

> **Nota:** SplitType é uma biblioteca separada do GSAP. Usar o CDN correto:  
> `https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js`

### 2.2 Fontes — adicionar ao `<head>` existente

Adicionar `JetBrains Mono` ao preload existente:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

---

## 3. SISTEMA DE DESIGN — TOKENS DEFINITIVOS

### 3.1 Paleta de Cores com Semântica Cognitiva

O princípio central: **laranja = humano, ciano = máquina/IA**. Toda vez que a responsabilidade humana for citada, a cor quente entra em cena. Toda vez que o processamento da IA for citado, o ciano aparece.

```css
:root {
  /* === BACKGROUNDS === */
  --bg-navy:     #002D62;  /* Base — Ato I */
  --bg-dark:     #0B1F33;  /* Seções escuras */
  --bg-surface:  #1A1D21;  /* Superfícies técnicas */
  --bg-void:     #06101C;  /* Respiros máximos */

  /* === CORES SEMÂNTICAS === */
  /* Humano — julgamento, estratégia, contexto, maestria */
  --color-human:        #FF6200;  /* Laranja principal */
  --color-human-dim:    rgba(255, 98, 0, 0.12);
  --color-human-border: rgba(255, 98, 0, 0.25);
  --color-human-glow:   0 0 24px rgba(255, 98, 0, 0.35);

  /* IA / Máquina — processamento, execução, loop ReAct */
  --color-ai:        #00C2A8;  /* Ciano/turquesa */
  --color-ai-dim:    rgba(0, 194, 168, 0.10);
  --color-ai-border: rgba(0, 194, 168, 0.22);
  --color-ai-glow:   0 0 24px rgba(0, 194, 168, 0.28);

  /* === TIPOGRAFIA === */
  --text-primary:   #F5F7FA;
  --text-secondary: #94A3B8;
  --text-muted:     #64748B;
  --text-dim:       #334155;

  /* === BORDAS === */
  --border-subtle:  rgba(255, 255, 255, 0.06);
  --border-medium:  #1E293B;
  --border-strong:  #334155;

  /* === MOTION === */
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-quart:  cubic-bezier(0.5, 0, 0.75, 0);
  --duration-fast:  0.3s;
  --duration-base:  0.6s;
  --duration-slow:  1.0s;
  --duration-epic:  1.4s;
}
```

### 3.2 Sistema Tipográfico

```css
/* FILOSOFIA: Serifado para narrativa, Sans para técnica, Mono para código */

/* Títulos filosóficos — Playfair Display */
.type-manifesto {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

/* Títulos de seção — Inter bold */
.type-section-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.025em;
}

/* Corpo filosófico — measure controlada */
.type-body-philosophical {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 1.8vw, 1.125rem);
  line-height: 1.75;
  max-width: 68ch; /* Measure: 65-75 chars */
  color: var(--text-secondary);
}

/* Corpo técnico — mais compacto */
.type-body-technical {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.65;
  max-width: 72ch;
  color: var(--text-secondary);
}

/* Código */
.type-code {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.8125rem;
  line-height: 1.6;
}

/* Eyebrow */
.type-eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-human);
}
```

---

## 4. SISTEMA DE MOTION — REGRAS GLOBAIS

### 4.1 Configuração Lenis

```javascript
// js/devin.js
const lenis = new Lenis({
  duration: 1.2,           // Inércia generosa para sensação cinematográfica
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 0.9,    // Levemente mais lento para profundidade
  smoothTouch: false,      // Desabilitar em touch (performance mobile)
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integração GSAP
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
```

### 4.2 Configuração GSAP ScrollTrigger

```javascript
// js/motion.js
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  start: 'top 85%',      // Trigger antes do elemento estar completamente visível
  end: 'top 20%',
  toggleActions: 'play none none none',
  once: true,            // Animações de entrada: uma vez só
});
```

### 4.3 Padrões de Animação por Categoria

**Fade + Rise (elementos de texto):**
```javascript
// Uso: qualquer parágrafo, subtítulo, corpo de texto
gsap.from(element, {
  y: 32,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: { trigger: element, start: 'top 88%' }
});
```

**Stagger Cards:**
```javascript
// Uso: grids de cards, listas de pilares, steps
gsap.from(cards, {
  y: 48,
  opacity: 0,
  duration: 0.7,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: { trigger: container, start: 'top 80%' }
});
```

**Split Text Reveal (títulos heroicos):**
```javascript
// Uso: blockquotes de impacto, títulos de atos
const split = new SplitType(element, { types: 'words' });
gsap.from(split.words, {
  y: '110%',
  opacity: 0,
  duration: 0.9,
  stagger: 0.04,
  ease: 'power4.out',
  scrollTrigger: { trigger: element, start: 'top 82%' }
});
```

**Linha por Linha (frases de propósito):**
```javascript
// Uso: seções de propósito, pausa vibe coding
gsap.from(lines, {
  opacity: 0,
  y: 20,
  duration: 0.7,
  stagger: 0.25,
  ease: 'power2.out',
  scrollTrigger: { trigger: container, start: 'top 75%' }
});
```

**Draw SVG (diagramas, setas, círculos ReAct):**
```javascript
// Uso: setas de diagrama, paths do loop ReAct
gsap.from(svgPath, {
  strokeDashoffset: svgPath.getTotalLength(),
  duration: 1.2,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: diagram, start: 'top 70%' }
});
```

**Counter Reveal (números, percentuais):**
```javascript
// Uso: métricas de ACUs, percentuais de coverage
gsap.from(counter, {
  textContent: 0,
  duration: 1.5,
  snap: { textContent: 1 },
  ease: 'power2.out',
  scrollTrigger: { trigger: counter, start: 'top 80%' }
});
```

### 4.4 Regras Anti-Excesso

- **Nunca** animar mais de 4 elementos simultaneamente sem stagger
- **Nunca** usar `duration` > 1.4s em qualquer animação
- **Nunca** usar efeitos de paralax em blocos de texto — apenas em backgrounds
- **Nunca** reutilizar a mesma animação em seções consecutivas — variar intensidade
- **Sempre** usar `ScrollTrigger.once: true` para animações de entrada (não resetar)
- **Sempre** respeitar `prefers-reduced-motion`:

```javascript
const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!motionOk) { /* Skip all GSAP animations, Lenis disabled */ }
```

---

## 5. COMPONENTE GLOBAL: STICKY TABLE OF CONTENTS

### 5.1 Comportamento

- Aparece após o Hero sair da viewport (ScrollTrigger)
- Flutua no lado esquerdo da tela em desktop (≥1280px), oculto em mobile
- Rastreia a seção atual via IntersectionObserver (não ScrollTrigger — mais performático)
- Highlight ativo usa a cor semântica do ato atual

### 5.2 HTML a inserir após `<nav class="devin-nav">`

```html
<aside class="devin-toc" id="devin-toc" aria-label="Navegação por seção" role="navigation">
  <div class="devin-toc__track">
    <!-- Ato I -->
    <div class="devin-toc__act" data-act="1">
      <span class="devin-toc__act-label">Ato I</span>
      <nav class="devin-toc__links">
        <a href="#abertura"         class="devin-toc__link" data-toc="abertura">Abertura</a>
        <a href="#fundamentos"      class="devin-toc__link" data-toc="fundamentos">Fundamentos</a>
        <a href="#calculadora"      class="devin-toc__link" data-toc="calculadora">Calculadora</a>
        <a href="#cozinheiro"       class="devin-toc__link" data-toc="cozinheiro">O Chef</a>
      </nav>
    </div>
    <!-- Ato II -->
    <div class="devin-toc__act" data-act="2">
      <span class="devin-toc__act-label">Ato II</span>
      <nav class="devin-toc__links">
        <a href="#comunicacao-ia"     class="devin-toc__link" data-toc="comunicacao-ia">4 Pilares</a>
        <a href="#anatomia-devin"     class="devin-toc__link" data-toc="anatomia-devin">Anatomia</a>
        <a href="#contexto-persistente" class="devin-toc__link" data-toc="contexto-persistente">Contexto</a>
        <a href="#skills-playbooks"   class="devin-toc__link" data-toc="skills-playbooks">Arsenais</a>
      </nav>
    </div>
    <!-- Ato III -->
    <div class="devin-toc__act" data-act="3">
      <span class="devin-toc__act-label">Ato III</span>
      <nav class="devin-toc__links">
        <a href="#mentoria"      class="devin-toc__link" data-toc="mentoria">SDD</a>
        <a href="#lideranca"     class="devin-toc__link" data-toc="lideranca">Maestria</a>
        <a href="#amplificacao"  class="devin-toc__link" data-toc="amplificacao">Orquestra</a>
        <a href="#cultura"       class="devin-toc__link" data-toc="cultura">Cultura</a>
        <a href="#fechamento"    class="devin-toc__link" data-toc="fechamento">Fechamento</a>
      </nav>
    </div>
  </div>
  <!-- Indicador de progresso vertical -->
  <div class="devin-toc__progress" aria-hidden="true">
    <div class="devin-toc__progress-fill" id="toc-progress-fill"></div>
  </div>
</aside>
```

### 5.3 CSS do ToC

```css
.devin-toc {
  position: fixed;
  left: max(1rem, calc(50vw - 600px - 180px));
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s var(--ease-out-quart);
  width: 140px;
}

.devin-toc.is-visible {
  opacity: 1;
  pointer-events: auto;
}

.devin-toc__track {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.devin-toc__act-label {
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  display: block;
  margin-bottom: 0.5rem;
}

.devin-toc__links {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.devin-toc__link {
  font-size: 0.6875rem;
  color: var(--text-muted);
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-left: 2px solid transparent;
  transition: all 0.25s ease;
  border-radius: 0 3px 3px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.devin-toc__link:hover {
  color: var(--text-secondary);
  border-left-color: var(--border-strong);
}

.devin-toc__link.is-active {
  color: var(--color-human);
  border-left-color: var(--color-human);
  background: var(--color-human-dim);
}

.devin-toc__progress {
  position: absolute;
  left: -12px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-medium);
  border-radius: 1px;
}

.devin-toc__progress-fill {
  width: 100%;
  background: var(--color-human);
  border-radius: 1px;
  height: 0%; /* Animado via JS */
  transition: height 0.1s linear;
}

/* Ocultar em telas menores que 1280px */
@media (max-width: 1279px) {
  .devin-toc { display: none; }
}
```

### 5.4 JS do ToC

```javascript
// js/components.js — initToC()
function initToC() {
  const toc = document.getElementById('devin-toc');
  const progressFill = document.getElementById('toc-progress-fill');
  const links = document.querySelectorAll('.devin-toc__link');
  const sections = document.querySelectorAll('[data-section]');

  // Mostrar ToC após hero
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'bottom top',
    onEnter: () => toc.classList.add('is-visible'),
    onLeaveBack: () => toc.classList.remove('is-visible'),
  });

  // Progresso geral da página
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    progressFill.style.height = `${Math.min(scrolled * 100, 100)}%`;
  });

  // Scrollspy via IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
}
```

---

## 6. COMPONENTE: SISTEMA DE TOOLTIPS

### 6.1 Termos que devem receber tooltip

Adicionar `data-tooltip="Definição em ≤120 chars"` e `class="devin-term"` nos seguintes termos ao longo do HTML:

| Termo | Tooltip |
|---|---|
| ACU | Agent Compute Unit — unidade de medida do trabalho executado pelo Devin |
| Frame Problem | Incapacidade da IA de inferir o que mudou no mundo sem instrução explícita |
| Deskilling | Atrofia de habilidades causada pela dependência excessiva de automação |
| Lei de Conway | A arquitetura de um sistema tende a espelhar a estrutura de comunicação da equipe |
| Context Lakes | Repositórios estruturados de conhecimento corporativo consumíveis por agentes |
| ReAct | Ciclo cognitivo do agente: Observar → Raciocinar → Agir → Verificar |
| EPOCH | Framework MIT Sloan: Empatia, Presença, Opinião, Criatividade, Esperança |
| Tool Calling | Capacidade do agente de usar ferramentas reais (terminal, browser, IDE) |
| Human-over-the-Loop | Modo de colaboração onde o humano define intenções e a IA orquestra agentes |
| Flow Metrics | Métricas de fluxo de valor: velocidade, tempo de ciclo, eficiência, carga |

### 6.2 HTML — marcação de termos

```html
<!-- Exemplo de uso inline -->
<span class="devin-term" data-tooltip="Ciclo cognitivo: Observar → Raciocinar → Agir → Verificar">ReAct</span>
```

### 6.3 CSS dos Tooltips

```css
.devin-term {
  border-bottom: 1px dashed var(--color-human);
  cursor: help;
  position: relative;
  color: inherit;
}

.devin-term::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: #0F1923;
  border: 1px solid var(--border-strong);
  color: var(--text-secondary);
  font-size: 0.75rem;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  white-space: normal;
  max-width: 260px;
  width: max-content;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 200;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

.devin-term:hover::after {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
```

---

## 7. SEÇÃO 8 — REDESIGN: DIAGRAMA DO CHEF (TRIPARTITE)

### 7.1 Problema atual

Os 3 roles (Cliente, IA, Chef) estão em cards textuais simples. Não transmitem a relação de fluxo e responsabilidade.

### 7.2 Novo componente a inserir ANTES dos cards existentes

Substituir `.ep03-cozinheiro__roles` pelo seguinte:

```html
<figure class="chef-diagram" aria-label="Diagrama: papéis no modelo de colaboração IA">
  <div class="chef-diagram__flow">

    <!-- Nó 1: Cliente -->
    <div class="chef-diagram__node chef-diagram__node--cliente" role="listitem">
      <div class="chef-diagram__icon" aria-hidden="true">
        <!-- SVG balão de pensamento -->
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 3C8.477 3 4 7.03 4 12c0 2.5 1.07 4.76 2.8 6.4L5.5 22l4.2-1.6A10.9 10.9 0 0014 21c5.523 0 10-4.03 10-9S19.523 3 14 3Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
      </div>
      <h3 class="chef-diagram__label">O CLIENTE</h3>
      <p class="chef-diagram__sublabel">Desejo abstrato</p>
      <p class="chef-diagram__desc">O que ele quer sentir, não como fazer</p>
    </div>

    <!-- Seta -->
    <div class="chef-diagram__arrow" aria-hidden="true">
      <svg viewBox="0 0 80 24" fill="none" class="chef-diagram__arrow-svg">
        <defs>
          <marker id="chef-head-1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--color-ai)"/>
          </marker>
        </defs>
        <line x1="4" y1="12" x2="68" y2="12" stroke="var(--color-ai)" stroke-width="1.5" marker-end="url(#chef-head-1)" stroke-dasharray="4 3"/>
      </svg>
      <span class="chef-diagram__arrow-label">PROCESSA</span>
    </div>

    <!-- Nó 2: IA -->
    <div class="chef-diagram__node chef-diagram__node--ia" role="listitem">
      <div class="chef-diagram__icon" aria-hidden="true">
        <!-- SVG engrenagem/processador -->
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="4" stroke="currentColor" stroke-width="1.5"/>
          <path d="M14 3v3M14 22v3M3 14h3M22 14h3M6.22 6.22l2.12 2.12M19.66 19.66l2.12 2.12M6.22 21.78l2.12-2.12M19.66 8.34l2.12-2.12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <h3 class="chef-diagram__label chef-diagram__label--ai">A IA</h3>
      <p class="chef-diagram__sublabel">Pica, calibra, executa</p>
      <p class="chef-diagram__desc">Velocidade. Todas as receitas. Sem julgamento</p>
    </div>

    <!-- Seta -->
    <div class="chef-diagram__arrow" aria-hidden="true">
      <svg viewBox="0 0 80 24" fill="none" class="chef-diagram__arrow-svg">
        <defs>
          <marker id="chef-head-2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--color-human)"/>
          </marker>
        </defs>
        <line x1="4" y1="12" x2="68" y2="12" stroke="var(--color-human)" stroke-width="1.5" marker-end="url(#chef-head-2)"/>
      </svg>
      <span class="chef-diagram__arrow-label">GOVERNA</span>
    </div>

    <!-- Nó 3: Você -->
    <div class="chef-diagram__node chef-diagram__node--chef" role="listitem">
      <div class="chef-diagram__icon" aria-hidden="true">
        <!-- SVG olho/escudo -->
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 6C8 6 3 14 3 14s5 8 11 8 11-8 11-8-5-8-11-8Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <circle cx="14" cy="14" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
      </div>
      <h3 class="chef-diagram__label chef-diagram__label--human">VOCÊ</h3>
      <p class="chef-diagram__sublabel">Contexto · Segurança · Julgamento</p>
      <p class="chef-diagram__desc">O prato tem alma. Seu nome está na porta</p>
    </div>

  </div>

  <figcaption class="chef-diagram__caption">
    Em 3 segundos de leitura: quem pede, quem executa, quem responde.
  </figcaption>
</figure>
```

### 7.3 CSS do Diagrama

```css
.chef-diagram {
  margin: 3rem 0;
  padding: 2rem;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border-medium);
  border-radius: 12px;
}

.chef-diagram__flow {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
}

.chef-diagram__node {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--border-medium);
  background: var(--bg-dark);
  gap: 0.5rem;
}

.chef-diagram__node--ia {
  border-color: var(--color-ai-border);
  background: var(--color-ai-dim);
}

.chef-diagram__node--ia .chef-diagram__icon {
  color: var(--color-ai);
}

.chef-diagram__node--chef {
  border-color: var(--color-human-border);
  background: var(--color-human-dim);
}

.chef-diagram__node--chef .chef-diagram__icon { color: var(--color-human); }
.chef-diagram__node--cliente .chef-diagram__icon { color: var(--text-muted); }

.chef-diagram__label {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-primary);
}

.chef-diagram__label--ai { color: var(--color-ai); }
.chef-diagram__label--human { color: var(--color-human); }

.chef-diagram__sublabel {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-style: italic;
}

.chef-diagram__desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.chef-diagram__arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
}

.chef-diagram__arrow-svg { width: 80px; height: 20px; }

.chef-diagram__arrow-label {
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-dim);
}

.chef-diagram__caption {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-style: italic;
}

/* Mobile: stack vertical */
@media (max-width: 768px) {
  .chef-diagram__flow {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .chef-diagram__arrow-svg {
    transform: rotate(90deg);
  }
}
```

### 7.4 Motion do diagrama

```javascript
// GSAP: nós aparecem em stagger com entrada da esquerda para a direita
gsap.from('.chef-diagram__node', {
  opacity: 0, x: -20, duration: 0.6, stagger: 0.15, ease: 'power2.out',
  scrollTrigger: { trigger: '.chef-diagram', start: 'top 78%' }
});
// Setas desenham depois dos nós
gsap.from('.chef-diagram__arrow', {
  opacity: 0, scaleX: 0, transformOrigin: 'left center',
  duration: 0.5, stagger: 0.2, delay: 0.4, ease: 'power2.out',
  scrollTrigger: { trigger: '.chef-diagram', start: 'top 78%' }
});
```

---

## 8. SEÇÃO 10 — REDESIGN: BENTO GRID DOS 4 PILARES

### 8.1 Problema atual

Os 4 pilares estão em `.ep04-pilares` como uma lista de cards verticais similares ao restante do ensaio. O usuário em modo scanning não identifica que é um framework acionável.

### 8.2 Substituição de layout

Manter o HTML semântico existente dos artigos `.ep04-pilar`. Adicionar apenas uma classe ao container:

```html
<!-- Alterar: -->
<div class="ep04-pilares" role="list">
<!-- Para: -->
<div class="ep04-pilares ep04-pilares--bento" role="list">
```

### 8.3 CSS — Bento Grid

```css
.ep04-pilares--bento {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: 1.25rem;
}

/* Card 1 — CLAREZA: destaque máximo, ocupa coluna inteira na linha 1 coluna 1 */
.ep04-pilar:nth-child(1) {
  grid-column: 1;
  grid-row: 1;
  border-top: 3px solid var(--color-human);
}

/* Card 2 — CONTEXTO */
.ep04-pilar:nth-child(2) {
  grid-column: 2;
  grid-row: 1;
  border-top: 3px solid var(--color-human);
}

/* Card 3 — EXEMPLOS */
.ep04-pilar:nth-child(3) {
  grid-column: 1;
  grid-row: 2;
  border-top: 3px solid rgba(255, 98, 0, 0.4);
}

/* Card 4 — ITERAÇÃO: loop visual implícito */
.ep04-pilar:nth-child(4) {
  grid-column: 2;
  grid-row: 2;
  border-top: 3px solid rgba(255, 98, 0, 0.4);
}

/* Número do pilar — enorme como visual anchor */
.ep04-pilar__number {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1;
  color: rgba(255, 98, 0, 0.12);
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  pointer-events: none;
  font-variant-numeric: tabular-nums;
}

.ep04-pilar {
  position: relative;  /* Para número absoluto */
  overflow: hidden;
}

/* Mobile: volta para 1 coluna */
@media (max-width: 640px) {
  .ep04-pilares--bento {
    grid-template-columns: 1fr;
  }
  .ep04-pilar:nth-child(n) {
    grid-column: 1;
    grid-row: auto;
  }
}
```

### 8.4 Motion

```javascript
gsap.from('.ep04-pilar', {
  opacity: 0,
  y: 40,
  scale: 0.97,
  duration: 0.65,
  stagger: { amount: 0.4, from: 'start', grid: [2,2] }, // Percorre grid diagonal
  ease: 'power3.out',
  scrollTrigger: { trigger: '.ep04-pilares', start: 'top 80%' }
});
```

---

## 9. SEÇÃO 11 — REDESIGN: LOOP REACT CIRCULAR

### 9.1 Problema atual

O ciclo ReAct `Observa → Raciocina → Age → Verifica` está representado como uma linha horizontal de spans separados por `→`. Não transmite a ideia de ciclo contínuo.

### 9.2 Substituição do `.ep05-fluxo`

**Remover** o `<div class="ep05-fluxo">` existente e **substituir** pelo componente abaixo (inserir dentro do `article` de Como Devin processa):

```html
<figure class="react-loop" aria-label="Ciclo ReAct do Devin — loop contínuo">
  <div class="react-loop__diagram" role="img" aria-label="Observa, Raciocina, Age, Verifica em ciclo">

    <!-- SVG do ciclo circular -->
    <svg class="react-loop__svg" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Trilha circular de fundo -->
      <circle cx="160" cy="160" r="120" stroke="rgba(0, 194, 168, 0.12)" stroke-width="1.5" stroke-dasharray="4 4"/>
      <!-- Arco animado principal (stroke-dashoffset animado via GSAP) -->
      <circle class="react-loop__track" cx="160" cy="160" r="120"
              stroke="var(--color-ai)" stroke-width="2"
              stroke-dasharray="754" stroke-dashoffset="754"
              transform="rotate(-90 160 160)"/>
      <!-- Setas direcionais nos quadrantes -->
      <!-- Top-right (Observa → Raciocina) -->
      <path class="react-loop__arrow" d="M 240 110 L 248 102" stroke="var(--color-ai)" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Right-bottom (Raciocina → Age) -->
      <path class="react-loop__arrow" d="M 260 200 L 268 210" stroke="var(--color-ai)" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Bottom-left (Age → Verifica) -->
      <path class="react-loop__arrow" d="M 110 260 L 100 268" stroke="var(--color-ai)" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Left-top (Verifica → Observa) -->
      <path class="react-loop__arrow" d="M 60 130 L 50 120" stroke="var(--color-human)" stroke-width="1.5" stroke-linecap="round"/>
    </svg>

    <!-- Nós dos 4 estados -->
    <div class="react-loop__node react-loop__node--observa" data-react-node="observa">
      <span class="react-loop__node-label" style="color: var(--color-ai)">OBSERVA</span>
      <span class="react-loop__node-sub">Lê contexto e estado</span>
    </div>
    <div class="react-loop__node react-loop__node--raciocina" data-react-node="raciocina">
      <span class="react-loop__node-label" style="color: var(--color-ai)">RACIOCINA</span>
      <span class="react-loop__node-sub">Planeja ações</span>
    </div>
    <div class="react-loop__node react-loop__node--age" data-react-node="age">
      <span class="react-loop__node-label" style="color: var(--color-ai)">AGE</span>
      <span class="react-loop__node-sub">Escreve · executa · modifica</span>
    </div>
    <div class="react-loop__node react-loop__node--verifica" data-react-node="verifica">
      <span class="react-loop__node-label" style="color: var(--color-human)">VERIFICA</span>
      <span class="react-loop__node-sub">Testa · valida · corrige</span>
    </div>

    <!-- Ícone central — ponto de humanização -->
    <div class="react-loop__center" aria-hidden="true">
      <span class="react-loop__center-label">DEVIN</span>
      <div class="react-loop__center-pulse"></div>
    </div>

    <!-- Intervenção humana — conector externo ao nó Verifica -->
    <div class="react-loop__human-intervention">
      <svg viewBox="0 0 80 40" fill="none" width="80" height="40" aria-hidden="true">
        <path d="M10 20 L50 20 L60 10" stroke="var(--color-human)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 2"/>
      </svg>
      <span class="react-loop__human-label">VOCÊ ENTRA AQUI</span>
    </div>

  </div>
  <figcaption class="react-loop__caption">
    O <span class="devin-term" data-tooltip="Ciclo cognitivo: Observar → Raciocinar → Agir → Verificar em loop contínuo">ciclo ReAct</span> é contínuo.
    O nó <strong style="color: var(--color-human)">Verifica</strong> é onde sua auditoria entra — se o teste falha, o ciclo recomeça com novo contexto.
  </figcaption>
</figure>
```

### 9.3 CSS do Loop ReAct

```css
.react-loop {
  margin: 2.5rem 0;
}

.react-loop__diagram {
  position: relative;
  width: 320px;
  height: 320px;
  margin: 0 auto;
}

.react-loop__svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Posicionamento dos nós nos 4 quadrantes */
.react-loop__node {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-dark);
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  width: 110px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.react-loop__node--observa  { top:   0;   left: 50%; transform: translateX(-50%); }
.react-loop__node--raciocina{ top: 50%;   right:  0; transform: translateY(-50%); }
.react-loop__node--age      { bottom: 0;  left: 50%; transform: translateX(-50%); }
.react-loop__node--verifica {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  border-color: var(--color-human-border);
}

.react-loop__node.is-active {
  border-color: var(--color-ai-border);
  box-shadow: var(--color-ai-glow);
}

.react-loop__node--verifica.is-active {
  border-color: var(--color-human-border);
  box-shadow: var(--color-human-glow);
}

.react-loop__node-label {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.react-loop__node-sub {
  font-size: 0.625rem;
  color: var(--text-muted);
  line-height: 1.3;
}

/* Centro */
.react-loop__center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.react-loop__center-label {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--text-dim);
}

.react-loop__center-pulse {
  width: 8px;
  height: 8px;
  background: var(--color-ai);
  border-radius: 50%;
  margin: 4px auto 0;
  animation: react-pulse 2s ease-in-out infinite;
}

@keyframes react-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

/* Intervenção humana */
.react-loop__human-intervention {
  position: absolute;
  left: -80px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.react-loop__human-label {
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-human);
  text-transform: uppercase;
  white-space: nowrap;
}

.react-loop__caption {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
}

@media (max-width: 480px) {
  .react-loop__diagram { width: 280px; height: 280px; }
  .react-loop__human-intervention { display: none; }
}
```

### 9.4 Motion do Loop ReAct

```javascript
// Ao entrar na viewport: arco circular se desenha
const reactTrack = document.querySelector('.react-loop__track');
if (reactTrack) {
  gsap.to(reactTrack, {
    strokeDashoffset: 0,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: { trigger: '.react-loop', start: 'top 70%' }
  });
}

// Nós aparecem com stagger após o arco
gsap.from('[data-react-node]', {
  scale: 0.7,
  opacity: 0,
  duration: 0.5,
  stagger: 0.15,
  ease: 'back.out(1.5)',
  delay: 0.8,
  scrollTrigger: { trigger: '.react-loop', start: 'top 70%' }
});

// Pulse ativo: cicla pelos nós a cada 1.5s (cosmético, loop infinito)
const reactNodes = document.querySelectorAll('[data-react-node]');
let currentNode = 0;
function cycleReactNodes() {
  reactNodes.forEach(n => n.classList.remove('is-active'));
  reactNodes[currentNode].classList.add('is-active');
  currentNode = (currentNode + 1) % reactNodes.length;
}
// Inicia ciclo após entrada na viewport
ScrollTrigger.create({
  trigger: '.react-loop',
  start: 'top 70%',
  onEnter: () => { setInterval(cycleReactNodes, 1500); }
});
```

---

## 10. SEÇÃO 18 — REDESIGN: FILE EXPLORER MOCKADO

### 10.1 Problema atual

A estrutura de pastas do projeto Salesforce está em `<pre>` texto puro. Cognitivamente exaustiva.

### 10.2 Substituição do `.ep07-estrutura`

```html
<div class="file-explorer" role="region" aria-label="Estrutura do projeto Salesforce com Devin">

  <!-- Barra de título estilo IDE -->
  <div class="file-explorer__titlebar" aria-hidden="true">
    <span class="file-explorer__dot file-explorer__dot--red"></span>
    <span class="file-explorer__dot file-explorer__dot--yellow"></span>
    <span class="file-explorer__dot file-explorer__dot--green"></span>
    <span class="file-explorer__filename">salesforce-bupj-project</span>
  </div>

  <!-- Abas -->
  <div class="file-explorer__tabs" role="tablist" aria-label="Visualizações do projeto">
    <button class="file-explorer__tab is-active" role="tab" aria-selected="true" 
            aria-controls="fe-panel-estrutura" id="fe-tab-estrutura">
      📁 Estrutura
    </button>
    <button class="file-explorer__tab" role="tab" aria-selected="false" 
            aria-controls="fe-panel-terminal" id="fe-tab-terminal">
      ⚡ Devin CLI
    </button>
  </div>

  <!-- Painel: Estrutura -->
  <div id="fe-panel-estrutura" class="file-explorer__panel" role="tabpanel" 
       aria-labelledby="fe-tab-estrutura">
    <ul class="fe-tree" aria-label="Árvore de arquivos do projeto">
      <li class="fe-tree__item fe-tree__item--folder">
        <span class="fe-tree__icon">📁</span>
        <span class="fe-tree__name">force-app/main/default/classes/</span>
        <ul class="fe-tree__children fe-tree__children--dimmed">
          <li class="fe-tree__item"><span class="fe-tree__icon">📄</span><span class="fe-tree__name fe-tree__name--muted">OrderService.cls</span></li>
          <li class="fe-tree__item"><span class="fe-tree__icon">📄</span><span class="fe-tree__name fe-tree__name--muted">OrderServiceTest.cls</span></li>
        </ul>
      </li>
      <li class="fe-tree__item"><span class="fe-tree__icon">📄</span><span class="fe-tree__name fe-tree__name--muted">sfdx-project.json</span></li>
      <li class="fe-tree__item fe-tree__item--folder fe-tree__item--highlighted">
        <span class="fe-tree__icon">⚙️</span>
        <span class="fe-tree__name fe-tree__name--accent">.agents/skills/</span>
        <span class="fe-tree__badge">Agente lê aqui</span>
        <ul class="fe-tree__children">
          <li class="fe-tree__item"><span class="fe-tree__icon">📝</span><span class="fe-tree__name fe-tree__name--accent">run-tests.md</span></li>
        </ul>
      </li>
      <li class="fe-tree__item fe-tree__item--folder fe-tree__item--highlighted fe-tree__item--primary">
        <span class="fe-tree__icon">🎯</span>
        <span class="fe-tree__name fe-tree__name--accent fe-tree__name--glow">specs/</span>
        <span class="fe-tree__badge fe-tree__badge--primary">Ponto de partida</span>
        <ul class="fe-tree__children">
          <li class="fe-tree__item"><span class="fe-tree__icon">📋</span><span class="fe-tree__name fe-tree__name--muted">_template.spec.md</span><span class="fe-tree__hint">← Template base</span></li>
          <li class="fe-tree__item fe-tree__item--active"><span class="fe-tree__icon">⚡</span><span class="fe-tree__name fe-tree__name--accent">001-filtro-data.spec.md</span><span class="fe-tree__hint">← Em execução</span></li>
          <li class="fe-tree__item"><span class="fe-tree__icon">📋</span><span class="fe-tree__name fe-tree__name--muted">002-refactor-pagamento.spec.md</span></li>
        </ul>
      </li>
    </ul>
  </div>

  <!-- Painel: Terminal CLI -->
  <div id="fe-panel-terminal" class="file-explorer__panel file-explorer__panel--hidden" 
       role="tabpanel" aria-labelledby="fe-tab-terminal">
    <div class="fe-terminal">
      <div class="fe-terminal__line"><span class="fe-terminal__prompt">devin@sandbox:~$</span><span class="fe-terminal__cmd">cat specs/001-filtro-data.spec.md</span></div>
      <div class="fe-terminal__line fe-terminal__line--output">Lendo especificação...</div>
      <div class="fe-terminal__line"><span class="fe-terminal__prompt">devin@sandbox:~$</span><span class="fe-terminal__cmd">sf apex run-tests -n OrderServiceTest</span></div>
      <div class="fe-terminal__line fe-terminal__line--output">Running tests...</div>
      <div class="fe-terminal__line fe-terminal__line--success">✓ 12 testes passando · Cobertura: 92%</div>
      <div class="fe-terminal__line"><span class="fe-terminal__prompt">devin@sandbox:~$</span><span class="fe-terminal__cursor">_</span></div>
    </div>
  </div>

</div>
```

### 10.3 CSS do File Explorer

```css
.file-explorer {
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  overflow: hidden;
  background: #0D1117;
  font-family: 'JetBrains Mono', monospace;
  margin: 2rem 0;
}

.file-explorer__titlebar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.625rem 1rem;
  background: #161B22;
  border-bottom: 1px solid var(--border-medium);
}

.file-explorer__dot {
  width: 12px; height: 12px;
  border-radius: 50%;
}
.file-explorer__dot--red    { background: #FF5F57; }
.file-explorer__dot--yellow { background: #FEBC2E; }
.file-explorer__dot--green  { background: #28C840; }

.file-explorer__filename {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-left: 0.5rem;
}

.file-explorer__tabs {
  display: flex;
  background: #161B22;
  border-bottom: 1px solid var(--border-medium);
}

.file-explorer__tab {
  padding: 0.5rem 1.25rem;
  font-size: 0.75rem;
  font-family: 'Inter', sans-serif;
  color: var(--text-muted);
  background: none;
  border: none;
  border-right: 1px solid var(--border-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.file-explorer__tab.is-active {
  color: var(--text-primary);
  background: #0D1117;
  border-bottom: 2px solid var(--color-human);
}

.file-explorer__panel {
  padding: 1.25rem;
  min-height: 200px;
}

.file-explorer__panel--hidden { display: none; }

/* Árvore de arquivos */
.fe-tree { list-style: none; font-size: 0.8125rem; }
.fe-tree__children { list-style: none; padding-left: 1.25rem; margin-top: 0.25rem; }

.fe-tree__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem 0.375rem;
  border-radius: 4px;
  margin-bottom: 0.125rem;
  transition: background 0.15s ease;
  flex-wrap: wrap;
}

.fe-tree__item:hover { background: rgba(255,255,255,0.04); }

/* Esmaecer arquivos padrão */
.fe-tree__children--dimmed { opacity: 0.35; }
.fe-tree__name--muted { color: var(--text-muted); }

/* Destacar pastas importantes */
.fe-tree__item--highlighted {
  background: var(--color-ai-dim);
}
.fe-tree__item--primary {
  background: var(--color-human-dim);
  border: 1px solid var(--color-human-border);
  border-radius: 6px;
  padding: 0.4rem 0.5rem;
}
.fe-tree__item--active {
  background: rgba(255,98,0,0.08);
}

.fe-tree__name--accent { color: var(--color-human); }
.fe-tree__name--glow {
  color: var(--color-human);
  text-shadow: 0 0 12px rgba(255, 98, 0, 0.5);
  font-weight: 500;
}

.fe-tree__badge {
  font-size: 0.5625rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  background: var(--color-ai-dim);
  color: var(--color-ai);
  text-transform: uppercase;
  white-space: nowrap;
}

.fe-tree__badge--primary {
  background: var(--color-human-dim);
  color: var(--color-human);
}

.fe-tree__hint {
  font-size: 0.5625rem;
  font-family: 'Inter', sans-serif;
  color: var(--text-dim);
  font-style: italic;
}

/* Terminal */
.fe-terminal { display: flex; flex-direction: column; gap: 0.375rem; }

.fe-terminal__line {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.fe-terminal__prompt { color: var(--color-ai); margin-right: 0.5rem; }
.fe-terminal__cmd { color: var(--text-primary); }
.fe-terminal__line--output { color: var(--text-muted); padding-left: 1.5rem; }
.fe-terminal__line--success { color: #4ade80; padding-left: 1.5rem; }

.fe-terminal__cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
```

---

## 11. SEÇÕES RESPIRO — TELAS DE PAUSA COGNITIVA

### 11.1 Conceito

A cada transição entre Atos e após seções de alta densidade conceitual, inserir uma seção de respiro: fundo quase preto, uma única frase de impacto, 5–8 segundos de scroll pinned.

### 11.2 Posicionamento

| ID | Posição no fluxo | Frase |
|---|---|---|
| `respiro-1` | Entre Seção 7 (Vibe Coding def) e Seção 8 (Chef) | "Vibe Coding não é digitar menos. É pensar melhor." |
| `respiro-2` | Entre Ato I e Ato II (após Seção 8, antes de Seção 9) | "A IA processa. Você pensa." |
| `respiro-3` | Entre Seção 14 (Modos ReAct) e Seção 15 (Hands-on) | "A ferramenta não te diminuiu. Te liberou." |
| `respiro-4` | Entre Ato II e Ato III (após Seção 21) | "Agora que vimos o instrumento — como tocamos juntos?" |

### 11.3 HTML do Respiro

```html
<section class="devin-respiro" id="respiro-2" data-section="respiro" 
         aria-label="Pausa — momento de reflexão">
  <div class="devin-respiro__inner">
    <p class="devin-respiro__frase js-respiro-text">
      A IA processa.<br>Você pensa.
    </p>
  </div>
</section>
```

### 11.4 CSS do Respiro

```css
.devin-respiro {
  background: var(--bg-void);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
}

.devin-respiro__inner {
  text-align: center;
  max-width: 640px;
}

.devin-respiro__frase {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 400;
  font-style: italic;
  color: var(--text-primary);
  line-height: 1.3;
  letter-spacing: -0.01em;
  opacity: 0;         /* Animado via GSAP */
}
```

### 11.5 Motion dos Respiros (GSAP Pinned)

```javascript
// Para cada .devin-respiro
document.querySelectorAll('.devin-respiro').forEach(respiro => {
  const frase = respiro.querySelector('.js-respiro-text');

  // Split text por palavras
  const split = new SplitType(frase, { types: 'words' });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: respiro,
      start: 'top top',
      end: '+=120%',         // Pin por 120vh de scroll
      pin: true,
      scrub: false,
      once: true,
    }
  });

  tl.to(split.words, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
  });

  // Estado inicial das palavras
  gsap.set(split.words, { opacity: 0, y: 20 });
});
```

---

## 12. SEÇÃO 33 — REDESIGN: CARDS DE VÍDEO

### 12.1 Problema atual

Os 8 vídeos estão como uma lista de `<a>` com estrutura simples. Não comunica a progressão da série.

### 12.2 Substituição do bloco de vídeos

Substituir o `div` de vídeos (linhas ~2406–2468) por:

```html
<div class="video-series" role="list" aria-label="Série completa de 8 episódios">
  <div class="video-series__grid">

    <a href="https://youtu.be/8nMyU-C5Dxc" target="_blank" rel="noopener"
       class="video-card" role="listitem" aria-label="Episódio 1: A Crise Cognitiva">
      <div class="video-card__thumb" aria-hidden="true">
        <div class="video-card__thumb-inner">
          <span class="video-card__ep-num">01</span>
          <!-- Thumbnail YouTube via img com fallback -->
          <img src="https://img.youtube.com/vi/8nMyU-C5Dxc/mqdefault.jpg"
               alt="" loading="lazy" class="video-card__thumb-img"
               onerror="this.style.display='none'">
        </div>
        <div class="video-card__play" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 4l12 6-12 6V4Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
      <div class="video-card__content">
        <p class="video-card__title">A Crise Cognitiva</p>
        <p class="video-card__desc">AI Brain Fry, densidade cognitiva e o framework EPOCH do MIT Sloan</p>
      </div>
      <span class="video-card__arrow" aria-hidden="true">↗</span>
    </a>

    <!-- Repetir para os outros 7 vídeos com os IDs corretos do YouTube -->
    <!-- Ep 2: m69fzdS-EG0 | Ep 3: HlgRNYHvOtg | Ep 4: luoGsY5PrLo -->
    <!-- Ep 5: rYSyiQznInI | Ep 6: ubBJRgWuAMU | Ep 7: LbzxZDRUk8Y | Ep 8: zQ453MWvBck -->

  </div>
</div>
```

### 12.3 CSS dos Cards de Vídeo

```css
.video-series__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.video-card {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background: rgba(255,255,255,0.025);
  border: 1px solid var(--border-medium);
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
}

.video-card:hover {
  border-color: var(--color-human-border);
  background: var(--color-human-dim);
  transform: translateY(-2px);
}

.video-card__thumb {
  position: relative;
  aspect-ratio: 16/9;
  background: var(--bg-dark);
  border-radius: 5px;
  overflow: hidden;
}

.video-card__thumb-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-card__thumb-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}

.video-card__ep-num {
  position: relative;
  z-index: 1;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  color: rgba(255,98,0,0.3);
}

.video-card__play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-human);
  opacity: 0;
  transition: opacity 0.2s ease;
  background: rgba(0,0,0,0.4);
}

.video-card:hover .video-card__play { opacity: 1; }

.video-card__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.video-card__desc {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.video-card__arrow {
  font-size: 1rem;
  color: var(--text-dim);
  transition: color 0.2s ease;
  align-self: flex-start;
}

.video-card:hover .video-card__arrow { color: var(--color-human); }

@media (max-width: 768px) {
  .video-series__grid { grid-template-columns: 1fr; }
  .video-card { grid-template-columns: 80px 1fr auto; }
}
```

---

## 13. REFACTORING DE CÓDIGO — TAREFAS TÉCNICAS OBRIGATÓRIAS

### 13.1 Extrair estilos inline do HTML

**Tarefa:** Varrer o `devin.html` e substituir todos os `style=""` inline por classes semânticas em `devin.css`.

**Prioridade alta** (blocos complexos com múltiplas propriedades):

| Localização | Conteúdo atual | Classe nova |
|---|---|---|
| Seção EPOCH (linha ~1845) | Grid 5 colunas com estilos inline | `.epoch-grid` |
| Seção Human-IA Modes (linha ~2311) | Flex com gaps e borders inline | `.collab-modes` |
| Seção Paradoxo da Calculadora (linha ~215) | `border-left` laranja com padding | `.callout-box` |
| Vídeos (linha ~2406) | `display: flex; gap; padding; background; border` | `.video-card` (ver seção 12) |

### 13.2 Extrair `<style>` do body para `devin.css`

O bloco `<style>` que começa em linha ~2496 (estilos Épicos 07, 08, 09) deve ser recortado e colado ao final do `devin.css`.

**Atenção:** Verificar classes duplicadas ou conflitantes durante a migração.

### 13.3 Criar a classe `.callout-box`

```css
/* Substituir todos os blocos laranja inline */
.callout-box {
  margin-top: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: var(--color-human-dim);
  border-left: 3px solid var(--color-human);
  border-radius: 4px;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

.callout-box strong { color: var(--text-primary); }

/* Variante: aviso (triângulo laranja) */
.callout-box--warning {
  background: rgba(255, 138, 61, 0.07);
  border-left-color: #FF8A3D;
}

/* Variante: IA (ciano) */
.callout-box--ai {
  background: var(--color-ai-dim);
  border-left-color: var(--color-ai);
}
```

### 13.4 Criar a classe `.epoch-grid`

```css
.epoch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.epoch-grid__item {
  text-align: center;
  padding: 0.875rem;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
  border: 1px solid var(--border-medium);
  transition: border-color 0.2s ease;
}

.epoch-grid__item:hover { border-color: var(--color-human-border); }

.epoch-grid__letter {
  color: var(--color-human);
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 0.375rem;
}

.epoch-grid__name {
  color: var(--text-primary);
  font-size: 0.8125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.epoch-grid__desc {
  color: var(--text-muted);
  font-size: 0.75rem;
  line-height: 1.4;
}
```

### 13.5 Criar `.collab-modes` para os 3 modos de colaboração

```css
.collab-modes {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--color-human-border);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 2rem;
  background: var(--color-human-dim);
}

.collab-mode {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 1rem;
  padding: 1.125rem 1.5rem;
  border-bottom: 1px solid var(--border-medium);
  transition: background 0.2s ease;
}

.collab-mode:last-child { border-bottom: none; }
.collab-mode:hover { background: rgba(255,98,0,0.07); }

.collab-mode__label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-human);
  text-transform: uppercase;
  align-self: center;
}

.collab-mode__desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
  align-self: center;
}

.collab-modes__footer {
  padding: 1rem 1.5rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border-medium);
  background: rgba(0,0,0,0.2);
  line-height: 1.6;
}

@media (max-width: 560px) {
  .collab-mode { grid-template-columns: 1fr; gap: 0.25rem; }
}
```

---

## 14. JS COMPLETO — ESTRUTURA MODULAR

### 14.1 `js/devin.js` (Entry point)

```javascript
// js/devin.js
import { initLenis } from './lenis.js';
import { initMotion } from './motion.js';
import { initComponents } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initMotion();
  initComponents();
});
```

### 14.2 `js/lenis.js`

```javascript
// js/lenis.js
export function initLenis() {
  const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!motionOk) return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    smoothTouch: false,
  });

  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  window.__lenis = lenis; // Expor para debug
}
```

### 14.3 `js/components.js`

```javascript
// js/components.js
export function initComponents() {
  initTabs();
  initToC();
  initFileExplorer();
}

function initTabs() {
  // Tabs genéricas — funciona para ep06-tabs e file-explorer__tabs
  document.querySelectorAll('[role="tablist"]').forEach(tablist => {
    const tabs = tablist.querySelectorAll('[role="tab"]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const panelId = tab.getAttribute('aria-controls');
        // Desativar todos
        tabs.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.classList.remove('is-active');
          const p = document.getElementById(t.getAttribute('aria-controls'));
          if (p) p.classList.add('file-explorer__panel--hidden', 'devin-tab-panel--hidden');
        });
        // Ativar o clicado
        tab.setAttribute('aria-selected', 'true');
        tab.classList.add('is-active');
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.classList.remove('file-explorer__panel--hidden', 'devin-tab-panel--hidden');
          // Animar entrada
          gsap.from(panel, { opacity: 0, y: 8, duration: 0.3, ease: 'power2.out' });
        }
      });
    });
  });
}

function initToC() {
  // Ver seção 5.4
}

function initFileExplorer() {
  // Animar árvore de arquivos ao entrar na viewport
  const feItems = document.querySelectorAll('.fe-tree__item');
  if (!feItems.length) return;
  gsap.from(feItems, {
    opacity: 0, x: -12, duration: 0.4, stagger: 0.05, ease: 'power2.out',
    scrollTrigger: { trigger: '.file-explorer', start: 'top 80%' }
  });
}
```

### 14.4 `js/motion.js` — Animações principais

```javascript
// js/motion.js
export function initMotion() {
  const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!motionOk) return;

  gsap.registerPlugin(ScrollTrigger);

  animateHero();
  animateSplitTexts();
  animateCards();
  animateDiagrams();
  animateRespiros();
  animateReactLoop();
}

function animateHero() {
  const tl = gsap.timeline({ delay: 0.2 });
  tl.from('.js-hero-supertitle', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out' })
    .from('.js-hero-title', { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .from('.js-hero-subtitle', { opacity: 0, y: 16, duration: 0.7, ease: 'power2.out' }, '-=0.4')
    .from('.js-hero-credit', { opacity: 0, duration: 0.5 }, '-=0.2')
    .from('.js-hero-scroll-cta', { opacity: 0, y: 8, duration: 0.5 }, '-=0.1');
}

function animateSplitTexts() {
  document.querySelectorAll('.js-split-text').forEach(el => {
    const split = new SplitType(el, { types: 'words' });
    gsap.set(split.words, { opacity: 0, y: 20 });
    gsap.to(split.words, {
      opacity: 1, y: 0,
      duration: 0.7,
      stagger: 0.04,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}

function animateCards() {
  // Pilares
  gsap.from('.ep04-pilar', {
    opacity: 0, y: 40, scale: 0.97, duration: 0.65,
    stagger: { amount: 0.35, grid: [2, 2], from: 'start' },
    ease: 'power3.out',
    scrollTrigger: { trigger: '.ep04-pilares', start: 'top 80%' }
  });

  // Cards dos fundamentos (ep02)
  gsap.from('.ep02-card', {
    opacity: 0, x: -30, duration: 0.7,
    stagger: 0.12, ease: 'power2.out',
    scrollTrigger: { trigger: '.ep02-fundamentos__cards', start: 'top 82%' }
  });

  // Chef roles
  gsap.from('.ep03-role-card', {
    opacity: 0, y: 30, duration: 0.6,
    stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '.ep03-cozinheiro__roles', start: 'top 82%' }
  });

  // Exercício cards
  gsap.from('.ep07-exercise-card', {
    opacity: 0, y: 50, duration: 0.7,
    stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.ep07-exercicios', start: 'top 80%' }
  });

  // Video cards
  gsap.from('.video-card', {
    opacity: 0, y: 24, duration: 0.5,
    stagger: 0.06, ease: 'power2.out',
    scrollTrigger: { trigger: '.video-series', start: 'top 85%' }
  });
}

function animateDiagrams() {
  // Diagrama calculadora (ep02)
  gsap.from('.ep02-diagrama__box', {
    opacity: 0, scale: 0.85, duration: 0.5,
    stagger: 0.15, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.ep02-diagrama', start: 'top 78%' }
  });

  // Diagrama chef
  gsap.from('.chef-diagram__node', {
    opacity: 0, x: -20, duration: 0.6,
    stagger: 0.15, ease: 'power2.out',
    scrollTrigger: { trigger: '.chef-diagram', start: 'top 78%' }
  });
  gsap.from('.chef-diagram__arrow', {
    opacity: 0, scaleX: 0,
    transformOrigin: 'left center',
    duration: 0.5, stagger: 0.2, delay: 0.5, ease: 'power2.out',
    scrollTrigger: { trigger: '.chef-diagram', start: 'top 78%' }
  });
}

function animateRespiros() {
  document.querySelectorAll('.devin-respiro').forEach(respiro => {
    const frase = respiro.querySelector('.js-respiro-text');
    if (!frase) return;
    const split = new SplitType(frase, { types: 'words' });
    gsap.set(split.words, { opacity: 0, y: 20 });
    gsap.to(split.words, {
      opacity: 1, y: 0,
      duration: 0.8, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: {
        trigger: respiro,
        start: 'top 70%',
      }
    });
  });
}

function animateReactLoop() {
  const reactTrack = document.querySelector('.react-loop__track');
  if (!reactTrack) return;

  gsap.to(reactTrack, {
    strokeDashoffset: 0,
    duration: 2, ease: 'power2.inOut',
    scrollTrigger: { trigger: '.react-loop', start: 'top 72%' }
  });

  gsap.from('[data-react-node]', {
    scale: 0.7, opacity: 0, duration: 0.5,
    stagger: 0.15, delay: 0.8, ease: 'back.out(1.5)',
    scrollTrigger: { trigger: '.react-loop', start: 'top 72%' }
  });

  // Ciclo ativo nos nós
  const nodes = document.querySelectorAll('[data-react-node]');
  let current = 0;
  ScrollTrigger.create({
    trigger: '.react-loop',
    start: 'top 72%',
    onEnter: () => setInterval(() => {
      nodes.forEach(n => n.classList.remove('is-active'));
      nodes[current].classList.add('is-active');
      current = (current + 1) % nodes.length;
    }, 1500)
  });
}
```

---

## 15. ROADMAP DE IMPLEMENTAÇÃO PARA CLAUDE CODE

### FASE 1 — Fundação (executar primeiro, sem dependências)

**Prioridade: Crítica**

- [ ] **1.1** Adicionar CDN do Lenis, GSAP, ScrollTrigger, SplitType ao `<head>` do HTML
- [ ] **1.2** Adicionar `JetBrains Mono` ao link de fontes existente
- [ ] **1.3** Adicionar variáveis CSS (`:root { ... }`) ao topo de `devin.css`
- [ ] **1.4** Extrair o bloco `<style>` do body (linhas ~2496–4034) e colar ao final de `devin.css`
- [ ] **1.5** Criar `js/devin.js`, `js/lenis.js`, `js/motion.js`, `js/components.js` com o código desta spec
- [ ] **1.6** Atualizar `<script>` no final do `<body>` para apontar para `js/devin.js` com `type="module"`

### FASE 2 — Refactoring visual urgente

**Prioridade: Alta**

- [ ] **2.1** Converter inline styles do bloco EPOCH para classe `.epoch-grid` e `.epoch-grid__item`
- [ ] **2.2** Converter inline styles dos 3 modos de colaboração para `.collab-modes` e `.collab-mode`
- [ ] **2.3** Converter callouts laranja inline para `.callout-box`
- [ ] **2.4** Adicionar `class="devin-term" data-tooltip="..."` nos 10 jargões mapeados (Seção 6.1)
- [ ] **2.5** Adicionar CSS dos tooltips ao `devin.css`
- [ ] **2.6** Verificar que `max-width: 68ch` é aplicado em todos os parágrafos de corpo filosófico

### FASE 3 — Novos componentes

**Prioridade: Alta**

- [ ] **3.1** Inserir HTML do Sticky ToC após `<nav class="devin-nav">` e adicionar CSS
- [ ] **3.2** Implementar `initToC()` no `js/components.js`
- [ ] **3.3** Inserir Diagrama do Chef (Seção 7.2) antes de `.ep03-cozinheiro__roles`
- [ ] **3.4** Adicionar classe `.ep04-pilares--bento` e CSS do Bento Grid
- [ ] **3.5** Substituir `.ep05-fluxo` pelo componente Loop ReAct circular (Seção 9.2)
- [ ] **3.6** Substituir `.ep07-estrutura` pelo File Explorer mockado (Seção 10.2)
- [ ] **3.7** Inserir as 4 seções Respiro nas posições mapeadas (Seção 11.2) com CSS e motion

### FASE 4 — Redesign vídeos e encerramento

**Prioridade: Média**

- [ ] **4.1** Substituir lista de vídeos pelo grid de cards `.video-series` com thumbnails YouTube
- [ ] **4.2** Criar todos os 8 `.video-card` com dados corretos dos episódios

### FASE 5 — Motion system completo

**Prioridade: Média** (depende de Fases 1-3)

- [ ] **5.1** Inicializar Lenis e conectar ao GSAP ticker
- [ ] **5.2** Implementar `animateHero()` com timeline de entrada
- [ ] **5.3** Implementar `animateSplitTexts()` para todos `.js-split-text`
- [ ] **5.4** Implementar `animateCards()` para pilares, fundamentos, roles, exercícios, vídeos
- [ ] **5.5** Implementar `animateDiagrams()` para calculadora, chef, ReAct loop
- [ ] **5.6** Implementar `animateRespiros()` com SplitType word reveal
- [ ] **5.7** Verificar `prefers-reduced-motion` em todos os pontos

### FASE 6 — QA e polish

- [ ] **6.1** Testar ToC scrollspy em todos os 33+ IDs de seção
- [ ] **6.2** Verificar contraste WCAG em todas as novas cores
- [ ] **6.3** Testar tooltips em mobile (touch — converter para clique em mobile)
- [ ] **6.4** Testar File Explorer tabs com teclado (acessibilidade)
- [ ] **6.5** Verificar que Loop ReAct não causa performance issues (clearInterval ao sair)
- [ ] **6.6** Testar thumbnails YouTube — fallback visual se bloqueado
- [ ] **6.7** Validar responsividade do Bento Grid em 320px, 375px, 768px, 1024px, 1440px

---

## 16. CRITÉRIOS DE QUALIDADE (QA)

A implementação está pronta quando:

1. **Sem inline styles** — zero atributos `style=""` no HTML (exceto `style="display:none"` de toggles)
2. **Sem `<style>` no body** — todo CSS em `devin.css`
3. **Measure controlada** — nenhum parágrafo de corpo com mais de 75ch de largura
4. **ToC funcional** — item ativo muda ao scrollar entre seções
5. **Motion respeitoso** — todas as animações desabilitadas quando `prefers-reduced-motion: reduce`
6. **Acessibilidade tabs** — navegável por teclado (Space/Enter ativa, Arrows navega)
7. **ReAct loop** — `clearInterval` chamado quando seção sai da viewport (sem memory leak)
8. **Lenis** — scroll suave visível e não conflitante com ScrollTrigger
9. **Tooltips** — aparecem no hover desktop, no tap mobile, sem overflow de viewport
10. **Nenhum conteúdo narrativo alterado** — apenas a apresentação visual mudou

---

## 17. REFERÊNCIAS RÁPIDAS

### IDs de seção existentes no HTML

```
#hero · #abertura · #sobre · #proposito · #fundamentos · #calculadora
#vibe-coding-def · #cozinheiro · #ato-2 · #comunicacao-ia · #anatomia-devin
#contexto-persistente · #skills-playbooks · [seções 14-15 sem IDs — adicionar]
#integracao · [seção 17 hands-on] · #mentoria · [transição ato 3]
#lideranca · #amplificacao · #cultura · [métricas] · [acu] · #fechamento · #encerramento
```

### IDs dos vídeos no YouTube

```
Ep 1: 8nMyU-C5Dxc   Ep 2: m69fzdS-EG0   Ep 3: HlgRNYHvOtg   Ep 4: luoGsY5PrLo
Ep 5: rYSyiQznInI   Ep 6: ubBJRgWuAMU   Ep 7: LbzxZDRUk8Y   Ep 8: zQ453MWvBck
```

### Paleta resumida

```
--color-human  : #FF6200   (laranja — responsabilidade humana)
--color-ai     : #00C2A8   (ciano — processamento da máquina)
--bg-navy      : #002D62   (base)
--bg-dark      : #0B1F33   (seções escuras)
--bg-surface   : #1A1D21   (superfície técnica)
--bg-void      : #06101C   (respiros)
--text-primary : #F5F7FA
--text-secondary: #94A3B8
--text-muted   : #64748B
```
