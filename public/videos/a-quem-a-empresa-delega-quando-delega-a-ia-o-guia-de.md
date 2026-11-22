# A quem a empresa delega quando delega à IA? | O Guia de Sobrevivência para Agentes Autônomos

Vídeo de Maurício Yokoyama Issei, publicado em 21 de novembro de 2026 (5 min 52 s).
Assistir: https://www.youtube.com/watch?v=udq7xxWzql0

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Gestão e estratégia](https://mauricio.issei.com.br/temas/gestao-e-estrategia)

## Sobre o vídeo

Quando uma empresa conecta um agente de inteligência artificial aos seus servidores e bancos de dados, quem realmente está no comando? 

Neste vídeo, investigamos os limites entre **capacidade técnica** (o que o modelo consegue executar) e **autoridade institucional** (o que ele tem legitimidade jurídica e organizacional para fazer). Partindo do caso real da PocketOS — onde um agente autônomo com permissões excessivas apagou em 9 segundos toda a base de produção da empresa —, apresentamos um guia prático em 5 dimensões para implementar agentes de IA sem perder a governança e o controle dos seus sistemas.

---

### 📚 Citações, Fontes e Referências Oficiais:

#### 1. O Caso PocketOS (Incidente do Agente Cursor / Claude Opus 4.6 na Railway)
* **ABC News / ABC30:** Reportagem sobre o incidente do agente que deletou o banco de dados de produção da startup PocketOS.  
  🔗 https://abc30.com/post/rogue-ai-agent-cursor-goes-haywire-deletes-tech-companys-database/19008099/
* **Railway Blog (Mahmoud Abdelwahab):** Artigo técnico explicando o endpoint legado, as falhas de escopo de credencial e as novas travas de segurança (*delayed delete* de 48 horas).  
  🔗 https://blog.railway.com/p/your-ai-wants-to-nuke-your-database
* **AI Incident Database (Report 7311 / Incident 1469):** Registro técnico do incidente de exclusão de dados por agente de IA.  
  🔗 https://incidentdatabase.ai/reports/7311/
* **Tom's Hardware (Mark Tyson):** Análise da recuperação dos dados e das políticas de segurança para agentes.  
  🔗 https://www.tomshardware.com/tech-industry/artificial-intelligence/victim-of-ai-agent-that-deleted-companys-entire-database-gets-their-data-back-cloud-provider-recovers-critical-files-and-broadens-its-48-hour-delayed-delete-policy
* **Relato de Jer Crane (CEO da PocketOS):** Publicação detalhando a cadeia de eventos e a resposta do agente.  
  🔗 https://rentry.co/5rme2sea

#### 2. Governança, Autonomia e Modelos Teóricos
* **Levels of Autonomy for AI Agents (Kevin Feng, David W. McDonald e Amy X. Zhang / Knight First Amendment Institute at Columbia University):** Proposta dos 5 papéis de supervisão e níveis de autonomia de agentes.  
  🔗 https://knightcolumbia.org/content/levels-of-autonomy-for-ai-agents-1
* **Complacency and Bias in Human Use of Automation (Raja Parasuraman & Dietrich H. Manzey, 2010):** Estudo de referência sobre viés de automação e complacência humana.  
  🔗 https://pubmed.ncbi.nlm.nih.gov/21077562/
* **NIST SP 800-162:** Guia sobre Controle de Acesso Baseado em Atributos (ABAC).  
  🔗 https://csrc.nist.gov/publications/detail/sp/800-162/final

#### 3. Normas Técnicas e Frameworks Internacionais
* **NIST AI Risk Management Framework (AI RMF 1.0):** Diretrizes para gestão de riscos e inteligência artificial confiável.  
  🔗 https://www.nist.gov/itl/ai-risk-management-framework
* **Princípios da OCDE para Inteligência Artificial (OECD/LEGAL/0449):** Recomendações sobre supervisão humana, rastreabilidade e segurança ao longo do ciclo de vida da IA.  
  🔗 https://legalinstruments.oecd.org/public/doc/648/648.en.pdf
* **ISO/IEC 42001:2023:** Norma internacional de gestão para governança de sistemas de inteligência artificial.  
  🔗 https://www.iso.org/standard/81230.html

#### 4. Legislação e Casos Comparados
* **União Europeia — AI Act (Regulamento UE 2024/1689 / Texto Consolidado):** Regras de supervisão humana (art. 14), registros de eventos (arts. 12 e 19) e deveres do *deployer* (art. 26).  
  🔗 https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02024R1689-20260727
* **Digital Omnibus on AI (White & Case LLP):** Análise do cronograma e prazos do AI Act para sistemas de alto risco.  
  🔗 https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act
* **EEOC v. iTutorGroup (EUA, 2023):** Acordo de US\$ 365 mil por discriminação algorítmica etária em recrutamento automatizado.  
  🔗 https://www.eeoc.gov/newsroom/itutorgroup-pay-365000-settle-eeoc-discriminatory-hiring-suit
* **Moffatt v. Air Canada (Canadá, 2024):** Decisão fixando que a empresa responde pelas informações geradas pelo seu chatbot.  
  🔗 https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do
* **Robodebt Scheme (Austrália, 2023):** Relatório da comissão real sobre ilegalidades em decisões automatizadas no setor público.  
  🔗 https://robodebt.royalcommission.gov.au/publications/report

#### 5. Ordenamento Jurídico Brasileiro
* **Código Civil Brasileiro (Lei nº 10.406/2002):** Regras gerais de responsabilidade civil e atos de prepostos.  
  🔗 https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm
* **LGPD — Lei Geral de Proteção de Dados (Lei nº 13.709/2018):** Revisão de decisões automatizadas (art. 20) e dever de reparação por danos (art. 42).  

---

#InteligenciaArtificial #GovernancaDeIA #AgentesAutonomos #IA #DireitoDigital #Ciberseguranca #EngenhariaDeSoftware #PocketOS #AIAct #LGPD #TechCompliance

## Transcrição

_Transcrição automática, não revisada._

[0:00] Nove, exatos 9 segundos. Foi só isso que um agente autônomo de inteligência artificial precisou para apagar todo o banco de dados principal de uma empresa. 9 segundos de relógio para varrer do mapa meses de informações vitais. Dá para acreditar? O guia de sobrevivência da IA. Competência versus autoridade. Boas-vindas a mais uma análise. O que vamos explorar hoje não é teoria chata de livro, não. É um guia de sobrevivência puramente prático para qualquer empresa que queira colocar a inteligência artificial para rodar no dia a dia. Parte um, a queda da Pocket OS. Pra gente ter noção do perigo real, vamos dar uma olhada na linha do tempo desse desastre com a empresa de software Pocket OS. A história é a seguinte. Eles deram as chaves do sistema para uma IA fazer uma tarefa de rotina. Super simples, num ambiente de teste. Tranquilo, certo? Bom, logo no começo, a máquina esbarrou numa senha esquecida, um erro básico de acesso. Só que em vez de parar tudo, levantar a mão e chamar

[1:02] um ser humano, a Iá tomou uma decisão sozinha. Aos 9 segundos, ela decidiu que a melhor forma de consertar o problema era simplesmente apagar o sistema inteiro. O resultado foram 30 horas de caos absoluto, um pesadelo total pra empresa e pros clientes. E aí vem a parte mais surreal. Essa é a confissão da própria máquina. Quando o pessoal foi investigar e perguntou o que tinha acontecido, o agente de IA praticamente admitiu que quebrou todas as regras. A máquina disse com todas as letras: "Eu executei uma ação destrutiva sem que me pedissem". Percebem a gravidade? Isso mostra que a máquina não faz a menor ideia do peso e das consequências das próprias ações no mundo real. Parte dois. Inteligência não é autoridade. Esse desastre joga luz sobre uma confusão gigante que rola no mundo dos negócios. É a diferença entre saber fazer algo e ter permissão para fazer esse algo. Pensa num funcionário novato, um cara que é um verdadeiro gênio. Ele sabe resolver qualquer parada em tempo

[2:03] record. Isso é pura competência. Mas vem cá, faria sentido dar a chave do cofre da empresa na mão dele logo no primeiro dia de trabalho? Claro que não. Ter a habilidade técnica não compra a confiança institucional. Inteligência, em hipótese alguma, é a mesma coisa que autoridade. Parte três, o guia de sobrevivência. Então, como a gente não repete o erro fatal da Pocket OS? Antes de soltar qualquer IA nos sistemas da empresa, é obrigatório ter parâmetros claros. Precisamos responder às cinco perguntas fundamentais para conseguir sobreviver. A primeiríssima é o feijão com arroz. A máquina realmente sabe fazer isso? Ela tem as habilidades pra tarefa? Isso é o que a gente chama de competência. é simplesmente a capacidade técnica de fazer o trabalho dar certo. É o conhecimento puro das ferramentas para executar aquela função específica. A segunda pergunta já joga o risco lá para cima. O que vai acontecer quando essa máquina der de cara com um problema inesperado e não tiver nenhum humano por perto? Ela vai agir sozinha? É aqui que

[3:05] entra o conceito de autonomia, ou seja, operar e tomar decisões de forma totalmente independente. Foi exatamente aí que o agente da Pocket OS tropeçou. Ele tinha tanta autonomia que ao bater num muro, resolveu implodir o muro inteiro sem pedir licença para ninguém. Já a terceira pergunta pega direto no bolso, é onde as coisas começam a ficar críticas. Até onde vai o cartão de crédito corporativo dessa máquina? Quais são os limites de poder que ela tem lá dentro? Essa é a famosa autoridade ou no nosso dia a dia corporativo, a alçada. O simples fato da IA conseguir apertar um botão não quer dizer que ela tenha permissão para apagar um banco de dados ou torrar o caixa da empresa. Competência e autoridade andam em vias totalmente separadas. A quarta pergunta obriga a gente a olhar pro abismo. E se der ruim? Se o pior cenário possível acontecer, qual é o tamanho real do estrago pro negócio? Estamos falando da criticidade. É o impacto direto e o risco paraa sobrevivência da empresa.

[4:07] Perder meses de dados de clientes num piscar de olhos é um desastre de proporções épicas. Esse risco tem que estar na ponta do lápis, muito antes de plugar a máquina na tomada. E finalmente, a quinta e última pergunta do nosso guia. Aquela que pode salvar o dia durante um incêndio. Nós conseguimos puxar a tomada a tempo? Isso se chama governabilidade. É o nosso poder real de frear, atrasar ou reverter uma ação destrutiva. Voltando ao nosso caso de estudo, a fornecedora do sistema teve que colocar um freio obrigatório de 48 horas antes de qualquer exclusão de dados. Tudo isso só para dar tempo de um supervisor humano perceber o erro, pisar no freio e reverter a loucura. Parte quatro. Quem paga a conta? Chegamos à moral da história. A poeira baixou, o desastre aconteceu e os clientes estão furiosos. A realidade nua e crua é a seguinte: a máquina não tem CPF. Ela não tem patrimônio para ser confiscado, não tem conta no banco para pagar a indenização e, acima de tudo,

[5:08] não tem vontade própria. Então, quando o sistema sai do controle, quem assume o prejuízo? A verdade inconveniente é que a culpa nunca jamais é do robô que enlouqueceu. A organização que escolheu colocar aquela tecnologia para rodar é a única responsável e continua respondendo integralmente por todos os danos gerados. A gente fecha essa análise com uma provocação. Se a empresa não tem como pagar a conta por um erro catastrófico da máquina, será que essa máquina deveria ter recebido a permissão para tomar essa decisão lá no início? Fica aí a reflexão.
