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

### ⌨️ Available Commands
- **`/skill-create`**: Use this command to analyze Git history and generate new `SKILL.md` files for emerging patterns. See [skill-create.md](file:///.agents/commands/skill-create.md).

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

---

## 🎨 Design System Guardrails

**DO NOT DEVIATE** from these aesthetics:
- **Theme**: Pure Dark Mode. Never use light backgrounds.
- **Typography**: `Inter` (Google Fonts) for everything.
- **Accents**: High-contrast gradients (`#007bff` to `#8a2be2`).
- **Micro-interactions**: Subtle hover elevations and neon glows (`box-shadow`).

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
| `public/` | Assets and the `cv.json` local fallback. |
| `.agents/` | **YOUR HOME**. Skills, commands, and workflows. |
| `docs/specs/` | Detailed technical specifications. |
| `tests/` | E2E Playwright specifications. |

---

> [!IMPORTANT]
> When in doubt, perform a `grep_search` across `src/*.html` to see how a similar component was implemented. Consistency is more important than innovation in this repository's structure.
