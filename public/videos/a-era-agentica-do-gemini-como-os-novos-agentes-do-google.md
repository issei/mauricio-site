# A Era Agêntica do Gemini: Como os Novos Agentes do Google Cloud Vão Transformar o Trabalho

Vídeo de Maurício Yokoyama Issei, publicado em 10 de outubro de 2026 (7 min 56 s).
Assistir: https://www.youtube.com/watch?v=hub4sB4yYss

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

**O trabalho agora começa na janela de prompt!** Neste vídeo explicativo, analisamos detalhadamente o lançamento do **Gemini Agent** no evento *Gemini at Work 2026*, mostrando como o Google Cloud está liderando a transição para a era dos **agentes autônomos corporativos**.

Entenda a evolução do Vertex AI para a **Gemini Enterprise Agent Platform**, uma infraestrutura unificada desenvolvida para construir, escalar, governar e otimizar agentes capazes de executar tarefas complexas com total segurança e controle empresarial.

---

💡 **O que você vai aprender neste vídeo:**

• **O Novo Gemini Agent:** Como funciona o agente universal de trabalho que planeja, executa código, gerencia arquivos e conecta sistemas a partir de um único prompt.  
• **Gemini Enterprise Agent Platform:** A evolução do Vertex AI trazendo o **Agent Studio** (canvas low-code), o **Agent Development Kit (ADK)** e o **RAG Engine** para conectar dados corporativos privados.  
• **Memória Persistente e Orquestração:** O papel do **Memory Bank** e do **Agent Runtime** para manter contexto de longo prazo em fluxos de trabalho de múltiplos dias.  
• **Governança e Segurança Rigorosa:** Como o **Agent Sandbox** isolado no nível de SO e o **Agent Gateway** garantem controle de acesso, auditoria e firewall contra vazamento de dados.  
• **Integração no Google Workspace:** O Gemini atuando de forma *inline* no Gmail, Drive, Docs, Sheets e Slides, inclusive como colega de equipe autônomo (*coworker agent*).  
• **Controle Financeiro de Custos:** A otimização de orçamentos com **Smart Routing** e teto de gastos em tempo real (*spend caps*).  

---

⏱️ **Capítulos do Vídeo:**  
00:00 - Introdução: Bem-vindo à Era Agêntica  
01:15 - O que é o Gemini Agent? (Anúncio Gemini at Work)  
03:10 - Gemini Enterprise Agent Platform (A Evolução do Vertex AI)  
05:20 - Ferramentas de Desenvolvimento: ADK, Agent Studio & RAG Engine  
07:35 - Execução Segura: Agent Sandbox, Gateway & Governança  
09:25 - Gemini no Google Workspace (Assistente Pessoal & Coworker Agent)  
11:00 - Controle de Custos e Roteamento Multimodelo  
12:15 - Conclusão e O Futuro dos Agentes  

---

🔗 **Fontes Oficiais e Documentação:**  
• Google Cloud Blog – Gemini at Work 2026  : https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026
• Documentação da Gemini Enterprise Agent Platform  : https://docs.cloud.google.com/gemini-enterprise-agent-platform?hl=pt-br
• Google AI for Developers – Gemini API Agents Overview  : https://ai.google.dev/gemini-api/docs/agents?hl=pt-br

---

🏷️ **Hashtags:**  
#GoogleCloud #Gemini #AIAgents #InteligenciaArtificial #GeminiAgent #GoogleWorkspace #Tecnologia #Inovacao

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olá, pessoal. Boas-vindas a esta nossa análise, onde a gente vai mergulhar de cabeça numa mudança que, honestamente, tá virando mundo da tecnologia de cabeça para baixo. A gente tá saindo daquela era da IA puramente conversacional, sabe, do formato de chat para entrar de vez no mundo da IA autônoma e agêntica usando o Gemini. A ideia aqui hoje é entender passo a passo como essa tecnologia deixou de ser só um oráculo que responde perguntas para se tornar um verdadeiro motor de execução. Para começar, pensem nessa pergunta. O que acontece quando a IA para de só dar respostas e começa de fato a colocar a mão na massa? Porque, olha só, a partir deste marco de outubro de 2026, a inteligência artificial deixou de ser só uma ferramenta de texto. Ela tá virando uma força de trabalho de verdade, tomando iniciativas e executando tarefas super complexas em nome de quem a gerencia. É uma virada de chave gigantesca, sem exagero. Bom, vamos lá. Sessão um, a ascensão dos agentes de IA.

[1:02] Essa mudança central é simplesmente fascinante. Pensem no modelo tradicional. A gente precisava ficar ali dando comandos constantes, a famosa engenharia de prompts, né, guiando a IA o tempo todo. Agora, com a IA agêntica, o esquema é delegar objetivos amplos. É só definir a meta, dar um passo para trás e deixar o raciocínio autônomo fazer o trabalho pesado. Aí a lida com várias etapas lógicas, sem precisar que nenhum humano fique ali segurando a mão dela. E aqui tá o ponto crucial. Um agente de Mini não é mais um modelo de linguagem solto por aí, é um sistema unificado, totalmente integrado. Ele planeja o que vai fazer, acessa ferramentas externas, se conecta aos sistemas da empresa, entende todo o contexto e no fim das contas entrega um produto pronto e bem acabado. Basicamente é a passagem daquela assistência passiva para uma ação totalmente proativa. Entrando agora na sessão dois, construindo a base agêntica. Toda a mágica de um agente gerenciado do Gemini acontece dentro de

[2:02] uma coisa chamada Sandbox. E por que isso é tão legal? Com uma única chamada de API, o sistema cria um ambiente Linux super seguro e isolado, direto no nível do sistema operacional. Lá dentro, o agente tá livre para escrever e testar códigos, navegar na internet, gerenciar arquivos. Tudo isso rodando em modelos de ponta, tipo o novo Gemini 3.8 Flash, que tem uma velocidade de raciocínio que é um absurdo de rápida. O que eu acho muito interessante aqui é que não existe uma prisão a um único jeito de construir. Tem uma flexibilidade enorme. Dá para usar vários frameworks de código aberto, dependendo do que o projeto exige. Pode ser o LRAPF para aqueles fluxos de trabalho super complexos, o Crew AI para botar vários agentes para colaborar entre si ou o Yama Index, que é ótimo para conectar a inteligência aos dados internos e privados da empresa. Ou seja, a base tecnológica é que se adapta ao problema e não o contrário. Independentemente do framework escolhido, o coração do agente funciona num ciclo contínuo. Uma simples

[3:02] interação aciona exatamente esse loop de raciocínio. Primeiro, o agente entende o que foi pedido, depois bola um plano e escolhe as ferramentas. Em seguida, age por conta própria e no fim sintetiza a resposta. E um detalhe impressionante, enquanto a gente tá focado numa tarefa complexa, esse processo pode consumir facilmente entre 100.000 1 3 milhões de tokens. É muito, mas muito poder de processamento rolando de uma vez só. Avançando paraa sessão três, escalando com segurança para empresas. Quando a gente fala de grandes empresas, segurança é tudo, né? A plataforma precisa responder a perguntas cruciais. Quem é esse agente? O que ele pode tocar? E onde as ações dele estão sendo registradas? Por isso, cada agente recebe uma identidade única e criptografada, seguindo sempre a regra do menor privilégio possível. Fora isso, todo o tráfego passa por um agent gateway, que é basicamente um firewall feito sob medida para redes de IA, garantindo que as regras da empresa sejam respeitadas milissegundo a milissegundo. E nos bastidores, a

[4:03] infraestrutura de hardware dá um show à parte. O novo sistema TPU8i consegue entregar um custo benefício 80% melhor em comparação com as gerações anteriores. É justamente essa eficiência colossal que torna financeiramente viável rodar todas essas cargas de trabalho corporativas super densas em grande escala. Claro, deixar loops contínuos rodando num modelo massivo e premium acabaria com qualquer orçamento num piscar de olhos. É por isso que a plataforma já vem com salvaguardas financeiras importantíssimas. Tem o roteamento inteligente, que manda a tarefa certa pro modelo do tamanho certo e os limites de gastos que bloqueiam qualquer surpresa na conta em tempo real. Além disso, os custos de processamento por token despencaram inacreditáveis 98% desde 2024. Isso muda o jogo paraa implantação de área. Seguindo pra sessão quatro, a IA no ambiente de trabalho. A mudança de paradigma aqui é não ver a IA só como um software escondido no computador, mas sim como verdadeiros colegas de trabalho digitais. Imaginem só, dá para mencionar

[5:05] um agente num chat corporativo usando o ar, colocar ele num convite de reunião no calendário, eles começam a agir de forma contínua, com uma identidade super clara e definida ali junto com o resto da equipe. Sabem aquela frustração de ter que repetir a mesma coisa 1 vezes para? Pois é, isso acabou. Quando um agente é integrado, ele passa a usar quatro tipos de memória. O que isso significa na prática? que ele retém o contexto da empresa, lembra passo a passo de como fazer tarefas recorrentes e entende todo o fluxo de trabalho histórico. Fica muito mais fluido sem precisar reexplicar as regras do negócio toda santa vez. E isso nos leva a essa citação que resume bem a coisa toda. Garantir a confiança na precisão e na qualidade de cada insite gerado é a regra de ouro. É por isso que ferramentas como o catálogo de conhecimento são essenciais. Elas mapeiam as definições do negócio de uma vez por todas. Em vez do agente ficar tentando adivinhar termos internos, ele gera respostas super consistentes, factuais e totalmente ancoradas nos

[6:05] dados reais da empresa. E para fechar, sessão cinco, o impacto real dos agentes. A gente já consegue ver essa tecnologia transformando desde operadoras de telefonia até bancos globais e gigantes do varejo. Tem agentes resolvendo falhas complexas de rede em tempo real, detectando fraudes para cancelar pagamentos suspeitos instantaneamente. Eles destravam gargalos operacionais numa velocidade absurda. E o mais legal, isso libera as pessoas para focarem no que realmente importa, aquele trabalho mais criativo, consultivo e de altíssimo valor. E falando em escala, olha só, 10.000. Esse é o número impressionante de agentes de IA personalizados que a Sompo, uma seguradora gigante lá do Japão, criou para ajudar seus 34.000 funcionários. Com a infraestrutura nova, eles conseguiram derrubar o tempo de desenvolvimento de um modelo especializado de uma semana inteira para um único dia. É um salto de agilidade que impressiona qualquer um. E se alguém acha que a Ia agêntica tá presa só aos

[7:06] nossos computadores aqui embaixo, olha isso. Ela já chegou literalmente ao espaço. Modelos super otimizados estão rodando agora mesmo a bordo de um satélite da NASA. Eles analisam imagens da Terra ao vivo e mandam resumos cruciais de volta para as equipes na base. Isso com certeza redefine tudo que a gente entendia sobre limites de processamento. Então fica aqui essa reflexão provocativa pra gente encerrar a nossa análise, porque a era agêntica não é só sobre acelerar as coisas ou economizar umas horinhas na semana, é sobre repensar a própria base do que as nossas organizações conseguem realizar quando a execução em escala deixa de ser um problema. Muito obrigado por acompanharem essa explicação e que a gente continue explorando as possibilidades infinitas dessa nova fronteira. Não.
