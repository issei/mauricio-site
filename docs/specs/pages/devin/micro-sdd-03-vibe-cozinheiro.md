---
épico: 03
seções: 7-8
status: aprovado
---

======================================================================
MICRO-SDD: PAUSA (VIBE CODING) + ANALOGIA DO COZINHEIRO
(Épico 03 — Seções 7-8 da Arquitetura Devin)
======================================================================

## 1. FUNDAMENTAÇÃO ACADÊMICA E CORPORATIVA (O "Para Quê")

### Conceito Raiz — "Da Abstração Conceitual para a Narrativa Experiencial"

Após fundamentar os três pilares (Épico 02), este épico realiza uma **pausa estratégica** seguida de uma **metáfora estrutural** que transforma conceitos abstratos em contexto prático.

**Arquitetura em duas fases:**

1. **Seção 7 (Pausa — Vibe Coding):** Respiração narrativa que condensa toda a tese em uma única frase provocadora. Reduz a densidade cognitiva das seções anteriores e crava a proposição central: "Vibe Coding **não** é digitar menos. É **pensar melhor**."

2. **Seção 8 (Analogia do Cozinheiro):** Metáfora estrutural que mapeia os três papéis da transformação:
   - **Cliente** = stakeholder/produto (desejo abstrato)
   - **IA (Ferramenta)** = executora (exatidão repetitiva)
   - **Você (Chef Executivo)** = inteligência + julgamento (responsabilidade)

**Mapeamento aos materiais:**
- **Vídeo 3** ("Evolução da Programação"): de digitar para pensar melhor.
- **00_ideia**: "Ferramentas mudam. O que precisa evoluir é você" — aqui é o *como* que muda.
- **03_spec_site_devin_vibe_coding.md**: analogia do cozinheiro como ponte entre abstração (Épicos 01-02) e operacional (Épicos 04+).

**Objetivo Cognitivo e Emocional:**

O visitante sai compreendendo que sua responsabilidade não é *digitar* (a IA faz isso), mas **julgar**:
- Contexto (o cliente tem alergia?)
- Segurança (a cozinha atende regras?)
- Significado ("outono" é melancólico ou aconchegante?)

Essa é a **transferência de gargalo** crucial: do código para o julgamento.

---

## 2. COMPORTAMENTO E EXPERIÊNCIA VISUAL (O "Como se Sente")

### Layout e Arquitetura de Informação

**Seção 7 — PAUSA: VIBE CODING**

**Faseamento visual:**
- **Composição:** Duas linhas de texto, fundo escuro, espaço negativo máximo.
- **Linha 1** (negação/contraste):
  - Texto: "Vibe Coding não é digitar menos."
  - Cor: `#F5F7FA` (branco suave).
  - Tamanho: 36-40px desktop, 24px mobile.
  - Peso: 400 (regular) ou 300 (light) para criar leveza na negação.
  - Posição: centro, ~40% altura visual.

- **Linha 2** (afirmação/destaque):
  - Texto: "É pensar melhor."
  - Cor: `#FF6200` (laranja queimado) ou `#FFFFFF` (branco) com fundo laranja subtle.
  - Tamanho: 48-56px desktop, 32px mobile.
  - Peso: 700 (bold) para criar peso na afirmação.
  - Posição: centro, ~55-60% altura visual.

**Sensação geral:**
- Minimalista propositalmente.
- Atmosfera: pausa contemplativa após densidade (Épicos 01-02).
- Tempo de leitura: ~10 segundos apenas.
- Fundo: `#002D62` (navy profundo) com gradiente sutil para `#0B1F33`.

---

**Seção 8 — A ANALOGIA DO COZINHEIRO**

**Faseamento visual:**

1. **Contexto Introdutório** (topo, pequeno, cinza em `#94A3B8`):
   - Duas linhas:
     - "O cliente pede um risoto que remeta a uma noite de outono."
     - "Ninguém quer saber a temperatura do forno. Só a experiência."
   - Sensação: setup da metáfora, criação de expectativa.

2. **Desenvolvimento Narrativo** (corpo, texto denso mas estruturado):
   - 4 parágrafos curtos, espaçados.
   - Primeiro parágrafo: contexto do restaurante.
   - Segundo parágrafo: o desenvolvedor tradicional.
   - Terceiro parágrafo: a IA generativa (a calculadora da cozinha).
   - Quarto parágrafo: o que a IA *nunca* saberá (culminação).
   - **Linha final em negrito:** "Isso é com você." — impacto máximo, `#FF6200`.

3. **Três Papéis** (cards/colunas, layout similar aos Fundamentos):
   - **Card 1 — O CLIENTE:**
     - Título: "O CLIENTE"
     - Subtítulo: "Traz o desejo abstrato"
     - Corpo: descrição concisa.
     - Ícone (opcional): ícone abstrato ou ilustração leve.

   - **Card 2 — A IA (FERRAMENTA):**
     - Título: "A IA (FERRAMENTA)"
     - Subtítulo: "Pica, calibra, executa"
     - Corpo: descrição concisa.
     - Ícone (opcional): ícone de ferramentas ou máquina.

   - **Card 3 — VOCÊ (CHEF EXECUTIVO):**
     - Título: "VOCÊ (CHEF EXECUTIVO)"
     - Subtítulo: "Garante que o prato tenha alma"
     - Corpo: descrição concisa.
     - Ícone (opcional): ícone de pessoa/liderança.

**Sensação geral da Seção 8:**
- Narrativa que *mostra* em vez de *descrever*.
- Metáfora evocativa (gastronomia, experiência) para reduzir jargão técnico.
- Transição esperada: visitante entende seu papel não mais como "codificador", mas como "juiz de qualidade".

### Dinâmica de Scroll e Tempo de Leitura

- **Seção 7:** scroll suave, sem pinning. Tempo: ~10-15 segundos.
- **Espaço de respiro:** 6-8vh entre Seção 7 e Seção 8.
- **Seção 8:** scroll nativo. Tempo: ~120 segundos (contexto + narrativa + cards).
- **Tempo total acumulado:** ~2 minutos para ambas as seções.

### Motion System e Coreografia Visual

**Timelines principais:**

1. **pausaVibeCodingTimeline** (onScroll-linked, inicia quando Seção 7 atinge 50% viewport):
   - Linha 1 ("Vibe Coding não é..."):
     - Entrada: opacity fade + y-offset suave (10px → 0), duration 0.5s, easing power3.out.
   - Linha 2 ("É pensar melhor."):
     - Delay: 0.4s (pausa após linha 1).
     - Entrada: opacity fade + scale (0.95 → 1.0) + y-offset, duration 0.6s, easing expo.out.
     - Emphasis: cor muda para laranja #FF6200 ou background suave.

2. **cozinheiroTimeline** (onScroll-linked, inicia quando Seção 8 atinge viewport):
   - Contexto introdutório: fade-in com blur (8px → 0), duration 0.4s.
   - Narrativa (parágrafos): reveal sequencial com stagger 0.08s (SplitType), duração total 1.2s.
   - Linha final ("Isso é com você."): delay 0.6s após narrativa, emphasis em laranja, scale 1.02, duration 0.5s.
   - Três cards: entrada sequencial com y-offset (50px → 0) + opacity, stagger 0.18s, easing expo.out.

**Easing:** expo.out (primário), power3.out (subtítulos).
**Motion direction:** Y-axis (vertical), sem motion lateral.
**Scale:** 1.02 para ênfase final, 0.95 para entrada suave em Linha 2.

---

## 3. ESPECIFICAÇÃO TÉCNICA (O "Como se Constrói")

### Estrutura HTML Semântica

```html
<!-- SEÇÃO 7: PAUSA — VIBE CODING -->
<section class="pausa-vibe-coding" id="vibe-coding-def" data-section="pausa">
  <article class="pausa__content">
    <p class="pausa__line pausa__line--1">
      Vibe Coding não é digitar menos.
    </p>
    <p class="pausa__line pausa__line--2">
      É pensar melhor.
    </p>
  </article>
</section>

<!-- SEÇÃO 8: ANALOGIA DO COZINHEIRO -->
<section class="cozinheiro" id="cozinheiro" data-section="cozinheiro">
  <header class="cozinheiro__intro">
    <p class="cozinheiro__setup-line-1">
      O cliente pede um risoto que remeta a uma noite de outono.
    </p>
    <p class="cozinheiro__setup-line-2">
      Ninguém quer saber a temperatura do forno. Só a experiência.
    </p>
  </header>

  <article class="cozinheiro__narrative">
    <p>
      Imagine um restaurante de alta gastronomia. Quando um cliente se senta à mesa 
      e pede um "Risoto de Cogumelos que remeta a uma noite de outono", ele está 
      fazendo um pedido puramente abstrato — quer uma experiência, não uma receita. 
      Não dita a temperatura do forno nem a miligramagem do sal.
    </p>
    <p>
      No desenvolvimento tradicional, o desenvolvedor era quem cortava cada ingrediente 
      manualmente: linha por linha de código, configuração de servidor, exaustão de sintaxe.
    </p>
    <p>
      Hoje, a cozinha foi hiper-automatizada. A IA generativa é a super-calculadora da 
      cozinha: ela pica dez quilos de cebola em segundos, calibra o forno instantaneamente 
      e conhece a "receita" de qualquer framework do mundo. O desenvolvedor parou de ser 
      o operário da cozinha.
    </p>
    <p>
      Mas há algo que a IA nunca vai saber: se aquele cliente tem alergia. Se a cozinha 
      do restaurante atende às regras de segurança alimentar. Se a "noite de outono" 
      daquele cliente é melancólica ou aconchegante.
    </p>
    <p class="cozinheiro__climax">
      <strong>Isso é com você.</strong>
    </p>
  </article>

  <div class="cozinheiro__roles">
    <article class="role-card role-card--cliente">
      <h3 class="role-card__title">O CLIENTE</h3>
      <p class="role-card__subtitle">Traz o desejo abstrato</p>
      <p class="role-card__body">
        Foca no valor final. Não dita receita, ingrediente ou método. Ele sabe o que 
        quer sentir, não como fazer.
      </p>
    </article>

    <article class="role-card role-card--ferramenta">
      <h3 class="role-card__title">A IA (FERRAMENTA)</h3>
      <p class="role-card__subtitle">Pica, calibra, executa</p>
      <p class="role-card__body">
        Conhece todas as receitas, escreve qualquer linguagem, em segundos. É rápida, 
        precisa e incansável — mas executa sem julgamento.
      </p>
    </article>

    <article class="role-card role-card--chef">
      <h3 class="role-card__title">VOCÊ (CHEF EXECUTIVO)</h3>
      <p class="role-card__subtitle">Garante que o prato tenha alma</p>
      <p class="role-card__body">
        Julga contexto, segurança, regras de negócio. Assume a responsabilidade pelo 
        resultado. É o seu nome que está na porta do restaurante quando o prato sai errado.
      </p>
    </article>
  </div>
</section>
```

### Design Tokens (Tailwind CSS) — Extensões para Épico 03

```css
/* Pausa Vibe Coding */
.pausa__line {
  font-size: 40px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.02em;
}

.pausa__line--1 {
  color: #F5F7FA;
  font-weight: 400;
  margin-bottom: 2rem;
}

.pausa__line--2 {
  color: #FF6200;
  font-weight: 700;
  font-size: 56px;
}

/* Cozinheiro */
.cozinheiro__intro p {
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 0.5rem;
  font-style: italic;
}

.cozinheiro__narrative p {
  font-size: 16px;
  color: #F5F7FA;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.cozinheiro__climax {
  color: #FF6200;
  font-weight: 700;
}

/* Role Cards */
.role-card {
  background: #1A1D21;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 2rem;
}

.role-card__title {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #FFFFFF;
}

.role-card__subtitle {
  font-size: 13px;
  color: #FF6200;
  font-style: italic;
  margin-top: 0.5rem;
}

.role-card__body {
  font-size: 14px;
  color: #F5F7FA;
  line-height: 1.6;
  margin-top: 1rem;
}
```

### Performance & Renderização

- **GPU Layers máximas para esta seção:** 6 (2 para Seção 7, 4 para Seção 8 com 3 cards).
- **Blur máximo:** 8px (apenas no contexto introdutório de Seção 8).
- **will-change:** aplicado apenas durante scroll-linked reveals.
- **Transform-based animations:** opacity + translate (cards, parágrafos) + scale (Linha 2).
- **Lazy-load:** nenhum elemento lazy — tudo critical path.

### Responsividade & Accessibility

- **Desktop (viewport ≥ 1024px):**
  - Seção 7: Linhas centralizadas, ~80% width.
  - Seção 8: Texto centrado (~80% width), 3 role-cards lado a lado.

- **Tablet (768px ≤ viewport < 1024px):**
  - Seção 7: Linhas 100% width.
  - Seção 8: 2 role-cards por linha (grid 2 colunas), terceiro em linha nova.

- **Mobile (viewport < 768px):**
  - Seção 7: Linhas 100%, fontes reduzem (28px → 32px).
  - Seção 8: Role-cards empilham em 1 coluna. Texto 100%.

- **Contrast:** WCAG AA (4.5:1) em todos os textos.
- **prefers-reduced-motion:**
  - Timelines eliminadas (tudo entra simultâneo).
  - Stagger reduz para 0.0s.
  - Scale eliminada (sem 1.02).

---

## 4. CRITÉRIOS DE ACEITAÇÃO (TDD / SDD)

### Testes Automatizados (Playwright/Jest)

```gherkin
Cenário: Seção Pausa carrega minimalista
  Quando a página carrega e Seção 7 entra na viewport
  Então Linha 1 aparece em branco com y-offset fade
  E Linha 2 aparece em laranja com scale 0.95→1.0 após 0.4s delay
  E nenhum outro elemento compete com o texto

Cenário: Cozinheiro revela em sequência
  Quando a Seção 8 entra na viewport
  Então contexto introdutório entra com blur fade
  E narrativa revela parágrafo por parágrafo com stagger 0.08s
  E linha final "Isso é com você" aparece em laranja com ênfase
  E 3 role-cards entram com stagger 0.18s, expo.out easing

Cenário: Role-cards layout responsivo
  Quando viewport < 768px
  Então role-cards empilham em 1 coluna
  Quando viewport 768px-1024px
  Então role-cards layout em 2 colunas (terceiro na linha nova)
  Quando viewport ≥ 1024px
  Então role-cards layout em 3 colunas

Cenário: prefers-reduced-motion desativa motion
  Dado user has prefers-reduced-motion:reduce
  Quando as seções entram na viewport
  Então nenhuma animação > 0.8s ocorre
  E nenhum scale é aplicado
  E blur é eliminado
  E tudo entra simultâneo

Cenário: Tipografia domina visualmente
  Quando página carrega
  Então nenhum elemento visual compete com texto
  E contraste WCAG AA é respeitado
  E laranja (#FF6200) aparece apenas em pontos de ênfase
```

### Critérios de Aprovação Visual

- **Seção 7 deve parecer "pausa verdadeira":** espaço negativo extremamente generoso, sem distrações.
- **Contrast Linha 2 deve "saltar":** laranja vs navy deve ter impacto imediato.
- **Seção 8 deve parecer "narrativa envolvente":** metáfora clara, papéis bem diferenciados nos cards.
- **Role-cards devem parecer "responsáveis":** não são abstratos — cada papel tem peso visual equilibrado.
- **Transição Seção 7 → 8:** respiro visual acima, narrativa flui naturalmente abaixo.

### Graceful Degradation (sem JS / navegadores antigos)

**Fallback sem SplitType:**
- Narrativa revela-se como bloco estático (sem stagger parágrafo-por-parágrafo).
- Preserva espacamento e cores.

**Fallback sem Lenis:**
- Scroll nativo; animations permanecem.

**Fallback sem GSAP:**
- CSS animations para opacity + translate.
- Scale pode ser removida em navegadores antigos.

---

## PRÓXIMOS MICRO-SDDs (Ordem de Execução)

1. **Micro-SDD 04**: Transição & Comunicação com IA (Seções 9-10) — Operacional / Educação (Four Pillars)
2. **Micro-SDD 05**: Anatomia do Devin + Contexto Persistente (Seções 11-12) — Técnico-introdutório
3. ... (e assim sucessivamente)

---

## Notas para Execução

- Seção 7 é intencionalmente *ascética* — resistir à tentação de adicionar elementos visuais.
- Seção 8 combina narrativa densa + visualização em cards — estruturar em 2 fases (texto → cards).
- Role-cards seguem padrão idêntico aos Fundamentos (Épico 02) — reuso de componentes.
- Motion em Linha 2 deve ter *peso* (scale + color change) para reforçar afirmação.
- QA visual: verificar que Seção 7 causa "pausa" genuína, não "confusão".

---

**Status**: Aguardando aprovação antes de prosseguir aos próximos épicos.
