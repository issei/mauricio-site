# Pare de ler código às cegas! Conheça o Understand-Anything

O Understand-Anything é um plugin de código aberto que transforma uma base de código num grafo interativo, com o significado de cada parte e tours guiados. O vídeo mostra o problema do código legado, como a ferramenta combina análise determinística e modelos de linguagem, os casos de uso e o custo em tokens.

Vídeo de Maurício Yokoyama Issei, publicado em 26 de maio de 2026 (6 min 59 s).
Assistir: https://www.youtube.com/watch?v=tesXsbVDMuQ

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## O problema do código legado

Quem entra num time novo e abre um projeto legado encontra 200.000 linhas de código e não sabe por onde começar [00:21].

As causas são conhecidas [01:02]:

- a documentação desatualizada [01:22];
- os engenheiros que conheciam o projeto e já saíram [01:22];
- os agentes de IA que alucinam porque não têm o contexto da arquitetura e olham poucos arquivos soltos [01:22].

## O que é o Understand-Anything

O Understand-Anything nasceu como um plugin para o Claude Code, e a comunidade o adaptou para Cursor, Copilot e Gemini CLI [01:43]. Ele passa o projeto por um pipeline de agentes de IA e gera um grafo de conhecimento interativo e pesquisável [02:05]. Em vez de ler arquivo por arquivo, você clica, busca e faz perguntas sobre a arquitetura [02:05].

## Significado, não só estrutura

Os grafos de ferramentas antigas mostram um emaranhado de arquivos e linhas, sem contexto [02:25]. O Understand-Anything mostra a lógica de negócio: em vez de dizer que o arquivo A importa o B, diz que os dois fazem parte do fluxo de autenticação ou de pagamento [02:47].

- **Análise de impacto:** mostra o efeito de uma alteração antes do commit [03:08].
- **Interface por público:** menos detalhe para produto, mais profundidade para quem programa [03:08].
- **Camadas:** os nós são agrupados por camada da arquitetura [03:08].
- **Tours guiados:** tutoriais automáticos que ensinam o fluxo do sistema passo a passo [03:08].

Para usar, instale o plugin, rode a análise, abra o painel no navegador e leia os resumos em linguagem natural de cada função e arquivo [03:28].

## Como funciona por baixo

A ferramenta não usa LLM para tudo. O tree-sitter, determinístico, extrai os fatos brutos, como importações e chamadas [03:49]. Os modelos de linguagem pegam essa estrutura e escrevem os resumos, identificam os domínios de negócio e criam os tutoriais [04:10].

O pipeline roda até seis agentes ao mesmo tempo: um para os frameworks, um para as funções, um para as camadas, um para os roteiros, um para as regras de negócio e um que revisa o grafo para não deixar referências soltas [04:30].

## Casos de uso

- **Onboarding:** a pessoa nova recebe o mapa e o tour guiado, em vez de documentação velha [05:11].
- **Contexto para agentes:** com o mapa, as sugestões de código da IA melhoram [05:11].
- **Refatoração:** a análise de impacto mostra o que vai quebrar antes de salvar [05:11].

Segundo o vídeo, o projeto passou de 33.500 estrelas no GitHub em pouco tempo [05:31].

## O custo

A ferramenta é gratuita e de código aberto, mas gasta muitos tokens: vários agentes analisam e resumem todos os arquivos [05:53]. Segundo o vídeo, é preciso um plano pesado, como o Claude Max [06:14]. A troca é gastar computação para economizar dezenas ou centenas de horas de trabalho [06:14].

## Perguntas frequentes

### O Understand-Anything é pago?

A ferramenta é gratuita e de código aberto, mas as chamadas aos modelos de IA custam caro [06:14].

### Ele funciona só com o Claude Code?

Não. Nasceu para o Claude Code, mas já roda com Cursor, Copilot e Gemini CLI [01:43].

## Fontes

- [Repositório no GitHub](https://github.com/Lum1104/Understand-Anything): O Understand-Anything é um plugin de código aberto que gera um grafo de conhecimento interativo da base de código.
- [Site oficial e live demo](https://understand-anything.com): Os tours guiados, a análise de impacto e a visão de domínio de negócio.

Revisado por Maurício Yokoyama Issei em 16 de novembro de 2026.

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

Você já entrou em um projeto novo com 200 mil linhas de código e se sentiu perdido?
. O Understand-Anything é a solução definitiva para dominar qualquer base de código complexa em minutos, transformando-a em um grafo de conhecimento interativo que realmente ensina você
.
Diferente de ferramentas que mostram apenas um emaranhado de arquivos, o Understand-Anything foca no significado, mapeando fluxos de negócios, camadas arquiteturais e dependências de forma visual e intuitiva
.
O que você vai ver neste vídeo:
Tours Guiados: Walkthroughs automáticos que ensinam a arquitetura na ordem certa
.
Visão de Domínio: Entenda como o código se traduz em processos de negócio reais (ex: fluxos de pagamento, autenticação)
.
Busca Semântica e Fuzzy: Encontre o que precisa pelo nome ou pelo significado da funcionalidade
.
Análise de Impacto (Diff): Veja quais partes do sistema suas alterações podem afetar antes mesmo de fazer o commit
.
Compatibilidade Total: A ferramenta funciona perfeitamente com os principais agentes de IA do mercado: Claude Code, Cursor, GitHub Copilot, Gemini CLI, Codex e muitos outros
.
Links Oficiais:
Repositório no GitHub: https://github.com/Lum1104/Understand-Anything
Site Oficial e Live Demo: https://understand-anything.com

Chega de perder semanas no onboarding. Comece a ver a "Big Picture" do seu software hoje mesmo!
.
#UnderstandAnything #AI #SoftwareEngineering #Codebase #KnowledgeGraph #ClaudeCode #GitHub #Cursor #OpenSource

## Transcrição

_Transcrição automática, não revisada._

[0:00] Hoje a gente vai falar sobre um plugin open source que, sem exagero, tá mudando o jogo para quem trabalha com desenvolvimento de software. A gente vai fazer uma análise detalhada do understand anything, uma ferramenta revolucionária que mapea bases de código visualmente. Mas não é só para mostrar que o código é complexo, sabe? É para literalmente ensinar como cada peça se encaixa. Então, bora mergulhar nisso. Quem nunca passou por isso, né? A pessoa entra num time novo, clona aquele repositório gigante e abre um projeto legado pela primeira vez. É aquela sensação clássica de ter 200.000 linhas de código te encarando em silêncio. Um verdadeiro labirinto. É super intimidador e a gente acaba perdendo um tempo precioso só para descobrir por onde começar. E para destrinchar como a gente resolve isso, o nosso roteiro de hoje é bem direto. Primeiro, o problema do código legado. Dois, a gente conhece o understand anything. Três, por significado importa mais que estrutura. Quatro, como a mágica realmente acontece por baixo dos panos. Cinco, casos de uso

[1:02] na vida real. E para fechar, o custo de ter tanta clareza. Começando então pelo problema do código legado. Afinal, por que navegar em sistemas antigos ou entrar num projeto novo dói tanto? Bom, os culpados pelo nosso sofrimento diário já são velhos conhecidos. Primeiro, aquela documentação desatualizada que nunca acompanha o ritmo do código. Depois tem os engenheiros que construíram tudo, tinham o projeto inteiro na cabeça e já saíram da empresa faz meses. E agora o problema mais moderno, agentes de codificando e alucinando absurdos porque não tem o contexto da arquitetura. Eles basicamente tentam adivinhar as coisas olhando para meia dúzia de arquivos soltos. E é no meio desse caos que entra o nosso segundo ponto, a ferramenta que virou febre na comunidade dev, o Understand Anything. Para resumir o que é essa maravilha, o Understand Anything nasceu como um plugin por Cloud Code, mas a galera já adaptou para rodar com Cursor, Copilot e Gemini CLI.

[2:05] Basicamente ele pega o seu projeto, joga num pipeline cheio de agentes de inteligência artificial e cospe um gráfico de conhecimento da base de código que é totalmente interativo e pesquisável. Ou seja, em vez de ler arquivo por arquivo no escuro, a gente ganha um painel visual para clicar, buscar e literalmente fazer perguntas sobre arquitetura. Agora você pode pensar: "Ah, mas gerar gráfico de código eu já vi". E é por isso que nosso terceiro ponto é sobre focar no significado, não só na estrutura. Sabe aqueles gráficos gerados por ferramentas antigas? Eles impressionam nos primeiros 5 segundos. Mostram um emaranhado gigante de arquivos e linhas estruturais, mas não dão contexto nenhum. é um mapa sem legenda, inútil na prática. Já os gráficos gerados pelo Understand Anything são feitos para ensinar. Eles revelam a lógica de negócios real. Em vez de só mostrar que o arquivo A importa o arquivo B, a ferramenta te conta que os dois fazem parte de um fluxo de autenticação ou de um pipeline de pagamentos. É história por trás do código, entende? E como isso

[3:05] vira realidade? Com umas funcionalidades incríveis. Tem a análise de impacto onde é possível ver o efeito dominó de uma alteração antes mesmo de comitar. A interface se adapta a quem tá lendo, tem menos detalhes para quem é de produto e mais profundidade técnica para quem vai colocar a mão na massa. O sistema também agrupa os nós automaticamente por camada arquitetônica, mas o grande destaque, sem dúvida, são os passeios guiados. O negócio gera tutoriais automáticos que ensinam o fluxo do sistema passo a passo. E colocar isso para rodar é super tranquilo. São quatro passos rápidos. Um, instalar o plugin no seu ambiente favorito. Dois, rodar a análise no código para gerar o gráfico. Três, abrir o pael no navegador, onde dá para explorar e clicar em tudo. E quatro, continuar aprendendo junto com os resumos em linguagem natural gerados para cada função e arquivo. Tá? Mas como essa bruxaria técnica rola nos bastidores? Vamos pro nosso quarto ponto. Como isso realmente funciona? A grande sacada dessa arquitetura híbrida é que ela não usa LLMs para tudo. O

[4:05] trabalho foi dividido de um jeito brilhante. De um lado, a gente tem o treater, que é totalmente determinístico. A função dele é extrair os fatos brutos, tipo importações e locais de chamada. Entrou A, sai B, sempre igual. Do outro lado, entram os grandes modelos de linguagem atuando de forma semântica. Eles pegam essa estrutura sólida e produzem resumos em texto humano, identificam domínios de negócios e criam aqueles tutoriais. É o casamento perfeito da precisão estrutural com a compreensão da linguagem. E essa parte semântica é uma verdadeira força tarefa de IAS. O pipeline roda até seis agentes especialistas ao mesmo tempo. Tem um escaneando os frameworks, outro extraindo as funções e um terceiro mapeando as camadas da arquitetura. E não para por aí. Tem um montando os roteiros de aprendizado, outro focado só em entender as regras de negócio e olha que loucura, um agente que age como revisor do gráfico para garantir que nenhuma referência fique solta. É uma coordenação muito pesada. Com todo esse poder de fogo, onde isso brilha no dia a

[5:06] dia, esse é o nosso quinto tópico, casos de uso de alto impacto. Isso resolve três dos maiores ralos de tempo que a gente tem hoje. Primeiro, o onboarding. Esquece botar a pessoa nova para ler documentação mofada. É só dar o mapa interativo e sugerir o passeio guiado. Segundo é o contexto para agentes de IA. Quando a IA recebe o mapa estruturado em vez de arquivos aleatórios, as sugestões de código ficam infinitamente melhores. E terceiro, a refaturação. A análise de impacto evita aquele desastre de alterar uma linha e quebrar o sistema inteiro. Dá para ver tudo que vai explodir antes mesmo de salvar. E não é à toa que o hype é real. Dá uma olhada nesse número. Mais de 33.500 estrelas no GitHub. Isso em pouquíssimo tempo. É uma atração absurda que só prova o quanto a comunidade estava implorando por uma solução visual e inteligente que realmente ajudasse a entender sistemas gigantescos. Mas claro, nem tudo são flores. A gente precisa falar sobre a realidade prática. Ponto seis, o custo da clareza. O fato é que usar Iá de ponta dessa forma tem um preço e a taxa

[6:07] de queima de tokens é altíssima. botar múltiplos agentes para analisar e resumir todos os arquivos de um projeto exige uma cota massiva de tokens. Você vai precisar de um plano pesado, tipo o Cloud Max. A ferramenta em si é totalmente open source e gratuita, mas as chamadas de API que acontecem por baixo dos panos custam caro. O lado bom é o investimento de poder computacional para economizar dezenas, talvez centenas de horas de trabalho humano. E isso deixa a gente com uma pergunta bem instigante para encerrar a nossa análise. Se a inteligência artificial consegue mapear a lógica de negócios e sobrepor isso à infraestrutura legado com tanta perfeição, será que ler código bruto em breve vai ser uma coisa do passado? É uma mudança de paradigma enorme na forma como a gente entende software. Fica aí a provocação pra gente pensar. Até a próxima.
