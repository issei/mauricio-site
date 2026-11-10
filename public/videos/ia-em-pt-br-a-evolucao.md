# IA em PT BR  A Evolução

Vídeo de Maurício Yokoyama Issei, publicado em 29 de outubro de 2025 (7 min 29 s).
Assistir: https://www.youtube.com/watch?v=QFkF_WqgZ1Q

Assuntos: [Tecnologia e cultura](https://mauricio.issei.com.br/temas/tecnologia-e-cultura)

## Sobre o vídeo

Este vídeo apresenta um panorama abrangente e atualizado sobre as **principais pesquisas em Inteligência Artificial (IA)** e **Processamento de Linguagem Natural (PLN)** realizadas no Brasil — com foco em **modelos de linguagem em português**, **aplicações jurídicas**, **multimodalidade**, **segurança de redes** e **engenharia de machine learning**.

🔹 **1. Modelos de Linguagem de Grande Escala (LLMs) em Português**
Exploramos a evolução dos principais LLMs para o PT-BR — como **BERTimbau**, **GPorTuguese-2**, **Amadeus-Verbo30**, **Mambarim-110M** e **GAIA** — destacando estratégias de *fine-tuning*, transferência de conhecimento entre línguas e desafios ligados à morfologia complexa do português.

🔹 **2. IA no Domínio Jurídico**
A IA já transforma o Judiciário brasileiro. Casos reais incluem:

* **Classificação de petições jurídicas**, com resultados de até **97,2% de acurácia**.
* Comparativos entre **BERT** e **ChatGPT** no reconhecimento de entidades nomeadas, revelando que modelos ajustados com dados jurídicos superam os generalistas.
* Uso de **agentes inteligentes** e **LLMs avançados** (GPT-4o, Gemini 2.0 Flash) na **mineração de processos judiciais**, ampliando o acesso e a eficiência.

🔹 **3. Multimodalidade, Semântica e Vieses**
A pesquisa do **Framed Multi30k (FM30K)** amplia o dataset multimodal *Flickr30K* com **descrições em português brasileiro**, incorporando informações semânticas baseadas na **FrameNet Brasil**.
O estudo revela como descrições textuais podem introduzir **vieses étnico-raciais e de gênero**, reforçando a importância da anotação **perspectivista** e ética em datasets de IA.

🔹 **4. Redes e Segurança**
Avanços em:

* **5G e NFV-MEC**, com estratégias de *Deep Reinforcement Learning* para otimizar *handover* em UAVs.
* **Segurança digital**, com *Web Application Firewalls (WAFs)* baseadas em *Machine Learning* que reduzem variáveis em até **90%** sem perda significativa de desempenho.
* **Smart Grids**, onde o uso do **Filtro de Kalman** melhorou a relação sinal-ruído em até **60%**, mostrando a eficácia da IA em comunicações críticas.

🔹 **5. Outras Aplicações Relevantes**

* **Detecção de Fake News:** modelos híbridos (TF-IDF + BERT) e análise de viés político aumentam a acurácia em até **29%**.
* **Otimização de custos em Cloud Computing:** análise multi-nuvem (AWS, Azure, GCP) mostra padrões de precificação dinâmicos.
* **Seleção de atributos (Feature Selection):** método robusto e escalável reduz dimensionalidade em **81,5%**, acelerando o processamento em até **3,8x**.
* **Critérios de Aceitação e UX:** LLMs (ChatGPT 4.0 e Gemini 2.5 Flash) auxiliam na validação de critérios de experiência do usuário.
* **Reconhecimento de Texto Manuscrito:** o modelo **DANCER**, com arquitetura encoder-decoder, elimina a necessidade de segmentação e acelera o treinamento.

💡 **Em resumo:** o ecossistema brasileiro de IA está em plena expansão, equilibrando **inovação tecnológica**, **responsabilidade ética** e **otimização de recursos** — com destaque para soluções em português e aplicações práticas em diversos domínios.

🔗 **Fontes e Referências (seleção):**

* *Large Language Models in Brazilian Portuguese: A Chronological Survey* – DOI: 10.5753/jbcs.2025.5789
* *Classificação de Petições Jurídicas – USP*
  [https://bdta.abcd.usp.br/directbitstream/10cbe4f4-36c7-4c97-bd82-1477ec3348b4/Kelsen%20Henrique%20Rolim%20dos%20Santos.pdf](https://bdta.abcd.usp.br/directbitstream/10cbe4f4-36c7-4c97-bd82-1477ec3348b4/Kelsen%20Henrique%20Rolim%20dos%20Santos.pdf)
* *Comparação BERT x ChatGPT no domínio jurídico*
  [https://journals-sol.sbc.org.br/index.php/reic/article/download/3903/3254/29043](https://journals-sol.sbc.org.br/index.php/reic/article/download/3903/3254/29043)
* *Tese: Framed Multi30k (UFJF)*
  [https://www2.ufjf.br/ppglinguistica/wp-content/uploads/sites/119/2025/03/Marcelo.pdf](https://www2.ufjf.br/ppglinguistica/wp-content/uploads/sites/119/2025/03/Marcelo.pdf)
* *Amadeus-AI Official (Repositório PT-BR LLMs)*
  [https://github.com/Amadeus-AI-Official/pt-br-llms](https://github.com/Amadeus-AI-Official/pt-br-llms)

📘 Este vídeo faz parte de uma série sobre **IA, Linguagem Natural e Inovação Tecnológica** — mostrando como o Brasil avança na criação de soluções próprias e na integração ética da inteligência artificial em múltiplos setores.

#InteligenciaArtificial #LLM #ProcessamentoDeLinguagemNatural #Tecnologia #Pesquisa #Brasil #Inovação #AI #MachineLearning #CiênciaDeDados #Português #ChatGPT #BERT #AmadeusAI

## Transcrição

_Transcrição automática, não revisada._

[0:00] Fábio, a gente ouve muito sobre a revolução da inteligência artificial, né? E parece que ela fala principalmente inglês, mas e o nosso português. Nessa análise, vamos mergulhar fundo para entender se a gente tá só traduzindo o que vem de fora ou se estamos de fato criando uma IA com o nosso sotaque, com a nossa cara. Pois é, essa é a pergunta que tá no centro de tudo. Será que estamos só na arquibancada assistindo a essa revolução acontecer em outra língua? Ou será que estamos no campo construindo uma inteligência que realmente entende a nossa cultura, as nossas gírias e todas as nossas complexidades? E pra gente ter uma ideia do tamanho desse desafio, olha só, isso é literalmente uma história de Davi contra Golias. A quantidade de dados, de textos, de recursos disponíveis em inglês é simplesmente colossal comparada ao que a gente tem em português. É exatamente nesse cenário que os nossos pesquisadores e desenvolvedores estão trabalhando. OK? Antes da gente mergulhar de cabeça, vamos só alinhar os ponteiros. Quando a gente fala de LLMs

[1:03] ou modelos de linguagem de grande porte, estamos falando desses gigantes, tipo o chat GPT, que todo mundo conhece. Eles são treinados com uma quantidade absurda de texto, o que dá a eles essas habilidades impressionantes de entender e até de gerar linguagem. E pra gente não se perder nessa história, aqui tá o nosso mapa. A nossa jornada tem três momentos chave. Primeiro, vamos ver como a gente ensinou a Iá a entender o português. Depois como a gente deu um passo além e ensinou ela a criar no nosso idioma. E por fim, vamos dar uma espiada no que o futuro reserva. Beleza? Então, bora começar essa viagem. Tudo começa com o básico, o fundamental, fazer a máquina de fato compreender o nosso idioma de forma profunda. Imagina só, lá em 2020, o cenário era basicamente um campo aberto, um desafio gigantesco e pouquíssimos recursos. Para começar a diminuir essa distância pros modelos em inglês, os pesquisadores precisavam de uma base, de uma primeira ferramenta confiável. E essa primeira

[2:03] ferramenta foi a arquitetura que a gente chama de apenas encoder. Pensa nela como um especialista em leitura, um verdadeiro detetive de texto. A função principal dela não é escrever, mas sim pegar um texto, analisar e entender o que tá ali, o que significa classificando informações ou identificando nomes de pessoas, lugares, empresas. E essa arquitetura deu vida a modelos pioneiros super importantes. O Bertimbal, por exemplo, virou uma espécie de padrão de qualidade, mas o mais legal foi a especialização. Começaram a surgir modelos como Bbert PT pra área médica e o Petrobert pra indústria de óleo e gás. Isso mostrou o poder de treinar uma IA focada em um nicho específico do Brasil. E o resultado foi impressionante. Aquela apsta modelos monolíngues, ou seja, treinado só em português, se mostrou certeira. Eles não só funcionavam bem, como muitas vezes superavam os modelos gigantes que eram treinados em várias línguas ao mesmo tempo. Era prova de que a especialização, o foco total no nosso

[3:04] idioma, com todas as suas manhas e jeitinhos, estava vencendo a força bruta. E a partir daí, bom, a porteira abriu. O que a gente vê é uma verdadeira explosão. Esse slide aqui mostra isso de um jeito fantástico. De um a dois modelos importantes em 2020, a gente salta para uma variedade incrível de projetos hoje. A comunidade brasileira de a entrou em ebulição. Essa explosão toda nos leva direto pra segunda parte da nossa jornada. O jogo mudou. Não bastava mais só entender um texto. Chegou a hora de começar a criar. É aqui que a tecnologia dá outro salto. Se antes a gente tinha o leitor especialista, agora surge o escritor criativo. A diferença, como a gente vê aqui, é fundamental. A primeira arquitetura, o encoder, analisa o que já existe. A segunda, o decoder, gera coisas novas. É essa tecnologia que tá por trás dos chatbots e das ferramentas de escrita que a gente usa hoje. E essa nova arquitetura, a Apenas Decoder, se tornou a grande estrela da nova era dos

[4:05] LLMs. A especialidade dela é justamente essa, pegar uma instrução, um pedaço de frase e a partir daí gerar um texto completamente novo, coerente e muitas vezes bem criativo. Com essa tecnologia nasceu uma nova geração de modelos brasileiros. A família Sabiá virou uma grande referência, estabelecendo novos recordes de performance e vários outros projetos, como o Open Cabrita e o Amadeus Verbo, começaram a explorar essa capacidade de gerar texto em uma escala cada vez maior. E quando a gente fala em larga escala, olha só esse número, 72 bilhões de parâmetros. Só para se ter uma noção, isso mostra o salto gigantesco em complexidade e em poder de fogo que esses novos modelos brasileiros alcançaram. Definitivamente não estamos mais falando de projetos pequenos. Beleza? Isso tudo nos traz para o agora e, claro, para o futuro. O que a gente aprendeu com toda essa evolução e mais importante, para onde estamos indo a partir daqui? Aqui tá o ponto principal,

[5:05] a grande virada da história. Aquele desafio que parecia intransponível no começo está sendo superado. A comunidade brasileira conseguiu não só criar seus próprios modelos, mas fazer com que eles compitam de igual para igual. e em alguns casos até superem os modelos globais em tarefas específicas do nosso contexto. A aposta na IA brasileira valeu muito a pena. Tá, mas qual é o segredo? Então, existe uma receita de bolo para criar uma Iá brasileira de ponta. Esse slide aqui é tipo livro de receitas dos nossos pesquisadores. Ele mostra os ingredientes técnicos que eles têm combinado para chegar nesses resultados, desde o tipo de otimizador que guia o aprendizado até a forma como o modelo entende a ordem das palavras. Que tal um pequeno desafio para colocar esse conhecimento em prática? Vamos imaginar três situações do dia a dia. A ideia é pensar em qual tipo de arquitetura seria a ferramenta ideal para cada um desses trabalhos. As missões são as seguintes: primeira, organizar uma montanha de documentos de um escritório de advocacia. Segunda, criar as respostas de um chatbot de

[6:06] atendimento. E terceira, reescrever a mesma frase de várias formas diferentes. E aí, qual ferramenta para cada tarefa? E aqui estão as respostas. Para classificar textos, a melhor pedida é o nosso leitor especialista, apenas encoder. Para gerar conversas, sem dúvida, o nosso escritor criativo, apenas decoder. E para parafrasear, a gente usa uma combinação das duas: arquitetura encoder decoder, que funciona como um tradutor, transformando uma entrada em uma nova saída. Mas o mais empolgante é que essa jornada tá longe de acabar. Como a própria pesquisa aponta, não existe uma fórmula mágica, uma receita definitiva. O campo continua super aberto, com espaço enorme para experimentar, otimizar e descobrir jeitos ainda melhores de treinar esses modelos. Isso nos deixa com uma pergunta no ar, né? Se essa receita ideal para a IA brasileira ainda está sendo escrita em tempo real, qual será o próximo ingrediente? Serão dados de melhor qualidade, uma arquitetura nova ou uma aplicação em uma área que a gente nem

[7:07] imaginou ainda. E para quem curtiu o assunto e quer continuar acompanhando essa saga de perto, existe um repositório online que funciona como um mapa vivo agregando todos esses projetos. Fica a dica para explorar e ver o progresso da inteligência artificial no nosso idioma. Obrigado por nos acompanhar nesta análise e até a próxima.
