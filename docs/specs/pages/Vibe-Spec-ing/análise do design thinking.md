**1. MATRIZ SINTÉTICA DE IMPACTO CIENTÍFICO**

| Etapa do Design Thinking | Benefício Empírico / Alavanca Documentada | Risco / Viés Científico Conhecido | Mecanismo de Mitigação / Governança |
|--------------------------|-------------------------------------------|-----------------------------------|-------------------------------------|
| 1. Empatizar / Descobrir | Apoio à geração de perguntas de sondagem, detecção de ambiguidades e exploração de tópicos omitidos (estudos de LLM em elicitação: Ronanki et al., 2023; Bashir et al.) | Ancoragem em personas sintéticas; ilusão de completude; distorção de relatos por resumos automatizados; viés de omissão residual (Ferrari et al., 2016; Burnay et al., 2014) | Protocolo de registro de fonte (humano vs. inferência LLM); adjudicação independente; combinação obrigatória com observação operacional e inspeção de artefatos legados (ISO/IEC/IEEE 29148) |
| 2. Definir o Problema | Desmembramento de declarações brutas em categorias (sintoma / necessidade / objetivo / solução presumida) | Erro categórico: transformação de hipóteses de outcome em requisitos estáticos; congelamento precoce de solução tecnológica | Separação explícita entre microvalidação de entendimento e validação empírica de hipótese de negócio; gate de decisão humana antes de formalizar requisitos (SWEBOK KA Software Requirements) |
| 3. Idear / Prototipar | Geração rápida de exemplos, edge cases, cenários negativos e dados de teste (Example Mapping assistido) | “Seductive Specs”: fluência textual que mascara alucinações de regras ou premissas falsas; harmonização silenciosa de conflitos (NIST AI 600-1; overreliance) | Exigência de exemplos positivos + negativos validados por domínio; revisão cega de conflitos; proibição de aceitar texto fluente como evidência de correção |
| 4. Especificar / Evoluir Artefatos | Estruturação de especificações evolutivas e geração de candidatos a links de rastreabilidade pré/pós-especificação | Spec Drift progressivo; perda de proveniência de decisões e alternativas rejeitadas (Gotel & Finkelstein; Rempel & Mäder) | Política explícita de divergência; modelo de proveniência (W3C PROV-DM); versionamento append-only com owner e rationale obrigatórios |
| 5. Testar / Validar | Tradução de critérios de aceitação em testes de aceitação/contratos; apoio a testes de caracterização em legados | Problema do Oráculo: testes verdes que verificam oráculos errados ou incompletos gerados pela própria IA; cobertura insuficiente de NFR, segurança e regulatório | Oráculos definidos e validados por humanos antes da geração de testes; testes ocultos/independentes; combinação TDD/BDD com testes de caracterização, ameaça modeling e verificação operacional (Feathers; Rafique & Mišić; Tosun et al.) |

---

**2. ANÁLISE APROFUNDADA ETAPA POR ETAPA**

### 2.1 Empatizar / Descobrir (Elicitação e Investigação do Problema)

A ISO/IEC/IEEE 29148 distingue elicitação (descoberta de necessidades, restrições e conhecimento dos stakeholders) de análise e especificação. A literatura empírica (Ferrari et al., 2016) demonstra que ambiguidades em entrevistas frequentemente revelam conhecimento tácito, enquanto Burnay et al. (2014) mostram que stakeholders omitem sistematicamente certos tópicos. LLMs podem atuar como geradores de perguntas de sondagem e detectores de lacunas, aumentando a cobertura de tópicos em sessões controladas (Ronanki et al., 2023; estudos industriais de classificação de ambiguidade).

Contudo, a elicitação conversacional assistida permanece distinta da observação operacional direta e da inspeção de artefatos legados. Resumos automatizados introduzem risco de distorção seletiva; personas sintéticas geradas por LLM podem ancorar a investigação em estereótipos não validados. A ilusão de completude surge quando o volume e a fluência do output são confundidos com cobertura real do domínio. A norma 29148 e o SWEBOK exigem múltiplas fontes e validação cruzada; o LLM não substitui essa triangulação.

### 2.2 Definir o Problema (Separação de Espaços de Problema e Solução)

LLMs demonstram capacidade de classificar enunciados brutos em categorias analíticas (sintoma, necessidade, objetivo mensurável, solução técnica presumida). Isso apoia a disciplina de manter o espaço do problema separado do espaço da solução, princípio central da Engenharia de Requisitos.

O risco epistemológico principal é o erro categórico: uma hipótese de outcome (“reduzir tickets de suporte em X%”) é convertida prematuramente em requisito funcional estático. Congelar uma solução tecnológica sugerida pelo modelo (ex.: “migrar para microsserviços”) antes da validação empírica viola a distinção entre (a) consenso intersubjetivo sobre o entendimento compartilhado e (b) evidência externa de que a intervenção produz o efeito desejado. A validação de entendimento é necessária, mas insuficiente; a validação de hipótese de negócio exige dados operacionais ou experimentação controlada.

### 2.3 Idear / Prototipar (Evolução de Regras, Cenários e Exemplos)

A transformação de declarações em cenários concretos (Example Mapping), edge cases e dados de teste é uma alavanca clara. O modelo pode gerar rapidamente variantes positivas, negativas e de fronteira, reduzindo o custo de exploração.

O fenômeno das “Seductive Specs” — especificações fluentes, bem estruturadas e persuasivas que contêm premissas falsas ou regras alucinadas — está documentado no perfil de risco de GenAI do NIST (AI 600-1) e em estudos de overreliance e viés de automação. A harmonização silenciosa de conflitos entre stakeholders pelo LLM elimina tensões que deveriam ser negociadas explicitamente. Fluência textual não é proxy de correção teórica nem de completude. A mitigação exige que todo cenário crítico seja validado por especialistas de domínio e que conflitos sejam preservados, não resolvidos automaticamente.

### 2.4 Especificar / Evoluir Artefatos (Rastreabilidade e Governança de Intenção)

Ferramentas de Spec-Driven Development e geração de matrizes de rastreabilidade podem acelerar a estruturação de artefatos evolutivos. Links candidatos entre origem, requisito, design, teste e código podem ser propostos automaticamente.

O risco estrutural é o Spec Drift: desalinhamento progressivo entre o diálogo de intenção, o documento de especificação, os testes executáveis e o código em produção. A perda de proveniência (quem decidiu, com base em qual evidência, quais alternativas foram rejeitadas) compromete a auditabilidade. Modelos de rastreabilidade clássicos (Gotel & Finkelstein; Ramesh & Jarke; Rempel & Mäder) e o padrão W3C PROV-DM fornecem a base formal para exigir registro de agentes, entidades, atividades e relações de derivação. A política de divergência deve definir, para cada tipo de decisão, qual artefato é autoritativo e como a mudança é propagada e versionada (preferencialmente em modo append-only).

### 2.5 Testar / Validar (Oráculos, TDD/BDD e Verificação Operacional)

A conexão entre critérios de aceitação refinados e suites de testes é uma alavanca operacional. Em sistemas legados, testes de caracterização (Feathers) podem capturar comportamentos existentes antes de qualquer modificação.

O Problema do Oráculo torna-se crítico quando a própria IA gera tanto a especificação quanto os testes: testes “verdes” podem simplesmente confirmar oráculos incompletos ou incorretos codificados pelo modelo. Meta-análises de TDD (Rafique & Mišić; Tosun et al.) mostram efeitos contextuais sobre qualidade e produtividade; nenhuma evidência sustenta que TDD ou BDD, isoladamente, validem requisitos não-funcionais, regulatórios ou de segurança. Testes unitários e mesmo de aceitação têm cobertura limitada. São necessários testes ocultos/independentes, threat modeling, verificação operacional e monitoramento em produção.

---

**3. MATRIZ DE AUTORIDADE E GOVERNANÇA HUMANO-IA**

| Tipo de Artefato / Decisão                  | Autoridade Primária          | Papel da IA (LLM)                          | Papel Secundário / Revisão Obrigatória |
|---------------------------------------------|------------------------------|--------------------------------------------|----------------------------------------|
| Necessidade de negócio / Prioridade de valor | Produto / Negócio            | Sugerir impactos e alternativas            | Engenharia (esforço/risco)             |
| Regra de domínio / Política comercial       | Domínio / Negócio            | Detectar ambiguidades e inconsistências    | Produto + Compliance                   |
| Critério de aceitação verificável           | Negócio + Engenharia         | Propor formulações e casos                 | QA / Testes                            |
| Decisão arquitetural                        | Arquitetura / Engenharia     | Sugerir padrões e trade-offs               | Segurança + Operações                  |
| Oráculo de teste (definição)                | Negócio + Engenharia         | Gerar candidatos                           | Validação humana obrigatória           |
| Implementação de teste (código de teste)    | Engenharia / QA              | Gerar código de teste                      | Revisão de oráculo e cobertura         |
| Link de rastreabilidade                     | Engenharia (manutenção)      | Propor candidatos a links                  | Auditoria periódica de precisão/recall |
| Aceitação de risco residual                 | Produto + Risco/Compliance   | Listar cenários de risco                   | Engenharia (quantificação técnica)     |
| Formulação textual de especificação         | Qualquer (com revisão)       | Redigir / reformular                       | Owner do requisito                     |
| Classificação de divergência (drift)        | Owner do artefato + adjudicação | Detectar potenciais conflitos            | Decisão humana formal                  |

A IA não possui autoridade primária sobre valor, risco, conformidade ou arquitetura. Seu papel é proposicional e auxiliar.

---

**4. PROTOCOLO DE AVALIAÇÃO E MÉTRICAS RECOMENDADAS**

**Métricas de qualidade do processo de requisitos (alinhadas a 29148 / SWEBOK e literatura de qualidade de requisitos):**

- **Recall de Requisitos**: proporção de itens aplicáveis do pacote de referência (elaborado independentemente) cobertos por requisitos ou critérios formalizados.  
- **Taxa de Ambiguidade Residual**: número de requisitos com mais de uma interpretação plausível após revisão independente, normalizado por 100 requisitos.  
- **Taxa de Spec Drift**: frequência de divergências detectadas entre especificação, testes e comportamento observado em produção (ou em testes de caracterização), por unidade de tempo ou por release.  
- **Precisão e Recall de Links de Rastreabilidade**: contra um conjunto de referência de links corretos (precisão = links corretos recuperados / links recuperados; recall = links corretos recuperados / todos os links corretos).  
- **Cobertura de Critérios de Aceitação por Testes Independentes**: proporção de critérios que possuem pelo menos um teste não gerado a partir do mesmo prompt/contexto da especificação.  
- **Proveniência Completa**: proporção de afirmações/decisões com registro de agente, timestamp, fonte e rationale.

**Métricas de resultado operacional (complementares):**

- Métricas DORA (Deployment Frequency, Lead Time for Changes, Change Failure Rate, Mean Time to Recovery) como indicadores de capacidade de evolução.  
- Densidade e gravidade de incidentes em produção rastreáveis a omissões ou ambiguidades de requisitos.  
- Tempo médio para compreender e implementar uma mudança de regra de negócio (proxy de manutenibilidade da intenção).  
- Taxa de retrabalho atribuível a divergência intenção–implementação.

**Protocolo mínimo de avaliação:**

1. Elaborar pacote de referência independente (necessidades, regras, restrições, casos de fronteira) antes ou em paralelo à elicitação assistida.  
2. Conduzir a elicitação/especificação com LLM sob protocolo de registro de fonte e distinção fato/inferência/proposta.  
3. Realizar revisão cega por pelo menos dois especialistas de domínio.  
4. Medir as métricas acima em pontos definidos do ciclo (após definição, após especificação, após implementação, após operação).  
5. Publicar prompts, versões de modelo, artefatos e decisões de adjudicação (respeitando restrições de privacidade).  
6. Tratar qualquer melhoria observada como evidência local e contextual, não como validação generalizável do workflow.

Este protocolo torna a hipótese de uso de LLMs na Engenharia de Requisitos falsificável e alinhada aos princípios de verificação, validação, rastreabilidade e gestão de riscos estabelecidos pelas normas e pela literatura empírica de referência.