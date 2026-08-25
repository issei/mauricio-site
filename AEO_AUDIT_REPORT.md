# Auditoria AEO — salesforce-agentic-quickstart.html

**Data:** 2026-08-25  
**Página:** https://mauricio.issei.com.br/salesforce-agentic-quickstart.html  
**Status:** ✅ **APROVADA** (AEO/SEO correto; correções de acessibilidade aplicadas nesta branch)

---

## 📊 Resumo Executivo

A implementação **AEO (SEO + Resposta de Answer Engine)** está **corretamente implementada** no bloco gerado pelo `scripts/seo/build-aeo.mjs`. A auditoria original também identificou **dois problemas de acessibilidade WCAG 2.1 AA** (skip link ausente e `<main>` sem `id="conteudo"`) — ambos **corrigidos** no commit `25d7813` desta branch.

**Resultado após correção:** validado com axe-core contra o dev server — **0 violações serious/critical**. O skip link é o primeiro elemento focável da página, fica visível ao receber foco e aponta corretamente para `#conteudo`.

---

## ✅ Implementação AEO Aprovada

### 1. **SEO On-Page** (13/13 verificações)

| Item | Status | Detalhes |
|------|--------|----------|
| Canonical | ✓ | `https://mauricio.issei.com.br/salesforce-agentic-quickstart` (sem .html) |
| Meta robots | ✓ | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` |
| Meta author | ✓ | Maurício Yokoyama Issei |
| Meta keywords | ✓ | 8 palavras-chave relevantes |
| Meta theme-color | ✓ | #0d1117 (dark theme) |
| Google Analytics | ✓ | GA4 ID: G-GEKLHZYVYX |
| **OG Tags** | ✓ | |
| — og:type | ✓ | `article` |
| — og:site_name | ✓ | Maurício Yokoyama Issei |
| — og:locale | ✓ | pt_BR |
| — og:image | ✓ | `/og-salesforce-agentic-quickstart.png` (1200×630 px, 165 KB) |
| — og:url | ✓ | `https://mauricio.issei.com.br/salesforce-agentic-quickstart` (sem .html) |
| **Twitter Card** | ✓ | |
| — twitter:card | ✓ | `summary_large_image` |
| — twitter:creator | ✓ | @mauricioissei |
| — twitter:site | ✓ | @mauricioissei |
| **Article Metadata** | ✓ | |
| — article:published_time | ✓ | 2026-04-22T08:00:00-03:00 (ISO 8601) |
| — article:modified_time | ✓ | 2026-06-21T10:00:00-03:00 (ISO 8601) |
| — article:author | ✓ | Maurício Yokoyama Issei |
| — article:section | ✓ | Salesforce · DevOps |
| — article:tag | ✓ | 5 tags (Salesforce, Devin, Flosum, Quick Start, Onboarding) |

**Observação:** Todas as datas estão no formato ISO 8601 com timezone, todas as URLs sem `.html`, e os atributos de imagem são válidos.

---

### 2. **JSON-LD Estruturado** (7/7 tipos)

O bloco `<script type="application/ld+json">` contém um `@graph` com os seguintes tipos:

```
✓ WebSite — URL e nome do site
✓ Person — Autor (Maurício Yokoyama Issei com LinkedIn, GitHub, YouTube)
✓ WebPage — URL da página, datePublished, dateModified, image
✓ TechArticle — Headline, description, author, audience
✓ BreadcrumbList — 3 items (Início → Catálogo → Página atual)
✓ FAQPage — 3 perguntas e respostas estruturadas
✓ SpeakableSpecification — `.aeo-tldr` como conteúdo falável
```

**Validação:** JSON-LD é parseável e contém todos os campos obrigatórios.

---

### 3. **Bloco Visível AEO-BODY** (Presente e bem formado)

| Componente | Status | Localização |
|------------|--------|------------|
| Marcador | ✓ | `<!-- AEO-BODY:START -->` (linha 1602) |
| Section | ✓ | `<section class="aeo" aria-label="Resumo e perguntas frequentes">` |
| TLDR | ✓ | `.aeo-tldr` com `__title`, `__lede`, `__points`, `__foot` |
| FAQ | ✓ | `.aeo-faq` com 3 `<details>` elementos |
| Final | ✓ | `<!-- AEO-BODY:END -->` (linha 1633) |

**Perguntas no FAQ:**
1. Quanto tempo leva o quick start?
2. O que preciso ter antes de começar?
3. O resultado já é seguro para produção?

---

### 4. **Companion Markdown**

| Item | Status | Localização |
|------|--------|------------|
| Arquivo | ✓ | `public/salesforce-agentic-quickstart.md` |
| Size | ✓ | 1605 bytes, 28 linhas |
| Link rel=alternate | ✓ | `<link rel="alternate" type="text/markdown" href="...salesforce-agentic-quickstart.md">` |
| Serve como | ✓ | AI markdown para respostas de answer engines |

---

## ✅ Correções de Acessibilidade Aplicadas (commit `25d7813`)

Estes problemas **não afetavam AEO/SEO**, mas **violavam o contrato WCAG 2.1 AA** da mauricio-site e causariam **falha no quality gate**. Ambos foram corrigidos nesta branch.

### Correção 1: Skip Link

**Especificação:** `docs/specs/pages/formulacao-de-problemas/04_acessibilidade_seo_aeo.md` (linha 7)  
**Regra:** `<a class="fp-skip">` → `<main id="conteudo">`

**Antes:**
```html
<main class="pt-16">  <!-- ← Sem id="conteudo"; sem skip link em nenhum lugar da página -->
```

**Depois:**
```html
<body class="bg-ink-900 ...">

  <a href="#conteudo" class="saq-skip">Pular para o conteúdo</a>

  <!-- Google Tag Manager (noscript) -->
  ...
  <header ...> ... </header>

  <main id="conteudo" class="pt-16">
```

**Detalhe importante:** o skip link foi colocado logo após `<body>`, **antes** do `<header>` — não depois, como uma primeira tentativa havia feito. Colocá-lo após o header o tornaria o *último* item da nav a receber foco em vez do primeiro, anulando o propósito de "pular a navegação". A classe `.saq-skip` (escopada à página, seguindo o padrão `fp-skip`/`ec-skip` já usado em outras páginas do site) foi adicionada ao `<style>` inline existente.

**Impacto corrigido:**
- ✓ Usuários navegando por teclado agora pulam a navegação com o primeiro `Tab`
- ✓ Leitores de tela têm um ponto de parada rápido
- ✓ Auditoria axe: sem violação `bypass-regions`

---

### Correção 2: Main tag com id="conteudo"

**Localização:** Linha 457 (original) → aplicado

```html
<main id="conteudo" class="pt-16">
```

**Justificativa:** O `id` é o destino do skip link, obrigatório para WCAG 2.1 AA.

---

### Validação

Verificado com `@axe-core/playwright` contra o dev server (`vite`), Chromium:

```
H1 count: 1
Skip link href: #conteudo
Main id: conteudo
Skip link on first Tab: { left: '0px', focused: true }
Active element after Tab: { tag: 'A', cls: 'saq-skip', href: '#conteudo' }

Total violations: 1 (moderate, pré-existente — landmark-complementary-is-top-level, fora de escopo)
Serious/critical violations: 0
```

---

## 🔍 Checklist de Auditoria

### AEO/SEO (Answer Engine Optimization)
- [x] Canonical correto e sem .html
- [x] Meta robots sem noindex
- [x] GA4 presente
- [x] OG tags completos (type, site_name, locale, title, description, image, url)
- [x] OG image com dimensões (1200×630)
- [x] OG image arquivo existe
- [x] Twitter card (summary_large_image)
- [x] Article metadata (published_time, modified_time, author, section, tags)
- [x] JSON-LD parseável e válido
- [x] Tipos de schema: WebSite, Person, WebPage, TechArticle, BreadcrumbList, FAQPage
- [x] Link rel=alternate para markdown
- [x] Markdown companion existe

### Bloco AEO-BODY
- [x] Marcadores presentes (START/END)
- [x] Section .aeo com aria-label
- [x] .aeo-tldr com heading, lede, points, foot
- [x] .aeo-faq com 3 perguntas em <details>
- [x] FAQ estruturado em JSON-LD

### Acessibilidade (WCAG 2.1 AA)
- [x] H1 único: ✓ (1 encontrado)
- [x] Skip link presente: ✓ **CORRIGIDO** (commit `25d7813`)
- [x] Main tag com id="conteudo": ✓ **CORRIGIDO** (commit `25d7813`)
- [x] Sem noindex: ✓
- [x] Google Analytics: ✓
- [x] Zero violações axe serious/critical: ✓ (validado localmente)

---

## 🛠️ Correções Necessárias

**Arquivo modificado:** `src/salesforce-agentic-quickstart.html`  
**Commit:** `25d7813` nesta branch (`claude/aeo-salesforce-page-audit-a1i2cb`)

Ver diff completo com `git show 25d7813`. Resumo: `.saq-skip` CSS adicionada ao `<style>` inline, `<a href="#conteudo" class="saq-skip">` inserida logo após `<body>`, e `id="conteudo"` adicionado ao `<main>`.

---

## 📋 Próximos Passos

1. ~~Aplicar correções~~ ✅ Concluído (commit `25d7813`)
2. ~~Validar localmente com axe-core~~ ✅ 0 violações serious/critical
3. **Aguardar CI do PR** (`Build + Playwright + a11y`) confirmar em ambiente completo (todos os browsers do projeto)

---

## 📚 Referências

- **AEO Spec:** `docs/specs/pages/formulacao-de-problemas/04_acessibilidade_seo_aeo.md`
- **Build Script:** `scripts/seo/build-aeo.mjs`
- **Pages Config:** `scripts/seo/pages.mjs` (linha 311)
- **Test Suite:** `tests/aeo.spec.js`
- **WCAG 2.1 AA:** https://www.w3.org/WAI/WCAG21/quickref/

---

**Auditoria:** Manual + Análise Automatizada  
**Ferramentas:** grep, schema validation, link checking, axe-core/playwright  
**Status:** Correções aplicadas e validadas localmente; aguardando CI

