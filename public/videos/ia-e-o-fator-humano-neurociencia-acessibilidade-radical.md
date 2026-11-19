# IA e o Fator Humano: Neurociência, Acessibilidade Radical (A11Y.md) e Comunidade

O vídeo analisa o trabalho do designer Felipe A. Carriço: a IA acelera a produção de interfaces, mas a cognição humana continua a mesma. Mostra o A11Y.md, um protocolo aberto que faz agentes de código seguirem a WCAG 2.2 AA desde a primeira linha, e a comunidade AmigUX, feita de conversas horizontais e mentoria.

Vídeo de Maurício Yokoyama Issei, publicado em 30 de setembro de 2026 (7 min 47 s).
Assistir: https://www.youtube.com/watch?v=BNaAVW4VI7Y

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## IA exponencial, cérebro paleolítico

O vídeo trata do choque entre a aceleração tecnológica e os limites da natureza humana [00:00]. A análise segue a trajetória, a pesquisa e a filosofia do designer Felipe A. Carriço: ancorar o desenvolvimento digital na realidade neurobiológica, em vez de seguir os algoritmos às cegas [00:20].

A tensão central: a IA gera interfaces, textos e código numa velocidade exponencial, mas o cérebro que precisa usar tudo isso é a mesma biologia do Paleolítico [00:41]. Segundo o vídeo, esse contraste explica boa parte do esgotamento digital [01:01].

Pense numa balança. A IA não cansa e escala a produção sem limite; a cognição humana tem gargalos estritos de atenção e percepção visual. Se o design olhar só para a velocidade da IA, o resultado é sobrecarga mental e exaustão para o usuário [01:22].

## O que a neurociência impõe ao design

O vídeo cita a pesquisa "Projetando realidades", que Felipe apresentou na PUCRS em 2025. Os sentidos e as vias neurais da memória são caminhos fixos: a dopamina, a consolidação no hipocampo e a carga de decisões no córtex pré-frontal não mudam porque saiu uma IA nova [01:45].

Ignorar a neurociência é tentar passar o oceano da internet por um funil biológico estreito [02:06].

Felipe resume o risco numa frase: "vibe coding só é vibing para quem sabe coding". Pedir à IA que crie sistemas só pela intuição, sem entender a base técnica e a mente humana, gera ruído e interfaces quebradas. Quem não entende o que está sendo construído perde o controle da ferramenta [02:06].

A regra que sai daí: a IA é um ótimo meio de produção, mas não é o objetivo. Encher uma tela com dezenas de componentes gerados pela máquina, sem respeitar o tempo do cérebro, destrói a usabilidade [02:47].

## A crise: escalar a exclusão

Com a IA escrevendo interfaces em segundos, surge uma crise invisível. A IA aprende com a média da web atual, e, segundo o vídeo, dados da WebAIM mostram que 95,9% dos sites têm falhas de acessibilidade detectáveis [03:09].

O resultado é que a IA escala a exclusão por padrão: cria botões que leitores de tela não enxergam e formulários confusos mais rápido do que qualquer equipe consegue corrigir [03:29].

O mercado trata a acessibilidade como checklist tardio, conferido minutos antes do lançamento, muitas vezes por medo de processo. A proposta do vídeo é o oposto: acessibilidade não é polimento final, é uma restrição que existe antes da primeira linha de código [03:50].

## A11Y.md: acessibilidade antes do prompt

Para resolver isso na prática, surge o A11Y.md, um protocolo de código aberto apoiado pelo programa Claude for Open Source, da Anthropic. Segundo o vídeo, ele também foi reconhecido pela Smashing Magazine [04:10].

Mais do que um arquivo de texto, é um sistema de contexto persistente: um contrato de comportamento que obriga agentes como Cursor, Claude e Copilot a seguir as normas de acessibilidade desde o início [04:10].

Dentro do agente, o sistema roda em quatro passos [04:31]:

1. Carrega o contexto de acessibilidade só sob demanda, para não gastar tokens à toa [04:31].
2. Gera a interface já com regras semânticas rígidas [04:31].
3. Valida o código gerado contra os critérios da WCAG 2.2 AA [04:53].
4. Entrega um relatório de pendências, para que nada quebrado vá ao ar sem validação humana [04:53].

A ideia se resume em "acessibilidade antes de qualquer prompt". Ancorar a IA nesses princípios antes de ela saber o que vai construir evita erros técnicos e garante que a tecnologia derrube barreiras, em vez de erguer barreiras maiores e mais rápido [05:13].

## AmigUX: a resposta coletiva

Além do código, a tempestade tecnológica traz o isolamento profissional. A mente e o bem-estar só funcionam bem com conexões humanas reais, e é aí que entra a comunidade AmigUX [05:34].

O lema é "conversa, não palestra": tirar o ego, fugir dos palcos e do marketing de LinkedIn, e criar um espaço de gente interessada em gente [05:56].

Os pilares são horizontalidade e empatia, sem dono da verdade. As conversas são de mão dupla, e a mentoria é voluntária e direta [05:56].

O maior mérito, segundo o vídeo, é um espaço psicológico seguro: um júnior ou um sênior pode dizer "eu não sei fazer isso", admitir erros e evoluir sem medo de julgamento [06:18].

O acesso direto a outras pessoas é o ativo mais valioso. Cada pessoa é um universo de conhecimento prático, e o objetivo é ligar quem quer ensinar a quem precisa aprender [06:38]. Isso troca curtidas por relações profissionais reais e cria uma rede de proteção contra a incerteza que a IA causa [06:58].

## O fator humano como âncora

A tecnologia vai continuar acelerando, com IAs e frameworks novos todo mês. A biologia, a necessidade ética de acessibilidade e a força de uma comunidade não mudam [06:58]. O fator humano é a âncora no meio da tempestade [07:19].

A pergunta final: estamos projetando para alimentar algoritmos ou para respeitar seres humanos? [07:19]

## Perguntas frequentes

### O que é o A11Y.md?

Um protocolo de código aberto que dá aos agentes de código um contexto persistente de acessibilidade, para que gerem e validem interfaces conforme a WCAG 2.2 AA [04:10].

### Por que a IA tende a gerar interfaces inacessíveis?

Porque aprende com a média da web, e, segundo o vídeo, 95,9% dos sites têm falhas de acessibilidade detectáveis [03:09].

## Fontes

- [fecarrico/A11Y.md (GitHub)](https://github.com/fecarrico/A11Y.md): Repositório do A11Y.md, de Felipe A. Carriço, licença MIT: um sistema de contexto para construir software acessível por padrão, com regras alinhadas à WCAG 2.2 AA. A regra no agente aponta para um arquivo central, que carrega guias de referência sob demanda. Cita Cursor, Claude e Copilot e registra que o projeto foi selecionado em julho de 2026 para o programa Claude for Open Source, da Anthropic.
- [AmigUX](https://amigux.com.br/): Site da comunidade gratuita de designers de experiência, produto e serviço, com grupo de WhatsApp, encontros ao vivo e mentoria. Apresenta-se como feita por gente interessada em gente e descreve os encontros como conversa de mão dupla, não palestra.

Revisado por Maurício Yokoyama Issei em 19 de novembro de 2026.

Assuntos: [Acessibilidade e design](https://mauricio.issei.com.br/temas/acessibilidade-e-design), [Tecnologia e cultura](https://mauricio.issei.com.br/temas/tecnologia-e-cultura)

## Sobre o vídeo

Enquanto a Inteligência Artificial acelera vertiginosamente a criação de telas e sistemas, a cognição humana permanece evolutivamente a mesma desde o período paleolítico. Neste vídeo explicativo de 7 minutos e meio, exploramos como o trabalho de **Felipe A. Carriço** (Specialist UX Designer, AI Product Builder e Daltônico) conecta Neurociência, Acessibilidade por IA e Comunidade para garantir que a tecnologia continue a serviço do ser humano.

Conheça o **A11Y.md**, protocolo open-source de contexto persistente apoiado pelo programa *Claude for Open Source* da Anthropic que ensina agentes de código (Cursor, Claude, Copilot) a construírem interfaces acessíveis sob a norma WCAG 2.2 AA desde a primeira linha. Saiba também como a **AmigUX** fomenta uma rede "feita por gente interessada em gente", pautada em trocas horizontais e mentorias gratuitas.

---

### ⏱️ Capítulos / Marcações de Tempo (07:45)

- **00:00** — Introdução: Aceleração da IA vs. a Imutabilidade da Cognição Humana  
- **01:45** — Neurociência e UX: Carga Cognitiva, Atenção e o Risco do "Vibe Coding" Acrítico  
- **03:10** — Acessibilidade como Restrição: O Incômodo e a Origem do **A11Y.md**  
- **04:45** — Contexto Persistente para Agentes de IA: Como o A11Y.md Funciona na Prática  
- **06:15** — A Comunidade **AmigUX**: Conexões Reais, "Conversa, Não Palestra" e Mentorias  
- **07:15** — Encerramento: O Futuro do Design Centrado em Pessoas  

---

### 🔗 LINKS E FONTES CITADAS NO VÍDEO

🚀 **Projeto A11Y.md (Acessibilidade para Agentes de IA):**
* **Site Oficial:** https://fecarrico.github.io/a11ymd/pt-BR/
* **Repositório no GitHub:** https://github.com/fecarrico/A11Y.md
* **Regra Pronta para Copiar na IA (raw pt-BR):**  
  `https://raw.githubusercontent.com/fecarrico/A11Y.md/main/docs/pt-BR/A11Y.md`
* **Guia de Setup e Integração no IDE:** https://github.com/fecarrico/A11Y.md/wiki/Setup-and-Integration
* **Relatório do Benchmark de Eficácia:** https://fecarrico.github.io/a11ymd/pt-BR/estudo/

🤝 **Comunidade AmigUX:**
* **Site Oficial da Comunidade:** https://amigux.com.br/
* **Grupo de WhatsApp (Acesso Gratuito):** https://chat.whatsapp.com/Gv05uVrofVrFENJVGAcayo
* **Agenda de Encontros no Luma:** https://lu.ma/AmigUX
* **Playlist "Papo de AmigUX" no YouTube:** https://www.youtube.com/playlist?list=PLGJvJ2c_ZQuH9Is1zDv0BijRfgnTuQ8Ie
* **Canal Oficial no YouTube:** https://www.youtube.com/@amigux.design

🧠 **Pesquisa Acadêmica:**
* **Trabalho "Projetando Realidades":** O entendimento do cérebro humano no design de experiências do usuário (Pós-graduação em Neurociências e Comportamento, PUCRS, 2025).

👤 **Conecte-se com Felipe A. Carriço:**
* **LinkedIn:** https://linkedin.com/in/fecarrico
* **Medium:** https://medium.com/@carrico

---

# 🏷️ Hashtags
#UXDesign #Acessibilidade #A11Y #InteligenciaArtificial #ClaudeForOpenSource #AmigUX #Neurociencia #WCAG #VibeCoding

## Transcrição

_Transcrição automática, não revisada._

[0:00] Bom, hoje a gente vai deixar bem de lado aqueles clichês corporativos e as promessas genéricas de mercado, sabe? Vamos mergulhar direto numa colisão que é fascinante, mas também muito urgente. O choque entre essa aceleração tecnológica desenfreada que estamos vivendo e os limites imutáveis da nossa própria natureza humana. Nossa análise de hoje vai focar na trajetória, na pesquisa e na filosofia do designer Felipe A Carriço. A gente vai ver como a indústria pode e deve ancorar o desenvolvimento digital na nossa realidade neurobiológica, em vez de só surfar cegamente na onda dos algoritmos. E logo de cara, a gente se depara com a grande tensão da nossa era. Como reconciliar uma IA exponencial com um cérebro que francamente não recebe uma atualização de sistema a milênios. A gente vive um momento em que a geração de interfaces, textos e códigos por máquinas atinge uma velocidade exponencial. É um negócio que beira o infinito, mas o hardware que precisa processar e interagir com tudo isso, o nosso cérebro, é literalmente a mesma biologia dos tempos paleolíticos. É uma

[1:01] corrida injusta entre o software mais rápido da história e um hardware biológico tentando ler frameworks modernos usando instintos de sobrevivência antiquíssimos. Esse contraste é brutal e explica muito desse esgotamento digital que todo mundo tá sentindo. Pensa numa balança. De um lado, a inteligência artificial que não cansa, não tem limite de memória de trabalho e escala a produção infinitamente. Do outro lado, a nossa cognição, que tem gargalos super estritos de atenção e percepção visual. Se o design focar só nessa velocidade infinita da IA e ignorar a biologia do usuário, o resultado, inevitável é uma sobrecarga mental profunda e muita exaustão para quem tá na outra ponta da tela. A pesquisa projetando realidades que o Felipe apresentou na PUC agora em 2025 detalha isso de um jeito muito didático. Os nossos sentidos e as vias neurais que formam a nossa memória são caminhos fixos. a liberação de dopamina, o jeito que a gente consolida dados complexos no hipocampo, a carga de decisões no nosso córtex pré-frontal.

[2:02] Nada disso vai evoluir num passe de mágica só porque saiu uma IA nova no mercado. Ignorar a neurociência hoje é tentar despejar o oceano inteiro da internet por um funil biológico muito, muito estreito. E é aí que entra uma frase genial do Felipe, que serve como um alerta contra o uso cego da inteligência artificial. Vibe coding só é vibing para quem sabe coding. Esse vibe coding que é pedir para ir a criar sistema só na intuição, jogando texto ali no prompt, tá super na moda, né? Mas a verdade é que se você não entende a base técnica e como a mente humana funciona, isso gera apenas ruído e interfaces completamente quebradas. O profissional precisa entender o que tá sendo construído para governar a ferramenta, senão a ferramenta toma as rédias e o projeto vira um caos. O mapeamento do nosso cérebro deixa uma regra innegociável. A IA é sim um meio de produção maravilhoso, mas nunca pode ser o objetivo final. Um design focado em seres humanos de verdade precisa calcular o peso cognitivo de cada região cerebral e inundar uma tela com dezenas de componentes gerados na velocidade da

[3:03] luz pela máquina, sem respeitar o tempo de resposta natural do nosso cérebro, é a receita perfeita para destruir qualquer usabilidade. Sessão um, a crise, escalando a exclusão com a IA. Olha só esse cenário. Com asias codificando interfaces em segundos, a gente esbarrou numa crise invisível gigantesca. A Ia aprende com base na média dos dados da internet atual, certo? E os dados da web aim mostram que impressionantes 95,9% dos sites têm falhas de acessibilidade detectáveis. Treinar modelos de linguagem nesse lixo digital gera um choque de realidade. A IA tá simplesmente escalando a exclusão por padrão. Ela cria botões que leitores de tela não enxergam e formulários bizarros numa velocidade muito maior do que qualquer equipe humana conseguiria consertar. Para estancar essa fábrica de lixo digital, a gente precisa mudar completamente o paradigma. O mercado sempre tratou a acessibilidade como um checklist tardio, aquela tarefa que alguém lembra de conferir 5 minutos antes do lançamento, geralmente por medo de tomar um processo, sabe? Mas a filosofia que a gente tá analisando aqui propõe o oposto. Acessibilidade não é

[4:05] polimento final, é uma restrição de contorno inegociável, uma pré-condição que tem que existir antes de você digitar a primeira linha de código. E para resolver isso na prática, surge o projeto A11y. MD. Ele é um protocolo de código aberto apoiado pelo programa Claore for open source da Antropic e reconhecido pela Smashing Magazine. Mais do que um simples arquivo de texto, ele é um sistema de contexto persistente. Pensa nele como um contrato de comportamento muito rigoroso. Ele basicamente obriga agentes como Cursor, Claud e Copilotor a respeitarem normas de acessibilidade logo de cara, cortando o mal da exclusão pela raiz. Dentro do agente de A, esse sistema roda em quatro passos cirúrgicos. Primeiro, ele carrega o contexto de acessibilidade só sob demanda para não gastar seus tokens à toa. Segundo, ele gera a interface já aplicando regras semânticas super rígidas. Terceiro, o próprio agente bate de frente com código gerado para validar com os critérios internacionais da WCAG 2.2A. E quarto, ele cospe um relatório de pendências claro. Isso garante que

[5:07] nada quebrado vá pro ar sem que um ser humano valide. Toda essa engenharia se resume a uma máxima brilhante, acessibilidade antes de qualquer prompt. É tratar a inclusão como a fundação de tudo. Ancorar a Yar nesses princípios imutáveis, antes mesmo dela saber o que vai construir, evita muita alucinação técnica e, principalmente, garante que a gente tá usando a tecnologia para derrubar muros e não para construir muros ainda maiores e de forma mais rápida. Sessão dois, amigo UX, a resposta coletiva. A gente falou de código, mas essa tempestade tecnológica traz outro problema pesado, o isolamento profissional. Enquanto todo mundo vira refém de algoritmo e produtividade tóxica, a nossa mente e o nosso bem-estar só funcionam de verdade através de conexões humanas reais. E é aí que entra a comunidade Amigo Hooks. O lema deles diz tudo. Isso aqui é conversa, não palestra. A ideia é exatamente esvaziar o ego, fugir dos palcos iluminados e daquele marketing falso do LinkedIn, criando um espaço focado em gente, interessada em gente.

[6:08] Os pilares da Amigx fogem totalmente do corporativismo engessado. O negócio é horizontalidade e empatia, sem dono da verdade, sem microfone. As conversas são sempre de mão dupla e a mentoria é voluntária e direta. Mas o maior golaço deles é criar um espaço psicológico totalmente seguro. É um ambiente onde qualquer um, seja um júnior começando hoje ou um sênior super experiente, pode confessar: "Gente, eu não sei fazer isso. Admitir erros técnicos e evoluir junto, sem aquele medo constante de ser julgado ou cancelado pelo mercado. Dentro desse ecossistema, o acesso direto a outras pessoas é o ativo mais valioso que existe. A lógica é simples e linda. Cada indivíduo é um universo de conhecimento prático. O objetivo é só conectar as pontas, juntar a quem quer muito ensinar com quem precisa urgente aprender. Isso transforma aquelas métricas vazias de curtidas e engajamento em relacionamentos profissionais de verdade, criando uma rede de proteção humana contra toda essa incerteza que a Ia tá causando. Para

[7:09] fechar a nossa reflexão de hoje, fica uma provocação que não dá para ignorar. A tecnologia vai continuar acelerando, não tem jeito. A cada mês vai sair uma IA nova, novos frameworks, mas o nosso hardware biológico, a nossa necessidade ética de acessibilidade e a força de uma comunidade unida, tudo isso é imutável. O fator humano é literalmente a única âncora que a gente tem no meio dessa tempestade. A grande questão que vai definir o nosso futuro digital é a escolha que a gente faz todo dia. Afinal, a gente tá projetando para alimentar algoritmos ou a gente tá projetando para respeitar seres humanos.
