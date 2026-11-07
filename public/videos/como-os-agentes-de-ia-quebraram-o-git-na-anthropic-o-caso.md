# Como os Agentes de IA Quebraram o Git na Anthropic | O Caso Scion

Vídeo de Maurício Yokoyama Issei, publicado em 19 de outubro de 2026 (7 min 7 s).
Assistir: https://www.youtube.com/watch?v=mRFqnOktQH4

## Sobre o vídeo

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

## Transcrição

_Transcrição automática, não revisada._

[0:00] A gente tá vendo um abalo sísmico no mundo do desenvolvimento de software agora mesmo. E olha, não é só sobre a velocidade absurda com que o código é escrito hoje em dia, é sobre algo muito mais profundo. A própria infraestrutura básica, aquelas ferramentas de controle e diversão que a gente usou por décadas para armazenar e gerenciar código simplesmente não tão aguentando mais o peso da automação. Nossa análise de hoje vai focar exatamente nisso. Como os agentes de inteligência artificial estão forçando a indústria inteira a redesenhar do zero o controle diversão. Ferramentas que eram o nosso porto seguro, de repente ficaram pequenas demais. Bom, a nossa pauta de hoje passa por cinco pontos rápidos. Um, a era humana. Dois, agentes quebram o sistema. 3. Antropic repensa o controle diversão. Quatro. Cloudflir constrói para agentes e cinco, o próximo gargalo de desenvolvimento. A era humana. Tem uma citação do Brian Berliner de um artigo clássico de 1990 sobre o CVS que é super reveladora. Ele

[1:02] basicamente questionava como lidar com vários desenvolvedores alterando o mesmo arquivo ao mesmo tempo. Foi para resolver esse problema de colaboração em escala humana que o CVS e mais tarde o queridinho Git nasceram. A ideia era paralelizar as coisas. Mas olha só o detalhe, toda essa arquitetura dependia de um fator limitante, invisível, que era o nosso próprio ritmo. Nós, humanos, precisamos de pausas pro café, precisamos dormir e a nossa velocidade de digitar código tem um limite biológico claro. E é aí que a gente entra no ponto dois, agentes quebram o sistema. A Antropic, que é uma das gigantes de IA, sentiu isso na pele e os números internos deles ilustram essa quebra brilhantemente. Em maio de 2026, a empresa lidava com uns 2.500 merds por dia. Tranquilo, né? Mas apenas 4 meses depois, em setembro, esse volume disparou para mais de 30.000 merds diários. É uma explosão colossal, impulsionada 100% por agentes de IA,

[2:02] gerando código sem parar. O resultado direto disso é uma sobrecarga massiva no Git tradicional. transformando a integração contínua num gargalo assustador. O X da questão é que o desenvolvimento na escala de agentes não tem botão de pausa. Agentes de software não tiram folga no fim de semana. Eles conseguem atacar múltiplos problemas de uma vez só e produzem um volume tão massivo que esmaga qualquer fluxo de trabalho desenhado pros limites humanos. O problema principal não é nem o tamanho do repositório em si, mas a taxa insana de mudanças despencando no servidor a cada segundo. O engenheiro Adam Lewis matou a charada lá na comunidade dev com essa frase. No modelo antigo, uma revisão de código só funcionava porque tinha um humano ali para defender e explicar as decisões ao longo do tempo. O agente de Iá quebra exatamente essa premissa. Ele muitas vezes só entrega o prato feito. Se a gente só rastreia o artefato final e perde a proveniência, que é a história do por aquilo foi feito, a revisão de código vira uma missão quase impossível. É literalmente como tentar entender a história de um

[3:04] livro lendo só a última página, com um meio inteiro arrancado. O que nos leva ao ponto três, a Anthropic repensa o controle diversão. Para resolver essa baita crise de infraestrutura, a Anthropic construiu um sistema sob medida chamado Son. Eles jogaram fora várias regras básicas do fluxo convencional. Nadaquele esquema tradicional de commit enviado pelo cliente. O son usa change sets e faz as operações de commit e merge inteiramente lá do lado do servidor. Além disso, a arquitetura virou algo distribuído, onde nenhum servidor sozinho guarda uma cópia completa do repositório. O mais fascinante é que a solução deles não foi criar ferramentas melhores de IA, mas sim reinventar a base de como o código é armazenado. E a eficiência que eles conseguiram com isso é de cair o queixo. A infraestrutura do Son é umas 200 vezes menor em consumo de memória e CPU do que o método anterior. Na prática, isso rendeu um ganho estimado de 25% na capacidade total de CPU e de quebra derrubou o tempo de integração contínua

[4:05] de longos minutos para meros segundos. Construir um controle de versão que já nasce pensado para agentes não só destrava o fluxo, mas traz uma economia de recursos gigantesca. Avançando pro nosso ponto 4, Cloud Flare constrói para agentes. A Cloud Flare deu de cara com a mesma crise da indústria e respondeu com o artefacts. A grande sacada deles foi criar um sistema de arquivos distribuído que permite viagens no tempo e guarda estado, mas que fala o protocolo Git nativamente. Eles usaram durable objects para manter milhares de instâncias rodando isoladas. Tudo isso alimentado por um motor git compilado em Web assembly. Juntando essas peças, eles conseguem criar repositórios instantâneos. junto com os agentes de IA, sem exigir que as pessoas mudem a ferramenta padrão que já usam. Mas e quando o repositório é muito pesado? Para não demorar uma eternidade clonando tudo, eles criaram o Artifact FS, que tem um truque genial. O processo começa com um clone sem blobs, buscando só a árvore, o esqueleto dos arquivos. Daí

[5:05] ele vai hidratando, que é baixando o conteúdo real de forma simultânea lá no fundo. E o pulo do gato. O sistema prioriza baixar os manifestos de código antes de arquivos pesados de imagem ou binários. Com isso, o agente de IA pode começar a ler e escrever na mesma hora, poupando milhares de horas em inicialização de sandbox. Finalmente chegamos ao ponto C, o próximo gargalo de desenvolvimento. Se a gente colocar o fluxo tradicional lado a lado com o fluxo de agentes, a verdade nua e crua aparece. Gerar código super rápido não garante uma entrega mais rápida do produto final. No modelo antigo, a gente gastava um tempão só digitando. Agora, com os agentes, a etapa de escrita não leva quase nada. Mas o gargalo não evaporou, ele só mudou de lugar. Se todo o resto em volta da escrita de código não acompanhar o ritmo, as filas infindáveis de revisão e aprovação vão ser o verdadeiro muro de tijolos que paralisa a equipe de engenharia. Para quem acompanha o ritmo da indústria, estes são os novos pontos

[6:06] de pressão que a gente tem que monitorar de perto. Nossa integração contínua dá conta do recado? Os testes conseguem rodar rápido o suficiente? Imagina a dor de cabeça com o salto absurdo de conflitos de MD quando um batalhão de agentes resolve mexer no mesmo repositório. Sem falar no mais crítico, a segurança. Com código jorrando para dentro do sistema o tempo todo, qualquer falha nos controles de acesso ganha proporções gigantescas numa velocidade assustadora. E tudo isso deixa a gente com uma provocação final bem pesada. O desenvolvimento de software chegou num nível de automação de produção que berá a ficção. Mas digamos que a infraestrutura se resolva e os agentes passem a cuspi com sucesso 30.000 médias num único dia. Quem ou que tipo de sistema vai ser capaz de revisar, validar e aprovar todo esse oceano de código com segurança? Deixo essa pergunta no lar pra gente pensar, porque essa, sem dúvida, é a próxima grande fronteira que a engenharia de software vai ter que encarar.
