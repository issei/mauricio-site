---
titulo: Agentes corporativos — LLM, tool calling, MCP, A2A, memória, estado, planejamento, multi-agente, guardrails e avaliação
modulo: Pilar 5.6 — AI / Knowledge / Search
nivel: Especialista
ultima_atualizacao: 2026-10-03
tags: [agentes, llm, tool-calling, mcp, a2a, memoria, estado, planejamento, multi-agent, guardrails, human-in-the-loop, avaliacao, autonomia]
---

# Agentes corporativos: tool calling, MCP, A2A, memória, estado, multi-agente, guardrails e avaliação

Este arquivo explica como um agente de IA funciona em um Digital Workplace corporativo, quais protocolos o conectam a ferramentas e a outros agentes, e como manter autonomia sob controle. Ele responde a perguntas como "quando um chatbot vira agente?", "o que diferencia um agente de um workflow automatizado?", "qual é o papel do MCP?" e "como testar agentes?". Não se presume que a organização já use agentes de IA generativa; a tecnologia de eventuais assistentes virtuais existentes é desconhecida (ver `01_contexto/questoes_abertas_e_research_gaps.md`).

## 1. Que problema existe

Interpretar uma intenção é diferente de resolver um pedido. "Quero incluir minha filha recém-nascida no plano de saúde" exige: entender a intenção, consultar a elegibilidade, verificar prazos, coletar a certidão, submeter a solicitação, informar o protocolo e acompanhar. Um chatbot de fluxos não escala para a variedade de intenções; um LLM sozinho não tem acesso aos sistemas nem garantias de regra. O agente é a combinação de interpretação flexível com ação controlada.

## 2. Pergunta crítica: quando um chatbot deixa de ser chatbot e passa a ser agente?

**[INFERÊNCIA]** Quando três condições aparecem juntas:

1. **Decisão dinâmica do próximo passo:** o modelo, e não um fluxo pré-programado, escolhe o que fazer.
2. **Ferramentas com efeito:** ele lê e, principalmente, **escreve** em sistemas.
3. **Loop até o objetivo:** ele observa resultados e ajusta o plano, em vez de responder uma vez.

Um chatbot com LLM que só responde perguntas continua sendo um chatbot (ou um RAG). Um chatbot de regras que abre chamados por formulário é automação, não agente.

## 3. Pergunta crítica: o que diferencia um agente de um workflow automatizado?

A Anthropic define **workflows** como "sistemas em que LLMs e ferramentas são orquestrados por caminhos de código pré-definidos" e **agentes** como "sistemas em que LLMs dirigem dinamicamente seus próprios processos e uso de ferramentas". **[FATO]** ([Anthropic, 19/12/2024](https://www.anthropic.com/engineering/building-effective-agents))

| Critério | Workflow automatizado | Agente |
| --- | --- | --- |
| Quem define a sequência | o código | o modelo, dentro de limites |
| Previsibilidade | alta | menor |
| Variedade de entradas suportada | baixa a média | alta |
| Testabilidade | testes determinísticos | avaliações estatísticas |
| Custo por execução | baixo | maior (tokens, chamadas) |
| Melhor para | processos conhecidos e estáveis | intenções variadas, cauda longa |

A mesma fonte lista padrões de workflow com LLM (encadeamento de prompts, roteamento, paralelização, orquestrador-trabalhadores, avaliador-otimizador) e recomenda começar pela solução mais simples. **[FATO]** **[RECOMENDAÇÃO]** Em um Digital Workplace, a maior parte do valor inicial está em **workflows com etapas de LLM** (roteamento de intenções, extração de dados de documentos, sumarização para aprovadores) e em **agentes restritos** para a cauda longa.

## 4. Anatomia de um agente corporativo

```text
             ┌────────────── Contexto ──────────────┐
             │ instruções versionadas │ perfil │ estado da tarefa │
             │ conhecimento recuperado │ memória autorizada        │
             └──────────────────┬───────────────────┘
                                ▼
Intenção ──► LLM (interpreta, planeja, decide) ──► Guardrails de saída
                ▲               │
                │               ▼
         Resultados ◄── Ferramentas (com escopo e token delegado)
                                │
                        Interrupção HITL quando a política exige
```

| Componente | Decisão de arquitetura |
| --- | --- |
| **Modelo** | qual modelo por tarefa; roteamento por complexidade; onde roda (residência de dados) |
| **Instruções** | versionadas, revisadas, testadas como código |
| **Estado** | explícito, serializável, separado da conversa; base para retomada |
| **Memória de curto prazo** | conversa e tarefa atual; expira |
| **Memória de longo prazo** | preferências declaradas; com consentimento, finalidade e retenção definidas |
| **Planejamento** | implícito (loop) para tarefas curtas; plano explícito e revisável para tarefas com várias ações |
| **Ferramentas** | catálogo aprovado, filtrado por contexto e permissão |
| **Guardrails** | validação de entrada (injeção), de saída (dados pessoais, tom), de ação (política) |
| **HITL** | interrupções formais antes de ações de alto impacto |

## 5. Tool calling

- O modelo recebe definições de ferramentas (nome, descrição, schema de entrada) e emite chamadas estruturadas.
- **Boas ferramentas são estreitas e bem descritas:** `consultar_saldo_ferias(colaborador)` é melhor do que `executar_consulta_rh(sql)`.
- **Resultados enxutos:** o retorno entra no contexto; payloads grandes degradam a qualidade e aumentam o custo.
- **Classificação de risco por ferramenta:** leitura, escrita reversível, escrita irreversível, escrita com efeito financeiro ou legal. O nível define a regra de confirmação.

## 6. MCP: papel e limites

### O que é **[FATO]**

O Model Context Protocol padroniza como aplicações de IA descobrem e usam ferramentas, recursos e prompts expostos por servidores. A revisão **2026-07-28** trouxe mudanças importantes ([changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)):

- remoção das sessões de protocolo e do cabeçalho `Mcp-Session-Id` no transporte Streamable HTTP;
- protocolo sem estado: remoção do handshake `initialize`; versão e capacidades vão em `_meta` de cada requisição;
- novo método `server/discover`;
- tarefas movidas para uma extensão oficial (`io.modelcontextprotocol/tasks`);
- padrão Multi Round-Trip Requests, substituindo requisições iniciadas pelo servidor (incluindo elicitação);
- propagação de contexto OpenTelemetry (`traceparent`, `tracestate`, `baggage`) documentada em `_meta`;
- depreciação de Roots, Sampling e Logging, e do Dynamic Client Registration em favor de Client ID Metadata Documents;
- política formal de ciclo de vida, com janela mínima de 12 meses para depreciação.

### Autorização no MCP **[FATO]**

Para transportes HTTP, servidores MCP são resource servers OAuth 2.1; devem validar a audiência do token; clientes devem usar Resource Indicators (RFC 8707); e o servidor **não deve** repassar o token recebido a APIs upstream ([MCP Authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)). As boas práticas de segurança detalham ataques de confused deputy, token passthrough, SSRF, sequestro de sessão e minimização de escopo ([Security Best Practices](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices)).

### Pergunta crítica: qual é o papel do MCP nessa arquitetura?

**É a interface padronizada entre o agente e o catálogo de ferramentas.** Ele resolve descoberta, schema de chamada e um modelo de autorização. **[INFERÊNCIA]**

| O MCP resolve | O MCP **não** resolve |
| --- | --- |
| como o agente descobre e chama ferramentas | a regra de negócio por trás da ferramenta |
| um contrato comum para vários frameworks de agente | a integração com o SoR (continua sendo API, evento, workflow) |
| autorização OAuth no acesso ao servidor | a modelagem de permissões de negócio |
| propagação de contexto de trace | a observabilidade do SoR |

**[RECOMENDAÇÃO]** Servidores MCP finos, por domínio, mantidos pelo time do domínio, chamando BFF e APIs. Não um "servidor MCP corporativo" central com todas as ferramentas.

## 7. A2A e multi-agente

O A2A é um padrão aberto para comunicação entre agentes, hoje sob a Linux Foundation, com comitê técnico que inclui AWS, Cisco, Google, IBM Research, Microsoft, Salesforce, SAP e ServiceNow. **[FATO]** ([A2A](https://a2a-protocol.org/latest/)) A presença de fornecedores de HCM, ITSM e CRM no comitê sugere que agentes desses fornecedores tendem a expor interfaces A2A. **[INFERÊNCIA]**

### Quando usar multi-agente

| Use quando | Evite quando |
| --- | --- |
| domínios têm donos, ferramentas e políticas muito diferentes | um agente com ferramentas filtradas resolve |
| agentes de fornecedores (HCM, ITSM) já existem e precisam ser orquestrados | a divisão é só "organização de prompt" |
| isolamento de permissões entre domínios é requisito | latência é crítica |

**[RECOMENDAÇÃO]** Começar com **um agente de entrada** com catálogo de ferramentas filtrado por intenção. Evoluir para agentes de domínio só quando houver fronteira de dono, de política ou de fornecedor.

## 8. Guardrails

| Ponto | Guardrail |
| --- | --- |
| Entrada | detecção de injeção de prompt; limite de tamanho; classificação de dados sensíveis |
| Conteúdo recuperado | tratar como **dado não confiável**; nunca como instrução |
| Seleção de ferramentas | catálogo filtrado por perfil e intenção |
| Argumentos | validação de schema; valores resolvidos por identidade, não pelo texto ("meu colaborador" vem do IdP) |
| Ação | política externa (motor de políticas) decide se a ação é permitida |
| Saída | mascaramento de dados pessoais; verificação de grounding |
| Execução | limite de passos, de tempo e de custo por tarefa |

A OWASP define **Excessive Agency** como a vulnerabilidade que permite ações danosas em resposta a saídas inesperadas, ambíguas ou manipuladas de um LLM, com três causas: funcionalidade, permissões e autonomia excessivas. **[FATO]** ([OWASP LLM06:2025](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/))

## 9. Pergunta crítica: como testar agentes?

| Nível | O que testar | Técnica |
| --- | --- | --- |
| Ferramenta | contrato, idempotência, autorização | testes convencionais |
| Seleção de ferramenta | para a intenção X, a ferramenta Y com argumentos corretos | conjuntos de avaliação com asserções sobre as tool calls |
| Trajetória | sequência de passos aceitável | avaliação de trajetória com critérios (não exige caminho único) |
| Resultado | objetivo alcançado, sem efeitos indevidos | ambiente de teste com SoRs simulados |
| Segurança | injeção, escalada, vazamento | red teaming automatizado e manual |
| Regressão | mudança de modelo, prompt ou ferramenta | suíte de avaliação em CI com limiares |
| Produção | taxa de resolução, escalonamentos, feedback | avaliação contínua amostral |

**[RECOMENDAÇÃO]** Tratar instruções, catálogo de ferramentas e versão do modelo como **artefatos versionados** que só mudam com a suíte de avaliação aprovada.

## 10. Execução autônoma: até onde?

| Nível de autonomia | Exemplo | Controle |
| --- | --- | --- |
| 0. Informa | responde com fontes | nenhum |
| 1. Sugere | propõe a ação e prepara o formulário | o usuário executa |
| 2. Executa com confirmação | resume e pede "confirmar" | interrupção HITL |
| 3. Executa e notifica | ações reversíveis de baixo risco | desfazer disponível; auditoria |
| 4. Executa sem humano | rotinas de baixíssimo risco | política explícita; monitoramento |

**[RECOMENDAÇÃO]** Em uma organização de setor regulado, ações com efeito financeiro, legal ou sobre dados sensíveis ficam no nível 2 no máximo, até haver evidência acumulada de segurança.

## 11. Maturidade

- Tool calling: **maduro** nos principais modelos. **[INFERÊNCIA]**
- MCP: **em consolidação**, com especificação versionada e política de depreciação, mas com mudanças incompatíveis recentes. **[FATO]** sobre as mudanças.
- A2A: **emergente**, com governança forte. **[INFERÊNCIA]**
- Multi-agente em produção corporativa: **experimental a emergente**. **[INFERÊNCIA]**

## Fontes

- Anthropic, Building effective agents (19/12/2024): https://www.anthropic.com/engineering/building-effective-agents
- MCP changelog 2026-07-28: https://modelcontextprotocol.io/specification/2026-07-28/changelog
- MCP Authorization (2025-06-18): https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
- MCP Security Best Practices: https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices
- A2A Protocol: https://a2a-protocol.org/latest/
- OWASP, LLM06:2025 Excessive Agency: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/
