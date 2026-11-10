# A busca por uma régua melhor: por que nossas métricas falham?

Vídeo de Maurício Yokoyama Issei, publicado em 23 de janeiro de 2026 (5 min 33 s).
Assistir: https://www.youtube.com/watch?v=rRvUMog9GJI

Assuntos: [Dados e decisão](https://mauricio.issei.com.br/temas/dados-e-decisao)

## Sobre o vídeo

Times ágeis vivem cercados por métricas.
Horas, pontos, velocidade, produtividade…
Mas e se o problema não for o time — e sim a régua que usamos para medir?

Neste vídeo, eu proponho uma reflexão direta e prática sobre Story Points, métricas ágeis e tomada de decisão, usando a metáfora da “régua” para questionar modelos tradicionais de estimativa e controle.

Você vai entender:

Por que métricas mal usadas geram pressão, distorções e falsas comparações
Onde Story Points realmente ajudam — e onde eles atrapalham
O risco de transformar métricas em metas
Como líderes e times podem buscar medidas mais saudáveis e eficazes

🎯 Este conteúdo é para você se:

Trabalha com Scrum, Agile ou Kanban
Lidera ou faz parte de times de tecnologia
Já sentiu que “os números não contam a história toda”

Quer decisões melhores, não apenas relatórios mais bonitos

Aqui, o foco não é ensinar uma fórmula mágica, mas provocar a pergunta certa:
👉 Estamos medindo o que realmente importa?

👍 Se esse tema faz sentido para você, curta o vídeo, compartilhe com seu time e se inscreva no canal para mais reflexões sobre Agilidade, Tecnologia e Liderança Técnica.

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olá! Hoje a gente vai mergulhar num tema fundamental para quem desenvolve software medição. Vamos deixar para trás aquelas métricas que mais confundem do que ajudam e buscar algo que seja de fato claro e objetivo. Bom, vamos lá. Essa é a pergunta do 1 milhão de dólares, não é? Por anos e anos, as equipes vêm quebrando a cabeça com isso, usando métodos que, no fim das contas, muitas vezes só geram mais discussão do que clareza. E o coração do problema muitas vezes tá nas ferramentas que a gente usa para medir. A mais famosa delas, os story points ou pontos de história, tem umas falhas bem sérias na sua base. Pensa assim, os story points são uma mistura de várias coisas. Eles juntam o tamanho real de uma funcionalidade com o esforço que a equipe acha que vai levar, o risco envolvido, a experiência de quem vai fazer. O resultado, uma medida super instável. É como tentar construir uma parede reta usando uma régua de borracha que estica e encolhe a cada medição. Simplesmente não funciona. E olha, esse

[1:00] tipo de comentário é muito mais comum do que se imagina. Quando a métrica parece ser algo arbitrário, a confiança vai embora. Isso torna o gerenciamento de escopo um pesadelo e cria um atrito enorme entre a área de negócio e o time de desenvolvimento. Fica óbvio que a gente precisa de um jeito melhor de fazer isso. Pra gente entender a solução, vamos a uma analogia que é bem simples, mas muito, muito poderosa, a de construir uma casa. Primeiro, a gente tem o que se chama de requisitos funcionais. Isso é basicamente a planta da casa. é o que vai ser construído. Uma casa de 344 m² com três quartos, dois banheiros. Esse tamanho é fixo, é objetivo, não muda. E aí vem a segunda parte, os requisitos não funcionais. Isso aqui é o onde e o como. É o terreno. Construir aquela mesmíssima casa de 344 m num terreno plano é uma coisa. Agora, construir ela na beira de um penhasco rochoso, a fundação vai ser muito mais complexa, cara, e vai dar um trabalho imenso. E aqui tá a grande

[2:01] sacada. O tamanho da casa, o que o cliente pediu não mudou. O que mudou drasticamente foi o esforço para construir. E essa é a lição principal. A gente precisa urgentemente separar a medição do tamanho da medição do esforço. Em software, a lógica é exatamente a mesma. Então o que a gente precisa é de uma régua universal para software, uma régua de aço, sabe? Que meça só o tamanho funcional, o o qu, sem se importar com a tecnologia usada, com a equipe ou com os desafios técnicos. E essa régua tem o nome pontos de complexidade ou CPs. O interessante aqui são os princípios que fazem essa régua funcionar. Ela precisa ser objetiva para que todo mundo, negócio e TI, fale a mesma língua. Tem que ser simples, fácil de usar, imutável, porque a definição de um ponto não pode mudar no meio do projeto, né? E o mais importante de tudo, ela é totalmente desacoplada. Ela mede só o tamanho e não o esforço. É como medir a casa em metros quadrados, uma unidade que todo mundo entende e que não muda. OK? Mas aí vem a pergunta:

[3:01] como que esses pontos são calculados de um jeito objetivo? A resposta tá em analisar cada funcionalidade, não como uma coisa só, mas olhando para ela a partir de 10 perspectivas diferentes. Isso garante uma visão bem completa. Com essa abordagem, a análise fica muito mais rica. Em vez de um palpite, de um Eu acho que as equipes de fato avaliam cada uma dessas dimensões. Elas contam a quantidade de regras de negócio, o número de campos e botões na tela, quantas tabelas no banco de dados são afetadas. Cada perspectiva dessas contribui para uma pontuação final que é consistente e objetiva. Certo, a teoria é bonita, mas e na prática? Isso funciona mesmo? Vamos dar uma olhada num caso real de um sistema enorme que foi desenvolvido por uma empresa de energia e que tinha um prazo super crítico. No comecinho do projeto, a produtividade do time era essa aí, 10,34 horas para cada ponto de complexidade de software que eles conseguiam entregar. Esse era o ponto de partida. E por terem essa métrica estável, essa régua de aço, a

[4:03] equipe conseguiu enxergar de verdade onde podia melhorar. Os dados mostravam sprint após sprint onde eles estavam ficando mais eficientes e o resultado. Dá uma olhada nisso. Lá pelo Sprint 15, a produtividade tinha saltado para apenas 3,59 horas por ponto de complexidade. É uma melhoria de quase três vezes. É impressionante. Esse gráfico aqui deixa tudo bem claro. A diferença entre o começo e o fim do projeto é gritante. Eles não estavam só trabalhando mais rápido, eles estavam entregando a mesma quantidade de valor, de tamanho, de software, em muito menos tempo. E sabe por isso foi possível? Porque a régua não mudava. Como a métrica de tamanho era estável, o time pode focar em melhorar os processos, as práticas de engenharia. E isso, meus amigos, é a definição exata de trabalhar de forma mais inteligente. No fim do dia, ter uma unidade de medida que é estável e objetiva transforma tudo, muda

[5:04] completamente as conversas sobre escopo, sobre o planejamento, sobre desempenho e, o mais importante, alinha todo mundo na mesma direção, que é entregar valor de verdade. Essa mudança de uma régua de borracha para uma régua de aço não é só um detalhe técnico, é uma mudança estratégica. É o que permite que as equipes construam produtos melhores e de forma mais rápida. A questão que fica é: o que um time seria capaz de construir com uma régua melhor?
