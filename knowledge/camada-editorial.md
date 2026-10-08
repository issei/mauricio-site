---
type: decision
title: "Camada editorial: orientação gerada de um SSOT, só onde a página não orienta"
description: "Camada editorial (orientação de entrada + continuação) gerada por scripts/gen-editorial.mjs a partir do SSOT scripts/editorial/editorial.data.mjs, entre marcadores EDITORIAL:START/END e EDITORIAL-NEXT:START/END que nunca são consumidos. Formaliza mecanismos que já existiam (síntese AEO, portas 'Por onde você entra?', tempo calculado do Hub) em vez de criar um quinto: estilo .ed-* em public/aeo.css, sem JS, sem heading novo, sem role. Tempo de leitura sempre calculado (200 ppm, prosa de <main>, sem <pre>); gen-hub-data desconta a camada. Texto da camada só cita ou condensa a própria página (campo source). Página ausente do SSOT = nenhuma alteração (19 de 32 classificadas D). Piloto: artifice, case-agents, socialselling; Fase 5 aguarda validação do autor. Contrato: tests/editorial-layer.test.mjs; gate roda --check. Spec: docs/specs/editorial/."
generated: { by: agent/cli, at: "2026-10-08T17:00:00Z" }
---

# Related Concepts
- [Home Mapa de Linhas](home-mapa-de-linhas.md): mesmo padrão de conteúdo gerado em build com --check no gate
- [i18n: terminologia técnica no Argos Translate](i18n-terminologia-argos.md): o /en/ da camada sai do Argos como o resto da página
