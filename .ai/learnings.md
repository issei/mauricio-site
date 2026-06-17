# Learnings — construção `engenharia-agentes-ia`

Lições recorrentes para não tropeçar duas vezes (doc 10). Append-only; cada item: contexto → lição.

- **Tailwind v4 é por-página.** Cada `.html` em `src/` linka seu próprio CSS que faz
  `@import "tailwindcss";` (ex.: `engenharia-agentes-ia.css`). Não há CSS global único.
- **`main` = produção.** O `deploy.yml` publica a cada push na `main`. Use `noindex` + seção `hidden`
  como flag enquanto a página está incompleta; gate local verde antes de todo push.
- **Sitemap auto-inclui `src/*.html`.** `vite-plugin-sitemap` lista todas as páginas; o `noindex` na
  meta evita indexação enquanto em construção.
- **Gate = `node scripts/quality-gate.mjs`.** Build + Playwright (+ axe). Offline, determinístico.
