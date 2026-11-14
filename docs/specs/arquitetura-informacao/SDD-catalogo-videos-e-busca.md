# SDD — Catálogo de vídeos em prateleiras e busca no cabeçalho

> **Status:** decidido e implementado (2026-11-14). **Data:** 2026-11-14.
> **Decisões (Issei, 2026-11-14):** D1 = índice próprio. D2, D3 e D4 ficaram nos padrões recomendados do §9.
> **Desvios da implementação:** os 5 PRs viraram um PR só (a sessão tem uma branch); a busca usa `<h3>` nos grupos
> (o `<h2>` é o título do diálogo); o botão é link até o JS carregar; `/busca` não foca o campo na carga
> (`A11Y-DECISIONS.md`); o índice EN sai dos espelhos `/en/` já traduzidos, sem tradução por LLM.
> **Pedido:** "reestruturar o layout e a navegação do catálogo de vídeos para ser parecido com os
> catálogos de streaming, e avaliar uma busca de conteúdo dentro do menu" (Issei, 2026-11-14).
> **Depende de:** [SDD-fase-1](../pages/videos-youtube/SDD-fase-1.md) e [SDD-fase-2](../pages/videos-youtube/SDD-fase-2.md)
> (vídeos), [SDD-F1-F1b](SDD-F1-F1b.md) Parte 2 (cabeçalho comum).
> Requisitos: **RF-CV-xx** (catálogo) e **RF-BU-xx** (busca). Critérios de aceite: **CA-xx**.

## 1. Objetivo

1. A página `/videos` passa a ser navegada como um catálogo de streaming: um destaque no topo e
   prateleiras horizontais, uma por recorte (novos, artigos, mais vistos, cada assunto).
2. O cabeçalho comum ganha **Buscar**, que encontra vídeos, artigos, assuntos e páginas do site.

O desenho é **original**. Usamos o padrão de navegação (destaque + prateleiras), não a aparência,
as cores, os ícones nem qualquer ativo de outra marca. A paleta continua Dark Tech.

**Fica fora:** reprodução automática, prévia que toca ao passar o mouse, conta de usuário,
recomendação personalizada, busca na transcrição (§6.1), página `/en/` dos vídeos (fase 2 do i18n).

## 2. Situação de partida (fatos, commit `2a77d89`)

- `scripts/gen-videos.mjs` gera `src/videos.html`, `src/temas/*.html` e `src/videos/*.html` a partir
  de `content/videos/*.md` e `content/temas.yml`. Ninguém edita esse HTML à mão.
- 180 vídeos vivos: 12 `publicado` (artigo), 10 `rascunho`, 158 `ficha`. 177 têm pelo menos um tema;
  3 não têm. Todos têm `youtube.visualizacoes` e transcrição (`.transcricao.vtt`, 11,6 MB no total).
- Distribuição por tema: engenharia-agentica 49, aprendizagem-e-mente 28, cloud-e-confiabilidade 26,
  especificacao-e-desenvolvimento 25, gestao-e-estrategia 19, dados-e-decisao 18, ferramentas-de-ia 11,
  tecnologia-e-cultura 10, salesforce-e-vendas 8, acessibilidade-e-design 5.
- Hoje `/videos` é: título, contagem, chips de assuntos, um `<select>` "Filtrar por assunto" e uma
  lista vertical de 180 cartões (miniatura `i.ytimg.com/…/mqdefault.jpg` 168×94, título, data, duração).
- O cabeçalho (`scripts/gen-cabecalho.mjs`) tem Início · Carreira · Conteúdos · Vídeos, vem de
  `specs/ecosystem.nav.yaml` (`entradas`) e entra em toda página com os marcadores `SITE-HEADER`.
  No celular, as entradas ficam num painel aberto pelo botão **Menu**.
- O catálogo do site (`ecosystem.nav.yaml`, `nodes`) tem 32 páginas com `title`, `descricao` e `temas`.
- Não existe busca no site. O deploy (`deploy.yml`) roda `npm run build` e sincroniza `dist/` com o S3.

## 3. Desenho da página `/videos`

```
┌ cabeçalho comum ─ Início · Carreira · Conteúdos · Vídeos ─────────── [Buscar] ┐
│ DESTAQUE  miniatura grande ▸  título · resumo · duração · assuntos            │
│           [Assistir]  [Ler o artigo]                                          │
│ Ir para: Novos · Com artigo · Mais vistos · Engenharia agêntica · …          │
│ Novos no canal                                          [‹] [›]  Ver todos → │
│ ▢ ▢ ▢ ▢ ▢ ▢ →                                                                 │
│ Vídeos com artigo                                       [‹] [›]  Ver todos → │
│ ▢ ▢ ▢ ▢ ▢ ▢ →                                                                 │
│ Mais vistos · Engenharia agêntica · Aprendizagem e mente · … (uma por tema)   │
│ Todos os vídeos  [assunto ▾] [só com artigo ☐] [ordem ▾]  — grade             │
└───────────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Destaque (RF-CV-01 a 04)

- **RF-CV-01** O destaque mostra **um** vídeo, fixo no HTML gerado. Não há carrossel que gira sozinho.
- **RF-CV-02** Regra de escolha, padrão: o artigo `publicado` mais recente. Se um vídeo tiver
  `destaque: true` no frontmatter, ele vence (D2). Se nenhum artigo existir, entra o vídeo mais recente.
- **RF-CV-03** Conteúdo: miniatura `hqdefault` (480×360, recortada 16:9) com `alt=""`, título como `<h2>`,
  resumo do artigo, duração, assuntos e dois links: **Assistir** (página do vídeo, onde está o player
  em fachada) e **Ler o artigo** (âncora do artigo na mesma página). Texto nunca fica sobre a imagem
  sem fundo sólido: contraste mínimo 4,5:1.
- **RF-CV-04** A miniatura do destaque carrega com `fetchpriority="high"`; as outras com `loading="lazy"`.

### 3.2 Prateleiras (RF-CV-05 a 12)

- **RF-CV-05** Cada prateleira é `<section aria-labelledby>` com `<h2>`, uma `<ul>` de cartões e o link
  **Ver todos (N)**. Ordem padrão (D3): Novos no canal (12 mais recentes) · Vídeos com artigo ·
  Mais vistos (12, por `visualizacoes`) · uma por tema, do tema com mais vídeos ao com menos.
- **RF-CV-06** No máximo 12 cartões por prateleira. "Ver todos" leva à página do tema (`/temas/<tema>`)
  ou a `/videos#todos` com o filtro já aplicado (`?ordem=vistos`, `?artigo=1`).
- **RF-CV-07** A rolagem é horizontal nativa (`overflow-x:auto` + `scroll-snap-type:x proximity`).
  Funciona com toque, trackpad, roda do mouse com Shift e teclado.
- **RF-CV-08** Com JS, cada prateleira ganha dois botões, **Anteriores** e **Próximos**, com nome
  acessível que cita a prateleira ("Próximos vídeos de Engenharia agêntica"). Eles rolam uma largura
  visível. No começo ou no fim, o botão correspondente fica `disabled`. Sem JS, os botões não aparecem
  e a rolagem nativa basta. Isso cumpre WCAG 2.5.7 (alternativa ao arrasto).
- **RF-CV-09** Teclado: Tab percorre os links dos cartões na ordem visual; o foco rola o cartão para a
  vista. Logo abaixo do destaque há a navegação **Ir para** (links de salto para cada prateleira), para
  ninguém precisar atravessar 12 cartões × 13 prateleiras com Tab.
- **RF-CV-10** Com `prefers-reduced-motion: reduce`, a rolagem dos botões é instantânea e o cartão
  não sobe ao passar o mouse.
- **RF-CV-11** Um vídeo pode aparecer em mais de uma prateleira. O HTML repete o cartão, e a miniatura
  repetida vem do cache do navegador.
- **RF-CV-12** Em telas estreitas (≤ 640 px) o cartão ocupa cerca de 70% da largura, para mostrar que
  existe mais à direita. A página nunca rola na horizontal; só a prateleira rola (WCAG 1.4.10).

### 3.3 Cartão (RF-CV-13 a 16)

- **RF-CV-13** Estrutura: `<article>` com miniatura 16:9 (`alt=""`), título como link (`<h3><a>`) e uma
  linha de metadados: duração · data · selo **Artigo** quando `status: publicado`. O cartão inteiro é
  clicável pelo pseudo-elemento do link; só o link recebe foco.
- **RF-CV-14** A duração aparece num selo sobre a miniatura, com fundo sólido (contraste ≥ 4,5:1).
- **RF-CV-15** Ao passar o mouse ou focar: elevação de 2 px e brilho neon (`box-shadow`), padrão Dark
  Tech. Nenhum cartão cresce sobre os vizinhos nem toca vídeo.
- **RF-CV-16** Foco visível com contorno de 2 px `#58a6ff` e `outline-offset`, igual ao cabeçalho.

### 3.4 Todos os vídeos (RF-CV-17 a 19)

- **RF-CV-17** A última seção, `id="todos"`, é uma grade com os 180 vídeos e três filtros: assunto
  (o `<select>` de hoje), **só com artigo** e ordem (recentes | mais vistos). O resultado é anunciado
  num `role="status"` ("24 vídeos"). Sem JS, a grade mostra tudo e os filtros ficam ocultos.
- **RF-CV-18** Os filtros leem e gravam os parâmetros da URL, para "Ver todos" funcionar e o link poder
  ser compartilhado.
- **RF-CV-19** O arquivo `public/videos.md` (versão para agentes) ganha as prateleiras como seções.

### 3.5 Páginas de tema e de vídeo (RF-CV-20 e 21)

- **RF-CV-20** `/temas/<tema>` usa o mesmo cartão (§3.3) em grade. A ordem atual (artigos do site
  antes dos vídeos) não muda.
- **RF-CV-21** A página de cada vídeo ganha, no fim, a prateleira **Mais deste assunto** (até 12 vídeos
  do primeiro tema dele, sem o próprio vídeo).

## 4. Desenho da busca

### 4.1 Comportamento (RF-BU-01 a 09)

- **RF-BU-01** O cabeçalho comum ganha **Buscar** à direita, em todas as páginas que têm os marcadores.
  Sem JS, é um link para `/busca`. Com JS, é um `<button aria-haspopup="dialog">` que abre a busca.
  No celular, **Buscar** fica visível ao lado de **Menu**, fora do painel.
- **RF-BU-02** A busca abre num `<dialog>` com `showModal()`, o padrão já registrado em
  `A11Y-DECISIONS.md` (Esc fecha, foco volta ao gatilho). O foco inicial vai para o campo.
- **RF-BU-03** O campo é `<input type="search">` com `<label>` visível "Buscar no site". Os resultados
  formam uma lista de links agrupada por tipo (**Vídeos**, **Artigos e páginas**, **Assuntos**), cada
  grupo com `<h2>`. Tab vai do campo para os resultados. Não usamos `combobox` com seta: uma lista de
  links é mais simples e funciona igual em todos os leitores de tela.
- **RF-BU-04** A busca roda a cada tecla com 150 ms de espera. O total é anunciado num `role="status"`
  ("8 resultados para 'agentes'") só depois da espera, para não interromper a digitação.
- **RF-BU-05** Atalho opcional: `/` abre a busca quando o foco não está num campo de texto.
- **RF-BU-06** A comparação ignora maiúsculas e acentos ("orquestracao" acha "orquestração") e exige
  todas as palavras digitadas (E lógico). Peso: título 3, assuntos 2, resumo/descrição 1. Empate:
  artigo publicado antes de ficha; depois, mais recente.
- **RF-BU-07** Cada resultado mostra título, tipo e uma linha de contexto. O termo encontrado fica em
  `<mark>` com contraste ≥ 4,5:1.
- **RF-BU-08** Sem resultado, a busca diz isso e oferece os links **Conteúdos** e **Vídeos**.
- **RF-BU-09** A página `/busca` tem o mesmo campo e os mesmos resultados, para quem chega sem JS
  (mostra os links do catálogo e de `/videos`) e para receber `?q=` (ação de busca no Google, opcional).

### 4.2 Índice (RF-BU-10 a 14)

- **RF-BU-10** Um gerador novo, `scripts/gen-busca.mjs`, grava `public/busca/pt.json` a partir das
  fontes estruturadas: `content/videos/*.md`, `content/temas.yml` e `ecosystem.nav.yaml` (`nodes` e
  `entradas`). Mesmo modelo dos outros geradores: dado entra, arquivo sai, `--check` no gate.
- **RF-BU-11** Cada entrada tem: `t` (título), `u` (URL), `k` (tipo), `a` (temas), `d` (resumo ou
  descrição, até 200 caracteres) e `p` (publicado ou não). Tamanho estimado: ~230 entradas,
  ~80 KB sem compressão, ~25 KB com gzip.
- **RF-BU-12** O índice só é baixado quando a busca abre pela primeira vez. Nenhum byte a mais no
  carregamento das páginas; o script da busca fica no bloco do cabeçalho e tem menos de 4 KB.
- **RF-BU-13** Fichas (`status: ficha`, `noindex`) entram no índice, com o título e a descrição do
  YouTube: são o catálogo e o visitante quer achá-las. Rascunhos entram como fichas (o texto do
  rascunho nunca entra). Vídeos `removido` não entram.
- **RF-BU-14** O gêmeo `/en/` usa `public/busca/en.json`, montado com o `<title>` e a
  `<meta name="description">` de `src/en/*.html` (já traduzidos pelo Argos) mais os vídeos, que não
  têm gêmeo e aparecem com o aviso "(em português)". Os rótulos da interface em inglês vêm de
  `label_en`, como o resto do cabeçalho (decisão Q9 da F1b). Nenhuma tradução por LLM.

## 5. Acessibilidade, desempenho e privacidade

| Tema | Regra |
| :--- | :--- |
| Movimento | Nada se move sozinho. `prefers-reduced-motion` desliga a rolagem suave e a elevação. |
| Teclado | Links de salto "Ir para"; botões de prateleira com nome; busca fecha com Esc. |
| Leitor de tela | Prateleira = região com título; cartão = artigo com link; contagens em `role="status"`. |
| Contraste | Texto sobre miniatura só com fundo sólido; selos e `<mark>` ≥ 4,5:1. |
| Catraca a11y | `/videos`, `/busca` e o diálogo entram no `a11y-sweep` e na suíte de foco visível. |
| Peso | Miniatura `mqdefault` (320×180, ~10 KB) com `loading="lazy"`; HTML de `/videos` cresce com as repetições: teto de 120 KB gzip, conferido no teste. |
| Terceiros | Miniaturas continuam em `i.ytimg.com`, como hoje. O player continua em fachada. |
| Dados | A busca roda no navegador. Nada do que a pessoa digita sai do aparelho nem vai ao GA4. |

## 6. Opções de busca avaliadas

| Opção | Como funciona | Prós | Contras |
| :--- | :--- | :--- | :--- |
| **A. Índice próprio (recomendada)** | `gen-busca.mjs` gera JSON das fontes estruturadas; ~80 linhas de JS buscam no navegador | Zero dependência; segue o padrão dos geradores; controle total da acessibilidade; índice pequeno; `--check` no gate | Não busca o texto corrido das páginas nem a transcrição |
| B. Pagefind | Depois do `vite build`, indexa o HTML de `dist/` e publica um índice em pedaços | Busca texto completo de todas as páginas, com radical em português; separa `/en/` sozinho | Dependência nova com binário; passo novo no deploy; a interface pronta não segue Dark Tech nem o padrão de diálogo (precisaria da API e de interface própria); páginas muito interativas geram trechos ruins |
| C. MiniSearch/Fuse.js sobre o índice da opção A | Biblioteca de busca no cliente | Tolerância a erro de digitação | Dependência de execução (~7 a 25 KB) para ~230 entradas, em que a busca simples basta |
| D. Busca externa (Google, Algolia) | Serviço de terceiros | Nenhum código de índice | Cookies e dados de terceiros, conta, custo; conflita com a política de consentimento |

### 6.1 Transcrição

A transcrição tem 11,6 MB. Pôr no índice do cliente é inviável. Se a busca na fala dos vídeos for
desejada, o caminho é a opção B só para os artigos publicados, numa fase posterior.

## 7. Testes (escritos antes do código)

- Unitário (`node --test`): escolha do destaque (D2); ordem e limite das prateleiras; índice com
  fichas e sem rascunho; normalização de acentos; E lógico; pesos.
- Playwright: prateleira rola com os botões e os botões ficam `disabled` nas pontas; "Ir para" leva o
  foco à prateleira; filtro com `?artigo=1` na URL; busca abre por clique e por `/`, fecha com Esc e
  devolve o foco; anúncio do total; `/busca` sem JS; axe sem violação nova; reduced motion.
- `gen-videos.mjs --check`, `gen-busca.mjs --check` e `gen-cabecalho.mjs --check` no `npm run gate`.

## 8. Ordem de implementação (PRs pequenos, cada um com o gate verde)

| PR | Conteúdo | `/en/` |
| :--- | :--- | :--- |
| 1 | Cartão novo (§3.3) e grade "Todos os vídeos" com os três filtros (§3.4) | não muda |
| 2 | Destaque, "Ir para" e prateleiras (§3.1, §3.2) | não muda |
| 3 | "Mais deste assunto" e cartão nas páginas de tema (§3.5) | não muda |
| 4 | `gen-busca.mjs`, índice PT, `/busca` e diálogo no cabeçalho (§4) | o cabeçalho muda em todas as páginas: rodar `i18n:sync` no notebook (worktree separada) e `gen-cabecalho.mjs` depois |
| 5 | Índice EN (RF-BU-14) | gerado do HTML `/en/` já traduzido |

Os PRs 1 a 3 só mexem em páginas sem gêmeo `/en/`, então não precisam do Argos.

## 9. Decisões

D1 foi decidida pelo Issei em 2026-11-14 (índice próprio). D2 a D4 seguem o padrão recomendado.

| Id | Pergunta | Padrão recomendado |
| :--- | :--- | :--- |
| D1 | Qual motor de busca? | A — índice próprio (§6) |
| D2 | Quem escolhe o destaque? | o artigo publicado mais recente, com `destaque: true` como exceção manual |
| D3 | Quais prateleiras, em que ordem? | Novos · Com artigo · Mais vistos · uma por tema |
| D4 | Ter "Vistos por você" (lista guardada só no navegador, `localStorage`)? | não agora: exige texto no banner de cookies e revisão de privacidade |
