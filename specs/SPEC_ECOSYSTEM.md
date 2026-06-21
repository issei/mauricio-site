# SPEC_ECOSYSTEM.md
### FASE 2 — PLAN · Especificação Técnica Viva (SSOT)
**Projeto:** Orquestração de Rede dos 16 sites de Maurício Issei
**Protocolo:** Spec-Driven Development (SDD) · Ciclo RPI
**Status:** `PLAN` (Fase 2 de 3) · ⏸ **AGUARDANDO APROVAÇÃO HUMANA** · gerado 2026-06-21
**Depende de:** `RESEARCH_MAPPING.md` (Fase 1, aprovada implicitamente)

> Este documento é a **única fonte da verdade (SSOT)**. Em caso de conflito entre este contrato e qualquer implementação futura, **este contrato prevalece**. Nenhum código deve ser escrito até a seção §8 (Sign-off) ser assinada por um humano.

---

## 1. Intenção (contrato de topo)

Unificar 16 páginas-ilha numa rede navegável que conduz o visitante pela jornada cognitiva
**Mentalidade → Método → Aplicação → Valor → Resultados**, adicionando uma **camada de orquestração não-invasiva** que respeita o layout e o CSS de cada página.

**Princípio diretor:** *adicionar topologia, não reescrever conteúdo.* O componente global é uma sobreposição modular; ele nunca edita o `<body>` autoral de uma página.

---

## 2. Modelo de dados do Menu Global (estrutura abstrata)

A SSOT do grafo de navegação é um único arquivo de dados, consumido pelo componente. **Formato canônico: YAML** (legível por humano e por agentes de manutenção). Uma derivação JSON pode ser gerada no build.

### 2.1 Esquema (`ecosystem.nav.yaml`)

```yaml
# ===== SSOT da navegação do ecossistema =====
meta:
  version: "1.0.0"            # semver; bump obrigatório a cada alteração de grafo
  canonical_base: "/"        # convenção de URL: relativa-raiz (decisão D-05)
  author: "Maurício Yokoyama Issei"
  updated: "2026-06-21"

pillars:                     # ordem = jornada CA-01 (NÃO reordenar sem bump major)
  - id: p1
    order: 1
    label: "Fundação"
    subtitle: "Mentalidade"
    summary: "Princípios de pensamento sistêmico e gestão do conhecimento."
    nodes: [know, devin]

  - id: p2
    order: 2
    label: "Engenharia de Confiança"
    subtitle: "O Método"
    summary: "Da intenção à execução agêntica confiável."
    nodes: [engenharia-confianca, engenharia-agentes-ia, knowledge-os-presentation]

  - id: p3
    order: 3
    label: "Ecossistema Salesforce"
    subtitle: "A Aplicação"
    summary: "Métodos agênticos aplicados à plataforma Salesforce."
    nodes: [devops-salesforce, proposta-engenharia-reversa, salesforce-agentic-quickstart, salesforce-agentic-dev]

  - id: p4
    order: 4
    label: "Sustentação & Resiliência"
    subtitle: "O Valor"
    summary: "Operação de serviço, SRE e resiliência em produção."
    nodes: [sustentacao, service-operations-2-0, proposta]

  - id: p5
    order: 5
    label: "Soluções & Portfólio"
    subtitle: "Resultados"
    summary: "Soluções entregues e a jornada pessoal."
    nodes: [socialselling, index, life, life3d]

nodes:                       # 16 nós; chave = slug do arquivo (sem .html)
  know:
    file: "know.html"
    title: "Navegando na Complexidade"
    blurb: "O fim das melhores práticas."
    pillar: p1
  devin:
    file: "devin.html"
    title: "Vibe Coding com Devin"
    blurb: "Engenharia agêntica na prática."
    pillar: p1
  # ... (16 nós no total — ver Apêndice A)

# Arestas transversais (cross-linking dirigido) — alimentam §3 e a Fase 3
crosslinks:
  - from: knowledge-os-presentation
    to: proposta-engenharia-reversa
    rationale: "Knowledge OS fundamenta a engenharia reversa assistida por IA."
    status: proposed          # proposed | existing
  - from: devin
    to: salesforce-agentic-quickstart
    rationale: "Devin como executor concreto no stack Salesforce."
    status: proposed
  - from: engenharia-agentes-ia
    to: socialselling
    rationale: "Agentes de IA aplicados a Social Selling."
    status: existing
```

### 2.2 Regras de integridade do modelo (invariantes)

| INV | Regra | Verificação |
|---|---|---|
| INV-1 | Todo `node` referenciado em `pillars[].nodes` existe em `nodes` | lint de build falha se órfão |
| INV-2 | `pillars` mantém `order` 1→5 e exatamente os 5 pilares de CA-01 | teste automatizado |
| INV-3 | Todo `node.file` corresponde a um arquivo real em `src/` | checagem de FS |
| INV-4 | `crosslinks[].from/to` são slugs válidos | lint |
| INV-5 | URLs derivadas usam `canonical_base` (sem mistura absoluto/relativo) | normalizador |

---

## 3. Estratégia de Progressive Disclosure

Objetivo: reduzir sobrecarga cognitiva do visitante **e** consumo de contexto/tokens de agentes — expor profundidade **sob demanda**, nunca tudo de uma vez.

### 3.1 Três níveis de revelação

| Nível | O que mostra | Gatilho | Custo cognitivo |
|---|---|---|---|
| **L0 — Âncora** | Botão/ícone fixo "Ecossistema" + pílula do pilar atual | sempre visível | mínimo |
| **L1 — Pilares** | Os 5 pilares com `subtitle` + `summary` (1 linha) | clique/hover na âncora | baixo |
| **L2 — Nós** | Páginas do pilar expandido (`title` + `blurb`) + crosslinks relevantes | expandir um pilar | sob demanda |

Regra: **só um pilar expandido por vez** (acordeão). O pilar **da página atual** vem pré-expandido; os demais ficam colapsados. Isso ancora o usuário na jornada (CA-01) sem despejar 16 links de uma vez.

### 3.2 Orçamento de contexto (anti-token-bloat)

- O componente injeta **apenas** os dados de `ecosystem.nav.yaml` (compilado a um JSON < 8 KB), não o conteúdo das páginas.
- Crosslinks de L2 são **filtrados por relevância** (só os do nó/pilar atual), evitando renderizar o grafo inteiro.
- Sem imagens no menu; ícones via símbolos inline/SVG sprite único.

---

## 4. Guardrails de Consistência (anti-drift) — sustenta CA-03

Regras que impedem desvio de tom, vocabulário e identidade ao interligar páginas. Estas regras são **normativas** e devem ser replicadas no arquivo de contexto persistente `ECOSYSTEM.md` (entregue na Fase 3) para agentes de manutenção futuros.

### 4.1 Vocabulário (lexical lock)
Os termos canônicos do glossário (`RESEARCH_MAPPING.md §3`) têm grafia fixa: **Devin, Engenharia da Confiança, Knowledge OS, Engenharia Reversa, SRE, Service Operations 2.0, Protocolo Manchester, Flosum**. Rótulos do menu e blurbs **não podem** parafrasear esses termos.

### 4.2 Tom
Voz de especialista, primeira pessoa institucional ("Maurício Issei"), PT-BR. Blurbs ≤ 60 caracteres, afirmativos, sem jargão de marketing vazio ("revolucionário", "disruptivo").

### 4.3 Identidade visual (isolamento — também serve CA-02)
- Todo CSS do componente é **escopado** sob um único namespace (`.mi-eco` + prefixo de classe) ou **Shadow DOM**, garantindo zero vazamento para/da página hospedeira.
- Nenhuma regra global (`body`, `*`, tags nuas) é permitida no CSS do componente.
- Tokens de tema (cor de acento, fonte) lidos de variáveis CSS com **fallback**, para herdar a identidade da página sem quebrá-la.
- Z-index reservado em faixa alta documentada (ex.: `2147483000`) para não colidir.

### 4.4 Drift de IA (governança)
- `ECOSYSTEM.md` (Fase 3) declara fronteiras: "agentes que editam uma página individual **não** alteram `ecosystem.nav.yaml`, a ordem dos pilares, nem o glossário sem bump de versão e aprovação humana."
- Qualquer alteração de grafo exige `version` bump (INV via §2.1).

---

## 5. Arquitetura do componente (decisão técnica)

| Decisão | Escolha | Justificativa (rastreável a CA) |
|---|---|---|
| D-01 Distribuição | **Web Component** autônomo (`<eco-nav>`), 1 arquivo JS + dados | CA-02 agnosticismo de layout |
| D-02 Isolamento de estilo | Shadow DOM (preferido) ou namespace `.mi-eco` | CA-02 / §4.3 |
| D-03 Injeção | 1 linha `<script type="module" src="/eco-nav.js">` antes de `</body>` | CA-02 não-invasivo |
| D-04 Detecção de página atual | via `location.pathname` → slug → pilar | CA-01 ancoragem |
| D-05 Convenção de URL | relativa-raiz (`/devin.html`) | INV-5 / lacuna #5 |
| D-06 Sem dependências externas | vanilla JS, sem framework | compatível com Tailwind/CSS-custom misto |
| D-07 Acessibilidade | navável por teclado, ARIA roles, `prefers-reduced-motion` | qualidade/handoff |
| D-08 Degradação | sem JS → nenhum dano à página (componente é aditivo) | CA-02 |

---

## 6. Critérios de Aceite — rastreabilidade

| CA | Como esta SPEC satisfaz | Verificação na Fase 3 |
|----|------------------------|------------------------|
| **CA-01** Rastreabilidade linear | `pillars[].order` 1→5 fixa a jornada; pilar atual pré-expandido (§3.1); INV-2 | teste: ordem dos pilares == [Fundação, Método, Salesforce, Sustentação, Portfólio] |
| **CA-02** Agnosticismo de layout | Web Component + Shadow DOM + injeção 1-linha + degradação (D-01,02,03,08) | teste visual em 16 páginas: layout/CSS inalterados |
| **CA-03** Ancoragem anti-drift | Glossário lock (§4.1) + `ECOSYSTEM.md` + version bump obrigatório (§4.4) | revisão: `ECOSYSTEM.md` presente e regras declaradas |

---

## 7. Pontos abertos (HITL — herdados do RESEARCH §4)

Estes itens **não foram decididos por premissa**. Sugestão da SPEC entre parênteses; aguardam confirmação humana:

1. **Título de `devops-salesforce.html`** (`<title>` vazio). *(Sugerido: "DevOps Salesforce — Entrega Contínua Agêntica")*
2. **Papel do `catalogo.html`** — home do ecossistema? *(Sugerido: âncora L0 aponta para `catalogo.html` como hub; permanece fora dos 5 pilares)*
3. **`life` vs `life3d`** — ambos no menu? *(Sugerido: ambos em P5; `life3d` rotulado "(3D)")*
4. **Crosslinks `proposed`** (N05⇒N07, N02⇒N08) — aprovar para virar TASK na Fase 3? *(Sugerido: sim)*
5. **Convenção de URL** relativa-raiz aceitável na hospedagem atual? *(Sugerido: sim, D-05)*

---

## 8. Sign-off (PORTÃO HITL — obrigatório)

> ⏸ **A EXECUÇÃO ESTÁ PAUSADA AQUI.**
> Conforme o protocolo SDD §4, **nenhum código, script ou Task Breakdown (`TASKS.md`) será gerado** até que esta especificação seja revisada, ajustada e **aprovada explicitamente**.

Para liberar a Fase 3 (IMPLEMENT), responda com:
- **decisões dos 5 pontos abertos** (§7), e
- **"SPEC aprovada"** (ou ajustes desejados).

| Campo | Valor |
|---|---|
| Revisor | _______________ |
| Data | _______________ |
| Decisão | ☐ Aprovada ☐ Aprovada com ajustes ☐ Revisar |

---

### Apêndice A — Tabela completa dos 16 nós
Ver `RESEARCH_MAPPING.md §1` (N01–N16). Será materializada por extenso em `ecosystem.nav.yaml` na Fase 3, após aprovação.
