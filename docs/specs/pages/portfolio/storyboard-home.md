---
id: storyboard-home
titulo: Storyboard cinematográfico da nova Home — "O pensamento em prática"
data: 2026-11-24
status: pré-produção (nada implementado)
deriva_de: docs/specs/pages/portfolio/SDD-nova-home.md
leitor: Issei (validação) e quem for produzir fotos e implementar a home
pedido: Issei, 2026-11-24 (thread "Storyboard cinematográfico da nova Home")
---

# Storyboard da nova Home — "O pensamento em prática"

> **O que é este documento.** É um roteiro de pré-produção: o filme que a
> pessoa "assiste" ao rolar a página inicial, quadro a quadro. Não é código
> nem arquitetura técnica. A técnica já está no
> [`SDD-nova-home.md`](SDD-nova-home.md). Onde este storyboard muda alguma decisão
> daquele documento, o §9 diz qual e por quê.
>
> **Regra de origem.** Todo fato citado tem fonte no repositório
> (`public/cv.json`, `src/terminal-evolutivo.html`, `src/life.html`,
> `content/videos/`, `specs/ecosystem.nav.yaml`). Todo texto em primeira pessoa
> é **proposta** e precisa da aprovação do Issei antes de ir para a página.
> Nenhuma foto conceitual deve ser apresentada como foto real.

### Convenções

| Marca | Significado |
| :-- | :-- |
| 🟢 **Disponível** | Recurso real, pronto, já no repositório |
| 🟡 **Editar** | Recurso real existente que precisa ser escolhido, recortado ou tratado |
| 🔴 **Produzir** | Fotografia ou captura que ainda não existe e precisa ser feita |
| ⚪ **Conceito** | Referência visual sem recurso real correspondente |
| **vh** | Altura de uma tela. "120 vh" = a pessoa rola 1,2 tela |
| **Quadro** | O que está visível na tela num momento da rolagem |

Os quadros ilustrativos usam caracteres de desenho, em proporção 16:10
(computador). Eles mostram posição, escala e espaço vazio, não a aparência
final. Onde há `[FOTO …]`, o rótulo diz qual recurso ocupa a moldura.

---

## 1. Conceito e intenção narrativa

**O pensamento em prática.** A home mostra uma pessoa real que pensa antes de
fazer, e faz o que pensou. A fotografia mostra o fazer. O texto curto mostra o
pensar. O espaço vazio dá tempo para um passar para o outro.

**Mensagem central:** *Pensar profundamente. Construir com propósito.*

**A ideia que organiza o filme:** as oito dimensões do trabalho (pensar,
estudar, projetar, construir, liderar, validar, sustentar, ensinar) **não são
uma lista**. Elas se distribuem pelos três caminhos da home, e cada caminho é
uma forma de o pensamento virar prática:

| Caminho | Dimensões que ele mostra | O que prova |
| :-- | :-- | :-- |
| **Minha história** | sustentar · liderar · colaborar | Que o pensamento foi testado por mais de vinte anos de trabalho real |
| **Minhas ideias** | estudar · investigar · ensinar · compartilhar | Que o estudo é contínuo e público |
| **Meus projetos** | projetar · construir · validar · experimentar | Que as ideias foram colocadas à prova, com evidência |

*Pensar* não é uma cena: é o fio que atravessa as três. Ele aparece na abertura
(o caderno) e volta em cada sessão.

**Por que essa distribuição, e não a montagem de oito fotos da SDD (§3.1).**
Três motivos, em ordem de peso:

1. **Autenticidade.** Hoje existe **uma** foto profissional do Issei
   (`assets-fonte/retrato.jpg`) e **duas** fotos reais de trabalho, de 2002 e
   2005 (`public/fotos/`). Oito fotos novas posadas, feitas de uma vez para
   ilustrar oito verbos, arriscam virar banco de imagens com o rosto certo.
2. **Narrativa.** Oito verbos em sequência viram slogan, o que o pedido proíbe
   (§6 do pedido). Quando cada verbo mora no caminho que o prova, a relação entre
   eles aparece sem precisar ser dita.
3. **Os caminhos ganham sentido.** A abertura termina apresentando três
   caminhos. Se cada um já carrega dimensões do trabalho, o visitante entende
   que são partes da mesma pessoa, não três seções de um currículo.

**Fonte da identidade oriental.** Não vem de decoração. Vem de três fatos: o
sobrenome Yokoyama, a infância com tokusatsu contada em
`/terminal-evolutivo`, e as palavras *shokunin* e *take* (bambu) que o próprio
Issei usa no fim daquela página. A home usa essa origem como **método de
composição** (vazio, assimetria, uma cor de selo), e no máximo **uma** palavra
japonesa, discreta, na Sessão 04.

---

## 2. Sinopse da experiência

Uma pessoa abre o domínio. **Sem rolar**, ela vê o retrato do Issei impresso
como uma fotografia sobre papel, o nome, a frase "Pensar profundamente.
Construir com propósito." e três caminhos. Em três segundos ela sabe quem é,
do que se trata e para onde pode ir.

Ao rolar, o retrato fica parado e o texto troca: um caderno aberto entra ao
lado, a mão escrevendo. É o pensamento antes da prática. O caderno se reduz e
ao lado dele aparecem três pequenas fotografias, como uma folha de contato de
fotógrafo: uma de 2002, o caderno e a captura de um projeto. São os três
caminhos.

A primeira dessas fotos cresce e ocupa a tela: o Issei aos vinte anos, de
headset, no suporte técnico de um provedor de internet. Dentro da **mesma
moldura**, a foto se dissolve em 2005, diante de um monitor de tubo, programando
em Java. E se dissolve de novo em hoje, no mesmo enquadramento, vinte anos
depois. A moldura não mudou; a pessoa sim. O link leva à Carreira.

A moldura recua para a direita e o caderno da abertura volta: o canal do
YouTube nasceu para guardar os próprios resumos de estudo. Três registros
reais (o caderno, uma página de estudo, um vídeo) se assentam lado a lado. Os
links levam a Conteúdos e Vídeos.

As três molduras se alinham e se dividem em quatro: os projetos, cada um com o
verbo que mais o representa. O traço vermelho fino, que acompanhou a página
desde o número "01", termina como sublinhado do último link. Abaixo, o rodapé
de contato. Não há tela final: a página simplesmente termina onde os caminhos
começam.

**Duração:** cerca de 6 telas de rolagem (610 vh no computador, 500 vh no
celular). Uma rolagem contínua leva de 30 a 40 segundos. Quem não quer assistir
já tem os três caminhos na primeira tela.

---

## 3. Direção visual e audiovisual

### 3.1 Linguagem fotográfica

| Regra | Aplicação |
| :-- | :-- |
| **Fotografia é cópia em papel** | Toda foto fica dentro de uma moldura com margem de papel (como uma cópia impressa sobre a mesa). Isso resolve fotos de origens diferentes (2002 com data impressa, 2005 com flash, retrato de palco) sem recortar fundos nem uniformizar artificialmente |
| **Documental, não posada** | As fotos a produzir registram trabalho que de fato acontece. Nada de gesto encenado para câmera (apontar para quadro, aperto de mão) |
| **Luz natural** | Janela lateral. Sem *ring light*, sem fundo infinito, sem cor de LED |
| **Tratamento único** | Leve dessaturação (cerca de −10 %), sem vinheta, sem filtro sépia. A foto de 2002 mantém a data impressa da câmera: ela é prova de época, não defeito |
| **Escala** | Fotos ocupam no máximo 6 de 12 colunas no computador. O resto é papel |
| **Gente** | O Issei é o único rosto identificável. Outras pessoas aparecem de costas ou desfocadas, sempre com autorização |

### 3.2 Paleta e tipografia (da SDD, §4)

| Elemento | Valor | Papel no filme |
| :-- | :-- | :-- |
| Papel | `#F4F1EA` | Fundo. O "silêncio" entre os quadros |
| Papel 2 | `#EAE5DA` | Margem das cópias fotográficas, faixas de legenda |
| Tinta / grafite | `#1F1F1F` / `#2E2E2E` | Nome, títulos, texto |
| Cinza | `#5A5650` | Legendas de foto, metadados (ano, lugar) |
| **Shu** (vermelho de selo) | `#9E1B22` | **Um** elemento por quadro: o traço, o número da sessão ou o foco |

Tipografia: Inter no texto; serifada editorial (Shippori Mincho, decisão D-H4)
só na mensagem central e nos títulos das sessões. Números de sessão e legendas
em versalete espaçado.

### 3.3 Elementos de continuidade

| Elemento | Onde nasce | Onde termina | Função |
| :-- | :-- | :-- | :-- |
| **A moldura** | Retrato, C01 | Divide-se nos 4 projetos, C08 | É a "câmera". Muda de escala e posição; nunca some |
| **O traço vermelho** | Sob o "01", C01 | Sublinhado de "Conheça meus projetos", C08 | Linha do tempo do próprio visitante. Fino (2 px), horizontal ou vertical, nunca decorativo |
| **O caderno** | C02 | Volta em C07 | O pensamento. Liga a abertura às ideias |
| **O enquadramento da mesa** | 2005, C05 | Hoje, C06 | *Match cut*: o mesmo ângulo em duas épocas |

### 3.4 Câmera simulada e movimento

A "câmera" é a rolagem da própria pessoa. Nada se move sozinho.

| Movimento | Como aparece na página | Usado em |
| :-- | :-- | :-- |
| *Push-in* lento | Foto escala de 1 para 1,06 | C04 (2002) |
| *Pull-out* | Moldura reduz e recua | C03, C06 |
| Dissolve na mesma moldura | Opacidade cruzada entre duas fotos | C05, C06 |
| Deslocamento lateral | Moldura desliza de uma coluna para outra | C03 → C04, C06 → C07 |
| Paralaxe | Fotos em velocidades diferentes, máximo 6 % | C07 |
| Revelação por cortina | Foto entra por recorte de baixo para cima | C02, C08 |

Cada movimento aparece **no máximo duas vezes**. Nenhuma rotação, nenhuma
partícula, nenhum efeito que não tenha relação com a narrativa. Com
`prefers-reduced-motion`, todo o filme vira uma composição editorial estática
(SDD §5.3); o fim do §4 descreve esse estado.

### 3.5 Som

**Sem áudio.** A home não toca som nem música, nem com ação da pessoa.
Motivos: ninguém espera som ao abrir um domínio pessoal; som automático fere a
WCAG 1.4.2; e a "narração" deste filme é **texto lido**, não voz. As linhas
"Narração" das cenas são o texto em primeira pessoa exibido na tela. Se um dia
houver um vídeo com a voz do Issei, ele mora em `/videos`, não na home.

---

## 4. Storyboard sequencial, cena a cena

**Mapa geral**

| Cena | Sessão | Título | Faixa de rolagem (computador) | Tempo estimado* |
| :-- | :-- | :-- | :-- | :-- |
| C01 | 01 Apresentação | O retrato | primeira tela, sem rolar | 3–5 s de leitura |
| C02 | 01 Apresentação | O caderno | 0–90 vh da sessão | 4 s |
| C03 | 01 Apresentação | A folha de contato | 90–200 vh | 5 s |
| C04 | 02 Minha história | Ouvir · 2002 | 0–60 vh | 3 s |
| C05 | 02 Minha história | Construir · 2005 | 60–110 vh | 3 s |
| C06 | 02 Minha história | Sustentar · hoje | 110–170 vh | 4 s |
| C07 | 03 Minhas ideias | O caderno vira canal | 0–120 vh | 5 s |
| C08 | 04 Meus projetos | Da ideia à operação | 0–120 vh | 6 s |

\* Tempo de uma rolagem contínua sem parar. A pessoa controla o ritmo; nada
avança sozinho.

---

### C01 — O retrato

**A. Identificação**

| | |
| :-- | :-- |
| Cena | 01 |
| Sessão | 01 Apresentação |
| Objetivo narrativo | Responder em três segundos: quem é, o que faz, o que existe aqui. Apresentar os três caminhos antes de qualquer movimento |

**Quadro ilustrativo (computador, 16:10)**

```
┌──────────────────────────────────────────────────────────────────────┐
│ Maurício Yokoyama Issei        Buscar   Início Carreira Conteúdos …  │
│                                                                      │
│    01                                         ┌───────────────────┐  │
│    ──  (traço vermelho)                       │ ┌───────────────┐ │  │
│                                               │ │               │ │  │
│    Maurício Yokoyama Issei                    │ │  [FOTO 🟢]    │ │  │
│                                               │ │  retrato.jpg  │ │  │
│    Pensar profundamente.                      │ │  rosto, 4:5   │ │  │
│    Construir com propósito.                   │ │               │ │  │
│                                               │ │               │ │  │
│    Trabalho com software há mais de vinte     │ └───────────────┘ │  │
│    anos. Aqui estão o caminho que me trouxe   │  margem de papel  │  │
│    até hoje, o que estudo e o que construo.   └───────────────────┘  │
│                                                 lugar · ano          │
│    Minha história   Minhas ideias   Meus projetos                    │
│                                                                ↓     │
└──────────────────────────────────────────────────────────────────────┘
  colunas 1–6: texto        coluna 7: vazio        colunas 8–11: moldura
```

**B. Composição visual**

| | |
| :-- | :-- |
| O que aparece | O retrato real do Issei, de frente, sorrindo, óculos, blazer azul sobre camiseta escura. A foto está dentro de uma moldura de papel um tom mais escuro que o fundo, como uma cópia fotográfica pousada na página |
| Destaque | O rosto. É o único rosto da primeira tela |
| Ambiente | Nenhum cenário além do papel. O fundo escuro da foto original fica **dentro** da moldura; não se recorta |
| Enquadramento | Moldura nas colunas 8–11, topo alinhado ao "01". Texto nas colunas 1–6. Colunas 7 e 12 vazias (assimetria) |
| Profundidade e luz | Plano único. Uma sombra muito leve sob a moldura sugere uma cópia sobre a mesa. Nada de brilho ou reflexo |
| Paleta | Papel, grafite e o azul do blazer (única cor saturada, vinda da foto). Vermelho só no traço sob o "01" |
| Ponto de atenção | Rosto → nome → mensagem → caminhos |
| Celular | Moldura no topo, 70 % da largura, alinhada à direita; texto abaixo; caminhos visíveis sem rolar em 390×844 |

**C. Direção audiovisual**

| | |
| :-- | :-- |
| Plano | Médio fechado (peito para cima), como na foto original |
| Câmera | Parada. A primeira tela não tem animação de entrada: a identidade aparece já pronta |
| Personagem | Imóvel (fotografia) |
| Ritmo | Pausa. É o único quadro que a pessoa vê sem ter feito nada |
| Movimento gráfico | Nenhum. Só a seta "↓" discreta indicando que há mais |

**D. Comunicação**

| | |
| :-- | :-- |
| Texto na tela | **Maurício Yokoyama Issei** · *Pensar profundamente. Construir com propósito.* · "Trabalho com software há mais de vinte anos. Aqui estão o caminho que me trouxe até hoje, o que estudo e o que construo." · Links: Minha história · Minhas ideias · Meus projetos |
| Narração | É o próprio parágrafo de apresentação acima |
| Legenda da foto | Lugar e ano do retrato (**a confirmar com o Issei**, S-3; a luz sugere palco ou evento) |
| Som | Nenhum |
| Relação imagem/texto | A foto diz *quem*; a mensagem diz *como*; o parágrafo diz *o que há aqui*. Nenhum repete o outro |

Fonte dos fatos: "mais de 20 anos de experiência" (`cv.json`, `ResumoHero`);
primeiro emprego como programador em ago/2003 (`cv.json`, `Experiencia`).

**E. Transição**

| | |
| :-- | :-- |
| Começa | Já pronta, na carga da página |
| Evolui | Ao rolar, o bloco de texto sobe e sai; a moldura do retrato fica presa no lugar (palco fixo) |
| Termina | O espaço que o texto deixou vazio, à esquerda, recebe o caderno (C02) |
| Conexão | Corte seco no texto, continuidade total na moldura |
| Elemento que permanece | **A moldura do retrato** e o traço vermelho |

**F. Origem do material**

| Recurso | Estado | Observação |
| :-- | :-- | :-- |
| `assets-fonte/retrato.jpg` (1600×2000) | 🟢 Disponível | Já tem versões AVIF/WebP em `public/img/retrato-*`. Usar **com o fundo original**, sem recorte |
| Retrato em luz natural, fundo claro | 🔴 Produzir (opcional, N6) | Ideal a médio prazo. Não bloqueia o lançamento |

---

### C02 — O caderno

**A. Identificação**

| | |
| :-- | :-- |
| Cena | 02 |
| Sessão | 01 Apresentação |
| Objetivo narrativo | Mostrar o *pensar* como prática concreta, não como adjetivo: antes de construir, o Issei escreve |

**Quadro ilustrativo**

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│    ┌─────────────────────────────┐            ┌───────────────────┐  │
│    │                             │            │ ┌───────────────┐ │  │
│    │   [FOTO 🔴 N1]              │            │ │               │ │  │
│    │   mão escrevendo num        │            │ │  retrato      │ │  │
│    │   caderno; ao fundo, fora   │            │ │  (preso no    │ │  │
│    │   de foco, a tela           │            │ │   lugar)      │ │  │
│    │   3:2, luz de janela        │            │ │               │ │  │
│    └─────────────────────────────┘            │ └───────────────┘ │  │
│     Especificar antes de construir.           └───────────────────┘  │
│    │                                                                 │
│    │ Antes de escrever código, escrevo o que ele precisa fazer.      │
│    │ Neste site, nenhuma página nasce sem uma especificação.         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**B. Composição visual**

| | |
| :-- | :-- |
| O que aparece | Close das mãos do Issei escrevendo num caderno, sobre a mesa de trabalho real. Ao fundo, desfocado, um monitor com um documento de texto (não código, sem texto legível) |
| Destaque | A mão e a linha que está sendo escrita |
| Ambiente | Mesa de trabalho real do Issei. Nada arrumado para a foto |
| Enquadramento | Foto 3:2 nas colunas 1–5, um pouco abaixo da linha do retrato (assimetria vertical). Retrato continua nas colunas 8–11 |
| Profundidade e luz | Profundidade rasa: mão nítida, tela desfocada. Luz lateral de janela, vinda da esquerda |
| Paleta | O papel do caderno conversa com o papel da página. Grafite da caneta. O vermelho do quadro continua sendo o traço |
| Ponto de atenção | A mão → a frase abaixo |

**C. Direção audiovisual**

| | |
| :-- | :-- |
| Plano | Detalhe |
| Câmera | Revelação por cortina: a foto entra por recorte de baixo para cima, como uma página sendo virada |
| Personagem | A mão (na foto, em meio gesto de escrita) |
| Ritmo | Lento. A frase só aparece depois que a foto assenta |
| Movimento gráfico | O traço vermelho desce da posição do "01" e vira uma linha vertical curta à esquerda da frase |

**D. Comunicação**

| | |
| :-- | :-- |
| Texto na tela | Legenda: *Especificar antes de construir.* · Narração abaixo |
| Narração | "Antes de escrever código, escrevo o que ele precisa fazer. Neste site, nenhuma página nasce sem uma especificação." |
| Som | Nenhum |
| Relação imagem/texto | A foto mostra o gesto; o texto dá a regra e uma prova verificável. Não repete a palavra "pensar" |

Fonte: o repositório segue *Spec-Driven Development* (`AGENTS.md`), e
`/apresentacao` publica o contador de especificações auditáveis (240+). A
palavra "especificação" pode levar a `/apresentacao` (opcional; ver §8).

**E. Transição**

| | |
| :-- | :-- |
| Começa | O texto de C01 saiu; o espaço à esquerda fica vazio por um instante (Ma) |
| Evolui | Cortina revela o caderno; frase entra por opacidade |
| Termina | Caderno e retrato reduzem juntos (*pull-out*), abrindo espaço abaixo |
| Conexão | O caderno reduzido vira uma das três fotos da folha de contato (C03) |
| Elemento que permanece | Retrato (reduzindo) e caderno (reduzindo) |

**F. Origem do material**

| Recurso | Estado |
| :-- | :-- |
| Foto N1: mão escrevendo no caderno, tela desfocada ao fundo | 🔴 Produzir |
| Até N1 existir | ⚪ C02 é **cortada** no lançamento: C01 passa direto para C03, e as duas frases de C02 vão para baixo do parágrafo de C01 |

---

### C03 — A folha de contato

**A. Identificação**

| | |
| :-- | :-- |
| Cena | 03 |
| Sessão | 01 Apresentação (encerramento) |
| Objetivo narrativo | Apresentar os três caminhos como **três partes de uma mesma pessoa**, cada uma já com uma imagem real |

**Quadro ilustrativo**

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│    O que penso vira prática por três caminhos.                       │
│                                                                      │
│    ┌──────────────┐     ┌──────────────┐     ┌──────────────┐        │
│    │ [FOTO 🟡]    │     │ [FOTO 🔴 N1] │     │ [CAPTURA 🟢] │        │
│    │ callcenter   │     │ o caderno    │     │ acessib.     │        │
│    │ 2002         │     │ (de C02)     │     │ (projeto)    │        │
│    └──────────────┘     └──────────────┘     └──────────────┘        │
│    02                   03                   04                      │
│    Minha história       Minhas ideias        Meus projetos           │
│    o que o trabalho     o que estudo e       onde as ideias          │
│    me ensinou           compartilho          são postas à prova      │
│                                                         ┌─────┐      │
│    ──────────────────────────────────────────────────── │retr.│      │
│                                                         └─────┘      │
└──────────────────────────────────────────────────────────────────────┘
```

**B. Composição visual**

| | |
| :-- | :-- |
| O que aparece | Três cópias fotográficas pequenas, lado a lado, como uma folha de contato. Abaixo de cada uma: número da sessão, nome do caminho e uma linha curta. O retrato, agora pequeno, ficou no canto inferior direito, como assinatura |
| Destaque | As três fotos, com peso igual |
| Enquadramento | Três molduras 3:2 nas colunas 1–3, 5–7 e 9–11. Espaço igual entre elas. Frase acima, à esquerda |
| Profundidade e luz | Plano único |
| Paleta | Papel. A foto de 2002 traz cor de época; a captura traz a cor do site. Vermelho: o traço, agora horizontal, sob as três |
| Ponto de atenção | Leitura da esquerda para a direita: história → ideias → projetos |
| Celular | Três fotos empilhadas, cada uma com o nome do caminho ao lado |

**C. Direção audiovisual**

| | |
| :-- | :-- |
| Plano | Geral (vê-se o conjunto) |
| Câmera | *Pull-out*: tudo reduz, como se a câmera recuasse da mesa |
| Ritmo | Médio. As três fotos entram com 4 % de rolagem de diferença entre si |
| Movimento gráfico | O traço vermelho se estende horizontalmente sob as três fotos, ligando os caminhos |

**D. Comunicação**

| | |
| :-- | :-- |
| Texto na tela | "O que penso vira prática por três caminhos." · 02 Minha história — *o que o trabalho me ensinou* · 03 Minhas ideias — *o que estudo e compartilho* · 04 Meus projetos — *onde as ideias são postas à prova* |
| Narração | A própria frase de abertura |
| Som | Nenhum |
| Relação imagem/texto | Cada foto é a primeira imagem da sessão que ela anuncia. O visitante já viu o começo de cada caminho antes de entrar nele |

Cada uma das três fotos é um **link** para a âncora da sessão (`#historia`,
`#ideias`, `#projetos`). Os mesmos três links de texto já estavam em C01.

**E. Transição**

| | |
| :-- | :-- |
| Começa | Caderno e retrato terminando de reduzir |
| Evolui | As três molduras se assentam; o traço vermelho as sublinha |
| Termina | A primeira foto (2002) cresce e se desloca para a esquerda; as outras duas saem pela direita |
| Conexão | A foto de 2002 **é** o primeiro quadro da Sessão 02 |
| Elemento que permanece | A moldura da foto de 2002 (vira a moldura de "Minha história") |

**F. Origem do material**

| Recurso | Estado |
| :-- | :-- |
| `public/fotos/callcenter.jpg` (800×600) | 🟡 Editar: recorte 3:2 centrado no rosto. Resolução baixa: serve até ~640 px de largura |
| Foto N1 (caderno) | 🔴 Produzir (a mesma de C02). Sem ela: captura de `/apresentacao` |
| `public/img/capas/acessibilidade-640.*` | 🟢 Disponível (captura real de `/acessibilidade`) |

---

### C04 — Ouvir · 2002

**A. Identificação**

| | |
| :-- | :-- |
| Cena | 04 |
| Sessão | 02 Minha história |
| Objetivo narrativo | Começar a história pelo ponto em que o trabalho começou a ensinar: o atendimento ao usuário |

**Quadro ilustrativo**

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│    ┌───────────────────────────────────┐                             │
│    │                                   │      02                     │
│    │   [FOTO 🟡]                       │      │ (traço vertical)     │
│    │   callcenter.jpg                  │                             │
│    │   Issei com headset, sorrindo,    │      Minha história         │
│    │   baia de atendimento; ao fundo   │                             │
│    │   a placa do provedor             │      Comecei atendendo      │
│    │                       12 7 2002   │      gente perdida na       │
│    └───────────────────────────────────┘      internet discada.      │
│     Suporte técnico de um provedor            Quase nunca o problema │
│     de internet, 2002.                        era técnico.           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**B. Composição visual**

| | |
| :-- | :-- |
| O que aparece | O Issei jovem, de óculos e headset, sorrindo para a câmera numa baia de atendimento. Ao fundo, uma pessoa de costas e a placa do provedor. Canto inferior direito: a data impressa pela câmera, "12 7 2002" |
| Destaque | O rosto jovem, que o visitante acabou de ver adulto em C01 |
| Enquadramento | Moldura 3:2 nas colunas 1–6, mais alta que o texto. Texto nas colunas 8–11 |
| Luz | A da própria foto (fluorescente de escritório). Não corrigir |
| Paleta | Cores de época da foto; página em papel. Vermelho: traço vertical ao lado do "02" |
| Ponto de atenção | O rosto → a data → o texto |

**C. Direção audiovisual**

| | |
| :-- | :-- |
| Plano | Médio |
| Câmera | *Push-in* lento (1 → 1,06) durante toda a cena, como quem se aproxima de uma lembrança |
| Ritmo | Calmo |
| Movimento gráfico | Texto entra linha a linha |

**D. Comunicação**

| | |
| :-- | :-- |
| Título | 02 · Minha história |
| Narração | "Comecei atendendo gente perdida na internet discada. Quase nunca o problema era técnico: antes de resolver, era preciso escutar quem estava do outro lado." |
| Legenda | *Suporte técnico de um provedor de internet, 2002.* (ano a confirmar, S-2) |
| Som | Nenhum |
| Relação imagem/texto | A foto prova a época e o lugar; o texto diz o que ficou daquela época. É a origem da dimensão *sustentar* |

Fonte: `/terminal-evolutivo` ("2000 · Aprender a ouvir") e `/life` ("Onde
aprendi a ouvir a dor de usuários"). **Divergência de data:** a página
`/terminal-evolutivo` diz 2000; a data impressa na foto é 12/07/2002. A legenda
precisa do ano confirmado pelo Issei (S-2).

**E. Transição**

| | |
| :-- | :-- |
| Começa | A foto de 2002, vinda da folha de contato, termina de crescer |
| Evolui | *Push-in*; texto entra |
| Termina | Dissolve **dentro da mesma moldura** para 2005 |
| Elemento que permanece | A moldura (posição e tamanho idênticos) e o bloco de texto à direita, que só troca de conteúdo |

**F. Origem do material**

| Recurso | Estado |
| :-- | :-- |
| `public/fotos/callcenter.jpg` | 🟡 Editar: confirmar ano; decidir se a pessoa ao fundo (de costas, não identificável) fica; versão 3:2 |

---

### C05 — Construir · 2005

**A. Identificação**

| | |
| :-- | :-- |
| Cena | 05 |
| Sessão | 02 Minha história |
| Objetivo narrativo | A passagem do suporte para a construção de software: o ofício de programar |

**Quadro ilustrativo**

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│    ┌───────────────────────────────────┐                             │
│    │                                   │      02                     │
│    │   [FOTO 🟡]                       │      │                      │
│    │   programa.jpg                    │                             │
│    │   Issei de perfil, camiseta       │      Depois vieram quase    │
│    │   branca, mão no teclado,         │      quinze anos            │
│    │   monitor de tubo; calendário     │      construindo sistemas,  │
│    │   "março 2005" na mesa            │      de Java a aplicativos  │
│    └───────────────────────────────────┘      móveis.                │
│     Programador Java, 2005.                                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**B. Composição visual**

| | |
| :-- | :-- |
| O que aparece | O Issei de perfil, camiseta branca, óculos na mão, a outra mão no teclado bege. Dois monitores de tubo. Um calendário de mesa marca "Março 2005" |
| Destaque | O gesto: mão no teclado, olhar fora do quadro, conversando com alguém |
| Enquadramento | **Mesma moldura** de C04. Pessoa no terço esquerdo, equipamento no terço direito |
| Paleta | Bege dos equipamentos, branco da camiseta. Combina com o papel da página sem tratamento |
| Ponto de atenção | A mão no teclado → o calendário (a data está na própria cena) |

**C. Direção audiovisual**

| | |
| :-- | :-- |
| Plano | Médio |
| Câmera | Parada. O movimento é só o dissolve de entrada |
| Ritmo | Curto. É a cena de passagem |
| Movimento gráfico | Nenhum além da troca do texto |

**D. Comunicação**

| | |
| :-- | :-- |
| Narração | "Depois vieram quase quinze anos construindo sistemas, de Java a aplicativos móveis." |
| Legenda | *Programador Java, 2005.* |
| Som | Nenhum |
| Relação imagem/texto | A foto mostra um momento; o texto dá a duração. A foto não precisa dizer "programar": o teclado diz |

Fonte: `cv.json`, `Experiencia`: analista programador Java, ago/2003–jan/2012
(8 anos e 6 meses); analista sênior Java/mobile, fev/2012–dez/2017 (5 anos e
11 meses). Soma: cerca de 14 anos e meio. **Sem nomes de empresa na home**:
eles estão em `/curriculo`.

**E. Transição**

| | |
| :-- | :-- |
| Começa | Dissolve a partir de 2002 na mesma moldura |
| Termina | Dissolve para hoje, **com o mesmo enquadramento** (C06) |
| Elemento que permanece | A moldura e o ângulo de câmera (perfil, mão no teclado) |

**F. Origem do material**

| Recurso | Estado |
| :-- | :-- |
| `public/fotos/programa.jpg` (949×712) | 🟡 Editar: recortar a pessoa no canto superior direito (atrás do vidro); versão 3:2; resolução serve até ~960 px |

---

### C06 — Sustentar · hoje

**A. Identificação**

| | |
| :-- | :-- |
| Cena | 06 |
| Sessão | 02 Minha história |
| Objetivo narrativo | Chegar ao presente: liderança técnica e sustentação. Fechar a sessão com o link para a Carreira |

**Quadro ilustrativo**

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│    ┌───────────────────────────────────┐                             │
│    │                                   │      02                     │
│    │   [FOTO 🔴 N2]                    │                             │
│    │   Issei hoje, de perfil, à        │                             │
│    │   mesa de trabalho, mesmo         │      Hoje lidero um time    │
│    │   ângulo de programa.jpg          │      que mantém sistemas    │
│    │   (match cut, 20 anos depois)     │      em produção e os faz   │
│    │                                   │      evoluir. Aprendi a     │
│    └───────────────────────────────────┘      formar time em vez de  │
│     Tech lead, 2026.                          carregar tudo sozinho. │
│                                                                      │
│                                               Conheça minha história │
│                                               ────────────────── →   │
└──────────────────────────────────────────────────────────────────────┘
```

**B. Composição visual**

| | |
| :-- | :-- |
| O que aparece | O Issei hoje, de perfil, à mesa de trabalho: mesmo ângulo, mesma altura de câmera e mesma posição no quadro de `programa.jpg`. A diferença está nos detalhes (tela plana, notebook, cabelo, óculos) |
| Destaque | A semelhança do gesto. O visitante percebe a passagem do tempo sem legenda explicativa |
| Ambiente | Local de trabalho real. Sem logotipo de empresa visível; sem tela com dado legível |
| Enquadramento | Mesma moldura. Texto à direita. CTA alinhado à base do texto |
| Luz | Natural, de janela. O contraste com a luz fluorescente de 2005 é intencional |
| Paleta | Neutra. Vermelho: o sublinhado do CTA (o traço vertical sai do quadro e vira sublinhado) |
| Ponto de atenção | O rosto de perfil → o texto → o link |

**C. Direção audiovisual**

| | |
| :-- | :-- |
| Plano | Médio, idêntico ao de C05 |
| Câmera | Parada durante o dissolve; depois, um *pull-out* curto (1,06 → 1) prepara a saída |
| Ritmo | Médio. É o fim da sessão; o texto tem duas frases |
| Movimento gráfico | O traço vira sublinhado do CTA |

**D. Comunicação**

| | |
| :-- | :-- |
| Narração | "Hoje lidero um time que mantém sistemas em produção e os faz evoluir. Aprendi a formar time em vez de carregar tudo sozinho." |
| Legenda | *Tech lead, 2026.* |
| CTA | **Conheça minha história →** `/curriculo` · link secundário, menor: *A jornada desde 1982 →* `/terminal-evolutivo` |
| Som | Nenhum |
| Relação imagem/texto | A foto mostra a continuidade do ofício; o texto mostra o que mudou (de construir sozinho para liderar e sustentar). Dimensões: *liderar, colaborar, sustentar, evoluir* |

Fonte: `cv.json`, Tech Lead desde fev/2018, competências "SRE", "Liderança
Técnica", projetos de "Sustentação" de 2018 a 2021. A segunda frase diz, em
outras palavras, uma ideia do próprio Issei em `/terminal-evolutivo` ("O time
que aprendi a formar, em vez de carregar nas costas").

**E. Transição**

| | |
| :-- | :-- |
| Começa | Dissolve de 2005, sem mexer na moldura (*match cut*) |
| Evolui | Texto troca; CTA aparece |
| Termina | A moldura reduz para cerca de 1/3 da altura e desliza para a direita |
| Conexão | No espaço que se abre à esquerda, volta o caderno de C02 |
| Elemento que permanece | A moldura (agora pequena, à direita) |

**F. Origem do material**

| Recurso | Estado |
| :-- | :-- |
| Foto N2: Issei hoje, mesmo ângulo de `programa.jpg` | 🔴 Produzir. Guia no §7.3 |
| Até N2 existir | 🟢 Usar `retrato.jpg` nesta moldura. O *match cut* se perde, mas a sequência 2002 → 2005 → hoje continua legível |

---

### C07 — O caderno vira canal

**A. Identificação**

| | |
| :-- | :-- |
| Cena | 07 |
| Sessão | 03 Minhas ideias |
| Objetivo narrativo | Mostrar que estudar e compartilhar é um hábito com origem verificável, e levar aos conteúdos |

**Quadro ilustrativo**

```
┌──────────────────────────────────────────────────────────────────────┐
│    03                                                                │
│    ──                                    ┌──────────┐                │
│    Minhas ideias                   ┌─────┤ [CAP 🔴] │                │
│                                    │[🔴  │ página de│  ┌─────────┐   │
│    O canal nasceu para guardar     │ N1] │ estudo   │  │ [🟢 YT] │   │
│    meus próprios resumos de        │cader└──────────┤  │miniatura│   │
│    estudo. Um dia, decidi abrir    └────────────────┘  │de vídeo │   │
│    esses registros.                                    └─────────┘   │
│                                                                      │
│    Recentes                                                          │
│    · título de conteúdo · artigo                                     │
│    · título de conteúdo · vídeo                                      │
│    · título de conteúdo · estudo                                     │
│                                                                      │
│    Explore minhas ideias →        Vídeos do canal →                  │
└──────────────────────────────────────────────────────────────────────┘
```

**B. Composição visual**

| | |
| :-- | :-- |
| O que aparece | Três registros sobrepostos, como papéis sobre a mesa: o caderno (N1, que volta de C02), a captura de uma página de estudo do site e a miniatura real de um vídeo do canal |
| Destaque | O caderno, que é o mesmo da abertura. O visitante reconhece a imagem |
| Enquadramento | Texto nas colunas 1–5. Os três registros nas colunas 7–12, sobrepostos com deslocamento (nenhum alinhado ao outro) |
| Profundidade | Três planos de paralaxe (0 %, 3 %, 6 %): o caderno embaixo, a página no meio, o vídeo em cima |
| Paleta | Papel; a captura traz o escuro do site; a miniatura traz a cor do vídeo. Vermelho: só o traço sob o "03" |
| Ponto de atenção | O caderno → a frase → a lista "Recentes" |

**C. Direção audiovisual**

| | |
| :-- | :-- |
| Plano | Geral sobre a mesa (vista de cima, sugerida pela sobreposição) |
| Câmera | Deslocamento lateral de entrada; depois paralaxe |
| Ritmo | Médio. É a única cena com lista; precisa de tempo de leitura |
| Movimento gráfico | Os três registros se assentam numa composição fixa no meio da faixa |

**D. Comunicação**

| | |
| :-- | :-- |
| Título | 03 · Minhas ideias |
| Narração | "O canal nasceu para guardar meus próprios resumos de estudo. Um dia, decidi abrir esses registros. Hoje são artigos, estudos e mais de cem vídeos, organizados por tema." |
| Recentes | 3 itens (título e formato), escolhidos pelo gerador de destaques que já existe. Sem descrição |
| CTA | **Explore minhas ideias →** `/catalogo` · **Vídeos do canal →** `/videos` |
| Som | Nenhum (as miniaturas não tocam) |
| Relação imagem/texto | A imagem mostra o percurso do estudo (caderno → página → vídeo); o texto conta a origem. Dimensões: *estudar, investigar, ensinar, compartilhar* |

Fonte: descrição do vídeo de um ano do canal (`content/videos/x80stmMjSzw.md`):
o canal nasceu para "organizar e guardar meus próprios resumos de estudos".
Contagem: 185 fichas de vídeo em `content/videos/`, de out/2025 a nov/2026.
"Mais de cem" não envelhece; um número exato teria de ser gerado, não digitado.

**E. Transição**

| | |
| :-- | :-- |
| Começa | A moldura de C06 recuou para a direita; o caderno entra pela esquerda |
| Evolui | Os três registros se sobrepõem e assentam |
| Termina | Os três registros se alinham numa linha horizontal, com espaço igual |
| Conexão | A linha de três se divide em **quatro** molduras: os projetos |
| Elemento que permanece | As molduras (três viram quatro) |

**F. Origem do material**

| Recurso | Estado |
| :-- | :-- |
| Foto N1 (caderno) | 🔴 Produzir (a mesma de C02) |
| Miniatura de vídeo do canal (URL em cada `content/videos/*.md`) | 🟢 Disponível. **Atenção:** as miniaturas são capas dos vídeos, não fotos do Issei |
| Captura de uma página de estudo (sugestão: `/aprendizagem-autorregulada`), sem texto pequeno legível | 🔴 Produzir (N5, captura de página real) |

---

### C08 — Da ideia à operação

**A. Identificação**

| | |
| :-- | :-- |
| Cena | 08 |
| Sessão | 04 Meus projetos (e fim da página) |
| Objetivo narrativo | Mostrar projetos reais, cada um ligado a uma dimensão do trabalho, e terminar a página sem tela de encerramento |

**Quadro ilustrativo**

```
┌──────────────────────────────────────────────────────────────────────┐
│    04                                                                │
│    ──                                                                │
│    Meus projetos                                                     │
│    É aqui que as ideias encontram o mundo real, com evidência        │
│    de que funcionam ou de onde ainda falham.                         │
│                                                                      │
│    ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐             │
│    │[🟢 CAP] │   │[🔴 CAP] │   │[🟢 CAP] │   │[🔴 CAP] │             │
│    │acessib. │   │case-    │   │agent-   │   │boutique │             │
│    │         │   │agents   │   │ready    │   │showcase │             │
│    └─────────┘   └─────────┘   └─────────┘   └─────────┘             │
│    projetar      validar       construir     sustentar               │
│    Acessibilid.  Case Agents   Agent Ready   Boutique Empresarial    │
│                                                                      │
│    Conheça meus projetos →                                           │
│    ═══════════════════════  (o traço termina aqui)                   │
├──────────────────────────────────────────────────────────────────────┤
│  Contato (rodapé comum)                                              │
└──────────────────────────────────────────────────────────────────────┘
```

**B. Composição visual**

| | |
| :-- | :-- |
| O que aparece | Quatro capturas reais de páginas de projeto, em molduras 16:10 de mesmo tamanho. Abaixo de cada uma: o verbo da dimensão (versalete, cinza) e o nome do projeto |
| Destaque | O conjunto. Nenhum projeto maior que o outro |
| Enquadramento | Quatro molduras nas colunas 1–3, 4–6, 7–9, 10–12. Texto acima, à esquerda, até a coluna 7 |
| Paleta | As capturas trazem o escuro do site (Dark Tech), o que cria contraste com o papel: são "telas sobre a mesa". Vermelho: o traço, que termina como sublinhado do CTA |
| Ponto de atenção | As quatro imagens → os verbos → o CTA |
| Celular | Grade 2×2 |

**C. Direção audiovisual**

| | |
| :-- | :-- |
| Plano | Geral |
| Câmera | Revelação por cortina, uma moldura de cada vez (4 % de rolagem entre elas) |
| Ritmo | Médio; o fim é calmo. Depois do CTA, rolagem normal até o rodapé |
| Movimento gráfico | O traço vermelho percorre a largura sob as quatro molduras e para sob o CTA |

**D. Comunicação**

| | |
| :-- | :-- |
| Título | 04 · Meus projetos |
| Narração | "É aqui que as ideias encontram o mundo real, com evidência de que funcionam ou de onde ainda falham." |
| Cartões | **projetar** · Acessibilidade como requisito de engenharia · **validar** · Case Agents · **construir** · Agent Ready · **sustentar** · Boutique Empresarial — Architecture Showcase |
| CTA | **Conheça meus projetos →** (destino pendente, decisão D-H3 da SDD) |
| Palavra japonesa (opcional) | Uma única linha em cinza, abaixo do CTA: *職人 · shokunin — o ofício como caminho.* Só se o Issei aprovar (S-7) |
| Som | Nenhum |
| Relação imagem/texto | O texto admite falha, o que é coerente com as páginas: Case Agents trata de quando o agente **não** deve agir; Acessibilidade publica o que ainda está condicional. Dimensões: *projetar, construir, validar, experimentar* |

Os verbos de cada cartão são proposta (S-8). Nomes e destinos saem de
`specs/ecosystem.nav.yaml` (`natureza: experiencia`).

**E. Transição**

| | |
| :-- | :-- |
| Começa | As três molduras de C07 em linha se dividem em quatro |
| Evolui | Cortina revela cada captura; verbos aparecem |
| Termina | O traço vermelho para sob o CTA. A rolagem segue, sem trava, para o rodapé de contato |
| Conexão | Nenhuma cena depois. A página termina onde os caminhos começam |
| Elemento que permanece | O traço, como sublinhado do último link |

**F. Origem do material**

| Recurso | Estado |
| :-- | :-- |
| `public/img/capas/acessibilidade-640.*` | 🟢 Disponível |
| `public/img/capas/agent-ready-640.*` | 🟢 Disponível |
| Captura de `/case-agents` | 🔴 Produzir (N3, captura de página real) |
| Captura de `/boutique-empresarial-showcase` | 🔴 Produzir (N4, captura de página real) |

---

### Estado estático (movimento reduzido ou navegador sem suporte)

O mesmo filme, sem movimento, como uma página de revista:

```
┌──────────────────────────────────────────────────────────────────────┐
│ 01  Maurício Yokoyama Issei                          [retrato]       │
│     Pensar profundamente. Construir com propósito.                   │
│     parágrafo · [caderno] frase · 3 caminhos                         │
├──────────────────────────────────────────────────────────────────────┤
│ 02  Minha história     [2002]  [2005]  [hoje]   3 legendas · texto   │
│                                                  · CTA               │
├──────────────────────────────────────────────────────────────────────┤
│ 03  Minhas ideias      [caderno] [página] [vídeo]  texto · recentes  │
│                                                     · 2 CTAs         │
├──────────────────────────────────────────────────────────────────────┤
│ 04  Meus projetos      [cap] [cap] [cap] [cap]   verbos · CTA        │
└──────────────────────────────────────────────────────────────────────┘
```

Nada some. As três fotos da Sessão 02 ficam lado a lado, em ordem cronológica,
e a passagem do tempo continua legível.

---

## 5. Continuidade e mapa de transições

```
 C01 retrato ──(moldura fica)──► C02 caderno ──(pull-out)──► C03 folha de contato
   │ traço nasce                  │ traço desce              │ traço sublinha os 3
   ▼                              ▼                          ▼
                                                    foto 2002 cresce
 C06 hoje ◄──(dissolve, mesma moldura)── C05 2005 ◄──(dissolve)── C04 2002
   │ moldura recua à direita
   ▼
 C07 caderno volta + página + vídeo ──(3 molduras em linha)──► C08 4 projetos
                                                                │ traço termina
                                                                ▼ no CTA → rodapé
```

| De → para | Tipo | O que permanece | Por que esta transição |
| :-- | :-- | :-- | :-- |
| C01 → C02 | Corte no texto, palco fixo | Moldura do retrato | A pessoa continua presente enquanto o pensamento entra |
| C02 → C03 | *Pull-out* | Retrato e caderno (reduzidos) | Recuar para ver o conjunto: os três caminhos |
| C03 → C04 | Uma foto cresce, duas saem | Moldura de 2002 | O visitante entra na história "por dentro" da foto que já viu |
| C04 → C05 | Dissolve | Moldura e texto à direita | O tempo passa; o lugar na página não muda |
| C05 → C06 | Dissolve com *match cut* | Moldura **e enquadramento** | O mesmo gesto, vinte anos depois. É a imagem mais forte do filme |
| C06 → C07 | Deslocamento lateral | Moldura (pequena) | A história dá espaço às ideias |
| C07 → C08 | Três viram quatro | As molduras | Das ideias aos projetos: o que foi estudado vira coisa construída |
| C08 → rodapé | Rolagem livre | O traço (fim) | Não há tela final. Os caminhos ficam abertos |

**Moldura contínua: avaliação.** A SDD sugere uma moldura que atravessa as
sessões. Este storyboard **adota** a ideia, com uma mudança: a moldura não é um
retângulo abstrato, é uma **cópia fotográfica com margem de papel**. Assim ela
tem razão de existir (fotos de épocas diferentes sobre a mesma mesa) e não
depende de efeito para ser entendida. Ela muda de escala quatro vezes e se
divide uma vez. Mais que isso viraria demonstração técnica.

---

## 6. Narração completa em primeira pessoa

Texto proposto, na ordem em que aparece. **Tudo precisa de aprovação do
Issei.** O trecho marcado com † depende de um fato a confirmar.

> **01 · Apresentação**
>
> **Maurício Yokoyama Issei**
>
> *Pensar profundamente. Construir com propósito.*
>
> Trabalho com software há mais de vinte anos. Aqui estão o caminho que me
> trouxe até hoje, o que estudo e o que construo.
>
> Antes de escrever código, escrevo o que ele precisa fazer. Neste site,
> nenhuma página nasce sem uma especificação.
>
> O que penso vira prática por três caminhos.
>
> **02 · Minha história** — o que o trabalho me ensinou
> **03 · Minhas ideias** — o que estudo e compartilho
> **04 · Meus projetos** — onde as ideias são postas à prova

> **02 · Minha história**
>
> Comecei atendendo gente perdida na internet discada.† Quase nunca o
> problema era técnico: antes de resolver, era preciso escutar quem estava do
> outro lado.
>
> Depois vieram quase quinze anos construindo sistemas, de Java a aplicativos
> móveis.
>
> Hoje lidero um time que mantém sistemas em produção e os faz evoluir.
> Aprendi a formar time em vez de carregar tudo sozinho.
>
> **Conheça minha história →**

> **03 · Minhas ideias**
>
> O canal nasceu para guardar meus próprios resumos de estudo. Um dia, decidi
> abrir esses registros. Hoje são artigos, estudos e mais de cem vídeos,
> organizados por tema.
>
> **Explore minhas ideias →** · **Vídeos do canal →**

> **04 · Meus projetos**
>
> É aqui que as ideias encontram o mundo real, com evidência de que funcionam
> ou de onde ainda falham.
>
> **Conheça meus projetos →**

† Ano da foto: 2000 ou 2002 (S-2).

**Tamanho:** cerca de 180 palavras na página inteira, sem contar os títulos de
"Recentes" e dos projetos.

**Como a narração liga as oito dimensões sem listá-las:** *pensar* aparece como
regra de trabalho ("antes de escrever código, escrevo"); *sustentar* e
*liderar* aparecem como o que mudou ao longo do tempo ("aprendi a formar
time"); *estudar* e *compartilhar* aparecem como uma história com começo ("o
canal nasceu para…"); *projetar, construir, validar, experimentar* aparecem
como o critério dos projetos ("evidência de que funcionam ou de onde ainda
falham"). Nenhum verbo vira slogan isolado; os verbos aparecem só como rótulo
pequeno nos cartões de projeto.

**O que a narração evita, de propósito:** "inovação", "transformação",
"paixão", "jornada" como abstração, adjetivos sobre si mesmo ("robusto",
"estratégico") e números de impacto sem contexto. Os resultados com número
ficam em `/curriculo`, onde há espaço para dizer de onde vêm.

---

## 7. Inventário de fotografias, vídeos e recursos necessários

### 7.1 Recursos reais encontrados no repositório

| Recurso | Arquivo | Conteúdo real | Uso no storyboard | Estado |
| :-- | :-- | :-- | :-- | :-- |
| Retrato profissional | `assets-fonte/retrato.jpg` (1600×2000) | Issei de frente, óculos, blazer azul, fundo escuro com luz de palco | C01; C06 provisório | 🟢 Disponível |
| Suporte técnico | `public/fotos/callcenter.jpg` (800×600) | Issei com headset numa baia; data impressa 12/07/2002 | C03, C04 | 🟡 Editar (ano, recorte 3:2) |
| Programador | `public/fotos/programa.jpg` (949×712) | Issei de perfil ao teclado, monitores de tubo, calendário "março 2005" | C05; referência de enquadramento para N2 | 🟡 Editar (remover pessoa ao fundo) |
| Formatura | `public/fotos/formatura.jpg` | Issei de beca com a mãe, 2005 | **Não usado** (§9.2) | 🟡 Reserva |
| Capturas de projeto | `public/img/capas/acessibilidade-*`, `agent-ready-*` | Telas reais das páginas | C03, C08 | 🟢 Disponível |
| Miniaturas do canal | URL em cada `content/videos/*.md` | Capas dos 185 vídeos | C07 | 🟢 Disponível |
| Fotos de família | `public/fotos/1982`, `casamento`, `filha`, `gemeos`, `careca`, `familia` | Vida pessoal, com filhos menores identificáveis | **Não usadas na home** (§9.2) | — |
| Shopping Eldorado | `public/fotos/eldorado.jpg` | Foto de arquivo do prédio, sem o Issei | **Não usar** (não mostra o Issei; origem e direitos desconhecidos) | — |
| Capas `og-*.png`, badges | `public/` | Imagens geradas, com texto | **Não usar** (SDD §1.3) | — |

**Duas correções à SDD §1.3:**

1. A SDD diz que só existe uma foto real do Issei. Existem **dez** em
   `public/fotos/`, publicadas em `/life` e `/terminal-evolutivo`. Duas delas
   (2002 e 2005) mostram o Issei trabalhando e sustentam a Sessão 02 sem
   nenhuma produção nova.
2. A SDD trata as miniaturas do canal como "gravações reais do Issei". Pela
   descrição do próprio canal, os vídeos são resumos de estudo feitos com o
   NotebookLM. As miniaturas são capas, não fotos dele. Servem como registro de
   estudo (C07), não como foto da dimensão *ensinar*.

### 7.2 O que precisa ser produzido

| Id | O quê | Cena | Prioridade | Sem ele |
| :-- | :-- | :-- | :-- | :-- |
| **N1** | Foto: mão do Issei escrevendo num caderno, tela desfocada ao fundo | C02, C03, C07 | Alta | C02 é cortada; em C03 e C07 entra a captura de `/apresentacao` |
| **N2** | Foto: Issei hoje, de perfil, à mesa de trabalho, **mesmo enquadramento** de `programa.jpg` | C06 | Alta | Usa o retrato; perde o *match cut* |
| N3 | Captura de `/case-agents` (16:10, sem texto pequeno legível) | C08 | Média | Cartão com fundo de papel e título |
| N4 | Captura de `/boutique-empresarial-showcase` (16:10) | C08 | Média | Idem |
| N5 | Captura de `/aprendizagem-autorregulada` (ou outra página de estudo) | C07 | Média | Ficam só caderno e vídeo |
| N6 | Retrato em luz natural, fundo neutro claro, 4:5 | C01 (substitui o atual) | Baixa | O retrato atual funciona dentro da moldura |

São **duas fotos** e três capturas de tela para o filme completo, mais um
retrato opcional. A SDD (§8) pedia oito fotos, um retrato e três registros.

### 7.3 Guia de produção das fotos

**Comum às duas fotos:** luz natural de janela, lateral; sem flash; câmera ou
celular em modo foto, sem o modo retrato que desfoca o fundo artificialmente;
arquivo original com pelo menos 2400 px no lado maior; nenhum logotipo de
empresa, crachá ou tela com dado legível; ninguém além do Issei identificável.
Fazer de 20 a 30 cliques por cena e escolher depois.

**N1 — O caderno.** Plano detalhe, câmera acima do ombro ou a 45°. A mão
escrevendo de verdade (uma especificação real, um rascunho de página), não
pousada sobre o papel. Caderno sem pauta colorida; caneta escura. Ao fundo,
fora de foco, um monitor com texto. Horizontal 3:2. Deixar espaço livre à
direita do caderno.

**N2 — Hoje, mesmo ângulo de 2005.** Abrir `programa.jpg` no celular e copiar:
câmera à altura dos olhos de quem está sentado, um pouco à frente e à esquerda;
o Issei no terço esquerdo, de perfil, olhando para fora do quadro (como quem
conversa com alguém da equipe); mão no teclado; tela no terço direito. Roupa
simples, de preferência clara (rima com a camiseta branca de 2005). Fazer
variações com e sem óculos na mão.

**Capturas N3–N5:** navegador em 1440×900, topo da página, sem barra de
endereço; exportar em 16:10. Para não ter texto pequeno legível, enquadrar a
área do título da página.

---

## 8. Mapa de acesso às páginas existentes

| Onde, na home | Rótulo | Destino | Existe? |
| :-- | :-- | :-- | :-- |
| C01, sem rolar | Minha história · Minhas ideias · Meus projetos | `#historia`, `#ideias`, `#projetos` | Âncoras da própria home |
| Cabeçalho comum | Início · Carreira · Conteúdos · Vídeos · Buscar | `/`, `/curriculo`, `/catalogo`, `/videos`, busca | Sim |
| C02 (opcional) | "especificação" | `/apresentacao` | Sim |
| C03 | As três fotos da folha de contato | `#historia`, `#ideias`, `#projetos` | Âncoras |
| C06 | Conheça minha história | `/curriculo` | Sim |
| C06 (secundário) | A jornada desde 1982 | `/terminal-evolutivo` | Sim |
| C07 | Recentes (3 itens) | Páginas de conteúdo | Sim (gerados) |
| C07 | Explore minhas ideias | `/catalogo` | Sim |
| C07 | Vídeos do canal | `/videos` | Sim |
| C08 | 4 cartões | `/acessibilidade`, `/case-agents`, `/agent-ready`, `/boutique-empresarial-showcase` | Sim |
| C08 | Conheça meus projetos | **D-H3 pendente** (recomendação da SDD: `/catalogo#projetos`) | Ainda não |
| Rodapé | Contato | `#contact` | Sim |

**Regra de acesso:** qualquer conteúdo está a no máximo dois cliques da
primeira tela, sem precisar rolar a animação. Os três caminhos aparecem três
vezes (C01, C03 e o CTA de cada sessão), sempre como links reais, com a ordem
de foco igual à ordem visual.

---

## 9. Avaliação crítica e ajustes recomendados

### 9.1 Critérios do pedido

| Critério | Avaliação | Situação |
| :-- | :-- | :-- |
| **Autenticidade** | Todas as fotos do filme são do Issei ou de páginas reais. Os fatos têm fonte. A narração reescreve ideias que ele já publicou | Forte, **se** o Issei aprovar o texto |
| **Identidade** | A assinatura vem da cópia fotográfica sobre papel, do traço vermelho e do *match cut* 2005 → hoje, não de símbolo oriental | Forte |
| **Clareza** | C01 responde quem, o quê e onde ir sem rolar | Forte |
| **Continuidade** | Uma moldura, um traço e um caderno ligam as quatro sessões. Nenhuma sessão começa do zero | Forte |
| **Proporção** | 8 cenas, cerca de 6 telas, cerca de 180 palavras | Adequada |
| **Relevância** | Cada cena acrescenta um fato novo (ver §9.2 sobre o que foi cortado) | Adequada |
| **Fotografia** | O rosto do Issei aparece em C01, C04, C05 e C06 | Forte em 01 e 02; fraca em 03 e 04, que mostram registros, não a pessoa |
| **Navegação** | Caminhos na primeira tela, CTAs em todas as sessões, no máximo 2 cliques | Forte; falta D-H3 |
| **Originalidade** | O *match cut* com foto real de 2005 é a imagem que o visitante leva da página | Depende de N2 |
| **Viabilidade** | 2 fotos + 3 capturas; luz natural e celular bastam | Alta |

### 9.2 O que foi cortado ou mudado, e por quê

| Mudança em relação à SDD | Motivo |
| :-- | :-- |
| **A sequência de oito fotos da Sessão 01 (SDD §3.1) foi eliminada.** As oito dimensões passam para dentro dos três caminhos | Oito fotos novas, posadas de uma vez, contrariam "fotografia documental". Oito verbos em sequência viram slogans. A abertura fica mais curta e chega mais rápido aos caminhos |
| Sessão 02 usa **três** fotos (2002, 2005, hoje) em vez de uma | As fotos de arquivo já existiam e não estavam na SDD. São a prova mais forte de trajetória real |
| Retrato **sem** versão recortada em fundo claro | Recortar fundo contraria a regra 5 da SDD (sem recorte artificial). A moldura de papel resolve o contraste |
| Fotos de família **fora** da home | Mostram filhos menores identificáveis. Já estão em `/terminal-evolutivo`, que dá o contexto que elas pedem. O link secundário de C06 leva até lá |
| Formatura (2005) **fora** | Mostra a mãe e tem o mesmo ano de `programa.jpg`; duas fotos de 2005 enfraquecem o ritmo 2002 → 2005 → hoje |
| Nenhum áudio | §3.5 |

**Cenas consideradas e descartadas:**

- *"Liderar" com foto de reunião.* Exigiria posar colegas ou expor pessoas do
  trabalho. A liderança aparece no texto de C06, com fonte no currículo.
- *Encerramento com o retrato de volta.* Fecharia o filme com uma tela de
  despedida. O pedido proíbe tela de encerramento que interrompa a navegação.
- *Cena própria para "ensinar".* O canal não mostra o Issei falando; uma foto de
  "gravação" seria encenada. *Ensinar* fica em C07, com o fato verificável da
  origem do canal.

### 9.3 Decisões que ficam com o Issei

| Id | Pergunta | Recomendação |
| :-- | :-- | :-- |
| S-1 | Aprova distribuir as oito dimensões pelos três caminhos, no lugar da montagem de oito fotos da SDD? | Sim |
| S-2 | Qual é o ano da foto do call center: 2000 (como em `/terminal-evolutivo`) ou 2002 (data impressa na foto)? | Usar o ano da foto, ou "início dos anos 2000" |
| S-3 | Onde e quando foi feito o retrato? (legenda de C01) | Legenda curta com lugar e ano |
| S-4 | Pode usar `programa.jpg` recortando a pessoa ao fundo? | Sim |
| S-5 | Faz as fotos N1 e N2 (§7.3)? | Sim; até lá, lançar com o retrato no lugar de N2 e sem C02 |
| S-6 | Aprova o texto do §6, frase por frase? | Ler em voz alta; trocar o que não soar como você |
| S-7 | Usa a linha *shokunin* em C08? | Opcional. Na dúvida, não usar |
| S-8 | Os verbos dos quatro cartões de projeto estão certos? | Revisar projeto por projeto |

D-H1 (fundo claro) e D-H3 (destino de "Conheça meus projetos") continuam
abertas na SDD e afetam este storyboard.

### 9.4 Riscos

| Risco | Efeito | Resposta |
| :-- | :-- | :-- |
| N2 não reproduz o ângulo de 2005 | O *match cut* parece acidente | Fazer muitas variações; se não funcionar, usar dissolve simples |
| Fotos de 2002 e 2005 têm baixa resolução | Ficam suaves em telas grandes | Moldura limitada a ~640–960 px; a margem de papel ajuda a ler como cópia antiga |
| Capturas escuras sobre papel claro | Quebra de tom em C08 | É intencional ("telas sobre a mesa"); validar na prova visual |
| Texto vira autopromoção ao ser revisado | Perde o tom | Revisar com o `tone-reviewer` e manter as frases curtas |

---

## 10. Conclusão — proposta consolidada

A home é um filme curto de **oito quadros** em **quatro sessões**, conduzido
pela rolagem e sem som:

1. **Apresentação (C01–C03).** O retrato real e o nome na primeira tela, com a
   mensagem e os três caminhos. O caderno mostra o pensar como regra de
   trabalho. A folha de contato apresenta os caminhos, cada um com a primeira
   imagem da sua sessão.
2. **Minha história (C04–C06).** Uma única moldura atravessa 2002, 2005 e
   hoje. O *match cut* entre a foto de 2005 e uma foto nova no mesmo ângulo é
   a imagem central do filme.
3. **Minhas ideias (C07).** O caderno volta, agora ao lado de uma página de
   estudo e de um vídeo: o canal nasceu dos próprios resumos de estudo.
4. **Meus projetos (C08).** Quatro projetos reais, cada um com um verbo. O traço
   vermelho termina no último link. A página acaba sem tela final.

**Para produzir:** duas fotos (N1, N2) e três capturas de tela. Todo o resto já
existe no repositório.

**Para decidir antes de implementar:** S-1 a S-8 (§9.3), D-H1 e D-H3 da SDD.

**Próximo passo sugerido:** o Issei revisa o §6 e responde S-1. Se S-1 for
aceito, os §3.1 e §8 da SDD precisam ser atualizados para este storyboard antes
do código (regra de SDD do repositório).
