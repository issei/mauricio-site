---
titulo: Camada de integração para agentes — API Gateway, BFF, eventos, Kafka, CDC, workflow engines e resiliência sem novo monólito
modulo: Pilar 5.5 — Integration Layer
nivel: Especialista
ultima_atualizacao: 2026-10-03
tags: [integracao, api-gateway, bff, eventos, kafka, cdc, workflow, saga, outbox, idempotencia, resiliencia, service-mesh, mcp]
---

# Camada de integração para agentes: API Gateway, BFF, eventos, CDC, workflows e resiliência

Este arquivo detalha como conectar agentes, experiência e sistemas corporativos sem criar um novo monólito de integração. Ele responde quando usar API, quando usar eventos, quando usar um workflow engine, qual é o papel do BFF quando agentes possuem ferramentas e como tratar idempotência, consistência eventual e falhas. Não se presume conhecimento da camada de integração atual da organização (ver `01_contexto/questoes_abertas_e_research_gaps.md`); as estruturas descritas são **[RECOMENDAÇÃO]** ou **[HIPÓTESE]**.

## 1. Que problema existe

Um agente com ferramentas precisa ler e escrever em dezenas de sistemas de registro (SoRs). A tentação é dar ao agente ferramentas que chamam cada SoR diretamente, ou construir uma "camada de ferramentas" que concentra transformações e regras. Os dois caminhos levam ao mesmo lugar: um ponto central, frágil e opaco, onde regras de negócio se misturam a prompts.

## 2. Princípio orientador

> **O agente é um canal e um consumidor de capacidades, não a camada de integração.**

Isso significa que o agente usa a mesma infraestrutura de integração que os outros canais (web, mobile), com adaptações próprias, e que a regra de negócio permanece nos domínios.

## 3. Componentes e responsabilidades

```text
Agente (runtime)
   │  tool calls
   ▼
Ferramentas (adaptadores finos; MCP ou integração direta)
   │  token delegado, audiência específica
   ▼
API Gateway  ── autenticação, rate limit, quotas por agente, roteamento
   │
   ▼
BFF do agente ── agregação, normalização, redução de payload, paginação
   │
   ├──► APIs de domínio (consultas e comandos síncronos)
   ├──► Workflow engine (processos longos, aprovações, timers, compensação)
   └──► Projeções de leitura alimentadas por eventos/CDC
             ▲
             │
   Plataforma de eventos (ex.: Kafka) ◄── Outbox / CDC ◄── SoRs
```

| Componente | Responsável por | **Não** responsável por |
| --- | --- | --- |
| Ferramenta | traduzir a chamada do agente em uma requisição, com schema | regra de elegibilidade, orquestração |
| API Gateway | segurança de borda, limites, observabilidade de tráfego | transformação de negócio |
| BFF | moldar dados para o canal | decidir regras |
| API de domínio | regra e estado do domínio | experiência do canal |
| Workflow engine | estado durável de processos | interpretação de linguagem natural |
| Plataforma de eventos | distribuir fatos | comandar ações |

## 4. Qual é o papel do BFF quando agentes possuem ferramentas?

O padrão BFF cria um backend específico por tipo de frontend, para que cada canal tenha APIs adequadas sem poluir as APIs de domínio ([Sam Newman](https://samnewman.io/patterns/architectural/bff/)). **[FATO]** sobre o padrão.

Para agentes, o BFF ganha funções específicas **[RECOMENDAÇÃO]**:

1. **Reduzir payload e ruído:** LLMs pagam por token e se confundem com campos irrelevantes. O BFF devolve apenas o necessário, com nomes autoexplicativos.
2. **Agregar consultas frequentes:** "resumo do colaborador" (cargo, gestor, saldo de férias, solicitações abertas) em uma chamada, em vez de quatro tool calls.
3. **Normalizar erros:** transformar erros heterogêneos dos SoRs em mensagens que o agente consegue explicar ("solicitação fora do prazo de carência").
4. **Impor paginação e limites:** evitar que o agente traga mil registros para o contexto.
5. **Aplicar a política do canal agente:** por exemplo, impedir que certas operações sejam acionadas pelo canal agente mesmo que existam na API de domínio.

**Ferramenta, BFF ou MCP?** Um servidor MCP pode ser a implementação das ferramentas e chamar o BFF por trás. O MCP padroniza **como o agente descobre e chama ferramentas**; o BFF modela **o que** essas ferramentas devolvem. Um não substitui o outro. **[INFERÊNCIA]**

## 5. Quando usar API, eventos ou workflow engine

| Critério | API síncrona | Eventos | Workflow engine |
| --- | --- | --- | --- |
| Interação | pergunta e resposta imediata | notificação de fato ocorrido | coordenação de várias etapas ao longo do tempo |
| Acoplamento temporal | alto | baixo | médio (o motor guarda o estado) |
| Consumidores | um | vários | um processo |
| Duração | milissegundos a segundos | contínua | minutos a meses |
| Exemplo | "qual meu saldo de férias?" | "dependente incluído" | onboarding, inclusão de dependente com análise documental |
| Sinal de uso errado | timeouts em operações longas | eventos usados como comandos com resposta esperada | motor usado para uma chamada simples |

### Pergunta crítica: quando utilizar API?

Quando o canal precisa de uma **resposta imediata** sobre o estado atual ou quer **comandar** uma ação cuja aceitação pode ser decidida na hora. É o padrão para a maioria das ferramentas de leitura de um agente.

### Pergunta crítica: quando utilizar eventos?

Quando **vários consumidores** precisam reagir a um fato, quando o produtor não deve conhecer os consumidores e quando a reação pode ser assíncrona. Para o agente, eventos alimentam **notificações proativas** ("seu reembolso foi pago") e **projeções de leitura** rápidas. **Não** são a forma de o agente comandar algo e esperar o resultado.

### Pergunta crítica: quando utilizar workflow engine?

Quando o processo tem **estado durável**, **etapas humanas**, **timers**, **compensações** ou **duração longa**. Motores como o [Temporal](https://docs.temporal.io/) ou motores BPMN garantem que o processo continue mesmo que o agente, o canal ou a sessão desapareçam. **[RECOMENDAÇÃO]** O agente **inicia** o workflow (com chave de idempotência), **consulta** o estado e **responde** a sinais humanos; nunca guarda o estado do processo na própria memória.

## 6. Kafka, CDC e outbox

- **Plataforma de eventos (Kafka ou equivalente):** distribui eventos de domínio com retenção e reprocessamento. Faz sentido quando há muitos produtores e consumidores. É desproporcional para poucos fluxos.
- **CDC ([Debezium](https://debezium.io/documentation/)):** captura mudanças no log do banco de um SoR legado e as publica como eventos, sem alterar o sistema. Útil para legados que não publicam eventos. **Risco:** o esquema interno do banco vira contrato público; mitigar com uma camada de tradução para eventos de domínio.
- **Outbox transacional:** grava a mudança de estado e o evento na mesma transação e publica depois, evitando "estado mudou, evento perdido" ([microservices.io](https://microservices.io/patterns/data/transactional-outbox.html)). **[FATO]** sobre o padrão.

## 7. Idempotência, retries e consistência eventual

### Por que agentes tornam a idempotência obrigatória

Um agente pode repetir uma chamada por vários motivos: timeout, replanejamento, retomada após uma interrupção, erro de parsing. Sem idempotência, "incluir dependente" executado duas vezes gera dois registros. **[INFERÊNCIA]**

**[RECOMENDAÇÃO]**

- Toda ferramenta que altera estado recebe uma **chave de idempotência** derivada da tarefa (ex.: ID da execução + ID da tool call).
- O BFF ou a API de domínio armazena a chave e devolve o mesmo resultado em repetições.
- Retries automáticos só em operações idempotentes, com backoff exponencial e jitter.

### Consistência eventual e experiência

Quando um comando inicia um processo assíncrono, o agente deve comunicar o estado real:

| Estado | Mensagem adequada | Mensagem inadequada |
| --- | --- | --- |
| Pedido aceito | "Sua solicitação foi registrada (protocolo 123) e está aguardando aprovação do gestor." | "Pronto, suas férias estão marcadas." |
| Processando | atividade de progresso via AG-UI (`ACTIVITY_*`) | silêncio |
| Concluído (evento) | notificação proativa com link para o detalhe | — |

## 8. Resiliência

| Mecanismo | Aplicação na camada de agentes |
| --- | --- |
| Timeouts por ferramenta | cada ferramenta tem um timeout; o turno tem um orçamento total |
| Circuit breaker | por SoR; com o circuito aberto, a ferramenta devolve um erro explicável imediatamente |
| Bulkhead | isolar pools de conexão por SoR para que um lento não esgote os outros |
| Fallback | oferecer link direto, formulário manual ou abertura de chamado |
| Rate limit por agente e por usuário | evitar que um loop de ferramentas sobrecarregue o SoR |
| Saga com compensação | processos multi-SoR sem transação global ([microservices.io](https://microservices.io/patterns/data/saga.html)) |

## 9. Service mesh

Um service mesh oferece mTLS, identidade de serviço, políticas de tráfego e telemetria entre serviços. **[INFERÊNCIA]** É útil quando a plataforma já tem muitos serviços em contêineres; não é pré-requisito para agentes. A identidade de serviço (por exemplo, via [SPIFFE](https://spiffe.io/docs/latest/spiffe-about/overview/)) é relevante para dar ao runtime do agente uma identidade própria verificável.

## 10. Como evitar o "agente-ESB"

| Sinal de alerta | Correção |
| --- | --- |
| Regras de elegibilidade no prompt | mover para a API de domínio ou para um motor de regras |
| Ferramentas que chamam 5 sistemas e decidem | dividir em ferramentas finas ou mover a agregação para o BFF |
| Processos de vários dias controlados pela conversa | workflow engine |
| Um único time responsável por "todas as ferramentas" | ferramentas pertencem aos domínios; a plataforma fornece padrões |
| Agente com credencial de serviço ampla | token delegado, escopo por ferramenta |

## 11. Dependências, riscos e maturidade

- **Dependências:** APIs de domínio com contrato, identidade delegada, gateway, observabilidade com propagação de contexto.
- **Riscos:** eventos onde API bastaria; CDC expondo esquema interno; BFF virando monólito; MCP tratado como integração universal.
- **Maturidade:** gateway, BFF, eventos, CDC, sagas e workflows são padrões **maduros**. Sua aplicação a agentes é **recente**, mas não exige padrões novos; exige disciplina sobre onde fica a regra. **[INFERÊNCIA]**

## Fontes

- Sam Newman, Backends For Frontends: https://samnewman.io/patterns/architectural/bff/
- Temporal: https://docs.temporal.io/
- Debezium: https://debezium.io/documentation/
- microservices.io, Transactional Outbox: https://microservices.io/patterns/data/transactional-outbox.html
- microservices.io, Saga: https://microservices.io/patterns/data/saga.html
- SPIFFE: https://spiffe.io/docs/latest/spiffe-about/overview/
- AG-UI, Event Streams (atividade): https://docs.ag-ui.com/spec/1.0/events/index.md
