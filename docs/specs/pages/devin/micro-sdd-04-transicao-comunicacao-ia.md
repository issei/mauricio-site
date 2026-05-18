---
épico: 04
seções: 9-10
status: aprovado
---

======================================================================
MICRO-SDD: TRANSIÇÃO & COMUNICAÇÃO COM IA
(Épico 04 — Seções 9-10 da Arquitetura Devin)
======================================================================

## 1. FUNDAMENTAÇÃO ACADÊMICA E CORPORATIVA (O "Para Quê")

### Conceito Raiz — "Do Filosófico ao Operacional: Ponte entre Atos"

Este épico realiza uma **transição estrutural** (Seção 9) e inaugura o **conhecimento operacional** (Seção 10) que governa toda a Ato II.

**Arquitetura em duas fases:**

1. **Seção 9 (Transição — ATO II):** Divisor de capítulo que marca a mudança do "Por quê?" (Ato I) para o "Como?" (Ato II). Frase provocadora final: "Mas afinal — quem é o Devin?"

2. **Seção 10 (Comunicação com IA):** Quatro pilares universais que governam como se comunica com *qualquer* agente de IA (Devin, Copilot, Stackspot, etc.). Estes pilares são a **base epistêmica** para tudo que virá: Skills, Playbooks, Knowledge, Hands-on.

**Mapeamento aos materiais:**
- **00_ideia**: transição de mentalidade (do "usar a ferramenta" para "governar a ferramenta").
- **Vídeo 2** ("IA como Agente"): agentes respondem à qualidade da comunicação.
- **rules.md**: princípios operacionais (clareza, contexto, exemplos, iteração) são *regras governança*.

**Objetivo Cognitivo e Emocional:**

1. **Seção 9:** Visitante sente o "virar de página" narrativo. Está pronto para aprender técnica.
2. **Seção 10:** Visitante aprende que comunicação com IA **não é magia** — é engenharia de prompt aplicada. Os quatro pilares (Clareza, Contexto, Exemplos, Iteração) são o *idioma* da colaboração com agentes.

**Transição esperada:** "Agora que entendo meu papel, como falo com a ferramenta para garantir que ela entenda?"

---

## 2. COMPORTAMENTO E EXPERIÊNCIA VISUAL (O "Como se Sente")

### Layout e Arquitetura de Informação

**Seção 9 — TRANSIÇÃO: ATO II**

**Faseamento visual:**
- **Fundo:** Diferenciado do restante (pode ser `#0B1F33` + gradiente mais escuro ou `#1A1D21`).
- **Tipografia:** Monumental, muito espaço negativo.
- **Composição em 3 linhas:**

  1. **Rótulo** (topo, pequeno, discreto, `#FF6200`):
     - "ATO II"
     - Tamanho: 12-14px, all-caps, letter-spacing 0.1em.

  2. **Título do Ato** (meio, grande):
     - "A ferramenta na prática"
     - Tamanho: 48-64px desktop, 32px mobile.
     - Cor: `#FFFFFF`.
     - Peso: 600 (semibold) ou 700 (bold).

  3. **Frase de Transição** (abaixo, pergunta provocadora, em linhas):
     - "Mas afinal —"
     - "quem é o Devin?"
     - Tamanho: 40-48px, itálico, `#F5F7FA`.
     - Estrutura: quebra em 2 linhas para ritmo.

**Sensação geral:**
- Monumental mas não poluído.
- Atmosfera: mudança de ato, elevação narrativa.
- Tempo de leitura: ~15-20 segundos.
- Sem motion: estática, permite absorção visual.

---

**Seção 10 — COMUNICAÇÃO COM IA: QUATRO PILARES**

**Faseamento visual:**

1. **Título** (topo):
   - "Quatro pilares para falar com qualquer agente de IA."
   - Tamanho: 40-48px, branco, centralizados.

2. **Subtítulo explicativo** (abaixo do título):
   - Texto contextualizador sobre engenharia de prompt.
   - Tamanho: 16px, `#F5F7FA`, ~100-120 palavras.
   - Posição: centro, ~70% width.

3. **Quatro Pilares** (layout em 2×2 grid desktop, stack mobile):
   - Cada pilar é um **card com três camadas:**

     **Card Structure:**
     - **Header:** Número (01, 02, 03, 04) + Nome do Pilar (CLAREZA, CONTEXTO, EXEMPLOS, ITERAÇÃO)
       - Número: `#FF6200`, tamanho 18px, bold.
       - Nome: `#FFFFFF`, tamanho 18px, bold.
     - **Corpo:** Explicação conceitual (3-4 frases).
       - Cor: `#F5F7FA`, tamanho 14px, line-height 1.7.
     - **Exemplo:** Código ou prompt de contraste (pouco claro vs. claro).
       - Background: `#0B1F33`, border esquerdo `#FF6200`, monospace font (14px).
       - Duas seções (antes/depois) ou destacadas com bold.

   **Estilo Visual dos Cards:**
   - Fundo: `#1A1D21`, border suave `#334155`.
   - Padding: 2rem.
   - Border-radius: 8px.
   - Gap entre cards: 2rem (desktop), 1.5rem (mobile).

**Sensação geral:**
- Educacional, estruturado, não denso.
- Cada pilar é auto-contido (legível independentemente).
- Exemplos são concretos, não abstratos.
- Progressão: Pilares 1-3 são conceituais → Pilar 4 é mentalidade.

### Dinâmica de Scroll e Tempo de Leitura

- **Seção 9:** Scroll suave, sem pinning. Tempo: ~15-20 segundos.
- **Espaço de respiro:** 8-10vh entre Seção 9 e Seção 10.
- **Seção 10:** Scroll nativo. Tempo: ~180 segundos (título + 4 pilares × ~45s cada).
- **Tempo total acumulado:** ~3-3.5 minutos.

### Motion System e Coreografia Visual

**Timelines principais:**

1. **atoDoisTransicaoTimeline** (sem scroll-link, load-based):
   - Rótulo "ATO II": fade-in, duration 0.4s, delay 0.2s.
   - Título "A ferramenta na prática": fade + y-offset suave (20px → 0), duration 0.6s, delay 0.6s.
   - Frase "Mas afinal —": fade, duration 0.5s, delay 1.2s.
   - Frase "quem é o Devin?": fade + scale (0.95 → 1.0), duration 0.6s, delay 1.7s, easing expo.out.
   - **Total:** 2.3s, sequencial, ritmo lento e reverente.

2. **comunicacaoIntroTimeline** (onScroll-linked, inicia quando Seção 10 atinge 40% viewport):
   - Título: fade + blur (8px → 0), duration 0.6s.
   - Subtítulo: fade, duration 0.5s, delay 0.3s.
   - Quatro cards: entrada em stagger, cada card y-offset (40px → 0) + opacity, stagger 0.15s, easing expo.out.
   - **Total:** ~1.3s para cards.

**Easing:** expo.out (primário), power3.out (suporte).
**Motion direction:** Y-axis (vertical).
**Scale:** 0.95 → 1.0 apenas em "quem é o Devin?" para ênfase final.

---

## 3. ESPECIFICAÇÃO TÉCNICA (O "Como se Constrói")

### Estrutura HTML Semântica

```html
<!-- SEÇÃO 9: TRANSIÇÃO — ATO II -->
<section class="transicao-ato-dois" id="ato-2" data-section="transicao">
  <article class="transicao__content">
    <p class="transicao__label">ATO II</p>
    <h2 class="transicao__title">A ferramenta na prática</h2>
    <blockquote class="transicao__question">
      <p class="transicao__question-line-1">Mas afinal —</p>
      <p class="transicao__question-line-2">quem é o Devin?</p>
    </blockquote>
  </article>
</section>

<!-- SEÇÃO 10: COMUNICAÇÃO COM IA — QUATRO PILARES -->
<section class="comunicacao-ia" id="comunicacao-ia" data-section="comunicacao">
  <header class="comunicacao__header">
    <h2 class="comunicacao__title">
      Quatro pilares para falar com qualquer agente de IA.
    </h2>
    <p class="comunicacao__subtitle">
      As lições da engenharia de prompt valem para qualquer comunicação humana de 
      alto nível. Dominar esses quatro princípios muda a qualidade do que você 
      obtém de qualquer agente — Devin, Copilot, Stackspot ou qualquer outro.
    </p>
  </header>

  <div class="comunicacao__pilares">
    <article class="pilar pilar--01">
      <header class="pilar__header">
        <span class="pilar__number">01</span>
        <h3 class="pilar__name">CLAREZA</h3>
      </header>
      <p class="pilar__body">
        Comunique como um profissional sênior orientando um iniciante altamente capaz. 
        Sem ambiguidade, sem subentendidos.
      </p>
      <p class="pilar__explanation">
        A IA vai interpretar exatamente o que você escreveu — não o que você quis dizer. 
        Se a instrução for vaga, o resultado será vago.
      </p>
      <div class="pilar__example">
        <p class="example__label">❌ Pouco claro:</p>
        <p class="example__text"><em>"Melhore esse código."</em></p>
        <p class="example__label" style="margin-top: 1rem;">✅ Claro:</p>
        <p class="example__text">
          <em>"Refatore esse método para seguir o princípio de responsabilidade única, 
          sem alterar o comportamento externo e mantendo os testes existentes passando."</em>
        </p>
      </div>
    </article>

    <article class="pilar pilar--02">
      <header class="pilar__header">
        <span class="pilar__number">02</span>
        <h3 class="pilar__name">CONTEXTO</h3>
      </header>
      <p class="pilar__body">
        Forneça o cenário, o histórico e as restrições. A IA executa um erro com 
        a mesma velocidade que executa um acerto.
      </p>
      <p class="pilar__explanation">
        Contexto inclui: qual sistema está sendo modificado, quais são as regras de 
        negócio relevantes, quais decisões já foram tomadas e por quê, e quais são 
        os limites que não podem ser ultrapassados.
      </p>
      <div class="pilar__example">
        <p class="example__dica">
          <strong>Dica:</strong> Quanto mais você tratar a IA como um colaborador 
          que acabou de entrar no projeto, mais assertivo será o resultado.
        </p>
      </div>
    </article>

    <article class="pilar pilar--03">
      <header class="pilar__header">
        <span class="pilar__number">03</span>
        <h3 class="pilar__name">EXEMPLOS</h3>
      </header>
      <p class="pilar__body">
        Mostrar é mais eficiente do que explicar. Sempre que possível, inclua um 
        exemplo do resultado esperado.
      </p>
      <p class="pilar__explanation">
        Em vez de descrever o formato da saída, mostre um caso concreto. A IA aprende 
        por padrão — dar um exemplo é o atalho mais eficiente para alinhar expectativas.
      </p>
      <div class="pilar__example">
        <p class="example__dica">
          <strong>Exemplo:</strong> Ao pedir um relatório, cole um exemplo de relatório 
          bem-feito. Ao pedir refatoração, mostre um trecho já refatorado como referência.
        </p>
      </div>
    </article>

    <article class="pilar pilar--04">
      <header class="pilar__header">
        <span class="pilar__number">04</span>
        <h3 class="pilar__name">ITERAÇÃO</h3>
      </header>
      <p class="pilar__body">
        Encare a comunicação com a IA como um ciclo, não como um disparo único. 
        Refine, ajuste, recalibre.
      </p>
      <p class="pilar__explanation">
        Nenhum prompt perfeito sai de primeira — assim como nenhuma conversa importante 
        acontece em uma única fala. Se o resultado não for o ideal, analise onde a 
        instrução falhou e tente novamente com mais precisão.
      </p>
      <div class="pilar__example">
        <p class="example__label">✅ Postura correta:</p>
        <p class="example__text">
          <em>"O resultado não foi o esperado. O que no meu prompt causou isso?"</em>
        </p>
        <p class="example__label" style="margin-top: 0.5rem;">❌ Postura incorreta:</p>
        <p class="example__text"><em>"A IA não presta."</em></p>
      </div>
    </article>
  </div>
</section>
```

### Design Tokens (Tailwind CSS) — Extensões para Épico 04

```css
/* Transição ATO II */
.transicao__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #FF6200;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.transicao__title {
  font-size: 64px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 2rem;
}

.transicao__question-line-1 {
  font-size: 48px;
  font-style: italic;
  color: #F5F7FA;
  margin-bottom: 0.5rem;
}

.transicao__question-line-2 {
  font-size: 48px;
  font-style: italic;
  color: #F5F7FA;
}

/* Comunicação com IA */
.comunicacao__title {
  font-size: 48px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1.5rem;
}

.comunicacao__subtitle {
  font-size: 16px;
  color: #F5F7FA;
  line-height: 1.8;
  max-width: 80%;
  margin: 0 auto 3rem;
}

/* Pilares */
.pilar {
  background: #1A1D21;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 2rem;
}

.pilar__header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.pilar__number {
  font-size: 20px;
  font-weight: 700;
  color: #FF6200;
}

.pilar__name {
  font-size: 18px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.05em;
}

.pilar__body {
  font-size: 15px;
  color: #F5F7FA;
  line-height: 1.7;
  margin-bottom: 1rem;
  font-weight: 500;
}

.pilar__explanation {
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.pilar__example {
  background: #0B1F33;
  border-left: 3px solid #FF6200;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.example__label {
  font-size: 12px;
  font-weight: 600;
  color: #94A3B8;
  margin-bottom: 0.5rem;
}

.example__text {
  font-size: 13px;
  color: #F5F7FA;
  font-family: 'Courier New', monospace;
}

.example__dica {
  font-size: 14px;
  color: #F5F7FA;
  line-height: 1.6;
}
```

### Performance & Renderização

- **GPU Layers máximas para esta seção:** 8 (1 para Seção 9, 7 para Seção 10 com 4 cards).
- **Blur máximo:** 8px (apenas no título de Seção 10).
- **will-change:** aplicado apenas durante timelines.
- **Transform-based animations:** opacity + translate (cards, linhas).
- **Lazy-load:** nenhum elemento lazy — tudo critical path.

### Responsividade & Accessibility

- **Desktop (viewport ≥ 1024px):**
  - Seção 9: Tipografia ~64px, centrada.
  - Seção 10: 4 pilares em grid 2×2.

- **Tablet (768px ≤ viewport < 1024px):**
  - Seção 9: Tipografia ~48px.
  - Seção 10: 2 pilares por linha (grid 2 colunas).

- **Mobile (viewport < 768px):**
  - Seção 9: Tipografia ~32px para título.
  - Seção 10: 1 pilar por linha (stack vertical).
  - Exemplos de código: truncam com scroll horizontal (ou reescala para fit).

- **Contrast:** WCAG AA (4.5:1) em todos os textos.
- **prefers-reduced-motion:**
  - Seção 9 timeline elimina delay (tudo simultâneo).
  - Seção 10 cards entram simultâneos (sem stagger).
  - Scale eliminada.

---

## 4. CRITÉRIOS DE ACEITAÇÃO (TDD / SDD)

### Testes Automatizados (Playwright/Jest)

```gherkin
Cenário: Transição ATO II executa com ritmo
  Quando a página carrega
  Então rótulo "ATO II" aparece em 0.2s delay
  E título "A ferramenta na prática" aparece em 0.6s delay
  E pergunta "Mas afinal —" aparece em 1.2s delay
  E pergunta "quem é o Devin?" aparece em 1.7s delay com scale 0.95→1.0

Cenário: Quatro Pilares carregam em grid responsivo
  Quando a Seção 10 entra na viewport
  Então título e subtítulo entram com blur fade
  E os 4 pilares entram com stagger 0.15s
  Quando viewport ≥ 1024px
  Então pilares layout em 2×2 grid
  Quando viewport 768px-1024px
  Então pilares layout em 2 colunas (2+2)
  Quando viewport < 768px
  Então pilares empilham em 1 coluna

Cenário: Exemplos de prompt renderizam corretamente
  Quando página carrega
  Então exemplos aparecem em fundo escuro (#0B1F33)
  E border esquerdo é laranja (#FF6200)
  E tipografia é monospace 13px
  E contraste WCAG AA é respeitado

Cenário: prefers-reduced-motion desativa motion
  Dado user has prefers-reduced-motion:reduce
  Quando página carrega
  Então seção 9 timeline é instantânea (sem delay)
  E seção 10 cards entram simultâneos
  E nenhum scale é aplicado
  E blur é eliminado

Cenário: Transição marca mudança narrativa
  Quando scrollar sobre Seção 9
  Então fundo diferenciado marca "mudança de ato"
  E tipografia monumental sinaliza importância
  E sem competição com outros elementos
```

### Critérios de Aprovação Visual

- **Seção 9 deve parecer "passagem de capítulo":** monumental mas não poluído, espaço negativo domina.
- **Pergunta "quem é o Devin?" deve ter impacto:** deve fazer visitante antecipado para Seção 11.
- **Pilares devem parecer "educacionais":** cards bem diferenciados, exemplos claros e concretos.
- **Exemplos devem ser legíveis:** contraste monospace vs. background, fácil de copiar/colar.
- **Grid responsivo deve fluir:** sem truncamento, sem quebra de layout em mobile.
- **Progressão visual:** Pilar 1-3 conceitual → Pilar 4 mentalidade (clareza de hierarquia).

### Graceful Degradation (sem JS / navegadores antigos)

**Fallback sem SplitType:**
- Todos os textos reveiam estaticamente (sem stagger).

**Fallback sem Lenis:**
- Scroll nativo; animations permanecem.

**Fallback sem GSAP:**
- CSS animations para opacity + translate.
- Delay entre elementos removido.

---

## PRÓXIMOS MICRO-SDDs (Ordem de Execução)

1. **Micro-SDD 05**: Anatomia do Devin + Contexto Persistente (Seções 11-12) — Técnico-introdutório
2. **Micro-SDD 06**: Skills + Playbooks + Knowledge (Seções 13-15) — Educação técnica interativa
3. ... (e assim sucessivamente)

---

## Notas para Execução

- Seção 9 deve ser tratada como "divisor de capítulo" — diferenciação visual vs. Ato I é crítica.
- Seção 10 pilares seguem padrão similar a Épicos 02-03 (cards estruturados) — reuso de componentes.
- Exemplos de prompt devem ser *reais* (copiáveis, não-abstratos) — visitante pode usar imediatamente.
- Motion em Seção 9 deve ter ritmo *lento* (não acelerado) — reverência narrativa.
- QA visual: verificar que Pilar 04 (Iteração) é entendido como "mentalidade", não apenas técnica.

---

**Status**: Aguardando aprovação antes de prosseguir aos próximos épicos.
