# DA11Y.md: Acessibilidade no Figma Antes do Primeiro Pixel

Vídeo de Maurício Yokoyama Issei, publicado em 23 de outubro de 2026 (8 min 19 s).
Assistir: https://www.youtube.com/watch?v=TN2zVIrAbaI

Assuntos: [Acessibilidade e design](https://mauricio.issei.com.br/temas/acessibilidade-e-design)

## Sobre o vídeo

Neste vídeo, apresentamos o **DA11Y.md**, um protocolo desenvolvido para que o agente de Inteligência Artificial do Figma consiga projetar, analisar e anotar interfaces acessíveis diretamente no protótipo, antes mesmo do código ser escrito. 

O **DA11Y.md** é o projeto "irmão" do **A11Y.md** (voltado para agentes de programação sob as diretrizes da WCAG 2.2). Ele garante que decisões essenciais de acessibilidade — como **contraste de cores**, **áreas de toque**, **estados de foco**, **mensagens de erro** e **ordem de leitura do leitor de tela** — já estejam definidas e validadas no arquivo do Figma.

📌 **O que você vai conferir neste vídeo:**
- **O que é o DA11Y.md:** Como integrar acessibilidade na etapa inicial do design.
- **Comandos principais do agente no Figma:**
  - `/da11y create`: Para criar componentes utilizando a biblioteca do seu sistema de design.
  - `/da11y analyze`: Para medir contraste, alvos de toque e apontar correções diretamente na tela.
  - `/da11y prepare the accessibility handoff`: Para gerar o mapeamento da ordem de leitura para a equipe de desenvolvimento.
- **Anotações e Relatórios Nativos:** Como as evidências e pareceres de acessibilidade ficam registrados no próprio arquivo do Figma.

---

🔗 **Links e Fontes Oficiais:**
- **Documentação Oficial do DA11Y.md:** https://fecarrico.github.io/da11ymd/
- **Repositório no GitHub:** https://github.com/fecarrico/DA11Y.md
- **Skill na Comunidade do Figma:** https://www.figma.com/community/skill/136973/da11y
- **Conheça também o A11Y.md (para código):** https://fecarrico.github.io/a11ymd/en/

👤 **Projeto idealizado por:** Felipe A. Carriço

---

#Figma #Acessibilidade #DesignSystem #DA11Y #A11Y #UXDesign #UIUX #DesignAccessibility #IAnoFigma

## Transcrição

_Transcrição automática, não revisada._

[0:00] Oi, pessoal. Bem-vindos a mais uma das nossas análises. Hoje a energia tá lá no alto porque a gente vai falar sobre um conceito que é um verdadeiro divisor de águas no mundo do design digital. Imagina só a possibilidade de embutir regras super rígidas de acessibilidade logo na raiz dos protótipos digitais, muito antes de alguém pensar em escrever a primeira linha de código. Pois é exatamente sobre isso que vamos conversar hoje. Então, a primeira grande pergunta que a gente precisa fazer é: por que começar pelo design? Existe um problema crônico na nossa indústria de deixar para resolver as barreiras de acessibilidade só lá na fase de desenvolvimento técnico. Gente, fazer isso é basicamente como tentar consertar o encanamento de uma casa depois que as paredes de gesso já foram instaladas e até pintadas. É um desperdício enorme de tempo. Geram um atrito gigante na equipe e, claro, jogam os custos do projeto nas alturas. Bom, vamos mergulhar de cabeça nisso. A verdade é que muitas decisões cruciais de acessibilidade já estão cravadas no projeto muito antes dele chegar na mesa do time de

[1:00] desenvolvimento. Coisas como o contraste das cores, o tamanho daquelas áreas de toque pros dedos em celulares, os estados de foco visual para quem navega exclusivamente por teclado, o texto exato das mensagens de erro e, claro, a ordem lógica de leitura pros leitores de tela. Tudo, absolutamente tudo isso é definido lá atrás. na fase puramente visual. E para desmistificar como resolver essa lacuna, o nosso roteiro hoje é bem direto. A gente vai passar por um acessibilidade antes do código. Dois apresentando o protocolo da 11y. Y 3, criar, analisar e entregar. 4 evidências no arquivo. Cinco, do design ao código. E para fechar o tópico seis, a persistência da memória. Começando então com o nosso primeiro ponto, a acessibilidade antes do código, ou seja, essa abordagem antecipada. É o que o mercado costuma chamar de shift left, sabe? Puxar as responsabilidades mais pro início do processo. Isso escancara o maior gargalo das equipes de tecnologia hoje, que é esse ciclo imperfeito.

[2:02] Funciona assim. Quando um projeto visual ignora as diretrizes inclusivas, a equipe de programação acaba tendo que improvisar e consertar os elementos na hora, direto no código. E qual é o resultado prático de toda essa gambiarra? um produto final que fica visualmente diferente daquele protótipo que tinha sido aprovado, o que, convenhamos, gera frustração para todo mundo envolvido no projeto. E é exatamente aí que entra o nosso segundo tópico, a apresentação do protocolo DA11y, unindo design e acessibilidade. O ponto crucial aqui é entender que a gente não tá falando de mais um plugin estético ou de um atalho qualquer. O da11y.m é um protocolo de verdade. É um conjunto muito rigoroso de regras carregado diretamente de repositórios como o GitHub, que ensina o agente nativo de inteligência artificial do Figma não só a criar as telas, mas a auditar e documentar acessibilidade visual desde o primeiríssimo segundo. É sensacional. Avançando pro nosso terceiro ponto, vamos falar da regra de três do protocolo. Os comandos criar, analisar e entregar. O primeiro grande comando é o

[3:04] criar. E olha que sacada genial. A inteligência artificial não sai gerando designs malucos e quebrando o padrão visual da empresa. Nada disso. Ela consulta minuciosamente os componentes que já existem na biblioteca oficial do projeto. Constrói a interface, mantendo os mesmos padrões de cor e espaçamento. E ainda por cima, já entrega a tela com um rascunho da ordem lógica de leitura. Ela respeita totalmente as fundações da marca. O segundo comando dessa tríade é o analisar. É aqui que a mágica matemática acontece de fato. A Ia não fica no eu acho, ela computa os dados reais. Ela mede com uma precisão absurda as taxas de contraste de cor e os milímetros exatos das áreas interativas. Depois disso, ela anota visualmente na própria tela de trabalho o que precisa ser ajustado e cria um relatório completíssimo, separando e numerando todas as falhas. E para fechar, temos o comando de handoff ou a entrega. É a hora de passar o bastão e empoderar a equipe de engenharia. A ferramenta simula na prática as pausas que um

[4:05] leitor de tela faria para uma pessoa com deficiência visual, desenhando isso como se fossem cartozinhos numerados na interface. Mas tem um detalhe super importante, o processo exige validação. Quem tá desenhando precisa dar um visto de aprovação final, ou seja, o fator humano e o olhar crítico nunca são deixados de lado. Certo? Indo pro quarto ponto, as evidências deixadas no arquivo. Em outras palavras, calcular sempre, estimar nunca. E isso ilustra de forma brilhante o nível de exatidão técnica dessa operação. O protocolo não simplesmente olha para uma cor e diz: "Ah, tá legalzinho!", ele faz o cálculo duro, nativo no software, baseando-se em diretrizes globais de acessibilidade. Ele vai te dar um número absoluto, tipo um contraste de 15,18 para um. Sai de cena aquele achismo estético e entra a matemática pura. E para que isso não vire só uma planilha chata, o agente transforma tudo em algo super prático. Ele pendura etiquetas visuais, como se fossem postites coloridos, bem do lado dos elementos que estão com problema. O diagnóstico é super rápido. Ele avisa o

[5:06] que é só uma sugestão de leitura, aponta o que é um defeito específico daquela tela que precisa de correção imediata e dá até um alerta quando o problema vem lá da raiz do design system da empresa. Cálculos super complexos ficam lá no relatório, mas os reparos urgentes meio que gritam direto na tela de quem tá trabalhando. Entrando no nosso quinto tópico, vamos ver como funciona o ecossistema completo em Dudu do Design até o código. Existe um paralelo muito bacana entre duas iniciativas que são praticamente irmãs. O nosso foco hoje, o DA11y, que cuida da parte visual, tem um equivalente direto pra área de engenharia, que é o a11y. Eles se complementam como peças de um quebra-cabeça. Um age direto no agente de design antes mesmo de existir qualquer tecnologia e o outro pega na mão das de programação e ensina como escrever a primeira linha de código seguindo as regras da WCAG. E o mais legal, como eles falam a mesma língua usando as mesmas réguas numéricas e os mesmos níveis de severidade, nenhuma informação se perde no meio do caminho.

[6:06] E agora chegamos ao sexto e último ponto da nossa jornada, a persistência da memória e uma conexão muito curiosa com o pintor Salvador Dali. Tem uma curiosidade de bastidor incrível escondida na própria identidade visual desse protocolo. A sigla DA11Y, que junta design e acessibilidade, tem uma pronúncia que soa exatamente como dali. Sim, é uma homenagem intencional ao mestre Salvador Dali. Se a gente olhar bem de perto a letra A na marca do projeto, vai notar a silhueta daquele famoso relógio derretendo. Isso é fantástico porque dá um toque super humano e criativo a uma ferramenta que é extremamente técnica. Mas não se engane, essa brincadeira artística tem um fundo filosófico bem sério. A gente sabe que rodar inteligência artificial gasta poder de processamento, gasta os famosos tokens. Então, a ferramenta foi muito bem pensada para carregar as regras só quando é realmente necessário. Mas o próprio documento oficial dá o recado claro. A eficiência do sistema é ótima, claro, mas a prioridade número um, o verdadeiro objetivo inegociável disso

[7:07] tudo é garantir produtos que absolutamente todas as pessoas consigam usar. Sabe o relógio derretido lá da obra A persistência da memória? Ele é, na verdade, uma metáfora genial pro grande trunfo dessa tecnologia. Ele ilustra a ambição de transformar a acessibilidade num contexto persistente que fica ali enraizado na memória operacional da IA o tempo todo. A acessibilidade deixa de ser aquele checklist chato feito às pressas no final do projeto para virar uma consciência contínua, orgânica, presente em cada passo do desenvolvimento. E tudo isso deixa a gente com uma provocação final bem poderosa. Pensa bem, se agora a gente tem a capacidade de fixar a inclusão direto na memória persistente de agentes automatizados, criando uma ponte inquebrável entre o design visual e a programação rígida, como é que isso vai remodelar o futuro de todas as experiências digitais do nosso dia a dia? Quando a gente transforma essas regras super complexas em um hábito natural e instintivo da máquina, a gente abre de vez as portas para construir uma internet que é desde o seu primeiríssimo pixel feita para todo mundo. Vale muito

[8:10] a pena continuar acompanhando os próximos passos dessa união entre inteligência artificial e inclusão real.
