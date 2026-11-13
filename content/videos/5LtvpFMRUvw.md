---
id: 5LtvpFMRUvw
slug: engenharia-por-tras-da-boutique-empresarial-arquitetura
status: publicado
temas:
  - engenharia-agentica
  - especificacao-e-desenvolvimento
resumo: "O vídeo mostra a engenharia por trás do site da Boutique Empresarial: um funil único de conversão, uma base estática e rápida, desenvolvimento orientado por especificação, subagentes de IA, um quality gate que bloqueia qualquer erro e um design sem movimento desnecessário."
fontes:
  - url: https://github.com/issei/boutiqueempresarial-site
    titulo: Repositório no GitHub
    sustenta: "A estrutura do projeto: especificações em docs/specs, subagentes do Claude Code e o comando npm run gate."
    verificada: true
  - url: https://boutiqueempresarial.com.br/
    titulo: Site oficial da Boutique Empresarial
    sustenta: "O funil único: página do diagnóstico gratuito e formulário de sete etapas."
    verificada: true
revisado_por: Maurício Yokoyama Issei
revisado_em: 2026-11-12
youtube:
  titulo: "Engenharia por Trás da Boutique Empresarial: Arquitetura Estática, SDD e Desenvolvimento Agêntico"
  publicado_em: 2026-09-21
  duracao: PT9M32S
  descricao: |-
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
  miniatura: https://i.ytimg.com/vi/5LtvpFMRUvw/maxresdefault.jpg
  visualizacoes: 227
  playlists: []
  legenda: automatica
  links_descricao:
    - https://boutiqueempresarial.com.br/
    - https://github.com/issei/boutiqueempresarial-site
  coletado_em: 2026-11-07T22:16:07Z
---

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
