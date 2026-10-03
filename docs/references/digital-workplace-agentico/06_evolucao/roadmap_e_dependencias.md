---
titulo: Roadmap de evolução para Digital Workplace agêntico — sequência lógica, trilhas paralelas, dependências e critérios de passagem
modulo: Evolução
nivel: Avançado
ultima_atualizacao: 2026-10-03
tags: [roadmap, dependencias, fases, trilhas, piloto, criterios-de-passagem, governanca, identidade, conteudo, apis, agentes]
---

# Roadmap de evolução: sequência lógica, trilhas paralelas e dependências

Este arquivo propõe uma sequência lógica para evoluir um portal corporativo em direção a um Digital Workplace orientado a intenção e agentes. Ele organiza o trabalho em **fases** com **critérios de passagem** e em **trilhas paralelas** que avançam em ritmos diferentes, explicitando as dependências entre elas. Não há prazos: a duração depende do estado atual, que só a descoberta revela (ver `01_contexto/questoes_abertas_e_research_gaps.md`). Todo o roadmap é **[RECOMENDAÇÃO]** e não descreve planos de nenhuma organização específica.

## 1. Princípios do roadmap

1. **Problema antes de tecnologia:** cada fase começa por intenções priorizadas com dados.
2. **Fundações antes de autonomia:** identidade, contratos e conteúdo governado antecedem ações do agente.
3. **Escopo vertical:** avançar jornada por jornada, e não camada por camada em toda a empresa.
4. **Valor visível cedo:** cada fase entrega algo que o colaborador percebe.
5. **Reversibilidade:** kill switches, coexistência com a navegação e protocolos encapsulados.
6. **Evidência para ampliar autonomia:** um nível de autonomia só sobe com métricas de segurança e qualidade.

## 2. Trilhas paralelas

| Trilha | Objetivo | Dono principal |
| --- | --- | --- |
| **T1. Produto e jornadas** | priorizar intenções e medir resolução | Product Strategist |
| **T2. Identidade e autorização** | delegação, políticas, auditoria | Security/IAM |
| **T3. Conteúdo e conhecimento** | fonte canônica, metadados, permissões, índice | Content/Search |
| **T4. Capacidades e integração** | APIs, BFF, workflows, eventos | Enterprise/Integration |
| **T5. Experiência** | design system, catálogo de componentes, protocolo de interação | UX/Front-end |
| **T6. IA e agentes** | RAG, avaliação, agente, ferramentas | AI Architect |
| **T7. Governança e operação** | política de IA, LGPD, observabilidade, SLOs | Governance + SRE |

## 3. Fases

### Fase 0 — Descoberta e linha de base

**Objetivo:** substituir suposições por dados.

| Trilha | Entregas |
| --- | --- |
| T1 | ranking das 50 intenções principais; linha de base de resolução, tempo e esforço; escolha de 2 ou 3 jornadas piloto |
| T2 | inventário de IdP e protocolos; viabilidade de token exchange; modelo de autorização atual |
| T3 | inventário de conteúdo das jornadas piloto; diagnóstico de metadados e permissões |
| T4 | inventário de SoRs das jornadas piloto e maturidade de API |
| T5 | avaliação do design system e da plataforma de experiência |
| T6 | análise do assistente existente (catálogo, tecnologia, handoff) |
| T7 | política de IA vigente; classificação de dados; stack de observabilidade |

**Critério de passagem:** jornadas piloto escolhidas com base em volume, valor e viabilidade; lacunas P1 conhecidas.

### Fase 1 — Fundações mínimas para as jornadas piloto

**Objetivo:** preparar o terreno sem ainda expor IA ao colaborador, ou expondo apenas busca melhorada.

| Trilha | Entregas |
| --- | --- |
| T2 | padrão de token delegado definido; motor de políticas para as APIs piloto; registro de execução especificado |
| T3 | conteúdo das jornadas piloto com fonte canônica, vigência, dono e permissões; eventos de ciclo de vida |
| T4 | APIs com contrato para as capacidades piloto; BFF do canal agente; workflow para processos longos |
| T5 | catálogo inicial de componentes de agente (confirmação, progresso, fontes, handoff) |
| T6 | conjunto de avaliação das jornadas piloto |
| T7 | caso de uso registrado no inventário de IA; observabilidade com OpenTelemetry nas APIs piloto |

**Critério de passagem:** checklist de prontidão para RAG atendido no escopo piloto (ver `04_transversais/cadeia_do_conhecimento_ecm_ao_agente.md`); APIs piloto com SLO.

### Fase 2 — AI-Enhanced no escopo piloto (estágio 4)

**Objetivo:** respostas confiáveis com fonte, sem ações.

| Trilha | Entregas |
| --- | --- |
| T3 | busca híbrida com ACLs no índice; testes contínuos de vazamento |
| T6 | RAG com citações; avaliação de groundedness |
| T5 | experiência de pergunta e resposta com fontes, feedback e navegação preservada |
| T7 | SLOs de qualidade; painel por intenção; revisão amostral |
| T1 | medição de resolução e recontato versus linha de base |

**Critério de passagem:** groundedness e recuperação acima dos limiares; zero vazamentos nos testes; melhoria medida em resolução.

### Fase 3 — Agente com ferramentas de leitura

**Objetivo:** responder com dados pessoais do colaborador, sem efeitos colaterais.

| Trilha | Entregas |
| --- | --- |
| T6 | agente com ferramentas de leitura (saldo, estado de solicitações); limites de passos e custo |
| T2 | token delegado em produção; auditoria de leituras |
| T5 | protocolo de interação (ex.: AG-UI encapsulado); componentes de dados (cartões, tabelas) |
| T7 | traces de agente correlacionados; alertas de custo |

**Critério de passagem:** taxa de erro de ferramentas e latência dentro do SLO; auditoria validada por Segurança e Compliance.

### Fase 4 — Ações com confirmação (estágio 5 inicial)

**Objetivo:** executar ações com efeito, sempre com confirmação explícita.

| Trilha | Entregas |
| --- | --- |
| T6 | ferramentas de escrita idempotentes para as jornadas piloto |
| T5 | UI generativa restrita a catálogo; componente de confirmação fixo; interrupções formais |
| T4 | início de workflows por ferramenta; estados intermediários honestos; notificações por evento |
| T2 | elevação incremental de escopo; reautenticação para ações sensíveis |
| T7 | revisão de auditoria por amostragem; kill switches testados; runbook de incidentes de agente |
| T1 | métrica de taxa de edição nas confirmações; satisfação |

**Critério de passagem:** taxa de erros de ação aceitável por um período definido; nenhuma ação sem confirmação registrada; exceções humanas funcionando com contexto.

### Fase 5 — Expansão por jornada e autonomia por evidência

**Objetivo:** escalar com segurança.

- Repetir as fases 1 a 4 para novas jornadas, reutilizando a plataforma.
- Avaliar, por classe de ação, a passagem de "executar com confirmação" para "executar e notificar", com base em evidência.
- Avaliar agentes de domínio ou de fornecedores (A2A) onde houver fronteira real.
- Evoluir o catálogo de componentes guiado por intenções não atendidas.
- Considerar canais adicionais (ferramentas de colaboração) com o mesmo agente e estado.

## 4. Mapa de dependências

```text
Fase 0 (descoberta)
   │
   ├──► T2 identidade delegada ─────────────────────────────┐
   ├──► T3 conteúdo governado ──► índice com ACL ──► RAG ───┤
   ├──► T4 APIs + BFF ──► ferramentas de leitura ───────────┼──► Agente (leitura)
   │          └──► workflows ──► ferramentas de escrita ────┤
   ├──► T5 catálogo de componentes ──► UI generativa ───────┼──► Ações com confirmação
   └──► T7 política de IA + observabilidade ──► SLOs ───────┘
```

**Caminho crítico [INFERÊNCIA]:** identidade delegada (T2) e conteúdo governado com permissões (T3) costumam ser as dependências mais lentas, porque envolvem fornecedores de IdP, legados e donos de conteúdo de várias áreas. Começá-las na Fase 0 evita que bloqueiem as fases 3 e 4.

## 5. Critérios de escolha da jornada piloto

| Critério | Peso sugerido | Por quê |
| --- | --- | --- |
| Volume de intenções | alto | valor perceptível |
| Baixo risco da ação | alto | segurança no aprendizado |
| APIs disponíveis | alto | viabilidade |
| Conteúdo governável | médio | qualidade das respostas |
| Dono de processo engajado | alto | recebe feedback e resolve exceções |
| Baixa sensibilidade de dados | médio | reduz a carga de compliance inicial |

**Exemplo [HIPÓTESE]:** "férias" (alto volume, regra clara, risco moderado) e "chamado de TI" (alto volume, baixo risco) tendem a ser melhores pilotos do que "inclusão de dependente" (dados sensíveis) ou "solicitação de acesso" (risco de segurança).

## 6. Riscos do roadmap e mitigações

| Risco | Mitigação |
| --- | --- |
| Fundações "invisíveis" perdem patrocínio | entregar busca melhorada (Fase 2) cedo como valor visível |
| Pressão por pular para ações | critérios de passagem explícitos e acordados com patrocinadores |
| Mudança de especificação de protocolos | adaptadores internos; testes de contrato |
| Fornecedor de plataforma lança agente próprio no meio do caminho | decisão explícita sobre agente da plataforma × independente, revisitada a cada fase |
| Dependência de time central | caminhos pavimentados e propriedade distribuída de ferramentas |

## 7. Métricas por fase

| Fase | Métricas principais |
| --- | --- |
| 0 | cobertura do inventário; linha de base definida |
| 1 | % de conteúdo piloto com metadados obrigatórios; APIs com SLO |
| 2 | recall@k, groundedness, vazamentos (zero), resolução |
| 3 | latência por turno, erro de ferramentas, custo por conversa |
| 4 | erros de ação, taxa de edição, exceções resolvidas no SLA, satisfação |
| 5 | cobertura de intenções, resolução global, custo por intenção resolvida |

Detalhamento de métricas de maturidade em `06_evolucao/roteiro_de_estudo_e_metricas.md`.

## Fontes

- Este roadmap é uma **[RECOMENDAÇÃO]** derivada do modelo de maturidade (`06_evolucao/modelo_de_maturidade_cinco_estagios.md`) e das análises dos pilares.
- Anthropic, Building effective agents (começar pela solução mais simples): https://www.anthropic.com/engineering/building-effective-agents
- OWASP, LLM06:2025 (autonomia proporcional ao risco): https://genai.owasp.org/llmrisk/llm062025-excessive-agency/
- MCP changelog 2026-07-28 (instabilidade de protocolos): https://modelcontextprotocol.io/specification/2026-07-28/changelog
