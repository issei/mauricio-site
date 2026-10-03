---
titulo: Anti-patterns da evolução para Digital Workplace agêntico — por que são problemáticos e quais alternativas considerar
modulo: Decisão
nivel: Avançado
ultima_atualizacao: 2026-10-03
tags: [anti-patterns, riscos, agente-esb, rag, vector-database, generative-ui, micro-frontends, microsservicos, eventos, multi-agent, mcp, processos]
---

# Anti-patterns da evolução para Digital Workplace agêntico

Este arquivo cataloga os anti-patterns mais prováveis na evolução de um portal corporativo para uma plataforma orientada a agentes. Para cada um, explica **como ele aparece**, **por que é problemático**, **como detectá-lo** e **qual alternativa considerar**. Os anti-patterns não são atribuídos a nenhuma organização específica; são riscos genéricos de qualquer organização nessa trajetória.

## Visão geral

| # | Anti-pattern | Camada | Gravidade |
| --- | --- | --- | --- |
| 1 | Agente como novo ESB | Integração / Agente | Alta |
| 2 | Lógica de negócio dentro do LLM | Agente / Processo | Alta |
| 3 | Acesso irrestrito do agente às APIs | Segurança | Crítica |
| 4 | RAG como substituto de governança da informação | Conhecimento | Alta |
| 5 | Vector database sem estratégia de metadados | Conhecimento | Alta |
| 6 | Gerar UI arbitrária | Experiência | Alta |
| 7 | Micro-frontends sem necessidade organizacional | Experiência | Média |
| 8 | Transformar tudo em microsserviços | Integração | Média |
| 9 | Eventos onde uma API simples bastaria | Integração | Média |
| 10 | Multi-agente sem necessidade | Agente | Média |
| 11 | Confundir chatbot com agente | Agente / Produto | Média |
| 12 | Confundir busca vetorial com conhecimento | Conhecimento | Alta |
| 13 | MCP como solução universal de integração | Integração | Média |
| 14 | IA para compensar processos mal definidos | Processo | Alta |
| 15 | Token passthrough e conta de serviço genérica | Segurança | Crítica |
| 16 | Remover a navegação antes de provar o agente | Experiência | Média |
| 17 | Medir sucesso por volume de conversas | Produto | Média |

---

## 1. Agente como novo ESB

**Como aparece:** um "agente corporativo" central com dezenas de ferramentas que transformam dados, decidem roteamentos e coordenam sistemas. Um único time é dono de tudo.

**Por que é problemático:** reproduz os problemas clássicos do barramento central (gargalo organizacional, acoplamento, regras escondidas) e acrescenta comportamento probabilístico. Mudanças em um SoR quebram fluxos que ninguém documentou.

**Como detectar:** ferramentas que chamam vários sistemas e decidem algo; backlog de integrações concentrado no time do agente; regras em prompts.

**Alternativa:** o agente é um canal; ferramentas são adaptadores finos mantidos pelos domínios; agregação no BFF; processos no workflow engine. Ver `03_pilares/camada_de_integracao_bff_eventos_workflows.md`.

## 2. Lógica de negócio dentro do LLM

**Como aparece:** o prompt contém "colaboradores CLT com mais de 12 meses têm direito a…"; o agente decide elegibilidade por raciocínio.

**Por que é problemático:** inconsistência entre execuções; duplicação de regras que divergem do sistema; impossibilidade de explicar de forma auditável; risco sob o art. 20 da LGPD. **[INFERÊNCIA]**

**Como detectar:** números, prazos e condições de elegibilidade em instruções de sistema.

**Alternativa:** regras em serviços de domínio ou motores de regras, consultados por ferramenta. O agente explica a regra a partir da resposta da API e do documento, mas não a avalia.

## 3. Acesso irrestrito do agente às APIs

**Como aparece:** o agente recebe uma credencial com acesso amplo "para não travar o piloto".

**Por que é problemático:** a OWASP classifica funcionalidade, permissão e autonomia excessivas como causas de **Excessive Agency** (LLM06:2025). Uma injeção de prompt indireta passa a ter o poder da credencial. **[FATO]** ([OWASP](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/))

**Como detectar:** escopos curinga; ferramentas genéricas (`executar_consulta`, `chamar_api`); a mesma credencial para todos os usuários.

**Alternativa:** catálogo mínimo de ferramentas estreitas; token delegado por usuário com escopo mínimo; autorização no ponto do dado; elevação incremental.

## 4. RAG como substituto de governança da informação

**Como aparece:** "não precisamos organizar os normativos; a IA encontra".

**Por que é problemático:** o RAG recupera o mais similar, não o vigente nem o aplicável. Sem vigência, permissão e dono, a resposta é fluente e errada, e não há a quem pedir correção.

**Como detectar:** índice alimentado por "todos os PDFs"; ausência de metadados de vigência; nenhum dono de conteúdo envolvido no projeto.

**Alternativa:** governar na origem (fonte canônica, metadados, permissões, ciclo de vida); RAG como reflexo dessa governança. Ver `04_transversais/cadeia_do_conhecimento_ecm_ao_agente.md`.

## 5. Vector database sem estratégia de metadados

**Como aparece:** chunks e embeddings sem permissão, vigência, aplicabilidade ou origem.

**Por que é problemático:** impossível filtrar por público ou permissão no índice; filtros acabam sendo aplicados depois da recuperação ou, pior, delegados ao modelo.

**Como detectar:** o schema do índice tem só `id`, `texto` e `vetor`.

**Alternativa:** índice híbrido com metadados e ACLs de primeira classe; pré-filtro por identidade; testes contínuos de vazamento.

## 6. Gerar UI arbitrária

**Como aparece:** o modelo gera HTML, CSS ou JavaScript renderizados diretamente.

**Por que é problemático:** superfície de injeção; acessibilidade imprevisível; inconsistência visual; impossibilidade de testar e certificar.

**Como detectar:** `innerHTML` ou equivalentes com conteúdo do modelo; ausência de catálogo de componentes.

**Alternativa:** composição declarativa sobre um catálogo de componentes aprovados (A2UI, schema próprio) ou UI isolada em sandbox (MCP Apps), com validação de props. Ver `03_pilares/generative_ui_design_system_e_component_registry.md`.

## 7. Micro-frontends sem necessidade organizacional

**Como aparece:** micro-frontends adotados porque "é arquitetura moderna", com um ou dois times.

**Por que é problemático:** custos de dependências compartilhadas, testes de integração, desempenho e consistência sem o benefício de deploys independentes de vários times. **[INFERÊNCIA]**

**Alternativa:** monólito modular com fronteiras claras; micro-frontends quando houver vários times e gargalo de release medido.

## 8. Transformar tudo em microsserviços

**Como aparece:** reescrever SoRs estáveis em serviços menores como pré-requisito para IA.

**Por que é problemático:** anos de projeto sem valor; complexidade distribuída; o agente precisa de **contratos**, não de microsserviços.

**Alternativa:** expor capacidades dos SoRs existentes por APIs (estratégia do estrangulamento quando a substituição for de fato necessária, ver [Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html)).

## 9. Eventos onde uma API simples bastaria

**Como aparece:** consultas síncronas modeladas como pares de eventos de pedido e resposta.

**Por que é problemático:** latência, complexidade de correlação, depuração difícil, sem ganho de desacoplamento.

**Alternativa:** API síncrona para consultas e comandos com resposta imediata; eventos para fatos com vários consumidores.

## 10. Multi-agente sem necessidade

**Como aparece:** "agente orquestrador", "agente de RH", "agente de política", "agente revisor" para um escopo que um agente com ferramentas filtradas resolveria.

**Por que é problemático:** multiplica latência, custo e pontos de falha; dificulta depuração e avaliação. A Anthropic recomenda começar pela solução mais simples. **[FATO]** ([Anthropic](https://www.anthropic.com/engineering/building-effective-agents))

**Alternativa:** um agente com catálogo filtrado por intenção; agentes separados só com fronteira real de dono, política ou fornecedor.

## 11. Confundir chatbot com agente

**Como aparece:** um bot de perguntas e respostas é vendido internamente como "agente autônomo", ou um agente com ferramentas de escrita é governado como um chatbot.

**Por que é problemático:** expectativas erradas no produto e, mais grave, controles de segurança insuficientes para quem de fato executa ações.

**Alternativa:** usar a taxonomia (chatbot, copilot, RAG, agente, agente com ferramentas, workflow agêntico, multi-agente) e aplicar controles proporcionais. Ver `02_analise_multidisciplinar/arb_ia_conteudo_e_busca.md`.

## 12. Confundir busca vetorial com conhecimento

**Como aparece:** "temos um banco vetorial, então temos uma base de conhecimento".

**Por que é problemático:** conhecimento exige validade, aplicabilidade, autoria e relações. A similaridade semântica não captura nenhum desses.

**Alternativa:** conhecimento = conteúdo governado + metadados + relações (grafo, quando justificado) + busca híbrida + avaliação.

## 13. MCP como solução universal de integração

**Como aparece:** "vamos colocar um servidor MCP na frente de cada sistema e pronto".

**Por que é problemático:** o MCP padroniza como o agente descobre e chama ferramentas; não resolve contrato de domínio, consistência, processos longos, eventos nem integração entre sistemas que não envolvem agentes. Além disso, a especificação ainda muda de forma incompatível (revisão 2026-07-28). **[FATO]** ([MCP changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog))

**Alternativa:** MCP como **interface agente ↔ ferramentas**, sobre uma camada de integração convencional (APIs, BFF, eventos, workflows).

## 14. IA para compensar processos mal definidos

**Como aparece:** colocar um agente na frente de um processo cuja regra é tácita, sem dono ou inconsistente.

**Por que é problemático:** automatiza a inconsistência; esconde lacunas de governança atrás de uma interface fluente.

**Alternativa:** usar a descoberta do projeto para explicitar regras, exceções e donos; o agente pode ajudar a analisar chamados e conversas para revelar o processo real. Ver `04_transversais/processos_corporativos_e_agentes.md`.

## 15. Token passthrough e conta de serviço genérica

**Como aparece:** o agente repassa o token do usuário a qualquer API, ou usa uma conta de serviço única para tudo.

**Por que é problemático:** o MCP proíbe explicitamente o token passthrough, por contornar controles, comprometer a trilha de auditoria e quebrar fronteiras de confiança. A conta genérica apaga o "em nome de quem". **[FATO]** ([MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices))

**Alternativa:** token exchange com delegação (sujeito + ator), audiência por recurso.

## 16. Remover a navegação antes de provar o agente

**Como aparece:** a home vira só uma caixa de conversa.

**Por que é problemático:** usuários que sabem o que querem perdem eficiência; falhas do agente ficam sem alternativa; a confiança cai.

**Alternativa:** coexistência; o agente como entrada preferencial, a navegação como caminho sempre disponível; remoção gradual por evidência de uso.

## 17. Medir sucesso por volume de conversas

**Como aparece:** a métrica do projeto é "número de interações com o assistente".

**Por que é problemático:** mais conversas podem significar mais confusão; incentiva o engajamento, e não a resolução.

**Alternativa:** resolução por intenção, tempo até a resolução, recontato, esforço percebido. Ver `04_transversais/ux_experiencia_orientada_a_intencao.md`.

## Checklist rápido de detecção

- [ ] Há regras de negócio em prompts?
- [ ] Alguma ferramenta tem escopo curinga ou é genérica?
- [ ] O índice tem metadados de permissão e vigência?
- [ ] O modelo gera marcação renderizada diretamente?
- [ ] Há mais de um agente sem fronteira clara de dono?
- [ ] O agente repassa tokens ou usa conta de serviço compartilhada?
- [ ] Processos de vários dias dependem do estado da conversa?
- [ ] A métrica principal é volume de uso?

Qualquer "sim" indica um anti-pattern a tratar antes de ampliar o escopo.

## Fontes

- OWASP, LLM06:2025 Excessive Agency: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/
- Anthropic, Building effective agents: https://www.anthropic.com/engineering/building-effective-agents
- MCP changelog 2026-07-28: https://modelcontextprotocol.io/specification/2026-07-28/changelog
- MCP Security Best Practices: https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices
- Martin Fowler, Strangler Fig Application: https://martinfowler.com/bliki/StranglerFigApplication.html
