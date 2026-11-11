# 🌐 Maurício Yokoyama Issei: site pessoal e portfólio profissional

[![Deploy](https://img.shields.io/badge/deploy-AWS%20S3%20%2B%20CloudFront-orange)](https://mauricio.issei.com.br)
[![Vite](https://img.shields.io/badge/built%20with-Vite%206-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/styled%20with-Tailwind%20CSS%20v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/tested%20with-Playwright-2EAD33?logo=playwright)](https://playwright.dev/)
[![WCAG 2.2 AA](https://img.shields.io/badge/a11y-WCAG%202.2%20AA-blue)](docs/a11y/A11Y.md)

Este repositório contém o site pessoal e o portfólio profissional de Maurício Yokoyama Issei.
O site é uma aplicação de várias páginas (MPA, *Multi-Page Application*) feita com HTML, CSS e JavaScript nativos.
Cada página é um arquivo `.html` em `src/`. O Vite gera o build, e o GitHub Actions publica o build na AWS.

🔗 **Site em produção:** [https://mauricio.issei.com.br](https://mauricio.issei.com.br)

> [!IMPORTANT]
> **Todo merge na branch `main` publica o site em produção.** Não existe ambiente de homologação.
> Antes do merge, o quality gate do PR precisa estar verde.

---

## 📋 Índice

- [Visão geral](#-visão-geral)
- [Regras que não podem ser quebradas](#-regras-que-não-podem-ser-quebradas)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#️-arquitetura)
- [Tecnologias](#️-tecnologias)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Instalação e execução](#-instalação-e-execução)
- [Conteúdo gerado](#️-conteúdo-gerado)
- [Currículo (cv.json)](#-currículo-cvjson)
- [Versão em inglês (/en/)](#-versão-em-inglês-en)
- [Páginas dos vídeos do YouTube](#️-páginas-dos-vídeos-do-youtube)
- [Testes e quality gate](#-testes-e-quality-gate)
- [Acessibilidade](#-acessibilidade)
- [Privacidade, cookies e analytics](#-privacidade-cookies-e-analytics)
- [SEO, AEO e agentes de IA](#-seo-aeo-e-agentes-de-ia)
- [CI/CD e deploy](#-cicd-e-deploy)
- [Configuração e segredos](#-configuração-e-segredos)
- [Desenvolvimento guiado por especificação](#-desenvolvimento-guiado-por-especificação)
- [Trabalho com agentes de IA](#-trabalho-com-agentes-de-ia)
- [Padrões de código e de texto](#-padrões-de-código-e-de-texto)
- [Documentação de referência](#-documentação-de-referência)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 🎯 Visão geral

O site é a vitrine profissional de Maurício Issei. Ele reúne:

- **Portfólio e currículo.** A home (`/`) mostra o "Mapa de Linhas" de competências. A página `/curriculo` mostra o currículo completo.
- **Páginas de conteúdo.** São artigos, estudos de caso, propostas e páginas interativas, organizados em quatro pilares de navegação.
- **Páginas dos vídeos do canal do YouTube.** Cada vídeo tem uma ficha. Os assuntos têm páginas próprias.
- **Versão em inglês.** Cada página pública em português tem uma cópia traduzida em `/en/`.
- **Versão em Markdown.** Cada página pública tem um arquivo `.md` com o mesmo conteúdo, para leitura por agentes de IA.

Todo o texto das páginas está no HTML estático.
Nenhuma página depende de JavaScript para mostrar o conteúdo principal.
Assim, buscadores, leitores de currículo (ATS), agentes de IA e tradutores de navegador leem 100% do texto.

---

## 🚧 Regras que não podem ser quebradas

| Regra | Motivo | Onde está a regra |
| :-- | :-- | :-- |
| Merge na `main` publica em produção. | O `deploy.yml` roda a cada push na `main`. | [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) |
| Não edite `src/en/**` nem `public/en/**` à mão. | São gerados pelo tradutor e sobrescritos. Corrija o texto em português. | [`sync-i18n`](.claude/skills/sync-i18n/SKILL.md) |
| Depois de mudar uma página pública em português, sincronize o `/en/`. | O quality gate reprova um espelho desatualizado. | [Versão em inglês](#-versão-em-inglês-en) |
| Não edite à mão os blocos gerados (`PF:*`, `CV:*`, `EDITORIAL*`) nem `src/videos/` e `src/temas/`. | Os geradores reescrevem esses trechos. | [Conteúdo gerado](#️-conteúdo-gerado) |
| Não use fundo claro. A paleta é "Dark Tech". | É o padrão visual do site. | [`STYLE_GUIDE.md`](docs/specs/STYLE_GUIDE.md) |
| A dívida de acessibilidade só pode diminuir. | A catraca reprova qualquer aumento. | [`tests/a11y/baseline.json`](tests/a11y/baseline.json) |
| Nenhum script de analytics roda antes do aceite de cookies. | Exigência da LGPD. | [`LEGAL_PAGES.md`](docs/specs/pages/LEGAL_PAGES.md) |
| Não grave segredos no repositório. | O repositório é público. | [Configuração e segredos](#-configuração-e-segredos) |

---

## ✨ Funcionalidades

### Páginas

- **49 páginas-fonte** em `src/*.html`, mais as páginas geradas de vídeos (`src/videos/`) e de assuntos (`src/temas/`).
- **Hub do ecossistema** em [`src/catalogo.html`](src/catalogo.html), gerado por `scripts/gen-catalogo.mjs` a partir de [`specs/ecosystem.nav.yaml`](specs/ecosystem.nav.yaml). Ele liga as páginas pelos quatro pilares
  (Fundação → Engenharia de Confiança → Ecossistema Salesforce → Sustentação & Resiliência) e mostra o formato, a natureza e os temas de cada conteúdo.
- **Navegação entre páginas** pelo cabeçalho comum, gerado do mesmo YAML por [`scripts/gen-cabecalho.mjs`](scripts/gen-cabecalho.mjs). Regras em [`ECOSYSTEM.md`](ECOSYSTEM.md).
- **Páginas não listadas** (por exemplo `/proposta` e `/entrevista-acessibilidade-streaming`) levam `noindex` e ficam fora do sitemap.
- **Páginas legais:** `/privacidade`, `/cookies` e `/termos`.

### Design e experiência

- **Tema escuro** "Dark Tech": fundo `#0d1117`, acentos `#007bff` e `#8a2be2`, fonte Inter.
- **Layout responsivo** para celular, tablet e desktop.
- **Animações** com GSAP e Lenis, sempre com alternativa para `prefers-reduced-motion`.
- **Duas exceções registradas** à paleta: `/apresentacao` (namespace `.ap-*`) e as 7 cores das linhas da home (namespace `pf-`). Veja [`AGENTS.md`](AGENTS.md).

---

## 🏗️ Arquitetura

### Fluxo do conteúdo até a produção

```
Fontes                       Geradores (build time)             Saída
──────────────────────       ───────────────────────────        ──────────────────────
public/cv.json        ──►    scripts/gen-portfolio.mjs   ──►    src/index.html, src/curriculo.html
content/videos/*.md   ──►    scripts/gen-videos.mjs      ──►    src/videos/, src/temas/, src/videos.html
scripts/editorial/    ──►    scripts/gen-editorial.mjs   ──►    blocos EDITORIAL nas páginas
src/*.html, public/*.md ──►  scripts/sync-i18n.mjs (Argos) ──►  src/en/, public/en/
                                        │
                                        ▼
                             vite build  ──►  dist/  ──►  S3 + CloudFront
```

### Princípios

1. **Uma página, um arquivo.** O Vite descobre sozinho cada `.html` em `src/` (ver [`vite.config.js`](vite.config.js)).
2. **Conteúdo no HTML, não em `fetch`.** Os geradores gravam o conteúdo no HTML antes do build.
3. **Arquivo gerado tem dono.** Cada gerador tem o modo `--check`, e o quality gate reprova o arquivo que divergir da fonte.
4. **Uma CloudFront Function de *viewer-request*.** Ela normaliza as URLs, serve o `.md` quando o pedido traz `Accept: text/markdown` e cuida das rotas de descoberta. Código em [`infra/cloudfront-functions/viewer-request.js`](infra/cloudfront-functions/viewer-request.js).

Detalhes em [`docs/specs/ARCHITECTURE.md`](docs/specs/ARCHITECTURE.md).

---

## 🛠️ Tecnologias

| Área | Tecnologia |
| :-- | :-- |
| Páginas | HTML5 semântico, JavaScript ES6+ (módulos nativos), sem framework de SPA |
| Estilo | Tailwind CSS v4 (`@tailwindcss/vite`), CSS próprio por página, fonte Inter |
| Animação | GSAP, Lenis, SplitType |
| Build | Vite 6, `glob`, `vite-plugin-sitemap`, `sharp` (imagens), `yaml` |
| Tradução | Argos Translate (Python, roda na máquina local, sem API de LLM) |
| Testes | Playwright, `@axe-core/playwright`, `node:test` |
| CI/CD | GitHub Actions |
| Hospedagem | AWS S3 + CloudFront, com autenticação OIDC |
| Analytics | Google Tag Manager, Google Analytics 4 e Microsoft Clarity, todos sob Consent Mode v2 |

---

## 📂 Estrutura do projeto

```
mauricio-site/
├── .claude/                 # Configuração dos agentes: hooks, skills e subagentes
├── .github/workflows/       # deploy.yml, quality-gate.yml, videos-coleta.yml
├── content/                 # Fonte dos vídeos: videos/<id>.md, transcrições .vtt, temas.yml
├── docs/
│   ├── a11y/                # Protocolo de acessibilidade (A11Y.md) e guias por componente
│   ├── decisions/           # ADRs gerais
│   └── specs/               # Especificações: arquitetura, estilo, testes e uma pasta por página
├── infra/
│   ├── cloudfront-functions/  # Função de viewer-request e o evento de teste
│   └── scripts/             # Scripts .sh para o AWS CloudShell
├── knowledge/               # Memória do projeto no formato OKF v0.2
├── public/                  # Arquivos servidos sem processamento
│   ├── cv.json, star.json   # Dados do currículo
│   ├── *.md                 # Gêmeos Markdown das páginas
│   ├── llms.txt, llms-full.txt, cv-for-ai.md
│   ├── .well-known/         # Manifestos de descoberta (OAuth, agentes, MCP)
│   └── en/                  # GERADO: gêmeos .md em inglês
├── scripts/
│   ├── gen-*.mjs            # Geradores (portfólio, vídeos, editorial, hub, favicons…)
│   ├── i18n/                # Tradutor local (Python + Argos)
│   ├── videos/              # Coleta do YouTube (ingest.mjs) e autenticação (auth.mjs)
│   ├── seo/                 # pages.mjs (fonte de títulos e descrições), build-aeo.mjs
│   ├── quality-gate.mjs     # O gate local e do CI
│   └── a11y-*.mjs, perf-budget.mjs, audit-site.mjs, guard-*.mjs
├── specs/                   # ecosystem.nav.yaml e as specs do ecossistema de navegação
├── src/
│   ├── *.html, *.css        # Uma página por arquivo, com o CSS da página ao lado
│   ├── js/                  # Módulos JavaScript (por página e compartilhados)
│   ├── en/                  # GERADO: páginas em inglês
│   ├── videos/, temas/      # GERADO: páginas dos vídeos e dos assuntos
│   └── 404.html
├── tests/                   # Specs Playwright (*.spec.js) e invariantes node:test (*.test.mjs)
├── AGENTS.md                # Protocolo para agentes de IA (o CLAUDE.md importa este arquivo)
├── ECOSYSTEM.md             # Governança da navegação entre páginas
├── A11Y-DECISIONS.md, EXCEPTIONS.md, REPORT.md   # Registro de acessibilidade
├── local.bat, deploy.bat    # Atalhos para Windows
├── playwright.config.js
└── vite.config.js
```

---

## ⚡ Instalação e execução

### Pré-requisitos

- **Node.js 20** ou mais recente (o CI usa a versão 20).
- **npm** (vem com o Node.js).
- **Python 3**, só se você for gerar a versão em inglês. Veja [Versão em inglês](#-versão-em-inglês-en).

### Instalação

```bash
git clone https://github.com/issei/mauricio-site.git
cd mauricio-site
npm install
npx playwright install   # uma vez por máquina: baixa os navegadores dos testes
```

### Servidor de desenvolvimento

```bash
npm run dev
```

O site abre em **http://localhost:5173**. A porta é fixa (`--strictPort`).

No Windows, `local.bat` instala as dependências, roda o gerador do currículo e sobe o servidor.
`local.bat prod` gera o build de produção e abre o preview.

### Comandos

| Comando | O que faz |
| :-- | :-- |
| `npm run dev` | Sobe o servidor de desenvolvimento na porta 5173. |
| `npm run build` | Gera o build em `dist/`. Antes, roda `i18n:sync` em modo `--soft`. |
| `npm run preview` | Serve o `dist/` localmente. |
| `npm run gate` | Roda o quality gate. Veja [Testes e quality gate](#-testes-e-quality-gate). |
| `npm test` | Roda o Playwright inteiro. |
| `npm run test:unit` | Roda os testes `node:test` do EAI e da CloudFront Function. |
| `npm run a11y:sweep` | Roda a varredura de acessibilidade contra o build. |
| `npm run a11y:update` | Atualiza o baseline da catraca. Use só quando a dívida diminuir. |
| `npm run a11y:static` | Roda o gate estático de acessibilidade. |
| `npm run i18n:sync` | Traduz para `/en/` o que mudou em português. |
| `npm run i18n:sync:all` | Traduz tudo de novo, sem usar o manifesto. |
| `npm run i18n:check` | Só confere. Sai com erro se algum espelho estiver desatualizado. |
| `npm run i18n:install` | Baixa o modelo de tradução pt→en (cerca de 100 MB). |
| `npm run videos:auth` | Gera o *refresh token* do YouTube. Rode uma vez, na máquina local. |
| `npm run videos:ingest` | Coleta os dados do canal para `content/videos/`. |
| `npm run videos:gen` | Gera as páginas dos vídeos e dos assuntos. |

---

## ⚙️ Conteúdo gerado

Alguns arquivos não são escritos à mão. Para mudar o conteúdo deles, edite a fonte e rode o gerador.

| Gerador | Fonte | Saída |
| :-- | :-- | :-- |
| `scripts/gen-portfolio.mjs` | `public/cv.json` (e `public/star.json` para conferência) | Bloco `PF:*` em `src/index.html`, blocos `CV:*` em `src/curriculo.html`, `public/curriculo.md` |
| `scripts/gen-videos.mjs` | `content/videos/*.md`, `content/temas.yml` | `src/videos/`, `src/temas/`, `src/videos.html`, `public/videos/`, `public/temas/`, `scripts/videos/sitemap-exclude.json` |
| `scripts/gen-editorial.mjs` | `scripts/editorial/editorial.data.mjs` | Blocos `EDITORIAL` e `EDITORIAL-NEXT` nas páginas |
| `scripts/gen-hub-data.mjs` | `scripts/seo/pages.mjs` e o texto das páginas | `src/js/apresentacao/hub-data.js` |
| `scripts/gen-hero-counter.mjs` | Árvore de especificações em `docs/specs/` | Contador do hero de `src/apresentacao.html` |
| `scripts/optimize-critical-path.mjs` | Páginas em `src/` | Fontes e ícones de terceiros fora do caminho crítico de renderização |
| `scripts/sync-i18n.mjs` | Ativos públicos em português | `src/en/`, `public/en/` |
| `scripts/gen-cabecalho.mjs` | `entradas` de `specs/ecosystem.nav.yaml` | Cabeçalho comum entre os marcadores `SITE-HEADER` de cada página |

Todos os geradores aceitam `--check`. Com essa opção, o gerador não escreve nada e sai com erro se a saída estiver desatualizada.
O quality gate roda o `--check` de cada gerador.

---

## 📄 Currículo (cv.json)

### Como funciona

1. A fonte do currículo é [`public/cv.json`](public/cv.json).
2. O `scripts/gen-portfolio.mjs` grava o conteúdo como HTML estático em `src/index.html` e `src/curriculo.html`.
3. Nenhuma página busca o JSON quando abre. Por isso, **mudar o currículo exige build e deploy**.

O `public/cv.json` também é publicado e é lido por agentes de IA.

### Estrutura do cv.json

As chaves de primeiro nível são:

```json
{
  "Nome": "…",
  "Titulo": "…",
  "ResumoHero": "…",
  "Contato": { "…": "…" },
  "Resumo": ["…"],
  "Habilidades": { "…": ["…"] },
  "Formacao_Academica": [],
  "Certificados": [],
  "Experiencia": [],
  "Projetos": [],
  "Recomendacoes_Recebidas": [],
  "Cursos_Alura": {}
}
```

Cada item de `Projetos` segue o método STAR (Situação, Tarefa, Ação, Resultado).
Especificação: [`docs/specs/CV_SYSTEM.md`](docs/specs/CV_SYSTEM.md) e [`docs/specs/pages/portfolio/`](docs/specs/pages/portfolio/).

### Como atualizar o currículo

1. Edite `public/cv.json`.
2. Rode `node scripts/gen-portfolio.mjs`.
3. Rode `npm run i18n:sync`, porque o `cv.json` também tem gêmeo em inglês.
4. Rode `npm run gate`.
5. Abra um PR. O merge publica a mudança.

> [!NOTE]
> O gerador falha quando um termo de `Habilidades` não tem linha no mapa da home (`LINE_OF`, dentro do gerador).
> Essa falha é proposital: ela impede que um dado suma do mapa sem aviso.

---

## 🌍 Versão em inglês (/en/)

O site publica duas línguas a partir de uma fonte só:

- **Português (PT-BR)** na raiz. É a fonte.
- **Inglês** em `/en/`. É **gerado** pelo Argos Translate.

A tradução roda na máquina local, sem chamada a API de LLM e sem custo de token.
Não use um LLM para traduzir as páginas.

### Arquivos que têm gêmeo em inglês

`src/*.html`, `public/*.md`, `public/cv.json`, `public/star.json`, `public/llms.txt`, `public/llms-full.txt` e `public/cv-for-ai.md`.
Depois de editar qualquer um deles, rode a sincronização.

### Instalação do tradutor (uma vez por máquina)

```bash
python3 -m venv .venv-i18n
. .venv-i18n/bin/activate            # Windows: .venv-i18n\Scripts\activate
pip install -r scripts/i18n/requirements.txt
npm run i18n:install
```

O ambiente Python ocupa cerca de 6 GB, por causa do `torch`.
Ele é ferramenta de build e não entra no site.

### Uso

```bash
npm run i18n:sync     # traduz o que mudou
npm run i18n:check    # confere sem escrever
```

> [!WARNING]
> O modelo de tradução é baixado de `data.argosopentech.com`.
> Os ambientes de nuvem dos agentes bloqueiam esse host. Nesses ambientes, `i18n:sync` não traduz.
> Rode a sincronização na máquina local e faça commit do resultado.

Sem o Argos instalado, `npm run build` avisa e usa os espelhos que já estão no repositório.
O quality gate, porém, reprova um espelho desatualizado.

Detalhes: [`scripts/i18n/README.md`](scripts/i18n/README.md), [`docs/specs/pages/SDD-i18n-en.md`](docs/specs/pages/SDD-i18n-en.md) e a terminologia em [`docs/I18N_TERMINOLOGIA_ARGOS.md`](docs/I18N_TERMINOLOGIA_ARGOS.md).

---

## ▶️ Páginas dos vídeos do YouTube

Cada vídeo do canal [@MauricioIssei](https://youtube.com/@MauricioIssei) tem uma página gerada.

### Fluxo

1. O workflow [`videos-coleta.yml`](.github/workflows/videos-coleta.yml) roda todo dia às 06:00 (horário de Brasília).
2. Ele roda `scripts/videos/ingest.mjs` e grava os dados em `content/videos/<id>.md` e as legendas em `content/videos/<id>.transcricao.vtt`.
3. Ele roda o gerador e abre (ou atualiza) um PR a partir da branch `videos/coleta`.
4. O PR só vai ao ar depois do merge na `main`.

A cota da API do YouTube permite baixar cerca de 35 legendas por dia. Cada execução continua de onde a anterior parou.

### Status de um vídeo

| Status | O que aparece no site |
| :-- | :-- |
| `ficha` | Ficha do vídeo, com `noindex` e fora do sitemap. |
| `rascunho` | Ainda a ficha. O artigo existe no arquivo, mas não é publicado. |
| `publicado` | O artigo completo. O build falha se o artigo não cumprir as regras de publicação. |

As regras de publicação exigem: âncora de minuto em todo parágrafo, conferida contra a transcrição; fontes verificadas; e revisão humana registrada.
A skill [`video-artigo`](.claude/skills/video-artigo/SKILL.md) escreve os rascunhos. Só uma pessoa muda o status para `publicado`.

Os assuntos ficam em [`content/temas.yml`](content/temas.yml).
Especificação: [`docs/specs/pages/videos-youtube/`](docs/specs/pages/videos-youtube/).

---

## ✅ Testes e quality gate

### Quality gate

O quality gate ([`scripts/quality-gate.mjs`](scripts/quality-gate.mjs)) roda as etapas em paralelo.
A primeira etapa que falha interrompe as outras, e o gate sai com erro.

As etapas são:

1. Build (`vite build`).
2. Gêmeos `.md` de toda URL do sitemap.
3. Artefatos gerados em dia (`--check` de cada gerador).
4. Espelhos `/en/` em dia.
5. Coerência global do site: links, páginas órfãs e fontes de verdade (`audit-site.mjs --strict`).
6. Invariantes `node:test` (`tests/*.test.mjs`).
7. Playwright com axe.
8. Varredura de acessibilidade WCAG 2.2 com catraca.
9. Gate estático de acessibilidade.
10. Orçamento de performance.

```bash
npm run gate                                  # local: só as páginas alteradas em relação a origin/main
npm run gate -- --full                        # suíte inteira, 5 projetos do Playwright
npm run gate -- --no-build                    # sem build e sem as etapas que leem dist/
npm run gate -- --paginas devin,index         # força o escopo nessas páginas
npm run gate -- --grep "EAI" --project chromium
```

No modo local por impacto, o gate imprime a lista do que **não** rodou.
No CI, o gate roda sempre a suíte inteira.

### Playwright

O [`playwright.config.js`](playwright.config.js) tem 5 projetos: `chromium`, `firefox`, `webkit`, `mobile` e `no-js`.
O projeto `no-js` confere que o conteúdo aparece sem JavaScript.

```bash
npx playwright test                            # tudo
npx playwright test tests/index.spec.js        # um arquivo
npx playwright test --project=chromium         # um projeto
npx playwright test --ui                       # modo interativo
npx playwright show-report                     # relatório
```

O Playwright sobe o servidor de desenvolvimento sozinho.
Para usar outra porta, defina `PW_PORTA`. Para testar contra o build, defina `PW_SERVIDOR=preview`.

Toda página nova precisa de um teste em `tests/<pagina>.spec.js`.
Guia completo: [`docs/specs/TESTING_GUIDE.md`](docs/specs/TESTING_GUIDE.md). Paralelismo e shards: [`docs/specs/QUALITY_GATE_PARALELO.md`](docs/specs/QUALITY_GATE_PARALELO.md).

---

## ♿ Acessibilidade

O site segue a **WCAG 2.2 nível AA**, no perfil Standard.

- **Protocolo:** [`docs/a11y/A11Y.md`](docs/a11y/A11Y.md). Para cada componente, há um guia em [`docs/a11y/references/`](docs/a11y/references/).
- **Decisões de padrões interativos:** [`A11Y-DECISIONS.md`](A11Y-DECISIONS.md). Consulte antes de criar um padrão novo.
- **Exceções aceitas:** [`EXCEPTIONS.md`](EXCEPTIONS.md). Consulte antes de "corrigir" uma página listada lá.
- **Relatório de verificação:** [`REPORT.md`](REPORT.md).
- **Catraca:** [`tests/a11y/baseline.json`](tests/a11y/baseline.json) registra a dívida atual. O gate reprova qualquer aumento.
- **Plano e auditorias:** [`docs/specs/a11y-first/`](docs/specs/a11y-first/).

Os testes automáticos não substituem o teste com leitor de tela, que continua manual.

---

## 🍪 Privacidade, cookies e analytics

- O **Google Consent Mode v2** começa com tudo negado (`analytics_storage: 'denied'`), num script inline que roda **antes** do Google Tag Manager.
- O banner de cookies ([`src/js/cookie-consent.js`](src/js/cookie-consent.js)) libera as categorias só depois do aceite.
- O **Google Analytics 4** e o **Microsoft Clarity** são carregados por tags do GTM e respeitam o consentimento.
- O teste [`tests/consent.antes-do-aceite.spec.js`](tests/consent.antes-do-aceite.spec.js) confere que nada é gravado antes do aceite.
- A página `404.html` não mostra o banner de cookies. A página `/entrevista-acessibilidade-streaming` não tem analytics.

Especificação: [`docs/specs/pages/LEGAL_PAGES.md`](docs/specs/pages/LEGAL_PAGES.md) e [`docs/specs/SEO_ANALYTICS.md`](docs/specs/SEO_ANALYTICS.md).

---

## 🔎 SEO, AEO e agentes de IA

### SEO

Toda página pública precisa de título, meta description, tags Open Graph, link canônico e `hreflang`.
A fonte de títulos e descrições é [`scripts/seo/pages.mjs`](scripts/seo/pages.mjs).
O `vite-plugin-sitemap` gera o `sitemap.xml`, sem as páginas `noindex`.

### AEO (otimização para mecanismos de resposta)

- Cada página tem um gêmeo `.md` em `public/`. A CloudFront Function serve esse arquivo quando o pedido traz `Accept: text/markdown`.
- `public/llms.txt`, `public/llms-full.txt` e `public/cv-for-ai.md` resumem o site para modelos de linguagem.
- O `scripts/seo/build-aeo.mjs` gera os dados estruturados (JSON-LD).

### Descoberta por agentes

- `public/.well-known/` publica os manifestos de descoberta: OAuth (RFC 8414 e RFC 9728), catálogo de API (RFC 9727), catálogo de agentes e MCP.
- Toda página registra ferramentas WebMCP em `navigator.modelContext` (`public/webmcp.js`, injetado no build).

Especificação: [`docs/AGENT_READINESS.md`](docs/AGENT_READINESS.md) e [`docs/specs/AGENT_READINESS_POR_PAGINA.md`](docs/specs/AGENT_READINESS_POR_PAGINA.md).

---

## 🚀 CI/CD e deploy

O repositório tem três workflows.

### `quality-gate.yml`: regressão

Não publica nada. Roda:

- em todo PR para a `main`, na camada **fast**: `chromium`, `mobile` e `no-js`;
- em todo push na `main`, todo dia às 03:00 (horário de Brasília) e por disparo manual, na camada **full**: a camada fast mais `firefox` e `webkit`.

Um job estático (build, geradores, i18n, `node:test`, acessibilidade e performance) roda em paralelo com o Playwright dividido em shards por navegador.
O check único **Quality Gate** só fica verde quando todos os jobs passam. A proteção da branch usa esse check.

### `deploy.yml`: publicação

Roda a cada push na `main`, no ambiente `production` do GitHub. As etapas são:

1. Instala as dependências e roda `npm run build`.
2. Autentica na AWS por OIDC, sem chave fixa.
3. Testa a CloudFront Function antes do envio.
4. Sincroniza `dist/` com o bucket S3 (`aws s3 sync --delete`). A pasta `static/`, mantida à mão, fica de fora.
5. Corrige o `Content-Type` dos manifestos `.well-known` sem extensão.
6. Publica a CloudFront Function de *viewer-request*: testa no estágio DEVELOPMENT e promove para LIVE.
7. Invalida o cache do CloudFront (`/*`).

### `videos-coleta.yml`: coleta do canal

Roda todo dia às 06:00 (horário de Brasília) e abre o PR da coleta. Veja [Páginas dos vídeos do YouTube](#️-páginas-dos-vídeos-do-youtube).

### Mudanças na AWS

Toda mudança em S3, CloudFront ou IAM segue estes passos:

1. Atualize a especificação em `docs/specs/` (por exemplo [`CICD_OIDC.md`](docs/specs/CICD_OIDC.md)).
2. Escreva um script `.sh` que rode no AWS CloudShell, em [`infra/scripts/`](infra/scripts/).
3. Declare o `Content-Type` quando o script envia arquivos.
4. Escreva a lista de conferência no Console da AWS.

O `deploy.bat` faz um deploy manual a partir do Windows. Ele exige a variável `DISTRIBUTION_ID`. O caminho normal de publicação é o merge na `main`.

---

## 🔐 Configuração e segredos

O repositório é **público**. Nenhum segredo, ID de conta AWS ou ARN pode entrar nele.

### Segredos do GitHub (Settings → Secrets and variables → Actions)

| Nome | Usado por | Conteúdo |
| :-- | :-- | :-- |
| `AWS_ROLE_ARN` | `deploy.yml` | ARN da role IAM assumida por OIDC |
| `AWS_REGION` | `deploy.yml` | Região AWS |
| `S3_BUCKET_NAME` | `deploy.yml` | Nome do bucket |
| `CLOUDFRONT_DISTRIBUTION_ID` | `deploy.yml` | ID da distribuição |
| `YOUTUBE_API_KEY` | `videos-coleta.yml` | Chave da YouTube Data API |
| `YOUTUBE_OAUTH_CLIENT_ID`, `YOUTUBE_OAUTH_CLIENT_SECRET`, `YOUTUBE_OAUTH_REFRESH_TOKEN` | `videos-coleta.yml` | Credenciais OAuth para baixar as legendas |
| `YOUTUBE_CHANNEL_ID` (variável) | `videos-coleta.yml` | ID público do canal |

As permissões da role IAM estão em [`docs/specs/CICD_OIDC.md`](docs/specs/CICD_OIDC.md).

### Arquivos locais

- `.env.local` guarda as credenciais do YouTube para rodar a coleta na máquina local. O `.gitignore` ignora os arquivos `*.local`.

---

## 📐 Desenvolvimento guiado por especificação

Este repositório segue o desenvolvimento guiado por especificação (SDD, *Spec-Driven Development*).

1. Antes de implementar uma página ou funcionalidade, escreva a especificação. Use o modelo [`docs/specs/PAGE_SPEC_TEMPLATE.md`](docs/specs/PAGE_SPEC_TEMPLATE.md).
2. Guarde a especificação em `docs/specs/pages/<pagina>/`.
3. Confira a especificação contra [`STYLE_GUIDE.md`](docs/specs/STYLE_GUIDE.md) e [`ARCHITECTURE.md`](docs/specs/ARCHITECTURE.md).
4. Se o requisito mudar, atualize a especificação **antes** do código.

Índice das especificações: [`docs/specs/000-INDEX.md`](docs/specs/000-INDEX.md).

### Criar uma página nova

1. Use [`src/service-operations-2-0.html`](src/service-operations-2-0.html) ou [`src/devops-salesforce.html`](src/devops-salesforce.html) como referência de estrutura.
2. Crie `src/<pagina>.html`. O Vite descobre o arquivo sozinho.
3. Aplique o checklist de SEO: título, meta description, Open Graph, canônico.
4. Crie o gêmeo `public/<pagina>.md`.
5. Crie o teste `tests/<pagina>.spec.js`, com axe.
6. Acrescente a página em `specs/ecosystem.nav.yaml` (pilar, formato, natureza, temas e texto do cartão) e rode `node scripts/gen-catalogo.mjs`. O catálogo não se edita à mão.
7. Rode `npm run i18n:sync` e `npm run gate`.

A skill [`new-page`](.claude/skills/new-page/SKILL.md) faz esses passos.

---

## 🤖 Trabalho com agentes de IA

O protocolo para agentes está em [`AGENTS.md`](AGENTS.md). O `CLAUDE.md` só importa esse arquivo.

### Skills (`.claude/skills/`)

| Skill | Uso |
| :-- | :-- |
| `mauricio-site-patterns` | Convenções, design system e fluxos. Leia antes de qualquer tarefa grande. |
| `new-page` | Criar uma página nova. |
| `ship-page` | Conferência antes do push para a `main`. |
| `sync-i18n` | Sincronizar o `/en/` depois de editar uma página em português. |
| `video-artigo` | Escrever o rascunho do artigo de um vídeo. |
| `build-eai-section`, `run-quality-gate` | Seções e gate da página `engenharia-agentes-ia`. |

### Hooks (`.claude/settings.json`)

- **Antes de editar** (`guard-protected-files.mjs`): bloqueia a edição de `package-lock.json`, `dist/` e `.env*`.
- **Depois de editar** (`guard-ap-tokens.mjs`): bloqueia cor hexadecimal fora de `src/apresentacao.css`.
- **Ao encerrar** (`stop-gate.mjs`): roda o gate por impacto quando há mudança não commitada em `src/`.

### Subagentes (`.claude/agents/`)

`a11y-design-reviewer`, `tone-reviewer`, `fde-case-writer`, `fde-evidence-auditor` e `fde-mechanic`.

### Memória do projeto

A pasta [`knowledge/`](knowledge/) é a memória do projeto no formato OKF v0.2.
Use `okf search "<termo>"` antes de criar um conceito novo e `make validate` para conferir o pacote.

---

## 🧭 Padrões de código e de texto

### Código

- **JavaScript:** módulos ES6+, `async`/`await`, com comentários que explicam o motivo da decisão.
- **CSS:** utilitários do Tailwind primeiro. CSS próprio fica no arquivo da página (`src/<pagina>.css`).
- **HTML:** semântico, com rótulos acessíveis.
- **Cores:** só os tokens do design system. Nenhuma cor hexadecimal solta.
- **Commits:** Conventional Commits (`feat`, `fix`, `docs`, `content`, `test`, `ci`…).

### Texto das páginas

Os textos em português seguem o padrão **PT-BR controlado**: linguagem simples, frases diretas, um termo para cada conceito e afirmações verificáveis.
O padrão se baseia na ABNT NBR ISO 24495-1 e no ASD-STE100 adaptado ao português.

### Fluxo de trabalho

1. Crie uma branch a partir da `main`.
2. Faça as mudanças e rode `npm run gate`.
3. Abra um PR para a `main`. O quality gate roda na camada fast.
4. O merge publica o site.

---

## 📚 Documentação de referência

| Assunto | Documento |
| :-- | :-- |
| Índice das especificações | [`docs/specs/000-INDEX.md`](docs/specs/000-INDEX.md) |
| Arquitetura | [`docs/specs/ARCHITECTURE.md`](docs/specs/ARCHITECTURE.md) |
| Guia de estilo | [`docs/specs/STYLE_GUIDE.md`](docs/specs/STYLE_GUIDE.md) |
| Testes | [`docs/specs/TESTING_GUIDE.md`](docs/specs/TESTING_GUIDE.md) |
| Quality gate em paralelo | [`docs/specs/QUALITY_GATE_PARALELO.md`](docs/specs/QUALITY_GATE_PARALELO.md) |
| CI/CD com OIDC | [`docs/specs/CICD_OIDC.md`](docs/specs/CICD_OIDC.md) |
| SEO e analytics | [`docs/specs/SEO_ANALYTICS.md`](docs/specs/SEO_ANALYTICS.md) |
| Ativos (imagens, áudio, PDF) | [`docs/specs/ASSETS_GUIDE.md`](docs/specs/ASSETS_GUIDE.md) |
| Páginas legais e consentimento | [`docs/specs/pages/LEGAL_PAGES.md`](docs/specs/pages/LEGAL_PAGES.md) |
| Versão em inglês | [`docs/specs/pages/SDD-i18n-en.md`](docs/specs/pages/SDD-i18n-en.md) |
| Navegação entre páginas | [`ECOSYSTEM.md`](ECOSYSTEM.md), [`specs/SPEC_ECOSYSTEM.md`](specs/SPEC_ECOSYSTEM.md) |
| Prontidão para agentes | [`docs/AGENT_READINESS.md`](docs/AGENT_READINESS.md) |
| Migração de ativos grandes para o S3 | [`docs/s3-migration/`](docs/s3-migration/) |
| Acessibilidade | [`docs/a11y/A11Y.md`](docs/a11y/A11Y.md) |

---

## 📄 Licença

Este projeto pertence a **Maurício Yokoyama Issei**. Todos os direitos reservados.

O código-fonte está disponível para fins educacionais e de portfólio.
Para uso comercial ou redistribuição, entre em contato.

---

## 📧 Contato

**Maurício Yokoyama Issei**

- 🌐 Site: [mauricio.issei.com.br](https://mauricio.issei.com.br)
- 💼 LinkedIn: [linkedin.com/in/mauricioissei](https://linkedin.com/in/mauricioissei)
- 📺 YouTube: [@MauricioIssei](https://youtube.com/@MauricioIssei)
