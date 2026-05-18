---
épico: 06
status: aprovado
---

======================================================================
MICRO-SDD: SKILLS + PLAYBOOKS + KNOWLEDGE
(Épico 06 — Seções 13-15 da Arquitetura Devin)
======================================================================

## 1. FUNDAMENTAÇÃO ACADÊMICA E CORPORATIVA (O "Para Quê")

### Conceito Raiz — "Do Técnico ao Operacional: Os Três Arsenais de Colaboração"

Após entender a anatomia do Devin e como estruturar contexto (Épico 05), este épico introduz os **três arsenais práticos** que governam toda colaboração eficaz com agentes de IA: o que você *sabe fazer* (Skills), como você *faz* (Playbooks), e o que você *referencia* (Knowledge).

**Arquitetura em três fases:**

1. **Seção 13 (Skills):** Competências específicas do Devin — tarefas que ele executa excepcionalmente bem (refatoração, testes, documentação, análise de erros). Não é "tudo o que ele pode fazer", mas as **especialidades** onde ele agrega máximo valor.

2. **Seção 14 (Playbooks):** Procedimentos estruturados — receitas prontas para situações recorrentes (onboarding de novo engenheiro, code review iterativo, migração de framework, etc.). Playbook é um "script conversacional" que pode ser reusado em múltiplos projetos.

3. **Seção 15 (Knowledge):** O repositório de referência — documentação, padrões, decisões arquiteturais que persistem entre conversas. Knowledge é o "contexto corporativo" que enriquece todas as conversas.

**Mapeamento aos materiais:**
- **rules.md**: "Motion Hierarchy" (Hero, Narrative, Structural, Passive, Static) — analogia perfeita para estruturar Skills (hero-level), Playbooks (narrative), Knowledge (structural/reference).
- **Vídeo 2** ("IA como Agente"): agente é eficiente quando tem "script" (playbook) e "referência" (knowledge).
- **03_spec_site_devin_vibe_coding.md**: referências a "Skills", "Playbooks" como estruturas de Ato II.

**Objetivo Cognitivo e Emocional:**

1. **Seção 13:** Visitante aprende a *categorizar* tarefas por afinidade com capacidades do Devin. Ele sai pensando "ah, essa tarefa é uma 'refactoring skill' — devo comunicar assim".

2. **Seção 14:** Visitante aprende que colaboração eficiente é *padrão*, não improviso. Um bom Playbook economiza tokens, tempo e fricção.

3. **Seção 15:** Visitante entende que Knowledge é *ativo corporativo* — bem documentado, cresce ao longo do tempo, multiplica valor de todas as conversas futuras.

**Transição esperada:** "Agora que entendo como falar com a ferramenta e qual é sua anatomia, posso estruturar meu *trabalho* (skills), meus *procedimentos* (playbooks) e minha *memória corporativa* (knowledge) para máxima eficiência."

---

## 2. COMPORTAMENTO E EXPERIÊNCIA VISUAL (O "Como se Sente")

### Layout e Arquitetura de Informação

**Seção 13 — SKILLS: O QUE DEVIN EXECUTA EXCEPCIONALMENTE BEM**

**Faseamento visual:**

1. **Chapéu Introdutório** (topo, pequeno, contexto):
   - "As especialidades onde Devin agrega máximo valor."
   - Cor: `#94A3B8`, tamanho 14px.

2. **Título** (grande, monumental):
   - "Cinco Skills Fundamentais"
   - Tamanho: 48-56px, `#FFFFFF`, peso 700.

3. **Subtítulo** (explicativo):
   - "Cada skill é um domínio onde o Devin executa com excelência, sem necesidade de supervisão linha por linha."
   - Tamanho: 16px, `#F5F7FA`, peso 400.

4. **Cinco Cards de Skill** (layout em grid responsivo):
   Cada card é estruturado como "especialidade":

   **Skill 1 — REFATORAÇÃO SEM RISCO**
   - Ícone/Visual: símbolo de transformação (setas circular ou refactor).
   - Corpo: Devin refatora código com confiança porque testa cada mudança. Sem receio de quebra.
   - Aplicação: "Use quando seu código ainda funciona mas ficou complexo demais."
   - Contexto esperado: código original + testes + critério de refactor.
   - Resultado esperado: código refatorado + testes passando + explicação de mudanças.

   **Skill 2 — TESTES EXAUSTIVOS**
   - Ícone/Visual: símbolos de checkmark ou coverage.
   - Corpo: Devin escreve testes que cobrem edge cases que você não pensou. Testa comportamento, não apenas happy path.
   - Aplicação: "Use quando precisa cobrir casos extremos ou quando está migrando para nova arquitetura."
   - Contexto esperado: função/módulo + exemplos de edge cases + padrão de teste existente.
   - Resultado esperado: testes abrangentes + coverage report + análise de gaps.

   **Skill 3 — DOCUMENTAÇÃO DE CÓDIGO**
   - Ícone/Visual: símbolos de documento ou livro.
   - Corpo: Devin documenta não apenas o "o quê", mas o "por quê" — decisões, trade-offs, armadilhas.
   - Aplicação: "Use quando seu código é novo ou quando precisa onboardear novos engenheiros."
   - Contexto esperado: código + histórico de decisões (git log, PRs, chat) + público-alvo.
   - Resultado esperado: documentação clara + exemplos de uso + links para código relevante.

   **Skill 4 — ANÁLISE E DEBUGGING**
   - Ícone/Visual: símbolos de bug ou magnifier.
   - Corpo: Devin lê stack traces, hypothetiza causa, propõe fix, testa. Debug é pensamento sequencial — forte suit do Devin.
   - Aplicação: "Use quando está preso em erro sem saída óbvia."
   - Contexto esperado: erro completo + logs + código relevante + passos para reproduzir.
   - Resultado esperado: diagnóstico preciso + fix validado + explicação do root cause.

   **Skill 5 — INTEGRAÇÃO E ORQUESTRAÇÃO**
   - Ícone/Visual: símbolos de conexão ou engrenagens.
   - Corpo: Devin integra componentes, estrutura workflows, orquestra múltiplos serviços. Segue padrões e convenções.
   - Aplicação: "Use quando precisa conectar sistemas ou estruturar novo fluxo."
   - Contexto esperado: diagramas/descrição de componentes + APIs + requisitos de fluxo.
   - Resultado esperado: integração funcional + testes de ponta a ponta + documentação de interface.

**Sensação geral:**
- Cada skill é "especialidade" — não promessa genérica.
- Cards mostram aplicação concreta (quando usar) + contexto (o que fornecer) + resultado (o que esperar).
- Visitante sai sabendo "essa tarefa é uma Skill de Refatoração, então devo estruturar assim".

---

**Seção 14 — PLAYBOOKS: PROCEDIMENTOS ESTRUTURADOS PARA SITUAÇÕES RECORRENTES**

**Faseamento visual:**

1. **Rótulo** (topo, `#FF6200`):
   - "PADRÕES DE COLABORAÇÃO"

2. **Título**:
   - "Três Playbooks Reutilizáveis"
   - Tamanho: 48px, `#FFFFFF`.

3. **Subtítulo**:
   - "Um playbook é um script conversacional — a sequência de contexto, instrução e iteração que funciona para um padrão recorrente."
   - Tamanho: 16px, `#F5F7FA`.

4. **Três Playbooks** (cards, layout responsivo):
   Cada playbook é um "workflow conversacional":

   **Playbook 1 — CODE REVIEW ITERATIVO**
   - Situação: Você quer melhorar qualidade de pull requests antes de merge.
   - Sequência:
     1. Submete PR inteira ao Devin (código + PR description + testes).
     2. Devin analisa, sugere melhorias (performance, segurança, legibilidade).
     3. Você incorpora feedbacks.
     4. Devin revê novamente, valida que problemas foram resolvidos.
     5. Iteração até "aprovado".
   - Contexto Total: ~2-3 mil tokens (código + análise + feedback).
   - Tempo: ~15-20 minutos de iteração real.
   - Resultado: PR de qualidade comprovada, sem surpresas em merge.

   **Playbook 2 — ONBOARDING DE NOVO ENGENHEIRO**
   - Situação: Novo engenheiro chega, precisa entender projeto rapidamente.
   - Sequência:
     1. Fornece walkthrough de arquitetura (diagramas, decisões).
     2. Devin explica padrões, convenções, regras de projeto.
     3. Novo engenheiro faz pequenas tarefas com Devin como mentor (Devin escreve, novato valida).
     4. Iteração até confiança.
   - Contexto Total: ~4-5 mil tokens (documentação + exemplos + feedback).
   - Tempo: ~2-3 horas de "mentoring estruturado".
   - Resultado: Novo engenheiro ramp-up 70% mais rápido.

   **Playbook 3 — MIGRAÇÃO DE FRAMEWORK**
   - Situação: Precisa migrar codebase de Vue 2 para Vue 3, React Class para Function, etc.
   - Sequência:
     1. Define escopo (quais componentes, qual ordem).
     2. Devin migra primeiro componente completo com testes.
     3. Você valida padrão.
     4. Devin migra resto aplicando padrão, você spot-check.
     5. Iteração até 100% migrado.
   - Contexto Total: ~6-8 mil tokens (código original + padrão + testes + validação).
   - Tempo: ~4-6 horas (depende do tamanho do projeto).
   - Resultado: Migração confiável, sem erros silenciosos.

**Sensação geral:**
- Cada playbook é um "template de conversa" que pode ser usado em múltiplos projetos.
- Visitante entende que colaboração não é ad-hoc — é padrão, testado, reutilizável.

---

**Seção 15 — KNOWLEDGE: O REPOSITÓRIO DE REFERÊNCIA CORPORATIVA**

**Faseamento visual:**

1. **Rótulo** (topo, `#FF6200`):
   - "MEMÓRIA CORPORATIVA"

2. **Título**:
   - "Knowledge: O Ativo que Cresce"
   - Tamanho: 48px, `#FFFFFF`.

3. **Subtítulo**:
   - "Knowledge é documentação viva — arquitetura, padrões, decisões, lições aprendidas. Quanto melhor documentado seu Knowledge, mais eficiente cada conversa com Devin."
   - Tamanho: 16px, `#F5F7FA`.

4. **Três Categorias de Knowledge** (cards, layout responsivo):

   **Knowledge 1 — ARQUITETURA E PADRÕES**
   - Conteúdo: Diagramas de arquitetura, decisões de design, trade-offs aceitos.
   - Documento de exemplo: "ADR (Architecture Decision Record) — por que escolhemos monolito sobre micro-serviços?"
   - Benefício: Quando Devin conhece arquitetura, evita propostas que quebram padrões.
   - Frequência de atualização: Quando houver grande mudança arquitetural (~2-4x por ano).

   **Knowledge 2 — GUIAS E CONVENÇÕES**
   - Conteúdo: Code style, naming conventions, pasta structure, padrões de componente.
   - Documento de exemplo: "Style Guide de React — como nomeamos componentes, como estruturamos state, como testamos."
   - Benefício: Devin gera código que já segue seu padrão — não precisa refator.
   - Frequência de atualização: Quando padrão muda (~1x por semestre).

   **Knowledge 3 — LIÇÕES APRENDIDAS E GOTCHAS**
   - Conteúdo: O que não funcionou, armadilhas que já enfrentou, soluções que descobriu.
   - Documento de exemplo: "Bugs antigos — 'Performance degrada quando N > 10k registros porque X. A solução testada é Y.'"
   - Benefício: Devin evita refazer erros que você já aprendeu a dor.
   - Frequência de atualização: Contínua (sempre que descobre novo gotcha).

5. **Diagrama: Como Knowledge Flui** (visual):
   - Mostra ciclo: "Seu projeto" → "Experiência" → "Lição aprendida" → "Documentation de Knowledge" → "Proxima conversa com Devin (contexto rico)" → "Resultado melhor".
   - Enfatiza que Knowledge é *investimento* — custa um pouco agora (documentar), economiza muito depois (conversas eficientes).

**Sensação geral:**
- Knowledge não é "documentação genérica" — é *específico da sua empresa/projeto*.
- Visitante entende que documentar vale a pena.

### Dinâmica de Scroll e Tempo de Leitura

- **Seção 13:** Scroll nativo. Tempo: ~180 segundos (título + 5 skills × ~30s cada).
- **Espaço de respiro:** 8vh.
- **Seção 14:** Scroll nativo. Tempo: ~150 segundos (título + 3 playbooks × ~45s cada).
- **Espaço de respiro:** 8vh.
- **Seção 15:** Scroll nativo. Tempo: ~120 segundos (título + 3 categorias + diagrama + explicação).
- **Tempo total acumulado:** ~8-9 minutos.

### Motion System e Coreografia Visual

**Timelines principais:**

1. **skillsTimeline** (onScroll-linked, inicia quando Seção 13 atinge 40% viewport):
   - Chapéu: fade-in com blur (8px → 0), duration 0.4s.
   - Título: fade + y-offset (20px → 0), duration 0.6s, delay 0.2s.
   - Subtítulo: fade, duration 0.4s, delay 0.4s.
   - Cinco skills: entrada sequencial com y-offset (40px → 0) + opacity, stagger 0.15s, easing expo.out.
   - **Total:** ~1.8s de entrada.

2. **playbooksTimeline** (onScroll-linked, inicia quando Seção 14 atinge 40% viewport):
   - Rótulo: fade, duration 0.3s.
   - Título: fade + y-offset, duration 0.6s, delay 0.2s.
   - Subtítulo: fade, duration 0.4s, delay 0.4s.
   - Três playbooks: entrada sequencial y-offset (50px → 0) + opacity, stagger 0.18s, easing expo.out.
   - **Total:** ~1.8s.

3. **knowledgeTimeline** (onScroll-linked, inicia quando Seção 15 atinge 40% viewport):
   - Rótulo: fade, duration 0.3s.
   - Título: fade + y-offset, duration 0.6s, delay 0.2s.
   - Subtítulo: fade, duration 0.4s, delay 0.4s.
   - Três categorias: entrada sequencial y-offset (40px → 0) + opacity, stagger 0.15s.
   - Diagrama: entrada sequencial de componentes (ciclo), stagger 0.2s.
   - **Total:** ~2.0s.

**Easing:** expo.out (primário), power3.out (suporte).
**Motion direction:** Y-axis (vertical).
**Scale:** nenhuma scale — clareza é prioridade.

---

## 3. ESPECIFICAÇÃO TÉCNICA (O "Como se Constrói")

### Estrutura HTML Semântica

```html
<!-- SEÇÃO 13: SKILLS -->
<section class="skills" id="skills" data-section="skills">
  <header class="skills__header">
    <p class="skills__chapeu">As especialidades onde Devin agrega máximo valor.</p>
    <h2 class="skills__title">Cinco Skills Fundamentais</h2>
    <p class="skills__subtitle">
      Cada skill é um domínio onde o Devin executa com excelência, 
      sem necessidade de supervisão linha por linha.
    </p>
  </header>

  <div class="skills__cards">
    <article class="skill-card skill-card--refator">
      <h3 class="skill-card__title">REFATORAÇÃO SEM RISCO</h3>
      <p class="skill-card__corpo">
        Devin refatora código com confiança porque testa cada mudança. 
        Sem receio de quebra, com compreensão profunda do padrão original.
      </p>
      <div class="skill-card__details">
        <p class="skill-card__label">Quando usar:</p>
        <p class="skill-card__texto">Quando seu código ainda funciona mas ficou complexo demais.</p>
        
        <p class="skill-card__label">Contexto esperado:</p>
        <p class="skill-card__texto">Código original + testes existentes + critério de refactor.</p>
        
        <p class="skill-card__label">Resultado esperado:</p>
        <p class="skill-card__texto">Código refatorado + testes passando + explicação de mudanças.</p>
      </div>
    </article>

    <article class="skill-card skill-card--testes">
      <h3 class="skill-card__title">TESTES EXAUSTIVOS</h3>
      <p class="skill-card__corpo">
        Devin escreve testes que cobrem edge cases que você não pensou. 
        Testa comportamento, não apenas happy path.
      </p>
      <div class="skill-card__details">
        <p class="skill-card__label">Quando usar:</p>
        <p class="skill-card__texto">Quando precisa cobrir casos extremos ou migrando para nova arquitetura.</p>
        
        <p class="skill-card__label">Contexto esperado:</p>
        <p class="skill-card__texto">Função/módulo + exemplos de edge cases + padrão de teste existente.</p>
        
        <p class="skill-card__label">Resultado esperado:</p>
        <p class="skill-card__texto">Testes abrangentes + coverage report + análise de gaps.</p>
      </div>
    </article>

    <article class="skill-card skill-card--docs">
      <h3 class="skill-card__title">DOCUMENTAÇÃO DE CÓDIGO</h3>
      <p class="skill-card__corpo">
        Devin documenta não apenas o "o quê", mas o "por quê" — 
        decisões, trade-offs, armadilhas comuns.
      </p>
      <div class="skill-card__details">
        <p class="skill-card__label">Quando usar:</p>
        <p class="skill-card__texto">Quando seu código é novo ou precisa onboardear novos engenheiros.</p>
        
        <p class="skill-card__label">Contexto esperado:</p>
        <p class="skill-card__texto">Código + histórico de decisões (git log, PRs) + público-alvo.</p>
        
        <p class="skill-card__label">Resultado esperado:</p>
        <p class="skill-card__texto">Documentação clara + exemplos de uso + links para código relevante.</p>
      </div>
    </article>

    <article class="skill-card skill-card--debug">
      <h3 class="skill-card__title">ANÁLISE E DEBUGGING</h3>
      <p class="skill-card__corpo">
        Devin lê stack traces, hypothetiza causa, propõe fix, testa. 
        Debug é pensamento sequencial — forte suit do Devin.
      </p>
      <div class="skill-card__details">
        <p class="skill-card__label">Quando usar:</p>
        <p class="skill-card__texto">Quando está preso em erro sem saída óbvia.</p>
        
        <p class="skill-card__label">Contexto esperado:</p>
        <p class="skill-card__texto">Erro completo + logs + código relevante + passos para reproduzir.</p>
        
        <p class="skill-card__label">Resultado esperado:</p>
        <p class="skill-card__texto">Diagnóstico preciso + fix validado + explicação do root cause.</p>
      </div>
    </article>

    <article class="skill-card skill-card--integracao">
      <h3 class="skill-card__title">INTEGRAÇÃO E ORQUESTRAÇÃO</h3>
      <p class="skill-card__corpo">
        Devin integra componentes, estrutura workflows, orquestra múltiplos serviços. 
        Segue padrões e convenções.
      </p>
      <div class="skill-card__details">
        <p class="skill-card__label">Quando usar:</p>
        <p class="skill-card__texto">Quando precisa conectar sistemas ou estruturar novo fluxo.</p>
        
        <p class="skill-card__label">Contexto esperado:</p>
        <p class="skill-card__texto">Diagramas/descrição de componentes + APIs + requisitos de fluxo.</p>
        
        <p class="skill-card__label">Resultado esperado:</p>
        <p class="skill-card__texto">Integração funcional + testes de ponta a ponta + documentação de interface.</p>
      </div>
    </article>
  </div>
</section>

<!-- SEÇÃO 14: PLAYBOOKS -->
<section class="playbooks" id="playbooks" data-section="playbooks">
  <header class="playbooks__header">
    <p class="playbooks__label">PADRÕES DE COLABORAÇÃO</p>
    <h2 class="playbooks__title">Três Playbooks Reutilizáveis</h2>
    <p class="playbooks__subtitle">
      Um playbook é um script conversacional — a sequência de contexto, 
      instrução e iteração que funciona para um padrão recorrente.
    </p>
  </header>

  <div class="playbooks__cards">
    <article class="playbook-card playbook-card--codereview">
      <h3 class="playbook-card__title">CODE REVIEW ITERATIVO</h3>
      <p class="playbook-card__situacao">
        <strong>Situação:</strong> Você quer melhorar qualidade de pull requests antes de merge.
      </p>
      <div class="playbook-card__sequencia">
        <p class="playbook-card__label">Sequência:</p>
        <ol class="playbook-card__lista">
          <li>Submete PR inteira ao Devin (código + PR description + testes).</li>
          <li>Devin analisa, sugere melhorias (performance, segurança, legibilidade).</li>
          <li>Você incorpora feedbacks.</li>
          <li>Devin revê novamente, valida que problemas foram resolvidos.</li>
          <li>Iteração até "aprovado".</li>
        </ol>
      </div>
      <p class="playbook-card__dados">
        <strong>Contexto total:</strong> ~2-3 mil tokens (código + análise + feedback)<br />
        <strong>Tempo:</strong> ~15-20 minutos de iteração real<br />
        <strong>Resultado:</strong> PR de qualidade comprovada, sem surpresas em merge.
      </p>
    </article>

    <article class="playbook-card playbook-card--onboarding">
      <h3 class="playbook-card__title">ONBOARDING DE NOVO ENGENHEIRO</h3>
      <p class="playbook-card__situacao">
        <strong>Situacao:</strong> Novo engenheiro chega, precisa entender projeto rapidamente.
      </p>
      <div class="playbook-card__sequencia">
        <p class="playbook-card__label">Sequência:</p>
        <ol class="playbook-card__lista">
          <li>Fornece walkthrough de arquitetura (diagramas, decisões).</li>
          <li>Devin explica padrões, convenções, regras de projeto.</li>
          <li>Novo engenheiro faz pequenas tarefas com Devin como mentor (Devin escreve, novato valida).</li>
          <li>Iteração até confiança.</li>
        </ol>
      </div>
      <p class="playbook-card__dados">
        <strong>Contexto total:</strong> ~4-5 mil tokens (documentação + exemplos + feedback)<br />
        <strong>Tempo:</strong> ~2-3 horas de "mentoring estruturado"<br />
        <strong>Resultado:</strong> Novo engenheiro ramp-up 70% mais rápido.
      </p>
    </article>

    <article class="playbook-card playbook-card--migracao">
      <h3 class="playbook-card__title">MIGRAÇÃO DE FRAMEWORK</h3>
      <p class="playbook-card__situacao">
        <strong>Situação:</strong> Precisa migrar codebase de Vue 2 para Vue 3, React Class para Function, etc.
      </p>
      <div class="playbook-card__sequencia">
        <p class="playbook-card__label">Sequência:</p>
        <ol class="playbook-card__lista">
          <li>Define escopo (quais componentes, qual ordem).</li>
          <li>Devin migra primeiro componente completo com testes.</li>
          <li>Você valida padrão.</li>
          <li>Devin migra resto aplicando padrão, você spot-check.</li>
          <li>Iteração até 100% migrado.</li>
        </ol>
      </div>
      <p class="playbook-card__dados">
        <strong>Contexto total:</strong> ~6-8 mil tokens (código original + padrão + testes + validação)<br />
        <strong>Tempo:</strong> ~4-6 horas (depende do tamanho do projeto)<br />
        <strong>Resultado:</strong> Migração confiável, sem erros silenciosos.
      </p>
    </article>
  </div>
</section>

<!-- SEÇÃO 15: KNOWLEDGE -->
<section class="knowledge" id="knowledge" data-section="knowledge">
  <header class="knowledge__header">
    <p class="knowledge__label">MEMÓRIA CORPORATIVA</p>
    <h2 class="knowledge__title">Knowledge: O Ativo que Cresce</h2>
    <p class="knowledge__subtitle">
      Knowledge é documentação viva — arquitetura, padrões, decisões, lições aprendidas. 
      Quanto melhor documentado seu Knowledge, mais eficiente cada conversa com Devin.
    </p>
  </header>

  <div class="knowledge__categorias">
    <article class="knowledge-card knowledge-card--arquitetura">
      <h3 class="knowledge-card__title">ARQUITETURA E PADRÕES</h3>
      <p class="knowledge-card__conteudo">
        Diagramas de arquitetura, decisões de design, trade-offs aceitos.
      </p>
      <p class="knowledge-card__exemplo">
        <strong>Documento de exemplo:</strong> "ADR (Architecture Decision Record) — 
        por que escolhemos monolito sobre micro-serviços?"
      </p>
      <p class="knowledge-card__beneficio">
        <strong>Benefício:</strong> Quando Devin conhece arquitetura, 
        evita propostas que quebram padrões.
      </p>
      <p class="knowledge-card__frequencia">
        <strong>Frequência de atualização:</strong> Quando houver grande mudança arquitetural (~2-4x por ano).
      </p>
    </article>

    <article class="knowledge-card knowledge-card--guias">
      <h3 class="knowledge-card__title">GUIAS E CONVENÇÕES</h3>
      <p class="knowledge-card__conteudo">
        Code style, naming conventions, pasta structure, padrões de componente.
      </p>
      <p class="knowledge-card__exemplo">
        <strong>Documento de exemplo:</strong> "Style Guide de React — 
        como nomeamos componentes, como estruturamos state, como testamos."
      </p>
      <p class="knowledge-card__beneficio">
        <strong>Benefício:</strong> Devin gera código que já segue seu padrão — não precisa refator.
      </p>
      <p class="knowledge-card__frequencia">
        <strong>Frequência de atualização:</strong> Quando padrão muda (~1x por semestre).
      </p>
    </article>

    <article class="knowledge-card knowledge-card--gotchas">
      <h3 class="knowledge-card__title">LIÇÕES APRENDIDAS E GOTCHAS</h3>
      <p class="knowledge-card__conteudo">
        O que não funcionou, armadilhas que já enfrentou, soluções que descobriu.
      </p>
      <p class="knowledge-card__exemplo">
        <strong>Documento de exemplo:</strong> "Bugs antigos — 
        'Performance degrada quando N > 10k registros porque X. A solução testada é Y.'"
      </p>
      <p class="knowledge-card__beneficio">
        <strong>Benefício:</strong> Devin evita refazer erros que você já aprendeu a dor.
      </p>
      <p class="knowledge-card__frequencia">
        <strong>Frequência de atualização:</strong> Contínua (sempre que descobre novo gotcha).
      </p>
    </article>
  </div>

  <figure class="knowledge__diagrama">
    <svg class="diagrama__ciclo" /* Seu projeto → Experiência → Lição → Documentation → Próxima conversa (contexto rico) → Resultado melhor */></svg>
    <figcaption class="diagrama__legenda">
      Knowledge é investimento — custa um pouco agora (documentar), economiza muito depois (conversas eficientes).
    </figcaption>
  </figure>
</section>
```

### Design Tokens (Tailwind CSS) — Extensões para Épico 06

```css
/* Skills */
.skills__chapeu {
  font-size: 14px;
  color: #94A3B8;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.skills__title {
  font-size: 56px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1rem;
}

.skills__subtitle {
  font-size: 16px;
  color: #F5F7FA;
  font-weight: 400;
  margin-bottom: 2.5rem;
}

.skill-card {
  background: #1A1D21;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.skill-card__title {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #FFFFFF;
  margin-bottom: 1rem;
}

.skill-card__corpo {
  font-size: 15px;
  color: #F5F7FA;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.skill-card__details {
  padding-top: 1.5rem;
  border-top: 1px solid #334155;
}

.skill-card__label {
  font-size: 13px;
  font-weight: 600;
  color: #FF6200;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.skill-card__label:first-child {
  margin-top: 0;
}

.skill-card__texto {
  font-size: 14px;
  color: #F5F7FA;
  line-height: 1.6;
}

/* Playbooks */
.playbooks__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #FF6200;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.playbooks__title {
  font-size: 48px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1rem;
}

.playbooks__subtitle {
  font-size: 16px;
  color: #F5F7FA;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.playbook-card {
  background: #1A1D21;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.playbook-card__title {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #FFFFFF;
  margin-bottom: 1rem;
}

.playbook-card__situacao {
  font-size: 14px;
  color: #F5F7FA;
  margin-bottom: 1rem;
}

.playbook-card__label {
  font-size: 13px;
  font-weight: 600;
  color: #FF6200;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.playbook-card__lista {
  font-size: 14px;
  color: #F5F7FA;
  line-height: 1.7;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.playbook-card__lista li {
  margin-bottom: 0.5rem;
}

.playbook-card__dados {
  font-size: 13px;
  color: #94A3B8;
  line-height: 1.6;
  padding-top: 1rem;
  border-top: 1px solid #334155;
  margin-top: 1rem;
}

/* Knowledge */
.knowledge__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #FF6200;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.knowledge__title {
  font-size: 48px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1rem;
}

.knowledge__subtitle {
  font-size: 16px;
  color: #F5F7FA;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.knowledge-card {
  background: #1A1D21;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.knowledge-card__title {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #FFFFFF;
  margin-bottom: 1rem;
}

.knowledge-card__conteudo,
.knowledge-card__exemplo,
.knowledge-card__beneficio,
.knowledge-card__frequencia {
  font-size: 14px;
  color: #F5F7FA;
  line-height: 1.6;
  margin-bottom: 0.8rem;
}

.knowledge-card__exemplo,
.knowledge-card__beneficio,
.knowledge-card__frequencia {
  color: #94A3B8;
}

.diagrama__ciclo {
  width: 100%;
  height: 100px;
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

- **GPU Layers máximas para esta seção:** 12 (5 skills + 3 playbooks + 3 knowledge + diagramas).
- **Blur máximo:** 8px (apenas em chapéus introdutórios).
- **will-change:** aplicado apenas durante scroll-linked reveals.
- **Transform-based animations:** opacity + translate (cards, elementos).
- **Lazy-load:** nenhum elemento lazy — tudo critical path.

### Responsividade & Accessibility

- **Desktop (viewport ≥ 1024px):**
  - Seção 13: 5 skill cards stack vertical, cards largos.
  - Seção 14: 3 playbook cards stack vertical.
  - Seção 15: 3 knowledge cards stack vertical.

- **Tablet (768px ≤ viewport < 1024px):**
  - Mesmo layout (stack vertical), padding/margins ajustados.

- **Mobile (viewport < 768px):**
  - Todas seções: 1 item por "linha" (stack vertical).
  - Títulos reduzem: 56px → 36px, 48px → 32px.
  - Padding em cards reduz de 2rem para 1.5rem.

- **Contrast:** WCAG AA (4.5:1) em todos os textos.
- **prefers-reduced-motion:**
  - Timelines eliminadas (tudo entra simultâneo).
  - Stagger reduz a 0.0s.
  - Blur eliminado.

---

## 4. CRITÉRIOS DE ACEITAÇÃO (TDD / SDD)

### Testes Automatizados (Playwright/Jest)

```gherkin
Cenário: Skills carregam com 5 cards
  Quando a Seção 13 entra na viewport
  Então chapéu aparece com blur fade, duration 0.4s
  E título aparece com y-offset fade
  E 5 skill cards entram com stagger 0.15s, expo.out
  E cada card tem estrutura: título + corpo + details (quando usar/contexto/resultado)

Cenário: Playbooks revelam sequencialmente
  Quando a Seção 14 entra na viewport
  Então rótulo aparece com fade
  E título aparece com y-offset fade, duration 0.6s
  E 3 playbook cards entram com stagger 0.18s
  E cada card tem: título + situação + sequência (lista numerada) + dados (contexto/tempo/resultado)

Cenário: Knowledge categorias renderizam
  Quando a Seção 15 entra na viewport
  Então rótulo + título + subtítulo entram com fade
  E 3 knowledge cards entram com stagger 0.15s
  E diagrama ciclo entra sequencialmente (componentes em stagger 0.2s)
  E legenda aparece com fade

Cenário: Cards layout responsivo
  Quando viewport ≥ 1024px
  Então cards empilham verticalmente (stack)
  Quando viewport 768px-1024px
  Então cards empilham verticalmente (padding ajustado)
  Quando viewport < 768px
  Então cards empilham em 1 coluna, padding reduz para 1.5rem

Cenário: Listas numeradas em playbooks
  Quando página carrega
  Então sequência de playbook renderiza como <ol> numerada
  E números aparecem como 1., 2., 3., etc
  E indentação é respeitada
  E mobile não trunca texto (text-wrap ajustado)

Cenário: prefers-reduced-motion desativa motion
  Dado user has prefers-reduced-motion:reduce
  Quando página carrega
  Então nenhuma animação > 0.8s ocorre
  E blur é eliminado
  E stagger é 0.0s (tudo simultâneo)

Cenário: Contraste WCAG AA
  Quando página carrega
  Então todos os textos têm ratio ≥ 4.5:1 contra background
  E cores de ênfase (#FF6200) não prejudicam legibilidade
```

### Critérios de Aprovação Visual

- **Seção 13 deve parecer "competências claras":** 5 skills bem diferenciados, cada um com aplicação concreta.
- **Estrutura "Quando usar / Contexto / Resultado" deve ser óbvia:** visitante sabe exatamente como usar cada skill.
- **Seção 14 deve parecer "recipes reutilizáveis":** 3 playbooks são templates concretos, não abstratos.
- **Sequências em playbooks devem parecer "executáveis":** lista numerada é clara, passos são sequenciais.
- **Seção 15 deve parecer "investimento de longo prazo":** Knowledge é ativo corporativo, não documentação genérica.
- **Diagrama em Seção 15 deve mostrar ciclo:** enfatiza que Knowledge cresce ao longo do tempo.
- **Transição 13 → 14 → 15:** Skills (tático) → Playbooks (procedural) → Knowledge (estratégico) — progressão clara.
- **Tipografia domina:** nenhum grafismo compete com conteúdo.

### Graceful Degradation (sem JS / navegadores antigos)

**Fallback sem SplitType:**
- Textos revelam como blocos estáticos (sem stagger parágrafo-por-parágrafo).

**Fallback sem Lenis:**
- Scroll nativo; animations permanecem.

**Fallback sem GSAP:**
- CSS animations para opacity + translate.
- Diagrama SVG renderiza estático (sem animação de entrada).

---

## PRÓXIMOS MICRO-SDDs (Ordem de Execução)

1. **Micro-SDD 07**: Hands-on + Mentoria (Seções 16-18) — Exercícios práticos
2. **Micro-SDD 08**: Reflexão sobre Vibe Coding (Seções 19-21) — Ato II Fechamento
3. **Micro-SDD 09**: Liderança + Cultura (Seções 22-24) — Ato III Início
4. ... (e assim sucessivamente até Seção 33)

---

## Notas para Execução

- Seção 13 Skills é "catálogo de competências" — cada skill é especialidade observável, não promessa vaga.
- Seção 14 Playbooks são "templates de conversa" reutilizáveis em múltiplos projetos.
- Seção 15 Knowledge é "ativo corporativo que cresce" — documentação que multiplica valor de todas conversas futuras.
- Cards em todas as três seções seguem padrão similar (Épicos 02, 03, 05) — reuso de componentes.
- Motion é conservador (sem scale, clareza visual é prioridade).
- QA visual: verificar que visitante sai com roadmap claro: (1) posso usar skills de forma competente, (2) posso aplicar playbooks em meus projetos, (3) devo documentar meu Knowledge corporativo.

---

**Status**: Aguardando aprovação antes de prosseguir aos próximos épicos.
