---
type: decision
title: "Home Mapa de Linhas: currículo compilado de cv.json em build-time"
description: "A home (/) é o portfólio 'Mapa de Linhas' (carreira como mapa de metrô: 7 linhas = grupos de Habilidades, empregadores = baldeações, projetos STAR = estações). Todo o conteúdo de src/index.html e src/curriculo.html (a home antiga, preservada com a mesma aparência) é gravado no HTML por scripts/gen-portfolio.mjs a partir de public/cv.json — zero fetch em runtime; o gate roda --check. JSON-LD (knowsAbout, ItemList de certificações) vem de scripts/seo/identity.mjs lendo o mesmo cv.json. Paleta de 7 cores de linha é exceção Dark Tech registrada em ADR-pf-001. Única camada editorial: LINE_OF no gerador (termo → linha), termo sem linha quebra o build. Spec: docs/specs/pages/portfolio/."
generated: { by: agent/cli, at: "2026-09-23T03:16:19Z" }
---

# Related Concepts
- [Agent readiness por página](agent-readiness-por-pagina.md): gera public/curriculo.md, o gêmeo .md que o gate exige para /curriculo
- [i18n: terminologia técnica no Argos Translate (estudo, nada adotado)](i18n-terminologia-argos.md): o /en/ da home sai do Argos; rótulos do mapa herdam a limitação de terminologia (ex.: 'Mapa de linhas' → 'Linemap')
