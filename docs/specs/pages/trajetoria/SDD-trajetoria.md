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
> módulo, orçamento de créditos, testes e a ordem das unidades de trabalho.

## 1. Escopo

### 1.1 Entra

- Página nova `src/trajetoria.html` (URL `/trajetoria`) e o gêmeo `/en/trajetoria`
  gerado pelo Argos.
- Cena decorativa em um `<canvas>` WebGL (Three.js), com 2 transições de vídeo
  de IA em sequência de quadros, 1 quebra de ritmo em CSS e partículas finais.
- Seção "Como foi feito" (decisão D-TC-8: autoria com bastidores).
- Pipeline de ativos: quadros de costura renderizados, prompts versionados,
  geração no Higgsfield, extração e codificação no `gen-imagens`.
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
| D-TC-2 | Aberta | Higgsfield via MCP. Modelo de vídeo: **Seedance 2.5** (`seedance_2_5`, modo `omni_reference`, com `start_image` e `end_image`) |
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
| RF-TC-03 | Com `prefers-reduced-motion: reduce`, o modo cinema **não inicia** (nenhum contexto WebGL criado; nenhum quadro de IA baixado) | Playwright com `reducedMotion: 'reduce'`: zero requisições a `/frames/`; `window.__tc.modo === 'estatico'` |
| RF-TC-04 | Botão "Animação ligada/desligada" (`aria-pressed`) no topo alterna cinema ↔ estático a qualquer momento, e a escolha persiste (localStorage, com `try/catch`) | Clicar desliga o laço rAF em ≤ 1 quadro; recarregar mantém a escolha |
| RF-TC-05 | Modo cinema: a rolagem controla a câmera e as faixas da linha do tempo do plano §6.1, com amortecimento | Teste de unidade da linha do tempo (§7.1); Playwright rola até P = 0,5 e lê `__tc.faixa === 'p04'` |
| RF-TC-06 | As transições T1 e T3 mostram a sequência de quadros correspondente ao progresso, com carga progressiva (a cada 4º quadro primeiro) | Unidade: `indiceDoQuadro(t, 48)`; Playwright: ao entrar no Ato I, só os quadros de T1 com índice múltiplo de 4 são pedidos primeiro |
| RF-TC-07 | Quebra de ritmo 05b: o monitor se expande por `clip-path` controlado por `--tc-abre` (0→1) | Playwright em P = 0,73: `--tc-abre` entre 0,4 e 0,6 |
| RF-TC-08 | Final: partículas convergem no monograma "MI" e o monograma vira o cursor do Ato I | Captura em P = 0,98 comparada a referência visual (tolerância 2 %) |
| RF-TC-09 | Navegação por atos (`<nav aria-label="Atos da trajetória">`) com âncoras `#ato-1`…`#ato-5`; no modo cinema, a âncora leva a câmera ao início do ato | Teclado: Tab chega ao nav; Enter em "Ato III" deixa `__tc.faixa` em `p04` |
| RF-TC-10 | Seção "Como foi feito" depois dos créditos, em HTML comum, com prompt, modelo, custo em créditos e par antes/depois de cada transição | Playwright: seção existe, cita `seedance_2_5`, mostra 2 pares de imagens |
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
| RNF-TC-11 | Rastreabilidade | Todo ativo gerado tem prompt, modelo, semente, custo e data em `assets-fonte/trajetoria/prompts/*.md` |

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
| `src/js/trajetoria/shaders/*.glsl` | `fio`, `dissolve`, `particulas`, `crt` (importados com `?raw`) |
| `src/assets/trajetoria/**` | Ativos de build (lista completa no plano §9) |
| `assets-fonte/trajetoria/**` | Fontes: storyboard, chaves, prompts, manifesto |
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

`quadroDeCostura` é o que garante a costura invisível: o mesmo estado usado
para renderizar o PNG que vai ao Higgsfield é o estado em que o ambiente fica
no primeiro/último quadro da faixa.

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

### 6.1 Ordem e portões

Cada portão é uma aprovação do Issei. Nada é gerado antes do portão anterior.

| Passo | O quê | Ferramenta | Custo estimado* | Portão |
| :-- | :-- | :-- | :-- | :-- |
| G0 | Texto final dos 5 atos + toques pessoais (D-TC-1) | Claude | 0 | Issei aprova o texto |
| G1 | Storyboard a lápis, 12 planos | Higgsfield `generate_image` (`gpt_image_2_6`, 16:9) | 12 × 0,75 = **9 créditos** | Issei aprova a câmera |
| G2 | Ambientes 3D mínimos (F2) e render dos 4 quadros de costura | Three.js + `render-chaves.mjs` | 0 | Revisão visual |
| G3 | Teste T1 em rascunho 480p (`draft: true`) | `seedance_2_5`, 4 s | consultar com `estimate_video_cost` antes | Issei aprova a costura |
| G4 | T1 final (720p) a partir do rascunho aprovado (`draft_job_id`) | `seedance_2_5` | consultar antes | — |
| G5 | T3 rascunho → final | idem | consultar antes | Issei aprova |
| G6 | Imagens da quebra de ritmo (mesa, painel) | `generate_image` | 2 × 0,75 = **1,5 crédito** | Issei aprova |
| G7 | Pôsteres dos 5 atos | render do Three.js (0) ou `generate_image` | 0 a 3,75 | — |

\* Custos consultados em 2026-11-24 na conta do Issei (plano gratuito, 10
créditos): vídeo 4 s 720p sem áudio = 28 créditos (`seedance_2_5`) ou 20
(`seedance_2_5_flash`); imagem = 0,75. **Orçamento total estimado: ~70 créditos**
(2 vídeos finais sem nova tentativa + rascunhos + ~15 imagens) **a ~130
créditos** (com uma nova tentativa por vídeo). O custo do rascunho 480p é
consultado antes, no G3. Regra: chamar `estimate_video_cost`/`estimate_image_cost` e mostrar
o valor ao Issei antes de cada geração; nunca gerar sem o "pode".

### 6.2 Parâmetros fixos dos vídeos

```json
{
  "model": "seedance_2_5",
  "mode": "omni_reference",
  "duration": 4,
  "resolution": "720p",
  "aspect_ratio": "16:9",
  "generate_audio": false,
  "medias": [
    { "role": "start_image", "value": "<media_id de t1-ini.png>" },
    { "role": "end_image",   "value": "<media_id de t1-fim.png>" }
  ]
}
```

Sem áudio (a página não tem som). 720p basta: o quadro de computador é
1280×720.

### 6.3 Prompts (versão 1, em inglês, como o modelo prefere)

Regras comuns, coladas no fim de todo prompt:
`No text, no letters, no numbers, no logos, no faces, no recognizable people,
no flicker, no flashes, no camera shake. Background #0d1117. Accent light only
#007bff to #8a2be2. Subtle film grain.`

| Id | Prompt |
| :-- | :-- |
| SB-01…12 | `Rough pencil storyboard sketch, graphite on off-white paper, 16:9 frame with thin border, arrows showing camera movement. Shot: <descrição do plano §3.3>. Lens <35/85/24>mm.` (estas imagens são rascunho; a regra de fundo escuro não vale para elas) |
| T1 | `Continuous dolly-in, 35mm lens, into a dark CRT monitor in a pitch-black room. The single blinking cursor on the screen stretches into one thin glowing blue line that leaves the glass and extends into 3D space. Brief push to 85mm macro on the cursor, back to 35mm. Light comes only from the screen.` |
| T3 | `Slow crane up, 35mm lens. A small constellation of glowing points connected by thin lines, floating in darkness, gradually reveals itself as the street-light grid of an abstract night city seen from above. Streams of light begin to flow along the grid. Motivated light only.` |
| Q-mesa | `Night desk scene, 50mm lens, eye level, a single monitor glowing on a dark wooden desk, cool blue screen light, room in deep shadow, minimal objects, no people.` |
| Q-painel | `Abstract operations dashboard on a monitor, flat dark UI, blue and violet lines and nodes, no readable text, no numbers, no brand.` |

Cada prompt usado vira `assets-fonte/trajetoria/prompts/<id>.md` com: texto,
modelo, parâmetros, `job_id`, custo real, data, tentativa escolhida e motivo.

### 6.4 Pós-processamento (`gen-imagens`, job `trajetoria`)

Entrada: `assets-fonte/trajetoria/manifesto.json`

```json
{
  "t1": { "bruto": "brutos/t1.mp4", "inicio": 0.5, "duracao": 2.0, "qps": 24 },
  "t3": { "bruto": "brutos/t3.mp4", "inicio": 0.5, "duracao": 2.0, "qps": 24 }
}
```

Passos: `ffmpeg` extrai PNG → `sharp` gera AVIF 1280 e 854 (`quality` 50,
`effort` 6) → `frames/manifesto.json` com contagem, dimensões e SHA-256 → pôster
do quadro do meio. `--check` no gate confere hashes. O `ffmpeg` roda só na
máquina de quem gera (o bruto não está no Git); o gate só confere a saída.

### 6.5 Costura invisível: critério de aceite

Para cada transição, a diferença entre o PNG de costura e o 1º/último quadro
extraído deve ter **SSIM ≥ 0,85** (medido no `gen-imagens --check-costura`).
Abaixo disso, ou se a curva de câmera do vídeo divergir, a transição volta para
nova tentativa ou vira corte seco (regra do plano §3.4).

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
| UT-5 | `render-chaves.mjs` + G1 (storyboard) + G3 (rascunho T1) — **gasta créditos, só com o "pode"** | UT-3 | M |
| UT-6 | `quadros.js` + worker + job `gen-imagens` + T1 e T3 finais | UT-5 | M |
| UT-7 | "Como foi feito" + OG + link na Carreira + revisões finais + capturas | UT-6 | P |

UT-1 e UT-2 já entregam uma página publicável. UT-3 e UT-4 entregam o modo
cinema sem IA (transições por dissolve). UT-5 e UT-6 trocam os dissolves de T1
e T3 pelos vídeos. Se o orçamento de créditos não vier, a página para em UT-4 e
continua completa.

## 11. Riscos

| Risco | Efeito | Resposta |
| :-- | :-- | :-- |
| Costura com SSIM < 0,85 depois de 2 tentativas | Corte visível | Corte seco ou dissolve 3D (regra do plano §3.4) |
| Créditos insuficientes | Sem vídeos | Página para em UT-4 (completa) |
| Ambientes 3D tomam mais tempo que o previsto | Atraso | UT-3 e UT-4 aceitam primeiro versões simples (fio + partículas); detalhes depois |
| Estética genérica ("tech" padrão) | Página impessoal | Toques pessoais (D-TC-1) e a seção "Como foi feito" |
| Atualização do `cv.json` deixa a página velha | Fato errado publicado | `trajetoria.fatos.test.mjs` no gate |
| Safari sem `animation-timeline` | Texto sem animação de entrada | Já é o comportamento base (o texto aparece parado) |
