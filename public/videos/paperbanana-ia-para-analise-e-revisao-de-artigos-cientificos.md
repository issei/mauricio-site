# PaperBanana: IA para Análise e Revisão de Artigos Científicos

O vídeo apresenta o PaperBanana, um sistema de agentes de IA do Google com a Universidade de Pequim que gera ilustrações para artigos científicos a partir do texto da metodologia. Explica o gargalo das figuras, a equipe de cinco agentes (Retriever, Planner, Stylist, Visualizer e Critic), o benchmark PaperBananaBench e o que essa automação muda no trabalho científico.

Vídeo de Maurício Yokoyama Issei, publicado em 3 de fevereiro de 2026 (6 min 56 s).
Assistir: https://www.youtube.com/watch?v=LusGPXICX5w

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## O gargalo das ilustrações científicas

Para quem pesquisa, uma das tarefas mais frustrantes é transformar ideias complexas em ilustrações claras para publicar um artigo. O vídeo apresenta o PaperBanana, uma ferramenta que promete entregar esse trabalho a uma IA [00:00].

Um diagrama de qualidade, como os das melhores publicações, pode levar dias ou semanas de um designer especializado [00:22]. A promessa é gerar uma ilustração assim do zero, a partir de um texto simples [00:43].

O roteiro passa pelo gargalo da ilustração, pelo PaperBanana e sua equipe de agentes, pelos testes e pelo que essa automação significa para a ciência [00:43].

O próprio artigo chama a tarefa de gargalo trabalhoso: semanas desenhando um diagrama são semanas a menos para a próxima descoberta [01:25].

As ferramentas atuais não resolvem. O código é rígido e limita a criatividade; os geradores de imagem fazem coisas bonitas, mas quase nunca têm a precisão técnica que um artigo exige [01:25]. Faltava uma ponte entre os dois mundos [01:46].

## Uma equipe de agentes

O PaperBanana foi desenvolvido por pesquisadores do Google e da Universidade de Pequim, como um assistente focado nessa tarefa [02:08].

Ele não é um único modelo tentando fazer tudo. É um framework de agentes, como uma linha de montagem: cada agente tem uma função e passa o trabalho para o próximo [02:08].

O pesquisador fornece o texto da metodologia e a legenda que quer para a figura [02:50]. O fluxo tem duas fases [03:10]:

1. Planejamento: a IA decide o que ilustrar e como [03:10].
2. Refinamento: a IA cria uma primeira versão e a revisa em ciclos. Segundo o vídeo, são três rodadas [03:10].

Os membros da equipe [03:31]:

- Retriever, o estagiário de pesquisa, que busca bons exemplos como referência [03:31].
- Planner, o arquiteto, que desenha o esqueleto da figura [03:31].
- Stylist, o diretor de arte, que define o visual [03:31].
- Visualizer, o ilustrador, que desenha [03:31].
- Critic, o controle de qualidade, que revisa, aponta erros e devolve para ajuste [03:53].

## Os testes

Para avaliar o sistema, a equipe criou o PaperBananaBench: 292 diagramas de artigos científicos publicados, que a IA tentou recriar com a mesma qualidade [04:14].

Segundo o vídeo, na avaliação geral de qualidade o PaperBanana superou os outros métodos em 17% [04:14]. O maior ganho, de mais de 37%, foi na concisão: a IA busca a forma mais clara e direta de comunicar a ideia [04:36]. A página do projeto afirma que o método supera os concorrentes em fidelidade, concisão, legibilidade e estética, sem dar os percentuais no texto.

O sistema é versátil: gera de fluxogramas de metodologia a gráficos estatísticos para visualização de dados [04:58].

## Automatizar o cientista

O ponto vai além da conveniência. Automatizar uma tarefa que consome tanto tempo libera quem pesquisa para pesquisar, inovar e descobrir, e acelera a ciência como um todo [05:39].

O vídeo resume três contribuições [06:01]:

1. O framework, que mostra que essa automação é possível [06:01].
2. O PaperBananaBench, uma régua de qualidade para a comunidade [06:01].
3. A prova de que a abordagem em equipe supera o que existia antes [06:01].

A pergunta final: se a máquina já consegue visualizar a ciência, o papel humano talvez seja fazer as perguntas certas. Para onde vamos apontar a curiosidade? [06:22]

## Perguntas frequentes

### O que o PaperBanana gera?

Ilustrações para artigos científicos, como diagramas de metodologia e gráficos estatísticos, a partir do texto da metodologia e da legenda da figura [02:50].

### Como o PaperBanana garante a qualidade da figura?

Com um agente crítico, que compara o resultado com o pedido, aponta erros e devolve a figura para ajuste em ciclos de refinamento [03:53].

## Fontes

- [PaperBanana: Automating Academic Illustration for AI Scientists](https://dwzhu-pku.github.io/PaperBanana/): Página do projeto, de pesquisadores da Universidade de Pequim e do Google Cloud AI Research. Descreve um framework de agentes que gera ilustrações acadêmicas prontas para publicação: busca referências, planeja conteúdo e estilo, renderiza e refina por autocrítica. Nomeia os agentes Retriever, Planner, Stylist, Visualizer e Critic; apresenta o PaperBananaBench, com 292 casos de teste de diagramas de metodologia tirados de artigos do NeurIPS 2025; e mostra que o método também gera gráficos estatísticos.

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Ferramentas de IA](https://mauricio.issei.com.br/temas/ferramentas-de-ia), [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

Neste vídeo você vai conhecer o PaperBanana, uma ferramenta inovadora baseada em Inteligência Artificial projetada para apoiar a leitura, análise e compreensão de artigos científicos.

Se você é pesquisador, estudante ou profissional que trabalha com produção acadêmica, essa solução pode otimizar significativamente seu tempo ao:

✔️ Resumir artigos técnicos
✔️ Destacar contribuições principais
✔️ Identificar limitações e pontos fortes
✔️ Facilitar a compreensão de conteúdos complexos

O PaperBanana utiliza modelos avançados de linguagem para transformar a experiência de revisão científica, tornando o processo mais ágil e estratégico.

🔗 Acesse o projeto oficial aqui:
https://dwzhu-pku.github.io/PaperBanana/

#InteligenciaArtificial #PesquisaCientifica #IA #MachineLearning #PaperBanana

## Transcrição

_Transcrição automática, não revisada._

[0:00] Sabe, para quem é da área científica, uma das tarefas mais frustrantes não é nem a pesquisa em si, mas sim ter que transformar aquelas ideias super complexas em ilustrações claras, sabe? Para publicar um artigo. É um verdadeiro gargalo no processo. Mas e se a gente pudesse simplesmente entregar esse trabalho para uma IA? Hoje a gente vai conhecer uma ferramenta que promete fazer exatamente isso. O nome dela é Paper Banana. Dá uma olhada nesse diagrama aqui. É o tipo de imagem que a gente vê nas melhores publicações científicas, né? Super detalhado, profissional. E o mais importante, claro, para criar uma coisa dessas, um designer especializado pode levar dias, às vezes até semanas. Agora, e se eu te dissesse que isso aí não foi feito por um humano? E se a partir de um texto simples, uma inteligência artificial conseguisse gerar essa ilustração inteirinha do zero? Pois é, é exatamente essa promessa que a gente vai investigar hoje. Bom, nosso roteiro aqui é bem direto. Primeiro vamos entender melhor esse gargalo que os pesquisadores

[1:00] enfrentam. Depois vamos conhecer o Paper Banana e a equipe de as que trabalha por trás dele. Aí a gente vê como ele se saiu nos testes. E para fechar vamos pensar um pouco sobre o que essa automação toda significa pro futuro da ciência. OK? Vamos começar com a parte um, o gargalo da ilustração. Antes de pular paraa solução, a gente precisa entender o tamanho do problema. É um obstáculo que muita gente nem percebe, mas que atrasa e muito o progresso científico. Como o próprio artigo diz, é um gargalo trabalhoso. Imagina só ter uma descoberta incrível, mas passar semanas tentando desenhar um diagrama que explique a ideia direito. É um tempo precioso que podia est sendo usado na próxima descoberta, né? E o pior é que as ferramentas que a gente tem hoje não resolvem o problema. Ou a pessoa usa código, que é super rígido, não dá muita margem pra criatividade, ou então usa aqueles geradores de imagem que até fazem umas coisas bonitas, mas quase nunca tem a precisão técnica que um artigo científico precisa. Faltava uma ponte entre esses dois mundos. E aí que

[2:01] a gente chega na sessão dois, apresentando paper banana. É justamente para preencher essa lacuna que surge essa nova proposta. um assistente de A feito sob medida pros cientistas. E aqui está ele. Esse é o Paper Banana. Ele foi desenvolvido por uma parceria entre pesquisadores do Google e da Universidade de Pequim, pensado para ser um assistente de focado nessa tarefa específica. E aqui vem a grande sacada. O Paper Banana não é um único super cérebro de a tentando fazer tudo sozinho. Pensa nele mais como uma linha de montagem com vários especialistas. é o que chamam de framework de agentes, onde cada agente, cada robozinho tem uma função bem específica, um passo o trabalho pro outro, garantindo que cada etapa da ideia ao design final saia perfeita. Certo? Sessão três, por dentro da equipe de A. Então, como é que essa linha de montagem funciona na prática? Vamos abrir o capô e dar uma olhada no passo a passo. Aqui a gente tem uma visão geral do sistema. Tudo começa com as informações que o pesquisador insere,

[3:02] o texto da metodologia e a legenda que ele quer paraa figura. A partir daí, essa equipe de agentes de IA entra em ação num fluxo de trabalho que tem duas fases principais. O processo todo se divide em duas partes. Primeiro, o planejamento. É aqui que a IA decide o que precisa ser ilustrado e como. Depois vem o refinamento. A IA cria uma primeira versão e em seguida revisa e melhora essa versão num ciclo de três rodadas. É como se fosse um designer obsecado por detalhe, sabe? Ele vai ajustando até chegar na versão final. E aqui estão os membros dessa equipe. Começa com o Retriever. Ele funciona como um estagiário de pesquisa, buscando bons exemplos para se inspirar. Aí ele passa o bastão pro Planner, que é o arquiteto do time que desenha o esqueleto da coisa. Em seguida, entra em cena o stylist, o diretor de arte, que define todo o visual. O visualizer é o ilustrador, o que de fato desenha tudo. E por último, talvez o mais importante, vem o Critic, que é tipo chefe do controle de qualidade. Ele revisa tudo, aponta erros e manda de volta para

[4:03] ajustar. É essa colaboração que faz o resultado ser tão bom. Sessão quatro, colocando a prova. OK, a teoria é impressionante, mas e na prática? Funciona mesmo? Os pesquisadores, claro, colocaram o sistema à prova para medir os resultados de verdade, para fazer uma avaliação justa. A equipe criou um desafio próprio, o Paper Banana Bench. Eles pegaram 292 diagramas de artigos científicos de verdade publicados e desafiaram a IA a recriar todos eles com a mesma qualidade. E o resultado, olha, numa avaliação geral de qualidade, o paper banana não só se saiu bem, ele superou os outros métodos em 17%. Para quem acompanha IA, um salto de desempenho desse tamanho é algo gigantesco. Mas o detalhe mais impressionante para mim tá aqui, onde a IA realmente brilhou foi na concisão, uma melhoria de mais de 37%. Isso é fundamental. Significa que a IA não tá só desenhando o que pediram, ela tá ativamente buscando a forma mais

[5:05] clara e direta de comunicar aquela ideia. Na prática, ela tá melhorando a clareza do próprio cientista e isso acelera a compreensão para todo mundo que vai ler o artigo. E aqui a gente vê a aplicação prática disso. Não estamos falando de um único tipo de diagrama. O sistema se mostrou super versátil, capaz de criar desde fluxogramas de metodologia, como esse da esquerda, até gráficos estatísticos mais complexos para visualização de dados, como da direita. Então vamos pra nossa última parte, automatizando o cientista. Diante de tudo isso, qual é o panorama geral? O que acontece quando a gente começa a automatizar não só as tarefas repetitivas, mas também partes do processo criativo da ciência. O ponto principal aqui vai muito além da conveniência. automatizar uma tarefa que consume tanto tempo. Ferramentas como Paper Banana liberam cientistas para eles focarem no que realmente importa: pesquisar, inovar, descobrir. O objetivo final é acelerar o ritmo da ciência como um todo. Então, resumindo as grandes contribuições, a gente tem três pontos

[6:06] chave. Primeiro, o próprio framework, que prova que essa automação é sim possível. Segundo, a criação do Paper Banana Bench, que é basicamente uma régua de qualidade que toda a comunidade científica pode usar. E terceiro, a prova de que essa abordagem em equipe tem um desempenho muito, mas muito superior ao que a gente tinha antes. Isso tudo nos deixa com uma pergunta fundamental para pensar. Conforme a IA vai assumindo mais e mais tarefas complexas e até criativas, o que sobra para nós humanos? Se a máquina já consegue visualizar a ciência, talvez o nosso papel se torne ainda mais crucial, o de fazer as perguntas certas. Liberados dessas tarefas mais trabalhosas, para onde a gente vai apontar a nossa curiosidade? A resposta para essa pergunta pode definir o ritmo da ciência nas próximas décadas.
