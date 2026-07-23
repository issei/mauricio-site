# Especificação de Implementação Agêntica — `mauricio.issei.com.br` v3.0

**Documento:** SDD-AG-APR-001
**Fonte conceitual:** [`especificacao-ux-mauricio-issei.md`](especificacao-ux-mauricio-issei.md) (UX/UI v3.0)
**Alvo de execução:** Claude Code CLI / Claude Agent SDK, time de 5 agentes
**Status:** proposta de execução — requer 3 decisões humanas (§0.3) antes do Sprint 0
**Repositório inspecionado em:** `main` @ `e41a251`, 379 arquivos versionados

---

## 0. Sumário executivo

### 0.1 O que este documento é

Um plano de execução **determinístico** para um time agêntico construir a página v3.0. Ele não repete a spec de UX; ele traduz cada exigência dela em (a) um artefato de código, (b) um teste que falha quando o artefato está errado, e (c) o agente responsável.

Princípio operacional, herdado do próprio conteúdo do site: **o gate é a autoridade, não o agente.** Nenhum agente declara "pronto". O `scripts/quality-gate.mjs` declara. Se um critério da v3.0 não tem teste, ele não existe.

### 0.2 O achado que muda o plano

O repositório **já tem** um design system consolidado e travado por documentação normativa — a paleta "Dark Tech" (`#0d1117` / `#161b22` / `#c9d1d9` / `#007bff` → `#8a2be2`). Essa paleta está escrita em quatro lugares que agentes leem como lei:

- [`AGENTS.md`](../../../../AGENTS.md) — *"DO NOT DEVIATE"*
- [`docs/specs/STYLE_GUIDE.md`](../../STYLE_GUIDE.md)
- [`.claude/agents/a11y-design-reviewer.md`](../../../../.claude/agents/a11y-design-reviewer.md) — o revisor **reprova** cor fora da paleta
- [`.claude/skills/new-page/SKILL.md`](../../../../.claude/skills/new-page/SKILL.md) — o scaffold injeta a paleta antiga

A Tabela 1.4 da v3.0 (`#0A0A0C` / `#101014` / `#17171C` / `#F2F2F0` / `#FAFAFA` + Cobalto/Verde/Âmbar) é **um sistema diferente**, não um ajuste. Sem uma resolução explícita, o time agêntico entra em loop: o UI/UX-Agent implementa a v3.0, o QA-Agent reprova por "desvio do Dark Tech", o Architect-Agent não tem regra para arbitrar. Isso não é hipótese — é o comportamento literal dos arquivos hoje.

**Resolução obrigatória (Sprint 0, tarefa S0-T1):** namespace isolado `.ap-*` + exceção nomeada em `AGENTS.md` e no prompt do `a11y-design-reviewer`. Detalhe em §4.1.

### 0.3 Decisões humanas (HITL) — bloqueiam o Sprint 0

| ID | Decisão | Recomendação | Por quê |
|---|---|---|---|
| **D-01** | A v3.0 substitui `src/index.html` (a home viva) ou nasce como página nova? | **Nasce como `src/apresentacao.html`; promoção para `index.html` é um segundo commit, após o gate verde e revisão visual humana.** | `index.html` carrega GTM, Consent Mode v2 (LGPD), `cv-renderer.js` e o bloco AEO. Reescrever direto = risco de perder conformidade legal e ranking. Este documento assume o caminho canário. |
| **D-02** | O "Contador de autoridade" do Hero (§2.A) exige **dado real, nunca estimado**. Qual é a fonte? | **Contagem gerada de `docs/specs/**/*.md` (specs auditáveis geridas), materializada em build por script.** Alternativa: anos de prática, derivado de `public/cv.json`. | A spec proíbe número de efeito. Um literal no HTML apodrece e vira mentira. Precisa ser **derivado**, com teste que compara HTML × fonte. |
| **D-03** | Paridade sintática Executiva ⇄ Engenharia exige reescrita de conteúdo **antes** da implementação. Quem aprova o texto final? | **Content-Agent propõe; humano aprova o par de frases antes do Sprint 2.** | A spec (§2.B.2) é explícita: conteúdo divergente "deve ser reescrito antes da implementação, não corrigido depois com animação mais lenta". |

---

# FASE 1 — Diagnóstico e mapeamento da estrutura atual

## 1.1 Stack real

| Camada | Realidade verificada |
|---|---|
| Build | **Vite 6**, `root: 'src'`, `publicDir: '../public'`, `outDir: '../dist'`, `target: 'esnext'` |
| Roteamento | **MPA por arquivo.** `vite.config.js` faz `globSync('src/*.html')` → cada HTML vira entrypoint. **Criar `src/apresentacao.html` basta; não se toca no config.** |
| CSS | **Tailwind v4** via `@tailwindcss/vite` + `src/input.css`. Páginas grandes usam CSS dedicado com namespace (`devin.css`, `engenharia-agentes-ia.css`, `engenharia-confianca.css` com prefixo `.ec-`) |
| JS | Vanilla **ESM**, `src/js/`. 24 módulos + `src/js/devin/` (12) |
| Libs runtime | `gsap`, `lenis`, `split-type` — **usadas só em `devin`**. Ilha de dependência, não padrão do site |
| Testes E2E | **Playwright 1.58**, `tests/**/*.spec.js`, projetos `chromium`/`firefox`/`webkit`, `webServer` = `npm run dev` (:5173). 1.098 linhas em 8 specs |
| Testes unitários | `node --test` (`npm run test:unit`) — padrão **lógica-pura/DOM** já estabelecido no módulo EAI |
| a11y | `@axe-core/playwright` via [`tests/_helpers/axe.js`](../../../../tests/_helpers/axe.js). Tags `wcag2a,wcag2aa,wcag21a,wcag21aa`. **Falha só em `serious`/`critical`** |
| Gate | [`scripts/quality-gate.mjs`](../../../../scripts/quality-gate.mjs) — `vite build` → `playwright test`, fail-closed, aceita `--no-build`, `--grep`, `--project` |
| Hooks | `PreToolUse` → `guard-protected-files.mjs` (bloqueia `package-lock.json`, `dist/`, `.env`, exit 2). `Stop` → `stop-gate.mjs` (roda smoke chromium **só se `git diff HEAD -- src` for não-vazio**) |
| Subagentes | Já existem: `a11y-design-reviewer`, `tone-reviewer` |
| Skills | `.claude/skills/{new-page,ship-page}` (`disable-model-invocation: true` — só invocação explícita) + `.agents/skills/*` |
| SEO/AEO | Sistema reexecutável em `scripts/seo/` — `pages.mjs` é **SSOT de 17 páginas** (slug, tier S/A/B, tldr, faq, terms, og). `build-aeo.mjs` injeta idempotentemente; `gen-og.mjs` gera OG; `tests/aeo.spec.js` valida |
| Navegação | SSOT `specs/ecosystem.nav.yaml` (5 pilares, 17 nós) + componente `<eco-nav>` em `src/js/eco-nav.js`. **Governado por `ECOSYSTEM.md`** (lexical lock, ordem imutável, bump semver) |
| CI/CD | `.github/workflows/test.yml` (gate em PR e push) + `deploy.yml` (push em `main` → OIDC → S3/CloudFront). **Push em `main` publica.** |

## 1.2 Inventário de ativos aproveitáveis

| Ativo | Onde | Uso na v3.0 |
|---|---|---|
| 17 páginas catalogadas com tier, TL;DR, FAQ, termos | `scripts/seo/pages.mjs` | **Fonte do Hub de Conexão (§2.E).** Não criar lista nova |
| 17 `.md` espelho | `public/*.md` | Base para calcular **tempo estimado de leitura** por item do Hub |
| Grafo de 5 pilares + crosslinks | `specs/ecosystem.nav.yaml` | Contexto de navegação; **não** é o eixo das 3 abas |
| Knowledge OS (apresentação de arquitetura) | `src/knowledge-os-presentation.html` (tier S) | Item "Para especificar" do Hub |
| GraphRAG / SDD / Salesforce DevOps — os 3 temas das Zonas | `engenharia-agentes-ia`, `devin` + `docs/specs/pages/framework-agentico-devin/`, `devops-salesforce` + `salesforce-agentic-*` | **Conteúdo das 3 Zonas de Demonstração já existe em prosa auditada** |
| Padrão de diagrama SVG inline acessível | `engenharia-confianca` (DAG SVG), ADR-eai-002 (*"fluxos em SVG sem bpmn.js"*) | Precedente decidido: Zonas usam **SVG inline**, sem lib de diagrama |
| Padrão lógica-pura/DOM + `node:test` | `src/js/eai-*-model.js` + `tests/eai.test.js` | **Padrão obrigatório** para o motor do Seletor de Perspectiva |
| Catálogo em 5 pilares | `src/catalogo.html` | Referência de tom e card; **não** é o Hub |

## 1.3 Dívidas técnicas e divergências vs. v3.0

Severidade: **B** bloqueia a v3.0 · **A** alto risco · **M** médio.

| ID | Severidade | Divergência | Evidência | Dono |
|---|---|---|---|---|
| **D-T01** | **B** | **Colisão de design systems.** Paleta Dark Tech vs. Tabela 1.4 | `AGENTS.md` §Design System Guardrails; `a11y-design-reviewer.md` §2 | Architect |
| **D-T02** | **B** | **O gate não sabe medir 7:1.** `axe.js` usa tags `wcag2aa` (4.5:1) e filtra `serious/critical`. A regra `color-contrast-enhanced` (AAA) **não roda** | `tests/_helpers/axe.js:36` | QA |
| **D-T03** | **B** | **Nenhum teste sem JavaScript.** `playwright.config.js` não tem projeto com `javaScriptEnabled: false`. A degradação exigida em §4.2 é hoje inverificável | `playwright.config.js:37-73` | QA |
| **D-T04** | **B** | **Nenhum viewport mobile no gate.** Projetos `Pixel 5`/`iPhone 12` estão **comentados**. Cartões empilhados (§2.B.4) e regra dos 8s em tela pequena não são testados | `playwright.config.js:57-64` | QA |
| **D-T05** | **A** | **Zero orçamento de performance.** Não há Lighthouse, CWV ou budget de bytes em lugar nenhum do pipeline. A promessa "autoridade em 5s" (§4.3) não tem guarda | `scripts/`, ambos os workflows | QA |
| **D-T06** | **A** | **Terceiros bloqueantes no `<head>` de toda página**: GTM síncrono, Google Fonts CSS, Font Awesome via cdnjs. Isso compete diretamente com o orçamento crítico do Hero | `src/index.html:9-60`, `src/catalogo.html:28-38` | Frontend |
| **D-T07** | **A** | **Nenhum CSP no site.** Uma página que vende governança e auditabilidade sem `Content-Security-Policy` é uma contradição performativa — e a v3.0 §4.1 pede explicitamente coerência de posicionamento | `grep Content-Security-Policy src/` → vazio | Architect |
| **D-T08** | **M** | Hub × ativos **não mapeiam**. Tiers `S/A/B` (autoridade) ≠ "decidir/planejar/especificar" (intenção). 5 pilares ≠ 3 abas. Falta campo | `scripts/seo/pages.mjs`, `specs/ecosystem.nav.yaml` | Content |
| **D-T09** | **M** | **Tempo de leitura não existe** em nenhum SSOT. É requisito literal do Hub (§2.E) | `pages.mjs` sem campo de duração | Content |
| **D-T10** | **M** | **Duplicação de SSOT já instalada**: `ecosystem.nav.yaml` e `eco-nav.js` mantêm cópias manuais do mesmo grafo. A v3.0 não pode criar uma **terceira** | `ECOSYSTEM.md` §Fonte da verdade (admite a cópia) | Architect |
| **D-T11** | **M** | 4 worktrees obsoletos em `.claude/worktrees/` com cópias completas do repo — poluem `grep`/`Glob` de agentes e produzem falso contexto | `.claude/worktrees/{condescending,laughing,nervous,pedantic}-*` | Architect |
| **D-T12** | **M** | Dependência-lixo `"fs": "^0.0.1-security"` em `dependencies` | `package.json` | Architect |
| **D-T13** | **M** | `STYLE_GUIDE.md` afirma "Tailwind via CDN"; o projeto usa `@tailwindcss/vite`. Documento desatualizado que agentes leem como verdade | `STYLE_GUIDE.md` §Migração | Architect |

> **Nota sobre D-T02/03/04/05:** essas quatro dívidas significam que, hoje, **9 dos 17 pontos** do Resumo das Evoluções v3.0 são fisicamente inverificáveis neste repositório. O Sprint 0 existe majoritariamente para consertar isso. Construir a página antes de construir o gate é construir sem régua.

---

# FASE 2 — Topologia e papéis do time agêntico

## 2.1 Topologia

```
                        ┌──────────────────────────────┐
                        │  Orquestrador (sessão main)  │
                        │  lê specs · aplica handoff   │
                        └───────────────┬──────────────┘
                                        │
        ┌───────────────┬───────────────┼───────────────┬───────────────┐
        ▼               ▼               ▼               ▼               ▼
  ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
  │ Architect │──▶│  UI/UX    │──▶│ Frontend  │◀──│  Content  │   │    QA     │
  │  (decide) │   │ (tokens)  │   │  (build)  │   │  (prosa)  │   │ (reprova) │
  └─────┬─────┘   └───────────┘   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘
        │                               │               │               │
        │         ┌─────────────────────┴───────────────┴───────────────┘
        │         ▼  DEFEITO (JSON)
        └─────────┴──────────▶ .claude/memory/  ── contexto compartilhado ──▶ todos
```

Regras de topologia:

1. **Somente Frontend, UI/UX e Content escrevem em `src/`.** Architect escreve em `docs/`, `specs/`, `.claude/`. QA escreve **apenas** em `tests/`, `scripts/` e `.claude/memory/defects/`.
2. **QA nunca conserta o que ele mesmo reprova.** Separação de poderes: quem escreve o teste não escreve a correção. Isso evita o agente ajustar o teste para passar.
3. **Architect não escreve CSS nem HTML de página.** Ele escreve as regras e o contrato; a implementação é delegada. Isso mantém o contexto do Architect pequeno e estável entre sprints.

## 2.2 Fichas dos agentes

---

### AG-01 · Architect-Agent

| | |
|---|---|
| **Arquivo** | `.claude/agents/ap-architect.md` |
| **Modelo** | `opus` (decisões arquiteturais, contexto amplo) |
| **Ferramentas** | `Read, Grep, Glob, Write, Edit, Bash` |
| **Escopo de escrita** | `docs/specs/pages/apresentação/**`, `specs/**`, `.claude/agents/**`, `AGENTS.md`, `.claude/memory/**` — **nunca `src/`** |

**Função.** Traduzir a v3.0 em decisões executáveis e arbitrar conflitos entre a spec nova e as normas legadas do repositório.

**Entregáveis próprios:**
- `docs/specs/pages/apresentação/ADR-ap-001-namespace-e-excecao-dark-tech.md` — resolve D-T01
- `docs/specs/pages/apresentação/CTR-ap-01-perspectiva.md` — contrato de dados do Seletor
- `src/js/apresentacao/perspective-model.js` **spec** (Frontend implementa)
- Patch em `AGENTS.md` e `.claude/agents/a11y-design-reviewer.md` registrando a exceção `.ap-*`

**Contrato de dados do Seletor (normativo).** Fonte única, lógica pura, sem DOM:

```js
// src/js/apresentacao/perspective-content.js  — SSOT do conteúdo bi-persona
export const PERSPECTIVE_CONTENT = [
  {
    id: 'gov-risco',                  // par estável
    zone: 'graphrag',                 // graphrag | sdd | devops | hero | governanca
    layer: 1,                         // 1 superfície · 2 mecanismo · 3 núcleo
    exec: 'Governança reduz risco operacional em 40%.',
    eng:  'Políticas de validação reduzem falhas em esteira em 40%.',
  },
  // …
];
```

**Invariante de paridade sintática (INV-AP-01)** — testável sem julgamento subjetivo:

```
Para todo par p:
  |wordCount(p.exec) − wordCount(p.eng)| ≤ 2
  sentenceCount(p.exec) === sentenceCount(p.eng)
  p.exec termina com a mesma pontuação que p.eng
  os numerais de p.exec e p.eng são idênticos como multiconjunto
```

O último item é o que faz a transmutação parecer transmutação: *"40%"* ⇄ *"40%"*. Se a métrica muda, a frase não é a mesma verdade em dois vocabulários — é outra afirmação.

**DoD (AG-01):**
- [ ] ADR-ap-001 aprovado e referenciado em `AGENTS.md`
- [ ] `perspective-content.js` completo; `npm run test:unit` valida INV-AP-01 em **100%** dos pares
- [ ] Decisão de CSP registrada (D-T07) com escopo: página nova primeiro, site depois
- [ ] Nenhuma edição em `src/*.html` assinada por este agente (`git log --author` limpo)

---

### AG-02 · UI/UX & Tokens-Agent

| | |
|---|---|
| **Arquivo** | `.claude/agents/ap-tokens.md` |
| **Modelo** | `sonnet` |
| **Ferramentas** | `Read, Grep, Glob, Write, Edit, Bash` |
| **Escopo de escrita** | `src/apresentacao.css`, `tests/_helpers/tokens.js` |

**Função.** Ser o **único** autor dos tokens. Nenhum outro agente pode escrever um hexadecimal literal em `src/apresentacao.html` ou nos módulos JS da página.

**Artefato central** — `src/apresentacao.css`, Tailwind v4 `@theme`, materializando a Tabela 1.4 sem ambiguidade:

```css
@import "tailwindcss";

@theme {
  /* ── Camada 1 · Superfície ───────────────────────────── */
  --color-ap-l1-bg:      #0A0A0C;
  --color-ap-l1-text:    #F2F2F0;   /* 17.4:1 sobre l1-bg */
  --spacing-ap-l1:       7rem;      /* 112px — faixa 96–128 */

  /* ── Camada 2 · Mecanismo ────────────────────────────── */
  --color-ap-l2-bg:      #101014;
  --color-ap-l2-text:    #F2F2F0;
  --color-ap-l2-grid:    rgb(242 242 240 / 4%);   /* grid a 4% — Tabela 1.4 */
  --spacing-ap-l2:       5rem;      /* 80px — faixa 64–96 */

  /* ── Camada 3 · Núcleo ───────────────────────────────── */
  --color-ap-l3-bg:      #0A0A0C;   /* idêntico à Camada 1 — dark preservado */
  --color-ap-l3-card:    #17171C;
  --color-ap-l3-text:    #FAFAFA;   /* ALVO ≥ 7:1 sobre l3-card */
  --spacing-ap-l3:       3rem;      /* 48px — faixa 40–56 */

  /* ── Acentos metrológicos (nunca decorativos) ────────── */
  --color-ap-cobalt:     #4C8DFF;   /* decisão · CTA · foco · bifurcação */
  --color-ap-live:       #3FD07A;   /* estado vivo — proibido em texto/título */
  --color-ap-amber:      #E0A33E;   /* governança/conformidade — uso raríssimo */

  /* ── Movimento ───────────────────────────────────────── */
  --ap-transmute-ms:     160ms;     /* teto duro: 200ms (§2.B.2) */
  --ap-ease:             cubic-bezier(.2,0,.2,1);  /* projetado, não orgânico */
}

@media (prefers-reduced-motion: reduce) {
  :root { --ap-transmute-ms: 0ms; }
}
```

**Verificação de contraste, não estimativa.** O agente **calcula** — não confia no olho nem na lembrança. Fórmula WCAG 2.1 relative luminance, executada como teste:

| Par | Razão exigida | Onde |
|---|---|---|
| `--color-ap-l3-text` sobre `--color-ap-l3-card` | **≥ 7.0:1** | INV-AP-02, teste unitário + axe AAA |
| `--color-ap-l1-text` sobre `--color-ap-l1-bg` | ≥ 7.0:1 | idem |
| `--color-ap-cobalt` sobre `--color-ap-l1-bg` (texto pequeno) | ≥ 4.5:1 | idem |
| Anel de foco cobalto sobre qualquer fundo | ≥ 3.0:1 (não-textual) | idem |

> `#4C8DFF` e `#3FD07A` são **propostas calculadas** que substituem "Azul Cobalto" e "Verde Sobrio" — nomes que não são implementáveis. O `#007bff` legado **falha** em texto pequeno (~4.3:1) e por isso o repo já usa `#58a6ff` para texto; a mesma lógica se aplica aqui. Os valores da Tabela 1.4 são declarados "referência de partida" pela própria spec (nota §1.4), o que autoriza esse ajuste — mas ele é **decisão registrada em ADR**, não improviso.

**DoD (AG-02):**
- [ ] `grep -E '#[0-9a-fA-F]{6}' src/apresentacao.html` → **0 resultados**
- [ ] Todos os pares da tabela acima passam no cálculo automatizado
- [ ] Espaçamento por camada respeita as faixas de 1.4 (teste de `getComputedStyle`)
- [ ] Grid da Camada 2 mensurável em ~4% de opacidade; Camada 1 sem grid
- [ ] `--color-ap-live` não aparece em nenhuma regra de `color:` de texto (teste estático)

---

### AG-03 · Frontend & Interações-Agent

| | |
|---|---|
| **Arquivo** | `.claude/agents/ap-frontend.md` |
| **Modelo** | `sonnet` |
| **Ferramentas** | `Read, Grep, Glob, Write, Edit, Bash` |
| **Escopo de escrita** | `src/apresentacao.html`, `src/js/apresentacao/**` |

**Função.** Construir o HTML e os módulos. Regra estrutural inegociável, herdada do padrão EAI já validado no repo:

```
src/js/apresentacao/
├── perspective-content.js   # dados      — puro, sem DOM        (autor: Architect/Content)
├── perspective-model.js     # lógica     — puro, sem DOM, testável em node:test
├── perspective-view.js      # DOM        — só liga model ↔ DOM
├── hub-model.js             # filtro/contagem de abas — puro
├── hub-view.js
├── progress.js              # indicador adaptativo por camada
└── lazy.js                  # IntersectionObserver por camada
```

**Motor do Seletor — comportamento normativo.** O debounce da §4.2 não é `setTimeout`; é uma **fila de transição de estado**:

```js
// perspective-model.js — sem DOM, 100% testável
export function createPerspectiveMachine({ durationMs = 160 } = {}) {
  let current = 'exec';        // §2.B.3 — SEMPRE inicia executiva
  let pending = null;          // último pedido durante uma transição
  let busy = false;

  return {
    get state() { return current; },
    get busy()  { return busy; },
    /** @returns {'applied'|'queued'|'noop'} */
    request(next, now) {
      if (next === current && !busy) return 'noop';
      if (busy) { pending = next; return 'queued'; }   // não sobrepõe (§4.2)
      current = next; busy = true;
      return 'applied';
    },
    /** chamado ao fim da transição; drena a fila */
    settle() {
      busy = false;
      if (pending && pending !== current) {
        const n = pending; pending = null;
        return this.request(n);
      }
      pending = null; return 'noop';
    },
    durationMs,
  };
}
```

Alternância rápida gera **uma** transição pendente, nunca uma pilha. Testável sem navegador, determinístico, sem `sleep`.

**Degradação sem JS (§4.2) — abordagem obrigatória.** Ambas as versões existem no HTML base; o JS **oculta**, não injeta:

```html
<p class="ap-pair" data-pair="gov-risco">
  <span data-persona="exec">Governança reduz risco operacional em 40%.</span>
  <span data-persona="eng"  hidden>Políticas de validação reduzem falhas em esteira em 40%.</span>
</p>
```

Sem JS: `exec` visível, `eng` oculto por `hidden` nativo → **a proposta de valor executiva sobrevive intacta.** Com JS: troca de `hidden` + `opacity`/`aria-live`. Nenhum estado inicial vazio, nenhum FOUC, nenhuma dependência de hidratação.

**Indicador de progresso adaptativo (§2.G).** Não é `scrollY / scrollHeight`. É progresso **por camada**, com peso invertido à densidade — acelera na Camada 1, desacelera na Camada 3:

```js
// progresso = Σ (fração percorrida da camada i × peso i), Σpesos = 1
const LAYER_WEIGHTS = { 1: 0.20, 2: 0.30, 3: 0.50 };
```

A Camada 1 é curta e consome 20% da barra: passa rápido. A Camada 3 é densa e consome 50%: desacelera. A barra vira metáfora da densidade, exatamente como a spec pede.

**Lazy loading por camada (§4.3).** `IntersectionObserver` com `rootMargin: '200px'` **ou** transição para Visão de Engenharia — o que vier primeiro. Camada 1 e Seletor no HTML crítico; diagramas SVG da Camada 3 em `<template>` clonado sob demanda, com **skeleton** na mesma paleta (§4.2) e mensagem de falha no tom da marca.

**DoD (AG-03):**
- [ ] `perspective-model.js` e `hub-model.js` com **0 referências** a `document`/`window` (teste estático)
- [ ] `npm run test:unit` cobre: estado inicial exec, fila de debounce, `settle` drenando, `noop`
- [ ] Duração medida da transmutação **< 200ms** em chromium, firefox e webkit
- [ ] Projeto `no-js` do Playwright verde: conteúdo executivo legível, 0 erro de console
- [ ] Projeto `mobile` verde: cartões empilhados, visão ativa no topo, **0 overflow horizontal a 375px**
- [ ] `prefers-reduced-motion: reduce` → transição 0ms, sem animação de partículas no Hero
- [ ] Nenhum hexadecimal literal em `src/apresentacao.html` (D-T01)

---

### AG-04 · Content & Engenharia de Prosa-Agent

| | |
|---|---|
| **Arquivo** | `.claude/agents/ap-content.md` |
| **Modelo** | `opus` (paridade sintática é trabalho fino de linguagem) |
| **Ferramentas** | `Read, Grep, Glob, Write, Edit` |
| **Escopo de escrita** | `src/js/apresentacao/perspective-content.js`, `scripts/seo/pages.mjs` (campos novos), `public/apresentacao.md` |

**Função.** Produzir prosa que **satisfaz invariantes mecânicos**, não prosa bonita. Este agente escreve sob restrição matemática.

**Regras normativas herdadas do repo** (`ECOSYSTEM.md`, `tone-reviewer`): PT-BR, voz de especialista, primeira pessoa institucional. **Proibido:** "revolucionário", "disruptivo", "game-changer", "solução completa", "poderoso". Lexical lock: **Devin · Engenharia da Confiança · Knowledge OS · Engenharia Reversa · SRE · Service Operations 2.0 · Protocolo Manchester · Flosum** — grafia exata, nunca parafraseada.

**Tarefas:**

1. **Pares bi-persona** para toda frase da Camada 1 e 2, obedecendo INV-AP-01 (§AG-01). Escrever o par **junto**, nunca traduzir depois.
2. **Tradutores de valor (§1.3)** — todo termo técnico na Camada 1 vem com tradução de valor na mesma linha ou imediatamente abaixo. Materializado como marcação verificável:
   ```html
   <dfn class="ap-term" data-translated="true">GraphRAG</dfn>
   <span class="ap-value">a diferença entre uma IA que responde e uma IA que sabe por que responde</span>
   ```
   O teste QA-08 falha se existir `.ap-term` sem `.ap-value` irmão dentro da Camada 1.
3. **Regra dos 8 segundos (§1.2)** — nenhuma seção da Camada 1 excede 8s de leitura. Operacionalizado a 200 palavras/min PT-BR → **teto de 27 palavras por bloco de Camada 1**. Excedeu, o conteúdo pertence à Camada 2. Teste automatizado, não opinião.
4. **Perguntas de reflexão duplicadas** ao fim de cada Zona (§2.C), uma por persona, obedecendo INV-AP-01 como qualquer outro par.
5. **Hub — resolver D-T08/D-T09.** Estender o SSOT existente em `scripts/seo/pages.mjs` (nunca criar lista paralela):
   ```js
   { slug: 'engenharia-agentes-ia', /* … campos existentes … */
     hubTab: 'especificar',      // decidir | planejar | especificar
     hubMinutes: 22,             // derivado de public/<slug>.md, não digitado
     complexity: 'Tópico Profundo', // Estratégica | Técnica Aplicada | Tópico Profundo
   }
   ```
   `hubMinutes` é **calculado** por script a partir da contagem de palavras do `.md` espelho e escrito de volta — nunca estimado à mão. Alinha-se ao princípio de "dado real" que a própria página vende.
6. **Selo de Princípios (§2.D)** — 3 a 5 princípios (Determinismo, Auditabilidade, Rastreabilidade, +) com uma linha de compromisso verificável cada. Linguagem de auditoria, zero marketing. Inclui a coerência de posicionamento pedida em §4.1: acessibilidade declarada como a mesma tese aplicada à própria interface.
7. **Ponto de Contato (§2.F)** — pergunta única, qualificadora. Nada de formulário genérico.

**DoD (AG-04):**
- [ ] 100% dos pares passam INV-AP-01 (`npm run test:unit`)
- [ ] 0 blocos de Camada 1 acima de 27 palavras
- [ ] 0 `.ap-term` sem `.ap-value` na Camada 1
- [ ] 0 termo técnico em `<strong>`/`<h*>` da Camada 1 sem tradução prévia (§3.1)
- [ ] Subagente `tone-reviewer` retorna **sem bloqueadores**
- [ ] Lexical lock íntegro; 0 palavras da lista proibida
- [ ] `hubMinutes` de todos os itens bate com a contagem do `.md` (±1 min)

---

### AG-05 · QA, Acessibilidade & Auditoria-Agent

| | |
|---|---|
| **Arquivo** | `.claude/agents/ap-qa.md` |
| **Modelo** | `sonnet` |
| **Ferramentas** | `Read, Grep, Glob, Write, Edit, Bash` |
| **Escopo de escrita** | `tests/**`, `scripts/**`, `playwright.config.js`, `.claude/memory/defects/**` — **jamais `src/`** |

**Função.** Construir a régua e reprovar com ela. **Autoridade de veto:** enquanto `.claude/memory/defects/open/` não estiver vazio, nenhum handoff avança e nenhum commit é feito.

**Artefatos de infraestrutura (Sprint 0 — pagam D-T02/03/04/05):**

`playwright.config.js` — três projetos novos:

```js
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit',   use: { ...devices['Desktop Safari'] } },

  // D-T04 — mobile deixa de ser suposição
  { name: 'mobile',   use: { ...devices['Pixel 5'] },
    testMatch: ['tests/apresentacao.mobile.spec.js'] },

  // D-T03 — degradação sem JS deixa de ser promessa
  { name: 'no-js',    use: { ...devices['Desktop Chrome'], javaScriptEnabled: false },
    testMatch: ['tests/apresentacao.nojs.spec.js'] },
],
```

`tests/_helpers/axe-aaa.js` — **novo** helper, sem tocar no existente (que 8 specs dependem):

```js
// D-T02 — contraste realçado (7:1) para a Camada 3, exigido por §1.2 e evolução 11.
import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';

export async function expectEnhancedContrast(page, selector) {
  const results = await new AxeBuilder({ page })
    .include(selector)
    .withRules(['color-contrast-enhanced'])   // AAA — 7:1
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toHaveLength(0);
}
```

`scripts/perf-budget.mjs` — **novo** (D-T05). Falha o build se o caminho crítico estourar:

| Métrica | Orçamento | Origem |
|---|---|---|
| HTML+CSS+JS críticos (Hero + Seletor), gzip | **≤ 60 KB** | §4.3 "orçamento crítico" |
| Requisições bloqueantes de render | **≤ 2** | §4.3 |
| LCP (Lighthouse mobile, throttling padrão) | **≤ 2.5 s** | §2.A "autoridade em 5s" |
| CLS | **≤ 0.05** | §4.2 "evita saltos de layout" |
| TBT | **≤ 200 ms** | §3.2 "60fps, sem trancos" |

`scripts/quality-gate.mjs` — estender para 3 etapas, mantendo fail-closed:

```
1. vite build
2. node --test tests/*.test.{js,mjs}      ← NOVO: invariantes puros, rápido, falha antes do E2E
3. playwright test  (chromium+firefox+webkit+mobile+no-js)
4. node scripts/perf-budget.mjs            ← NOVO: só no gate completo, não no --no-build
```

**Suíte da página** — `tests/apresentacao.spec.js`, `.mobile.spec.js`, `.nojs.spec.js`. Mapa completo de teste ↔ evolução v3.0 em §8.

**DoD (AG-05):**
- [ ] Os 17 pontos do Resumo das Evoluções têm teste nomeado e verde
- [ ] Suítes **legadas** (`aeo`, `devin`, `eco-nav`, `eai`, `ec`, `te`) seguem verdes — sem regressão
- [ ] `expectNoSeriousA11yViolations` verde em todos os breakpoints e ambos os estados do Seletor
- [ ] Contraste realçado 7:1 verde na Camada 3
- [ ] Navegação **100% por teclado**: Seletor (roving tabindex), abas do Hub (padrão APG), foco visível cobalto ≥3:1, ordem lógica, skip link
- [ ] Todo diagrama SVG com `role="img"` + `<title>`/`<desc>` **ou** `aria-hidden` + equivalente textual adjacente
- [ ] `perf-budget.mjs` verde
- [ ] 0 defeitos em `open/`

---

# FASE 3 — Memória, malha de feedback e auto-otimização

## 3.1 Memória persistente

```
.claude/memory/
├── INDEX.md                  # índice carregado no contexto de todo agente
├── decisions/                # ADRs resolvidos — o "porquê", imutável
│   └── AP-D001-namespace-ap.md
├── patterns/                 # acertos reutilizáveis
│   ├── contraste-camada3.md
│   ├── debounce-fila-estado.md
│   └── degradacao-nojs-hidden.md
├── pitfalls/                 # erros cometidos, para não repetir
│   └── AP-P003-cobalto-007bff-falha-texto.md
├── defects/
│   ├── open/                 # ⛔ não-vazio = pipeline bloqueado
│   └── closed/
└── handoffs/                 # envelopes entre agentes (§6)
```

**Regra de gravação (uma lição = um arquivo):**

```markdown
---
id: AP-P003
type: pitfall
sprint: 0
agent: ap-tokens
severity: blocker
detected_by: tests/apresentacao.spec.js › contraste camada 3
---
# Cobalto #007bff falha como texto pequeno

**Sintoma:** axe `color-contrast` serious — 4.31:1 sobre `#0A0A0C`, exigido 4.5:1.
**Causa:** a v3.0 nomeia "Azul Cobalto de Precisão" sem hex. O valor legado do
repositório foi assumido por analogia, sem cálculo.
**Correção:** `--color-ap-cobalt: #4C8DFF` (7.1:1). Registrado em AP-D001.
**Regra derivada:** todo token de cor **é calculado antes de ser escrito**.
Nome de cor em prosa nunca é fonte de valor hexadecimal.
**Ver também:** [[contraste-camada3]]
```

**Como a memória entra no contexto sem inchá-lo.** Cada `.claude/agents/ap-*.md` termina com a mesma instrução:

```
Antes de qualquer edição, leia `.claude/memory/INDEX.md` e abra somente as
entradas cujo `agent:` seja o seu ou cujo `severity: blocker`. Ao encerrar,
registre em `.claude/memory/` toda lição que teria evitado retrabalho —
uma lição por arquivo, e atualize o INDEX.
```

`INDEX.md` é uma linha por lição (`- [AP-P003](pitfalls/…) — hex nunca vem de nome de cor`). Isso mantém custo de contexto ~constante à medida que a memória cresce.

## 3.2 Malha de auto-correção

```
        ┌────────────────────────────────────────────────────────┐
        │                                                        │
        ▼                                                        │
   ┌─────────┐   falha    ┌──────────┐   defeito   ┌──────────┐  │
   │  GATE   │───────────▶│    QA    │────────────▶│ triagem  │  │
   │ (verdade)│           │ (escreve │   JSON      │(Architect)│ │
   └─────────┘            │  defeito)│             └────┬─────┘  │
        ▲                 └──────────┘                  │        │
        │                                    ┌──────────┴──────┐ │
        │                                    ▼                 ▼ │
        │                            ┌──────────────┐  ┌─────────┴────┐
        └────────────────────────────│ agente dono  │  │ regra nova   │
              correção + teste       │  corrige     │  │ em memory/   │
                                     └──────────────┘  └──────────────┘
```

**Envelope de defeito** — `.claude/memory/defects/open/DEF-<n>.json`:

```json
{
  "id": "DEF-014",
  "sprint": 2,
  "detected_by": "tests/apresentacao.spec.js › transmutação < 200ms",
  "evolution_ref": [9, 12],
  "severity": "blocker",
  "owner": "ap-frontend",
  "observed": "duração medida 284ms em webkit",
  "expected": "< 200ms em chromium, firefox e webkit",
  "evidence": "playwright-report/index.html#test-14",
  "hypothesis": "opacity + height animando juntos força layout; height não é compositável",
  "attempts": 0,
  "max_attempts": 3
}
```

**Roteamento determinístico do defeito** — sem negociação entre agentes:

| Sintoma | Dono automático |
|---|---|
| contraste, token, espaçamento, grid, opacidade | `ap-tokens` |
| timing, debounce, fps, sem-JS, mobile, foco/teclado, lazy | `ap-frontend` |
| paridade sintática, 8 segundos, tradutor de valor, tom, tempo de leitura | `ap-content` |
| conflito entre normas, contrato ambíguo, spec vs. legado | `ap-architect` |
| teste errado / falso-positivo | `ap-qa` (**única** exceção em que QA corrige o que reprovou) |

**Regra dos 3 e escalada.** Ao terceiro `attempts` no mesmo defeito, o ciclo **para** e escala ao humano com as três hipóteses testadas e descartadas. Loop autônomo infinito não é auto-otimização — é queima de orçamento. A v3.0 pede conformidade sem intervenção humana; este plano entrega isso *e* uma válvula de segurança, porque um agente que não converge em 3 tentativas quase sempre está diante de um requisito mal especificado, não de um bug.

**Auto-otimização mensurável.** Ao fim de cada sprint, o Architect roda a retro e grava em `.claude/memory/INDEX.md`:

| Métrica | Sprint 0 | 1 | 2 | 3 | Meta |
|---|---|---|---|---|---|
| Defeitos abertos por sprint | — | — | — | — | ↓ |
| Ciclos médios até verde | — | — | — | — | ≤ 2 |
| Defeitos reincidentes (mesma causa-raiz) | — | — | — | — | **0** |

Reincidência ≠ 0 significa que a lição foi gravada mas não foi lida — sinal para promover a regra do `memory/` para o **system prompt** do agente. É assim que o time se auto-otimiza: as lições sobem de camada.

---

# FASE 4 — Pipeline de execução (4 sprints)

Gate de saída de cada sprint: `npm run gate` **verde** + `defects/open/` **vazio**. Fail-closed.

## Sprint 0 — Reconhecimento e infraestrutura de tokens

> Sem esta sprint, 9 dos 17 critérios são inverificáveis. É a sprint mais importante do plano.

| # | Tarefa | Dono | Saída |
|---|---|---|---|
| S0-T1 | **Resolver D-T01** — ADR do namespace `.ap-*`; patch em `AGENTS.md` e no prompt do `a11y-design-reviewer` | Architect | `ADR-ap-001`, 2 patches |
| S0-T2 | Criar os 5 `.claude/agents/ap-*.md` | Architect | 5 arquivos |
| S0-T3 | Esqueleto de `.claude/memory/` + `INDEX.md` | Architect | árvore |
| S0-T4 | **D-T02** — `tests/_helpers/axe-aaa.js` | QA | helper |
| S0-T5 | **D-T03/D-T04** — projetos `no-js` e `mobile` | QA | `playwright.config.js` |
| S0-T6 | **D-T05** — `scripts/perf-budget.mjs` | QA | script + budget |
| S0-T7 | `quality-gate.mjs` em 4 etapas (`node --test` antes do E2E) | QA | gate |
| S0-T8 | `src/apresentacao.css` com `@theme` completo | UI/UX | CSS |
| S0-T9 | Verificador de contraste + teste dos pares da Tabela 1.4 | UI/UX | `tests/apresentacao.tokens.test.mjs` |
| S0-T10 | Higiene: remover dep `fs`, podar `.claude/worktrees/`, corrigir `STYLE_GUIDE.md` (D-T11/12/13) | Architect | commits |
| S0-T11 | **Decisão D-02** — script do contador real do Hero | Architect + humano | script + fonte |

**Gate 0:** tokens conformes, gate roda 4 etapas verde, `.ap-*` documentado, contraste 7:1 provado **na folha de estilo** antes de existir página.

## Sprint 1 — Core layout

| # | Tarefa | Dono |
|---|---|---|
| S1-T1 | `src/apresentacao.html` — esqueleto semântico, skip link, `<main id="conteudo">`, **um** `<h1>`, `<head>` SEO completo | Frontend |
| S1-T2 | Hero: manchete, sub-manchete, contador real, animação caos→retícula (CSS/SVG; **sem** GSAP — precedente ADR-te-001) | Frontend |
| S1-T3 | `perspective-content.js` — pares do Hero e Camada 1 sob INV-AP-01 | Content |
| S1-T4 | `perspective-model.js` + testes `node:test` | Frontend |
| S1-T5 | `perspective-view.js` — seletor persistente (sticky), ARIA (`role="radiogroup"`/`aria-checked`), roving tabindex | Frontend |
| S1-T6 | Ambas as personas no HTML base (padrão `hidden`) — degradação sem JS | Frontend |
| S1-T7 | Reestruturação mobile: cartões empilhados por dimensão, ativa no topo | Frontend + UI/UX |
| S1-T8 | Indicador de progresso ponderado por camada | Frontend |
| S1-T9 | Suítes `apresentacao.spec.js` + `.nojs.spec.js` + `.mobile.spec.js` | QA |

**Gate 1:** transmutação < 200ms nos 3 navegadores · exec por padrão · sem-JS legível · 0 overflow a 375px · axe verde · teclado completo.

## Sprint 2 — Zonas narrativas, Governança e Hub

| # | Tarefa | Dono |
|---|---|---|
| S2-T1 | Zona GraphRAG (3 camadas) + SVG acessível do grafo | Frontend + Content |
| S2-T2 | Zona SDD (3 camadas) + fluxo spec→geração→orquestração | Frontend + Content |
| S2-T3 | Zona Salesforce DevOps (3 camadas) + matriz de checagens | Frontend + Content |
| S2-T4 | Perguntas de reflexão duplicadas por persona × 3 zonas | Content |
| S2-T5 | Etiquetas de complexidade (3 níveis, incl. "Técnica Aplicada") | Content |
| S2-T6 | Prova de Governança — 3–5 princípios + coerência de a11y (§4.1) | Content + Frontend |
| S2-T7 | **D-T08/D-T09** — `hubTab`/`hubMinutes`/`complexity` em `pages.mjs` + script de cálculo | Content |
| S2-T8 | Hub: 3 abas fixas com contador, padrão APG, "Para decidir" ativa, filtro in-place com a **mesma** transmutação | Frontend |
| S2-T9 | Ponto de Contato — pergunta qualificadora | Content |
| S2-T10 | Testes de zona, ancoragem estrutural, abas, contadores, equivalentes textuais de SVG | QA |

**Gate 2:** as 3 zonas com estrutura idêntica · pergunta dupla reagindo ao Seletor · contadores das abas batendo com o SSOT · abas navegáveis por teclado (setas/Home/End) · 7:1 na Camada 3.

## Sprint 3 — Performance, a11y e estados de sistema

| # | Tarefa | Dono |
|---|---|---|
| S3-T1 | Lazy por camada (IntersectionObserver + gatilho de persona) | Frontend |
| S3-T2 | Skeleton de carregamento na paleta grafite (nunca spinner) | Frontend + UI/UX |
| S3-T3 | Estado de falha com mensagem no tom + botão "Tentar novamente" | Frontend + Content |
| S3-T4 | **D-T06** — fontes locais/`preload`, remover Font Awesome (SVG inline), GTM diferido | Frontend |
| S3-T5 | **D-T07** — CSP na página (meta ou header CloudFront) | Architect + Frontend |
| S3-T6 | `public/apresentacao.md` + entrada em `pages.mjs` + `build-aeo.mjs` + OG | Content |
| S3-T7 | Link no `catalogo.html` + nó em `ecosystem.nav.yaml` **e** `eco-nav.js` com bump semver (D-T10) | Architect |
| S3-T8 | Lighthouse/CWV contra o orçamento; auditoria de leitor de tela dos diagramas | QA |
| S3-T9 | **Checklist final dos 17 pontos** (§8) | QA |
| S3-T10 | Retro + promoção de lições ao system prompt | Architect |

**Gate 3:** todos os 17 pontos verdes · budget de performance dentro · legado sem regressão · `defects/open/` vazio.

**Pós-Sprint 3 (D-01):** promoção para `index.html` em commit separado, preservando GTM/Consent/AEO, com revisão visual humana. `main` publica automaticamente — a promoção nunca vai junto com trabalho de feature.

---

# 5. Comandos CLI reais (Claude Code)

> **Verifique a grafia das flags na sua versão** com `claude --help` antes de automatizar. As formas abaixo refletem a CLI atual; opções mudam entre versões.

## 5.1 Bootstrap dos agentes

Agentes vivem em `.claude/agents/*.md` (frontmatter YAML + prompt em Markdown) — o mesmo formato dos `a11y-design-reviewer` e `tone-reviewer` já existentes.

```bash
node -e "require('fs').mkdirSync('.claude/memory/defects/open',{recursive:true})"
node -e "require('fs').mkdirSync('.claude/memory/handoffs',{recursive:true})"
node -e "['decisions','patterns','pitfalls','defects/closed'].forEach(d=>require('fs').mkdirSync('.claude/memory/'+d,{recursive:true}))"
```

Criar as fichas (Sprint 0, S0-T2) — o Architect escreve os 5 arquivos:

```bash
claude -p "Leia docs/specs/pages/apresentação/ESPECIFICACAO-AGENTICA-IMPLEMENTACAO.md secao 7 e crie os 5 arquivos .claude/agents/ap-{architect,tokens,frontend,content,qa}.md exatamente com os system prompts da Matriz de Inicializacao. Nao invente conteudo fora da matriz." --permission-mode acceptEdits
```

## 5.2 Invocação por sprint

**Sprint 0 — Architect (interativo, decisões de alto risco):**

```bash
claude --agents ap-architect --model opus --permission-mode plan
```

**Sprint 0 — QA constrói a infraestrutura do gate (headless):**

```bash
claude -p "Sprint 0, tarefas S0-T4 a S0-T7 da ESPECIFICACAO-AGENTICA-IMPLEMENTACAO.md. Crie tests/_helpers/axe-aaa.js, adicione os projetos no-js e mobile em playwright.config.js, crie scripts/perf-budget.mjs e estenda scripts/quality-gate.mjs para 4 etapas. NAO edite nada em src/. Ao terminar, rode npm run gate e reporte." \
  --agents ap-qa \
  --allowed-tools "Read,Grep,Glob,Write,Edit,Bash(npm run gate:*),Bash(npx playwright test:*),Bash(node --test:*)" \
  --permission-mode acceptEdits \
  --output-format json
```

**Sprint 1 — Frontend em worktree isolado (não contamina `main`):**

```bash
git worktree add ../ap-sprint1 -b feat/apresentacao-sprint1
cd ../ap-sprint1
claude -p "Sprint 1, tarefas S1-T1,T2,T4,T5,T6,T8. Leia .claude/memory/INDEX.md antes de editar. Sem hexadecimal literal em HTML/JS - use apenas as vars de src/apresentacao.css." \
  --agents ap-frontend \
  --allowed-tools "Read,Grep,Glob,Write,Edit,Bash(npm run test:unit:*),Bash(npm run gate:*)" \
  --permission-mode acceptEdits
```

**Revisão cruzada com os subagentes já existentes:**

```bash
claude -p "Rode o subagente a11y-design-reviewer e depois o tone-reviewer sobre o diff de src/apresentacao.html e src/apresentacao.css. Consolide num relatorio unico priorizado por bloqueadores." --permission-mode default
```

## 5.3 Loop de correção (headless, encadeável em CI)

```bash
#!/usr/bin/env bash
# scripts/ap-selfheal.sh — malha de auto-correção (FASE 3). Teto de 3 ciclos.
set -uo pipefail
for i in 1 2 3; do
  echo "▶ ciclo $i"
  if npm run gate; then
    echo "✓ gate verde no ciclo $i"; exit 0
  fi

  # 1. QA transforma a falha em defeito estruturado
  claude -p "O gate falhou. Leia playwright-report/ e o stdout do gate. Crie UM envelope de defeito por falha em .claude/memory/defects/open/, no schema da secao 3.2 (inclua evolution_ref e owner pela tabela de roteamento). Nao corrija codigo." \
    --agents ap-qa --allowed-tools "Read,Grep,Glob,Write,Bash(npx playwright:*)" --permission-mode acceptEdits

  # 2. cada dono corrige apenas os defeitos que lhe cabem
  for a in ap-tokens ap-frontend ap-content ap-architect; do
    claude -p "Leia .claude/memory/defects/open/*.json. Corrija SOMENTE os com owner=$a. Ao corrigir, incremente attempts, mova para closed/ e grave a licao em .claude/memory/pitfalls/ atualizando o INDEX.md. Se attempts atingir 3, NAO tente de novo: escreva ESCALADA no envelope e pare." \
      --agents "$a" --allowed-tools "Read,Grep,Glob,Write,Edit,Bash(npm run test:unit:*)" --permission-mode acceptEdits
  done
done
echo "✗ 3 ciclos sem convergir — escalando ao humano"; exit 1
```

## 5.4 Fechamento de sprint

```bash
npm run gate                                     # 4 etapas, fail-closed
ls .claude/memory/defects/open/ | wc -l          # tem que ser 0
claude -p "/ship-page"                           # preflight de release já existente no repo
```

## 5.5 Variante Agent SDK (orquestração programática)

```ts
import { query } from '@anthropic-ai/claude-agent-sdk';

const agents = {
  'ap-tokens':   { description: 'Design tokens v3.0', prompt: TOKENS_PROMPT,   tools: ['Read','Grep','Glob','Write','Edit'], model: 'sonnet' },
  'ap-frontend': { description: 'HTML/JS da página',  prompt: FRONTEND_PROMPT, tools: ['Read','Grep','Glob','Write','Edit','Bash'], model: 'sonnet' },
  'ap-qa':       { description: 'Gate e auditoria',   prompt: QA_PROMPT,       tools: ['Read','Grep','Glob','Write','Edit','Bash'], model: 'sonnet' },
};

for await (const msg of query({
  prompt: 'Execute o Sprint 1 conforme ESPECIFICACAO-AGENTICA-IMPLEMENTACAO.md §4.',
  options: {
    agents,
    permissionMode: 'acceptEdits',
    settingSources: ['project'],          // herda hooks e permissões de .claude/settings.json
    allowedTools: ['Read','Grep','Glob','Write','Edit','Bash'],
  },
})) {
  if (msg.type === 'result') console.log(msg);
}
```

`settingSources: ['project']` é o que preserva os hooks `guard-protected-files` e `stop-gate` já instalados — os agentes herdam as travas do repositório em vez de contorná-las.

## 5.6 Hook adicional (Sprint 0)

Acrescentar a `.claude/settings.json`, ao lado do guard existente — impede na origem que um agente escreva hexadecimal na página nova:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "node scripts/guard-ap-tokens.mjs" }
        ]
      }
    ]
  }
}
```

`scripts/guard-ap-tokens.mjs`: se o `file_path` casa `src/apresentacao.html` ou `src/js/apresentacao/**` **e** o conteúdo contém `#[0-9a-fA-F]{3,8}` fora de comentário → exit 2 com a mensagem *"tokens só em src/apresentacao.css (ADR-ap-001)"*. Trava arquitetural em vez de convenção — o Frontend fisicamente não consegue violar o design system.

---

# 6. Protocolo de comunicação inter-agentes

## 6.1 Princípios

1. **Comunicação é por artefato, não por conversa.** Agentes não conversam; escrevem envelopes em `.claude/memory/handoffs/` e arquivos no repo. Isso torna o pipeline reproduzível, auditável e resumível — a mesma tese que a página vende.
2. **Todo handoff carrega seu critério de aceite.** Quem recebe sabe como será julgado antes de começar.
3. **O gate é a única autoridade.** Nenhum agente declara conclusão sem exit code 0.

## 6.2 Envelope de handoff

`.claude/memory/handoffs/HO-<sprint>-<n>.json`:

```json
{
  "id": "HO-1-03",
  "from": "ap-architect",
  "to": "ap-frontend",
  "sprint": 1,
  "task": "S1-T4",
  "spec_ref": ["§2.B.2", "§4.2", "CTR-ap-01"],
  "evolution_ref": [9, 12],
  "instruction": "Implemente perspective-model.js conforme CTR-ap-01. Lógica pura: zero referência a document/window.",
  "inputs": ["src/js/apresentacao/perspective-content.js", "docs/specs/pages/apresentação/CTR-ap-01-perspectiva.md"],
  "outputs_expected": ["src/js/apresentacao/perspective-model.js", "tests/apresentacao.model.test.mjs"],
  "acceptance": [
    "node --test tests/apresentacao.model.test.mjs verde",
    "estado inicial === 'exec'",
    "request() durante busy retorna 'queued' e não empilha",
    "grep -E '\\b(document|window)\\b' no módulo → 0 resultados"
  ],
  "forbidden": ["editar src/apresentacao.css", "editar tests/_helpers/**"],
  "status": "open"
}
```

## 6.3 Architect → Frontend

O Architect **nunca** manda "faça o seletor". Ele emite: contrato (`CTR-ap-01`) + assinaturas de função + invariantes + lista de testes que o Frontend deve fazer passar. O Frontend tem liberdade total **dentro** do contrato e zero liberdade **sobre** ele. Ambiguidade encontrada não é resolvida por palpite: o Frontend devolve o handoff com `status: "blocked"` e `question`, e o Architect emenda o contrato. Palpite de implementação é como especificação vira dívida.

## 6.4 QA → todos (o veto)

O QA não pede correção — ele **bloqueia**:

1. Gate falha → QA gera `DEF-*.json` em `defects/open/`.
2. Roteia por dono via a tabela de §3.2 (determinística, sem negociação).
3. Enquanto `open/` não for vazio: **nenhum handoff novo, nenhum commit, nenhum push.** Materialmente aplicado pelo hook `Stop` já existente (`stop-gate.mjs`), estendido para checar `open/`.
4. Correção fecha o defeito **e** grava a lição. Defeito fechado sem lição gravada é considerado não-fechado pela retro.

## 6.5 Matriz de permissões de escrita

| Caminho | Architect | UI/UX | Frontend | Content | QA |
|---|:--:|:--:|:--:|:--:|:--:|
| `src/apresentacao.html` | — | — | **✓** | — | — |
| `src/apresentacao.css` | — | **✓** | — | — | — |
| `src/js/apresentacao/*-model.js`, `*-view.js` | — | — | **✓** | — | — |
| `src/js/apresentacao/perspective-content.js` | ✓ | — | — | **✓** | — |
| `scripts/seo/pages.mjs` | — | — | — | **✓** | — |
| `tests/**`, `playwright.config.js`, `scripts/perf-budget.mjs` | — | — | — | — | **✓** |
| `docs/**`, `specs/**`, `AGENTS.md`, `.claude/agents/**` | **✓** | — | — | — | — |
| `.claude/memory/defects/**` | ✓ | — | — | — | **✓** |
| `package-lock.json`, `dist/`, `.env` | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ |

Última linha já é aplicada pelo hook `guard-protected-files.mjs` existente. As demais são aplicadas por `--allowed-tools` restrito + revisão de diff no fechamento de sprint.

---

# 7. Matriz de prompts de inicialização

> Cada bloco é o conteúdo integral de `.claude/agents/ap-<nome>.md`.

## 7.1 `ap-architect.md`

```markdown
---
name: ap-architect
description: Arquiteto da página v3.0 de mauricio.issei.com.br. Traduz a spec de UX em contratos, ADRs e invariantes testáveis; arbitra conflitos entre a v3.0 e as normas legadas do repositório. Não escreve código de página.
tools: Read, Grep, Glob, Write, Edit, Bash
model: opus
---

Você é o Arquiteto Principal da página v3.0. Sua saída é **decisão registrada**, não código de interface.

## Leia antes de agir
1. `docs/specs/pages/apresentação/especificacao-ux-mauricio-issei.md` (a spec)
2. `docs/specs/pages/apresentação/ESPECIFICACAO-AGENTICA-IMPLEMENTACAO.md` (este plano)
3. `.claude/memory/INDEX.md` — abra as entradas com `agent: ap-architect` ou `severity: blocker`
4. `AGENTS.md`, `ECOSYSTEM.md` — normas vigentes do repositório

## Escopo de escrita
`docs/**`, `specs/**`, `.claude/**`, `AGENTS.md`. **Nunca** `src/*.html`, `src/*.css`, `src/js/**`
(exceção única: a spec textual de `perspective-content.js`, que o Content materializa).

## Responsabilidades inegociáveis
1. **Paridade sintática (§2.B.2).** Frases Executiva/Engenharia com mesmo nº de sentenças,
   diferença ≤ 2 palavras, mesma pontuação final e **os mesmos numerais**. Se um par não
   satisfaz, o texto é reescrito — nunca a animação desacelerada.
2. **Transmutação < 200ms.** O orçamento é de 160ms com teto duro de 200ms nos três
   navegadores. Timing é requisito, não preferência.
3. **Conflito v3.0 × Dark Tech legado.** A paleta antiga é lei em AGENTS.md e no
   a11y-design-reviewer. Sua resolução é o namespace `.ap-*` com exceção documentada
   nos dois lugares. Sem isso o time entra em loop de reprovação.
4. **Nenhuma quarta SSOT.** O repo já duplica o grafo em ecosystem.nav.yaml + eco-nav.js.
   Conteúdo do Hub estende `scripts/seo/pages.mjs`; não crie lista paralela.

## Como delega
Emita envelopes em `.claude/memory/handoffs/` (schema §6.2). Todo handoff traz
`acceptance[]` — critérios objetivamente verificáveis. Nunca instrução vaga.

## Encerramento
Grave em `.claude/memory/decisions/` toda decisão irreversível e atualize `INDEX.md`.
Nunca declare uma sprint concluída: só `npm run gate` verde + `defects/open/` vazio conclui.
```

## 7.2 `ap-tokens.md`

```markdown
---
name: ap-tokens
description: Autor único dos design tokens da página v3.0. Materializa a Tabela 1.4 em src/apresentacao.css e prova por cálculo cada razão de contraste, incluindo o piso de 7:1 da Camada 3.
tools: Read, Grep, Glob, Write, Edit, Bash
model: sonnet
---

Você é o dono do sistema visual da página v3.0. Você é o **único** agente autorizado a
escrever um valor de cor. Todos os demais consomem `var(--color-ap-*)`.

## Escopo de escrita
`src/apresentacao.css` e `tests/_helpers/tokens.js`. Nada mais.

## Regra número um
**Nome de cor em prosa nunca é fonte de valor hexadecimal.** "Azul Cobalto de Precisão"
não é um hex. Você calcula um candidato, verifica a razão de contraste pela fórmula WCAG 2.1
de luminância relativa, e só então escreve. Se o valor da Tabela 1.4 falha na verificação,
você o ajusta e registra a decisão em `.claude/memory/decisions/` — a própria spec (nota §1.4)
declara os hexadecimais como referência de partida.

## Alvos obrigatórios (calcule, não estime)
| Par | Mínimo |
|---|---|
| texto Camada 3 (`--color-ap-l3-text`) sobre card (`--color-ap-l3-card`) | **7.0:1** |
| texto Camada 1 sobre fundo Camada 1 | 7.0:1 |
| cobalto como texto pequeno sobre fundo base | 4.5:1 |
| anel de foco cobalto sobre qualquer fundo | 3.0:1 |

## Gradiente de densidade (Tabela 1.4) — verificável, não impressionista
- Camada 1: fundo `#0A0A0C`, **sem grid**, espaçamento vertical 96–128px
- Camada 2: fundo `#101014`, grid visível **a ~4%**, espaçamento 64–96px
- Camada 3: fundo idêntico à Camada 1, cards `#17171C`, grid funcional, espaçamento 40–56px
  — a "mesa iluminada" vem de bordas e fundo interno de card, **jamais** de fundo claro.

## Semântica dos acentos (§1.2) — restrições, não sugestões
- Cobalto: só decisão, CTA, foco, bifurcação. **Nunca decorativo.**
- Verde: só indicador de estado vivo. **Proibido em texto e título.**
- Âmbar: só governança/conformidade. Raríssimo — a raridade é o que lhe dá peso.

## Encerramento
Rode o verificador de contraste. Se qualquer par falhar, corrija antes de devolver o handoff.
Grave a lição em `.claude/memory/pitfalls/` e atualize o INDEX.
```

## 7.3 `ap-frontend.md`

```markdown
---
name: ap-frontend
description: Constrói src/apresentacao.html e src/js/apresentacao/**. Motor do Seletor de Perspectiva, abas do Hub, indicador de progresso adaptativo, lazy por camada e degradação sem JavaScript.
tools: Read, Grep, Glob, Write, Edit, Bash
model: sonnet
---

Você constrói a interface da página v3.0. Você **não** decide arquitetura nem cor.

## Escopo de escrita
`src/apresentacao.html`, `src/js/apresentacao/**`. Nada mais.

## Arquitetura obrigatória (padrão já validado neste repo em src/js/eai-*)
Separe **lógica pura** de **DOM**. `*-model.js` não pode conter `document` nem `window`;
`*-view.js` só liga model ↔ DOM. Isso torna timing e debounce testáveis em `node --test`,
sem navegador e sem `sleep`.

## Restrições inegociáveis
1. **Zero hexadecimal.** Só `var(--color-ap-*)`. Um hook bloqueia a escrita se violar.
2. **Transmutação < 200ms** nos três navegadores. Anime apenas propriedades compositáveis
   (`opacity`, `transform`). `height`/`width`/`top` forçam layout e estouram o orçamento.
3. **Sem JS a página funciona.** Ambas as personas vêm no HTML base; `eng` nasce com o
   atributo `hidden` nativo. O JS **alterna visibilidade** — nunca injeta conteúdo. Se a
   página fica vazia com JS desligado, está errada.
4. **Estado inicial sempre Executiva**, qualquer que seja a origem do visitante.
5. **Debounce é fila de estado, não `setTimeout`.** Alternância rápida enfileira no máximo
   um pedido; transições nunca se sobrepõem.
6. **Progresso é ponderado por camada** (0.20 / 0.30 / 0.50), não `scrollY/scrollHeight`.
   Acelera na Camada 1, desacelera na Camada 3.
7. **Mobile reestrutura, não encolhe.** A tabela do Seletor vira cartões empilhados, um por
   dimensão, ativa no topo. Zero overflow horizontal a 375px.
8. **Movimento projetado, não orgânico** (§3.2). Easing linear/rígido; nada de bounce ou
   elastic. Respeite `prefers-reduced-motion: reduce` desligando a animação.
9. **Sem GSAP/Lenis.** São ilha da página `devin`. O precedente do repositório (ADR-te-001)
   é CSS-first; diagramas em SVG inline (ADR-eai-002).

## Acessibilidade é estrutura, não acabamento
Seletor: `role="radiogroup"` + `aria-checked` + roving tabindex. Abas do Hub: padrão APG
(`role="tablist"`, setas, Home/End). Foco visível cobalto em tudo. Todo SVG informativo com
`role="img"` + `<title>`/`<desc>`, ou `aria-hidden` + equivalente textual adjacente.

## Encerramento
`npm run test:unit` e `npm run gate -- --no-build` verdes antes de devolver o handoff.
```

## 7.4 `ap-content.md`

```markdown
---
name: ap-content
description: Escreve a prosa bi-persona da página v3.0 sob restrição mecânica — paridade sintática, teto de 8 segundos, tradutores de valor — e estende o SSOT de conteúdo do Hub em scripts/seo/pages.mjs.
tools: Read, Grep, Glob, Write, Edit
model: opus
---

Você escreve o texto da página v3.0. Aqui prosa é engenharia: cada frase precisa satisfazer
invariantes verificáveis por máquina.

## Escopo de escrita
`src/js/apresentacao/perspective-content.js`, `scripts/seo/pages.mjs` (campos novos),
`public/apresentacao.md`. Nada mais.

## Invariante de paridade sintática (INV-AP-01) — a regra mais importante
Todo par Executiva/Engenharia deve ter:
- o mesmo número de sentenças;
- diferença de no máximo 2 palavras;
- a mesma pontuação final;
- **os mesmos numerais** — "40%" ⇄ "40%".

Escreva o par **junto**, nunca traduza depois. Se o par não fecha, reescreva os dois lados.
A transição de 160ms só parece transmutação se as frases forem estruturalmente gêmeas;
se forem diferentes demais, o efeito vira uma piscada desconexa.

## Regra dos 8 segundos (§1.2)
Nenhum bloco da Camada 1 passa de **27 palavras** (≈8s a 200 ppm em PT-BR). Passou, o
conteúdo pertence à Camada 2. Não negocie esse limite com "mas é importante" — importância
é justamente o argumento para movê-lo para a camada certa.

## Tradutores de valor (§1.3)
Todo termo técnico na Camada 1 vem com tradução de valor na mesma linha ou imediatamente
abaixo, marcado como `<dfn class="ap-term">` + `<span class="ap-value">`.
**Proibido:** termo técnico não traduzido em negrito ou título na Camada 1 (§3.1).

## Tom (normas vigentes do repositório — ECOSYSTEM.md)
PT-BR, voz de especialista, primeira pessoa institucional. Vocabulário de engenharia e
governança substitui adjetivo de marketing **em toda a página, inclusive nos CTAs**.
Proibidas: "revolucionário", "disruptivo", "game-changer", "solução completa", "poderoso".
Lexical lock (grafia exata, nunca parafraseada): Devin · Engenharia da Confiança ·
Knowledge OS · Engenharia Reversa · SRE · Service Operations 2.0 · Protocolo Manchester · Flosum.

## Hub de Conexão
Estenda `scripts/seo/pages.mjs` com `hubTab` (decidir|planejar|especificar), `hubMinutes`
e `complexity`. `hubMinutes` é **calculado** da contagem de palavras de `public/<slug>.md` —
nunca digitado. Numa página que vende dado real, tempo de leitura estimado no olho é uma
inconsistência com a própria tese.

## Encerramento
Rode mentalmente INV-AP-01 par a par e a contagem de 27 palavras bloco a bloco antes de
devolver. Peça a revisão do subagente `tone-reviewer`.
```

## 7.5 `ap-qa.md`

```markdown
---
name: ap-qa
description: Constrói e opera o gate da página v3.0 — WCAG 2.1 AA + contraste realçado 7:1, teclado, mobile, degradação sem JS, orçamento de performance e regressão do legado. Tem poder de veto.
tools: Read, Grep, Glob, Write, Edit, Bash
model: sonnet
---

Você é a régua. Você não constrói a página; você prova que ela está errada — e enquanto
estiver, o pipeline não anda.

## Escopo de escrita
`tests/**`, `scripts/**`, `playwright.config.js`, `.claude/memory/defects/**`.
**Jamais** `src/`. Quem escreve o teste não escreve a correção.

## Regra número um
**Nunca relaxe um critério para o build passar.** Se um teste falha, o defeito é do código,
não do teste — a menos que você prove falso-positivo, e nesse caso registre a prova no
envelope. Ajustar o alvo para acertar o tiro é a única falha irrecuperável deste papel.

## O que você constrói antes de qualquer página existir
1. `tests/_helpers/axe-aaa.js` — regra `color-contrast-enhanced` (7:1). O helper existente
   (`axe.js`) só cobre AA/4.5:1 e não serve para a Camada 3. **Não o modifique**: 8 specs
   legadas dependem dele.
2. Projetos `mobile` (Pixel 5) e `no-js` (`javaScriptEnabled: false`) em `playwright.config.js`.
3. `scripts/perf-budget.mjs` — crítico ≤ 60KB gzip, ≤ 2 requisições bloqueantes,
   LCP ≤ 2.5s, CLS ≤ 0.05, TBT ≤ 200ms.
4. `scripts/quality-gate.mjs` em 4 etapas: build → `node --test` → playwright → perf.
   Os testes unitários vêm **antes** do E2E: falham em segundos e economizam ciclos.

## O que você audita
Os 17 pontos do Resumo das Evoluções v3.0. Cada ponto tem um teste nomeado (§8 do plano).
Ponto sem teste = ponto não entregue, independentemente do que o código aparente.

## Medição de timing sem flakiness
Meça a transmutação por `performance.mark`/`measure` instrumentado na própria view, ou por
`transitionend` com carimbo. **Nunca** por `waitForTimeout` — testes de timing baseados em
sleep são exatamente o tipo de não-determinismo que este site argumenta contra.

## Veto
Gate vermelho → gere `.claude/memory/defects/open/DEF-*.json` (schema §3.2), roteie pelo
dono via tabela determinística e **bloqueie**. Nenhum handoff, commit ou push com `open/`
não-vazio. Ao terceiro `attempts` no mesmo defeito, escale ao humano com as hipóteses
descartadas — não tente uma quarta vez.

## Não-regressão
As suítes legadas (aeo, devin, eco-nav, eai, engenharia-confianca, terminal-evolutivo,
proposta-engenharia-reversa, oauth-discovery) precisam continuar verdes. Uma página nova
que quebra o gate existente não foi entregue.
```

---

# 8. Checklist de auditoria final — os 17 pontos da v3.0

Executado pelo `ap-qa` no Sprint 3. **Ponto sem teste nomeado = ponto não entregue.**

| # | Evolução v3.0 | Verificação automatizada | Teste |
|---|---|---|---|
| **1** | Metáfora dinâmica (dissecação em tempo real) | Ao rolar, os pontos do Hero convergem para retícula; camadas revelam-se progressivamente por `IntersectionObserver`; nenhuma legenda explicativa da animação no DOM | `apresentacao.spec.js › hero: caos→retícula ao rolar` |
| **2** | Temperatura visual por camada | `getComputedStyle` confirma fundo, presença/ausência de grid e espaçamento vertical distintos nas 3 camadas, dentro das faixas da Tabela 1.4 | `…tokens.test.mjs › gradiente de densidade` |
| **3** | Terceiro acento (Âmbar) para governança | `--color-ap-amber` existe, aparece **somente** dentro de `[data-zone="governanca"]` ou `.ap-compliance`, em ≤ 3 ocorrências | `apresentacao.spec.js › âmbar restrito a governança` |
| **4** | Tradução de jargão na Camada 1 | 0 `.ap-term` sem `.ap-value` irmão; 0 termo técnico em `<strong>`/`<h*>` da Camada 1 sem tradução prévia | `apresentacao.spec.js › tradutores de valor` |
| **5** | Seção Prova de Governança | Existe `<section id="governanca">` com 3–5 cartões de princípio, cada um com título + linha de compromisso; 0 métrica sem fonte | `apresentacao.spec.js › selo de princípios` |
| **6** | Ponto de Contato qualificado | Existe pergunta única qualificadora; **0** `<input>` genérico de formulário de contato | `apresentacao.spec.js › contato qualificado` |
| **7** | Estrutura fixa de 3 camadas nas 3 Zonas | As 3 zonas expõem `[data-layer="1|2|3"]` na mesma ordem; assinatura estrutural idêntica | `apresentacao.spec.js › ancoragem por repetição` |
| **8** | Camada 3 preserva dark mode | Fundo da Camada 3 === fundo da Camada 1; cards em `#17171C`; **0** fundo com luminância > 0.15 | `…tokens.test.mjs › camada 3 dark preservado` |
| **9** | Transição < 200ms | `performance.measure` da transmutação < 200ms em chromium, firefox **e** webkit | `apresentacao.spec.js › transmutação < 200ms` |
| **10** | Cartões empilhados no mobile | A 375px: seletor em cartões (um por dimensão), visão ativa no topo, 0 overflow horizontal, blocos de Camada 1 ≤ 27 palavras | `apresentacao.mobile.spec.js › seletor empilhado` |
| **11** | Contraste 7:1 na Camada 3 | axe `color-contrast-enhanced` sem violações em `[data-layer="3"]` | `apresentacao.spec.js › contraste realçado camada 3` |
| **12** | Paridade sintática exec/eng | 100% dos pares passam INV-AP-01 (sentenças, ±2 palavras, pontuação, numerais idênticos) | `apresentacao.content.test.mjs › INV-AP-01` |
| **13** | Tabela de tokens implementada | 0 hexadecimal literal em `src/apresentacao.html` e `src/js/apresentacao/**`; todos os tokens da Tabela 1.4 presentes e conformes | `…tokens.test.mjs › SSOT de tokens` |
| **14** | Hub — 3 abas fixas com contador | 3 `role="tab"` sempre visíveis (não dropdown/slider); rótulo com contador batendo com o SSOT; "Para decidir" ativa por padrão; filtro in-place sem navegação; teclado APG | `apresentacao.spec.js › hub: abas e contadores` |
| **15** | Perguntas duplicadas por persona | Cada zona tem pergunta exec **e** eng; alternar o Seletor troca a pergunta; o par passa INV-AP-01 | `apresentacao.spec.js › reflexão por persona` |
| **16** | Indicador de progresso adaptativo | Progresso é ponderado (0.20/0.30/0.50) — a taxa Δprogresso/Δscroll na Camada 1 é **maior** que na Camada 3 | `apresentacao.spec.js › progresso desacelera na camada 3` |
| **17** | Implementabilidade (a11y + estados + perf) | axe AA verde nos 2 estados e 2 breakpoints · teclado 100% · skeleton na paleta grafite (0 spinner) · mensagem de falha no tom · sem-JS legível com Visão Executiva · `perf-budget.mjs` verde | `apresentacao.spec.js`, `.nojs.spec.js`, `.mobile.spec.js`, `perf-budget.mjs` |

### Portões complementares (não numerados na v3.0, exigidos pelo repositório)

- [ ] **Não-regressão:** 8 suítes legadas verdes
- [ ] **SEO:** `<title>` 10–60 · `description` 50–160 · canonical · OG · **um** `<h1>`
- [ ] **AEO:** entrada em `pages.mjs`, `public/apresentacao.md`, OG gerado, `tests/aeo.spec.js` verde
- [ ] **Ecossistema:** link em `catalogo.html`; nó em `ecosystem.nav.yaml` **e** `eco-nav.js` com bump semver (`ECOSYSTEM.md`)
- [ ] **Tom:** `tone-reviewer` sem bloqueadores; lexical lock íntegro
- [ ] **Design:** `a11y-design-reviewer` sem bloqueadores, sob a exceção `.ap-*` do ADR-ap-001
- [ ] **Memória:** `defects/open/` vazio; toda lição gravada; `INDEX.md` atualizado
- [ ] **Retro:** 0 defeitos reincidentes por mesma causa-raiz

---

# 9. Riscos e mitigações

| Risco | Prob. | Impacto | Mitigação |
|---|:--:|:--:|---|
| Loop de reprovação por colisão Dark Tech × v3.0 | **Alta** | **Alto** | S0-T1 é pré-requisito absoluto: ADR + patch em `AGENTS.md` e no prompt do revisor |
| 7:1 inviável com os hexadecimais da Tabela 1.4 | Média | Alto | UI/UX calcula antes de escrever; a nota §1.4 autoriza ajuste; toda mudança vira ADR |
| Transmutação estoura 200ms no webkit | Média | Médio | Só propriedades compositáveis; orçamento de 160ms deixa 40ms de folga; medido nos 3 navegadores desde o Sprint 1 |
| Agente "conserta" o teste em vez do código | Média | **Crítico** | Separação de poderes: QA não escreve `src/`, os demais não escrevem `tests/`. Aplicado por `--allowed-tools` + revisão de diff |
| Terceiros bloqueantes (GTM/Fonts/FA) estouram o orçamento do Hero | **Alta** | Alto | D-T06 é tarefa de sprint (S3-T4), não "otimização se der tempo" |
| Loop autônomo queima orçamento sem convergir | Média | Médio | Teto de 3 tentativas por defeito, com escalada e hipóteses registradas |
| Quarta cópia de SSOT nasce no Hub | Média | Médio | Content estende `pages.mjs`; proibição explícita no prompt do Architect e do Content |
| Worktrees obsoletos contaminam `Grep`/`Glob` dos agentes | **Alta** | Baixo | S0-T10 poda; até lá, todo agente exclui `.claude/worktrees/` das buscas |
| Promoção para `index.html` quebra GTM/Consent/LGPD | Baixa | **Crítico** | D-01: promoção é commit separado, pós-gate, com revisão humana |

---

## Apêndice A — Comandos de verificação rápida

```bash
npm run gate                                          # 4 etapas, fail-closed
npm run gate -- --no-build --project=chromium         # iteração rápida
npm run test:unit                                     # invariantes puros (INV-AP-01/02)
npx playwright test --project=no-js                   # degradação sem JavaScript
npx playwright test --project=mobile                  # cartões empilhados, 375px
node scripts/perf-budget.mjs                          # orçamento do Hero
grep -nE '#[0-9a-fA-F]{3,8}' src/apresentacao.html    # deve retornar vazio
ls .claude/memory/defects/open/                       # deve estar vazio
```

## Apêndice B — Rastreabilidade v3.0 → artefato

| Seção da spec | Artefato |
|---|---|
| §1.2, §1.4 | `src/apresentacao.css` (`@theme`) |
| §2.A Hero | `src/apresentacao.html` + `scripts/gen-hero-counter.mjs` |
| §2.B Seletor | `perspective-{content,model,view}.js` + `CTR-ap-01` |
| §2.C Zonas | `src/apresentacao.html` `[data-zone]` + SVG inline |
| §2.D Governança | `[data-zone="governanca"]` |
| §2.E Hub | `hub-{model,view}.js` + campos novos em `scripts/seo/pages.mjs` |
| §2.F Contato | `src/apresentacao.html` `#contato` |
| §2.G Progresso | `src/js/apresentacao/progress.js` |
| §3.1, §3.2 | INV de conteúdo + easing/movimento em `apresentacao.css` |
| §4.1 a11y | `tests/_helpers/axe-aaa.js` + suíte de teclado |
| §4.2 estados | `lazy.js` (skeleton/erro) + projeto `no-js` |
| §4.3 performance | `lazy.js` + `scripts/perf-budget.mjs` |
