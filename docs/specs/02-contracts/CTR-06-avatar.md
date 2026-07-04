---
id: CTR-06
titulo: Contrato AVATAR_VERSIONS
versao: 1.0.0
status: aprovado
produtores: [dados-estaticos]
consumidores: [CMP-02]
---

# CTR-06 — AVATAR_VERSIONS

## Propósito
As 5 versões do avatar como dados declarativos. CMP-02 aplica mutações lendo daqui;
a versão exigida vem de `marco.avatarVersion` (CTR-01). Detalhe visual em AVT-01/02.

## Schema (por versão)
```js
{
  tag: "v3.0.0-stable",
  scale: 1.0,
  components: {               // presença de partes da malha
    hair: true, glasses: "basic"|"thin"|null, backpack: false,
    headset: "phase:incident_queue",   // só durante o marco citado
    notebook: false, aura: false, goldCircuits: false
  },
  torsoShader: "tv-static"|"plain"|"gold-circuit",
  walkSpeed: 1.0,             // multiplicador
  absorbRadius: 1.0,          // multiplicador de atração de partículas
  changelog: "v3.0.0-stable: throughput individual no teto. …"
}
```

## Tabela canônica
| Versão | tag | scale | walkSpeed | absorbRadius | diferenciais |
|---|---|---|---|---|---|
| 1 | v1.0.0-alpha | 0.60 | 0.8 | 2.0 | torso tv-static; bounce exagerado |
| 2 | v2.0.0-beta | 0.85 | 0.9 | 1.4 | mochila, óculos basic, caderno orbital; sombra dupla no conflito |
| 3 | v3.0.0-stable | 1.00 | 1.15 | 1.0 | headset (só `incident_queue`); glow nas mãos em movimento |
| 4 | v4.0.0-enterprise | 1.00 | 1.0 | 1.0 | óculos thin; aura de merge (amortece stress — CTR-04) |
| 5 | v5.0.0-agentic | 1.00 | 1.0 | 1.0 | hair:false; goldCircuits; companion orbita a cabeça |

## Regras
1. Transição SEMPRE remove estados da versão anterior antes de aplicar a nova
   (teardown completo; teste de regressão TST-01 §avatar).
2. Transição só via `phase:changed`; publicar `avatar:version-changed` com changelog.
3. Exceção única: a remoção de `hair` na v5 NÃO ocorre na troca de fase — é
   executada em cena pelo evento `vale:act2` (GMP-04). Se o jogador chegar à fase 11
   via `cd`, aplicar imediatamente sem animação.
4. Acessório com prefixo `phase:` existe apenas durante aquele marco.

## Changelogs (texto integral — imprimir no CLI na transição)
v1: `boot ok. imaginação montada como processador central. sem swap. sem medo.`
v2: `processos paralelos além da spec. estabilidade não garantida. seguindo mesmo assim.`
v3: `throughput individual no teto. aviso: 'stable' descreve o software, não o operador.`
v4: `cluster sincronizado. alta disponibilidade ativada. single point of failure? ainda sim. ver v5.`
v5: `deixou de escrever linha a linha. agora orquestra agentes — em casa e em produção. hair: deprecated. legado: em runtime.`
