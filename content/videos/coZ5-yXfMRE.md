---
id: coZ5-yXfMRE
slug: aws-glue-otimize-seus-jobs-spark-e-reduza-custos-guia
status: publicado
temas:
  - cloud-e-confiabilidade
  - dados-e-decisao
resumo: "O vídeo é um guia para quem começa no AWS Glue: quando escolher o Glue em vez do Amazon EMR, como configurar o job (tipo de worker e classe de execução), como investigar a performance no CloudWatch e na interface do Spark, e como reduzir o shuffle com filtros, cache, mais recursos e Adaptive Query Execution."
revisado_por: Maurício Yokoyama Issei
revisado_em: 2026-11-19
youtube:
  titulo: "AWS GLUE: Otimize seus Jobs Spark e Reduza Custos (Guia Prático para Iniciantes)"
  publicado_em: 2025-11-18
  duracao: PT7M49S
  descricao: |-
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
  miniatura: https://i.ytimg.com/vi/coZ5-yXfMRE/maxresdefault.jpg
  visualizacoes: 38
  playlists: []
  legenda: automatica
  links_descricao: []
  coletado_em: 2026-11-07T22:16:07Z
---

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
