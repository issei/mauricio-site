# Cinco Pilares para a Confiança em Escala

> **Premissa-base do material:** o LLM é um *componente*, nunca o piloto. A arquitetura de produção disciplinada — pipelines determinísticos (DAGs), contratos rígidos, separação Cérebro vs. Vitrine e governança via Ledgers — não é inimiga da autonomia. Ela é o alicerce que torna a autonomia *confiável em escala*.

Os cinco pilares abaixo expandem essa tese. Cada seção começa com o **racional passo a passo** (o trabalho de raciocínio que precede o texto) e, em seguida, apresenta o **texto final** estruturado em quatro partes: definição conceitual, justificativa técnica, exemplo/analogia de arquitetura, e conexão com Sistemas Intencionais.

**Nota de transparência sobre confiança:** sigo a regra de declarar limitações sempre que a confiança numa afirmação técnica for inferior a ~98%. Esses pontos estão marcados com **⚠ Limitação declarada** ao longo do texto. O caso mais relevante é o termo **A2UI**, tratado na Seção 3.

---

## 1. O Espectro de Autonomia (Matriz de Casos de Uso)

### Racional passo a passo

1. O erro retórico comum dos dois lados do debate é tratar "autonomia" como variável binária: ou se confia no agente, ou não se confia. Isso é falso. Autonomia é um *contínuo*, e o ponto ótimo nesse contínuo é função de duas variáveis independentes: o **custo do erro** e a **reversibilidade do erro**.
2. Para evitar dogmatismo, preciso conceder explicitamente o território onde agentes livres e *vibe coding* são genuinamente superiores: ambientes de baixo custo de erro e alta reversibilidade. Negar isso enfraquece o argumento central.
3. A tese forte não é "DAGs sempre". É "a posição correta no espectro deve ser uma **decisão de design explícita**, não um acidente". O perigo real é o *vazamento de modo* — código nascido em modo exploração (descartável) que migra para produção (missão crítica) sem nunca ter atravessado a fronteira de rigor correspondente.
4. Logo, a matriz não classifica ferramentas como boas ou más; classifica *contextos* e prescreve o nível de cerimônia arquitetural proporcional ao risco.

### Texto final

#### Definição conceitual

O **Espectro de Autonomia** é o modelo que posiciona qualquer tarefa entregue a um sistema de IA ao longo de um contínuo, entre dois polos:

- **Polo de Exploração / Baixo Risco:** o objetivo é velocidade de descoberta. O erro é barato, contido e trivialmente reversível (um `git reset`, um descarte de branch). Aqui, *vibe coding*, agentes livres e prompts abertos têm vantagem real — a cerimônia arquitetural seria puro atrito.
- **Polo de Missão Crítica:** o objetivo é garantia de comportamento. O erro propaga para usuários, dinheiro, dados ou conformidade regulatória, e a reversão é cara ou impossível. Aqui, DAGs, contratos rígidos e validação determinística deixam de ser opcionais.

A posição de uma tarefa no espectro é determinada por duas dimensões: **custo do erro** (de cosmético a catastrófico) e **reversibilidade** (de instantânea a irreversível).

#### Justificativa técnica

O valor está em substituir uma escolha *ideológica* de ferramenta por uma escolha *dimensionada ao risco*. Sem essa matriz, equipes cometem dois erros simétricos e igualmente custosos:

- **Sobre-engenharia do trivial:** envolver um protótipo de fim de semana em contratos, testes de contrato e ADRs mata o time-to-market sem reduzir nenhum risco que existisse.
- **Sub-engenharia do crítico:** deixar um fluxo de pagamento ou uma migração de banco de dados na mão de um agente operando em "modo improviso" probabilístico.

O risco operacional mais insidioso é o **vazamento de modo**: o protótipo do polo de exploração que "deu certo na demo" e é promovido a produção sem nunca atravessar a fronteira de rigor. A matriz torna essa fronteira *visível e obrigatória* — promover código de um polo ao outro passa a exigir um upgrade explícito de garantias (cobertura de testes, contratos, idempotência).

#### Exemplo / analogia de arquitetura

Pense em duas zonas de uma planta industrial:

- O **laboratório de P&D** (exploração): bancadas abertas, prototipagem rápida, falha encorajada. Um experimento que dá errado custa um reagente.
- A **linha de produção certificada** (missão crítica): procedimentos versionados, tolerâncias rígidas, rastreabilidade total. Uma falha recolhe lotes e aciona reguladores.

Ninguém defende transformar o laboratório numa linha certificada — isso destruiria sua função de descoberta. E ninguém sãmente roda a linha certificada com a informalidade do laboratório. O erro de engenharia não está em ter os dois modos; está em **mover um artefato entre zonas sem reprocessá-lo sob as regras da zona de destino**.

Concretamente em software: um agente pode gerar livremente um parser para um script de análise pontual (exploração). O *mesmo* parser, ao virar etapa de um pipeline de ingestão que alimenta cobrança, precisa ser reescrito atrás de um contrato de schema validado, com testes de propriedade e tratamento explícito de entrada malformada.

#### Conexão com Sistemas Intencionais

Um sistema puramente probabilístico responde ao que é *provável* — ele produz a saída estatisticamente plausível para o contexto, e o nível de autonomia é, na prática, um efeito colateral do prompt. Um Sistema Intencional responde ao que foi *desenhado*: o nível de autonomia é um parâmetro arquitetural declarado por tarefa. O Espectro de Autonomia é, portanto, o primeiro ato de intenção — a equipe decide *deliberadamente* quanta liberdade o componente LLM recebe, em vez de descobrir essa liberdade por acidente em produção.

---

## 2. Freios para Correr Mais Rápido

### Racional passo a passo

1. O contra-argumento óbvio à disciplina é "restrições atrasam". Preciso inverter essa intuição de forma rigorosa, não retórica. A inversão correta vem da teoria de controle e do design de sistemas: **restrições reduzem o espaço de estados que precisa ser raciocinado**, e é o tamanho desse espaço — não a presença de regras — que governa a velocidade segura.
2. Um agente sem restrições não é "mais livre"; é um agente cujo espaço de ação inclui um número enorme de estados inválidos que ele não sabe distinguir dos válidos. A velocidade aparente é gasta em retrabalho e em falhas silenciosas.
3. DoR/DoD e ADRs são os instrumentos que materializam essas restrições como *contratos de entrada e saída do trabalho* e como *memória de decisão*. Preciso mostrar que cada um remove uma classe específica de incerteza.
4. A metáfora dos freios de um carro de corrida é forte e tecnicamente honesta: o limitador de velocidade é o que permite atacar a curva tarde. Vou usá-la, mas ancorando-a na mecânica real (confiança em frenagem → ponto de frenagem mais agressivo).

### Texto final

#### Definição conceitual

**Freios para Correr Mais Rápido** é o princípio de que restrições bem colocadas não desaceleram o sistema — elas *aumentam a velocidade segura máxima* ao reduzir o espaço de estados em que o agente precisa operar. Três instrumentos concretizam o princípio:

- **DoR (Definition of Ready):** o contrato de *entrada* de uma tarefa. Define o que precisa estar verdadeiro antes de o trabalho começar (requisitos, dados, critérios de aceite, dependências resolvidas).
- **DoD (Definition of Done):** o contrato de *saída*. Define objetivamente quando o trabalho está completo (testes passando, contratos honrados, documentação atualizada, observabilidade instrumentada).
- **ADR (Architecture Decision Record):** o registro versionado e imutável de uma decisão arquitetural relevante, seu contexto e suas consequências. É a memória institucional que impede que decisões já tomadas sejam reabertas por esquecimento.

Juntos, eles formam um **sandbox**: um espaço delimitado dentro do qual o agente pode operar em capacidade máxima precisamente porque as bordas são conhecidas e protegidas.

#### Justificativa técnica

A velocidade segura de um sistema autônomo é inversamente proporcional ao tamanho do espaço de estados que ele precisa raciocinar. Um agente sem restrições enfrenta um espaço quase ilimitado, onde estados válidos e inválidos são indistinguíveis sem teste — então cada passo carrega risco não medido, e a velocidade real despenca por retrabalho e falhas tardias.

Cada instrumento remove uma classe de incerteza:

- O **DoR** elimina o desperdício de iniciar trabalho mal-especificado — a causa-raiz mais comum de output de agente "tecnicamente correto, mas resolvendo o problema errado".
- O **DoD** transforma "pronto" de julgamento subjetivo em **predicado verificável por máquina**. Isso é o que permite delegar com segurança: um agente pode iterar autonomamente porque existe um oráculo objetivo dizendo quando parar.
- O **ADR** evita o *replanejamento circular* — o agente (ou o humano) que reabre uma decisão já fechada por não ter acesso ao seu racional. Em sistemas com agentes, ADRs são também *contexto injetável*: a decisão registrada pode ser fornecida ao agente como restrição dura, em vez de esperar que ele a redescubra.

#### Exemplo / analogia de arquitetura

Um carro de Fórmula 1 não é rápido *apesar* dos freios de carbono-cerâmica; é rápido **por causa deles**. Confiança na frenagem permite ao piloto adiar o ponto de frenagem e atacar a curva muito mais tarde do que seria suicídio sem eles. Remover os freios não deixa o carro mais rápido — deixa-o incapaz de completar uma única volta.

Na arquitetura de software, a tradução é direta. Considere um agente encarregado de refatorar um módulo:

- **Sem freios:** ele edita o código, "parece bom", e o resultado só é validado por um humano horas depois, talvez em produção. O ponto de frenagem é tarde demais e cego.
- **Com freios:** o DoR garante que existe uma suíte de testes verde *antes* da refatoração; o DoD exige que a suíte continue verde e que a cobertura não caia; um ADR fixa a fronteira do módulo que não pode ser violada. O agente agora pode fazer mudanças agressivas em loop rápido, porque cada iteração é freada instantaneamente por um oráculo objetivo. A presença das restrições é exatamente o que autoriza a velocidade.

#### Conexão com Sistemas Intencionais

O sandbox é a expressão operacional da intenção. Um sistema probabilístico produz a saída mais provável e *espera* que ela seja aceitável. Um Sistema Intencional define, antes de qualquer geração, o conjunto de saídas aceitáveis (DoD) e as pré-condições válidas (DoR), e só então libera a autonomia *dentro* dessas bordas. A intenção do arquiteto deixa de ser uma esperança sobre o comportamento do modelo e passa a ser uma propriedade verificável do sistema. O agente não é contido pela restrição — ele é *capacitado* por ela a operar no limite sem ultrapassar a borda.

---

## 3. Padrões de Interoperabilidade e Interfaces Dinâmicas

### Racional passo a passo

1. Esta seção tem dois sub-temas com maturidades diferentes, e preciso ser honesto sobre isso para não alucinar.
2. **MCP (Model Context Protocol):** terreno firme. É um protocolo aberto, publicado pela Anthropic no fim de 2024, com especificação pública e adoção crescente. Posso descrevê-lo com alta confiança: padroniza como modelos se conectam a ferramentas, dados e recursos externos via uma fronteira cliente-servidor. O ângulo arquitetural relevante é que ele transforma integração ad-hoc em *fronteira contratual* — e fronteira é onde se aplica segurança, permissão e auditoria.
3. **A2UI (Agent-to-User Interface):** aqui declaro limitação. O termo, como sigla padronizada e estável, **não tem o mesmo grau de consolidação que o MCP**. Existem esforços reais e adjacentes — notadamente o protocolo **AG-UI** (Agent-User Interaction) e o **A2A** (Agent-to-Agent, do Google) — mas tratar "A2UI" como um padrão da indústria amplamente acordado seria uma superextrapolação. Vou, portanto, apresentá-lo como o **conceito arquitetural** (a fronteira agente↔interface) que sustenta a separação Cérebro/Vitrine, e nomear os protocolos reais adjacentes sem afirmar equivalência.
4. O fio condutor que une os dois é "fronteira": MCP é a fronteira agente↔ferramentas/dados; a camada A2UI é a fronteira agente↔apresentação. Ambas existem para que o Cérebro (raciocínio) nunca toque diretamente o que está do outro lado sem passar por um contrato.

### Texto final

#### Definição conceitual

**Interoperabilidade** aqui significa que componentes de raciocínio, ferramentas e interfaces se comunicam por **contratos explícitos e versionáveis**, não por acoplamento direto. Dois domínios de fronteira importam:

- **MCP (Model Context Protocol):** protocolo aberto que padroniza a conexão entre um modelo/agente e fontes externas de contexto e ação — ferramentas, dados, recursos. Estabelece uma arquitetura cliente-servidor em que o agente (host/client) consome capacidades expostas por servidores MCP através de uma interface uniforme. *(Confiança alta — especificação pública.)*

- **Camada A2UI (Agent-to-User Interface):** o conceito de uma fronteira contratual entre o agente e a interface apresentada ao usuário, em que o agente emite *intenção e dados estruturados* (o quê mostrar) e a camada de apresentação decide a *renderização* (como mostrar). É a materialização da separação **Cérebro vs. Vitrine**.
  > **⚠ Limitação declarada:** "A2UI" não é, até onde posso verificar com confiança, uma sigla de padrão da indústria tão consolidada quanto "MCP". Protocolos reais e adjacentes nesse espaço incluem o **AG-UI (Agent-User Interaction Protocol)** e o **A2A (Agent-to-Agent)** do Google. Trato A2UI abaixo como **padrão arquitetural** (a fronteira agente↔UI), não como uma especificação canônica única. Recomendo validar a nomenclatura antes de publicá-la como termo técnico estabelecido.

#### Justificativa técnica

Fronteiras contratuais são onde a engenharia aplica controle. Sem elas, o agente fica acoplado diretamente a APIs internas e a componentes de UI, e três propriedades críticas tornam-se impossíveis de garantir:

- **Segurança e menor privilégio:** com o MCP, o conjunto de ações que o agente pode executar é exatamente o conjunto de ferramentas que um servidor MCP *expõe*. A fronteira é o ponto natural para autorização, escopo de permissão, rate limiting e auditoria. O agente não tem acesso ambiente ao sistema; tem acesso *enumerado*.
- **Substituibilidade:** porque a fronteira é um contrato, a implementação atrás dela pode mudar (trocar um provedor, uma fonte de dados, um framework de UI) sem reescrever o lado do agente.
- **Testabilidade:** um contrato pode ser *mockado*. Pode-se testar o raciocínio do Cérebro contra ferramentas falsas e a Vitrine contra payloads falsos, isolando defeitos.

A separação Cérebro/Vitrine via uma camada A2UI agrega um ganho específico: impede que a *lógica de raciocínio vaze para a apresentação*. O agente nunca produz HTML, pixels ou strings de UI diretamente; ele produz um payload estruturado e tipado de intenção, e a Vitrine — determinística — o renderiza. Isso elimina uma classe inteira de falhas (UI quebrada por output mal-formado do modelo) e permite versionar a apresentação independentemente do modelo.

#### Exemplo / analogia de arquitetura

A analogia precisa é a do **driver de dispositivo** e do **padrão MVC**:

- O **MCP** é análogo a uma camada de *driver* padronizada (como um ODBC ou um sistema de plugins): o agente fala um protocolo único, e cada ferramenta externa implementa o lado servidor desse protocolo. Trocar a impressora não muda o aplicativo, porque ambos falam com o driver, não um com o outro.
- A **separação Cérebro/Vitrine** é o velho princípio MVC levado à arquitetura agêntica: o Cérebro é o *Controller/Model* (decide a intenção e os dados), a Vitrine é a *View* (renderização determinística). O agente diz "exibir uma tabela de pedidos com estes três campos e este alerta"; a Vitrine decide se isso vira uma `<table>` HTML, um componente React ou um bloco de terminal. O Cérebro nunca sabe — nem deve saber — qual.

Em fluxo: `Usuário → Vitrine (captura intenção) → [contrato A2UI] → Cérebro/Agente → [contrato MCP] → Ferramentas/Dados → ... → [contrato A2UI] → Vitrine (renderiza) → Usuário`. Cada `[contrato]` é um ponto de validação, segurança e teste.

#### Conexão com Sistemas Intencionais

Protocolos de fronteira são o mecanismo pelo qual a intenção arquitetural é *imposta em tempo de execução*, não apenas documentada. Um sistema probabilístico, deixado solto, escolheria a ação ou a renderização mais prováveis — incluindo ações fora de escopo ou saídas mal-formadas. Ao rotear todo raciocínio através de contratos MCP (ações) e A2UI (apresentação), o sistema só pode fazer aquilo que foi explicitamente desenhado para expor. A superfície do possível torna-se idêntica à superfície do *intencional*. O modelo continua probabilístico por dentro; o *sistema*, observado de fora, comporta-se de forma governada.

---

## 4. A Jornada para os Sistemas Intencionais

### Racional passo a passo

1. Os quatro pilares anteriores são instrumentos. Este é a tese-síntese: o que todos eles servem. Preciso defini-lo como uma *evolução*, com estágios, não como um interruptor.
2. O eixo da evolução é a localização da fonte da garantia. No estágio inicial, a garantia mora no modelo ("torço para que o prompt funcione"). No estágio maduro, a garantia mora na *arquitetura* (o sistema impõe a intenção independentemente da variância do modelo).
3. Preciso ser cuidadoso para não cair no falso binário "probabilístico = ruim, determinístico = bom". A formulação correta é: o sistema intencional **encapsula** a probabilidade. O LLM continua probabilístico — é justamente disso que vem sua capacidade generalizadora. O que muda é que sua saída é *governada* por camadas determinísticas que a validam, restringem e roteiam.
4. Vou propor um modelo de maturidade em estágios, porque isso dá ao leitor um diagnóstico ("onde estou?") em vez de só um ideal.

### Texto final

#### Definição conceitual

Um **Sistema Intencional** é aquele cujo comportamento observável é governado por uma **intenção arquitetural explícita** — não pela saída estatisticamente mais provável de um modelo. A "jornada" é a trajetória de maturidade que vai de sistemas onde a garantia mora no modelo até sistemas onde a garantia mora na arquitetura. Pode ser descrita em estágios:

- **Estágio 0 — Mágica de Prompt:** a saída é o token mais provável dado o prompt. A garantia é torcida ("funcionou na demo"). Não há fronteira entre raciocínio e efeito.
- **Estágio 1 — Restringido:** introduzem-se validação de saída, parsing estruturado e contratos de schema. O modelo ainda decide tudo, mas saídas inválidas são rejeitadas.
- **Estágio 2 — Orquestrado:** o fluxo vira um DAG determinístico; o LLM é invocado em *nós* específicos, com entradas e saídas contratadas, e a topologia do fluxo é fixa e auditável.
- **Estágio 3 — Governado:** acrescentam-se Ledgers (auditoria/rastreabilidade), políticas de autorização nas fronteiras (MCP), separação Cérebro/Vitrine e capacidade de reversão. A intenção é imposta, registrada e verificável fim a fim.

#### Justificativa técnica

O valor da jornada é mover a **fonte da confiabilidade** de um lugar que não se controla (a distribuição interna do modelo) para um lugar que se controla (a arquitetura ao redor dele). Isso é decisivo porque a variância do modelo é irredutível: o mesmo prompt pode gerar saídas diferentes, e novas versões do modelo mudam o comportamento. Construir garantias *dentro* do modelo é construir sobre areia.

O ponto crítico — e a razão de a tese não ser anti-LLM — é que o Sistema Intencional **não elimina a probabilidade; ele a encapsula**. O LLM permanece o componente probabilístico, e é exatamente sua natureza generalizadora que o torna valioso para as tarefas abertas dentro de cada nó. O que a arquitetura faz é cercar essa probabilidade com camadas determinísticas: o DAG fixa *quando* o modelo é chamado, os contratos validam *o que* ele pode emitir, os Ledgers registram *o que ele fez*, e as fronteiras controlam *o que ele pode tocar*. A imprevisibilidade local é domada por uma estrutura global previsível.

#### Exemplo / analogia de arquitetura

A analogia é a **memória volátil sob um controlador de memória**, ou ainda o **componente analógico ruidoso dentro de um circuito digital**. Um sinal analógico é intrinsecamente ruidoso (probabilístico); um conversor A/D, um clock e a lógica de validação ao redor o transformam em algo sobre o qual se pode construir um computador determinístico. Ninguém propõe "consertar" o ruído do sensor — propõe-se *encapsulá-lo* em uma arquitetura que extrai o sinal e descarta o resto.

Em software: um pipeline de triagem de tickets. No Estágio 0, um prompt único "leia o ticket e tome a ação apropriada" — e reza-se. No Estágio 3: um DAG onde (a) um nó LLM classifica o ticket emitindo um enum validado contra um schema; (b) um roteador *determinístico* despacha por esse enum; (c) cada ação passa por uma ferramenta MCP com permissão escopada; (d) um Ledger registra cada decisão com o input que a causou; (e) a resposta ao usuário é montada pela Vitrine a partir de dados estruturados. O LLM ainda faz o trabalho cognitivo difícil (entender linguagem natural), mas nunca tem autoridade não governada.

#### Conexão com Sistemas Intencionais

Esta seção *é* a definição da premissa, agora operacionalizada. "O sistema responde ao que foi desenhado, e não apenas ao que é provável" significa, em termos concretos: a topologia do DAG, os schemas dos contratos, as políticas das fronteiras e os registros do Ledger são as **declarações de intenção**, e o comportamento de produção é a *execução fiel* dessas declarações. A maturidade de um sistema mede-se por quanto de seu comportamento é explicado pela intenção arquitetural versus quanto é explicado pela sorte na amostragem do modelo.

---

## 5. Trade-offs Arquiteturais: Quando NÃO Usar Engenharia Agêntica Pesada

### Racional passo a passo

1. Esta seção é o teste de honestidade do material inteiro. Um argumento que nunca admite seus próprios limites soa como ideologia, e o leitor técnico desconta isso. Preciso identificar genuinamente os contextos em que o rigor pesado é a escolha *errada* — e por quê, mecanicamente.
2. O custo da disciplina não é zero: ela tem custo de *setup* (definir contratos, montar o DAG, escrever ADRs) e custo de *rigidez* (a estrutura que protege também resiste a mudança). Esses custos só se pagam quando amortizados por longevidade, escala ou criticidade. Onde não há o que amortizar, o rigor é puro passivo.
3. Dois casos canônicos onde isso ocorre: (a) PoCs/protótipos com time-to-market como métrica dominante e horizonte de descarte; (b) tarefas de pesquisa aberta, multi-passos, onde o caminho da solução é *desconhecido a priori* — ali, fixar um DAG rígido é fixar uma hipótese sobre o fluxo que ainda não se tem.
4. Preciso fechar com o critério de *transição*, não só com a lista de exceções — senão a seção vira um álibi para nunca aplicar disciplina. A regra é: a leveza é legítima *enquanto o artefato permanecer no seu polo de origem*. Volta para a Seção 1.

### Texto final

#### Definição conceitual

**Trade-off arquitetural** é o reconhecimento de que a disciplina agêntica pesada — DAGs, contratos rígidos, Ledgers, ADRs — tem custos reais (de setup e de rigidez) que só se justificam quando amortizados por longevidade, escala ou criticidade. Onde não há o que amortizar, aplicá-la é *negativo*, não neutro. Existem dois contextos canônicos onde a escolha correta é deliberadamente *não* aplicá-la:

- **PoCs e protótipos com time-to-market dominante:** o objetivo é validar uma hipótese de produto ou viabilidade técnica o mais rápido possível, com expectativa explícita de descarte.
- **Pesquisa aberta multi-passos:** tarefas em que o *caminho* da solução é desconhecido a priori (investigação exploratória, brainstorming técnico, descoberta de dados), e a própria forma do fluxo é o que está sendo descoberto.

#### Justificativa técnica

A disciplina pesada cobra dois preços:

- **Custo de setup:** especificar contratos, desenhar a topologia do DAG, instrumentar Ledgers e redigir ADRs é trabalho adiantado que só rende dividendos ao longo da vida do sistema.
- **Custo de rigidez:** a mesma estrutura que impede o agente de sair dos trilhos *também* impede a equipe de mudar os trilhos rapidamente. Um DAG fixo é uma hipótese congelada sobre o fluxo correto.

Nos dois contextos canônicos, esses custos não se amortizam:

- Num **protótipo descartável**, não há "longo prazo" sobre o qual o custo de setup se dilua. Cada hora gasta em contratos é uma hora subtraída da única métrica que importa: descobrir, rápido, se a ideia tem valor. O rigor aqui não reduz risco — não há risco de produção a reduzir — apenas atrasa a aprendizagem.
- Numa **tarefa de pesquisa aberta**, fixar um DAG é cometer-se prematuramente a uma estrutura de solução que ainda não se conhece. A força do agente livre aqui é exatamente a capacidade de *replanejar dinamicamente* o próprio caminho a cada passo — propriedade que um pipeline determinístico, por construção, suprime. Impor a topologia fixa cedo demais *destrói* a capacidade que torna o agente útil para a tarefa.

> **⚠ Limitação declarada:** a fronteira entre "exploração legítima" e "produção disfarçada de exploração" é contextual e exige julgamento humano; não há um limiar numérico universal que a defina. A regra de transição abaixo mitiga, mas não elimina, esse julgamento.

#### Exemplo / analogia de arquitetura

A analogia é a do **andaime versus a estrutura permanente**. Para erguer uma parede, monta-se um andaime — rápido, leve, descartável. Seria absurdo aplicar ao andaime os cálculos de carga, a documentação e a inspeção da estrutura permanente: ele não vai durar, e o rigor só atrasaria a obra. O erro de engenharia não é usar andaime; é **deixar o andaime virar a estrutura** — confundir o provisório com o definitivo e nunca construir a fundação real por baixo.

Em software: um agente livre que vasculha um data lake desconhecido para formular hipóteses (pesquisa aberta) é o andaime certo. Se as *consultas que ele descobriu* virarem um relatório recorrente que o negócio passa a consumir toda segunda-feira, esse relatório atravessou a fronteira — e agora precisa da estrutura permanente: consultas versionadas, contrato de schema, teste de regressão. O andaime serviu; a estrutura precisa substituí-lo.

#### Conexão com Sistemas Intencionais

Aqui a intenção arquitetural se aplica à *própria escolha de quanto rigor usar* — e isso fecha o argumento de forma elegante e não-dogmática. Decidir conscientemente operar em modo leve, com critério explícito de descarte ou de transição, **já é um Sistema Intencional**: o sistema responde ao que foi desenhado, e o que foi desenhado, neste caso, é uma zona de exploração deliberadamente sem trilhos. O oposto de intencional não é "leve"; é *acidental*. Um protótipo leve, escolhido de propósito e com fronteira de promoção definida, é tão intencional quanto um DAG governado. O antipadrão é o rigor (ou a ausência dele) que ninguém escolheu.

**Regra de transição (o critério que impede que esta seção vire álibi):** a leveza é legítima *enquanto o artefato permanecer no seu polo de origem* (Seção 1). No instante em que ele é promovido — passa a ser dependido por usuários, dinheiro ou dados — a promoção **obriga** o upgrade de garantias. A pergunta de governança não é "isto é exploração ou produção?", mas "alguém já depende disto como se fosse produção?". Se sim, a estrutura permanente não é opcional.

---

## Síntese: os cinco pilares como um único argumento

| Pilar | Pergunta que responde | Mecanismo central |
|---|---|---|
| 1. Espectro de Autonomia | *Quanta* liberdade dar? | Dimensionar rigor ao custo × reversibilidade do erro |
| 2. Freios para Correr | Como ir rápido *com* segurança? | DoR/DoD/ADR como sandbox que reduz o espaço de estados |
| 3. Interoperabilidade | Como conter o que o agente toca? | Fronteiras contratuais (MCP, camada A2UI) |
| 4. Sistemas Intencionais | Onde mora a garantia? | Mover a confiabilidade do modelo para a arquitetura |
| 5. Trade-offs | Quando *não* fazer nada disso? | Amortização: rigor só se paga com longevidade/escala/criticidade |

O fio único: **a autonomia confiável não vem de confiar mais no modelo, mas de desenhar o sistema de modo que a superfície do possível coincida com a superfície do intencional.** Os freios existem para correr mais rápido; as fronteiras existem para dar mais acesso com segurança; o rigor existe para tornar a delegação justificável. Disciplina e autonomia não são polos opostos — são a mesma alavanca vista de dois lados.

---

### Apêndice: registro de confiança

Em conformidade com a regra de transparência solicitada (declarar quando a confiança for inferior a ~98%):

- **Alta confiança (≥98%):** conceitos de DAG, ADR, DoR/DoD, separação MVC/Cérebro-Vitrine, encapsulamento de componente probabilístico, princípios de menor privilégio em fronteiras, e a caracterização geral do MCP como protocolo aberto cliente-servidor para conectar modelos a ferramentas/dados.
- **Confiança moderada — declarada no texto:** a terminologia **"A2UI"** como sigla de padrão consolidado da indústria (Seção 3). Tratei-a como padrão *arquitetural*, nomeando protocolos reais adjacentes (AG-UI, A2A do Google) sem afirmar equivalência. Recomendo verificar a nomenclatura antes de publicá-la como termo técnico estabelecido.
- **Julgamento contextual, não fato verificável:** a fronteira precisa entre "exploração" e "produção" (Seção 5) depende de contexto organizacional e não admite limiar numérico universal.
