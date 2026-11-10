# A Confiabilidade do Sistema

Vídeo de Maurício Yokoyama Issei, publicado em 31 de outubro de 2025 (7 min 28 s).
Assistir: https://www.youtube.com/watch?v=E4yTCqkyeh4

Assuntos: [Cloud e confiabilidade](https://mauricio.issei.com.br/temas/cloud-e-confiabilidade)

## Sobre o vídeo

### **Confiabilidade em TI e Sistemas Críticos**

A **confiabilidade** não é um luxo, é a base da produtividade e da sobrevivência de qualquer empresa na Era da Informação. 🚀

Neste guia completo, você vai mergulhar nas **boas práticas** essenciais para blindar sua infraestrutura, operação e gerenciamento de serviços de TI, focando em sistemas que não podem parar.

**O que você vai aprender:**

#### **1. O Pilar da Confiança e a Qualidade de Software**

  * Entenda por que a confiabilidade é uma qualidade indispensável em sistemas críticos e como ela está intimamente ligada ao custo.
  * A visão da **ISO/IEC 25010**: A confiabilidade como um dos 8 atributos essenciais da qualidade de software, ao lado de segurança e adequação funcional.
  * Por que **100% de confiabilidade é a meta errada** (e até impossível) e como a disponibilidade deve ser calculada por interações bem-sucedidas.

#### **2. Métricas-Chave para a Disponibilidade**

Aprenda a melhorar a disponibilidade do seu serviço focando nos fatores certos:

  * **Aumentar o MTBF** (Tempo Médio Entre Falhas).
  * **Diminuir o MTTD** (Tempo Médio de Detecção de Falhas).
  * **Diminuir o MTTR** (Tempo Médio de Reparo).
  * A importância dos **KPIs (Indicadores Chaves de Desempenho)** para guiar a gestão e a competitividade.

#### **3. Site Reliability Engineering (SRE) na Prática**

O SRE (Engenharia de Confiabilidade de Sites) integra engenharia de software e operações para entregar serviços mais eficientes.

  * **SLOs (Objetivos de Nível de Serviço):** Defina metas numéricas de disponibilidade alinhadas à experiência real do usuário.
  * **Orçamento de Erro (Error Budget):** Use este conceito para gerenciar o risco, permitindo a implementação de inovações e mudanças de forma segura.

#### **4. Gerenciamento de Incidentes e Postmortems**

  * As etapas estruturadas do **Gerenciamento de Incidentes Graves (MIM):** Identificação, Contenção, Resolução e Manutenção.
  * O poder dos **Postmortems Sem Culpa (*Blameless Postmortems*):** Foque em causas sistêmicas e correções de processo, assumindo que todos agiram com a melhor intenção.

#### **5. Ferramentas de Análise de Falhas e Melhoria Contínua**

Explore as metodologias para encontrar a causa raiz e planejar a melhoria:

  * **FMEA** (Análise de Modos de Falhas e Efeitos).
  * **Análise dos 5 Porquês** e **Diagrama de Ishikawa**.
  * **Matriz GUT** (Gravidade, Urgência e Tendência) para priorização.
  * Estratégias de Manutenção: **RCM** (Centrada na Confiabilidade) e **CBM** (Baseada na Condição/Preditiva).
  * **DMAIC** e **GQM** para estruturar a implementação de KPIs e planos de melhoria.

Se você é SRE, DevOps, Gerente de TI ou atua com sistemas críticos, este vídeo é essencial para elevar o nível de confiabilidade do seu serviço\!

👍 **Deixe seu Like, Comente e Inscreva-se no canal para não perder os próximos conteúdos sobre Resiliência em TI\!**

-----

### **📚 Referências e Fontes Consultadas:**

  * [ISO 25000](https://iso25000.com)
  * [Google Cloud Blog - SRE Error Budgets](https://cloud.google.com/blog/products/management-tools/sre-error-budgets-and-maintenance-windows)
  * [DevOps.com - Netflix Simian Army](https://devops.com/netflix-the-simian-army-and-the-culture-of-freedom-and-responsibility)
  * [IBM - Site Reliability Engineering](https://www.ibm.com/br-pt/topics/site-reliability-engineering)
  * [IBM - Observability Basics](https://www.ibm.com/br-pt/resources/automate/observability-basics)
  * [Splunk - Observability vs Monitoring vs Telemetry](https://www.splunk.com/en_us/blog/learn/observability-vs-monitoring-vs-telemetry.html)
  * [SoftServe - Assess DevOps Structure](https://www.softserveinc.com/en-us/blog/assess-devops-structure-through-calms)
  * [Red Hat - What is SRE](https://www.redhat.com/pt-br/topics/devops/what-is-sre)
  * [Blameless - What are Blameless Postmortems](https://www.blameless.com/blog/what-are-blameless-postmortems-do-they-work-how)
  * [DevOps.com - Observability vs Monitoring](https://devops.com/observability-vs-monitoring-whats-the-difference/)
  * [OPServices - Telemetria](https://www.opservices.com.br/telemetria/)
  * [SRE Google Workbook - Incident Response](https://sre.google/workbook/incident-response/)
  * [O'Reilly - Taming Chaos](https://www.oreilly.com/content/taming-chaos-preparing-for-your-next-incident/)
  * [Google Cloud Blog - Lowe's Improved Incident Response](https://cloud.google.com/blog/products/devops-sre/how-lowes-improved-incident-response-processes-with-sre)
  * [Google Cloud Blog - Shrinking the Impact of Production Incidents](https://cloud.google.com/blog/products/devops-sre/shrinking-the-impact-of-produ ction-incidents-using-sre-principles-cre-life-lessons)

-----

### **\#Tags**

`#ConfiabilidadeTI #SRE #SiteReliabilityEngineering #DevOps #SistemasCriticos #MTTR #MTBF #SLO #ErrorBudget #BlamelessPostmortem #GerenciamentoDeIncidentes #ManutencaoPreditiva #RCM #ISO25010`

## Transcrição

_Transcrição automática, não revisada._

[0:00] Das máquinas que produzem tudo que a gente consome até os aplicativos que não saem da nossa mão. A nossa vida hoje em dia depende de sistemas que simplesmente funcionam. Mas já parou para pensar o que de fato faz um sistema ser confiável? Como é que a gente garante que, sei lá, de um parafuso de verdade até uma linha de código, tudo vai continuar operando direitinho? Hoje a gente vai mergulhar fundo no que significa confiabilidade de verdade. Beleza? Então vamos lá. O nosso roteiro de hoje vai ser o seguinte. Primeiro a gente entende o que é confiabilidade na essência. Depois vamos ver como medir isso, como construir sistemas que aguentam o tranco, o que fazer quando a crise aperta e o mais importante, como a gente aprende com cada erro. Então, para começar, vamos alinhar as coisas. O que que a palavra confiabilidade quer dizer quando a gente fala de engenharia, de tecnologia? Olha, é bem mais do que simplesmente dizer que algo tá funcionando. A definição clássica que

[1:00] vem lá da engenharia industrial é super precisa. Repara só, é uma probabilidade. A ideia é prever como um componente físico se comporta com o tempo. Pensa numa peça de máquina que com o uso vai se desgastando e uma hora quebra. É um cálculo baseado em durabilidade, em algo físico. Só que software, bom, software é outra história. Uma linha de código não enferruja, não se desgasta. As falhas em software vem de bugs, de erros de lógica que estavam ali desde o começo. E aqui a diferença é brutal. Enquanto a falha de hardware é mais previsível, o que a gente chama de borbug, o software é famoso pelos Heisenbugs. Pensa neles como se fossem fantasmas no sistema. São falhas que só aparecem em condições super específicas. E na hora que a gente tenta olhar para consertar, elas somem. Isso faz com que gerenciar confiabilidade de software seja um desafio único, completamente diferente. E o peso de uma falha dessas é gigante. Não é só um problema técnico, não. Quando um software importante para de

[2:01] funcionar, o impacto financeiro e na reputação de uma empresa pode ser devastador. Como essa estatística mostra, cada minuto fora do ar custa muito, mas muito dinheiro. Bom, vamos em frente, porque se a gente não consegue medir uma coisa, não dá para melhorar, certo? Então, como é que a gente transforma um conceito meio abstrato como confiabilidade em números, em algo concreto que a gente possa acompanhar e, claro, melhorar? O ponto de partida é definir objetivos claros e acompanhar eles com os famosos KPI, os indicadores chave de desempenho. Como dá para ver nessa tabela, para cada objetivo, seja qualidade ou velocidade, existem métricas específicas. E para confiabilidade, uma das mais importantes de todas é justamente o tempo médio entre falhas. Para entender a confiabilidade de verdade, a gente precisa olhar para três métricas principais. A primeira é o MTBF, o tempo médio entre falhas, que basicamente nos diz com que frequência o sistema quebra. Mas a frequência não é tudo tão importante quanto é o MTTD, que é o

[3:02] tempo que a gente leva para perceber a falha, e o MTTR, o tempo para consertar. A verdadeira força de um sistema muitas vezes está na rapidez com que ele se recupera, ou seja, em deixar esses dois últimos tempos o menor possível. Agora, olha que interessante esse slide. Ele mostra como esses Kpis revelam problemas reales na prática. Num caso de uma empresa de software, eles foram medir a capacidade do time de suporte. E o gráfico deixou bem claro. Mês após mês, chegavam mais chamados do que o time conseguia resolver. Isso é um baita sinal de alerta de que a demanda tá superando a capacidade. Um problema que sem essa medição só ia virar uma bola de neve. Medir o problema é metade do caminho. A outra metade é projetar sistemas que já nascem esperando por falhas, que são construídos para sobreviver a elas. A questão não é evitar falhas a todo custo, mas sim resistir quando elas acontecerem. E o princípio por trás disso é a tolerância a falhas. A ideia é bem simples. A gente para de buscar a perfeição e assume que as partes individuais do sistema vão

[4:04] falhar em algum momento. O sistema como um todo, no entanto, precisa continuar de pé. A estratégia mais comum para conseguir isso, redundância. É exatamente como ter um step no carro. a gente duplica os componentes mais importantes e se um deles falhar, o sistema automaticamente aciona a peça reserva, muitas vezes sem que ninguém nem perceba que algo deu errado. Mas resiliência não é só ter cópias de segurança, é ter uma arquitetura inteligente. Estão aqui três estratégias cruciais. A primeira é o isolamento de falhas, que é como conter uma explosão, evitando que um erro pequeno derrube o sistema inteiro. Depois, a estabilidade estática, que garante que o sistema continue rodando, mesmo que de forma lilitada, se uma parte falhar. E por fim, os rollbacks, que é tipo um botão de desfazer para voltar rapidamente para uma versão anterior que estava funcionando bem. Essencial, mas a gente sabe, né? Mesmo com o melhor planejamento do mundo, incidentes graves acontecem. E aí, qual é o plano de ação para quando a casa cai de verdade? O

[5:05] caos não pode ser uma opção. Uma resposta organizada é tudo. Um bom gerenciamento de incidente segue quatro estágios bem claros para colocar ordem no caos. começa com a identificação rápida do problema, passa pela contenção para diminuir o estrago, depois vem a resolução definitiva e, por fim, o monitoramento para ter certeza de que o problema não vai voltar. E no meio de uma crise, se comunicar de forma clara e constante é tão, mas tão importante quanto a solução técnica. É preciso avisar os times certos, manter a gestão informada, notificar outros departamentos que possam ser impactados e, fundamental, se comunicar de forma transparente com quem usa o sistema. OK, o incidente passou, mas o trabalho ainda não acabou. As organizações mais confiáveis do mundo são aquelas que olham para cada falha não como um desastre, mas como uma chance de aprender. É o que a gente chama de cultura de postmem sem culpa. O primeiro passo é investigar a causa raiz. Ferramentas como diagrama de esticaa,

[6:06] esse da imagem que parece uma espinha de peixe, ajudam a gente a ir além do sintoma óbvio. Outra técnica muito poderosa é a dos cinco porquês, que é literalmente perguntar por cinco vezes ou quantas forem necessárias até chegar na origem do problema, sempre focando no processo e não em achar culpados. Beleza? Identificar as causas é o primeiro passo, mas como a gente garante que essa análise vira uma melhoria de verdade e não só mais um relatório que vai parar numa gaveta qualquer? A resposta tem usar metodologias estruturadas como The Mike. Ele nos dá um passo a passo, um ciclo que não para. Primeiro a gente define o problema, depois mede os dados, aí analisa para achar a causa raiz. Com base nisso, a gente implementa uma melhoria que em inglês é improve. E por fim, a gente controla o processo para garantir que a mudança pegou. É assim que a gente transforma o aprendizado em ação de verdade. No fim das contas, confiabilidade não é buscar a ausência total de falhas. Isso é impossível. É

[7:07] sobre construir sistemas resilientes que aguentam as pancadas e, mais importante ainda, uma cultura resiliente que aprende e fica mais forte a cada erro. A questão nunca é se algo vai falhar, mas sim como a gente vai responder e melhorar quando isso inevitavelmente acontecer.
