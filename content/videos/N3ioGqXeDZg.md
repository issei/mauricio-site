---
id: N3ioGqXeDZg
slug: como-o-claude-ship-funciona-automatize-revisoes-correcoes-e
status: publicado
temas:
  - engenharia-agentica
  - ferramentas-de-ia
resumo: "O vídeo explica o Claude Ship, da Anthropic, que automatiza o que acontece depois que um pull request é aberto no GitHub. São três agentes em sequência: o Code Review, que acha bugs, o PR Steward, que corrige CI, conflitos e feedback sem aprovar nem fazer merge, e o Claude Approvals, que aplica a política de aprovação da equipe e começa no modo de observação."
fontes:
  - url: https://claude.com/resources/articles/introducing-claude-ship
    titulo: "Introducing Claude Ship"
    sustenta: "Anúncio da Anthropic de 23/11/2026. Sustenta os três agentes (Code Review em disponibilidade geral; PR Steward e Claude Approvals em beta), a queda de mais de 40% na fatia de PRs revertidos, o PR Steward projetado para não aprovar nem fazer merge, o Claude Approvals como um CODEOWNERS mais inteligente com modo de observação, o comando /ship no Claude Code, a cobrança por tokens, os planos Team e Enterprise, os créditos de pelo menos US$ 10 mil para organizações Enterprise elegíveis até 15/1/2027 e as falas de Alex Devkar (Carvana) e Vatsal Bhatt (TELUS)."
    verificada: true
  - url: https://claude.com/resources/articles/code-review-is-now-generally-available
    titulo: "Code Review is now generally available"
    sustenta: "Anúncio de 15/10/2026. Sustenta os níveis Quick, Standard e Deep por repositório e as revisões cerca de 3 vezes mais rápidas (de ~20 minutos para 6 a 10 minutos)."
    verificada: true
  - url: https://claude.com/product/claude-ship
    titulo: "Claude Ship | Automate pull requests review and fixes"
    sustenta: "Página do produto. Sustenta as categorias Important, Nit e Pre-existing, o ajuste com REVIEW.md, o modo manual do PR Steward com o comentário @claude steward, a exigência de uma pessoa em código sensível e a ordem de adoção: Code Review, PR Steward e política de aprovação em modo de observação."
    verificada: true
  - url: https://code.claude.com/docs/en/claude-ship
    titulo: "Claude Ship"
    sustenta: "Documentação. Sustenta a adoção de um agente por vez num repositório e a política de aprovação no arquivo .claude/approvals.yml."
    verificada: true
revisado_por: Maurício Yokoyama Issei
revisado_em: 2026-11-25
youtube:
  titulo: "Como o Claude Ship Funciona: Automatize Revisões, Correções e Aprovações de Pull Requests"
  publicado_em: 2026-11-25
  duracao: PT7M26S
  descricao: |-
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
  miniatura: https://i.ytimg.com/vi/N3ioGqXeDZg/maxresdefault.jpg
  visualizacoes: 8
  playlists: []
  legenda: automatica
  links_descricao:
    - https://claude.com/product/claude-ship
    - https://claude.com/resources/articles/introducing-claude-ship
    - https://claude.com/resources/articles/code-review-is-now-generally-available
    - https://code.claude.com/docs/en/claude-ship
  coletado_em: 2026-11-25T02:23:19Z
---

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
