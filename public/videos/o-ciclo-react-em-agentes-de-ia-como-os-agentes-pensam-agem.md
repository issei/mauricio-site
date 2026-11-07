# O Ciclo ReAct em Agentes de IA: Como os Agentes Pensam, Agem e Observam

Vídeo de Maurício Yokoyama Issei, publicado em 11 de setembro de 2026 (7 min 41 s).
Assistir: https://www.youtube.com/watch?v=9fUl8-hSIp0

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
