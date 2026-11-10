# Rompendo o Limite Serverless

Vídeo de Maurício Yokoyama Issei, publicado em 29 de janeiro de 2026 (5 min 43 s).
Assistir: https://www.youtube.com/watch?v=QF5MW5DYVAk

Assuntos: [Cloud e confiabilidade](https://mauricio.issei.com.br/temas/cloud-e-confiabilidade)

## Sobre o vídeo

Neste vídeo, exploramos os limites reais do modelo serverless, indo além do hype para discutir quando ele funciona muito bem — e quando pode se tornar um gargalo técnico ou estratégico.

Você vai entender:

O que é serverless de verdade (e o que não é)
Principais vantagens e armadilhas do modelo
Limites práticos de escala, custo, cold start e observabilidade
Quando serverless deixa de ser a melhor escolha
Arquiteturas e abordagens para romper esses limites

Boas práticas para arquitetos, devs e tech leads

🎯 Conteúdo indicado para:

Desenvolvedores backend
Arquitetos de software
Tech Leads e Especialistas Técnicos

Profissionais que buscam decisões arquiteturais mais maduras

📌 Tópicos abordados
#Serverless #CloudComputing #ArquiteturaDeSoftware #AWS #Lambda #DevOps #EngenhariaDeSoftware #TechLead #ArquiteturaCloud

## Transcrição

_Transcrição automática, não revisada._

[0:00] Sabe aquele momento em que a sua aplicação decola, mas o banco de dados não aguenta o tranco? Pois é, hoje a gente vai desvendar como Amazon Aurora Limitless promete quebrar essa barreira de uma vez por todas. Então vamos começar com uma pergunta que olha tira o sono de muito desenvolvedor por aí. O que acontece quando a sua capacidade de computação, que é praticamente infinita na nuvem, dá de cara com os limites bem finitos de um banco de dados relacional? E tá aí o tal do teto serverless. É aquele ponto frustrante, sabe? Não adianta ter a computação mais escalável do mundo se tudo trava na capacidade de escrita de um único banco de dados. E na prática, o que isso significa? Latência pro usuário, dor de cabeça pra equipe e no fim das contas, um freio na inovação. OK? Então, como é que o Aurora Limitless consegue romper esse teto? A resposta, olha, tá numa arquitetura completamente diferente, que é dividida em duas camadas super inteligentes. A ideia aqui é abandonar aquele conceito de um banco de dados monolíticos, sabe? Em vez

[1:01] disso, o sistema distribui o trabalho. Ele tem um conjunto de roteadores de transação e vários fragmentos de dados, os famosos shards. E o mais legal de tudo, pra sua aplicação, tudo continua apecendo uma única instância de banco de dados. A complexidade fica toda por baixo do capu. E aqui que a mágica acontece. A grande sacada é essa separação de tarefas. Os roteadores de transação, eles são stateless, ou seja, não guardam dados. Eles só coordenam as consultas. Isso significa que dá para escalar ou trocar eles sem dor de cabeça. Já os chards, ah, esses sim são stateful. É neles que os dados vivem de forma persistente. Para fazer essa escalabilidade funcionar, o sistema usa um conceito chamado fatias de tabela. Pensa assim: toda a tabela distribuída é quebrada em exatamente 512 pedacinhos lógicos. E aí vem a pergunta: "Mas por que 512?" Bom, esse número fixo é a chave paraa agilidade do sistema toda.

[2:01] Ter esse número fixo de fatias é o que permite que o banco de dados se rebalance sozinho de forma super eficiente. Quando um chard começa a ficar sobrecarregado, o sistema não precisa entrar em pânico. Ele simplesmente pega algumas dessas fatias e move para outro charde. Sem aquele processo complexo e demorado de ter que reparticionar tudo do zero. É rápido e sem interromper o serviço. Beleza? Entender arquitetura é o primeiro passo. Mas agora vamos paraa parte que realmente importa no dia a dia de quem desenvolve. Como é que essa estrutura toda impacta a decisão mais crucial de todas? O desenho do esquema do banco de dados. Então, num banco de dados limitless não dá para sair criando tabela de qualquer jeito. A estratégia é tudo. É preciso pensar quais tabelas vão ser fragmentadas ou chardadas para distribuir um volume gigante de dados. E quais vão ser as tabelas de referência? aquelas que são replicadas em todo lugar para otimizar as consultas. Olha só essa tabela. Ela deixa bem claro a lógica por trás dessa decisão. Tabelas com um

[3:03] volume massivo de dados, tipo logs, transações, eventos. Essas são as candidatas perfeitas para serem fragmentadas. Agora, aquelas tabelas menores que são usadas em joins o tempo todo, tipo um catálogo de produtos ou uma lista de CPs, essas viram tabelas de referência. são copiadas em todos os charts para garantir que as consultas sejam sempre locais e, claro, super rápidas. OK? A teoria tá clara, mas e na prática? Como é que a gente transforma essa estratégia em código? Vamos dar uma olhada nos passos para construir com o Limitless. E o legal é que o processo vai parecer bem familiar para quem já mexe com SQL. A grande virada de chave tá num passo que vem antes. Antes de dar o create table, você simplesmente define o modo da tabela usando uma variável de sessão. Isso facilita muito a adoção, né? Então, para criar uma tabela fragmentada, o que a gente faz? Primeiro a gente define o modo como sharded. Logo depois a gente especifica a shard key. Essa é a coluna ou colunas como item

[4:05] underline id aqui que o Aurora vai usar para saber como distribuir os dados de forma inteligente entre os diferentes charts. E aí sim create table. Agora, se for uma tabela de referência é mais fácil ainda. É só definir o modo como reference e pronto, pode criar a tabela. A partir daí, o próprio Aurora cuida de manter uma cópia dela em cada charde. O resultado: joins com essa tabela vão ser sempre locais e muito, muito rápidos. Beleza, a tecnologia é incrível, mas a pergunta de 1 milhão de dólares é: será que o Aurora Limitless é para todo mundo? Vamos ver agora os casos de uso onde ele realmente se destaca. Ele foi pensado para aquelas cargas de trabalho que tem um fluxo contínuo de escritas em escala massiva e com baixa latência. Pensa, por exemplo, em sistemas financeiros que processam milhões de transações, ou em plataformas de Adtec que precisam registrar cada clique e impressão em tempo real, ou ainda frotas de IoT que enviam lados de telemetria sem parar. É para esse tipo de cenário. No fim das contas, a grande mudança de

[5:06] paradigma é essa. O banco de dados deixa de ser o gargalo, aquele ponto fraco que segura todo o sistema. Ele se transforma num componente que escala horizontalmente, de forma tão elástica e natural paraa nuvem. Quanto a camada de computação serverless que ele suporta. O que essa tecnologia faz é abrir um horizonte completamente novo paraa arquitetura de software. Ela remove um dos limites mais antigos e frustrantes da computação. E isso deixa a gente com uma pergunta bem interessante para pensar. Agora que o banco de dados não é mais o gargalo, o que é que a gente vai ser capaz de construir?
