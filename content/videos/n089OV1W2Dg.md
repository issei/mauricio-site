---
id: n089OV1W2Dg
slug: o-guia-do-agentic-rag-o-que-e-como-funciona-e-a-evolucao-do
status: rascunho
temas:
  - engenharia-agentica
  - dados-e-decisao
resumo: "O RAG tradicional consulta uma base antes de responder, mas segue um roteiro fixo. No Agentic RAG, a IA decide quando buscar, que ferramenta usar e se a informação basta. O vídeo explica essa diferença, como esses agentes planejam, por que faltam dados para treiná-los e os desafios que restam."
fontes:
  - url: https://arxiv.org/pdf/2501.09136
    titulo: "Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG"
    sustenta: "A diferença entre o RAG tradicional e o Agentic RAG, com planejamento, uso de ferramentas e autoavaliação."
    verificada: false
  - url: https://aclanthology.org/2026.findings-acl.78.pdf
    titulo: "Data-Centric Perspectives on Agentic Retrieval-Augmented Generation: A Survey"
    sustenta: "A falta de dados de treino para agentes e o pipeline de coleta, geração sintética, verificação e refinamento."
    verificada: false
  - url: https://arxiv.org/pdf/2312.10997
    titulo: "Retrieval-Augmented Generation for Large Language Models: A Survey"
    sustenta: "O que é o RAG tradicional e como ele consulta bases externas antes de gerar a resposta."
    verificada: false
youtube:
  titulo: "O Guia do Agentic RAG: O que é, Como Funciona e a Evolução do RAG Tradicional"
  publicado_em: 2026-08-26
  duracao: PT9M28S
  descricao: |-
    Neste vídeo, apresentamos um guia completo sobre o **Agentic RAG**, a nova fronteira na engenharia de dados e sistemas de busca auxiliados por Inteligência Artificial. 

    Se você já conhece o **RAG Tradicional (Retrieval-Augmented Generation)**, sabe que ele resolve o problema de atualização das bases de conhecimento dos LLMs. No entanto, o RAG clássico opera sob um fluxo rígido e estático de "recuperar e gerar". O **Agentic RAG** muda esse paradigma ao transformar o processo de busca em uma sequência de decisões ativas, onde o modelo de linguagem atua como um agente autônomo. 

    Esses sistemas inteligentes utilizam padrões avançados como **planejamento, uso de ferramentas, reflexão e colaboração multiagente** para decidir de forma dinâmica como, quando e onde buscar as informações necessárias para resolver problemas complexos de múltiplas etapas.

    ---

    ### 🔍 O que você vai aprender neste vídeo:
    * **As Limitações do RAG Tradicional:** Por que sistemas lineares sofrem com sobrecarga de contexto e falta de mecanismos de autocorreção.
    * **Arquitetura Modular:** Conheça as engrenagens por trás do sistema — o Planejador (Planner), o Motor de Recuperação (Retrieval Engine), o Motor de Raciocínio (Controller) e os Sistemas de Memória.
    * **Padrões de Fluxo de Trabalho (Workflows):** Como o encadeamento de prompts (Prompt Chaining), roteamento dinâmico e arquiteturas corretivas (Corrective RAG) garantem respostas mais precisas e evitam alucinações.
    * **Aplicações de Impacto Real:** Como essa evolução está transformando setores de alta complexidade como saúde, finanças, análise de contratos jurídicos e suporte personalizado ao cliente.

    ---

    ### 📚 Referências Científicas & Fontes:

    O conteúdo deste vídeo é totalmente fundamentado nas principais pesquisas e levantamentos acadêmicos sobre sistemas agênticos e recuperação de informação:

    1. **Data-Centric Perspectives on Agentic Retrieval-Augmented Generation: A Survey**
       * *Foco:* Análise profunda do ciclo de vida dos dados em sistemas agênticos.
       * *PDF:* https://aclanthology.org/2026.findings-acl.78.pdf

    2. **Retrieval-Augmented Generation for Large Language Models: A Survey**
       * *Foco:* A evolução histórica dos paradigmas RAG (do Naive ao Modular RAG).
       * *PDF:* https://arxiv.org/pdf/2312.10997

    3. **Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG**
       * *Foco:* Taxonomia das arquiteturas de agentes e padrões de colaboração multiagente.
       * *PDF:* https://arxiv.org/pdf/2501.09136

    4. **SoK: Agentic Retrieval-Augmented Generation (RAG): Taxonomy, Architectures, Evaluation, and Research Directions**
       * *Foco:* Sistematização do conhecimento sob a perspectiva de processos de decisão sequencial (POMDP).
       * *PDF:* https://arxiv.org/pdf/2603.07379

    5. **Você sabe a diferença entre RAG e Agentic RAG?**
       * *Foco:* Introdução prática e didática sobre a transição do paradigma clássico para o agêntico.
       * *Link:* https://elisaterumi.substack.com/p/voce-sabe-a-diferenca-entre-rag-e

    ---

    Se este conteúdo ajudou você a compreender a evolução e o futuro das arquiteturas de Inteligência Artificial, **compartilhe este vídeo** com seus colegas desenvolvedores, pesquisadores ou qualquer pessoa interessada em tecnologia e agentes inteligentes!

    #AgenticRAG #RetrievalAugmentedGeneration #InteligenciaArtificial #AIAgents #LLM #DeepResearch #MachineLearning #AIAgent #DataCentricAI #DynamicRetrieval
  miniatura: https://i.ytimg.com/vi/n089OV1W2Dg/maxresdefault.jpg
  visualizacoes: 172
  playlists: []
  legenda: automatica
  links_descricao:
    - https://aclanthology.org/2026.findings-acl.78.pdf
    - https://arxiv.org/pdf/2312.10997
    - https://arxiv.org/pdf/2501.09136
    - https://arxiv.org/pdf/2603.07379
    - https://elisaterumi.substack.com/p/voce-sabe-a-diferenca-entre-rag-e
  coletado_em: 2026-11-07T22:16:07Z
---
## O limite de memória da IA

Os grandes modelos de linguagem ficavam limitados ao que memorizaram no treinamento [00:00]. Como o conhecimento avança todo dia, um modelo congelado no tempo entrega fatos desatualizados, ou alucina e inventa respostas [01:03].

A primeira solução foi o RAG (geração aumentada por recuperação): em vez de responder de cabeça, a IA consulta bases externas antes de escrever [01:24]. O vídeo compara a um gênio trancado com livros velhos que ganha um computador com internet [01:24].

O RAG tradicional segue um roteiro fixo: a pergunta entra, o sistema busca documentos, entrega tudo à IA e sai a resposta [01:24]. Isso funciona bem para tarefas diretas, como achar a política de férias num manual de 1.000 páginas [01:45].

## A chegada do Agentic RAG

Quando as tarefas pedem raciocínio em várias etapas, contas e cruzamento de fontes, o roteiro fixo falha [02:07]. O vídeo resume: "O maior problema do RAG não é a busca, é a decisão" [02:29].

A IA precisa saber quando pesquisar, que ferramenta usar e perceber quando a informação não basta para responder [02:29]. No Agentic RAG, o agente age como um gerente de projeto: busca fatos na web, consulta bancos SQL e roda código em Python para não errar contas [03:10].

## Como esses agentes pensam

Exemplo: alguém pede para comparar o faturamento de duas empresas num trimestre, ajustado pela inflação [03:30]. O agente divide a tarefa. Consulta uma API financeira para cada empresa e usa uma ferramenta para converter as moedas [03:52].

Depois de cada passo, o agente se avalia: o resultado faz sentido? Falta algo? Se der erro, ele refaz o caminho e busca de novo [03:52].

## A falta de dados de treino

Para o RAG tradicional, bastava aprender com bilhões de páginas a ligar uma pergunta a um texto [04:36]. Um agente precisa ver tentativas, erros e correções de rota, e de como as ferramentas são usadas [04:36]. Dados de raciocínio em várias etapas são raros [04:57].

## Como os pesquisadores fabricam esses dados

O processo tem quatro etapas: coleta dos dados originais, geração de tarefas sintéticas difíceis, verificação rigorosa e refinamento [05:18]. O resultado são trajetórias de raciocínio limpas para treinar os próximos agentes [05:38].

- As tarefas são difíceis de propósito: se o treino for fácil, o modelo decora atalhos [05:38].
- Os pesquisadores aumentam a complexidade, escondem informações-chave e exigem conhecimento especializado [05:58].
- Na verificação, a cadeia de verificação obriga a IA a duvidar de si e listar as evidências antes de responder [06:20].
- Os resultados de vários modelos são cruzados, e há auditores humanos [06:41].
- No refinamento, os problemas ganham linguagem natural, os atalhos estatísticos são removidos e o pensamento excessivo é cortado [07:02].

Cortar o pensamento excessivo importa porque modelos às vezes testam vários caminhos errados antes do certo. O refinamento ensina que ir direto ao ponto vale tanto quanto acertar [07:23].

## O que ainda falta

- A IA às vezes chega à resposta certa com uma lógica sem sentido [07:45].
- Usar IAs como juízes de outras IAs traz o viés da máquina para a nota [08:06].
- A maior barreira é a memória persistente: hoje, acabou a tarefa, a memória volta a zero [08:06].

## Perguntas frequentes

### Qual é a diferença entre RAG e Agentic RAG?

O RAG busca e responde num roteiro fixo. O Agentic RAG decide quando buscar, que ferramenta usar e se a informação basta [02:29].

### Por que é difícil treinar um agente?

Porque faltam dados que mostrem raciocínio em várias etapas, com erros e correções [04:57].
