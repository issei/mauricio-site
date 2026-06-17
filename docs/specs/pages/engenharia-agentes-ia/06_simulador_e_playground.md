# 06 — Simulador de Arquitetura e Playground Educacional

> Cobre os entregáveis **11 (Simulador de arquitetura)** e **12 (Playground educacional)**. Ambos
> usam um **motor de avaliação determinístico, sem LLM em runtime** — o site pratica o princípio que
> ensina (P4/P10). O mesmo motor de regras serve o analisador BPMN ([05 §6](05_bpmn_diagramas_executaveis.md)).

---

## Parte 1 — Simulador de Arquitetura

### 1.1 Objetivo

Deixar o usuário **sentir trade-offs** ajustando parâmetros e vendo, em tempo real, o impacto em seis
dimensões. É a ferramenta-âncora do arquiteto (persona Daniel) e o reforço prático do Cap. 7.

### 1.2 Parâmetros de entrada (controles)

| Parâmetro | Tipo | Faixa | O que representa |
| :-- | :-- | :-- | :-- |
| **Autonomia do agente** | slider | 0–100% | quanto o LLM decide o fluxo (0 = DAG fixo; 100 = agentes livres) |
| **Temperatura** | slider | 0.0–1.0 | aleatoriedade da geração |
| **Schemas (contratos)** | toggle | on/off | validação estrita nas fronteiras |
| **Cache / corpus** | toggle | on/off | reaproveitar processamento |
| **Ledger de quota** | toggle | on/off | orçamento governado |
| **Revisão humana** | toggle | on/off | User Task antes de ações irreversíveis |
| **BDD** | toggle | on/off | cenários (feliz/degradado/open-world) |
| **Evals** | toggle | on/off | avaliação contínua de qualidade |
| **Observabilidade** | toggle | on/off | rastreio/telemetria |

### 1.3 Dimensões de saída (medidores em tempo real)

`Custo` · `Confiança` · `Velocidade` · `Risco` · `Auditabilidade` · `Previsibilidade`
— cada um exibido como `eai-meter` (valor 0–100 + rótulo qualitativo + cor semântica).

### 1.4 Modelo de pontuação (determinístico, documentado)

> **Princípio de design:** o modelo é **transparente e auditável** (não "mágico"). Documentamos os
> efeitos diretos; pesos exatos são calibráveis na implementação, mas as **direções e a forma** são
> fixas. Espelha a fórmula linear do P_score do SocialSelling (combinação ponderada + clamps).

Efeito de cada parâmetro sobre cada dimensão (↑ aumenta, ↓ reduz, — neutro):

| Parâmetro ↓ / Dimensão → | Custo | Confiança | Veloc. | Risco | Auditab. | Previsib. |
| :-- | :-: | :-: | :-: | :-: | :-: | :-: |
| Autonomia ↑ | ↑↑ | ↓ | ↑ | ↑↑ | ↓ | ↓↓ |
| Temperatura ↑ | — | ↓ | — | ↑ | — | ↓↓ |
| Schemas on | ↓(evita retrabalho) | ↑↑ | ↓(leve) | ↓↓ | ↑ | ↑ |
| Cache on | ↓↓ | — | ↑↑ | — | — | ↑ |
| Ledger on | ↓↓ | — | ↓(leve) | ↓ | ↑ | ↑↑ |
| Revisão humana on | ↑(tempo) | ↑↑ | ↓↓ | ↓↓ | ↑ | ↑ |
| BDD on | ↑(setup) | ↑↑ | ↓(leve) | ↓↓ | ↑↑ | ↑↑ |
| Evals on | ↑(leve) | ↑ | — | ↓ | ↑ | ↑ |
| Observabilidade on | ↑(leve) | — | — | ↓ | ↑↑ | ↑ |

**Forma do cálculo (pseudo, por dimensão D):**
```
D = clamp01( base_D + Σ efeito(parâmetro_i, D) )
```
- `clamp01` mantém em [0,1] (espelha os ranges `ge=0/le=1` dos contratos).
- **Não-linearidades intencionais** (para ensinar): com `Schemas=off` **e** `Autonomia alta`, o Risco
  recebe um **termo extra** (interação) — o caos não é só soma, é combinação. Idem: `Ledger=off` com
  `Autonomia alta` dispara um alerta de "custo potencialmente ilimitado".

### 1.5 Experiência e feedback

- Mover um slider/toggle anima os medidores afetados (transição suave) e **escreve o porquê** abaixo:
  "Autonomia ↑ → Previsibilidade ↓↓ porque o fluxo deixa de ser reproduzível."
- **Cenários pré-definidos** (botões): "Demo caótica" (autonomia 100, schemas/ledger off) × "Produção
  disciplinada" (autonomia baixa, tudo on) — para comparação imediata.
- **Alertas semânticos:** combinações perigosas acendem um callout (ex.: "sem ledger + autonomia
  alta = conta-surpresa").

### 1.6 Ficha técnica

- **Objetivo:** internalizar trade-offs por manipulação.
- **UX:** ajustar → ver impacto → ler o porquê; comparar cenários.
- **Componentes:** `eai-slider-param`, `eai-meter`, `eai-toggle-scenario`, `eai-xai-feedback`.
- **Tecnologias:** HTML/Tailwind + JS puro (estado reativo simples); sem dependência pesada.
- **Complexidade:** **Média** (a lógica está no modelo de pontuação, que é tabela + função pura).
- **Riscos:** modelo parecer arbitrário / "achismo". **Mitigação:** documentar direções (tabela
  acima), rotular como modelo didático calibrável, manter determinístico e testável.

---

### 1.7 Evals: Erro de Sistema × Erro de Modelo (validação estrutural × avaliação semântica)

> Expansão do parâmetro **Evals**. O simulador passa a ensinar que **contrato e avaliação atacam
> falhas diferentes** — e que uma saída pode estar perfeitamente válida e ainda assim errada.

| | **Erro de Sistema** | **Erro de Modelo** |
| :-- | :-- | :-- |
| O que é | falha **estrutural**: tipo errado, campo extra, `score=1.7`, JSON malformado | saída **estruturalmente válida** mas **semanticamente errada**: *drift*, alucinação lógica bem formatada, raciocínio incorreto |
| Quem pega | **Contratos rígidos** (P5/V4) — deterministicamente, em runtime | **Evals semânticos** — o contrato **não** vê |
| Custo/natureza | barato, binário, em runtime | exige julgamento; amostral, fora do caminho crítico |

O toggle **Evals** modela, portanto, **duas camadas distintas**:

1. **Validação estrutural** — acoplada a `Schemas`; zera o **Erro de Sistema**.
2. **Avaliação semântica** — o `Evals`; detecta o **Erro de Modelo** via **LLM-as-a-judge** e/ou
   métricas contra referência.

**LLM-as-a-judge no laboratório (e por que não viola "zero LLM em runtime"):**

- O avaliador roda **offline / fora do caminho crítico** — pontua **amostras** contra uma **rubrica
  fixa**, gera uma **métrica agregada** (taxa de *drift*, % de alucinação) e **nunca** decide em
  runtime. Mantém o *deterministic-first* e a regra do site (nenhum LLM no caminho crítico do
  produto; o LLM-judge é instrumento de medição, como evals em CI).
- O próprio juiz é **estocástico** → tratá-lo como **sensor com incerteza** (Open-World): rubrica
  fixa, painel de concordância juiz↔humano, **amostragem humana** de calibração. Nunca verdade
  absoluta.

**Efeito no modelo de pontuação (§1.4):** ligar `Evals` (semântico) → `Confiança` ↑, `Auditabilidade`
↑, `Custo` ↑ (leve, amostral/offline), e reduz especificamente o **risco de Erro de Modelo** — efeito
**distinto** de `Schemas`, que zera o Erro de Sistema. Combinação `Schemas=on` + `Evals=off` ensina a
lição central: "passou no contrato" ≠ "está correto".

---

## Parte 2 — Playground Educacional

### 2.1 Objetivo

Laboratório onde o usuário **monta uma arquitetura** arrastando componentes e a recebe **avaliada
automaticamente** com feedback visual explicativo. É o capstone do Cap. 10.

### 2.2 Componentes arrastáveis (paleta)

| Peça | Papel | Conecta-se a |
| :-- | :-- | :-- |
| **LLM** | geração/inferência (estocástico) | recebe de Schema/API; sai para Schema |
| **Schema** | contrato rígido (valida fronteira) | entre quaisquer duas peças |
| **API** | fonte de dados externa / I/O | entrada do fluxo |
| **RAG** | recuperação de contexto | alimenta LLM |
| **Ledger** | governança de orçamento | anexa a chamadas de LLM/API |
| **Cache** | reaproveitamento (corpus) | antes de LLM/API |
| **BDD** | suíte de cenários | anexa ao fluxo (gate de qualidade) |
| **Human Review** | aprovação humana | antes de saída irreversível |
| **Guardrails** | políticas/limites | em torno do LLM |
| **Observabilidade** | telemetria | transversal |

Mais um par implícito de **Fonte → Vitrine** (Cérebro/Vitrine) para fechar o fluxo.

### 2.3 Mecânica de montagem

- **Canvas** com drag-and-drop da paleta; conectar peças por setas (`eai-connection`).
- Conexões válidas ficam neutras; **inválidas** (ex.: LLM→saída sem Schema) ficam vermelhas; **ciclos
  sem parada** acendem como loop.
- Briefing no topo define o desafio (ex.: "tier gratuito, dado sensível, priorizar leads").

### 2.4 Regras de avaliação (o motor compartilhado)

> Mesmo motor determinístico do analisador BPMN ([05 §6](05_bpmn_diagramas_executaveis.md)),
> aplicado ao grafo do canvas. Cada regra é uma **função pura** que inspeciona o grafo e emite um
> achado com severidade + explicação.

| Regra | Condição detectada | Severidade | Mensagem (exemplos do meta-prompt) |
| :-- | :-- | :-- | :-- |
| Loop sem parada | ciclo sem Human Review/condição | ❌ alta | "Risco alto de loops." |
| Fronteira sem contrato | duas peças ligadas sem Schema entre fontes não confiáveis | ❌ alta | "Ausência de validação." |
| LLM controla fluxo | LLM com múltiplas saídas de decisão | ⚠ média | "LLM no controle do fluxo — prefira um DAG fixo." |
| Sem ledger em tier pago/gratuito | chamadas de LLM/API sem Ledger | ⚠ média | "FinOps ausente: risco de estouro de quota." |
| Sem cache com volume | sem Cache num fluxo de alto volume | ⚠ baixa | "Você pode estar repagando processamento." |
| Sem Human Review antes de ação irreversível | saída crítica sem aprovação | ⚠ média | "Sem trava humana antes da publicação." |
| Sem BDD | fluxo sem suíte de cenários | ⚠ baixa | "Sem cenários degradado/open-world testados." |
| Dado sensível exposto na Vitrine | evidência bruta/score cruza para a Vitrine | ❌ alta | "Vitrine não deve ver o score/evidência." |
| Arquitetura saudável | todas as travas presentes, sem loops | ✅ | "Excelente governança." |

- **Pontuação de cobertura:** quantos dos 10 princípios a arquitetura satisfaz (0–10), exibida como
  selo, **sem** ranking competitivo.
- **Feedback visual:** achados listados no painel `eai-xai-feedback`, cada um **apontando a peça/seta
  culpada** (highlight no canvas) e **explicando o porquê** + o princípio violado.

### 2.5 Desafios (modos)

1. **Monte do zero** — briefing aberto; avalia cobertura dos 10 princípios.
2. **Conserte esta arquitetura** — canvas pré-preenchido com 2–3 defeitos (loop, fronteira sem
   contrato, sem ledger); objetivo: zerar os achados de severidade alta.
3. **Capstone (Cap. 10)** — briefing do SocialSelling; conclusão do site.

### 2.6 Ficha técnica

- **Objetivo:** avaliar e criar arquiteturas; consolidar os 10 princípios.
- **UX:** arrastar → conectar → avaliar → corrigir; feedback explicativo e localizado.
- **Componentes:** `eai-draggable-node`, `eai-connection`, `eai-xai-feedback`, paleta, canvas.
- **Tecnologias:** canvas de grafo — **Cytoscape.js** (recomendado: nós/arestas, layout, detecção de
  ciclo nativa) ou SVG+lib leve de DnD; motor de regras em JS puro (funções puras testáveis).
- **Complexidade:** **Alta** (DnD + grafo + motor de regras + feedback localizado).
- **Riscos:** (a) DnD frágil em mobile; (b) motor de regras dar falso positivo/negativo; (c) curva de
  uso. **Mitigação:** desafio "conserte" como onboarding; em mobile, modo lista+conexões simplificado
  ou versão read-only com aviso; regras como funções puras **com testes** (espelha o BDD do site);
  começar pelo modo "conserte" (espaço de estados curado) antes do "monte do zero".

> **Por que Cytoscape.js e não BPMN aqui?** O Playground é um **grafo livre de componentes**
> (topologia), não um processo BPMN formal. Cytoscape dá detecção de ciclos, layout e seleção de
> nós/arestas prontos — exatamente o que o motor de regras precisa inspecionar. O BPMN (doc 05) fica
> para os diagramas de **processo** curados. Ambos compartilham o **mesmo motor de regras**.

---

### Referências cruzadas

- Motor de regras / análise de fluxo (BPMN) → [05 §6](05_bpmn_diagramas_executaveis.md)
- Capstone e gate de conclusão → [02 Cap. 10](02_jornada_de_aprendizagem.md)
- Wireframes do Simulador e do Playground → [03](03_wireframes_e_catalogo_de_componentes.md)
- Acessibilidade de DnD e equivalentes → [08](08_acessibilidade_e_metricas.md)
- Faseamento (Simulador V1, Playground V2) → [09](09_roadmap_esforco_riscos.md)
