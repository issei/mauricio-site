---
id: ADR-002
titulo: Cicatrizes persistem no chão; o corpo pertence à época
data: 2026-07-04
status: aceito
---

# ADR-002 — Persistência de cicatrizes

## Contexto
Kintsugi é a tese do jogo: a fratura preenchida vira a parte mais valiosa.
Surgiu a questão: ao revisitar 1998 via `cd`, o jogador vê as fissuras
douradas de 2004/2017? E o avatar aparece careca?

## Decisão
Dupla regra assimétrica:
1. **Chão (grid): memória permanente.** Cicatrizes abertas/douradas aparecem em
   TODOS os quadrantes uma vez vividas, inclusive revisitas ao passado. O
   corredor é o mesmo; o jogador é que não é.
2. **Corpo (avatar): memória da época.** Em revisita, o avatar exibe a versão
   do marco visitado (com cabelo antes de 2017). A época manda no corpo.
3. O Companion segue o presente (órbita da cabeça permanece pós-v5) — ele é o
   narrador, não a memória.

## Alternativas consideradas
| Alternativa | Por que rejeitada |
|---|---|
| Tudo da época (sem cicatriz no passado) | Perde a tese: cicatriz viraria estado local, não transformação |
| Tudo do presente (avatar sempre careca) | Quebra a leitura das fases; anula a progressão visual |

## Consequências
- Positivas: contraste jogável entre "o que eu era" e "o que eu carrego";
  regra simples de implementar (scars globais, avatar por marco).
- Negativas assumidas: possível estranheza inicial (grid dourado em 1998);
  mitigada por fala única do Companion na primeira revisita: "O ouro não
  estava aqui em 1998. Mas você agora está — e você traz ele junto."
  (adicionar ao pool maturidade — CAI-02).
- Componentes afetados: CMP-03 (RND-02 RG-06), CMP-02 (AVT-02 §extremos),
  CMP-12 (CAI-01), CTR-08 (schema scars).
