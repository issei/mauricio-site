---
épico: 01
seções: 1-4
status: aprovado
---

======================================================================
MICRO-SDD: HERO & CONTEXTO INICIAL
(Épico 01 — Seções 1-4 da Arquitetura Devin)
======================================================================

## 1. FUNDAMENTAÇÃO ACADÊMICA E CORPORATIVA (O "Para Quê")

### Conceito Raiz — "O Desenvolvedor como Arquiteto Cognitivo"

Este épico materializa o **ato de transformação de identidade profissional** que é o cerne da tese de Vibe Coding. Não se apresenta uma ferramenta; materializa-se uma **mudança existencial** do papel do desenvolvedor na era da IA.

**Qual conceito do material original?**
- **Vídeo 3** ("Evolução da Programação e o Vibe Coding"): transição da interface de programação de sintaxe para linguagem natural.
- **Vídeo 1** ("A Crise Cognitiva"): a IA não trouxe tempo livre — trouxe densidade cognitiva e mudou o gargalo do trabalho.
- **00_ideia**: "Ferramentas mudam. O que precisa evoluir é você."

**Objetivo Cognitivo e Emocional do Usuário:**

Ao sair desta seção, o visitante deve experimentar uma **provocação existencial** (não comercial). Ele entra pensando "vou aprender sobre o Devin" e sai pensando "preciso me reinventar como profissional". A transição de mentalidade é o deliverable real desta seção.

---

## 2. COMPORTAMENTO E EXPERIÊNCIA VISUAL (O "Como se Sente")

### Layout e Arquitetura de Informação

**Seção 1 — HERO (Capa/Tela de Entrada)**
- Fundo: gradiente sutil do `#002D62` (navy corporativo profundo) para `#0B1F33` (escuro quase preto).
- Tipografia dominante: título monumental `"Vibe Coding com Devin"` + subtítulo editorial `"A nova era do desenvolvedor como arquiteto cognitivo"` em itálico.
- CTA visual discreto: ícone de scroll animado ou "Role para começar ↓" em `#FF6200` (laranja queimado).
- **Sensação**: Entrada de documentário corporativo premium. Silenciosa, contemplativa, sem pressa.

**Seção 2 — PERGUNTA-GATILHO**
- Fundo: continua escuro corporativo, mas com ligeira transição vertical (blur suave, noise procedural sutil).
- Texto dominante: frase provocadora em branco puro (`#FFFFFF`) ocupando 60% da altura visual.
- Subtítulo menor em `#F5F7FA` reforçando a proposição.
- **Sensação**: Momento de pausa. O usuário é interpelado diretamente. Não há escape — a pergunta flutua em espaço negativo.

**Seção 3 — APRESENTAÇÃO DO AUTOR**
- Layout: foto/avatar discreto à esquerda (if available), blocos de informação à direita em cards leves.
- Tipografia: diminui em escala (respira espaço), tons de cinza em `#94A3B8` para texto secundário.
- **Sensação**: Credibilidade sem pompa. "Quem é você? Uma pessoa real com 20+ anos de engenharia."

**Seção 4 — PROPÓSITO**
- Tipografia progressiva: primeira frase nega ("Não é apenas aprender uma ferramenta"), segunda amplia contexto ("Ferramentas mudam"), terceira explode em peso ("O que precisa evoluir é você").
- Cor da terceira linha: `#FF6200` (laranja queimado) para reforço de intenção.
- **Sensação**: Construção de tensão narrativa. Cada linha reposiciona a expectativa do visitante.

### Dinâmica de Scroll e Tempo de Leitura

- **Lenis scroll**: duration 1.2s (desktop), suavidade cinética (damping para conferir peso).
- **Pinning cinematográfico**: a HERO (Seção 1) fixa por 4-5 segundos de scroll antes de liberar fluidamente.
- **Zonas de respiro**: entre Seção 2 e 3, pequeno espaço negativo (12vh) permite recuperação visual.
- **Tempo de leitura acumulado**: ~90 segundos para as 4 seções (sem contar pinning).

### Motion System e Coreografia Visual

**Timelines principais:**

1. **heroIntroTimeline** (4.2s total, sequencial):
   - 0.0s: Reveal background via opacity fade
   - 0.8s: Título aparece com y-offset (-100px → 0), stagger 0.08s
   - 1.6s: Subtítulo revela via blur fade (16px → 0)
   - 2.4s: Ícone de scroll pulsa suavemente (ambient motion, repeat)
   - 4.2s: Timeline para — pronto para scroll interativo

2. **perguntaGatilhoTimeline** (onScroll-linked):
   - Texto principal revela linha por linha com stagger 0.12s
   - Subtítulo entra com opacity fade progressiva quando 60% visível

3. **apresentacaoTimeline** (staggered cards):
   - Cada card (pessoal, formação, atuação) entra com: y-offset (60px → 0) + opacity (0 → 1)
   - Stagger: 0.18s entre cards
   - Easing: expo.out

4. **propositoTimeline** (line-by-line reveal):
   - Linha 1: entrada suave (opacity)
   - Linha 2: espera 0.4s, depois entra
   - Linha 3: espera 0.8s, entra com emphasis (laranja + weight bolder)

**Easing dominante**: `expo.out` (primário), `power3.out` (suporte)
**Motion direction**: Eixo Y (vertical), evitar motion lateral
**Scale máxima**: 1.03 (para enfase, não exagero)

---

## 3. ESPECIFICAÇÃO TÉCNICA (O "Como se Constrói")

### Estrutura HTML Semântica

```html
<main class="devin-intro">
  
  <!-- SEÇÃO 1: HERO/CAPA -->
  <section class="hero" id="hero" data-section="hero">
    <header class="hero__header">
      <p class="hero__supertitle">ITAÚ BUPJ · HANDS-ON</p>
      <h1 class="hero__title">Vibe Coding com Devin</h1>
      <p class="hero__subtitle">A nova era do desenvolvedor como <em>arquiteto cognitivo</em></p>
    </header>
    <footer class="hero__footer">
      <p class="hero__credit">Mauricio Yokoyama Issei · Itaú BUPJ · 2026</p>
      <p class="hero__cta-text">Role para começar ↓</p>
      <svg class="hero__scroll-icon" /* animated */></svg>
    </footer>
  </section>

  <!-- SEÇÃO 2: PERGUNTA-GATILHO -->
  <section class="pergunta-gatilho" id="abertura" data-section="pergunta">
    <article class="pergunta-gatilho__content">
      <h2 class="pergunta-gatilho__label">01 · ABERTURA</h2>
      <blockquote class="pergunta-gatilho__main">
        Quantos de vocês passam mais de metade do dia<br />
        resolvendo tarefas repetitivas...<br />
        em vez de desenhar arquitetura?
      </blockquote>
      <p class="pergunta-gatilho__follow">
        Se você levantou a mão — mesmo que mentalmente — esta apresentação é para você.
      </p>
    </article>
  </section>

  <!-- SEÇÃO 3: APRESENTAÇÃO -->
  <section class="apresentacao" id="sobre" data-section="apresentacao">
    <h2 class="apresentacao__label">APRESENTAÇÃO</h2>
    <h3 class="apresentacao__name">Mauricio Yokoyama Issei</h3>
    <p class="apresentacao__posicao">Desenvolvedor desde 2003 · Na Rede desde 2018 · Apoio à conquista de novos clientes</p>
    
    <div class="apresentacao__cards">
      <article class="card card--pessoal">
        <h4 class="card__label">Pessoal</h4>
        <p>44 anos. Casado com a Talita. Pai da Yumi (14), Lucas e Matheus (9).</p>
      </article>
      <article class="card card--formacao">
        <h4 class="card__label">Formação</h4>
        <p>Sistemas de Informação · Operações Logísticas · Estatística Aplicada · Ciência de Dados.</p>
      </article>
      <article class="card card--atuacao">
        <h4 class="card__label">Atuação</h4>
        <p>Mais de 22 anos desenvolvendo sistemas. Desde 2018 no Itaú BUPJ.</p>
      </article>
    </div>
  </section>

  <!-- SEÇÃO 4: PROPÓSITO -->
  <section class="proposito" id="proposito" data-section="proposito">
    <h2 class="proposito__label">02 · PROPÓSITO</h2>
    <div class="proposito__statement">
      <p class="proposito__line-1">Não é apenas aprender uma ferramenta nova.</p>
      <p class="proposito__line-2">Ferramentas mudam. Modelos evoluem todos os dias.</p>
      <p class="proposito__line-3">O que precisa evoluir é você.</p>
    </div>
  </section>

</main>
```

### Design Tokens (Tailwind CSS)

```css
/* Backgrounds */
.bg-navy-deep: #002D62;
.bg-navy-dark: #0B1F33;
.bg-surface-dark: #1A1D21;
.bg-surface-light: #F4F6F9;

/* Text Colors */
.text-primary-dark: #F5F7FA;
.text-primary-light: #25282A;
.text-secondary: #94A3B8;
.text-muted: #64748B;

/* Accents */
.accent-primary: #FF6200;      /* Laranja queimado */
.accent-soft: #FF8A3D;         /* Laranja claro */
.glow-accent: rgba(255, 98, 0, 0.12);

/* Spacing & Sizing */
.spacing-xl: 2rem;
.spacing-2xl: 3rem;
.line-height-tight: 1.2;
.letter-spacing-tight: -0.02em;

/* Shadows (premium, suave) */
.shadow-premium: 0 4px 16px rgba(0, 0, 0, 0.24);
.shadow-light: 0 2px 8px rgba(0, 0, 0, 0.12);
```

### Performance & Renderização

- **GPU Layers máximas para esta seção**: 5 (background gradiente, 2 text masks, 2 animated elements)
- **Blur máximo**: 16px (apenas em transições)
- **will-change**: aplicado apenas durante animação (removido após conclusão)
- **Transform-based animations**: opacity + translate (evita repaint)
- **Lazy-load**: nenhum elemento nesta seção é lazy — tudo critical path

### Responsividade & Accessibility

- **Mobile (viewport < 768px)**: 
  - Título reduz para 32px
  - Subtítulo: italics mantém, mas weight ajusta para legibilidade
  - Cards da Apresentação empilham verticalmente
  - Scroll icon escala para toque
  
- **Contrast**: WCAG AA (mínimo 4.5:1) garantido para todas as cores de texto

- **prefers-reduced-motion**: 
  - Timeline duration reduz para 0.8s (de 4.2s)
  - Stagger elimina (tudo simultâneo)
  - Scroll pinning desativa

---

## 4. CRITÉRIOS DE ACEITAÇÃO (TDD / SDD)

### Testes Automatizados (Playwright/Jest)

```gherkin
Cenário: Hero timeline executa ao carregar
  Quando a página carrega
  Então o background fade-in completa em 0.8s
  E o título aparece com y-offset correto
  E o ícone de scroll pulsa continuamente até interação

Cenário: Pergunta-gatilho revela onScroll
  Quando o usuario scrolla 30% para pergunta-gatilho
  Então o texto principal começa a revelar linha por linha
  E cada linha entra com stagger 0.12s
  E o subtítulo entra com opacity fade

Cenário: Cards de Apresentação entram sequencialmente
  Quando a seção apresentacao entra na viewport
  Então card 1 (pessoal) entra em 0.0s
  E card 2 (formação) entra em 0.18s
  E card 3 (atuação) entra em 0.36s
  E easing é expo.out

Cenário: Propósito linha 3 destaca-se
  Quando proposito entra na viewport
  Então linhas 1-2 entram em branco
  E linha 3 entra em #FF6200 (laranja)
  E linha 3 tem font-weight bolder

Cenário: prefers-reduced-motion desativa motion
  Dado user has prefers-reduced-motion:reduce
  Quando a página carrega
  Então nenhuma animação > 0.8s ocorre
  E nenhum stagger é aplicado
  E pinning é desativado
```

### Critérios de Aprovação Visual

- **Scroll não pode parecer "leve"**: deve transmitir peso institucional
- **Transições devem parecer "contínuas"**: sem saltos, sem cortes abruptos
- **Atmosfera deve parecer "silenciosa"**: não há som, mas há presença (indireta, cinematográfica)
- **Tipografia domina sobre grafismos**: nenhum elemento visual compete com texto
- **Experiência deve parecer "editorializada"**: como ler um artigo premium, não um catálogo

### Graceful Degradation (sem JS / navegadores antigos)

**Fallback sem SplitType:**
- Tipografia revela-se estaticamente (sem stagger)
- Preserva espacamento e hierarquia
- Mantém cores e contraste
- Perda aceitável: apenas a "coreografia" linear

**Fallback sem Lenis:**
- Scroll nativo do navegador
- Animations permanecem (CSS/requestAnimationFrame)
- Perda aceitável: suavidade cinética (damping)

**Fallback sem GSAP:**
- CSS animations como plano B
- Apenas opacity/transform
- Atende todos os critérios exceto timeline orchestration

---

## PRÓXIMOS MICRO-SDDs (Ordem de Execução)

Após aprovação deste épico:

1. **Micro-SDD 02**: Os Três Fundamentos (Seções 5-6) — Arquitetura conceitual visual
2. **Micro-SDD 03**: Analogia do Cozinheiro (Seções 7-8) — Narrativa imersiva
3. **Micro-SDD 04**: Transição & Comunicação com IA (Seções 9-10) — Ponte para Ato II
4. **Micro-SDD 05**: Anatomia do Devin (Seções 11-12) — Educação técnica interativa
5. ... (e assim sucessivamente)

---

## Notas para Execução

- Iniciar com HTML semântico e design tokens apenas
- Implementar timelines em GSAP apenas APÓS validação de markup
- Motion refinement é última etapa — medir CLS, LCP primeiro
- QA visual deve rodar em devices reais: 1080p desktop, iPad, iPhone 14+

---

**Status**: Épicos 01 e 02 aprovados. Prosseguindo para Épico 03.
