---
titulo: Perguntas críticas 16 a 30 — API, eventos, workflow, identidade, auditoria, exceções, DEX, testes, acessibilidade, observabilidade e pré-requisitos
modulo: Decisão
nivel: Avançado
ultima_atualizacao: 2026-10-03
tags: [perguntas-criticas, api, eventos, workflow, identidade, autorizacao, auditoria, excecoes, dex, testes, acessibilidade, observabilidade, determinismo, pre-requisitos]
---

# Perguntas críticas 16 a 30

Este arquivo responde, de forma direta e autocontida, às perguntas críticas 16 a 30 do estudo sobre a evolução de um portal corporativo para um Digital Workplace orientado a intenção e agentes. Cada resposta traz a conclusão, a justificativa e onde o tema é aprofundado. As perguntas 1 a 15 estão em `05_decisao/perguntas_criticas_01_a_15.md`. Rótulos: **[FATO]**, **[INFERÊNCIA]**, **[HIPÓTESE]**, **[RECOMENDAÇÃO]**.

---

### 16. Quando utilizar API?

**Resposta:** quando o canal precisa de **resposta imediata** sobre o estado atual ou quer **comandar** uma ação cuja aceitação pode ser decidida na hora. **[INFERÊNCIA]**

É o padrão para a maioria das ferramentas de leitura do agente ("qual meu saldo?") e para comandos que **iniciam** processos ("registre a solicitação"). Sinal de uso errado: operações longas resolvidas por chamada síncrona com timeouts altos.

### 17. Quando utilizar eventos?

**Resposta:** quando **vários consumidores** reagem a um **fato** já ocorrido, o produtor não deve conhecê-los e a reação pode ser assíncrona. **[INFERÊNCIA]**

No Digital Workplace: notificações proativas ("reembolso pago"), atualização de projeções de leitura, sincronização entre sistemas, gatilhos de reindexação de conteúdo. Para legados sem eventos, CDC ([Debezium](https://debezium.io/documentation/)); para consistência entre estado e evento, outbox ([microservices.io](https://microservices.io/patterns/data/transactional-outbox.html)). Sinal de uso errado: eventos usados como pedido-resposta.

### 18. Quando utilizar workflow engine?

**Resposta:** quando o processo tem **estado durável**, **etapas humanas**, **timers**, **compensações** ou **duração longa**. **[RECOMENDAÇÃO]**

O agente inicia o workflow (com idempotência), consulta seu estado e responde a sinais do usuário; **nunca** guarda o estado do processo em sua memória. Exemplos: onboarding, inclusão de dependente com análise documental, solicitação de acesso com aprovação. Referências: [Temporal](https://docs.temporal.io/), [BPMN 2.0](https://www.omg.org/spec/BPMN/2.0/).

### 19. Como preservar identidade e autorização durante agent execution?

**Resposta:** **delegação explícita** com identidade composta, verificada em cada recurso. **[RECOMENDAÇÃO]**

1. O usuário autentica na experiência.
2. Para cada ferramenta, o runtime obtém um token por **token exchange** com sujeito = usuário e ator = agente (claim `act`), escopo mínimo e audiência específica. **[FATO]** sobre a semântica ([RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html))
3. Servidores de ferramentas validam a audiência e não repassam o token recebido. **[FATO]** ([MCP Authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization))
4. A autorização final acontece no ponto do dado (API de domínio ou SoR), considerando sujeito, ator e contexto.
5. O "de quem" vem do token, nunca de parâmetros gerados pelo modelo.

Aprofundamento: `04_transversais/seguranca_iam_identidade_do_agente.md`.

### 20. Como auditar uma decisão ou ação realizada por um agente?

**Resposta:** com um **registro de execução** por tarefa, correlacionado ao SoR. **[RECOMENDAÇÃO]**

O registro contém: ID de correlação, sujeito, ator, canal, versão das instruções e do modelo, intenção interpretada, fontes (com versão), ferramentas (argumentos mascarados, resultados resumidos), decisões de política, interrupções e respostas, efeitos (protocolos). A auditoria localiza a execução pelo protocolo, reconstrói o contexto vigente, verifica se a regra veio do domínio e se houve confirmação, e permite a revisão humana prevista no art. 20 da LGPD. **[FATO]** sobre o direito ([LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)). Aprofundamento: `04_transversais/governanca_dados_lgpd_ai_governance.md`.

### 21. Como lidar com exceções humanas?

**Resposta:** tratando exceções como **estados de primeira classe do processo**. **[RECOMENDAÇÃO]**

- Cada exceção tem tipo, fila com dono, SLA, contexto estruturado transferido e caminho de retorno ao fluxo automatizado.
- Gatilhos de handoff: regra que exige humano, baixa confiança, sensibilidade do tema, pedido explícito, falha persistente, caso fora das regras.
- Confirmações do usuário presente: interrupção AG-UI. Aprovações de terceiros: tarefa humana no workflow engine. **[INFERÊNCIA]**

Aprofundamento: `04_transversais/processos_corporativos_e_agentes.md`.

### 22. Como medir DEX quando a interface é dinâmica?

**Resposta:** medindo pela **intenção**, não pela tela. **[RECOMENDAÇÃO]**

Métricas: resolução por intenção, tempo até a resolução (até o resultado no SoR), esforço percebido, turnos por resolução, taxa de edição em confirmações, abandono por etapa, escalonamento e motivo, recontato em 7 dias. Combinadas com telemetria e sentimento das ferramentas de DEX ([Computerworld](https://www.computerworld.com/article/1612536/digital-employee-experience-dex-employee-retention-tool.html)). Aprofundamento: `04_transversais/ux_experiencia_orientada_a_intencao.md`.

### 23. Como testar uma interface que pode mudar conforme contexto?

**Resposta:** testar **componentes, contratos e comportamentos** em vez de telas fixas. **[RECOMENDAÇÃO]**

- Componentes: testes unitários, property-based testing com props geradas pelo schema, regressão visual.
- Contratos: toda saída do agente validada contra o schema do catálogo.
- Comportamento: avaliações com asserções sobre os eventos AG-UI emitidos para cada intenção.
- Ponta a ponta: **replay** de fluxos de eventos gravados com um agente simulado determinístico.
- Acessibilidade: por componente e por template.

### 24. Como testar agentes?

**Resposta:** em camadas, com **avaliações estatísticas** e **regressão em CI**. **[RECOMENDAÇÃO]**

| Camada | Técnica |
| --- | --- |
| Ferramentas | testes convencionais de contrato, idempotência e autorização |
| Seleção de ferramenta | conjunto de intenções com asserções sobre as tool calls |
| Trajetória | critérios de trajetória aceitável |
| Resultado | ambiente com SoRs simulados |
| Segurança | red teaming (injeção direta e indireta, escalada, vazamento) |
| Regressão | suíte em CI com limiares para mudanças de modelo, prompt ou catálogo |
| Produção | avaliação amostral contínua |

### 25. Como garantir acessibilidade em Generative UI?

**Resposta:** **certificar componentes, não telas**, e controlar a dinâmica. **[RECOMENDAÇÃO]**

- Só componentes auditados (WCAG 2.2 AA) entram no catálogo ([WCAG 2.2](https://www.w3.org/TR/WCAG22/)).
- Gestão explícita de foco quando o agente insere ou substitui componentes.
- `aria-live` moderado; streaming anunciado por etapa, não por token.
- Representação textual equivalente de cada componente.
- Caminhos alternativos por navegação.

### 26. Como preservar observabilidade em sistemas agentic?

**Resposta:** observabilidade em **três planos** (serviços, agente, qualidade) com **traces correlacionados de ponta a ponta**. **[RECOMENDAÇÃO]**

- OpenTelemetry com convenções semânticas de GenAI, ainda em evolução. **[FATO]** ([OTel](https://github.com/open-telemetry/semantic-conventions-genai))
- Propagação de `traceparent` entre agente e servidores MCP, documentada na revisão 2026-07-28. **[FATO]** ([MCP changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog))
- Eventos `RUN_*` e `STEP_*` do AG-UI como âncoras do lado da experiência.
- SLOs de qualidade e custo, além de disponibilidade e latência.
- Dados pessoais mascarados ou em armazenamento restrito.

Aprofundamento: `04_transversais/operacao_observabilidade_sre_dex.md`.

### 27. Quais componentes devem permanecer determinísticos?

**Resposta:** **[RECOMENDAÇÃO]**

- regras de negócio e elegibilidade;
- autorização e decisões de política;
- execução de ações e seus efeitos (com idempotência);
- estado de processos (workflow);
- validação de entradas e de props de UI;
- renderização de cada componente;
- componentes de confirmação, consentimento e avisos legais;
- registros de auditoria;
- ciclo de vida do conteúdo (vigência, revogação, descarte).

### 28. Quais componentes podem ser adaptativos?

**Resposta:** **[RECOMENDAÇÃO]**

- interpretação da intenção;
- texto explicativo e tom (dentro de guardrails);
- escolha e ordem de componentes dentro do catálogo e de templates;
- sugestões de próximos passos e serviços relacionados;
- reformulação de consultas de busca;
- planejamento de sequência em tarefas de baixo risco;
- personalização de destaque e pré-preenchimento.

A regra prática: **adaptativo na interpretação e na apresentação; determinístico na decisão e na execução.**

### 29. Quais capacidades são pré-requisitos para agentes?

**Resposta:** **[RECOMENDAÇÃO]**

| Capacidade | Por que é pré-requisito |
| --- | --- |
| Identidade federada com delegação | agir "em nome de" com rastreabilidade |
| Autorização no ponto do dado | o agente não pode ser a última barreira |
| APIs com contrato para as capacidades usadas | ferramentas sem API viram automação frágil |
| Processos explícitos com dono e fila de exceção | sem isso, o agente automatiza a indefinição |
| Conteúdo governado com permissões indexáveis | sem isso, o RAG vaza ou erra |
| Catálogo de serviços e jornadas (EXP) | sem isso, o agente cria um catálogo paralelo |
| Observabilidade e registro de execução | sem isso, não há auditoria nem diagnóstico |
| Conjunto de avaliação | sem isso, qualidade é opinião |
| Política de IA e classificação de dados | sem isso, não se sabe o que pode ir ao modelo |

### 30. Quais tecnologias são realmente necessárias e quais são apenas alternativas de implementação?

**Resposta:** necessárias são **capacidades**; tecnologias são alternativas. **[INFERÊNCIA]**

- **Capacidades necessárias:** identidade com delegação, autorização, APIs com contrato, processos duráveis, conteúdo governado, busca com permissão, protocolo de interação agente-UI, UI generativa governada, interface de ferramentas, observabilidade, avaliação.
- **Alternativas de implementação:** AG-UI ou protocolo próprio; A2UI, MCP Apps ou schema próprio; MCP ou chamadas nativas do framework; Elasticsearch, OpenSearch ou serviço gerenciado; Temporal, BPMN ou workflow do SoR.
- **Não são requisitos:** micro-frontends, Kafka, service mesh, banco vetorial dedicado, multi-agente, MACH completo.

A tabela completa está em `05_decisao/matriz_tecnologica.md`, seção 7.

## Fontes

- Debezium: https://debezium.io/documentation/
- microservices.io, Transactional Outbox: https://microservices.io/patterns/data/transactional-outbox.html
- Temporal: https://docs.temporal.io/
- OMG, BPMN 2.0: https://www.omg.org/spec/BPMN/2.0/
- RFC 8693: https://www.rfc-editor.org/rfc/rfc8693.html
- MCP Authorization: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
- LGPD: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- Computerworld, DEX: https://www.computerworld.com/article/1612536/digital-employee-experience-dex-employee-retention-tool.html
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- OpenTelemetry GenAI semconv: https://github.com/open-telemetry/semantic-conventions-genai
- MCP changelog 2026-07-28: https://modelcontextprotocol.io/specification/2026-07-28/changelog
