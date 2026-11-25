# Como o Claude Ship Funciona: Automatize Revisões, Correções e Aprovações de Pull Requests

O vídeo explica o Claude Ship, da Anthropic, que automatiza o que acontece depois que um pull request é aberto no GitHub. São três agentes em sequência: o Code Review, que acha bugs, o PR Steward, que corrige CI, conflitos e feedback sem aprovar nem fazer merge, e o Claude Approvals, que aplica a política de aprovação da equipe e começa no modo de observação.

Vídeo de Maurício Yokoyama Issei, publicado em 25 de novembro de 2026 (7 min 26 s).
Assistir: https://www.youtube.com/watch?v=N3ioGqXeDZg

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## A IA escreve rápido. Quem revisa?

A IA já escreve blocos grandes de código quase na hora [00:12]. Aí surge o dilema: se a IA escreve tão rápido, quem revisa tudo isso [00:23]? Esperar a revisão de colegas virou um gargalo na engenharia [00:23].

O contraste é grande [00:38]:

- **gerar código com IA** leva segundos [00:38];
- **revisar um pull request à mão** continua lento, quebra o contexto de quem programa e pode travar por horas ou dias [00:38].

A criação acelerou, mas a aprovação ficou para trás [00:51].

## O que é o Claude Ship

O Claude Ship automatiza o que acontece depois que um pull request (PR) é aberto. Segundo o vídeo, está em beta para os planos Team e Enterprise [01:26]. Pense numa equipe de três agentes que atuam em sequência [01:26]:

1. **revisão**, para achar os bugs [01:38];
2. **correção**, para transformar as falhas em sucesso [01:38];
3. **aprovação**, para aplicar as políticas da organização [01:38].

## Agente 1: Code Review

O primeiro agente acaba de sair em disponibilidade geral [01:53]. Ele analisa os PRs abertos de forma automática e quase adversária, atrás de falhas graves que poderiam quebrar a produção [01:53].

As descobertas saem em três categorias: problemas importantes, detalhes menores e problemas que já existiam no código [02:06]. O agente não só aponta o erro: descreve o problema, mostra o gatilho e já entrega a correção [02:06].

Quem administra pode ajustar o rigor da análise em cada repositório, num arquivo de configuração (REVIEW.md), e escolher entre revisão rápida, padrão ou profunda [02:19]. O processo roda sozinho a cada PR novo [02:33].

Os números citados no vídeo [02:33]:

- na equipe de engenharia da Anthropic, a taxa de PRs revertidos caiu mais de 40% [02:33];
- as revisões estão cerca de três vezes mais rápidas que na versão de pesquisa: de uns 20 minutos para 6 a 10 minutos [02:48].

## Agente 2: PR Steward

Quando o código recebe um alerta de erro, entra o PR Steward [02:59]. É um agente em beta, na nuvem, que corrige falhas da integração contínua, resolve conflitos de merge e aplica o feedback da revisão [03:15]. Assim o branch fica atualizado sem que a pessoa que programou precise trocar de contexto [03:28].

As regras são claras [03:28]:

- age com base em feedback de bots ou de pessoas [03:41];
- é acionado à mão, com um comentário que marca o Claude (`@claude steward`) [03:41];
- aplica as correções na nuvem e mostra como desfazê-las [03:41];
- **não aprova nem faz o merge**: a palavra final continua com a equipe de engenharia [03:54].

O vídeo cita Alex Devkar, vice-presidente sênior de engenharia da Carvana, que testou o agente no piloto. Segundo ele, o PR Steward ajuda as equipes a gastar menos tempo no vai e vem do feedback e mais tempo construindo [04:07].

## Agente 3: Claude Approvals

Na etapa final, o Claude Approvals avalia se o código está pronto [04:20]. É outro agente em beta que funciona quase como um arquivo CODEOWNERS mais inteligente [04:35]. A equipe escreve a política de aprovação num arquivo do repositório, e o agente usa classificadores de linguagem natural para interpretar as regras [04:35]. Com isso, aprova mudanças de rotina ou bloqueia código arriscado [04:46].

O ponto mais importante para a gestão é a segurança. O agente barra alterações em trechos sensíveis, como lógica financeira, chama uma pessoa da equipe e considera o que o Code Review encontrou [04:57].

A recomendação é começar no **modo de observação**: o agente só mostra qual seria a decisão, sem bloquear nem aprovar nada, até a equipe confiar no sistema [05:10].

A ideia não é tirar as pessoas do processo. Vatsal Bhatt, diretor de engenharia da TELUS, resume: a pessoa continua no ciclo, mas agora o tempo da equipe vai para as mudanças complexas, que precisam de pensamento crítico [05:24].

## Como começar

A adoção é feita repositório por repositório, em três passos [05:50]:

1. ative só o Code Review [05:50];
2. acrescente o PR Steward, no modo manual [06:05];
3. ligue o Claude Approvals no modo de observação [06:05].

No dia a dia, quem desenvolve dispara a sequência inteira com o comando `/ship` no Claude Code [06:05]. A equipe de administração controla a compatibilidade com as proteções de branch e define limites de gasto [06:19]. A cobrança é por uso, pela quantidade de tokens processados [06:31].

Há também um incentivo: organizações elegíveis do plano Enterprise podem resgatar US$ 10 mil em créditos promocionais se ativarem o recurso até 15 de janeiro de 2027 [06:43].

## Qual é o novo limite?

O vídeo fecha com uma pergunta: se o gargalo da revisão manual acabar, o que as equipes vão construir [06:56]? Com a burocracia feita pela IA em segundo plano, qual será o novo limite de velocidade da engenharia de software [07:09]?

## Perguntas frequentes

### O PR Steward faz o merge sozinho?

Não. Ele corrige falhas de CI, conflitos de merge e feedback de revisão, mas foi projetado para não aprovar nem fazer o merge. A decisão final é da equipe [03:54].

### Por onde começar a usar o Claude Ship?

Por um repositório: primeiro o Code Review, depois o PR Steward no modo manual e, por último, o Claude Approvals no modo de observação [05:50].

### Como o Claude Ship é cobrado?

Por uso, com base na quantidade de tokens processados. A equipe de administração define limites de gasto [06:19].

## Fontes

- [Introducing Claude Ship](https://claude.com/resources/articles/introducing-claude-ship): Anúncio da Anthropic de 23/11/2026. Sustenta os três agentes (Code Review em disponibilidade geral; PR Steward e Claude Approvals em beta), a queda de mais de 40% na fatia de PRs revertidos, o PR Steward projetado para não aprovar nem fazer merge, o Claude Approvals como um CODEOWNERS mais inteligente com modo de observação, o comando /ship no Claude Code, a cobrança por tokens, os planos Team e Enterprise, os créditos de pelo menos US$ 10 mil para organizações Enterprise elegíveis até 15/1/2027 e as falas de Alex Devkar (Carvana) e Vatsal Bhatt (TELUS).
- [Code Review is now generally available](https://claude.com/resources/articles/code-review-is-now-generally-available): Anúncio de 15/10/2026. Sustenta os níveis Quick, Standard e Deep por repositório e as revisões cerca de 3 vezes mais rápidas (de ~20 minutos para 6 a 10 minutos).
- [Claude Ship | Automate pull requests review and fixes](https://claude.com/product/claude-ship): Página do produto. Sustenta as categorias Important, Nit e Pre-existing, o ajuste com REVIEW.md, o modo manual do PR Steward com o comentário @claude steward, a exigência de uma pessoa em código sensível e a ordem de adoção: Code Review, PR Steward e política de aprovação em modo de observação.
- [Claude Ship](https://code.claude.com/docs/en/claude-ship): Documentação. Sustenta a adoção de um agente por vez num repositório e a política de aprovação no arquivo .claude/approvals.yml.

Revisado por Maurício Yokoyama Issei em 25 de novembro de 2026.

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Ferramentas de IA](https://mauricio.issei.com.br/temas/ferramentas-de-ia)

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
