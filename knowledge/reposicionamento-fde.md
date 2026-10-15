---
type: decision
title: "Reposicionamento FDE: spec, cases em cases.json e evidência antes do texto"
description: "Reposicionamento do site para Forward-Deployed Engineer conduzido por docs/specs/fde/ (SDD-FDE v1.1 + PLANO com 12 WUs, um PR cada, quase todas em série porque regravam os mesmos arquivos gerados). Decisões: cases STAR-FDE em public/cases.json separado do cv.json, ligados por projeto_ref (ADR-fde-001); regras editoriais da spec viram teste (tests/fde.claims.test.mjs, WU-2) antes de qualquer texto; rótulos de evidência via campo da camada editorial; respostas confidenciais da Fase 0 fora do repositório público; headline no /en/ testada, nunca protegida dentro do Argos (sem glossário). Correções à spec v1.0: 19 projetos STAR, não 18; prova '3MM' sem moeda. Orquestração: Opus decide/audita, Sonnet escreve, Haiku mecânico (subagentes fde-evidence-auditor, fde-case-writer, fde-mechanic); RTK para read/grep/ls/git; relatório learn do Caveman (03/09) motivou uma WU por sessão e leituras estreitas. Consumo por WU em docs/specs/fde/LEDGER.md."
generated: { by: agent/cloud, at: "2026-10-14T23:59:00Z" }
---

# Related Concepts
- [Home Mapa de Linhas](home-mapa-de-linhas.md): a headline e as provas da home saem do cv.json por gen-portfolio.mjs
- [Camada editorial](camada-editorial.md): os rótulos de evidência (R-FDE-009) entram como campo dessa camada
- [i18n: terminologia técnica no Argos Translate](i18n-terminologia-argos.md): motivo de testar a headline no /en/ em vez de proteger o termo no tradutor
