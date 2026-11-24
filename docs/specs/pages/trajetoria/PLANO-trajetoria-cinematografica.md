---
id: plano-trajetoria-cinematografica
titulo: Plano de desenvolvimento — página cinematográfica da trajetória
data: 2026-11-23
revisao: 2026-11-24 (alinhado ao resumo do tutorial; vídeos por HyperFrames, ver SDD §6)
status: proposta (só planejamento; nada implementado)
leitor: Issei (decisão) e quem implementar a página
---

# Página cinematográfica da trajetória — plano de desenvolvimento

> **Estado:** proposta. Este documento planeja a página. Ele não muda código.
>
> **Atualização de 2026-11-24 (ferramenta de vídeo):** por sugestão do Issei,
> as transições T1 e T3 passam a ser renderizadas no **HyperFrames** (HeyGen,
> código aberto, local, sem custo) a partir das próprias cenas Three.js, em vez
> de vídeo de IA no Higgsfield. Onde este plano fala em Higgsfield, Seedance,
> prompt de vídeo ou créditos, vale o [SDD §6](SDD-trajetoria.md). O resto do
> plano não muda.
> As decisões em aberto estão no §11. Cada uma vai ao Issei uma de cada vez.
> A especificação de implementação está em [`SDD-trajetoria.md`](SDD-trajetoria.md).

## 0. Resumo

Uma página nova, `/trajetoria`, conta a carreira do Maurício como um
**plano-sequência único**: a pessoa rola e a câmera avança por cinco
"ambientes", um por fase da carreira. Um fio de luz atravessa todos os
ambientes. Ele é o elemento de continuidade (e conversa com o "Mapa de Linhas"
da home).

A técnica é **híbrida**:

| Camada | O que faz | Por quê |
| :-- | :-- | :-- |
| Vídeo gerado por IA, exportado como **sequência de quadros** | Só as **2 transições de matéria orgânica** (T1 e T3), onde nada mais resolve | Transformação de ambiente é cara de modelar em 3D e barata de gerar em vídeo |
| **CSS** (`clip-path`, escala, imagens sobrepostas) | A quebra de ritmo do Ato IV (uma tela que se expande até ocupar o quadro) | Sem custo de geração; nítido; preciso na rolagem |
| **Three.js + shaders GLSL** | Os 5 ambientes "vivos": o fio, partículas, profundidade, reação ao ponteiro | Fluidez a 60 fps, interação nativa, quase nenhum byte de banda |
| **HTML semântico** | Todo o texto da história | Leitor de tela, busca, tradução `/en/`, e funciona sem JavaScript |

O ponto de costura: **o último quadro de cada ambiente 3D vira o quadro inicial
do vídeo de IA, e o último quadro do vídeo é o primeiro estado do ambiente 3D
seguinte**. Assim o corte some.

### Sobre o vídeo de referência

O YouTube bloqueou a leitura automática do vídeo. O Issei enviou um resumo do
tutorial (Lucas Marte, página "GTA 360"), guardado em
`/mnt/project-files/trajetoria-cinematografica/referencia-tutorial.md`. Este
plano segue o método dele e muda o que precisa mudar para o site:

| No tutorial | Neste plano |
| :-- | :-- |
| Site como plano-sequência acionado pela rolagem | Igual (§3) |
| Texto curto: frase forte no centro só na abertura e no fim; no meio, frases curtas **nas margens laterais**, centro livre para a imagem | Igual (§3.4). O texto completo de cada ato fica no HTML, legível no modo estático (§4.1) |
| Storyboard em rascunho a lápis antes das imagens finais, para validar a continuidade da câmera | Nova fase F0b (§10) |
| Imagens de início e fim de cada cena, sem texto embutido, expandidas por *outpainting* para tela larga | Igual. Aqui os quadros de costura saem do próprio Three.js (§5.1); *outpainting* só se o quadro gerado ficar estreito |
| Vídeo de IA (Higgsfield, modelo Seedance) chamado pelo Claude Desktop via MCP | **Trocado** pelo HyperFrames (render local e gratuito das cenas Three.js; SDD §6). Higgsfield fica como alternativa paga |
| IA só onde há movimento orgânico; o resto com imagens, escala e `clip-path` | Igual: 2 vídeos de IA em vez de 4 (§3.3) |
| **Quebra de ritmo** depois de vários movimentos aéreos, com uma tela que se expande por máscara | Igual, no Ato IV (plano 05b) |
| Final: corte seco do mapa para **partículas em canvas** que convergem no logotipo | Igual: a malha vira partículas que formam o grafo e, no fim, o monograma (plano 07) |
| Corte seco no lugar de transição com quadro borrado | Regra do §3.4 |
| `video.currentTime` guiado pela rolagem | Troquei por sequência de quadros, por precisão no Safari e no celular (§5.2, D-TC-3) |
| Depuração por captura de tela | Igual, com Playwright tirando capturas em pontos fixos da rolagem (§10, F4) |

---

## 1. Fontes da história (o que é fato)

Tudo que a página afirma sai de fonte publicada no próprio site. Nenhum fato
novo é inventado aqui.

| Fato | Fonte |
| :-- | :-- |
| Técnico em Processamento de Dados, Colégio Guarani, 1997–1999 | `public/cv.json` → `Formacao_Academica` |
| Bacharelado em Sistemas de Informação (ênfase em Logística e Cadeia de Suprimentos), Mackenzie, 2001–2005 | idem |
| TGI 2004 sobre EDI na gestão de pedidos, com Priscila e Sergio | `docs/specs/pages/tgi-edi/` (PR #123) |
| Sysgen, Analista Programador Java, ago 2003 – jan 2012 (J2EE, MVC, UML, geração de código por MDA) | `cv.json` → `Experiencia` |
| Indra, Senior Java / Mobile Systems Analyst, fev 2012 – dez 2017 (liderança de time, seguros, time de inovação mobile) | idem |
| Serasa Experian, Analista de Desenvolvimento, dez 2017 – jan 2018 (API corporativa OAuth 2, API First) | idem |
| Rede (Itaú Unibanco), Tech Lead, fev 2018 – hoje (Salesforce + AWS) | idem |
| Resultados na Rede: economia de mais de 3 MM no contrato Salesforce (2020); entregas em D0 (2022); Pipe Automática, +15 % no atingimento de metas (2025) | `cv.json` → `Resultados` |
| Pós em Ciência de Dados, Mackenzie, 2019–2021 | `cv.json` |
| Certificações em agentes de IA, MCP, knowledge graphs (2025–2026) | `cv.json` → `Certificados` |
| Canal no YouTube, artigos e estudos publicados | `/videos`, `/catalogo` |

> **Itaú:** a trajetória do Maurício pode citar o Itaú e a Rede (regra do
> projeto). A restrição de marca vale só para a página do estudo Digital
> Workplace, não para esta.

O texto da página segue a skill **ptbr-controlado** (perfil Redação). O tom é o
do site: engenharia, não marketing (agente `tone-reviewer`).

---

## 2. Narrativa — "Da execução à orquestração"

**Ideia central (logline):** *"Vinte e poucos anos aprendendo a mesma coisa em
escalas diferentes: transformar um processo confuso num sistema que outras
pessoas conseguem operar."*

O fio de luz representa isso. No começo ele é uma linha de cursor num terminal.
No fim ele é uma rede de agentes. A forma muda, o fio é o mesmo.

| Ato | Período | Ambiente | Ideia do ato (rascunho de texto) | Toque pessoal (a confirmar) |
| :-- | :-- | :-- | :-- | :-- |
| **I. O cursor** | 1997–2003 | Sala escura, um monitor de tubo, um cursor que pisca | "Tudo começou com um curso técnico de processamento de dados e um cursor piscando." | O que levou ao curso técnico? (pergunta P-1) |
| **II. O modelo** | 2001–2012 | O cursor vira linhas de diagrama UML que se montam no ar, como plantas de arquitetura | "Na faculdade e na Sysgen aprendi que bom código nasce de um bom modelo. O TGI sobre EDI foi a primeira vez que vi um processo de negócio inteiro virar fluxo de dados." | — |
| **III. O time** | 2012–2017 | As linhas viram pontos de luz: pessoas. Formam uma constelação pequena | "Na Indra passei a liderar um time. Descobri que a arquitetura mais difícil é a de pessoas." | Algo fora do trabalho que mudou nesta fase? (P-2) |
| **IV. A operação** | 2017–hoje | A constelação vira uma malha de fluxos (APIs, filas), uma cidade vista de cima, à noite | "Na Rede, o sistema não pode parar: credenciamento, logística, comercial. Economia de mais de 3 MM no contrato, entregas no mesmo dia, +15 % nas metas com a Pipe Automática." | — |
| **V. A orquestração** | 2019–hoje | A cidade se abre em um grafo de agentes que conversa com quem rola a página (reage ao ponteiro) | "Hoje estudo como pessoas e agentes de IA dividem o trabalho, e publico o que aprendo: vídeos, artigos, estudos." | Fecho pessoal: o que move você hoje? (P-3) |

**Final (créditos):** o fio se recolhe num ponto, que vira o cursor do Ato I.
O ciclo fecha. Chamada: "Ver o currículo completo" (`/curriculo`) e
"Conversar" (contato).

**Regras para o toque pessoal** (proteção de exposição):

- Nada de nomes de familiares, endereço, bairro, escola dos filhos, rotina ou
  datas pessoais.
- Só o que o Issei escrever ou aprovar. Este plano **não inventa** fatos
  pessoais; os campos "a confirmar" ficam vazios até a resposta dele.
- Imagens geradas por IA não mostram o rosto do Issei nem pessoas reais
  reconhecíveis. Pessoas aparecem como silhuetas ou pontos de luz. O retrato
  real (já aprovado em `elementos-visuais`) pode aparecer uma vez, nos créditos.

---

### 2.2 Bastidores — "Como foi feito" (decisão D-TC-8)

Depois dos créditos, uma seção curta, em texto comum, conta como a página foi
construída. Ela é a razão de a página existir no tom do site: o espetáculo vira
um caso de engenharia com agentes.

- O roteiro e a decupagem (este plano), escritos com o Claude.
- O storyboard a lápis e os quadros de costura.
- A geração dos vídeos pelo Higgsfield via MCP, com prompt, modelo, custo em
  créditos e a tentativa escolhida (de `assets-fonte/trajetoria/prompts/`).
- O que o Three.js faz e por que não é tudo vídeo (peso, nitidez, acessibilidade).
- Um par antes/depois: quadro de costura e quadro final.
- Selo de natureza: "Imagens e vídeos gerados por IA a partir de quadros
  renderizados; texto escrito e revisado pelo autor."

## 3. Decupagem (storyboard técnico)

Convenções: **P** = percentual da rolagem total da seção de cena (0–100 %).
Lentes em equivalente de quadro inteiro (35 mm). A "câmera" é a mesma nos
vídeos de IA (descrita no prompt) e no Three.js (`PerspectiveCamera.fov`).

Conversão usada: `fov_vertical = 2·atan(24 / (2·f))`.
35 mm → ~37,8°; 50 mm → ~27,0°; 24 mm → ~53,1°; 85 mm → ~16,1°.

### 3.1 Continuidade de lente

- **Lente-base: 35 mm** do início ao fim. É a lente "da pessoa": próxima sem
  distorcer. Ela dá unidade ao plano-sequência.
- **Insertos de 85 mm** só dentro das transições de IA, para os detalhes de
  matéria (o cursor virando linha, a linha virando ponto). Depois a câmera
  volta a 35 mm por um *dolly-zoom* curto dentro do próprio vídeo.
- **Uma única 24 mm**, no Ato V, quando o grafo se abre. É a única vez que o
  quadro "respira" para os lados: sinal visual de escala.
- Movimento: só *dolly in* (para a frente) e *crane up* (subida) no Ato IV.
  Nada de *pan* rápido nem rotação no eixo da câmera: isso causa enjoo
  (ver §8, movimento vestibular).

### 3.2 Luz

| Ato | Chave | Temperatura | Fonte motivada | Contraste |
| :-- | :-- | :-- | :-- | :-- |
| I | Baixa (low key) | Neutra-fria, quase monocromática | A tela do monitor | Muito alto, fundo `#0d1117` |
| II | Baixa | Fria, azul `#007bff` nas linhas | As próprias linhas do diagrama emitem luz | Alto |
| III | Média-baixa | Azul com toques de violeta `#8a2be2` | Cada ponto (pessoa) é uma luz pequena | Médio, mais "calor" entre pontos |
| IV | Média | Gradiente azul → violeta | Os fluxos da malha (luz de cidade à noite) | Médio |
| V | Média, com *rim light* | Violeta dominante | O grafo inteiro; contraluz no ponto central | Alto no centro |

Toda a luz é **motivada** (vem de algo em cena). Não há luz de preenchimento
"de estúdio". Isso mantém o tema Dark Tech e garante fundo escuro para o texto.

### 3.3 Planos

| # | Faixa P | Tipo | Lente | Câmera | Conteúdo | Texto em tela |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| 01 | 0–8 | 3D | 35 | parada, leve respiração | Monitor, cursor piscando | Título + "Role para começar" |
| 02 | 8–14 | 3D | 35 | dolly in lento | Aproxima do cursor | Ato I |
| T1 | 14–22 | **Vídeo IA** | 35→85→35 | dolly in contínuo | Entra na tela; o cursor se estica e vira linha de luz | — |
| 03 | 22–34 | 3D | 35 | dolly lateral suave | Linhas UML se montam em blocos | Ato II |
| T2 | 34–42 | 3D (shader) | 35 | dolly in | A linha se fragmenta em pontos de luz (partículas no próprio Three.js; não precisa de IA) | — |
| 04 | 42–54 | 3D | 35 | órbita lenta (≤ 15°) | Constelação pequena; pontos se conectam | Ato III |
| T3 | 54–62 | **Vídeo IA** | 35 | crane up | Constelação vira malha urbana vista de cima | — |
| 05 | 62–70 | 3D | 35 | crane up + dolly | Malha com fluxos (partículas em caminhos) | Ato IV, frase na margem |
| 05b | 70–76 | **CSS** (quebra de ritmo) | 50 | parada | Corta para dentro: uma mesa à noite, um monitor com um painel de operação. O monitor se expande por `clip-path` até encher a tela | Os três números, nas margens |
| T4 | 76–84 | 3D (**corte seco**) | 35→24 | dolly out + abertura | Corte seco: o painel vira um enxame de partículas que se reorganiza em grafo | — |
| 06 | 84–96 | 3D | 24 | parada; reage ao ponteiro | Grafo de agentes | Ato V |
| 07 | 96–100 | 3D | 24→35 | dolly out | As partículas convergem no monograma "MI"; o monograma vira o cursor do Ato I | Créditos + chamadas |

### 3.4 Ritmo

- Cada ato ocupa **~120–150 vh** de rolagem; cada transição de IA, **~80 vh**.
  Altura total da cena: ~1.000 vh no computador, ~800 vh no celular.
- Regra de ritmo: **texto parado, imagem andando**. O texto de cada ato fica
  fixo enquanto a câmera se move ao fundo; ele não entra durante uma
  transição.
- Respiração: entre o fim de um texto e o início da transição seguinte há
  ~20 vh de imagem sem texto.
- O avanço da câmera tem amortecimento (§6.3). A pessoa sente peso, não atraso.
- **Onde fica o texto:** abertura e créditos no centro; nos atos, frases de
  até 12 palavras nas margens (esquerda nos atos ímpares, direita nos pares).
  O centro do quadro fica livre para o foco da imagem.
- **Quebra de ritmo:** depois de três movimentos longos (atos I a IV), o plano
  05b para a câmera e muda de escala (de cidade para mesa). Evita cansaço.
- **Corte seco > dissolve borrado:** se uma passagem gera um quadro desfocado
  ou ambíguo, troca por corte seco. Vale também para o T4.

---

## 4. Arquitetura da página

Segue o padrão MPA do repositório (`ARCHITECTURE.md`, skill
`mauricio-site-patterns`).

```
src/trajetoria.html            ← página (Vite descobre sozinho)
src/trajetoria.css             ← estilos da página (tokens Dark Tech)
src/js/trajetoria/
  main.js                      ← entrada; decide modo (cinema | estático)
  timeline.js                  ← modelo de linha do tempo + interpolação
  scroll.js                    ← progresso da rolagem (Lenis já está no projeto)
  frames.js                    ← carregamento e cache das sequências de quadros
  cena.js                      ← Three.js: renderizador, câmera, ambientes
  ambientes/ato-1.js … ato-5.js
  shaders/fio.vert|frag, dissolve.frag, particulas.vert|frag
src/assets/trajetoria/         ← ver §9 (o "./assets/" pedido)
tests/trajetoria.spec.js       ← Playwright: smoke, a11y, reduced motion
docs/specs/pages/trajetoria/   ← este plano e o SDD derivado
```

- **Three.js** entra como dependência npm fixada (hoje `src/life3d.html` usa o
  CDN `three@0.167.0`). Recomendo npm para o Vite fazer *tree shaking*.
- **GSAP + Lenis** já estão no `package.json`. Lenis dá a rolagem suave; o
  GSAP é opcional (o laço do §6 não depende dele).
- **Um só `<canvas>` WebGL**, fixo atrás do conteúdo (`position: sticky`). O
  vídeo de IA não usa `<video>`: os quadros viram **textura** num quad de tela
  inteira dentro da mesma cena Three.js. Assim a passagem vídeo ↔ 3D é um
  *shader* de dissolve, sem trocar de elemento.
- **`/en/`**: o texto é HTML comum, então o Argos traduz como as outras
  páginas (`npm run i18n:sync`). Os quadros não têm texto embutido (regra:
  nenhum texto dentro de imagem), então servem às duas línguas.
- Cabeçalho comum, natureza da página, SEO (título, descrição, OG, canonical,
  hreflang), consentimento antes do GTM: como as demais páginas.

### 4.1 Estrutura do HTML (texto primeiro)

```html
<main id="conteudo">
  <header class="tc-abertura">
    <h1>Trajetória</h1>
    <p>…logline…</p>
    <button type="button" class="tc-movimento" aria-pressed="true">
      Animação ligada
    </button>
  </header>

  <!-- Cena: puramente decorativa -->
  <div class="tc-palco" aria-hidden="true">
    <canvas id="tc-canvas"></canvas>
  </div>

  <!-- A história: lista ordenada real, lida por qualquer leitor -->
  <ol class="tc-atos">
    <li class="tc-ato" id="ato-1" data-ato="1">
      <h2><span class="tc-periodo">1997–2003</span> O cursor</h2>
      <p>…</p>
    </li>
    <!-- … atos 2 a 5 … -->
  </ol>

  <nav aria-label="Atos da trajetória"> <!-- âncoras #ato-1..#ato-5 --> </nav>
  <footer class="tc-creditos">…chamadas…</footer>
</main>
```

Sem JavaScript, ou com movimento reduzido, a página é **uma lista de cinco
atos com um quadro estático (pôster) em cada**. É o mesmo princípio da linha do
tempo da Carreira (PR #169).

---

## 5. Pipeline dos vídeos de IA

### 5.1 Costura 3D → IA → 3D

1. Montar cada ambiente 3D em Three.js.
2. Renderizar o **último quadro** do ambiente N (e o **primeiro** do N+1) em
   PNG 1920×1080, com `preserveDrawingBuffer` e a câmera exata do plano.
   Script: `scripts/trajetoria/render-chaves.mjs` (Playwright + Chromium).
3. Usar esses dois PNG como **quadro inicial e quadro final** num modelo de
   vídeo que aceita os dois (*first/last frame conditioning*). Recomendação
   (D-TC-2): Higgsfield com Seedance, chamado pelo Claude Desktop via MCP na
   máquina do Issei, como no tutorial. O prompt e o resultado escolhido ficam
   registrados em `assets-fonte/trajetoria/prompts/`.
4. Prompt descreve: lente, movimento de câmera, luz motivada, matéria da
   transformação, **sem texto, sem rosto, sem logotipo**.
5. Gerar 4–5 s, 24 qps. Escolher a melhor de 3–4 tentativas.
6. Extrair e codificar os quadros (§5.3).

Exemplo de prompt (T1):

```text
Continuous dolly-in shot, 35mm lens, shallow depth of field, into a dark CRT
monitor in a pitch-black room (#0d1117 background). A single blinking cursor
stretches into a thin glowing blue line (#007bff) that extends into 3D space.
Lens briefly pushes to 85mm macro on the cursor, then returns to 35mm.
Light comes only from the screen. No text, no faces, no logos, no camera
shake, no flicker. Cinematic, low-key, film grain subtle.
```

### 5.2 Por que sequência de quadros e não `<video>`

`video.currentTime` não busca quadro a quadro com precisão em todos os
navegadores (Safari e Chrome no celular saltam para o *keyframe* mais próximo).
O resultado é tremido ao rolar para trás. Quadros em imagem dão precisão total.

Custo controlado assim:

- 2 transições × 48 quadros (2 s úteis a 24 qps) = 96 quadros.
- AVIF 1280×720, ~25–35 KB cada → **~3 MB no computador**; 854×480,
  ~12–18 KB → **~1,5 MB no celular**.
- **Carga progressiva**: primeiro a cada 4º quadro (1/4 do peso), depois
  preenche. Só carrega a transição N+1 quando o ato N entra na tela.
- Alternativa (D-TC-3): MP4/H.264 com **todos os quadros chave** (`-g 1`).
  Busca precisa, um arquivo por transição, porém maior e sem carga
  progressiva.

### 5.3 Comandos de extração (conceito)

```bash
# 1) do vídeo gerado para PNG (só o trecho útil, 24 qps)
ffmpeg -i t1-bruto.mp4 -ss 0.5 -t 2 -vf "fps=24,scale=1280:-2" t1/%03d.png

# 2) PNG → AVIF (computador) e versão de celular
for f in t1/*.png; do
  avifenc --min 20 --max 34 -s 6 "$f" "t1-1280/$(basename "${f%.png}").avif"
done
ffmpeg -i t1/%03d.png -vf scale=854:-2 t1-854/%03d.png   # depois avifenc

# 3) pôster (quadro do meio) para modo estático e OG
cp t1-1280/024.avif ../posters/t1.avif
```

No repositório isso vira um passo de `scripts/gen-imagens.mjs` (já usa
`sharp`), com manifesto em `assets-fonte/` e `--check` no gate, como foi feito
com o retrato.

---

## 6. Lógica de sincronização (código conceitual)

### 6.1 Modelo da linha do tempo

```js
/**
 * Linha do tempo da cena. Cada faixa ocupa [ini, fim] do progresso 0..1.
 * tipo: '3d' (ambiente Three.js) ou 'ia' (sequência de quadros).
 * Fonte: §3.3 deste plano.
 */
export const FAIXAS = [
  { id: 'p01', tipo: '3d', ato: 1, ini: 0.00, fim: 0.14 },
  { id: 't1',  tipo: 'ia', de: 1, para: 2, ini: 0.14, fim: 0.22, quadros: 48 },
  { id: 'p03', tipo: '3d', ato: 2, ini: 0.22, fim: 0.34 },
  { id: 't2',  tipo: '3d', ato: 2, ini: 0.34, fim: 0.42, fragmentar: true },
  { id: 'p04', tipo: '3d', ato: 3, ini: 0.42, fim: 0.54 },
  { id: 't3',  tipo: 'ia', de: 3, para: 4, ini: 0.54, fim: 0.62, quadros: 48 },
  { id: 'p05', tipo: '3d', ato: 4, ini: 0.62, fim: 0.70 },
  { id: 'p05b', tipo: 'css', ato: 4, ini: 0.70, fim: 0.76 },   // quebra de ritmo
  { id: 't4',  tipo: '3d', ato: 5, ini: 0.76, fim: 0.84, corteSeco: true },
  { id: 'p06', tipo: '3d', ato: 5, ini: 0.84, fim: 1.00 },
];

/** Câmera por chave: progresso → { z, y, fov }. Interpolada entre chaves. */
export const CAMERA = [
  { p: 0.00, z: 6.0, y: 0.0, fov: 37.8 },  // 35 mm
  { p: 0.14, z: 2.0, y: 0.0, fov: 37.8 },
  { p: 0.22, z: 0.0, y: 0.0, fov: 37.8 },
  { p: 0.62, z: -4.0, y: 3.0, fov: 37.8 }, // crane up no Ato IV
  { p: 0.84, z: -8.0, y: 3.5, fov: 53.1 }, // 24 mm no Ato V
  { p: 1.00, z: -10.0, y: 3.5, fov: 37.8 },
];
```

### 6.2 Funções de interpolação

```js
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;

/** Progresso local de uma faixa: 0 no início, 1 no fim. */
export const local = (p, { ini, fim }) => clamp((p - ini) / (fim - ini));

/** Curvas de aceleração (Robert Penner). */
export const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/**
 * Amortecimento independente da taxa de quadros.
 * lambda maior = segue mais rápido. Em 60 Hz ou 120 Hz o resultado é igual.
 */
export const damp = (atual, alvo, lambda, dt) =>
  lerp(atual, alvo, 1 - Math.exp(-lambda * dt));

/** Interpola uma lista de chaves { p, ...valores } no progresso p. */
export function amostrar(chaves, p) {
  let i = chaves.findIndex((k) => k.p > p);
  if (i === -1) return { ...chaves.at(-1) };
  if (i === 0) return { ...chaves[0] };
  const a = chaves[i - 1], b = chaves[i];
  const t = easeInOutCubic((p - a.p) / (b.p - a.p));
  const out = {};
  for (const k of Object.keys(a)) out[k] = lerp(a[k], b[k], t);
  return out;
}
```

### 6.3 Laço `requestAnimationFrame`

```js
import { FAIXAS, CAMERA } from './timeline.js';
import { damp, local, amostrar, smoothstep } from './interp.js';

/**
 * O scroll só escreve o ALVO. O rAF move o valor ATUAL até o alvo.
 * Isso separa a entrada (irregular) da renderização (cadência do monitor).
 */
const estado = { alvo: 0, atual: 0, visivel: true, ultimo: performance.now() };

function progressoDaRolagem(secao) {
  const r = secao.getBoundingClientRect();
  const total = r.height - innerHeight;           // trecho "preso" da seção
  return Math.min(1, Math.max(0, -r.top / total));
}

// Com Lenis: lenis.on('scroll', () => estado.alvo = progressoDaRolagem(secao))
addEventListener('scroll', () => {
  estado.alvo = progressoDaRolagem(secao);
}, { passive: true });

// Só renderiza quando a cena está na tela.
new IntersectionObserver(([e]) => {
  estado.visivel = e.isIntersecting;
  if (estado.visivel) requestAnimationFrame(quadro);
}).observe(secao);

function quadro(agora) {
  if (!estado.visivel) return;                    // para o laço fora da tela
  const dt = Math.min(0.1, (agora - estado.ultimo) / 1000);
  estado.ultimo = agora;

  estado.atual = damp(estado.atual, estado.alvo, 8, dt);
  const p = estado.atual;

  // 1) câmera (mesma lente nos dois mundos)
  const cam = amostrar(CAMERA, p);
  camera.position.set(0, cam.y, cam.z);
  if (camera.fov !== cam.fov) { camera.fov = cam.fov; camera.updateProjectionMatrix(); }

  // 2) faixa ativa
  const faixa = FAIXAS.find((f) => p >= f.ini && p <= f.fim) ?? FAIXAS.at(-1);
  const t = local(p, faixa);

  if (faixa.tipo === 'css') {
    // quebra de ritmo: o canvas pausa e o CSS assume (§6.7)
    palco.style.setProperty('--tc-abre', t.toFixed(4));
  } else if (faixa.tipo === 'ia') {
    const idx = Math.round(t * (faixa.quadros - 1));
    const img = frames.melhorDisponivel(faixa.id, idx); // cai no vizinho já carregado
    if (img) telaIA.material.uniforms.uQuadro.value = texturaDe(img);
    // dissolve nas bordas da transição: 3D ↔ vídeo, sem corte seco
    telaIA.material.uniforms.uMistura.value =
      smoothstep(0.0, 0.12, t) * (1 - smoothstep(0.88, 1.0, t));
  } else {
    telaIA.material.uniforms.uMistura.value = 0;
    ambientes[faixa.ato].atualizar(t, dt);        // fio, partículas, uniforms
  }

  // 3) texto: o CSS cuida (scroll-driven animations ou classe por ato)
  marcarAtoAtivo(faixa.ato ?? faixa.para);

  renderer.render(cena, camera);
  requestAnimationFrame(quadro);
}
```

### 6.4 Shader de dissolve (vídeo ↔ 3D)

```glsl
// dissolve.frag — mistura o quadro de IA sobre a cena 3D com ruído azul,
// para a borda da transição parecer "matéria", não um fade comum.
uniform sampler2D uQuadro;   // quadro atual da sequência de IA
uniform sampler2D uRuido;    // blue-noise-256.png
uniform float uMistura;      // 0 = só 3D, 1 = só vídeo
varying vec2 vUv;

void main() {
  vec4 video = texture2D(uQuadro, vUv);
  float n = texture2D(uRuido, vUv * 4.0).r;
  float borda = smoothstep(uMistura - 0.08, uMistura + 0.08, n);
  float a = 1.0 - borda;                 // onde o ruído < mistura, mostra vídeo
  gl_FragColor = vec4(video.rgb, a);
}
```

### 6.5 O fio (elemento de continuidade)

```glsl
// fio.vert — tubo de luz; uProgresso "desenha" o fio ao longo da curva.
attribute float aS;          // posição 0..1 ao longo do fio
uniform float uProgresso;
uniform float uTempo;
varying float vVisivel;
void main() {
  vVisivel = step(aS, uProgresso);
  vec3 p = position;
  p += normal * 0.01 * sin(uTempo * 2.0 + aS * 40.0);   // respiração sutil
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
```

Cor do fio: gradiente `#007bff → #8a2be2` (tokens do site), passado como
`uniform vec3`. Brilho por *bloom* barato (meia resolução), desligado no
celular fraco (§7).

### 6.6 Texto com CSS (sem JavaScript)

```css
/* O texto de cada ato aparece com a própria rolagem, onde há suporte. */
@supports (animation-timeline: view()) {
  .tc-ato {
    animation: tc-entra linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 40%;
  }
}
@keyframes tc-entra { from { opacity: 0; translate: 0 2rem; } }

@media (prefers-reduced-motion: reduce) {
  .tc-ato { animation: none; }
}
```

### 6.7 Quebra de ritmo com `clip-path` (plano 05b)

```css
/* O monitor da mesa abre até encher a tela. --tc-abre vem do laço (0..1). */
.tc-quebra { position: absolute; inset: 0; }
.tc-quebra__tela {
  --a: calc(var(--tc-abre, 0) * 1);
  /* retângulo do monitor (inset 30% 32% 38% 32%) → tela cheia (inset 0) */
  clip-path: inset(
    calc(30% * (1 - var(--a))) calc(32% * (1 - var(--a)))
    calc(38% * (1 - var(--a))) calc(32% * (1 - var(--a)))
    round calc(12px * (1 - var(--a)))
  );
}
.tc-quebra__mesa { scale: calc(1 + var(--tc-abre, 0) * 0.6); }
```

### 6.8 Partículas que formam o monograma (plano 07)

```js
/**
 * Cada partícula tem duas posições: a do grafo e a de um ponto amostrado do
 * contorno do monograma (SVG → pontos, feito uma vez no build).
 * O shader mistura as duas com uConverge (0..1), com atraso por partícula
 * para a forma "se montar" em vez de aparecer de uma vez.
 */
const alvo = await fetch(urlPontosMonograma).then((r) => r.json()); // Float32 xyz
geometria.setAttribute('aAlvo', new THREE.Float32BufferAttribute(alvo, 3));
geometria.setAttribute('aAtraso', new THREE.Float32BufferAttribute(atrasos, 1));
// no vertex shader:
//   float k = smoothstep(aAtraso, aAtraso + 0.4, uConverge);
//   vec3 p = mix(position, aAlvo, k);
```

---

## 7. Desempenho

| Meta | Valor |
| :-- | :-- |
| LCP (título + pôster do Ato I) | < 2,5 s em 4G |
| Peso inicial (HTML, CSS, JS, pôster) | < 300 KB |
| JS da cena (Three.js com tree shaking + código) | < 180 KB gzip, carregado sob demanda |
| Quadros de IA | carregados por ato; ≤ 6 MB no total (computador) |
| Taxa de quadros | 60 fps estável em notebook médio; 30+ fps em celular médio |
| CLS | 0 (o palco tem altura fixa reservada) |

Técnicas:

- `renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))`.
- Decodificação fora da thread principal: `createImageBitmap(blob)` num
  *worker* para os quadros.
- Cache circular de texturas (±12 quadros em torno do atual); libera o resto
  com `texture.dispose()`.
- **Níveis de qualidade** por medida real: se a média de `dt` passar de 22 ms
  por 1 s, cai um nível (desliga bloom → menos partículas → modo estático).
- O JS da cena só carrega depois do primeiro desenho (`import()` dinâmico) e
  só se o modo cinema for escolhido (§8).
- `navigator.connection.saveData` ou rede lenta → modo estático por padrão.

---

## 8. Acessibilidade (WCAG 2.2 AA, `docs/a11y/A11Y.md`)

| Requisito | Como a página atende |
| :-- | :-- |
| 1.1.1 Conteúdo não textual | Canvas e quadros são decorativos (`aria-hidden="true"`). Toda a história está no HTML. |
| 1.3.1 Informação e relações | `<ol>` de atos, `<h2>` por ato, período em texto. |
| 1.4.3 Contraste | Texto sobre *scrim* `#0d1117` a 80 % atrás do bloco; ≥ 4,5:1 medido no pior quadro. Teste no Playwright amostra os pôsteres. |
| 2.2.2 Pausar, parar, ocultar | Botão "Animação ligada/desligada" no topo (`aria-pressed`). A animação ambiente (respiração do fio) para junto. A escolha fica em `localStorage` (com `try/catch`). |
| 2.3.1 / 2.3.3 Flashes e movimento por interação | Nenhum flash > 3 por segundo (regra no prompt de IA + revisão quadro a quadro). Com `prefers-reduced-motion: reduce`, o modo cinema **não liga**: a página mostra os pôsteres estáticos. |
| 2.1.1 Teclado / 2.4.1 Pular blocos | `nav` com âncoras dos 5 atos; Page Down e Tab avançam normalmente (não sequestramos a rolagem). |
| 2.4.7 / 2.4.11 Foco visível e não oculto | O palco fica atrás (`z-index`); o foco nunca cai sob o canvas. |
| Enjoo vestibular | Sem rotação da câmera, órbita ≤ 15°, sem zoom rápido; amortecimento suave. |

Registrar o padrão novo em `A11Y-DECISIONS.md` ("cena decorativa guiada por
rolagem, com texto primeiro"). O teste de leitor de tela real continua com o
Issei, como nas outras páginas.

---

## 9. Lista completa de arquivos em `./assets/`

No repositório, `./assets/` = **`src/assets/trajetoria/`** (processado pelo
Vite, com *hash* no nome). As fontes brutas (vídeos gerados, PNG) ficam fora do
build, em `assets-fonte/trajetoria/` (vídeos brutos grandes: fora do Git, ver
D-TC-4).

### 9.1 Quadros de apoio e sequências

| Caminho | Qtd | Formato | Dimensão | Peso alvo | Uso |
| :-- | :-- | :-- | :-- | :-- | :-- |
| `frames/t1/1280/001.avif` … `048.avif` | 48 | AVIF | 1280×720 | 25–35 KB | Transição I→II, computador |
| `frames/t1/854/001.avif` … `048.avif` | 48 | AVIF | 854×480 | 12–18 KB | Transição I→II, celular |
| `frames/t3/1280/…`, `frames/t3/854/…` | 96 | AVIF | idem | idem | III→IV (constelação → cidade) |
| `frames/manifesto.json` | 1 | JSON | — | < 2 KB | Lista de quadros, dimensões e hash por transição |

### 9.2 Pôsteres (modo estático, reduced motion, sem JS)

| Caminho | Qtd | Formato | Dimensão | Uso |
| :-- | :-- | :-- | :-- | :-- |
| `posters/ato-1.avif` … `ato-5.avif` | 5 | AVIF | 1600×900 | Imagem de cada ato no modo estático |
| `posters/ato-1.webp` … `ato-5.webp` | 5 | WebP | 1600×900 | Fallback do `<picture>` |
| `posters/ato-1-sm.avif` … `ato-5-sm.avif` | 5 | AVIF | 800×450 | Celular |
| `posters/t1.avif`, `t3.avif` | 2 | AVIF | 1280×720 | Quadro do meio de cada transição de IA (carga inicial) |

### 9.2b Quebra de ritmo (plano 05b, CSS)

| Caminho | Formato | Dimensão | Uso |
| :-- | :-- | :-- | :-- |
| `quebra/mesa-noite.avif` (+ `.webp`) | AVIF/WebP | 1920×1080 (outpainting se preciso) | Cena da mesa; sem texto, sem rosto, sem marca |
| `quebra/painel-operacao.avif` (+ `.webp`) | AVIF/WebP | 1920×1080 | Conteúdo da tela que se expande; painel abstrato, sem dado real |
| `quebra/mesa-noite-sm.avif`, `painel-operacao-sm.avif` | AVIF | 960×540 | Celular |

### 9.3 Quadros-chave da costura (fonte, não vão ao build)

| Caminho | Qtd | Formato | Uso |
| :-- | :-- | :-- | :-- |
| `assets-fonte/trajetoria/storyboard/plano-01.png` … `plano-07.png` | 12 | PNG | Rascunhos a lápis de cada plano (fase F0b), para validar a câmera antes das imagens finais |
| `assets-fonte/trajetoria/chaves/t1-ini.png`, `t1-fim.png`, `t3-ini.png`, `t3-fim.png` | 4 | PNG 1920×1080 | Quadros inicial e final renderizados do Three.js e dados ao modelo de vídeo |
| `assets-fonte/trajetoria/prompts/t1.md`, `t3.md`, `quebra.md` | 3 | Markdown | Prompt, modelo, semente, data e tentativa escolhida (rastreabilidade) |
| `assets-fonte/trajetoria/brutos/t1.mp4`, `t3.mp4` | 2 | MP4 | Saída do modelo (fora do Git) |

### 9.4 Texturas (shaders)

| Caminho | Formato | Dimensão | Uso |
| :-- | :-- | :-- | :-- |
| `texturas/blue-noise-256.png` | PNG 8 bits, 1 canal | 256×256 | Dissolve vídeo ↔ 3D; *dithering* do gradiente |
| `texturas/grao-filme-512.webp` | WebP | 512×512, repetível | Grão sutil que une vídeo e 3D na mesma "película" |
| `texturas/particula-glow-64.png` | PNG com alfa | 64×64 | *Sprite* dos pontos (Atos III–V) |
| `texturas/fio-gradiente-256x1.png` | PNG | 256×1 | Rampa `#007bff → #8a2be2` do fio |
| `texturas/crt-scanline-4x4.png` | PNG | 4×4, repetível | Linhas de varredura do monitor no Ato I |
| `texturas/vinheta.png` | PNG com alfa | 512×512 | Vinheta de lente (escurece as bordas) |
| `texturas/mapa-cidade-1024.webp` | WebP | 1024×1024 | Máscara dos "quarteirões" da malha no Ato IV (abstrata, não é um mapa real) |

### 9.5 Geometria e dados de cena

| Caminho | Formato | Uso |
| :-- | :-- | :-- |
| `modelos/monitor-crt.glb` | glTF binário, Draco, < 150 KB | Monitor do Ato I (low poly) |
| `cena/fio-curva.json` | JSON (pontos de controle Catmull-Rom) | Caminho do fio por toda a cena |
| `cena/uml-blocos.json` | JSON | Posições dos blocos do diagrama do Ato II |
| `cena/grafo-agentes.json` | JSON (nós e arestas) | Grafo do Ato V |
| `cena/monograma-pontos.json` | JSON (Float32 xyz, ~4.000 pontos) | Alvos das partículas no plano 07, amostrados de `logos/monograma-mi.svg` no build |
| `shaders/*.glsl` | texto | Mantidos em `src/js/trajetoria/shaders/` (importados com `?raw` do Vite) |

### 9.6 Ícones (SVG, um por ato)

| Caminho | Uso |
| :-- | :-- |
| `icones/ato-1-cursor.svg` | Navegação de atos e modo estático |
| `icones/ato-2-modelo.svg` | idem (diagrama) |
| `icones/ato-3-time.svg` | idem (constelação) |
| `icones/ato-4-operacao.svg` | idem (malha de fluxos) |
| `icones/ato-5-orquestracao.svg` | idem (grafo) |
| `icones/movimento-on.svg`, `movimento-off.svg` | Botão de ligar e desligar a animação |
| `icones/rolar.svg` | Indicação "Role para começar" (decorativo) |

Todos com `currentColor`, `viewBox` 24×24, `aria-hidden="true"` (o texto ao
lado dá o nome). Mesmo traço dos ícones de tema em `src/img/temas/`.

### 9.7 Logos vetoriais

| Caminho | Uso | Observação |
| :-- | :-- | :-- |
| `logos/mackenzie.svg` | Ato II (formação) | **Só com autorização de uso de marca.** Ver D-TC-5. |
| `logos/sysgen.svg`, `indra.svg`, `serasa.svg`, `rede.svg` | Atos II–IV | idem |
| `logos/monograma-mi.svg` | Créditos | Monograma próprio (item 8 do SDD de elementos visuais, ainda não feito) |

Recomendação: **não usar logos de empresas**. Escrever o nome da empresa em
texto (Inter), como já faz o `/curriculo`. Evita pedido de autorização e é
melhor para leitor de tela e tradução.

### 9.8 Social e metadados

| Caminho | Formato | Uso |
| :-- | :-- | :-- |
| `public/og-trajetoria.png` | PNG 1200×630 | Open Graph (gerado como `gen-og-index.mjs`, a partir do pôster do Ato V + título) |
| `retrato` (reuso) | AVIF/WebP | Créditos; reusa `src/img/retrato-*` já publicados |

**Total estimado no build:** ~3 MB de quadros (computador) ou ~1,5 MB
(celular), sempre sob demanda; ~1 MB de todo o resto.

---

## 10. Plano de entrega (fases)

Cada fase é um PR. Nenhuma fase começa sem a anterior aprovada.

| Fase | Entrega | Critério de pronto |
| :-- | :-- | :-- |
| F0 | Este plano + respostas das decisões (§11) + texto final dos 5 atos | Issei aprova o texto |
| F0b | Storyboard em rascunho a lápis dos 12 planos (como no tutorial) | Issei aprova a continuidade da câmera antes de gerar imagens finais |
| F1 | Página **estática** completa: HTML, texto, pôsteres provisórios, SEO, `/en/`, teste Playwright | Gate verde; página útil sem nenhuma animação |
| F2 | Cena Three.js dos 5 ambientes + fio + laço rAF (sem vídeo de IA; transição por dissolve simples) | 60 fps no notebook; reduced motion respeitado |
| F3 | Vídeos de IA: chaves renderizadas, geração, quadros no pipeline `gen-imagens` | Costura invisível nos 4 cortes; peso dentro da meta |
| F4 | Polimento: níveis de qualidade, grão, bloom, menu, link na Carreira; capturas do Playwright em P = 0, 10, 20 … 100 % para revisar quadro a quadro | Revisão de a11y (`a11y-design-reviewer`) e tom (`tone-reviewer`) |

A F1 sozinha já é uma página publicável. Se a F3 atrasar, a página segue boa.

---

## 11. Decisões em aberto (uma de cada vez)

| Id | Pergunta | Recomendação |
| :-- | :-- | :-- |
| ~~D-TC-0~~ | ~~Qual técnica o tutorial usa?~~ | **Resolvida em 2026-11-24** com o resumo enviado pelo Issei (ver "Sobre o vídeo de referência") |
| ~~D-TC-8~~ | ~~Propósito da página~~ | **Decidida pelo Issei em 2026-11-24: autoria com bastidores.** A trajetória vem primeiro; no fim, uma seção "Como foi feito" (§2.2) |
| D-TC-1 | Toques pessoais: o que pode aparecer (P-1, P-2, P-3 do §2)? | Só o que o Issei escrever; nada de família por nome, lugar ou rotina |
| D-TC-2 | Qual ferramenta de vídeo de IA usar (precisa aceitar quadro inicial e final)? | Higgsfield/Seedance via MCP no Claude Desktop, como no tutorial, se o Issei tiver conta; senão, a que ele já assina |
| D-TC-3 | Quadros AVIF ou MP4 com todos os quadros chave? | AVIF (busca exata e carga progressiva) |
| D-TC-4 | Vídeos brutos: guardar onde? | Pasta do projeto (`/mnt/project-files/trajetoria-cinematografica/`), fora do Git |
| D-TC-5 | Logos das empresas ou nome em texto? | Nome em texto |
| D-TC-6 | URL e lugar no menu | `/trajetoria`, ligada a partir de **Carreira** (não um item novo no cabeçalho) |
| D-TC-7 | A página substitui a linha do tempo da Carreira? | Não; complementa. A Carreira segue como versão objetiva |
