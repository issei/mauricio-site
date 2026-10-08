---
type: decision
title: "Camada editorial: orientação gerada de um SSOT, só onde a página não orienta"
description: "Camada editorial (orientação de entrada + continuação) gerada por scripts/gen-editorial.mjs a partir do SSOT scripts/editorial/editorial.data.mjs, entre marcadores EDITORIAL:START/END e EDITORIAL-NEXT:START/END que nunca são consumidos. Formaliza mecanismos que já existiam (síntese AEO, portas 'Por onde você entra?', tempo calculado do Hub): estilo .ed-* em public/aeo.css, sem JS, sem heading novo, sem role. Tempo sempre calculado (200 ppm, prosa de <main>, sem <pre>). Texto só cita ou condensa a própria página (campo source). Página ausente do SSOT = nenhuma alteração. Piloto (artifice, case-agents, socialselling) validado; Fase 5 em 2026-10-08: 9 páginas, cada uma só com o que faltava (páginas com portas ou sumário não ganham rotas), entrada sem kind = só continuação (know), catálogo com etiqueta nos 17 cards sem etiqueta + 'Comece por aqui' (etiqueta gerada do SSOT recusada: exigiria tocar as 19 páginas D). Armadilhas: build-aeo.mjs sem argumento reescreve 31 páginas; --ed-muted precisa de 4,5:1 também no #002d62 do devin; o CLI do gerador só roda no Windows com pathToFileURL. Contrato: tests/editorial-layer.test.mjs; gate roda --check. Spec: docs/specs/editorial/."
generated: { by: agent/cli, at: "2026-10-08T22:54:35Z" }
---

# Related Concepts
- [Home Mapa de Linhas](home-mapa-de-linhas.md): mesmo padrão de conteúdo gerado em build com --check no gate
- [i18n: terminologia técnica no Argos Translate](i18n-terminologia-argos.md): o /en/ da camada sai do Argos como o resto da página
