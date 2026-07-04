---
id: UI-01
titulo: Dashboard SRE — Métricas e Sparklines
versao: 1.0.0
status: aprovado
dominio: ui
depende-de: [CTR-04, CTR-02, CTR-03]
consumido-por: [A8]
---

# UI-01 — Dashboard

## Contexto
HUD de observabilidade com 4 métricas (Stress, Active Threads, LoC Compiled,
Token/s). Valores vêm de CTR-04; estados de atenção (quando mostrar o quê) em
UI-02. Estética: plausível num Grafana/Datadog real — zero elementos de jogo.

## Objetivo
Painéis de telemetria que contam a história por números, sem nunca contradizer
a fase ativa.

## Regras
- RG-01 Sparklines: canvas 2D, histórico 40 amostras, refresh 350ms, linha 1px
  + preenchimento 12% de opacidade. Cores: CTR-03 §Cores fixas (LoC usa accent
  do arco).
- RG-02 Layout expandido: 4 painéis 150×64px empilhados no canto superior
  direito; cada um com rótulo (fonte mono 10px), valor corrente (16px) e
  sparkline. Layout colapsado (AMBIENT — UI-02): régua única 280×22px com os 4
  valores numéricos.
- RG-03 Stress: renderizar amostras NaN como LACUNA (gap na linha), nunca 0.
  Pós-Vale: linha de referência horizontal fixa em 97, 1px, cor ouro
  (`#d9b06a`), com rótulo `max` — permanente até o fim.
- RG-04 Threads: valor inteiro com animação de incremento (novo segmento
  "handshake": pisca 2× e assenta). Thread `blocked` (CTR-04): segmento do
  valor renderizado a 40% de opacidade piscando 0,5Hz.
- RG-05 Aura v4 (amortecimento — CTR-04): quando um spike é amortecido,
  desenhar o pico original em 20% de opacidade e o valor amortecido sólido —
  o jogador VÊ a aura trabalhando.
- RG-06 LoC: contador com formatação abreviada (12.4k, 1.2M); só incrementa em
  movimento (CTR-04 RG-03).
- RG-07 Token/s: barra fina adicional de saturação; ao atingir ≥96 (marco 12),
  micro-pulso dourado 1x (não repetir).
- RG-08 Fonte de dados: EXCLUSIVAMENTE `TELEMETRY_RULES[telemetryKey]` +
  eventos; proibido estado próprio de negócio no componente.

## Interfaces
- Assina: `phase:changed`, `player:moved` (LoC), `vale:*`.
- Publica: `metric:paged` (com `citavel` — CTR-04 §Limiares, cooldown 8s).

## Casos extremos
- Fase trocada no meio de animação de spike: completar o frame e resetar
  buffers de histórico com fade 400ms (não corte).
- Canvas com devicePixelRatio 3: cap em 2 (nitidez suficiente, custo contido).
- Tela <380px de largura: apenas régua colapsada disponível; expandido vira
  overlay temporário de 8s.

## Critérios de aceite
- [ ] Todos os valores por fase batem com a tabela CTR-04 (teste tabelado).
- [ ] NaN = lacuna visível; nunca zero.
- [ ] Linha dourada 97 presente em todos os marcos pós-Vale e após reload.
- [ ] `metric:paged` nunca dispara 2× em <8s para a mesma métrica.
