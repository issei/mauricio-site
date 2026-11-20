# Procedência — cópia versionada do A11Y.md

| Campo | Valor |
| :-- | :-- |
| Upstream | https://github.com/fecarrico/A11Y.md (licença MIT — `LICENSE-upstream`) |
| Commit fixado | `9fb9a023c7625a70a0ecbc8420181c100bcdb529` (tag `v2.5.0`, 2026-10-21) |
| Versão do padrão | 2.5.0 (WCAG 2.2 AA) |
| Idioma | `docs/pt-BR/` |
| Copiado em | 2026-10-03; atualizado para 2.5.0 em 2026-11-20 (issue #124) |
| Decisão | opção B — `docs/specs/a11y-first/architecture.md` §2 (aprovada) |

**Arquivos são cópias byte a byte do upstream. Não edite.** Mudança local vai em `A11Y-DECISIONS.md` ou `EXCEPTIONS.md`
na raiz; atualizar o padrão é um PR que troca o SHA acima e cita o `CHANGELOG.md` do upstream.

## Copiados (carga preguiçosa — só os de componentes que existem no site)

`A11Y.md` · `references/guide-{consent-banners,modals,navigation,forms,form-controls,tabs-accordion,media,visual-perception,responsive-mobile,loading-skeleton,cognitive,compliance-profiles,governance,images,buttons,tables,toasts-notifications,tooltips-popovers,treeview}.md` · `templates/{A11Y-DECISIONS,EXCEPTIONS,REPORT}.md` · `tools/a11y/{verify-a11y,contrast-check}.py`

Ainda **não** copiados (entram quando o componente aparecer): charts, datepicker, drag-drop, maps, carousels, infinite-scroll, autocomplete, generative-ui, agentic-web, framework-mapping, platform-native, sign-language-br.

Na 2.5.0 entraram `tables`, `toasts-notifications`, `tooltips-popovers` e `treeview`: a checagem `guide-coverage` do gate encontrou esses componentes no site (`<table>`, `aria-live`, `role="tooltip"`, `role="tree"`). O `templates/ACCESSIBILITY.md` (novo na 2.3.0) não foi copiado: o site ainda não publica declaração de acessibilidade.

## Verificador estático (`tools/a11y/verify-a11y.py`)

Código lido antes de executar (Q3; relido na 2.5.0): biblioteca padrão apenas; único subprocesso é `git log` somente-leitura; escreve só em diretório temporário no `--self-test`.
Não há `python` no PATH do Bash do Windows; use o interpretador do projeto:

```powershell
.venv-i18n\Scripts\python.exe tools/a11y/verify-a11y.py --self-test
.venv-i18n\Scripts\python.exe tools/a11y/verify-a11y.py . --src src --warn-only
```
