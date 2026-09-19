---
okf_version: "0.2"
---

# Mauricio Site Knowledge Base

Persistent memory bundle for this repository.
* [Agent readiness por página](agent-readiness-por-pagina.md) - O scanner de agent readiness avalia a URL informada: markdownNegotiation, oauthProtectedResource e webMcp são por página. Decisão: Markdown por regra na CloudFront Function (não por mapa), PRM por caminho (RFC 9728 §3.1) sintetizado na edge, WebMCP em public/webmcp.js injetado pelo Vite em toda página, gate exige gêmeo .md de toda URL do sitemap, e o deploy publica a function com test-function antes do LIVE. Spec: docs/specs/AGENT_READINESS_POR_PAGINA.md; KB: docs/AGENT_READINESS.md.
* [i18n: terminologia técnica no Argos Translate (estudo, nada adotado)](i18n-terminologia-argos.md) - O Argos Translate 1.11.0 não tem glossário nem restrição lexical; termos técnicos do site saem errados no /en/ (ex.: guarda de direção → steering guard). Testado o n-best (o termo correto não aparece nas 4 melhores) e o glossário por marcador (funciona, mas foi avaliado como não eficaz). Nada adotado; scripts/i18n intacto. Candidatos para reavaliar: outro modelo NMT, LLM local, memória de tradução, anotação na fonte, MT com glossário nativo. Estudo: docs/I18N_TERMINOLOGIA_ARGOS.md.
