# PROGRESS — Construção autônoma `engenharia-agentes-ia`

> Âncora de estado (doc 10 / BUILD_PLAN §6). Lido no início e atualizado no fim de cada iteração.
> **Regra de Ouro:** este arquivo é versionado no Git junto com o código — rollback recupera código
> **e** estado cognitivo.

## Onda atual
**MVP** — perfil de orçamento: **Moderado** (fecha algumas WUs e para para revisão humana).

## Política operacional
- Push **direto na `main`** a cada WU verde (= deploy em produção). Gate local verde antes de todo push.
- WU incompleta fica atrás de `noindex`/seção `hidden`/fora do menu (feature flag).
- Tema **somente dark**. Fail-closed: faltou algo → `BLOCKED:`, parada limpa.
- Limite de tentativas ao gate por WU: **3**. Estourou → BLOCKED.

## Ledger de tokens (onda MVP)
| Onda | Alvo | Gasto acum. | Restante |
| :-- | :-- | :-- | :-- |
| MVP | (moderado) | — | — |

## Fila de Work Units (canônica)
| WU | Estado | Escopo | SDD-fonte | Modelo |
| :-- | :-- | :-- | :-- | :-- |
| WU-0 | ✅ done | Fundação (state, gate, CI de teste, ADR, DoR/DoD, suíte, stub dark) | doc 10, BUILD_PLAN | Opus |
| WU-1 | ✅ done | Shell: head/SEO, tokens, nav de trilha, footer, Lenis, progress, reveal | 07, 03, 01 | Opus |
| WU-2 | ✅ done | Hero "pouca IA no caminho crítico" (caótico × disciplinado, SVG animado) | 03, 04 V10 | Opus |
| WU-3 | ✅ done | Área Princípios (10 cards) + âncoras principio-1..10 | 01, 02, 03 | Sonnet |
| WU-4 | ✅ done | Jornada (accordion de 10 capítulos, cap-1..10) | 02 | Sonnet |
| WU-5 | ✅ done | Governança Agent-Driven (viradas, dicionário, árvore, callouts, comparativo) | 10, 03 | Sonnet |
| WU-6 | ✅ done | Referência (glossário) + Caso Real SocialSelling (pipeline M1–M5) | 01, 09 | Haiku/Sonnet |
| WU-7 | ✅ done | Cortinas abertas (index,follow), footer-nav, card no catálogo | 04, 07 | Opus |

**🎉 Onda MVP COMPLETA** (WU-0…WU-7). Página viva, indexável e listada em `catalogo.html`.

(V1: WU-8…11 · V2: WU-12…14 — detalhar ao entrar na janela.)

| WU | Estado | Escopo | SDD | Modelo |
| :-- | :-- | :-- | :-- | :-- |
| WU-8 | ✅ done | Simulador de arquitetura (8 controles → 6 medidores determinísticos) | 06 §1 | Sonnet+Opus |
| WU-9 | ✅ done | Evals: Erro de Sistema × Erro de Modelo + nota LLM-as-a-judge | 06 §1.7 | Sonnet |
| WU-10 | ✅ done | Pipeline interativo SVG (feliz/Saga/DLQ/confiança) — ADR-eai-002 | 05 | Opus |
| WU-11 | ✅ done | Quiz de verificação (4 perguntas, feedback, score) | 02 | Sonnet |

**🎉 Onda V1 COMPLETA** (WU-8…WU-11): simulador, evals, pipeline interativo, quiz.

| WU | Estado | Escopo | SDD | Modelo |
| :-- | :-- | :-- | :-- | :-- |
| WU-12 | ✅ done | Playground: montar arquitetura (clique) + avaliação por regras determinísticas | 06 §2 | Opus |
| WU-13 | ⏸ diferido | BPMN editável (bpmn-js) — diferido por ADR-eai-002; pipeline-switcher já cobre o ensino | 05 | — |
| WU-14 | ✅ done | Painel de progresso client-side (capítulos, score, componentes; localStorage) | 08 | Sonnet |

**🎉 Onda V2 COMPLETA** (WU-12, WU-14). WU-13 (bpmn-js editável) **diferido** por ADR-eai-002.

## Próxima ação
**Build concluído** (MVP + V1 + V2). Página viva, indexável e testada (build + 102 testes verdes em
chromium/firefox/webkit). Único item em aberto, conscientemente diferido: **WU-13** (BPMN editável),
a reativar só se a edição real de diagramas justificar o peso do bpmn-js (novo ADR).

## Histórico
- **WU-0 (fundação):** criados `.ai/state/PROGRESS.md`, `.ai/learnings.md`, skills
  (`build-eai-section`, `run-quality-gate`), `docs/governance/dor-dod-eai.md`,
  `docs/decisions/ADR-eai-001-build-autonomo-e-finops.md`, `scripts/quality-gate.mjs`,
  `.github/workflows/test.yml`, `tests/_helpers/axe.js`, `tests/engenharia-agentes-ia.spec.js`,
  `src/engenharia-agentes-ia.{html,css}` (stub dark, `noindex`). Gate verde. `@axe-core/playwright`
  adicionado.

## BLOCKED
(nenhum)
