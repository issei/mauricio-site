---
id: GMP-02
titulo: Decode Sustentado (Hold) — Memórias Pesadas
versao: 1.0.0
status: aprovado
dominio: gameplay
depende-de: [GMP-01, CTR-02, CTR-07]
consumido-por: [A5]
---

# GMP-02 — Decode Sustentado

## Contexto
Memórias com `emotionalLoad = 3` (marcos 6 e 11) falham no meio do decode e
exigem sustentação ativa do jogador. Risco central: parecer freeze da aplicação.

## Objetivo
Travessia sustentada com feedback contínuo, em ciclos de respiração, idêntica em
significado no desktop ([ENTER]) e mobile (toque longo).

## Regras
- RG-01 **Anti-freeze (inviolável):** durante o hold, a cada frame exibir
  percentual em movimento; a cada ≤1,5s: 1 passo de resolução OU 1 bloco de
  macroblock corrigido, + beep de progresso (CUE-DECODE em modo pesado).
  Prompt persistente: `SEGURE PARA SUSTENTAR A DECODIFICAÇÃO ▸ {pct}%`.
- RG-02 **Ciclos de respiração:** travessia total ~9s dividida em 3 ciclos:
  sustentar ~2,5s → sistema pede soltura (`> solte. respire. segure de novo.`,
  janela 0,8s) → próximo ciclo. Cada ciclo destrava ⅓ da imagem.
- RG-03 Soltar fora da janela: pausa sem punição; percentual congela ANIMANDO
  (pulso de opacidade) e o prompt continua visível.
- RG-04 Corrupção visual durante travamento: imagem presa em 14px (marco 11) ou
  frame preto (marco 6); macroblocks 8×8 deslocados; contador pode regredir
  (`67%… 41%…`) sempre animando; beep -20% de frequência.
- RG-05 Typewriter com backspaces: erros digitados e corrigidos visíveis
  (`a conta venceu tod█toda de uma vez.`) — lista exata de strings em NAR-01/02.
- RG-06 Input: desktop = manter [ENTER]; mobile = toque longo em qualquer ponto
  do modal (área inteira é alvo — sem botão pequeno). Trocar de input no meio
  é permitido.
- RG-07 Publicar `monolith:decode-progress` a cada mudança de pct (mín. 1/1,5s).

## Casos extremos
- Jogador nunca segura: estado estável indefinidamente; aos 20s de inatividade o
  Companion (se não estiver em silêncio narrativo) sugere: `[AGENT] segure. eu seguro com você.`
  (exceção: no marco 11 esta fala NÃO ocorre — silêncio do Vale prevalece; o
  prompt visual basta).
- Perda de foco da aba no meio do hold: pausar tudo; retomar no mesmo pct.
- reduced-motion: macroblocks estáticos; contador nunca regride (só pausa).

## Critérios de aceite
- [ ] Nenhuma janela >1,5s sem mudança visual E sonora durante hold ativo.
- [ ] 3 ciclos completos exigidos; pular ciclo é impossível.
- [ ] Mesmo fluxo completável só com toque (sem teclado) no mobile.
- [ ] Perda de foco não perde progresso.

## Referências
GMP-01 (sequência-mãe), ACC-01 (traduções safe-mode), NAR-01/02 (strings).
