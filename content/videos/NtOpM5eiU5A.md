---
id: NtOpM5eiU5A
slug: google-ax-o-como-escalar-milhoes-de-agentes-de-ia
status: rascunho
temas:
  - engenharia-agentica
resumo: Agentes de IA guardam estado, rodam em loops e ficam muito tempo esperando, o que a infraestrutura feita para microsserviços não aguenta bem. O vídeo apresenta o Google AX, uma camada de orquestração de código aberto sobre o Kubernetes, com quatro primitivas, suspensão por snapshot, recuperação de falhas e isolamento com gVisor.
fontes:
  - url: https://github.com/google/ax
    titulo: Repositório oficial no GitHub
    sustenta: O AX é de código aberto, com licença Apache 2.0, e tem as primitivas Task, Workspace, Gateway e Model.
    verificada: false
  - url: https://agentexecutor.io/
    titulo: Site oficial do AX
    sustenta: O AX suspende agentes ociosos por snapshot e os retoma rápido, sem cold start.
    verificada: false
youtube:
  titulo: "Google AX: O Como Escalar Milhões de Agentes de IA"
  publicado_em: 2026-09-24
  duracao: PT10M3S
  descricao: |-
    Os agentes autônomos de IA não se comportam como microserviços tradicionais nem como tarefas em lote: eles acumulam estado, executam loops dinâmicos e exigem isolamento rigoroso de segurança e controle financeiro. Neste vídeo explicativo, analisamos o **Google AX**, o runtime de orquestração declarativa open-source desenvolvido pelo Google para gerenciar e escalar workloads de agentes em massa.

    Entenda como a arquitetura do AX utiliza manifests YAML declarativos no estilo Kubernetes para simplificar a infraestrutura e resolver os desafios de resiliência, densidade e recuperação de falhas.

    ---

    ### 🔍 **O que você vai aprender neste vídeo:**

    * **O Novo Paradigma de Workloads**: Por que a infraestrutura cloud-native tradicional tem dificuldades para lidar com a volatilidade dos agentes de IA.
    * **Os 4 Primitivos do Google AX**:
      * **Task**: Sandboxes leves e isoladas com limites de CPU e memória.
      * **Workspace**: Configuração prévia e automatizada com repositórios Git, servidores MCP e pacotes de habilidades (*skills*).
      * **Gateway**: Políticas rígidas de rede e allowlists de tráfego de saída (*egress*) para segurança Zero-Trust.
      * **Model**: Centralização de configurações de LLM e credenciais armazenadas em segredos do Kubernetes.
    * **Kernel Snapshots & Sub-second Resumption**: Como o AX e o gVisor pausam agentes ociosos e os retomam em menos de um segundo sem *cold-start*.
    * **Substrato de Alta Densidade**: Como o *Agent Substrate* multiplexa milhares de atores em hardware mínimo, zerando o custo de computação enquanto o agente aguarda respostas.
    * **CLI Fluente (`ax`)**: Comandos parecidos com o `kubectl` para interagir diretamente com as sandboxes (`ax apply`, `ax watch`, `ax ssh`, `ax suspend`, `ax resume`).

    ---

    ### 🔗 **Links Oficiais & Recursos Mencionados:**

    🌐 **Site Oficial do AX**: [https://agentexecutor.io/](https://agentexecutor.io/)  
    💻 **Repositório Oficial no GitHub**: [https://github.com/google/ax](https://github.com/google/ax)  
    📄 **Licença**: Apache 2.0 (Open Source)

    ---

    ### ⏱️ **Capítulos / Minutagem Sugerida:**

    * **00:00** - Introdução: O Desafio de Infraestrutura para Agentes de IA
    * **01:30** - O que é o Google AX?
    * **03:15** - Por que microserviços falham com Agentes?
    * **05:00** - Os 4 Primitivos: Task, Workspace, Gateway e Model
    * **08:20** - Kernel Snapshots & gVisor: Pausando e Retomando Atores
    * **10:45** - Agent Substrate e Eficiência de Custos
    * **12:30** - Mão na Massa: Utilizando a CLI do `ax`
    * **14:00** - Conclusão e Futuro da Orquestração Agêntica

    ---

    👉 **Inscreva-se no canal, deixe seu like e ative o sininho para acompanhar mais conteúdos sobre infraestrutura de IA e engenharia de software!**

    #GoogleAX #AgentesDeIA #ArtificialIntelligence #Kubernetes #OpenSource #DevOps #CloudNative #GoogleCloud
  miniatura: https://i.ytimg.com/vi/NtOpM5eiU5A/maxresdefault.jpg
  visualizacoes: 109
  playlists: []
  legenda: automatica
  links_descricao:
    - https://agentexecutor.io/](https://agentexecutor.io/
    - https://github.com/google/ax](https://github.com/google/ax
  coletado_em: 2026-11-07T22:16:07Z
---

## A infraestrutura não foi feita para agentes

O jeito como hospedamos software hoje não foi feito para agentes de IA [00:00]. Tratar agentes como aplicações web comuns pode derrubar o sistema ou estourar o orçamento [00:21].

Por mais de uma década, a nuvem, com o Kubernetes, foi otimizada para microsserviços: previsíveis, sem estado, que respondem em milissegundos e esquecem [00:43]. Os agentes são o contrário: rodam em loops, tomam decisões, escrevem código, guardam muito estado e esperam segundos pela resposta do modelo [01:05].

Isso traz três problemas [01:27]:

- **Custo:** um agente preso num loop dispara milhares de chamadas de API sem ninguém ver [01:27].
- **Segurança:** modelos que alucinam geram e rodam código desconhecido [01:27].
- **Gargalos:** o sistema tenta agendar milhões de microeventos sempre que um agente para para pensar [01:47].

## O que é o Google AX

O Google AX (Agent Executor) não substitui o Kubernetes: é uma camada de orquestração por cima dele, feita para atores que guardam estado e rodam por muito tempo [02:08]. Ele resume a complexidade em quatro primitivas declarativas, em YAML, no estilo do Kubernetes [02:29].

## As quatro primitivas

- **Task:** a menor unidade de execução, um sandbox isolado com limites rígidos de CPU e memória, barato de criar, pausar e descartar [02:50].
- **Workspace:** prepara o ambiente antes de o agente acordar, clonando repositórios Git e conectando servidores externos [03:11].
- **Gateway:** tranca o tráfego de saída; o agente só fala com endereços pré-aprovados, numa política de confiança zero [03:53].
- **Model:** centraliza as chaves de API e as configurações do modelo num só lugar [04:14].

## Escala e suspensão

O AX roda sobre o Agent Substrate. Como os agentes passam a maior parte do tempo esperando, o sistema empacota as sessões ociosas [04:34]. Segundo o vídeo, isso permite, em teoria, bilhões de sessões num cluster comum [04:54].

O ciclo de suspensão tem três passos [05:15]:

- O agente pergunta algo à IA e fica esperando [05:15].
- O AX tira um snapshot do estado do agente e o suspende; o consumo de processamento cai a zero [05:15].
- Quando a resposta chega, a tarefa volta. Segundo o vídeo, em menos de 200 milissegundos e sem cold start [05:35].

## Recuperação de falhas

O mascote é o axolote, a salamandra que regenera membros. Ele representa a ideia de regenerar agentes que falharam a partir de um snapshot do kernel [05:57].

Exemplo: um agente trabalha 3 horas limpando dados e encontra um erro. Na infraestrutura clássica, as 3 horas se perdem. Com o AX, o agente volta do último checkpoint [06:17].

## Segurança com gVisor

Contêineres comuns compartilham o kernel da máquina. Um código malicioso gerado por um agente poderia, em teoria, comprometer a máquina inteira [06:59].

O gVisor intercepta cada chamada de sistema do agente e emula o kernel num espaço isolado, para o código nunca tocar o hardware [07:21].

Para produção, o vídeo recomenda três passos [07:41]:

- isolar com o gVisor [08:02];
- restringir a rede com as listas do Gateway [08:02];
- passar todo o tráfego por um proxy controlado por pessoas, porque o AX não limita sozinho o gasto com APIs externas [08:02].

## Outros recursos

Dá para descrever o ambiente em inglês simples, como "configure um ambiente de desenvolvimento Python 3". O AX entrega o pedido a um agente interno, o Antigravity, que instala as ferramentas antes da tarefa começar [08:24].

O AX é de código aberto, com licença Apache 2.0, e funciona com o kubectl [09:06].

## Perguntas frequentes

### O Google AX substitui o Kubernetes?

Não. Ele é uma camada de orquestração que roda por cima do Kubernetes [02:08].

### O agente gasta processamento enquanto espera o modelo?

Não. O AX suspende o agente por snapshot, e o consumo cai a zero até a resposta chegar [05:15].
