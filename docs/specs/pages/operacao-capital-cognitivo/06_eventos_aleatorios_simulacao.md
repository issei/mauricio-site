# 06 — Motor de Eventos Aleatórios e Simulação de Incerteza

> Cobre o entregável **9 (Motor de eventos estocásticos)**.
> Especificação do `RandomEventEngine`: tabela de eventos, algoritmo de sorteio e resolução de impacto.

---

## 1. Princípio de Design

Os eventos aleatórios existem para ensinar **resiliência sistêmica**: o usuário percebe que
estratégias otimizadas apenas para o cenário-base falham quando o mercado muda. O motor é
**intencionalmente assimétrico** — certas escolhas de arquitetura (RouteLLM ativo, RAG ≥ 3)
funcionam como "seguro" contra eventos específicos.

> **Regra de balanceamento:** Em Q4, a probabilidade total de algum evento ocorrer é ~65%.
> Em Q1, ~20%. Isso cria uma curva de pressão ascendente alinhada à narrativa de "stress test".

---

## 2. Tabela de Eventos Estocásticos

| ID | Nome | Trimestre | Prob. | Efeito no Gêmeo Digital | Mitigação (reduz impacto a 50%) |
| :-- | :-- | :-- | :-- | :-- | :-- |
| `EVT_01` | **Guerra de Preços de LLM** | Q2 | 35% | `apiCost × 0.60` (preço de token cai 40%) | Nenhuma necessária — evento positivo |
| `EVT_02` | **Inflação de Salários Dev** | Q3 | 25% | `R_hora_humana × 1.35` | `firstPassAccuracy ≥ 0.88` |
| `EVT_03` | **Pico Imprevisto de Demanda** | Q4 | 30% | `monthlyRequests × 2.5` | `useRouteLLM == true` |
| `EVT_04` | **Crise de Alucinação** | Q3 | 15% | `devTeamMoral -20`, `marcus.trust -30` | `ragDepth ≥ 3` |
| `EVT_05` | **Regulação de IA (Compliance)** | Q4 | 20% | `infrastructureCost +R$ 15.000` (custo de auditoria) | Evidence card EVID_03 coletado |
| `EVT_06` | **Concorrente lança serviço com SLM** | Q2 | 20% | `customerChurn +8%` se `slaCompliance < 0.92` | `slaCompliance ≥ 0.92` |
| `EVT_07` | **Cascata de Erros Agêntica (Ricochete)** | Q3 | 25% (se `multiAgent`) | `resentContextCost` explode → `apiCost × (1 + até 0.62)`, `cashBalance` despenca | `agentIsolation == true` |

---

## 3. Algoritmo de Sorteio por Trimestre

```javascript
// src/js/operacao-capital-cognitivo/event-engine.js

const EVENT_TABLE = {
  Q2: [
    { id: 'EVT_01', probability: 0.35 },
    { id: 'EVT_06', probability: 0.20 },
  ],
  Q3: [
    { id: 'EVT_02', probability: 0.25 },
    { id: 'EVT_04', probability: 0.15 },
    // EVT_07 só é candidato se o usuário ativou multiagente; a probabilidade
    // é aplicada condicionalmente em rollQuarterEvents (ver nota abaixo).
    { id: 'EVT_07', probability: 0.25, requires: (state) => state.technical.multiAgent },
  ],
  Q4: [
    { id: 'EVT_03', probability: 0.30 },
    { id: 'EVT_05', probability: 0.20 },
  ],
};

export class RandomEventEngine {
  /**
   * Sorteia eventos para um trimestre.
   * Múltiplos eventos podem ocorrer no mesmo trimestre (sorteio independente).
   * Eventos com `requires(state)` só entram no sorteio se a pré-condição for satisfeita
   * (ex.: EVT_07 exige workflow multiagente ativo).
   * @param {'Q2'|'Q3'|'Q4'} quarter
   * @param {DigitalTwinState} state
   * @returns {string[]} Array de IDs de eventos sorteados
   */
  rollQuarterEvents(quarter, state) {
    const candidates = EVENT_TABLE[quarter] ?? [];
    return candidates
      .filter(ev => !ev.requires || ev.requires(state))
      .filter(ev => Math.random() < ev.probability)
      .map(ev => ev.id);
  }

  /**
   * Aplica os efeitos de uma lista de eventos ao estado do Gêmeo Digital.
   * Verifica mitigações e reduz impacto se aplicável.
   * @param {string[]} eventIds
   * @param {DigitalTwinState} state
   * @returns {{ state: DigitalTwinState, notifications: EventNotification[] }}
   */
  applyEvents(eventIds, state) {
    const notifications = [];

    for (const eventId of eventIds) {
      const handler = EVENT_HANDLERS[eventId];
      if (!handler) continue;

      const mitigated = handler.checkMitigation(state);
      const result = handler.apply(state, mitigated);
      notifications.push({
        id: eventId,
        title: handler.title,
        description: mitigated ? handler.descriptionMitigated : handler.description,
        severity: mitigated ? 'warning' : handler.severity,
      });

      // Mutação do estado
      Object.assign(state, result);
    }

    return { state, notifications };
  }
}
```

---

## 4. Definição de Handlers de Eventos

```javascript
const EVENT_HANDLERS = {
  EVT_01: {
    title: 'Guerra de Preços de LLM 📉',
    description: 'Preço por token das principais APIs caiu 40%. Seu custo de API reduziu automaticamente.',
    descriptionMitigated: null, // não há mitigação necessária
    severity: 'info',
    checkMitigation: () => false,
    apply: (state) => ({
      finances: {
        ...state.finances,
        apiCost: state.finances.apiCost * 0.60,
      },
    }),
  },

  EVT_02: {
    title: 'Inflação de Salários Dev 📈',
    description: 'Escassez de engenheiros sêniores elevou o custo do tempo humano em +35%. Seu TCO aumentou.',
    descriptionMitigated: 'Inflação de salários, mas sua alta acurácia limitou o impacto — apenas +17%.',
    severity: 'warning',
    checkMitigation: (state) => state.operations.firstPassAccuracy >= 0.88,
    apply: (state, mitigated) => {
      const multiplier = mitigated ? 1.17 : 1.35;
      return {
        finances: {
          ...state.finances,
          humanReworkCost: state.finances.humanReworkCost * multiplier,
        },
      };
    },
  },

  EVT_03: {
    title: 'Pico Imprevisto de Demanda 🚀',
    description: 'Volume de chamadas triplicou em Q4. Sem roteamento dinâmico, seu custo de API explodiu.',
    descriptionMitigated: 'Pico de demanda absorvido pelo RouteLLM — SLMs escalaram automaticamente.',
    severity: 'critical',
    checkMitigation: (state) => state.technical.useRouteLLM,
    apply: (state, mitigated) => {
      const newRequests = state.operations.monthlyRequests * (mitigated ? 1.8 : 2.5);
      const apiMultiplier = mitigated ? 1.4 : 3.0;
      return {
        operations: { ...state.operations, monthlyRequests: newRequests },
        finances: { ...state.finances, apiCost: state.finances.apiCost * apiMultiplier },
      };
    },
  },

  EVT_04: {
    title: 'Crise de Alucinação 🔴',
    description: 'Output incorreto em contratos jurídicos. Moral do time desabou. CRO em alerta máximo.',
    descriptionMitigated: 'RAG profundo bloqueou a alucinação antes do cliente receber. Crise contida.',
    severity: 'critical',
    checkMitigation: (state) => state.technical.ragDepth >= 3,
    apply: (state, mitigated) => {
      if (mitigated) {
        return { social: { ...state.social, devTeamMoral: Math.max(0, state.social.devTeamMoral - 5) } };
      }
      return {
        social: {
          ...state.social,
          devTeamMoral: Math.max(0, state.social.devTeamMoral - 20),
          stakeholderTrust: {
            ...state.social.stakeholderTrust,
            marcus: Math.max(0, state.social.stakeholderTrust.marcus - 30),
          },
        },
        technical: { ...state.technical, hallucinationRate: state.technical.hallucinationRate + 0.08 },
      };
    },
  },

  EVT_05: {
    title: 'Regulação de IA — Auditoria Obrigatória ⚖️',
    description: 'Nova regulação exige auditoria de sistemas de IA. Custo de infraestrutura +R$ 15.000.',
    descriptionMitigated: 'Auditoria passou sem problemas — sua documentação de governança (UI/$) foi aceita.',
    severity: 'warning',
    checkMitigation: (state) => state.evidenceBoard?.isUnlocked('EVID_03') ?? false,
    apply: (state, mitigated) => ({
      finances: {
        ...state.finances,
        infrastructureCost: state.finances.infrastructureCost + (mitigated ? 5_000 : 15_000),
      },
    }),
  },

  EVT_06: {
    title: 'Concorrente com SLM Próprio 🏃',
    description: 'Concorrente lançou serviço mais ágil. Clientes insatisfeitos com SLA abaixo de 92% estão migrando.',
    descriptionMitigated: 'Seu SLA alto manteve a base de clientes fiel ao serviço.',
    severity: 'warning',
    checkMitigation: (state) => state.operations.slaCompliance >= 0.92,
    apply: (state, mitigated) => {
      if (mitigated) return state;
      return {
        operations: {
          ...state.operations,
          customerChurn: Math.min(1, state.operations.customerChurn + 0.08),
        },
      };
    },
  },

  EVT_07: {
    title: 'Cascata de Erros Agêntica 🔥',
    description: 'Uma alucinação do agente inicial ricocheteou pelo pipeline. O contexto reenviado (re-sent context) inflou a fatura de API — até 62% do gasto foi retrabalho de contexto contaminado.',
    descriptionMitigated: 'O isolamento de contexto entre agentes conteve a propagação. O ricochete parou no primeiro checkpoint de validação.',
    severity: 'critical',
    checkMitigation: (state) => state.technical.agentIsolation === true,
    apply: (state, mitigated) => {
      // Fração de contexto reenviado: leve com isolamento, combinatória sem ele.
      const cascadeFactor = mitigated
        ? 0.15
        : Math.min(0.62, 0.20 + (1 - state.operations.firstPassAccuracy) * 0.9);
      const resent = state.finances.apiCost * cascadeFactor;
      return {
        finances: {
          ...state.finances,
          resentContextCost: state.finances.resentContextCost + resent,
          apiCost: state.finances.apiCost + resent,
          cashBalance: state.finances.cashBalance - resent,
        },
      };
    },
  },
};
```

---

## 5. Apresentação ao Usuário — Modal de Alerta Executivo

Quando um evento é sorteado, antes de avançar o trimestre, exibe-se:

```
┌──────────────────────────────────────────────────────────┐
│  ⚡ ALERTA EXECUTIVO — Q3                                │
├──────────────────────────────────────────────────────────┤
│  🔴 CRISE DE ALUCINAÇÃO                                  │
│                                                          │
│  Output incorreto em contratos jurídicos. Moral do       │
│  time desabou. CRO em alerta máximo.                     │
│                                                          │
│  Impacto: devTeamMoral -20 | marcus.trust -30            │
│                                                          │
│  Mitigação possível: RAG ≥ 3 teria contido o evento.    │
│                                                          │
│  [ Entendido — Avançar para Q4 ]                         │
└──────────────────────────────────────────────────────────┘
```

O modal é um `<dialog>` nativo HTML com `id="event-alert-dialog"`.
Após fechar, o HUD atualiza os valores afetados com animação de "flash" vermelho/amarelo.

---

## 6. Considerações de Aleatoriedade

> **Nota para o desenvolvedor:** O `Math.random()` é suficiente para fins educacionais. **Não usar
> seed determinístico** — a imprevisibilidade é intencionalmente pedagógica. Para testes automatizados
> (ver [10](10_testes_roadmap_riscos.md)), injetar um mock via `RandomEventEngine.setRollMock(fn)`.

```javascript
// Para testes: injetar função de roll mockada
export class RandomEventEngine {
  #rollFn = Math.random;

  setRollMock(fn) { this.#rollFn = fn; }

  rollQuarterEvents(quarter, state) {
    const candidates = EVENT_TABLE[quarter] ?? [];
    return candidates
      .filter(ev => !ev.requires || ev.requires(state))
      .filter(ev => this.#rollFn() < ev.probability)
      .map(ev => ev.id);
  }
}
```

---

### Referências cruzadas

- `stepQuarter` do Digital Twin consome `applyEvents` → [03](03_digital_twin_engine.md)
- Modal `<dialog>` de alerta → [08](08_wireframes_catalogo_componentes.md)
- Testes com roll mockado → [10](10_testes_roadmap_riscos.md)
