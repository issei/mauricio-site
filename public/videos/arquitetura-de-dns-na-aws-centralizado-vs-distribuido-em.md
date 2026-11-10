# Arquitetura de DNS na AWS: Centralizado vs. Distribuído em Ambientes Multi-Account

Vídeo de Maurício Yokoyama Issei, publicado em 23 de setembro de 2026 (7 min 43 s).
Assistir: https://www.youtube.com/watch?v=LnEzU4OfkoM

Assuntos: [Cloud e confiabilidade](https://mauricio.issei.com.br/temas/cloud-e-confiabilidade)

## Sobre o vídeo

Como gerenciar o DNS de forma eficiente quando sua empresa cresce e passa a ter dezenas ou centenas de contas na AWS? 🤔

Neste vídeo didático e visual, explicamos por que a gestão descentralizada de DNS pode gerar configurações duplicadas, inconsistências e gargalos operacionais, e como uma **arquitetura centralizada de DNS** em uma conta dedicada de **Network / Shared Services** resolve esses desafios.

---

### 📌 **O que você vai aprender neste vídeo:**
* **A analogia da agenda:** O que é DNS e como ele traduz nomes fáceis de lembrar em endereços de sistemas.
* **O desafio do crescimento:** O que acontece quando cada conta AWS administra seu próprio DNS de forma independente.
* **Arquitetura Centralizada:** Como funciona a infraestrutura central de DNS na conta de Network / Shared Services.
* **Amazon Route 53 Resolver:** O funcionamento do servidor recursivo padrão presente nas VPCs e a resolução híbrida.
* **Compartilhamento em Escala:** Como distribuir regras e políticas entre contas com o **AWS Resource Access Manager (RAM)** e o **Route 53 Profiles**.
* **Prós e Trade-offs:** Comparativo direto entre simplicidade operacional, governança, segurança, autonomia das equipes e resiliência.

---

### ⏱️ **Capítulos do Vídeo:**
00:00 - Introdução: O que é DNS?
01:30 - O desafio dos ambientes AWS Multi-Account
03:15 - Problemas da gestão descentralizada de DNS
05:00 - Arquitetura Centralizada em Network / Shared Services
07:10 - Amazon Route 53 Resolver e AWS RAM na prática
09:25 - Padronizando governança com Route 53 Profiles
11:40 - Comparativo de modelos e Trade-offs
13:50 - Mensagem final e boas práticas

---

### 📚 **Documentação Oficial e Links Úteis da AWS:**

* 📖 **Visão geral do Amazon Route 53 Resolver:**  
  [https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html)

* 📖 **Gerenciamento de DNS em escala com Amazon Route 53 Profiles:**  
  [https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/profiles.html](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/profiles.html)

* 📖 **Boas Práticas Arquiteturais de DNS na AWS (AWS Networking Best Practices):**  
  [https://aws.github.io/aws-networking-best-practices/foundation/dns/](https://aws.github.io/aws-networking-best-practices/foundation/dns/)

* 📖 **Guia de Governança de Domínios no Route 53 em Ambientes Multi-Account:**  
  [https://aws.amazon.com/blogs/networking-and-content-delivery/protect-amazon-route-53-domains-during-account-lifecycle-events-best-practices-for-domain-governance-in-multi-account-organizations/](https://aws.amazon.com/blogs/networking-and-content-delivery/protect-amazon-route-53-domains-during-account-lifecycle-events-best-practices-for-domain-governance-in-multi-account-organizations/)

---

#AWS #Route53 #CloudComputing #MultiAccount #DNS #ArquiteturaDeSoftware #DevOps #CloudBrasil

## Transcrição

_Transcrição automática, não revisada._

[0:00] A arquitetura de DNS Enterprise na AWS centralizada versus descentralizada. Bom, vamos mergulhar direto nessa explicação de hoje e desmistificar como aquelas organizações gigantescas conseguem gerenciar o tráfego de internet em centenas de contas na nuvem. A gente sabe que um erro aqui pode derrubar a infraestrutura inteira em questão de minutos, né? Mas com o design arquitetônico certinho, a conectividade acontece de um jeito quase invisível e perfeito. É um desafio técnico fascinante. Hoje a gente vai entender exatamente como isso é solucionado na prática, sempre equilibrando o controle e a agilidade. Para começar, vamos imaginar a seguinte situação. Como os sistemas dentro de uma rede corporativa enorme conseguiriam se encontrar se cada equipe tivesse uma agenda de contatos completamente diferente e isolada? Ia ser o caos absoluto, concorda? Um departamento tentaria acessar o outro para processar um pagamento ou buscar um dado de cliente, mas os números e os endereços simplesmente não iam bater. O resultado? Uma cascata de falhas de comunicação que pararia a empresa toda. Isso nos leva direto para nossa analogia

[1:00] principal. O DNS, ou sistema de nomes de domínio, é basicamente essa agenda de contatos corporativa. A função dele é super simples. Ele pega aqueles nomes amigáveis que a gente usa no dia a dia, tipo app.empresa.com, e traduz para os locais reais onde esses sistemas moram nos servidores, que são os endereços IP. Sem essa agenda vital, a internet e as redes das empresas seriam só um mar indecifrável de números. Mas vamos ver como o problema realmente aparece quando a empresa começa a crescer. No começo, quando existe só uma conta AWS, tudo roda que é uma maravilha. É uma agenda única, simples, super fácil de gerenciar. Só que quando o ambiente expande ali para umas 10 contas, as equipes começam a criar as próprias listas isoladas para não dependerem de ninguém. E aí, quando o cenário atinge aquela escala massiva de 100 ou mais contas espalhadas por vários departamentos, nossa, aí a coisa muda de figura. Uma tarefinha simples de TI vira um verdadeiro labirinto de configurações. É bem aí que nasce o que a gente chama de caos centralizado.

[2:01] Quando cada conta AWS resolve criar e administrar as próprias regras de DNS de forma isolada, os problemas se multiplicam rapidinho. É como se dezenas de pessoas estivessem anotando contatos em agendas diferentes que ficam desatualizadas. Logo começam a pipocar configurações duplicadas, regras que brigam entre si e a manutenção vira um pesadelo total. Sem falar naquelas falhas silenciosas horríveis. Quando um sistema para de achar o outro e nem gera uma mensagem de erro clara. A falta de governança vira uma ameaça gigante para a estabilidade de tudo. E é muito interessante olhar para essa comparação. O pesadelo do modelo descentralizado contrasta muito com a paz de uma arquitetura centralizada. Do lado descentralizado, as contas funcionam como ilhas. Isso gera sobreposição de trabalho, retrabalho e umas brechas de segurança enormes. Do outro lado, a gente tem a introdução da conta de serviços compartilhados que funciona como um hub central inteligente. Essa conta dedicada guarda a infraestrutura principal e distribui as rotas corretas de forma padronizada

[3:02] para todas as outras contas de aplicação. Isso sim traz ordem para casa. Sessão um: construindo o hub centralizado. Introduzindo as ferramentas nativas para uma arquitetura unificada. Bom, a ferramenta principal para construir esse hub dentro da AWS é o Amazon Route 53. Sem entrar em nenhum jargão técnico super complicado, pensa no Route 53 como serviço nativo que aponta o caminho e gerencia os registros de DNS de um jeito que escala muito bem. Ele é altamente disponível, rodando numa infraestrutura global. Dá para imaginar ele como o grande bibliotecário chefe, aquele que organiza, consulta, entrega as informações de todas as agendas da nuvem em questão de milissegundos. Agora, se a agenda fica centralizada, como os outros departamentos acessam essas informações sem criar um gargalo gigantesco? É aqui que entra o AWS RAM, o gerenciador de acesso a recursos. Ele é um mecanismo de compartilhamento extremamente seguro. Basicamente, ele permite distribuir o acesso à agenda mestra, como as regras de DNS e perfis

[4:04] de roteamento, para dezenas ou até centenas de contas independentes. A grande sacada é que todo mundo usa as rotas oficiais, mas de um jeito seguro, sem precisar entregar as chaves do castelo para todo mundo mexer na administração. Na prática, quando a gente olha para isso operando em larga escala, são três passos bem simples. Primeiro, a conta central de rede dita as regras de onde cada domínio mora, configurando a base lá no Route 53. Segundo, o AWS RAM entra em cena como um mensageiro invisível e super seguro, espalhando essas regras por toda empresa. E por fim, as redes locais das aplicações, as famosas VPCs, simplesmente herdam essas regras. Ninguém precisa configurar nada do zero. Elas pegam a agenda compartilhada e os sistemas se conectam como mágica, de ponta a ponta. Mas tem um detalhe aqui que é absolutamente crucial. Muita gente escuta a palavra centralização e já tem arrepios, achando que isso significa burocracia e abertura infinita de chamados demorados de suporte. O objetivo de unificar a arquitetura de rede não é tirar a agilidade das equipes

[5:05] de desenvolvimento, de jeito nenhum. A TI central não pode ser um gargalo que trave inovação. A ideia é criar um alicerce sólido para que todo mundo possa correr e inovar com segurança. Centralizar não quer dizer restringir. E para garantir que essa agilidade continue lá em cima, a gente usa a estratégia inteligente de delegação de subdomínios. Funciona de um jeito muito estruturado. A conta central fica com controle absoluto do domínio raiz, tipo o empresa.com, protegendo a identidade principal, só que ela recorta um pedaço, um subdomínio, tipo dev.empresa.com, e entrega a chave desse pedacinho para as equipes de aplicação. Daí para frente, a equipe tem autonomia total. Eles validam certificados, testam ambientes e criam registros ali dentro super rápido, sem precisar pedir benção para equipe de redes toda vez que forem fazer uma mudança. &gt;&gt; Sessão dois: pesando os straight offs. A centralização é poderosa, mas requer um planejamento arquitetônico cuidadoso. &gt;&gt; Colocando os dois modelos lado a lado, a história dos dados fica bem clara. A

[6:06] descentralização até parece mais amigável no começo para times pequenos, porque tem uma complexidade menor logo de cara, mas o risco de segurança vai lá no teto conforme a empresa cresce, justamente pela bagunça e falta de supervisão das regras. Já centralização sobre o modelo de serviços compartilhados pede uma arquitetura um pouco mais complexa de se montar o início, com um controle de acesso bem rígido. Mas olha só a vantagem: ao ter uma única fonte da verdade, o risco de segurança despenca. E, fazendo a delegação do jeito certo, a gente preserva a autonomia que o pessoal técnico tanto precisa. No longo prazo, é o que salva a organização de quedas operacionais feias. &gt;&gt; Tudo isso nos leva a essa mensagem central. Conforme o ambiente AWS vai crescendo, o DNS deixa de ser só uma configuraçãzinha secundária de aplicação e passa a ser um pilar real de arquitetura, governança e conectividade estrutural. O DNS é estratégico demais. Ignorar isso é deixar a base da comunicação da empresa crescer frágil, cheia de remendos e

[7:07] pronta para quebrar a qualquer momento. Para fechar, fica uma provocação para a gente pensar a fundo: se uma infraestrutura de nuvem dobrasse de tamanho de um dia para o outro, será que a agenda de contatos corporativa atual manteria todo mundo conectado? Ou as pontes de comunicação iriam desmoronar em silêncio? Responder essa pergunta muitas vezes é o que define o sucesso da operação num cenário de grande escala. Fica aí o convite para continuarmos explorando essas possibilidades incríveis e as melhores práticas das arquiteturas corporativas modernas na nuvem.
