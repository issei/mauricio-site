---
name: new-page
description: Scaffold a new src/*.html landing/content page following the mauricio-site "Dark Tech" conventions — SEO head, design tokens, a Playwright smoke + axe a11y test, and the catalogo.html link. Use when the user asks to create a new page, proposal, or content area.
disable-model-invocation: true
---

# new-page — criar uma página nova end-to-end

Scaffolda uma página `src/<nome>.html` no padrão do repositório, **sem esquecer** nenhum passo do ritual (SEO, tokens Dark Tech, teste Playwright + axe, link no catálogo). O Vite descobre `src/*.html` automaticamente — não é preciso tocar em `vite.config.js`.

> Leia antes: [`AGENTS.md`](../../../AGENTS.md) e [`.agents/skills/mauricio-site-patterns/SKILL.md`](../../../.agents/skills/mauricio-site-patterns/SKILL.md). Use uma página existente complexa (ex.: `src/engenharia-confianca.html` ou `src/service-operations-2-0.html`) como referência visual.

## Entradas a confirmar com o usuário
1. **slug** do arquivo (`src/<slug>.html`) e **título** (10–60 chars).
2. **meta description** (50–160 chars).
3. **categoria** no `catalogo.html` (DevOps / Arquitetura / Gestão / Jornada).
4. CSS dedicado (`src/<slug>.css`) ou estilos inline? (páginas grandes usam arquivo dedicado com prefixo de namespace, ex.: `.ec-`).

## Passos

### 1. Criar `src/<slug>.html`
Inclua **obrigatoriamente** no `<head>` (checklist de SEO):
```html
<title>Título Descritivo — Maurício Yokoyama Issei</title>
<meta name="description" content="… 50–160 chars …" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://mauricio.issei.com.br/<slug>" />
<meta property="og:type" content="article" />
<meta property="og:title" content="…" />
<meta property="og:description" content="…" />
<meta property="og:url" content="https://mauricio.issei.com.br/<slug>" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
```
Estrutura mínima acessível: `<a class="skip" href="#conteudo">`, `<main id="conteudo">`, **exatamente um `<h1>`**.

### 2. Design system "Dark Tech" (NÃO desviar)
- Fundo `#0d1117`; superfícies `#161b22` / `#1c2230`; borda `#30363d`.
- Texto `#c9d1d9`; títulos `#fff`; **link/azul de texto `#58a6ff`** (contraste AA — não use `#007bff` em texto pequeno).
- Acento decorativo/gradiente: `linear-gradient(90deg, #007bff, #8a2be2)`.
- Fonte **Inter** sempre. Micro-interações: hover elevation + glow sutil.
- Respeite `prefers-reduced-motion` (desligar animações).

### 3. Criar o teste `tests/<slug>.spec.js`
```js
import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

const PATH = '/<slug>.html';

test('carrega, título/SEO e h1 único', async ({ page }) => {
  const res = await page.goto(PATH);
  expect(res?.status()).toBe(200);
  await expect(page).toHaveTitle(/…/);
  const desc = await page.getAttribute('meta[name="description"]', 'content');
  expect(desc?.length).toBeGreaterThan(50);
  await expect(page.locator('h1')).toHaveCount(1);
});

test('a11y: axe sem violações serious/critical', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(PATH);
  await expectNoSeriousA11yViolations(page);
});

test('mobile: sem scroll horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(PATH);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
```

### 4. Linkar em `src/catalogo.html`
Adicione um `<a href="./<slug>.html" class="card-glass …">` na seção da categoria escolhida (siga o padrão dos cards existentes).

### 5. Validar (fail-closed)
Rode o gate antes de considerar pronto:
```bash
npm run gate -- --grep "<slug>"   # ou: npm run gate
```
Critério de pronto: build verde + testes (smoke + a11y + mobile) verdes em chromium.

### 6. Commit
`feat: Add new page for <descrição>` (prefixo `feat:` para páginas novas).

### Último passo: o gêmeo em inglês

Uma página nova não existe só em português. Antes de considerar a página pronta,
rode a skill [`sync-i18n`](../sync-i18n/SKILL.md) para gerar `src/en/<slug>.html`
e o `public/en/<slug>.md` correspondente — o `npm run gate` cobra isso.
