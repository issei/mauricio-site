---
id: TST-02
titulo: Matriz de Rastreabilidade (aceite ↔ teste) + Roteiro UX
versao: 1.0.0
status: aprovado
dominio: test
depende-de: [TST-01]
consumido-por: [A11, release-manager]
---

# TST-02 — Rastreabilidade

## Contexto
Gate de release exige: todo critério de aceite de spec coberto por ≥1 teste.
Formato: `spec → grupo(s) TST-01`. Célula vazia = lacuna (bloqueia gate).

## Matriz (por spec; critérios na ordem em que aparecem no doc)
| Spec | Cobertura |
|---|---|
| CTR-01/03/04 (dados) | T1.1 · T1.3 · T1.2 |
| CTR-02/08 (bus/sessão) | T3.2 · T3.3 (+ ADR-003 via T3) |
| CTR-05/06/07 | T2.1 · T4.2 · T7.3 |
| NAR-01 | T4.4 (silêncio) · T4.3 (scar) · T1.1 (fatos) · R1 (strings) |
| NAR-02 | T4.3 · T4.1 (câmera 4° via snapshot) · T1.1 · grep "fim" |
| NAR-03 | T2.1 (git log corte) · T4.1 · R1 (literais) |
| GMP-01 | T5.1 · T5.2 · T4.3 (revisita) · caso 404 (teste dedicado T5.7*) |
| GMP-02 | T5.2 · T5.5 · T5.6 · foco de aba (T5.8*) |
| GMP-03 | T5.1 · T5.4 (parcial) · T4.4 · snapshot HUD nivelado (T6.2) |
| GMP-04 | T5.3 · T5.4 · T4.3 · T5.5 |
| GMP-05 / GMP-06 | T4.1 + teste visual R3 · T5.6 (reload fase 12) + T2.1 |
| RND-01..04 | T7.1 · T7.2 · T4.2 · T6.1 |
| AVT-01/02 | T4.2 · T4.2 · T4.3 · T4.1 |
| AUD-01/02 | T7.3 · T5.4 · T7.3 · T5.4 |
| CAI-01/02 | T4.4 · T4.1 · pool sem repetição (T4.5*) · R1 |
| CLI-01/02 | T2.2 · T2.3 · T5.5 · T6.3 |
| UI-01..04 | T1.2 (tabelado) · T3.1 · T4.4 (log silêncio) · T6.3 (modal) |
| ACC-01 / PRF-01 / SEC-01 | T6.1 · T6.2 · T7.1 · T7.2 · SEC (grep+fuzz save) |
(*) = teste novo a criar em BKL-alpha-12; incluir na suíte com estes IDs.

## Roteiro do teste com usuários (BKL-beta-06)
1. Sem instruções: observar até o marco 3 (aprende a andar? encontra o Monolito?).
2. Pedir: "descubra o que aconteceu em 2011" (usa CLI? `cd`? anda?).
3. Fase 11 completa SEM ajuda (métrica-chave: alguém acha que travou? → falha
   do anti-freeze; cronometrar hesitações no merge).
4. Perguntar ao final: o que a linha dourada no chão significa? (tese chegou?)
5. Mobile: repetir 3 no touch. Registrar: tempo, erros de token, frustração 1–5.

## Regras
- RG-01 Matriz atualizada a cada spec nova/alterada (Documentation Engineer).
- RG-02 Célula com apenas revisão humana (R1/R3) é válida para strings/estética;
  comportamento exige teste automatizado.

## Critérios de aceite
- [ ] Zero células vazias no gate de RC.
- [ ] Testes (*) criados e nomeados conforme esta matriz.
