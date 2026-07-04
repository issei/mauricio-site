---
id: CTR-08
titulo: Schema SessionState (estado persistente)
versao: 1.0.0
status: aprovado
produtores: [CMP-16]
consumidores: [CMP-03, CMP-08, CMP-10, CMP-18]
---

# CTR-08 — SessionState

## Propósito
Único estado mutável persistido. Serializável em JSON; salvo em `localStorage`
(chave `lifeos.session.v1`) com fallback silencioso para memória se indisponível.

## Schema
```js
{
  schemaVersion: 1,
  unlockedMemories: ["initial_commit", ...],   // ids CTR-01, ordem de desbloqueio
  currentPhaseId: "wedding",
  scars: [                                      // cicatrizes NUNCA removidas
    { scarId: "scar-2004", state: "open"|"gilded",
      gridCells: [[x,z], ...] }                 // células do grid afetadas (RND-02)
  ],
  valeResolved: false,                          // merge de 2017 concluído
  avatarSeenVersions: [1,2,3],                  // p/ changelog não repetir
  a11y: { safeMode: false, reducedMotion: null }, // null = herdar media query
  audioUnlocked: false,                         // sempre re-exigir gesto por sessão (não persistir true)
  stats: { totalWalkUnits: 0, cliCommandsUsed: 0 }
}
```

## Regras
1. `scars[].state` só transita `open → gilded`; nunca remove nem reverte (ADR-002).
2. `unlockedMemories` é append-only; `cd` para trás não remove nada.
3. `audioUnlocked` é sempre gravado como `false` no save (política de autoplay).
4. Escrita: debounce 500ms; nunca no loop de frame.
5. `schemaVersion` diferente do esperado → migrar se possível; senão descartar
   com aviso no log de produção (`[WARN] sessão anterior incompatível — novo boot.`).
6. Corrupção de JSON → descartar silenciosamente e iniciar estado limpo.

## Casos extremos
- localStorage cheio/negado (Safari private) → modo memória, `[WARN]` uma única vez.
- Duas abas simultâneas → última escrita vence (sem lock; aceitável, single-player).
- Save de meio-Vale (`forced-open` do CLI) → ao restaurar, reiniciar fase 11 do Ato I.

## Compatibilidade
Campo novo = MINOR com default obrigatório na migração. Remoção/renome = MAJOR
(incrementar `schemaVersion` e escrever migração).
