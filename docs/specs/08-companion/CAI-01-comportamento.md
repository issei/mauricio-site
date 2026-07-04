---
id: CAI-01
titulo: Companion — Comportamento e Movimento
versao: 1.0.0
status: aprovado
dominio: companion
depende-de: [CTR-02, CTR-03]
consumido-por: [A10]
---

# CAI-01 — Companion: Comportamento

## Contexto
Entidade geométrica (octaedro + 4 fragmentos orbitais, material emissivo na cor
do arco, luz pontual própria) que acompanha o avatar como narrador secundário.
Falas e persona em CAI-02.

## Objetivo
Presença viva e discreta que reage ao contexto sem poluir a experiência.

## Regras — movimento
- RG-01 Posição padrão (v1–v4 do avatar): offset lateral +1,2 / vertical +1,6,
  seguindo com lerp 0,05/frame + flutuação senoidal (amplitude 0,15, período
  3s). Nunca teleporta (mesmo em `cd`: lerp acelerado 0,2 por 1s).
- RG-02 Fragmentos: órbita raio 0,45, rotação contínua; velocidades levemente
  distintas (evitar padrão mecânico).
- RG-03 Ao `avatar:version-changed {to:5}`: migração para órbita da cabeça —
  trajetória em espiral de 2,5s até raio 0,9, período 6s, inclinação 20°
  (AVT-02 RG-07).
- RG-04 Cor: `ARC_THEME[arc].accent` com lerp 1,4s na troca (sincronizado).

## Regras — cadência de fala
- RG-05 Timer aleatório 10–19s entre falas espontâneas, apenas com jogo ativo
  (sem modal, sem CLI aberto, sem fase 11 pós-primeiro-terço).
- RG-06 Seleção: pool do arco corrente (CAI-02), sem repetição até esgotar o
  pool (embaralhar e ciclar).
- RG-07 Falas reativas (prioridade sobre espontâneas, cooldown 8s):
  - `metric:paged` → usar campo `citavel` do payload envolto na persona.
  - `avatar:version-changed` → comentar o changelog (1 fala fixa por versão).
  - `cli:command {cmd:"cd"}` → "Pulou etapas. O ofício percebe." (única).
- RG-08 Silêncios roteirizados (invioláveis, sobrepõem tudo):
  quadrante 6 inteiro (NAR-01) · fase 11 do primeiro terço até `vale:act3`
  (GMP-03 RG-08) · durante CUE-VALE-04.
- RG-09 Exibição: balão HTML posicionado por projeção da posição 3D
  (Vector3.project), com fallback para borda da tela se fora do frustum;
  replicado no log como `[AGENT]`. Duração do balão: 4s + 40ms/caractere.

## Regras — comando `ask`
- RG-10 `ask "<pergunta>"`: busca por palavras-chave contra os campos
  `title/text/year/id` dos marcos DESBLOQUEADOS; resposta na persona com
  typewriter. Sem match: "Esse log eu ainda não indexei. Continue andando."
  Pergunta sobre marco futuro: "Spoiler é antipattern. Caminhe."

## Casos extremos
- Avatar parado 60s: 1 fala de idle por sessão ("Uptime também conta quando
  você para. Aliás — principalmente."), depois silêncio.
- Balão sobreposto a modal: modal vence; fala adiada para fechar do modal.
- Duas falas reativas simultâneas: fila com prioridade `urgency` (CTR-02).

## Critérios de aceite
- [ ] Zero falas nos 3 silêncios roteirizados (teste de regressão).
- [ ] Migração de órbita ocorre 1 vez e persiste (inclusive revisitas — o
      Companion é do presente, não da época; contraste deliberado com AVT-02).
- [ ] Nenhuma fala repetida antes de esgotar o pool do arco.
- [ ] Balão nunca fora da tela (fallback de borda).
