# Minigraf: O Banco de Dados de Grafo Bitemporal Incorporado para IA e Web

O vídeo apresenta o Minigraf, um banco de dados de grafos embutido, de arquivo único, escrito em Rust, com consultas em Datalog e modelo bitemporal. Explica a diferença entre tempo de transação e tempo válido, os usos em agentes de IA, aplicativos móveis e navegador, e os limites do projeto.

Vídeo de Maurício Yokoyama Issei, publicado em 10 de outubro de 2026 (9 min 20 s).
Assistir: https://www.youtube.com/watch?v=KRoFYGy7eos

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## Um banco de grafos que lembra o passado

O vídeo parte de uma pergunta: e se um banco de dados local pudesse lembrar de todos os estados passados, sem muito armazenamento extra e sem servidor? Normalmente, ao sobrescrever um dado, o histórico se perde, e manter auditoria completa no ambiente local é difícil [00:20].

A documentação do projeto define o Minigraf como "o SQLite dos bancos de dados de grafos bitemporais": um arquivo único, embutido e sem configuração, como o SQLite, mas para dados conectados e com o histórico completo [01:05].

## O que é o Minigraf

O Minigraf é escrito em Rust e funciona a partir de um único arquivo com extensão `.graph`. Uma linha de código abre o arquivo e o banco está pronto [01:48].

Ele guarda os fatos como arestas de um grafo, aceita consultas em Datalog e mantém todo o histórico das informações [02:08].

Segundo o vídeo, há bancos de grafos maduros, como o Neo4j e o XTDB (que também tem recursos temporais), e o SQLite domina o armazenamento embutido. O Minigraf seria a única solução nativa em Rust que junta Datalog, arquivo único, recursos bitemporais e execução no navegador por WebAssembly [02:30].

## Por que Datalog e não SQL

O SQL foi desenhado para tabelas; o Datalog, para relações lógicas e, por isso, para grafos [02:51].

Buscar "amigos de amigos de amigos" é natural em Datalog, que é recursivo por design, sem os vários joins que pesam no SQL. O modelo é entidade-atributo-valor: um fato no banco é uma aresta [03:12].

A gramática é compacta e uniforme, e a linguagem inteira do Minigraf cabe no prompt de sistema de um assistente de IA. Com poucos exemplos, um modelo de linguagem gera consultas corretas [03:33].

## Dois tempos: transação e validade

O modelo bitemporal, inspirado no Datomic, usa duas linhas de tempo [04:16]:

- Tempo de transação: o instante em que o sistema gravou a informação [04:16].
- Tempo válido: quando aquilo aconteceu no mundo real [04:16].

Com as duas, dá para corrigir o passado sem apagar o registro de quando o sistema soube da correção [04:37].

O exemplo do vídeo [04:37]:

1. No minuto 1, o aplicativo está offline e registra um valor errado [04:37].
2. No minuto 5, a conexão volta e chega uma correção retroativa: no minuto 1, o valor certo era outro [04:37].
3. No minuto 10, dá para perguntar ao banco o que o sistema sabia no minuto 2, antes da correção, e o Minigraf reconstrói essa visão [04:58].

## Casos de uso

O vídeo cita três frentes: memória de agentes de IA, armazenamento local em aplicativos móveis e aplicações no navegador [05:19].

- **Agentes de IA.** O agente guarda o que acredita ser verdade para decidir. Se errar, a correção não apaga o registro do erro. Num padrão GraphRAG, o banco vetorial busca por similaridade, e o Minigraf mostra os relacionamentos e o que o agente sabia no momento da decisão [05:40].
- **Aplicativos móveis.** Armazenamento offline-first: num aplicativo de saúde usado em campo, os dados são registrados sem conexão, e um erro de digitação antigo é corrigido com um fato retroativo, sem perder a auditoria [06:01]. Com as bibliotecas geradas pelo UniFFI, dá para usar o banco em Kotlin no Android ou em Swift no iOS, sem escrever Rust [06:22].
- **Navegador.** Compilado para WebAssembly, o Minigraf roda no navegador e grava os dados no IndexedDB. Há um playground web com uma linha do tempo que mostra o grafo mudando, e suporte experimental a WASI e à computação de borda [06:42].

## Escopo e limites

O Minigraf é uma biblioteca que roda junto com a aplicação. Não é um banco distribuído: não tem protocolo de rede, clusterização nem replicação automática [07:05].

Também não segue o modelo cliente-servidor: cada instância é dona do próprio arquivo. E não substitui um banco de séries temporais de métricas de sensores; o foco é rastrear conhecimento ao longo do tempo [07:27].

Em bancos gravados em arquivo, cada fato serializado tem no máximo 4.080 bytes; a versão em memória não tem esse limite [07:49]. Textos grandes vão para o sistema de arquivos, e o grafo guarda só o contexto [08:09].

O projeto mira menos de 1 milhão de nós: é otimizado para cenários menores, com leitura rápida e pouco uso de memória, como o SQLite [08:09].

## Perguntas frequentes

### O Minigraf substitui um banco de dados de servidor?

Não. Ele é embutido na aplicação, não é distribuído e não segue o modelo cliente-servidor [07:05].

### O que é um banco bitemporal?

É um banco que registra dois tempos para cada fato: quando o sistema gravou a informação e quando ela valeu no mundo real [04:16].

## Fontes

- [project-minigraf/minigraf: Embedded graph memory for AI agents, mobile apps, and the browser.](https://github.com/project-minigraf/minigraf): O Minigraf é um banco de grafos embutido de arquivo único, com consultas em Datalog e tempo de transação e de validade em cada fato. Ele se descreve como "the SQLite of bi-temporal graph databases", tem bindings para Python, iOS e Android, roda no navegador por WebAssembly com IndexedDB e tem build WASI experimental. Em arquivo, cada fato tem no máximo 4.080 bytes; o projeto mira menos de 1 milhão de nós e não é distribuído nem cliente-servidor.

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Dados e decisão](https://mauricio.issei.com.br/temas/dados-e-decisao), [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

Neste vídeo explicativo, conheça o **Minigraf**, uma solução de memória de grafo incorporada (*embedded*) desenvolvida para **agentes de IA, aplicativos móveis e navegadores**.

O Minigraf une a praticidade de um banco de dados leve em um único arquivo no formato `.graph` ao poder de consultas nativas em **Datalog** e ao modelo **bitemporal**. Com a capacidade de realizar viagens no tempo (*time travel*), o Minigraf rastreia tanto o tempo de transação quanto o tempo de validade das informações, permitindo auditar decisões de agentes de IA e reconstruir estados passados de dados sem perder o histórico de alterações.

---

📌 **Principais destaques do Minigraf:**
- **Consultas em Datalog:** travessia nativa de grafos e regras recursivas de forma simples.
- **Suporte Bitemporal:** suporte completo a *time travel* utilizando tempo de transação e tempo de validade.
- **Banco Incorporado e Zero Configuração:** executado a partir de um único arquivo `.graph`.
- **Recursos Avançados:** inclui *window functions* e *prepared statements*.
- **Multiplataforma:** suporte nativo para Rust, Python, iOS, Android e navegadores via WebAssembly (WASM).

---

⏱️ **Capítulos do Vídeo:**
00:00 - Introdução ao Minigraf
01:10 - O que é um Banco de Dados de Grafo Bitemporal?
02:30 - Como funcionam as consultas em Datalog
04:00 - Casos de uso: Agentes de IA, Mobile e WebAssembly
05:20 - Testando na prática no Minigraf Playground
06:45 - Considerações Finais

---

🔗 **Links e Fontes Oficiais:**
- **Repositório Oficial no GitHub:** https://github.com/project-minigraf/minigraf
- **Minigraf Playground (Ambiente de testes online):** https://minigraf-playground.vercel.app/

## Transcrição

_Transcrição automática, não revisada._

[0:00] E aí, pessoal que tá construindo o futuro da inteligência artificial, bem-vindos a esta análise. Hoje o foco da nossa exploração é uma ferramenta super leve, mas com um poder de fogo absurdo que tá resolvendo uns desafios de dados bem complexos por aí. O nome dessa ferramenta é minigraf. Para quem trabalha no desenvolvimento de aplicações modernas, agentes autônomos ou qualquer sistema que dependa de uma memória local afiada, entender essa arquitetura pode literalmente mudar o jogo na hora de lidar com a persistência de informações. Sabe qual é um dos maiores gargalos hoje na construção de sistemas locais inteligentes? A memória. E a pergunta que vai guiar toda a nossa conversa hoje é exatamente essa: E se um banco de dados local pudesse lembrar de forma perfeita de absolutamente todos os estados passados? Tudo isso sem aquela sobrecarga massiva de armazenamento e sem precisar subir servidores super complexos. Porque normalmente quando a gente sobrescreve um dado, o histórico simplesmente evapora, certo? Manter um registro de auditoria completo ali no ambiente local sempre foi uma dor de

[1:00] cabeça arquitetural. Bom, pelo menos até agora. Pra gente ancorar essa ideia em algo bem familiar, a própria documentação do projeto traz uma definição fantástica. Eles chamam o minigraf de o Elite dos bancos de dados de grafos bitemporais. Essa analogia vai direto ao ponto. O SK Lite conquistou o mundo justamente por ser um arquivo único, totalmente embutido e com zero dor de cabeça de configuração. O Minigraph pega essa exata filosofia de simplicidade e joga num cenário de dados conectados em forma de grafos e de quebra ainda adiciona a super potência do histórico completo. Então o nosso roteiro de hoje tá dividido assim: um conheça o minigraf. Dois, o poder do datalog. Três, viagem no tempo bitemporal. Quatro, casos de uso reais. E fechando a sessão 5 sobre escopo e limites. Começando pela sessão um, conheça o minigraf, a memória de grafos embutida para aplicações modernas. Vamos destrinchar o que ele é. O Minigraph é construído em Rust, o que já garante de cara aquela segurança de memória e uma

[2:02] altíssima performance. E ele funciona a partir de um único arquivo com extensão pongh. Quando dizemos zero configuração é literal, tá? É só uma linha de código mandando abrir o arquivo e o banco já tá rodando. Diferente dos bancos relacionais clássicos, ele guarda os fatos como arestas de um grafo. Isso permite fazer consultas bem avançadas usando a linguagem datalog, mantendo intacto todo o histórico daquelas informações. Dando uma olhada no mercado, o posicionamento dele fica muito claro. Existem bancos de grafos sensacionais e super maduros por aí, como o Neo 4J ou o XTDB, que também tem recursos temporais. E claro, temos o ESK Lite dominando o armazenamento embutido, mas olha só, o mini graph é a única solução nativa feita em Rust, que cruza a linguagem datalog com armazenamento de arquivo único, somado a recursos bitemporais e já prontinho para rodar até via web assembly no navegador. Simplesmente não tem outro concorrente ocupando essa mesma intersecção. Avançando paraa sessão dois, o poder do datalog. E a pergunta que sempre surge,

[3:02] por que não usar o velho e bom SQL? A resposta morre na natureza dos dados. O SQL foi desenhado para tabelas, já o data log foi feito para relações lógicas e consequentemente para grafos. Imagina tentar buscar amigos de amigos de amigos. Com data log, essa travessia de múltiplos saltos é um processo natural, recursivo por design, sem precisar daquelas gambiarras pesadas com múltiplos joints que destróem a performance no SQL. A estrutura do datalog respira grafos baseada no modelo entidade atributo valor. Um fato no banco é literalmente uma aresta. E como a especificação da linguagem é bem menor, ela acaba sendo mais confiável e perfeita para lidar com o fator tempo. Mas o grande pulo do gato moderno do datalog é outro. Ele é extremamente amigável pra inteligência artificial. A gramática é tão compacta e uniforme, livre daquele labirinto de subconsultas do SQL, que a linguagem inteira do minigraf cabe dentro do prompt de sistema de um assistente de IA. Ou seja, os grandes modelos de linguagem conseguem gerar consultas impecáveis só com alguns exemplos. é o casamento

[4:03] perfeito para quem trabalha com o desenvolvimento assistido por IA. Chegamos agora na sessão três, viagem no tempo bitemporal. O que significa lembrar tanto da transação quanto da verdade. O pulo aqui é entender essas duas dimensões de tempo, algo muito inspirado naquele banco clássico, o Day Tomic. O tempo da transação é exatamente o instante em que o sistema gravou a informação no disco. Já o tempo válido é quando aquilo aconteceu de fato no mundo real. Nos sistemas comuns só existe um relógio rodando, mas no modelo bitemporal essas duas linhas do tempo andam juntas. Isso permite que a gente corrija o passado sem apagar o registro de quando o sistema ficou sabendo dessa correção. Pensa no seguinte cenário: Minuto um, o aplicativo tá offline e registra uma informação errada. Minuto 5, a internet volta e uma correção retroativa é sincronizada. Tipo, opa, lá no minuto um, o valor não era Y, era X. A mágica de verdade acontece no minuto 10. A gente pode consultar o banco perguntando qual era o estado do conhecimento no minuto dois, antes dessa

[5:04] correção chegar. O Minigraf reconstrói exatamente o que o sistema acreditava ser verdade naquele ponto exato do passado. A trilha de auditoria fica absolutamente perfeita e a prova de falhas. Seguindo pra sessão quatro, casos de uso reais. Onde isso entra na prática? agentes, mobile e navegador. Todo esse poder de um banco de grafos embutido e bitemporal acaba brilhando muito forte em três frentes principais, atuando como memória para agentes de inteligência artificial, armazenando dados localmente em aplicativos móveis e rodando aplicações direto no navegador. Pra galera que constrói agentes de IA, o Minigraf é a cura para alucinação temporal. Um agente autônomo guarda o que ele acha que é verdade para tomar uma decisão. Se ele errar, dá para corrigir sem explodir a memória do erro inicial. Imagina usar isso num padrão graph rag, combinando com bancos vetoriais. O banco vetorial busca por similaridade semântica e o minigraf entrega na lata quais eram os relacionamentos exatos e o que esse agente acreditava no instante em que tomou aquela decisão. Desse poder de

[6:04] auditar o raciocínio passado de uma IA é algo surreal. No mundo mobile, a pegada é o armazenamento offline first. Imagina um aplicativo de saúde usado em campo, onde a conexão cai toda hora. Os dados são registrados offline. Quando o celular acha o sinal de novo e o sistema percebe um erro de digitação lá de trás, ele insere o fato retroativo preservando toda a auditoria. E o mais legal, graças às bibliotecas integradas via Uniffi, dá para desenvolver direto em Cotlin no Android ou Swift no iOS. Quem desenvolve não precisa encostar numa linha sequer de Rust para usar essa engine. E a web não fica de fora. Compilando paraa web assembly o ASM, o Minigraf roda nativamente dentro do navegador do usuário, salvando tudo de forma persistente através do index db. Tem até um visualizador em formato de playground rodando na web, onde você arrasta um controle deslizante numa linha do tempo e vê o mapa do grafo se reescrevendo visualmente diante dos seus olhos. Sem contar o suporte experimental para ambientes WASI e em arquitetura de borda, o famoso ed computing. Por fim,

[7:05] entramos na sessão C, escopo e limites, porque é essencial conhecer as fronteiras de qualquer tecnologia. Fazer esse contraste é super importante para não errar na arquitetura. O Minigraph é uma biblioteca que mora junto com a aplicação, ou seja, ele não é de jeito nenhum banco de dados distribuído. Esquece protocolos de rede, clusterização ou replicação automática. E ele definitivamente não segue o modelo cliente e servidor. Cada instância é a dona absoluta do seu próprio arquivo. Outro ponto, mesmo lidando com o tempo de forma brilhante, ele não serve para substituir um banco de séries temporais focado em métricas contínuas de sensores. O negócio dele é rastrear conhecimento lógico ao longo do tempo. E claro, temos algumas realidades físicas no meio do caminho. Pros bancos apoiados em arquivo, tem um limite bem estrito. Cada fato serializado inserido lá não pode passar de 4080 bytes. Embora a versão em memória do Minigraph não tenha essa trava, esse limite no disco existe por um motivo muito bom. garantir que o gerenciamento das páginas do banco seja

[8:07] absurdamente eficiente. A regra é simples: textos gigantescos vão pro sistema de arquivos e o grafo cuida só do contexto lógico. E olha que interessante essa restrição super transparente, mirando em menos de 1 milhão de nós. Hoje o ecossistema vive obsecado com bilhões de registros, né? O minigraph vai na contramão. Ele é propositalmente otimizado para cenários menores, entregando velocidades de leitura assustadoras com o uso mínimo de memória. Mais uma vez, igualzinho ao SK Lite. A eficiência absurda em pequena escala vale muito mais aqui do que tentar bancar o herói do big data. Juntando todas essas peças, um mar de novas possibilidades arquiteturais se abre. Ter data log, viagem real no tempo e um armazenamento offline super robusto, tudo num arquivinho só, altera totalmente as regras do jogo. Ao editar o passado e corrigir o presente de forma autônoma, sem precisar bater na nuvem, cria uma fundação incrível para softwares modernos. E aí fica a reflexão final pra gente. Sabendo de todo esse poder embalado num pacote tão leve, como será que essa tecnologia vai influenciar

[9:07] a espinha dorsal da próxima grande aplicação de inteligência artificial local? Explorar essa resposta pode muito bem redefinir a próxima geração de aplicações.
