# VERTEX AI AGENTES DE AÇÃO: Construindo Agentes de IA que Realmente Agem (ReAct e OpenAPI)

O vídeo mostra como usar o Vertex AI Agent Builder para criar agentes que executam ações, e não só respondem perguntas. Explica a ferramenta customizada em três passos, a orquestração pelas instruções, o ciclo ReAct para depurar e os caminhos para levar o agente à produção.

Vídeo de Maurício Yokoyama Issei, publicado em 12 de novembro de 2025 (6 min 31 s).
Assistir: https://www.youtube.com/watch?v=rxjZWOMIzyA

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## Do agente que sabe ao agente que faz

O vídeo trata do Vertex AI Agent Builder, com um foco: construir agentes que executam ações no mundo real [00:00]. A pergunta que guia o vídeo é se o agente pode, de verdade, agir [00:22].

O roteiro tem cinco partes: ação e conhecimento, uma ferramenta customizada, a orquestração das ações, a depuração e a ida para produção [00:22].

## Ação e conhecimento

O vídeo compara dois tipos de agente [01:05]:

- O agente bibliotecário usa técnicas como RAG. Ele consulta fontes de dados para responder perguntas do tipo "o que é?" [01:05].
- O agente operador usa ferramentas. Ele recebe um pedido e, por APIs e funções, interage com sistemas externos [01:05].

## Uma ferramenta customizada em três passos

O processo tem três passos [01:27]:

1. Crie uma função, por exemplo uma Cloud Function em Python que verifica o estoque de um produto [01:47].
2. Defina o contrato da API com uma especificação OpenAPI, para o agente saber o que a função faz [01:47].
3. Conecte a função como ferramenta na interface do Agent Builder [02:08].

O design da função é decisivo [02:08]:

- A assinatura deve ser descritiva, com type hints [02:08].
- A docstring é a parte mais importante: é o texto que o LLM lê para entender o que a ferramenta faz [02:08].
- O retorno deve ser claro, de preferência um dicionário com status, como sucesso ou erro [02:28].
- Se a ferramenta precisa de memória entre chamadas, use o tool context [02:28].

## Orquestrar as ações

Para tarefas com vários passos, o segredo está nas instruções do agente [02:49]. Elas dizem ao agente o que fazer e como combinar as ferramentas, passo a passo [02:49].

## Inspecionar o raciocínio

Para depurar, é preciso entender como o agente pensa [03:10]. A base é o framework ReAct, de razão e ação: o modelo primeiro pensa no que precisa fazer e só depois age [03:33].

O ciclo começa com o prompt do usuário. O agente decide que precisa de uma ferramenta, a API é chamada e o resultado alimenta o próximo passo do raciocínio, até a resposta final [03:54]. O ciclo tem três etapas [03:54]:

1. Raciocinar: o agente avalia o objetivo e planeja o próximo passo [04:16].
2. Agir: o agente escolhe e chama a ferramenta certa [04:16].
3. Observar: o agente recebe o resultado e usa essa informação na próxima etapa [04:16].

No Agent Builder, o debug trace mostra cada ciclo de razão, ação e observação, com a ferramenta chamada e o que ela retornou [04:37]. Isso é essencial para depurar um comportamento que nem sempre é determinístico [04:37].

## Otimizar e implantar

Uma técnica de otimização é dar exemplos ao modelo, o few-shot learning [04:57]. No example store, você fornece pares de entrada e da saída desejada, como um pedido para listar produtos que deve resultar numa tabela formatada [05:18]. Isso guia o modelo melhor do que só ajustar as instruções [05:18].

Para produção, há caminhos diferentes [05:18]. Para integrações simples, o snippet web pode bastar [05:18]. Para aplicações robustas e escaláveis, o caminho é um framework code-first, como o Agent Development Kit (ADK), com deploy em serviços gerenciados como o Cloud Run ou o Vertex AI Agent Engine [05:39].

## A mudança de paradigma

O ponto central é tirar o agente do papel de oráculo, que só sabe, e pô-lo no papel de operador, que faz [05:59].

## Perguntas frequentes

### Qual é a diferença entre um agente de conhecimento e um agente de ação?

O agente de conhecimento responde perguntas a partir de fontes de dados. O agente de ação executa tarefas por APIs e funções [01:05].

### Qual é a parte mais importante da função de uma ferramenta?

A docstring, porque é o texto que o LLM lê para entender o que a ferramenta faz [02:08].

### O que é o ciclo ReAct?

É o ciclo de raciocinar, agir e observar: o modelo pensa, chama uma ferramenta e usa o resultado no próximo passo [04:16].

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Cloud e confiabilidade](https://mauricio.issei.com.br/temas/cloud-e-confiabilidade)

## Sobre o vídeo

Seu agente de IA só sabe responder perguntas? É hora de fazê-lo agir! 🚀
Neste guia prático, mergulhamos no Vertex AI Agent Builder para mostrar como evoluir de um agente "oráculo" (que só fornece conhecimento) para um agente "operador" (que executa tarefas no mundo real). Se você é Desenvolvedor ou Engenheiro de IA, este vídeo é essencial para criar soluções que realmente transformam processos.
O que você vai aprender:
A Evolução do Agente: A diferença crucial entre agentes de conhecimento e agentes de ação.
O Framework ReAct: Entenda o ciclo de Raciocinar, Agir e Observar que permite ao agente tomar decisões e executar ações complexas.
Construindo a Ferramenta: O processo de 3 passos para criar uma ferramenta personalizada: Cloud Function, especificação OpenAPI e conexão com o agente.
Orquestração e Debug: Como inspecionar o raciocínio do agente para depuração e como orquestrar múltiplas ações para tarefas complexas.
Pare de apenas perguntar à IA. Assista agora e comece a construir agentes que realmente colocam a mão na massa!

#VertexAI #AgentesDeIA #MachineLearning #ReAct #OpenAPI #GoogleCloud #DesenvolvimentoDeIA #EngenhariaDeIA #CloudComputing

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olá, hoje a gente vai mergulhar no Vertex AI Agent Builder, mas com um foco bem específico. Sabe aquela história de agentes que só sabem das coisas? Então vamos deixar isso para trás. O nosso objetivo aqui é construir agentes que de fato fazem coisas, que executam ações no mundo real. E a pergunta que guia tudo isso é justamente esta: o agente de AC que tá sendo desenvolvido pode de verdade agir? Porque essa transição fundamental que se para um simples assistente de informação de uma ferramenta de automação realmente poderosa. Pra gente entender isso direitinho, nosso roteiro vai ser bem direto. Primeiro vamos diferenciar a ação de conhecimento, depois mão na massa, construir uma ferramenta customizada e ver como orquestrar as ações. Na sequência, a gente vai dar uma espiada em como ele pensa, ou seja, fazer o debug. E para fachar, falamos de otimização e como levar tudo isso paraa produção. Então vamos começar pelo começo, né? Primeira parte, ação versus

[1:02] conhecimento. Qual é a real diferença entre um agente que sabe e um agente que bota a mão na massa? Pensa assim, de um lado, a gente tem um agente bibliotecário que usa técnicas como HAG. Ele se baseia em fontes de dados para responder perguntas do tipo: "O que é?" Do outro lado, que é o nosso foco total hoje, está o uso de ferramentas. Aqui o agente é um operador. Ele não só responde, ele executa. Ele recebe um faça isso e através de API e funções vai lá e interage com sistemas externos. Beleza? Teoria entendida. Agora vamos pra parte divertida, a prática. Segunda sessão. Construindo uma ferramenta customizada. É aqui que o nosso agente ganha de verdade super poderes. O processo é bem direto, se resume a três passos principais. Primeiro, a gente cria uma função, pode ser uma cloud function em Python para, por exemplo, verificar o estoque de um produto. Segundo passo, e, ó, esse é crucial. A gente define o contrato da API com uma especificação Open API. É como se fosse

[2:03] um manual de instruções para que o agent saiba o que a função faz. E por último, a gente conecta essa função como uma ferramenta lá na interface do Agent Builder. Mas atenção, não é só criar a função. O design dela é tudo. A assinatura da função tem que ser descritiva com type hints. A doc string é o mais importante. Pensa nela como a alma da ferramenta. É a descrição que o LLM vai ler para entender o que fazer. Então tem que caprichar. O retorno também tem que ser claro, de preferência um dicionário com status, tipo sucesso ou erro. E se a ferramenta precisar de memória entre chamadas, aí a gente usa o tool context, certo? O agente agora tem a sua caixa de ferramentas, mas como ele sabe qual usar e em que momento? É exatamente isso que a gente vê agora na sessão três, orquestrando as ações do agente. Vamos guiar tarefas que exigem múltiplos passos. O segredo para essa orquestração toda tá aqui nas instruções do agente. Pensa nessas instruções como se fossem o cérebro executivo da

[3:04] operação. É nesse campo que a gente vai dizer ao agente não apenas o que fazer, mas como ele deve combinar as ferramentas para completar tarefas complexas passo a passo. Tudo bem, a gente programou, deu as instruções, mas e quando dá errado? Ou quando o agente faz algo que a gente não esperava? É para isso que serve a sessão quatro. Inspeando o raciocínio. Chegou a hora de abrir o capô e ver o que tá acontecendo lá dentro. Para conseguir depurar, a gente precisa primeiro entender como a gente pensa. A base para isso é um framework chamado react, que significa razão e ação. É um ciclo onde o modelo primeiro para, pensa no que precisa fazer e só depois ele age. Entender esse processo é o segredo para conseguir seguir a linha de raciocínio dele. E este fluxo aqui mostra isso perfeitamente. Olha só, tudo começa com o prompt de um usuário. Isso dispara o ciclo. O agente pensa e decide que precisa de uma ferramenta. A API é

[4:05] chamada, retorna um resultado e essa nova informação alimenta o próximo passo do raciocínio dele até chegar na resposta final. A gente pode quebrar esse ciclo em três etapas bem claras. Primeiro, raciocinar. O agente avalia o objetivo e bola um plano pro próximo passo. Segundo, agir. Ele seleciona e invoca a ferramenta certa, como a nossa cloud function. E terceiro, observar. Ele recebe o resultado da ferramenta e usa essa nova informação como combustível paraa próxima etapa de raciocínio. Na prática, a ferramenta que permite ver tudo isso é o The Bug Trace lá no Agent Builder. Ele nos deixa inspecionar cada ciclo de razão, ação e observação, mostrando exatamente qual ferramenta foi chamada e que informação ela retornou. Isso é essencial para entender e depurar o comportamento que nem sempre é determinístico. Com o agente funcionando e depurado, o próximo passo é a produção. Então vamos pra nossa última sessão, otimização e

[5:05] implantação. Vamos ver como refinar o comportamento e colocar o projeto para rodar de verdade. Uma técnica de otimização muito poderosa é usar exemplos, o que chamamos de fi shot learning. Como a gente vê na tabela, podemos ir na exemplo store e fornecer pares de entrada e saída desejada. Aqui, por exemplo, mostramos que um pedido para listar produtos deve resultar numa tabela formatada. Isso guia o modelo de forma muito mais precisa do que só ficar ajustando as instruções. E quando o agente tá pronto, existem diferentes caminhos para produção. Para integrações simples, o Snipet Web pode ser suficiente, mas para aplicações que precisam ser robustas, escaláveis, a rota é usar Frameworks Code First, como aged development kit, o ADK. Com ele, o deploy é feito em serviços gerenciados, como Cloud Run ou Vertex AI Agent Engine, que aguentam o tranco. Resumindo tudo, o ponto crucial da nossa conversa é essa evolução. Tirar o agente do papel de um oráculo que só sabe das coisas e colocar ele no papel de um operador que

[6:07] efetivamente faz coisas. É a mudança de paradigma do conhecimento pra ação. E agora fica a provocação final. Qual vai ser a primeira ação que o próximo agente a ser construído por aí vai executar para de fato mudar a forma como algo é feito? O poder de construir isso tá todo disponível. Valeu por acompanhar.
