# Engenharia de Agentes de IA: Da "Magia" à Arquitetura de Produção

Vídeo de Maurício Yokoyama Issei, publicado em 19 de junho de 2026 (7 min 43 s).
Assistir: https://www.youtube.com/watch?v=UxaaQN-csvA

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

Você já sentiu que construir com IA parece mais "mágica" do que engenharia? Projetos que funcionam bem em demos, mas falham miseravelmente em produção com loops infinitos, custos imprevisíveis e alucinações sistêmicas
.
Este vídeo apresenta a Engenharia de Agentes de IA, uma abordagem prática e disciplinada que transforma conceitos abstratos em decisões arquiteturais concretas
. A nossa tese central é clara: um sistema de IA bem-sucedido deve ter muito pouca IA no caminho crítico
. O modelo de linguagem deve ser tratado como um componente estocástico especializado dentro de uma estrutura de software rigorosa, e não como o "piloto" que decide o fluxo do sistema
.
O que você vai aprender neste vídeo:
Orquestração Determinística: Por que o LLM deve responder perguntas, mas nunca decidir quais perguntas fazer a seguir
.
Os 10 Princípios da Engenharia Agêntica: Do desacoplamento entre "Cérebro" e "Vitrine" ao uso de Ledgers (livros-caixa) para governar o orçamento de tokens em tempo real
.
Confiabilidade Cognitiva: Como usar contratos rígidos (schemas) e a Hipótese de Mundo Aberto para garantir que o sistema saiba dizer "não sei" em vez de alucinar
.
FinOps e BDD para IA: Estratégias para escalar sistemas sem faturas-surpresa e como testar o comportamento probabilístico com cenários fixos
.
Explore a experiência interativa:
Este conteúdo faz parte de uma jornada de aprendizado por descoberta ativa
. No site oficial, você não apenas lê sobre esses conceitos, mas pode:
Simulador de Arquitetura: Ajustar parâmetros e ver o impacto em custo e risco em tempo real
.
Playground Educacional: Montar sua própria arquitetura agêntica e recebê-la avaliada por um motor de regras determinístico
.
Estudo de Caso Real: Ver como esses princípios foram aplicados no projeto SocialSelling para criar um sistema de priorização de leads auditável e seguro
.
Para quem é este conteúdo? Seja você um Dev clássico migrando para IA, um Tech Lead buscando padronização, um Arquiteto desenhando sistemas robustos ou um Executivo preocupado com o ROI e segurança, este guia foi feito para você
.
Acesse agora a experiência completa: 👉 https://mauricio.issei.com.br/engenharia-agentes-ia

#IA #EngenhariaDeSoftware #ArtificialIntelligence #LLM #AgentesDeIA #ArquiteturaDeSoftware #VibeCoding #TechEngineering

## Transcrição

_Transcrição automática, não revisada._

[0:00] Boas-vindas a este Spliner. Hoje a gente vai falar sobre um tema absolutamente crucial, a transição daquele hype todo imprevisível da inteligência artificial paraa construção de sistemas que realmente param de pé na produção. É hora de deixar a tal magia do prompt de lado e colocar a mão na massa com engenharia de software de verdade, garantindo escalabilidade e segurança de ponta a ponta. Vamos nessa. O nosso roteiro passa rápido por cinco pontos fundamentais. Primeiro do causa engenharia, depois a orquestração determinística de a, em terceiro, arquitetura e os contratos rígidos, avançando para FINOPS e o mundo aberto. E para fechar a conta, governança e explicabilidade. Vamos seguir então ponto número um do causa e engenharia. Olha que contraste interessante. Existe um abismo gigante entre o que fica lindo numa demonstração controlada e o que realmente sobrevive lá no mundo real, na produção. De um lado, a gente tem essa famosa magia do prompt, sabe? aqueles agentes autônomos conversando livremente, meio que soltos ao vento. Do

[1:01] outro temos a engenharia agêntica. Aqui a história é outra. A I não é mágica. Ela é tratada como um componente de software. É algo super estruturado, previsível e com muita disciplina. É literalmente sair da brincadeira para ir pro jogo sério. E por que mudar? Bom, quando a gente confia num sistema de a sem estrutura, os sintomas são para dizer o mínimo desastrosos. Basta imaginar loops infinitos com a gente passando a bola pro outro sem parar. até estourar o limite de uso. Isso gera faturas de API que são impossíveis de prever, sem contar as alucinações sistêmicas, né? Aqueles erros que vão se propagando como se fossem a verdade absoluta. O orçamento vira uma roleta russa e se precisar debugar alguma coisa, é para esquecer, é praticamente impossível. O que nos leva a uma frase que resume perfeitamente a situação. O LLM é um componente, não o piloto. Quer dizer, num sistema verdadeiramente bem-sucedido, a inteligência artificial mal toca o caminho crítico de forma autônoma. A maior parte do trabalho duro ali é, na realidade engenharia clássica construída ao redor de um motor

[2:02] probabilístico. E com isso, chegamos ao ponto dois, orquestração determinística de IA. Tem um conceito sensacional aqui chamado de resíduo interpretativo. A ideia é muito inteligente. Não faz o menor sentido gastar rios de dinheiro usando modelo pesado para resolver tudo. As equipes precisam aprender a usar o poder do LLM só para aqueles 10% do problema que realmente exigem uma compreensão de linguagem mais complexa. O resto todo a gente resolve muito antes usando dados estruturados e aquelas boas e velhas regras simples de código. Na prática, o processo deixa de ser uma conversa caótica e vira uma linha de montagem, um pipeline muito previsível, como um grafo acíclico direcionado. Começa lá na entrada de dados, passa por uma limpeza e sanitização pesada e aí sim chega no modelo, mas só para lidar com aquele resíduo interpretativo que a gente acabou de falar. Depois passa por uma validação super rigorosa e só então a saída liberada. Basicamente, a IA fica numa caixinha presa em etapas fixas e muito bem definidas. Vamos agora para a

[3:04] parte três, arquitetura e contratos rígidos. Fica muito fácil entender essa necessidade de separação física usando a metáfora de um restaurante. O motor cognitivo, a parte pesada da IA, é a cozinha do restaurante, é o cérebro. É lá que um ambiente esquenta, onde lógicas complexas rodam e os dados sensíveis são processados lá nos bastidores sem pressa. Por outro lado, a interface pública e rápida é a vitrine, o salão de jantar. Lá, o atendimento tem que ser dinâmico, instantâneo. Se a gente misturar o caos da cozinha com a exposição do salão, é uma receita infalível para falhas catastróficas de performance e segurança. E como é que a gente liga esses dois mundos separados usando os famosos contratos rígidos? É a mesma lógica de validar formulários num backend tradicional. Qualquer coisa que sai da IA precisa ser tratada como um dado absolutamente não confiável. Tem que ter esquemas e regras muito estritas ali na fronteira, barrando qualquer

[4:05] resposta inesperada logo de cara. Essa blindagem que garante que uma alucinação da máquina não contamine o resto da base de dados. Ponto quatro, FINOPS e o mundo aberto. Aqui a gente tem uma mudança de mentalidade fundamental conhecida como a hipótese do mundo aberto. Historicamente, se uma informação não constava no banco de dados, o sistema assumia que ela era falsa. Mas no mundo cognitivo não pode ser assim. A falta de uma evidência precisa ser encarada como uma incerteza explícita. O sistema tem que estar preparado para dar um sonoro, eu não sei, em vez de tentar preenchir as lacunas inventando fatos mirabulantes. Para evitar o gravíssimo problema do envenenamento cognitivo, é obrigatório separar as informações em camadas bem distintas. É o seguinte, evidência é um fato observado, concreto, que tá lá na fonte de dados. Outra coisa completamente diferente é a inferência, que é só um palpite calculado da IA. E no fim das contas temos o julgamento, que é a pontuação final. Misturar essas três coisas é perigosíssimo. Se isso

[5:07] acontecer, a IA vai começar a justificar suposições com outras invenções, criando uma realidade irreal. Falando agora de sobrevivência financeira. Para evitar aquelas contas exorbitantes no fim do mês, a arquitetura precisa aplicar práticas maduras de finops na veia. Nada de só cruzar os dedos. A gente usa leders persistentes, como livros caixa, que recusam o gasto antes mesmo da provedora da API bloquear o acesso. Ferramentas de poda precoce cortam os dados que são lixo antes de usar os modelos caros. O processamento é feito em ondas seguras e a aplicação de cash semântico ajuda a economizar em larga escala. Por fim, sessão cinco, governança e explicabilidade. Para lidar com aquela imprevisibilidade toda da IA, entra em cena o desenvolvimento orientado ao comportamento, o famoso BDD. Usando dados fictícios e respostas que já foram gravadas, a gente estressa o software que fica ao redor da inteligência artificial. Isso é genial porque dá para provar como o produto funciona no cenário ideal, mas principalmente como

[6:09] ele degrada de forma super elegante quando as API não respondem ou a conexão falha. E tudo isso testado com segurança. E tem mais, essas barreiras estritas de governança protegem a IA suas próprias confusões. Aplicando regras, tipo a definição de preparo, a gente garante que não existe nenhuma lacuna no design do que precisa ser feito, impedindo que a IA tente adivinhar o escopo das tarefas. E com a definição de pronto, se rolar qualquer anomalia, o sistema entra em um estado de fechamento seguro. Ele reporta um erro autêntico em vez de tentar mascarar o problema. É segurança em primeiro lugar. E é exatamente aqui que a inteligência artificial explicável cria ponte decisiva para ganhar as áreas de negócios. Vamos ser sinceros, ninguém confia numa decisão baseada só num placar opaco, tipo 0.674. Não faz sentido. Para conquistar a doação de verdade, substituímos esses números cruz por justificativas claríssimas em linguagem natural. O sistema aponta as lacunas, rastreia a origem de cada evidência e explica tudo nos mínimos detalhes. É com essa transparência que humanos realmente

[7:10] passam a confiar no processo. Para encerrar este spliner com chave de ouro, vale uma reflexão importantíssima sobre resiliência na engenharia gêntica. Se o seu principal provedor de inteligência artificial sair do ar e enfrentar uma disponibilidade daquelas amanhã, o sistema vai colapsar por completo ou a arquitetura tem disciplina suficiente para se manter de pé, o projeto ideal de verdade é aquele que garante controle absoluto até mesmo no meio da maior incerteza.
