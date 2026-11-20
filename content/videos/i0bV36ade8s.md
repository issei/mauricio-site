---
id: i0bV36ade8s
slug: como-a-memoria-de-autoaperfeicoamento-impulsiona-o
status: publicado
temas:
  - engenharia-agentica
  - ferramentas-de-ia
resumo: "O vídeo resume um artigo de pesquisadores do Google Cloud AI, do Google DeepMind e da Penn State sobre automelhoria recursiva contínua: quando o modelo ou o benchmark muda, o otimizador de harness perde o que aprendeu. A proposta é a Self-Improvement Memory (SIM), uma memória do próprio otimizador que guarda o raciocínio, o resultado previsto e o observado de cada edição."
fontes:
  - url: https://academy.dair.ai/papers/self-improvement-memory-enables-continual-recursive-self-improvement-2611.18856
    titulo: Self-Improvement Memory Enables Continual Recursive Self-Improvement
    sustenta: Resumo do artigo (arXiv 2611.18856) na DAIR.AI Academy, publicado em 13/11/2026, de Xin Yu, Fei Xia, Jiaqi Pan e outros, do Google Cloud AI e do Google DeepMind com a Penn State. Sustenta a definição de CRSI, o harness evoluído no Opus que começa em 68,41 no Gemini contra 73,89 do harness semente, a SIM ligada ao otimizador e não à política, o agrupamento por problema recorrente com justificativa, resultado previsto e observado e contexto de avaliação, a leitura pelo proponente e pelo seletor, os seis cenários entre conjuntos de dados e os quatro do Opus para o Gemini em quatro domínios (incluindo Terminal-Bench 2.1 para Terminal-Bench 4), os orçamentos equalizados e a melhora em 9 de 10 continuações, com ganho médio de 2,36 pontos (p = 0,003).
    verificada: true
revisado_por: Maurício Yokoyama Issei
revisado_em: 2026-11-20
youtube:
  titulo: Como a Memória de Autoaperfeiçoamento Impulsiona o Recursive Self-Improvement Contínuo em IA
  publicado_em: 2026-11-19
  duracao: PT5M31S
  descricao: |-
    Neste vídeo, exploramos o conceito de **Continual Recursive Self-Improvement (CRSI)** e como a **Self-Improvement Memory (SIM)** resolve um dos maiores desafios na evolução autônoma de sistemas de inteligência artificial.

    Pesquisadores da Google Cloud AI, Google DeepMind e Penn State investigaram o que acontece quando o otimizador de *harness* precisa continuar evoluindo após mudanças no modelo de política ou nos benchmarks de avaliação. Em cenários práticos, um *harness* evoluído nem sempre se transfere de forma direta — como visto quando uma configuração refinada no Claude Opus obteve pontuação inicial inferior à do modelo semente ao ser aplicada no Gemini. 

    A solução proposta é a **Self-Improvement Memory (SIM)**: em vez de equipar apenas o modelo que resolve a tarefa, a memória é integrada ao próprio otimizador de *harness*. O SIM cataloga e agrupa tentativas anteriores por falhas recorrentes, armazenando as justificativas, os resultados previstos versus observados e o contexto de avaliação. Assim, tanto o módulo proponente quanto o seletor conseguem reaproveitar aprendizados passados e evitar repetições de erros.

    ---

    📌 **Destaques dos Resultados:**
    * **Desempenho Consistente:** O SIM superou as abordagens que utilizam apenas o *harness* ou apenas causas-raiz em seis cenários entre conjuntos de dados e quatro entre modelos (incluindo migrações de Opus para Gemini e Terminal-Bench 2.1 para Terminal-Bench 4).
    * **Ganhos Estatisticamente Significativos:** Em testes de programação pareados ao longo de 10 execuções independentes, o SIM melhorou 9 das 10 continuações, alcançando um ganho médio de 2,36 pontos (*p* = 0,003).

    ---

    ⏱️ **Capítulos Sugeridos:**
    * `00:00` - Introdução: O que é Autoaperfeiçoamento Recursivo Contínuo?
    * `01:15` - O Desafio da Transferência entre Modelos e Benchmarks
    * `02:40` - O que é a Self-Improvement Memory (SIM) e como funciona
    * `04:10` - Resultados e Benchmarks (Google DeepMind, Cloud AI e Penn State)
    * `05:30` - Conclusão e o Futuro dos Agentes Autônomos

    ---

    📄 **Artigo de Referência:**
    * *Self-Improvement Memory Enables Continual Recursive Self-Improvement* (Xin Yu, Fei Xia, Jiaqi Pan, Youbao Tang, Chengzhi Liu, Adams Yu et al.).
    * arXiv: 2611.18856

    https://academy.dair.ai/papers/self-improvement-memory-enables-continual-recursive-self-improvement-2611.18856

    ---

    #InteligenciaArtificial #MachineLearning #DeepMind #GoogleCloud #LLM #SelfImprovement #CRSI #AIAgents
  miniatura: https://i.ytimg.com/vi/i0bV36ade8s/maxresdefault.jpg
  visualizacoes: 3
  playlists: []
  legenda: automatica
  links_descricao:
    - https://academy.dair.ai/papers/self-improvement-memory-enables-continual-recursive-self-improvement-2611.18856
  coletado_em: 2026-11-20T13:12:45Z
---

## Uma IA que lembra do próprio passado

O vídeo analisa um artigo de pesquisadores do Google Cloud AI, do Google DeepMind e da Penn State [00:00]. A pergunta central: como dar a um sistema de IA a capacidade de lembrar do próprio passado, e como essa memória ajuda a construir sistemas autônomos mais robustos [00:00]?

A analogia do vídeo é um trabalhador que esquece por que fez cada ajuste num projeto [00:20]. Sempre que o ambiente muda, ele recomeça do zero e perde horas de raciocínio [00:41]. Esse é o obstáculo que o artigo ataca.

## O problema da amnésia

O artigo trata da automelhoria recursiva contínua (CRSI, na sigla em inglês) [00:41]. Nesse cenário, um otimizador de IA precisa continuar evoluindo o harness, o conjunto de ferramentas e instruções que envolve o modelo, mesmo depois que o benchmark ou o próprio modelo muda [01:02]. A evolução não pode descartar as lições já aprendidas [01:02].

O exemplo mostra o tamanho do problema. Um harness evoluído no Claude Opus começa com 68,41 pontos quando é levado para o Gemini [01:24]. É menos do que os 73,89 do harness semente, sem otimização nenhuma [01:44]. Todo o progresso conquistado se perde na troca de modelo.

## A memória de automelhoria (SIM)

A solução proposta é a Self-Improvement Memory (SIM) [02:05]. A memória fica no otimizador do harness, não no modelo que resolve a tarefa. Ele passa a registrar as edições passadas e os resultados delas, como um diário de bordo da própria evolução [02:05].

O diferencial é o que a memória guarda. A SIM não salva só linhas de código: registra o raciocínio por trás de cada edição, o contexto e o resultado esperado [02:28]. Assim o sistema entende o porquê das próprias escolhas anteriores [02:49].

## Como a memória funciona

O vídeo descreve um ciclo de quatro passos [02:49]:

1. Agrupar as edições antigas pelo problema recorrente que tentavam resolver [02:49].
2. Guardar as justificativas, o resultado previsto contra o observado e o contexto da avaliação [03:10].
3. Fazer com que os dois módulos do otimizador, o que propõe edições e o que escolhe entre elas, leiam a memória [03:10].
4. Anexar cada nova tentativa, de modo que a base cresce enquanto a otimização continua [03:10].

## Os resultados

Com orçamentos e pontos de partida equalizados, a SIM supera a continuação só com o harness e a continuação só com causas-raiz [03:30]. Os testes cobriram seis cenários entre conjuntos de dados e quatro trocas do Opus para o Gemini, em quatro domínios [03:30]. Um deles é o salto do Terminal-Bench 2.1 para o Terminal-Bench 4 [03:52].

Em programação, com dez execuções independentes, a SIM melhorou nove das dez continuações [03:52]. O ganho médio foi de 2,36 pontos [04:13]. Parece pouco, mas o valor p de 0,003 indica que o ganho não é sorte [04:34].

## O que muda para agentes autônomos

O vídeo termina com uma provocação. Se já é possível curar a amnésia dos otimizadores, agentes que acumulam as próprias lições sem interrupção podem evoluir muito mais rápido [04:55]. Para o vídeo, é uma mudança de paradigma que vale acompanhar de perto [05:15].

## Perguntas frequentes

### Por que um harness otimizado para um modelo piora em outro?

Porque o otimizador não guarda o motivo de cada ajuste. No exemplo do artigo, um harness evoluído no Claude Opus começa com 68,41 pontos no Gemini, abaixo dos 73,89 do harness inicial sem otimização [01:24].

### O que a Self-Improvement Memory guarda?

Para cada edição, guarda o raciocínio, o resultado previsto e o observado e o contexto da avaliação, agrupando as edições pelo problema que tentavam resolver. O módulo que propõe e o que escolhe leem essa memória [03:10].
