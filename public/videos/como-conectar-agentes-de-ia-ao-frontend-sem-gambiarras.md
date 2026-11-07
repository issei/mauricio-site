# Como conectar Agentes de IA ao Frontend (sem gambiarras): Conheça o Protocolo AG-UI

Vídeo de Maurício Yokoyama Issei, publicado em 2 de outubro de 2026 (8 min 8 s).
Assistir: https://www.youtube.com/watch?v=s-VWwbBEv90

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

Por que a arquitetura tradicional de APIs e requisições HTTP quebra ao tentar conectar Agentes de IA a interfaces de usuário? Neste vídeo explicativo de 7 minutos, você vai entender como o **AG-UI Protocol (Agent–User Interaction Protocol)** resolve o gargalo de comunicação entre agentes autônomos e aplicações frontend.

Aprenda como o AG-UI se posiciona no ecossistema ao lado do **MCP** (Model Context Protocol) e do **A2A** (Agent-to-Agent), e descubra os três pilares que tornam o protocolo único: **Estado Compartilhado em tempo real** (via deltas JSON Patch), **Generative UI** e **Fluxos de Interrupção Humana (Human-in-the-Loop)**.

---

⏱️ **Capítulos do Vídeo:**
* **0:00** - O Ponto de Ruptura: Por que a web tradicional não foi feita para Agentes
* **1:45** - O Ecossistema de Protocolos: MCP, A2A e o papel do AG-UI
* **3:30** - A Solução na Prática: Estado Compartilhado, Generative UI e Interrupções
* **5:15** - Interoperabilidade e Impacto: Suporte a múltiplos frameworks e clientes

---

💡 **Principais Tópicos Cobertos:**
* **O Problema das APIs REST/GraphQL**: Agentes são assíncronos, de longa duração e não-determinísticos, exigindo um fluxo de comunicação contínuo em vez de requisições estáticas.
* **A Tríade de Protocolos de IA**:
  * **MCP**: Conecta o agente a ferramentas e fontes de dados.
  * **A2A**: Coordena a comunicação entre diferentes agentes.
  * **AG-UI**: Conecta o agente à interface e ao usuário final.
* **Recursos do AG-UI**:
  * Sincronização eficiente de estado com `STATE_DELTA` (JSON Patch RFC 6902).
  * Renderização de componentes visuais dinâmicos (Generative UI).
  * Pausa e retomada segura para aprovação humana (Interrupts).
* **Ecossistema Aberto**: Suporte para LangChain, CrewAI, Google ADK, Mastra, Microsoft Agent Framework, Pydantic AI e muito mais.

---

🔗 **Links Úteis e Documentação:**
* Documentação Oficial do AG-UI: https://docs.ag-ui.com/
* Repositório no GitHub: https://github.com/ag-ui-protocol/ag-ui
* Testes Interativos no AG-UI Dojo: https://dojo.ag-ui.com/

---

#IA #AIAgents #AGUI #Frontend #SoftwareEngineering #GenerativeUI #LangChain #CrewAI #GoogleADK #CopilotKit #WebDevelopment

## Transcrição

_Transcrição automática, não revisada._

[0:00] E aí, pessoal, tudo bem? Boas-vindas a mais uma análise aqui com a gente. Hoje nós vamos mergulhar em uma verdadeira mudança de paradigma na forma como conectamos agentes de inteligência artificial às nossas aplicações frontend. Olha, para quem respira engenharia e produto, esse é um momento simplesmente fascinante. Pensa bem, a gente passou décadas dominando a arte de construir interfaces que conversam com os servidores, mas a era da IA jogou uma complexidade totalmente nova no nosso colo. E é exatamente aí que o protocolo AGui entra em cena. Vamos explorar como esse padrão tá resolvendo de vez a peça que faltava naquele quebra-cabeça da comunicação entre nós, humanos e os agentes. Para organizar a nossa análise, a gente dividiu o conteúdo em quatro atos bem objetivos. Um, o problema. Dois, o ecossistema. Três, a solução na prática. E para fechar o impacto de tudo isso, então vamos direto ao ato um, o problema, ou melhor, por que a gente precisa quebrar o modelo de requisição e resposta?

[1:01] Durante muito, mas muito tempo mesmo, a web operou num ritmo super previsível, né? Mas tem uma frase na documentação do protocolo que acerta na mosca. Ela diz: "Aplicações agênticas quebram o simples modelo de requisição e resposta". Naquela era pré-agêntica, a lógica era simples. O cliente faz um pedido, o servidor cospe os dados de volta, a tela renderiza e fim de papo, um ciclo fechadinho. Só que agentes de IA simplesmente não jogam esse jogo. O contraste chega a gritar. Olha só, de um lado da balança a gente tem as APIs Rest e o Graph QL. Ferramentas fantásticas, claro, mas rígidas, determinísticas, feitas para transações curtas de um turno só, tipo uma partida de ping-pong. Do outro lado tão os agentes de IA. A parada deles é execução contínua. Eles vão enviando respostas aos poucos via streaming e são, por natureza não determinísticos. Tentar forçar um agente super dinâmico a passar por uma API REST tradicional é, sei lá, é tipo tentar passar um rio inteiro por um canudinho, sabe? A infraestrutura antiga não

[2:02] aguenta essa fluidez toda. O grande ponto aqui é que agentes precisam de muito mais do que só uma chamada e uma resposta. A gente tá falando de misturar tudo ao mesmo tempo. Texto livre, voz. chamadas estruturadas de ferramentas. Além disso, eles exigem o que a gente chama de composição interativa. Muitas vezes eles chamam outros subagentes no meio do caminho. E o mais importante de tudo, eles precisam lembrar das coisas, manter o estado ali vivo ao longo de várias e várias interações. Fica bem claro que as fundações clássicas da web, tipo HTTP puro e web socket soltos, precisam urgente de uma camada nova, uma abstração feita sob medida para essa era agêntica. O ecossistema. Vamos mapear como tá ficando essa nova steack agêntica. O ecossistema de protocolos para IA tá se organizando em três pilares principais. Primeiro, a gente tem o famoso MCP criado pela Antropic, que é quem conecta o agente às ferramentas e aos bancos de dados. um baita avanço. Depois a gente tem o padrão A2A do Google, que organiza a

[3:03] conversa entre um agente e outro agente dentro de um sistema complexo. E finalmente a peça que fecha e se quebra-cabeça de vez, o AG UI, focado única e exclusivamente na interação entre o agente e o usuário. É super importante sacar que eles não estão competindo entre si, tá? Na verdade, eles formam meio que um time dos sonhos na Steack moderna, um complementa o outro. Então, trocando em miúdos, como a gente define o ADI e o Y? Basicamente, ele é um padrão aberto, super leve, baseado em eventos, que serve de ponte entre o seu front end e literalmente qualquer back end de ele cria uma padronização de como o estado, as intenções de clique do usuário e as respostas do agente viajam para lá e para cá. O verdadeiro pulo do gato aqui é que as equipes agora conseguem entregar features de IA super robustas e fáceis de debugar, sem ter que ficar reinventando a roda ou criando gambiarras de conexão do zero a cada projeto novo. A solução na prática. Hora de olhar pros pilares técnicos centrais que fazem a mágica acontecer. Explorando a engenharia da coisa, o

[4:05] primeiro grande pilar é o famoso shared state ou estado compartilhado. Em um app normal, o front end e o backend costumam viver em mundos meio isolados, mas no ADI UI, o estado compartilhado é tipo uma store pada que fica ali persistente. O mais sensacional disso é que tanto o agente de A quanto a tela do usuário podem ler e escrever nessa mesma base de dados ao mesmo tempo. É tipo um Google Docs compartilhado entre a máquina e o humano, criando um loop de colaboração instantâneo. A IA entende o que você clica e a tela reage na hora ao que a IA decide. Mas aí você me pergunta: "Bom, como isso tudo funciona sem derrubar a rede de tanto tráfego?" É aí que entra uma arquitetura de atualização super inteligente. Em vez de enviar aquele pacote gigante com todos os dados a cada microalteração, o protocolo usa os chamados state deltas. Usando um padrão bem conhecido, o Jason Patch, só vai pela rede a alteração exata que aconteceu, aquela atualização pequenininha, sabe? Mandar o estado inteiro, os state snapshots só acontece no começo da conexão para sincronizar ou

[5:05] se der algum erro. O resultado um app absurdamente rápido e que economiza muita, mas muita banda. Outra sacada genial nativa desse protocolo é o suporte a interfaces generativas. O Jui já passou daquela fase de sócos p texto puro na tela. Ele permite que o modelo devolva componentes de UI reais tipados que a sua aplicação renderiza como widgets totalmente interativos. E olha só, como é um padrão totalmente aberto, ele já aceita de forma nativa especificações fresquinhas do mercado, tipo o A2 UI do Google e o MCP UI da Microsoft. Ele funciona como a estrada perfeita para essas interfaces chegarem até o usuário sem quebrar no meio do caminho. Agora vamos para uma funcionalidade que é absolutamente crítica na vida real, o ciclo de interrupções. Porque, vamos ser sinceros, a gente não pode simplesmente deixar a e a fazer tudo sozinha o tempo todo. Às vezes o agente precisa parar e perguntar: "Ei, posso fazer isso?" O agente pausa o fluxo, a interface avisa e um humano entra para revisar, editar ou dar o OK nessa ação sensível. Depois disso, a execução volta exatamente de

[6:07] onde parou, com todo o contexto intacto. É o famosíssimo conceito de humano, só que tratado como uma funcionalidade VIP direto no protocolo. E finalmente, ato quatro, o impacto. Vamos falar de interoperabilidade aberta. Para uma tecnologia virar um padrão de verdade, a comunidade tem que abraçar, certo? E a lista de frameworks que já integram com o Wi é de dar inveja. A gente tá falando desde os queridinhos da comunidade como Lenchain e Crew AI até gigantes corporativos como o Microsoft Agent Framework e o Google ADK, além de ferramentas modernas tipo Mastra e Pidentic AI. A mensagem que fica é super clara. O AI passa longe de ser aquele jardim murado onde você fica preso a um fornecedor só. É um ecossistema 100% aberto e adaptável. E do lado do cliente, a mesma história, flexibilidade total. Pensa comigo, como o ADUI é no fundo um fluxo contínuo de eventos e não um código preso a um tipo específico de tela, ele não fica restrito a um site em React. Ele roda redondo em aplicativos

[7:08] mobile usando React Native. Brilha em plataformas corporativas de chat como Slack e Microsoft Teams por meio de SDKs prontos. E para quem é raiz, funciona até direto no terminal de comando. Você cria a inteligência do agente uma vez só e distribui para qualquer interface seguindo o mesmo padrão. Uma maravilha. Bom, nós chegamos ao final dessa nossa imersão de hoje. A gente viu de perto como o Aidui resolve aquela dor de cabeça do modelo antigo de requisição e resposta. Vimos como ele se encaixa perfeitamente ao lado de caras como o MCP, a elegância de sincronizar estado via deltas e o quanto a indústria já tá comprando essa ideia. A grande reflexão que a gente quer deixar para todo mundo que constrói tecnologia hoje é a seguinte: com essas fundações finalmente estabelecidas de um jeito aberto e padronizado, como as equipes vão aproveitar essa arquitetura para construir a próxima grande geração de aplicações com IA? Fica aí a provocação para pensar, pessoal. Muito obrigado por acompanharem mais essa análise com a gente e até a próxima. Boa noite,
