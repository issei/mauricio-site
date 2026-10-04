---
titulo: Arquitetura de referência integrada para um Digital Workplace orientado a intenção e agentes
modulo: Transversal — Arquitetura de referência
nivel: Avançado
ultima_atualizacao: 2026-10-03
tags: [arquitetura-de-referencia, camadas, experience-layer, agent-layer, exp, knowledge, integration, iam, governanca, observabilidade]
---

# Arquitetura de referência integrada para um Digital Workplace orientado a intenção e agentes

Este arquivo apresenta o modelo conceitual que conecta todos os pilares do estudo. Ele **não é uma arquitetura definitiva** nem uma descrição de um portal específico: é um **modelo de referência para investigação**, útil para posicionar decisões, identificar dependências e conversar entre disciplinas. Cada camada é descrita com sua responsabilidade, o que **não** é responsabilidade dela, suas interfaces e as decisões abertas.

## 1. Visão geral

```text
┌──────────────────────────────────────────────────────────────┐
│                         COLABORADOR                          │
└───────────────────────────────┬──────────────────────────────┘
                                │ intenção, navegação, confirmação
                                ▼
┌──────────────────────────────────────────────────────────────┐
│ EXPERIENCE LAYER                                             │
│ Web │ Mobile │ Teams/Slack │ Notificações │ Generative UI    │
│ Design System │ Component Registry │ Cliente AG-UI           │
└───────────────────────────────┬──────────────────────────────┘
                                │ AG-UI (eventos, estado, interrupções)
                                ▼
┌──────────────────────────────────────────────────────────────┐
│ AGENT / INTERACTION LAYER                                    │
│ Runtime de agente │ Instruções versionadas │ Estado da tarefa │
│ Roteamento de intenção │ Guardrails │ HITL │ Memória          │
│ Clientes MCP / A2A                                           │
└───────────────┬──────────────────────────────┬───────────────┘
                │ consulta de serviços/jornadas │ ferramentas
                ▼                              │
┌──────────────────────────────────────┐       │
│ EMPLOYEE EXPERIENCE PLATFORM         │       │
│ Catálogo de serviços │ Jornadas       │       │
│ Perfil e contexto │ Personalização    │       │
│ Notificações │ Estado de solicitações │       │
└───────────────┬──────────────────────┘       │
        ┌───────┴─────────────┐                │
        ▼                     ▼                ▼
┌──────────────────────┐  ┌───────────────────────────────────┐
│ KNOWLEDGE            │  │ INTEGRATION                        │
│ ECM/CSP │ Headless    │  │ Servidores MCP por domínio         │
│ Taxonomia │ Grafo     │  │ API Gateway │ BFF do agente        │
│ Ingestão │ Índice     │  │ APIs de domínio │ Workflow engine  │
│ híbrido com ACL       │  │ Eventos │ CDC │ Outbox             │
│ Retrieval │ RAG       │  └──────────────────┬────────────────┘
└──────────────────────┘                     │
                                             ▼
                               ┌───────────────────────────────┐
                               │ CORPORATE SYSTEMS (SoR)        │
                               │ HCM/Folha │ Ponto │ Benefícios │
                               │ ITSM │ IAM/IGA │ Atendimento   │
                               │ Legados │ Outros SoR           │
                               └───────────────────────────────┘

TRANSVERSAL (todas as camadas):
IAM e delegação │ Motor de políticas │ Segurança │ LGPD │ Governança de IA
Auditoria e lineage │ Observabilidade (traces, métricas, avaliações) │ SRE │ DEX
```

## 2. Responsabilidades por camada

### 2.1 Experience Layer

| É responsável por | **Não** é responsável por |
| --- | --- |
| renderizar componentes aprovados, em qualquer canal | decidir regras de negócio |
| capturar intenção, confirmações e edições | chamar SoRs diretamente |
| acessibilidade e consistência visual | guardar estado de processo |
| manter a conexão AG-UI e aplicar estado (snapshots, deltas) | autorizar ações (apenas reflete o que o backend permite) |

**Interfaces:** AG-UI com a camada de agentes; APIs da EXP para navegação tradicional; Content API para conteúdo editorial.

### 2.2 Agent / Interaction Layer

| É responsável por | **Não** é responsável por |
| --- | --- |
| interpretar intenção e planejar | ser a fonte da verdade de qualquer dado |
| escolher ferramentas do catálogo permitido | conter regras de elegibilidade |
| conduzir confirmações e interrupções | manter processos de longa duração |
| explicar resultados com fontes | decidir permissões |
| registrar a execução (trace) | integrar SoRs ponto a ponto |

**Interfaces:** AG-UI para a experiência; MCP ou integração direta para ferramentas; A2A para agentes de domínio ou de fornecedores; EXP para catálogo de serviços e jornadas; Knowledge para recuperação.

### 2.3 Employee Experience Platform

| É responsável por | **Não** é responsável por |
| --- | --- |
| catálogo de serviços e suas regras de exibição | executar a regra de negócio do domínio |
| definição de jornadas (inclusive cross-domain) | interpretar linguagem natural |
| perfil e contexto do colaborador, com base legal | ser o repositório de conteúdo normativo |
| estado agregado de solicitações e notificações | |

**[INFERÊNCIA]** A EXP é o que permite que o agente e a navegação tradicional ofereçam **os mesmos serviços**, com as mesmas regras de exibição. Sem ela, o agente cria seu próprio catálogo paralelo.

### 2.4 Knowledge

| É responsável por | **Não** é responsável por |
| --- | --- |
| conteúdo canônico com metadados, vigência, dono e permissões | gerar respostas |
| índice híbrido com ACLs sincronizadas | decidir o que o usuário pode ver em tempo de geração |
| retrieval com filtros e reranking | |
| grafo de entidades de alto valor | |

### 2.5 Integration

| É responsável por | **Não** é responsável por |
| --- | --- |
| expor capacidades de domínio por contrato | conter regras de negócio |
| BFF adaptado ao canal agente | interpretar intenções |
| processos duráveis (workflow) | |
| distribuir eventos e projeções de leitura | |
| resiliência (timeouts, circuit breakers, idempotência) | |

### 2.6 Corporate Systems

Fonte da verdade e da regra. Mudam devagar; a arquitetura deve **protegê-los** de padrões de carga e de chamada introduzidos por agentes (rate limit, cache, projeções).

### 2.7 Transversal

| Preocupação | Onde é aplicada |
| --- | --- |
| Identidade e delegação | token do usuário na experiência; token delegado (sujeito + ator) em cada ferramenta |
| Política | motor de políticas consultado pelas ferramentas, pelo BFF e pela EXP |
| LGPD e governança de IA | catálogo de dados por ferramenta; retenção de logs; base legal |
| Auditoria e lineage | trace de execução com identidade, fontes, versões e decisões |
| Observabilidade | OpenTelemetry ponta a ponta, incluindo spans de agente |

## 3. Fluxos de referência

### 3.1 Pergunta de conhecimento

```text
Colaborador ──► Experience ──AG-UI──► Agente ──► Knowledge (busca com ACL)
                                         │
                                         └──► resposta com citações ──► Experience
```

### 3.2 Consulta transacional

```text
Agente ──► ferramenta "consultar_saldo" ──token delegado──► Gateway ──► BFF ──► API de ponto ──► SoR
```

### 3.3 Solicitação com efeito e aprovação

```text
Agente ──► monta rascunho (estado AG-UI) ──► componente de confirmação
   ──► usuário confirma ──► ferramenta "iniciar_solicitacao" (idempotente)
   ──► Workflow engine inicia processo ──► aprovação humana do gestor
   ──► evento "solicitacao.aprovada" ──► EXP notifica ──► agente informa
```

O detalhamento passo a passo está em `04_transversais/fluxo_agente_ag_ui_ferramentas_processos.md`.

## 4. Decisões abertas por camada

| Camada | Decisão | Alternativas |
| --- | --- | --- |
| Experience | shell próprio ou extensão da plataforma SaaS | ver `03_pilares/frontend_modular_microfrontends_ssr_cdn.md` |
| Experience | especificação de UI generativa | A2UI, MCP Apps, Open-JSON-UI, própria |
| Agent | agente da plataforma ou independente | ver `05_decisao/tradeoffs_e_paradoxos_arquiteturais.md` |
| Agent | um agente ou multi-agente | ver `03_pilares/agentes_tool_calling_mcp_a2a.md` |
| Agent | onde roda o modelo | gerenciado, nuvem privada, on-premises |
| EXP | construir, comprar ou usar a suíte existente | depende do inventário (gap G14) |
| Knowledge | motor de busca | ver `03_pilares/enterprise_search_rag_e_knowledge_graphs.md` |
| Integration | MCP direto aos domínios ou via BFF | ver `03_pilares/camada_de_integracao_bff_eventos_workflows.md` |
| Transversal | modelo de autorização | RBAC, ABAC, ReBAC, combinação |

## 5. Princípios arquiteturais derivados

**[RECOMENDAÇÃO]** Princípios que atravessam todas as camadas:

1. **A regra vive no domínio.** Nenhuma camada acima dos SoRs e dos serviços de domínio decide elegibilidade.
2. **Identidade se propaga, nunca se substitui.** Toda chamada carrega quem pediu e quem está agindo.
3. **O agente é um canal.** Usa a mesma EXP, as mesmas APIs e as mesmas políticas dos demais canais.
4. **UI generativa é composição de componentes aprovados.**
5. **Estado de processo é durável e externo ao agente.**
6. **Conhecimento é governado na origem.** O índice reflete; não corrige.
7. **Toda execução é reconstruível.** O trace permite responder "quem, o quê, com base em quê, com que autorização".
8. **Degradação graciosa.** Se o agente falhar, a navegação tradicional continua funcionando.
9. **Protocolos atrás de adaptadores.** AG-UI, MCP e A2A são encapsulados para absorver mudanças de especificação.

## 6. Como usar este modelo

- **Para avaliar o estado atual:** marcar, por camada, o que existe, o que é parcial e o que falta. Cruzar com `06_evolucao/modelo_de_maturidade_cinco_estagios.md`.
- **Para revisar propostas:** verificar se a proposta respeita as responsabilidades e os "não é responsável por" de cada camada.
- **Para planejar:** as camadas de baixo (Integration, Knowledge, IAM) são pré-requisito das de cima (Agent, Generative UI).

## Fontes

- Este modelo é uma **[RECOMENDAÇÃO]** do estudo, construída a partir dos pilares em `03_pilares/`.
- AG-UI, MCP, A2A e AG-UI (camadas de protocolo): https://docs.ag-ui.com/agentic-protocols.md
- MCP Authorization (propagação de identidade e proibição de token passthrough): https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
- RFC 8693, OAuth 2.0 Token Exchange: https://www.rfc-editor.org/rfc/rfc8693.html
- Sam Newman, BFF: https://samnewman.io/patterns/architectural/bff/
