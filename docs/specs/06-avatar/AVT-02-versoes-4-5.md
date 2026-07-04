---
id: AVT-02
titulo: Avatar — Versões 4 e 5 + Queda de Cabelo
versao: 1.0.0
status: aprovado
dominio: avatar
depende-de: [CTR-06, CTR-02, AVT-01]
consumido-por: [A6]
---

# AVT-02 — Avatar v4–v5

## Contexto
Continuação de AVT-01 (regras de transição lá, RG-13/14). v4 e v5 são as
versões de maturidade; incluem o momento visual mais delicado do jogo: a
remoção do cabelo em cena (fase 11).

## v4.0.0-enterprise — O Profissional Sênior / Casado
- RG-01 Malha refinada: +1 nível de segmentação nos membros; silhueta mais
  precisa; traje corporativo moderno (paleta grafite + detalhe no accent).
- RG-02 `glasses-thin`: armação fina emissiva discreta (substitui basic).
- RG-03 Aura de merge: anel plano no chão (raio 1,1) na mistura das cores dos
  dois trilhos, opacidade 0,3, pulso 0,5Hz; acompanha o avatar com lerp.
  Efeito mecânico da aura: CTR-04 (amortecimento de picos) — a aura é só a
  manifestação visível; o dashboard aplica o amortecimento.
- RG-04 Caminhada: cadência calma; bounce reduzido 30% (estabilidade).

## v5.0.0-agentic — O Pai Líder
- RG-05 `hair: false` — ver §Queda de cabelo abaixo (nunca via troca seca,
  exceto chegada por `cd`).
- RG-06 `goldCircuits`: torso com shader `gold-circuit` — traços de circuito
  em gradiente ouro (CTR-03 §Cores fixas) pulsando em sincronia com o uptime
  da sessão (1 pulso/s de sessão... regra concreta: período = 1s, fase
  acumulada desde `audio:unlocked`).
- RG-07 Companion em órbita da cabeça: raio 0,9, período 6s, inclinação 20°
  (a mudança de órbita é executada pelo CMP-12 ao receber
  `avatar:version-changed {to:5}` — CAI-01).
- RG-08 Mundo responsivo (delegação): partículas em raio 6 alinham deriva ao
  vetor de olhar do avatar (RND-03 lê `avatarVersion===5`); portas de fase
  abrem 2 unidades antes.

## Queda de cabelo (evento `vale:act2` — GMP-04)
- RG-09 Sequência (3,5s total): sub-mesh `hair` troca material para dissolve
  (alpha por ruído, 1,5s) ENQUANTO RND-03 emite modo `hair` (90 glifos caindo
  da cabeça) → avatar fica 1s imóvel com a mão subindo à cabeça (pose única,
  keyframe procedural) → CLI imprime a linha de hardware (GMP-04 RG-02).
- RG-10 Este é o ÚNICO momento do jogo em que o avatar tem animação "de ator"
  (a mão à cabeça). Não reutilizar a pose em nenhum outro contexto.

## Casos extremos
- Chegada à fase 11 via `cd` sem ter vivido a 10: v5 aplicada direto, careca,
  sem sequência (CTR-06 RG-03).
- Revisita a marcos ≤10 após o Vale: avatar exibe a versão DO MARCO visitado
  (com cabelo — a época manda), MAS o grid mantém cicatrizes (CTR-08). Corpo é
  memória do tempo; chão é memória permanente. (Decisão: ADR-002.)
- reduced-motion: dissolve do cabelo sem partículas (só alpha), mesmo 3,5s.

## Critérios de aceite
- [ ] Pose "mão à cabeça" ocorre exatamente 1 vez por sessão.
- [ ] Circuitos dourados pulsam com período 1s estável (não atrelado a fps).
- [ ] Revisita pré-Vale mostra cabelo; grid mostra cicatriz.
- [ ] Aura desaparece completamente na v5 (substituída pelos circuitos).
