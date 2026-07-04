---
id: CTR-01
titulo: Schema STORY_DATA (marcos narrativos)
versao: 1.0.0
status: aprovado
produtores: [dados-estaticos]
consumidores: [CMP-08, CMP-07, CMP-10]
---

# CTR-01 — Schema STORY_DATA

## Propósito
Forma canônica dos 12 marcos narrativos. Só o StoryEngine (CMP-08) lê o array cru;
demais componentes recebem o marco ativo via `phase:changed` (CTR-02).

## Schema (por marco)
```js
{
  id: "wedding",                 // string snake_case, única — chave universal
  order: 8,                      // int 1..12, sequencial sem lacunas
  year: 2011,                    // int — alvo do comando `cd <ano>`
  cliId: "2011_merge_request",   // string — nome de "arquivo" p/ `cat`
  arc: "familia",                // enum: infancia|tecnologia|familia|maturidade
  avatarVersion: 4,              // int 1..5 — versão exigida (CTR-06)
  gitOp: "merge",                // enum: none|merge|conflict|panic|cherry-pick|rebase
  emotionalLoad: 3,              // int 0..3 — 0 leve; 3 = decode corrompido (GMP-02)
  period: "2011 - O Casamento",  // rótulo HUD/modal
  title: "O Grande Dia",
  text: "…",                     // memória em vocabulário de engenharia
  image: { src: "fotos/casamento.jpg", alt: "…" },
  branchWeight: { personal: 0.8, professional: 0.2 }, // soma = 1.0 (GMP-05)
  telemetryKey: "wedding"        // chave em TELEMETRY_RULES (CTR-04)
}
```

## Regras de validação
1. `order` único e contíguo (1..12). `id` e `cliId` únicos.
2. `avatarVersion` monotônico não-decrescente ao longo de `order`.
3. `emotionalLoad = 3` apenas em `kernel_panic_2004` e `kintsugi_rebase`.
4. `gitOp != none` exige nó de interseção nos trilhos (GMP-05).
5. Fatos (anos, nomes) conforme P00 §Premissas — invariantes.

## Os 12 marcos (id · order · year · arc · avatarVersion · gitOp · emotionalLoad)
```
initial_commit      1  1982  infancia    1  none         0
moral_kernel        2  1986  infancia    1  none         0
first_deploy        3  1998  tecnologia  2  none         1
incident_queue      4  2000  tecnologia  3  none         1
parallel_overload   5  2001  tecnologia  3  conflict     2
kernel_panic_2004   6  2004  familia     3  panic        3
graduation_delivery 7  2005  maturidade  3  merge        2
2011_merge_request  8  2011  familia     4  merge        1
fork_daughter       9  2012  familia     4  none         1
fork_twins_x2      10  2016  familia     5  cherry-pick  2
kintsugi_rebase    11  2017  maturidade  5  rebase       3
head_2026          12  2026  maturidade  5  none         0
```

## Compatibilidade
Adicionar campo = MINOR. Renomear/remover campo ou alterar enum = MAJOR
(exige atualização de CMP-08, CMP-07, CMP-10 e specs NAR-*).
