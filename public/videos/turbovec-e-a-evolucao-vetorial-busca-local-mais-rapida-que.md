# turbovec e a Evolução Vetorial: Busca Local Mais Rápida que o FAISS

O vídeo explica o turbovec, um índice vetorial em Rust com interface Python baseado no algoritmo TurboQuant. Mostra por que a memória é o gargalo da busca vetorial em RAG, como o FAISS contorna isso com quantização de produto e FastScan, e como o TurboQuant comprime vetores sem fase de treinamento, perto do limite teórico.

Vídeo de Maurício Yokoyama Issei, publicado em 8 de junho de 2026 (7 min 23 s).
Assistir: https://www.youtube.com/watch?v=Ukn3dyQZ-q0

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## O gargalo da memória

Quem constrói aplicações de RAG (geração aumentada por recuperação) sabe que a busca vetorial em larga escala vira um desafio de engenharia conforme os dados crescem [00:00].

A conta que o vídeo usa: 10 milhões de documentos sem compressão ocupam cerca de 31 GB de RAM, no formato float32 [00:22]. Com a otimização certa, o mesmo corpus cai para cerca de 4 GB, o que torna viáveis as arquiteturas locais [00:43].

O roteiro passa pelo gargalo de memória, pela compressão do FAISS com FastScan, pelo TurboQuant, pelo funcionamento do algoritmo e pelo turbovec [00:43].

Ao escalar aplicações de IA, cedo ou tarde se bate no muro de memória. Ler sem parar vetores grandes em float32 direto da RAM trava a CPU, e por isso a indústria buscou compressão agressiva [01:03].

## FAISS, quantização de produto e FastScan

A solução mais comum é a biblioteca FAISS, do Facebook. A base é a quantização de produto (PQ): quebrar cada vetor em subvetores e trocar cada parte por um código curto, que aponta para um livro de códigos, a tabela de consulta [01:46].

O problema é a latência. Com as tabelas na RAM, a busca fica lenta, porque a CPU calcula muito mais rápido do que acessa a memória [02:08].

O FastScan do FAISS resolve isso levando as tabelas da RAM para os registradores SIMD da CPU, que são muito mais rápidos. Ele empacota códigos de 4 bits em blocos de 32 bytes [02:30].

## O avanço do TurboQuant

Para superar o FAISS sem perder precisão, os pesquisadores recorreram à matemática teórica [02:52].

Um marco foi o artigo do RaBitQ, do SIGMOD 2024, que mostrou ser possível ter um limite de erro teórico estrito com quantização aleatória [03:13].

Sobre essa base surgiu o TurboQuant. Segundo o vídeo, ele será apresentado no ICLR 2026 [03:13]. O artigo afirma que o algoritmo fica a um fator de cerca de 2,7 do limite inferior teórico de compressão [03:34].

A grande vantagem prática: a PQ clássica exige um treinamento de agrupamento com k-means para montar o livro de códigos. O TurboQuant é independente dos dados e não tem fase de treinamento; dá para adicionar vetores sem reconstruir tabelas [03:54].

## Como o algoritmo funciona

O pipeline tem cinco passos que transformam vetores grandes em códigos compactos, mantendo a precisão [04:15]:

1. Normalização: os vetores viram direções unitárias numa hiperesfera [04:35].
2. Rotação aleatória: força cada coordenada a seguir uma distribuição previsível, a distribuição Beta [04:35].
3. Calibração: um ajuste fino nas dimensões menores [04:35].
4. Lloyd-Max: o algoritmo calcula os melhores intervalos de quantização [04:57].
5. Empacotamento: tudo vira inteiros de 2 ou 4 bits [04:57].

A compressão costuma subestimar as distâncias entre vetores. Com uma ideia adaptada do RaBitQ, o sistema guarda um escalar extra por vetor, que elimina esse viés do produto interno quase sem custo [04:57].

## O turbovec na prática

O turbovec leva o TurboQuant para código, escrito em Rust [05:19]. Segundo o vídeo, com kernels otimizados à mão para NEON, ele chega a ser de 12% a 20% mais rápido que o FastScan do FAISS em chips ARM [05:39]. A página do projeto, lida em 19/11/2026, mostra números maiores: cerca de 4 vezes a 4 bits e 2 vezes a 2 bits contra o IndexPQFastScan, com 100 mil vetores, em ARM e x86.

Outro ponto é a filtragem. Numa busca comum, os dados vêm todos para a memória e só depois são filtrados e descartados [06:00]. O turbovec filtra dentro do registrador SIMD: vetores não permitidos são ignorados antes da pontuação [06:00].

A integração é simples: há conectores para LangChain, LlamaIndex, Haystack e Agno. Basta trocar a importação no topo do código, e o restante do pipeline continua igual [06:22].

## O limite das máquinas locais

O vídeo deixa uma pergunta: se 31 GB cabem em 4 GB com buscas rápidas, qual é o limite das máquinas locais? Para muitas equipes, a dependência de bancos vetoriais caros na nuvem pode deixar de existir [06:43].

## Perguntas frequentes

### O turbovec precisa treinar o índice antes de usar?

Não. O TurboQuant é independente dos dados e não tem fase de treinamento; os vetores entram de forma contínua [03:54].

### Quanto de memória o turbovec economiza?

No exemplo do vídeo, 10 milhões de documentos caem de cerca de 31 GB em float32 para cerca de 4 GB [00:43].

## Fontes

- [RyanCodrai/turbovec (GitHub)](https://github.com/RyanCodrai/turbovec): Repositório do projeto: um índice vetorial baseado no TurboQuant, escrito em Rust com bindings para Python, licença MIT. Afirma que 10 milhões de embeddings de 768 dimensões ocupam 31 GB em float32 e cerca de 4 GB no turbovec; usa 2 ou 4 bits por dimensão; não tem etapa de treinamento; filtra por lista de IDs ou máscara; e integra LangChain, LlamaIndex, Haystack e Agno.
- [TurboQuant: Online Vector Quantization with Near-optimal Distortion Rate](https://arxiv.org/abs/2504.19874): Artigo de Zandieh, Daliri, Hadian e Mirrokni (arXiv, abril de 2025). Descreve um quantizador independente dos dados, próprio para uso online, que gira os vetores de forma aleatória para induzir uma distribuição Beta nas coordenadas e fica a um fator de cerca de 2,7 do limite inferior teórico.
- [RaBitQ: Quantizing High-Dimensional Vectors with a Theoretical Error Bound for Approximate Nearest Neighbor Search](https://arxiv.org/abs/2405.12497): Artigo de Gao e Long, aceito no SIGMOD 2024. Propõe uma quantização aleatória com limite de erro teórico, em contraste com a quantização de produto, que não tem esse limite.

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Dados e decisão](https://mauricio.issei.com.br/temas/dados-e-decisao), [Ferramentas de IA](https://mauricio.issei.com.br/temas/ferramentas-de-ia)

## Sobre o vídeo

Neste vídeo, exploramos o turbovec, um índice vetorial de alta performance escrito em Rust com bindings para Python que está transformando a criação de sistemas RAG locais e privados
.
Aprenda como o turbovec utiliza o algoritmo TurboQuant (do Google Research) para realizar feitos impressionantes: comprimir um corpus de 10 milhões de documentos em apenas 4 GB de RAM e realizar buscas mais rápidas que o padrão de mercado, o FAISS
. Tudo isso sem fase de treinamento de dados (ingestão totalmente online) e mantendo a alta precisão
.
No vídeo, abordamos as inovações técnicas que tornam isso possível, incluindo a calibração por coordenada TQ+, a quantização escalar Lloyd-Max e a otimização extrema utilizando instruções de hardware SIMD (NEON para ARM e AVX-512BW para x86)
. Se você constrói arquiteturas RAG (Geração Aumentada por Recuperação) e se preocupa com privacidade de dados, consumo de memória ou baixa latência, essa tecnologia é para você!
.
🔗 Referências e Links Oficiais:
Repositório do turbovec no GitHub: https://github.com/RyanCodrai/turbovec

turbovec no PyPI (Python Package Index): https://pypi.org/project/turbovec/

Artigo TurboQuant (Online Vector Quantization with Near-optimal Distortion Rate): https://arxiv.org/abs/2504.19874

Artigo RaBitQ (Quantizing High-Dimensional Vectors with a Theoretical Error Bound...): https://arxiv.org/abs/2405.12497

Wiki do FAISS (Fast accumulation of PQ and AQ codes / FastScan): https://github.com/facebookresearch/faiss.wiki.git

## Transcrição

_Transcrição automática, não revisada._

[0:00] E aí, pessoal? Se vocês estão construindo aplicações de geração aumentada por recuperação, o famoso HG, sabem muito bem que gerenciar a pesquisa vetorial em larga escala é bem, é uma daquelas coisas que tira o sono de qualquer desenvolvedor, né? Conforme os dados crescem, a coisa fica séria e vira um imenso desafio de engenharia. Para colocar isso em perspectiva e entender o tamanho do problema, pensa no seguinte: armazenar um corpus de 10 milhões de documentos sem nenhuma compressão vai devorar uns espantosos 31 GB de memória RAM. É um absurdo. Tudo isso só para manter a representação vetorial lá pesada naquele formato padrão float 32. Mas e se a gente aplicasse uma otimização matemática pesada aqui? O contraste é simplesmente brutal. Esse mesmíssimo corpus de 31 GB cai para apenas 4 GB. Quatro. É uma redução drástica que basicamente muda as regras do jogo e destrava de vez as arquiteturas locais. Então o nosso papo de hoje vai cobrir o seguinte: primeiro,

[1:00] o gargalo da memória vetorial. Depois vamos falar sobre a compressão fast e fast scan, entrar de cabeça no avanço matemático do turbo quant, destrinchar como o algoritmo funciona por dentro e fechar com o turbo vec e a busca vetorial de nova geração. Bora lá. Certo? Começando pelo começo, o gargalo de memória vetorial. Quando a gente escala aplicações de A hoje em dia, mais cedo ou mais tarde a gente bate de frente no muro de menória. A real é que fica lendo continuamente esses vetores massivos em float 32 direto da RAM criam um gargalo enorme que acaba travando a CPU. O volume bruto de dados não comprimidos é tão assustador que a indústria foi meio que forçada a correr atrás de soluções agressivas de compressão. E aí que entra a nossa segunda parte, a compressão faz e fast scan. A galera tem contornado esse muro de memória, principalmente usando a biblioteca faz do Facebook. O coração disso tudo é a quantização de produto ou PQ. Para quem não tá tão familiarizado,

[2:02] é vital entender a definição. É basicamente uma técnica que quebra os vetores em subvetores e substitui essas partes por códigos curtinhos. Esses códigos apontam para um livro de códigos que a gente também chama de tabela de consulta ou lookup table. Essa é a base clássica da compreensão vetorial. Só que adivinha, a latência é o calcanhar de Aquiles dessa abordagem. Deixar essas tabelas de consulta lá na memória RAM acaba freando a velocidade de busca. Pensa bem, as CPUs de hoje processam operações aritméticas muito, mas muito mais rápido do que conseguem acessar a memória RAM. Então, a engenharia teve que repensar totalmente onde esses dados deveriam residir na hora de fazer a pesquisa. A sacada do recurso Fest Scan lá dentro do F resolve isso pegando essas tabelas da RAM e jogando direto pros registradores Cind da CPU. que são ultra rápidos. Ele simplesmente empacota os códigos de 4 bits em bloquinhos de 32 bytes, maximizando de forma brutal o rendimento de leitura. Mas sempre dá para ir além, né? E é sobre isso o nosso

[3:02] terceiro ponto, o avanço matemático do Turbo Quant. Para tentar superar a performance absurda do FI sem sacrificar a precisão, os pesquisadores precisaram apelar paraa matemática teórica pesada. Um grande divisor de águas foi o artigo sobre o Rapit lá do Sigmod de 2024. O estudo provou matematicamente que é sim viável cravar um limite de erro teórico super estrito usando quantização aleatória. Pegando carona nesses conceitos, surgiu um novíssimo algoritmo Turbo Quant que será detalhado no ICLR 2026 com uma taxa de distorção quase perfeita. Ele consegue comprimir os dados chegando pertinho do limite inferior teórico de Xenon. Para ser exato, fica apenas 2,7 vezes de distância. Ou seja, o algoritmo opera quase encostado na fronteira absoluta de eficiência de compressão. Agora, a grande vantagem de tudo isso, o FPQ clássico te obriga a passar por um treinamento demorado de agrupamento usando Kings+ para construir aquele livro de códigos. O Turbo Quant ele ignora isso, ele é totalmente alheio aos

[4:04] dados e simplesmente não tem fase de treinamento separada. Você pode ir adicionando novos vetores continuamente, sem precisar reconstruir tabela nenhuma. à medida que os seus dados crescem. Isso é um alívio gigantesco na prática. Mas como essa mágica matemática toda acontece? Vamos pro ponto quatro, por dentro do algoritmo Turbo Quant. Para entender de verdade, precisamos dar uma olhada no pipeline. São cinco passinhos bem metódicos e elegantes que pegam aqueles vetores gigantescos e convertem em códigos super compactados, mas mantendo a alta precisão. Acompanha a sequência. Primeiro vem a normalização, transformando os vetores em direções unitárias numa hiperesfera. Aí entra a verdadeira cartada de mestre, uma rotação aleatória. Ela força qualquer coordenada a cair numa curva estatística super previsível, a famosa distribuição beta. Depois da calibração, que dá um ajuste fino em desos menores, entra o famoso algoritmo de Lloyd Max para calcular certinho os melhores baldes de distribuição. E para fechar, tudo empacotado e espremido em numerozinhos

[5:05] inteiros de dois ou 4 bits. Lindo de ver. O toque final resolve uma dor de cabeça antiga. Toda compressão costuma subestimar as distâncias entre os vetores de forma sistemática. Adaptando uma sacada genial do Rabit Kill, o sistema armazena um único escalar extra por vetor durante a codificação. Isso simplesmente elimina o viés matemático do produto interno na hora da busca, sem adicionar praticamente nenhum custo computacional de tempo. E para fechar nossa análise, ponto C, Turbove VC, a busca vetorial de nova geração. Toda essa teoria brilhante do Turboquant virou código prático através do Turbovec escrito em Rust. E olha, os benchmarks falam por si. Usando kérneos construídos e otimizados à mão paraa arquitetura Neon, o Turbovec chega a ser de 12 a 20% mais rápido que o reverenciado F scan rodando em Chips Army. É a prova nítida de que eficiência matemática vira velocidade bruta de processamento no mundo real. Outro detalhe impressionante é a filtragem. Numa busca padrão, rola

[6:06] muito o que chamamos de overfatching. Os dados vêm todos pr memória para serem filtrados e descartados logo em seguida. Um super desperdício. O Turbovec muda o jogo fazendo um short circuiting. Ele filtra os dados de forma super elegante, direto de dentro do registrador SIMD. Vetores que não são permitidos na busca são simplesmente bloqueados e ignorados antes mesmo da pontuação rolar. Economiza um ciclo absurdo de processamento e além de ser um foguete, plugar isso nos seus projetos é muito fácil. Existem integrações nativas prontinhas para frameworks gigantes como Langchain, Lama Index, Haysteck e Agmut. Ou seja, as suas lógicas e pipelines anteriores continuam tocados. Você só faz uma troca da importação no topo do seu código e já garante uma eficiência imediata, o que deixa a gente com uma pulga atrás da orelha para refletir. Pensa comigo, com o nível de compressão que espreme 31 GB para apenas 4, mantendo pesquisas incrivelmente rápidas, qual é o verdadeiro limite das nossas máquinas locais? Será que a

[7:07] dependência de bancos de vetores caros e baseados em nuvem pode se tornar coisa do passado para muitas equipes? Fica o convite para vocês testarem. Valeu por acompanhar mais essa explicação focada em eficiência. vetorial. Um abraço e até a próxima análise.
