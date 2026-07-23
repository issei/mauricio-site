# Plano Mestre do Site — `mauricio.issei.com.br`

**Documento:** SDD-SITE-001
**Escopo:** as 19 páginas públicas, o grafo de navegação e as camadas transversais
**Estado:** vivo — atualizar a cada página adicionada ou promovida de tier
**Última varredura:** 2026-07-23, por `scripts/audit-site.mjs`

---

## 1. Para que este documento existe

O site cresceu por página: cada uma nasceu de uma spec própria, com CSS próprio e
suíte própria. Isso funcionou — todas passam no gate — mas produziu um conjunto
sem plano: quatro fontes da verdade parcialmente sobrepostas, três estratégias de
CSS, e uma página que contrariava a norma visual central sem que nada acusasse.

Este plano descreve **o site como sistema**: o que cada página é, o que
compartilham, o que ainda diverge e em que ordem vale corrigir.

Regra que organiza tudo o resto: **coerência é propriedade do grafo, não da
página.** Verificação por página não a enxerga. Daí `scripts/audit-site.mjs`
existir e rodar no gate.

---

## 2. Inventário das 19 páginas públicas

Tier = peso editorial (herdado de `scripts/seo/pages.mjs`), não profundidade
técnica. Palavras = texto visível, medido do HTML.

### Tier S — porta de entrada e teses centrais

| Página | Palavras | CSS | Papel |
|---|---:|---|---|
| `apresentacao` | 1.919 | dedicado `.ap-*` | Apresentação executiva v3.0; seletor de perspectiva |
| `devin` | 6.989 | dedicado | Estudo de caso profundo de Agent-Driven Development |
| `engenharia-agentes-ia` | 6.109 | dedicado | Os dez princípios; a página mais interativa do site |
| `knowledge-os-presentation` | 4.517 | Tailwind | Arquitetura de conhecimento corporativo |
| `proposta-engenharia-reversa` | 1.347 | Tailwind | Proposta executiva com WebGL no hero |

### Tier A — aplicação e propostas

| Página | Palavras | CSS | Papel |
|---|---:|---|---|
| `salesforce-agentic-dev` | 4.260 | inline | Portal de treinamento |
| `socialselling` | 3.476 | inline | Overview de projeto com ADRs |
| `devops-salesforce` | 1.879 | inline | Arquitetura híbrida de entrega |
| `service-operations-2-0` | 1.766 | Tailwind | Modelo para conselho executivo |
| `salesforce-agentic-quickstart` | 1.667 | inline | Primeiro deploy governado |
| `proposta-observabilidade-mobile` | 880 | inline | Proposta SRE |
| `sustentacao` | 616 | Tailwind | Incidentes e resiliência |
| `proposta` | 479 | inline | Inteligência de vendas |

### Tier B — perfil, navegação e narrativa

| Página | Palavras | CSS | Papel |
|---|---:|---|---|
| `know` | 1.712 | Tailwind | Ensaio editorial (Cynefin) |
| `terminal-evolutivo` | 1.072 | inline | Scrollytelling 1982→2026 |
| `catalogo` | 685 | Tailwind | Hub do ecossistema, 5 pilares |
| `index` | 139 | Tailwind | Perfil; conteúdo vem de `cv.json` |
| `life3d` | 66 | inline | Narrativa 3D |
| `life` | 12 | Tailwind | Narrativa em pixel art |

> `life` e `life3d` têm quase nenhum texto por serem experiências visuais. É
> intencional, mas as torna invisíveis para busca — ver §5, item 4.

---

## 3. As camadas transversais

O que atravessa todas as páginas e, por isso, não pertence a nenhuma.

| Camada | Fonte da verdade | Estado |
|---|---|---|
| Conteúdo/SEO/AEO | `scripts/seo/pages.mjs` | 19/19 páginas · `engenharia-confianca` fora (§5.1) |
| Grafo de navegação | `specs/ecosystem.nav.yaml` | v1.2.0 · espelhado em `src/js/eco-nav.js` |
| Hub visual | `src/catalogo.html` | 5 pilares · cobre 100% do grafo |
| Design "Dark Tech" | `AGENTS.md` + `docs/specs/STYLE_GUIDE.md` | fundo `#0d1117`, texto `#c9d1d9`, link `#58a6ff` |
| Design v3.0 (exceção) | `src/apresentacao.css` | namespace `.ap-*`, ver `ADR-ap-001` |
| Qualidade | `scripts/quality-gate.mjs` | build · artefatos · coerência · invariantes · 510 testes · perf |
| Coerência do grafo | `scripts/audit-site.mjs` | no gate com `--strict` |

### 3.1 Estratégias de CSS — e por que a divergência é aceitável

Três abordagens convivem: **dedicado** (páginas grandes e autorais),
**Tailwind via `input.css`** (páginas de layout convencional) e **inline**
(propostas, que nasceram como documentos autocontidos).

Isso não é dívida a ser paga por uniformização. Unificar exigiria reescrever
19 páginas que hoje passam no gate, com risco alto e ganho estético. O que
importa é que **os tokens de cor sejam os mesmos** — e isso agora é verificado
(§4), o que era o problema real.

---

## 4. Invariantes do site

Verificados automaticamente. Um invariante sem verificação é uma intenção.

| # | Invariante | Onde se verifica |
|---|---|---|
| INV-S1 | Todo link interno aponta para arquivo existente | `audit-site.mjs` |
| INV-S2 | Nenhuma página pública é órfã | `audit-site.mjs` |
| INV-S3 | Título 10–60 e description 50–160 em toda página pública | `audit-site.mjs` |
| INV-S4 | Exatamente um `<h1>` por página | `audit-site.mjs` |
| INV-S5 | `ecosystem.nav.yaml` e `eco-nav.js` idênticos em nós e versão | `apresentacao.ecossistema.test.mjs` |
| INV-S6 | Sitemap só oferece conteúdo público | `audit-site.mjs` |
| INV-S7 | Ícones do manifest existem | `audit-site.mjs` |
| INV-S8 | Backups e templates não são publicados | `vite.config.js` + `audit-site.mjs` |
| INV-S9 | **Fundo escuro em toda página** — nenhuma superfície clara | `audit-site.mjs` |
| INV-S10 | Sem jargão de marketing; lexical lock respeitado | `audit-site.mjs` |
| INV-S11 | axe sem violações serious/critical | suítes Playwright |

---

## 5. Roadmap — o que ainda diverge

Ordenado por relação valor/risco. Cada item diz **por que não foi feito agora**.

### 5.1 `engenharia-confianca` fora do sistema AEO unificado · risco baixo, esforço médio

Única página pública com canonical e OG produzidos à mão (`scripts/gen-og-engenharia-confianca.mjs`)
em vez de derivados de `pages.mjs`. Funciona, mas é a exceção que impede afirmar
"o SSOT cobre o site".

**Como fazer:** escrever a entrada em `pages.mjs` com `tldr`, `faq`, `terms` e `og`,
rodar `build-aeo.mjs engenharia-confianca` e aposentar o gerador dedicado.
**Por que não agora:** a página tem suíte de 228 linhas com invariantes frágeis
(ver memória do projeto); merece um PR isolado onde a regressão seja atribuível.

### 5.2 Content-Security-Policy · risco alto, valor alto

Nenhuma página tem CSP. Para um site que vende governança, é uma contradição
performativa — e foi levantado como dívida D-T07 no plano agêntico.

**Por que não foi feito agora, honestamente:** uma CSP eficaz exige `nonce` por
requisição. O site é estático em S3/CloudFront e várias páginas usam script
inline (GTM, `tailwind.config`, JSON-LD) e CDNs de terceiros. Uma CSP com
`'unsafe-inline'` passaria a existir sem proteger — pior que não ter, porque
sugere uma garantia falsa.

**Caminho correto:** CloudFront Function injetando `nonce` por resposta +
migração dos scripts inline. É trabalho de infraestrutura, não de página.

### 5.3 Terceiros bloqueantes no `<head>` · risco médio, valor alto

Todas as páginas, exceto `apresentacao`, carregam Google Fonts e Font Awesome de
CDN no caminho crítico. `proposta.html` ainda carrega `cdn.tailwindcss.com`, que
compila CSS **no navegador**.

**Como fazer:** o padrão já está provado em `apresentacao` (2 requisições
bloqueantes, 15KB) — ícones em SVG inline e analítica fora do `<head>`.
Estender `scripts/perf-budget.mjs` para as demais páginas, com tetos por tier.

### 5.4 `life` e `life3d` invisíveis para busca · risco baixo, valor médio

12 e 66 palavras de texto. São experiências visuais por design, mas nenhum
buscador ou leitor de tela tem o que ler.

**Como fazer:** um resumo textual acessível da narrativa, no padrão de
equivalente textual já usado nos diagramas de `apresentacao`.

### 5.5 Promoção da v3.0 para `index.html` · risco alto

Decisão D-01 do plano agêntico, deliberadamente adiada. A home carrega GTM,
Consent Mode v2 (LGPD) e o `cv-renderer`. Push em `main` publica: a promoção
precisa de commit próprio e revisão visual humana.

### 5.6 Unificação de CSS · não recomendado

Ver §3.1. Registrado para que a pergunta não volte sem resposta.

---

## 6. Como adicionar uma página nova

O ritual completo, que a auditoria passou a cobrar:

1. Spec em `docs/specs/pages/<slug>/`, antes do código (SDD).
2. `src/<slug>.html` — o Vite descobre sozinho; um `<h1>`, skip link, `<main id="conteudo">`.
3. Tokens Dark Tech (`#0d1117` / `#161b22` / `#c9d1d9` / `#58a6ff`). Paleta própria
   exige ADR e exceção registrada, como em `ADR-ap-001`.
4. Entrada em `scripts/seo/pages.mjs` → `build-aeo.mjs` e `gen-og.mjs`.
5. Nó em `specs/ecosystem.nav.yaml` **e** `src/js/eco-nav.js`, com bump de versão.
6. Card em `src/catalogo.html`.
7. Suíte em `tests/<slug>.spec.js` com smoke, SEO e axe.
8. `npm run gate` verde.

Passos 4–6 são exatamente o que `audit-site.mjs` verifica: esquecer qualquer um
reprova o build.

---

## 7. Histórico

| Data | Mudança |
|---|---|
| 2026-07-23 | Documento criado. Página `apresentacao` (v3.0) entra como tier S; auditoria global no gate; `know` migrada para Dark Tech; sitemap e backups saneados. |
