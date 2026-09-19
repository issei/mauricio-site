---
type: finding
title: "i18n: terminologia técnica no Argos Translate (estudo, nada adotado)"
description: "O Argos Translate 1.11.0 não tem glossário nem restrição lexical; termos técnicos do site saem errados no /en/ (ex.: guarda de direção → steering guard). Testado o n-best (o termo correto não aparece nas 4 melhores) e o glossário por marcador (funciona, mas foi avaliado como não eficaz). Nada adotado; scripts/i18n intacto. Candidatos para reavaliar: outro modelo NMT, LLM local, memória de tradução, anotação na fonte, MT com glossário nativo. Estudo: docs/I18N_TERMINOLOGIA_ARGOS.md."
generated: { by: agent/cli, at: "2026-09-19T14:55:02Z" }
---


