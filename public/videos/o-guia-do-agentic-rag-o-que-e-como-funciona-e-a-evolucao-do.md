# O Guia do Agentic RAG: O que é, Como Funciona e a Evolução do RAG Tradicional

Vídeo de Maurício Yokoyama Issei, publicado em 26 de agosto de 2026 (9 min 28 s).
Assistir: https://www.youtube.com/watch?v=n089OV1W2Dg

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Dados e decisão](https://mauricio.issei.com.br/temas/dados-e-decisao)

## Sobre o vídeo

Neste vídeo, apresentamos um guia completo sobre o **Agentic RAG**, a nova fronteira na engenharia de dados e sistemas de busca auxiliados por Inteligência Artificial. 

Se você já conhece o **RAG Tradicional (Retrieval-Augmented Generation)**, sabe que ele resolve o problema de atualização das bases de conhecimento dos LLMs. No entanto, o RAG clássico opera sob um fluxo rígido e estático de "recuperar e gerar". O **Agentic RAG** muda esse paradigma ao transformar o processo de busca em uma sequência de decisões ativas, onde o modelo de linguagem atua como um agente autônomo. 

Esses sistemas inteligentes utilizam padrões avançados como **planejamento, uso de ferramentas, reflexão e colaboração multiagente** para decidir de forma dinâmica como, quando e onde buscar as informações necessárias para resolver problemas complexos de múltiplas etapas.

---

### 🔍 O que você vai aprender neste vídeo:
* **As Limitações do RAG Tradicional:** Por que sistemas lineares sofrem com sobrecarga de contexto e falta de mecanismos de autocorreção.
* **Arquitetura Modular:** Conheça as engrenagens por trás do sistema — o Planejador (Planner), o Motor de Recuperação (Retrieval Engine), o Motor de Raciocínio (Controller) e os Sistemas de Memória.
* **Padrões de Fluxo de Trabalho (Workflows):** Como o encadeamento de prompts (Prompt Chaining), roteamento dinâmico e arquiteturas corretivas (Corrective RAG) garantem respostas mais precisas e evitam alucinações.
* **Aplicações de Impacto Real:** Como essa evolução está transformando setores de alta complexidade como saúde, finanças, análise de contratos jurídicos e suporte personalizado ao cliente.

---

### 📚 Referências Científicas & Fontes:

O conteúdo deste vídeo é totalmente fundamentado nas principais pesquisas e levantamentos acadêmicos sobre sistemas agênticos e recuperação de informação:

1. **Data-Centric Perspectives on Agentic Retrieval-Augmented Generation: A Survey**
   * *Foco:* Análise profunda do ciclo de vida dos dados em sistemas agênticos.
   * *PDF:* https://aclanthology.org/2026.findings-acl.78.pdf

2. **Retrieval-Augmented Generation for Large Language Models: A Survey**
   * *Foco:* A evolução histórica dos paradigmas RAG (do Naive ao Modular RAG).
   * *PDF:* https://arxiv.org/pdf/2312.10997

3. **Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG**
   * *Foco:* Taxonomia das arquiteturas de agentes e padrões de colaboração multiagente.
   * *PDF:* https://arxiv.org/pdf/2501.09136

4. **SoK: Agentic Retrieval-Augmented Generation (RAG): Taxonomy, Architectures, Evaluation, and Research Directions**
   * *Foco:* Sistematização do conhecimento sob a perspectiva de processos de decisão sequencial (POMDP).
   * *PDF:* https://arxiv.org/pdf/2603.07379

5. **Você sabe a diferença entre RAG e Agentic RAG?**
   * *Foco:* Introdução prática e didática sobre a transição do paradigma clássico para o agêntico.
   * *Link:* https://elisaterumi.substack.com/p/voce-sabe-a-diferenca-entre-rag-e

---

Se este conteúdo ajudou você a compreender a evolução e o futuro das arquiteturas de Inteligência Artificial, **compartilhe este vídeo** com seus colegas desenvolvedores, pesquisadores ou qualquer pessoa interessada em tecnologia e agentes inteligentes!

#AgenticRAG #RetrievalAugmentedGeneration #InteligenciaArtificial #AIAgents #LLM #DeepResearch #MachineLearning #AIAgent #DataCentricAI #DynamicRetrieval

## Transcrição

_Transcrição automática, não revisada._

[0:00] Boas-vindas a mais uma análise. Hoje a gente vai mergulhar numa transformação que tá literalmente virando o mundo da inteligência artificial de cabeça para baixo. Por muito tempo, os grandes modelos de linguagem operavam como aqueles alunos brilhantes, só que totalmente passivos, sabe? Eles ficavam limitados ao que tinham memorizado lá no passado durante o treinamento. Mas olha só, agora a gente tá no meio de uma revolução. Aí tá deixando de ser uma enciclopédia estática para se transformar numa pesquisadora autônoma, superativa. Então, bora entender como essas novas mentes artificiais estão sendo construídas do zero. O nosso roteiro de hoje passa por seis etapas bem diretas. Primeiro, consertar o limite de memória da IA. Dois, a chegada do Agentic. Três, como esses sistemas agênticos pensam. Quatro, o problema da escassez de dados. Cinco, a curadoria de dados para agentes. E, por fim, o futuro dos agentes. Parte um. Consertando o limite de memória da IA. Como ir além do treinamento original. O calcanhar de

[1:01] Aquiles das Iás sempre foi depender só daqueles dados estáticos. Afinal, o conhecimento humano avança todo santo dia, né? Um modelo congelado no tempo começa a entregar fatos desatualizados muito rápido. Ou pior, ele sofre alucinações e começa a inventar respostas com uma confiança absurda. Para resolver isso, a primeira grande sacada da indústria foi o Hag, a geração aumentada por recuperação. Pensa num gênio trancado numa sala só com livros de 3 anos atrás. O HAG é basicamente dar para esse gênio um computador com internet liberada em tempo real. Em vez de inventar uma resposta de cabeça, a IA consulta bancos de dados externos antes de sequer formular a primeira palavra. Só que tem um detalhe, o Heg tradicional é super engessado. É uma linha de montagem clássica. A pergunta entra, o sistema faz uma busca direta por documentos num banco de dados, empacota tudo, joga na mão da IA e sai a resposta. Funciona. Funciona super bem para tarefas diretas. Se a ideia é vasculhar um manual de 1000 páginas para achar a política de férias da empresa, o reg clássico tira de letra. Mas a vida

[2:03] real e os problemas complexos do dia a dia, bom, eles não são nada previsíveis como manual corporativo. Parte dois, a chegada do agente a IG, o desafio de decidir como, quando e onde buscar. Conforme as coisas foram ficando mais difíceis, exigindo raciocínio lógico em várias etapas, continhas matemáticas e cruzamento de um monte de fontes diferentes, aquela rotina rígida do Hag começou a falhar feio. E isso nos traz a uma frase que resume perfeitamente a virada de chave do mercado. O maior problema do Hag não é a busca, é a decisão. Olha a magnitude disso. Achar um texto num banco de dados não é mais o gargalo. O desafio colossal agora é ensinar a máquina a tomar decisões executivas. A IA precisa saber exatamente quando pesquisar, qual ferramenta usar e, principalmente, ter a clareza de perceber quando a informação que ela achou não é suficiente para fechar a resposta. Quando a gente compara essas arquiteturas, a evolução grita aos olhos. De um lado, aquela via de mão única, entra pergunta, busca

[3:04] contexto, sai texto. Previsível e bem limitado. Do outro lado, oentic entra em cena não como um entregador de informações, mas como um baita gerente de projetos. O agente principal passa a interagir dinamicamente com a web para buscar fatos em tempo real. Usa bancos de dados SQL para pegar números de vendas e até roda código em Python para não errar conta de matemática. A busca por informação deixa de ser um evento isolado e vira um ecossistema super vibrante e interativo. Parte três, como os sistemas agênticos pensam. Bem-vindos à era do planejamento contínuo. Para esse dinamismo todo funcionar, o sistema abandona aquele papel chato de gerador de texto e veste a camisa de estrategista. Imaginem a seguinte situação. Alguém pede para comparar o faturamento de duas empresas concorrentes num triestre específico, já ajustado pela inflação. Um agente não tenta cusp tudo de uma vez. Ele decompõe a tarefa. Primeiro aciona uma API financeira para checar o lucro da primeira empresa. Depois faz o mesmo pra segunda. Os números vieram em moedas

[4:05] diferentes sem problema. Ele usa uma ferramenta para converter. E a mágica de verdade mora na autoavaliação. Depois de cada passo, o agente pensa: "Isso que eu achei faz sentido? Tá faltando algo. Se der erro, ele recalcula a rota e faz novas buscas até ter tudo certinho. É raciocínio puro em tempo real. Parte quatro. O problema da escassez de dados. O grande desafio do treinamento avançado. Toda essa autonomia incrível chegou com um boleto alto para pagar. Um apagão absurdo de dados de treinamento. Pro Hag tradicional o processo era fácil. Era só engolir bilhões de páginas da internet e aprender a ligar a pergunta A ao texto B. Só que um agente não aprende a fazer planejamentos complexos lendo a Wikipédia, concorda? Ele precisa de cicatrizes, precisa de rastro de tentativas, erros e correções de rota. Ele precisa ver como os humanos ou outras inteligências usaram ferramentas de forma interativa. E adivinhem? Dados que mostram como raciocinar em múltiplas etapas são raríssimos. Fabricar isso em larga escala virou uma ciência totalmente

[5:06] nova. Parte cinco. Curadoria de dados. Construindo mentes sintéticas. Para resolver esse gargalo de dados, os pesquisadores criaram que a gente pode chamar de verdadeiras refinarias de conhecimento. É um pipeline contínuo e bem placável. Começa lá na coleta dos dados originais, aí entra a parte criativa, gerar tarefas sintéticas que sejam realmente desafiadoras, mas o controle de qualidade pesadão mesmo acontece no final. Então, uma etapa de verificação quase paranoica para garantir que a lógica tá perfeita, seguido de um refinamento que lapida tudo e corta o ruído. O que sobra no final da esteira é puro ouro digital. São trajetórias de raciocínio impecáveis, prontinhas para treinar a próxima geração de agentes. Acredite, se quiser, a regra de ouro na hora de gerar essas tarefas sintéticas é a sabotagem intencional. É sério, se o treinamento for fácil demais, o modelo fica preguiçoso e decora atalhos em vez de aprender a pensar. Então, o pessoal de dados aumenta propositalmente a complexidade, forçando a IA fazer

[6:07] planejamentos super longos. Eles também adicionam incerteza, tipo escondendo uma informação chave para construir músculos de investigação. E, por fim, exige um conhecimento super especializado. Tudo isso serve para atacar de frente o vício que a máquina tem de só memorizar as respostas. Mas aí vem a grande ironia, né? A gente tá usando ias super potentes para criar os labirintos que vão treinar IAS menores. Só que se essas IS potentes também alucinam, como a gente impede que invenções malucas contaminem a base de treino? A defesa entra em campo na fase de verificação com uma técnica fantástica chamada cadeia de verificação. Funciona assim, o sistema obriga a IA a duvidar sistematicamente de si mesma, criando um checklist passo a passo das evidências antes de cravar uma resposta. Além disso, rolam métricas super rígidas para cruzar os resultados de vários modelos e até auditores humanos, criando um filtro praticamente impenetrável contra mentiras algorítmicas. Depois de verificar tudo, a parada final é o refinamento. E estar correto não é suficiente aqui, tá? Os

[7:07] problemas têm que parecer com a vida real, exigindo um banho de loja linguístico para soarem supernaturais. Atalhos e truquezinhos estatísticos são deletados sumariamente para Iá não roubar no jogo. Mas a sacada de mestre dessa fase é deletar o tal do pensamento excessivo. Modelos de linguagem costumam falar demais. Às vezes eles testam silenciosamente cinco caminhos errados até achar o certo, o que é muito ineficiente. Se a gente passar essa sujeira pra frente, o novo modelo vai ser lento e gastar muita energia. Então, o refinamento poda brutalmente essa enrolação toda, ensinando que ir direto ao ponto vale tanto quanto acertar a resposta. Parte seis, o futuro dos agentes. Qual é a próxima fronteira do raciocínio computacional? O que a gente tem hoje já é um ecossistema formudável, mas ainda tem bastante pedra nesse caminho. Por exemplo, tem um problema bizarro onde a IA usa uma lógica completamente sem sentido nos bastidores, mas por pura sorte matemática, ela chega na resposta certa. Imagina dor de cabeça para consertar isso no treinamento. Tem também um

[8:08] problema de usar Iás como juízes de outras IA, o que acaba introduzindo o viés da própria máquina na pontuação dos testes. Porém, a maior muralha ser derrubada hoje é a falta de memória persistente. Atualmente, as IAs sofrem de amnésia crônica. Acabou a tarefa, a memória reseta. O santo grau da engenharia hoje é criar sistemas com memórias de longo prazo, onde o que a IA aprendeu na segunda-feira seja usado organicamente para resolver um baita problema na sexta-feira. Isso tudo nos leva à reflexão final da nossa análise. Aquela época em que acessar um banco de dados era só um puxadinho para ajudar a memória da IA. Bom, isso acabou. Hoje, a busca dinâmica, a filtragem e a insistência já são o próprio processo de raciocínio autônomo. Se um sistema sintético agora é capaz de bolar estratégias, achar falhas no próprio conhecimento e voltar pro campo de busca várias vezes de forma totalmente independente, a pergunta não é mais sobre o tamanho do banco de dados que ele processa. A verdadeira questão que fica é até onde essa curiosidade

[9:09] autônoma recém desperta vai nos levar quando esses agentes simplesmente nunca mais precisarem parar de pesquisar. Fica aí a reflexão. Muito obrigado por acompanhar essa análise do Agent Crag com a gente. Continuem questionando o futuro e até a próxima.
