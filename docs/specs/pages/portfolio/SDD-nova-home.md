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
| 01 | Apresentação | Quem sou, em 3 segundos (retrato estático); depois 5 cenas de fotos reais, cada uma com duas das oito dimensões (cenas 01–06 do storyboard) | — (âncora para 02) |
| 02 | Minha história | Uma foto central e uma frase | `/curriculo` (Carreira) |
| 03 | Minhas ideias | Registros reais de estudo, vídeo e escrita | `/catalogo` (Conteúdos) e `/videos` |
| 04 | Meus projetos | Quatro projetos reais, da concepção à operação | ver D-H3 |

O elemento de continuidade é **a moldura**: um retângulo de fotografia que
nasce na abertura, muda de escala e de posição a cada sessão e no fim se
divide nas quatro molduras dos projetos. Junto dela corre **um traço dourado *Kintsugi***
fino, o único elemento gráfico da página. Não há partículas, 3D, vídeo de IA
nem efeito decorativo.

A técnica é **só CSS** (scroll-driven animations, `position: sticky`,
`clip-path`, `transform`) e as View Transitions que o site já usa. Nenhuma
dependência nova. Sem suporte ou com movimento reduzido, a página é uma
composição editorial estática completa.

A ordem das cenas, os gestos e a narração seguem o
[storyboard](storyboard/storyboard-home.md), revisão 2: **9 cenas em 4
sessões** (cenas 01–06 na sessão 01; cena 07 na 02; cena 08 na 03; cena 09
na 04). Toda a narração usa a mesma voz, em primeira pessoa. O tema
é **Aizome + Kin** (D-H1 decidida): índigo profundo, texto claro e um único
acento em ouro fosco. A home segue o *Pure Dark Mode* do `AGENTS.md`, como as
outras páginas.

---

## 1. Diagnóstico (evidência)

### 1.1 Home atual

| Item | Estado em `main` (50bb831) | Consequência para a nova home |
| :-- | :-- | :-- |
| Estrutura | 5 seções: hero com retrato, Sobre, Temas (10), Provas, Destaques; 839 linhas | Fica longa e com cara de catálogo; a nova home corta para 4 sessões |
| Geração | Bloco `PF:*` gerado por `scripts/gen-portfolio.mjs` a partir do `cv.json`, **o mesmo bloco** em `index.html` e `curriculo.html` | A home precisa de bloco próprio (`HM:*`); o `/curriculo` continua com o `PF:*` |
| Estilo | Tema escuro Dark Tech + 7 cores de linha (`--pf-l-*`, ADR-pf-001) | A home continua escura (Aizome + Kin, §4.1). As 7 cores de linha ficam só em `/curriculo` e `/catalogo` |
| Movimento | Entradas Animate.css por `animation-timeline: view()` (PR #218); hero excluído | Mesmo mecanismo serve; os efeitos mudam |
| Transição entre páginas | Família `site` (PR #208): `vt-nome` e `vt-papel` ligam o hero da home ao da Carreira | Manter `vt-nome` no `<h1>` da nova home |
| Retrato | `/img/retrato-{192,480,960}.{avif,webp}` (PR #220), fundo escurecido | Serve. O retrato atual entra já na H-1, harmonizado com o fundo índigo (§4.4); não precisa de recorte |
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
| `elementos-visuais/retrato/retrato-original.jpg` | Foto real (blazer azul) | Cenas 01 e 07 (sem novo recorte) |
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
| `AGENTS.md`: "Pure Dark Mode. Never use light backgrounds" | Base editorial | **Sem conflito.** A home usa a paleta escura **Aizome + Kin** (§4.1). Não há fundo claro, então **não há** exceção de tema nem `ADR-pf-002` |
| Paleta Dark Tech (`#0d1117`, acentos `#007bff`/`#8a2be2`) | Paleta editorial oriental, com contenção | Fundo índigo-carvão `#0D1219`, próximo do `#0d1117`; um só acento, ouro fosco `--hm-kin`, no lugar do gradiente. Os tokens `--hm-*` vivem só em `src/home.css` e ficam registrados no `AGENTS.md` numa linha (namespace `hm-`, como `pf-`), sem ADR. O gradiente azul–violeta não aparece na home |
| 7 cores de linha (`--pf-l-*`, ADR-pf-001) | Contenção (*Shibui*) | As 7 cores ficam restritas a `/curriculo` e `/catalogo`. A home tem **um único acento contínuo** (`--hm-kin`) e divisórias de 1 px (*Shoji*) |
| "Inter para tudo" | "Tipografia editorial, elegante" | Inter continua no texto; uma família serifada só nos títulos de sessão. Ver D-H4 |
| Cabeçalho e rodapé comuns escuros | Página escura | **Sem variante.** Cabeçalho e rodapé comuns continuam como em `/curriculo`, `/catalogo` e `/videos` (D-H5 decidida) |
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
4. **Ouro com contenção (*Shibui*):** no máximo **um** elemento em
   `--hm-kin` visível por quadro (o traço, um número de sessão, os cantos de
   M1 ou o foco). Divisórias e molduras usam fio de 1 px (*Shoji*), quase
   invisível.
5. **Foto documental:** luz natural, sem filtro, sem recorte de fundo
   artificial, sem imagem gerada por IA.

---

## 3. Sequência narrativa e decupagem

Convenção: **vh** de rolagem por sessão. "Quadro" = o que está na tela.

### 3.1 Sessão 01 — Apresentação (cenas 01–06; referência 300–360 vh no computador, a calibrar na H-2)

A sessão 01 tem **seis cenas** do storyboard: o retrato estático (cena 01) e
cinco cenas com duas dimensões cada (cenas 02–06). Não há cena de "três
caminhos" no fim da sessão: ela repetia o menu da cena 01 e criava um falso
final (storyboard §9.1). As oito dimensões ficam agrupadas em pares. Oito cenas de
uma dimensão cada viravam uma lista de slogans (storyboard §9).

**Primeira pintura (cena 01, 0 s, sem rolar):** sem esperar nada, a tela mostra:

```
┌───────────────────────────────────────────────────────────┐
│ [cabeçalho comum, escuro como nas outras páginas]         │
│                                                           │
│   01                                      ┌────────────┐  │
│   ─ (traço dourado Kintsugi)              │            │  │
│                                           │  retrato   │  │
│   Maurício Yokoyama Issei   ← h1, vt-nome │  real 4:5  │  │
│                                           │  (M1)      │  │
│   Pensar profundamente.                   │            │  │
│   Construir com propósito.                └────────────┘  │
│                                                           │
│   Tecnologia, engenharia e conhecimento em prática.       │
│   Há mais de vinte anos trabalho na distância entre       │
│   o que foi desenhado e o que roda em produção.           │
│                                                           │
│   Minha história · Minhas ideias · Meus projetos  ↓       │
└───────────────────────────────────────────────────────────┘
```

O visitante entende quem é a pessoa e do que é o site sem rolar (critério 1).
Os três caminhos já aparecem como links de texto (critério 5). A cena 01 é
estática: nenhuma informação dela depende de animação.

**Ao rolar (palco fixo por `position: sticky`):** a moldura M1 recebe as cenas
02–06. O texto da cena 01 reduz e fica parado no alto da coluna de texto
(número 01 e nome). Cada cena tem uma frase de narração na área de texto, fora da foto.

| Faixa | Cena | Dimensões | Imagem (§8) | "Câmera" | Narração (storyboard §6) |
| :-- | :-- | :-- | :-- | :-- | :-- |
| 0–12 % | 01 O rosto | — | Retrato 4:5 | parada; ao sair, o retrato reduz para 60 % e desliza para a direita | (texto da primeira pintura) |
| 12–30 % | 02 O caderno | pensar · estudar | Mãos, caderno e livro aberto | entra por cortina de baixo para cima; *push-in* 1 → 1,06 | Quase tudo começa no papel. Antes do código, entender o problema. Muitas vezes, estudar o que ainda não sei. |
| 30–48 % | 03 Do quadro ao teclado | projetar · construir | A: quadro branco; B: mãos no teclado, sobreposta | dissolve do esboço para o diagrama; *pan* em A; B desliza sobre A; *pull-out* no fim | Desenho para que outra pessoa consiga operar. O diagrama só vale quando vira sistema. |
| 48–64 % | 04 A conversa | liderar · colaborar | Conversa de pé, Issei ouvindo | *pull-out* 1,06 → 1 | Nada importante foi feito por uma pessoa só. Liderar é deixar o problema claro e abrir espaço para quem resolve. |
| 64–82 % | 05 Dia e noite | validar · sustentar | Esquerda (dia, menor): telas de teste; direita (noite, maior): monitor de operação | cortina horizontal: a noite entra pela direita e empurra o dia | Depois da entrega, o trabalho continua. É na operação que aparece o que o projeto não previu. |
| 82–100 % | 06 A gravação | ensinar · compartilhar | Issei gravando um vídeo do canal | dissolve curto da luz da tela para a luz da gravação; *push-in* 1 → 1,04; no fim, *pull-out* | O que aprendo, eu publico. Ensinar é como verifico se entendi de verdade. |

- Cada troca dura ~3 % da faixa (troca curta, imagem longa). A narração muda
  por opacidade. Os números de faixa são de referência: a H-2 calibra a altura
  total e as faixas com capturas reais (§3.5).
- **Sem contador de avanço.** A sequência não mostra "1/8 … 8/8" nem
  equivalente. O avanço fica claro pelas imagens e pela narração.
- Os três caminhos aparecem **só na cena 01** (e no cabeçalho comum). As
  sessões 02, 03 e 04 são os próprios caminhos, cada uma com seu CTA.

**Saída para 02 (cena 06 → 07):** M1 recua (*pull-out*) e desliza para a
esquerda até a posição e o tamanho do retrato da sessão 02. A gravação
dissolve para o retrato: o rosto passa de uma imagem para a outra.

### 3.2 Sessão 02 — Minha história (cena 07; 120 vh)

```
┌───────────────────────────────────────────────────────────┐
│  ┌──────────────────┐                                     │
│  │                  │          02                         │
│  │   retrato real   │          │ (traço dourado vertical) │
│  │   (5 colunas)    │                                     │
│  │                  │          Minha história             │
│  │                  │                                     │
│  │                  │          Comecei escrevendo código. │
│  │                  │          Com o tempo, passei a      │
│  └──────────────────┘          responder também por times,│
│   Legenda: lugar e ano          contratos e sistemas em   │
│                                 produção.                 │
│                                 ● 1997 ● 2003 ● 2012      │
│                                 ● 2018 ● 2024–hoje        │
│                                 Conheça minha história →  │
└───────────────────────────────────────────────────────────┘
```

- O texto entra linha a linha (opacidade 0 → 1, deslocamento 12 px), escalonado
  em 6 % da faixa.
- Parallax discreto: a foto anda 4 % mais devagar que a rolagem.
- **Cinco marcos** no traço vertical, de 1997 até hoje: 1997 curso técnico em
  processamento de dados · 2003 Java na Sysgen · 2012 liderança de time na
  Indra · 2018 Tech Lead na Rede · **2024–hoje** arquitetura, IA aplicada,
  engenharia de agentes e ensino. O último marco é aberto ("hoje") e liga a
  liderança e a operação à fase atual de estudos e projetos. Fontes: `cv.json`
  (`Experiencia`; Rede "fev de 2018 – o momento") e o texto do marco
  2024–hoje definido pelo Issei. O texto de cada marco fica em `home.data.mjs`.
- **Saída para 03:** a moldura do retrato reduz para 1/3 da altura e desliza
  para a direita; duas novas molduras entram por trás, deslocadas (sobreposição).

### 3.3 Sessão 03 — Minhas ideias (cena 08; 130 vh)

```
┌───────────────────────────────────────────────────────────┐
│  03                                                       │
│  ─                                                        │
│  Minhas ideias                       ┌──────┐             │
│                                 ┌────┤ img2 │             │
│  As ferramentas mudaram;        │img1│      ├─────┐       │
│  as perguntas, não.             │    └──────┤img3 │       │
│  Hoje estudo agentes de IA      └───────────┴─────┘       │
│  perguntando o mesmo de sempre: quem vai operar, o que    │
│  pode falhar, como saber se funciona. Escrevo e gravo o   │
│  que ainda estou tentando entender.                       │
│                                                           │
│  Recentes: 3 links de texto (título · formato)            │
│                                                           │
│  Explore minhas ideias →     Vídeos do canal →            │
└───────────────────────────────────────────────────────────┘
```

- **Ponte da página:** a frase "As ferramentas mudaram; as perguntas, não."
  liga os fundamentos das cenas 02–06 aos destaques de IA. É dita uma vez só,
  aqui.
- **img1:** quadro de gravação de um vídeo do canal; **img2:** página de estudo
  aberta (captura real de uma página do site, sem texto legível pequeno);
  **img3:** caderno ou quadro de anotações.
- As três molduras têm velocidades de parallax diferentes (0 %, 3 %, 6 %) e
  se assentam numa composição fixa no centro da faixa.
- **"Recentes":** 3 itens escolhidos pelo `scripts/home/destaques.mjs` (já
  existe), só título e formato. Não repete descrições do catálogo (critério 6).
- **Saída para 04:** as três molduras se alinham numa linha e se dividem em
  quatro, que viram os cartões dos projetos.

### 3.4 Sessão 04 — Meus projetos (cena 09; 140 vh)

```
┌───────────────────────────────────────────────────────────┐
│  04                                                       │
│  ─                                                        │
│  Meus projetos                                            │
│  Da concepção à operação. Projetos que saíram do papel e  │
│  que alguém usa. Em cada um, conto o problema e as        │
│  decisões que tomei.                                      │
│                                                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ captura │ │ captura │ │ captura │ │ captura │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│  Acessib.    Case Agents Agent Ready Boutique             │
│  projetar ·  validar ·   construir · sustentar            │
│                                                           │
│  Conheça meus projetos →                                  │
├───────────────────────────────────────────────────────────┤
│ Contato (rodapé comum, escuro)                            │
└───────────────────────────────────────────────────────────┘
```

- Os quatro projetos são as páginas `natureza: experiencia` do YAML. Cada
  cartão mostra a captura real da página, o título e **uma** etapa da cadeia
  (pensar → … → sustentar) em que ele mais se apoia. A lista sai do YAML pelo
  gerador; não é digitada.
- As molduras entram em sequência (4 × 4 % da faixa), por `clip-path`.
- O traço dourado, que acompanhou toda a página, termina como sublinhado do
  link "Conheça meus projetos".
- **Voz:** os textos de apoio das sessões 02–04 seguem a voz das cenas 02–06
  (primeira pessoa, frase curta, atrito real). A home não usa "resultados",
  "soluções" nem "experiências" na narração (teste de texto, §9.1).

### 3.5 Duração

| Sessão | Cenas | Computador | Celular (< 640 px, §4.3) |
| :-- | :-- | :-- | :-- |
| 01 | 01–06 | **300–360 vh** (referência; valor inicial 330 vh) | 200–260 vh (valor inicial 240 vh) |
| 02 | 07 | 120 vh | 100 vh |
| 03 | 08 | 130 vh | 110 vh |
| 04 | 09 | 140 vh | 130 vh |
| **Total** | **9 cenas** | **690–750 vh** (~7 telas) | **540–600 vh** (~6 telas) |

- A altura da sessão 01 é **um valor de referência**. A H-2 calibra o valor
  final com capturas reais e com a regra "cada cena dura o tempo de ler uma
  frase". O valor fica numa só variável (`--hm-s01-altura`, §5.2).
- Limite superior: a sessão 01 não passa de 360 vh no computador nem de
  260 vh no celular. Se as cenas não couberem, a H-2 encurta faixas, não
  aumenta a altura.

Rolagem contínua de uma pessoa leva **30–45 s** para o percurso todo. A home
atual tem ~9 telas. A nova é menor (critério 6) e não obriga a assistir nada:
a primeira tela já entrega identidade e caminhos.

---

## 4. Direção visual

### 4.1 Cores — paleta "Aizome + Kin" (tokens `--hm-*`, só em `src/home.css`)

A home tem **um tema só**, escuro: índigo profundo (*Aizome*), texto claro e
um acento em ouro fosco (*Kintsugi*). Os nomes vêm da tradição japonesa e
descrevem o papel de cada token; nenhum ornamento oriental entra na página.

Contrastes medidos (WCAG 2.2, sobre os fundos de texto):

| Token | Valor | Uso | Sobre `#0D1219` | Sobre `#141B25` |
| :-- | :-- | :-- | :-- | :-- |
| `--hm-aizome` | `#0D1219` | fundo principal (índigo-carvão, *Kachi-iro*) | — | — |
| `--hm-aizome-2` | `#141B25` | superfície elevada, faixas alternadas | — | — |
| `--hm-aizome-deep` | `#080C11` | penumbra; só na cena 05 (noite) | — | — |
| `--hm-tinta` | `#F2EFE9` | títulos | 16,4:1 (AAA) | 15,1:1 (AAA) |
| `--hm-grafite` | `#D0CCC3` | corpo de texto | 11,7:1 (AAA) | 10,8:1 (AAA) |
| `--hm-cinza` | `#8F97A4` | legendas, metadados | 6,4:1 (AA) | 5,9:1 (AA) |
| `--hm-kin` | `#D4AF6A` | número de sessão, traço contínuo, cantos de M1, foco, CTAs | 9,1:1 (AAA) | 8,4:1 (AAA) |
| `--hm-shoji` | `rgba(242, 239, 233, 0.08)` | divisórias decorativas, fio de moldura de foto | 1,2:1 | — |
| `--hm-shoji-strong` | `rgba(242, 239, 233, 0.16)` | fio de M1 nas cenas escuras (05 e 06), molduras de foto | 1,5:1 | — |
| `--hm-borda-controle` | `#5F6979` | borda de controle interativo (botão, campo) | 3,4:1 | 3,1:1 |

```css
:root {
  --hm-aizome: #0D1219;  --hm-aizome-2: #141B25;  --hm-aizome-deep: #080C11;
  --hm-tinta: #F2EFE9;   --hm-grafite: #D0CCC3;   --hm-cinza: #8F97A4;
  --hm-kin: #D4AF6A;
  --hm-shoji: rgba(242, 239, 233, 0.08);
  --hm-shoji-strong: rgba(242, 239, 233, 0.16);
  --hm-borda-controle: #5F6979;
}
```

Regras:

- **Um acento só.** `--hm-kin` é o único elemento de cor da home. As 7 cores
  de linha (`--pf-l-*`) não entram (§1.4).
- **`--hm-shoji` e `--hm-shoji-strong` são só decorativos** (divisórias,
  molduras de foto). Ficam abaixo de 3:1 de propósito e por isso **nunca**
  marcam controle, estado ou informação. Um controle interativo usa
  `--hm-borda-controle` (≥ 3:1, WCAG 1.4.11) ou fundo diferenciado
  (`--hm-aizome-2`).
- **`--hm-borda-controle` corrigido:** o valor proposto `#525C6B` mede 2,8:1
  sobre `#0D1219` e 2,6:1 sobre `#141B25`, abaixo de 3:1. O valor da
  especificação passa a `#5F6979` (3,4:1 e 3,1:1), mesmo matiz, um pouco mais
  claro.
- **`--hm-aizome-deep`** não recebe texto pequeno. Na cena 05, a narração
  continua sobre `--hm-aizome`.
- **Foco visível:** `outline: 2px solid var(--hm-kin); outline-offset: 3px`,
  sempre contra `--hm-aizome` (9,1:1). Em cartão ou foto clara, o foco ganha
  um halo interno escuro (`box-shadow: 0 0 0 3px var(--hm-aizome)` dentro do
  contorno), para manter ≥ 3:1 dos dois lados.
- **Links não dependem só de cor (WCAG 1.4.1):** link de texto tem sublinhado
  sutil em repouso (`text-decoration-thickness: 1px`, cor `--hm-kin` a 50 %)
  que fica cheio no foco e no *hover*; CTA tem a seta `→`.
- Nenhum token tem valor escrito fora de `src/home.css`.

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

#### Celular (< 640 px, 1 coluna)

No celular, M1 fica acima do texto, com largura total menos a margem, e o
texto fica abaixo, fora da foto. As cenas de várias imagens mudam de
composição para não pedir rolagem a mais nem quebrar a continuidade de M1:

| Cena | Computador | Celular | Por quê |
| :-- | :-- | :-- | :-- |
| 03 Do quadro ao teclado | Foto B sobreposta a A, deslocada para baixo e à direita | **Uma só moldura M1.** A (quadro) fica; B (teclado) entra **dentro de M1** por cortina de baixo para cima e cobre A. Sem deslocamento lateral | Duas fotos sobrepostas em 1 coluna ficam pequenas demais e o deslocamento sai da tela |
| 05 Dia e noite | Duas fotos lado a lado, assimétricas | **Uma só moldura M1.** O dia aparece primeiro; a noite entra por cortina **vertical** (de cima para baixo) dentro de M1. A troca de luz conta a passagem do tempo como no computador | Lado a lado, cada foto teria menos de 160 px de largura |
| 08 A mesa de estudo | Três registros sobrepostos, com parallax 0/3/6 % | **Pilha** de três registros com deslocamento pequeno (8–12 px), um inteiro na frente e dois aparecendo atrás. Parallax desligado | Sobreposição larga não cabe em 1 coluna; parallax em tela pequena cansa |

A antiga cena "três caminhos" saiu na revisão 2 do storyboard. No celular, a
passagem 06 → 07 é a mesma do computador: M1 recua e a gravação dissolve
para o retrato, que fica acima do texto da sessão 02. Os três caminhos da
cena 01 ficam empilhados, um por linha, com área de toque ≥ 44 px.

Regras do celular:

- M1 **não some** entre as cenas 01 e 07: troca de conteúdo, não de lugar.
- A narração de cada cena tem no máximo duas linhas visíveis abaixo de M1, sem
  rolagem dentro do palco.
- A sessão 01 fica entre 200 e 260 vh (§3.5). Cenas 03 e 05 ganham o mesmo
  tempo das outras, não o dobro.
- O palco `sticky` usa `100svh`, para a barra do navegador não cortar o texto.
- No tablet (640–1024 px), as cenas 03 e 05 seguem o computador; a cena 08
  segue o celular.

### 4.4 Fotografia

- Proporções fixas: 4:5 (retrato), 3:2 (dimensões), 16:10 (projetos).
- Tratamento único: leve dessaturação (−10 %), sem vinheta, sem filtro de cor.
- **Retrato atual na H-1:** `retrato-original.jpg` (blazer azul) entra como
  está. O fundo azul/magenta da foto é harmonizado com o índigo da página por
  uma moldura `--hm-shoji-strong` e pelo espaço vazio (*Ma*) em volta, sem
  recorte de fundo nem filtro de cor. Um retrato novo
  (D-H2) é melhoria, não bloqueio.
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
/* Palco da sessão 01: uma timeline nomeada percorre a seção inteira.
   A altura é referência (§3.5) e fica numa variável só, calibrada na H-2. */
.hm-s01 {
  --hm-s01-altura: 330vh;               /* faixa de referência: 300–360vh */
  view-timeline: --hm-s01 block;
  height: var(--hm-s01-altura);
}
@media (max-width: 639.98px) { .hm-s01 { --hm-s01-altura: 240vh; } } /* 200–260vh */
.hm-s01__palco { position: sticky; top: 0; height: 100svh; }

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    /* Cena 02 (pensar · estudar): cortina de baixo para cima + push-in. */
    .hm-cena[data-cena="02"] {
      animation: hm-entra-cortina linear both, hm-push-in linear both;
      animation-timeline: --hm-s01, --hm-s01;
      animation-range: contain 12% contain 15%, contain 12% contain 30%;
    }
    /* … uma regra por cena (01–06), gerada pelo gerador a partir da tabela §3.1 … */
  }
}

@keyframes hm-entra-cortina { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0); } }
@keyframes hm-push-in       { from { scale: 1; } to { scale: 1.06; } }
```

As faixas de cada efeito saem de **uma tabela de dados** no gerador (§6.2), não
de CSS escrito à mão, para que tempo e ordem mudem num lugar só.

### 5.3 Sem suporte, ou com movimento reduzido

| Situação | Resultado |
| :-- | :-- |
| `prefers-reduced-motion: reduce` | Nenhuma animação. S01 vira **mosaico estático**: texto da cena 01 + retrato, depois as cenas 02–06 em grade (3 + 2 no computador, 1 coluna no celular), cada uma com imagem, as duas dimensões e a frase de narração. Seções com altura natural (sem `sticky`) |
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
<html lang="pt-BR">
…
<main id="conteudo" class="hm">
  <section class="hm-s01" aria-labelledby="hm-nome">
    <div class="hm-s01__palco">
      <!-- Cena 01: estática, é a primeira pintura -->
      <div class="hm-s01__texto">
        <p class="hm-num" aria-hidden="true">01</p>
        <h1 id="hm-nome">Maurício Yokoyama Issei</h1>
        <p class="hm-mensagem">Pensar profundamente. Construir com propósito.</p>
        <p class="hm-sub">Tecnologia, engenharia e conhecimento em prática.</p>
        <p class="hm-contexto">Há mais de vinte anos trabalho na distância entre o que foi desenhado e o que roda em produção.</p>
        <nav aria-label="Caminhos principais">
          <a href="#historia">Minha história</a> · <a href="#ideias">Minhas ideias</a> · <a href="#projetos">Meus projetos</a>
        </nav>
      </div>
      <figure class="hm-moldura hm-cena" data-cena="01">
        <picture>…retrato 4:5…</picture>
      </figure>

      <!-- Cenas 02–06: uma por par de dimensões -->
      <ol class="hm-cenas" aria-label="Como trabalho">
        <li><figure class="hm-cena" data-cena="02">
          <picture>…</picture>
          <figcaption>
            <span class="hm-dims">Pensar · Estudar</span>
            <p>Quase tudo começa no papel. Antes do código, entender o problema. Muitas vezes, estudar o que ainda não sei.</p>
          </figcaption></figure></li>
        <li><figure class="hm-cena" data-cena="03">
          <picture>…quadro branco…</picture><picture>…teclado…</picture>
          <figcaption>…Projetar · Construir…</figcaption></figure></li>
        <!-- 04 Liderar · Colaborar; 05 Validar · Sustentar (duas imagens); 06 Ensinar · Compartilhar -->
      </ol>
    </div>
  </section>
  <section id="historia" class="hm-s02" aria-labelledby="hm-historia">…cena 07…</section>
  <section id="ideias"   class="hm-s03" aria-labelledby="hm-ideias">…cena 08…</section>
  <section id="projetos" class="hm-s04" aria-labelledby="hm-projetos">…cena 09…</section>
</main>
```

- Um `<h1>`, quatro seções com `<h2>` (a 01 usa o `<h1>`). Total: **9 cenas
  em 4 sessões**, na ordem do storyboard.
- A ordem do HTML é a ordem de leitura: cena 01, depois as cenas 02–06 numa
  lista ordenada. Sem contador de avanço; nenhum texto "1/8". Sem segundo menu
  de caminhos no fim da sessão 01.
- A narração e as dimensões estão no `<figcaption>`, como texto real. Leitor
  de tela e busca leem tudo, com ou sem animação.
- Os caminhos do topo (cena 01) são âncoras internas; os CTAs de cada
  sessão levam às páginas de destino.
- Cabeçalho comum e rodapé de contato continuam (gerados como hoje).

### 6.2 Arquivos

| Arquivo | Ação |
| :-- | :-- |
| `src/index.html` | Novo conteúdo entre `<!-- HM:START -->` e `<!-- HM:END -->`, gerado. Fora do bloco: `<head>` (SEO, JSON-LD, consentimento) como hoje |
| `src/home.css` | Novo. Tokens `--hm-*`, layout, movimento. Substitui `index.css` **só** na home (o `/curriculo` continua com `index.css`) |
| `scripts/home/gen-home.mjs` | Novo gerador do bloco `HM:*`. Lê `cv.json` (nome), `ecosystem.nav.yaml` (projetos `experiencia`, destinos), `destaques.mjs` (recentes) e `home.data.mjs` (textos, fotos, tabela de movimento). |
| `scripts/home/home.data.mjs` | Novo. Textos fixos pedidos pelo Issei, as 9 cenas (dimensões, narração, marcos, imagens com `alt`), tabela de faixas do §3.1 |
| `scripts/gen-portfolio.mjs` | Para de escrever `PF:*` em `index.html` (só `curriculo.html`) |
| `scripts/gen-imagens.mjs` | Novo job `home`: fotos em AVIF/WebP 480/960/1600; capturas dos projetos 640/1280 |
| `assets-fonte/home/` | Originais das fotos + manifesto (fora do build) |
| `src/transicoes/*` | Nome just-in-time para a moldura de 02 → `/curriculo` |
| `AGENTS.md` | Uma linha registrando o namespace `hm-` (tokens Aizome + Kin só em `src/home.css`; tema escuro mantido, sem exceção de fundo claro) |
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

A lista segue o storyboard (§7.2 dele): **oito fotos** para as cenas 01–06,
uma manhã de sessão com luz de janela. Fotos horizontais 3:2 (exceto o
retrato, 4:5), ≥ 2400 px, sem marca de empresa visível, sem tela com dado
real legível, sem outras pessoas identificáveis (de costas ou fora de foco,
com autorização).

| # | Foto | Cena | Dimensões |
| :-- | :-- | :-- | :-- |
| 1 | Caderno: mãos com caneta, esboço real, livro técnico aberto | 02 (e 08) | pensar · estudar |
| 2 | Retrato 4:5, olhando para a câmera, fundo escuro ou neutro (opcional: o retrato atual já serve, §4.4) | 01, 07 | — |
| 3 | Quadro branco com diagrama genérico, Issei de perfil | 03 | projetar |
| 4 | Mãos no teclado, código desfocado | 03 | construir |
| 5 | Conversa de pé, 2–3 pessoas de costas, Issei ouvindo | 04 | liderar · colaborar |
| 6 | Duas telas de teste, de dia, sem dado legível | 05 | validar |
| 7 | Monitor de operação à noite, só a luz da tela | 05 | sustentar |
| 8 | Gravação do canal: câmera e microfone na borda, Issei falando | 06 (e 08) | ensinar · compartilhar |

Mais: **3 registros** para a sessão 03 (quadro de vídeo do canal, captura de
página de estudo, caderno) e **4 capturas** dos projetos da sessão 04. Um
quadro real do canal pode substituir a foto 8.

A sessão de fotos **não bloqueia** a H-1: o protótipo entra com o retrato
atual, quadros reais do canal e capturas das páginas. As fotos 1 e 3–7
enriquecem as cenas 02–05 depois. Sem elas, vale o plano B do storyboard:
lançar só com as cenas 01, 06 e 07–09.

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
| 6. Curta, sem repetição | ≤ 750 vh no computador e ≤ 600 vh no celular (§3.5); teste: nenhuma frase da home aparece igual em `/curriculo` ou `/catalogo`, exceto títulos; a narração não contém "resultados", "soluções" nem "experiências" (voz única, storyboard §9.1) |
| 7. Celular e movimento reduzido | `index.mobile.spec.js` (sem rolagem horizontal, ordem de leitura), `index.reduced.spec.js` (mosaico estático, zero animações ativas) |
| 8. Identidade e arquitetura | Gate verde: `gen-home --check`, `gen-portfolio --check`, `i18n:check`, `perf-budget`, a11y |

### 9.2 Acessibilidade (WCAG 2.2 AA)

- Contrastes do §4.1 cobertos por `tests/home.tokens.test.mjs`, que lê os
  tokens `--hm-*` de `src/home.css` e confere: `--hm-tinta`, `--hm-grafite`,
  `--hm-cinza` e `--hm-kin` ≥ 4,5:1 sobre `--hm-aizome` e `--hm-aizome-2`;
  `--hm-borda-controle` ≥ 3:1 sobre os dois fundos; `--hm-shoji` e
  `--hm-shoji-strong` não aparecem em `border` de `button`, `input`, `select`
  ou `a` com papel de botão; nenhum hexadecimal fora de `src/home.css`.
- Controles interativos usam `--hm-borda-controle` ou fundo `--hm-aizome-2`;
  nunca só `--hm-shoji` (WCAG 1.4.11).
- Foco: `2px solid var(--hm-kin)`, `outline-offset: 3px`, contra
  `--hm-aizome`; halo interno escuro sobre cartão ou foto clara (§4.1).
- Links (WCAG 1.4.1): sublinhado sutil em repouso nos links de texto; seta `→`
  nos CTAs. Nenhum link depende só da cor dourada.
- Texto sobre foto: nunca. O texto fica sempre sobre `--hm-aizome` ou `--hm-aizome-2`.
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
| A home destoa das outras páginas | Não destoa no tema: todas são escuras, e cabeçalho e rodapé comuns são os mesmos. A H-1 testa a navegação real Home → `/curriculo` e Home → `/catalogo` para conferir a passagem do índigo para o `#0d1117` |
| `sticky` alto cansa no celular | S01 fica entre 200 e 260 vh no celular, e as cenas 03, 05, 07 e 09 mudam de composição (§4.3) |
| Sessão 01 longa demais com 7 cenas | Altura é referência (300–360 vh) e tem teto; a H-2 calibra com capturas e encurta faixas antes de aumentar altura (§3.5) |
| Fotos escuras (cenas 05 e 06) somem no fundo índigo | Fio `--hm-shoji-strong` em M1 nessas cenas; a penumbra `--hm-aizome-deep` só em volta da foto da noite (§4.1) |

---

## 10. Decisões do Issei (uma de cada vez)

| Id | Pergunta | Recomendação |
| :-- | :-- | :-- |
| D-H1 | Qual tema a home usa? | **Decidida (Issei, 2026-11-24):** tema escuro **Aizome + Kin** (§4.1). Mantém o *Pure Dark Mode*; sem `ADR-pf-002` e sem variante clara |
| D-H2 | Você faz as 8 fotos da lista do §8? | Sim, sem pressa: enriquecem as cenas 02–05 e **não bloqueiam** a H-1 |
| D-H3 | Para onde vai "Conheça meus projetos"? (a) `/catalogo#projetos`, um grupo novo no catálogo gerado do YAML (`experiencia` + `experimento`); (b) a página do primeiro case; (c) só os 4 cartões, sem CTA | (a): reaproveita o catálogo, não cria página |
| D-H4 | Usa uma serifada editorial nos títulos? | **Decidida:** Shippori Mincho nos títulos de sessão e na mensagem central; Inter no restante |
| D-H5 | O cabeçalho comum muda na home? | **Decidida:** não. Cabeçalho e rodapé comuns continuam escuros, como em `/curriculo`, `/catalogo` e `/videos` |
| D-H6 | A página `/trajetoria` (PR #231) segue a direção antiga (escura, partículas) ou passa a seguir esta? | Pausar e alinhar à direção desta home |
| D-H7 | Pode usar diagramas do TGI 2004 como registro de estudo? | Não por enquanto (o TGI não é publicado) |

## 11. Unidades de trabalho

| UT | Conteúdo | Depende de |
| :-- | :-- | :-- |
| H-0 | D-H3 decidida; linha do namespace `hm-` no `AGENTS.md` | — |
| H-1 | `gen-home` + `home.data` + HTML estático (mosaico, 9 cenas) + `home.css` sem movimento, já com a paleta **Aizome + Kin** e o **retrato atual** + testes de tokens, fatos, nojs, mobile, SEO, foco e links. **Validação do protótipo:** navegação real Home → `/curriculo` e Home → `/catalogo` no computador e no celular, e revisão de acessibilidade (contraste, foco, 1.4.1, 1.4.11). As fotos novas (D-H2) não bloqueiam esta UT | H-0 |
| H-2 | Camada de movimento (cenas 01–09) + calibração da altura da S01 (300–360 vh) + View Transitions + `reduced.spec` + capturas | H-1 |
| H-3 | Sessão de fotos e fotos reais no `gen-imagens` (cenas 02–05) + `og-index` novo | D-H2 |
| H-4 | `/en/` (Argos no notebook) + `perf-budget` + revisão a11y e tom + validação com 3–5 pessoas | H-2 |

H-1 já é uma home completa e publicável, só sem movimento e com as imagens disponíveis hoje.
