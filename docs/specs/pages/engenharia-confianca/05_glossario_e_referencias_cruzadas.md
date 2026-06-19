# 05 — Glossário Unificado e Referências Cruzadas

> Cobre o **glossário da sidebar** (instrução de [`site.md`](../../../references/site.md) §3) e a
> **tabela consolidada de referências cruzadas** conceito → arquivo do repositório (instrução §2:
> *"todo conceito técnico deve ter um link para o arquivo correspondente"*).

---

## 1. Glossário unificado (sidebar persistente)

### 1.1 Termos-âncora (sempre visíveis)

Os quatro termos que estruturam a narrativa, exatamente como definidos em `site.md`:

| Termo | Definição | Módulo |
| :-- | :-- | :-: |
| **Crash Silencioso** | Falha sem erro de código, mas com perda de valor. | M0 |
| **Resíduo Interpretativo** | A única parte da tarefa onde a IA é realmente necessária — depois que dados estruturados resolveram todo o resto. | M2 |
| **Vazamento de Modo** | Quando um protótipo descartável vira produção sem o devido upgrade de rigor. | M0/M2 |
| **Sistema Intencional** | Onde o comportamento é governado pela arquitetura, não pela probabilidade. | M3 |

### 1.2 Termos de engenharia (expansíveis)

Vocabulário de engenharia preferido ao de marketing (ver tom em 06 §1):

| Termo | Definição | Fonte |
| :-- | :-- | :-- |
| **Idempotência** | Operação que, repetida, não muda o resultado além da primeira aplicação; base do cache semântico e do *upsert*. | [`guia-engenharia-agentes-ia.md`](../../../references/guia-engenharia-agentes-ia.md) §4 |
| **Rastreabilidade / Proveniência** | Saber de qual fonte veio cada sinal, idealmente com o trecho e o endereço de origem. | guia-eai §6 (XAI) |
| **Camadas Epistêmicas** | Separação entre evidência, inferência e julgamento — cada uma rastreável e isolada. | guia-eai §3 |
| **Determinístico-primeiro** | Resolver com regras e dados; gastar IA apenas no resíduo interpretativo. | guia-eai (síntese) |
| **Cérebro × Vitrine** | Separação física entre motor cognitivo (sensível) e interface (exposta), ligados por contrato estreito. | guia-eai §2 |
| **Contrato rígido (schema)** | Esquema estrito que rejeita campos inesperados na saída do LLM; a saída é input não confiável até validar. | guia-eai §2 |
| **Open-World / Mundo Aberto** | Ausência de dado é incerteza explícita, nunca "falso"; ensinar o sistema a dizer "não sei". | guia-eai §3 |
| **Ledger de quota** | Estado de domínio persistente que governa gasto/créditos e recusa a despesa antes do provedor. | guia-eai §4 |
| **Poda precoce** | Colocar o filtro mais barato e discriminante o mais cedo possível no pipeline. | guia-eai §4 |
| **Processamento em ondas** | Lotes resumíveis que param ao atingir o orçamento e retomam depois; *pagination* + *job queue* do mundo clássico. | guia-eai §4 |
| **Cache semântico** | Corpus acumulativo com chave de identidade estável e *upsert* idempotente; nunca pagar duas vezes pelo mesmo processamento. | guia-eai §4 |
| **BDD** | Cenários Dado/Quando/Então com *fixtures* gravadas; testa o sistema ao redor do modelo, não a "inteligência" do modelo. | guia-eai §5 / [`guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md) §2 |
| **DoR / DoD** | Definition of Ready / Done — portões de governança que fecham o escopo antes de delegar e validam depois. | [`docs/governance/dor-dod-eai.md`](../../../governance/dor-dod-eai.md) |
| **Fail-closed** | Se não foi possível concluir, não se marca como concluído; registra-se o bloqueio e para-se num ponto seguro. | guia-eai §5 |
| **XAI** | Explicação por *drivers* em linguagem natural + lacunas + proveniência, em vez do score bruto. | guia-eai §6 |
| **MCP (Model Context Protocol)** | Protocolo padronizado que dá ao agente "mãos e olhos" controlados; declara quais ferramentas pode usar (fronteira de segurança). | [`guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md) §2 |
| **SDD (Spec-Driven Development)** | A especificação como fonte da verdade; a IA implementa contra a spec, com testes como alvo. | [`guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md) §2 |
| **ADR** | Architecture Decision Record — registro datado de uma decisão de arquitetura e sua justificativa. | [`docs/decisions/`](../../../decisions/) |
| **Alucinação sintática** | Código que *parece* perfeito (sintaxe, nomes, estrutura) mas está logicamente errado. | [`guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md) §1 |
| **Inventário de Comportamentos** | Ativo holístico do As-Is: regras core, efeitos colaterais e workarounds, classificados por confiança. | [`propostav2.md`](../../../references/propostav2.md) §4 |
| **Matriz de Evidências** | Pool multifacetado (estrutural, estado, operacional, humano) que evita falsos-positivos na descoberta. | [`propostav2.md`](../../../references/propostav2.md) §3 |
| **Orquestrador Cognitivo** | Quem dirige a inteligência da máquina com intenção (o "chef executivo"), em vez de executar cada linha. | [`src/devin.html`](../../../../src/devin.html) |

> **Nota para o desenvolvedor.** Cada termo no glossário vira um *target* clicável; toda ocorrência no
> texto da jornada usa sublinhado pontilhado e abre/destaca o verbete (componente `GlossarySidebar`,
> 03 §3). Cada verbete linka à sua fonte.

---

## 2. Tabela consolidada de referências cruzadas (conceito → arquivo)

> Mapa único de rastreabilidade. Atende a instrução de `site.md`: todo conceito técnico aponta para o
> arquivo correspondente no repositório.

### 2.1 Páginas-fonte (camada de profundidade)

| Pilar | Página | Guia de referência |
| :-- | :-- | :-- |
| Engenharia Reversa | [`src/proposta-engenharia-reversa.html`](../../../../src/proposta-engenharia-reversa.html) | [`docs/references/propostav2.md`](../../../references/propostav2.md) |
| Engenharia de Agentes | [`src/engenharia-agentes-ia.html`](../../../../src/engenharia-agentes-ia.html) | [`docs/references/guia-engenharia-agentes-ia.md`](../../../references/guia-engenharia-agentes-ia.md) |
| Vibe Coding com Devin | [`src/devin.html`](../../../../src/devin.html) | [`docs/references/guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md) |

### 2.2 Artefatos de governança e processo

| Conceito | Arquivo |
| :-- | :-- |
| Template de spec / SDD | [`docs/specs/PAGE_SPEC_TEMPLATE.md`](../../PAGE_SPEC_TEMPLATE.md) |
| DoR / DoD | [`docs/governance/dor-dod-eai.md`](../../../governance/dor-dod-eai.md) |
| ADRs (decisões de arquitetura) | [`docs/decisions/`](../../../decisions/) |
| Skills reutilizáveis | [`.agents/skills/`](../../../../.agents/skills/) |
| Estado cognitivo / progresso | [`.ai/state/PROGRESS.md`](../../../../.ai/state/PROGRESS.md) |
| Estilo e tom do site | [`docs/specs/STYLE_GUIDE.md`](../../STYLE_GUIDE.md) |
| Protocolo do agente / convenções | [`AGENTS.md`](../../../../AGENTS.md) |

### 2.3 Conceito → onde aparece + fonte (rápido)

| Conceito | Módulo | Fonte primária |
| :-- | :-: | :-- |
| Crash Silencioso / alucinação sintática | M0 | guia-agent-driven §1 |
| Matriz de Evidências | M0/M1 | propostav2 §3 |
| As-Is → To-Be / Inventário de Comportamentos | M1 | propostav2 §1, §4 |
| Descoberta por jornadas críticas | M1 | propostav2 §2 |
| Fail-closed / PR Review | M1/M2 | guia-eai §5, guia-agent-driven §2 |
| Determinístico-primeiro / resíduo interpretativo | M2 | guia-eai §2 |
| Cérebro × Vitrine / contratos rígidos | M2 | guia-eai §2 |
| Camadas epistêmicas / Open-World | M2 | guia-eai §3 |
| Ledgers / FinOps / ondas / cache | M2 | guia-eai §4 |
| MCP como fronteira | M2 | guia-agent-driven §2 |
| Orquestrador Cognitivo / Chef | M3 | devin.html |
| SDD / Spec→Retrieve→Refatorar→Validar | M3 | guia-agent-driven §2, devin.html |
| Skills / Playbooks / Knowledge | M3 | devin.html, `.agents/skills/` |

---

### Referências cruzadas

- Como os termos aparecem na narrativa → [02](02_jornada_de_aprendizagem.md)
- Componente da sidebar de glossário → [03](03_wireframes_e_catalogo_de_componentes.md) §3
