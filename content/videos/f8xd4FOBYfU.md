---
id: f8xd4FOBYfU
slug: automacao-de-incidentes-na-pratica-aws-devops-agent-amazon
status: publicado
temas:
  - cloud-e-confiabilidade
  - engenharia-agentica
resumo: O vídeo mostra como sair da investigação manual de incidentes para um fluxo automático com o AWS DevOps Agent e o Amazon CloudWatch. Passa pelas tags que permitem mapear a topologia, por um alarme de CPU, pelo isolamento com Agent Spaces e por um exemplo em que o agente lê o chamado de suporte, acha a causa raiz e propõe um plano de mitigação.
fontes:
  - url: https://aws.amazon.com/blogs/devops/automating-incident-investigation-with-aws-devops-agent-and-salesforce-mcp-server/
    titulo: Automating Incident Investigation with AWS DevOps Agent and Salesforce MCP Server
    sustenta: "Artigo do blog da AWS (22/04/2026) que descreve o fluxo do vídeo: um caso novo no Salesforce aciona o DevOps Agent, que investiga com telemetria da AWS, publica as conclusões no caso e recomenda mudanças de arquitetura. Define o Agent Space como o limite de contas, integrações e controles de acesso; cita as tags como opcionais, para o mapa de topologia; e traz o exemplo em que as requisições caem a zero no CloudWatch e o CloudTrail mostra o encerramento de uma instância EC2. Lista os pré-requisitos: Agentforce Service com o Salesforce Hosted MCP Server, um Agent Space, CloudWatch e CloudTrail ativos."
    verificada: true
revisado_por: Maurício Yokoyama Issei
revisado_em: 2026-11-19
youtube:
  titulo: "Automação de Incidentes na Prática: AWS DevOps Agent & Amazon CloudWatch"
  publicado_em: 2026-05-05
  duracao: PT8M39S
  descricao: |-
    Você ainda perde horas investigando incidentes de infraestrutura, cruzando logs de serviços diferentes e escalando problemas manualmente? O AWS DevOps Agent chegou para mudar esse cenário e reduzir o seu tempo de resolução (MTTR) de horas para minutos!
    Neste tutorial focado em equipes de operações de infraestrutura (Cloud Ops e SRE), vamos realizar um deep dive prático e demonstrar como criar um fluxo de monitoramento e resposta autônoma a incidentes de ponta a ponta.
    📌 O que você vai aprender neste vídeo: • Configuração Essencial: Como habilitar e conectar o AWS DevOps Agent ao Amazon CloudWatch para adotar uma postura de resposta proativa
    . • Alarmes de CPU na Prática: Demonstração de como configurar um Alarme no CloudWatch baseado em métricas de CPU para acionar gatilhos de investigação imediatamente
    . • Isolamento de Ambientes (Agent Spaces): Aprenda a utilizar múltiplos "DevOps Agent Spaces" para separar com segurança as investigações de ambientes de produção e não-produção, garantindo o isolamento de acessos (IAM), ferramentas integradas e dados
    . • Boas Práticas de Tags (Tagging): Descubra como a aplicação correta de tags em recursos da AWS é o segredo para permitir que o Agente faça o "Mapeamento de Topologia Dinâmica", garantindo que ele investigue apenas os componentes relevantes da sua aplicação durante uma crise
    .
    Além disso, discutimos como essa arquitetura se conecta com o Salesforce Hosted MCP Server para criar planos de mitigação autônomos que vão direto para os chamados de suporte dos clientes, acabando com o atrito entre as equipes de atendimento e engenharia
    .
    🔗 Links Oficiais e Materiais de Referência (Documentação): 
    • Artigo AWS Cloud Operations (Blog Oficial): Automating Incident Investigation with AWS DevOps Agent and Salesforce MCP Server 👉 https://aws.amazon.com/blogs/devops/automating-incident-investigation-with-aws-devops-agent-and-salesforce-mcp-server/

     • Repositório GitHub (Salesforce Hosted MCP): Código e comunidade de integrações MCP 👉 https://github.com/forcedotcom/mcp-hosted

     • Documentação Developer Salesforce (Hosted MCP Servers): 👉 developer.salesforce.com/docs/platform/hosted-mcp-servers/overview

     • Console do AWS CloudTrail (para correlacionar auditorias): 👉 https://console.aws.amazon.com/cloudtrail/

    #AWSDevOps #AmazonCloudWatch #SRE #CloudOperations #IncidentManagement #SalesforceMCP #AWS #DevOpsAgent
  miniatura: https://i.ytimg.com/vi/f8xd4FOBYfU/maxresdefault.jpg
  visualizacoes: 46
  playlists: []
  legenda: automatica
  links_descricao:
    - https://aws.amazon.com/blogs/devops/automating-incident-investigation-with-aws-devops-agent-and-salesforce-mcp-server/
    - https://github.com/forcedotcom/mcp-hosted
    - https://console.aws.amazon.com/cloudtrail/
  coletado_em: 2026-11-07T22:16:07Z
---

## O problema: apagar incêndio

O vídeo é um tutorial para equipes de operações de infraestrutura. A proposta é trocar a solução de problemas reativa por um fluxo proativo e automatizado com ferramentas da AWS [00:00].

"O site está lento" é a frase que mais assusta quem trabalha com operações. Uma reclamação dessas costuma abrir horas de investigação manual, com telemetria fragmentada e saltos de log em log [00:20].

De um lado, o processo manual: o tempo para detectar e resolver cresce, as métricas ficam espalhadas e o atrito entre equipes é inevitável [00:41]. Do outro, o suporte ligado direto a um diagnóstico automático com o AWS DevOps Agent. Segundo o vídeo, o tempo de resolução cai de horas para minutos [01:02].

## O custo da investigação manual

A falha estrutural é clássica. O suporte está na linha de frente, mas falta a ele conhecimento profundo da infraestrutura para diagnosticar causas complexas [01:44].

Os engenheiros de DevOps deveriam construir melhorias, mas são puxados para apagar incêndios. Esse vai e vem gera atrito e um ciclo de soluções só reativas [02:04].

## Tags: a base da automação

A base para automatizar é uma infraestrutura organizada, com boas práticas de tags [02:26]. Tags são rótulos de metadados, com uma chave e um valor opcional, que classificam cada recurso por finalidade, equipe ou ambiente [02:26].

Sem tags, a ferramenta de IA fica quase cega. É com elas que o DevOps Agent mapeia as relações entre as peças da aplicação durante uma investigação [02:46]. O artigo da AWS trata as tags como opcionais, mas recomenda usá-las para que o agente foque nos componentes da aplicação.

Uma estratégia de tags vai além da alocação de custos. Ela cobre controle de acesso, operações e suporte, e acelera a gestão de incidentes e as atualizações automáticas [03:09].

## Monitoramento proativo com o CloudWatch

Com os metadados prontos, o próximo passo é a observabilidade. O Amazon CloudWatch coleta telemetria em tempo real [03:29].

A mudança de paradigma: em vez de esperar o suporte abrir um chamado, a equipe recebe o alerta de degradação antes de o usuário final sentir o problema [03:51]. O CloudWatch rastreia métricas, monta painéis, envia alertas de limite e aciona respostas automáticas [04:12].

## Um alarme de CPU em três passos

O vídeo mostra um alarme de CPU em três passos [04:12]:

1. Escolher a métrica, como a utilização de CPU da instância EC2 que roda o banco de dados [04:32].
2. Definir um limite estático. No exemplo, CPU acima de 85% por mais de 5 minutos [04:32].
3. Configurar a ação: escalar o ambiente ou mandar uma notificação para o Amazon EventBridge, que pode iniciar a investigação do DevOps Agent [04:53].

## Isolamento com Agent Spaces

Dar autonomia ao agente exige controle. Um Agent Space funciona como uma sala limpa de laboratório: um contêiner lógico que define quais contas da AWS, ferramentas e partes da infraestrutura o agente pode acessar [05:14].

O vídeo recomenda criar vários Agent Spaces, para separar produção de desenvolvimento, separar equipes, limitar serviços ou cumprir requisitos de conformidade [05:35].

O isolamento tem várias camadas: a conta da AWS, os usuários que podem falar com o agente e os dados das investigações, incluindo o histórico de conversa [05:56]. O que acontece num Agent Space fica nele [06:17].

## A resolução autônoma na prática

Os pré-requisitos do exemplo são o Agentforce Service com um servidor MCP (Model Context Protocol) configurado, que faz a ponte com o Salesforce; um Agent Space; o CloudWatch e o AWS CloudTrail ativos; e a infraestrutura com tags [06:37].

Com isso, o agente lê os chamados de suporte e busca os dados da infraestrutura [06:58]. O fluxo do exemplo [06:58]:

1. Um cliente abre um chamado dizendo que a aplicação caiu, e o fluxo dispara sozinho [06:58].
2. O DevOps Agent recupera os detalhes do caso e, pelas tags, descobre a topologia da aplicação [06:58].
3. Ele analisa as métricas do CloudWatch e vê que as requisições caíram a zero [07:19].
4. Ele cruza isso com os eventos do CloudTrail e chega à causa raiz: alguém encerrou a instância EC2 por engano [07:19].

O agente não só acha a causa: ele publica o contexto técnico no chamado e gera um plano de mitigação, com instruções passo a passo e recomendações de arquitetura para evitar a repetição [07:39].

## O que sobra para a equipe

O vídeo fecha com uma pergunta: se a busca manual por logs for automatizada, como a equipe vai usar o tempo? A resposta proposta é focar em resiliência e melhorias reais [08:00]. Segundo o vídeo, a automação não substitui o talento: ela o libera [08:20].

## Perguntas frequentes

### Para que servem as tags na investigação do DevOps Agent?

Elas deixam o agente mapear as relações entre os recursos da aplicação e investigar só o que importa [02:46].

### Por que criar mais de um Agent Space?

Para separar produção de desenvolvimento, separar equipes e cumprir requisitos de conformidade, sem que uma investigação enxergue dados de outra [05:35].
