# Especificação Especializada de Design Visual
## Deterministic Grounding para Engenharia Agentic de Software

**Versão:** 1.1 — §4 revisada para herdar a paleta Dark Tech (ver nota na seção)  
**Idioma da interface:** Português do Brasil  
**Tipo de experiência:** Artigo técnico interativo, editorial e imersivo  
**Direção:** Sistema visual contemporâneo para tornar estado, autoridade, risco e evidência perceptíveis  
**Documento de origem:** `00_SPEC_Conteúdo.md`  

---

## 1. Visão de design

Esta página não deve parecer um blog técnico convencional, uma documentação de API ou uma apresentação corporativa genérica. Ela deve ser percebida como um **instrumento de investigação visual**: uma interface que conduz o leitor pelo descompasso entre o que o agente acredita, o que o repositório realmente contém, o que pode ser alterado e o que uma validação é capaz de demonstrar.

A experiência deve transformar um tema abstrato em uma sequência de estados visíveis. O leitor começa diante de uma mudança aparentemente correta e, progressivamente, descobre camadas ocultas de estado, escopo, autoridade e evidência. A sensação desejada é de revelação controlada, não de espetáculo vazio.

> **Princípio visual central:** toda animação deve tornar uma relação técnica mais compreensível. Nenhum efeito deve existir apenas para ornamentar a página.

A estética deve combinar:

- **Precisão editorial:** tipografia limpa, hierarquia rigorosa e leitura confortável;
- **Tensão operacional:** contrastes fortes, estados de bloqueio, alertas e divergências visíveis;
- **Materialidade de sistema:** hashes, linhas de código, diffs, grafos, trilhas de auditoria e envelopes de execução;
- **Surpresa progressiva:** transições que revelam que um resultado verde não equivale a uma conclusão global;
- **Contenção:** o design deve comunicar segurança e limites, não velocidade irresponsável ou autonomia irrestrita.

---

## 2. Conceito criativo

### 2.1 Nome da direção

**The Gap Is the Interface** — *O gap é a interface*.

O `Agent–Repository Gap` deve ser a metáfora espacial e visual da página. De um lado, estão as premissas do agente: contexto recuperado, memória, plano e probabilidade textual. Do outro, estão os predicados verificáveis: commit, árvore, dependências, policy, diff e evidência. Entre os dois existe uma zona variável, que não deve ser representada como um vazio abstrato, mas como um campo de incerteza mensurável.

### 2.2 Ideia de abertura

A primeira tela apresenta duas camadas desalinhadas:

- uma camada de **agente**, composta por fragmentos de prompt, contexto e plano;
- uma camada de **repositório**, composta por snapshot, branch, lockfile e diff.

Inicialmente, as duas parecem coincidir. Com o movimento do cursor ou com o scroll, pequenos deslocamentos aparecem: uma dependência some, uma regra arquitetural muda, uma pasta sai do escopo. A frase central surge apenas quando o desalinhamento se torna evidente:

> **Código correto em isolamento ainda pode ser uma mudança errada.**

A frase deve ser curta, grande e silenciosa. A explicação vem abaixo, em ritmo editorial.

---

## 3. Personalidade visual

A identidade deve ser **escura, técnica, editorial e atmosférica**, sem imitar dashboards de observabilidade. A página precisa ter presença de manifesto, mas conservar a legibilidade de um paper técnico.

### 3.1 Atributos

| Atributo | Aplicação visual |
|---|---|
| Rigoroso | Grades aparentes, alinhamento preciso e nomenclatura consistente |
| Investigativo | Camadas ocultas, revelações por scroll e estados expandíveis |
| Contido | Espaços generosos, animação desacelerada e ausência de ruído permanente |
| Experimental | Tipografia variável, camadas deslocadas e diagramas vivos |
| Auditável | Proveniência, versão, digest e escopo visíveis nos componentes |
| Crítico | Alertas de limite, `UNKNOWN` e `CONFLICT` com a mesma dignidade de `PASS` |

### 3.2 O que evitar

Não utilizar estética de “IA mágica”, cérebros digitais, robôs, circuitos genéricos, hologramas, gradientes neon excessivos, partículas decorativas ou visual de terminal hacker. Também não usar verde como cor dominante da experiência. O verde deve ser reservado para uma condição de aprovação localizada e nunca para comunicar “sucesso total”.

---

## 4. Sistema cromático

> **Correção de rumo (v1.1):** a versão original desta seção definia uma paleta própria
> (`--ink-950 #090B0F`, acentos `--signal-*` inéditos) que divergia da paleta **Dark Tech**
> exigida por `AGENTS.md` §"Design System Guardrails" e não é a exceção registrada de
> `apresentacao` (namespace `.ap-*`, `ADR-ap-001`). A tabela abaixo resolve a decisão D-1 do
> plano de desenvolvimento agêntico da página ([`02_SPEC_Desenvolvimento_Agentico.md`](02_SPEC_Desenvolvimento_Agentico.md#1-premissas)):
> os **valores** herdam a paleta Dark Tech (que este site já identifica como GitHub Dark Dimmed —
> ver `.claude/skills/mauricio-site-patterns/SKILL.md`), preservando os **papéis semânticos**
> descritos em 00 (observado, inferência, atenção, bloqueio, aprovação, desconhecido, conflito).
> Nenhum hexadecimal deste sistema deve ser reinventado na implementação — WP-0.1 do doc 02
> consome exatamente esta tabela.

A paleta é quase preta, com superfícies em grafite e acentos semânticos herdados do tema GitHub
Dark Dimmed que já governa o restante do site. Todos os contrastes devem ser validados para
leitura, inclusive em telas de baixo brilho.

### 4.1 Tokens de cor

| Token | Referência | Uso | Origem |
|---|---|---|---|
| `--dg-bg-950` | `#0d1117` | Fundo principal | Dark Tech (fundo padrão do site) |
| `--dg-bg-900` | `#161b22` | Superfície de cards e painéis | Dark Tech (superfície padrão do site) |
| `--dg-border` | `#30363d` | Bordas, linhas de grade e divisores | Dark Tech (borda padrão do site) |
| `--dg-text-100` | `#ffffff` | Texto principal / títulos | Dark Tech (`h1`/`h2`/`h3`) |
| `--dg-text-300` | `#c9d1d9` | Texto secundário / corpo | Dark Tech (`body`) |
| `--dg-blue` | `#58a6ff` | Observação, grounding e relações verificadas | Dark Tech (azul de texto AA já sancionado pela skill `new-page`) |
| `--dg-purple` | `#a371f7` | Hipótese, inferência e contexto do agente | Família do acento decorativo `#8a2be2`, ajustado para contraste AA em texto/ícone sobre `--dg-bg-950` |
| `--dg-amber` | `#d29922` | Atenção, escopo, validade próxima e impacto | GitHub Dark Dimmed — `attention` |
| `--dg-red` | `#f85149` | Falha, bloqueio, violação ou risco | GitHub Dark Dimmed — `danger` |
| `--dg-green` | `#3fb950` | `PASS` localizado e evidência satisfatória | GitHub Dark Dimmed — `success` |
| `--dg-gray` | `#8b949e` | `UNKNOWN`, ausência de evidência e estado não observado | GitHub Dark Dimmed — `muted` |
| `--dg-magenta` | `#db61a2` | `CONFLICT`, divergência entre registros válidos | GitHub Dark Dimmed — acento rosa/magenta (mesma família, uso pontual) |

O gradiente decorativo do site (`linear-gradient(90deg, #007bff, #8a2be2)`) pode aparecer em
elementos de marca (CTA final, sublinhado de seção), nunca como substituto de `--dg-blue`/
`--dg-purple` nos estados semânticos — esses dois papéis exigem o tom de maior contraste AA
sobre `--dg-bg-950`.

### 4.2 Regras semânticas

- `PASS` deve aparecer como um **resultado delimitado**, nunca como uma aura verde sobre a tela inteira.
- `UNKNOWN` deve ser visualmente neutro, mas não apagado. Ele representa uma condição relevante de não conhecimento.
- `CONFLICT` deve combinar magenta e uma ruptura de alinhamento, evitando o uso exclusivo de vermelho, que sugeriria simplesmente uma falha.
- Dados observados devem usar azul (`--dg-blue`); inferências e hipóteses devem usar violeta (`--dg-purple`); isso reforça a distinção epistemológica sem depender apenas de texto.
- Vermelho deve indicar uma ação bloqueada ou uma propriedade violada, e não qualquer informação importante.
- Nenhum token deste sistema é hexadecimal solto no HTML/CSS final: todos vivem em `:root` como
  `--dg-*` (nunca `--ap-*`, reservado à exceção de `apresentacao`) e são a única fonte de cor da
  página, conforme o DoD global do doc 02.

---

## 5. Tipografia

### 5.1 Família tipográfica

A composição deve usar uma combinação de tipografia editorial e monoespaçada:

- **Display:** uma sans-serif grotesca ou neo-grotesca variável, com grande contraste de peso e largura. Deve ter aparência contemporânea sem perder neutralidade.
- **Texto:** uma sans-serif de alta legibilidade, com altura-x generosa e bom desempenho em parágrafos longos.
- **Dados e código:** uma monoespaçada de desenho humanista, para hashes, estados, identificadores, paths e trechos de diff.

As fontes devem possuir fallback local robusto. A página não pode depender de uma fonte remota para manter sua hierarquia.

### 5.2 Escala tipográfica

- **Hero display:** `clamp(3.25rem, 9vw, 9.5rem)`, line-height entre `0.86` e `0.96`.
- **Título de seção:** `clamp(2rem, 5vw, 5rem)`, line-height entre `0.95` e `1.05`.
- **Intertítulo:** `clamp(1.35rem, 2.5vw, 2.4rem)`.
- **Corpo:** entre `1.05rem` e `1.2rem`, line-height entre `1.55` e `1.75`.
- **Metadado:** entre `0.7rem` e `0.82rem`, com espaçamento de letras ampliado.
- **Código:** entre `0.78rem` e `0.95rem`, sem compressão horizontal excessiva.

Os títulos devem alternar entre alinhamento à esquerda e blocos deslocados apenas quando isso melhorar a leitura da estrutura. A experimentação tipográfica não deve criar uma página difícil de escanear.

---

## 6. Arquitetura da experiência

A página deve ser construída como uma sequência de **nove cenas narrativas**, acompanhadas por um índice lateral ou superior que mostre a posição do leitor sem funcionar como um menu pesado.

### Cena 00 — O desvio

**Conteúdo:** abertura, frase-problema, tese e subtítulo.  
**Composição:** viewport cheio, fundo escuro, duas camadas desalinhadas.  
**Interação:** no scroll, a camada do agente move-se em velocidade ligeiramente diferente da camada do repositório.  
**Revelação:** aparece o marcador `G_t ≠ 0`, seguido da explicação do gap.

### Cena 01 — Dois estados, uma mudança

**Conteúdo:** `A_t`, `S_t`, `D` e `G_t`; Current, Desired, Historical, Policy e Evidence State.  
**Composição:** cinco placas de estado em uma composição orbital ou linear. Cada placa mostra um identificador, uma autoridade e um limite.  
**Interação:** ao selecionar uma placa, as demais perdem opacidade e uma linha mostra quais afirmações podem ou não ser feitas a partir daquele estado.  
**Regra:** não usar um diagrama circular genérico. A relação de autoridade deve ser textual e visualmente explícita.

### Cena 02 — A Snapshot Capsule

**Conteúdo:** commit, branch, árvore, lockfile, toolchain, ambiente e digest.  
**Composição:** um objeto visual central semelhante a um envelope de evidência, formado por camadas empilhadas.  
**Animação:** cada camada é lacrada com um pequeno gesto de fechamento; se um item estiver ausente, o lacre não fecha e o estado se torna `UNKNOWN`.  
**Interação:** o leitor pode expandir a cápsula para ver a diferença entre “identidade do snapshot” e “estado realmente observado”.

### Cena 03 — Da intenção ao contrato

**Conteúdo:** necessidade → intenção → Desired State → requisito → contrato → oracle → evidência.  
**Composição:** uma linha de transformação com nós conectados por verbos, não apenas setas.  
**Interação:** cada etapa abre um exemplo do serviço de compartilhamento de fotos. Ao chegar ao oracle, os efeitos de privacidade não observados aparecem fora do caminho principal, em uma zona cinza.  
**Surpresa:** o caminho de “API PASS” continua verde, mas uma trilha lateral de logs, retenção e terceiro permanece sem validação.

### Cena 04 — O software como estrutura parcial

**Conteúdo:** Repository → Parser → AST/CST → Symbols → Typed Relations → Graphs → Architectural View.  
**Composição:** grafo técnico com nós em camadas e relações nomeadas.  
**Animação:** o grafo se constrói, mas algumas relações terminam em `POSSIBLE`, `UNKNOWN` ou `CONFLICT`, em vez de parecer completo.  
**Interação:** clicar em reflexão, `eval`, plugins, runtime ou código gerado expõe a limitação correspondente.  
**Regra:** a visualização nunca deve sugerir que o grafo é o sistema inteiro.

### Cena 05 — Autonomia não é autoridade

**Conteúdo:** matriz autonomia × autoridade e Action Gateway.  
**Composição:** quadrante grande, com a zona recomendada destacada por contorno azul (`--dg-blue`), não por preenchimento.  
**Interação:** um plano do agente percorre o gateway como uma proposta não confiável. O gateway normaliza, valida, resolve recurso, mede impacto, consulta policy, exige aprovação e só então executa.  
**Animação:** quando uma ação tenta acessar `deploy/**` fora da allowlist, a linha é interrompida antes do workspace.  
**Contraexemplo:** `release_status` aciona indiretamente `sync_environment`; a segunda chamada deve surgir como uma nova entidade e não ficar escondida dentro da primeira.

### Cena 06 — O resultado verde é menor do que parece

**Conteúdo:** oracle problem, tipos de oracle e força limitada de `PASS`.  
**Composição:** uma coluna de veredictos e outra coluna de limites. Cada `PASS` ocupa uma área proporcional ao escopo observado; fora dela, permanece uma área escura marcada como “não demonstrado”.  
**Interação:** ao alternar entre parser, type checker, teste, scanner, monitor e revisão humana, muda o contorno do que foi observado, não apenas a cor do resultado.  
**Contraexemplo:** `test_rejects_negative_amount()` passa a `skip`; o agregado fica verde, mas o inventário esperado revela um buraco.

### Cena 07 — Evidence Record

**Conteúdo:** record ID, subject, SHA, oracle, validator, ambiente, digest, veredicto, limitações, cobertura e policy decision.  
**Composição:** ficha de evidência com aparência de documento técnico vivo, com trilha de proveniência.  
**Interação:** cada campo pode ser expandido; campos essenciais ausentes geram `INCOMPLETE`, não `PASS`.  
**Animação:** a evidência não “brilha”; ela se torna mais nítida à medida que sua proveniência é conectada.

### Cena 08 — Reconciliação e decisão

**Conteúdo:** Desired State + Current State pós-ação + Evidence State + Policy State.  
**Composição:** quatro painéis entram em alinhamento. A decisão aparece como uma saída controlada: aceitar, bloquear, revisar, novo ciclo, corrigir oracle, alterar especificação por decisão explícita ou registrar exceção.  
**Interação:** divergências não podem ser resolvidas por clique em “aprovar”. O leitor deve abrir o motivo ou retornar ao estado anterior.  
**Fechamento:** procedimento prático de início, MVA versus produção e hipótese experimental.

---

## 7. Componentes visuais obrigatórios

### 7.1 State Card

Cada estado deve usar o mesmo componente estrutural:

- rótulo de estado;
- identificador monoespaçado;
- o que ele autoriza afirmar;
- o que ele não autoriza afirmar;
- origem e validade;
- indicador de confiança epistemológica;
- ação de “ver limitações”.

### 7.2 Epistemic Badge

Badges para `ESTABLISHED`, `DOCUMENTED`, `PROPOSED`, `HYPOTHESIS`, `INFERENCE` e `UNKNOWN`. O texto deve sempre acompanhar a cor e um ícone simples, para que o significado não dependa apenas de percepção cromática.

### 7.3 Diff Lens

Visualização de diff com três camadas:

1. mudança proposta;
2. escopo autorizado;
3. escopo efetivamente atingido.

Uma alteração fora da allowlist deve sair do fluxo com uma borda vermelha e a justificativa “bloqueada antes da aplicação”.

### 7.4 Evidence Ledger

Lista vertical de registros com timestamp, subject, oracle, validator e veredicto. O ledger deve permitir comparação entre registros sem parecer uma tabela administrativa. A unidade visual é a linha de proveniência.

### 7.5 Boundary Marker

Marcadores verticais ou horizontais para sinalizar a fronteira do que um mecanismo observa. Devem aparecer em diagramas e painéis para combater a leitura enganosa de completude.

### 7.6 Failure Card

Cards de contraexemplo com estrutura fixa: situação, aparência de sucesso, propriedade não observada, controle que falhou e lição. O título deve ser direto, como “API verde, privacidade invisível”.

---

## 8. Sistema de motion design

### 8.1 Princípios

O movimento deve ser **progressivo, causal e reversível**. A página não deve iniciar uma animação sem que o leitor saiba qual relação está sendo revelada. A velocidade deve permitir leitura dos labels e não transformar os diagramas em vídeos decorativos.

### 8.2 Comportamentos

- **Grounding:** linhas azuis (`--dg-blue`) se conectam a um snapshot identificado.
- **Inferência:** linhas violetas podem aparecer tracejadas e terminar antes do destino.
- **Enforcement:** uma barreira surge perpendicularmente ao fluxo e interrompe a ação.
- **Validation:** um oracle percorre apenas o perímetro que ele observa.
- **Evidence:** a informação se fixa em um registro, em vez de evaporar após o check.
- **Reconciliation:** quatro estados se aproximam; o resultado só aparece quando os quatro são legíveis.
- **UNKNOWN:** a animação deve parar em uma borda incompleta, sem tentar preencher a lacuna.
- **CONFLICT:** duas linhas válidas entram em colisão controlada e permanecem visíveis.

### 8.3 Ritmo

- Entrada de cena: entre `500 ms` e `900 ms`.
- Transição de estado: entre `220 ms` e `420 ms`.
- Revelação de diagrama: em etapas de `120 ms` a `240 ms` por nó.
- Microinteração: entre `120 ms` e `220 ms`.
- Nenhum loop contínuo deve exceder poucos segundos sem motivo. O estado de espera deve ser estático ou quase imperceptível.

### 8.4 Scroll-driven design

O scroll deve controlar capítulos e revelações, não a posição exata de cada elemento. Em cada cena, o texto deve permanecer legível enquanto o diagrama muda. O sistema deve suportar entrada direta por âncora sem exigir que o leitor atravesse todas as animações.

### 8.5 Redução de movimento

Com `prefers-reduced-motion`, os deslocamentos devem ser substituídos por fades curtos, mudanças de borda e expansão instantânea. Nenhuma informação pode existir apenas no movimento.

---

## 9. Interações de descoberta

As interações devem ser opcionais. O leitor que apenas rolar a página deve compreender a narrativa principal; quem investigar deve encontrar maior profundidade.

- **Hover/focus em termos técnicos:** exibe uma definição curta e a classificação epistemológica.
- **Clique em estado:** abre o que pode ser afirmado e o limite correspondente.
- **Comparador baseline/proposed:** alterna entre `Agent → Context → Tools → Code → Tests` e o fluxo com grounding, constraints, validation, evidence e reconciliation.
- **Ablação:** remove visualmente um mecanismo e mostra o tipo de risco que retorna. A remoção não deve afirmar causalidade experimental; deve ser rotulada como representação conceitual.
- **Filtro de veredictos:** permite exibir somente `PASS`, `FAIL`, `UNKNOWN` ou `CONFLICT`, mantendo um contador do que foi ocultado.
- **Expandir referência:** revela a fonte e o motivo de sua pertinência, sem transformar a página em bibliografia intrusiva.

---

## 10. Arquitetura de layout

### 10.1 Grade

Usar uma grade de 12 colunas em telas amplas, com coluna de leitura entre 6 e 8 colunas e área de diagrama ocupando as demais. Em telas médias, converter para uma composição de 8 colunas. Em telas pequenas, empilhar texto e diagrama, preservando o texto primeiro.

### 10.2 Margens e densidade

A página deve alternar entre áreas de alta concentração técnica e áreas de silêncio visual. Cada seção precisa ter pelo menos um momento de respiro antes de apresentar o próximo diagrama. Evitar paredes de cards; o artigo deve continuar sendo uma leitura, não um painel.

### 10.3 Navegação persistente

Uma barra mínima deve indicar:

- nome curto da seção atual;
- progresso aproximado;
- acesso ao índice;
- controle de contraste, quando disponível;
- estado de movimento reduzido, quando detectado.

A barra deve desaparecer durante momentos de foco intenso e reaparecer ao inverter a direção do scroll.

---

## 11. Responsividade

### Desktop

A composição pode usar sobreposição, trilhas paralelas, diagramas largos e cenas sticky. O conteúdo deve aproveitar a largura para separar intenção, estado, ação e evidência em eixos distintos.

### Tablet

Reduzir sobreposições e transformar diagramas paralelos em sequências horizontais ou blocos alternados. Preservar os labels completos e evitar escalonar um grafo inteiro até torná-lo ilegível.

### Mobile

A experiência deve assumir uma leitura vertical. Cada diagrama complexo deve oferecer uma versão em etapas numeradas. A Snapshot Capsule vira uma pilha de cartões. A matriz autonomia × autoridade vira uma lista de quatro quadrantes. O Action Gateway vira um fluxo vertical com estados bloqueáveis.

Nenhuma tabela extensa deve ser simplesmente comprimida. As tabelas de oráculos e taxonomias devem virar cartões comparáveis, com o nome, o que estabelece e o que não estabelece.

---

## 12. Acessibilidade

A direção visual deve cumprir, no mínimo:

- contraste AA para texto normal e AAA quando possível para texto principal;
- foco de teclado evidente em todas as interações;
- navegação por headings coerentes;
- diagramas com descrição textual equivalente;
- estados comunicados por texto, ícone e forma, não somente por cor;
- `UNKNOWN` e `CONFLICT` anunciados de maneira explícita por leitores de tela;
- controles de abrir e fechar com estado acessível;
- ordem de leitura preservada quando camadas visuais se sobrepõem;
- nenhuma informação essencial exibida somente em hover;
- suporte integral a `prefers-reduced-motion`;
- tamanho de toque adequado em elementos interativos móveis.

---

## 13. Performance percebida e técnica

A página deve parecer sofisticada sem exigir uma infraestrutura pesada. O design deve priorizar CSS, SVGs pequenos e animações transform/opacity. Diagramas grandes devem ser carregados sob demanda e possuir fallback estático.

### Regras

- primeira pintura com hero estático, sem depender de JavaScript;
- nenhuma animação deve bloquear a leitura inicial;
- limitar efeitos de blur, filtros e sombras em camadas simultâneas;
- evitar canvas contínuo para elementos que podem ser SVG ou CSS;
- pausar cenas fora da viewport;
- usar lazy loading para referências visuais não essenciais;
- respeitar conexões lentas e dispositivos de baixa capacidade;
- permitir uma versão “somente leitura”, sem animação, mantendo todos os diagramas estáticos;
- não usar vídeo de fundo;
- não converter texto em imagem.

### Métricas de qualidade visual

A implementação deve ser validada para manter estabilidade de layout, baixa latência de interação e carregamento progressivo do conteúdo principal. O objetivo não é apenas uma página bonita, mas uma experiência que não penalize o leitor por tentar compreender um tema técnico complexo.

---

## 14. Tratamento visual da honestidade epistemológica

A página deve incorporar a crítica em sua própria forma. Para cada mecanismo apresentado, usar a estrutura visual recorrente:

> **O mecanismo observa:** …  
> **Pode sustentar:** …  
> **Não sustenta sozinho:** …  
> **Se faltar informação:** `UNKNOWN`  
> **Se houver registros incompatíveis:** `CONFLICT`

Essa estrutura deve aparecer em cards, tooltips, diagramas e no fechamento de cada cena. O design não deve esconder as limitações em notas de rodapé.

O efeito desejado é que o leitor aprenda a desconfiar de superfícies excessivamente verdes. Uma tela cheia de `PASS` deve ser visualmente menos convincente se a cobertura e o envelope não estiverem declarados.

---

## 15. Direção para os quatro contraexemplos

Cada contraexemplo deve ser uma microexperiência própria, com transição de “aparente sucesso” para “falha não observada”.

1. **Contexto stale e arquitetura:** duas versões de um repositório deslizam até se separarem; o código permanece sintaticamente correto, mas o diff atravessa uma fronteira arquitetural.
2. **Privacidade não observada:** os testes de API fecham em verde enquanto trilhas secundárias de log, terceiro, retenção e acesso interno continuam sem oracle.
3. **Ferramenta secundária privilegiada:** uma chamada de leitura abre uma cadeia oculta; a segunda chamada surge com identidade diferente e alcance de escrita.
4. **Falso progresso por remoção do teste:** o cartão de falha desaparece da lista, o contador verde sobe, mas o inventário esperado mostra que a observação diminuiu.

Cada cena deve terminar com uma frase-limite, visualmente distinta da conclusão principal. Exemplos: **“Coerência não é atualidade.”**, **“Interface não é finalidade.”**, **“Schema não é autorização.”**, **“Menos falhas não significa mais evidência.”**

---

## 16. Fechamento e chamada para ação

O final não deve pedir que o leitor “confie na arquitetura”. Deve oferecer um primeiro passo pequeno e reversível.

### Bloco final: Comece com um MVA

Apresentar uma sequência de sete ações:

1. escolha uma tarefa limitada e de baixo impacto;
2. fixe a Snapshot Capsule;
3. declare allowlist e denylist;
4. transforme um requisito em contrato e oracle;
5. execute o agente sem autoridade implícita;
6. registre `PASS`, `FAIL`, `UNKNOWN` e `CONFLICT`;
7. compare com um baseline sem grounding.

O botão ou link final deve ter linguagem operacional, como **“Definir o primeiro envelope”**, e não linguagem promocional, como “Ativar autonomia”. Ao clicar, o leitor deve ser levado a um checklist ou seção de procedimento, nunca a uma ação externa irreversível.

---

## 17. Critérios de aceite visual

A direção será considerada implementada quando:

1. a abertura comunicar o problema antes de apresentar ferramentas;
2. o Agent–Repository Gap for visível e não apenas definido em texto;
3. `A_t`, `S_t`, `D` e `G_t` tiverem representação espacial consistente;
4. Current, Desired, Historical, Policy e Evidence State não forem confundidos por cor ou posição;
5. a Snapshot Capsule mostrar identidade, validade e ausência de dados;
6. grounding, enforcement, validation, evidence e reconciliation tiverem movimentos distintos;
7. a autonomia for visualmente separada da autoridade;
8. o Action Gateway interromper uma ação fora de escopo antes do efeito;
9. MCP não for representado como selo de segurança total;
10. o `PASS` tiver fronteira de observação explícita;
11. `UNKNOWN` e `CONFLICT` forem estados de primeira classe;
12. os quatro contraexemplos tiverem microinterações próprias;
13. MVA e produção forem visualmente separados;
14. o baseline e a proposta puderem ser comparados sem sugerir resultado experimental já comprovado;
15. o conteúdo continuar compreensível sem animação;
16. o mobile preservar a sequência pedagógica;
17. todas as animações forem pausáveis ou reduzíveis;
18. a página carregar primeiro texto e estrutura, depois camadas de visualização;
19. a estética evitar clichês de IA e dashboards genéricos;
20. o fechamento conduzir a uma prática pequena, reversível e mensurável.

---

## 18. Frase de direção para a equipe

> **Projete uma página que faça o leitor sentir o momento em que uma mudança aparentemente correta perde sua base: o contexto não é o estado, o schema não é a autoridade, o verde não é a verdade e a ausência de evidência precisa permanecer visível.**

A experiência deve terminar com mais discernimento do que deslumbramento. Seu sucesso visual não será medido pela quantidade de movimento, mas pela capacidade de fazer o leitor enxergar, em cada ação agêntica, a diferença entre **o que foi proposto, o que foi permitido, o que foi observado e o que continua desconhecido**.

---

## Apêndice A — Mapa de correspondência conteúdo → design

| Conteúdo editorial | Tratamento visual principal |
|---|---|
| Problema de código correto em isolamento | Hero com camadas desalinhadas |
| Agent–Repository Gap | Eixo espacial entre agente e repositório |
| Snapshot Capsule | Objeto de estado com lacres e digest |
| Intenção → contrato → oracle | Linha de transformação com propriedades negativas |
| Grounding estrutural | Grafo parcial com limites explícitos |
| Autonomia × autoridade | Matriz interativa e gateway mediador |
| MCP e autoridade downstream | Cadeia de chamadas secundárias |
| Oracle problem | Área observada versus área não demonstrada |
| PASS / FAIL / UNKNOWN / CONFLICT | Ledger de evidências e estados distintos |
| Evidence Record | Ficha de proveniência expandível |
| Reconciliação | Quatro estados convergentes em decisão |
| MVA versus produção | Duas trilhas com escopos diferentes |
| Hipótese experimental | Comparador baseline/proposed com rótulo de hipótese |
| Contraexemplos | Microcenas de reversão da aparência de sucesso |
| Procedimento prático | Checklist final com ação reversível |

## Apêndice B — Vocabulário de motion

| Termo | Comportamento visual |
|---|---|
| Observed | Linha sólida que chega a um objeto identificado |
| Inferred | Linha tracejada com etiqueta de inferência |
| Possible | Ramificação translúcida sem fechamento |
| Unknown | Espaço não preenchido com marcador de ausência |
| Conflict | Duas trilhas válidas em desalinhamento |
| Grounding | Conexão entre afirmação e snapshot |
| Enforcement | Barreira antes do efeito |
| Validation | Moldura que delimita o escopo observado |
| Evidence | Registro persistente com digest e proveniência |
| Reconciliation | Comparação de estados antes da decisão |

---

## Apêndice C — Mensagens de interface sugeridas

- **Snapshot identificado:** “Esta leitura está vinculada a `commit`, árvore e ambiente específicos.”
- **Contexto sem proveniência:** “Sem origem, validade e digest, este contexto não pode ser tratado como estado atual.”
- **Ação bloqueada:** “A proposta excede o escopo autorizado. Nenhum efeito foi aplicado.”
- **PASS delimitado:** “A propriedade foi satisfeita dentro deste subject, oracle, configuração e envelope.”
- **UNKNOWN:** “Não há evidência suficiente para concluir. Este estado não equivale a aprovação.”
- **CONFLICT:** “Registros válidos e comparáveis divergem. Não resolver por maioria silenciosa.”
- **Revisão necessária:** “A mudança pode ser tecnicamente executável, mas a base de decisão ainda é insuficiente.”
- **Especificação protegida:** “A especificação não deve ser alterada apenas para fazer o teste passar.”

---

*Fim da especificação especializada de design visual.*
