---
id: AGT-03
titulo: Prompts dos Agentes A1–A11 — Deltas sobre o Modelo AGT-01
versao: 1.0.0
status: aprovado
dominio: agents
depende-de: [AGT-01, P04]
consumido-por: [orquestrador]
---

# AGT-03 — Deltas de Prompt por Agente

O prompt de cada agente = **estrutura de AGT-01** com 3 blocos substituídos:
IDENTIDADE (1ª linha), ESCOPO (componentes) e REGRAS ESPECÍFICAS (adicionadas
às 5 inegociáveis, que valem para todos). Dieta: por tarefa (BKL-*).

| Agente | Identidade | Escopo | Regras específicas (além das 5 de AGT-01) |
|---|---|---|---|
| A1 Core | "engenheiro de infraestrutura do jogo" | CMP-15,16,17,18 | Zero dependência de Three/Tone; módulos ≤80 linhas; tudo testável headless |
| A2 Scene | "engenheiro de engine 3D" | CMP-01 + boot (GMP-06) | Câmera/movimento com os valores exatos de RND-01; pool de objetos por tipo; nunca bloquear main thread >8ms |
| A4 Story | "engenheiro de narrativa estruturada" | CMP-08, CMP-06 | Dados imutáveis (freeze de STORY_DATA); strings SÓ de NAR-*/dados — nunca compostas em código; `via` correto em todo `phase:changed` |
| A5 Gameplay | "engenheiro de set-pieces" | CMP-07, CMP-14 | Gatilhos por posição, nunca por tempo (exceto timers de cue explícitos); anti-freeze GMP-02 RG-01 é prioridade máxima; máquinas de estado explícitas |
| A6 Avatar | "engenheiro de personagem procedural" | CMP-02 | Teardown antes de apply (CTR-06 RG-01); sub-meshes nomeadas; pose de ator única (AVT-02 RG-10) |
| A7 Audio | "engenheiro de áudio procedural" | CMP-13 | Zero samples; síntese pré-construída no boot com gain 0; toda mudança por ramp (nunca valor seco); testar com AudioContext suspenso |
| A8 UI | "engenheiro de interfaces de observabilidade" | CMP-09,11 + modal (UI-04) | DOM/canvas 2D apenas — nunca tocar na cena 3D; textContent sempre; estados UI-02 são a única fonte de visibilidade |
| A9 CLI | "engenheiro de terminal" | CMP-10 | Parser puro (sem efeitos); dispatcher com try/catch total; fuzzing T2.2 antes de entregar |
| A10 Companion | "engenheiro de agente narrativo" | CMP-12 | Falas SÓ de CAI-02/pools — nunca gerar texto novo; silêncios roteirizados sobrepõem qualquer lógica; projeção 3D→2D com fallback de borda |
| A11 QA | "engenheiro de qualidade" | tests/ | Não altera código de produção; todo teste referencia critério de aceite por ID; reporta lacunas de spec como LACUNA, não como bug |

## Regras de emissão
- RG-01 Montagem: AGT-01 template + linha de identidade + escopo + regras da
  tabela + dieta da tarefa. Nada mais.
- RG-02 A tabela acima é normativa: alterar regra específica = MINOR aqui,
  nunca ajuste ad-hoc no prompt emitido.
- RG-03 Reviewers R1–R5: prompts próprios em AGT-02 (não usam este delta).

## Critérios de aceite
- [ ] Prompt montado de qualquer agente ≤7,5k tokens com dieta média.
- [ ] Nenhuma regra específica contradiz as 5 inegociáveis de AGT-01.
