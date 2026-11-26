---
id: sdd-destinos-da-home
titulo: SDD — Chegada aos destinos da nova home
data: 2026-11-26
status: especificação (nada implementado)
leitor: Issei (decisões) e quem implementar a home
padrao_de_redacao: ptbr-controlado (perfil Técnico)
pedido: Issei, 2026-11-26 ("antes da publicação também avalie a transição e navegação para os links que a home leva para tornar a experiencia elevada como a home")
base: SDD-nova-home.md (§14) e ../../transicoes/SDD-transicoes-site.md
---

# SDD — Chegada aos destinos da nova home

> **Estado:** especificação. Nada foi implementado.
> **Estende:** [SDD-transicoes-site](../../transicoes/SDD-transicoes-site.md) e
> [SDD-transicoes-vinheta-videos](../../transicoes/SDD-transicoes-vinheta-videos.md).
> Tudo o que esses documentos dizem continua valendo, salvo o que este texto muda.
> Requisitos novos de transição: **RF-VT-37** em diante. Requisitos de página:
> **RF-DH-01** em diante. Critérios novos: **CA-49** em diante.

## 1. Objetivo

A nova home conduz o visitante com movimento contínuo e contido. O clique num
link não pode quebrar essa experiência. Este documento avalia cada destino da
home e define o que muda para que a chegada e a volta fiquem à altura da home.

## 2. Como foi avaliado

- **Onde:** build de produção do site no notebook do Issei, com a home do
  protótipo final (revisão 7, commit d2b702e8) no lugar de `/`, num build
  temporário. Scripts e capturas no commit local ab5644e3, na pasta
  `prototipo/`.
- **Navegador:** Chrome, em 1440 × 900 e 390 × 844.
- **Medidas:** FCP do destino, CLS da chegada, posição da rolagem na volta,
  entrada no *bfcache*, foco do teclado e movimento reduzido.
- **Causa do CLS do catálogo:** confirmada num segundo build, na nuvem
  (§4.2).

## 3. Os links da home

São 27 links no protótipo final.

| Onde | Links |
| :-- | :-- |
| Cabeçalho comum | Nome e Início → `/`; Carreira → `/curriculo.html`; Conteúdos → `/catalogo.html`; Vídeos → `/videos.html`. No celular, ficam atrás do botão Menu |
| Menu "Sessões" | `#apresentacao`, `#historia`, `#ideias`, `#projetos` (as 4 âncoras existem) |
| Cena 01, caminhos | `#historia`, `#ideias`, `#projetos` |
| Sessão 02 | "Conheça minha história" → `/curriculo.html` |
| Sessão 03, recentes | `/a-quem-a-empresa-delega.html`, `/curiosidade-e-investigacao.html`, `/videos/domine-a-ia-com-google-antigravity-da-codificacao-a.html` (escolhidos pelo `destaques.mjs`; mudam com o tempo) |
| Sessão 03, CTAs | "Explore minhas ideias" → `/catalogo.html`; "Vídeos do canal" → `/videos.html` |
| Sessão 04, cartões | `/acessibilidade.html`, `/case-agents.html`, `/agent-ready.html`, `/boutique-empresarial-showcase.html` |
| Sessão 04, CTA | "Conheça meus projetos" → `/catalogo.html#projetos`. **A âncora não existe**: a página abre no topo |
| Rodapé | E-mail, LinkedIn, GitHub, YouTube |

## 4. Diagnóstico

### 4.1 Por destino

FCP e CLS em 1440 × 900 / 390 × 844.

| Destino | Transição hoje | FCP (ms) | CLS | Chegada |
| :-- | :-- | :-- | :-- | :-- |
| `/curriculo` | Família `site`: dissolução da raiz, cabeçalho parado. **O nome não viaja**: o script procura `#pf-nome` e `.pf-hero-title`, que a home nova não tem | 372 / 164 | 0,004 / 0,086 | Hero com gradiente roxo e retrato redondo; barra de seções abaixo do cabeçalho |
| `/catalogo` | Família `site` | 144 / 124 | **0,28** / 0,03 | Título "Conteúdos" em gradiente azul e roxo, centralizado |
| `/catalogo#projetos` | Família `site`, sem nome (fragmento) | igual | igual | **A âncora não existe**; abre no topo |
| `/videos` | Abertura a partir do clique (tipo `imersao`) | 192 / 164 | 0,003 | Miniatura colorida em destaque, o maior contraste com a sobriedade da home |
| `/videos/domine-a-ia…` | Família `videos` | 128 / 88 | 0,008 / 0,046 | Miniatura grande na primeira dobra |
| `/a-quem-a-empresa-delega` | **Nenhuma** | 60 / 156 | 0,16 / 0,26 | Artigo; no celular, o primeiro toque no link falhou porque a sessão sobe com a rolagem |
| `/curiosidade-e-investigacao` | **Nenhuma** | 124 / 104 | 0,001 | Serifa Newsreader e botão âmbar: o destino mais parecido com a home |
| `/acessibilidade` | **Nenhuma** | 156 / 132 | 0,027 / 0 | O placar 207 → 0 do cartão aparece na primeira dobra (y 676 / 768 px) |
| `/case-agents` | **Nenhuma** | 264 / 216 | 0,002 / 0 | Carga até o `load`: 1,16 s. As métricas do cartão ficam em y 718 / 937 px, fora da dobra |
| `/agent-ready` | **Nenhuma** | 184 / 160 | 0,11 / 0,06 | Carga até o `load`: 1,16 s. O placar fica em y 677 / 701 px |
| `/boutique-empresarial-showcase` | **Nenhuma** | 124 / 88 | 0 | O maior salto de paleta: fundo azul-marinho (oklch), título serifado com ciano e barra própria "Voltar aos Conteúdos". Os 4 pilares do cartão ficam em y 1714 / 2262 px |

### 4.2 Causa do CLS do catálogo

O `nav[aria-label="Temas"]` (as pílulas dos temas, em `flex-wrap`) muda de
altura duas vezes logo depois da primeira pintura: 156 → 100 px em 430 ms e
100 → 156 px em 473 ms. A lista de conteúdos abaixo dele desce e sobe junto.

| Teste (build na nuvem, 1440 × 900) | CLS |
| :-- | :-- |
| Normal | 0,537 |
| Sem Font Awesome | 0,537 |
| Sem Google Fonts (só a fonte reserva) | 0,000 |

Conclusão: a troca da fonte reserva pela Inter (`font-display: swap`) muda a
largura das pílulas, e a quebra de linha muda. O Agent Ready (0,195 na nuvem)
tem o mesmo padrão de dois deslocamentos seguidos; a causa precisa ser
confirmada nele com o mesmo teste.

### 4.3 O que vale para todos os destinos

- **Fundo:** `#0d1117` nos destinos contra `#0D1219` na home. A diferença não
  se percebe, exceto na Boutique.
- **Cabeçalho:** o mesmo em todos (56 px).
- **Volta:** o botão Voltar devolve a home no mesmo ponto da rolagem (0 px de
  diferença depois de 1,5 s), e a cena volta igual.
- **bfcache:** a home não entrou no *bfcache* no Chrome de teste. O motivo
  veio mascarado ("masked"). Precisa ser conferido num Chrome comum.
- **Banner de cookies:** na primeira visita, cobre de 35 a 40 % da dobra no
  celular, em todas as páginas, inclusive na home.
- **Teclado:** o primeiro Tab de todos os destinos cai em "Pular para o
  conteúdo", e o foco segue dentro do `main`.
- **Movimento reduzido:** nenhuma transição, como deve ser.

## 5. Requisitos

### 5.1 Transições (só a camada `src/transicoes`; nenhum espelho `/en/` muda)

- **RF-VT-19 (revisto)** — Início ↔ Carreira: na home nova, o `h1#hm-nome`
  recebe `vt-nome`, e o `h1#pf-nome` da Carreira recebe o mesmo nome. A
  condição continua: só quando o nome está visível nas duas pontas e o
  destino não tem fragmento. O `vt-papel` sai da home, porque o subtítulo da
  home ("Engenharia de software, arquitetura em produção e agentes de IA.") e
  o papel da Carreira são textos diferentes, e um par de textos diferentes se
  deforma.
- **RF-VT-37** — "Conheça minha história" (Sessão 02) → `/curriculo`: a
  moldura do retrato da Sessão 02 recebe `vt-retrato` no `pageswap`, só se
  estiver visível. Na Carreira, a imagem de `.pf-hero-retrato` recebe
  `vt-retrato` no `pagereveal`, sem fragmento. O retrato retangular vira o
  retrato redondo do topo da Carreira. Na volta, só a entrada direcional
  (`retorno`), sem elemento compartilhado.
- **RF-VT-38** — Nova família `destinos`: home → cada um dos 4 projetos e dos
  textos recentes da Sessão 03. A lista de rotas é montada no build a partir
  do `specs/ecosystem.nav.yaml` (nós com `natureza: experiencia`) e do
  `scripts/home/destaques.mjs`. Nenhum caminho é escrito à mão. Tipos: home →
  destino é `avanco`; destino → home é `retorno`; entre dois destinos, nenhum.
  A transição é a mesma da família `site`: dissolução da raiz e cabeçalho
  parado (`vt-cabecalho`).
- **RF-VT-39** — Na home, a pré-busca (`prefetch`, `eagerness: moderate`,
  nunca `prerender`) cobre também os destinos da RF-VT-38. Motivo: Case
  Agents e Agent Ready levam 1,16 s até o `load`.
- **RF-VT-40 (fase 2, depois da publicação)** — Cartão → detalhe: a captura do
  cartão recebe `vt-capa`, e o mesmo detalhe na página do projeto recebe o
  mesmo nome, **só** quando esse detalhe está na primeira dobra do destino no
  `pagereveal` (hoje: Acessibilidade e Agent Ready, no computador). Nos
  outros casos, só a dissolução. Os links dos cartões **não** ganham
  fragmento: o visitante chega ao título do projeto, que dá o contexto do
  detalhe. Esta etapa espera o Issei testar a fluidez das transições da fase
  1 no aparelho dele (no histórico da família `videos`, a primeira versão
  pareceu pesada; PR #206).
- **RNF** — Tudo sob `prefers-reduced-motion: no-preference`; as durações
  continuam as da família `site`; nenhum arquivo JavaScript novo; o espelho
  `/en/` fica fora da camada, como hoje (RNF-VT-08).

### 5.2 Chegada (páginas e componentes comuns)

- **RF-DH-01** — CLS ≤ 0,1 em 1440 × 900 e 390 × 844 em todos os destinos da
  §3. Correção da causa da §4.2 (feita no catálogo, CLS 0,54 → 0,002; as outras páginas só se a medição pedir): uma fonte reserva com as métricas da Inter
  (`@font-face` local com `size-adjust` e os *overrides* de `ascent`,
  `descent` e `line-gap`), incluída na pilha de fontes do CSS comum. A
  mudança é só de CSS; nenhum HTML muda, então nenhum espelho fica velho.
  Depois, repetir o teste do §4.2 no Agent Ready e no artigo
  `/a-quem-a-empresa-delega`.
- **RF-DH-02** — `/catalogo.html#projetos` (D-H3): uma seção nova no catálogo,
  gerada por `scripts/gen-catalogo.mjs` a partir do YAML, com os 4 projetos
  (`natureza: experiencia`) na mesma ordem da home. A seção é uma lista de
  links com a frase curta do YAML, e não cartões, porque cada nó aparece como
  cartão uma só vez, no seu tema (INV-8, `tests/catalogo.gen.test.mjs`). O `id="projetos"` fica no título da seção. Muda `src/catalogo.html`,
  então o espelho `/en/` é regerado (Argos, no notebook).
- **RF-DH-03** — Banner de cookies no celular: no máximo 25 % da altura em
  390 × 844 (hoje: 35 a 40 %). Na primeira visita à home, o nome, a mensagem e
  o subtítulo ficam visíveis acima do banner. A mudança fica nos estilos de
  `src/js/cookie-consent.js`, sem mudar as regras de acessibilidade do banner
  (região não modal, que reserva a própria altura).
- **RF-DH-04** — *bfcache*: a home precisa poder entrar no *bfcache* no Chrome.
  Conferir em DevTools → Application → Back/forward cache. Se um
  `unload`, um `Cache-Control: no-store` ou um script de terceiros impedir,
  corrigir a causa. Não bloqueia a publicação, porque a volta já restaura a
  rolagem e a cena.
- **RF-DH-05** — Boutique alinhada ao resto do site (D-H13, decidida pelo Issei
  em 2026-11-26). Em `src/boutique-empresarial-showcase.html`:
  - fundo `#0d1117` e cartões `#161b22`, como as outras páginas de projeto, no
    lugar de `bg-slate-950` e `bg-slate-900`;
  - só Inter. A Playfair Display sai, e o pedido de fonte fica menor;
  - o acento ciano (`cyan-*`) vira o azul do site (`#58a6ff`). O gradiente
    `#007bff` → `#8a2be2` só aparece onde as outras páginas de projeto o usam;
  - sai a barra própria "Voltar aos Conteúdos": o cabeçalho comum já leva a
    Conteúdos, e as outras páginas de projeto não têm essa barra;
  - o texto e a estrutura não mudam;
  - contraste ≥ 4,5:1 em todo texto, e a catraca de acessibilidade não sobe.

  Muda o HTML da página, então o espelho `/en/` é regerado (Argos, no
  notebook). A captura do cartão da Boutique na home é refeita depois desta
  mudança.

### 5.3 O que não muda

| Ponto | Decisão | Motivo |
| :-- | :-- | :-- |
| Papel no hero da Carreira ("Tech Lead \| Especialista em Análise de Sistemas") | Fica | É o cargo do `cv.json`. O subtítulo da home nomeia as áreas, não o cargo. Os dois são verdadeiros |
| Miniatura em destaque em `/videos` | Fica, por enquanto | A abertura a partir do clique já marca a mudança. Trocar por texto muda o `gen-videos` e os espelhos das fichas |
| Links com fragmento nos cartões (`#pilares`, `#metricas`) | Não entram | O visitante precisa do título do projeto antes do detalhe (RF-VT-40) |

## 6. Critérios de aceite (o teste vem antes do código)

- **CA-49** — Do topo da home (ou pelo link Carreira do cabeçalho) para
  `/curriculo`: `vt-nome` existe em `#hm-nome` na saída e em `#pf-nome` na
  entrada. Nenhum `vt-papel` na home.
- **CA-50** — "Conheça minha história" → `/curriculo`: `vt-retrato` nas duas
  pontas. Nenhum nome quando o destino tem fragmento ou quando o movimento é
  reduzido.
- **CA-51** — Home → cada destino da RF-VT-38: a camada está injetada nas duas
  pontas, com tipo `avanco`; a volta tem tipo `retorno`; nenhum nome
  compartilhado.
- **CA-52** — As regras de pré-busca da home incluem os destinos da RF-VT-38 e
  não têm `prerender`.
- **CA-53** — CLS ≤ 0,1 nos destinos da §3, em 1440 × 900 e 390 × 844
  (Playwright, `PerformanceObserver`, 2,5 s depois do `load`).
- **CA-54** — `/catalogo.html#projetos` existe, tem os 4 projetos, e o clique
  no CTA da home deixa o título da seção no *viewport*.
- **CA-55** — Em 390 × 844, o banner de cookies ocupa no máximo 25 % da altura,
  e o `h1`, a mensagem e o subtítulo da home ficam acima dele.
- **CA-56** — Volta de cada destino: a rolagem da home fica no mesmo ponto
  (± 2 px) e a cena fica igual (diferença de tela ≤ 0,2, exceto na mesa de
  ideias do celular, onde o conteúdo sobe com a rolagem).
- **CA-57** — Com `prefers-reduced-motion: reduce`, nenhuma dessas navegações
  tem View Transition.
- **CA-58** — No celular, o primeiro toque num link da Sessão 03 abre o
  destino quando o link está parado na tela (teste com `scrollIntoView` e
  espera de posição estável).
- **CA-59** — A Boutique não tem `cyan-*`, `slate-950` nem Playfair Display;
  o fundo é `#0d1117`; o primeiro elemento do `main` não é a barra "Voltar aos
  Conteúdos".

## 7. Ordem de implementação

Um PR por linha. A ordem respeita o que a publicação da home precisa.

| # | Conteúdo | Espelho `/en/` | Quando |
| :-- | :-- | :-- | :-- |
| D1 | RF-DH-01 (fonte reserva e CLS) | Não | Antes da home; independente |
| D2 | RF-DH-03 (banner de cookies no celular) | Não | Antes da home; independente |
| D3 | RF-DH-02 (`#projetos` no catálogo) | Sim (catálogo) | Antes da home, porque o CTA aponta para lá |
| D4 | RF-VT-19 revisto, RF-VT-37, RF-VT-38, RF-VT-39 | Não | No mesmo PR da home (H-2 do SDD da home, §14.7), porque os ids da home antiga deixam de existir |
| D5 | RF-DH-04 (*bfcache*) | Depende da causa | Depois da conferência num Chrome comum |
| D6 | RF-VT-40 (cartão → detalhe) | Não | Fase 2, depois do teste de fluidez do Issei |
| D7 | RF-DH-05 (Boutique alinhada ao site, D-H13) | Sim (Boutique) | Antes da home, porque a captura do cartão vem dessa página |

## 8. Riscos

| Risco | Resposta |
| :-- | :-- |
| As transições parecem pesadas no aparelho do Issei | Durações da família `site`; a fase 2 (RF-VT-40) só entra depois do teste dele |
| Os recentes mudam e a família `destinos` fica velha | A lista sai do build (RF-VT-38), nunca da mão |
| A fonte reserva muda a aparência antes da Inter chegar | Os *overrides* deixam a reserva com a largura da Inter; a diferença dura até a fonte chegar |
| O banner menor esconde informação exigida pela LGPD | O texto essencial e o link para a política continuam; muda o arranjo (texto curto e botões na mesma linha) |
