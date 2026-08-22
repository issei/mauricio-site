---
name: ship-page
description: Pre-push preflight for the mauricio-site MPA — runs the quality gate and verifies the release checklist (SEO, canonical, catalogo link, a11y) before pushing to main, which auto-deploys to AWS. Use when the user wants to ship, release, or push page changes.
disable-model-invocation: true
---

# ship-page — preflight antes do push (deploy automático)

Push em `main` dispara o deploy (GitHub Actions OIDC → S3/CloudFront). Esta skill garante que nada quebrado chegue lá. **Fail-closed**: pare na primeira falha.

## Checklist

### 1. Gate determinístico (build + testes + axe)
```bash
npm run gate
```
Tem que sair verde (build OK + Playwright cross-browser, incl. a11y axe). Se vermelho, **não prossiga** — corrija e rode de novo.

### 1b. Gêmeo `/en/` em dia
```bash
npm run i18n:check
```
Se acusar `VELHO` ou `FALTANDO`, rode a skill [`sync-i18n`](../sync-i18n/SKILL.md)
antes de seguir. Deploy com espelho velho publica uma página em inglês que
mente sobre o conteúdo atual. (O `npm run gate` do passo 1 já roda esta
conferência; o comando avulso serve para diagnosticar sem esperar a suíte.)

### 2. Checklist de release (por página alterada)
Para cada `src/*.html` no diff:
- [ ] `<title>` 10–60 chars e `<meta name="description">` 50–160 chars.
- [ ] `<link rel="canonical">` aponta para a URL final correta.
- [ ] `<meta name="robots">` **não** contém `noindex` (a menos que intencional).
- [ ] Exatamente um `<h1>`.
- [ ] Linkada em `src/catalogo.html` (se for conteúdo público).
- [ ] Tokens Dark Tech respeitados; texto/azul com contraste AA.
- [ ] Espelho em `src/en/` regerado e commitado junto com o manifesto.

Use `git diff --name-only origin/main...HEAD -- src` para listar o que mudou.

### 3. Mensagem de commit
- `feat:` para página/feature nova; PT-BR curto para ajustes de conteúdo/CSS.
- Rodapé: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

### 4. Push
Só depois de 1–3 verdes:
```bash
git push origin main
```
Depois confirme o workflow em Actions (deploy). Em caso de falha de deploy, investigue o run — não faça re-push às cegas.

## Saída esperada
Um resumo: o que mudou, resultado do gate, itens do checklist marcados, e a confirmação de que está seguro para deploy (ou a lista do que falta).
