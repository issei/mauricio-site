---
titulo: Matriz tecnológica — tecnologias e padrões do Digital Workplace agêntico por problema, camada, dependências, trade-offs, riscos e maturidade
modulo: Decisão
nivel: Avançado
ultima_atualizacao: 2026-10-03
tags: [matriz-tecnologica, technology-landscape, maturidade, trade-offs, ag-ui, mcp, a2a, rag, busca-hibrida, bff, kafka, cdc, micro-frontends]
---

# Matriz tecnológica: tecnologias e padrões por problema, camada, trade-offs, riscos e maturidade

Este arquivo reúne, em formato de consulta, as tecnologias e os padrões discutidos no estudo. Nenhuma linha classifica uma tecnologia como "boa" ou "ruim": cada uma indica **que problema resolve**, **em que contexto faz sentido** e **o que custa**. A maturidade reflete o estado em outubro de 2026, com base nas fontes citadas. Nenhuma tecnologia aqui é atribuída a uma organização específica.

## 1. Escala de maturidade usada

| Nível | Significado |
| --- | --- |
| **Madura** | amplamente usada em produção há anos; padrões e riscos conhecidos |
| **Em consolidação** | especificação ou prática estabelecida, mas com mudanças relevantes recentes ou ecossistema em formação |
| **Emergente** | especificação inicial ou poucos casos públicos em produção corporativa |
| **Experimental** | pesquisa ou propostas sem estabilidade |

## 2. Camada de experiência

| Tecnologia/padrão | Problema | Camada | Dependências | Benefícios | Trade-offs | Riscos | Maturidade | Faz sentido quando |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Design System + tokens (formato W3C CG 2025.10)** | inconsistência visual e de acessibilidade entre times e canais | Experiência | time dedicado, ferramentas de design | coerência, a11y certificada por componente | investimento contínuo | virar gargalo se centralizado demais | Madura (prática); formato de tokens estável desde 2025.10 ([W3C CG](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)) | sempre |
| **Component Registry para agentes** | UI gerada sem governança | Experiência / Agente | Design System, schemas de props | UI adaptativa e segura | catálogo limita a expressividade | catálogo grande confunde o modelo | Emergente | há UI generativa |
| **A2UI** | descrever UI de forma declarativa e segura | Experiência | renderer no cliente, catálogo | não executa código; streaming | v0.8; ecossistema em formação | mudanças de especificação | Emergente ([Google, v0.8](https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/)) | UI multiplataforma com renderização nativa |
| **MCP Apps (SEP-1865)** | ferramentas que trazem sua própria UI | Experiência / Ferramentas | host compatível, iframes sandbox | isolamento forte; UI do domínio | consistência visual depende do servidor | proposta recente | Emergente ([MCP Blog](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/)) | UIs ricas de domínios específicos, em hosts compatíveis |
| **Micro-frontends (Module Federation)** | deploy independente de vários times no mesmo shell | Experiência | plataforma de front-end, versionamento | autonomia | complexidade, dependências compartilhadas | monólito distribuído | Madura | ≥ 3 times com ritmos diferentes |
| **single-spa** | convivência de frameworks diferentes | Experiência | orquestrador | migração gradual | complexidade alta | bundle e depuração | Madura | migração de legado |
| **SSR / SSG + CDN** | desempenho e cache de conteúdo | Experiência | CDN, pipeline | primeira carga rápida | personalização limita cache | dados pessoais em cache | Madura | conteúdo editorial |
| **Edge SSR** | latência em páginas dinâmicas | Experiência | provedor de borda | latência baixa | lógica e dados na borda | residência de dados | Em consolidação | público distribuído e páginas dinâmicas não sensíveis |

## 3. Camada de interação e agentes

| Tecnologia/padrão | Problema | Camada | Dependências | Benefícios | Trade-offs | Riscos | Maturidade | Faz sentido quando |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **AG-UI** | padronizar a conversa em tempo real entre agente e aplicação | Interação | runtime compatível, SSE | eventos padronizados, estado, interrupções formais | protocolo novo, adaptadores | rascunho em evolução; eventos customizados | Em consolidação (spec 1.0) ([AG-UI](https://docs.ag-ui.com/llms.txt)) | UI rica com agente, múltiplos frameworks |
| **SSE** | streaming servidor → cliente | Interação | HTTP, proxies sem buffer | simples, compatível | unidirecional | timeouts de proxy | Madura | transporte padrão do AG-UI |
| **WebSockets** | canal bidirecional persistente | Interação | infraestrutura de conexões | baixa latência bidirecional | estado de conexão, escala | não é binding padrão do AG-UI | Madura (tecnologia) | colaboração em tempo real |
| **LLM gerenciado** | interpretação e geração | Agente | contrato, rede, governança | capacidade de ponta, sem operar GPUs | dados saem do perímetro (salvo acordos) | residência de dados, custo variável | Madura | dados permitidos pela classificação |
| **LLM auto-hospedado** | soberania e controle | Agente | GPUs, MLOps | controle total | capacidade e custo operacional | defasagem de capacidade | Em consolidação | dados muito sensíveis, requisitos de soberania |
| **Workflows com etapas de LLM** | IA em processos previsíveis | Agente / Processo | motor de workflow | previsível, testável | menos flexível | — | Madura (padrão) ([Anthropic](https://www.anthropic.com/engineering/building-effective-agents)) | processos conhecidos |
| **Agente com ferramentas** | resolver intenções variadas | Agente | ferramentas, identidade, HITL | flexibilidade | menor previsibilidade | excesso de agência | Em consolidação | cauda longa de intenções |
| **Multi-agente** | separar domínios, donos e políticas | Agente | A2A ou orquestração própria | isolamento por domínio | latência, depuração | complexidade sem ganho | Emergente | fronteiras reais de dono, política ou fornecedor |
| **MCP** | padronizar acesso de agentes a ferramentas | Agente / Integração | servidores por domínio, OAuth | reuso entre frameworks; autorização especificada | mudanças incompatíveis recentes | tratar como integração universal | Em consolidação (rev. 2026-07-28) ([changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)) | vários agentes ou frameworks consumindo as mesmas ferramentas |
| **A2A** | comunicação entre agentes | Agente | agentes compatíveis | interoperar com agentes de fornecedores | maturidade | governança de confiança entre agentes | Emergente ([A2A](https://a2a-protocol.org/latest/)) | orquestrar agentes de HCM, ITSM, CRM |

## 4. Camada de conhecimento

| Tecnologia/padrão | Problema | Camada | Dependências | Benefícios | Trade-offs | Riscos | Maturidade | Faz sentido quando |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **ECM/CSP** | registros governados, retenção | Conhecimento | records management | conformidade | rigidez | conteúdo preso em documentos | Madura | normativos e registros |
| **Headless CMS** | conteúdo estruturado multicanal | Conhecimento | modelo de conteúdo | reuso, APIs | não é records management | metadados fracos | Madura | conteúdo de experiência |
| **Busca lexical (BM25)** | termos exatos, siglas | Conhecimento | motor de busca | precisão em termos | sinônimos | — | Madura | sempre, como componente |
| **Busca vetorial** | perguntas em linguagem natural | Conhecimento | embeddings | paráfrases | termos raros, custo | similaridade ≠ validade | Madura (técnica) | combinada com lexical |
| **Busca híbrida + RRF** | robustez | Conhecimento | lexical + vetorial | melhor dos dois | calibração | — | Madura ([Elastic](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion), [OpenSearch](https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/)) | corpus corporativo heterogêneo |
| **Reranking** | precisão no topo | Conhecimento | modelo de rerank | qualidade | latência | — | Madura | RAG |
| **Banco vetorial dedicado** | escala vetorial | Conhecimento | metadados em outro lugar | desempenho | ACLs e lexical separados | vazamento por filtro fraco | Madura | volume vetorial muito alto |
| **Knowledge graph** | perguntas relacionais e globais | Conhecimento | ontologia, curadoria | explicabilidade | custo de manutenção | grafo desatualizado | Em consolidação | perguntas relacionais frequentes |
| **GraphRAG** | perguntas sobre o corpus inteiro | Conhecimento | extração de entidades | sínteses globais | custo de construção | — | Emergente ([Edge et al.](https://arxiv.org/abs/2404.16130)) | análises globais |
| **RAG clássico** | respostas fundamentadas | Conhecimento / Agente | busca de qualidade | citações | depende da busca | alucinação | Madura (padrão) | perguntas de política |
| **Agentic RAG** | perguntas compostas | Agente | ferramentas e índices | flexibilidade | latência e custo | menor testabilidade | Em consolidação | perguntas multi-fonte |

## 5. Camada de integração

| Tecnologia/padrão | Problema | Camada | Dependências | Benefícios | Trade-offs | Riscos | Maturidade | Faz sentido quando |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **API Gateway** | segurança e controle de borda | Integração | — | centraliza políticas de tráfego | ponto central | lógica de negócio no gateway | Madura | sempre que houver APIs expostas |
| **BFF** | adaptar APIs ao canal | Integração | dono por canal | APIs adequadas a cada canal | duplicação | virar monólito | Madura ([Sam Newman](https://samnewman.io/patterns/architectural/bff/)) | canais com necessidades distintas, inclusive o agente |
| **Kafka / plataforma de eventos** | distribuir fatos | Integração | operação, schemas | desacoplamento, replay | complexidade operacional | eventos usados como comandos | Madura | muitos produtores e consumidores |
| **CDC (Debezium)** | eventos a partir de legados | Integração | acesso ao log do banco | sem alterar o legado | acopla ao esquema | esquema interno como contrato | Madura ([Debezium](https://debezium.io/documentation/)) | legado sem eventos |
| **Outbox** | consistência estado + evento | Integração | banco transacional | sem perda de eventos | latência de publicação | — | Madura | serviços que publicam eventos |
| **Workflow engine** | processos longos e duráveis | Integração / Processo | motor, modelagem | durabilidade, visibilidade | curva de aprendizado | usar para chamadas simples | Madura ([Temporal](https://docs.temporal.io/), BPMN) | processos com etapas humanas e timers |
| **Saga** | transações distribuídas | Integração | compensações | consistência sem 2PC | complexidade | compensações incompletas | Madura | processos multi-SoR |
| **Service mesh** | mTLS, identidade e tráfego entre serviços | Plataforma | Kubernetes | segurança e telemetria uniformes | operação | sobrecarga para poucos serviços | Madura | dezenas de serviços em contêineres |

## 6. Camada transversal

| Tecnologia/padrão | Problema | Camada | Dependências | Benefícios | Trade-offs | Riscos | Maturidade | Faz sentido quando |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **OAuth 2.1 + Resource Indicators** | tokens com audiência correta | Segurança | IdP | token vinculado ao recurso | suporte do IdP | — | Madura | ferramentas por HTTP |
| **Token Exchange (RFC 8693)** | delegação sujeito + ator | Segurança | IdP compatível | rastreabilidade do agente | suporte desigual | impersonação acidental | Madura (RFC) ([RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html)) | agentes agindo em nome de usuários |
| **ABAC / ReBAC / policy-as-code** | autorização contextual | Segurança | motor de políticas | consistência e testes | governança das políticas | políticas sem dono | Madura | regras dependentes de contexto e relação |
| **SPIFFE** | identidade de carga de trabalho | Segurança | infraestrutura | identidade verificável de serviços | operação | — | Madura | runtime de agente como serviço |
| **OpenTelemetry + GenAI semconv** | observabilidade padronizada de agentes | Operação | coletor, backend | correlação ponta a ponta | convenções em evolução | dados pessoais em spans | Em consolidação ([OTel](https://github.com/open-telemetry/semantic-conventions-genai)) | sempre |
| **NIST AI RMF / ISO 42001** | governança de IA | Governança | processo organizacional | estrutura reconhecida | esforço de implantação | governança só documental | Madura (frameworks) | programa de IA corporativo |

## 7. O que é necessário e o que é alternativa

**Pergunta crítica 30: quais tecnologias são realmente necessárias e quais são apenas alternativas de implementação?**

| Necessário (capacidade) | Alternativas de implementação |
| --- | --- |
| Identidade federada com delegação | qualquer IdP com OAuth 2.x e token exchange ou mecanismo equivalente |
| Autorização no ponto do dado | RBAC + ABAC, ReBAC, motores OPA/Cedar, regras no próprio SoR |
| APIs com contrato para as capacidades usadas | REST, GraphQL, gRPC; via gateway e BFF ou diretamente |
| Processos duráveis com etapas humanas | Temporal, motores BPMN, workflow nativo do SoR ou da plataforma SaaS |
| Conteúdo com metadados, vigência e permissões | ECM/CSP, headless CMS, plataformas de produtividade |
| Busca com filtros de permissão e híbrida | Elasticsearch, OpenSearch, serviços gerenciados, combinações |
| Protocolo de interação agente ↔ UI | AG-UI, protocolo próprio, recursos da plataforma SaaS |
| UI generativa governada | A2UI, MCP Apps, Open-JSON-UI, schema próprio sobre o Design System |
| Interface padronizada de ferramentas | MCP, chamadas de função nativas do framework, integração direta |
| Observabilidade ponta a ponta | OpenTelemetry com qualquer backend compatível |
| Avaliação contínua | frameworks de avaliação diversos, ferramentas próprias |

**Não são requisitos:** micro-frontends, Kafka, service mesh, banco vetorial dedicado, multi-agente, MACH completo. Cada um faz sentido em contextos específicos, descritos nas tabelas acima. **[INFERÊNCIA]**

## Fontes

- W3C Design Tokens CG: https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/
- Google, A2UI: https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/
- MCP Blog, MCP Apps: https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/
- AG-UI llms.txt: https://docs.ag-ui.com/llms.txt
- Anthropic, Building effective agents: https://www.anthropic.com/engineering/building-effective-agents
- MCP changelog 2026-07-28: https://modelcontextprotocol.io/specification/2026-07-28/changelog
- A2A: https://a2a-protocol.org/latest/
- Elastic RRF: https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion
- OpenSearch hybrid search: https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/
- Edge et al., GraphRAG: https://arxiv.org/abs/2404.16130
- Sam Newman, BFF: https://samnewman.io/patterns/architectural/bff/
- Debezium: https://debezium.io/documentation/
- Temporal: https://docs.temporal.io/
- RFC 8693: https://www.rfc-editor.org/rfc/rfc8693.html
- OpenTelemetry GenAI semconv: https://github.com/open-telemetry/semantic-conventions-genai
