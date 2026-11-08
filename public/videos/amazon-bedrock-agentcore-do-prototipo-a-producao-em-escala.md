# Amazon Bedrock AgentCore: Do Protótipo à Produção em Escala com IA Agêntica!

Vídeo de Maurício Yokoyama Issei, publicado em 27 de setembro de 2026 (8 min 13 s).
Assistir: https://www.youtube.com/watch?v=cSW_eXN-9wE

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Cloud e confiabilidade](https://mauricio.issei.com.br/temas/cloud-e-confiabilidade)

## Sobre o vídeo

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

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olá a todos e muito bem-vindos à nossa análise visual de hoje. Sabe, se você já tentou construir um agente de inteligência artificial, aposto que já esbarrou num problema bastante frustrante. Na sua máquina local, ele roda perfeitamente, mas na hora de colocar isso no mundo real, a história é completamente outra. A gente chama isso de abismo da produção. É aquele buraco negro gigantesco entre um protótipo legal no seu laptop e um sistema corporativo seguro, capaz de aguentar tipo 10.000 1000 usuários ao mesmo tempo sem piscar. A grande verdade é que é exatamente ali que a maioria dos projetos brilhantes de IA simplesmente afunda em silêncio. Então hoje nós vamos mergulhar fundo e entender como construir essa ponte para transformar a sua IA em algo realmente sólido e pronto pro mundo corporativo. Mas vamos dar um passo atrás e encarar esse mistério. Por que agentes tão incrivelmente bons falham na produção? Quer dizer, você escreve um código sensacional ou agina, planeja e toma decisões, tudo lindo na sua tela. Só que criar a lógica da IA é

[1:02] literalmente apenas a ponta do iceberg. A verdadeira dor de cabeça começa quando você precisa manter esse mesmo agente blindado, gerenciar a memória dele e auditar tudo para milhares de pessoas simultaneamente. Se a infraestrutura não for feita sob medida para lidar com essa pressão, todo o sistema desmorona como um castelo de cartas. E entendendo essas duas realidades, a causa do problema fica cristalina. No ambiente de protótipo, a vida é simples, não é? É tudo local, focado em um usuário só. Você não tá nem aí para balanceamento de carga. Agora, na produção, o jogo vira completamente. Você precisa de milhares de sessões estritamente isoladas, segurança impecável e uma gestão de servidores que pode facilmente devorar semanas do tempo da sua equipe de engenharia. E sejamos sinceros, sem essa infraestrutura robusta rodando nos bastidores, até a IA mais genial e avançada do mundo acaba sendo inútil na prática. E foi justamente por causa dessa barreira gigante que a AWS deu uma agnada filosófica super interessante com o Agent Core. Antes o foco do Bedrock era um construtor visual fechado e

[2:03] totalmente gerenciado. Mas a abordagem agora é te entregar as chaves de uma verdadeira fábrica de infraestrutura agnóstica. O que isso significa pro seu time? Liberdade absoluta. Você pode pegar agentes que já construiu usando ferramentas de código aberto, como Lph, Crew AI ou Strand e conectá-los a mais de 110 modelos de fundação diferentes. Você não fica mais preso a um único ecossistema. E a beleza de tudo isso é o design da arquitetura. O Agent Core funciona como um gigantesco menu Alacart. É pura modularidade. Você pode, se quiser, pegar a suí inteira de ponta a ponta para rodar toda a sua operação de IA. ou pode ser extremamente cirúrgico. Digamos que você só tá com um gargalo na memória do agente, sem problemas. Você pega apenas o módulo de memória e integra no seu projeto. É você quem decide o que usar para resolver os seus problemas específicos de infraestrutura sem precisar adotar um pacote fechado e rígido. Agora vamos abrir o capô e falar do motor principal, o Agent Core Runtime. Se a sua equipe foge de ter que

[3:04] gerenciar clusters complexos de cubernetes, vocês vão adorar isso aqui. O runtime é um ambiente totalmente serverless. O que acontece na prática é que a AWS sobe instantaneamente uma micromáquina virtual dedicada exclusivamente para cada sessão do seu agente. E olha que loucura, essas microvs conseguem executar desde tarefas rápidas de uma fração de nanosundo até ficarem rodando pesquisas de forma assíncrona por 14 dias. Tudo isso sem você precisar configurar um único servidor, pagando apenas pelo tempo de processamento ativo. Segurança determinística para IA não determinística. Parece um paradoxo, eu sei. A grande questão é que modelos de IA são criativos, probabilísticos, eles inventam coisas. Só que a segurança de uma corporação não pode depender de probabilidades. Ela tem que ser absoluta. Como cada agente roda isolado na sua própria microVM, os dados do usuário A nunca, em hipótese alguma, vão vazar ou contaminar a sessão do usuário B. O seu agente fica trancado em um cofre impenetrável. Você deixa a Iá ser

[4:05] livre para pensar, mas mantém as paredes em volta dela, feitas de aço maciço. Mas cá entre nós, deixar uma IG trancada num cofre, sem falar com o mundo externo não serve para muita coisa, certo? É exatamente aí que entra o MCP, o model protocol. Pensa nele como um idioma universal pros agentes de IA. Ele é um framework de padrão aberto que ensina ao seu agente exatamente as regras de como descobrir, entender e conversar de forma segura com ferramentas, bancos de dados e APIs do mundo real. Ah, mas aí você deve estar pensando, vou ter que reescrever todo o meu código legado para falar esse tal de MCP? De jeito nenhum. E aqui que a mágica do Agent Core Gateway acontece. Ele é basicamente o seu tradutor simultâneo definitivo. Sabe aquelas suas funções AWS Lambda ou API H antigas? Em vez de perder semanas escrevendo código de integração chato, o Gateway pega essas suas ferramentas existentes e as traduz instantaneamente para esse idioma MCP. Ele serve como uma ponte super inteligente que gerencia toda a comunicação da sua empresa com a

[5:06] IA sem você suar a camisa. Para deixar isso bem concreto, imagina a relação de causa e efeito na prática. Um usuário pergunta pro agente estatísticas detalhadas sobre um atleta. Primeiro, a IA quebra esse pedido gigante em etapas lógicas. Depois ela usa o gateway para consultar de forma ultra segura uma função lambda na Wikipedia e simultaneamente busca dados específicos num banco de dados vetorial como Mongo DB. O gateway faz todo esse meio de campo. Por fim, um modelo de ponta como o Amazon Nova junta todos esses dados brutos, analisa o contexto e empacota isso numa resposta em linguagem natural super amigável. Toda a complexidade pesada acontece nos bastidores e o usuário só vê a mágica na tela dele. Agora, existe um detalhe invisível que separa o sistemas apenas, OK? Das experiências verdadeiramente extraordinárias. Tem uma frase incrível que diz: "A diferença entre um simples chatbot e um assistente inteligente é a memória". Sabe aquele chatbot básico de atendimento que te trata como um estranho toda vez que a janela atualiza?

[6:07] Ele é igual a um peixinho dourado. Esquece tudo em segundos. Já um assistente inteligente de verdade lembra de você, entende o seu contexto contínuo e constrói um relacionamento ao longo do tempo. E o Agent Core Memory resolves esse problema de amnésia corporativa de forma automática. Ele orquestra várias estratégias de memória ao mesmo tempo. Ele tem a de curto prazo pro bate-papo de agora e a de longo prazo paraas suas interações passadas. Mas o mais legal é a recuperação de conhecimento semântico. Aá simplesmente sabe que você tá estudando para aquela certificação difícil da AWS ou lembra daquele bug de software específico que vocês estavam caçando na terça-feira passada? O agente já chega com contexto pronto, poupando a sua paciência de ter que explicar tudo desde o começo. E para fechar o ciclo da nossa arquitetura corporativa, precisamos falar do que tira o sono de todo líder de TI, a governança. O Agent Corey já se conecta nativamente com as ferramentas que você usa, tipo octa e incógnito. Mas o verdadeiro divisor de águas é o agent core policy. Enquanto a maioria do mercado tenta dar instruções

[7:08] e proibir a IA no prompt, o que os usuários sempre dão um jeito de burlar, o policy age de outra forma. Ele intercepta qualquer chamada de ferramenta com regras duras escritas em inglês claro usando o padrão seer. Se a regra diz que é estritamente proibido buscar dados de um concorrente, o pollice bloqueia a ação direto na fonte, sem brechas e sem dor de cabeça. Chegando ao final da nossa explicação de hoje, eu quero deixar vocês com uma reflexão provocativa. Pense no projeto de IA que você tá desenvolvendo ou planejando agora. Ele tá realmente preparado para encarar o mundo real, suportando milhares de usuários simultâneos com segurança impecável, ou ele é só uma demonstração muito legal que só funciona no seu computador? Transformar essa inovação incrível em operações corporativas exige uma base sólida como rocha. O Amazon Bedrock Agent Core surge como a ponte definitiva para você cruzar de uma vez por todas o abismo da produção. Se a infraestrutura deixou de ser o seu obstáculo, a única pergunta que resta agora é: o que você vai construir primeiro? Muito obrigado por nos acompanhar e até a próxima.
