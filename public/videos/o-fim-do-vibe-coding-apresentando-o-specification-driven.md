# O Fim do Vibe Coding! Apresentando o Specification-Driven Development (SDD)

O vídeo curto apresenta o desenvolvimento guiado por especificação (SDD) como resposta aos problemas do vibe coding. Explica a ideia da especificação como planta da casa, as quatro etapas do Spec Kit do GitHub, os ganhos e o custo de manter as especificações em dia.

Vídeo de Maurício Yokoyama Issei, publicado em 3 de dezembro de 2025 (1 min 57 s).
Assistir: https://www.youtube.com/watch?v=nQfTaS__IVA

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## O problema do vibe coding

Segundo o vídeo, o vibe coding prometia agilidade, mas a falta de consistência frustrou muita gente: o resultado impressiona na tela, mas o código tem bugs, é inconsistente e não tem arquitetura [00:00].

O vídeo cita que um quarto das startups da Y Combinator já tinha quase todo o código gerado por IA. A saída proposta é uma abordagem mais estruturada e formal [00:20].

## O que é o SDD

No desenvolvimento guiado por especificação (SDD), a especificação é a planta da casa, e o código é só a construção [00:20].

Se a IA erra, o problema não está no código, mas na especificação, e é lá que se corrige [00:41].

## Como funciona

O vídeo usa o Spec Kit do GitHub como exemplo, com quatro etapas [00:41]:

1. Especificar: o foco é o usuário, o quê e o porquê [01:01].
2. Planejar: o plano técnico para o agente de IA [01:01].
3. Quebrar em tarefas: a IA divide tudo em tarefas pequenas [01:01].
4. Implementar: a IA executa, e quem desenvolve verifica o resultado [01:01].

O SDD não substitui o TDD nem o BDD: ele atua numa camada acima, definindo a intenção do produto [01:01].

## Ganhos e custos

Os times ficam mais alinhados, e a IA gera código mais consistente. Mas o método exige disciplina para escrever boas especificações e mantê-las atualizadas [01:24].

O vídeo deixa uma dúvida: o SDD pode trocar a agilidade por uma burocracia que só parece dar segurança [01:24].

O papel de quem desenvolve muda: de escrever código para arquitetar sistemas e definir a intenção. O futuro talvez seja menos sobre codificar e mais sobre especificar com clareza [01:45].

## Perguntas frequentes

### O SDD substitui o TDD?

Não. Segundo o vídeo, o SDD atua numa camada acima, definindo a intenção do produto [01:01].

### Onde se corrige um erro da IA no SDD?

Na especificação. O código é a construção; a especificação é a planta [00:41].

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Especificação e desenvolvimento](https://mauricio.issei.com.br/temas/especificacao-e-desenvolvimento)

## Sobre o vídeo

O Vibe Coding (desenvolvimento guiado apenas pela intuição e feeling) está com os dias contados! 💀 A promessa de agilidade do código gerado por IA sem estrutura resultou em bugs, inconsistência e arquitetura fraca, levando grandes empresas a repensar suas estratégias.

Neste vídeo, apresentamos o Specification-Driven Development (SDD), a nova abordagem formal e estruturada que está surgindo como resposta ao caos do Vibe Coding.

O que você vai aprender:

O Problema do Vibe Coding [00:05]: Por que a falta de consistência e arquitetura em códigos gerados por IA, guiados por prompts soltos, se tornou um problemão para startups.

O que é o SDD? [00:28]: Entenda como o SDD muda o foco do código para a especificação. Se a IA erra, o erro está na planta da casa, não na construção.

O Fluxo de Trabalho com o SDD [00:49]: Explicamos as 4 etapas da abordagem (como a exemplificada pelo Spec Kit do GitHub): Especificar, Planejar, Quebrar em Tarefas e Implementar.

A Mudança no Papel do Desenvolvedor [01:40]: O futuro é menos sobre escrever código e mais sobre arquitetar sistemas e definir a intenção do produto com clareza.

O SDD não substitui TDD ou BDD; ele age em uma camada superior, definindo a intenção do produto para guiar a Inteligência Artificial na geração de códigos consistentes.

Assista e descubra se o futuro do desenvolvimento de software está em codificar ou em especificar com clareza!

#SDD #SpecificationDrivenDevelopment #VibeCoding #DesenvolvimentoDeSoftware #InteligenciaArtificial #Programação #DevTools #ArquiteturaDeSoftware

## Transcrição

_Transcrição automática, não revisada._

[0:00] O Vibe Coding ficou famoso, né? Mas parece que essa prática pode estar com os dias contados. Bora entender. A promessa era agilidade, mas a verdade é que a falta de consistência frustrou muita gente. Visualmente até impressiona, mas o resultado é um código com bug, inconsistente e sem arquitetura de verdade. E isso virou um problemão. Pensa só, 1/4 das startups da YC já tinha quase todo o código gerado por IA. Aí a ficha caiu. Chega de prompt solto. A saída é ter uma abordagem mais estruturada e mais formal. É aí que entra o SSD. Nele, a especificação é a planta da casa. O código é só a construção. A lógica é essa. Se a IA errou, o problema não está no código, mas na especificação. É lá que se corrige. Beleza? Mas na prática, como funciona? O Spect Kit do GitHub mostra um bom caminho a seguir. Basicamente são quatro etapas. especificar, planejar, quebrar em tarefas e aí sim implementar usando a

[1:01] IA. Primeiro a gente foca no usuário, o que e por quê. Depois vem o plano técnico pro agente de IA. A IA quebra tudo em pequenas tarefas e executa. O papel de quem desenvolve é verificar o resultado. Mas olha, o SDD não substitui TDD ou BDD, tá? Ele age numa camada acima, definindo a intenção do produto. Os benefícios são ótimos, os times ficam mais alinhados e a IA gera um código muito mais consistente. Mas não é moleza, né? Exige disciplina para escrever boas especificações e manter tudo sempre atualizado. Aí fica a pergunta: será que estamos trocando a agilidade por uma burocracia que só parece dar segurança? Com isso, o papel de quem desenvolve muda, de escrever código para arquitetar sistemas e definir a intenção. Isso deixa uma pergunta no ar. Será que o futuro é menos sobre codificar e mais sobre especificar com clareza?
