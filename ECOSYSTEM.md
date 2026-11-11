# 🌐 ECOSYSTEM.md — Governança da Rede de Navegação

> Arquivo de contexto persistente para **agentes de manutenção** (SPEC_ECOSYSTEM.md §4.4).
> Define as fronteiras que impedem desvio (drift) de vocabulário, identidade e topologia
> ao interligar as páginas-ilha do site. Estas regras são **normativas**.

## Fonte da verdade (SSOT)

| Artefato | Papel |
| :--- | :--- |
| [`specs/ecosystem.nav.yaml`](specs/ecosystem.nav.yaml) | **SSOT** do grafo de navegação (pilares, nós, crosslinks). Em conflito, prevalece. |
| [`scripts/gen-catalogo.mjs`](scripts/gen-catalogo.mjs) | Gera, a partir do YAML, o catálogo (entre `CATALOGO:START/END`) e `public/catalogo.md`. `--check` roda no `npm run gate`. |
| [`scripts/gen-cabecalho.mjs`](scripts/gen-cabecalho.mjs) | Gera o cabeçalho comum de todas as páginas a partir de `entradas` do YAML. |
| `specs/SPEC_ECOSYSTEM.md` · `specs/RESEARCH_MAPPING.md` | Contrato técnico (Fase 2) e mapeamento conceitual (Fase 1). |
| [`src/catalogo.html`](src/catalogo.html) | Hub do ecossistema (fora dos pilares; alvo da âncora L0). O bloco entre os marcadores é gerado. |
| [`docs/specs/arquitetura-informacao/SDD-F1-F1b.md`](docs/specs/arquitetura-informacao/SDD-F1-F1b.md) | Esquema 2.0.0 do YAML (campos, invariantes INV-1 a INV-8). |

> ⚠️ Desde a 2.0.0, **edite só o YAML** e rode `node scripts/gen-catalogo.mjs`. O gerador
> escreve o catálogo e o `.md`. Toda mudança de grafo leva **bump de
> `meta.version`** (semver). O `/en/` do catálogo sai do Argos (`npm run i18n:sync`).

## A jornada (CA-01) — ordem imutável

```
P1 Fundação → P2 Engenharia de Confiança → P3 Ecossistema Salesforce → P4 Sustentação & Resiliência
(Mentalidade)        (O Método)                  (A Aplicação)                (O Valor)
```

O pilar P5 saiu na 2.0.0 (decisão D4 do autor, 2026-11-10). A home e os vídeos estão em
`entradas`; as narrativas pessoais (`life`, `life3d`, `terminal-evolutivo`), em `trajetoria`.

A ordem dos pilares **não pode** ser reordenada sem **bump major** + aprovação humana.

## Lexical lock (anti-drift de vocabulário — SPEC §4.1)

Grafia fixa, **não parafrasear** em rótulos/blurbs:
**Devin · Engenharia da Confiança · Knowledge OS · Engenharia Reversa · SRE · Service Operations 2.0 · Protocolo Manchester · Flosum**

## Tom (SPEC §4.2)

Voz de especialista, PT-BR, primeira pessoa institucional ("Maurício Issei").
Blurbs ≤ 60 caracteres, afirmativos. Proibido jargão de marketing vazio
("revolucionário", "disruptivo", "game-changer").

## Fronteiras para agentes (governança SPEC §4.4)

1. Agentes que editam **uma página individual** NÃO alteram `ecosystem.nav.yaml`, a ordem dos pilares, nem o glossário — sem **bump de versão** e **aprovação humana**.
2. Qualquer alteração de grafo (adicionar/remover nó, mudar pilar, novo crosslink) exige editar a SSOT, rodar `node scripts/gen-catalogo.mjs` e fazer bump de `meta.version`.
3. O `<title>` autoral de cada página é soberano; o `title`/`label` no YAML é apenas o rótulo de **menu**.

## Receitas

**Adicionar um nó:** 1) crie `src/<slug>.html`; 2) em `ecosystem.nav.yaml` adicione a entrada em `nodes:` (com `pillar`, `kind`, `natureza`, `temas`, `descricao`) e o slug em `pillars[].nodes`; 3) bump `meta.version`; 4) rode `node scripts/gen-catalogo.mjs`; 5) ponha os marcadores `SITE-HEADER` na página e rode `node scripts/gen-cabecalho.mjs`; 6) rode `npm run i18n:sync` e `npm run gate`.

**Adicionar um crosslink:** adicione em `crosslinks:` (YAML) com `from`/`to`/`rationale` e rode o gerador; se `status: proposed` for aprovado, materialize o link real no corpo da página de origem. O selo do cartão no catálogo é o campo `selo` do nó.

## Invariantes (verificados — SPEC §2.2)

`INV-1` a `INV-8` do esquema 2.0.0 (cabeçalho do YAML e SDD-F1-F1b §3.2), aplicados por
`tests/ecosystem.schema.test.mjs` e `tests/catalogo.gen.test.mjs`.

## Estado atual (v2.0.0)

- 4 pilares, 29 nós neles (28 com cartão; `aprendizagem-autorregulada-artigo` é par, sem cartão),
  3 narrativas na trajetória e 4 entradas.
- `lifeos` fica fora do YAML por decisão do autor (2026-11-10).
- O `<eco-nav>` (botão flutuante "Ecossistema") saiu no lote L5 da F1b (2026-11-11). A navegação entre páginas é o cabeçalho comum e o catálogo.
- A seção `entradas` também alimenta o cabeçalho comum (`scripts/gen-cabecalho.mjs`): `label` no PT, `label_en` no `/en/`. Mudar um rótulo ou a ordem das entradas exige rodar `node scripts/gen-cabecalho.mjs`.
- Crosslinks materializados: `knowledge-os-presentation → proposta-engenharia-reversa`, `devin → salesforce-agentic-quickstart`. `engenharia-agentes-ia → socialselling` já existia.
