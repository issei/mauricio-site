# O Ciclo ReAct em Agentes de IA: Como os Agentes Pensam, Agem e Observam

O vídeo explica o ciclo ReAct, que faz um agente de IA raciocinar e agir em ciclos de pensar, agir e observar. Mostra a anatomia do agente (modelo, contexto e ferramentas), como a trajetória se acumula e é reenviada ao modelo a cada ciclo e quais condições encerram o loop.

Vídeo de Maurício Yokoyama Issei, publicado em 11 de setembro de 2026 (7 min 41 s).
Assistir: https://www.youtube.com/watch?v=9fUl8-hSIp0

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## A anatomia de um agente

O vídeo se baseia no livro de Li Bojie sobre agentes de IA. Segundo esse material, um agente é mais do que um modelo de linguagem (LLM): o modelo precisa estar ligado ao contexto certo e a ferramentas reais. Sem uma dessas três peças, o sistema perde a autonomia [01:03].

O vídeo usa uma metáfora do corpo [01:47]:

- o LLM é o cérebro: entende os dados, raciocina e decide [01:47];
- o contexto são os olhos: define o que o agente vê e lembra do ambiente [01:47];
- as ferramentas são as mãos e os pés: permitem agir no mundo, como pesquisar na internet, mandar uma mensagem ou rodar um script [01:47].

## O que é o ciclo ReAct

ReAct junta duas palavras em inglês: reasoning (raciocínio) e acting (ação). O mecanismo tira o agente da posição passiva de só receber um prompt e o faz raciocinar sobre o problema e agir no ambiente, um passo de cada vez [02:30].

Um agente moderno não espera um texto num chat: é orientado a eventos. Recebe estímulos, como mensagens ou áudios num aplicativo, consulta a memória e aciona ferramentas externas, como ler e-mails ou checar uma agenda [02:52].

## Pensar, agir e observar

O ciclo tem três tempos [03:35]:

1. Pensar: o modelo analisa o problema e escolhe a estratégia [03:35].
2. Agir: usa uma ferramenta para executar o plano [03:35].
3. Observar: avalia o resultado que a ferramenta devolveu, e o ciclo recomeça [03:35].

O loop só para quando a tarefa termina [03:56].

Esse ciclo permite resolver problemas abertos, como construir um software do zero ou fazer uma pesquisa densa, em que não dá para saber no começo quantos passos a tarefa vai levar. O agente tenta uma rota, observa o resultado e corrige o trajeto [04:17].

No código, os blocos JSON mostram o raciocínio do modelo virando chamada de ferramenta. No exemplo do vídeo, o modelo monta o comando e chama a função que busca o clima atual em Vancouver [04:39].

## A trajetória

A cada ciclo, o agente acumula um histórico, chamado de trajetória [05:00].

O contexto total do agente soma duas partes [05:00]:

- um prefixo estático, com as regras: a personalidade da IA e as instruções das ferramentas [05:00];
- a trajetória: o que foi pedido, o que a IA respondeu, as ferramentas usadas e os resultados [05:21].

Os modelos de linguagem não guardam estado entre uma chamada e outra (são stateless). Por isso, o framework que envolve o agente reenvia a trajetória inteira ao modelo a cada ciclo [05:43].

Se a infraestrutura não reenviar o histórico, a IA esquece o que estava fazendo [06:03].

## Quando parar

O loop depende de condições de saída [06:03]:

- a tarefa termina e a resposta final é entregue [06:25];
- a IA decide que já tem dados suficientes e não chama mais ferramentas [06:25];
- o agente atinge o limite máximo de ciclos [06:25];
- os erros se acumulam, e o framework encerra a operação à força [06:45].

Essas travas impedem que o agente gire sem fim e gaste recursos à toa [06:45].

O vídeo fecha perguntando o que muda quando esses ciclos saírem das janelas de chat e passarem a rodar de forma contínua e invisível nos celulares e computadores. Entender esse motor seria o primeiro passo para a próxima era da computação [07:07].

## Perguntas frequentes

### O que significa ReAct?

É a junção de reasoning (raciocínio) e acting (ação): o agente raciocina e age em ciclos [02:30].

### Por que o agente precisa reenviar o histórico?

Porque o modelo de linguagem não guarda estado entre chamadas. Sem o histórico, ele esquece a tarefa [05:43].

## Fontes

- [bojieli/ai-agent-book: 《深入理解 AI Agent：设计原理与工程实践》（李博杰 著）开源主仓库：全书正文、编译版 PDF 与按章配套代码](https://github.com/bojieli/ai-agent-book): O livro de Li Bojie, base do vídeo segundo a descrição, tem como fórmula central "Agent = LLM + 上下文 + 工具" (agente = LLM + contexto + ferramentas) e tem versão em português do Brasil.

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

Neste vídeo explicativo, detalhamos o funcionamento do **ciclo ReAct (Reasoning + Acting)**, a arquitetura essencial que permite aos Agentes de IA irem além de simples chats de conversação.

Entenda como a integração entre o **LLM (Cérebro)**, o **Contexto (Olhos)** e as **Ferramentas (Mãos e Pés)** possibilita que os agentes executem tarefas complexas por meio de uma iteração contínua: **Pensar ➔ Agir ➔ Observar**.

#### 💡 O que você vai aprender neste vídeo:
* **A Fórmula Fundamental**: A arquitetura central onde `Agente = LLM + Contexto + Ferramentas`.
* **O Loop ReAct na Prática**: Como o modelo gera raciocínios (Reasoning), chama ferramentas externas (Acting) e analisa os resultados (Observing).
* **Trajetória e Contexto**: Como o histórico estruturado de mensagens orienta as decisões do agente a cada iteração do ciclo.
* **Harness Engineering**: A camada de suporte e governança em torno do modelo que garante execuções confiáveis.

---

### 🔗 Fontes e Referências

O conteúdo deste vídeo é baseado nas teorias e padrões de engenharia apresentados no livro **"Deep Dive into AI Agents: Design Principles and Engineering Practice"** (深入理解 AI Agent：设计原理与工程实践), escrito por **Li Bojie (李博杰)**.

* 📁 **Repositório Oficial do Projeto no GitHub**:  
  https://github.com/bojieli/ai-agent-book

* 🌐 **Leitura Online da Obra (Multilíngue)**:  
  https://bojieli.github.io/ai-agent-book/

* 📄 **Download do Livro em PDF**:  
  - PDF Original (Chinês): https://github.com/bojieli/ai-agent-book/releases/download/latest/AI-Agents-in-Depth-zh-CN.pdf
  - PDF Traduzido (Português Brasil): https://github.com/bojieli/ai-agent-book/releases/download/latest/AI-Agents-in-Depth-ptbr.pdf

---

### 🏷️ Hashtags
#AIAgents #ReAct #EngenhariaDeContexto #LLM #InteligenciaArtificial #LiBojie #MachineLearning #DesenvolvimentoDeIA

## Transcrição

_Transcrição automática, não revisada._

[0:00] Sejam bem-vindos a mais uma análise. Hoje a gente vai desmistificar uma coisa chamada ciclo react de agentes. A ideia aqui é pegar aqueles conceitos áridos, super técnicos de engenharia e arquitetura de software e traduzir tudo isso num olhar fascinante sobre como a inteligência artificial autônoma realmente funciona ali na prática, no dia a dia. Porque pensem bem, quando a gente fala de agentes de operando sozinhos, tomando decisões, existe um motor lógico, quase como um coração batendo por trás de cada ação. E são exatamente as engrenagens desse motor que a gente vai desvendar agora. Bom, o nosso roteiro de hoje é bem direto. Primeiro vamos dar uma olhada na anatomia de um agente. Depois vamos explicar o ciclo react em si. Passamos então pra dinâmica de pensar, agir e observar. No passo quatro, vamos ver como se constrói a trajetória. E por fim, vamos entender como o sistema sabe a exata hora de parar. Então vamos lá. Passo um, a anatomia de um agente. O que

[1:03] realmente forma essa estrutura? Tem uma fórmula que sai direto do nosso material fonte e ela prova uma coisa fundamental. Um verdadeiro agente é muito, mas muito mais do que apenas um grande modelo de linguagem, o famoso LLM. A inteligência bruta do modelo precisa obrigatoriamente estar acoplada ao contexto certo e ter ferramentas reais a disposição. Se faltar qualquer uma dessas três pecinhas, o sistema simplesmente perde aquela autonomia real que a gente tanto espera dele. E o mais legal é que podemos pegar essa engenharia fria, esses termos técnicos de sistema e transformar numa metáfora biológica. Fica muito mais fácil de visualizar. Quer ver o modelo de linguagem? O LM, ele é basicamente o cérebro. É ele quem entende os dados, raciocina e toma as decisões. O contexto funciona como os olhos do agente, ditando o que ele consegue ver e lembrar sobre o ambiente ao seu redor. E as ferramentas, ah, as ferramentas são as mãos e os pés. São elas que permitem que a IAI efetivamente

[2:04] interaja com o mundo real, como fazer uma pesquisa na internet, mandar uma mensagem ou rodar um script. Sem mãos, o cérebro só fica pensando no vazio. Legal. Agora que temos as partes, vamos pra sessão dois, o ciclo react explicado, como a gente coloca esse organismo para rodar. Aqui a gente entra no núcleo da nossa explicação de hoje, o framework react. Esse nome é uma junção super inteligente de duas palavras em inglês, reasoning, que é o raciocínio, e acting, que é a ação. Basicamente, esse é um mecanismo que tira o agente daquela posição passiva de só receber um promptro e permite que ele realmente raciocine sobre um problema e execute ações no ambiente. E faz isso de forma iterativa, sacou? Um passinho de cada vez, aprendendo com o que acabou de fazer. E se a gente olhar para uma arquitetura de verdade no mundo real, um agente moderno não fica ali sentado esperando alguém mandar um texto num chat. Nada disso. Ele é orientado a eventos. Ele coordena

[3:04] ativamente as coisas que chegam, como uma enchurrada de mensagens ou até arquivos de voz num appel. A partir desse estímulo, o cérebro troca uma ideia com os buffers de memória e aciona ativamente ferramentas externas, tipo ler e-mailos ou checar uma agenda para resolver a tarefa. É uma orquestração completa, rolando solta. O que nos leva à nossa terceira sessão? O pulso desse motor, pensar, agir e observar. Gente, o ritmo do ciclo React é de uma simplicidade brilhante. São só três compassos. Primeiro, o modelo pensa. Ele dá aquela olhada no problema, analisa e decide qual é a melhor estratégia. Segundo, ele age. Ele manda as mãos usarem uma ferramenta específica para executar o plano. Terceiro, ele observa. Ele avalia o resultado que a ferramenta trouxe de volta e aí aí o ciclo recomeça do zero. É um loop ininterrupto de pensar, agir e observar, que só vai desligar quando a missão inteira estiver cumprida. Mas por que isso importa tanto? Porque essa lógica cíclica é exatamente o que permite a IA resolver

[4:06] problemas complexos e totalmente abertos, tipo arquitetar um software inteiro do zero ou fazer uma pesquisa acadêmica super densa. Na vida real, simplesmente não dá para prever no início quantos passos exatos uma tarefa dessas vai levar. O agente precisa tentar uma rota, observar se deu bom ou ruim e se for preciso corrigir o trajeto ali mesmo em tempo real. É lidando com essa bagunça e com a imprevisibilidade do mundo real que a Iá realmente brilha. Dá só uma olhada em como isso fica escrito no código. A gente vê uns blocos Jason que são de forma literal o monólogo interior da IA. É muito louco. Ali tá o exato milissegundo em que o cérebro instrui as mãos a fazerem a chamada de uma ferramenta. Nesse exemplo clássico, o modelo pensou, estruturou o comando em texto e acionou a função que busca o clima atual lá na cidade de Vancouver. é intenção crua, virando ação programática de forma super transparente. Avançando paraa sessão quatro, vamos entender essa ideia de construir a trajetória. Conforme o agente vai gerando naqueles ciclos que a gente viu, ele vai acumulando um

[5:06] histórico. Os desenvolvedores costumam chamar isso de trajetória. Na prática, o contexto total do agente acaba sendo a soma de duas coisas. A primeira é um prefixo estático que funciona como as regras do jogo. Tem ali a personalidade da IA e o manual de instrução das ferramentas. A segunda parte é a trajetória em si, a história viva daquela interação, tudo o que foi pedido, o que a Ia cobrou, as ferramentas que usou e o que conseguiu de resposta. É uma verdadeira bola de neve de informações que vai crescendo a cada passo. E aí vem o pulo do gato e um dos maiores desafios de engenharia atuais. Os modelos de linguagem, na sua essência sofrem de amnésia. Eles são o que a gente chama de stateless, ou seja, não guardam estado, não tem memória própria de uma chamada para outra. Isso significa que o framework que embala o agente tem o trabalho pesado de pegar toda essa trajetória gigantesca que não para de crescer e empurrar de volta pros olhos do modelo a cada novo ciclo, literalmente a cada loop. Se a infraestrutura falhar e não reenviar o

[6:07] histórico, a IA esquece na hora o que estava tentando resolver. O que nos traz a nossa quinta e última parada? Sessão C. Sabendo quando parar. Afinal, se o negócio é um loop infinito de ações, como ele percebe que acabou? O sistema depende de freios lógicos, as famosas condições de saída. O cenário perfeito, claro, é quando a tarefa é finalizada e a resposta final é entregue. Outro caminho natural é quando a IA decide que já tem dados suficientes e simplesmente não aciona mais nenhuma ferramenta. Mas e se der ruim no caminho, aí entram as travas de segurança vitais. Se o agente atingiu um limite máximo de ciclos ou se começar a empilhar erros numa espiral de confusão, o framework corta o barato e encerra a operação à força. É isso que impede a Ia de ficar girando em falso eternamente e fritando e servidores de graça. Pra gente fechar a nossa análise com chave de ouro, deixo aqui uma reflexão daquelas de perder o sono, tirada direto das análises da nossa fonte. Como é que a nossa vida e a nossa relação diária com a tecnologia vai mudar quando esses ciclos React saírem

[7:10] daquelas caixinhas inofensivas de chat e passarem a rodar de forma contínua, invisível e nativa no fundo dos nossos celulares e computadores. A gente acabou de dissecar a anatomia deles. Pensar, agir e observar. Entender esse motor de forma profunda hoje é absolutamente crucial, porque se é, sem dúvida, o primeiríssimo passo para nos prepararmos pra próxima era da computação que já está batendo na porta. Um abraço, pessoal, e até a próxima. Boa noite,
