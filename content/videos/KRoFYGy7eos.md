---
id: KRoFYGy7eos
slug: minigraf-o-banco-de-dados-de-grafo-bitemporal-incorporado
status: publicado
temas:
  - dados-e-decisao
  - engenharia-agentica
resumo: O vídeo apresenta o Minigraf, um banco de dados de grafos embutido, de arquivo único, escrito em Rust, com consultas em Datalog e modelo bitemporal. Explica a diferença entre tempo de transação e tempo válido, os usos em agentes de IA, aplicativos móveis e navegador, e os limites do projeto.
fontes:
  - url: https://github.com/project-minigraf/minigraf
    titulo: "project-minigraf/minigraf: Embedded graph memory for AI agents, mobile apps, and the browser."
    sustenta: O Minigraf é um banco de grafos embutido de arquivo único, com consultas em Datalog e tempo de transação e de validade em cada fato. Ele se descreve como "the SQLite of bi-temporal graph databases", tem bindings para Python, iOS e Android, roda no navegador por WebAssembly com IndexedDB e tem build WASI experimental. Em arquivo, cada fato tem no máximo 4.080 bytes; o projeto mira menos de 1 milhão de nós e não é distribuído nem cliente-servidor.
    verificada: true
revisado_por: Maurício Yokoyama Issei
revisado_em: 2026-11-19
youtube:
  titulo: "Minigraf: O Banco de Dados de Grafo Bitemporal Incorporado para IA e Web"
  publicado_em: 2026-10-10
  duracao: PT9M20S
  descricao: |-
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
  miniatura: https://i.ytimg.com/vi/KRoFYGy7eos/maxresdefault.jpg
  visualizacoes: 69
  playlists: []
  legenda: automatica
  links_descricao:
    - https://github.com/project-minigraf/minigraf
    - https://minigraf-playground.vercel.app/
  coletado_em: 2026-11-07T22:16:07Z
---

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
