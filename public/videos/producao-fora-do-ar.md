# Produção Fora do Ar

Vídeo de Maurício Yokoyama Issei, publicado em 4 de fevereiro de 2026 (9 min).
Assistir: https://www.youtube.com/watch?v=-t8RfEvirds

Assuntos: [Cloud e confiabilidade](https://mauricio.issei.com.br/temas/cloud-e-confiabilidade)

## Sobre o vídeo

Neste vídeo, você vai aprender como atuar na sustentação de sistemas em produção de maneira profissional, estruturada e alinhada às melhores práticas de mercado, como SRE (Site Reliability Engineering) e ITIL.

O conteúdo é voltado especialmente para desenvolvedores juniores e plenos, mas também é extremamente útil para analistas, tech leads e profissionais que participam de on-call, suporte ou resposta a incidentes.

📌 O que você vai aprender neste vídeo:

Como reagir corretamente a alarmes de monitoração
Como tratar reclamações de usuários de forma técnica e empática
Como identificar rapidamente se o problema é pontual ou generalizado
Como classificar incidentes (SEV1–SEV4) e priorizar ações
Boas práticas de comunicação durante incidentes
Como conduzir troubleshooting sob pressão
Diferença entre workaround, mitigação, hotfix e solução definitiva
Conceitos como blast radius, MTTR, MTTA, SLO e error budget
Importância de runbooks, playbooks e postmortem blameless

🎯 Objetivo do vídeo:
Ajudar times a saírem do modo “apagar incêndio” e evoluírem para uma atuação madura, previsível e confiável em produção — reduzindo impacto no negócio e aumentando a confiança do time.

👨‍💻 Se você tem responsabilidade e possui ambientes críticos em produção
esse vídeo é para você.

#SRE #ProductionSupport #Sustentação #DevOps #IncidentManagement #TI #EngenhariaDeSoftware #Confiabilidade #OnCall

## Transcrição

_Transcrição automática, não revisada._

[0:00] Sabe aquela sensação quando um sistema crítico para, o tempo vira o inimigo? Cada segundo de natividade impacta clientes, receita, reputação. Essa análise aqui não é só sobrepagar incêndios, não. É, na verdade, um guia de sobrevivência e aprendizado, tanto pros times de engenharia quanto pras lideranças de negócio. A ideia é mostrar como transformar o caos de uma queda em produção numa oportunidade para fortalecer o sistema. Essa citação do Santaana é basicamente o pilar do que chamamos de engenharia de confiabilidade de sites ou sre. No nosso mundo, isso significa uma coisa muito clara. O incidente que acontece duas vezes já deixou de ser um bug e virou um problema de processo. O objetivo final nunca é ter zero falhas. Isso é uma utopia. A meta real é garantir que a gente nunca cometa o mesmo erro duas vezes. Então, a gente vai percorrer as seis fases do ciclo de vida de um incidente. Pense nisso como a jornada de uma equipe de resposta, desde o primeiro sinal de fumaça até a reconstrução, garantindo que no final a estrutura toda fique mais

[1:01] forte do que era antes. E tudo começa aqui, não com telefonema, mas com um pulso eletrônico frio e impessoal, um alerta automático que dispara no slack, um pager que vibra no meio da madrugada e pronto, o relógio começa a contar. A calma e a precisão nesses primeiros minutos definem se o incidente vai ser resolvido em instantes ou se vai virar uma crise de horas. Aqui a gente vê o inimigo silencioso da detecção proativa, a fadiga de alerta. Imagina sua equipe receber 300 alertas por dia sobre picos de CPU que se resolvem sozinhos. Inevitavelmente, as pessoas começam a ignorar. E aí que mora o perigo. No meio de todo esse ruído, aquele alerta realmente crítico sobre a falha no gateway de pagamento pode passar totalmente despercebido. A grande lição que a SRE do Google nos ensina é esta: alerte sobre a dor do usuário, não sobre a dor do servidor. Um pico de CPU é um problema do sistema, ok? Mas uma falha na finalização da compra, isso é um

[2:02] problema do negócio. A prioridade tem que ser os alertas que medem a experiência real do cliente, como latência, taxa de erros e saturação dos serviços. OK? O alerta foi confirmado. A primeira ação é dar o nome ao tamanho do problema. A matriz CEV ou nível de severidade é linguagem comum que a linha engenharia, produto e liderança. Um CV1 significa a casa tá pegando fogo e exige uma resposta de todos apostos em menos de 5 minutos 24x7. Já um CEV 4, bom, é um problema menor que pode esperar o próximo ciclo de desenvolvimento. Mas nem sempre o primeiro sinal de fumaça vem dos nossos sistemas. Às vezes ele vem de um ser humano frustrado. O relato de um usuário é um tipo de alarme completamente diferente e muitas vezes ele revela falhas bem sutis que os nossos dashboards, todos verdinhos, jamais conseguiriam detectar. Essa imagem aqui mostra bem a diferença. O monitoramento

[3:03] é proativo, se baseia em dados objetivos, como métricas de latência. Já o relato do usuário é reativo e subjetivo. Ele serve como um lembrate de que mesmo com todos os nossos dashboards no verde, a experiência percebida pelo cliente pode estar completamente quebrada. É isso que a equipe de suporte recebe, uma mensagem vaga, carregada de emoção e que, do ponto de vista técnico, é praticamente inútil. O papel crucial da equipe de sustentação aqui é atuar como um detetive, um tradutor, transformando essa frustração em um relatório de bug que a engenharia possa de fato resolver. E para fazer essa tradução, a gente segue um processo rigoroso. Primeiro, os fatos: o que, quando, onde e quem foi afetado. Em seguida, pedimos os passos exatos para reproduzir o erro, como se fosse uma receita de bolo. E o mais importante, pedimos evidências. Screenshots, vídeos, logs. É isso que transforma um não funciona em um bug report completo,

[4:04] sempre com cuidado de anonimizar qualquer dado pessoal do usuário. Com o incidente confirmado, seja por um alerta ou por um usuário, a próxima pergunta é: Quão grande é o estrago? Entender a escala do impacto é a prioridade número um para a equipe de triagem. O termo raio de explosão ou blast radius vem da engenharia militar e a analogia é perfeita. O problema tá contido em um único usuário ou ele se espalhou para um grupo, uma região inteira, ou, no pior cenário, para toda a base de clientes. A resposta a essa pergunta determina se vamos combater um incêndio com um copo d'água ou se precisamos chamar todos os bombeiros da cidade. Uma das técnicas de diagnóstico mais poderosas que existem é a correlação de eventos. A pergunta a ser feita é: o que mudou no sistema nos últimos minutos ou horas? Um novo deploy, uma alteração de configuração, uma mudança em uma feature flag. Como a gente vê nesta linha do tempo, alinhar o início do incidente com o cronograma de mudanças do sistemas geralmente aponta direto paraa causa raiz. Em um incidente

[5:05] de alta severidade, o caos pode se instalar muito rápido. Dezenas de pessoas em uma chamada, todo mundo falando ao mesmo tempo. A única solução para isso é uma estrutura clara de comando e comunicação. Todos precisam saber exatamente qual é o seu papel e o que se espera de cada um. Frameworks como IT e o modelo SRE do Google definem papéis muito claros. O comandante do incidente não escreve código. Ele ou ela coordena a resposta e protege a equipe de distrações. O líder técnico foca em resolver o problema. O gerente de comunicação atua como a ponte com o resto da empresa e o escriba tem o papel crucial de documentar tudo paraa análise pós-morta. Cada um na sua função, trabalhando em sincronia. A comunicação externa inicial é um passo fundamental para manter a confiança dos stakeholders. A mensagem não precisa conter a solução, mas precisa fazer três coisas: reconhecer o problema, confirmar que estamos investigando e, o mais importante, definir uma expectativa clara paraa próxima atualização. Isso reduz a ansiedade e evita que a equipe

[6:07] de engenharia seja interrompida a cada 5 minutos. Com a situação estabilizada e a comunicação fluindo, o foco total se volta paraa remediação. Mas sob a pressão do relógio, a tentação de tomar atalhos é enorme. O objetivo aqui é escolher a solução certa pro momento certo, evitando que uma ação apressada piore ainda mais a situação. Aqui temos o contraste entre duas filosofias. De um lado, a abordagem estruturada baseada em hipóteses, evidências e colaboração. Do outro, o cowboy coding, o antipadrão onde um engenheiro age sozinho sem revisão, aplicando uma correção diretamente em produção. Pode parecer mais rápido no momento, mas introduz um risco sistêmico gigantesco. É fundamental entender que nem toda solução é uma correção definitiva. Em um incidente grave, a prioridade é restaurar o serviço. Isso pode significar uma mitigação rápida, como reiniciar um servidor para limpar a memória, ou um work around como desabilitar temporariamente uma feature

[7:07] não essencial. A correção da causa raiz, essa virá depois. O importante é entender o tradeoff entre velocidade, risco e eficácia para cada decisão. O serviço está online, os clientes estão felizes, mas o trabalho ainda não terminou. Na verdade, a parte mais importante está apenas começando. O incidente só termina de verdade quando as lições são aprendidas e o sistema se torna mais forte por causa dele. A petra fundamental desse processo de aprendizado é a cultura do postm sem culpa. A premissa é simples, mas poderosa. Engenheiros bem intencionados podem cometer erros, mas a verdadeira falha está nos sistemas e processos que permitiram que esse erro chegasse à produção. Ao remover o medo da culpa, a gente cria um ambiente de segurança psicológica, onde todos podem contribuir honestamente para encontrar as falhas sistêmicas. Isso nos leva a uma questão que define toda a cultura de uma organização de engenharia. Depois que a poeira baixa e o serviço está estável, qual é a pergunta mais importante que

[8:09] devemos fazer? E a resposta é esta: a pergunta nunca deve ser quem errou. A pergunta deve ser o que no nosso sistema permitiu que este erro acontecesse? Foi uma falha na revisão de código, uma lacuna na nossa monitoração, um processo de deploy arriscado. É aí que estão as verdadeiras oportunidades de melhoria que evitam que o mesmo tipo de incidente aconteça novamente. E para encerrar, fica esta reflexão para cada um levar paraa sua equipe. O último incidente que vocês tiveram tornou o sistema mais forte ou a mesma bomba relógio tá apenas esperando para explodir de novo? Cada incidente é uma oportunidade caríssima de aprendizado. Aproveitá-la é o que diferencia equipes que apenas sobrevivem de equipes que constróem sistemas verdadeiramente resilientes e confiáveis.
