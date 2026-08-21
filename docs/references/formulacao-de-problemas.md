# Formulação de Problemas como Engenharia Interrompida da Incerteza

### Fundamentação Multidisciplinar, Framework Integrado e Programa de Validação Empírica

**Autor(es):** [Nome do autor]
**Afiliação:** [Instituição]

---

## Resumo

A formulação de problemas é frequentemente tratada como etapa preliminar, intuitiva e qualitativa da tomada de decisão, subordinada à resolução do modelo já estruturado. Este artigo investiga criticamente a hipótese de que a formulação de problemas complexos pode ser compreendida como um processo de engenharia da redução de incerteza orientado à decisão — e propõe, como refinamento necessário dessa hipótese, que esse processo deve ser entendido como uma engenharia *interrompida*, isto é, deliberadamente sujeita a regras de parada que impedem o refinamento contínuo de degenerar em complexidade, viés de confirmação e falsa confiança. A investigação integra sete tradições teóricas — Problem Structuring Methods, Decision Analysis, Teoria da Informação, Bayesian Decision Theory, Ciência Cognitiva, Engenharia de Requisitos e de Sistemas, e Knowledge Engineering — por meio de revisão multidisciplinar orientada a lacunas. Constata-se que cada tradição resolve fragmentos do problema, mas nenhuma oferece uma teoria integrada de estados de conhecimento, métricas multidimensionais de incerteza e regras de parada simultaneamente sensíveis a custo, viés cognitivo e legitimidade. Propõe-se um framework composto por uma ontologia híbrida mínima, um modelo de seis estados de conhecimento, um vetor de métricas multidimensionais, um índice de suficiência decisional, um penalizador de hiper-resolução cognitiva e um programa empírico de validação com critérios explícitos de falseabilidade. A conclusão é de sustentação **parcial** da hipótese: a formulação estruturada pode reduzir incertezas relevantes para a decisão, mas essa redução não é monotônica, não é universal e não é suficiente por si só — precisa ser interrompida antes que custo, viés e complexidade superem o benefício informacional esperado, e precisa acomodar situações em que o problema central não é factual, mas normativo.

**Palavras-chave:** formulação de problemas; redução de incerteza; problem structuring methods; valor da informação; suficiência decisional; engenharia de requisitos; decisão bayesiana; regras de parada.

---

## 1. Introdução

### 1.1 Motivação

Em contextos organizacionais, científicos e técnicos, a dificuldade mais consequente raramente está em resolver um problema já formalizado. Está em determinar qual é o problema relevante, quem tem legitimidade para defini-lo, quais objetivos devem ser considerados, quais alternativas são admissíveis, quais evidências são suficientes, quais incertezas podem ser toleradas e — talvez a pergunta mais negligenciada — quando a investigação deve parar.

A Pesquisa Operacional clássica desenvolveu ferramentas poderosas para otimizar decisões uma vez que objetivos, restrições e alternativas já estão especificados. Essa tradição pressupõe, no entanto, que a formulação já foi entregue ao analista. Reconhecendo essa lacuna, a escola britânica de *Soft OR* desenvolveu os *Problem Structuring Methods* (PSMs) para lidar com situações em que objetivos, fronteiras e perspectivas de múltiplos atores permanecem em disputa — os chamados problemas mal estruturados, ou "bagunças" (*messes*), na terminologia de Ackoff. Essa divisão entre Pesquisa Operacional "dura" e "branca" é amplamente reconhecida na literatura, mas até o momento não existe um framework integrado e testável capaz de representar a evolução de uma formulação, desde a ambiguidade inicial até uma condição de suficiência decisional, de modo comparável entre domínios.

### 1.2 Problema de pesquisa

A questão central deste artigo é:

> Como representar, medir e validar a evolução de uma formulação de problemas desde uma situação inicialmente desestruturada até um estado de suficiência decisional, sem confundir redução de incerteza com qualidade absoluta ou verdade objetiva?

Essa pergunta se desdobra em quatro subquestões:

1. Como representar estados de conhecimento ao longo do processo de formulação?
2. Como medir incertezas de naturezas distintas — aleatória, epistêmica, estrutural, semântica, de fronteira e de valores?
3. Como avaliar a suficiência de uma formulação para apoiar uma decisão específica?
4. Como detectar o ponto em que o refinamento adicional deixa de reduzir incerteza relevante e passa a produzir complexidade, viés ou confiança injustificada?

### 1.3 Lacuna científica

A literatura oferece soluções parciais e não integradas. Os PSMs tratam da estruturação sociocognitiva de situações plurais; a Decision Analysis trata do valor da informação e da escolha racional sob incerteza; a Engenharia de Requisitos trata de atributos documentais de qualidade; a Bayesian Decision Theory trata da atualização probabilística de crenças; a Ciência Cognitiva trata de vieses, heurísticas e limites da racionalidade humana; a Knowledge Engineering trata da representação formal de conhecimento por meio de ontologias.

Nenhuma dessas tradições, isoladamente, integra simultaneamente incerteza probabilística, incerteza epistêmica, incerteza de fronteira, incerteza de valores, legitimidade, rastreabilidade, custo de investigação, suficiência decisional e regressão da formulação ao longo do tempo. A lacuna não é a ausência de componentes — eles existem, em graus variados de maturidade — mas a ausência de uma ontologia e de um processo comuns que representem, de modo auditável, como uma situação ambígua transita por estados de conhecimento sucessivos, e como cada transição altera o conjunto de ações, valores, modelos e incertezas relevantes.

### 1.4 Hipótese refinada

**H₁ (hipótese principal, condicional):** Em problemas complexos, a formulação orientada por um processo estruturado de elicitação, representação, validação e investigação produz decisões mais robustas do que formulações *ad hoc* quando reduz incertezas relevantes para a ação, explicita premissas, preserva rastreabilidade, testa enquadramentos concorrentes e atinge uma condição de suficiência operável antes que os custos, os vieses e a complexidade adicional superem o benefício esperado da informação.

Esta hipótese **não afirma** que:

- toda informação adicional melhora a decisão;
- toda incerteza deve ser eliminada;
- existe uma formulação verdadeira e única para um mesmo problema;
- toda formulação deve ser quantitativa;
- a parada da investigação pode ser definida por uma métrica universal, válida em qualquer domínio.

**Hipóteses secundárias:**

- **H₂ — Valor decisional:** medidas de valor da informação orientadas a utilidade (EVSI, ENBS) predizem melhor a utilidade de investigações adicionais do que medidas isoladas de entropia.
- **H₃ — Qualidade representacional:** cobertura, consistência, rastreabilidade e validade ecológica explicam uma parte independente do desempenho decisional, além do que é explicado pela experiência do decisor.
- **H₄ — Limite cognitivo:** a partir de determinado ponto, o aumento da complexidade da formulação eleva a confiança subjetiva mais rapidamente do que a acurácia ou a robustez da decisão.
- **H₅ — Pluralismo:** em problemas sociotécnicos, a legitimidade e a cobertura de perspectivas moderam a relação entre qualidade formal da formulação e adoção efetiva da decisão.
- **H₆ — Generalização:** o framework possui maior validade quando aplicado a problemas com objetivos parcialmente estabilizados e alternativas identificáveis; sua validade diminui quando a disputa de valores domina a incerteza factual.

### 1.5 Contribuições esperadas

Distinguem-se, desde já, contribuições que são síntese de literatura existente e contribuições apresentadas como propostas originais, ainda não validadas:

1. uma ontologia híbrida mínima para estados de formulação (síntese);
2. representação explícita da incerteza de fronteira, isto é, da adequação do escopo e dos stakeholders identificados (síntese com refinamento);
3. integração entre validade ecológica e suficiência decisional em um mesmo vetor de avaliação (proposta original);
4. um modelo de regressão da formulação, isto é, de degradação de suas propriedades ao longo do tempo (proposta original);
5. uma penalidade de hiper-resolução cognitiva (λ), que penaliza o crescimento de confiança desproporcional ao crescimento de acurácia (proposta original);
6. o conceito de suficiência negociada, para problemas em que não existe regra de parada puramente matemática (proposta original);
7. um benchmark transversal de dez casos parametrizados para comparação de métodos de formulação (proposta original);
8. um protocolo experimental para comparar formulações estruturadas, formulações *ad hoc* e formulações assistidas por inteligência artificial (proposta original).

Nenhum desses elementos deve ser lido como resultado estabelecido. São, no melhor dos casos, hipóteses operacionalizáveis derivadas de uma síntese crítica da literatura.

---

## 2. Delimitação Conceitual

### 2.1 Problema

Um problema é uma situação em que o estado atual difere do estado desejado, e existem possibilidades de ação, restrições, consequências e critérios de avaliação. Em situações complexas essa definição é incompleta, porque o próprio estado desejado, as alternativas disponíveis e até a fronteira do sistema podem ser objeto de disputa entre atores. Um problema deve, portanto, ser tratado como uma combinação de situação observada, interpretação, objetivos, alternativas, restrições, evidências, valores, incertezas e atores — não como um objeto ontologicamente dado e à espera de descoberta.

### 2.2 Formulação

Formulação é o processo de construir uma representação suficientemente explícita para apoiar raciocínio, comparação, investigação ou ação. Ela deve ser vista como uma transformação, F_t → F_{t+1}, em que cada nova formulação pode reduzir ambiguidades, revelar conflitos antes latentes, adicionar evidências, introduzir novas hipóteses, excluir alternativas, ampliar ou restringir a fronteira do sistema, ou mesmo alterar a própria definição do problema. A formulação não é etapa que precede a "verdadeira" análise: é objeto de engenharia por direito próprio.

### 2.3 Engenharia

O termo é empregado em sentido metodológico, não celebratório: implica processo explícito, artefatos versionados, critérios de qualidade, rastreabilidade, verificação, validação, análise de custo, gestão de mudança e possibilidade de auditoria. A analogia com a Engenharia de Requisitos é útil, mas limitada — um requisito pode ser completo e verificável sem que a formulação estratégica subjacente esteja correta. Chamar a formulação de "engenharia" também exige uma ressalva epistemológica: ao contrário de um artefato físico, o objeto da formulação — a situação problemática — não é estável, é percebido, disputado e parcialmente constituído pelos próprios participantes. O engenheiro de formulação não manipula a realidade empírica diretamente; manipula o artefato representacional que a codifica para uma finalidade declarada.

### 2.4 Incerteza

A incerteza é decomposta em seis dimensões, evitando reduzi-la a uma única distribuição probabilística:

| Dimensão | Pergunta que a define |
|---|---|
| Aleatória | O que varia mesmo quando o modelo está correto? |
| Epistêmica | O que ainda não sabemos sobre o fenômeno? |
| Estrutural | Quais relações, variáveis ou mecanismos causais podem estar ausentes do modelo? |
| Semântica | O que os conceitos e objetivos, tal como enunciados, realmente significam? |
| De fronteira | O escopo do sistema e os stakeholders identificados são adequados? |
| De valores | Quais objetivos, preferências e critérios devem governar a decisão? |

### 2.5 Decisão

Uma decisão é uma escolha entre alternativas sob condições de informação, incerteza, valores, risco, custo e tempo. A informação só é valiosa quando pode alterar o valor esperado, a escolha, a robustez ou a segurança da decisão. Segue-se um corolário importante para todo o argumento deste artigo: a redução de incerteza é um meio para melhorar a decisão, nunca um fim autônomo. Uma formulação que reduz incerteza irrelevante para a ação em curso não produz valor decisório, mesmo que produza a aparência de rigor.

### 2.6 Suficiência

Suficiência é uma propriedade contextual, não absoluta. Uma formulação é suficiente quando: (1) seus objetivos críticos estão explícitos; (2) suas alternativas principais são identificáveis; (3) as restrições relevantes estão representadas; (4) as incertezas de alto impacto foram tratadas; (5) a decisão resultante é robusta a variações plausíveis dos pressupostos; (6) as perspectivas relevantes dos stakeholders foram consideradas; e (7) o ganho esperado de investigação adicional não compensa mais o seu custo.

### 2.7 Validade ecológica

Validade ecológica é o grau em que a formulação corresponde ao funcionamento relevante do domínio real — distinta de validade interna (consistência dentro do próprio modelo), validade preditiva (desempenho em dados ou casos não utilizados na construção do modelo), validade de construção (correspondência entre conceitos teóricos e variáveis observáveis) e legitimidade (aceitação justificável pelos participantes afetados). Indicadores potenciais incluem a correspondência entre previsões e *outcomes* observados, a estabilidade do modelo em contextos semelhantes, a capacidade de antecipar efeitos não incluídos na elicitação original, e a taxa de omissões descobertas somente após a implementação. A validade ecológica deve ser tratada como hipótese mensurável — a ser testada empiricamente — e não como consequência automática de uma formalização bem executada.

---

## 3. Fundamentação Teórica

### 3.1 Problem Structuring Methods

Os *Problem Structuring Methods* — Soft Systems Methodology (SSM), Strategic Options Development and Analysis (SODA), Strategic Choice Approach e Value-Focused Thinking, entre outros — atuam precisamente quando não existe consenso sobre objetivos, fronteiras e alternativas. Seu objetivo não é necessariamente descobrir uma estrutura objetiva do problema, mas produzir uma estrutura suficientemente útil para ação e aprendizagem coletiva, por meio de diálogo entre analistas, decisores e stakeholders. Checkland (2000) oferece a retrospectiva canônica da SSM como tratamento participativo de situações complexas; Eden e Ackermann (2001) formalizam a elicitação coletiva e o mapeamento cognitivo característicos da SODA; Montibeller e Franco (2010) documentam, por meio de estudo de caso, um processo iterativo de identificação do problema, seleção de abordagem e construção de estrutura analítica, evidenciando tanto o valor do diálogo quanto os riscos de uma estruturação prematura.

A limitação recorrente dos PSMs é que seus resultados costumam ser avaliados por consenso, aprendizagem percebida ou satisfação dos participantes, e não por *outcomes* decisórios comparáveis entre casos. O framework proposto neste artigo preserva a dimensão interpretativa e participativa dos PSMs — não pretende substituí-los — mas acrescenta rastreabilidade explícita, análise formal de incerteza e critérios de parada, elementos que os PSMs deliberadamente evitam formalizar.

### 3.2 Decision Analysis

A Decision Analysis fornece a estrutura madura para alternativas, estados da natureza, consequências, probabilidades, preferências e utilidade esperada (von Winterfeldt & Edwards, 1986). O *Expected Value of Perfect Information* (EVPI) representa o valor máximo de eliminar inteiramente uma incerteza; o *Expected Value of Sample Information* (EVSI) representa o valor esperado de uma investigação específica e parcial; o *Expected Net Benefit of Sampling* (ENBS) desconta desse valor o custo da própria investigação. Keisler et al. (2014) revisam o estado da aplicação do valor da informação em domínios como engenharia, saúde e gestão ambiental; Rothery et al. (2020), em relatório do ISPOR Value of Information Task Force, consolidam boas práticas para EVPI, EVPPI, EVSI e ENBS. Frameworks correlatos de qualidade decisória, como o de Spetzler et al. (2016), operacionalizam um diagnóstico rápido de "prontidão decisional" a partir de seis elementos — enquadramento adequado, alternativas criativas, informação confiável, valores claros, raciocínio lógico e compromisso com a ação — funcionando como ponte entre o enquadramento sociocognitivo dos PSMs e o rigor lógico da análise de decisão.

A limitação estrutural é que a Decision Analysis, em sua forma padrão, toma como dado o espaço de alternativas, o modelo causal e a lista de objetivos — pressupõe, portanto, que grande parte do trabalho de formulação já foi realizado. Isso é adequado quando o espaço de decisão já está relativamente estabilizado, mas insuficiente quando a própria estrutura do problema está em disputa.

### 3.3 Teoria da Informação

A observação sintática da incerteza remonta a Shannon (1948): a entropia H(X) = −Σp(x)log p(x) mede a incerteza associada a um conjunto de estados discretos, e a informação mútua I(X;Y) = H(X) − H(X|Y) mede a redução de incerteza sobre X obtida pela observação de Y. A *Minimum Description Length* (MDL) e a complexidade de Kolmogorov (Grünwald, 2007) oferecem um critério complementar: a melhor representação de um problema é aquela que, sustentando toda a evidência disponível, admite a descrição estrutural mais parcimoniosa.

Essas formulações estritamente sintáticas são insuficientes para capturar a formulação humana de problemas, pois ignoram o significado. Burgin (2009), em sua Teoria Geral da Informação, propõe um arcabouço no qual a informação medeia formalmente abstrações cognitivas e objetos materiais; Kohlas (2003) estende esse princípio com as Álgebras de Informação — estruturas matemáticas nas quais operações de combinação (agregar evidências) e focalização ou marginalização (extrair o conhecimento relevante para um domínio específico, descartando o irrelevante) permitem raciocinar formalmente sobre estados de conhecimento parciais e heterogêneos. Essas álgebras são particularmente relevantes para este artigo porque fornecem a infraestrutura formal mais próxima disponível para representar a evolução de um estado de conhecimento K_t ao longo do processo de formulação (ver Seção 6).

A limitação permanece: nenhuma dessas formulações mede a qualidade do enquadramento, detecta omissões desconhecidas (a ausência de uma variável que ninguém pensou em incluir não gera entropia mensurável) ou captura conflitos de valores entre atores.

### 3.4 Bayesian Decision Theory

A Teoria da Decisão Bayesiana oferece a taxonomia natural para a transição entre estados de conhecimento sucessivos. Nesse paradigma, formular um problema é homólogo a desenhar um experimento (*Bayesian Experimental Design*): a distribuição posterior representa o estado de conhecimento após a integração de nova evidência, e o *Expected Information Gain* (EIG) orienta a escolha de qual investigação produz a maior dissipação esperada de incerteza por unidade de esforço. Russell e Wefald (1991) formalizaram o metaraciocínio, demonstrando que agentes racionais devem ponderar ativamente o "valor da computação" — refinando um modelo apenas até o ponto em que o custo marginal do refinamento supera o benefício esperado em precisão. Esse princípio fundamenta diretamente a hipótese de que existe uma condição de suficiência mensurável, e não apenas intuída.

Uma limitação amplamente reconhecida é que o EIG mede redução esperada de entropia de parâmetros dentro de um modelo já especificado — não necessariamente ganho de utilidade decisória, e menos ainda incerteza sobre a adequação do próprio modelo. A literatura de *Bayesian Experimental Design* orientado à decisão (*decision-aware*) corrige parcialmente esse problema ao otimizar diretamente a utilidade posterior à decisão em vez da entropia (Huang et al., 2025), mas ainda pressupõe que valores, alternativas e espaço de modelos já estão definidos. A incerteza sobre a própria estrutura causal do problema — incerteza estrutural, distinta da incerteza paramétrica — permanece a fronteira mais custosa computacionalmente: sua estimativa exige tipicamente *model averaging* bayesiano e simulações aninhadas de Monte Carlo, e sua sensibilidade a priors mal especificados foi documentada por Go et al. (2022) e explorada em métodos de EVSI estrutural por Strong et al. (2014).

### 3.5 Ciência Cognitiva

A Ciência Cognitiva ilumina a mecânica humana por trás da formulação formal — e, mais importante para este artigo, evidencia seus limites. Herbert Simon (1973) demonstrou que problemas mal estruturados (*ill-structured problems*) tornam-se tratáveis apenas quando fronteiras de atenção restringem artificialmente o espaço de estados admissíveis; sua reflexão é o fundamento conceitual de todo o esforço de "engenharia" da formulação, mas também um aviso: fechar fronteiras é necessário, porém sempre uma escolha, nunca uma descoberta neutra. O modelo de Data-Frame de Gary Klein (1993) descreve como analistas ancoram progressivamente dados difusos em quadros mentais, atualizando-os em processo abdutivo; a *Information Foraging Theory* de Peter Pirolli (2007) modela a busca de informação como maximização da densidade informacional por unidade de esforço, prevendo que a busca cessa quando os retornos marginais declinam — precursor direto da noção de regra de parada proposta neste artigo. Kahneman (2011) sintetiza décadas de evidência sobre o descolamento entre confiança subjetiva e acurácia objetiva, tema central da Seção 7. A *Behavioral Operational Research* (Hämäläinen et al., 2013) acrescenta que o próprio processo de modelagem e o comportamento do facilitador alteram sistematicamente o resultado — o modelador não é um observador neutro do processo que documenta.

### 3.6 Engenharia de Requisitos

A Engenharia de Requisitos contribui com um conjunto maduro de atributos de qualidade documental: completude, consistência, correção, não ambiguidade, verificabilidade, rastreabilidade e estabilidade, consolidados na norma ISO/IEC/IEEE 29148 (2018). Montgomery et al. (2022), em mapeamento sistemático de 6.905 artigos que selecionou 105 estudos primários, encontraram que ambiguidade, completude, consistência e correção são os atributos mais estudados — mas que poucos estudos definem ou avaliam esses atributos de forma empiricamente fundamentada, e nenhum os relaciona diretamente à qualidade normativa da decisão que o sistema deveria apoiar. Moody e Shanks (2003) oferecem validação empírica de um framework correlato para qualidade de modelos de dados, reforçando que qualidade documental e qualidade decisória são constructos relacionados, mas distintos.

A limitação mais relevante para este artigo é dupla: primeiro, a Engenharia de Requisitos tradicionalmente recebe o problema já delimitado, focando em *como* o sistema deve se comportar e não em *por que* aquele sistema é a resposta adequada à situação (risco conhecido como *solutioneering*); segundo, seus atributos de qualidade — por mais rigorosos que sejam sintaticamente — não equivalem a qualidade decisória.

### 3.7 Engenharia de Sistemas

A Engenharia de Sistemas fornece processos maduros de definição de conceito, análise de missão, identificação de necessidades de stakeholders, elaboração de requisitos, definição funcional, arquitetura, verificação e validação, formalizados em corpos de conhecimento como o SEBoK e operacionalizados via *Model-Based Systems Engineering* (MBSE). Thacker et al. (2004), em relatório de referência do Sandia National Laboratories, sistematizam os conceitos de verificação, validação e credibilidade de modelos — vocabulário diretamente aproveitável para a validação multidimensional proposta na Seção 5. O framework aqui defendido reutiliza essa lógica de refinamento progressivo e de *gates* de maturidade, mas amplia deliberadamente o escopo para problemas em que a própria missão, a fronteira do sistema e a definição de sucesso permanecem abertas — situação para a qual o MBSE não foi originalmente concebido, já que pressupõe um sistema de interesse relativamente definido desde o início.

### 3.8 Knowledge Engineering

A Engenharia do Conhecimento contribui com os veículos estruturais necessários para tornar uma formulação auditável: ontologias formais e grafos de conhecimento. Gruber (1995) estabelece os princípios de design de ontologias para compartilhamento de conhecimento; Guarino (1998) sistematiza a ontologia formal aplicada a sistemas de informação. Um traço particularmente relevante dessa tradição é o pressuposto do mundo aberto (*open-world assumption*): a ausência de uma afirmação no modelo não implica sua negação, apenas desconhecimento — pressuposto compatível com a natureza incompleta e evolutiva de uma formulação em curso, ao contrário do pressuposto de mundo fechado comum em bases de dados relacionais tradicionais.

A limitação é que uma ontologia, por mais bem construída que seja, organiza significado e compromissos semânticos; não resolve, por si só, trade-offs entre objetivos, não pondera preferências e não estabelece autoridade decisória. Uma ontologia é condição necessária, mas não suficiente, para uma formulação decision-aware.

---

## 4. Estado da Arte

### 4.1 Síntese da literatura

A tabela a seguir sintetiza os trabalhos mais diretamente relacionados à hipótese central, classificados por contribuição efetiva e limitação residual.

| Autores | Domínio | Contribuição | Limitação | Relação com a hipótese |
|---|---|---|---|---|
| Simon (1973) | IA / Ciência Cognitiva | Estrutura de problemas mal estruturados via fechamento de fronteiras cognitivas | Orientado a quebra-cabeças formais, não a decisões sociotécnicas | Alta — fundamenta a própria ideia de "fechar" uma formulação |
| Checkland (2000); Eden & Ackermann (2001) | Soft OR / PSM | Estruturação participativa de situações plurais (SSM, SODA) | Recusa deliberada de formalização matemática | Alta — sustenta a dimensão sociocognitiva do framework |
| Montibeller & Franco (2010) | PSM aplicado | Evidencia iteração, diálogo e riscos de estruturação prematura | Estudo de caso único; não valida métricas nem efeito causal | Alta como protocolo qualitativo; baixa como métrica |
| Cinelli et al. (2020) | MCDA | Taxonomia do processo: formulação, recomendação, suporte | Taxonomia, não teoria de estados epistêmicos | Média — útil como esquema de registro |
| Rothery et al. (2020); Keisler et al. (2014) | Value of Information | Boas práticas para EVPI/EVPPI/EVSI/ENBS | Condicional à especificação do modelo, priors e alternativas | Alta para incerteza relevante à decisão |
| Montgomery et al. (2022) | Engenharia de Requisitos | Mapeamento sistemático de atributos de qualidade documental | Qualidade do requisito não equivale a qualidade decisória | Média — fornece banco de constructos |
| Russell & Wefald (1991) | Bayesian AI | Metaraciocínio: valor da computação e parada ótima | Depende de utilidade marginal calculável a priori | Alta — comprova formalmente a existência de um ponto de suficiência |
| Gettinger et al. | Visualização / MCDA | Efeito da representação no processo decisório | Restrito à representação visual | Média — mostra que "melhor representação" depende do desfecho medido |
| Peng et al. | Cognição / Neurociência | Sobrecarga informacional reduz atenção e eleva arrependimento | Domínio de compras online; mede processo, não acerto normativo | Média — evidência do paradoxo da sobreinformação |
| Slovic (1974) | Psicologia do julgamento | Descolamento entre acurácia e confiança subjetiva à medida que a informação cresce | Estudo em domínio específico (prognóstico especializado) | Alta — motiva diretamente o penalizador de hiper-resolução |
| Hoppe (2018/2024) | Políticas públicas | Regras práticas de estruturação; questiona a reificação de *wickedness* | Ainda não oferece métrica geral comparável | Alta para pluralismo e escopo de aplicação |
| Browne & Pitts (2004) | Sistemas de informação | Regras cognitivas de parada na busca de informação | Busca online; não necessariamente decisões complexas | Média-alta para o custo/benefício do refinamento |

### 4.2 Matriz comparativa de abordagens

A tabela seguinte compara o framework proposto com as disciplinas de maior sobreposição funcional, evidenciando onde cada uma tipicamente começa e termina.

| Disciplina | Objeto central | Entrada típica | Saída típica | Onde termina | Lacuna que o framework busca preencher |
|---|---|---|---|---|---|
| Problem Structuring Methods | Situação problemática plural | Narrativas e percepções de stakeholders | Estruturação e mudança viável | Compromisso de ação | Rastreabilidade formal, métricas de incerteza, regra de parada explícita |
| Decision Analysis | Decisão sob objetivos e incerteza | Frame, alternativas, preferências já definidas | Escolha ou recomendação | Recomendação da alternativa ótima | Pressupõe que a formulação anterior já ocorreu |
| Engenharia de Requisitos | Necessidades e requisitos de um sistema | Necessidades declaradas do usuário | Especificação verificável e rastreável | Validação do sistema a construir | Foca na solução, não na ontologia do problema no domínio do cliente |
| Engenharia de Sistemas / MBSE | Sistema de interesse e seu ciclo de vida | Necessidades, requisitos, contexto | Arquitetura e modelos integrados | Comissionamento do sistema | Pressupõe sistema de interesse já relativamente definido |
| Knowledge Engineering | Conhecimento e conceitos de domínio | Dados, especialistas, corpus textual | Ontologias formais | Estruturação estática do conhecimento | Não formaliza trade-offs decisórios nem regras de parada |
| Context Engineering (IA) | Ambiente informacional de um agente/LLM | Prompts, ferramentas, contexto | Ações e artefatos do agente | Conclusão da tarefa delegada | Natureza empírica e *ad hoc*; sem grounding semântico auditável |
| **Framework proposto** | **Formulação governada do problema** | **Situação, perspectivas plurais, evidências** | **Registro versionado, frames comparados, modelo derivado** | **Gate explícito para decisão ou engenharia de solução** | — |

Esta comparação sugere um espaço de integração, não necessariamente uma disciplina inteiramente nova: cada linha da tabela já resolve fragmentos importantes do problema. A contribuição pretendida está na camada de ligação — um estado de formulação observável, sensível à decisão, capaz de representar discordância explicitamente e sujeito a validação causal — e não na substituição de qualquer uma dessas tradições.

### 4.3 Lacunas identificadas

A revisão permite consolidar cinco lacunas, com grau de preenchimento distinto entre elas.

| Lacuna | Grau de preenchimento | O que já existe | O que permanece ausente |
|---|---|---|---|
| 1. Framework integrado de estados de conhecimento orientados à decisão | Parcial | PSMs, MCDA, análise de decisão, valor da informação, validação de modelos | Ontologia comum e transições testáveis entre estados |
| 2. Métricas multidimensionais de incerteza, suficiência e regressão | Parcial, mas profunda nos componentes | Atributos de requisitos, V&V, valor da informação, análise de sensibilidade | Índice validado de prontidão e de regressão da formulação |
| 3. Evidência comparativa causal de que refinamento estruturado melhora decisões reais | Baixa a parcial | Experimentos de representação; estudos de caso qualitativos | Ensaios multi-domínio com decisões reais e contrafactuais |
| 4. Tratamento integrado de conflitos de valores, enquadramentos concorrentes e efeitos adversos do refinamento | Parcial | MCDA/PSMs, literatura de *framing*, sobrecarga informacional, *de-biasing* | Modelo integrado de desacordo e de dano potencial do refinamento |
| 5. Benchmarks, protocolos experimentais e critérios de generalização entre domínios | Quase total (como lacuna integrada) | Benchmarks locais e taxonomias específicas por domínio | Suíte comum, critérios de transporte entre domínios, replicação |

A conclusão desta seção é que a integração pretendida não constitui invenção sem antecedentes: é, antes, uma síntese de componentes já existentes, com oportunidade original relativamente estreita — estados de formulação que sejam simultaneamente observáveis, sensíveis à decisão, capazes de representar discordância explicitamente e sujeitos a validação causal.

---

## 5. Framework Proposto

### 5.1 Ontologia híbrida mínima

O framework parte de uma ontologia deliberadamente mínima, para evitar burocracia representacional. As entidades principais são:

| Entidade | Definição |
|---|---|
| ProblemSituation | Situação ou conjunto de eventos que motivam a investigação |
| ProblemFrame | Perspectiva que define fronteiras, relevância e linguagem |
| Stakeholder | Agente afetado, interessado ou capaz de influenciar a decisão |
| Objective | Estado ou condição desejada |
| Value | Princípio ou preferência que justifica um objetivo |
| Alternative | Curso de ação possível |
| Constraint | Limitação normativa, física, econômica ou temporal |
| Assumption | Premissa necessária ao modelo, não diretamente observada |
| Hypothesis | Proposição testável sobre o sistema |
| Evidence | Observação, dado, documento, experimento ou testemunho |
| Model | Representação causal, matemática, semântica ou narrativa |
| Uncertainty | Estado de conhecimento incompleto, variável ou contestado |
| Decision | Escolha entre alternativas, sob autoridade de um ator |
| Outcome | Resultado observado após a decisão |
| Artifact | Documento, mapa, requisito, grafo ou modelo produzido |
| Provenance | Origem, autor, data e cadeia de transformações de uma afirmação |

Cada afirmação registrada na formulação deve carregar um status epistêmico explícito — fato observado, evidência documental, consenso, hipótese, inferência, opinião, valor ou premissa — de modo que uma preferência nunca seja apresentada como fato, nem uma hipótese de modelo como observação direta.

### 5.2 Modelo de estados do conhecimento

O estado de formulação em um instante t é definido como a tupla

$$K_t = \langle F_t, O_t, V_t, A_t, C_t, E_t, H_t, M_t, U_t, R_t, L_t, P_t \rangle$$

em que F_t são os *frames* ativos, O_t os objetivos, V_t os valores e preferências, A_t as alternativas, C_t as restrições, E_t as evidências, H_t as hipóteses, M_t os modelos, U_t as incertezas registradas, R_t a rastreabilidade acumulada, L_t a legitimidade e participação, e P_t a proveniência. Uma investigação a_t, produzindo observação y_t, transforma o estado segundo K_{t+1} = T(K_t, a_t, y_t) — transformação que pode reduzir uma incerteza e simultaneamente revelar outra: uma entrevista pode esclarecer objetivos e, ao mesmo tempo, expor um conflito de valores antes oculto.

Operacionalmente, propõe-se um modelo de seis estados:

- **S₀ — situação desagregada:** descrições fragmentadas, vocabulário inconsistente, objetivos implícitos, stakeholders não identificados, causalidade incerta.
- **S₁ — enquadramentos concorrentes:** múltiplos *frames* explícitos, conflitos de fronteira identificados, objetivos e valores já separados analiticamente, divergências documentadas.
- **S₂ — representação estruturada:** entidades e relações principais identificadas, objetivos operacionalizados, alternativas enumeradas, evidências rastreadas.
- **S₃ — modelo validado:** hipóteses testáveis, modelos causais concorrentes explicitados, análise de consistência realizada, incerteza quantificada ou ao menos qualificada.
- **S₄ — prontidão restrita:** decisão robusta em cenários plausíveis, riscos residuais explícitos, legitimidade mínima alcançada, custo de investigação adicional já superior ao benefício esperado.
- **S₅ — decisão e aprendizagem:** decisão registrada, premissas preservadas, *outcomes* monitorados, discrepâncias retroalimentando o modelo.

Vale registrar, como ponto de crítica interna e não de confirmação, que modelos de estágios formalmente distintos — por exemplo, uma sequência de quatro estados (conhecimento latente, heurístico, algorítmico e pronto para decisão) construída independentemente a partir da literatura de sensemaking e Bayesian AI — convergem para uma estrutura de maturação semelhante à proposta aqui. Essa convergência é sugestiva, mas não constitui evidência empírica: nenhum desses modelos de estágios foi validado contra desfechos decisórios reais, e a convergência pode refletir apenas premissas compartilhadas pelos autores, não uma regularidade do fenômeno.

### 5.3 Transformações e ciclo de vida

O processo de formulação avança por meio de transformações específicas: elicitação e desambiguação, geração de alternativas, modelagem causal, aquisição de informação, análise de sensibilidade e robustez, negociação ou explicitação do desacordo, decisão e revisão pós-decisão. Em termos de fases, um agrupamento útil — sem impor uma ordem estritamente sequencial — inclui: descoberta do problema (*Problem Discovery*), enquadramento (*Problem Framing*), estruturação (*Problem Structuring*), engenharia de objetivos, modelagem de decisão, modelagem de restrições, modelagem de incerteza, modelagem conceitual, formalização, validação e, por fim, transição para engenharia de solução.

É importante que essa sequência seja tratada como um grafo de atividades com portões de qualidade (*gates*), e não como um processo em cascata. *Framing*, objetivos, restrições, incertezas e evidências evoluem em paralelo, e a validação deve ocorrer desde o início, não apenas ao final. A solução candidata não deve ser excluída do raciocínio inicial — soluções conhecidas frequentemente revelam restrições ou capacidades relevantes — mas o risco que precisa ser ativamente evitado é o *solutioneering*: permitir que uma solução pré-selecionada defina silenciosamente o problema. Um portão mínimo antes da derivação de qualquer solução deve exigir: *frame* explícito, objetivos identificados, restrições classificadas, incertezas registradas, evidências citadas, desacordos visíveis e decisão explícita sobre o que está fora do escopo.

Cada transição de estado deve registrar, como artefato auditável, quais itens da formulação anterior foram retidos, quais foram descartados, quais premissas foram adicionadas pelo próprio processo de modelagem (e não extraídas da situação original), a regra de abstração aplicada, o responsável pela transformação e a evidência que a justifica.

### 5.4 Métricas multidimensionais

Uma métrica única de "incerteza da formulação" seria enganosa, dada a heterogeneidade das dimensões descritas na Seção 2.4. Propõe-se, em vez disso, um vetor de dimensões com perfil por decisão:

| Dimensão | Métrica candidata | Status | Limitação |
|---|---|---|---|
| Aleatória | Entropia, variância, intervalos | Estabelecida | Requer distribuição apropriada |
| Epistêmica | *Belief-plausibility*, conjuntos credais | Estabelecida/promissora | Depende da atribuição inicial de crenças |
| Estrutural | *Model averaging*, divergência entre modelos causais concorrentes | Promissora | Custo computacional elevado |
| Semântica | Taxa de interpretações divergentes, acordo interavaliadores | Promissora | Acordo pode refletir conformidade, não verdade |
| De fronteira | Omissão *ex post* de stakeholders, objetivos ou variáveis | Proposta | Exige observação posterior à decisão |
| De valores | Distância entre *rankings* de preferências (p. ex., correlação de Kendall) | Promissora | Não resolve incomensurabilidade genuína |
| Consistência | Violações lógicas e incompatibilidades entre objetivos e restrições | Estabelecida | Consistência não implica validade |
| Rastreabilidade | Cobertura de vínculos entre objetivos, evidências e decisões | Moderada | Pode incentivar documentação superficial |
| Legitimidade | Participação, contestabilidade e reconhecimento de perspectivas | Qualitativa/promissora | Difícil quantificação sem reduzir a votação |
| Validade ecológica | Acurácia de *outcomes* e estabilidade contextual | Promissora | Requer dados longitudinais |

Como exemplo de operacionalização, a cobertura pode ser definida como C_cov = (Σ w_i I_i) / (Σ w_i), em que w_i é o peso de um elemento (entidade, objetivo, cenário) e I_i vale 1 quando o elemento está adequadamente representado. A dificuldade não está na fórmula, mas em definir o universo de elementos relevantes sem usar a própria formulação para determinar o que ela omite — um problema de regresso que nenhuma métrica resolve sozinha. A consistência pode ser definida como C_cons = 1 − (N_conflitos / N_relações verificadas), com a ressalva de que a métrica deve distinguir contradição lógica genuína de divergência de valores legítima: nem todo desacordo é erro a ser eliminado.

### 5.5 Suficiência decisional

Um índice de suficiência pode ser definido como combinação ponderada:

$$Q_{form} = w_C \, C_{cov} + w_K \, C_{cons} + w_T \, T_{trace} + w_E \, V_{eco} + w_L \, L_{leg} + w_R \, R_{rob} - w_X \, X_{complex} - w_B \, B_{bias}$$

Os pesos devem ser definidos por domínio ou estimados empiricamente; o índice não deve ser tratado como universal antes de validação — ponto retomado criticamente na Seção 6.5. A condição de parada correspondente é que a investigação deve cessar quando nenhuma ação adicional apresenta benefício líquido positivo: max_a [EVSI(a|K_t) − C(a) − C_delay(a)] ≤ 0.

Em problemas *wicked*, contudo, não há garantia de que todos os stakeholders aceitarão o mesmo modelo, nem de que exista uma regra de parada puramente matemática. Para esses casos, propõe-se o conceito de **suficiência negociada**: a formulação é suficiente quando os participantes relevantes reconhecem suas próprias perspectivas na representação, as divergências principais estão explícitas, as consequências da decisão são compreensíveis e o custo de continuar investigando não é mais justificável frente aos benefícios esperados. Isso não equivale a consenso — pode significar apenas acordo provisório sobre qual decisão será tomada, quais divergências permanecem abertas, quais riscos serão assumidos e quando a decisão será revisada.

### 5.6 Penalidade de hiper-resolução

A literatura de decisão comportamental (Seção 3.5 e Seção 7.1) documenta um risco específico: a adição contínua de variáveis e detalhes a uma formulação pode aumentar a confiança subjetiva dos decisores sem produzir ganho equivalente em acurácia, robustez ou valor decisório. Propõe-se, como construto original a ser testado — não como lei estabelecida —, uma penalidade de hiper-resolução:

$$\lambda_t = \lambda_0 + \lambda_1 \max\left(0, \frac{\Delta Conf_t}{\Delta Acc_t + \varepsilon} - \rho\right) + \lambda_2 X_t + \lambda_3 B_t$$

em que λ₀ é uma penalidade basal, ΔConf_t e ΔAcc_t são as variações de confiança e de acurácia entre iterações, ρ é a razão máxima aceitável entre elas, X_t é a complexidade marginal introduzida e B_t são indicadores de viés detectados. Quando a confiança cresce mais rapidamente que a acurácia, λ_t aumenta. A utilidade marginal de uma nova investigação torna-se então U_next(a) = EVSI(a) − C(a) − λ_t · ΔX(a), e a investigação só é recomendada quando max_a U_next(a) > 0.

A formalização não prova que confiança e acurácia possuam relação linear, que a confiança possa ser medida sem viés, que λ seja transferível entre domínios, ou que complexidade cognitiva seja proporcional ao número de variáveis. Por essas razões, λ deve começar como variável experimental, calibrada em estudos controlados de decisão (Seção 8), e não incorporada diretamente a sistemas de apoio à decisão de alto risco antes de validação.

---

## 6. Formalização Matemática

### 6.1 Estado de conhecimento

Retoma-se aqui, em termos mais técnicos, o aparato introduzido na Seção 5.2. O estado de conhecimento K_t é um elemento de um espaço estruturado de valorações informacionais, análogo às Álgebras de Informação de Kohlas (Seção 3.3): cada componente da tupla ⟨F_t, O_t, V_t, A_t, C_t, E_t, H_t, M_t, U_t, R_t, L_t, P_t⟩ é relativizado a um domínio d_t de variáveis e questões pertinentes no instante t. A transformação K_{t+1} = T(K_t, a_t, y_t) é o operador central do modelo: ela é não determinística (a mesma ação a_t pode produzir diferentes observações y_t) e não monotônica em relação a qualquer dimensão isolada de incerteza — pode reduzir U_t em uma dimensão e aumentá-lo em outra.

### 6.2 Transformações informacionais

Dois operadores genéricos formalizam o que ocorre durante a elicitação e a estruturação:

- **Combinação (⊗):** funde uma nova evidência ou perspectiva com a base de conhecimento anterior — K_{t+1} = K_t ⊗ e. Combinar evidências comprime o espaço semântico de respostas plausíveis, mas pode também gerar conflito: quando K_t ⊗ e produz uma contradição irreconciliável (formalmente, um elemento absorvente ⊥ na álgebra), isso sinaliza que a nova evidência é incompatível com premissas anteriores e exige revisão explícita, não descarte silencioso.
- **Focalização (↓):** extrai o conhecimento relevante para um domínio de decisão específico, descartando variáveis marginais — K_{t+2} = K_{t+1} ↓ d_decisão. Este operador formaliza a heurística de Simon (Seção 3.5) de fechar fronteiras de atenção para evitar explosão combinatória, tornando explícita a escolha (e o custo) de não considerar certas variáveis.

### 6.3 Valor da informação

O valor esperado da informação perfeita é

$$EVPI = \mathbb{E}\left[\max_d \mathbb{E}[U(d,\theta)]\right] - \max_d \mathbb{E}[U(d,\theta)]$$

e o valor esperado de uma amostra específica de informação é

$$EVSI(a) = \mathbb{E}\left[\max_d \mathbb{E}[U(d,\theta)\mid Y,a]\right] - \max_d \mathbb{E}[U(d,\theta)]$$

Ambas as quantidades pressupõem que o espaço de alternativas d, o espaço de estados θ e a função de utilidade U já estão especificados — o que é precisamente a condição que a formulação, nas fases iniciais (S₀–S₂), ainda não satisfaz. Isso implica uma restrição importante: EVSI só é diretamente calculável a partir do momento em que a formulação atinge um grau mínimo de estruturação; nas fases anteriores, a decisão de investigar deve apoiar-se em heurísticas qualitativas ou em aproximações grosseiras, não no cálculo exato.

### 6.4 Regras de parada

A condição de parada mais simples — investigar enquanto EVSI(a) exceder o custo C(a) — é insuficiente porque ignora dois efeitos relevantes: o custo do atraso da decisão (C_delay) e o valor específico de investigações que não reduzem incerteza paramétrica, mas descobrem um enquadramento inteiramente novo. Uma versão mais defensável da regra de parada é

$$EVSI_{next} + DUG_{next} + V_{frame,next} < C_{next} + C_{delay} + C_{overload}$$

em que DUG_next representa o ganho de utilidade decisória esperado de uma próxima elicitação (indo além da simples redução de entropia), V_frame,next representa o valor esperado de descobrir alternativas ou objetivos ainda não considerados, e C_overload representa o custo cognitivo marginal da complexidade adicional — o elo formal com a penalidade λ da Seção 5.6. O termo V_frame,next, em particular, ainda carece de operacionalização amplamente aceita e deve ser tratado como contribuição proposta, não resultado estabelecido.

### 6.5 Índice de qualidade da formulação

O índice de suficiência Q_form (Seção 5.5) pode ser reescrito em notação normalizada, adimensional, como

$$PFQI = w_1 C_{comp} + w_2 C_{cons} + w_3 T_{trac} + w_4 C_{cov} - w_5 P_{amb}, \quad \sum_{i=1}^{4} w_i = 1,\ w_5 \in\ ]0, 0.5]$$

em que C_comp é a completude ontológica (razão entre entidades declaradas e entidades requeridas pelo metamodelo mínimo da Seção 5.1), C_cons é a consistência lógica interna, T_trac é a rastreabilidade e P_amb é uma penalidade por ambiguidade linguística na especificação.

É necessário, contudo, registrar aqui uma ressalva crítica que a própria evolução deste programa de pesquisa produziu: um índice composto único, por mais bem calibrado que seja, corre o risco de mascarar *trade-offs* relevantes — uma formulação pode pontuar alto em completude e baixo em legitimidade, e a soma ponderada esconde exatamente essa informação, que é a mais importante para o decisor. Por essa razão, a alternativa mais defensável não é adotar o PFQI como número único de corte, mas como **painel de métricas separadas**, com um portão mínimo de qualidade (por exemplo, exigir C_cons = 1,0 e cobertura de stakeholders acima de um limiar, sem agregar as demais dimensões em um só escalar). O PFQI, quando calculado, deve ser interpretado como resumo diagnóstico complementar ao painel, nunca como substituto dele.

Um construto correlato, útil para comparar formulações concorrentes em disputa, é a **divergência de enquadramento** entre dois *frames* PF₁ e PF₂:

$$\Delta_{PF}(PF_1, PF_2) = 1 - \frac{|O_1 \cap O_2| + |X_1 \cap X_2|}{|O_1 \cup O_2| + |X_1 \cup X_2|}$$

em que O_i e X_i são, respectivamente, os conjuntos de objetivos e de restrições de cada *frame*. Quando Δ_PF se aproxima de 1, os enquadramentos concorrentes compartilham pouco em comum — sinal de que a situação exige facilitação interpessoal e negociação explícita antes de qualquer tentativa de otimização matemática (Seção 7.2).

---

## 7. Evidências Contrárias e Limitações

### 7.1 O paradoxo da sobreinformação

A hipótese forte segundo a qual "mais informação melhora sistematicamente a decisão" deve ser rejeitada. A evidência clássica é o estudo de Slovic (1974) com prognosticadores especializados: à medida que o número de variáveis disponibilizadas a cada rodada de julgamento aumentava, a acurácia preditiva estabilizava rapidamente, enquanto a confiança subjetiva dos julgadores em suas próprias previsões continuava a crescer — produzindo um descolamento sistemático entre desempenho real e percepção de domínio (*overconfidence*). Peng et al., em estudo com medidas neurofisiológicas de tomada de decisão em ambiente de compras *online*, encontraram que o aumento do volume de informação disponível elevou o tempo de decisão e a dificuldade percebida, reduziu a atenção alocada a cada item e produziu sinais comportamentais compatíveis com arrependimento — evidência de força moderada e escopo limitado (um domínio transacional específico), mas mecanisticamente coerente com o paradoxo de Slovic.

A implicação para este artigo é direta: o framework proposto precisa medir simultaneamente desempenho, confiança, calibração, complexidade, carga cognitiva e tempo — nunca apenas cobertura ou completude documental — sob pena de otimizar exatamente o efeito colateral que pretende evitar.

### 7.2 Wicked problems e conflitos de valores

Rittel e Webber (1973) argumentam que, em problemas sociais e de planejamento, a própria formulação do problema constitui o problema: não existe critério unívoco de parada, porque os stakeholders divergem sobre quais consequências contam como relevantes, não apenas sobre fatos. Churchman (1967) antecipa esse argumento ao observar que sistemas complexos resistem a fronteiras objetivamente corretas. A implicação para a hipótese central deste artigo é significativa: em contextos de desacordo normativo genuíno, reduzir incerteza factual não resolve o problema, porque o problema não é, em sua essência, factual. Forçar a matematização de crenças ontologicamente incomensuráveis — por exemplo, tentar agregar numericamente valores de segurança, autonomia e equidade quando os próprios atores rejeitam essa comensurabilidade — não apenas falha em resolver o conflito, como pode alienar as partes ao dar aparência de objetividade a uma escolha que é, na verdade, normativa.

A formulação mais defensável da hipótese, portanto, precisa permitir e nomear explicitamente o estado "desacordo normativo não resolvido", sem tratá-lo como falha a ser eliminada pela engenharia — precisamente o papel do conceito de suficiência negociada (Seção 5.5).

### 7.3 Domínios de inaplicabilidade

O framework não deve ser aplicado indiscriminadamente. Utilizando o modelo Cynefin como heurística de triagem, identificam-se pelo menos cinco domínios em que sua aplicação é contraindicada ou de valor questionável: (1) problemas rotineiros e bem definidos, nos quais a formalização adicional gera burocracia sem benefício; (2) crises táticas e emergências absolutas, em que o tempo disponível para modelagem é inferior ao tempo necessário para executá-la, e a tomada de decisão naturalista baseada em intuição especializada tende a superar qualquer processo estruturado; (3) ambientes caóticos e não ergódicos, nos quais as regras do ambiente mudam mais rapidamente do que o artefato de formulação pode ser atualizado; (4) conflitos políticos profundos, nos quais o problema central é de poder e reconhecimento, não de conhecimento; e (5) decisões com urgência extrema, em que o custo de atraso domina qualquer valor esperado de informação adicional.

### 7.4 Críticas filosóficas

Quatro críticas filosóficas merecem registro explícito, por serem recorrentes na literatura correlata e por não terem sido plenamente neutralizadas pelo framework proposto:

- **Reificação:** chamar a formulação de "engenharia" sugere, indevidamente, que existe um objeto pronto e separável dos atores, valores e instituições que o constituem. Os PSMs e a Soft Systems Methodology oferecem antídoto parcial ao enfatizar participação, aprendizagem e pluralidade — mas o próprio vocabulário de "engenharia" empurra continuamente na direção contrária, e deve ser usado com essa consciência.
- **Risco de Goodhart:** qualquer métrica, uma vez adotada como alvo, tende a ser otimizada às custas do que originalmente pretendia medir. Uma métrica de completude pode levar equipes a adicionar itens irrelevantes; uma métrica de consenso pode recompensar silenciamento de dissidência; uma métrica de confiança pode capturar habilidade de persuasão, não de acurácia; uma métrica de estabilidade pode premiar rigidez em vez de adequação.
- **Incomensurabilidade de valores:** algumas divergências entre objetivos — segurança versus autonomia, eficiência versus equidade — não são meramente informacionais e podem não admitir agregação numérica legítima sem perda semântica relevante.
- **Viés de confirmação na elicitação:** o próprio processo de estruturação, incluindo a ordem em que perguntas são feitas e a escolha de quem é entrevistado primeiro, molda sistematicamente o resultado da formulação — o modelador nunca é um observador neutro.

Toda métrica proposta neste artigo deve, portanto, ser acompanhada de indicadores adversariais (Seção 8.1) e de avaliação qualitativa complementar, nunca utilizada isoladamente como critério de decisão.

---

## 8. Programa Empírico de Validação

### 8.1 Estudos controlados

**Projeto Alpha — limite cognitivo.** Pergunta: a expansão de informação e de complexidade na formulação eleva a confiança mais rapidamente do que a qualidade da decisão? Método: estudo controlado com três condições — informação limitada, informação calibrada e informação saturada — em que participantes formulam e decidem sobre problemas com *ground truth* conhecido pelos pesquisadores, mas apresentados com superfície narrativa sociotécnica realista. Métricas: acurácia, robustez, confiança, calibração, tempo, carga cognitiva, número de variáveis efetivamente utilizadas e estimativa do parâmetro λ. Resultado esperado: identificar se existe um ponto de inflexão a partir do qual a complexidade marginal deixa de gerar benefício líquido.

**Projeto Beta — proxies estruturais.** Em vez de tentar substituir integralmente o cálculo de Monte Carlo aninhado por modelos de linguagem, propõe-se um desenho em cadeia: (1) um modelo de linguagem ou ferramenta semântica gera hipóteses sobre a estrutura causal do problema; (2) especialistas humanos revisam essas hipóteses; (3) modelos causais simplificados, já revisados, são testados; (4) o EVSI aproximado é comparado a um cálculo de referência em instâncias pequenas, onde o cálculo exato ainda é tratável; e apenas então (5) avaliam-se aproximações mais escaláveis. Métricas: erro relativo do EVSI aproximado, calibração, sensibilidade a alucinações do modelo de linguagem, custo computacional e taxa de hipóteses estruturais falsas. Modelos de linguagem devem atuar como ferramentas de elicitação e geração de alternativas — nunca como validadores finais de suas próprias hipóteses.

### 8.2 Benchmark proposto

Propõe-se um conjunto inicial de dez casos parametrizados por complexidade causal, número de stakeholders, divergência de valores, disponibilidade de dados, urgência temporal e reversibilidade da decisão:

| Caso | Domínio | Complexidade | Stakeholders | Urgência | Dados |
|---|---|---|---|---|---|
| B1 | Alocação de capacidade de servidor | Baixa | Baixa | Alta | Alta |
| B2 | Priorização de backlog técnico | Média | Média | Média | Alta |
| B3 | Escolha de fornecedor crítico | Média | Alta | Média | Média |
| B4 | Expansão de infraestrutura | Alta | Média | Baixa | Média |
| B5 | Gestão hídrica | Alta | Alta | Média | Baixa |
| B6 | Política de mobilidade urbana | Alta | Alta | Baixa | Média |
| B7 | Resposta a incidente cibernético | Alta | Média | Muito alta | Média |
| B8 | Adoção de IA em atendimento | Média | Alta | Média | Alta |
| B9 | Priorização de políticas sociais | Muito alta | Muito alta | Média | Baixa |
| B10 | Adaptação climática | Muito alta | Muito alta | Baixa | Baixa |

Cada caso deve conter descrição inicial deliberadamente incompleta, conjunto de documentos e dados observacionais, stakeholders simulados com objetivos conflitantes, alternativas ocultas e explícitas, modelos causais concorrentes, *ground truth* parcial, eventos de mudança de contexto e protocolo de reprodução documentado. Um benchmark adequado precisa preservar a estrutura decisória, disponibilizar múltiplas formulações plausíveis, anotar incertezas e valores sem impor uma única "verdade", e incluir desfechos retardados no tempo — do contrário, o campo corre o risco de validar apenas a capacidade de uma técnica de produzir documentos mais completos ou participantes mais confiantes, exatamente o efeito colateral descrito na Seção 7.1.

### 8.3 Estudos longitudinais

**Projeto Delta.** Acompanhamento de três a cinco formulações reais ao longo de dois ou três ciclos decisórios, com versionamento explícito dos modelos, decisões, premissas, evidências, mudanças de stakeholders, *outcomes*, retrabalho, reversões e percepção de legitimidade ao longo do tempo. O objetivo é testar se as métricas propostas na Seção 5.4 predizem degradação, estabilidade ou melhoria da qualidade decisional — e, criticamente, separar mudança legítima do problema (o mundo mudou) de degradação genuína da formulação (a representação ficou desatualizada ou foi mal mantida), risco de confusão identificado como um dos principais desafios metodológicos desta linha de pesquisa.

### 8.4 Critérios de falsificabilidade

A hipótese central deste artigo será considerada enfraquecida se, em estudos controlados e pré-registrados:

1. a formulação estruturada não superar, ou apenas igualar, métodos *ad hoc* em qualidade decisional após equalização de tempo e treinamento entre condições;
2. o processo aumentar custo e tempo sem melhoria decisória compensatória;
3. melhorias em confiança subjetiva não vierem acompanhadas de melhoria em calibração ou desempenho real;
4. os efeitos observados desaparecerem sob replicação em múltiplos domínios heterogêneos;
5. a intervenção aumentar sistematicamente a exclusão de stakeholders, o fechamento prematuro do enquadramento, ou a sobrecarga cognitiva;
6. um protocolo mínimo, sem o aparato formal completo, produzir resultados estatisticamente indistinguíveis;
7. a estimativa de validade ecológica ou de incerteza estrutural exigir recursos computacionais superiores ao valor de risco que pretende mitigar, sem que aproximações preservem precisão suficiente;
8. a formalização aumentar exclusão, reduzir contestabilidade ou produzir aceitação superficial sem representar adequadamente os grupos afetados.

A hipótese será considerada sustentada de forma relativamente forte apenas se houver efeito replicado, com tamanho de efeito relevante e intervalo de confiança informado, em pelo menos três domínios heterogêneos, comparando controle ativo e prática convencional, com desfechos de processo, decisão, calibração, robustez, custo, tempo e legitimidade — e se o mediador previsto (maior cobertura e melhor identificação de incertezas relevantes) explicar parte do ganho observado, sem que o efeito se reduza inteiramente a maior tempo de contato com o problema ou a maior confiança injustificada.

---

## 9. Implicações Éticas e Institucionais

### 9.1 Direito de formular

Formular um problema é, antes de tudo, um ato de poder: significa definir o que será contado, quem será ouvido, quais danos serão considerados, quais alternativas entrarão no espaço decisional e quais consequências permanecerão invisibilizadas. Tratar a formulação como mera etapa técnica preliminar oculta essa dimensão política. Qualquer framework de engenharia da formulação que não reconheça explicitamente quem tem — e quem não tem — o direito de formular um problema organizacional ou público corre o risco de naturalizar assimetrias de poder sob a aparência de neutralidade metodológica.

### 9.2 Responsabilidade

Cada formulação deve registrar, como parte de seu artefato auditável, os autores e facilitadores do processo, os stakeholders efetivamente consultados, os grupos conscientemente excluídos e a justificativa para essa exclusão, as premissas adotadas e os conflitos identificados. Essa exigência é particularmente crítica em decisões irreversíveis, nas quais o custo de um erro de formulação não pode ser corrigido por revisão posterior: nesses casos, a responsabilidade recai sobre uma tolerância maior a investigação adicional, análise explícita de cenários adversos, preservação deliberada de opções (valor da flexibilidade) e critérios de revisão definidos antes da decisão, não depois dela. O custo de atraso deve ser comparado explicitamente ao custo do erro irreversível — nunca assumido como automaticamente dominante.

### 9.3 Transparência

Transparência não exige revelar todo o aparato matemático subjacente a uma formulação, mas exige que as pessoas afetadas por uma decisão possam compreender, em linguagem acessível, como o problema foi enquadrado, quais evidências foram utilizadas, quais valores efetivamente governaram a decisão, quais incertezas permanecem não resolvidas e, sobretudo, como contestar a formulação caso discordem dela. Um sistema de formulação auditável sem mecanismo de contestação acessível não é transparente — é apenas documentado.

### 9.4 Aprendizagem organizacional

A formulação deve ser tratada como memória organizacional, não como artefato descartável após a decisão. Cada ciclo decisório deve preservar o estado do conhecimento no momento da decisão, as alternativas consideradas e rejeitadas, as evidências disponíveis, as premissas assumidas, as razões específicas para interromper a investigação, e o resultado efetivamente observado. Sem esse registro, uma organização é estruturalmente incapaz de distinguir, *a posteriori*, entre erro de execução, erro de modelo, erro de enquadramento original ou mudança legítima do contexto — distinção indispensável para que a organização aprenda com suas decisões, em vez de apenas revisá-las.

---

## 10. Conclusão

### 10.1 Síntese das contribuições

A hipótese central deste artigo — de que a formulação de problemas complexos pode ser compreendida como engenharia da redução de incerteza orientada à decisão — é **parcialmente sustentada** pela literatura revisada. A formulação de problemas pode, de fato, ser modelada como um processo de redução de incertezas relevantes para a decisão; mas essa redução não é monotônica, não é universal, e não é suficiente por si só para produzir uma decisão melhor.

É importante distinguir, com honestidade epistemológica, o que este artigo sintetiza da literatura existente do que propõe como contribuição original ainda não validada. Constituem síntese: a conexão entre Problem Structuring Methods e Decision Analysis; o uso de EVSI e conceitos correlatos para raciocinar sobre o valor de investigação adicional; a incorporação de atributos de qualidade da Engenharia de Requisitos; o reconhecimento de limites cognitivos documentados pela ciência comportamental; a separação entre incerteza paramétrica e incerteza estrutural; e o uso de ontologias e modelos causais para representação formal. Constituem propostas originais, carentes de validação: a ontologia híbrida específica de estados de formulação aqui apresentada; a representação explícita da incerteza de fronteira como dimensão de primeira classe; a integração entre validade ecológica e suficiência decisional em um único vetor de avaliação; o modelo de regressão da formulação ao longo do tempo; a penalidade de hiper-resolução λ; o conceito de suficiência negociada; o benchmark transversal de dez casos; e o protocolo experimental proposto para comparar formulações.

### 10.2 Limitações do framework

O framework proposto provavelmente apresenta validade reduzida em pelo menos nove condições: quando não há alternativas identificáveis; quando os valores em disputa são profundamente incomensuráveis; quando a urgência impede qualquer investigação adicional; quando o sistema sofre mudança contínua e não estacionária; quando os *outcomes* relevantes são retardados a ponto de inviabilizar validação tempestiva; quando a causalidade subjacente não é estável ao longo do tempo; quando o custo de mensuração excede o valor da própria decisão; quando o poder político domina a evidência disponível; e quando não existe nenhuma referência externa contra a qual avaliar validade ecológica. Essas limitações não são falhas de implementação a serem corrigidas — são fronteiras estruturais da abordagem, e devem ser comunicadas com a mesma ênfase que suas contribuições.

### 10.3 Agenda de pesquisa

A sequência de prioridades recomendada evita o risco de transformar uma síntese conceitual sofisticada em arquitetura computacional extensa sem validade científica demonstrada. Em ordem de precedência: (1) finalizar e estabilizar a ontologia mínima da Seção 5.1; (2) operacionalizar empiricamente cobertura, rastreabilidade, validade ecológica e legitimidade como métricas mensuráveis e replicáveis; (3) testar o penalizador λ em condições controladas antes de qualquer aplicação prática; (4) construir e disponibilizar publicamente um benchmark inicial, ainda que reduzido; (5) realizar um primeiro estudo controlado de formulação (Projeto Alpha); (6) acompanhar longitudinalmente casos reais de formulação (Projeto Delta); e (7) comparar sistematicamente o framework proposto com Problem Structuring Methods e práticas *ad hoc* já estabelecidas, em vez de assumir sua superioridade a priori.

O veredito final, portanto, é o seguinte: **hipótese parcialmente sustentada; framework promissor como programa de pesquisa, ainda não validado empiricamente.** Sua contribuição potencial não está em substituir Problem Structuring Methods, Decision Analysis ou Engenharia de Requisitos, mas em oferecer uma camada integradora capaz de representar como uma formulação muda ao longo do tempo, quais incertezas são reduzidas e quais surgem no processo, quando uma decisão se torna defensável, e — talvez o ponto mais negligenciado pela literatura precedente — quando o próprio refinamento passa a degradar, em vez de melhorar, a qualidade do processo decisório.

---

## Referências

CHECKLAND, P. Soft systems methodology: A thirty year retrospective. *Systems Research and Behavioral Science*, v. 17, S1, p. S11–S58, 2000.

CHURCHMAN, C. W. Wicked problems. *Management Science*, v. 14, n. 4, p. B141–B142, 1967.

CINELLI, M.; KADZIŃSKI, M.; MIEBS, G.; GONZALEZ, M.; SŁOWIŃSKI, R. How to support the application of multiple criteria decision analysis? Let us start with a comprehensive taxonomy. *Omega*, v. 96, 2020.

EDEN, C.; ACKERMANN, F. *SODA — The Principles*. In: ROSENHEAD, J.; MINGERS, J. (Eds.). *Rational Analysis for a Problematic World Revisited*. Chichester: Wiley, 2001.

GO, M. et al. Robust expected information gain for optimal Bayesian experimental design using ambiguity sets. In: *Proceedings of the 38th Conference on Uncertainty in Artificial Intelligence (UAI)*, PMLR, v. 180, 2022.

GRUBER, T. R. Toward principles for the design of ontologies used for knowledge sharing. *International Journal of Human-Computer Studies*, v. 43, n. 5–6, p. 907–928, 1995.

GRÜNWALD, P. *The Minimum Description Length Principle*. Cambridge, MA: MIT Press, 2007.

GUARINO, N. Formal ontology and information systems. In: *Proceedings of FOIS'98*. Amsterdam: IOS Press, 1998.

GETTINGER, J.; KIESLING, E.; STUMMER, C.; VETSCHERA, R. A comparison of representations for discrete multi-criteria decision problems. *Decision Support Systems*, v. 54, n. 2, p. 976–985, 2013.

HÄMÄLÄINEN, R. P.; LUOMA, J.; SAARINEN, E. On the importance of behavioral operational research: The case of understanding and communicating about dynamic systems. *European Journal of Operational Research*, v. 228, n. 3, p. 623–634, 2013.

HOPPE, R. Rules-of-thumb for problem-structuring policy design. *Policy Design and Practice*, 2018/2024.

HUANG, D. et al. Amortized Bayesian Experimental Design for Decision-Making. *arXiv preprint*, 2025.

ISO/IEC/IEEE 29148:2018. *Systems and software engineering — Life cycle processes — Requirements engineering*. Geneva: ISO, 2018.

KAHNEMAN, D. *Thinking, Fast and Slow*. New York: Farrar, Straus and Giroux, 2011.

KEISLER, J. M. et al. Value of information analysis: the state of application. *Environment Systems and Decisions*, v. 34, p. 3–23, 2014.

KLEIN, G. A. A recognition-primed decision (RPD) model of rapid decision making. In: KLEIN, G. A. et al. (Eds.). *Decision Making in Action: Models and Methods*. Norwood, NJ: Ablex, 1993.

KOHLAS, J. *Information Algebras: Generic Structures for Inference*. London: Springer, 2003.

MINGERS, J.; ROSENHEAD, J. Problem structuring methods in action. *European Journal of Operational Research*, v. 152, n. 3, p. 530–554, 2004.

MONTGOMERY, L.; FUCCI, D.; BOURAFFA, A.; SCANNIELLO, G.; MAALEJ, W. Empirical research on requirements quality: a systematic mapping study. *Requirements Engineering*, v. 27, p. 183–209, 2022.

MONTIBELLER, G.; FRANCO, L. A. Structuring decision problems: A case study and reflections for practitioners. *European Journal of Operational Research*, v. 199, n. 3, p. 857–866, 2010.

MOODY, D. L.; SHANKS, G. Improving the quality of data models: empirical validation of a quality management framework. *Information Systems*, v. 28, n. 6, p. 619–650, 2003.

PENG, M.; XU, Z.; HUANG, H. How does information overload affect consumers' online decision process? An event-related potentials study. *Frontiers in Neuroscience*, v. 15, 2021.

PIROLLI, P. *Information Foraging Theory: Adaptive Interaction with Information*. Oxford: Oxford University Press, 2007.

RITTEL, H. W. J.; WEBBER, M. M. Dilemmas in a general theory of planning. *Policy Sciences*, v. 4, n. 2, p. 155–169, 1973.

ROSENHEAD, J.; MINGERS, J. (Eds.). *Rational Analysis for a Problematic World Revisited: Problem Structuring Methods for Complexity, Uncertainty and Conflict*. 2. ed. Chichester: Wiley, 2001.

ROTHERY, C. et al. Value of Information Analytical Methods: Report of the ISPOR Value of Information Analysis Emerging Good Practices Task Force. *Value in Health*, v. 23, n. 3, p. 277–286, 2020.

RUSSELL, S.; WEFALD, E. *Do the Right Thing: Studies in Limited Rationality*. Cambridge, MA: MIT Press, 1991.

SHANNON, C. E. A mathematical theory of communication. *Bell System Technical Journal*, v. 27, p. 379–423, 623–656, 1948.

SIMON, H. A. The structure of ill structured problems. *Artificial Intelligence*, v. 4, n. 3–4, p. 181–201, 1973.

SLOVIC, P. The Perception of Risk. Ciência do julgamento aplicada à avaliação especializada de informação crescente, 1974.

SMITH, C. M.; SHAW, D. The characteristics of problem structuring methods: A literature review. *European Journal of Operational Research*, v. 274, n. 2, p. 403–416, 2019.

SPETZLER, C.; WINTER, H.; MEYER, J. *Decision Quality: Value Creation from Better Business Decisions*. Hoboken, NJ: Wiley, 2016.

STRONG, M.; OAKLEY, J. E.; BRENNAN, A. Estimating multiparameter partial expected value of perfect information from a probabilistic sensitivity analysis sample: a nonparametric regression approach. *Medical Decision Making*, v. 34, n. 3, p. 311–326, 2014.

THACKER, B. H. et al. *Concepts of Model Verification and Validation*. Albuquerque: Sandia National Laboratories, 2004.

VON WINTERFELDT, D.; EDWARDS, W. *Decision Analysis and Behavioral Research*. Cambridge: Cambridge University Press, 1986.

---

*Nota metodológica sobre as fontes.* Este artigo sintetiza um programa de pesquisa exploratório anterior — não uma revisão sistemática registrada com protocolo PRISMA completo — que reuniu múltiplas buscas dirigidas e rodadas de refinamento crítico da hipótese central. Algumas referências foram herdadas dessas buscas sem verificação bibliográfica independente linha a linha; recomenda-se que, antes de submissão a veículo com revisão por pares, cada citação seja conferida contra a fonte primária, com registro de strings de busca completas, bases consultadas, datas, critérios de inclusão/exclusão e avaliação de risco de viés, conforme já recomendado pela própria literatura de revisão sistemática aqui citada.
