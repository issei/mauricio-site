# OpenKB - Criando sua base de conhecimento inteligente

O OpenKB é uma ferramenta de código aberto que transforma documentos numa wiki local, ligada e mantida por IA, sem banco de vetores. O vídeo mostra a configuração, as consultas, a estrutura em árvore do PageIndex, o modo watch, a visualização no Obsidian, o arquivo AGENTS.md e o comando de verificação da base.

Vídeo de Maurício Yokoyama Issei, publicado em 7 de maio de 2026 (5 min 59 s).
Assistir: https://www.youtube.com/watch?v=hdFXMDVb7Og

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## Uma base de conhecimento sem vetores

O OpenKB é uma ferramenta de código aberto para construir uma base de conhecimento local sem usar vetores [00:00]. Ele pega documentos brutos e os compila numa wiki estruturada, ligada e gerenciada por IA [00:00].

## Configuração inicial

Para começar, rode `openkb init` no terminal, escolha o modelo no formato do LiteLLM, como o Claude Sonnet da Anthropic, e ponha a chave de API no arquivo `.env` [00:43].

O OpenKB já vem com o gateway LiteLLM, que liga provedores como OpenAI, Anthropic e Gemini [01:05]. Segundo o vídeo, isso dá acesso a mais de 100 modelos, e dá para trocar de modelo sem reescrever código [01:27].

## Consultas e a estrutura do PageIndex

Para uma pergunta rápida, use `openkb query`. Para uma investigação em várias rodadas, use `openkb chat`, que guarda o histórico da sessão [01:48].

O RAG tradicional quebra os documentos em milhares de pedaços de vetor e, a cada pergunta, tenta redescobrir tudo do zero [02:09]. O OpenKB, com o PageIndex, compila a informação numa árvore hierárquica, parecida com um índice, e o conhecimento se acumula [02:29].

A documentação do PageIndex resume: "Similaridade não é relevância" [02:29]. Num PDF longo, a ferramenta cria árvores de índice com resumos, e a IA percorre essa árvore para achar a página ou a seção que tem a resposta [02:50].

## Automação com o modo watch

O comando `openkb watch` roda em segundo plano e observa a pasta `raw` [03:10]. Quando você solta ali um PDF, um Word ou um texto, a IA lê o arquivo, gera os resumos e atualiza os conceitos e os links cruzados [03:31].

## Visualização no Obsidian

O OpenKB gera arquivos Markdown com wikilinks duplos [03:31]. Ao abrir a pasta da wiki no Obsidian, a navegação fica fluida e o grafo mostra a ligação entre as ideias [03:52].

## O arquivo AGENTS.md

O `AGENTS.md` é o manual de instruções da IA: define o padrão, as convenções e como organizar as informações [04:13]. A IA lê o arquivo a cada execução. Se você muda uma regra, a organização da base muda na hora, sem reiniciar nada [04:34].

## A saúde da base

Com mais documentos, surgem redundâncias e duplicações [04:34]. O comando `openkb lint` faz uma varredura atrás de contradições, links órfãos, lacunas de informação e conteúdo velho [04:56].

## Perguntas frequentes

### Preciso de um banco de vetores?

Não. O OpenKB organiza o conhecimento numa árvore hierárquica, sem vetores [02:29].

### Como manter a base atualizada sem esforço?

Deixe o `openkb watch` rodando: ele processa cada arquivo novo que cai na pasta `raw` [03:10].

## Fontes

- [OpenKB (Open LLM Knowledge Base)](https://github.com/VectifyAI/OpenKB): Os comandos do OpenKB (init, query, chat, watch e lint) e a wiki em Markdown gerada a partir dos documentos.
- [PageIndex (Document Index for Vectorless RAG)](https://github.com/VectifyAI/PageIndex): A estrutura em árvore com resumos, sem vetores, e a frase "similaridade não é relevância".
- [LiteLLM (AI Gateway & Python SDK)](https://github.com/BerriAI/litellm): O LiteLLM liga vários provedores de IA, como OpenAI, Anthropic e Gemini, por uma só interface.

Revisado por Maurício Yokoyama Issei em 16 de novembro de 2026.

Assuntos: [Dados e decisão](https://mauricio.issei.com.br/temas/dados-e-decisao)

## Sobre o vídeo

Descubra como construir e gerenciar seu próprio cérebro digital permanente com o OpenKB! Neste vídeo, demonstramos o passo a passo para inicializar e configurar sua base de conhecimento localmente
. Entenda como o sistema processa documentos longos utilizando a estrutura hierárquica em árvore do PageIndex, que permite uma recuperação de dados baseada em raciocínio sem a necessidade de bancos de dados vetoriais
.
Aprenda também a automatizar a compilação de novos arquivos com o watch mode
, a integrar o LiteLLM para usar diferentes provedores de IA (como Anthropic ou Gemini) de forma simplificada e unificada
, e a configurar o Obsidian para visualizar nativamente os wikilinks e o grafo da sua base de conhecimento
. Por fim, explicamos o papel fundamental do arquivo de instrução (AGENTS.md) para manter a estrutura da base e orientar o LLM
, além de como depurar e manter os conceitos sempre atualizados e sem redundâncias através das verificações de integridade (lint)
.
🔗 Fontes e Links Oficiais:
OpenKB (Open LLM Knowledge Base): https://github.com/VectifyAI/OpenKB
PageIndex (Document Index for Vectorless RAG): https://github.com/VectifyAI/PageIndex
LiteLLM (AI Gateway & Python SDK): https://github.com/BerriAI/litellm
OpenAI Agents Python (Framework for multi-agent workflows): https://github.com/openai/openai-agents-python
Conceito Original (Andrej Karpathy): https://x.com/karpathy/status/2039805659525644595

## Transcrição

_Transcrição automática, não revisada._

[0:00] Vamos direto ao ponto. Hoje a gente vai destrinchar um processo incrível. Como construir uma base de conhecimento local e o mais interessante, sem usar vetores. Tudo isso rodando com uma ferramenta de código aberto chamada Open KB. A ideia de pegar documentos brutos e compilar numa wik estruturada, toda interligada e gerenciada por inteligência artificial simplesmente muda o jogo de como a gente processa informação. Então, bora ver como essa arquitetura funciona na prática. O nosso roteiro hoje é bem ágil. Passamos pela configuração inicial, depois vemos as consultas e a estrutura page index, a automação com o modo watch, a visualização prática no Obsidian, a personalização com o arquivo agents e para fechar a depuração e saúde da base. Vamos nessa. Passo um, configuração inicial. Antes de fazer qualquer interação com a inteligência artificial, a gente precisa preparar o terreno e estabelecer a fundação localmente. O que impressiona logo de cara é a simplicidade desse processo. Para dar o pontapé inicial, é só rodar um Open KB Init no terminal. Aí a gente

[1:00] define o modelo que quer usar através do formato do Light LLM, tipo um cloud Sonet da Antropic, e por fim joga a chave de API lá no arquivo oculto.env. É um processo super rápido e desenhado para ser zero dor de cabeça. E olha só o pulo do gato na hora de escolher a IA. O Open KiBI já vem com gateway litm integrado, que funciona como uma ponte universal. Isso significa que a gente pode plugar provedores como a Open AI, a Antropic ou Gemini. Isso dá acesso contínuo a mais de 100 modelos diferentes. Dá para trocar de modelo sob demanda, sem precisar reescrever absolutamente nenhuma linha de código. Passo dois, consultas e a estrutura page index. Com a fundação pronta, vamos pro motor principal e entender como extrair o conhecimento assim que os documentos caem na base. Para fazer aquela primeira consulta e ter uma resposta imediata, a gente usa o comando open KB query. Mas se a ideia é aprofundar a investigação, a gente chama o Open KB Chat. O grande

[2:02] trunfo dessa segunda opção é que ela mantém o histórico da sessão. A gente pode ir itterando em múltiplos turnos de conversa sem que a inteligência artificial perca o contexto de jeito nenhum. E aqui a gente bate numa diferença brutal de arquitetura. O hag tradicional costuma quebrar os documentos em milhares de pedacinhos de vetores. É literalmente como um quebra-cabeça estilhaçado. Toda vez que rola uma pergunta, o sistema tenta redescobrir as coisas do zero. Já o Openk, usando o page index faz o oposto. Ele compila a informação numa estrutura de árvore hierárquica, bem parecida com um índice. O conhecimento vai se acumulando de forma persistente, totalmente sem vetores. Essa frase da documentação do page index mata charada. Similaridade não é igual à relevância. Quando a gente lida com um PDF longo e complexo, só buscar palavras parecidas não resolve. A ferramenta processa esses documentos longos, criando árvores de índices com resumos. Então, em vez de ler um blocão enorme de texto e se perder, aí ler essa estrutura em árvore para conseguir raciocinar exatamente

[3:03] sobre qual página ou sessão tem a resposta que a gente precisa. Passo três, automação com o modo watch. Trazendo isso pro dia a dia, como a gente faz para não ter que atualizar tudo na mão toda hora? A mágica da eficiência acontece com o comando open KB Watch. Ele fica rodando em segundo plano, monitorando a pasta raw. Na prática, a gente simplesmente solta um PDF, Word ou arquivo de texto lá dentro e o sistema detecta na mesma hora. A inteligência artificial entra em ação, lê o arquivo, gera os resumos e já atualiza os conceitos e os links cruzados automaticamente. Passo quatro, visualização prática no Obsidian. Com todo esse conhecimento sendo compilado nos bastidores, vamos ver como representar esses dados visualmente. O Open KB gera arquivos de texto puro em Markdown, usando aqueles wick links duplos para conectar tudo. Então, usar uma ferramenta como Obsidian é o casamento perfeito. A gente abre a pasta da Wikfre lá no Obsidian e aquele texto todo ganha vida. A navegação fica fluida e a gente consegue ver a conexão das ideias pelo grafo. É pegar arquivo

[4:03] simples de texto e transformar num mapa mental altamente visual e explorável. Passo cinco, personalização com o arquivo agents. Chegando num nível de maestria, vamos ver como manter a estrutura da base sob controle. Tudo gira em torno de um único arquivo de texto, o agents.m. Ele funciona como um manual de instruções para inteligência artificial, definindo o padrão, as convenções e como as informações devem ser organizadas. E a sacada mais legal é que a IA leia esse arquivo dinamicamente. Se a gente alterar uma regra ali, a forma como a base organizada muda na mesma hora em tempo de execução, sem precisar reiniciar nada. Passo seis, depuração e saúde da base. O conhecimento é dinâmico e cresce, o que nos leva a um ponto crítico de manutenção estrutural a longo prazo. Com um volume cada vez maior de documentos e PDFs cruzando informações o tempo todo, surge um problema técnico óbvio. Como a gente faz para deporar essa árvore de conceitos, evitar redundâncias e garantir que o

[5:04] conhecimento continue puro e sem duplicação? A ferramenta já tem a solução embutida com o comando open KB. lente. Ele atua como um inspetor super rigoroso de qualidade. Quando a gente roda isso, ele faz uma varredura buscando ativamente contradições lógicas que a IA possa ter criado, links órfãs, buracos de informação e até conteúdo velho. É exatamente esse comando que deixa a árvore de conceitos redondinha e isso nos deixa com uma provocação para encerrar a nossa análise, a gente acompanhou aqui uma arquitetura em que cada arquivo novo enriquece a base em vez de ficar isolado. Vendo como o Hag tradicional sofre com raciocínios muito longos, a gente tem que se perguntar, será que essa abordagem baseada em hierarquia e sem vetores é o futuro definitivo para análise local de documentos? É uma possibilidade fascinante e com certeza inicializar uma instância própria do Open Key B é o melhor jeito de tirar essa prova.
