# SDD — Transição imersiva: início → vídeos ("abertura a partir do botão")

> **Status:** especificação (V1). Nenhum código implementado. **Data:** 2026-11-20.
> **Pedido:** "uma micro animação mais elaborada na transição da página principal para a página de vídeos,
> tipo uma vinheta, com sensação de imersão ou aprofundamento" (Issei, 2026-11-20). Entre três propostas
> (A mergulho, B abertura a partir do botão, C vinheta de marca), Issei escolheu **B**.
> **Estende:** [SDD-transicoes-entre-paginas](SDD-transicoes-entre-paginas.md) e
> [SDD-transicoes-site](SDD-transicoes-site.md). Tudo o que elas dizem vale aqui, salvo o que este texto muda.
> Requisitos novos: **RF-VT-24** em diante. Critérios novos: **CA-36** em diante.

## 1. Objetivo

Ao ir da página inicial para `/videos`, a página de vídeos se abre como um círculo que cresce a partir do ponto
em que a pessoa clicou (o botão do canal, com o ícone de play, ou o link "Vídeos" do cabeçalho). A página de
início recua um pouco, como quem fica para trás. A sensação é a de entrar no conteúdo. A animação dura menos
de meio segundo, só roda onde a pessoa não pediu movimento reduzido e nunca atrasa a navegação.

Não se copia a vinheta de nenhum serviço: não há letra, logotipo nem cor nova. O que cresce é a própria página
de destino.

**Fica fora desta SDD:** a volta (`/videos` → início), as outras transições, a proposta C (vinheta de marca)
e qualquer biblioteca de animação.

## 2. Pontos de partida (fatos lidos no código, commit `babf5ce`)

- A home tem o botão `a.pf-btn.pf-btn--yt` (`href="/videos.html"`) com um `svg` de play, e o link "Vídeos" do
  cabeçalho comum. Os dois levam a `/videos.html`.
- Hoje a ida início → `/videos` cruza duas famílias (`site` e `videos`). A SDD do site (RF-VT-23) deixa essa
  navegação sem tipo e sem elemento compartilhado: só a entrada padrão do conteúdo (`vt-entra`).
- `/videos.html` já carrega a camada de transições (família `videos`), então o destino já tem o CSS e o script.
- O cabeçalho já é estático (`vt-cabecalho`) e fica parado.
- A camada atual só anima `opacity` e `transform` (RNF-VT-01). O círculo exige animar `clip-path`: ver R13 e D7.

## 2.1. Revisão (2026-11-20, depois do teste da Issei)

A Issei testou a abertura em círculo: "quase imperceptível, não traz nenhum contraste visual". Ela pediu que a
câmera **mergulhe no ícone de play do botão, passando por dentro do triângulo, para mostrar a página**, com zoom de
**aceleração progressiva**, não linear. Esta revisão acrescenta o tipo `mergulho` (RF-VT-33 a RF-VT-36). O círculo
(RF-VT-26 e RF-VT-27) fica só para o link "Vídeos" do cabeçalho, que não tem ícone. D9 abaixo.

## 3. Requisitos funcionais

- **RF-VT-24** — Novo tipo de transição `imersao`: de `/` (e `/index`) para `/videos`, por qualquer link.
  Fica em `tipoDeTransicao`, em `familias.mjs`, e é testado em Node. Nenhum outro par de rotas recebe o tipo.
- **RF-VT-25** — Ponto de origem. Ao sair, o script guarda em `sessionStorage` (chave `vt-origem`) o ponto do clique em
  pixels. Se o clique veio do teclado (`Enter` num link), o ponto é o centro do elemento ativado. Se o elemento
  ativado contém o ícone de play, o ponto é o centro do ícone. Ao entrar, antes do primeiro quadro, o script
  escreve `--vt-x` e `--vt-y` no elemento raiz. Sem ponto guardado, valem `50%` e `40%`.
- **RF-VT-26** — Entrada (`::view-transition-new(root)` com o tipo `imersao`): `clip-path` vai de
  `circle(0 at var(--vt-x) var(--vt-y))` até um círculo que cobre a tela inteira, com
  `circle(150vmax at var(--vt-x) var(--vt-y))` como fim, em 450 ms e com a curva `--vt-curva`.
- **RF-VT-27** — Saída (`::view-transition-old(root)` com o tipo `imersao`): `transform: scale(1.06)` e
  `opacity` de 1 a 0,6 no mesmo tempo. A página antiga nunca some por inteiro: a nova a cobre por cima, então
  não abre um quadro vazio (lição do D2 da SDD dos vídeos).
- **RF-VT-28** — Limites de segurança. Zoom máximo de 8 % (`scale` até 1,08). Nenhuma piscada: a luminosidade da tela
  não alterna em menos de 1 s (WCAG 2.3.1) e nenhuma cor nova entra. Duração total máxima de 500 ms.
- **RF-VT-29** — `prefers-reduced-motion: reduce` e navegadores sem suporte: nenhuma transição, como hoje.
  Sem `navigation.activation` (Safari 18.2 a 26.1), a origem guardada em `sessionStorage` basta, e o tipo vem
  da regra `imersao` pelas rotas que o script já guarda.
- **RF-VT-30** — Os nomes de transição não mudam: `vt-cabecalho` estático e nenhum nome dinâmico novo.
- **RF-VT-31** — Pré-busca: `/videos.html` entra na lista da família `site` (RF-VT-22), com `prefetch` e nunca
  `prerender`, para a espera da rede não comer a animação.
- **RF-VT-33** — Mergulho. Quando o link ativado contém um `svg` (o botão do canal), o script acrescenta o tipo
  `mergulho` aos de `imersao`, nas duas pontas, e guarda `mergulho|x|y|lado`, onde `(x, y)` é o centroide do triângulo
  do ícone (0,4861 da largura, metade da altura) e `lado` é a largura do ícone. Ao entrar, escreve `--vt-x`,
  `--vt-y` e `--vt-lado`, em px.
- **RF-VT-34** — Com o tipo `mergulho`, a página antiga cresce a partir do centroide (`transform-origin`) e a nova
  aparece só dentro de um triângulo (`clip-path: polygon`) que cresce com os mesmos fatores, então a borda do
  triângulo da página nova coincide com a do furo do ícone. Os vértices valem, em frações do lado, `(-0,0799; 0,1258)`,
  `(-0,0799; -0,1258)` e `(0,1597; 0)` a partir do centroide.
- **RF-VT-35** — Aceleração progressiva: os fatores sobem em paradas cada vez mais espaçadas (1; 1,5; 3; 7; 20; 70; 380;
  3500, em 0, 15, 30, 45, 60, 75, 90 e 100 % do tempo), de modo que a razão entre paradas cresce. O último fator passa
  de 3000 e cobre qualquer tela. Duração de 700 ms, curva linear entre as paradas.
- **RF-VT-36** — Limites, que substituem RF-VT-28 só no mergulho: duração máxima de 800 ms, uma única subida monotônica
  (sem vaivém e sem piscadas), nenhuma cor nova (o vermelho é o do próprio ícone, já na página) e `reduce` desliga tudo.
  O zoom grande é pedido da Issei; quem tem sensibilidade a movimento usa `prefers-reduced-motion`.
- **RF-VT-32** — O plugin continua a só acrescentar tags: nenhum arquivo `src/*.html` PT muda e nenhum espelho
  `/en/` fica velho.

## 4. Requisitos não funcionais

Valem RNF-VT-01 a RNF-VT-10, com **uma exceção medida e limitada**: `clip-path` pode animar, mas só em
`::view-transition-new(root)` e só sob `:active-view-transition-type(imersao)`. O resto da camada continua
com só `opacity` e `transform`. O teste de invariantes do CSS passa a verificar essa regra no lugar de proibir
`clip-path` em tudo. Prefixo `vt-` e nenhum hexadecimal continuam valendo.

## 5. Critérios de aceite (o teste vem antes do código)

| Critério | Verifica | Onde |
|---|---|---|
| **CA-36** | `tipoDeTransicao('/', '/videos')` e `('/index', '/videos')` = `imersao`; `('/videos', '/')` = nulo; `('/curriculo', '/videos')` = nulo | unitário |
| **CA-37** | O CSS usa `clip-path` só dentro de `::view-transition-new(root)` do tipo `imersao`; `scale` ≤ 1,08; `opacity` ≥ 0,6; duração ≤ 500 ms; sem hexadecimal | unitário |
| **CA-38** | Clique no botão do canal: o tipo é `imersao` nas duas pontas e `--vt-x`, `--vt-y` valem o centro do ícone (±2 px) | Chromium |
| **CA-39** | Clique no link "Vídeos" do cabeçalho: tipo `imersao`, origem no centro do link | Chromium |
| **CA-40** | Ativação por teclado (`Enter`): a origem é o centro do elemento focado | Chromium |
| **CA-41** | Sem ponto guardado, `--vt-x` e `--vt-y` valem 50 % e 40 % e a página abre completa | Chromium |
| **CA-42** | Com `prefers-reduced-motion: reduce`, nenhuma transição roda | Chromium |
| **CA-43** | Nenhum `view-transition-name` sobra depois da transição nem no Voltar; o Voltar usa `retorno` comum | Chromium |
| **CA-44** | Firefox e WebKit: a navegação é a de hoje, sem erro no console | gate |
| **CA-45** | Pré-busca com `Sec-Purpose` ao passar o mouse no botão; nenhum `prerender` | Chromium + unitário |
| **CA-46** | `npm run i18n:check` sem diferença | gate |
| **CA-47** | O CSS do mergulho: fundo e triângulo com as mesmas paradas e fatores (a ponta do triângulo = 0,1597 × fator), razão entre paradas crescente, último fator ≥ 3000, duração ≤ 0,8 s | unitário |
| **CA-48** | Botão do canal: tipos `imersao` e `mergulho` nas duas pontas e `--vt-lado` = largura do ícone; link do cabeçalho: só `imersao`, sem `--vt-lado` | Chromium |

## 6. Ordem de implementação

| Etapa | Entrega | Critérios |
|---|---|---|
| V1 | Esta SDD | revisão contra `docs/specs/STYLE_GUIDE.md` |
| V2 | Tipo `imersao` e guarda e leitura da origem, com testes antes | CA-36, CA-38 a CA-41, CA-45, CA-46 |
| V3 | CSS da abertura e do recuo, com a exceção do `clip-path` | CA-37, CA-42, CA-43 |
| V4 | Validação da Issei no aparelho; `A11Y-DECISIONS.md` e `knowledge/` | CA-44; `okf validate knowledge --strict` |

## 7. Riscos

- **R13 — `clip-path` custa mais que `transform`.** A animação de `clip-path` numa camada do tamanho da tela
  pode pesar no processador, e o Chromium da nuvem não tem GPU para medir. Plano B, já decidido: se a Issei
  achar travado, a entrada cai para a proposta A (zoom de entrada de dentro para fora, só `transform` e `opacity`),
  sem nova spec, trocando só o CSS da etapa V3.
- **R14 — enjoo e sensibilidade a movimento.** Zoom grande dá enjoo em quem tem sensibilidade vestibular e
  não ativou o movimento reduzido. Por isso o teto de 8 %, os 450 ms e a ausência de piscadas (RF-VT-28).
- **R15 — origem fora da tela ou página rolada.** Se o ponto guardado cair fora da janela do destino (por
  exemplo o botão estava rolado), o círculo nasce na borda. O CSS limita o ponto à janela com `clamp()`.
- **R16 — clique contado duas vezes.** O ouvinte de `click` já existe (RF-VT-06). A origem usa o mesmo ouvinte.
  Cliques fora de link não guardam nada.
- **R17 — fluidez.** Vale o D2 da SDD dos vídeos: a nuvem não mede fluidez. Quem confirma é a Issei, no aparelho.

## 8. Decisões

- **D6** (Issei, 2026-11-20): seguir a proposta B (abertura a partir do botão) para início → vídeos.
- **D7** (exceção medida, padrão adotado): liberar `clip-path` só neste caso, com plano B na proposta A (R13).
- **D9** (Issei, 2026-11-20): o botão do canal faz o mergulho pelo triângulo do play, com zoom de aceleração progressiva;
  o círculo fica só para o link do cabeçalho. O teto de 8 % de zoom (RF-VT-28) não vale no mergulho (RF-VT-36).
  Plano B se pesar no aparelho: encurtar as paradas altas ou voltar ao círculo.
- **D8** (padrão adotado, a Issei pode mudar): a volta (`/videos` → início) usa a transição comum de retorno, sem
  o círculo ao contrário. Se a ida agradar, a volta é uma etapa à parte.
