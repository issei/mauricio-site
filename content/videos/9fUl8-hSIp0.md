---
id: 9fUl8-hSIp0
slug: o-ciclo-react-em-agentes-de-ia-como-os-agentes-pensam-agem
status: publicado
temas:
  - engenharia-agentica
resumo: O vídeo explica o ciclo ReAct, que faz um agente de IA raciocinar e agir em ciclos de pensar, agir e observar. Mostra a anatomia do agente (modelo, contexto e ferramentas), como a trajetória se acumula e é reenviada ao modelo a cada ciclo e quais condições encerram o loop.
fontes:
  - url: https://github.com/bojieli/ai-agent-book
    titulo: "bojieli/ai-agent-book: 《深入理解 AI Agent：设计原理与工程实践》（李博杰 著）开源主仓库：全书正文、编译版 PDF 与按章配套代码"
    sustenta: O livro de Li Bojie, base do vídeo segundo a descrição, tem como fórmula central "Agent = LLM + 上下文 + 工具" (agente = LLM + contexto + ferramentas) e tem versão em português do Brasil.
    verificada: true
revisado_por: Maurício Yokoyama Issei
revisado_em: 2026-11-19
youtube:
  titulo: "O Ciclo ReAct em Agentes de IA: Como os Agentes Pensam, Agem e Observam"
  publicado_em: 2026-09-11
  duracao: PT7M41S
  descricao: |-
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
  miniatura: https://i.ytimg.com/vi/9fUl8-hSIp0/maxresdefault.jpg
  visualizacoes: 57
  playlists: []
  legenda: automatica
  links_descricao:
    - https://github.com/bojieli/ai-agent-book
    - https://bojieli.github.io/ai-agent-book/
    - https://github.com/bojieli/ai-agent-book/releases/download/latest/AI-Agents-in-Depth-zh-CN.pdf
    - https://github.com/bojieli/ai-agent-book/releases/download/latest/AI-Agents-in-Depth-ptbr.pdf
  coletado_em: 2026-11-07T22:16:07Z
---

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
