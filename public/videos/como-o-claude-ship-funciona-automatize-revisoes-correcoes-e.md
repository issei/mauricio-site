# Como o Claude Ship Funciona: Automatize Revisões, Correções e Aprovações de Pull Requests

Vídeo de Maurício Yokoyama Issei, publicado em 25 de novembro de 2026 (7 min 26 s).
Assistir: https://www.youtube.com/watch?v=N3ioGqXeDZg

## Sobre o vídeo

Entenda como o **Claude Ship** acelera o desenvolvimento de software automatizando todo o ciclo de vida dos pull requests no GitHub. 

Neste vídeo explicativo, detalhamos como o Claude Ship utiliza três agentes especializados para eliminar gargalos entre o envio do código e o merge:

* **Code Review:** Utiliza múltiplos agentes para identificar bugs críticos antes de chegarem à produção, oferecendo níveis de análise *Quick*, *Standard* e *Deep*.
* **PR Steward (Beta):** Executa em nuvem para resolver verificações de CI com falhas, solucionar conflitos de merge e aplicar correções sugeridas nas revisões.
* **Claude Approvals (Beta):** Aplica regras de governança configuradas no repositório, aprovando alterações rotineiras automaticamente e acionando revisores humanos para partes sensíveis do código.
* **Comando `/ship` no Claude Code:** Como os desenvolvedores podem disparar esse fluxo diretamente do terminal.

O Claude Ship está disponível para clientes dos planos **Claude Team** e **Enterprise** no GitHub.

---

#### 🔗 **Fontes e Links Oficiais:**

* **Claude Ship | Automate pull requests review and fixes:**  
  https://claude.com/product/claude-ship

* **Introducing Claude Ship | Claude by Anthropic:**  
  https://claude.com/resources/articles/introducing-claude-ship

* **Code Review is now generally available | Claude by Anthropic:**  
  https://claude.com/resources/articles/code-review-is-now-generally-available

* **Documentação Oficial do Claude Ship:**  
  https://code.claude.com/docs/en/claude-ship

---

#ClaudeShip #Anthropic #DevOps #GitHub #CodeReview #EngenhariaDeSoftware #InteligenciaArtificial

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olá, boas-vindas a esta explicação. É excelente ter a companhia de quem busca entender o futuro da tecnologia. Hoje a nossa imersão total é sobre como o Cloudship funciona e como essa ferramenta tá automatizando o ciclo de vida do desenvolvimento de software moderno. Olha que ironia interessante no fluxo de trabalho atual de desenvolvimento. A inteligência artificial já consegue escrever blocos gigantes de código quase instantaneamente, certo? Mas aí surge um grande dilema. Se aá escreve tão rápido, quem vai revisar tudo isso? Acabou que esperar por uma revisão humana feita por colegas de trabalho virou um gargalo gigantesco na engenharia. É um contraste absurdo. De um lado, a geração de código por IA é rápida, automática, leva apenas alguns segundos. Do outro lado da balança, bom, as revisões manuais tradicionais de pool requests continuam muito lentas, quebram totalmente o contexto de quem tá programando e muitas vezes ficam travadas por horas ou até dias. Resumindo, a criação acelerou enormemente, mas a aprovação ficou presa

[1:01] no passado. Bom, vamos mergulhar nisso. O roteiro de hoje cobre um, o gargalo do code review. Dois, conheça o Cloud Ship. 3, agente 1, code review. 4, agente 2, PR Steward. 5, agente 3, Clode Approvals. E 6, como começar a usar. Número dois, conheça o Cloudship, o fluxo de trabalho automatizado pós PR. Essencialmente o Cloudship, que hoje tá em fase beta para planos Team e Enterprise, é a solução definitiva para automatizar absolutamente tudo que acontece depois que um PR é aberto. Pense nessa ferramenta como uma equipe de três membros virtuais atuando em sequência. Primeiro temos a revisão para pegar os bugs, depois a correção para transformar as falhas em sucesso e por fim a aprovação aplicando as políticas da organização. Parte três. Agente um. Code review. capturando bugs antes da produção. Esse primeiro agente, que inclusive acaba de ser lançado em disponibilidade geral, analisa os PRs

[2:02] abertos de forma automática e quase adversária. Ele vai atrás de falhas graves que poderiam quebrar a produção. Ele categoriza as descobertas de um jeito super limpo, entre problemas importantes, detalhes menores ou códigos pré-existentes. E o mais legal, ele não só aponta o erro, ele descreve o problema, mostra o gatilho e já entrega a correção. Quem administra o sistema tem flexibilidade total. Dá para ajustar o rigor da análise repositório por repositório usando um arquivo simples chamado review. É só escolher entre revisões rápidas, padrões ou profundas. O processo todo roda sozinho a cada novo PR. Só para dar uma ideia prática, o uso interno dessa ferramenta cortou a taxa de PRs revertidos da própria equipe de engenharia da Antropic em mais de 40%. Agora, o que é realmente impressionante nesse dado é o salto de velocidade. As revisões estão umas três vezes mais rápidas do que nas versões de pesquisa. Um processo que antes tomava uns 20 minutos despencou por um intervalo muito ágil, levando de apenas 6 a 10

[3:02] minutinhos no total. Quatro. Agente 2 PR Stuart, transformando PRs vermelhos de volta para verdes. E o que acontece quando o código é sinalizado com erro? É aí que entra o PR Stuart. Ele é um agente em versão beta baseado na nuvem que trabalha nos bastidores como um verdadeiro consertador incansável. Ele corrige de forma automática as falhas na integração contínua, resolve conflitos chatos de merge e aplica o feedback da revisão. A grande sacada é manter o branch atualizado sem que a pessoa que programou precise perder o foco e trocar de contexto para voltar naquele código. As regras do jogo aqui são bem claras e delimitadas. O PR Stewart age com base em feedbacks, sejam de bots ou de humanos. e é acionado manualmente com um simples comentário marcando @cloudstewward. Ele faz toda a mágica na nuvem, aplica as correções e até ensina como desfazer. Mas atenção num detalhe vital, ele foi projetado deliberadamente para não aprovar e nem fazer o merge do código. A palavra final continua nas mãos da

[4:03] equipe de engenharia sempre. E para trazer essa parte mais técnica pra vida real, a gente já vê liderança escolhendo frutos durante a fase piloto. Como o Alex Devcar, vice-presidente snior de engenharia, pontuou muito bem, o PR Stuart tá ajudando as equipes a gastar bem menos tempo com aquele vai e vem exaustivo de feedback de código e, claro, usando esse tempo extra para de fato focar em construir novidades. Cinco. Agente 3, Cloud Approvals, aplicando as regras da equipe. E chegamos na etapa final, a hora de avaliar se o código realmente está pronto. O Clode Approvals é mais um agente em beta que funciona quase como um arquivo Codeowners hiperinteligente. A equipe escreve as políticas de aprovação num arquivo direto no repositório e o agente usa classificadores de linguagem natural para interpretar essas regras. Basicamente ele aplica a política da organização para aprovar mudanças rotineiras direto ou então para bloquear códigos arriscados. O ponto crucial e mais reconfortante paraa gestão é a segurança. O agente barra alterações em

[5:04] trechos sensíveis, tipo lógica financeira, e imediatamente chama alguém da equipe, além de levar em conta as descobertas do próprio code review. Mas a recomendação de ouro é: comece rodando no modo de observação. Nesse modo seguro, o agente apenas sinaliza qual seria a sua decisão, sem realmente bloquear ou aprovar nada até todo mundo ganhar total confiança no sistema. A ideia nunca foi eliminar o fator humano. Muito pelo contrário. O diretor de engenharia Watsal Hat resumiu a essência disso ao dizer que a intervenção humana continua firme no ciclo. A diferença é que agora a inteligência e o tempo das equipes vão exclusivamente para as mudanças complexas que realmente precisam de atenção e pensamento crítico. Sessão seis, como começar a usar a implementação passo a passo. Então, como colocar toda essa maravilha para rodar hoje? É um caminho bem livre de atrito. A adoção acontece repositório por repositório. Primeiro, ativa-se apenas o code review. Em seguida, adiciona-se o

[6:05] PR Stuart, mas deixando apenas no modo manual. E por último, trace o Cloud Approvals naquele famoso modo de observação seguro. É uma implementação super fluida e sem estresse. No dia a dia, quem desenvolve ativa a sequência inteira rapidinho, usando apenas o comando barra chip dentro do cloud code. Do outro lado, a equipe administrativa fica no controle total dos bastidores, configurando compatibilidades com as proteções de branch já ativas e estipulando os limites de gastos. Afinal de contas, o cloudship é cobrado por uso, baseado na quantidade de tokens processados. Ah, e tem um incentivo financeiro fortíssimo. Organizações qualificadas que já usam o plano Enterprise podem resgatar nada menos que 10.000 em créditos promocionais se ativarem o recurso até 15 de janeiro de 2027. Ou seja, é literalmente o momento perfeito e mais oportuno para testar a ferramenta. O que nos leva a uma reflexão provocativa sobre o futuro da nossa área. Se a gente consegue eliminar de vez aquele velho gargalo da revisão

[7:05] manual, o que as equipes vão construir a partir de hoje? Com a burocracia sendo operada pelas IA em segundo plano, qual vai ser o novo limite de velocidade da engenharia de software? Fica o questionamento no ar. Agradecemos demais pela companhia nesta explicação e até a próxima análise.
