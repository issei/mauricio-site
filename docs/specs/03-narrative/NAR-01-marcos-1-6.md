---
id: NAR-01
titulo: Marcos Narrativos 1–6 (1982–2004)
versao: 1.0.0
status: aprovado
dominio: narrative
depende-de: [CTR-01]
consumido-por: [A4, A5, A10]
---

# NAR-01 — Marcos 1–6

## Contexto
Jogo biográfico 3D: a vida de Maurício Issei como infra de TI. Cada marco = um
quadrante do corredor + um Monolito com memória. Campos estruturais em CTR-01;
aqui: texto da memória, cenário e direção do quadrante.

## 1 · `initial_commit` (1982)
- **Texto memória:** "1982. `git init`. Primeiro boot num Brasil de TV de tubo e antena ajustada na mão. O sistema não sabia de nada — e essa era sua maior capacidade."
- **Cenário:** corredor quase vazio; grid esparso; partículas lentas. Foto: `fotos/1982.jpeg`.
- **Direção:** silêncio confortável; o jogo ensina o andar sem tutorial textual.

## 2 · `moral_kernel` (anos 80)
- **Texto:** "Sem irmãos, a imaginação rodava como processador central. Jaspion, Changeman e Kamen Rider não eram passatempo: eram firmware. Gravaram a única regra que sobreviveu a todos os updates — cair faz parte; o que conta é levantar."
- **Cenário:** wireframes de TV de tubo flutuando; torso do avatar com estática (CTR-06 v1). Foto: `fotos/infancia.png`.
- **Direção:** único quadrante com cores saturadas de infância; absorbRadius 2× visível (partículas correm para o menino).

## 3 · `first_deploy` (1998)
- **Texto:** "Aos 16, primeiro deploy em produção: auditor no Shopping Eldorado, estágio do técnico em Processamento de Dados. Ambiente real, usuários reais, zero rollback disponível."
- **Cenário:** primeiros pilares "urbanos" wireframe; trilho profissional (verde) acende pela primeira vez. Foto: `fotos/eldorado.jpg`.

## 4 · `incident_queue` (2000–2003)
- **Texto:** "8 horas por dia de fila de incidentes: gente perdida na internet discada. A descoberta que virou kernel de carreira: o problema quase nunca era técnico. Antes de resolver, escutar."
- **Cenário:** colunas de servidores; headset acoplado ao avatar (CTR-06); stress base 42 (CTR-04). Foto: `fotos/callcenter.jpg`.
- **Direção:** cadência dos cliques de teclado da chain-tecnologia no máximo.

## 5 · `parallel_overload` (2001–2005)
- **Texto:** "Dia: trabalho. Noite: Mackenzie, Sistemas de Informação. Matérias atrasadas acumulando como gargalos numa linha que não para — pagas com férias inteiras. Logística aprendida no quadro e na pele."
- **Cenário:** MERGE CONFLICT jogável — trilhos sobrepostos, zigue-zague forçado, marcadores `<<<<<<<` flutuantes (GMP-05). Sombra dupla no avatar (CTR-06 v2/v3).
- **Resolução:** ao cruzar o quadrante: `resolved: ambos. custo: férias inteiras, 5 anos.`

## 6 · `kernel_panic_2004` (abril/2004)
- **Texto (emotionalLoad 3 — decode corrompido, GMP-02):** "Abril de 2004. O host que hospedava o repositório de origem caiu. Filho único: amadureci num único ciclo. Aprendi a dirigir, vendi o carro dele, comprei o meu. A vida não esperou eu ficar pronto — e nunca espera."
- **Cenário:** o corredor escurece 60%; grid abre a PRIMEIRA fissura (`scar:opened`, scar-2004) — que fica SEM ouro. Música: gain da cadeia ativa cai 70%, sem substituta. Foto: nenhuma — o Monolito decodifica um frame preto com uma única linha de texto.
- **Direção:** o ouro de scar-2004 só chega no marco 7 (a formatura é a solda). Companion fica em silêncio neste quadrante inteiro (primeira quebra de cadência — prenúncio do Vale).

## Critérios de aceite
- [ ] Textos exibidos exatamente como especificados (revisão R1).
- [ ] scar-2004 abre em 2004 e é dourada apenas ao entrar no marco 7.
- [ ] Companion emite 0 falas dentro do quadrante 6.
- [ ] Fatos conferem com P00 §Premissas.
