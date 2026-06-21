# 🌐 ECOSYSTEM.md — Governança da Rede de Navegação

> Arquivo de contexto persistente para **agentes de manutenção** (SPEC_ECOSYSTEM.md §4.4).
> Define as fronteiras que impedem desvio (drift) de vocabulário, identidade e topologia
> ao interligar as páginas-ilha do site. Estas regras são **normativas**.

## Fonte da verdade (SSOT)

| Artefato | Papel |
| :--- | :--- |
| [`specs/ecosystem.nav.yaml`](specs/ecosystem.nav.yaml) | **SSOT** do grafo de navegação (pilares, nós, crosslinks). Em conflito, prevalece. |
| [`src/js/eco-nav.js`](src/js/eco-nav.js) | Web Component `<eco-nav>`. Contém uma **cópia derivada** dos dados (< 8 KB). |
| `specs/SPEC_ECOSYSTEM.md` · `specs/RESEARCH_MAPPING.md` | Contrato técnico (Fase 2) e mapeamento conceitual (Fase 1). |
| [`src/catalogo.html`](src/catalogo.html) | Hub/"home" do ecossistema (fora dos 5 pilares; alvo da âncora L0). |

> ⚠️ O `<eco-nav>` embute os dados em JS para ser self-contained (sem fetch/CORS,
> funciona offline). **YAML e JS devem ser mantidos em sincronia.** Ao mudar o grafo,
> edite os dois e faça **bump de `meta.version`** (semver).

## A jornada (CA-01) — ordem imutável

```
P1 Fundação → P2 Engenharia de Confiança → P3 Ecossistema Salesforce → P4 Sustentação & Resiliência → P5 Soluções & Portfólio
(Mentalidade)        (O Método)                  (A Aplicação)                (O Valor)                      (Resultados)
```

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
2. Qualquer alteração de grafo (adicionar/remover nó, mudar pilar, novo crosslink) exige editar a SSOT **e** a cópia no componente, com bump de `meta.version`.
3. O `<title>` autoral de cada página é soberano; o `title`/`label` no YAML é apenas o rótulo de **menu**.

## Receitas

**Adicionar um nó:** 1) crie `src/<slug>.html`; 2) em `ecosystem.nav.yaml` adicione a entrada em `nodes:` e o slug em `pillars[].nodes`; 3) replique em `src/js/eco-nav.js` (`DATA.nodes` + `DATA.pillars`); 4) bump `meta.version`; 5) injete o script na nova página; 6) rode `npm run gate`.

**Adicionar um crosslink:** adicione em `crosslinks:` (YAML) e `DATA.crosslinks` (JS) com `from`/`to`/`rationale`; se `status: proposed` for aprovado, materialize o link real no corpo da página de origem.

## Invariantes (verificados — SPEC §2.2)

`INV-1` nós de `pillars[].nodes` existem em `nodes` · `INV-2` 5 pilares, ordem 1→5 ·
`INV-3` todo `node.file` existe em `src/` · `INV-4` `crosslinks[].from/to` são slugs válidos ·
`INV-5` URLs derivam de `meta.canonical_base` (`./`).

## Estado atual (v1.0.0)

- 16 nós canônicos + 1 extra (`proposta-observabilidade-mobile`, `canonical: false`, em P4).
- Injetado nas 17 páginas-nó (não no `catalogo.html`, que é o próprio mapa).
- Crosslinks materializados: `knowledge-os-presentation → proposta-engenharia-reversa`, `devin → salesforce-agentic-quickstart`. `engenharia-agentes-ia → socialselling` já existia.
