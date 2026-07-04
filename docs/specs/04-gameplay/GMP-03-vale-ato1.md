---
id: GMP-03
titulo: Fase 2017 (Vale) — Ato I: A Descida
versao: 1.0.0
status: aprovado
dominio: gameplay
depende-de: [CTR-02, CTR-07, CTR-04]
consumido-por: [A5]
---

# GMP-03 — Vale, Ato I

## Contexto
Fase 11 (`kintsugi_rebase`) é o set-piece central: colapso (alopecia, jan/2017)
e reconstrução Kintsugi. CMP-14 orquestra, suspendendo o fluxo padrão. Este doc:
do `phase:changed` até a chegada ao Monolito. Atos II–III em GMP-04.

## Objetivo
Degradação ambiental progressiva e legível — o jogador sente que algo está
errado antes de qualquer texto dizer isso.

## Regras (ordenadas por distância percorrida no quadrante; comprimento 54 unidades)
- RG-01 Publicar `vale:act1` na entrada. Rampa do corredor: −8° no eixo Y
  (o HUD permanece nivelado — referência vestibular, ver ACC-01).
- RG-02 Grid: a cada 4 unidades, `uGridDensity` −12% (até mínimo 40%).
  Linhas somem sem flicker (fade 400ms) — buracos de escuro.
- RG-03 Partículas: gravidade invertida — caem a 0,3 un/s (modo `fall`, RND-03).
- RG-04 Trilhos: modo conflito com labels `<<<<<<< cuidar_de_todos` /
  `>>>>>>> cuidar_de_si` (GMP-05).
- RG-05 Áudio: CUE-VALE-01 na entrada; CUE-VALE-02 aos 50% do quadrante;
  CUE-VALE-03 a 12 unidades do Monolito (CTR-07).
- RG-06 Log de produção (posições fixas, unidades do quadrante):
  u8: `[WARN] health.self: sem monitoração há 1.247 dias` ·
  u20: `[WARN] packet loss: 12%` · u30: `23%` · u40: `41%` ·
  u46: `[ERROR] esposa.status: internada — thread blocked`.
- RG-07 Telemetria: stress rampa 62→97 com 8% amostras NaN (CTR-04);
  threads: 1 marcada `blocked` (UI-01).
- RG-08 Companion: intervalo de fala 10–19s → 45s no primeiro terço → silêncio
  total no restante (nenhuma fala até GMP-04 Ato III).
- RG-09 `cd` para fora da fase é permitido ANTES do Ato II; retornar reinicia o
  Ato I do começo (CTR-08 §extremos).

## Interfaces
Publica: `vale:act1`, `cue:trigger`. Assina: `player:moved` (progresso por
distância). Lê: `a11yFlags` (traduções ACC-01).

## Casos extremos
- Jogador correndo direto sem parar: todos os gatilhos são por posição, não por
  tempo — a degradação nunca é pulada.
- Jogador parado no meio: estado estável; log não repete WARNs já emitidos.
- Safe-mode: rampa mantida (é do mundo, não da câmera); flicker de conflito
  substituído por pulso de opacidade lento.

## Critérios de aceite
- [ ] Todos os gatilhos disparam por posição (testável com teleporte parcial).
- [ ] Grid nunca abaixo de 40% de densidade.
- [ ] Companion: zero falas após o primeiro terço.
- [ ] HUD nivelado durante a rampa.

## Referências
GMP-04 (Atos II–III), RND-02/03 (efeitos), AUD-02 (cues detalhados).
