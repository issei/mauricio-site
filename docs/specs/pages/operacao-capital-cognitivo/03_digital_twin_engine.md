# 03 — Digital Twin Engine

> Cobre o entregável **6 (Digital Twin Engine: estado, equações, state machine e pseudo-código)**.
> Especificação técnica do motor de simulação em memória — implementado como módulo JS puro
> (`src/js/operacao-capital-cognitivo/digital-twin.js`).

---

## 1. Arquitetura Geral

O Digital Twin é um objeto singleton em memória que representa o estado da *Nexus Tech Corp*.
Toda lógica de cálculo é **determinística e testável** — sem chamadas externas, sem aleatoriedade
interna (aleatoriedade é injetada pelo `RandomEventEngine`, ver [06](06_eventos_aleatorios_simulacao.md)).

```
                    ┌────────────────────────────────────┐
                    │         DigitalTwinEngine          │
                    │                                    │
                    │  state: DigitalTwinState           │
                    │                                    │
                    │  + stepQuarter(decisions, event?)  │
                    │  + getState()                      │
                    │  + reset()                         │
                    │  + getHistory()                    │
                    └────────────────────────────────────┘
                              │ lê/escreve
                              ▼
                    ┌────────────────────────────────────┐
                    │         DigitalTwinState           │
                    │                                    │
                    │  finances, operations, technical,  │
                    │  social, metrics, currentQuarter   │
                    └────────────────────────────────────┘
```

---

## 2. Modelo de Estado Completo

```javascript
// src/js/operacao-capital-cognitivo/digital-twin.js

/**
 * @typedef {Object} DigitalTwinState
 * @property {'Q0_INTRO'|'Q1'|'Q2'|'Q3'|'Q4'|'BOARD'|'VICTORY'|'FAILURE'} currentPhase
 * @property {Object} finances
 * @property {number} finances.cashBalance          - R$ em caixa
 * @property {number} finances.monthlyBudget        - R$ orçamento mensal (100_000)
 * @property {number} finances.apiCost              - R$ custo de API no trimestre
 * @property {number} finances.infrastructureCost   - R$ RAG / VectorDB / Observabilidade
 * @property {number} finances.humanReworkCost      - R$ custo do tempo dev/humano
 * @property {number} finances.resentContextCost    - R$ custo de contexto reenviado (cascata agêntica)
 * @property {number} finances.operatingMargin      - % margem operacional (0.0–1.0)
 * @property {Object} operations
 * @property {number} operations.monthlyRequests    - Volume de chamadas por mês
 * @property {number} operations.firstPassAccuracy  - Rm (0.0–1.0)
 * @property {number} operations.slaCompliance      - % requisições dentro do SLA (0.0–1.0)
 * @property {number} operations.customerChurn      - % perda de clientes (0.0–1.0)
 * @property {number} operations.verificationLoad   - V_core: índice de Carga de Verificação (0–100)
 * @property {Object} technical
 * @property {number} technical.technicalDebt       - % acúmulo de débito técnico (0–100)
 * @property {number} technical.hallucinationRate   - % respostas incorretas (0.0–1.0)
 * @property {boolean} technical.useRouteLLM        - Roteamento semântico ativo?
 * @property {number} technical.slmRatio            - Proporção de prompts roteados p/ SLM (0.0–1.0)
 * @property {number} technical.ragDepth            - Profundidade RAG (1–5)
 * @property {'off'|'conditional'|'universal'} technical.ragReranking - Estratégia de reranking semântico
 * @property {number} technical.testTimeComputeLevel - Nível de Test-Time Compute (1–5)
 * @property {boolean} technical.semanticCaching    - Cache semântico de prompts ativo?
 * @property {number} technical.avgContextTokens    - Tamanho médio do contexto por chamada (tokens)
 * @property {boolean} technical.multiAgent         - Workflow multiagente ativo?
 * @property {boolean} technical.agentIsolation     - Isolamento de contexto entre agentes?
 * @property {Object} social
 * @property {number} social.devTeamMoral           - Moral da equipe (0–100)
 * @property {number} social.boardConfidence        - Confiança do Conselho (0–100)
 * @property {Object} social.stakeholderTrust       - Confiança por stakeholder (0–100 cada)
 * @property {Object} metrics
 * @property {number} metrics.globalUI              - Useful Intelligence per Dollar
 * @property {number} metrics.cognitiveCapitalIndex - Capital Cognitivo composto (0–100)
 * @property {Object} selectedModel
 * @property {number} selectedModel.baseAccuracy    - Rm base do modelo selecionado
 * @property {number} selectedModel.claimedAccuracy - Acurácia declarada/benchmark (para overconfidenceGap)
 * @property {number} selectedModel.pricePerToken   - R$/1k tokens
 * @property {number} selectedModel.latenciaPrimeiraCompilacao - Minutos até 1ª compilação OK (sinal s3 do V_core)
 */

export const INITIAL_STATE = {
  currentPhase: 'Q0_INTRO',
  finances: {
    cashBalance: 850_000,
    monthlyBudget: 100_000,
    apiCost: 3_000,
    infrastructureCost: 0,
    humanReworkCost: 37_000,
    resentContextCost: 0,
    operatingMargin: 0.18,
  },
  operations: {
    monthlyRequests: 10_000,
    firstPassAccuracy: 0.42,  // Model-Lite padrão inicial
    slaCompliance: 0.71,
    customerChurn: 0.08,
    verificationLoad: 68,     // V_core inicial alto — equipe já em fadiga
  },
  technical: {
    technicalDebt: 35,
    hallucinationRate: 0.12,
    useRouteLLM: false,
    slmRatio: 0.0,
    ragDepth: 1,
    ragReranking: 'off',
    testTimeComputeLevel: 1,
    semanticCaching: false,
    avgContextTokens: 8_000,
    multiAgent: false,
    agentIsolation: true,
  },
  social: {
    devTeamMoral: 50,
    boardConfidence: 60,
    stakeholderTrust: {
      helena: 55,
      aris: 70,
      sarah: 45,
      marcus: 40,
      clara: 60,
    },
  },
  metrics: {
    globalUI: 0,
    cognitiveCapitalIndex: 0,
  },
  selectedModel: {
    baseAccuracy: 0.42,
    claimedAccuracy: 0.85,   // Model-Lite é overconfident: declara 85%, entrega 42%
    pricePerToken: 0.001,
    latenciaPrimeiraCompilacao: 22,  // minutos
  },
};
```

---

## 3. Equações de Estado e Dinâmica de Sistemas

### 3.1 TCO Mensal

```
TCO_mensal = C_api_efetivo + C_infra + C_humano

Onde:
  C_api_efetivo = ver 3.3 (RouteLLM) → 3.3b (cache semântico) → 3.3c (cascata agêntica)
  C_infra       = C_rag + C_observabilidade + (useRouteLLM ? 2000 : 0)   // ver 3.3d
  C_humano      = M × (1 - Rm) × T_revisao × R_hora_humana × fatorFadiga  // ver 3.8
  M             = operations.monthlyRequests
  Rm            = operations.firstPassAccuracy (efetiva, pós-stack; ver 3.2)
  T_revisao     = 0.5 horas por falha (constante configurável)
  R_hora_humana = R$ 120/hora (constante configurável)
```

> **Nota editorial:** O `fatorFadiga` (3.8) é a incorporação matemática da tese do EVID_08 — o custo
> humano da IA incorreta é **não-linear**: quanto maior a Carga de Verificação ($V_{core}$), mais
> cara fica cada hora de revisão, porque a fadiga reduz a vazão útil do revisor.

### 3.2 First-Pass Accuracy Efetiva (pós-stack)

```
Rm_efetiva = clamp(0.05, 0.99,
  baseAccuracy
  + ragDepth × 0.04
  + rerankBonus                 // ver 3.3d
  + testTimeComputeLevel × 0.05
  - overthinkingPenalty
  - contextRotPenalty           // ver 3.4b — "fim do mito da janela infinita"
)

overthinkingPenalty = (testTimeComputeLevel > 3 AND workloadComplexity < 2) ? 0.08 : 0.0
```

> **Nota para o desenvolvedor:** `workloadComplexity` é um parâmetro fixo por capítulo (1 = simples,
> 2 = médio, 3 = complexo) definido em `chapter-5.js` via `setWorkloadComplexity(n)`.

### 3.3 Economia de RouteLLM + SLM

```
Se useRouteLLM == true:
  C_api_pos_route = C_api × (1 - slmRatio × 0.55)

Explicação: slmRatio define a proporção de prompts redirecionados ao SLM.
  Um SLM tem custo ~55% menor que o LLM principal.
  slmRatio = 0.6 → economia de 0.6 × 55% = 33% sobre o C_api bruto.
```

### 3.3b Cache Semântico (Semantic Caching) — alavanca primária de FinOps

```
Se semanticCaching == true:
  cacheHitRate = min(0.7, repetitividadeDaCarga)   // default do Cap. 5: 0.40
  C_api_pos_cache = C_api_pos_route × (1 - cacheHitRate × 0.75)

Explicação: chamadas repetitivas resolvidas por cache pagam 50%–90% menos por token
  (adotamos 75% médio). O ganho é sobre o volume que atinge o cache, não sobre a fatura inteira.
  cacheHitRate = 0.40 → economia efetiva de 0.40 × 75% = 30% sobre o C_api roteado.
```

> **Nota editorial:** O cache semântico ataca **custo**, não **acurácia** — é ortogonal ao Context
> Rot (3.5b). Reforçar no Cap. 5 que ligar o cache não "conserta" a degradação de contexto longo.

### 3.3c Cascata de Erros Agêntica (Efeito Ricochete / re-sent context)

```
Se multiAgent == true:
  cascadeFactor = agentIsolation
    ? 0.15                              // contexto isolado limita a propagação
    : min(0.62, 0.20 + (1 - Rm_efetiva) × 0.9)   // até 62% da fatura é contexto reenviado

  finances.resentContextCost = C_api_pos_cache × cascadeFactor
  C_api_efetivo = C_api_pos_cache + finances.resentContextCost
Senão:
  finances.resentContextCost = 0
  C_api_efetivo = C_api_pos_cache
```

Explicação (EVID_09): em workflows multiagentes, alucinações do agente inicial propagam-se
topologicamente. Cada agente a jusante recebe e reprocessa o contexto contaminado — o *re-sent
context* pode representar **até 62% da fatura agêntica**. Sem isolamento de contexto, o custo
não é a soma de tentativas independentes; é combinatório.

### 3.3d Economia Real de RAG (custo de índice, não de embedding)

```
C_rag = ragDepth × C_embed_base            // C_embed_base = R$ 300/nível — geração é barata
      + indexMaintenance                    // overhead HNSW ≈ 1.5× o custo de embedding
      + reindexAmortized                    // ver abaixo
      + C_rerank                            // ver abaixo

indexMaintenance = ragDepth × C_embed_base × 0.5   // fator HNSW (1.5× total)

reindexAmortized = trocouDeModeloNoTrimestre
  ? (ragDepth × C_embed_base × 4)           // re-indexação TOTAL da base ao trocar de embedder
  : 0

C_rerank (por estratégia technical.ragReranking):
  'off'         → C_rerank = 0;                      rerankBonus = 0.00
  'conditional' → C_rerank = M × 0.05 × 0.02;        rerankBonus = 0.03   // só consultas de baixa confiança
  'universal'   → C_rerank = M × 0.35 × 0.02;        rerankBonus = 0.05   // +300ms latência/req (ver 3.7)
```

> **Nota para o desenvolvedor:** Substituir a simplificação anterior (`C_infra = ragDepth × 1500`)
> por este modelo. Expor `trocouDeModeloNoTrimestre` como flag setada quando o usuário muda de
> `selectedModel` entre trimestres — é o gatilho do custo de re-indexação. O reranking `universal`
> melhora Rm mas penaliza latência e custo; `conditional` é o ponto de eficiência (EVID_05 aplicado
> à camada de recuperação).

### 3.4 Cálculo do UI/$ Global

```
UI/$ = (M × Rm_efetiva) / TCO_mensal
```

> **Nota de coerência com o Cap. 3/4:** o denominador do UI/$ é o TCO completo (3.1) — ou seja,
> `C_api_efetivo + C_infra + C_humano`. Isso alinha a fórmula deduzida pelo usuário
> (`Trabalho Útil ÷ (Custo API + Custo Humano + Custo Infra)`) ao motor. Ver os três modelos
> formais complementares no [Cap. 4](02_jornada_6_capitulos.md).

### 3.4b Context Rot — Degradação de Contexto Longo (fim do mito da janela infinita)

```
contextRotPenalty =
  avgContextTokens <= 50_000
    ? 0
    : min(0.15, ((avgContextTokens - 50_000) / 50_000) × 0.10)

Exemplos:
  avgContextTokens = 50_000 → penalidade 0.00
  avgContextTokens = 100_000 → penalidade 0.10 (−10 p.p. de acurácia efetiva)
  avgContextTokens = 125_000 → penalidade 0.15 (teto)
```

Explicação (EVID_11): acima de ~50k tokens a acurácia degrada continuamente — a "janela massiva"
não é gratuita. O cache semântico (3.3b) **não** mitiga o rot; a mitigação real é curadoria de
contexto (RAG dirigido, resumo, janelas menores). No Cap. 5, quando `avgContextTokens > 50_000`,
o HUD exibe o indicador visual de Context Rot (ver [08](08_wireframes_catalogo_componentes.md)).

### 3.5 Efeito do Débito Técnico e da Carga de Verificação na Moral dos Devs

```
devTeamMoral(t) = devTeamMoral(t-1)
  - (β1 × technicalDebt)        // β1 = 0.15
  - (β2 × horasExtras)          // β2 = 0.20, horasExtras = max(0, (M × (1-Rm) × T_revisao) - 80)
  - (β3 × max(0, V_core - 50))  // β3 = 0.25 — fadiga de verificação corrói a moral acima de 50

Limitado ao intervalo [0, 100].
```

> **Nota editorial:** O termo `β3` conecta o EVID_08 à dinâmica social — a Fadiga de Verificação
> não é abstração: ela drena a moral tão diretamente quanto as horas extras.

### 3.6 Capital Cognitivo Composto ($K_{cog}$)

```
K_cog = (Rm_efetiva × 40)
      + (slaCompliance × 30)
      + ((1 - technicalDebt/100) × 20)
      + ((devTeamMoral/100) × 10)

Escala: 0–100
```

### 3.7 SLA Compliance

```
slaCompliance = Rm_efetiva × (1 - customerChurn × 0.5)
customerChurn = max(0, (1 - Rm_efetiva) × 0.3 - ragDepth × 0.02)
```

### 3.8 Índice de Carga de Verificação ($V_{core}$) e Custo Humano Não-Linear

O $V_{core}$ agrega **5 sinais comportamentais observáveis** no workflow de revisão (EVID_08 /
CHI 2026). No simulador determinístico não observamos telemetria real de IDE; modelamos cada sinal
como um *proxy* derivado do estado do Gêmeo Digital, normalizado a [0, 1]:

```
s1 = (1 - Rm_efetiva)                                  // falhas de teste/compilação
s2 = min(1, (M × (1 - Rm_efetiva) × T_revisao) / M)    // churn de código (retrabalho por chamada)
s3 = clamp(0, 1, latenciaPrimeiraCompilacao / 30min)   // latência até a 1ª compilação bem-sucedida
s4 = clamp(0, 1, hallucinationRate / 0.20)             // pausas longas (carga cognitiva por dúvida)
s5 = clamp(0, 1, overconfidenceGap / 0.30)             // trocas de contexto por "confiança cega"

overconfidenceGap = max(0, selectedModel.claimedAccuracy - Rm_efetiva)

V_core = 100 × clamp(0, 1,
    0.30 × s1
  + 0.25 × s2
  + 0.20 × s4
  + 0.15 × s5
  + 0.10 × s3
)
```

> **Nota para o desenvolvedor:** `latenciaPrimeiraCompilacao` e `claimedAccuracy` são parâmetros do
> `selectedModel` (modelos *overconfident* declaram acurácia alta mas entregam Rm baixo — s5 os pune).
> Onde não houver telemetria, usar defaults por capítulo. O V_core é gravado em
> `state.operations.verificationLoad` a cada `stepQuarter()` e exibido no HUD e no Gêmeo Digital.

**Realimentação não-linear no custo humano** (o coração do Gap 1):

```
fatorFadiga = 1 + (V_core / 100)² × 0.8

Exemplos:
  V_core = 40 → fatorFadiga ≈ 1.13
  V_core = 70 → fatorFadiga ≈ 1.39
  V_core = 90 → fatorFadiga ≈ 1.65   // cada hora de revisão custa 65% mais

Aplicado em 3.1: C_humano = M × (1 - Rm) × T_revisao × R_hora_humana × fatorFadiga
```

O termo quadrático é a formalização da tese do EVID_08: o impacto humano da IA incorreta **não é
linear** em horas — a fadiga acumulada degrada a vazão útil do revisor, encarecendo cada hora.

---

## 4. Time Lags (Causalidade de Longo Prazo)

O motor processa retardos temporais após cada `stepQuarter()`:

| Gatilho | Delay | Efeito em |
| :-- | :-- | :-- |
| `technicalDebt > 40%` ao final de Q1 | +2 trimestres | No Q3: falhas em cadeia no sistema CX (`customerChurn +15%`) |
| `devTeamMoral < 30%` ao final de Q2 | +1 trimestre | No Q3: `R_hora_humana` dobra (custo de contratação) |
| `ragDepth < 2` em Q1–Q2 | +1 trimestre | Q3: se evento `EVT_04` (crise de alucinação) sortear, aplica penalidade dupla |
| `multiAgent == true` e `agentIsolation == false` em Q2 | +1 trimestre | Q3: **Efeito Ricochete Agêntico** — `resentContextCost` cresce até 62% do C_api e o `cashBalance` despenca |
| `V_core > 75` ao final de Q2 | +1 trimestre | Q3: `fatorFadiga` sobe e a queda de `devTeamMoral` acelera (fadiga de verificação crônica) |

Implementação: `_timeLagQueue` — array de `{triggerQuarter, effectQuarter, apply: fn}` processado no início de cada `stepQuarter`.

---

## 5. State Machine

```
Q0_INTRO
    │ initGame()
    ▼
Q1_INVESTIGATION   ◄── Capítulo 1 e 2
    │ submitQ1Decisions(decisions)
    ▼
Q2_OPTIMIZATION    ◄── Capítulo 3 e 4
    │ stepQuarter(decisions, event?)
    ▼
Q3_SIMULATION      ◄── Capítulo 5 Q1→Q3
    │ stepQuarter(decisions, event?)
    ▼
Q4_STRESS_TEST     ◄── Capítulo 5 Q4
    │ stepQuarter(decisions, event?)
    ▼
BOARD_JUDGMENT     ◄── Capítulo 6
    │
    ├─ boardApproved() → VICTORY
    └─ boardRejected() → FAILURE
```

---

## 6. API Pública do DigitalTwinEngine

```javascript
export class DigitalTwinEngine {
  constructor(initialState)

  /**
   * Avança um trimestre com as decisões de infraestrutura e evento opcional.
   * `decisions` aceita: useRouteLLM, slmRatio, ragDepth, ragReranking, testTimeComputeLevel,
   * semanticCaching, avgContextTokens, multiAgent, agentIsolation e (opcional) selectedModel.
   * Recalcula, ao final: Rm_efetiva, V_core, TCO, UI/$, K_cog e resentContextCost.
   */
  stepQuarter(decisions, randomEvent = null)

  /** Retorna snapshot imutável do estado atual. */
  getState()

  /** Retorna array de snapshots históricos [Q1, Q2, Q3, Q4]. */
  getHistory()

  /** Registra decisão binária do Cap. 2 (qual modelo escolheu). */
  recordModelChoice(model)  // 'lite' | 'pro'

  /** Registra resultado do Cap. 6 — atualiza confiança por stakeholder. */
  applyBoardAnswer(stakeholderId, isCorrect, isCorrectEvidence)

  /** Verifica condições de vitória ou falha. */
  checkEndConditions()
  // Retorna: 'VICTORY' | 'FAILURE_CASH' | 'FAILURE_MORALE' | 'FAILURE_TRUST' | null

  /** Reseta para INITIAL_STATE. */
  reset()
}
```

---

## 7. Testes unitários requeridos

Arquivo: `tests/digital-twin.spec.js`

| Caso de teste | Descrição |
| :-- | :-- |
| `stepQuarter com Model-Lite` | Verifica que `technicalDebt` sobe ≥ 10% e `humanReworkCost` > 3× `apiCost` |
| `RouteLLM ativado com slmRatio=0.7` | Verifica que `apiCost` cai ≥ 30% vs. sem RouteLLM |
| `ragDepth=5 + testTimeComputeLevel=1` | Verifica que `Rm_efetiva ≥ 0.95` |
| `overthinkingPenalty` | Verifica que `testTimeComputeLevel=5` em `workloadComplexity=1` reduz Rm |
| `Time lag Q2→Q3` | Verifica que moral < 30% em Q2 dobra `R_hora_humana` em Q3 |
| `checkEndConditions FAILURE_CASH` | `cashBalance ≤ 0` retorna `FAILURE_CASH` |
| `K_cog bounds` | Sempre retorna valor entre 0 e 100 |
| `V_core bounds` | `verificationLoad` sempre entre 0 e 100 para qualquer estado |
| `V_core não-linear no custo humano` | Dobrar V_core (40→80) mais que dobra o incremento de `humanReworkCost` (termo quadrático `fatorFadiga`) |
| `V_core deprime a moral` | `V_core > 75` em Q2 reduz `devTeamMoral` mais que um cenário com `V_core = 50`, mantendo o resto constante |
| `Semantic caching reduz C_api` | `semanticCaching=true` com `cacheHitRate=0.4` reduz `apiCost` em ≈30% vs. sem cache |
| `Semantic caching não altera Rm` | Ligar cache **não** muda `firstPassAccuracy` (ortogonal ao Context Rot) |
| `Context Rot > 50k` | `avgContextTokens=100_000` reduz `Rm_efetiva` em ≈0.10 vs. `avgContextTokens=8_000` |
| `Cascata agêntica sem isolamento` | `multiAgent=true`, `agentIsolation=false`, `Rm=0.5` → `resentContextCost > 0.5 × apiCost` |
| `Isolamento contém a cascata` | `agentIsolation=true` mantém `resentContextCost ≤ 0.15 × apiCost` |
| `RAG reindex ao trocar de modelo` | `trocouDeModeloNoTrimestre=true` eleva `C_rag` (custo de re-indexação HNSW) |
| `RAG reranking conditional vs universal` | `universal` dá maior `rerankBonus` mas maior `C_rerank` que `conditional` |

---

### Referências cruzadas

- Eventos aleatórios injetados em `stepQuarter` → [06](06_eventos_aleatorios_simulacao.md)
- HUD que consome `getState()` → [08](08_wireframes_catalogo_componentes.md)
- Testes Playwright de integração → [10](10_testes_roadmap_riscos.md)
