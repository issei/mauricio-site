---
id: CTR-04
titulo: Contrato TELEMETRY_RULES (métricas por fase)
versao: 1.0.0
status: aprovado
produtores: [dados-estaticos]
consumidores: [CMP-09]
---

# CTR-04 — TELEMETRY_RULES

## Propósito
Valores determinísticos das 4 métricas por marco narrativo + limiares de alerta
(estado PAGED). O dashboard nunca inventa números: lê daqui e adiciona só ruído.

## Schema (por telemetryKey de CTR-01)
```js
{
  stress:  { base: 42, spike: 55, spikeDecay: "hold"|“decay-30s” },
  threads: { value: 5, blocked: 0 },       // blocked>0 pisca thread em estado blocked
  loc:     { mode: "zero"|"linear"|"exp"|"plateau", rate: 1.0 },
  tokens:  { value: 45 }                    // degrau por versão do avatar
}
```

## Tabela canônica (stress base/spike · threads · loc mode · tokens)
```
initial_commit       4/–    1   zero      12
moral_kernel        10/–    1   zero      15
first_deploy        25/–    1   zero      22
incident_queue      42/55   1   linear    30
parallel_overload   30..70~ 1   linear    35    (~ = oscilação senoidal 45s)
kernel_panic_2004   88/–    1   plateau   35
graduation_delivery 35/–    1   linear    40
2011_merge_request  30/45*  2   exp       70    (* picos amortecidos: aura v4)
fork_daughter       32/50*  3   exp       70
fork_twins_x2       62/92*  5   exp       75    (degrau +30 permanente até fase 11)
kintsugi_rebase     rampa 62→97 com 8% amostras NaN · 5 (1 blocked) · plateau · 88
head_2026           30/–    5   exp       96..100 (saturado)
```
Pós-Vale: stress ganha linha de referência fixa em 97 (dourada) — ver UI-01.

## Limiares PAGED (disparam `metric:paged` — CTR-02)
| Métrica | Limiar | `citavel` (frase p/ Companion) |
|---|---|---|
| stress | > 80 | "stress em {value}% — acima do budget de erro" |
| threads | mudança de valor | "thread pool: {prev}→{value}" |
| loc | mudança de mode | "curva de compilação: {mode}" |
| tokens | ≥ 96 | "inferência saturada: {value} token/s" |

## Regras
1. Ruído permitido: ±3% uniforme, nunca cruza limiar PAGED sozinho.
2. Amostras NaN (fase 11): renderizar como lacuna no sparkline, não como 0.
3. LoC só incrementa com `player:moved.walking = true` (Shokunin mecânico).
4. Refresh 350ms; histórico 40 amostras (herdado do life3d_v2).
