---
id: o0mWY83c37Y
slug: nvidia-skillspector-como-proteger-seus-agentes-de-ia-contra
status: ficha
temas:
  - engenharia-agentica
youtube:
  titulo: "NVIDIA SkillSpector: Como Proteger seus Agentes de IA Contra Ameaças Ocultas!"
  publicado_em: 2026-10-07
  duracao: PT7M35S
  descricao: |-
    **O seu agente de IA está realmente seguro antes de instalar novas *skills* e extensões?**

    Neste vídeo explicativo, apresentamos o **NVIDIA SkillSpector**, um scanner de segurança desenvolvido pela NVIDIA para auditar e avaliar *skills* de agentes de IA (como Claude Code, Codex CLI, Gemini CLI, OpenCode e ferramentas MCP) antes que sejam instaladas.

    Estudos da NVIDIA em uma amostra de 31.132 *skills* revelaram que **26,1% continham vulnerabilidades** e **5,2% apresentavam intenção abertamente maliciosa**. O SkillSpector surge como um ponto de controle crítico para responder: *"Esta skill é segura para ser instalada?"*.

    ---

    📌 **O que você vai conferir neste vídeo:**
    * **Pipeline em Dois Estágios:** Entenda como funciona a combinação entre análise estática rápida (regex, AST e YARA) e avaliação semântica opcional via LLM.
    * **Detecção de Ameaças:** Mapeamento de 71 padrões de risco em 17 categorias — cobrindo *prompt injection*, exfiltração de dados, escalada de privilégios e *MCP tool poisoning*.
    * **Verificação de Dependências (SC4):** Consultas em tempo real ao banco de dados OSV.dev para identificar CVEs conhecidas.
    * **Pontuação e Recomendação de Risco:** Como interpretar a pontuação de 0 a 100 e os vereditos (**SAFE**, **CAUTION**, **DO NOT INSTALL**).
    * **Servidor MCP Integrado:** Como executar o SkillSpector como servidor MCP para atuar como barreira de proteção em tempo de execução (*runtime guardrail*).
    * **Relatórios e CI/CD:** Suporte a múltiplos formatos de saída, como Terminal, JSON, Markdown e SARIF.

    ---

    ⏱️ **Capítulos do Vídeo (Timestamps):**
    0:00 - Introdução: O Risco Oculto das Skills de IA
    1:15 - O que é o NVIDIA SkillSpector?
    2:45 - Como Funciona o Pipeline (Análise Estática vs. Semântica)
    4:30 - Categorias de Vulnerabilidades & Prompt Injection
    6:10 - Interpretando a Pontuação de Risco e Vereditos
    7:50 - Uso no Terminal e Integração como Servidor MCP
    9:20 - Conclusão e Boas Práticas de Segurança

    ---

    🔗 **Fontes Originais e Links Oficiais:**
    * 🐙 **Repositório Oficial no GitHub:** https://github.com/NVIDIA/SkillSpector
    * 📖 **Documentação Oficial (NVIDIA Skill Documentation):** https://docs.nvidia.com/skills/scanning-agent-skills
    * 🛡️ **Portal NVIDIA Verified Skills Pipeline:** https://docs.nvidia.com/skills

    ---

    #NVIDIA #SkillSpector #AISecurity #Cybersecurity #PromptInjection #ClaudeCode #Gemini #DevSecOps #AI #MCP
  miniatura: https://i.ytimg.com/vi/o0mWY83c37Y/maxresdefault.jpg
  visualizacoes: 24
  playlists: []
  legenda: pendente
  links_descricao:
    - https://github.com/NVIDIA/SkillSpector
    - https://docs.nvidia.com/skills/scanning-agent-skills
    - https://docs.nvidia.com/skills
  coletado_em: 2026-11-07T22:16:07Z
---
