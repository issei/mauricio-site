# Engenharia por Trás da Boutique Empresarial: Arquitetura Estática, SDD e Desenvolvimento Agêntico

O vídeo mostra a engenharia por trás do site da Boutique Empresarial: um funil único de conversão, uma base estática e rápida, desenvolvimento orientado por especificação, subagentes de IA, um quality gate que bloqueia qualquer erro e um design sem movimento desnecessário.

Vídeo de Maurício Yokoyama Issei, publicado em 21 de setembro de 2026 (9 min 32 s).
Assistir: https://www.youtube.com/watch?v=5LtvpFMRUvw

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## Um site simples por fora

À primeira vista, o site da Boutique Empresarial é uma página minimalista. Por baixo, há um sistema de conversão construído, testado e mantido quase todo por uma arquitetura guiada por IA [00:00]. O vídeo usa a imagem de um iceberg: começa pela ponta visível e desce até onde os agentes trabalham [00:21].

## Um funil único

O projeto existe por um motivo: não há menus nem páginas sem fim. Tudo leva a uma só jornada [01:02]. O centro dela é um formulário de sete etapas para o diagnóstico gratuito, que qualifica o contato [01:24].

Assim, o sistema filtra e qualifica o contato antes de qualquer conversa com uma pessoa, e a equipe economiza horas de triagem manual [01:46].

## Uma base mínima e rápida

Não há frameworks pesados nem bibliotecas grandes no navegador. A base é HTML e CSS estáticos [02:07]. Com Vite e Tailwind CSS, e com a hospedagem na AWS em S3 e CloudFront, as páginas carregam em milissegundos [02:27].

## Desenvolvimento orientado por especificação

As decisões são tomadas antes de escrever o código [03:07]. No desenvolvimento orientado por especificação (SDD), a pasta de documentação é a lei do código: quando o requisito muda, a documentação muda primeiro, sem exceção [03:07].

Isso tira a adivinhação, tanto para as pessoas quanto para a IA [03:29]. Os documentos do repositório dizem: "A documentação é a fonte da verdade" [03:29].

O site também é feito para agentes de IA. Enquanto as pessoas leem o HTML, os mecanismos de busca com IA leem arquivos estruturados, como o `llms.txt` e os manifestos WebMCP [04:10]. É o que se chama de AEO (Answer Engine Optimization) [04:30].

## A esteira de agentes de IA

O vibe coding aqui não é deixar a IA improvisar [04:51]. A IA executa contratos e especificações detalhados; as regras vêm da documentação [05:11].

No Claude Code, o trabalho é dividido entre cinco subagentes especializados [05:32]:

- um audita a página [05:32];
- um corrige o cabeçalho do código [05:32];
- um escreve os textos com foco em SEO [05:32];
- um cria as suítes de teste [05:32];
- um roda a verificação final de qualidade [05:53].

## O quality gate

Nenhum agente, humano ou de IA, dá uma tarefa por concluída antes de o comando de validação ficar verde [06:14]. Ele faz o build do site, roda testes em três navegadores e exige zero violações de acessibilidade [06:35]. O modelo é fail-closed: qualquer erro para o processo [06:35].

Depois do merge no branch principal, o pipeline roda os testes, faz o build, se autentica na nuvem, envia os arquivos e limpa o cache antigo [06:56]. O deploy é todo automático, e é isso que deixa a velocidade da IA chegar ao usuário sem quebrar nada [06:56].

## Design: silêncio e elegância

O site institucional usa um fundo creme, uma tipografia escura cor de tinta e uma linha dourada fina para marcar a hierarquia [07:38]. Os materiais para redes sociais têm uma paleta própria, mais vibrante, e as duas paletas nunca se misturam [07:59].

O site não usa vídeo de fundo, animações que distraem nem rolagem com efeito de paralaxe [08:19]. O movimento só aparece como resposta a uma ação do usuário, e isso também ajuda o carregamento rápido [08:19].

## Perguntas frequentes

### O que acontece se um teste falhar?

O processo para. O quality gate é fail-closed, e nenhuma tarefa é dada por concluída até o comando ficar verde [06:35].

### Por que o site não usa animações?

Para manter a clareza e a velocidade. O movimento só aparece como resposta a uma ação do usuário [08:19].

## Fontes

- [Repositório no GitHub](https://github.com/issei/boutiqueempresarial-site): A estrutura do projeto: especificações em docs/specs, subagentes do Claude Code e o comando npm run gate.
- [Site oficial da Boutique Empresarial](https://boutiqueempresarial.com.br/): O funil único: página do diagnóstico gratuito e formulário de sete etapas.

Revisado por Maurício Yokoyama Issei em 12 de novembro de 2026.

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica), [Especificação e desenvolvimento](https://mauricio.issei.com.br/temas/especificacao-e-desenvolvimento)

## Sobre o vídeo

Neste vídeo, apresentamos a engenharia de software e a metodologia agêntica utilizadas no desenvolvimento do site da **Boutique Empresarial**. 

Acompanhe como combinamos alta performance web (MPA estático com carregamento inferior a 1 segundo), desenvolvimento orientado por especificações (SDD), automação multi-agente e preparação para motores de resposta e agentes de IA (AEO/WebMCP).

---

🔗 **LINKS IMPORTANTES:**
* 🌐 **Site Oficial:** https://boutiqueempresarial.com.br/
* 💻 **Repositório no GitHub:** https://github.com/issei/boutiqueempresarial-site

---

📌 **O QUE VOCÊ VAI VER NESTE VÍDEO:**

1. **Arquitetura Estática & Funil Único:** 
   Construção de uma Multi-Page Application (MPA) estática utilizando Vite 6, Tailwind CSS v4 e HTML/CSS puro, sem hidratação ou frameworks JS pesados no cliente. Foco total em um funil de conversão único (Landing Page do Diagnóstico Gratuito → Formulário conversacional de 7 etapas → Página de confirmação).

2. **Specification Driven Development (SDD) & VibeCoding:** 
   Entenda como as especificações em `docs/specs/` funcionam como a fonte única da verdade antes de qualquer alteração de código, permitindo um fluxo rápido de implementação orientado por contratos claros.

3. **Pipeline Multi-Agente (Claude Code):** 
   A estrutura agêntica do projeto com subagentes especializados (`page-auditor`, `head-fixer`, `copy-writer`, `test-author`, `gate-runner`), seguindo o princípio: *"modelo caro decide, modelo barato executa, o gate arbitra"*.

4. **Quality Gate Determinístico (Fail-Closed):** 
   O funcionamento do comando `npm run gate`, que executa o build do Vite, testes E2E cross-browser com Playwright e auditoria de acessibilidade WCAG 2.1 AA via `axe-core`.

5. **CI/CD Automatizado na AWS via OIDC:** 
   O fluxo DevOps no GitHub Actions com autenticação por tokens temporários JWT (sem chaves fixas) integrado ao AWS S3, CloudFront Functions e Route 53.

6. **AEO & Descoberta por Agentes de IA (Agent Readiness):** 
   Como o site é estruturado para machine-readable content com `llms.txt`, `llms-full.txt`, manifestos em `/.well-known/`, cabeçalhos HTTP Link (RFC 8288), registros DNS-AID e runtime WebMCP (`navigator.modelContext`).

---

🛠️ **TECNOLOGIAS E FERRAMENTAS UTILIZADAS:**
* **Frontend:** Vite 6, Tailwind CSS v4, HTML5/CSS3 Vanilla
* **Testes & Qualidade:** Playwright, @axe-core/playwright
* **Infraestrutura & Cloud:** AWS S3, CloudFront, Route 53 (DNSSEC/DNS-AID), CloudFront Functions
* **CI/CD:** GitHub Actions com OIDC
* **Backend do Formulário:** Google Apps Script
* **Harness Agêntico:** Claude Code, APM, MCP (Context7, CodeGraph, Playwright-MCP)

---

⚠️ **LICENÇA E DIREITOS AUTORAIS:**
O código-fonte deste projeto está disponibilizado publicamente no GitHub exclusivamente para fins de consulta e visualização, sendo um ativo proprietário com todos os direitos reservados.

#EngenhariaDeSoftware #ViteJS #TailwindCSS #Playwright #DevOps #AWS #ClaudeCode #AI #SoftwareArchitecture #BoutiqueEmpresarial

## Transcrição

_Transcrição automática, não revisada._

[0:00] Certo? Vamos direto ao ponto. A primeira vista, o site da boutique empresal parece ser só mais uma página minimalista, super limpa e elegante na internet, não é? Mas a história muda completamente de figura quando a gente examina os bastidores desse repositório. Por baixo dessa superfície silenciosa tem uma máquina incrivelmente sofisticada, operando a todo o vapor. Nós estamos falando de um sistema de conversão de altíssima precisão, que é construído, testado e mantido quase totalmente por uma arquitetura guiada por inteligência artificial. É fascinante ver como a simplicidade visual consegue esconder uma complexidade técnica tão brilhante. Para ajudar a desvendar tudo isso, vamos usar o clássico modelo do iceberg. A gente começa analisando a pontinha visível lá em cima e depois vamos mergulhar fundo até as profundezas ultra técnicas onde os agentes de realmente operam. Então o roteiro da nossa análise de hoje é bem direto. Um a estratégia de funil único. Dois stack minimalista. Três, desenvolvimento orientado por especificação. Quatro, o pipeline de agentes de A. Cality Gate definitivo. E

[1:00] seis, design silêncio e elegância. Bora lá. Ponto um, a estratégia de funil único. Começando pela ponta do iceberg. Absolutamente todo esse projeto existe por um único motivo. Sabe aqueles sites corporativos tradicionais, lotados de menus e páginas que não acabam mais? Pois é, esqueçam isso. O produto público aqui foca 100% em um mecanismo de conversão hiperfocado. Tudo, literalmente tudo, direciona para uma única jornada. E o motor central dela é um formulário de aplicação de exatas sete etapas pro diagnóstico gratuito. E olha, esse número sete não é obra do acaso. É uma ferramenta de qualificação super profunda de leads. A grande sacada é que antes mesmo de qualquer interação humana acontecer, o sistema já filtrou e qualificou o contato. Isso é uma virada de chaves gigantesca. Economiza horas e horas de triagem manual da equipe. É precisão cirúrgica na captação logo no primeiro

[2:00] clique. Ponto do stack minimalista, velocidade máxima. Descendo só um pouquinho na água, a gente chega na camada mais rasa da tecnologia. E para sustentar esse funil de conversão com eficiência, performance não é um bônus, é innegociável. O que grita aos olhos aqui é a ausência total daquele inchaço de frameworks pesados. Zero bibliotecas gigantes processando tarefas no navegador. A base é essencialmente HTML e CSS estáticos. E esse é o grande pulo do gato. Usando ferramentas como Vit e Twend CSS e hospedando a infraestrutura toda na AWS com S3 e Cloud Front, o sistema garante tempos de carregamento na casa dos milissegundos. É quase um tapa na cara da cultura atual de desenvolvimento web que costuma ser super pesada e garante que o visitante vá página inicial direto pro formulário num piscar de olhos. Ponto três, desenvolvimento orientado por especificação. Agora, indo mais fundo na filosofia da coisa toda, a gente esbarra na regra de ouro que dita como o código

[3:02] é realmente escrito e mantido por aqui. Não é simplesmente sentar e codificar, é sobre como as decisões são cravadas antes mesmo de uma única linha de código ver a luz do dia. Estamos falando do specification driven development ou desenvolvimento orientado por especificação. Nessa arquitetura, a pasta de documentação não é só um guia cheio de sugestões, não. Ela é a lei absoluta do código. Mandem tudo. Mudou o requisito da empresa, a documentação precisa ser atualizada primeiro, sem exceção. Isso arranca pela raiz qualquer achismo ou adivinhação, tanto pros engenheiros humanos quanto paraa inteligência artificial. Tem uma frase nos documentos do próprio repositório que resume a ópera de um jeito perfeito. A documentação é a fonte da verdade. É uma regra de ferro. Fazer a documentação guiar cada passo do processo é o que garante aquele alinhamento perfeito entre o que a empresa precisa e o que a engenharia de fato entrega. Sem surpresinhas de última hora, apenas a execução milimétrica do que foi acordado no papel. E é exatamente aqui que a

[4:04] gente percebe o quão genial essa estrutura é. O site tem uma vida dupla perfeitamente equilibrada. Ele é construído de forma idêntica tanto para visitantes humanos quanto para agentes autônomos de IA. Então, enquanto nós navegamos pela HTML e curtimos um design limpo, os motores de busca baseados em A estão lá rodando por trás, lendo arquivos super estruturados como LMs.txt e os manifestos web MCP. Mas por que isso é tão revolucionário hoje em dia? Porque otimizar a leitura para esses agentes autônomos é a nova fronteira do SEO. é o que chamam de AE ou Aner Engine Optimization, ou seja, a plataforma inteira já nasce perfeitamente pronta paraa nova era de buscas digitais. Ponto quatro, o pipeline de agentes de IAC. Agora sim, a gente afunda na camada mais escura do iceberg. É aqui que esse repositório dá tchauzinho pro desenvolvimento tradicional e adota um fluxo de trabalho autônomo impressionante. O conceito chave nessa fase é o vibe coding, mas atenção, não

[5:05] se trata daquele mito de soltar a IA no escuro e deixar ele improvisar feito louca. Nada disso. A Ia funciona como um parceiro de programação ultra rápido que executa contratos e especificações num nível de detalhe absurdo. A criatividade estrutural e as regras vem lá daquela documentação rígida que a gente mencionou. O que a inteligência artificial traz pra mesa é apenas a execução implacável e em tempo record. E a divisão de tarefas na configuração do Cloud Code é um verdadeiro espetáculo. Funciona como uma linha de montagem de fábrica, delegando missões extremamente específicas para cinco subagentes muito especializados. Dá só uma olhada em como eles fazem isso. Tem um agente focado apenas em auditar a página, outro que cuida das correções invisíveis lá no cabeçalho do código, um terceiro só para escrever os textos focados em se, um focado exclusivamente em criar suítes de testes rigorosos e, por fim, o agente encarregado de rodar verificação de qualidade final. É eficiência operando de uma forma brilhante, quebrando um problema gigante em tarefas minúsculas e fáceis de gerenciar. Ponto C, o

[6:06] Qualigate definitivo. Subindo um pouquinho de volta pra superfície, a gente precisa falar sobre o verdadeiro leão de chácara desse código. Afinal de contas, como garantir que essa linha de montagem super rápida da IA não quebra o site inteiro? A resposta é um portão de qualidade automatizado e totalmente inflexível. Nenhum agente, seja ele humano ou inteligência artificial, pode dar uma tarefa como concluída até que o comando de validação fique 100% verde. Ele constrói o site, roda testes simulando usuários reais simultaneamente em três navegadores diferentes e exige zero, sim, zero violações de acessibilidade. Ele funciona sob o modelo fail closed. Encontrou um pequeno errinho, todo o processo para na mesma hora. É uma autoridade indiscutível. E quando esse código é finalmente aceito na brand principal, um pipeline de devop afiado entra em cena. A coisa acontece assim. Primeiro, aqueles testes super rigorosos precisam passar. Só depois disso, o sistema constrói o site, se autentica na infraestrutura de nuvem,

[7:06] joga os arquivos paraos servidores e limpa o cash antigo. Como inteligência artificial tem a capacidade de gerar código em uma velocidade insana, esse pipeline de implantação 100% automatizada, sem nenhuma mão humana no processo, é a verdadeira rede de segurança. É o que permite que toda essa agilidade chegue ao usuário final, sem quebrar absolutamente nada no meio do caminho. Ponto seis, design, silêncio e elegância. Para a nossa última etapa, vamos voltar totalmente para a superfície visual. Toda aquela disciplina formidável de engenharia nos bastidores se traduz diretamente na disciplina de design que os visitantes experimentam na tela. Dá para anar uma separação rigorosa nos ambientes visuais. A paleta do site institucional transmite uma autoridade pura através do minimalismo. Um fundo creme super calmo, uma tipografia escura cor de tinta e uma linha fininha dourada só para marcar hierarquia. Já os materiais voltados para redes sociais ganham um sistema próprio, bem mais vibrante, para capturar a atenção rápida no feed. E a regra número um é claríssima. Essas duas paletas nunca, em hipótese algumas se

[8:07] misturam. Tem uma frase que ancora perfeitamente toda a filosofia visual do projeto sem um movimento não solicitado. Na prática, isso significa um boicote total a modismos de design, como vídeos pesados de fundo, animações que ficam distraindo o leitor ou aquelas rolagens com efeitos de paralax. O foco aqui é clareza imediata e estática. E lembrando da nossa conversa sobre performance agora a pouco, tirar esses elementos pesados é exatamente o grande segredo de como o site consegue atingir aquele carregamento relâmpago de milissegundos. O movimento só aparece como uma resposta direta a uma ação do usuário, transmitindo seriedade profissional e mantendo a velocidade extrema. Tudo isso nos deixa com uma reflexão final que é simplesmente fantástica. Diante de uma máquina tão absurdamente inxuta como essa, onde a documentação dita as leis, o design tem um propósito cirúrgico e uma verdadeira equipe de subagentes de inteligência artificial escreve e testa o código, fica a provocação no ar. Será que a era do desenvolvimento web manual,

[9:09] super inchado e demorado está oficialmente com os dias contados? Projetos com essa precisão técnica e alta performance definitivamente estão apontando pro novo padrão da indústria. E aí, faz sentido? Pensem nisso.
