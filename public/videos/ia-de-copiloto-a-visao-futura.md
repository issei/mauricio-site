# IA  de Copiloto a Visão Futura

Vídeo de Maurício Yokoyama Issei, publicado em 8 de novembro de 2025 (7 min 8 s).
Assistir: https://www.youtube.com/watch?v=9bC8bzmhfTo

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

## 🤖 IA no Volante e o Futuro da Segurança Veicular: Entenda o Gemini no Google Maps e a Revolução ADAS!

Neste vídeo explicativo, mergulhamos nas inovações que estão transformando a mobilidade, desde a chegada do **Gemini como copiloto digital** no Google Maps até a importância crucial dos Sistemas Avançados de Assistência ao Motorista (**ADAS**) na segurança veicular.

Apesar da crescente oferta de tecnologia, muitos motoristas ainda sentem receio e insegurança em relação à condução autônoma, e nem sempre compreendem ou conseguem dominar o significado exato dos sistemas ADAS. Descubra como a indústria e a tecnologia estão trabalhando para superar essa barreira de confiança e acelerar um futuro de mobilidade mais segura e eficiente.

### 📚 Fontes e Referências:

As informações apresentadas neste vídeo foram baseadas nos seguintes excertos:

*   Excertos de "ADAS: por que motoristas não confiam nem usam a condução autônoma - Mobiauto".
*   Excertos de "Com Gemini, Google Maps usa Inteligência Artificial para revolucionar a navegação - AI Business Journal".
*   Excertos de "Como funciona o assistente de faixa de rodagem - Carglass® PT".
*   Excertos de "Como usar o Google Maps por voz no Gemini? | Software - TecMundo".
*   Excertos de "Google Maps agora deixa usar o Gemini para fazer perguntas durante a navegação".
*   Excertos de "Google Maps agora usa a IA Gemini como um copiloto inteligente para navegação".
*   Excertos de "Google Maps launches Gemini features, including landmark navigation".
*   Excertos de "Google Maps usará Gemini como copiloto na navegação - Tecnoblog".
*   Excertos de "Níveis da Direção Autônoma | MAPFRE BR".
*   Excertos de "O Google integra inteligência artificial ao Maps, aprimorando-o com orientação sem usar as mãos, informações de trânsito em tempo real e insights locais. - Metaverse Post".
*   Excertos de "POTENCIAL DE REDUÇÕES DE ACIDENTES DE TRÂNSITO E IMPACTO ECONÔMICO ATRAVÉS DA IMPLEMENTAÇÃO DE ITENS DE SEGURANÇA AUTOMO - Dialnet".
*   Excertos de "SISTEMA DE DETECÇÃO DE FAIXAS INTEGRADO EM VEÍCULOS DE PEQUENA ESCALA - BDM UnB".

## Transcrição

_Transcrição automática, não revisada._

[0:00] Vamos mergulhar na inteligência artificial que já tá transformando o jeito que a gente dirige. E não é coisa de filme de ficção científica, não. Tá acontecendo agora na tela do nosso celular e até no mecanismo que nos mantém seguros dentro da faixa. A Ia já assumiu um lugar no banco do passageiro e às vezes até no do motorista. Então, para começar, vamos falar de algo que tá no bolso de quase todo mundo, os aplicativos de navegação. Só que eles estão prestes a dar um salto gigantesco, a ficar muito, mas muito mais espertos. Pensa só na cena. Você tá dirigindo e em vez de só ouvir vira e à direita, você pudesse de fato conversar com seu GPS como se tivesse alguém ali do lado. Parece loucura. Pois é exatamente para lá que a gente tá indo. E a grande estrela dessa mudança toda é o Gemini. A inteligência artificial do Google. Ela tá sendo integrada diretamente no Maps e olha, isso muda completamente o jogo. O aplicativo deixa de ser só um guia e vira um verdadeiro copiloto digital. E essa ideia de copiloto não é por acaso.

[1:02] O próprio Google descreve a experiência mais ou menos assim. A sacada aqui não é só dar direções, sabe? É oferecer um assistente que entende o contexto e ajuda de verdade. E na prática, o que isso muda? Bom, é aqui que a coisa fica legal. Acabou aquela história de dar comando todo travado, sabe? Agora dá para fazer uma pergunta super complexa, tipo: "Acha aí um restaurante vegano barato na minha rota e que tenha estacionamento?" E a Iá, ela entende? Ou então, em vez daquela voz falando: "Vire em 300 m", ela pode dizer: "Vire à direita". Depois daquele restaurante famoso, usando o mundo real como referência. Bem mais humano, né? Ok. Então, o sofre no celular tá entendendo o que a gente fala. Legal. Mas isso levanta uma questão ainda maior. Como é que a máquina, o carro em si consegue ver e entender o mundo real? O asfalto, as faixas, os outros carros? Então, bora mergulhar na tecnologia que permite que os carros literalmente enxerguem o

[2:03] ambiente. É aqui que a gente começa a entender a mágica por trás de tudo isso. O nome dessa área é visão computacional. De forma bem simples, é a ciência de ensinar os computadores a haverem. É como a gente dar olhos e um cérebro visual pra máquina, permitindo que ela extraia informações úteis de qualquer imagem ou vídeo. Paraa gente entender como isso funciona, a gente precisa pensar da forma mais básica possível. Para um computador, uma foto não é um rosto ou uma estrada, é só uma grade gigante de pontinhos minúsculos, os famosos pixels. Cada um ali paradinho no seu lugar com uma coordenada exata. E a cor de cada um desses pontinhos é só um conjunto de números, uma combinação de vermelho, verde e azul. Então, no fim do dia, pra máquina, uma foto cheia de vida e detalhes é basicamente uma planilha de Excel gigante, cheia de números. É só isso. E é com essa planilha que ela tem que trabalhar, certo? Então, a grande pergunta é: como é que um carro pega essa planilha de números e transforma isso em uma informação útil, como, por

[3:04] exemplo, identificar as faixas da pista? Bom, não é um passe de mágica. é um processo, uma espécie de linha de produção de dados. Primeiro a câmera captura a imagem, depois rola um pré-processamento para dar uma limpada nos ruídos. Aí vem a segmentação, onde o sistema recorta as partes que interessam. Depois ele analisa as características desses recortes e finalmente classifica: "Ok, isso aqui é uma faixa, isso é asfalto, aquilo é outro carro". E pra tarefa de manter o carro na pista, o objetivo final de todo esse processo super complexo é, na verdade, bem simples. É só encontrar as linhas brancas ou amarelas e separar elas de todo o resto. O asfalto, as sombras, a sujeira, tudo isso é considerado ruído que precisa ser filtrado. E existe um truque de engenharia genial para facilitar isso, chamado de visão aérea. Pensa só, a câmera do carro vê a estrada em perspectiva, com as faixas parecendo que vão se juntar lá no horizonte. O software aplica uma transformação matemática que estica essa imagem fazendo parecer que estamos vendo a estrada de cima. E qual a mágica? As

[4:05] faixas se tornam linhas perfeitamente paralelas. E para um computador é muito, mas muito mais fácil detectar linhas paralelas. E o mais impressionante, toda essa matemática pesada não tá rodando num supercutador na nuvem, não. Tá tudo acontecendo ali dentro do carro em uma caixinha de hardware super poderosa como essa Zand Box. Tudo em tempo real, tomando decisões em frações de segundo. Beleza? Agora que a gente já sabe como o carro vê, vamos ver uma das aplicações mais comuns disso no nosso dia a dia, os sistemas avançados de assistência ao condutor ou ADAs, como são conhecidos. Aqui é bem importante a gente diferenciar dois sistemas que parecem iguais, mas não são. Um é o aviso de saída de faixa. Ele é passivo. Ele só apita ou vibra o volante se o carro começa a sair da pista. É um alerta. O outro é o assistente de permanência em faixa. Esse sim é ativo. Ele não só avisa, ele atua. Ele aplica uma pequena força no volante para trazer o carro de volta pro centro. E o fluxo de dados é bem direto. A câmera captura imagem, o

[5:08] processador, a Zedbox, analisa tudo, entende onde o carro está em relação às faixas e, se necessário, envia um comando para as unidades de controle do veículo, que são quem de fato controlam a direção. E aqui a gente vê a prova de que isso realmente funciona. Esse gráfico é onde um teste real e é fascinante. A linha de cima mostra o ângulo do volante. O carro meio que dançando na pista. Agora olha a linha de baixo. Cada pico verde desses é o sistema de assistência de faixa sendo ativado. E se a gente cruzar as informações é nítido. Toda vez que o carro chega perto da borda, o sistema entra em ação e corrige a direção lá em cima. É a tecnologia trabalhando ao vivo. Quando a gente junta todas essas peças do aplicativo de celular até o sistema do carro, uma imagem maior começa a se formar. A inteligência artificial está de fato redesenhando a nossa experiência de dirigir. E aqui está a grande conexão, o pulo do gato. O princípio por trás de tudo isso é o

[6:08] mesmo, reconhecimento de padrões. A mesma tecnologia base que permite ao Gemini no seu celular identificar um prédio para te dizer onde virar é a que permite ao seu carro identificar as faixas pintadas no asfalto. São aplicações diferentes, nascidas do mesmo conceito fundamental de IA. Mas é claro que essa estrada à frente não é perfeita. A visão computacional ainda tem desafios enormes. Chuva forte, neblina, neve, tudo isso pode cegar as câmeras. Dirigir na noite continua sendo um problema e claro, tem o fator humano, o trânsito é imprevisível. Uma mudança de faixa repentina, um cruzamento caótico. São situações complexas que ainda exigem muito da tecnologia. E isso tudo nos deixa com a pergunta pro futuro. A gente viu copilotos que conversam e carros que se corrigem sozinhos. A I já está, de certa forma com as mãos no volante. A questão agora é para onde essa estrada tecnológica vai nos levar? O que será que nos espera logo ali depois da próxima curva?
