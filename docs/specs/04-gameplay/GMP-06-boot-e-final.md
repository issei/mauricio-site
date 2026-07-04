---
id: GMP-06
titulo: Boot, Splash e Tela Final
versao: 1.0.0
status: aprovado
dominio: gameplay
depende-de: [CTR-02, CTR-08, AUD-01]
consumido-por: [A2]
---

# GMP-06 — Boot e Final

## Contexto
Molduras da experiência: entrada (splash + gesto de áudio) e saída (HEAD 2026).
Entre elas, o jogo (P01 §Fluxo). Estética: sequência de boot de sistema real.

## Regras — boot/splash
- RG-01 Splash em DOM puro (antes do WebGL): fundo `#0a0706`, log de boot
  typewriter (sem som ainda): `BIOS lifeos v5.0.0 · memória: 44 anos
  detectados · montando /familia (5 nós) · montando /carreira (26 anos) ·
  pronto.` (5 linhas, 2,5s total).
- RG-02 Preload durante splash: fotos das fases 1–2, atlas de glifos, shaders
  compilados; barra de progresso como `[####----] fsck /memorias 52%`.
- RG-03 Botão único: `> INICIAR JORNADA_` (cursor piscando). Clique/toque:
  publica `audio:unlocked` (AUD-01 RG-06), fade do splash 800ms, spawn na
  fase salva (`currentPhaseId` — CTR-08) ou fase 1.
- RG-04 Sessão anterior detectada: linha extra no boot
  `sessão anterior encontrada: {n} memórias · [CONTINUAR] [REINICIAR]`.
  REINICIAR pede confirmação: `isso não apaga as cicatrizes de quem você é.
  mas apaga o save. confirmar? [s/n]` — apaga TUDO (scars inclusive; a frase
  é aviso poético, não exceção técnica).
- RG-05 WebGL2 indisponível: splash permanece com mensagem de requisito +
  links para as versões 2D do site (life.html, terminal-evolutivo.html).

## Regras — tela final (marco 12 revelado)
- RG-06 Após `memory:unlocked` do `head_2026`: SEM fade para tela separada —
  o corredor continua; 8 unidades à frente o grid simplesmente termina em
  borda dourada e o prompt final sobe do chão como objeto 3D de texto:
```
$ system.status
> UPTIME: 44y. FRACTURES: 3 (gold-filled). THREADS: 5. STATUS: em produção.
> A caminhada continua. _
```
- RG-07 O cursor `_` pisca indefinidamente (1Hz). Sem "FIM" (NAR-02).
- RG-08 CLI continua funcional na tela final (`cd` para revisitar; `git log`
  completo). Companion emite a fala de HEAD (CAI-02 pool maturidade) 6s após
  a chegada, uma vez.
- RG-09 Rodapé DOM discreto (após 10s): links do ecossistema do site
  (currículo, life.html, terminal-evolutivo) — o portal devolve ao site.

## Casos extremos
- Clique em INICIAR antes do preload terminar: botão desabilitado com
  `aguardando fsck…` (nunca iniciar sem atlas/shaders).
- localStorage com save de fase 12: boot direto na tela final (RG-06 já
  montada), CLI aberto — o retorno é contemplativo.
- Duplo clique rápido em INICIAR: idempotente (lock).

## Critérios de aceite
- [ ] Nenhum som antes do clique (auditoria de AudioContext.state).
- [ ] REINICIAR limpa CTR-08 por completo (scars inclusive) após confirmação.
- [ ] Tela final alcançável andando, sem corte de câmera.
- [ ] Fallback sem WebGL2 aponta para as 2 páginas irmãs.
