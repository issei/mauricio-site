# Dominando a Avaliação de IA: como analisar, validar e evoluir soluções inteligentes

Vídeo de Maurício Yokoyama Issei, publicado em 23 de janeiro de 2026 (6 min 33 s).
Assistir: https://www.youtube.com/watch?v=x-oKEMwdpng

Assuntos: [Dados e decisão](https://mauricio.issei.com.br/temas/dados-e-decisao)

## Sobre o vídeo

Neste vídeo, você vai entender como avaliar sistemas de Inteligência Artificial de forma estratégica e prática, indo muito além de métricas superficiais. Abordamos critérios técnicos, riscos, qualidade das respostas, confiabilidade e como transformar avaliação em vantagem competitiva.

Se você atua com tecnologia, dados, produtos digitais, arquitetura de soluções ou tomada de decisão, este conteúdo vai ajudar a elevar seu nível de análise e maturidade no uso de IA.

🔍 Você vai aprender sobre:

O que realmente importa na avaliação de soluções de IA
Como identificar limitações, vieses e riscos
Critérios práticos para medir qualidade, consistência e utilidade
Como usar avaliação para melhorar resultados e decisões
Visão estratégica para times técnicos e de negócio

#InteligênciaArtificial #IA #Tecnologia #AvaliaçãoDeIA #Dados #Inovação #ArquiteturaDeSoftware #TransformaçãoDigital

## Transcrição

_Transcrição automática, não revisada._

[0:00] Sabe, no mundo da inteligência artificial tem uma pergunta que não quer calar. Como a gente sabe se um modelo é bom de verdade? É um desafio e tanto. E é justamente sobre isso que a gente vai conversar hoje. Vamos mergulhar numa ferramenta do Google chamada steacks, que foi criada para ajudar a gente a avaliar os grandes modelos de linguagem, os famosos LLMs, de um jeito preciso, com base em dados de verdade. Olha, quem tá aí na lida desenvolvendo com IA conhece bem essa rotina. Você testa um prompt, a resposta vem, hum, parece bom e vida que segue. A gente pode chamar isso de forma descontraída de vibe check, aquela verificação na base da intuição, do sentimento. Mas a grande questão é como que a gente sai desse achismo e transforma essa sensação em algo concreto, em dados que a gente pode medir e repetir? E aí é que o desafio técnico aparece. Pensa só, um software tradicional, você dá uma entrada, ele te dá sempre a mesma saída. Comar não é bem assim. Os modelos são o que a gente

[1:00] chama de não determinísticos, ou seja, a mesmíssima pergunta pode gerar respostas diferentes a cada vez. E isso, claro, quebra completamente a lógica dos testes tradicionais, né? Aqueles que esperam um resultado certinho, fixo, eles simplesmente não servem para medir a qualidade de verdade. E essa frase aqui resume a filosofia por trás de tudo isso. A questão não é só correr atrás de uma nota alta num benchmark genérico, que muitas vezes não quer dizer nada. O verdadeiro objetivo é garantir que a IA funcione bem, de forma confiável para as pessoas que vão usar lá na ponta. É construir pensando nos usuários. Pois é. E é exatamente para resolver esse problema que o STEX aparece. É a ferramenta do Google desenhada para isso, para tirar a gente da intuição, do vibe check e nos levar para um lugar de precisão, de decisões baseadas em dados. O STEX organiza tudo num ciclo, um fluxo de trabalho bem redondinho e poderoso. Pensa assim, primeiro a gente experimenta, compara modelos, prompt, só para ter uma ideia do que tá funcionando melhor. Depois vem a parte da avaliação para valer, sabe? Deixar o achismo de lado e usar datasets estruturados e

[2:02] avaliadores customizados. E por fim, a análise, olhar os gráficos, os dados e aí sim tomar as decisões com segurança, tá? Mas e na prática, como é que esse ciclo funciona? Bom, tudo começa com o que a ferramenta chama de projeto de avaliação. Imagina que é como se fosse uma pasta, um espaço de trabalho para cada teste específico que você vai fazer. E dentro do STX, dá para seguir por dois caminhos principais. O primeiro é o de modelo único. Ele é perfeito para, sabe, estabelecer um ponto de partida, uma linha de base para entender a performance atual. Agora o outro é o lado a lado. Esse é o clássico teste A B. Você coloca dois modelos ou dois prompts um contra o outro com os mesmos dados e vê qual se sai objetivamente melhor. É uma comparação direta, certo? Mas todo projeto de avaliação precisa de combustível, né? E esse combustível são os dados. Não tem jeito. A qualidade da sua avaliação vai ser tão boa quanto a qualidade do seu dataset. Então vamos entender o que faz um dataset ser

[3:02] realmente bom. E olha, o segredo aqui não é ter um milhão de exemplos, mas sim os exemplos certos. Um bom dataset precisa ter de tudo um pouco. Tem que ter o caminho feliz, o uso comum, sabe? Mas também tem que ter os casos mais cabeludos, os Z cases e muito importante, os testes adversários. Tipo chegar para um chatbot de atendimento e pedir para ele escrever um poema. Como ele reage a isso? É testar os limites. No fim das contas, a qualidade dos exemplos vale muito mais que a quantidade. OK? Então, a gente já tem o projeto configurado e um dataset de qualidade. Mas, e agora, como é que a gente avalia centenas, talvez milhares de respostas sem enlouquecer? É aqui que entra uma ideia genial, usar um LLM como juiz. No STEX, eles chamam isso de autoators. A ideia é nossa, de uma simplicidade brilhante. Basicamente, se pega um modelo de a bem poderoso e se dá a ele o papel de juiz, ele vai olhar as respostas de outro modelo e dar uma nota com base numa lista de critérios bem

[4:04] claros. Isso isso permite escalar a avaliação de um jeito que seria impossível fazer manualmente. Simplesmente não dá para comprar. E para facilitar a vida, o Stax já vem com kit de avaliadores prontos para coisas mais comuns. Por exemplo, ele pode checar a fluência do texto, a segurança do chat ou se o modelo está obedecendo as instruções direitinho. São ótimos para dar aquele pontapé inicial e começar rápido. Mas aqui está o pulo do gato. Esses avaliadores padrão são bons, mas o poder de verdade aparece quando se criam avaliadores personalizados, porque aí dá para medir o que realmente importa para um produto específico. coisas únicas, como por exemplo, se a resposta está seguindo o tom de voz de uma marca. Isso um benchmark genérico, nunca vai dizer. E para criar um desses, o processo é bem direto. São três passos. Primeiro, se definem as regras do jogo, a rúbrica de avaliação lá no prompt. Segundo, se especifica como a resposta deve ser formatada para que o sistema entenda. E terceiro, o passo mais importante, calibrar. Se pega as notas do juiz robô e se compara com as notas que humanos de

[5:06] confiança deram. Se as notas estiverem batendo, pronto, o Auto Worter tá calibrado e pronto para trabalhar em escala. Beleza? Com todos esses componentes no lugar, a gente para de só coletar dados e começa de fato a tomar decisões. É a hora em que todo aquele trabalho duro se transforma em inteligência, em sites para poder lançar as coisas com mais confiança. E esse gráfico aqui mostra o resultado final de forma perfeita. Lembra do vibe check do acho que o modelo B é melhor? Acabou. Agora a gente tem um dado preto no branco. O modelo B teve uma nota de 0.92 em aderência à voz da marca contra 075 do modelo A. Fica óbvio qual versão escolher e é uma decisão que dá para defender com números. E no fim do dia é disso que se trata. É sobre parar de adivinhar e começar a decidir com base em dados. É sobre medir o que realmente faz a diferença para quem usa o produto. É sobre automatizar um trabalho que antes era manual e repetitivo. E o resultado de tudo isso é poder inovar

[6:07] mais rápido e lançar produtos de IA muito melhores de com uma confiança que antes não existia. Isso tudo nos deixa com uma pergunta bem interessante pro futuro, né? Se uma parte tão crítica como a avaliação de qualidade pode ser automatizada, o que acontece com o tempo e a energia das equipes de desenvolvimento que foram liberados? Onde é que a criatividade humana vai focar agora? Na próxima onda de inovação em IA.
