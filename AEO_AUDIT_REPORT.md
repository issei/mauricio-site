# Auditoria AEO — salesforce-agentic-quickstart.html

**Data:** 2026-08-25  
**Página:** https://mauricio.issei.com.br/salesforce-agentic-quickstart.html  
**Status:** ⚠️ **PARCIALMENTE APROVADA** (AEO/SEO correto, acessibilidade deficiente)

---

## 📊 Resumo Executivo

A implementação **AEO (SEO + Resposta de Answer Engine)** está **corretamente implementada** no bloco gerado pelo `scripts/seo/build-aeo.mjs`. No entanto, a página **viola dois requisitos críticos de acessibilidade WCAG 2.1 AA** que são obrigatórios conforme a especificação da mauricio-site.

**Resultado:** A página falhará no quality gate (`npm run gate`) quando forem executados os testes de acessibilidade.

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

## ❌ Problemas de Acessibilidade (Críticos)

Estes problemas **não afetam AEO/SEO**, mas **violam o contrato WCAG 2.1 AA** da mauricio-site e causarão **falha no quality gate**.

### Problema 1: Skip Link Ausente

**Especificação:** `docs/specs/pages/formulacao-de-problemas/04_acessibilidade_seo_aeo.md` (linha 7)  
**Regra:** `<a class="fp-skip">` → `<main id="conteudo">`

**Atual:**
```html
<!-- Após </header> (linha 455) -->
<main class="pt-16">  <!-- ← Sem id="conteudo" -->
  ...
</main>
```

**Esperado:**
```html
<!-- Após </header> -->
<a class="fp-skip" href="#conteudo">Pular para conteúdo principal</a>
<main id="conteudo" class="pt-16">
  ...
</main>
```

**Impacto:**
- ❌ Usuários navegando apenas por teclado não conseguem pular a navegação
- ❌ Leitores de tela não têm um ponto de parada rápido
- ❌ Falha na auditoria axe: `bypass-regions`

---

### Problema 2: Main tag sem id="conteudo"

**Localização:** Linha 457

**Atual:**
```html
<main class="pt-16">
```

**Esperado:**
```html
<main id="conteudo" class="pt-16">
```

**Justificativa:** O `id` é o destino do skip link, obrigatório para WCAG 2.1 AA.

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
- [ ] H1 único: ✓ (1 encontrado)
- [ ] Skip link presente: ❌ **FALHA**
- [ ] Main tag com id="conteudo": ❌ **FALHA**
- [ ] Sem noindex: ✓
- [ ] Google Analytics: ✓

---

## 🛠️ Correções Necessárias

### Passo 1: Adicionar Skip Link
**Arquivo:** `src/salesforce-agentic-quickstart.html`  
**Local:** Após a tag `</header>` (antes de `<main>`)

```html
  </header>

  <a class="fp-skip" href="#conteudo">Pular para conteúdo principal</a>

  <main id="conteudo" class="pt-16">
```

### Passo 2: Adicionar id ao Main
**Arquivo:** `src/salesforce-agentic-quickstart.html`  
**Linha:** 457 (atual)

**De:**
```html
<main class="pt-16">
```

**Para:**
```html
<main id="conteudo" class="pt-16">
```

---

## 📋 Próximos Passos

1. **Aplicar correções** (2 linhas de código)
2. **Executar testes locais:**
   ```bash
   npm run gate
   ```
3. **Confirmar** que todos os testes passam (acessibilidade, AEO, build)

---

## 📚 Referências

- **AEO Spec:** `docs/specs/pages/formulacao-de-problemas/04_acessibilidade_seo_aeo.md`
- **Build Script:** `scripts/seo/build-aeo.mjs`
- **Pages Config:** `scripts/seo/pages.mjs` (linha 311)
- **Test Suite:** `tests/aeo.spec.js`
- **WCAG 2.1 AA:** https://www.w3.org/WAI/WCAG21/quickref/

---

**Auditoria:** Manual + Análise Automatizada  
**Ferramentas:** grep, schema validation, link checking  
**Status:** Pronto para correção

