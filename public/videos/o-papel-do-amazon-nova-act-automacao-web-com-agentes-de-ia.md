# O Papel do Amazon Nova Act: Automação Web com Agentes de IA na AWS

O vídeo apresenta o Amazon Nova Act, o serviço da AWS para criar e gerenciar frotas de agentes de IA que automatizam fluxos de interface no navegador. Explica por que os scripts tradicionais quebram, o ciclo de desenvolvimento, a intervenção humana com aprovação ou assunção de controle e o preço por hora de agente, que não conta o tempo de espera humana.

Vídeo de Maurício Yokoyama Issei, publicado em 18 de outubro de 2026 (7 min 41 s).
Assistir: https://www.youtube.com/watch?v=iCVD5IVVR2g

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## Automação web que não quebra

O vídeo trata da automação de interfaces web, uma área que costuma dar dor de cabeça às equipes de engenharia. O foco é o papel do Amazon Nova Act na passagem de regras rígidas de navegação para algo mais adaptável [00:00].

A pergunta central é como tornar a automação web resiliente. O problema nunca foi escrever o script, mas mantê-lo funcionando: qualquer mudança na página quebrava tudo, como um castelo de cartas numa mesa bamba [00:21].

O roteiro passa pela automação tradicional, pelo papel do Nova Act, pela jornada de desenvolvimento, pela intervenção humana e pelas aplicações e custos [00:41].

## As dores da automação tradicional

Os scripts tradicionais são frágeis. Os layouts mudam o tempo todo: um botão se move um pixel, uma classe muda de nome, e o teste inteiro falha [01:04].

Isso consome a energia das equipes, pesa nos testes de QA e obriga a caçar documentação para manter tudo em ordem. O modelo não escala com a web dinâmica de hoje [01:25].

## O que é o Nova Act

O Amazon Nova Act é um serviço da AWS para quem desenvolve criar e gerenciar frotas de agentes de IA confiáveis, que automatizam fluxos de interface [01:46].

A palavra-chave é frota: não se trata de automatizar um clique, mas de orquestrar muitos agentes e escalar a operação para o nível corporativo [01:46].

Segundo o vídeo, o motor é o Amazon Nova 2 Lite, um modelo customizado para navegar na web e chamar APIs de forma rápida e barata. Ele entende o contexto de uma interface, sem regras fixas dizendo onde clicar [02:07].

Segundo o vídeo, a AWS informa uma confiabilidade acima de 90% em larga escala, o que transforma um processo frágil num processo pronto para produção [02:28].

## A jornada de desenvolvimento

A AWS desenhou um caminho de quatro passos [03:10]:

1. Testar ideias no Playground web [03:10].
2. Desenvolver localmente, no ambiente de costume [03:10].
3. Implantar na nuvem da AWS [03:10].
4. Revisar as execuções no painel do serviço [03:10].

No SDK em Python, a linguagem natural se mistura com o código. Num decorador de autenticação, por exemplo, dá para juntar lógica rígida, como injetar um token de acesso, com instruções em texto simples [03:31].

Segundo o vídeo, extensões de IDE com IA, para Kiro, VS Code e Cursor, transformam um pedido em linguagem natural em código Python pronto [03:52].

Para observabilidade, o console traz o rastreamento completo das execuções. Segundo o vídeo, dá para assistir ao vivo ao navegador operado pela IA, graças ao AgentCore, além de acessar logs no S3 e capturas de tela [04:33].

## O toque humano

A integração com pessoas (human-in-the-loop) tem dois padrões [04:55]:

- Aprovação humana: alguém revisa e aprova as ações propostas pelo agente antes de uma execução crítica [04:55].
- Assunção de controle da interface: o fluxo pausa, uma pessoa assume o navegador, resolve um CAPTCHA ou digita uma senha sensível e devolve o controle ao agente [05:17].

O detalhe de negócio: o tempo em que o sistema espera uma resposta humana não entra na conta. É como um taxímetro que para, e por isso as pausas de segurança não geram custo ocioso [05:17].

## Aplicações e custos

Um caso de uso é a inteligência de preços no varejo. Monitorar a concorrência sempre foi difícil, porque as lojas mudam o layout e quebram os rastreadores; o Nova Act lida com essas mudanças [05:59].

Outros casos são testes de qualidade web, extração de dados de sistemas legados e fluxos de compra com muitas etapas [05:59].

O preço divulgado é de US$ 4,75 por hora de agente, contando só as horas ativas [06:21]. Comparado às horas gastas consertando scripts quebrados, o vídeo considera o valor competitivo [06:42].

O Nova Act também se integra ao framework de agentes Strands. A automação visual vira uma habilidade entre outras, num ecossistema de agentes que resolvem fluxos complexos [06:42].

## O fim do script quebrado

A reflexão final: agentes confiáveis e resilientes vão mudar os gargalos operacionais de hoje. Não precisar consertar um script porque alguém mudou a cor de um botão é, segundo o vídeo, o começo de uma nova fase da automação web [07:03].

## Perguntas frequentes

### Quanto custa o Amazon Nova Act?

US$ 4,75 por hora de agente, contando só o tempo ativo. A espera por uma resposta humana não é cobrada [06:21].

### Como o Nova Act lida com CAPTCHA e login?

Pela assunção de controle: o fluxo pausa, uma pessoa resolve a etapa no navegador e devolve o controle ao agente [05:17].

## Fontes

- [Amazon Nova Act Documentation](https://docs.aws.amazon.com/pt_br/nova-act/): Define o Amazon Nova Act como um serviço da AWS para quem desenvolve criar e gerenciar frotas de agentes de IA confiáveis que automatizam fluxos de interface de usuário.
- [Preços do Amazon Nova | AWS](https://aws.amazon.com/pt/nova/pricing/): Lista os fluxos do Nova Act a US$ 4,75 por hora de agente e informa que, com human-in-the-loop, o tempo de espera pela resposta humana é excluído da hora do agente.

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Cloud e confiabilidade](https://mauricio.issei.com.br/temas/cloud-e-confiabilidade)

## Sobre o vídeo

Neste vídeo, exploramos **O Papel do Amazon Nova Act**, o serviço da AWS desenvolvido para criar, implantar e gerenciar frotas de agentes de IA focados na automação de fluxos de interface de usuário (UI) no navegador. 

Aprenda como o Nova Act combina a flexibilidade de instruções em linguagem natural com código Python para automatizar tarefas repetitivas e complexas, como entrada e extração de dados, testes de QA e fluxos de checkout.

📌 **O que você vai conferir neste vídeo:**
- **O que é o Amazon Nova Act:** Uma solução verticalmente integrada para automação de navegador com alta confiabilidade e execução em escala.
- **Arquitetura e Confiabilidade:** Treinamento dos modelos em ambientes simulados (*web gyms*) para garantir altas taxas de conclusão mesmo em sites dinâmicos.
- **Human-in-the-Loop (HITL):** Como o serviço permite intervenção humana em tempo real (*UI takeover*) ou aprovação assíncrona para resolver CAPTCHAs e etapas de login.
- **Integrações Avançadas:** Conexão com APIs externas, suporte ao protocolo MCP e integração nativa com o framework *Strands Agents* e o *Amazon Bedrock AgentCore*.
- **Preços e Custos na AWS:** Entenda o modelo tarifário baseado em tempo real de execução (**US\$ 4,75 por hora de agente**), com isenção de cobrança no tempo de espera por intervenções humanas.

🔗 **Recursos e Links Úteis:**
- Documentação Oficial do Amazon Nova Act: https://docs.aws.amazon.com/pt_br/nova-act/
- Tabela Oficial de Preços da AWS : https://aws.amazon.com/pt/nova/pricing/


#AWS #AmazonNova #NovaAct #AIAgents #InteligenciaArtificial #AutomacaoWeb #Python #CloudComputing #Bedrock

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olá, pessoal, e bem-vindos a mais uma apresentação. Hoje a gente vai direto ao ponto em uma área que, vamos ser sincero, já causou muita dor de cabeça e noites mal dormidas pras equipes de engenharia por aí. A automação de interfaces de usuário na web. E o nosso grande foco de hoje é o papel do Novact. É simplesmente fascinante ver como a gente saiu daquela era de regras super rígidas de navegação para algo muito mais inteligente e adaptável. Bom, vamos mergulhar nisso. A pergunta de 1 milhão de dólares no desenvolvimento sempre foi: como a gente torna a automação web verdadeiramente resiliente? Porque historicamente o problema nunca foi escrever o script em si, mas sim manter o bendito funcionando, certo? Qualquer mudançazinha no código da página e bum, tudo parava de funcionar de forma abrupta. Era literalmente como montar um castelo de cartas em cima de uma mesa bamba, um ciclo sem fim de manutenção. Para entender como resolver isso, a nossa jornada hoje vai ser a seguinte. Vamos passar pela automação tradicional, entender o papel do Nova Act, ver a jornada de desenvolvimento, falar sobre o toque humano e, por fim, fechar com as

[1:01] aplicações reais e os custos. Então, começando pela nossa primeira sessão, automação tradicional de interfaces e os seus pontos de dor. Olha, o nível de exaustão técnica com os métodos antigos é altíssimo. O pessoal de desenvolvimento sabe bem o que é lidar com a fragilidade extrema dos scripts. Os layouts mudam o tempo todo, certo? Um botão muda um pixel pro lado, uma classe muda de nome e de repente o teste inteiro simplesmente falha miseravelmente. Isso suga uma energia gigantesca das equipes, criando um peso enorme pros testes de K. E nem me falem do tempo perdido caçando documentação pesada só para tentar manter a casa em ordem. Simplesmente é um modelo que não escala com a internet super dinâmica que a gente tem hoje. O que nos leva à sessão dois, o papel do Nova Act, que representa uma verdadeira mudança de paradigma. O conceito chave aqui é o seguinte. O Amazon Nova Act é um serviço da AWS construído para que quem desenvolve consiga criar e gerenciar frotas de agentes de IA super confiáveis para automatizar fluxos de interface. E

[2:01] a palavra-chave aqui é frota. Não estamos falando de automatizar um clique aqui e ali. Estamos falando da capacidade incrível de orquestrar e gerenciar um exército inteiro desses agentes, escalando as operações pro nível corporativo sem sóar a camisa. E o que faz a mágica acontecer por baixo dos panos é o motor disso tudo, o Amazon Nova 2 Lite. Esse é um modelo customizado, construído do zero, com um propósito muito claro, navegar na web e fazer chamadas de APIs de um jeito super rápido e barato. Ele já entende o contexto de como uma interface funciona no mundo real, ou seja, a gente não precisa mais daquelas regras absolutas dizendo exatamente onde clicar a cada milissegundo. Isso ilustra brilhantemente o impacto dessa arquitetura. Segundo a AWS, essa integração chega a uma taxa de confiabilidade impressionante de mais de 90% em larga escala. Pessoal, para quem tá acostumado com a instabilidade do passado, isso é um salto absurdo. Transforma um processo que sempre foi super frágil em uma máquina altamente confiável e definitivamente pronta para

[3:03] o uso no mundo real. Avançando paraa sessão três, a jornada de desenvolvimento e sua execução perfeita. A AWS desenhou um caminho super direto de quatro passos para simplificar todo o ciclo de vida. Você começa brincando no Playground Web, testando ideias rapidamente e sem burocracia. Depois passa pro desenvolvimento local no ambiente que você já conhece. O terceiro passo é implantar isso lá na nuvem da AWS. E para fechar, você revisa todas as execuções direto no painel deles, só para garantir que a operação siga exatamente como planejado. Agora, o que é muito legal de ver na prática é como a linguagem natural se mistura de maneira totalmente fluída com o código tradicional. Olhando para esse decorador de autenticação no SDK em Python, dá para perceber a flexibilidade da coisa. Você pode juntar aquela lógica dura e rigorosa de programação, tipo injetar um token de acesso com instruções super simples em texto, descrevendo o que você quer que aconteça. É literalmente o controle total nas mãos de quem tá programando. E para acelerar ainda mais o processo, o contraste entre o velho e

[4:04] o novo é gritante. Em vez de ficar escrevendo código repetitivo do zero ou vasculhar páginas intermináveis de documentação, agora a gente tem extensões de IDE alimentadas por IA. ferramentas que integram com o Kiru, VS Code e Cursor pegam um prompt em linguagem natural e transformam em código Python prontinho paraa produção. É só falar o objetivo final e a extensão monta a lógica para você ali mesmo no seu ambiente. E na hora de monitorar se tudo tá dando certo, o nível de observabilidade é fora de série. O console da AWS te dá rastreamentos completíssimos da execução, mas o mais impressionante, você pode assistir a uma transmissão ao vivo do navegador sendo operado de forma autônoma pela IA, graças ao agent core. Imagina um salto em transparência. Junta isso com o acesso direto a logs no S3 e capturas de tela dos processos e entender exatamente como a gente tomou uma decisão vira algo super visual e intuitivo. Chegamos na sessão 4, o toque humano ou a famosa integração HITl. É aqui que a tecnologia traz as

[5:05] garantias necessárias com dois padrões de segurança que são sensacionais. O primeiro é a aprovação humana, onde alguém revisa e dá o OK nas ações propostas pelo agente antes de qualquer execução mais crítica. O segundo é a assunção de controle da interface. Basicamente, o fluxo do agente pausa. Um humano assume o controle do navegador rapidinho, resolve aquele capta bloqueador ou digita uma senha super sensível e depois devolve o volante para ia terminar o serviço. Perfeito, não é? Então, o detalhe crucial do ponto de vista de negócios é essa questão do faturamento. O tempo que o sistema fica parado esperando uma resposta humana durante esses fluxos não entra na conta, né? É isso mesmo. É como se o taxímetro parasse. É uma nuance técnica e financeira brilhante, garantindo que colocar pausas de segurança no processo não vai gerar custos ociosos e injustificáveis. E para fechar, sessão cinco, aplicações no mundo real e custos. É nos casos de uso que a gente vê onde o impacto é real. Pensa na inteligência de preços competitivos. No varejo,

[6:06] monitorar a concorrência sempre foi um pesadelo, porque as lojas mudam o layout toda hora, quebrando os rastreadores. O Nova Act lida com essas mudanças visuais em tempo real, sem quebrar. Adiciona isso, os testes de qualidade web incansáveis, extração maciça de dados em sistemas legados e até fluxos de compra cheios de etapas. O que antes era super rígido, agora simplesmente se adapta. E falando do investimento, a métrica de precificação divulgada é de 4.75 por hora de agente. E lembrando, são horas ativas e reais de trabalho, sem pagar por tempo ocioso. Se a gente colocar na ponta do lápis as incontáveis horas que as equipes gastavam só com manutenção manual de script quebrado, esse valor se mostra absurdamente competitivo. Vamos avançar e ver como isso se expande para uma figura maior. O Nova Act não precisa atuar como uma ferramenta isolada. Ele se integra de forma nativa ao framework de agentes Strands. Isso significa que a automação visual de interfaces pode ser só mais uma das habilidades dentro de um ecossistema gigante de IAS, todas

[7:06] colaborando para resolver fluxos operacionais super complexos nas empresas. O que nos traz ao final da nossa exploração de hoje, e a reflexão que fica no ar pra gente pensar é a seguinte: com a chegada de agentes de IA tão confiáveis e resilientes vai transformar os gargalos operacionais que temos hoje? A promessa de não precisar mais correr para consertar um script só porque alguém mudou a cor de um botão não é apenas um alívio imediato. Na verdade, é o começo de uma era totalmente nova na engenharia de software e na automação web. Muito obrigada por acompanharem mais essa análise com a gente e até a próxima.
