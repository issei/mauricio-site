# Pesquisa crítica — "Da execução à orquestração do trabalho"

> **Versão:** v1 · **Data:** 2026-10-28 · **Pedido:** Issei, 27/10/2026 (metaprompt de pesquisa interdisciplinar + página para o áudio).
> **Fonte das alegações:** transcrição do áudio `Da\_execução\_à\_orquestração\_do\_trabalho.m4a` (3 114 palavras, cerca de 20 a 22 minutos de fala). Toda citação vem da transcrição.
> **Status:** Etapas 1 a 6 concluídas para as afirmações centrais. Pendências na §10.
> **Regra deste registro:** cada alteração futura entra como nova versão no fim do arquivo (§11), com data e motivo.

## Legenda epistêmica

|Rótulo|Significado|
|-|-|
|**Evidência**|Resultado relatado pela fonte, conferido na fonte primária ou no resumo oficial.|
|**Interpretação**|Significado que esta pesquisa atribui ao resultado.|
|**Inferência**|Conclusão que combina duas ou mais evidências.|
|**Hipótese**|Proposição plausível, ainda sem validação suficiente.|
|**Opinião**|Posição normativa ou filosófica.|

Confiança: **Alta** (fonte primária lida, método adequado à afirmação), **Moderada** (fonte primária lida só no resumo, ou método fraco para a afirmação), **Baixa** (fonte secundária, ou fonte não localizada).

---

## 1. Resumo executivo

**Tese original (do áudio).** A IA desloca o valor do trabalho humano da execução para a direção: definir objetivos, avaliar, orquestrar agentes, governar e responder pelas decisões.

**Conclusões principais.**

1. **A parte descritiva da tese tem evidência parcial.** Experimentos controlados mostram ganhos de velocidade e qualidade em tarefas delimitadas (atendimento, redação, consultoria, programação). Os mesmos estudos mostram que o ganho depende da tarefa, da experiência da pessoa e de a tarefa estar dentro ou fora do que o modelo faz bem. *Evidência, confiança Alta.*
2. **O deslocamento "da execução para a orquestração" ainda é, em grande parte, prospectivo.** Os dados de mercado de trabalho disponíveis mostram efeitos pequenos na média (Dinamarca) e efeitos concentrados em grupos específicos (jovens em ocupações expostas, EUA). Não há estudo que meça diretamente a migração de valor para "orquestração". *Inferência, confiança Moderada.*
3. **A ideia de que o gargalo muda de lugar tem apoio empírico.** Dados observacionais de engenharia de software mostram mais código e mais pull requests com IA, com revisão mais longa e sem ganho visível no nível da organização. *Evidência correlacional, confiança Moderada.*
4. **A supervisão de IA cria carga própria.** Há evidência de complacência com a automação (literatura de fatores humanos desde os anos 1980), de perda de habilidade depois do uso contínuo (um estudo observacional em colonoscopia) e de menor aprendizagem quando a pessoa delega a tarefa (um experimento pequeno em programação). *Evidência, confiança Moderada a Alta.*
5. **Boa parte dos números do áudio está errada, fora de contexto ou não tem fonte.** Das 56 afirmações auditadas (§3), 11 são sustentadas, 25 parcialmente sustentadas, 13 contestadas e 7 não verificadas. Os erros mais graves: o "estudo de caso bancário" é o benchmark offline do próprio autor (página `/case-agents`), apresentado como implantação real e com números trocados; o "salto de 33% na fadiga de decisão" é uma diferença entre grupos numa pesquisa transversal, não um aumento ao longo do dia; a "velocidade líquida de 0,85×" não tem fonte localizada.
6. **As referências filosóficas são analogias do autor.** Nenhuma fonte liga o framework EPOCH (MIT Sloan) a estoicismo, taoísmo, confucionismo ou bushidō. O próprio EPOCH foi descrito de forma incompleta. *Evidência, confiança Alta.*

**Limites da evidência.** Quase todos os experimentos medem tarefas curtas, isoladas, com ferramentas de 2023 a 2025. Os modelos mudam mais rápido do que a pesquisa revisada por pares. Não há estudo longitudinal sobre o papel de "orquestrador". Os dados sobre agentes autônomos vêm de benchmarks e de anúncios de empresas, não de avaliação independente em produção.

**Tese recomendada (Versão B, §8):** a IA aumenta a capacidade de produzir artefatos mais rápido do que aumenta a capacidade de verificá-los e integrá-los. Onde isso acontece, o valor do trabalho humano tende a depender mais de especificar, verificar, integrar e responder pelo resultado. O ganho líquido não é garantido: depende do tipo de tarefa, da experiência de quem usa e de a organização reformar a revisão, as métricas e a governança.

---

## 2. Mapa de argumentos

```
T  Tese: o valor do trabalho humano migra da execução para a orquestração.
├─ A1  A IA executa parte das tarefas intelectuais mais rápido.
│      └─ apoiado por E1–E5 (experimentos de produtividade)  → sustentado com limites de tarefa
├─ A2  Produzir mais não significa entregar mais valor.
│      ├─ A2.1  O gargalo passa para revisão, integração e QA.    → apoiado por E6, E7 (correlacional)
│      └─ A2.2  As métricas de atividade enganam.                  → apoiado por DORA/SPACE (conceitual)
├─ A3  A supervisão da IA cria nova carga cognitiva.
│      ├─ A3.1  "AI brain fry" e fadiga de decisão.                → associação transversal (E8)
│      ├─ A3.2  Complacência e viés de automação.                  → sustentado (E9, literatura clássica)
│      └─ A3.3  Perda de habilidade e de aprendizagem.             → sustentado com amostras pequenas (E10, E11)
├─ A4  A confiança vem da arquitetura em volta do modelo.
│      ├─ A4.1  Falhas silenciosas são o risco principal.          → plausível; conceito autoral
│      ├─ A4.2  Arquitetura híbrida (regras + modelo + validação). → apoiado por um benchmark do autor (não generaliza)
│      └─ A4.3  Multiagentes falham de modos previsíveis.          → sustentado (E12)
├─ A5  Agentes já operam com autonomia em produção.               → parcialmente: benchmarks mostram limites (E13, E14)
├─ A6  Competências humanas ganham peso (julgamento, empatia).     → apoio indireto (EPOCH, E15); prospectivo
└─ A7  O humano se liberta para expandir a própria mente.          → hipótese especulativa; evidência contrária (A3.3)

Dependências lógicas:
- T depende de A1 E A2: sem ganho de execução não há deslocamento; sem gargalo, não há razão para "orquestrar".
- A7 contradiz A3.3: se delegar reduz a prática, delegar não libera capacidade automaticamente.
- A4.2 é usado no áudio como prova geral; é um caso particular.
```

---

## 3. Matriz de auditoria

Colunas condensadas: **Tipo** (E = empírica, C = causal, T = técnica, Co = conceitual, N = normativa, P = prospectiva). **Veredito**: S = sustentada, PS = parcialmente sustentada, Ct = contestada, NV = não verificada. Fontes completas na §4.

### 3.1 Trabalho, produtividade e métricas

|ID|Afirmação original (transcrição)|Tipo|Fonte alegada|Fonte verificada|Evidência encontrada|Limitações|Veredito|Reformulação|Confiança|
|-|-|-|-|-|-|-|-|-|-|
|A01|"pesquisas do MIT, de Harvard… relatórios bem confidenciais de IA corporativa"|Co|MIT, Harvard|—|Nenhum relatório confidencial é citável. Os estudos de Harvard (Dell'Acqua et al.) e MIT (Noy \& Zhang; Loaiza \& Rigobon) são públicos.|Fonte genérica.|NV|Citar cada estudo pelo nome; retirar "confidenciais".|Alta (de que não é verificável)|
|A02|"Durante o último século, o recurso mais valorizado era produzir em volume. E agora a máquina faz isso."|P|—|Autor, Levy \& Murnane (2003); Acemoglu \& Restrepo (2019)|Os modelos por tarefas mostram que a tecnologia automatiza **tarefas**, não ocupações inteiras, e cria tarefas novas.|Modelos teóricos com evidência histórica.|Ct|"A IA automatiza parte das tarefas de execução; ocupações inteiras raramente desaparecem de uma vez."|Alta|
|A03|A promessa de "tempo livre" falhou; "o trabalho não encolheu, ficou mais denso"|E|"as fontes"|Humlum \& Vestergaard (2025)|25 000 trabalhadores dinamarqueses em 11 ocupações expostas: economia média de tempo de 2,8%; nenhum efeito significativo em salário ou horas (intervalos excluem efeitos maiores que 1%); a IA criou tarefas novas para parte dos usuários.|Chatbots de 2023–2024; um país.|PS|"Na Dinamarca, o uso de chatbots economizou pouco tempo e criou tarefas novas; não há evidência ampla de tempo livre."|Moderada|
|A04|"desenvolvedores, usando assistentes de IA, digitam um código 55% mais rápido"|E|—|Peng et al. (2023), arXiv:2302.06590|Grupo com GitHub Copilot **concluiu uma tarefa** (servidor HTTP em JavaScript) 55,8% mais rápido que o grupo controle.|Uma tarefa curta, de laboratório, recrutamento via plataforma; mede tempo de conclusão, não velocidade de digitação.|PS|"Num experimento com uma tarefa delimitada, quem usou o Copilot terminou 55,8% mais rápido."|Alta|
|A05|"a velocidade líquida de entrega cai para 0,85 vezes o original"|E|—|**Não localizada**|Nenhuma fonte com esse número foi encontrada.|—|NV|Retirar o número. Ver A06 para evidência independente sobre o tema.|Alta (de que não há fonte)|
|A06|O gargalo "mudou de lugar… para a validação, a garantia de qualidade"|C|—|Faros AI (2025); DORA (2024)|Faros: telemetria de mais de 10 000 desenvolvedores em 1 255 equipes: 98% mais PRs aceitos, revisão 91% mais longa, PRs 154% maiores, sem correlação com entrega no nível da organização. DORA 2024: cada 25% de aumento na adoção de IA associado a −1,5% de vazão e −7,2% de estabilidade (estimativa do relatório).|Faros é fornecedor e o dado é correlacional. DORA é pesquisa por questionário. Não provam causalidade.|PS|"Dados observacionais mostram mais código e revisão mais longa, sem ganho visível na entrega da organização."|Moderada|
|A07|Independente (não está no áudio)|E|—|METR (2025), arXiv:2507.09089|ECR com 16 desenvolvedores experientes e 246 tarefas em projetos maduros: com IA, as tarefas levaram 19% **mais** tempo. Os participantes estimaram, depois, que tinham ficado 20% mais rápidos.|Amostra pequena; ferramentas do início de 2025; projetos que os participantes conheciam muito bem.|—|Usar como evidência contrária ao otimismo, não como fonte do 0,85×.|Alta|
|A08|Story Points são "uma régua de borracha… tentam medir tamanho, esforço e risco num número só"|Co|"o relatório"|Cohn (2005); Jeffries (2019)|Story points são estimativa relativa de esforço, complexidade e incerteza (Cohn). Um dos criadores do método critica o uso como métrica de desempenho (Jeffries).|"Régua de borracha" é metáfora; o relatório citado não foi identificado.|PS|"Story points são estimativas relativas da equipe; usados como métrica de produtividade, distorcem."|Moderada|
|A09|DORA "analisa a frequência de implantação com sucesso e a taxa de falha… velocidade contra estabilidade"|Co|DORA|dora.dev; Forsgren, Humble \& Kim (2018)|As métricas DORA incluem frequência de implantação, tempo de entrega de mudanças, taxa de falha de mudanças e tempo de recuperação. Medem vazão e estabilidade.|O áudio cita só duas das quatro.|S|Manter, citando as quatro métricas.|Alta|
|A10|SPACE "foca na saúde mental, satisfação e bem-estar"|Co|SPACE|Forsgren et al. (2021), ACM Queue|SPACE tem cinco dimensões: Satisfação e bem-estar, Performance, Atividade, Comunicação e colaboração, Eficiência e fluxo.|Bem-estar é uma das cinco dimensões, não o foco.|PS|"SPACE mede produtividade em cinco dimensões, uma delas satisfação e bem-estar."|Alta|
|A11|Lei de Conway: "a estrutura de comunicação da empresa… desenho do sistema"|Co|—|Conway (1968); MacCormack, Rusnak \& Baldwin (2012)|Formulação de Conway confirmada. Estudo empírico encontrou o "espelhamento" entre arquitetura e organização em softwares comerciais × de código aberto.|Correlação; não prova direção causal.|S|Manter.|Alta|
|A12|"a solução estrutural que o MIT aborda é a manobra reversa de Conway"|Co|MIT|LeRoy \& Simons (2010); Skelton \& Pais (2019)|A manobra inversa de Conway vem da prática de consultoria (ThoughtWorks) e foi popularizada pelo livro *Team Topologies*. Não há trabalho do MIT que a proponha.|Evidência de prática, não experimental.|PS|Atribuir a ThoughtWorks e *Team Topologies*; tratar como recomendação de prática.|Moderada|
|A13|Cargas "intrínseca", "germânica" e "extrínseca"|Co|—|Sweller (1988); Sweller, van Merriënboer \& Paas (2019); Kalyuga (2011)|Os termos corretos são intrínseca, **germane** (pertinente) e **estranha** (*extraneous*). A teoria vem do ensino, não da gestão. A carga pertinente foi reformulada e é contestada (Kalyuga 2011). *Team Topologies* adapta os termos a equipes.|A transposição para equipes é analogia.|PS|Corrigir os nomes; dizer que a aplicação a equipes é uma adaptação.|Alta|

### 3.2 Carga cognitiva, neurobiologia e aprendizagem

|ID|Afirmação original|Tipo|Fonte alegada|Fonte verificada|Evidência encontrada|Limitações|Veredito|Reformulação|Confiança|
|-|-|-|-|-|-|-|-|-|-|
|B01|"uma síndrome que o pessoal já apelidou de AI Brain Fry"|Co|"as fontes"|Bedard et al. (2026), HBR / BCG|O termo existe: "fadiga mental pelo uso ou supervisão excessivos de ferramentas de IA além da capacidade cognitiva". Pesquisa com 1 488 trabalhadores dos EUA.|Termo de 2026, de uma consultoria; não é diagnóstico clínico.|S|"Pesquisadores do BCG chamam de *AI brain fry*…"|Alta|
|B02|"um salto assustador de 33% na fadiga de decisão até o fim do dia"|E|—|Bedard et al. (2026), via HCAMag e ConsumerAffairs|Quem relatou *brain fry* (cerca de 14% dos que usam IA) relatou 33% mais fadiga de decisão do que quem não relatou. Também: 39% mais erros graves e intenção de sair de 34% contra 25%.|Pesquisa transversal e autorrelatada: mostra associação entre grupos, não aumento ao longo do dia nem causa. Os números foram lidos em fontes secundárias; o artigo da HBR é pago.|Ct|"Numa pesquisa, quem relatou *brain fry* relatou 33% mais fadiga de decisão do que quem não relatou."|Moderada|
|B03|Dopamina "funciona como um erro de predição de recompensa"|Co|"a ciência"|Schultz, Dayan \& Montague (1997)|Sustentado: neurônios dopaminérgicos codificam a diferença entre a recompensa recebida e a prevista.|A teoria é central, mas há debate sobre outras funções (saliência, motivação).|S|Manter.|Alta|
|B04|"o pico de dopamina acontece quando a pessoa se esforça muito em algo incerto"|C|—|—|O erro de predição não depende de esforço. A relação entre esforço e valor da recompensa existe na literatura, mas não nesta forma.|—|Ct|Retirar a ligação com esforço.|Moderada|
|B05|Resposta instantânea da IA "rouba esse processo do nosso cérebro… a equação biológica é zerada"|C|—|—|Nenhum estudo mede dopamina durante o uso de IA.|Extrapolação de mecanismo para comportamento.|NV|Hipótese: "a IA pode reduzir a sensação de conquista; não há medição disso."|Alta (de que é especulação)|
|B06|"As pesquisas chamam isso de ilusão do pensamento… projetar uma humanidade… efeito Eliza"|Co|"as pesquisas"|Shojaee et al. (2025); Weizenbaum (1966)|"The Illusion of Thinking" (Apple, 2025) trata do colapso de modelos de raciocínio em quebra-cabeças complexos, não de antropomorfismo. O efeito ELIZA (atribuir compreensão a um programa) tem origem em Weizenbaum.|O artigo da Apple foi contestado (rebatidas sobre o desenho dos testes).|PS|Separar: efeito ELIZA = antropomorfismo; "Illusion of Thinking" = limites de raciocínio.|Alta|
|B07|Um modelo "só prevê a próxima palavra… sintaxe fria, probabilidade pura"|T|—|—|O treino é por previsão do próximo token. Se isso implica ausência de representações internas é questão aberta.|Debate ativo.|PS|"O modelo é treinado para prever o próximo token; o que ele representa internamente é debatido."|Moderada|
|B08|O cérebro gasta "meros 20 watts"|E|—|Balasubramanian (2021), PNAS|Ordem de grandeza sustentada (cerca de 20 W).|A comparação com "megawatts" mistura treino, inferência e centros de dados inteiros.|S|Manter os 20 W; qualificar a comparação.|Alta|
|B09|"achar que o silício e a biologia pensam igual é o que causa esse colapso nas expectativas"|C|—|—|Nenhuma fonte mede essa causa.|—|NV|Retirar a relação causal.|Alta|
|B10|Memória de trabalho de "quatro a sete blocos… teto inviolável"|E|—|Miller (1956); Cowan (2001)|Capacidade limitada: cerca de 4 blocos (Cowan) ou 7 ± 2 (Miller).|"Inviolável" exagera: o agrupamento (*chunking*) e a especialização mudam o que cabe num bloco.|PS|"A memória de trabalho guarda poucos blocos por vez (cerca de 4)."|Alta|
|B11|Delegar à IA libera o cérebro para "neuroplasticidade… expansão criativa"|P|—|Contra: Shen \& Tamkin (2026); Budzyń et al. (2025); Lee et al. (2025)|ECR com 52 programadores: quem usou IA aprendeu menos (quiz 50% × 67%) sem ganho significativo de tempo. Colonoscopia: taxa de detecção sem IA caiu de 28,4% para 22,4% depois de meses com IA. Pesquisa com 319 trabalhadores: mais confiança na IA associada a menos pensamento crítico relatado.|Amostras pequenas; um estudo observacional; um autorrelato.|Ct|"Delegar pode reduzir a prática que forma a habilidade. Se libera capacidade, depende de como a pessoa usa a ferramenta."|Moderada|
|B12|Independente|E|—|Kosmyna et al. (2025), arXiv:2506.08872; comentário de Stanković et al. (2026)|Estudo com EEG em 54 pessoas associou o uso de ChatGPT na redação a menor conectividade e menor memória do próprio texto.|Pré-publicação, amostra pequena, críticas metodológicas fortes (poder estatístico, correção de múltiplas comparações).|—|Não usar como prova; citar como sinal fraco.|Baixa|

### 3.3 Criatividade e decisão

|ID|Afirmação original|Tipo|Fonte alegada|Fonte verificada|Evidência encontrada|Limitações|Veredito|Reformulação|Confiança|
|-|-|-|-|-|-|-|-|-|-|
|C01|"A ciência moderna da ideação destrói esse mito… não julgar as ideias no início vai contra a nossa biologia criativa"|C|"a ciência"|Diehl \& Stroebe (1987); Mullen, Johnson \& Salas (1991); Rietzschel, Nijstad \& Stroebe (2006)|O brainstorming em **grupo** gera menos ideias que o mesmo número de pessoas sozinhas (perda de produtividade). Separar geração e seleção também tem problema: as pessoas escolhem mal entre as próprias ideias. Nenhum estudo mostra que "avaliar durante a geração" é universalmente superior.|"Biologia criativa" não tem base.|Ct|"O brainstorming em grupo rende menos do que se prometia; a melhor ordem entre gerar e avaliar depende da tarefa."|Alta|
|C02|"O problema e a solução evoluem juntos"|Co|—|Dorst \& Cross (2001)|Sustentado para design: coevolução entre problema e solução.|Estudo qualitativo com designers.|S|Manter, citando a origem.|Alta|
|C03|Independente|E|—|Doshi \& Hauser (2024), *Science Advances*|Ideias de IA aumentaram a criatividade avaliada de histórias individuais, mas deixaram as histórias mais parecidas entre si.|Escrita curta; avaliação por leitores.|—|Usar no eixo de convergência de ideias.|Alta|

### 3.4 Confiabilidade, agentes e infraestrutura

|ID|Afirmação original|Tipo|Fonte alegada|Fonte verificada|Evidência encontrada|Limitações|Veredito|Reformulação|Confiança|
|-|-|-|-|-|-|-|-|-|-|
|D01|"crash silencioso… a IA executa de forma impecável a regra de negócio totalmente errada"|Co|—|Página `/engenharia-confianca` (conceito autoral)|Conceito do próprio autor. Falhas silenciosas são reconhecidas em engenharia de confiabilidade, mas o nome não é termo técnico estabelecido.|—|PS|"O autor chama de 'crash silencioso'…"|Alta|
|D02|"estudo de caso bancário… agente autônomo lidando com aprovação de crédito"|E|"o material"|Página `/case-agents` do autor|É o benchmark **offline** de um MVP do autor: 30 consultas, ferramentas simuladas (*mock*), domínio de atendimento bancário (cartão, conta, e-mail). Não há aprovação de crédito nem implantação.|Benchmark pequeno, sem produção.|Ct|"Num benchmark offline do autor, com 30 consultas e ferramentas simuladas…"|Alta|
|D03|"limiar de confiança de 98%"|T|—|`/case-agents`: limiar do roteador = **0,75**. `/engenharia-confianca`: "Limiar de 98%" sem base (auditoria editorial, BL-02).|O número do caso real é 0,75. O 98% vem de outra página e não tem justificativa empírica.|—|Ct|Usar 0,75 para o caso; retirar 98% até ter fonte.|Alta|
|D04|"margem de segurança de 0,25 de distância para a segunda opção"|T|—|`/case-agents`|Sustentado: margem **relativa** (s₁ − s₂) / s₁ ≥ 0,25. A página chama de "política, não constante da natureza".|Valor escolhido para esse benchmark.|PS|"Margem relativa mínima de 0,25 entre a primeira e a segunda ferramenta."|Alta|
|D05|"Zero alucinações"|E|—|`/case-agents`|A página mede **0 execuções incorretas em 20 consultas transacionais**, no benchmark. Alucinação não foi medida.|20 consultas.|Ct|"Nenhuma execução incorreta nas 20 consultas transacionais do benchmark."|Alta|
|D06|"A latência caiu 92%"|E|—|**Não localizada**|Nenhum 92% de latência no `/case-agents`. As latências da página vêm de um blueprint não medido (auditoria editorial, BL-04).|—|NV|Retirar.|Alta|
|D07|"os custos de nuvem despencaram quase 78%"|E|—|`/case-agents`|77,8% é a redução do custo de **chamadas de LLM** contra um baseline "tudo para o LLM", no benchmark. A página diz: "não é economia financeira total".|—|Ct|"No benchmark, 77,8% menos custo com chamadas de LLM do que mandar tudo ao modelo."|Alta|
|D08|"Avaliaram 150 execuções multiagentes usando Kappa de Cohen… bateu 0,88, confirmando padrões de falha"|E|"a pesquisa"|Cemri et al. (2025), arXiv:2503.13657 (MAST)|150 rastros foram usados para construir a taxonomia; o conjunto final tem 1 642. O κ = 0,88 mede a **concordância entre anotadores humanos**, não a confirmação das falhas. 14 modos de falha em 3 categorias; taxas de falha de 41% a 86,7% em sete sistemas.|Pré-publicação (aceita na NeurIPS 2025 segundo o índice MLAnthology); sistemas de código aberto.|PS|"Num estudo da UC Berkeley, três anotadores classificaram falhas com alta concordância (κ = 0,88)…"|Alta|
|D09|"Agentes entravam em loops… um agente revisor… aprovava um erro pelo consenso"|E|—|Cemri et al. (2025)|Modos existentes: repetição de passos (15,7% das falhas), ignorar a contribuição de outro agente (1,9%), verificação incorreta (9,1%). "Aprovar pelo consenso" é interpretação.|—|PS|Usar os nomes dos modos de falha do estudo.|Alta|
|D10|As empresas "estão resolvendo" com DSL, contratos e responsabilidade única|P|—|—|Nenhuma fonte mostra adoção ampla. São recomendações de engenharia plausíveis.|—|NV|"Uma resposta proposta é…"|Moderada|
|D11|"amarrado via infraestrutura automatizada, tipo o AWS CloudFormation"|T|—|—|CloudFormation provisiona infraestrutura; não coordena agentes.|—|Ct|Retirar ou trocar por "infraestrutura como código".|Alta|
|D12|"Gemini 3.8 Flash rodando solto em Sandboxes Linux"|T|"os relatórios"|Documentação Google AI (consulta em 28/10/2026)|O modelo `gemini-3.8-flash` existe (estável, atualização de setembro de 2026), com execução de código e uso de computador em **prévia**. A documentação não fala em "sandbox Linux".|"Rodando solto" não tem fonte.|PS|"O Gemini 3.8 Flash oferece execução de código e uso de computador (prévia)."|Moderada|
|D13|"framework DeerFlow 2.0, que aluga computadores reais para a IA usar o mouse"|T|—|VentureBeat (2026); repositório `bytedance/deer-flow`|DeerFlow 2.0 (ByteDance, licença MIT, 28/02/2026) roda subagentes em contêineres Docker com navegador, shell e sistema de arquivos. Nenhuma fonte fala em alugar computadores ou controlar mouse.|Projeto novo, sem auditoria de segurança independente.|Ct|"O DeerFlow 2.0 executa agentes em sandboxes Docker com navegador e shell."|Moderada|
|D14|"A seguradora SOMPO… colocou 10 mil agentes operando diariamente"|E|—|Coverager (29/12/2025)|A Sompo anunciou o "SOMPO AI Agent" para cerca de **30 mil funcionários**, com piloto a partir de janeiro de 2026 (Gemini Enterprise). Nenhuma fonte com "10 mil agentes".|Anúncio da empresa; sem avaliação independente.|Ct|"A Sompo anunciou agentes de IA para cerca de 30 mil funcionários, com piloto a partir de janeiro de 2026."|Moderada|
|D15|Sites forçam "200 kilobytes de botão colorido… só para ler 3 kilobytes de texto"; "os sites agora precisam entregar Markdown"|E / N|—|Página `/agent-ready` do autor (conceito); números não localizados|A prática de servir Markdown para agentes existe (ex.: `llms.txt`, negociação de conteúdo). Os números 200 KB / 3 KB não têm fonte. "Precisam" é recomendação, não norma.|—|PS|"Uma prática em adoção é servir uma versão em Markdown para agentes."|Moderada|
|D16|"Modelos VLA… tipo o RT1 e RT2… arrumando a cama de verdade"|T|—|Brohan et al. (2022; 2023)|RT-1 e RT-2 (Google DeepMind) existem; RT-2 é um modelo visão-linguagem-ação. As demonstrações publicadas são de manipulação de objetos em ambiente controlado; nenhuma de arrumar cama.|Demonstrações de laboratório.|PS|"Modelos como o RT-2 manipulam objetos simples em laboratório."|Alta|
|D17|"problema da ancoragem de símbolos"|Co|—|Harnad (1990)|Sustentado como problema filosófico e técnico.|—|S|Manter.|Alta|
|D18|"Usando o HAG para ensinar a IA a ler o manual interno"|T|—|Lewis et al. (2020)|Erro de transcrição: **RAG** (geração aumentada por recuperação). A técnica existe. "Ensinar" é impreciso: o modelo consulta, não aprende.|—|PS|"RAG: o sistema recupera trechos do manual e os entrega ao modelo."|Alta|
|D19|Independente|E|—|Kwa et al. (2025), METR; Xu et al. (2025), TheAgentCompany|O horizonte de tarefas que agentes completam com 50% de sucesso dobrou a cada 7 meses (2019–2025), mas o desempenho cai em tarefas menos estruturadas. Num escritório simulado, o melhor agente concluiu 30% das tarefas sozinho.|Benchmarks; não medem produção.|—|Usar no eixo 6.|Alta|

### 3.5 Competências, liderança e filosofia

|ID|Afirmação original|Tipo|Fonte alegada|Fonte verificada|Evidência encontrada|Limitações|Veredito|Reformulação|Confiança|
|-|-|-|-|-|-|-|-|-|-|
|E01|Estoicismo "para focar só no que controlamos"|Co|—|Epicteto, *Enchirídion* §1|Dicotomia do controle: conceito original confirmado.|Ética pessoal; aplicação à organização é analogia.|PS|Manter como analogia declarada.|Alta|
|E02|Taoísmo, "wu wei… ação fluida para contornar problemas sem força inútil"|Co|—|*Dao De Jing* (ex.: cap. 37, 48)|*Wu wei* ("não ação", ação sem esforço forçado). Leitura aceitável, simplificada.|Conceito com várias interpretações.|PS|Analogia declarada.|Moderada|
|E03|"o confucionismo para calibrar a empatia"|Co|—|*Analectos* 15.24 (*shu*, reciprocidade); *ren*|Há conceitos próximos (*ren*, benevolência; *shu*, reciprocidade). "Calibrar a empatia" é leitura moderna.|—|PS|Citar o conceito (*ren*, *shu*) e declarar a analogia.|Moderada|
|E04|"o bushido, o conceito de makoto para a integridade"|Co|—|Nitobe (1900), *Bushido: The Soul of Japan*|*Makoto* (sinceridade) aparece em Nitobe. O "bushidō" como código unificado é, em boa parte, construção do fim do século XIX.|Historiografia contesta a imagem tradicional.|PS|Declarar a fonte (Nitobe) e o caráter de analogia.|Moderada|
|E05|"Tudo isso forma o framework EPOC do MIT, que cobra empatia, presença, opinião autêntica e esperança construtiva"|Co|MIT|Loaiza \& Rigobon (2024/2025), MIT Sloan|O nome é **EPOCH**: Empatia e inteligência emocional; Presença, rede e conexão; Opinião, julgamento e ética; **Criatividade** e imaginação; Esperança, visão e liderança. Nada liga o EPOCH às tradições filosóficas citadas.|Índice construído sobre O\*NET; trabalho de pesquisa, não norma.|Ct|"O EPOCH (MIT Sloan) lista cinco grupos de capacidades humanas… A ligação com estoicismo e as demais é do autor."|Alta|
|E06|"método MOSCO"|Co|—|Clegg \& Barker (1994), DSDM|Erro de transcrição: **MoSCoW** (Must, Should, Could, Won't).|—|S|Corrigir o nome.|Alta|
|E07|"Matriz-Ghout, multiplicando a gravidade, urgência e tendência"|Co|—|Atribuída a Kepner \& Tregoe na literatura brasileira; atribuição não conferida na fonte primária|Matriz **GUT** (Gravidade, Urgência, Tendência). A multiplicação dos três fatores é a forma usual.|Origem não confirmada.|PS|Corrigir o nome; não atribuir autoria.|Moderada|
|E08|"Conversas cruciais. Metodologias como STATE e CRIBE"|Co|—|Patterson et al. (2002), *Crucial Conversations*|STATE e **CRIB** existem no livro.|Livro de prática, não estudo.|S|Corrigir "CRIB".|Moderada|
|E09|Zoom × dolly, paralaxe|Co|—|Prática de cinema (conceito técnico)|A diferença existe: o zoom muda a distância focal, o dolly move a câmera e gera paralaxe.|A ligação com empatia é analogia autoral.|PS|Declarar como metáfora.|Alta|
|E10|"O movimento Web para Todos, que já tem nove anos"|E|—|Minha Operadora (setembro de 2017)|Lançado em setembro de 2017 em São Paulo; cerca de nove anos em 2026.|—|S|Manter.|Moderada|
|E11|"O projeto Cloud Mythos mostrou que nós construímos um gênio da lâmpada"|Co|—|Anthropic, 07/04/2026, via VentureBeat|Erro de transcrição: **Claude Mythos Preview**, modelo da Anthropic não liberado ao público por risco cibernético (Projeto Glasswing). Encontrou falhas de segurança graves em sistemas operacionais e navegadores. A imagem do "gênio da lâmpada" é do autor.|Dados de capacidade divulgados pela própria empresa.|PS|"O Claude Mythos Preview, que a Anthropic decidiu não liberar ao público por causa do risco cibernético, ilustra o problema: capacidade alta exige governança."|Moderada|
|E12|"A tal da inteligência centauro"|Co|—|Dell'Acqua et al. (2025/2023)|O estudo descreve dois padrões de uso: "centauros" (dividem tarefas entre pessoa e IA) e "ciborgues" (integram as duas). A origem do termo é o xadrez de Kasparov.|—|S|Manter.|Alta|
|E13|"O mercado vive um gap de agência gigantesco"|P|—|—|Termo sem definição verificável.|—|NV|Retirar ou definir.|Alta|
|E14|"A responsabilidade ética é inalienável. O humano assina embaixo."|N|—|—|Posição normativa defensável (consistente com, por exemplo, o NIST AI RMF), mas é opinião.|—|Opinião|Marcar como posição do autor.|—|

**Contagem.** 56 afirmações auditadas (sem contar os 4 itens independentes e a opinião E14): **S = 11**, **PS = 25**, **Ct = 13**, **NV = 7**. Correções de nome com transcrição errada (MoSCoW, CRIB, RAG, *germane*) contam como S ou PS conforme o conteúdo.

---

## 4. Bibliografia comentada

Datas de consulta: 27 e 28/10/2026. "Lida" = fonte primária ou resumo oficial consultado nesta pesquisa. "Secundária" = número lido em reportagem.

### 4.1 Produtividade e trabalho

1. **Brynjolfsson, E.; Li, D.; Raymond, L. (2025).** Generative AI at Work. *Quarterly Journal of Economics*, 140(2), 889–942. NBER WP 31161: [https://www.nber.org/papers/w31161](https://www.nber.org/papers/w31161). Campo, 5 179 atendentes; +14% de casos resolvidos por hora, +34% para novatos, efeito mínimo para experientes. **Sustenta:** ganho heterogêneo; IA como transferência de conhecimento tácito. Lida (resumo).
2. **Noy, S.; Zhang, W. (2023).** Experimental evidence on the productivity effects of generative AI. *Science*. DOI 10.1126/science.adh2586. Experimento online, 453 profissionais; −40% de tempo, +18% de qualidade em tarefas de escrita. **Sustenta:** ganho em tarefa delimitada. Lida (resumo).
3. **Dell'Acqua, F. et al. (2025).** Navigating the Jagged Technological Frontier. *Organization Science*. DOI 10.1287/orsc.2025.21838 (working paper HBS 24-013, 2023). 758 consultores do BCG; dentro da fronteira: +12,2% de tarefas, 25,1% mais rápido, qualidade cerca de 32% maior na média relatada no artigo publicado (o working paper de 2023 falava em mais de 40%); fora da fronteira: 19 pontos percentuais a menos de respostas corretas. **Sustenta:** a fronteira é irregular; a IA atrapalha fora dela. Lida.
4. **Peng, S. et al. (2023).** The Impact of AI on Developer Productivity: Evidence from GitHub Copilot. arXiv:2302.06590. Uma tarefa, 55,8% mais rápido. Lida (resumo).
5. **Becker, J. et al. / METR (2025).** Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity. arXiv:2507.09089. ECR, 16 desenvolvedores, 246 tarefas; +19% de tempo com IA. **Contrária** ao otimismo. Lida (resumo).
6. **Humlum, A.; Vestergaard, E. (2025).** Large Language Models, Small Labor Market Effects. BFI WP 2025-56. 25 000 trabalhadores, 7 000 locais; 2,8% de economia de tempo; sem efeito em salário ou horas. **Contrária** à tese forte. Lida (resumo, via Marginal Revolution).
7. **Brynjolfsson, E.; Chandar, B.; Chen, R. (2025).** Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of AI. Stanford Digital Economy Lab: [https://siepr.stanford.edu/publications/working-paper/canaries-coal-mine-six-facts-about-recent-employment-effects-artificial](https://siepr.stanford.edu/publications/working-paper/canaries-coal-mine-six-facts-about-recent-employment-effects-artificial). Dados de folha de pagamento; −13% relativo no emprego de 22 a 25 anos nas ocupações mais expostas; perdas concentradas onde a IA automatiza, não onde complementa. **Sustenta:** o efeito varia por tarefa e idade. Lida (resumo).
8. **Faros AI (2025).** The AI Productivity Paradox. [https://www.faros.ai/blog/lab-vs-reality-ai-productivity-study-findings](https://www.faros.ai/blog/lab-vs-reality-ai-productivity-study-findings). Telemetria, mais de 10 000 desenvolvedores; revisão 91% mais longa; sem correlação com entrega da organização. Relatório de fornecedor, correlacional. Lida (blog do fornecedor).
9. **DORA (2024).** Accelerate State of DevOps Report 2024. [https://dora.dev](https://dora.dev). Resumo em InfoQ: [https://www.infoq.com/news/2024/11/2024-dora-report/](https://www.infoq.com/news/2024/11/2024-dora-report/). −1,5% de vazão e −7,2% de estabilidade por 25% de adoção de IA (estimativa). Pesquisa por questionário. Secundária.
10. **Forsgren, N. et al. (2021).** The SPACE of Developer Productivity. *ACM Queue*, 19(1). DOI 10.1145/3454122.3454124. Cinco dimensões. Conhecida; não relida nesta sessão.
11. **Acemoglu, D.; Restrepo, P. (2019).** Automation and New Tasks. *Journal of Economic Perspectives*, 33(2), 3–30. DOI 10.1257/jep.33.2.3. Modelo por tarefas: deslocamento × criação de tarefas. Conhecida.
12. **Autor, D.; Levy, F.; Murnane, R. (2003).** The Skill Content of Recent Technological Change. *QJE*, 118(4). DOI 10.1162/003355303322552801. Conhecida.
13. **Acemoglu, D. (2025).** The Simple Macroeconomics of AI. *Economic Policy*, 40(121). DOI 10.1093/epolic/eiae042. Estimativa de ganho de produtividade total pequeno em dez anos (abaixo de 1%). **Contrária** à visão de ruptura. Conhecida; não relida nesta sessão.
14. **Brynjolfsson, E.; Rock, D.; Syverson, C. (2021).** The Productivity J-Curve. *AEJ: Macroeconomics*, 13(1). DOI 10.1257/mac.20180386. Explicação alternativa: o ganho aparece depois do investimento em reorganização. Conhecida.

### 4.2 Cognição, supervisão e aprendizagem

15. **Bedard, J. et al. (2026).** When Using AI Leads to "Brain Fry". *Harvard Business Review*, 5/3/2026. [https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry](https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry); nota do BCG: [https://www.bcg.com/news/5march2026-when-using-ai-leads-brain-fry](https://www.bcg.com/news/5march2026-when-using-ai-leads-brain-fry). 1 488 trabalhadores; números (14%, 33%, 39%, 34% × 25%) lidos em HCAMag e ConsumerAffairs. Artigo pago, não lido por inteiro. Secundária.
16. **Shen, J. H.; Tamkin, A. (2026).** How AI assistance impacts the formation of coding skills. Anthropic, 29/1/2026. [https://www.anthropic.com/research/AI-assistance-coding-skills](https://www.anthropic.com/research/AI-assistance-coding-skills). ECR, 52 pessoas; −17 pontos no quiz; tempo sem diferença significativa. Conflito de interesse possível (empresa de IA). Lida.
17. **Budzyń, K. et al. (2025).** Endoscopist deskilling after exposure to AI in colonoscopy. *Lancet Gastroenterology \& Hepatology*. Resumo: [https://ascopost.com/news/august-2025/routine-ai-assistance-may-lead-to-loss-of-skills-in-endoscopists-study-shows/](https://ascopost.com/news/august-2025/routine-ai-assistance-may-lead-to-loss-of-skills-in-endoscopists-study-shows/). 1 443 exames sem IA; detecção de 28,4% para 22,4%. Observacional. Secundária.
18. **Lee, H.-P. et al. (2025).** The Impact of Generative AI on Critical Thinking. CHI 2025. [https://advait.org/files/lee\_2025\_ai\_critical\_thinking\_survey.pdf](https://advait.org/files/lee_2025_ai_critical_thinking_survey.pdf). 319 trabalhadores; autorrelato. Conhecida; resumo consultado.
19. **Kosmyna, N. et al. (2025).** Your Brain on ChatGPT. arXiv:2506.08872; **Stanković, M. et al. (2026).** Comment. arXiv:2601.00856. Estudo e crítica metodológica. Lidos (comentário).
20. **Bainbridge, L. (1983).** Ironies of Automation. *Automatica*, 19(6), 775–779. DOI 10.1016/0005-1098(83)90046-8. Automatizar o fácil deixa ao humano o difícil, com menos prática. Fundamento clássico do eixo 2. Conhecida.
21. **Parasuraman, R.; Manzey, D. (2010).** Complacency and Bias in Human Use of Automation. *Human Factors*, 52(3), 381–410. DOI 10.1177/0018720810376055. Revisão integrativa. Conhecida.
22. **Sweller, J.; van Merriënboer, J.; Paas, F. (2019).** Cognitive Architecture and Instructional Design: 20 Years Later. *Educational Psychology Review*, 31, 261–292. DOI 10.1007/s10648-019-09465-5. **Kalyuga, S. (2011)**, DOI 10.1007/s10648-010-9150-7 (crítica à carga pertinente). Conhecidas.
23. **Schultz, W.; Dayan, P.; Montague, P. R. (1997).** A Neural Substrate of Prediction and Reward. *Science*, 275, 1593–1599. DOI 10.1126/science.275.5306.1593. Conhecida.
24. **Cowan, N. (2001).** The magical number 4. *Behavioral and Brain Sciences*, 24(1). DOI 10.1017/S0140525X01003922. Conhecida.
25. **Balasubramanian, V. (2021).** Brain power. *PNAS*, 118(32). DOI 10.1073/pnas.2107022118. Conhecida.

### 4.3 Criatividade e decisão

26. **Diehl, M.; Stroebe, W. (1987).** Productivity loss in brainstorming groups. *JPSP*, 53(3). DOI 10.1037/0022-3514.53.3.497. Conhecida.
27. **Mullen, B.; Johnson, C.; Salas, E. (1991).** Productivity loss in brainstorming groups: a meta-analytic integration. *Basic and Applied Social Psychology*, 12(1). DOI 10.1207/s15324834basp1201\_1. Conhecida.
28. **Rietzschel, E.; Nijstad, B.; Stroebe, W. (2006).** Productivity is not enough: idea generation and selection. *JESP*, 42(2). DOI 10.1016/j.jesp.2005.04.005. Conhecida.
29. **Dorst, K.; Cross, N. (2001).** Creativity in the design process: co-evolution of problem–solution. *Design Studies*, 22(5). DOI 10.1016/S0142-694X(01)00009-6. Conhecida.
30. **Doshi, A.; Hauser, O. (2024).** Generative AI enhances individual creativity but reduces the collective diversity of novel content. *Science Advances*, 10(28). DOI 10.1126/sciadv.adn5290. Conhecida.
31. **Kahneman, D.; Klein, G. (2009).** Conditions for intuitive expertise. *American Psychologist*, 64(6). DOI 10.1037/a0016755. Quando confiar no julgamento especializado. Conhecida.

### 4.4 Agentes e engenharia

32. **Cemri, M. et al. (2025).** Why Do Multi-Agent LLM Systems Fail? arXiv:2503.13657 (v3, 26/10/2025). Lida.
33. **Kwa, T. et al. / METR (2025).** Measuring AI Ability to Complete Long Tasks. arXiv:2503.14499. Lida.
34. **Xu, F. et al. (2025).** TheAgentCompany. NeurIPS 2025, arXiv:2412.14161. Melhor agente: 30% das tarefas. Lida (resumo da NeurIPS).
35. **Shojaee, P. et al. (2025).** The Illusion of Thinking. arXiv:2506.06941. Contestado por réplicas (ex.: arXiv:2507.01231). Conhecida.
36. **Weizenbaum, J. (1966).** ELIZA. *CACM*, 9(1). DOI 10.1145/365153.365168. Conhecida.
37. **Harnad, S. (1990).** The Symbol Grounding Problem. *Physica D*, 42. DOI 10.1016/0167-2789(90)90087-6. Conhecida.
38. **Brohan, A. et al. (2023).** RT-2. arXiv:2307.15818; RT-1, arXiv:2212.06817. Conhecidas.
39. **Lewis, P. et al. (2020).** Retrieval-Augmented Generation. arXiv:2005.11401. Conhecida.
40. **Conway, M. (1968).** How Do Committees Invent? *Datamation*. [https://www.melconway.com/Home/Committees\_Paper.html](https://www.melconway.com/Home/Committees_Paper.html). **MacCormack, A.; Rusnak, J.; Baldwin, C. (2012).** *Research Policy*, 41(8). DOI 10.1016/j.respol.2012.04.011. Conhecidas.
41. **Skelton, M.; Pais, M. (2019).** *Team Topologies*. IT Revolution. Livro de prática.

### 4.5 Produtos e implantações (fontes de empresa ou imprensa)

42. Google. Gemini 3.8 Flash. [https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash) (consulta em 28/10/2026).
43. VentureBeat (2026). What is DeerFlow. [https://venturebeat.com/orchestration/what-is-deerflow-and-what-should-enterprises-know-about-this-new-local-ai](https://venturebeat.com/orchestration/what-is-deerflow-and-what-should-enterprises-know-about-this-new-local-ai).
44. Coverager (29/12/2025). Sompo to deploy AI agents across 30,000 employees. [https://coverager.com/sompo-to-deploy-ai-agents-across-30000-employees/](https://coverager.com/sompo-to-deploy-ai-agents-across-30000-employees/).
45. VentureBeat (7/4/2026). Claude Mythos Preview / Project Glasswing. [https://venturebeat.com/data/anthropic-says-its-most-powerful-ai-cyber-model-is-too-dangerous-to-release](https://venturebeat.com/data/anthropic-says-its-most-powerful-ai-cyber-model-is-too-dangerous-to-release).
46. MIT Sloan (17/3/2025). EPOCH. [https://mitsloan.mit.edu/press/new-mit-sloan-research-suggests-ai-more-likely-to-complement-not-replace-human-workers](https://mitsloan.mit.edu/press/new-mit-sloan-research-suggests-ai-more-likely-to-complement-not-replace-human-workers).
47. Minha Operadora (set/2017). Web para Todos. [https://www.minhaoperadora.com.br/2017/09/web-para-todos-quer-facilitar-navegacao-de-pessoas-com-deficiencia.html](https://www.minhaoperadora.com.br/2017/09/web-para-todos-quer-facilitar-navegacao-de-pessoas-com-deficiencia.html).

### 4.6 Fontes do próprio site (origem de parte das alegações)

* `/case-agents` (benchmark offline; limiares 0,75 e 0,25; 77,8%).
* `/engenharia-confianca` ("Crash Silencioso", "Limiar de 98%").
* `/devin` (série de oito episódios: "AI Brain Fry", "EPOCH", "Lei de Conway Reversa", "Agency Gap", "Inteligência Centauro").
* `/agent-ready` (Markdown para agentes).
* [`docs/specs/editorial/AUDITORIA-COMUNICACAO.md`](../../editorial/AUDITORIA-COMUNICACAO.md): BL-02 (98% sem base), BL-04 (latências não medidas), BL-06 (números ilustrativos em `/devin`).

**Interpretação.** O áudio parece ter sido gerado a partir dessas páginas e de outras fontes. Ele repete os problemas já registrados na auditoria editorial e acrescenta novos (troca de limiares, "aprovação de crédito", "custo de nuvem").

---

## 5. Mapa de evidências

|Afirmação central|Evidência a favor|Evidência contra ou limitante|Força|
|-|-|-|-|
|A1 · A IA acelera tarefas intelectuais|\[1], \[2], \[3], \[4]|\[5] (desenvolvedores experientes mais lentos); \[3] fora da fronteira|Alta, com moderadores|
|A2 · Mais produção ≠ mais valor|\[8], \[9], \[14]|Faltam estudos causais no nível da organização|Moderada|
|A3 · Supervisão cria carga|\[15], \[20], \[21]|\[15] é transversal e autorrelatado|Moderada|
|A3.3 · Delegar reduz aprendizagem|\[16], \[17], \[18]|Amostras pequenas; \[16] mostra padrões de uso que preservam a aprendizagem|Moderada|
|A4 · Confiança vem da arquitetura|\[32]; `/case-agents`|Um benchmark do autor; nenhuma avaliação independente|Baixa a moderada|
|A5 · Agentes autônomos em produção|\[42]–\[45] (anúncios)|\[33], \[34] (benchmarks com limites claros)|Baixa|
|A6 · Competências humanas ganham peso|\[46], \[7] (perdas onde a IA automatiza)|Prospectivo; índice sobre O\*NET|Moderada|
|A7 · Delegar expande a mente|nenhuma|\[16], \[17], \[18], \[19]|Sem base|

---

## 6. Análise de controvérsias

1. **Laboratório × campo.** Experimentos com tarefas curtas mostram ganhos grandes (\[2], \[4]). Estudos em contexto real mostram ganhos pequenos ou negativos (\[5], \[6]). **Causas possíveis:** tarefas de laboratório são autocontidas; no trabalho real há contexto, integração e revisão; pessoas experientes ganham menos; ferramentas mudaram entre os estudos.
2. **Novatos × experientes.** \[1] mostra que novatos ganham mais. \[5] mostra experientes mais lentos. \[16] mostra que novatos aprendem menos. **Tensão:** o mesmo efeito que nivela o desempenho hoje pode reduzir a formação de quem será experiente amanhã. Não há estudo longitudinal que resolva isso.
3. **Percepção × medição.** Em \[5], os participantes acreditaram estar 20% mais rápidos e estavam 19% mais lentos. Autorrelato (\[9], \[15], \[18]) deve ser lido com essa ressalva.
4. **Fornecedores como fonte.** \[8], \[16] e os anúncios de produto vêm de empresas com interesse no resultado. São úteis para levantar hipóteses, não para fechá-las.
5. **Explicações alternativas para o "gargalo"**: (a) PRs maiores, não IA em si, tornam a revisão lenta (nota de L. Tacho em \[9]); (b) a curva J (\[14]): a queda inicial reflete a reorganização em curso; (c) seleção: equipes que adotam mais IA podem ser diferentes de saída.
6. **Ilusão do pensamento.** \[35] foi rebatido por trabalhos que atribuem parte do colapso a limites de saída e ao desenho dos quebra-cabeças. O tema segue aberto.

---

## 7. Modelo explicativo (hipótese de trabalho)

```
Capacidade de execução automatizada
        │  (+) ganho em tarefa delimitada .................. demonstrado \[1–4]
        ▼
Volume de produção (código, texto, PRs)
        │  (+) mais artefatos ............................... observado, correlacional \[8]
        ▼
Necessidade de validação
        │  (+) revisão mais longa, PRs maiores .............. observado, correlacional \[8], \[9]
        │  (−) se a validação é automatizada (testes, contratos) ... hipótese
        ▼
Coordenação sociotécnica (filas, integração, métricas)
        │  moderadores: tamanho do lote, cultura de revisão, plataforma ... prática \[41]
        ▼
Decisão humana (aceitar, rejeitar, responsabilizar-se)
        │  riscos: complacência \[21], perda de habilidade \[17], fadiga \[15]
        ▼
Valor entregue (resultado para cliente e negócio)
```

**Relações demonstradas:** capacidade → velocidade em tarefa delimitada.
**Relações correlacionais:** volume → revisão mais longa; adoção → menor estabilidade.
**Variáveis moderadoras:** experiência da pessoa; tarefa dentro ou fora da fronteira; tamanho do lote; maturidade de testes e plataforma; forma de uso (perguntar e entender × só delegar, \[16]).
**Onde o modelo falha:** em tarefas sem validação cara (rascunho, ideação privada); em tarefas em que o erro é barato; quando a verificação é automatizável.
**Efeitos de segunda ordem:** menos oportunidades de entrada para iniciantes (\[7]); convergência de ideias (\[30]); dívida de manutenção.

**Indicadores para testar o modelo:** tempo de revisão por PR; tamanho dos PRs; taxa de falha de mudanças; tempo de entrega de mudanças; retrabalho; desempenho sem IA em amostras periódicas (como o ADR sem IA em \[17]); fadiga relatada com instrumento validado.

### Cenários

|Cenário|Condições que o tornam plausível|Evidência que o distingue|
|-|-|-|
|**Favorável** — a IA aumenta a produtividade efetiva e libera capacidade|Tarefas dentro da fronteira; validação automatizada; lotes pequenos; pessoas que usam a IA para entender, não só para delegar|Vazão e estabilidade sobem juntas (DORA); tempo de revisão estável; desempenho sem IA preservado|
|**Intermediário** — execução acelera, revisão absorve parte do ganho|Validação manual; PRs maiores; métricas de atividade|Mais PRs e mesma entrega; revisão mais longa (padrão de \[8])|
|**Adverso** — erros, dependência e supervisão anulam o ganho|Tarefas fora da fronteira; confiança excessiva; perda de prática|Estabilidade cai; erros graves sobem; desempenho sem IA cai (padrão de \[17], \[5])|

**Inferência:** os dados de 2024–2025 em software se parecem mais com o cenário intermediário do que com os outros dois. Isso pode mudar com ferramentas novas.

---

## 8. Tese revisada

### Versão A — cientificamente conservadora

> Em tarefas delimitadas, a IA generativa reduz o tempo e, muitas vezes, melhora a qualidade, com ganhos maiores para pessoas menos experientes. Fora do que o modelo faz bem, o desempenho pode piorar. No nível da organização e do mercado de trabalho, os efeitos medidos até agora são pequenos ou concentrados em grupos específicos.

* **A favor:** \[1]–\[4], \[6], \[7]. **Objeção mais forte:** os modelos mudaram depois dos estudos. **Validade:** tarefas e ferramentas semelhantes às estudadas. **Estabelecido:** tudo acima. **Extrapolação:** nenhuma.

### Versão B — técnico-organizacional (recomendada)

> A IA aumenta a capacidade de produzir artefatos mais rápido do que aumenta a capacidade de verificá-los e integrá-los. Onde isso acontece, o valor do trabalho humano tende a depender mais de especificar o problema, verificar o resultado, integrar ao sistema e responder pela decisão. O ganho líquido não é garantido: depende do tipo de tarefa, da experiência de quem usa e de a organização reformar revisão, métricas e governança.

* **A favor:** \[1]–\[4] (capacidade); \[8], \[9] (gargalo); \[20], \[21] (supervisão); \[32] (falhas de coordenação). **Objeções:** a evidência do gargalo é correlacional; a revisão também pode ser automatizada; o termo "orquestração" não tem medida própria. **Validade:** trabalho com artefatos verificáveis (software, documentos, análises). **Estabelecido:** capacidade e supervisão. **Extrapolação:** que o padrão vale fora de software.

### Versão C — prospectiva

> Se os agentes continuarem a completar tarefas cada vez mais longas (\[33]), parte do trabalho intelectual pode passar a ser definida por quem especifica, supervisiona e responde por sistemas de agentes. Esse futuro depende de avanços em confiabilidade, de custos de supervisão menores que o ganho e de preservar a formação de pessoas capazes de avaliar o que os agentes fazem.

* **A favor:** \[33], \[42]–\[45]. **Objeções:** benchmarks não medem produção; falhas multiagente frequentes (\[32]); perda de habilidade (\[16], \[17]). **Estabelecido:** a tendência de benchmarks. **Extrapolação:** todo o resto.

**Escolha:** a Versão B é a mais defensável para um artigo ou episódio. Ela mantém a ideia central do áudio (o gargalo muda de lugar e o papel humano muda com ele) e só afirma o que tem apoio.

---

## 9. Roteiro editorial

Recomendação para reconstruir o conteúdo sem perder a ideia central:

1. **Abertura com a tese B** em duas frases. Sem a metáfora da fábrica que "vira fumaça" (exagera a ruptura).
2. **O que já se sabe:** os experimentos de produtividade, com o recorte de cada um (\[1]–\[4]) e o contraponto do METR (\[5]).
3. **Onde o ganho escapa:** revisão, integração e métricas (DORA, SPACE, \[8]). Uma metáfora só: a fila que muda de lugar.
4. **O custo de supervisionar:** complacência, *brain fry* com o número correto, perda de habilidade.
5. **Confiabilidade:** falhas multiagente (MAST) e o caso do autor contado como benchmark, com os números certos.
6. **Competências:** EPOCH completo; tradições filosóficas como analogia declarada.
7. **Três cenários** e os indicadores que os distinguem.
8. **Fechamento:** o que fica em aberto. Sem a promessa de "neuroplasticidade".

Excluir do texto novo: 0,85×, 92%, "aprovação de crédito", "custo de nuvem", "zero alucinações", "10 mil agentes", "alugar computadores", "200 KB / 3 KB", CloudFormation como orquestrador de agentes, "gap de agência" sem definição.

---

## 10. Lacunas de pesquisa e pendências

**Perguntas sem resposta na literatura:**

1. Existe medida válida de "trabalho de orquestração"? Nenhum estudo encontrado mede a parcela do tempo dedicada a especificar, supervisionar e integrar.
2. O ganho de novatos (\[1]) se mantém quando a formação deles é mais curta (\[16])? Exige estudo longitudinal.
3. O gargalo de revisão (\[8]) é causado pela IA ou pelo tamanho dos lotes? Exige desenho quase experimental.
4. O padrão de software vale para direito, saúde, marketing? Faltam estudos de campo.
5. Qual a confiabilidade de agentes em produção, medida por terceiros? Só há anúncios e benchmarks.

**Pendências desta pesquisa:**

* **P1.** Ler o artigo completo da HBR (pago) para confirmar 33%, 39% e 14% na fonte primária.
* **P2.** Confirmar a autoria da matriz GUT na fonte primária.
* **P3.** Ouvir o áudio para conferir a transcrição (nomes como "germânica", "HAG", "MOSCO", "CRIBE" parecem erros de reconhecimento de fala) e a duração.
* **P4.** Confirmar com o autor se o áudio foi gerado por IA (o formato "Mergulho Profundo" com duas vozes sugere isso) e a partir de quais materiais.
* **P5.** Reler \[10], \[13], \[18], \[22] na fonte para os números citados de memória.

---

## 11. Histórico de versões

|Versão|Data|Alteração|
|-|-|-|
|v1|2026-10-28|Primeira versão: Etapas 1 a 6; matriz com 56 afirmações auditadas.|
|v1.1|2026-10-28|P3 e P4 respondidas pelo autor: o áudio foi gerado por IA no NotebookLM, a partir dos vídeos do canal @MauricioIssei no YouTube; duração de 19 min 37 s. A conferência da transcrição contra o áudio (resto de P3) continua aberta.|



