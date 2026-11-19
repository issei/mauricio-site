---
id: KpcrbmGA_v8
slug: jev-o-fuzzy-if-para-decisoes-tipadas-e-rapidas-em-software
status: publicado
temas:
  - engenharia-agentica
  - ferramentas-de-ia
resumo: "O vídeo apresenta o Jev, da TypeSafe AI, um modelo que devolve decisões tipadas em vez de texto livre. Funciona como um \"fuzzy if\" para aplicações e agentes: três primitivas (choice, score e noul), endpoints prontos para triagem, risco de agentes e roteamento de modelos, e integrações com ferramentas de código."
revisado_por: "Maurício Yokoyama Issei"
revisado_em: 2026-11-19
youtube:
  titulo: Jev — O Fuzzy If para Decisões Tipadas e Rápidas em Software e Agentes de IA
  publicado_em: 2026-09-27
  duracao: PT7M35S
  descricao: |-
    Neste vídeo, apresentamos o **Jev**, o modelo desenvolvido pela TypeSafe AI focado em entregar decisões estruturadas e tipadas em vez de textos longos em prosa. Ele atua como um *middleware* e "fuzzy if" para aplicações e agentes de inteligência artificial, operando com latências entre 70 e 500 ms — sendo de 40 a 200 vezes mais rápido que chamadas a LLMs tradicionais.

    ---

    ### 💡 O que você vai aprender neste vídeo

    * **O Conceito de "Fuzzy If":** Como o Jev substitui condicionais rígidas em código e chamadas lentas a LLMs por um modelo de decisão ágil e calibrado.
    * **A Primitiva Principal (`/v1/decide`):** Como enviar um estado (*state*) e perguntas tipadas para avaliar múltiplas decisões em uma única requisição.
    * **As 3 Primitivas de Decisão do Jev:**
      * **`choice`:** Escolhe a melhor opção entre até 255 categorias rotuladas, acompanhada de probabilidades por opção e grau de confiança.
      * **`score`:** Classifica o texto em uma escala ordenada de 2 a 10 níveis com pontuações fracionárias.
      * **`noul`:** Retorna uma probabilidade calibrada de 0 a 1 para respostas do tipo sim/não, ideal para *guardrails* e filtros de segurança.
    * **Endpoints Prontos para Uso:** Conheça as rotas prontas para triagem de e-mails, suporte, avaliação de risco de agentes, classificação de RAG, qualificação de leads e moderação de conteúdo.
    * **Segurança e Eficiência para Agentes de IA:**
      * **Verificação de Risco (`/v1/agent/risk`):** Avalia comandos e ferramentas de agentes antes da execução para permitir, confirmar ou bloquear ações arriscadas.
      * **Compactação de Contexto (`/v1/context/filter`):** Filtra e remove itens antigos de histórico para evitar o inchaço do contexto de agentes sem reescrita de resumos.
      * **Roteamento de Modelos (`/v1/model/route`):** Seleciona automaticamente a categoria de modelo ideal com base na complexidade da tarefa.
    * **Integrações e Ferramentas do Ecossistema:** Como instalar o Jev via *agent skills* e servidores MCP (`jev-mcp`) no Claude Code, Cursor, OpenCode e Codex, além de usar o SDK oficial em TypeScript e gateways como Vercel AI Gateway, OpenRouter e Cloudflare.

    ---

    ### 🔗 Fontes e Documentação Oficial
    * **Documentação da API e Endpoint `/v1/decide`:** *Jev API docs — application endpoints + decision primitive*.
    * **Visão Geral do Modelo System One:** *Jev by TypeSafe AI — Try the System One model & API*.
    * **Habilidades para Agentes de Código:** *Jev agent skill — drop the Decision API into Claude Code, Cursor & Codex*.
    * **Ecossistema, Gateways e Ferramentas Open-Source:** *Jev ecosystem & access — gateways, LangChain, open-source tools*.
    * **Guias de Integração (TypeScript, MCP, IDEs):** *Jev integrations — Claude Code, OpenCode, TypeScript*.

    ---
  miniatura: https://i.ytimg.com/vi/KpcrbmGA_v8/maxresdefault.jpg
  visualizacoes: 40
  playlists: []
  legenda: automatica
  links_descricao: []
  coletado_em: 2026-11-07T22:16:07Z
---
## O problema de interpretar texto de IA

Integrar IA ao software sempre teve um custo: ler textos imprevisíveis. O vídeo apresenta o Jev, uma ferramenta que promete acabar com o parsing de texto gerado por IA [00:00].

O roteiro passa pelo problema do parsing, pelas decisões tipadas do Jev, pelas primitivas choice, score e noul, pelos workflows prontos da API e pelo ecossistema de agentes [00:21].

Quem já ligou um modelo de linguagem grande ao código conhece o problema. Na abordagem tradicional, o modelo devolve prosa, sujeita a alucinação, e o código precisa de um mar de expressões regulares para achar a resposta [00:42].

Segundo o vídeo, o Jev entrega decisões tipadas, sem parsing: o código recebe dados estruturados e ramifica a lógica na hora [01:03].

## Decisões tipadas e rápidas

Para funcionar no código, a decisão precisa ser rápida. Segundo o vídeo, o Jev roda de 40 a 200 vezes mais rápido que um LLM tradicional, com latência de 70 a 500 milissegundos [01:03].

A TypeSafe AI resume o espaço do produto assim: decisões vagas demais para um if manual, mas pequenas demais para um LLM de fronteira [01:25]. O Jev ocupa essa lacuna e assume as microdecisões que agentes e aplicativos tomam todos os dias [01:47].

O vídeo descreve o Jev como um modelo de "sistema um": avalia tudo numa única passada e devolve valores calibrados. Segundo o vídeo, pela própria arquitetura, não há chance de alucinação, e dá para ramificar o código confiando no valor [01:47].

## As três primitivas: choice, score e noul

O endpoint principal funciona em três passos [02:27]:

1. Enviar o estado da situação, o contexto atual, com até 64 mil tokens [02:27].
2. Enviar as decisões pedidas como perguntas tipadas: choice, score ou noul [02:27].
3. Receber a resposta numérica e ramificar a lógica [02:49].

A primitiva choice testa o contexto contra até 255 opções rotuladas e devolve a probabilidade de cada uma. Por exemplo: 99% para faturamento, 1% para conta e zero para bug. Com isso, dá para rotear tickets de suporte para o departamento certo [02:49].

A primitiva score posiciona os dados numa escala ordenada de 2 a 10 níveis. Ela traduz julgamentos subjetivos, como a urgência de uma mensagem, em algo concreto: pode esperar uma semana, ou exige ação imediata porque o cliente está prestes a cancelar [03:09].

A primitiva noul é um termo criado pela plataforma: um sim ou não calibrado, devolvido como probabilidade entre 0 e 1 [03:32]. Serve para filtros, portões de decisão e barreiras de proteção, como aprovar sozinho os casos óbvios e reter os incertos para uma pessoa avaliar [03:52].

## Workflows prontos na API

Para quem não quer escrever perguntas personalizadas, há endpoints prontos [04:13]:

- Triagem de suporte, que separa times e gravidade [04:13].
- Checagem de risco, que impede um agente de IA de executar ações perigosas [04:13].
- Roteador de modelos, que avalia a complexidade do pedido e aciona o modelo mais simples e barato [04:35].
- Filtro de contexto, que limpa a memória dos agentes e evita o inchaço de dados [04:35].
- Moderação de conteúdo, focada em assédio e toxicidade, e um analisador de anúncios [04:57].

Segundo o vídeo, todos esses endpoints usam uma única chave de API de servidor [04:57].

## Ecossistema e custos

Segundo o vídeo, desde setembro de 2026 dá para ligar o Jev ao Claude Code por plugin, ao Cursor pelo protocolo MCP e ao OpenCode pela linha de comando. Há também ferramentas para agentes específicos, como um roteador para o agente Pi [05:18].

Um exemplo prático: uma extensão de navegador usa o modelo para ler as legendas e pula cerca de 77% das inserções de patrocinadores em vídeos do YouTube. O custo das decisões num vídeo inteiro, segundo o vídeo, fica em frações de centavo [05:40].

O acesso não depende de uma porta só: dá para usar as chaves da TypeSafe AI ou gateways como Vercel AI Gateway, OpenRouter e Cloudflare AI Gateway [06:02].

Segundo o vídeo, os tokens de saída não são cobrados, os de entrada custam entre 25 e 42 centavos de dólar por milhão, e os créditos não expiram [06:23]. Isso torna viável rodar dezenas de milhares de microdecisões por dia [06:44].

## Trocar ifs frágeis por decisões tipadas

A provocação final: muitos códigos estão cheios de blocos rígidos de "se isso, então aquilo". O que dá para construir quando esses blocos viram uma decisão tipada de IA, que roda em 70 milissegundos e custa quase nada? [07:04]

## Perguntas frequentes

### O que é um "fuzzy if"?

Uma decisão vaga demais para uma condição fixa no código, mas pequena demais para justificar um LLM grande. O Jev devolve essa decisão já tipada [01:25].

### Quais são as primitivas do Jev?

Choice, que escolhe entre até 255 opções; score, que posiciona numa escala de 2 a 10 níveis; e noul, um sim ou não com probabilidade calibrada [02:27].
