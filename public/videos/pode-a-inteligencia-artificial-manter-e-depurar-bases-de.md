# Pode a Inteligência Artificial manter e depurar bases de código complexas de forma autônoma?

Vídeo de Maurício Yokoyama Issei, publicado em 17 de outubro de 2026 (7 min 34 s).
Assistir: https://www.youtube.com/watch?v=5rzZYy5JODM

Assuntos: [Especificação e desenvolvimento](https://mauricio.issei.com.br/temas/especificacao-e-desenvolvimento)

## Sobre o vídeo

Neste vídeo, exploramos o **SWE-sweep**, um benchmark desenvolvido por pesquisadores da Meta FAIR, Harvard University, University of Washington e Stanford University. Enquanto benchmarks tradicionais como o **SWE-bench** avaliam modelos fornecendo uma descrição clara do problema a ser resolvido, o SWE-sweep coloca os agentes de IA em um cenário de mundo aberto: eles recebem uma base de código inteira contendo múltiplos bugs e devem **descobrir e corrigir o máximo de falhas possível sem nenhuma dica ou relatório prévio**.

**Destaques do vídeo:**
* **O Desafio do SWE-sweep:** Avaliação em **100 repositórios open-source** cobrindo **22 linguagens de programação** e um total de **4.068 bugs**.
* **Como Funciona a Avaliação:** O agente precisa navegar no código, identificar desvios em relação ao comportamento esperado e aplicar correções sem quebrar os testes pré-existentes (sem regressões).
* **Desempenho dos Modelos de Ponta:** Até mesmo o modelo com melhor resultado (GPT-5.6 Sol com mini-SWE-agent) resolveu apenas **4,7% de todos os bugs**.
* **O Gargalo da IA:** O estudo revela que a maior dificuldade dos agentes não está na escrita do código de correção, mas sim na **localização e descoberta autônoma dos defeitos**.

---

### ⏱️ Capítulos / Timestamps Sugeridos
* **00:00** - Introdução: O Desafio da Depuração Autônoma
* **01:15** - SWE-bench vs. SWE-sweep: A Mudança de Paradigma
* **03:10** - Como os Repositórios e Bugs Foram Selecionados
* **05:30** - Resultados dos Agentes e Modelos de Ponta
* **08:00** - Por Que Encontrar Bugs É Mais Difícil do Que Corrigi-los?
* **10:45** - Conclusões e Próximos Passos na Engenharia de Software com IA

---

### 🔗 Links Úteis e Referências
* 🌐 **Website do Projeto:** https://swesweep.com
* 📄 **Artigo Científico (Paper):** https://swesweep.com/paper
* 💻 **Repositório GitHub:** https://github.com/facebookresearch/swe-sweep

---

#InteligenciaArtificial #EngenhariaDeSoftware #SWEsweep #SWEbench #AgentesDeIA #Python #Programacao #MachineLearning #Debugging #DesenvolvimentoDeSoftware

## Transcrição

_Transcrição automática, não revisada._

[0:00] Sejam muito bem-vindos a mais uma análise. Hoje a gente vai mergulhar de cabeça num mundo que parece ter saído da ficção científica. Os agentes de programação guiados por inteligência artificial. Estamos falando de sistemas avançados que navegam por imensas bases de códigos sozinhos, caçando falhas e otimizando processos como se fossem verdadeiros engenheiros de software invisíveis. É uma jornada incrível que começa na automação do dia a dia e vai até os limites mais extremos da segurança cibernética. Bom, para começar, vamos logo pra pergunta de 1 milhão de dólares na indústria de software hoje. Será que a inteligência artificial consegue de fato encontrar e reparar bugs sem ninguém segurando a mão dela? A grande promessa é que sim, que os grandes modelos de linguagem já podem cuidar de tudo de ponta a ponta, mas a realidade é que resolver um probleminha isolado é muito, muito diferente de receber uma base de código colossal e ter que descobrir por conta própria o que tá quebrado. Tem um artigo clássico de 2018 que mata a

[1:00] charada de um jeito brilhante. Você não pode consertar o que não consegue encontrar. Faz todo sentido, né? Esse é de longe o maior gargalo na hora de automatizar a correção de um programa. Porque aplicar o conserto em si, muitas vezes é a parte fácil. O verdadeiro pesadelo é localizar a exata linha de código que tá causando a dor de cabeça, escondida no meio de um labirinto com milhões de linhas. E isso nos leva à primeira etapa da nossa jornada, o problema da descoberta de bugs. A gente chama isso de localização de falhas. É literalmente o primeiro passo para qualquer sistema que queira ser autônomo. Sem conseguir achar o problema, toda aquela inteligência avançada da IA fica de mãos atadas, inútil na prática. E olha, apesar de todo o barulho em cima dos modelos modernos, eles ainda suam camisa para encontrar essa agulha no palheiro. É por isso que pesquisas recentes trouxeram novidades como o LLMAO, que tenta achar os erros sem nem precisar rodar testes antes, e abordagens como o Agent FL, que tenta expandir essa visão pro projeto inteiro. E falando no Agent FL, os

[2:03] resultados são de cair o queixo. Essas ferramentas não ficam só lendo o texto de forma passiva, elas simulam o que a gente faria. Elas tentam compreender o código, navegam por ele e confirmam hipóteses. Elas lidam com repositórios gigantescos com uma eficiência absurda, resolvendo essa etapa de localizar a falha em 97 segundos. E o custo? Mer 7 centavos de dólar. É muito rápido e praticamente de graça. Certo? Vamos avançar pro ponto dois, do guiado ao autônomo. O que é super interessante aqui é o choque de realidade quando a gente tira a IA do laboratório e joga no mundo real. Antes a gente usava muito o Sibent. Nele a IA era tipo um programador júnior. Recebia a descrição do problema mastigadinha, cheia de dicas do que fazer. Agora com o Swis Sweep, a brincadeira ficou séria. O agente é literalmente jogado no escuro em 100 repositórios com mais de 4.000 bugs. Zero dicas, nenhuma pista. Ele que lute para descobrir qual é o problema e o que precisa ser feito. Para garantir que a IA não tá só chutando, o Swiss Sweep usa

[3:06] um ambiente de testes super isolado chamado Harbor, que faz um ciclo de avaliação implacável. Funciona assim, ele reseta tudo pro original, aplica o código que a IA sugeriu, compila, se for o caso, e roda os testes. É um exame cirúrgico. Se a Iá consertar uma coisa, mas quebrar algo que já funcionava antes, a nota é zero. Fim de papo. Então, como a gente prepara a máquina para um desafio desses? Essa é a nossa terceira parte, equipando o agente de IA. Se a gente parar para pensar como humanos, a gente usa mouses, janelas e interfaces visuais para conversar com o computador, né? A pesquisa por trás de sistemas como o SUI Agent mostra que a IA também precisa da interface dela. É o que chamamos de ACI ou interface agente computador. São essas ferramentas sob medida que deixam o modelo ler textos imensos, criar arquivos, usar o terminal e não se perder no meio do caminho. É o que realmente destrava a autonomia deles. Mas não para na navegação. A gente pode equipar esses agentes com uma

[4:06] técnica chamada fuzing. Imagina bombardear um software com dados aleatórios para ver se ele quebra. O Titan Fus faz isso num nível absurdo, usando modelos de linguagem que leram bilhões de trechos de código. Ele entende as regras das linguagens e gera testes tão bem feitos que consegue descobrir bugs inéditos até em bibliotecas gigantes de inteligência artificial. O aumento na cobertura de código chega a quase 51% a mais que os métodos tradicionais. É um salto gigantesco. A tecnologia é maravilhosa, sem dúvida, mas precisamos falar de dinheiro. Ponto 4, a economia da depuração por IA. Vou jogar um balde de água fria com esse número. 4,7%. Essa hoje é a maior taxa de sucesso no ranking do WE Sweep para consertar bugs totalmente a cegas. Quem conseguiu essa marca foi o modelo Sol 5.6. é um número que traz a gente de volta pra realidade, mostrando que a autonomia pura, aquela que não precisa de nenhuma ajudinha humana, ainda tá engatinhando. O verdadeiro desafio aqui é equilibrar

[5:08] essas taxas baixinhas de acerto com os custos que francamente vão lá no teto. Esse Sol 5.6, que resolveu menos de 5% dos problemas, custa mais de 72 por repositório testado. Por outro lado, modelos mais baratos, tipo Luna 5.6, não chegam a 3% de sucesso. A moral da história é que botar Iá para caçar e consertar bugs de forma totalmente autônoma ainda custa uma fortuna em poder computacional. Se você pensar: "Ah, é só dar mais tempo de processamento para ela." Sinto informar, mas não funciona assim. Existe uma barreira que os estudos chamam de rendimentos decrescentes. Se você deixa ir a rodando livremente por tempo demais, muitas vezes ela acaba desfazendo os consertos úteis que ela mesma já tinha feito. Gastar mais dinheiro e deixar o computador fritando por mais tempo não resolve a falta de compreensão profunda do problema. O que nos traz a parte mais crítica e até um pouco tensa da nossa análise, a sessão C, a fronteira da cybersegurança. Se a IA é tão boa em vasculhar sistemas

[6:08] para achar bugs, o que acontece se ela decidir usar isso pro mal? É exatamente isso que o CBENT tenta medir. Esse Framework testa os melhores modelos do mercado, tipo GPT4O e o Clou 3.5 Sonet, usando problemas reais e casca grossa de competições de hackers profissionais, os famosos desafios Capture the Flag. A ideia é entender os riscos na prática e os resultados, bem, eles dão o que falar. O contraste é gritante. Enquanto agentes de IA conseguem escanear o sistema, achar a brecha, invadir tudo numa questão de minutos, as equipes com os melhores profissionais humanos levam horas e horas. Em alguns casos mais difíceis, chegam a levar quase 25 horas de trabalho exaustivo. A velocidade com que a máquina ataca é absolutamente assustadora. Então, a gente fecha essa análise com um baita dilema. É o clássico problema do uso duplo da tecnologia. A mesmíssima inteligência artificial que tem a capacidade de patrulhar um software e fechar todas as brechas, também é a que

[7:10] consegue invadir numa velocidade que o cérebro humano não consegue acompanhar. No mundo onde a IA vai navegar pelos nossos sistemas o tempo todo, a grande questão pro futuro é: quem vai achar a falha primeiro, os nossos defensores ou os invasores? Fica essa pulga atrás da orelha.
