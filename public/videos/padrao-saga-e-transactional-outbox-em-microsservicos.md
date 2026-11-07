# Padrão Saga e Transactional Outbox em Microsserviços

Vídeo de Maurício Yokoyama Issei, publicado em 11 de setembro de 2026 (7 min 41 s).
Assistir: https://www.youtube.com/watch?v=Qk8zM-SpbUY

Assuntos: [Especificação e desenvolvimento](https://mauricio.issei.com.br/temas/especificacao-e-desenvolvimento)

## Sobre o vídeo

Garantir a **consistência de dados** entre múltiplos bancos de dados independentes é um dos maiores desafios em arquiteturas de microsserviços, onde transações ACID tradicionais de banco único não podem ser aplicadas diretamente.

Neste vídeo explicativo, exploramos em detalhes como resolver o perigoso problema do **Dual Write** combinando dois dos padrões de arquitetura mais fundamentais do desenvolvimento de software moderno: o **Saga Pattern** e o **Transactional Outbox Pattern**.

---

### 🎯 **O que você vai aprender neste vídeo:**

* **O Problema do Dual Write:** Por que tentar salvar no banco de dados e publicar uma mensagem no message broker (como Apache Kafka) na mesma operação de código falha em produção e gera inconsistências silenciosas.
* **Transactional Outbox Pattern:** Como gravar o evento de domínio em uma tabela de `outbox` na mesma transação local do banco de dados para garantir atomicidade.
* **Change Data Capture (CDC) e Relay:** Como utilizar **Debezium** e **Kafka** (ou rotinas de *polling*) para ler a tabela de outbox e publicar mensagens com garantia de entrega de pelo menos uma vez (*at-least-once delivery*).
* **Saga Pattern e Consistência Eventual:** Como coordenar fluxos de negócios distribuídos através de uma sequência de transações locais para atingir a consistência eventual em substituição ao *Two-Phase Commit* (2PC).
* **Transações Compensatórias:** Como desfazer semanticamente os passos já executados caso ocorra alguma falha no meio do fluxo.
* **Orquestração vs. Coreografia:** A diferença entre coordenar a Saga através de uma **máquina de estados centralizada (Orquestrador)** ou por **reações descentralizadas a eventos (Coreografia)**.
* **Classificação de Passos e Idempotência:** A importância de categorizar passos em **Compensáveis**, **Pivô** e **Repetíveis**, e por que garantir **Idempotência** nos consumidores é indispensável.

---

### ⏱️ **Capítulos / Minutagem do Vídeo:**

* `00:00` - Introdução: O desafio da consistência em microsserviços
* `01:30` - O Problema do Dual Write e falhas em produção
* `04:15` - O que é o Transactional Outbox Pattern?
* `07:40` - Captura de eventos com CDC (Debezium) e Kafka
* `11:10` - Introdução ao Saga Pattern e substituição do 2PC
* `14:35` - Como funcionam as Transações Compensatórias
* `18:00` - Saga Coreografada vs. Saga Orquestrada
* `22:15` - Passos Pivô, Idempotência e Boas Práticas
* `25:00` - Conclusão e Resumo

---

### 🏷️ **Hashtags:**
#Microsservicos #SagaPattern #TransactionalOutbox #SoftwareArchitecture #Kafka #Debezium #SpringBoot #DotNet #DistributedSystems #CleanArchitecture

## Transcrição

_Transcrição automática, não revisada._

[0:00] Fala pessoal, hoje a nossa análise vai mergulhar direto em como e com qual objetivo implementar dois padrões arquiteturais simplesmente geniais para sistemas distribuídos. O padrão saga e o Transactional Outbox. Para quem tá quebrando a cabeça tentando escalar sistemas sem perder dados, essa imersão vai ser um divisor de águas. Vamos lá. Para começar, a gente precisa encarar o elefante na sala. Na era dos mitrosserviços, cada serviço funciona meio que como uma ilha isolada, né? Cada um é com muito orgulho dono do seu próprio banco de dados. E olha, essa separação é fantástica para dar independência para as equipes e escalar o negócio, mas levanta uma questão gigantesca. Como é que a gente mantém a integridade dos dados quando uma única operação de negócio precisa navegar por todas essas ilhas diferentes? É exatamente esse mistério que a gente vai desvendar agora. O nosso roteiro de hoje tá bem direto ao ponto. A gente vai passar por o desafio dos microsserviços, o problema da escrita dupla, padrão saga como coordenador, depois comparar

[1:02] coreografia versus orquestração, entender o padrão transactional outbox e para fechar com chave de ouro, saga e outbox trabalhando juntos. Ponto um, o desafio dos microsserviços. Pensa bem, lá no passado, com aquelas aplicações monolíticas gigantes, tudo ficava muito bem envelopado em uma única transação com garantias adid. Fácil, né? Mas a realidade distribuída de hoje, estilassou tudo isso. Tem especialista que compara a tarefa de sincronizar dados e microsserviços a literalmente tentar pastorear gatos. É um caos. Tentar esticar uma transação S de tradicional através da rede de diferentes bancos de dados é um caminho que leva direto pra loucura. Isso só gera bloqueios no banco e gargalos terríveis. A gente definitivamente precisa de uma abordagem muito mais inteligente do que tentar forçar as regras daquele mundo antigo no nosso mundo novo. E isso nos leva ao ponto dois, o problema da escrita dupla. Esse aqui é o assassino silencioso dos sistemas distribuídos. O problema da escrita dupla acontece quando a aplicação precisa escrever em dois sistemas totalmente separados, tipo

[2:03] salvar um pedido no banco de dados local e logo em seguida publicar um evento no Message Broker. Agora imagina a cena. O banco confirma a gravação bonitinho, mas aí a rede dá aquela oscilada básica e a publicação do evento simplesmente falha. Qual é o resultado? A gente cria um pedido fantasma. Ele existe lá no banco de dados, mas os outros serviços da arquitetura nunca jamais vão ficar sabendo que ele foi criado. Um desastre total. Ponto três, padrão saga, o coordenador. Bom, para resolver isso, entra em cena o nosso primeiro herói, o padrão saga. O ponto crucial aqui é sacar a essência da coisa. Uma saga não tenta de jeito nenhum fazer uma transação global gigantesca. Esquece isso. Ao invés disso, ela pega uma operação massiva e quebra em uma sequência de transações locais bem menores e totalmente independentes. Cada microsserviço faz o seu próprio trabalho no seu próprio banco de dados e aí publicam um evento ou uma mensagem para engatilhar o próximo passo da fila. A mágica toda aqui é que o sistema foca na

[3:04] chamada consistência eventual, ou seja, a gente sabe que as coisas vão ficar consistentes no final, mesmo que não seja exatamente naquele mesmo milissegundo, sabe? Mas claro, e quando algo dá errado no meio do caminho, é exatamente aí que brilham as famosas transações compensatórias. Pensa num fluxo de e-commerce. Digamos que o passo um reserve o estoque do produto com o sucesso. Lindo. Só que no passo dois o pagamento do cartão falha. O que a saga faz? Ela percebe essa falha e dispara imediatamente o passo três, uma operação de desfazer, liberando aquele estoque que tinha sido reservado. Então, ao invés de travar todo o banco de dados esperando o pagamento resolver, o sistema simplesmente avança, falha de um jeito super gracioso e, o mais importante, limpa a própria bagunça, mantendo tudo perfeitamente consistente. Ponto quatro, coreotrafia versus orquestração. Na hora de implementar uma saga, existem duas abordagens que são de verdade fascinantes. A primeira é a coreografia. Imagina uma pista de dança.

[4:06] Os serviços reagem aos movimentos uns dos outros, escutando eventos de forma totalmente descentralizada. Isso é ótimo porque não cria nenhum gargalo central no sistema, mas tem um detalhe, pode virar uma bagunça tremenda se a dança for muito complexa, rolando até aquele risco chato de dependências cíclicas. Já a segunda abordagem é a orquestração. Aqui a gente coloca um maestro no palco, um coordenador central dizendo exatamente quem deve fazer o que e qual momento. Isso traz uma visibilidade absurda do processo inteiro de ponta a ponta. O lado ruim introduz um ponto central de falha. No fim das contas, a escolha entre os dois vai depender puramente do nível de complexidade do negócio que a gente tá mapeando. Ponto cinco, o padrão Transactional Outbox. Olha só, as sagas são incríveis, mas elas dependem de mensagens que sejam 100% confiáveis. É aí que entra o nosso segundo herói arquitetural, o Transactional Outbox, ou como a comunidade gosta de chamar, o carteiro inabalável. O grande segredo aqui é usar

[5:08] o próprio banco de dados relacional como um buffer. Funciona assim, dentro de uma única transação atômica, o serviço escreve os dados do negócio na tabela principal e também escreve o evento numa outbox table. tudo ao mesmo tempo. Como é uma transação atômica, é o esquema de tudo ou nada. Ou ambas as escritas acontecem ou nenhuma acontece. Aquela lacuna super perigosa da escrita dupla que a gente falou antes, ela é completa, literalmente eliminada e o processo não para por aí. Uma vez que o evento tá lá som e salvo na tabela outbox, um processo independente entra em ação. O message relay. Esse componente fica trabalhando de boa em segundo plano. Ele pode ser um worker simples, fazendo polling, verificando a tabela de tempos em tempos ou até uma ferramenta mais avançada de captura de dados de alteração, o famoso CDC, tipo debision. A missão desse processo é ler a tabela e garantir, sem sombra de dúvida, que a mensagem seja entregue ao broker, como achicáfica da vida. Ele garante aquela entrega pelo menos uma vez, varrendo para debaixo do tapete de uma vez por todas qualquer inconsistência de

[6:08] comunicação entre os serviços. Ponto seis, saga e Outbox juntos. Quando a gente junta essas duas peças, fica claro que elas não são concorrentes, mas sim o parquitetural mais perfeito possível. A regra de síntese é muito clara. A saga atua como aquele controlador de tráfego aéreo, né? Ditando a lógica de negócio, decidindo o que precisa acontecer, em qual ordem e como compensar caso qualquer coisinha dê errado. Enquanto isso, o Albox fornece a infraestrutura de tubulação, que é durável e inflexível. É ele quem bate no peito e garante que as ordens emitidas pela saga vão de fato chegar ao destino, não importando quantas falhas de rede aconteçam no meio do caminho. Trabalhando juntos, eles criam sistemas completamente à prova de falhas e com uma consistência eventual na qual a gente pode realmente confiar. O que nos leva àela reflexão final e provocativa depois de tudo que a gente analisou aqui? Quando a gente confia em múltiplas escritas sem a devida coordenação, basicamente a gente tá jogando dados com o sistema. é contar com a sorte. Mas a

[7:09] implementação correta dos padrões Saga e Outbox transforma essa mera esperança arquitetural numa garantia matemática de consistência eventual. Fica aí o convite para reavaliarmos os desenhos dos sistemas atuais. A nossa infraestrutura foi realmente desenhada para suportar o caos ou a sorte é o nosso principal pilar de estabilidade hoje em dia? Bom, foi sensacional explorar esses conceitos todos com a profundidade que eles merecem. Um abraço e até a nossa próxima análise.
