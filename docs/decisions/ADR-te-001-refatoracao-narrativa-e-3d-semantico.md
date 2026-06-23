# ADR-te-001 — Refatorar o Terminal Evolutivo para v3.0 (narrativa madura + WebGL semântico)

- **Status:** Aceito
- **Data:** 2026-06-23
- **Escopo:** página `terminal-evolutivo` (HTML/CSS, `terminal-evolutivo.js`, `te-scene.js`)
- **Relacionado:** [`00_SDD_terminal_evolutivo.md`](../specs/pages/terminal-evolutivo/00_SDD_terminal_evolutivo.md) (v2.1, base) · [`01_SPEC_refatoracao_v3.md`](../specs/pages/terminal-evolutivo/01_SPEC_refatoracao_v3.md) (o "como")

## Contexto

A v2.1 foi publicada e funciona (arquitetura híbrida HTML + WebGL, 5 fases, AEO/eco-nav/a11y/fallback, gate verde). Uma avaliação crítica sob a ótica de **Diretor de Engenharia / Tech Recruiter**, cruzando a narrativa ("44 Níveis") com o currículo real, apontou cinco dissonâncias que jogam contra a credibilidade profissional:

1. **Excesso de metáforas pop nas fases adultas.** Jaspion (infância) e Pentium/Doom (adolescência) funcionam como nostalgia, mas comparar casamento com *One Piece*, filhos com *Bleach* e evolução técnica com *Naruto* **infantiliza** conquistas reais (orçamentos de milhões) e soa melodramático para quem não consome anime.
2. **Cronologia do "arquiteto" incoerente com o CV.** A narrativa sugere a virada "construir → desenhar sistemas" por volta de 2020. O próprio currículo desmente: UML + geração de código por **MDA na Sysgen (2003–2012)** e arquitetura/liderança na **Indra (2012)**. A semente do arquiteto é dos anos 2000; o que mudou na fase de IA foi a **escala** (Cloud, SRE) e o **papel** (orquestrar/mentorar).
3. **Buraco dos 14 anos de trincheira (2003–2017).** O texto pula da internet discada para "casei e virei Tech Lead", omitindo Java corporativo, EJB/JBoss/Oracle/PL/SQL, legado de seguros e madrugadas de bug em produção — onde a resiliência real é forjada.
4. **Tom "herói solo" vs. realidade ágil.** Apesar do "ninguém vence sozinho", o tom é egocêntrico ("arquiteto de si mesmo"). O mercado penaliza o *Dev Herói* e valoriza o **viabilizador de times** — e o autor é certificado em Business Agility/Scrum/Agile Coaching.
5. **Prosa épica/densa demais para scrollytelling.** Em página de rolagem, lê-se escaneando; texto muito poético é pulado.

Além do conteúdo, a **direção de arte 3D ficou abstrata**: o WebGL atual é um campo de partículas que **apenas muda de cor** por fase. Sem forma semântica, o 3D vira "teste de performance" e não traduz a história — não há conexão entre o que se lê e o que se vê.

## Decisão

Refatorar para **v3.0** em dois pilares, **reaproveitando 100% da estrutura atual** (não reescrever a arquitetura híbrida, as 5 fases, a integração AEO/eco-nav, a a11y nem o fallback):

- **Pilar 1 — Narrativa madura.** Desapego pop a partir da Fase 3 (mantém Jaspion na F1 e os jogos na F2; remove Naruto/One Piece/Bleach); honrar a trincheira 2003–2017; corrigir a cronologia do arquiteto (semente em 2003, escala/orquestração em 2020+); trocar o tom "herói solo" por "viabilizador de times"; **desidratar** o tom épico.
- **Pilar 2 — Direção de arte semântica.** O sistema de partículas passa a **morfar em formas literais** que traduzem cada fase: **grade CRT** (F1) → **wireframe/linhas** (F2) → **rede de nós e links** (F3) → **blocos sólidos/microsserviços** (F4) → **blueprint** (Marco) → **rede neural fluida** (F5).
- **Pilar 3 — Refinamentos técnicos.** `theme-color` dinâmico por fase (barra do navegador móvel acompanha o tema), revalidação de contraste AA do tema claro (F4) e do orçamento de performance do 3D mais rico; manter `onEnter`/`onEnterBack` (já feito), reduced-motion e no-webgl.

O "como" detalhado (copy reescrita pronta para colar, alvos de morph por fase, abordagem Three.js e plano de execução) está em [`01_SPEC_refatoracao_v3.md`](../specs/pages/terminal-evolutivo/01_SPEC_refatoracao_v3.md).

## Alternativas consideradas

- **Manter a v2.1.** Rejeitada — as críticas de credibilidade são válidas e o 3D abstrato não cumpre o objetivo de "narrativa visual".
- **Remover o WebGL e ir a CSS puro.** Rejeitada — abre mão do diferencial e da metáfora "tecnologia que envelhece"; a v1.0 já era CSS-only e foi superada de propósito.
- **Usar modelos 3D literais (GLTF: TV, servidores, cérebro).** Rejeitada — peso de assets, custo de perf/produção e estética "clip-art 3D" fora do tom. Um sistema de partículas/linhas/cubos que **morfa** mantém continuidade visual e leveza.

## Consequências

- (+) Credibilidade profissional: o texto projeta a autoridade de um Tech Lead/Arquiteto com 20+ anos; o 3D passa a ter **propósito** (cada forma traduz o conteúdo).
- (+) Mantém intactos SEO, AEO, acessibilidade e o fallback sem WebGL/JS (invariante inegociável).
- (+) Honra o currículo real (trincheira + cronologia), reduzindo o risco de soar exagerado.
- (−) Cena 3D mais rica (linhas + cubos instanciados + blueprint) **aumenta o orçamento de performance e o risco cross-browser**; exige tiers de degradação e revalidação de fps.
- (−) Retrabalho de conteúdo (copy) e de `te-scene.js`; necessidade de revalidar o gate (build + Playwright/axe) e adicionar testes de narrativa (ausência das âncoras pop) e de `theme-color`.
- **Invariante:** sem WebGL/JS, ou sob `prefers-reduced-motion`, a página continua legível, navegável e indexável — o 3D é sempre *progressive enhancement*.
