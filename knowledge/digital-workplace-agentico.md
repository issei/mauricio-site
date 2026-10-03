---
type: decision
title: "Digital Workplace Agêntico: página sob restrição legal, .md derivado do HTML"
description: "A página src/digital-workplace-agentico.html (estudo genérico sobre portal corporativo → plataforma agêntica) é regida por uma restrição legal vinculante: nenhuma organização real pode ser citada ou sugerida (doc 06 da spec; guarda automática tests/digital-workplace.legal.test.mjs, termos em base64). O .md companheiro NÃO é digitado: pages.mjs usa mdFromMain e scripts/seo/html-to-md.mjs converte o <main> da página, para o Markdown nunca divergir do HTML. Visualizações V1–V8 existem como HTML semântico sem JS; JS entra por import dinâmico por visualização. T4.6 (nó em ecosystem.nav.yaml, pilar P2) aguarda aprovação humana D-1; a página não carrega eco-nav até lá. Spec: docs/specs/pages/digital-workplace-agentico/."
generated: { by: agent/cli, at: "2026-10-03T06:22:25Z" }
---

# Related Concepts
- [Agent readiness por página](agent-readiness-por-pagina.md): gera o gêmeo .md exigido pelo gate de toda URL do sitemap (aqui derivado do <main>)
- [i18n: terminologia técnica no Argos Translate (estudo, nada adotado)](i18n-terminologia-argos.md): o /en/ sai do Argos; siglas como AG-UI, MCP, EXP e HITL herdam a limitação de terminologia
