# A Intenção do Negócio: Especificação Conversacional Estruturada com IA

Vídeo de Maurício Yokoyama Issei, publicado em 12 de outubro de 2026 (8 min 57 s).
Assistir: https://www.youtube.com/watch?v=vz9n5iKti9c

Assuntos: [Especificação e desenvolvimento](https://mauricio.issei.com.br/temas/especificacao-e-desenvolvimento)

## Sobre o vídeo

No desenvolvimento de software impulsionado por Inteligência Artificial, gerar código com mais rapidez não garante, por si só, a preservação da real intenção do negócio. Neste vídeo, apresentamos a **Especificação Conversacional Estruturada**, um workflow criado por Maurício Yokoyama Issei para evitar a perda de contexto e gerenciar a divergência entre documentação, testes e código.

Entenda como utilizar modelos de linguagem na elicitação e no registro de requisitos sem abrir mão da governança: enquanto a IA atua na investigação e na proposição de cenários, a tomada de decisão permanece como responsabilidade exclusiva de pessoas com autoridade.

🌐 **Acesse o ensaio completo e o kit de artefatos (.md):**
https://mauricio.issei.com.br/especificacao-conversacional.html

---

📌 **Neste vídeo você vai conferir:**
• **O problema da perda de contexto:** Como a aceleração trazida pelos agentes de IA pode transformar interpretações não validadas em implementações aparentemente consistentes.
• **A cadeia de transformações:** As perdas de contexto, inferências e contradições que surgem entre a conversa inicial e o produto final.
• **As 5 práticas do protocolo:** Registrar origens de afirmações, separar fatos de hipóteses, expor pendências, aplicar exemplos/contraexemplos e revisar conforme o risco.
• **A Matriz de Autoridade:** A separação entre a assistência da IA e a autoridade humana para decidir valor, conformidade e regras comerciais.
• **Estudo de caso em sistema legado:** A modernização de um sistema comercial e o tratamento de divergências entre o comportamento do legado, a documentação e os novos testes.
• **Especificação vs. TDD:** Por que a especificação decide o que verificar enquanto o TDD executa a verificação, garantindo oráculos de teste validados por humanos.
• **Transparência e limites:** A importância da validação empírica e da avaliação do workflow no contexto de cada organização.

---

⏱️ **Capítulos do Vídeo:**
00:00 - Introdução: Código rápido vs. Intenção de negócio
00:45 - O problema da perda de contexto na engenharia de software
01:30 - A proposta da Especificação Conversacional Estruturada
02:30 - As 5 práticas do protocolo e a matriz de autoridade
03:45 - Exemplo prático: Modernização de um sistema legado
04:50 - Especificação vs. TDD: Quem define o oráculo de teste
05:30 - Conclusão, rastreabilidade e validação

---

🔗 **Links Úteis e Referências:**
• Artigo completo e kit de artefatos: https://mauricio.issei.com.br/especificacao-conversacional.html
• Autor: Maurício Yokoyama Issei

#EngenhariaDeSoftware #InteligenciaArtificial #EngenhariaDeRequisitos #DesenvolvimentoDeSoftware #SistemasLegados #TDD #IA #MauricioIssei

## Transcrição

_Transcrição automática, não revisada._

[0:00] A inteligência artificial gerando código hoje em dia tem uma velocidade que chega a ser impressionante. Quase uma mágica, não é verdade? Mas a gente tem visto um problema enorme crescendo nas equipes de desenvolvimento. Gera código numa velocidade absurda simplesmente não significa que estamos construindo o software certo. Nessa correria louca pela entrega, a intenção original do negócio frequentemente fica para trás. A IA começa a ter aquelas alucinações e acaba inventando requisitos do nada. Então, nesta nossa explicação de hoje, vamos mergulhar fundo nisso e desvendar a especificação conversacional estruturada, uma proposta fascinante que foi desenhada exatamente para atacar esse caos e devolver o controle para as pessoas. Para entender isso de vez, nossa análise vai seguir um roteiro de seis passos fundamentais. Primeiro, a gente vai desconstruir a ilusão da velocidade. Depois vamos ver como isso bate de frente com o mundo real no desafio do legado. Daí vamos passar pelos cinco princípios dessa proposta e entender a chamada matriz de autoridade. Em seguida, vamos separar o que é especificação e o que é td para no finalzinho chegar a mensagem principal sobre os limites e a validação desse

[1:00] método. Começando então com a parte um, a ilusão da velocidade e o real problema com a geração rápida de código. Hoje em dia rola um entusiasmo enorme de viapindo o código na tela. Mas reduzir o esforço da equipe não é garantia nenhuma de que a solução certa tá sendo criada. O maior risco aqui é acabar implementando uma alucinação de forma ultra eficiente. Pensa naquela velha brincadeira de telefone sem fio corporativa. A informação nasce ali, numa conversa inicial num chat e passa por várias etapas e resumos até virar um teste automatizado lá no final. A cada salto desses perde-se um pedaço do contexto original. Aia vai preenchendo as lacunas com inferências que ninguém pediu, criando contradições e deformando por completo o que o negócio realmente precisava, certo? E isso nos leva perfeitamente pra parte dois, o desafio do legado, focando na modernização de sistemas comerciais. Para trazer toda essa teoria direto pro chão de fábrica, imagina a seguinte cena. Precisamos modernizar um sistema legado de 15 anos de idade. A ordem da chefia é migrar

[2:01] para uma arquitetura novinha em folha, mas sem perder as regras de negócio. O problema? Absolutamente ninguém na empresa sabe de cor todas essas regras. E aí surge um grande conflito prático. A documentação que sobrou diz que aprovar um desconto exige uma autorização manual, só que o teste de caracterização que roda lá no sistema antigo aprova o desconto direto, sem perguntar nada para ninguém. O comportamento de hoje pode não ser o certo. O Código novo não sabe a resposta e a documentação parou no tempo. Diante desse impasse enorme, quem bate o martelo sobre qual é a regra verdadeira? É exatamente para resolverem passes assim que entramos na parte três, os cinco princípios que formam o protocolo para investigar e contestar a IA. Para sair daquele mato sem cachorro com o sistema legado, a especificação conversacional estruturada muda totalmente o foco do trabalho. Em vez de só pedir para IA gerar código, o objetivo passa a ser investigar e descobrir qual é a real intenção do negócio. E para isso não virar bagunça, existem cinco práticas essenciais. A primeira é registrar rigorosamente de onde saiu cada afirmação. A segunda

[3:03] exige uma separação muito clara entre o que é um fato comprovado e o que é só uma hipótese. A terceira prática diz que precisamos manter as pendências totalmente visíveis, com donos muito bem definidos. A quarta foca em usar exemplos e contraexemplos para testar os limites das regras. E a quinta é revisar tudo isso numa proporção direta ao risco envolvido. Sério, isso não é burocracia chata, é clareza. é o que nos permite separar o que sabemos de verdade daquelas coisas que estamos apenas supondo. Avançando pro quarto ponto da nossa jornada, a matriz de autoridade e como funciona essa governança entre humanos e inteligência artificial. Para que todo esse processo investigativo não perca o rumo, as responsabilidades de cada lado precisam ser muito bem demarcadas. Se existe um mantra, uma regra de ouro para esse fluxo de trabalho é esse aqui. A Ia propõe: Pessoas com autoridade decidem. A é maravilhosa, atuando como um assistente incansável. Ela entra no código legado, recupera o contexto, propõe mil ideias para testes. Mas preste bem atenção, o

[4:04] modelo de linguagem nunca, em hipótese alguma, tem autoridade para decidir o valor de negócio ou o que é verdade absoluta dentro daquele domínio. Isso fica ainda mais claro quando a gente analisa a dinâmica de decisões em si. Decisões sobre o valor de negócio pertencem de forma exclusiva aos especialistas de produto e de negócio. O papel da IA ali é apenas comparar os impactos e mostrar caminhos. A mesma coisa vale pro famoso oráculo de teste, que no jargão técnico é basicamente o resultado esperado e correto que o sistema tem que dar. Definir isso é tarefa sagrada da engenharia e do negócio em conjunto. A IA, no máximo, gera cenários candidatos para que as pessoas avaliem. A conclusão central aqui é que por padrão o modelo de A tem zero autoridade substantiva. Ele propõe e transformações, mas sempre restrito à caixinha que a gente autoriza. O que esse enquadramento faz, na verdade, é traçar uma linha gigante entre simplesmente bater um papo no chat e fazer engenharia de software de verdade. Do lado esquerdo, quando a gente só conversa com o Aia, o histórico fica

[5:04] super solto. O objetivo da conversa vai mudando sem ninguém perceber e decisões vitais ficam escondidas, implícitas no meio de um texto gigante. Do lado direito, usando a especificação conversa estruturada, a brincadeira muda de nível. Tudo é baseado em artefatos versionados. Existem responsáveis bem definidos, um escopo explícito e uma rastreabilidade ponta a ponta. Se houver qualquer conflito de regras, ele não vai ser resolvido pela máquina em silêncio. Ele é trazido pra luz e decidido exclusivamente por humanos. Especificação versus TDD, diferenciando intenção e verificação. Com todos esses processos em mente, uma dúvida super comum costuma aparecer nas equipes. Poxa, praticar o UTD, o desenvolvimento orientado a testes, já não resolveria tudo isso? E a resposta nua e crua é não. São coisas muito diferentes, mas que se complementam demais. O pulo do gato está em quem controla o que na prática. A especificação é o que decide o que precisa ser verificado. Ela define a intenção do negócio, as regras e estabelece aquele oráculo definitivo. O

[6:07] TDD, por outro lado, serve para verificar de forma cirúrgica e rápida se aquele pedacinho novo de código está obedecendo a esse oráculo. Pensa no perigo da situação. Se a Ia gerar o código e também gerar os testes baseados numa premissa totalmente furada, os testes vão passar com louvor, validando uma intenção absurdamente errada. Por isso, a regra do oráculo tem que vir das mentes humanas sempre. Mas claro, no mundo real, todos sabemos que com o passar dos meses, o código, os testes e a documentação fatalmente vão começar a divergir. É aquele fenômeno super conhecido nas empresas chamado de desvio contínuo ou drift. E justamente para lidar com isso de peito aberto, a proposta inclui uma política ágil de cinco passos. Primeiro, a gente identifica logo o conflito. No segundo passo, investigamos a causa provável. Isso é um defeito novo mesmo ou foi a regra que ficou velha? No terceiro, mapeamos de quem é a autoridade para decidir sobre aquilo. O quarto passo é registrar a decisão que foi tomada, sempre junto com a justificativa. E o último é atualizar os artefatos de vez e

[7:08] verificar o sistema de novo. Dessa forma redondinha, absolutamente cada etapa e cada mudança de rota no desenvolvimento fica 100% rastreável. E assim chegamos ao nosso sexto e último ponto da análise, a mensagem principal sobre limites e validação empírica. Encaminhando para o nosso encerramento, é absolutamente fundamental dar um passo atrás e adotar uma postura de transparência científica bem rigorosa, conforme destacado no próprio material que embasou nossa análise. A especificação conversa estruturada é um enquadramento que ainda tá em pleno desenvolvimento. O próprio autor ressalta claramente que, embora várias peças isoladas já tenham provado um valor gigantesco, como usar IA para caçar ambiguidades, esse fluxo de trabalho completo ainda carece de validação empírica. Ele não passou por estudos controlados ou longitudinais extensos comparados a uma linha de base na literatura científica. Ou seja, é uma abordagem extremamente pragmática, desenhada com muito critério para ser testada, ajustada e medida de verdade no mundo real. Não é uma pílula mágica, mas

[8:09] é um norte metodológico muito forte. E saber de tudo isso nos deixa com uma provocação daquelas para refletir. Se hoje nós já temos agentes de inteligência artificial escrevendo pedaços imensos do software comercial pelo mundo afora, estabelecer uma governança nunca foi tão vital. Pensa bem, sem uma especificação estruturada que seja ancorada na autoridade humana e que possa ser totalmente rastreável, como as equipes de engenharia vão conseguir daqui paraa frente validar ou até mesmo compreender as decisões invisíveis que as máquinas já estão tomando agora? Fica aí o convite pra gente refletir sobre a necessidade urgente de evoluir a nossa forma de construir tecnologia. Porque delegar digitação é ótimo, mas delegar a intenção do negócio é um risco que simplesmente não podemos correr.
