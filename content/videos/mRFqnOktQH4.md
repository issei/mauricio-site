---
id: mRFqnOktQH4
slug: como-os-agentes-de-ia-quebraram-o-git-na-anthropic-o-caso
status: publicado
temas:
  - engenharia-agentica
  - especificacao-e-desenvolvimento
resumo: O vídeo mostra como o volume de código gerado por agentes de IA sobrecarregou o controle de versão tradicional. Conta como a Anthropic criou o Scion, um sistema próprio, e como a Cloudflare respondeu com o Artifacts. Termina com o próximo gargalo, a revisão e a aprovação do código.
fontes:
  - url: https://www.anthropic.com/engineering/redesigning-source-control
    titulo: Redesigning source control at Anthropic
    sustenta: A Anthropic passou de cerca de 2.500 mudanças integradas por dia em maio de 2026 para mais de 30.000 por dia em setembro e criou o Scion, com changesets e merges no servidor, sem cópia completa do repositório em lugar nenhum, 200 vezes menor em CPU e memória que a infraestrutura anterior.
    verificada: true
revisado_por: Maurício Yokoyama Issei
revisado_em: 2026-11-19
youtube:
  titulo: Como os Agentes de IA Quebraram o Git na Anthropic | O Caso Scion
  publicado_em: 2026-10-19
  duracao: PT7M7S
  descricao: |-
    O desenvolvimento agêntico de software está redefinindo os limites da infraestrutura de engenharia. Quando agentes autônomos de IA passaram a criar e modificar código de forma ininterrupta na Anthropic, as ferramentas projetadas para a escala humana atingiram um ponto de inflexão. 

    Neste vídeo, analisamos detalhadamente como a taxa de alterações integradas (*merges*) no monorepo da empresa saltou de **2.500 para mais de 30.000 por dia** em apenas quatro meses, tornando inviável o uso do Git tradicional. Entenda a arquitetura do **Scion**, um sistema de controle de versão centralizado e orientado a serviços construído em apenas 5 meses por uma equipe de 7 engenheiros com o auxílio massivo do próprio Claude.

    ---

    📌 **O que você vai aprender neste vídeo:**

    • **O Limite Físico do Git:** Por que premissas como suporte *offline* e cópias completas do repositório se tornam gargalos em ambientes com agentes sempre *online*.  
    • **Mudanças Arquiteturais do Scion:** A substituição de *commits* tradicionais por *changesets* em Write-Ahead Log (WAL) no Cloud Spanner e o fim da manutenção de pacotes (*packfiles*).  
    • **Assimetria Cliente-Servidor:** Como descarregar o cálculo de dados derivados (*blame*, histórico) para o servidor viabilizou *checkouts* virtuais e sparsos em alta velocidade.  
    • **Métricas de Desempenho Verificáveis:** Redução de **200 vezes** na pegada de infraestrutura (CPU/memória), taxa de acerto de *cache* superior a 99% e velocidade de *checkout* caindo de minutos para segundos.  
    • **Governança com o Antique:** A transição para a *revisão baseada em intenção*, a aplicação de restrições semânticas e o papel indispensável dos engenheiros humanos como *guardrails*.  
    • **O Git Tornou-se Obsoleto?** Uma análise crítica sobre por que o Scion **não é um substituto universal para o Git** e quais critérios arquitetônicos avaliam a adoção corporativa.  

    ---

    📚 **Fontes e Referências:**
    • Post Oficial de Engenharia da Anthropic: *"Redesigning source control at Anthropic"* (Outubro de 2026).  : https://www.anthropic.com/engineering/redesigning-source-control

    • Estudo comparativo com o Google Piper e Meta Sapling.  
    https://engineering.fb.com/2022/11/15/open-source/sapling-source-control-scalable/
    https://dl.acm.org/doi/10.1145/2854146

    ---

    #EngenhariaDeSoftware #ArquiteturaCorporativa #IA #Anthropic #Scion #Git #DevOps #Claude #SoftwareEngineering #Monorepo
  miniatura: https://i.ytimg.com/vi/mRFqnOktQH4/maxresdefault.jpg
  visualizacoes: 91
  playlists: []
  legenda: automatica
  links_descricao:
    - https://www.anthropic.com/engineering/redesigning-source-control
    - https://engineering.fb.com/2022/11/15/open-source/sapling-source-control-scalable/
    - https://dl.acm.org/doi/10.1145/2854146
  coletado_em: 2026-11-07T22:16:07Z
---

## A era humana

O controle de versão que a indústria usou por décadas não está aguentando o peso da automação [00:00]. Os agentes de IA estão forçando um redesenho dessas ferramentas [00:22].

O vídeo cita Brian Berliner, num artigo de 1990 sobre o CVS: o problema era como lidar com vários desenvolvedores mudando o mesmo arquivo ao mesmo tempo [00:43]. O CVS e, depois, o Git nasceram para resolver essa colaboração em escala humana [01:05]. Mas essa arquitetura dependia de um limite invisível: o ritmo humano. Pessoas param, dormem e digitam devagar [01:05].

## Os agentes quebram o sistema

A Anthropic sentiu isso nos próprios números [01:26]. Em maio de 2026, a empresa integrava cerca de 2.500 mudanças por dia. Quatro meses depois, em setembro, eram mais de 30.000 por dia, impulsionadas por agentes de IA [01:48]. O resultado foi uma sobrecarga no Git tradicional e uma integração contínua transformada em gargalo [01:48].

Os agentes não param no fim de semana, atacam vários problemas ao mesmo tempo e produzem um volume que esmaga fluxos feitos para pessoas [02:08]. O problema principal não é o tamanho do repositório, mas a taxa de mudanças [02:08].

O vídeo cita uma observação da comunidade: a revisão de código funcionava porque havia uma pessoa para defender e explicar as decisões [02:28]. O agente quebra essa premissa, porque muitas vezes entrega só o resultado. Sem a proveniência, a história do porquê, a revisão fica quase impossível [02:49].

## A Anthropic e o Scion

Para resolver a crise, a Anthropic construiu um sistema próprio, o Scion [03:12]. Em vez do commit enviado pelo cliente, o Scion usa changesets e faz o commit e o merge no servidor [03:12]. A arquitetura é distribuída, e nenhum servidor guarda uma cópia completa do repositório [03:12]. A solução não foi uma ferramenta de IA melhor, mas uma nova forma de guardar o código [03:33].

Segundo o vídeo, a infraestrutura do Scion consome cerca de 200 vezes menos memória e CPU que a anterior [03:33]. Isso rendeu um ganho estimado de 25% de capacidade de CPU e levou de minutos para segundos o tempo da integração contínua [03:54].

## A Cloudflare e o Artifacts

A Cloudflare enfrentou a mesma crise e respondeu com o Artifacts [04:16]. É um sistema de arquivos distribuído, com histórico e estado, que fala o protocolo Git nativamente [04:16]. Ele usa Durable Objects para manter milhares de instâncias isoladas, com um motor Git compilado em WebAssembly [04:16]. Assim, cria repositórios na hora para os agentes, sem que as pessoas mudem de ferramenta [04:37].

Para repositórios pesados, o ArtifactFS evita esperar o clone completo [04:37]:

1. Começa com um clone sem blobs, só com a árvore de arquivos [04:58].
2. Baixa o conteúdo real em segundo plano [04:58].
3. Dá prioridade aos manifestos de código, antes de imagens e binários [04:58].

Com isso, o agente começa a ler e escrever na hora [05:19].

## O próximo gargalo

Gerar código rápido não garante entregar o produto mais rápido [05:19]. Com agentes, escrever o código quase não leva tempo, mas o gargalo só mudou de lugar: as filas de revisão e de aprovação passam a travar a equipe [05:39].

Os novos pontos de pressão são [05:59]:

- a capacidade da integração contínua [05:59];
- a velocidade dos testes [05:59];
- os conflitos de merge, quando muitos agentes mexem no mesmo repositório [05:59];
- a segurança, porque uma falha nos controles de acesso cresce na velocidade do código que entra [06:20].

A pergunta final: se os agentes passarem a gerar 30.000 mudanças por dia, quem ou que sistema vai revisar, validar e aprovar esse código com segurança [06:40]?

## Perguntas frequentes

### Por que os agentes de IA sobrecarregam o Git?

Pelo ritmo: os agentes geram mudanças sem parar e ao mesmo tempo, e o problema é a taxa de mudanças, não o tamanho do repositório [02:08].

### O que o Scion muda em relação ao Git?

Faz o commit e o merge no servidor, com changesets, e nenhum servidor guarda uma cópia completa do repositório [03:12].

### Qual é o próximo gargalo?

A revisão e a aprovação do código, que precisam acompanhar o volume que os agentes geram [05:39].
