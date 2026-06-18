# Especificação de Melhorias — engenharia-agentes-ia.html
**Para:** Claude Code  
**Projeto:** Site "Engenharia de Agentes de IA" — Maurício Yokoyama Issei  
**Arquivos de entrada:** `engenharia-agentes-ia.html` · `engenharia-agentes-ia.css` · `js/eai-*.js`  
**Referências de conteúdo:** `guia-engenharia-agentes-ia.md` · `guia-agent-driven-development.md`

---

## 0. Princípios de trabalho para este projeto

> Antes de qualquer implementação, leia esta seção inteira. Ela governa como você deve trabalhar.

**Determinístico-primeiro:** resolva com HTML/CSS/JS puro o que não exige IA. Reserve chamadas externas para o que for insubstituível.

**Cada tarefa segue o ciclo:**
1. Leia a especificação da tarefa
2. **Reflita** sobre o que pode ser melhorado além do que foi pedido (o pedido é o mínimo, não o teto)
3. Implemente
4. **Avalie** o que foi aprendido — registre em `PROGRESS.md` antes de avançar

**Fail-closed:** se uma tarefa ficar ambígua durante a implementação, pare num ponto seguro, registre o bloqueio em `PROGRESS.md` e não avance com suposições.

**Otimize o contexto:** leia os dois guias de referência inteiros no início. Não releia trechos aleatórios no meio da execução — consolide o entendimento antes de codar.

**Não estoure limites:** cada tarefa é pequena e independente. Implemente uma por vez. Teste antes de avançar.

---

## 1. Estrutura de arquivos a criar

```
projeto/
├── PROGRESS.md                  ← estado de execução (crie no início, atualize após cada tarefa)
├── tests/
│   ├── eai.test.js              ← testes de comportamento (Vitest ou equivalente)
│   └── fixtures/
│       ├── quiz-questions.json  ← dados do quiz com contexto expandido
│       └── sim-model.json       ← modelo do simulador com fórmulas documentadas
├── engenharia-agentes-ia.html   ← arquivo principal (editar in-place)
├── engenharia-agentes-ia.css    ← CSS (editar in-place)
└── js/
    ├── eai-quiz.js              ← reescrever
    ├── eai-sim.js               ← reescrever
    ├── eai-playground.js        ← reescrever
    ├── eai-flow.js              ← melhorar
    └── eai-anatomy.js           ← criar (novo: árvore de repositório interativa)
```

---

## 2. PROGRESS.md — crie este arquivo primeiro

```markdown
# PROGRESS — Melhorias EAI

## Estado atual
- [ ] T1 — Trilha: conteúdo dos capítulos expandido
- [ ] T2 — Quiz: perguntas contextualizadas
- [ ] T3 — Simulador: fórmulas transparentes + painel de explicação
- [ ] T4 — Pipeline & resiliência: contexto e glossário
- [ ] T5 — Playground: feedback por componente
- [ ] T6 — Anatomia do repositório: árvore visual interativa
- [ ] T7 — Testes

## Aprendizados acumulados
(preencher após cada tarefa concluída)

## Bloqueios
(preencher se algo ficar ambíguo)
```

---

## 3. Tarefas

### T1 — Trilha guiada: expandir conteúdo dos capítulos

**Arquivo:** `engenharia-agentes-ia.html` (seção `#jornada`)

**Problema:** cada `<details class="eai-chap">` tem apenas 2-3 linhas. O usuário abre o capítulo e não aprende nada — apenas lê uma promessa do que vai aprender.

**O que fazer:** expandir o `<div class="eai-chap__body">` de cada um dos 10 capítulos com conteúdo real, usando a estrutura abaixo como template:

```
[ANALOGIA DE ABERTURA — 1 parágrafo em linguagem cotidiana]
[O PROBLEMA — o que falha sem este princípio, com exemplo concreto]
[A SOLUÇÃO — o que muda com este princípio, em 2-3 parágrafos]
[IMPACTO PRÁTICO — uma frase curta: "Na prática, isso significa que..."]
[LINK para o princípio correspondente — já existe no HTML]
```

**Diretrizes de linguagem:**
- Escreva para um desenvolvedor que conhece software mas não conhece IA. Evite jargão sem definir antes.
- Use as analogias dos guias de referência quando disponíveis (banco de dados, cozinha/salão, pagination).
- Limite cada capítulo a ~300 palavras. O acordeon não é um artigo — é um aperitivo denso.
- Nunca repita literalmente o texto dos princípios P1-P10 já visíveis na página. Expanda, não duplique.

**Conteúdo por capítulo** (use os guias de referência como fonte primária):

| Cap | Título | Analogia sugerida | Seção do guia |
|-----|--------|-------------------|---------------|
| 01 | Da magia à engenharia | Banco de dados dentro de transações, não "decidindo livremente" | Guia EAI §1 |
| 02 | Orquestração determinística | DAG de etapas fixas vs. conversa aberta entre modelos | Guia EAI §2 |
| 03 | Cérebro × Vitrine | Cozinha vs. salão de restaurante | Guia EAI §2 |
| 04 | Determinístico-primeiro | Resolver o máximo com dados estruturados antes de ligar o motor | Guia EAI §3 |
| 05 | Contratos rígidos | Sanitização de input + Pydantic como porteiro | Guia EAI §3 |
| 06 | Open-World | Sistema de clientes novos sem histórico | Guia EAI §3 |
| 07 | FinOps de IA | Pagination + job queue do mundo clássico, aplicado a tokens | Guia EAI §4 |
| 08 | BDD para IA | Testar o comportamento do sistema, não a "inteligência" do modelo | Guia EAI §5 |
| 09 | XAI | `0,674` vs. "priorizado porque sinalizou expansão recente" | Guia EAI §6 |
| 10 | Projeto completo | Os 10 princípios no SocialSelling: M1→M5 | Síntese dos dois guias |

**Reflita antes de implementar:** existe algum capítulo onde um mini-snippet de código (2-4 linhas) seria mais claro do que um parágrafo? Se sim, adicione — a seção de código já tem o padrão visual `eai-cw`.

**Teste de aceitação:**
- Abrir qualquer capítulo e entender o conceito sem ler nenhuma outra seção da página
- Nenhum capítulo com menos de 150 palavras no body
- Nenhum capítulo com mais de 350 palavras no body

---

### T2 — Quiz: perguntas com contexto + feedback que ensina

**Arquivo:** `js/eai-quiz.js` + `engenharia-agentes-ia.html` (bloco `.eai-quiz`)

**Problema:** perguntas curtas e descontextualizadas. Respostas erradas não ensinam. Respostas certas confirmam sem explicar.

**O que fazer:**

**2a. Reescrever as 4 perguntas** como mini-cenários situacionais. O formato é:

```
[CONTEXTO — 2-3 frases descrevendo uma situação real]
[PERGUNTA — o que fazer nesta situação?]
[3 opções — sendo uma claramente correta para quem entendeu o conceito]
```

**Novas perguntas (implemente exatamente estas):**

**Q1 — Sobre P1/P2 (LLM como componente):**
> *Você está construindo um sistema de análise de contratos. A cada documento recebido, o sistema precisa: extrair cláusulas, classificar o risco, formatar o relatório e enviar por e-mail. Você tem duas opções de arquitetura.*
> 
> Qual é a abordagem correta?
> - (A) Um agente recebe o contrato e decide sozinho quais ferramentas usar em qual ordem
> - (B) ✓ Um pipeline fixo chama o LLM apenas na etapa de classificação de risco; as demais são código determinístico
> - (C) O LLM controla o fluxo e delega sub-tarefas para outros modelos

**Q2 — Sobre P7 (Open-World):**
> *Seu sistema avalia o perfil de um cliente B2B. Para este cliente específico, não há registro de faturamento nos últimos 12 meses — o dado simplesmente não existe no banco.*
>
> O que um sistema bem projetado deve fazer?
> - (A) Assumir que o cliente não tem potencial (tratar ausência como "falso")
> - (B) ✓ Registrar explicitamente que este sinal está ausente e comunicar a incerteza ao usuário
> - (C) Gerar um valor médio baseado em outros clientes para preencher o campo

**Q3 — Sobre P10 (XAI):**
> *O sistema de recomendação retornou score `0.847` para um lead. O gestor comercial pergunta: "por que esse lead foi priorizado?" Você tem duas formas de responder.*
>
> Qual resposta gera mais confiança e adoção?
> - (A) "O algoritmo atribuiu score 0.847, acima do threshold de 0.7"
> - (B) ✓ "Priorizado porque a empresa sinalizou expansão recente e tem histórico de compra no setor. Não foi possível confirmar o orçamento disponível."

**Q4 — Sobre P8/P9 (FinOps + fail-closed):**
> *Um agente autônomo está processando 50.000 leads. Às 14h, ele atinge o limite diário de tokens definido no ledger. Ainda faltam 18.000 leads.*
>
> O que o sistema deve fazer?
> - (A) Continuar processando os leads restantes, já que o trabalho está quase concluído
> - (B) Parar imediatamente sem registrar o estado, para evitar processamento inconsistente
> - (C) ✓ Parar num ponto seguro, salvar o progresso e retomar na próxima execução a partir de onde parou

**2b. Expandir o feedback pós-resposta** em `eai-quiz.js`:

- **Resposta correta:** mostrar uma frase de reforço + o princípio correspondente em destaque
- **Resposta errada:** mostrar o que está errado na opção escolhida + o raciocínio correto em 2-3 frases
- Feedback nunca deve ser apenas "Correto!" ou "Errado!" — deve ensinar

**Exemplo de estrutura de feedback:**
```js
// fixture: quiz-questions.json
{
  "id": "q2",
  "feedback": {
    "correct": "Exato. Isso é o princípio Open-World (P7): ausência de evidência é incerteza explícita, nunca negação automática. Um sistema honesto sabe dizer 'não sei' — e isso é mais valioso do que uma resposta inventada.",
    "wrong_a": "Tratar ausência de dado como 'falso' é o erro clássico do Mundo Fechado. O sistema inventou uma conclusão onde não há evidência — exatamente o que a engenharia agêntica previne.",
    "wrong_c": "Gerar um valor médio sem evidência é uma forma de alucinação estruturada: o dado parece real mas foi fabricado. O correto é tornar a ausência visível, não escondê-la."
  }
}
```

**Reflita antes de implementar:** o feedback deveria linkar para o capítulo correspondente na trilha? Para o princípio correspondente nos cards P1-P10? Implemente o que fizer mais sentido pedagogicamente.

**Teste de aceitação:**
- Toda resposta errada mostra um feedback específico para aquela opção (não genérico)
- Toda resposta certa mostra o princípio correspondente nomeado
- O score final mostra uma mensagem diferente para 0/4, 1-2/4, 3/4 e 4/4 acertos

---

### T3 — Simulador: fórmulas transparentes + painel de explicação

**Arquivos:** `js/eai-sim.js` + `engenharia-agentes-ia.html` (seção `#simulador`)

**Problema:** os valores das métricas mudam mas o usuário não sabe por quê. Com autonomia=0 e tudo desmarcado, custo=30 e risco=40 — sem explicação, parece arbitrário. O simulador viola o próprio P10 que o site ensina (XAI: explique, não exponha o número).

**O que fazer:**

**3a. Documentar e tornar transparente o modelo de cálculo**

Crie `tests/fixtures/sim-model.json` com a especificação das fórmulas:

```json
{
  "baselines": {
    "custo": { "min": 30, "razao": "Custo base de qualquer sistema: infraestrutura, latência de rede, overhead operacional. Zero nunca é possível em produção." },
    "risco": { "min": 40, "razao": "Risco base: todo sistema tem falha de rede, erro de runtime e comportamento inesperado. Zero risco não existe." },
    "velocidade": { "base": 50 },
    "confianca": { "base": 20 },
    "auditabilidade": { "base": 10 },
    "previsibilidade": { "base": 30 }
  },
  "autonomia": {
    "efeito": "Cada 10% de autonomia adicional: +5 custo, +8 risco, +3 velocidade, -4 confiança",
    "razao": "Mais autonomia = mais chamadas de modelo não supervisionadas = mais custo e mais superfície para erros se propagarem."
  },
  "guardrails": {
    "Schema": { "custo": -5, "risco": -15, "confianca": +20, "razao": "Contratos rígidos barram saídas inválidas antes de propagarem. Reduz retrabalho (custo) e elimina uma classe inteira de erros (risco)." },
    "Cache": { "custo": -20, "velocidade": +15, "razao": "Nunca pague duas vezes pelo mesmo processamento. Cache semântico é a maior alavanca de redução de custo." },
    "Ledger": { "custo": -10, "risco": -5, "razao": "Teto de gasto como estado de domínio. Elimina fatura-surpresa e força o sistema a parar num ponto seguro." },
    "Revisão humana": { "confianca": +15, "risco": -10, "velocidade": -10, "razao": "Supervisão humana aumenta confiança mas reduz throughput. Trade-off explícito." },
    "BDD": { "confianca": +10, "auditabilidade": +20, "risco": -10, "razao": "Cenários de teste fixos tornam o comportamento verificável e auditável. A defesa número 1 contra alucinações." },
    "Evals": { "auditabilidade": +15, "confianca": +5, "razao": "Evals semânticos detectam drift e alucinações bem formatadas que os contratos não veem." },
    "Observabilidade": { "auditabilidade": +20, "razao": "Sem observabilidade, o sistema é uma caixa-preta. Com ela, cada decisão é rastreável." }
  }
}
```

**3b. Adicionar painel de explicação dinâmico**

Abaixo das barras de métricas, adicione um `<div class="eai-sim__explain" data-sim-explain>` que atualiza a cada mudança de controle.

O painel mostra:
1. **O que mudou:** "Você ativou Cache (+). Impacto: custo −20, velocidade +15."
2. **Por que:** a razão do modelo (do `sim-model.json`)
3. **Valores mínimos:** na primeira interação, explique que custo≥30 e risco≥40 são pisos do sistema

Estrutura HTML a adicionar (após `.eai-sim__meters`):
```html
<div class="eai-sim__explain" data-sim-explain aria-live="polite">
  <p class="eai-sim__explain-title">O que está acontecendo</p>
  <div class="eai-sim__explain-body" data-sim-explain-body>
    <!-- preenchido por JS -->
  </div>
</div>
```

**3c. Tooltip nos labels de métrica**

Cada label de métrica (Custo, Risco, etc.) deve ter um `ⓘ` clicável que abre uma explicação de 1-2 frases do que a métrica representa. Exemplo: "Risco: probabilidade de o sistema produzir uma saída inválida ou propagar um erro silencioso."

**Reflita antes de implementar:** o painel de explicação deveria mostrar o histórico das últimas 3 mudanças, ou apenas a última? Qual abordagem ensina melhor?

**Teste de aceitação:**
- Com autonomia=0 e tudo desmarcado, o painel exibe a razão dos valores mínimos
- Ao marcar "Cache", o painel mostra o impacto e a razão antes mesmo de o usuário ler as barras
- Nenhuma métrica muda sem o painel explicar o porquê

---

### T4 — Pipeline & resiliência: contexto e glossário inline

**Arquivo:** `engenharia-agentes-ia.html` (bloco `.eai-flow`) + `js/eai-flow.js`

**Problema:** o usuário não sabe o que são "Saga", "DLQ" e "Confiança" antes de clicar nas abas. O objetivo da seção também não está claro.

**O que fazer:**

**4a. Adicionar introdução contextual** antes dos tabs:

```html
<div class="eai-flow__intro">
  <p>Em produção, as coisas falham. Veja como o mesmo pipeline determinístico se comporta
     em três condições diferentes — e por que o design importa mais do que a ausência de erros.</p>
</div>
```

**4b. Adicionar glossário inline** (tooltip ou bloco expandido) para os três termos antes dos tabs:

| Termo | Definição |
|-------|-----------|
| Feliz | Caminho sem falhas: todos os módulos M1→M5 executam na sequência esperada. |
| Saga | Uma etapa falha e o sistema **compensa**: desfaz operações anteriores de forma controlada antes de reportar o erro. É o padrão de resiliência para sistemas distribuídos. |
| DLQ (Dead Letter Queue) | Quando uma etapa falha repetidamente, a mensagem vai para uma fila especial de "mensagens mortas" — aguardando revisão humana ou reprocessamento futuro, sem bloquear o pipeline. |
| Confiança | O sistema avalia a qualidade da própria saída. Se o score de confiança estiver acima do threshold, aprova automaticamente. Abaixo, aciona revisão humana. |

**4c. Adicionar `data-flow-desc` dinâmico** por cenário (já existe o elemento, completar o JS):

```js
const flowDescs = {
  feliz: "Caminho ideal: dados chegam completos, cada módulo executa sem erro, a saída passa na validação. Este é o baseline que o design deve garantir.",
  saga: "M4 (Ranking) falhou. O sistema aciona a compensação: desfaz o score calculado em M3, registra o motivo e retorna ao estado anterior de forma limpa. Nenhum dado corrompido.",
  dlq: "M3 falhou três vezes consecutivas. Em vez de bloquear o pipeline ou silenciar o erro, a mensagem vai para a DLQ — onde pode ser inspecionada, corrigida e reprocessada.",
  confianca: "M5 calculou confiança de 94% — abaixo do threshold de 98%. Em vez de aprovar automaticamente, aciona revisão humana. O sistema sabe quando não sabe."
}
```

**Reflita antes de implementar:** faria sentido destacar visualmente a etapa que "falhou" em cada cenário (cor diferente, animação)? Isso tornaria o diagrama mais didático?

**Teste de aceitação:**
- Um usuário que nunca ouviu falar de "Saga" entende o conceito ao clicar na aba, sem sair da página
- O texto `data-flow-desc` muda ao trocar de aba e é específico para cada cenário

---

### T5 — Playground: feedback real por componente

**Arquivo:** `js/eai-playground.js` + `engenharia-agentes-ia.html` (seção `#playground`)

**Problema:** adicionar ou remover RAG, BDD, Observabilidade não gera nenhuma saída informativa. O playground é decorativo.

**O que fazer:**

**5a. Criar mapa de consequências por componente:**

```js
const COMPONENT_INSIGHTS = {
  LLM: {
    add: "LLM adicionado. É o único componente não-determinístico. Sem Schema ao lado dele, a saída é input não confiável.",
    remove: "Sem LLM, o sistema é puramente determinístico — previsível e barato, mas limitado ao que dados estruturados cobrem.",
    requires: ["Schema"],
    warning_if_missing: ["Schema", "BDD"]
  },
  Schema: {
    add: "Contrato ativado. Toda saída do LLM agora passa por validação estrutural. Erros de tipo e campos extras são barrados antes de propagar.",
    remove: "Sem Schema, a saída do LLM é consumida diretamente — um campo com valor 1.7 onde esperava-se 0-1 não será detectado.",
    required_by: ["LLM"]
  },
  RAG: {
    add: "RAG adicionado: o modelo agora consulta uma base de documentos antes de responder. Reduz alucinações factuais — mas sem Schema, ainda pode retornar dados do corpus em formato inválido.",
    remove: "Sem RAG, o modelo responde com conhecimento paramétrico apenas — mais sujeito a alucinação em domínios específicos.",
    synergy: ["Schema", "Cache"]
  },
  BDD: {
    add: "Cenários BDD ativados. Agora há um critério objetivo de 'pronto'. O agente tem um alvo executável — e falha de forma detectável, não silenciosa.",
    remove: "Sem BDD, 'funcionou' é uma percepção, não uma verificação. Alucinações elegantes passam despercebidas."
  },
  Ledger: {
    add: "Ledger ativado. O orçamento de tokens é estado de domínio: o sistema sabe quanto gastou, para quando atinge o teto e retoma na próxima onda.",
    remove: "Sem Ledger, o sistema pode entrar em loop e gerar fatura inesperada. Um agente sem teto de custo é um risco financeiro, não uma funcionalidade."
  },
  Cache: {
    add: "Cache semântico ativo. Entidades já processadas não são reprocessadas. O custo marginal por item cai com o tempo — a economia de escala da engenharia agêntica.",
    remove: "Sem cache, cada execução começa do zero. Em volume, isso significa pagar múltiplas vezes pelo mesmo processamento."
  },
  "Human Review": {
    add: "Revisão humana no loop. Casos de baixa confiança são escalados — reduz risco de decisões automáticas erradas em casos-limite.",
    remove: "Sem revisão humana, o sistema aprova ou rejeita tudo automaticamente. Para domínios críticos, isso é risco operacional."
  },
  Observabilidade: {
    add: "Observabilidade ativa. Cada decisão agora tem rastro — você pode auditar por que o sistema escolheu X, não apenas que ele escolheu.",
    remove: "Sem observabilidade, o sistema é uma caixa-preta em produção. Quando algo errar, você não saberá onde."
  },
  Guardrails: {
    add: "Guardrails ativos. Regras de negócio explícitas barram saídas antes de chegarem ao usuário — camada de defesa complementar ao Schema.",
    remove: "Sem guardrails, regras de negócio ficam implícitas no prompt — frágeis e invisíveis para testes."
  }
}
```

**5b. Mostrar alertas de combinações problemáticas:**

```js
const ARCH_WARNINGS = [
  {
    condition: (comps) => comps.includes("LLM") && !comps.includes("Schema"),
    message: "⚠ LLM sem Schema: a configuração mais comum em protótipos que quebram em produção. A saída do modelo é input não confiável até ser validada."
  },
  {
    condition: (comps) => comps.includes("LLM") && !comps.includes("BDD"),
    message: "⚠ LLM sem BDD: sem critério objetivo de 'pronto', alucinações elegantes passam despercebidas."
  },
  {
    condition: (comps) => comps.length >= 5 && !comps.includes("Observabilidade"),
    message: "ℹ Arquitetura complexa sem observabilidade: quando algo errar em produção, será difícil rastrear onde."
  },
  {
    condition: (comps) => comps.includes("LLM") && comps.includes("Schema") && comps.includes("BDD") && comps.includes("Ledger"),
    message: "✓ Boa base arquitetural: LLM contido, contrato validando saída, testes definindo 'pronto' e orçamento governado."
  }
]
```

**5c. Painel de feedback estruturado** (substituir o `.eai-pg__feedback` atual):

```html
<div class="eai-pg__feedback">
  <div class="eai-pg__last-action" data-pg-last-action aria-live="polite"></div>
  <ul class="eai-pg__warnings" data-pg-warnings role="list"></ul>
  <div class="eai-pg__verdict" data-pg-verdict role="status"></div>
</div>
```

**Reflita antes de implementar:** o playground deveria mostrar uma pontuação arquitetural (ex.: "Arquitetura: 7/10")? Ou isso cria uma ilusão de precisão que contradiz os próprios princípios ensinados? Decida e documente em `PROGRESS.md`.

**Teste de aceitação:**
- Adicionar RAG sem Schema mostra um aviso específico sobre o risco
- Remover BDD mostra o impacto no critério de "pronto"
- A combinação LLM + Schema + BDD + Ledger mostra um feedback positivo

---

### T6 — Anatomia do repositório: árvore visual interativa

**Arquivo:** `js/eai-anatomy.js` (novo) + `engenharia-agentes-ia.html` (seção `.eai-anatomy`)

**Problema:** a estrutura de pastas é uma lista de texto simples. Estrutura de pastas é um conceito espacial — a representação deve ser espacial.

**O que fazer:**

**6a. Criar componente de árvore interativa** com estilo VS Code/GitHub:

```html
<!-- substitui o <ul class="eai-tree"> atual -->
<div class="eai-repo" data-eai-repo aria-label="Árvore de repositório interativa">
  <div class="eai-repo__tree" role="tree" aria-label="Estrutura de pastas do projeto">
    <!-- renderizado por eai-anatomy.js -->
  </div>
  <div class="eai-repo__panel" data-repo-panel aria-live="polite">
    <p class="eai-repo__panel-hint">Clique em um arquivo ou pasta para ver sua função.</p>
  </div>
</div>
```

**6b. Estrutura de dados da árvore** (em `eai-anatomy.js`):

```js
const REPO_TREE = {
  name: "projeto-to-be/",
  type: "root",
  children: [
    {
      name: ".ai/",
      type: "dir",
      icon: "🧠",
      desc: "Estado cognitivo do agente. Tudo aqui entra no Git — assim um rollback restaura código e raciocínio ao mesmo tempo.",
      children: [
        { name: "PROGRESS.md", type: "file", icon: "📋",
          desc: "Onde o trabalho parou, quais tarefas foram concluídas, qual é o próximo passo. O agente lê isso ao iniciar uma sessão — sem ele, recomeça do zero." },
        { name: "skills/", type: "dir", icon: "⚡",
          desc: "Capacidades específicas do agente para este projeto: como rodar o quality gate, como criar um ADR, como escrever um cenário BDD." },
        { name: "settings.json", type: "file", icon: "⚙️",
          desc: "Permissões e limites do agente: quais comandos pode executar, quais diretórios pode modificar, qual é o teto de iterações por sessão." }
      ]
    },
    {
      name: "docs/",
      type: "dir",
      icon: "📚",
      desc: "A biblioteca de contexto. O agente consulta aqui para entender o projeto antes de implementar qualquer coisa.",
      children: [
        { name: "decisions/", type: "dir", icon: "📖",
          desc: "ADRs (Architecture Decision Records): a memória imutável do projeto. Por que usamos esta linguagem? Por que este banco? As respostas estão aqui — e o agente não desfaz decisões deliberadas." },
        { name: "specs/", type: "dir", icon: "📐",
          desc: "SDDs (Software Design Documents): o que o sistema é, o que ele faz e — tão importante — o que está fora de escopo. O agente consulta antes de implementar para não 'inventar' funcionalidades." },
        { name: "governance/", type: "dir", icon: "🏛️",
          desc: "DoR e DoD: as barreiras de qualidade. Uma tarefa só entra em execução quando passa pela DoR. Só sai quando passa pela DoD. O agente não adivinha — encontra a resposta aqui." }
      ]
    },
    {
      name: "tests/",
      type: "dir",
      icon: "🧪",
      desc: "A defesa número 1 contra alucinações. O agente implementa até todos os cenários passarem — e nada entra na base principal sem passar por aqui.",
      children: [
        { name: "features/", type: "dir", icon: "📝",
          desc: "Cenários BDD em Gherkin: Dado / Quando / Então. São a especificação executável — o que o sistema deve fazer, escrito antes do código." },
        { name: "steps/", type: "dir", icon: "🔗",
          desc: "Ligação entre o Gherkin e o código de verificação. Cada frase do cenário mapeia para uma função de teste." },
        { name: "fixtures/", type: "dir", icon: "📦",
          desc: "Respostas de serviços externos gravadas uma vez e reutilizadas. Os testes rodam sem rede, de forma rápida e determinística — zero custo de API." }
      ]
    },
    {
      name: "scripts/",
      type: "dir",
      icon: "⚙️",
      desc: "Os portões automáticos de qualidade. O que importa precisa estar num gate — não depender de alguém lembrar de fazer.",
      children: [
        { name: "quality-gate.sh", type: "file", icon: "🚦",
          desc: "Um comando só: roda linter, verificação de tipos e todos os testes. O agente roda isso antes de qualquer commit. Se falhar, para — não avança com suposições." },
        { name: "bootstrap.sh", type: "file", icon: "🚀",
          desc: "Monta o ambiente do zero num novo computador. O agente usa para verificar que o ambiente está correto antes de executar." }
      ]
    },
    {
      name: ".github/",
      type: "dir",
      icon: "🔄",
      desc: "Automação no servidor: os mesmos testes do quality-gate rodam a cada pull request. Nada entra na base principal sem passar por aqui — nem código do agente, nem código do humano.",
      children: [
        { name: "workflows/", type: "dir", icon: "⚡",
          desc: "CI/CD: os fluxos que rodam a cada mudança. Inclui limite de iterações e orçamento — autonomia sem teto de custo é risco financeiro, não funcionalidade." }
      ]
    }
  ]
}
```

**6c. Comportamento da árvore:**
- Clicar em uma pasta expande/recolhe os filhos (estilo accordeon)
- Clicar em qualquer item (pasta ou arquivo) atualiza o painel lateral com nome, ícone e descrição completa
- O item ativo fica destacado (cor de fundo suave)
- A raiz começa expandida no primeiro nível; subpastas começam recolhidas

**6d. Visual:**
- Usar `│`, `├─`, `└─` em fonte mono para as linhas da árvore (estilo terminal)
- Ou usar CSS com `border-left` para simular as linhas — mais compatível
- Ícones via emoji ou SVG inline (manter consistência com o restante do site)
- Largura: árvore ocupa ~40% do container; painel lateral ocupa ~60%

**Reflita antes de implementar:** em mobile, o layout lado-a-lado não funciona. Como adaptar? O painel poderia aparecer abaixo da árvore com um slide suave.

**Teste de aceitação:**
- Clicar em `PROGRESS.md` mostra sua descrição no painel sem recarregar a página
- Em viewport < 640px, o painel aparece abaixo da árvore (não sobreposto)
- O usuário entende a função de cada arquivo sem ler os guias de referência

---

### T7 — Testes

**Arquivo:** `tests/eai.test.js`

**Framework sugerido:** Vitest (compatível com módulos ES, zero config, mesma sintaxe Jest)

Escreva testes para as seguintes unidades:

```js
// T7.1 — Modelo do simulador
describe("SimModel", () => {
  it("custo base nunca abaixo de 30 com qualquer combinação de guardrails", ...)
  it("risco base nunca abaixo de 40 com qualquer combinação", ...)
  it("ativar Cache reduz custo em exatamente 20 pontos", ...)
  it("ativar Schema reduz risco em exatamente 15 pontos", ...)
  it("autonomia 100% + nenhum guardrail: custo máximo e risco máximo", ...)
  it("autonomia 0% + todos os guardrails: melhores valores possíveis", ...)
})

// T7.2 — Lógica do Playground
describe("PlaygroundWarnings", () => {
  it("LLM sem Schema gera alerta de risco", ...)
  it("LLM com Schema não gera alerta de Schema ausente", ...)
  it("5+ componentes sem Observabilidade gera aviso de rastreabilidade", ...)
  it("LLM + Schema + BDD + Ledger gera feedback positivo", ...)
})

// T7.3 — Quiz
describe("QuizFeedback", () => {
  it("resposta correta retorna feedback com nome do princípio", ...)
  it("resposta errada retorna feedback específico para aquela opção (não genérico)", ...)
  it("score 4/4 retorna mensagem diferente de score 0/4", ...)
})

// T7.4 — Árvore do repositório
describe("RepoTree", () => {
  it("todos os nós têm name, type e desc", ...)
  it("clicar num nó atualiza o painel sem erros", ...)
  it("pastas expandem e recolhem alternadamente", ...)
})
```

**Após escrever os testes, execute-os.** Se algum falhar, corrija a implementação antes de avançar.

---

## 4. Ordem de execução recomendada

```
T7 (escreva os testes primeiro, como especificação executável)
  → T3 (simulador: é o mais urgente — viola P10 do próprio site)
  → T2 (quiz: segundo ponto crítico de aprendizagem)
  → T5 (playground: terceiro em impacto)
  → T4 (pipeline: menor esforço, bom retorno)
  → T6 (anatomia: maior esforço, alto valor)
  → T1 (trilha: maior volume de conteúdo, menor risco técnico)
```

> **Atenção:** escreva os testes de cada módulo *antes* de implementá-lo. O test é a especificação executável — se o teste estiver claro, a implementação fica óbvia.

---

## 5. O que NÃO fazer

- Não reescreva o CSS inteiro — edite apenas o necessário
- Não altere a navegação, o hero, os cards P1-P10, a seção de código ou o footer
- Não adicione dependências externas sem documentar em `PROGRESS.md` por quê
- Não avance para a próxima tarefa sem executar os testes da atual
- Não invente conteúdo que não esteja nos dois guias de referência — expanda o que existe

---

## 6. Avaliação final (após todas as tarefas)

Ao concluir todas as tarefas, adicione uma seção `## Retrospectiva` ao `PROGRESS.md` com:

1. **O que funcionou bem** no processo de desenvolvimento
2. **O que custou mais do que o esperado** — e por quê
3. **O que poderia ter sido feito diferente** se você soubesse desde o início
4. **Uma melhoria não pedida** que você identificou e implementou (ou que deixou registrada para a próxima iteração)
5. **Avaliação de consistência:** o site agora segue seus próprios princípios? O simulador usa XAI? O quiz é determinístico? O playground tem contratos claros?

> A retrospectiva não é formalidade — é o mecanismo de melhoria que torna cada próxima iteração mais rápida e mais precisa.

---

## 7. Definition of Done (DoD) para este projeto

O projeto está concluído quando:

- [ ] `PROGRESS.md` reflete o estado real de todas as 7 tarefas
- [ ] Todos os testes em `tests/eai.test.js` passam
- [ ] Com autonomia=0 e guardrails desmarcados, o simulador exibe a razão dos valores mínimos
- [ ] O quiz Q2 (Open-World) mostra feedback específico para a opção A, B e C
- [ ] Adicionar RAG sem Schema no playground exibe um alerta de risco
- [ ] Clicar em `PROGRESS.md` na árvore mostra sua descrição no painel
- [ ] Abrir o Capítulo 3 (Cérebro × Vitrine) revela pelo menos 150 palavras de conteúdo com a analogia da cozinha/salão
- [ ] A seção Pipeline & resiliência tem glossário inline de Saga, DLQ e Confiança
- [ ] O site abre sem erros no console em Chrome e Firefox
- [ ] A retrospectiva está completa em `PROGRESS.md`
