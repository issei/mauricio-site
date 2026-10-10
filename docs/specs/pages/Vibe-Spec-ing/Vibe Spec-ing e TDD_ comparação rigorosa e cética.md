# Vibe Spec-ing e TDD: comparação rigorosa e cética

## Tese comparativa

**Vibe Spec-ing**, na definição operacional provisória adotada aqui, é um workflow conversacional humano–LLM para elicitar intenção, explicitar escopo e restrições, produzir ou atualizar uma especificação, revisá-la com stakeholders e conectá-la a critérios de aceitação, tarefas, testes e código. Pode ser **spec-first** ou **spec-retrospectivo**.

**Test-Driven Development (TDD)** é uma prática de desenvolvimento em que o programador escreve primeiro um teste automatizado que falha, implementa o código mínimo para fazê-lo passar e refatora em ciclos curtos de **red–green–refactor**. A literatura também costuma tratá-lo como combinação de test-first development e refatoração [1].

A diferença fundamental não é “conversa versus teste”, nem “IA versus automação”. É a **unidade de controle**:

- Vibe Spec-ing tenta controlar e preservar **intenção de produto, escopo, restrições, decisões e contexto** antes, durante ou depois da implementação.
- TDD controla o desenvolvimento local por meio de **comportamentos executáveis e feedback automatizado**, normalmente no nível de unidade ou componente.

Um workflow pode usar ambos. Nenhum resolve sozinho a Engenharia de Requisitos completa nem garante qualidade global do produto.

## 1. Comparação por critério

| Critério | Vibe Spec-ing | TDD | Limite da comparação |
|---|---|---|---|
| **Propósito central** | Reduzir perda de intenção entre conversa, requisitos, plano, código, testes e evolução; transformar diálogo em artefatos governados. | Guiar design e implementação incremental por testes executáveis, obter feedback rápido e apoiar refatoração segura. | O primeiro é principalmente uma hipótese de coordenação e Engenharia de Requisitos; o segundo é uma prática de construção e design de software. |
| **Nível de abstração** | Intenção de produto, necessidades, escopo, fora de escopo, restrições, stakeholders, regras, decisões e critérios de aceitação. | Comportamento observável do código, geralmente função, classe, módulo ou componente; pode chegar a testes de integração, mas não necessariamente a requisitos de produto. | Pode haver sobreposição quando critérios de aceitação são automatizados, mas o teste não substitui a intenção que o originou. |
| **Artefatos** | Conversas, transcrições/resumos, requisitos, histórias, regras, decisões, rationale, perguntas abertas, critérios, design, tarefas, matriz de rastreabilidade e histórico de mudanças. | Testes automatizados, código de produção, refatorações e resultados do executor de testes; ocasionalmente fixtures, builders e dados de teste. | Artefatos de Vibe Spec-ing variam muito e podem não existir de forma persistente; artefatos TDD são mais concretos, mas continuam limitados ao que foi codificado como teste. |
| **Grau de formalidade** | Pode variar de texto livre a especificação versionada com IDs, owners, proveniência, critérios e links. A definição provisória não garante nenhuma dessas propriedades. | O teste tem semântica operacional: pode passar ou falhar sob um ambiente definido. Isso não o torna uma especificação completa nem prova de correção. | Formalidade não é binária. Uma spec pode ser rigorosa sem ser executável; um teste pode ser executável sem cobrir o domínio. |
| **Ordem temporal** | Spec-first: conversa/spec antes do código. Spec-retrospectivo: spec extraída de logs depois do código. Pode ser híbrido e iterativo. | Teste antes da implementação correspondente; depois, código mínimo e refatoração. TDD é deliberadamente test-first no ciclo local. | “Especificação antes do código” não diferencia Vibe Spec-ing de TDD por si só: o teste é uma espécie de especificação executável, mas de escopo diferente. |
| **Conversa e colaboração** | Conversa é o mecanismo principal. Pessoas negociam valor, escopo, ambiguidades, exceções e decisões; o LLM pode perguntar, resumir, propor e sinalizar conflitos. | O feedback primário é automatizado: teste falhou/passou. Colaboração humana continua necessária para decidir o que testar, revisar design, nomear comportamentos e negociar requisitos. | TDD não é antissocial nem dispensa colaboração; Vibe Spec-ing não é colaborativo apenas porque há diálogo com uma IA. |
| **Conhecimento tácito** | Pode revelar e registrar conhecimento tácito por perguntas, exemplos, probes e confirmação; também pode apagá-lo ao resumir ou normalizar a conversa. | Geralmente captura apenas o conhecimento que o desenvolvedor traduz em comportamento testável; rationale, conflitos e intenções rejeitadas podem ficar fora dos testes. | Nenhum dos dois preserva automaticamente conhecimento tácito. Registro de decisões e participação de especialistas são necessários. |
| **Restrições não funcionais** | Pode elicitar segurança, desempenho, disponibilidade, compliance, privacidade, interfaces, limites e riscos, mas somente se forem perguntados, compreendidos e validados. | Pode testar alguns atributos não funcionais, mas TDD unitário frequentemente não os cobre; testes de carga, segurança, contrato e resiliência exigem práticas adicionais. | A presença de um teste de desempenho ou segurança não demonstra que todas as metas não funcionais foram descobertas. |
| **Escopo e fora de escopo** | Pode tornar explícitos objetivo, fronteira, dependências, hipóteses e fora de escopo. O LLM pode inventar escopo plausível ou congelar decisões prematuramente. | O escopo aparece indiretamente no conjunto de testes e no código; o que nunca foi testado pode permanecer invisível. | Testes podem evidenciar escopo implementado, não necessariamente escopo pretendido. |
| **Decisões rejeitadas** | Pode registrá-las deliberadamente em rationale e histórico; a definição operacional exige governança para isso, mas não a garante. | Normalmente não registra alternativas de produto rejeitadas. O histórico pode preservar decisões de design, mas raramente o contexto de negócio. | Um commit ou teste removido não é automaticamente um registro confiável de decisão rejeitada. |
| **Rastreabilidade** | Pode ligar stakeholder/fonte → requisito → design → tarefa → código → teste → implantação → mudança. Essa é uma meta do workflow, não uma propriedade automática de uma conversa. | O vínculo teste–código pode ser forte localmente, sobretudo em commits e suites, mas a ligação requisito–teste–código costuma exigir convenções e ferramentas adicionais. | Cobertura de testes não é rastreabilidade; uma matriz de links pode existir e estar semanticamente errada. |
| **Manutenção e drift** | Tem risco elevado de *spec drift*: código, spec, conversa, testes e decisões podem divergir; o problema exige política explícita de fonte de verdade, versionamento e detecção. | Testes executados continuamente detectam regressões no comportamento exercitado. Entretanto, testes podem ficar obsoletos, ser alterados para acomodar código ou continuar verdes enquanto o requisito muda. | TDD reduz certos drifts entre código e testes, mas não resolve drift entre produto, requisitos e testes. |
| **Verificabilidade** | Uma spec só é verificável se cada requisito tiver condição observável, limites, dados, oráculo e procedimento. Texto fluente ou aprovação humana não basta. | Cada teste fornece um veredito operacional para um caso ou conjunto de entradas. Isso garante apenas que o comportamento exercitado satisfaz o oráculo codificado naquele ambiente. | Um teste verde não garante correção total, completude, segurança, desempenho ou adequação ao objetivo de negócio. |
| **Oráculos** | Oráculos podem ser stakeholders, regras de negócio, documentos normativos, critérios de aceitação, propriedades, testes, simulações ou métodos formais. São heterogêneos e frequentemente difíceis de obter. | O oráculo está codificado no teste: valores esperados, propriedades, invariantes, snapshots ou efeitos observáveis. Um oráculo errado produz confiança errada com grande eficiência. | TDD torna o feedback barato; não torna o oráculo correto. Vibe Spec-ing torna decisões explícitas quando funciona; não cria conhecimento verdadeiro. |
| **Evidência de eficácia** | Não há estudo controlado ou longitudinal localizado comparando o workflow completo com baseline de Engenharia de Requisitos, Three Amigos ou Example Mapping. A evidência é indireta e parcial: estudos de LLM em elicitação/SRS, ambiguidade e práticas de SDD. | Há meta-análises, revisões sistemáticas, experimentos acadêmicos e estudos industriais, mas com resultados divergentes e forte dependência de contexto. | TDD tem evidência sobre a prática. Isso não prova que qualquer implementação de TDD funcione, nem autoriza transferir resultados para Vibe Spec-ing. |

## 2. Propósito e abstração: não são concorrentes diretos

TDD responde principalmente à pergunta:

> **“Qual é o menor próximo incremento de comportamento que devo implementar e como verifico que ele continua funcionando?”**

Vibe Spec-ing tenta responder a perguntas anteriores e mais amplas:

> **“Qual problema estamos resolvendo, para quem, dentro de qual fronteira, com quais regras, restrições, riscos e critérios de aceitação?”**

A diferença é importante. Um teste unitário pode dizer que `calculateRefund()` retorna `42` para determinado cenário. Ele não descobre, sozinho, se a política de devolução deveria valer por 30 ou 60 dias, se o cliente sem recibo está no escopo, se há obrigação regulatória, quem autorizou a regra ou se a funcionalidade deveria existir.

Inversamente, uma spec pode dizer que devoluções elegíveis devem ser reembolsadas em até dois dias úteis, mas isso não demonstra que a implementação funciona. O teste precisa verificar uma parcela operacionalizável da regra.

A afirmação mais precisa é que **TDD pode ser um mecanismo de verificação e design dentro de um workflow de especificação; Vibe Spec-ing pode ser um mecanismo de elicitação e governança que fornece insumos para TDD**.

## 3. O que realmente é especificação em cada abordagem

### 3.1 Vibe Spec-ing

O termo não designa uma técnica consolidada. Na definição provisória, o artefato de especificação deve ser considerado engenharia de requisitos apenas quando houver, no mínimo:

- identificação, versão, owner, prioridade, risco e rationale;
- objetivo, escopo, fora de escopo, pressupostos e dependências;
- requisitos separados de decisões de implementação;
- exemplos, exceções, limites e critérios de aceitação;
- perguntas abertas, conflitos e alternativas rejeitadas;
- confirmação por stakeholders com autoridade relevante;
- rastreabilidade bidirecional e proveniência do uso do LLM;
- política explícita para divergência entre spec, testes e código.

Uma conversa com um LLM que gera um Markdown convincente, mas não mantém esses elementos, é melhor descrita como **assistência textual ou brainstorming**. Não há base para chamá-la de método novo de Engenharia de Requisitos.

A variante retrospectiva apresenta um problema adicional: extrair requisitos de logs pode documentar decisões já tomadas, mas pode também transformar escolhas acidentais de implementação em suposta intenção original. A documentação retrospectiva não prova que o produto implementado estava correto nem recupera decisões que nunca foram registradas.

### 3.2 TDD

No TDD, o teste é uma especificação executável local. Ele define, para entradas e estados selecionados, o comportamento esperado. O ciclo red–green–refactor fornece feedback rápido sobre a implementação e encoraja design incremental, modularidade e refatoração protegida por regressão.

Isso não significa que o teste seja uma especificação de produto completa. A suite pode:

- omitir requisitos inteiros;
- testar exemplos não representativos;
- usar oráculos errados;
- ignorar casos negativos e fronteiras;
- não cobrir segurança, desempenho, usabilidade, operação ou compliance;
- passar enquanto a implementação satisfaz o teste, mas viola a intenção do stakeholder.

A contribuição específica do TDD é tornar certas decisões de comportamento **executáveis e repetíveis**, não resolver a descoberta de todas as decisões relevantes.

## 4. Ordem temporal e variantes

| Momento | Vibe Spec-ing spec-first | Vibe Spec-ing retrospectivo | TDD |
|---|---|---|---|
| Antes do código | Entrevista, clarificação, spec e aprovação; depois design e implementação. | Não se aplica ao artefato principal, que é criado após a sessão de desenvolvimento. | Teste falha antes do código correspondente. |
| Durante o código | Spec, tarefas e testes podem ser atualizados conforme surgem informações. | Logs são acumulados; a intenção pode continuar implícita. | Ciclos curtos de red–green–refactor. |
| Depois do código | Revisão de aceitação, rastreabilidade, drift e manutenção. | LLM resume logs em uma spec que pode servir como documentação/âncora futura. | Suite de regressão verifica comportamento já codificado; novos testes podem ser adicionados para defeitos. |

A vantagem temporal do TDD é o feedback imediato. A vantagem pretendida do spec-first é reduzir decisões implícitas antes de o agente ou desenvolvedor implementar. A vantagem pretendida do retrospectivo é preservar contexto depois que o trabalho já ocorreu. Nenhuma dessas vantagens está demonstrada para o workflow Vibe Spec-ing completo.

## 5. Conversa humana, colaboração e feedback automatizado

TDD pode funcionar com pouca conversa explícita porque o teste fornece um contrato local e um feedback binário. Isso é uma força de velocidade, mas também uma fonte de risco: o processo pode otimizar o que é fácil de testar e deixar invisível aquilo que não foi discutido.

Vibe Spec-ing coloca a conversa no centro. Isso pode ajudar a expor conhecimento tácito por perguntas abertas, exemplos e casos-limite. A literatura de elicitação mostra, porém, que perguntas não são neutras: stakeholders omitem tópicos, analistas deixam de perceber ambiguidades e a revisão de entrevistas pode ser custosa [5][6]. Um LLM pode aumentar a capacidade de gerar perguntas, mas também pode:

- sugerir premissas não fornecidas;
- conduzir o stakeholder para uma solução;
- transformar incerteza em texto assertivo;
- ancorar revisores em uma resposta fluente;
- ocultar divergências sob um resumo harmonizado.

A colaboração humana necessária não é a mesma nos dois casos. Em TDD, especialistas decidem o comportamento de cada teste e revisam o design. Em Vibe Spec-ing, stakeholders precisam decidir valor, prioridade, escopo, trade-offs, riscos e aceitação. A IA não deve ser confundida com autoridade de produto.

## 6. Requisitos não funcionais, conhecimento tácito e decisões rejeitadas

Este é um dos pontos em que Vibe Spec-ing pode parecer mais abrangente que TDD, mas a vantagem é apenas potencial.

Uma conversa estruturada pode perguntar explicitamente por:

- desempenho, disponibilidade, segurança e privacidade;
- interfaces e compatibilidade;
- usuários afetados e condições excepcionais;
- regras regulatórias;
- fora de escopo;
- alternativas rejeitadas e rationale;
- conflitos entre stakeholders.

TDD normalmente não inicia por essas perguntas. Ele trabalha melhor quando o comportamento já foi selecionado e pode ser expresso por um oráculo executável. Pode haver TDD para propriedades de desempenho, contratos, segurança ou resiliência, mas isso exige extensão do nível de teste e conhecimento especializado.

Por outro lado, uma conversa com IA não garante captura desses elementos. Se o prompt, o contexto ou os participantes não os incluírem, a spec pode parecer completa e continuar omissa. A ISO/IEC/IEEE 29148 e checklists de requisitos tratam completude, consistência, correção, verificabilidade e rastreabilidade como propriedades a serem analisadas e validadas, não como efeitos automáticos de escrever mais texto [3][4].

## 7. Rastreabilidade, manutenção e drift

### 7.1 Vibe Spec-ing

O risco de drift é estruturalmente alto porque há mais artefatos e mais transformações:

```text
conversa → resumo → requisito → design → tarefa → código → teste → produto
```

Cada seta pode perder contexto, introduzir inferência ou criar contradição. A mitigação precisa registrar proveniência, versões, decisões humanas, prompts, modelo, fontes e mudanças. Também precisa definir se a fonte de verdade é a spec, o código, os testes ou uma combinação governada.

A variante retrospectiva pode reduzir a perda de documentação em relação a não registrar nada, mas tem um problema epistemológico: o log mostra o que foi dito e feito, não necessariamente o que deveria ter sido feito. Portanto, a spec extraída pode ser rastreável ao processo de desenvolvimento e ainda estar errada em relação à intenção do produto.

### 7.2 TDD

O TDD mantém uma relação forte entre teste e comportamento implementado quando os testes são executados continuamente. Uma alteração que quebra um comportamento coberto produz feedback rápido. Essa é uma forma real de controle de regressão.

Mas TDD também sofre drift:

- testes podem ser alterados junto com o código para preservar um comportamento errado;
- testes podem verificar detalhes internos e dificultar refatoração;
- testes podem ficar obsoletos quando o produto muda;
- suites grandes podem aumentar tempo de execução e custo de manutenção;
- cobertura alta pode coexistir com oráculos fracos;
- comportamentos não testados continuam sem proteção.

Assim, TDD tende a reduzir **drift código–teste** no escopo exercitado. Não resolve automaticamente **drift intenção–requisito–código**.

## 8. Verificabilidade e oráculos: o que cada um garante

### TDD garante, no máximo

- que os testes executados passaram naquele ambiente e configuração;
- que os oráculos codificados aceitaram os resultados observados;
- que determinados comportamentos cobertos não regrediram, se a suite for mantida e confiável;
- que o ciclo fornece feedback rápido para o desenvolvedor.

TDD **não garante**:

- que os requisitos estejam completos ou corretos;
- que o teste represente a necessidade do usuário;
- que todos os estados, entradas e exceções relevantes estejam cobertos;
- que requisitos não funcionais estejam atendidos;
- que a segurança, usabilidade ou operação estejam adequadas;
- que a suite tenha bons oráculos.

### Vibe Spec-ing pode produzir, no máximo

- uma representação mais explícita de intenção, se stakeholders corrigirem e aprovarem a spec;
- critérios, exemplos, decisões e perguntas abertas que podem ser transformados em testes;
- rastreabilidade auditável, se links e proveniência forem mantidos;
- candidatos a inconsistências, omissões e ambiguidades, se houver revisão independente.

Vibe Spec-ing **não garante**:

- que o LLM tenha entendido corretamente o domínio;
- que a spec seja completa por estar longa ou bem escrita;
- que a aprovação do usuário seja validação organizacional suficiente;
- que as decisões rejeitadas e conflitos tenham sido preservados;
- que o código satisfaça a spec;
- que os critérios de aceitação sejam bons oráculos;
- que a spec retrospectiva represente a intenção original.

A diferença é que TDD oferece um **veredito operacional local**, enquanto Vibe Spec-ing pretende melhorar a **qualidade e a governança daquilo que será verificado**. São garantias diferentes e incompletas.

## 9. Evidência empírica

### 9.1 TDD: há evidência, mas não há consenso forte

A meta-análise de Rafique e Mišić reuniu 27 estudos. O resultado agregado indicou **pequeno efeito positivo sobre qualidade e pouco ou nenhum efeito discernível sobre produtividade**. A análise por subgrupos encontrou melhora de qualidade e queda de produtividade mais pronunciadas em estudos industriais, além de influência do tamanho da tarefa e do esforço de testes [1].

A revisão sistemática de Bissi, Neto e Emer analisou 1.107 artigos inicialmente e estudou 27 em profundidade. Ela relatou aumento de qualidade interna em 76% dos estudos e de qualidade externa em 88%, mas também aumento de produtividade em contexto acadêmico, queda em contexto industrial e produtividade menor em aproximadamente 44% dos estudos [2]. Esses percentuais são descritivos da literatura selecionada; não constituem um efeito causal universal e podem refletir diferenças de desenho, participantes, tarefas e definição de produtividade.

O experimento industrial de Tosun et al. envolveu 24 profissionais em três locais, com desenho repeated-measures, comparando TDD a incremental test-last em duas tarefas simples e uma aplicação brownfield mais realista. Não encontrou diferença estatística de qualidade externa. Encontrou maior produtividade com TDD em tarefa simples, mas queda significativa em tarefa brownfield complexa. Os autores concluíram que a complexidade e a seleção da tarefa podem dominar os resultados [3].

O estudo de Nagappan et al. acompanhou quatro equipes industriais de IBM e Microsoft e observou quedas de densidade de defeitos de 40% em uma equipe IBM e 60–90% nas equipes Microsoft. Porém, o tempo de desenvolvimento estimado pela gestão aumentou entre 15% e 35%. Os próprios autores destacaram ameaças: comparação entre projetos diferentes, possível diferença entre projeto novo e legado, ausência de comparação perfeita e dificuldade de generalização [4].

O quadro cético é, portanto:

- TDD tem **mais evidência direta** que Vibe Spec-ing.
- Há sinais razoáveis de benefício em qualidade e prevenção de regressões.
- O custo inicial e o impacto na produtividade são contextuais e podem ser negativos.
- Estudos de qualidade usam métricas diferentes; densidade de defeitos, testes passados, qualidade externa e manutenção não são o mesmo construto.
- Os resultados não autorizam dizer que TDD sempre reduz custo ou sempre aumenta produtividade.

### 9.2 Vibe Spec-ing: não há evidência direta do workflow

Não foi localizado RCT, quase-experimento ou estudo longitudinal que compare o workflow completo definido neste documento — conversa, spec versionada, revisão independente, implementação, medição de drift e defeitos — com uma baseline de Engenharia de Requisitos ou TDD.

Há evidência adjacente, mas ela não deve ser inflada:

- estudos de ChatGPT/LLMs em elicitação e geração de SRS mostram capacidade parcial em tarefas controladas, com amostras pequenas e falhas de domínio, interfaces, restrições e segurança [7][8];
- um estudo industrial de ambiguidade encontrou melhora média com exemplos em contexto, mas também falhas de terminologia específica [9];
- estudos de SDD e ferramentas como Spec Kit e Kiro documentam workflows de requisitos, design, tarefas e critérios, mas documentação de fornecedor não prova eficácia [10];
- estudos de programação assistida mostram resultados divergentes de produtividade e riscos de confiança inadequada, mas não medem Vibe Spec-ing [11][12].

Logo, a afirmação correta é: **Vibe Spec-ing é uma hipótese de workflow com evidência indireta, enquanto TDD é uma prática com corpo empírico comparativo, ainda inconclusivo e contextual**.

## 10. Riscos e limitações

| Risco | Vibe Spec-ing | TDD |
|---|---|---|
| **Falsa confiança** | Texto fluente, aprovação rápida e aparência de completude podem esconder omissões e alucinações. | Suite verde pode dar confiança em comportamento estreito; o risco vem do oráculo e da cobertura, não de fluência textual. |
| **Overreliance** | Usuários podem aceitar a interpretação do LLM e deixar de revisar fontes, alternativas e decisões. | Desenvolvedores podem confiar demais em testes existentes ou evitar questionar a regra codificada no teste. |
| **Cobertura incompleta** | A conversa pode omitir tópicos, stakeholders, exceções e requisitos não funcionais. | A suite pode omitir comportamentos, estados, entradas, propriedades e cenários de sistema. |
| **Custo de manutenção** | Mais artefatos, links, prompts, versões e revisões; custo de proveniência e sincronização. | Suites lentas, frágeis, duplicadas ou acopladas a implementação; custo de manter testes atualizados. |
| **Drift** | Divergência entre conversa, spec, design, tarefas, código e testes. | Divergência entre testes, código e intenção; testes podem ser modificados para seguir o código. |
| **Conhecimento de domínio** | O LLM pode não compreender terminologia, regulações ou contexto tácito. | O desenvolvedor também pode não compreender o domínio; o teste pode cristalizar uma interpretação errada. |
| **Viés de processo** | Perguntas e resumos da IA podem conduzir respostas e apagar conflitos. | TDD pode favorecer o que é facilmente testável e o design local, não necessariamente o melhor produto. |
| **Escopo inadequado** | Spec-first pode burocratizar protótipos; retrospectivo pode legitimar decisões acidentais. | TDD pode ser caro ou pouco adequado para exploração, UI, integração ampla e requisitos ainda instáveis. |
| **Não determinismo** | Modelo, prompt, contexto e ferramenta podem mudar o resultado. | Testes são mais determinísticos, mas dependem de ambiente, dados, tempo, rede e flakiness. |
| **Segurança** | Pode inventar requisitos de segurança ou expor conversas/dados sensíveis. | Testes unitários não substituem threat modeling, análise estática, testes de segurança e revisão especializada. |

## 11. Complementaridade e incompatibilidades

### 11.1 Quando faz sentido usar os dois

A combinação é plausível quando há intenção suficientemente definida, mas ainda é necessário transformar regras em comportamento verificável:

1. stakeholders e equipe usam conversa estruturada para definir objetivo, escopo, restrições e exemplos;
2. a spec registra critérios, exceções, fora de escopo, rationale e perguntas abertas;
3. critérios de aceitação são refinados em testes de aceitação ou contratos;
4. o desenvolvedor usa TDD para decompor cada comportamento em testes unitários e de componente;
5. testes de integração, segurança, desempenho e aceitação cobrem níveis que TDD unitário não cobre;
6. mudanças atualizam requisito, testes e código, com revisão de drift;
7. stakeholders revalidam a intenção após mudanças significativas.

Nesse arranjo, Vibe Spec-ing **não substitui TDD**. Ele fornece contexto e decisões; TDD fornece feedback local e proteção de regressão.

### 11.2 Quando TDD pode prejudicar o workflow de especificação

TDD pode prejudicar se:

- testes unitários forem tratados como única definição de produto;
- o time começar a implementar exemplos antes de resolver conflitos de escopo;
- a pressão por ciclos red–green levar a uma decisão de negócio prematura;
- testes acoplados à implementação desestimulem mudanças de design necessárias;
- a cobertura numérica substitua análise de completude, risco e não funcionais.

### 11.3 Quando Vibe Spec-ing pode prejudicar TDD

Vibe Spec-ing pode prejudicar se:

- gerar specs extensas e burocráticas antes de feedback executável;
- transformar cada sugestão do LLM em requisito “aprovado” sem autoridade de produto;
- gerar testes a partir da própria spec sem exemplos independentes ou oráculos humanos;
- fazer o desenvolvedor confiar em critérios vagos que não compilam nem falham de forma útil;
- manter muitos artefatos redundantes que aumentam custo e drift;
- usar a variante retrospectiva para racionalizar código já produzido, em vez de detectar que a intenção nunca foi validada.

### 11.4 Quando usar apenas um deles

**TDD pode ser suficiente como prática principal** para uma mudança pequena, bem compreendida, em um componente com contrato claro, baixo risco de domínio e boa suite de integração existente. Ainda assim, requisitos de produto e não funcionais não desaparecem.

**Vibe Spec-ing pode ser útil sem TDD** em descoberta inicial, análise de domínio, negociação de escopo, documentação de decisões ou recuperação de contexto de uma base legada. Mas, sem testes ou outra forma de verificação, a spec continua sem confirmação operacional.

Em sistemas críticos, nenhum dos dois deveria ser usado isoladamente. A combinação precisa incluir Engenharia de Requisitos, análise de risco, validação com especialistas, testes independentes, segurança e governança de mudanças.

## 12. Condições para valor mensurável

### Vibe Spec-ing só agrega valor mensurável se demonstrar, contra uma baseline comparável:

- maior cobertura de necessidades e restrições aplicáveis;
- menos ambiguidades críticas e omissões;
- maior correção e consistência após adjudicação independente;
- melhor rastreabilidade bidirecional e menor taxa de links órfãos;
- menor perda de decisões, rationale e conflitos de valor;
- menos retrabalho, defeitos escapados ou drift;
- custo total menor, incluindo geração, revisão, adjudicação, manutenção e tokens;
- resultados de produto pelo menos não inferiores em funcionalidade, segurança, desempenho e manutenibilidade.

A comparação precisa separar spec-first e retrospectivo, registrar modelo/prompt/versão, usar avaliadores cegos, preservar desacordos e acompanhar mudanças ao longo do tempo. Texto mais longo, mais bonito ou aprovado mais rapidamente não é evidência suficiente.

### TDD agrega valor mensurável quando, no contexto dado, demonstrar:

- menor densidade de defeitos ou menos regressões em comportamento coberto;
- feedback mais rápido e menor tempo para localizar falhas;
- melhor manutenibilidade sem custo de teste desproporcional;
- design mais modular ou mudanças mais seguras;
- custo total menor após considerar criação, execução e manutenção dos testes;
- produtividade aceitável ou superior para o tipo de tarefa e maturidade da equipe.

A medição deve distinguir qualidade interna, qualidade externa, produtividade, tempo de teste, custo de manutenção, experiência da equipe e efeito da complexidade da tarefa. A literatura não sustenta um limiar universal.

## 13. Conclusão cética

A diferença entre Vibe Spec-ing e TDD é substantiva **quando os termos são operacionalizados corretamente**, mas não porque um seja “moderno” e o outro “tradicional”.

- TDD é uma prática identificável, com ciclo temporal e feedback executável relativamente claros. Sua evidência empírica é muito mais extensa. Ela sugere possíveis ganhos de qualidade e regressão, mas produtividade e custo dependem de contexto, tarefa, experiência, esforço de testes e manutenção.
- Vibe Spec-ing é um rótulo provisório para um workflow conversacional com LLM. Sua promessa está em elicitação, memória, coordenação, proveniência e manutenção de intenção. Ainda não há evidência direta de que ele melhore completude, correção, consistência, verificabilidade, rastreabilidade, custo ou qualidade do produto.
- O teste de TDD verifica aquilo que foi codificado como oráculo. A spec conversacional organiza aquilo que se decidiu verificar. Sem boa intenção e escopo, TDD pode testar a coisa errada; sem oráculos e execução, Vibe Spec-ing pode documentar uma intenção errada.
- A combinação mais defensável é **conversa governada → requisitos e critérios validados → testes de aceitação/contratos → TDD para implementação local → testes de integração, segurança e não funcionais → revisão de drift**.

A conclusão mais cética é também a mais útil: **Vibe Spec-ing não deve reivindicar superioridade sobre TDD, nem substituí-lo.** Se algum valor novo existir, ele terá de ser demonstrado em uma camada diferente — qualidade e governança da intenção — por meio de estudos que comparem o workflow completo com práticas humanas ou híbridas e meçam resultados de ciclo de vida. Até lá, a descrição honesta é: **TDD é uma prática empiricamente estudada de desenvolvimento orientado por testes; Vibe Spec-ing é uma hipótese de orquestração conversacional que pode fornecer contexto para TDD, mas ainda não provou seu próprio valor.**

## Referências

[1]: https://doi.org/10.1109/TSE.2012.28 "The Effects of Test-Driven Development on External Quality and Productivity: A Meta-Analysis"

[2]: https://doi.org/10.1016/j.infsof.2016.02.004 "The effects of test driven development on internal quality, external quality and productivity: A systematic review"

[3]: https://doi.org/10.1007/s10664-016-9490-0 "An industry experiment on the effects of test-driven development on external quality and productivity"

[4]: https://www.microsoft.com/en-us/research/wp-content/uploads/2009/10/Realizing-Quality-Improvement-Through-Test-Driven-Development-Results-and-Experiences-of-Four-Industrial-Teams-nagappan_tdd.pdf "Realizing Quality Improvement Through Test-Driven Development: Results and Experiences of Four Industrial Teams"

[5]: https://doi.org/10.1007/s00766-016-0249-3 "Ambiguity and tacit knowledge in requirements elicitation interviews"

[6]: https://par.nsf.gov/servlets/purl/10061986 "Interview Review: An Empirical Study on Detecting Ambiguities in Requirements Elicitation Interviews"

[7]: https://doi.org/10.1109/SEAA60479.2023.00061 "Investigating ChatGPT’s Potential to Assist in Requirements Elicitation Processes"

[8]: https://doi.org/10.1109/RE59067.2024.00056 "Using LLMs in Software Requirements Specifications: An Empirical Evaluation"

[9]: https://www.ipr.mdu.se/pdf_publications/7221.pdf "Requirements Ambiguity Detection and Explanation with LLMs: An Industrial Study"

[10]: https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl"

[11]: https://arxiv.org/abs/2302.06590 "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot"

[12]: https://arxiv.org/abs/2507.09089 "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity"

[13]: https://standards.ieee.org/standard/29148-2018.html "ISO/IEC/IEEE 29148:2018 — Systems and software engineering — Life cycle processes — Requirements engineering"

[14]: https://cucumber.io/docs/bdd/example-mapping/ "Example Mapping — Cucumber documentation"
