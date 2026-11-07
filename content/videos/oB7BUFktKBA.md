---
id: oB7BUFktKBA
slug: agentic-resource-discovery-ard-como-agentes-de-ia-descobrem
status: ficha
temas: []
youtube:
  titulo: "Agentic Resource Discovery (ARD): Como Agentes de IA Descobrem Ferramentas na Web"
  publicado_em: 2026-09-23
  duracao: PT8M37S
  descricao: |-
    Como os modelos de linguagem e agentes autonomos encontram as ferramentas certas para realizar uma tarefa sem sobrecarregar a janela de contexto? Neste vídeo, apresentamos a fundo a **Agentic Resource Discovery Specification (ARD)**, o padrão aberto de descoberta federada para agentes de IA, servidores MCP, Skills, APIs e workflows.

    Entenda a arquitetura por trás do protocolo desenvolvido por um grupo de trabalho com participação de empresas como Google, Microsoft e Hugging Face. Descubra como o ARD resolve o desafio de escala movendo a seleção de ferramentas do contexto do LLM para serviços de busca dedicados.

    ---

    🎯 **O que você vai aprender neste vídeo:**
    * **O Conceito do ARD:** O protocolo que permite a um cliente de IA perguntar *"O que está disponível para esta tarefa?"* e receber recursos compatíveis.
    * **Camada Pré-Invocação:** O ARD atua exclusivamente na descoberta; a execução ocorre pelo protocolo nativo da ferramenta (como MCP ou A2A).
    * **Identificadores URN Ancorados a Domínio:** Padrão de nomes que separa a identidade lógica do recurso de sua localização física de rede.
    * **API REST e Busca Semântica:** Como funcionam os endpoints `POST /search` (busca por linguagem natural) e `POST /explore` (introspecção e estatísticas).
    * **Segurança e Identidade Zero-Trust:** O envelope `trustManifest` para verificação de identidade criptográfica e atestações de conformidade (como SOC2 e GDPR).

    ---

    ⏱️ **Minutagem / Capítulos Sugeridos:**
    * `00:00` - Introdução: O problema de escala na seleção de ferramentas por IA
    * `01:30` - O que é o Agentic Resource Discovery (ARD)?
    * `03:45` - Estrutura e Identificadores URN (`urn:air:...`)
    * `06:10` - Arquitetura da API: Endpoint /search e /explore
    * `08:30` - Segurança, Identidade e Trust Manifest
    * `10:15` - Conclusão e Próximos Passos

    ---

    🔗 **Links e Recursos:**
    * 📄 **Especificação Oficial:** https://agenticresourcediscovery.org/spec
    * 🛠️ **Repositório GitHub:** https://github.com/ards-project/ard-spec
    * 🌐 **Website Oficial:** https://agenticresourcediscovery.org/

    #AgentesDeIA #ArtificialIntelligence #MCP #AgenticResourceDiscovery #AIInfrastructure #OpenSource #TechSpecification
  miniatura: https://i.ytimg.com/vi/oB7BUFktKBA/maxresdefault.jpg
  visualizacoes: 10
  playlists: []
  legenda: pendente
  links_descricao:
    - https://agenticresourcediscovery.org/spec
    - https://github.com/ards-project/ard-spec
    - https://agenticresourcediscovery.org/
  coletado_em: 2026-11-07T22:16:07Z
---
