# 02 — Plano de Desenvolvimento Agêntico
## Deterministic Grounding para Engenharia Agentic de Software

> Como transformar [00_SPEC_Conteúdo.md](00_SPEC_Conteúdo.md) (conteúdo) e [01_SPEC_Visual.md](01_SPEC_Visual.md)
> (design) em código publicável, usando o fluxo **agent-driven** já praticado neste repositório:
> decomposição em pacotes de trabalho verificáveis, papéis de agente, grafo de dependências e
> portões de verificação. Base de governança: `AGENTS.md` §"Spec-Driven Development" e os planos
> irmãos [`operacao-capital-cognitivo/11_plano_desenvolvimento_agentico.md`](../operacao-capital-cognitivo/11_plano_desenvolvimento_agentico.md)
> e [`formulacao-de-problemas/05_plano_de_desenvolvimento.md`](../formulacao-de-problemas/05_plano_de_desenvolvimento.md).

---

## 1. Premissas

1. **00 e 01 são a fonte da verdade.** Mudança de requisito editorial ou visual atualiza o doc
   correspondente **antes** do código — nunca o contrário.
2. **Arquivo e slug:** `src/develop-engineering.html`, por convenção do repositório (todo
   `docs/specs/pages/<pasta>/` mapeia 1:1 para `src/<pasta>.html` — sem exceção observada em
   `know`, `devin`, `case-agents`, `formulacao-de-problemas` etc.). Tratado como decisão inferida,
   não confirmada — ver **D-2** em §10.
3. **Sem dependência nova.** `package.json` não muda. GSAP/Lenis já estão instalados e podem ser
   usados para o scroll-driven design da §6/8 de 01, mas CSS `scroll-timeline`/`IntersectionObserver`
   nativo é preferível onde resolver (ver `formulacao-de-problemas/incertezas.js` como precedente).
4. **Pilar do ecossistema: p2 · "Engenharia de Confiança".** A página fica entre
   `engenharia-agentes-ia` e `case-agents` na jornada CA-01 (`specs/ecosystem.nav.yaml`), conforme
   00 §1.1 e §10. Alterar o grafo exige bump de `meta.version` e aprovação humana — ver **D-3**.
5. ~~**Conflito de paleta a resolver antes da Fase 0.**~~ — **resolvida em 2026-09-18 (D-1):** 01 §4
   foi reescrita para os tokens `--dg-*`, com valores herdados da paleta Dark Tech (`#0d1117`/
   `#161b22`/`#30363d`/`#c9d1d9`/`#58a6ff`) e dos acentos semânticos GitHub Dark Dimmed
   (`#d29922`/`#f85149`/`#3fb950`/`#8b949e`/`#db61a2`), preservando os 7 papéis semânticos
   (observado/inferido/hipótese/bloqueio/aprovação/desconhecido/conflito). Não é a exceção
   registrada de `apresentacao` (`.ap-*`); WP-0.1 apenas transcreve a tabela de 01 §4.1.
6. **Pilar do ecossistema aprovado, entrada adiada (D-3).** O humano aprovou o destino — pilar p2,
   entre `case-agents` e o restante da jornada CA-01, com crosslinks a partir de
   `engenharia-agentes-ia`/`devin` e para `case-agents`/`sustentacao` — mas editar
   `specs/ecosystem.nav.yaml`/`src/js/eco-nav.js` **antes** de `src/develop-engineering.html`
   existir deixa um nó órfão (`INV-3`) e o gate (`node scripts/audit-site.mjs --strict`) vermelho
   sem que nenhuma página tenha sido construída — testado nesta sessão e revertido por decisão do
   humano. **WP-7.3 é o único ponto do plano que deve tocar o grafo**, executado só depois que
   WP-0.2 (scaffold) já tiver criado o arquivo — nunca antes.
7. **Gate fail-closed.** `npm run gate` verde é condição de "pronto", não formalidade.

---

## 2. Papéis de Agente

| Papel | Responsabilidade | Ferramentas | Referência de agente |
| :-- | :-- | :-- | :-- |
| **Scaffolder** | Estrutura do HTML, tokens `--dg-*`, wiring dos módulos JS | Write, Edit, Bash | general-purpose |
| **Content-writer** | Materializa cada seção de 00 em prosa final pt-BR, com badges epistêmicos | Write, Edit | general-purpose |
| **Scene-dev** | Implementa cada cena de 01 (HTML/CSS/SVG) sobre o texto já escrito | Write, Edit, Bash | general-purpose |
| **Interaction-dev** | Módulos JS pequenos e testáveis (filtros, comparador, expand/collapse) | Write, Edit, Bash | general-purpose |
| **Verifier** | Refuta conformidade com 00/01; roda o gate focado | Read, Grep, Bash | Explore / general-purpose |
| **A11y/Design reviewer** | WCAG 2.1 AA, tokens, `prefers-reduced-motion`, SEO | Read, Grep, Glob, Bash | `a11y-design-reviewer` |
| **Tone reviewer** | Tom pt-BR "engenharia, não marketing"; honestidade epistêmica (00 §3.2) | Read, Grep, Glob, Bash | `tone-reviewer` |

> **Nota de orquestração:** pacotes independentes de uma mesma fase rodam em paralelo (fan-out);
> os dependentes seguem em pipeline. O verificador de cada pacote roda assim que o pacote termina.

---

## 3. Definição de Pronto / Concluído (DoR / DoD global)

Vale para toda tarefa deste plano, além do DoD específico de cada pacote.

**DoR (antes de começar):**
- [ ] A tarefa aponta a seção de 00 e/ou a cena de 01 que a origina.
- [ ] Os arquivos que ela toca estão listados — nada fora dessa lista.
- [ ] O critério de verificação é executável (comando/asserção), não subjetivo.

**DoD (antes de fechar):**
- [ ] `node scripts/audit-site.mjs --strict` sem novos erros.
- [ ] Nenhum hexadecimal fora dos tokens `--dg-*` definidos na Fase 0 (mesma disciplina do hook
  `guard-ap-tokens.mjs` para `apresentacao`, aplicada aqui por revisão manual — não há guard
  automático para esta página).
- [ ] Cada afirmação classificada em 00 §3.2 (`ESTABLISHED`/`DOCUMENTED`/`PROPOSED`/`HYPOTHESIS`/
  `INFERENCE`/`UNKNOWN`) carrega o `Epistemic Badge` correspondente (01 §7.2) no HTML final.
- [ ] Nenhuma linguagem promocional ("resolve", "elimina", "garante", "torna impossível") sem a
  qualificação exigida por 00 §3.4.
- [ ] Diff revisado contra 00/01: o que foi implementado é o que está escrito.

---

## 4. Grafo de Dependências (visão macro)

```
FASE 0 — Fundação (tokens --dg-*, scaffold, componentes base)
   └─▶ FASE 1 — Abertura + Cena 01 (Agent–Repository Gap)      [Content + Scene em pipeline]
          └─▶ FASE 2 — Snapshot Capsule + Intenção→Contrato    [fan-out: 2 cenas independentes]
                 └─▶ FASE 3 — Grafo estrutural + Action Gateway [fan-out: 2 cenas independentes]
                        └─▶ FASE 4 — Oráculos + Evidence Record [fan-out: 2 cenas independentes]
                               └─▶ FASE 5 — Reconciliação + MVA + Comparador baseline/proposed
                                      └─▶ FASE 6 — Qualidade transversal (a11y/tom/perf/responsivo)
                                             └─▶ FASE 7 — SEO/AEO/ecossistema + gate final + PR
```

Regra de barreira: **Fase N+1 só inicia quando o gate da Fase N está verde.** Dentro de uma fase,
pacotes sem dependência mútua de arquivo correm em paralelo.

---

## 5. Pacotes de Trabalho (Work Packages)

Cada pacote traz: **entradas** (seção de 00 / cena de 01), **saídas** (arquivos), **DoD** e **papel**.

### FASE 0 — Fundação

**WP-0.1 · Transcrição dos tokens `--dg-*`**
- Entradas: [01 §4](01_SPEC_Visual.md#4-sistema-cromático) (já resolvido — ver **D-1**, decisão fechada em §1).
- Saídas: bloco `:root { --dg-*: ... }` em `src/develop-engineering.html` (ou `src/develop-engineering.css`
  se a página adotar folha dedicada — decidir junto do Scaffolder), transcrevendo os 12 tokens já
  fixados em 01 §4.1 — nenhum valor novo a decidir aqui, só implementar.
- DoD: nenhum hex novo fora da paleta padrão (`#0d1117`/`#161b22`/`#30363d`/`#c9d1d9`/`#58a6ff`/
  `#007bff`/`#8a2be2`) ou de escalas derivadas dela; os 7 papéis semânticos (observado, inferência,
  atenção, bloqueio/falha, aprovação/PASS, desconhecido, conflito) permanecem distinguíveis por cor
  **e** por forma/ícone (01 §7.2, §12).
- Papel: Scaffolder → Verifier + `a11y-design-reviewer` (contraste AA/AAA).

**WP-0.2 · Scaffold HTML + `<head>` SEO**
- Entradas: checklist de `new-page` (SEO head, skip link, `<main id="conteudo">`, `<h1>` único).
- Saídas: `src/develop-engineering.html` com `<head>` completo (title 10–60c, description 50–160c,
  canonical, OG, robots), esqueleto das 9 seções `#cena-00`…`#cena-08` vazias.
- DoD: `npx vite build` verde; `node scripts/audit-site.mjs --strict` não acusa a página como órfã
  de SEO; único `<h1>`.
- Papel: Scaffolder → Verifier.

**WP-0.3 · Componentes base reutilizáveis**
- Entradas: [01 §7](01_SPEC_Visual.md#7-componentes-visuais-obrigatórios) (State Card, Epistemic
  Badge, Diff Lens, Evidence Ledger, Boundary Marker, Failure Card).
- Saídas: blocos CSS/HTML dos 6 componentes em `src/develop-engineering.html` (ou parcial dedicado),
  mais `src/js/develop-engineering/epistemic.js` — módulo **de lógica pura** (sem DOM) que resolve,
  dado um rótulo (`ESTABLISHED`…`UNKNOWN`), a tripla `{cor, ícone, texto}` e valida que todo badge
  tem os três. Espelha o padrão "lógica pura + node:test" de `eai-sim-model.js`.
- DoD: `node --test tests/develop-engineering.epistemic.test.mjs` verde (6 estados cobertos);
  `Epistemic Badge` nunca depende só de cor (01 §12).
- Papel: Interaction-dev → Verifier.

### FASE 1 — Abertura e o Agent–Repository Gap

**WP-1.1 · Cena 00 — O desvio (abertura)**
- Entradas: [00 Abertura](00_SPEC_Conteúdo.md#abertura--o-problema-em-uma-frase), [01 Cena 00](01_SPEC_Visual.md#cena-00--o-desvio).
- Saídas: `#cena-00` — duas camadas desalinhadas (agente/repositório), frase-problema, tese,
  subtítulo; marcador `G_t ≠ 0` revelado ao scroll.
- DoD: primeira pintura sem depender de JS (hero estático, 01 §13); com `prefers-reduced-motion`,
  o desalinhamento aparece por diferença estática de posição, não por animação.
- Papel: Content-writer → Scene-dev → Verifier.

**WP-1.2 · Cena 01 — `A_t`, `S_t`, `D`, `G_t` e os 5 estados**
- Entradas: [00 Seção 1](00_SPEC_Conteúdo.md#seção-1--o-agentrepository-gap), [01 Cena 01](01_SPEC_Visual.md#cena-01--dois-estados-uma-mudança).
- Saídas: `chapter/cena-01.js` (lógica pura: dado um `State Card` selecionado, quais afirmações os
  demais autorizam/não autorizam — tabela estática, não IA) + `tests/develop-engineering.states.test.mjs`
  + 5 `State Card` (Current/Desired/Historical/Policy/Evidence) em composição linear (01 §6, regra:
  nada de diagrama circular genérico).
- DoD: exemplo `C1→C2` da spec presente; **Failure Card #1** (contraexemplo "stale context e
  arquitetura", 00 §9) embutido nesta cena, com estrutura fixa de 01 §7.6; orientação de Snapshot
  Capsule antecipada em uma linha (a cena 02 aprofunda).
- Papel: Content-writer → Scene-dev + Interaction-dev → Verifier.

**Gate da fase:** `npx playwright test --grep develop-engineering --project=chromium` (smoke + h1 +
sem overflow mobile) verde; axe sem `serious`/`critical` nas cenas 00–01.

### FASE 2 — Snapshot Capsule e Contrato (fan-out)

**WP-2.1 · Cena 02 — Snapshot Capsule**
- Entradas: [00 Seção 1 — orientação](00_SPEC_Conteúdo.md#orientação), [01 Cena 02](01_SPEC_Visual.md#cena-02--a-snapshot-capsule).
- Saídas: `#cena-02` — objeto de camadas empilhadas (commit, branch, árvore, lockfile, toolchain,
  ambiente, digest); lacre que não fecha se um item faltar → estado `UNKNOWN`.
- DoD: cápsula expansível mostra "identidade do snapshot" vs. "estado realmente observado" como
  textos distintos, não só posições diferentes (acessível a leitor de tela).
- Papel: Scene-dev → Verifier.

**WP-2.2 · Cena 03 — Da intenção ao contrato**
- Entradas: [00 Seção 2](00_SPEC_Conteúdo.md#seção-2--da-intenção-ao-contrato), [01 Cena 03](01_SPEC_Visual.md#cena-03--da-intenção-ao-contrato).
- Saídas: `#cena-03` — linha de transformação (necessidade→intenção→Desired State→requisito→
  contrato→oracle→evidência), registro mínimo de requisito, 4 níveis de contrato, seção SDD/
  especificação executável.
- DoD: **Failure Card #2** (contraexemplo do serviço de compartilhamento de fotos, 00 §Seção 2)
  presente com trilha lateral "sem oracle" visualmente fora do caminho principal verde (01: "o
  caminho de API PASS continua verde, mas uma trilha lateral... permanece sem validação").
- Papel: Content-writer → Scene-dev → Verifier.

**Gate da fase:** gate focado (`--grep develop-engineering`) verde; revisão `tone-reviewer` nas
cenas 00–03 (sem jargão de marketing, classificações epistêmicas presentes).

### FASE 3 — Estrutura Parcial e Autoridade (fan-out)

**WP-3.1 · Cena 04 — O software como estrutura parcial**
- Entradas: [00 Seção 3](00_SPEC_Conteúdo.md#seção-3--grounding-estrutural-não-é-apenas-rag), [01 Cena 04](01_SPEC_Visual.md#cena-04--o-software-como-estrutura-parcial).
- Saídas: `#cena-04` — grafo técnico (Repository→Parser→AST/CST→Symbols→Typed Relations→Graphs→
  Architectural View) em SVG inline, com nós terminando em `POSSIBLE`/`UNKNOWN`/`CONFLICT`;
  interação de clique nas limitações (reflexão, `eval`, plugins, runtime, código gerado).
- DoD: `Boundary Marker` (01 §7.5) presente nas bordas do grafo; nenhuma leitura possível do
  diagrama como "sistema inteiro modelado" (01 regra explícita da cena).
- Papel: Scene-dev → Verifier.

**WP-3.2 · Cena 05 — Autonomia não é autoridade + Action Gateway**
- Entradas: [00 Seção 4](00_SPEC_Conteúdo.md#seção-4--autonomia-não-é-autoridade), [01 Cena 05](01_SPEC_Visual.md#cena-05--autonomia-não-é-autoridade).
- Saídas: `#cena-05` — matriz autonomia×autoridade (zona recomendada com contorno, não
  preenchimento), Action Gateway com os 12 passos de 00 §4, `Diff Lens` (01 §7.3, 3 camadas:
  proposta/escopo autorizado/escopo atingido) interrompendo uma ação fora da allowlist.
- DoD: **Failure Card #3** (contraexemplo `release_status`→`sync_environment`, 00 §4) presente,
  com a segunda chamada renderizada como entidade nova e não escondida dentro da primeira (01: "a
  segunda chamada deve surgir como uma nova entidade").
- Papel: Content-writer → Scene-dev + Interaction-dev → Verifier.

**Gate da fase:** axe verde; `Diff Lens` navegável por teclado (foco visível, sem depender só de
hover — 01 §12).

### FASE 4 — Oráculos e Evidência (fan-out)

**WP-4.1 · Cena 06 — O resultado verde é menor do que parece**
- Entradas: [00 Seção 5](00_SPEC_Conteúdo.md#seção-5--validar-não-é-provar-tudo), [01 Cena 06](01_SPEC_Visual.md#cena-06--o-resultado-verde-é-menor-do-que-parece).
- Saídas: `#cena-06` — tabela de 10 oráculos (o que `PASS` estabelece / o que não estabelece),
  `src/js/develop-engineering/verdicts.js` (lógica pura: dado um filtro `PASS|FAIL|UNKNOWN|CONFLICT`,
  retorna itens visíveis + contador do que foi ocultado) + `tests/develop-engineering.verdicts.test.mjs`.
- DoD: **Failure Card #4** (contraexemplo `test_rejects_negative_amount` marcado `skip`, 00 §5)
  presente; filtro de veredictos nunca omite o contador do oculto (01 §9 "Filtro de veredictos").
- Papel: Content-writer → Scene-dev + Interaction-dev → Verifier.

**WP-4.2 · Cena 07 — Evidence Record**
- Entradas: [00 Seção 6](00_SPEC_Conteúdo.md#seção-6--evidence-record-e-reconciliação), [01 Cena 07](01_SPEC_Visual.md#cena-07--evidence-record).
- Saídas: `#cena-07` — `Evidence Ledger` (01 §7.4) com os campos de 00 §6 (`record_id`… até
  `coverage_or_model_boundary`); campos essenciais ausentes geram `INCOMPLETE`, nunca `PASS`.
- DoD: cada campo expansível é navegável por teclado; ficha nunca "brilha" ao completar (01: "a
  evidência não brilha; torna-se mais nítida").
- Papel: Scene-dev → Verifier.

**Gate da fase:** `node --test tests/develop-engineering.verdicts.test.mjs` verde; gate focado verde.

### FASE 5 — Reconciliação, MVA e Hipótese

**WP-5.1 · Cena 08 — Reconciliação e decisão**
- Entradas: [00 Seção 6 — reconciliação](00_SPEC_Conteúdo.md#reconciliação), [01 Cena 08](01_SPEC_Visual.md#cena-08--reconciliação-e-decisão).
- Saídas: `#cena-08` — 4 painéis (Desired/Current/Evidence/Policy State) convergindo para uma
  decisão (aceitar/bloquear/revisar/novo ciclo/corrigir oracle/alterar spec/registrar exceção);
  divergência não resolvível por um único clique "aprovar".
- DoD: as 7 saídas possíveis de 00 §6 estão todas presentes e distinguíveis textualmente.
- Papel: Content-writer → Scene-dev → Verifier.

**WP-5.2 · MVA vs. Produção + Hipótese/Baseline/Ablação**
- Entradas: [00 Seção 7](00_SPEC_Conteúdo.md#seção-7--implementação-mínima-e-produção), [00 Seção 8](00_SPEC_Conteúdo.md#seção-8--hipótese-experimental-e-limites).
- Saídas: `src/js/develop-engineering/comparator.js` (lógica pura: dado `baseline|proposed` e uma
  lista de mecanismos removidos, retorna quais classes de desvio — 00 §5 taxonomia de 5 — voltam a
  ficar sem controle) + `tests/develop-engineering.comparator.test.mjs`; seção comparador
  baseline/proposed e 5 ablações de 00 §8 (01 §9 "Ablação" — rotulada como representação
  conceitual, não resultado experimental).
- DoD: toggles de ablação nunca afirmam causalidade medida (texto fixo "representação conceitual");
  MVA (00 §7) e produção continuam em trilhas visualmente separadas (01 critério 13).
- Papel: Content-writer → Interaction-dev → Verifier.

**WP-5.3 · Fechamento — Bloco "Comece com um MVA"**
- Entradas: [00 §7 Instruções prescritivas](00_SPEC_Conteúdo.md#7-instruções-prescritivas-que-devem-aparecer-na-página), [01 §16](01_SPEC_Visual.md#16-fechamento-e-chamada-para-ação).
- Saídas: caixas operacionais "antes/durante/depois" (00 §7) distribuídas nas cenas correspondentes
  (antes→cena 02, durante→cena 04/05, depois→cena 06/07) + checklist final de 7 ações (01 §16) com
  CTA "Definir o primeiro envelope" apontando para o próprio checklist, nunca para ação externa.
- DoD: nenhum CTA de linguagem promocional ("Ativar autonomia" etc.); checklist final replica as 7
  ações de 00 §7 sem adicionar nem remover itens.
- Papel: Content-writer → Scene-dev → Verifier.

**Gate da fase:** `npm run gate -- --grep develop-engineering` verde (build + Playwright completo
para a página); `node --test tests/develop-engineering.*.test.mjs` verde.

### FASE 6 — Qualidade Transversal (fan-out)

**WP-6.1 · A11y + SEO** — reviewer `a11y-design-reviewer` sobre a página completa: contraste dos
tokens `--dg-*` (WP-0.1), foco de teclado em todos os componentes de 01 §7, `aria-live` onde há
contador dinâmico (filtro de veredictos), `prefers-reduced-motion` cobrindo as 9 cenas, JSON-LD.
DoD: axe verde no Playwright; nenhuma informação essencial só em hover (01 §12).

**WP-6.2 · Tom pt-BR + honestidade epistêmica** — reviewer `tone-reviewer` sobre toda a copy,
cruzando com a taxonomia de 00 §3.2. DoD: sem marketing-speak; toda afirmação classificável carrega
badge; os 4 `Failure Card` mantêm a mesma dignidade visual que os `PASS` (00 §3.3/3.4).

**WP-6.3 · Responsividade** — aplicar 01 §11 (mobile: Snapshot Capsule vira pilha de cartões,
matriz autonomia×autoridade vira lista de 4 quadrantes, Action Gateway vira fluxo vertical, tabelas
de oráculos viram cartões comparáveis). DoD: sem scroll horizontal em 375px; nenhuma tabela extensa
simplesmente comprimida.

**WP-6.4 · Performance** — CSS/SVG/transform-opacity apenas (01 §13); sem canvas contínuo; cenas
fora da viewport pausadas. DoD: orçamento do gate (`perf-budget.mjs`, se aplicável a esta página)
verde; hero pinta sem depender de JS.

### FASE 7 — Integração SEO/AEO/Ecossistema + Entrega

**WP-7.1 · Gêmeo em inglês**
- Rodar a skill [`sync-i18n`](../../../.claude/skills/sync-i18n/SKILL.md) (ou `npm run i18n:sync && npm run i18n:check`)
  para gerar `src/en/develop-engineering.html`.
- DoD: `npm run i18n:check` sem `VELHO`/`FALTANDO` para o slug.

**WP-7.2 · Entrada AEO/GEO**
- Saídas: entrada em `scripts/seo/pages.mjs` (tier — ver **D-4**, `tldr`, `faq`, `terms`,
  `mdSections`, `og`) + `public/develop-engineering.md` (via `build-aeo.mjs`) +
  `public/og-develop-engineering.png` (via `gen-og.mjs`).
- DoD: `node scripts/seo/build-aeo.mjs develop-engineering` roda limpo; suíte `aeo.spec.js` verde
  para o novo slug.

**WP-7.3 · Ecossistema — pilar, catálogo e crosslinks**
- Entradas: destino já aprovado em **D-3** (§1.6) — pilar p2, crosslinks a partir de
  `engenharia-agentes-ia`/`devin` e para `case-agents`/`sustentacao`.
- Pré-condição dura: `src/develop-engineering.html` já existe (WP-0.2 concluído). Editar
  `ecosystem.nav.yaml` antes disso cria um nó órfão e derruba o gate — confirmado nesta sessão.
- Saídas: nó `develop-engineering` em `specs/ecosystem.nav.yaml` **e** `src/js/eco-nav.js`
  (`pillar: p2`, bump de `meta.version` nos dois arquivos em conjunto — SPEC §4.4), os 4
  crosslinks de D-3; card em `src/catalogo.html` na categoria de p2; entrada `INTENT` em
  `scripts/gen-hub-data.mjs`.
- DoD: `node scripts/audit-site.mjs --strict` sem erro de `ecosystem` (nó não-órfão, versões YAML/JS
  sincronizadas); `node scripts/gen-hub-data.mjs` roda e os gerados entram no commit.

**WP-7.4 · Suíte E2E dedicada**
- Saídas: `tests/develop-engineering.spec.js` (smoke, SEO, `h1` único, a11y axe, mobile 375px,
  navegação por teclado dos componentes interativos — seguindo o padrão de `new-page` SKILL.md).
- DoD: verde em chromium/firefox/webkit.

**WP-7.5 · Gate completo + commit + PR**
- DoD: `npm run gate` verde de ponta a ponta; `node scripts/audit-site.mjs --strict` sem novos
  erros; commit `feat:` (nova página); PR com resumo e checklist de `ship-page` SKILL.md.
- Papel: Verifier → PR.

---

## 6. Protocolo de Verificação por Pacote

Cada pacote fecha com um ciclo curto e adversarial:

```
1. Implementer entrega o pacote (arquivos + testes, quando aplicável).
2. Verifier roda o gate focado:
     node scripts/quality-gate.mjs --no-build --grep "develop-engineering"   # iteração
     node --test tests/develop-engineering.*.test.mjs                       # lógica pura, se houver
3. Verifier tenta refutar 2–3 afirmações da spec para o pacote
   (ex.: "o Epistemic Badge de 'HYPOTHESIS' é visualmente distinto de 'PROPOSED'?";
   "o Failure Card tem a mesma dignidade visual de um PASS?").
4. Achou divergência → volta ao passo 1. Confirmou → pacote fechado.
```

Portão de fase: `npm run gate -- --grep develop-engineering` verde antes de abrir a fase seguinte;
`npm run gate` completo apenas na Fase 7 (WP-7.5).

---

## 7. Ordem de Execução e Paralelismo

```
WP-0.1 ─ WP-0.2 ─ WP-0.3 ─┬─ WP-1.1 ─ WP-1.2 ─┬─ WP-2.1 ─┬─ WP-3.1 ─┬─ WP-4.1 ─┬─ WP-5.1 ─ WP-5.2 ─ WP-5.3
                                 │                    ├─ WP-2.2 ┤          ├─ WP-4.2 ─┤
                                 │                                └─ WP-3.2 ┘          │
                                 └────────────────────────────────────────────────────┴─┬─ WP-6.1…6.4 ─┬─ WP-7.1…7.5
```

Regra: **WP-7.2 (entrada AEO) só depois de WP-5.3**, porque `gen-hub-data.mjs` deriva tempo de
leitura do texto final — rodá-lo antes registra um número que a próxima edição invalida (mesma
regra do plano `formulacao-de-problemas` §5).

---

## 8. Estimativa por Fase (referência, não compromisso)

| Fase | Pacotes | Complexidade | Faixa |
| :-- | :-- | :-- | :-- |
| 0 — Fundação | WP-0.1…0.3 | Baixa (D-1 já resolvido; WP-0.1 é transcrição) | ~7h |
| 1 — Abertura + Gap | WP-1.1…1.2 | Média | ~10h |
| 2 — Capsule + Contrato | WP-2.1…2.2 | Média | ~10h |
| 3 — Estrutura + Gateway | WP-3.1…3.2 | Alta | ~14h |
| 4 — Oráculos + Evidência | WP-4.1…4.2 | Alta | ~14h |
| 5 — Reconciliação + MVA | WP-5.1…5.3 | Alta | ~16h |
| 6 — Qualidade | WP-6.1…6.4 | Média | ~10h |
| 7 — Integração | WP-7.1…7.5 | Média | ~10h |
| **Total** | | | **~94h** |

---

## 9. Riscos Específicos do Fluxo Agêntico

| Risco | Mitigação |
| :-- | :-- |
| Implementação reintroduzir hex solto fora da tabela `--dg-*` já fixada em 01 §4.1 | DoD global exige zero hex fora de `--dg-*`; sem hook automático como `guard-ap-tokens.mjs` — revisão manual explícita no Verifier |
| Página promete determinismo/correção global, contradizendo 00 §2.2/§3.4 | `tone-reviewer` cruzado com a taxonomia epistêmica (WP-6.2); DoD global lista as frases proibidas |
| `PASS` visual (verde) dominar a tela e comunicar "sucesso total", contra a tese central da página | Regra de 01 §4.2 explícita no DoD de cada cena com veredito; Failure Cards com a mesma dignidade de PASS |
| Agente "alucina" conformidade (relata verde sem rodar o gate) | Protocolo de verificação adversarial (§6); nunca aceitar relato sem exit code 0 |
| Escopo vaza para conteúdo já coberto por páginas irmãs (00 §1.1) | Cada WP referencia a seção exata de 00; conteúdo repetido de outra página é bloqueado no Verifier |
| `ecosystem.nav.yaml`/`eco-nav.js` editados antes de `src/develop-engineering.html` existir, deixando o nó órfão (`INV-3`) e o gate vermelho | **Confirmado nesta sessão** — WP-7.3 só roda depois de WP-0.2; `node scripts/audit-site.mjs --strict` acusa imediatamente se a ordem for invertida |
| `src/catalogo.html`/`gen-hub-data.mjs` ficarem dessincronizados do grafo depois que WP-7.3 tocar `ecosystem.nav.yaml`/`eco-nav.js` | `node scripts/audit-site.mjs --strict` compara as 4 fontes da verdade (`pages.mjs`, `ecosystem.nav.yaml`, `eco-nav.js`, `catalogo.html`) e erra em divergência |
| Excesso de paralelismo gera conflito de arquivo entre cenas que compartilham `develop-engineering.html` | Cenas ficam em seções `id` distintas do mesmo arquivo; pacotes paralelos que tocam o mesmo arquivo usam isolamento (worktree) se o conflito for real |

---

## 10. Reversão

A entrega é aditiva: uma página nova, tokens próprios, um diretório de JS, uma suíte de testes, uma
entrada em `pages.mjs`, um card no catálogo e os artefatos gerados (OG, Markdown, hub data).
Reverter é `git revert` do commit — nenhuma outra página depende deste código; o único acoplamento
(`ecosystem.nav.yaml`, `hub-data.js`, `catalogo.html`) é regerado pelos próprios scripts.

---

## 11. Decisões Pendentes de Humano (HITL)

| # | Decisão | Por que não foi tomada pelo agente |
| :-- | :-- | :-- |
| D-1 | ~~Paleta de 01 diverge da paleta Dark Tech padrão~~ — **resolvida em 2026-09-18**: 01 §4 reescrita com tokens `--dg-*` herdando a paleta Dark Tech + acentos GitHub Dark Dimmed; não é uma segunda exceção como `apresentacao` | Design System Guardrails em `AGENTS.md` é uma regra explícita do dono do site; só uma segunda exceção formal (como `ADR-ap-001`) poderia alterá-la, e o humano optou por conformar em vez de abrir exceção |
| D-2 | Slug/arquivo final `develop-engineering` (inferido do nome da pasta) | 00/01 não declaram um `<slug>.html` explícito; é uma convenção observada, não uma regra escrita — **segue pendente de confirmação** |
| D-3 | **Destino aprovado em 2026-09-18** (pilar p2, crosslinks de/para `engenharia-agentes-ia`, `devin`, `case-agents`, `sustentacao` — ver §1.6), **mas a edição do grafo em si fica para WP-7.3**, depois que `src/develop-engineering.html` existir. Uma tentativa de adiantar a entrada nesta sessão criou um nó órfão e derrubou `npm run gate`; foi revertida | O cabeçalho do próprio arquivo exige bump de `meta.version` e aprovação humana para alterar o grafo; a aprovação já veio, mas a *ordem* de execução (página antes do grafo) é uma restrição técnica do `audit-site.mjs`, não uma decisão pendente |
| D-4 | Tier AEO (`S`/`A`/`B`) e profundidade de `tldr`/`faq`/`terms` em `scripts/seo/pages.mjs` | Tier é uma decisão editorial de prioridade de descoberta, não derivável do conteúdo sozinho |
| D-5 | Verificação de vivacidade das 46 referências numeradas de 00 §12 (paywalls, links quebrados, versões) antes da publicação final | Requer acesso e checagem externa; a LLM autora de 00 já foi instruída a não usar snippets de busca como evidência suficiente |

---

### Referências cruzadas

- Conteúdo editorial completo → [00_SPEC_Conteúdo.md](00_SPEC_Conteúdo.md)
- Direção visual completa → [01_SPEC_Visual.md](01_SPEC_Visual.md)
- Guardrails de design e exceção registrada → `AGENTS.md` §"Design System Guardrails", `docs/specs/pages/apresentação/ADR-ap-001-namespace-e-excecao-dark-tech.md`
- Grafo do ecossistema → `specs/ecosystem.nav.yaml`
- Workflow de página nova → `.claude/skills/new-page/SKILL.md`
- Preflight de publicação → `.claude/skills/ship-page/SKILL.md`
- Sincronização do gêmeo em inglês → `.claude/skills/sync-i18n/SKILL.md`
- Planos irmãos (padrão seguido por este documento) → `docs/specs/pages/operacao-capital-cognitivo/11_plano_desenvolvimento_agentico.md`, `docs/specs/pages/formulacao-de-problemas/05_plano_de_desenvolvimento.md`
