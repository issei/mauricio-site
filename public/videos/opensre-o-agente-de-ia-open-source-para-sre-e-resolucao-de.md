# OpenSRE: O Agente de IA Open-Source para SRE e Resolução de Incidentes

Vídeo de Maurício Yokoyama Issei, publicado em 7 de outubro de 2026 (8 min 3 s).
Assistir: https://www.youtube.com/watch?v=BTTHq4W56KQ

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Cloud e confiabilidade](https://mauricio.issei.com.br/temas/cloud-e-confiabilidade)

## Sobre o vídeo

Neste vídeo, apresentamos o **OpenSRE**, um framework open-source projetado para construir e executar agentes de IA focados em Engenharia de Confiabilidade de Sites (SRE) e automação de incidentes em ambientes de produção.

Aprenda como o OpenSRE correlaciona logs, métricas, traços e implantações recentes, diagnostica falhas em tempo real e investiga a causa raiz dos problemas diretamente na sua própria infraestrutura.

---

🎯 **O que você vai ver neste vídeo:**
• **O que é o OpenSRE**: O toolkit open-source para a era dos agentes de IA.
• **Diagnóstico de Incidentes**: Como o agente analisa alertas, testa hipóteses e identifica a causa raiz com base em evidências.
• **Automação de CI/CD**: Diagnóstico automático de falhas em pipelines e abertura automática de Pull Requests com as correções no GitHub.
• **Segurança e Mascaramento**: Proteção de dados sensíveis e redação reversível de identificadores de infraestrutura antes de chamadas a LLMs.
• **Ecossistema de Integrações**: Suporte nativo a mais de 60 ferramentas (Grafana, Datadog, Kubernetes, AWS, Slack, PagerDuty e mais).
• **Instalação Rápida**: Como instalar e autenticar em poucos minutos no terminal.

---

⏱️ **Capítulos do Vídeo:**
00:00 - Introdução ao OpenSRE
01:15 - O Problema dos Incidentes em Produção
02:40 - Como o Agente de IA Funciona na Prática
04:10 - Investigação de Falhas e Correção Automática em CI/CD
05:55 - Segurança, Privacidade e Mascaramento de Dados
07:20 - Conectando Observabilidade e Cloud (60+ Ferramentas)
08:45 - Passo a Passo de Instalação e Comandos CLI
10:10 - Conclusão e Próximos Passos

---

💻 **Comandos de Instalação Rápida:**
• macOS / Linux:
`curl -fsSL https://install.opensre.com | bash -s -- -dc`

• Windows (PowerShell):
`& ([scriptblock]::Create((irm https://install.opensre.com/install.ps1))) -dc`

---

🔗 **Links Oficiais e Fontes do Projeto:**
• Repositório no GitHub: https://github.com/Tracer-Cloud/opensre
• Site Oficial do OpenSRE: https://www.opensre.com/
• Documentação Oficial: https://www.opensre.com/docs
• Guia de Quickstart: https://www.opensre.com/docs/getting-started/quickstart
• Comunidade no Discord: https://discord.gg/opensre

---

#OpenSRE #DevOps #SRE #ArtificialIntelligence #Kubernetes #GitHubActions #Observability #CICD #OpenSource #CloudEngineering

## Transcrição

_Transcrição automática, não revisada._

[0:00] E aí, tudo bem? Bem-vindos a mais um mergulho profundo nosso. Olha só essa situação. Hoje em dia, a IA escreve o código. Beleza, mas me diz uma coisa, quem é que conserta a build quando tudo quebra? A gente tá numa era em que assistentes de código cospem centenas de linhas em segundos, só que na hora do deploy, se a esteira de C/CD falha, toda essa velocidade absurda da IA bate de frente num muro, um muro de processos manuais lentos. Então bora destrinchar como a automação finalmente está chegando para resolver a parte mais chata dos incidentes de infraestrutura. Sabe aquele momento em que a pipeline quebra ou o alerta de produção começa a gritar? Pois é. A realidade nas equipes raramente é tranquila, não é? É um verdadeiro caos. A pista do que deu errado tá sempre espalhada. É um festival de logs caóticos, painéis de métricas que não conversam entre si, Runbooks que ninguém atualiza desde 2019 e aquelas threads intermináveis de mensagens. E com prazo apertado batendo na porta, a galera acaba clicando no botão de rerun, meio que fechando o olho

[1:00] e rezando pro erro sumir. Ou pior ainda, a branch principal trava geral. Todo mundo fica de braços cruzados, só esperando aquele único engenheiro sior que tem todo o contexto na cabeça largar tudo para vir a pagar o incêndio. Bom, é exatamente para acabar com esse gargalo que surgiu o Open SRE. é um framework de código aberto simplesmente revolucionário. Ele foi construído do zero para agir como um agente de engenharia de confiabilidade de sites, o famoso SRE, só que totalmente movido à inteligência artificial. Basicamente é uma caixa de ferramentas pensada para caçar falhas de infraestrutura e consertar quebras de CIA e de Acudim automaticamente, devolvendo tempo e agilidade pr as equipes na hora que elas mais precisam. No nosso roteiro de hoje, vamos passar por cinco pontos rápidos. Primeiro o problema crônico dos incidentes de CICD. Depois vamos apresentar de fato o Open SRE. No ponto três, a mecânica de como esse agente funciona. Em seguida, a gente fala de integrações e segurança. E para fechar, a implantação e como começar rápido. Então, começando pela sessão um, o

[2:02] problema de incidentes em CID. E por que é tão difícil diagnosticar a quebra da build? Isso aqui ilustra perfeitamente por aplicar IA para manter sistemas no ar sempre foi um baita desafio. Olha a diferença. Quando a gente fala de tarefa de código puro, os agentes evoluíram muito porque eles têm acesso a dados de treinamento super escaláveis, tipo we BCH e ciclos rápidos de feedback local. Você erra, conserta, erra de novo. Agora nos incidentes de produção é outro bicho. As falhas são distribuídas, os logs são uma bagunça barulhenta. Historicamente, a gente não tem um equivalente claro do WE Bentch para resposta a incidentes. Faltava um ambiente padronizado para treinar a IA a resolver problemas reais e infraestruturas complexas. Avançando paraa sessão dois, apresentando o Open SRE, o agente de código aberto para confiabilidade. O ponto principal aqui é o seguinte. O Open SRE não é só mais um chatbot onde você fica colando o código. Na verdade, ele é um ambiente de aprendizado por reforço e um framework muito robusto.

[3:03] Ele lê a falha, vai lá, abre diretamente um pull request com o conserto e opera de forma 100% autônoma, rodando dentro da infraestrutura autohospedada da sua própria equipe. A grande sacada é ter um agente que entra em ação no milissegundo em que a build falha. Ele puxa os logs, testa as hipóteses e muitas vezes resolve o problema antes mesmo de um humano abrir o painel da pipeline para ver o que rolou. E para ter uma ideia do tamanho dessa dor, consertar pipeline quebrada incomoda tanta gente que o projeto já passou das 11.400 estrelas no GitHub com mais de 1700 fors. Mais de 11.000 é a comunidade de desenvolvedores validando em peso que sim, precisamos urgentemente de um caminho open source para automatizar a resposta a incidentes. Legal. Vamos pra sessão três, como o agente funciona. Vamos dar uma olhada na mecânica por baixo do capô. Presta atenção nesse fluxo de cinco passos aqui, porque é muito interessante. O alerta dispara, certo? Primeiro passo, o agente busca instantaneamente todo contexto, tipo quem é o dono do serviço, o que foi alterado agora a pouco e já

[4:04] puxa os logs. No passo dois, entra uma etapa crítica de segurança. Ele mascara os dados sensíveis. No passo três, a Ia usa as ferramentas e começa a raciocinar em cima das hipóteses, cruzando os sistemas. Passo quatro, ele elabora a resposta e toda a conclusão vem baseada em evidência dos dados que ele acabou de ler. E por fim, no passo cinco, ele posta um resumão super direto no canal, onde a equipe já tá conversando. Fim do desespero de ficar alternando entre um monte de abas. O framework não te força a trabalhar de um jeito só, é super flexível. Quer abrir o terminal e explicar o problema conversando com o Shell Interativo? Tranquilo. Quer rodar de forma headless na surdina num script de integração contínua para agir sozinho? Dá também. Você pode usar a API Python embutida e jogar isso dentro dos serviços internos que a sua empresa já tem ou simplesmente chamar por um bote dentro do slack. Você literalmente delega as buchas de DevOps pro agente em tempo real. Sessão quatro agora, integrações e segurança. Como a gente conecta tudo isso na Steack de forma segura? Olha só esse número na tela.

[5:05] Mais de 60. O Open SAE já vem de fábrica com mais de 60 integrações prontas. Ele basicamente abraça praticamente qualquer ferramenta e camada da stack moderna de nuvem. Dividindo isso por categorias, fica claro que ele tem todas as habilidades que precisa. Na parte de IA, você escolhe. Pode usar Antropic, Open AI ou rodar local com Olamam, se preferir privacidade total. Ele pluga nas ferramentas de observabilidade, como data Dog, grafana para puxar métricas. Entra direto no Cuberneris ou AWS para ver configuração, fuça nos bancos de dados, tipo Postgress e Raries para encontrar anomalias e ainda manda o relatório completinho pro seu canal do Slack ou Discord. O agente consegue investigar o sistema com o mesmo arsenal de ferramentas que o engenheiro usaria. Mas aí você deve estar se perguntando, dá todo esse acesso para um agente não é um risco de segurança gigantesco? E é aí que entra esse detalhe fundamental. Ele oculta informações como nomes de pods, clusters e ids de contas antes de mandar para qualquer LLM externo e depois

[6:05] restaura isso só na hora de exibir a resposta para você. Esse mascaramento reversível garante que nenhum dado sensível do incidente vaze pela internet desprotegido. A IA resolve o BO, mas os dados da sua empresa ficam seguros. Finalmente, sessão C, implantação e início rápido. Vendo como colocar esse agente no ar, eles documentaram três caminhos principais de implantação com muita flexibilidade. Se você quer facilidade imediata, vai de Open SRE Cloud, que é um gateway gerenciado super prático. Se a sua equipe é daquelas que quer controle absoluto na própria nuvem, dá para embutir o agente direto em imagens de servidores com o gatewayi. E pra galera dos contêineres, tem a rota do Docker File para rodar tudo autohospedado lá no AWS, na Railway ou na Versel com isolamento total. E para ser bem sincero, o que mais surpreende é a agilidade para dar os primeiros passos. Você roda o script de instalação no terminal e em coisa de 2 minutos tá com tudo pronto. E tem um detalhe sensacional. Na primeira vez que você digita o comando Open SRE, o modelo

[7:06] hospedado já é ativado automaticamente para você testar. Ou seja, você não precisa nem correr atrás de chave de API e de LLM. Agora é só instalar, rodar e já começar a explorar o poder do agente na sua própria máquina. Para fechar nossa análise de hoje, eu quero deixar uma provocação com vocês. Pensa rapidinho. Quanto tempo valioso de desenvolvimento agora mesmo tá completamente travado aí nas equipes, só aguardando alguém descobrir porque a branch principal tá vermelha? A ideia de ter frameworks abertos de agentes sre é transformar essa dor em algo que se conserta sozinho, sabe? tirar o engenheiro daquele trabalho manual repetitivo para ele focar no que importa, fazer o produto avançar. Porque convenhamos, se as máquinas já estão escrevendo código sozinhas, parece que é só questão de tempo até que a obrigação de manter a build verdinha seja problema delas também, não acha? Muito obrigado pela companhia e a gente se vê na nossa próxima análise.
