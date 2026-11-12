---
id: 5HaAVA4316Q
slug: desmistificando-o-hyperframes-o-framework-que-transforma
status: publicado
temas:
  - engenharia-agentica
resumo: "O HyperFrames é um framework de código aberto que transforma HTML, CSS e animações em vídeo MP4, sempre com o mesmo resultado para o mesmo código. O vídeo mostra o que dá para construir, a anatomia de um projeto, por que o formato serve a agentes de IA e como ele se compara ao Remotion."
fontes:
  - url: https://hyperframes.heygen.com/introduction
    titulo: "Documentação oficial (Introdução)"
    sustenta: "O HyperFrames transforma HTML, CSS e animações em vídeo MP4 determinístico."
    verificada: true
  - url: https://github.com/heygen-com/hyperframes
    titulo: "Repositório do projeto no GitHub"
    sustenta: "O HyperFrames é de código aberto, com licença Apache 2.0, e o lema \"escreva HTML, renderize vídeo, feito para agentes\"."
    verificada: true
revisado_por: "Maurício Yokoyama Issei"
revisado_em: 2026-11-12
youtube:
  titulo: "Desmistificando o HyperFrames: O Framework que Transforma HTML em Vídeo para Agentes de IA!"
  publicado_em: 2026-08-22
  duracao: PT8M26S
  descricao: |-
    Neste vídeo, fazemos uma imersão completa no HyperFrames, um inovador framework de código aberto sob a licença Apache 2.0
    , desenvolvido pela equipe da HeyGen.
    Se você é desenvolvedor, designer ou entusiasta de inteligência artificial, descubra como esta ferramenta permite utilizar tecnologias web tradicionais como HTML, CSS e animações seekable (controláveis) para renderizar vídeos MP4 de forma totalmente determinística. Isso significa que o mesmo código gerará exatamente o mesmo vídeo, frame por frame, em qualquer execução!
    Além disso, entenda por que o HyperFrames é o ambiente perfeito para agentes autônomos de IA (como Claude Code, Cursor e outros) gerarem e editarem conteúdos de vídeo diretamente via código.
    O que você vai aprender neste vídeo:
    O que é o HyperFrames e qual o seu propósito.
    A arquitetura do projeto: como CLI, SDK, Player, Studio UI e os motores de renderização se conectam.
    Como funciona a estrutura de um projeto: o papel de arquivos como index.html, frame.md, STORYBOARD.md e o modelo de composição.
    Demonstração prática: como definir tempos com atributos data-* e criar animações de alto nível com GSAP.
    Biblioteca e Componentes: conhecendo a vasta biblioteca de blocos prontos (como transições de shaders, gráficos e efeitos especiais).
    🔗 Links e Referências Oficiais:
    🌐 Documentação Oficial (Introdução): https://hyperframes.heygen.com/introduction
    💻 Repositório do Projeto no GitHub: https://github.com/heygen-com/hyperframes
    🧪 Playground Online (Experimente no Navegador): https://www.hyperframes.dev/
    📦 Catálogo de Componentes e Blocos: https://hyperframes.heygen.com/catalog
    🎨 Showcase com Exemplos Prontos: https://hyperframes.heygen.com/showcase
    📢 Espalhe essa tecnologia! Se você achou o HyperFrames incrível ou acredita que ele pode ajudar outros desenvolvedores e engenheiros de IA em seus fluxos de automação, compartilhe este vídeo com a sua rede! Envie para a sua equipe no Slack ou Teams, publique no seu LinkedIn ou repasse para aquele seu amigo apaixonado por desenvolvimento e IA.
  miniatura: https://i.ytimg.com/vi/5HaAVA4316Q/maxresdefault.jpg
  visualizacoes: 337
  playlists: []
  legenda: automatica
  links_descricao:
    - https://hyperframes.heygen.com/introduction
    - https://github.com/heygen-com/hyperframes
    - https://www.hyperframes.dev/
    - https://hyperframes.heygen.com/catalog
    - https://hyperframes.heygen.com/showcase
  coletado_em: 2026-11-07T22:16:07Z
---
## A ideia: programar um vídeo como se programa um site

O vídeo propõe programar um vídeo do mesmo jeito que se constrói um site, sem linha do tempo de edição e sem renderização manual pesada [00:00]. A ferramenta para isso é o HyperFrames, que usa o HTML junto com a IA para gerar vídeo por programação [00:43].

## O que é o HyperFrames

O HyperFrames é um framework de código aberto. Ele pega HTML, CSS, arquivos de mídia e animações e gera vídeos MP4 determinísticos [01:24].

Por baixo, ele usa o Chrome em modo headless, sem interface gráfica, junto com o FFmpeg, para capturar os quadros em sincronia [01:45]. Determinístico quer dizer que a mesma entrada de código gera sempre o mesmo vídeo, hoje ou daqui a 10 anos [02:06].

A documentação no GitHub resume a ideia numa frase: "escreva HTML, renderize vídeo, feito para agentes" [02:06]. Não é preciso aprender um formato proprietário nem uma interface de edição [02:28].

## O que dá para construir

- Filmes de lançamento de produto em 4K [02:49].
- Vídeos explicativos sem apresentador, com visual, texto e tipografia gerados por programação [02:49].
- Um pull request do GitHub transformado em vídeo de apresentação da funcionalidade, com narração [03:10].
- Gravações de pessoas falando para a câmera, com gráficos, dados e citações sobrepostos [03:10].
- Apresentações interativas e videoclipes com cortes no ritmo da música [03:30].

## A anatomia de um projeto

A estrutura de pastas segue a organização de um projeto web [03:30]. O `index.html` é a composição principal do vídeo. A pasta `assets` guarda imagens, vídeos, áudios e fontes, e a pasta `compositions` guarda cenas reutilizáveis [03:51].

O arquivo `frame.md` traduz regras de design web, como identidade e escala, para especificações que funcionam em vídeo [04:11].

O tempo também vira HTML. Atributos como `data-start` e `data-duration` dizem quando um elemento entra e sai de cena [04:32]. Por exemplo: no segundo 0 começa o vídeo de fundo; no segundo 1 o título entra com uma animação GSAP; no segundo 6 os dois terminam [04:32]. Tudo pode ser visto no navegador antes de renderizar [04:54].

## Feito para agentes de IA

O fluxo com um agente tem três passos [05:14]:

- Instalar cerca de 20 habilidades do HyperFrames pela linha de comando [05:14].
- Escrever um prompt com a direção de arte e o conteúdo [05:36].
- Deixar o agente, como o Claude Code ou o Cursor, planejar o roteiro e o ritmo, escrever o HTML, ajustar as animações e renderizar o MP4 [05:36].

Os modelos de linguagem já escrevem bem HTML e CSS. Quando o vídeo vira HTML simples, eles podem editar vídeo sem aprender uma ferramenta nova [05:57].

## HyperFrames ou Remotion

O Remotion usa componentes React. Por isso exige um bundler e gera arquivos JSX, e usa a Remotion License, de código disponível [06:39]. O HyperFrames usa HTML, CSS e animações controláveis, com licença de código aberto Apache 2.0 [06:59].

A maior diferença é que o HyperFrames não tem etapa de build: um `index.html` já roda [07:19]. Isso facilita o trabalho da IA e reduz erros de sintaxe e de dependência [07:19].

## Perguntas frequentes

### O mesmo código sempre gera o mesmo vídeo?

Sim. O HyperFrames é determinístico: a mesma entrada gera exatamente o mesmo vídeo [02:06].

### Preciso compilar o projeto antes de renderizar?

Não. Diferente do Remotion, o HyperFrames não tem etapa de build [07:19].
