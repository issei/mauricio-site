---
titulo: Enterprise Search, RAG e Knowledge Graphs — busca híbrida, embeddings, chunking, permission-aware retrieval, grounding e avaliação
modulo: Pilar 5.6 — AI / Knowledge / Search
nivel: Especialista
ultima_atualizacao: 2026-10-03
tags: [enterprise-search, rag, agentic-rag, busca-hibrida, bm25, embeddings, chunking, rrf, reranking, knowledge-graph, graphrag, permission-aware, avaliacao]
---

# Enterprise Search, RAG e Knowledge Graphs: encontrar o conhecimento certo, para a pessoa certa, no contexto certo

Este arquivo aprofunda a camada de descoberta de conhecimento de um Digital Workplace orientado a agentes. Ele cobre busca lexical, semântica e híbrida; embeddings e chunking; filtros de metadados e de permissão; grafos de conhecimento; RAG e Agentic RAG; e, principalmente, como avaliar. Não se presume que a organização já use busca semântica ou RAG; as propostas são **[RECOMENDAÇÃO]**.

## 1. Que problema existe

O colaborador pergunta "posso trabalhar remoto de outro estado?". A resposta está em uma cláusula da política de teletrabalho, condicionada a vínculo empregatício e cargo, com uma exceção publicada em comunicado posterior. A busca precisa: entender a pergunta em linguagem natural, encontrar a cláusula (e não a página inicial da política), aplicar o filtro de vínculo e cargo, considerar a exceção mais recente e, acima de tudo, **não mostrar** conteúdo que essa pessoa não pode ver.

## 2. Técnicas de busca e seus pontos cegos

| Técnica | Como funciona | Forte em | Fraco em |
| --- | --- | --- | --- |
| **Lexical (BM25)** | termos ponderados por frequência | siglas, códigos de normativo, nomes, números | sinônimos e paráfrases |
| **Semântica densa (embeddings)** | similaridade entre vetores | perguntas em linguagem natural, paráfrases | termos raros, negação, números exatos |
| **Esparsa aprendida** | expansão de termos aprendida | meio-termo entre lexical e densa | custo de indexação |
| **Híbrida** | combina listas de resultados | robustez | calibração e avaliação |
| **Reranking (cross-encoder)** | reordena os top-N com um modelo mais preciso | precisão nos primeiros resultados | latência e custo |
| **Grafo de conhecimento** | navega relações explícitas | perguntas relacionais e globais | construção e manutenção |

### Fusão de resultados

- **RRF (Reciprocal Rank Fusion):** combina listas pelo posto de cada documento, sem precisar normalizar scores. O Elasticsearch o define como "um método para combinar múltiplos conjuntos de resultados com diferentes indicadores de relevância em um único conjunto"; a fórmula soma `1 / (k + posto)` para cada consulta em que o documento aparece. **[FATO]** ([Elastic](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion))
- **Normalização de scores e combinação ponderada:** o OpenSearch oferece pipelines de busca com processador de normalização e um processador `score-ranker` com RRF. **[FATO]** ([OpenSearch](https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/))

## 3. Embeddings e chunking

### Chunking: o elo mais subestimado

| Estratégia | Quando usar | Risco |
| --- | --- | --- |
| Tamanho fixo com sobreposição | conteúdo homogêneo, prototipação | corta no meio de cláusulas |
| Por estrutura (seções, cláusulas) | normativos, procedimentos | exige conteúdo estruturado |
| Hierárquico (pai e filho) | recuperar trecho pequeno, entregar contexto maior | complexidade de indexação |
| Por entidade (ficha de benefício inteira) | conteúdo estruturado curto | — |

**[RECOMENDAÇÃO]** Cada chunk carrega **título do documento, caminho de seções, versão, vigência e metadados de permissão**. Um chunk "a ajuda de custo é de R$ X" sem o título "Teletrabalho — vínculo CLT" é perigoso.

### Escolha de modelo de embedding

Critérios: desempenho em português e no vocabulário corporativo e setorial, dimensão (custo de armazenamento), latência, possibilidade de execução em ambiente controlado e estabilidade de versão. **Trocar o modelo de embedding exige reindexar tudo**; versionar o índice pelo modelo é obrigatório. **[INFERÊNCIA]**

## 4. Metadata filtering e permission-aware retrieval

### Pré-filtro, pós-filtro e por que isso importa

| Abordagem | Como funciona | Problema |
| --- | --- | --- |
| **Pós-filtro** | busca tudo, depois remove o que o usuário não pode ver | pode devolver zero resultados úteis; o conteúdo restrito já passou por componentes intermediários |
| **Pré-filtro no índice** | a consulta já inclui o filtro de permissão e de metadados | exige permissões indexadas e sincronizadas |
| **Filtro no momento da geração** | o modelo recebe tudo e é instruído a não usar o restrito | **inaceitável**: o modelo já viu o conteúdo |

**[RECOMENDAÇÃO]** Pré-filtro no índice, com a identidade do usuário resolvida em grupos e atributos no momento da consulta.

### Exemplo público

O Microsoft 365 Copilot declara que "só exibe dados organizacionais aos quais o usuário tem pelo menos permissão de visualização" e que o índice semântico "respeita a fronteira de acesso baseada na identidade do usuário". **[FATO]** ([Microsoft Learn](https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy))

### Pergunta crítica: como garantir permission-aware retrieval?

1. **Permissões como metadados de cada chunk** (ACL ou atributos), herdadas do documento de origem.
2. **Sincronização orientada a eventos:** quando a permissão muda na origem, o índice é atualizado (com SLO de propagação).
3. **Resolução da identidade na consulta:** grupos e atributos do usuário vêm do IdP, nunca do texto da pergunta.
4. **Testes de vazamento:** conjunto de consultas executadas com identidades de baixo privilégio que **não podem** retornar certos documentos; roda em CI e periodicamente em produção.
5. **Revisão de oversharing antes da indexação:** a IA expõe em escala permissões erradas que antes eram "protegidas" pela dificuldade de encontrar o conteúdo. **[INFERÊNCIA]**

## 5. Knowledge graphs

Um grafo de conhecimento representa entidades (políticas, cargos, benefícios, sistemas, áreas) e relações (aplica-se a, exige, é aprovado por, substitui).

| Uso | Valor |
| --- | --- |
| Perguntas relacionais ("quem aprova acesso ao sistema X para meu cargo?") | navegação explícita, explicável |
| Perguntas globais ("quais são os temas mais frequentes nos normativos de RH?") | o GraphRAG mostrou ganhos nesse tipo de pergunta ao construir grafos de entidades e resumos de comunidades ([Edge et al., 2024](https://arxiv.org/abs/2404.16130)) **[FATO]** |
| Desambiguação ("benefício" no sentido de plano ou de PLR?) | contexto relacional |
| Filtros de aplicabilidade | relação política → cargo → vínculo |

**Custo:** extração de entidades, curadoria e manutenção. **[RECOMENDAÇÃO]** Começar com um grafo pequeno e de alto valor (catálogo de serviços, estrutura organizacional, aplicabilidade de políticas), e não com a extração automática de todo o corpus.

## 6. RAG e Agentic RAG

### RAG clássico

```text
Pergunta → (reescrita) → Busca híbrida com filtros → Reranking → Seleção de trechos → Geração com citações
```

O RAG combina um modelo gerador com um mecanismo de recuperação, e foi formalizado por Lewis et al. em 2020 ([arXiv](https://arxiv.org/abs/2005.11401)). **[FATO]**

### Agentic RAG

O agente decide **se** busca, **onde** busca (índice de normativos, API de benefícios, grafo), **reformula** a consulta quando o resultado é fraco e **combina** fontes. Ganha em perguntas compostas; perde em previsibilidade, latência e custo.

| Critério | RAG clássico | Agentic RAG |
| --- | --- | --- |
| Perguntas simples de política | **melhor** | desnecessário |
| Perguntas compostas (política + dado pessoal) | limitado | **melhor** |
| Latência e custo | baixos | mais altos |
| Testabilidade | alta | menor |

### Grounding

- Responder **apenas** com base nos trechos recuperados; quando não houver base, dizer que não encontrou.
- **Citações verificáveis:** ID, versão e seção.
- **Contexto enxuto:** modelos aproveitam pior informação posicionada no meio de contextos longos. **[FATO]** ([Liu et al., 2023](https://arxiv.org/abs/2307.03172)) Implicação: menos trechos, mais relevantes, bem ordenados.

## 7. Avaliação

| Camada | Métrica | Como medir |
| --- | --- | --- |
| Recuperação | recall@k, MRR, nDCG | conjunto de perguntas reais com documentos relevantes anotados |
| Permissão | taxa de vazamento (deve ser zero) | consultas com identidades de baixo privilégio |
| Grounding | proporção de afirmações sustentadas pelas fontes | avaliação automática com revisão humana amostral |
| Resposta | correção, completude, atualidade | avaliação humana por especialistas do domínio |
| Utilidade | resolução sem recontato | telemetria de produto |

**[RECOMENDAÇÃO]** Construir o conjunto de avaliação **antes** de escolher tecnologia, a partir dos logs reais de busca e do assistente. Sem ele, qualquer comparação entre motores de busca é opinião.

## 8. Comparativo de alternativas tecnológicas

| Alternativa | Faz sentido quando | Trade-offs |
| --- | --- | --- |
| **Elasticsearch** | já existe expertise e cluster; busca híbrida com filtros ricos | licenciamento e operação; calibração de relevância |
| **OpenSearch** | preferência por projeto open source sob fundação; ecossistema AWS | operação; recursos de relevância evoluem por versão |
| **Banco vetorial dedicado** | volume vetorial muito alto e latência crítica | metadados, permissões e busca lexical tendem a ficar em outro sistema |
| **Extensão vetorial em banco relacional** | volume moderado; dados e permissões já relacionais | recursos de relevância limitados em escala |
| **Serviço gerenciado de busca com IA (nuvem ou SaaS)** | velocidade; conectores prontos | acoplamento, opacidade de ranking, residência de dados |
| **Busca nativa da suíte de produtividade** | o conteúdo já vive na suíte | não cobre SoRs nem outros repositórios |

**[INFERÊNCIA]** Para um corpus corporativo com permissões complexas, a busca híbrida em um motor que trate metadados e ACLs como cidadãos de primeira classe tende a ser mais adequada do que um banco vetorial isolado. Não há escolha universal.

## 9. Dependências, riscos e maturidade

- **Dependências:** conteúdo com metadados e permissões (ver `03_pilares/ecm_csp_headless_content_governanca.md`), identidade, conjunto de avaliação, pipeline de ingestão orientado a eventos.
- **Riscos:** confundir similaridade com validade; vazamento por permissão defasada; custo de reindexação; injeção de prompt indireta via documentos indexados.
- **Maturidade:** busca lexical e híbrida são **maduras**; RAG clássico é **maduro em padrões, variável em qualidade**; Agentic RAG e GraphRAG estão **em consolidação**. **[INFERÊNCIA]**

## Fontes

- Elastic, Reciprocal Rank Fusion: https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion
- OpenSearch, Hybrid search: https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/
- Microsoft Learn, Microsoft 365 Copilot privacy: https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy
- Edge et al., From Local to Global: A Graph RAG Approach (2024): https://arxiv.org/abs/2404.16130
- Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (2020): https://arxiv.org/abs/2005.11401
- Liu et al., Lost in the Middle (2023): https://arxiv.org/abs/2307.03172
