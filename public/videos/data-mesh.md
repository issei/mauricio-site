# Data Mesh

Vídeo de Maurício Yokoyama Issei, publicado em 8 de novembro de 2025 (5 min 1 s).
Assistir: https://www.youtube.com/watch?v=yXRNd2aGmuA

Assuntos: [Dados e decisão](https://mauricio.issei.com.br/temas/dados-e-decisao)

## Sobre o vídeo

**Prepare-se para revolucionar sua arquitetura de dados!**

Neste vídeo, exploramos a filosofia do **Data Mesh**, um paradigma que está transformando a maneira como as organizações estruturam e gerenciam seus dados. Descubra como migrar de plataformas de dados tradicionais centralizadas para um modelo distribuído, orientado por domínios, que promove maior **autonomia** e um ritmo mais rápido de **inovação**.

Organizações de todos os tamanhos reconhecem que os dados são um facilitador fundamental para aumentar a inovação e gerar valor. Ao adotar uma mentalidade que fornece **produtos de dados** a partir de equipes especializadas, ao invés de uma plataforma centralizada, você pode se tornar mais ágil e produtivo.

---

### Tópicos Abordados: A Revolução do Data Mesh

#### 1. O Paradigma do Data Mesh
O Data Mesh representa uma mudança de equipes de dados tradicionais, centralizadas, para uma abordagem **distribuída e orientada por domínio**. Em vez de depender de uma única equipe monolítica para gerenciar todas as tarefas de dados, o Data Mesh defende a criação de equipes menores e autônomas alinhadas a domínios de negócios específicos. Este modelo reduz o atrito para o fluxo de informações, garantindo que o produtor seja responsável pelos conjuntos de dados.

**Benefícios Chave:**
*   **Aumento de Autonomia:** As linhas de negócios (LOBs) e unidades organizacionais operam de forma autônoma.
*   **Maior Agilidade:** Organizações que adotam Data Mesh relatam um tempo de lançamento no mercado 40% mais rápido para produtos de dados.
*   **Propriedade Clara:** Os especialistas em domínio são os mais capazes de implementar e operar a solução técnica para processar e produzir o conjunto de dados.

#### 2. Princípios Fundamentais (Os Objetivos de Design)
O design do Data Mesh se baseia em objetivos cruciais:
*   **Dados como Produto:** Cada domínio é responsável por criar, operar, servir e resolver problemas de seus dados de ponta a ponta. A precisão e a responsabilidade dos dados são do proprietário dentro do domínio.
*   **Governança de Dados Federada:** Garante que os dados sejam seguros e precisos, fornecendo descoberta central de dados, emissão de relatórios e auditoria para simplificar a localização dos dados e verificar a conformidade.
*   **Acesso Comum:** Os dados devem ser facilmente consumidos por analistas de dados, cientistas de dados e serviços de analytics (como Amazon Athena, Amazon Redshift e Amazon SageMaker). Os ativos de dados devem ser detectáveis a partir de um **catálogo de dados central**.

#### 3. Implementando o Data Mesh na AWS
Demonstramos como a arquitetura **Lake House** serve como uma base ideal para suportar um Data Mesh, utilizando serviços nativos da AWS:
*   **AWS Glue:** Serviço ETL (Extract, Transform, and Load) totalmente gerenciado e sem servidor, crucial para processar e preparar dados em pipelines de domínio.
*   **AWS Lake Formation:** Usado para implementar a **governança de dados** dentro e entre domínios. Ele define centralmente políticas de segurança, governança e auditoria, além de fornecer controle de acesso uniforme para compartilhamento de dados.
*   **Fluxo Produtor-Consumidor:** O compartilhamento de dados entre domínios (produtores e consumidores, que residem em contas separadas da AWS) é feito de forma segura através de **links de recursos** do Lake Formation, garantindo que os dados não sejam copiados para a conta central e que a propriedade permaneça com o produtor.

#### 4. Estrutura de Equipe (Data Mesh Roles)
O sucesso do Data Mesh depende da estrutura organizacional. Conheça as responsabilidades das funções essenciais para uma equipe Data Mesh:
*   **Data Product Owner:** Gerencia a visão e o roadmap do produto de dados, garantindo que ele entregue valor.
*   **Domain Data Steward:** Atua como guardião dos ativos de dados, garantindo a qualidade, governança e conformidade dentro de seu domínio.
*   **Data Engineer:** Constrói e mantém a infraestrutura, incluindo pipelines e sistemas de armazenamento, assegurando escalabilidade e desempenho.
*   **Data Architect:** Define a arquitetura geral, domínios, schemas e padrões de integração.
*   **Data Analyst/Data Scientist:** Extrai insights e cria modelos baseados nos produtos de dados do domínio.

---

### Recursos Adicionais e Créditos

Este conteúdo é baseado em insights e arquitetura detalhada originalmente descrita no blog da AWS.

**Autores do Artigo Original:** Nivas Shankar, Ian Meyers, Zach Mitchell e Roy Hasson.
**Arquitetura Implementada:** Utilizando AWS Lake Formation e AWS Glue.
**Conceito Data Mesh:** Cunhado por Zhamak Dehghani, da Thoughtworks, em 2019.

---
✅ **Gostou do conteúdo?** Deixe seu like, inscreva-se no canal para mais insights sobre arquitetura de dados e compartilhe com sua equipe!

**#DataMesh #AWS #AWSGlue #LakeFormation #ArquiteturaDeDados #DataAnalytics #GovernançaDeDados #ProdutoDeDados**

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olá, hoje a gente vai falar sobre uma verdadeira mudança de paradigma na arquitetura de dados, um conceito chamado Deiramesh. É uma abordagem que promete libertar as organizações daquelas armadilhas de dados centralizados que tanto atrapalham. Muitas empresas percebem que suas plataformas de dados, que no começo pareciam ser a solução, acabam virando verdadeiros gargalos que sufocam a inovação. Mas sabe, tem um perigo ainda mais sutil escondido aí. Olha só este dado. Um estudo recente mostrou que 77% dos profissionais de tecnologia usam só os três maiores provedores de nuvem. Isso cria uma dependência gigantesca e claro, isso leva a um risco de negócio bem crítico. O nome disso é Vender Locken. É como se a empresa ficasse refém de um único fornecedor. Pense em ter que pagar taxas de saída absurdas para mover os próprios dados, correr o risco de ter uma parada crítica no sistema e, no fim das contas, perdeu autonomia sobre um dos seus ativos mais valiosos. OK? Então, como uma

[1:01] organização consegue se libertar disso? A solução não é só técnica, é uma mudança fundamental de pensamento. É abandonar o modelo centralizado e abraçar uma nova filosofia, o data mesh. A ideia central que surgiu em 2019 é, ao mesmo tempo, simples e muito poderosa. Tratar os dados como um produto. Isso quer dizer que em vez daquela equipe de dados gigante e central, a gente passa a ter várias equipes pequenas e autônomas. Cada uma delas constrói e é dona dos seus próprios produtos de dados. prontinhos para serem usados. Para ficar bem claro, vamos comparar o jeito antigo com o novo. No modelo centralizado, a posse dos dados é de uma única equipe, o que, claro, gera um gargalo. Já com data, a posse é distribuída pros especialistas de cada área de negócio, ou seja, para quem realmente entende daqueles dados. E essa nova abordagem se baseia em quatro princípios essenciais. O primeiro, tratar dados como produto. Segundo, garantir a posse orientada a

[2:03] domínio. Terceiro, oferecer uma plataforma de dados self service para dar autonomia às equipes. E, por último, estabelecer uma governança federada para manter tudo organizado e seguro. E aqui tem um ponto muito importante. O datam, antes de ser uma mudança técnica, é uma mudança organizacional. É preciso repensar a própria estrutura da equipe de dados. Começa a surgir um novo papel, o dono do produto de dados ou deira product o. Ele funciona como um gerente de produto, garantindo que aquele produto de dados realmente atenda as necessidades de quem vai consumir. E junto com ele aparece o guardião de dados do domínio, o domainas steart. Essa pessoa é a responsável por zelar pelos ativos de dados, garantindo que tudo esteja correto, seguro e em conformidade. E o impacto disso é enorme. Como disse o CEO da Intech House, quando os especialistas do domínio são os donos dos dados, os ciclos para gerar insites, ou seja, para

[3:03] extrair valor, caem de dias para minutos. Mas espera aí, com tantas equipes distribuídas e produtos de dados, como é que tudo isso se conecta sem virar um caos? É exatamente aí que a plataforma de tecnologia Selfice entra em jogo. Vamos ver como ela funciona. O fluxo de trabalho é bem mais simples do que parece. Uma equipe de um domínio, por exemplo, produz um produto de dados e registra ele na plataforma. Uma camada de governança central entra em ação para tornar esse produto localizável. A partir daí, outro time que precisa daquela informação só precisa solicitar o acesso para começar a usar. E o que torna tudo isso possível é uma plataforma self service, que tem ferramentas de integração, catalogação e análise de dados. Ela cria basicamente um terreno comum para que todas as equipes dos domínios consigam operar com autonomia. Adotar um data mesh é sem dúvida, uma mudança e tanto, mas a recompensa que vem em forma de velocidade, eficiência e liberdade, ah, ela é transformadora. E não é só teoria,

[4:05] os números comprovam. Segundo Gartner, as organizações que adotam Deir Mesh conseguem lançar produtos de dados 40% mais rápido e ainda reduzem os custos de governança em 35%. é um ganho de agilidade e eficiência impressionante. No fim das contas, a vantagem estratégica é muito clara. Essa abordagem acaba com os gargalos, incentiva a inovação rápida dentro das áreas, aumenta a qualidade dos dados e a responsabilidade sobre eles. E claro, mitiga o vendor lockin, dando autonomia de verdade para as equipes. Então, o ponto crucial é este. O Deiramesh é menos sobre tecnologia e mais sobre uma mudança estratégica de mentalidade. A questão principal não é se a tecnologia funciona, mas sim se a organização está preparada para finalmente tratar os dados como o produto extremamente valioso que eles são. No.
