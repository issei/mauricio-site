# Google AX: O Como Escalar Milhões de Agentes de IA

Vídeo de Maurício Yokoyama Issei, publicado em 24 de setembro de 2026 (10 min 3 s).
Assistir: https://www.youtube.com/watch?v=NtOpM5eiU5A

## Sobre o vídeo

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

## Transcrição

_Transcrição automática, não revisada._

[0:00] E aí, pessoal? Hoje a gente vai entrar de cabeça num assunto que é meio que uma crise invisível rolando no mundo da tecnologia agora mesmo. Sabe essa revolução toda da inteligência artificial? Pois é, nas sombras dela tem um problema brutal e silencioso que quase ninguém tá discutindo abertamente. O jeito que a gente hospeda e roda os nossos softwares hoje simplesmente não foi feito pra era dos agentes de IA. Isso leva a gente direto pra grande questão. Será que a nossa infraestrutura atual de nuvem tá realmente pronta para aguentar enxames de agentes autônomos? A dura realidade é que tratar agentes de como se fossem aplicações de web tradicionais é a receita perfeita pro colapso do sistema, ou pior, pra falência financeira de uma empresa. Mas afinal, por que isso acontece? Vamos entender a raiz dessa tensão. Para entender onde o bicho pega, é só olhar um pouquinho pro passado. Por mais de uma década, a infraestrutura de nuvem, como cubernetes, foi totalmente otimizada para microsserviços tradicionais. Esses serviços são passivos super previsíveis e não guardam o estado. Eles recebem uma requisição,

[1:01] respondem milissegundos e esquecem o que acabou de acontecer. Só que a gente de são uma fera completamente diferente. Eles são ativos, totalmente imprevisíveis. Eles rodam em loops recursivos, tomam decisões, escrevem código e o mais importante carrega um peso de estado enorme. Eles literalmente pausam para pensar e ficam esperando as respostas dos modelos por vários segundos. E jogar essa carga de trabalho pesada e imprevisível na arquitetura antiga gera consequências bem reais. Primeiro, o ralo financeiro. Imagina um agente preso num loop infinito disparando milhares de chamadas de API sem ninguém supervisionar. O orçamento da empresa vai pro ralo num piscar de olhos. Segundo, o risco de segurança é assustador. A gente tá pedindo para modelos que às vezes dão umas belas alucinadas gerarem e rodarem códigos desconhecidos. Dar acesso irrestrito para eles é literalmente como entregar as chaves do servidor principal para um estranho. E por fim, os gargalos massivos. O sistema entra em colapso tentando agendar milhões de microeventos toda vez que um agente para para pensar. E é exatamente aí que entra a grande

[2:02] sacada de hoje, o Google AX ou Agent Executor. O pessoal do Google percebeu que a gente precisava de um verdadeiro salto evolutivo. E olha, o Ajax não vem para substituir o Kubernets, ele se encaixa por cima como uma nova camada de orquestração de altíssimo rendimento. Ele foi construído do zero especificamente para lidar com esses atores que carregam o estado, que t picos de atividade e que rodam por muito tempo. Ele traz a durabilidade necessária para gerenciar populações gigantes de IA de forma segura. O mais genial desse sistema é como ele organiza o caos. Em vez daqueles scripts improvisados e bagunçados, o Atex resume toda a complexidade em apenas quatro primitivas declarativas básicas. Para quem já mexe com Yamo e Cubernetes, isso aqui vai ser extremamente familiar. Essas peças gerenciam com perfeição os limites do trabalho do agente. Vamos dar uma olhada em cada uma delas para entender como essa engrenagem roda. A primeira peça é a task ou tarefa. Ela é a menor unidade de execução da operação. Pensem nela como aquela caixa de areia, o sandbox isolado, onde o código do

[3:04] agente, que não é totalmente confiável, vai rodar. É aqui que são definidos limites muito estritos e inegociáveis de uso de CPU e de memória. É um ambiente desenhado para ser barato de criar, pausar e jogar fora quando não for mais necessário. Logo depois vem o workspace, o espaço de trabalho. Preparar o ambiente para um agente começar a rodar costuma ser bem entediante, mas o workspace resolve isso pré-configurando todas as dependências antes mesmo do agente acordar. Ele clona os repositórios do Git, conecta servidores externos e deixa tudo quentinho e pronto. Ou seja, quando a gente nasce, ele já tá com todas as ferramentas de que precisa nas mãos. A terceira primitiva é fundamental, o gateway. Essa é a fronteira de segurança da rede. Pensa no seguinte, no ambiente tradicional, se um agente é comprometido, ele pode tentar escanear toda a rede interna da organização. O gateway corta as asinhas dele, trancando todo o tráfego de saída. O agente só consegue se comunicar com uma lista bem

[4:05] explícita de endereços que já foram pré-aprovados. É uma política de confiança zero aplicada direto na raiz. E para fechar esse quateto temos o model. Em vez de deixar chaves de API e configurações espalhadas por 50 arquivos diferentes, o AKA centraliza tudo o model e super segura. Se for necessário rotacionar uma chave de segurança ou atualizar a versão da inteligência artificial, a alteração é feita num lugar só e a plataforma cuida do resto com segurança, usando os recursos nativos do cluster. Agora, o ponto crucial aqui é a escala. E aí que a palavra bilhões entra na jogada. O AX roda em cima de uma base chamada agent substrate. Como os agentes passam a maior parte do tempo ociosos esperando um humano aprovar uma ação ou aí a responder, o sistema faz uma multiplexação absurdamente densa. Ele empacota essas sessões ociosas, o que teoricamente permite que um cluster comum suporte bilhões de sessões de agentes simultâneas. Vamos observar como

[5:05] funciona a relação de causa e efeito aqui, porque essa é a verdadeira mágica financeira da plataforma. Na nuvem, tempo de espera normal significa queimar dinheiro, mas o ax inverte isso com um ciclo de suspensão muito elegante. Passo um, o agente faz uma pergunta para IA e fica lá parado aguardando. Passo dois, o Ax captura um snapshot, uma foto exata do estado daquele agente e o suspende. O consumo de processamento cai instantaneamente para zero. O agente não custa absolutamente nada enquanto espera. E aí no passo três, quando a resposta chega, a tarefa é retomada. E o mais incrível é a velocidade com que essa retomada acontece. Estamos falando de um tempo inferior a 200 msundos. Quando a resposta do modelo chega, aquele agente que estava lá congelado na foto do snapshot acorda quase instantaneamente. Não tem aquele atraso terrível, o famoso cold start, a partida fria que assombra computação tradicional. O agente simplesmente continua o raciocínio a partir do exato milissegundo em que ele parou. Para

[6:06] tornar isso memorável, vale a pena olhar pro mascote do projeto, o axolote. Para quem não lembra, o axolote é uma salamandra famosa na biologia pela capacidade extrema de regenerar membros inteiros perdidos. E a escolha não foi por acaso. O mascote carrega a filosofia central de design do Google X, a capacidade de regenerar agentes que falharam ou travaram completamente, puxando tudo de volta a partir de um snapshot profundo do Kernel. Olhando pra prática, a diferença é brutal. Qualquer desenvolvedor conhece este roteiro de fracasso. Um agente trabalha por 3 horas limpando dados, encontra um erro inesperado e morre. Na infraestrutura clássica, perdem-se essas 3 horas e é preciso reiniciar tudo do zerro. Com o mecanismo de recuperação do AFEX, o agente é simplesmente regenerado a partir do último checkpoint. O cliente reconecta e a operação continua como se nada tivesse acontecido. É um baita salvavidas operacional. Mas a gente precisa falar sobre o elefante na sala, a segurança. A dura realidade é que rodar código de IA em contêiner padrão é

[7:09] um jogo perigoso porque eles compartilham o kernel da máquina hospedeira. Se o modelo de A endoidar, gerar um código malicioso ou for harackeado, ele poderia teoricamente comprometer a máquina física inteira. Simplesmente não dá para confiar cegamente no código que esses agentes escrevem. A resposta técnica para essa vulnerabilidade crítica é o Gvisor. O Gvisor funciona como uma cerca de segurança impenetrável. Ele intercepta a cada chamada de sistema que o código do agente tenta fazer pro núcleo da máquina. Ao invés de deixar passar direto, o Gevisor emula o kernel num espaço isolado de usuário. Então, mesmo que o agente esteja rodando um código completamente alucinado e perigoso, ele fica preso dentro dessa caixa sem nunca encostar no hardware físico de verdade. Com essa fundação montada, a gente vê os passos lógicos para colocar isso em produção de um jeito seguro. O AX fornece as ferramentas, mas são os operadores humanos que precisam apertar os parafusos. Primeiro, aplicar o isolamento físico com o V visor. Segundo, restringir brutalmente a rede

[8:09] com as listas do gateway. E o terceiro, que é vital. Como o AX não limita nativamente a grana gasta nas APIs externas, todo o tráfego precisa passar por um proxy controlado por um humano. Assim, garante-se que nenhum agente vai estourar o orçamento da empresa. Agora, uma coisa que eleva essa arquitetura para outro nível é a camada generativa incorporada. A preparação do workspace não precisa mais ser um trabalho braçal. Dá para literalmente descrever um ambiente necessário em inglês simples, tipo: configure um ambiente de desenvolvimento Python 3. O ABX entrega esse pedido para um agente interno muito bacana chamado Antigravity, que trabalha nos bastidores instalando ferramentas e verificando dependências antes mesmo da tarefa principal começar a rodar. Tudo isso seria só uma teoria elegante se o Google tivesse trancado a tecnologia a sete chaves, né? Mas eles tomaram uma decisão de generosidade estratégica. O AC é um projeto de código aberto gratuito sob a licença parte de 2.0. Isso significa que não tem aquela prisão

[9:11] tecnológica com o fornecedor, o famoso vendor lockin. Os dados continuam inteiramente sob o controle de quem opera o sistema. E para quem já passa o dia no ecossistema Cobernets, ele se integra naturalmente com a ferramenta QBCTL. A curva de aprendizado é quase nula. E tudo isso leva a gente para uma reflexão final que resume bem a importância dessa arquitetura. Quando a gente finalmente resolve esses problemas brutais e caros de infraestrutura, trazendo isolamento agressivo, suspensão sem custos e uma recuperação perfeita de falhas, a gente para de lutar contra os servidores e começa a focar de verdade no produto. Com essa base de controle absoluto finalmente disponível, a pergunta provocativa que fica é: quão complexos, incríveis e ambiciosos serão os agentes de A que nós seremos capazes de construir amanhã?
