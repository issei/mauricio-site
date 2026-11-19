---
id: iCVD5IVVR2g
slug: o-papel-do-amazon-nova-act-automacao-web-com-agentes-de-ia
status: publicado
temas:
  - engenharia-agentica
  - cloud-e-confiabilidade
resumo: "O vídeo apresenta o Amazon Nova Act, o serviço da AWS para criar e gerenciar frotas de agentes de IA que automatizam fluxos de interface no navegador. Explica por que os scripts tradicionais quebram, o ciclo de desenvolvimento, a intervenção humana com aprovação ou assunção de controle e o preço por hora de agente, que não conta o tempo de espera humana."
fontes:
  - url: https://docs.aws.amazon.com/pt_br/nova-act/
    titulo: "Amazon Nova Act Documentation"
    sustenta: "Define o Amazon Nova Act como um serviço da AWS para quem desenvolve criar e gerenciar frotas de agentes de IA confiáveis que automatizam fluxos de interface de usuário."
    verificada: true
  - url: https://aws.amazon.com/pt/nova/pricing/
    titulo: "Preços do Amazon Nova | AWS"
    sustenta: "Lista os fluxos do Nova Act a US$ 4,75 por hora de agente e informa que, com human-in-the-loop, o tempo de espera pela resposta humana é excluído da hora do agente."
    verificada: true
revisado_por: "Maurício Yokoyama Issei"
revisado_em: 2026-11-19
youtube:
  titulo: "O Papel do Amazon Nova Act: Automação Web com Agentes de IA na AWS"
  publicado_em: 2026-10-18
  duracao: PT7M41S
  descricao: |-
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
  miniatura: https://i.ytimg.com/vi/iCVD5IVVR2g/maxresdefault.jpg
  visualizacoes: 39
  playlists: []
  legenda: automatica
  links_descricao:
    - https://docs.aws.amazon.com/pt_br/nova-act/
    - https://aws.amazon.com/pt/nova/pricing/
  coletado_em: 2026-11-07T22:16:07Z
---
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
