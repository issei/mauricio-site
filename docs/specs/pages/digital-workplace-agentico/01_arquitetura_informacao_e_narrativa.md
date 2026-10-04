# 01 — Arquitetura de informação e narrativa

## 1. Princípio de recorte

A fonte tem 23 arquivos (~37 mil palavras). A página não os transcreve: ela **recorta** um
argumento único (a tese do README) e oferece a profundidade em três camadas:

1. **Corpo**: prosa curta por seção (≤ 400 palavras), com o achado principal e o selo epistêmico.
2. **Aprofundamento recolhível** (`<details class="dw-mais">`): tabelas e listas completas da fonte.
3. **Markdown companheiro** (`public/digital-workplace-agentico.md`): versão integral para agentes
   e leitores que preferem texto.

Tudo é genérico: o sujeito é sempre "um portal corporativo de grande porte" (doc 06).

## 2. Mapa de seções (ordem de leitura)

| # | Âncora | Seção | Fonte (em `docs/references/digital-workplace-agentico/`) | Visualização |
| :-- | :-- | :-- | :-- | :-- |
| 0 | `#hero` | "Do portal que apresenta à plataforma que resolve" | síntese §3.1 abaixo + `06_evolucao/modelo_de_maturidade_cinco_estagios.md` §6 | **V1** Cadeia Intenção → Experiência |
| 1 | `#problema` | O problema: o colaborador como integrador humano | síntese §3.1 abaixo | — (três forças em cartões) |
| 2 | `#maturidade` | Cinco estágios, do link à intenção resolvida | `06_evolucao/modelo_de_maturidade_cinco_estagios.md` | **V2** Escada de maturidade + matriz por dimensão |
| 3 | `#arquitetura` | Arquitetura de referência em seis camadas + transversal | `04_transversais/arquitetura_de_referencia_integrada.md` | **V3** Diagrama de camadas |
| 4 | `#fluxo` | Um pedido do começo ao fim: agente, AG-UI, ferramentas, processo | `04_transversais/fluxo_agente_ag_ui_ferramentas_processos.md`, `03_pilares/ag_ui_protocolo_eventos_e_estado.md` | **V4** Sequência com famílias de eventos AG-UI |
| 5 | `#pilares` | Os oito pilares técnicos | os oito arquivos de `03_pilares/` | — (grade de cartões com `<details>`) |
| 6 | `#conhecimento` | Do repositório ao agente: a cadeia do conhecimento | `04_transversais/cadeia_do_conhecimento_ecm_ao_agente.md`, `03_pilares/enterprise_search_rag_e_knowledge_graphs.md` | **V5** Cadeia ECM → RAG com portões de prontidão |
| 7 | `#confianca` | Identidade, autonomia e governança | `04_transversais/seguranca_iam_identidade_do_agente.md`, `governanca_dados_lgpd_ai_governance.md`, `03_pilares/agentes_tool_calling_mcp_a2a.md` §10 | **V6** Escada de autonomia 0–4 |
| 8 | `#processos` | O agente dentro do processo, e as exceções humanas | `04_transversais/processos_corporativos_e_agentes.md`, `ux_experiencia_orientada_a_intencao.md` | — |
| 9 | `#papeis` | Doze lentes, um conselho de arquitetura | síntese §3.2 abaixo | — (tabela de papéis) |
| 10 | `#decisoes` | Trade-offs, anti-patterns e matriz tecnológica | `05_decisao/tradeoffs_e_paradoxos_arquiteturais.md`, `anti_patterns.md`, `matriz_tecnologica.md` | — (pares em cartões; tabelas recolhíveis) |
| 11 | `#operacao` | Operar um agente: traces, SLOs de qualidade, custo | `04_transversais/operacao_observabilidade_sre_dex.md` | — |
| 12 | `#roadmap` | Fases 0–5 e sete trilhas paralelas | `06_evolucao/roadmap_e_dependencias.md` | **V7** Grade fases × trilhas + caminho crítico |
| 13 | `#prontidao` | Índice de prontidão agêntica por jornada | `06_evolucao/roteiro_de_estudo_e_metricas.md` §4.2 | **V8** Calculadora 0–20 (interativa) |
| 14 | `#perguntas` | Trinta perguntas críticas | `05_decisao/perguntas_criticas_01_a_15.md`, `perguntas_criticas_16_a_30.md` | — (30 `<details>` em 5 grupos) |
| 15 | `#estudar` | Trilhas de estudo por perfil | `06_evolucao/roteiro_de_estudo_e_metricas.md` §1–3 | — |
| 16 | `#aeo` | Em síntese + Perguntas frequentes | gerado por `build-aeo.mjs` | — |
| 17 | rodapé | Fontes primárias e procedência | seções "Fontes" dos arquivos (só fontes genéricas: specs, RFCs, leis, docs oficiais) | — |

Regra de fonte: na seção de fontes da página **só entram** especificações, RFCs, legislação,
documentação oficial de protocolos e artigos técnicos/acadêmicos. Nenhuma página institucional,
estudo de caso de fornecedor ou política de privacidade de organização (doc 06 §2).

## 3. Síntese para as seções sem arquivo na cópia neutra

As pastas `01_contexto` e `02_analise_multidisciplinar` não estão na cópia (README da referência,
"Lacunas"). O texto das seções `#problema` e `#papeis` sai daqui.

### 3.1 `#problema` — o colaborador como integrador humano

- **Tese do problema [INFERÊNCIA]:** em um portal corporativo de grande porte, o colaborador lida
  com dezenas de sistemas (RH, ponto, benefícios, acessos, chamados, aprendizagem). O portal
  tradicional organiza **links** para esses sistemas; quem integra é a pessoa, que precisa saber
  onde fica cada coisa, qual a regra vigente e em que estado está o próprio pedido.
- **Três forças** (cartões):
  1. *O trabalho é digital e fragmentado* — cada domínio tem sua experiência, sua linguagem e sua fila.
  2. *A expectativa mudou* — perguntar em linguagem natural e receber uma resposta com fonte virou
     o padrão de referência do colaborador.
  3. *Agentes ficaram tecnicamente viáveis* — protocolos abertos (MCP, A2A, AG-UI) e modelos com
     tool calling tornam possível agir, não só responder. **[FATO]** para a existência dos protocolos;
     **[INFERÊNCIA]** para a viabilidade em escala corporativa.
- **Pergunta que organiza a página:** o que precisa existir para que "faça isso para mim" seja
  seguro, auditável e útil, e em que ordem construir?
- **O que o estudo não é:** não é descrição de um portal específico, não é recomendação de
  fornecedor e não propõe uma arquitetura ideal única.

### 3.2 `#papeis` — doze lentes

Tabela `Papel | Pergunta que só ele faz | O que ele bloqueia se ignorado`:

| Papel | Pergunta | Se ignorado |
| :-- | :-- | :-- |
| Enterprise Architect | Quais capacidades de negócio a plataforma expõe e quem é dono de cada uma? | agente vira integrador improvisado |
| Integration Architect | API, evento ou workflow para cada interação? | acoplamento e estados inconsistentes |
| Product Strategist | Quais intenções valem mais e como medimos resolução? | tecnologia procurando problema |
| Process / BPM | A regra está explícita, com dono e fila de exceção? | automação de inconsistência |
| UX Architect | Como o colaborador confia, confirma e retoma? | ações sem consentimento claro |
| Front-end Architect | Como compor UI dinâmica sem quebrar o design system? | UI arbitrária, inacessível |
| AI Architect | Que agente, com que ferramentas e que avaliação? | alucinação e excesso de agência |
| Content Strategist | Qual é a fonte canônica, a vigência e o dono? | RAG sobre conteúdo podre |
| Search Architect | A busca respeita permissões no índice? | vazamento por oversharing |
| Security / IAM | Com que identidade o agente age e com que escopo? | conta de serviço genérica |
| Data & AI Governance | Base legal, retenção, inventário de casos de uso? | não conformidade com a LGPD |
| SRE / Platform | Como medimos qualidade, custo e latência por intenção? | incidentes silenciosos de qualidade |

**[RECOMENDAÇÃO]** O conselho de arquitetura (ARB) analisa cada jornada por todas as lentes
separadamente antes de consolidar; conflitos são resolvidos com os padrões de `#decisoes`.

## 4. Jornadas de leitura (três velocidades)

1. **2 minutos** — Hero → V1 → V2 → "Em síntese". Sai com o modelo de cinco estágios e a tese.
2. **12 minutos** — acrescenta `#arquitetura`, `#fluxo`, `#confianca` e `#roadmap`.
3. **~45 minutos** — página inteira, com os aprofundamentos recolhíveis e as 30 perguntas.

Navegação de topo (`.dw-nav`) com seis marcos: *Maturidade · Arquitetura · Fluxo · Confiança ·
Roadmap · Perguntas*. Índice completo recolhível logo após o hero.

## 5. Entradas por dor (padrão da casa)

| Pergunta do leitor | Destino |
| :-- | :-- |
| "Querem um agente na frente de tudo. Por onde começo?" | `#roadmap` |
| "Nosso RAG responde errado ou mostra o que não devia." | `#conhecimento` |
| "Com que identidade o agente vai agir?" | `#confianca` |
| "Em que estágio está o nosso portal?" | `#prontidao` |

## 6. Selos epistêmicos

Componente `.dw-selo`, obrigatório em todo bloco que afirma algo derivado da fonte:

| Selo | Rótulo na fonte | Cor semântica (doc 03) |
| :-- | :-- | :-- |
| `FATO` | `[FATO]` | `--dw-fato` |
| `INFERÊNCIA` | `[INFERÊNCIA]` | `--dw-inferencia` |
| `HIPÓTESE` | `[HIPÓTESE]` | `--dw-hipotese` |
| `RECOMENDAÇÃO` | `[RECOMENDAÇÃO]` | `--dw-recomendacao` |

O selo é texto (cor nunca é o único portador). Um bloco com mais de um rótulo usa o mais fraco.

## 7. Crosslinks internos

| De | Para | Racional |
| :-- | :-- | :-- |
| `#confianca` | `/engenharia-confianca` | autonomia proporcional à evidência é o mesmo princípio |
| `#fluxo` | `/engenharia-agentes-ia` | ciclo do agente, fail-closed, HITL |
| `#conhecimento` | `/knowledge-os-presentation` | conhecimento como infraestrutura governada |
| `#operacao` | `/service-operations-2-0` | SRE e operação de serviço |
| `#prontidao` | `/agent-ready` | prontidão para agentes, na escala do site |

Os textos âncora e os cartões de origem não mencionam organizações reais.
