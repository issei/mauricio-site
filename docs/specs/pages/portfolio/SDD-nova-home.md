---
id: sdd-nova-home
titulo: SDD — Nova página inicial "O pensamento em prática"
data: 2026-11-24
status: especificação + protótipo local validado (revisão 6; nada publicado)
leitor: Issei (decisões) e quem implementar a home
padrao_de_redacao: ptbr-controlado (perfil Técnico)
pedido: Issei, 2026-11-24 (thread "Planejar página cinematográfica da trajetória")
revisao: 2026-11-26, revisões 5 e 6 (símbolos, navegação, ritmo da rolagem; §12). Antes: 2026-11-25, arco digital da Sessão 01 (D-H8)
---

# SDD — Nova página inicial: "O pensamento em prática"

> **Estado:** especificação. Nada foi publicado. As revisões 5 e 6 (2026-11-26)
> foram validadas num protótipo local e estão no §12, que prevalece sobre
> as seções anteriores onde houver diferença.
>
> Antes delas: nada foi implementado nem gerado. O documento
> segue as três etapas pedidas: diagnóstico (§1), especificação (§2 a §8) e
> validação (§9). As decisões que só o Issei pode tomar estão no §10, uma de
> cada vez.

## 0. Resumo

A nova `index` tem **quatro sessões** que formam um só percurso visual:

| # | Sessão | Papel | Destino principal |
| :-- | :-- | :-- | :-- |
| 01 | Apresentação | Quem sou, em 3 segundos (retrato estático); depois 5 cenas do processo real de trabalho, com texto, capturas e fotos sem pose (cenas 01–06 do storyboard) | — (âncora para 02) |
| 02 | Minha história | Uma foto central e uma frase | `/curriculo` (Carreira) |
| 03 | Minhas ideias | Registros reais de estudo, vídeo e escrita | `/catalogo` (Conteúdos) e `/videos` |
| 04 | Meus projetos | Quatro projetos reais, da concepção à operação | ver D-H3 |

O elemento de continuidade é **a moldura**: um retângulo de fotografia que
nasce na abertura, muda de escala e de posição a cada sessão e no fim se
divide nas quatro molduras dos projetos. Junto dela corre **um traço dourado *Kintsugi***
fino, o único elemento gráfico da página. Na cena da crise (05), o traço racha
e é reparado: é a única vez que a metáfora do *Kintsugi* aparece em
movimento. Não há partículas, 3D, vídeo de IA nem efeito decorativo.

A técnica é **só CSS** (scroll-driven animations, `position: sticky`,
`clip-path`, `transform`) e as View Transitions que o site já usa. Nenhuma
dependência nova. Sem suporte ou com movimento reduzido, a página é uma
composição editorial estática completa.

A ordem das cenas, os gestos e a narração seguem o
[storyboard](storyboard/storyboard-home.md), revisão 4: **9 cenas em 4
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
| `public/fotos/` (usadas em `/life`) | Fotos antigas reais: `callcenter.jpg` (2000–2002), `formatura.jpg`, `programa.jpg` (2005), `eldorado.jpg` (o local, sem o Issei) | Marcos da linha do tempo na cena 07, se o Issei aprovar. As fotos de família (`casamento`, `filha`, `gemeos`, `careca`, `1982`) ficam só em `/life` |
| Miniaturas e quadros dos vídeos do canal (YouTube, `i.ytimg.com/vi/<id>/`) | Vídeos do canal. **A confirmar** em quais o Issei aparece: o canal começou com áudio gerado no NotebookLM | Sessão 03 (quadro de gravação), só de vídeo em que o Issei aparece |
| Capturas das páginas reais do site (cases, simulador, apresentação) | Registros reais de projeto | Sessão 04; cena 04 (diagrama das cinco camadas de `/agent-ready`) |
| Figuras das páginas de estudo do site | Registros reais de estudo (por exemplo, a Figura 3 de `/formulacao-de-problemas`, os estados do conhecimento) | Sessão 03 |
| TGI 2004 (`estudos/tgi-edi-2004/extraido/imagens/`) | Diagramas reais do trabalho acadêmico | Sessão 01 (dimensão "estudar") — **só com aprovação**, porque o TGI não é publicado (decisão de 2026-11-04) |
| `public/og-*.png` | Capas geradas, com texto | **Não usar** (não são fotos; trazem texto em imagem) |

**Achado principal:** existe **um** retrato atual do Issei. As outras fotos
reais são antigas e servem à linha do tempo, não às cenas de trabalho. A
primeira versão da sessão 01 pedia uma sequência de fotos das oito dimensões.
A revisão 4 (D-H8) troca a maior parte dessas fotos por artefatos reais: a
pergunta em texto, o diagrama do Agent Ready e o retrato atual. Ela precisa de
três fotos novas, sem pose (§8).

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
   artificial, sem imagem gerada por IA. Um artefato real (texto, captura,
   diagrama) vale mais que uma foto encenada.

**O processo é digital (revisão 4, D-H8).** O estudo e o pensamento do Issei
acontecem em ferramentas digitais: NotebookLM, busca avançada e metacognição
explícita, que decompõe e compõe as ideias antes e durante a construção. Por
isso a Sessão 01 não começa no papel. Ela começa com uma pergunta real, que se
desmonta em partes (decompor, cena 02). Depois as fontes fecham, e ele tenta
explicar com as próprias palavras (compor e verificar, cena 03). Na crise
(cena 05), a causa raiz vira a próxima pergunta, e o ciclo volta ao começo.

---

## 3. Sequência narrativa e decupagem

Convenção: **vh** de rolagem por sessão. "Quadro" = o que está na tela.

### 3.1 Sessão 01 — Apresentação (cenas 01–06; referência 300–360 vh no computador, a calibrar na H-2)

A sessão 01 tem **seis cenas** do storyboard: o retrato estático (cena 01) e
cinco cenas do processo de trabalho (cenas 02–06). Não há cena de "três
caminhos" no fim da sessão: ela repetia o menu da cena 01 e criava um falso
final (storyboard §9.1). Cada cena agrupa as dimensões do pedido pelo momento
do trabalho em que elas aparecem, de uma a três por cena. Uma cena por
dimensão virava uma lista de slogans (storyboard §9).

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
│   Há mais de vinte anos levo o que foi desenhado até a    │
│   produção e cuido para que continue rodando.             │
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
| 0–10 % | 01 O rosto | — | Retrato 4:5 | parada; de 6 % a 11 %, o retrato some (opacidade; escala 1 → 0,97) e o nome reduz | (texto da primeira pintura) |
| 10–30 % | 02 A pergunta | escutar · investigar · estudar | Nenhuma: texto real dentro de M1. A pergunta "Como tirar do time o trabalho manual?" e três partes, cada uma com as suas fontes (Quem vai operar? Runbook · Plantão / O que pode falhar? Incidentes · Logs / Como saber se funciona? Aceite · Métricas) | M1 entra por cortina de baixo para cima (10–12,5 %); a pergunta é digitada (13–18 %); as partes descem uma a uma (19–25 %); as fontes aparecem (23–28 %) | Quase tudo começa com uma pergunta. Antes de responder, desmonto a pergunta e estudo cada parte. |
| 30–42 % | 03 Fechar e explicar | sintetizar · aprender | Nenhuma: M1 fecha até virar o traço dourado | cortina ao centro (30–33,5 %); o traço cresce da esquerda para a direita depois que a moldura fecha (33,5–35,5 %) e fica parado até 40 %; o traço lateral some (33–41 %) | Então fecho as fontes e tento explicar. É aí que separo o que entendi do que só li. |
| 42–60 % | 04 Do diagrama ao teste | projetar · construir · validar | A: diagrama real das cinco camadas do Agent Ready (captura); B: mãos no teclado; C: duas telas de teste | M1 abre do centro (41–44,5 %); *pan* lento em A; B (48–51 %) e depois C (53–56 %) entram sobre o canto inferior direito de M1 e passam um pouco da moldura | Desenho para que outra pessoa consiga operar. Construo em passos pequenos, e o teste diz se está certo. |
| 60–80 % | 05 A noite e a causa | sustentar · orquestrar · evoluir | Monitor de operação à noite | a noite cai sobre a cena 04 em cerca de 3 toques de seta (D-H9; revisão 6); a luz da tela sobe; o traço lateral racha; a segunda frase entra; o traço se repara. Sem a faixa "Por que falhou?" (retirada na revisão 5) | Na crise, o tempo conta. Com o time, primeiro estabilizo; depois investigo a causa raiz. / A causa vira a próxima pergunta. |
| 80–100 % | 06 O rosto de novo | integrar · ensinar · compartilhar | Retrato (o mesmo da cena 01) | entra perto do rosto, em escala 1,4, e recua até o retrato inteiro (83–97 %; exceção de escala aprovada, §5.1) | O que consigo explicar, publico. Ensinar consolida o que aprendi. |

- Revisão 6: as faixas desta tabela são as da revisão 4. No protótipo atual, nenhuma transformação dura menos de 2 toques de seta e as faixas foram redistribuídas (§12.4).
- As trocas duram de 1,5 % a 3,5 % da faixa (troca curta, imagem longa). A
  narração muda por opacidade. Os números de faixa vêm do protótipo da
  revisão 4; a H-2 confere as faixas com capturas reais (§3.5).
- **O ciclo fecha na própria página.** A segunda frase da cena 05 ("A causa
  vira a próxima pergunta.") responde à pergunta da cena 02. As três partes da cena 02 voltam na ponte da sessão 03 (§3.3).
- **Digitação:** a pergunta da cena 02 é texto real,
  revelado por `clip-path` com `steps()`. O texto inteiro está no HTML.
- A cena 03 é o silêncio da página: nenhuma imagem, só o traço.
- **Sem contador numérico.** A sequência não mostra "1/8 … 8/8". Desde a
  revisão 5, nove pontos dourados à direita mostram o avanço e servem de
  âncora (§12.3).
- Os três caminhos aparecem na cena 01. A partir da cena 02, viram o menu
  "Sessões" (à esquerda; no celular, no topo; §12.3). As sessões 02, 03 e 04
  são os próprios caminhos, cada uma com seu CTA.

**Saída para 02 (cena 06 → 07):** no fim da cena 06 (97–100 %), M1 reduz
para 0,88 e desliza para a esquerda, na direção do retrato da sessão 02. O
rosto da cena 06 e o retrato da sessão 02 são a mesma pessoa: a passagem é
por posição, sem dissolve.

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
  processamento de dados · 2003–2012, 9 anos como Analista de Desenvolvimento na
  Sysgen · 2012–2017, 6 anos em Sustentação e Inovação na Indra · 2018–hoje,
  8 anos em Sustentação e como Tech Lead na Rede · **2024–hoje** arquitetura, IA aplicada,
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
  aqui. As três perguntas que seguem (quem vai operar, o que pode falhar, como
  saber se funciona) são as três partes da pergunta da cena 02.
- **img1:** quadro de gravação de um vídeo do canal; **img2:** página de estudo
  aberta (captura real de uma página do site, sem texto legível pequeno);
  **img3:** figura real de uma página de estudo (proposta: a Figura 3 de
  `/formulacao-de-problemas`, os estados do conhecimento).
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
| 01 | 01–06 | **360 vh** (revisão 6) | **360 vh** (revisão 6; era 260 vh) |
| 02 | 07 | 210 vh (revisão 6; era 120 vh) | 194 vh (era 100 vh) |
| 03 | 08 | 210 vh (revisão 6; era 130 vh) | 194 vh (era 110 vh) |
| 04 | 09 | 180 vh (revisão 6; era 140 vh) | 170 vh (era 130 vh) |
| **Total** | **9 cenas** | **960 vh** na revisão 6 (as sessões se sobrepõem; ver §12.4) | **918 vh** |

- A altura da sessão 01 é **um valor de referência**. A H-2 calibra o valor
  final com capturas reais e com a regra "cada cena dura o tempo de ler uma
  frase". O valor fica numa só variável (`--hm-s01-altura`, §5.2).
- Limite superior: a sessão 01 não passa de 360 vh, no computador e no
  celular (no celular era 260 vh; mudou na revisão 6, §12.4). Se as cenas não couberem, a H-2 encurta faixas, não
  aumenta a altura.
- A revisão 4 tem mais tempos dentro de cada cena (digitação, partes, traço
  que racha). Por isso o protótipo usa o teto: 360 vh e 260 vh. Se a leitura
  ficar apressada na H-2, a primeira opção é encurtar a cena 01 (0–10 %) e as
  trocas.

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
| 04 Do diagrama ao teste | B e C entram sobre o canto inferior direito de M1 e passam um pouco da moldura | **Uma só moldura M1.** A (diagrama) fica; B (teclado) e depois C (teste) entram **dentro de M1** por cortina lateral e cobrem A | Duas imagens sobrepostas em 1 coluna ficam pequenas demais e o deslocamento sai da tela |
| 05 A noite e a causa | Uma foto em M1 (sem faixa de texto desde a revisão 5) | Igual ao computador | Uma só imagem cabe em 1 coluna |
| 08 A mesa de estudo | Três registros sobrepostos, com parallax 0/3/6 % | **Pilha** de três registros com deslocamento pequeno (8–12 px), um inteiro na frente e dois aparecendo atrás. Parallax desligado | Sobreposição larga não cabe em 1 coluna; parallax em tela pequena cansa |

A antiga cena "três caminhos" saiu na revisão 2 do storyboard. No celular, a
passagem 06 → 07 é a mesma do computador: o rosto recua até o retrato
inteiro, e a sessão 02 começa com o retrato acima do texto. Os três caminhos da
cena 01 ficam empilhados, um por linha, com área de toque ≥ 44 px.

Regras do celular:

- M1 **não some** entre as cenas 01 e 07: troca de conteúdo, não de lugar.
- A narração de cada cena tem no máximo duas linhas visíveis abaixo de M1, sem
  rolagem dentro do palco.
- A sessão 01 fica entre 200 e 260 vh (§3.5). A cena 04 ganha o mesmo tempo
  das outras, não o dobro.
- O palco `sticky` usa `100svh`, para a barra do navegador não cortar o texto.
- No tablet, a cena 04 segue o computador em paisagem e o celular em
  retrato; a cena 08 segue o celular.

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
- **Exceção única de escala (cena 06, aprovada pelo Issei em 2026-11-25):** o
  retrato entra em escala 1,4 e recua até 1 dentro de M1. A proposta era 2 → 1;
  o Issei escolheu suavizar para 1,4 → 1. O movimento é um recuo (a imagem diminui enquanto
  a pessoa rola), M1 corta o excesso e o layout não muda. Nenhum outro
  elemento passa de 1,06. O arquivo do retrato precisa ter resolução para o
  recorte de perto (§8).
- Cada efeito é usado no máximo duas vezes (sem repetição mecânica). Na
  revisão 4: digitação 2× (cenas 02 e 05), cortina ao centro 2× (fecha na 03,
  abre na 04), entrada sobre o canto 2× (B e C na 04).

### 5.2 Mecanismo

```css
/* Palco da sessão 01: uma timeline nomeada percorre a seção inteira.
   A altura fica numa variável só (§3.5). */
.hm-s01 {
  --hm-s01-altura: 360vh;               /* teto no computador */
  view-timeline: --hm-s01 block;
  height: var(--hm-s01-altura);
}
/* Revisão 6: o celular também usa 360vh, para nenhuma passagem ficar brusca (§12.4). */
.hm-s01__palco { position: sticky; top: 0; height: 100svh; }

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    /* Todo elemento animado da S01 anda na mesma timeline, de 0 % a 100 %.
       A porcentagem do keyframe é a porcentagem da rolagem da seção. */
    .hm-tl {
      animation-timeline: --hm-s01;
      animation-range: contain 0% contain 100%;
      animation-fill-mode: both;
      animation-timing-function: linear;
    }
    /* Cena 02: a pergunta é digitada entre 13 % e 18 % da rolagem. */
    [data-cena="02"] .hm-q__digita { animation-name: hm-digita; animation-timing-function: steps(34, end); }
    /* Cena 05: o traço lateral racha e se repara. */
    .hm-fio { animation-name: hm-fio-racha; }
  }
}

@keyframes hm-digita { 0%, 13% { clip-path: inset(0 100% 0 0); } 18%, 100% { clip-path: inset(0); } }
@keyframes hm-fio-racha {
  0%, 61%   { clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%, 0 50%, 100% 50%, 100% 100%, 0 100%); }
  63%, 76%  { clip-path: polygon(0 0, 100% 0, 100% 43%, 0 43%, 0 57%, 100% 57%, 100% 100%, 0 100%); }
  80%, 100% { clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%, 0 50%, 100% 50%, 100% 100%, 0 100%); }
}
```

O protótipo da revisão 4 (fora do repositório, com imagens provisórias)
aplica essas regras em todas as cenas, sem JavaScript.

As faixas de cada efeito saem de **uma tabela de dados** no gerador (§6.2), não
de CSS escrito à mão, para que tempo e ordem mudem num lugar só.

### 5.3 Sem suporte, ou com movimento reduzido

| Situação | Resultado |
| :-- | :-- |
| `prefers-reduced-motion: reduce` | Nenhuma animação. S01 vira **mosaico estático**: texto da cena 01 + retrato, depois as cenas 02–06 em grade (3 + 2 no computador, 1 coluna no celular). Cada cena mostra o seu quadro final (a pergunta com as três partes, o traço, o diagrama com a tela de teste, a noite, o retrato), as dimensões e a narração. Seções com altura natural (sem `sticky`) |
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
        <p class="hm-contexto">Há mais de vinte anos levo o que foi desenhado até a produção e cuido para que continue rodando.</p>
        <nav aria-label="Caminhos principais">
          <a href="#historia">Minha história</a> · <a href="#ideias">Minhas ideias</a> · <a href="#projetos">Meus projetos</a>
        </nav>
      </div>
      <figure class="hm-moldura hm-cena" data-cena="01">
        <picture>…retrato 4:5…</picture>
      </figure>

      <!-- Cenas 02–06: uma por momento do trabalho -->
      <ol class="hm-cenas" aria-label="Como trabalho">
        <li><figure class="hm-cena" data-cena="02">
          <div class="hm-q">
            <p>Como tirar do time o trabalho manual?</p>
            <ul aria-label="A pergunta em partes">
              <li>Quem vai operar? <span>Runbook · Plantão</span></li>
              <li>O que pode falhar? <span>Incidentes · Logs</span></li>
              <li>Como saber se funciona? <span>Aceite · Métricas</span></li>
            </ul>
          </div>
          <figcaption>
            <span class="hm-dims">Pensar · Investigar · Estudar</span>
            <p>Quase tudo começa com uma pergunta. Antes de responder, desmonto a pergunta e estudo cada parte.</p>
          </figcaption></figure></li>
        <li><figure class="hm-cena" data-cena="03">
          <span class="hm-linha"></span><!-- o traço: decorativo, sem texto -->
          <figcaption>…Aprender…</figcaption></figure></li>
        <li><figure class="hm-cena" data-cena="04">
          <picture>…diagrama do Agent Ready…</picture><picture>…teclado…</picture><picture>…teste…</picture>
          <figcaption>…Projetar · Construir · Validar…</figcaption></figure></li>
        <!-- 05 Sustentar · Orquestrar · Evoluir: foto da noite (sem faixa de texto);
             06 Ensinar · Compartilhar: o retrato -->
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
  lista ordenada. Sem contador numérico; nenhum texto "1/8". O menu "Sessões"
  e os pontos de avanço são dois `<nav>` próprios (§12.3).
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

A lista segue o storyboard (§7.2 dele). Na revisão 4 (D-H8), a Sessão 01
troca as fotos de pose por artefatos reais. Das oito fotos da primeira lista,
três continuam necessárias, uma continua opcional e quatro saem. Fotos
horizontais 3:2, ≥ 2400 px, sem marca de empresa visível, sem tela com dado
real legível, sem outras pessoas identificáveis.

| # | Foto | Cena | Situação na revisão 4 |
| :-- | :-- | :-- | :-- |
| 1 | Caderno: mãos com caneta, esboço, livro aberto | — | **Sai.** A cena 02 mostra a pergunta em texto real. Na sessão 03, uma figura real de estudo ocupa o lugar |
| 2 | Retrato 4:5, olhando para a câmera | 01, 06, 07 | **Opcional.** O retrato atual serve (§4.4). Para o recorte de perto em escala 1,4 (cena 06), o arquivo precisa ter pelo menos 1600 px de largura (o atual tem 1600 × 2000); 2400 px dá nitidez também em telas grandes |
| 3 | Quadro branco com diagrama, Issei de perfil | — | **Sai.** O diagrama real do Agent Ready (captura) ocupa a cena 04 |
| 4 | Mãos no teclado, código desfocado | 04 | **Necessária.** Sem pose: mãos e tela |
| 5 | Conversa de pé, Issei ouvindo | — | **Sai.** A colaboração fica na narração da cena 05 ("Com o time") |
| 6 | Duas telas de teste, de dia, sem dado legível | 04 | **Necessária** |
| 7 | Monitor de operação à noite, só a luz da tela | 05 | **Necessária** |
| 8 | Gravação do canal: câmera e microfone na borda | 08 | **Opcional.** Um quadro real do canal serve na sessão 03 |

Mais: a **captura** do diagrama das cinco camadas de `/agent-ready` (cena
04), **3 registros** para a sessão 03 (quadro de vídeo do canal, captura de
página de estudo, figura real de estudo) e **4 capturas** dos projetos da
sessão 04.

A sessão de fotos **não bloqueia** a H-1: o protótipo entra com o retrato
atual, quadros reais do canal e capturas das páginas. As cenas 02 e 03 não
dependem de foto. As fotos 4, 6 e 7 enriquecem as cenas 04 e 05 depois. Sem
elas, vale o plano B: a cena 04 fica só com o diagrama, e a cena 05 mostra
só a noite sobre o fundo `--hm-aizome-deep`, sem foto.

**Imagens provisórias do protótipo (decisão do Issei, 2026-11-24).** Para
validar a ideia, o protótipo pode usar imagens geradas por IA nas oito
posições acima. Elas ficam fora de `public/` e não vão para produção. A regra
5 da §2 (foto documental, sem imagem gerada por IA) continua valendo para a
versão publicada: antes da publicação, cada imagem provisória é trocada pela
foto real da mesma posição, ou a cena sai (plano B).

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
- Texto sobre foto: nunca. (A faixa "Por que falhou?" da cena 05 saiu na
  revisão 5.)
- Digitação: o efeito usa só `clip-path`. O texto completo está no HTML, e o
  leitor de tela lê a frase inteira desde o início. As partes da pergunta da
  cena 02 são uma lista (`ul`) com rótulo.
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
| Sessão 01 longa demais com 6 cenas | Altura é referência (300–360 vh) e tem teto; a H-2 calibra com capturas e encurta faixas antes de aumentar altura (§3.5) |
| Sessão 01 apressada: a revisão 4 tem mais tempos por cena dentro do mesmo teto | A H-2 confere se cada frase dá tempo de leitura numa rolagem normal; se não der, encurta a cena 01 e as trocas (§3.5) |
| Retrato perde nitidez no recorte de perto (escala 1,4) | `srcset` com a versão de 1600 px; o recorte nunca passa de 1,4× (§5.1) |
| Fotos escuras (cenas 05 e 06) somem no fundo índigo | Fio `--hm-shoji-strong` em M1 nessas cenas; a penumbra `--hm-aizome-deep` só em volta da foto da noite (§4.1) |

---

## 10. Decisões do Issei (uma de cada vez)

| Id | Pergunta | Recomendação |
| :-- | :-- | :-- |
| D-H1 | Qual tema a home usa? | **Decidida (Issei, 2026-11-24):** tema escuro **Aizome + Kin** (§4.1). Mantém o *Pure Dark Mode*; sem `ADR-pf-002` e sem variante clara |
| D-H2 | Você faz as fotos da lista do §8? | Sim, sem pressa. Na revisão 4 são três (4, 6 e 7): enriquecem as cenas 04 e 05 e **não bloqueiam** a H-1 |
| D-H3 | Para onde vai "Conheça meus projetos"? (a) `/catalogo#projetos`, um grupo novo no catálogo gerado do YAML (`experiencia` + `experimento`); (b) a página do primeiro case; (c) só os 4 cartões, sem CTA | (a): reaproveita o catálogo, não cria página |
| D-H4 | Usa uma serifada editorial nos títulos? | **Decidida:** Shippori Mincho nos títulos de sessão e na mensagem central; Inter no restante |
| D-H5 | O cabeçalho comum muda na home? | **Decidida, revista em 2026-11-26:** cabeçalho e rodapé continuam os comuns, escuros. Na home, a pedido do Issei, o cabeçalho some a partir da cena 02 e volta no contato (§12.3) |
| D-H6 | A página `/trajetoria` (PR #231) segue a direção antiga (escura, partículas) ou passa a seguir esta? | Pausar e alinhar à direção desta home |
| D-H7 | Pode usar diagramas do TGI 2004 como registro de estudo? | Não por enquanto (o TGI não é publicado) |
| D-H8 | Qual gesto de origem a Sessão 01 usa, agora que o processo é digital? | **Decidida (Issei, 2026-11-25):** combinar os dois. A cena 02 desmonta a pergunta; a cena 03 fecha as fontes para explicar (§2, §3.1). A exceção de escala da cena 06 foi aprovada em 1,4 → 1 (Issei, 2026-11-25; §5.1) |
| D-H9 | A noite da cena 05 entra por corte seco ou por transformação? | **Decidida (Issei, 2026-11-26):** queda da noite em cerca de 3 toques de seta. O corte seco fica só para comparação no protótipo (`data-noite="corte"`) |
| D-H10 | Onde fica o ouro quando o símbolo e o fio disputam o mesmo quadro? | **Em aberto.** Recomendação aplicada no protótipo: "o ouro segue a atenção" (§12.2) |

## 11. Unidades de trabalho

| UT | Conteúdo | Depende de |
| :-- | :-- | :-- |
| H-0 | D-H3 decidida; linha do namespace `hm-` no `AGENTS.md` | — |
| H-1 | `gen-home` + `home.data` + HTML estático (mosaico, 9 cenas) + `home.css` sem movimento, já com a paleta **Aizome + Kin** e o **retrato atual** + testes de tokens, fatos, nojs, mobile, SEO, foco e links. **Validação do protótipo:** navegação real Home → `/curriculo` e Home → `/catalogo` no computador e no celular, e revisão de acessibilidade (contraste, foco, 1.4.1, 1.4.11). As fotos novas (D-H2) não bloqueiam esta UT | H-0 |
| H-2 | Camada de movimento (cenas 01–09), símbolos, menu, pontos e cabeçalho da revisão 5 + altura da S01 em 360 vh (revisão 6) + View Transitions + `reduced.spec` + capturas | H-1 |
| H-3 | Fotos reais no `gen-imagens` (fotos 4, 6 e 7 do §8, cenas 04 e 05) + `og-index` novo | D-H2 |
| H-4 | `/en/` (Argos no notebook) + `perf-budget` + revisão a11y e tom + validação com 3–5 pessoas | H-2 |

H-1 já é uma home completa e publicável, só sem movimento e com as imagens disponíveis hoje.

## 12. Revisões 5 e 6 (Issei, 2026-11-26)

Validadas num protótipo local (branch `local/nova-home`, fora do
repositório, com imagens provisórias). Onde esta seção diferir das
anteriores, vale esta seção.

### 12.1 Textos (revisão 5)

| Lugar | Texto |
| :-- | :-- |
| Contexto da cena 01 | Há mais de vinte anos levo o que foi desenhado até a produção e cuido para que continue rodando. |
| Pergunta da cena 02 | Como tirar do time o trabalho manual? (as três partes não mudam; a sessão 03 repete essas perguntas) |
| Cena 03 | Então fecho as fontes e tento explicar. É aí que separo o que entendi do que só li. |
| Cena 05 | Na crise, o tempo conta. Com o time, primeiro estabilizo; depois investigo a causa raiz. / A causa vira a próxima pergunta. |
| Cena 06 | O que consigo explicar, publico. Ensinar consolida o que aprendi. |
| Dimensões | 02 Escutar · Investigar · Estudar; 03 Sintetizar · Aprender; 04 Projetar · Construir · Validar; 05 Sustentar · Orquestrar · Evoluir; 06 Integrar · Ensinar · Compartilhar |
| Marcos da sessão 02 | 1997 curso técnico · 2003–2012, 9 anos como Analista de Desenvolvimento na Sysgen · 2012–2017, 6 anos em Sustentação e Inovação na Indra · 2018–hoje, 8 anos em Sustentação e como Tech Lead na Rede · 2024–hoje |

- A faixa "Por que falhou?" saiu da imagem da cena 05 (o Issei a achou
  desconexa).
- O `cv.json` registra a Sysgen com 8 anos e 6 meses; o marco usa os 9 anos
  pedidos pelo Issei.

### 12.2 Camada de símbolos (revisão 5)

O processo real do Issei aparece como uma sequência de ícones de linha, fora
de M1, no canto superior direito (48 px no computador, 36 px no celular).
Sprite: [`storyboard/simbolos/simbolos.svg`](storyboard/simbolos/simbolos.svg),
12 símbolos `hm-s-*`.

- Sequência: dor → empatia → requisitos (02) → explicar (03) → diagrama →
  protótipo → validado (04) → time → time quebrado → time (05) → grafo →
  camadas → ponto (06).
- **O ponto que desenha:** um ponto fica sempre no centro da casa do
  símbolo. Cada estado se recolhe nele (`clip-path: circle()`) e o seguinte
  nasce dele, com um pulso do ponto. Da entrada de M1 até o fim da S01, a
  casa nunca fica vazia. A única troca no lugar é a do time: uma das mãos
  solta na rachadura e volta no reparo. No fim, o anel aberto da dor se fecha
  no ponto.
- **Ouro (D-H10, em aberto):** um só elemento dourado por quadro no palco.
  Recomendação aplicada: os símbolos ficam dourados nas cenas 02, 04 e 06; na
  03 o ouro é o traço central (o balão fica cinza); na 05 o ouro é o fio que
  racha (time e grafo ficam cinza).
- A gramática "recolher no ponto e nascer dele" conta como **um efeito
  só**, do único elemento contínuo; por isso não entra no limite de duas
  repetições do §5.1.

### 12.3 Navegação e cabeçalho (revisão 5)

- **Menu "Sessões":** quando a cena 01 dá lugar à 02, os três caminhos viram
  um `<nav aria-label="Sessões">` fixo (Apresentação, Minha história,
  Minhas ideias, Meus projetos). No computador (≥ 1100 px, paisagem) fica numa
  coluna à esquerda, e o recuo esquerdo do palco cresce para caber o menu (a
  moldura vai a 46 % da largura em 1280 px). No celular é uma barra de 44 px no
  topo (Início, História, Ideias, Projetos; o nome acessível do primeiro é
  "Início: apresentação"). A sessão atual tem opacidade cheia e um traço
  grafite, nunca dourado.
- **Pontos de avanço:** `<nav aria-label="Cenas da história">` com 9 pontos
  dourados à direita, um por cena. Cada ponto é um link de 24 × 24 px que leva
  ao quadro em que a cena está completa (âncoras `hm-c01`–`hm-c06` dentro da
  S01, posicionadas pela fração da rolagem útil; `#historia`, `#ideias`,
  `#projetos`). Estados: não visto, atual (cresce e acende) e já visto.
- **Cabeçalho comum:** some a partir da cena 02 e volta quando o rodapé com
  o contato entra. Se receber foco pelo teclado, aparece. O menu e os pontos
  saem quando o cabeçalho volta.
- **Ouro na navegação:** os pontos são interface, como o anel de foco, e
  ficam fora da regra de um só ouro por quadro, que vale para o palco.
- Tudo continua só com CSS (`timeline-scope`, `view-timeline` por sessão).
  No modo reduzido ou sem suporte, o cabeçalho fica como antes, e o menu e os
  pontos não aparecem.

### 12.4 Ritmo da rolagem (revisão 6)

O Issei contou cerca de 130 toques de seta para ver a página e achou muito. Algumas etapas
pareciam ter muito mais rolagem que outras. O que deve ficar é a
**constância**: elementos sempre se movendo ou se transformando, sem trocas
rápidas de conteúdo.

| Tela | Toques de seta (40 px), antes | Depois |
| :-- | :-- | :-- |
| 1440 × 900 | 142 | 110 |
| 1536 × 730 (notebook a 125 %) | 116 | 90 |
| 390 × 844 (celular) | 104 | 96 |

- **Sessões 02–04:** eram 85 dos 142 toques, quase paradas. Agora cada uma
  tem cerca de 18 toques: menos respiro vertical, imagens menores e entradas
  espalhadas ao longo da sessão.
- **Passagens:** nenhuma transformação dura menos de 2 toques. A troca 03 → 04
  acontece em etapas: o traço se abre na moldura, o diagrama nasce dele, e só
  depois entram o teclado e o teste. A passagem 06 → 07 foi esticada, e o
  rosto continua chegando alinhado ao retrato da sessão 02.
- **A noite (D-H9):** cai sobre a cena 04 em cerca de 3 toques (no celular,
  por dissolução), e o fio racha no mesmo movimento. Não há mais corte seco.
- **Altura da S01:** 360 vh no computador e no celular. No celular, 260 vh
  deixava cada toque com 3,6 % da sessão, e as passagens ficavam bruscas; a
  constância vale mais que o número de toques.
- **Medida de constância:** captura a cada toque de seta e diferença média de
  pixels entre capturas seguidas. Em 1440 × 900 restam 6 toques sem mudança
  visível (nunca mais de 2 seguidos). Os 2 picos que sobram são o deslize
  contínuo do rosto. Em 360 × 740 sobram 2 toques pouco acima do limite.
- **Primeira rolagem:** o travamento relatado não se reproduziu no navegador
  automático (nenhum quadro acima de 50 ms, no servidor de desenvolvimento
  e no build). O trace mostrou o que pesava no início, e isso foi corrigido:
  fontes pedidas antes, serifada só no peso 500, retrato de 327 para 170 KB e
  `overflow-anchor: none`. Falta o Issei confirmar no navegador dele.

### 12.5 Valores finais do protótipo (revisão 6)

As porcentagens são da rolagem útil da S01 (faixa `contain` menos os 30 vh
em que ela se sobrepõe à S02).

| Item | Valor |
| :-- | :-- |
| Alturas | S01 360 vh (computador e celular); S02 210 vh e S03 210 vh (`--f` 80 vh); S04 180 vh. Celular: S02 194 vh e S03 194 vh (`--f` 64 vh); S04 170 vh |
| 03 → 04 | M1 abre do centro (39,5–43,5 %); teclado entra 48,5–51,5 % e sai 56–58,5 %; teste entra 53–56 % e sai 57–59,5 % |
| Noite (padrão) | Computador: véu desce por `clip-path` (57–63 %). Celular: véu por opacidade (54–63 %). M1 da cena 05 de 63 % a 85 %; a luz da tela sobe de 63 % a 70 %; legenda de 65 % a 79 %, sai até 80,5 % |
| Corte seco (só para comparar) | `data-noite="corte"`: M1 da cena 05 entra em 60,1 %; a luz sobe de 61 % a 68 % |
| Cena 06 | O rosto entra de 78 % a 85 %; escala 1,4 → 1 de 83 % a 92 %; M1 desliza até o retrato de 89 % a 100 %; legenda de 84,5 % a 90 %, sai até 93,5 % |
| Âncoras dos pontos | `hm-c01`–`hm-c06`, `--p` = 0 / 0,283 / 0,356 / 0,565 / 0,763 / 0,89; `top: calc(var(--p) * (100% - 130vh))` |
| Pontos | Não visto: opacidade 0,25; atual: escala 1,5 com halo; já visto: opacidade 0,6 |
| Cabeçalho | Sai de 6 % a 10 % da S01; volta quando o rodapé entra |
| Ouro | Opção A por padrão; `data-ouro="dois"` mostra a alternativa (D-H10) |
