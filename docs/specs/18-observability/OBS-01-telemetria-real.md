---
id: OBS-01
titulo: Observabilidade Real do Portal (opcional, pós-produção)
versao: 0.1.0
status: rascunho (ativar somente por decisão do dono)
dominio: observability
depende-de: [SEC-01, RMP-01]
consumido-por: [dono, A1]
---

# OBS-01 — Telemetria de Uso (opcional)

## Contexto
O jogo exibe telemetria FICTÍCIA (a vida). Esta spec trata da telemetria REAL
(visitantes). Hoje: SEC-01 RG-07 proíbe qualquer coleta (`connect-src 'none'`).
Ativar isto é uma decisão de produto do dono, não técnica.

## Se ativado — princípios
- RG-01 Consentimento explícito antes de qualquer envio (banner mínimo, opt-in;
  sem cookie de rastreio; sem fingerprinting).
- RG-02 Coletar o MÍNIMO com valor de design: fase máxima alcançada, conclusão
  do Vale (bool), duração da sessão, dispositivo (coarse/fine), abandono em
  qual marco, uso de safe-mode (bool agregado).
- RG-03 Anônimo e agregável: sem ID de usuário; sem IP armazenado; payload
  único no fim da sessão (sendBeacon), não streaming.
- RG-04 Revisar CSP: `connect-src` passa a permitir SOMENTE o endpoint de
  coleta; atualizar SEC-01 com MINOR e re-executar seus critérios.
- RG-05 Métricas de saúde técnica (fps médio, degrau de fallback atingido,
  context-lost) entram no mesmo payload — são o valor real disto: saber se
  PRF-01 aguenta o mundo real.

## Perguntas que este dado responde (justificativa de existir)
1. As pessoas chegam ao Vale? Atravessam? (T5 no mundo real.)
2. Mobile abandona mais? Em qual marco?
3. O anti-freeze funciona fora do laboratório (tempo médio parado no hold)?

## Fora de escopo
Analytics de marketing, heatmaps, replay de sessão, A/B — incompatíveis com o
espírito do portal.

## Critérios de aceite (se ativado)
- [ ] Zero requisições sem opt-in (Network limpa até o consentimento).
- [ ] Payload inspecionável pelo usuário antes do envio (transparência total).
- [ ] SEC-01 atualizado e re-validado.
