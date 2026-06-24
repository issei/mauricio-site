# SDD — Terminal Evolutivo v3.0 "Semântica Humana"

**Versão**: 3.0 — *A Engenharia da Resiliência Humana* (sucede a v2.2 Híbrida WebGL)
**Data**: 2026-06-24
**Autor**: Arquitetura SDD (agent-driven)
**Padrão**: Specification-Driven Development (SDD)
**Tipo**: Página única de portfólio interativa (scrollytelling — CSS-first, ambiente leve, fallback = produto)
**Status**: Especificação proposta — **revisão crítica da `ideia_v3_semantica_humana.md`** + plano de entrega. Código ainda NÃO escrito.
**Direção criativa de origem**: [`docs/references/ideia_v3_semantica_humana.md`](../../../references/ideia_v3_semantica_humana.md)
**Spec anterior (técnica, ainda válida como base de a11y/SEO)**: [`00_SDD_terminal_evolutivo.md`](./00_SDD_terminal_evolutivo.md)

> **Natureza desta v3**: a `ideia_v3` é *direção conceitual, não especificação técnica* (ela mesma o diz). Esta SDD a **traduz em engenharia**, resolvendo as contradições entre a direção e o que está hoje publicado (v2.2). Onde a v3 e o código atual divergem, esta seção decide — e justifica.

---

## 0. Revisão crítica da ideia (pense · revise · valide)

A `ideia_v3` é forte e coerente, mas **não é neutra em relação ao que já existe**: vários de seus princípios contradizem a implementação v2.2 publicada na `main` e o gate de testes. Validar a ideia = expor essas contradições e decidir cada uma.

### 0.1 Matriz de conflitos `ideia_v3` × v2.2 publicada

| # | A `ideia_v3` exige | A v2.2 publicada faz | Severidade | Decisão desta SDD |
|:--|:--|:--|:--|:--|
| C1 | §VII: **evitar** partículas-como-rede-neural, glitch de transição, neon dominante. Risco 3: "se desabilitar o Canvas e a narrativa não perde substância, o WebGL é decoração" | `te-scene.js`: campo de partículas morfando CRT→wireframe→nós→blocos→**rede neural+bloom**; temas neon | **Alta** | **Remover Three.js/`te-scene.js`.** Ambiente vira CSS+SVG. Ver §1. |
| C2 | §VI: legendas/`alt` limpos, sem prefixo decorativo `[SYS_RECORD:…]`; "o leitor de tela merece a mesma narrativa" | `.img-meta` com `[SYS_RECORD: …]` em toda `<figcaption>` | **Alta** (quebra teste `:115`) | **Remover** os logs `SYS_RECORD`. Caption e `alt` humanos (§3.3). Atualizar teste. |
| C3 | Notas de foto: `programa.jpg` = **Sysgen, 2003** | Página usa `programa.jpg` na Era 2 com caption `1997_PRIMEIROS_COMANDOS` | **Alta** (erro factual) | Mover `programa.jpg` → Era 3 (Sysgen 2003). Era 2 usa `eldorado.jpg`. (§3.2) |
| C4 | Notas de foto + §III Ato 6: `careca.jpeg` = **2017, com os três filhos**, fundo do poço/virada, "coragem máxima, sem mediação" | Página usa `careca.jpeg` como `HOJE_TRABALHO`, "arquiteto e mentor hoje" | **Alta** (erro de enquadramento) | Reposicionar `careca.jpeg` como o beat 2017 (dignidade, sem filtro). `familia.jpeg` (2025) é o "hoje" final. (§3.2/§5.4) |
| C5 | §III Ato 4 / §IV Era 3: **Silêncio Absoluto de abril/2004** — viewport quase vazio, dessaturação total, pausa contemplativa | Parágrafo comum dentro da Era 3 | Média | Nova `<section class="silence">` 100svh, dessaturação por CSS, **sem scroll-jacking** (a11y). (§5.2) |
| C6 | §IV: **envelhecimento reverso** — densidade alta (Era 1) → espaço/limpeza máximos (Era 5); tipografia muda de *comportamento* (tracking/leading), não de família | Todas as eras com `padding: 8vh 0`; troca de *família* de fonte por tema | Média | Escala de respiro progressiva + tracking/leading por era. (§4.2/§4.3) |
| C7 | §V / Risco 6: KPIs como **intermezzo declarado** ("mudança de modo"), isolados do fluxo emocional | Já em `.closing#kpi`, mas sem marcação explícita de "saída do modo narrativo" | Baixa | Divisor/rótulo "modo informativo · para recrutadores". (§5.5) |
| C8 | §IV Era 4: **Marco do Arquiteto** com *blueprint luminoso* emergindo | `.marco` só com a frase | Baixa | Adicionar SVG blueprint com reveal por scroll (decorativo, `aria-hidden`). (§5.3) |
| C9 | §VI: tom de conversa, humano em 1º plano; tecnologia é cenário | Caption-log, KPIs como "Data Records", metáfora técnica dominante | Média | Curadoria de voz: remover moldura "sistema/registro"; humano lidera. (§3.3) |

### 0.2 Riscos da própria ideia (e como esta SDD os trata)

- **Scroll-jacking no Silêncio (Risco de a11y).** A direção pede "o scroll para completamente". Implementar trava de scroll real é uma armadilha de acessibilidade e de usabilidade (quebra teclado, roda, leitores de tela). **Mitigação**: entregar a *intenção* (pausa, vazio, dessaturação) com uma seção de 100svh quase vazia que faz o usuário **demorar naturalmente**, não por sequestro do scroll. Sob `prefers-reduced-motion`, é só texto sobre fundo neutro. (§5.2)
- **`infancia.png` e o kitsch (Risco 7 da ideia).** É montagem com Hanna-Barbera/tokusatsu — exatamente o terreno do "fantasia de época" que a ideia manda evitar. **Mitigação**: usá-la pequena e subordinada, com `alt` honesto ("montagem de infância"), nunca como herói da Era 1; o herói é `1982.jpeg` (a foto "da caixa de sapato"). Decisão de dono em §9 (incluir vs. omitir).
- **Remoção do WebGL como regressão percebida.** O 3D foi publicado há dias (commit `487a531`). **Mitigação**: esta SDD documenta a remoção como decisão *de fidelidade à direção*, não downgrade; o eixo continua sendo a narrativa. Alternativa de menor toque registrada em §1.3 caso o dono prefira manter o 3D.

---

## 1. Decisão estratégica: substituir o motor, manter o chassi

### 1.1 O que sai, o que fica

| Camada | v2.2 (publicada) | v3.0 (esta SDD) | Razão |
|:--|:--|:--|:--|
| Ambiente de fundo | `<canvas>` WebGL + Three.js (`te-scene.js`) | **CSS + SVG inline** (grão analógico, dessaturação, blueprint, gradientes por era) | `ideia_v3` §VII + Risco 3: 3D é decoração que envelhece; manifesto pede eliminação |
| Dependências | `three`, `gsap`, `lenis`, `split-type` | **`gsap` + `lenis` (mantidos)**; `split-type` opcional; **`three` removido** | Bundle menor; menos superfície de bug (iOS context-loss, dispose, tiers) |
| Orquestrador JS | GSAP ScrollTrigger ⇄ Three.js (morph + câmera + render sob demanda) | GSAP ScrollTrigger **só para foreground**: tema por era, reveal, silêncio, blueprint, typewriter pontual | Sem render loop, sem pool GPU, sem §7 inteira |
| HTML semântico | `header/main/5×section.era/marco/closing/outro/footer` | **mantido** (ajustes de conteúdo) | A11y/SEO já corretos; é o chassi |
| 5 temas CSS (foreground) | `:root` + `.theme-*` | **mantidos e recalibrados** por era (paleta da `ideia_v3` §IV) | Reaproveitamento direto |
| AEO / eco-nav / catálogo | integrados (gate 342) | **mantidos**, com copy regenerada (sem "WebGL/rede neural") | §6.3 |

> **Princípio**: "replace the engine, keep the chassis." O HTML semântico, os tokens de tema e a integração de ecossistema são reaproveitados; só o **modo de pintar o ambiente** muda — de GPU para CSS/SVG, que é o que a direção realmente descreve.

### 1.2 Por que isto é o mais econômico (token + processo)

1. **Menos código novo**: deletar `te-scene.js` (cena, morph, pools, dispose, context-loss) e a metade WebGL de `terminal-evolutivo.js` é subtração; o que entra é CSS e poucos handlers de scroll.
2. **§7 inteira (Performance Budget WebGL) deixa de existir** — tiers, `dpr` cap, bloom condicional, Safari/iOS context-loss, `.no-backdrop`: ~80 linhas de spec viram nulas.
3. **Menos testes frágeis**: o teste "render sob demanda / 0 frames em idle" e o de WebGL-desabilitado deixam de fazer sentido; o gate fica mais simples e estável.
4. **Fidelidade sem retrabalho**: a alternativa "manter 3D e suavizar shaders" exige reescrever estados de morph para *não* parecerem partícula/glitch/neon — mais caro e mais arriscado que remover.

### 1.3 Alternativa registrada (caso o dono queira manter o 3D)

*Menor toque, menor fidelidade*: manter `three`/`te-scene.js`, mas (a) trocar a fase `neural` de partículas+bloom por **fluxos paralelos lentos** sem bloom; (b) remover qualquer glitch; (c) reduzir neon dos temas; (d) garantir que o Canvas nunca compita com o conteúdo. Custo maior, e ainda contraria o Risco 3 da própria ideia. **Não recomendada** — documentada para decisão consciente (§9).

---

## 2. Arquitetura v3 (CSS-first)

### 2.1 Camadas

```
┌─ #ambient  (position:fixed; inset:0; z-index:-1; aria-hidden; pointer-events:none) ─┐
│  CSS: gradiente sólido por tema (--page) + textura por era (grão SVG / nenhum)      │
│  Sem canvas, sem loop. A "evolução" é a classe de tema do <body> mudando os tokens. │
└────────────────────────────────────────────────────────────────────────────────────┘
        ▲ z-index:1  (foreground HTML, rola normalmente — semântico e linear)
   HERO → ERA1 → ERA2 → ERA3 → [SILÊNCIO 2004] → ERA4 → [MARCO] → ERA5 → KPI → OUTRO → FOOTER
```

- `#ambient` substitui `#bg-webgl`. É uma `<div>` (ou mantém-se o `<canvas>` vazio só por compat de seletor — preferir `<div>` para clareza), `aria-hidden`, decorativa. O fundo "evolui" porque cada `.theme-*` redefine `--page`, `--grain`, `--accent` etc., e a transição de `background`/`filter` tem `transition`.
- **Sem JS, sem WebGL, sem CSS de tema**: a página continua um documento HTML linear legível. (Princípio inegociável herdado da v2.)

### 2.2 Contrato HTML lido pelo orquestrador

Cada era mantém `data-theme` e `data-era`; **`data-scene` é removido** (não há cena). Acrescenta-se `data-density` (escala de respiro, §4.2).

```html
<section class="era" data-theme="terminal" data-era="1982-1994" data-density="1" aria-labelledby="era1-title">…</section>
…
<section class="silence" data-theme="net" aria-label="Abril de 2004">…</section>   <!-- novo beat -->
…
<section class="era marco" data-theme="cloud" data-era="2010-2015" aria-label="Marco: de analista a arquiteto">…</section>
…
<section class="era" data-theme="ai" data-era="2016-2026" data-density="5" aria-labelledby="era5-title">…</section>
```

### 2.3 Orquestrador `terminal-evolutivo.js` (enxuto)

Responsabilidades (todas degradam com graça):

1. **Tema por era** — `ScrollTrigger.create({ trigger, start:'top center', end:'bottom center', onEnter/onEnterBack })` troca a classe do `<body>` e o `<meta theme-color>`. (Mantém a lógica atual; remove tudo de Three/câmera/render.)
2. **Reveal das `.passage`** — `IntersectionObserver` (mantido como está).
3. **Silêncio 2004** — quando a `.silence` entra no centro, adiciona `body.is-mourning` (dessatura o ambiente e a interface por CSS); remove ao sair. Sem trava de scroll.
4. **Blueprint do Marco** — reveal por `ScrollTrigger` (classe `.is-drawn` dispara animação SVG de stroke). `aria-hidden`.
5. **Typewriter pontual** — no máximo 1–2 ocorrências (ideia §VII: "typing em excesso cansa"). Clone `aria-hidden`, texto real no DOM. (Reusa o padrão da §5.4 da v2.)
6. **Lenis** (opcional) — smooth-scroll com peso, desligado em `prefers-reduced-motion`. Já é dependência.
7. **Facade de vídeo** — mantido idêntico.

> Sem `requestAnimationFrame` próprio, sem pools, sem `dispose`. GSAP só agenda callbacks de scroll; o resto é CSS.

---

## 3. Narrativa e correções de conteúdo (a parte que mais muda)

### 3.1 Os dois eixos psicológicos como fio condutor (ideia §I)

Toda a página deve carregar, sem nomear:
- **Dinâmica da Carga (o SRE humano)**: de ponto único de falha (filho único, estuda+trabalha, resolve sozinho, internaliza tudo → alopecia = *timeout* de produção) para **alta disponibilidade** (responsabilidades distribuídas, esposa empresária, clã como rede de apoio, time que ele habilita).
- **Dinâmica da Ressonância**: de **receptor** (heróis na antena, algoritmos no Pentium, comandos em legados) para **transmissor/orquestrador** (diálogo com a esposa, mentoria, o prompt certo para o agente) — sempre o mesmo gesto: *encontrar a frequência comum*.

Esses eixos não viram texto explicativo; viram **escolhas de ritmo e enquadramento** das fotos e parágrafos.

### 3.2 Mapa de fotos corrigido (fonte: notas da `ideia_v3`)

| Foto | Fato real (ideia) | Era v3 | Mudança vs. v2.2 |
|:--|:--|:--|:--|
| `1982.jpeg` | Bebê <1 ano, 1982 | **Era 1** | Mantido (herói da Era 1) |
| `infancia.png` | Montagem infância + Hanna-Barbera + tokusatsu | **Era 1** (opcional, pequena) | **Passa a ser usada** (hoje não é) — ou omitir (§9) |
| `eldorado.jpg` | Auditor de lojas, **1º estágio, 1998**, durante curso técnico | **Era 2** | **Movida** Era 3→Era 2; nova moldura (estágio) |
| `callcenter.jpg` | Suporte técnico em **provedor discado iG/OSite, 2000–2002** | **Era 3** | Mantida; copy enriquecida (discada literal) |
| `programa.jpg` | Programando na **Sysgen, 2003** | **Era 3** | **Movida** Era 2→Era 3; corrige caption "1997" |
| `formatura.jpg` | Formatura **com a mãe**, Mackenzie, 2005 | **Era 3** | Mantida; `alt` cita a mãe |
| `casamento.jpg` | Bolo de casamento, 2011 | **Era 4** | Mantido |
| `filha.jpeg` | Filha nasce 2012 (saída Sysgen → Indra) | **Era 4** | Mantido |
| `gemeos.jpeg` | Gêmeos 2016, bodies **Ctrl+C / Ctrl+V** | **Era 5** | Mantido; `alt` cita os bodies |
| `careca.jpeg` | Com os **três filhos, 2017**, alopecia | **Era 5** (beat da virada) | **Reenquadrada**: era "hoje/mentor" → vira "fundo do poço 2017" |
| `familia.jpeg` | Família reunida, **2025**, restaurante | **Era 5** (imagem final) | Mantida como finale, com respiro máximo |

### 3.3 Voz e legendas (ideia §VI / §IX)

- **Remover** todos os `<span class="img-meta">[SYS_RECORD: …]</span>`. A `<figcaption>` passa a ser uma frase humana curta (ou ausente, deixando a foto respirar).
- **`alt` humanos** (exatos da ideia §VI):
  - `1982.jpeg` → "Issei bebê no colo, 1982 — o ponto de origem da jornada"
  - `eldorado.jpg` → "Primeiro emprego como auditor no Shopping Eldorado, 1998"
  - `callcenter.jpg` → "Suporte de headset no call center, 2002 — aprender a ouvir o usuário"
  - `programa.jpg` → "Programando na Sysgen, 2003 — o modelo como fonte da verdade"
  - `formatura.jpg` → "Formatura em Sistemas de Informação na Mackenzie, 2005, com a mãe"
  - `casamento.jpg` → "Casamento em 2011 — a fundação mais crítica não era de software"
  - `filha.jpeg` → "Filha recém-nascida em 2012 — o motivo da estabilidade"
  - `gemeos.jpeg` → "Os gêmeos recém-nascidos com bodies Ctrl+C e Ctrl+V, 2016"
  - `careca.jpeg` → "Maurício com os filhos durante a alopecia, 2017 — o fundo do poço e a virada"
  - `familia.jpeg` → "A família reunida em 2025 — o alicerce coletivo"
- **KPIs deixam de ser "Data Records".** Continuam texto real, mas o número é consequência de ação humana (ideia §V "Admiração"): contexto narrativo antes do número, sem moldura de dashboard/log.
- Tom geral: conversa, não epopeia (Risco 1). Tom de voz "engenharia, não marketing" da casa permanece — combina com a sobriedade que a ideia pede.

### 3.4 Cronologia das eras (inalterada — já calibrada na v2.2)

`1982-1994 · 1995-1999 · 2000-2009 · 2010-2015 · 2016-2026`. O Silêncio 2004 vive dentro do arco da Era 3 (2000–2009). O Marco é interstício 2010-2015 (Era 4) → Era 5.

---

## 4. Sistema visual: o envelhecimento reverso (ideia §IV)

### 4.1 Paleta por era (recalibrar os `.theme-*` existentes)

Direção da `ideia_v3` §IV — *toda escura/contínua* (mantém a decisão v2.2 R1 de não ir para tema claro), mas com intenção emocional por era:

| Era | Tema | Direção de cor (ideia §IV) | Ajuste vs. tokens atuais |
|:--|:--|:--|:--|
| 1 (1982–94) | `terminal` | Âmbar queimado, sépia quente, verde fósforo **suave**, nada saturado | Reduzir saturação do verde; âmbar como calor analógico |
| 2 (1995–99) | `wire` | Verde terminal usado **com parcimônia** (acento, não papel de parede) | Menos neon de fundo; verde só em acento |
| 3 (2000–09) | `net` | Azul-noturno profundo, cinza concreto, **toque de âmbar** (calor humano como sinal fraco) | Adicionar âmbar de acento; mais "concreto" |
| 4 (2010–15) | `cloud` | Azul corporativo maduro, **terracota** (tijolo/casa), brancos estruturais | Acento terracota; manter dark premium |
| 5 (2016–26) | `ai` | Quase monocromático; off-white; **um único acento** (âmbar da infância maduro) | Tirar roxo/teal saturado; um acento só |

### 4.2 Respiro progressivo (`data-density` → espaçamento)

A curva dramática é o **aumento de espaço em branco** do início ao fim (ideia §VI). Implementação barata por CSS:

```css
.era { padding-block: calc(6vh + (var(--d) - 1) * 4vh); }   /* d=1 → ~6vh; d=5 → ~22vh */
.era[data-density="1"] { --d: 1; }  /* densa, camadas, pouco vazio */
.era[data-density="5"] { --d: 5; }  /* respiro máximo */
```

- Era 1: parágrafos mais juntos, fotos próximas (densidade de álbum físico).
- Era 5: um elemento por viewport, margens largas; a foto da família com mais espaço que qualquer outra imagem do site.

### 4.3 Tipografia como instrumento de era (ideia §VI)

A direção pede **mudança de comportamento**, não troca de família. Pragmatismo:
- Manter `VT323`/`IBM Plex Mono` apenas nas Eras 1–2 (sabor de terminal/álbum) — é diferença de *peso/forma* honesta, não fantasia.
- Eras 3–5 em `Inter`, variando **tracking/leading/weight**: Era 3 densa (leading apertado), Era 5 a mais espaçada do site (kerning e leading generosos).

```css
.theme-net   h2, .theme-net   p { letter-spacing: -.01em; line-height: 1.5; }   /* densa */
.theme-ai    h2 { letter-spacing: .01em; } .theme-ai p { line-height: 1.9; }    /* respira */
```

### 4.4 Tratamento fotográfico por era (CSS filter — já existe, recalibrar)

- Era 1: grão + dessaturação parcial (caixa de sapato). **Remover** a scanline CRT pesada `::after` se ela "sujar" demais (ideia §VI: sem blend-modes que prejudiquem render); manter um grão leve via textura SVG.
- Eras 2–3: grão menor, contraste maior, sombras fechadas (trincheira).
- Eras 4–5: nitidez plena. **`careca.jpeg` e `familia.jpeg`: zero filtro** (ideia §IV/§VI — "nada para mediar entre a realidade e o olhar").

### 4.5 Textura de ambiente por era (`#ambient`, sem WebGL)

| Era | Ambiente | Técnica CSS/SVG |
|:--|:--|:--|
| 1 | Ruído analógico sutil, calor âmbar | `background` gradiente + `<svg>` `feTurbulence` em opacidade baixa (estático, barato) |
| 2 | Geometria nascente, ruído recua | grade fina via `linear-gradient` repetido, opacidade baixa |
| 3 | Estratificação/peso, azul-noturno | gradiente vertical denso; no Silêncio, dessatura tudo |
| 4 | Estável, blocos assentados | gradiente sólido + leve vinheta; blueprint SVG no Marco |
| 5 | Vazio — nenhuma textura | só `--page`; o respiro é o design |

> Nenhum efeito existe por si (manifesto III): se uma textura não ajuda a *sentir* a era, é cortada.

---

## 5. Beats especiais (direção cinematográfica, ideia §III)

### 5.1 Ato 1 — A Tela Escura (hero)
Manter `> boot sequence... 44 níveis carregados.` e o H1 (a ideia elogia esse instinto). Refinar a entrada do título: revelação gradual "sintonizando" (opacidade + leve blur→nítido), **não** animação agressiva. Sob reduce-motion, aparece pronto. CTA presente, mas sem ansiedade (manter discreto).

### 5.2 Silêncio Absoluto — Abril de 2004 (novo)
- `<section class="silence" aria-label="Abril de 2004">`: 100svh, conteúdo mínimo — uma data (`2004`), duas/três palavras (ex.: "Em abril, perdi meu pai."), muito vazio.
- Ao entrar no centro, `body.is-mourning` aplica `filter: grayscale(1)` ao `#ambient` e atenua acentos da interface (transição lenta). Ao sair, remove.
- **Sem trava de scroll.** O peso vem do vazio de 100svh, não de sequestro. `prefers-reduced-motion`: sem transição de dessaturação — só o texto sobre fundo neutro.
- Texto real, indexável. Nenhum símbolo, ícone ou metáfora visual (ideia §III Ato 4).

### 5.3 Marco do Arquiteto — o blueprint (ideia §IV Era 4)
- Manter `.marco` 100svh com a frase âncora *"Desenhar sistemas eu já fazia. Agora desenho a inteligência — e os times — que os operam."*
- Acrescentar `<svg class="blueprint" aria-hidden="true">` (linhas finas, planta esquemática) que **desenha-se** via `stroke-dashoffset` animado quando entra na viewport (classe `.is-drawn`). Decorativo; some sob reduce-motion (aparece estático e fraco). Não é imagem de texto — a frase é HTML real.

### 5.4 A foto careca — coragem (ideia §III Ato 6 / V)
- `careca.jpeg` centralizada, **sem filtro**, sem enquadramento dramático, espaço ao redor. Caption sóbria (ou nenhuma). É o beat 2017, não "hoje".
- A recuperação **emerge** (não explode): a Era 5 ganha luz e espaço gradualmente até a `familia.jpeg`.

### 5.5 Finale + KPI como intermezzo (ideia §V / Risco 6)
- `familia.jpeg` (2025) é a última imagem de peso, com o maior respiro do site.
- Depois dela, **divisor explícito** marcando a saída do modo narrativo: rótulo discreto tipo "— para recrutadores e líderes técnicos —" antes da `.closing#kpi`. O visitante emocional pode parar ali; quem precisa de dados continua. KPIs como texto hierarquizado (sem dashboard animado — ideia §VII).

---

## 6. A11y, SEO/AEO, performance — deltas vs. v2.2

### 6.1 Acessibilidade
- Ganhos: `alt`/captions humanos (C2), sem scroll-jacking (C5), menos movimento (sem partículas).
- Manter: skip link, `<h1>` única, foco visível nos 5 temas, `prefers-reduced-motion` (sem typewriter, sem blueprint animado, sem dessaturação animada, sem smooth-scroll), gate axe AA nos temas terminal (topo) e cloud (F4).
- Silêncio e Marco: `aria-label` claros; SVG `aria-hidden`.

### 6.2 Performance
- **Some** o bundle `three` (~code-split hoje, mas ainda baixado). Ambiente CSS/SVG custa ~0 runtime.
- Imagens: `loading="lazy"`, dimensões explícitas (já feito), preferir WebP/AVIF onde houver.
- Fontes: `display=swap` + `preconnect` (já).
- §7 inteira da v2 (Performance Budget WebGL) **descontinuada**.

### 6.3 SEO/AEO + ecossistema (regenerar)
- **Atualizar copy** que cita WebGL/Three.js/"rede neural holográfica": `meta description`, OG/Twitter, o bloco AEO e o JSON-LD (FAQ "A página funciona sem WebGL?" e o glossário "morphing semântico"). Origem: `scripts/seo/pages.mjs` (entrada da página) + rodar `scripts/seo/build-aeo.mjs` e `gen-og.mjs`.
  - Nova framing do diferencial: "estética que envelhece ao contrário — densidade analógica → respiro maduro", sem prometer 3D.
- Regerar o `.md` gêmeo (`public/terminal-evolutivo.md`) e o OG.
- `ecosystem.nav.yaml` e crosslinks (CV, life, life3d, catálogo): inalterados.
- Glossário JSON-LD: trocar "Morphing semântico" por termo fiel à v3 (ex.: "Envelhecimento reverso"). Manter "Scrollytelling" e "Progressive enhancement".

---

## 7. Plano de testes — deltas no gate (`tests/terminal-evolutivo.spec.js`)

| Teste atual | Ação v3 |
|:--|:--|
| `:115` `figcaption .img-meta` contém `SYS_RECORD` | **Substituir**: asserir `alt` humano (sem `SYS_RECORD`) e ausência de `.img-meta` |
| `:117-118` `gemeos` em era5, não era4 | **Manter** (gemeos segue na Era 5) |
| `:165` render sob demanda / 0 frames idle (WebGL) | **Remover** (não há WebGL) |
| a11y `:181` axe terminal+cloud | **Manter** (e revalidar contraste com paletas recalibradas §4.1) |
| estrutura `:44` 5 eras + marco + KPI | **Manter** + adicionar `.silence` presente |
| `data-scene`/canvas | **Remover** asserções de `data-scene`; `#ambient` decorativo `aria-hidden` |
| sem-JS `:204` | **Manter** (continua íntegro) |
| **Novos** | `.silence` existe e tem data 2004; `careca.jpeg` na Era 5 com `alt` "alopecia/2017"; `familia.jpeg` é a última `<figure>`; divisor de KPI presente; `body` **não** carrega `three` (sem `<canvas id="bg-webgl">`) |

Atualizar também `tests/aeo.spec.js` se ele fixar strings de WebGL (verificar no passo M5).

---

## 8. Plano de entrega (milestones — incremental e econômico)

> Ordem: conteúdo correto e acessível primeiro; estética depois; integração por último. Cada passo é verificável; o gate roda no fim.

**M1 · Conteúdo e correções factuais (maior valor, menor risco)**
- Reposicionar `programa.jpg` (→Era 3) e `eldorado.jpg` (→Era 2); reenquadrar `careca.jpeg` (2017) e `familia.jpeg` (finale).
- Remover `[SYS_RECORD]`/`.img-meta`; aplicar `alt`/captions humanos (§3.3).
- Acrescentar a `<section class="silence">` (abril/2004) e o divisor de intermezzo do KPI.
- Enriquecer copy: discada literal (callcenter iG/OSite), bodies Ctrl+C/Ctrl+V, mãe na formatura, eixos Carga/Ressonância.
- **Critério**: página correta e legível **sem CSS/JS/WebGL**; nenhuma menção a "Data Record".

**M2 · Remover o WebGL**
- Deletar `src/js/te-scene.js`; remover de `terminal-evolutivo.js` tudo de Three/câmera/render/context-loss; trocar `#bg-webgl` por `#ambient`.
- Remover `three` de `package.json` (rodar build para confirmar tree-shake/limpeza).
- **Critério**: build Vite verde sem `three`; página idêntica em conteúdo; fundo = `--page` sólido.

**M3 · Estética v3 (CSS/SVG)**
- Recalibrar paletas `.theme-*` (§4.1); respiro `data-density` (§4.2); tipografia por era (§4.3); filtros fotográficos (§4.4); texturas `#ambient` (§4.5); blueprint SVG do Marco (§5.3); revelação "sintonizando" do hero (§5.1); dessaturação do Silêncio (§5.2).
- Typewriter pontual (≤2) reusando o padrão acessível.
- **Critério**: envelhecimento reverso perceptível (Era 1 densa → Era 5 espaçosa); contraste AA nos 5 temas; reduce-motion neutraliza animações.

**M4 · SEO/AEO + ecossistema**
- Atualizar `scripts/seo/pages.mjs`; rodar `build-aeo.mjs` + `gen-og.mjs`; regenerar `.md` gêmeo; revisar JSON-LD (sem WebGL).
- **Critério**: `tests/aeo.spec.js` verde; sem strings de WebGL/Three na página.

**M5 · Testes + gate verde**
- Aplicar deltas da §7; revalidar axe; mobile sem scroll horizontal; sem-JS íntegro.
- **Critério**: gate completo verde (contagem ajustada).

```
M1 ──► M2 ──► M3 ──► M4 ──► M5
conteúdo  -WebGL  estética  SEO   gate
   └ M1 sozinho já corrige os erros factuais (entregável independente).
```

> **Entregável mínimo viável**: M1 isolado já corrige os bugs de conteúdo (fotos trocadas, careca reenquadrada, captions humanas) — pode ir sozinho se o dono quiser validar a direção antes da remoção do 3D.

---

## 9. Decisões em aberto para o dono

1. **WebGL**: remover (recomendado, §1) **vs.** manter com suavização (§1.3)? Esta SDD assume remoção.
2. **`infancia.png`**: incluir pequena/subordinada na Era 1 **vs.** omitir (risco de kitsch, ideia Risco 7)? Assumido: incluir com `alt` honesto.
3. **Lenis (smooth-scroll com peso)**: ligar para reforçar "o tempo tem peso" (ideia §II.V) **vs.** scroll nativo? Assumido: ligar, desligado em reduce-motion.
4. **Estado pré-JS**: `theme-terminal` (boot) como inicial — mantido.
5. **Silêncio 2004**: profundidade do texto (só "2004" + 3 palavras **vs.** uma frase). Assumido: data + frase curta.

---

## 10. Referências

- Direção criativa: [`docs/references/ideia_v3_semantica_humana.md`](../../../references/ideia_v3_semantica_humana.md)
- SDD anterior (base técnica a11y/SEO): [`00_SDD_terminal_evolutivo.md`](./00_SDD_terminal_evolutivo.md)
- Narrativa: [`docs/references/jornada.txt`](../../../references/jornada.txt)
- Página: [`src/terminal-evolutivo.html`](../../../../src/terminal-evolutivo.html) · JS: [`src/js/terminal-evolutivo.js`](../../../../src/js/terminal-evolutivo.js)
- SEO: `scripts/seo/{pages,build-aeo,gen-og}.mjs` · Testes: [`tests/terminal-evolutivo.spec.js`](../../../../tests/terminal-evolutivo.spec.js)
- Padrões da casa: `ARCHITECTURE.md` · `STYLE_GUIDE.md` · `TESTING_GUIDE.md` · `SEO_ANALYTICS.md`

---

**Conformidade SDD (v3.0)**: ✅ revisão crítica da ideia (conflitos C1–C9 decididos) · ✅ decisão estratégica justificada (substituir motor, manter chassi) · ✅ arquitetura CSS-first · ✅ correções factuais de fotos/voz · ✅ envelhecimento reverso (paleta/respiro/tipografia) · ✅ beats (Silêncio 2004, Marco/blueprint, careca, finale, KPI intermezzo) · ✅ deltas de a11y/SEO/perf · ✅ deltas de teste · ✅ milestones M1–M5. **Nenhum código de produção foi escrito** — este documento o especifica.
