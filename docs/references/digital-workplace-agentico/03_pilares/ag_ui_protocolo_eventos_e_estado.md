---
titulo: AG-UI — protocolo de interação agente-usuário, eventos, streaming, estado compartilhado e interrupções
modulo: Pilar 5.1 — AG-UI & Generative UI
nivel: Especialista
ultima_atualizacao: 2026-10-03
tags: [ag-ui, protocolo, eventos, sse, streaming, estado, json-patch, interrupts, human-in-the-loop, tool-calls, mcp, a2a]
---

# AG-UI: protocolo de interação agente-usuário, eventos, streaming, estado compartilhado e interrupções

Este arquivo explica o **AG-UI (Agent User Interaction Protocol)**, a partir da sua documentação oficial e da especificação 1.0, e avalia onde ele se encaixa em um Digital Workplace corporativo. O foco é responder com precisão a três perguntas que costumam ser confundidas: o que o AG-UI **é**, o que ele **não é** e que problema arquitetural ele resolve de fato. Não se presume que a organização já use AG-UI; tudo o que se refere a adoção é **[RECOMENDAÇÃO]** ou **[HIPÓTESE]**.

## 1. Que problema existe

Um agente não é uma API de requisição e resposta. Uma única pergunta do colaborador pode gerar, ao longo de vários segundos: texto em streaming, raciocínio intermediário, chamadas de ferramenta com argumentos parciais, atualizações de progresso, mudanças de estado (um formulário sendo preenchido), delegação para subagentes e, às vezes, uma pausa para pedir aprovação humana.

Sem um protocolo, cada time inventa seu próprio formato de streaming entre backend do agente e frontend. O resultado é acoplamento entre o framework do agente (LangGraph, ADK, Mastra, frameworks próprios) e a interface, e retrabalho a cada troca de framework. **[INFERÊNCIA]**

## 2. O que é o AG-UI

**[FATO]** Segundo a documentação oficial ([llms.txt](https://docs.ag-ui.com/llms.txt), [visão geral](https://docs.ag-ui.com/introduction.md)):

- É um **protocolo padronizado para conectar aplicações voltadas ao usuário a agentes de IA**, com comunicação bidirecional por **fluxos de eventos**.
- O modelo de interação é baseado em **runs**: cada pedido do usuário inicia uma execução ("run"), que produz um fluxo de eventos de volta para a aplicação.
- Tem **especificação 1.0** publicada, com um rascunho (draft) em evolução, e SDKs oficiais para TypeScript, Python e .NET.

### Posição em relação a MCP e A2A

A documentação descreve três camadas complementares **[FATO]** ([MCP, A2A e AG-UI](https://docs.ag-ui.com/agentic-protocols.md)):

| Protocolo | Conecta | Pergunta que responde |
| --- | --- | --- |
| **MCP** | agente ↔ ferramentas e contexto | "como o agente acessa capacidades e dados?" |
| **A2A** | agente ↔ outros agentes | "como agentes delegam e colaboram?" |
| **AG-UI** | agente ↔ usuário, por meio de uma aplicação | "como o agente conversa com a interface em tempo real?" |

A própria documentação chama o AG-UI de protocolo "kitchen sink", que nasceu de requisitos práticos e não de um desenho de cima para baixo, e informa que handshakes recentes permitem que o AG-UI "fique na frente" de agentes que falam MCP e A2A.

## 3. O modelo de eventos

**[FATO]** A especificação 1.0 organiza os eventos em **oito famílias** ([Event Streams](https://docs.ag-ui.com/spec/1.0/events/index.md)):

| Família | Eventos | Uso no Digital Workplace |
| --- | --- | --- |
| Runs e steps | `RUN_STARTED`, `RUN_FINISHED`, `RUN_ERROR`, `STEP_STARTED`, `STEP_FINISHED` | ciclo de vida de uma solicitação; base para métricas de latência |
| Mensagens de texto | `TEXT_MESSAGE_*` | resposta conversacional em streaming |
| Tool calls | `TOOL_CALL_*` | proposta de ação; argumentos chegam em fragmentos |
| Reasoning | `REASONING_*` | visibilidade do raciocínio, com artefatos criptografados |
| Estado | `STATE_SNAPSHOT`, `STATE_DELTA`, `MESSAGES_SNAPSHOT` | estado compartilhado (ex.: rascunho de uma solicitação de férias) |
| Atividade | `ACTIVITY_SNAPSHOT`, `ACTIVITY_DELTA` | progresso estruturado fora da transcrição ("verificando elegibilidade…") |
| Subagentes | `SUBAGENT_STARTED`, `SUBAGENT_FINISHED`, `SUBAGENT_ERROR` | atribuição de saída a subagentes (ex.: agente de benefícios) |
| Passthrough | `RAW`, `CUSTOM` | escape para eventos proprietários |

### Tool calls e ferramentas de frontend

**[FATO]** ([Tools](https://docs.ag-ui.com/concepts/tools.md)):

- Ferramentas podem ser **definidas no frontend e passadas ao agente durante a execução**, o que dá ao frontend controle sobre as capacidades do agente e permite adicionar ou remover ferramentas conforme o contexto.
- O ciclo de uma chamada tem três eventos: início (com ID único), argumentos em fragmentos de JSON parcial e fim. O frontend acumula os fragmentos.
- O frontend pode executar a ferramenta e devolver o resultado como mensagem de ferramenta.
- O padrão sustenta human-in-the-loop: a IA sugere ações que exigem aprovação humana.

**Implicação [INFERÊNCIA]:** ferramentas de frontend são o mecanismo natural para o agente **pedir** a renderização de um componente do Design System. Quem define o catálogo de ferramentas de frontend é a aplicação, e não o agente. Ver `03_pilares/generative_ui_design_system_e_component_registry.md`.

### Estado: snapshots e deltas

**[FATO]** ([Snapshots and Deltas](https://docs.ag-ui.com/spec/1.0/basic/patterns/snapshots.md)):

- **Snapshot** substitui integralmente o estado: "um consumidor DEVE substituir sua cópia pelo conteúdo do snapshot — um snapshot não é um merge".
- **Delta** aplica operações JSON Patch (RFC 6902) de forma **atômica**: todas ou nenhuma.
- Se um patch bem formado falhar, o consumidor rejeita o resultado parcial, emite um aviso e pode seguir com o valor anterior; o produtor "DEVERIA ressincronizar com um snapshot".

**Implicação [INFERÊNCIA]:** o estado compartilhado é o lugar certo para representar o "rascunho" de uma transação (campos coletados, validações pendentes), separado da conversa. Isso permite que o usuário edite diretamente no componente e que o agente veja a edição.

### Interrupções e retomada (human-in-the-loop formal)

**[FATO]** ([Interrupts and Resume](https://docs.ag-ui.com/spec/1.0/basic/patterns/interrupt-resume.md)):

- Uma execução que precisa de entrada externa (aprovações, credenciais, escolhas) **termina** com `RUN_FINISHED` carregando um resultado de interrupção. "Uma execução interrompida é uma execução encerrada"; a resposta vem em uma nova execução.
- Cada interrupção tem `id`, `reason`, `message` legível, `toolCallId` opcional, `responseSchema` (o formato esperado da resposta) e, se for o caso, `subagentRunId`.
- O produtor **não deve** reportar uma execução interrompida como sucesso.
- A retomada precisa cobrir **todas** as interrupções (respondidas ou explicitamente abandonadas); interrupções expiradas só podem ser abandonadas.
- Se alguma interrupção não for coberta, o produtor **não deve** executar a ação interrompida.

**Implicação [INFERÊNCIA]:** esse desenho é muito adequado a ambientes regulados. A aprovação humana deixa de ser um "if" no código do agente e vira um evento de protocolo, com schema de resposta, expiração e regra explícita de não execução. Isso facilita a auditoria.

## 4. Transportes: SSE, Protobuf e WebSockets

**[FATO]** ([Transports](https://docs.ag-ui.com/spec/1.0/basic/transports/index.md)):

- **HTTP + Server-Sent Events** é obrigatório: "uma implementação que fala HTTP DEVE suportar o binding SSE".
- **HTTP + Protobuf** é opcional, para respostas binárias por negociação de conteúdo.
- **WebSocket não é um binding padrão**, mas é permitido: implementações "PODEM transportar AG-UI sobre outros canais — WebSockets, barramentos de mensagens, pipes em processo".
- Qualquer transporte precisa garantir entrega **ordenada e completa** dos eventos de uma execução, entrega da entrada antes de qualquer evento, sinal de término distinguível de truncamento e caminho de erro para entrada rejeitada.

### Implicações de infraestrutura

| Tema | Implicação | Rótulo |
| --- | --- | --- |
| Proxies e CDNs | não podem bufferizar respostas SSE; timeouts de conexão precisam acomodar execuções longas | INFERÊNCIA |
| Balanceadores | conexões longas reduzem a eficiência de conexões por instância | INFERÊNCIA |
| Autenticação | o stream precisa de token válido durante toda a execução; tokens curtos exigem estratégia de renovação entre execuções | INFERÊNCIA |
| Mobile | SSE sobre redes móveis instáveis exige reconexão e uso de snapshots para ressincronizar | INFERÊNCIA |

## 5. O que o AG-UI **não** é

- **Não é uma especificação de Generative UI.** A documentação distingue: A2UI, MCP-UI/MCP Apps e Open-JSON-UI são **especificações de UI generativa**; o AG-UI é um **protocolo de interação** que fornece a conexão de runtime bidirecional e suporta essas especificações. **[FATO]** ([Generative UI specs](https://docs.ag-ui.com/concepts/generative-ui-specs.md))
- **Não é um protocolo de integração com sistemas corporativos.** Ele não substitui APIs, eventos, BFF nem MCP.
- **Não é um mecanismo de autorização.** Ele transporta propostas de ação; a autorização acontece nas ferramentas e nos sistemas.
- **Não é um framework de agente.** Ele se acopla a frameworks existentes por adaptadores e middleware.

## 6. Resposta à pergunta "AG-UI é protocolo de UI, integração ou interação?"

**É um protocolo de interação.** Ele padroniza a **conversa em tempo real** entre um agente e a aplicação que o usuário opera: o que o agente está fazendo (eventos), o que ele propõe (tool calls), o que ambos sabem (estado) e quando ele precisa do humano (interrupções). A UI propriamente dita é responsabilidade do Design System e de uma especificação de UI generativa; a integração com sistemas é responsabilidade da camada de integração e das ferramentas.

## 7. Onde o AG-UI se encaixa na arquitetura de referência

```text
Experience Layer (web, mobile, Teams)
        ▲   │
 eventos│   │ RunAgentInput (mensagens, estado, ferramentas de frontend, resumes)
        │   ▼
   ┌──────────────── AG-UI ────────────────┐
   │ runs │ texto │ tool calls │ estado │ interrupções │
   └───────────────────────────────────────┘
        ▲   │
        │   ▼
Agent Runtime (framework de agente)
        │
        ├── MCP ──► ferramentas ──► API Gateway/BFF ──► SoRs
        └── A2A ──► agentes de domínio
```

## 8. Dependências, riscos e maturidade

### Dependências

- Um runtime de agente compatível (adaptador ou middleware).
- Um Design System com componentes registráveis como ferramentas de frontend.
- Infraestrutura que suporte streaming de longa duração.
- Um modelo de estado da tarefa bem definido (o que é estado compartilhado e o que é privado do agente).

### Riscos

| Risco | Descrição | Mitigação |
| --- | --- | --- |
| Instabilidade de especificação | há versão 1.0 e um rascunho ativo; mudanças podem exigir migração | adaptador interno entre o protocolo e a aplicação; testes de contrato |
| Vazamento por raciocínio | eventos de raciocínio podem expor informações sensíveis | política sobre o que exibir; a especificação prevê artefatos criptografados |
| Estado como canal de injeção | o agente pode escrever no estado algo que a UI exibe sem validação | validar o estado contra schema antes de renderizar |
| Ferramentas de frontend com efeito | uma ferramenta de frontend pode disparar ações | ações com efeito sempre passam pelo backend, com autorização |
| Eventos `CUSTOM` em excesso | perda de interoperabilidade | catálogo interno de eventos customizados, com revisão |

### Maturidade

**[INFERÊNCIA]** **Emergente, em consolidação.** Há especificação 1.0 com linguagem normativa (MUST/SHOULD), três SDKs oficiais e integrações com frameworks conhecidos, mas o ecossistema e as práticas de segurança em produção corporativa ainda são recentes. Adequado para pilotos com encapsulamento; prematuro como dependência não encapsulada de longo prazo.

## 9. Relação com os demais pilares

| Pilar | Relação |
| --- | --- |
| Generative UI | o AG-UI transporta pedidos de renderização; a especificação de UI e o Component Registry definem o que pode ser renderizado |
| Front-end modular | o cliente AG-UI vive no shell da aplicação; micro-frontends podem registrar ferramentas de frontend |
| Integração | o AG-UI fica acima; ferramentas chamam o BFF e as APIs |
| Agentes e MCP | o agente usa MCP para ferramentas e AG-UI para falar com a UI |
| Segurança | tokens no stream, autorização nas ferramentas, interrupções como controle |
| Observabilidade | `RUN_*` e `STEP_*` alimentam traces e métricas de experiência |

## Fontes

- AG-UI, índice de documentação (llms.txt): https://docs.ag-ui.com/llms.txt
- AG-UI, visão geral: https://docs.ag-ui.com/introduction.md
- AG-UI, MCP, A2A e AG-UI: https://docs.ag-ui.com/agentic-protocols.md
- AG-UI, Event Streams (spec 1.0): https://docs.ag-ui.com/spec/1.0/events/index.md
- AG-UI, Tools: https://docs.ag-ui.com/concepts/tools.md
- AG-UI, Snapshots and Deltas (spec 1.0): https://docs.ag-ui.com/spec/1.0/basic/patterns/snapshots.md
- AG-UI, Interrupts and Resume (spec 1.0): https://docs.ag-ui.com/spec/1.0/basic/patterns/interrupt-resume.md
- AG-UI, Transports (spec 1.0): https://docs.ag-ui.com/spec/1.0/basic/transports/index.md
- AG-UI, Generative UI specs: https://docs.ag-ui.com/concepts/generative-ui-specs.md
- RFC 6902, JSON Patch: https://www.rfc-editor.org/rfc/rfc6902
