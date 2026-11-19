# Automação de Incidentes na Prática: AWS DevOps Agent & Amazon CloudWatch

O vídeo mostra como sair da investigação manual de incidentes para um fluxo automático com o AWS DevOps Agent e o Amazon CloudWatch. Passa pelas tags que permitem mapear a topologia, por um alarme de CPU, pelo isolamento com Agent Spaces e por um exemplo em que o agente lê o chamado de suporte, acha a causa raiz e propõe um plano de mitigação.

Vídeo de Maurício Yokoyama Issei, publicado em 5 de maio de 2026 (8 min 39 s).
Assistir: https://www.youtube.com/watch?v=f8xd4FOBYfU

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

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

## Fontes

- [Automating Incident Investigation with AWS DevOps Agent and Salesforce MCP Server](https://aws.amazon.com/blogs/devops/automating-incident-investigation-with-aws-devops-agent-and-salesforce-mcp-server/): Artigo do blog da AWS (22/04/2026) que descreve o fluxo do vídeo: um caso novo no Salesforce aciona o DevOps Agent, que investiga com telemetria da AWS, publica as conclusões no caso e recomenda mudanças de arquitetura. Define o Agent Space como o limite de contas, integrações e controles de acesso; cita as tags como opcionais, para o mapa de topologia; e traz o exemplo em que as requisições caem a zero no CloudWatch e o CloudTrail mostra o encerramento de uma instância EC2. Lista os pré-requisitos: Agentforce Service com o Salesforce Hosted MCP Server, um Agent Space, CloudWatch e CloudTrail ativos.

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Cloud e confiabilidade](https://mauricio.issei.com.br/temas/cloud-e-confiabilidade), [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

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

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olá, pessoal de operações de infraestrutura. Sejam muito bem-vindos a este tutorial. Hoje a gente vai falar sobre como transformar aquela velha rotina de apagar incêndios, sabe? Aquela solução de problemas totalmente reativa em algo proativo e 100% automatizado usando ferramentas da AWS. Então vamos direto ao ponto e entender como deixar essa loucura para trás e começar a construir sistemas bem mais inteligentes. O site tá lenta. Olha, essa é de longe a frase que mais dá calafrios em quem trabalha com operações, né? O pior é que uma simples reclamação de cliente como essa costuma desencadear horas da fio de investigação manual. A gente tem que olhar para dados de telemetria super fragmentados. é literalmente procurar uma agulha num palheiro digital, pulando de log em log, só para tentar entender o que de fato deu errado. E isso nos leva a um contraste bem marcante na nossa rotina. De um lado, a gente tem aquela dor de cabeça dos processos manuais antigos. O tempo que levamos para detectar e resolver um problema só aumenta, as métricas ficam todas espalhadas e,

[1:00] claro, o atrito entre as equipes é inevitável. Mas do outro lado temos a eficiência de conectar os fluxos de suporte direto a diagnósticos autônomos de infraestrutura com o AWS DevOps Agent. É uma verdadeira mudança de jogo. Estamos falando de reduzir um tempo de resolução que levava horas para questão de poucos minutos. E para entendermos como chegar lá, nossa análise técnica de hoje vai passar pelos custos da investigação manual, boas práticas na criação de tags, como usar o Cloud Watch para monitoramento proativo, a criação de um alarme de CPU na prática, as estratégias de isolamento de ambientes e para fechar com chave de ouro a resolução autônoma de incidentes. Bom, começando pelo começo, vamos falar sobre o peso e o custo de ficar preso a essa investigação manual e a uma telemetria toda fragmentada. A gente sempre esbarra em uma falha estrutural clássica aqui. Pensem bem, as equipes de suporte estão ali na linha de frente, mas muitas vezes falta aquele conhecimento super profundo da infraestrutura para diagnosticar

[2:02] causas raízes complexas. E os engenheiros DevOps, bom, eles deveriam estar focados em construir melhorias sistêmicas, mas acabam sendo constantemente arrastados para pagar incêndios. Esse vai e vem entre as áreas gera um atrito gigante e queria um ciclo vicioso de soluções puramente reativas em vez de evitar que os problemas sequer aconteçam. Então, como a gente resolve isso? A gente precisa construir uma base sólida para automação. E isso passa pela organização da infraestrutura e principalmente pelas boas práticas no uso de tags. Para colocar de uma forma bem simples, as tags de recursos da AWS funcionam como um sistema de arquivamento altamente eficiente paraa nuvem. São aqueles rótulos básicos de metadados com uma chave e um valor opcional que categorizam tudo por finalidade, equipe ou ambiente. Sem elas, ferramentas de inteligência artificial ficam praticamente a cegas. Essas etiquetas são absolutamente cruciais pro DevOps agent conseguir mapear as relações corretas entre as

[3:04] várias peças da aplicação durante uma investigação. Isso ilustra perfeitamente como a gente deve pensar na categorização. Tags não servem só para organizar a conta no fim do mês, tá? Uma estratégia sólida vai muito além da locação de custos. Ela cobre o controle de acesso paraa segurança dos dados e o que é mais importante para nós, as operações e o suporte. Quando a nossa infraestrutura tá toda etiquetadinha por propósito, equipe ou ambiente, tarefas como gerenciamento de incidentes e atividades automatizadas de atualização fluem com uma rapidez e precisão impressionantes. Com essa base de metadados pronta, a gente pode entrar na fase de obter observabilidade geral do sistema. E é aí que o monitoramento proativo com o Cloud Watch entra em cena. O CloudW atua coletando dados de telemetria em tempo real. A grande sacada aqui é mudar aquele paradigma reativo. Em vez de ficar esperando o suporte abrir um ticket reclamando da

[4:04] lentidão do sistema, a equipe recebe um alerta de degradação de performance muito antes do usuário final ser impactado. O sistema rastreia as métricas de desempenho, cria visões unificadas em dashboards, envia alertas de limites e, o melhor, já aciona respostas de forma automática. Mas vamos trazer isso pro mundo real. Como a gente configura isso na prática? Criando um alarme de CPU. Configurar um alarme pro ativo de CPU é super tranquilo e exige apenas três passos cruciais. Primeiro, a gente escolhe a métrica que quer monitorar, tipo a utilização de CPU daquela instância do SC2 que roda o nosso banco de dados. Segundo, a gente define um limite estático. Por exemplo, se a CPU passar de 85% de uso por mais de 5 minutos, ligo o alerta. E o terceiro passo é configurar a ação, que pode ser desde escalar o ambiente automaticamente até mandar uma notificação pro Evan Bridge. Isso já pode dar um pontapé inicial na investigação do DevOps agent antes que as coisas piorem. E já que estamos falando em dar autonomia pro agent atuar, precisamos garantir a segurança

[5:05] das operações através do isolamento de ambientes com os agent spaces. O ponto crucial de qualquer automação é manter o controle. Pensem numant space como se fosse uma sala limpa de laboratório, extremamente controlada. É um contêiner lógico, rígido, que define com precisão quais contas da AWS, ferramentas e pedaços da infraestrutura aquele agente tem permissão para acessar. Ele literalmente nunca vai investigar além do escopo que foi delimitado ali dentro. E por que seria necessário criar múltiplos agent spaces? Bem, operações modernas são complexas para caramba. É uma prática altamente recomendada separar esses espaços para evitar qualquer tipo de contaminação acidental. Manter a produção isolada do ambiente de desenvolvimento é o básico, claro. Mas além disso, pode ser preciso separar por equipes, definir limites de serviços ou atender a requisitos super rigorosos de conformidade, onde certos dados sensíveis precisam ficar totalmente isolados. Essas barreiras de isolamento funcionam em várias camadas de segurança. Além daquele bloqueio óbvio

[6:06] da conta WS e de restringir quais usuários podem interagir com o agente, os próprios dados gerados pelas investigações e os históricos de chat ficam compartimentados. Em resumo, o que acontece no Agent Space fica naquele Agent Space. Isso garante que as informações operacionais críticas continuem seguras e não caiam em mãos erradas. Certo? Agora que a casa está organizada e segura, vamos juntar todos esses conceitos e ver a mágica da resolução autônoma de incidentes com o DevOps agent em ação. Antes de vermos isso rodando, só uma rápida revisão dos pré-requisitos técnicos. A peça chave aqui é usar algo como o Agent Force Service com MCP Server configurado, que seria o Moral Context Protocol. Ele atua como uma ponte. Com ele mais o DevOps Agent Space configurado, o Cloud Watch e o Cloud Trail ativados e a nossa infraestrutura toda com tags. O agente ganha a capacidade de ler os chamados de suporte e buscar diretamente os dados da infraestrutura. Imagina a cena, um cliente abre um chamado dizendo que a

[7:06] aplicação caiu. Automaticamente o fluxo dispara e o devops agent recupera os detalhes do caso. Aí, graças às nossas tags bem feitas, ele faz a descoberta da topologia e entende arquitetura. E ele vai direto analisar as métricas do Cloud Watch e vê, por exemplo, que as requisições caíram para zero. Na sequência, ele cruza essa informação com os eventos do Cloud Trail e determina a causa raiz. Digamos que alguém acidentalmente encerrou a instância do S2. Ele conclui essa investigação complexa passo a passo, em minutos, sem nenhuma intervenção nossa. E o que torna essa automação uma quebra de paradigma não é apenas o fato de achar o problema. O agente não só identifica a causa raiz e publica todo o contexto técnico de volta no ticket de suporte, ele vai bem além. Ele gera um plano de mitigação completo, dando instruções acionáveis passo a passo para remediação e até inclui recomendações arquiteturais para prevenir que a queda volte a acontecer. É ter um engenheiro assistente altamente capacitado trabalhando no problema. O

[8:08] que nos deixa com este pensamento super provocador para encerrar. Se a gente automatizar de vez essa busca manual e exaustiva por logs, como vamos reinventar nossa rotina diária? Quando não precisamos passar o dia inteiro apagando incêndios, sobra tempo e energia para focar de verdade em resiliência e melhorias sistêmicas reais. Lembrem-se, a verdadeira automação não substitui o nosso talento, ela o liberta. Muito obrigado por acompanharem este tutorial. Até a próxima.
