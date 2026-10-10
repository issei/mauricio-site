# Vibe Spec-ing: Especificação Conversacional

## Síntese crítica sobre conceito, novidade, evidência e protocolo de avaliação

> **Status do termo.** “Vibe Spec-ing” não apareceu, na pesquisa consolidada, como termo normativo, acadêmico ou consensual. As ocorrências localizadas são rótulos recentes e informais próximos — *vibe specs*, *vibe speccing* e *vibe-spec* — usados para descrever entrevistas com IA antes do código ou geração retrospectiva de especificações a partir de logs de agentes. Portanto, este relatório não trata “Vibe Spec-ing” como método estabelecido; propõe uma definição operacional provisória para análise e teste.

## Resumo executivo

A **Engenharia de Requisitos (ER)** já dispõe de um fundamento normativo e disciplinar consolidado. A ISO/IEC/IEEE 29148 define ER como função interdisciplinar que descobre, elicita, desenvolve, analisa, verifica, valida, comunica, documenta e gerencia requisitos ao longo do ciclo de vida. Ela distingue **verificação** — examinar se requisitos são bem-formados — de **validação** — confirmar que definem o sistema certo para as necessidades dos stakeholders — e exige processos iterativos, rastreabilidade e gestão de mudanças. [1]

Dessa base resulta a conclusão editorial principal:

> **Se Vibe Spec-ing significar apenas conversar com um LLM, obter Markdown e depois pedir código, não há novidade demonstrada em Engenharia de Requisitos.** Há, no máximo, uma interface e uma orquestração novas para atividades clássicas: elicitação, esclarecimento, especificação, negociação, validação, priorização e gestão de mudanças.

Uma tese defensável é mais estreita: **Vibe Spec-ing pode ser um rótulo operacional para um workflow humano–IA que reduz a fricção de capturar, revisar e manter intenção de produto para desenvolvimento assistido por agentes, desde que produza artefatos versionados, verificáveis, rastreáveis e validados por pessoas responsáveis pelo produto**. Nesse enquadramento, a contribuição potencial está no mecanismo de interação, na automação e na manutenção temporal da especificação — não na invenção dos fundamentos da ER.

 A evidência apoia alguns componentes, mas não a eficácia global do rótulo. Entrevistas, perguntas de seguimento, exemplos, protótipos, workshops e revisão de ambiguidades ajudam a revelar conhecimento tácito, porém seus efeitos são contextuais e muitas vezes caros de medir. [7–11] LLMs já demonstraram capacidade parcial em elicitação, geração de SRS e detecção de ambiguidades, mas com amostras pequenas, benchmarks controlados, dependência de prompts e falhas em terminologia de domínio, interfaces, restrições e segurança. [27–31] Estudos sobre agentes e programação assistida também mostram resultados divergentes de produtividade e riscos de automação, segurança e falsa confiança. [32–38]

Assim, a alegação apropriada hoje é **hipótese de pesquisa**, não resultado: um workflow conversacional bem governado pode reduzir custo de captura de contexto, retrabalho ou desalinhamento em cenários de código gerado por IA. Para demonstrá-lo, é necessário comparar o workflow com um processo de referência alinhado à 29148/SWEBOK, usando adjudicação humana independente, métricas de completude, ambiguidade, consistência, correção, verificabilidade, rastreabilidade, retrabalho, defeitos, custo e tempo, inclusive durante a evolução do sistema.

## 1. Escopo, terminologia e força das evidências

### 1.1 Definição operacional provisória

Para que o conceito possa ser testado, propõe-se:

> **Vibe Spec-ing** = workflow conversacional em que uma pessoa ou equipe dialoga com um LLM — antes, durante ou depois de uma sessão de desenvolvimento assistido por IA — para elicitar intenção, explicitar escopo e restrições, produzir ou atualizar uma especificação, revisar essa especificação com stakeholders e conectá-la a critérios de aceitação, tarefas, testes e código.

Essa definição é **editorial e provisória**, não uma definição encontrada em fonte normativa. Ela deliberadamente inclui duas variantes:

1. **Spec-first conversacional:** a IA entrevista o usuário, elabora a especificação, itera até aprovação e só então planeja ou implementa.
2. **Spec-retrospectivo:** a IA extrai requisitos de logs de coding agents depois da implementação e mantém uma spec junto ao código.

As variantes compartilham uma interface conversacional, mas não resolvem o mesmo problema. A primeira pretende reduzir incerteza antes do código; a segunda pretende recuperar e preservar contexto depois do fato. Em ambas, uma transcrição fluente não é automaticamente um requisito de engenharia.

### 1.2 Escala de confiança usada neste relatório

- **Alta:** definição ou dado diretamente sustentado por norma, documentação oficial, estudo primário com texto acessível ou referência clássica reconhecida.
- **Moderada:** resultado de caso único, estudo exploratório, preprint, fonte corporativa ou evidência que não generaliza bem.
- **Baixa:** alegação de eficácia universal, novidade do termo, causalidade não testada ou descrição informal de praticante.

## 2. Principais referências e contribuição específica

A tabela resume as fontes mais relevantes, removendo duplicatas conceituais. As limitações são parte da evidência, não um detalhe editorial.

| Ref. | Fonte | Contribuição específica | Limite principal |
|---|---|---|---|
| [1] | ISO/IEC/IEEE 29148:2018 | Define processos, itens de informação, atributos, características e gestão de requisitos ao longo do ciclo de vida; fundamenta verificação, validação, iteração e rastreabilidade. | É norma prescritiva, não experimento de eficácia; a página pública não substitui o texto integral comercial. |
| [2] | SWEBOK v4.0/4.0a | Consolida Software Requirements como área de conhecimento: elicitação, análise, especificação, validação, gestão, priorização, rastreabilidade, medição e ferramentas. | Guia de consenso profissional, não norma de conformidade nem prova de superioridade de uma técnica. |
| [3] | NASA, *How to Write a Good Requirement* | Traduz qualidade em checklist operacional: clareza, completude, consistência, correção, independência de implementação, interfaces, desempenho, rationale, rastreabilidade e testabilidade. | Orientação da NASA, fortemente voltada a sistemas críticos; house style não é universal. |
| [4] | ISO/IEC 25010:2023 | Oferece modelo de qualidade de produto para requisitos, critérios de aceitação, testes e medidas durante o ciclo de vida. | Não fornece limiares universais nem é específica para LLMs. |
| [5] | Sommerville e Sawyer; Wiegers e Beatty | Mostram a convergência histórica entre descoberta, documentação, validação, priorização, rastreabilidade e gestão de mudanças. | Livros de prática; não são estudos causais de agentes de IA. |
| [6] | Montgomery et al., mapeamento de qualidade | Em 105 estudos primários de 6.905 registros, identifica ambiguidade, completude, consistência e correção como atributos dominantes; mostra baixa maturidade de avaliação. | Síntese secundária; os estudos incluídos são heterogêneos e pouco industriais. |
| [7] | Ferrari, Spoletini e Gnesi | Em 34 entrevistas, distingue falta de clareza, múltiplas interpretações, desambiguação incorreta e correta; mostra que ambiguidade pode revelar conhecimento tácito. | Estudo observacional; não prova que a classificação melhore resultados posteriores. |
| [8] | Rueda, Panach e Distante | Em quatro replicações e 167 estudantes, compara entrevista livre, JAD e prototipagem em papel; prototipagem foi melhor para requisitos funcionais, JAD para não funcionais, com custo de tempo. | Cliente simulado e tarefas acadêmicas; validade industrial limitada. |
| [9] | Burnay, Jureta e Faulkner | O *Elicitation Topic Map* indica que stakeholders compartilham espontaneamente alguns tópicos e omitem outros; checklists podem orientar perguntas proativas. | Mede tendência declarada de compartilhamento, não completude real. |
| [10] | Olsson, Sentilles e Papatheocharous | Revisão de 530 artigos, com 84 incluídos; registra predominância de estudos de caso, ausência de replicações e pouca avaliação de custos de longo prazo. | Trata sobretudo de requisitos de qualidade, não testa Vibe Spec-ing. |
| [11] | Langenfeld, Post e Podelski | Em 588 defeitos de um projeto automotivo de 4,5 anos, incorreção/incompletude responderam por 61%; inconsistência teve maior custo médio de correção. | Caso Bosch específico; não é taxa geral da indústria. |
| [12] | Gotel e Finkelstein; Ramesh e Jarke | Fundamentam rastreabilidade pré e pós-especificação e links de origem, dependência, evolução e rationale. | Modelos anteriores a LLMs; não resolvem captura automática de contexto. |
| [13] | Lamport, TLA+ | Separa especificação de implementação: a especificação descreve comportamentos admissíveis e pode ser analisada por modelo. | Model checking depende de abstração, propriedades e espaço de estados; não gera código de produção automaticamente. |
| [14] | Cucumber, BDD e Example Mapping | Documenta descoberta por exemplos, conversas estruturadas, Given–When–Then, regras, exemplos e perguntas não resolvidas. | Documentação de prática, não evidência de eficácia universal. |
| [15] | Beck; Claessen e Hughes; Goldstein et al. | TDD guia implementação por testes; QuickCheck/PBT executa propriedades sobre entradas geradas; estudo industrial identifica forças e dificuldades de PBT. | Testes e propriedades cobrem o que foi escolhido; não substituem requisitos de sistema ou validação de stakeholders. |
| [16] | Adzic, *Specification by Example* | Conecta colaboração, exemplos, testes automatizáveis e documentação viva; aproxima conversa e verificação observável. | Casos e experiência prática, não prova causal de completude. |
| [17] | Fakhoury et al., TiCoder | Mostra que testes usados para formalizar intenção podem melhorar avaliação de código gerado e reduzir carga cognitiva em cenário controlado. | Workflow específico; feedback idealizado e amostra pequena não equivalem a manutenção em produção. |
| [18] | Fowler/Thoughtworks sobre SDD | Distingue *spec-first*, *spec-anchored* e *spec-as-source*; explicita ambiguidade terminológica, drift, alucinação e sobrecarga de revisão. | Análises de prática, não ensaios comparativos. |
| [19] | GitHub Spec Kit e Kiro | Documentam artefatos estruturados — requisitos, design, tarefas, critérios —, checkpoints humanos, análise, execução rastreável e ondas de dependências. | Documentação de fornecedores; capacidades descritas não demonstram ganhos ou segurança. |
| [20] | Zadenoori et al. | Revisão recente de 74 estudos de LLM em ER; encontra predominância de elicitação/validação, ambientes controlados e pouca integração industrial. | Preprint e base temporalmente sensível; artefatos e modelos mudam rapidamente. |
| [21] | Ronanki et al. | Seis respostas do ChatGPT foram comparadas com 30 respostas de especialistas e avaliadas em sete atributos; indica capacidade parcial de elicitação. | Poucas perguntas, cenário controlado e sem entrevista interativa ou resultado de projeto. |
| [22] | Krishna et al. | Compara GPT-4 e CodeLlama na geração, validação e correção de SRS usando oito critérios e quatro casos; GPT-4 foi comparável a engenheiro iniciante no caso estudado. | Caso único/domínio controlado; não demonstra aceitação autônoma nem qualidade do software executado. |
| [23] | Bashir et al. | Estudo industrial com 663 requisitos Alstom/Westermo: dez exemplos em contexto melhoraram classificação de ambiguidade em média 20,2%; explicações receberam 3,84/5. | Domínios específicos; terminologia ainda causa falhas; não prova segurança ou generalização. |
| [24] | Seifert et al. | Replicação com GPT-4-Turbo, GPT-3.5, Mixtral e Phi encontrou poucos defeitos e rara coincidência com a referência, contrariando a expectativa de revisão confiável automática. | Documentos e desenho de inspeção específicos; não testa RAG ou workflow híbrido em escala. |
| [25] | NIST AI 600-1; Parasuraman e Manzey; Buçinca et al. | Fundamentam riscos de confabulação, automação, overreliance e necessidade de revisão ativa, TEVV, verificação de fontes e monitoramento. | Orientação geral ou tarefas de decisão, não demonstração específica de Vibe Spec-ing. |
| [26] | Perry et al.; Pearce et al. | Estudos de código assistido por IA mostram risco de insegurança, maior confiança subjetiva e vulnerabilidades em snippets específicos. | Modelos, tarefas e versões particulares; não há uma taxa geral para todo código gerado por LLM. |
| [27] | Cui et al.; Becker et al. | RCTs recentes de campo divergem: um working paper estima mais pull requests em três empresas; outro encontra 19% mais tempo em 246 issues reais de 16 desenvolvedores experientes. | Métricas, ferramentas, tarefas e populações diferentes; não devem ser agregados como um único efeito. |
| [28] | Scrum Guide; Lucassen et al.; Amna e Poels | Refinamento é atividade contínua; user stories e INVEST são heurísticas de conversa e negociação, não SRS completa; a literatura ainda tem baixa validação causal. | Percepções, convenções de prática e mapeamento não provam efeito universal. |
| [29] | Quattrocchi et al. | Estudo preprint indica que LLMs podem produzir cobertura/estilo semelhantes aos humanos, mas menor diversidade e atendimento a critérios; mantém necessidade de validação humana. | Entrevistas simuladas, domínio único e não comparação com processo completo de refinamento. |
| [30] | Zaninotto; Bechtel; McGuinness | Documentam usos informais: gerar spec de logs ou entrevistar o usuário antes da implementação. Servem como evidência de emergência do rótulo, não de consenso ou eficácia. | Blogs/ensaios sem revisão por pares, controle, replicação ou métricas comparativas. |
| [31] | HumanEval; EvalPlus; SWE-bench | Oferecem métricas para resultado executável: pass@k, testes ampliados, mutação e issues reais com regressão. | Teste verde não garante intenção completa, segurança, desempenho ou manutenção; benchmarks têm vieses e escopos próprios. |

## 3. Matriz de conceitos relacionados

| Conceito | Núcleo | Convergência com Vibe Spec-ing | Diferença decisiva | Lacuna/evidência |
|---|---|---|---|---|
| **ER / ISO 29148** | Elicitar, analisar, especificar, validar, gerir e rastrear requisitos. | Fornece o processo e a rubrica de qualidade. | Não depende de LLM, conversa específica ou geração automática de código. | Vibe Spec-ing só acrescenta algo se operacionalizar o processo com salvaguardas mensuráveis. |
| **SWEBOK** | Corpo de conhecimento sobre requisitos, validação, gestão e ferramentas. | Organiza o vocabulário disciplinar. | Guia de conhecimento, não protocolo de conformidade. | Pode servir como baseline de comparação, não como prova de benefício. |
| **Entrevista conversacional** | Perguntas abertas, probes, confirmação e registro de decisões. | É o mecanismo mais próximo da interação proposta. | Entrevista tradicional atribui responsabilidade a analista e stakeholders; IA pode gerar perguntas e interpretações sem autoridade. | Ambiguidade e conhecimento tácito exigem seguimento humano; evidência causal é limitada. |
| **Workshops/JAD/Three Amigos** | Colaboração estruturada, múltiplas perspectivas e negociação. | Compartilham exemplos, conflitos, critérios e confirmação. | São processos sociais com autoridade, facilitação e negociação explícitas. | Não há comparação controlada entre workshop humano e diálogo IA. |
| **User stories / INVEST / refinamento** | Fatias de valor, negociação, decomposição e adaptação contínua. | Vibe Spec-ing pode registrar histórias, critérios e perguntas. | Story não é especificação completa; “Negotiable” rejeita contrato detalhado antecipado. | Risco de a IA cristalizar cedo decisões ainda abertas. |
| **BDD / Specification by Example** | Exemplos concretos, regras, critérios e cenários executáveis. | Dá ao diálogo uma saída verificável e observável. | Suíte de cenários cobre exemplos escolhidos, não necessariamente todo o domínio. | Boa ponte operacional, mas requer casos negativos, propriedades e revisão de abstração. |
| **TDD / PBT** | Testes concretos ou propriedades guiam implementação e feedback. | Podem testar critérios produzidos pela conversa. | Operam sobretudo no nível de código/comportamento exercitado; não resolvem origem, valor ou escopo. | Passar testes pode mascarar requisitos ausentes e oráculos ruins. |
| **Especificação formal** | Semântica matemática de comportamentos e propriedades analisáveis. | Pode fornecer rigor a partes críticas da spec. | Exige formalização, abstração e ferramentas; não é sinônimo de Markdown ou texto fluente. | Custo de tradução e aceitação pelo domínio continuam riscos. |
| **SDD** | Requisitos/intenção estruturados orientam plano, tarefas, testes e geração de código. | É o vizinho industrial mais próximo. | SDD já é rótulo amplo e difuso; Vibe Spec-ing enfatiza interface conversacional, inclusive retrospectiva. | Falta definição consensual, métricas de drift e estudos longitudinais. |
| **LLM-assisted RE** | LLM como gerador, classificador, revisor ou entrevistador. | Vibe Spec-ing pode ser uma instância de elicitação + geração + validação. | Uso de LLM não define processo nem garante rastreabilidade. | Resultados pequenos e contraditórios; desempenho depende de modelo, prompt e domínio. |
| **Vibe coding** | Implementação exploratória por linguagem natural, com baixo compromisso documental. | Pode ser o contexto que motiva a spec conversacional. | Vibe Spec-ing, se rigoroso, deve adicionar intenção explicitada, critérios e controle de mudança. | Sem gates, a diferença vira apenas renomeação de conversa em Markdown. |

## 4. O que o argumento favorável consegue sustentar

### 4.1 Captura de contexto e conhecimento tácito

Conversas, exemplos, protótipos e perguntas de seguimento podem tornar visíveis pressupostos que não aparecem em uma solicitação inicial. Estudos de entrevistas mostram que ambiguidades às vezes são o próprio caminho para revelar conhecimento tácito; tópicos que stakeholders não mencionam espontaneamente precisam ser perguntados de forma proativa. [7,9] Um LLM pode ajudar a manter memória de uma sessão, sugerir perguntas, apontar termos vagos e transformar respostas em artefatos revisáveis.

### 4.2 Redução da fricção documental

A proposta é plausível para equipes que têm dificuldade de escrever e atualizar requisitos: a IA pode converter linguagem natural em histórias, regras, cenários, tabelas de decisão, critérios de aceitação e links de rastreabilidade. Ferramentas contemporâneas como Spec Kit e Kiro explicitam esse fluxo em artefatos separados de requisitos, design e tarefas. [19] A documentação de SDD identifica, de forma independente, uma necessidade real: preservar a spec como âncora durante evolução, e não apenas como rascunho descartável. [18]

### 4.3 Melhor contexto para agentes de código

Uma especificação com escopo, fora de escopo, restrições, exemplos negativos, interfaces e critérios verificáveis pode reduzir decisões implícitas que um coding agent teria de inventar. Estudos adjacentes, como TiCoder, indicam que testes e feedback estruturado ajudam pessoas a avaliar código gerado e podem elevar a correção em determinados cenários. [17] A inferência correta é condicional: **mais contexto verificável pode melhorar a coordenação**, não que qualquer texto maior melhore código.

### 4.4 Iteração e feedback bidirecional

A ISO 29148 admite iteração e recursão; refinamento Agile trata o backlog como emergente; BDD trata exemplos como conversa contínua antes da automação. [1,14,28] Portanto, Vibe Spec-ing não precisa ser um documento congelado antes do código. Pode ser um ciclo: pergunta → hipótese → exemplo → revisão → implementação → teste → atualização da spec. Essa temporalidade é uma possível diferenciação prática.

## 5. Objeções, riscos e limitações

### 5.1 “É apenas engenharia de requisitos com um novo nome”

Esta é a objeção mais forte. Elicitação, negociação, escrita, validação, priorização, rastreabilidade e gestão de mudanças são práticas antigas e documentadas. [1,2,5] Se o workflow não especificar uma transformação nova, uma métrica nova ou um mecanismo de controle comprovadamente melhor, a novidade é **de interface/orquestração**, não de fundamento disciplinar.

### 5.2 Fluência não é correção

LLMs podem produzir texto convincente e falso, incompleto ou extrínseco à fonte. TruthfulQA demonstrou a diferença entre fluência e verdade em modelos testados; o NIST classifica confabulação, integridade da informação e configuração humano–IA como riscos. [25] Em requisitos, o problema é mais grave porque uma frase plausível pode deslocar uma decisão de produto antes que alguém perceba a invenção.

### 5.3 Completude e correção dependem de referência externa

Não existe uma “completude” absoluta verificável apenas lendo a spec. Ela deve ser avaliada contra necessidades, objetivos, riscos, regulamentos, entradas, comportamento esperado, modelo de domínio e decisões dos stakeholders. Adicionar texto pode aumentar cobertura e simultaneamente introduzir contradições; remover contradições pode remover uma necessidade. [6,11] Um contador de tópicos ou um julgamento de LLM não resolve esse trade-off.

### 5.4 Automação pode aumentar confiança inadequada

A literatura de fatores humanos mostra vieses de automação; em um experimento com 199 participantes, funções de forcing cognitivo reduziram overreliance mais do que explicações simples, embora fossem menos apreciadas subjetivamente. [25] Estudos com assistentes de programação também encontraram maior confiança e código menos seguro em tarefas específicas. [26] Um fluxo que mostra uma spec pronta sem exigir confirmação de origem, evidência e alternativas pode piorar a revisão, mesmo reduzindo o esforço aparente.

### 5.5 Conhecimento de domínio e terminologia

Estudos industriais de ambiguidade com LLMs indicam que exemplos em contexto melhoram desempenho, mas termos específicos do domínio continuam causando falhas. [23] Uma conversa com IA pode suavizar a linguagem e apagar justamente as exceções que especialistas consideram importantes. Pessoas responsáveis pelo produto, operação, segurança e conformidade precisam validar termos, limites, conflitos e trade-offs.

### 5.6 Custo de revisão, drift e dependência do modelo

A revisão de entrevistas pode encontrar ambiguidades que o analista não percebeu, mas um estudo exploratório mediu custo de revisão de aproximadamente 2,75 vezes a duração do áudio. [7] Em workflows de IA, devem ser somados custo de leitura, adjudicação, atualização, testes e resolução de contradições. Modelos, prompts, ferramentas e comportamentos mudam; uma spec gerada hoje pode não ser reproduzível amanhã. SDD também enfrenta *spec drift*: código e spec divergem, e não está definido quando a fonte de verdade muda. [18]

### 5.7 Não há efeito empírico direto demonstrado

As evidências mais próximas são parciais: elicitação com ChatGPT em pequena escala, geração de SRS em casos controlados, classificação industrial de ambiguidade e avaliação de código guiada por testes. [17,20–24] Nenhuma demonstra, isoladamente, que um workflow completo de Vibe Spec-ing reduza defeitos, retrabalho ou custo de ciclo de vida em comparação com um processo humano alinhado à 29148.

## 6. Tese central refinada para o artigo

### 6.1 Tese proposta

> **Vibe Spec-ing é uma hipótese de workflow, não uma disciplina nova:** um processo conversacional humano–IA pode tornar mais barato capturar e manter contexto para desenvolvimento assistido por agentes, mas só constitui Engenharia de Requisitos quando transforma conversa em requisitos identificados, versionados, negociados, verificáveis, rastreáveis e validados por stakeholders. Sua possível novidade está na interface, automação e sincronização temporal; sua validade depende de superar uma baseline disciplinar em qualidade e custo, não de produzir texto mais fluente.

### 6.2 Problema que o workflow pretende resolver

O problema não é “como inventar requisitos”, mas **como reduzir a perda de intenção entre conversa, especificação, plano, código, teste e evolução**, especialmente quando agentes geram grande parte da implementação. O workflow pretende reduzir:

- contexto tácito perdido entre reuniões, prompts e sessões de coding;
- ambiguidade não registrada e decisões sem rationale;
- repetição de perguntas e custo de transformar conversa em artefato;
- divergência entre intenção, spec, tarefas, testes e código;
- dificuldade de revisar o que mudou e por quê.

Esses são problemas legítimos de ER e rastreabilidade; a proposta só é nova se o mecanismo conversacional resolver parte deles de modo mensuravelmente melhor.

### 6.3 Condições de validade

A tese só deve ser considerada válida se o workflow:

1. identificar cada requisito e decisão com ID, versão, proprietário, prioridade, risco, rationale e tipo;
2. declarar escopo, fora de escopo, pressupostos, dependências, interfaces, exceções e critérios de aceitação;
3. separar necessidade/resultado de solução/implementação, salvo quando uma restrição técnica for deliberada;
4. registrar perguntas abertas, alternativas rejeitadas, conflitos e autoridade de decisão;
5. obter confirmação de stakeholders relevantes, e não apenas “aprovação” de um usuário do chat;
6. aplicar critérios de 29148/NASA: necessário, claro, singular, completo no contexto, factível, verificável, correto, consistente e independente de implementação quando apropriado; [1,3]
7. manter rastreabilidade bidirecional entre origem, requisito, design, código, teste, implantação e mudança; [12]
8. verificar comportamento com exemplos, testes, propriedades, análise estática ou métodos formais adequados ao risco;
9. preservar proveniência: modelo, versão, prompt, contexto, fonte consultada, decisão humana e evidência;
10. definir o que acontece quando spec e código divergem e executar uma política explícita de atualização;
11. medir custo total de geração, revisão, retrabalho e manutenção, não apenas tempo até o primeiro rascunho;
12. demonstrar resultados contra uma baseline humana ou processo híbrido comparável.

### 6.4 Diferenciação em relação a “simplesmente conversar com IA”

| Conversa com IA | Vibe Spec-ing operacionalizado |
|---|---|
| Histórico ou resposta livre, sem estado governado. | Artefato versionado, com IDs, baseline, owner e política de mudança. |
| Objetivo pode mudar sem ser registrado. | Problema, sucesso, escopo, fora de escopo e restrições explícitos. |
| IA resume ou sugere; decisão fica implícita. | Decisões, rejeições, rationale, autoridade e perguntas abertas registrados. |
| Fluência é o principal critério perceptivo. | Critérios de qualidade, aceitação, rastreabilidade e verificação auditáveis. |
| Prompt pode produzir código diretamente. | Spec → revisão/negociação → design/tarefas → teste → implementação → validação. |
| Não há garantia de reprodutibilidade. | Modelo, versão, prompt, fontes, contexto e evidências preservados. |
| Divergência spec–código é invisível. | Drift detectado por revisão, links, testes e gates de mudança. |
| IA pode parecer autoridade. | IA propõe; stakeholders e responsáveis pelo produto decidem. |

### 6.5 Público-alvo

- equipes que usam coding agents em produtos novos ou bases brownfield;
- product owners, analistas de negócio, engenheiros de requisitos, desenvolvedores, testers e arquitetos;
- equipes de segurança, compliance e sistemas críticos que precisam de proveniência e auditoria;
- pesquisadores de ER, LLMs, interação humano–IA e desenvolvimento orientado por especificação;
- fornecedores de ferramentas que desejem sair de marketing de “spec” e oferecer evidência comparável.

### 6.6 Estrutura concisa recomendada para o artigo

1. **Problema e motivação:** perda de intenção em desenvolvimento agentivo.
2. **Estado da arte:** 29148, SWEBOK, entrevistas, BDD/Specification by Example, SDD e LLM-assisted RE.
3. **Definição operacional:** variantes spec-first e retrospectiva; fronteiras e não objetivos.
4. **Workflow proposto:** elicitação, transformação, validação, rastreabilidade, execução e atualização.
5. **Hipóteses e métricas:** qualidade de requisitos, custo, tempo, retrabalho, defeitos e drift.
6. **Protocolo comparativo:** baseline, tarefas, adjudicação independente e avaliação longitudinal.
7. **Ameaças à validade:** ancoragem, automação, seleção de domínio, mudança de modelo e efeito de aprendizagem.
8. **Conclusão limitada:** contribuição de orquestração, se demonstrada; não reivindicar nova teoria de ER.

## 7. Questões ainda não respondidas

1. **Qual é a unidade de uma spec?** Requisito, história, regra, exemplo, propriedade, decisão, tarefa ou combinação hierárquica?
2. **Quem tem autoridade para aceitar?** Um usuário no chat, Product Owner, cliente, operador, especialista de segurança ou grupo de stakeholders?
3. **Como medir completude sem circularidade?** Qual referência externa, fronteira do sistema, modelo de domínio e nível de detalhe definem o denominador?
4. **Qual é a melhor ordem de perguntas?** Há evidência preliminar a favor de perguntas abertas seguidas de probes específicos, mas não de uma sequência universal. [7–10]
5. **Quando a IA deve perguntar, propor ou recusar?** Faltam políticas de abstention para conflito, baixa confiança, requisito regulatório e terminologia desconhecida.
6. **Como detectar e corrigir spec drift?** Links, testes, revisão semântica e feedback de produção podem ajudar, mas não há benchmark padronizado.
7. **Quais elementos devem ser persistentes?** Conversa integral, resumo, rationale, decisões rejeitadas, fontes, prompts, modelo e evidências têm custos e requisitos de privacidade diferentes.
8. **A spec deve ser fonte de verdade ou âncora?** A literatura de SDD distingue spec-first, spec-anchored e spec-as-source, mas não há consenso ou dados de manutenção. [18]
9. **O custo de revisão compensa o custo de geração?** É preciso medir carga de leitura, adjudicação, testes, atualizações e defeitos escapados.
10. **Como evitar viés de ancoragem?** Avaliadores devem revisar uma parte do material sem ver a resposta da IA e reportar concordância independente antes da adjudicação.
11. **Como comparar com Agile?** Vibe Spec-ing deve ser comparado com refinamento, Three Amigos e Example Mapping, não apenas com “nenhuma especificação”.
12. **Quais domínios se beneficiam?** Greenfield, brownfield, APIs, UI, sistemas críticos e regulados podem ter trade-offs muito diferentes.
13. **Qual o papel de exemplos e propriedades?** Cénarios BDD, PBT, TDD e métodos formais cobrem facetas diferentes; ainda falta um desenho que ligue todos os níveis sem mascarar requisitos ausentes.
14. **LLM-as-judge é válido?** Resultados de revisão de requisitos mostram baixa ou variável concordância; um único modelo não deve ser oráculo. [24]
15. **Há efeito real no produto?** Ainda faltam estudos longitudinais com defeitos, retrabalho, segurança, manutenção, valor entregue e custo total.

## 8. Protocolo prático de avaliação da especificação conversacional

O protocolo abaixo é proposto para um estudo replicável. Ele não é um resultado já validado; sua finalidade é tornar a alegação falsificável.

### Fase A — Definir pergunta, baseline e unidade de análise

1. Registrar previamente a definição operacional de Vibe Spec-ing e a variante testada: spec-first, retrospectiva ou híbrida.
2. Escolher uma **baseline explícita**: refinamento humano com 29148/SWEBOK; Three Amigos/Example Mapping; ou conversa livre sem template. Não usar “desenvolvimento tradicional” como controle vago.
3. Fixar unidade de análise: requisito individual, história, regra, exemplo, interface, cenário, tarefa e produto.
4. Definir domínio, risco, maturidade da equipe, greenfield/brownfield, idioma e grau de conhecimento de cada participante.
5. Congelar modelo, versão, temperatura, ferramentas, prompts, contexto, políticas de memória e data do experimento. Registrar custos de tokens e tempo.

### Fase B — Construir referência independente

1. Para cada tarefa, preparar um **pacote de referência** com necessidades, objetivos, restrições, stakeholders, riscos, casos de uso, dados, interfaces e regras aplicáveis.
2. Ter pelo menos quatro profissionais do domínio anotando independentemente os itens aplicáveis. Adjudicar divergências, mas preservar a distribuição de desacordo.
3. Registrar, para cada item, se é obrigatório, opcional, fora de escopo, desconhecido ou dependente de decisão.
4. Definir um conjunto de critérios de aceitação e testes ocultos, inclusive casos negativos e fronteiras. Não usar somente os exemplos expostos à IA.
5. Manter o pacote de referência separado do prompt de geração para medir omissões e invenções.

### Fase C — Executar o workflow

1. Permitir que o agente faça perguntas, mas registrar número, ordem, tipo, resposta, hipótese alterada e pergunta que deveria ter sido feita.
2. Exigir que cada saída distinga **fonte do fato**, **inferência da IA**, **decisão humana**, **questão aberta** e **proposta de implementação**.
3. Produzir artefatos separados: `contexto`, `requisitos`, `fora-de-escopo`, `rationale/decisões`, `critérios`, `design`, `tarefas`, `rastreabilidade` e `mudanças`.
4. Fazer revisão humana sem mostrar, inicialmente, uma “nota” da IA nem a avaliação de outro revisor.
5. Pedir à IA uma autocrítica somente depois da revisão independente, para medir possível ancoragem e não tratá-la como referência.
6. Se houver implementação, gerar código apenas após congelar a versão da spec; depois executar uma rodada de mudança controlada para medir manutenção e drift.

### Fase D — Rubrica de qualidade

Cada dimensão deve ser pontuada separadamente, com evidência textual e decisão de adjudicação. Evitar um único escore que esconda trade-offs.

| Dimensão | Operacionalização mínima | Métricas sugeridas |
|---|---|---|
| **Completude** | Itens aplicáveis da referência cobertos por requisito, critério ou decisão; declarar fronteira e denominador. | Cobertura = itens cobertos / itens aplicáveis; omissões críticas; falsos itens; itens sem evidência. |
| **Correção** | O requisito corresponde à necessidade e ao comportamento aceito pelo stakeholder/domínio. | Concordância de adjudicadores; taxa de requisitos corrigidos; erros críticos. |
| **Consistência** | Ausência de conflitos internos e conflitos com restrições, interfaces e decisões aprovadas. | Contradições por 100 requisitos; conflitos detectados antes/depois da implementação. |
| **Ambiguidade** | Mais de uma interpretação plausível ou termo não operacionalizado. | Casos por requisito; acordo entre revisores; ambiguidades resolvidas por pergunta. |
| **Verificabilidade** | Condição observável, dados/limites, oráculo e procedimento reproduzível. | Requisitos com teste/critério válido; taxa de testes que detectam mutantes quando aplicável. |
| **Aceitação** | Cada requisito aplicável possui exemplos, cenário ou critério pass/fail que o stakeholder reconhece. | Cobertura de critérios; casos negativos; divergência entre aceite humano e teste. |
| **Rastreabilidade** | Links válidos nos dois sentidos entre origem, requisito, design, código, teste, mudança e implantação. | Precisão, recall e F1 de links candidatos; requisitos órfãos; links desatualizados; cobertura bidirecional. |
| **Proveniência** | Registro de fonte, autor, modelo, versão, prompt, decisão e evidência. | Proporção de afirmações com fonte; decisões sem owner; reprodutibilidade de geração. |
| **Manutenibilidade da spec** | Facilidade de atualizar a spec após mudança sem contradição ou retrabalho desnecessário. | Tempo de atualização; drift detectado; artefatos obsoletos; esforço de revisão. |
| **Qualidade do produto** | Resultado do sistema segundo dimensões relevantes da ISO 25010. | Funcionalidade, confiabilidade, segurança, desempenho, manutenibilidade e outras dimensões pertinentes. |
| **Custo e fluxo** | Custo total, não apenas tempo de primeiro rascunho. | Tempo de elicitação, revisão, adjudicação, implementação, retrabalho, tokens, defeitos e custo. |

Para recuperação de links, precisão é `links corretos recuperados / links recuperados`; recall é `links corretos recuperados / todos os links corretos de referência`; F1 combina os dois. Essas métricas medem recuperação contra um conjunto de referência, não validade causal da relação. [12,31]

### Fase E — Verificar implementação sem confundir níveis

1. Executar critérios de aceitação e testes independentes, ocultos quando possível.
2. Medir cobertura de requisitos separadamente de cobertura de linhas/branches.
3. Usar mutation score para testar se a suíte distingue comportamentos errados, reportando mutantes equivalentes e operadores.
4. Para funções geradas, pass@k é uma medida de amostras que passam testes; não é prova de correção total. HumanEval e EvalPlus mostram que suítes fracas podem inflar resultados e alterar rankings. [31]
5. Para tarefas de repositório, benchmarks como SWE-bench aproximam issues reais, mas teste verde ainda não garante segurança, desempenho, intenção completa ou manutenção. [31]
6. Fazer análise estática, threat modeling e revisão de segurança quando o risco exigir; integrar práticas do SSDF. [25]
7. Repetir a avaliação após uma mudança real ou simulada para medir drift, custo de atualização e regressões.

### Fase F — Adjudicação, estatística e relatório

1. Manter revisão cega e independente de pelo menos dois especialistas, idealmente quatro em tarefas de alto risco.
2. Reportar acordo interavaliadores antes e depois da adjudicação — por exemplo, Cohen-kappa ou estatística apropriada — e não ocultar desacordos.
3. Não usar o mesmo LLM que gerou a spec como único avaliador. LLM-as-judge deve ser, no máximo, instrumento calibrado e comparado com humanos.
4. Reportar intervalos de confiança, tamanho de efeito, distribuição por tarefa e falhas críticas, não apenas médias.
5. Separar resultados por domínio, modelo, nível de experiência, complexidade e variante do workflow.
6. Publicar prompts, versões, artefatos, decisões de exclusão, scripts de teste e dados anonimizados; preservar privacidade de conversas e requisitos sensíveis.
7. Fazer seguimento longitudinal: defeitos escapados, retrabalho, manutenção, incidentes, tempo de onboarding e divergência entre spec e código.

## 9. O que não está comprovado

Esta seção deve permanecer explícita no artigo e em qualquer material de divulgação:

- **Não está comprovado que Vibe Spec-ing seja um conceito consolidado.** A busca não encontrou definição em ISO/IEEE, SWEBOK, livros reconhecidos, artigos primários confiáveis ou documentação oficial. [30]
- **Não está comprovado que o termo represente uma contribuição nova de Engenharia de Requisitos.** Conversa, elicitação, perguntas, especificação, revisão, rastreabilidade, validação e gestão de mudanças já são práticas estabelecidas. [1,2,5]
- **Não está comprovado que conversar com um LLM antes do código produza requisitos mais completos, corretos, consistentes ou verificáveis** do que um processo humano ou híbrido alinhado à 29148.
- **Não está comprovado que a IA reduza defeitos, retrabalho, custo total ou tempo de ciclo de vida.** Estudos de produtividade de programação assistida divergem: resultados positivos em determinados experimentos não se combinam com o estudo de issues reais que encontrou mais tempo com IA. [27]
- **Não está comprovado que uma spec gerada por LLM preserve conhecimento tácito, intenções rejeitadas, conflitos de valor ou rationale.** Pode resumir e também apagar contexto.
- **Não está comprovado que uma métrica textual seja proxy suficiente de qualidade.** Fluência, tamanho, similaridade, contagem de tópicos, cobertura de linhas e teste verde medem facetas parciais.
- **Não está comprovado que LLMs sejam revisores autônomos confiáveis de requisitos.** Estudos recentes têm resultados positivos em alguns casos e negativos ou inconsistentes em outros. [22–24]
- **Não está comprovado que BDD, TDD, PBT, Specification by Example ou SDD substituam Engenharia de Requisitos.** Eles conectam conversa, comportamento, testes ou geração em níveis diferentes; nenhum elimina stakeholders, escopo, risco e rastreabilidade. [13–18]
- **Não está comprovado que critérios de aceitação ou cenários executáveis cubram todo o domínio.** Uma suíte pobre pode passar enquanto regras, exceções, segurança ou requisitos não funcionais permanecem ausentes.
- **Não está comprovado que mais exemplos em contexto resolvam conhecimento de domínio.** O estudo industrial de ambiguidade encontrou melhora com few-shot, mas também falhas em terminologia específica. [23]
- **Não está comprovado que a especificação seja sempre a fonte de verdade.** SDD ainda debate se a spec é inicial, âncora ou fonte permanente; drift e política de divergência continuam problemas abertos. [18,19]
- **Não está comprovado que o workflow seja seguro em sistemas críticos, regulados ou que tratem dados sensíveis.** NIST, OWASP e SSDF fundamentam controles e avaliação, não garantias automáticas. [25,26]
- **Não está comprovado nenhum ganho universal de produtividade, colaboração, satisfação ou qualidade de produto.** Alegações de fornecedores e relatos de praticantes são evidência de posicionamento ou experiência local, não efeito causal geral.

## Conclusão

A formulação mais rigorosa é separar **rótulo**, **workflow** e **evidência**. O rótulo “Vibe Spec-ing” é emergente e informal. O workflow que ele pode nomear combina conversa, LLM, especificação e desenvolvimento agentivo. Os componentes do workflow têm antecedentes fortes em Engenharia de Requisitos, Agile, BDD, Specification by Example, testes e especificação formal. O que ainda não existe é evidência suficiente de que a combinação seja mais eficaz, barata ou segura do que alternativas humanas ou híbridas.

O artigo deve, portanto, fazer uma contribuição modesta e testável: propor uma definição operacional, declarar onde o workflow se conecta à 29148/SWEBOK, separar spec-first de spec-retrospectivo, descrever salvaguardas de proveniência e validação e apresentar um protocolo comparativo. A tese não deve ser “a IA inventou a especificação conversacional”, mas sim: **um workflow conversacional humano–IA pode ser uma forma nova de operacionalizar práticas conhecidas para o desenvolvimento assistido por agentes; sua relevância depende de demonstrar qualidade, rastreabilidade, custo e resultados de produto sob avaliação independente.**

## Referências

[1]: https://standards.ieee.org/standard/29148-2018.html "ISO/IEC/IEEE 29148:2018 — Systems and software engineering — Life cycle processes — Requirements engineering"

[2]: https://ieeecs-media.computer.org/media/education/swebok/swebok-v4.pdf "Guide to the Software Engineering Body of Knowledge (SWEBOK Guide), Version 4.0/4.0a"

[3]: https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/ "Appendix C: How to Write a Good Requirement — Checklist"

[4]: https://www.iso.org/standard/78176.html "ISO/IEC 25010:2023 — Systems and software engineering — SQuaRE — Product quality model"

[5]: https://dl.acm.org/doi/10.5555/549198 "Requirements Engineering: A Good Practice Guide"; https://www.microsoftpressstore.com/store/software-requirements-9780735679665 "Software Requirements, 3rd Edition"

[6]: https://doi.org/10.1007/s00766-021-00367-z "Empirical research on requirements quality: a systematic mapping study"

[7]: https://doi.org/10.1007/s00766-016-0249-3 "Ambiguity and tacit knowledge in requirements elicitation interviews"

[8]: https://doi.org/10.1016/j.infsof.2020.106361 "Requirements elicitation methods based on interviews in comparison: A family of experiments"

[9]: https://doi.org/10.1016/j.is.2014.05.006 "What Stakeholders Will or Won't Say: A Theoretical and Empirical Study of Topic Importance in Requirements Engineering Elicitation Interviews"

[10]: https://doi.org/10.1007/s00766-022-00373-9 "A systematic literature review of empirical research on quality requirements"

[11]: https://doi.org/10.1007/978-3-319-30282-9_10 "Requirements Defects over a Project Lifetime: An Empirical Analysis of Defect Data from a 5-Year Automotive Project at Bosch"

[12]: https://discovery.ucl.ac.uk/749/1/2.2_rtprob.pdf "An Analysis of the Requirements Traceability Problem"; https://doi.org/10.1109/32.895989 "Toward Reference Models for Requirements Traceability"

[13]: https://lamport.azurewebsites.net/pubs/spec-book-chap.pdf "Software Specification Methods: An Overview Using a Case Study — Chapter on TLA+"

[14]: https://cucumber.io/docs/bdd/ "Behaviour-Driven Development"; https://cucumber.io/docs/bdd/example-mapping/ "Example Mapping"

[15]: https://www.oreilly.com/library/view/test-driven-development/0321146530/ "Test Driven Development: By Example"; https://dl.acm.org/doi/10.1145/351240.351266 "QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs"; https://dl.acm.org/doi/10.1145/3597503.3639581 "Property-Based Testing in Practice"

[16]: https://www.manning.com/books/specification-by-example "Specification by Example: How Successful Teams Deliver the Right Software"

[17]: https://doi.org/10.1109/TSE.2024.3428972 "LLM-Based Test-Driven Interactive Code Generation: User Study and Empirical Evaluation"

[18]: https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl"; https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices "Spec-driven development: Unpacking one of 2025’s key new engineering practices"

[19]: https://github.com/github/spec-kit "github/spec-kit: Toolkit to help you get started with SDD"; https://kiro.dev/docs/specs/ "Specs — Kiro documentation"

[20]: https://arxiv.org/html/2509.11446v1 "Large Language Models (LLMs) for Requirements Engineering (RE): A Systematic Literature Review"

[21]: https://doi.org/10.1109/SEAA60479.2023.00061 "Investigating ChatGPT’s Potential to Assist in Requirements Elicitation Processes"

[22]: https://doi.org/10.1109/RE59067.2024.00056 "Using LLMs in Software Requirements Specifications: An Empirical Evaluation"

[23]: https://www.ipr.mdu.se/pdf_publications/7221.pdf "Requirements Ambiguity Detection and Explanation with LLMs: An Industrial Study"

[24]: https://link.springer.com/chapter/10.1007/978-3-031-78386-9_3 "Can Large Language Models (LLMs) Compete with Human Requirements Reviewers? — Replication of an Inspection Experiment on Requirements Documents"

[25]: https://doi.org/10.6028/NIST.AI.600-1 "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile"; https://pubmed.ncbi.nlm.nih.gov/21077562/ "Complacency and Bias in Human Use of Automation: An Attentional Integration"; https://dl.acm.org/doi/10.1145/3449287 "To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-assisted Decision-making"

[26]: https://doi.org/10.1145/3576915.3623157 "Do Users Write More Insecure Code with AI Assistants?"; https://ieeexplore.ieee.org/document/9833571 "Asleep at the Keyboard? Assessing the Security of GitHub Copilot’s Code Contributions"

[27]: https://economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf "The Effects of Generative AI on High-Skilled Work: Evidence from Three Field Experiments with Software Developers"; https://arxiv.org/abs/2507.09089 "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity"

[28]: https://scrumguides.org/scrum-guide.html "The 2020 Scrum Guide"; https://www.staff.science.uu.nl/~dalpi001/papers/luca-dalp-werf-brin-16-refsq.pdf "The Use and Effectiveness of User Stories in Practice"; https://doi.org/10.1109/ACCESS.2022.3173745 "Systematic Literature Mapping of User Story Research"

[29]: https://arxiv.org/html/2507.15157v1 "Can LLMs Generate User Stories and Assess Their Quality?"

[30]: https://marmelab.com/blog/2025/10/30/vibe-spec-generate-specifications-from-coding-agent-logs.html "vibe-spec: Generate Specifications From Coding Agent Logs"; https://lukebechtel.com/blog/vibe-speccing "Vibe Specs: Vibe Coding That Actually Works"; https://mcguinnessai.substack.com/p/vibe-specing "Stop Writing Specs for AI — Let AI write them by interviewing you instead"

[31]: https://arxiv.org/abs/2107.03374 "Evaluating Large Language Models Trained on Code"; https://arxiv.org/abs/2305.01210 "Is Your Code Generated by ChatGPT Really Correct? Rigorous Evaluation of Large Language Models for Code Generation"; https://arxiv.org/abs/2310.06770 "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"

[32]: https://arxiv.org/abs/2302.06590 "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot"

[33]: https://github.blog/news-insights/research/does-github-copilot-improve-code-quality-heres-what-the-data-says/ "Does GitHub Copilot improve code quality? Here’s what the data says"

[34]: https://doi.org/10.1145/3491101.3519665 "Expectation vs. Experience: Evaluating the Usability of Code Generation Tools Powered by Large Language Models"

[35]: https://doi.org/10.1184/R1/22223533 "An Empirical Study of Developer Behaviors for Validating and Repairing AI-Generated Code"

[36]: https://doi.org/10.1145/3571730 "Survey of Hallucination in Natural Language Generation"

[37]: https://owasp.org/projects/top-10-for-large-language-model-applications "OWASP Top 10 for Large Language Model Applications"

[38]: https://csrc.nist.gov/pubs/sp/800/218/final "Secure Software Development Framework (SSDF) Version 1.1"
