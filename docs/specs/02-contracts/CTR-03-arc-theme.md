---
id: CTR-03
titulo: Contrato ARC_THEME (tema por arco narrativo)
versao: 1.0.0
status: aprovado
produtores: [dados-estaticos]
consumidores: [CMP-03, CMP-04, CMP-05, CMP-12, CMP-13, CMP-09]
---

# CTR-03 — ARC_THEME

## Propósito
Um arco narrativo = uma identidade audiovisual. Este contrato garante que grid,
partículas, companion, sparkline e música derivem da MESMA fonte — coerência sem
lógica duplicada.

## Schema
```js
ARC_THEME = {
  infancia: {
    accent: "#9dff4d",            // verde-limão
    audioChain: "chain-infancia", // CTR-07
    stressBase: 18,               // CTR-04 usa como default
    companionPool: "pool-infancia" // CAI-02
  },
  tecnologia: { accent: "#4dff9c", audioChain: "chain-tecnologia",
                stressBase: 42, companionPool: "pool-tecnologia" },
  familia:    { accent: "#ff77c8", audioChain: "chain-familia",
                stressBase: 30, companionPool: "pool-familia" },
  maturidade: { accent: "#66d9ff", audioChain: "chain-maturidade",
                stressBase: 22, companionPool: "pool-maturidade" }
}
```

## Cores fixas fora do tema (reservadas — nunca usar como accent)
| Uso | Hex |
|---|---|
| Ouro Kintsugi (gradiente base→brilho) | `#9c7536` → `#d9b06a` → `#fbf1cf` |
| Bambu (colmo) | `#7aa048` |
| Stress (sparkline) | `#ff5555` |
| Threads (sparkline) | `#ffb86c` |
| Token/s (sparkline) | `#8be9fd` |
| Conflito Git (flicker) | `#ff3344` |
| Trilho pessoal / profissional | `#ff77c8` / `#4dff9c` |

## Regras
1. Consumidores acessam SEMPRE via `ARC_THEME[currentPhase.arc]` — proibido
   hardcode de hex de arco em qualquer componente.
2. Transição de accent entre fases: lerp de 1,4s (mesma duração do crossfade
   de áudio — sincronia perceptível).
3. O ouro NUNCA é atingível por lerp de arco: só aparece via eventos `scar:*`.
4. LoC sparkline usa o accent do arco corrente; demais sparklines usam cores fixas.

## Compatibilidade
Adicionar arco = MAJOR (afeta STORY_DATA enum, cadeias de áudio e pools de fala).
