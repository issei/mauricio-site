# 05 — Stakeholders e Stateful Board Engine

> Cobre o entregável **8 (Sistema de Stakeholders e Stateful Board Engine)**.
> Especificação dos 5 conselheiros, seus perfis de incentivo, e o motor de diálogo adaptativo.

---

## 1. Perfis dos Stakeholders

### Helena Vance — CFO

| Atributo | Valor |
| :-- | :-- |
| **ID** | `helena` |
| **Cargo** | Chief Financial Officer |
| **Foco central** | Caixa, margem operacional, TCO |
| **Incentivo** | Manter `operatingMargin ≥ 15%` e `cashBalance > 0` |
| **Gatilho de hostilidade** | `operatingMargin < 0.15` ou `cashBalance < R$ 200k` |
| **Gatilho de apoio** | `globalUI > 5` e `operatingMargin ≥ 0.20` |
| **Evidências válidas** | EVID_01, EVID_03, EVID_04, EVID_07, EVID_10 |
| **Categoria de pergunta** | `TCO` |

**Tom hostil:** "Nossa margem desabou. Como você justifica manter um modelo de alto custo nominal?"
**Tom apoiador:** "Os custos estão sob controle. Como expandimos o UI/$ no próximo ano?"

---

### Dr. Aris Thorne — CTO

| Atributo | Valor |
| :-- | :-- |
| **ID** | `aris` |
| **Cargo** | Chief Technology Officer |
| **Foco central** | Inovação técnica, benchmarks, arquitetura |
| **Incentivo** | Adoção das técnicas mais avançadas com métricas sólidas |
| **Gatilho de ceticismo** | Usuário escolheu Model-Lite sem justificativa técnica |
| **Gatilho de apoio** | `ragDepth ≥ 3` ou `useRouteLLM == true` |
| **Evidências válidas** | EVID_02, EVID_04, EVID_05, EVID_06, EVID_09, EVID_11 |
| **Categoria de pergunta** | `Accuracy` / `Infrastructure` |

**Tom cético:** "Você ignorou Test-Time Compute Scaling. Por quê?"
**Tom apoiador:** "O RouteLLM foi uma escolha inteligente. Qual a estratégia de evolução?"

---

### Sarah Chen — VP de Operações

| Atributo | Valor |
| :-- | :-- |
| **ID** | `sarah` |
| **Cargo** | VP de Engenharia e Operações |
| **Foco central** | Moral da equipe, horas de retrabalho, débito técnico |
| **Incentivo** | `devTeamMoral ≥ 70%` e `humanReworkCost < 20%` do TCO |
| **Gatilho de frustração** | `devTeamMoral < 40%` ou `verificationLoad > 70` |
| **Gatilho de satisfação** | `firstPassAccuracy ≥ 0.90` e `technicalDebt < 30%` e `verificationLoad < 40` |
| **Evidências válidas** | EVID_01, EVID_02, EVID_05, EVID_08 |
| **Categoria de pergunta** | `Accuracy` / `TCO` / `HumanFactors` |

**Tom frustrado:** "Minha equipe está à beira do burnout. O que você fará para parar o retrabalho?"
**Tom satisfeito:** "A acurácia melhorou muito. Como garantimos que se mantenha?"
**Tom fadiga (V_core alto):** "Escolheram um modelo *overconfident* que parece certo e falha calado. Minha equipe passa o dia verificando cegamente. Como reduzimos a Carga de Verificação?"

---

### Marcus Brody — CRO (Chief Risk Officer)

| Atributo | Valor |
| :-- | :-- |
| **ID** | `marcus` |
| **Cargo** | Chief Risk Officer |
| **Foco central** | Governança, compliance, risco de alucinações |
| **Incentivo** | `hallucinationRate < 5%` e `ragDepth ≥ 2` |
| **Gatilho de alarme** | `hallucinationRate ≥ 10%` ou evento EVT_04 ocorreu ou (`multiAgent` sem isolamento) |
| **Gatilho de confiança** | Evidence card de Governance anexado + `ragDepth ≥ 3` |
| **Evidências válidas** | EVID_03, EVID_04, EVID_06, EVID_07, EVID_09, EVID_10 |
| **Categoria de pergunta** | `Governance` / `Infrastructure` |

**Tom alarmado:** "Tivemos uma crise de alucinação em contratos jurídicos. Como evitar recorrência?"
**Tom confiante:** "A estratégia de RAG profundo mitiga o risco jurídico eficazmente?"
**Tom regulatório (Governed UI/$):** "Somos uma indústria regulada (LGPD/GDPR). Um modelo open-source 87% mais barato me interessa — mas qual é o Prêmio de Risco? Como o Governed UI/$ sustenta essa escolha diante de uma alucinação em contrato?"

---

### Clara Mendez — Head de Customer Experience

| Atributo | Valor |
| :-- | :-- |
| **ID** | `clara` |
| **Cargo** | Head de CX |
| **Foco central** | SLA de qualidade, satisfação do cliente, churn |
| **Incentivo** | `slaCompliance ≥ 0.95` e `customerChurn < 5%` |
| **Gatilho de insatisfação** | `customerChurn ≥ 10%` ou `slaCompliance < 0.85` |
| **Gatilho de satisfação** | `slaCompliance ≥ 0.97` |
| **Evidências válidas** | EVID_02, EVID_05, EVID_07 |
| **Categoria de pergunta** | `Accuracy` / `Routing` |

**Tom insatisfeito:** "Nosso NPS caiu 20 pontos neste trimestre por respostas incorretas da IA."
**Tom satisfeito:** "O SLA está acima de 97%. Como escalamos para novos mercados?"

---

## 2. Banco de Perguntas por Stakeholder

### Helena Vance (CFO) — Categoria TCO

```javascript
const HELENA_QUESTIONS = [
  // Hostil — margem baixa
  {
    id: 'H_TCO_01',
    condition: (state) => state.finances.operatingMargin < 0.15,
    tone: 'hostile',
    speechText: `Nossa margem operacional desabou no Q2. Por que devo continuar investindo em modelos de alto custo nominal se os resultados financeiros não justificam?`,
    requiredCategory: 'TCO',
    validEvidenceIds: ['EVID_01', 'EVID_04', 'EVID_07'],
    options: [
      {
        id: 'H_TCO_01_A',
        text: 'O modelo mais caro possui maior First-Pass Accuracy, eliminando o custo de refatoração humana que representa até 90% do TCO.',
        isCorrectReasoning: true,
      },
      {
        id: 'H_TCO_01_B',
        text: 'Podemos cortar para o modelo mais barato e absorver o retrabalho adicional.',
        isCorrectReasoning: false,
      },
      {
        id: 'H_TCO_01_C',
        text: 'O problema não é o modelo, é o volume de chamadas — precisamos limitar a demanda.',
        isCorrectReasoning: false,
      },
    ],
  },
  // Apoiadora — margem boa
  {
    id: 'H_TCO_02',
    condition: (state) => state.finances.operatingMargin >= 0.20,
    tone: 'supportive',
    speechText: `Os custos estão controlados e a margem está saudável. Qual é o plano para expandir o UI/$ no próximo ano sem comprometer a estabilidade financeira?`,
    requiredCategory: 'TCO',
    validEvidenceIds: ['EVID_03', 'EVID_05'],
    options: [
      {
        id: 'H_TCO_02_A',
        text: 'Aumentar o slmRatio do RouteLLM progressivamente à medida que novos modelos menores amadurecem, mantendo o UI/$ acima do patamar atual.',
        isCorrectReasoning: true,
      },
      {
        id: 'H_TCO_02_B',
        text: 'Dobrar o orçamento de API para processar mais volume.',
        isCorrectReasoning: false,
      },
    ],
  },
];
```

### Sarah Chen (VP Ops) — Categoria Accuracy/TCO

```javascript
const SARAH_QUESTIONS = [
  {
    id: 'S_ACC_01',
    condition: (state) => state.social.devTeamMoral < 40,
    tone: 'frustrated',
    speechText: `Minha equipe de engenharia está à beira do burnout corrigindo respostas incorretas da IA. O que você implementará para acabar com esse retrabalho?`,
    requiredCategory: 'Accuracy',
    validEvidenceIds: ['EVID_02', 'EVID_05'],
    options: [
      {
        id: 'S_ACC_01_A',
        text: 'Implementaremos RouteLLM com validação RAG de profundidade 4, garantindo First-Pass Accuracy acima de 92% antes de qualquer entrega ao time.',
        isCorrectReasoning: true,
      },
      {
        id: 'S_ACC_01_B',
        text: 'Vamos contratar mais revisores humanos para absorver o volume.',
        isCorrectReasoning: false,
      },
    ],
  },
  // Fadiga de Verificação — modelos overconfident
  {
    id: 'S_HF_01',
    stakeholderId: 'sarah',
    condition: (state) => state.operations.verificationLoad > 70,
    tone: 'frustrated',
    speechText: `A Carga de Verificação da equipe está no vermelho. O modelo escolhido é overconfident — parece certo e falha em silêncio, então os revisores validam cegamente. Como você reduz o V_core, não só o custo de token?`,
    requiredCategory: 'HumanFactors',
    validEvidenceIds: ['EVID_08', 'EVID_02'],
    options: [
      {
        id: 'S_HF_01_A',
        text: 'Trocar por um modelo calibrado (sem confiança cega) e adicionar validação por schema/testes automáticos antes da revisão humana, atacando os 5 sinais do V_core na fonte — não apenas somando revisores.',
        isCorrectReasoning: true,
      },
      {
        id: 'S_HF_01_B',
        text: 'Manter o modelo barato e pagar hora extra para a equipe aguentar o ritmo de verificação.',
        isCorrectReasoning: false,
      },
      {
        id: 'S_HF_01_C',
        text: 'Reduzir a exigência de revisão humana e confiar mais nos outputs para aliviar a equipe.',
        isCorrectReasoning: false,
      },
    ],
  },
];
```

### Marcus Brody (CRO) — Categoria Governance

```javascript
const MARCUS_QUESTIONS = [
  {
    id: 'M_GOV_01',
    condition: (state) => state.technical.hallucinationRate >= 0.10,
    tone: 'alarmed',
    speechText: `Tivemos outputs incorretos em contratos jurídicos. Qual a sua estratégia de governança para garantir que isso não aconteça novamente?`,
    requiredCategory: 'Governance',
    validEvidenceIds: ['EVID_03', 'EVID_04'],
    options: [
      {
        id: 'M_GOV_01_A',
        text: 'RAG com profundidade 4+ sobre a base jurídica interna, combinado com validação por schema rígido antes de qualquer output chegar ao cliente.',
        isCorrectReasoning: true,
      },
      {
        id: 'M_GOV_01_B',
        text: 'Vamos adicionar um disclaimer nos contratos gerados por IA.',
        isCorrectReasoning: false,
      },
    ],
  },
  // Governed UI/$ em setor regulado — desconto open-source vs. Prêmio de Risco
  {
    id: 'M_GOV_02',
    stakeholderId: 'marcus',
    condition: (state) => state.finances.operatingMargin >= 0.15 && state.technical.hallucinationRate < 0.10,
    tone: 'skeptical',
    speechText: `Um modelo open-source até 87% mais barato é tentador. Mas somos regulados por LGPD/GDPR. Qual é o Prêmio de Risco dessa escolha e como o Governed UI/$ justifica — ou desaconselha — usá-lo em contratos jurídicos?`,
    requiredCategory: 'Governance',
    validEvidenceIds: ['EVID_10', 'EVID_03'],
    options: [
      {
        id: 'M_GOV_02_A',
        text: 'O desconto open-source só se realiza após incorporar o Prêmio de Risco (R) do Governed UI/$: em domínio regulado, mantemos o modelo governado para outputs jurídicos e reservamos o open-source para tarefas internas de baixo risco.',
        isCorrectReasoning: true,
      },
      {
        id: 'M_GOV_02_B',
        text: 'Migrar tudo para o open-source imediatamente — 87% de economia é irrecusável.',
        isCorrectReasoning: false,
      },
      {
        id: 'M_GOV_02_C',
        text: 'Ignorar o open-source; risco regulatório significa nunca considerar alternativas de custo.',
        isCorrectReasoning: false,
      },
    ],
  },
];
```

---

> **Nota para o desenvolvedor (contrato de dados):** Todo objeto de pergunta **deve** conter o campo
> `stakeholderId` (`'helena' | 'aris' | 'sarah' | 'marcus' | 'clara'`), pois `generateQuestions()`
> depende dele para garantir diversidade de conselheiros. As perguntas mais antigas desta spec
> (`H_TCO_*`, `S_ACC_*`, `M_GOV_01`) devem ser retrofitadas com esse campo na implementação.

---

## 3. Algoritmo de Geração de Perguntas (StatefulBoardEngine)

```javascript
// src/js/operacao-capital-cognitivo/board-engine.js

export class StatefulBoardEngine {
  constructor(digitalTwinState, evidenceBoard) {
    this.state = digitalTwinState;
    this.board = evidenceBoard;
  }

  /**
   * Gera entre 3 e 5 perguntas selecionadas com base no estado do Gêmeo Digital.
   * Prioriza: 1) condições críticas (margem, moral, risco) 2) condições positivas.
   * @returns {BoardQuestion[]}
   */
  generateQuestions() {
    const allQuestions = [
      ...HELENA_QUESTIONS,
      ...ARIS_QUESTIONS,
      ...SARAH_QUESTIONS,
      ...MARCUS_QUESTIONS,
      ...CLARA_QUESTIONS,
    ];

    const applicable = allQuestions
      .filter(q => q.condition(this.state))
      .sort((a, b) => {
        // Priorizar perguntas hostis (condições críticas primeiro)
        const priority = { hostile: 0, alarmed: 1, skeptical: 2, frustrated: 3, unsatisfied: 4, supportive: 5 };
        return (priority[a.tone] ?? 99) - (priority[b.tone] ?? 99);
      });

    // No mínimo 1 pergunta por stakeholder unique nos resultados
    const selected = [];
    const usedStakeholders = new Set();
    for (const q of applicable) {
      if (selected.length >= 5) break;
      if (!usedStakeholders.has(q.stakeholderId) || selected.length < 3) {
        selected.push(q);
        usedStakeholders.add(q.stakeholderId);
      }
    }

    return selected.length >= 3 ? selected : applicable.slice(0, 3);
  }

  /**
   * Avalia a resposta do usuário a uma pergunta.
   * @param {string} questionId
   * @param {string} selectedOptionId
   * @param {string[]} attachedEvidenceIds
   * @returns {{ correct: boolean, evidenceValid: boolean, confidenceChange: number }}
   */
  evaluateAnswer(questionId, selectedOptionId, attachedEvidenceIds) {
    const question = this._findQuestion(questionId);
    const option = question.options.find(o => o.id === selectedOptionId);
    const evidenceValid = attachedEvidenceIds.some(id =>
      question.validEvidenceIds.includes(id) &&
      this.board.isValidForQuestion(id, question.requiredCategory)
    );

    const correct = option?.isCorrectReasoning && evidenceValid;
    const confidenceChange = correct ? +15 : -20;

    return { correct, evidenceValid, confidenceChange };
  }
}
```

---

## 4. Barra de Confiança Agregada do Conselho

```javascript
// Fórmula de confiança agregada
boardConfidenceAggregate = (
  helena.trust × 0.30 +  // CFO tem maior peso (orçamento)
  aris.trust   × 0.20 +
  sarah.trust  × 0.20 +
  marcus.trust × 0.20 +
  clara.trust  × 0.10
)
```

Exibido como barra de progresso no `#board-confidence-bar` durante o Capítulo 6.
Cores: `< 40%` vermelho, `40–70%` amarelo, `≥ 70%` verde.

---

## 5. Critérios de Desfecho

```javascript
function checkBoardOutcome(state, boardConfidence) {
  if (state.finances.cashBalance <= 0) return 'FAILURE_CASH';
  if (state.social.devTeamMoral <= 0) return 'FAILURE_MORALE';
  if (boardConfidence < 40) return 'FAILURE_TRUST';
  if (
    boardConfidence >= 70 &&
    state.finances.cashBalance > 0 &&
    state.operations.slaCompliance >= 0.90
  ) return 'VICTORY';
  return null; // ainda em andamento
}
```

---

### Referências cruzadas

- Estado do Gêmeo Digital consumido pelo Board → [03](03_digital_twin_engine.md)
- Evidence Cards usados como prova → [04](04_evidence_board_system.md)
- Interface do diálogo do Board → [08](08_wireframes_catalogo_componentes.md)
