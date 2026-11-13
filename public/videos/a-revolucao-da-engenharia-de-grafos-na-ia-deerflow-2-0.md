# A Revolução da Engenharia de Grafos na IA: DeerFlow 2.0, Claude Code e o Fim dos Agentes Isolados!

O vídeo explica a diferença entre a engenharia de loop, em que um agente decide o próprio caminho, e a engenharia de grafo, em que os caminhos e as passagens de trabalho são definidos no código. Depois mostra como o DeerFlow 2.0 aplica isso com subagentes, skills carregadas sob demanda e um sandbox para os agentes trabalharem.

Vídeo de Maurício Yokoyama Issei, publicado em 12 de agosto de 2026 (9 min 16 s).
Assistir: https://www.youtube.com/watch?v=dacWmQubuSs

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## Do chat à automação de fluxos

Os agentes de IA deixaram de ser só assistentes de chat e passaram a automatizar fluxos de trabalho complexos [00:00]. Para isso funcionar sem o sistema alucinar ou travar, o design de software teve de mudar [00:00].

## Engenharia de loop

O problema é fazer a IA resolver tarefas complexas sem perder o controle do processo [01:04]. Quando um só agente faz uma tarefa longa do início ao fim, a chance de ele se perder é grande [01:04].

Na engenharia de loop, um único agente roda um ciclo contínuo até resolver o problema. Quem desenvolve define o objetivo, e o caminho fica com o agente [01:24]. O ciclo costuma ter cinco passos: descobrir o que precisa, planejar, executar, verificar o próprio trabalho e corrigir [01:47]. Se der erro, o agente reinicia o ciclo sozinho [02:10].

## Engenharia de grafo: o organograma

O vídeo usa uma analogia: o loop é um profissional generalista que tenta resolver tudo sozinho; o grafo é o organograma de uma empresa, em que quem desenvolve define os caminhos e as passagens de responsabilidade [02:30].

Um grafo tem três partes [02:50]:

- **Nós:** os especialistas, que executam o trabalho [02:50].
- **Arestas:** dizem para onde o trabalho vai depois, em sequência ou em paralelo [02:50].
- **Estado compartilhado:** a memória coletiva do sistema [03:12].

## Quando usar cada um

Se a tarefa é linear e tem um fim claro, o loop basta [03:32]. Se é preciso dividir a tarefa, rodar partes em paralelo e passar o trabalho de modo formal, o grafo é melhor [03:32]. No grafo, cada nó pode usar um modelo e uma ferramenta diferentes, e uma falha fica isolada [03:53].

A regra é dominar o loop primeiro. O grafo é um padrão de arquitetura, não uma solução mágica: use-o só quando o controle e o paralelismo justificarem [03:53]. O ponto de partida deve ser o loop, mais simples e mais barato [04:15].

## O DeerFlow 2.0

Segundo o vídeo, o DeerFlow tem quase 80.000 estrelas no GitHub [04:37]. A versão 2 ficou em primeiro lugar no GitHub Trending em 28 de fevereiro de 2026, e a ferramenta passou de sistema de pesquisa profunda a plataforma de orquestração [04:57].

O DeerFlow não depende de um modelo: dá para usar DeepSeek, OpenAI ou Gemini [05:17]. Ele é de código aberto, com licença MIT, se integra ao Slack e ao Telegram e pode ser estendido pelo protocolo MCP [05:39].

## Subagentes e skills

O agente principal age como um gerente. Ele cria subagentes sob demanda, mas só quando há ganho claro, como rodar ações em paralelo ou isolar o contexto [06:00].

As skills são carregadas aos poucos, só quando são pedidas, o que mantém o contexto limpo e economiza tokens [06:22]. Já vêm skills para pesquisa profunda, código, slides, páginas web, imagens e vídeos [06:43]. Como são arquivos Markdown, qualquer skill pode ser criada ou trocada [07:03].

## Um computador para os agentes

O DeerFlow dá aos agentes um sandbox isolado, que pode rodar num contêiner Docker ou no Kubernetes [07:24]. Ali o agente tem navegador, terminal e arquivos reais, e pode trabalhar por horas sem sair do isolamento [07:24].

O agente lê arquivos, roda comandos no shell, testa o código que escreveu e corrige erros [07:44]. Há também uma integração com o Claude Code no terminal para mandar tarefas e acompanhar os subagentes [08:05].

## Perguntas frequentes

### Devo começar com loop ou com grafo?

Com loop. O grafo só vale a pena quando a tarefa pede controle e paralelismo [04:15].

### O DeerFlow obriga a usar um modelo específico?

Não. Ele funciona com vários fornecedores, como DeepSeek, OpenAI e Gemini [05:17].

## Fontes

- [Graph Engineering Guide (2026), AI Builder Club](https://www.aibuilderclub.com/blog/graph-engineering-guide-2026): A diferença entre engenharia de loop e de grafo, e a metáfora do organograma.
- [DeerFlow GitHub (ByteDance)](https://github.com/bytedance/deer-flow): O DeerFlow é de código aberto, com licença MIT, e tem subagentes, skills e sandbox.

Revisado por Maurício Yokoyama Issei em 12 de novembro de 2026.

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Dados e decisão](https://mauricio.issei.com.br/temas/dados-e-decisao)

## Sobre o vídeo

Neste vídeo, mergulhamos fundo no futuro da arquitetura de inteligência artificial e na transição histórica que está acontecendo na comunidade de desenvolvedores: a evolução do Loop Engineering para o Graph Engineering.
Se você já se frustrou com agentes autônomos que "perdem o rumo" em tarefas longas ou quer entender como construir sistemas multiagentes previsíveis e escaláveis, este conteúdo é indispensável.
Exploramos o DeerFlow 2.0, o poderoso framework de código aberto da ByteDance voltado para tarefas de longo horizonte de pesquisa profunda e codificação
, e analisamos o inovador projeto piloto deer-workflow (DeerWork), que estabelece a base para o DeerFlow 3.0, trazendo a orquestração inteiramente para o TypeScript e delegando o trabalho semântico a agentes substituíveis como Claude Code, Codex e Pi.
📌 O que você vai aprender neste vídeo:
Loop vs. Graph Engineering: Descubra a diferença fundamental entre deixar um agente livre para escolher seu próprio caminho em um loop ou declarar caminhos, arestas e verificações explícitas usando grafos de agentes.
A Metáfora do Organograma: Por que os agentes estão deixando de ser "generalistas" que fazem tudo sozinhos para trabalhar em estruturas com papéis definidos e hand-offs de dados.
Anatomia do DeerFlow 2.0: O papel de sandboxes Docker seguras, memória persistente de curto/longo prazo e gateways de mensagens integrados com Telegram, Slack e Lark
.
Dynamic Workflow Runtime (deer-workflow): Como utilizar TypeScript como o plano determinístico de execução do seu sistema, usando primitivos de fluxo como parallel(), pipeline() e phase().
Orquestração de Agentes Substituíveis: Como o Claude Code, Codex e Pi atuam como engrenagens semânticas plugáveis e modulares sob uma interface unificada e neutra de fornecedor.
🔗 Links Oficiais e Referências do Material:
Para você colocar em prática os conceitos discutidos no vídeo e explorar a fundo os códigos e arquiteturas demonstrados, use as referências e links oficiais abaixo:
🔥 Repositórios e Projetos Oficiais:
DeerFlow GitHub (ByteDance): https://github.com/bytedance/deer-flow
Website Oficial do DeerFlow & Cases: https://deerflow.tech/
deer-workflow GitHub (Pilot Project 3.0): https://github.com/deerwork-ai/deer-workflow
Documentação de Primeiros Passos (DeerWork): https://github.com/deerwork-ai/deer-workflow/blob/main/docs/index.md
Referência da API do deer-workflow: https://github.com/deerwork-ai/deer-workflow/blob/main/docs/api.md
📚 Guias Teóricos e Frameworks Citados:
Graph Engineering Guide (2026) - AI Builder Club: https://www.aibuilderclub.com/blog/graph-engineering-guide-2026
Documentação Oficial do LangGraph: https://docs.langchain.com/oss/python/langgraph/overview
Google Agent Development Kit (ADK): https://adk.dev/
All-in-One Sandbox (AIO Sandbox): https://github.com/agent-infra/sandbox

📢 Compartilhar este vídeo com o seu time de desenvolvimento!

#AIAgents #GraphEngineering #TypeScript #LangGraph #ClaudeCode #ByteDance #DeerFlow #AIArchitecture #SoftwareEngineering #MultiAgentSystems

## Transcrição

_Transcrição automática, não revisada._

[0:00] Se tem um assunto que tá literalmente redefinindo o que as máquinas conseguem fazer sozinhas hoje, é arquitetura de agentes autônomos. A gente já passou daquela fase em que a Iara é só uma assistente de chat glorificado, não é verdade? Agora o papo é sobre automação de fluxos de trabalho incrivelmente complexos. E para fazer tudo isso funcionar sem o sistema alucinar ou entrar num beco sem saída, o design de software teve que evoluir de um jeito absurdo. É exatamente isso que a gente vai destrinchar aqui, olhando pra aplicação prática do que tem de mais avançado no mercado atualmente. Dando uma olhada bem rápida no nosso roteiro, primeiro a gente vai entender a diferença crucial entre a engenharia de loop e a de grafo. Depois vamos usar a metáfora fantástica do organograma corporativo para visualizar isso melhor. Aí sim a gente cai de cabeça no Dearflow versão 2, entende como funcionam as skills e osagentes. E para fechar com chasse de ouro, vamos ver o que acontece quando a gente dá um computador de verdade na mão dessa inteligência artificial. Parte um. Engenharia de loop contra engenharia de grafo. O grande

[1:00] debate atual na arquitetura de tudo começa com um baita problema arquitetônico. Como é que a gente faz uma inteligência artificial resolver problemas que são verdadeiramente complexos sem perder totalmente o controle do processo? Porque vamos ser sinceros, quando a gente joga uma tarefa com múltiplas etapas do início ao fim na mão de um só, a chance dela se perder no meio do caminho é gigante. O grande desafio aqui é como escalar essa autonomia, mantendo a coisa toda previsível e controlada. O feijão com arroz dessa história é a engenharia de loop. Basicamente é um único agente executando um ciclo contínuo para tentar resolver um problema de forma totalmente autônoma. Visualmente é tipo um grafo de um nó só. Quem desenvolve vai lá, aponta a linha de chegada e define o objetivo final. Mas o caminho até lá fica 100% a cargo da mente autônoma do agente. Ele tem liberdade absoluta para escolher o que fazer. E esse ciclo de loop geralmente tem cinco passos bem claros. O agente vai lá, tenta descobrir o que precisa, planeja as ações, executa, verifica o próprio trabalho e tenta

[2:02] corrigir se deu algo errado. [roncando] O detalhe fundamental que a gente não pode esquecer aqui é que o agente gerencia todo esse processo sozinho. Deu erro, ele simplesmente reinicia o ciclo na tentativa de acertar de forma totalmente autônoma. Parte dois, a metáfora do organograma e como a gente visualiza sistemas de IA de forma mais clara. Aí que a coisa fica super interessante. Imagina que as tarefas ficaram complexas demais para um ciclo só. O material original nos traz uma analogia simplesmente sensacional. O loop é tipo aquele profissional generalista que tenta resolver o problema inteiro sozinho, batendo cabeça. Já o grafo funciona como o organograma de uma empresa de verdade, sai de cena autonomia total e entra num processo onde os caminhos e as transferências de responsabilidade são definidos explicitamente por quem tá desenvolvendo o código. É literalmente como se fossem departamentos passando a bola. uns pros outros depois de testes rigorosos de qualidade. Mas para esse organograma digital funcionar direitinho, existem três pilares técnicos inegociáveis. Primeiro, os nós,

[3:03] que são os nossos especialistas, as unidades de execução propriamente ditas. Depois, as arestas, que ditam a regra do jogo e dizem exatamente para onde o trabalho vai a seguir, seja numa linha reta ou fatiando o problema em paralelo. E por fim, o estado compartilhado. Isso é vital, pessoal. é a memória coletiva do sistema, garantindo que o grupo acumule conhecimento estruturado e não aja como aquele grupo de mensagens onde todo mundo esquece o que foi combinado 5 minutos atrás. Mas calma lá, quando é que a gente realmente precisa assumir o peso de megrar de um loop para um grafo? Essa tabela ajuda a entender no detalhe. Se a tarefa linear e tem uma linha de chegada clara, o loop dá conta do recado. Agora, se a gente tá falando de fatiar tarefas, fazer coisas um paralelo e precisar de transferências formais de trabalho, aí o grafo brilha muito. Pensa bem, se o Metap exige uma pesquisa acadêmica profunda, a outra precisa de texto criativo e uma terceira faz a revisão crítica poder usar ferramentas e modelos diferentes para cada nó. Além de isolar as falhas sem derrubar o processo inteiro, é o que torna o grafo um baita

[4:05] divisor de águas. Só que o ponto crucial aqui, que é um consenso técnico muito forte, é este. A gente precisa dominar a engenharia de loop primeiro. O grafo não é tecnologia mágica que a gente joga em qualquer projeto para resolver tudo. Ele é um padrão de design arquitetônico e deve ser usado apenas quando a demanda por controle e paralelismo realmente justificar. No fim das contas, a simplicidade e o baixo custo do loop sempre devem ser o ponto de partida padrão. Parte três. Conheça o Dearflow versão 2, o ambiente definitivo de superagente open source. Para sair da teoria e ver como tudo isso roda maravilhosamente bem na prática, dá só uma olhada no tamanho do impacto do Deerflow. Estamos falando de quase 80.000 estrelas no repositório do GitHub. é um número simplesmente absurdo que estabelece uma credibilidade gigantesca e prova como a comunidade global de desenvolvedores abraçou essa solução. E o hype não para por aí.

[5:06] Quando a versão 2 chegou, ela engoliu o GitHub Trending e ficou em primeiro lugar no dia 28 de fevereiro de 2026. A energia da comunidade com esse lançamento marcou uma transição super clara. A ferramenta deixou de ser apenas um sistema de pesquisa profunda e virou uma plataforma de orquestração gigantesca. O que faz essa ferramenta se tomar ruda são justamente as suas flexibilidades. O Deerf é agnóstico, o que significa que dá para plugar do Seek, Open AI, Geremony. Ninguém fica preso a um único modelo ou fornecedor. Além de ter controle total por ser open source com licença MIT, ele integra lindamente onde o trabalho já acontece, tipo no Slack ou no Telegram, e é altamente expansível através do protocolo MCP. É, sem dúvida, um ambiente robusto e pronto para rodar em produção. Parte quatro. skills e subagentes. Como a especialização rola solta na prática. No dia a dia das operações, a magia da hierarquia acontece aqui. O agente principal no JFO age literalmente como um gerente. Ele não vai tentar abraçar o mundo e fazer

[6:07] as tarefas todas sozinho. O que ele faz é criar suagente sob demanda, mas apenas quando existe um ganho claro, seja para rodar ações em paralelo mais rápido ou para isolar totalmente o contexto de um fluxo de trabalho. É a teoria do grafo brilhando. Delegação pura com ferramentas focadas e condições super rigorosas de quando aquela tarefa deve ser encerrada. E o grande pulo do gato técnico nessa parte é o carregamento progressivo das famosas skills, as habilidades. Pensa só, injetar todas as instruções de uma vez sobrecarregaria o modelo e gastaria uma fortuna absurda em tokens. O sistema resolve isso carregando as habilidades atimamente apenas quando são solicitadas. Isso mantém o contexto super limpo, evita que a IA alucine e lida de forma absurdamente inteligente com modelos sensíveis a gastos. O arsenal que já vem pronto na caixa para esses subagentes utilizarem é impressionante. Dá para plugar capacidades para pesquisas ultra profundas, escrever código, montar uma apresentação inteira de slides,

[7:07] construir página web e até gerar imagens e vídeos. E como tudo isso roda em cima de arquivos Markdown simples, a flexibilidade é total. Qualquer habilidade pode ser criada do zero, trocada ou completamente personalizada por quem desenvolve. Parte cinco. Dando um computador aos agentes e o poder do ambiente sandbox. A gente chega agora na peça arquitetônica final e francamente a mais insana de todas. O Dearflow literalmente coloca um computador na mão da IA. Um ambiente de execução é um sandbox, uma caixa de areia totalmente isolada e segura. Pode rodar em um simples contêiner Docker ou até numa orquestração pesada via cubernetes. E não estamos falando de simulação verbal, não. A ganha acesso a navegador, terminal, arquivos de verdade e pode executar processos reais por horas a fio sem quebrar o isolamento. E dentro desse ambiente seguro, a autonomia vai para outro patamar. O agente consegue ler e examinar arquivos reais. Ele roda comandos ativamente no terminal Shell. testa o código que ele próprio acabou de criar e arruma possíveis erros, sustentando esse trabalho pesadíssimo

[8:08] por períodos super longos, sem nunca travar o sistema principal. Para fechar o pacote e amarrar isso no fluxo de trabalho de quem codifica todo dia, existe essa integração fenomenal. Sem precisar sair da tela preta do terminal, integrando com cloud, é só rodar aquele comando na tela e pronto. Dá para mandar tarefas complexas, acompanhar strads e ver o sistema fatiar o problema em suagentes, tudo ali na ponta dos dedos. é o poder máximo e absoluto de um orquestrador rodando lisinho. E essa é a grande provocação que encerra a nossa imersão de hoje. A gente saiu daquela bagunça de agentes generalistas tentando fazer tudo ao mesmo tempo e entrando em parafuso para uma nova era de processos milimetricamente orquestrados em grafo. Temos subagentes focados, carregamento inteligente de ferramentas e o mais louco, computadores seguros e exclusivos para ir a trabalhar. A ponte arquitetônica já foi atravessada. A infraestrutura open source tá pronta e disponível para todo mundo. A única pergunta que não quer calar agora é: com tanto poder na mão, qual vai ser o

[9:09] limite do que a gente pode construir daqui paraa frente?
