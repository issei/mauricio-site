# 04 — Acessibilidade, SEO, AEO e i18n

## 1. Contrato de acessibilidade (WCAG 2.1 AA)

| Item | Regra | Verificação |
| :-- | :-- | :-- |
| Estrutura | `<a class="dw-skip">` → `<main id="conteudo">`; um único `<h1>`; hierarquia sem saltos | `audit-site.mjs` + axe |
| Contraste | Texto ≥ 4.5:1; traço e borda de controle ≥ 3:1 | `tests/digital-workplace.tokens.test.mjs` + axe |
| Teclado | V2, V4 e V7 operáveis por `Tab` + setas; V8 por rádios nativos | Playwright de teclado |
| Foco | `:focus-visible` 2px `--dw-link`, nunca removido | revisão + axe |
| Movimento | `prefers-reduced-motion` desliga tudo, sem perda de conteúdo | `emulateMedia` no Playwright |
| Sem JavaScript | Todo o conteúdo legível; controles dependentes de JS nascem `disabled` | `tests/digital-workplace.nojs.spec.js` no projeto `no-js` |
| Diagramas | conteúdo em HTML semântico; SVG decorativo `aria-hidden` ou `role="img"` + descrição longa | axe + revisão |
| Tabelas | `<caption>`, `<th scope>`, contêiner rolável com `tabindex="0"` e rótulo | axe |
| Live regions | V4 e V8 em `aria-live="polite"` | revisão |
| Alvos de toque | ≥ 24×24 px | revisão em 375 px |
| Zoom | 200% sem perda; sem scroll horizontal da página em 375 px | Playwright |

**Gate:** `expectNoSeriousA11yViolations(page)` — zero `serious`/`critical` na página inteira.

## 2. SEO on-page

`<head>` gerado por `scripts/seo/build-aeo.mjs` a partir da entrada em `scripts/seo/pages.mjs`.

| Campo | Valor |
| :-- | :-- |
| `<title>` | `Digital Workplace agêntico — Do Portal ao Agente` (48 chars) |
| `description` | ≤ 160 chars, ex.: "Como um portal corporativo evolui para um Digital Workplace agêntico: maturidade, arquitetura, AG-UI, identidade delegada, conhecimento governado e roadmap." (validar contagem) |
| `canonical` | `https://mauricio.issei.com.br/digital-workplace-agentico` |
| `robots` | `index, follow, max-image-preview:large, max-snippet:-1` |
| OG/Twitter | `og:type=article`, `og:image=/og-digital-workplace-agentico.png` (1200×630, `scripts/seo/gen-og.mjs`), `summary_large_image` |
| Sitemap | automático |

## 3. AEO / GEO

| Artefato | Conteúdo |
| :-- | :-- |
| `TechArticle` | `type: 'TechArticle'`, tier `S`, `hasMd: true`, `section: 'Arquitetura de Plataformas Agênticas'`, `author`/`publisher` = nó `Person` do site, `audience`: "Arquitetos corporativos, Product Managers, UX, Especialistas em IA, Segurança, SRE" |
| `FAQPage` | 6 perguntas: *o que é um Digital Workplace agêntico*; *o que é uma EXP e como difere de uma intranet*; *o que é o protocolo AG-UI*; *por que RAG não substitui governança de conteúdo*; *com que identidade um agente corporativo deve agir* (delegação, RFC 8693); *por onde começar a evolução* (jornada piloto, fases) |
| `DefinedTermSet` | 8 termos: Digital Workplace agêntico, Employee Experience Platform (EXP), AG-UI, Component Registry, permission-aware retrieval, identidade delegada, human-in-the-loop (HITL), índice de prontidão agêntica |
| `BreadcrumbList` | Início → Catálogo → esta página |
| `SpeakableSpecification` | `.aeo-tldr` |
| `mdSections` | 3 seções: "A tese e suas fundações", "Os cinco estágios", "Por onde começar" |
| `og` | eyebrow "Arquitetura · Digital Workplace"; title "Do portal ao {agente}"; chips EXP, AG-UI, RAG, IAM |

**Toda string da entrada em `pages.mjs` passa pela guarda legal** (doc 06): o teste extrai o bloco
do slug e procura os termos proibidos.

**Bloco visível:** `<!-- AEO-BODY -->` imediatamente antes do `<footer>`; não editar à mão.

## 4. Markdown companheiro

`public/digital-workplace-agentico.md`, servido como `text/markdown` e declarado em
`<link rel="alternate" type="text/markdown">`. Conteúdo: a página inteira em Markdown, com selos
como `**[FATO]**` etc., tabelas completas e as 30 perguntas. Mesmas regras do doc 06.

**Como é gerado (decisão de implementação).** O Markdown não é digitado: a entrada do slug em `pages.mjs` declara
`mdFromMain: true`, e `scripts/seo/html-to-md.mjs` converte o `<main>` da página (títulos, tabelas, listas, `details`,
selos) e o anexa depois de "Em síntese" e das `mdSections`, sob "Conteúdo completo da página". Controles (botões,
formulário) e o que a página marca com `data-md="skip"` ficam de fora; cada `fieldset` de V8 vira um item de lista.
Assim o `.md` nunca diverge do HTML.

## 5. i18n

- Depois de criar/alterar `src/digital-workplace-agentico.html` ou `public/digital-workplace-agentico.md`:
  `npm run i18n:sync && npm run i18n:check` (skill `sync-i18n`). Tradução local (Argos), **sem LLM**.
- Nunca editar `src/en/digital-workplace-agentico.html` nem `public/en/digital-workplace-agentico.md`.
- O gêmeo também passa pela guarda legal (a tradução não pode reintroduzir nada, mas o teste cobre).
- Termos técnicos que o Argos traduz mal (AG-UI, MCP, A2A, EXP, HITL) devem estar em `<code>` ou
  na lista de preservação do tradutor (`scripts/i18n/`), conforme o README do tradutor.

**O que a implementação fez (medido com o próprio Argos, não suposto):**

- **Siglas compostas em caixa alta** (AG-UI, JSON-LD): o NMT as "corrige" (`AG-UI` → `AG-IU` em quase toda frase).
  `scripts/i18n/engine.py` agora as protege com marcador próprio (`zzsg`), em todo caminho (HTML, JSON-LD, Markdown);
  teste em `tests/i18n.test.mjs`. As demais siglas (MCP, A2A, EXP, HITL, A2UI, BFF) saem intactas e ficaram como estão.
- **"agêntico"**: o modelo só o acerta em minúscula e como sintagma nominal ("Digital Workplace agêntico" →
  "Agentic Digital Workplace"); capitalizado vira "Genetic", e no meio da frase vira "agency". Por isso o `<title>`, a
  marca da navegação, o rodapé e a descrição usam "agêntico" minúsculo e abrem a frase com o termo; onde o adjetivo
  falhava dentro de frase ("plataforma agêntica", "workflow agêntico") o texto diz "orientada a agentes" / "com agentes";
  a pergunta 1 do FAQ pergunta pelo "Digital Workplace orientado a agentes" e a resposta cita o termo "agêntico".
- **Nomes de estágio em inglês** ("Agentic Workplace"): `<span translate="no">` no HTML; no Markdown derivado viram
  código inline, que o tradutor preserva.

## 6. Vocabulário controlado

Grafias fixas: **Digital Workplace · Employee Experience Platform (EXP) · AG-UI · MCP · A2A · A2UI ·
MCP Apps · Component Registry · RAG · human-in-the-loop (HITL) · BFF · SoR · RFC 8693 · LGPD ·
OpenTelemetry · SLO**.

Proibido: "revolucionário", "disruptivo", "game-changer", "solução completa", "garante",
"elimina", "de última geração", e qualquer nome de organização real como caso (doc 06).

## 7. Métricas de sucesso

| Métrica | Alvo |
| :-- | :-- |
| `npm run gate` | verde |
| axe `serious`/`critical` | 0 |
| Scroll horizontal em 375 px | ≤ 1 px |
| CSS + JS da página | ≤ 48 KB não comprimidos somados |
| Termos proibidos (guarda legal) | 0 em todos os artefatos do doc 06 §3 |
| Requisições bloqueantes de terceiro | 0 |
