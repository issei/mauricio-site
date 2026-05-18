---
épico: 05
status: aprovado
---

======================================================================
MICRO-SDD: ANATOMIA DO DEVIN + CONTEXTO PERSISTENTE
(Épico 05 — Seções 11-12 da Arquitetura Devin)
======================================================================

## 1. FUNDAMENTAÇÃO ACADÊMICA E CORPORATIVA (O "Para Quê")

### Conceito Raiz — "De 'O que a IA é' para 'Como ela Funciona na Prática'"

Após consolidar os quatro pilares da comunicação (Épico 04), este épico realiza a **transição de abstração para técnica concreta**. Não é mais "como falo com agentes de IA", mas "quem é o Devin especificamente e como ele preserva memória entre conversas?"

**Arquitetura em duas fases:**

1. **Seção 11 (Anatomia do Devin):** Decompõe a ferramenta em seus componentes observáveis — o que ela vê, como processa, o que devolve. Não é um manual técnico (sem API docs), mas uma **leitura de cognição**: "Devin é um engenheiro que entende contexto, pode ler código, executa testes, refatora, documenta". Visitante sai compreendendo os *limites reais* da ferramenta (não é onisciente) e suas *pontos fortes* (raciocínio sequencial, teste-driven).

2. **Seção 12 (Contexto Persistente):** Explica como a IA governa memória — qual informação persiste, como estruturar conversas para máximo reuso de contexto, quando resetar ou focar. Esta é a **ponte para Skills, Playbooks, Knowledge** (Épico 06): porque contexto bem-governado permite eficiência exponencial.

**Mapeamento aos materiais:**
- **Vídeo 2** ("IA como Agente"): agente de IA é um sistema reativo que opera em contexto.
- **rules.md**: o "Experience States" (immersive, contemplative, technical, narrative, atmospheric, silent) — analogia perfeita para como estruturar contexto em diferentes "modos" de conversação.
- **03_spec_site_devin_vibe_coding.md**: referências a "execução", "teste", "documentação" como competências centrais do Devin.

**Objetivo Cognitivo e Emocional:**

Visitante sai compreendendo que:
1. **Devin é um colaborador, não um oráculo.** Ele é excelente em tarefas sequenciais (escrever → testar → refatorar), mas precisa de contexto limpo para não hallucinar.
2. **Contexto é moeda.** Quanto melhor estruturado o contexto em uma conversa, melhor é a resposta. Conversa eficiente = contexto governado.
3. **Persistência de memória é desenho, não acidente.** Você *projeta* o que persiste em uma conversa baseado no problema.

Transição esperada: "Agora que entendo como falar com agentes, devo entender qual é seu 'design cognitivo' para aproveitar melhor."

---

## 2. COMPORTAMENTO E EXPERIÊNCIA VISUAL (O "Como se Sente")

### Layout e Arquitetura de Informação

**Seção 11 — ANATOMIA DO DEVIN**

**Faseamento visual:**

1. **Chapéu Introdutório** (topo, pequeno, discreto):
   - Texto: "Quem é o Devin? Uma leitura de sua cognição."
   - Cor: `#94A3B8` (cinza médio).
   - Tamanho: 14px.
   - Sensação: contexto, preparação.

2. **Título Principal** (grande, monumental):
   - "Um Engenheiro de Software Autônomo"
   - Tamanho: 48-56px.
   - Cor: `#FFFFFF`.
   - Peso: 600-700.

3. **Subtítulo de Esclarecimento** (após título):
   - "Entender seus limites e pontos fortes é essencial para colaboração eficaz."
   - Tamanho: 18px.
   - Cor: `#F5F7FA`.
   - Peso: 400 (leve).

4. **Cinco Seções de Função** (layout em cards ou blocos, stack vertical):
   Cada seção decompõe um aspecto da cognição:

   **Seção A — O QUE DEVIN VÊ**
   - Subtítulo: "Entrada: Contexto visual e textual"
   - Corpo: Descrição concisa sobre arquivos, git history, terminal output, conversas anteriores.
   - Ícone/Visual: Diagrama simples mostrando "INPUT" ramificado em código, histórico, saída.
   - Cor de ênfase: `#FF6200`.

   **Seção B — COMO DEVIN PROCESSA**
   - Subtítulo: "Cognição: Pensamento sequencial com teste imediato"
   - Corpo: Explica que Devin não "acha a resposta" no banco de memória — constrói passo a passo, testa, refatora.
   - Ícone/Visual: Timeline ou fluxograma linear (Codificar → Testar → Refatorar → Validar).
   - Cor de ênfase: `#FF6200`.

   **Seção C — O QUE DEVIN DEVOLVE**
   - Subtítulo: "Saída: Código, testes, documentação, reflexão"
   - Corpo: Devin não apenas escreve — também documenta decisões, sinaliza onde teve incerteza, propõe melhorias.
   - Ícone/Visual: Caixa com "OUTPUT" ramificado em código, testes, docs, reasoning.
   - Cor de ênfase: `#FF6200`.

   **Seção D — LIMITES REAIS**
   - Subtítulo: "O que Devin não consegue"
   - Corpo: Não entende negócio profundo (sem contexto), não julga trade-offs (sem critérios), não decide sobre release ou arquitetura (decisão é sua).
   - Ícone/Visual: Lista de "NÃO" (não é gerente, não é arquiteto, não é juiz).
   - Cor de ênfase: `#FF8A3D` (laranja claro, tom diferente para "limitação").

   **Seção E — PONTOS FORTES**
   - Subtítulo: "Onde Devin excele"
   - Corpo: Refatoração sem receio de quebra, testes exaustivos, documentação de código, iteração rápida sem ego.
   - Ícone/Visual: Lista com checkmarks (força em execução, iteração, confiabilidade).
   - Cor de ênfase: `#FF6200`.

**Sensação geral:**
- Educacional mas não pedante.
- Decompõe uma "black box" em componentes observáveis.
- Respira bem (espaço negativo entre seções).

---

**Seção 12 — CONTEXTO PERSISTENTE**

**Faseamento visual:**

1. **Rótulo** (pequeno, topo, `#FF6200`):
   - "GOVERNANÇA DE MEMÓRIA"

2. **Título** (grande):
   - "Como estruturar contexto para máxima eficiência."
   - Tamanho: 48px.
   - Cor: `#FFFFFF`.

3. **Corpo Narrativo** (texto denso mas respirável, 3-4 parágrafos):
   - Explica que contexto em conversa com IA é como "memória viva" — persiste enquanto a janela de conversa está aberta.
   - Quanto maior a janela de contexto (tokens disponíveis), mais história o Devin pode carregar.
   - Estruturação é chave: contexto "bagunçado" causa hallucination, contexto "governado" causa precisão.

4. **Três Estratégias de Contexto** (layout em 3 colunas desktop, stack mobile):
   
   **Estratégia 1 — CONTEXTO IMERSIVO** (Seção tipo "immersive" da Experiência)
   - Cenário: Você está em um projeto novo, quer que o Devin se "mergulhe" na base.
   - Estrutura: Code walkthrough completo → architecture explanation → constraints → exemplos.
   - Duração: Pode ser longa (2-3 mil tokens ou mais).
   - Resultado: Devin entende nuances, evita erros de contexto, propõe soluções alinhadas.
   - Card Background: `#1A1D21`, border `#334155`.

   **Estratégia 2 — CONTEXTO TÉCNICO** (Seção tipo "technical" da Experiência)
   - Cenário: Task específica, Devin já conhece o projeto.
   - Estrutura: Apenas o arquivo relevante, o erro específico, o critério de sucesso.
   - Duração: Curta (500-800 tokens).
   - Resultado: Velocidade extrema, execução precisa em escopo claro.
   - Card Background: `#1A1D21`, border `#334155`.

   **Estratégia 3 — CONTEXTO ITERATIVO** (Seção tipo "narrative" da Experiência)
   - Cenário: Conversa longa onde feedback refina progressivamente o resultado.
   - Estrutura: Incremento mínimo de contexto por turno, feedback do resultado anterior.
   - Duração: Múltiplas trocas curtas em vez de um bloco longo.
   - Resultado: Refinamento progressivo, aprendizado compartilhado, economia de tokens.
   - Card Background: `#1A1D21`, border `#334155`.

5. **Diagrama Visual** (abaixo):
   - Linha de tempo mostrando "Contexto Inicial" → "Devin Processa" → "Output" → "Novo Contexto" (feedback) → "Próximo Ciclo".
   - Legenda: "Contexto governado permite ciclos rápidos e precisos."

**Sensação geral:**
- Prática, imediatamente aplicável.
- Cada estratégia é um "padrão de conversa" reutilizável.
- Transição clara para Skills, Playbooks, Knowledge.

### Dinâmica de Scroll e Tempo de Leitura

- **Seção 11:** Scroll nativo. Tempo: ~150 segundos (5 seções × ~30s cada).
- **Espaço de respiro:** 8vh entre seções 11 e 12.
- **Seção 12:** Scroll nativo. Tempo: ~120 segundos (narrativa + 3 estratégias).
- **Tempo total acumulado:** ~4.5 minutos.

### Motion System e Coreografia Visual

**Timelines principais:**

1. **anatomiaDevinTimeline** (onScroll-linked, inicia quando Seção 11 atinge 40% viewport):
   - Chapéu: fade-in com blur (8px → 0), duration 0.4s.
   - Título: fade + y-offset (20px → 0), duration 0.6s, delay 0.2s.
   - Subtítulo: fade, duration 0.4s, delay 0.4s.
   - Cinco seções: entrada sequencial com y-offset (40px → 0) + opacity, stagger 0.15s, easing expo.out.
   - **Total:** ~1.8s de entrada.

2. **contextoTimeline** (onScroll-linked, inicia quando Seção 12 atinge 40% viewport):
   - Rótulo: fade, duration 0.3s.
   - Título: fade + y-offset suave, duration 0.6s, delay 0.2s.
   - Corpo: reveal parágrafo por parágrafo via SplitType, stagger 0.08s, duration total ~0.8s.
   - Três estratégias: cards entram com y-offset (50px → 0) + opacity, stagger 0.18s, easing expo.out.
   - Diagrama: entrada sequencial (similar a Calculadora em Épico 02), stagger 0.2s.
   - **Total:** ~2.2s de entrada (mais longo, mais componentes).

**Easing:** expo.out (primário), power3.out (subtítulos).
**Motion direction:** Y-axis (vertical).
**Scale:** nenhuma scale neste épico — clareza visual é prioridade.

---

## 3. ESPECIFICAÇÃO TÉCNICA (O "Como se Constrói")

### Estrutura HTML Semântica

```html
<!-- SEÇÃO 11: ANATOMIA DO DEVIN -->
<section class="anatomia-devin" id="anatomia" data-section="anatomia">
  <header class="anatomia__header">
    <p class="anatomia__chapeu">Quem é o Devin? Uma leitura de sua cognição.</p>
    <h2 class="anatomia__title">Um Engenheiro de Software Autônomo</h2>
    <p class="anatomia__subtitle">
      Entender seus limites e pontos fortes é essencial para colaboração eficaz.
    </p>
  </header>

  <div class="anatomia__funcoes">
    <article class="funcao funcao--ve">
      <h3 class="funcao__subtitulo">O QUE DEVIN VÊ</h3>
      <p class="funcao__label">Entrada: Contexto visual e textual</p>
      <p class="funcao__body">
        Devin lê arquivos, histórico de commits, output de terminal, conversas anteriores. 
        Ele trabalha com o que você forneceu — sem acessar bases externas ou fazer chamadas 
        de API para "buscar conhecimento". Tudo que ele sabe vem do que está no contexto.
      </p>
      <svg class="funcao__icon" /* INPUT diagram */></svg>
    </article>

    <article class="funcao funcao--processa">
      <h3 class="funcao__subtitulo">COMO DEVIN PROCESSA</h3>
      <p class="funcao__label">Cognição: Pensamento sequencial com teste imediato</p>
      <p class="funcao__body">
        Devin não "acha a resposta" em um banco de memória gigante. Ele constrói 
        solução passo a passo: codifica → testa imediatamente → valida → refatora se necessário. 
        Esse ciclo tight de feedback permite ele corrigir erros no caminho, não depois.
      </p>
      <svg class="funcao__icon" /* PROCESS timeline */></svg>
    </article>

    <article class="funcao funcao--devolve">
      <h3 class="funcao__subtitulo">O QUE DEVIN DEVOLVE</h3>
      <p class="funcao__label">Saída: Código, testes, documentação, reflexão</p>
      <p class="funcao__body">
        Devin não apenas escreve código — também fornece testes que validam comportamento, 
        documentação que explica decisões, e reflexão sobre onde teve incerteza. 
        Você recebe não apenas a solução, mas evidência de que funcionou.
      </p>
      <svg class="funcao__icon" /* OUTPUT diagram */></svg>
    </article>

    <article class="funcao funcao--limites">
      <h3 class="funcao__subtitulo">LIMITES REAIS</h3>
      <p class="funcao__label">O que Devin não consegue</p>
      <p class="funcao__body">
        Devin não é seu gerente de projeto. Não entende prioridades de negócio profundas. 
        Não é seu arquiteto — decisões sobre trade-offs arquiteturais continuam sendo suas. 
        Não é seu juiz — não pode dizer "em sua empresa, a forma correta é X". 
        Tudo isso requer contexto humano que vai além de código.
      </p>
      <ul class="funcao__lista">
        <li>Não governa arquitetura (você governa)</li>
        <li>Não decide sobre release (você decide)</li>
        <li>Não entende política organizacional (você navega)</li>
        <li>Não tem empatia (você tem)</li>
      </ul>
    </article>

    <article class="funcao funcao--forcas">
      <h3 class="funcao__subtitulo">PONTOS FORTES</h3>
      <p class="funcao__label">Onde Devin excele</p>
      <p class="funcao__body">
        Refatoração sem receio de quebra (ele testa tudo). Documentação de código exaustiva. 
        Iteração rápida sem ego ("fiz assim, mas posso fazer diferente"). 
        Integração com ferramentas de build/test (ele usa). Análise de erros precisa.
      </p>
      <ul class="funcao__lista">
        <li>✓ Refatoração de alto risco</li>
        <li>✓ Testes exaustivos</li>
        <li>✓ Documentação de código</li>
        <li>✓ Iteração rápida sem fricção</li>
        <li>✓ Execução confiável</li>
      </ul>
    </article>
  </div>
</section>

<!-- SEÇÃO 12: CONTEXTO PERSISTENTE -->
<section class="contexto-persistente" id="contexto" data-section="contexto">
  <header class="contexto__header">
    <p class="contexto__label">GOVERNANÇA DE MEMÓRIA</p>
    <h2 class="contexto__title">Como estruturar contexto para máxima eficiência.</h2>
  </header>

  <article class="contexto__narrativa">
    <p>
      Contexto em uma conversa com a IA é como memória viva — persiste enquanto 
      a janela de conversa está aberta. Quanto maior a janela de contexto (janela 
      de tokens disponíveis), mais história o Devin pode carregar e usar para decisões.
    </p>
    <p>
      Mas contexto bagunçado causa hallucination — modelo tenta fazer conexões em 
      informação fragmentada. Contexto governado causa precisão — modelo entende a 
      estrutura da informação e usa corretamente.
    </p>
    <p>
      Estruturação é chave: como você organiza o que passa para a IA determina 
      a qualidade do que recebe de volta.
    </p>
  </article>

  <div class="contexto__estrategias">
    <article class="estrategia estrategia--imersiva">
      <h3 class="estrategia__nome">IMERSIVA</h3>
      <p class="estrategia__subtitulo">Mergulho profundo em projeto novo</p>
      <p class="estrategia__corpo">
        Cenário: Projeto novo, Devin não conhece a base.
      </p>
      <p class="estrategia__estrutura">
        <strong>Estrutura:</strong> Código walkthrough → explicação de arquitetura → constraints → exemplos reais.
      </p>
      <p class="estrategia__resultado">
        <strong>Resultado:</strong> Devin entende nuances, evita erros de contexto, propõe soluções alinhadas com padrões existentes.
      </p>
    </article>

    <article class="estrategia estrategia--tecnica">
      <h3 class="estrategia__nome">TÉCNICA</h3>
      <p class="estrategia__subtitulo">Task específica, contexto minimal</p>
      <p class="estrategia__corpo">
        Cenário: Devin já conhece o projeto, você tem task bem definida.
      </p>
      <p class="estrategia__estrutura">
        <strong>Estrutura:</strong> Apenas arquivo relevante → erro específico → critério de sucesso.
      </p>
      <p class="estrategia__resultado">
        <strong>Resultado:</strong> Velocidade máxima, execução precisa em escopo claro, economia de tokens.
      </p>
    </article>

    <article class="estrategia estrategia--iterativa">
      <h3 class="estrategia__nome">ITERATIVA</h3>
      <p class="estrategia__subtitulo">Refinamento progressivo via feedback</p>
      <p class="estrategia__corpo">
        Cenário: Conversa longa onde feedback refina progressivamente o resultado.
      </p>
      <p class="estrategia__estrutura">
        <strong>Estrutura:</strong> Incremento mínimo de contexto por turno → feedback do resultado anterior → refinamento.
      </p>
      <p class="estrategia__resultado">
        <strong>Resultado:</strong> Aprendizado compartilhado, economia de tokens, qualidade progressivamente melhor.
      </p>
    </article>
  </div>

  <figure class="contexto__diagrama">
    <svg class="diagrama__timeline" /* Contexto → Processa → Output → Feedback → Próximo */></svg>
    <figcaption class="diagrama__legenda">
      Contexto governado permite ciclos rápidos e precisos. Feedback refina contexto para próximo ciclo.
    </figcaption>
  </figure>
</section>
```

### Design Tokens (Tailwind CSS) — Extensões para Épico 05

```css
/* Anatomia Devin */
.anatomia__chapeu {
  font-size: 14px;
  color: #94A3B8;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.anatomia__title {
  font-size: 56px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.anatomia__subtitle {
  font-size: 18px;
  color: #F5F7FA;
  font-weight: 400;
  margin-bottom: 3rem;
}

.funcao {
  background: #1A1D21;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.funcao__subtitulo {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
}

.funcao__label {
  font-size: 13px;
  color: #FF6200;
  font-weight: 500;
  margin-bottom: 1rem;
}

.funcao__body {
  font-size: 14px;
  color: #F5F7FA;
  line-height: 1.7;
}

.funcao__lista {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.funcao__lista li {
  font-size: 14px;
  color: #F5F7FA;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.funcao__lista li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #FF6200;
}

/* Contexto Persistente */
.contexto__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #FF6200;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.contexto__title {
  font-size: 48px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 2rem;
}

.contexto__narrativa p {
  font-size: 15px;
  color: #F5F7FA;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.estrategia {
  background: #1A1D21;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 2rem;
}

.estrategia__nome {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
}

.estrategia__subtitulo {
  font-size: 13px;
  color: #FF6200;
  font-weight: 500;
  margin-bottom: 1rem;
}

.estrategia__corpo,
.estrategia__estrutura,
.estrategia__resultado {
  font-size: 14px;
  color: #F5F7FA;
  line-height: 1.6;
  margin-bottom: 0.8rem;
}

.diagrama__timeline {
  width: 100%;
  height: 80px;
  margin: 2rem 0;
}

.diagrama__legenda {
  font-size: 13px;
  color: #94A3B8;
  text-align: center;
  font-style: italic;
}
```

### Performance & Renderização

- **GPU Layers máximas para esta seção:** 9 (5 funções + 3 estratégias + diagrama).
- **Blur máximo:** 8px (apenas no chapéu de Seção 11).
- **will-change:** aplicado apenas durante scroll-linked reveals.
- **Transform-based animations:** opacity + translate (funções, estratégias, diagrama).
- **Lazy-load:** nenhum elemento lazy — tudo critical path.

### Responsividade & Accessibility

- **Desktop (viewport ≥ 1024px):**
  - Seção 11: 5 funções stack vertical, cards largos.
  - Seção 12: 3 estratégias em grid 3 colunas.

- **Tablet (768px ≤ viewport < 1024px):**
  - Seção 11: 5 funções stack vertical (sem mudança de layout).
  - Seção 12: 2 estratégias por linha (grid 2 colunas), terceira na linha nova.

- **Mobile (viewport < 768px):**
  - Seção 11: 5 funções stack vertical, padding reduzido.
  - Seção 12: 1 estratégia por linha (stack vertical).
  - Títulos reduzem: 56px → 36px, 48px → 32px.
  - Listas com arrows redimensionam apropriadamente.

- **Contrast:** WCAG AA (4.5:1) em todos os textos.
- **prefers-reduced-motion:**
  - Timelines eliminadas (tudo entra simultâneo).
  - Stagger reduz a 0.0s.
  - Blur eliminado.

---

## 4. CRITÉRIOS DE ACEITAÇÃO (TDD / SDD)

### Testes Automatizados (Playwright/Jest)

```gherkin
Cenário: Anatomia Devin carrega com 5 funções
  Quando a Seção 11 entra na viewport
  Então chapéu aparece com blur fade 8px → 0, duration 0.4s
  E título "Um Engenheiro de Software Autônomo" aparece com y-offset, duration 0.6s
  E 5 funções entram sequencialmente com stagger 0.15s
  Então VÊ → PROCESSA → DEVOLVE → LIMITES → FORÇAS (ordem respeitada)
  E cada função tem background #1A1D21, border #334155

Cenário: Contexto Persistente revela 3 estratégias
  Quando a Seção 12 entra na viewport
  Então rótulo "GOVERNANÇA DE MEMÓRIA" aparece com fade
  E título aparece com y-offset fade, duration 0.6s
  E narrativa revela parágrafo por parágrafo via SplitType, stagger 0.08s
  E 3 estratégias entram com y-offset 50px → 0, stagger 0.18s, expo.out

Cenário: Lista de funcionalidades renderiza com arrows
  Quando página carrega
  Então cada item da lista tem arrow (#FF6200) antes do texto
  E arrows alinham corretamente em mobile/desktop
  E contraste WCAG AA é respeitado

Cenário: Diagrama contexto renderiza responsivamente
  Quando página carrega em mobile
  Então diagrama não trunca horizontalmente
  E SVG responde a container width
  Quando viewport ≥ 1024px
  Então diagrama é horizontal inteiro

Cenário: Estratégias layout responsivo
  Quando viewport ≥ 1024px
  Então estratégias em grid 3 colunas
  Quando viewport 768px-1024px
  Então estratégias em 2 colunas
  Quando viewport < 768px
  Então estratégias em 1 coluna (stack vertical)

Cenário: prefers-reduced-motion desativa motion
  Dado user has prefers-reduced-motion:reduce
  Quando página carrega
  Então nenhuma animação > 0.8s ocorre
  E blur é eliminado
  E stagger é 0.0s (simultâneo)
```

### Critérios de Aprovação Visual

- **Seção 11 deve parecer "decomposição clara":** 5 funções bem diferenciadas, progressão lógica (vê → processa → devolve → limites → forças).
- **Funções devem parecer "educacionais":** cards informativos mas elegantes, sem bloat visual.
- **Limites vs. Forças:** devem ter visual diferenciado (cores diferentes ou ênfase) para claro contraste.
- **Seção 12 deve parecer "estratégica":** 3 estratégias são padrões reutilizáveis, não conselhos genéricos.
- **Diagrama deve parecer "contínuo":** mostra ciclo (feedback loop), não processo linear único.
- **Transição Seção 11 → 12:** depois de "entender Devin", "agora estruture contexto" faz sentido lógico.
- **Tipografia domina:** nenhum grafismo compete com conteúdo.

### Graceful Degradation (sem JS / navegadores antigos)

**Fallback sem SplitType:**
- Narrativa de Seção 12 revela como bloco estático (sem stagger parágrafo-por-parágrafo).
- Preserva espacamento, cores, contraste.

**Fallback sem Lenis:**
- Scroll nativo; animations permanecem via CSS/requestAnimationFrame.

**Fallback sem GSAP:**
- CSS animations para opacity + translate.
- Diagrama SVG continua renderizando (sem animação de entrada).

---

## PRÓXIMOS MICRO-SDDs (Ordem de Execução)

1. **Micro-SDD 06**: Skills + Playbooks + Knowledge (Seções 13-15) — Educação técnica interativa
2. **Micro-SDD 07**: Hands-on implementations (Seções 16-18) — Exercícios práticos
3. **Micro-SDD 08**: Reflexão sobre Vibe Coding (Seções 19-21) — Ato II Fechamento
4. ... (e assim sucessivamente até Seção 33)

---

## Notas para Execução

- Seção 11 "Anatomia" deve ser entendida como "cognitive leitura", não manual técnico — personificar as capacidades do Devin.
- Seção 12 "Contexto" é a ponte para Skills/Playbooks — padrões de conversa são reutilizáveis em todas as outras seções.
- Funções em Seção 11 seguem padrão similar a "Três Fundamentos" (Épico 02) — reuso de card component.
- Estratégias em Seção 12 podem ter ícones visuais (diagrama de entrada/saída, timeline, feedback loop) para diferenciação rápida.
- Motion em ambas seções é conservador (sem scale, sem complexidade) — clareza é prioridade sobre drama.
- QA visual: verificar que visitante sai com entendimento claro de (1) que Devin é bom em execução, (2) que contexto governa qualidade, (3) que existem padrões de conversa reutilizáveis.

---

**Status**: Aguardando aprovação antes de prosseguir aos próximos épicos.
