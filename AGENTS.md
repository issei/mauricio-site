# 🤖 Maurício Site — Agent Protocol

Welcome, Agent. This file serves as your primary operating directive for the **Maurício Yokoyama Issei** portfolio repository. You are expected to maintain the high standards of technical excellence, "Dark Tech" aesthetics, and architectural consistency defined here.

---

## 🏛️ Project Philosophy

This is a **Multi-Page Application (MPA)** optimized for performance, SEO, and developer-centric aesthetics. We avoid the overhead of heavy SPA frameworks, favoring native web standards.

- **Tech Stack**: Vite 6, Tailwind CSS v4 (native imports), Vanilla JS (ES6 Modules).
- **CMS Pattern**: GitHub-as-a-CMS via dynamic `cv.json` fetching.
- **Architectural Anchor**: Every feature/landing page is a standalone `.html` file in `src/`.

---

## 🛠️ Agent Capabilities & Skills

You have access to specialized skills and patterns located in `.agents/skills/`. Before performing any significant task, you **MUST** read:

1.  **[mauricio-site-patterns](file:///.agents/skills/mauricio-site-patterns/SKILL.md)**: The "Source of Truth" for coding conventions, workflows, and the design system.
2.  **[test-skill](file:///.agents/skills/test-skill/SKILL.md)**: Repository structure validation.

### 🌐 i18n — o gêmeo `/en/` é obrigação, não opcional

O site publica duas línguas a partir de uma fonte só: PT-BR na raiz, e um gêmeo
**gerado** em `/en/`. Toda edição em ativo público PT-BR (`src/*.html`,
`public/*.md`, `cv.json`, `star.json`, `llms*.txt`, `cv-for-ai.md`) deixa o
espelho em inglês velho — e um espelho velho está publicado e indexado,
mentindo sobre o conteúdo atual.

Depois de qualquer edição desse tipo, rode a skill
[`sync-i18n`](.claude/skills/sync-i18n/SKILL.md) — ou, no mínimo,
`npm run i18n:sync && npm run i18n:check`.

- A tradução é **local** (Argos Translate, `scripts/i18n/`). **Não use LLM para
  traduzir**: custo de token zero é o ponto da arquitetura.
- **Nunca edite `src/en/**` nem `public/en/**` à mão** — são gerados e
  sobrescritos. Corrija o português.
- `npm run gate` já cobra que os espelhos estejam em dia.

### ⌨️ Available Commands
- **`/skill-create`**: Use this command to analyze Git history and generate new `SKILL.md` files for emerging patterns. See [skill-create.md](file:///.agents/commands/skill-create.md).

### 🕸️ CodeGraph — indexed code graph

This repo is indexed by [CodeGraph](https://github.com/colbymchenry/codegraph)
(`.codegraph/` at the repo root — local runtime data only, gitignored except
`.gitignore` itself). Reach for it **before** grep/find or reading files when
you need to understand or locate code:

- **MCP tool** (when available): `codegraph_explore` answers most code
  questions in one call — verbatim source of the relevant symbols plus the
  call paths between them, including dynamic-dispatch hops grep can't follow.
- **Shell** (always works): `codegraph explore "<symbol names or question>"`
  prints the same output.

If `.codegraph/` is missing (fresh clone, another machine), skip it and fall
back to grep/Read — indexing is a local, per-machine decision.

---

## 📐 Spec-Driven Development (SDD)

This repository follows a strict **Spec-Driven Development** approach. Before implementing any feature or page, a technical specification must exist or be created.

1.  **Requirement Capture**: Use `docs/specs/PAGE_SPEC_TEMPLATE.md` as a starting point.
2.  **Location**: Store technical specifications in `docs/specs/`.
3.  **Validation**: Before coding, ensure the spec complies with `STYLE_GUIDE.md` and `ARCHITECTURE.md`.
4.  **Consistency**: Code changes must match the specification. If requirements evolve, update the spec *before* the code.

---

## 🚀 Critical Workflows

### 1. Adding a New Landing Page/Proposal
When asked to create a new page:
1.  **Reference**: Use `src/service-operations-2-0.html` or `src/devops-salesforce.html` as the visual and structural benchmark.
2.  **Implementation**: Create `src/<new-page>.html`. Vite will auto-discover it.
3.  **Styling**: Use Tailwind CSS v4 utilities and the "Dark Tech" design tokens (Background: `#0d1117`, Accent: `#007bff`/`#8a2be2`).
4.  **SEO**: Implement the SEO Checklist (Title, Meta Description, OG Tags, Canonical Link).
5.  **Testing**: Create a Playwright smoke test in `tests/<new-page>.spec.js`.

### 2. Updating CV Content
- **Content updates**: Modify `public/cv.json` (local fallback) and ensure the remote `issei/curriculo` repo is considered if requested.
- **Logic updates**: Edit `src/js/cv-renderer.js` to handle new JSON fields.

### 3. Infrastructure & AWS Modifications
When proposing or implementing changes to AWS (S3, CloudFront, IAM, etc.):
1.  **Specification**: Update the relevant file in `docs/specs/` (e.g., `ARCHITECTURE.md` or `CICD_OIDC.md`).
2.  **Manual Scripting**: ALWAYS generate a standalone shell script (`.sh`) capable of being executed directly in **AWS CloudShell**.
3.  **Content-Type Handling**: If modifying how files are served, ensure the script explicitly handles MIME types (e.g., `aws s3 cp ... --content-type "text/markdown"`).
4.  **Verification**: Provide a clear check list for manual validation in the AWS Console.

---

## 🎨 Design System Guardrails

**DO NOT DEVIATE** from these aesthetics:
- **Theme**: Pure Dark Mode. Never use light backgrounds.
- **Typography**: `Inter` (Google Fonts) for everything.
- **Accents**: High-contrast gradients (`#007bff` to `#8a2be2`).
- **Micro-interactions**: Subtle hover elevations and neon glows (`box-shadow`).

### Exceção registrada: `apresentacao` (namespace `.ap-*`)

`src/apresentacao.html` e `src/apresentacao.css` implementam a especificação UX v3.0,
que define uma paleta própria (`#0A0A0C` / `#101014` / `#17171C`, acentos cobalto/verde/âmbar)
e um piso de contraste de **7:1** na Camada 3. **É a única exceção à paleta Dark Tech.**

- Escopo: apenas esses dois arquivos e `src/js/apresentacao/**`. Fora deles a exceção não vale.
- Todo seletor e custom property usa o prefixo `ap-`, para impedir vazamento.
- **Nenhum hexadecimal** pode ser escrito fora de `src/apresentacao.css` — aplicado
  mecanicamente pelo hook `scripts/guard-ap-tokens.mjs` e por `tests/apresentacao.tokens.test.mjs`.
- Decisão e contrastes calculados: [`ADR-ap-001`](docs/specs/pages/apresentação/ADR-ap-001-namespace-e-excecao-dark-tech.md).

Ao revisar essa página, **não** a reprove por usar cores fora da paleta Dark Tech.

---

## ✅ Quality & Validation

- **Testing**: Playwright is our guardian. All PRs/Changes must pass `npx playwright test`.
- **Linting**: Follow the patterns in existing `.js` modules (clean, documentation-heavy, ES6+).
- **Specs**: Refer to `docs/specs/` for deep-dives into Architecture, Style, and Testing.

---

## 📂 Directory Map for Agents

| Path | Purpose |
| :--- | :--- |
| `src/` | Active source code (HTML, CSS, JS). |
| `src/en/`, `public/en/` | **Gerados.** Gêmeo em inglês — não editar à mão. |
| `public/` | Assets and the `cv.json` local fallback. |
| `.agents/` | **YOUR HOME**. Skills, commands, and workflows. |
| `.codegraph/` | CodeGraph's local index (gitignored). See CodeGraph section above. |
| `docs/specs/` | Detailed technical specifications. |
| `tests/` | E2E Playwright specifications. |

---

> [!IMPORTANT]
> When in doubt, perform a `grep_search` across `src/*.html` to see how a similar component was implemented. Consistency is more important than innovation in this repository's structure.
