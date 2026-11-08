# Desvendando o AHP: O Novo Protocolo para Agentes de IA

Vídeo de Maurício Yokoyama Issei, publicado em 24 de maio de 2026 (7 min 7 s).
Assistir: https://www.youtube.com/watch?v=-Qw7clMLTYg

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Dados e decisão](https://mauricio.issei.com.br/temas/dados-e-decisao)

## Sobre o vídeo

Bem-vindos ao "Desvendando o AHP"! Neste vídeo, fazemos um mergulho técnico profundo no Agent Host Protocol (AHP), um protocolo de servidor portátil e autônomo projetado para fornecer a múltiplos clientes uma visão sincronizada de sessões de agentes de IA
.
Se você trabalha com inteligência artificial, arquitetura de sistemas ou desenvolvimento de clientes/servidores, este vídeo vai te mostrar como o AHP resolve problemas complexos de sincronização em tempo real usando padrões arquiteturais modernos.

📌 O que você vai aprender neste vídeo:
Estado Multi-Cliente Sincronizado: Descubra como o AHP utiliza uma árvore de estado imutável (semelhante ao Redux) em cada canal, que sofre mutações exclusivamente através de reducers puros para garantir que todos os clientes vejam exatamente a mesma coisa
.
Canais Baseados em URI: Entenda a estrutura de roteamento do protocolo, onde cada interação vive em um canal específico, como ahp-root:// (para estados globais e catálogo de agentes), ahp-session:/{uuid} (para as conversas do agente) e terminais
.
Write-Ahead Reconciliation: Veja como o protocolo permite que clientes apliquem ações locais de forma otimista, reconciliando-as perfeitamente quando o servidor envia a confirmação junto com ações de outros clientes
.
Base no JSON-RPC 2.0: Como o AHP utiliza o formato JSON-RPC de forma independente do transporte subjacente (seja WebSocket, TCP, etc.)
.
Autenticação Padrão da Indústria: A implementação de segurança ágil por trás do protocolo, baseada nas semânticas RFC 9728 (OAuth 2.0) e RFC 6750 (Bearer Tokens)
.
Telemetria Nativa: A integração direta com o OpenTelemetry (OTel) no canal ahp-otlp: para exportação em tempo real de logs, métricas e traces
.
💡 Links Úteis:
A especificação do AHP utiliza a licença MIT e é copyright da Microsoft
.
O AHP permite versões compatíveis futuras (Forward-Compatible Versioning), facilitando a degradação graciosa para que clientes e servidores possam atualizar em seus próprios ritmos
.

#AgentHostProtocol #AHP #InteligenciaArtificial #AI #JSONRPC #ArquiteturaDeSoftware #OpenTelemetry #DesenvolvimentoWeb #Microsoft

## Transcrição

_Transcrição automática, não revisada._

[0:00] Boas-vindas a esta explicação detalhada sobre o Agent Host Protocol ou simplesmente HP. Essa é uma daquelas especificações novas e absolutamente fascinantes, desenhada do zero para resolver um dos grandes quebra-cabeças da engenharia atual. Como sincronizar sessões de agentes de inteligência artificial através de múltiplos clientes? Para quem constrói o futuro das ferramentas de entender as engrenagens desse protocolo é simplesmente essencial. Para fazermos um tour por essa maravilha arquitetônica, vamos passar pelos seguintes pontos: sessões multiciliente, a Fundação Jason RPC, os canais de ponta a ponta, a exploração dos canais principais, o ciclo de vida de conexão e autenticação e, por fim, o versionamento pro futuro. Ponto um, sessões multiciliente. O caminho para o MA sem colisões. Bom, vamos direto ao problema central. Imaginem o seguinte cenário. Temos uma

[1:01] IDE, um ambiente de desenvolvimento integrado super moderno com IA e uma interface de linha de comando. Ambas estão interagindo com o mesmo agente de IA ao mesmo tempo. Manter as visualizações desses dois clientes perfeitamente sincronizadas é um desafio arquitetônico brutal. Como múltiplos clientes podem compartilhar uma única sessão sem que o estado vire uma verdadeira bagunça cheia de colisões? E o Agent Host Protocol entra em cena resolvendo isso de um jeito brilhante. Ele dá a cada cliente uma árvore de estado imutável, muito parecida com a arquitetura Redux, que a gente já conhece. O estado só muda através de ações passando por redutores puros. Assim, as mutações simultâneas são resolvidas em tempo real através de reconciliação otimista. é elegante e extremamente eficiente. Seguindo pra parte dois, Fundação Jason RPC, entendendo a base da comunicação. Antes de mergulhar nas interações dos agentes, precisamos olhar pro encanamento disso tudo. O HIEP é construído em cima do Jason RPC 2.0. Isso quer dizer que toda

[2:03] mensagem na rede cai em uma de duas categorias bem rígidas. ou é uma request que exige um ID e espera exatamente uma resposta correlacionada, ou é uma notification que não tem ID e funciona num estilo dispare e esquece sem esperar resposta nenhuma. E essa herança do Jason RPC traz um framework de tratamento de erros sensacional e padronizado. Estamos falando de códigos negativos fixos como -32700 para erros de análise sintática ou -32600 para requisições inválidas. Isso mantém a comunicação altamente previsível e padronizada, independentemente do transporte que estivermos usando. Parte três. Canais de ponta a ponta. A verdadeira espinha dorsal do protocolo. Canais de ponta a ponta. Esse é um mantra que se repete pela especificação e é, sem dúvida, a inovação central do HP. O protocolo abandona a ideia de end points soltos e trata absolutamente toda a interação

[3:04] como uma assinatura do tipo poste para um canal específico. O pulo do gato aqui é que cada comando e notificação carrega uma ural lá no nível superior. Ou seja, as mensagens são roteadas inspecionando apenas a tupla de método e canal. Não tem necessidade de analisar o payload inteiro para saber para onde a mensagem vai. Isso permite que servidores intermediários roteem o gráfico de olhos fechados. e que os clientes carreguem dados sob demanda de uma forma incrivelmente otimizada. Sessção quatro, explorando os canais principais a fundo. Uma analogia legal é pensar no canal raiz, o apzo como o diretório principal no saguão de um prédio. Ele tem o estado global. Já os canais de sessão e de terminal são como salas privadas. O detalhe é, nós não recebemos o que acontece nessas salas por padrão. Os clientes precisam ativamente se inscrever nessas uris para receber o estado das conversas ou dos terminais. E o ciclo de vida dessas salas virtuais é bem dinâmico. Primeiro, o cliente pede

[4:05] um create session passando um uud que ele mesmo escolheu. O servidor acata e começa a transmitir os envelopes de ação em tempo real. E quando o trabalho termina, o cliente manda um dispose session e desmonta os recursos lá no backend com total segurança. Mas atenção para essa exceção genial no designer. A reconciliação otimista que mencionamos lá atrás não é segura para pseudoterminais que carregam muito estado. Por isso, no canal de terminal, a entrada e a saída são divididas de propósito. O input que enviamos é só uma ação de efeito colateral. Já o output, os data que voltam do servidor são autoritativos. Isso evita que o cliente tente prever resultados complexos de linha de comando e acabe estragando a visualização. Cinco. Autenticação e ciclo de vida, a garantia de segurança e conexão contínua. Com a casa construída, precisamos falar de segurança. O AHP, inteligentemente, mantém a autenticação totalmente fora do estado global. Ele usa os fluxos padrão ou Athic 2.0 por

[5:07] conexão. O cliente lê os metadados no canal raiz, pega um token e o envia proativamente. E sabe o que é mais legal? Os requisitos podem ser por agente. Numa mesma conexão, um agente pode pedir um token do GitHub e outro pode exigir credenciais da WS. É super flexível. Claro, se estamos falando de agentes na nuvem, a conexão vai cair uma hora ou outra. Quando isso acontece, disparamos um request de reconnect. O servidor tem um buffer de ações e tenta reproduzir os envelopes que perdemos. Mas se ficarmos offline por muito tempo e esse gap exceder o buffer, não tem problema. O servidor manda um instantâneo novinho daquele estado. Só lembrando que notificações do protocolo são efêmeras, então elas nunca são reproduzidas. Chegando na reta final, ponto se version e o futuro, um protocolo pronto para evoluir. Logo no aperto de mão inicial, o cliente manda uma lista ordenada com as versões sem ver que ele suporta. O servidor olha aquilo, escolhe a versão mais alta que ele entende e pronto. Essa versão

[6:08] negociada fica travada durante toda a vida útil daquela conexão. Isso garante que clientes novinhos em folha conversem perfeitamente com hosts mais antigos sem dor de cabeça. Além disso, a filosofia do protocolo é capacidades. Primeiro, em vez de quebrar tudo com novas versões principais o tempo todo, os novos recursos chegam primeiro como flags de capacidade opcionais. Isso previne o famoso lock em diversão e dá espaço para todo mundo experimentar inovações antes delas virarem requisitos obrigatórios. Então, para fechar a nossa exploração, fica a grande a reflexão. Quais novos ambientes, interfaces colaborativas absurdas vão surgir agora que o estado de um agente de A pode ser compartilhado perfeitamente e sem colisões entre múltiplos clientes? O potencial para revolucionar a forma como trabalhamos em conjunto com a inteligência artificial é gigantesco. Muito obrigada por acompanharem essa imersão na arquitetura dopéx.
