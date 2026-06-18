# Prompt de edição pontual — engenharia-agentes-ia
**Para:** Claude Code  
**Modo:** edição cirúrgica — não reescreva o que não foi pedido  
**Arquivos:** `engenharia-agentes-ia.html` · `js/eai-sim.js` · `js/eai-anatomy.js` (ou equivalente)

Antes de qualquer implementação: leia este documento inteiro. Depois implemente uma tarefa por vez, na ordem indicada. Após cada tarefa, execute o site no browser (ou valide o HTML/JS) antes de avançar.

---

## Tarefa A — Árvore do repositório: aberta por padrão

**Arquivo:** `js/eai-anatomy.js` (ou onde a árvore é renderizada)

**O que fazer:** a árvore de pastas deve aparecer completamente expandida quando a página carrega. O comportamento de expandir/recolher ao clicar deve ser mantido.

**Como implementar:**

Se a árvore usa `<details>`:
```html
<!-- adicionar o atributo open em todos os <details> da árvore -->
<details open class="eai-tree__item">
```

Se a árvore é renderizada por JS (mais provável dado o `eai-anatomy.js`), altere o estado inicial de cada nó:

```js
// Onde o nó é criado, mude o estado inicial de collapsed para expanded
// Antes:
const node = { ...item, expanded: false }

// Depois:
const node = { ...item, expanded: true }
```

Se houver uma função de toggle, garanta que o estado inicial `expanded` seja `true` para todos os nós, e que o clique alterne entre `true` e `false` normalmente.

**Comportamento esperado:**
- Ao abrir a página: toda a árvore visível, todos os níveis expandidos
- Ao clicar numa pasta: recolhe os filhos daquela pasta
- Ao clicar novamente: expande de volta
- O painel lateral (se existir) não é afetado por esta mudança

**Não alterar:** o CSS, os dados da árvore, o painel de descrição lateral.

---

## Tarefa B — Simulador: unidades de medida + painel de log cumulativo

**Arquivo:** `js/eai-sim.js` · `engenharia-agentes-ia.html` (seção `#simulador`)

### B1 — Unidades de medida e tooltip por indicador

Cada uma das 6 métricas precisa de:
1. Um rótulo de unidade visível ao lado do valor
2. Um ícone `ⓘ` clicável que revela a definição e a escala da métrica

**Unidades e definições por métrica:**

| Métrica | Unidade exibida | Escala | Definição para o tooltip |
|---------|----------------|--------|--------------------------|
| Custo | pts | 0–100 | Custo relativo de operação: tokens consumidos, reprocessamentos e chamadas desnecessárias ao modelo. Mínimo 30 — todo sistema tem overhead de infraestrutura. |
| Confiança | pts | 0–100 | Probabilidade estimada de a saída estar correta e validada. Cresce com contratos, testes e revisão humana. |
| Velocidade | pts | 0–100 | Throughput relativo do sistema. Cache e menor supervisão aumentam; revisão humana e evals reduzem. |
| Risco | pts | 0–100 | Superfície de falha: chance de erro silencioso, alucinação propagada ou comportamento inesperado. Mínimo 40 — risco zero não existe em produção. |
| Auditabilidade | pts | 0–100 | Capacidade de rastrear por que o sistema tomou cada decisão. Depende de observabilidade, evals e logs. |
| Previsibilidade | pts | 0–100 | Estabilidade do comportamento ao longo do tempo. Alta autonomia sem contratos reduz previsibilidade. |

**Implementação no HTML** (para cada métrica, exemplo com Custo):
```html
<div class="eai-meter" data-metric="custo" data-dir="bad">
  <span class="eai-meter__label" id="m-custo">
    Custo
    <button class="eai-meter__info" aria-label="O que é Custo?" data-metric-info="custo">ⓘ</button>
  </span>
  <span class="eai-meter__bar" role="progressbar" ...><span data-sim-fill></span></span>
  <span class="eai-meter__val" data-sim-val>0</span>
  <span class="eai-meter__unit">pts</span>
</div>

<!-- tooltip (hidden por padrão, aparece ao clicar no ⓘ) -->
<div class="eai-meter__tooltip" data-metric-tooltip="custo" hidden>
  <strong>Custo — escala 0 a 100 pts</strong>
  <p>Custo relativo de operação: tokens consumidos, reprocessamentos e chamadas desnecessárias ao modelo. Mínimo 30 — todo sistema tem overhead de infraestrutura.</p>
</div>
```

**CSS mínimo para o tooltip** (adicione ao CSS existente):
```css
.eai-meter__unit {
  font-size: 0.75rem;
  opacity: 0.6;
  margin-left: 0.25rem;
}
.eai-meter__info {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  opacity: 0.5;
  padding: 0 0.2rem;
  vertical-align: middle;
}
.eai-meter__info:hover { opacity: 1; }
.eai-meter__tooltip {
  font-size: 0.82rem;
  background: var(--color-eai-surface, #1e1e2e);
  border: 1px solid var(--color-eai-border);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.5rem;
  grid-column: 1 / -1;
}
```

**JS para toggle do tooltip** (adicionar em `eai-sim.js`):
```js
document.querySelectorAll('[data-metric-info]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.metricInfo
    const tip = document.querySelector(`[data-metric-tooltip="${key}"]`)
    if (tip) tip.hidden = !tip.hidden
  })
})
```

**Também adicionar** um bloco fixo de explicação dos valores mínimos, visível sempre, antes das barras:
```html
<p class="eai-sim__baseline-note">
  <strong>Valores de base:</strong> Custo parte de 30 e Risco parte de 40 — 
  refletem o overhead mínimo de qualquer sistema em produção (infraestrutura, latência, falhas de rede). 
  Zero nunca é possível no mundo real.
</p>
```

---

### B2 — Painel de log cumulativo (concatenar, não limpar)

Substitua o comportamento atual do painel de explicação por um **log cumulativo**:
- Cada vez que o usuário marca um guardrail ou move o slider: adiciona uma linha ao log
- Cada vez que desmarca: remove a linha correspondente
- O log nunca é limpo ao adicionar uma nova ação — apenas ao desmarcar

**Estrutura HTML** (adicionar após `.eai-sim__meters`, dentro da seção simulador):
```html
<div class="eai-sim__log" data-sim-log aria-live="polite" aria-label="Log de decisões arquiteturais">
  <p class="eai-sim__log-title">O que está acontecendo nesta arquitetura</p>
  <ul class="eai-sim__log-list" data-sim-log-list>
    <!-- itens adicionados/removidos por JS -->
  </ul>
  <p class="eai-sim__log-empty" data-sim-log-empty>
    Ajuste a autonomia ou marque guardrails para ver o impacto de cada decisão.
  </p>
</div>
```

**Dados de explicação por guardrail** (adicionar em `eai-sim.js` como constante):
```js
const GUARDRAIL_LOG = {
  schema: {
    id: "log-schema",
    text: "✓ Contratos/Schemas ativos: saídas do modelo validadas estruturalmente. Campos inválidos são barrados antes de propagar. Custo −5, Risco −15, Confiança +20."
  },
  cache: {
    id: "log-cache",
    text: "✓ Cache/Corpus ativo: entidades já processadas não são reprocessadas. Custo cai com o volume — a maior alavanca de economia. Custo −20, Velocidade +15."
  },
  ledger: {
    id: "log-ledger",
    text: "✓ Ledger (FinOps) ativo: orçamento de tokens é estado de domínio. O sistema para limpo ao atingir o teto — sem fatura surpresa. Custo −10, Risco −5."
  },
  revisao: {
    id: "log-revisao",
    text: "✓ Revisão humana no loop: casos de baixa confiança são escalados. Trade-off explícito: mais confiança, menor throughput. Confiança +15, Risco −10, Velocidade −10."
  },
  bdd: {
    id: "log-bdd",
    text: "✓ BDD ativo: critério objetivo de 'pronto'. Falhas são detectadas antes de chegar ao usuário. Confiança +10, Auditabilidade +20, Risco −10."
  },
  evals: {
    id: "log-evals",
    text: "✓ Evals ativos: detectam drift e alucinações bem formatadas que os contratos não veem (erro de modelo vs. erro de sistema). Auditabilidade +15, Confiança +5."
  },
  observabilidade: {
    id: "log-observabilidade",
    text: "✓ Observabilidade ativa: cada decisão tem rastro. Em produção, você saberá por que o sistema escolheu X, não apenas que escolheu. Auditabilidade +20."
  }
}
```

**Lógica JS do log cumulativo:**
```js
function updateLog(guardrailKey, isChecked) {
  const logList = document.querySelector('[data-sim-log-list]')
  const logEmpty = document.querySelector('[data-sim-log-empty]')
  const entry = GUARDRAIL_LOG[guardrailKey]
  if (!entry) return

  if (isChecked) {
    // Adiciona item ao log
    const li = document.createElement('li')
    li.id = entry.id
    li.textContent = entry.text
    logList.appendChild(li)
  } else {
    // Remove item do log
    const existing = document.getElementById(entry.id)
    if (existing) existing.remove()
  }

  // Mostra/oculta mensagem de vazio
  logEmpty.hidden = logList.children.length > 0
}

// Para o slider de autonomia, adicionar/atualizar uma linha fixa no log:
function updateAutonomyLog(value) {
  const logList = document.querySelector('[data-sim-log-list]')
  let autoLine = document.getElementById('log-autonomia')
  
  if (!autoLine) {
    autoLine = document.createElement('li')
    autoLine.id = 'log-autonomia'
    logList.prepend(autoLine) // sempre no topo
  }
  
  if (value === 0) {
    autoLine.textContent = `→ Autonomia 0%: agente totalmente supervisionado. Nenhuma decisão sem validação humana.`
  } else if (value <= 30) {
    autoLine.textContent = `→ Autonomia ${value}%: baixa — agente executa tarefas estruturadas, humano valida exceções.`
  } else if (value <= 60) {
    autoLine.textContent = `→ Autonomia ${value}%: média — agente toma decisões rotineiras; casos-limite escalam. Risco cresce.`
  } else if (value <= 80) {
    autoLine.textContent = `→ Autonomia ${value}%: alta — agente aprova a maioria dos casos sozinho. Custo e risco sobem significativamente.`
  } else {
    autoLine.textContent = `→ Autonomia ${value}%: máxima — sem supervisão. Eficiente, mas qualquer erro se propaga sem freio.`
  }
}
```

**Conectar ao evento existente do checkbox e do slider** — onde hoje `eai-sim.js` recalcula as métricas, adicione a chamada `updateLog(key, checked)` e `updateAutonomyLog(value)`.

**CSS do log:**
```css
.eai-sim__log {
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid var(--color-eai-border);
  border-radius: 8px;
  background: var(--color-eai-surface-2, rgba(255,255,255,0.03));
}
.eai-sim__log-title {
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.7;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.eai-sim__log-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.eai-sim__log-list li {
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  background: var(--color-eai-surface, rgba(255,255,255,0.05));
  border-radius: 5px;
  border-left: 3px solid var(--color-eai-ok, #4ade80);
  line-height: 1.5;
}
.eai-sim__log-empty {
  font-size: 0.875rem;
  opacity: 0.45;
  font-style: italic;
}
```

---

## Tarefa C — Desenviesamento do SocialSelling: tornar a teoria abrangente

**Arquivos:** `engenharia-agentes-ia.html` · `js/eai-quiz.js` · `js/eai-flow.js`

Esta é a mudança de maior impacto conceitual. O objetivo é manter o SocialSelling como *um* caso concreto na seção de Referência — mas usar outros domínios nos exemplos didáticos, para que o conteúdo seja reconhecível por qualquer desenvolvedor, independente de conhecer B2B/leads.

### C1 — Exemplos de domínio variado por seção

**Regra:** cada seção da página deve ter pelo menos um exemplo de domínio diferente do SocialSelling. Use a tabela abaixo para orientar as substituições — não troque todos os exemplos, apenas os que hoje usam lead/B2B de forma que o leitor sem contexto não consegue se identificar.

| Seção | Exemplo atual (problemático) | Substituir por |
|-------|------------------------------|----------------|
| Cap. 01 — Trilha | implícito: agentes de vendas | Agente de atendimento ao cliente que responde tickets de suporte |
| Cap. 04 — Determinístico-primeiro | implícito | Sistema de e-commerce: calcular frete com regras antes de pedir ao LLM qualquer coisa |
| Cap. 06 — Open-World | implícito: cliente sem histórico | Sistema de saúde: paciente sem histórico de exames → ausência ≠ "sem risco" |
| Cap. 07 — FinOps | implícito | Pipeline de moderação de conteúdo: processar 100k posts/dia com teto de custo |
| Código `pipeline.py` | `lead`, `collect_evidence(lead)` | Renomear variáveis para `item`, `collect_signals(item)` — genérico |
| Quiz Q1 | implícito: scoring de leads | Sistema de triagem médica ou análise de contratos jurídicos |
| Quiz Q2 | "cliente B2B" | "paciente" ou "usuário" — qualquer domínio com dados ausentes |

### C2 — Alterações específicas no HTML

**No código `pipeline.py`** (seção `#codigo`), substitua:
```python
# ANTES
def run_pipeline(lead, llm, now):
    ev = collect_evidence(lead)
    if ev.missing:
        return Inference(intent="desconhecido", confidence=0.0)
    raw = llm.extract(ev.snippet)
    return Inference.model_validate(raw)

# DEPOIS
def run_pipeline(item, llm):
    """
    Funciona para qualquer domínio: leads B2B, tickets de suporte,
    pedidos de e-commerce, laudos médicos — a estrutura é a mesma.
    """
    signals = collect_signals(item)            # M1: deterministico (APIs, banco, sem IA)
    if signals.missing:                        # Open-World: ausencia = incerteza
        return Inference(intent="desconhecido", confidence=0.0)
    raw = llm.extract(signals.snippet)         # M2: LLM so no residuo interpretativo
    return Inference.model_validate(raw)       # valida a saida (input nao confiavel)
```

**Na legenda do Pipeline & resiliência**, substitua:
```
# ANTES (implícito no diagrama)
M1 · Busca   M2 · Extr.   M3 · Score   M4 · Rank   M5 · XAI

# DEPOIS — adicionar linha de contexto antes do diagrama:
```html
<p class="eai-flow__context">
  Este padrão de 5 etapas se repete em domínios diferentes: 
  priorização de leads B2B, triagem de tickets de suporte, moderação de conteúdo, 
  análise de contratos. A estrutura é a mesma; o domínio muda.
</p>
```

**Na seção Estudo de caso** (seção `#referencia`), adicione após o parágrafo atual:
```html
<p class="eai-case__domain-note">
  O SocialSelling é o caso que originou este conteúdo, mas os mesmos princípios se aplicam 
  a qualquer sistema que usa LLMs: um agente de suporte técnico, um moderador de conteúdo, 
  um analisador de contratos jurídicos ou um sistema de triagem clínica. O que muda é o 
  domínio — a arquitetura permanece.
</p>
```

### C3 — Reescrever o Quiz com cenários multi-domínio

Substitua as 4 perguntas atuais pelas seguintes (editar diretamente no HTML ou no fixture do quiz):

**Q1 — Sobre P1/P2 (LLM como componente):**
```html
<p class="eai-quiz__prompt">
  Você está construindo um sistema de análise de contratos jurídicos. 
  O sistema precisa: receber o PDF, extrair cláusulas, classificar o risco e gerar um relatório. 
  Qual arquitetura é correta?
</p>
<button data-correct="false">Um agente recebe o PDF e decide sozinho quais etapas executar e em qual ordem</button>
<button data-correct="true">Um pipeline fixo chama o LLM apenas na etapa de classificação de risco; extração e formatação são código determinístico</button>
<button data-correct="false">O LLM controla o fluxo inteiro e delega sub-tarefas para outros modelos especializados</button>
```
Feedback correto: `"Exato — P1 e P2. O LLM é um componente dentro de etapas fixas, nunca o orquestrador. A ordem das etapas é código, não decisão do modelo. Isso garante reproducibilidade e torna cada etapa testável isoladamente."`
Feedback errado (opção A): `"Com o agente controlando o fluxo, qualquer variação no modelo gera uma sequência diferente de etapas — o sistema se torna irreprodutível e impossível de testar. O fluxo de controle deve ser determinístico."`

**Q2 — Sobre P7 (Open-World):**
```html
<p class="eai-quiz__prompt">
  Um sistema de triagem clínica avalia pacientes. Para um paciente recém-cadastrado, 
  não há exames dos últimos 12 meses no sistema — o dado simplesmente não existe.
  O que o sistema bem projetado faz?
</p>
<button data-correct="false">Assume que o paciente não tem risco (ausência de dados = sem risco)</button>
<button data-correct="true">Registra explicitamente que este sinal está ausente e sinaliza a incerteza ao médico</button>
<button data-correct="false">Calcula um valor médio baseado em outros pacientes para preencher o campo</button>
```
Feedback correto: `"Isso é P7 — Open-World. Ausência de evidência é incerteza explícita, nunca negação. Em saúde (e em qualquer domínio crítico), um sistema que inventa dados onde não há evidência é mais perigoso do que um que diz 'não sei'."`
Feedback errado (opção A): `"Tratar ausência como 'sem risco' é o erro do Mundo Fechado: o sistema assumiu uma conclusão onde não há evidência. Em domínios críticos como saúde, este erro pode ter consequências graves."`
Feedback errado (opção C): `"Gerar um valor médio sem evidência é alucinação estruturada: o dado parece real mas foi fabricado. O correto é tornar a ausência visível — não escondê-la com um número inventado."`

**Q3 — Sobre P10 (XAI):**
```html
<p class="eai-quiz__prompt">
  Um sistema de moderação de conteúdo atribuiu score 0.847 a uma postagem. 
  O revisor humano pergunta: "por que este post foi sinalizado?" 
  Qual resposta gera mais confiança?
</p>
<button data-correct="false">"O algoritmo atribuiu score 0.847, acima do threshold de 0.7"</button>
<button data-correct="true">"Sinalizado porque contém linguagem associada a desinformação sobre saúde e o perfil do autor tem histórico de posts removidos. Não foi possível confirmar a intenção — pode ser ironia."</button>
```
Feedback correto: `"P10 — XAI. O número 0.847 não ajuda o revisor a decidir. A explicação em linguagem natural — com os drivers positivos, as lacunas e a proveniência — é o que constrói confiança e permite revisão informada."`
Feedback errado (opção A): `"O número sozinho não informa nada acionável. O revisor ainda precisa decidir o que fazer — e agora sem entender o porquê. Isso é o que P10 chama de 'expor o número' em vez de 'explicar'."`

**Q4 — Sobre P8/P9 (FinOps + fail-closed):**
```html
<p class="eai-quiz__prompt">
  Um agente de moderação está processando 200.000 posts. Às 15h, ele atinge o limite 
  diário de tokens definido no ledger. Ainda faltam 60.000 posts.
  O que o sistema deve fazer?
</p>
<button data-correct="false">Continuar processando — o trabalho está quase concluído e parar no meio é pior</button>
<button data-correct="false">Parar imediatamente sem registrar estado, para evitar inconsistência</button>
<button data-correct="true">Parar num ponto seguro, salvar o progresso e retomar amanhã a partir do post 140.001</button>
```
Feedback correto: `"P8 + P9 — FinOps e fail-closed. O ledger sabe exatamente onde parou. Retomar do ponto correto é o que diferencia um sistema que falha graciosamente de um que entra em loop gerando fatura inesperada. 'Falhar e parar' é uma feature, não uma limitação."`
Feedback errado (opção A): `"Continuar além do teto é exatamente o comportamento que o ledger previne. Um agente sem limite de custo é um risco financeiro — a fatura pode crescer indefinidamente em caso de loop."`
Feedback errado (opção B): `"Parar sem salvar estado significa perder todo o progresso — e reprocessar do início amanhã paga duas vezes pelo mesmo trabalho. O ledger existe justamente para garantir que o ponto de parada seja recuperável."`

### C4 — Adicionar linha no rodapé sobre escopo do conteúdo

No `<footer>`, substitua:
```html
<!-- ANTES -->
<p class="eai-footer__meta">
  Conteúdo derivado do projeto SocialSelling · Maurício Yokoyama Issei
</p>

<!-- DEPOIS -->
<p class="eai-footer__meta">
  Princípios ilustrados pelo projeto SocialSelling · Maurício Yokoyama Issei
</p>
```

---

## Checklist de validação (antes de considerar concluído)

Após implementar as três tarefas, valide:

**Tarefa A:**
- [ ] A árvore aparece expandida ao carregar a página (sem clicar em nada)
- [ ] Clicar numa pasta recolhe; clicar de novo expande
- [ ] O painel lateral de descrição continua funcionando

**Tarefa B:**
- [ ] Cada métrica tem "pts" visível ao lado do valor
- [ ] Clicar em ⓘ de qualquer métrica exibe a definição e escala
- [ ] Com autonomia=0 e tudo desmarcado, o painel de log mostra a linha de autonomia
- [ ] Marcar Cache adiciona a linha de cache ao log; desmarcar remove
- [ ] Marcar Cache e depois BDD: o log mostra as duas linhas simultaneamente
- [ ] A nota "Valores de base: Custo parte de 30..." está visível na interface

**Tarefa C:**
- [ ] O código `pipeline.py` não usa mais `lead` como variável principal
- [ ] O quiz Q1 menciona análise de contratos (não leads B2B)
- [ ] O quiz Q2 menciona paciente/sistema de saúde
- [ ] O quiz Q3 menciona moderação de conteúdo
- [ ] O quiz Q4 menciona posts e moderação
- [ ] Todos os feedbacks de resposta errada são específicos para aquela opção
- [ ] A seção Estudo de caso ainda menciona SocialSelling (não remover — apenas contextualizar)
- [ ] O rodapé diz "ilustrados" em vez de "derivado"

---

## O que NÃO alterar

- O HTML das seções Hero, Princípios P1-P10, Fluxo de dados, e Glossário
- O CSS geral — apenas adicione as classes novas especificadas neste documento
- A lógica de cálculo das métricas do simulador — apenas adicione o log e os tooltips
- A estrutura de dados da árvore — apenas mude o estado inicial para `expanded: true`
- O texto do Estudo de caso SocialSelling na seção Referência — apenas adicione a nota de contexto após ele