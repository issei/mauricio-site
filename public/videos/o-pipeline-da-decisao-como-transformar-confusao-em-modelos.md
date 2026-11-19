# O Pipeline da Decisão: Como Transformar Confusão em Modelos Matemáticos e IA

O vídeo percorre o caminho da decisão computacional, do problema mal definido até a avaliação do modelo. Trata do solucionismo, da formalização do problema, das seis dimensões da qualidade de dados, da escolha de métricas de machine learning e do limite entre a decisão da máquina e o julgamento humano.

Vídeo de Maurício Yokoyama Issei, publicado em 19 de agosto de 2026 (8 min 21 s).
Assistir: https://www.youtube.com/watch?v=lhEdMm7qvAU

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## Onde os sistemas falham

O vídeo descreve o caminho da decisão computacional: sair de uma realidade caótica e desestruturada até a avaliação rigorosa de um algoritmo [00:00]. A pergunta inicial é por que sistemas complexos falham com tanta frequência, mesmo com investimentos grandes [00:21]. A resposta: a raiz do fracasso não está na programação, mas antes da primeira linha de código [00:43].

## A armadilha do solucionismo

O solucionismo é a pressa de construir soluções complexas antes de entender qual é o problema real [00:43]. Segundo o vídeo, falhas ligadas a esse erro de origem comprometem até 70% das iniciativas de TI [01:03].

Para evitar a armadilha, é preciso separar dois espaços [01:46]:

- o espaço do problema: o contexto prático, as dores das partes interessadas, as restrições e as causas-raiz [02:06];
- o espaço da solução: os algoritmos, o código e a arquitetura técnica [02:06].

Misturar os dois cedo demais gera sistemas que funcionam, mas não servem para nada na vida real [02:06].

## Formalizar o problema

A engenharia de problemas é a ponte entre os dois espaços [02:27]. O objeto central é o artefato de representação do problema [02:48]. Escrito numa linguagem declarativa, a Problem Specification Language, ele transforma intenções e necessidades humanas num objeto computacional, que pessoas e máquinas conseguem ler, auditar e verificar [02:48].

Com IA agêntica, essa fase usa vários agentes [03:09]:

- o agente estruturador traduz textos e narrativas num grafo ontológico inicial [03:09];
- o agente crítico procura vieses de confirmação, falhas de lógica e premissas não testadas [03:30].

O resultado é uma nota. Segundo o vídeo, o artefato só segue para o desenvolvimento se atingir 0,85 no índice de qualidade da formulação do problema (PFQI) [03:52]. A métrica pune a ambiguidade: termos vagos derrubam a nota [04:12].

## As seis dimensões da qualidade de dados

Um problema bem definido não adianta com dados ruins [04:12]. Para evitar o "lixo entra, lixo sai", o vídeo lista seis dimensões [04:33]:

- completude: sem campos vazios [04:33];
- consistência: sem conflito entre registros de bases diferentes [04:33];
- conformidade aos formatos especificados [04:33];
- integridade das relações entre as tabelas [04:33];
- precisão: o quanto os dados refletem a realidade [04:53];
- atualidade: se a informação ainda é relevante hoje [04:53].

Quando um modelo de machine learning é treinado com dados ruins, ele cristaliza os vieses da base [04:53]. Isso gera custos altos e riscos de regulação e compliance [05:15].

## Avaliar os modelos

Com dados bons e um problema validado, as métricas de machine learning julgam o modelo [05:37]. Elas se dividem em três famílias, conforme o objetivo [05:37]:

- classificação: prever a categoria de algo [05:37];
- regressão: prever um valor numérico contínuo [05:37];
- ranking: ordenar listas por relevância [05:37].

Na classificação, olhar só a acurácia engana quando os dados são desbalanceados, porque esconde falhas atrás de um percentual alto [05:59]. O F1 score corrige isso com a média harmônica entre a precisão e o recall [06:20].

Na regressão, a escolha entre o erro quadrático médio (MSE) e o erro absoluto médio (MAE) depende do impacto do erro no negócio [06:20]. O MSE eleva o erro ao quadrado e pune muito os erros grandes. O MAE trata todos os erros de forma linear [06:43]. A escolha deve refletir a aversão ao risco da organização [06:43].

## A fronteira entre pessoa e máquina

Agentes de IA e grandes modelos de linguagem funcionam por aproximação estatística [07:05]. Por melhores que sejam as respostas, eles não substituem o julgamento humano em escolhas morais e em limites éticos [07:26]. Ter uma pessoa para validar a decisão final é obrigatório [07:26].

A pergunta final: se um sistema calcula tudo de forma perfeita, mas não responde jurídica e socialmente pelas consequências, de quem é a decisão [07:47]? Para o vídeo, a estratégia, os compromissos e a consciência continuam sendo responsabilidade humana [07:47].

## Perguntas frequentes

### O que é solucionismo?

É a pressa de construir uma solução complexa antes de entender o problema real [00:43].

### Por que usar o F1 score em vez da acurácia?

Porque, com dados desbalanceados, a acurácia esconde falhas. O F1 score combina precisão e recall [06:20].

### Quando preferir MSE ou MAE?

Depende do impacto do erro: o MSE pune mais os erros grandes, e o MAE trata todos os erros de forma linear [06:43].

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Dados e decisão](https://mauricio.issei.com.br/temas/dados-e-decisao)

## Sobre o vídeo

Você já sentiu que sua equipe construiu a solução perfeita para o problema errado? Esse erro clássico, conhecido como solutioneering, é o que a Engenharia de Problemas veio resolver.
Neste vídeo, mergulhamos no Pipeline da Decisão, um processo sistemático e rigoroso que transforma situações reais ambíguas e "confusas" em artefatos computacionais de primeira classe, prontos para serem resolvidos por algoritmos de otimização ou agentes de Inteligência Artificial.
O que você vai aprender neste vídeo:
A Ponte entre Mundos: Como sair da linguagem natural (intrínsecamente ambígua) para a PSL (Problem Specification Language), uma sintaxe formal que computadores entendem.
O Ciclo de Vida da Formulação: Conheça as 4 macrofases essenciais:
Exploração: Descoberta e Enquadramento (Framing) para definir as fronteiras do que será resolvido.
Formalização: Engenharia de Objetivos e Estruturação, onde narrativas se tornam o Grafo do Problema (GP).
Verificação: A fase crítica de validação multidimensional (Semântica, Estrutural, Empírica, Decisória e por Stakeholders).
Interface: O handover seguro para o Espaço da Solução.
O Índice PFQI: Saiba como medir a qualidade de um problema antes de gastar um centavo na solução. Explicamos as dimensões de Completude, Consistência Lógica, Rastreabilidade e a temida Penalidade por Ambiguidade.
Arquitetura Agêntica: Como um ecossistema multiagente (com papéis como o Structurer e o Critic/Advogada do Diabo) pode acelerar a modelagem e identificar vieses de confirmação antes que eles causem prejuízos.
Para quem é este vídeo?
Engenheiros de Dados e Cientistas de Decisão.
Gestores de Projetos Complexos e Engenheiros de Requisitos.
Desenvolvedores de IA interessados em IA Agêntica e Governança.
Destaque Técnico: O objeto central da Engenharia de Problemas não é a realidade empírica bruta, mas o AR_P (Artefato de Representação do Problema) — um substrato ontológico, versionável e auditável que serve como o único benchmark estável para avaliar qualquer tecnologia de solução. 

#EngenhariaDeProblemas #PesquisaOperacional #InteligenciaArtificial #CienciaDaDecisao #AgentesIA #PFQI #PipelineDaDecisao

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olá, sejam muito bem-vindos a mais esta explanação. É um prazer enorme ter a companhia de todo mundo. Hoje a gente vai explorar passo a passo o pipeline completo da tomada de decisão computacional. Sabe aquela realidade super caótica, totalmente desestruturada do nosso dia a dia? Pois é, a ideia aqui é entender exatamente o caminho metódico que a gente precisa percorrer para sair desse caos até chegar de fato na avaliação rigorosa de um algoritmo. Para começar, vamos pensar de forma bem crítica sobre uma coisa. Por que sistemas tecnológicos altamente complexos falham com tanta, mas tanta frequência, mesmo com investimentos absolutamente massivos? Olha, a resposta para isso costuma surpreender. O grande gargalo sabe, a verdadeira raiz desses fracassos monumentais não tá na programação em si. Na verdade, a catástrofe acontece muito antes de uma única linha de código ser escrita ou de um servidor ser configurado. Loucura, né? Então vamos mergulhar nisso. Existe uma patologia muito séria que já é bem documentada na engenharia, chamada de solucionismo ou solucionirem. É

[1:02] basicamente aquela pressa, aquela vontade incontrolável de já sair arquitetando e construindo soluções complexas antes mesmo de estruturar ou entender qual é o problema real ali. É tipo colocar a carroça na frente dos bois. E para ter uma ideia do tamanho disso, estudos do setor mostram que falhas ligadas a esse erro de origem comprometem até 70% das iniciativas de TI. Isso custa bilhões todo ano para as organizações. É muito dinheiro jogado fora, desenvolvendo a ferramenta certa para dor errada. E para desvendar esse pipeline de ponta a ponta, a gente vai passar por cinco etapas bem claras. Primeiro, a armadilha do solucionismo. Depois, formalizando o problema. Em seguida, as dimensões da qualidade de dados. O quarto passo é a avaliação de modelos. E para fechar, a fronteira humano máquina. Então vamos lá paraa primeira etapa, a armadilha do solucionismo. Para lidar com as situações humanas que, vamos combinar, são super fluidas, caóticas e cheias de ambiguidades, a gente precisa estabelecer uma fronteira muito estrita e vital. De um lado da moeda, a gente

[2:04] tem o espaço do problema. Esse domínio foca puramente no contexto prático, nas dores dos stakeholders, naquelas restrições inegociáveis e nas verdadeiras causas raízes. Do outro lado e completamente separado, tá o espaço da solução. É aqui que habitam os algoritmos, o código, a arquitetura técnica de verdade. Tentar sobrepor ou misturar esses dois espaços cedo demais é o que cria na prática a armadilha do solucionismo. O resultado? Sistemas que rodam perfeitamente, mas que são totalmente inúteis na vida real. O que nos leva ao ponto dois, formalizando o problema. Mas então, como é que a gente conecta com segurança esses dois mundos tão diferentes? É aí que a engenharia de problemas entra como uma ponte estrutural. E o objeto central dessa transição mágica é o que a gente chama de artefato de representação do problema ou AARP. Usando uma linguagem declarativa bem específica, a Problem Specification Language, esse artefato pega todas aquelas intenções qualitativas e necessidades humanas e as

[3:05] transforma em um objeto computacional de primeira classe. Ou seja, não é só uma ideia no papel, é uma estrutura formal que não só os humanos, mas também as máquinas conseguem ler, auditar e verificar de forma puramente lógica. Agora, vé como isso escala com a inteligência artificial agêntica é simplesmente fascinante. A gente tem um ecossistema multiagente trabalhando ativamente junto nessa fase. De um lado, o agente estruturador ouve, traduz textos ou narrativas brutas para formar um grafo ontológico inicial. Só que ele não trabalha sozinho. Imediatamente entra em cena o agente crítico que atua como um verdadeiro advogado do diabo. O papel dele é caçar incansavelmente vieses de confirmação, falhas de lógica ou premissas que não foram testadas. É um embate construtivo entre agentes que é incrível de acompanhar. E o resultado dessas interações adversariais não é só qualitativo, ele gera uma pontuação rigorosa. 0,85. Esse é o score mínimo exigido no índice de qualidade de formulação do problema, o PFQi. O artefato só tem a permissão

[4:06] metodológica para seguir pro desenvolvimento de software se ele atingir essa nota. E o grande detalhe aqui é que essa métrica pune e pune pesado qualquer ambiguidade linguística. Se os termos forem vagos, a nota despenca. Simples assim. Parte três, as dimensões da qualidade de dados. Bom, com o problema formulado, com uma precisão impecável, a gente precisa focar no combustível disso tudo, os dados. Afinal, de nada adianta um problema bem definido rodando em dados ruins, certo? Para evitar aquela famosa armadilha do lixo entra, lixo sai, existem seis dimensões essenciais. A gente precisa garantir a completude, ou seja, sem campos vazios, a consistência, garantindo que registros em bases diferentes não tenham conflito, a conformidade aos formatos técnicos especificados e a integridade das relações entre as tabelas. E por fim, as dimensões mais práticas, a precisão que dita o quão bem os dados refletem a realidade lá fora e a atualidade para ter certeza de que a informação ainda é relevante hoje. E as consequências de ignorar ou subestimar a qualidade dos

[5:06] dados vão muito além de um relatório meio confuso no fim do mês. Quando a gente treina modelos de machine learning com dados ruins, a matemática simplesmente cristaliza os vieses que já existem na base, induzindo o algoritmo a erros absurdos. Na prática, isso se traduz em custos financeiros na casa dos bilhões e exposições gravíssimas perante regulações e compliance. O impacto pessoal é sistêmico. Vamos pra etapa quatro, avaliação de modelos. Transicionando agora pra fase de execução, vamos assumir que a gente tem dados maravilhosos e um problema validado. A partir daqui, as métricas de machine learning operam como juiz da situação. Mas como a gente escolhe esse juiz? Bom, as métricas são divididas de acordo com a meta matatemática final do algoritmo. A gente tem três famílias principais. Tem a classificação, que é quando a gente quer prever em qual categoria algo se encaixa, a regressão para prever um valor numérico contínuo e o ranking, que serve para ordenar listas com base na relevância. Olhando mais de perto pra família de classificação, o F1 Score merece muito destaque. Olha só, é

[6:08] super sedutor avaliar o modelo olhando só pros acertos gerais dele. [roncando] Mas num cenário onde os dados são altamente desbalanceados, olhar só para curarse é criar uma ilusão. Ela mascara falhas enormes debaixo de um falso sucesso de alto percentual. O F1 score corta isso pela raiz, calculando uma média harmônica super exigente entre a precisão e o recall. É o choque de realidade que a gente precisa. Então, o ponto crucial aqui é o alinhamento de risco. Na regressão, existe aquele embate clássico entre o erro quadrático médio, o MSE, e o erro absoluto médio, o MAI. E qual deles escolher? A resposta mora direto no impacto que aquele erro vai ter no negócio. O MSE, como ele leva ao quadrado, acaba punindo de forma gigantesca os erros que fogem muito do aceitável. Já o MAI trata todo o erro de forma mais linear e contínua. Por isso, a decisão técnica sobre o algoritmo precisa obrigatoriamente espelhar a aversão ao risco daquela organização. O que nos leva a nossa última parada, a parte cinco, a fronteira humano máquina.

[7:08] Ampliando um pouco a visão para fechar esse nosso pipeline, a gente precisa falar sobre os limites de tudo isso. É o ponto onde a Estatística Fria encontra a operação no mundo real. A premissa central é que os agentes de IA e os grandes modelos de linguagem rodam baseados em aproximação estatística. Ponto. Por mais brilhantes e articuladas que as respostas à máquina apareçam, elas são absolutamente incapazes de substituir o julgamento humano na hora de fazer tradeoffs morais ou decidir os limites éticos na vida real. Ter um humano inserido ativamente para validar a decisão final não é só recomendado, é absolutamente mandatório. E com isso a gente conclui essa nossa explanação imensamente profunda. Mas eu quero deixar uma provocação final, que é a indagação principal de toda a engenharia de problemas moderna. Se um sistema calcula tudo de forma perfeita, mas não consegue assumir de forma sóciojurídica responsabilidades e ramificações daquilo, afinal de contas, de quem é a procradade da decisão? Fica muito claro que mesmo que as metodologias de cálculo estejam totalmente automatizadas, a estratégia, os compromissos e a consciência continuam sendo uma responsabilidade 100% humana. Foi

[8:10] sensacional compartilhar esse tempo aqui com todo mundo. Espero que essa imersão no pipeline de decisão tenha sido super produtiva para valer. Até a próxima.
