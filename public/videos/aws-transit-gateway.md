# AWS Transit Gateway

Vídeo de Maurício Yokoyama Issei, publicado em 4 de novembro de 2025 (5 min 54 s).
Assistir: https://www.youtube.com/watch?v=zVJ_XZq8gQ8

Assuntos: [Cloud e confiabilidade](https://mauricio.issei.com.br/temas/cloud-e-confiabilidade)

## Sobre o vídeo

Se sua arquitetura AWS está complexa com dezenas de VPCs, este vídeo é essencial!

Cansado da complexidade do **VPC Peering** (que **não é transitivo**)? O **AWS Transit Gateway (TGW)** é o seu **roteador virtual regional** para simplificar a rede.

Neste tutorial, focamos em 3 pontos cruciais para arquiteturas escaláveis e híbridas:
1.  **Configuração do TGW:** Um hub **altamente disponível por design**.
2.  **Roteamento Centralizado:** Aprenda a anexar múltiplas VPCs e a configurar rotas (ex: 0.0.0.0/0) nas tabelas da VPC apontando para o TGW.
3.  **Migração de VPN:** Demonstramos a migração da conexão Site-to-Site VPN, destacando o uso do **BGP** e a **propagação de rotas** para anexos VPN.

**Boas Práticas Essenciais:**
*   Use **conexões VPN BGP** e **ative a propagação** de rotas.
*   Crie **sub-redes separadas** para anexos TGW, mantendo as **NACLs de entrada/saída abertas**.
*   O TGW permite compartilhamento **multi-conta** via AWS RAM.

Domine a **melhor prática AWS** e otimize seus **custos por anexo e por GB transferido**.

**#AWSTransitGateway #CloudNetworking #AWSVPC #VPNmigration**

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olá! Sabe quando a nossa infraestrutura na nuvem começa a crescer e de repente a rede vira uma bagunça? Pois é. Hoje a gente vai mergulhar de cabeça em uma solução para esse desafio. O AWS Transit Gateway. Pensa nele como se fosse um maestro de uma orquestra, garantindo que todas as suas redes conversem direitinho de forma super harmoniosa. Bom, o nosso papo de hoje vai ser bem direto. A gente começa entendendo o problema, esse labirinto que as redes podem se tornar. Depois vamos ver como um hub central resolve isso. Aí a gente desmonta a ferramenta para ver as peças, analisa um caso de uso real e no final junta tudo para entender porque isso é tão importante. Vamos lá. Então, para começar, vamos botar o dedo na ferida. Como é que a conectividade de rede começa a virar um pesadelo quando a gente escala as operações na nuvem? Essa é a pergunta de 1 milhão de dólares, não é? A gente adiciona uma VPC nova aqui, uma conexão com escritório ali e de repente a quantidade de conexões ponto a ponto, tipo os VPC peings, cresce de forma absurda. O que começou super

[1:00] organizado vira uma teia de aranha, um verdadeiro que ninguém consegue mais gerenciar, auditar ou proteger direito. E o problema aqui não é só visual, não. É que cada uma dessas conexões precisa ser gerenciada separadamente. Cada uma com suas próprias rotas, suas próprias regras de segurança. Isso gera um custo operacional gigante e deixa a arquitetura toda engessada super difícil de adaptar quando aparece uma necessidade nova. Tá? Mas e se a gente pudesse simplesmente trocar essa teia de aranha toda por um modelo bem mais limpo, mais organizado, centralizado? Bom, é exatamente para isso que o AWS Transit Gateway existe. Essa definição da própria WS é perfeita. O Transit Gateway é basicamente um roteador gigante na nuvem que funciona para uma região inteira. Em vez de cada rede que se preocupar em como se conectar com todas as outras, elas só precisam de uma única conexão com o Transit Gateway. Ele se vira com o resto. Simples assim. E essa imagem aqui mostra tudo. É o famoso modelo Hub and Spoke. O Transit Gateway

[2:02] é o hub, o centro de tudo. E as VPCs e outras redes são os spokes, os raios da roda. A comunicação toda passa pelo centro, o que deixa o sistema muito mais simples, limpo e, o mais importante de tudo, escalável. Beleza, o conceito tá claro, mas como é que essa mágica funciona na prática? Para entender isso, a gente precisa conhecer os dois componentes principais dele. O primeiro bloco de construção são os anexos ou attachments. Toda a rede que vai se plugar no Transit Gateway, não importa se é uma VPC, uma conexão VPN, um Direct Connect, faz isso através de um anexo. Pensa neles como se fossem as portas de entrada e saída do nosso hub. E a beleza disso aqui é a flexibilidade. A gente pode conectar praticamente qualquer tipo de rede. Dá para plugar VPCs, túneis VPN que vem lá do escritório, links dedicados com Direct Connect e dá até para conectar outros Transit Gateways de regiões diferentes. É muita versatilidade, certo? Se os anexos são as portas, as

[3:05] tabelas de rotas são, digamos, os guardas de trânsito. Elas têm as regras que dizem: "OK, um pacoque de dados chegou por essa porta aqui e quer ir para aquele destino ali. Então o caminho é por aquela outra porta. É aqui que o controle centralizado realmente acontece. A grande sacada aqui é entender o escopo de cada uma. A tabela de rotas de uma VPC, ela cuida do trânsito dentro daquele bairro, sabe? Dentro daquela VPC. Já a tabela de rotas do Transit Gateway, essa cuida do trânsito da cidade inteira. Ela gerencia o fluxo entre todos os bairros, entre todas as redes conectadas. É um outro nível de controle. Bom, teoria é ótimo, mas vê a coisa funcionando é melhor ainda. [roncando] Vamos pegar um cenário super comum e ver como essas peças todas se encaixam. Imagina o seguinte, temos duas VPCs de aplicação, a A e a B. Elas não têm acesso direto à internet por questões de segurança. Todo tráfego que precisa sair paraa web tem que

[4:05] obrigatoriamente passar por uma terceira VPC, AC, que é onde ficam nossos firewalls, nosso Nat gateway, etc. É um padrão super clássico de segurança, OK? Vamos seguir o caminho do pacotinho de dados. Ele nasce lá na VPCA. A tabela de rotas de lá diz: "Opa, quer ir pra internet?" O caminha pelo Transit Gateway. Quando ele chega no hub, a tabela de rotas do Transit Gateway entra em ação e fala: "Certo, esse tráfego tem que ir pro anexo da VPC". E finalmente lá na VPC, o tráfego passa por toda a inspeção de segurança e só então sai pra internet pelo net gateway. Simples, elegante e totalmente controlado. Então, a gente já viu o problema, a solução e um exemplo na prática. Para fechar, vamos só amarrar as pontas e resumir porque o Transed Kway é uma peça tão fundamental numa arquitetura de nuvem bem pensada. Resumindo a ópera, a arquitetura fica muito mais simples e muito mais fácil de escalar, permitindo conectar milhares de redes. O controle fica todo centralizado, o que é um sonho

[5:07] para segurança e para operação, porque tem um ponto único para monitorar tudo. E como a gente viu no exemplo, fica moleza compartilhar recursos, o que economiza tempo e dinheiro. E essa citação do guia oficial da WS mata a pau. Não é só uma ferramenta, é uma mudança na forma de pensar a rede na nuvem. é tratar a conectividade regional como um serviço central e não como um monte de conexões individuais que a gente tem que gerenciar na mão. E com isso a gente fecha essa análise. Fica a pergunta no ar pra gente pensar. Olhando pra nossa própria infraestrutura, onde é que o hub central como o Transit Gateway poderia colocar ordem na casa e acabar com a bagunça? Obrigado pela companhia e até a próxima.
