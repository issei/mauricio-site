# Jev — O Fuzzy If para Decisões Tipadas e Rápidas em Software e Agentes de IA

Vídeo de Maurício Yokoyama Issei, publicado em 27 de setembro de 2026 (7 min 35 s).
Assistir: https://www.youtube.com/watch?v=KpcrbmGA_v8

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Especificação e desenvolvimento](https://mauricio.issei.com.br/temas/especificacao-e-desenvolvimento)

## Sobre o vídeo

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

## Transcrição

_Transcrição automática, não revisada._

[0:00] E aí, vamos falar de algo que tá literalmente mudando o jogo no desenvolvimento de software. Se integrar a inteligência artificial sempre foi aquela dor de cabeça de ler textos imprevisíveis, a gente precisa falar sobre o Jeff. Nesta análise estruturada, vamos ver exatamente como essa ferramenta acaba de vez com a bagunça que é fazer parsing de texto gerado por IA. Certo? O plano para hoje é o seguinte. Primeiro o problema do parsing com IA, depois a entrada do Jev com as decisões tipadas. Na sequência, vamos entender o choice, o score e o no. Dá uma olhada nos workflows prontos da API e fechar com o ecossistema de agentes. O bendito problema do parcing com IA. Bom, quem já tentou plugar um modelo grande de linguagem no meio do código sabe bem a bagunça estrutural que é. De um lado, na abordagem tradicional, a gente tem aquele texto solto, pura prosa, altamente sujeito a alucinações. Isso te obriga a criar um mar de expressões regulares só para tentar adivinhar a resposta que interessa. É super frágil, né? Mas olha a elegância da abordagem à

[1:01] direita. O Jevia entrega decisões tipadas, zero necessidade de parsen. O código simplesmente recebe os dados limpos e estruturados e já ramifica a lógica na mesma hora. E é aí que entra o nosso segundo tópico, o Jev. E essas decisões tipadas para resolver aquele caos de maneira prática, o negócio tem que ser rápido. E uau, estamos falando de uma ferramenta que roda de 40 a 200 vezes mais rápido que um LLM tradicional. A latência de resposta, incríveis 70 a 500 msundos. É quase instantâneo a velocidade exata que aplicações em tempo real precisam para não engasgar. O pessoal da TypeSfe AI resumiu isso de um jeito genial. Eles dizem que é muito vago para um if manual. mas muito pequeno para um LLM de fronteira. É exatamente aí que o Jeff brilha. Ele preenche aquela lacuna enorme, assumindo com total confiabilidade os milhões de microdecisões que agentes de software e aplicativos precisam tomar todos os dias. O grande segredo técnico aqui é que o JEV funciona como um modelo de

[2:03] sistema um. Ele avalia tudo em uma única viagem de dados. Por causa da própria construção da arquitetura dele, ele devolve valores calibrados com literalmente zero chance de alucinar. Sabe o que isso significa? Dá para criar ramificações no código ali mesmo, no bom e velho código plano, confiando 100% no valor, sem aquele medo de que a inteligência artificial invente uma loucura de última hora. Legal, vamos avançar pro terceiro ponto e conhecer as três primitivas essenciais da API: choice, score e no. A mecânica do end point principal da API é maravilhosamente simples. Passo um, envia-se o estado da situação, o contexto atual, que pode ter até 64.000 tokens, o que é bastante coisa. Passo dois, mandam-se os requisitos específicos de decisão na forma de perguntas tipadas, usando choice, score ou no. E o passo três, claro, é receber a resposta matemática e ramificar a lógica. Agora, o que é realmente fascinante sobre o choice ou a primitiva de escolha é a precisão absoluta. Ela pega o contexto e testa contra até 255

[3:05] opções que a gente mesmo rotula, devolvendo as probabilidades matemáticas exatas de cada uma. Imagina receber 99% para faturamento, 1% para conta e zero para bug. Com isso na mão, dá para rotear milhares de tickets de suporte por segundo sem errar o departamento. E a primitiva de pontuação, o score. Bom, ela serve para posicionar os dados em uma escala concreta e ordenada que vai de 2 a 10 níveis. Ela pega julgamentos super subjetivos, como a urgência na mensagem de um usuário e traduz diretamente para um prazo. Por exemplo, o sistema passa a entender na hora se o assunto pode esperar uma semana de boa ou se exige ação em zero minutos porque é um cliente crítico prestes a cancelar tudo. E aí chegamos no. Esse é um termo exclusivo deles, uma invenção da plataforma. O no nada mais é do que um sim ou não calibradíssimo que volta como uma probabilidade matemática entre zero e um. é literalmente a ferramenta definitiva para criar filtros, portões de decisão e aquelas barreiras de proteção com IA. É a resposta perfeita

[4:07] para, por exemplo, aprovar no automático os casos muito óbvios e reter só os cenários incertos paraa avaliação de um ser humano. Tópico quatro, os workflows prontinhos que já vem na API. Então, o ponto crucial aqui é para quem quer soluções instantâneas, sem precisar quebrar a cabeça escrevendo perguntas personalizadas. Tem end points que já fazem o trabalho pesado. Triagem de suporte para separar times e gravidade. Tem checagem de risco para impedir um agente de A de fazer besteira e bloquear ações na hora. Tem também. E até um roteador de LLM que avalia a complexidade de um pedido para acionar o modelo mais simples e barato possível. Isso derruba os custos absurdamente. E tem mais algumas predefinições fascinantes, viu? O filtro de contexto é sensacional para dar aquela limpada na memória dos agentes, avaliando rapidinho o que é redundante para evitar o inchaço de dados. Outros atalhos incríveis incluem a API de moderação de conteúdo focada em pegar assédio e toxicidade e um analisador de anúncios bem esperto. O mais legal é que todos esses end points

[5:09] operam de forma super segura, usando uma única chave de API de servidor, a JVline Live. Indo pro nosso último ponto, ecossistema de agentes e integrações. Desde setembro de 2026, a comunidade simplesmente abraçou isso de uma forma muito forte. Quem desenvolve já consegue acoplar o Jeff direto nos ambientes favoritos de trabalho. Dá para colocar no cloud code por meio de plugin, plugar maravilhosamente no cursor usando o protocolo MCP ou rodar por linha de comando no Open Code. Tem até ferramenta voltada para agentes específicos, como o roteador pro agente Pie. é levar aquele fuz if rápido e tipado nativamente para todo lado. Ah, e só para dar um gostinho prático de como esse modelo é eficiente e barato rodando no mundo real, a galera criou uma extensão de navegador chamada JVS. Ela usa o modelo para analisar as legendas e simplesmente pula cerca de 77% daquelas inserções chatas de patrocinadores em vídeos do YouTube. O custo de tomar essas decisões matemáticas no vídeo inteiro, frações de centavo custa 0.008.

[6:13] Vamos entender como tudo isso se constrói e gera uma estrutura hiper flexível de acesso. A gente não fica refém de uma porta de entrada só. Dá para usar as chaves hospedadas direto da TypeSFE AI, claro, mas também funciona fácil via Versal AI Gateway, Open Router e Cloudflare AI Gateway. E um lembrete sensacional. A cobrança final dos tokens de saída é zero. Eles são totalmente de graça. E já que tocamos em custos, é bom frisar o quanto modelo de cobrança deles ajuda a galera do código. Os tokens de entrada geram entre 25 e 42 centavos de dólar por cada milhão. E os créditos nunca expiram, sem prazo de validade. É um modelo financeiro que torna totalmente viável botar dezenas de milhares de microdecisões matemáticas rodando em larga escala todos os dias. No fim das contas, a grande provocação que fica é esta, olhando pros nossos próprios códigos hoje, que muitas vezes estão cheios daquelas lógicas hiper frágeis, blocos imensos e ingessados de se isso, então aquilo, o que a gente vai

[7:13] ser capaz de construir agora que dá para substituir isso por uma decisão de Iatipada, que roda em ínfimos 70 msundos e não custa quase nada. Pensem em onde isso se encaixa. O potencial dessa mudança de paradigma é gigantesco. Muito obrigado por acompanhar mais esta explicação de hoje e até a próxima.
