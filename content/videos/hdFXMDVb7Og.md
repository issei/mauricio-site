---
id: hdFXMDVb7Og
slug: openkb-criando-sua-base-de-conhecimento-inteligente
status: rascunho
temas:
  - dados-e-decisao
resumo: O OpenKB é uma ferramenta de código aberto que transforma documentos numa wiki local, ligada e mantida por IA, sem banco de vetores. O vídeo mostra a configuração, as consultas, a estrutura em árvore do PageIndex, o modo watch, a visualização no Obsidian, o arquivo AGENTS.md e o comando de verificação da base.
fontes:
  - url: https://github.com/VectifyAI/OpenKB
    titulo: OpenKB (Open LLM Knowledge Base)
    sustenta: Os comandos do OpenKB (init, query, chat, watch e lint) e a wiki em Markdown gerada a partir dos documentos.
    verificada: false
  - url: https://github.com/VectifyAI/PageIndex
    titulo: PageIndex (Document Index for Vectorless RAG)
    sustenta: A estrutura em árvore com resumos, sem vetores, e a frase "similaridade não é relevância".
    verificada: false
  - url: https://github.com/BerriAI/litellm
    titulo: LiteLLM (AI Gateway & Python SDK)
    sustenta: O LiteLLM liga vários provedores de IA, como OpenAI, Anthropic e Gemini, por uma só interface.
    verificada: false
youtube:
  titulo: OpenKB - Criando sua base de conhecimento inteligente
  publicado_em: 2026-05-07
  duracao: PT5M59S
  descricao: |-
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
  miniatura: https://i.ytimg.com/vi/hdFXMDVb7Og/maxresdefault.jpg
  visualizacoes: 128
  playlists: []
  legenda: automatica
  links_descricao:
    - https://github.com/VectifyAI/OpenKB
    - https://github.com/VectifyAI/PageIndex
    - https://github.com/BerriAI/litellm
    - https://github.com/openai/openai-agents-python
    - https://x.com/karpathy/status/2039805659525644595
  coletado_em: 2026-11-07T22:16:07Z
---

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
