---
id: tnS7hxUnHI4
slug: google-okf-na-pratica-memoria-persistente-e-padroes-de
status: publicado
temas:
  - engenharia-agentica
resumo: O vídeo apresenta o Open Knowledge Format (OKF) 0.2, um formato aberto em texto simples para guardar conhecimento, e o projeto OKF Agent Memory, que usa o formato como memória persistente para agentes de IA. Explica a arquitetura em cinco camadas, as regras do agente e os comandos para usar no dia a dia.
fontes:
  - url: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    titulo: "Open Knowledge Format (OKF), Version 0.2"
    sustenta: O OKF é um diretório de arquivos Markdown com frontmatter YAML, em que "type" é o único campo obrigatório; o bundle é uma árvore de diretórios e os conceitos se ligam por links Markdown.
    verificada: true
  - url: https://github.com/okf-memory/okf-agent-memory
    titulo: "okf-memory/okf-agent-memory: Git-native persistent memory for AI coding agents"
    sustenta: O OKF Agent Memory é um binário sem dependências externas, com busca BM25 em memória, comandos bootstrap, validate, search e create, servidor MCP e arquitetura em cinco camadas.
    verificada: true
revisado_por: "Maurício Yokoyama Issei"
revisado_em: 2026-11-19
youtube:
  titulo: "Google OKF na Prática: Memória Persistente e Padrões de Conhecimento para Agentes de IA"
  publicado_em: 2026-09-11
  duracao: PT9M21S
  descricao: |-
    Neste vídeo explicativo, exploramos o **Google Open Knowledge Format (OKF)** e demonstramos como utilizar o ecossistema **okf-agent-memory** na prática!

    O **OKF** é uma especificação aberta e vendor-neutral que formaliza o conhecimento organizacional em uma estrutura de arquivos Markdown enriquecidos com metadados em YAML (frontmatter). Ele resolve o problema de contexto fragmentado em sistemas de IA, criando um grafo de conhecimento navegável, versionado no Git e diretamente legível por humanos e agentes de IA, sem a necessidade de bancos de dados vetoriais complexos.

    Aprofundamos nas atualizações da versão **OKF v0.2**, que introduz sinais de confiança, rastreabilidade de proveniência (`generated`, `verified`, `sources`), gerenciamento do ciclo de vida (`status`, `stale_after`) e computações atestadas. 

    Além disso, apresentamos o ecossistema **okf-agent-memory**, desenvolvido em Go com busca BM25 em memória de alta velocidade (menor que 300µs) e servidor MCP (Model Context Protocol) embutido para integração direta com ferramentas como Claude Code e Cursor.

    ---

    📌 **Capítulos do Vídeo:**
    - **00:00** - O que é o Google Open Knowledge Format (OKF)?
    - **01:45** - O Problema do Contexto Fragmentado na IA Agentica
    - **03:30** - Estrutura de Arquivos: Markdown + YAML Frontmatter
    - **05:50** - Novidades do OKF v0.2: Proveniência, Sinais de Confiança e Atestação
    - **08:20** - Arquitetura do `okf-agent-memory` (Go, Busca BM25 e Servidor MCP)
    - **11:10** - Demonstração Prática de Uso do Agente OKF
    - **14:00** - Conclusão e Próximos Passos

    ---

    🔗 **Links das Fontes e Referências Citadas:**

    • **Google Cloud Blog — Anúncio Oficial do OKF:**
    https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

    • **Google Cloud Blog — OKF v0.2 e Sinais de Confiança:**
    https://cloud.google.com/blog/products/data-analytics/okf-v02-tackles-agentic-trust

    • **Especificação Oficial do OKF no GitHub (`SPEC.md`):**
    https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md

    • **Repositório GitHub — okf-agent-memory:**
    https://github.com/okf-memory/okf-agent-memory

    • **Guia Completo do OKF (WitsCode):**
    https://witscode.com/open-knowledge-format

    • **Entendendo o OKF no GitBook Blog:**
    https://www.gitbook.com/blog/what-is-okf-open-knowledge-format

    • **Padrões e Arquitetura do OKF (DesignPattern.fyi):**
    https://www.designpattern.fyi/okf/

    • **Open Knowledge Foundation (História e Padrões):**
    https://okfn.org/ e https://pt.wikipedia.org/wiki/Open_Knowledge

    ---

    #IA #OpenKnowledgeFormat #GoogleCloud #AIAgents #Git #MCP #Golang #MachineLearning #Developer
  miniatura: https://i.ytimg.com/vi/tnS7hxUnHI4/maxresdefault.jpg
  visualizacoes: 92
  playlists: []
  legenda: automatica
  links_descricao:
    - https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing
    - https://cloud.google.com/blog/products/data-analytics/okf-v02-tackles-agentic-trust
    - https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    - https://github.com/okf-memory/okf-agent-memory
    - https://witscode.com/open-knowledge-format
    - https://www.gitbook.com/blog/what-is-okf-open-knowledge-format
    - https://www.designpattern.fyi/okf/
    - https://okfn.org/
    - https://pt.wikipedia.org/wiki/Open_Knowledge
  coletado_em: 2026-11-07T22:16:07Z
---

## A amnésia dos agentes de IA

O vídeo trata de um problema comum: o agente de IA esquece o contexto da arquitetura no meio de uma sessão de código [00:00]. A proposta é um padrão de texto simples, apoiado pelo Google, para dar ao agente uma memória de longo prazo [00:20].

Durante uma sessão, o agente recebe instruções, toma decisões de arquitetura e descobre o contexto do domínio. Quando a janela de contexto se fecha, tudo desaparece [01:02]. Falta uma camada de memória persistente que não dependa de uma empresa específica [01:23].

Hoje, as opções são ruins [01:43]:

- Arquivos Markdown improvisados, sem estrutura, que incham a janela de contexto e gastam tokens [01:43].
- Bancos de dados vetoriais, caros, opacos e que criam dependência de fornecedor [01:43].

## O que é o OKF

O Open Knowledge Format, na versão 0.2, foi anunciado pelo Google Cloud em junho de 2026 [02:25]. Não é um software nem um banco de dados: é uma especificação aberta e neutra [02:25]. O conhecimento fica num diretório de arquivos Markdown com cabeçalho em YAML [02:25]. O único campo obrigatório é o `type` [02:47].

O vídeo compara o OKF a um cabo USB-C do conhecimento: um formato comum que qualquer IA consegue ler, escrever e trocar, sem um SDK diferente para cada projeto [03:07].

O design segue três princípios [03:29]:

- ser minimamente opinativo, sem impor estruturas rígidas [03:29];
- separar quem produz de quem consome: uma decisão escrita por uma IA pode ser lida meses depois num editor de texto comum [03:29];
- focar no formato, não na plataforma [03:49].

## A arquitetura

Tudo fica num knowledge bundle, que é uma árvore de diretórios comum [04:10]. Cada conceito tem um arquivo Markdown com um ID único, os metadados no topo, o corpo do texto e links para outros conceitos [04:10]. Com links Markdown simples, os agentes seguem a rede de conhecimento como um grafo, sem banco de dados [04:31].

O sistema tem cinco camadas [04:52]:

1. a especificação do OKF [04:52];
2. as convenções de memória [04:52];
3. as habilidades e os prompts do agente [04:52];
4. as ferramentas, que validam os arquivos [04:52];
5. o conhecimento do projeto [05:12].

Separar as camadas tira do modelo o trabalho com a formatação: a ferramenta garante a estrutura [05:12].

## O agente OKF

O OKF Agent Memory leva o formato para o Git como memória do agente [05:12]. Segundo o vídeo, a busca leva menos de 300 microssegundos, com índices BM25, num binário em Go sem dependências externas [05:33]. O projeto diz que reduz o desperdício de tokens em 80% [05:54]. Isso vem da divulgação progressiva: a IA consulta os índices e carrega só os conceitos de que precisa [06:16].

O agente segue regras estritas [06:16]:

- pesquisar antes de escrever [06:16];
- preferir atualizar um arquivo a criar um duplicado [06:16];
- marcar a proveniência dos dados [06:37];
- dizer explicitamente quando não tem certeza sobre algo [06:37].

## Na prática

Os comandos principais são [06:58]:

- `okf bootstrap`, que configura a base de memória do projeto [06:58];
- `okf validate`, que confere se os arquivos seguem a especificação [06:58];
- `okf search`, para buscar [07:19];
- `okf create`, para criar um conceito [07:19].

Toda mudança na memória passa pelo Git e entra na revisão de código normal [07:19]. O comando `okf mcp` sobe um servidor MCP pela entrada e saída padrão, sem abrir porta de rede [07:39]. O contexto fica privado na máquina local e se conecta a editores como Cursor, Codex e Claude, sem custo de API de rede [07:39].

## O futuro do conhecimento

O vídeo contrasta os armazéns vetoriais proprietários, frágeis e opacos, com pacotes de conhecimento em texto simples, nativos do Git e auditáveis por qualquer pessoa [08:20]. A pergunta final é se o conhecimento da organização vai ser legível pelos agentes do futuro ou vai ficar preso numa caixa preta [08:40].

## Perguntas frequentes

### O OKF é um banco de dados?

Não. É uma especificação aberta: um diretório de arquivos Markdown com cabeçalho YAML [02:25].

### Qual campo é obrigatório num conceito OKF?

Só o campo `type` [02:47].

### Preciso de um servidor na nuvem para usar a memória OKF?

Não. Segundo o vídeo, o servidor MCP roda na máquina local, pela entrada e saída padrão [07:39].
