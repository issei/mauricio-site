# RESEARCH_MAPPING.md
### FASE 1 — RESEARCH · Mapeamento de Dependências Conceituais
**Projeto:** Unificação da Presença Digital de Maurício Issei (16 sites)
**Protocolo:** Spec-Driven Development (SDD) · Ciclo RPI
**Status:** `RESEARCH` (Fase 1 de 3) · gerado em 2026-06-21
**Fonte da verdade:** conteúdo real verificado em `src/*.html` + `analise_sites_mauricio_issei.md`

> Este artefato é descritivo, não prescritivo. Ele mapeia o que **existe** e como os conceitos **se herdam**. Nenhuma decisão de implementação é tomada aqui — isso pertence à `SPEC_ECOSYSTEM.md` (Fase 2).

---

## 0. Achados de verificação (estado real do repositório)

Antes do mapeamento conceitual, a investigação confirmou o **problema de arquitetura** que justifica o projeto. Verificação direta nos arquivos `src/`:

| Achado | Evidência | Implicação para a SPEC |
|---|---|---|
| **Silos confirmados** | 6 dos 16 alvos não têm **nenhum** link interno (`know`, `devin`, `devops-salesforce`, `proposta`, `socialselling`, e parcialmente outros) | Justifica menu global (CA-02) |
| **Cross-linking inconsistente** | Mistura de absoluto (`https://mauricio.issei.com.br/...`), relativo (`./devin.html`) e âncoras (`salesforce-agentic-dev.html#sdd`) | Guardrail de normalização de URL na SPEC |
| **Nenhuma navegação global existe** | Zero ocorrências de `global-nav` / `site-nav` / `data-nav` em qualquer arquivo | O componente é **novo**, não um refactor |
| **Heterogeneidade de stack** | Alguns usam Tailwind (`index`, `devin`), outros CSS dedicado (`devin.css` 96KB, `engenharia-confianca.css`); ES modules (`./js/devin.js`) | Reforça CA-02: o componente precisa ser **CSS-isolado e self-contained** |
| **Hub pré-existente** | `catalogo.html` já é referenciado por `index`, `engenharia-confianca`, `engenharia-agentes-ia` | Candidato natural a "home" do ecossistema |
| **Backups/variantes** | Existem `devin-bkp.html`, `index-bkp.html`, `index.template.html` — **fora de escopo** | Excluir explicitamente do menu |

**Conclusão da verificação:** o ecossistema hoje é uma coleção de páginas-ilha com identidade visual forte mas **topologia de rede ausente**. A oportunidade é adicionar uma camada de orquestração **sem tocar** no conteúdo ou CSS individual.

---

## 1. Os 16 nós e seus títulos reais

Títulos extraídos diretamente do `<title>` de cada arquivo (ground truth):

| ID | Arquivo | Pilar | Título real |
|----|---------|-------|-------------|
| N01 | `know.html` | P1 Fundação | Navegando na Complexidade — O Fim das Melhores Práticas |
| N02 | `devin.html` | P1 Fundação | Vibe Coding com Devin |
| N03 | `engenharia-confianca.html` | P2 Método | A Engenharia da Confiança — Da Intenção à Execução Agêntica |
| N04 | `engenharia-agentes-ia.html` | P2 Método | Engenharia de Agentes de IA |
| N05 | `knowledge-os-presentation.html` | P2 Método | Knowledge OS Enterprise — Decisões Mais Rápidas, IA com Segurança |
| N06 | `devops-salesforce.html` | P3 Salesforce | DevOps Salesforce *(title vazio — ⚠ ver lacunas)* |
| N07 | `proposta-engenharia-reversa.html` | P3 Salesforce | Engenharia Reversa Assistida por IA — Transformação Salesforce |
| N08 | `salesforce-agentic-quickstart.html` | P3 Salesforce | Quick Start — Salesforce + Devin + Flosum |
| N09 | `salesforce-agentic-dev.html` | P3 Salesforce | Agentic DevOps for Salesforce — Portal de Treinamento |
| N10 | `sustentacao.html` | P4 Sustentação | Do Caos à Resiliência: Sustentação de Sistemas em Produção |
| N11 | `service-operations-2-0.html` | P4 Sustentação | Service Operations 2.0 — Visão Executiva |
| N12 | `proposta.html` | P4 Sustentação | Inteligência de Vendas em Tempo Real: Salesforce + AWS |
| N13 | `socialselling.html` | P5 Portfólio | SocialSelling — Overview do Projeto & Modelo de Boas Práticas |
| N14 | `index.html` | P5 Portfólio | Maurício Yokoyama Issei — Tech Lead / Análise de Sistemas |
| N15 | `life.html` | P5 Portfólio | A Jornada de Mauricio Issei — Narrativa em Pixel Art |
| N16 | `life3d.html` | P5 Portfólio | Vida em 3D |

---

## 2. Matriz de interconexão conceitual

Como os conceitos **se herdam** ao longo da jornada `Mentalidade → Método → Aplicação → Valor → Resultados`. Cada aresta é dirigida (`A ⇒ B` = "A fundamenta/habilita B").

### 2.1 Herança entre pilares (eixo principal — sustenta CA-01)

```
P1 Fundação ⇒ P2 Método ⇒ P3 Salesforce ⇒ P4 Sustentação ⇒ P5 Portfólio
(Mentalidade)  (O Método)   (A Aplicação)    (O Valor)       (Resultados)
```

| Aresta | Conceito herdado | Evidência textual |
|---|---|---|
| P1 ⇒ P2 | Pensamento sistêmico / "fim das melhores práticas" vira base para engenharia de confiança | `know.html` (complexidade) → `engenharia-confianca.html` ("da intenção à execução") |
| P2 ⇒ P3 | Engenharia agêntica + Knowledge OS são aplicados na plataforma Salesforce | `engenharia-confianca.html` cita **Devin** e linka `proposta-engenharia-reversa.html` |
| P3 ⇒ P4 | Soluções Salesforce passam a ser sustentadas/operadas | `service-operations-2-0.html` linka `devops-salesforce.html` e `sustentacao.html` |
| P4 ⇒ P5 | Resiliência operacional gera resultados de portfólio | `proposta.html` (Salesforce+AWS) → `socialselling.html` (resultado) |

### 2.2 Arestas transversais (cross-cutting — conexões diretas já citadas na análise)

Estas são as conexões "fora do eixo" que a análise original destacou e que a verificação confirmou:

| De | Para | Conceito-ponte | Status no código |
|---|---|---|---|
| N05 `knowledge-os-presentation` (Knowledge OS) | N07 `proposta-engenharia-reversa` (Engenharia Reversa) | Knowledge OS **fundamenta** a engenharia reversa assistida por IA | ⚠ **link ausente hoje** — candidato a TASK |
| N04 `engenharia-agentes-ia` (Eng. Agêntica) | N13 `socialselling` (Social Selling IA) | Agentes de IA aplicados a vendas sociais | ✅ **já linkado** (`engenharia-agentes-ia → socialselling`) |
| N02 `devin` (Devin AI) | N08 `salesforce-agentic-quickstart` (Salesforce+Devin+Flosum) | Devin como executor concreto no Salesforce | ⚠ **link ausente hoje** — candidato a TASK |
| N03 `engenharia-confianca` | N04 / N07 | Confiança como pré-requisito de agentes e eng. reversa | ✅ **já linkado** |
| N11 `service-operations-2-0` | N06 / N10 | Service Operations 2.0 orquestra DevOps + Sustentação | ✅ **já linkado** |
| N08 ↔ N09 (quickstart ↔ dev portal) | — | Par bidirecional Salesforce agêntico | ✅ **já linkado (mútuo)** |

### 2.3 Diagrama da rede conceitual

```
                          ┌─────────────────────────────┐
                          │  P1 · FUNDAÇÃO (Mentalidade) │
                          │  N01 know · N02 devin        │
                          └──────────────┬──────────────┘
                                         │ herda pensamento sistêmico
                                         ▼
                          ┌─────────────────────────────┐
                  ┌──────▶│  P2 · MÉTODO (Engenharia)    │
                  │       │  N03 confiança · N04 agentes │
                  │       │  N05 knowledge-os            │
                  │       └──────┬───────────────┬──────┘
        (Devin)   │              │ aplica        │ knowledge-os
        N02──────-┘              ▼               └────────┐ fundamenta
                          ┌─────────────────────────────┐ │
                          │  P3 · SALESFORCE (Aplicação) │◀┘ (⇒N07)
                          │  N06 devops · N07 eng-reversa│
                          │  N08 quickstart · N09 dev    │
                          └──────────────┬──────────────┘
                                         │ é sustentado por
                                         ▼
                          ┌─────────────────────────────┐
                          │  P4 · SUSTENTAÇÃO (Valor)    │
                          │  N10 sustentacao · N11 svcops│
                          │  N12 proposta (SF+AWS)       │
                          └──────────────┬──────────────┘
                                         │ gera
                                         ▼
                          ┌─────────────────────────────┐
                          │  P5 · PORTFÓLIO (Resultados) │
                          │  N13 socialselling ◀┄┄(N04)  │
                          │  N14 index · N15 life · N16  │
                          └─────────────────────────────┘
```
Legenda: `─►` herança entre pilares (eixo CA-01) · `┄►` aresta transversal.

---

## 3. Glossário de terminologia crítica (controle de drift)

Termos canônicos verificados no conteúdo. Esta é a **fonte normativa de vocabulário** — a SPEC usará isto como guardrail anti-drift (CA-03). Grafia e capitalização devem ser preservadas exatamente.

| Termo canônico | Definição operacional no ecossistema | Páginas onde aparece (verificado) | Não confundir com |
|---|---|---|---|
| **Devin** | Agente de IA de engenharia ("Vibe Coding") usado como executor | N02, N03, N06, N08, N09 | "Devon", "Devin.ai" genérico |
| **Engenharia Agêntica / Agentes de IA** | Método de construir sistemas com agentes autônomos confiáveis | N03, N04, N07 | "automação" simples |
| **Engenharia da Confiança** | Disciplina ponte: da intenção à execução agêntica | N03 | "segurança" / "compliance" |
| **Knowledge OS (Enterprise)** | Sistema de conhecimento que dá rastreabilidade e segurança à IA | N05 | "knowledge base" / wiki |
| **Engenharia Reversa (Assistida por IA)** | Transformação de sistemas Salesforce legados via IA | N03, N07 | refactor manual |
| **SRE** | Site Reliability Engineering — base de resiliência | N03, N05, N10, N11, N13 | "suporte" / "helpdesk" |
| **Service Operations 2.0** | Framework executivo de operação de serviço | N11 | "Service Cloud" da Salesforce |
| **Protocolo Manchester** | Protocolo de triagem/priorização aplicado a operações | N11 | (uso clínico original) |
| **Flosum** | Ferramenta de DevOps Salesforce no stack agêntico | N08 | — |
| **Salesforce + AWS** | Arquitetura de inteligência de vendas em tempo real | N12 | — |

---

## 4. Lacunas e ambiguidades detectadas (para decisão humana)

Itens que a Fase 1 **não resolve por premissa** — devem ser confirmados antes/durante a Fase 2:

1. **`devops-salesforce.html` tem `<title>` vazio.** Afeta o rótulo no menu global e SEO. → A SPEC proporá um título canônico, mas o texto final precisa de aprovação.
2. **Dois nós transversais sem link hoje** (N05⇒N07 e N02⇒N08). São oportunidades de cross-linking — entram como TASKs candidatas na Fase 3, não como suposições agora.
3. **`catalogo.html` não está na lista dos 16**, mas já funciona como hub. Decisão pendente: ele é a "home" do menu global ou permanece secundário?
4. **`life.html` vs `life3d.html`** são variações do mesmo conteúdo (jornada pessoal). Ambos no menu, ou um como variante do outro?
5. **Mistura de URLs absolutas e relativas.** A SPEC precisa fixar uma convenção única (proposta: relativa-raiz) — confirmar se há restrição de hospedagem.

> Conforme o protocolo HITL, estas lacunas serão tratadas como **perguntas clarificadoras (uma de cada vez)** se bloquearem a Fase 2. Nenhuma delas bloqueia o início da SPEC; serão registradas como pontos abertos dentro de `SPEC_ECOSYSTEM.md`.

---

## 5. Saída da Fase 1

`RESEARCH_MAPPING.md` ✅ concluído. Pré-condições para Fase 2 satisfeitas:
- topologia real verificada (silos + ausência de nav global),
- 5 pilares ancorados nos títulos reais,
- matriz de herança (eixo + transversais) estabelecida,
- glossário canônico para guardrails,
- lacunas registradas para HITL.

**Próximo:** Fase 2 — `SPEC_ECOSYSTEM.md` (contrato técnico SSOT). A execução **pausará obrigatoriamente** ao final da Fase 2 para revisão humana antes de qualquer código (Fase 3).
