# Especificação Conceitual e Diretoria de Experiência (UX/UI)
**Domínio:** mauricio.issei.com.br
**Posicionamento:** Arquitetura de Software Executiva, Governança de IA Corporativa & Sistemas de Agentes
**Versão:** 3.0 — Revisão Estratégica de Camadas Narrativas Progressivas + Implementabilidade & Acessibilidade

---

## 1. Conceito Artístico & Direção de Arte

### 1.1 Metáfora Visual e Narrativa: *"A Anatomia da Complexidade"*

O conceito evolui de uma metáfora estática de planta baixa para algo mais orgânico e temporal: **a página se comporta como uma dissecação controlada**. O visitante não olha para um blueprint pronto — ele testemunha, em tempo real de rolagem, a complexidade sendo aberta, camada por camada, até revelar o sistema nervoso da arquitetura por trás do negócio.

A jornada segue três estados perceptivos:

1. **Superfície (Impacto):** o que o negócio ganha. Nenhum termo técnico aparece sem tradução imediata de valor.
2. **Tecido Conjuntivo (Mecanismo):** como as peças se conectam — ontologias, agentes, esteiras.
3. **Núcleo (Especificação):** a densidade técnica pura, reservada a quem escolhe ativamente ir até lá.

Essa progressão não é apenas informacional — é **espacial**. Cada camada tem sua própria "temperatura" visual, descrita abaixo.

### 1.2 Linguagem Cromática e Espacial

* **Gradiente de Densidade por Profundidade:**
  * **Camada 1 (Superfície):** grafite quase preto, com máximo de espaço negativo — a seção que menos "pesa" visualmente é a primeira que o executivo vê.
  * **Camada 2 (Mecanismo):** o cinza começa a ganhar textura — linhas de grade sutis emergem no fundo, como se o papel estivesse revelando sua trama.
  * **Camada 3 (Núcleo):** o dark mode dominante das Camadas 1 e 2 é preservado — o fundo permanece grafite escuro. A sensação de "mesa de trabalho iluminada" é criada apenas por iluminação localizada: contornos de cards, bordas finas e fundos internos em um grafite ligeiramente mais claro que o base. Isso mantém legibilidade e conforto visual sem romper a coerência tonal da página. **Critério mínimo obrigatório:** mesmo com fundo escuro, o texto principal da Camada 3 deve manter contraste de pelo menos 7:1 em relação ao fundo do card (grafite claro + texto branco quase puro) — o padrão exigido para densidade técnica prolongada, não o mínimo aceitável de WCAG AA. Validar em monitores com calibragem mediana, não apenas em telas de referência.
* **Acentos Metrológicos (revisados):**
  * **Azul Cobalto de Precisão** — reservado exclusivamente a decisões, CTAs e pontos de bifurcação (ex.: o seletor de perspectiva). Nunca decorativo.
  * **Verde Luminescente Sobrio** — usado apenas em indicadores de estado vivo (deploys, latência, uptime) — nunca em texto ou títulos, para preservar seu significado de "sistema operando".
  * **Novo:** um terceiro tom, **Âmbar Institucional**, discreto, reservado a alertas de governança e conformidade — usado com extrema raridade, o que aumenta seu peso semântico quando aparece.
* **Ritmo e Espaço em Branco:**
  * A rolagem é tratada como um instrumento de ritmo musical: blocos curtos e respiráveis na Camada 1, compassos mais lentos e ddados mais densos na Camada 3.
  * Regra de ouro: **nenhuma seção da Camada 1 deve exigir mais de 8 segundos de leitura.** Se exigir, o conteúdo pertence à Camada 2.

### 1.3 Tom de Voz e Estética da Informação

* **Tom:** assertivo sem ser árido; analítico sem soar burocrático. Frases curtas na superfície, frases técnicas precisas no núcleo — nunca o inverso.
* **Regra de vocabulário:** todo termo técnico introduzido na Camada 1 precisa de um "tradutor de valor" na mesma linha ou imediatamente abaixo (ex.: *GraphRAG — a diferença entre uma IA que responde e uma IA que sabe por que responde*).
* **Estética Editorial High-Tech:** tipografia sans-serif geométrica para títulos; monoespaçada estritamente para números, IDs de sistema e métricas — nunca usada decorativamente, para preservar sua função de "assinatura de dado real".

### 1.4 Tabela de Tokens de Design *(nova — elimina ambiguidade de implementação)*

A "temperatura visual" descrita em 1.2 só é executável com valores concretos. Esta tabela é a fonte única de verdade para quem implementa — qualquer ajuste de tom deve ser feito aqui primeiro, nunca diretamente na interface.

| Token | Camada 1 (Superfície) | Camada 2 (Mecanismo) | Camada 3 (Núcleo) |
|---|---|---|---|
| Fundo base | Grafite quase preto (~#0A0A0C) | Grafite escuro (~#101014), com grid a ~4% de opacidade | Grafite escuro idêntico à Camada 1, cards em ~#17171C |
| Texto principal | Branco quente (~#F2F2F0) | Branco quente (~#F2F2F0) | Branco quase puro (~#FAFAFA), contraste ≥ 7:1 |
| Espaçamento vertical entre blocos | Amplo (referência: 96–128px em desktop) | Médio (64–96px) | Compacto (40–56px), compensado por respiro interno do card |
| Grid/retícula | Invisível | Visível a baixa opacidade | Visível, usada como elemento funcional de organização de dados |
| Acento Azul Cobalto | Uso pontual (CTA, seletor) | Uso pontual (nós de decisão em diagramas) | Uso funcional (marcação de parâmetros editáveis/críticos) |
| Tipografia de título | Sans-serif geométrica, peso alto | Sans-serif geométrica, peso médio | Sans-serif geométrica, peso médio + monoespaçada para specs |

*Nota: valores hexadecimais são referência de partida — a paleta final deve ser validada em conjunto com identidade de marca já existente, se houver.*

---

## 2. Arquitetura da Informação (Seção por Seção)

```
[ HERO ] → Promessa de valor em 5 segundos
     │
[ SELETOR DE PERSPECTIVA ] → Executiva ⇄ Engenharia (estado persistente)
     │
[ ZONAS DE DEMONSTRAÇÃO ] → 3 sistemas traduzidos em narrativa visual
     │
[ PROVA DE GOVERNANÇA ] → Seção nova: confiança e auditabilidade
     │
[ HUB DE CONEXÃO ] → Conteúdo em profundidade crescente
     │
[ PONTO DE CONTATO ] → Convite qualificado, não formulário genérico
```

### A. Hero Section

* **Objetivo:** ancorar autoridade sem exigir vocabulário técnico do visitante.
* **Manchete (revisada, mais direta):**
  > "Complexidade de IA e arquitetura de software, estruturada em decisões que sua empresa pode auditar."
* **Sub-manchete:**
  > "Governança, engenharia de sistemas e agentes inteligentes desenhados para transformar risco técnico em vantagem competitiva mensurável."
* **Elemento visual central:** uma animação de baixa fricção — pontos dispersos (representando dados/processos soltos) que se organizam, ao rolar a página, em uma retícula ordenada. O movimento é a mensagem: nenhuma legenda é necessária para entender "caos → sistema".
* **Micro-detalhe de autoridade:** um contador discreto e monoespaçado no canto (ex.: número de especificações auditáveis geridas, ou anos de prática) — dado real, nunca estimado por efeito.

### B. Seletor de Perspectiva

Mantém-se o conceito original, com três refinamentos:

| Dimensão | Visão Executiva | Visão de Engenharia |
|---|---|---|
| Foco Central | Risco, governança, TCO, escalabilidade | Ontologias, GraphRAG, SDD, DevOps Salesforce |
| Linguagem Visual | Curvas de eficiência, mapas de maturidade | Diagramas de componentes, topologia de agentes |
| Métrica Prioritária | ROI e conformidade | Cobertura de especificação, latência, estabilidade |

**Refinamentos:**
1. O seletor é **persistente e visível** durante toda a rolagem (não apenas no topo), para que a alternância seja uma escolha contínua, não um evento único.
2. A transição entre visões usa **transmutação de conteúdo, não troca de página** — o mesmo bloco textual se reescreve com uma dissolução suave, reforçando que é a mesma verdade contada em dois vocabulários. **Restrição de timing:** a duração da transição deve ficar abaixo de 200ms. Em textos longos, dissoluções lentas geram fricção cognitiva e sensação de lentidão do sistema — o contrário do que a marca representa. **Restrição de conteúdo (pré-requisito para a transição funcionar):** para que a dissolução em <200ms pareça transmutação e não uma "piscada" desconexa, os pares de frase Executiva/Engenharia devem manter estrutura sintática idêntica, variando apenas vocabulário e métrica — ex.: *"Governança reduz risco operacional em 40%"* ⇄ *"Políticas de validação reduzem falhas em esteira em 40%"*. Conteúdo com estruturas muito distintas entre visões deve ser reescrito antes da implementação, não corrigido depois com animação mais lenta.
3. **Estado padrão inteligente:** a página inicia sempre em Visão Executiva, independentemente de como o visitante chegou — a densidade técnica é sempre uma escolha ativa, nunca a primeira impressão.
4. **Adaptação mobile:** a retícula visual e a tabela comparativa do seletor não são reduzidas proporcionalmente — elas se reestruturam em cartões empilhados, um por dimensão (Foco Central, Linguagem Visual, Métrica Prioritária), com a visão ativa sempre no topo. Isso preserva o limite de 8 segundos de leitura da Camada 1 mesmo em tela pequena, evitando que a tabela vire um bloco denso e ilegível.

### C. Zonas de Demonstração Narrativa

Cada zona segue uma estrutura fixa de três camadas (Superfície → Mecanismo → Núcleo), permitindo consistência de leitura entre temas diferentes:

1. **GraphRAG & Ontologias → "A Memória Institucional Sem Alucinação"**
   * Superfície: uma frase sobre confiança na resposta da IA.
   * Mecanismo: mapa de nós conectando silos de conhecimento a agentes.
   * Núcleo: esquema de grafo com tipos de relação e camadas de contexto.

2. **Spec-Driven Development → "O Blueprint Digital Inviolável"**
   * Superfície: uma frase sobre eliminar ambiguidade entre negócio e código.
   * Mecanismo: fluxo linear especificação → geração → orquestração.
   * Núcleo: exemplo de estrutura de especificação formal e seus critérios de validação.

3. **Salesforce DevOps & Governança → "A Esteira Contínua de Resiliência"**
   * Superfície: uma frase sobre deploys seguros e previsíveis.
   * Mecanismo: circuito de controle de qualidade e conformidade.
   * Núcleo: matriz de checagens automatizadas e pontos de auditoria.

**Novidade estrutural:** cada zona termina com uma pergunta de reflexão dirigida ao papel do visitante, funcionando como ponte psicológica para a próxima seção, sem soar como CTA de vendas. **Refinamento:** a pergunta é dupla e responde ao estado do Seletor de Perspectiva — uma versão para a Visão Executiva, outra para a Visão de Engenharia, reforçando que a personalização vai até o último detalhe da página, não só na tabela comparativa:
   * Executiva: *"Sua organização sabe explicar, para um auditor ou regulador, por que uma resposta de IA foi gerada?"*
   * Engenharia: *"Seu pipeline registra a proveniência de cada resposta gerada por agente, nó a nó?"*

### D. Prova de Governança *(seção nova, ausente na versão anterior)*

Tomadores de decisão em IA corporativa buscam evidência de controle antes de buscar inovação. Esta seção resolve isso com:

* **Selo de Princípios:** três a cinco princípios de governança declarados de forma direta (ex.: Determinismo, Auditabilidade, Rastreabilidade), cada um com uma linha de explicação prática — não um selo decorativo, mas um compromisso verificável.
* **Formato:** cartões compactos, sem métricas infladas, com linguagem de compliance real (referências a práticas de auditoria e não a jargão de marketing).

### E. Hub de Conexão

Mantém o **Filtro de Profundidade Narrativa** original, com um ajuste de nomenclatura mais orientado ao usuário do que ao conteúdo:

* **Camada 1 — "Para decidir":** vídeos-síntese de até 3 minutos, ensaios sobre risco e estratégia.
* **Camada 2 — "Para planejar":** estudos de caso e análises táticas de orquestração e esteiras.
* **Camada 3 — "Para especificar":** whitepapers, arquiteturas de referência, análises de ontologias.

Cada item exibe, além do rótulo de camada, um **tempo estimado de leitura/consumo** — reforça o respeito pelo tempo do executivo e funciona como permissão implícita para ir mais fundo sem se sentir "perdido".

**Mecanismo de interação (especificação antes vaga, agora definida):** três abas fixas e sempre visíveis (não dropdown, não slider) — "Para decidir" / "Para planejar" / "Para especificar" — cada uma exibindo um contador de itens ao lado do rótulo (ex.: "Para planejar (6)"). A aba ativa por padrão é sempre "Para decidir", alinhada ao princípio de estado padrão executivo já aplicado ao Seletor de Perspectiva. A troca de aba não recarrega a página — os cards são filtrados in-place, com a mesma lógica de transmutação usada no Seletor de Perspectiva, mantendo consistência de comportamento entre os dois mecanismos da página.

### F. Ponto de Contato *(seção nova)*

Substitui o formulário genérico por um **convite qualificado**: uma pergunta única e direta (ex.: *"Qual etapa da sua arquitetura de IA está sem governança hoje?"*) que direciona a conversa antes mesmo do primeiro contato — reforçando, até no CTA, a filosofia de especificação antes de execução.

### G. Indicador de Progresso de Rolagem *(elemento transversal, novo)*

Uma linha fina e discreta (posição lateral ou superior, coerente com o Azul Cobalto reservado a sinalização funcional) acompanha a rolagem e marca a posição do visitante dentro das três camadas — não como barra de progresso genérica, mas como um indicador que **acelera visualmente na Camada 1 e desacelera na Camada 3**, refletindo o próprio "ritmo musical" descrito em 1.2. Function dupla: reduz ansiedade em conteúdo longo e reforça, de forma sutil, a metáfora central de que a densidade aumenta conforme o visitante escolhe ir mais fundo.

---

## 3. Diretrizes de Psicologia de UX & Enquadramento Cognitivo

### 3.1 Redução da Carga Cognitiva Inicial

* **Revelação Progressiva Reforçada:** o limite de dois níveis de hierarquia visível se mantém, mas agora com uma regra explícita — **nenhum termo técnico não traduzido pode aparecer em negrito ou título na Camada 1.** Negrito e destaque são reservados a conceitos já traduzidos em valor.
* **Sinalização de Densidade:** os micro-indicadores ("Complexidade: Estratégica" / "Complexidade: Tópico Profundo") ganham uma terceira etiqueta — **"Complexidade: Técnica Aplicada"** — para o meio-termo dos estudos de caso, evitando que tudo pareça ou muito raso ou muito denso.
* **Ancoragem por Repetição Estrutural:** como as três Zonas de Demonstração seguem sempre a mesma sequência (Superfície → Mecanismo → Núcleo), o visitante aprende o "idioma" da página na primeira zona e navega as seguintes com menos esforço cognitivo — a familiaridade estrutural substitui a necessidade de explicações repetidas.

### 3.2 Mecanismos de Engajamento e Autoridade

* **Micro-interações de Engenharia:** transições calculadas, alinhamento rígido em retícula, sem easing "orgânico" — o movimento da interface deve parecer projetado, não decorativo.
* **Ancoragem de Confiabilidade:** vocabulário de engenharia e governança substitui adjetivos de marketing em toda a página, sem exceção — inclusive em CTAs.
* **Gatilho de Curiosidade Controlada:** cada camada superior termina com uma pergunta ou lacuna semântica (não uma resposta completa), incentivando o avanço voluntário para a camada seguinte — a profundidade é sempre uma escolha do visitante, nunca uma imposição de rolagem.
* **Consistência como Prova de Rigor:** a própria disciplina visual da página — grid rígido, ausência de elementos supérfluos, hierarquia previsível — funciona como argumento tácito de que o autor aplica a mesma disciplina à arquitetura de sistemas que constrói para seus clientes.

---

## 4. Implementabilidade: Acessibilidade, Estados de Sistema e Performance *(seção nova)*

Uma especificação de governança e rigor técnico perde credibilidade se a própria página não aplicar rigor equivalente em seus alicerces técnicos. Esta seção fecha essa lacuna.

### 4.1 Acessibilidade

* **Padrão mínimo:** conformidade com **WCAG 2.1 nível AA** em toda a página — não como checklist final, mas como restrição de design desde a Camada 1. Isso inclui navegação completa por teclado (incluindo o Seletor de Perspectiva e as abas do Hub), foco visível consistente com a linguagem visual (contorno em Azul Cobalto), e textos alternativos descritivos para todos os diagramas narrativos.
* **Coerência de posicionamento:** para um site que vende governança e auditabilidade, acessibilidade não é extra — é a mesma tese aplicada à própria interface. Vale citar isso, ainda que brevemente, como princípio no rodapé ou na seção de Prova de Governança.

### 4.2 Estados de Sistema (loading, erro, vazio)

A página é dinâmica por natureza (seletor, transmutação, abas, diagramas interativos), o que exige comportamento definido para os estados silenciosos:

* **Carregamento de diagramas/gráficos:** um esqueleto (skeleton) minimalista, na mesma paleta de grafite, evita saltos de layout — nunca um spinner genérico, que destoaria da estética de precisão.
* **Falha de carregamento:** mensagem curta e no tom da marca (ex.: *"Este diagrama não carregou. Tentar novamente."*), nunca um erro técnico cru.
* **Alternância muito rápida do seletor:** debounce implícito — se o visitante alternar Executiva/Engenharia repetidamente em menos de 200ms, a transição in-progress deve concluir antes de iniciar a próxima, evitando sobreposição visual.
* **Navegação sem JavaScript:** a página deve degradar para uma versão estática legível, com a Visão Executiva como conteúdo padrão renderizado no HTML base — garante que a proposta de valor sobrevive mesmo no pior cenário técnico.

### 4.3 Performance e Carregamento Progressivo

* **Lazy loading por camada:** assets pesados (diagramas interativos, ilustrações da Camada 3) só carregam quando o visitante rola até a seção correspondente ou alterna ativamente para a Visão de Engenharia — a Camada 1 deve carregar instantaneamente, mesmo em rede móvel limitada.
* **Orçamento de performance implícito:** a promessa de "autoridade em 5 segundos" do Hero só se sustenta se o próprio carregamento da página não consumir esse tempo. O Hero e o Seletor de Perspectiva compõem o orçamento crítico de carregamento inicial; todo o resto é passível de carregamento progressivo.

---

### Resumo das Principais Evoluções em Relação à Versão Anterior

1. Metáfora mais dinâmica (dissecação em tempo real, não planta estática).
2. Sistema de "temperatura visual" por camada de profundidade.
3. Terceiro acento cromático (Âmbar) para governança/conformidade.
4. Regra explícita de tradução de jargão na Camada 1.
5. Nova seção de Prova de Governança.
6. Novo Ponto de Contato qualificado, substituindo formulário genérico.
7. Estrutura fixa de três camadas em todas as Zonas de Demonstração, para consistência de leitura.
8. *(v2.1)* Camada 3 preserva o dark mode dominante — iluminação apenas em bordas e fundos internos de cards.
9. *(v2.1)* Transição do Seletor de Perspectiva limitada a menos de 200ms, evitando fricção cognitiva.
10. *(v2.1)* Seletor de Perspectiva reestruturado em cartões empilhados no mobile, preservando o limite de 8 segundos de leitura da Camada 1.
11. *(v3.0)* Contraste mínimo de 7:1 definido explicitamente para texto da Camada 3.
12. *(v3.0)* Restrição de paridade sintática entre frases Executiva/Engenharia, viabilizando a transição em <200ms.
13. *(v3.0)* Tabela de tokens de design (cores, espaçamento, tipografia) por camada — elimina ambiguidade de implementação.
14. *(v3.0)* Mecanismo de interação do Hub de Conexão definido: três abas fixas com contador de itens.
15. *(v3.0)* Perguntas de reflexão duplicadas por persona (Executiva/Engenharia) em cada Zona de Demonstração.
16. *(v3.0)* Indicador de progresso de rolagem, alinhado ao ritmo de densidade por camada.
17. *(v3.0)* Nova seção de Implementabilidade: acessibilidade WCAG 2.1 AA, estados de loading/erro/vazio e diretrizes de performance/lazy loading.
