# SPECS & IA: O Novo Ciclo de Desenvolvimento de Software (Especificação como Diálogo)

O vídeo mostra como a IA muda o desenvolvimento guiado por especificação (SDD): a especificação deixa de ser um contrato rígido e vira um diálogo vivo. Apresenta três níveis de especificação, o ciclo de colaboração com a IA, o uso em código legado e as novas habilidades de quem desenvolve.

Vídeo de Maurício Yokoyama Issei, publicado em 3 de dezembro de 2025 (6 min 56 s).
Assistir: https://www.youtube.com/watch?v=jcFFT-W1vE4

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## Especificação não é volta ao cascata

Com os assistentes de IA para programar, o desenvolvimento guiado por especificação (SDD) voltou, mas de um jeito novo [00:00].

O medo é que escrever especificações seja um retrocesso ao modelo cascata, em que tudo ficava escrito em pedra antes da primeira linha de código [00:20].

A virada está em repensar o que é uma especificação. Antes, era um contrato rígido, e mudar no meio do caminho era falha de planejamento. Com a IA, a spec é um diálogo vivo: ela evolui, e a mudança é aprendizado [00:40].

O objetivo não é congelar o futuro, e sim deixar clara a intenção do momento [01:01].

Segundo o vídeo, no SDD moderno a especificação é um documento vivo, a fonte da verdade que evolui com o projeto e guia diretamente o que a IA implementa. Assim, pessoas e IAs ficam alinhadas o tempo todo [02:03].

## Um cardápio de especificações

Não existe um único jeito de especificar. O nível de detalhe depende da tarefa [02:03]:

- **Nível 1, intenção:** para mudanças rápidas, como um bug ou um botão novo. Diz o porquê e o quê [02:25].
- **Nível 2, plano iterativo:** para a maioria das funcionalidades, como um login novo. Define a estratégia técnica sem a rigidez do cascata [02:25].
- **Nível 3, blueprint:** para sistemas de alto risco, como o núcleo de um sistema bancário. Usa lógica formal [02:47].

A agilidade está em escolher o nível certo para cada trabalho [02:47].

## O ciclo de ouro

O trabalho é uma colaboração constante entre quem desenvolve e o agente de IA [03:09]:

1. começa com a intenção [03:09];
2. a IA propõe um plano [03:09];
3. a pessoa revisa o plano antes de qualquer código ser gerado [03:09];
4. o ajuste volta para a especificação [03:31];
5. com a spec corrigida, a IA implementa de novo [03:31].

A regra de ouro é: não corrija o código, corrija a especificação [03:31]. Assim, a documentação e o sistema nunca se separam, e o manual não fica diferente do software que roda [03:52].

## A IA como arqueóloga de código legado

Em sistemas legados, o SDD talvez mostre seu maior valor: a IA age como arqueóloga de software, e o fluxo vira código, spec, código [04:14].

A IA analisa o código para entender o que ele faz de fato, e não o que a documentação antiga diz. Depois gera uma especificação do comportamento atual, que as pessoas validam e refinam. Com esse mapa, dá para refatorar sem medo de quebrar tudo [04:35].

A memória da aplicação não some quando alguém sai da empresa: o conhecimento que estava na cabeça das pessoas vira um ativo documentado [04:56].

## Novas habilidades

A engenharia de requisitos, antes vista como burocracia, vira uma das habilidades mais valiosas do time [04:56].

Segundo o vídeo, as habilidades-chave são [05:19]:

- design de instrumento: requisitos tão precisos que funcionam como um bisturi na mão da IA [05:19];
- contextualização: dar à IA o mapa do projeto [05:19];
- testabilidade de tudo o que se pede [05:40];
- redução de ambiguidade: quem desenvolve vira um curador de clareza [05:40].

## Trilhos, não muros

A mudança é de uma documentação pesada e prescritiva para uma orientação útil e iterativa. A IA não exige mais burocracia, e sim uma documentação útil: a qualidade da orientação importa mais do que o número de páginas [06:02].

As especificações não são muros que limitam a criatividade, mas trilhos que guiam a IA e o time com velocidade e previsibilidade [06:23].

## Perguntas frequentes

### O SDD é uma volta ao modelo cascata?

Não. Segundo o vídeo, a especificação vira um diálogo vivo, que evolui, e não um contrato rígido [00:40].

### O que fazer quando a IA erra?

Corrigir a especificação, não o código. Assim, a documentação e o sistema não se separam [03:31].

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Especificação e desenvolvimento](https://mauricio.issei.com.br/temas/especificacao-e-desenvolvimento), [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

A Inteligência Artificial vai matar o Desenvolvimento Guiado por Especificações (SDD)? 🤯
Neste vídeo essencial, desmistificamos a relação entre Especificações (Specs) e Inteligência Artificial, mostrando como a IA não nos leva de volta ao modelo em cascata, mas sim transforma as specs em um diálogo flexível e iterativo. Se você é Desenvolvedor, Arquiteto de Software ou Gerente de Produto, este conteúdo é crucial para o futuro da sua carreira.
O que você vai aprender:
Specs como Conversa: Como as especificações evoluem de contratos rígidos para trilhos que guiam a IA, reduzindo a ambiguidade.
O Ciclo de Ouro Humano-IA: Um fluxo de trabalho colaborativo onde o foco é corrigir a especificação, não o código, garantindo que documentação e software estejam sempre sincronizados.
Arqueologia de Software com IA: Descubra como a IA pode ser usada para resgatar conhecimento em códigos legados, transformando o desenvolvimento.
Novas Habilidades Essenciais: Entenda a importância do "design de instrumento" e da redução de ambiguidade para o desenvolvedor moderno.
O futuro do desenvolvimento é colaborativo. Assista agora e prepare-se para dominar o novo paradigma de criação de software com a IA!

#Specs #InteligenciaArtificial #DesenvolvimentoDeSoftware #SDDCycle #ArquiteturaDeSoftware #Desenvolvedor #IAeCodigo #AgileDevelopment #EspecificacaoDeSoftware

## Transcrição

_Transcrição automática, não revisada._

[0:00] E aí, com essa explosão de assistentes de IA para codificar, uma prática que parecia antiga tá voltando com tudo, só que de um jeito completamente novo, o desenvolvimento guiado por especificações ou sdd. Mas calma, antes de pensar em papelada e burocracia, vamos entender como isso tá virando a chave para uma parceria muito mais inteligente entre nós, humanos e as máquinas. Pois é, essa é a pergunta de 1 milhão de dólares, né? É aquele medo que bate em muita gente. A ideia de ter que escrever especificações parece um baita retrocesso, uma volta pro modelo cascata, aquele super inflexível, onde tudo tinha que estar escrito em pedra antes de alguém digitar uma linha de código. Mas será que na era da EA essa história é a mesma? Olha, a grande virada de chave tá aqui. A gente precisa repensar o que é uma especificação. Antigamente era um contrato rígido. Qualquer mudança no meio do caminho era vista como uma falha de planejamento. Hoje, com a IA, as SPECs são diálogo vivo. Elas são flexíveis, elas evoluem. A mudança não é um erro, é aprendizado.

[1:01] O objetivo não é mais congelar o futuro, mas sim é deixar a intenção do momento super clara. Então, que que a gente vai ver hoje? Nosso roteiro é esse aqui. Primeiro vamos quebrar de vez esse mito do modelo cascata. Depois vamos dar uma olhada num cardápio de especificações para ver que não é tudo a mesma coisa. Aí a gente mergulha no ciclo de colaboração com a IA, vê como aplicar isso em código legado, falamos das novas habilidades que a gente vai precisar e por fim damos aquela olhada no futuro iterativo que tudo isso promete. Vamos começar encarando de frente esse tal Pânico do Cascata. a gente entende o receio. Todo mundo já ouviu histórias de documentos gigantes que ninguém lia e que já nasciam desatualizados. Só que o SDD moderno vira esse jogo. A especificação, na verdade, se torna a nossa ferramenta mais ágil para guiar. Ia e o resultado: velocidade e um código muito mais confiável. Tá? Mas então o que é esse SDD de hoje? Pensa nele como um processo onde a especificação é um documento vivo. Ela é a fonte da verdade que vai evoluindo junto com o projeto.

[2:02] Em vez de ser um papel que a gente joga fora, ela se torna executável, ou seja, ela guia diretamente o que a IA vai implementar. A consequência disso é que todo mundo, tanto humanos quanto as IAs, ficam na mesma página o tempo todo. E aqui vem uma das ideias mais legais. Não existe um único jeito de fazer uma especificação. Pensa nisso de verdade como um cardápio. A gente vai escolher o nível de detalhe e formalidade dependendo do prato, ou melhor, da tarefa que a gente tem pela frente. Aí, olha só como esse cardápio funciona. Para uma mudança rápida, um bug, um botão novo, a gente usa o nível um, a intenção. É direto ao ponto, o porqu e o qu. Já pra maioria das features, tipo um sistema de login novo, a gente vai pro nível dois, o plano iterativo. Ele define a estratégia técnica, mas tem aquela rigidez toda do cascata. E aí, para sistemas de altíssimo risco, tipo o núcleo de um sistema bancário, onde errar não é uma opção, a gente usa o nível três, o blueprint, com lógica formal e tudo mais. A agilidade tá exatamente em saber qual ferramenta usar

[3:04] para cada trabalho, beleza? Mas como isso tudo funciona na prática, no dia a dia? É aí que entra o que a gente pode chamar de ciclo de ouro, que é essa dança, essa colaboração constante entre a pessoa que desenvolve e o agente de I. Esse fluxo é o oposto do cascata. A gente começa com a intenção. A Iá, então propõe um plano e aqui, atenção, aqui tá o pulo do gato. A pessoa revisa o plano antes de qualquer código ser gerado. Qualquer feedback, qualquer ajuste, volta para corrigir a especificação. Aí com a spec corrigida, a IA implementa de novo. É um ciclo de aprendizado constante, não uma esteira de produção que só anda pra frente. Não corrija o código, corrija a especificação. Grave essa frase, porque ela é a regra de ouro que sustenta todo esse processo. Por quê? Porque quando a gente corrige a especificação, a gente garante que a documentação e o sistema nunca se separem. A fonte da verdade tá sempre atualizada. a gente acaba com aquele

[4:05] problema clássico do manual que não tem nada a ver com o software que tá rodando. E você pode estar pensando, tá legal para projeto novo, mas é aquele projeto legado que ninguém aguenta mais mexer, pois é aí que o SSD talvez mostre o seu maior valor. Nesses casos, a IA age como uma verdadeira arqueóloga de software. Nesse cenário, a gente inverte o jogo. O fluxo é código, spec, código. Aá primeiro analisa o código que já existe para entender o que ele realmente faz. não que a documentação antiga diz que ele fazia. A partir daí, ela gera uma especificação do comportamento atual. A gente, como humanos, validamos e refinamos essa spec. E com esse mapa preciso em mãos, a gente consegue finalmente refatorar e evoluir o sistema sem aquele medo de quebrar tudo. E isso tem um impacto cultural gigantesco. Pensa só, a memória da aplicação não morre mais quando um dev sai da empresa. A IA consegue transformar aquele conhecimento que estava só na cabeça das pessoas em um ativo documentado, vivo. Isso permite modernizar sistemas antigos com uma segurança que, sinceramente, era

[5:06] impensável até pouco tempo atrás. OK? Se o processo muda, o nosso papel como desenvolvedores também precisa evoluir, certo? A engenharia de requisitos, que às vezes era vista como uma tarefa chata, burocrática, se torna talvez a habilidade mais criativa e valiosa do time. O nosso valor vai muito além de só saber codificar. Habilidade chave passa a ser o que a gente pode chamar de design de instrumento, criar requisitos tão precisos que eles funcionem como um bisturi na mão da IA. Outra é a contextualização. Saber dar o mapa do projeto para IA não se perder. é garantir a testabilidade de tudo que a gente pede e, principalmente, se tornar um especialista em redução de ambiguidade. A gente vira um curador de clareza. Então, no final do dia, para onde tudo isso tá nos levando? Há uma mudança de mentalidade fundamental. A gente tá saindo de um mundo de documentação pesada, prescritiva para um mundo de orientação útil e iterativa. A conclusão é muito simples, mas muito poderosa. Aia não nos obriga a criar

[6:07] mais burocracia. Muito pelo contrário, ele exige uma documentação que seja útil de verdade, que sirva como um guia claro e vivo. A qualidade da orientação que a gente dá importa muito mais do que a quantidade de páginas escritas. E essa é a metáfora perfeita pra gente fechar. As especificações não são mais aqueles muros que limitam a criatividade ou atrasam o projeto. Elas são os trilhos que guiam a IA e o time, permitindo que a gente se mova com velocidade, com previsibilidade e em evolução constante, sem nunca mais cair na armadilharia do modelo cascata. Então, a provocação que fica é essa. Como é que a gente pode começar a ter conversas melhores, mais produtivas com os nossos assistentes de IA? Porque no fundo o futuro da nossa profissão pode depender da qualidade dessa resposta.
