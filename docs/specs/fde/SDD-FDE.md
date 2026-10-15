# Especificação SDD — Reposicionamento para Forward-Deployed Engineer


> **Fonte:** especificação v1.0 entregue pelo autor em 14/10/2026, transcrita abaixo da §0.
> **v1.1 (14/10/2026):** acrescenta a §0 (correções e decisões) e corrige a contagem de projetos na §3.1.
> **Plano de execução:** [`PLANO.md`](PLANO.md). **Modelo de dados dos cases:** [`ADR-fde-001`](ADR-fde-001-cases-json.md).

## 0. Correções e decisões da v1.1

### 0.1 Correções factuais (conferidas no repositório)

| Na v1.0 | No repositório | Ação |
|---|---|---|
| "18 projetos documentados em metodologia STAR" | `public/cv.json` → `Projetos` tem **19**; `public/career-highlights-star.md` também | §3.1 corrigida para 19 |
| "economia superior a **3 milhões**" | Site publica "Economia de mais de **3MM**", sem moeda (`src/index.html`, bloco gerado de `cv.json`) | Não acrescentar moeda sem fonte. A prova usa o texto publicado. |
| Case "Economia na negociação do contrato Salesforce" | Projeto `Revisão orçamentária e CINVEST do novo contrato Salesforce` (2020) | `projeto_ref` aponta para esse nome |

### 0.2 Decisões adotadas por padrão

O autor mandou prosseguir com o plano sem responder às decisões D1–D5. Valem as recomendações
do plano, revisáveis a qualquer momento antes da WU que depende de cada uma:

| # | Decisão | Padrão adotado | Bloqueia |
|---|---|---|---|
| D1 | Headline | Versão curta no hero; completa no `<title>` e no JSON-LD | WU-3 |
| D2 | Nova navegação (`ecosystem.nav.yaml`) | Sim, depois dos cases publicados; exige aprovação explícita na WU-11 (ECOSYSTEM.md) | WU-11 |
| D3 | Espelhar `Titulo` e competências em `issei/curriculo` | Sim: lá primeiro, aqui o fallback | WU-3, WU-7 |
| D4 | Cases fora do `cv.json` | Sim: `public/cases.json` ([ADR-fde-001](ADR-fde-001-cases-json.md)) | WU-4 |
| D5 | Respostas confidenciais da Fase 0 | Fora do repositório, no computador do autor | Fase 0 |

### 0.3 Restrição do tradutor que muda o plano

`knowledge/i18n-terminologia-argos.md`: o Argos Translate não tem glossário nem restrição lexical,
e o glossário por marcador foi avaliado como não eficaz. Por isso a WU-2 **não** tenta proteger o
termo "Forward-Deployed Engineer" dentro do tradutor. Ela cria um teste que confere a headline no
`/en/`. Se o Argos alterar o termo, a correção vai para a fonte em português (por exemplo, marcar o
termo como nome próprio no HTML), nunca para `src/en/**`.

**Projeto:** reposicionamento editorial e estrutural do site `mauricio.issei.com.br`  
**Versão:** 1.1  
**Data:** 13 de outubro de 2026  
**Status:** proposta pronta para refinamento e implementação  
**Tipo:** especificação de produto e conteúdo para Spec-Driven Development (SDD)

## 1. Objetivo

Reposicionar o site de Maurício Yokoyama Issei para comunicar, com evidências verificáveis, um perfil de **Forward-Deployed Engineer (FDE)**: profissional que entra em ambientes complexos de clientes, reduz ambiguidade, constrói integrações e software operacional, coloca soluções em produção e transforma aprendizados de campo em padrões reutilizáveis.

O reposicionamento não deve inventar experiência com LLMs, MCP, RAG, evals ou guardrails quando essa evidência não estiver documentada no portfólio. A linguagem de FDE deve ser aplicada primeiro aos fatos já demonstrados: Salesforce, AWS, APIs, sistemas legados, modernização de jornadas, sustentação, observabilidade, discovery, MVPs, integração com operação comercial e resultados mensuráveis.

## 2. Decisão de posicionamento

### 2.1 Posicionamento recomendado

> **Forward-Deployed Engineer | Enterprise Systems & Applied AI | Salesforce, AWS e Integrações de Produção**

Esse posicionamento é mais defensável do que uma promessa centrada em “AI Agent Engineer” porque a base mais consistente do site é a engenharia embarcada em sistemas corporativos e operações críticas. A IA deve ser apresentada como uma camada de evolução aplicada, com determinismo, contratos e governança, não como substituta da experiência comprovada em produção.

### 2.2 Proposta de valor

Maurício entra em ambientes corporativos complexos, transforma problemas operacionais ambíguos em escopos executáveis e constrói a solução diretamente no ecossistema do cliente.

Sua experiência combina Salesforce, AWS, APIs, Java, observabilidade, SRE e liderança técnica para modernizar jornadas comerciais, integrar sistemas legados e reduzir dependências manuais.

Quando IA é aplicada, a proposta deve preservar o mesmo princípio operacional: regras determinísticas no caminho crítico, contratos verificáveis, fallback seguro e governança versionada.

### 2.3 O que não deve ser afirmado sem nova evidência

- Implementação comprovada de MCP Server em produção.
- Pipelines RAG em produção.
- Evals, golden datasets ou regression suites já operacionais.
- Redução mensurada de alucinações.
- Uso de guardrails determinísticos em um case específico.
- Código produzido diretamente em repositório de cliente em cada projeto.
- “Zero quebra de regras de negócio”. Essa formulação deve ser substituída por “preservação verificável das regras de negócio”, caso a evidência seja obtida.

## 3. Evidências auditadas

### 3.1 Evidências fortes

O site documenta mais de 20 anos em desenvolvimento de software, análise de sistemas, integração de plataformas e resolução de problemas complexos. A stack inclui Salesforce, AWS, APIs REST/SOAP, Java, Node.js, Python, Go, .NET, observabilidade com Datadog e Splunk, SRE, CI/CD e ferramentas de dados. [1] [2]

Há resultados quantificados relevantes:

- economia superior a **3 milhões** na negociação de contrato Salesforce;
- aumento superior a **15%** no atingimento de metas com a Pipe Automática;
- redução de SLA de **até 10 dias para o tempo da proposta** no Agrupamento Comercial;
- 19 projetos documentados em metodologia STAR no material público consultado (v1.0 dizia 18; ver §0.1).

Esses fatos sustentam as dimensões de implementação embarcada, integração de sistemas, confiabilidade e impacto de negócio. [1] [2]

Os cases também mostram comportamento típico de FDE: discovery, refinamento técnico, implementação de MVP, acompanhamento de implantação, tratamento de incidentes, causa-raiz, homologação com outras squads e evolução a partir do uso real. Exemplos claros aparecem na abertura de conta PJ, no callback de propostas, no fluxo de credenciamento e na entrega imediata de máquinas. [2] [3]

### 3.2 Evidências de IA aplicada e metodologia

O site apresenta uma tese consistente de engenharia de agentes: determinístico primeiro, saída do modelo tratada como input não confiável, contratos rígidos, limiar de certeza, fail-closed, fronteira de ferramentas via MCP e controle de custo por ledger de quota. [4]

Também apresenta uma abordagem de engenharia reversa assistida por IA com descoberta guiada por jornadas, Matriz de Evidências, Inventário de Comportamentos e transição do As-Is para contratos de validação. [5]

Esses materiais sustentam a seção de metodologia e uma direção futura de atuação. Eles não bastam, isoladamente, para afirmar que todas essas técnicas foram aplicadas em sistemas de clientes. A especificação deve distinguir **método proposto**, **prova de conceito**, **implementação real** e **resultado medido**.

### 3.3 Evidências de operação e confiabilidade

O material de sustentação descreve incidentes como sinais de fragilidade, SLIs/SLOs, comunicação de crise e decisão sob pressão. O modelo Service Operations 2.0 acrescenta automação, IA governada, redução de toil, resiliência sistêmica e foco no impacto ao cliente. [6] [7]

Esses conteúdos dão ao perfil uma diferenciação importante: o FDE não apenas integra sistemas; ele também responde pelo comportamento da solução depois da implantação.

## 4. Diagnóstico por página e conteúdo

### 4.1 Home

**Estado observado:** a home se apresenta como “Tech Lead | Staff Software Engineer”, destaca mais de 20 anos, Salesforce, AWS, APIs, observabilidade, SRE e linguagens de programação. Também traz resultados e documentação para agentes de IA. [1]

**Forças subaproveitadas:** combinação de plataforma corporativa, cloud, operação crítica e métricas de impacto; disponibilidade de CV estruturado, projetos STAR e documentação técnica; capacidade de ligar execução técnica a resultado comercial.

**Vícios de posicionamento:** “Tech Lead”, “Especialista em Análise de Sistemas” e “desenvolvimento de software” são verdadeiros, mas são amplos. Não deixam explícito que o profissional trabalha dentro do ambiente operacional, integra sistemas e conduz o caminho entre ambiguidade e produção.

**Mudança necessária:** substituir a headline principal por FDE e organizar a primeira tela em três provas: problema ambíguo resolvido, stack construída e impacto medido.

### 4.2 Currículo e projetos STAR

**Estado observado:** o currículo contém histórico amplo, competências, responsabilidades e cases com Situação, Tarefa, Ação e Resultado. [2] [3]

**Forças subaproveitadas:** discovery com implementação; MVP seguido de arquitetura definitiva; homologação e implantação em ondas; observabilidade e logs para identificar divergências; modernização de fluxo legado; interface entre comercial, operação, Salesforce e AWS.

**Vícios de posicionamento:** os verbos “participação”, “atuação”, “levantamento” e “atendimento” reduzem a percepção de ownership. Em vários casos, o resultado está correto, mas falta explicitar qual decisão técnica foi tomada, quais componentes foram alterados e como a solução foi validada.

**Mudança necessária:** converter os cases prioritários de STAR para **STAR-FDE**: contexto e ambiguidade, build embarcado, validação e governança, impacto e padrão reutilizável.

### 4.3 DevOps Salesforce com IA

**Estado observado:** a página apresenta quatro camadas para adoção segura de IA em Salesforce: fundação, arquitetura, metodologia e governança. Descreve VS Code, Salesforce CLI, JDK 21, MCP Server, Flosum, Git, Delta Deployment, Overwrite Protection, Smart Merge, specs, Matriz de Impacto, Limites de Atuação, `AGENTS.md`, playbooks e skills versionados. [8]

**Força subaproveitada:** este é o conteúdo mais próximo de um playbook de FDE e de SDD. Ele oferece um modelo operacional reproduzível, não apenas opinião sobre IA.

**Risco:** o texto pode ser interpretado como prova de implantação em cliente, embora a página esteja redigida como manual prático de adoção.

**Mudança necessária:** separar explicitamente “padrão recomendado”, “experiência aplicada” e “case comprovado”. Transformar a página em um artefato de método ligado a requisitos de implementação.

### 4.4 Engenharia reversa assistida por IA

**Estado observado:** a página propõe congelar o As-Is, seguir jornadas críticas, cruzar evidências estruturais, de estado, operacionais e humanas, classificar comportamentos e convertê-los em contratos. [5]

**Força subaproveitada:** método forte para ambientes legados, com uma lógica clara de redução de risco antes da modernização.

**Mudança necessária:** publicar entradas, saídas e critérios de conclusão. O leitor deve saber o que recebe ao final: mapa da jornada, Matriz de Evidências, Inventário de Comportamentos, regras classificadas por confiança e contratos de validação.

### 4.5 Sustentação e Service Operations 2.0

**Estado observado:** os conteúdos defendem confiabilidade mensurável, comunicação de crise, causa-raiz, automação, IA governada e resiliência. [6] [7]

**Força subaproveitada:** operação em produção como parte da engenharia, não como suporte posterior.

**Mudança necessária:** conectar o discurso a métricas concretas disponíveis nos cases: incidentes, tempo de atendimento, propostas pendentes, estabilidade, adoção, SLA e tempo de ativação. Onde o número não existir, solicitar a evidência antes de publicar.

## 5. Requisitos funcionais de conteúdo

### R-FDE-001 — Headline de posicionamento

A home deve exibir, acima da dobra, a headline:

> **Forward-Deployed Engineer | Enterprise Systems & Applied AI | Salesforce, AWS e Integrações de Produção**

**Critério de aceite:** a primeira tela comunica função, domínio e tecnologias sem exigir leitura do currículo.

### R-FDE-002 — Manifesto de três frases

A home deve conter um manifesto curto que explique: entrada em ambientes complexos; construção de integração e software operacional; transformação de aprendizados em padrões seguros e reutilizáveis.

**Critério de aceite:** o texto não usa “apaixonado por tecnologia”, “orientado a resultados” ou termos equivalentes sem evidência.

### R-FDE-003 — Bloco de provas

A home deve destacar no máximo quatro provas verificáveis:

1. mais de 20 anos de engenharia de software e análise de sistemas;
2. economia superior a 3 milhões em contrato Salesforce;
3. aumento superior a 15% no atingimento de metas;
4. redução de SLA de até 10 dias para o tempo da proposta.

**Critério de aceite:** cada prova aponta para o currículo ou para um case detalhado.

### R-FDE-004 — Taxonomia de competências

Substituir ou explicar os rótulos genéricos usando a seguinte taxonomia:

- levantamento de requisitos → **desconstrução de ambiguidade e scoping técnico**;
- consultoria e suporte → **implementação embarcada e operação de produção**;
- integração → **integração de sistemas corporativos e interoperabilidade legado–cloud**;
- testes e validação → **contratos de validação, testes de regressão e evidência operacional**;
- documentação → **especificação executável e padrões versionados**;
- prompts e scripts de IA → **orquestração de ferramentas e IA aplicada governada**, somente quando houver evidência do trabalho realizado.

**Critério de aceite:** os termos originais podem permanecer no currículo quando forem necessários para precisão histórica, mas devem ser contextualizados pelo resultado e pela implementação.

### R-FDE-005 — Cases STAR-FDE

Os cases prioritários devem seguir esta ordem fixa:

1. **Contexto e ambiguidade:** qual operação estava limitada, quais dependências existiam e por que o problema era difícil;
2. **Engenharia embarcada:** componentes, plataformas, integrações e decisões construídas;
3. **Validação, segurança e operação:** homologação, logs, monitoramento, fallback, causa-raiz e critérios de aceite disponíveis;
4. **Impacto:** métrica antes/depois, ganho operacional e efeito no cliente;
5. **Padrão reutilizável:** ativo, componente, jornada ou decisão que pode ser reaproveitado.

**Critério de aceite:** nenhum case é publicado como FDE se não tiver pelo menos uma evidência de implementação e uma evidência de resultado ou de validação.

### R-FDE-006 — Priorização de cases

A primeira versão deve priorizar:

- Agrupamento Comercial;
- Pipe Automática Comercial;
- Atualização de status via callback;
- Abertura de Conta Corrente PJ;
- Evolução do Credenciamento no Plano Padrão;
- Entrega imediata de máquina pelo executivo;
- Validação de domicílio bancário;
- Economia na negociação do contrato Salesforce.

**Critério de aceite:** cada case informa ano, contexto, papel exercido, stack, resultado e nível de evidência.

### R-FDE-007 — Metodologia SDD

A página de DevOps deve incluir um template de spec com os campos abaixo:

```yaml
spec:
  contexto_de_negocio: "Problema operacional observável e usuário afetado"
  objetivo_observavel: "Mudança que pode ser verificada"
  escopo:
    inclui: []
    nao_inclui: []
  matriz_de_impacto:
    sistemas: []
    jornadas: []
    dados: []
    dependencias: []
    riscos: []
  limites_de_atuacao: []
  contratos:
    entradas: []
    saidas: []
    erros: []
    fallback: []
  criterios_de_aceite: []
  evidencias_de_validacao: []
  plano_de_rollout: []
```

**Critério de aceite:** um leitor consegue transformar a página em um ticket ou plano de implementação sem inferir campos essenciais.

### R-FDE-008 — Método de engenharia reversa

A página deve apresentar uma sequência operacional:

1. escolher uma jornada crítica;
2. seguir a trilha de execução;
3. coletar evidências estruturais, de estado, operacionais e humanas;
4. classificar regras, efeitos colaterais e workarounds por confiança;
5. converter regras preservadas em contratos de validação;
6. decidir preservar, redesenhar ou descontinuar.

**Critério de aceite:** cada etapa possui entrada, saída e condição de conclusão.

### R-FDE-009 — Fronteira entre experiência e tese

Todo conteúdo de IA deve ter um rótulo editorial entre:

- **Experiência comprovada:** evidência de projeto, código, implantação ou resultado;
- **Padrão aplicado:** método usado em uma implementação identificada;
- **Padrão recomendado:** orientação técnica geral;
- **Próxima capacidade:** competência a demonstrar em novo case.

**Critério de aceite:** o site não permite que um padrão recomendado seja lido como case de cliente.

### R-FDE-010 — Metadados e descoberta

Preservar e melhorar `llms.txt`, `llms-full.txt`, `cv.json`, catálogo de agentes e páginas Markdown para agentes de IA. Cada página deve conter título, autor, idioma, data de atualização, resumo, casos relacionados e links canônicos.

**Critério de aceite:** o conteúdo HTML e Markdown apresenta o mesmo posicionamento e não possui headline conflitante.

## 6. Modelo de dados mínimo para cada case

```yaml
case:
  id: "case-agrupamento-comercial"
  titulo: "Agrupamento Comercial"
  periodo: "2024"
  cliente_ou_contexto: "Rede"
  papel: "informar com precisão; não presumir cargo ou ownership além da evidência"
  contexto_ambiguidade: ""
  sintomas: []
  restricoes: []
  componentes_construidos: []
  integracoes: []
  decisoes_tecnicas: []
  validacao: []
  operacao: []
  impacto_mensurado: []
  impacto_nao_mensurado: []
  padrao_reutilizavel: ""
  stack: []
  nivel_evidencia: "confirmada|parcial|a_confirmar"
  fonte: ""
```

O campo `impacto_mensurado` deve conter somente números ou comparações publicadas no material original. O campo `impacto_nao_mensurado` preserva ganhos qualitativos sem transformá-los artificialmente em KPI.

## 7. Critérios de qualidade editorial

A implementação será aceita somente se:

- cada afirmação de competência estiver ligada a código, integração, operação, método ou impacto;
- fatos, inferências, recomendações e lacunas estiverem claramente separados;
- os verbos indicarem ação concreta: desenhou, implementou, integrou, homologou, instrumentou, refinou, estabilizou ou priorizou, conforme a evidência;
- “participou” ou “atuou” permanecerem apenas quando o grau de ownership não puder ser determinado;
- nenhum resultado qualitativo for convertido em porcentagem sem fonte;
- a palavra “produção” for usada apenas quando houver evidência de implantação ou operação real;
- termos como MCP, RAG, evals, guardrails e agentes forem associados a uma implementação, a um padrão recomendado ou a uma lacuna;
- a versão em português e a versão em inglês não divergirem sobre cargo, senioridade, resultados ou experiência;
- cada case tiver link para sua fonte e data de revisão.

## 8. Plano de implementação

### Fase 0 — Fechamento de evidências

Solicitar os dados que faltam para os oito cases prioritários: papel exato, repositórios ou componentes alterados, ambiente de implantação, métricas antes/depois, testes, incidentes, rollout e ativos reutilizados. Classificar cada resposta como pública, confidencial ou não publicável.

### Fase 1 — Arquitetura de informação

Criar um menu e uma hierarquia orientados a problemas:

- **FDE / Home** — posicionamento e provas;
- **Cases** — problemas resolvidos e impacto;
- **Métodos** — SDD, engenharia reversa, operação e IA governada;
- **Experiência** — currículo e trajetória;
- **Notas técnicas** — artigos e playbooks;
- **Dados para agentes** — `cv.json`, `llms.txt` e catálogo.

### Fase 2 — Conteúdo de alta evidência

Reescrever a home e os oito cases prioritários antes de expandir o discurso de IA. Essa ordem reduz o risco de o site parecer uma coleção de teses sem provas de implementação.

### Fase 3 — Metodologia operacional

Adicionar o template SDD, a Matriz de Impacto, os Limites de Atuação e a distinção entre experiência comprovada e padrão recomendado.

### Fase 4 — IA aplicada e governança

Somente após obter evidência suficiente, adicionar cases de MCP, agentes, evals, RAG ou guardrails. Cada novo case deve ter fluxo, contrato, falhas esperadas, fallback, testes e impacto.

### Fase 5 — Validação

Executar revisão editorial, validação factual com o autor, teste de leitura por recrutador técnico e teste de extração por agente de IA. Corrigir divergências entre HTML, Markdown, JSON e versões em inglês.

## 9. Scorecard de maturidade FDE

| Dimensão | Estado atual | Aderência | Próxima prova necessária |
|---|---|---:|---|
| Engenharia embarcada | Há vários cases de construção e evolução em Salesforce, AWS, Java e APIs. | Alta | Informar componentes, repositórios e ambiente de implantação por case. |
| Integração legado–cloud | Forte evidência de Salesforce, AWS, APIs, sistemas de workflow e integrações corporativas. | Alta | Mostrar diagramas ou contratos de integração publicáveis. |
| Ambiguidade e scoping | Discovery, MVP, refinamento, épicos e jornadas aparecem com frequência. | Alta | Explicitar decisões, restrições e trade-offs. |
| Operação e confiabilidade | SRE, observabilidade, logs, incidentes e causa-raiz estão documentados. | Média-alta | Associar SLIs/SLOs, MTTR, volume de incidentes ou outras métricas. |
| Impacto de negócio | Há números fortes em economia, SLA e metas. | Alta | Adicionar baseline, período, método de medição e atribuição. |
| IA aplicada em produção | Há metodologia e princípios técnicos, mas poucos vínculos explícitos com cases reais. | Média-baixa | Publicar pelo menos um case verificável com fluxo, contrato, avaliação e fallback. |
| SDD e governança | O manual descreve specs, matriz de impacto, limites e repositório como memória. | Média | Adicionar template completo e evidência de uso em uma entrega. |
| Feedback para plataforma | Há práticas e padrões reutilizáveis implícitos nos cases. | Média | Nomear ativos reutilizáveis e explicar como foram disseminados. |
| Clareza de posicionamento FDE | O conteúdo atual prioriza Tech Lead e análise de sistemas. | Baixa-média | Alterar headline, navegação, verbos e arquitetura dos cases. |

**Aderência geral estimada:** **média-alta para FDE de sistemas corporativos e integração; média-baixa para FDE especializado em IA aplicada em produção**. Essa avaliação é editorial, não uma certificação de qualificação para vagas.

## 10. Três lacunas prioritárias

1. **Prova técnica de IA aplicada em produção.** O site tem uma arquitetura conceitual forte, mas precisa de um case público que mostre entrada, tool use, schema, avaliação, falha e fallback.
2. **Granularidade de implementação.** Os cases precisam informar o que foi efetivamente alterado: serviço, função, fluxo, API, objeto, fila, tabela, pipeline, dashboard ou mecanismo de observabilidade.
3. **Métricas operacionais de confiabilidade.** O discurso de SRE e resiliência deve ser ligado a números como incidentes por período, tempo de atendimento, MTTR, taxa de erro, disponibilidade, adoção ou redução de toil.

## 11. Definition of Done

O reposicionamento estará concluído quando:

- a home apresentar o posicionamento FDE e quatro provas rastreáveis;
- os oito cases prioritários estiverem no formato STAR-FDE;
- cada case informar nível de evidência e fonte;
- a metodologia SDD tiver template, matriz de impacto, limites e critérios de aceite;
- a engenharia reversa tiver fluxo, entradas, saídas e decisões;
- os artigos de IA distinguirem experiência comprovada de recomendação;
- `cv.json`, `llms.txt`, `llms-full.txt`, HTML e versões em inglês estiverem consistentes;
- nenhuma afirmação de MCP, RAG, evals, guardrails ou produção exceder a evidência disponível;
- o autor validar os fatos, os números e o grau de confidencialidade;
- uma leitura externa confirmar que o perfil é compreendido como alguém que constrói e opera soluções no ambiente do cliente, e não apenas como consultor ou desenvolvedor generalista.

## 12. Fontes consultadas

[1]: https://mauricio.issei.com.br/ "Maurício Yokoyama Issei — página inicial e resumo técnico"
[2]: https://mauricio.issei.com.br/curriculo "Currículo — experiência, competências e resultados"
[3]: https://mauricio.issei.com.br/career-highlights-star.md "Casos de Sucesso — metodologia STAR"
[4]: https://mauricio.issei.com.br/en/engenharia-agentes-ia "Engenharia de Agentes de IA — os 10 princípios do determinismo"
[5]: https://mauricio.issei.com.br/en/proposta-engenharia-reversa "Engenharia Reversa Assistida por IA — mapear a verdade do legado"
[6]: https://mauricio.issei.com.br/en/sustentacao "Do Caos à Resiliência — sustentação de sistemas em produção"
[7]: https://mauricio.issei.com.br/service-operations-2-0 "Service Operations 2.0 — resiliência sistêmica"
[8]: https://mauricio.issei.com.br/devops-salesforce "DevOps Salesforce com IA — manual prático de adoção"
[9]: https://mauricio.issei.com.br/en/proposta "Inteligência de Vendas em Tempo Real — Salesforce + AWS"
