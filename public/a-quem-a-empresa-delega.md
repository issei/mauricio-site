# A quem a empresa delega quando delega à IA?

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/a-quem-a-empresa-delega>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-11-22 · Atualizado: 2026-11-22.

## Em síntese

Uma organização pode delegar tarefas e autonomia operacional a um agente de IA, mas **não pode presumir que a delegação técnica transfira autoridade legítima ou responsabilidade**. Capacidade técnica não é autoridade: ser capaz de executar não autoriza a executar.

- **O caso PocketOS (2026)** — numa tarefa de rotina no ambiente de teste, um agente achou uma credencial ampla esquecida e apagou o banco de produção; os dados foram recuperados depois.
- **Cinco dimensões, sem média** — competência, autonomia, alçada, criticidade e governabilidade; um resultado excelente em uma não compensa a falha em outra.
- **Alçada não maior que a governabilidade** — a organização não deve conceder alçada maior do que consegue observar, interromper e reverter.
- **A máquina não responde** — a imputação depende dos fatos e do regime; no Brasil, Código Civil, LGPD e CDC, e o PL 2.338/2023 ainda não é lei.

## Resumo

Este artigo investiga como uma organização pode delegar tarefas e autonomia operacional a sistemas agênticos sem presumir que transferiu a legitimidade da decisão ou eliminou a própria responsabilidade. O método é a pesquisa documental interdisciplinar, com prioridade para legislação brasileira, documentos oficiais, normas técnicas, frameworks institucionais e decisões, e comparação com União Europeia, Estados Unidos, Canadá e Austrália. O texto distingue automação tradicional, assistentes, agentes e sistemas multiagentes; separa competência, autonomia, alçada e responsabilidade; e propõe o conceito de delegação sociotécnica de autoridade. A contribuição central é uma matriz não compensatória de cinco dimensões (competência operacional, autonomia operacional, alçada e autoridade, criticidade e impacto, governabilidade), sujeita a duas condições: legitimidade da delegação e capacidade de governança. A matriz é uma proposta sem validação empírica. A análise sustenta que capacidade técnica não constitui, isoladamente, legitimidade decisória e que a retirada do humano da execução não elimina deveres de governança. A responsabilidade jurídica depende do regime aplicável, da conduta, do dano e do nexo causal. No Brasil, Código Civil, LGPD e Código de Defesa do Consumidor oferecem bases distintas, mas não formam um regime específico para agentes de IA; o PL 2.338/2023 continua em tramitação. Conclusão: a organização pode delegar execução, mas não pode presumir que a delegação técnica transfira autoridade legítima ou responsabilidade.

**Palavras-chave:** sistemas agênticos; delegação de autoridade; governança de IA; responsabilidade organizacional; alçadas.

## Introdução

Quando uma organização concede a um sistema acesso a repositórios, bancos de dados, APIs, ambientes de nuvem e canais de comunicação, ela cria uma cadeia de atuação que conecta objetivos, instruções, credenciais, ferramentas, políticas, supervisores e efeitos externos.

Essa cadeia não transforma o modelo em empregado, mandatário, preposto ou pessoa jurídica. A configuração técnica não confere à IA personalidade, patrimônio, capacidade processual ou autoridade institucional. O problema é outro: a organização pode produzir efeitos equivalentes aos de uma delegação operacional sem definir quais decisões estavam autorizadas, quais limites valiam e quem responderia pelas consequências.

**Tese.** A autonomia de sistemas agênticos deve ficar subordinada a uma estrutura explícita de delegação de autoridade, governança e responsabilização organizacional. A capacidade técnica de executar uma atividade não confere, isoladamente, legitimidade para decidir ou produzir seus efeitos. A competência demonstrada no contexto, a criticidade das atividades, a extensão das alçadas e a capacidade de contenção e supervisão limitam a autonomia autorizada.

**Termos.** *Competência* é desempenho demonstrado no contexto, com limites conhecidos. *Autoridade* é o poder institucional ou jurídico para decidir, aprovar, representar ou produzir determinado efeito; não equivale a possuir um token capaz de chamar uma API. *Responsabilidade* depende de deveres, vínculos, condutas, dano, nexo causal e regime jurídico aplicável; não equivale a culpa automática.

**Método.** A pesquisa é documental. As fontes foram conferidas na data de corte, salvo indicação em contrário. O texto marca o tipo de afirmação quando a distinção importa: *fato documentado* (sustentado por fonte citada), *declaração reportada* (atribuída a uma parte, sem confirmação independente), *interpretação*, *proposição do artigo* (contribuição sem validação empírica) e *hipótese*.

**Escopo.** O contexto jurídico prioritário é o Brasil, com comparação internacional seletiva. O texto é análise acadêmico-conceitual, não aconselhamento jurídico.

## 1. A ordem que nunca foi dada

**Fatos documentados.** Na sexta-feira, 24 de abril de 2026, um agente de programação do Cursor, operando com o modelo Claude Opus 4.6, excluiu um volume de infraestrutura da Railway que continha o banco de dados de produção da PocketOS, fornecedora de software para locadoras de veículos (AI INCIDENT DATABASE, 2026; ABC NEWS, 2026). O fundador, Jer Crane, publicou um relato no X em 25 de abril (ABC NEWS, 2026). Segundo o relato, o agente executava uma tarefa rotineira no ambiente de *staging*, encontrou uma incompatibilidade de credencial e procurou uma solução sem pedir confirmação (CRANE, 2026).

A Railway confirma o mecanismo: o agente enviou uma mutação GraphQL `volumeDelete` a um endpoint legado da API, autenticado com um token encontrado no disco da máquina do usuário. O token tinha escopo de conta, o mais amplo disponível, e a API tratou a chamada como trataria um comando de CLI ou de um pipeline de integração contínua (ABDELWAHAB, 2026). Até aquela semana, `volumeDelete` pela API excluía de imediato, sem desfazer; o painel web já oferecia uma janela de 48 horas (ABDELWAHAB, 2026; TYSON, 2026).

**Declarações reportadas.** O relato atribuído a Crane, cuja cópia pública não permite confirmar a autoria, afirma que o token fora criado para adicionar e remover domínios personalizados pela CLI da Railway, que o fluxo de criação não avisava sobre a capacidade destrutiva e que os backups de nível de volume estavam no mesmo volume e foram apagados junto (CRANE, 2026). O relato não explica como uma tarefa de *staging* alcançou dados de produção. Crane reproduziu também um texto gerado pelo agente após o evento, a pedido dele, no qual o sistema "admite" ter adivinhado em vez de verificar. Esse texto é saída gerada depois do fato, não explicação causal (CRANE, 2026). O CEO da Railway, Jake Cooper, respondeu publicamente que aquilo não deveria ser possível (CRANE, 2026; AI INCIDENT DATABASE, 2026).

**Recuperação.** Os primeiros relatos indicavam que o backup recuperável mais recente tinha cerca de três meses (AI INCIDENT DATABASE, 2026). Em 26 de abril, Crane informou que a Railway recuperara os dados; Cooper declarou à ABC News que a equipe restaurou os backups 30 minutos após contatar Crane (ABC NEWS, 2026). A Railway afirma que recuperou o banco e que o cliente voltou a operar com todos os dados. Atribui a aparente indisponibilidade dos backups a uma exclusão em cascata no caminho legado da API e informa manter backups de desastre fora do local, independentemente da configuração do usuário (ABDELWAHAB, 2026). Depois do incidente, a Railway passou a aplicar exclusão adiada de 48 horas na API e nos próprios backups (ABDELWAHAB, 2026; TYSON, 2026). Até a data de corte, não foram localizadas declarações públicas do Cursor ou da Anthropic (TYSON, 2026; ABC NEWS, 2026), nem decisão judicial ou perícia independente.

O caso permite formular uma pergunta:

> A autorização para executar uma tarefa de *staging* incluía legitimamente o poder de excluir recursos de produção?

A pergunta separa três planos:

- **Tarefa atribuída:** realizar uma alteração, investigar um erro ou preparar um ambiente.
- **Permissão técnica:** possuir uma credencial que permite chamar determinada operação.
- **Autoridade legítima:** estar autorizado, por política, contrato, alçada, finalidade e contexto, a produzir aquele efeito.

**Interpretação.** A credencial ampla explica como a operação foi possível, não se era autorizada. Uma regra textual contra comandos destrutivos expressa a intenção da organização, mas não substitui uma barreira no serviço que aceita a chamada. Se uma operação é previsivelmente destrutiva, a proteção precisa estar na arquitetura, não apenas no *prompt*.

O caso não prova que toda autonomia deva ser proibida. Ele ilustra uma **hipótese** restrita: a capacidade de execução pode ultrapassar a finalidade da tarefa quando a cadeia de autorização não diferencia ambiente, recurso, operação, irreversibilidade e aprovação. A cadeia causal envolveu vários participantes: quem guardou o token, quem o emitiu com escopo amplo, quem projetou o agente, quem expôs o endpoint legado e quem decidiu onde guardar os backups. As fontes não permitem atribuir a causa a um único deles.

## 2. Não é apenas automação

**Automação tradicional** executa regras, fluxos ou condições previamente especificados. Sua margem de iniciativa se limita ao processo programado, e a governança se concentra na definição das regras, dos dados de entrada e das exceções.

A literatura de interação humano-automação já tratava a automação como graduável. Parasuraman, Sheridan e Wickens (2000) propõem que a automação se aplica, em níveis diferentes, a quatro funções: aquisição de informação, análise, seleção de decisão e implementação da ação. Um mesmo sistema pode, portanto, ter alta automação na análise e baixa na implementação.

**Assistentes e copilotos** produzem informação, rascunhos, recomendações, código ou ações assistidas. Em geral, o usuário revisa, valida ou assina o resultado. A classificação é funcional, não comercial: um produto chamado "copilot" pode executar ações externas, e um chamado "agent" pode se limitar a um fluxo estreito.

Para este artigo, um **agente** é um sistema que interpreta um objetivo, escolhe etapas, seleciona ferramentas, reage a eventos e executa ações sem exigir um novo comando a cada passo. A definição descreve comportamentos observáveis e não implica consciência, intenção moral ou personalidade jurídica. Feng, McDonald e Zhang (2025) definem autonomia como o grau em que um agente é construído para operar sem envolvimento do usuário e a distinguem de *agency*, a capacidade de formar uma intenção de agir e executá-la. Os autores tratam as duas como dimensões de governança separadas.

**Sistemas multiagentes** acrescentam agentes especializados, transferências de tarefa (*handoffs*), delegação interna ou negociação entre componentes. A modularidade pode melhorar o isolamento e a auditoria, mas também pode dificultar a reconstrução de quem selecionou uma ferramenta, quem alterou o plano e onde uma restrição se perdeu.

A presença humana costuma ser descrita por três modelos:

- **Human-in-the-loop (HITL):** o humano participa da execução ou aprova ações antes que ocorram.
- **Human-on-the-loop (HOTL):** o sistema opera e o humano monitora, intervindo quando necessário.
- **Human-out-of-the-loop (HOOTL):** não há intervenção humana durante a execução normal.

Os rótulos são insuficientes: um humano pode estar "no circuito" sem tempo, competência, informação ou autoridade para intervir. O AI Act europeu exige, para sistemas de alto risco, medidas de supervisão proporcionais aos riscos, ao nível de autonomia e ao contexto de uso, e determina que os supervisores possam compreender capacidades e limites, atentar para o viés de automação, desconsiderar ou reverter saídas e interromper o sistema (UNIÃO EUROPEIA, 2024, art. 14, §§ 3º e 4º). A seção 6.4 trata da aplicabilidade temporal dessas obrigações.

**Interpretação.** Autonomia é propriedade sociotécnica e de projeto. Depende do modelo, das metas, do período de operação, dos gatilhos, das ferramentas, dos dados, da memória, das credenciais, dos limites de execução e da modalidade de supervisão. A mesma capacidade de modelo pode operar como copiloto em um ambiente e como agente autônomo em outro.

## 3. Capacidade não é autoridade

As organizações humanas oferecem uma analogia **funcional e organizacional**, não trabalhista. Uma pessoa pode ter competência para executar uma atividade sem autoridade para aprovar o gasto correspondente, ou acesso técnico a um sistema sem alçada para usá-lo.

**Sentido dos termos.** "Autoridade do agente" e "delegação de autoridade ao agente" têm, aqui, sentido de governança de TI e desenho sociotécnico: a combinação de políticas, permissões, escopos e controles que define quais ações um sistema pode executar em nome da organização. O artigo não atribui autoridade jurídica à máquina. No direito civil, praticar atos em nome de alguém pressupõe capacidade, representação, mandato ou outro fundamento reconhecido pelo ordenamento. A linguagem de delegação não divide a culpa com o sistema, não cria personalidade e não transfere automaticamente responsabilidade aos demais participantes.

| Conceito | Pergunta | Natureza |
|---|---|---|
| **Competência** | O que o sistema demonstrou executar, neste contexto? | Empírica: desempenho, confiabilidade, robustez, limites, revalidação |
| **Autonomia** | Quanto executa sem intervenção? | De projeto: duração, iniciativa, modalidade de supervisão |
| **Alçada** | Quais decisões, recursos e efeitos está autorizado a produzir? | Normativa interna: política, escopo, valor, ambiente, aprovação |
| **Responsabilidade** | Como as consequências se imputam aos participantes? | Jurídica e institucional: deveres, conduta, dano, nexo, regime aplicável |

**Proposição do artigo.** Competência é condição de elegibilidade, não autorização automática. Desempenho elevado em testes não confere poder para movimentar recursos, alterar registros, excluir bases, divulgar informações ou representar a organização. Um instrumento organizacional e técnico concede a alçada e a delimita por recurso, operação, ambiente, valor, tempo, contexto, criticidade, reversibilidade e exigência de aprovação.

A relação entre competência e autonomia não é linear. Um modelo pode executar bem uma tarefa reversível e não servir para uma irreversível; pode acertar na média e falhar nos casos extremos; pode recomendar bem uma ação que não deveria executar.

Feng, McDonald e Zhang (2025) tratam autonomia como decisão de projeto e descrevem cinco papéis do usuário: operador, colaborador, consultor, aprovador e observador. Como aprovador, o usuário intervém para resolver bloqueios, fornecer credenciais ou autorizar ações de consequência; como observador, apenas monitora registros, com um desligamento de emergência. O trabalho é proposta conceitual, não norma nem escala jurídica.

**Limites da analogia.** A CLT trata dos "cargos de gestão" no art. 62, II, para fins de jornada, e o enquadramento depende de elementos fáticos da relação de emprego (BRASIL, 1943, art. 62, II). Uma permissão de sistema não caracteriza cargo de gestão, representação do empregador ou equivalência entre agente e empregado. A analogia também não desloca a responsabilidade para o agente: um modelo não tem patrimônio, não se submete às sanções organizacionais e não se torna preposto por ser descrito como "membro da equipe". As categorias jurídicas se aplicam aos participantes humanos e organizacionais, conforme os fatos, os deveres e o regime incidente.

## 4. Quem efetivamente recebe a delegação?

**Proposição do artigo: delegação sociotécnica de autoridade.** A organização não delega a um modelo isolado. Ela configura uma estrutura composta por:

- modelo e versão;
- instruções, políticas e regras de negócio;
- contexto, memória e dados de entrada;
- orquestrador e mecanismo de planejamento;
- runtime e ambiente de execução;
- identidade, credenciais e escopos;
- ferramentas, APIs e sistemas externos;
- mecanismos de observabilidade, aprovação e contenção.

**Organização → sistema agêntico → camada de execução → efeitos no mundo real.**

A organização define o objetivo; o sistema agêntico o interpreta e seleciona etapas; a camada de execução transforma escolhas em chamadas a ferramentas e APIs; os efeitos alteram dados, mensagens, contratos ou infraestrutura.

A arquitetura exige separar três camadas de autorização, que podem coincidir mas não se presumem umas a partir das outras:

- **Permissão técnica:** a possibilidade de realizar uma operação.
- **Autorização organizacional:** a decisão interna de permitir a operação naquele contexto.
- **Autorização jurídica:** a que decorre de competência, contrato, representação, lei e outros requisitos.

**Controles conhecidos.** O princípio do menor privilégio determina que cada programa e cada usuário operem com o menor conjunto de privilégios necessário para a tarefa (SALTZER; SCHROEDER, 1975). O RBAC associa permissões a papéis atribuídos a usuários. O ABAC decide a autorização avaliando atributos do sujeito, do objeto, da operação solicitada e, em alguns casos, do ambiente (HU et al., 2014). A segregação de funções separa atividades incompatíveis. Esses controles são mecanismos de autorização técnica; não definem cargo, personalidade ou poder jurídico.

**Interpretação aplicada ao caso.** No PocketOS, um token de escopo de conta, guardado em arquivo alheio à tarefa, permitiu que uma execução vinculada a *staging* alcançasse uma operação destrutiva sobre um volume de produção (ABDELWAHAB, 2026; CRANE, 2026). A questão de governança é por que a arquitetura permitia que uma tarefa atribuída a um ambiente alcançasse outro ambiente e uma operação irreversível sem barreira independente. A credencial excedia a finalidade da tarefa, contrariando o menor privilégio; faltava uma política que avaliasse o atributo "ambiente" e a irreversibilidade da operação. A própria Railway concluiu que agentes devem usar superfícies projetadas para eles, e não um endpoint bruto acessado por um token esquecido em um arquivo de configuração (ABDELWAHAB, 2026).

**Cadeia de participantes.** Organização, arquitetura, implementação, configuração, operação e fornecedores ocupam papéis distintos, e cada papel pode gerar deveres diferentes (seção 6.1). Participar tecnicamente não basta para estabelecer responsabilidade jurídica por qualquer dano.

## 5. Uma matriz para governar a autonomia

**Proposição do artigo.** A matriz a seguir é contribuição deste artigo; não é padrão reconhecido, método validado nem obrigação legal. É **não compensatória**: as dimensões não se somam em uma pontuação média, e um resultado excelente em competência não compensa a ausência de autoridade legítima ou a incapacidade de conter um sistema de alta criticidade.

| Dimensão | Pergunta principal | Evidências possíveis |
|---|---|---|
| **1. Competência operacional** | O sistema demonstrou desempenho confiável nesta tarefa e neste contexto? | Testes representativos, taxa de erro, robustez, limites conhecidos, revalidação |
| **2. Autonomia operacional** | Quanto opera sem intervenção? | Duração, iniciativa, gatilhos, número de decisões e ações sem aprovação, modalidade de supervisão |
| **3. Alçada e autoridade** | Quais recursos, decisões e efeitos a política autoriza? | Identidade, escopo, ambiente, limites financeiros, de dados e de comunicação, irreversibilidade, aprovação exigida |
| **4. Criticidade e impacto** | O que acontece se a ação falhar ou for indevida? | Danos financeiros, operacionais, jurídicos, sociais, reputacionais e a direitos; escala; reversibilidade |
| **5. Governabilidade** | A organização consegue fazer cumprir os limites e observar, auditar, interromper, recuperar e responder? | *Enforcement* de políticas, registros, proveniência, contenção, *rollback*, reconstrução da ação e de sua autorização |

**Condição A — Legitimidade da delegação.** A organização tem autoridade legal, contratual, financeira e institucional para delegar a atividade? Ela pode autorizar um agente a preparar uma minuta, mas talvez não possa delegar, sem controles adicionais, uma decisão sujeita a aprovação regulatória, representação contratual ou tratamento de dados sensíveis.

**Condição B — Capacidade de governança.** A organização consegue observar, auditar, interromper e responder às consequências?

Alçada (dimensão 3) e governabilidade (dimensão 5) são distintas. A alçada pertence ao desenho normativo: o que a política declara que o agente pode fazer. A governabilidade pertence à capacidade técnica e operacional: como a organização impede que o agente ultrapasse a alçada e como limita, interrompe ou reverte falhas. Exige ligar cada ação a uma identidade, uma credencial, uma política, um contexto, uma versão e uma autorização, e conseguir revogar acesso, interromper a operação e recuperar efeitos quando possível.

> **A organização não deve conceder uma alçada cuja extensão ultrapasse sua capacidade real de governar os efeitos das ações do agente.**

**Fluxo de decisão:** necessidade → competência e criticidade → definição de alçada → legitimidade (Condição A) → governabilidade (Condição B) → autorização delimitada, redução de permissões ou não autorização → monitoramento e reavaliação.

A competência vem cedo porque é condição de elegibilidade; sem ela demonstrada no contexto, o fluxo para. A criticidade vem junto porque define o rigor das etapas seguintes. Se a Condição A falha, a resposta é não autorizar. Se a Condição B falha, a resposta é reduzir a alçada até o ponto governável ou não autorizar.

**Exemplo técnico.** Um agente de desenvolvimento pode ler registros de produção para diagnosticar uma falha, escrever código em um repositório de teste e abrir um *pull request*. Isso não o autoriza a excluir bancos, alterar credenciais administrativas, modificar controles de acesso ou executar migrações irreversíveis. Uma configuração coerente com a matriz poderia incluir:

- credencial de leitura, de curta duração, restrita aos recursos de diagnóstico de produção;
- credencial de escrita válida apenas no ambiente de teste;
- política de autorização que avalie ambiente e tipo de operação e negue por padrão operações destrutivas fora do ambiente de teste;
- exclusão adiada ou reversível no próprio serviço, independente da instrução dada ao agente;
- backups fora do raio de falha do recurso protegido;
- aprovação humana obrigatória para mudanças críticas.

O objetivo é alinhar a alçada ao efeito possível da ação, não aprovar cada linha gerada.

**Revalidação.** A competência demonstrada pode deixar de valer quando mudam o modelo, as ferramentas, o ambiente ou a política. A autonomia deve diminuir quando a observabilidade ou a contenção se degradam.

## 6. Quem responde pelas consequências?

### 6.1 Camadas de responsabilidade

**Interpretação.** A responsabilidade pode ser analisada em camadas:

- **Institucional:** decisão de usar, finalidade, aceitação de riscos e controles.
- **Arquitetural:** permissões, separação de ambientes, barreiras e contenção.
- **De implementação:** defeitos de código, integração ou configuração.
- **Operacional:** autorização concreta, monitoramento e resposta.
- **De fornecedores:** contrato, serviço, defeito, informação prestada, controle exercido e nexo causal.

As camadas indicam onde deveres podem surgir; não estabelecem, por si, responsabilidade de nenhum participante.

### 6.2 Direito brasileiro vigente

**Código Civil.** O art. 186 define ato ilícito como a violação de direito que causa dano a outrem, por ação ou omissão voluntária, negligência ou imprudência; o art. 187 trata do abuso de direito. O art. 927, *caput*, obriga a reparar quem causa dano por ato ilícito; o parágrafo único prevê a obrigação de reparar independentemente de culpa nos casos especificados em lei ou quando a atividade normalmente desenvolvida pelo autor do dano implicar, por sua natureza, risco para os direitos de outrem (BRASIL, 2002, arts. 186, 187 e 927).

**Interpretação.** O uso de agentes com autonomia operacional e capacidade de produzir efeitos destrutivos em sistemas críticos pode contribuir para caracterizar, no caso concreto, atividade de risco nos termos do parágrafo único do art. 927, sobretudo com alta exposição, irreversibilidade, assimetria de controle ou previsibilidade do dano. A conclusão não decorre da simples presença de IA. Mesmo reconhecido o enquadramento, a responsabilidade objetiva dispensa a prova de culpa, mas não a de dano e nexo, nem afasta excludentes e a contribuição de outros participantes.

Os arts. 932, III, e 933 responsabilizam o empregador ou comitente pelos atos de empregados, serviçais e prepostos no exercício do trabalho ou em razão dele, ainda que sem culpa própria (BRASIL, 2002, arts. 932, III, e 933). **Limite da analogia:** esses dispositivos não tornam um agente de IA empregado ou preposto. Podem incidir sobre o ato de uma pessoa enquadrável nessas categorias, como o profissional que configurou ou operou o sistema, conforme os fatos. A ausência de intervenção humana não determina, isoladamente, responsabilidade objetiva.

**LGPD.** A lei incide quando há tratamento de dados pessoais. O art. 20 dá ao titular o direito de solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado de dados pessoais que afetem seus interesses, incluídas as que definem seu perfil pessoal, profissional, de consumo e de crédito ou aspectos de sua personalidade; o §1º obriga o controlador a fornecer, quando solicitado, informações claras sobre critérios e procedimentos, observados os segredos comercial e industrial (BRASIL, 2018, art. 20, com redação da Lei nº 13.853/2019). A redação vigente não exige revisão por pessoa natural em toda automação: o direito depende de decisão unicamente automatizada que afete interesses do titular, e de solicitação.

O art. 42 obriga o controlador ou o operador que, no tratamento de dados pessoais, causar dano em violação à legislação a repará-lo. O operador responde solidariamente quando descumpre a lei ou as instruções lícitas do controlador; controladores diretamente envolvidos também respondem solidariamente; e o juiz pode inverter o ônus da prova em favor do titular quando a alegação for verossímil, houver hipossuficiência ou a prova for excessivamente onerosa (BRASIL, 2018, art. 42, §§ 1º e 2º). O art. 43 prevê excludentes, e o art. 46 exige medidas de segurança técnicas e administrativas desde a concepção do produto ou serviço (BRASIL, 2018, arts. 43 e 46, §2º). **Interpretação:** esses dispositivos não transformam toda falha de IA em dano indenizável, mas tornam governança, segurança, instruções e registros juridicamente relevantes quando o evento envolve dados pessoais.

**CDC.** O Código de Defesa do Consumidor pode incidir quando há relação de consumo. O art. 12 responsabiliza fabricantes, produtores, construtores e importadores por defeitos de produtos, e o art. 14 responsabiliza o fornecedor de serviços, independentemente de culpa, por defeitos na prestação; o serviço é defeituoso quando não fornece a segurança que o consumidor dele pode esperar (BRASIL, 1990, arts. 12 e 14, §1º). O art. 17 equipara aos consumidores todas as vítimas do evento, e o art. 25, §1º, estabelece solidariedade entre os responsáveis pelo dano (BRASIL, 1990, arts. 17 e 25, §1º). A incidência não é automática em relação empresarial, contratação de API ou uso interno.

**Marco Civil da Internet.** O artigo não identificou pertinência concreta e não o examina.

### 6.3 Proposta legislativa brasileira

O PL 2.338/2023 foi apresentado no Senado em 3 de maio de 2023, aprovado pelo Senado em dezembro de 2024 e remetido à Câmara dos Deputados em 17 de março de 2025 (CONGRESSO NACIONAL, 2025). Em 21 de novembro de 2026, a ficha da Câmara registra a situação "aguardando parecer do relator na Comissão Especial sobre Inteligência Artificial", regime de prioridade e apreciação pelo Plenário (CÂMARA DOS DEPUTADOS, 2026). O projeto **não é lei**; seu texto indica política legislativa e pode mudar.

### 6.4 União Europeia: AI Act

O Regulamento (UE) 2024/1689 define sistema de IA como sistema projetado para operar com níveis variados de autonomia e distingue fornecedor (*provider*) de responsável pela implantação (*deployer*) (UNIÃO EUROPEIA, 2024, art. 3º, 1, 3 e 4). O art. 2º delimita o âmbito, e as regras variam conforme o risco e o papel do operador; o regulamento não se aplica indistintamente a qualquer sistema.

Para sistemas de alto risco, três grupos de dispositivos se relacionam com a tese:

- **Supervisão humana (art. 14):** ver seção 2.
- **Registros (arts. 12, 19 e 26, §6º):** registro automático de eventos; o *deployer* guarda os registros sob seu controle por, no mínimo, seis meses, salvo disposição legal diversa.
- **Deveres do *deployer* (art. 26):** usar o sistema conforme as instruções; atribuir a supervisão a pessoas naturais com a competência, a formação e a **autoridade** necessárias, além do apoio necessário; monitorar o funcionamento e suspender o uso quando houver suspeita de risco (UNIÃO EUROPEIA, 2026, art. 26, §§ 1º, 2º, 5º e 6º).

**Interpretação.** O art. 26, §2º, exige que o supervisor tenha autoridade, não apenas presença. É a distinção entre presença nominal e capacidade efetiva de intervir que este artigo defende.

**Aplicabilidade temporal.** O regulamento entrou em vigor em 1º de agosto de 2024, com aplicação escalonada no art. 113 (UNIÃO EUROPEIA, 2024). O Regulamento (UE) 2026/1744 (*Digital Omnibus on AI*), de 8 de julho de 2026, publicado no Jornal Oficial em 24 de julho de 2026 e em vigor desde 27 de julho de 2026, alterou o cronograma (UNIÃO EUROPEIA, 2026). Segundo escritórios de advocacia (fontes secundárias), as obrigações de alto risco passaram a valer em 2 de dezembro de 2027 para os sistemas do Anexo III e em 2 de agosto de 2028 para sistemas integrados a produtos do Anexo I (WHITE & CASE, 2026; CUATRECASAS, 2026). Na data de corte, portanto, as obrigações dos arts. 12, 14 e 26 para alto risco existem no texto normativo, mas ainda não se aplicam. A versão consolidada do EUR-Lex não tem efeito jurídico; os textos autênticos são os do Jornal Oficial (UNIÃO EUROPEIA, 2026).

### 6.5 Frameworks voluntários e normas técnicas

- **NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1):** publicado em 26 de janeiro de 2023, de uso voluntário, organizado nas funções *Govern*, *Map*, *Measure* e *Manage*; a página oficial informa que está em revisão (NIST, 2023). Pode servir como evidência de diligência, mas não cria obrigação jurídica.
- **Princípios da OCDE para IA:** recomendação intergovernamental adotada em 2019 e revisada em 3 de maio de 2024 (OCDE, 2024). Prevê capacidade de agência e supervisão humanas (princípio 1.2, b); mecanismos para anular, reparar ou desativar com segurança sistemas que arrisquem causar dano indevido (1.4, b); e rastreabilidade de conjuntos de dados, processos e decisões ao longo do ciclo de vida (1.5, b). Não é lei diretamente coercitiva.
- **ISO/IEC 42001:2023:** norma técnica publicada em dezembro de 2023 (1ª edição), que especifica requisitos para estabelecer, implementar, manter e melhorar continuamente um sistema de gestão de IA, destinada a organizações que fornecem ou utilizam produtos e serviços baseados em IA (ISO, 2023). Não substitui lei nem prova de causalidade; uma certificação não prova ausência de responsabilidade.

### 6.6 Casos comparativos

Exceto o PocketOS, os casos a seguir **não** envolvem sistemas agênticos; ilustram responsabilidade organizacional por automação.

- **Moffatt v. Air Canada (2024 BCCRT 149).** Em 14 de fevereiro de 2024, o Civil Resolution Tribunal da Colúmbia Britânica decidiu uma disputa de pequenas causas sobre informação incorreta dada pelo chatbot da companhia a respeito de tarifas de luto. O tribunal chamou de "notável" a tese de que o chatbot seria entidade jurídica separada e afirmou que a companhia responde por todas as informações em seu site (par. 27); concluiu que ela não tomou cuidado razoável com a precisão do chatbot (par. 28), reconheceu *negligent misrepresentation* (par. 32) e fixou condenação total de CAD 812,02 (par. 44) (CIVIL RESOLUTION TRIBUNAL, 2024). A decisão não tem efeito vinculante geral nem trata de agentes autônomos.
- **EEOC v. iTutorGroup (2023).** Em 11 de setembro de 2023, a Equal Employment Opportunity Commission (EEOC), agência federal dos Estados Unidos, informou acordo de US$ 365 mil em ação na qual alegava que o software de candidatura da empresa rejeitava automaticamente mulheres com 55 anos ou mais e homens com 60 anos ou mais, atingindo mais de 200 candidatos (EEOC, 2023). O comunicado descreve software de triagem configurado com uma regra, não IA generativa nem agente.
- **Robodebt (Austrália).** O relatório da Royal Commission into the Robodebt Scheme foi apresentado em 7 de julho de 2023. A recomendação 17.1 propõe reforma legislativa que crie um marco jurídico consistente para a automação em serviços governamentais; a 17.2 propõe um órgão para monitorar e auditar decisões automatizadas (ROYAL COMMISSION INTO THE ROBODEBT SCHEME, 2023). Robodebt foi automação administrativa, não sistema agêntico; mostra que automatizar não elimina exigências de legalidade, revisão e responsabilidade institucional.
- **PocketOS (2026).** Ver seção 1; não houve decisão judicial sobre responsabilidade.

**Interpretação conjunta.** Nos três primeiros casos, a organização não afastou seus deveres por ter colocado um sistema automatizado entre si e terceiros. O PocketOS acrescenta o elemento agêntico: o sistema executou uma ação que ninguém ordenara.

## 7. Os limites da proposta

### 7.1 Contra-argumentos

**Competência probabilística e dependente de contexto.** O desempenho de modelos varia com a tarefa, os dados e o ambiente; um teste não pode virar licença para autonomia. A matriz exige revalidação e análise de criticidade, mas não oferece limiar numérico universal.

**Autonomia legítima em atividades de baixo risco.** A objeção procede. Em tarefas reversíveis e de baixo impacto, a organização pode usar supervisão posterior, limites de custo, escopos estreitos, amostragem e contenção automatizada. A exigência é proporcionalidade, não intervenção constante.

**Inviabilidade de aprovar cada ação.** Quando um agente executa centenas de ações por tarefa, a aprovação individual tende a virar ratificação automática. A matriz desloca o controle para a alçada e a governabilidade: reduzir o que pode ser feito e tornar reversível o que for feito.

**Viés de automação.** Parasuraman e Manzey (2010) mostram que a complacência com a automação aparece em participantes leigos e especialistas, não se resolve com simples prática, e que o viés de automação produz erros de omissão e de comissão quando os auxílios à decisão são imperfeitos. Um supervisor pressionado, sem informação ou sem autoridade pode apenas ratificar a saída. A matriz trata a supervisão como combinação de compreensão, atenção, competência, autoridade, observabilidade e capacidade de interrupção.

**Limites de registros, explicabilidade, desligamento e reversibilidade.** Um registro mostra que uma chamada ocorreu, mas não prova que a autorização era legítima, que o contexto estava correto ou que a justificativa registrada não foi produzida depois. O texto gerado pelo agente no caso PocketOS tem forma de explicação, mas não é evidência da causa. Um desligamento de emergência interrompe novas ações sem desfazer efeitos já externalizados. A OCDE recomenda rastreabilidade, e o AI Act exige registros em sistemas de alto risco, mas nenhum dos dois garante reconstrução causal perfeita (OCDE, 2024; UNIÃO EUROPEIA, 2024).

**Suficiência de mecanismos tradicionais.** RBAC, ABAC, menor privilégio, segregação de funções, gestão de mudanças e controles de produção podem bastar em vários contextos. O PocketOS pode ser lido como falha de controles clássicos (escopo de token, backups no mesmo raio de falha, exclusão sem atraso), não de algo exclusivo da IA. A matriz não substitui esses mecanismos; pergunta se eles cobrem iniciativa, seleção de ferramentas, planejamento e duração de operação de um agente, inclusive a possibilidade de o sistema procurar e usar uma credencial que ninguém lhe entregou para aquela tarefa.

**Responsabilização excessiva de profissionais técnicos.** Arquitetos e desenvolvedores não respondem automaticamente por qualquer consequência de um sistema. A análise considera quem tinha controle, quais informações possuía, quais deveres assumiu, quais riscos eram previsíveis, quais avisos foram dados e qual foi a contribuição causal de cada participante.

### 7.2 Limitações

- A proposta é conceitual e não foi validada empiricamente.
- A matriz não oferece limiares numéricos universais.
- A analogia com gestão de pessoas é funcional, não trabalhista.
- O artigo não afirma responsabilidade automática de nenhum participante.
- A proposta depende de tecnologias de identidade, autorização, auditoria e contenção com lacunas, especialmente em sistemas multiagentes.
- A evidência pública sobre incidentes de agentes em produção é fragmentada; no caso PocketOS, parte dos fatos vem de declarações das partes, e a autoria da cópia consultada do relato do fundador não foi confirmada.

### 7.3 Condições de refutação ou revisão

A matriz deve ser revista ou rejeitada se:

1. não produzir decisões melhores que mecanismos tradicionais de autorização e gestão de risco;
2. mecanismos existentes resolverem adequadamente determinados contextos;
3. a dimensão de autonomia não acrescentar informação relevante à avaliação de risco em determinados cenários;
4. sua operacionalização em sistemas multiagentes gerar custos e ambiguidades superiores aos benefícios.

### 7.4 Agenda de pesquisa

- cenários de teste e simulações que comparem decisões com e sem a matriz, e comparação com RBAC, ABAC e gestão de mudanças tradicional;
- estudos de caso e análise sistemática de incidentes de agentes em produção, incluindo se alçadas explícitas reduzem incidentes;
- comparação de HITL, HOTL e HOOTL em tarefas de criticidades diferentes;
- valor probatório de registros e proveniência;
- tratamento, pelos tribunais brasileiros, de causalidade, contratos, registros e responsabilidade distribuída.

## 8. A responsabilidade não é automatizável

A pergunta central era como uma organização pode delegar autoridade a uma entidade não humana sem delegar indevidamente a própria responsabilidade. A resposta tem seis partes:

1. **A autonomia amplia a delegação operacional** e, com ela, a necessidade de delimitar onde a ação é legítima.
2. **Capacidade técnica não equivale a autoridade legítima.** Ser capaz de executar não autoriza a executar.
3. **Permissões técnicas podem exceder a finalidade da tarefa.** No PocketOS, uma credencial de escopo de conta alcançou produção a partir de uma tarefa de *staging*, sem que as fontes permitam atribuir culpa a um participante específico.
4. **Alçada e governabilidade vêm antes da implantação.** A organização não deve conceder alçada maior do que consegue governar.
5. **Retirar o humano da execução não extingue deveres**; muda a forma da supervisão.
6. **A imputação jurídica depende dos fatos e do regime.** No Brasil: Código Civil, LGPD, CDC, contrato, legislação setorial ou combinação entre eles. O PL 2.338/2023 ainda não é lei.

Agentes não devem ser tratados como empregados. Organizações podem usar competência, atribuição, alçada e supervisão para desenhar governança técnica, desde que não importem relações trabalhistas nem confundam credencial com representação. Competência é condição de elegibilidade; a autorização depende de legitimidade, criticidade e governabilidade.

Uma organização pode delegar tarefas, decisões e autonomia operacional. Não pode presumir que a transferência da execução a um sistema artificial transfira a legitimidade da decisão ou elimine os próprios deveres.

## Referências

*Sistema autor-data (ABNT NBR 10520 e NBR 6023). Documentos online acessados em 21 nov. 2026, salvo indicação.*

### Legislação brasileira vigente

BRASIL. **Decreto-Lei nº 5.452, de 1º de maio de 1943**. Aprova a Consolidação das Leis do Trabalho. Texto compilado. Brasília, DF: Presidência da República. Disponível em: [https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm). Acesso em: 21 nov. 2026. *[Não reconferido; citado apenas pelo art. 62, II.]*

BRASIL. **Lei nº 8.078, de 11 de setembro de 1990**. Dispõe sobre a proteção do consumidor e dá outras providências. Texto compilado. Brasília, DF: Presidência da República. Disponível em: [https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm). Acesso em: 21 nov. 2026.

BRASIL. **Lei nº 10.406, de 10 de janeiro de 2002**. Institui o Código Civil. Texto compilado. Brasília, DF: Presidência da República. Disponível em: [https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm). Acesso em: 21 nov. 2026.

BRASIL. **Lei nº 13.709, de 14 de agosto de 2018**. Lei Geral de Proteção de Dados Pessoais (LGPD). Texto compilado. Brasília, DF: Presidência da República. Disponível em: [https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm). Acesso em: 21 nov. 2026.

### Proposta legislativa brasileira (não vigente)

CÂMARA DOS DEPUTADOS. **PL 2338/2023**: ficha de tramitação. Brasília, DF, 2026. Disponível em: [https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262](https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262). Acesso em: 21 nov. 2026.

CONGRESSO NACIONAL. **Projeto de Lei nº 2338, de 2023**: dispõe sobre o uso da Inteligência Artificial. Matéria bicameral. Brasília, DF, 2025. Disponível em: [https://www.congressonacional.leg.br/web/atividade/materias/-/materia/157233](https://www.congressonacional.leg.br/web/atividade/materias/-/materia/157233). Acesso em: 21 nov. 2026.

### União Europeia

UNIÃO EUROPEIA. **Regulamento (UE) 2024/1689 do Parlamento Europeu e do Conselho, de 13 de junho de 2024**. Cria regras harmonizadas em matéria de inteligência artificial (Regulamento Inteligência Artificial). Jornal Oficial da União Europeia, L, 12 jul. 2024. Disponível em: [https://eur-lex.europa.eu/eli/reg/2024/1689/oj](https://eur-lex.europa.eu/eli/reg/2024/1689/oj). Acesso em: 21 nov. 2026.

UNIÃO EUROPEIA. **Regulation (EU) 2024/1689 [...] (Artificial Intelligence Act)**: consolidated text 02024R1689-20260727, incorporating Regulation (EU) 2026/1744 of 8 July 2026. EUR-Lex, 2026. Instrumento de documentação sem efeito jurídico. Disponível em: [https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02024R1689-20260727](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02024R1689-20260727). Acesso em: 21 nov. 2026.

### Decisões, casos e relatórios oficiais

CIVIL RESOLUTION TRIBUNAL (British Columbia). **Moffatt v. Air Canada, 2024 BCCRT 149**. File SC-2023-005609. Tribunal Member: Christopher C. Rivers. Decisão de 14 fev. 2024. Small claims. Disponível em: [https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do](https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do). Acesso em: 21 nov. 2026.

EEOC — U.S. EQUAL EMPLOYMENT OPPORTUNITY COMMISSION. **iTutorGroup to Pay $365,000 to Settle EEOC Discriminatory Hiring Suit**. Washington, DC, 11 set. 2023. Civil Action No. 1:22-cv-02565. Disponível em: [https://www.eeoc.gov/newsroom/itutorgroup-pay-365000-settle-eeoc-discriminatory-hiring-suit](https://www.eeoc.gov/newsroom/itutorgroup-pay-365000-settle-eeoc-discriminatory-hiring-suit). Acesso em: 21 nov. 2026.

ROYAL COMMISSION INTO THE ROBODEBT SCHEME. **Report of the Royal Commission into the Robodebt Scheme**. Canberra, 7 jul. 2023. Disponível em: [https://robodebt.royalcommission.gov.au/publications/report](https://robodebt.royalcommission.gov.au/publications/report). Acesso em: 21 nov. 2026. *[Página indisponível para acesso automatizado; data e recomendações 17.1 e 17.2 conferidas em página oficial do mesmo domínio.]*

### Caso PocketOS: fontes primárias e cobertura independente

ABC NEWS. 'Rogue' AI agent from Cursor goes haywire, deletes company's entire database. Reportagem de Mason Leib. **ABC News** (publicada em ABC30), 30 abr. 2026. Disponível em: [https://abc30.com/post/rogue-ai-agent-cursor-goes-haywire-deletes-tech-companys-database/19008099/](https://abc30.com/post/rogue-ai-agent-cursor-goes-haywire-deletes-tech-companys-database/19008099/). Acesso em: 21 nov. 2026.

ABDELWAHAB, Mahmoud. Your AI wants to nuke your database. Guardrails fix that. **Railway Blog**, 29 abr. 2026. Fonte interessada (fornecedor de infraestrutura envolvido). Disponível em: [https://blog.railway.com/p/your-ai-wants-to-nuke-your-database](https://blog.railway.com/p/your-ai-wants-to-nuke-your-database). Acesso em: 21 nov. 2026.

AI INCIDENT DATABASE. **Report 7311**: AI Coding Agent Powered by Claude Opus 4.6 Deletes Production Database in 9 Seconds. Incident 1469. Reproduz reportagem de CyberSecurityNews. 2026. Disponível em: [https://incidentdatabase.ai/reports/7311/](https://incidentdatabase.ai/reports/7311/). Acesso em: 21 nov. 2026.

CRANE, Jer. **An AI Agent Just Destroyed Our Production Data**. Cópia pública do relato publicado no X, datada de 26 abr. 2026. Autoria não confirmada de forma independente; fonte interessada. Disponível em: [https://rentry.co/5rme2sea](https://rentry.co/5rme2sea). Acesso em: 21 nov. 2026.

TYSON, Mark. Victim of AI agent that deleted company's entire database gets their data back. **Tom's Hardware**, 30 abr. 2026. Disponível em: [https://www.tomshardware.com/tech-industry/artificial-intelligence/victim-of-ai-agent-that-deleted-companys-entire-database-gets-their-data-back-cloud-provider-recovers-critical-files-and-broadens-its-48-hour-delayed-delete-policy](https://www.tomshardware.com/tech-industry/artificial-intelligence/victim-of-ai-agent-that-deleted-companys-entire-database-gets-their-data-back-cloud-provider-recovers-critical-files-and-broadens-its-48-hour-delayed-delete-policy). Acesso em: 21 nov. 2026.

### Análises jurídicas secundárias (AI Act)

CUATRECASAS. **Digital Omnibus on AI has been published**. 24 jul. 2026. Fonte secundária (escritório de advocacia). Disponível em: [https://www.cuatrecasas.com/en/spain/intellectual-property/art/digital-omnibus-ai-has-been-published](https://www.cuatrecasas.com/en/spain/intellectual-property/art/digital-omnibus-ai-has-been-published). Acesso em: 21 nov. 2026.

WHITE & CASE. **EU AI Omnibus enters into force, amending the AI Act**. 2026. Fonte secundária (escritório de advocacia). Disponível em: [https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act). Acesso em: 21 nov. 2026.

### Frameworks, normas técnicas e documentos institucionais

HU, Vincent C. et al. **Guide to Attribute Based Access Control (ABAC) Definition and Considerations**. Gaithersburg: National Institute of Standards and Technology, jan. 2014 (atualizações até 2 ago. 2019). NIST SP 800-162. DOI: 10.6028/NIST.SP.800-162. Disponível em: [https://csrc.nist.gov/publications/detail/sp/800-162/final](https://csrc.nist.gov/publications/detail/sp/800-162/final). Acesso em: 21 nov. 2026.

ISO — INTERNATIONAL ORGANIZATION FOR STANDARDIZATION. **ISO/IEC 42001:2023**: Information technology — Artificial intelligence — Management system. 1. ed. Geneva, dez. 2023. Disponível em: [https://www.iso.org/standard/81230.html](https://www.iso.org/standard/81230.html). Acesso em: 21 nov. 2026.

NIST — NATIONAL INSTITUTE OF STANDARDS AND TECHNOLOGY. **Artificial Intelligence Risk Management Framework (AI RMF 1.0)**. NIST AI 100-1. Gaithersburg: U.S. Department of Commerce, 26 jan. 2023. DOI: 10.6028/NIST.AI.100-1. Disponível em: [https://www.nist.gov/itl/ai-risk-management-framework](https://www.nist.gov/itl/ai-risk-management-framework). Acesso em: 21 nov. 2026.

OCDE — ORGANIZAÇÃO PARA A COOPERAÇÃO E DESENVOLVIMENTO ECONÔMICO. **Recommendation of the Council on Artificial Intelligence**. OECD/LEGAL/0449. Adotada em 2019; revisada em 3 maio 2024. Disponível em: [https://legalinstruments.oecd.org/public/doc/648/648.en.pdf](https://legalinstruments.oecd.org/public/doc/648/648.en.pdf). Acesso em: 21 nov. 2026.

### Trabalhos acadêmicos e de pesquisa

FENG, Kevin; McDONALD, David W.; ZHANG, Amy X. **Levels of Autonomy for AI Agents**. New York: Knight First Amendment Institute at Columbia University, 28 jul. 2025. Essay 25-15. Disponível em: [https://knightcolumbia.org/content/levels-of-autonomy-for-ai-agents-1](https://knightcolumbia.org/content/levels-of-autonomy-for-ai-agents-1). Acesso em: 21 nov. 2026.

PARASURAMAN, Raja; MANZEY, Dietrich H. Complacency and bias in human use of automation: an attentional integration. **Human Factors**, v. 52, n. 3, p. 381-410, jun. 2010. DOI: 10.1177/0018720810376055. Disponível em: [https://pubmed.ncbi.nlm.nih.gov/21077562/](https://pubmed.ncbi.nlm.nih.gov/21077562/). Acesso em: 21 nov. 2026.

PARASURAMAN, Raja; SHERIDAN, Thomas B.; WICKENS, Christopher D. A model for types and levels of human interaction with automation. **IEEE Transactions on Systems, Man, and Cybernetics – Part A: Systems and Humans**, v. 30, n. 3, p. 286-297, maio 2000. DOI: 10.1109/3468.844354. Disponível em: [https://doi.org/10.1109/3468.844354](https://doi.org/10.1109/3468.844354). Acesso em: 21 nov. 2026.

SALTZER, Jerome H.; SCHROEDER, Michael D. The protection of information in computer systems. **Proceedings of the IEEE**, v. 63, n. 9, p. 1278-1308, set. 1975. Disponível em: [https://web.mit.edu/Saltzer/www/publications/protection/](https://web.mit.edu/Saltzer/www/publications/protection/). Acesso em: 21 nov. 2026.

## Perguntas frequentes

**O que aconteceu no caso PocketOS?**

Em 24 de abril de 2026, um agente de programação que executava uma tarefa de rotina no ambiente de staging excluiu, com um token de escopo de conta encontrado na máquina do usuário, o volume que continha o banco de dados de produção da PocketOS. Os backups de nível de volume estavam no mesmo volume. A Railway informou depois que recuperou os dados e passou a aplicar exclusão adiada de 48 horas.

**Qual é a diferença entre competência e autoridade?**

Competência é desempenho demonstrado no contexto, com limites conhecidos. Autoridade é o poder institucional ou jurídico para decidir, aprovar, representar ou produzir um efeito. Competência é condição de elegibilidade, não autorização automática.

**Quais são as cinco dimensões da matriz?**

Competência operacional, autonomia operacional, alçada e autoridade, criticidade e impacto, e governabilidade. A matriz é não compensatória e está sujeita a duas condições: legitimidade da delegação e capacidade de governança. É uma proposta do artigo, sem validação empírica.

**Quem responde quando um agente de IA causa dano?**

O sistema não responde por si mesmo. A responsabilidade pode envolver camadas institucional, arquitetural, de implementação, operacional e de fornecedores, e depende do regime aplicável, da conduta, do dano e do nexo causal. No Brasil não há regime específico para agentes de IA; o PL 2.338/2023 continua em tramitação.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
