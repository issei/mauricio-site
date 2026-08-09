# PROGRESS — O Artífice Invisível

> Estado de execução das specs `00_start.md` (v1) e `01_site_artifice.md` (v2).
> Página: `src/artifice.html` · Estilos: `src/artifice.css` · JS: `src/js/artifice/`.
> Stack real: **Vite 6** (root `src/`, build → `dist/`) + **Tailwind v4** + **Playwright/axe**.

## v1 — `00_start.md` (concluída)

- [x] **WU-01** Shell HTML + SEO + fontes (Newsreader/Inter/JetBrains Mono) + `<eco-nav>`
- [x] **WU-02** Hero & Manifesto com pull quote de Sennett e CTAs com rolagem suave
- [x] **WU-03** Accordion dos 5 Paradoxos + tabela das duas ontologias + marginália
- [x] **WU-04** Abas 37signals × GitLab + framework MCSR/ISOM/AEGW
- [x] **WU-05** Widget de autodiagnóstico (stepper de 4 perguntas, 3 índices, card dinâmico)
- [x] **WU-06** Acervo acadêmico com fetch de `public/data/artifice-references.json`
- [x] **WU-07** `tests/artifice.spec.js` + Quality Gate **VERDE**

Correções levantadas pelo próprio gate durante a v1:

- `artifice.html` entrou como **página órfã** (nenhum link apontava para ela) →
  card real inserido no Pilar 1 de `catalogo.html`.
- `meta description` tinha 166 chars (limite 160) → reduzida para 150.
- A releitura literal da spec pegou **Cal Newport ausente** da bibliografia: a WU-06
  lista 8 autores (Sennett, Dejours, Han, Berlant, Honneth, Bainbridge, **Newport**,
  Reilly) e o JSON tinha 7. Entrada de *Deep Work* (2016) adicionada, com tooltip
  correspondente no Paradoxo 4.

## v2 — `01_site_artifice.md` (concluída)

- [x] **WU-01** Semântica + WAI-ARIA + AEO
- [x] **WU-02** Manifesto reescrito sem datas
- [x] **WU-03** Hub multimídia (vídeo-síntese com timecodes)
- [x] **WU-04** Nuances de conteúdo nos paradoxos
- [x] **WU-05** Resultado do diagnóstico → Emancipação Positiva
- [x] **WU-06** Acervo, PROGRESS.md e Quality Gate

### O que mudou de fato na v2

| Área | Antes (v1) | Depois (v2) |
| :--- | :--- | :--- |
| Manifesto | "Em 2007, a promoção a desenvolvedor sênior…" | "Anos atrás, a promoção a sênior…" — **§2.1 proíbe datas** |
| Autoculpa | "…com a pergunta: 'Onde foi que eu errei?'" | Troca a pergunta: *"que estrutura eu venho aceitando como se fosse natural?"* |
| Vídeo | inexistente | Seção `#video` entre Hero e Paradoxos, com 4 marcadores de tempo |
| Paradoxo 2 | só o diagnóstico da falsa carreira em Y | + bloco distinguindo **politicagem** de **liderança de influência** (§2.4) |
| Paradoxo 5 | só o risco de *deskilling* | + bloco de **Maestria Aumentada** (IA como curadoria/arquitetura) (§2.3) |
| Over-engineering | não tratado | `<aside>` "Maestria responsável não é encastelamento" (§2.2) |
| Resultado do widget | "Antídoto recomendado" (3 itens) | "Caminhos de emancipação" (4 movimentos acionáveis) |
| JSON-LD | `Article` escrito à mão (7 campos) | `@graph` de 8 nós gerado pela SSOT |
| Painéis do accordion | `aria-expanded` no gatilho | + `role="region"` + `aria-labelledby` no painel |

## Decisões de arquitetura

### D1 — AEO pela SSOT do repositório, não JSON-LD à mão

A v2 pede "dados estruturados para consumo por LLMs". Em vez de estender o bloco
manual, a página foi **registrada em `scripts/seo/pages.mjs`** e passou a ser
gerada por `build-aeo.mjs` + `gen-og.mjs`, como as outras 19 páginas. Ganhos:

- `@graph` com 8 nós: `WebSite`, `Person`, `WebPage`, `Article` (8 `citation`,
  4 `teaches`), `BreadcrumbList`, `FAQPage` (7), `DefinedTermSet` (11 termos) e
  `VideoObject` (o vídeo da WU-03 vira dado estruturado, não só um iframe).
- Companion `public/artifice.md` para ingestão limpa por LLM + `og-artifice.png`.
- `tests/aeo.spec.js` **cresce sozinho**: a página entrou na suíte sem escrever teste.
- Some o aviso permanente `fora de scripts/seo/pages.mjs` da auditoria global.

Custo aceito: o injetor é dono do `<head>` (GA4, canonical, OG/Twitter, JSON-LD).
Um comentário no arquivo avisa que essa faixa não se edita à mão.

### D2 — Seek do vídeo por troca de `src`, não pela IFrame API do YouTube

Os marcadores recarregam o iframe com `?start=N&autoplay=1` em vez de carregar a
API JS do YouTube e chamar `seekTo`. Motivos: nenhum script de terceiro no caminho
crítico, nenhuma dependência nova (regra da governança fail-closed) e um seek
**determinístico e testável** — o teste afirma `start=81` para `01:21`. O
`autoplay` só entra a partir de clique do usuário, nunca no carregamento.
Domínio `youtube-nocookie.com` por privacidade.

### D3 — Assertiva de console escopada por origem

O smoke test exigia zero erros de console. Com um embed de terceiro e o gate
rodando **offline**, o iframe falha e loga por conta própria. O teste passou a
filtrar por origem (`youtube|ytimg|googletagmanager|google-analytics`): continua
pegando defeito nosso, sem quebrar por ruído que não controlamos.

### D4 — `<details>` como equivalente textual do vídeo

A spec pede `<details>` na semântica e "baixa carga cognitiva". Em vez de usá-lo
decorativamente, ele carrega o **resumo em texto dos 4 capítulos do vídeo**:
serve quem não pode/quer assistir (a11y), quem prefere ler, e LLMs — que não
extraem conteúdo de um iframe do YouTube.

## Aprendizados

- **Ler a spec ao pé da letra pega o que a memória não pega.** A ausência do
  Newport só apareceu relendo a lista literal da WU-06; eu havia inferido a
  bibliografia da outra spec da pasta, que não o cita formalmente.
- **O gate encontra o que o teste da página não vê.** Os 48 testes de
  `artifice.spec.js` estavam verdes enquanto a página era órfã no grafo do site —
  quem pegou foi `audit-site.mjs`, que olha as arestas entre páginas.
- **Contenção de recursos parece defeito.** Rodar o gate completo e o hook Stop ao
  mesmo tempo derrubou a suíte por disputa do dev server, não por regressão. Em
  isolamento, ambos passam. Vale rodar um gate de cada vez.

## Definition of Done — verificação final

- [x] Nenhuma data específica no manifesto (regex `\b(19|20)\d{2}\b` no `#hero`)
- [x] Vídeo posicionado entre Hero e Paradoxos, com os 4 timecodes funcionais
- [x] `role="region"` + `aria-labelledby` nos 5 painéis do accordion
- [x] JSON-LD com `VideoObject`, `DefinedTermSet` (11) e `citation` (8)
- [x] Axe sem violações serious/critical (3 navegadores, 2 estados da página)
- [x] Quality Gate **VERDE** (build · artefatos · auditoria · invariantes · E2E · perf)
