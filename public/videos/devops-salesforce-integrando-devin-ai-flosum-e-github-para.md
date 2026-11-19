# DevOps Salesforce: Integrando Devin AI, Flosum e GitHub para Rastreabilidade Total

O vídeo mostra uma esteira de DevOps para Salesforce que junta o Devin, um agente de IA que programa no GitHub, com a governança do Flosum. Explica os componentes, o formato SFDX, o ciclo de uma tarefa até a revisão humana, o Smart Merge e por onde começar com baixo risco.

Vídeo de Maurício Yokoyama Issei, publicado em 6 de março de 2026 (6 min 36 s).
Assistir: https://www.youtube.com/watch?v=IhUUpLGyIpA

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## Velocidade com governança

O vídeo trata de um desafio do ecossistema Salesforce: aproveitar a velocidade de um desenvolvedor de IA que trabalha sem parar e, ao mesmo tempo, garantir que cada linha de código passe pelos filtros de conformidade, segurança e auditoria [00:22].

A resposta é um modelo híbrido, em que cada ferramenta faz o que sabe melhor [00:43]:

- o GitHub é a oficina do Devin, onde a criação autônoma acontece com foco em velocidade [00:43];
- o Flosum é a torre de controle: gerencia a entrega e garante que o que sai da oficina chegue à produção de forma segura, auditada e sem conflitos [01:04].

A ideia não é abrir mão do controle, e sim acelerar o desenvolvimento com IA dentro de um framework de governança [01:25].

## A arquitetura

São três componentes [02:05]:

- **Flosum:** roda de forma nativa no Salesforce e orquestra a governança: fluxo, permissões e conformidade [02:26];
- **Devin:** o engenheiro autônomo, que opera só no GitHub [02:26];
- **Flosum Cloud Agent:** um middleware que faz a ponte entre os dois ambientes [02:26].

O pré-requisito mais importante é o formato Salesforce DX (SFDX). O vídeo compara o metadado antigo a um livro sem capítulos, um bloco de texto difícil para a IA. O SFDX divide esse livro em capítulos e parágrafos, e o Devin acha e edita o componente exato, como uma classe Apex ou um LWC [02:48].

## O Devin em ação

O ciclo de uma tarefa [03:09]:

1. A tarefa é delegada ao Devin [03:09].
2. Ele se isola numa feature branch [03:09].
3. Cria uma scratch org, um ambiente de desenvolvimento temporário e descartável [03:29].
4. Codifica, roda os testes até atingir a cobertura mínima e se corrige [03:29].
5. Abre um pull request detalhado para um engenheiro sênior revisar [03:29].

O vídeo resume assim: a IA trabalha, o humano governa [03:29].

## O Flosum assume o controle

Depois que a revisão humana aprova o código, o evento de merge no GitHub dispara a esteira de governança automatizada do Flosum. A partir dali, não há mais intervenção humana [03:51].

O Git tradicional vê os arquivos XML do Salesforce como texto e gera muitos falsos conflitos. O Smart Merge do Flosum entende a estrutura do Salesforce e resolve conflitos em metadados complexos, como perfis [04:12].

O fluxo segue sozinho: o Cloud Agent sincroniza a mudança do GitHub, o Smart Merge resolve os conflitos, o código vai para a branch do Flosum, que é a fonte da verdade da produção, e o pipeline promove a mudança pelos ambientes e gera um ID de deploy para a auditoria [04:33].

## Por onde começar

A recomendação é começar por tarefas "amplas e rasas", de alto valor e baixo risco: criar centenas de testes unitários, limpar dívida técnica ou modernizar componentes para LWC [04:55].

Essas tarefas têm alto volume e valor técnico, mas raramente tocam a lógica de negócio principal [05:16].

Nessa arquitetura, a governança é programada, não opcional: está no código de cada etapa, da revisão humana obrigatória no GitHub ao último passo do deploy [05:39].

Num arquivo de texto, dá para proibir o Devin de fazer deploy em produção ou de mexer em metadados sensíveis [05:59].

## Perguntas frequentes

### Por que o formato SFDX é obrigatório?

Porque ele divide os metadados em partes pequenas, e o Devin consegue achar e editar o componente exato [02:48].

### Onde termina o trabalho humano?

Na revisão e no merge do pull request no GitHub. Dali em diante, a esteira do Flosum é automática [03:51].

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Salesforce e vendas](https://mauricio.issei.com.br/temas/salesforce-e-vendas)

## Sobre o vídeo

Você está pronto para elevar a maturidade do seu DevOps Salesforce para o próximo nível? 🚀

Neste vídeo, mergulhamos na arquitetura de uma esteira híbrida de CI/CD que une a governança nativa do Flosum, o poder de auditoria do GitHub e a autonomia revolucionária do Devin AI.

Aprenda como configurar um pipeline onde cada deploy em produção gera automaticamente um histórico auditável e rastreável, garantindo conformidade com normas como SOX, HIPAA e GDPR.

O que você vai aprender:
 
Arquitetura de Sincronização: Como o Flosum Cloud Agent estabelece a ponte entre o repositório nativo Salesforce e o GitHub Enterprise.
Devin AI no Ciclo de Vida: Veja como delegar tarefas de refatoração, correção de bugs e aumento de cobertura de testes (Apex) para o primeiro engenheiro de software de IA do mundo.
Rastreabilidade Ponta a Ponta: O fluxo Deploy → Commit → Git Sync → Push que mantém seu código de produção sempre espelhado e seguro.
Governança e IA: Como manter o controle e a segurança enquanto agentes autônomos operam em suas Feature Branches.

#Salesforce #DevOps #DevinAI #Flosum #GitHub #CI/CD #ArtificialIntelligence #CloudComputing

## Transcrição

_Transcrição automática, não revisada._

[0:00] Pensa só num desenvolvedor que codifica 24x7 sem nunca se cansar. Agora imagina conectar essa velocidade toda, essa inteligência artificial direto na sua esteira de DevOps eos force, mas com total segurança e governança. Pois é exatamente essa arquitetura revolucionária que a gente vai desvendar hoje, a fusão entre um agente de a autônomo e um controle de nível corporativo. Então a gente chega na grande pergunta, né? O desafio que todo mundo no ecossistema Seus Force enfrenta. Como é que se pega a velocidade absurda de um desenvolvedor de IA que trabalha sem parar e ao mesmo tempo garante que cada linha de código passe por todos os filtros de conformidade, segurança e auditoria que o mundo corporativo exige. A resposta tá num modelo híbrido, onde cada ferramenta faz o que sabe de melhor. Pensa no GitHub como oficina de altíssima tecnologia do Devin. É lá que a mágica da criação autônoma acontece com foco total em velocidade. Já o

[1:00] flusson, ah, o flusson é a torre de controle, o centro de comando que gerencia a entrega, garantindo que tudo que sai da oficina chegue em produção de forma segura, auditada e sem conflitos. Bom, vamos seguir uma jornada bem clara aqui. Primeiro a gente vai entender a visão geral, depois mergulhamos na arquitetura que conecta tudo. Na sequência vamos ver o Devin em ação e como o Flowson assume o controle. E para fechar, vamos ver como começar a usar isso de forma inteligente e, claro, segura. Certo? Vamos direto ao ponto. A ideia aqui não é abrir mão do controle, muito pelo contrário, é sobre turbinar a velocidade do desenvolvimento com IA, mas mantendo essa força toda dentro de um framework de governança que garante que cada entrega seja segura, controlada e no final perfeita. E essa analogia é perfeita. O Flowolusum é o sistema nervoso central de toda a operação de DevOps. Ele controla o fluxo, as permissões e a conformidade lá dentro do Seos Force. O Deven, por sua vez, é como um engenheiro especialista na sua

[2:01] própria oficina lá no GitHub, recebendo tarefas específicas e entregando um trabalho de altíssima qualidade paraa revisão. Agora vamos pra arquitetura para ver como essa comunicação acontece na prática. Para que esses dois munos conversem, a gente precisa de componentes bem definidos e, mais importante ainda, de uma linguagem comum, que ambos se entendam perfeitamente. A gente tem três componentes principais aqui. O Flowon, que vive nativamente no seu esforce e orquestra toda a governança. o Deven AI, nosso engenheiro autônomo, que opera exclusivamente no GitHub, e a peça chave que conecta tudo, o Flowson Cloud Agent, um middleware que funciona como um tradutor, uma ponte de comunicação entre os dois ambientes. E aqui tá o pré-requisito, talvez mais importante de todos. A língua que o Deven fala, o formato sales force de X. Pensa assim, o metadado antigo é como um livro sem capítulos. Para IA é só um bloco de texto gigante difícil de entender. O SFDX organiza esse livro em capítulos e parágrafos bem claros. Essa estrutura

[3:02] granular que permite ao dev encontrar e editar de forma cirúrgica exatamente o componente que precisa, seja uma classe Apex ou um LWC. Sem isso, a IA estaria cega, é innegociável. Então, vamos lá ver o Dev em ação. Vamos seguir o ciclo de vida de uma tarefa desde o momento em que ela é delegada até entrega paraa revisão humana. O fluxo é impressionante. Uma tarefa é delegada via. O Deven imediatamente se isola numa feature branch para não atrapalhar ninguém. Ele então cria seu próprio ambiente de desenvolvimento, uma scratchwork, que é basicamente uma sandbox temporária e descartável. Lá ele codifica, roda testes até atingir a cobertura mínima e se autocorrige. Só quando o trabalho tá pronto, ele abre um pull request todo detalhado pedindo pro engenheiro sénior revisar. Aí a trabalha, o humano governa. E assim que essa revisão humana acontece e o código é aprovado, a responsabilidade muda de mãos. O mundo ágil e criativo do Devin entrega o bastão pro mundo seguro e governado do Fluson. E o ponto crucial é

[4:03] este. O evento de merge no GitHub é o gatilho. A partir daquele exato momento, a intervenção humana termina e a esteira de governança totalmente automatizada do Flowon entra em ação. E aqui que um dos super poderes do Fluum entra em cena, o Smart Merge, o Git tradicional olha pros arquivos XML dos seus force e vê só texto, o que gera incontáveis falsos conflitos. O Smart Merge, por outro lado, ele entende a estrutura do seus force. Ele consegue resolver conflitos em metadados complexos, como perfis, de forma inteligente, garantindo que o pipeline nunca pare por uma bobagem. Então, o fluxso é contínuo e automático. O Cloud Agent sincroniza a mudança do GitHub. O Smart Marge resolve qualquer conflito. O código é consolidado na brente do Flowzon, que é a fonte da verdade da produção. E a partir daí, o pipeline dinâmico promove a mudança por todos os ambientes de forma segura e ainda gera um ID de deploy paraa auditoria completa, certo? Arquitetura poderosa, mas a pergunta é por onde começar? A chave é implementar

[5:04] salvaguardas e focar em casos de uso que entreguem alto valor com baixo risco. A estratégia mais inteligente é começar com tarefas que a gente chama de amplas e rasas. Pense em criar centenas de testes unitários, limpar dívidas técnicas ou modernizar componentes para LWC. Por que começar aqui? Porque são tarefas de alto volume e valor técnico, mas que raramente tocam na lógica de negócio principal. É o jeito perfeito de gerar um retorno massivo sobre o investimento com risco mínimo. E aqui está a mensagem mais importante. Nesta arquitetura, a governança não é uma opção, ela é programada. O controle não é uma etapa manual, é uma regra de código que tá embutida em cada parte do processo, desde a revisão humana obrigatória no GitHub até o último passo do deploy automatizado. E isto é um exemplo bem concreto. Num simples arquivo de texto, a gente define as regras do jogo. A gente pode proibir explicitamente o devin de fazer deploy em produção ou de tocar em metadados

[6:05] sensíveis. As barreiras de proteção são definidas por código de forma clara e inegociável. E isso nos deixa com uma reflexão final. A tecnologia para ter um engenheiro de IA na equipe já é uma realidade? A pergunta não é mais se isso é possível, mas sim a sua esteira de devops está maduro o suficiente para lidar com essa nova era de velocidade e automação? A revolução já chegou. A questão é se a gente está pronto para ela.
