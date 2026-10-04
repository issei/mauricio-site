# Digital Workplace agêntico — Do Portal ao Agente

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/digital-workplace-agentico>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-10-03 · Atualizado: 2026-10-03.

## Em síntese

É um portal corporativo que deixa de **organizar links** e passa a **resolver intenções**: o colaborador pede, o agente prepara, a pessoa confirma e o processo corre no sistema de registro. O agente é um elo de uma cadeia — **intenção, agente, conhecimento, ferramentas, processo, experiência** — e depende das fundações que atravessa: se um elo falta, ele herda a falha e não a corrige. Sem elas, passa a executar ações com credenciais amplas demais e sem trilha de auditoria.

- **Cinco estágios que se acumulam** — da intranet à plataforma agêntica; o modelo descreve o custo de cada salto de estágio, e a maturidade se avalia por jornada, não pelo portal inteiro.
- **Seis camadas e uma faixa transversal** — o estudo recomenda que a regra viva no domínio, que a identidade se propague e nunca se substitua, que o agente seja um canal e que a UI generativa componha componentes aprovados.
- **Autonomia sobe com evidência** — níveis de 0 a 4 por classe de ação; o estudo recomenda manter ações financeiras, legais ou sobre dados sensíveis no nível 2 (execução com confirmação) até haver evidência de segurança.
- **Caminho crítico** — identidade delegada e conteúdo governado com permissões costumam ser as dependências mais lentas (inferência do estudo); por isso o roadmap as começa na fase 0.

## A tese e suas fundações

Um agente corporativo depende das fundações que atravessa: intenção priorizada, conhecimento governado, identidade delegada, contratos de API e processos explícitos. A cadeia do estágio 5 — intenção, agente, conhecimento, ferramentas, processo de negócio, experiência dinâmica — dá ao agente o mesmo peso dos demais elos: se outro elo falha, ele herda a falha e não a corrige.

## Os cinco estágios

1. Intranet tradicional (conteúdo, links, sistemas): “onde fica?”. 2. Digital Workplace (conteúdo, serviços, personalização): “como peço?”. 3. EXP componível (APIs, headless, jornadas): “como resolvo de ponta a ponta?”. 4. AI-Enhanced Workplace (busca, RAG, copilots): “qual é a regra?”. 5. Agentic Workplace: “faça isso para mim”. No modelo proposto pelo estudo, cada estágio acumula os anteriores, e a maturidade se avalia por jornada: uma organização pode estar no estágio 5 para consultar saldo de férias e no 2 para solicitar acesso.

## Por onde começar

Por uma jornada piloto de alto volume e baixo risco, com seis fases de critério de passagem e sete trilhas paralelas. Identidade delegada (T2) e conteúdo governado (T3) costumam ser o caminho crítico e começam na fase 0. O estudo recomenda exigir evidência de segurança e de qualidade a cada ampliação de autonomia. O índice de prontidão agêntica, de 0 a 20, sugere o que a jornada suporta hoje.

## Conteúdo completo da página

Digital Workplace agêntico

### Do portal que apresenta à plataforma que resolve

Quem conduz um portal corporativo de grande porte ouve dois pedidos que se contradizem: “coloque um agente de IA na frente de tudo” e “primeiro arrume a casa”. Este estudo mostra, camada por camada, o que precisa existir antes de um agente agir em nome de um colaborador — e o que acontece quando alguma dessas camadas é pulada.

Um agente corporativo só é tão bom quanto as fundações que ele atravessa: intenção priorizada, conhecimento governado, identidade delegada, contratos de API e processos explícitos. Sem elas, ele é um chatbot com credenciais perigosas. **[INFERÊNCIA]**

Figura 1 · A cadeia da intenção à experiência **[RECOMENDAÇÃO]**

1. **Intenção** O que a pessoa quer?
2. **Agente** Quem age?
3. **Conhecimento** Qual é a regra?
4. **Ferramentas** Com que capacidade?
5. **Processo de negócio** Com que dono e estado?
6. **Experiência dinâmica** Como a pessoa vê e confirma?

*Fórmula do estágio 5 do modelo de maturidade. O agente é um elo no meio da cadeia, com o mesmo peso dos demais: se qualquer outro elo falha, ele herda a falha e não consegue corrigi-la.*

Por onde você entra? (perguntas ilustrativas)

“Querem um agente na frente de tudo. Por onde começo?”

Fases com critério de passagem e trilhas paralelas; identidade e conteúdo são o caminho crítico.

Ir ao roadmap →

“Nosso RAG responde errado ou mostra o que não devia.”

O RAG é o último elo de uma cadeia; antes dele há fonte canônica, metadados e permissões.

Ver a cadeia do conhecimento →

“Com que identidade o agente vai agir?”

Delegação, não impersonação: sujeito, ator, escopo mínimo e autorização no ponto do dado.

Ver identidade e autonomia →

“Em que estágio está o nosso portal?”

Dez critérios, pontuação de 0 a 20 por jornada, calculada no seu navegador.

Calcular a prontidão →

#### Como ler esta página

##### 2 minutos

Hero, estágios de maturidade e o bloco Em síntese. Você sai com o modelo de cinco estágios e a tese.

##### 12 minutos

Acrescente arquitetura, fluxo, confiança e roadmap.

##### Cerca de 45 minutos

A página inteira, com os aprofundamentos recolhíveis e as trinta perguntas críticas.

**Índice completo**

1. Resumo em vídeo
2. O problema: o colaborador como integrador humano
3. Cinco estágios, do link à intenção resolvida
4. Arquitetura de referência em seis camadas
5. Um pedido do começo ao fim
6. Os oito pilares técnicos
7. A cadeia do conhecimento
8. Identidade, autonomia e governança
9. O agente dentro do processo
10. Doze lentes, um conselho de arquitetura
11. Trade-offs, anti-patterns e matriz tecnológica
12. Operar um agente
13. Fases e trilhas
14. Índice de prontidão para agentes
15. Trinta perguntas críticas
16. Trilhas de estudo por perfil

Resumo em vídeo **[RECOMENDAÇÃO]**

#### Antes das camadas técnicas: o estudo em vídeo

O vídeo apresenta a escada de evolução do portal e as fundações de governança que precedem o agente. Se já conhece o modelo, pule para o problema: nada do que vem depois depende de assistir.

***Digital Workplace Agêntico: Como Evoluir do Portal Corporativo ao Agente de IA.** O vídeo trata da arquitetura do conhecimento e do perigo da alucinação. Reforça que a autonomia máxima para ações sensíveis fica no **nível 2**, o que obriga a revisão formal por HITL (identidade, autonomia e governança).*

Pular o vídeo e continuar a leitura ↓

**Resumo textual do vídeo**

- **Conhecimento:** o agente só responde bem sobre o que a arquitetura do conhecimento governa; sem fonte canônica, vigência e permissões, a resposta fluente pode estar errada (alucinação). Ver a cadeia do conhecimento.
- **Identidade delegada:** o agente age com a identidade do colaborador em escopo mínimo, e não no lugar dele. Ver identidade e governança.
- **MCP:** é a ponte entre a intenção abstrata do pedido e a execução real nos sistemas de backend, pela camada de integração. Ver a arquitetura em seis camadas.
- **Autonomia:** ações sensíveis ficam no nível 2, no máximo, com confirmação humana (HITL) antes do efeito.

Texto de apoio, não uma transcrição integral do vídeo.

O problema **[INFERÊNCIA]**

#### O colaborador como integrador humano

Em um portal corporativo de grande porte, o colaborador lida com dezenas de sistemas: RH, ponto, benefícios, acessos, chamados, aprendizagem. O portal tradicional organiza **links** para esses sistemas. Quem integra é a pessoa: ela precisa saber onde fica cada coisa, qual a regra vigente e em que estado está o próprio pedido.

A pergunta que organiza este estudo é outra: **o que precisa existir para que “faça isso para mim” seja seguro, auditável e útil — e em que ordem construir?**

**[INFERÊNCIA]**

##### 1. O trabalho é digital e fragmentado

Cada domínio tem sua experiência, sua linguagem e sua fila. A soma desses mapas é o que o colaborador carrega na cabeça.

**[INFERÊNCIA]**

##### 2. A expectativa mudou

Perguntar em linguagem natural e receber uma resposta com fonte tornou-se uma expectativa comum em ferramentas de consumo e tende a ser levada ao trabalho.

**[FATO]** **[INFERÊNCIA]**

##### 3. Agentes ficaram tecnicamente viáveis

Protocolos abertos (MCP, A2A, AG-UI) e modelos com tool calling tornam possível agir, não só responder. A existência dos protocolos é fato; a viabilidade em escala corporativa é inferência.

**O que este estudo não é**

- Não é a descrição de um portal específico: o sujeito é sempre “um portal corporativo de grande porte”.
- Não é recomendação de fornecedor: a matriz tecnológica compara, não elege.
- Não propõe uma arquitetura ideal única: há trade-offs explícitos e decisões que dependem do contexto.
- Não traz datas: o roadmap tem fases e critérios de passagem, porque a duração depende do estado atual, que só a descoberta revela.

**Como ler os selos**

Todo bloco derivado do estudo carrega um selo. O rótulo é texto; a cor não é o único portador.

****[FATO]****

Verificável em fonte primária (especificação, RFC, documentação oficial, lei).

****[INFERÊNCIA]****

Conclusão derivada de fatos, com o raciocínio explícito.

****[HIPÓTESE]****

Suposição plausível, ainda não verificada.

****[RECOMENDAÇÃO]****

Posição de arquitetura proposta pelo estudo. Quando um bloco mistura rótulos, vale o mais fraco.

**Siglas e termos usados nesta página**

**EXP (Employee Experience Platform)**

Camada que organiza serviços e jornadas do colaborador sobre os sistemas de registro.

**SoR (sistema de registro)**

Onde fica o dado oficial e a regra de negócio: folha, ponto, benefícios, atendimento.

**ECM e CSP**

Gestão de conteúdo corporativo (*enterprise content management*) e plataforma de serviços de conteúdo (*content services platform*): o repositório governado e sua versão exposta como serviço.

**Headless**

Conteúdo estruturado em campos e entregue por API a qualquer canal, sem tela acoplada.

**RAG (*retrieval-augmented generation*)**

Resposta gerada por um modelo a partir de trechos de documentos recuperados por busca.

**Groundedness**

Quanto a resposta se sustenta nas fontes citadas.

**ACL, IdP e SSO**

Lista de permissões do documento; provedor de identidade; login único.

**AG-UI, MCP, A2A, A2UI**

Protocolos abertos: interação agente ↔ aplicação; agente ↔ ferramentas; agente ↔ agente; e um formato declarativo de interface gerada.

**HITL (*human-in-the-loop*)**

Confirmação ou decisão humana formal antes de uma ação com efeito.

**BFF (*backend for frontend*)**

Camada que adapta as APIs ao canal que as consome — aqui, o canal do agente.

**ESB, CDC e outbox**

Barramento central de integração; captura de mudanças no banco de um legado; padrão que grava o estado e o evento na mesma transação.

**SLI, SLO e orçamento de erro**

Indicador, objetivo sobre o indicador e quanto do objetivo pode ser descumprido antes de congelar mudanças.

**DEX (*digital employee experience*) e ILM**

Experiência digital do colaborador; gestão do ciclo de vida da informação (retenção e descarte).

**LGPD**

Lei Geral de Proteção de Dados (Lei nº 13.709/2018).

Maturidade **[RECOMENDAÇÃO]**

#### Cinco estágios, do link à intenção resolvida

O modelo descreve a evolução de um portal em cinco estágios. Cada estágio **acumula** os anteriores: um `Agentic Workplace` sem as fundações dos estágios 2 a 4 é um chatbot com credenciais perigosas **[INFERÊNCIA]**. O modelo é uma proposta para discussão; o posicionamento de um portal concreto só se sustenta com critérios e evidências.

1. ### 1. Intranet tradicional
  Conteúdo + Links + Sistemas
  **O colaborador pergunta**
  “onde fica?”
  **A plataforma responde**
  “aqui está o link”
2. ### 2. Digital Workplace
  Conteúdo + Serviços + Personalização
  **O colaborador pergunta**
  “como peço?”
  **A plataforma responde**
  “aqui está o serviço para você”
3. ### 3. EXP componível
  APIs + Headless + Jornadas + Micro-frontends
  **O colaborador pergunta**
  “como resolvo de ponta a ponta?”
  **A plataforma responde**
  “siga esta jornada, sem trocar de sistema”
4. ### 4. AI-Enhanced Workplace
  Search + RAG + Copilots + Automação
  **O colaborador pergunta**
  “qual é a regra?”
  **A plataforma responde**
  “esta é a resposta, com fonte”
5. ### 5. `Agentic Workplace`
  Intenção → Agente → Conhecimento → Ferramentas → Processo → Experiência dinâmica
  **O colaborador pede**
  “faça isso para mim”
  **A plataforma responde**
  “entendi, preparei, confirme, está em andamento”

*Figura 2 · Escada de maturidade. Com JavaScript, o botão de cada degrau destaca a coluna correspondente da matriz abaixo; sem JavaScript, escada e matriz aparecem inteiras.*

##### Matriz comparativa por dimensão

**Dimensões × estágios (E1 a E5). Cada coluna acumula as capacidades das anteriores.**

| Dimensão | E1 · Intranet | E2 · Digital Workplace | E3 · EXP componível | E4 · AI-Enhanced | E5 · `Agentic` |
| --- | --- | --- | --- | --- | --- |
| Unidade de valor | página | serviço | jornada | resposta | intenção resolvida |
| Integração | links | ponto a ponto | contratos | contratos + índice | contratos + ferramentas + delegação |
| Conteúdo | páginas | páginas + catálogo | headless | governado e indexado com ACL | governado, indexado e usado para ação |
| Identidade | login | SSO | SSO + perfil | SSO + permissões no índice | delegação sujeito + ator |
| Processo | fora do portal | formulários | workflows | workflows com etapas de LLM | agente como interface de processos |
| UX | menus | catálogo | jornadas | linguagem natural | intenção + UI adaptativa |
| Operação | disponibilidade | disponibilidade | SLOs por capacidade | + qualidade de respostas | + traces de agente, custo, error budget de qualidade |
| Governança | editorial | catálogo | contratos | IA e dados | autonomia e auditoria |

##### Pular estágios tem custo **[INFERÊNCIA]**

##### E2 → E4, sem E3

O RAG funciona para perguntas, mas não há APIs para agir: o “agente” só responde.

##### E2 → E5, sem E3 e E4

Agente com integrações improvisadas, credenciais amplas e conhecimento não governado. Alto risco de incidente.

##### E3 → E5, sem E4

Ações bem integradas, mas respostas de conhecimento pouco confiáveis e sem permissões indexadas.

É possível avançar em paralelo por trilhas — iniciar a governança de conteúdo do E4 enquanto se constroem as APIs do E3 —, mas o estudo não recomenda operar o E5 sem as capacidades anteriores **no escopo das intenções habilitadas**. Por isso a maturidade se avalia por jornada, não pelo portal inteiro: uma organização pode estar no estágio 5 para “consultar saldo de férias” e no estágio 2 para “solicitar acesso” **[RECOMENDAÇÃO]**.

**Critérios para considerar-se em cada estágio**

Para estar em um estágio, a organização atende a **todos** os critérios dele. O estágio 1 não tem critério de entrada.

##### Estágio 2

- SSO em todos os serviços do portal.
- Catálogo de serviços com dono por serviço.
- Ao menos três domínios com autosserviço transacional.

##### Estágio 3

- Capacidades das jornadas prioritárias acessíveis por API com contrato versionado.
- Conteúdo de experiência entregue por API a mais de um canal.
- Ao menos uma jornada cross-domain com dono e workflow.
- Design system usado por todos os times de experiência.

##### Estágio 4

- Busca híbrida com permissões aplicadas no índice.
- Conteúdo normativo com vigência e dono em 100% do escopo indexado.
- Conjunto de avaliação com métricas de recuperação monitoradas.
- Política de IA e inventário de casos de uso.

##### Estágio 5

- Token delegado (sujeito + ator) em todas as ferramentas.
- Autorização no ponto do dado para todas as ações.
- HITL formal para ações com efeito.
- UI generativa restrita a catálogo.
- Registro de execução auditável.
- SLOs de qualidade com error budget.

**O que cada estágio exige: capacidades, riscos e mudança organizacional**

**Capacidades, riscos e organização por estágio.**

| Estágio | Capacidades | Riscos principais | Organização |
| --- | --- | --- | --- |
| 1 · Intranet | CMS de intranet, diretório de links, notícias, busca simples | conteúdo desatualizado; colaborador como “integrador humano” | comunicação interna dona do portal |
| 2 · Digital Workplace | SSO, catálogo de serviços, audiências, autosserviço em alguns domínios, app mobile, abertura de chamados | catálogo que é só uma lista de links; personalização superficial | produto digital do colaborador começa a existir; domínios fornecem serviços |
| 3 · EXP componível | APIs de domínio com contrato; conteúdo headless; jornadas cross-domain; design system multicanal; workflow para processos longos | microsserviços e micro-frontends sem necessidade; BFF virando monólito | domínios como donos de capacidades; time de plataforma; dono de jornada |
| 4 · AI-Enhanced | busca híbrida com permissões; RAG com citações; copilots em tarefas específicas; workflows com etapas de LLM | RAG sobre conteúdo não governado; vazamento por oversharing; alucinação | donos de conteúdo com tempo de curadoria; comitê de IA; time de plataforma de IA |
| 5 · `Agentic` | agente com ferramentas de leitura e escrita; identidade delegada; HITL formal; UI generativa governada; protocolo de interação; registro de execução | excesso de agência; agente-ESB; regras no prompt; incidentes silenciosos de qualidade; instabilidade de protocolos | fórum de ferramentas e permissões; donos de processo recebendo feedback do agente; SRE de qualidade |

“Micro-frontends” na fórmula do estágio 3 indica modularidade de experiência, não a obrigação de adotá-los em runtime.

Arquitetura de referência **[RECOMENDAÇÃO]**

#### Seis camadas e uma faixa transversal

O modelo abaixo não é uma arquitetura definitiva nem a descrição de um portal: é uma referência para posicionar decisões, achar dependências e conversar entre disciplinas. Cada camada tem uma responsabilidade e, tão importante quanto, aquilo que **não** é responsabilidade dela. As camadas de baixo (integração, conhecimento, identidade) são pré-requisito das de cima (agente, UI generativa).

Colaborador — intenção, navegação, confirmação

****Experience Layer** web, mobile, canais de colaboração, notificações, UI generativa, cliente AG-UI**

**Experience Layer**

| É responsável por | Não é responsável por |
| --- | --- |
| renderizar componentes aprovados, em qualquer canal | decidir regras de negócio |
| capturar intenção, confirmações e edições | chamar sistemas de registro diretamente |
| acessibilidade e consistência visual | guardar estado de processo |
| manter a conexão AG-UI e aplicar estado (snapshots, deltas) | autorizar ações (apenas reflete o que o backend permite) |

AG-UI (eventos, estado, interrupções)

****Agent / Interaction Layer** runtime de agente, instruções versionadas, estado da tarefa, guardrails, HITL, clientes MCP e A2A**

**Agent / Interaction Layer**

| É responsável por | Não é responsável por |
| --- | --- |
| interpretar intenção e planejar | ser a fonte da verdade de qualquer dado |
| escolher ferramentas do catálogo permitido | conter regras de elegibilidade |
| conduzir confirmações e interrupções | manter processos de longa duração |
| explicar resultados com fontes | decidir permissões |
| registrar a execução (trace) | integrar sistemas de registro ponto a ponto |

consulta de serviços e jornadas · ferramentas (MCP)

****Employee Experience Platform (EXP)** catálogo de serviços, jornadas, perfil e contexto, personalização, estado de solicitações**

**Employee Experience Platform**

| É responsável por | Não é responsável por |
| --- | --- |
| catálogo de serviços e suas regras de exibição | executar a regra de negócio do domínio |
| definição de jornadas, inclusive cross-domain | interpretar linguagem natural |
| perfil e contexto do colaborador, com base legal | ser o repositório de conteúdo normativo |
| estado agregado de solicitações e notificações |  |

**[INFERÊNCIA]** A EXP permite que o agente e a navegação tradicional ofereçam os mesmos serviços, com as mesmas regras de exibição. Sem ela, o agente cria um catálogo paralelo.

****Knowledge** conteúdo canônico, taxonomia, índice híbrido com ACL, retrieval, RAG**

**Knowledge**

| É responsável por | Não é responsável por |
| --- | --- |
| conteúdo canônico com metadados, vigência, dono e permissões | gerar respostas |
| índice híbrido com ACLs sincronizadas | decidir, na geração, o que o usuário pode ver |
| retrieval com filtros e reranking; grafo de entidades de alto valor |  |

****Integration** servidores MCP por domínio, gateway, BFF do agente, APIs, workflow engine, eventos**

**Integration**

| É responsável por | Não é responsável por |
| --- | --- |
| expor capacidades de domínio por contrato | conter regras de negócio |
| BFF adaptado ao canal agente; processos duráveis (workflow) | interpretar intenções |
| distribuir eventos e projeções de leitura; resiliência (timeouts, circuit breakers, idempotência) |  |

APIs com contrato

****Corporate Systems (SoR)** RH e folha, ponto, benefícios, ITSM, IAM, atendimento, legados**

Fonte da verdade e da regra. Mudam devagar; a arquitetura deve **protegê-los** dos padrões de carga e de chamada introduzidos por agentes (rate limit, cache, projeções de leitura).

##### Transversal (todas as camadas)

- IAM e delegação
- Motor de políticas
- Segurança
- LGPD
- Governança de IA
- Auditoria e lineage
- Observabilidade (traces, métricas, avaliações)
- SRE
- DEX

*Figura 3 · Camadas de referência. Cada faixa abre a tabela de responsabilidades; a ordem do documento é a ordem de leitura, de cima para baixo.*

##### Nove princípios que atravessam as camadas **[RECOMENDAÇÃO]**

1. **A regra vive no domínio.** Nenhuma camada acima dos sistemas de registro e dos serviços de domínio decide elegibilidade.
2. **Identidade se propaga, nunca se substitui.** Toda chamada carrega quem pediu e quem está agindo.
3. **O agente é um canal.** Usa a mesma EXP, as mesmas APIs e as mesmas políticas dos demais canais.
4. **UI generativa é composição de componentes aprovados.**
5. **Estado de processo é durável e externo ao agente.**
6. **Conhecimento é governado na origem.** O índice reflete; não corrige.
7. **Toda execução é reconstruível:** quem, o quê, com base em quê, com que autorização.
8. **Degradação graciosa.** Se o agente falhar, a navegação tradicional continua.
9. **Protocolos atrás de adaptadores.** AG-UI, MCP e A2A são encapsulados para absorver mudanças de especificação.

**Decisões em aberto por camada**

**Cada decisão tem alternativas legítimas; a escolha depende do inventário de cada organização.**

| Camada | Decisão | Alternativas |
| --- | --- | --- |
| Experience | shell próprio ou extensão da plataforma SaaS | monólito modular, micro-frontends, composição no servidor ou na borda |
| Experience | especificação de UI generativa | A2UI, MCP Apps, Open-JSON-UI, schema próprio |
| Agent | agente da plataforma ou independente | ver paradoxo em Decisões |
| Agent | um agente ou multi-agente; onde roda o modelo | agente único com catálogo filtrado; gerenciado, nuvem privada ou local |
| EXP | construir, comprar ou usar a suíte existente | depende do inventário |
| Knowledge | motor de busca | Elasticsearch, OpenSearch, serviço gerenciado |
| Integration | MCP direto aos domínios ou via BFF | servidores MCP finos chamando BFF e APIs |
| Transversal | modelo de autorização | RBAC, ABAC, ReBAC ou combinação |

Fluxo ponta a ponta **[RECOMENDAÇÃO]**

#### Um pedido do começo ao fim: agente, AG-UI, ferramentas e processo

Cenário ilustrativo: uma colaboradora escreve *“Minha filha nasceu ontem. Preciso incluir ela no plano de saúde.”* O pedido é um bom teste porque reúne intenção com carga emocional, dado pessoal sensível, regra de elegibilidade com prazo, coleta de documento, ação com efeito, processo assíncrono com possível análise humana e uma jornada maior (licença, folha) que pode ser sugerida.

A sequência abaixo é **ilustrativa**: não é uma execução real nem a descrição de um sistema existente. Os nomes dos eventos seguem a especificação AG-UI 1.0.

1. RunAgentInput Colaborador → Interface → Agente O pedido sai com o token da colaboradora. O runtime não usa esse token para chamar sistemas: troca-o, a cada ferramenta, por um token delegado.
2. `RUN_STARTED` Agente → Interface Início da execução e criação do trace com ID de correlação.
3. `ACTIVITY_SNAPSHOT` Agente → Interface Progresso transparente; o leitor de tela recebe um anúncio moderado.
4. Contexto da EXP e do conhecimento Agente → Ferramentas Só entra no contexto o conteúdo vigente e permitido, com ID, versão e vigência.
5. `TOOL_CALL_START` · elegibilidade Agente → Ferramentas (token delegado: sujeito + ator) O agente recebe “elegível, prazo, documentos exigidos”; não decide elegibilidade.
6. `TOOL_CALL_START` · render_dependent_form Agente → Interface Ferramenta de frontend: quem define o catálogo é a aplicação, não o agente.
7. `STATE_DELTA` Agente ↔ Interface Patch JSON atômico: aplica inteiro ou é rejeitado, com ressincronização por snapshot. O anexo vai a um repositório de documentos; o agente recebe só a referência.
8. `RUN_FINISHED` · interrupção `confirmacao_acao` Agente → Interface “Uma execução interrompida é uma execução encerrada”: a resposta vem em uma nova execução.
9. Confirmar Colaborador → Interface → Agente Confirmação explícita, com resumo legível e possibilidade de editar sem recomeçar.
10. `TOOL_CALL_START` · iniciar_inclusao Agente → Ferramentas → Workflow Repetir a chamada não duplica a inclusão; o estado do processo vive no workflow engine.
11. `TEXT_MESSAGE_*` · `RUN_FINISHED` Agente → Interface Conclusão assíncrona: dias depois, o workflow publica o evento e a EXP notifica. Se houver exceção, a tarefa humana nasce com contexto estruturado.

Todos os passos estão visíveis. Com JavaScript, você pode percorrê-los um a um.

*Figura 4 · Sequência ilustrativa **[RECOMENDAÇÃO]**. Roxo marca a decisão humana; âmbar, a ação com efeito. Os nomes dos eventos são **[FATO]** conforme a especificação AG-UI 1.0.*

##### O que o AG-UI é — e o que não é

**[FATO]** O AG-UI (Agent User Interaction Protocol) é um protocolo para conectar aplicações voltadas ao usuário a agentes, por fluxos de eventos. Cada pedido inicia uma execução (*run*) que devolve eventos à aplicação. Ele convive com outros dois protocolos: o MCP liga agente e ferramentas; o A2A liga agentes entre si; o AG-UI liga o agente ao usuário.

Por isso a resposta à pergunta “AG-UI é protocolo de UI, de integração ou de interação?” é: **de interação**. Ele **não** é uma especificação de UI generativa (isso é A2UI, MCP Apps, Open-JSON-UI), não é integração com sistemas corporativos, não é mecanismo de autorização e não é framework de agente. Transporta propostas de ação; quem autoriza são as ferramentas e os sistemas.

**As oito famílias de eventos AG-UI**

**Especificação 1.0. **[FATO]** quanto aos eventos; a coluna de uso é **[INFERÊNCIA]**.**

| Família | Eventos | Uso em um Digital Workplace |
| --- | --- | --- |
| Runs e steps | `RUN_STARTED`, `RUN_FINISHED`, `RUN_ERROR`, `STEP_STARTED`, `STEP_FINISHED` | ciclo de vida de uma solicitação; base para métricas de latência |
| Mensagens de texto | `TEXT_MESSAGE_*` | resposta conversacional em streaming |
| Tool calls | `TOOL_CALL_*` | proposta de ação; argumentos chegam em fragmentos |
| Reasoning | `REASONING_*` | visibilidade do raciocínio, com artefatos criptografados |
| Estado | `STATE_SNAPSHOT`, `STATE_DELTA`, `MESSAGES_SNAPSHOT` | estado compartilhado, como o rascunho de uma solicitação |
| Atividade | `ACTIVITY_SNAPSHOT`, `ACTIVITY_DELTA` | progresso estruturado fora da transcrição (“verificando elegibilidade…”) |
| Subagentes | `SUBAGENT_STARTED`, `SUBAGENT_FINISHED`, `SUBAGENT_ERROR` | atribuição de saída a subagentes |
| Passthrough | `RAW`, `CUSTOM` | escape para eventos proprietários; em excesso, perde interoperabilidade |

**Estado, interrupções e transporte**

- **[FATO]** **Snapshot** substitui o estado inteiro (“não é um merge”). **Delta** aplica operações JSON Patch (RFC 6902) de forma atômica. Se um patch falhar, o consumidor rejeita o resultado parcial e o produtor deve ressincronizar com um snapshot.
- **[FATO]** Uma execução que precisa de entrada externa termina com `RUN_FINISHED` carregando uma interrupção (id, motivo, mensagem legível, schema de resposta). O produtor não deve relatá-la como sucesso nem executar a ação se a interrupção não for coberta pela retomada.
- **[INFERÊNCIA]** Com isso, a aprovação humana deixa de ser um “if” no código do agente e passa a ser um evento de protocolo, com schema de resposta, expiração e regra explícita de não execução — o que facilita a auditoria.
- **[FATO]** O transporte obrigatório é HTTP com Server-Sent Events; Protobuf é opcional; WebSocket não é binding padrão, mas é permitido. Qualquer transporte deve entregar os eventos de uma execução de forma ordenada e completa.
- **[INFERÊNCIA]** Proxies e CDNs não podem bufferizar SSE; o stream precisa de token válido durante toda a execução; em redes móveis instáveis, snapshots ressincronizam o estado.

**O que muda se… (cinco variações do cenário)**

**Variações **[RECOMENDAÇÃO]****

| Variação | Impacto |
| --- | --- |
| A colaboradora está em uma ferramenta de colaboração | o mesmo agente e estado; o componente renderiza como cartão; o anexo pode exigir link para o app |
| O sistema de benefícios está fora do ar | circuit breaker aberto; o agente explica, salva o rascunho e oferece lembrete ou chamado |
| A política mudou ontem | o índice reflete a nova versão por evento de ciclo de vida; as respostas citam a versão nova |
| Pergunta pela filha de outra pessoa | a ferramenta resolve “dependente” pela identidade da solicitante e não aceita IDs arbitrários do texto |
| Um documento indexado contém instrução maliciosa | o conteúdo recuperado é tratado como dado; guardrails e a ausência de ferramentas perigosas limitam o impacto |

Na vertical de agentes, o mesmo desenho — ciclo do agente, fail-closed, HITL — está detalhado em [Engenharia de Agentes de IA](https://mauricio.issei.com.br/engenharia-agentes-ia).

Pilares técnicos

#### Os oito pilares sob a arquitetura

Cada pilar responde a uma pergunta que o agente, sozinho, não responde. Os cartões resumem o achado principal; o aprofundamento de cada um está recolhido. O mesmo critério vale para todos: **o que existe, o que falta e o que não é responsabilidade dele**.

**[INFERÊNCIA]**

##### 1 · EXP e Digital Workplace

A intranet **informa e encaminha**; a EXP **executa e acompanha**. Ela organiza serviços e jornadas sobre os sistemas de registro, com identidade, contexto e entrega em vários canais.

**Intranet moderna × EXP, composable e MACH**

**Diferenças operacionais**

| Dimensão | Intranet moderna | EXP |
| --- | --- | --- |
| Unidade | página e seção | jornada e serviço |
| Sistemas | link ou embed | API; ação dentro da experiência |
| Contexto | audiência (área, local) | perfil, momento de vida, estado de solicitações |
| Canal | web, principalmente | web, mobile, colaboração, notificações |
| Sucesso | visitas, alcance | resolução, tempo até a resolução, esforço |
| Dono | comunicação interna | produto, com domínios como fornecedores de serviços |

Uma EXP não precisa ser componível: para agentes, o requisito real é que as capacidades estejam expostas **por contrato**. MACH é uma estratégia possível, não um requisito; a MACH Alliance é uma associação de fornecedores, e seu material é posicionamento de mercado **[INFERÊNCIA]**. API-first e headless valem para agentes; microsserviços só onde há fronteira organizacional.

**[RECOMENDAÇÃO]**

##### 2 · Front-end modular

Micro-frontends resolvem um problema **organizacional** (deploy independente de times), não técnico. Sem a necessidade medida, um monólito modular costuma bastar para o mesmo objetivo **[INFERÊNCIA]**.

**Quando adotar micro-frontends em runtime**

Só se as três condições forem verdadeiras:

- há pelo menos três times entregando interfaces no mesmo shell, com ritmos diferentes;
- o custo de coordenação de releases é um gargalo medido, não percebido;
- existe uma plataforma (time e ferramentas) para cuidar do shell, das dependências compartilhadas e dos testes de integração.

As opções, do menor ao maior custo: monólito modular; micro-frontends em build time; em runtime (Module Federation); orquestrador como single-spa (para migração gradual); composição no servidor ou na borda; iframes (isolamento total, com UX e acessibilidade ruins). O design system é a plataforma comum; o cliente AG-UI vive no shell. Streaming por SSE exige que proxies e CDNs não bufferizem a resposta.

**[FATO]** **[RECOMENDAÇÃO]**

##### 3 · UI generativa governada

O agente **compõe** a tela a partir de um catálogo de componentes aprovados; não gera HTML livre. O Component Registry é o contrato entre o agente e o design system.

**Especificações, registry e regras de execução**

- **A2UI** (Google): formato declarativo, “não código executável”; o cliente mantém o catálogo e o agente só pede componentes dele. Versão 0.8 em dezembro de 2025.
- **MCP Apps**: recursos `ui://` pré-declarados, renderizados em iframes isolados; proposta de novembro de 2025.
- **Open-JSON-UI**: padronização do schema declarativo citada na documentação do AG-UI. Ou um schema próprio sobre o design system.

O status atual de cada especificação pode ter mudado desde a data da fonte.

Uma entrada do registro descreve: quando usar e quando não usar (para o agente), JSON Schema das props, ações emitidas, efeito colateral, contexto exigido, auditoria de acessibilidade e dono. Regras: só componentes registrados são instanciados; props são validadas antes de renderizar; componentes com efeito colateral não executam nada no cliente — a ação passa pelo backend, que reaplica a autorização; texto vindo do modelo é dado não confiável.

**[FATO]** **[INFERÊNCIA]**

##### 4 · Conteúdo governado: do ECM ao headless

O conteúdo precisa ter metadados utilizáveis por máquina: vigência, dono, permissão e aplicabilidade. Sem isso, busca e RAG herdam o problema e não conseguem corrigi-lo.

**Três gerações e o que o agente exige do conteúdo**

**ECM** guarda registros com controle, versão e retenção. **CSP** os expõe como serviços abertos; a Gartner formalizou a troca do termo em 2017. **Headless** estrutura o conteúdo de experiência em campos e o entrega por API a qualquer canal. As três coexistem: registros com retenção ficam em ECM/CSP; comunicados, FAQs e guias se beneficiam do modelo headless. O erro é tentar resolver tudo com uma só.

**O que o agente exige do conteúdo **[INFERÊNCIA]****

| Requisito do agente | Capacidade de conteúdo |
| --- | --- |
| citar a versão vigente | vigência (início e fim) e status |
| não revelar conteúdo restrito | permissões explícitas e exportáveis ao índice |
| responder para o público certo | metadados de aplicabilidade (cargo, área, região, vínculo) |
| entender sinônimos | taxonomia controlada |
| saber quem corrige uma resposta errada | dono e ciclo de revisão |
| recuperar o trecho certo | conteúdo estruturado em seções, com títulos e hierarquia |
| apagar quando a lei manda | ILM e retenção propagados até o índice e os logs |

**[RECOMENDAÇÃO]**

##### 5 · Integração: gateway, BFF, eventos e workflows

O agente precisa de **contratos**, não de microsserviços. O BFF molda as capacidades para o canal agente; o workflow engine guarda o estado do processo; nenhum deles contém regra de negócio.

**API, evento ou workflow? E o papel do BFF**

**Quando usar cada um**

| Critério | API síncrona | Eventos | Workflow engine |
| --- | --- | --- | --- |
| Interação | pergunta e resposta imediata | fato já ocorrido | etapas ao longo do tempo |
| Consumidores | um | vários | um processo |
| Duração | ms a segundos | contínua | minutos a meses |
| Sinal de uso errado | timeouts em operações longas | eventos usados como pedido-resposta | motor para uma chamada simples |

O BFF do agente reduz payload e ruído (tokens custam e confundem), agrega consultas frequentes, normaliza erros em mensagens explicáveis, impõe paginação e aplica a política específica do canal agente. Legados sem eventos podem usar CDC; o outbox transacional evita “estado mudou, evento perdido”. O agente **inicia** o workflow com chave de idempotência, **consulta** o estado e **responde** a sinais humanos — nunca guarda o estado na própria memória.

**[FATO]** **[RECOMENDAÇÃO]**

##### 6 · Busca, RAG e grafos de conhecimento

Busca lexical e semântica têm pontos cegos diferentes; a combinação híbrida com **filtro de permissão no índice** é a base. O RAG só entra depois, e avaliação vem antes de tecnologia.

**Técnicas, RAG clássico × RAG com agente e avaliação**

**Pontos fortes e cegos**

| Técnica | Forte em | Fraca em |
| --- | --- | --- |
| Lexical (BM25) | siglas, códigos de normativo, nomes, números | sinônimos e paráfrases |
| Semântica densa | perguntas em linguagem natural | termos raros, negação, números exatos |
| Híbrida | robustez | calibração e avaliação |
| Reranking | precisão nos primeiros resultados | latência e custo |
| Grafo de conhecimento | perguntas relacionais e globais | construção e manutenção |

A fusão de listas por RRF (*Reciprocal Rank Fusion*) combina resultados pelo posto, sem normalizar scores. O RAG foi formalizado por Lewis et al. (2020). O **Agentic RAG** ganha em perguntas compostas (política + dado pessoal) e perde em previsibilidade, latência e custo; para perguntas simples de política, o RAG clássico tende a ser mais adequado. Modelos aproveitam pior a informação no meio de contextos longos (Liu et al., 2023): menos trechos, mais relevantes. Avaliação por camada: recuperação (recall@k, nDCG), permissão (vazamento deve ser zero), grounding, correção e utilidade.

**[INFERÊNCIA]**

##### 7 · Agentes, tool calling, MCP e A2A

O MCP é a interface padronizada entre o agente e o catálogo de ferramentas; **não** resolve regra de negócio, integração com sistemas nem processos longos. Comece com um agente de entrada e um catálogo filtrado por intenção.

**Anatomia, MCP, A2A, guardrails e testes**

- **[FATO]** Servidores MCP, no transporte HTTP, são resource servers OAuth: validam a audiência do token e **não repassam** o token recebido às APIs. A revisão 2026-07-28 removeu sessões e o handshake de inicialização e documentou a propagação de contexto de trace — a especificação ainda muda de forma incompatível.
- **[RECOMENDAÇÃO]** Servidores MCP finos, por domínio, mantidos pelo time do domínio e chamando BFF e APIs; não um “servidor MCP corporativo” central.
- **[FATO]** O A2A é um padrão aberto de comunicação entre agentes, sob a Linux Foundation, com comitê técnico formado por grandes fornecedores de nuvem, ERP e atendimento. Use multi-agente quando houver fronteira de dono, de política ou de fornecedor — não como “organização de prompt”.
- **Guardrails** em cada ponto: injeção na entrada; conteúdo recuperado tratado como dado não confiável; catálogo de ferramentas filtrado; argumentos validados por schema e resolvidos pela identidade, não pelo texto; política externa decide a ação; mascaramento na saída; limite de passos, tempo e custo.
- **Testes em camadas:** ferramenta (contrato, idempotência, autorização), seleção de ferramenta, trajetória, resultado com sistemas simulados, segurança (red teaming), regressão em CI e avaliação amostral em produção. Instruções, catálogo e versão do modelo são artefatos versionados.

**[FATO]**

##### 8 · AG-UI: protocolo de interação

Padroniza a conversa em tempo real entre o agente e a aplicação: o que o agente está fazendo, o que propõe, o que ambos sabem e quando precisa do humano. Não é protocolo de UI, de integração nem de autorização.

**Dependências, riscos e maturidade**

- **Dependências:** runtime de agente compatível; design system com componentes registráveis como ferramentas de frontend; infraestrutura de streaming de longa duração; modelo de estado bem definido.
- **Riscos:** instabilidade de especificação (adaptador interno e testes de contrato); vazamento por eventos de raciocínio; estado como canal de injeção (validar contra schema); ferramentas de frontend com efeito (sempre via backend); excesso de eventos `CUSTOM`.
- **[INFERÊNCIA]** Maturidade emergente, em consolidação: adequado para pilotos com encapsulamento; prematuro como dependência não encapsulada de longo prazo.

Detalhe em Fluxo ponta a ponta.

Conhecimento **[INFERÊNCIA]**

#### Do repositório ao agente: a cadeia do conhecimento

Cada elo da cadeia **herda a qualidade do anterior e não consegue corrigi-la**. O RAG não corrige uma permissão errada no ECM; o agente não corrige uma vigência ausente no CMS. Por isso o RAG é o último elo, e não o primeiro: antes dele há fonte canônica, metadados, permissões e índice.

1. **1 · ECM**Guarda registros com controle, versão e retenção. “Qual é o documento oficial e por quanto tempo devo mantê-lo?”
2. **Portão A · fonte canônica, dono e classificação**
  Cada tipo de conteúdo tem uma fonte canônica definida, um dono responsável pela correção e uma classificação da informação (público, interno, confidencial, restrito) com regra de uso por IA.
3. **2 · CSP**Expõe esse conteúdo como serviços para várias aplicações. “Como outras aplicações acessam o conteúdo governado?”
4. **3 · Headless**Estrutura o conteúdo de experiência em campos e o entrega por API. “Como reutilizo o mesmo conteúdo em web, app, colaboração e agente?”
5. **Portão B · vigência e permissão em 100% do escopo**
  Status e vigência (vigente, revogado, início e fim) em todo conteúdo normativo; permissões explícitas e exportáveis, sincronizáveis com o índice.
6. **4 · Search**Encontra o trecho relevante respeitando permissão e contexto. “Onde está a resposta, para esta pessoa?”
7. **Portão C · conjunto de avaliação e teste de vazamento**
  Perguntas reais com respostas de referência, recall medido e teste de vazamento com identidades de baixo privilégio após cada carga do índice.
8. **5 · RAG**Gera uma resposta fundamentada nos trechos encontrados. “Como responder em linguagem natural sem inventar?”
9. **6 · Agente**Usa conhecimento e ferramentas para resolver a intenção. “O que fazer com essa informação?”

*Figura 5 · Cadeia do conhecimento com portões de prontidão. Os portões são o critério de passagem entre as estações; cada um abre o checklist correspondente.*

**Checklist de prontidão para RAG **[RECOMENDAÇÃO]****

##### Bloqueantes (6)

Sem isso, não implementar RAG em produção.

- Fonte canônica definida para cada tipo de conteúdo.
- Permissões explícitas e exportáveis, sincronizáveis com o índice.
- Status e vigência em todo conteúdo normativo.
- Dono de cada conteúdo, com responsabilidade de correção.
- Classificação da informação, com regra de uso por IA.
- Conjunto de avaliação com perguntas reais e respostas de referência.

##### Fortemente recomendados (5)

- Taxonomia controlada e tesauro de sinônimos.
- Metadados de aplicabilidade (empresa, vínculo, cargo, região).
- Estrutura de seções nos normativos.
- Eventos de ciclo de vida (publicado, revogado, permissão alterada, descartado).
- Deduplicação entre repositórios.

##### Desejáveis (3)

- Grafo de entidades de alto valor.
- Resumos curados para documentos longos.
- Glossário de siglas.

**Pipeline de ingestão e permission-aware retrieval**

**Oito etapas, cada uma com seu controle de qualidade **[RECOMENDAÇÃO]****

| Etapa | Função | Controle de qualidade |
| --- | --- | --- |
| Captura | receber eventos de publicação e alteração | nenhum conteúdo entra sem evento rastreável |
| Extração | texto, estrutura, tabelas; OCR quando necessário | confiança do OCR registrada |
| Normalização | limpeza, idioma, padronização de títulos | — |
| Segmentação | chunks por estrutura, com título e caminho de seções | tamanho e coerência verificados |
| Enriquecimento | metadados herdados, entidades, sinônimos | metadados obrigatórios presentes |
| Vetorização | embeddings versionados pelo modelo | versão do modelo registrada |
| Indexação | índice híbrido com ACLs e metadados | teste de vazamento após cada carga |
| Remoção | revogação e descarte propagados | SLO de propagação |

**Permission-aware retrieval** em cinco passos: permissões como metadados de cada chunk, herdadas da origem; pré-filtro no índice, com a identidade resolvida pelo IdP e *nunca depois* de o modelo ver o conteúdo; sincronização orientada a eventos, com SLO; testes contínuos de vazamento com identidades de baixo privilégio; revisão de oversharing antes de indexar.

**Como o agente usa o conhecimento — e uma regra que não se dobra**

**Três usos, três requisitos**

| Uso | Exemplo | Requisito |
| --- | --- | --- |
| Responder | “qual a regra de teletrabalho?” | RAG com citação e vigência |
| Decidir o que fazer | “minha filha nasceu” aciona a jornada de nascimento | catálogo de serviços e jornadas (EXP), não só documentos |
| Fundamentar uma ação | explicar por que a inclusão tem prazo | a regra vem do domínio (API); o documento só explica |

**[RECOMENDAÇÃO]** Nunca usar o texto de um documento recuperado como fonte da regra para executar uma ação: **o documento explica; a API decide**. Dado transacional vai por ferramenta; conteúdo estruturado, pela Content API; conteúdo normativo, por RAG com filtros; relações, por grafo ou API de domínio; conhecimento tácito *não se usa* — explicita-se primeiro ou encaminha-se a uma pessoa.

**Sequência sugerida de implementação (sete passos)**

1. Escolher **um domínio** de alto volume de perguntas (por exemplo, políticas de pessoas).
2. Fazer o inventário e definir fontes canônicas, donos e vigências.
3. Construir o conjunto de avaliação a partir dos logs reais.
4. Implementar a busca híbrida com permissões e medir a recuperação.
5. Só então adicionar RAG, com citações e avaliação de groundedness.
6. Depois, conectar ao agente e às ferramentas.
7. Expandir domínio a domínio.

Conhecimento como infraestrutura governada, e não como repositório passivo, é o tema de [Knowledge OS Enterprise](https://mauricio.issei.com.br/knowledge-os-presentation).

Identidade, autonomia e governança **[RECOMENDAÇÃO]**

#### Em nome de quem o agente age — e até onde ele vai sozinho

Em um portal tradicional há duas identidades: o usuário e o sistema. Com um agente há pelo menos quatro: o **usuário** (sujeito), o **agente** (ator), o **runtime** onde ele roda e cada **recurso** acessado. Se elas se misturam, a organização perde o menor privilégio e a capacidade de atribuir responsabilidade.

##### Atalho 1 · conta de serviço com acesso amplo

Simples e funciona com legados. Mas toda ação parece feita “pelo sistema”, o agente alcança dados de qualquer colaborador e o princípio do menor privilégio deixa de ser aplicável.

##### Atalho 2 · repassar o token do usuário

O sistema de registro já entende o token. Mas ele não distingue o usuário do agente, a audiência pode estar errada, e o MCP proíbe expressamente o *token passthrough*.

##### Delegação, nunca impersonação **[FATO]**

A RFC 8693 distingue os dois casos. Na impersonação, A “é indistinguível de B”. Na delegação, A mantém a própria identidade e fica explícito que age representando B: a claim `act` identifica o ator, e quem consome o token considera o sujeito e o ator ao aplicar a política. Um token delegado, ilustrativo:

```
{
  "iss": "https://idp.exemplo.corp",
  "sub": "colaborador:123456",
  "aud": "https://bff-agente.exemplo.corp",
  "scope": "beneficios.dependentes.read",
  "act": { "sub": "agente:assistente-pessoas:v3" },
  "exp": 1791000000
}
```

Valores fictícios. O “de quem” vem do token, nunca de parâmetros gerados pelo modelo: “meu saldo” vira o `sub` do token, não um ID informado no texto.

##### Escada de autonomia, de 0 a 4 **[RECOMENDAÇÃO]**

**Autonomia é por classe de ação e sobe com evidência, não por decreto.**

| Nível | Exemplo | Controle | Teto para ações sensíveis |
| --- | --- | --- | --- |
| 0 Informa | responde com fontes | nenhum | dentro do teto |
| 1 Sugere | propõe a ação e prepara o formulário | o usuário executa | dentro do teto |
| 2 Executa com confirmação | resume e pede “confirmar” | interrupção HITL | dentro do teto (limite) |
| Teto recomendado para ações sensíveis: efeito financeiro, legal ou sobre dados sensíveis em setor regulado ficam no nível 2, no máximo, até haver evidência acumulada de segurança. |  |  |  |
| 3 Executa e notifica | ações reversíveis de baixo risco | desfazer disponível; auditoria | acima do teto |
| 4 Executa sem humano | rotinas de baixíssimo risco | política explícita; monitoramento | acima do teto |

*Figura 6 · A linha tracejada marca o teto; a última coluna repete o limite em texto para quem não distingue a cor.*

##### As seis perguntas e suas respostas arquiteturais

##### Quem autorizou o agente?

Nível organizacional: fórum de ferramentas e permissões, com registro de quem aprovou, para qual caso de uso e com qual risco. Nível do usuário: autentica e, para ações de alto impacto, confirma por interrupção registrada.

##### Em nome de quem age?

Do usuário, por delegação (sujeito + ator), com audiência específica por ferramenta e escopo mínimo.

##### Que permissões possui?

A interseção entre o que o usuário pode, o que o agente está autorizado a fazer e o que a tarefa atual exige. Nunca mais do que o usuário, e geralmente menos.

##### Que dados pode consultar?

Conhecimento: só o que o usuário vê, filtrado no índice. Transacional: só por ferramentas que resolvem o “de quem” pelo token. Sensíveis: ferramentas classificadas e acesso registrado.

##### Que ações pode executar?

Depende da classe da ação (tabela abaixo): de leitura própria, permitida com token delegado, a ações que nem são expostas ao canal agente.

##### Como provar depois?

Com um registro de execução imutável por tarefa, correlacionado ao log dos sistemas de registro.

**Classes de ação e regra sugerida**

**Regra por classe de ação **[RECOMENDAÇÃO]****

| Classe | Exemplo | Regra |
| --- | --- | --- |
| Leitura de dados próprios | saldo de horas | permitido com token delegado |
| Escrita reversível | rascunho de solicitação | permitido; notificar |
| Escrita com efeito | submeter férias, incluir dependente | confirmação explícita (interrupção) |
| Efeito financeiro, legal ou de acesso | alterar conta bancária, conceder acesso | confirmação + reautenticação forte; possivelmente aprovação de terceiro |
| Em nome de outra pessoa | gestor aprovando | só com papel verificado e política específica |
| Proibidas ao canal agente | desligamento, alteração salarial | não expostas como ferramenta |

**Autorização: RBAC, ABAC, ReBAC, política como código e Zero Trust**

Agentes empurram a autorização de RBAC puro para combinações com ABAC e ReBAC, porque a decisão passa a depender do **ator**, da **ação** (classe de risco) e do **contexto** (houve confirmação? qual o canal?) **[INFERÊNCIA]**.

- **RBAC:** papéis; bom para permissões estáveis por função; sofre de explosão de papéis.
- **ABAC:** atributos de sujeito, recurso, ação e ambiente; bom para regras contextuais; políticas complexas de auditar.
- **ReBAC:** relações (“é gestor de”); exige grafo consistente; a referência é o paper do Zanzibar.
- **Política como código** (OPA, Cedar): consistência entre camadas e testes de política; exige governança das políticas.

**[RECOMENDAÇÃO]** O ponto de aplicação (PEP) **obrigatório** é o mais próximo do dado — API de domínio ou sistema de registro. Os anteriores reduzem a superfície, mas nunca substituem o último. A OWASP recomenda aplicar a autorização nos sistemas downstream, e não depender da decisão do LLM **[FATO]**. Zero Trust (NIST SP 800-207) vira: cada *tool call* com token, audiência e escopo próprios; nenhuma confiança por estar “dentro da rede”; tokens curtos; identidade própria para o runtime; traces do agente no SIEM.

**Ameaças específicas de agentes**

**Oito ameaças e suas mitigações**

| Ameaça | Descrição | Mitigações |
| --- | --- | --- |
| Injeção de prompt direta | o usuário tenta fazer o agente ignorar regras | guardrails; a autorização não depende do prompt |
| Injeção indireta | documento indexado ou resposta de ferramenta contém instruções | conteúdo tratado como dado; ferramentas limitadas; canais de instrução e de dados separados |
| Excesso de agência | funcionalidade, permissão ou autonomia demais (OWASP LLM06) | catálogo mínimo; escopos; HITL |
| Confused deputy | o agente usa sua autoridade para o que o usuário não poderia | delegação com interseção de permissões |
| Token passthrough | servidor repassa token sem validar audiência | proibido pelo MCP; token exchange |
| Exfiltração por saída | dados sensíveis na resposta ou em URL | mascaramento; allowlist de domínios; sem links arbitrários |
| SSRF via descoberta | metadados OAuth apontando para endereços internos | validação de URLs; bloqueio de faixas privadas; proxy de egresso |
| Segredos no contexto | chaves em prompts ou logs | cofre de segredos; tokens fora do contexto do modelo |

**Registro de execução, LGPD e governança de IA**

O **registro de execução** por tarefa é um único artefato que serve à segurança (forense), ao compliance (revisão de decisões, art. 20 da LGPD) e ao SRE (diagnóstico). Campos: ID de correlação; sujeito; ator; canal; versão das instruções e do modelo; intenção interpretada; fontes consultadas (com versão); ferramentas chamadas (argumentos mascarados); decisões de política; interrupções e respostas; efeitos (protocolos no sistema de registro). A reconstrução exige que versões antigas de instruções e de conteúdo continuem disponíveis pelo prazo de auditoria **[INFERÊNCIA]**.

**Classificação de dados aplicada a agentes **[RECOMENDAÇÃO]****

| Classe | Entra no contexto do modelo? | Aparece na resposta? | Retenção em logs |
| --- | --- | --- | --- |
| Pública ou interna | sim | sim | padrão |
| Pessoal comum | sim, do próprio titular | sim, ao próprio titular | curta |
| Pessoal sensível (LGPD, art. 5º, II) | só o mínimo, com finalidade registrada | resumida, ao próprio titular | mínima ou mascarada |
| Confidencial de negócio | não, salvo ferramenta autorizada | não | conforme política |
| Segredos | **nunca** | **nunca** | **nunca** |

Explicabilidade, aqui, não é explicar os pesos do modelo: é dizer ao colaborador e ao auditor quais fontes sustentam a resposta, quais regras foram aplicadas e por quem, quais dados do colaborador foram usados e o que o agente fez, com que autorização. Isso fica muito mais direto quando a regra está **fora do modelo** **[INFERÊNCIA]**. Em governança de IA, o NIST AI RMF dá a estrutura de riscos, a ISO/IEC 42001 serve a quem busca certificação e o OWASP Top 10 para LLMs é o checklist técnico **[FATO]**.

Governança sem travar a entrega **[RECOMENDAÇÃO]**: padrões verificáveis automaticamente (classificação de ferramentas validada em CI, testes de vazamento, suíte de avaliação com limiares, política como código); aprovação por classe de risco; revisão após a entrega, por amostragem, para respostas de conhecimento, e revisão antes para ações.

Autonomia proporcional à evidência é o mesmo princípio de [A Engenharia da Confiança](https://mauricio.issei.com.br/engenharia-confianca).

Processos **[RECOMENDAÇÃO]**

#### O agente dentro do processo, e as exceções humanas

O agente é uma **interface inteligente sobre processos explícitos**, não um substituto para eles. Processos corporativos acumulam três tipos de conhecimento: regra explícita (“dependente até 21 anos, ou 24 se estudante”), regra tácita (“na prática, o RH aceita a declaração escolar até o fim do mês”) e julgamento (“vou consultar o jurídico”). O agente tende a lidar bem com a primeira. Diante da segunda, pode produzir uma versão plausível, porém não verificada; na terceira, pode apresentar como decisão algo que exige um responsável **[INFERÊNCIA]**.

Por isso a arquitetura separa quatro responsabilidades, cada uma com dono e testes próprios: **interação** (o agente entende, coleta, explica, confirma e acompanha), **orquestração** (workflow: estado, etapas, timers, tarefas humanas, compensação), **decisão** (domínio: elegibilidade, cálculos, validações) e **registro** (sistema de registro). O agente pode trocar de modelo sem mudar a regra; a regra pode mudar sem reescrever o agente.

##### Exceções são estados de primeira classe

##### O que toda exceção previsível tem

- tipo (documento ilegível, fora de prazo, conflito de segregação de funções, caso não previsto);
- fila com dono e SLA;
- contexto estruturado transferido (intenção, dados, tentativas, fontes, motivo);
- caminho de retorno ao fluxo automatizado.

##### Gatilhos de handoff

- a regra exige humano (acesso privilegiado);
- baixa confiança na interpretação, após duas tentativas de esclarecer;
- tema sensível (assédio, saúde mental, desligamento): oferecer a pessoa *imediatamente*;
- pedido explícito: “quero falar com uma pessoa”;
- falha técnica persistente;
- caso fora das regras documentadas.

**[FATO]** Para a **confirmação do próprio usuário**, a interrupção do AG-UI é adequada: a execução termina e a resposta vem em nova execução. **[INFERÊNCIA]** Para a **aprovação de terceiros** (gestor, RH), o lugar certo é o workflow engine, com tarefa humana e timers: a interrupção é curta e voltada ao usuário presente, e uma aprovação pode levar dias. O SLA pertence ao *processo*, não ao agente — o agente informa o prazo, não o cria.

O agente também funciona como **sensor do processo** **[INFERÊNCIA]**: as perguntas que ele não resolve e as exceções que encaminha revelam regras ambíguas, lacunas de API e etapas desnecessárias. Esse feedback é um subproduto útil da camada agêntica — desde que exista dono para recebê-lo.

**O que o agente faz e não faz em cada etapa**

**Nove etapas do processo**

| Etapa | O agente faz | O agente não faz | Mecanismo |
| --- | --- | --- | --- |
| Gatilho | reconhece a intenção e identifica o processo | inventar um processo inexistente | catálogo de serviços da EXP |
| Pré-condições | consulta elegibilidade | decidir elegibilidade | API de regras |
| Coleta | pré-preenche com dados do sistema; pede só o que falta | inferir dados críticos | componentes estruturados, estado AG-UI |
| Validação | apresenta erros de forma clara | ignorar validações | validação no domínio |
| Submissão | inicia o processo com idempotência, após confirmação | submeter ações com efeito sem confirmação | interrupção AG-UI + ferramenta |
| Aprovação | notifica e resume o contexto para o aprovador | aprovar em nome do aprovador | tarefa humana no workflow |
| Exceção | detecta, explica e encaminha com contexto | resolver a exceção sozinho | fila de exceção |
| Acompanhamento | consulta o estado e explica | prometer prazos fora do SLA | API de estado do workflow |
| Encerramento | confirma o resultado e oferece próximos passos | declarar concluído o que só foi aceito | evento de conclusão |

**Quatro padrões de integração e o que automatizar**

- **Agente como iniciador:** coleta e inicia um processo existente — a maioria dos serviços transacionais.
- **Agente como assistente de etapa humana:** resume, sugere e prepara para o humano decidir — aprovações, análises documentais.
- **Etapa de LLM dentro do workflow:** o workflow chama o modelo para uma tarefa delimitada (classificar, extrair, resumir). Corresponde ao que a Anthropic chama de *workflow* (caminhos de código pré-definidos) e tende a ser a forma de menor risco para processos regulados **[INFERÊNCIA]**.
- **Agente como orquestrador:** decide a sequência entre serviços — só para jornadas de baixo risco e alta variabilidade, com limites claros.

**Exemplos universais de RH e TI **[RECOMENDAÇÃO]****

| Processo | Volume | Variabilidade | Risco | Abordagem sugerida |
| --- | --- | --- | --- | --- |
| Consulta de saldo de férias ou horas | alto | baixa | baixo | ferramenta de leitura; resposta direta |
| Solicitação de férias | alto | baixa | médio | agente iniciador + confirmação |
| Abertura de chamado de TI | alto | alta | baixo | agente com triagem (etapa de LLM) e abertura |
| Inclusão de dependente | médio | média | alto (dados sensíveis) | agente iniciador + documento + workflow com validação |
| Solicitação de acesso | alto | média | alto | agente coleta e justifica; aprovação humana obrigatória |
| Onboarding | médio | média | médio | workflow orquestrado; agente como guia |
| Alteração de cargo | baixo | alta | alto | workflow sistêmico; agente apenas informa |
| Desligamento | baixo | alta | muito alto | canal humano; agente apenas orienta |

Intenções que atravessam domínios (“vou me mudar de cidade” envolve RH, benefícios, instalações, TI e folha) são **jornadas** da EXP, com dono nomeado, implementadas como workflow de orquestração. O agente conduz a conversa e mostra o progresso; *nunca improvisa a sequência* a cada conversa.

**Usar IA para compensar processo mal definido** é pôr um agente na frente de uma regra tácita, sem dono ou inconsistente, esperando que o modelo “resolva”. O resultado é a regra tácita aplicada de forma inconsistente, agora em escala. A alternativa é usar a descoberta do projeto para explicitar regras, exceções e donos antes de automatizar; o agente pode até ajudar, analisando chamados e conversas.

**Experiência orientada à intenção: modos, confirmação e acessibilidade**

A experiência madura **combina modos** em vez de trocar tudo por chat: navegação, busca, conversa, componente estruturado e notificação proativa. A caixa de intenção é a entrada preferencial, mas navegação e busca permanecem; remover menus antes de o agente provar resolução reduz a confiança **[RECOMENDAÇÃO]**.

- **Confirmação antes de efeito:** o componente de confirmação é fixo e não parametrizável na estrutura essencial — valores críticos destacados, linguagem simples, ação primária clara e possibilidade de editar sem recomeçar.
- **Confiança calibrada:** citar fontes com nome, versão e data; admitir incerteza; não simular empatia excessiva em temas sensíveis.
- **Handoff:** explicar por que o caso vai para uma pessoa, transferir contexto estruturado, informar fila e SLA, permitir retomar a conversa.
- **Acessibilidade:** `aria-live="polite"` com moderação; streaming anunciado por etapa, não por token; gestão explícita de foco quando componentes são substituídos; só componentes certificados do catálogo; caminhos alternativos por navegação.
- **Riscos de UX:** caixa de texto opaca; antropomorfização excessiva; respostas longas quando um botão bastaria; inconsistência entre canais; usuários avançados obrigados a conversar para o que faziam em dois cliques.

Papéis **[RECOMENDAÇÃO]**

#### Doze lentes, um conselho de arquitetura

Uma jornada agêntica atravessa disciplinas que raramente conversam. O conselho de arquitetura analisa a jornada por **cada lente separadamente** antes de consolidar; os conflitos se resolvem com os padrões de Decisões. A tabela mostra a pergunta que só cada papel faz e o que a jornada perde se ele for ignorado.

**Papel, pergunta própria e consequência da omissão.**

| Papel | Pergunta que só ele faz | Se ignorado |
| --- | --- | --- |
| Enterprise Architect | Quais capacidades de negócio a plataforma expõe e quem é dono de cada uma? | agente vira integrador improvisado |
| Integration Architect | API, evento ou workflow para cada interação? | acoplamento e estados inconsistentes |
| Product Strategist | Quais intenções valem mais e como medimos resolução? | tecnologia procurando problema |
| Process / BPM | A regra está explícita, com dono e fila de exceção? | automação de inconsistência |
| UX Architect | Como o colaborador confia, confirma e retoma? | ações sem consentimento claro |
| Front-end Architect | Como compor UI dinâmica sem quebrar o design system? | UI arbitrária, inacessível |
| AI Architect | Que agente, com que ferramentas e que avaliação? | alucinação e excesso de agência |
| Content Strategist | Qual é a fonte canônica, a vigência e o dono? | RAG sobre conteúdo sem governança |
| Search Architect | A busca respeita permissões no índice? | vazamento por oversharing |
| Security / IAM | Com que identidade o agente age e com que escopo? | conta de serviço genérica |
| Data & AI Governance | Base legal, retenção, inventário de casos de uso? | não conformidade com a LGPD |
| SRE / Platform | Como medimos qualidade, custo e latência por intenção? | incidentes silenciosos de qualidade |

Decisões **[RECOMENDAÇÃO]**

#### Trade-offs, anti-patterns e matriz tecnológica

Não existe arquitetura ideal única. Os conflitos abaixo são reais e não se eliminam; o que se escolhe é **o mecanismo que os equilibra**. Cada cartão diz o que está em jogo e como arquiteturas costumam lidar com isso.

##### Doze trade-offs

##### Flexibilidade × Governança

Quanto mais livre a plataforma, mais difícil manter verificáveis a segurança, o conteúdo e o compliance.

**Equilíbrio:** padrões verificáveis em vez de aprovação caso a caso; aprovação proporcional ao risco; “caminhos pavimentados”, em que fazer o certo é mais fácil que o errado.

##### Autonomia × Controle

A autonomia torna o agente útil; o controle o torna aceitável.

**Equilíbrio:** níveis de autonomia por classe de ação; interrupções formais; controles fora do modelo, com autorização nos sistemas downstream.

##### Personalização × Consistência

Cada colaborador vê algo diferente; a organização precisa de uma experiência reconhecível, suportável e auditável.

**Equilíbrio:** personalizar conteúdo e ordem, não estrutura e regras; templates fixos para intenções de alto volume e composição livre só na cauda longa.

##### UI generativa × Design system

A UI generativa promete tela sob medida; o design system existe para consistência, acessibilidade e marca.

**Equilíbrio:** composição sobre catálogo, não geração livre. O design system vira o vocabulário do agente.

##### Velocidade × Compliance

A IA evolui em semanas; ciclos de compliance formal levam meses.

**Equilíbrio:** compliance embutido na plataforma (classificação, mascaramento, retenção, registro de execução); escopo inicial de baixo risco; frameworks reconhecidos como NIST AI RMF e ISO/IEC 42001.

##### Automação × Human-in-the-loop

Cada confirmação reduz o ganho; cada automação sem humano aumenta o risco.

**Equilíbrio:** HITL onde o erro é caro ou irreversível; confirmação eficiente, com resumo claro; automação progressiva por evidência.

##### Descentralização × Governança

Domínios autônomos aceleram; a governança precisa de visão do todo.

**Equilíbrio:** catálogos centrais com propriedade distribuída; padrões mínimos obrigatórios (identidade, telemetria, idempotência, classificação) e liberdade no resto.

##### Micro-frontends × Complexidade operacional

Dão autonomia de deploy e cobram com dependências compartilhadas, testes de integração e consistência.

**Equilíbrio:** adoção condicionada a necessidade organizacional medida; monólito modular como padrão.

##### RAG × Confiabilidade

O RAG dá respostas fluentes; fluência não é exatidão.

**Equilíbrio:** governança na origem; citações verificáveis; contexto enxuto; avaliação contínua; a regra no domínio — o documento explica, a API decide.

##### Autonomia × Auditabilidade

Quanto mais o agente decide sozinho, mais difícil explicar depois por que algo aconteceu.

**Equilíbrio:** registro de execução completo; decisões de negócio fora do modelo, para que a explicação seja uma regra; delegação explícita (RFC 8693).

##### Personalização × Privacidade

Quanto mais profunda a personalização, mais dados ela usa; a LGPD exige finalidade, necessidade e transparência.

**Equilíbrio:** personalizar por contexto e estado antes de personalizar por inferência; minimizar o contexto do modelo; ser transparente; memória de longo prazo opcional e apagável.

##### Consistência eventual × Experiência

Arquiteturas distribuídas aceitam atrasos; o colaborador espera ver o resultado na hora.

**Equilíbrio:** estados intermediários honestos (“registrado, aguardando aprovação”, não “pronto”); atividades de progresso; leitura da própria escrita pelo BFF.

##### Três paradoxos adicionais

##### Agente da plataforma × agente independente

Quando a experiência roda sobre uma plataforma SaaS, o agente nativo integra-se rápido aos dados dela, mas fica acoplado ao fornecedor e enxerga pouco dos outros sistemas. O agente independente vê todo o ecossistema, mas exige construir integração, identidade e UI.

**Na prática** **[INFERÊNCIA]**: arquiteturas híbridas — agentes de plataforma para tarefas dentro dela e um agente de entrada independente que delega a esses agentes, via A2A.

##### Adoção de protocolos × Estabilidade

Adotar AG-UI, MCP e A2A cedo traz interoperabilidade; as especificações ainda mudam de forma incompatível. A revisão 2026-07-28 do MCP, por exemplo, removeu sessões e o handshake de inicialização **[FATO]**.

**Na prática:** adaptadores internos que isolam o protocolo, testes de contrato e acompanhamento das políticas de depreciação (o MCP passou a ter janela mínima de 12 meses).

##### Qualidade × Custo

Modelos maiores, mais contexto e mais passos aumentam a qualidade e o custo.

**Na prática:** roteamento por complexidade (modelo menor para classificação, maior para casos difíceis), cache de respostas de conhecimento por segmento, orçamento por intenção e alertas de custo.

##### Dezessete anti-patterns

Riscos genéricos de qualquer organização nessa trajetória, não atribuídos a nenhuma em particular; os trechos “como aparece” são ilustrativos. A gravidade é a do estudo.

01 Alta

##### Agente como novo ESB

**Como aparece**

um “agente corporativo” central com dezenas de ferramentas que transformam dados, decidem roteamentos e coordenam sistemas; um único time é dono de tudo.

**Por que é problema**

reproduz o gargalo do barramento central e acrescenta comportamento probabilístico.

**Como detectar**

ferramentas que chamam vários sistemas e decidem algo; regras em prompts.

**Alternativa**

o agente é um canal; ferramentas são adaptadores finos dos domínios; agregação no BFF; processos no workflow engine.

02 Alta

##### Lógica de negócio dentro do LLM

**Como aparece**

o prompt contém “colaboradores com mais de 12 meses têm direito a…”; o agente decide elegibilidade por raciocínio.

**Por que é problema**

inconsistência entre execuções, regras duplicadas que divergem do sistema, explicação não auditável.

**Como detectar**

números, prazos e condições de elegibilidade nas instruções de sistema.

**Alternativa**

regras em serviços de domínio ou motores de regras, consultados por ferramenta.

03 Crítica

##### Acesso irrestrito do agente às APIs

**Como aparece**

uma credencial com acesso amplo “para não travar o piloto”.

**Por que é problema**

excesso de funcionalidade, permissão e autonomia (OWASP LLM06); uma injeção indireta ganha o poder da credencial.

**Como detectar**

escopos curinga; ferramentas genéricas como `executar_consulta`; a mesma credencial para todos.

**Alternativa**

catálogo mínimo de ferramentas estreitas; token delegado por usuário; autorização no ponto do dado.

04 Alta

##### RAG como substituto de governança

**Como aparece**

“não precisamos organizar os normativos; a IA encontra”.

**Por que é problema**

o RAG recupera o mais similar, não o vigente nem o aplicável; a resposta é fluente e errada, e ninguém responde por ela.

**Como detectar**

índice alimentado por “todos os PDFs”; sem metadados de vigência; sem dono de conteúdo no projeto.

**Alternativa**

governar na origem; o RAG reflete essa governança.

05 Alta

##### Banco vetorial sem metadados

**Como aparece**

chunks e embeddings sem permissão, vigência, aplicabilidade ou origem.

**Por que é problema**

impossível filtrar por público ou permissão no índice; o filtro acaba aplicado depois — ou delegado ao modelo.

**Como detectar**

o schema do índice tem só `id`, `texto` e `vetor`.

**Alternativa**

índice híbrido com metadados e ACLs de primeira classe; pré-filtro por identidade.

06 Alta

##### Gerar UI arbitrária

**Como aparece**

o modelo gera HTML, CSS ou JavaScript renderizados diretamente.

**Por que é problema**

superfície de injeção, acessibilidade imprevisível, inconsistência, impossível certificar.

**Como detectar**

`innerHTML` com conteúdo do modelo; ausência de catálogo de componentes.

**Alternativa**

composição declarativa sobre catálogo aprovado, ou UI isolada em sandbox, com validação de props.

07 Média

##### Micro-frontends sem necessidade

**Como aparece**

adotados porque “é arquitetura moderna”, com um ou dois times.

**Por que é problema**

custos de dependências, testes de integração, desempenho e consistência sem o benefício de deploys independentes de vários times.

**Como detectar**

menos de três times no shell; gargalo de release não medido.

**Alternativa**

monólito modular com fronteiras claras.

08 Média

##### Transformar tudo em microsserviços

**Como aparece**

reescrever sistemas de registro estáveis em serviços menores como pré-requisito para IA.

**Por que é problema**

anos sem valor; complexidade distribuída. O agente precisa de contratos, não de microsserviços.

**Como detectar**

o plano de IA depende de uma reescrita.

**Alternativa**

expor as capacidades existentes por APIs; estrangulamento (*strangler fig*) só quando a substituição for necessária.

09 Média

##### Eventos onde uma API simples bastaria

**Como aparece**

consultas síncronas modeladas como pares de eventos de pedido e resposta.

**Por que é problema**

latência, correlação difícil, depuração penosa, sem ganho de desacoplamento.

**Como detectar**

eventos esperando resposta.

**Alternativa**

API síncrona para consultas e comandos imediatos; eventos para fatos com vários consumidores.

10 Média

##### Multi-agente sem necessidade

**Como aparece**

“agente orquestrador”, “agente de RH”, “agente revisor” para um escopo que um agente com ferramentas filtradas resolveria.

**Por que é problema**

multiplica latência, custo e pontos de falha; dificulta depuração e avaliação. A recomendação é começar pela solução mais simples.

**Como detectar**

mais de um agente sem fronteira clara de dono.

**Alternativa**

um agente com catálogo filtrado por intenção; separar só com fronteira real de dono, política ou fornecedor.

11 Média

##### Confundir chatbot com agente

**Como aparece**

um bot de perguntas e respostas vendido como “agente autônomo” — ou um agente com ferramentas de escrita governado como chatbot.

**Por que é problema**

expectativas erradas e, mais grave, controles insuficientes para quem executa ações.

**Como detectar**

o controle não acompanha o que o sistema consegue fazer.

**Alternativa**

usar a taxonomia (chatbot, copilot, RAG, agente, agente com ferramentas, workflow com agentes, multi-agente) e controles proporcionais.

12 Alta

##### Confundir busca vetorial com conhecimento

**Como aparece**

“temos um banco vetorial, então temos uma base de conhecimento”.

**Por que é problema**

conhecimento exige validade, aplicabilidade, autoria e relações; similaridade semântica não captura nenhuma.

**Como detectar**

sem metadados nem donos.

**Alternativa**

conhecimento = conteúdo governado + metadados + relações + busca híbrida + avaliação.

13 Média

##### MCP como solução universal de integração

**Como aparece**

“um servidor MCP na frente de cada sistema e pronto”.

**Por que é problema**

o MCP padroniza como o agente descobre e chama ferramentas; não resolve contrato de domínio, consistência, processos longos nem eventos — e a especificação ainda muda.

**Como detectar**

sem BFF, APIs ou workflows por trás.

**Alternativa**

MCP como interface agente ↔ ferramentas, sobre uma camada de integração convencional.

14 Alta

##### IA para compensar processo mal definido

**Como aparece**

um agente na frente de um processo com regra tácita, sem dono ou inconsistente.

**Por que é problema**

automatiza a inconsistência e esconde lacunas de governança atrás de uma interface fluente.

**Como detectar**

processos de vários dias que dependem do estado da conversa.

**Alternativa**

usar a descoberta do projeto para explicitar regras, exceções e donos.

15 Crítica

##### Token passthrough e conta de serviço genérica

**Como aparece**

o agente repassa o token do usuário a qualquer API, ou usa uma conta de serviço única para tudo.

**Por que é problema**

o MCP proíbe o passthrough: contorna controles, compromete a trilha de auditoria e quebra fronteiras de confiança. A conta genérica apaga o “em nome de quem”.

**Como detectar**

o agente repassa tokens ou compartilha credencial.

**Alternativa**

token exchange com delegação (sujeito + ator) e audiência por recurso.

16 Média

##### Remover a navegação antes de provar o agente

**Como aparece**

a home vira só uma caixa de conversa.

**Por que é problema**

quem sabe o que quer perde eficiência; falhas do agente ficam sem alternativa; a confiança cai.

**Como detectar**

sem caminho de navegação equivalente.

**Alternativa**

coexistência: agente como entrada preferencial, navegação sempre disponível; remoção gradual por evidência de uso.

17 Média

##### Medir sucesso por volume de conversas

**Como aparece**

a métrica do projeto é “número de interações com o assistente”.

**Por que é problema**

mais conversas podem significar mais confusão; incentiva o engajamento, não a resolução.

**Como detectar**

a métrica principal é volume de uso.

**Alternativa**

resolução por intenção, tempo até a resolução, recontato, esforço percebido.

##### Checklist rápido de detecção

- Há regras de negócio em prompts?
- Alguma ferramenta tem escopo curinga ou é genérica?
- O índice tem metadados de permissão e vigência?
- O modelo gera marcação renderizada diretamente?
- Há mais de um agente sem fronteira clara de dono?
- O agente repassa tokens ou usa conta de serviço compartilhada?
- Processos de vários dias dependem do estado da conversa?
- A métrica principal é volume de uso?

Qualquer “sim” indica um anti-pattern a tratar antes de ampliar o escopo.

**Matriz tecnológica: o que é necessário e o que é alternativa **[INFERÊNCIA]****

A matriz **compara, não elege**: necessárias são *capacidades*; tecnologias são alternativas de implementação.

**Capacidade necessária × alternativas de implementação**

| Necessário (capacidade) | Alternativas de implementação |
| --- | --- |
| Identidade federada com delegação | qualquer IdP com OAuth 2.x e token exchange ou mecanismo equivalente |
| Autorização no ponto do dado | RBAC + ABAC, ReBAC, motores OPA ou Cedar, regras no próprio sistema de registro |
| APIs com contrato para as capacidades usadas | REST, GraphQL, gRPC; via gateway e BFF ou diretamente |
| Processos duráveis com etapas humanas | Temporal, motores BPMN, workflow nativo do sistema ou da plataforma SaaS |
| Conteúdo com metadados, vigência e permissões | ECM/CSP, CMS headless, plataformas de produtividade |
| Busca híbrida com filtros de permissão | Elasticsearch, OpenSearch, serviços gerenciados, combinações |
| Protocolo de interação agente ↔ UI | AG-UI, protocolo próprio, recursos da plataforma SaaS |
| UI generativa governada | A2UI, MCP Apps, Open-JSON-UI, schema próprio sobre o design system |
| Interface padronizada de ferramentas | MCP, chamadas de função nativas do framework, integração direta |
| Observabilidade ponta a ponta | OpenTelemetry com qualquer backend compatível |
| Avaliação contínua | frameworks de avaliação diversos, ferramentas próprias |

**Não são requisitos:** micro-frontends, Kafka, service mesh, banco vetorial dedicado, multi-agente, MACH completo. Cada um faz sentido em contextos específicos.

Operação **[RECOMENDAÇÃO]**

#### Operar um agente: traces, SLOs de qualidade e custo

Na operação tradicional, um sistema saudável é um sistema disponível e rápido. Em uma plataforma orientada a agentes ele pode estar disponível, rápido e **errado**: respondendo com uma política revogada, escolhendo a ferramenta errada, entrando em loops que multiplicam custo ou degradando devagar depois de uma troca de modelo. São **incidentes silenciosos**, invisíveis para os painéis de infraestrutura.

##### Três planos de observabilidade

##### Serviços

*Está de pé e rápido?* Métricas RED/USE, logs, traces distribuídos. Dono: SRE e times de serviço.

##### Agente

*O que o agente fez e por quê?* Spans de execução, passos, tool calls, tokens, latência do modelo, decisões de política. Dono: plataforma de IA.

##### Qualidade e experiência

*O resultado foi bom?* Avaliações, groundedness, feedback, resolução por intenção, DEX. Dono: produto, conteúdo e IA.

**[FATO]** O OpenTelemetry mantém convenções semânticas para GenAI (ainda em evolução), e a revisão 2026-07-28 do MCP documenta a propagação de `traceparent` entre agente e servidor de ferramentas. Os eventos `RUN_*` e `STEP_*` do AG-UI delimitam execuções e servem de âncora para spans do lado da experiência **[INFERÊNCIA]**. Dados pessoais em traces: prompts e respostas completos vão para armazenamento restrito e de retenção curta, ou são mascarados.

##### SLOs que incluem qualidade e custo

**Exemplos de objetivo, a calibrar por intenção **[RECOMENDAÇÃO]****

| Família | Indicador (SLI) | Exemplo de objetivo |
| --- | --- | --- |
| Disponibilidade | execuções sem `RUN_ERROR` por falha de plataforma | ≥ 99,5% |
| Latência | tempo até o primeiro token | p95 < 1,5 s |
| Latência | turno com até 2 ferramentas | p95 < 8 s |
| Qualidade | respostas de conhecimento sustentadas pelas fontes (amostral) | ≥ 95% |
| Qualidade | vazamento de permissão nos testes contínuos | 0 |
| Valor | resolução sem humano nas intenções habilitadas | ≥ linha de base por intenção |
| Custo | custo por intenção resolvida | ≤ orçamento por intenção |

Quando o **orçamento de erro de qualidade** estoura — por exemplo, groundedness abaixo do objetivo por duas semanas —, mudanças de prompt, de modelo e do catálogo de ferramentas ficam congeladas até a correção. É a mesma disciplina que já existe para disponibilidade, aplicada à qualidade.

**[INFERÊNCIA]** Um agente que encadeia ferramentas herda a disponibilidade *combinada* das dependências: três sistemas com 99,5% cada deixam uma resposta que depende dos três perto de 98,5%. Daí a degradação graciosa por ferramenta, as projeções de leitura e os caches, o fallback de modelo avaliado previamente e, por último, a navegação tradicional.

**Métricas específicas de agentes**

**Oito categorias**

| Categoria | Métrica | Por que importa |
| --- | --- | --- |
| Latência | tempo até o primeiro token; turno completo; por ferramenta; do modelo | percepção do usuário e diagnóstico de gargalo |
| Custo | tokens por turno, conversa e intenção resolvida; custo por modelo | orçamento e detecção de loops |
| Ferramentas | taxa de erro, timeouts, retries, circuitos abertos | saúde das dependências |
| Agente | passos por tarefa, replanejamento, tarefas que atingem o limite de passos | eficiência e loops |
| Retrieval | resultados vazios, score médio, distribuição de fontes, idade do conteúdo citado | qualidade do conhecimento |
| Segurança | negações de política, detecções de injeção, interrupções abandonadas | postura de risco |
| Qualidade | groundedness amostral, correção avaliada, feedback negativo por motivo | qualidade percebida |
| Experiência | resolução por intenção, escalonamento, recontato, abandono | valor entregue |

Medir pela **intenção**, não pela tela: com a interface dinâmica, tempo na página e cliques perdem sentido. As métricas de experiência são taxa de resolução, tempo até a resolução, esforço percebido, turnos por resolução, taxa de edição em confirmações, abandono por etapa, escalonamento e recontato em 7 dias. Combinadas com a telemetria e o sentimento de ferramentas de DEX, formam uma visão independente da forma da interface **[RECOMENDAÇÃO]**.

**Incidentes de agente e runbook específico**

**Seis tipos de incidente**

| Tipo | Exemplo | Detecção |
| --- | --- | --- |
| Disponibilidade | provedor de modelo fora | métricas de erro |
| Latência | sistema lento derruba os turnos | latência por ferramenta |
| Qualidade | reindexação quebrou o chunking; respostas sem fonte | avaliação contínua, feedback |
| Segurança | vazamento de conteúdo restrito | testes contínuos de permissão, relatos |
| Custo | loop de ferramentas multiplica tokens | alertas de custo por conversa |
| Comportamento | o agente passou a executar ação sem confirmação após mudar o prompt | testes de regressão, auditoria |

1. **Kill switches** por ferramenta, por intenção e para o agente inteiro.
2. **Rollback de configuração:** instruções, catálogo e versão do modelo são versionados e revertíveis.
3. **Reprodução:** o registro de execução permite reexecutar o caso com o mesmo contexto em ambiente de teste.
4. **Comunicação:** se houve resposta errada sobre uma política, avaliar notificar os afetados.
5. **Pós-incidente:** classificar a causa por camada (conteúdo, busca, modelo, ferramenta, processo, política).

**Avaliação contínua e plataforma interna**

- **Avaliação em produção:** amostragem com avaliação humana; avaliador automático calibrado por humanos; testes sintéticos periódicos; testes de permissão contínuos com identidades de baixo privilégio; análise de feedback; canary e A/B de configuração.
- **Plataforma interna:** caminhos pavimentados (template de servidor de ferramentas com autenticação delegada, idempotência, telemetria e testes); catálogo de ferramentas e componentes com dono, versão, classificação e SLO; ambientes de avaliação com sistemas simulados; orçamentos de custo de modelo por domínio.
- **[INFERÊNCIA]** Maturidade: SRE e observabilidade distribuída são maduros; observabilidade e avaliação de agentes estão em consolidação.

Para operação de serviço e SRE em outra escala, veja [Service Operations 2.0](https://mauricio.issei.com.br/service-operations-2-0).

Roadmap **[RECOMENDAÇÃO]**

#### Seis fases, sete trilhas e um caminho crítico

Fases têm **critério de passagem**; trilhas avançam em paralelo e em ritmos diferentes. Não há prazos: a duração depende do estado atual, que só a descoberta revela. Todo o roadmap é recomendação do estudo e não descreve o plano de nenhuma organização.

Identidade delegada (T2) e conteúdo governado com permissões (T3) costumam ser as dependências mais lentas, porque envolvem fornecedores de IdP, sistemas legados e donos de conteúdo de várias áreas **[INFERÊNCIA]**. Começá-las na fase 0 evita que bloqueiem as fases 3 e 4.

**Sete trilhas × seis fases, com os critérios de passagem no rodapé. As linhas T2 e T3 são o caminho crítico.**

| Trilha | Fase 0 Descoberta e linha de base | Fase 1 Fundações mínimas | Fase 2 AI-Enhanced no piloto | Fase 3 Agente com leitura | Fase 4 Ações com confirmação | Fase 5 Expansão e autonomia por evidência |
| --- | --- | --- | --- | --- | --- | --- |
| T1 · Produto e jornadas Product Strategist | ranking das 50 intenções principais; linha de base de resolução, tempo e esforço; 2 ou 3 jornadas piloto | — | medição de resolução e recontato contra a linha de base | — | taxa de edição nas confirmações; satisfação | repete as fases 1–4 em novas jornadas; mede cobertura de intenções e resolução global |
| T2 · Identidade e autorizaçãocaminho críticoSecurity / IAM | inventário de IdP e protocolos; viabilidade de token exchange; modelo de autorização atual | padrão de token delegado; motor de políticas para as APIs piloto; registro de execução especificado | — | token delegado em produção; auditoria de leituras | elevação incremental de escopo; reautenticação para ações sensíveis | repete as fases 1–4 na nova jornada |
| T3 · Conteúdo e conhecimentocaminho críticoContent / Search | inventário de conteúdo das jornadas piloto; diagnóstico de metadados e permissões | fonte canônica, vigência, dono e permissões; eventos de ciclo de vida | busca híbrida com ACLs no índice; testes contínuos de vazamento | — | — | repete as fases 1–4 na nova jornada |
| T4 · Capacidades e integração Enterprise / Integration | inventário de sistemas de registro e maturidade de API | APIs com contrato; BFF do canal agente; workflow para processos longos | — | — | início de workflows por ferramenta; estados intermediários honestos; notificações por evento | repete as fases 1–4 na nova jornada |
| T5 · Experiência UX / Front-end | avaliação do design system e da plataforma de experiência | catálogo inicial de componentes de agente (confirmação, progresso, fontes, handoff) | pergunta e resposta com fontes, feedback e navegação preservada | protocolo de interação (ex.: AG-UI encapsulado); componentes de dados (cartões, tabelas) | UI generativa restrita a catálogo; confirmação fixa; interrupções formais | evolui o catálogo guiado por intenções não atendidas; canais adicionais |
| T6 · IA e agentes AI Architect | análise de assistentes de IA já existentes, se houver (catálogo, tecnologia, handoff) | conjunto de avaliação das jornadas piloto | RAG com citações; avaliação de groundedness | agente com ferramentas de leitura; limites de passos e custo | ferramentas de escrita idempotentes | autonomia por classe de ação (“executar e notificar”) com base em evidência; agentes de domínio (A2A) onde houver fronteira real |
| T7 · Governança e operação Governance + SRE | política de IA vigente; classificação de dados; stack de observabilidade | caso de uso no inventário de IA; OpenTelemetry nas APIs piloto | SLOs de qualidade; painel por intenção; revisão amostral | traces de agente correlacionados; alertas de custo | revisão de auditoria por amostragem; kill switches testados; runbook de incidentes de agente | repete as fases 1–4; mede custo por intenção resolvida |
| Critério de passagem | jornadas piloto escolhidas por volume, valor e viabilidade; lacunas prioritárias conhecidas | checklist de prontidão para RAG atendido no escopo piloto; APIs piloto com SLO | groundedness e recuperação acima dos limiares; zero vazamentos nos testes; melhoria de resolução medida | erro de ferramentas e latência dentro do SLO; auditoria validada por Segurança e Compliance | taxa de erro de ação aceitável por um período definido; nenhuma ação sem confirmação registrada; exceções humanas com contexto | cada ampliação de autonomia exige evidência de segurança e de qualidade |

*Figura 7 · Grade fases × trilhas. Com JavaScript, os botões esmaecem as outras linhas (continuam no documento e na árvore de acessibilidade); sem JavaScript, a tabela é completa.*

##### Seis princípios do roadmap

1. **Problema antes de tecnologia:** cada fase começa por intenções priorizadas com dados.
2. **Fundações antes de autonomia:** identidade, contratos e conteúdo governado antecedem ações do agente.
3. **Escopo vertical:** avançar jornada por jornada, e não camada por camada em toda a empresa.
4. **Valor visível cedo:** cada fase entrega algo que o colaborador percebe.
5. **Reversibilidade:** kill switches, coexistência com a navegação, protocolos encapsulados.
6. **Evidência para ampliar autonomia:** um nível só sobe com métricas de segurança e qualidade.

**Como escolher a jornada piloto**

**Critérios e peso sugerido **[RECOMENDAÇÃO]****

| Critério | Peso | Por quê |
| --- | --- | --- |
| Volume de intenções | alto | valor perceptível |
| Baixo risco da ação | alto | segurança no aprendizado |
| APIs disponíveis | alto | viabilidade |
| Conteúdo governável | médio | qualidade das respostas |
| Dono de processo engajado | alto | recebe feedback e resolve exceções |
| Baixa sensibilidade de dados | médio | reduz a carga de compliance inicial |

**[HIPÓTESE]** “Férias” (alto volume, regra clara, risco moderado) e “chamado de TI” (alto volume, baixo risco) tendem a ser melhores pilotos do que “inclusão de dependente” (dados sensíveis) ou “solicitação de acesso” (risco de segurança).

**Riscos do roadmap e métricas por fase**

**Riscos e mitigações**

| Risco | Mitigação |
| --- | --- |
| Fundações “invisíveis” perdem patrocínio | entregar cedo a busca melhorada (fase 2) como valor visível |
| Pressão por pular para ações | critérios de passagem explícitos e acordados com patrocinadores |
| Mudança de especificação de protocolos | adaptadores internos; testes de contrato |
| Fornecedor de uma plataforma SaaS lança agente próprio durante o programa | decisão explícita agente da plataforma × independente, revisitada a cada fase |
| Dependência de time central | caminhos pavimentados e propriedade distribuída de ferramentas |

**Métricas principais por fase**

| Fase | Métricas |
| --- | --- |
| 0 | cobertura do inventário; linha de base definida |
| 1 | % do conteúdo piloto com metadados obrigatórios; APIs com SLO |
| 2 | recall@k, groundedness, vazamentos (zero), resolução |
| 3 | latência por turno, erro de ferramentas, custo por conversa |
| 4 | erros de ação, taxa de edição, exceções resolvidas no SLA, satisfação |
| 5 | cobertura de intenções, resolução global, custo por intenção resolvida |

Prontidão **[RECOMENDAÇÃO]**

#### Prontidão agêntica por jornada

Pontue **uma jornada** do seu contexto — não o portal inteiro — em dez critérios: 0 = ausente, 1 = parcial, 2 = completo. O total vai de 0 a 20 e sugere o que a jornada tende a suportar hoje. Os limiares são uma proposta do estudo, ainda não validados em campo **[HIPÓTESE]**. O cálculo acontece no seu navegador: nada é enviado e nada é guardado.

Critério sem resposta conta como ausente (0).

- Intenção priorizada com linha de base: 0 ausente · 1 parcial · 2 completo

- Processo explícito com dono: 0 ausente · 1 parcial · 2 completo

- APIs com contrato: 0 ausente · 1 parcial · 2 completo

- Identidade delegada: 0 ausente · 1 parcial · 2 completo

- Conteúdo governado: 0 ausente · 1 parcial · 2 completo

- Busca com permissões: 0 ausente · 1 parcial · 2 completo

- Componentes no catálogo: 0 ausente · 1 parcial · 2 completo

- Conjunto de avaliação: 0 ausente · 1 parcial · 2 completo

- Observabilidade e auditoria: 0 ausente · 1 parcial · 2 completo

- Aprovação de governança: 0 ausente · 1 parcial · 2 completo

O botão exige JavaScript. Sem ele, faça a soma dos pontos à mão e compare com a tabela de faixas ao lado.

Resultado

– / 20

Responda aos critérios para ver a faixa.

A faixa é um indicador, não uma aprovação: lacuna em identidade delegada ou em conteúdo governado bloqueia as fases 3 e 4 do roadmap, seja qual for o total. Nada sai do navegador e nada é persistido.

**Faixas**

| Total | Leitura |
| --- | --- |
| 0 a 9 | pouco pronta para IA: trabalhar fundações |
| 10 a 15 | pronta para RAG e ferramentas de leitura, se as lacunas listadas não forem bloqueantes |
| 16 a 20 | candidata a ações com confirmação, desde que identidade delegada, conteúdo governado e governança não estejam em 0 |

**Métricas de maturidade por dimensão e sinais de regressão**

**Vinte métricas e o estágio em que passam a importar **[RECOMENDAÇÃO]****

| Dimensão | Métrica | Como medir | Estágio |
| --- | --- | --- | --- |
| Produto | resolução sem humano por intenção | telemetria + recontato | 2 |
| Produto | tempo até a resolução | do pedido ao resultado no sistema de registro | 2 |
| Produto | esforço percebido | pesquisa curta pós-interação | 2 |
| Integração | % das capacidades prioritárias com API e contrato versionado | catálogo | 3 |
| Integração | % das capacidades com SLO publicado | catálogo | 3 |
| Processo | % dos processos prioritários com dono, regra explícita e fila de exceção | inventário | 3 |
| Conteúdo | % do conteúdo indexado com vigência, dono e permissão | validação de metadados | 4 |
| Conteúdo | tempo de propagação de revogação ao índice | eventos | 4 |
| Busca | recall@k e nDCG no conjunto de avaliação | avaliação | 4 |
| Busca | vazamentos em testes de permissão (meta: zero) | testes contínuos | 4 |
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

**Sinais de regressão:** queda de groundedness após mudar de modelo ou de chunking; aumento da taxa de edição em confirmações (a coleta piorou); aumento de escalonamentos por “não entendi”; crescimento do custo por intenção sem ganho de resolução; idade média crescente do conteúdo citado (curadoria parada).

A prontidão de um *site* para ser lido por agentes, em outra escala, é tema de [Agent Ready](https://mauricio.issei.com.br/agent-ready).

Perguntas críticas

#### Trinta perguntas, em cinco grupos

Cada resposta traz a conclusão e o selo que diz o quanto ela se sustenta. Abra a que interessa; o resto fica recolhido.

##### 1 · Experiência, protocolos e interface (1 a 8)

**1. O que diferencia uma intranet moderna de uma EXP?**

**[INFERÊNCIA]**

A intranet informa e encaminha; a EXP executa e acompanha. A intranet organiza páginas e audiências e mede alcance; a EXP organiza serviços e jornadas sobre os sistemas de registro, mede resolução e esforço e mantém o contexto do colaborador em vários canais.

**2. Uma EXP precisa ser composable?**

**[INFERÊNCIA]**

Não necessariamente. A componibilidade se paga com muitos domínios, muitos canais e estratégia de trocar fornecedores. Para agentes, o requisito real é que as capacidades estejam expostas por contrato: uma suíte com boas APIs atende melhor do que uma arquitetura componível sem contratos estáveis.

**3. MACH é requisito arquitetural ou estratégia possível?**

**[RECOMENDAÇÃO]**

Estratégia possível. API-first e headless valem para agentes; microsserviços só onde há fronteira organizacional. Vale lembrar que a MACH Alliance é uma associação de fornecedores, e seu material é posicionamento de mercado.

**4. Onde o AG-UI realmente se encaixa?**

**[FATO]**

Entre o runtime do agente e a aplicação que o usuário opera. O MCP conecta agente e ferramentas, o A2A conecta agentes, o AG-UI conecta o agente ao usuário. Ele não se encaixa na integração com sistemas de registro nem na autorização.

**5. AG-UI é protocolo de UI, de integração ou de interação?**

**[FATO]**

De interação. A documentação o descreve como a conexão de runtime bidirecional entre agente e aplicação e o distingue das especificações de UI generativa. Não define componentes nem conecta sistemas.

**6. Qual a relação entre AG-UI e UI generativa?**

**[FATO]** **[INFERÊNCIA]**

Canal e vocabulário. As especificações de UI generativa definem *o que* renderizar; o AG-UI transporta esses pedidos até o cliente e traz as ações de volta. Na prática, ferramentas de frontend do AG-UI podem pedir a renderização de componentes do catálogo.

**7. Como preservar determinismo em uma interface generativa?**

**[RECOMENDAÇÃO]**

Determinismo onde importa, adaptação no restante. São determinísticos: a renderização de cada componente, a validação de props, a execução de ações e os componentes de confirmação e de aviso legal. São adaptativos e restritos: a escolha do componente dentro do catálogo, o texto explicativo e a composição dentro de templates. Intenções de alto volume usam templates fixos; a composição livre fica para a cauda longa.

**8. Como um design system se torna consumível por agentes?**

**[RECOMENDAÇÃO]**

Transformando componentes em ferramentas tipadas e descritas, num Component Registry: descrição de quando usar e não usar; JSON Schema das props; ações emitidas e efeito colateral; contexto exigido; auditoria de acessibilidade por componente; tokens padronizados (o formato do W3C Design Tokens Community Group é estável desde outubro de 2025); e avaliações que verificam se o agente escolhe o componente certo.

##### 2 · Conhecimento e busca (9 a 11)

**9. Qual a relação entre ECM, CSP, headless, busca e RAG?**

**[INFERÊNCIA]**

Uma cadeia em que cada elo herda a qualidade do anterior e não consegue corrigi-la. ECM guarda registros governados; CSP os expõe como serviços; headless estrutura conteúdo de experiência para vários canais; a busca encontra o trecho certo para a pessoa certa; o RAG gera a resposta fundamentada.

**10. O que precisa estar estruturado antes de implementar RAG?**

**[RECOMENDAÇÃO]**

Seis bloqueantes: fonte canônica por tipo de conteúdo; permissões explícitas e exportáveis ao índice; status e vigência; dono de cada conteúdo; classificação da informação com regra de uso por IA; conjunto de avaliação com perguntas reais. Taxonomia, metadados de aplicabilidade, estrutura de seções, eventos de ciclo de vida e deduplicação são fortemente recomendados.

**11. Como implementar e verificar permission-aware retrieval?**

**[RECOMENDAÇÃO]**

Com pré-filtro de permissão no índice, usando a identidade resolvida pelo IdP: permissões como metadados de cada chunk; filtro na consulta, nunca depois que o modelo viu o conteúdo; sincronização por eventos com SLO de propagação; testes contínuos de vazamento com identidades de baixo privilégio; revisão de oversharing antes de indexar.

##### 3 · Agentes e integração (12 a 18)

**12. Quando um chatbot deixa de ser chatbot e passa a ser agente?**

**[INFERÊNCIA]**

Quando decide dinamicamente o próximo passo, usa ferramentas com efeito e itera até o objetivo. Um bot que só responde, mesmo com LLM, é chatbot ou RAG. A distinção importa porque os controles precisam acompanhar: quem executa ações precisa de identidade delegada, escopo e HITL.

**13. O que diferencia um agente de um workflow automatizado?**

**[FATO]** **[RECOMENDAÇÃO]**

Quem define a sequência. Em workflows, LLMs e ferramentas são orquestrados por caminhos de código pré-definidos; em agentes, o LLM dirige dinamicamente o próprio processo e o uso de ferramentas. Workflows ganham em previsibilidade e testabilidade; agentes, em flexibilidade na cauda longa. Em processos regulados, prefira workflows com etapas de LLM.

**14. Qual o papel do MCP nessa arquitetura?**

**[INFERÊNCIA]**

Interface padronizada entre o agente e o catálogo de ferramentas, com modelo de autorização especificado. Resolve descoberta, schema de chamada, autorização OAuth no acesso ao servidor e propagação de trace. Não resolve regra de negócio, integração com sistemas, processos longos nem eventos. Exige validação de audiência e proíbe o *token passthrough*. Recomenda-se encapsular o protocolo, dada a velocidade de mudança.

**15. Qual o papel do BFF quando agentes têm ferramentas?**

**[RECOMENDAÇÃO]**

Moldar as capacidades para o canal agente: reduzir payload e ruído, agregar consultas frequentes, normalizar erros em mensagens explicáveis, impor paginação e limites, aplicar a política do canal. O BFF não contém regra de negócio; o MCP define *como* a ferramenta é chamada, e o BFF, *o que* ela devolve.

**16. Quando utilizar API?**

**[INFERÊNCIA]**

Quando o canal precisa de resposta imediata sobre o estado atual ou quer comandar uma ação cuja aceitação pode ser decidida na hora. É o padrão para a maioria das ferramentas de leitura e para comandos que iniciam processos. Sinal de uso errado: operações longas resolvidas por chamada síncrona com timeouts altos.

**17. Quando utilizar eventos?**

**[INFERÊNCIA]**

Quando vários consumidores reagem a um fato já ocorrido, o produtor não deve conhecê-los e a reação pode ser assíncrona: notificações proativas, projeções de leitura, sincronização entre sistemas, gatilhos de reindexação. Sinal de uso errado: eventos usados como pedido e resposta.

**18. Quando utilizar um workflow engine?**

**[RECOMENDAÇÃO]**

Quando o processo tem estado durável, etapas humanas, timers, compensações ou longa duração. O agente inicia o workflow com idempotência, consulta o estado e responde a sinais do usuário; nunca guarda o estado do processo na própria memória.

##### 4 · Identidade, auditoria e exceções (19 a 21)

**19. Como preservar identidade e autorização durante a execução do agente?**

**[RECOMENDAÇÃO]** **[FATO]**

Delegação explícita com identidade composta, verificada em cada recurso: o usuário autentica na experiência; para cada ferramenta, o runtime obtém um token por *token exchange* (sujeito = usuário, ator = agente, claim `act`, escopo mínimo, audiência específica, conforme a RFC 8693); os servidores de ferramentas validam a audiência e não repassam o token; a autorização final acontece no ponto do dado; e o “de quem” vem do token, nunca de parâmetros gerados pelo modelo.

**20. Como auditar uma decisão ou ação realizada por um agente?**

**[RECOMENDAÇÃO]**

Com um registro de execução por tarefa, correlacionado ao sistema de registro. A auditoria localiza a execução pelo protocolo da transação, reconstrói o contexto vigente (instruções, fontes e versões), verifica se a regra veio do domínio e não foi inferida pelo modelo, confere sujeito, ator, escopo e decisão de política, verifica a confirmação explícita e permite a revisão humana prevista no art. 20 da LGPD.

**21. Como lidar com exceções humanas?**

**[RECOMENDAÇÃO]**

Tratando exceções como estados de primeira classe do processo: cada uma tem tipo, fila com dono, SLA, contexto estruturado transferido e caminho de retorno ao fluxo. Confirmações do usuário presente usam a interrupção do AG-UI; aprovações de terceiros, uma tarefa humana no workflow engine.

##### 5 · Qualidade, operação e prontidão (22 a 30)

**22. Como medir DEX quando a interface é dinâmica?**

**[RECOMENDAÇÃO]**

Medindo pela intenção, não pela tela: resolução por intenção, tempo até a resolução, esforço percebido, turnos por resolução, taxa de edição em confirmações, abandono por etapa, escalonamento e motivo, recontato em 7 dias — combinadas com a telemetria e o sentimento das ferramentas de DEX.

**23. Como testar uma interface que muda conforme o contexto?**

**[RECOMENDAÇÃO]**

Testando componentes, contratos e comportamentos, em vez de telas fixas: componentes com testes unitários, property-based testing e regressão visual; toda saída do agente validada contra o schema do catálogo; avaliações com asserções sobre os eventos AG-UI emitidos para cada intenção; replay de fluxos gravados com um agente simulado determinístico; acessibilidade por componente e por template.

**24. Como testar agentes?**

**[RECOMENDAÇÃO]**

Em camadas, com avaliações estatísticas e regressão em CI: ferramentas (contrato, idempotência, autorização); seleção de ferramenta; trajetória aceitável; resultado em ambiente com sistemas simulados; segurança (red teaming de injeção, escalada e vazamento); regressão com limiares a cada mudança de modelo, prompt ou catálogo; e avaliação amostral contínua em produção.

**25. Como verificar a acessibilidade em UI generativa?**

**[RECOMENDAÇÃO]**

Certificando componentes, não telas, e controlando a dinâmica: só componentes auditados (WCAG 2.2 AA) entram no catálogo; gestão explícita de foco quando o agente insere ou substitui componentes; `aria-live` moderado, com streaming anunciado por etapa; representação textual equivalente de cada componente; caminhos alternativos por navegação.

**26. Como preservar observabilidade em sistemas agênticos?**

**[RECOMENDAÇÃO]**

Observabilidade em três planos (serviços, agente, qualidade), com traces correlacionados de ponta a ponta: OpenTelemetry com as convenções de GenAI; propagação de `traceparent` entre agente e servidores MCP; eventos `RUN_*` e `STEP_*` como âncoras do lado da experiência; SLOs de qualidade e custo além de disponibilidade e latência; dados pessoais mascarados ou em armazenamento restrito.

**27. Quais componentes devem permanecer determinísticos?**

**[RECOMENDAÇÃO]**

Regras de negócio e elegibilidade; autorização e decisões de política; execução de ações e seus efeitos, com idempotência; estado de processos; validação de entradas e de props de UI; renderização de cada componente; componentes de confirmação, consentimento e avisos legais; registros de auditoria; ciclo de vida do conteúdo (vigência, revogação, descarte).

**28. Quais componentes podem ser adaptativos?**

**[RECOMENDAÇÃO]**

Interpretação da intenção; texto explicativo e tom, dentro de guardrails; escolha e ordem de componentes dentro do catálogo e de templates; sugestões de próximos passos; reformulação de consultas de busca; planejamento de sequência em tarefas de baixo risco; destaque e pré-preenchimento. A regra prática: **adaptativo na interpretação e na apresentação, determinístico na decisão e na execução**.

**29. Quais capacidades são pré-requisitos para agentes?**

**[RECOMENDAÇÃO]**

Identidade federada com delegação (agir “em nome de” com rastreabilidade); autorização no ponto do dado (o agente não pode ser a última barreira); APIs com contrato (ferramentas sem API viram automação frágil); processos explícitos com dono e fila de exceção; conteúdo governado com permissões indexáveis; catálogo de serviços e jornadas (sem ele o agente cria um catálogo paralelo); observabilidade e registro de execução; conjunto de avaliação (sem ele, a qualidade não é mensurável); política de IA e classificação de dados.

**30. Quais tecnologias são realmente necessárias e quais são só alternativas?**

**[INFERÊNCIA]**

Necessárias são *capacidades*: identidade com delegação, autorização, APIs com contrato, processos duráveis, conteúdo governado, busca com permissão, protocolo de interação agente-UI, UI generativa governada, interface de ferramentas, observabilidade e avaliação. AG-UI ou protocolo próprio, A2UI, MCP Apps ou schema próprio, MCP ou chamadas nativas, Elasticsearch ou OpenSearch, Temporal ou BPMN são alternativas. Micro-frontends, Kafka, service mesh, banco vetorial dedicado, multi-agente e MACH completo **não são requisitos**.

Estudar **[RECOMENDAÇÃO]**

#### Trilhas de estudo por perfil

O núcleo comum, para todos, é: o problema, a escala de maturidade, o modelo de camadas e os anti-patterns. O objetivo de aprendizagem é conseguir explicar a diferença entre portal que apresenta e plataforma que resolve — e por que agentes dependem de fundações. Depois, cada perfil segue por onde a sua pergunta mora.

##### Arquiteta corporativa ou de solução

**Leia:** arquitetura, integração, fluxo, decisões.

**Exercício:** escolher uma intenção real e desenhar o fluxo pelas camadas, marcando onde ficam regra, estado, autorização e auditoria.

##### Product manager

**Leia:** EXP, experiência por intenção, roadmap.

**Exercício:** montar o ranking das 20 intenções mais frequentes (a fase 0 do roadmap amplia para 50) e classificar cada uma por volume, risco e viabilidade.

##### UX ou service designer

**Leia:** experiência por intenção, UI generativa, AG-UI.

**Exercício:** especificar três componentes de agente (confirmação, progresso, fontes) com quando usar, props e requisitos de acessibilidade.

##### Especialista em IA

**Leia:** agentes e MCP, busca e RAG, conhecimento, AG-UI.

**Exercício:** construir um conjunto de avaliação com 30 perguntas reais, documentos de referência e critérios de groundedness.

##### Plataforma ou SRE

**Leia:** operação, front-end e streaming, integração e resiliência.

**Exercício:** definir SLIs e SLOs para uma intenção, incluindo um SLO de qualidade com orçamento de erro e o runbook de violação.

##### Conteúdo

**Leia:** conteúdo governado, cadeia do conhecimento, busca.

**Exercício:** aplicar o conjunto mínimo de metadados a dez normativos e identificar lacunas de vigência, dono e permissão.

##### Segurança e compliance

**Leia:** identidade e governança, agentes e MCP, perguntas 19 a 30.

**Exercício:** classificar dez ferramentas hipotéticas por risco e definir, para cada uma, escopo, nível de autonomia e regra de HITL.

**Exercício integrador para um grupo multidisciplinar**

1. Escolher uma jornada (por exemplo, férias).
2. Cada perfil analisa a jornada pela própria lente, isoladamente — como no conselho de arquitetura.
3. Consolidar numa matriz de responsabilidades entre papéis (a tabela de doze lentes serve de ponto de partida).
4. Identificar conflitos e resolvê-los com os padrões de trade-offs.
5. Posicionar a jornada no modelo de maturidade e definir a próxima fase do roadmap.


## Perguntas frequentes

**O que é um Digital Workplace orientado a agentes?**

É um portal corporativo orientado a intenção e agentes: em vez de organizar links para sistemas, ele recebe o pedido do colaborador, prepara a ação com um agente, pede confirmação e acompanha o processo até o fim. O estudo o descreve como o quinto estágio de um modelo de maturidade que acumula os anteriores: sem identidade delegada, contratos de API, conteúdo governado e processos explícitos, o agente executa ações com credenciais amplas demais e sem trilha de auditoria.

**O que é uma EXP e como ela difere de uma intranet?**

A Employee Experience Platform (EXP) organiza serviços e jornadas do colaborador sobre os sistemas de registro, com identidade, contexto e entrega em vários canais. A intranet informa e encaminha; a EXP executa e acompanha. A intranet organiza páginas e mede alcance; a EXP organiza jornadas, mede resolução e esforço e mantém o estado das solicitações. Uma EXP não precisa ser componível: o que o agente exige é que as capacidades estejam expostas por contrato.

**O que é o protocolo AG-UI?**

O AG-UI (Agent User Interaction Protocol) é um protocolo de interação entre um agente e a aplicação que o usuário opera, baseado em fluxos de eventos: execuções, mensagens, chamadas de ferramenta, estado compartilhado, atividade e interrupções para confirmação humana. Não é uma especificação de UI generativa, não integra sistemas corporativos e não autoriza ações. Complementa o MCP, que liga agente e ferramentas, e o A2A, que liga agentes entre si.

**Por que RAG não substitui a governança de conteúdo?**

Porque cada elo da cadeia do conhecimento herda a qualidade do anterior e não consegue corrigi-la. O RAG recupera o trecho mais similar, não o vigente nem o aplicável: sem fonte canônica, vigência, dono e permissões no índice, a resposta pode sair fluente e errada. O estudo recomenda seis requisitos bloqueantes antes do RAG e, para ações, a regra de que o documento explica, mas a API decide.

**Com que identidade um agente corporativo deve agir?**

Com delegação, não impersonação: um token obtido por token exchange (RFC 8693) em que o sujeito é o colaborador e o ator é o agente, com escopo mínimo e audiência específica por ferramenta. O servidor de ferramentas valida a audiência e não repassa o token recebido; a autorização final deve acontecer no ponto do dado, e o “de quem” vem do token, nunca de parâmetros gerados pelo modelo.

**Por onde começar a evolução de um portal para esse modelo?**

O estudo recomenda começar por uma jornada piloto de alto volume e baixo risco, e não pela empresa inteira; férias e chamado de TI são hipóteses de bons pilotos, não regra. O roadmap tem seis fases com critério de passagem — descoberta, fundações mínimas, respostas com fonte, agente com ferramentas de leitura, ações com confirmação, expansão por evidência — e sete trilhas paralelas. Identidade delegada e conteúdo governado começam na fase 0, por costumarem ser o caminho crítico.

## Glossário

- **Digital Workplace agêntico** — Portal corporativo que resolve intenções por meio de um agente, sobre fundações de identidade, conhecimento, APIs e processos; quinto estágio do modelo de maturidade.
- **Employee Experience Platform (EXP)** — Camada que organiza serviços e jornadas do colaborador sobre os sistemas de registro, com identidade, contexto e entrega em vários canais.
- **AG-UI** — Protocolo de interação entre agente e aplicação, baseado em fluxos de eventos, estado compartilhado e interrupções; não é especificação de UI nem de integração.
- **Component Registry** — Contrato entre o agente e o design system: catálogo de componentes aprovados, com schema de props, efeitos e requisitos de acessibilidade.
- **Permission-aware retrieval** — Recuperação em que a permissão do usuário é filtrada no índice, antes de o modelo ver o conteúdo.
- **Identidade delegada** — Token em que o sujeito é o usuário e o ator é o agente (RFC 8693), de modo que cada ação seja atribuível aos dois; o estudo recomenda limitá-la à interseção das permissões de ambos.
- **Human-in-the-loop (HITL)** — Confirmação ou decisão humana formal antes de uma ação com efeito, registrada como evento e com regra explícita de não execução se não for respondida.
- **Índice de prontidão para agentes** — Pontuação de 0 a 20 de uma jornada em dez critérios; sugere se ela está pronta para trabalhar fundações, para RAG e leitura ou para ações com confirmação.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
