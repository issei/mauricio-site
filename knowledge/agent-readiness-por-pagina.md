---
type: decision
title: Agent readiness por página
description: "O scanner de agent readiness avalia a URL informada: markdownNegotiation, oauthProtectedResource e webMcp são por página. Decisão: Markdown por regra na CloudFront Function (não por mapa), PRM por caminho (RFC 9728 §3.1) sintetizado na edge, WebMCP em public/webmcp.js injetado pelo Vite em toda página, gate exige gêmeo .md de toda URL do sitemap, e o deploy publica a function com test-function antes do LIVE. Spec: docs/specs/AGENT_READINESS_POR_PAGINA.md; KB: docs/AGENT_READINESS.md."
generated: { by: agent/cli, at: "2026-09-12T17:07:47Z" }
---


