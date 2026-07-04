---
id: AVT-01
titulo: Avatar — Versões 1 a 3
versao: 1.0.0
status: aprovado
dominio: avatar
depende-de: [CTR-06, CTR-02]
consumido-por: [A6]
---

# AVT-01 — Avatar v1–v3

## Contexto
Avatar em primitivas Three.js com animação procedural de caminhada (balanço de
pernas/braços, respiração do torso), herdado do life3d_v2. Evolui em 5 versões
dirigidas por `marco.avatarVersion` (CTR-01). Dados declarativos em CTR-06;
aqui, a construção visual de v1–v3. v4–v5 em AVT-02.

## v1.0.0-alpha — O Menino
- RG-01 Escala 0,6; proporções infantis: cabeça 1,4× relativa, membros curtos.
- RG-02 Torso: shader `tv-static` — ruído animado 2 canais (scanline vertical
  lenta + granulado), cores primárias saturadas ciclando devagar (período 8s).
- RG-03 Caminhada: bounce vertical 2× o padrão; frequência de passo maior
  (passinhos). walkSpeed 0,8.
- RG-04 Absorção: partículas em raio 2× curvam-se até ele (RND-03 RG-02).

## v2.0.0-beta — O Estudante
- RG-05 Escala 0,85; proporções jovem-adulto.
- RG-06 Acessórios (montados como sub-meshes nomeadas, removíveis):
  `backpack` (caixa chanfrada nas costas), `glasses-basic` (toro achatado),
  `notebook` (prisma emissivo orbitando a mão esquerda, raio 0,4, período 4s).
- RG-07 Sombra dupla: no quadrante 5 (conflito), duas sombras planas projetadas
  em direções opostas — uma tingida de verde, outra de rosa (planos com
  opacidade 0,25; não usar luz real — custo).
- RG-08 Caminhada: bounce normal; leve inclinação de tronco à frente (pressa).

## v3.0.0-stable — O Trabalhador
- RG-09 Escala 1,0; figurino de produção (paleta sóbria, materiais foscos).
- RG-10 `headset`: arco + haste com ponta emissiva, SOMENTE no marco 4
  (`incident_queue`) — prefixo `phase:` de CTR-06. Remoção com animação
  "desinstalar driver": headset destaca, flutua 0,5s, dissolve em 6 glifos.
- RG-11 Glow nas mãos: material emissivo pulsando 3Hz apenas com
  `walking=true` (digitação em alta velocidade).
- RG-12 walkSpeed 1,15 — a versão mais rápida do jogo (custo narrado: stress
  base mais alto, CTR-04).

## Regras de transição (válidas para todas as versões)
- RG-13 Ordem: teardown completo da versão anterior (remover sub-meshes,
  resetar shaders/escala) → aplicar nova → publicar `avatar:version-changed`
  com changelog literal de CTR-06.
- RG-14 Duração da transição: 1,2s com o avatar parado; partículas de glifo
  envolvem-no (reuso do burst — RND-03); proibido cortar sem animação
  (exceção: chegada via `cd`, aplicar direto).

## Casos extremos
- `cd` de marco 4 para marco 3 (voltar): headset NÃO aparece (é do marco 4,
  não da versão).
- Dois `phase:changed` em <1,2s (spam de `cd`): cancelar transição em curso,
  aplicar destino final direto.

## Critérios de aceite
- [ ] Nenhuma sub-mesh da versão anterior sobrevive à transição (teste de
      regressão: nomes de children do Group).
- [ ] Headset existe apenas no marco 4.
- [ ] Sombra dupla apenas no quadrante 5.
- [ ] Changelogs impressos exatamente como CTR-06.
