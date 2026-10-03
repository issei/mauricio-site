---
titulo: Arquitetura operacional de plataformas agênticas — observabilidade, traces de agente, SLOs de qualidade, custo, incidentes e DEX
modulo: Transversal — Operational Architecture
nivel: Especialista
ultima_atualizacao: 2026-10-03
tags: [sre, observabilidade, opentelemetry, traces, agent-traces, slo, error-budget, custo, tokens, latencia, retrieval-quality, incidentes, dex]
---

# Arquitetura operacional de plataformas agênticas: observabilidade, SLOs de qualidade, custo e incidentes

Este arquivo responde como operar, medir e diagnosticar uma plataforma em que parte do comportamento é dinâmico e conduzido por agentes. Ele propõe uma observabilidade em três planos (serviços, agente, qualidade), SLOs que incluem qualidade e custo, práticas de gestão de incidentes adaptadas a falhas probabilísticas e a integração com DEX. Não se assume nenhuma stack de operação específica; as propostas são **[RECOMENDAÇÃO]**.

## 1. Que problema existe

Na operação tradicional, um sistema "saudável" é um sistema disponível e rápido. Em uma plataforma agêntica, o sistema pode estar disponível, rápido e **errado**: respondendo com uma política revogada, escolhendo a ferramenta errada, entrando em loops que multiplicam custo, ou degradando lentamente depois de uma troca de modelo. Esses são **incidentes silenciosos**, invisíveis para dashboards de infraestrutura.

## 2. Três planos de observabilidade

| Plano | Pergunta | Sinais | Dono principal |
| --- | --- | --- | --- |
| **Serviços** | está de pé e rápido? | métricas RED/USE, logs, traces distribuídos | SRE e times de serviço |
| **Agente** | o que o agente fez e por quê? | spans de execução, passos, tool calls, tokens, latência do modelo, decisões de política | plataforma de IA |
| **Qualidade e experiência** | o resultado foi bom? | avaliações, groundedness, feedback, resolução por intenção, DEX | produto, conteúdo, IA |

## 3. Traces de agente

### Estrutura de um trace

```text
[trace] tarefa: inclusão de dependente (sujeito: colab 123, ator: agente v3)
 ├─ [span] ag-ui.run  (RUN_STARTED → RUN_FINISHED: interrupção)
 │   ├─ [span] llm.call  modelo=X  tokens_in=3.120 tokens_out=210  latência=1,1s
 │   ├─ [span] retrieval  índice=normativos  k=5  filtros=[vínculo, permissão]  latência=180ms
 │   ├─ [span] tool.consultar_elegibilidade  → bff → api-beneficios → SoR  latência=420ms
 │   ├─ [span] policy.decision  ação=read  resultado=permit
 │   └─ [span] ui.render  componente=dependent_form v2.3.0  props_validas=true
 └─ [span] ag-ui.run (resume: confirmado)
     ├─ [span] tool.iniciar_inclusao  idempotency_key=…  → workflow.start
     └─ [span] llm.call  …
```

### Padrões disponíveis

- O OpenTelemetry mantém convenções semânticas de GenAI (spans, spans de agente, métricas e eventos, inclusive para MCP) em repositório dedicado, ainda em evolução. **[FATO]** ([OTel GenAI semconv](https://github.com/open-telemetry/semantic-conventions-genai))
- A revisão 2026-07-28 do MCP documenta a propagação de contexto de trace (`traceparent`, `tracestate`, `baggage`) em `_meta`, o que permite correlacionar a chamada do agente com o servidor de ferramentas. **[FATO]** ([MCP changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog))
- Os eventos `RUN_*` e `STEP_*` do AG-UI delimitam execuções e etapas, e servem de âncora para spans do lado da experiência. **[FATO]** sobre os eventos ([AG-UI Events](https://docs.ag-ui.com/spec/1.0/events/index.md)); **[INFERÊNCIA]** sobre o uso para traces.

### Cuidados

- **Dados pessoais em traces:** prompts e respostas completos não vão para a ferramenta de observabilidade geral; vão para um armazenamento com acesso restrito e retenção curta, ou são mascarados.
- **Cardinalidade:** IDs de usuário e de conversa como atributos de span, e não como labels de métricas.

## 4. Métricas específicas

| Categoria | Métrica | Por que importa |
| --- | --- | --- |
| Latência | tempo até o primeiro token; turno completo; latência por ferramenta; latência do modelo | percepção do usuário e diagnóstico de gargalo |
| Custo | tokens por turno, por conversa e por intenção resolvida; custo por modelo | orçamento e detecção de loops |
| Ferramentas | taxa de erro, timeouts, retries, circuitos abertos por ferramenta | saúde das dependências |
| Agente | passos por tarefa, taxa de replanejamento, tarefas que atingem limite de passos | eficiência e loops |
| Retrieval | resultados vazios, score médio, distribuição de fontes, idade do conteúdo citado | qualidade do conhecimento |
| Segurança | negações de política, detecções de injeção, interrupções abandonadas | postura de risco |
| Qualidade | groundedness amostral, correção avaliada, feedback negativo por motivo | qualidade percebida |
| Experiência | resolução por intenção, escalonamento, recontato, abandono | valor entregue |

## 5. SLOs e error budgets

A prática de SLO do Google SRE define objetivos sobre indicadores que importam para o usuário e usa o orçamento de erro para equilibrar confiabilidade e mudança. **[FATO]** ([Google SRE Book](https://sre.google/sre-book/service-level-objectives/))

**[RECOMENDAÇÃO]** SLOs para uma plataforma agêntica, em três famílias:

| Família | SLI | Exemplo de objetivo |
| --- | --- | --- |
| Disponibilidade | execuções sem `RUN_ERROR` por falha de plataforma | ≥ 99,5% |
| Latência | tempo até o primeiro token | p95 < 1,5 s |
| Latência | turno com até 2 ferramentas | p95 < 8 s |
| Qualidade | respostas de conhecimento sustentadas pelas fontes (amostral) | ≥ 95% |
| Qualidade | taxa de vazamento de permissão nos testes contínuos | 0 |
| Valor | resolução sem humano nas intenções habilitadas | ≥ linha de base por intenção |
| Custo | custo por intenção resolvida | ≤ orçamento por intenção |

### Error budget de qualidade

Quando o orçamento de qualidade estoura (por exemplo, groundedness abaixo do objetivo por duas semanas), mudanças de prompt, modelo e catálogo de ferramentas são congeladas até a correção. Isso traz para a qualidade a mesma disciplina que já existe para disponibilidade.

## 6. Disponibilidade e dependências

**[INFERÊNCIA]** Um agente que encadeia ferramentas herda a disponibilidade **combinada** das dependências. Se uma resposta depende de três SoRs com 99,5% cada, a disponibilidade composta fica perto de 98,5%. Implicações:

- **Degradação graciosa** por ferramenta (resposta parcial com explicação, link direto, abertura de chamado).
- **Projeções de leitura** e caches para consultas frequentes, reduzindo dependência de SoRs em tempo real.
- **Fallback de modelo:** rota alternativa se o provedor principal estiver degradado, com avaliação prévia do modelo alternativo.
- **Navegação tradicional como fallback final:** se a camada agêntica cair, o portal continua funcionando.

## 7. Gestão de incidentes

### Tipos de incidente em plataformas agênticas

| Tipo | Exemplo | Detecção |
| --- | --- | --- |
| Disponibilidade | provedor de modelo fora | métricas de erro |
| Latência | SoR lento derruba os turnos | latência por ferramenta |
| Qualidade | reindexação quebrou chunking; respostas sem fonte | avaliação contínua, feedback |
| Segurança | vazamento de conteúdo restrito | testes contínuos de permissão, relatos |
| Custo | loop de ferramentas multiplica tokens | alertas de custo por conversa |
| Comportamento | o agente passou a executar ação sem confirmação após mudança de prompt | testes de regressão, auditoria |

### Runbook específico

**[RECOMENDAÇÃO]**

1. **Kill switches** por ferramenta, por intenção e para o agente inteiro.
2. **Rollback de configuração:** instruções, catálogo de ferramentas e versão do modelo são versionados e revertíveis.
3. **Reprodução:** o registro de execução permite reexecutar o caso com o mesmo contexto em ambiente de teste.
4. **Comunicação:** se houve resposta errada sobre uma política, avaliar a necessidade de notificar os afetados.
5. **Pós-incidente:** classificar a causa por camada (conteúdo, busca, modelo, ferramenta, processo, política), usando a matriz de responsabilidades.

## 8. Avaliação contínua em produção

| Técnica | Uso |
| --- | --- |
| Amostragem com avaliação humana | qualidade de respostas por intenção |
| Avaliador automático com calibração humana | escala, com verificação periódica de concordância |
| Testes sintéticos periódicos | perguntas de referência executadas a cada hora |
| Testes de permissão contínuos | identidades de baixo privilégio tentando acessar conteúdo restrito |
| Análise de feedback | motivos de insatisfação por intenção |
| Canary e A/B de configuração | novas instruções ou modelos para uma fração do tráfego |

## 9. DEX e operação

As ferramentas de DEX combinam telemetria, sentimento e analytics da experiência digital. **[FATO]** ([Computerworld](https://www.computerworld.com/article/1612536/digital-employee-experience-dex-employee-retention-tool.html)) **[RECOMENDAÇÃO]** Integrar:

- a telemetria de dispositivo e rede (DEX) com a latência percebida do agente (um "agente lento" pode ser uma rede de agência ruim);
- o sentimento pós-interação com as métricas de resolução por intenção;
- um painel único por intenção: volume, resolução, esforço, latência, custo, qualidade.

## 10. Plataforma interna (platform engineering)

Para que vários domínios publiquem ferramentas e intenções sem reinventar a operação:

- **Caminhos pavimentados:** template de servidor de ferramentas com autenticação delegada, idempotência, telemetria e testes já incluídos.
- **Catálogo** de ferramentas e componentes com dono, versão, classificação e SLO.
- **Ambientes de avaliação** com SoRs simulados.
- **Orçamentos por domínio** de custo de modelo.

## 11. Dependências, riscos e maturidade

- **Dependências:** padrão de observabilidade comum (preferencialmente OpenTelemetry); registro de execução; conjuntos de avaliação; versionamento de configuração.
- **Riscos:** observabilidade que coleta dados pessoais demais; avaliações automáticas sem calibração; ausência de dono para incidentes de qualidade.
- **Maturidade:** SRE e observabilidade distribuída são **maduros**; observabilidade e avaliação de agentes estão **em consolidação**, com convenções do OpenTelemetry ainda evoluindo. **[INFERÊNCIA]**

## Fontes

- OpenTelemetry GenAI semantic conventions: https://github.com/open-telemetry/semantic-conventions-genai
- MCP changelog 2026-07-28: https://modelcontextprotocol.io/specification/2026-07-28/changelog
- AG-UI, Event Streams: https://docs.ag-ui.com/spec/1.0/events/index.md
- Google SRE Book, Service Level Objectives: https://sre.google/sre-book/service-level-objectives/
- Computerworld, DEX: https://www.computerworld.com/article/1612536/digital-employee-experience-dex-employee-retention-tool.html
