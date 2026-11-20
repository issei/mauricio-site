# Como a Memória de Autoaperfeiçoamento Impulsiona o Recursive Self-Improvement Contínuo em IA

Vídeo de Maurício Yokoyama Issei, publicado em 19 de novembro de 2026 (5 min 31 s).
Assistir: https://www.youtube.com/watch?v=i0bV36ade8s

## Sobre o vídeo

Neste vídeo, exploramos o conceito de **Continual Recursive Self-Improvement (CRSI)** e como a **Self-Improvement Memory (SIM)** resolve um dos maiores desafios na evolução autônoma de sistemas de inteligência artificial.

Pesquisadores da Google Cloud AI, Google DeepMind e Penn State investigaram o que acontece quando o otimizador de *harness* precisa continuar evoluindo após mudanças no modelo de política ou nos benchmarks de avaliação. Em cenários práticos, um *harness* evoluído nem sempre se transfere de forma direta — como visto quando uma configuração refinada no Claude Opus obteve pontuação inicial inferior à do modelo semente ao ser aplicada no Gemini. 

A solução proposta é a **Self-Improvement Memory (SIM)**: em vez de equipar apenas o modelo que resolve a tarefa, a memória é integrada ao próprio otimizador de *harness*. O SIM cataloga e agrupa tentativas anteriores por falhas recorrentes, armazenando as justificativas, os resultados previstos versus observados e o contexto de avaliação. Assim, tanto o módulo proponente quanto o seletor conseguem reaproveitar aprendizados passados e evitar repetições de erros.

---

📌 **Destaques dos Resultados:**
* **Desempenho Consistente:** O SIM superou as abordagens que utilizam apenas o *harness* ou apenas causas-raiz em seis cenários entre conjuntos de dados e quatro entre modelos (incluindo migrações de Opus para Gemini e Terminal-Bench 2.1 para Terminal-Bench 4).
* **Ganhos Estatisticamente Significativos:** Em testes de programação pareados ao longo de 10 execuções independentes, o SIM melhorou 9 das 10 continuações, alcançando um ganho médio de 2,36 pontos (*p* = 0,003).

---

⏱️ **Capítulos Sugeridos:**
* `00:00` - Introdução: O que é Autoaperfeiçoamento Recursivo Contínuo?
* `01:15` - O Desafio da Transferência entre Modelos e Benchmarks
* `02:40` - O que é a Self-Improvement Memory (SIM) e como funciona
* `04:10` - Resultados e Benchmarks (Google DeepMind, Cloud AI e Penn State)
* `05:30` - Conclusão e o Futuro dos Agentes Autônomos

---

📄 **Artigo de Referência:**
* *Self-Improvement Memory Enables Continual Recursive Self-Improvement* (Xin Yu, Fei Xia, Jiaqi Pan, Youbao Tang, Chengzhi Liu, Adams Yu et al.).
* arXiv: 2611.18856

https://academy.dair.ai/papers/self-improvement-memory-enables-continual-recursive-self-improvement-2611.18856

---

#InteligenciaArtificial #MachineLearning #DeepMind #GoogleCloud #LLM #SelfImprovement #CRSI #AIAgents

## Transcrição

_Transcrição automática, não revisada._

[0:00] Nesta nossa análise de hoje, a gente vai mergulhar direto em um artigo simplesmente fascinante, desenvolvido em conjunto por pesquisadores do Google Cloud AI, do Google Deep Mind e da Pal State. O foco central aqui é uma ideia no mínimo intrigante. Como dá a inteligência artificial a capacidade de lembrar do seu próprio passado? Vamos entender como exatamente a criação de uma memória pode destravar o desenvolvimento de sistemas autônomos muito mais robustos. Bom, para começar a destrinchar isso, basta imaginar a seguinte situação. O que acontece quando um otimizador de inteligência artificial esquece o seu próprio histórico? É só pensar num trabalhador humano que de repente esquece totalmente o motivo pelo qual fez um ajuste ou conserto específico num projeto. Aí, sempre que o ambiente muda, ele é forçado a começar do zero, perdendo horas e horas de raciocínio. Esse tipo de perda de progresso é exatamente o grande obstáculo que a gente vai analisar agora. Seção um, o problema da amnésia na inteligência artificial. Existe um conceito na computação chamado de automelhoria recursiva contínua, que

[1:02] descreve um cenário super exigente. É basicamente quando um otimizador de IA precisa continuar evoluindo o seu próprio conjunto de ferramentas operacionais, que a gente chama de estrutura de suporte, mesmo depois que os testes de desempenho ou até os modelos de base mudam. Então é um ambiente brutal que não exige só a adaptação, mas sim uma evolução que não pode descartar as lições que já foram aprendidas. E na prática, o impacto dessa tal amnésia é até meio assustador. Quando a gente observa a transição entre modelos diferentes, olha só que loucura. Uma estrutura super avançada e evoluída originalmente no modelo OPOS despenca para uma pontuação de apenas 68.41 41 quando é testada no Jamini. Isso significa que ela acaba tendo um desempenho pior do que a estrutura básica inicial, que não tinha otimização nenhuma e marcava 73.89. Ou seja, é uma perda literalmente catastrófica de todo um progresso duramente conquistado. Sessão dois, introduzindo a memória de automelhoria. Então, como a gente resolve esse abismo

[2:03] na transferência de conhecimento? Para atacar isso de frente, os pesquisadores trouxeram uma solução chamada memória de automelhoria ou a sigla sim em inglês. A ideia é equipar o otimizador com um sistema projetado especificamente para que ele consiga registrar todas as suas edições passadas e os resultados práticos delas. É como se a máquina finalmente ganhasse um diário de bordo histórico da sua própria evolução. Mas aí é que tá o grande diferencial. O SIM não fica simplesmente salvando linhas de código cegamente num banco de dados. Muito pelo contrário, ele funciona como um registro histórico hiper detalhado. Ele armazena o raciocínio exato por trás daquela edição, o contexto e qual era o resultado esperado em cada tomada de decisão. Isso basicamente dá a máquina a capacidade de entender o porquê por trás das suas próprias escolhas anteriores. Sessão três, como essa memória funciona. O motor, por trás dessa memória, opera num ciclo de quatro passos super elegantes. Primeiro, ele agrupa as

[3:03] edições antigas de acordo com o problema recorrente que elas tentavam resolver. Segundo, salva rigorosamente as justificativas, os resultados previstos contra os resultados reais e o contexto. Terceiro, o sistema garante que os dois módulos internos da IA, tanto o que propõe as ideias quanto o que escolhe, leiam essa memória. E por último, novas tentativas vão sendo simplesmente anexadas, criando uma base orgânica de sabedoria que não para de crescer. Sessão 4, medindo os resultados finais. Claro que ciência a gente precisa de dados práticos e a superioridade aqui é bem clara. Quando equalizamos os orçamentos e pontos de partida, o sistema sim supera com folga os métodos antigos que não usavam memória. E isso foi testado ao extremo, tá? Foram seis cenários de cruzamento de dados, quatro situações ultra complexas trocando do modelo Opus direto pro Gemini e avaliações em quatro domínios diferentes. O sistema tirou de letra até saltos difíceis, tipo passar da versão 2.1 do Terminal Bch direto pra versão 4.

[4:07] Para visualizar o peso disso, basta olhar a taxa de sucesso nas execuções independentes de código. Em 10 continuações emparelhadas, o sistema de memória conseguiu melhorar a pontuação final com absoluto sucesso em nove delas, nove em 10. Fica muito evidente que preservar o contexto das próprias decisões estabiliza totalmente a performance do sistema. E essa consistência toda nos leva a um ganho médio de 2.36 pontos. De cara, pode até parecer um detalhe pequeno, mas estatisticamente falando, é um ganho massivo em cima das abordagens mais amnésicas. Não é um salto por sorte, é matemática pura. respaldada por um valor P fortíssimo de 0.003. Isso comprova que esses resultados fantásticos derivam única e exclusivamente do uso inteligente da memória. Todo esse conjunto de dados que a gente analisou deixa um questionamento no mínimo provocativo. Se hoje nós já conseguimos curar essa amnésia das inteligências artificiais com esse tipo de inovação, imaginem só como essa memória recursiva contínua vai remodelar

[5:09] o futuro dos sistemas autônomos. A partir do momento em que esses agentes param de esquecer e começam a acumular suas próprias lições de forma ininterrupta, a velocidade de evolução da IA vai acelerar de um jeito que a gente mal consegue prever, né? Sem dúvida é uma mudança de paradigma enorme que vale muito a pena acompanhar de perto.
