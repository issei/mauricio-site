---
id: RMP-01
titulo: Roadmap — MVP → Produção
versao: 1.0.0
status: aprovado
dominio: backlog
depende-de: [BKL-01, BKL-02, TST-01]
consumido-por: [orquestrador, dono]
---

# RMP-01 — Roadmap

## Etapas e gates
| Etapa | Conteúdo | Entregável verificável | Gate de saída |
|---|---|---|---|
| **MVP** | BKL-01 (13 tarefas): corredor, 12 fases, Monolitos+hold, telemetria, áudio, avatar | Jogável do boot ao HEAD andando; Vale em versão "reveal simples" (sem orquestração) | T1–T3 verdes; T5.2 anti-freeze; R2/R4 aprovados |
| **Alpha** | BKL-02 (12 tarefas): CLI, Companion, Rails, Vale completo, boot/final, modal | Experiência narrativa completa desktop+mobile | T4–T6 verdes; matriz TST-02 sem lacuna; R1/R3/R5 aprovados |
| **Beta** | BKL-03 §Beta: polish (transições, flavor pool, ADR-002 fala de revisita), SEC-01, ajuste fino de áudio | Sessão inteira sem WARN de performance; sessão safe-mode assinada | Gate TST-01 RG-02 completo; teste com 3 usuários reais (1 mobile) |
| **RC** | BKL-03 §RC: correções do beta, textos NAR-04 aprovados pelo dono, revisão final de conteúdo | Candidate congelada; `status: aprovado` em NAR-04 | Aprovação escrita do dono (conteúdo biográfico) |
| **Produção** | Deploy no site (rota + link no catálogo/footer das páginas irmãs) | `lifeos.html` público | Smoke test em 3 navegadores + 2 dispositivos |
| **Pós** | OBS-01 (opcional), BKL-04 se surgir escopo novo | — | — |

## Regras
- RG-01 Nenhuma etapa inicia sem o gate anterior fechado (sem "adiantar" wave).
- RG-02 Escopo novo em qualquer etapa → volta ao pipeline: spec primeiro
  (TPL-spec), tarefa depois. Nunca código sem doc.
- RG-03 O dono é gate humano em 2 pontos: RC (conteúdo) e Produção (deploy).
- RG-04 Estimativa de calendário: fora deste doc (depende de cadência de
  sessões de agente; medir throughput real no MVP e projetar).

## Riscos de cronograma (top 3)
1. BKL-alpha-08 (Vale II–III) — tarefa G, mais integrações; quebrar cedo.
2. T6.1 (luminância) pode reprovar efeitos já prontos → rodar protótipo do
   analisador JÁ no MVP (antecipação barata).
3. Aprovação de conteúdo (NAR-04) — envolver o dono no fim do Alpha, não no RC.

## Critérios de aceite
- [ ] Cada gate verificável sem julgamento subjetivo (exceto os 2 humanos).
- [ ] Toda tarefa de BKL-* mapeada a exatamente 1 etapa.
