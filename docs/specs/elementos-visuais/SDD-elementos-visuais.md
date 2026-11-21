# SDD — Elementos visuais do site (fotos, ícones, diagramas e imagem social)

> **Status:** especificação. Nenhum código implementado. **Data:** 2026-11-21.
> **Pedido (Issei, 2026-11-21):** "Hoje o site não possui fotos ou imagens ou elementos gráficos em sua
> composição visual." Pede uma especificação visual e de design, seção por seção, sem mudar o texto, a
> hierarquia semântica nem a proposta de valor.
> **Escopo:** página inicial (`src/index.html`), o bloco `.pf-hero` que ela divide com `/curriculo`, o
> cabeçalho comum e a imagem social (`og:image`) da página inicial.
> **Fora do escopo:** páginas de conteúdo com estética própria (por exemplo `apresentacao`, `devin`,
> `engenharia-confianca`), as páginas de vídeo (já têm capa) e qualquer mudança de texto.
> **Leitor:** quem implementa (pessoa ou agente) e o Issei, que decide os itens da seção 9.

## 1. Resumo

A página inicial tem hoje zero elementos `<img>`. O visual vem só de CSS (grade, grão e aurora de fundo,
gradientes, o painel de "Provas" em estilo de placar) e de ícones SVG de redes sociais. A imagem social
(`public/og-index.png`) só tem texto.

Esta especificação propõe **cinco ativos**, em ordem de impacto:

1. Um **retrato** no hero, em `<picture>` com AVIF e WebP (seção 4.3).
2. Uma **capa** em cada cartão de "Destaques", feita a partir das imagens sociais que já existem (4.7).
3. Uma **imagem social nova** para a página inicial, com retrato (seção 5).
4. Um **ícone SVG** por tema na lista "Temas" (4.5).
5. Um **diagrama SVG** em "Sobre" (4.4).

As seções "Provas" e "Contato" ficam sem ativo novo, e o motivo está em cada uma.

A paleta continua a Dark Tech (`AGENTS.md`, ADR-pf-001). Os nomes de token que o pedido sugere
(`--bg-primary`, `--accent-primary` etc.) viram **apelidos** dos tokens `--pf-*` que já existem (seção 3),
não uma paleta nova.

## 2. Auditoria do estado atual

### 2.1 Mapa das seções

Os nomes do pedido ("Pilares de Atuação", "Projetos STAR", "Ecossistema") são da home anterior à
reestruturação de novembro de 2026. A tabela liga cada nome do pedido à seção que existe hoje.

| Nome no pedido | Seção atual | Seletor | Origem do HTML | Visual atual |
| :-- | :-- | :-- | :-- | :-- |
| Header/Nav | Cabeçalho comum | `header.sh` | `scripts/gen-cabecalho.mjs` (todas as páginas) | Texto. Sem marca gráfica. |
| — | Navegação da página | `nav.pf-nav` | `scripts/gen-portfolio.mjs` | Barra fixa com desfoque. |
| Hero/Sobre | Hero | `section#home.pf-hero` | `gen-portfolio.mjs` (o mesmo bloco gera o hero de `/curriculo`) | Nome grande, gradientes radiais, botões, ícones sociais. |
| Hero/Sobre | Sobre | `section#about` → `.pf-about` | `gen-portfolio.mjs` | Texto em duas colunas (≥ 1024 px). |
| Pilares de Atuação | Temas | `section#temas` → `ul.pf-temas` | `gen-portfolio.mjs` | Lista de 10 links com contagem. |
| Projetos STAR | Provas | `section#provas` → `ol.pf-provas` | `gen-portfolio.mjs` | Placar com números em amarelo (`--pf-flap`). |
| Ecossistema/Links internos | Destaques | `section#destaques` → `ul.pf-destaques` | `gen-portfolio.mjs` + `specs/ecosystem.nav.yaml` | 4 cartões só de texto. |
| Certificações/Formação | Não está na home | `/curriculo`: `ol.pf-edu`, `.pf-featured` | `gen-portfolio.mjs` | Cartões e "bilhetes". |
| Footer | Contato | `footer#contact.pf-footer` | `gen-portfolio.mjs` | E-mail, ícones sociais, links legais. |
| — | Fundo | `div.pf-ambient` | `src/index.html` | Grade técnica, grão SVG e aurora animada. |

### 2.2 Achados

| Id | Achado | Efeito |
| :-- | :-- | :-- |
| AU-01 | A home não tem `<img>`, `<picture>` nem `<figure>`. | Nenhuma imagem para LCP, pessoas ou agentes. |
| AU-02 | `src/foto1.png` (1254 × 1254, 2,2 MB) e `src/foto2.png` (768 × 1344, 0,7 MB) estão no repositório, sem uso. | São retratos do Issei. Servem de base para o retrato, mas não no formato atual (seção 9, D-EV-1). |
| AU-03 | `foto2.png` tem uma marca de IA no canto inferior direito. `foto1.png` tem fundo claro de escritório. | A marca não pode ir para o site. O fundo claro destoa do tema escuro. |
| AU-04 | `public/og-index.png` (1200 × 630, 169 KB) só tem texto. As outras 36 páginas têm `og-<página>.png`. | A prévia em redes e mensageiros não mostra a pessoa. As imagens das outras páginas servem de capa (4.7). |
| AU-05 | O JSON-LD `Person` (`#author`) não tem a propriedade `image`. | Buscadores e agentes não ligam um rosto ao nome. |
| AU-06 | `public/favicon.svg` usa `#192A56`, cor fora da paleta Dark Tech. | Marca do site sem relação com os tokens. Ver 4.1. |
| AU-07 | `sharp` já é dependência de desenvolvimento (`scripts/gen-favicons.mjs`). `scripts/gen-og-engenharia-confianca.mjs` gera imagem social com o Chromium do Playwright. | O pipeline de imagens não precisa de dependência nova. |

## 3. Tokens de design

### 3.1 Princípio

O `AGENTS.md` define a paleta Dark Tech como regra ("DO NOT DEVIATE"), e o ADR-pf-001 já registra a
paleta da home em `src/index.css`. Por isso, esta especificação **não cria cores**. Ela:

- dá aos tokens existentes os nomes semânticos que o pedido usa, como apelidos;
- escolhe **um** tom de destaque para todos os ativos novos: `--pf-link` (`#58a6ff`). O gradiente
  `#007bff → #8a2be2` continua só onde já existe (botão principal e traço sob o `h2`);
- acrescenta tokens de raio, sombra e imagem, que hoje são valores soltos no CSS.

### 3.2 Cores (apelidos)

Contrastes medidos com a fórmula WCAG 2.2, o mesmo cálculo de `tests/_helpers/contrast.mjs`.

| Apelido novo | Token atual | Valor | Contraste sobre `--pf-bg` | Uso nos ativos |
| :-- | :-- | :-- | :-- | :-- |
| `--bg-primary` | `--pf-bg` | `#0d1117` | — | Fundo da página e do retrato. |
| `--bg-surface` | `--pf-surface` | `#161b22` | 1,1:1 | Fundo de cartão e de moldura. |
| `--bg-surface-2` | `--pf-surface-2` | `#1c2330` | — | Caixas do diagrama. |
| `--text-primary` | `--pf-strong` | `#ffffff` | 18,9:1 | Títulos; texto dentro de SVG. |
| `--text-body` | `--pf-text` | `#c9d1d9` | 12,3:1 | Traço principal dos ícones. |
| `--text-secondary` | `--pf-muted` | `#8b949e` | 6,2:1 | Ícones em repouso; legendas. |
| `--accent-primary` | `--pf-link` | `#58a6ff` | 7,5:1 | Único destaque dos ativos novos. |
| `--border-subtle` | `--pf-border` | `#30363d` | 1,6:1 | Moldura de imagem. Só decoração. |

Regra: todo traço de SVG que **carrega informação** (diagrama) tem contraste de pelo menos 3:1 com o
fundo (WCAG 1.4.11). Isso exclui `--pf-border` como cor de traço informativo.

Implementação: os apelidos ficam em `src/index.css`, dentro do `:root` existente, no formato
`--accent-primary: var(--pf-link);`. Nenhum hexadecimal novo. `tests/portfolio.tokens.test.mjs` continua
válido sem mudança.

### 3.3 Tipografia (registro do que existe)

Fonte única: Inter (Google Fonts, pesos 400 a 800). A tabela registra os valores de `src/index.css`; a
especificação não os muda.

| Papel | Seletor | Tamanho | Peso | Outros |
| :-- | :-- | :-- | :-- | :-- |
| Nome (h1) | `.pf-hero h1` | `clamp(2.6rem, 7.5vw, 5.5rem)` | 800 | `line-height: 1`, `letter-spacing: -.04em` |
| Papel | `.pf-hero-title` | `clamp(1.125rem, 2.4vw, 1.5rem)` | 500 | cor `--pf-subtitle` |
| Título de seção (h2) | `.pf-h2` | `clamp(1.75rem, 4vw, 2.5rem)` | 700 | traço em gradiente de 3,5 rem |
| Título de cartão (h3) | `.pf-destaque h3` | `1.1rem` | 600 a 700 | — |
| Corpo | `body` | `1rem` | 400 | `line-height: 1.65` |
| Sobretítulo | `.pf-eyebrow` | `.8rem` | 600 | maiúsculas, `letter-spacing: .14em` |
| Legenda de imagem (novo) | `.pf-figcap` | `.8rem` | 400 | cor `--pf-muted` |

Texto dentro de SVG usa `font-family: Inter, system-ui, sans-serif` e no mínimo 14 px no tamanho de
exibição.

### 3.4 Raio, sombra e imagem (tokens novos)

Os valores vêm do CSS atual. Os tokens só dão nome a eles.

| Token novo | Valor | Onde já aparece hoje |
| :-- | :-- | :-- |
| `--pf-radius-sm` | `8px` | `.pf-skip` |
| `--pf-radius-md` | `10px` | `.pf-btn`, `.pf-facts div` |
| `--pf-radius-lg` | `14px` | `.pf-destaque`, `.pf-edu li` |
| `--pf-radius-xl` | `16px` | `.pf-board` |
| `--pf-shadow-hover` | `0 8px 24px rgba(0, 123, 255, .15)` | `.pf-destaque:hover` |
| `--pf-glow` | `0 0 16px rgba(88, 166, 255, .35)` | `.pf-social a:hover` |
| `--pf-img-ring` | `0 0 0 1px var(--pf-border)` | novo: moldura de imagem |
| `--pf-img-bg` | `var(--pf-surface)` | novo: fundo enquanto a imagem carrega |

Espaçamento: o site usa `rem` e a escala existente (`.5`, `.75`, `1`, `1.25`, `1.5`, `2`, `3`, `4`, `6`
rem). Os ativos novos usam só esses valores.

### 3.5 Regras de imagem comuns

- **R-IMG-01** — Todo `<img>` tem `width`, `height` e `alt`. A proporção do CSS (`aspect-ratio`) é igual à
  dos atributos. Meta: CLS 0 nas seções com imagem.
- **R-IMG-02** — Só o retrato do hero usa `fetchpriority="high"` e `loading="eager"`. Os outros usam
  `loading="lazy"` e `decoding="async"`.
- **R-IMG-03** — Formatos: AVIF primeiro, WebP como alternativa, dentro de `<picture>`. SVG para ícones,
  diagramas e marca. Nenhum PNG ou JPEG novo na página.
- **R-IMG-04** — Fotos passam por `sharp` sem metadados (EXIF e GPS removidos).
- **R-IMG-05** — Nenhuma imagem de banco de imagens e nenhum logotipo de marca de terceiros (Salesforce,
  AWS etc.). Nomes de produto aparecem como texto. Exceção: os badges oficiais das certificações (4.9, D-EV-4).
- **R-IMG-06** — Nenhum ativo novo usa animação que comece com `opacity: 0` em imagem acima da dobra. A
  imagem que é LCP só conta quando fica visível; uma animação de entrada a partir de zero atrasa o LCP.
- **R-IMG-07** — Toda animação nova (hover, entrada) fica sob
  `@media (prefers-reduced-motion: no-preference)`.
- **R-IMG-08** — Imagens vêm do mesmo domínio. Nenhum CDN de imagem novo e nenhuma requisição a
  terceiros: o consentimento de cookies e o GTM não mudam.

## 4. Especificação por seção

### 4.1 Cabeçalho comum (`header.sh`)

**Identificação.** `header.sh > .sh-in`, gerado por `scripts/gen-cabecalho.mjs` em todas as páginas.

**Decisão: sem ativo novo nesta fase.** Uma marca gráfica ao lado do nome muda todas as páginas, e
portanto todos os espelhos `/en/`, que só o tradutor local (Argos, na máquina do Issei) atualiza. O ganho
visual é pequeno perto desse custo.

**Fase posterior (opcional).** Um monograma "MI" em SVG inline de 28 × 28 px antes de `.sh-marca`, com
`aria-hidden="true"` (o texto do link já nomeia o site), em `--pf-strong` sobre `--pf-surface-2`, raio
`--pf-radius-sm`. O mesmo desenho substitui `public/favicon.svg` e corrige o AU-06. Quando vier, entra
junto com outra mudança de cabeçalho que já exija nova sincronização `/en/`.

### 4.2 Navegação da página (`nav.pf-nav`)

Sem ativo. É uma barra de links de âncora; uma imagem ali só ocupa espaço.

### 4.3 Hero (`section#home.pf-hero`) — retrato

**Identificação.** `section#home.pf-hero > .pf-wrap`. O mesmo bloco aparece em `/curriculo`. As duas
versões saem de `scripts/gen-portfolio.mjs` (funções nas linhas 99 e 387 na data desta especificação).

**Layout.**

```css
/* ≥ 1024 px: texto à esquerda, retrato à direita */
@media (min-width: 1024px) {
  .pf-hero .pf-wrap {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr);
    gap: 3rem;
    align-items: center;
  }
  .pf-hero-retrato { max-width: 26rem; justify-self: end; }
}
/* < 1024 px: uma coluna; o retrato vira um avatar acima do sobretítulo */
@media (max-width: 1023px) {
  .pf-hero .pf-wrap { display: flex; flex-direction: column; }
  .pf-hero-retrato { order: -1; width: 6rem; margin-bottom: 1.25rem; }
  .pf-hero-retrato img { border-radius: 50%; aspect-ratio: 1; object-fit: cover; object-position: 50% 30%; }
}
```

- No DOM, o `<figure>` vem **depois** do bloco de texto, para que o leitor de tela ouça o nome primeiro.
  No celular, `order: -1` só muda a posição visual. A imagem não é interativa, então a ordem de foco não
  muda (WCAG 1.3.2 e 2.4.3).
- O gerador passa a envolver o texto do hero em `<div class="pf-hero-texto">`. O conteúdo do texto não
  muda.

**Ativo visual.**

- *Tipo:* fotografia de retrato.
- *Descrição:* busto, do meio do peito para cima, rosto em três quartos, olhar para a câmera ou levemente
  para o lado. Fundo escuro e liso, perto de `#0d1117`, para a foto se fundir com a página sem recorte.
  Luz lateral suave de um lado, sombra do outro. Roupa escura e lisa. Cor natural com saturação baixa, ou
  preto e branco. Nenhuma marca, texto ou logotipo na imagem.
- *Fonte:* foto real nova (D-EV-1, decidido pelo Issei em 2026-11-21). O Issei enviou a foto em
  2026-11-21: 1824 × 2338, busto, sorrindo, óculos, blazer azul e camiseta preta, diante de um painel
  iluminado em azul e magenta. A pedido do Issei, o fundo foi suavizado: a pessoa foi separada do fundo
  (modelo de recorte BiRefNet-portrait, rodado localmente), e o fundo ficou desfocado, quase sem cor e
  escurecido em direção a `#0d1117`. A pessoa não foi alterada. Recorte 4:5: `x 195–1795, y 150–2150`.
  `alt` confirmado pelo Issei em 2026-11-21 e ajustado ao fundo novo: "Maurício Yokoyama Issei sorrindo,
  de óculos, blazer azul e camiseta preta, sobre fundo escuro."
- *Fotos antigas:* `foto2.png` tem o enquadramento e a luz certos, mas tem a marca de IA (AU-03).
- *Briefing para fotógrafo (referência para uma foto futura; não é prompt de geração):* "Retrato de busto, proporção 4:5, fundo preto liso
  a 1,5 m da pessoa, uma luz principal suave a 45° e rebatedor fraco do outro lado, camisa ou camiseta
  escura lisa, expressão serena e confiante, foco nos olhos, arquivo RAW ou JPEG em resolução máxima."
- *Prompt de geração:* não se aplica. O retrato representa uma pessoa real, então a fonte é uma
  fotografia dela. Um rosto gerado por IA apresentado como retrato contradiz a regra editorial do site
  ("engenharia, não marketing").

**Implementação.**

| Item | Valor |
| :-- | :-- |
| Origem | `assets-fonte/retrato.<ext>` (fora de `public/`, não é publicado) |
| Saída | `public/img/retrato-{192,480,960}.{avif,webp}` |
| Proporção | 4:5 (`width="480" height="600"` no `<img>`) |
| Peso máximo | 480 w: AVIF ≤ 35 KB, WebP ≤ 55 KB. 960 w: AVIF ≤ 90 KB |
| Recorte do avatar | quadrado central, `object-position: 50% 30%` |

```html
<figure class="pf-hero-retrato">
  <picture>
    <source type="image/avif"
            srcset="/img/retrato-192.avif 192w, /img/retrato-480.avif 480w, /img/retrato-960.avif 960w"
            sizes="(min-width: 1024px) 26rem, 6rem">
    <source type="image/webp"
            srcset="/img/retrato-192.webp 192w, /img/retrato-480.webp 480w, /img/retrato-960.webp 960w"
            sizes="(min-width: 1024px) 26rem, 6rem">
    <img src="/img/retrato-480.webp" width="480" height="600"
         alt="Maurício Yokoyama Issei sorrindo, de óculos, blazer azul e camiseta preta, sobre fundo escuro."
         fetchpriority="high" loading="eager" decoding="async">
  </picture>
</figure>
```

```css
.pf-hero-retrato { margin: 0; }
.pf-hero-retrato img {
  display: block; width: 100%; height: auto; aspect-ratio: 4 / 5;
  border-radius: var(--pf-radius-xl); background: var(--pf-img-bg);
  box-shadow: var(--pf-img-ring);
  /* fusão com o fundo: a borda inferior some no --pf-bg */
  -webkit-mask: linear-gradient(#000 80%, transparent);
          mask: linear-gradient(#000 80%, transparent);
}
```

- `alt`: classificação **informativa** (mostra quem é a pessoa). O texto final depende da foto escolhida
  e passa pelo Passo 3 do guia de imagens (`docs/a11y/references/guide-images.md`): a classificação foi confirmada (D-EV-2); o texto final é confirmado com a foto.
- Não use `<figcaption>`: o nome já está no `h1` logo ao lado.
- Pré-carregamento: não é preciso `<link rel="preload">`. O `<picture>` fica no HTML inicial e o
  `fetchpriority="high"` basta.

**Compatibilidade com outros trabalhos.**

- *Transições (`docs/specs/transicoes/SDD-transicoes-site.md`, RF-VT-19):* o nome e o papel já são
  compartilhados entre Início e Carreira (`vt-nome`, `vt-papel`). Como o hero é o mesmo bloco nas duas
  páginas, o retrato aparece nas duas, no mesmo lugar. Um nome `vt-retrato` pode entrar depois, como
  requisito novo naquela SDD; esta especificação não o exige.
- *Efeitos de entrada (Animate.css, outra frente):* o retrato pode entrar com deslocamento curto
  (`translateY` ou `scale` de 0,98 a 1), **sem** partir de `opacity: 0` (R-IMG-06).
- *Aurora de fundo:* fica como está. O retrato fica na camada do conteúdo, acima de `.pf-ambient`.

**JSON-LD.** Acrescentar `"image": "https://mauricio.issei.com.br/img/retrato-960.webp"` ao `Person`
(`#author`), no gerador que escreve o JSON-LD. Isso corrige o AU-05.

### 4.4 Sobre (`section#about`) — diagrama

**Identificação.** `section#about > .pf-wrap > .pf-about`.

**Layout.** Em ≥ 1024 px, `.pf-about` deixa as duas colunas de texto (`columns: 2`) e passa a uma grade
`grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr)`: texto à esquerda, diagrama à direita, alinhado
ao topo. Abaixo de 1024 px, o diagrama vem depois do texto, com largura máxima de 28 rem.

**Ativo visual.**

- *Tipo:* diagrama SVG inline.
- *Descrição:* representa só o que o texto já diz: experiência em Salesforce, AWS e APIs e trabalho de
  integração de plataformas. Três caixas com raio `--pf-radius-md`, fundo `--pf-surface-2`, borda
  `--pf-muted` 1,5 px e rótulo em texto (`Salesforce`, `APIs`, `AWS`), sem logotipos (R-IMG-05). `APIs` fica
  no centro; linhas de 1,5 px em `--pf-link` ligam as outras duas a ela. Um rótulo pequeno em
  `--pf-muted` sob o centro diz "integração". Sem sombra, sem gradiente, sem animação.
- *Prompt de rascunho (opcional, para esboço antes do SVG à mão):* "Diagrama técnico minimalista em SVG,
  fundo #0d1117, três retângulos de cantos arredondados alinhados na horizontal com os rótulos
  'Salesforce', 'APIs' e 'AWS' em fonte Inter branca, o do meio ligado aos outros por linhas finas
  #58a6ff, sem ícones, sem logotipos, sem gradientes, estilo de documentação de arquitetura."

**Implementação.**

```html
<figure class="pf-about-diagrama">
  <svg viewBox="0 0 480 200" width="480" height="200" role="img" aria-labelledby="dg-sobre-t">
    <title id="dg-sobre-t">Salesforce e AWS ligados por uma camada de APIs: a integração de plataformas descrita no texto.</title>
    <!-- 3 <rect>, 2 <line>, 4 <text>; cores por currentColor e var(--pf-*) -->
  </svg>
</figure>
```

- Arquivo-fonte: `src/img/sobre-integracao.svg`, inserido inline pelo `gen-portfolio.mjs` (sem requisição
  extra; ~1,5 KB).
- O texto dentro do SVG não muda o texto da página: são os mesmos termos. O `title` é **informativo** e
  vai para o espelho `/en/` pelo Argos, como qualquer texto.
- Prioridade baixa (seção 8): o ganho é menor que o do retrato e o das capas, e o diagrama repete o texto.

### 4.5 Temas (`section#temas`) — ícones

**Identificação.** `section#temas > ul.pf-temas > li`.

**Layout.** O ícone entra dentro do link, antes do nome:
`a { display: inline-flex; align-items: center; gap: .6rem; }`. A grade de 1 ou 2 colunas não muda.

**Ativo visual.**

- *Tipo:* conjunto de 10 ícones de linha, monocromáticos.
- *Estilo:* grade de 24 × 24, traço de 1,5 px, pontas e junções arredondadas, sem preenchimento,
  `stroke="currentColor"`. Cor em repouso `--pf-muted`; no `:hover` e no `:focus-visible` do link,
  `--pf-link`.

| Tema (slug) | Desenho |
| :-- | :-- |
| `engenharia-agentica` | Um nó central ligado a três nós menores (orquestrador e ferramentas). |
| `gestao-e-estrategia` | Alvo com três anéis e uma seta no centro. |
| `especificacao-e-desenvolvimento` | Folha de documento com `{ }` no corpo. |
| `salesforce-e-vendas` | Funil de três faixas. |
| `cloud-e-confiabilidade` | Nuvem com marca de verificação dentro. |
| `aprendizagem-e-mente` | Livro aberto. |
| `tecnologia-e-cultura` | Dois balões de diálogo sobrepostos. |
| `dados-e-decisao` | Três barras de altura crescente e uma seta que bifurca. |
| `ferramentas-de-ia` | Chave de boca com uma faísca de quatro pontas. |
| `acessibilidade-e-design` | Símbolo de acessibilidade universal (pessoa de braços abertos num círculo). |

- *Prompt de rascunho (opcional):* "Conjunto de 10 ícones de linha, grade 24x24, traço 1.5px, pontas
  arredondadas, sem preenchimento, monocromáticos, estilo consistente com Lucide/Feather, temas: [lista
  acima]". O SVG final é desenhado ou ajustado à mão e revisado por uma pessoa.

**Implementação.**

- Arquivos: `src/img/temas/<slug>.svg`, um por tema. O `gen-portfolio.mjs` insere o SVG inline (~300 B
  cada, ~3 KB no total). O gerador falha se faltar ícone para um tema.
- Atributos: `aria-hidden="true" focusable="false" width="20" height="20"`.
- `alt`: classificação **decorativa** (o nome do tema está no texto do link; remover o ícone não tira
  informação). Confirmado pelo Issei em 2026-11-21 (D-EV-2).
- Os mesmos arquivos servem depois às páginas `/temas/*` e às prateleiras de `/videos`, fora deste escopo.

### 4.6 Provas (`section#provas`)

**Identificação.** `section#provas > ol.pf-provas`.

**Decisão: sem ativo novo.** O placar com os números em amarelo já é o elemento gráfico da seção, e os
números são o conteúdo. Uma imagem ou ícone por prova competiria com eles. Cada prova tem um número só,
então um gráfico não teria o que comparar.

### 4.7 Destaques (`section#destaques`) — capas

**Identificação.** `section#destaques > ul.pf-destaques > li.pf-destaque`. Os 4 cartões vêm de
`specs/ecosystem.nav.yaml` pelo `gen-portfolio.mjs`.

**Layout.** A grade de cartões não muda. A capa entra no topo do cartão, de borda a borda:
`.pf-destaque { padding: 0; overflow: hidden; }` com o texto em `.pf-destaque-corpo { padding: 1.25rem; }`.

**Ativo visual.**

- *Tipo:* capa derivada da imagem social da página de destino.
- *Descrição:* reduzir o `og-<página>.png` que já existe (por exemplo `og-agent-ready.png`,
  `og-engenharia-agentes-ia.png`, `og-knowledge-os-presentation.png`, `og-acessibilidade.png`). Nenhum
  desenho novo: o leitor reconhece a mesma imagem quando a página é compartilhada.
- *Prompt:* não se aplica.

**Implementação.**

| Item | Valor |
| :-- | :-- |
| Origem | o arquivo do `og:image` da página de destino; o gerador lê a meta da página em `src/` |
| Saída | `public/img/capas/<página>-{320,640}.{avif,webp}` |
| Proporção | 1200:630 (`width="640" height="336"`) |
| Peso máximo | 640 w: AVIF ≤ 30 KB, WebP ≤ 45 KB |

```html
<li class="pf-destaque">
  <picture>
    <source type="image/avif" srcset="/img/capas/agent-ready-320.avif 320w, /img/capas/agent-ready-640.avif 640w"
            sizes="(min-width: 768px) 20rem, 100vw">
    <source type="image/webp" srcset="/img/capas/agent-ready-320.webp 320w, /img/capas/agent-ready-640.webp 640w"
            sizes="(min-width: 768px) 20rem, 100vw">
    <img class="pf-destaque-capa" src="/img/capas/agent-ready-640.webp" width="640" height="336"
         alt="" loading="lazy" decoding="async">
  </picture>
  <div class="pf-destaque-corpo">
    <p class="pf-destaque-tag">…</p>
    <h3><a href="./agent-ready.html">Agent Ready</a></h3>
    <p>…</p>
  </div>
</li>
```

- A capa **não** é link. O único link do cartão continua o do `h3`, para não criar uma segunda parada
  de tabulação para o mesmo destino.
- `alt=""`: a imagem social de cada página mostra o título dessa página, que já está no `h3`. Um `alt`
  descritivo faria o leitor de tela ler o título duas vezes. Isso diverge do pedido ("todo ativo com
  `alt` descritivo"); o Issei confirmou a classificação em 2026-11-21 (D-EV-2), como pede o guia de imagens.
- Hover: a capa ganha `transform: scale(1.03)` em 0,3 s, sob `no-preference` (R-IMG-07).
- O gerador falha em dois casos: a página de destino não tem `og:image`, ou o arquivo dessa imagem não existe.

### 4.8 Contato (`footer#contact.pf-footer`)

**Decisão: sem ativo novo.** O rodapé já tem os ícones sociais em SVG. Repetir o retrato ali não acrescenta
informação.

### 4.9 Carreira: formação e certificações (`/curriculo`)

**Decisão: badge oficial em cada certificação que tem um** (pedido do Issei em 2026-11-21, D-EV-4). Isso
abre uma exceção a R-IMG-05 só para esta seção: o badge é a imagem que o emissor entrega ao titular para
mostrar a credencial, e não um logotipo usado como decoração.

- Fonte: a imagem do badge na página de verificação da credencial (`Verificacao` no `cv.json`). Os arquivos
  originais ficam em `assets-fonte/badges/`; `assets-fonte/badges/fontes.json` lista, para cada um, o nome,
  o ano, o arquivo e o endereço de origem, e também as credenciais sem badge (pulados, com o motivo).
- Saída: `public/img/badges/<slug>-{72,144}.{avif,webp}`, quadrada, com o selo inteiro sobre fundo
  transparente (`fit: contain`). Teto de 12 KB (AVIF) e 20 KB (WebP) em 144 px. Gerada por
  `scripts/gen-imagens.mjs`; o site serve a imagem, sem pedir nada ao Credly (R-IMG-08).
- `slug` = nome da certificação sem acentos e símbolos, mais o ano, porque o mesmo nome aparece em anos
  diferentes (`arquitetura-de-solucoes-2022`, `arquitetura-de-solucoes-2024`).
- Posição: canto superior direito do bilhete, 3,25 rem; 4,5 rem nos bilhetes em destaque. O texto do
  bilhete ganha margem à direita para não passar por baixo do selo.
- `alt=""` e `loading="lazy"`: o nome da certificação e o emissor já estão em texto no bilhete
  (mesmo critério das capas, D-EV-2). O badge não é link; o único link continua "Verificar".
- Certificação sem badge (PDF de certificado, curso sem selo) fica como hoje, sem imagem.
- `gen-portfolio.mjs` falha se um badge de `fontes.json` não corresponde a nenhuma certificação do `cv.json`.

## 5. Imagem social (`og:image`) da página inicial

**Arquivo.** `public/og-index.png`, 1200 × 630, PNG (redes e mensageiros nem sempre aceitam AVIF ou WebP
no `og:image`). Peso ≤ 200 KB. As metas `og:image:width`, `og:image:height` e `og:image:alt` já existem e
continuam.

**Layout.**

```text
┌──────────────────────────────────────────────── 1200 ─────────────────────────────────┐
│ 72 px de margem                                                                         │
│  TECH LEAD · ESPECIALISTA EM ANÁLISE DE SISTEMAS        ┌────────────────────────────┐ │
│  (Inter 600, 24 px, #58a6ff, caixa alta, .14em)         │                            │ │
│                                                         │   retrato 4:5              │ │
│  Maurício                                               │   400 × 500 px             │ │
│  Yokoyama Issei                                         │   fundo funde no #0d1117   │ │
│  (Inter 800, 88 px, #ffffff, 2 linhas)                  │   máscara inferior         │ │
│                                                         │                            │ │
│  20+ anos: Salesforce, AWS e APIs                       │                            │ │
│  (Inter 500, 32 px, #8b949e)                            └────────────────────────────┘ │
│                                                                                         │
│  ───── 3 px, gradiente #007bff → #8a2be2, 120 px                                        │
│  mauricio.issei.com.br (Inter 500, 24 px, #8b949e)                                      │
└─────────────────────────────────────────────────────────────────────────────────── 630 ┘
```

- Fundo `#0d1117` com os mesmos dois gradientes radiais do `.pf-hero::before`.
- Retrato à direita, 400 × 500, a 72 px da borda direita, centrado na vertical.
- Texto à esquerda, em coluna de no máximo 620 px. O texto é o atual da imagem: nenhuma frase nova.
- Zona segura: nada essencial fora do retângulo central de 1080 × 566 px (corte de algumas redes).
- Sem retrato (se D-EV-1 for "sem foto"): a imagem atual continua.

**Geração.** Novo `scripts/gen-og-index.mjs`, no mesmo padrão de `gen-og-engenharia-confianca.mjs`
(HTML renderizado no Chromium do Playwright e captura de tela), com o retrato de `public/img/` embutido.

**`og:image:alt`.** Fica o texto atual: "Maurício Yokoyama Issei — Tech Lead | Salesforce, AWS, APIs".

## 6. Pipeline de ativos

| Etapa | Ferramenta | Comando |
| :-- | :-- | :-- |
| Fotos e capas → AVIF/WebP | `sharp` (já instalado) | `node scripts/gen-imagens.mjs` (novo) |
| Imagem social | Playwright (já instalado) | `node scripts/gen-og-index.mjs` (novo) |
| Ícones e diagrama | SVG à mão em `src/img/` | inseridos pelo `gen-portfolio.mjs` |

- `gen-imagens.mjs` lê `assets-fonte/` e os `og-*.png` dos destaques, grava em `public/img/` e tem modo
  `--check` (falha se a saída estiver velha), no padrão dos outros geradores.
- `npm run gate` passa a rodar `gen-imagens.mjs --check`.
- Os arquivos em `public/img/` vão para o repositório (o deploy só copia `public/`).

**Espelho `/en/`.** O HTML de `index.html` e `curriculo.html` muda (retrato, capas, ícones, diagrama),
então os espelhos `/en/` precisam do `npm run i18n:sync`, que roda na máquina do Issei. Os textos que o
Argos traduz são o `alt` do retrato e o `title` do diagrama.

## 7. Requisitos e critérios de aceite

| Id | Requisito | Verificação |
| :-- | :-- | :-- |
| RF-EV-01 | O hero de `/` e de `/curriculo` mostra o retrato em `<picture>` com AVIF e WebP, `width`, `height`, `alt` e `fetchpriority="high"`. | `tests/index.spec.js`, `tests/curriculo.spec.js` |
| RF-EV-02 | Em ≥ 1024 px, o retrato fica à direita do texto; em < 1024 px, é um avatar circular de 6 rem acima do sobretítulo. | Playwright, 1280 e 390 px |
| RF-EV-03 | O nome (`h1`) vem antes do retrato na ordem do DOM. | Playwright |
| RF-EV-04 | Cada cartão de "Destaques" tem a capa da página de destino, com `loading="lazy"`; o cartão tem um único link. | Playwright |
| RF-EV-05 | Cada tema tem um ícone SVG inline com `aria-hidden="true"`; o gerador falha se faltar um. | `gen-portfolio.mjs --check` |
| RF-EV-06 | O diagrama de "Sobre" é SVG inline com `role="img"` e `<title>`. | Playwright |
| RF-EV-07 | O JSON-LD `Person` tem `image`. | `tests/index.spec.js` |
| RF-EV-08 | `og-index.png` segue o layout da seção 5 e tem 1200 × 630. | teste de dimensões |
| RF-EV-09 | Cada bilhete de certificação listada em `fontes.json` mostra o badge em `<picture>` AVIF e WebP, com `alt=""`, `loading="lazy"` e 72 × 72; os demais bilhetes não têm imagem. | Playwright |
| RNF-EV-01 | CLS = 0 nas seções com imagem; LCP ≤ 2,5 s em 4G simulado. | Lighthouse local |
| RNF-EV-02 | Pesos máximos das seções 4.3 e 4.7. | `gen-imagens.mjs --check` |
| RNF-EV-03 | A catraca de acessibilidade (`tests/a11y/baseline.json`) não sobe. | `npm run gate` |
| RNF-EV-04 | Nenhum hexadecimal novo em `src/index.css`; `tests/portfolio.tokens.test.mjs` passa sem mudança. | teste existente |
| RNF-EV-05 | Nenhuma requisição a outro domínio para imagens. | Playwright (rede) |
| RNF-EV-06 | Sem JS, a página mostra todas as imagens (nada depende de script). | `tests/index.nojs.spec.js` |

## 8. Checklist de implementação (por impacto e facilidade)

| Ordem | Item | Impacto visual | Esforço | Depende de |
| :-- | :-- | :-- | :-- | :-- |
| 1 | Apelidos e tokens novos em `src/index.css` (seção 3) | baixo | muito baixo | — |
| 2 | Capas dos Destaques a partir dos `og-*.png` (4.7) | alto | baixo | D-EV-2 |
| 3 | Retrato no hero + `image` no JSON-LD (4.3) | muito alto | médio | D-EV-1, D-EV-2 |
| 4 | Imagem social nova com retrato (5) | alto (fora do site) | baixo | item 3 |
| 5 | Ícones dos temas (4.5) | médio | médio | D-EV-2 |
| 6 | Diagrama de "Sobre" (4.4) | baixo | baixo | — |
| 7 | Remover `src/foto1.png` e `src/foto2.png` do repositório depois de gerar o retrato | — | muito baixo | item 3 |
| 8 | Monograma no cabeçalho e no favicon (4.1) | baixo | médio | próxima mudança de cabeçalho |
| 9 | Badges das certificações em `/curriculo` (4.9) | médio | baixo | D-EV-4 |

Cada item é um PR. Os itens 2, 3, 5 e 6 mudam HTML em português, então cada um precisa do espelho `/en/`
antes do merge.

## 9. Decisões do Issei

Uma pergunta por vez, nesta ordem.

| Id | Pergunta | Opções | Recomendação |
| :-- | :-- | :-- | :-- |
| D-EV-1 | Qual foto vai no retrato? | (a) foto real nova com o briefing de 4.3; (b) `foto2.png`, se existir versão sem a marca de IA; (c) `foto1.png` com fundo escurecido; (d) sem foto: só capas, ícones e diagrama | **Decidido (Issei, 2026-11-21): (a)** foto real nova, feita com o briefing de 4.3 |
| D-EV-2 | Confirma a classificação de acessibilidade? Retrato informativo com `alt` descritivo; capas e ícones decorativos com `alt=""` / `aria-hidden`; diagrama informativo com `title`. | sim / ajustar caso a caso | **Decidido (Issei, 2026-11-21): sim**, como proposto. Registrar no `A11Y-DECISIONS.md` na implementação |
| D-EV-4 | Mostrar os badges oficiais das certificações em `/curriculo`? | sim / selo genérico em SVG / sem selo | **Decidido (Issei, 2026-11-21): sim**, os badges oficiais (seção 4.9) |
| D-EV-3 | Os ativos novos usam um destaque só (`#58a6ff`) dentro da paleta atual, em vez de um ciano ou esmeralda novo? | manter a paleta / abrir exceção | **Decidido (Issei, 2026-11-21): manter**, um destaque só (`#58a6ff`) |

## 10. Referências

- `AGENTS.md` — guardrails de design e exceções registradas.
- `docs/specs/pages/portfolio/ADR-pf-001-paleta-de-linhas.md` — paleta da home.
- `docs/specs/ASSETS_GUIDE.md` — formatos e pesos de mídia.
- `docs/a11y/references/guide-images.md` — classificação de imagens e `alt`.
- `docs/specs/transicoes/SDD-transicoes-site.md` — `vt-nome` e `vt-papel` no hero.
- `docs/specs/SEO_ANALYTICS.md` — metas sociais e consentimento.
