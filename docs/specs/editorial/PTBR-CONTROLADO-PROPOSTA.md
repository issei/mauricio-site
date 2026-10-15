# PT-BR Controlado — revisão de `src/proposta.html`

> Data: 2026-10-15. Pedido do autor: "Aplique a skill pt-br controlado na página proposta.html". Atualizado com as respostas do autor às perguntas O4 e O5.
> Skill: `ptbr-controlado` v0.1.0. Método igual ao do piloto: [`PTBR-CONTROLADO-PILOTO.md`](PTBR-CONTROLADO-PILOTO.md).

## Contexto

- **Perfil:** Editorial. É uma proposta executiva, que pede uma decisão (patrocinar um diagnóstico) e não tem passos nem comandos.
- **Público:** executivo das áreas Comercial e Tecnologia.
- **Risco de leitura errada:** médio. O texto define critérios para avançar entre etapas e indicadores do piloto.
- **Intervenção:** mínima. Só severidade Média ou acima e confiança Alta ou Média viraram correção.
- **Sem `/en/`:** a página é executiva e não listada (`scripts/i18n/assets.py`), então não tem gêmeo em inglês. O tradutor não foi acionado.

O texto já estava escrito em linguagem simples (frases curtas, termos explicados na primeira ocorrência, ressalvas explícitas). Por isso as correções são poucas.

## Correções aplicadas

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| O1 | B2.01 Pronome com antecedente ambíguo | Média | Alta | "Para saber se pode oferecer um produto àquela empresa, **ele** precisa conferir…" | "…, **o comercial** precisa conferir…" | O antecedente de "ele" estava em outro card. Lido sozinho, o card não dizia quem confere. |
| O2 | B3.04 Um conceito, um termo | Média | Média | "…tempo… que poderia ir para a conversa com **o cliente**." | "…para a conversa com **a empresa**." | A página define *prospect* como "a empresa que ainda não é cliente". Chamar o mesmo interlocutor de "cliente" contradiz a definição. "A empresa" é o termo dos três cards anteriores. |
| O3 | B4.05 Lista para comparar · B1.03 Frase sobrecarregada | Média | Alta | "O que o diagnóstico verifica": uma frase de 63 palavras com seis itens separados por ponto e vírgula, metade em forma de "se…", metade em forma de substantivo | Lista com os mesmos seis itens e as mesmas palavras | As duas subseções vizinhas ("O que se pede", "O que o diagnóstico entrega") já são listas. Os itens são o checklist do diagnóstico, e na lista o leitor consegue conferir um por um. |

| O4 | "Critério para avançar: adoção pelo comercial e **qualidade das informações confirmadas**." | B2.06 Escopo de modificador | Alta | Média | Qual das duas leituras vale? (a) avançar exige que a qualidade das informações tenha sido confirmada; (b) avançar exige qualidade nas informações que o comercial confirmou. |
| O5 | Indicador "Adoção": "Quantos usuários do piloto **passam a usar** no dia a dia." | B5.06 Precisão · B2.04 Escopo | Média | Média | Usar o quê? O verbo não tem objeto. |

`verificar.py --comparar --estrito` sobre o texto visível: conteúdo protegido preservado; qualificadores e números do original presentes.

## Respostas do autor (O4 e O5 aplicadas)

O autor respondeu às duas perguntas em 2026-10-15 (thread do projeto, 14:31 UTC):

- **O4:** leitura (a). A qualidade das informações precisa ter sido confirmada. Texto aplicado: "adoção pelo comercial e confirmação de que a qualidade das informações foi verificada."
- **O5:** adotada a sugestão de objeto ligada à nova solução, o contexto reunido no fluxo. Texto aplicado: "Quantos usuários do piloto passam a usar **esse contexto** no dia a dia."

Os dois pontos ficam fora da lista de correções porque vieram de decisão do autor, não da revisão automática.

## Sugestões (severidade Baixa, não aplicadas)

- **Princípio 4**, "Qualidade e acesso aos dados **vêm antes**": antes de quê? (B5.04). A frase seguinte ("São pré-condição, não uma etapa posterior") resolve em parte.
- **Etapa 2** junta três ideias num parágrafo: o objetivo, a dor da equipe de campo e a hipótese de priorização (B4.06). Pode virar dois parágrafos.
- **"O que se pede"** não tem prazo (B7.04). Mantido assim de propósito: a spec da página (D-1) decidiu terminar o pedido só em texto, e um prazo inventado seria pior.

## Sinalizações do script descartadas (4)

As quatro são frases longas (B1.03). Três são títulos que o extrator juntou ao parágrafo seguinte, então não são frases longas de verdade. A quarta (63 palavras) foi confirmada e corrigida como O3.

## Limitações

- A revisão foi feita por um modelo de linguagem e não substitui a leitura do autor. O script não detecta todas as ambiguidades.
- Não houve teste com leitores do público-alvo.
