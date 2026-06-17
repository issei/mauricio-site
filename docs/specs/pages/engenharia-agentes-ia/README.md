# Especificação — Site Interativo "Engenharia de Agentes de IA"

> **O que é isto.** O conjunto de documentos desta pasta especifica, de ponta a ponta, um **site
> educacional interativo** que ensina os princípios do guia
> [`docs/references/guia-engenharia-agentes-ia.md`](../../../references/guia-engenharia-agentes-ia.md)
> — derivado do `framework-boas-praticas-agentes-ia.md` do projeto SocialSelling
> (`https://mauricio.issei.com.br/socialselling.html`).
>
> **Natureza do entregável.** Esta é uma **especificação de produto** (SDD — *Spec-Driven
> Development*), **não código**. O objetivo é que uma equipe (Product Designer, UX, Arquiteto de
> Software, Front-end) consiga **iniciar a implementação sem redefinir o conceito**.

---

## Página-alvo e contexto técnico

- **Arquivo:** `src/engenharia-agentes-ia.html`
- **URL final:** `mauricio.issei.com.br/engenharia-agentes-ia`
- **Infra:** estática (Vite detecta `src/*.html`), **Tailwind via CDN + bloco `<style>`** para
  efeitos. **Sem backend.** Métricas via analytics client-side.
- **Identidade visual:** base **"Dark Tech"** do site ([STYLE_GUIDE.md](../../STYLE_GUIDE.md) — Inter,
  GitHub-dark, gradientes azul→roxo neon) **+ modo claro** complementar.
- **Idioma:** Português do Brasil. Tom direto, intelectual, sem jargão corporativo vazio.

> **Premissa de escopo (lida do guia-fonte).** O produto **pratica o que ensina**: pouca "mágica" no
> caminho crítico, MVP enxuto e disciplinado, features pesadas (simulador, playground, BPMN editável)
> entram de forma incremental e conscientemente faseada (ver `09_roadmap_esforco_riscos.md`).

---

## Ordem de leitura

| # | Documento | Para quem importa mais |
| :-- | :-- | :-- |
| — | [`README.md`](README.md) (este) | Todos — comece aqui |
| 00 | [`00_visao_produto_personas_objetivos.md`](00_visao_produto_personas_objetivos.md) | PM, stakeholders, designer |
| 01 | [`01_arquitetura_informacao_e_sitemap.md`](01_arquitetura_informacao_e_sitemap.md) | UX, arquiteto de informação |
| 02 | [`02_jornada_de_aprendizagem.md`](02_jornada_de_aprendizagem.md) | Designer instrucional, conteúdo |
| 03 | [`03_wireframes_e_catalogo_de_componentes.md`](03_wireframes_e_catalogo_de_componentes.md) | UX, Front-end |
| 04 | [`04_visualizacoes_interativas.md`](04_visualizacoes_interativas.md) | Front-end, dataviz |
| 05 | [`05_bpmn_diagramas_executaveis.md`](05_bpmn_diagramas_executaveis.md) | Front-end (BPMN), arquiteto |
| 06 | [`06_simulador_e_playground.md`](06_simulador_e_playground.md) | Front-end, designer de interação |
| 07 | [`07_direcao_de_arte_e_animacoes.md`](07_direcao_de_arte_e_animacoes.md) | Product Designer, motion |
| 08 | [`08_acessibilidade_e_metricas.md`](08_acessibilidade_e_metricas.md) | UX, Front-end, dados |
| 09 | [`09_roadmap_esforco_riscos.md`](09_roadmap_esforco_riscos.md) | Tech Lead, PM |
| 10 | [`10_governanca_agent_driven_e_vibe_coding.md`](10_governanca_agent_driven_e_vibe_coding.md) | Arquiteto, Tech Lead (conteúdo adicional) |
| — | [`BUILD_PLAN.md`](BUILD_PLAN.md) | Plano de construção autônoma (ondas, testes, FinOps de tokens, push) |

**Dois caminhos de leitura:**
- **Quero entender o produto:** 00 → 01 → 02 → 09.
- **Vou implementar:** 03 → 07 → 04 → 05 → 06 → 08, com 09 como sequenciamento.

---

## Mapa entregável → documento

Os 20 entregáveis solicitados, e onde cada um vive:

| # | Entregável | Documento |
| :-- | :-- | :-- |
| 1 | Visão do produto | 00 |
| 2 | Personas | 00 |
| 3 | Objetivos pedagógicos | 00 |
| 4 | Arquitetura da informação | 01 |
| 5 | Sitemap completo | 01 |
| 6 | Jornada de aprendizagem | 02 |
| 7 | Wireframes conceituais por página | 03 |
| 8 | Catálogo de componentes | 03 |
| 9 | Especificação das visualizações | 04 |
| 10 | Especificação BPMN.js | 05 |
| 11 | Simulador de arquitetura | 06 |
| 12 | Playground educacional | 06 |
| 13 | Sistema de animações | 07 |
| 14 | Direção de arte | 07 |
| 15 | Acessibilidade | 08 |
| 16 | Métricas e observabilidade | 08 |
| 17 | Roadmap incremental (MVP→V1→V2) | 09 |
| 18 | Estimativa qualitativa de esforço | 09 |
| 19 | Riscos do projeto | 09 |
| 20 | Recomendações finais | 09 |

> A **especificação técnica por funcionalidade** (objetivo · UX · componentes · tecnologias ·
> complexidade · riscos · mitigação) é transversal: aparece *inline* em cada feature (04, 05, 06) e é
> **consolidada numa matriz única** em 09.

### Conteúdo adicional (extensões pós-escopo)

Pontos acrescentados após a spec inicial, integrados aos documentos existentes e a um novo doc:

| Tema | Onde |
| :-- | :-- |
| Segurança epistémica/adversarial (sanitização de input, P3/P5) | 04 (V12) |
| Evals: Erro de Sistema × Erro de Modelo (LLM-as-a-judge) | 06 (§1.7) |
| Resiliência: Saga · Idempotência · DLQ | 05 (§7) |
| Human-in-the-loop por confiança (limiar 98%) | 05 (§8) |
| Encolhimento do resíduo no tempo (extração de regras, P4) | 04 (V13) |
| **Governança Agent-Driven e Vibe Coding** (dicionário SDD/ADR/BDD/DoR-DoD/MCP, anatomia do repositório, meta-prompt × manual) | **10** |

Fonte adicional: [`guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md).

---

## Os 10 princípios-fonte (espinha dorsal de todo o site)

Toda a navegação, jornada e visualizações derivam dos 10 princípios do guia. Referência rápida:

| P | Princípio | Capítulo da jornada | Visualização-chave |
| :-: | :-- | :-- | :-- |
| P1 | O LLM é componente, não piloto | Cap. 2 — Orquestração determinística | DAG animado vs. agentes livres |
| P2 | Determinismo é invariante testável | Cap. 2 / Cap. 8 | Reexecução byte-idêntica |
| P3 | Separe Cérebro da Vitrine | Cap. 3 — Cérebro vs. Vitrine | Cozinha × Salão, contrato HTTP |
| P4 | Determinístico-primeiro | Cap. 4 | Resíduo interpretativo |
| P5 | Contratos rígidos em toda fronteira | Cap. 5 | "Firewall" rejeitando schema |
| P6 | Isole as camadas epistêmicas | Cap. 6 (parte) | Evidence→Inference→Judgment |
| P7 | Abrace o Mundo Aberto | Cap. 6 — Open-World | Incerteza explícita vs. "falso" |
| P8 | Governe o orçamento com ledgers | Cap. 7 — FinOps | Ledger vivo + ondas |
| P9 | Governança fail-closed (BDD, DoR/DoD) | Cap. 8 — BDD | Given/When/Then executando |
| P10 | Explique, não exponha o número (XAI) | Cap. 9 — XAI | Desmontagem da decisão |

---

## Glossário rápido

- **Agente / sistema agêntico** — software cujo componente central é um LLM operando com algum grau
  de autonomia.
- **Pipeline determinístico / DAG** — grafo de etapas fixas; o LLM é chamado *dentro* de uma etapa,
  nunca decide a próxima.
- **Cérebro × Vitrine** — separação física entre motor cognitivo (pesado, sensível) e interface
  (leve, exposta), ligados por contrato estreito.
- **Resíduo interpretativo** — a fração da tarefa que só o LLM resolve, depois que dados estruturados
  preencheram todo o resto.
- **Contrato rígido (schema)** — esquema estrito que rejeita campos inesperados na saída do LLM.
- **Open-World** — ausência de evidência é *incerteza*, não negação ("não sei" como estado de
  primeira classe).
- **Ledger de quota** — estado de domínio persistente que governa requisições/créditos e recusa
  gasto antes do provedor recusar.
- **BDD** — cenários Given/When/Then com *fixtures* gravadas; testa o sistema ao redor do modelo.
- **XAI** — explicação por *drivers* em linguagem natural + lacunas + proveniência, em vez do score
  bruto.
- **MVP / V1 / V2** — fases de entrega (ver 09).

---

## Convenções destes documentos

- Cada feature relevante traz a ficha-padrão: **Objetivo · Experiência do usuário · Componentes ·
  Tecnologias · Complexidade (Baixa/Média/Alta) · Riscos · Mitigação**.
- Diagramas conceituais em ASCII (substituídos por SVG/Canvas na implementação — ver 04).
- `Nota para o desenvolvedor` marca decisões de implementação; `Nota editorial` marca decisões de
  conteúdo/tom.
- Referências cruzadas ao guia-fonte aparecem como `(Guia §N)` ou pelo nome do princípio.
