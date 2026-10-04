# Procedência — cópia versionada do A11Y.md

| Campo | Valor |
| :-- | :-- |
| Upstream | https://github.com/fecarrico/A11Y.md (licença MIT — `LICENSE-upstream`) |
| Commit fixado | `069e213e9f189c8f81b32d26870d65cce7b59be9` (2026-10-01) |
| Versão do padrão | 2.2.0 (WCAG 2.2 AA) |
| Idioma | `docs/pt-BR/` |
| Copiado em | 2026-10-03 |
| Decisão | opção B — `docs/specs/a11y-first/architecture.md` §2 (aprovada) |

**Arquivos são cópias byte a byte do upstream. Não edite.** Mudança local vai em `A11Y-DECISIONS.md` ou `EXCEPTIONS.md`
na raiz; atualizar o padrão é um PR que troca o SHA acima e cita o `CHANGELOG.md` do upstream.

## Copiados (carga preguiçosa — só os de componentes que existem no site)

`A11Y.md` · `references/guide-{consent-banners,modals,navigation,forms,form-controls,tabs-accordion,media,visual-perception,responsive-mobile,loading-skeleton,cognitive,compliance-profiles,governance,images,buttons}.md` · `templates/{A11Y-DECISIONS,EXCEPTIONS,REPORT}.md` · `tools/a11y/{verify-a11y,contrast-check}.py`

Ainda **não** copiados (entram quando o componente aparecer): charts, datepicker, drag-drop, maps, tables, treeview, carousels, toasts, tooltips, infinite-scroll, autocomplete, generative-ui, agentic-web, framework-mapping, platform-native, sign-language-br.

## Verificador estático (`tools/a11y/verify-a11y.py`)

Código lido antes de executar (Q3): biblioteca padrão apenas; único subprocesso é `git log` somente-leitura; escreve só em diretório temporário no `--self-test`.
Não há `python` no PATH do Bash do Windows; use o interpretador do projeto:

```powershell
.venv-i18n\Scripts\python.exe tools/a11y/verify-a11y.py --self-test
.venv-i18n\Scripts\python.exe tools/a11y/verify-a11y.py . --src src --warn-only
```
