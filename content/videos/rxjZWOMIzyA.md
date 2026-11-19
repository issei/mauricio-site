---
id: rxjZWOMIzyA
slug: vertex-ai-agentes-de-acao-construindo-agentes-de-ia-que
status: publicado
temas:
  - engenharia-agentica
  - cloud-e-confiabilidade
resumo: O vídeo mostra como usar o Vertex AI Agent Builder para criar agentes que executam ações, e não só respondem perguntas. Explica a ferramenta customizada em três passos, a orquestração pelas instruções, o ciclo ReAct para depurar e os caminhos para levar o agente à produção.
revisado_por: Maurício Yokoyama Issei
revisado_em: 2026-11-19
youtube:
  titulo: "VERTEX AI AGENTES DE AÇÃO: Construindo Agentes de IA que Realmente Agem (ReAct e OpenAPI)"
  publicado_em: 2025-11-12
  duracao: PT6M31S
  descricao: |-
    Seu agente de IA só sabe responder perguntas? É hora de fazê-lo agir! 🚀
    Neste guia prático, mergulhamos no Vertex AI Agent Builder para mostrar como evoluir de um agente "oráculo" (que só fornece conhecimento) para um agente "operador" (que executa tarefas no mundo real). Se você é Desenvolvedor ou Engenheiro de IA, este vídeo é essencial para criar soluções que realmente transformam processos.
    O que você vai aprender:
    A Evolução do Agente: A diferença crucial entre agentes de conhecimento e agentes de ação.
    O Framework ReAct: Entenda o ciclo de Raciocinar, Agir e Observar que permite ao agente tomar decisões e executar ações complexas.
    Construindo a Ferramenta: O processo de 3 passos para criar uma ferramenta personalizada: Cloud Function, especificação OpenAPI e conexão com o agente.
    Orquestração e Debug: Como inspecionar o raciocínio do agente para depuração e como orquestrar múltiplas ações para tarefas complexas.
    Pare de apenas perguntar à IA. Assista agora e comece a construir agentes que realmente colocam a mão na massa!

    #VertexAI #AgentesDeIA #MachineLearning #ReAct #OpenAPI #GoogleCloud #DesenvolvimentoDeIA #EngenhariaDeIA #CloudComputing
  miniatura: https://i.ytimg.com/vi/rxjZWOMIzyA/maxresdefault.jpg
  visualizacoes: 95
  playlists: []
  legenda: automatica
  links_descricao: []
  coletado_em: 2026-11-07T22:16:07Z
---

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
