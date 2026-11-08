# A Origem do Transformer: A Revolução que Criou a IA Moderna

Vídeo de Maurício Yokoyama Issei, publicado em 18 de março de 2026 (7 min 32 s).
Assistir: https://www.youtube.com/watch?v=tnYamlf86CQ

Assuntos: [Tecnologia e cultura](https://mauricio.issei.com.br/temas/tecnologia-e-cultura)

## Sobre o vídeo

Entenda de uma vez por todas a base da Inteligência Artificial Generativa. Da publicação do paper "Attention is All You Need" até os modelos de trilhões de parâmetros.
​Capítulos do Vídeo:
0:00 Introdução: A Origem do Transformer
1:00 O Gargalo Sequencial (O problema das RNNs)
1:34 A Nova Arquitetura: Atenção é tudo!
3:10 O Poder da Escala e a Lei de Potência
4:28 Limites, Sucessos e Falhas da IA
5:00 Conclusão: Inteligente ou apenas maior?

https://arxiv.org/abs/1409.0473 

https://arxiv.org/abs/1512.03385 

https://arxiv.org/abs/2001.08361 

https://arxiv.org/abs/2203.15556 

https://arxiv.org/abs/2302.13971 

https://arxiv.org/abs/2303.08774 

https://arxiv.org/abs/2003.04887 

https://arxiv.org/abs/2302.03985 

https://arxiv.org/abs/2403.17887 

https://arxiv.org/abs/2405.21060 

https://arxiv.org/abs/2402.02622 

https://arxiv.org/abs/2404.06395 

https://arxiv.org/abs/2411.07501 

https://arxiv.org/abs/2009.03300 

https://arxiv.org/abs/2103.03874 

https://arxiv.org/abs/2110.14168 

https://arxiv.org/abs/2210.03057 

https://arxiv.org/abs/2211.05102 

https://arxiv.org/abs/2412.19437 

https://arxiv.org/abs/2501.18795 

https://arxiv.org/abs/2502.16982 

https://arxiv.org/abs/2503.04598 

https://arxiv.org/abs/2505.19488 

https://arxiv.org/abs/2506.22696 

https://arxiv.org/abs/2510.26692 

https://arxiv.org/abs/2512.24880 

https://arxiv.org/abs/2601.00417 

https://arxiv.org/abs/2601.05732 

https://arxiv.org/abs/2601.19895 

https://arxiv.org/abs/2601.21582 

https://arxiv.org/abs/2602.08064 

https://arxiv.org/abs/2602.09009 

https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf 

https://proceedings.mlr.press/v119/katharopoulos20a.html 

https://proceedings.mlr.press/v139/schlag21a.html 

https://aclanthology.org/N18-1202/ 

https://aclanthology.org/2019.iwslt-1.17/ 

https://aclanthology.org/2024.findings-acl.671/ 

https://aclanthology.org/2025.acl-long.1375/ 

https://zhuanlan.zhihu.com/p/2010852389670908320 

https://doi.org/10.48550/arXiv.2405.21060 

https://doi.org/10.1162/neco.1991.3.1.79

## Transcrição

_Transcrição automática, não revisada._

[0:00] Sabe esses modelos de EA que estão mudando o nosso mundo, tipo o chat GPT? Bom, eles não surgiram do nada, né? Eles são resultado de uma revolução na arquitetura, uma ideia que mudou absolutamente tudo. Hoje a gente vai contar a história de origem dessa ideia, arquitetura Transformer. Pra gente entender essa revolução toda, primeiro a gente precisa entender qual era o problema. A grande questão que segurava os modelos antigos de A era essa. Como é que eles poderiam entender o contexto de uma frase inteira, principalmente uma frase longa, sem se perder no meio do caminho? A nossa jornada hoje começa com o gargalo sequencial, que era o problema que travava ia. Depois a gente vai ver a revolução transformer, a solução genial para quebrar esse gargalo. Daí vamos explorar o poder da escala e os limites e habilidades que nasceram dessa nova era. Vamos ver como o foco mudou para modelos. mais inteligentes, não maiores. E por fim, vamos mergulhar num mistério bem recente, o fantasma na máquina. Vamos lá. Tudo começa com uma limitação.

[1:02] Antes de 2017, o jeito que a I de linguagem processava texto criava um problema fundamental, um verdadeiro gargalo mesmo. Pensa assim, se uma pessoa lêu uma frase palavra por palavra, quando chega no final de um parágrafo enorme, pode ser que já tenha esquecido os detalhes do começo. Pois é, os modelos de a tinham exatamente o mesmo problema. Um artigo de 2014 identificou isso perfeitamente, dizendo que comprimir toda a informação de uma frase num vetor de comprimento fixo é um gargalo. O modelo simplesmente perdi o contexto. E então, em 2017, veio a virada de chave, um projeto de arquitetura totalmente novo que abandonou de vez essa abordagem sequencial. A audácia dessa proposta é o que a torna tão incrível. Essa citação do artigo original é praticamente uma declaração de guerra contra o jeito antigo de fazer as coisas. Eles não estavam só melhorando uma técnica, eles estavam jogando tudo fora e começando do zero com uma única ideia central, a atenção. E aqui está. Este é o diagrama do artigo que mudou tudo. Pode parecer

[2:04] complexo, cheio de caixinhas, mas a ideia central é de uma simplicidade genial. À esquerda tem o encoder, que lê e entende a entrada, e à direita o decoder, que gera a saída. A mágica de verdade, no entanto, tá no que acontece dentro deles. O coração do Transformer é a autoatenção. Em vez de ler palavra por palavra, o modelo olha para todas as palavras da frase ao mesmo tempo. Ele aprende a criar conexões entre elas, decidindo quais são mais importantes umas para as outras. E a atenção multicabeça é como dar ao modelo vários pares de olhos para que ele possa analisar essas relações de diferentes ângulos, tudo de uma vez. O gargalo sequencial tinha sido quebrado. Então o pulo do gato é este. Essa tabela mostra porque a alta tensão foi um divisor de águas. Para um modelo antigo conectar a primeira e a última palavra de uma frase, o sinal tinha que passar por n passos. Com alta atenção, esse número de passos é constante, apenas um. Isso não só resolve o problema de memória, como também torna o processo massivamente

[3:05] paralelizável, o que permite treinar modelos muito maiores e muito mais rápido. Com essa nova arquitetura super poderosa em mãos, a comunidade de pesquisa entrou numa nova fase. A pergunta mudou de como a gente pode construir um modelo melhor para o que acontece se a gente simplesmente deixar este modelo gigante? Em 2020, os pesquisadores descobriram algo surpreendente. As leis de escala. Basicamente eles viram que se aumentassem o tamanho do modelo, a quantidade de dados e o poder de computação, o desempenho melhorava de forma previsível. Era quase como uma lei da física paraa inteligência artificial, mas era simplesmente melhor. E quando a gente fala em escala, estamos falando de números astronômicos. Modelos como o lama, por exemplo, foram treinados com mais de um trilhão de tokens, que são pedacinhos de palavras. A quantidade de informação processada é algo que a gente mal consegue imaginar. Mas aí uma coisa curiosa aconteceu. Os pesquisadores descobriram que não era só sobre tamanho bruto. Este slide mostra

[4:07] isso de forma brilhante. O modelo lama com apenas 13 bilhões de parâmetros superou o GPT3 de 175 bilhões de parâmetros em muitas tarefas. Isso provou que a qualidade dos dados e um treinamento mais longo e eficiente podiam ser mais importantes do que só o número de parâmetros. Essa era da escala acabou revelando tanto as falhas quanto os sucessos inesperados da arquitetura Transformer. A gente descobriu onde ela tropeçava e onde ela mostrava habilidades que ninguém esperava. E aqui está o primeiro lado da moeda. Em 2021, um estudo sobre resolução de problemas de matemática descobriu que a força bruta não estava funcionando. Simplesmente deixar os modelos maiores não os tornavam muito melhores em raciocínio complexo. Havia um limite pro que a escala pura conseguia fazer. E este é o outro lado. Ao ensinar os modelos a pensar passo a passo, uma técnica chamada cadeia de pensamento, eles de repente desenvolveram habilidades de raciocínio

[5:09] impressionantes. E o mais surpreendente é que essa habilidade se estendeu a idiomas com poucos recursos nos quais o modelo mal tinha sido treinado, o que sugere que ele estava aprendendo algo muito mais fundamental do que apenas padrões de linguagem. Essas descobertas levaram a uma nova mudança. O foco da pesquisa de ponta agora está se movendo da escala pura para a elegância e eficiência da arquitetura. A pergunta passou a ser: Como podemos refinar o projeto original? O que vemos aqui é uma enchurrada de inovações recentes. Não precisamos entrar em todos os detalhes, mas a ideia principal é clara. Os pesquisadores estão refinando o projeto original de 2017. Estão encontrando maneiras de obter mais desempenho com menos parâmetros. tornando peças centrais, como memória e atenção, muito mais eficientes. E isso nos leva à fronteira do nosso conhecimento. Há uma descoberta recente, que é tão profunda quanto misteriosa e que nos faz questionar o que realmente entendemos sobre essas redes. Este título provocativo de um artigo de 2024 já

[6:10] prepara o terreno perfeitamente. Pesquisadores decidiram investigar como o conhecimento é distribuído dentro de um modelo Transformer. E o que eles encontraram foi desconcertante. O experimento foi simples, mas poderoso. Pegaram um modelo de linguagem totalmente treinado, removeram um bloco enorme de camadas bem do meio, em alguns casos até metade da rede inteira, e depois fizeram só um pequeno ajuste fino para curar as conexões que foram quebradas. O resultado, o desempenho do modelo em tarefas de conhecimento quase não mudou. A implicação disso é chocante. Por anos, a gente assumiu que o conhecimento se distribuía por toda a profundidade da rede, mas este experimento sugere que a maior parte do conhecimento factual de um modelo talvez esteja concentrada nas camadas iniciais. As camadas mais profundas podem estar fazendo algo completamente diferente, algo que, pelo visto, é em grande parte dispensável. Isso nos deixa com esta pergunta final que é bem profunda. A arquitetura que começou como uma solução elegante para um gargalo técnico evoluiu

[7:11] para algo cujos mecanismos internos a gente ainda está só começando a desvendar. Se uma parte enorme do modelo pode ser removida sem apagar o seu conhecimento, a nossa compreensão de como essas mentes digitais guardam informação pode estar errada. E isso abre um capítulo totalmente novo na história de origem do Transformer.
