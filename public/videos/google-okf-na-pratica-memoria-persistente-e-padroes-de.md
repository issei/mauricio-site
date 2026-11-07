# Google OKF na Prática: Memória Persistente e Padrões de Conhecimento para Agentes de IA

Vídeo de Maurício Yokoyama Issei, publicado em 11 de setembro de 2026 (9 min 21 s).
Assistir: https://www.youtube.com/watch?v=tnS7hxUnHI4

## Sobre o vídeo

Neste vídeo explicativo, exploramos o **Google Open Knowledge Format (OKF)** e demonstramos como utilizar o ecossistema **okf-agent-memory** na prática!

O **OKF** é uma especificação aberta e vendor-neutral que formaliza o conhecimento organizacional em uma estrutura de arquivos Markdown enriquecidos com metadados em YAML (frontmatter). Ele resolve o problema de contexto fragmentado em sistemas de IA, criando um grafo de conhecimento navegável, versionado no Git e diretamente legível por humanos e agentes de IA, sem a necessidade de bancos de dados vetoriais complexos.

Aprofundamos nas atualizações da versão **OKF v0.2**, que introduz sinais de confiança, rastreabilidade de proveniência (`generated`, `verified`, `sources`), gerenciamento do ciclo de vida (`status`, `stale_after`) e computações atestadas. 

Além disso, apresentamos o ecossistema **okf-agent-memory**, desenvolvido em Go com busca BM25 em memória de alta velocidade (menor que 300µs) e servidor MCP (Model Context Protocol) embutido para integração direta com ferramentas como Claude Code e Cursor.

---

📌 **Capítulos do Vídeo:**
- **00:00** - O que é o Google Open Knowledge Format (OKF)?
- **01:45** - O Problema do Contexto Fragmentado na IA Agentica
- **03:30** - Estrutura de Arquivos: Markdown + YAML Frontmatter
- **05:50** - Novidades do OKF v0.2: Proveniência, Sinais de Confiança e Atestação
- **08:20** - Arquitetura do `okf-agent-memory` (Go, Busca BM25 e Servidor MCP)
- **11:10** - Demonstração Prática de Uso do Agente OKF
- **14:00** - Conclusão e Próximos Passos

---

🔗 **Links das Fontes e Referências Citadas:**

• **Google Cloud Blog — Anúncio Oficial do OKF:**
https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

• **Google Cloud Blog — OKF v0.2 e Sinais de Confiança:**
https://cloud.google.com/blog/products/data-analytics/okf-v02-tackles-agentic-trust

• **Especificação Oficial do OKF no GitHub (`SPEC.md`):**
https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md

• **Repositório GitHub — okf-agent-memory:**
https://github.com/okf-memory/okf-agent-memory

• **Guia Completo do OKF (WitsCode):**
https://witscode.com/open-knowledge-format

• **Entendendo o OKF no GitBook Blog:**
https://www.gitbook.com/blog/what-is-okf-open-knowledge-format

• **Padrões e Arquitetura do OKF (DesignPattern.fyi):**
https://www.designpattern.fyi/okf/

• **Open Knowledge Foundation (História e Padrões):**
https://okfn.org/ e https://pt.wikipedia.org/wiki/Open_Knowledge

---

#IA #OpenKnowledgeFormat #GoogleCloud #AIAgents #Git #MCP #Golang #MachineLearning #Developer

## Transcrição

_Transcrição automática, não revisada._

[0:00] Boas-vindas a esta análise. Hoje a gente vai resolver um problema que, olha, tira o sono de muita gente no desenvolvimento, a amnésia dos agentes de IA. Quem nunca passou por isso, né? A inteligência artificial tá lá no meio de uma sessão crítica de código e do nada esquece completamente o contexto da arquitetura. É de noquecer qualquer um. Mas caua, tem solução. Vamos descobrir como um novo padrão revolucionário de texto simples encabeçado pelo Google promete ser a resposta definitiva para criar uma memória de longo prazo de verdade e acabar de vez com esse pesadelo. Para chegar lá, a gente tem um roteirinho bem direto hoje. Vamos entender primeiro qual é exatamente o problema da memória, depois descobrir o que é esse tal de OKF e como funciona a arquitetura dele. Na sequência, a gente passa pro agente AKF e, claro, vai ver como usar tudo isso na prática. No finalzinho, damos uma olhada no futuro do conhecimento. A ideia aqui é sair da teoria de alto nível e ir direto pros comandos de terminal, que já dá para

[1:00] rodar num repositório real. Então, começando pelo nosso primeiro ponto, a amnésia dos agentes de IA e esse problema crônico de memória que trava nossos projetos. Por que será que os agentes têm essa amnésia, hein? O cenário é super comum. O agente recebe várias instruções importantes, toma decisões arquiteturais brilhantes e descobre todo o contexto do domínio ali na hora. Só que a janela de contexto se fecha e pronto, a mágica some, tudo desaparece. É como ter um líder técnico que acorda todo dia com a memória de um peixinho dourado, sem lembrar de absolutamente nada. O maior obstáculo hoje é que essas descobertas valiosíssimas simplesmente evaporam justamente porque falta uma camada de memória persistente e que, principalmente, não dependa de uma empresa específica para continuar existindo. E aí a gente cai num dilema chato no dia a dia, tendo que escolher entre duas opções bem ruins. De um lado, a gente tenta se virar com arquivos Markdown totalmente improvisados. Fica aquela bagunça desestruturada que só incha a janela de contexto e torra uma grana em tokens. Do outro lado, a galera costuma

[2:00] apelar pros bancos de dados vetoriais. O problema é que eles são caríssimos, funcionam como uma caixa preta que ninguém entende direito e cria uma dependência gigante de fornecedores. Fica muito claro que tem uma falha absurda de interoperabilidade aí que precisa ser resolvida com urgência. E é exatamente aí que a gente entra na segunda parte. O que é o OKF? Esse é o padrão que promete uma verdadeira mudança de paradigma. A essência da nossa salvação é o Open Knowledge Format. na sua versão 0.2, que teve o anúncio oficial lá pelo Google Cloud em junho de 2026. E detalhe importantíssimo, não estamos falando de mais um software pesadão ou um banco de dados cheio de configurações chatas, nada disso. O OKF é uma especificação aberta e neutra. Ele armazena o conhecimento da organização de um jeito extremamente limpo, basicamente como um diretório de arquivos Markdown com o cabeçalho em Yamel. A genialidade da coisa tá justamente nessa simplicidade. É um formato deliciosamente minimalista em texto puro, que só exige um único campo obrigatório, o campo type. Isso garante que a informação dure décadas

[3:00] sem ficar refém de um sistema que pode sair do ar amanhã. Tem uma analogia genial que resume isso perfeitamente. O OKF é como se fosse o cabo USBC do conhecimento da IA. Sabe aquela facilidade de não precisar mais de um carregador diferente para cada aparelho? Então, os agentes inteligentes não vão mais precisar de dezenas de SDKs diferentes para ler um projeto. O formato vira uma língua franca. Qualquer IA passa a conseguir ler, escrever e trocar a informação de forma super fluida. Acabou aquela história de ficar preso em ecossistemas fechados de corporações. É pura comunicação padronizada. E todo esse design maravilhoso roda em torno de três princípios básicos. O primeiro é ser minimamente opinativo, não forçando estruturas ingessadas. O segundo é a independência total entre quem produz e quem consome. Na prática, quer dizer que o MA pode escrever uma decisão super complexa de madrugada e meses depois alguém do time pode abrir aquele arquivo num bloco de notas normal, sem precisar de nenhum software especial. E o terceiro princípio é focar no formato e

[4:01] não na plataforma. A força do AF vem de quantas partes conseguem falar esse idioma e não de quem é dono dos servidores. Muito bacana. Mas como isso funciona nos bastidores, né? Vamos destrinchar a arquitetura do AKF para entender o motor por trás de toda essa simplicidade. Os blocos de construção são mega elegantes. Tudo mora no que eles chamam de knowledge bundle, um pacote de conhecimento que na verdade é só uma árvore de diretórios convencional. Dentro dela, cada conceito tem seu próprio arquivo Markdown. Ele carrega um ID único, os metadados lá no topo, o corpo de texto e os famosos cross links. E aqui tá o pulo do gato. Usando meros links do Markdown, a gente cria uma rede de conhecimento incrivelmente conectada. Os agentes simplesmente seguem esses links como se fosse um grafo gigante, entendendo a relação das partes, mas sem precisar de banco de dados caro para isso. Para manter tudo nos trilhos, o sistema usa uma arquitetura bem limpa, dividida em cinco camadas lógicas. Começa pela própria especificação do OKF. A camada dois traz as convenções de memória,

[5:01] ditando as regras do jogo. A três abriga as habilidades e os prompts do agente. A camada quatro é vital, é a de ferramentas que garante a validação rigorosa dos arquivos. E lá na base, na camada cinco, fica o conhecimento bruto do projeto. Separar tudo isso é crucial. Assim, a gente tira a carga cognitiva do modelo de ter que se preocupar com formatação. A inteligência fica 1000% focada em resolver problemas enquanto a ferramenta garante a estrutura perfeita do texto. E como a gente aplica tudo isso? Chegamos ao agente OKF. É aqui que a teoria vira uma memória nativa do Git de cair o queixo. Só para ter ideia do poder de fogo, a latência de pesquisa beira o absurdo. Estamos falando de menos de 300 microssegundos. Como a informação tá toda em texto puro, o utilitário constrói índices do algoritmo BM25 numa velocidade surreal e ele é um binário escrito em GO, sem nenhuma dependência externa chata. O resultado prático disso é que a ferramenta vasculha a memória inteira do projeto muito antes do modelo de A sequer

[6:01] terminar de engolir os primeiros tokens da conversa. E o bolso também agradece, viu? O agente Okief reduz o inchaço e o desperdício de tokens em inacreditáveis 80%. Passar uma janela de contexto gigante, entupida de arquivos que a IA nem vai usar é jogar dinheiro fora. Of arruma isso com a divulgação progressiva. A Ia conversa com os índices e puxa estritamente os conceitos que precisa naquele exato milissegundo para funcionar. Muita economia computacional e financeira. Para não virar bagunça, o agente tem regras de comportamento super estritas. Ele é obrigado a pesquisar antes de escrever e sempre preferir atualizar um arquivo em vez de criar algo duplicado. Ele também tem que marcar a proveniência dos dados. apontando de onde tirou aquela ideia genial. Mas olha que fascinante, ele tem que preservar a incerteza. A Iá é ensinada a avisar de forma explícita quando não tem 100% de certeza sobre algo. Isso cria camadas de confiança diferentes e impede as temidas alucinações de sujarem o registro do projeto para sempre. Bom, chega de teoria, vamos pro guia prático. Botar a mão na massa com os comandos reais. No

[7:03] desenvolvimento do dia a dia, trabalhar com esse padrão é muito direto. Com simples OKF Bootstrap, a base de memória inteira do projeto é configurada rapidinho. O OKF Validate entra como um fiscal, garantindo que todo texto gerado siga a especificação a risca. Na hora de buscar dados, o OKF search chama a busca rápida. E para abrir um tópico novo, é só rodar OKF Create. Sabe o que é mais legal? Tudo isso roda no ambiente que a gente já usa. Qualquer adição na memória é auditável, dando um belo de um git, entrando organicamente naquele processo de revisão de código de sempre. E tem mais uma carta na manga sensacional, rodar o comando OK Fix MCP Knowledge. Isso sobe na hora um servidor do Model Context Protocol usando as saídas padrão do sistema, sem nem precisar abrir porta de rede. O impacto disso: ninguém precisa pagar por banco de dados na nuvem para guardar a memória de IA. O contexto fica totalmente privado, super seguro na máquina local, mas conectando o repositório na mesma hora com editores poderosos, tipo Cursor, Codex ou Cloud,

[8:04] e com zero custo de API de rede, é de explodir a cabeça. Para fechar nosso roteiro, vamos pensar no futuro do conhecimento, focado totalmente em transparência e interoperabilidade. O contraste do que a gente tá vivendo é nítido demais. Estamos deixando de lado os armazéns vetoriais proprietários, que são caixas pretas frágeis e deixam a gente totalmente dependente de fornecedores. A gente avança e muito pros pacotes de conhecimento em textos simples, totalmente nativos do Git e absurdamente transparentes e auditáveis por qualquer ser humano. É uma base muito mais robusta, criada justamente para garantir que a interoperabilidade não seja só uma palavra bonita, mas o alicerce real dos sistemas inteligentes de amanhã. Para finalizar nossa reflexão de hoje, fica a provocação essencial para qualquer liderança técnica. O conhecimento precioso da organização vai ser legível pelos agentes super poderosos do amanhã ou vai acabar esquecido, trancado e perdido para sempre numa caixa preta de alguma empresa? Adotar padrões abertos baseados

[9:04] em texto pode ser o passo exato para garantir a vida longa da arquitetura de qualquer software moderno. É uma escolha que muda o jogo da inovação. Valeu demais por acompanhar mais essa exploração técnica com a gente e até a próxima.
