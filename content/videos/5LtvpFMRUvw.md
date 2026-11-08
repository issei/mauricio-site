---
id: 5LtvpFMRUvw
slug: engenharia-por-tras-da-boutique-empresarial-arquitetura
status: ficha
temas:
  - engenharia-agentica
  - especificacao-e-desenvolvimento
youtube:
  titulo: "Engenharia por Trás da Boutique Empresarial: Arquitetura Estática, SDD e Desenvolvimento Agêntico"
  publicado_em: 2026-09-21
  duracao: PT9M32S
  descricao: |-
    Neste vídeo, apresentamos a engenharia de software e a metodologia agêntica utilizadas no desenvolvimento do site da **Boutique Empresarial**. 

    Acompanhe como combinamos alta performance web (MPA estático com carregamento inferior a 1 segundo), desenvolvimento orientado por especificações (SDD), automação multi-agente e preparação para motores de resposta e agentes de IA (AEO/WebMCP).

    ---

    🔗 **LINKS IMPORTANTES:**
    * 🌐 **Site Oficial:** https://boutiqueempresarial.com.br/
    * 💻 **Repositório no GitHub:** https://github.com/issei/boutiqueempresarial-site

    ---

    📌 **O QUE VOCÊ VAI VER NESTE VÍDEO:**

    1. **Arquitetura Estática & Funil Único:** 
       Construção de uma Multi-Page Application (MPA) estática utilizando Vite 6, Tailwind CSS v4 e HTML/CSS puro, sem hidratação ou frameworks JS pesados no cliente. Foco total em um funil de conversão único (Landing Page do Diagnóstico Gratuito → Formulário conversacional de 7 etapas → Página de confirmação).

    2. **Specification Driven Development (SDD) & VibeCoding:** 
       Entenda como as especificações em `docs/specs/` funcionam como a fonte única da verdade antes de qualquer alteração de código, permitindo um fluxo rápido de implementação orientado por contratos claros.

    3. **Pipeline Multi-Agente (Claude Code):** 
       A estrutura agêntica do projeto com subagentes especializados (`page-auditor`, `head-fixer`, `copy-writer`, `test-author`, `gate-runner`), seguindo o princípio: *"modelo caro decide, modelo barato executa, o gate arbitra"*.

    4. **Quality Gate Determinístico (Fail-Closed):** 
       O funcionamento do comando `npm run gate`, que executa o build do Vite, testes E2E cross-browser com Playwright e auditoria de acessibilidade WCAG 2.1 AA via `axe-core`.

    5. **CI/CD Automatizado na AWS via OIDC:** 
       O fluxo DevOps no GitHub Actions com autenticação por tokens temporários JWT (sem chaves fixas) integrado ao AWS S3, CloudFront Functions e Route 53.

    6. **AEO & Descoberta por Agentes de IA (Agent Readiness):** 
       Como o site é estruturado para machine-readable content com `llms.txt`, `llms-full.txt`, manifestos em `/.well-known/`, cabeçalhos HTTP Link (RFC 8288), registros DNS-AID e runtime WebMCP (`navigator.modelContext`).

    ---

    🛠️ **TECNOLOGIAS E FERRAMENTAS UTILIZADAS:**
    * **Frontend:** Vite 6, Tailwind CSS v4, HTML5/CSS3 Vanilla
    * **Testes & Qualidade:** Playwright, @axe-core/playwright
    * **Infraestrutura & Cloud:** AWS S3, CloudFront, Route 53 (DNSSEC/DNS-AID), CloudFront Functions
    * **CI/CD:** GitHub Actions com OIDC
    * **Backend do Formulário:** Google Apps Script
    * **Harness Agêntico:** Claude Code, APM, MCP (Context7, CodeGraph, Playwright-MCP)

    ---

    ⚠️ **LICENÇA E DIREITOS AUTORAIS:**
    O código-fonte deste projeto está disponibilizado publicamente no GitHub exclusivamente para fins de consulta e visualização, sendo um ativo proprietário com todos os direitos reservados.

    #EngenhariaDeSoftware #ViteJS #TailwindCSS #Playwright #DevOps #AWS #ClaudeCode #AI #SoftwareArchitecture #BoutiqueEmpresarial
  miniatura: https://i.ytimg.com/vi/5LtvpFMRUvw/maxresdefault.jpg
  visualizacoes: 227
  playlists: []
  legenda: automatica
  links_descricao:
    - https://boutiqueempresarial.com.br/
    - https://github.com/issei/boutiqueempresarial-site
  coletado_em: 2026-11-07T22:16:07Z
---
