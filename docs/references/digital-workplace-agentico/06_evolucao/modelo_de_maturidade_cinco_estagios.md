---
titulo: Modelo de maturidade em cinco estágios — da intranet tradicional ao Agentic Workplace
modulo: Evolução
nivel: Avançado
ultima_atualizacao: 2026-10-03
tags: [maturidade, estagios, intranet, digital-workplace, exp, ai-enhanced, agentic-workplace, capacidades, governanca, organizacao]
---

# Modelo de maturidade em cinco estágios: da intranet tradicional ao Agentic Workplace

Este arquivo descreve um modelo conceitual de evolução em cinco estágios para portais corporativos. Para cada estágio, ele identifica capacidades necessárias, dependências, riscos e mudanças organizacionais, arquiteturais, de UX e de governança. Também traz critérios de avaliação para posicionar uma organização no modelo. O modelo é uma **[RECOMENDAÇÃO]** para discussão; o posicionamento de um portal específico é uma **[INFERÊNCIA]** limitada às evidências disponíveis.

## 1. Visão geral

| Estágio | Fórmula | Pergunta que o colaborador faz | Resposta da plataforma |
| --- | --- | --- | --- |
| 1. Intranet tradicional | Conteúdo + Links + Sistemas | "onde fica?" | "aqui está o link" |
| 2. Digital Workplace | Conteúdo + Serviços + Personalização | "como peço?" | "aqui está o serviço para você" |
| 3. EXP componível | APIs + Headless + Jornadas + Micro-frontends | "como resolvo de ponta a ponta?" | "siga esta jornada, sem trocar de sistema" |
| 4. AI-Enhanced Workplace | Search + RAG + Copilots + Automação | "qual é a regra?" | "esta é a resposta, com fonte" |
| 5. Agentic Workplace | Intent → Agent → Knowledge → Tools → Business Process → Dynamic Experience | "faça isso para mim" | "entendi, preparei, confirme, está em andamento" |

**Princípio:** cada estágio **acumula** os anteriores. Um Agentic Workplace sem as fundações dos estágios 2 a 4 é um chatbot com credenciais perigosas. **[INFERÊNCIA]**

## 2. Estágio 1 — Intranet tradicional

```text
Conteúdo + Links + Sistemas
```

| Dimensão | Descrição |
| --- | --- |
| Capacidades | CMS de intranet, diretório de links, notícias, busca simples |
| Dependências | CMS, hospedagem |
| Riscos | conteúdo desatualizado; colaborador como "integrador humano" |
| Organização | comunicação interna como dona do portal |
| Arquitetura | monólito de conteúdo; links e iframes para sistemas |
| UX | navegação por menus; cada sistema com sua experiência |
| Governança | editorial (aprovação de publicação) |

## 3. Estágio 2 — Digital Workplace

```text
Conteúdo + Serviços + Personalização
```

| Dimensão | Descrição |
| --- | --- |
| Capacidades | SSO, catálogo de serviços, audiências, autosserviço em alguns domínios, app mobile, abertura de chamados |
| Dependências | IdP federado; perfil do colaborador; integrações por domínio |
| Riscos | catálogo que é só uma lista de links; personalização superficial |
| Organização | produto digital do colaborador começa a existir; domínios fornecem serviços |
| Arquitetura | integrações ponto a ponto; plataforma SaaS de atendimento ou portal |
| UX | catálogo por categoria; algum pré-preenchimento |
| Governança | catálogo de serviços com dono; classificação de conteúdo |

**[INFERÊNCIA]** Para posicionar um portal específico, use os critérios da seção 8 e as evidências disponíveis. Sinais como app de autosserviço, ponto, abertura de casos e assistente virtual indicam **pelo menos** características deste estágio; só uma avaliação por critérios permite afirmar se o portal já atende aos estágios 3 ou 4. Ver `01_contexto/questoes_abertas_e_research_gaps.md`.

## 4. Estágio 3 — EXP componível

```text
APIs + Headless + Journeys + Micro-Frontends
```

| Dimensão | Descrição |
| --- | --- |
| Capacidades | APIs de domínio com contrato; conteúdo headless; jornadas cross-domain; design system multicanal; workflow para processos longos; notificações |
| Dependências | maturidade de API nos SoRs; gateway; design system; modelo de conteúdo |
| Riscos | microsserviços e micro-frontends sem necessidade; BFF virando monólito |
| Organização | domínios como donos de capacidades; time de plataforma; dono de jornada |
| Arquitetura | API gateway, BFF por canal, eventos onde há vários consumidores, workflow engine |
| UX | jornadas ponta a ponta; ação dentro da experiência; estado das solicitações visível |
| Governança | contratos versionados; SLOs por capacidade; metadados obrigatórios de conteúdo |

**Nota:** "micro-frontends" na fórmula indica **modularidade de experiência**, não obrigação de adotar micro-frontends em runtime. Ver `03_pilares/frontend_modular_microfrontends_ssr_cdn.md`.

## 5. Estágio 4 — AI-Enhanced Workplace

```text
Search + RAG + Copilots + Automation
```

| Dimensão | Descrição |
| --- | --- |
| Capacidades | busca híbrida com permissões; RAG com citações; copilots em tarefas específicas (resumir, redigir); workflows com etapas de LLM (triagem, extração) |
| Dependências | conteúdo governado (vigência, permissões, dono); índice com ACLs; conjunto de avaliação; política de IA |
| Riscos | RAG sobre conteúdo não governado; vazamento por oversharing; alucinação |
| Organização | donos de conteúdo com tempo de curadoria; comitê de IA; time de plataforma de IA |
| Arquitetura | pipeline de ingestão orientado a eventos; índice híbrido; gateway de modelos; observabilidade de LLM |
| UX | perguntas em linguagem natural com resposta citada; feedback estruturado |
| Governança | inventário de casos de uso de IA; classificação de dados por uso; avaliação contínua |

## 6. Estágio 5 — Agentic Workplace

```text
Intent
↓
Agent
↓
Knowledge
↓
Tools
↓
Business Process
↓
Dynamic Experience
```

| Dimensão | Descrição |
| --- | --- |
| Capacidades | agente com ferramentas de leitura e escrita; identidade delegada; HITL formal; UI generativa governada; protocolo de interação (ex.: AG-UI); registro de execução |
| Dependências | todos os estágios anteriores; IdP com token exchange; motor de políticas; Component Registry; workflow engine |
| Riscos | excesso de agência; agente-ESB; regras no prompt; incidentes silenciosos de qualidade; instabilidade de protocolos |
| Organização | fórum de ferramentas e permissões; donos de processo recebendo feedback do agente; SRE de qualidade |
| Arquitetura | runtime de agente; servidores de ferramentas por domínio; BFF do agente; AG-UI; catálogo de componentes; OpenTelemetry de ponta a ponta |
| UX | intenção como entrada preferencial; confirmação antes de efeito; transparência de execução; handoff com contexto; navegação como fallback |
| Governança | níveis de autonomia por classe de ação; auditoria de execuções; error budgets de qualidade; revisão humana de decisões |

## 7. Matriz comparativa por dimensão

| Dimensão | E1 | E2 | E3 | E4 | E5 |
| --- | --- | --- | --- | --- | --- |
| Unidade de valor | página | serviço | jornada | resposta | intenção resolvida |
| Integração | links | ponto a ponto | contratos | contratos + índice | contratos + ferramentas + delegação |
| Conteúdo | páginas | páginas + catálogo | headless | governado e indexado com ACL | governado, indexado e usado para ação |
| Identidade | login | SSO | SSO + perfil | SSO + permissões no índice | delegação sujeito + ator |
| Processo | fora do portal | formulários | workflows | workflows com etapas de LLM | agente como interface de processos |
| UX | menus | catálogo | jornadas | linguagem natural | intenção + UI adaptativa |
| Operação | disponibilidade | disponibilidade | SLOs por capacidade | + qualidade de respostas | + traces de agente, custo, error budget de qualidade |
| Governança | editorial | catálogo | contratos | IA e dados | autonomia e auditoria |

## 8. Como avaliar o estágio atual

**[RECOMENDAÇÃO]** Para cada estágio, a organização precisa atender a **todos** os critérios para ser considerada nele.

### Critérios do estágio 2

- [ ] SSO em todos os serviços do portal.
- [ ] Catálogo de serviços com dono por serviço.
- [ ] Ao menos três domínios com autosserviço transacional.

### Critérios do estágio 3

- [ ] As capacidades das jornadas prioritárias são acessíveis por API com contrato versionado.
- [ ] Conteúdo de experiência entregue por API a mais de um canal.
- [ ] Ao menos uma jornada cross-domain com dono e workflow.
- [ ] Design system usado por todos os times de experiência.

### Critérios do estágio 4

- [ ] Busca híbrida com permissões aplicadas no índice.
- [ ] Conteúdo normativo com vigência e dono em 100% do escopo indexado.
- [ ] Conjunto de avaliação com métricas de recuperação monitoradas.
- [ ] Política de IA e inventário de casos de uso.

### Critérios do estágio 5

- [ ] Token delegado (sujeito + ator) em todas as ferramentas.
- [ ] Autorização no ponto do dado para todas as ações.
- [ ] HITL formal para ações com efeito.
- [ ] UI generativa restrita a catálogo.
- [ ] Registro de execução auditável.
- [ ] SLOs de qualidade com error budget.

## 9. Pular estágios: custos

| Salto | O que acontece |
| --- | --- |
| E2 → E4 sem E3 | RAG funciona para perguntas, mas não há APIs para agir; o "agente" só responde |
| E2 → E5 sem E3 e E4 | agente com integrações improvisadas, credenciais amplas e conhecimento não governado; alto risco de incidente |
| E3 → E5 sem E4 | ações bem integradas, mas respostas de conhecimento não confiáveis e sem permissões indexadas |

**[INFERÊNCIA]** É possível avançar em paralelo em trilhas (por exemplo, iniciar a governança de conteúdo do E4 enquanto se constroem as APIs do E3), mas não é possível operar com segurança o E5 sem as capacidades dos estágios anteriores **no escopo das intenções habilitadas**.

## 10. Maturidade por escopo, não global

Uma organização pode estar no estágio 5 para "consultar saldo de férias" e no estágio 2 para "solicitar acesso". **[RECOMENDAÇÃO]** Avaliar a maturidade **por jornada ou domínio**, e habilitar capacidades agênticas apenas onde as fundações existem.

## Fontes

- Lacunas e questões em aberto: `01_contexto/questoes_abertas_e_research_gaps.md`
- Anthropic, Building effective agents: https://www.anthropic.com/engineering/building-effective-agents
- OWASP, LLM06:2025: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/
- RFC 8693: https://www.rfc-editor.org/rfc/rfc8693.html
- AG-UI: https://docs.ag-ui.com/llms.txt
