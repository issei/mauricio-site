---
id: sdd-nova-home
titulo: SDD — Nova página inicial "O pensamento em prática"
data: 2026-11-24
status: especificação (nada implementado)
leitor: Issei (decisões) e quem implementar a home
padrao_de_redacao: ptbr-controlado (perfil Técnico)
pedido: Issei, 2026-11-24 (thread "Planejar página cinematográfica da trajetória")
---

# SDD — Nova página inicial: "O pensamento em prática"

> **Estado:** especificação. Nada foi implementado nem gerado. O documento
> segue as três etapas pedidas: diagnóstico (§1), especificação (§2 a §8) e
> validação (§9). As decisões que só o Issei pode tomar estão no §10, uma de
> cada vez.

## 0. Resumo

A nova `index` tem **quatro sessões** que formam um só percurso visual:

| # | Sessão | Papel | Destino principal |
| :-- | :-- | :-- | :-- |
| 01 | Apresentação | Quem sou, em 3 segundos; sequência curta de fotos reais das oito dimensões | — (âncora para 02) |
| 02 | Minha história | Uma foto central e uma frase | `/curriculo` (Carreira) |
| 03 | Minhas ideias | Registros reais de estudo, vídeo e escrita | `/catalogo` (Conteúdos) e `/videos` |
| 04 | Meus projetos | Quatro projetos reais, da concepção à operação | ver D-H3 |

O elemento de continuidade é **a moldura**: um retângulo de fotografia que
nasce na abertura, muda de escala e de posição a cada sessão e no fim se
divide nas quatro molduras dos projetos. Junto dela corre **um traço vermelho**
fino, o único elemento gráfico da página. Não há partículas, 3D, vídeo de IA
nem efeito decorativo.

A técnica é **só CSS** (scroll-driven animations, `position: sticky`,
`clip-path`, `transform`) e as View Transitions que o site já usa. Nenhuma
dependência nova. Sem suporte ou com movimento reduzido, a página é uma
composição editorial estática completa.

---

## 1. Diagnóstico (evidência)

### 1.1 Home atual

| Item | Estado em `main` (50bb831) | Consequência para a nova home |
| :-- | :-- | :-- |
| Estrutura | 5 seções: hero com retrato, Sobre, Temas (10), Provas, Destaques; 839 linhas | Fica longa e com cara de catálogo; a nova home corta para 4 sessões |
| Geração | Bloco `PF:*` gerado por `scripts/gen-portfolio.mjs` a partir do `cv.json`, **o mesmo bloco** em `index.html` e `curriculo.html` | A home precisa de bloco próprio (`HM:*`); o `/curriculo` continua com o `PF:*` |
| Estilo | Tema escuro Dark Tech + 7 cores de linha (`--pf-l-*`, ADR-pf-001) | Conflito com a base clara pedida (§1.4) |
| Movimento | Entradas Animate.css por `animation-timeline: view()` (PR #218); hero excluído | Mesmo mecanismo serve; os efeitos mudam |
| Transição entre páginas | Família `site` (PR #208): `vt-nome` e `vt-papel` ligam o hero da home ao da Carreira | Manter `vt-nome` no `<h1>` da nova home |
| Retrato | `/img/retrato-{192,480,960}.{avif,webp}` (PR #220), fundo escurecido | Serve; a versão de fundo claro precisa ser refeita a partir de `retrato-original.jpg` |
| JSON-LD | `Person` com `image` (sincronizado à mão em `index.html`) | Preservar |

### 1.2 Mapa de páginas (`specs/ecosystem.nav.yaml` 2.1.0)

- **Entradas:** Início, Carreira (`/curriculo`), Conteúdos (`/catalogo`),
  Vídeos (`/videos`). Elas formam o cabeçalho comum.
- **Pilares p1–p4:** 30 páginas. Pela `natureza`:
  - `estudo` (14): know, devin, formulação de problemas, capacidade antes do
    acesso, artífice, curiosidade e investigação, aprendizagem autorregulada
    (+ artigo), da execução à orquestração, engenharia da confiança, engenharia
    de agentes, develop-engineering, digital workplace, a quem a empresa delega;
  - `experiencia` (4): **acessibilidade**, **case-agents**, **agent-ready**,
    **boutique-empresarial-showcase**;
  - `experimento` (2): operação capital cognitivo, socialselling;
  - `proposta` (5) e `referencia` (5).
- **Grupo `trajetoria`:** life, life3d, terminal-evolutivo (narrativas pessoais).
- **Temas:** 10 páginas `/temas/*`.
- **Vídeos:** ~180 fichas em `content/videos/`, 20+ artigos publicados.

| Caminho da home | Páginas que correspondem | Destino escolhido |
| :-- | :-- | :-- |
| Minha história | `/curriculo` (trajetória, competências, resultados STAR); grupo `trajetoria` | `/curriculo` |
| Minhas ideias | 14 estudos + artigos + vídeos + temas | `/catalogo` (com `/videos` como segundo link) |
| Meus projetos | 4 `experiencia` + 2 `experimento` (+ propostas) | **Não existe página de projetos.** Ver D-H3 |

### 1.3 Imagens reais disponíveis

| Fonte | O que é | Uso possível |
| :-- | :-- | :-- |
| `elementos-visuais/retrato/retrato-original.jpg` | Foto real (blazer azul) | Sessão 02 (precisa de versão em fundo claro) |
| Miniaturas e quadros dos vídeos do canal (YouTube, `i.ytimg.com/vi/<id>/`) | Gravações reais do Issei | Sessão 03; quadros de gravação na 01 (dimensão "ensinar") |
| Capturas das páginas reais do site (cases, simulador, apresentação) | Registros reais de projeto | Sessão 04 |
| TGI 2004 (`estudos/tgi-edi-2004/extraido/imagens/`) | Diagramas reais do trabalho acadêmico | Sessão 01 (dimensão "estudar") — **só com aprovação**, porque o TGI não é publicado (decisão de 2026-11-04) |
| `public/og-*.png` | Capas geradas, com texto | **Não usar** (não são fotos; trazem texto em imagem) |

**Achado principal:** só existe **uma** foto real do Issei. A sessão 01 pede
uma sequência de fotos das oito dimensões. Sem novas fotos, a abertura vira um
retrato e capturas de tela. O §8 traz a lista de fotos a fazer (D-H2).

### 1.4 Conflitos com as regras do repositório

| Regra atual | Pedido | Tratamento proposto |
| :-- | :-- | :-- |
| `AGENTS.md`: "Pure Dark Mode. Never use light backgrounds" | Base clara (papel, off-white) | **Exceção registrada** só para `src/index.html` + `src/home.css`, namespace `hm-`, em `ADR-pf-002` (mesmo modelo das exceções `ap-` e `pf-`). Ver D-H1 |
| "Inter para tudo" | "Tipografia editorial, elegante" | Inter continua no texto; uma família serifada só nos títulos de sessão. Ver D-H4 |
| Cabeçalho comum escuro | Página clara | Variante clara do cabeçalho só na home, por custom properties. Ver D-H5 |
| Plano da trajetória (PR #231): partículas, grafo, vídeo de IA | "Não usar partículas, redes, efeitos tecnológicos" | A nova direção vale para a home. A página `/trajetoria` fica em pausa até o Issei dizer se a direção dela muda também. Ver D-H6 |

---

## 2. Conceito

**O pensamento em prática.** A página mostra uma pessoa que pensa e faz. A
fotografia mostra o fazer; o texto curto mostra o pensar; o vazio (Ma) dá
tempo entre um e outro.

Regras de composição:

1. **Uma ideia por tela.** Cada quadro tem uma imagem, uma frase e no máximo um
   botão.
2. **Ma:** pelo menos 40 % de cada quadro sem conteúdo no computador; 25 % no
   celular.
3. **Assimetria equilibrada:** grade de 12 colunas; imagem e texto nunca
   centrados juntos, exceto no título da abertura.
4. **Vermelho com moderação:** no máximo **um** elemento vermelho visível por
   quadro (o traço, um número de sessão ou o foco do botão).
5. **Foto documental:** luz natural, sem filtro, sem recorte de fundo
   artificial, sem imagem gerada por IA.

---

## 3. Sequência narrativa e decupagem

Convenção: **vh** de rolagem por sessão. "Quadro" = o que está na tela.

### 3.1 Sessão 01 — Apresentação (220 vh no computador, 160 vh no celular)

**Primeira pintura (0 s, sem rolar):** sem esperar nada, a tela mostra:

```
┌───────────────────────────────────────────────────────────┐
│ [cabeçalho comum, variante clara]                         │
│                                                           │
│   01                                      ┌────────────┐  │
│   ─ (traço vermelho)                      │            │  │
│                                           │  foto 1    │  │
│   Maurício Yokoyama Issei   ← h1, vt-nome │  "pensar"  │  │
│                                           │            │  │
│   Pensar profundamente.                   └────────────┘  │
│   Construir com propósito.                  Pensar        │
│                                                           │
│   Tecnologia, engenharia e conhecimento em prática.       │
│                                                           │
│   Minha história · Minhas ideias · Meus projetos  ↓       │
└───────────────────────────────────────────────────────────┘
```

O visitante entende quem é a pessoa e do que é o site sem rolar (critério 1).
Os três caminhos já aparecem como links de texto (critério 5).

**Ao rolar (palco fixo por `position: sticky`):** a moldura passa pelas oito
dimensões, uma foto por dimensão. O texto do título fica parado.

| Faixa | Foto (D-H2) | "Câmera" | Legenda na margem |
| :-- | :-- | :-- | :-- |
| 0–12 % | Mãos sobre caderno com anotações | entra por `clip-path` de baixo para cima | Pensar |
| 12–24 % | Livros e tela de curso | *push-in* lento (escala 1 → 1,06) | Estudar |
| 24–36 % | Quadro branco com diagrama | *pan* lateral pelo `object-position` | Projetar |
| 36–48 % | Tela com código, mãos no teclado | corte por cortina vertical | Desenvolver |
| 48–60 % | Reunião, Issei de costas ou de perfil | *pull-out* (1,06 → 1) | Liderar |
| 60–72 % | Painel de testes / revisão | cortina horizontal | Validar |
| 72–84 % | Monitor de operação à noite | *push-in* | Sustentar |
| 84–100 % | Gravação do canal (câmera, microfone) | a moldura cresce e se desloca para a esquerda | Ensinar |

Cada troca dura ~3 % da faixa (troca curta, imagem longa). A legenda muda por
opacidade. Um contador "1/8 … 8/8" pequeno, em grafite, mostra o avanço (em
`aria-hidden`: a lista de dimensões está no HTML, §6.1).

**Saída para 02:** no fim da faixa, a moldura já ocupa a posição e o tamanho
da foto central da sessão 02. A última imagem troca por dissolve para o retrato.

### 3.2 Sessão 02 — Minha história (120 vh)

```
┌───────────────────────────────────────────────────────────┐
│  ┌──────────────────┐                                     │
│  │                  │          02                         │
│  │   retrato real   │          │ (traço vermelho vertical)│
│  │   (5 colunas)    │                                     │
│  │                  │          Minha história             │
│  │                  │                                     │
│  │                  │          Uma trajetória construída  │
│  └──────────────────┘          entre tecnologia, pessoas, │
│   Legenda: lugar e ano          desafios e resultados.    │
│                                                           │
│                                 Conheça minha história →  │
└───────────────────────────────────────────────────────────┘
```

- O texto entra linha a linha (opacidade 0 → 1, deslocamento 12 px), escalonado
  em 6 % da faixa.
- Parallax discreto: a foto anda 4 % mais devagar que a rolagem.
- **Saída para 03:** a moldura do retrato reduz para 1/3 da altura e desliza
  para a direita; duas novas molduras entram por trás, deslocadas (sobreposição).

### 3.3 Sessão 03 — Minhas ideias (130 vh)

```
┌───────────────────────────────────────────────────────────┐
│  03                                                       │
│  ─                                                        │
│  Minhas ideias                       ┌──────┐             │
│                                 ┌────┤ img2 │             │
│  Investigar, questionar,        │img1│      ├─────┐       │
│  aprender e compartilhar.       │    └──────┤img3 │       │
│  Conhecimento ganha valor       └───────────┴─────┘       │
│  quando é colocado em prática.                            │
│                                                           │
│  Recentes: 3 links de texto (título · formato)            │
│                                                           │
│  Explore minhas ideias →     Vídeos do canal →            │
└───────────────────────────────────────────────────────────┘
```

- **img1:** quadro de gravação de um vídeo do canal; **img2:** página de estudo
  aberta (captura real de uma página do site, sem texto legível pequeno);
  **img3:** caderno ou quadro de anotações.
- As três molduras têm velocidades de parallax diferentes (0 %, 3 %, 6 %) e
  se assentam numa composição fixa no centro da faixa.
- **"Recentes":** 3 itens escolhidos pelo `scripts/home/destaques.mjs` (já
  existe), só título e formato. Não repete descrições do catálogo (critério 6).
- **Saída para 04:** as três molduras se alinham numa linha e se dividem em
  quatro, que viram os cartões dos projetos.

### 3.4 Sessão 04 — Meus projetos (140 vh)

```
┌───────────────────────────────────────────────────────────┐
│  04                                                       │
│  ─                                                        │
│  Meus projetos                                            │
│  Da concepção à operação. Ideias transformadas em         │
│  soluções, experiências e resultados.                     │
│                                                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ captura │ │ captura │ │ captura │ │ captura │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│  Acessib.    Case Agents Agent Ready Boutique             │
│  projetar ·  validar ·   construir · sustentar            │
│                                                           │
│  Conheça meus projetos →                                  │
├───────────────────────────────────────────────────────────┤
│ Contato (rodapé comum, variante clara)                    │
└───────────────────────────────────────────────────────────┘
```

- Os quatro projetos são as páginas `natureza: experiencia` do YAML. Cada
  cartão mostra a captura real da página, o título e **uma** etapa da cadeia
  (pensar → … → sustentar) em que ele mais se apoia. A lista sai do YAML pelo
  gerador; não é digitada.
- As molduras entram em sequência (4 × 4 % da faixa), por `clip-path`.
- O traço vermelho, que acompanhou toda a página, termina como sublinhado do
  link "Conheça meus projetos".

### 3.5 Duração

| Sessão | Computador | Celular |
| :-- | :-- | :-- |
| 01 | 220 vh | 160 vh |
| 02 | 120 vh | 100 vh |
| 03 | 130 vh | 110 vh |
| 04 | 140 vh | 130 vh |
| **Total** | **610 vh** (~6 telas) | **500 vh** |

Rolagem contínua de uma pessoa leva **25–40 s** para o percurso todo. A home
atual tem ~9 telas. A nova é menor (critério 6) e não obriga a assistir nada:
a primeira tela já entrega identidade e caminhos.

---

## 4. Direção visual

### 4.1 Cores (tokens `--hm-*`, só em `src/home.css`)

Contrastes medidos (WCAG, sobre os dois fundos):

| Token | Valor | Uso | Sobre `#F4F1EA` | Sobre `#EAE5DA` |
| :-- | :-- | :-- | :-- | :-- |
| `--hm-papel` | `#F4F1EA` | fundo principal | — | — |
| `--hm-papel-2` | `#EAE5DA` | faixas alternadas, legendas | — | — |
| `--hm-tinta` | `#1F1F1F` | títulos | 14,6:1 | 13,1:1 |
| `--hm-grafite` | `#2E2E2E` | texto | 12,0:1 | 10,8:1 |
| `--hm-cinza` | `#5A5650` | legendas, metadados | 6,5:1 | 5,8:1 |
| `--hm-shu` | `#9E1B22` | traço, números de sessão, foco, texto vermelho | 7,1:1 | 6,4:1 |
| `--hm-shu-claro` | `#B7282E` | só elementos gráficos (não texto pequeno) | 5,6:1 | 5,0:1 |

O vermelho é o *beni/shu* (vermelho de selo), escuro o bastante para texto AA.
Foco visível: contorno 2 px `--hm-shu` + 2 px de afastamento (≥ 3:1 sobre
papel e sobre foto, com halo de papel).

### 4.2 Tipografia

| Papel | Família | Tamanho (fluido) | Peso |
| :-- | :-- | :-- | :-- |
| Nome (h1) | Inter | `clamp(2.25rem, 5vw, 4.5rem)` | 600, `letter-spacing: -0.02em` |
| Mensagem central | serifada editorial (D-H4; recomendação: **Shippori Mincho**, Google Fonts, só latin, pesos 500/700) | `clamp(1.75rem, 3.6vw, 3.25rem)` | 500 |
| Títulos de sessão (h2) | idem | `clamp(1.5rem, 2.6vw, 2.25rem)` | 500 |
| Texto | Inter | 1.0625rem / 1.7 | 400 |
| Números de sessão, legendas | Inter, versalete (`font-variant-caps: all-small-caps`), `letter-spacing: .12em` | .8125rem | 600 |

Se o Issei recusar a serifada, tudo em Inter, com o contraste de peso 300/600
fazendo o papel editorial.

### 4.3 Grade e espaço

- 12 colunas, *gutter* `clamp(1rem, 2vw, 2rem)`, margem lateral `clamp(1rem, 6vw, 7rem)`.
- Escala de espaço (Ma): `--hm-ma-1: .5rem` … `--hm-ma-6: 12rem` (razão 1,8).
- Pontos de quebra: celular < 640 px (1 coluna; moldura acima do texto),
  tablet 640–1024 (6 colunas), computador > 1024 (12 colunas).

### 4.4 Fotografia

- Proporções fixas: 4:5 (retrato), 3:2 (dimensões), 16:10 (projetos).
- Tratamento único: leve dessaturação (−10 %), sem vinheta, sem filtro de cor.
- `alt` descritivo em toda foto que carrega informação; as fotos da sequência
  01 têm `alt` porque mostram o trabalho real (não são decorativas).

---

## 5. Movimento

### 5.1 Princípios

- Só `transform`, `opacity` e `clip-path`. Nada que mude layout.
- A rolagem nunca é bloqueada nem desviada: sem `scroll-snap` obrigatório, sem
  sequestro de roda ou toque. O `sticky` só segura o palco enquanto o texto
  continua acessível.
- Parallax ≤ 6 % do deslocamento. Escala ≤ 1,06. Nenhuma rotação.
- Cada efeito é usado no máximo duas vezes (sem repetição mecânica).

### 5.2 Mecanismo

```css
/* Palco da sessão 01: uma timeline nomeada percorre a seção inteira. */
.hm-s01 { view-timeline: --hm-s01 block; height: 220vh; }
.hm-s01__palco { position: sticky; top: 0; height: 100svh; }

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .hm-foto[data-dim="estudar"] {
      animation: hm-entra-cortina linear both, hm-push-in linear both;
      animation-timeline: --hm-s01, --hm-s01;
      animation-range: contain 12% contain 15%, contain 12% contain 24%;
    }
    /* … uma regra por dimensão, gerada pelo gerador a partir da tabela §3.1 … */
  }
}

@keyframes hm-entra-cortina { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0); } }
@keyframes hm-push-in       { from { scale: 1; } to { scale: 1.06; } }
```

As faixas de cada efeito saem de **uma tabela de dados** no gerador (§6.2), não
de CSS escrito à mão, para que tempo e ordem mudem num lugar só.

### 5.3 Sem suporte, ou com movimento reduzido

| Situação | Resultado |
| :-- | :-- |
| `prefers-reduced-motion: reduce` | Nenhuma animação. S01 vira **mosaico estático**: título + grade 4×2 das oito fotos com legenda. Seções com altura natural (sem `sticky`) |
| Navegador sem `animation-timeline` (hoje: Firefox estável) | Mesmo mosaico estático; entradas simples por `@starting-style` não são usadas |
| Sem JavaScript | Igual ao normal: a página não depende de JS |
| Impressão | Mosaico estático, sem fundo |

O mosaico estático é o **HTML base**. O modo animado é uma camada que o CSS
aplica por cima só quando as duas condições permitem. Assim o conteúdo nunca
some.

### 5.4 View Transitions

- `<h1>` mantém `view-transition-name: vt-nome` (família `site`, PR #208): o
  nome viaja da home para a Carreira.
- As molduras dos três CTAs ganham nomes na hora do clique (`pageswap`), como
  já faz a família `videos`: a foto de 02 viaja para o topo de `/curriculo`
  (que já tem o retrato); as outras saem só com o *fade* da raiz.
- Tudo sob `@media (prefers-reduced-motion: no-preference)` (regra existente).

---

## 6. Implementação

### 6.1 HTML (semântica)

```html
<main id="conteudo" class="hm">
  <section class="hm-s01" aria-labelledby="hm-nome">
    <div class="hm-s01__texto">
      <p class="hm-num" aria-hidden="true">01</p>
      <h1 id="hm-nome">Maurício Yokoyama Issei</h1>
      <p class="hm-mensagem">Pensar profundamente. Construir com propósito.</p>
      <p class="hm-sub">Tecnologia, engenharia e conhecimento em prática.</p>
      <nav aria-label="Caminhos principais">
        <a href="#historia">Minha história</a> · <a href="#ideias">Minhas ideias</a> · <a href="#projetos">Meus projetos</a>
      </nav>
    </div>
    <ul class="hm-dimensoes" aria-label="Dimensões do trabalho">
      <li><figure class="hm-foto" data-dim="pensar">
        <picture>…</picture><figcaption>Pensar</figcaption></figure></li>
      <!-- … oito itens … -->
    </ul>
  </section>
  <section id="historia" class="hm-s02" aria-labelledby="hm-historia">…</section>
  <section id="ideias"   class="hm-s03" aria-labelledby="hm-ideias">…</section>
  <section id="projetos" class="hm-s04" aria-labelledby="hm-projetos">…</section>
</main>
```

- Um `<h1>`, quatro seções com `<h2>` (a 01 usa o `<h1>`).
- Os caminhos do topo são âncoras internas; os CTAs de cada sessão levam às
  páginas de destino.
- Cabeçalho comum e rodapé de contato continuam (gerados como hoje).

### 6.2 Arquivos

| Arquivo | Ação |
| :-- | :-- |
| `src/index.html` | Novo conteúdo entre `<!-- HM:START -->` e `<!-- HM:END -->`, gerado. Fora do bloco: `<head>` (SEO, JSON-LD, consentimento) como hoje |
| `src/home.css` | Novo. Tokens `--hm-*`, layout, movimento. Substitui `index.css` **só** na home (o `/curriculo` continua com `index.css`) |
| `scripts/home/gen-home.mjs` | Novo gerador do bloco `HM:*`. Lê `cv.json` (nome), `ecosystem.nav.yaml` (projetos `experiencia`, destinos), `destaques.mjs` (recentes) e `home.data.mjs` (textos, fotos, tabela de movimento) |
| `scripts/home/home.data.mjs` | Novo. Textos fixos pedidos pelo Issei, lista das 8 fotos com `alt`, tabela de faixas do §3 |
| `scripts/gen-portfolio.mjs` | Para de escrever `PF:*` em `index.html` (só `curriculo.html`) |
| `scripts/gen-imagens.mjs` | Novo job `home`: fotos em AVIF/WebP 480/960/1600; capturas dos projetos 640/1280 |
| `assets-fonte/home/` | Originais das fotos + manifesto (fora do build) |
| `src/transicoes/*` | Nome just-in-time para a moldura de 02 → `/curriculo` |
| `docs/specs/pages/portfolio/ADR-pf-002-home-clara.md` | Exceção de tema (D-H1) |
| `AGENTS.md` | Registrar a exceção `hm-` (como `ap-` e `pf-`) |
| `src/en/index.html` | Gerado pelo Argos (`npm run i18n:sync` no notebook) |
| `public/index.md`, `llms*.txt` | Regerados pelos geradores que já existem |

Nenhuma biblioteca nova. GSAP e Lenis **não** entram na home. JavaScript da
home: zero (o de View Transitions já existe e é comum).

### 6.3 Desempenho

| Item | Meta |
| :-- | :-- |
| LCP (h1 + foto 1) | < 2,0 s em 4G; foto 1 com `fetchpriority="high"`, 960 px AVIF ≤ 90 KB |
| Peso da primeira tela | ≤ 200 KB (HTML + CSS + fonte + foto 1) |
| Fontes | Inter (já carregada) + serifada só latin, 2 pesos, `font-display: swap`, ≤ 60 KB |
| Fotos restantes | `loading="lazy"`, `decoding="async"`; total ≤ 1,2 MB no computador, ≤ 600 KB no celular |
| CLS | 0 (`width`/`height` em toda imagem; alturas de seção fixas em `vh`/`svh`) |
| Animação | Só propriedades compostas; nenhum JS por quadro |
| Orçamento | Nova entrada `index.html` no `scripts/perf-budget.mjs` |

### 6.4 SEO e descoberta

- Mantém `<title>`, descrição, OG, canonical, hreflang, `Person` JSON-LD
  (atualizar `image` se o retrato mudar), consentimento antes do GTM.
- A mensagem central e o subtítulo entram na `meta description` revisada:
  "Maurício Yokoyama Issei — tecnologia, engenharia e conhecimento em prática.
  Trajetória, ideias e projetos." (≤ 160 caracteres).
- `og-index.png` refeito no novo visual (`gen-og-index.mjs` já existe).
- O texto todo está no HTML, legível por busca e por agentes; `index.md`
  (gêmeo Markdown) regerado.

---

## 7. Integração com as páginas existentes

| CTA | Destino | Observação |
| :-- | :-- | :-- |
| Conheça minha história | `/curriculo` | Já existe; o retrato faz a ponte por View Transition |
| Explore minhas ideias | `/catalogo` | Já existe, agrupado por tema |
| Vídeos do canal (secundário) | `/videos` | Já existe |
| Recentes (3 links) | páginas de conteúdo | Escolha do `destaques.mjs` |
| 4 projetos | acessibilidade, case-agents, agent-ready, boutique-empresarial-showcase | Lista sai do YAML (`natureza: experiencia`) |
| Conheça meus projetos | **D-H3** | Opções no §10 |
| Contato | `#contact` (rodapé) | Como hoje |

O que **sai** da home e continua acessível em outro lugar: Sobre (no
`/curriculo`), Temas (no `/catalogo` e em `/temas/*`), Provas (no `/curriculo`,
STAR), Destaques (vira "Recentes", 3 itens).

---

## 8. Lista de fotos a fazer (D-H2)

Oito fotos reais, horizontais 3:2, ≥ 2400 px, luz natural, sem marca de
empresa visível, sem tela com dado real legível, sem outras pessoas
identificáveis (de costas ou fora de foco, com autorização).

| # | Dimensão | Cena sugerida |
| :-- | :-- | :-- |
| 1 | Pensar | Mãos com caneta sobre caderno com esboços; rosto fora ou parcial |
| 2 | Estudar | Livros técnicos empilhados, um aberto; curso na tela ao fundo, desfocado |
| 3 | Projetar | Issei diante de quadro branco com diagrama (de perfil) |
| 4 | Desenvolver | Mãos no teclado; código desfocado na tela |
| 5 | Liderar | Conversa de pé com duas ou três pessoas, Issei de perfil ou de costas |
| 6 | Validar | Duas telas lado a lado (teste e resultado), sem dado legível |
| 7 | Sustentar | Monitor com painel de operação à noite, luz baixa |
| 8 | Ensinar | Montagem de gravação do canal: câmera, microfone, Issei falando |

Mais: **retrato 4:5 em fundo claro** (para a sessão 02) e **3 registros** para
a sessão 03 (caderno de anotações, quadro de gravação, página de estudo).
Os quadros do canal podem substituir as fotos 4 e 8 se faltar tempo.

---

## 9. Validação

### 9.1 Critérios de aceite do pedido → como verificar

| Critério | Verificação |
| :-- | :-- |
| 1. Entender quem sou em poucos segundos | Primeira tela mostra nome, mensagem, subtítulo e os 3 caminhos sem rolar (Playwright 1280×800 e 390×844: todos no *viewport* inicial). Teste dos 5 segundos com 3–5 pessoas (já previsto na F6 da reestruturação) |
| 2. Profissionalismo e maturidade | Revisão do Issei sobre capturas; `tone-reviewer` no texto |
| 3. Imagens reais com protagonismo | Toda `<img>` da home vem de `assets-fonte/home/` com origem registrada no manifesto; nenhum arquivo `og-*` ou gerado por IA (teste) |
| 4. Narrativa contínua | Capturas em 0, 10 … 100 % da rolagem anexadas ao PR; a moldura muda de posição entre sessões sem sumir |
| 5. Caminhos rápidos | 3 links no topo + 1 CTA por sessão; ≤ 2 cliques até qualquer conteúdo |
| 6. Curta, sem repetição | ≤ 610 vh; teste: nenhuma frase da home aparece igual em `/curriculo` ou `/catalogo`, exceto títulos |
| 7. Celular e movimento reduzido | `index.mobile.spec.js` (sem rolagem horizontal, ordem de leitura), `index.reduced.spec.js` (mosaico estático, zero animações ativas) |
| 8. Identidade e arquitetura | Gate verde: `gen-home --check`, `gen-portfolio --check`, `i18n:check`, `perf-budget`, a11y |

### 9.2 Acessibilidade (WCAG 2.2 AA)

- Contrastes do §4.1 cobertos por `tests/home.tokens.test.mjs`.
- Texto sobre foto: nunca. O texto fica sempre em área de papel.
- Ordem de foco = ordem visual: caminhos → CTA 02 → recentes e CTA 03 →
  projetos e CTA 04 → rodapé.
- 2.2.2: nenhum movimento automático (tudo depende da rolagem da pessoa).
- 2.3.3: movimento reduzido desliga tudo.
- 2.4.11: o `sticky` nunca cobre o elemento em foco (incluir a nova home na
  suíte de foco de `tests/a11y/widgets.spec.js`).
- Catraca `tests/a11y/baseline.json` não sobe.

### 9.3 Riscos

| Risco | Resposta |
| :-- | :-- |
| Fotos não ficam prontas | Lançar com o retrato + quadros reais do canal + capturas; trocar depois sem mudar código (só o manifesto) |
| Firefox sem scroll-driven animations | Vê o mosaico estático, que é completo |
| A home clara destoa das páginas escuras | A View Transition da raiz faz a passagem; o cabeçalho comum ancora a identidade. Avaliar com o Issei na validação |
| `sticky` alto cansa no celular | S01 cai para 160 vh no celular |

---

## 10. Decisões do Issei (uma de cada vez)

| Id | Pergunta | Recomendação |
| :-- | :-- | :-- |
| **D-H1** | Aceita abrir uma exceção ao tema escuro só na home (fundo claro, namespace `hm-`, ADR-pf-002)? | Sim, só na home. As outras páginas ficam escuras |
| D-H2 | Você faz as 8 fotos da lista do §8 (e o retrato em fundo claro)? | Sim; até lá, lançar com retrato + quadros do canal |
| D-H3 | Para onde vai "Conheça meus projetos"? (a) `/catalogo#projetos`, um grupo novo no catálogo gerado do YAML (`experiencia` + `experimento`); (b) a página do primeiro case; (c) só os 4 cartões, sem CTA | (a): reaproveita o catálogo, não cria página |
| D-H4 | Usa uma serifada editorial (Shippori Mincho) nos títulos? | Sim, só nos títulos e na mensagem central |
| D-H5 | O cabeçalho comum fica claro na home? | Sim, por custom properties, só na home |
| D-H6 | A página `/trajetoria` (PR #231) segue a direção antiga (escura, partículas) ou passa a seguir esta? | Pausar e alinhar à direção desta home |
| D-H7 | Pode usar diagramas do TGI 2004 como registro de estudo? | Não por enquanto (o TGI não é publicado) |

## 11. Unidades de trabalho

| UT | Conteúdo | Depende de |
| :-- | :-- | :-- |
| H-0 | D-H1, D-H3, D-H4 decididas; `ADR-pf-002` e `AGENTS.md` | — |
| H-1 | `gen-home` + `home.data` + HTML estático (mosaico) + `home.css` sem movimento + testes de tokens, fatos, nojs, mobile, SEO | H-0 |
| H-2 | Camada de movimento (S01–S04) + View Transitions + `reduced.spec` + capturas | H-1 |
| H-3 | Fotos reais no `gen-imagens` + `og-index` novo | D-H2 |
| H-4 | `/en/` (Argos no notebook) + `perf-budget` + revisão a11y e tom + validação com 3–5 pessoas | H-2 |

H-1 já é uma home publicável e completa, só sem movimento.
