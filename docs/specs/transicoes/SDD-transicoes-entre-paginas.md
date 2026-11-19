# SDD — Transições entre páginas (View Transitions entre documentos)

> **Status:** especificação (E1). Nenhum código implementado. **Data:** 2026-11-19.
> **Pedido:** "planejar a implementação de transições cinematográficas entre páginas do site, utilizando a
> View Transition API (Cross-Document / MPA)" (Issei, 2026-11-19). Plano aprovado; Issei escolheu começar
> por esta SDD (2026-11-19).
> **Referências:** [documentação do Chrome](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document),
> [demonstração](https://view-transitions.chrome.dev/off-the-beaten-path/mpa/).
> **Depende de:** [SDD-catalogo-videos-e-busca](../arquitetura-informacao/SDD-catalogo-videos-e-busca.md) (cartão,
> prateleiras), [SDD-F1-F1b](../arquitetura-informacao/SDD-F1-F1b.md) Parte 2 (cabeçalho comum),
> [`A11Y.md`](../../a11y/A11Y.md).
> Requisitos: **RF-VT-xx** (funcionais) e **RNF-VT-xx** (não funcionais). Critérios de aceite: **CA-xx**.

## 1. Objetivo

Ao navegar do índice de vídeos para a página de um vídeo, a capa e o título do cartão ativado se
transformam na capa e no título da página de destino. O cabeçalho fica parado e o resto do conteúdo sai
e entra com movimento direcional. Na volta, o movimento é o inverso.

A transição é **aprimoramento progressivo**. Cada página continua um documento HTML independente,
com a mesma URL, o mesmo conteúdo e a mesma navegação por link. Sem suporte, sem JavaScript ou com
movimento reduzido, a navegação é a de hoje.

**Fica fora desta SDD:** outras famílias de páginas (home, catálogo, páginas escritas à mão), movimento
3D, Speculation Rules (ver §9, E8) e qualquer biblioteca de animação.

## 2. Situação de partida (fatos, commit `52e9680`)

- O site é uma MPA. O `vite.config.js` publica cada `.html` como entrada própria: `src/*.html` (46),
  `src/videos/*.html` (181), `src/temas/*.html` (10), `src/en/*.html` e `src/en/videos/*.html` (28).
- Nenhuma página usa `@view-transition`, `view-transition-name`, `pageswap`, `pagereveal` ou
  `speculationrules`.
- `scripts/gen-videos.mjs` gera o índice (`src/videos.html`), as páginas de vídeo e as de assunto com a
  mesma função `pagina()`, o mesmo CSS inline e o mesmo cartão (`cartao()`).
- Cartão: `.card-thumb` (16:9, `mqdefault.jpg`) e `h3 > a.card-link`. Destaque do índice: `.hero-img`
  (16:9, `hqdefault.jpg`) e botões "Assistir" e "Ler o artigo" (`#artigo`).
- Página do vídeo: trilha `p.crumb > a[href="/videos"]`, `h1`, fachada `.yt[data-id]` (16:9, imagem
  `youtube.miniatura`, em geral `maxresdefault.jpg`) e a prateleira "Mais deste assunto" com o mesmo cartão.
- Em `/videos`, um vídeo pode aparecer no destaque, em uma ou mais prateleiras e na grade.
- `header.sh` (`position: sticky`) é o mesmo em 232 páginas (`scripts/gen-cabecalho.mjs`).
- `scripts/sync-i18n.mjs` marca um espelho `/en/` como velho quando o sha256 da fonte PT muda. O plugin
  `hreflang-pt` do `vite.config.js` já injeta no build para não mudar a fonte.
- A home (`src/index.html`) e o catálogo (`src/catalogo.html`) não têm `<img>`. O site não tem catálogo de
  cases com capa. Por isso esses fluxos ficam fora (sem correspondência visual).
- A CloudFront Function `viewer-request.js` reescreve `/videos/x` para `/videos/x.html` sem
  redirecionamento. Não há Content-Security-Policy para as páginas do site no repositório.

## 3. Suporte dos navegadores (consultado em 2026-11-19)

| Recurso | Chrome / Edge | Safari (macOS e iOS) | Firefox | Fonte |
|---|---|---|---|---|
| View Transitions entre documentos (`@view-transition`) | 126+ | 18.2+ | não | [Web Features Explorer](https://web-platform-dx.github.io/web-features-explorer/features/cross-document-view-transitions) |
| Navigation API | 102+ | 26.2+ | 147+ | [Web Features Explorer](https://web-platform-dx.github.io/web-features-explorer/features/navigation) |
| `navigation.activation` | 123+ | 26.2+ | 147+ | [caniuse](https://caniuse.com/mdn-api_navigation_activation) |
| Speculation Rules | 109+ | não | não | [Web Features Explorer](https://web-platform-dx.github.io/web-features-explorer/features/speculation-rules) |

O Safari de 18.2 a 26.1 tem a transição entre documentos, mas não `navigation.activation`. O RF-VT-11
trata esse caso.

## 4. Fluxo e comportamento

**Família `videos`:** `src/videos.html`, `src/videos/*.html` e `src/temas/*.html`. As duas pontas de uma
navegação precisam estar na família; fora dela, nada muda.

| Elemento | Origem | Destino | Comportamento |
|---|---|---|---|
| Identidade visual | `header.sh` | `header.sh` | Fica parado (`vt-cabecalho`). |
| Capa | `.card-thumb` ou `.hero-img` do cartão ativado | `.yt` | Expansão: o grupo `vt-capa` muda de posição e tamanho. As duas caixas são 16:9. |
| Título | `h3` do cartão ativado | `h1` | Transformação de posição e tamanho (`vt-titulo`). Se distorcer (R3), só esmaece. |
| Conteúdo | `root` antigo | `root` novo | Saída e entrada com esmaecimento e deslocamento curto. |
| Direção | ativação de cartão | Voltar ou link "Vídeos" | `avanco`: o novo entra pela direita. `retorno`: pela esquerda, e a capa volta ao cartão. |

Tipos de transição:

- `avanco`: lista (`/videos`, `/temas/*`) → vídeo.
- `retorno`: vídeo → lista, por link ou por `traverse` (Voltar do navegador).
- `lateral`: vídeo → vídeo ("Mais deste assunto").

## 5. Requisitos funcionais

- **RF-VT-01** — Quando a página é da família `videos`, o build injeta no `<head>` um `<style id="vt">` e um
  `<script id="vt">` clássico, ambos inline. O build não injeta nada nas outras páginas.
- **RF-VT-02** — A injeção acontece no plugin `transicoes` do `vite.config.js`. Nenhum arquivo de `src/`,
  `public/` ou `content/` muda para isso, além dos arquivos novos do §7.
- **RF-VT-03** — A regra `@view-transition { navigation: auto; }` só existe dentro de
  `@media (prefers-reduced-motion: no-preference)`.
- **RF-VT-04** — `header.sh` tem o nome estático `vt-cabecalho` e não tem animação própria.
- **RF-VT-05** — Os nomes `vt-capa` e `vt-titulo` são dinâmicos. Em cada página, no máximo um elemento
  tem cada nome, e só durante a transição.
- **RF-VT-06** — No `click` (fase de captura, no `document`), o script guarda o link ativado quando a URL
  dele é de uma página da família. O mesmo vale para a ativação por teclado (Enter).
- **RF-VT-07** — Em `pageswap`, se `e.viewTransition` existe e a URL guardada é igual à URL de destino
  (`e.activation.entry.url`), o script dá `vt-capa` à capa e `vt-titulo` ao `h3` do cartão daquele link.
  A comparação usa URLs normalizadas: sem `.html`, sem barra final e sem fragmento.
- **RF-VT-08** — Em `pagereveal`, na página do vídeo, o script dá `vt-capa` ao `.yt` e `vt-titulo` ao `h1`
  só quando o `.yt` está na área visível. Caso contrário (por exemplo, `#artigo`), não dá os nomes.
- **RF-VT-09** — Em `pagereveal`, numa lista, o script dá os nomes ao primeiro cartão visível cujo link
  aponta para a URL de origem. Se nenhum estiver visível, não dá os nomes.
- **RF-VT-10** — O script define o tipo (`avanco`, `retorno` ou `lateral`, §4) com
  `e.viewTransition.types.add()` nos dois lados, a partir das URLs de origem e destino e do
  `navigationType`.
- **RF-VT-11** — Sem `navigation.activation`, o script grava `{de, para}` no `sessionStorage` em
  `pageswap` e lê no `pagereveal`. Sem registro válido, a transição fica sem elemento compartilhado.
- **RF-VT-12** — Na página do vídeo, em `pagereveal`, o script põe `mqdefault.jpg` do `data-id` como
  fundo do `.yt`, para que o snapshot novo não seja uma caixa preta enquanto a imagem grande carrega.
- **RF-VT-13** — O script remove os nomes dinâmicos quando `viewTransition.finished` resolve. Ele trata a
  rejeição de `ready` com `catch`.
- **RF-VT-14** — Quando `'onpagereveal' in window` é falso, o script não registra nenhum ouvinte.

## 6. Requisitos não funcionais

- **RNF-VT-01** (acessibilidade) — Com `prefers-reduced-motion: reduce`, nenhuma transição roda.
- **RNF-VT-02** (acessibilidade) — A transição não muda o foco nem a ordem de tabulação: depois da
  navegação, o primeiro Tab chega ao link "Pular para o conteúdo".
- **RNF-VT-03** (acessibilidade) — Nenhuma informação depende da animação. Sem JS, o conteúdo das três
  páginas aparece completo.
- **RNF-VT-04** (desempenho) — As animações do `<style id="vt">` só usam `transform` e `opacity`.
- **RNF-VT-05** (desempenho) — O plugin não acrescenta nenhuma requisição de rede bloqueante.
  O `perf-budget.mjs` continua verde.
- **RNF-VT-06** (desempenho) — O script lê `getBoundingClientRect()` no máximo uma vez por elemento
  candidato, só dentro de `pageswap` e `pagereveal`.
- **RNF-VT-07** (robustez) — Recarregar, abrir pela barra de endereço e chegar por link externo não
  disparam transição e não geram erro no console.
- **RNF-VT-08** (SEO) — URLs, `canonical`, `robots` e JSON-LD das páginas da família ficam iguais.
- **RNF-VT-09** (i18n) — `npm run i18n:check` continua verde sem rodar o Argos.
- **RNF-VT-10** (design) — Os nomes, classes e custom properties usam o prefixo `vt-`. Nenhuma cor nova.

## 7. Arquitetura

| Arquivo | Novo? | Responsabilidade |
|---|---|---|
| `src/transicoes/familias.mjs` | novo | Lista das famílias (nome, padrão de caminho, seletores de `capa` e `titulo` na origem e no destino) e funções puras: normalizar URL, saber se uma rota é da família, escolher o tipo. Lido pelo plugin no build. |
| `src/transicoes/transicoes.css` | novo | `@view-transition` sob `no-preference`, `vt-cabecalho`, custom properties `--vt-*` de duração e curva, animações de `root` por `:active-view-transition-type()`, regras de `::view-transition-group(*.vt-compartilhado)`. |
| `src/transicoes/transicoes.js` | novo | Script clássico (não módulo), para o ouvinte de `pagereveal` existir antes do primeiro quadro. Implementa RF-VT-06 a RF-VT-14. Recebe a configuração da família serializada pelo plugin. |
| `vite.config.js` | alterado | Plugin `transicoes`: lê os três arquivos e injeta CSS e JS inline nas páginas da família (`ctx.filename`). |
| `tests/transicoes.test.mjs` | novo | Testes unitários das funções puras de `familias.mjs`. |
| `tests/transicoes.spec.js` | novo | Testes Playwright (§8). |
| `A11Y-DECISIONS.md` | alterado (E7) | Padrão "Transição entre páginas". |
| `knowledge/` | alterado (E7) | Decisão de arquitetura (OKF). |

Convenções:

- Nomes por papel: `vt-cabecalho` (estático), `vt-capa` e `vt-titulo` (dinâmicos).
- Classe `view-transition-class: vt-compartilhado` nos nomes dinâmicos.
- Nova família = nova entrada em `familias.mjs` + regra de caminho no plugin. Movimento com mais
  profundidade (por exemplo, `perspective` no `root`) entra como animação por tipo, só no ramo
  `no-preference`, sem mexer no script.

`scripts/gen-videos.mjs` não muda. Se a validação (R2, R3) exigir mudança no HTML gerado, a mudança
atualiza esta SDD antes, e o PR leva os espelhos `/en/` das 28 páginas de vídeo traduzidas.

## 8. Critérios de aceite (testes escritos antes do código)

| CA | Verifica | Como |
|---|---|---|
| CA-01 | RF-VT-05, 07, 10 | Chromium: ativar um cartão em `/videos` → tipo `avanco`; um só elemento com `vt-capa` e um só com `vt-titulo` na origem. |
| CA-02 | RF-VT-09, 10 | Voltar pelo histórico → tipo `retorno`; cartão visível recebe `vt-capa`; cartão fora da tela não recebe. |
| CA-03 | RF-VT-13 | Depois de `finished`, nenhum nome dinâmico, também após restauração pelo BFCache. |
| CA-04 | RF-VT-08 | `/videos/<slug>#artigo` abre na âncora e o `.yt` não recebe nome. |
| CA-05 | RF-VT-10 | Vídeo → vídeo usa `lateral`. |
| CA-06 | RF-VT-01, 02 | Páginas fora da família não têm `#vt` no `dist/`; o diff não toca `src/`, `public/` ou `content/` além dos arquivos do §7. |
| CA-07 | RF-VT-12 | O `.yt` tem fundo `mqdefault` do próprio `data-id` durante a transição. |
| CA-08 | §4 (título) | Pessoa confere em gravação de tela que o título fica legível (Chrome desktop, Chrome Android, Safari macOS e iOS). |
| CA-09 | RF-VT-14 | Projeto `firefox`: navegação funciona, console sem erro. |
| CA-10 | RNF-VT-07 | Recarregar e `page.goto` direto não disparam transição. |
| CA-11 | RNF-VT-03 | Projeto `no-js`: conteúdo completo nas três páginas. |
| CA-12 | RF-VT-13 | Falha forçada (nome duplicado) não deixa a página vazia nem nomes sobrando. |
| CA-13 | RNF-VT-01, RF-VT-03 | Com `reducedMotion: 'reduce'`, `pagereveal` chega sem `viewTransition`. |
| CA-14 | RF-VT-06 | Tab até o cartão + Enter produz o mesmo resultado de CA-01. |
| CA-15 | RNF-VT-02 | Primeiro Tab no destino chega a "Pular para o conteúdo"; a catraca do axe não sobe. |
| CA-16 | RNF-VT-04 | Teste estático: as `@keyframes` de `transicoes.css` só declaram `transform` e `opacity`. |
| CA-17 | RNF-VT-05 | `perf-budget.mjs` verde; nenhuma tag `<link>` ou `<script src>` nova nas páginas da família. |
| CA-18 | RNF-VT-08 | Comparação do `dist/` antes e depois: `canonical`, `robots` e JSON-LD iguais. |
| CA-19 | RNF-VT-09 | `npm run i18n:check` verde. |
| CA-20 | RNF-VT-10 | Teste estático: nomes e custom properties com prefixo `vt-`; nenhum hexadecimal novo. |

## 9. Ordem de implementação

Cada etapa é um commit pequeno, com o teste antes do código e o gate verde.

| Etapa | Entrega | Critérios |
|---|---|---|
| E1 | Esta SDD | revisão contra `docs/specs/STYLE_GUIDE.md` e `docs/specs/ARCHITECTURE.md` |
| E2 | Plugin `transicoes` com CSS e JS vazios, só na família | CA-06, CA-17, CA-18, CA-19 |
| E3 | `@view-transition` sob `no-preference`, `vt-cabecalho`, animação do `root` | CA-09, CA-10, CA-11, CA-13, CA-16, CA-20 |
| E4 | Ida: nomes em `pageswap` e `pagereveal`, fundo `mqdefault` | CA-01, CA-03, CA-04, CA-07, CA-14 |
| E5 | Retorno, tipos e alternativa do Safari sem `navigation.activation` | CA-02, CA-03, CA-05, CA-12 |
| E6 | Validação com o Issei nos quatro navegadores; ajuste do título | CA-08, CA-15 e passada com movimento reduzido |
| E7 | `A11Y-DECISIONS.md` e `knowledge/` | `okf validate knowledge --strict` sem erro |
| E8 (opcional) | Speculation Rules (`prerender`, `moderate`) na família | CA-17 e critério de análise definido numa revisão desta SDD |

## 10. Riscos

- **R1. Suporte parcial** (§3). Firefox mostra a navegação comum. Safari anterior a 26.2 mostra a transição
  sem elemento compartilhado quando falta o registro do RF-VT-11.
- **R2. Imagem de destino não carregada.** O RF-VT-12 depende de a miniatura estar em cache. Validar em
  rede lenta emulada. Se não bastar, avaliar a E8 (só Chromium).
- **R3. Distorção do título.** `h3` e `h1` têm tamanho e quebra de linha diferentes. Se a E6 mostrar texto
  esticado, `vt-titulo` sai e o título só esmaece com o `root`.
- **R4. Teste automatizado.** Confirmar na E3 que o Chromium do Playwright em modo headless entrega
  `pagereveal` com `viewTransition`. Se não entregar, CA-01, CA-02 e CA-05 passam a ser conferidos por
  gravação manual, e esta SDD registra a mudança.
- **R5. Banner de cookies.** É `position: fixed` e entra no snapshot do `root`. Se piscar na E6, recebe um
  nome próprio e fica parado.
- **R6. Pré-renderização e análise** (E8). Página pré-renderizada executa scripts antes da ativação. A E8 só
  começa com prova de que o GA4 e o banner de consentimento não registram nada antes da ativação.
- **R7. Página sem interação durante a transição.** A camada `::view-transition` fica sobre a página. A
  duração é decidida na E6, com o Issei; esta SDD não fixa valor sem medição.
- **R8. Código da demonstração.** O código de `bramus/view-transitions-demos` não foi lido (leitura
  automática bloqueada). Conferir a demonstração antes da E3.

## 11. Decisões

- **D1** (Issei, 2026-11-19): começar pela SDD do fluxo `/videos` → página do vídeo.
- Pendentes, para a E6: duração das transições; manter ou não o `vt-titulo` (R3).
