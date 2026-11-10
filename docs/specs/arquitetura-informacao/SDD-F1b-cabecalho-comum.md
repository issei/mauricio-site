---
id: SDD-F1b-cabecalho-comum
titulo: SDD da fase F1b — cabeçalho comum em todas as páginas públicas
data: 2026-11-10
leitor: Issei (decide DS-1 a DS-3); agente que vai implementar a F1b
padrao_de_redacao: PT-BR controlado (perfil técnico)
status: especificação — padrões DS-1 a DS-3 adotados até o autor dizer o contrário
---

# SDD da fase F1b — cabeçalho comum em todas as páginas públicas

> Origem: [`PROPOSTA-REESTRUTURACAO.md`](PROPOSTA-REESTRUTURACAO.md), decisão D6 (b), tomada pelo
> autor em 10/11/2026. Depende da F1 ([`SDD-F1-fonte-unica.md`](SDD-F1-fonte-unica.md)), que cria
> a seção `entradas` do YAML. Requisitos: **RF-F1b-xx**. Critérios de aceite: **CA-F1b-xx**.

## 1. Objetivo

Toda página pública passa a ter o mesmo cabeçalho, com quatro entradas: **Início · Trajetória ·
Produção · Vídeos**. O visitante que chega por busca a qualquer artigo tem sempre o mesmo caminho
para o autor e para o resto da produção (problema P3 da proposta).

## 2. Situação de partida (fatos, commit `791f623`)

Levantamento do primeiro `<nav>` e dos `<header>` de cada página pública:

| Grupo | Páginas | O que existe hoje |
| :-- | :-- | :-- |
| G-A Entradas e legais | `index`, `curriculo`, `catalogo`, `videos`, `temas/*`, `privacidade`, `termos`, `cookies`, `404` | cabeçalho próprio, com rótulos diferentes (ex.: home "Sobre · Experiência · Formação…", catálogo "Início · Sobre Mim · Experiência · Catálogo"); legais sem navegação |
| G-B Trilha própria | `acessibilidade`, `agent-ready`, `aprendizagem-autorregulada`, `aprendizagem-autorregulada-artigo`, `capacidade-antes-do-acesso`, `case-agents`, `curiosidade-e-investigacao`, `da-execucao-a-orquestracao`, `develop-engineering`, `digital-workplace-agentico`, `engenharia-agentes-ia`, `engenharia-confianca`, `especificacao-conversacional`, `formulacao-de-problemas` (14) | `<nav>` de trilha da página ("Seções do case", "Marcos do artigo"), em geral `position: fixed` ou `sticky` |
| G-C Barra de site própria | `artifice`, `devin`, `devops-salesforce`, `knowledge-os-presentation`, `proposta-observabilidade-mobile`, `salesforce-agentic-dev`, `salesforce-agentic-quickstart`, `socialselling`, `service-operations-2-0` (9) | barra superior fixa com links da página ou do site, escrita com Tailwind |
| G-D Sem navegação ou especiais | `know`, `sustentacao`, `proposta-engenharia-reversa`, `operacao-capital-cognitivo`, `boutique-empresarial-showcase`, `apresentacao` (paleta própria, ADR-ap-001), `life`, `life3d`, `terminal-evolutivo` (experiências imersivas), `lifeos` (em `public/`, fora do build do Vite) (10) | nada, ou navegação própria do experimento |

Também: `<eco-nav>` (botão flutuante) em 24 arquivos; `cookie-consent.js` em 39 páginas (não é
lugar para o cabeçalho: o cabeçalho não pode depender de JavaScript).

Fora do escopo: páginas não listadas (`proposta`, `entrevista-acessibilidade-streaming`) e
utilitárias (`admin`, `diagnostic` etc.). Elas não recebem o cabeçalho.

## 3. Decisões de desenho (padrões adotados)

| Id | Questão | Padrão adotado | Por quê |
| :-- | :-- | :-- | :-- |
| DS-1 | O cabeçalho fica fixo no topo ao rolar? | **Não.** É estático: aparece no topo e sai com a rolagem. | 23 páginas (G-B, G-C) já têm barra fixa ou trilha `sticky`. Dois elementos fixos empilhados tiram altura útil, sobretudo no celular, e criam sobreposição (WCAG 2.4.11, foco não encoberto). |
| DS-2 | O que acontece com o `<eco-nav>`? | **Sai** no último lote, quando todas as páginas tiverem o cabeçalho. O mapa dos pilares já está no catálogo. | Evita dois menus globais. |
| DS-3 | No celular, menu hambúrguer? | **Não.** Duas linhas: nome do autor em cima, as 4 entradas embaixo. | Quatro links curtos cabem em 320 px; hambúrguer exigiria JavaScript e um padrão interativo novo (A11Y-DECISIONS.md). |

O autor pode trocar qualquer padrão antes do lote em que ele vale.

## 4. Requisitos

### 4.1 Conteúdo e comportamento

- **RF-F1b-01.** O cabeçalho tem o nome "Maurício Yokoyama Issei" (link para `/`) e uma lista com
  as quatro entradas, nesta ordem: Início (`/`), Trajetória (`/curriculo`), Produção
  (`/catalogo`), Vídeos (`/videos.html`, absoluto: sem gêmeo `/en/` na fase 1 dos vídeos).
- **RF-F1b-02.** Rótulos e URLs vêm da seção `entradas` do YAML (SDD-F1, RF-F1-03). Nenhum rótulo é
  escrito no HTML à mão.
- **RF-F1b-03.** A entrada da área atual tem `aria-current="page"` na própria página de entrada e
  `aria-current="true"` nas páginas da área: páginas dos pilares → Produção; narrativas da
  trajetória → Trajetória; fichas de vídeo e temas → Vídeos.
- **RF-F1b-04.** Funciona sem JavaScript. O HTML é inserido no build pelo gerador (§4.3), não no
  navegador.
- **RF-F1b-05.** Fica depois do link "Pular para o conteúdo". Toda página do escopo tem esse link;
  a que não tem ganha um.

### 4.2 Semântica e acessibilidade

- **RF-F1b-06.** Marcação: `<header class="sh">` como filho direto de `<body>`, contendo
  `<nav aria-label="Navegação do site">` com uma `<ul>`. É o único landmark `banner` da página.
- **RF-F1b-07.** Cabeçalhos de hero que hoje são `<header>` filhos diretos de `<body>` viram
  `<div>` ou passam para dentro do `<main>`, para não haver dois `banner`. A mudança é feita na
  fonte de cada página (ou no gerador, quando a página é gerada).
- **RF-F1b-08.** Navegações próprias da página (trilhas, marcadores, sumários) continuam, com
  `aria-label` distinto de "Navegação do site".
- **RF-F1b-09.** Contraste mínimo de 4,5:1 nos links e 3:1 no indicador de foco, sobre `#0d1117`.
  Foco visível em todos os links: o cabeçalho entra em `tests/a11y/focus-visible.spec.js` e
  `tests/a11y/reflow-zoom.spec.js`.
- **RF-F1b-10.** Sem rolagem horizontal a 320 px; área de toque de pelo menos 24 × 24 px (WCAG
  2.5.8).

### 4.3 Implementação

- **RF-F1b-11.** Novo `scripts/gen-cabecalho.mjs`, no padrão de `gen-editorial.mjs`: insere o
  cabeçalho entre `<!-- SITE-HEADER:START -->` e `<!-- SITE-HEADER:END -->`, e o `<link>` do CSS
  entre `<!-- SITE-HEADER-CSS:START -->` e `<!-- SITE-HEADER-CSS:END -->` no `<head>`. Idempotente,
  com `--check` no `npm run gate`. Marcadores nunca são consumidos.
- **RF-F1b-12.** `scripts/gen-videos.mjs` e `scripts/gen-portfolio.mjs` emitem os mesmos marcadores
  nos HTML que geram, para o cabeçalho das fichas, dos temas, da home e do currículo sair do mesmo
  gerador.
- **RF-F1b-13.** Estilo em `public/site-header.css`, namespace `.sh-*`, só com os tokens Dark Tech.
  Na página `apresentacao`, o cabeçalho usa os mesmos tokens neutros; nenhum token `ap-` é usado
  fora dos arquivos da exceção.
- **RF-F1b-14.** `/en/`: o gêmeo é gerado pelo Argos a partir do português. O teste confere que os
  rótulos em inglês são exatamente "Home · Career · Work · Videos" [confirmar: rótulos]. Se o Argos
  traduzir de outro jeito, a correção vai para a fonte (ex.: marcar os rótulos conforme
  `knowledge/i18n-terminologia-argos.md`), nunca para `src/en/**`.

## 5. Lotes

Um PR por lote. Cada lote fecha com `i18n:sync` local e sweep de acessibilidade.

| Lote | Páginas | O que fazer além de inserir o cabeçalho | Risco |
| :-- | :-- | :-- | :-- |
| L1 | G-A (entradas e legais, incluindo as geradas) | trocar os cabeçalhos próprios; ajustar `gen-videos` e `gen-portfolio` (RF-F1b-12) | médio: home e currículo também mudam na F2/F3; fazer L1 depois da F2 evita retrabalho no currículo |
| L2 | G-B (14 com trilha própria) | conferir que a trilha fixa ou `sticky` não encobre o foco (DS-1) | médio |
| L3 | G-C (9 com barra de site própria) | retirar a barra própria; o que for navegação interna da página vira trilha (RF-F1b-08) | alto: muda o layout do topo |
| L4 | G-D (10 especiais) | `apresentacao` (tokens neutros), experiências imersivas (`life3d`, `terminal-evolutivo`: cabeçalho acima da área do experimento, sem sobrepor), `lifeos` em `public/` | alto |
| L5 | todas | retirar o `<eco-nav>` (DS-2): script, componente, `eco-nav.data.js`, `inject-eco-nav.mjs` e testes | baixo |

## 6. Testes

- `tests/site-header.spec.js` (novo), em todas as páginas do escopo, PT e EN: exatamente um
  `banner`; quatro links na ordem de RF-F1b-01; `aria-current` correto (RF-F1b-03); funciona com
  JavaScript desligado; sem rolagem horizontal a 320 px; link de pular conteúdo antes do cabeçalho.
- `tests/site-header.gen.test.mjs` (novo): `gen-cabecalho.mjs --check`; toda página pública do
  sitemap tem os marcadores; rótulos iguais aos do YAML.
- Sweep de acessibilidade (`npm run a11y:sweep`) por lote: a dívida de `tests/a11y/baseline.json`
  não sobe.
- Testes existentes que mudam: `index.spec.js`, `curriculo.spec.js`, `eco-nav.spec.js` (sai no L5),
  testes de página que conferem a barra superior própria (G-C).

## 7. Critérios de aceite

- **CA-F1b-01.** Depois do L4, todas as páginas públicas do sitemap (PT e EN) têm o cabeçalho, e
  nenhuma tem dois `banner`.
- **CA-F1b-02.** Nenhuma barra de site própria sobra (G-C), e as trilhas de página (G-B) continuam
  funcionando.
- **CA-F1b-03.** `npm run gate` verde em cada lote; baseline de acessibilidade igual ou menor.
- **CA-F1b-04.** Depois do L5, nenhuma página carrega `eco-nav.js`.
- **CA-F1b-05.** Nenhuma URL muda.

## 8. Documentos a atualizar no mesmo PR do L1

`A11Y-DECISIONS.md` (padrão do cabeçalho comum e DS-1/DS-3), `ECOSYSTEM.md` (seção `entradas`),
`docs/specs/STYLE_GUIDE.md` (componente `.sh-*`).
