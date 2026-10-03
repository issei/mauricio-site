---
titulo: Roteiro de estudo por perfil e métricas de maturidade do Digital Workplace agêntico
modulo: Evolução
nivel: Fundação
ultima_atualizacao: 2026-10-03
tags: [roteiro-de-estudo, trilhas-de-leitura, perfis, metricas, maturidade, kpis, avaliacao, aprendizado]
---

# Roteiro de estudo por perfil e métricas de maturidade

Este arquivo tem duas funções. A primeira é orientar a **leitura do estudo** conforme o perfil de quem lê (arquiteto, produto, UX, IA, plataforma, conteúdo, segurança), com objetivos de aprendizagem e exercícios. A segunda é consolidar as **métricas de maturidade** que permitem acompanhar a evolução da plataforma, por dimensão e por estágio. Ele pode ser usado tanto como guia de estudo individual quanto como base de um programa de formação interno.

## 1. Núcleo comum (todos os perfis)

Leitura obrigatória, nesta ordem:

1. `01_contexto/sumario_executivo_e_definicao_do_problema.md`: o problema e a visão geral.
2. `01_contexto/questoes_abertas_e_research_gaps.md`: o que não se sabe e quais lacunas de pesquisa permanecem.
3. `04_transversais/arquitetura_de_referencia_integrada.md`: o modelo comum de camadas.
4. `06_evolucao/modelo_de_maturidade_cinco_estagios.md`: a escala de evolução.
5. `05_decisao/anti_patterns.md`: os erros a evitar.

**Objetivo de aprendizagem:** conseguir explicar a diferença entre portal que apresenta e plataforma que resolve, e por que agentes dependem de fundações.

## 2. Trilhas por perfil

### 2.1 Arquiteto corporativo ou de solução

| Ordem | Arquivo | Foco |
| --- | --- | --- |
| 1 | `02_analise_multidisciplinar/arb_enterprise_e_integration_architect.md` | capacidades, domínios, RNFs |
| 2 | `03_pilares/camada_de_integracao_bff_eventos_workflows.md` | API × eventos × workflow |
| 3 | `04_transversais/fluxo_agente_ag_ui_ferramentas_processos.md` | fluxo ponta a ponta |
| 4 | `05_decisao/tradeoffs_e_paradoxos_arquiteturais.md` | decisões |
| 5 | `05_decisao/matriz_tecnologica.md` | alternativas |

**Exercício:** escolher uma intenção real e desenhar o fluxo pelas camadas, marcando onde ficam regra, estado, autorização e auditoria.

### 2.2 Product manager

| Ordem | Arquivo | Foco |
| --- | --- | --- |
| 1 | `02_analise_multidisciplinar/arb_produto_e_processos.md` | intenções, personas, métricas |
| 2 | `03_pilares/exp_digital_workplace_composable_mach.md` | EXP, jornadas, omnichannel |
| 3 | `04_transversais/ux_experiencia_orientada_a_intencao.md` | medição de DEX |
| 4 | `06_evolucao/roadmap_e_dependencias.md` | sequência e piloto |

**Exercício:** montar o ranking das 20 intenções mais frequentes a partir de dados disponíveis e classificar cada uma por volume, risco e viabilidade.

### 2.3 UX designer ou service designer

| Ordem | Arquivo | Foco |
| --- | --- | --- |
| 1 | `02_analise_multidisciplinar/arb_ux_e_frontend_architect.md` | interação híbrida |
| 2 | `04_transversais/ux_experiencia_orientada_a_intencao.md` | padrões, handoff, a11y |
| 3 | `03_pilares/generative_ui_design_system_e_component_registry.md` | catálogo de componentes |
| 4 | `03_pilares/ag_ui_protocolo_eventos_e_estado.md` | o que o protocolo permite na UI |

**Exercício:** especificar três componentes de agente (confirmação, progresso, fontes) com quando usar, props e requisitos de acessibilidade.

### 2.4 Especialista em IA

| Ordem | Arquivo | Foco |
| --- | --- | --- |
| 1 | `02_analise_multidisciplinar/arb_ia_conteudo_e_busca.md` | taxonomia de agentes |
| 2 | `03_pilares/agentes_tool_calling_mcp_a2a.md` | ferramentas, MCP, A2A, testes |
| 3 | `03_pilares/enterprise_search_rag_e_knowledge_graphs.md` | busca e RAG |
| 4 | `04_transversais/cadeia_do_conhecimento_ecm_ao_agente.md` | pré-requisitos de RAG |
| 5 | `03_pilares/ag_ui_protocolo_eventos_e_estado.md` | interação com a UI |

**Exercício:** construir um conjunto de avaliação com 30 perguntas reais, documentos de referência e critérios de groundedness.

### 2.5 Engenheiro de plataforma ou SRE

| Ordem | Arquivo | Foco |
| --- | --- | --- |
| 1 | `02_analise_multidisciplinar/arb_seguranca_governanca_e_sre.md` | visão dos três planos |
| 2 | `04_transversais/operacao_observabilidade_sre_dex.md` | traces, SLOs, incidentes |
| 3 | `03_pilares/frontend_modular_microfrontends_ssr_cdn.md` | streaming, CDN |
| 4 | `03_pilares/camada_de_integracao_bff_eventos_workflows.md` | resiliência |

**Exercício:** definir SLIs e SLOs para uma intenção, incluindo um SLO de qualidade com error budget e o runbook de violação.

### 2.6 Especialista em conteúdo

| Ordem | Arquivo | Foco |
| --- | --- | --- |
| 1 | `03_pilares/ecm_csp_headless_content_governanca.md` | modelo de conteúdo |
| 2 | `04_transversais/cadeia_do_conhecimento_ecm_ao_agente.md` | cadeia até o agente |
| 3 | `03_pilares/enterprise_search_rag_e_knowledge_graphs.md` | o que a busca exige |

**Exercício:** aplicar o conjunto mínimo de metadados a dez normativos reais e identificar lacunas de vigência, dono e permissão.

### 2.7 Profissional de segurança e compliance

| Ordem | Arquivo | Foco |
| --- | --- | --- |
| 1 | `04_transversais/seguranca_iam_identidade_do_agente.md` | delegação, PEP/PDP, ameaças |
| 2 | `04_transversais/governanca_dados_lgpd_ai_governance.md` | LGPD, lineage, retenção |
| 3 | `03_pilares/agentes_tool_calling_mcp_a2a.md` | autorização do MCP, guardrails |
| 4 | `05_decisao/perguntas_criticas_16_a_30.md` | identidade, auditoria |

**Exercício:** classificar dez ferramentas hipotéticas por risco e definir, para cada uma, escopo, nível de autonomia e regra de HITL.

## 3. Exercício integrador (grupo multidisciplinar)

**[RECOMENDAÇÃO]** Um workshop com um representante de cada perfil:

1. Escolher uma jornada (ex.: férias).
2. Cada perfil analisa a jornada pela própria lente, isoladamente (como no ARB deste estudo).
3. Consolidar usando a `02_analise_multidisciplinar/matriz_de_responsabilidades_entre_papeis.md`.
4. Identificar conflitos e resolvê-los com os padrões de `05_decisao/tradeoffs_e_paradoxos_arquiteturais.md`.
5. Posicionar a jornada no modelo de maturidade e definir a próxima fase.

## 4. Métricas de maturidade

### 4.1 Métricas por dimensão

| Dimensão | Métrica | Como medir | Estágio em que se torna relevante |
| --- | --- | --- | --- |
| Produto | resolução sem humano por intenção | telemetria + recontato | 2 |
| Produto | tempo até a resolução | do pedido ao resultado no SoR | 2 |
| Produto | esforço percebido | pesquisa curta pós-interação | 2 |
| Integração | % das capacidades prioritárias com API e contrato versionado | catálogo | 3 |
| Integração | % das capacidades com SLO publicado | catálogo | 3 |
| Processo | % de processos prioritários com dono, regra explícita e fila de exceção | inventário | 3 |
| Conteúdo | % do conteúdo indexado com vigência, dono e permissão | validação de metadados | 4 |
| Conteúdo | tempo de propagação de revogação ao índice | eventos | 4 |
| Busca | recall@k e nDCG no conjunto de avaliação | avaliação | 4 |
| Busca | vazamentos em testes de permissão | testes contínuos (meta: zero) | 4 |
| IA | groundedness amostral | avaliação | 4 |
| IA | acurácia de seleção de ferramentas | avaliação | 5 |
| Segurança | % das ferramentas com token delegado e escopo mínimo | catálogo | 5 |
| Segurança | % das ações com efeito com confirmação registrada | auditoria | 5 |
| UX | % das telas do agente compostas só por componentes do catálogo | telemetria de renderização | 5 |
| UX | taxa de edição em confirmações | telemetria | 5 |
| Operação | % das execuções com trace ponta a ponta | observabilidade | 4 |
| Operação | cumprimento dos SLOs de qualidade | painel | 5 |
| Custo | custo por intenção resolvida | observabilidade | 4 |
| Governança | % dos casos de uso de IA no inventário com avaliação aprovada | inventário | 4 |

### 4.2 Índice de prontidão agêntica por jornada

**[RECOMENDAÇÃO]** Uma pontuação simples de 0 a 2 por critério (0 = ausente, 1 = parcial, 2 = completo):

| Critério | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Intenção priorizada com linha de base | — | — | — |
| Processo explícito com dono | — | — | — |
| APIs com contrato | — | — | — |
| Identidade delegada | — | — | — |
| Conteúdo governado | — | — | — |
| Busca com permissões | — | — | — |
| Componentes no catálogo | — | — | — |
| Conjunto de avaliação | — | — | — |
| Observabilidade e auditoria | — | — | — |
| Aprovação de governança | — | — | — |

- **0 a 9:** a jornada não está pronta para IA; trabalhar fundações.
- **10 a 15:** pronta para RAG e ferramentas de leitura.
- **16 a 20:** pronta para ações com confirmação.

### 4.3 Sinais de regressão

- queda de groundedness após mudança de modelo ou de chunking;
- aumento da taxa de edição em confirmações (coleta pior);
- aumento de escalonamentos por "não entendi";
- crescimento do custo por intenção sem ganho de resolução;
- conteúdo citado com idade média crescente (curadoria parada).

## 5. Fontes para aprofundamento

| Tema | Fonte primária |
| --- | --- |
| AG-UI | https://docs.ag-ui.com/llms.txt |
| MCP | https://modelcontextprotocol.io/specification/2026-07-28/changelog |
| A2A | https://a2a-protocol.org/latest/ |
| Agentes e workflows | https://www.anthropic.com/engineering/building-effective-agents |
| Generative UI declarativa | https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/ |
| MCP Apps | https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/ |
| Delegação OAuth | https://www.rfc-editor.org/rfc/rfc8693.html |
| Riscos de LLM | https://genai.owasp.org/llm-top-10/ |
| Governança de IA | https://www.nist.gov/itl/ai-risk-management-framework |
| SLOs | https://sre.google/sre-book/service-level-objectives/ |
| RAG | https://arxiv.org/abs/2005.11401 |
| Contexto longo | https://arxiv.org/abs/2307.03172 |
| GraphRAG | https://arxiv.org/abs/2404.16130 |
| Design tokens | https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/ |
| LGPD | https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm |
