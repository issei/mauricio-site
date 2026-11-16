# Como conectar Agentes de IA ao Frontend (sem gambiarras): Conheça o Protocolo AG-UI

Agentes de IA não cabem no modelo de requisição e resposta das APIs REST. O AG-UI é um protocolo aberto, baseado em eventos, que liga o agente à interface do usuário. O vídeo mostra onde ele fica ao lado do MCP e do A2A, e os três pilares: estado compartilhado com deltas, interface generativa e interrupções para aprovação humana.

Vídeo de Maurício Yokoyama Issei, publicado em 2 de outubro de 2026 (8 min 8 s).
Assistir: https://www.youtube.com/watch?v=s-VWwbBEv90

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## O problema: o modelo de requisição e resposta

A documentação do protocolo diz: "Aplicações agênticas quebram o modelo simples de requisição e resposta" [01:03]. Antes, o cliente pedia, o servidor devolvia os dados, a tela renderizava e o ciclo fechava [01:03].

APIs REST e GraphQL são determinísticas e feitas para transações curtas, de um turno só [01:23]. Agentes de IA rodam de forma contínua, enviam respostas aos poucos por streaming e não são determinísticos [01:45].

Os agentes também misturam texto livre, voz e chamadas estruturadas de ferramentas, chamam subagentes no meio do caminho e precisam manter o estado por várias interações [02:07]. HTTP puro e WebSockets soltos precisam de uma camada nova, feita para isso [02:27].

## O ecossistema de protocolos

Os protocolos de IA se organizam em três partes [02:48]:

- **MCP**, da Anthropic: liga o agente às ferramentas e aos bancos de dados [02:48].
- **A2A**, do Google: organiza a conversa entre agentes [02:48].
- **AG-UI**: cuida só da interação entre o agente e o usuário [03:09].

Eles não competem: um complementa o outro [03:09].

O AG-UI é um padrão aberto, leve e baseado em eventos, que liga o frontend a qualquer backend de agente [03:30]. Ele padroniza como o estado, as ações do usuário e as respostas do agente circulam, para as equipes não reinventarem a conexão a cada projeto [03:30].

## Estado compartilhado

No AG-UI, o frontend e o agente leem e escrevem no mesmo estado, ao mesmo tempo [04:14]. O vídeo compara a um Google Docs compartilhado entre a máquina e a pessoa: a IA entende o que você clica, e a tela reage ao que a IA decide [04:14].

Para não sobrecarregar a rede, o protocolo envia só os state deltas, no padrão JSON Patch, com a alteração exata [04:34]. O estado inteiro (state snapshot) só vai no começo da conexão ou depois de um erro [04:54].

## Interface generativa

Com o AG-UI, o modelo pode devolver componentes de interface reais e tipados, que a aplicação mostra como widgets interativos [05:15]. Ele também aceita especificações como o A2UI do Google e o MCP-UI [05:15].

## Interrupções para aprovação humana

Às vezes o agente precisa perguntar antes de agir [05:36]. Ele pausa o fluxo, a interface avisa, e uma pessoa revisa, edita ou aprova a ação. Depois, a execução volta de onde parou, com o contexto intacto [05:58].

## Um ecossistema aberto

O AG-UI já se integra a frameworks como LangChain, CrewAI, Microsoft Agent Framework, Google ADK, Mastra e Pydantic AI [06:21]. Não prende a um fornecedor [06:41].

Como é um fluxo de eventos, ele não fica preso a um site em React. Roda em apps React Native, no Slack e no Microsoft Teams por SDKs prontos, e até no terminal [07:01].

## Perguntas frequentes

### O AG-UI substitui o MCP?

Não. O MCP liga o agente às ferramentas; o AG-UI liga o agente ao usuário. Eles se complementam [03:09].

### O agente pode pedir aprovação antes de agir?

Sim. Ele pausa, a pessoa revisa ou aprova, e a execução continua de onde parou [05:58].

## Fontes

- [Documentação oficial do AG-UI](https://docs.ag-ui.com/): A frase "aplicações agênticas quebram o modelo simples de requisição e resposta" e o estado compartilhado com deltas JSON Patch.
- [Repositório no GitHub](https://github.com/ag-ui-protocol/ag-ui): O AG-UI é um protocolo aberto, baseado em eventos, com integrações para vários frameworks de agentes.

Revisado por Maurício Yokoyama Issei em 16 de novembro de 2026.

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
