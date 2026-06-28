# BRIEF CONCEITUAL — Terminal Evolutivo v4 · "Shokunin · Kintsugi · Bambu"

**Versão**: 4.0 (direção conceitual) — *A vida através de três filosofias japonesas*
**Data**: 2026-06-28
**Autor**: Direção conceitual (Maurício Issei + ghostwriting assistido)
**Tipo**: Brief de direção criativa e narrativa — **NÃO é especificação técnica**
**Status**: Proposta conceitual aprovada na alma (metáfora + narrativa). **Estrutura e visual ainda ABERTOS** — destinados a prototipagem (Claude Design) e posterior tradução em SDD.
**Sucede**: [`01_SDD_v3_semantica_humana.md`](01_SDD_v3_semantica_humana.md) (v3 "Semântica Humana", implementada e publicada — ver `commit ba957d3`).
**Entregável de produto**: `src/terminal-evolutivo.html` (+ JS/CSS) · URL: `mauricio.issei.com.br/terminal-evolutivo`

---

## 0. Como usar este documento (para humanos e para LLMs sem contexto)

Este brief é **deliberadamente autossuficiente**. Ele foi escrito para que qualquer leitor — incluindo um modelo de linguagem que nunca participou da conversa que o originou — consiga:

1. **Entender o propósito** do site e por que ele existe (§1).
2. **Conhecer a pessoa** por trás dele, com fatos biográficos reais e datados (§2 e §8).
3. **Compreender a metáfora central** e por que ela é a certa (§3–§5).
4. **Analisar criticamente** a proposta e **propor evoluções** sem reintroduzir os erros já cometidos e corrigidos (§9, §11, §13).
5. **Prototipar o visual** a partir de sementes (não de decisões fechadas) (§10) e de um prompt pronto (§12).

> ⚠️ **Hierarquia de decisões.** O que está **decidido**: o propósito (§1), a metáfora Shokunin·Kintsugi·Bambu (§3–§5), o arco emocional (§6), o método narrativo **"cena primeiro, nome depois"** (§9.7 + §7.2), o final aberto (§7), os princípios de design e restrições inegociáveis (§9, §11). O que está **aberto de propósito**: a estrutura/esqueleto (§7.1: tríptico vs. cronológico) e toda a linguagem visual concreta (§10) — cor, tipografia, movimento, uso ou não de WebGL. Estes últimos serão decididos **vendo**, via protótipo. Não trave o que está marcado como aberto; não reabra o que está marcado como decidido sem justificar.

---

## 1. Propósito — por que este site existe

### 1.1 O objetivo absoluto
O Terminal Evolutivo **não é** um portfólio, **não vende** serviços, **não exibe** competências técnicas e **não é** dirigido a recrutadores. Seu objetivo é **expressar quem Maurício é**: a filosofia dele, a visão de mundo, as paixões e a evolução contínua como ser humano. É um **diário de bordo da existência** — o lugar onde ele processa pensamentos, muda de ideia ("refatora as próprias ideias") e busca ser uma versão melhor a cada dia.

### 1.2 A métrica de sucesso
O sucesso não é admiração ("que site impressionante") — é **conexão** ("isso sou eu também"). A diferença é central:

> **Admiração é distância.** **Ser movido é proximidade.**
> Recrutadores e vendas operam na admiração. Este site precisa operar em ser movido.

O leitor ideal termina a página pensando na **própria vida**, não na carreira de Maurício.

### 1.3 Anti-objetivos (o que matar ativamente)
- Tom de currículo / LinkedIn ("experiência em", "focado em resultados", "especialista", "20+ anos de…").
- Herói corporativo infalível. (O oposto: vulnerabilidade sobre perfeição.)
- Espetáculo gratuito / "demo reel" de efeitos visuais — tecnologia que chama atenção para si mesma em vez de carregar significado.
- Listas de conquistas como argumento. O trabalho é **textura da vida**, nunca a tese.

### 1.4 Tom de voz
Reflexivo, genuíno, levemente instigante. Ritmo de **carta de um amigo** ou de **ensaio numa revista de cultura/filosofia** — não de página institucional. Vocabulário vivo e orgânico: aprendizado, caminho, entusiasmo, "erros que viraram faíscas", perspectiva. Primeira pessoa. **Mostrar, não explicar:** a página conta **cenas vividas** e deixa o significado ser *inferido* — ela quase nunca "explica" uma ideia ou nomeia uma filosofia (ver §9.7).

---

## 2. Quem é Maurício (síntese)

**Maurício Yokoyama Issei.** Nascido em **17 de março de 1982**, São Paulo, Brasil. Descendência japonesa — o sobrenome **Issei (一世)** carrega, na cultura nikkei, o sentido de **"primeira geração"** (a geração imigrante). Tech Lead / Arquiteto de Soluções; hoje voltado à **Engenharia de IA Agêntica**. Casado, **três filhos** (uma filha e gêmeos — dois meninos). Mora em São Paulo, numa casa que ele mesmo reformou.

### 2.1 As três paixões (a tese da vida, nas palavras dele)
Maurício resumiu a própria vida em três paixões que formam um **ciclo causal** (um *flywheel*, um volante que se realimenta):

- **Família** — construir uma vida sólida e significativa ao lado da esposa e dos filhos.
- **Evolução** — aprender continuamente e transformar conhecimento em competência.
- **Legado** — organizar experiências para deixar algo útil e duradouro para outras pessoas.

> *"Eu aprendo para evoluir, evoluo para construir algo relevante, e quero que esse resultado fortaleça minha família e deixe um legado."* — o legado, por sua vez, realimenta a vontade de aprender. O ciclo não fecha: **continua**.

### 2.2 A frase-espinha (a maior transformação da vida dele)
> **De "o herói que resolve tudo sozinho" para "a rede que distribui o peso".**
> Ou, na linguagem dele: **de ponto único de falha a um bambuzal.**

Tudo na narrativa orbita essa virada. Ela foi conquistada na dor (ver §6, Kintsugi), não na teoria.

---

## 3. A metáfora central — Shokunin · Kintsugi · Bambu

### 3.1 A descoberta: a metáfora não foi escolhida, foi herdada
O menino que, nos anos 80, absorvia heróis japoneses de TV (**Jaspion, Changeman**) e deles tirou seu primeiro modelo mental ("evolução é contínua, disciplina é silenciosa, ninguém vence sozinho")… cresceu e foi entender a própria vida através da **filosofia japonesa**. Seu próprio nome carrega *Issei* — "primeira geração". **A forma voltou à raiz.** A metáfora não é uma camada estética por cima da biografia; é a biografia se reconhecendo. Por isso ela é mais forte do que qualquer metáfora "inventada" (ex.: uma metáfora de "sinal/terminal" considerada e descartada nesta fase).

### 3.2 Evidência de que a metáfora já estava latente no produto atual (v3)
Dois fatos verificáveis no código publicado confirmam que os instintos de design já apontavam para cá:
- **O acento do site é `#d9b06a`** — um âmbar dourado que o próprio CSS descreve como "o âmbar da infância, retornando como calor maduro". Isso é, literalmente, **o ouro do Kintsugi**.
- **As duas fotos que o site se recusa a filtrar** (classe `figure--bare`, `filter: none !important`) são a **careca de 2017** (a rachadura) e a **família de 2025** (a raiz/o bambuzal) — mostradas "sem mediação". A rachadura e a raiz, já exibidas em verdade.

### 3.3 Os três pilares mapeados nas três paixões
| Pilar japonês | Significado-núcleo | Paixão correspondente | Função na narrativa |
|:--|:--|:--|:--|
| **Shokunin** 職人 | O ofício como caminho de aperfeiçoamento de si | **Evolução** | Dignifica o trabalho sem vendê-lo |
| **Kintsugi** 金継ぎ | A fratura preenchida com ouro; o dano vira beleza | **Resiliência** (o motor que transforma dor em evolução) | É o coração da conexão (vulnerabilidade) |
| **Bambu** 竹 | Raízes profundas, flexão sem quebra, crescimento sem fim | **Família + Legado** | Carrega o alicerce coletivo e o futuro aberto |

> ⚠️ **PRINCÍPIO CENTRAL — "Cena primeiro, nome depois (e opcional)."**
> Esta seção e a §4 explicam os pilares **para quem constrói o site** — são *análise para o builder*, não copy para a página. **Na experiência final, nada disso é explicado ao visitante.** O site nunca abre uma seção dizendo "isto é sobre Shokunin"; ele **mostra uma cena vivida** (sensorial, concreta, 1ª pessoa) e deixa o visitante *sentir* o significado pela narrativa + imagem. Os nomes japoneses (Shokunin, Kintsugi, Bambu) só aparecem **no fim, de forma opcional** (§7.2), como uma chave oferecida a quem quiser — jamais como rótulo que pré-enquadra os capítulos. Mostrar, não explicar; nomear depois, se o visitante desejar. Isso aprofunda a conexão (o leitor *descobre* em vez de receber pronto) e re-encena a vida do autor, que viveu essas três filosofias muito antes de ter nome para elas.

---

## 4. Os três pilares — detalhamento

### 4.1 一 · Shokunin (職人) — o ofício como caminho
**Essência.** O artesão que devota a vida a aperfeiçoar seu trabalho — não por dinheiro ou status, mas como **prática de cultivo de si mesmo**. O shokunin nunca considera a obra "pronta": há sempre um próximo refino. (Referência cultural: Jiro Ono e a busca infinita pela perfeição no ofício.)

**Mapeamento biográfico.** O Pentium 100 MHz que *respondia* (a descoberta de que a máquina obedece à lógica); o estudo de madrugada enquanto trabalhava de dia; o "modelo como fonte da verdade" (UML + MDA, Sysgen, 2003); a teimosia de aprender a próxima coisa; o lema "sempre em beta"; refatorar as próprias ideias. As certificações de 2025 (IA agêntica) deixam de ser crachá e viram **prática de ofício**.

**Função narrativa.** Transforma "carreira" em "ofício" — caminho, não portfólio. **Resolve o medo nº 1** (o currículo frio): o trabalho aparece como devoção, não como conquista a ser vendida.

**Vocabulário sensorial (semente).** Precisão, contenção, a marca da ferramenta, a linha única e bem-feita, luz controlada, tons de grafite/aço, tipografia "de engenheiro". Movimento deliberado, nada desperdiçado. *Maturidade é subtração* (alinhado ao "envelhecimento reverso" já existente — ver §11.4).

### 4.2 二 · Kintsugi (金継ぎ) — a fratura preenchida com ouro
**Essência.** A cerâmica quebrada é remendada com laca e pó de **ouro**. A rachadura não é escondida — é **iluminada** — e se torna a parte mais bela e valiosa da peça. A história do dano é o que há de mais precioso. (Próximo do *wabi-sabi*: beleza na imperfeição e na impermanência.)

**Mapeamento biográfico (os "vales" da vida).**
- **Abril de 2004 — a morte do pai.** Filho único, amadureceu de uma vez: aprendeu a dirigir, vendeu o carro do pai, comprou o primeiro com o próprio salário. *"A vida não esperou eu ficar pronto."*
- **Janeiro de 2017 — o fundo do poço.** Esposa internada, gêmeos recém-nascidos, estresse de anos acumulado; o corpo respondeu com **alopecia** (careca por um ano). O *timeout* de um sistema que operou como **ponto único de falha** por tempo demais. Ensinou sobre **limite** e sobre **pedir ajuda** — a coisa mais difícil para quem sempre resolveu tudo sozinho.

**Função narrativa.** É o **coração da conexão** e o antídoto exato ao "herói infalível". Kintsugi dá **permissão filosófica** para mostrar a rachadura — em ouro, sem vergonha. Vulnerabilidade como fonte de valor, não como confissão. É a frase do próprio Maurício: *"as dificuldades não me definem; o aprendizado obtido com elas me fortalece."*

**Vocabulário sensorial (semente).** Fundo escuro profundo (o preto da laca *urushi*); o **ouro (`#d9b06a`) como único calor**; a costura dourada que se *desenha* ao longo de uma fratura. Nos beats de quebra (2004, 2017), a tela escurece e uma linha de ouro atravessa o vazio. Tecnicamente construível e de alto impacto: uma rachadura que se preenche de luz dourada.

### 4.3 三 · Bambu (竹) — raízes, flexão e continuidade
**Essência.** Raízes profundas e invisíveis; flexibilidade que **verga na tempestade sem quebrar**; oco por dentro (humildade, respiro); cresce em **segmentos com nós** (*fushi* 節), cada nó a marca de uma estação superada; cresce rápido — mas só depois de anos de raiz invisível; e **nunca para de crescer**: sempre há um próximo segmento. Um bambu sozinho é frágil; um **bambuzal é um só sistema de raízes** sob a terra — cada colmo vive ~10 anos, o bambuzal vive séculos.

**Mapeamento biográfico.** O alicerce coletivo: a esposa que cresceu de **analista a empresária**; sogros, cunhados, sobrinhos e primos como rede de apoio real; "habilitar o time" em vez de resolver sozinho. A casa que **vergou em 2017 e não quebrou**. E o futuro aberto.

**Função narrativa.** Carrega **Família + Legado** numa imagem só, e resolve a frase-espinha (§2.2): o "bambuzal" **é** a "rede que distribui o peso". O legado fica concreto: *você é um colmo; o que você planta nas raízes (família, quem você forma, conhecimento organizado) vira o bosque que continua depois de você.*

**Vocabulário sensorial (semente).** Verde só onde importa; crescimento vertical; **os nós como marcadores de capítulo**; raízes abaixo da dobra; movimento de vento (verga, não quebra); o oco como espaço negativo e respiração.

---

## 5. Os três são um sistema (não três peças soltas)

- **Shokunin** é como ele **trabalha** (a verticalidade da maestria).
- **Kintsugi** é como ele **cura** (transformar a quebra em ouro).
- **Bambu** é como ele **cresce e sustenta** (raiz, flexão, continuidade).

E os três **absorvem e dão corpo** à trinca anterior (Família/Evolução/Legado). O ganho decisivo: a filosofia abstrata virou **três imagens construíveis**.

> "Família" não se desenha; **raízes de bambu**, sim. "Resiliência" não se desenha; **uma costura de ouro numa fratura**, sim. "Evolução" não se desenha; **as mãos do artesão refinando a lâmina**, sim. Maurício traduziu a própria filosofia em três imagens que um designer (ou um modelo de geração visual) consegue construir. É isso que torna a proposta pronta para protótipo.

---

## 6. O arco emocional (princípio do contraste: vales antes de picos)

A emoção só impacta se for rara. Se o site inteiro "grita", nada é alto. A força dos vales (Kintsugi) depende de o entorno estar cheio. Sequência emocional pretendida:

1. **Captação / origem** (infância) — densidade, calor, ruído analógico; o receptor que absorve.
2. **Despertar do ofício** (adolescência) — a máquina responde; de espectador a operador (Shokunin nasce).
3. **A trincheira** (anos 2000) — trabalho braçal + estudo; aprender a ouvir o usuário; o arquiteto nasce no legado dos anos 2000 (não em 2020).
4. **VALE — 2004** (morte do pai) — **silêncio**; a primeira fratura. Aqui o design vira **ausência**.
5. **A fundação** (2010–2015) — casamento, filha; sacrifício consciente; "prioridade é o que se faz, não o que se diz"; raízes de bambu se aprofundam.
6. **VALE — 2017** (alopecia/esgotamento) — o fundo do poço; o ponto único de falha falha. A segunda fratura — e a **virada**: pedir ajuda.
7. **A virada do arquiteto** — "desenhar sistemas eu já fazia; agora desenho a inteligência — e os times — que os operam." De resolver sozinho a orquestrar e mentorar.
8. **O bambuzal** (hoje) — o alicerce coletivo; de ponto único de falha a uma rede.
9. **FINAL ABERTO** — o nó que continua crescendo (ver §7).

> **Regra de ouro do contraste:** nos vales (passos 4 e 6), **retire** — luz, cor, efeito, som. A ausência é o efeito mais forte. O site v3 já prova isso: o momento mais potente de toda a página é o "Silêncio de Abril/2004", que não tem efeito nenhum.

### 6.1 Cena vivida vs. explicação filosófica (a regra prática)
A unidade da narrativa é a **cena**, não o conceito. Cada beat é um momento concreto que o visitante *vive*; o significado é **inferido**, nunca declarado. O contraste a perseguir (as cenas ✅ são ilustrativas — a copy final será reescrita na voz de ensaio):

- **Shokunin** — ❌ *"Shokunin é o artesão que devota a vida ao ofício."* → ✅ *"Um Pentium 100 MHz. Eu digitava e ele respondia. Fiquei acordado de madrugada, todas as noites daquela semana, só pra ver até onde dava."*
- **Kintsugi** — ❌ *"As fraturas, preenchidas de ouro, tornam-se a parte mais bela."* → ✅ *"2004. Em abril, perdi meu pai."* (silêncio, tela quase vazia) … e, muito depois, a foto da careca — sem filtro, os filhos no colo.
- **Bambu** — ❌ *"O bambu tem raízes profundas e verga sem quebrar."* → ✅ *"Hoje, quando a casa balança, não sou mais eu sozinho segurando. Minha mulher — que virou empresária. Os sogros. Todo mundo na varanda, na mesma foto."*

O visitante sente o ofício, a fratura-virada-ouro e a raiz **sem que ninguém diga as palavras**. As palavras vêm depois, se ele quiser (§7.2). A regra cabe numa frase: **se um parágrafo soa como definição, vira cena; se soa como cena, mantém.**

---

## 7. O final que não fecha — o bambu que continua

**Decisão do dono:** o final **não** volta ao começo (nada de loop fechado). A vida de Maurício continua, e ele quer **dar continuidade ao site no futuro** — isso deve ficar explícito e ser **estrutural**, não um adendo.

O bambu é o veículo perfeito: a narrativa termina não numa conclusão, mas numa **ponta de crescimento** — o nó mais novo, ainda macio, ainda subindo, com **espaço deixado de propósito acima dele**. Não há rodapé de "fim"; há um **"continua"**. Cada capítulo futuro da vida vira um novo **nó** no colmo. A promessa de continuidade é visível: o último segmento está incompleto, apontando para cima, esperando.

**Implicação para o produto:** a arquitetura de conteúdo deve permitir **acrescentar nós/capítulos** sem reescrever o todo (capítulos como unidades adicionáveis). Isso vale tanto para o esqueleto cronológico quanto para o tríptico.

### 7.1 Estrutura — DUAS opções honestas (decisão adiada para o protótipo)
A alma está decidida; o esqueleto, não. As duas opções nascem da mesma alma — a diferença é só por onde o leitor caminha. **Recomenda-se decidir vendo (protótipo), não argumentando.**

**Opção A — Tríptico (três movimentos).** O site é três atos, **titulados por cena, não por conceito** — ex.: *"A máquina que respondia" / "O que quebrou" / "Quem segura comigo"* (NUNCA "Shokunin/Kintsugi/Bambu" como rótulos de seção — isso violaria §9.7).
- *A favor:* é o mais ousado; abandona de vez a cara de timeline; cada movimento vira um "mundo" próprio.
- *Contra:* perde a propulsão do tempo e o "envelhecimento reverso" (maior ativo da v3); risco de soar abstrato/estático; clímax emocional mais difícil de orquestrar; e, sobretudo, **um tríptico tende a pedir rótulos temáticos** — exige disciplina extra para honrar "cena primeiro, nome depois".

**Opção B — Bambu cronológico (os três como lentes).** O tempo segue sendo o eixo (1982 → hoje → nó aberto), e os três conceitos são as **lentes** que iluminam cada fase; o colmo cresce **nó a nó** pelos anos.
- *A favor:* preserva o envelhecimento reverso e o fallback acessível já construídos; fácil de seguir ("teste da vovó"); o crescimento por nós é literalmente cronológico.
- *Contra:* exige curadoria de voz constante para não recair em "e aí, e aí, e aí" (energia de currículo).

> Há também um **híbrido** possível: cronologia como eixo (B), com **três "câmaras" temáticas** (A) destacadas em momentos-chave — o ofício como fio condutor, as fraturas douradas como interlúdios escuros, o bambuzal como final. Vale prototipar.

### 7.2 A nomeação — a chave entregue no fim (opcional e diegética)
Depois que o visitante **viveu** as cenas — e só então — o site pode oferecer, discretamente e para quem quiser, as três palavras que nomeiam o que ele acabou de sentir: *Shokunin, Kintsugi, Bambu*. Não como rótulos no topo dos capítulos, mas como um **presente no fim**, perto do nó de bambu que continua:

> *"Há três palavras japonesas que eu só fui encontrar muito depois. Elas dão nome ao que eu já vinha vivendo sem saber."* — e então, só então, os três nomes, com uma linha cada.

Por que isto funciona:
- **É diegético.** O autor também viveu essas filosofias antes de nomeá-las (o menino dos heróis japoneses → a filosofia japonesa na maturidade). A estrutura "descobrir e depois nomear" **re-encena a vida dele**.
- **Respeita o visitante.** Quem quer a chave, recebe; quem não quer, segue sem ela — a emoção já aconteceu. A nomeação é *epílogo*, não *legenda*.
- **Aprofunda, não fecha.** Os nomes chegam quando o visitante já tem com o que conectá-los; viram revelação ("ah — *era isso*"), não rótulo.

> **Forma sugerida (a prototipar):** um epílogo curto e silencioso, ou três notas discretas/expansíveis que o visitante *escolhe* abrir. Nunca um menu de seções "Shokunin / Kintsugi / Bambu" no topo.

---

## 8. Matéria biográfica-fonte (cronologia completa, agnóstica de estrutura)

> Esta seção preserva o **material bruto** para qualquer estrutura escolhida (e para LLMs sem o contexto). Fatos extraídos do produto v3 publicado. Datas e números são reais e devem ser tratados como **fonte da verdade**. As fotos vivem em `public/fotos/`.

### Era 1 · 1982–1994 — Infância (a captação bruta)
- Nasceu 17/03/1982, num Brasil analógico: TV de tubo, antena ajustada na mão.
- Heróis japoneses: **Jaspion, Changeman**. Deles, o modelo mental: evolução contínua, disciplina silenciosa, **"ninguém vence sozinho"**.
- Era um **receptor**: o sinal entrava inteiro, sem filtro.
- Fotos: `1982.jpeg` (o ponto de origem, "foto da caixa de sapato"); `infancia.png` (montagem de infância anos 80 — **usar pequena e subordinada**, nunca como herói; risco de kitsch).

### Era 2 · 1995–1999 — Adolescência (o sistema responde)
- **Pentium 100 MHz** com CD-ROM: Doom, TIE Fighter, Full Throttle. O computador **respondia** → de consumidor a **operador**.
- **Curso técnico em Processamento de Dados** (Colégio Guarani, 1997–1999) — deu nome ao vício: lógica, algoritmo.
- **1998:** primeiro contracheque — auditor de lojas no **Shopping Eldorado**, durante o curso técnico. Estudar e trabalhar ao mesmo tempo começou cedo e nunca mais parou.
- Foto: `eldorado.jpg` (1998).

### Era 3 · 2000–2009 — A trincheira (throughput máximo, margens mínimas)
- Internet discada como **primeiro emprego de verdade**: suporte técnico no provedor **iG** e depois **OSite** (2000–2002). Ali aprendeu a **ouvir o usuário** antes de servi-lo com código.
- Cursinho **Etapa** (2000); **Mackenzie a partir de 2001** (Sistemas de Informação), à noite. Acumulou dependências, recuperadas **sacrificando férias**, ano após ano.
- **2003:** programador na **Sysgen** — tratou o **modelo como fonte da verdade** (UML + geração de código por **MDA**). "A semente do arquiteto nasceu nos anos 2000, não em 2020."
- **Abril/2004:** **perdeu o pai.** (VALE — ver §6.)
- **2005:** formou-se na Mackenzie; na foto, ao lado da **mãe**.
- **2009:** conheceu a **esposa** — a vida deixa de ser só evolução individual e passa a ser construção conjunta.
- Fotos: `callcenter.jpg` (2002), `programa.jpg` (Sysgen, 2003), `formatura.jpg` (2005, com a mãe).
- Trabalho (pano de fundo, "STAR"): Analista Programador Java — **Sysgen** (2003–2012; J2EE, MVC, UML, MDA, DB2); Analista de Desenvolvimento Java — **Telefônica** (2005–2008; EJB, JBoss, Oracle; primeiros papéis de liderança).

### Era 4 · 2010–2015 — A fundação (sacrifício consciente)
- Sem férias em 2009 e 2010; em **2011** vendeu férias e bônus para pagar a festa de casamento; lua de mel de **5 dias**. *"Prioridade é o que se faz, não o que se diz."*
- **2011:** casamento (`casamento.jpg`).
- **2012:** nasce a **filha** (`filha.jpeg`) → troca conforto por estabilidade e vai para a **Indra**. Batismo de fogo: janela de implantação de **107 horas em 7 dias**. Juntou três frentes que o formaram arquiteto: sustentação, inovação móvel (AWS, microsserviços, Android/Ionic) e arquitetura junto ao time comercial.

### Marco do Arquiteto · transição Era 4 → 5
> *"Desenhar sistemas eu já fazia. Agora desenho a inteligência — e os times — que os operam."*
- O arquiteto foi forjado no legado dos anos 2000. O que mudou na virada para a IA não foi a natureza do trabalho — foi a **escala** (cloud, SRE) e o **papel**: de resolver sozinho a **orquestrar e mentorar**.

### Era 5 · 2016–2026 — Maturidade (forjada na turbulência)
- **2016:** nascem os **gêmeos** — bodies com **Ctrl+C** e **Ctrl+V** (`gemeos.jpeg`). A responsabilidade não dobrou; multiplicou.
- **Janeiro/2017:** esposa internada, estresse acumulado, **alopecia** (careca por um ano). Fundo do poço; o ponto único de falha falhou. Lição: limite e pedir ajuda. (VALE — ver §6.) Foto `careca.jpeg` (2017, com os filhos — **sem filtro**, dignidade).
- **Dez/2017–jan/2018:** passagem pela **Serasa** (imersão em agilidade; OAuth 2 corporativo). Tinha proposta da **Rede**, mas adiou a saída até **concluir o mega projeto** sob sua responsabilidade — "entregar o que se promete também é arquitetura".
- **2019:** financiou e reestruturou a casa — **demoliu 65%** para otimizar a planta (a mentalidade de refatorar um sistema, aplicada a tijolo).
- Daí em diante: cloud, SRE, observabilidade como linguagem; foco do código para a **orquestração** — IA agêntica, automação, formar quem entrega.
- **2025:** certificações que ancoram a virada — AI Agentic Design Patterns; AI Agents with LangGraph; AI with Knowledge Graphs; GenAI for Leaders.
- Hoje: a esposa cresceu de **analista a empresária**; rede de apoio familiar real. **De operador a arquiteto a mentor — de ponto único de falha a uma rede.**
- Foto final: `familia.jpeg` (2025, a família reunida — **sem filtro**; o alicerce coletivo).
- Trabalho (pano de fundo, "STAR"): Pipe Automática Comercial (2025, +15% metas); Agrupamento Comercial (2024, 10 dias → tempo real); Economia no contrato Salesforce (2020, −R$3MM); Sustentação AFVC + Core Rede / Splunk (2018–2020).

### Números (modo informativo, isolado do fluxo emocional)
20+ anos em tecnologia · 15+ em grandes empresas · 7 anos como Tech Lead na Rede · foco atual: IA Agêntica · −R$3MM (contrato Salesforce) · +15% (metas).

> ⚠️ Os números acima são **intermezzo executivo** — devem ficar **declaradamente fora** do fluxo narrativo (um "modo informativo" opcional, para quem quiser). Não deixe que contaminem o tom de ensaio.

---

## 9. Princípios de design (decididos)

1. **Forma diegética.** Toda decisão visual precisa sobreviver à pergunta: *"O que isso SIGNIFICA na vida dele?"* Se a resposta for "nada, é só bonito" → corta. O espetáculo só é permitido quando **carrega** o significado (ex.: a costura dourada do Kintsugi *é* a cicatriz; as raízes do bambu *são* a rede de apoio).
2. **Instrumento único.** Escolher **um** gesto visual assinatura e aprofundá-lo, em vez de empilhar sete técnicas (parallax + partículas + shaders + scroll-jacking = "demo reel", a energia de venda a evitar). Um site com uma ideia executada com profundidade lê como arte; com sete, como portfólio de agência.
3. **Contraste / vales antes de picos.** Riqueza visual em algumas partes **para poder arrancá-la** nos vales (2004, 2017). A ausência vira o efeito.
4. **"Teste da vovó" (granny test).** Toda complexidade visual deve ter, **por baixo**, um conteúdo limpo, bidimensional, navegável em segundos por qualquer pessoa (idosos, leitores de tela, conexões lentas). Espetáculo em cima, clareza embaixo.
5. **WebGL/3D é clima, não estrada.** Se houver camada rica, ela é **atmosfera atrás do conteúdo** (`pointer-events:none`), **nunca** um obstáculo que o usuário precise "jogar" para avançar. **Sem scroll-jacking** (sequestro de scroll quebra teclado/roda/leitor de tela e mata a intimidade). O leitor controla o ritmo.
6. **As alavancas mais fortes não são visuais.** Específico vence resumo; transformação vence acúmulo; vulnerabilidade é o pedágio da conexão; o universal vem do particular; mostrar as costuras (mudar de ideia) é íntimo; generosidade (fazer ser sobre o leitor) fecha o circuito.
7. **Cena primeiro, nome depois (mostrar, não explicar).** *(princípio central desta revisão — vale para copy E para imagem)* A experiência é feita de **cenas vividas**, não de explicações. O significado de cada pilar é **descoberto** pelo visitante via narrativa + imagem, nunca declarado. Os nomes (Shokunin/Kintsugi/Bambu) e a moldura filosófica deste brief são **para quem constrói**, não para a página — e, se aparecerem ao visitante, é só **no fim, como chave opcional** (§7.2), nunca como rótulo de capítulo. Teste prático: *se um trecho soa como definição, reescreva como cena.* Menos exposição → mais conexão.

---

## 10. Sementes visuais por pilar (matéria-prima, NÃO decisões)

> Para a prototipagem. São **direções a explorar**, não escolhas fechadas. Cor/tipografia/movimento concretos serão decididos vendo.

| Pilar | Paleta-semente | Material / textura | Movimento | Temperatura tipográfica |
|:--|:--|:--|:--|:--|
| **Shokunin** | grafite, aço, off-white; um toque de âmbar | superfície de bancada, marca de ferramenta, linha precisa | deliberado, econômico, "nada sobra" | "de engenheiro": monoespaçada/precisa, contida |
| **Kintsugi** | preto laca profundo + **ouro `#d9b06a`** (único calor) | cerâmica, fratura, costura dourada que se desenha | a rachadura que se preenche de ouro; surge no escuro | séria, de peso, com respiro ao redor |
| **Bambu** | verde profundo só onde importa; muito negativo | colmo, nós (*fushi*), raiz, fibra | vento (verga, não quebra); crescimento vertical | leve, arejada, ascendente |

**Constantes transversais (herdadas e desejadas):**
- O **ouro `#d9b06a`** é o fio condutor (já é o acento do site) — calor maduro, ouro do Kintsugi.
- **Envelhecimento reverso** (ver §11.4): começa denso/texturizado → termina espaçoso/limpo. *Maturidade é eliminação de ruído, não adição de efeito* — princípio que casa com Shokunin (subtração) e Bambu (o oco).
- Fotos como **artefatos com peso** (lição do caso Getty/Gehry — ver §13), não ilustração decorativa. As fotos de vale (careca 2017) e raiz (família 2025) ficam **sem filtro**.

---

## 11. Restrições técnicas inegociáveis (herança da v3 — não regredir)

A v3 conquistou qualidades que **não podem ser perdidas** numa evolução visual. Qualquer protótipo/SDD futuro deve preservá-las:

1. **Acessibilidade (WCAG 2.1 AA) com gate automatizado.** O projeto tem gate de testes (Playwright/axe) que precisa permanecer **verde**. Contraste, `alt` descritivo e honesto, foco visível, navegação por teclado.
2. **Fallback sem JavaScript = produto.** O conteúdo é HTML semântico linear, legível por leitores de tela. Toda ambientação (fundo, grão, revelações, eventual WebGL) é **progressive enhancement puramente decorativo**. Sem JS/sem WebGL, a história permanece **inteira e indexável**.
3. **`prefers-reduced-motion`.** Sob redução de movimento, animações somem e o conteúdo aparece estático e completo.
4. **Envelhecimento reverso (ativo a preservar).** A página começa densa e analógica e vai ficando mais limpa e espaçosa; a tipografia muda de **comportamento** (tracking/leading), não necessariamente de família. É a assinatura conceitual da v3 — manter e aprofundar.
5. **Performance-first.** Animar/renderizar só o que está no viewport; mídia em `lazy-load`; imagens em formatos leves (WebP/AVIF) e com `aspect-ratio` para evitar layout shift. Beleza que trava em celular perde a função.
6. **SEO/AEO já integrados.** Há blocos gerados (`AEO:START/END`, JSON-LD, OG, `.md` alternativo para IA) por `scripts/seo/build-aeo.mjs`. **Não editar à mão**; regenerar pelos scripts. Manter o site indexável e "answer-engine friendly".
7. **Histórico de regressão a não repetir.** A v3 **removeu** Three.js de propósito (o 3D anterior era "decoração que envelhece" — partículas/rede-neural/bloom sem significado). Se WebGL voltar, ele **precisa ser diegético** (§9.1) e passar no princípio do instrumento único (§9.2). Reintroduzir efeito por efeito seria refazer o erro já corrigido.

---

## 12. Prompt inicial pronto — para prototipar no Claude Design

> Cole o texto abaixo (ajuste à vontade) para iniciar a prototipagem visual. Ele é autossuficiente.

```
Quero prototipar a direção visual de um site pessoal de narrativa de vida (scrollytelling),
NÃO um portfólio. Objetivo: criar CONEXÃO emocional (o leitor pensa na própria vida), não
admiração nem venda. Tom: ensaio íntimo, primeira pessoa, reflexivo.

A alma do site são três filosofias japonesas que sintetizam a vida do autor (Maurício Issei,
descendente de japoneses — "Issei" = primeira geração; cresceu com heróis japoneses de TV):

1) SHOKUNIN (o ofício como caminho de aperfeiçoamento) → o trabalho/evolução, com dignidade,
   sem cara de currículo. Estética: precisão, contenção, subtração; grafite/aço; tipografia
   de engenheiro; movimento econômico.

2) KINTSUGI (cerâmica quebrada remendada com ouro; a fratura iluminada vira a parte mais bela)
   → os momentos de dor que viraram força (perda do pai; um esgotamento com alopecia; aprender
   a pedir ajuda). Estética: preto laca profundo + OURO (#d9b06a) como único calor; uma costura
   dourada que se desenha sobre uma fratura, surgindo no escuro. Estes são os VALES emocionais:
   aqui o design RETIRA tudo (silêncio, vazio) — a ausência é o efeito.

3) BAMBU (raízes profundas, verga sem quebrar, cresce em nós e nunca para) → família, rede de
   apoio, legado e o futuro aberto. A frase-tese da vida: "de ponto único de falha a um bambuzal
   (uma rede que distribui o peso)". Estética: verde só onde importa, muito espaço negativo, nós
   como marcadores de capítulo, movimento de vento, crescimento vertical.

FINAL ABERTO (obrigatório): o site termina num nó de bambu que continua crescendo, com espaço
deixado acima — "continua". A vida do autor segue; capítulos futuros viram novos nós. Nada de
loop fechado, nada de "fim".

Princípios não-negociáveis:
- Mostrar, não explicar: cada trecho é uma CENA vivida (sensorial, 1ª pessoa, concreta), não a
  explicação de uma filosofia. Os nomes Shokunin/Kintsugi/Bambu NÃO rotulam seções nem aparecem
  no topo; o significado é descoberto pelo visitante via narrativa + imagem. Os nomes só surgem
  NO FIM, opcionais, como uma chave para quem quiser ("há três palavras japonesas que só encontrei
  depois…"). Nada de menu "Shokunin/Kintsugi/Bambu". Se um trecho soa como definição, vira cena.
- Forma diegética: todo efeito tem que SIGNIFICAR algo da vida; nada de efeito decorativo.
- Instrumento único: um gesto visual assinatura, aprofundado — não sete técnicas empilhadas.
- Contraste: riqueza visual em alguns trechos para poder arrancá-la nos vales (silêncio).
- "Teste da vovó": espetáculo em cima, conteúdo limpo e legível embaixo; funciona sem JS e sem
  WebGL; acessível (WCAG AA), sem scroll-jacking, respeita prefers-reduced-motion.
- "Envelhecimento reverso": começa denso/texturizado e termina espaçoso/limpo (maturidade =
  eliminar ruído, não somar efeito).
- O ouro #d9b06a é o fio condutor de cor.

Me proponha 2–3 direções visuais distintas para a HERO/abertura e para um beat de KINTSUGI
(a fratura dourada), explorando o gesto visual assinatura de cada direção.
```

---

## 13. Lições de referência (o que roubar / o que ignorar)

Pesquisa de sites biográficos premiados (Awwwards/Webby). Filtro: a maioria é **comercial/institucional** (opera na admiração) — usar só o que serve à **conexão**.

| Referência | Roubar | Ignorar |
|:--|:--|:--|
| **A História de Julie** (Exército de Salvação) | É o norte: objetivo = empatia, não conversão. **Uma metáfora contínua** (fluido) carregando a vida inteira, sem cortes → continuidade emocional. Valida o "instrumento único". | — |
| **Steven.com** (OFF+BRAND) | O **"teste da vovó"**: cabeçalho 3D pesado em cima, corpo limpo embaixo, tudo funciona sem o 3D. | O flywheel-órbita como *forma* (é venda de holding). |
| **Sculpting Harmony** (Getty/Gehry, Resn) | **Artefatos interativos**: objetos reais com peso (aqui, as fotos do Maurício). | O tom documental/acadêmico frio. |
| **The Power of Storytelling** (Noomo) | "Cada capítulo é um mundo" (luz/cor/física próprias por fase). | Shaders de cristal/fênix de vidro — espetáculo gratuito. |
| **The Lookback** | Lições de **performance** (só anima o que está no viewport). | Navegação livre tripla — para uma vida (história conduzida), liberdade demais **dilui** a emoção. |
| **Casa de Anne Frank** | — | Avatar de IA / VR / múltiplos perfis: resolve problema institucional, não o de um leitor + uma história. Seria "tecnologia em busca de propósito". |

**Fio comum dos que emocionam (Julie, Gehry):** poucos elementos, **uma** metáfora, continuidade sem cortes, conteúdo que respira. As diretrizes finais da própria pesquisa (whitespace, performance-first, granny test, WCAG, soberania dos dados) **endossam a v3** — este brief só adiciona uma camada de espetáculo **diegético** por cima.

---

## 14. Glossário (para leitores sem o contexto)

- **Shokunin (職人):** artesão japonês cuja identidade é a devoção infinita ao ofício; a obra nunca está "pronta".
- **Kintsugi (金継ぎ):** arte de reparar cerâmica quebrada com laca e ouro, tornando a fratura visível e valiosa; filosofia de abraçar o dano como parte da história.
- **Bambu (竹) / fushi (節):** planta de raízes interconectadas que verga sem quebrar e cresce em segmentos marcados por nós (*fushi*); um bambuzal é um só organismo subterrâneo.
- **Issei (一世):** "primeira geração" (de imigrantes japoneses) — também o nome do autor.
- **Scrollytelling:** narrativa cuja progressão visual é controlada pelo scroll.
- **Progressive enhancement:** camada extra (CSS/JS/WebGL) que enriquece sem ser pré-requisito do conteúdo.
- **Envelhecimento reverso:** a página começa densa/analógica e vai ficando limpa/espaçosa; maturidade = eliminar ruído.
- **Forma diegética:** quando a técnica visual É parte da história (carrega significado), não enfeite.
- **Granny test ("teste da vovó"):** o site precisa ser usável e compreensível por qualquer pessoa, por baixo de qualquer sofisticação visual.
- **STAR:** Situação · Tarefa · Ação · Resultado — formato de caso usado para o trabalho (que aqui é pano de fundo).

---

## 15. Registro de decisões e perguntas em aberto (para evolução futura)

### 15.1 Decisões tomadas (e por quê)
- **Metáfora = Shokunin · Kintsugi · Bambu.** Porque é herdada da própria vida (descendência japonesa, heróis de infância) e traduz a filosofia em imagens construíveis. Substitui metáforas inventadas consideradas antes ("o sinal/terminal").
- **Final aberto (bambu que continua), sem loop fechado.** Decisão explícita do dono: a vida continua e o site vai crescer.
- **Método narrativo "cena primeiro, nome depois" (mostrar, não explicar).** Decisão do dono (2026-06-28): reduzir a explicação filosófica na experiência e aumentar as **cenas vividas**; o visitante descobre os significados pela narrativa + imagem e só então, **opcionalmente**, recebe os nomes (Shokunin/Kintsugi/Bambu) no fim. Aprofunda a conexão e é diegético (espelha a vida do autor, que viveu as filosofias antes de nomeá-las). Ver §9.7, §6.1, §7.2.
- **Estrutura adiada** (tríptico vs. cronológico) — a ser decidida por protótipo.
- **Visual adiado** — a ser decidido por protótipo (Claude Design), a partir das sementes (§10) e do prompt (§12).
- **Preservar a herança da v3** (a11y, fallback, envelhecimento reverso, SEO/AEO) — não regredir.

### 15.2 Perguntas em aberto (para resolver no protótipo / próxima SDD)
1. **Esqueleto:** tríptico (A), cronológico-bambu (B) ou híbrido (§7.1)?
2. **Gesto visual assinatura:** qual é o ÚNICO? (candidato forte: a costura dourada do Kintsugi; alternativas: o crescimento do colmo de bambu; a luz controlada do ofício.)
3. **WebGL sim ou não?** Só entra se for diegético e único (§11.7). Decidir vendo — pode ser que CSS/SVG já entregue a intenção (como na v3).
4. **Som?** A pesquisa sugere feedback auditivo tátil; avaliar com cautela (autoplay e a11y). Provavelmente opcional/ativado pelo usuário.
5. **Como a "adição de nós" futura será operacionalizada?** (estrutura de conteúdo que permita acrescentar capítulos sem reescrever o todo.)
6. **`infancia.png`:** incluir (pequena, subordinada) ou omitir? (risco de kitsch — decisão do dono.)

### 15.3 Próximos passos sugeridos
1. Prototipar 2–3 direções visuais (Claude Design) usando §12.
2. Escolher esqueleto (§7.1) **vendo** o protótipo.
3. Reescrever a copy completa na voz de ensaio (já há um rascunho do Manifesto/Engrenagens/Notas; reaproveitar e expandir por pilar).
4. Traduzir a direção escolhida em **SDD técnica** (sucessora da `01_SDD_v3`), preservando §11.
5. Implementar incrementalmente, mantendo o gate verde a cada passo.

---

*Fim do brief. Este documento é a fonte conceitual da v4. Onde ele e o código divergirem, este documento descreve a INTENÇÃO; a SDD técnica futura é quem decide a EXECUÇÃO — preservando as restrições inegociáveis (§11).*
