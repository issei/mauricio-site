# Pesquisa, Síntese e Especificação do Projeto Vibe Spec-ing

**Status editorial do relatório:** síntese crítica pronta para publicação como enquadramento e proposta de pesquisa. O material **não demonstra que Vibe Spec-ing seja um método validado**, nem que reduza defeitos, retrabalho, custo ou risco. As referências autorais são evidência direta do que seus autores afirmam; não são validação independente.

## 1) Inventário validado das seis referências existentes

As seis referências abaixo são as fontes internas/autoriais auditadas no corpus recebido. Todas são de autoria de Maurício Yokoyama Issei, exceto o artigo atual, que é o artefato do projeto. A validação é, portanto, principalmente de **existência, conteúdo declarado e limites documentais** — não de eficácia.

| ID / referência e origem | Contribuição real | Natureza da evidência | Limitações e correções obrigatórias | Reutilização defensável | Redundâncias e relação |
|---|---|---|---|---|---|
| **R1 — Formulação de Problemas — Engenharia Interrompida**. Página autoral: [1]. | Oferece um enquadramento upstream: formular problemas como redução de incerteza orientada à decisão, interrompida por uma regra de parada. Propõe seis incertezas — aleatória, epistêmica, estrutural, semântica, de fronteira e de valores —, estados S0–S5, portão antes da solução, suficiência decisional/negociada, EVSI e penalidade λ. | **Direta** para registrar a tese e os construtos do autor; **relacionada/fundamento** quando dialoga com PSM, análise de decisão, requisitos e problemas wicked; **hipótese** quanto à taxonomia, estados, λ e regra de parada. | Não há critérios de inclusão/exclusão, mensuração ou validação da taxonomia; S0–S5 não são uma ontologia estabelecida; EVSI só é aplicável com modelo decisório, probabilidades, alternativas e utilidade; “ganho decisório”, novo enquadramento, custo cognitivo e λ não têm unidades ou calibração. A página não contém referências bibliográficas auditáveis. Não dizer que a tese está “parcialmente sustentada”: componentes têm antecedentes, mas o framework completo não foi testado. | Usar o portão de formulação, o checklist de suficiência, registro de alternativas, pressupostos, perguntas abertas, desacordo normativo e critério de parada como **proposta de artefatos** de Vibe Spec-ing. Tratar a taxonomia e o benchmark de dez casos como agenda de pesquisa. | Complementa R6 antes da especificação; sobrepõe-se a R4 em incerteza, governança e decisão. Não define conversa com LLM, proveniência, código ou testes; não é sinônimo de Vibe Spec-ing. |
| **R2 — Vibe Coding com Devin — De Executor a Orquestrador Cognitivo**. Página autoral: [2]. | Propõe o fluxo **Spec → Retrieve → Refatorar → Validar**, SDD como contrato, BDD/Apex Tests, Skills/Playbooks/Knowledge, A2UI e papel humano de “Orquestrador Cognitivo”. | **Direta** para o relato e o vocabulário da página; **experiência prática autorrelatada** quanto ao caso Devin + Salesforce; **hipótese** quanto a escalabilidade, auditabilidade, reuso e eficácia. | Não há conversa, prompts, contexto Salesforce, baseline, logs, diffs, commits, permissões, resultados de testes, métricas, falhas ou replicação. “Validado” deve virar “relatado pelo autor”. Apex Tests verificam oráculos e comportamentos selecionados; não provam intenção, segurança ou adequação de produto. A especificação só pode ser fonte de verdade se houver owner, autoridade, versionamento, proveniência, rastreabilidade e política de drift. | Reutilizar o fluxo como **candidato operacional** e convertê-lo em artefatos auditáveis: As-Is/To-Be, contexto, escopo, critérios, diffs, testes, decisões e intervenções humanas. Tratar o papel de orquestrador como hipótese de divisão de trabalho. | É o complemento de execução de R6; sobrepõe-se a R3/R4 em SDD, governança e rastreabilidade. Não comprova a formulação upstream de R1 nem a eficácia do workflow completo. |
| **R3 — Arquitetura de IA auditável**. Apresentação/página: [3]. | Desenha uma arquitetura-alvo com GraphRAG/ontologias, duas perspectivas, SDD, DevOps Salesforce e quatro princípios: determinismo, auditabilidade, rastreabilidade e reversibilidade. Propõe critérios como p95 < 400 ms e rollback. | **Direta** apenas para o desenho e as promessas publicadas; **fundamento relacionado** para requisitos, governança e qualidade; **hipótese** para redução de alucinação, determinismo, equivalência entre perspectivas, rollback exercitado e rastreabilidade nó a nó. | Não há diagrama executável, ontologia, configuração, benchmark de grounding, logs, matriz de rastreabilidade, aprovação, testes de determinismo, p95, segurança ou rollback. GraphRAG pode melhorar recuperação/proveniência em alguns cenários, mas proveniência não garante verdade. “Mesma entrada, mesma saída” é meta condicionada à configuração, não propriedade presumida. | Transformar as quatro palavras-chave em requisitos com IDs, owner, versão, risco, oráculo, evidência e replay. Testar taxa de suporte, abstenção, erros de citação, latência, drift e rollback. | Sobrepõe-se a R4 em governança e a R2 em SDD/DevOps; R3 é arquitetura-alvo, não relato operacional. R6 fornece a camada de intenção e ciclo de vida que R3 não especifica. |
| **R4 — A Engenharia da Confiança — Da Intenção à Execução Agêntica**. Página autoral: [4]. | Apresenta o Intentional Systems Model v1.0: M0 falhas silenciosas; M1 As-Is e matriz de evidências; M2 determinístico-primeiro, contratos, Mundo Aberto, fail-closed e MCP; M3 SDD, BDD, Skills, Playbooks, Knowledge e A2UI. Propõe 98% de confiança, CSI < 5% e cobertura > 80%. | **Direta** para o manifesto e seus módulos; **fundamento relacionado** quando referencia NIST, ISO, MCP e SEC; **hipótese** para limiar de 98%, KPIs, causalidade do caso Zillow, segurança via MCP e conformidade. | O limiar de 98% não tem definição, calibração nem política por domínio; schema valida estrutura, não verdade ou calibração. A SEC sustenta write-down de US$ 407,9 milhões, não toda a cadeia “Neural Zestimate → confiança → concept drift → ausência de fail-closed” nem cifra superior a US$ 500 milhões [43]. MCP é fronteira de integração e requer controles no host, cliente, servidor e operação [42]. “Alinhado ao NIST/ISO” exige crosswalk e evidência de conformidade. | Reutilizar o inventário As-Is, a separação fato/inferência/julgamento, fallback, abstention, registro de modelo/prompt/contexto e rastreabilidade. Tratar KPIs e controles como hipóteses a testar. | R4 agrega R2/R3 e fornece linguagem de governança; sobrepõe-se a R1 em incerteza e decisão. Não é evidência independente de R6: mesma autoria e ausência de estudo comparativo. |
| **R5 — Case Agents**. Página e repositório: [5]. | Demonstra uma implementação pequena de roteamento lexical, recuperação de ferramentas, taxonomia e guardas determinísticas. No main auditado ee31eba: 100% router e Hit Rate@1/@2 no dataset, 20 execuções transacionais corretas em 30 queries e 77,7739% de economia nominal com custos mockados. | **Direta/experiência prática** de código, dataset, testes e reprodução local do estado auditado; **hipótese** para custo real, segurança bancária, generalização e performance de produção. | O dataset é pequeno; três queries de avaliação repetem treino após normalização. Custos e latências são mocks. 226/285 tools não possuem a proteção direcional indicada. A árvore main coletou 72 testes, 71 passaram e o snapshot falhou por `git_dirty=true`. O commit e2dcd7f, quando executado exatamente, apresentou 15 testes, cinco abstenções, Precision@2 de 26,3% e economia mockada de 82,2%; não misturar versões. | Reutilizar fixação de commit/dataset/dependências, separação produção–harness, métricas com denominadores, testes de ausência de efeito, desempate determinístico, guardas e publicação de limitações. | É o único caso com artefato executável entre as seis referências, mas é um benchmark de MVP. Sobrepõe-se a R2/R4 em agentes e guardas; não valida Vibe Spec-ing nem segurança real. |
| **R6 — Vibe Spec-ing: Especificação Conversacional como Ponte entre Descoberta e Engenharia**. Artigo atual fornecido em [6]. | Define provisoriamente Vibe Spec-ing como workflow humano–LLM que explicita intenção, escopo, restrições e contexto; distingue entendimento compartilhado de validação de negócio; separa intenção, especificação, testes e código; propõe microvalidação, rastreabilidade, política de divergência e sustentabilidade observável. Preserva o exemplo sintético de cancelamento de assinatura. | **Direta** para a tese editorial e o cenário ilustrativo; **relacionada/fundamento** para ER, BDD, TDD, SDD e elicitação; **hipótese** para redução de fricção, perda de contexto, retrabalho, defeitos, drift e custo. | As frases “essa situação é comum”, “mais frequente com agentes”, “a literatura identifica” e “pode acelerar/manter memória” precisam de fonte ou força modal. O artigo não é validação independente; o attachment não é uma URL pública auditável. As referências [3], [5]–[7] originais estão incompletas/agregadas. O exemplo de cancelamento não é caso real e não prova resultados. | Publicar como ensaio/proposta, com esquema de estados, artefatos, papéis, protocolo de avaliação e distinção estrita entre hipótese de negócio, entendimento de stakeholder e requisito verificável. | É a síntese central, mas absorve vocabulário de R1–R5. O risco é rebranding: “conversa + Example Mapping + SDD + TDD + rastreabilidade” precisa ser apresentado como orquestração testável, não como disciplina nova. |

**Redundâncias principais.** (a) R1 e R4 usam taxonomias/estados e linguagem de confiança sem instrumento independente; (b) R2, R3 e R4 descrevem SDD, governança, provenance e agentes em níveis diferentes, mas nenhuma apresenta operação reproduzível; (c) R5 é evidência de código/benchmark, não de processo ou resultado de produto; (d) R6 é a única peça que explicita a fronteira com ER/TDD e a dupla validação entendimento–negócio, mas também é autoral. A cadeia deve ser lida como **mapa de propostas**, não como seis confirmações convergentes.

## 2) Mapa de evidências externas

A força das fontes é classificada em cinco tipos: **direta** — estudo ou artefato que mede a tarefa/objeto; **relacionada** — evidencia componente próximo, não o workflow completo; **fundamento teórico/normativo** — conceito, norma ou modelo prescritivo; **experiência prática** — documentação, relato industrial ou prática de fornecedor; **hipótese** — integração proposta pelo projeto sem demonstração externa.

| Evidência | Tipo | Afirmação que sustenta | Limitação que impede extrapolação |
|---|---|---|---|
| ISO/IEC/IEEE 29148:2018 [9] e SWEBOK v4.0a [10] | Fundamento teórico/normativo | ER envolve elicitação, análise, especificação, validação, gestão, iteração, critérios e rastreabilidade; requisitos devem ser identificados e geridos. | Não são experimentos, não validam LLMs ou Vibe Spec-ing e não estabelecem que mais documentação reduz defeitos. |
| NASA Stakeholder Expectations, Technical Requirements e checklist de requisitos [11–13] | Fundamento/experiência institucional | Necessidades respondem ao problema sem prescrever solução; goals/objectives tornam resultados mensuráveis; pressupostos, restrições, interfaces, rationale e verificabilidade devem ser explicitados. | Guias prescritivos voltados a sistemas/NASA; não demonstram causalidade nem um nível universal de rigor para software exploratório. |
| Rittel & Webber [7] | Fundamento teórico | Problemas wicked têm limites e critérios contestáveis; desacordo normativo não é simplesmente uma lacuna factual. | Não testa os seis tipos de incerteza, S0–S5 ou Vibe Spec-ing. |
| Heath et al., EVSI [8] | Fundamento metodológico direto para EVSI | O valor esperado de informação depende de alternativas, estados/parâmetros, probabilidades, utilidade e desenho da investigação; implementação imperfeita altera o valor. | Não fornece fórmula para “ganho de novo enquadramento”, custo cognitivo ou regra universal de parada em formulação aberta. |
| Ferrari et al. [14] e Burnay et al. [15] | Direta, relacionada à elicitação | Ambiguidades podem revelar conhecimento tácito; stakeholders omitem tópicos e perguntas proativas/checklists podem revelar assuntos não espontâneos. | 34 entrevistas e contextos específicos; não demonstram completude garantida nem efeito de LLM. |
| Ferrari et al. [16] | Direta, relacionada | Requisitos evoluem e são co-criados: apenas parte do conteúdo pós-entrevista era rastreável às ideias iniciais e surgiam tópicos novos. | Participantes e cliente fictícios, domínio móvel e análise exploratória; não mede valor, adoção ou Vibe Spec-ing. |
| Rueda et al. [17] | Direta, relacionada | Em experimentos com estudantes, prototipagem em papel encontrou mais requisitos e melhor completude/qualidade funcional; JAD favoreceu não funcionais, mas foi mais lento. | Tarefa acadêmica e cliente simulado; não autoriza escolher protótipo como melhor em todos os contextos. |
| Example Mapping, Cucumber [18] | Experiência prática | História, regras, exemplos, perguntas/assunções e fora de escopo são um formato operacional para conversa curta antes do desenvolvimento. | Documentação de prática; não é prova de redução de defeitos, retrabalho ou validação de negócio. |
| Montgomery et al. [19] | Direta, relacionada | Ambiguidade, completude, consistência e correção estão entre os atributos mais usados em pesquisa de qualidade de requisitos; a literatura é heterogênea. | Mapeamento de estudos, não instrumento pronto nem evidência de benefício de LLM. |
| Ronanki et al. [20] | Direta, estreita | ChatGPT mostrou capacidade parcial em respostas estáticas avaliadas por especialistas em abstração, atomicidade, consistência, correção e compreensibilidade. | Seis perguntas e poucas respostas; sem diálogo adaptativo, baseline de processo, software ou resultado de produto. |
| Krishna et al. [21] | Direta, estreita | GPT-4/CodeLlama podem gerar e revisar SRS em cenário controlado; há comparação por oito critérios e falhas em interfaces/restrições. | Caso universitário, poucos avaliadores e prompts/modelos específicos; não demonstra completude de domínio, operação ou custo total. |
| Bashir et al. [22] | Direta, industrial e estreita | Few-shot aumentou desempenho médio de detecção de ambiguidade em três conjuntos industriais; explicações foram avaliadas por especialistas. | Tarefa classificatória, domínio específico e sem implementação, defeitos ou workflow multi-turno. O PDF é a URL verificável; não foi localizado DOI confiável. |
| Zadenoori et al. [23] | Relacionada, revisão preliminar | A literatura LLM4RE é majoritariamente laboratorial e pouco integrada a workflows complexos; a revisão reporta ausência de field experiments no corpus analisado. | Preprint, temporalmente sensível e explicitamente preliminar; não sustenta ausência absoluta de estudos posteriores. |
| Gotel & Finkelstein [26], Ramesh & Jarke [27], Mucha et al. [30] | Direta/relacionada à rastreabilidade | É necessário preservar rastreabilidade pré-especificação — fontes, decisões e rationale — e pós-especificação — requisito, design, código, testes e releases; links têm tipos e custos. | Estudos anteriores a LLMs; não definem autoridade de produto nem corrigem automaticamente semântica de links. |
| Rempel & Mäder [28] | Direta observacional | Em 24 projetos open source, completude de rastreabilidade associou-se a menor taxa esperada de defeitos. | Associação não prova causalidade universal nem valida conversa com IA. |
| Fucci et al. [29] | Direta, experiência industrial | Links requisitos–testes ausentes impediram validar uma intervenção de qualidade, mostrando que rastreabilidade é limitação operacional/epistemológica. | Um contexto industrial; não prova que criar links, por si só, resolveria o problema. |
| PROV-DM [31] e NIST AI RMF/AI 600-1 [24–25] | Fundamento normativo/técnico | Proveniência pode representar entidades, atividades, agentes, derivação e responsabilidade; governança de IA recomenda papéis, documentação, monitoramento e revisão contínua. | Modelos e frameworks não capturam automaticamente todos os fatos, não garantem autoridade, verdade ou efeito causal dos controles. |
| Böckeler [33] e Spec Kit [48] | Experiência prática/relacionada | SDD é semanticamente instável: spec-first, spec-anchored e spec-as-source são níveis distintos; ferramentas prescrevem Specify→Plan→Tasks→Implement com checkpoints. | Análise exploratória e documentação de fornecedor; não há validação longitudinal, comparação independente ou garantia contra drift. |
| Rafique & Mišić [34] e Tosun et al. [35] | Direta/relacionada a TDD | TDD teve efeito médio pequeno em qualidade e pouco efeito em produtividade; efeitos dependem de tarefa, experiência e complexidade. | Não trata descoberta de intenção, agentes ou Vibe Spec-ing; resultados não devem ser transferidos para o workflow inteiro. |
| EvalPlus [36] e SWE-bench [referência na lista de fontes do corpus] | Direta para limites de testes | Testes ampliados capturam erros que os testes originais não capturam; passar testes é apenas evidência de comportamento coberto. | Benchmarks de código não medem valor, segurança, operação, intenção ou negócio. |
| DORA [37], ISO/IEC/IEEE 15939 [44] e ISO/IEC 25010 [45] | Fundamento/experiência prática | Medição deve ter necessidade de informação, unidade, fonte, baseline, validade e decisão; operação pode ser acompanhada por throughput/instabilidade e qualidade por atributos separados. | Não são prova causal do Vibe Spec-ing e não fornecem limiares universais. |
| Peng et al. [38], Cui et al. [39] e Becker et al. [40] | Direta, contraditória e relacionada à produtividade | Experimentos controlados encontraram ganhos em tarefas específicas e um RCT de campo reportou aumento de tarefas; outro RCT em desenvolvedores experientes encontrou 19% mais tempo. | Populações, ferramentas, tarefas e métricas distintas; nenhum testou Vibe Spec-ing ou o custo downstream completo. |
| SEC/Zillow [43] e MCP [42] | Direta para fatos/escopo técnico, relacionada ao projeto | O filing sustenta write-down de US$ 407,9 milhões e dependência de valuation/modelos; MCP define integração e recomenda consentimento/controle, mas não impõe segurança no protocolo. | Não prova a cadeia causal narrada pela referência nem que MCP seja fronteira de segurança suficiente. |
| **Integração proposta pelo projeto** | Hipótese | Um workflow humano–LLM com perguntas proativas, proveniência, critérios, exemplos, rastreabilidade e revisão pode reduzir fricção e perda de contexto sem substituir autoridade humana. | Não foi localizado estudo controlado/longitudinal do workflow completo frente a baseline humana/híbrida. |

**Acessos e metadados.** Foram usados URLs verificáveis e, quando a página integral estava fechada, apenas resumo/metadados ou postprint explicitamente identificado. O attachment web `attachment:/home/ubuntu/upload/pasted_content.txt` não é uma fonte web pública; o arquivo local foi lido diretamente. Páginas de artigos IEEE/ACM/Elsevier e a norma 29148 podem exigir assinatura. O status “2026” de algumas páginas autorais, Cucumber e DORA é o que a própria página informa na auditoria; não deve ser usado como evidência histórica sem rechecagem. A ausência de DOI confiável para Bashir [22] deve permanecer explícita.

## 3) Matriz de lacunas

| Lacuna / classe | Importância para a tese | O que existe | O que falta | Fonte possível | Decisão dependente | Próximo passo mínimo |
|---|---|---|---|---|---|---|
| **Eficácia do workflow completo** — empírica crítica | Sem ela, só é possível afirmar plausibilidade e utilidade editorial. | Estudos de componentes de elicitação, SRS, ambiguidade e produtividade [14–23, 38–40]. | Comparação end-to-end de Vibe Spec-ing com baseline humano/híbrido, incluindo evolução, código e operação. | RCT, stepped-wedge ou estudo longitudinal em equipes reais. | Se o artigo pode dizer “melhora resultados” ou apenas “propõe um workflow”. | Pré-registrar protocolo com 2 braços e pelo menos uma feature/issue por participante/equipe; não publicar efeito antes do resultado. |
| **Definição e novidade** — conceitual | Evita tautologia e rebranding de ER + BDD + SDD + TDD. | Definição operacional em R6; SDD instável [33, 48]. | Mecanismo distintivo, fronteiras, entradas/saídas, papéis, gates e comparação conceitual/empírica. | Revisão de escopo e análise comparativa com 29148/SWEBOK, BDD, SBE, TDD e SDD. | Se o termo é nome editorial ou contribuição disciplinar. | Fixar uma frase operacional e uma tabela de diferenciação; retirar alegações de método consolidado. |
| **Completude de requisitos** — medição | Sem conjunto independente não é possível dizer que a IA encontrou omissões. | Checklists, estudos de tópicos omitidos, métricas de qualidade [11–15, 19]. | Gold set de necessidades, NFRs, exceções e decisões adjudicado por especialistas/owners. | Panel de stakeholders, artefatos reais, ISO/SWEBOK. | Se “sugeriu cenários” vira “encontrou cenários esquecidos”. | Para uma feature, criar gold set cego e medir recall ponderado por risco e precisão das afirmações. |
| **Ambiguidade, correção e consistência** — medição | Fluência não é qualidade; conflitos podem ser apagados por resumo. | Taxonomias de ambiguidade e estudos controlados de LLM [14, 19–22]. | Rubrica, avaliadores cegos, interpretações concorrentes, oráculos e critérios para contradições entre artefatos. | Ferrari, Montgomery, requisitos adjudicados e testes ocultos. | Se texto aprovado pode entrar em baseline. | Definir protocolo de anotação e reportar kappa/alfa, falsos negativos e taxa residual. |
| **Validação de negócio** — fronteira epistemológica | Impede que concordância em conversa seja vendida como adoção, valor ou causalidade. | Artigo distingue os níveis; Lean Startup/experimentação oferecem linguagem relacionada. | Hipóteses falsificáveis, público, métrica, limiar, duração e contrafactual. | Telemetria, experimento de produto, dados de atendimento/receita, entrevistas independentes. | Se uma mudança deve ser implementada, pivotada ou abandonada. | Para cancelamento, escrever uma hipótese de redução de tickets e um teste externo separado da sessão de elicitação. |
| **Proveniência pré-especificação** — governança | A maior fonte de perda pode ocorrer antes da spec; links posteriores não recuperam rationale ausente. | Gotel/Finkelstein, Ramesh/Jarke e Mucha [26–30]. | Registro íntegro de conversa, fonte, prompt, modelo, decisão, alternativa rejeitada, owner e aprovação. | W3C PROV, sistema de eventos, repositório versionado, revisão humana. | Se o grafo é auditável e se uma decisão pode ser reexecutada. | Criar esquema mínimo `source → claim/decision → spec` com ID, tipo de link, confiança e aprovador. |
| **Autoridade e adjudicação** — organizacional | Sem autoridade, “fonte da verdade” é slogan e conflitos viram edição silenciosa. | R6 propõe política; literatura de rastreabilidade mostra papel de pessoas e cultura [27, 30]. | Matriz de decisão, papéis, quorum/owner, conflito, exceção e aceite de risco. | Stakeholders reais, governança organizacional, ISO/SWEBOK e NIST. | Qual artefato vence em conflito e quem pode aceitar risco. | Publicar matriz: produto decide valor; domínio/regulação decide restrição; engenharia decide design; testes verificam oráculos; LLM propõe. |
| **Drift semântico** — técnica e operacional | Versionamento/coesão temporal não garante que intenção continua representada. | Estudos de coevolução de código/testes e change management [32, 46]. | Definição de drift, links semânticos, detectores, precisão/recall e procedimento de correção. | Histórico de commits, mudanças, incidentes, testes e adjudicação. | Quando bloquear merge/deploy ou reabrir a spec. | Implementar checks para spec incompatível, requisito órfão, teste sem requisito e código sem change record. |
| **Segurança, privacidade e regulação** — risco alto | Conversa pode expor dados regulados e gerar decisões inseguras; nenhum texto fluente resolve isso. | NIST/MCP recomendam governança e consentimento [24, 25, 42]. | Threat model, retenção, classificação, autorização, exfiltração, prompt injection, auditoria e incident response. | NIST AI RMF/GenAI, política interna, revisão de segurança e testes adversariais. | Se o workflow pode operar em domínio regulado. | Fazer DPIA/threat model de um piloto e definir dados proibidos, logs, redaction, aprovação e fallback. |
| **Taxonomia de seis incertezas e S0–S5** — construto | Pode orientar diagnóstico, mas não pode ser apresentado como decomposição estabelecida/exaustiva. | R1 e antecedentes de decisão/PSM. | Definições, exemplos, critérios de distinção, sobreposição, confiabilidade entre avaliadores e poder preditivo. | Estudo Delphi + casos codificados + análise de fatores/cluster se apropriado. | Se a taxonomia entra no núcleo do método ou fica como heurística. | Publicar um codebook e testar dois avaliadores em dez casos antes de usar categorias como métricas. |
| **Regra de parada e λ** — decisão/medição | Evita hiper-resolução e falsa precisão, mas ainda é fórmula sem operacionalização. | EVSI tem formalização restrita [8]; R1 propõe os demais termos. | Unidades, estimadores, pesos, limiares, calibração, participantes e decisão sob conflito normativo. | Experimentos de escolha, análise de decisão e estudos de tempo/carga cognitiva. | Quando encerrar investigação e aceitar incerteza residual. | Renomear como heurística; testar uma rubrica ordinal de ganho/custo antes de qualquer equação. |
| **Reprodutibilidade das referências autorais** — auditabilidade | Impede usar casos internos como prova independente. | R5 tem repositório e reprodução parcial; R2/R3/R4 não têm logs completos. | Branch/commit/dataset fixos, artefatos, métricas, baseline, resultados e falhas. | Repositórios, releases, logs, auditoria externa. | Se um número pode ser citado como resultado. | Fixar snapshot, gerar relatório limpo e arquivar config/dataset; separar “relato autoral” de “reprodução”. |
| **Custo total e sustentabilidade** — econômica | Ganho inicial pode ser consumido por revisão, retrabalho, operação, segurança e manutenção. | ISO 15939/25010, DORA, COCOMO e estudos de produtividade [37–40, 44–45]. | TCO por feature/release, custo de contexto/inferência, revisão, defeitos, manutenção e descontinuação. | Telemetria de uso, contabilidade, tickets, incidentes, esforço e releases. | Se o workflow é economicamente melhor, não apenas mais rápido no primeiro rascunho. | Criar plano de custos com denominadores e separar custos upstream/downstream. |
| **Exemplo de cancelamento** — comunicação | O exemplo é pedagogicamente forte, mas pode ser confundido com caso e resultado. | Cenário sintético no artigo [6]. | Marcadores explícitos de hipótese, autoridade, jurisdição, dados, critérios e resultado. | Dados reais somente se autorizados; caso contrário, gold scenario sintético. | Se pode ser usado como ilustração ou evidência. | Rotular cada frase como observação, hipótese, decisão, requisito, regra ou pergunta aberta; remover “regras reais” não fornecidas. |

## 4) Definição operacional provisória de Vibe Spec-ing

### 4.1 Definição

**Vibe Spec-ing** é um **workflow humano–LLM, governado por artefatos e autoridade humana**, para elicitar, externalizar, testar e evoluir intenção de produto/sistema em requisitos e critérios verificáveis, mantendo explícitos contexto, escopo, fora de escopo, pressupostos, alternativas, decisões, perguntas abertas, proveniência e relações com design, tarefas, código, testes, implantação e observação.

A definição é deliberadamente estreita: o LLM pode perguntar, resumir, propor cenários, detectar conflitos, recuperar contexto, sugerir links e preparar mudanças; **não recebe por padrão autoridade para decidir valor, risco, conformidade, aceitação ou verdade de domínio**. A eficácia desse workflow é hipótese, não propriedade estabelecida.

### 4.2 Escopo

Inclui:

- investigação de intenção, problema/necessidade, objetivo e alternativas;
- elicitação conversacional com perguntas proativas e preservação de interpretações concorrentes;
- registro de pressupostos, restrições, dependências, exceções, riscos e autoridade;
- microvalidação de entendimento por exemplos, contraexemplos, protótipos ou cenários;
- derivação de critérios verificáveis e planejamento proporcional ao risco;
- rastreabilidade e proveniência entre intenção, spec, design, tarefa, código, teste, deploy e observação;
- atualização governada após evidência, incidente, mudança de política ou feedback.

### 4.3 Não objetivos

Vibe Spec-ing **não é**:

1. um método validado ou uma norma de Engenharia de Requisitos;
2. substituto de ER, ISO/IEC/IEEE 29148, análise de domínio, segurança, arquitetura ou governança;
3. validação de hipótese de negócio por aprovação conversacional;
4. garantia de completude, correção, ausência de alucinação ou eliminação de drift;
5. SDD automaticamente entendido como “spec é fonte única da verdade”;
6. TDD, BDD ou Example Mapping com novo nome;
7. autorização para agente decidir produto, risco, conformidade ou trade-offs;
8. prova de produtividade, redução de defeitos, custo ou valor;
9. uma equação universal de parada, de EVSI ou de penalidade de hiper-resolução.

### 4.4 Spec-first e spec-retrospectivo

| Modo | Finalidade | Entrada | Saída esperada | Risco epistemológico | Medida mínima |
|---|---|---|---|---|---|
| **Spec-first** | Reduzir incerteza e alinhar intenção antes da implementação. | Pedido, contexto, evidências, stakeholders, restrições e perguntas abertas. | Spec provisória/versionada, critérios, exemplos, alternativas, owner e aprovação por tipo de decisão. | Ancoragem precoce: a spec pode congelar uma interpretação ou invenção do LLM. | Recall/precisão contra gold set, ambiguidade residual, tempo de adjudicação e taxa de reabertura. |
| **Spec-retrospectivo** | Reconstruir intenção, decisões e lacunas após código, logs ou incidentes. | Repositório, tickets, commits, testes, telemetria, conversas e relatos humanos. | Spec reconstruída com origem de cada afirmação, incerteza, conflitos e itens a confirmar; nunca apagar o histórico. | Pós-racionalização: o resumo pode tornar coerente o que foi acidental e atribuir intenção inexistente. | Precisão dos links e aprovação por owners; proporção de afirmações “não conhecida”; discrepâncias encontradas. |

Os modos podem compor um ciclo, mas devem ser avaliados separadamente. Spec-first pergunta “o que deveria ser feito?”; retrospectivo pergunta “o que foi decidido/implementado e com que evidência?”.

### 4.5 Limites frente a ER, SDD e TDD

| Abordagem | Unidade principal | O que oferece | O que não garante | Relação com Vibe Spec-ing |
|---|---|---|---|---|
| **ER/29148/SWEBOK** | Necessidades, requisitos, validação e gestão no ciclo de vida. | Processo, atributos, rastreabilidade, mudança e técnicas. | Não prova que LLM ou um workflow específico funciona. | Baseline disciplinar e de qualidade; Vibe Spec-ing é interface/orquestração possível dentro dela. |
| **BDD/SBE/Example Mapping** | Conversa, regras, exemplos e aceitação. | Ponte legível entre intenção e comportamento selecionado. | Não garante completude, valor de negócio ou oráculos corretos. | Técnicas que podem ser usadas no estágio de exemplos/microvalidação. |
| **SDD** | Spec antes/ao redor da geração e implementação. | Pode organizar spec, plano, tarefas e código. | Rótulo instável; não elimina drift nem substitui ER. | Vibe Spec-ing pode alimentar SDD, mas deve declarar se a spec é first, anchored ou source. |
| **TDD** | Comportamento codificado e teste executável. | Feedback local, regressão e descoberta de defeitos no oráculo escolhido. | Não descobre intenção, valor, requisitos ausentes ou oráculo errado. | Camada posterior/adjacente; não concorrente nem prova global. |

**Teste contra tautologia/rebranding.** O termo só agrega valor se especificar: entradas e estados; perguntas e gates; tipos de artefato; autoridade; proveniência; política de divergência; critérios de avanço/retorno; métricas; custo e limites. Dizer “conversa com IA que gera uma spec” não é contribuição suficiente.

## 5) Modelo cíclico: Intenção → investigação → pressupostos → exemplos/microvalidações → critérios → planejamento proporcional → implementação/testes → observação → revisão

O modelo é um ciclo, não um funil linear. O avanço deve ser reversível; qualquer etapa pode retornar à anterior quando surge evidência conflitante, omissão, incidente ou mudança de autoridade.

| Etapa | Entrada e perguntas | Atividades humanas | Apoio permitido da IA | Artefatos | Condição de avanço | Retorno | Responsável primário | Riscos e controles |
|---|---|---|---|---|---|---|---|---|
| **1. Intenção** | Pedido, dor, contexto. O que foi observado? É sintoma, necessidade, objetivo ou solução sugerida? Quem quer o quê e por quê? | Nomear problema/necessidade sem prescrever design; identificar autoridade, valor, risco e stakeholders. | Reformular sem colapsar níveis; listar interpretações; pedir evidências faltantes. | Registro de intenção, fonte, sintoma, objetivo hipotético, stakeholders, fora de escopo inicial. | Há distinção entre observado, inferido e assumido; owner e pergunta de sucesso definidos. | Para investigação ou reabrir fonte se a intenção se contradiz. | Product owner/autoridade de negócio, com analista. | Solução prematura, ancoragem, prompt injection, “reduzir tickets” tratado como requisito. Controlar com campos tipados e alternativas. |
| **2. Investigação** | Intenção e contexto. Quais atores, fluxos, limites, dados, interfaces, regras, exceções, NFRs, legislação e operação importam? | Entrevistar, revisar fontes, perguntar proativamente, mapear As-Is/To-Be e conflitos. | Checklist de tópicos, recuperação com citações, perguntas adaptativas, matriz de lacunas. | Mapa de contexto, glossário, evidências, perguntas abertas, interpretações concorrentes, conflitos. | Incertezas de alto impacto foram localizadas e fontes/autoridade registradas; não significa “tudo resolvido”. | Para pressupostos, intenção ou investigação adicional. | Analista/facilitador com stakeholders. | LLM inventa contexto ou harmoniza conflito. Controlar com open-world, abstenção e citação verificável. |
| **3. Pressupostos** | Fatos alegados, conhecimento tácito, dependências e desconhecidos. O que precisa ser verdade? O que falsificaria? | Classificar fato/hipótese/desconhecido; atribuir owner, confiança, impacto, teste e data de revisão. | Extrair candidatos, detectar frases sem evidência, propor testes; nunca promover automaticamente a requisito. | Registro de pressupostos: ID, fonte, confiança, impacto se falso, teste, owner, expiração/trigger. | Pressupostos críticos têm confirmação, plano de teste ou aceitação explícita de risco. | Para investigação ou revisão após resultado. | Owner do domínio/risco. | Falsa precisão, confiança do modelo confundida com probabilidade. Controlar com escalas e evidência independente. |
| **4. Exemplos/microvalidações** | Regras candidatas, alternativas, protótipo, hipótese. O que conta como normal, alternativo, negativo, fronteira? A pergunta é sobre entendimento, viabilidade, usabilidade ou valor? | Facilitar Example Mapping; criar contraexemplos; decidir representação mínima; separar feedback de decisão. | Gerar cenários candidatos e perguntas; simular casos marcados como sintéticos; ligar cada cenário a regra/fonte. | História, regra, exemplo, contraexemplo, pergunta, fora de escopo, protótipo, resultado e decisão. | Stakeholders com autoridade confirmam significado/escopo/oráculo escolhido; hipótese de negócio segue em experimento separado. | Para investigação, pressupostos ou critérios. | Product/domain owner; UX/engenharia conforme pergunta. | Aprovação vira “demanda”; protótipo sedutor ancora; casos sintéticos são tratados como realidade. Controlar por rótulos e protocolo. |
| **5. Critérios** | Intenção, evidências, regras e exemplos. Como saberemos que o requisito é verificável? Qual NFR, limite, observabilidade e oráculo? | Redigir requisitos identificados, objetivos e métricas; revisar clareza, completude, consistência, correção, verificabilidade e racionales. | Sugerir formulações “o quê, não como”; lint de termos vagos; detectar conflitos e gerar candidatos a testes. | Spec versionada, critérios de aceitação, NFRs, matriz requisito–oráculo–teste, rationale, status e aprovação. | Critérios têm owner, fonte, método de verificação e status; lacunas críticas ficam explícitas. | Para exemplos, pressupostos ou investigação. | Analista/engenharia; aceite de produto/domínio. | Green test com oráculo ruim; requisito implementacional; métrica sem unidade. Controlar com revisão independente e testes ocultos. |
| **6. Planejamento proporcional** | Critérios, risco, criticidade, interfaces, vida útil, volatilidade, custo de falha. | Escolher rigor, arquitetura, incrementos, segurança, observabilidade, rollback, evidência e tarefas. | Decompor tarefas, sugerir riscos/dependências, comparar alternativas; não decidir trade-off de produto sem autoridade. | Plano, ADRs, matriz de risco, tarefas, dependências, gates, plano de reversão e medição. | Rigor e gates são justificados; riscos de alta consequência têm controle e owner. | Para critérios ou intenção se o plano revela inviabilidade. | Engenharia/arquitetura; produto decide trade-offs. | Cerimônia excessiva ou omissões; plano gerado parece consenso. Controlar com tailoring documentado. |
| **7. Implementação/testes** | Plano, critérios aprovados, tarefas e contratos. | Codificar, revisar, aplicar TDD/BDD quando adequado, testar unidades/integração/aceitação/segurança/performance e registrar diffs. | Recuperar contexto autorizado, propor patch/testes, executar ferramentas com escopo, relatar incerteza e falhas. | Código, testes, logs de execução, PR, diff, build, SBOM/configuração, links para requisito. | Gates técnicos, testes independentes/ocultos e revisão humana passam; nenhum requisito de alto risco órfão. | Para critérios se falha é de entendimento; para revisão se falha é de implementação; para investigação se contexto é insuficiente. | Engenharia; QA/segurança independentes quando necessário. | Execução indevida, secrets, dependências, testes fracos, código fora do escopo. Controlar least privilege, sandbox, review e hidden tests. |
| **8. Observação** | Deploy autorizado, instrumentação, objetivos e SLOs. | Monitorar uso, tickets, erros, incidentes, custos, feedback, segurança e comportamento de negócio; distinguir correlação de causa. | Resumir telemetria, detectar anomalias, agrupar feedback, sugerir divergências; não declarar causalidade sozinho. | Métricas, incidentes, experimentos, feedback, change records, evidência de resultado e custo. | Há janela/critério de observação suficiente e decisão explícita: manter, corrigir, reabrir ou abandonar. | Para revisão, pressupostos ou hipótese de negócio. | Operação + produto + segurança/risco. | Métrica proxy, sazonalidade, feedback enviesado, drift de modelo. Controlar baseline, segmentação e revisão. |
| **9. Revisão** | Observações, incidentes, mudanças regulatórias, feedback, diffs e artefatos. | Adjudicar divergências; atualizar intenção/spec/testes/código; registrar rationale e decidir nova iteração. | Comparar versões, localizar links órfãos/drift, preparar change record e alternativas; nunca apagar histórico. | Nova versão, decisão, análise de impacto, aprovação, links, changelog, estado de drift e plano de follow-up. | Mudança propagada e verificada ou risco aceito explicitamente; versão publicada. | Para qualquer etapa. | Owner da decisão afetada; auditoria/revisão independente quando risco alto. | Pós-racionalização, “fonte única” ilusória, mudança sem propagação. Controlar append-only history e checklist de impacto. |

## 6) Política de governança de intenção, especificação, testes e código

### 6.1 Autoridade por tipo de decisão

A organização deve separar **autoridade** de **assistência**. O LLM pode propor relações, resumos ou patches; não é aprovador padrão.

| Artefato/estado | Autoridade principal | O que ele decide | O que não garante |
|---|---|---|---|
| Intenção/rationale | Produto e stakeholders com autoridade de valor | Por quê, objetivo, trade-offs, alternativas rejeitadas, risco aceito | Correção da hipótese de negócio ou resultado futuro |
| Necessidade/problema/objetivo | Produto + domínio + stakeholders afetados | Condição a tratar e outcome desejado | Que a solução escolhida produzirá o outcome |
| Especificação/requisito | Engenharia de requisitos + owner do domínio/produto | Escopo, restrições, capacidades e critérios verificáveis | Que o código esteja conforme sem verificação |
| Design/ADR | Engenharia/arquitetura, dentro dos limites aprovados | Como realizar, dependências, trade-offs técnicos | Que a necessidade ou valor estejam corretos |
| Teste/oráculo | QA/engenharia + especialista do domínio quando necessário | O que será verificado e como | Completude do domínio, segurança total ou valor |
| Código/build/deploy | Engenharia/ops sob gates | Realização atual e artefato promovido | Preservação automática da intenção |
| Produção/telemetria/incidente | Operação + produto + risco | O que ocorreu e quais sinais requerem ação | Explicação causal sem análise |
| LLM/agente | Nenhuma autoridade substantiva por padrão | Propor, recuperar, transformar, executar dentro do escopo autorizado | Aprovar valor, risco, compliance, verdade ou aceite |

### 6.2 Política de divergência

1. **Não há uma fonte universal de verdade.** Intenção, spec, testes, código e produção são evidências/artefatos de papéis distintos.
2. Cada conflito recebe um estado explícito: `não conhecido`, `ambíguo`, `spec desatualizada`, `teste sem requisito`, `requisito sem teste`, `código fora da spec`, `produção divergente`, `risco aceito`, `bloqueado` ou `resolvido`.
3. Conflito de valor/escopo vai ao owner de produto; conflito de domínio/regulação ao especialista autorizado; conflito de implementação à engenharia; conflito de oráculo à engenharia + domínio; conflito de segurança a função independente de segurança/risco.
4. Toda decisão registra solicitante, data, gatilho/evidência, alternativas, impacto, decisão, autoridade, artefatos afetados, aprovadores e verificação posterior.
5. O agente nunca harmoniza silenciosamente versões conflitantes. Se não puder provar a relação, registra **não conhecido** ou propõe um link com status `inferido`.

### 6.3 Versionamento e proveniência

Cada artefato deve ter ID estável, versão, status, owner, classificação de risco, data, autoridade e hash/ponteiro. A proveniência mínima registra:

- origem: stakeholder, documento, ticket, dado, incidente ou observação;
- transcrição, resumo e prompt, quando usados;
- modelo, versão/configuração, ferramentas, contexto recuperado e fontes consultadas;
- transformação: quem/qual agente produziu, revisou ou alterou o artefato;
- decisão humana, aprovação, rejeição, rationale e conflito existente;
- links tipados: `satisfaz`, `depende-de`, `evolui-de`, `justifica`, `verifica`, `implementa`, `implantado-em`, `observado-em`, `contradiz`.

W3C PROV-DM ajuda a representar entidades, atividades, agentes e derivação, mas não captura automaticamente fatos nem garante que uma fonte seja verdadeira [31]. Proveniência deve ser append-only ou auditável, com retenção, acesso e proteção contra adulteração.

### 6.4 Drift e gates

Checks mínimos:

- requisito sem critério/oráculo;
- critério sem teste ou teste sem requisito;
- mudança de código sem change record;
- spec cuja versão não coincide com o commit/build promovido;
- link inferido apresentado como confirmado;
- decisão sem fonte, owner ou aprovação;
- fonte revogada, conflitante ou fora da janela de validade;
- artefato derivado sem prompt/modelo/contexto/provenance;
- produção/incidente que contradiz requisito ou hipótese de negócio.

Um gate de alto risco deve bloquear promoção quando a divergência não é explicada ou aceita por autoridade competente. Em baixo risco, o gate pode registrar exceção com expiração e revisão; tailoring deve ser explícito, nunca inferido da brevidade do prompt.

## 7) Plano de avaliação empírica sem pressupor resultado

### 7.1 Hipóteses pré-registráveis

- **H1 — Qualidade de especificação:** Vibe Spec-ing pode aumentar recall de necessidades, restrições, exceções e decisões sem reduzir precisão, em comparação com uma baseline humana/híbrida equivalente.
- **H2 — Ambiguidade e adjudicação:** pode reduzir ambiguidade residual ou o tempo até uma decisão autorizada, mas pode aumentar ancoragem, falsa concordância ou revisão.
- **H3 — Rastreabilidade:** pode aumentar cobertura e/ou precisão de links pré e pós-especificação; o resultado não é presumido.
- **H4 — Implementação:** critérios produzidos pelo workflow podem melhorar defeitos encontrados por testes ocultos, não apenas green tests escolhidos pelo agente.
- **H5 — Manutenção:** o custo observado de uma mudança autorizada pode ser menor, igual ou maior; medir sem pressupor direção.
- **H6 — Operação e negócio:** qualquer efeito sobre incidentes, tickets, ativação, conversão, retenção, custo de serviço ou receita deve ser testado com desenho de produto apropriado; aprovação da spec não é outcome.
- **H7 — Risco de uso:** o workflow pode reduzir fricção e simultaneamente aumentar overreliance, confiança indevida, exposição de dados ou custo de revisão.
- **H8 — Retrospectivo:** spec-retrospectivo pode recuperar decisões e detectar drift, mas também pode inventar coerência; medir precisão dos links e proporção de “não conhecido”.

### 7.2 Baseline, unidade e desenho

**Baseline:** processo humano/híbrido alinhado a 29148/SWEBOK, com o mesmo contexto, stakeholders, tempo e exigência de revisão, sem a interface Vibe Spec-ing. Comparações com “prompt sem estrutura” devem ser secundárias e não substituir a baseline profissional.

**Tratamentos:** (a) baseline; (b) Vibe Spec-ing spec-first; (c) opcionalmente spec-retrospectivo em tarefas com código existente. Fixar modelo, versão, prompts, ferramentas, permissões, contexto e política de revisão; registrar custo de inferência e tempo humano.

**Unidades:**

- micro: afirmação, pergunta, pressuposto, regra, exemplo, link e decisão;
- tarefa/feature: pacote de intenção, spec, design, código, testes e observação;
- equipe/serviço: fluxo de mudanças e operação;
- release/período: drift, defeitos, manutenção, custo e outcome de produto.

**Desenhos recomendados:** RCT por tarefa/feature quando possível; desenho cruzado com tarefas equivalentes; stepped-wedge por equipe/serviço para adoção gradual; estudo longitudinal de pelo menos vários releases; avaliação retrospectiva em amostra cega de repositórios. Pré-registrar hipóteses, exclusões, métricas e análise de heterogeneidade.

### 7.3 Métricas e limites de inferência

| Dimensão | Métrica mínima | O que permite dizer | O que **não** permite concluir |
|---|---|---|---|
| Completude | Recall de itens do gold set ponderado por risco; cobertura de NFR/exceções | Quantos itens independentes foram capturados. | Que itens não presentes no gold set não foram omitidos; que o produto terá valor. |
| Precisão/correção | Precisão de afirmações contra fontes e adjudicação de domínio | Quantas afirmações/requisitos são sustentados/corretos no conjunto avaliado. | Verdade universal, correção causal ou ausência de erro futuro. |
| Ambiguidade | Taxa residual, interpretações, precisão/recall/F1, perguntas até decisão, concordância | Ambiguidades detectadas e resolvidas sob rubrica. | Completude de entendimento de todos os stakeholders. |
| Consistência | Contradições intra/interartefato, conflitos abertos, tempo de resolução | Coerência dos artefatos avaliados. | Que não existe conflito latente em fontes não observadas. |
| Verificabilidade | Critério com owner, unidade, método, oráculo e resultado; testes ocultos | Critérios selecionados podem ser verificados. | Que o oráculo é o correto ou cobre o domínio completo. |
| Rastreabilidade | Cobertura bidirecional, precisão/recall de links, links órfãos, validade semântica | Qualidade da cadeia de relações. | Causalidade entre rastreabilidade e menos defeitos; links lexicais corretos. |
| Implementação | Defeitos ocultos, mutation score, regressões, falhas de segurança/performance | Comportamentos testados sob oráculos independentes. | Adequação de produto, usabilidade, conformidade ou intenção não representada. |
| Manutenção | Tempo até mudança aceita, compreensão, retrabalho, defeitos introduzidos, reaberturas | Custo observado de mudanças em tarefas definidas. | Manutenibilidade futura geral; MI/LOC isolados são proxies, não oráculos [44–45]. |
| Operação | Lead time, frequência, change fail rate, recovery/rework, incidentes, SLOs [37] | Throughput e instabilidade no serviço comparado. | Que Vibe Spec-ing causou o efeito; que um score isolado é saúde total. |
| TCO | Inferência/licença, revisão, contexto, treinamento, segurança, retrabalho, defeitos, operação e manutenção por feature/release | Custo incremental e custo downstream observados. | ROI universal ou valor de negócio sem contrafactual. |
| Negócio | Métrica pré-registrada de ativação, conclusão, tickets, retenção, conversão, margem ou custo de serviço | Outcome no contexto, com controle/série temporal adequada. | Que a conversa ou a spec causou o resultado sem desenho causal. |
| Fatores humanos | Confiança calibrada, overreliance, carga, abandono de sugestões, qualidade da revisão | Como pessoas usam e conferem o agente. | Segurança e responsabilidade organizacional sem auditoria. |

### 7.4 Fatores de confusão

Modelo/versão e prompt; experiência do desenvolvedor; novidade da ferramenta; tipo de tarefa e tamanho; greenfield/brownfield; qualidade do contexto; pressão de prazo; domínio/regulação; composição e autoridade dos stakeholders; treinamento; seleção de tarefas; sazonalidade; maturidade de testes/telemetria; mudanças de equipe; ferramentas concorrentes; exposição ao tratamento; efeito Hawthorne; aprendizagem e carryover; definição de “tarefa concluída”; qualidade do gold set; avaliador e expectativa; custo de revisar sugestões; mudanças de processo e de produto; disponibilidade de stakeholders; incidentes e releases simultâneos.

### 7.5 Ameaças à validade e controles

- **Validade de construção:** “completude”, “intenção”, “qualidade”, “sustentabilidade” e “drift” podem virar rótulos vagos. Controlar com codebook, exemplos, unidades, gold set, avaliadores cegos e decisões pré-registradas.
- **Validade interna:** equipes que aceitam o agente podem ser mais maduras ou motivadas; tarefas podem ser distribuídas de modo desigual. Controlar com randomização/pareamento, covariáveis, stepped-wedge, análise por intenção de tratar e relato de exposição real.
- **Validade externa:** estudos de estudantes, tarefas curtas, um domínio, um modelo ou um único repositório não representam sistemas regulados, brownfield ou multi-stakeholder. Replicar por domínio, risco, tamanho, idioma, maturidade e vida útil.
- **Validade de conclusão:** métricas correlacionadas podem ser tratadas como resultado único; amostras pequenas geram estimativas instáveis. Relatar intervalos, tamanho de efeito, incerteza, análise de sensibilidade e resultados nulos/negativos.
- **Viés do gold set:** um conjunto construído pelo mesmo time/LLM pode confirmar a saída. Separar construção e avaliação; adjudicar com stakeholders independentes e registrar itens controversos.
- **Efeito de aprendizagem e novidade:** participantes podem melhorar por repetição ou entusiasmo inicial. Usar períodos de adaptação, tarefas equivalentes, ordem balanceada e follow-up de vários releases.
- **Contaminação e drift do modelo:** modelo, prompt, índice, ferramenta e dados mudam. Fixar versões, arquivar contexto/configuração e reexecutar um conjunto de regressão.
- **Risco ético e de segurança:** prompts podem conter dados pessoais, segredos ou código sensível. Minimizar dados, redigir/anonimizar, limitar ferramentas, registrar acesso, obter autorização e realizar threat modeling.
- **Causalidade de negócio:** tickets, conversão e produtividade são afetados por sazonalidade, preço, suporte, equipe e concorrência. Usar controles, séries temporais, experimentos escalonados e declaração explícita de não causalidade quando não houver contrafactual.

### 7.6 Critério de interpretação

Nenhum resultado isolado decide a tese. A conclusão só pode ser graduada assim:

1. **Capacidade do agente:** o modelo executou uma tarefa sob um conjunto e configuração.
2. **Qualidade do artefato:** a saída foi julgada contra fontes e oráculos independentes.
3. **Resultado da tarefa:** uma equipe entregou mudança com custo, defeitos e revisão observados.
4. **Resultado operacional:** releases, incidentes, recuperação e manutenção mudaram em uma série temporal.
5. **Resultado de negócio:** um outcome de produto mudou sob desenho causal ou quase-causal.

Passar do nível 1 para o 5 exige nova evidência; não é permitido usar o nível inferior como prova do superior.

## 8) Estrutura editorial refinada preservando o exemplo de cancelamento

A estrutura abaixo transforma o artigo atual em um ensaio publicável e auditável, sem vender o exemplo como caso ou resultado.

| Seção editorial proposta | Objetivo | Ajustes de conteúdo e força da alegação |
|---|---|---|
| **Título e nota epistemológica** | Dizer imediatamente que se trata de enquadramento/proposta. | Subtítulo sugerido: “um workflow humano–LLM em desenvolvimento”. Declarar que não há validação causal do workflow completo. |
| **1. A frase que parece suficiente** | Introduzir a frase “Precisamos reduzir tickets de suporte sobre cancelamento de assinatura”. | Manter a cena, mas rotular como **cenário sintético**. Trocar “essa situação é comum” por “essa situação é plausível” ou inserir fonte de prevalência. |
| **2. Sintoma, necessidade, objetivo, requisito e solução** | Evitar colapsar pedido, problema e design. | Explicar que “reduzir tickets” é outcome/hipótese; não é automaticamente problema, requisito ou solução. Usar campos separados e [11–13]. |
| **3. Entendimento versus negócio** | Fixar a distinção central. | Conversa pode corrigir significado, regras e escopo; não prova adoção, receita, redução de tickets ou compliance. Citar [9, 24–25]. |
| **4. Investigar antes de especificar** | Mostrar perguntas e preservação de interpretações. | Manter perguntas sobre acesso, ciclo, reembolso, fraude, retenção, jurisdição e fora de escopo. Apresentar LLM como apoio a perguntas/candidatos, não como descobridor de omissões. Citar [14–16]. |
| **5. Exemplo mínimo e contraexemplos** | Demonstrar microvalidação de entendimento. | Manter o exemplo do usuário mensal sem pendências, acesso ao fim do ciclo e confirmação por e-mail. Rotular regras fiscais, jurídicas e antifraude como hipóteses do cenário; não como fatos do produto. Usar [18]. |
| **6. Duas microvalidações** | Separar entendimento, viabilidade e negócio. | Criar subquadro: “o que foi esclarecido” versus “o que ainda precisa de evidência externa”. Exemplo: stakeholder confirma regra; experimento/telemetria testa se a solução reduz tickets. |
| **7. Especificação evolutiva e papéis distintos** | Evitar “fonte única da verdade”. | Preservar tabela intenção/spec/teste/código; acrescentar produção e autoridade. Citar [9–10, 26–31]. |
| **8. Planejamento proporcional e implementação** | Ligar risco ao rigor. | Explicar que low-risk pode usar registro leve; alto risco exige rastreabilidade, segurança, validação independente e rollback. Não dizer que menos documento é sempre melhor. |
| **9. Drift, governança e proveniência** | Tornar observável o que a conversa não garante. | Mostrar change record, IDs, owners, links tipados, modelo/prompt/contexto e estados de conflito. Citar [24–25, 31–32]. |
| **10. Relação com ER, BDD, SDD e TDD** | Evitar novidade inflada e competição artificial. | Tabela de camadas: ER governa processo; BDD/SBE/Example Mapping ligam regra a exemplos; TDD dá feedback local; SDD organiza derivação; Vibe Spec-ing propõe orquestração humana–LLM. Citar [9–10, 18, 33–35]. |
| **11. O que a literatura permite dizer** | Separar componente de workflow. | Resumir estudos de elicitação/LLM e produtividade sem transferir resultados. Incluir a revisão preliminar [23] e o resultado contraditório de [38–40]. |
| **12. Protocolo de avaliação** | Converter proposta em agenda falsificável. | Definir baseline, gold set, métricas, custo total, resultados nulos e riscos. Não incluir números de sucesso sem estudo próprio. |
| **13. Conclusão calibrada** | Preservar a utilidade sem prometer eficácia. | “Pode reduzir perda de contexto se governado” como hipótese. Dizer que a contribuição é tornar decisões, incertezas e links mais explícitos; o efeito em ciclo de vida permanece aberto. |

**Tratamento editorial do exemplo.** O cancelamento deve aparecer como fio condutor, não como caso validado. A cada avanço, identificar: (i) fato do cenário; (ii) hipótese de produto; (iii) pergunta aberta; (iv) requisito candidato; (v) critério verificável; (vi) decisão de autoridade; (vii) evidência externa necessária. Não inventar país, política fiscal, prazo de retenção, comportamento de usuário ou resultado de tickets. A frase “progressão recorrente” deve virar “sequência ilustrativa proposta”.

## 9) Backlog priorizado com ações, dependências e critérios de conclusão

| Prioridade | Ação | Dependências | Critério de conclusão verificável |
|---|---|---|---|
| **P0** | Corrigir força das alegações do artigo e das seis referências. | R1–R6 e este relatório. | Todas as frases de eficácia, validação, frequência, segurança, determinismo, completude e “fonte da verdade” têm modalidade adequada e fonte próxima ou foram removidas. |
| **P0** | Completar bibliografia e separar referências agregadas. | [9–25, 33–35] e arquivos acessíveis. | Cada citação tem autor/título/ano/veículo/DOI ou URL; Bashir, Zadenoori, SWEBOK e NASA estão identificados sem metadados suspeitos. |
| **P0** | Fixar a definição operacional e o teste de novidade. | Comparação ER/BDD/SBE/SDD/TDD. | Uma página de definição, não objetivos, spec-first/retrospectivo, papéis, gates e limites; revisão por pelo menos um especialista de ER e um de produto. |
| **P0** | Criar esquema mínimo de artefatos e governança. | Política da seção 6. | IDs, versões, owners, status, autoridade, links tipados, provenance e change record implementados em exemplo versionado; conflitos não são apagados. |
| **P0** | Construir gold set do cenário de cancelamento. | Product/domain owner independente e dados autorizados. | Gold set contém necessidades, objetivos, NFRs, exceções, decisões rejeitadas e perguntas; cada item tem fonte, risco e adjudicação. |
| **P0** | Pré-registrar avaliação sem resultado pressuposto. | Gold set, baseline e métricas da seção 7. | Protocolo define unidade, randomização/pareamento, amostra, critérios, análise, exclusões, custos, riscos e política para resultado nulo. |
| **P1** | Executar piloto de entendimento, sem alegar impacto de negócio. | Gold set, dois braços, avaliadores cegos. | Relatório publica completude/ambiguidade/correção, interavaliador, tempo de revisão, falhas e abstentions; resultado pode ser negativo. |
| **P1** | Implementar checks de drift e links. | Schema de artefatos, repositório e build. | Pipeline detecta requisito órfão, teste sem requisito, mudança sem record, versão incompatível e provenance ausente; falsos positivos/negativos são medidos. |
| **P1** | Definir threat model e política de dados do agente. | Segurança, privacidade, MCP/integrações. | Dados proibidos, retenção, redaction, permissões, aprovação de tools, logs, incidente e fallback aprovados por segurança/privacidade. |
| **P1** | Reproduzir o Case Agents com snapshot limpo e relatório único. | Commit, dataset, dependências e custos definidos. | Relatório separa main/e2dcd7f, métricas com denominadores, testes, falhas, mocks e limites; nenhum número de uma versão é atribuído à outra. |
| **P1** | Rodar estudo retrospectivo de drift. | Histórico de commits, specs, testes, incidentes e links. | Amostra cega de features classifica conflitos e mede precisão/recall de links; “não conhecido” é permitido e contabilizado. |
| **P2** | Estudo longitudinal de mudanças e operação. | Piloto, times participantes, telemetria e vários releases. | Séries de lead time, falha, recuperação, rework, incidentes, manutenção e custo com baseline e controles de sazonalidade. |
| **P2** | Experimento de hipótese de negócio do cancelamento. | Métrica de tickets definida, controle, consentimento e janela. | Hipótese falsificável, população, contrafactual, limiar, riscos, resultado e decisão de perseverar/pivotar/abandonar publicados. |
| **P2** | Testar taxonomia de seis incertezas, S0–S5 e λ. | Codebook, casos variados, avaliadores e desenho de escolha. | Interavaliador, sobreposição, poder preditivo e calibração são reportados; se falhar, manter como metáfora/heurística, não como ontologia. |
| **P2** | Publicar material reprodutível e registrar resultados negativos. | Repositório, licença, dados sintéticos/anonimizados. | Prompts, modelos, versões, contexto, scripts, rubric, dados, logs e decisões de exclusão permitem reexecução independente. |

## 10) Decisão de prontidão

### Decisão: **publicável com ressalvas**

O projeto está pronto para publicação **como ensaio crítico, definição operacional provisória e protocolo de pesquisa**, desde que o texto seja corrigido conforme este relatório. Não está pronto para publicação como método validado, arquitetura comprovadamente auditável, mecanismo de redução de defeitos, prova de segurança, fonte única de verdade ou evidência de produtividade/valor.

**Condições imediatas para publicar:**

1. manter a distinção entre conteúdo autoral e evidência independente;
2. substituir “validado”, “completo”, “sem alucinação”, “determinístico”, “garante”, “prova” e “reduz” por formulações condicionais, ou fornecer estudo adequado;
3. marcar o cancelamento como cenário sintético;
4. completar e corrigir referências, URLs e status de acesso;
5. declarar que os resultados do Case Agents são de benchmark sintético e dependem de commit/branch;
6. declarar que Vibe Spec-ing não tem definição normativa consolidada nem estudo controlado do workflow completo;
7. incluir governança de autoridade, proveniência, drift e divergência, não apenas a conversa;
8. preservar a conclusão negativa: texto fluente, aprovação, teste verde ou rastreabilidade aparente não provam verdade, completude, bom oráculo ou resultado de negócio.

**Condição para mudar a decisão para “pronto como método”:** executar avaliação pré-registrada com baseline humano/híbrido, gold set independente, tarefas reais, avaliadores cegos, vários níveis de risco e follow-up longitudinal. Para alegações de negócio e sustentabilidade, acrescentar contrafactual/controle, custo downstream, segurança, operação e manutenção. Até lá, a formulação correta é: **Vibe Spec-ing é uma hipótese de workflow humano–LLM para reduzir perda de contexto e tornar decisões governáveis; sua eficácia permanece em aberto.**

## Referências

[1]: https://mauricio.issei.com.br/formulacao-de-problemas.html "Formulação de Problemas — Engenharia Interrompida" — página autoral; evidência direta do conteúdo publicado, não de eficácia.

[2]: https://mauricio.issei.com.br/devin.html "Vibe Coding com Devin — De Executor a Orquestrador Cognitivo" — página autoral; relato não reproduzido de forma independente.

[3]: https://mauricio.issei.com.br/apresentacao "Arquitetura de IA auditável" — apresentação/página autoral; desenho de arquitetura, não validação operacional.

[4]: https://mauricio.issei.com.br/engenharia-confianca.html "A Engenharia da Confiança — Da Intenção à Execução Agêntica" — manifesto técnico autoral; hipóteses de governança e arquitetura.

[5]: https://github.com/issei/case-agents "Case Agents: a tool errada não é uma aproximação aceitável" — página/repositório autoral; benchmark de MVP reproduzível em parte, com divergência entre commits.

[6]: file:///home/ubuntu/upload/pasted_content.txt "Vibe Spec-ing: Especificação Conversacional como Ponte entre Descoberta e Engenharia" — arquivo fornecido; fonte autoral local, não URL pública.

[7]: https://doi.org/10.1007/BF01405730 "Dilemmas in a General Theory of Planning" — Rittel & Webber, 1973.

[8]: https://pmc.ncbi.nlm.nih.gov/articles/PMC9189720/ "Calculating Expected Value of Sample Information Adjusting for Imperfect Implementation" — Heath et al., 2022.

[9]: https://standards.ieee.org/standard/29148-2018.html "ISO/IEC/IEEE 29148:2018 — Systems and software engineering — Life cycle processes — Requirements engineering" — norma prescritiva; resumo público.

[10]: https://ieeecs-media.computer.org/media/education/swebok/swebok-v4.pdf "SWEBOK Guide v4.0a — Software Requirements" — IEEE Computer Society; guia de conhecimento, não norma de conformidade.

[11]: https://www.nasa.gov/reference/4-1-stakeholder-expectations-definition/ "NASA Systems Engineering Handbook — Stakeholder Expectations Definition" — orientação institucional, 2023.

[12]: https://www.nasa.gov/reference/4-2-technical-requirements-definition/ "NASA Systems Engineering Handbook — Technical Requirements Definition" — orientação institucional, 2023.

[13]: https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/ "Appendix C: How to Write a Good Requirement — Checklist" — NASA, 2023.

[14]: https://doi.org/10.1007/s00766-016-0249-3 "Ambiguity and tacit knowledge in requirements elicitation interviews" — Ferrari, Spoletini & Gnesi, 2016.

[15]: https://doi.org/10.1016/j.is.2014.05.006 "What stakeholders will or will not say: A theoretical and empirical study of topic importance in Requirements Engineering elicitation interviews" — Burnay, Jureta & Faulkner, 2014.

[16]: https://doi.org/10.1007/s00766-022-00383-7 "How do requirements evolve during elicitation? An empirical study combining interviews and app store analysis" — Ferrari, Spoletini & Debnath, 2022.

[17]: https://doi.org/10.1016/j.infsof.2020.106361 "Requirements elicitation methods based on interviews in comparison: A family of experiments" — Rueda, Panach & Distante, 2020.

[18]: https://cucumber.io/docs/bdd/example-mapping/ "Example Mapping" — Cucumber; documentação de prática, não estudo causal.

[19]: https://pmc.ncbi.nlm.nih.gov/articles/PMC9110500/ "Empirical Research on Requirements Quality: A Systematic Mapping Study" — Montgomery et al., 2022.

[20]: https://arxiv.org/abs/2307.07381 "Investigating ChatGPT's Potential to Assist in Requirements Elicitation Processes" — Ronanki, Berger & Horkoff, 2023.

[21]: https://arxiv.org/abs/2404.17842 "Using LLMs in Software Requirements Specifications: An Empirical Evaluation" — Krishna, Gaur, Verma & Jalote, 2024.

[22]: https://www.ipr.mdu.se/pdf_publications/7221.pdf "Requirements Ambiguity Detection and Explanation with LLMs: An Industrial Study" — Bashir et al., 2025; PDF verificável, DOI não localizado na auditoria.

[23]: https://arxiv.org/abs/2509.11446 "Large Language Models (LLMs) for Requirements Engineering (RE): A Systematic Literature Review" — Zadenoori et al., 2025; preprint preliminar.

[24]: https://doi.org/10.6028/NIST.AI.100-1 "Artificial Intelligence Risk Management Framework (AI RMF 1.0)" — NIST, 2023.

[25]: https://doi.org/10.6028/NIST.AI.600-1 "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile" — NIST, 2024.

[26]: https://doi.org/10.1109/ICRE.1994.292398 "An Analysis of the Requirements Traceability Problem" — Gotel & Finkelstein, 1994.

[27]: https://doi.org/10.1109/32.895989 "Toward Reference Models for Requirements Traceability" — Ramesh & Jarke, 2001.

[28]: https://doi.org/10.1109/TSE.2016.2622264 "Preventing Defects: The Impact of Requirements Traceability Completeness on Software Quality" — Rempel & Mäder, 2017.

[29]: https://doi.org/10.1016/j.jss.2022.111389 "When Traceability Goes Awry: An Industrial Experience Report" — Fucci, Alégroth & Axelsson, 2022.

[30]: https://doi.org/10.1007/s00766-023-00412-z "A Systematic Literature Review of Pre-Requirements Specification Traceability" — Mucha, Kaufmann & Riehle, 2024.

[31]: https://www.w3.org/TR/prov-dm/ "PROV-DM: The PROV Data Model" — W3C Recommendation, Moreau, Missier et al., 2013.

[32]: https://doi.org/10.1016/j.infsof.2017.09.004 "A Systematic Review of Requirements Change Management" — Jayatilleke & Lai, 2018.

[33]: https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl" — Böckeler/Thoughtworks, 2025; análise exploratória.

[34]: https://doi.org/10.1109/TSE.2012.28 "The Effects of Test-Driven Development on External Quality and Productivity: A Meta-Analysis" — Rafique & Mišić, 2013.

[35]: https://doi.org/10.1007/s10664-016-9490-0 "An industry experiment on the effects of test-driven development on external quality and productivity" — Tosun et al., 2017.

[36]: https://arxiv.org/abs/2305.01210 "Is Your Code Generated by ChatGPT Really Correct? Rigorous Evaluation of Large Language Models for Code Generation" — EvalPlus, Liu et al., 2023.

[37]: https://dora.dev/guides/dora-metrics/ "DORA’s software delivery performance metrics" — documentação DORA/Google Cloud; guia de medição, não prova de causalidade.

[38]: https://arxiv.org/abs/2302.06590 "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot" — Peng et al., 2023.

[39]: https://www.microsoft.com/en-us/research/publication/the-effects-of-generative-ai-on-high-skilled-work-evidence-from-three-field-experiments-with-software-developers/ "The Effects of Generative AI on High-Skilled Work: Evidence from Three Field Experiments with Software Developers" — Cui et al., 2025.

[40]: https://arxiv.org/abs/2507.09089 "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity" — Becker et al., 2025; preprint.

[41]: https://swt.informatik.uni-freiburg.de/staff/langenfeld/resources/Requirements%20Defects%20over%20a%20Project%20Lifetime?month:int=3&year:int=2025&orig_query= "Requirements defects over a project lifetime: An empirical analysis of defect data from a 5-year automotive project at Bosch" — Langenfeld, Post & Podelski, 2016.

[42]: https://modelcontextprotocol.io/specification/2025-06-18 "Model Context Protocol Specification, version 2025-06-18" — especificação técnica; não impõe segurança no nível do protocolo.

[43]: https://www.sec.gov/Archives/edgar/data/1617640/000161764022000013/z-20211231.htm "Zillow Group, Inc. Form 10-K for fiscal year 2021" — filing regulatório, 2022.

[44]: https://www.iso.org/standard/71197.html "ISO/IEC/IEEE 15939:2017 — Systems and software engineering — Measurement process" — norma de medição; modelo prescritivo.

[45]: https://www.iso.org/standard/78176.html "ISO/IEC 25010:2023 — Systems and software Quality Requirements and Evaluation — Product quality model" — modelo de qualidade; não define limiares universais.

[46]: https://doi.org/10.1007/s10664-010-9143-7 "Studying the Co-Evolution of Production and Test Code in Open Source and Industrial Developer Test Processes through Repository Mining" — Zaidman et al., 2011.

[47]: https://doi.org/10.1007/s10664-024-10557-2 "User feedback in continuous software engineering: revealing the state-of-practice" — Tkalich et al., 2025.

[48]: https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/ "Spec-driven development with AI: Get started with a new open-source toolkit" — GitHub Spec Kit; documentação de fornecedor, não avaliação independente.
