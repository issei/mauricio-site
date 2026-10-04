---
titulo: Perguntas críticas 1 a 15 — EXP, MACH, AG-UI, Generative UI, Design System, conhecimento, RAG, agentes, MCP e BFF
modulo: Decisão
nivel: Avançado
ultima_atualizacao: 2026-10-03
tags: [perguntas-criticas, exp, mach, ag-ui, generative-ui, determinismo, design-system, rag, permission-aware, agentes, workflow, mcp, bff]
---

# Perguntas críticas 1 a 15

Este arquivo responde, de forma direta e autocontida, às primeiras quinze perguntas críticas do estudo sobre a evolução de um portal corporativo para um Digital Workplace orientado a intenção e agentes. Cada resposta traz a conclusão, a justificativa e o arquivo onde o tema é aprofundado. As perguntas 16 a 30 estão em `05_decisao/perguntas_criticas_16_a_30.md`. Rótulos: **[FATO]**, **[INFERÊNCIA]**, **[HIPÓTESE]**, **[RECOMENDAÇÃO]**.

---

### 1. O que diferencia uma intranet moderna de uma EXP?

**Resposta:** a intranet **informa e encaminha**; a EXP **executa e acompanha**. **[INFERÊNCIA]**

- A intranet organiza páginas e audiências; a EXP organiza **serviços e jornadas** sobre os sistemas de registro.
- A intranet mede alcance; a EXP mede **resolução** e **esforço**.
- A EXP mantém **contexto** do colaborador (perfil, estado de solicitações) e entrega em vários canais.

Muitos portais corporativos de grande porte já têm traços de EXP: autosserviço, ponto, abertura de casos, assistente virtual. **[INFERÊNCIA]** Aprofundamento: `03_pilares/exp_digital_workplace_composable_mach.md`.

### 2. Uma EXP precisa ser composable?

**Resposta:** não necessariamente. **[INFERÊNCIA]**

A componibilidade serve para trocar partes, permitir entregas paralelas de vários times e reutilizar capacidades em vários canais. Ela se paga quando há muitos domínios, muitos canais e estratégia de troca de fornecedores. Para agentes, o requisito real é que **as capacidades estejam expostas por contrato**. Uma suíte com boas APIs atende melhor um agente do que uma arquitetura componível sem contratos estáveis.

### 3. MACH é requisito arquitetural ou apenas uma estratégia possível?

**Resposta:** estratégia possível. **[RECOMENDAÇÃO]**

- Definição clássica: Microservices, API-first, Cloud-native SaaS, Headless. A MACH Alliance hoje apresenta o framework como **Open, Composable, Connected**, mencionando agentes. **[FATO]** ([MACH Alliance](https://machalliance.org/mach-explained))
- A MACH Alliance é uma associação de fornecedores; seu material é posicionamento de mercado. **[INFERÊNCIA]**
- API-first e headless são valiosos para agentes; microsserviços só onde há fronteira organizacional.

### 4. Onde AG-UI realmente se encaixa?

**Resposta:** entre o **runtime do agente** e a **aplicação que o usuário opera**. **[FATO]** sobre o papel declarado ([AG-UI](https://docs.ag-ui.com/agentic-protocols.md)).

O MCP conecta agente e ferramentas; o A2A conecta agentes; o AG-UI conecta o agente ao usuário, por meio da aplicação, com eventos de execução, texto, tool calls, raciocínio, estado, atividade e subagentes. Ele **não** se encaixa na integração com SoRs nem na autorização. Aprofundamento: `03_pilares/ag_ui_protocolo_eventos_e_estado.md`.

### 5. AG-UI é protocolo de UI, integração ou interação?

**Resposta:** **interação.** **[FATO]**

A documentação o define como "User Interaction protocol" que fornece a conexão de runtime bidirecional entre agente e aplicação, e distingue esse papel das especificações de UI generativa (A2UI, MCP-UI, Open-JSON-UI). ([AG-UI](https://docs.ag-ui.com/concepts/generative-ui-specs.md)) Não é protocolo de UI (não define componentes) nem de integração (não conecta SoRs).

### 6. Qual é a relação entre AG-UI e Generative UI?

**Resposta:** **canal e vocabulário.** **[FATO]** + **[INFERÊNCIA]**

As especificações de Generative UI definem **o que** renderizar; o AG-UI **transporta** esses pedidos até o cliente e traz as ações de volta, e declara suporte às três especificações principais. ([AG-UI](https://docs.ag-ui.com/concepts/generative-ui-specs.md)) Na prática, ferramentas de frontend do AG-UI podem pedir a renderização de componentes do catálogo.

### 7. Como preservar determinismo em uma interface generativa?

**Resposta:** determinismo **onde importa**, adaptação no restante. **[RECOMENDAÇÃO]**

- Determinísticos: renderização de cada componente, validação de props, execução de ações, componentes de confirmação e avisos legais.
- Adaptativos e restritos: escolha do componente (catálogo por contexto), texto explicativo, composição dentro de templates.
- Intenções de alto volume com templates fixos; composição livre só na cauda longa.

Aprofundamento: `03_pilares/generative_ui_design_system_e_component_registry.md`.

### 8. Como um Design System pode se tornar consumível por agentes?

**Resposta:** transformando componentes em **ferramentas tipadas e descritas** em um **Component Registry**. **[RECOMENDAÇÃO]**

1. Descrição semântica de quando usar e quando não usar.
2. JSON Schema das props.
3. Ações emitidas e indicação de efeito colateral.
4. Contexto exigido (perfil, autenticação).
5. Auditoria de acessibilidade por componente.
6. Tokens padronizados (formato W3C Design Tokens CG, estável desde 2025.10). **[FATO]** ([W3C CG](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/))
7. Avaliações que verificam se o agente escolhe o componente certo.

### 9. Qual é a relação entre ECM, CSP, Headless Content, Search e RAG?

**Resposta:** uma **cadeia** em que cada elo herda a qualidade do anterior e não consegue corrigi-la. **[INFERÊNCIA]**

ECM guarda registros governados; CSP os expõe como serviços (termo que a Gartner adotou em 2017 no lugar de ECM, [TechTarget](https://www.techtarget.com/searchcontentmanagement/definition/Content-services-platform)) **[FATO]**; Headless estrutura conteúdo de experiência para vários canais; Search encontra o trecho certo para a pessoa certa; RAG gera a resposta fundamentada. Aprofundamento: `04_transversais/cadeia_do_conhecimento_ecm_ao_agente.md`.

### 10. O que precisa estar estruturado antes de implementar RAG?

**Resposta (bloqueantes):** **[RECOMENDAÇÃO]**

- fonte canônica por tipo de conteúdo;
- permissões explícitas e exportáveis ao índice;
- status e vigência em conteúdo normativo;
- dono de cada conteúdo;
- classificação da informação com regra de uso por IA;
- conjunto de avaliação com perguntas reais.

Fortemente recomendados: taxonomia e sinônimos, metadados de aplicabilidade, estrutura de seções, eventos de ciclo de vida, deduplicação.

### 11. Como garantir permission-aware retrieval?

**Resposta:** **pré-filtro de permissão no índice**, com identidade resolvida pelo IdP. **[RECOMENDAÇÃO]**

1. Permissões como metadados de cada chunk, herdadas da origem.
2. Filtro aplicado na consulta, nunca depois que o modelo viu o conteúdo.
3. Sincronização orientada a eventos, com SLO de propagação.
4. Testes contínuos de vazamento com identidades de baixo privilégio.
5. Revisão de oversharing antes de indexar.

Exemplo público do princípio: o Microsoft 365 Copilot só exibe dados aos quais o usuário tem ao menos permissão de visualização. **[FATO]** ([Microsoft Learn](https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy))

### 12. Quando um chatbot deixa de ser chatbot e passa a ser agente?

**Resposta:** quando **decide dinamicamente o próximo passo**, **usa ferramentas com efeito** e **itera até o objetivo**. **[INFERÊNCIA]**

Um bot que só responde, mesmo com LLM, é chatbot ou RAG. Um bot de fluxos que abre chamados é automação. A mudança importa porque **os controles de segurança precisam acompanhar**: quem executa ações precisa de identidade delegada, escopo e HITL.

### 13. O que diferencia um agente de um workflow automatizado?

**Resposta:** **quem define a sequência.** **[FATO]**

Workflows são "sistemas em que LLMs e ferramentas são orquestrados por caminhos de código pré-definidos"; agentes são "sistemas em que LLMs dirigem dinamicamente seus próprios processos e uso de ferramentas". ([Anthropic](https://www.anthropic.com/engineering/building-effective-agents)) Workflows ganham em previsibilidade e testabilidade; agentes, em flexibilidade para a cauda longa. **[RECOMENDAÇÃO]** Em processos regulados, preferir workflows com etapas de LLM.

### 14. Qual é o papel do MCP nessa arquitetura?

**Resposta:** **interface padronizada entre o agente e o catálogo de ferramentas**, com modelo de autorização especificado. **[INFERÊNCIA]**

- Resolve: descoberta, schema de chamada, autorização OAuth no acesso ao servidor, propagação de trace (revisão 2026-07-28). **[FATO]** ([changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog))
- Não resolve: regra de negócio, integração com SoRs, processos longos, eventos.
- Exige: validação de audiência e proibição de token passthrough. **[FATO]** ([MCP Authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization))

**[RECOMENDAÇÃO]** Servidores MCP finos por domínio, chamando BFF e APIs; encapsular o protocolo, dada a velocidade de mudança.

### 15. Qual é o papel do BFF quando agentes possuem ferramentas?

**Resposta:** **moldar as capacidades para o canal agente.** **[RECOMENDAÇÃO]**

- Reduzir payload e ruído (tokens custam e confundem).
- Agregar consultas frequentes em uma chamada.
- Normalizar erros em mensagens explicáveis.
- Impor paginação e limites.
- Aplicar políticas específicas do canal agente.

O BFF não contém regra de negócio; o MCP (se usado) define **como** a ferramenta é chamada, e o BFF define **o que** ela devolve. Padrão original: [Sam Newman](https://samnewman.io/patterns/architectural/bff/). Aprofundamento: `03_pilares/camada_de_integracao_bff_eventos_workflows.md`.

## Fontes

- MACH Alliance: https://machalliance.org/mach-explained
- AG-UI, MCP, A2A e AG-UI: https://docs.ag-ui.com/agentic-protocols.md
- AG-UI, Generative UI specs: https://docs.ag-ui.com/concepts/generative-ui-specs.md
- W3C Design Tokens CG: https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/
- TechTarget, CSP: https://www.techtarget.com/searchcontentmanagement/definition/Content-services-platform
- Microsoft Learn, Copilot privacy: https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy
- Anthropic, Building effective agents: https://www.anthropic.com/engineering/building-effective-agents
- MCP changelog 2026-07-28: https://modelcontextprotocol.io/specification/2026-07-28/changelog
- MCP Authorization: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
- Sam Newman, BFF: https://samnewman.io/patterns/architectural/bff/
