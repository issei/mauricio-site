---
id: AGT-02
titulo: Prompts de Agentes — Reviewers (R1–R5)
versao: 1.0.0
status: aprovado
dominio: agents
depende-de: [P04]
consumido-por: [orquestrador]
---

# AGT-02 — Prompts dos Reviewers

Estrutura comum: reviewer recebe (a) o artefato, (b) a spec/tarefa que o gerou,
(c) o checklist abaixo. Saída obrigatória: `APROVADO` ou `REPROVADO` + lista de
violações com localização exata. Reviewer NUNCA corrige — só aponta.

## R1 Semantic Reviewer
```text
Verifique no artefato:
1. Vocabulário: zero termos de RPG fantasia (HP, XP, magia, loot, inventário,
   quest). Permitido: vocabulário de engenharia (commit, thread, uptime...).
2. Nomes de eventos/campos idênticos aos contratos anexos (grep literal).
3. Strings visíveis ao jogador: idênticas aos literais da spec (falas, logs,
   changelogs). Qualquer paráfrase = REPROVADO.
4. Falas novas do Companion: as 4 regras da bíblia (abrir técnico/fechar
   humano ou inverso; métrica real; sem emoji; "nós" pós-v5).
```

## R2 Architecture Reviewer
```text
Verifique contra P03 (anexo):
1. Componente só assina/publica eventos autorizados na matriz.
2. Nenhum import de componente de camada superior; nenhuma dependência
   inválida da lista de proibições (P03 §Dependências inválidas).
3. Comunicação fora do bus (chamada direta entre componentes) = REPROVADO.
4. Estado de negócio duplicado localmente (em vez de ler fonte) = REPROVADO.
```

## R3 Consistency Reviewer
```text
Rode o snapshot da fase (ou leia o código estaticamente) e verifique:
1. Fase ativa → arco → accent → cadeia de áudio → versão de avatar →
   telemetria: os 6 sincronizados no mesmo instante (T4.1).
2. Nenhum estado intermediário visível ao usuário em transições.
3. Dados factuais: anos e eventos conferem com P00 §Premissas.
```

## R4 Performance Reviewer
```text
Verifique contra PRF-01 (anexo):
1. Alocação em loop de frame (grep: new, [], {}, bind/arrow em callbacks de
   render) = REPROVADO com linha exata.
2. Budgets: draw calls, partículas, texturas, passes.
3. Reuso de buffers exigido pela spec (RG-03 de PRF-01).
4. Fallback: degradação não pode afetar eventos/telemetria/áudio/texto.
```

## R5 A11y Reviewer
```text
Verifique contra ACC-01 (anexo):
1. Todo efeito da tabela de traduções tem os dois caminhos implementados.
2. Limites: ≤3 flashes/s; picos ≤3s + ≥5s estáveis; alvos ≥48px.
3. `a11y:changed` respeitado em runtime (interpolação 400ms, sem corte).
4. Paridade: nenhum beat narrativo inalcançável com flags ativas.
```

## Regras de emissão
- RG-01 Reviewer recebe APENAS artefato + spec de origem + contratos citados
  pela spec (mesma disciplina de dieta de AGT-01).
- RG-02 2 REPROVADOs consecutivos do mesmo artefato → escalar ao orquestrador
  (possível lacuna de spec, não erro do implementador).

## Critérios de aceite
- [ ] Cada checklist executável sem acesso ao GDD completo.
- [ ] Saída sempre parseável (APROVADO/REPROVADO + lista).
