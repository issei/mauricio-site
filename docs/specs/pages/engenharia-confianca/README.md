# Especificação — Site "A Engenharia da Confiança: Da Intenção à Execução Agêntica"

> **O que é isto.** Este conjunto de documentos especifica, de ponta a ponta, um **site educacional
> em quatro módulos** que costura os três pilares já documentados no repositório numa única jornada:
> da **IA-como-mágica** para a **IA-como-engenharia**. O entregável é uma **especificação de produto**
> (SDD — *Spec-Driven Development*), **não código**: o objetivo é que designer, UX, arquiteto e
> front-end iniciem a implementação sem ter de redefinir o conceito.
>
> **Base de requisitos:** [`docs/references/site.md`](../../../references/site.md).

---

## Tese e objetivo narrativo

O site conduz o leitor do **"Caos da IA como Mágica"** para a **"Disciplina da IA como Engenharia"**.
A frase que une tudo, herdada do pilar de Arquitetura, é a espinha dorsal editorial:

> **A capacidade vem do modelo; a confiança vem da engenharia.**

A narrativa tem dois inimigos declarados e um objetivo:

- **Inimigo 1 — o Crash Silencioso:** a falha que não gera erro de código, mas destrói valor (uma
  regra de negócio perdida, uma decisão tomada com falsa confiança).
- **Inimigo 2 — o Vazamento de Modo:** o protótipo descartável que vira produção sem o upgrade de rigor.
- **Objetivo — escalar a Intencionalidade:** sair de comportamento governado por *probabilidade* para
  comportamento governado por *arquitetura* (o **Sistema Intencional**).

---

## Os três pilares-fonte (a matéria-prima da jornada)

Toda a navegação reaproveita e referencia páginas que **já existem** no repositório. Nada é inventado
do zero: o site novo é a **camada narrativa** que dá coesão sequencial a esses três corpos de conteúdo,
preenchendo apenas as lacunas de transição.

| Papel na jornada | Pilar | Página existente | Guia de referência |
| :-- | :-- | :-- | :-- |
| **Fundação** — o mapa do passado para o futuro | Engenharia Reversa Assistida por IA | [`src/proposta-engenharia-reversa.html`](../../../../src/proposta-engenharia-reversa.html) | [`docs/references/propostav2.md`](../../../references/propostav2.md) |
| **Arquitetura** — os princípios do determinismo | Engenharia de Agentes de IA | [`src/engenharia-agentes-ia.html`](../../../../src/engenharia-agentes-ia.html) | [`docs/references/guia-engenharia-agentes-ia.md`](../../../references/guia-engenharia-agentes-ia.md) |
| **Execução** — a evolução para Orquestrador Cognitivo | Vibe Coding com Devin | [`src/devin.html`](../../../../src/devin.html) | [`docs/references/guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md) |

> **Princípio de reaproveitamento.** Cada módulo é uma **porta de entrada curada** para um pilar: o
> site novo apresenta o conceito-âncora, dá o contexto da jornada e então **encaminha o leitor para a
> página-fonte** para o aprofundamento interativo. O conteúdo de transição (introdução, ponte entre
> módulos, CTA de reflexão) é o que se escreve do zero.

---

## Estrutura: quatro módulos sequenciais

| Módulo | Título | Conceito central | Pilar-fonte |
| :-: | :-- | :-- | :-- |
| **0** | O Despertar da Liderança | O Crash Silencioso e a falha de intenção | Vídeo "Por que sua IA falha?" + ponte para os três pilares |
| **1** | Mapeando a Verdade | Revelar o "Implícito" e torná-lo "Explícito" (As-Is → To-Be) | Engenharia Reversa |
| **2** | Arquitetando a Confiança | Determinístico-primeiro, Cérebro × Vitrine, Contratos, MCP | Engenharia de Agentes |
| **3** | A Nova Maestria | De Executor a Orquestrador Cognitivo; SDD; Skills/Playbooks/Knowledge | Vibe Coding com Devin |

---

## Ordem de leitura

| # | Documento | Para quem importa mais |
| :-: | :-- | :-- |
| — | [`README.md`](README.md) (este) | Todos — comece aqui |
| 00 | [`00_visao_personas_objetivos.md`](00_visao_personas_objetivos.md) | PM, stakeholders, designer instrucional |
| 01 | [`01_arquitetura_informacao_e_sitemap.md`](01_arquitetura_informacao_e_sitemap.md) | UX, arquiteto de informação |
| 02 | [`02_jornada_de_aprendizagem.md`](02_jornada_de_aprendizagem.md) | Designer instrucional, conteúdo |
| 03 | [`03_wireframes_e_catalogo_de_componentes.md`](03_wireframes_e_catalogo_de_componentes.md) | UX, front-end |
| 04 | [`04_visualizacoes_e_diagramas_mermaid.md`](04_visualizacoes_e_diagramas_mermaid.md) | Front-end, dataviz |
| 05 | [`05_glossario_e_referencias_cruzadas.md`](05_glossario_e_referencias_cruzadas.md) | Conteúdo, todos |
| 06 | [`06_estilo_roadmap_esforco_riscos.md`](06_estilo_roadmap_esforco_riscos.md) | Tech Lead, PM, motion |

**Dois caminhos de leitura:**

- **Quero entender o produto:** 00 → 01 → 02 → 06.
- **Vou implementar:** 03 → 04 → 01 → 02 → 06.

---

## Mapa entregável → documento

Os entregáveis solicitados em [`site.md`](../../../references/site.md), e onde cada um vive:

| Entregável (site.md) | Documento |
| :-- | :-- |
| Estrutura de navegação e fluxo educacional | 01, 02 |
| Os quatro módulos sequenciais | 02 |
| Referências cruzadas conceito → arquivo do repo | 05 (consolidado), inline em 02 |
| Tom de voz e diretrizes de conteúdo | 06 §1 |
| Elementos visuais (analogias Chef / Freio de F1) | 04 |
| Diagramas Mermaid (pipeline determinístico etc.) | 04 |
| CTA educativo / Modelo de Maturidade | 00 §3, 02 (por módulo) |
| Glossário unificado (sidebar) | 05 |
| README como portal de entrada | 01 §4 (especificado; implementação fora deste escopo) |

---

## Convenções destes documentos

- Cada feature relevante traz a ficha-padrão: **Objetivo · Experiência do usuário · Componentes ·
  Tecnologias · Complexidade (Baixa/Média/Alta) · Riscos · Mitigação**.
- Diagramas conceituais em ASCII ou Mermaid (a implementação final usa **Mermaid.js**, conforme
  instrução de [`site.md`](../../../references/site.md)).
- `Nota para o desenvolvedor` marca decisões de implementação; `Nota editorial` marca decisões de
  conteúdo/tom.
- Referências cruzadas aparecem como link direto ao arquivo-fonte do repositório.
- **Idioma:** Português do Brasil. **Tom:** conversacional, inteligente, provocativo e
  técnico-disciplinado — vocabulário de engenharia, não de marketing (ver 06 §1).

---

## Glossário rápido (detalhado em 05)

- **Crash Silencioso** — falha sem erro de código, mas com perda de valor.
- **Resíduo Interpretativo** — a única parte da tarefa onde a IA é realmente necessária.
- **Vazamento de Modo** — quando um protótipo descartável vira produção sem o devido upgrade de rigor.
- **Sistema Intencional** — onde o comportamento é governado pela arquitetura, não pela probabilidade.
