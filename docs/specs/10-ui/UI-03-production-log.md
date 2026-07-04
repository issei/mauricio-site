---
id: UI-03
titulo: Log de Produção (canal de fundo)
versao: 1.0.0
status: aprovado
dominio: ui
depende-de: [CTR-02, UI-02]
consumido-por: [A8]
---

# UI-03 — Log de Produção

## Contexto
Painel fixo no canto inferior esquerdo que exibe eventos de "produção" em tempo
real — o mundo respira mesmo sem interação. Herdado do life3d_v2 (#movement-log)
com vocabulário expandido.

## Objetivo
Sensação de sistema vivo, sem poluir (throttle) e sem mentir (todo log reflete
evento real do bus).

## Regras
- RG-01 Fonte: assinaturas no EventBus; NUNCA texto inventado por timer puro —
  exceção: eventos sintéticos de ambiente (RG-04).
- RG-02 Formato: `[NÍVEL] mensagem` — níveis: INFO (cinza), WARN (âmbar),
  ERROR (vermelho), AGENT (accent do arco), FATAL (vermelho, só marcos 6 e
  context-lost — NAR-03/RND-01).
- RG-03 Throttle: 0,7–1,2s entre linhas (aleatório); fila máx. 6 (descartar
  INFOs mais antigos primeiro; WARN/ERROR/AGENT nunca descartados).
- RG-04 Eventos sintéticos de ambiente (flavor, máx. 1 a cada 9–15s, só em
  AMBIENT): pool de 12 mensagens do tipo `[SYNC] cluster domestico: 5/5 nós
  respondendo` · `[INFO] gateway de memórias: 200 OK` · `[INFO] lambda
  saudade.handler: cold start 340ms` — pool por arco, coerente com threads
  atuais (nunca "5/5 nós" antes de 2016).
- RG-05 Movimento: `[INFO] avatar em Z:{z}. proximidade com monolito:
  {aumentando|estável}` — no máx. 1 a cada 1,2s andando.
- RG-06 Altura: 5 linhas visíveis, fade-out vertical no topo; fonte mono 11px.
- RG-07 Ocultar em telas <480px de largura (media query — prioridade aos
  controles touch); mensagens WARN+ nesse caso viram toast único de 3s.
- RG-08 Estados UI-02: opacidade/pausa governadas pela máquina de estados.

## Interfaces
- Assina: praticamente tudo (ver P03); roteia por mapa evento→template.
- Não publica nada.

## Casos extremos
- Rajada de eventos (transição de fase): coalescer em 1 linha resumo
  (`[INFO] fase {period} montada. {n} subsistemas sincronizados.`).
- Log durante silêncio VALE-04: NENHUMA linha (GMP-04 RG-08) — buffer segura.
- Mensagem >80 chars: truncar com reticências (log real trunca).

## Critérios de aceite
- [ ] Zero linhas durante os 4s de silêncio do Vale.
- [ ] WARN/ERROR nunca descartados pela fila.
- [ ] Pool sintético coerente com threads da fase (teste tabelado vs CTR-04).
- [ ] Mobile estreito: log oculto, WARN+ vira toast.
