---
id: sdd-trajetoria
titulo: SDD — Página cinematográfica da trajetória (/trajetoria)
data: 2026-11-24
status: especificação (nada implementado; nada gerado)
leitor: quem implementar a página (agente ou pessoa) e o Issei (aprovação)
base: PLANO-trajetoria-cinematografica.md (mesma pasta)
padrao_de_redacao: ptbr-controlado (perfil Técnico)
---

# SDD — Página cinematográfica da trajetória

> **Estado:** especificação. O Issei pediu em 2026-11-24: "não faça nada ainda,
> apenas planeje e especifique". Nenhuma imagem, vídeo ou código foi gerado.
> O **plano** diz *o quê e por quê* (narrativa, decupagem, luz, lentes). Este
> **SDD** diz *como implementar*, com requisitos verificáveis, contratos de
> módulo, pipeline de render (HyperFrames, custo zero), testes e a ordem das unidades de trabalho.

## 1. Escopo

### 1.1 Entra

- Página nova `src/trajetoria.html` (URL `/trajetoria`) e o gêmeo `/en/trajetoria`
  gerado pelo Argos.
- Cena decorativa em um `<canvas>` WebGL (Three.js), com 2 transições
  pré-renderizadas em sequência de quadros, 1 quebra de ritmo em CSS e
  partículas finais.
- Seção "Como foi feito" (decisão D-TC-8: autoria com bastidores).
- Pipeline de ativos: composições versionadas, render local e gratuito no
  **HyperFrames** (§6), extração e codificação no `gen-imagens`.
- Testes (unidade, Playwright, a11y, desempenho) e entrada no `npm run gate`.

### 1.2 Não entra

- Mudança na Carreira (`/curriculo`) além de um link "Ver como filme" (D-TC-7).
- Item novo no cabeçalho comum.
- Áudio ou trilha sonora (não há controle de som; evita 1.4.2 e peso).
- Logos de empresas (D-TC-5, recomendado: nome em texto).
- Qualquer fato que não esteja em `public/cv.json` ou em página publicada.

## 2. Decisões que este SDD assume

| Id | Estado | Valor assumido |
| :-- | :-- | :-- |
| D-TC-0 | Fechada | Método do tutorial (resumo do Issei em `referencia-tutorial.md`) |
| D-TC-8 | **Fechada (Issei, 2026-11-24)** | Autoria com bastidores |
| D-TC-1 | Aberta | Toques pessoais vazios até o Issei responder. Os campos existem no HTML com marcador `<!-- TC:PESSOAL:Pn -->`; o gate reprova publicação com marcador vazio |
| D-TC-2 | **Proposta (Issei sugeriu, 2026-11-24)** | **HyperFrames** (HeyGen, código aberto, Apache 2.0), render local, sem custo. Higgsfield/Seedance fica só como alternativa paga, fora do plano (§6.6) |
| D-TC-3 | Aberta | Sequência de quadros AVIF |
| D-TC-4 | Aberta | Brutos em `/mnt/project-files/trajetoria-cinematografica/brutos/`, fora do Git |
| D-TC-5 | Aberta | Sem logos; nome da empresa em texto |
| D-TC-6 | Aberta | `/trajetoria`, ligada a partir da Carreira e do catálogo (grupo `trajetoria` do `specs/ecosystem.nav.yaml`) |
| D-TC-7 | Aberta | Complementa a Carreira; não substitui |

Se uma decisão aberta mudar, este SDD muda **antes** do código (regra SDD do
`AGENTS.md`).

## 3. Requisitos funcionais

| Id | Requisito | Critério de aceite (verificável) |
| :-- | :-- | :-- |
| RF-TC-01 | A página tem `<h1>`, logline e uma `<ol>` com 5 `<li class="tc-ato">`, cada um com `<h2>` e período em texto | Playwright: 5 itens, 5 `h2`, ordem 1→5 |
| RF-TC-02 | Sem JavaScript, toda a história é legível e cada ato mostra um pôster estático (`<picture>` AVIF/WebP) | Teste `trajetoria.nojs.spec.js` com `javaScriptEnabled: false`: texto visível, 5 imagens carregadas, nenhum `canvas` visível |
| RF-TC-03 | Com `prefers-reduced-motion: reduce`, o modo cinema **não inicia** (nenhum contexto WebGL criado; nenhum quadro de transição baixado) | Playwright com `reducedMotion: 'reduce'`: zero requisições a `/frames/`; `window.__tc.modo === 'estatico'` |
| RF-TC-04 | Botão "Animação ligada/desligada" (`aria-pressed`) no topo alterna cinema ↔ estático a qualquer momento, e a escolha persiste (localStorage, com `try/catch`) | Clicar desliga o laço rAF em ≤ 1 quadro; recarregar mantém a escolha |
| RF-TC-05 | Modo cinema: a rolagem controla a câmera e as faixas da linha do tempo do plano §6.1, com amortecimento | Teste de unidade da linha do tempo (§7.1); Playwright rola até P = 0,5 e lê `__tc.faixa === 'p04'` |
| RF-TC-06 | As transições T1 e T3 mostram a sequência de quadros correspondente ao progresso, com carga progressiva (a cada 4º quadro primeiro) | Unidade: `indiceDoQuadro(t, 48)`; Playwright: ao entrar no Ato I, só os quadros de T1 com índice múltiplo de 4 são pedidos primeiro |
| RF-TC-07 | Quebra de ritmo 05b: o monitor se expande por `clip-path` controlado por `--tc-abre` (0→1) | Playwright em P = 0,73: `--tc-abre` entre 0,4 e 0,6 |
| RF-TC-08 | Final: partículas convergem no monograma "MI" e o monograma vira o cursor do Ato I | Captura em P = 0,98 comparada a referência visual (tolerância 2 %) |
| RF-TC-09 | Navegação por atos (`<nav aria-label="Atos da trajetória">`) com âncoras `#ato-1`…`#ato-5`; no modo cinema, a âncora leva a câmera ao início do ato | Teclado: Tab chega ao nav; Enter em "Ato III" deixa `__tc.faixa` em `p04` |
| RF-TC-10 | Seção "Como foi feito" depois dos créditos, em HTML comum, com a ferramenta, o trecho da composição, o tempo de render e o par antes/depois de cada transição | Playwright: seção existe, cita `HyperFrames`, mostra 2 pares de imagens |
| RF-TC-11 | Selo de natureza gerado pelo `gen-natureza` entre `<!-- NATUREZA:START/END -->`, com natureza `experiencia` no YAML | `node scripts/gen-natureza.mjs --check` verde |
| RF-TC-12 | Todos os números e datas da página batem com `public/cv.json` | Teste `trajetoria.fatos.test.mjs` (§7.1) |
| RF-TC-13 | A página entra no catálogo (grupo `trajetoria`), na busca e nos `llms*.txt` | `gen-catalogo`, `gen-busca`, `gen-llms` com `--check` verdes |
| RF-TC-14 | Gêmeo `/en/trajetoria` gerado (nunca editado à mão) | `npm run i18n:check` verde |
| RF-TC-15 | Nenhum texto dentro de imagem ou vídeo | Revisão humana na F3 + regra no prompt |

## 4. Requisitos não funcionais

| Id | Requisito | Medida |
| :-- | :-- | :-- |
| RNF-TC-01 | Caminho crítico | HTML + CSS + JS bloqueantes ≤ 60 KB gzip (mesmo teto do `perf-budget.mjs`); entrada nova no orçamento |
| RNF-TC-02 | LCP | Título + pôster do Ato I < 2,5 s em 4G simulado |
| RNF-TC-03 | JS da cena | ≤ 180 KB gzip, carregado por `import()` só no modo cinema e depois do primeiro desenho |
| RNF-TC-04 | Quadros | ≤ 3,2 MB (computador) e ≤ 1,6 MB (celular), sob demanda |
| RNF-TC-05 | Fluidez | ≥ 55 fps médios no Chromium do CI com CPU 4× mais lenta, no nível de qualidade "médio" |
| RNF-TC-06 | CLS | 0 (palco com altura reservada) |
| RNF-TC-07 | Memória | ≤ 25 texturas de quadro vivas (cache circular ±12) |
| RNF-TC-08 | Acessibilidade | WCAG 2.2 AA; catraca do `tests/a11y/baseline.json` não sobe |
| RNF-TC-09 | Tema | Dark Tech: fundo `#0d1117`, acentos `#007bff`/`#8a2be2`, Inter. Hexadecimais só em `src/trajetoria.css` (custom properties `--tc-*`) |
| RNF-TC-10 | Dependências | `three` fixado no `package.json` (versão exata). Nada de CDN na página |
| RNF-TC-11 | Rastreabilidade | Todo ativo renderizado tem composição, versão do HyperFrames, comando, tempo de render e data em `assets-fonte/trajetoria/hyperframes/<id>/NOTAS.md` |

## 5. Arquitetura

### 5.1 Arquivos

| Caminho | Papel |
| :-- | :-- |
| `src/trajetoria.html` | Página. Texto, estrutura, marcadores `NATUREZA`, `TC:PESSOAL:Pn` |
| `src/trajetoria.css` | Tokens `--tc-*`, layout, modo estático, quebra de ritmo, scrim |
| `src/js/trajetoria/main.js` | Entrada (inline `type="module"` mínimo importa este) |
| `src/js/trajetoria/modo.js` | Decide `cinema` ou `estatico` |
| `src/js/trajetoria/timeline.js` | `FAIXAS`, `CAMERA` (dados) |
| `src/js/trajetoria/interp.js` | `clamp`, `lerp`, `damp`, `local`, `amostrar`, `smoothstep`, `indiceDoQuadro` (funções puras) |
| `src/js/trajetoria/rolagem.js` | Progresso 0..1 a partir da seção; integra Lenis |
| `src/js/trajetoria/quadros.js` | Carga progressiva, decodificação em worker, cache circular |
| `src/js/trajetoria/quadros.worker.js` | `fetch` + `createImageBitmap` |
| `src/js/trajetoria/cena.js` | Renderizador, câmera, quad de vídeo, laço rAF, níveis de qualidade |
| `src/js/trajetoria/ambientes/ato-1.js` … `ato-5.js` | Um ambiente por ato; contrato §5.3 |
| `src/js/trajetoria/transicoes/t1.js`, `t3.js` | Cena de transição entre dois ambientes, com `renderEm(t)` buscável. Usada só pela composição do HyperFrames (§6.2); não entra no bundle da página |
| `src/js/trajetoria/shaders/*.glsl` | `fio`, `dissolve`, `particulas`, `crt` (importados com `?raw`) |
| `src/assets/trajetoria/**` | Ativos de build (lista completa no plano §9) |
| `assets-fonte/trajetoria/**` | Fontes: storyboard, chaves, composições HyperFrames (`hyperframes/<id>/`), manifesto |
| `scripts/trajetoria/render-chaves.mjs` | Renderiza os quadros de costura com Playwright |
| `scripts/trajetoria/monograma-pontos.mjs` | SVG → `cena/monograma-pontos.json` |
| `scripts/gen-imagens.mjs` | Ganha o job `trajetoria` (extração e codificação dos quadros) |
| `tests/trajetoria.*` | §7 |

### 5.2 Modos

```js
/** modo.js — RF-TC-03, RF-TC-04. Ordem de decisão; a primeira regra que casa vence. */
export function decidirModo({ prefereMenosMovimento, escolhaSalva, webgl2, saveData, memoriaGB }) {
  if (prefereMenosMovimento) return 'estatico';          // sempre; nem o botão liga
  if (escolhaSalva === 'estatico') return 'estatico';
  if (!webgl2) return 'estatico';
  if (saveData) return 'estatico';                        // pode ligar pelo botão
  if (memoriaGB && memoriaGB < 2) return 'estatico';      // idem
  return 'cinema';
}
```

Com `prefers-reduced-motion: reduce` o botão aparece desabilitado com o texto
"Animação desligada pelo seu sistema" (não esconder: a pessoa entende por quê).

### 5.3 Contrato de ambiente

```ts
/**
 * Cada ambiente é um objeto com ciclo de vida explícito. A cena chama
 * montar() uma vez, atualizar() a cada quadro em que a faixa está ativa e
 * desmontar() quando a faixa sai da janela de ±1 faixa (libera GPU).
 */
export interface Ambiente {
  id: 1 | 2 | 3 | 4 | 5;
  montar(ctx: { cena, camera, renderer, nivel }): Promise<void>;
  atualizar(t: number /*0..1 local*/, dt: number, ponteiro: { x, y }): void;
  quadroDeCostura(lado: 'ini' | 'fim'): { cameraPos, fov, t }; // usado por render-chaves
  desmontar(): void;
}
```

`quadroDeCostura` é o que garante a costura invisível: a composição do
HyperFrames (§6) usa o mesmo módulo de ambiente e começa e termina exatamente
nesse estado. O primeiro e o último quadro do vídeo são, por construção, os
quadros da faixa vizinha.

### 5.4 Níveis de qualidade

| Nível | Pixel ratio | Partículas | Bloom | Grão | Quando |
| :-- | :-- | :-- | :-- | :-- | :-- |
| alto | min(dpr, 1,5) | 6.000 | meia resolução | sim | padrão no computador |
| médio | 1 | 3.000 | não | sim | padrão no celular; ou queda do alto |
| baixo | 0,75 | 1.200 | não | não | queda do médio |
| estático | — | — | — | — | queda do baixo; ou §5.2 |

Queda: média móvel de `dt` > 22 ms por 1 s → desce um nível. Nunca sobe
sozinho (evita oscilação). `window.__tc.nivel` exposto para teste.

## 6. Pipeline de geração (para quando o Issei liberar)

### 6.0 Ferramenta: HyperFrames (avaliação de 2026-11-24)

Sugestão do Issei: usar o **HyperFrames**, da HeyGen, para produzir os vídeos
sem serviço pago. Avaliação, com base no README do projeto
(`github.com/heygen-com/hyperframes`), na página de visão geral da HeyGen
(`developers.heygen.com/hyperframes-overview`) e numa resenha de terceiro
(dev.to, tratada como opinião):

| Ponto | O que a documentação diz | Efeito no plano |
| :-- | :-- | :-- |
| O que é | Framework que transforma HTML, CSS, mídia e animação "buscável" (*seekable*) em vídeo **determinístico** | Serve para T1 e T3, que são cenas 3D abstratas, não filmagem |
| Licença e custo | Apache 2.0; sem taxa por render; CLI local não pede conta nem chave | Custo **zero**. Some o orçamento de créditos |
| Como renderiza | Chrome *headless* busca cada quadro; FFmpeg codifica. Saída MP4, MOV, WebM, GIF ou sequência PNG | A saída em PNG entra direto no `gen-imagens`, sem extrair de MP4 |
| Requisitos | Node.js 22+ e FFmpeg | O CI do site usa Node 20. O HyperFrames **não** entra no `package.json`: roda por `npx` numa pasta à parte, na máquina de quem gera (notebook do Issei ou nuvem, que tem Node 22 e FFmpeg) |
| Animação | GSAP, CSS, Lottie, **Three.js**, Anime.js, WAAPI; a linha do tempo fica pausada e registrada em `window.__timelines` | Os ambientes Three.js da página (§5.3) viram a composição. Mesmo código, mesma câmera |
| Determinismo | "Mesma entrada, mesmo vídeo" | O render é reprodutível e verificável no gate (hash) |
| O que **não** faz | Não gera filmagem nem imagem fotorrealista. Avatar, vídeo, voz e música por IA são serviços da HeyGen (plano Pro ou API de nuvem), **pagos** | Os planos de IA "CRT realista" e "cidade vista de cima" viram cenas 3D estilizadas. G1 (storyboard por IA) sai do plano |
| Limites citados | Studio "em evolução"; render numa máquina só é mais lento; áudio com animação buscável é delicado | Sem efeito: 2 trechos de 2 s, sem áudio |

**Recomendação:** adotar o HyperFrames para T1, T3 e os pôsteres. Ganho
principal além do custo: a costura deixa de depender de um modelo generativo
acertar o quadro inicial e final; ela é garantida pelo código. Perda: o
"fotorrealismo de IA" do plano original. Essa perda conversa com a direção da
nova home (fotografia real, sem vídeo de IA) e com a decisão pendente D-H6.

### 6.1 Ordem e portões

Cada portão é uma aprovação do Issei. Nada é gerado antes do portão anterior.
Nenhum passo gasta crédito.

| Passo | O quê | Ferramenta | Custo | Portão |
| :-- | :-- | :-- | :-- | :-- |
| G0 | Texto final dos 5 atos + toques pessoais (D-TC-1) | Claude | 0 | Issei aprova o texto |
| G1 | Storyboard de 12 planos em quadros conceituais SVG/PNG (mesmo método do storyboard da home) | `scripts` locais + Playwright | 0 | Issei aprova a câmera |
| G2 | Ambientes 3D mínimos (F2) e os 4 quadros de costura | Three.js + `render-chaves.mjs` | 0 | Revisão visual |
| G3 | Composição T1 + render de rascunho 480p | HyperFrames (`npx hyperframes preview` e `render`) | 0 | Issei aprova o movimento |
| G4 | T1 final 1280×720, 24 qps, sequência PNG | HyperFrames | 0 | — |
| G5 | T3: composição → rascunho → final | HyperFrames | 0 | Issei aprova |
| G6 | Imagens da quebra de ritmo (mesa, painel) | Fotos reais da sessão da home (D-H2, cenas 03 e 05) ou captura real de painel sem dado | 0 | Issei aprova |
| G7 | Pôsteres dos 5 atos | Quadro escolhido de cada ambiente, render pelo HyperFrames ou `render-chaves.mjs` | 0 | — |

### 6.2 Composição (substitui os parâmetros de modelo)

Cada transição é uma pasta `assets-fonte/trajetoria/hyperframes/<t1|t3>/`
criada por `npx hyperframes init`. O `index.html` importa o módulo de ambiente
da página e expõe uma linha do tempo pausada:

```html
<!-- assets-fonte/trajetoria/hyperframes/t1/index.html (esboço) -->
<canvas id="cena" width="1280" height="720"
        data-start="0" data-duration="2" data-track-index="0"></canvas>
<script type="module">
  import { criarTransicao } from '../../../../src/js/trajetoria/transicoes/t1.js';
  const amb = await criarTransicao(document.getElementById('cena'), { nivel: 'alto' });
  // Linha do tempo buscável: t vai de quadroDeCostura('fim') do Ato I
  // a quadroDeCostura('ini') do Ato II. Sem relógio próprio, sem Math.random.
  window.__timelines = [{ duration: 2, seek: (s) => amb.renderEm(s / 2) }];
</script>
```

Regras:

- **Sem aleatoriedade** fora de semente fixa; sem `performance.now()` dentro
  do quadro. É o que garante o determinismo.
- Saída: sequência PNG 1280×720, 24 qps, 2 s (48 quadros), sem áudio.
- O `package.json` da pasta fixa a versão do HyperFrames (versão exata, não
  `latest`), para o render ser reprodutível.
- O mesmo módulo de ambiente roda na página e na composição. Mudou o
  ambiente, o render é refeito (o gate acusa pelo hash, §6.4).

### 6.3 Descrição das transições (substitui os prompts)

| Id | Movimento | Construção em Three.js |
| :-- | :-- | :-- |
| T1 | *Dolly-in* contínuo, 35 mm, até um monitor escuro; o cursor se estica numa linha que sai do vidro e vai para o espaço; *push* curto para 85 mm e volta | Monitor como caixa com tela emissiva; o fio é o mesmo *shader* da página (UT-3); câmera por curva de Bézier entre as duas chaves de costura |
| T3 | *Crane up* lento, 35 mm; uma constelação de pontos ligados vira a malha de luzes de uma cidade vista de cima; fluxos de luz correm pela malha | `Points` + `LineSegments` com posições interpoladas entre "constelação" e "grade"; fluxo por deslocamento de UV no *shader* |

Regras visuais comuns: sem texto, letra, número, logo ou rosto; sem pisca, sem
flash, sem tremor de câmera; luz só do próprio objeto. A paleta segue a
decisão D-H6 (direção antiga escura com azul/violeta, ou a nova Aizome + Kin).

Cada composição usada fica versionada com `assets-fonte/trajetoria/hyperframes/<id>/NOTAS.md`:
versão do HyperFrames, comando, tempo de render, data, tentativa escolhida e
motivo. É a fonte da seção "Como foi feito".

### 6.4 Pós-processamento (`gen-imagens`, job `trajetoria`)

Entrada: `assets-fonte/trajetoria/manifesto.json`

```json
{
  "t1": { "quadros": "brutos/t1/", "qps": 24 },
  "t3": { "quadros": "brutos/t3/", "qps": 24 }
}
```

Passos: a sequência PNG do HyperFrames entra direto (sem extrair de MP4) →
`sharp` gera AVIF 1280 e 854 (`quality` 50, `effort` 6) →
`frames/manifesto.json` com contagem, dimensões e SHA-256 → pôster do quadro
do meio. `--check` no gate confere hashes. O HyperFrames roda só na máquina de
quem gera (os PNG brutos não estão no Git); o gate só confere a saída.

### 6.5 Costura invisível: critério de aceite

Para cada transição, a diferença entre o PNG de costura e o 1º/último quadro
renderizado deve ter **SSIM ≥ 0,98** (medido no `gen-imagens --check-costura`).
O limite subiu de 0,85 para 0,98 porque os dois lados saem do mesmo código.
Abaixo disso, há divergência entre a página e a composição: é defeito, não
"nova tentativa".

### 6.6 Alternativa paga (fora do plano)

Higgsfield/Seedance (avaliado em 2026-11-24: vídeo 4 s 720p = 20 a 28
créditos; a conta tem 10) continua possível só se o Issei quiser fotorrealismo
de IA num trecho e aprovar o custo antes. Nesse caso valem os portões e a
regra de mostrar o custo antes de cada geração, como na versão anterior deste
SDD.

## 7. Testes

### 7.1 Unidade (`node --test`)

| Arquivo | Cobre |
| :-- | :-- |
| `tests/trajetoria.interp.test.mjs` | `clamp`, `lerp`, `local`; `damp` igual em 60 Hz e 120 Hz (erro < 1e-3 após 1 s); `amostrar` nas chaves e entre elas; `indiceDoQuadro(0)=0`, `(1)=47` |
| `tests/trajetoria.timeline.test.mjs` | Faixas contíguas (fim de uma = início da outra), cobrem 0..1, ids únicos; câmera monotônica em `p` |
| `tests/trajetoria.modo.test.mjs` | Tabela de verdade de `decidirModo` |
| `tests/trajetoria.fatos.test.mjs` | Cada período e número do HTML (`data-fato="cv:Experiencia[0].Resultados[4]"`) bate com `cv.json` |
| `tests/trajetoria.tokens.test.mjs` | Nenhum hexadecimal fora de `src/trajetoria.css`; `--tc-*` com contraste ≥ 4,5:1 sobre `#0d1117` |

### 7.2 Playwright

| Arquivo | Cobre |
| :-- | :-- |
| `tests/trajetoria.spec.js` | Smoke, SEO (title, description, OG, canonical, hreflang), RF-TC-01, 05, 07, 09, 10 |
| `tests/trajetoria.nojs.spec.js` | RF-TC-02 |
| `tests/trajetoria.reduced.spec.js` | RF-TC-03, RF-TC-04 |
| `tests/trajetoria.mobile.spec.js` | Pixel 7: nível "médio", quadros 854, sem rolagem horizontal |
| `tests/trajetoria.capturas.spec.js` | Capturas em P = 0, 0,1 … 1,0 (11 imagens) para revisão quadro a quadro (método do tutorial); não reprova, só anexa |
| Suítes existentes | Entrar em `focus-visible`, `a11y-sweep` (axe) e `perf-budget` |

No container de nuvem: Chromium em `/opt/pw-browsers/chromium` via
`launchOptions.executablePath`, `--trace off`.

### 7.3 Revisões

- `a11y-design-reviewer` (a11y, tokens, SEO) e `tone-reviewer` (voz) no PR da F1 e da F4.
- Teste com leitor de tela real: Issei (como nas outras páginas).
- Revisão de flashes: quadro a quadro nas duas transições (ferramenta: PEAT ou
  contagem de variação de luminância > 10 % entre quadros, máx. 3 por segundo).

## 8. Acessibilidade — detalhes de implementação

- `aria-hidden="true"` no palco; `role="presentation"` no canvas.
- O texto de cada ato fica num bloco com scrim `color-mix(in srgb, var(--tc-fundo) 80%, transparent)`;
  o teste de contraste mede o texto sobre o **pior** pôster (mais claro).
- Foco: o palco tem `z-index` abaixo do conteúdo e `pointer-events: none`,
  exceto no Ato V (interação com ponteiro), onde só o canvas recebe ponteiro e
  nenhum controle fica embaixo dele.
- Nada de `scroll-snap` nem de sequestro de roda/toque. Page Down, Espaço e
  setas funcionam como em qualquer página.
- Registrar em `A11Y-DECISIONS.md` o padrão "cena decorativa guiada por
  rolagem, texto primeiro" com referência a este SDD.

## 9. Integração com o site

| Item | Ação |
| :-- | :-- |
| `specs/ecosystem.nav.yaml` | Nó `trajetoria` no grupo `trajetoria` (com `life`, `life3d`, `terminal-evolutivo`), `natureza: experiencia`, temas 0–3 |
| Cabeçalho | Comum (`gen-cabecalho`); nenhum item novo |
| `/curriculo` | Link "Ver a trajetória como filme" no topo da linha do tempo (via `gen-portfolio`, bloco `PF:*`; não à mão) |
| Consentimento | Bloco padrão (consent default `denied` antes do GTM) |
| Deploy | `deploy.yml` já força `image/avif` e `image/webp`; acrescentar `model/gltf-binary` para `.glb` |
| `/en/` | `npm run i18n:sync` no notebook do Issei (o ambiente de nuvem não alcança o Argos) |
| OG | `scripts/gen-og-trajetoria.mjs` no modelo do `gen-og-index.mjs` |

## 10. Unidades de trabalho (ordem e tamanho)

Um PR por unidade. Teste antes do código em todas.

| UT | Conteúdo | Depende de | Tamanho |
| :-- | :-- | :-- | :-- |
| UT-0 | Texto final + D-TC-1 respondida (só documento) | — | P |
| UT-1 | Página estática: HTML, CSS, pôsteres provisórios (gradiente), SEO, natureza, catálogo, testes 7.1 (fatos, tokens) e 7.2 (smoke, nojs), `/en/` | UT-0 | M |
| UT-2 | `interp.js`, `timeline.js`, `modo.js`, `rolagem.js` + testes de unidade; botão de animação; modo estático completo | UT-1 | P |
| UT-3 | `cena.js` + Ato I e Ato II + fio (shader) + níveis de qualidade | UT-2 | G |
| UT-4 | Atos III, IV, V + partículas + monograma + quebra de ritmo CSS | UT-3 | G |
| UT-5 | `render-chaves.mjs` + G1 (storyboard SVG) + composição HyperFrames de T1 + G3 (rascunho) — custo zero, mas só com o "pode" do Issei | UT-3 | M |
| UT-6 | `quadros.js` + worker + job `gen-imagens` + T1 e T3 finais | UT-5 | M |
| UT-7 | "Como foi feito" + OG + link na Carreira + revisões finais + capturas | UT-6 | P |

UT-1 e UT-2 já entregam uma página publicável. UT-3 e UT-4 entregam o modo
cinema com transições por dissolve. UT-5 e UT-6 trocam os dissolves de T1 e T3
pelas sequências renderizadas no HyperFrames. Se o render não ficar bom, a
página para em UT-4 e continua completa.

## 11. Riscos

| Risco | Efeito | Resposta |
| :-- | :-- | :-- |
| Costura com SSIM < 0,85 depois de 2 tentativas | Corte visível | Corte seco ou dissolve 3D (regra do plano §3.4) |
| HyperFrames muda de versão ou quebra | Render diferente | Versão exata fixada na pasta da composição; o gate confere os hashes da saída. Se quebrar, a página para em UT-4 (completa) |
| Node 22+ exigido pelo HyperFrames, CI do site em Node 20 | Conflito de versão | HyperFrames fora do `package.json` do site; roda só por `npx` na pasta da composição |
| Ambientes 3D tomam mais tempo que o previsto | Atraso | UT-3 e UT-4 aceitam primeiro versões simples (fio + partículas); detalhes depois |
| Estética genérica ("tech" padrão) | Página impessoal | Toques pessoais (D-TC-1) e a seção "Como foi feito" |
| Atualização do `cv.json` deixa a página velha | Fato errado publicado | `trajetoria.fatos.test.mjs` no gate |
| Safari sem `animation-timeline` | Texto sem animação de entrada | Já é o comportamento base (o texto aparece parado) |
