# 🌐 ECOSYSTEM.md — Governança da Rede de Navegação

> Arquivo de contexto persistente para **agentes de manutenção** (SPEC_ECOSYSTEM.md §4.4).
> Define as fronteiras que impedem desvio (drift) de vocabulário, identidade e topologia
> ao interligar as páginas-ilha do site. Estas regras são **normativas**.

## Fonte da verdade (SSOT)

| Artefato | Papel |
| :--- | :--- |
| [`specs/ecosystem.nav.yaml`](specs/ecosystem.nav.yaml) | **SSOT** do grafo de navegação (pilares, nós, crosslinks). Em conflito, prevalece. |
| [`scripts/gen-catalogo.mjs`](scripts/gen-catalogo.mjs) | Gera, a partir do YAML, o catálogo (entre `CATALOGO:START/END`), `src/js/eco-nav.data.js` e `public/catalogo.md`. `--check` roda no `npm run gate`. |
| [`src/js/eco-nav.js`](src/js/eco-nav.js) | Web Component `<eco-nav>`. Lê os dados de `src/js/eco-nav.data.js` (gerado; não editar). |
| `specs/SPEC_ECOSYSTEM.md` · `specs/RESEARCH_MAPPING.md` | Contrato técnico (Fase 2) e mapeamento conceitual (Fase 1). |
| [`src/catalogo.html`](src/catalogo.html) | Hub do ecossistema (fora dos pilares; alvo da âncora L0). O bloco entre os marcadores é gerado. |
| [`docs/specs/arquitetura-informacao/SDD-F1-F1b.md`](docs/specs/arquitetura-informacao/SDD-F1-F1b.md) | Esquema 2.0.0 do YAML (campos, invariantes INV-1 a INV-8). |

> ⚠️ Desde a 2.0.0, **edite só o YAML** e rode `node scripts/gen-catalogo.mjs`. O gerador
> escreve o catálogo, os dados do `<eco-nav>` e o `.md`. Toda mudança de grafo leva **bump de
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

## Identidade visual / isolamento (SPEC §4.3 · CA-02)

- O componente renderiza em **Shadow DOM** (`mode: open`); zero vazamento de/para a página.
- **Nenhuma** regra global (`body`, `*`, tags nuas) fora do shadow root.
- Tema lido de variáveis CSS do host com fallback: `--eco-accent` (#007bff), `--eco-accent-2` (#8a2be2).
- `z-index` reservado: **2147483000**.
- Injeção não-invasiva (D-03): uma linha antes de `</body>` — `<script type="module" src="./js/eco-nav.js"></script>`. O elemento `<eco-nav>` se auto-injeta.

## Fronteiras para agentes (governança SPEC §4.4)

1. Agentes que editam **uma página individual** NÃO alteram `ecosystem.nav.yaml`, a ordem dos pilares, nem o glossário — sem **bump de versão** e **aprovação humana**.
2. Qualquer alteração de grafo (adicionar/remover nó, mudar pilar, novo crosslink) exige editar a SSOT, rodar `node scripts/gen-catalogo.mjs` e fazer bump de `meta.version`.
3. O `<title>` autoral de cada página é soberano; o `title`/`label` no YAML é apenas o rótulo de **menu**.

## Receitas

**Adicionar um nó:** 1) crie `src/<slug>.html`; 2) em `ecosystem.nav.yaml` adicione a entrada em `nodes:` (com `pillar`, `kind`, `natureza`, `temas`, `descricao`) e o slug em `pillars[].nodes`; 3) bump `meta.version`; 4) rode `node scripts/gen-catalogo.mjs`; 5) injete o script na nova página (`node scripts/inject-eco-nav.mjs`); 6) rode `npm run i18n:sync` e `npm run gate`.

**Adicionar um crosslink:** adicione em `crosslinks:` (YAML) com `from`/`to`/`rationale` e rode o gerador; se `status: proposed` for aprovado, materialize o link real no corpo da página de origem. O selo do cartão no catálogo é o campo `selo` do nó.

## Invariantes (verificados — SPEC §2.2)

`INV-1` a `INV-8` do esquema 2.0.0 (cabeçalho do YAML e SDD-F1-F1b §3.2), aplicados por
`tests/ecosystem.schema.test.mjs` e `tests/catalogo.gen.test.mjs`.

## Estado atual (v2.0.0)

- 4 pilares, 29 nós neles (28 com cartão; `aprendizagem-autorregulada-artigo` é par, sem cartão),
  3 narrativas na trajetória e 4 entradas.
- `lifeos` fica fora do YAML por decisão do autor (2026-11-10).
- O `<eco-nav>` sai no lote L5 da F1b (cabeçalho comum); até lá, os dados vêm do gerador.
- A seção `entradas` também alimenta o cabeçalho comum (`scripts/gen-cabecalho.mjs`): `label` no PT, `label_en` no `/en/`. Mudar um rótulo ou a ordem das entradas exige rodar `node scripts/gen-cabecalho.mjs`.
- Crosslinks materializados: `knowledge-os-presentation → proposta-engenharia-reversa`, `devin → salesforce-agentic-quickstart`. `engenharia-agentes-ia → socialselling` já existia.
