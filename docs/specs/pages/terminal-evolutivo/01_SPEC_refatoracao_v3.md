# SPEC — Terminal Evolutivo v3.0 (Refatoração: narrativa madura + WebGL semântico)

**Versão**: 3.0 (refatoração da v2.1 publicada)
**Data**: 2026-06-23
**Status**: ✅ IMPLEMENTADO e publicado na main (commit 487a531) — R1–R5 concluídos
**Decisão de base**: [ADR-te-001](../../../decisions/ADR-te-001-refatoracao-narrativa-e-3d-semantico.md)
**SDD de base**: [00_SDD_terminal_evolutivo.md](00_SDD_terminal_evolutivo.md) (v2.1)

> **Princípio da refatoração:** reaproveitar **100%** da estrutura atual. NÃO mexer na arquitetura híbrida (canvas `#bg-webgl` + foreground), nas 5 fases/IDs (`#era1..#era5`, `#marco`), na integração AEO/eco-nav, na a11y nem no fallback. Mudam **(1) o texto** das fases adultas, **(2) o conteúdo das cenas 3D** (de "pontos que mudam de cor" para formas literais) e **(3) três refinamentos técnicos**.

---

## 1. Objetivos e invariantes

| Muda (v3.0) | Mantém intocado |
|:--|:--|
| Copy das Fases 2–5 + Marco (tom maduro, anti-herói, sem anime adulto) | Esqueleto HTML semântico, IDs de seção e âncoras |
| Conteúdo das 5 cenas WebGL → formas semânticas que morfam | Arquitetura híbrida (body cor sólida + canvas z-index:-1) |
| `theme-color` dinâmico por fase | 5 temas CSS, scrim AA-safe, `onEnter/onEnterBack` |
| Geometria 3D (pontos + **linhas** + **cubos instanciados** + blueprint) | AEO (pages.mjs/build-aeo/OG/.md), eco-nav, catálogo |
| Testes (narrativa + theme-color) | Fallback `no-webgl`, reduced-motion, render sob demanda |

**Invariante inegociável:** sem WebGL/JS ou sob `prefers-reduced-motion`, conteúdo 100% legível e indexável.

> **Hierarquia editorial (v3 — prioriza toda a página):** **a transição dos fatos de vida é o protagonista**; o **trabalho é background** — conectado, mas não o destaque. O currículo ([`index.html`](../../../../src/index.html)) já carrega a profundidade técnica e os casos STAR completos. Aqui, cada fase é conduzida pelo **arco humano** (espectador → operador → arquiteto → mentor), e a carreira entra como **evidência de apoio**: compacta, subordinada à narrativa, com a profundidade remetida ao currículo. Isso **qualifica** a decisão da v2.2 de destacar o STAR inline (ver §2.3).

---

## 2. Pilar 1 — Refatoração narrativa

### 2.1 Regras de reescrita

1. **Desapego pop (a partir da F3).** Mantém **Jaspion/Changeman** (F1) e **Pentium/Doom/TIE Fighter** (F2). **Remove** *Naruto* (F3), *One Piece* (F3, casamento) e *Bleach* (F4). Remover também *Dragon Ball/Zillion* nominalmente da F2 — manter a ideia de "próximo nível" via jogos, sem citar anime.
2. **Honrar a trincheira (F3/F4).** Tornar visíveis os 14 anos de Java corporativo: Sysgen (J2EE/MVC/UML/MDA), Telefônica (EJB/JBoss/Oracle), Indra (seguros legado: JBoss Seam/Spring/RichFaces/Oracle PL/SQL + inovação mobile/AWS). Citar a realidade: bug em produção de madrugada, legado pesado, resiliência forjada no fogo.
3. **Corrigir a cronologia do arquiteto.** A semente é **2003** (MDA/UML na Sysgen), não 2020. Reposicionar o Marco: o arquiteto já existia; o que mudou na fase de IA foi a **escala** (Cloud/SRE) e o **papel** (orquestrar/mentorar).
4. **Viabilizador de times, não herói solo.** Creditar pares, líderes e times formados; conectar "proteção/compromisso" a estabilidade de ecossistemas e formação de gente (coerente com Business Agility/Scrum/Agile Coach).
5. **Desidratar o tom.** Frases curtas, diretas, escaneáveis. Cortar prosa densa ("a virada do milênio não foi apenas simbólica — foi estrutural").
6. **Preservar o calor nas entrelinhas.** Desidratar ≠ esfriar. Manter a emoção em subtexto (a paixão que aparece no vídeo do YouTube), sobretudo nos fechamentos de fase, nas pontes humanas (ex.: 2009) e no Marco — sem virar relatório de LinkedIn.
7. **Evitar o "whiplash" técnico↔pessoal.** Toda transição de assunto frio (legado/PL/SQL) para quente (família) precisa de uma frase-ponte que conecte os dois mundos (ver F3).
8. **Vida em primeiro plano; trabalho como background.** Cada passagem é conduzida pelo **fato de vida**; a carreira entra como **contexto de apoio** (1–2 frases, o essencial), nunca como o foco. A profundidade técnica vive no currículo, não aqui (ver Hierarquia editorial, §1, e §2.3).

### 2.2 Reescrita fase a fase (copy pronta para colar)

> Substituir o conteúdo dos blocos `.passage` das seções correspondentes em `src/terminal-evolutivo.html`. Mantêm-se títulos/eyebrows/IDs; muda o texto.

**F1 · `#era1` (1982–1994) — mantém o gancho, só enxuga**
> Nasci em 1982, num Brasil analógico: TV de tubo, antena ajustada na mão e os heróis japoneses — Jaspion, Changeman. Deles veio, sem que eu percebesse, um modelo mental que carrego até hoje: evolução é contínua, disciplina é silenciosa e **ninguém vence sozinho**. Enquanto os outros assistiam, eu absorvia. Era um espectador — por enquanto.

**F2 · `#era2` (1995–1999) — jogos + trabalho/estudo concomitantes**
> Aos poucos, a tela deixou de ser só para assistir. Um **Pentium 100 MHz** com CD-ROM trouxe Doom, TIE Fighter e Full Throttle — e a diferença que mudou tudo: o computador **respondia**. Eu não consumia mais; eu operava. O **curso técnico em Processamento de Dados** (Colégio Guarani, 1997–1999) deu nome ao vício: lógica, algoritmo, a máquina obedecendo. E, **em paralelo ao colégio técnico**, veio o primeiro emprego — **auditor no Shopping Eldorado**. Estudar e trabalhar ao mesmo tempo começou cedo; nunca mais parou. De espectador a **operador**.

**F3 · `#era3` (2000–2009) — a trincheira: trabalho de dia, estudo de noite, e a perda que forçou o amadurecimento**
> A virada do milênio foi de trabalho braçal e estudo. Em **2000**, cursinho no Etapa (unidade São Joaquim) para entrar no **Mackenzie em 2001** (Sistemas de Informação). Mas a faculdade era à noite — porque o dia era de trabalho: **call center (2000–2003)**, onde aprendi a ouvir o usuário antes de servi-lo com código, e depois a **Sysgen (2003–2005)**. Trabalhar de dia e estudar de madrugada cobrou seu preço: acumulei **dependências** em matérias, recuperadas **sacrificando as férias**, ano após ano.
>
> Em **abril de 2004**, perdi meu pai. Filho único, amadureci de uma vez: aprendi a dirigir, vendi o carro dele e comprei o meu primeiro com o salário daquela época. A vida não esperou eu ficar pronto.
>
> Na **Sysgen**, Java J2EE, MVC e — já em 2003 — modelagem **UML com geração de código por MDA**: a primeira vez que tratei o **modelo como fonte da verdade**. A semente do arquiteto nasceu ali, não em 2020. Na **Telefônica**, EJB, JBoss e Oracle, e as primeiras equipes sob minha responsabilidade — legado pesado, bug em produção, resiliência forjada no fogo. E foi nesse meio, em **2009**, que conheci minha esposa.

**F4 · `#era4` (2010–2019) — o legado: sacrifício e o batismo de fogo**
> Casar custou caro — literalmente. Fiquei **sem férias em 2009 e 2010** e, em **2011**, vendi férias e bônus para pagar a festa; a lua de mel foram **5 dias**. Prioridade é o que se faz, não o que se diz.
>
> Com a chegada da **filha (2012)**, troquei conforto por estabilidade: fui para a **Indra em fevereiro de 2012**. O batismo de fogo veio em **julho** — uma janela de implantação de **107 horas trabalhadas em 7 dias**. Foi ali que juntei as três frentes que me formaram arquiteto: **sustentação** (manter o crítico de pé), **inovação móvel** (AWS, microsserviços, Android/Ionic) e **arquitetura junto ao time comercial** (entender o negócio, não só o código).
>
> Proteger deixou de ser sentimento e virou prática diária: **estabilidade de ecossistemas e formação de gente**. O alicerce profissional e o familiar cresceram juntos.

*(A ponte `.bridge` e os 4 cards STAR da F4 — Transição de Sustentação 2018, AFVC 2019, −R$3MM 2020, Core Rede/Splunk 2020 — permanecem como na v2.1.)*

**Marco · `#marco` — reescrever a citação e o subtítulo para corrigir a cronologia**
- `.marco__quote` (uma frase, grande):
  > Desenhar sistemas eu já fazia. Agora desenho a inteligência — e os times — que os operam.
- `.marco__sub`:
  > O arquiteto foi forjado no legado dos anos 2000 (UML, MDA, arquitetura de soluções). O que mudou na virada para a IA não foi a natureza do trabalho — foi a **escala** (cloud, SRE) e o **papel**: de resolver sozinho a **orquestrar e mentorar**.

**F5 · `#era5` (2020–2026) + fechamento — a maturidade forjada na turbulência**
> Em **2016**, a surpresa em dobro: os **gêmeos**. E, em **janeiro de 2017**, a vida cobrou tudo de uma vez — minha esposa internada, o estresse acumulado de anos e uma **alopecia** que me deixou careca por um ano. Foi o fundo do poço que me ensinou sobre limite, e sobre pedir ajuda.
>
> A reação foi por etapas. Saí da Indra e passei pela **Serasa (dez/2017–jan/2018)**, uma imersão em **agilidade acelerada** (API corporativa de **OAuth 2**). Tinha proposta da **Rede**, mas adiei a saída até **concluir o mega projeto** sob minha responsabilidade — porque entregar o que se promete também é arquitetura. Em **2019**, financiei e **reestruturei a casa**: demoli 65% para otimizar a planta — a mesma mentalidade de refatorar um sistema, aplicada a tijolo.
>
> Daí em diante, a régua mudou: não é crescer rápido, é crescer **com precisão e em escala**. Cloud, SRE e observabilidade viraram linguagem; o foco migrou do código para a **orquestração** — IA agêntica, automação e formar quem entrega. Os resultados vêm de **time**: Agrupamento Comercial de 10 dias para tempo real (2024), Pipe Automática com +15% nas metas (2025), e as certificações de 2025 em IA agêntica (AI Agentic Design Patterns, LangGraph, Knowledge Graphs) consolidando a virada.
>
> Hoje o alicerce é coletivo. Minha esposa cresceu de **analista a empresária**; sogros, cunhados, sobrinhos e primos são rede de apoio real. Eu deixei de ser quem resolve sozinho e passei a ser quem **habilita o time**. De operador a arquiteto a mentor.

### 2.3 Casos STAR como *background* (evidência de apoio, não destaque)

Coerente com a **Hierarquia editorial (§1)**, o trabalho é **subordinado** à narrativa de vida. Isto **ajusta a v2.2** (que elevara o caso principal a card inline): cada fase mantém **um único resultado-âncora** — o número (−R$3MM, +15%, 10d→tempo real) — como uma linha de evidência **ao lado** do fato de vida; o **detalhe STAR completo** (S/T/A/R) fica **compacto/colapsado** e remete ao currículo ([`index.html`](../../../../src/index.html)). A seção "Em números" vira um **fecho enxuto**, não um bloco pesado. Sem grade densa de cards competindo com a história — o valor não some (há o número-âncora + o link do CV), mas não rouba o protagonismo.

> Tensão reconhecida: a v2.2 trouxe o STAR para inline por causa de uma crítica anterior ("ocultação de valor"). Aqui o dono **reprioriza** — como o CV existe, o valor técnico pode ser mais leve nesta página. As duas leituras são válidas; **para o Terminal Evolutivo vence a vida-em-primeiro-plano**.

Mantido: **−R$3MM** e **Core Rede/Splunk** na **F4** (consolidação); **F5** fica limpa — Agrupamento (2024), Pipe Automática (2025) e o bloco de **certificações IA 2025**. Atualizar, se necessário, o `tldr`/`mdSections` em `scripts/seo/pages.mjs` para refletir o novo tom (sem anime; com trincheira) e reexecutar `build-aeo.mjs terminal-evolutivo` + o `.md` companion.

> **Nota de coerência (Rede entre F4 e F5).** Com os novos fatos, a *chegada* à Rede (2018) é narrada na **F5** (ponte 2017–2019: crise → Serasa → decisão ética → Rede). Já os **casos STAR da Rede** (Transição 2018, AFVC 2019, −R$3MM 2020, Core Rede 2020) seguem na **F4** como bloco temático de "casos de sucesso" — a ponte `.bridge` os introduz de forma genérica ("aplicar em escala corporativa"), sem nomear a Rede, então não há contradição visível. **Decisão do dono:** se preferir cronologia estrita, mover Transição/AFVC para a F5 ou abrir a F4 com uma linha citando a entrada na Rede.

**Honestidade sobre IA (lacuna F5).** Pelas fontes (`llms-full.txt`), os casos de 2024/2025 usaram **inteligência determinística** — regras, priorização em lote, validações —, **não agentes LLM**. A `Ação` do STAR da Pipe Automática já diz "processando a inteligência de priorização na própria Salesforce com batches agendados", coerente com o princípio *determinístico-primeiro* das páginas de Engenharia de IA. Portanto a narrativa posiciona a IA agêntica como **direção intencional atual**, ancorada em 20 anos de arquitetura — **sem alegar uso de LLM onde não houve**. ⚠️ **Decisão do dono:** se algum projeto recente de fato empregou IA/agentes, avisar para fortalecer a `Ação` do STAR correspondente (e a copy da F5) com o caso concreto.

---

## 3. Pilar 2 — Direção de arte semântica (WebGL)

O sistema de partículas deixa de "só mudar de cor": **morfa em formas literais**. Cada fase tem uma forma-alvo que traduz o texto.

| Fase | Forma literal | Geometria Three.js | Movimento |
|:--|:--|:--|:--|
| **F1 · CRT** (1982–94) | Grade rígida 2D de pixels de fósforo (TV de tubo) | `Points` em grade no plano z≈0 + leve jitter de scanline | Linear, quase estático (espectador) |
| **F2 · Wireframe** (95–99) | Wireframes 3D vertiginosos (Matrix / polígonos do Doom) | `Points` em poliedro/lattice **+ `LineSegments`** das arestas | Grupo rotaciona (operador interage) |
| **F3 · Nodes** (00–09) | Rede de **nós + links** que acendem/piscam (web + conexões) | `Points` em hubs **+ `LineSegments`** entre hubs, com pulso | Expansão; pulsos viajam pelas arestas |
| **F4 · Blocks** (10–19) | **Blocos sólidos** que se encaixam (microsserviços + fundação) | `InstancedMesh` de cubos (lit) crossfade com os pontos | Nós colidem/fundem; encaixe ordenado |
| **Marco** | **Blueprint** luminoso (planta arquitetural) | Arestas dos cubos (`EdgesGeometry`/linhas) + grade-plano | Alinhamento; brilho de "planta" |
| **F5 · Neural** (20–26) | **Rede neural viva** em metamorfose (fios de energia) | `Points` em camadas + `LineSegments` fluidas + bloom | Fluxo orgânico contínuo (sutil) |

### 3.1 Como evoluir o `te-scene.js` (reaproveitando o atual)

O `te-scene.js` v2 já tem **um sistema de pontos com 5 estados-alvo** e `setProgress(p)` que interpola (lerp) entre estados vizinhos. A v3 acrescenta **estrutura** e mantém o mesmo motor de morph:

1. **Estados literais (não nuvens aleatórias).** Reescrever os geradores de estado:
   - `crt`: grade regular no plano (não nuvem dispersa).
   - `wire`: vértices de um poliedro/lattice **com lista de arestas** (pares de índices).
   - `nodes`: ~12–16 hubs + índices de links entre hubs.
   - `blocks`: posições de uma grade 3D de cubos (já existe; reusar como instâncias).
   - `neural`: camadas (planos) + links esparsos entre camadas adjacentes.
   > ⚠️ **Contagem de vértices FIXA (obrigatório p/ o lerp).** Para interpolar posições entre dois estados num **único** `BufferGeometry`, todos os estados precisam do **mesmo N de vértices**. Definir um N alto fixo (ex.: **2048**) e fazer **todo** gerador de estado retornar 2048 posições/cores/alpha. Em fases que "usam" menos pontos, **estacionar o excedente** — colapsar no centro de um nó/hub **e/ou** `alpha=0` — nunca deixá-los em coordenadas antigas/aleatórias, senão o morph espalha pontos pela tela.
2. **Camada de linhas (`LineSegments`).** Um segundo buffer de posições derivado dos pontos (via listas de arestas por estado) que **morfa junto** e tem **força (opacidade) por fase**: ~0 na F1, alta na F2/F3, baixa na F4, média/fluida na F5. Implementar como um único `LineSegments` cujas posições são reescritas no `setProgress`.
   > ⚠️ **Buffer de capacidade fixa (gotcha WebGL).** Não se redimensiona `BufferAttribute` de forma barata em runtime. Alocar **uma vez, com a capacidade MÁXIMA de arestas entre todas as fases**: `maxEdges = max(arestas por fase)` → `new Float32Array(maxEdges * 2 * 3)`. Nas fases que usam menos arestas, **esconder o excedente** com **linhas degeneradas** (os dois vértices do segmento na mesma coordenada → comprimento zero, não rasteriza) e/ou `alpha = 0` no shader; opcionalmente, `geometry.setDrawRange(0, segmentosAtivos*2)` limita o que é desenhado por fase. O `setProgress` apenas reescreve posições/alphas **dentro** dessa capacidade fixa — nunca realoca. O mesmo princípio vale para os `Points`: manter **N fixo** e variar só posição/cor/alpha entre as densidades de cada fase.
3. **Camada de cubos (`InstancedMesh`).** Para a F4 (blocos maciços), um `InstancedMesh` de cubos posicionado no estado `blocks`, com **escala dirigida pelo progresso**: cresce de 0→cheio ao entrar na F4 e encolhe ao sair (crossfade com os pontos), evitando recriar cena. Luz simples (`HemisphereLight` + `DirectionalLight`).
4. **Blueprint (Marco) — transição de MATERIAL, não um 6º estado de pontos.** O `#marco` **não é uma Era**: é uma ponte entre F4 (blocos) e F5 (neural). Tratá-lo como uma **banda de progresso** global (ex.: ~`0.70`–`0.80`, **calibrada aos offsets reais das seções**, não assumida). Nessa banda, o `InstancedMesh` da F4 recebe um **override de material** (wireframe / emissivo / `EdgesGeometry`) + grid-plano sutil = a "planta luminosa"; só depois os cubos se dissolvem no sistema de pontos (neural F5). **Implicação para `setProgress(p)`:** ele gerencia **dois tipos de estado** — (a) morph de posição/cor/alpha de pontos e linhas; **(b) estado de material da F4** (sólido → wireframe/emissivo na banda do marco → fade-out). O blueprint **não** é representável só movendo pontos.
   > ⚠️ **Wireframe nítido (shader).** A "planta" do Marco deve usar `ShaderMaterial` com um `uniform float uBlueprintTransition` (0→1) e desenhar as arestas por **coordenadas baricêntricas + `fwidth()`** (espessura de linha **independente de resolução/distância**). Evitar `wireframe:true` cru ou textura de grid — ambos **borram/pixelam** conforme a câmera se afasta.
5. **Bloom só na F5.** `UnrealBloomPass` ativado apenas perto da fase neural (e desligado em mobile/low-end).

> **Mapa de progresso (calibrar, não assumir).** As 5 fases + o `#marco` **não** ocupam frações iguais do scroll (o marco em `100svh` adiciona altura). Derivar as bandas dos **offsets reais** das seções — alimentar o `setProgress` global a partir de `ScrollTrigger`s por seção (cada um normaliza seu próprio trecho) **ou** posicionar os keyframes da timeline-mestra nas posições reais. Evitar o pitfall de assumir, p.ex., "blocos = 0.75".

### 3.2 Performance budget revisado (acréscimo sobre o §7 do SDD)

- **Linhas:** 1 `LineSegments` (≤ ~2–4k segmentos) reusando posições dos pontos — barato.
- **Cubos:** 1 `InstancedMesh` (≤ ~512 instâncias) — 1 draw call.
- **Tiers:** `high` = pontos + linhas + cubos + bloom; `low` (mobile/low-mem) = **só pontos** (sem linhas/cubos/bloom), morph mantido.
- Manter: `dpr` cap (≤2), **render sob demanda** (idle = 0 frames), `dispose()`/`rebuild()` (context loss), reduced-motion = 1 frame estático por fase.
- Meta de bundle: o 3D continua **code-split**; novas geometrias não trazem dependências novas (tudo em `three`).

### 3.3 Tratamento das fotos como "Data Records" (não "álbum de família")

**Problema.** Em `life.html` as fotos são recompensas emocionais (surgem gigantes, translúcidas — pegada de jogo). No Terminal Evolutivo, que é um **portfólio executivo** sobre fundo WebGL, jogar as fotos cruas (coloridas, estética de álbum) no meio do texto causa **choque estético** (parece blog pessoal dentro de um terminal). Solução: as fotos viram **registros visuais recuperados pelo sistema** que "envelhecem" junto com a página — **via CSS, sem editar imagem**.

**(a) Filtro por era (reusa as classes de tema já existentes).**
```css
/* F1 — monitor de fósforo (verde/âmbar) */
.theme-terminal figure img { filter: grayscale(1) sepia(1) hue-rotate(60deg) contrast(1.4) brightness(.9); opacity: .85; }
/* F2/F3 — digital antigo: pálido, contrastado */
.theme-wire figure img, .theme-net figure img { filter: contrast(1.2) saturate(.6); }
/* F4/F5 — presente: cor plena + elevação elegante (F4 agora é DARK premium) */
.theme-cloud figure img, .theme-ai figure img { filter: none; box-shadow: 0 8px 30px rgba(0,0,0,.4); }
@media (prefers-reduced-motion: reduce) { /* filtros são estáticos — nada a desligar */ }
```

> ⚠️ **Correção de engenharia (vs. a crítica):** **não usar `mix-blend-mode: hard-light`** nas imagens para "fundir" com a cena 3D. O `<canvas>` está num **stacking context separado** (`z-index:-1`, atrás do `body`), então o blend não acontece contra os pixels do WebGL — produz resultado imprevisível/sujo. Para o look "monitor CRT", usar `filter` + **overlay de scanline** no próprio `figure` (`figure::after` com `repeating-linear-gradient`), que é determinístico e barato. Manter `filter` como o mecanismo principal.

**(b) Legenda como log de terminal (metadado).** Trocar legendas "fofas" por metadados, conectando a foto ao tema Tech Lead — **sem sacrificar a11y**:
```html
<figure>
  <img src="/fotos/callcenter.jpg" alt="Maurício de headset no call center, início dos anos 2000" loading="lazy" decoding="async">
  <figcaption>
    <span class="img-meta">[SYS_RECORD: 2002_SUPORTE.JPG]</span>
    <span>A trincheira: onde aprendi a ouvir o usuário.</span>
  </figcaption>
</figure>
```
- `alt` permanece **descritivo** (leitor de tela) — o `[SYS_RECORD:…]` é floreio visual, nunca o único texto.
- `.img-meta` usa `--dim` em `font-mono` pequena; **validar contraste AA** por tema (o `--dim` atual já passa).

**(c) Curadoria por fase (cronologia atualizada com os novos fatos biográficos).** 1–3 fotos por era (sem empilhar); dropa apenas `infancia.png`:

| Fase | Foto(s) | Tratamento | Observação |
|:--|:--|:--|:--|
| F1 (infância) | `1982.jpeg` (recorte **1:1**) | filtro verde + scanline | dropar `infancia.png` (colagem larga demais) |
| F2 (adolescência) | `programa.jpg` + `eldorado.jpg` | pálido/contrastado | estágio de **auditor no Eldorado concomitante** ao técnico (Guarani, 1997–99) |
| F3 (trincheira) | `callcenter.jpg` + `formatura.jpg` (`.photo-row`) | pálido | call center (2000–2003) + formatura Mackenzie (2005); **o texto da F3 agora apoia a foto de suporte** (conflito resolvido) |
| F4 (legado) | `casamento.jpg` (2011) + `filha.jpeg` (2012) | cor plena + sombra | os motores da mudança de carreira (estabilidade → Indra) |
| F5 (maturidade) | `gemeos.jpeg` (2016) + `familia.jpeg` + `careca.jpeg` | cor plena + leve glow | `gemeos.jpeg` **abre a F5** (sincronia com a copy — o texto dos gêmeos está na F5); eixo familiar completo; `careca.jpeg` conecta à superação da alopecia (2017) |

> **Cronologia corrigida (novos fatos):** `eldorado.jpg` → **F2** (estágio concomitante ao técnico — não é dos anos 2000); `callcenter.jpg` → **F3** (2000–2003, agora citado no texto — conflito resolvido); `casamento.jpg` → **F4** (festa em **2011**, não 2009); `filha` → **F4**; **`gemeos` → F5** (a foto acompanha o texto dos gêmeos, que **abre a F5** — sincronia foto×texto); `familia`/`careca` → **F5** (presente).

**(d) Performance/a11y.** Filtros CSS em imagens `loading="lazy"` com `aspect-ratio` fixo são baratos; **não animar** `filter` (custo de paint). Manter dimensões/`decoding="async"`. Sob `no-webgl`/sem-JS, os filtros continuam (são CSS puro) — coerente com o fallback.

> **Status:** parte do **Pilar 2 da v3.0** (direção de arte). Pode ser implementado junto do R1 (é HTML/CSS de foreground, sem depender do 3D semântico).

---

## 4. Pilar 3 — Refinamentos técnicos

1. **`theme-color` dinâmico por fase.** No `setTheme(section)` do orquestrador, atualizar a `<meta name="theme-color">` com a cor `--page` da fase, para a barra do navegador móvel acompanhar:
   ```js
   const THEME_COLORS = {
     terminal: '#070803', wire: '#03100b', net: '#070f1d',
     cloud: '#0e141d', ai: '#080a10', // F4 = Dark Mode Premium (v2.2)
   };
   // dentro de setTheme:
   let meta = document.querySelector('meta[name="theme-color"]');
   if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
   meta.setAttribute('content', THEME_COLORS[section.dataset.theme]);
   ```
   > Obs.: o injetor AEO insere uma `theme-color` fixa (`#0d1117`). O JS a sobrescreve em runtime, por fase — **incluindo a F4, que também é escura** ("Dark Mode Premium", `#0e141d`, desde a v2.2). A barra do navegador fica escura em **toda** a jornada; sem conflito com o build AEO.
2. **Contraste (todas as fases — não há mais tema claro).** A F4 virou Dark Mode Premium na v2.2; o botão primário voltou a usar texto escuro sobre accent claro (regra única, sem override de tema). Revalidar AA dos tokens da F4 dark (`--text:#c6d3e6` / `--page:#0e141d`; `--accent:#4f93e0`) e dos demais temas após qualquer ajuste de cor de link/realce introduzido pela cena.
3. **`onEnter`/`onEnterBack`.** Já implementado na v2.1 (sem flicker em scroll curto). Manter; o `theme-color` entra no mesmo callback.
4. **`data-era` + timeline calibrados ao conteúdo reescrito (entra COM o R1, não antes).** A copy v3 desloca os marcos; os metadados de seção precisam refletir o início real de cada texto (indicador de progresso + AEO/SEO). Ajustar no HTML **junto com a nova copy** — fazê-lo antes desincronizaria a página v2.2 ainda no ar. Valores:
   - `#era4` → `data-era="2010-2015"` (expansão inicial da família + consolidação na Indra).
   - `#era5` **e** `#marco` → `data-era="2016-2026"` (gêmeos → turbulência 2017 → Serasa/Rede → casa 2019 → IA).
   - Atualizar os `data-jump` da `.timeline` para **casar exatamente** com esses valores (o `syncTimeline` compara `data-jump === dataset.era`; se divergirem, o `aria-current` quebra) e o rótulo do último marco de **2020 → 2016**.

---

## 5. Plano de execução (milestones de refatoração)

> Construção incremental; cada passo verificável. Foreground/narrativa primeiro (sem risco de a11y), 3D depois.

> **R1 · Narrativa + fotos + trabalho como background.** Substituir a copy das Fases 2–5 e do Marco em `terminal-evolutivo.html` (§2.2). Aplicar o tratamento das fotos (§3.3): filtros CSS por era, legendas-log, curadoria por fase. **Rebaixar os casos STAR a evidência de apoio (§2.3):** um número-âncora por fase + detalhe compacto/colapsado + link ao currículo; "Em números" como fecho enxuto (sem card-grid dominante). Atualizar `tldr`/`mdSections` em `pages.mjs` se o tom mudar; rodar `build-aeo.mjs terminal-evolutivo` (+`.md`). **Critério:** sem anime nas Fases 3–5; presença de Sysgen/Indra/MDA/OAuth; Marco cita os anos 2000; fotos com filtro por era e legenda `[SYS_RECORD:…]`; **a narrativa de vida lidera e o trabalho não domina visualmente**.

> **R2 · Cena semântica (`te-scene.js`).** Reescrever os 5 estados como formas literais (§3.1); adicionar `LineSegments` (força por fase) e `InstancedMesh` de cubos (escala por progresso); blueprint no Marco; bloom só na F5. **Critério:** ao variar `setProgress(0→1)`, vê-se grade CRT → wireframe → nós/links → blocos → neural; `dispose()` limpo; sem leak.

> **R3 · Orquestrador.** `theme-color` dinâmico no `setTheme`; tiers `high`/`low`; manter render sob demanda, reduced-motion e `no-webgl`. **Critério:** barra móvel muda por fase; mobile cai para tier `low` (só pontos) sem travar.

> **R4 · a11y + performance.** Revalidar contraste AA (5 temas), fps (60 desktop / ≥30 mobile), fallback. Atualizar/῾criar testes (§6). **Critério:** axe sem violações; idle = 0 frames; sem-WebGL e sem-JS íntegros.

> **R5 · Gate + publicação.** `node scripts/quality-gate.mjs` verde (build + Playwright/axe, 3 navegadores; flakes de carga absorvidos por `retries`). Commit + push na main.

### 5.1 Ordem
```
R1 (texto/AEO) ─> R2 (cena 3D) ─> R3 (orquestrador) ─> R4 (a11y/perf) ─> R5 (gate+push)
   └ R1 entrega valor sozinho (já corrige as críticas de conteúdo, sem tocar no 3D).
```

---

## 6. Critérios de aceite / testes novos (em `tests/terminal-evolutivo.spec.js`)

- **Narrativa madura:** o corpo das Fases 3–5 **não contém** `/Naruto|One Piece|Bleach|Dragon Ball|Zillion/`; **contém** `Sysgen`, `Indra`, `MDA` e `OAuth`; o `#marco` cita `2000` (ou "anos 2000").
- **Cronologia:** `#era3` contém "2003" e "semente do arquiteto"; `#marco__sub` contém "escala" e "orquestrar".
- **`theme-color`:** ao rolar até `#era4`, `meta[name=theme-color]` = `#0e141d` (F4 dark premium); ao rolar até `#era5`, `#080a10`.
- **Mantidos (v2.1):** 5 eras + marco + KPI; STAR colapsado (título+ganho); reveal das passagens; idle = 0 frames; axe (tema escuro e claro); sem-JS íntegro.

> O conteúdo do 3D (formas) não é testável por DOM; cobre-se indiretamente por: `theme-color` correto, ausência de erro de console no `goto`, e o teste de fallback (`no-webgl`).

---

## 7. Riscos

| # | Risco | Mitigação |
|:--|:--|:--|
| RV1 | Cena 3D mais rica (linhas+cubos+bloom) cai fps em mobile | Tier `low` (só pontos), `dpr` cap, bloom só F5, render sob demanda |
| RV2 | Morph de linhas/cubos cross-browser (webkit/firefox) instável | `try/catch` em `createScene`; fallback `no-webgl`; testar nos 3 navegadores |
| RV3 | `theme-color` claro (F4) "pisca" na transição | Atualizar no `onEnter` (mesmo ponto do tema), sem listener de scroll |
| RV4 | Reescrita do texto desalinha contagens AEO (faq/terms) | Rodar `build-aeo` após editar `pages.mjs`; o `aeo.spec` valida as contagens |
| RV5 | Perda do "encanto" ao remover anime | A nostalgia fica concentrada e forte na F1/F2; as fases adultas ganham peso técnico real |

---

## 8. Conformidade

✅ Decisão registrada (ADR-te-001) · ✅ reaproveita 100% da estrutura v2.1 · ✅ narrativa madura com copy pronta · ✅ 3D semântico com alvos por fase e abordagem Three.js · ✅ refinamentos técnicos (theme-color/contraste) · ✅ plano R1–R5 incremental · ✅ critérios de aceite e testes · ✅ a11y/SEO/fallback preservados. **Nenhum código de produção alterado por esta spec** — ela o especifica.
