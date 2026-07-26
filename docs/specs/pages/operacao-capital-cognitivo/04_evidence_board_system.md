# 04 — Evidence Board System (Mural de Evidências)

> Cobre o entregável **7 (Evidence Board System: modelo de dados, grafo interativo, mecânica de uso)**.

---

## 1. Conceito e Objetivo

O Mural de Evidências é um painel colecionável que o usuário preenche ao longo da jornada.
Cada card capturado representa uma evidência científica, empírica ou operacional que sustenta (ou
contradiz) os conceitos de Capital Cognitivo e UI/$. No Capítulo 6, o usuário **deve anexar cards**
para justificar suas respostas ao Conselho — tornando a coleção funcional, não decorativa.

---

## 2. Modelo de Dados — Evidence Card

```javascript
// src/js/operacao-capital-cognitivo/evidence-board.js

/**
 * @typedef {'Level_A'|'Level_B'|'Level_C'|'Level_D'} EvidenceLevel
 * @typedef {'TCO'|'Accuracy'|'Infrastructure'|'Routing'|'Governance'|'HumanFactors'} EvidenceCategory
 *
 * @typedef {Object} EvidenceCard
 * @property {string}          id                  - Ex: 'EVID_01'
 * @property {string}          title               - Título curto (max 60 chars)
 * @property {string}          claim               - Tese principal afirmada
 * @property {string}          source              - Referência bibliográfica completa
 * @property {EvidenceLevel}   evidenceLevel       - Nível epistemológico
 * @property {string}          epistemologicalStatus - 'Fato Comprovado' | 'Evidência Parcial' |
 *                                                    'Convenção Operacional' | 'Dados Conflitantes'
 * @property {string}          validityContext     - Contexto de validade
 * @property {string}          limitations         - Limitações declaradas
 * @property {EvidenceCategory} category           - Categoria de uso no Board
 * @property {string}          icon                - Emoji ou classe de ícone
 * @property {boolean}         isContradictory     - Card com dados conflitantes intencionais?
 * @property {boolean}         unlocked            - Coletado pelo usuário?
 * @property {string}          unlockedInChapter   - 'cap1' | 'cap2' | ... | 'cap5'
 */
```

---

## 3. Catálogo Completo de Evidence Cards

### EVID_01 — TCO vs. Custo de API
```javascript
{
  id: 'EVID_01',
  title: 'TCO Dominado por Revisão Humana',
  claim: 'O custo da API é a ponta do iceberg. O tempo de refatoração e validação humana domina o TCO em operações corporativas de IA.',
  source: 'Peng et al. / Pegatron Case Study — Agentic TCO in Enterprise Software Engineering',
  evidenceLevel: 'Level_B',
  epistemologicalStatus: 'Evidência Parcial',
  validityContext: 'Operações corporativas com automação de workflows de software (10.000+ chamadas/mês)',
  limitations: 'Relação varia com nível de automação e maturidade do time; pode não se aplicar a uso exploratório.',
  category: 'TCO',
  icon: '💸',
  isContradictory: false,
}
```

### EVID_02 — First-Pass Accuracy e Custo Exponencial
```javascript
{
  id: 'EVID_02',
  title: 'Cascata de Custo por Baixa Acurácia',
  claim: 'Modelos com baixa First-Pass Accuracy geram cascatas de iterações que multiplicam o TCO exponencialmente.',
  source: 'Erol et al., ICLR 2026 — Cost-of-Pass: Mathematical Formalization of LLM Inference Costs',
  evidenceLevel: 'Level_A',
  epistemologicalStatus: 'Fato Comprovado',
  validityContext: 'Tarefas iterativas de geração de código e automação jurídica em cenários corporativos',
  limitations: 'Pressupõe tentativas independentes; pode subestimar o custo em pipelines com cache semântico.',
  category: 'Accuracy',
  icon: '📉',
  isContradictory: false,
}
```

### EVID_03 — Definição Operacional do UI/$
```javascript
{
  id: 'EVID_03',
  title: 'Useful Intelligence per Dollar (UI/$)',
  claim: 'UI/$ reflete a transformação real de capital financeiro em trabalho útil aprovado sem refatoração, capturando o que métricas de token não capturam.',
  source: 'Convenção operacional emergente — líderes do setor (OpenAI, Anthropic, comunidade FinOps de IA)',
  evidenceLevel: 'Level_C',
  epistemologicalStatus: 'Convenção Operacional',
  validityContext: 'Framework pragmático para tomada de decisão executiva sobre arquitetura de IA',
  limitations: 'Sem norma ISO/IEEE. Métricas exatas variam por contexto. Usar como bússola direcional, não métrica absoluta.',
  category: 'Governance',
  icon: '🧭',
  isContradictory: false,
}
```

### EVID_04 — Fórmula Cost-of-Pass
```javascript
{
  id: 'EVID_04',
  title: 'v(m,p) = C_m(p) / R_m(p) — Prova Matemática',
  claim: 'Quando Rm → 0, o custo efetivo por tarefa concluída tende ao infinito — modelos baratos com baixa acurácia são mais caros por unidade de trabalho útil.',
  source: 'Erol et al., ICLR 2026 / arXiv:2408.03314',
  evidenceLevel: 'Level_A',
  epistemologicalStatus: 'Fato Comprovado',
  validityContext: 'Qualquer sistema iterativo onde falhas exigem re-execução',
  limitations: 'Não considera custo de latência nem impactos de UX em sistemas de resposta imediata.',
  category: 'TCO',
  icon: '📐',
  isContradictory: false,
}
```

### EVID_05 — Economia de RouteLLM e SLMs
```javascript
{
  id: 'EVID_05',
  title: 'RouteLLM: 35%–85% de Redução no TCO',
  claim: 'Roteamento semântico com SLMs reduz o TCO entre 35% e 85% redirecionando prompts simples para modelos menores sem perda de qualidade mensurável em prompts simples.',
  source: 'RouteLLM / LiteLLM Research — Semantic Routing for LLM Cost Reduction',
  evidenceLevel: 'Level_B',
  epistemologicalStatus: 'Evidência Parcial',
  validityContext: 'Sistemas com distribuição mista de complexidade de prompts (tipicamente 60-80% são prompts simples)',
  limitations: 'A economia depende criticamente da distribuição real da carga de trabalho. Benchmarks em cargas uniformes podem não se aplicar.',
  category: 'Routing',
  icon: '🔀',
  isContradictory: false,
}
```

### EVID_06 — Overthinking em Test-Time Compute
```javascript
{
  id: 'EVID_06',
  title: '"Overthinking" em Test-Time Compute',
  claim: 'Test-Time Compute Scaling melhora a acurácia em tarefas complexas, mas pode reduzir a acurácia em prompts simples por excesso de raciocínio.',
  source: 'arXiv:2604.10739 (2026) — Overthinking in LLM Test-Time Compute',
  evidenceLevel: 'Level_A',
  epistemologicalStatus: 'Dados Conflitantes',
  validityContext: 'Tarefas de raciocínio matemático e programação; efeito negativo observado em tarefas triviais de classificação',
  limitations: 'Efeito varia significativamente entre arquiteturas de modelo. Não generaliza para todos os casos.',
  category: 'Infrastructure',
  icon: '⚠️',
  isContradictory: true,
}
```

### EVID_07 — Inference Flip (65%–90% TCO)
```javascript
{
  id: 'EVID_07',
  title: 'A Virada da Inferência — OpEx Domina o CapEx',
  claim: 'Entre 65% e 90% do TCO corporativo de IA agora ocorre na fase de inferência/execução, não no pré-treinamento.',
  source: 'Erdil / Epoch AI (2025) — Inference Economics of Language Models',
  evidenceLevel: 'Level_B',
  epistemologicalStatus: 'Evidência Parcial',
  validityContext: 'Empresas em fase de produção com volume de inferência > 100k chamadas/mês',
  limitations: 'Varia com o nível de automação. Empresas em fase de P&D ainda concentram custos no fine-tuning.',
  category: 'TCO',
  icon: '📊',
  isContradictory: false,
}
```

### EVID_08 — Carga de Verificação ($V_{core}$)  *(novo — Gap 1: Fator Humano/HCI)*
```javascript
{
  id: 'EVID_08',
  title: 'Carga de Verificação (V_core)',
  claim: 'A verificação de código gerado por IA produz fadiga cognitiva não-linear: falhas de teste, latência até a 1ª compilação, churn de código, pausas longas e trocas de contexto se agregam num índice que encarece cada hora de revisão.',
  source: 'CHI 2026 Conference — Measuring Verification Load in AI-Assisted Software Engineering',
  evidenceLevel: 'Level_A',
  epistemologicalStatus: 'Fato Comprovado',
  validityContext: 'Workflows de engenharia com aceitação humana obrigatória de outputs de IA',
  limitations: 'Os 5 sinais comportamentais dependem de telemetria de IDE; a agregação em índice único (V_core) é convenção operacional em consolidação, não norma ISO/IEEE.',
  category: 'HumanFactors',
  icon: '🧠',
  isContradictory: false,
}
```

### EVID_09 — Cascata de Erros em Multiagentes  *(novo — Gap 2)*
```javascript
{
  id: 'EVID_09',
  title: 'Cascata de Erros Agêntica',
  claim: 'Em pipelines multiagentes, uma alucinação inicial propaga-se topologicamente: o contexto reenviado (re-sent context) pode representar até 62% da fatura agêntica. O custo não é a soma de tentativas independentes — é combinatório.',
  source: 'Jamshidi et al. (arXiv:2606.07937) — From Spark to Fire: Error Cascades in Multi-Agent LLM Systems',
  evidenceLevel: 'Level_A',
  epistemologicalStatus: 'Fato Comprovado',
  validityContext: 'Orquestrações com ≥ 2 agentes que compartilham contexto sem isolamento',
  limitations: 'A fração de 62% é o pior caso observado; isolamento de contexto e checkpoints de validação reduzem a propagação drasticamente.',
  category: 'Infrastructure',
  icon: '🔥',
  isContradictory: false,
}
```

### EVID_10 — Elasticidade e Desconto Open-Source  *(novo — Gap econômico)*
```javascript
{
  id: 'EVID_10',
  title: 'Desconto Open-Source vs. Prêmio de Governança',
  claim: 'Modelos open-source podem ser até 87% mais baratos por unidade de trabalho, mas transferem para a empresa o custo de governança, hospedagem e conformidade — o desconto só se realiza com maturidade operacional.',
  source: 'NBER Working Paper 34608 (2025) — The Economics of Open vs. Closed Foundation Models',
  evidenceLevel: 'Level_A',
  epistemologicalStatus: 'Fato Comprovado',
  validityContext: 'Decisão de sourcing de modelo em empresas com volume de inferência em produção',
  limitations: 'O desconto líquido depende do Prêmio de Risco (R): setores regulados podem anular a economia via custo de compliance.',
  category: 'TCO',
  icon: '🔓',
  isContradictory: false,
}
```

### EVID_11 — Context Rot e Cache Semântico  *(novo — Gap 4: Dinâmica de Contexto)*
```javascript
{
  id: 'EVID_11',
  title: 'Context Rot & Semantic Caching',
  claim: 'A acurácia degrada continuamente à medida que o contexto ultrapassa ~50k tokens ("Context Rot") — a janela infinita é um mito. Já o cache semântico é alavanca primária de FinOps, com descontos de 50%–90% em tokens repetidos, mas não corrige o rot.',
  source: 'Chroma Research (2025) — Context Rot: How Increasing Input Tokens Degrades LLM Performance; Anthropic/OpenAI prompt caching docs',
  evidenceLevel: 'Level_B',
  epistemologicalStatus: 'Evidência Parcial',
  validityContext: 'Aplicações com prompts longos (>50k tokens) e/ou chamadas repetitivas cacheáveis',
  limitations: 'O ponto de inflexão do rot varia por modelo e tarefa. Cache ataca custo, não acurácia — os dois efeitos são ortogonais.',
  category: 'Infrastructure',
  icon: '🪟',
  isContradictory: false,
}
```

> **Nota editorial (escopo x avaliação):** A avaliação de conteúdo propôs 3 cards novos (EVID_08–10).
> Adicionamos também o **EVID_11** para dar lastro probatório ao Gap 4 (Context Rot / cache), que a
> avaliação levanta no texto mas não cobria com card próprio. Catálogo total: **11 cards**.

---

## 4. Classificação Epistemológica — Níveis de Evidência

| Nível | Descrição | Cor de Badge | Cards nesta Spec |
| :-- | :-- | :-- | :-- |
| **Level A** | Estudo científico revisado por pares (ICLR, NeurIPS, ACL, CHI) / estudo econômico (NBER) | Verde (`#22c55e`) | EVID_02, EVID_04, EVID_06, EVID_08, EVID_09, EVID_10 |
| **Level B** | Preprint / Benchmark empírico de laboratório reconhecido | Azul (`#3b82f6`) | EVID_01, EVID_05, EVID_07, EVID_11 |
| **Level C** | Convenção operacional de FinOps sem norma formal | Amarelo (`#eab308`) | EVID_03 |
| **Level D** | Dados conflitantes / em discussão ativa | Laranja (`#f97316`) | (sem cards nesta versão — EVID_06 usa Level A + flag `isContradictory`) |

---

## 5. Mecânica de Desbloqueio

| Card | Desbloqueado em | Gatilho |
| :-- | :-- | :-- |
| EVID_01 | Cap. 1 | Gráfico de pizza visualizado |
| EVID_02 | Cap. 2 | Simulação executada |
| EVID_03 | Cap. 3 | Revelação do nome formal |
| EVID_04 | Cap. 4 | Quiz respondido |
| EVID_05 | Cap. 5 | Q2 completado com RouteLLM ativado |
| EVID_06 | Cap. 5 | testTimeComputeLevel ≥ 4 em qualquer trimestre |
| EVID_07 | Cap. 4 | Callout de governança visualizado |
| EVID_08 | Cap. 2 | Indicador V_core exibido ao lado das métricas do Gêmeo Digital |
| EVID_09 | Cap. 5 | `multiAgent` ativado sem isolamento OU evento `EVT_07` (ricochete agêntico) disparado |
| EVID_10 | Cap. 4 | Modelo formal *Governed UI/$* (Prêmio de Risco) visualizado |
| EVID_11 | Cap. 5 | `avgContextTokens > 50_000` (Context Rot) OU cache semântico ativado |

Ao desbloquear, a notificação de card novo aparece como toast no canto inferior direito
(`#toast-evidence`) com animação de "ping" por 3 segundos.

---

## 6. Interface do Evidence Board

### 6.1 Painel Lateral (Cap. 1–5)

```
┌─────────────────────────────────────────────┐
│ 🗂 MURAL DE EVIDÊNCIAS                    × │
├─────────────────────────────────────────────┤
│ [EVID_01] 💸 TCO vs. Custo de API   [B] TCO │
│ [EVID_02] 📉 Cascata de Custo       [A] ACC │
│ [EVID_03] 🧭 Definição UI/$         [C] GOV │
│ [EVID_04] 📐 v(m,p) = Cost-of-Pass  [A] TCO │
│ [EVID_05] 🔀 RouteLLM 35%–85%       [B] ROU │
│ [EVID_06] ⚠️ Overthinking           [A] INF │
│ [EVID_07] 📊 Inference Flip         [B] TCO │
│ [EVID_08] 🧠 Carga de Verificação   [A] HUM │
│ [EVID_09] 🔥 Cascata Agêntica       [A] INF │
│ [EVID_10] 🔓 Desconto Open-Source   [A] TCO │
│ [EVID_11] 🪟 Context Rot & Cache    [B] INF │
│                           11/11 coletados   │
└─────────────────────────────────────────────┘
```

Clique em um card → expande com `claim`, `source`, `validityContext` e `limitations`.

### 6.2 Modo Grafo — Conexão de Evidências (Cap. 6)

No Capítulo 6, o painel lateral exibe os cards como nós em uma grade simples (não canvas interativo
de grafo — implementação simplificada para HTML/JS puro sem React Flow).

- Os cards ficam arrastáveis dentro de uma `<div>` com `position: relative` e filhos `position: absolute`.
- Linha de conexão: ao arrastar um card para a zona de resposta, uma linha SVG `<line>` tracejada conecta o card à zona.
- **Zona de resposta**: `<div id="answer-drop-zone">` que aceita drag-and-drop.

> **Nota para o desenvolvedor:** React Flow (`@xyflow/react`) não é usado — a stack é HTML/JS puro.
> A mecânica de conexão visual é simplificada: o card vai para a zona de resposta com animação de
> "snapback" se não for a categoria correta.

### 6.3 Validação de Categoria no Cap. 6

```javascript
// evidence-board.js
isValidForQuestion(cardId, requiredCategory) {
  const card = this.cards.find(c => c.id === cardId);
  return card && card.unlocked && card.category === requiredCategory;
}
```

---

## 7. API Pública do EvidenceBoardManager

```javascript
export class EvidenceBoardManager {
  constructor()

  /** Desbloqueia um card pelo ID. Emite evento DOM 'evidence:unlocked'. */
  unlock(cardId)

  /** Retorna array de cards desbloqueados. */
  getUnlocked()

  /** Retorna card por ID (desbloqueado ou não). */
  getCard(cardId)

  /** Verifica se card é válido para uma categoria de pergunta do Board. */
  isValidForQuestion(cardId, requiredCategory)

  /** Renderiza os cards no painel lateral #evidence-panel. */
  render()
}
```

---

### Referências cruzadas

- Uso dos cards no Cap. 6 → [05_stakeholders_board_engine.md](05_stakeholders_board_engine.md)
- Interface do painel lateral → [08_wireframes_catalogo_componentes.md](08_wireframes_catalogo_componentes.md)
- Acessibilidade dos cards (foco, ARIA) → [09_acessibilidade_seo_metricas.md](09_acessibilidade_seo_metricas.md)
