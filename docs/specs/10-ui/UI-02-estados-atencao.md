---
id: UI-02
titulo: Estados de Atenção (AMBIENT / PAGED / FOCUS)
versao: 1.0.0
status: aprovado
dominio: ui
depende-de: [UI-01, CTR-02]
consumido-por: [A8]
---

# UI-02 — Estados de Atenção

## Contexto
Experiência contemplativa não pode exigir vigilância de 4 gráficos + log +
mundo 3D. Filosofia SRE real: ninguém olha dashboard — configura-se alerta e
confia-se no pager. Três estados governam TODA a UI (dashboard, log, botões).

## Objetivo
A tela pertence ao corredor; a interface só fala quando tem algo a dizer.

## Regras — máquina de estados
- RG-01 **AMBIENT** (padrão): dashboard = régua colapsada (UI-01 RG-02);
  log de produção a 40% de opacidade com throttle alto (1 linha/1,2s máx.);
  botões (`>_`) a 50%.
- RG-02 **PAGED** (entrada: `metric:paged`): SOMENTE a métrica do evento
  expande para painel completo, pulsa 2× (300ms cada) e mostra a causa em
  sublinha (o `citavel`). Demais permanecem colapsadas. Saída: auto-recolhe
  após 8s OU novo estado. Fila: pages simultâneos processados em série.
- RG-03 **FOCUS** (entrada: modal aberto, `forced-open`, ou CLI em foco):
  HUD inteiro a 12% de opacidade; log pausado (buffer segurado, não perdido);
  mundo 3D com bloom +20% e exposição −15% (desfoque de atenção — RND-04).
  Saída: retorno ao estado anterior com fade 400ms.
- RG-04 Prioridade: FOCUS > PAGED > AMBIENT. PAGED durante FOCUS: suprimido
  (o `citavel` ainda vai ao log depois).
- RG-05 Contemplação implícita: `player:idle {seconds:6}` → toda a UI esmaece
  a 15% até o próximo input (qualquer tecla/toque restaura em 250ms).
- RG-06 Fixação manual: `top` no CLI ou toque na régua fixa o dashboard
  expandido (ignora auto-recolher) até novo toque/`top`. Persistir preferência
  na sessão (CTR-08 não versiona isso: é efêmero por design — reavaliar).
- RG-07 Transições SEMPRE com fade (250–400ms); proibido aparecer/sumir seco.

## Interfaces
- Assina: `metric:paged`, `player:idle`, `cli:opened/closed`,
  `monolith:reveal-start`, `memory:unlocked`, `vale:*`.
- Expõe: `uiState` (leitura, para debug/testes).

## Casos extremos
- `metric:paged` de stress durante o Vale (esperado: rampa cruza 80): permitir
  UMA page de stress no Ato I (dramaticamente correto); depois suprimir —
  regra especial: fase 11 limita pages a 1 por métrica.
- Idle durante PAGED: PAGED completa os 8s antes do esmaecimento.
- Touch: hover não existe; régua expande por toque (RG-06 cobre).

## Critérios de aceite
- [ ] Nunca 2 painéis expandidos simultaneamente (exceto fixação manual).
- [ ] FOCUS derruba opacidade do HUD em ≤400ms em 100% das entradas de modal.
- [ ] Buffer do log não perde linhas durante FOCUS.
- [ ] Máquina de estados sem estado inalcançável (revisão R2 + teste).
