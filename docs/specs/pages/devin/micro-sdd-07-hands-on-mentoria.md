---
épico: 07
status: aprovado
---

MICRO-SDD 07: HANDS-ON + MENTORIA
(Épico 07 — Seções 16-18 da Arquitetura Devin)

## 1. FUNDAMENTAÇÃO ACADÊMICA E CORPORATIVA (O "Para Quê")

### Conceito Raiz — "Do Conhecimento à Prática: Execução Aplicada"

Após estabelecer arsenal operacional (Micro-SDD 06), este épico transforma *conhecimento* em *experiência vivida*. Não se trata mais de aprender o que Devin pode fazer — trata-se de fazer com Devin enquanto aprende.

Arquitetura em três fases:

1. Seção 16 (Hands-on Prático): Três exercícios incrementais que aplicam Skills e Playbooks em contextos reais. Cada exercício começa com "Cenário" (situação de negócio), progride através de "Desafio" (o que você precisa resolver), e termina em "Resultado" (o que você construiu).

2. Seção 17 (Mentoria Estruturada): Padrão de mentorado onde visitante é guiado através de erro comum → ajuste → sucesso. Estabelece *ritmo de aprendizagem* não apenas conteúdo.

3. Seção 18 (Integração com Dia-a-Dia): Exemplo de como os exercícios acumulam em repertório pessoal que transfere para trabalho real no Itaú.

Mapeamento aos materiais:
- Vídeo 3: da sintaxe para linguagem natural — aqui é aplicado em exercícios reais.
- 03_spec_site_devin_vibe_coding.md (Seções 16-18): ejercicios e mentoria são ponte para Ato III (liderança).

Objetivo Cognitivo e Emocional:

Visitante *executa* código com Devin, sente a transformação de "digitar" para "pensar melhor", e sai com três protótipos concretos no seu portfólio mental. A experiência é *vivencial*, não apenas informativa.

---

## 2. COMPORTAMENTO E EXPERIÊNCIA VISUAL (O "Como se Sente")

### Layout e Arquitetura de Informação

**Seção 16 — TRÊS EXERCÍCIOS HANDS-ON**

Faseamento visual:

1. Chapéu introdutório (pequeno, cinza):
   "Três exercícios incrementais. Do simples ao complexo. Do protótipo ao production-ready."

2. Três exercícios em layout empilhado ou grid 1x3:

   **Exercício 1 — REFATORAÇÃO EM TEMPO REAL**
   - Card grande com estrutura em 4 camadas:
     - Rótulo superior: "EXERCÍCIO 01 · INICIANTE"
     - Cenário (cinza muted): "Você recebeu um código legado que funciona, mas é incompreensível. 200 linhas de callbacks aninhados. Prazos apertados impedem reescrita manual."
     - Desafio (branco): "Usar Devin para refatorar sem quebrar testes."
     - Resultado esperado (laranja): "Código funcional, legível, 40 linhas, com testes passando."
   - Timeline de execução em 3 passos (visual):
     Step 1: Show legacy code (cinzento background)
     Step 2: Run Devin refactor command (animated arrows)
     Step 3: Result code highlighted (verde/laranja accent)

   **Exercício 2 — TESTE EXAUSTIVO DE CASOS EXTREMOS**
   - Card estrutura idêntica ao 01, com layout progressão:
     - Rótulo: "EXERCÍCIO 02 · INTERMEDIÁRIO"
     - Cenário: "Função de cálculo financeiro. Testa happy-path, mas edge cases aparecem em produção (valores negativos, overflow, divisão por zero)."
     - Desafio: "Devin gera suite de testes exaustivos que cobrem 95%+ de código."
     - Resultado: "80+ testes passando, cobertura de 97%, sem falsos positivos."
   - Visual similar ao 01 mas com ênfase em "matrix de casos" (não código).

   **Exercício 3 — INTEGRAÇÃO MULTI-SERVIÇO**
   - Card estrutura idêntica:
     - Rótulo: "EXERCÍCIO 03 · AVANÇADO"
     - Cenário: "Integrar 4 APIs externas (pagamento, analytics, CRM, logging) em fluxo coerente. Timeout, retry, fallback — orquestração complexa."
     - Desafio: "Devin cria orchestrator robusto com circuit breaker pattern."
     - Resultado: "Sistema resiliente, testado sob falhas, logging rastreável."

Sensação geral: progressão clara, cada exercício constrói confiança para o próximo.

---

**Seção 17 — MENTORIA ESTRUTURADA: APRENDA COM ERRO**

Faseamento visual:

1. Título: "A mentorada que não é mentorada"

2. Três momentos de mentorados (layout alternado: esquerda-direita-esquerda):

   **Momento 1 — O ERRO COMUM**
   - Lado esquerdo: card com fundo ligeiramente vermelho (#0B1F33 + tint red subtle):
     - Título: "❌ O que a maioria faz"
     - Prompt vago em monospace: "Refatore esse código."
     - Resultado: GenAI retorna refactor que quebra testes.
     - Conclusão em laranja: "Falta contexto. Falta clareza."
   
   - Lado direito: card com fundo neutra (#1A1D21):
     - Título: "Diagnóstico"
     - Análise: "O prompt violou dois pilares: Clareza (não explicou *por que* refatorar) e Contexto (não mencionou testes existentes)."
     - Lição: "Ferramenta não falhou. Comunicação falhou."

   **Momento 2 — O AJUSTE**
   - Lado esquerdo: card com fundo laranja claro:
     - Título: "🔄 O ajuste"
     - Novo prompt com clareza + contexto inserido.
     - Diferenças destacadas em bold.
   
   - Lado direito: resultado melhorado:
     - "✅ Resultado corrigido"
     - Refactorização preserva testes, explica mudanças.

   **Momento 3 — A GENERALIZAÇÃO**
   - Ambos os lados: card única com síntese:
     - Lição universalizável: "Sempre especifique o objetivo, sempre inclua restrições, sempre forneça exemplos do resultado esperado."
     - Aplicabilidade: "Vale para qualquer ferramenta, qualquer linguagem, qualquer contexto."

---

**Seção 18 — INTEGRAÇÃO COM DIA-A-DIA NO ITAÚ**

Faseamento visual:

1. Título: "De aqui para a sua semana"

2. Três perspectivas de transferência (cards):

   **Card 1 — SQUAD DE BACKEND**
   - Contexto: Você está em um squad de backend refatorando módulo de pagamentos.
   - Aplicação direta dos Exercícios 1-3: refatora, adiciona testes, integra com CRM.
   - Ganho: "Economia de 8 horas vs. refactor manual. Código 40% mais legível. Confiança imediata em deploy."

   **Card 2 — CODE REVIEW + MENTORIA DE JUNIOR**
   - Contexto: Junior fez PR com padrão ruim. Em vez de corrigir manualmente, você usa Devin como *second reviewer*.
   - Aplicação: Devin analisa padrão, gera exemplos corretos, junior aprende vendo transformação.
   - Ganho: "Junior sai do code review entendendo *por que*, não apenas *o quê*."

   **Card 3 — DOCUMENTAÇÃO VIVA**
   - Contexto: Sistema legado sem documentação. Você usa Devin para gerar README, ADRs, guias de contribuição.
   - Aplicação: Skills de "documentação de código" aplicadas a arquivos reais.
   - Ganho: "Novo engenheiro onboards em 2 dias vs. 2 semanas. Documentação mantida viva porque integrada ao workflow."

Sensação: ponte concreta entre site educacional e realidade de trabalho diário.

---

### Dinâmica de Scroll e Tempo de Leitura

- Seção 16: ~240 segundos (três exercícios × 80s cada).
- Espaço de respiro: 6vh.
- Seção 17: ~180 segundos (três momentos × 60s cada, texto denso).
- Espaço de respiro: 6vh.
- Seção 18: ~150 segundos (três cards × 50s cada).
- Tempo total: ~10 minutos para ambas as seções (incluindo absorção visual e leitura).

### Motion System e Coreografia Visual

**Timelines principais:**

1. **exerciciosHandsOnTimeline** (onScroll-linked, inicia quando Seção 16 atinge viewport):
   - Chapéu: fade-in blur (8px → 0), duration 0.4s.
   - Exercício 1: y-offset 50px + opacity, duration 0.6s, delay 0.3s.
   - Step 1 (legacy code visual): appear with opacity, duration 0.4s, delay 0.9s.
   - Step 2 (arrow animation): SVG stroke-dash reveal (0 → full), duration 0.8s, delay 1.3s.
   - Step 3 (result code highlight): background color animate, duration 0.5s, delay 2.1s.
   - Repetir padrão para Exercício 2 e 3 com stagger 0.4s entre exercícios.

2. **mentoriaTimeline** (onScroll-linked):
   - Moment 1 (erro): cards appear lado-esquerdo first (y-offset 60px), delay 0.2s.
   - Moment 1 (diagnóstico): lado-direita entra, stagger 0.25s.
   - Moment 2: cards swap visual emphasis (lado-esquerda agora destaca acerto).
   - Moment 3: ambos cards entram em paralelo (unificação visual).
   - Total timeline: ~2.5s com motion que reforça "antes → ajuste → depois" narrativa.

3. **integracao-DiaADiaTimeline** (onScroll-linked):
   - Título com blur fade: 0.6s.
   - Card 1: y-offset 40px + opacity, duration 0.5s, easing expo.out.
   - Card 2: delay 0.18s, mesma entrada.
   - Card 3: delay 0.36s, mesma entrada.

**Easing:** expo.out (primário), power3.out (suporte).
**Motion direction:** Y-axis (vertical), SVG stroke-dash para Step 2.
**Scale:** 1.0 (sem scale neste épico — foco em clareza de execução).

---

## 3. ESPECIFICAÇÃO TÉCNICA (O "Como se Constrói")

### Estrutura HTML Semântica

```
<!-- SEÇÃO 16: TRÊS EXERCÍCIOS HANDS-ON -->
<section class="exercicios-hands-on" id="exercicios" data-section="exercicios">
  <header class="exercicios__intro">
    <p class="exercicios__chapeu">
      Três exercícios incrementais. Do simples ao complexo.
      Do protótipo ao production-ready.
    </p>
  </header>

  <div class="exercicios__container">
    <article class="exercise-card exercise-card--01">
      <span class="exercise-card__badge">EXERCÍCIO 01 · INICIANTE</span>
      <h3 class="exercise-card__title">Refatoração em Tempo Real</h3>
      
      <div class="exercise-card__section">
        <p class="section-label">CENÁRIO</p>
        <p class="section-body">
          Você recebeu um código legado que funciona, mas é incompreensível.
          200 linhas de callbacks aninhados. Prazos apertados impedem reescrita manual.
        </p>
      </div>

      <div class="exercise-card__section">
        <p class="section-label">DESAFIO</p>
        <p class="section-body">Usar Devin para refatorar sem quebrar testes.</p>
      </div>

      <div class="exercise-card__section">
        <p class="section-label">RESULTADO ESPERADO</p>
        <p class="section-body section-body--accent">
          Código funcional, legível, 40 linhas, com testes passando.
        </p>
      </div>

      <div class="exercise-card__timeline">
        <div class="step step--1">
          <div class="step__visual step__visual--code"><!-- legacy code visual --></div>
          <p class="step__label">Step 1: Code legado</p>
        </div>
        <svg class="step__arrow"><!-- animated arrow --></svg>
        <div class="step step--2">
          <div class="step__visual step__visual--devin"><!-- devin processing --></div>
          <p class="step__label">Step 2: Devin refactora</p>
        </div>
        <svg class="step__arrow"><!-- animated arrow --></svg>
        <div class="step step--3">
          <div class="step__visual step__visual--result"><!-- result code --></div>
          <p class="step__label">Step 3: Resultado</p>
        </div>
      </div>
    </article>

    <!-- exercise-card--02 e exercise-card--03 seguem padrão idêntico -->
  </div>
</section>

<!-- SEÇÃO 17: MENTORIA ESTRUTURADA -->
<section class="mentoria" id="mentoria" data-section="mentoria">
  <h2 class="mentoria__title">A mentorada que não é mentorada</h2>

  <div class="mentoria__momento mentoria__momento--1">
    <article class="mentoria__card mentoria__card--erro">
      <h3 class="card__label">❌ O que a maioria faz</h3>
      <p class="card__body">
        Prompt vago: "Refatore esse código."
      </p>
      <p class="card__result card__result--problema">
        GenAI retorna refactor que quebra testes.
      </p>
      <p class="card__insight">
        <strong>Falta contexto. Falta clareza.</strong>
      </p>
    </article>

    <article class="mentoria__card mentoria__card--diagnostico">
      <h3 class="card__label">Diagnóstico</h3>
      <p class="card__body">
        O prompt violou dois pilares: Clareza (não explicou por que refatorar)
        e Contexto (não mencionou testes existentes).
      </p>
      <p class="card__lição">
        <strong>Lição:</strong> Ferramenta não falhou. Comunicação falhou.
      </p>
    </article>
  </div>

  <!-- mentoria__momento--2 e mentoria__momento--3 seguem padrão -->
</section>

<!-- SEÇÃO 18: INTEGRAÇÃO COM DIA-A-DIA NO ITAÚ -->
<section class="integracao-dia-a-dia" id="integracao" data-section="integracao">
  <h2 class="integracao__title">De aqui para a sua semana</h2>

  <div class="integracao__cards">
    <article class="aplicacao-card aplicacao-card--backend">
      <h3 class="aplicacao-card__titulo">Squad de Backend</h3>
      <p class="aplicacao-card__contexto">
        Você está em um squad refatorando módulo de pagamentos.
      </p>
      <p class="aplicacao-card__aplicacao">
        <strong>Aplicação:</strong> Exercícios 1-3 aplicados em código real.
      </p>
      <p class="aplicacao-card__ganho">
        <strong>Ganho:</strong> 8 horas economizadas. Código 40% mais legível.
      </p>
    </article>

    <!-- aplicacao-card--codereview e aplicacao-card--docs seguem padrão -->
  </div>
</section>
```

### Design Tokens (Tailwind CSS) — Extensões para Épico 07

```
/* Exercícios Hands-On */
.exercise-card {
  background: #1A1D21;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.exercise-card__badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #FF6200;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.exercise-card__title {
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 2rem;
}

.section-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #FF6200;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.section-body {
  font-size: 14px;
  color: #F5F7FA;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.section-body--accent {
  color: #FF6200;
  font-weight: 600;
}

.exercise-card__timeline {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.step {
  flex: 1;
  min-width: 80px;
  text-align: center;
}

.step__visual {
  background: #0B1F33;
  border: 2px solid #334155;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step__visual--code {
  font-family: 'Courier New', monospace;
  font-size: 10px;
  color: #94A3B8;
  overflow: hidden;
  text-overflow: ellipsis;
}

.step__label {
  font-size: 11px;
  color: #94A3B8;
  font-weight: 500;
}

.step__arrow {
  width: 100%;
  height: 20px;
  stroke: #FF6200;
  stroke-width: 2;
  fill: none;
}

/* Mentoria */
.mentoria__moment {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.mentoria__card {
  background: #1A1D21;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 2rem;
}

.mentoria__card--erro {
  border-left: 4px solid #FF6200;
}

.card__label {
  font-size: 16px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1rem;
}

.card__body {
  font-size: 14px;
  color: #F5F7FA;
  line-height: 1.7;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  background: #0B1F33;
  padding: 0.75rem;
  border-radius: 4px;
}

.card__result {
  font-size: 13px;
  color: #94A3B8;
  margin-bottom: 1rem;
}

.card__result--problema {
  color: #FF6200;
  font-weight: 600;
}

.card__insight {
  font-size: 14px;
  color: #F5F7FA;
  border-top: 1px solid #334155;
  padding-top: 1rem;
}

.card__lição {
  font-size: 13px;
  color: #F5F7FA;
  line-height: 1.6;
}

/* Integração Dia-a-Dia */
.integracao__title {
  font-size: 48px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 2rem;
  text-align: center;
}

.aplicacao-card {
  background: #1A1D21;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.aplicacao-card__titulo {
  font-size: 18px;
  font-weight: 700;
  color: #FF6200;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.aplicacao-card__contexto {
  font-size: 14px;
  color: #F5F7FA;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.aplicacao-card__aplicacao {
  font-size: 13px;
  color: #94A3B8;
  margin-bottom: 0.75rem;
}

.aplicacao-card__ganho {
  font-size: 13px;
  color: #F5F7FA;
  padding-top: 1rem;
  border-top: 1px solid #334155;
}
```

### Performance & Renderização

- GPU Layers máximas: 14 (5 exercise cards + 6 mentoria cards + 3 integracao cards + SVG arrows + backgrounds).
- Blur máximo: 8px (apenas em intros).
- will-change: removido após timelines.
- Transform-only: opacity + translate para cards, stroke-dash para SVG arrows.
- Lazy-load: nenhum elemento lazy — tudo critical path.

### Responsividade & Accessibility

- Desktop (≥1024px): 3 exercise cards em 1 coluna com timeline horizontal. Mentoria 2-coluna lado-a-lado. Integracao 3 cards em 1 coluna.
- Tablet (768px-1024px): Exercise cards stack vertical com timeline compactado. Mentoria stack vertical. Integracao 3 cards em 1 coluna.
- Mobile (<768px): Tudo empilha vertical. Timeline dos exercícios horizontalmente scrollable (overflow-x).
- Contrast: WCAG AA (4.5:1).
- prefers-reduced-motion: timelines 0.8s max, sem stagger, tudo simultâneo.

---

## 4. CRITÉRIOS DE ACEITAÇÃO (TDD / SDD)

### Testes Automatizados (Playwright/Jest)

```
Cenário: Três exercícios carregam com timelines sincronizadas
  Quando Seção 16 entra na viewport
  Então chapéu introdutório entra com blur fade
  E exercício 1 aparece com y-offset
  E step 1 (legacy code) entra após 0.9s
  E arrow SVG anima stroke-dash de 0 a 100% em 0.8s
  E step 3 aparece após arrow completar
  E padrão repetido para exercício 2 com stagger 0.4s
  E padrão repetido para exercício 3 com stagger 0.4s

Cenário: Mentoria revela estrutura antes-ajuste-depois
  Quando Seção 17 entra na viewport
  Então momento 1 (erro + diagnóstico) revela lado-esquerda primeiro
  E lado-direita (diagnóstico) entra com stagger 0.25s
  E momento 2 inverte visual emphasis (acerto vs. erro)
  E momento 3 unifica ambos cards em paralelo
  E motion reforça narrativa de transformação

Cenário: Integração dia-a-dia cards entram sequencial
  Quando Seção 18 entra na viewport
  Então título entra com blur fade
  E três aplicacao-cards entram com y-offset, stagger 0.18s
  E cada card mostra contexto → aplicação → ganho em progressão clara

Cenário: Timeline horizontal em mobile
  Quando viewport < 768px
  Então exercise-card timeline ativa scroll-x
  E cards não truncam
  E SVG arrows resizeiam proporcionalmente
  E touch-friendly widths aplicadas

Cenário: Código legado readável em step 1
  Quando exercise 1 carrega
  Então step__visual--code mostra snippet em monospace
  E contraste #94A3B8 vs. #0B1F33 é legível
  E font-size 10px não prejudica leitura
```

### Critérios de Aprovação Visual

- Exercícios devem parecer "progressivos": cada um sente mais denso que anterior.
- Timeline visual deve contar história: antes → devin → depois.
- Mentoria deve ser "visceral": erro vs. sucesso marcados visualmente.
- Código legado deve ser "leível": sem truncamento, contraste claro.
- Integração deve parecer "aplicável": concrete, não abstrato.
- Motion deve reforçar narrativa: sem gimmicks, apenas clareza temporal.

### Graceful Degradation

- Sem SplitType: texto revela como bloco estático.
- Sem Lenis: scroll nativo; animations permanecem.
- Sem GSAP: CSS animations como fallback (opacity + transform).
- Sem SVG: arrows renderizam como text arrows (→).

---

## PRÓXIMOS MICRO-SDDs

**Micro-SDD 08:** Reflexão sobre Vibe Coding (Seções 19-21) — Ato II Fechamento
**Micro-SDD 09:** Liderança + Cultura (Seções 22-24) — Ato III Início

---

**Status:** Pronto para aprovação.
