# Nossa Doc está pronta para IA

Vídeo de Maurício Yokoyama Issei, publicado em 23 de outubro de 2025 (5 min 41 s).
Assistir: https://www.youtube.com/watch?v=qkfWOrs8o9k

Assuntos: [Especificação e desenvolvimento](https://mauricio.issei.com.br/temas/especificacao-e-desenvolvimento)

## Sobre o vídeo

**Nossa Documentação Está Pronta Para a Era da IA? O Padrão `llms.txt` é a Solução!**

Sua documentação está gerando código desatualizado quando a IA tenta ajudar? 🤯
Descubra por que a falta de um padrão para LLMs (Large Language Models) é a maior **falha de design** da nossa arquitetura de conhecimento hoje e como o simples e elegante **`llms.txt`** está sendo adotado por gigantes como Cloudflare, Stripe e Vercel para resolver o problema.

Esta não é apenas uma melhoria na documentação, é uma **decisão de arquitetura estratégica** para garantir que sua tecnologia seja a fonte da verdade para a próxima geração de ferramentas de IA.

**Neste vídeo, você vai aprender:**

* **O Risco de Irrelevância:** Por que assistentes de IA estão gerando código antigo e depreciado, abalando a confiança e gerando retrabalho ([[00:18](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=18)], [[00:58](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=58)]).
* **A Inviabilidade do Contexto:** O custo (em tokens e latência) de injetar toda a documentação no contexto do prompt de um LLM é insustentável ([[01:08](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=68)]).
* **A Solução `llms.txt`:** Conheça a convenção que funciona como um `robots.txt` ou sitemap, dando diretrizes claras para os robôs de IA sobre a "fonte da verdade" ([[01:26](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=86)], [[02:02](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=122)]).
* **Arquitetura do Padrão:** A diferença crucial entre o **`llms.txt`** (índice para sistemas RAG/busca rápida) e o **`llms_full.txt`** (a documentação completa para Fine-Tuning) ([[02:51](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=171)], [[03:07](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=187)]).
* **O Segredo da Precisão:** O detalhe genial de arquitetura: links que apontam para **Markdown puro** (não HTML), removendo ruído e elevando a precisão de forma absurda ([[03:35](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=215)], [[03:42](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=222)]).
* **Adoção no Mercado:** Mais de 500 projetos e empresas como Cloudflare, Stripe, Vercel e Hugging Face já estão usando o `llms.txt` ([[04:00](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=240)], [[04:15](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=255)]).
* **Conclusão Estratégica:** Por que adotar o `llms.txt` é um imperativo para manter o controle de como sua tecnologia é representada e usada pela IA ([[04:52](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=292)], [[05:04](http://www.youtube.com/watch?v=qkfWOrs8o9k&t=304)]).

A hora de planejar a implementação é agora!

**#Hashtags:**
\#llmstxt \#InteligenciaArtificial \#DocumentacaoTecnica \#ArquiteturaIA \#LLMs \#RAG \#FineTuning \#DesenvolvimentoSoftware \#TechTrends

***
Link do vídeo: [Nossa Doc está pronta para IA](http://www.youtube.com/watch?v=qkfWOrs8o9k)
http://googleusercontent.com/youtube_content/0

## Transcrição

_Transcrição automática, não revisada._

[0:00] Bom, time, dá uma olhada nessa pergunta aqui na tela. E sério, ela não é só retórica, não. Isso aqui é um teste decisivo pra nossa relevância nos próximos anos. E a resposta, bom, a gente precisa começar a construir essa resposta hoje. Vamos direto ao ponto. Numa dor que eu tenho certeza que todo mundo aqui já sentiu na pele. Esse comentário lá do fórum do Jango é basicamente um espelho do nosso maior risco hoje. Os próprios assistentes de IA, que deveriam nos ajudar acabam virando um problema, gerando código antigo. E cada vez que isso acontece, a confiança no nosso ecossistema vai lá para baixo e o retrabalho só aumenta. E olha, é importante entender que a gente não tá falando de um bugzinho qualquer ou de uma resposta errada aqui e ali. O que a gente tá encarando é uma falha de design, sabe? Uma rachadura na fundação de como a IA interage com o nosso conhecimento. Vamos olhar isso mais de perto. Então, o ponto crucial é este aqui. A gente tá numa batalha por relevância. Toda vez que um Llm sugere

[1:00] uma API que já foi depreciada ou confunde a nossa versão 2 com a TR, a gente perde a autoridade. Fora que o custo de injetar toda a documentação no contexto de cada prompt é inviável, tanto em tokens quanto em latência. A gente precisa de um jeito mais inteligente de dizer pros modelos exatamente o que eles devem consultar. A boa notícia é que a gente não precisa inventar a roda. A solução já tá aí e ela é simples, é elegante e do ponto de vista de arquitetura é brilhante. O nome dela é all.tx. TXT. A transformação é exatamente essa. A gente sai da era do chute, onde a Iá tenta adivinhar, e entra na era da orientação, onde nós damos o mapa do tesouro. A gente troca ambiguidade por clareza, troca um custo absurdo de contexto por uma recuperação cirúrgica de informação. É como se a gente tivesse assinando um contrato com a IA, sabe? Definindo as regras do jogo. Paraa gente que lida com a arquitetura e engenharia, a melhor analogia pensar no robots txtou no sitemap. São arquivos de textos simples que ficam

[2:02] lá na raiz do site dando diretrizes claras pros robôs. O lls.txt faz a mesmíssima coisa, só que pra nova geração de robôs, os LLMs. Ele basicamente diz para eles: "Olha que a fonte da verdade é esta e é assim que você deve navegar e consumir nossa documentação". E com isso, o fluxo de trabalho fica muito mais simples e elegante. Em vez de sair catando informação pela internet, o agente de A vai direto ao ponto. Ele procura o nosso arquivo/lms.txt. Ele não perde tempo com lixo. Ele segue os links diretos pros arquivos Markdown que a gente preparou, já limpinhos e otimizados. O resultado, o contexto que ele usa é perfeito e a qualidade da resposta sobe de mediocre para excelente. Certo? Agora vamos mergulhar um pouco mais fundo nos detalhes técnicos. Como que essa convenção funciona na prática? A convenção é dividida em duas partes geniais. Primeiro, o lms.txt, que é o nosso sitem map.xml paraa. Ele é pequeno, ágil, um índice para navegação

[3:02] rápida. É a ferramenta perfeita para sistemas HAG que precisam buscar só aquela informação específica para responder uma pergunta. Aí do outro lado a gente tem o LMS full.txt. Pensa nele como a nossa bíbia. É a documentação inteira de cabo a rabo. O objetivo dele é outro, é o Fine Tuning. Se a gente quiser treinar um modelo para ser um mestre na nossa tecnologia, a gente entrega o LMS full.txté na mão dele. Pronto. E aqui tá o pulo do gato, o detalhe de arquitetura mais importante. Os links nesses arquivos não apontam pro HTML, eles apontam para versões em Markdown puro da página. Isso é genial porque a gente tira todo o ruído, menus, anúncios, scripts e entrega pro modelo só o filé, só o conteúdo essencial. Isso não só reduz o custo de processamento, como aumenta a precisão de uma forma absurda. Tá? Aí a pergunta que fica é: isso é só uma dia legal ou é algo que tá acontecendo de verdade? E a resposta é bem clara. O mercado já se mexeu e se mexeu rápido. 500, mais de 500 projetos,

[4:05] a gente não tá falando de uma tendência passageira ou de um experimento de garagem. Isso é um movimento. A prova social é é simplesmente irrefutável. E olha só quem são esses projetos. Não é qualquer um. A gente tá falando de Cloud Flare, Stripe, Versel, Huging Face. são as empresas que definem a infraestrutura e as ferramentas para os desenvolvedores no mundo todo. Eles já entenderam que para continuarem relevantes, a documentação deles precisa ser a fonte da verdade para IA. E essa citação aqui resume tudo. O jeito como as pessoas desenvolvem software está mudando. Essa ideia de vibe coding, de codificar com ajuda da IA, tá crescendo muito. Se a IA não consegue usar nossa plataforma direito, os desenvolvedores simplesmente vão usar outra. Simples assim. O que nos traz a uma conclusão inevitável sobre a nossa estratégia? A pergunta aqui não é mais se vamos adotar isso. A única pergunta de verdade é quando. É isso. É um imperativo. A gente precisa parar de ver isso como uma melhoria na documentação e começar a tratar como uma

[5:07] decisão de arquitetura estratégica. É sobre manter o controle de como a nossa tecnologia é representada e usada pela próxima geração de ferramentas. Então eu me encerro com essa pergunta. Como a gente garante que nessa nova era da IA a nossa documentação seja a fonte da verdade? A resposta, como a gente viu, é clara, é técnica e é estratégica. llms.txt. A hora de planejar a implementação é agora. Vamos fazer isso acontecer.
