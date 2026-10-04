# Portfólio "Dual-Faced": delta v1.2 sobre a SDD v1.1

**Base:** [`00_SDD_v1.1_original.html`](00_SDD_v1.1_original.html). Esse é o documento autoritativo, e só as diferenças abaixo prevalecem sobre ele.
**Status:** aprovado pelo Maurício em 2026-09-22.
**Páginas:** `src/index.html` (home nova) e `src/curriculo.html` (home anterior, preservada).

## 1. Decisões que alteram a v1.1

| # | SDD v1.1 | v1.2 | Por quê |
|---|---|---|---|
| D1 | Tema claro + escuro com toggle | **Só escuro.** Sem toggle, sem `prefers-color-scheme`. | `AGENTS.md` proíbe fundo claro. Decisão do Maurício. |
| D2 | Tailwind via CDN, arquivo único | Vite + CSS próprio (`src/index.css`, namespace `pf-`) | Stack do repositório. O CDN do Tailwind não é para produção. |
| D3 | i18n fora do escopo | `/en/index.html` gerado pelo `sync-i18n` (Argos, local) | O gêmeo `/en/` é obrigação do repositório. |
| D4 | JSON-LD num bloco próprio | `Person`, `ProfilePage` e `ItemList` de certificações saem do `scripts/seo/build-aeo.mjs` (`PERSON_PROFILE.knowsAbout` + `extraGraph`) | Um único `@graph` por página. `tests/aeo.spec.js` exige `WebSite` e `BreadcrumbList` nele. |
| D5 | `<title>` de ~100 caracteres | "Maurício Yokoyama Issei — Tech Lead \| Salesforce, AWS, APIs" (≤60) | Limite do checklist de SEO do repositório |
| D6 | Conteúdo "compilado" sem ferramenta definida | `scripts/gen-portfolio.mjs` grava o HTML entre marcadores. O `--check` roda no `npm run gate`. | Um HTML editado à mão divergiria do `cv.json` sem ninguém ver. |
| D7 | Home única | A home anterior vira `/curriculo`, com a mesma aparência e o conteúdo gravado no HTML (sem `fetch`) | Pedido do Maurício: não perder o que existe |
| D8 | Métrica de destaque parafraseada por projeto (tabela §9.3) | O card fechado mostra só o `Resultados[]` **literal** que contém número (`%`, `MM`, `k`, `D0`, `D2`). Sem número, não mostra nada. | A paráfrase seria texto que não existe no `cv.json` (regra "não inventar"). |
| D9 | "Disponibilidade" nos Quick Facts | Omitido | Não há esse dado nas fontes |

## 2. Conceito visual: "Mapa de Linhas"

A carreira é desenhada como um diagrama de metrô.

- **Linhas:** os 7 grupos de `Habilidades`, cada um com sigla própria.
- **Eixo:** anos de 2003 até o ano do build.
- **Estações de baldeação:** os empregadores, desenhados como cápsulas que atravessam as linhas das suas `Competencias`.
- **Estações simples:** os projetos STAR (pelas `Tecnologias`) e a pós-graduação.
- **Traçado:** cada linha é contínua da primeira estação até hoje. A competência continua em uso mesmo sem projeto que possa ser detalhado publicamente (decisão do Maurício, 2026-09-23, que substituiu o trecho tracejado da primeira versão). O ano da primeira estação dá o "desde AAAA" de cada grupo e substitui as faixas "+X anos" da §9.2.
- **Layout:** na horizontal a partir de 1024px. Abaixo disso, o mesmo DOM transpõe (anos na vertical), sem scroll horizontal.
- **Estações como link:** cada estação é um `<a>` para o grupo do ano em `#experience`. O rótulo acessível fica em texto real (`.pf-sr`), não em CSS `content`.
- **Legenda:** passar o mouse ou focar uma linha na legenda esmaece as outras via `:has()`, sem JS.
- **Animação:** uma animação por `animation-timeline: view()` desenha as linhas, dentro de `@supports` e desligada em `prefers-reduced-motion`.

**Única camada editorial:** a tabela `LINE_OF` em `scripts/gen-portfolio.mjs`, que diz qual termo de `Competencias`/`Tecnologias` pertence a qual linha. Termo sem linha **quebra o build**. ⚠ Revisar antes de publicar (§4).

## 3. Contrato de renderização (inalterado da v1.1 §4.1)

Zero `fetch`/XHR. Todo o texto fica no HTML estático. Cards STAR e Alura usam `<details>` nativo. Nenhuma frase é fatiada. Não há Shadow DOM no conteúdo do CV. O `<eco-nav>` usa Shadow DOM, mas é navegação do site, não conteúdo do CV. Os testes cobrem isso em `tests/index.spec.js` e `tests/index.nojs.spec.js`.

## 4. Pendências (v1.1 §12.4, atualizadas)

- `knowsLanguage`: continua fora.
- Avatar: `og:image` = `og-index.png` gerado. Não há foto no hero.
- Mapeamento `LINE_OF` e anos "desde": precisam de revisão humana.
