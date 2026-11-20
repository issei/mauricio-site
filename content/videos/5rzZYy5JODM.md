---
id: 5rzZYy5JODM
slug: pode-a-inteligencia-artificial-manter-e-depurar-bases-de
status: publicado
temas:
  - especificacao-e-desenvolvimento
  - engenharia-agentica
resumo: O vídeo discute se agentes de IA conseguem achar e corrigir bugs sozinhos em bases de código grandes. Apresenta o SWE-sweep, em que o agente recebe repositórios inteiros sem nenhuma dica, as técnicas de localização de falhas e fuzzing, o custo alto e a taxa baixa de acerto, e o risco de uso duplo na cibersegurança.
fontes:
  - url: https://swesweep.com
    titulo: SWE-sweep
    sustenta: O SWE-sweep tem 100 repositórios e cerca de 4,1 mil bugs; os agentes não recebem nenhuma dica sobre o tipo ou o local do bug, e uma regressão na suíte de testes original zera a nota. Em 2 de novembro de 2026, o melhor resultado do ranking era de 8,9%.
    verificada: true
  - url: https://github.com/facebookresearch/swe-sweep
    titulo: "facebookresearch/swe-sweep: How many bugs can LMs find & fix in large codebases?"
    sustenta: O agente precisa descobrir e consertar o máximo de bugs num repositório real, e o projeto é uma camada fina sobre o Harbor, que roda a avaliação.
    verificada: true
revisado_por: Maurício Yokoyama Issei
revisado_em: 2026-11-19
youtube:
  titulo: Pode a Inteligência Artificial manter e depurar bases de código complexas de forma autônoma?
  publicado_em: 2026-10-17
  duracao: PT7M34S
  descricao: |-
    Neste vídeo, exploramos o **SWE-sweep**, um benchmark desenvolvido por pesquisadores da Meta FAIR, Harvard University, University of Washington e Stanford University. Enquanto benchmarks tradicionais como o **SWE-bench** avaliam modelos fornecendo uma descrição clara do problema a ser resolvido, o SWE-sweep coloca os agentes de IA em um cenário de mundo aberto: eles recebem uma base de código inteira contendo múltiplos bugs e devem **descobrir e corrigir o máximo de falhas possível sem nenhuma dica ou relatório prévio**.

    **Destaques do vídeo:**
    * **O Desafio do SWE-sweep:** Avaliação em **100 repositórios open-source** cobrindo **22 linguagens de programação** e um total de **4.068 bugs**.
    * **Como Funciona a Avaliação:** O agente precisa navegar no código, identificar desvios em relação ao comportamento esperado e aplicar correções sem quebrar os testes pré-existentes (sem regressões).
    * **Desempenho dos Modelos de Ponta:** Até mesmo o modelo com melhor resultado (GPT-5.6 Sol com mini-SWE-agent) resolveu apenas **4,7% de todos os bugs**.
    * **O Gargalo da IA:** O estudo revela que a maior dificuldade dos agentes não está na escrita do código de correção, mas sim na **localização e descoberta autônoma dos defeitos**.

    ---

    ### ⏱️ Capítulos / Timestamps Sugeridos
    * **00:00** - Introdução: O Desafio da Depuração Autônoma
    * **01:15** - SWE-bench vs. SWE-sweep: A Mudança de Paradigma
    * **03:10** - Como os Repositórios e Bugs Foram Selecionados
    * **05:30** - Resultados dos Agentes e Modelos de Ponta
    * **08:00** - Por Que Encontrar Bugs É Mais Difícil do Que Corrigi-los?
    * **10:45** - Conclusões e Próximos Passos na Engenharia de Software com IA

    ---

    ### 🔗 Links Úteis e Referências
    * 🌐 **Website do Projeto:** https://swesweep.com
    * 📄 **Artigo Científico (Paper):** https://swesweep.com/paper
    * 💻 **Repositório GitHub:** https://github.com/facebookresearch/swe-sweep

    ---

    #InteligenciaArtificial #EngenhariaDeSoftware #SWEsweep #SWEbench #AgentesDeIA #Python #Programacao #MachineLearning #Debugging #DesenvolvimentoDeSoftware
  miniatura: https://i.ytimg.com/vi/5rzZYy5JODM/maxresdefault.jpg
  visualizacoes: 59
  playlists: []
  legenda: automatica
  links_descricao:
    - https://swesweep.com
    - https://swesweep.com/paper
    - https://github.com/facebookresearch/swe-sweep
  coletado_em: 2026-11-07T22:16:07Z
---

## Achar o bug é o gargalo

O vídeo pergunta se a IA consegue encontrar e corrigir bugs sem ajuda humana. Resolver um problema isolado é muito diferente de receber uma base de código enorme e descobrir sozinho o que está quebrado [00:42].

Um artigo de 2018 resume a questão: não dá para consertar o que não se encontra. Aplicar o conserto costuma ser a parte fácil; o difícil é localizar a linha que causa o problema [01:03].

Essa etapa se chama localização de falhas e é o primeiro passo de qualquer sistema autônomo [01:24].

Pesquisas recentes atacam esse problema: o LLMAO tenta achar erros sem rodar testes, e o AgentFL expande a busca para o projeto inteiro [01:44].

Segundo o vídeo, o AgentFL navega pelo código e confirma hipóteses, como uma pessoa faria, e localiza a falha em 97 segundos, a um custo de 7 centavos de dólar [02:06].

## Do guiado ao autônomo

No SWE-bench, a IA recebia a descrição do problema, com dicas do que fazer [02:26].

No SWE-sweep, o agente entra em 100 repositórios com mais de 4.000 bugs sem nenhuma dica e precisa descobrir sozinho o que corrigir [02:47].

A avaliação usa o Harbor, um ambiente de testes isolado. O ciclo restaura o repositório original, aplica o código do agente, compila se for o caso e roda os testes. Se o agente conserta algo, mas quebra o que já funcionava, a nota é zero [03:08].

## Como equipar o agente

Pessoas usam mouse e janelas; a IA também precisa de uma interface própria. A pesquisa do SWE-agent chama isso de ACI, interface agente-computador: ferramentas que deixam o modelo ler textos longos, criar arquivos e usar o terminal sem se perder [03:51].

Outra técnica é o fuzzing: enviar dados aleatórios ao software para ver se ele quebra [03:51].

Segundo o vídeo, o TitanFuzz usa modelos de linguagem treinados em código para gerar testes que respeitam as regras das linguagens. Ele achou bugs inéditos em bibliotecas grandes de IA e aumentou a cobertura de código em quase 51% em relação aos métodos tradicionais [04:12].

## O custo da depuração por IA

Segundo o vídeo, a maior taxa de sucesso no ranking do SWE-sweep para consertar bugs sem nenhuma dica era de 4,7%, do modelo Sol 5.6 [04:35]. Na página do projeto, atualizada em 2 de novembro de 2026, o melhor resultado do ranking já é outro, com 8,9%.

O resultado mostra que a autonomia pura ainda está no começo. Esse modelo custa mais de US$ 72 por repositório testado [04:58]. Modelos mais baratos, como o Luna 5.6, não chegam a 3% de sucesso [05:20].

Dar mais tempo de processamento não resolve: há rendimentos decrescentes. Rodando livre por muito tempo, o agente muitas vezes desfaz consertos úteis que ele mesmo tinha feito [05:41].

## A fronteira da cibersegurança

Se a IA é boa em vasculhar sistemas atrás de bugs, também pode usar isso para atacar. O Cybench mede esse risco: testa modelos como o GPT-4o e o Claude 3.5 Sonnet com desafios reais de competições Capture the Flag [06:02].

Segundo o vídeo, agentes de IA acham a brecha e invadem em minutos, enquanto as melhores equipes humanas levam horas [06:23]. Nos casos mais difíceis, quase 25 horas [06:44].

É o problema do uso duplo: a mesma IA que pode patrulhar um software e fechar brechas também pode invadi-lo mais rápido do que uma pessoa acompanha. A pergunta que fica é quem vai achar a falha primeiro, quem defende ou quem ataca [07:05].

## Perguntas frequentes

### Qual é a diferença entre o SWE-bench e o SWE-sweep?

No SWE-bench, o agente recebe a descrição do problema. No SWE-sweep, recebe o repositório inteiro, sem dicas, e precisa achar os bugs sozinho [02:47].

### Por que uma regressão zera a nota?

Porque o objetivo é consertar sem quebrar o que já funcionava. Se a correção quebra um teste que passava, a nota da tarefa é zero [03:08].
