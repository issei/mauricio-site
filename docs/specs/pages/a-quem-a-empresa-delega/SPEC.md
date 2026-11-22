---
id: SPEC-dl-001
titulo: Página "A quem a empresa delega quando delega à IA?"
data: 2026-11-22
leitor: quem implementa ou revisa a página
padrao_de_redacao: PT-BR controlado (perfil Técnico)
---

# Página "A quem a empresa delega quando delega à IA?"

## 1. Informações básicas

- **Arquivo:** `src/a-quem-a-empresa-delega.html` (CSS `src/a-quem-a-empresa-delega.css`, JS `src/js/a-quem-a-empresa-delega.js`). Prefixo de namespace: `.dl-`.
- **URL:** `https://mauricio.issei.com.br/a-quem-a-empresa-delega`
- **Fonte do texto:** `content/artigos/a-quem-a-empresa-delega.md`, o artigo do Issei com data de corte 21/11/2026. A página reproduz esse texto sem alteração de conteúdo.
- **Catálogo:** nó `a-quem-a-empresa-delega` em `specs/ecosystem.nav.yaml`, pilar p2, `kind: "Artigo"`, `natureza: estudo`, temas `engenharia-agentica` e `gestao-e-estrategia`. Pedido do Issei em 2026-11-22: "Esse artigo quero que entre em conteúdos".
- **Vídeo:** `udq7xxWzql0` ("O Guia de Sobrevivência para Agentes Autônomos"). O vídeo é sobre o artigo, e não o contrário (Issei, 2026-11-22). A página do vídeo aponta para esta página.
- **SEO:** entrada em `scripts/seo/pages.mjs` (`ScholarlyArticle`, `hasMd: true`). O gêmeo `.md` sai do mesmo arquivo de conteúdo, por `mdSections`.

## 2. Estrutura

A página tem duas camadas. A primeira traduz o artigo para quem não tem formação jurídica ou técnica. A segunda é o artigo completo.

1. **Hero.** H1 com o título do artigo, subtítulo, rótulo de natureza, data de corte e dois botões: "Ler o artigo completo" (`#artigo`) e "Assistir ao vídeo" (página do vídeo).
2. **Camada didática** (`#em-5-minutos`), com o texto final de `/mnt/project-files/delegacao-ia/landing-page-wireframe-e-texto.md`:
   - `#caso`: o caso PocketOS em 3 quadros e o card "Como terminou" (os dados foram recuperados; sem esse card a página afirmaria perda total, o que o artigo não sustenta).
   - `#mito`: capacidade vs. autoridade, em dois cards e uma conclusão.
   - `#perguntas`: as 5 perguntas em `<details>`/`<summary>`, cada uma com um grupo de rádio Sim · Não sei · Não. O resultado aparece numa região `aria-live="polite"`. Regra não compensatória: qualquer "Não" ou "Não sei" leva a "Pare aqui". Não há pontuação nem gráfico de radar. Nada é gravado nem enviado.
   - `#moral`: "Você pode automatizar tarefas. Não pode automatizar a responsabilidade", em três cards.
3. **Artigo completo** (`#artigo`): sumário e texto integral, com tabelas e referências.
4. **AEO** (TL;DR e FAQ) e **continuação**, gerados.

## 3. Requisitos

- RF-dl-01: a camada didática não usa jargão (endpoint, token, API, GraphQL, staging, nexo causal, responsabilidade objetiva, framework).
- RF-dl-02: o checklist funciona por teclado e por leitor de tela; sem JavaScript, os cards abrem e as perguntas continuam legíveis.
- RF-dl-03: o resultado do checklist nunca é uma soma: basta um "Não" ou "Não sei" para o resultado ser "Pare aqui".
- RF-dl-04: o artigo completo preserva o texto da fonte, incluindo qualificadores e a marcação de fato, declaração e interpretação.
- RF-dl-05: tema Dark Tech (fundo `#0d1117`, Inter, gradiente `#007bff` → `#8a2be2`); animações só com `prefers-reduced-motion: no-preference`.

## 4. Teste

`tests/a-quem-a-empresa-delega.spec.js`: carrega, um H1, canonical, os 3 quadros, as 5 perguntas, a regra não compensatória do checklist, o artigo completo com as 8 seções e a varredura axe.

## 5. Fora do escopo

- Ilustrações (robô com crachá, balança). Ficam como ícones de texto até haver arte própria.
- Espelho `/en/`: sai do `npm run i18n:sync` no notebook do Issei.
