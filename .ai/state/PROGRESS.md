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
| WU-7 | ⬜ next | Visualizações SVG/CSS + abrir cortinas (remover noindex) | 04, 07 | Opus |

(V1: WU-8…11 · V2: WU-12…14 — detalhar ao entrar na janela.)

## Próxima ação
Iniciar **WU-7** (fecho da onda MVP): polimento de visualizações SVG/CSS e **abrir as cortinas** —
remover o noindex e ligar a página ao restante do site (menu/sitemap).

## Histórico
- **WU-0 (fundação):** criados `.ai/state/PROGRESS.md`, `.ai/learnings.md`, skills
  (`build-eai-section`, `run-quality-gate`), `docs/governance/dor-dod-eai.md`,
  `docs/decisions/ADR-eai-001-build-autonomo-e-finops.md`, `scripts/quality-gate.mjs`,
  `.github/workflows/test.yml`, `tests/_helpers/axe.js`, `tests/engenharia-agentes-ia.spec.js`,
  `src/engenharia-agentes-ia.{html,css}` (stub dark, `noindex`). Gate verde. `@axe-core/playwright`
  adicionado.

## BLOCKED
(nenhum)
