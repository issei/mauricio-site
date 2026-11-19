---
id: Fbuu769DNfk
slug: repowise-motor-de-inteligencia-de-codigo-local-e-contexto
status: publicado
temas:
  - engenharia-agentica
  - ferramentas-de-ia
resumo: O vídeo apresenta o Repowise, uma ferramenta de código aberto que indexa o repositório na máquina local e entrega esse contexto a agentes de IA por MCP. Mostra as cinco camadas do índice, o robô de revisão de pull requests, a análise de saúde do código e o espaço de trabalho com vários repositórios.
fontes:
  - url: https://github.com/repowise-dev/repowise
    titulo: "repowise-dev/repowise: Codebase intelligence for AI and humans"
    sustenta: O Repowise indexa código, grafo de chamadas, histórico do Git, documentação e decisões uma vez, na máquina local, em cinco camadas, oferece dez ferramentas MCP e um robô de PR com nota de risco de 0 a 10. A ordenação do Repowise encontra 2,3 vezes mais defeitos com o mesmo orçamento de revisão.
    verificada: true
revisado_por: "Maurício Yokoyama Issei"
revisado_em: 2026-11-19
youtube:
  titulo: "Repowise: Motor de Inteligência de Código Local e Contexto para Agentes de IA"
  publicado_em: 2026-09-20
  duracao: PT7M36S
  descricao: |-
    Neste vídeo explicativo, apresentamos o **Repowise**, uma ferramenta open-source que constrói um índice local do seu código-fonte para fornecer contexto preciso e citável para desenvolvedores e agentes de IA.

    Em vez de fazer assistentes de IA reelerem arquivos repetidamente, o Repowise indexa o repositório e disponibiliza respostas diretas, gráficos de dependências e análise de risco de mudanças via **MCP (Model Context Protocol)**.

    ---

    ### 💡 **O que você vai aprender neste vídeo:**
    * **5 Camadas de Inteligência Local:** Grafo de dependências (AST em 26 linguagens), histórico do Git, documentação wiki gerada automaticamente, decisões arquiteturais e pontuação determinística de saúde do código (Code Health).
    * **Integração com Agentes de IA:** Como conectar o Repowise ao Claude Code, Codex, Cursor e VS Code usando ferramentas MCP integradas.
    * **Economia de Tokens:** Redução de payloads e compressão de saídas de comandos no terminal com o `repowise distill`.
    * **Análise de Risco em Pull Requests:** Como avaliar a área de impacto e os testes afetados antes de realizar o merge.

    ---

    ### ⚡ **Comandos Rápidos de Inicialização:**
    ```bash
    # 1. Instalação
    pip install repowise

    # 2. Inicialização e indexação local
    cd /seu-projeto
    repowise init --no-prose -y

    # 3. Execução do servidor MCP e dashboard local
    repowise serve
    ```

    ---

    ### 🔗 **URLs de Referência e Documentação:**
    * **Repositório do Código-Fonte no GitHub:**  
      https://github.com/repowise-dev/repowise
    * **Organização no GitHub:**  
      https://github.com/repowise-dev
    * **Documentação Oficial:**  
      https://docs.repowise.dev/
    * **Guia Completo do Usuário (User Guide):**  
      https://github.com/repowise-dev/repowise/blob/main/docs/start/USER_GUIDE.md
    * **Site Oficial:**  
      https://repowise.dev/

    ---

    #Repowise #AI #CodebaseIntelligence #MCP #GitHub #OpenSource #DevTools #SoftwareEngineering #ClaudeCode #Python #VSCode
  miniatura: https://i.ytimg.com/vi/Fbuu769DNfk/maxresdefault.jpg
  visualizacoes: 104
  playlists: []
  legenda: automatica
  links_descricao:
    - https://github.com/repowise-dev/repowise
    - https://github.com/repowise-dev
    - https://docs.repowise.dev/
    - https://github.com/repowise-dev/repowise/blob/main/docs/start/USER_GUIDE.md
    - https://repowise.dev/
  coletado_em: 2026-11-07T22:16:07Z
---

## O problema do contexto

Assistentes de IA escrevem código rápido, mas muitas vezes não sabem o impacto da mudança no sistema inteiro [00:00]. O Repowise é um motor de inteligência de código feito para dar esse contexto a pessoas e a agentes [00:20].

Sem um mapa, o agente redescobre a base de código a cada tarefa. Gasta tempo e tokens com buscas simples num mar de arquivos e lê as mesmas coisas várias vezes [00:20]. Segundo o vídeo, o Repowise reduz o tamanho do contexto enviado à IA em 97,2% [00:42].

O vídeo compara os dois jeitos de trabalhar [01:47]:

- No jeito antigo, o agente usa buscas como o grep, lê centenas de linhas de ruído e faz quase oito chamadas de ferramenta, em média, para se localizar [01:47].
- Com o Repowise, o agente usa 10 ferramentas MCP, faz cerca de 3,8 chamadas e recebe o contexto já direcionado [02:07].

## As cinco camadas do índice

O Repowise indexa a base de código uma vez, na máquina local, sem enviar dados a serviços externos [02:07]. O índice tem cinco camadas [02:29]:

- o grafo, que entende as dependências [02:29];
- o Git, que mapeia o histórico de bugs [02:29];
- a documentação, gerada como uma wiki automática [02:29];
- as decisões, que guardam a lógica da arquitetura [02:50];
- a saúde do código, medida por detectores determinísticos [02:50].

Segundo o vídeo, a indexação completa de um repositório normal leva menos de 30 segundos [02:50].

## Contexto para os agentes

A ponte entre o índice e os agentes é o MCP, o Model Context Protocol: um padrão aberto que liga os modelos aos dados locais com segurança [03:11]. Por MCP, o Repowise entrega o índice a agentes como o Claude Code, o Cursor e as integrações do VS Code [03:11].

Nos números citados, o contexto cai de cerca de 14 mil tokens para 393 tokens num teste de commit [03:32]. O volume total de saída do agente cai quase 32% [03:55]. As 10 ferramentas MCP são feitas para tarefas específicas e entregam o contexto completo de uma vez, com as citações do código [03:55].

## Pull requests mais inteligentes

Os revisores humanos usam o mesmo índice, por um robô gratuito de pull requests [04:16]. O robô mostra o raio de impacto da mudança de um símbolo, avisa quando falta alterar um arquivo que costuma mudar junto e traz informação de testes ligada ao grafo [04:36]. Ele dá uma nota de risco de 0 a 10, sem chamar nenhum LLM, e fica em silêncio quando o PR não tem problema [04:36].

## Saúde do código

A ferramenta também mede e melhora a manutenção da base de código, em três passos [04:57]:

1. Faz uma varredura com detectores determinísticos (o vídeo fala em 49) [05:18].
2. Identifica os arquivos mais propensos a problemas e dá a eles uma nota de 1 a 10 [05:18].
3. Gera planos concretos de refatoração, como extrair uma classe [05:18].

Comparado a ferramentas tradicionais, como o CodeScene, com o mesmo orçamento de revisão de 20% do código, o Repowise encontrou 2,3 vezes mais defeitos reais [05:39].

## Vários repositórios

Sistemas grandes não ficam num só repositório [06:01]. O Repowise liga os contratos entre serviços de backend e de frontend: se uma mudança num repositório quebra o contrato de outro, ele mostra o impacto antes do envio do código [06:23]. Tudo fica num único endpoint MCP federado [06:23].

## A frase central

O vídeo cita os criadores da ferramenta: a IA torna mais barato produzir uma mudança, mas não torna mais barato entender as consequências dela [06:23]. A pergunta final é se, na próxima tarefa, o agente vai continuar sem mapa ou vai ter um [07:06].

## Perguntas frequentes

### O Repowise envia o código para fora da máquina?

Não. Segundo o vídeo, a indexação é feita localmente, sem enviar dados a serviços externos [02:07].

### Com quais agentes o Repowise funciona?

Com agentes que usam MCP, como o Claude Code, o Cursor e as integrações do VS Code [03:11].

### O robô de pull requests usa LLM?

Não. O vídeo diz que ele dá a nota de risco sem chamar nenhum LLM [04:36].
