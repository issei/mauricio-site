# AWS GLUE: Otimize seus Jobs Spark e Reduza Custos (Guia Prático para Iniciantes)

O vídeo é um guia para quem começa no AWS Glue: quando escolher o Glue em vez do Amazon EMR, como configurar o job (tipo de worker e classe de execução), como investigar a performance no CloudWatch e na interface do Spark, e como reduzir o shuffle com filtros, cache, mais recursos e Adaptive Query Execution.

Vídeo de Maurício Yokoyama Issei, publicado em 18 de novembro de 2025 (7 min 49 s).
Assistir: https://www.youtube.com/watch?v=coZ5-yXfMRE

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## Onde o Glue se encaixa

O vídeo é um guia prático para quem começa no AWS Glue e quer jobs Spark eficientes desde o primeiro dia [00:00].

Para um projeto de ETL rápido, sem gerenciar servidor, o Glue é a escolha. O Amazon EMR é um canivete suíço para big data: mais poderoso e flexível, mas mais trabalhoso de configurar [00:00]. Para começar, o Glue é o caminho mais simples [00:21].

O roteiro: o que é o Glue, a configuração do primeiro job, a investigação de performance, as otimizações e as boas práticas [00:42].

O AWS Glue é um serviço de integração de dados totalmente gerenciado e serverless. A AWS cuida da infraestrutura, e a equipe foca em preparar e combinar os dados para análise [01:04].

## Configurar o primeiro job

A configuração tem quatro passos [01:24]:

1. Definir as propriedades gerais do job [01:45].
2. Escolher o tipo de worker [01:45].
3. Definir os parâmetros do job [01:45].
4. Escolher a classe de execução, que afeta o custo e o tempo de início [01:45].

A decisão mais crítica é o tipo de worker: ele define a performance e o custo do job, como o motor de um carro [02:06].

Os tipos formam uma escada de potência. O G.1X serve para transformações e consultas comuns; o G.2X é o meio-termo, com bom custo-benefício para a maioria dos trabalhos [02:06]. Para agregações e joins complexos, sobe-se para os tipos maiores, com mais vCPUs e memória para processar em paralelo [02:29].

A classe de execução é a outra decisão [02:50]:

- Standard: o job começa rápido, com recursos dedicados, para tarefas críticas [02:50].
- Flex: a opção mais econômica, para jobs sem pressa, como um lote de madrugada em que o tempo de início pode variar [02:50].

## Investigar a performance

Com o job rodando, a pergunta é se ele roda bem [03:11]. Se está lento ou falhando, por onde começar? [03:32]

Há dois painéis. O Amazon CloudWatch é o termômetro: dá a visão geral e mostra se algo está errado [03:32]. A interface do Spark é o raio X: é nela que se acha a causa [03:54].

No CloudWatch, a métrica-chave é a de bytes escritos no shuffle. Um valor alto indica que o job gasta muito tempo reorganizando dados entre as máquinas, uma operação cara que move muitos dados pela rede e aparece em joins e agrupamentos [03:54].

Na interface do Spark, a aba Jobs mostra cada etapa. Procure etapas que demoram muito ou tarefas que falharam: são as suspeitas de gargalo [04:16].

A aba Executors mostra o poder de processamento do cluster. A coluna Cores diz quantas tarefas rodam em paralelo [04:37].

## Otimizar

O shuffle é quase sempre o vilão da performance no Spark. É como organizar um baralho de milhões de cartas espalhado por várias mesas; minimizar o shuffle é o segredo [04:59].

A primeira estratégia ataca os joins, uma das causas mais comuns de shuffle [05:20]:

- Filtrar linhas e colunas desnecessárias antes do join [05:20].
- Guardar em cache, na memória, o conjunto de dados usado várias vezes, para o Spark não recalcular [05:43].

A segunda estratégia é dar mais recursos ao job: aumentar o número de workers, escolher um worker maior ou, melhor, ativar o Auto Scaling, que adiciona e remove recursos conforme a necessidade [05:43].

As versões mais novas do Spark trazem a Adaptive Query Execution (AQE), que otimiza o job durante a execução e lida com o desbalanceamento de dados (data skew), quando um worker fica sobrecarregado e os outros esperam [06:26].

## Checklist

O fluxo resumido [06:48]:

1. Configure: escolha o worker certo para a carga [06:48].
2. Monitore: CloudWatch para a visão geral, interface do Spark para o diagnóstico [06:48].
3. Identifique os gargalos: etapas lentas e shuffle alto [07:09].
4. Otimize: filtre cedo, use cache e aumente os recursos se precisar [07:09].
5. Automatize: use o Auto Scaling e a Adaptive Query Execution [07:09].

A provocação final: otimizar para os dados de hoje é uma coisa; e quando o volume crescer 100 vezes? Pensar em escala desde o início é o que diferencia um bom trabalho [07:09].

## Perguntas frequentes

### Qual configuração mais pesa no custo de um job do Glue?

O tipo de worker. Ele define a potência do job e, com isso, a performance e o custo [02:06].

### Como saber se o shuffle é o problema?

No CloudWatch, pela métrica de bytes escritos no shuffle. Se ela estiver alta, o job está movendo muitos dados entre as máquinas [03:54].

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Cloud e confiabilidade](https://mauricio.issei.com.br/temas/cloud-e-confiabilidade), [Dados e decisão](https://mauricio.issei.com.br/temas/dados-e-decisao)

## Sobre o vídeo

Pare de gastar dinheiro à toa com jobs lentos no AWS Glue! 💸 Neste guia prático e direto ao ponto, você vai aprender o passo a passo para otimizar seus Jobs Spark no AWS Glue, garantindo mais performance e menos custos na sua arquitetura de dados.

Se você está começando com AWS Glue e Apache Spark, ou se seus jobs estão demorando mais do que deveriam, este vídeo é para você! Desvendamos o processo de otimização de jobs Spark em 5 etapas simples, ideal para iniciantes que querem construir pipelines de dados eficientes e escaláveis.

O que você vai aprender:

1. Configuração Essencial: Entenda a diferença entre AWS Glue e Amazon EMR e como a escolha correta do Tipo de Worker e da Classe de Execução impacta diretamente no seu custo e performance.

2. Monitoramento de Performance: Saiba como usar o AWS CloudWatch e a UI do Apache Spark para identificar os verdadeiros gargalos dos seus jobs, como o temido shuffle de dados.

3. Estratégias de Otimização: Descubra técnicas avançadas, mas fáceis de aplicar, como filtrar dados antes de joins, usar cache de forma inteligente e a importância da Execução Adaptativa de Consultas (AQE) do Spark.

4. Escalabilidade e Automação: Aprenda a escalar seus recursos manualmente ou via Auto Scaling para lidar com diferentes volumes de dados.

Este vídeo é perfeito para:

• Engenheiros de Dados iniciantes.

• Desenvolvedores que trabalham com AWS Glue.

• Qualquer pessoa que queira reduzir a fatura da AWS otimizando o uso do Spark.

Não perca tempo com jobs ineficientes! Assista agora e transforme a performance dos seus pipelines de dados!

#AWSGlue #SparkOptimization #DataEngineering #CloudComputing #ApacheSpark

## Transcrição

_Transcrição automática, não revisada._

[0:00] E aí, para quem tá começando no AWS Glue e quer garantir que os Jobs Spark rodem lisinho desde o começo, este é o lugar certo. Hoje a gente vai mergulhar num guia bem prático para otimizar tudo desde o primeiro dia. Bora lá. Bom, antes de mais nada, é bom a gente entender onde o Glu se encaixa nesse mundão da WS, né? Pensa assim: se o que se precisa é de algo rápido para um projeto de ETL, sem aquela dor de cabeça de gerenciar servidor, o Glue é a pedida. Agora o Amazon é MR. Ah, ele é tipo um canivete suíço para big data. Super poderoso, flexível, mas dá um pouquinho mais de trabalho para configurar. Então, para começar, o Glue é o caminho mais tranquilo, sem dúvida. Então, o nosso roteiro é este aqui. A gente começa entendendo o que é o glue, depois passa pela configuração do primeiro job, aprende a investigar a performance como se fosse um detetive, aplica umas otimizações chave e no final fecha com as melhores práticas para levar pra vida. OK? Vamos lá pra primeira parte. Vamos começar do básico,

[1:02] entendendo a função principal do AWS Glue e por ele é uma mão na roda. Olha só, a definição é simples. O AWS Glue é um serviço de integração de dados totalmente gerenciado e a palavra mágica aqui é serverless, ou seja, sem servidor. Sabe o que isso significa? Que a AWS cuida de toda a parte chata da infraestrutura. E a gente pode focar só no que importa, preparar e combinar os dados para análise. É uma beleza. Beleza. Parte dois. Agora a mão vai na massa. Uma boa configuração logo de cara é o segredo para evitar a dor de cabeça depois. Vamos ver direitinho como fazer isso. O processo todo se resume a quatro passos bem importantes. Primeiro, definir as propriedades gerais do job. Segundo, escolher a potência do nosso motor, que é o tipo de worker. Terceiro, a gente define os parâmetros do job. E, por último, seleciona a classe de execução, que vai mexer no custo e no tempo de início. E, ó, um aviso

[2:02] importante aqui, de todas essas configurações, tem uma que é de longe a mais crítica, a escolha do worker type. O tipo de worker é ela que vai ditar a performance e o custo do job. Pensa que é como escolher o motor de um carro, sabe? É a decisão que mais impacta o resultado final. Certo? Vamos olhar essa tabela. O legal aqui é ver a escadinha de poder. A gente começa com o G.1X, que é perfeito para transformações e consultas mais padrão. O G. Aquele meio termo, sabe? Escalável e com um ótimo custo benefício pra maioria dos trabalhos. Agora, se o negócio começa a ficar mais pesado, com agregações, idões complexos, aí a gente sobe pro G. Até pro G. X, que é para aguentar o tranco das cargas mais pesadas mesmo. Mais VCPUs, mais memória, significa mais poder para processar tudo em paralelo. Outra decisão importante é a classe de execução. A standard é para quando o tempo é crucial. Ela garante que o job comece rapidinho, com recursos dedicados, perfeito para tarefas críticas. Já a flex, bom, a flex é a

[3:06] opção mais econômica, ideal para aqueles jobs que não tem preça, tipo um processamento em lote que roda de madrugada. Se o tempo de início variar um pouquinho, não tem problema. Chegamos na terceira parte. O job tá lá configurado, rodando. Mas será que tá rodando bem mesmo? Agora é a hora de vestir o chapéu de detetive e ir investigar. Então, pintou aquele cenário clássico, o job tá lento, demorando mais do que deveria, ou pior ainda, tá falhando. A pergunta de 1 milhão de dólares é: por onde a gente começa a procurar as pistas? Basicamente, a gente tem dois painéis principais para nos ajudar. Pensa no Cloudwatch como um termômetro. Ele dá uma visão geral, mostra se tem febre, se algo tá errado. Já e o I do Spark, ah, essa é como um raio X completo e detalhado. É com ela que a gente mergulha fundo para achar a causa do problema. Lá no Cloud Watch tem uma métrica que é batata shuffle bites

[4:08] written. Se esse número tiver nas alturas, é um sinal de alerta gigante. Geralmente significa que o job tá gastando um tempo enorme reorganizando os dados entre as máquinas. É uma operação super cara porque envolve mover um monte de dados pela rede e isso acontece muito em joins ou agrupamentos. Agora, pulando para UI do Spark. Essa tela aqui é o nosso ponto de partida na investigação. Na aba jobs a gente consegue ver cada etapa do processo. O que a gente precisa procurar? Etapas que demoram uma eternidade ou tarefas que faliaram. Esses são suspeitos número um de qualquer gargalo de performance. Depois a gente dá uma olhada na aba executors. Ela mostra o poder de processamento total do nosso cluster. A coluna cores é a mais importante aqui, porque ela diz quantas tarefas a gente consegue rodar ao mesmo tempo em paralelo. É um bom indicador da nossa capacidade. OK. Quarta parte. Já coletamos as pistas, agora é hora de agir. Vamos ver como a gente transforma essas informações em otimizações de verdade.

[5:09] Isso nos leva de volta a um ponto crucial. O shuffle, essa reorganização de dados, é quase sempre o grande vilão da performance no Spark. Pensa no shuffle como se estivéssemos tentando organizar um baralho gigante com milhões de cartas, espalhando elas por várias mesas. É uma das operações mais caras que existem. Minimizar o shuffle é o segredo para otimizar. Então, a primeira estratégia é atacar direto os joins, que são uma das causas mais comuns de shuffle. A solução é bem direta. Primeiro, diminuir a quantidade de dados que o join vai processar, como filtrando linhas e colunas que não são necessárias antes de fazer união. Segundo, se o mesmo conjunto de dados vai ser usado várias vezes, a gente guarda ele em cash na memória. Isso evita que o Spark tenha que calcular tudo de novo a cada vez. A segunda estratégia é mais óbvia, mas igualmente importante. Às vezes, o problema é simplesmente falta de braço, de recursos. Se o job não tem potência para dar conta do recado, a solução é

[6:10] dar mais potência para ele. A gente pode fazer isso na mão, aumentando o número de workers ou escolhendo um tipo de worker maior, ou, o que é ainda melhor, deixar o Glue cuidar disso sozinho, ativando o auto scaling. Ele adiciona e remove recursos dinamicamente, conforme a necessidade. E o legal é que a gente não precisa fazer tudo na unha. As versões mais novas do Spark vem com uma inteligência artificial interna, digamos assim, chamada adaptive query execution. Ela vai otimizando o trabalho enquanto ele roda, em tempo real e consegue até lidar com problemas como data skill, que é quando um trabalhador fica sobrecarregado e o resto fica esperando. É fantástico. E pra gente fechar com chame de ouro, vamos pra última parte. Um checklist rápido para guardar e consultar sempre que precisar com os pontos mais importantes que a gente viu. Então, resumindo a ópera, o fluxo é esse. Primeiro, configure bem, escolhendo o worker certo para sua carga. Depois, monitore usando o Cloud Watch para ter uma ideia geral e a Y do Spark para ir fundo no diagnóstico. Aí,

[7:11] identifique os gargalos. Etapas lentas, muito shuffle. Com problema na mão, otimize, filtre os dados o quanto antes, use cash e aumente os recursos se precisar. E por fim, automatize, use e abuse de recursos como outsaling e o adaptive query execution. E pra gente terminar, fica uma provocação. Otimizar um job pros dados de hoje é uma coisa, mas e quando o volume de dados crescer 100 vezes, como ele vai se comportar? Pensar em escalabilidade desde o começo é isso que transforma um bom trabalho em um trabalho excepcional. Fica aí a reflexão.
