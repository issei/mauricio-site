---
id: CTR-02
titulo: Catálogo de Eventos (EventBus)
versao: 1.0.0
status: aprovado
produtores: [varios]
consumidores: [todos]
---

# CTR-02 — Catálogo de Eventos

## Propósito
Todos os eventos do barramento (CMP-15), com payload tipado. Publicar evento fora
deste catálogo é violação arquitetural (R2). Matriz produz/assina em P03.

## API do bus
`bus.publish(nome, payload)` · `bus.subscribe(nome, fn)` → unsubscribe.
Síncrono, ordem de assinatura, exceção em handler não interrompe os demais.

## Eventos
| Nome | Payload | Semântica |
|---|---|---|
| `phase:changed` | `{marco: <CTR-01>, prev: id\|null, via: "walk"\|"cd"}` | Fase ativa mudou. Único gatilho de sincronização global. |
| `player:moved` | `{x, z, speed, walking: bool}` | Emitido com throttle 100ms durante movimento. |
| `player:idle` | `{seconds: int}` | Emitido a cada 1s parado (UI esmaece aos 6s — UI-02). |
| `monolith:reveal-start` | `{marcoId}` | Raio de ativação atingido; movimento pausa. |
| `monolith:decode-progress` | `{marcoId, pct: 0..100, holding: bool}` | Progresso do decode (GMP-02); ≥1 emissão / 1,5s (anti-freeze). |
| `memory:unlocked` | `{marcoId}` | Modal concluído; memória persiste (CTR-08). |
| `metric:paged` | `{metric: "stress"\|"threads"\|"loc"\|"tokens", value, threshold, citavel: string}` | Métrica cruzou limiar (CTR-04). `citavel` = frase pronta p/ Companion. |
| `avatar:version-changed` | `{from: 1..5, to: 1..5, changelog: string}` | Mutação concluída; changelog vai ao CLI. |
| `scar:opened` | `{scarId, gridCells: [[x,z]...]}` | Fissura aberta no grid (persistente). |
| `scar:gilded` | `{scarId, durationMs}` | Solda dourada percorrendo a fissura. |
| `cli:opened` / `cli:closed` | `{}` | Painel Quake; abre = movimento suprimido. |
| `cli:command` | `{cmd, args: [], raw}` | Comando validado pelo parser (CTR-05). |
| `cue:trigger` | `{cueId: <CTR-07>}` | Solicita cue de áudio. |
| `vale:act1` / `vale:act2` / `vale:act3` | `{}` | Marcos internos da fase 2017 (GMP-03/04). |
| `vale:merge-resolved` | `{}` | Jogador completou os 2 comandos; dispara Ato III. |
| `companion:speak` | `{text, urgency: 0..2}` | Fala a exibir (balão + [AGENT] no log). |
| `a11y:changed` | `{reducedMotion: bool, safeMode: bool}` | Flags de acessibilidade mudaram. |
| `audio:unlocked` | `{}` | Gesto do usuário liberou AudioContext. |

## Regras
1. Payloads são imutáveis (congelar antes de publicar).
2. Nenhum handler publica evento sincronicamente dentro de si (evita cascata);
   usar fila de próximo-frame do bus (`bus.defer`).
3. Eventos `vale:*` só existem enquanto `currentPhase.id === "kintsugi_rebase"`.
4. `metric:paged` tem cooldown de 8s por métrica (UI-02).

## Compatibilidade
Adicionar evento = MINOR. Alterar payload existente = MAJOR (atualizar P03 e
specs dos assinantes listados na matriz).
