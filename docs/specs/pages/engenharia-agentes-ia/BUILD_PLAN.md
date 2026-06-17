# BUILD_PLAN — Construção Autônoma do site `engenharia-agentes-ia`

> **Meta.** Desenvolver a página `src/engenharia-agentes-ia.html` (e auxiliares) a partir dos 12 SDDs
> desta pasta, de forma **autônoma, testada, versionada e com custo de tokens governado** — aplicando
> ao próprio processo os princípios que o site ensina (*dogfooding*).
>
> **Princípio-mestre:** este plano segue o [`guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md):
> contexto e gates **primeiro**, código depois; o estado cognitivo vive no Git; testes são a defesa
> contra a "alucinação sintática"; e **autonomia sem teto de custo é risco, não funcionalidade**.

---

## 0. Mapa de *dogfooding* (qual lição governa qual prática)

| Lição do treinamento | Como este build a aplica |
| :-- | :-- |
| LLM é componente, não piloto (P1) | O **fluxo é determinístico**: `PROGRESS.md → DoR → implementa → gate → commit → push`. O agente decide *como* codar uma fatia, nunca *qual* será a próxima fora da fila. |
| Determinismo testável (P2) | Gate roda **offline** (sem rede), Playwright com fixtures; mesma fatia → mesmo resultado verde. |
| Contratos rígidos (P5) | Cada Work Unit (WU) tem **contrato de saída** (seções, IDs, testes alvo). Saída fora do contrato = gate vermelho. |
| Open-World / fail-closed (P7, P9) | Faltou algo no DoR → `BLOCKED:` honesto, **não adivinha**. Teste ausente ⇒ comportamento considerado quebrado. |
| FinOps com ledger (P8) | **Orçamento de tokens por onda**, model routing, "falhar e parar" ao atingir o teto. |
| Governança fail-closed (P9) | **DoR/DoD por WU**, push só com gate verde, `PROGRESS.md` versionado. |
| Anatomia do repositório (doc 10) | Cria `.ai/state/PROGRESS.md`, skills, governança, gates **antes** do primeiro componente. |

---

## 1. Stack e restrições reais (verificadas no repo)

- **Build:** Vite 6 · **Tailwind v4** (plugin `@tailwindcss/vite`, *não* CDN) · Vanilla ES6 modules.
- **Animação:** `gsap`, `lenis` (scroll), `split-type` — já instalados. **Reuso obrigatório** (não
  adicionar libs concorrentes). BPMN/D3/Cytoscape só entram em V1/V2 e **exigem ADR** (peso de bundle).
- **Páginas:** cada feature é um `.html` em `src/` (auto-descoberto). Alvo: `src/engenharia-agentes-ia.html`;
  o **Playground** pode virar `src/engenharia-agentes-ia-playground.html` na V2 (ver doc 06/09).
- **Testes:** Playwright (`tests/*.spec.js`), dev-server sobe sozinho (`webServer`).
- **CI atual (`.github/workflows/deploy.yml`):** push na `main` → `build` → **deploy S3/CloudFront**.
  ⚠️ **Não há gate de teste no CI.** Portanto: **(a)** o gate roda **localmente antes do push**;
  **(b)** este plano adiciona um workflow de teste (WU-0) que **bloqueia** regressões.
- ✅ **Tema: somente Dark** (decisão do build). Adere ao guardrail do `AGENTS.md` ("Pure Dark Mode").
  O **modo claro** descrito no [doc 07](07_direcao_de_arte_e_animacoes.md) fica **diferido** (fora do
  escopo do build autônomo) — não há toggle nem `prefers-color-scheme` claro nesta entrega. Contraste
  **AA** é verificado apenas no tema escuro.

---

## 2. WU-0 — Fundação Agent-Driven (contexto e gates ANTES do código)

> Sem isto, "um agente solto numa estrutura incompleta gera dívida mais rápido que valor". WU-0 é
> pré-requisito de todas as outras WUs.

**Artefatos a criar:**

- `.ai/state/PROGRESS.md` — âncora de estado: onda atual, próxima ação, fila de WUs, histórico,
  ledger de tokens da onda, lista de `BLOCKED:`. Lido no início e atualizado no fim de cada iteração.
- `.ai/learnings.md` — lições recorrentes (para não tropeçar duas vezes).
- `.agents/skills/build-eai-section/SKILL.md` — procedimento padrão para implementar **uma seção** da
  página a partir do SDD correspondente (ler SDD → criar markup semântico → tokens → animação → teste).
- `.agents/skills/run-quality-gate/SKILL.md` — como rodar o gate e interpretar falhas.
- `docs/governance/dor-dod-eai.md` — DoR/DoD desta entrega (§4).
- `docs/decisions/ADR-eai-001-build-autonomo-e-finops.md` — política de ondas, model routing, teto de
  tokens (perfil **moderado**) e **push direto na `main`** a cada WU verde.
- `tests/engenharia-agentes-ia.spec.js` — suíte inicial (smoke) que evolui por WU.
- `tests/_helpers/axe.js` — helper de acessibilidade (axe-core via `@axe-core/playwright`).
- `scripts/quality-gate.mjs` — **gate único** (build + testes + a11y + checagens), com **código de
  saída**: 0 verde, ≠0 vermelho. Reuso em local e CI.
- `.github/workflows/test.yml` — roda `npm run gate` em **PR e push** (gate de regressão, separado do
  deploy).
- `package.json` scripts: `"test": "playwright test"`, `"gate": "node scripts/quality-gate.mjs"`,
  `"test:a11y"`, `"test:lh"` (lighthouse budget).

**DoD do WU-0:** `npm run gate` roda verde com a página *stub* (só `<head>` + hero placeholder);
workflow de teste ativo; ADRs e DoR/DoD commitados.

---

## 3. Estratégia de testes (BDD → Playwright)

Cada WU traz **três eixos de cenário** (espelha o DoR do treinamento):

1. **Caminho feliz** — a seção renderiza, IDs/âncoras existem, conteúdo-chave visível, navegação liga.
2. **Degradado** — sem JS / `prefers-reduced-motion: reduce` / viewport mobile: conteúdo continua
   legível e utilizável (animação some, não quebra layout).
3. **Open-World / a11y** — equivalentes textuais das visualizações presentes; axe sem violações
   *serious/critical*; foco por teclado alcança todo interativo.

**Camadas do gate (`scripts/quality-gate.mjs`, tudo offline):**

- `vite build` — falha de build = vermelho.
- `playwright test` (chromium+firefox+webkit) — smoke + comportamento por seção.
- **a11y:** `@axe-core/playwright` em cada seção (0 violações serious/critical).
- **responsivo/reduced-motion:** projetos mobile + emulação de `reduce`.
- **orçamento de performance (Lighthouse CI):** budget de LCP/CLS/JS-size (V1+).
- **higiene:** sem `test.only`, links internos válidos, sem `console.error` na carga.

> **Regra de ouro (P9):** "se o comportamento não está coberto por um cenário, considere-o quebrado".
> Nada entra na `main` sem o gate verde.

---

## 4. DoR e DoD (gates por Work Unit)

**Definition of Ready (entra na fila):**
- [ ] SDD-fonte identificado (qual doc/seção desta pasta).
- [ ] Contrato de saída definido: seções, IDs/âncoras, componentes do catálogo (doc 03), tokens (doc 07).
- [ ] 3 eixos de cenário esboçados (feliz/degradado/a11y).
- [ ] Dependências resolvidas (tokens/base layout já existem) — senão, ordena antes.
- [ ] Zero decisão de design em aberto (se cruzar fronteira/lib nova → ADR primeiro).
- [ ] Fatiável em 1 sessão dentro do orçamento de tokens da onda.

**Definition of Done (vira pronto):**
- [ ] `npm run gate` **verde** local (build + Playwright + axe).
- [ ] Conteúdo **fiel ao SDD** e ao guia-fonte (sem invenção de escopo).
- [ ] Identidade visual conforme doc 07 (Dark + claro opt-in); polimento (§9) aplicado.
- [ ] Commit convencional + **push na `main`** com CI de teste verde (= deploy).
- [ ] `PROGRESS.md` atualizado (estado + ledger de tokens + lições).
- [ ] **Fail-closed:** se algo faltou, `BLOCKED:` registrado e parada limpa — **não** marca Done.

---

## 5. Decomposição em Work Units e Ondas

Fatias **verticais** (cada uma entrega seção navegável + testada). Ondas alinhadas ao roadmap do
[doc 09](09_roadmap_esforco_riscos.md): **MVP → V1 → V2**.

### Onda MVP — esqueleto + trilha + conteúdo estático animado

| WU | Escopo | SDD-fonte | Modelo sugerido | Tam. |
| :-- | :-- | :-- | :-- | :-- |
| WU-0 | Fundação (§2) | doc 10, este plano | Opus | M |
| WU-1 | Shell da página: `<head>`/SEO, tokens claro/escuro, nav de trilha, footer, Lenis | 07, 03, 01 | Opus (arquitetura) | M |
| WU-2 | **Hero** "pouca IA no caminho crítico" (sistema caótico × disciplinado) | 03, 04 V10 | Opus (visual) | A |
| WU-3 | Área **Princípios** (10 cards) + roteamento de âncoras | 01, 02, 03 | Sonnet | M |
| WU-4 | **Jornada** (estrutura dos 10 capítulos, sem interações pesadas) | 02 | Sonnet | A |
| WU-5 | **Governança Agent-Driven** (masonry: dicionário, dir-tree, banners, comparativo) | 10, 03 | Sonnet | M |
| WU-6 | **Referência** (glossário, 10 princípios, fontes) + Casos Reais estático | 01, 09 | Haiku/Sonnet | P |
| WU-7 | Visualizações **SVG/CSS** estáticas-animadas (GSAP) dos princípios | 04, 07 | Opus (polish) | A |

### Onda V1 — interatividade

| WU | Escopo | SDD-fonte | Modelo |
| :-- | :-- | :-- | :-- |
| WU-8 | **Simulador de arquitetura** (sliders → medidores, modelo determinístico) | 06 §1 | Sonnet+Opus |
| WU-9 | **Evals**: Erro de Sistema × Erro de Modelo no simulador | 06 §1.7 | Sonnet |
| WU-10 | **BPMN read-only** com overlays/hotspots (decisão de lib via ADR) | 05 §1–§6 | Opus |
| WU-11 | Quizzes/gates de progressão da Jornada | 02 | Sonnet |

### Onda V2 — laboratórios

| WU | Escopo | SDD-fonte | Modelo |
| :-- | :-- | :-- | :-- |
| WU-12 | **Playground** drag-and-drop + regras de avaliação | 06 §2 | Opus |
| WU-13 | **BPMN editável** (Saga/DLQ, roteamento por confiança) | 05 §6–§8 | Opus |
| WU-14 | Dashboard de aprendizagem + métricas client-side | 08 | Sonnet |

> Tamanhos: **P/M/A** ≈ pequeno/médio/alto esforço. A fila canônica vive em `PROGRESS.md`; este
> documento é a visão, o `PROGRESS.md` é a verdade operacional.

---

## 6. Loop autônomo de execução (o protocolo)

Cada **iteração** (uma WU) segue exatamente:

```
1. LER  .ai/state/PROGRESS.md  → pegar a próxima WU da fila e o ledger de tokens da onda.
2. DoR  revalidar o DoR da WU. Falta algo essencial? → escrever "BLOCKED: <motivo>", parar limpo.
3. PLAN (subagente Plan/Explore, read-only) desenha a fatia lendo SÓ o SDD relevante.
4. TEST escrever/atualizar os 3 cenários Playwright da WU (alvo executável) ANTES do markup.
5. CODE implementação mínima que satisfaz o contrato de saída e os testes.
6. GATE `npm run gate`. Vermelho → corrigir (até N tentativas); estourou N → BLOCKED, parar.
7. COMMIT convencional (`feat(eai): WU-x ...`).
8. PUSH  para a `main` → CI de teste verde → deploy. (Ver política em §8.)
9. STATE atualizar PROGRESS.md (feito, próxima ação, tokens gastos, lição) e voltar ao passo 1.
```

- **Resumível (ondas):** a iteração processa **só a próxima WU**; o `PROGRESS.md` permite retomar
  entre sessões/janelas de orçamento sem reler todo o contexto.
- **Fail-closed:** qualquer impedimento vira `BLOCKED:` honesto — nunca um "Done" falso.
- **Execução no Claude Code:** usar `/loop` para auto-pacing entre WUs; um WU por iteração mantém o
  contexto enxuto.

---

## 7. FinOps de tokens — controle de custo e *model routing*

> Materializa o **alerta financeiro** do doc 10 e o ledger de P8: "falhar e parar" ao atingir o teto.

### 7.1 Ledger e teto (fail-and-stop)

- **Perfil escolhido: Moderado** — a onda completa **algumas WUs** e então **para para revisão**
  humana antes de seguir (não tenta fechar a onda inteira de uma vez).
- `PROGRESS.md` mantém um **ledger por onda**: orçamento alvo de tokens e gasto acumulado.
- Cada iteração começa checando `remaining`. **Sem orçamento ⇒ não inicia nova WU**: registra
  "pendente por orçamento" (não-erro) e para num ponto seguro (espelha a DLQ "pendente por orçamento"
  de [05 §7.3](05_bpmn_diagramas_executaveis.md)).
- **Limite de tentativas por WU:** N (sugerido 3) idas ao gate; estourou ⇒ BLOCKED, não insiste para
  sempre (evita loop de tentativa-e-erro que queima fatura).

### 7.2 Roteamento de modelos (tirar o melhor de cada)

| Tarefa | Modelo | Porquê |
| :-- | :-- | :-- |
| Arquitetura da página, design visual do Hero, polimento, **revisão editorial** | **Opus 4.8** | decisões de alto impacto e qualidade visual/conteúdo; erro aqui se propaga |
| Implementação de componentes/seções já especificadas | **Sonnet** | bom custo-benefício para código guiado por contrato |
| Mecânico: scaffolds de teste, glossário, checagem de links, ajustes repetitivos | **Haiku** | barato para trabalho determinístico de baixo julgamento |
| Busca/leitura ampla do repo e SDDs | subagente **Explore** (read-only) | mantém o contexto da thread principal enxuto |
| Desenho de fatia antes de codar | subagente **Plan** | isola raciocínio, não polui a janela principal |

- **Fast mode (Opus)** para iterações de UI onde velocidade ajuda, sem perder capacidade.

### 7.3 Higiene de contexto (reduz tokens sem perder qualidade)

- **Um WU por sessão**; ler **apenas** o SDD da WU (não a pasta inteira).
- `AGENTS.md` + `SKILL.md` estáveis → aproveitam **cache de prompt**; não recolar SDDs grandes a cada
  passo.
- Usar `PROGRESS.md` como resumo de estado em vez de reconstruir contexto.
- Preferir **edições cirúrgicas** (diff pequeno) a reescritas de arquivo inteiro.
- Compactar/encerrar a sessão ao fim de cada onda.

---

## 8. Versionamento e política de push

- **Conventional commits** com escopo `eai`: `feat(eai):`, `test(eai):`, `fix(eai):`, `docs(eai):`.
- **Política escolhida: push direto na `main` a cada WU verde.** Sequência por WU: gate **local**
  verde → commit → **push na `main`**. O **CI de teste (WU-0)** roda o gate também no push como rede
  de segurança; nunca `--force`.
- ⚠️ **`main` = produção** (deploy automático) → cada WU verde **publica na hora**. Mitigações
  obrigatórias para não expor seção meio-pronta: **gate local verde antes de todo push** e WU
  incompleta sempre atrás de **feature flag / seção `hidden`** até estar apresentável. A primeira WU a
  tornar a página visível no menu/sitemap é a que "abre as cortinas".
- **Rollback:** como `.ai/state` e código são versionados juntos (Regra de Ouro do doc 10), reverter
  um commit recupera **código + estado cognitivo** simultaneamente.

---

## 9. Qualidade visual e de conteúdo (definição de "alta qualidade")

**Checklist de polimento visual (DoD de WUs de UI):**
- Tokens do doc 07 (sem cores *hardcoded*); contraste **AA** verificado no tema **escuro** (único).
- Ritmo tipográfico e espaçamento consistentes; densidade "developer-centric" (Linear/Vercel/Stripe).
- Microinterações **pedagógicas** (doc 07): toda animação ensina algo; respeitam `reduced-motion`.
- Hover/foco/active com *glow* sutil; sem *layout shift* (CLS≈0).
- Estados vazios/erro/carregando tratados.

**Checklist de qualidade de conteúdo:**
- **Fidelidade ao guia-fonte** (sem inventar conceito); rastreabilidade ao princípio correspondente.
- Tom direto e intelectual, PT-BR (consistente com `devin/`).
- **Passe editorial com Opus** ao fim de cada onda: clareza, progressão pedagógica, ausência de jargão
  vazio.

---

## 10. Riscos e mitigação

| Risco | Mitigação |
| :-- | :-- |
| **Token runaway** (loop caro) | Ledger por onda + limite de tentativas + fail-and-stop (§7). |
| **Push na `main` quebra produção** | Gate **local** verde obrigatório antes do push; CI de teste como 2ª rede; WU incompleta atrás de feature flag/`hidden` (§8). |
| Tema | **Somente dark** (adere ao `AGENTS.md`); modo claro do doc 07 diferido. |
| Regressão visual entre WUs | Snapshots Playwright + budget Lighthouse na V1. |
| Libs pesadas (BPMN/D3) inflam bundle | ADR antes de adicionar; carregamento *lazy*/por rota. |
| "Alucinação sintática" (código bonito, errado) | Testes-alvo escritos **antes** do código (passo 4 do loop). |
| Especificação perecível | Detalhar WU só ao entrar na janela de execução (WIP de spec enxuto). |

---

## 11. Próximos passos imediatos

1. Executar **WU-0** (fundação): cria `.ai/state/PROGRESS.md`, `scripts/quality-gate.mjs`, CI de
   teste (`.github/workflows/test.yml`), ADR-eai-001, DoR/DoD e a suíte Playwright inicial.
2. Abrir a onda **MVP** pela fila do `PROGRESS.md` (WU-1 → WU-7), **uma WU por iteração**, sob o loop
   §6, parando para revisão conforme o perfil **moderado**.

> **Decisões humanas — RESOLVIDAS:**
> - ✅ **Push direto na `main`** a cada WU verde (deploy a produção); gate local verde + CI de teste +
>   feature flag para o que estiver incompleto.
> - ✅ Orçamento de tokens por onda: **perfil moderado** (fecha algumas WUs, para para revisão).
> - ✅ Tema **somente dark** (modo claro do doc 07 diferido; adere ao `AGENTS.md`).
