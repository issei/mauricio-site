# O Fim do "Chat" na IA? Conheça o A2UI, a Revolução Visual do Google para 2026!

O vídeo apresenta o A2UI (Agent-to-User Interface), protocolo de código aberto do Google em que o agente de IA descreve uma interface em dados estruturados e o aplicativo a monta com os próprios componentes. Explica o fluxo, os princípios, a relação com AG-UI e A2A, o uso em aparelhos antigos e o que está previsto para 2026.

Vídeo de Maurício Yokoyama Issei, publicado em 23 de dezembro de 2025 (7 min 17 s).
Assistir: https://www.youtube.com/watch?v=LASZw1QGELM

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## Do texto à interface

Hoje, a interação com um agente de IA é quase toda por texto: para marcar um compromisso, vem uma pergunta de cada vez; para entender dados, a IA descreve o gráfico em vez de mostrá-lo [00:00].

Na comparação do vídeo, a conversa picada (que dia, que horas, quantas pessoas) vira um único pedido que gera um formulário de reserva interativo já preenchido. Essa é a promessa do A2UI, do Google [00:41].

## O que é o A2UI

A2UI significa Agent-to-User Interface. É um protocolo de código aberto do Google que permite aos agentes gerar interfaces completas e interativas, como formulários e gráficos, enviando só dados estruturados [01:24].

Segundo o vídeo, o protocolo foi anunciado em 15 de dezembro de 2025 para padronizar a forma como os agentes mostram as coisas [01:24].

O problema que ele resolve aparece na malha de agentes: um agente do nosso aplicativo pode chamar o agente de outra empresa, e esse agente remoto não pode mexer direto na interface do app [01:45].

## Uma planta baixa, não código

O A2UI não envia código para ser executado, o que seria arriscado. Envia uma planta baixa, pensada para segurança e flexibilidade [02:06].

O vídeo cita o blog do Google: "seguro como dados, mas expressivo como código". O agente descreve a interface, e quem a constrói é o próprio aplicativo, com as peças que ele já conhece [02:28].

O fluxo tem três passos [02:28]:

1. O agente envia a planta baixa em JSON, só uma descrição da interface [02:50].
2. O aplicativo compara a descrição com o seu catálogo de componentes confiáveis [02:50].
3. O aplicativo monta a interface com os próprios componentes nativos [03:10].

Os princípios do projeto são três [03:10]:

- segurança primeiro: trafegam dados, não código executável [03:10];
- amigável para LLMs: a estrutura é simples, fácil de gerar e de enviar aos poucos [03:10];
- independente de plataforma: a mesma resposta vira interface nativa na web, em Flutter ou em Angular [03:32].

## Onde o A2UI se encaixa

Há duas filosofias. O A2UI é nativo primeiro: a interface gerada herda o estilo e a segurança do aplicativo [03:54]. Segundo o vídeo, concorrentes como a OpenAI e a Anthropic renderizam HTML numa caixa de areia isolada, e o resultado parece separado do resto do app [04:15].

A2UI, AG-UI e A2A não competem; são camadas [04:15]:

- o A2UI define o formato da interface [04:36];
- o AG-UI, de parceiros como a CopilotKit, cuida do transporte e da comunicação [04:36];
- o A2A permite que agentes conversem entre si [04:36].

## Além dos chatbots

Segundo o vídeo, o mundo produziu 62 milhões de toneladas de lixo eletrônico em 2022, e muitos tablets e celulares vão para o lixo porque não rodam mais os softwares modernos, e não porque o hardware quebrou [04:58].

O A2UI permite uma arquitetura de cliente magro: o processamento fica na nuvem, e o aparelho antigo só renderiza a interface que a IA envia. Isso pode dar vida nova a muitos dispositivos [05:19].

No mundo corporativo, o Gemini Enterprise já usa o A2UI para gerar formulários dinâmicos, painéis de aprovação e visualizações de dados interativas [05:40].

## O que vem por aí

Segundo o vídeo, o projeto está em preview público. Renderizadores para React, SwiftUI e Jetpack Compose estão previstos para 2026, com a versão 1.0 estável no fim do ano [06:23].

O projeto envolve times internos do Google e parceiros externos, como a CopilotKit e a equipe do Flutter [06:44].

## Perguntas frequentes

### O A2UI envia código para o aplicativo executar?

Não. Envia uma descrição da interface em JSON, e o aplicativo monta a tela com os próprios componentes [02:50].

### O A2UI substitui o AG-UI ou o A2A?

Não. O A2UI define o formato da interface, o AG-UI cuida do transporte e o A2A liga os agentes entre si [04:36].

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

A Inteligência Artificial vai parar de apenas "falar" e vai começar a "mostrar". Você está preparado para o A2UI (Agent-to-User Interface)?

Neste vídeo, mergulhamos no novo protocolo de código aberto do Google que promete mudar para sempre como interagimos com agentes de IA. Esqueça o vaivém infinito de mensagens de texto. Com o A2UI, a IA gera interfaces visuais dinâmicas, formulários e botões em tempo real, diretamente na sua tela.

O que você vai aprender neste vídeo: ✅ O que é o protocolo A2UI e por que ele é diferente do que temos hoje. ✅ Como a IA passará a criar interfaces (UI) nativas em vez de apenas blocos de texto. ✅ A questão da segurança: Como o Google planeja usar "dados estruturados" para evitar riscos de execução de código. ✅ O impacto no hardware: Como aparelhos antigos podem ganhar vida nova através da nuvem. ✅ Cronograma: Quando essa tecnologia chega oficialmente ao mercado (2025-2026).

Este é o próximo passo da computação e pode significar o fim das interfaces tradicionais como as conhecemos.

Capítulos do Vídeo: 00:00 O problema atual das IAs (o ping-pong de texto) 01:24 O que é o A2UI? 02:31 Segurança e a "Planta Baixa" de dados 03:35 Multiplataforma: Android, iOS e Web 05:29 O fim do lixo eletrônico? IA em aparelhos antigos 06:19 Datas de lançamento e o futuro da tecnologia


#IA #Google #A2UI #Tecnologia #FuturoDaComputação #InteligenciaArtificial #Desenvolvimento #UXDesign

## Transcrição

_Transcrição automática, não revisada._

[0:00] Quem já usou um agente de a provavelmente sabe como é a interação. É quase sempre só por texto. A gente precisa marcar um compromisso. Lá vem uma pergunta de cada vez. Precisa entender uns dados. A IAD descreve como um gráfico seria em vez de mostrar o gráfico. É um processo meio lento, né? Às vezes até um pouco frustrante, mas e se a e a pudesse ir além das palavras e simplesmente mostrar o que ela quer dizer? Olha só essa comparação que deixa tudo bem claro. À esquerda tá a conversa picada que a gente conhece bem. para qual dia? Que horas, quantas pessoas? Aquele ping-pong de mensagens. Agora olha pra direita, um único pedido e bum, aparece um formulário de reserva interativo já todo preenchido. Essa é exatamente a promessa do Hi do Google, transformar a conversa numa interface útil na hora. Bom, na nossa análise de hoje, a gente vai ver o que significa uma IA falar. Depois vamos entender porque o A2 UI é como uma planta baixa e não código. Em seguida, a gente passa

[1:02] pelos novos padrões de interface, pelas implicações que vão muito além do chatbots e por fim damos uma espiada no que vem por aí para as interfaces. Então vamos começar pelo conceito principal. O que significa na prática uma inteligência artificial falar com interfaces de usuário as uis, em vez de só contexto. Atui, a sigla quer dizer agent user interface. É basicamente um protocolo de código aberto do Google. Pensa nele como uma linguagem comum que permite que os agentes de IA gerem interfaces completas e interativas, tipo formulários, gráficos, tudo isso só enviando dados estruturados. A ideia anunciada lá em 15 de dezembro de 2025 é justamente padronizar um jeito dos agentes mostrarem as coisas em vez de só ficarem descrevendo. Agora, a parte realmente interessante é o problemão que isso resolve. A gente tá entrando na era da malha de agente, sabe? Onde agente no nosso aplicativo pode precisar chamar outro agente de outra empresa que tá rodando lá do outro lado do mundo. E

[2:02] claro, esse agente remoto não pode simplesmente chegar e sair mexendo na interface do nosso app. Imagina o pesadelo de segurança. É exatamente aí que um protocolo, um padrão como esse, se torna fundamental. Isso leva a gente direto paraa segunda parte, como o A2 e o I funciona de verdade. A filosofia por trás dele não é enviar código para ser executado, o que seria bem arriscado. A ideia é mandar um projeto, uma planta baixa, focada totalmente em segurança e flexibilidade. E essa citação do blog do Google resume a ideia de um jeito perfeito, seguro como dados, mas expressivo como código. O agente descreve a interface que ele precisa, mas quem constrói ela de fato é o nosso próprio aplicativo, usando as pecinhas que ele já conhece e confia. Então, na prática, o fluxo acontece em três passos simples. Primeiro, o agente envia essa planta abaixa num formato chamado Jason. É só uma descrição da interface, nada mais. Segundo, o aplicativo que tá rodando no nosso aparelho recebe essa descrição e compara com seu próprio

[3:04] catálogo de componentes confiáveis. Ele só usa os blocos de montar que já são dele. E terceiro, o app monta a interface usando seus próprios componentes nativos. O resultado? O visual fica consistente e a segurança está garantida. E todo esse projeto é guiado por três princípios chave. Primeiro, segurança em primeiro lugar. O que trafega são dados e não código que pode ser executado. Segundo, é amigável para LLMs. A estrutura de dados é simples, então é fácil pros modelos de linguagem gerarem e até enviarem a interface aos poucos. E terceiro, que é fantástico, não depende da plataforma. A mesmíssima resposta do agente pode virar uma interface na web, num app em Flutter, em Angular, em todos eles vai aparecer nativo. Certo? Agora que a gente já entendeu como a engrenagem funciona, vamos ver como A2, o I se encaixa no cenário geral. Ele não surgiu do nada, né? Existe todo um movimento acontecendo para padronizar como a gente se comunica com esses agentes de IA. E hoje, basicamente, a gente tem duas filosofias competindo. De um lado, a

[4:04] abordagem do A2UI, que é a nativa primeiro. A interface gerado herda todo o estilo e a segurança do aplicativo principal, fica tudo integrado. Do outro lado, tem abordagem centrada na web de concorrentes como a Open AI e a Antropic, que usam uma espécie de caixa de areia isolada para renderizar HTML. Funciona claro, mas geralmente o resultado é uma interface que parece meio deslocada, visualmente separada do resto do aplicativo. E aqui a gente descomplica essa sopa de letrinhas. Pode parecer confuso, mas A2UY, AGU e A2A não são concorrentes, eles se complementam. Pensa em camadas. O A2UI define o formato da interface. O AGUI, que vem de parceiros como a Copilot Kit, cuida do transporte e da comunicação. E o A2A permite que diferentes agentes conversem entre si, cada um no seu quadrado, trabalhando junto. Agora vamos pra camada mais externa e sinceramente a mais fascinante, as implicações reais de tudo isso. E olha, vai muito, mas muito além de só melhorar os chatbotes. 62

[5:08] milhões. Essa foi a quantidade em toneladas de lixo eletrônico que o mundo produziu. só em 2022 é um número absurdo. E o mais chocante é que milhões de aparelhos, tipo tablets e celulares antigos, são jogados fora não porque o hardware quebrou, mas porque eles simplesmente não aguentam mais rodar os softwares modernos. E é aqui que o A2U traz uma solução surpreendente. Ele permite o que a gente chama de arquitetura de cliente magro, ou seja, o processamento pesado fica todo na nuvem. O aparelho antigo vira só uma tela, um renderizador simples para interface que a IA envia. Isso tem o potencial de dar uma vida nova para milhões de dispositivos, ajudando a diminuir essa montanha de lixo eletrônico. E isso já é realidade no mundo corporativo. O Gemna Enterprise, por exemplo, já tá usando o A2U para permitir que agentes gerem formulários dinâmicos, bainéis de aprovação que se adaptam sozinhos e visualizações de dados interativas. A meta é automatizar e guiar funcionários através de processos que antes eram super complexos. Pra gente ir fechando,

[6:10] vamos olhar paraa frente. Qual é o futuro do A2 UI e das interfaces que são biadas por agentes? O roteiro público já nos dá uma ótima ideia. O projeto já está em preview público. Renderizadores para React, Swift Y e Jetpack Compost estão planejados para 2026 com objetivo de lançar a versão 1.0 estável no final do ano. Isso mostra um compromisso bem claro em expandir esse ecossistema e o projeto não está sendo feito de forma isolada. A colaboração com times internos do Google como o Apple e com parceiros externos, tipo a Copilot Kit, que desenvolve o Edy e a equipe do Flunter mostram um apoio muito forte e que um ecossistema de verdade está crescendo em volta do protocolo. E tudo isso nos deixa com uma pergunta final para refletir. Com essa capacidade de gerar interfaces seguras, nativas e dinâmicas na hora. Será que um dia toda a interface que a gente usar vai ser gerada por uma IA, adaptada perfeitamente só para aquele momento e só paraa nossa necessidade? A resposta,

[7:12] por enquanto, fica no ar.
