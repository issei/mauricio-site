# Especificação de desenvolvimento agêntico
## Experiência editorial: “Quando a curiosidade deixa de ser conteúdo e vira investigação”

**Versão:** 1.0
**Status:** especificação completa para design, implementação, validação e publicação
**Idioma da interface:** português brasileiro
**Tipo de produto:** artigo longo, editorial, responsivo, interativo e acessível
**Documento de referência:** artigo-base fornecido pelo solicitante e validação da proposta de design

---

## 1. Objetivo do produto

Construir uma página web editorial de leitura imersiva para apresentar o artigo **“Quando a curiosidade deixa de ser conteúdo e vira investigação”**. A experiência deve transformar um texto acadêmico-reflexivo denso em uma jornada de leitura fluida, orientada e visualmente memorável, sem reduzir sua nuance ou apresentar como fato aquilo que o próprio artigo classifica como experiência, interpretação ou hipótese.

A página deve conduzir o leitor por uma transição perceptível:

> **Feed frenético → fricção → pergunta → investigação → verificação → explicação → publicação → nova curiosidade.**

O design deve funcionar como uma camada de suporte cognitivo. Ele deve reduzir a carga de orientação, facilitar a compreensão da estrutura e criar pausas para reflexão. Não deve transformar o artigo em uma sequência de efeitos, um produto de marketing de IA ou um quiz gamificado.

### 1.1 Tese de experiência

> **A interface começa como um feed que captura atenção e termina como uma bancada que organiza atenção.**

Essa tese orienta composição, movimento, cor, densidade de informação e comportamento dos componentes.

### 1.2 Resultado esperado

Ao concluir a leitura, o usuário deve:

- compreender as três distinções centrais do artigo;
- distinguir acesso à informação de compreensão;
- entender a IA como ferramenta de organização e confronto, não como oráculo;
- reconhecer a importância de recuperação ativa, autoexplicação e verificação;
- compreender o ciclo apresentado como modelo interpretativo, não como método empiricamente validado;
- conseguir localizar referências, nota editorial e auditoria sem interromper a leitura principal;
- experimentar, por meio da interface, a passagem de consumir uma resposta para construir uma explicação verificável.

---

## 2. Princípios não negociáveis

### 2.1 O texto é o produto principal

O artigo deve permanecer disponível como conteúdo semântico, pesquisável, indexável e acessível mesmo quando todas as animações e interações estiverem desativadas. Nenhum efeito pode esconder, substituir ou alterar o sentido do texto.

### 2.2 A interface deve argumentar sem exagerar

A direção de arte deve criar condições para o leitor experimentar o argumento, mas não pode apresentar o ciclo como ciência consolidada nem sugerir que a IA garante aprendizagem.

### 2.3 A complexidade visual deve ser progressiva

O início pode conter mais sinais de fluxo e fragmentação. O desenvolvimento deve ganhar estabilidade, espaço e foco. A página não deve manter estímulo alto em toda a extensão.

### 2.4 Interação nunca pode ser obrigatória

Todo componente interativo precisa ter uma alternativa linear, textual ou estática. Arrastar, tocar, rolar ou ativar animações deve enriquecer a experiência, nunca ser condição para acessar conteúdo.

### 2.5 Acessibilidade é requisito estrutural

A página deve atender WCAG 2.2 nível AA como meta de implementação. Contraste, teclado, foco, leitores de tela, redução de movimento, zoom e navegação em dispositivos móveis devem ser tratados desde a arquitetura.

### 2.6 Honestidade epistemológica

O produto deve preservar visualmente a diferença entre:

- **Literatura:** afirmação apoiada por fonte citada.
- **Experiência pessoal:** relato do autor.
- **Interpretação:** inferência ou leitura do autor.
- **Hipótese aberta:** possibilidade ainda não validada.

Esses marcadores devem ser seletivos. Não devem aparecer em todos os parágrafos.

---

## 3. Escopo integral do produto

Esta especificação contempla a experiência completa, não uma versão reduzida. O desenvolvimento deve incluir:

1. página editorial responsiva para desktop, tablet e mobile;
2. hero com transição visual do feed para a leitura;
3. barra superior com progresso e controles de leitura;
4. índice sticky desktop e índice colapsável mobile;
5. trilho lateral de apoio opcional e colapsável;
6. três componentes visuais para as distinções centrais;
7. blockquotes editoriais com animação progressiva;
8. marcadores epistemológicos seletivos;
9. interação completa “Bancada vs. Oráculo”;
10. versão linear e acessível da interação “Bancada vs. Oráculo”;
11. pausa de recuperação ativa “Feche o notebook por 30 segundos”;
12. ciclo interativo de doze etapas;
13. ciclo em carrossel para mobile;
14. ciclo em lista textual acessível;
15. accordions de Referências, Nota editorial e Auditoria;
16. modo de leitura simples;
17. toggle de animações não essenciais;
18. SEO técnico e editorial;
19. metadados de compartilhamento;
20. instrumentação analítica sem coleta invasiva;
21. testes de acessibilidade, performance, navegação e conteúdo;
22. documentação de componentes e decisões para manutenção por agentes.

---

## 4. Modelo de conteúdo

O conteúdo deve ser modelado separadamente da camada visual. O artigo não deve ser codificado como uma única string de HTML difícil de atualizar.

### 4.1 Estrutura semântica

```text
Article
├── Metadata
├── Hero
├── ExecutiveSummary
├── ReadingProgress
├── Section: Fluxo
├── Section: Fricção
├── DistinctionCallout: informação_conhecimento
├── Section: Pergunta
├── Section: Julgamento
├── DistinctionCallout: acesso_compreensão
├── BancadaVsOraculo
├── Section: Verificação
├── RecoveryPractice
├── DistinctionCallout: reconhecimento_dominio
├── Section: Externalização
├── EpistemicMarkers
├── CycleExplorer
├── CognitiveEcosystem
├── ClosingReflection
├── Accordion: Referências
├── Accordion: Nota editorial
└── Accordion: Auditoria
```

### 4.2 Seções narrativas

| ID | Rótulo de navegação | Título editorial | Função |
|---|---|---|---|
| `fluxo` | Fluxo | Informação que passa, conhecimento que fica | Apresentar o problema do consumo fragmentado |
| `friccao` | Fricção | Quando algo rompe o fluxo | Mostrar o surgimento da curiosidade |
| `pergunta` | Pergunta | A pergunta muda o jogo | Converter impressão em objetivo |
| `julgamento` | Julgamento | Investigar ficou barato. Julgar continua caro | Diferenciar operação e discernimento |
| `bancada` | Bancada | A máquina entra na oficina — não no trono | Explicar o papel da IA |
| `verificacao` | Verificação | O paradoxo da velocidade | Expor familiaridade sem domínio |
| `explicacao` | Explicação | O teste da explicação | Recuperação ativa e autoexplicação |
| `publicacao` | Publicação | Tornar explícito / Compartilhar não é validar | Externalizar sem confundir audiência e verdade |
| `ciclo` | Ciclo | O ciclo continua | Representar o processo iterativo |
| `ecossistema` | Ecossistema | O ecossistema cognitivo | Integrar ferramentas e disciplina |
| `aprendizado` | Aprendizado | O que aprendi, até agora | Fechar com síntese e nova pergunta |

### 4.3 Metadados de status epistemológico

Cada bloco de conteúdo pode receber, quando necessário, um campo de classificação:

```json
{
  "epistemicStatus": "literature | experience | interpretation | open-hypothesis | none",
  "sourceRefs": [1, 5],
  "showLabel": true,
  "labelText": "LITERATURA"
}
```

O campo `showLabel` deve ser definido editorialmente. O sistema não deve rotular automaticamente todos os parágrafos.

---

## 5. Arquitetura de informação e navegação

### 5.1 Barra superior

A barra superior permanece fixa, com altura aproximada de 56 px no mobile e 64 px no desktop.

**Elementos desktop:**

- identificação curta da publicação;
- indicador de progresso de leitura de 0 a 100%;
- controle `Aa` para preferências tipográficas;
- controle de modo de leitura simples;
- botão de menu ou índice, quando necessário.

**Elementos mobile:**

- botão de menu;
- etapa atual, por exemplo `ETAPA 04 · JULGAMENTO`;
- progresso circular ou linear compacto;
- controle de preferências.

A barra não deve cobrir títulos quando o usuário navega por âncoras. Usar `scroll-margin-top` compatível com a altura da barra.

### 5.2 Índice sticky desktop

O índice fica fixado a aproximadamente 96 px do topo e ocupa cerca de 220 px. Deve mostrar os onze marcos da estrutura, mas com baixa ênfase visual.

**Estados:**

- `idle`: todos os itens em baixa intensidade;
- `active`: item atual com ponto preenchido e texto mais escuro;
- `visited`: item já percorrido com linha de progresso discreta;
- `hover/focus`: contorno visível e aumento moderado de contraste.

A seção atual deve ser calculada com `IntersectionObserver`, com limiar ajustado para que o estado não oscile entre duas seções durante transições curtas.

### 5.3 Índice mobile

No mobile, o índice lateral não deve ficar permanentemente aberto. A barra mostra apenas a etapa atual. O toque abre um bottom sheet com:

- lista completa de etapas;
- progresso atual;
- botão `Fechar índice`;
- possibilidade de voltar ao topo.

O bottom sheet deve ser navegável por teclado quando acessado em viewport estreita e deve devolver o foco ao botão que o abriu.

### 5.4 Trilho de apoio

O trilho direito é opcional, colapsável e desaparece abaixo de 1180 px. Ele pode conter:

- conceito relacionado;
- fonte citada;
- marcador epistemológico;
- nota de contexto;
- ligação para a auditoria.

O trilho deve ter um botão explícito `Ocultar apoio`. O estado pode ser persistido localmente. O artigo deve permanecer plenamente compreensível com o trilho fechado.

---

## 6. Layout responsivo

### 6.1 Desktop largo

- largura de referência: 1440 px;
- margem externa: 64 px;
- grade: 12 colunas;
- coluna de leitura: 680 px;
- índice: aproximadamente 220 px;
- trilho: aproximadamente 260 px;
- corpo: 19 px com line-height aproximado de 1.65;
- largura máxima do artigo: aproximadamente 1180 px, excluindo margens.

### 6.2 Tablet

- índice pode permanecer sticky, mas com largura reduzida;
- trilho lateral deve ser fechado por padrão;
- corpo entre 18 e 19 px;
- callouts devem ocupar a largura principal;
- ciclo deve usar o mesmo componente desktop com escala reduzida, desde que a legibilidade seja mantida.

### 6.3 Mobile

- viewport de referência: 390 px;
- margem horizontal: 20 px;
- corpo: 18 px, line-height 1.65;
- título: aproximadamente 43 px, com `clamp()`;
- largura de linha: 46–60 caracteres;
- callouts em largura total;
- ciclo em carrossel ou arco vertical;
- interação Bancada vs. Oráculo linear por padrão;
- accordions com área de toque mínima de 48 px.

---

## 7. Direção visual

### 7.1 Paleta

| Token | Hex | Uso principal |
|---|---|---|
| `ink-900` | `#12232B` | Hero, superfícies escuras e texto invertido |
| `paper-50` | `#F7F4ED` | Fundo principal de leitura |
| `paper-100` | `#EFEAE0` | Respiros, áreas de apoio e divisores suaves |
| `feed-blue` | `#253F4B` | Fluxo inicial e ambiente do feed |
| `amber-signal` | `#B56F16` | Acento com contraste seguro, foco e fricção |
| `mist-teal` | `#DCEBE7` | Investigação e bancada |
| `teal-700` | `#28655F` | Estados ativos e verificação |
| `lavender-quiet` | `#E7E4EC` | Explicação e publicação |
| `violet-700` | `#665C7A` | Reconhecimento versus domínio |
| `ink-500` | `#607078` | Metadados e texto secundário |
| `line` | `#D4CEC2` | Bordas e separadores |

O âmbar deve ser escurecido para uso em texto ou elementos que dependam de contraste. O valor claro `#F0B45B` pode ser usado como preenchimento decorativo sobre fundo escuro, mas não como texto pequeno sobre papel.

### 7.2 Transição cromática

A mudança de cor deve ocorrer por seções, com transições suaves de fundo:

1. `ink-900` e `feed-blue` no hero e primeiro ato;
2. `paper-50` durante fricção e pergunta;
3. `mist-teal` na investigação e bancada;
4. `paper-50` na verificação;
5. `lavender-quiet` na externalização;
6. retorno a `mist-teal` e âmbar no ciclo final.

As transições não devem causar flashes, alterar contraste de texto durante a leitura ou modificar a cor de fundo em resposta a cada pixel de scroll.

### 7.3 Tipografia

Recomenda-se:

- títulos e blockquotes: Newsreader ou Fraunces;
- corpo e interface: Inter ou IBM Plex Sans;
- metadados: sans-serif com tracking moderado.

A fonte precisa ter fallback adequado, carregamento otimizado e comportamento estável durante a troca. Usar `font-display: swap` e evitar mudança brusca de layout.

---

## 8. Componentes e requisitos funcionais

### 8.1 Hero editorial

**Objetivo:** representar a passagem do ruído do feed para a atenção concentrada.

**Conteúdo:**

- etiqueta `FEED → FRICÇÃO → PERGUNTA`;
- título completo;
- linha fina;
- autoria;
- tempo estimado de leitura;
- controle `Começar a leitura`.

**Comportamento:**

- partículas e linhas abstratas movem-se lentamente;
- ao entrar na página, o título aparece com transição suave;
- ao rolar, os sinais perdem velocidade e opacidade;
- com redução de movimento, os sinais permanecem estáticos ou são removidos;
- nenhum texto fictício legível deve ser usado como decoração.

### 8.2 Callout de distinção

O componente aceita `variant`:

```text
information-knowledge
access-understanding
recognition-mastery
```

Cada variante possui título, frase de apoio, acento, ícone e, opcionalmente, CTA de reflexão.

**Requisitos:**

- sem depender apenas de cor;
- leitura integral no DOM;
- responsivo;
- entrada por opacidade e deslocamento mínimo;
- não mais que uma distinção dominante por trecho de leitura.

### 8.3 Blockquote editorial

O blockquote deve usar semântica `<blockquote>` e atribuição. Pode ser destacado por linha lateral, fundo e tipografia maior. A animação não deve fazer a citação aparecer depois do leitor já ter passado por ela em conexão lenta.

### 8.4 Marcador epistemológico

O marcador aparece como etiqueta e pode abrir uma nota contextual. Deve haver texto visível, não apenas ícone ou cor.

**Exemplo:**

```text
[LITERATURA] A prática de recuperação tende a produzir retenção mais duradoura...
```

No mobile, a etiqueta pode abrir um popover ou bloco expansível abaixo do parágrafo. O foco deve permanecer previsível.

### 8.5 Bancada vs. Oráculo

Esta é a interação principal da página.

#### Estado inicial

Mostrar três cartões de fonte:

- documentação técnica;
- artigo ou paper;
- vídeo ou transcrição.

Cada cartão possui título curto, tipo de fonte e indicador de seleção.

#### Fluxo completo

1. selecionar uma ou mais fontes;
2. mover as fontes para a bancada por arrastar, toque ou teclado;
3. visualizar a pergunta-guia;
4. escolher `comparar`, `localizar passagem` ou `verificar na fonte original`;
5. exibir resultado intermediário com trechos de apoio;
6. apresentar uma síntese curta rotulada `RASCUNHO PARA JULGAMENTO`;
7. pedir ao usuário que identifique o que permanece como hipótese;
8. exibir mensagem final: `A ferramenta organizou o material. O julgamento continua sendo seu.`

#### Interação por arrastar

Disponível em desktop como enriquecimento. Deve possuir:

- alvos de arraste visíveis;
- estado de foco equivalente;
- suporte a teclado;
- feedback de sucesso não baseado apenas em movimento;
- fallback de seleção por clique.

#### Interação linear

Obrigatória e disponível em todos os dispositivos. O usuário pode simplesmente clicar em `Adicionar fonte`, `Comparar`, `Verificar` e `Continuar`.

#### Estado Oráculo

O componente pode oferecer um painel comparativo opcional:

| Modo bancada | Modo oráculo |
|---|---|
| fontes selecionadas | resposta imediata |
| pergunta explícita | pergunta implícita |
| trechos verificáveis | síntese sem trilha inicial |
| rascunho para julgamento | aparência de resposta final |
| hipótese visível | incerteza ocultada |

O modo oráculo não deve ser apresentado como “errado” de forma moralizante. O objetivo é tornar visível a diferença de processo.

### 8.6 Pausa de recuperação ativa

Inserir um componente na seção “O teste da explicação”.

**Texto inicial:** `Feche o notebook por 30 segundos.`

**Ação:** `Tentar explicar`.

**Perguntas exibidas:**

- Quais são as partes envolvidas?
- Que estado muda?
- Por qual mecanismo?
- O que a fonte mostra?
- O que você está apenas presumindo?

Não deve haver pontuação, ranking ou penalização. A resposta pode ser digitada localmente e descartada pelo usuário. Não armazenar o texto sem consentimento explícito.

### 8.7 Ciclo interativo de doze etapas

O ciclo representa:

1. exposição a uma informação;
2. curiosidade;
3. pergunta;
4. investigação;
5. curadoria de fontes;
6. confronto de perspectivas;
7. síntese;
8. reflexão sobre a compreensão;
9. explicação;
10. externalização;
11. compartilhamento;
12. feedback.

#### Desktop

Usar anel ou caminho circular com nós numerados. O scroll ativa um nó por vez. O texto da etapa atual aparece em uma área complementar. A legenda deve informar que se trata de **modelo interpretativo da prática descrita**.

#### Mobile

Usar carrossel ou arco vertical com:

- etapa atual em destaque;
- indicador `3 de 12`;
- controles anterior/próxima;
- gesto de toque opcional;
- lista textual alternativa sempre disponível.

#### Versão acessível em lista

A lista deve usar uma estrutura semântica ordenada e reproduzir o conteúdo de todas as etapas. Ela pode ser exibida abaixo do componente ou aberta com `Ver ciclo em lista`.

#### Retorno visual

Após `feedback`, uma linha ou seta deve retornar à curiosidade. O retorno deve ser visualmente aberto, não uma seta que sugira infinitude comprovada.

### 8.8 Accordions

Accordions obrigatórios:

- Referências;
- Nota editorial;
- Auditoria.

**Requisitos:**

- fechados por padrão;
- `<button>` real para o cabeçalho;
- `aria-expanded`;
- `aria-controls`;
- foco visível;
- conteúdo presente no DOM;
- animação interrompível;
- abertura preservada durante a sessão, se o usuário navegar para outra âncora;
- nenhum conteúdo essencial deve existir apenas no estado fechado sem indicação de sua presença.

### 8.9 Modo de leitura simples

O usuário deve poder ativar um modo que:

- remove partículas e animações não essenciais;
- fecha o trilho de apoio;
- reduz elementos decorativos;
- preserva índice, progresso, callouts e conteúdo;
- mantém a interação Bancada disponível em versão linear;
- transforma o ciclo em lista textual ou modo estático.

O controle deve ter estado persistente localmente e rótulo claro: `Modo de leitura simples: ligado/desligado`.

### 8.10 Controle de animação

Além de respeitar `prefers-reduced-motion`, oferecer um toggle manual: `Animações: ligadas/desligadas`. Quando desligado, usar apenas transições instantâneas ou mudanças de estado discretas.

---

## 9. Animação e scroll

### 9.1 Regras gerais

- usar animação para orientar, não para decorar;
- preferir entrada progressiva a movimento contínuo;
- evitar parallax intenso;
- não animar o corpo do texto durante leitura;
- interromper animações fora da viewport;
- manter transições entre 250 e 700 ms;
- respeitar `prefers-reduced-motion` e toggle manual;
- evitar dependência de smooth scroll para navegação básica.

### 9.2 Stack sugerida

| Necessidade | Solução |
|---|---|
| Ativação por scroll | GSAP ScrollTrigger ou IntersectionObserver com CSS |
| Ciclo vetorial | SVG nativo ou D3.js |
| Microanimações vetoriais | Lottie, somente quando o peso justificar |
| Ícones | Lucide ou Phosphor |
| Smooth scroll opcional | Lenis, desativável |
| Testes de acessibilidade | axe-core, Lighthouse e testes manuais |

A implementação deve preferir CSS e APIs nativas para efeitos simples. GSAP e Lottie só devem ser carregados quando necessários, idealmente de forma modular ou sob demanda.

---

## 10. Acessibilidade

### 10.1 Requisitos de conteúdo

- um único H1;
- headings em ordem hierárquica;
- linguagem clara nos controles;
- texto alternativo para elementos visuais relevantes;
- descrição textual do ciclo;
- blockquotes com atribuição;
- links com destino compreensível;
- nenhuma informação comunicada somente por cor.

### 10.2 Teclado

Todos os elementos interativos devem ser acessíveis por teclado:

- índice;
- bottom sheet;
- trilho colapsável;
- Bancada vs. Oráculo;
- ciclo;
- accordions;
- modo de leitura;
- controle de animações.

Definir ordem de foco previsível. O foco nunca deve desaparecer ao abrir um modal, popover ou bottom sheet.

### 10.3 Leitores de tela

O ciclo deve possuir versão em lista. O componente Bancada deve anunciar estados como:

- `Fonte selecionada`;
- `Fonte adicionada à bancada`;
- `Etapa 2 de 4: escolha uma ação`;
- `Síntese disponível para julgamento`.

Não usar `aria-live` em excesso. Anunciar somente mudanças relevantes.

### 10.4 Contraste e zoom

Validar contraste com ferramenta automatizada e inspeção manual. Testar zoom de 200% sem perda de conteúdo ou sobreposição crítica. Validar leitura em modo de alto contraste quando possível.

### 10.5 Movimento

Com `prefers-reduced-motion: reduce`:

- remover partículas;
- remover parallax;
- substituir rotação do ciclo por mudança de foco;
- desativar smooth scroll;
- manter transições instantâneas ou muito breves;
- preservar a compreensão da sequência.

---

## 11. Performance

### 11.1 Metas

- carregamento inicial funcional em até 3 segundos em conexão 3G simulada;
- conteúdo principal disponível antes de scripts não essenciais;
- evitar bloqueio de interação durante carregamento;
- nenhuma animação contínua pesada em segundo plano;
- imagens e SVG dimensionados e comprimidos;
- fontes críticas limitadas.

### 11.2 Estratégias

- renderizar primeiro o conteúdo e a estrutura textual;
- carregar interações pesadas sob demanda;
- usar `loading="lazy"` para imagens fora da primeira dobra;
- interromper observers quando não forem mais necessários;
- evitar vídeo de fundo;
- não usar Lottie se uma animação CSS ou SVG simples resolver;
- testar em desktop, mobile médio e dispositivo de baixo desempenho;
- preservar funcionalidade quando JavaScript falhar parcialmente.

### 11.3 Degradação progressiva

Sem JavaScript, a página deve continuar apresentando:

- artigo completo;
- headings;
- navegação por âncoras;
- referências;
- nota editorial;
- auditoria;
- ciclo em lista;
- conteúdo das distinções.

---

## 12. SEO e compartilhamento

### 12.1 Metadados

**Title:**

`Quando a curiosidade deixa de ser conteúdo e vira investigação`

**Meta description sugerida:**

`Um ensaio sobre transformar informação em pergunta, fontes em explicação e curiosidade em conhecimento — com a IA como bancada de trabalho, não como oráculo.`

### 12.2 Estrutura semântica

- `<article>` para o conteúdo principal;
- `<header>` para hero e metadados;
- `<nav aria-label="Índice do artigo">` para navegação;
- `<main>` para a leitura;
- `<aside>` para o trilho de apoio;
- `<footer>` para anexos e compartilhamento;
- headings rastreáveis;
- dados estruturados de artigo, quando adequados.

### 12.3 Open Graph

Criar imagem de compartilhamento com:

- título curto;
- fundo papel/azul profundo;
- linha visual feed → pergunta;
- alto contraste;
- dimensão recomendada de 1200 × 630 px.

Também definir `og:title`, `og:description`, `og:image`, `og:type`, `twitter:card` e URL canônica.

### 12.4 Compartilhamento

O compartilhamento deve ser discreto e não interromper a leitura. Oferecer:

- copiar URL;
- compartilhar trecho, quando tecnicamente adequado;
- abrir rede social por ação explícita.

Não usar pop-ups invasivos ou pedir compartilhamento antes do conteúdo principal.

---

## 13. Instrumentação e privacidade

A instrumentação deve medir qualidade de leitura, não criar vigilância excessiva.

### Eventos sugeridos

| Evento | Finalidade |
|---|---|
| `article_started` | saber se o hero levou à leitura |
| `section_reached` | medir progressão por marcos |
| `distinction_viewed` | verificar exposição às três distinções |
| `bancada_started` | medir descoberta da interação |
| `bancada_completed` | identificar conclusão do fluxo |
| `cycle_viewed` | saber se o ciclo foi alcançado |
| `cycle_mode_changed` | comparar anel, carrossel e lista |
| `accordion_opened` | entender uso dos anexos |
| `simple_mode_enabled` | observar necessidade de redução de estímulos |
| `share_clicked` | medir compartilhamento explícito |

Não armazenar texto digitado na pausa de recuperação. Respeitar consentimento, legislação aplicável, configurações de privacidade e preferências de rastreamento.

---

## 14. Estratégia de desenvolvimento agêntico

O desenvolvimento deve ser executado por agentes especializados, coordenados por um agente principal. Cada agente deve produzir artefatos verificáveis, registrar decisões e evitar alterações fora de seu escopo.

### 14.1 Agente orquestrador

Responsabilidades:

- manter o backlog e a ordem das etapas;
- garantir que o conteúdo do artigo não seja alterado sem autorização editorial;
- integrar os componentes;
- resolver conflitos entre visual, acessibilidade e performance;
- executar validação final;
- manter um registro de decisões.

### 14.2 Agente de conteúdo e semântica

Responsabilidades:

- estruturar o artigo em seções e componentes;
- preservar textos, referências e nota editorial;
- marcar status epistemológico conforme a validação;
- preparar headings, legendas, labels e textos alternativos;
- produzir a versão textual do ciclo.

**Saída obrigatória:** modelo de conteúdo validado e mapa de âncoras.

### 14.3 Agente de sistema visual

Responsabilidades:

- implementar tokens de cor, tipografia, espaçamento e bordas;
- criar componentes de callout, blockquote, marcador e accordion;
- garantir responsividade;
- documentar estados visuais.

**Saída obrigatória:** biblioteca de componentes ou documentação equivalente.

### 14.4 Agente de interação

Responsabilidades:

- implementar hero, progresso e índice;
- implementar Bancada vs. Oráculo;
- implementar pausa de recuperação;
- implementar ciclo desktop, carrossel mobile e lista textual;
- garantir fallback sem arrastar.

**Saída obrigatória:** fluxos funcionais e mapa de estados.

### 14.5 Agente de acessibilidade

Responsabilidades:

- revisar semântica e landmarks;
- testar teclado e foco;
- validar ARIA;
- testar leitor de tela;
- revisar contraste, zoom e reduced motion;
- registrar problemas e severidade.

**Saída obrigatória:** relatório de conformidade e lista de correções.

### 14.6 Agente de performance e publicação

Responsabilidades:

- medir carregamento em 3G simulado;
- otimizar fontes, scripts, SVG e imagens;
- configurar metadados SEO e Open Graph;
- validar fallback sem JavaScript;
- preparar checklist de deploy.

**Saída obrigatória:** relatório de performance e checklist de publicação.

### 14.7 Agente de avaliação com usuários

Responsabilidades:

- testar com pelo menos cinco pessoas;
- incluir uma pessoa que utilize leitor de tela;
- observar desktop e mobile;
- avaliar compreensão do ciclo e da metáfora da bancada;
- registrar dúvidas, abandono e confusões.

**Saída obrigatória:** relatório de achados priorizados e recomendações de iteração.

---

## 15. Ordem recomendada de execução

### Fase 1 — Preparação

1. Ler o artigo-base e a validação.
2. Extrair o mapa de conteúdo sem alterar o texto.
3. Definir tokens visuais.
4. Definir estrutura de componentes.
5. Criar mapa de âncoras e eventos.

### Fase 2 — Estrutura sem animação

1. Implementar HTML semântico.
2. Implementar leitura completa.
3. Implementar índice, progresso e accordions.
4. Implementar modo simples.
5. Implementar ciclo em lista.
6. Validar navegação sem JavaScript completo.

### Fase 3 — Sistema visual

1. Aplicar tipografia.
2. Aplicar paleta e transições cromáticas.
3. Criar callouts.
4. Criar blockquotes.
5. Criar marcadores epistemológicos.
6. Ajustar desktop, tablet e mobile.

### Fase 4 — Interações

1. Hero e partículas controladas.
2. Índice com atualização por scroll.
3. Bancada linear.
4. Bancada por arrastar e teclado.
5. Pausa de recuperação.
6. Ciclo com anel desktop.
7. Ciclo com carrossel mobile.
8. Alternância entre modo visual e lista.

### Fase 5 — Qualidade

1. Testar acessibilidade.
2. Testar performance.
3. Testar fallback.
4. Testar SEO.
5. Testar compartilhamento.
6. Testar dispositivos reais.
7. Corrigir problemas críticos.

### Fase 6 — Validação com usuários

Realizar testes com pelo menos cinco participantes, incluindo:

- leitor acostumado a textos longos;
- usuário mobile;
- usuário de leitor de tela;
- usuário que não conheça a metáfora de andaime cognitivo;
- usuário que navegue rapidamente por títulos e índice.

### Fase 7 — Publicação e monitoramento

1. Publicar com métricas consentidas.
2. Monitorar profundidade de scroll, conclusão, interações e accordions.
3. Coletar feedback qualitativo.
4. Registrar problemas pós-publicação.
5. Iterar sem comprometer o conteúdo original.

---

## 16. Estados e critérios de aceite

### 16.1 Leitura e navegação

- [ ] O artigo inteiro está disponível em HTML semântico.
- [ ] O H1 aparece uma única vez.
- [ ] O índice desktop acompanha a seção atual.
- [ ] O índice mobile abre e fecha corretamente.
- [ ] O foco retorna ao controle que abriu o índice.
- [ ] O progresso não depende apenas de cor.
- [ ] Âncoras não ficam escondidas pela barra fixa.

### 16.2 Distinções e citações

- [ ] As três distinções aparecem como componentes visualmente consistentes.
- [ ] Cada componente é compreensível sem cor.
- [ ] Blockquotes usam semântica correta.
- [ ] As animações de entrada podem ser desativadas.

### 16.3 Bancada vs. Oráculo

- [ ] Existe fluxo por clique.
- [ ] Existe fluxo por teclado.
- [ ] O arrastar é opcional.
- [ ] O estado de cada fonte é anunciado.
- [ ] A síntese é rotulada como rascunho.
- [ ] A incerteza permanece visível.
- [ ] O componente funciona em desktop e mobile.
- [ ] Existe versão linear para leitores de tela.

### 16.4 Ciclo

- [ ] As doze etapas aparecem na ordem correta.
- [ ] Os nós estão numerados.
- [ ] O anel desktop possui legenda textual.
- [ ] O mobile informa posição, como `3 de 12`.
- [ ] Existe lista textual acessível.
- [ ] A descrição informa que o ciclo é um modelo interpretativo.

### 16.5 Accordions

- [ ] Referências, Nota editorial e Auditoria estão fechados inicialmente.
- [ ] Cada botão possui `aria-expanded`.
- [ ] Cada painel possui relação `aria-controls`.
- [ ] O conteúdo continua acessível sem animação.
- [ ] O teclado consegue abrir e fechar os painéis.

### 16.6 Modo simples e movimento

- [ ] O modo de leitura simples fecha trilho e remove efeitos não essenciais.
- [ ] O toggle de animação é persistente durante a sessão.
- [ ] `prefers-reduced-motion` é respeitado.
- [ ] O conteúdo permanece compreensível sem movimento.

### 16.7 Performance

- [ ] A página inicia leitura em até 3 segundos em 3G simulado.
- [ ] Não há vídeo de fundo.
- [ ] Scripts de interação pesada são carregados sob demanda.
- [ ] Animações fora da viewport são interrompidas.
- [ ] A página funciona em dispositivo de baixo desempenho.

### 16.8 Publicação

- [ ] Title, description e URL canônica estão definidos.
- [ ] Open Graph e Twitter Cards estão configurados.
- [ ] Imagem de compartilhamento está disponível.
- [ ] Headings são rastreáveis.
- [ ] O conteúdo tem estrutura de artigo adequada.
- [ ] O compartilhamento ocorre por ação explícita.

---

## 17. Plano de testes

### 17.1 Testes automatizados

- lint e formatação;
- testes de componentes;
- testes de navegação;
- validação de atributos ARIA;
- axe-core;
- Lighthouse;
- teste de links quebrados;
- validação de metadados.

### 17.2 Testes manuais

- teclado sem mouse;
- VoiceOver ou TalkBack;
- zoom a 200%;
- modo de alto contraste;
- `prefers-reduced-motion`;
- rede 3G simulada;
- viewport 320 px, 390 px, 768 px, 1024 px, 1440 px;
- orientação portrait e landscape;
- falha parcial de JavaScript.

### 17.3 Teste de compreensão

Fazer uma reavaliação questionando:

1. Qual é a diferença entre informação e conhecimento?
2. Qual é o papel da IA na bancada?
3. O ciclo apresentado é um fato científico validado?
4. Como o leitor chega ao modo de lista do ciclo?
5. O que significa “fechar o notebook e explicar”?

A interface deve permitir responder sem que o usuário precise memorizar instruções escondidas.

---

## 18. Conteúdo inicial para controles

| Controle | Texto |
|---|---|
| Iniciar | Começar a leitura |
| Índice | Abrir índice |
| Apoio | Mostrar apoio |
| Trilho | Ocultar apoio |
| Modo simples | Ativar modo de leitura simples |
| Animação | Desligar animações |
| Bancada | Colocar na bancada |
| Comparar | Comparar fontes |
| Verificar | Verificar na fonte original |
| Síntese | Ver rascunho para julgamento |
| Ciclo | Ver ciclo em lista |
| Recuperação | Tentar explicar |
| Accordions | Abrir referências / nota editorial / auditoria |
| Final | Voltar ao topo |

---

## 19. Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| Excesso de componentes | Alto | trilho colapsável, modo simples, hierarquia de pausas |
| Interação difícil de descobrir | Médio | instrução curta, fluxo por clique, primeira etapa guiada |
| Arrastar inacessível | Alto | teclado, toque e versão linear |
| Ciclo ilegível no mobile | Alto | carrossel, `3 de 12`, lista textual |
| Contraste insuficiente | Alto | âmbar escurecido e validação automatizada |
| Performance baixa | Alto | carregamento sob demanda, SVG leve, interrupção fora da viewport |
| Leitura parecendo produto de IA | Médio | baixa saturação, tom editorial, efeitos discretos |
| Confusão entre hipótese e fato | Alto | subtítulo do ciclo e marcadores epistemológicos |
| Dependência excessiva de JavaScript | Alto | conteúdo semântico e fallback em HTML |
| Atualização difícil | Médio | conteúdo separado da apresentação e documentação de agentes |

---

## 20. Entregáveis técnicos esperados

1. aplicação web responsiva publicada ou pronta para publicação;
2. conteúdo do artigo separado em estrutura editável;
3. biblioteca de componentes;
4. tokens de design;
5. implementação desktop e mobile;
6. Bancada vs. Oráculo em fluxo completo e linear;
7. ciclo em anel, carrossel e lista;
8. modo de leitura simples;
9. documentação de acessibilidade;
10. relatório de performance;
11. configuração SEO e compartilhamento;
12. plano de instrumentação;
13. relatório de testes com usuários;
14. registro de decisões e limitações;
15. checklist final de publicação.

---

## 21. Definição de pronto

O trabalho pode ser considerado concluído quando:

- todos os critérios de aceite estiverem atendidos;
- o artigo estiver disponível integralmente e sem perda de semântica;
- a experiência visual funcionar em desktop e mobile;
- o leitor puder escolher entre experiência interativa e leitura simples;
- Bancada, ciclo e accordions tiverem alternativas acessíveis;
- os testes automatizados e manuais não apresentarem bloqueios críticos;
- o carregamento for aceitável em 3G simulado;
- SEO e compartilhamento estiverem configurados;
- os problemas encontrados estiverem documentados e priorizados;
- a equipe souber quais partes são conteúdo, quais são design e quais são comportamento;
- qualquer agente futuro conseguir continuar o trabalho a partir desta especificação sem reconstruir o contexto do projeto.

---

## 22. Referências

[1]: /home/ubuntu/upload/artigo_curiosidade_investigacao.md "Artigo-base: Quando a curiosidade deixa de ser conteúdo e vira investigação"
[2]: /home/ubuntu/upload/pasted_content.txt "Validação da proposta de design para apresentação e publicação"
[3]: https://www.w3.org/TR/WCAG22/ "Web Content Accessibility Guidelines 2.2"
[4]: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ "GSAP ScrollTrigger documentation"
[5]: https://airbnb.io/lottie/ "Lottie documentation"
[6]: https://d3js.org/ "D3.js documentation"
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API "Intersection Observer API"
[8]: https://ogp.me/ "The Open Graph protocol"
