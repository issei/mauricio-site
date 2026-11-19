---
id: hub4sB4yYss
slug: a-era-agentica-do-gemini-como-os-novos-agentes-do-google
status: publicado
temas:
  - engenharia-agentica
  - cloud-e-confiabilidade
resumo: "O vídeo analisa os anúncios do Gemini at Work 2026: a passagem da IA conversacional para agentes que executam tarefas. Mostra o ciclo de raciocínio do agente, o sandbox isolado, a identidade e o gateway para segurança, os controles de custo, a memória do agente no trabalho e casos como a seguradora Sompo e um satélite da NASA."
fontes:
  - url: https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026
    titulo: "Welcome to Gemini at Work 2026: Introducing the Gemini agent"
    sustenta: "Post de Thomas Kurian (8/10/2026) que apresenta o Gemini agent. Cita o Agent Sandbox, a identidade criptograficamente atestada de cada agente, o Agent Gateway como firewall de IA, o Smart Routing e os limites de gasto em tempo real, o TPU 8i com 80% melhor relação preço-desempenho, a queda de 98% no preço por token desde 2024, as quatro formas de memória, o Knowledge Catalog, os mais de 10 mil agentes da Sompo para 34 mil funcionários e o JPL da NASA rodando Gemma num satélite."
    verificada: true
revisado_por: "Maurício Yokoyama Issei"
revisado_em: 2026-11-19
youtube:
  titulo: "A Era Agêntica do Gemini: Como os Novos Agentes do Google Cloud Vão Transformar o Trabalho"
  publicado_em: 2026-10-10
  duracao: PT7M56S
  descricao: |-
    **O trabalho agora começa na janela de prompt!** Neste vídeo explicativo, analisamos detalhadamente o lançamento do **Gemini Agent** no evento *Gemini at Work 2026*, mostrando como o Google Cloud está liderando a transição para a era dos **agentes autônomos corporativos**.

    Entenda a evolução do Vertex AI para a **Gemini Enterprise Agent Platform**, uma infraestrutura unificada desenvolvida para construir, escalar, governar e otimizar agentes capazes de executar tarefas complexas com total segurança e controle empresarial.

    ---

    💡 **O que você vai aprender neste vídeo:**

    • **O Novo Gemini Agent:** Como funciona o agente universal de trabalho que planeja, executa código, gerencia arquivos e conecta sistemas a partir de um único prompt.  
    • **Gemini Enterprise Agent Platform:** A evolução do Vertex AI trazendo o **Agent Studio** (canvas low-code), o **Agent Development Kit (ADK)** e o **RAG Engine** para conectar dados corporativos privados.  
    • **Memória Persistente e Orquestração:** O papel do **Memory Bank** e do **Agent Runtime** para manter contexto de longo prazo em fluxos de trabalho de múltiplos dias.  
    • **Governança e Segurança Rigorosa:** Como o **Agent Sandbox** isolado no nível de SO e o **Agent Gateway** garantem controle de acesso, auditoria e firewall contra vazamento de dados.  
    • **Integração no Google Workspace:** O Gemini atuando de forma *inline* no Gmail, Drive, Docs, Sheets e Slides, inclusive como colega de equipe autônomo (*coworker agent*).  
    • **Controle Financeiro de Custos:** A otimização de orçamentos com **Smart Routing** e teto de gastos em tempo real (*spend caps*).  

    ---

    ⏱️ **Capítulos do Vídeo:**  
    00:00 - Introdução: Bem-vindo à Era Agêntica  
    01:15 - O que é o Gemini Agent? (Anúncio Gemini at Work)  
    03:10 - Gemini Enterprise Agent Platform (A Evolução do Vertex AI)  
    05:20 - Ferramentas de Desenvolvimento: ADK, Agent Studio & RAG Engine  
    07:35 - Execução Segura: Agent Sandbox, Gateway & Governança  
    09:25 - Gemini no Google Workspace (Assistente Pessoal & Coworker Agent)  
    11:00 - Controle de Custos e Roteamento Multimodelo  
    12:15 - Conclusão e O Futuro dos Agentes  

    ---

    🔗 **Fontes Oficiais e Documentação:**  
    • Google Cloud Blog – Gemini at Work 2026  : https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026
    • Documentação da Gemini Enterprise Agent Platform  : https://docs.cloud.google.com/gemini-enterprise-agent-platform?hl=pt-br
    • Google AI for Developers – Gemini API Agents Overview  : https://ai.google.dev/gemini-api/docs/agents?hl=pt-br

    ---

    🏷️ **Hashtags:**  
    #GoogleCloud #Gemini #AIAgents #InteligenciaArtificial #GeminiAgent #GoogleWorkspace #Tecnologia #Inovacao
  miniatura: https://i.ytimg.com/vi/hub4sB4yYss/maxresdefault.jpg
  visualizacoes: 36
  playlists: []
  legenda: automatica
  links_descricao:
    - https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026
    - https://docs.cloud.google.com/gemini-enterprise-agent-platform?hl=pt-br
    - https://ai.google.dev/gemini-api/docs/agents?hl=pt-br
  coletado_em: 2026-11-07T22:16:07Z
---
## Da conversa à execução

O vídeo trata da passagem da IA conversacional, no formato de chat, para a IA autônoma e agêntica com o Gemini [00:00]. A IA deixa de ser um oráculo que responde perguntas e vira um motor de execução [00:20].

Segundo o vídeo, a partir de outubro de 2026 a IA deixa de ser só ferramenta de texto e passa a agir como força de trabalho, executando tarefas complexas em nome de quem a gerencia [00:20].

## A ascensão dos agentes

No modelo tradicional, era preciso dar comandos o tempo todo, com engenharia de prompt. Com a IA agêntica, delega-se um objetivo amplo e o raciocínio autônomo cuida das etapas [01:04].

Um agente do Gemini não é um modelo de linguagem solto: é um sistema integrado que planeja, usa ferramentas externas, se conecta aos sistemas da empresa e entrega um produto pronto [01:24]. É a passagem da assistência passiva para a ação proativa [01:46].

## A base agêntica

O agente gerenciado do Gemini trabalha dentro de um sandbox. Com uma chamada de API, o sistema cria um ambiente Linux isolado no nível do sistema operacional, onde o agente escreve e testa código, navega na internet e gerencia arquivos [01:46]. Segundo o vídeo, isso roda em modelos como o Gemini Flash [02:06].

Também segundo o vídeo, há liberdade de framework: LangGraph para fluxos complexos, CrewAI para agentes que colaboram e LlamaIndex para ligar a IA aos dados internos [02:27].

Qualquer que seja o framework, o agente roda num ciclo contínuo [02:49]:

1. Entende o pedido [02:49].
2. Monta um plano e escolhe as ferramentas [02:49].
3. Age por conta própria [03:09].
4. Sintetiza a resposta [03:09].

Segundo o vídeo, uma tarefa complexa pode consumir de 100 mil a 3 milhões de tokens [03:09].

## Segurança e custo em escala

Em empresas, a plataforma precisa responder: quem é o agente, o que ele pode tocar e onde suas ações ficam registradas [03:31]. Cada agente recebe uma identidade única e criptografada, com o menor privilégio possível, e todo o tráfego passa por um Agent Gateway, um firewall feito para redes de IA [03:31].

No hardware, o sistema TPU 8i entrega uma relação preço-desempenho 80% melhor que a geração anterior, o que torna viáveis cargas corporativas densas [03:52].

Loops contínuos num modelo grande acabariam com qualquer orçamento [04:14]. Por isso há roteamento inteligente, que manda cada tarefa para o modelo do tamanho certo, e limites de gasto em tempo real. O preço por token caiu 98% desde 2024 [04:35].

## A IA como colega de trabalho

A mudança de paradigma é tratar a IA como colega de trabalho digital: dá para mencionar um agente no chat corporativo ou colocá-lo num convite de reunião, e ele age com uma identidade definida, junto com a equipe [04:56].

O agente integrado usa quatro tipos de memória. Ele retém o contexto da empresa, lembra como fazer tarefas recorrentes e entende o histórico do fluxo de trabalho, sem que seja preciso reexplicar as regras [05:16].

A regra de ouro é garantir a confiança na precisão de cada resposta. Ferramentas como o catálogo de conhecimento mapeiam as definições do negócio, para que o agente responda ancorado nos dados reais em vez de adivinhar termos internos [05:39].

## O impacto real

O vídeo cita usos em operadoras de telefonia, bancos e varejo: agentes que resolvem falhas de rede em tempo real e detectam fraudes para cancelar pagamentos suspeitos. Isso libera as pessoas para trabalho criativo e consultivo [05:59].

A seguradora japonesa Sompo criou mais de 10 mil agentes personalizados para seus 34 mil funcionários [06:41]. Segundo o vídeo, o tempo de desenvolvimento de um modelo especializado caiu de uma semana para um dia [06:41].

A IA agêntica também chegou ao espaço: modelos otimizados rodam num satélite da NASA, analisam imagens da Terra e mandam resumos para as equipes em solo [07:02].

A reflexão final: a era agêntica não é só acelerar tarefas, mas repensar o que uma organização consegue realizar quando executar em escala deixa de ser o problema [07:24].

## Perguntas frequentes

### Como o Gemini isola o trabalho de um agente?

Num sandbox: um ambiente Linux isolado no nível do sistema operacional, criado por uma chamada de API, onde o agente escreve código, navega e gerencia arquivos [01:46].

### Como a plataforma controla o custo dos agentes?

Com roteamento inteligente, que manda cada tarefa para o modelo do tamanho certo, e limites de gasto em tempo real [04:14].
