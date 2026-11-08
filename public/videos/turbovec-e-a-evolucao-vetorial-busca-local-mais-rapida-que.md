# turbovec e a Evolução Vetorial: Busca Local Mais Rápida que o FAISS

Vídeo de Maurício Yokoyama Issei, publicado em 8 de junho de 2026 (7 min 23 s).
Assistir: https://www.youtube.com/watch?v=Ukn3dyQZ-q0

Assuntos: [Dados e decisão](https://mauricio.issei.com.br/temas/dados-e-decisao)

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
