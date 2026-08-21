# 04 — Acessibilidade, SEO e AEO/GEO

## 1. Contrato de acessibilidade (WCAG 2.1 AA)

| Item | Regra | Verificação |
| :-- | :-- | :-- |
| Estrutura | `<a class="fp-skip">` → `<main id="conteudo">`; exatamente um `<h1>`; hierarquia sem saltos | `audit-site.mjs` + axe |
| Contraste | Texto ≥ 4.5:1; traço de gráfico e borda de controle ≥ 3:1 | axe (`color-contrast`) |
| Teclado | Rosácea (V2), estados (V3) e barras (V7) navegáveis por `Tab` + setas; sliders (V4) operáveis com setas e `Home`/`End` | teste Playwright de teclado |
| Foco | `:focus-visible` 2px `--fp-accent`, offset 2px, nunca removido | revisão + axe |
| Movimento | `prefers-reduced-motion` desliga tudo, sem perda de conteúdo | teste com `emulateMedia` |
| Sem JavaScript | Todo o conteúdo permanece legível; controles que dependem de JS nascem `disabled` | projeto `no-js` do Playwright (`tests/formulacao.nojs.spec.js`) |
| Gráficos | `role="img"` + `aria-label` curto + descrição longa em `.fp-vh`; ou marcação de tabela real | axe + revisão |
| Live regions | Leituras recalculadas de V4 em `aria-live="polite"` (nunca `assertive`) | revisão |
| Alvos de toque | ≥ 24×24 px em todos os controles | revisão em 375 px |
| Zoom | 200% sem perda de conteúdo; sem scroll horizontal em 375 px | teste Playwright |

**Gate:** `expectNoSeriousA11yViolations(page)` — zero violações `serious`/`critical` na página
inteira (não apenas no bloco `.aeo`).

## 2. SEO on-page

Gerado por `scripts/seo/build-aeo.mjs` a partir da entrada em `scripts/seo/pages.mjs` — **não se
escreve `<head>` à mão** nesta página, salvo o que o injetor não gerencia (charset, viewport,
fonte, folha de estilo local, favicon).

| Campo | Valor |
| :-- | :-- |
| `<title>` | `Formulação de Problemas — Engenharia Interrompida` (49 chars, dentro de 10–60) |
| `description` | 50–160 chars, com a palavra-chave "formulação de problemas" e o diferencial "regra de parada" |
| `canonical` | `https://mauricio.issei.com.br/formulacao-de-problemas` |
| `robots` | `index, follow, max-image-preview:large, max-snippet:-1` |
| OG/Twitter | `og:type=article`, `og:image=/og-formulacao-de-problemas.png` (1200×630, gerado por `scripts/seo/gen-og.mjs`), `twitter:card=summary_large_image` |
| GA4 | `G-GEKLHZYVYX`, injetado pelo mesmo bloco |
| Sitemap | Automático (`vite-plugin-sitemap` varre `src/*.html`) |

## 3. AEO/GEO — o que a página oferece a um answer engine

| Artefato | Conteúdo |
| :-- | :-- |
| `TechArticle` | headline, `datePublished`/`dateModified`, `author`/`publisher` = nó `Person` do site, `about`, `keywords`, `audience` |
| `FAQPage` | 6 perguntas, respondendo o que o leitor pergunta ao motor: *o que é formulação de problemas*, *o que é regra de parada*, *o que é suficiência decisional*, *o que é EVSI*, *o que é hiper-resolução*, *quando o framework não se aplica* |
| `DefinedTermSet` | 8 termos: formulação de problemas, engenharia interrompida, suficiência decisional, suficiência negociada, EVSI, penalidade de hiper-resolução (λ), incerteza de fronteira, validade ecológica |
| `BreadcrumbList` | Início → Catálogo → esta página |
| `SpeakableSpecification` | `.aeo-tldr` |
| Companion Markdown | `public/formulacao-de-problemas.md` (`hasMd: true`), servido como `text/markdown` e declarado em `<link rel="alternate">` |

**Bloco visível.** `<!-- AEO-BODY -->` fica imediatamente antes do `<footer>`: é ali que
`build-aeo.mjs` injeta "Em síntese" + FAQ. Esse bloco é regenerável — **não editar à mão**.

## 4. Vocabulário controlado (anti-drift)

Grafias fixas, cobradas por `audit-site.mjs` e pela revisão de tom:
**Problem Structuring Methods · Decision Analysis · EVSI · EVPI · Bayesian Decision Theory ·
Knowledge Engineering · engenharia interrompida · suficiência decisional · suficiência negociada ·
penalidade de hiper-resolução**.

Proibido: "revolucionário", "disruptivo", "game-changer", "solução completa", "de última geração".
Proibido também, aqui em especial: qualquer verbo que prometa resultado ("garante", "elimina a
incerteza", "assegura a decisão certa") — o artigo sustenta a hipótese **parcialmente** e a página
não pode ser mais forte que ele.

## 5. Métricas de sucesso

| Métrica | Alvo |
| :-- | :-- |
| Gate `npm run gate` | verde (build + auditoria + node:test + Playwright/axe + orçamento) |
| Violações axe `serious`/`critical` | 0 |
| Scroll horizontal em 375 px | ≤ 1 px |
| CSS + JS da página | ≤ 42 KB não comprimido somados |
| Links em bloco de texto | sublinhados (WCAG 1.4.1: cor não pode ser o único distintivo) |
| Requisições bloqueantes de terceiro | 0 |
| Tempo de leitura calculado (`gen-hub-data.mjs`) | derivado do texto real, nunca digitado |
