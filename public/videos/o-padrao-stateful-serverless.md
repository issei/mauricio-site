# O Padrão Stateful Serverless

Vídeo de Maurício Yokoyama Issei, publicado em 16 de janeiro de 2026 (7 min 2 s).
Assistir: https://www.youtube.com/watch?v=cSl4PiE5tJ8

Assuntos: [Cloud e confiabilidade](https://mauricio.issei.com.br/temas/cloud-e-confiabilidade)

## Sobre o vídeo

Neste vídeo você vai entender, de forma clara e estruturada, o que é o padrão Stateful Serverless e por que ele está se tornando uma peça essencial na arquitetura de sistemas modernos. Exploramos as diferenças entre stateful e stateless, como aplicar serverless mantendo informações de estado, quando optar por cada abordagem e quais são os desafios e benefícios para aplicações em nuvem e backend distribuído.
Este conteúdo é ideal para desenvolvedores, arquitetos de software, engenheiros de backend, líderes de tecnologia e times de DevOps que querem dominar padrões sofisticados de arquitetura escalável.

O que você vai aprender neste vídeo:
• O que significa Stateful Serverless e como se compara com stateless e serverless tradicional
• Quando e por que usar arquiteturas stateful em ambientes serverless
• Padrões, desafios e boas práticas para gestão de estado em nuvem
• Exemplos de uso em sistemas reais e cenários escaláveis
• Desempenho, consistência de dados e escolha tecnológica

Benefícios para você:
✔ Compreender arquiteturas cloud-native avançadas
✔ Saber tomar decisões arquiteturais mais acertadas
✔ Otimizar escalabilidade e confiabilidade de seus sistemas
✔ Aumentar a eficiência ao adotar serverless sem perder contexto ou histórico

Assuntos relacionados:
#Serverless #ArquiteturaCloud #Stateful #Stateless #Backend #SoftwareEngineering #DevOps #CloudComputing

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olha, quem trabalha com arquitetura serverless sabe que gerenciar processos complexos e de longa duração é um baita desafio, né? A gente tá falando de workflows que precisam pausar por dias, esperar por alguma ação humana, se recuperar de falhas. Tudo isso pode virar uma grande dor de cabeça. Mas hoje vamos dar uma olhada num padrão que tá mudando completamente as regras desse jogo. Para começar, saca só essa citação. Ela resume perfeitamente a frustração que muita gente já sentiu com as ferramentas tradicionais de orquestração. Imagina só um erro simples, uma vírgula fora do lugar, custando horas de depuração. É aquela coisa, um errinho bobo que queima precioso de desenvolvimento. Então, por muito tempo, a principal solução para esses workflows complexos na AWS era assim: Poderosa, mas vamos combinar, bem complexa também. A orquestração acabou virando uma camada totalmente separada, bem distante da lógica principal da aplicação. A gente vai falando, claro, do AWS Step Functions. É um serviço

[1:01] super robusto, visual, excelente para coordenar vários outros serviços da AWS. O ponto central, no entanto, é que a abordagem dele é baseada em configuração, não em código. O lance é que toda a lógica do seu workflow, ela fica dentro de um arquivo Jason gigante. E é aí que a coisa complica. Quem desenvolve acaba tendo que pular de um mundo pro outro o tempo todo. De um lado, o código da aplicação, sei lá, em Python ou Node, onde tá a regra de negócio de verdade. Do outro, esse arquivo de configuração em Jon ou Yamo, que define o fluxo. Essa troca de contexto constante gera uma sobrecarga e abre espaço para erros, como aquela vírgula extra. Mas e se desce para juntar esses dois mundos? Pois é, exatamente essa proposta do padrão Stateful Serverless. É uma mudança de paradigma, uma abordagem que a gente chama de code first, onde o código vem em primeiro lugar na hora de construir os workflows. A ideia é super simples, na verdade. Em vez de ter um arquivo de configuração separado, a lógica de orquestração, as pausas, as esperas, as

[2:02] etapas do processo, agora mora dentro do próprio código da aplicação. Pense nisso, como escrever uma função normal, só que essa função tem um super poder. Ela nunca esquece onde parou, mesmo que a pausa dure dias. E olha, isso não é uma coisa isolada, tá? É uma tendência forte no mercado. A Eure já tem as durable functions funcionando desde 2017. A Cloud Flir tem os durable objects. A entrada da AWS nesse jogo, seja com o nome que for, só confirma que o jeito de pensar em orquestração serverless tá mudando de verdade, tá? Mas aí vem a pergunta de 1 milhão de dólares, né? Como é que uma função pode pausar por dias sem estourar a conta de computação no final do mês? A resposta tá num mecanismo muito, muito engenhoso. O pulo do gato tá nesse negócio chamado modelo de replay. Funciona assim, a sua função roda, chega num ponto de pausa, aí o serviço bem esperto tira uma foto do estado atual, um checkpoint, e desliga a função. Simples assim. Custo de computação durante a espera, zero.

[3:04] Quando chega a hora de continuar, a função é iniciada de novo, mas o serviço usa aquele checkpoint para lembrar tudo que já foi feito e pula direto pro ponto onde parou. é genial e super econômico. Mas para essa máquica toda funcionar, tem uma regra de ouro, uma única regra importantíssima. O código de orquestração precisa ser determinístico. O que isso quer dizer? Quer dizer que com as mesmas entradas, ele tem que produzir sempre o mesmo resultado. Então, nada de gerar números aleatórios ou pegar a data e hora atual ali no meio da orquestração. Essas coisas precisam ser feitas dentro de etapas específicas que também são salvas no checkpoint. Beleza? entendido como funciona. Mas na prática o que a gente ganha com isso? Basicamente três coisas. Um código muito mais simples, uma forma de testar que é sério revolucionária e uma economia de custos bem considerável. Para ficar mais concreto, vamos pegar um exemplo clássico que todo mundo entende, um fluxo de aprovação de despesas. Ele precisa validar um relatório a esperar a aprovação de um gerente, o que pode levar dias e só depois processar o

[4:06] pagamento. No jeito antigo com o step functions, isso seria um quebra-cabeça. Várias funções lâmbidas separadas conectadas por uma state machine bem complexa. A gente tá falando de um arquivo de definição em Jason que passa fácil das 150 a 180 linhas de pura configuração. Agora, olha a diferença. Com o padrão Stateful Servus, o workflow inteiro vira uma única função Python, umas 100 linhas de código, talvez. A lógica de negócio em orquestração, tudo junto, no mesmo lugar. Fica muito mais fácil de ler, de entender e, principalmente, de dar manutenção. E quando a gente fala de custo, bom, a diferença é absurda. Imagina um cenário com 50.000 execuções de workflow por mês. Com step functions, o custo da orquestração ficaria ali na casa dos 25. Já com as durable functions, esse custo despenca para cerca de $4.50. E o motivo principal é aquele que a gente falou, não tem cobrança de computação durante os longos períodos de espera. Isso é uma redução de 82% ou no

[5:09] custo de orquestração. É muita grana, especialmente para quem roda esse tipo de aplicação em larga escala. Mas para mim, a maior virada de chave e o que realmente muda o dia a dia de quem desenvolve é a parte de testes. Pensa só, se o workflow agora é só código, a gente pode testar ele localmente na nossa máquina. Dá para usar as ferramentas que a gente já conhece, como pest. É possível simular o workflow de uma semana inteira e rodar o teste em milissegundos, sem precisar subir nada pra nuvem. Isso é sensacional pra produtividade. OK? Então, quer dizer que a gente joga o step functions fora e só usa isso agora? Não, de jeito nenhum. A questão é saber escolher a ferramenta certa pro trabalho certo. Dá para resumir bem assim: as durable functions ou o padrão stateful serverless vão brilhar quando o seu workflow for principalmente baseado em lógica de negócio dentro de lambdas com longas esperas e quando testes unitários de otimização de custos forem prioridade. Já o step functions continua sendo o rei

[6:10] quando é preciso orquestrar múltiplos serviços da AWS, quando a visualização do fluxo é importante pra auditoria ou para pessoas não técnicas, ou quando a lógica de ramificação é tão complexa que um diagrama visual ajuda muito. No fim das contas, o padrão Stateful Servus é mais do que só uma nova ferramenta, é uma nova maneira de pensar arquitetura de software. Ele simplifica o desenvolvimento, reduz drasticamente os custos e, na minha opinião, revoluciona os testes. E aí fica a pergunta no ar. Se agora a gente pode colocar a lógica do workflow direto no nosso código, removendo essa barreira, que tipos de aplicações novas, mais complexas e inteligentes a gente consegue construir? Pensem agentes de orquestrando tarefas, em sistemas distribuídos mais sofisticados. As portas estão abertas.
