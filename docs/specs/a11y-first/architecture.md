---
id: A11Y-ARCH-001
titulo: Arquitetura — stack existente e como o A11Y.md entra
versao: 0.1.0
status: rascunho — aguarda aprovação humana
data: 2026-10-03
relacionado: [accessibility-audit.md, testing-strategy.md, implementation-plan.md, A11Y-DECISIONS.md]
---

# Arquitetura

## 1. Stack existente (Discovery — fatos do repositório)

| Item | Valor |
| :-- | :-- |
| Tipo | MPA estático; cada feature é um `src/<pagina>.html` (descoberta por glob em `vite.config.js`) |
| Build | Vite 6 + Tailwind CSS v4 (`@import`), JS ES modules, **sem framework** de UI |
| Animação | GSAP 3, Lenis, split-type; WebGL só em `life3d` (Three.js foi removido de `terminal-evolutivo`) |
| Conteúdo | CV via `cv.json` (GitHub-as-CMS, fallback local); `index`/`curriculo` **gerados** por `scripts/gen-portfolio.mjs` |
| i18n | PT-BR é a fonte; `src/en/**` e `public/en/**` **gerados** por Argos local (`npm run i18n:sync`) |
| Testes | Playwright (chromium/firefox/webkit + `mobile` + `no-js`), `node:test`, `@axe-core/playwright` |
| Gate | `npm run gate` → build, gêmeos `.md`, artefatos gerados, i18n, grafo, `node:test`, Playwright+axe, orçamento de perf |
| CI/Deploy | `.github/workflows/test.yml` (gate) + `deploy.yml` (OIDC → S3 → CloudFront) |
| Hooks de agente | `guard-protected-files`, `guard-ap-tokens` (PostToolUse), `stop-gate` |
| Instruções de agente | `AGENTS.md` (+ `CLAUDE.md` → `@AGENTS.md`), `.claude/CLAUDE.md` (Repowise), skills em `.claude/skills/` |
| Componentes reutilizáveis | `eco-nav.js`, `cookie-consent.js`, EAI (`eai-*.js`), `src/js/<pagina>/` |
| Design system | tokens Dark Tech (STYLE_GUIDE); exceções `ap-` e `pf-` com ADR |
| A11y existente | `docs/specs/11-a11y/ACC-01` (safe-mode do jogo), `axe.js`, `axe-aaa.js`, `contrast.mjs`, agente `a11y-design-reviewer` |

Restrições que o plano **respeita** (não negocia): não editar `src/en/**`; todo ativo PT-BR editado exige `sync-i18n`;
`gen-portfolio` regenera `index`/`curriculo` (corrigir na **fonte**, não no HTML gerado); `guard-ap-tokens` (nenhum hex fora de `apresentacao.css`);
spec antes do código (SDD, AGENTS.md); infra AWS só via script `.sh` — **não há mudança de infra** neste plano.

## 2. Como o A11Y.md entra — avaliação das 3 opções

Critérios: reprodutibilidade, versionamento, offline, estabilidade, governança, manutenção, custo cognitivo/contexto do agente.

| Critério | A — link remoto | B — cópia versionada | C — integração completa |
| :-- | :-- | :-- | :-- |
| Reprodutibilidade | ✗ muda sob o agente (`main`) | ✓ commit exato | ✓ |
| Offline | ✗ | ✓ | ✓ |
| Estabilidade | ✗ (a menos que fixe tag) | ✓ | ✓ |
| Governança | fraca | ✓ revisão por PR; diff de upgrade visível | ✓ |
| Manutenção | nenhuma | atualizar à mão (CHANGELOG do upstream tem 70 KB — atualiza com frequência) | maior |
| Contexto do agente | ✓ leve, mas busca em rede a cada uso | ⚠ `A11Y.md` pt-BR = 41 KB: **não** pode ser `@import` sempre-carregado | ⚠ idem + 31 guias |
| Risco de supply chain | n/a | baixo (só markdown) | **`tools/*.py` é código de terceiro** |

**Recomendação: B, com carga preguiçosa, e C adiado por etapas.**

1. **Copiar** `docs/pt-BR/A11Y.md` para `docs/a11y/A11Y.md` com cabeçalho de procedência (`fonte`, **SHA do commit**, `versão 2.2.0`, data, licença MIT do upstream).
2. **Copiar só os guias e templates que correspondem a componentes que existem aqui** (≈ 12 de 31 — lista no `ux-spec.md`). Os demais entram quando o componente aparecer. Isto é o "lazy context loading" aplicado ao repositório, não só ao agente.
3. **Uma única linha em `AGENTS.md`** (a regra do próprio A11Y.md: "a regra é uma linha"), condicionada: *"ao criar/editar `src/**/*.html|css` ou `src/js/**` com UI, aplique `docs/a11y/A11Y.md` e carregue só o guia do componente em `docs/a11y/references/`."* **Sem `@docs/a11y/A11Y.md`** — o `@` carregaria 41 KB (~10 mil tokens) em toda sessão, inclusive em tarefas de cron/AWS. Esta é a decisão de custo cognitivo.
4. **`tools/verify-a11y.py` e `contrast-check.py`: não copiar nem executar até aprovação** (Q3). Quando aprovado: copiar com SHA fixado, ler antes (é 48 KB), rodar `--self-test`, depois `--warn-only` para baseline.
5. **Perfil Standard declarado** num lugar só (`REPORT.md`/`A11Y-DECISIONS.md`).
6. **Upgrade deliberado:** atualizar a cópia é um PR que mostra o diff e cita o CHANGELOG do upstream.

Onde ficam os artefatos de governança (o guia de SETUP aceita raiz ou `docs/`): `REPORT.md`, `EXCEPTIONS.md`,
`A11Y-DECISIONS.md` na **raiz do repo** (é onde o `verify-a11y.py` os procura por padrão — `PROJECT_DIR`; **confirmar ao ler o script**).
Esta pasta (`docs/specs/a11y-first/`) guarda a **especificação do trabalho** (SDD); a raiz guarda o **registro do que foi decidido/aceito/entregue**.
Separação deliberada: spec evolui antes do código; registro evolui depois.

## 3. Arquitetura da solução (o que muda no código)

Princípio: **corrigir na causa, uma vez, onde todos os chamadores passam** (menos arquivos, menos regressão).

| Camada | Causa comum | Ponto único de correção |
| :-- | :-- | :-- |
| Contraste (F-04) | `text-gray-500` etc. em 15 arquivos | substituição guiada por script de varredura + token documentado; **não** um tema novo |
| Landmarks/skip (F-09) | cada página reescreve o cabeçalho | snippet canônico + sonda estática que falha se `<main>`/skip link faltar |
| Consentimento (F-01, F-10) | `cookie-consent.js` (uma fonte, 73 páginas) | corrigir **um** arquivo |
| Mídia (F-02) | botão ad hoc por página | decisão D-04 |
| Reflow (F-06) | larguras fixas por página | triagem por página; sem utilitário global |
| Movimento (F-08) | cada página lê `matchMedia` à parte | decisão D-05: leitor único de preferência (`a11y:changed` já existe em `ACC-01`) **só se** ≥ 3 páginas o precisarem — YAGNI |
| Gate (G-01) | axe por página, sem 2.2 | um spec varre todas as rotas do sitemap **do build** |

Dependências para o EN: cada correção em `src/*.html`/`src/js/*` flui ao espelho por `npm run i18n:sync`; `cookie-consent.js` é JS e não é traduzido por mirror — **conferir** se há cópia/strings EN (`src/en/**`) — tratar na Fase 1.

## 4. Riscos

| Risco | Prob. | Impacto | Mitigação |
| :-- | :-: | :-: | :-- |
| Clarear o muted descaracteriza a página | M | M | revisão visual do autor; mudança por token, reversível |
| `<dialog>` quebra estilo do banner | B | M | teste visual + `no-js`; fallback mantém `role=dialog` |
| "Gate verde" pelo motivo errado após ratchet | M | A | baseline **só diminui**; teste que falha se o baseline aumentar |
| Escopo (41×2 páginas) | A | M | fases por **tarefa**, não por página; 14 páginas já auditadas pelo gate primeiro |
| Correção em HTML gerado (`index`, `curriculo`) some na próxima geração | M | A | editar `cv.json`/`gen-portfolio.mjs`; `gate` já confere |
| Falso positivo de contraste por animação | M | B | espera/`reducedMotion` na varredura (já feito nesta auditoria) |
| Declarar conformidade sem humano | B | A | `REPORT.md` com `self-reported ⚠️` enquanto não houver 2º agente/contexto |
