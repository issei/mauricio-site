# Acessibilidade como requisito de engenharia

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/acessibilidade>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-10-06 · Atualizado: 2026-10-06.

## Em síntese

O protocolo **A11Y.md** entrou no repositório como contexto dos agentes de IA que escrevem o código, e a acessibilidade passou a ser medida a cada pull request por uma **catraca**: uma medição automática que reprova qualquer mudança que aumente a contagem de falhas. A página mostra o fluxo, o código de cada mudança e o que **ninguém verificou**: o relatório do site está em **CONDICIONAL**, porque a aprovação depende de testes que só pessoas podem fazer.

- **Medição** — a primeira varredura completa achou 207 ocorrências em 36 páginas; fora das 7 páginas utilitárias com exceção registrada, as ocorrências detectáveis pelo gate automatizado chegaram a zero. Isso não significa ausência de barreiras, e o estudo não isola o efeito do A11Y.md.
- **Revisão independente** — um agente de IA em contexto novo achou falhas que a catraca verde não via; uma segunda auditoria, feita no mesmo trabalho que corrigiu os achados, achou outras, como um exercício impossível de concluir sem mouse. Nenhuma avaliação humana independente foi feita.
- **Limite** — nenhuma pessoa testou o site com leitor de tela, controle por voz ou Safari; o relatório declara o nível de independência mais baixo, *self-reported*.

## Conteúdo completo da página

Case · Acessibilidade · WCAG 2.2

### Acessibilidade como requisito de engenharia

Como o A11Y.md foi incorporado ao desenvolvimento deste site — e o que mudou no resultado.

1. A11Y.md
2. Desenvolvimento com agentes
3. Validação
4. Resultado

Esta página não afirma que o site é acessível. Ela mostra o processo usado, o que foi medido, por quem, e o que ainda não foi verificado. Os fatos citados apontam para um arquivo ou commit do repositório público; o que é inferência está marcado como tal.

O zero do segundo item vale para as regras WCAG do axe, medidas a 1280 px e sem o conteúdo de iframes de terceiros (como o player do YouTube), e para as sondas de estrutura, de largura mínima, de movimento e de espaçamento. Isso não significa ausência de barreiras de acessibilidade: é só o resultado das verificações automatizadas executadas nessas condições. Não cobre o que exige verificação humana. Detalhes em Resultado e Limites.

Ver o fluxo real Ver as mudanças no código Ver o que não foi verificado

01 · O problema

#### Uma interface pode passar no teste e ainda bloquear alguém

Interfaces atuais acumulam animação, componentes feitos sob medida, conteúdo que só aparece com JavaScript e interações pensadas para o mouse. Cada camada é um lugar onde o teclado, o leitor de tela ou o zoom podem falhar sem que quem desenvolve perceba.

##### O que existia antes

Fato Antes do trabalho descrito aqui, o site já rodava o **axe** — um motor aberto que testa uma página contra as regras automatizáveis da WCAG, as diretrizes de acessibilidade do W3C — no **CI**, o sistema que executa os testes automaticamente a cada mudança. Mas só em 14 das 41 páginas, e sem os critérios da WCAG 2.2.

Quando a medição passou a cobrir todas as páginas, sobre o build de produção (a versão compilada que vai ao ar), encontrou **207 ocorrências em 36 páginas**, cerca de 128 delas de texto com contraste abaixo do mínimo. A leitura do código achou ainda problemas que nenhuma regra automática apontava. Exemplo: um modal de cookies que se anunciava como modal para o leitor de tela, mas não levava o foco para dentro dele.

Evidência: [auditoria inicial (accessibility-audit.md)](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/docs/specs/a11y-first/accessibility-audit.md), achado G-01 · [commit a5ef956](https://github.com/issei/mauricio-site/commit/a5ef956177d4cf5f88f739d33bc7b3b55c6aa8f6).

##### Onde a IA entra

Fato Até 2026-10-05, 162 dos 352 commits do repositório registram coautoria de um modelo Claude (161 dos 265 que não são de merge). Todos os commits do trabalho de acessibilidade, exceto os de merge, têm essa coautoria, com os modelos Sonnet 5.5 e Opus 5.5, via Claude Code. A configuração fica na pasta `.claude/` do repositório.

Para reproduzir: `git log da61b0a --format=%H%n%B` e contar os commits com a linha `Co-Authored-By: Claude`.

Inferência Um agente produz o que o contexto pede. Se o contexto não fala de foco, contraste ou leitor de tela, nada garante que o código trate disso. Por isso a premissa do trabalho: o requisito de acessibilidade precisa estar no contexto que orienta o agente, e não só numa revisão depois. Esta premissa não foi medida neste projeto; ela justificou a decisão da próxima seção.

02 · A decisão

#### Adotar o A11Y.md como contexto do agente

[A11Y.md](https://fecarrico.github.io/a11ymd/) é um padrão aberto (licença MIT), mantido por Felipe A. Carriço, escrito para ser lido por agentes de IA que geram interface. A versão usada aqui é a 2.2.0, que tem como alvo a WCAG 2.2 nível AA.

##### O que o A11Y.md oferece

###### Contrato de comportamento

Regras para o agente: não supor acessibilidade sem evidência no código, propor um elemento nativo em vez de uma div clicável, explicar o custo de cada escolha.

###### Perfil de conformidade

Três níveis: Shield (AAA), Standard (AA) e Launchpad (A). Na WCAG, A é o mínimo e AAA o mais exigente. Este site usa o Standard.

###### Carga sob demanda

Um arquivo principal e guias por componente (modal, abas, formulário, mídia), lidos só quando a tarefa envolve aquele componente.

###### Memória de decisões e exceções

`A11Y-DECISIONS.md` guarda escolhas entre alternativas válidas. `EXCEPTIONS.md` registra desvio aceito, com dono e data de revisão.

###### Relatório de entrega

`REPORT.md` preenchido a partir de um template: o que foi verificado, o que falhou e o que ninguém verificou.

###### Verificação independente

Quem escreveu o código não pode ser o único a atestar que ele está conforme. O relatório declara o nível de independência da verificação. Se o único verificador for quem escreveu o código (*self-reported*), o relatório não pode ser aprovado.

##### Como o padrão entrou no repositório

Fato A especificação de arquitetura comparou três formas: apontar para o arquivo remoto, copiar uma versão fixa ou integrar tudo, inclusive as ferramentas em Python. A escolhida, aprovada pelo dono do site em 2026-10-03, foi a cópia fixa: os arquivos ficam em `docs/a11y/`, presos a um commit do repositório original (`069e213`) e sem edição local. Ajustes da casa vão para os arquivos de decisões e exceções, nunca para a cópia.

O arquivo principal não é carregado em toda conversa do agente: 41 KB custariam cerca de 10 mil tokens (a unidade em que o modelo mede o texto que lê) por sessão, inclusive em tarefas sem relação com a interface. Em vez disso, o `AGENTS.md` — as instruções que todo agente lê neste repositório — tem uma regra condicional (trecho do arquivo, sem a formatação Markdown):

```
Ao criar ou editar UI (src/**/*.html|css, src/js/**), aplique
docs/a11y/A11Y.md e carregue só o guia do componente
em docs/a11y/references/ — não o diretório inteiro.
```

O A11Y.md traz também um verificador escrito em Python, o `verify-a11y.py`. Por ser código de outro autor, ele foi lido antes de ser executado, e só rodou depois de aprovado.

Evidência: [architecture.md, seção 2](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/docs/specs/a11y-first/architecture.md) · [procedência da cópia (UPSTREAM.md)](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/docs/a11y/UPSTREAM.md) · [AGENTS.md](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/AGENTS.md).

03 · Como foi implementado

#### O fluxo real, do protocolo ao gate

O resumo "requisito, contexto, código, validação" é mais linear do que o que aconteceu. Houve nove etapas entre 2026-10-03 e 2026-10-05, e várias delas acharam falhas que as anteriores tinham deixado passar.

1. ### Protocolo como fonte
  Cópia fixa do A11Y.md em `docs/a11y/`, com a procedência registrada.
  Evidência: [commit a5ef956](https://github.com/issei/mauricio-site/commit/a5ef956177d4cf5f88f739d33bc7b3b55c6aa8f6) (Fase 1).
2. ### Contexto do agente
  Uma regra no arquivo `AGENTS.md` vale para toda edição de interface. O subagente revisor do repositório, o `a11y-design-reviewer`, já existia; na auditoria v2 ele passou a conferir páginas contra o A11Y.md e a WCAG 2.2, em vez da WCAG 2.1.
  Evidência: [AGENTS.md](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/AGENTS.md) · [definição do subagente revisor](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/.claude/agents/a11y-design-reviewer.md), atualizada no [commit 37f22b7](https://github.com/issei/mauricio-site/commit/37f22b7f1521a2d33fcac533ba6879416bc06a8f).
3. ### Auditoria inicial
  axe sobre o build de produção nas 41 páginas em português, mais sondas próprias de teclado, largura de 320 px e movimento reduzido: 3 achados críticos, 8 altos, 4 médios e 1 de processo. Quatro temas ficaram como "não auditados", entre eles leitor de tela real e legendas.
  Evidência: [accessibility-audit.md, seção 2](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/docs/specs/a11y-first/accessibility-audit.md).
4. ### Catraca no gate
  O gate é a bateria de verificações que uma mudança precisa passar para ser aceita. Nele entrou um script que mede o build de produção, servido localmente, e compara com um arquivo de referência. Se uma contagem sobe, o gate falha. Se desce e ninguém registra o ganho, também falha. A dívida só pode diminuir.
  Evidência: [scripts/a11y-sweep.mjs](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/scripts/a11y-sweep.mjs) · [tests/a11y/baseline.json](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/tests/a11y/baseline.json).
5. ### Correção em cinco fases
  Contraste; consentimento de cookies; estrutura da página e link de salto; largura de 320 px e movimento; tarefas interativas. Da Fase 2 à Fase 5, cada uma baixou a referência da catraca. Na Fase 6 a medição foi ampliada e a contagem subiu de 34 para 38 (veja a tabela). Da terceira fase em diante, cada uma trouxe também testes de navegador novos.
  Evidência: [implementation-plan.md](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/docs/specs/a11y-first/implementation-plan.md) · [PR #81](https://github.com/issei/mauricio-site/pull/81).
6. ### Revisão independente por agente em contexto novo
  Um agente em contexto novo, numa sessão sem memória do trabalho anterior, que não leu as especificações, os testes nem o histórico do código, escreveu as próprias sondas (testes automáticos para este site) sobre 75 páginas e encontrou 4 falhas de gravidade alta que os testes existentes não viam. Uma delas: o banner de cookies cobria 29 das 131 paradas de Tab da página inicial. A revisão foi feita em contexto separado, mas continua sendo uma avaliação automatizada por IA e não substitui uma avaliação humana independente.
  Evidência: [verificacao-independente-fase7.md](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/docs/specs/a11y-first/verificacao-independente-fase7.md) · correções no [commit c9d085c](https://github.com/issei/mauricio-site/commit/c9d085ca97acfb240108a83628b9ea4c6d3a26d0).
7. ### Relatório e gate estático
  O relatório `REPORT.md` foi preenchido a partir do template do A11Y.md, com status CONDICIONAL. O verificador estático entrou no gate com um teto de erros que só pode diminuir.
  Evidência: [commit 31edc75](https://github.com/issei/mauricio-site/commit/31edc75d49fd7d35feb94d4fff00fde579b238da) · [PR #82](https://github.com/issei/mauricio-site/pull/82).
8. ### Achado externo
  Um scanner externo apontou 2 elementos cujo nome acessível não batia com o texto visível. A sonda escrita em seguida, sobre todas as páginas, achou 60 divergências em 46 páginas. No axe, a regra que detecta isso (label-content-name-mismatch) vem desligada por padrão.
  Evidência: [commit 6f6d01c](https://github.com/issei/mauricio-site/commit/6f6d01c969f21a32956ec7e0d64dd861acd8ac1c) · [PR #84](https://github.com/issei/mauricio-site/pull/84).
9. ### Auditoria v2
  A auditoria v2 mediu o que o relatório listava como "não medido", separando fato, inferência e hipótese. Ela não é independente: o mesmo trabalho que a escreveu corrigiu os achados. Entre outras falhas, achou um exercício do simulador [Operação Capital Cognitivo](https://mauricio.issei.com.br/operacao-capital-cognitivo) (OCC) que não podia ser concluído sem mouse e travava os capítulos seguintes. A catraca ganhou métricas novas: espaçamento de texto, conteúdo oculto sem JavaScript e regras de boas práticas do axe.
  Evidência: [auditoria-v2.md](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/docs/specs/a11y-first/auditoria-v2.md) · [PR #85](https://github.com/issei/mauricio-site/pull/85).

Hoje, todo pull request para a branch principal roda o gate completo no CI: catraca, verificador estático e testes Playwright em Chromium, Firefox e WebKit. O deploy, porém, não espera esse resultado (veja Limites). O gate impede que certas falhas avancem pelo fluxo protegido de desenvolvimento; isso não significa que toda regressão de acessibilidade esteja bloqueada antes de ir ao ar.

04 · O que mudou no código

#### Sete mudanças e o trecho de código de cada uma

Cada cartão segue o mesmo formato: problema, mudança, critério WCAG e evidência. Os trechos são linhas copiadas dos commits. Linhas com `-` saíram, linhas com `+` entraram, e `…` marca linhas omitidas.

##### Modal de cookies passa a ser um `<dialog>` nativo

**Problema**

O modal se anunciava como modal (`aria-modal`), mas não levava o foco para dentro, não o continha e não o devolvia ao fechar.

**Mudança**

O elemento nativo `<dialog>` com `showModal()`: o navegador move o foco, deixa o restante da página inerte e fecha com Esc. Dos 11 testes novos, 10 falhavam no código antigo.

**Critério**

WCAG 2.4.3 Ordem do foco, 2.1.2 Sem bloqueio do teclado, 4.1.2 Nome, função, valor.

**Evidência**

[commit a1fe89f](https://github.com/issei/mauricio-site/commit/a1fe89f664cb45f53bb0708b25d6602230c9cbcb), `src/js/cookie-consent.js`

```
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
```

##### Link de salto e `<main>` em toda página

**Problema**

Só 16 de 41 páginas tinham um link para pular a navegação, e 14 páginas não marcavam a região principal com o elemento `<main>`. Sem esse link, quem usa teclado passa por toda a navegação antes de chegar ao conteúdo.

**Mudança**

"Pular para o conteúdo" como primeiro elemento focável, com a região principal como alvo. A primeira versão do link tinha fundo branco; o verificador do próprio site, que proíbe fundo claro (regra visual da casa, não de acessibilidade), reprovou, e o link passou ao tema escuro.

**Critério**

WCAG 2.4.1 Ignorar blocos, 1.3.1 Informações e relações.

**Evidência**

[commit 3bb4900](https://github.com/issei/mauricio-site/commit/3bb4900c8e7373726719ad81fefb9d70866d4a1c), `src/404.html` · tema escuro no [commit f09b042](https://github.com/issei/mauricio-site/commit/f09b0423298ad4cf8e86145353f9114f087ac272)

```
[object Object]
[object Object]
[object Object]
         <h1>404</h1>
[object Object]
[object Object]
[object Object]
```

##### Contraste resolvido na paleta de cores, não página a página

**Problema**

O texto de apoio em `gray-500` dava de 3,15:1 a 4,16:1 sobre os fundos do site, abaixo do mínimo de 4,5:1. O azul `#007bff` era usado como cor de texto.

**Mudança**

Uma cor para cada função. Texto de apoio: `#99a1af`, com 7,27:1 sobre a cor de fundo `#0d1117`. Texto azul: `#58a6ff`, com 7,49:1. A cor `#007bff` ficou restrita a fundos, bordas e ícones. Cerca de 128 trechos reprovados caíram para 2, numa página excepcionada.

**Critério**

WCAG 1.4.3 Contraste (mínimo).

**Evidência**

[commit 90e6e8e](https://github.com/issei/mauricio-site/commit/90e6e8ea68c79164044d7f353993c5cab8234b65), `src/catalogo.html` e `src/curriculo.html` · regra em [A11Y-DECISIONS.md](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/A11Y-DECISIONS.md)

```
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
```

##### Grades que cabem em 320 px

**Problema**

Em 320 px de largura (o equivalente a 400% de zoom numa tela de 1280 px), 14 páginas exigiam rolagem horizontal. A causa comum: grade com largura mínima maior que a tela.

**Mudança**

O mínimo da coluna passa a ser o menor entre 100% e o valor original. O mesmo padrão foi aplicado a outras grades. Nas demais páginas as causas foram outras: itens de grade sem largura mínima zero, blocos de código e tabelas largas, e um tooltip. O padrão já existia no `index.css`.

**Critério**

WCAG 1.4.10 Reflow.

**Evidência**

[commit ba640d7](https://github.com/issei/mauricio-site/commit/ba640d70db94c47d16f613599034c86e680cd753), `src/case-agents.css`

```
[object Object]
[object Object]
```

##### Anel de foco visível em todas as páginas

**Problema**

Em fundo escuro, o anel de foco padrão do Chrome saía quase preto, `rgb(16,16,16)`. Quem navega por teclado não via onde estava.

**Mudança**

Um plugin do Vite injeta em toda página um anel azul de 2 px. O seletor `:where()` tem especificidade zero, então o estilo próprio de cada página continua valendo. Na auditoria v2 o mesmo plugin passou a reservar espaço no topo, para o foco não ficar sob cabeçalhos fixos.

**Critério**

WCAG 2.4.7 Foco visível; 2.4.11 Foco não obscurecido.

**Evidência**

[commit cb060c6](https://github.com/issei/mauricio-site/commit/cb060c60f062df6487b2b40d63157e3af73c1e0e) e [commit 37f22b7](https://github.com/issei/mauricio-site/commit/37f22b7f1521a2d33fcac533ba6879416bc06a8f), `vite.config.js`

```
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
```

##### O nome acessível começa pelo texto visível

**Problema**

Links com `aria-label` diferente do texto na tela. Quem usa controle por voz fala o que vê, e o comando não encontra o elemento.

**Mudança**

O nome acessível passa a ser o texto visível; o aviso de nova aba vai em texto visualmente oculto, que entra no nome acessível. Um teste novo confere todas as páginas, porque o axe vem com essa regra desligada.

**Critério**

WCAG 2.5.3 Rótulo no nome.

**Evidência**

[commit 6f6d01c](https://github.com/issei/mauricio-site/commit/6f6d01c969f21a32956ec7e0d64dd861acd8ac1c), `scripts/gen-portfolio.mjs` (o gerador da página inicial)

```
[object Object]
[object Object]
```

Antes, `ext()` injetava `aria-label="… (abre em nova aba)"`, que substituía o texto visível no nome do link.

##### Um exercício de arrastar ganha caminho por teclado

**Problema**

No capítulo 3 do simulador OCC, a fração só era montada com o mouse, arrastando ou clicando. Os blocos recebiam foco, mas Enter e Espaço não faziam nada, e as zonas de destino nem recebiam foco. Sem concluir esse exercício, os capítulos 4 a 6 não eram liberados.

**Mudança**

O caminho "selecionar e colocar": bloco e zona de destino respondem a Enter e Espaço, e o bloco escolhido anuncia o estado com `aria-pressed`. Os dois continuam sendo div com role=button, porque o Firefox não arrasta um botão nativo marcado como arrastável.

**Critério**

WCAG 2.1.1 Teclado.

**Evidência**

[commit 37f22b7](https://github.com/issei/mauricio-site/commit/37f22b7f1521a2d33fcac533ba6879416bc06a8f), `src/js/operacao-capital-cognitivo/chapters.js`

```
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
[object Object]
```

##### A catraca, fase a fase

A contagem de ocorrências registrada na referência da catraca ao fim de cada fase. Uma ocorrência é uma unidade contabilizada pelo gate de validação: um elemento reprovado por uma regra, ou uma falha de uma sonda própria (sem `<main>`, sem link de salto, rolagem a 320 px, animação sob movimento reduzido). Ela não representa necessariamente uma violação distinta da WCAG.

**Número de ocorrências na catraca ao fim de cada fase. Fonte: mensagens dos commits e implementation-plan.md.**

| Fase | Commit | Nº de ocorrências |
| --- | --- | --- |
| 1 · Primeira medição (41 páginas em português) | [a5ef956](https://github.com/issei/mauricio-site/commit/a5ef956177d4cf5f88f739d33bc7b3b55c6aa8f6) | 207 |
| 2 · Contraste | [90e6e8e](https://github.com/issei/mauricio-site/commit/90e6e8ea68c79164044d7f353993c5cab8234b65) | 81 |
| 3 · Consentimento de cookies | [a1fe89f](https://github.com/issei/mauricio-site/commit/a1fe89f664cb45f53bb0708b25d6602230c9cbcb) | 79 |
| 4 · Estrutura e link de salto | [3bb4900](https://github.com/issei/mauricio-site/commit/3bb4900c8e7373726719ad81fefb9d70866d4a1c) | 48 |
| 5 · Reflow, zoom e movimento | [ba640d7](https://github.com/issei/mauricio-site/commit/ba640d70db94c47d16f613599034c86e680cd753) | 34 |
| 6 · Tarefas interativas; a medição passa a incluir as páginas em inglês (75 no total) | [cb060c6](https://github.com/issei/mauricio-site/commit/cb060c60f062df6487b2b40d63157e3af73c1e0e) | 38 |

A Fase 4 partiu de 77, não de 79: uma correção feita em paralelo (commit a191c24, 2 ocorrências) entrou por merge. A subida de 34 para 38 veio de 4 animações de um CDN externo nas páginas de administração. Ao fim da Fase 5, as 34 ocorrências estavam todas nas páginas utilitárias registradas em `EXCEPTIONS.md`; as 38 da Fase 6 também. A auditoria v2 acrescentou métricas novas, com contagem própria (veja Resultado).

##### Limite de causalidade

A queda de 207 ocorrências para o estado atual aconteceu durante um conjunto de mudanças que incluiu regras novas, testes, sondas, correções e alterações no escopo da medição. Este relato não isola o efeito do A11Y.md, e não há experimento controlado. O que ele demonstra é que o protocolo foi incorporado ao processo de engenharia e passou a orientar o contexto usado na implementação e na validação.

05 · Validação

#### Quem verificou o quê

O A11Y.md separa três tipos de verificação: a automática, a feita por alguém que não escreveu o código e a que exige uma pessoa. Este projeto tem as duas primeiras. A terceira está quase toda pendente.

A WCAG 2.2 AA é usada aqui como referência de engenharia e de validação. Isso não constitui declaração de conformidade com a WCAG 2.2 AA.

##### Automatizada

- **Catraca:** axe-core 4.11.4 com as regras da WCAG 2.0 a 2.2, níveis A e AA, sobre o build de produção, em 75 páginas (português e inglês). Mais sondas próprias: `<main>`, link de salto no primeiro Tab, um único `<h1>`, layout a 320 px de largura, movimento reduzido, espaçamento de texto e conteúdo oculto sem JavaScript.
- **Verificador estático** do A11Y.md: procura padrões proibidos no código (`div` clicável, placeholder como único rótulo, ARIA incompleto) e confere se o relatório está mais novo que a última mudança de interface.
- **Auditoria v2:** sondas novas para o que estava marcado como "não medido". Não é independente: foi feita no mesmo trabalho que corrigiu os achados.
- **7 suítes Playwright** em `tests/a11y/`: consentimento por teclado, foco visível por comparação de pixels, rótulo no nome, largura de 320 px e zoom, tarefas, widgets e as regressões do auditor.

##### Revisão independente por agente

- **Fase 7:** um agente em contexto novo, que não leu o histórico, as especificações nem os testes, refez as verificações por conta própria e achou 4 falhas altas. Todas foram corrigidas e ganharam teste de regressão.
- **Limite:** é a única revisão independente até aqui. Ela é automatizada por IA, da mesma família de modelo do agente que escreveu o código, e não substitui uma avaliação humana independente. As correções feitas depois dela, do commit c9d085c em diante, não foram revistas de novo. Por isso o relatório declara o nível de independência mais baixo: self-reported.

##### Humana

- O dono do site aprovou decisões como a forma de integrar o protocolo e a cor do texto de apoio, e aprovou as exceções, com revisão proposta para abril de 2027.
- **Nenhuma pessoa testou o site com leitor de tela, controle por voz ou Safari.** A pergunta sobre quem faria esse teste está sem resposta desde 2026-10-03.

##### Por que não Lighthouse nem um MCP de acessibilidade

A auditoria de acessibilidade do Lighthouse usa o axe-core como motor (veja o [código-fonte do Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/main/core/gather/gatherers/accessibility.js)). Por isso ela não deve ser tratada como uma segunda engine independente de validação em relação à catraca, que também usa o axe-core. A auditoria v2 constatou o mesmo nos servidores MCP de acessibilidade disponíveis (MCP é o protocolo que conecta ferramentas a agentes de IA), e registrou como proposta estender a catraca em vez de somar ferramentas: o gate precisa ser determinístico e rodar no GitHub Actions sem uma sessão de agente. Os achados da auditoria v2 vieram de sondas próprias e de regras de boas práticas do próprio axe; o do rótulo no nome veio de um scanner externo, e a correção ganhou um teste próprio.

Evidência: [auditoria-v2.md](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/docs/specs/a11y-first/auditoria-v2.md), ADR-AV2-01 e ADR-AV2-02 (propostas) · [workflow de testes no GitHub Actions](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/.github/workflows/test.yml).

06 · Resultado

#### O que a medição mostra hoje

Fora das 7 páginas utilitárias com exceção registrada em `EXCEPTIONS.md` (páginas internas, de teste e de demonstração), a catraca registra 0 ocorrências de regras WCAG do axe e das sondas de estrutura, de largura mínima, de movimento e de espaçamento.

O axe roda a 1280 px e deixa de fora iframes de terceiros. O player do YouTube, embutido em 18 páginas, tem 58 elementos reprovados que essa medição não conta.

Restam 98 ocorrências de regras de *boas práticas* do axe, como saltos de nível entre títulos, em 28 páginas (português e inglês). Elas não são critérios da WCAG, mas estão travadas na catraca e só podem diminuir. Há ainda 2 ocorrências de texto oculto sem JavaScript em `life3d` (versões em português e inglês), um falso positivo registrado: são camadas do jogo que ficam ocultas até o jogo exibi-las, e não conteúdo da página.

Evidência: [tests/a11y/baseline.json](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/tests/a11y/baseline.json) em 2026-10-05 · [EXCEPTIONS.md](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/EXCEPTIONS.md).

##### Semântica

`<main>` e link de salto em toda página fora das exceções. Consentimento de cookies e diálogos do OCC com `<dialog>` nativo; o modal do currículo deixa o resto da página inerte e devolve o foco. Botões nativos no lugar de `div` clicável, exceto num editor interno excepcionado.

##### Teclado

Percorridos por teste: abas (14 grupos), quiz, calibrador, diálogos, a fração do simulador OCC, consentimento e menu no celular. Sem armadilha de foco nas 8 páginas percorridas por Tab.

##### Foco

Anel `#58a6ff` de 2 px (7,49:1). Diferença de pixel conferida em cada parada de Tab de 15 páginas, no Chromium. O foco não fica escondido sob o cabeçalho fixo (testado em 6 das 28 páginas que têm um) nem sob o banner de cookies, no Chromium e no Firefox.

##### Contraste

Pares de cor sólidos medidos entre 6,65:1 e 12,26:1, acima do mínimo de 4,5:1. Texto sobre gradiente, imagem ou canvas não é decidido pelo axe: 2 447 elementos ficaram sem veredito.

##### Movimento

Tratamento parcial de `prefers-reduced-motion`: com a preferência ativa, a medição não encontrou animação CSS infinita fora das exceções, mas o inventário e a classificação completa das animações continuam pendentes. Sem essa preferência, a animação de fundo da página [Engenharia Reversa Assistida por IA](https://mauricio.issei.com.br/proposta-engenharia-reversa) e o jogo [A Jornada em Pixel Art](https://mauricio.issei.com.br/life) não têm controle de pausa (em aberto).

##### Reflow e zoom

A 320 px, só 2 páginas excepcionadas rolam na horizontal. Nenhuma página bloqueia o zoom. Entre 640 e 1024 px, 3 páginas ainda rolam na horizontal (em aberto). O teste em 320 px de largura não substitui a validação de zoom de 200%. Ainda não verificado Texto ampliado a 200%.

Evidência: [REPORT.md em 2026-10-05](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/REPORT.md), seções 1, 2, 4 e 5 · [versão atual do REPORT.md](https://github.com/issei/mauricio-site/blob/main/REPORT.md).

07 · Limites

#### O que não é possível concluir

Ausência de erro automático não é ausência de barreira. O próprio histórico deste site mostra isso duas vezes:

- Com a catraca verde, o banner de cookies cobria 29 das 131 paradas de Tab da página inicial. Quem achou foi a revisão por agente em contexto novo.
- Com a catraca verde, um exercício do simulador OCC não podia ser concluído sem mouse. Quem achou foi a auditoria v2.

##### O que a evidência permite afirmar

**Cada afirmação, a evidência que existe e o estado. "Não declarado" e "Não demonstrado" são limites deliberados, não pendências escondidas.**

| Afirmação | Evidência | Estado |
| --- | --- | --- |
| O site tem validação automatizada de acessibilidade | Gate local e CI em cada pull request (`quality-gate.mjs`, `test.yml`) | Comprovado |
| As ocorrências detectáveis pelo gate diminuíram | Referência da catraca registrada em cada fase (tabela da seção 04) | Comprovado, com mudança de escopo na Fase 6 |
| O A11Y.md foi incorporado ao processo | `docs/a11y/`, `AGENTS.md`, `REPORT.md` | Comprovado |
| O site está em conformidade com a WCAG 2.2 AA | Não houve avaliação completa nem avaliação humana | Não declarado |
| Uma pessoa validou o site com leitor de tela | Nenhum teste realizado | Não verificado |
| A automação detecta todas as barreiras | O próprio histórico mostra falhas que a catraca verde não via | Não demonstrado |
| O A11Y.md causou a redução das ocorrências | Não houve experimento controlado | Não demonstrado |
| O site funciona com texto ampliado a 200% | Medido só a 320 px de largura, e só o que o gate mede | Não verificado |

##### Não verificado ou em aberto

- Limite **Leitor de tela real:** nenhum par leitor e navegador (por exemplo, NVDA com Firefox ou VoiceOver com Safari) foi usado. O que as regiões dinâmicas (aria-live) anunciam nunca foi ouvido.
- Limite **Controle por voz:** o rótulo no nome foi testado por código; ninguém usou Voice Control, Voice Access ou Dragon.
- Limite **Safari:** link de salto e foco não foram verificados nele (o Safari não leva o Tab a links na configuração padrão).
- Limite **Mídia:** vídeos e áudios sem legenda revisada por pessoa nem transcrição verificada. Ainda não verificado por avaliação humana; a existência de mecanismos técnicos não garante que o conteúdo seja acessível.
- Limite **Movimento:** 118 animações infinitas em 32 páginas ainda não foram classificadas como essenciais ou decorativas, e não têm mecanismo de pausa conhecido.
- Limite **Idioma:** o aviso de cookies e o menu do ecossistema não foram traduzidos. Nas páginas em inglês, o texto deles continua em português, marcado com o idioma certo para o leitor de tela.
- Limite **Publicação:** o deploy não espera o gate terminar. Uma regressão pode ir ao ar antes de os testes a acusarem.
- Limite **Independência:** a única revisão independente foi feita por IA. Nenhuma avaliação humana independente foi realizada, e as correções feitas depois da Fase 7, do commit c9d085c em diante, não foram revistas de novo.

Por isso o relatório fica em CONDICIONAL. Sair desse status exige pessoas: teste com leitor de tela real, revisão humana de legendas, decisões do dono sobre a tradução do aviso de cookies e a pausa das animações, e uma nova revisão independente, de preferência por pessoas e, em complemento, por outro modelo. E novos componentes podem trazer barreiras novas: a catraca impede que uma contagem suba, não que surja um problema que ela não mede.

Evidência: [REPORT.md em 2026-10-05](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/REPORT.md), seções 3 e 5 e notas 3, 6 e 7 · [auditoria-v2.md](https://github.com/issei/mauricio-site/blob/da61b0a7f385b17334c0ff6798bd4aeedcc3eee3/docs/specs/a11y-first/auditoria-v2.md).

08 · A ideia por trás

#### Do requisito à evidência

Acessibilidade não deveria ser uma inspeção feita depois que a interface está pronta. Aqui ela virou três coisas concretas: um texto que o agente lê antes de escrever código, uma catraca que impede a contagem de piorar e um relatório que diz o que ninguém verificou.

1. Requisito de acessibilidade
2. Contexto do agente
3. Implementação
4. Verificação
5. Evidência

É a mesma lógica de outras páginas do método neste site: autonomia proporcional à evidência, em [A Engenharia da Confiança](https://mauricio.issei.com.br/engenharia-confianca), e a interface do site legível por agentes, em [Agent Ready](https://mauricio.issei.com.br/agent-ready).

##### Esta página

Foi escrita sob as mesmas regras: HTML nativo, sem JavaScript específico desta página (só o menu compartilhado do ecossistema), conteúdo completo sem script e medida pela mesma catraca. Antes da publicação, um agente em contexto novo, que recebeu só o A11Y.md e a página, auditou a acessibilidade, e outro conferiu cada afirmação contra o repositório. O resultado está na [versão atual do REPORT.md](https://github.com/issei/mauricio-site/blob/main/REPORT.md).


## Perguntas frequentes

**O site é acessível?**

O relatório de verificação do próprio site não afirma isso: o status é CONDICIONAL. Com exceção de 7 páginas utilitárias, a medição automática do site registra zero ocorrências de regras WCAG do axe (sem contar iframes de terceiros, como o player do YouTube) e das sondas de estrutura, de largura mínima, de movimento e de espaçamento. Mas nenhuma pessoa testou o site com leitor de tela, controle por voz ou Safari, e as legendas dos vídeos não foram revisadas.

**O que é o A11Y.md?**

É um padrão aberto, de licença MIT, escrito para agentes de IA que geram interface. Define um contrato de comportamento para o agente, perfis de conformidade com a WCAG 2.2, guias por componente carregados sob demanda, registros de decisões e exceções, um modelo de relatório e a exigência de verificação independente. Este site usa a versão 2.2.0, perfil Standard (AA).

**Como o A11Y.md foi integrado ao desenvolvimento com IA?**

Como uma cópia fixa em docs/a11y/, presa a um commit do repositório original. O arquivo principal não é carregado em toda sessão, porque custaria cerca de 10 mil tokens; o AGENTS.md manda aplicá-lo a toda edição de interface e ler só o guia do componente em questão. O subagente revisor do repositório foi atualizado para conferir páginas contra o protocolo, e o gate de qualidade mede o resultado a cada pull request.

**Uma ferramenta automática basta para validar acessibilidade?**

Não basta. O histórico deste site tem dois exemplos: com a medição automática aprovando tudo, o banner de cookies cobria 29 das 131 paradas de Tab da página inicial, e um exercício do simulador OCC não podia ser concluído sem mouse. As duas falhas foram achadas por auditorias com sondas próprias, não pelo axe. Leitor de tela, controle por voz e legendas exigem pessoas.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
