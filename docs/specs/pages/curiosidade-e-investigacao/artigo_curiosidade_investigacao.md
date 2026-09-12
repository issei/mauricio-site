# Quando a curiosidade deixa de ser conteúdo e vira investigação

### O que acontece quando transformamos uma informação encontrada no feed em pergunta, a pergunta em fontes, as fontes em explicação — e a explicação em artefato público

---

Nunca tivemos tanto acesso a informação. Notícias, papers, documentação técnica, vídeos, debates, modelos de linguagem capazes de resumir centenas de páginas em segundos. Às vezes penso que o problema contemporâneo deixou de ser o acesso e passou a ser outra coisa: a capacidade de transformar esse acesso em compreensão.

Todos os dias, alguma coisa passa pelo meu feed. A maioria desaparece antes mesmo de eu terminar de ler o título. Algumas coisas, porém, geram uma pequena fricção — aquele "isso é interessante" que dura um segundo a mais do que o normal. Na maior parte das vezes, a fricção também desaparece. Em outras, ela se transforma em pergunta.

É nesse ponto que a rotina que quero descrever aqui começa.

## Informação que passa, conhecimento que fica

Eu costumava terminar uma sessão de leitura de feeds com a sensação de ter absorvido dezenas de ideias brilhantes. Horas depois, não conseguia explicar nenhuma delas direito. A informação tinha passado, mas não tinha ficado. Eu reconhecia os termos. Não conseguia reproduzir os mecanismos.

Há uma explicação plausível para esse padrão na teoria do forrageamento de informação: humanos navegam em ambientes ricos seguindo pistas sobre o valor de uma fonte — aquilo que Pirolli e Card chamaram de "aroma" da informação<sup>1</sup>. Feeds digitais são ambientes desenhados para maximizar esse aroma. Títulos provocativos, números, promessas de novidade. O custo de extrair uma informação é baixíssimo. O custo de digeri-la continua alto. O resultado é um comportamento de busca contínua que raramente vira integração.

Não estou dizendo que o feed causa amnésia. Estou dizendo que ele recompensa a caça, não a digestão — e que confundir a facilidade de encontrar algo com a aquisição de conhecimento é um erro que a própria arquitetura desses ambientes torna tentador. É o primeiro contraste que sustenta este texto: **informação não é a mesma coisa que conhecimento.**

## Quando algo rompe o fluxo

De vez em quando, uma informação não desaparece.

Não sei explicar exatamente por quê. Às vezes é uma pergunta que fica martelando. Às vezes é uma contradição entre duas fontes que eu não esperava encontrar. Às vezes é uma palavra que já vi dez vezes e nunca parei para entender de verdade. O que muda não é necessariamente o conteúdo — é a minha relação com ele.

A teoria da lacuna de informação descreve esse momento como a percepção de uma distância entre o que sei e o que gostaria de saber<sup>2</sup>. Estudos experimentais associam essa percepção a maior disposição para buscar respostas e, em certos contextos, a uma memória mais robusta para o material que resolve a lacuna<sup>3</sup>. A curiosidade, nesse sentido, não é apenas um estado afetivo passageiro: ela orienta a atenção e direciona a busca.

Mas a curiosidade sozinha não basta. Ela pode apontar para uma trivialidade irrelevante. Pode ser capturada por uma fonte fluente e errada. Pode durar trinta segundos e sumir. O que transforma curiosidade em investigação é uma pergunta.

## A pergunta muda o jogo

A diferença entre consumir e investigar não está no volume de conteúdo consumido. Está na decisão de converter uma impressão em objetivo.

Quando decido que quero entender *como* algo funciona — não apenas *o que* é —, meu modo de engajamento muda. Deixo de coletar fragmentos soltos e passo a procurar um mecanismo. Isso altera o que eu leio, como eu leio e o que eu de fato retenho depois.

A literatura sobre investigação orientada sustenta essa distinção: a investigação conduzida por perguntas tende a superar, em média, a exploração livre e não assistida, e a orientação — critérios, prompts, algum tipo de suporte — parece ser o fator decisivo<sup>4</sup>. A pergunta não precisa nascer perfeita. Pode ser reformulada no meio do caminho. Mas precisa existir.

Na minha rotina, a pergunta-guia funciona como um filtro. Fontes que não ajudam a respondê-la são descartadas, mesmo quando são interessantes por outros motivos. Isso reduz a tentação de acumular material só por acumular. A curadoria começa quando aceito que não preciso de mais fontes — preciso das fontes certas.

## Investigar ficou barato. Julgar continua caro

Reunir documentação original, artigos técnicos, sites, vídeos e referências acadêmicas costumava ser a parte mais lenta de qualquer investigação. Hoje a busca é quase instantânea. O que ficou caro foi o julgamento.

A transformação tecnológica das últimas décadas pode ser descrita em camadas: da busca tradicional ao aprendizado de máquina, dos modelos de linguagem (LLMs) aos sistemas que buscam e citam fontes específicas (o chamado RAG — *retrieval-augmented generation*), e destes aos agentes capazes de usar ferramentas e executar tarefas encadeadas por meio de automações. Cada camada reduziu o custo de uma operação específica: localizar, comparar, resumir, formular perguntas, organizar.

O ponto relevante não é a cronologia. É a mudança de função: as máquinas deixaram de apenas armazenar e recuperar informação e passaram a participar da manipulação, da comparação e da exploração dessa informação. Isso altera radicalmente o custo de investigar. Não elimina, porém, a necessidade de julgar — e é aqui que mora o segundo contraste deste texto: **acesso não é a mesma coisa que compreensão.**

Existe um risco embutido nessa facilidade toda. A literatura sobre *cognitive offloading* mostra que delegar processos mentais a dispositivos externos pode melhorar o desempenho imediato, mas reduzir a retenção e o raciocínio autônomo no longo prazo<sup>5</sup>. Se a máquina organiza, resume e explica tudo por mim, eu perco justamente o atrito que constrói memória. A velocidade da máquina não é a velocidade da minha compreensão.

## A máquina entra na oficina — não no trono

Uso ferramentas como o NotebookLM (ou o Gemini Notebook, sua variante mais recente) como uma bancada de trabalho, não como um oráculo.

A diferença é simples de descrever. Um oráculo responde. Uma bancada organiza, confronta e permite interrogar. Eu carrego fontes que selecionei previamente — documentação técnica, artigos, vídeos, às vezes papers acadêmicos — e faço perguntas sobre elas. A ferramenta localiza passagens, compara formulações diferentes, sugere relações que eu não tinha notado. Eu verifico cada afirmação relevante na fonte original. A ferramenta acelera o processamento; o julgamento sobre qualidade, relevância, causalidade e contexto continua sendo meu.

Isso é compatível com a ideia de andaime cognitivo (*scaffolding*): a ferramenta assume parte da carga extrínseca — o ruído, a dispersão, a dificuldade de cruzar dezenas de fontes — liberando recursos para a carga que realmente importa, aquela ligada ao esforço de integração e construção de sentido. Mas a metáfora tem um limite que prefiro não esquecer: um andaime não constrói o prédio. Ele sustenta quem constrói.

A pesquisa recente sobre IA generativa em contextos educacionais reforça essa distinção de um jeito nada sutil. Um experimento de campo com estudantes do ensino médio mostrou que o acesso irrestrito a um assistente de IA elevou o desempenho durante a prática, mas reduziu o desempenho posterior, quando a ferramenta era removida; quando o uso vinha acompanhado de limites e de algum tipo de tutoria, o prejuízo diminuía consideravelmente<sup>6</sup>. A conclusão não é "IA prejudica o aprendizado". É mais precisa e menos confortável: o design do uso é o que decide se a ferramenta amplia ou substitui o trabalho cognitivo. A mesma tecnologia pode facilitar o produto final e, ao mesmo tempo, empobrecer a aprendizagem — ou pode acelerar operações específicas mantendo visíveis e verificáveis as etapas que realmente formam compreensão.

## O paradoxo da velocidade

Depois de reunir e organizar as fontes, eu poderia pedir para a IA gerar uma síntese pronta. Muitas vezes peço. Mas a síntese não é o fim do processo — é só o início da parte mais difícil.

E é aqui que chego à pergunta que talvez seja o centro deste texto: se uma IA consegue produzir uma explicação extremamente convincente em poucos segundos, como eu sei se realmente compreendi o assunto?

A ilusão de profundidade explicativa é um dos fenômenos mais bem documentados da psicologia cognitiva. Rozenblit e Keil mostraram que as pessoas costumam sentir que entendem sistemas complexos com muito mais precisão e profundidade do que realmente conseguem explicar quando são colocadas à prova<sup>7</sup>. A sensação de familiaridade é facilmente confundida com competência causal real.

Ler um resumo fluente gerado por IA produz exatamente esse tipo de familiaridade. O texto é claro. A lógica parece óbvia. Eu reconheço os termos, as relações, o vocabulário. Mas reconhecer não é o mesmo que reproduzir — e essa é a terceira distinção que este texto tenta preservar do início ao fim: **reconhecimento não é a mesma coisa que domínio.**

## O teste da explicação

A literatura oferece um antídoto conhecido, ainda que não seja automático: recuperar informação da memória, sem consultar nada, produz retenção mais duradoura do que reler ou revisar um texto já pronto<sup>8</sup>. É o que a pesquisa chama de prática de recuperação. Funciona porque a dificuldade de produzir uma resposta do zero fortalece a memória de um jeito que a dificuldade de apenas reconhecer uma resposta não fortalece.

Então eu fecho o notebook. Sem consultar. E tento escrever ou gravar o que entendi. Quais são as partes envolvidas? Que estado muda? Por qual mecanismo? O que aconteceria se a causa estivesse ausente? O que a fonte realmente mostra — e o que eu estou apenas presumindo que ela mostra?

É nesse instante, quase sempre, que a ilusão se desfaz.

A autoexplicação parece funcionar como um segundo antídoto: quando tento articular o "como" e o "porquê" sem apoio externo, costumo detectar incoerências no meu próprio raciocínio que a leitura passiva simplesmente não revelava<sup>9</sup>. Há ainda um terceiro mecanismo relevante, chamado na literatura de expectativa de ensino: estudar sabendo que vai precisar explicar o material para outra pessoa parece organizar a memória de um jeito diferente, levando a buscar ativamente os conceitos-chave e a reter por mais tempo as informações mais importantes — um efeito que aparece mesmo quando o ensino real nunca acontece<sup>10</sup>. Meta-análises sobre preparar-se para ensinar e explicar de fato apontam, em média, ganhos de organização e compreensão, embora os efeitos variem bastante conforme a modalidade, a interatividade e a qualidade causal da explicação produzida<sup>11</sup>.

Não sei dizer com certeza se meu cérebro codifica de forma diferente quando estou preparando um vídeo para publicar. Mas percebo, de forma bem concreta, que a qualidade da minha atenção muda. Passo a procurar relações causais. Passo a procurar exemplos. Passo a procurar exatamente o ponto que ainda não está claro para mim.

## Storytelling como instrumento de pensamento

O roteiro que uso para estruturar os vídeos que publico insiste em alguns elementos: curiosidade, um problema real, tensão, progressão, relações de causa e efeito, exemplos, analogias, ausência de jargão desnecessário, preservação das nuances que a fonte original carregava. Não vou reproduzir esse roteiro aqui — o que importa é a lógica por trás dele, não o texto em si.

Por muito tempo tratei isso como técnica de comunicação. Hoje vejo também como instrumento de pensamento.

Organizar uma explicação para outra pessoa força a reorganização da própria representação mental de quem explica. Uma narrativa exige sequência. Exige causalidade. Exige que eu saiba o que vem antes e o que vem depois. Exige que eu antecipe objeções antes que alguém as faça. Simplesmente não é possível narrar com coerência um mecanismo que não se compreende — pelo menos não sem que as costuras apareçam.

Só que existe um risco simétrico que não posso ignorar. Pesquisas sobre persuasão narrativa mostram que histórias bem construídas costumam ser mais eficazes do que argumentos abstratos para alterar crenças e atitudes<sup>12</sup>. Isso é ótimo para comunicar. Mas cria uma armadilha: uma história clara pode ser persuasiva sem ser, mecanicamente, correta. O chamado transporte narrativo — aquele estado de imersão em que a história "nos leva junto" — tende a reduzir a contra-argumentação<sup>13</sup>. Fluência pode ser confundida com precisão com uma facilidade desconcertante.

Por isso a narrativa, na minha prática, precisa de freios. Isso significa distinguir com cuidado o que é fato do que é interpretação, expor os limites do que estou afirmando, indicar exatamente o que uma fonte mostra e o que continua sendo apenas hipótese minha. É um paradoxo que gosto de sentar e olhar de frente: o storytelling nasceu como ferramenta para comunicar conhecimento, mas pode funcionar também como instrumento para descobrir onde o conhecimento ainda não está bem estruturado na cabeça de quem conta a história. Comunicar e verificar a própria compreensão são coisas diferentes — mas, na prática, elas costumam se sobrepor mais do que eu esperava.

## Tornar explícito

O vídeo publicado no canal não é o produto final de nada disso. É a externalização.

Quando uma ideia deixa de existir apenas na minha cabeça e passa a existir como um artefato público, ela se torna observável, revisável, contestável, reutilizável — e isso muda o jogo. É a passagem do "eu tenho a sensação de que entendi" para "eu consigo transformar o que entendi em algo que outra pessoa consegue acompanhar". Uma coisa não substitui automaticamente a outra, mas a segunda expõe a primeira a um teste que ela raramente enfrentaria sozinha.

É onde meu canal no [YouTube](https://www.youtube.com/@MauricioIssei) entra na história — não como vitrine, mas como o lugar onde parte desse processo se torna pública. Publicar permite registrar o percurso, e não apenas a conclusão. Permite que outras pessoas encontrem a mesma pergunta que eu me fiz. Permite receber contrapontos que eu jamais teria formulado sozinho. E, com o tempo, permite construir uma espécie de memória externa — conexões entre ideias que, de outra forma, ficariam isoladas na minha própria cabeça.

A literatura sobre responsabilização social (*social accountability*) sugere que a expectativa de ter de justificar uma posição para outras pessoas pode induzir um processamento de informação mais cuidadoso, uma espécie de pressão analítica antecipada<sup>14</sup>. Isso é compatível com o que sinto ao gravar e publicar. Não é, no entanto, validação científica de nada.

## Compartilhar não é o mesmo que validar

Comentários, visualizações e engajamento não são evidência de que uma ideia está correta. Popularidade não é verdade. A audiência pode aumentar a sensação de responsabilidade, mas também pode gerar ansiedade, autopromoção ou um foco excessivo em desempenho em vez de em precisão — o efeito parece depender bastante do tipo de audiência e do contexto<sup>15</sup>.

O que ganho com a publicação, então, não é aprovação. É a possibilidade concreta de que outra pessoa encontre a ideia, acrescente algo que eu não via, conteste um ponto específico, faça uma pergunta que eu não tinha feito. O conhecimento deixa de ser só meu — e isso, por si só, já muda a forma como ele existe.

## O ciclo continua

Cada resposta pode gerar uma nova pergunta. Cada explicação pode revelar uma lacuna. Cada fonte pode levar a outra. Cada contraponto pode reorganizar o modelo mental que eu tinha construído.

O que descrevo aqui não é linear — é melhor entendido como um ciclo: exposição a uma informação → curiosidade → pergunta → investigação → curadoria de fontes → confronto de perspectivas → síntese → reflexão sobre a própria compreensão → explicação → externalização → compartilhamento → feedback → nova curiosidade → nova pergunta.

Não sei dizer com segurança se esse ciclo é, de fato, infinito. A pesquisa sobre aprendizagem autorregulada descreve processos iterativos de planejamento, monitoramento e ajuste que se parecem bastante com o que estou descrevendo<sup>16</sup>, mas ninguém validou, como pacote fechado, um ciclo público que combine feed algorítmico, IA generativa e publicação em vídeo. O que posso dizer, com a honestidade que a experiência pessoal permite, é que cada vídeo que publico gera mais perguntas do que respostas — e que a pergunta seguinte quase sempre me parece mais interessante do que a anterior.

Nesse modelo, o conhecimento deixa de ser apenas algo que se acumula e passa a ser algo que circula: é confrontado, tornado explícito, recombinado e investigado de novo.

## O ecossistema cognitivo

Buscadores, bases de conhecimento, artigos científicos, LLMs, sistemas de RAG, agentes, automações, notebooks de pesquisa, plataformas de publicação. Todas essas ferramentas juntas formam algo que pode ser descrito como um ecossistema cognitivo — um conjunto de recursos externos que participam, de fato, do meu processo de pensar.

A pergunta interessante não é se a tecnologia "amplia a mente". Essa metáfora é sedutora, mas imprecisa demais para ser útil. A pergunta é como eu estruturo minha interação com essas ferramentas.

Se a IA organiza fontes e eu continuo fazendo o julgamento, ela amplia o que consigo fazer. Se a IA organiza, julga e explica, e eu apenas aceito o resultado, ela substitui uma parte do trabalho que deveria continuar sendo minha. O risco, nesse sentido, não é tecnológico — é de desenho e de disciplina pessoal. Quanto mais poderosa a ferramenta, mais importa a qualidade do processo cognitivo que a orienta.

## O que aprendi, até agora

Não tenho um método validado cientificamente para oferecer. Tenho uma prática que funciona para mim, que encontra respaldo parcial — não integral — na literatura sobre aprendizagem, e que continuo ajustando.

O que venho aprendendo é que a curiosidade sozinha não basta. Que a investigação precisa de uma pergunta. Que a curadoria precisa de critérios, não de acúmulo. Que a síntese gerada por IA precisa de verificação. Que a explicação precisa ser feita sem consulta, ao menos uma vez, para valer como teste. Que a narrativa precisa de freios epistemológicos. Que a publicação não é o fim de nada — é uma abertura.

Talvez o maior ganho das ferramentas atuais não seja nos dar mais respostas. Talvez seja tornar barato o suficiente investigar perguntas que, há poucos anos, simplesmente permaneceriam sem resposta por falta de tempo, de acesso ou de paciência. O objetivo não é saber tudo. É construir um processo que transforme curiosidade em conhecimento — e que faça esse conhecimento continuar circulando, sujeito a revisão, a contraponto e a perguntas novas.

A tecnologia reduziu, de forma real e mensurável, o custo de manipular informação. A responsabilidade de transformar essa manipulação em compreensão continua sendo, teimosamente, humana.

Talvez a questão, no fim das contas, não seja quantas informações interessantes passam pela nossa frente todos os dias. Talvez seja quantas delas conseguimos transformar em perguntas que realmente merecem ser investigadas.

---

## Referências

1. Pirolli, P., & Card, S. (1999). Information foraging. *Psychological Review*.
2. Loewenstein, G. (1994). The psychology of curiosity: a review and reinterpretation. *Psychological Bulletin*.
3. Kang, M. J., Hsu, M., Krajbich, I. M., Loewenstein, G., McClure, S. M., Wang, J. T., & Camerer, C. F. (2009). The wick in the candle of learning: epistemic curiosity activates reward circuitry and enhances memory. *Psychological Science*. Ver também Gruber, M. J., Gelman, B. D., & Ranganath, C. (2014) sobre curiosidade e memória.
4. Lazonder, A. W., & Harmsen, R. (2016). Meta-analysis of inquiry-based learning: effects of guidance. *Review of Educational Research*. Ver também Alfieri, L., Brooks, P. J., Aldrich, N. J., & Tenenbaum, H. R. (2011).
5. Risko, E. F., & Gilbert, S. J. (2016). Cognitive offloading. *Trends in Cognitive Sciences*.
6. Bastani, S. et al. (2025). Sobre efeitos de IA generativa sem guardrails no desempenho de aprendizagem. *PNAS*.
7. Rozenblit, L., & Keil, F. (2002). The misunderstood limits of folk science: an illusion of explanatory depth. *Cognitive Science*.
8. Adesope, O. O., Trevisan, D. A., & Sundararajan, N. (2017). Rethinking the use of tests: a meta-analysis of practice testing. *Review of Educational Research*. Ver também Rowland, C. A. (2014).
9. Chi, M. T. H., de Leeuw, N., Chiu, M.-H., & LaVancher, C. (1994). Eliciting self-explanations improves understanding. *Cognitive Science*.
10. Nestojko, J. F., Bui, D. C., Kornell, N., & Bjork, E. L. (2014). Expecting to teach enhances learning and organization of knowledge in free recall of text passages. *Memory & Cognition*.
11. Kobayashi, K. (2019). Learning by preparing-to-teach and teaching: a meta-analysis. *Japanese Psychological Research*.
12. Braddock, K., & Dillard, J. P. (2016). Meta-analytic evidence for the persuasive effect of narratives. *Communication Monographs*.
13. Bullock, O. M., Colón Amill, D., Shulman, H. C., & Dixon, G. N. (2021). Narrative persuasion and processes of transportation. *Health Communication*.
14. Lerner, J. S., & Tetlock, P. E. (1999). Accounting for the effects of accountability. *Psychological Bulletin*.
15. Theobald, M. (2021). Sobre feedback e engajamento de audiência em contextos de aprendizagem pública.
16. Panadero, E. (2017). A review of self-regulated learning: six models and four directions for research. *Frontiers in Psychology*. Ver também Kuhlthau, C. C., Heinström, J., & Todd, R. J. (2008) sobre o processo de busca de informação.

---

## Nota editorial

**Tese central:** uma curiosidade encontrada no feed só se aproxima de conhecimento quando é convertida em investigação e submetida a um teste de explicação. A inteligência artificial pode organizar esse percurso e reduzir drasticamente seu custo operacional, mas não substitui as operações humanas — formular perguntas, julgar fontes, recuperar da memória, explicar sem consulta — que efetivamente transformam informação em entendimento.

**Principal contribuição intelectual:** não é a proposição de um método científico validado, mas a descrição honesta de uma arquitetura pessoal de aprendizagem que combina mecanismos com respaldo parcial na literatura (curiosidade epistêmica, investigação orientada, recuperação ativa, autoexplicação, expectativa de ensino) com uma prática específica e contemporânea: curadoria de fontes, uso de ferramentas de IA baseadas em RAG e publicação pública em vídeo. A originalidade está na combinação e na modelagem como ciclo iterativo — não em cada componente isolado, que já era conhecido separadamente.

**Partes que são experiência pessoal:** os relatos sobre fechar o feed sem conseguir explicar o que foi lido; o uso concreto do NotebookLM como bancada de fontes; a prática de fechar o notebook e tentar explicar sem consultar; o processo de gravação e publicação de vídeos; a percepção subjetiva de que a qualidade da atenção muda ao preparar uma explicação pública.

**Partes sustentadas pela literatura:** os efeitos da prática de recuperação, da autoexplicação e da expectativa de ensino sobre retenção e organização da memória; a robustez da ilusão de profundidade explicativa; os riscos de *cognitive offloading* e de uso de IA generativa sem fricção; a superioridade média da investigação orientada sobre a exploração livre; o poder persuasivo — e os limites epistêmicos — da narrativa.

**Hipóteses que permanecem abertas:** que a cadeia completa (feed → curiosidade → investigação → IA → explicação → publicação → feedback → novo ciclo) funcione como um sistema coerente de aprendizagem não foi testado empiricamente como pacote. Que a publicação pública mitigue, na prática, a ilusão de profundidade explicativa é plausível, mas não comprovado. Que o storytelling force reorganização da representação mental de quem explica é compatível com a literatura sobre autoexplicação, mas carece de evidência causal direta no contexto específico de roteiros produzidos com apoio de IA.

---

## Auditoria

- **Extrapolação causal:** revisado. Nenhuma afirmação trata a cadeia completa da rotina como validada; a linguagem usada evita "a ciência prova" em favor de formulações calibradas ("é compatível com", "sugere", "pode", "em média").
- **Uso de referências:** cada citação foi mantida restrita ao que o estudo original efetivamente sustenta (por exemplo, Chi et al. sustenta autoexplicação em textos expositivos, não em qualquer formato de explicação). Nenhuma referência foi inventada; nenhum DOI foi incluído por não estar disponível nos materiais de origem.
- **Experiência tratada como fato universal:** verificado e corrigido onde necessário — os relatos pessoais usam marcadores explícitos ("na minha experiência", "percebo", "sinto") e não são generalizados como método correto de aprender.
- **Superestimação da IA:** a IA é descrita consistentemente como instrumento — bancada, andaime cognitivo — nunca como protagonista, oráculo ou garantia de aprendizagem; os riscos de offloading e de uso sem fricção são nomeados explicitamente.
- **Storytelling sem precisão:** o risco de persuasão narrativa sem correspondência à verdade é nomeado de forma explícita como parte do argumento, não omitido.
- **Ciclo como fato:** classificado no texto como modelo interpretativo da prática pessoal, com ressalva explícita de que a literatura sobre aprendizagem autorregulada sustenta processos iterativos análogos, mas não valida o pacote específico descrito aqui.
- **Tom de guru ou fórmula pronta:** evitado; a conclusão reforça que não há método validado a ser replicado, apenas uma prática pessoal com respaldo parcial.
