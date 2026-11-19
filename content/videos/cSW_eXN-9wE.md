---
id: cSW_eXN-9wE
slug: amazon-bedrock-agentcore-do-prototipo-a-producao-em-escala
status: publicado
temas:
  - engenharia-agentica
  - cloud-e-confiabilidade
resumo: "O vídeo apresenta o Amazon Bedrock AgentCore, a plataforma da AWS para levar agentes de IA do protótipo à produção. Explica o abismo entre o laptop e o sistema corporativo e os módulos Runtime, Gateway, Memory, Identity e Policy, com sessões isoladas, ferramentas no padrão MCP e regras que bloqueiam ações na fonte."
fontes:
  - url: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html
    titulo: "Overview - Amazon Bedrock AgentCore"
    sustenta: "O AgentCore é uma plataforma para implantar e operar agentes com qualquer framework e modelo, sem gerenciar infraestrutura. A página cita CrewAI, LangGraph, LlamaIndex e Strands Agents; o Runtime serverless com isolamento de sessão; o Gateway, que converte APIs e funções Lambda em ferramentas compatíveis com MCP; a memória de curto e de longo prazo; a Identity compatível com Amazon Cognito e Okta; e o Policy, que intercepta cada chamada de ferramenta com regras compatíveis com Cedar."
    verificada: true
revisado_por: "Maurício Yokoyama Issei"
revisado_em: 2026-11-19
youtube:
  titulo: "Amazon Bedrock AgentCore: Do Protótipo à Produção em Escala com IA Agêntica!"
  publicado_em: 2026-09-27
  duracao: PT8M13S
  descricao: |-
    **Descubra como o Amazon Bedrock AgentCore transforma o desenvolvimento e a operação de agentes de IA em produção!**

    Neste vídeo explicativo, apresentamos a plataforma serverless e modular da AWS criada para implantar e operar agentes de IA com segurança, governança e alta escala. Veja como executar seus agentes utilizando frameworks abertos como **CrewAI, LangGraph, LlamaIndex e Strands Agents**, além de qualquer modelo de linguagem de sua escolha.

    ---

    🎯 **O que você vai aprender neste vídeo:**
    - **Visão Geral do Amazon Bedrock AgentCore:** Como a plataforma elimina o gerenciamento de infraestrutura.
    - **AgentCore Runtime:** A infraestrutura serverless segura para hospedar agentes e ferramentas em instâncias ou microVMs isoladas.
    - **AgentCore Gateway:** Como padronizar a integração de APIs, funções Lambda e ferramentas MCP (Model Context Protocol) com controle de acesso.
    - **AgentCore Memory & Identity:** Como gerenciar a memória de curto/longo prazo e autenticar identidades de usuários via OAuth e provedores como Amazon Cognito.
    - **AgentCore Observability:** Rastreamento passo a passo via OpenTelemetry no Amazon CloudWatch para monitoramento e depuração de falhas.

    ---

    🔗 **Documentação Oficial e Recursos AWS:**

    - 📘 **Guia do Desenvolvedor (Visão Geral):**  
      [Amazon Bedrock AgentCore Developer Guide](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)

    - 🚀 **Primeiros Passos com a CLI:**  
      [Get Started with AgentCore CLI](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-get-started-cli.html)

    - 🌐 **AgentCore Gateway:**  
      [AgentCore Gateway Quick Start](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-quick-start.html)

    - 🧠 **AgentCore Memory:**  
      [Documentação do AgentCore Memory](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html)

    - 📊 **AgentCore Observability:**  
      [Documentação do AgentCore Observability](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html)

    - 💻 **Repositório Oficial de Exemplos no GitHub:**  
      [AWS Labs AgentCore Samples](https://github.com/awslabs/amazon-bedrock-agentcore-samples)

    - 🐍 **AgentCore Python SDK:**  
      [Bedrock AgentCore SDK no GitHub](https://github.com/aws/bedrock-agentcore-sdk-python)

    - 💰 **Tabela de Preços Oficial:**  
      [Preços do Amazon Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/pricing/)

    ---

    ⏱️ **Capítulos Sugeridos:**
    - **00:00** - Introdução ao Amazon Bedrock AgentCore
    - **01:30** - Suporte Multi-framework (LangGraph, CrewAI, Strands Agents)
    - **03:15** - Hospedagem Serverless com AgentCore Runtime
    - **05:00** - Conectando Ferramentas e APIs com AgentCore Gateway (MCP)
    - **07:10** - Contexto e Segurança: AgentCore Memory e Identity
    - **08:45** - Observabilidade e Traces com CloudWatch e OpenTelemetry
    - **10:00** - Conclusão e Recursos Oficiais

    ---

    `#AWS` `#AmazonBedrock` `#AgentCore` `#GenerativeAI` `#AIAgents` `#LangGraph` `#CrewAI` `#Python` `#CloudComputing`
  miniatura: https://i.ytimg.com/vi/cSW_eXN-9wE/maxresdefault.jpg
  visualizacoes: 49
  playlists: []
  legenda: automatica
  links_descricao:
    - https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html
    - https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-get-started-cli.html
    - https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-quick-start.html
    - https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html
    - https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html
    - https://github.com/awslabs/amazon-bedrock-agentcore-samples
    - https://github.com/aws/bedrock-agentcore-sdk-python
    - https://aws.amazon.com/bedrock/agentcore/pricing/
  coletado_em: 2026-11-07T22:16:07Z
---
## O abismo da produção

Um agente de IA que roda bem na máquina local costuma falhar quando vai para o mundo real. O vídeo chama isso de abismo da produção: a distância entre um protótipo no laptop e um sistema corporativo seguro, que aguenta milhares de usuários ao mesmo tempo [00:21].

Criar a lógica da IA é só a ponta do iceberg. O difícil é manter o agente seguro, gerenciar a memória dele e auditar tudo para milhares de pessoas ao mesmo tempo [01:04].

No protótipo, tudo é local, para um usuário só. Na produção, são milhares de sessões isoladas, segurança rígida e uma gestão de servidores que consome semanas da equipe [01:26].

## Uma plataforma agnóstica e modular

Segundo o vídeo, o foco do Bedrock antes era um construtor visual fechado e gerenciado. Com o AgentCore, a AWS passa a entregar uma infraestrutura agnóstica [01:47].

Dá para usar agentes feitos com frameworks de código aberto, como LangGraph, CrewAI ou Strands, e ligá-los, segundo o vídeo, a mais de 110 modelos de fundação [02:09].

A arquitetura é modular, como um cardápio à la carte: dá para usar a plataforma inteira ou só um módulo, como o de memória [02:30].

## Runtime: sessões isoladas e serverless

O AgentCore Runtime é um ambiente serverless, sem clusters de Kubernetes para gerenciar [02:51].

Segundo o vídeo, a AWS sobe uma micromáquina virtual (microVM) dedicada a cada sessão do agente. Ela roda de tarefas rápidas até pesquisas assíncronas de 14 dias, e só se paga o tempo de processamento ativo [03:12].

O vídeo chama isso de segurança determinística para uma IA não determinística: como cada agente roda isolado, os dados do usuário A nunca vazam para a sessão do usuário B [03:53].

## Gateway: ferramentas no padrão MCP

Para falar com o mundo externo, o agente usa o MCP (Model Context Protocol), um padrão aberto que define como descobrir e usar ferramentas, bancos de dados e APIs com segurança [04:13].

O AgentCore Gateway converte ferramentas que já existem, como funções AWS Lambda ou APIs antigas, para o padrão MCP, sem reescrever o código de integração [04:54].

No exemplo do vídeo, o usuário pede estatísticas de um atleta [04:54]:

1. A IA divide o pedido em etapas [05:15].
2. Pelo Gateway, consulta uma função Lambda que busca na Wikipédia e um banco de dados vetorial, como o MongoDB [05:15].
3. Um modelo como o Amazon Nova junta os dados e responde em linguagem natural [05:15].

## Memory: contexto entre sessões

O vídeo cita a frase "a diferença entre um simples chatbot e um assistente inteligente é a memória". Um chatbot básico trata a pessoa como uma estranha a cada vez; um assistente lembra dela e do contexto [05:58].

O AgentCore Memory combina memória de curto prazo, para a conversa atual, e de longo prazo, para as interações passadas. A recuperação semântica lembra, por exemplo, que a pessoa está estudando para uma certificação, ou o bug que a equipe caçava na semana anterior [06:20].

## Identidade e políticas

O AgentCore se conecta a provedores de identidade como Okta e Amazon Cognito [06:41].

O AgentCore Policy não depende de instruções no prompt, que os usuários conseguem burlar: ele intercepta cada chamada de ferramenta e aplica regras rígidas, no padrão Cedar. Se a regra proíbe buscar dados de um concorrente, a ação é bloqueada na fonte [07:01].

## Perguntas frequentes

### O AgentCore obriga a usar um framework da AWS?

Não. Ele funciona com frameworks abertos, como LangGraph, CrewAI e Strands [02:09].

### Como o AgentCore controla o que o agente pode fazer?

Com o AgentCore Policy, que intercepta cada chamada de ferramenta e aplica regras rígidas antes da execução [07:01].
