---
id: Fbuu769DNfk
slug: repowise-motor-de-inteligencia-de-codigo-local-e-contexto
status: ficha
temas:
  - engenharia-agentica
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
