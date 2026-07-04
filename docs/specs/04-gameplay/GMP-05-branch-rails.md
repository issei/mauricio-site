---
id: GMP-05
titulo: Trilhos de Branch (BranchRails)
versao: 1.0.0
status: aprovado
dominio: gameplay
depende-de: [CTR-01, CTR-02, CTR-03]
consumido-por: [A4]
---

# GMP-05 — BranchRails

## Contexto
Dois trilhos de neon no chão materializam os branches da vida: pessoal (rosa
`#ff77c8`, esquerda) e profissional (verde `#4dff9c`, direita). Estados mudam
por marco (`gitOp` e `branchWeight` de CTR-01).

## Objetivo
Geometria e estados dos trilhos legíveis à distância, sem texto.

## Regras
- RG-01 Geometria base: 2 linhas emissivas paralelas, offset ±1,6 unidades do
  eixo central, altura 0,02 (evitar z-fighting com grid).
- RG-02 `branchWeight` desloca o corredor jogável: peso 0,8 pessoal = paredes
  invisíveis empurram o caminho 40% para o lado rosa (lerp 2s na entrada do
  quadrante). Peso 0,5/0,5 = centrado.
- RG-03 Estados por `gitOp`:
  - `none`: paralelos, brilho constante + pulso suave no ritmo do passo.
  - `merge`: curvam-se (bezier, 20 unidades) até nó luminoso sob o Monolito;
    APÓS o marco 8, permanecem trançados (hélice de período 6 un) até o fim.
  - `conflict`: sobrepostos no eixo central, flicker `#ff3344` alternado 2Hz
    (safe-mode: pulso de opacidade 0,5Hz); marcadores 3D `<<<<<<<` flutuando.
  - `panic`: trilho pessoal interrompe-se por 6 unidades (gap escuro) e retorna.
  - `cherry-pick`: glifo viaja pelo trilho verde e salta ao rosa (1 vez).
  - `rebase`: ambos os trilhos re-renderizam à frente com tinta `#ff8c00` (30%
    de mistura no verde) — NAR-03.
- RG-04 Trilho profissional só acende a partir do marco 3 (`first_deploy`);
  antes, existe apagado (visível a 10% — o potencial).
- RG-05 Nó de merge: esfera emissiva raio 0,5, branca com halo do accent, pulso
  1Hz; reutilizada entre marcos (1 instância).

## Interfaces
Assina: `phase:changed`, `player:moved` (pulso). Lê: `ARC_THEME` (CTR-03 —
apenas cores fixas de trilho, nunca accent).

## Casos extremos
- Zigue-zague do conflito (marco 5): garantir corredor jogável mínimo de 1,2
  unidades de largura em qualquer instante (nunca prender o jogador).
- Revisita via `cd` a marco pré-merge após já ter casado: estado do trilho é o
  DO MARCO VISITADO (a vida daquela época), exceto cicatrizes (CTR-08).
- Mobile (tela estreita): offset dos trilhos reduz para ±1,2.

## Critérios de aceite
- [ ] Estados visuais distinguíveis sem ler nenhum texto (teste com usuário).
- [ ] Trançado do pós-merge presente em todos os marcos ≥8.
- [ ] Gap do `panic` exatamente no quadrante 6.
- [ ] Flicker de conflito desativado em safe-mode (pulso lento).
