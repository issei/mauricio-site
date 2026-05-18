---
épico: 02
seções: 5-6
status: aprovado
---

======================================================================
MICRO-SDD: OS TRÊS FUNDAMENTOS & LIÇÃO DA CALCULADORA
(Épico 02 — Seções 5-6 da Arquitetura Devin)
======================================================================

## 1. FUNDAMENTAÇÃO ACADÊMICA E CORPORATIVA (O "Para Quê")

### Conceito Raiz — "O Esqueleto Invisível que Sustenta Tudo"

Após provocar o visitante (Épico 01), este épico introduz os **alicerces filosóficos** que sustentam toda a tese de Vibe Coding. Não é mais "por que estou aqui?", mas "que conceitos precisam estar claros antes de entender a ferramenta?".

**Mapeamento aos materiais:**
- **Vídeo 1** ("A Crise Cognitiva"): o pensamento é o gargalo, não o código.
- **Vídeo 2** ("IA como Agente"): a inteligência é a qualidade de resposta a problemas inéditos.
- **01_conceitos_pesquisados.md**: Ferramenta (o que expande), Pensamento (processo), Inteligência (qualidade).

**Objetivos Cognitivos:**

1. **Seção 5 (Os Três Fundamentos):** Estabelecer que FERRAMENTA, PENSAMENTO e INTELIGÊNCIA são conceitos distintos que *não* se sobrepõem. O visitante aprende a diferenciar: uma ferramenta é um *recurso*, pensamento é um *processo*, inteligência é uma *qualidade*. A visualização deve indicar hierarquia ou interconexão.

2. **Seção 6 (A Lição da Calculadora):** Histórico concreto mostrando que ferramenta cognitiva não substitui inteligência — liberta-a. A calculadora prova essa tese há 500 anos: não destruiu matemáticos, libertou-os de cálculos repetitivos para pensamento estratégico.

**Transição esperada:** Visitante sai compreendendo que a IA (ferramenta) é, de fato, apenas a calculadora do século 21 — e que o papel do desenvolvedor é garantir que a IA execute bem (execução) enquanto ele governa a *inteligência* (decisão, contexto, julgamento).

---

## 2. COMPORTAMENTO E EXPERIÊNCIA VISUAL (O "Como se Sente")

### Layout e Arquitetura de Informação

**Seção 5 — OS TRÊS FUNDAMENTOS**

**Faseamento visual:**
1. **Chapéu introdutório** (topo, texto pequeno, cinza em `#94A3B8`):
   - Frase: "Antes da ferramenta, três palavras. O esqueleto invisível que sustenta todo o resto desta conversa."
   - Sensação: pausa contemplativa, preparação para conceitos densos.
   - Tempo de leitura: ~5 segundos.

2. **Três cards/blocos conceituais** (centro, layout em 3 colunas ou vertical com stagger):
   - **Card 1 — FERRAMENTA** (títlo em branco, subtítulo em laranja `#FF6200`):
     - Subtítulo: "O que expande você"
     - Corpo: definição em `#F5F7FA`, ~3-4 linhas.
     - Fundo: `#1A1D21` (surface dark) com border suave em `#334155`.
   - **Card 2 — PENSAMENTO** (estrutura idêntica):
     - Subtítulo: "O processo em execução"
     - Corpo: definição em `#F5F7FA`.
   - **Card 3 — INTELIGÊNCIA** (estrutura idêntica):
     - Subtítulo: "A qualidade do pensamento"
     - Corpo: definição em `#F5F7FA`.

**Nota visual editorial:** Os três cards podem ter uma conexão visual sutil (linhas pontilhadas ou gradientes conectando) para indicar hierarquia ou interdependência. Alternativa: cada card tem uma cor de accent diferente (laranja, azul soft, verde muted) para diferenciação rápida.

**Sensação geral da Seção 5:**
- Densa intelectualmente, mas respirável visualmente (muito espaço negativo entre cards).
- Atmosfera: "aula magistral gravada" — conteúdo acadêmico, execução editorial premium.
- Tipografia domina; sem grafismos competindo.

---

**Seção 6 — A FERRAMENTA: A LIÇÃO DA CALCULADORA**

**Faseamento visual:**
1. **Título principal** (topo, grande, branco, `#FFFFFF`):
   - "A calculadora foi a primeira IA da história."
   - Peso: bold ou 700.
   - Tamanho: ~48-56px desktop, 32px mobile.

2. **Subtítulo** (abaixo, menor, itálico, cor laranja suave `#FF8A3D`):
   - "Ela não nos fez mais burros. Ela nos liberou para o que importa."
   - Sensação: confiante, motivadora.

3. **Corpo textual** (bloco centrado, `#F5F7FA`, ~200-250 palavras):
   - Explicação conceitual sobre terceirização cognitiva.
   - Estrutura: 2-3 parágrafos curtos.
   - Nota editorial: destaques (negritas) em conceitos-chave como "terceiriza", "trabalho braçal", "pensamento criativo".

4. **Diagrama visual** (abaixo, centro):
   ```
   [ PROBLEMA ] ──→ [ FERRAMENTA ] ──→ [ RESULTADO ]
   ```
   - Estilo: boxes simples com linhas connecting.
   - Cada box tem uma legenda em uma linha abaixo.
   - Cores: fundo boxes em `#0B1F33`, texto em `#F5F7FA`, linhas em `#FF6200`.
   - Animação (opcional): entrada sequencial (box 1 → linha → box 2 → linha → box 3) com stagger 0.2s, opacity fade.

**Sensação geral da Seção 6:**
- Narrativa histórica + abstração conceitual + visualização prática.
- Tom: didático, mas não condescendente.
- Transição esperada: visitante compreende que a IA é o evento contínuo de ferramentas cognitivas na história humana.

### Dinâmica de Scroll e Tempo de Leitura

- **Scroll nativo (não-pinned):** ambas seções fluem naturalmente com o scroll.
- **Zona de respiro:** pequeno espaço negativo (8-10vh) entre Seção 5 e Seção 6.
- **Tempo de leitura acumulado:** ~120 segundos (Seção 5: ~45s leitura + reveal motion, Seção 6: ~75s leitura + diagrama).

### Motion System e Coreografia Visual

**Timelines principais:**

1. **fundamentosIntroTimeline** (onScroll-linked, inicia quando Seção 5 atinge 40% viewport):
   - Chapéu introdutório: fade-in com blur (16px → 0), duration 0.6s.
   - Card 1 (Ferramenta): y-offset (40px → 0) + opacity, duration 0.5s, easing expo.out.
   - Card 2 (Pensamento): delay 0.18s, after Card 1.
   - Card 3 (Inteligência): delay 0.18s, after Card 2.
   - Total: ~1.2s para toda entrada.

2. **calculadoraTimeline** (onScroll-linked, inicia quando Seção 6 atinge viewport):
   - Título: reveal com opacity fade, duration 0.6s.
   - Subtítulo: delay 0.2s, opacity fade, duration 0.4s.
   - Corpo: staggered line-by-line reveal (se usar SplitType), duration 0.8s total, stagger 0.06s.
   - Diagrama: entrada sequencial das 3 boxes + 2 linhas connecting, stagger 0.2s, total 1.2s.

**Easing:** expo.out (primário), power3.out (subtítulos).
**Motion direction:** Y-axis (vertical), sem motion lateral.
**Scale:** nenhum scale no diagrama (apenas opacity + translate para os boxes).

---

## 3. ESPECIFICAÇÃO TÉCNICA (O "Como se Constrói")

### Estrutura HTML Semântica

```html
<!-- SEÇÃO 5: OS TRÊS FUNDAMENTOS -->
<section class="fundamentos" id="fundamentos" data-section="fundamentos">
  <article class="fundamentos__intro">
    <p class="fundamentos__chapeu">
      Antes da ferramenta, três palavras.<br />
      O esqueleto invisível que sustenta todo o resto desta conversa.
    </p>
  </article>

  <div class="fundamentos__cards">
    <article class="card card--ferramenta">
      <h3 class="card__title">FERRAMENTA</h3>
      <p class="card__subtitle">O que expande você</p>
      <p class="card__body">
        Uma ferramenta é um recurso criado para facilitar, aprimorar ou tornar possível 
        a execução de uma tarefa. Ela serve para expandir as capacidades naturais do 
        ser humano — sejam físicas ou mentais — reduzindo o esforço necessário para 
        atingir um objetivo.
      </p>
      <p class="card__example">
        A calculadora é a primeira ferramenta cognitiva da humanidade: em vez de gastar 
        energia mental com cálculos repetitivos, você terceiriza esse esforço e libera 
        sua mente para o que importa.
      </p>
    </article>

    <article class="card card--pensamento">
      <h3 class="card__title">PENSAMENTO</h3>
      <p class="card__subtitle">O processo em execução</p>
      <p class="card__body">
        Definir o pensamento é como descrever o vento: você não o vê diretamente, 
        mas sente seus efeitos em todas as ações. Em essência, pensamento é a nossa 
        interface com a realidade. É o processo de manipular informações para formar 
        conceitos, criar hipóteses, lembrar e decidir caminhos. É o que acontece 
        entre o problema e a solução — o processo cognitivo em execução.
      </p>
    </article>

    <article class="card card--inteligencia">
      <h3 class="card__title">INTELIGÊNCIA</h3>
      <p class="card__subtitle">A qualidade do pensamento</p>
      <p class="card__body">
        Se o pensamento é a atividade em si, a inteligência é a qualidade dessa atividade. 
        Inteligência é a capacidade adaptativa de produzir bons resultados diante de 
        problemas inéditos, objetivos ambíguos ou mudanças inesperadas de cenário. É o 
        que separa quem resolve bem uma crise de quem se paralisa diante dela.
      </p>
    </article>
  </div>
</section>

<!-- SEÇÃO 6: A LIÇÃO DA CALCULADORA -->
<section class="calculadora" id="calculadora" data-section="calculadora">
  <header class="calculadora__header">
    <h2 class="calculadora__title">A calculadora foi a primeira IA da história.</h2>
    <p class="calculadora__subtitle">
      Ela não nos fez mais burros. Ela nos liberou para o que importa.
    </p>
  </header>

  <article class="calculadora__body">
    <p>
      O cérebro humano usa o pensamento analítico para processar cálculos matemáticos 
      de forma sequencial e lógica. Mas esse processamento gasta tempo e energia metabólica.
    </p>
    <p>
      A calculadora "terceiriza" esse esforço mecânico — ela processa informação matemática 
      de forma instantânea e devolve sua mente para tarefas de maior nível cognitivo.
    </p>
    <p>
      A IA generativa é a evolução máxima dessa calculadora. Não apenas matemática — 
      <strong>cognitiva</strong>. Ela assume o trabalho braçal do pensamento repetitivo 
      para que você possa focar no trabalho estratégico do pensamento criativo.
    </p>
  </article>

  <figure class="calculadora__diagram">
    <div class="diagram__box diagram__box--1">
      <span class="diagram__label">PROBLEMA</span>
      <p class="diagram__desc">A tarefa que precisa ser resolvida</p>
    </div>
    <svg class="diagram__arrow diagram__arrow--1" viewBox="0 0 60 20" preserveAspectRatio="none">
      <line x1="0" y1="10" x2="50" y2="10" stroke="#FF6200" stroke-width="2" marker-end="url(#arrowhead)" />
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#FF6200" />
        </marker>
      </defs>
    </svg>
    <div class="diagram__box diagram__box--2">
      <span class="diagram__label">FERRAMENTA</span>
      <p class="diagram__desc">O que reduz o esforço de resolução (calculadora → IA)</p>
    </div>
    <svg class="diagram__arrow diagram__arrow--2" viewBox="0 0 60 20" preserveAspectRatio="none">
      <line x1="0" y1="10" x2="50" y2="10" stroke="#FF6200" stroke-width="2" marker-end="url(#arrowhead)" />
    </svg>
    <div class="diagram__box diagram__box--3">
      <span class="diagram__label">RESULTADO</span>
      <p class="diagram__desc">O que você faz com a energia mental liberada</p>
    </div>
  </figure>
</section>
```

### Design Tokens (Tailwind CSS) — Extensões para Épico 02

```css
/* Cards Fundamentos */
.card {
  background: #1A1D21;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 2rem;
  gap: 1rem;
}

.card__title {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #FFFFFF;
}

.card__subtitle {
  font-size: 14px;
  color: #FF6200;
  font-style: italic;
}

.card__body, .card__example {
  font-size: 14px;
  line-height: 1.6;
  color: #F5F7FA;
}

/* Diagrama Calculadora */
.diagram__box {
  background: #0B1F33;
  border: 2px solid #FF6200;
  border-radius: 6px;
  padding: 1.5rem;
  text-align: center;
  min-width: 180px;
}

.diagram__label {
  font-weight: 700;
  font-size: 16px;
  color: #FFFFFF;
}

.diagram__desc {
  font-size: 12px;
  color: #94A3B8;
  margin-top: 0.5rem;
}

.diagram__arrow {
  width: 100%;
  height: 20px;
  fill: none;
}
```

### Performance & Renderização

- **GPU Layers máximas para esta seção:** 7 (3 cards + diagrama + backgrounds animadas).
- **Blur máximo:** 0px (sem blur neste épico — clareza visual é prioridade).
- **will-change:** aplicado aos cards durante scroll-linked reveal (removido após conclusão).
- **Transform-based animations:** opacity + translate (cards) + opacity (diagrama boxes).
- **Lazy-load:** nenhum elemento lazy — tudo critical path.

### Responsividade & Accessibility

- **Desktop (viewport ≥ 1024px):**
  - Seção 5: 3 cards lado a lado (grid 3 colunas, gap 2rem).
  - Seção 6: texto centralizado (~80% width), diagrama em linha horizontal.

- **Tablet (768px ≤ viewport < 1024px):**
  - Seção 5: 2 cards por linha (grid 2 colunas), terceiro card em linha nova.
  - Seção 6: texto 100%, diagrama empilhado (vertical stack).

- **Mobile (viewport < 768px):**
  - Seção 5: 1 card por linha (stack vertical), cards com padding reduzido.
  - Seção 6: texto 100%, diagrama vertical (boxes empilhadas).
  - Títulos reduzem para 28px.
  - Subtítulos reduzem para 12px.

- **Contrast:** WCAG AA garantido (mínimo 4.5:1) em todas as cores de texto.
- **prefers-reduced-motion:**
  - Blur/reveal timelines eliminadas (tudo entra simultâneo).
  - Stagger reduz para 0.0s (sem delay entre cards/boxes).
  - Scroll pinning desativa.

---

## 4. CRITÉRIOS DE ACEITAÇÃO (TDD / SDD)

### Testes Automatizados (Playwright/Jest)

```gherkin
Cenário: Seção Fundamentos carrega com três cards
  Quando a página carrega e Fundamentos entra na viewport
  Então o chapéu introdutório aparece com blur fade
  E os três cards entram com stagger 0.18s
  E cada card tem border, background e text corretos
  E as cores WCAG AA (4.5:1) são respeitadas

Cenário: Diagrama Calculadora revela sequencial
  Quando a Seção 6 (Calculadora) entra na viewport
  Então o título aparece com opacity fade, duration 0.6s
  E o subtítulo entra 0.2s depois
  E o corpo de texto revela linha por linha (SplitType)
  E o diagrama revela boxes em sequência: Box 1 → Arrow → Box 2 → Arrow → Box 3
  E cada box tem stagger 0.2s
  E easing é expo.out

Cenário: Layout responsivo em mobile
  Quando viewport < 768px
  Então Seção 5 cards empilham em 1 coluna
  E Seção 6 diagrama empilha em vertical
  E títulos reduzem para 28px
  E nenhum overflow horizontal ocorre

Cenário: prefers-reduced-motion desativa motion
  Dado user has prefers-reduced-motion:reduce
  Quando as seções entram na viewport
  Então nenhuma animação > 0.8s ocorre
  E nenhum stagger é aplicado
  E blur é eliminado
  E tudo entra simultâneo

Cenário: Diagram Arrow SVG renderiza em escala
  Quando o diagrama carrega
  Então os arrows SVG resizeiam com o container
  E não há truncamento em mobile
  E cor #FF6200 é consistente
```

### Critérios de Aprovação Visual

- **Cards devem parecer "intelectuais":** bordas suaves, espaço negativo ao redor, tipografia legível, sem poluição.
- **Diagrama deve parecer "limpo":** boxes simples, setas proporcionais, legível em todos os tamanhos.
- **Scroll continua transmitindo peso:** sem "saltos" entre seções 5 e 6; transição suave via espaço negativo.
- **Cores respeitam hierarquia:** laranja (#FF6200) reforça conceitos-chave sem distração.
- **Tipografia domina:** nenhum grafismo compete com texto; diagrama é suporte visual, não protagonista.

### Graceful Degradation (sem JS / navegadores antigos)

**Fallback sem SplitType:**
- Corpo da Seção 6 revela-se estaticamente em bloco (sem line-by-line stagger).
- Cards entram todos simultâneos (sem stagger).
- Preserva espacamento, cores, contraste.

**Fallback sem Lenis:**
- Scroll nativo; animations permanecem (CSS/requestAnimationFrame).
- Perda aceitável: suavidade cinética.

**Fallback sem GSAP:**
- CSS animations como plano B (opacity + transform).
- Diagrama pode revelar via CSS keyframes (sequencial).

---

## PRÓXIMOS MICRO-SDDs (Ordem de Execução)

1. **Micro-SDD 03**: Pausa (Vibe Coding) + Analogia do Cozinheiro (Seções 7-8) — Ponte narrativa para contexto prático
2. **Micro-SDD 04**: Transição & Comunicação com IA (Seções 9-10) — Operacional / Educação
3. **Micro-SDD 05**: Anatomia do Devin + Contexto Persistente (Seções 11-12) — Técnico-introdutório
4. ... (e assim sucessivamente)

---

## Notas para Execução

- Seção 5 é *densa intelectualmente*, mas *respirável visualmente* — usar muito espaço negativo.
- Seção 6 combina narrativa + abstração + visualização — estrutura em 3 camadas (título, corpo, diagrama).
- Diagrama SVG deve reescalar responsivamente (usar `preserveAspectRatio="xMidYMid meet"` ou wrapper CSS).
- Motion deve reforçar hierarquia (títulos entram antes, diagrama sequ após corpo).
- QA visual: verificar em 1080p desktop, iPad, iPhone 14+ com e sem prefers-reduced-motion.
