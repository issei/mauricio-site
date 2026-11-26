# SDD — Transições entre páginas: início, carreira e conteúdos

> **Status:** especificação (F1). Nenhum código implementado. **Data:** 2026-11-19.
> **Pedido:** "elabore a transição da página principal (index) para o currículo e para o catálogo, que são
> as principais da página inicial" (Issei, 2026-11-19), depois de aprovar a transição dos vídeos.
> **Estende:** [SDD-transicoes-entre-paginas](SDD-transicoes-entre-paginas.md) (RF-VT-01 a RF-VT-16,
> RNF-VT-01 a RNF-VT-10, CA-01 a CA-22). Tudo o que essa SDD diz vale aqui, salvo o que este texto muda.
> Requisitos novos: **RF-VT-17** em diante. Critérios novos: **CA-23** em diante.

## 1. Objetivo

Ao navegar entre a página inicial, a carreira (`/curriculo`) e os conteúdos (`/catalogo`), a pessoa vê
continuidade onde ela existe de verdade, e só ali. O cabeçalho já fica parado. O conteúdo novo entra pela
direção do movimento (RF-VT-10). Sem suporte, sem JavaScript ou com movimento reduzido, a navegação é a de hoje.

## 2. Pontos de continuidade (fatos lidos no código, commit `f177d51`)

| De → Para | O que existe nas duas pontas | Decisão |
|---|---|---|
| Início ↔ Carreira | O mesmo bloco `.pf-hero`, gerado por `scripts/gen-portfolio.mjs` (blocos `PF:*`): o nome (`h1#pf-nome`) e o papel (`.pf-hero-title`) têm o mesmo texto e a mesma posição. | **Compartilhar** nome e papel. O resto da página entra. |
| Início → Conteúdos, pelo link de um tema | O link do tema na lista `.pf-temas` (`catalogo.html#tema-x`) e o `h2` `#tema-x-title` da seção de destino. | **Par existe, mas não fecha:** o navegador só rola até o fragmento depois do primeiro quadro (medido no Chromium: `scrollY` 0 e `h2` a 911 px de uma tela de 720 px). Só a entrada direcional (R9). |
| Início → Conteúdos, pelo botão ou pelo cabeçalho | O `h1` do catálogo ("Conteúdos") não tem par na home. | **Sem elemento compartilhado.** Só a entrada direcional. |
| Carreira ↔ Conteúdos | Nenhum elemento em comum além do cabeçalho. | Só a entrada direcional. |
| Início → Carreira, por link com fragmento (`#p-…`) | O destino rola até o projeto; o hero fica fora da tela. | Sem elemento compartilhado. |

Nenhuma das três páginas tem `<img>`. Não se inventa par visual onde não há. O `h1` do catálogo e o hero da
home não casam, e esta SDD não força o casamento.

## 3. Requisitos funcionais

- **RF-VT-17** — Nova família `site` em `src/transicoes/familias.mjs`, com as rotas normalizadas `/` (e `/index`),
  `/curriculo` e `/catalogo`. O plugin injeta a camada nelas e em nenhuma outra. O espelho `/en/` fica de fora,
  como na família `videos` (a fonte PT não muda, então nenhum espelho fica velho: RNF-VT-08).
- **RF-VT-18** — A direção segue a ordem do cabeçalho: Início 0, Carreira 1, Conteúdos 2. Ir para um número maior
  é `avanco`; ir para um menor é `retorno`. Fora da família `site`, a regra de RF-VT-10 não muda.
- **RF-VT-19** — Início ↔ Carreira: o `h1#pf-nome` recebe o nome `vt-nome` e o `.pf-hero-title` recebe `vt-papel`,
  nas duas pontas, só quando o elemento está visível nas duas (sem fragmento na URL de destino e visível ao sair).
  **Revisto em 2026-11-26** pela nova home: na home, o par passa a ser `h1#hm-nome`, e o `vt-papel` sai
  ([SDD-destinos-da-home](../pages/portfolio/SDD-destinos-da-home.md), §5.1).
- **RF-VT-20** — Link com fragmento (`#tema-x` no catálogo, `#p-…` na carreira): nenhum nome dinâmico, nem na saída
  nem na entrada. Só a entrada direcional. Um nome só na saída esmaeceria sozinho, sem par.
- **RF-VT-21** — Nenhum nome existe em mais de um elemento por página, e todo nome dinâmico sai em `finished`
  e em `pageshow` com `persisted` (RF-VT-13). `vt-cabecalho` continua estático.
- **RF-VT-22** — Pré-busca (`prefetch`, nunca `prerender`) das páginas da família `site` ao passar o mouse ou
  tocar, só nas páginas da própria família. Cada família tem as suas regras: a lista de `videos` não muda.
- **RF-VT-23** — A família `site` e a família `videos` são independentes. Uma navegação entre elas (por exemplo
  Início → Vídeos) tem a entrada padrão do conteúdo, sem direção e sem elemento compartilhado.

## 4. Requisitos não funcionais

Valem RNF-VT-01 a RNF-VT-10 sem mudança: só `opacity` e `transform`, tudo sob `prefers-reduced-motion:
no-preference`, nenhuma cor nova, nenhum `view-transition-name` fixo além de `vt-cabecalho`. As durações são as
de hoje (0,2 s no conteúdo e 0,32 s no compartilhado): a Issei validou essa fluidez nos vídeos. O CSS novo, se houver,
usa o prefixo `vt-` e não escreve hexadecimal.

## 5. Critérios de aceite (o teste vem antes do código)

| Critério | Verifica | Onde |
|---|---|---|
| **CA-23** | `familiaDe` devolve `site` para `/`, `/index`, `/curriculo`, `/catalogo` e nulo para `/busca`, `/en/`, `/cookies` | unitário |
| **CA-24** | O plugin injeta as 3 tags em `src/index.html`, `src/curriculo.html`, `src/catalogo.html` e em nenhum espelho `src/en/**` | unitário |
| **CA-25** | `tipoDeTransicao`: `/`→`/curriculo` e `/`→`/catalogo` = `avanco`; o inverso = `retorno`; `/curriculo`→`/catalogo` = `avanco`; `/catalogo`→`/curriculo` = `retorno`; `/`→`/videos` = nulo | unitário |
| **CA-26** | Início → Carreira pelo botão "Ver carreira": `vt-nome` e `vt-papel` existem uma vez em cada ponta, tipo `avanco` | Chromium |
| **CA-27** | Carreira → Início pelo cabeçalho: os mesmos dois nomes, tipo `retorno` | Chromium |
| **CA-28** | Início → Conteúdos pelo botão: nenhum nome dinâmico, tipo `avanco` | Chromium |
| **CA-29** | Início → Conteúdos por um tema: nenhum nome dinâmico, tipo `avanco` | Chromium |
| **CA-30** | Início → Carreira por link com fragmento (`#p-…`): nenhum nome dinâmico | Chromium |
| **CA-31** | Com `prefers-reduced-motion: reduce`: nenhuma transição (`viewTransition` nulo) nas três páginas | Chromium |
| **CA-32** | Voltar pelo histórico (bfcache): nenhum `view-transition-name` sobra no elemento | Chromium |
| **CA-33** | Firefox e WebKit: nada quebra, a navegação é a de hoje (suíte do gate) | gate |
| **CA-34** | `prefetch` com `Sec-Purpose` ao passar o mouse nos links da família; nenhum `prerender` no HTML | Chromium + unitário |
| **CA-35** | Os espelhos `/en/` seguem em dia: `npm run i18n:check` sem diferença | gate |

## 6. Ordem de implementação

| Etapa | Entrega | Critérios |
|---|---|---|
| F1 | Esta SDD | revisão contra `docs/specs/STYLE_GUIDE.md` |
| F2 | Família `site`, direção por posição, plugin e pré-busca por família | CA-23, CA-24, CA-25, CA-34, CA-35 |
| F3 | Nomes compartilhados (nome e papel) e limpeza | CA-26 a CA-33 |
| F4 | `A11Y-DECISIONS.md`, `knowledge/` e validação da Issei no aparelho | `okf validate knowledge --strict` |

## 7. Riscos

- **R9 — rolagem até o fragmento.** O navegador rola até `#tema-x` depois do primeiro quadro da página nova.
  No Chromium, no `pagereveal`, `scrollY` vale 0 e o `h2` do primeiro tema está fora da tela. Então o par
  link → `h2` não fecha, e o código não tenta contornar: o fragmento só tem a entrada direcional.

- **R10 — hero parecido, mas não igual.** O texto de apoio (`.pf-hero-lead`) da home tem uma frase a mais que o do
  currículo. Por isso só nome e papel são compartilhados; o parágrafo entra com o conteúdo.
- **R11 — bloco gerado.** O hero é gerado por `scripts/gen-portfolio.mjs`. Nada aqui edita o bloco `PF:*`: os nomes
  entram pelo script, por seletor, em tempo de execução.
- **R12 — fluidez.** Vale o que a SDD dos vídeos diz (D2): o Chromium sem GPU da nuvem não mede a fluidez. A Issei
  confirma no aparelho.

## 8. Decisões

- **D3** (Issei, 2026-11-19): estender as transições à página inicial, ao currículo e ao catálogo.
- **D5** (medição, 2026-11-19): o tema da home não vira título compartilhado no catálogo (R9). Se um dia o catálogo
  rolar antes do primeiro quadro, esta decisão se reabre.
- **D4** (padrão adotado, a Issei pode mudar): a direção segue a ordem do cabeçalho; só o que casa de verdade é
  compartilhado (nome e papel). O botão "Explorar os conteúdos", o cabeçalho e os temas levam ao catálogo só
  com a entrada direcional.
