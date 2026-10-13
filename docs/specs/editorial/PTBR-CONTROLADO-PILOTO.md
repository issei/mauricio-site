# PT-BR Controlado — avaliação e piloto

> Data: 2026-10-13. Página piloto: `src/devops-salesforce.html`.
> Skill avaliada: `ptbr-controlado` (conta do autor; v0.1.0 das regras e do script).
> Status: **piloto aberto para validação do autor.** Nenhuma outra página foi alterada.

## 1. O que a skill faz

Revisão de texto em português com regras de linguagem controlada (inspiradas no
ASD-STE100 e na ISO 24495-1), em três perfis: Editorial, Técnico e Híbrido. O princípio
que a separa de uma "revisão de estilo" é o de **corrigir só o demonstrável**: cada
alteração aponta uma regra (B0–B7) e um efeito sobre a compreensão, e o trecho sem
problema fica idêntico. Protege código, identificadores, números, qualificadores e voz
autoral.

Traz um script determinístico (`verificar.py`) que só **sinaliza candidatos** (siglas sem
definição, frases longas, termos vagos em frases normativas, mistura de palavras
normativas) e um modo `--comparar` que confere se o conteúdo protegido, os números e os
qualificadores do original continuam na revisão.

## 2. Como ela se encaixa no que o site já tem

| Já existe | Faz | Relação com a skill |
| :--- | :--- | :--- |
| Camada editorial (`EDITORIAL-LAYER.md`) | orientação de entrada: tese, formato, rotas | **ortogonal**: a camada não toca a prosa; a skill só toca a prosa |
| Agente `tone-reviewer` | tira hype e marketing ("engenharia, não marketing") | **complementar**: tom × clareza; nenhuma regra da skill pede adjetivo ou promessa |
| Revisões editoriais manuais (ex.: `Vibe-Spec-ing/revisao-editorial-2026-10-11.md`) | diagnóstico e correção página a página | a skill é o mesmo método, com regras nomeadas e conferência mecânica |
| Gêmeo `/en/` (Argos, NMT local) | tradução automática do PT | **beneficiado**: frase ambígua em PT vira frase errada em EN (ver §3, item 1) |

Conflitos encontrados: nenhum de regra. Dois riscos operacionais, na §5.

## 3. Piloto — o que mudou em `devops-salesforce`

Perfil **Híbrido** (guia prático com passos, comandos e argumentação). Intervenção
**mínima**: só severidade Média ou acima; o resto ficou como sugestão.

| # | Regra | Sev. | Antes | Depois |
| :--- | :--- | :--- | :--- | :--- |
| 1 | B5 / B2.04 (sentido invertido) | Crítica | "trata a IA como … júnior, **sem lhe dar** o que um desenvolvedor júnior nunca teria — acesso direto…" | "…júnior, **mas lhe dá** o que um desenvolvedor júnior nunca teria: acesso direto…" |
| 2 | B3.04 (um conceito, um termo) | Média | "agiêntica" (3×) | "agêntica", grafia usada no resto do site |
| 3 | regência | Média | "os dois acessos que ela precisa" | "os dois acessos de que ela precisa" |
| 4 | B3.01 (calque do inglês) | Média | "decisões de negócio que não são dela para tomar" | "decisões de negócio que não cabe a ela tomar" |
| 5 | B5 (relação lógica) | Média | "eliminar as perguntas que a IA teria que adivinhar sozinha" | "para que a IA não precise adivinhar as respostas sozinha" |

O item 1 é o achado que justifica a skill: a frase dizia o contrário do argumento da
seção (o erro é **dar** acesso direto, não negá-lo), e o tradutor reproduzia a inversão
no `/en/` ("without giving it…"). Depois da correção, o inglês diz "but gives it…".

`verificar.py --comparar --estrito` sobre o texto visível: conteúdo protegido preservado,
qualificadores e números do original presentes.

### 3.1 Sinalizações descartadas (27 do script)

- **Frases longas (14):** todas legíveis; o comprimento vem de enumerações e apostos com
  função. Comprimento sozinho não é erro (regra B1.03).
- **Siglas (10):** SOQL, SOAP, JVM são vocabulário do público declarado (devs Salesforce);
  MRR é o próprio exemplo de jargão da empresa; ETH é nome próprio; COMO/QUÊ/AGENTS são
  ênfase tipográfica e nome de arquivo, não siglas.
- **Palavras normativas (1):** "precisa / é necessário" não é especificação com níveis de
  obrigação; não se aplica B6.04.

### 3.2 Sugestões não aplicadas (para o autor decidir)

- "Instalar Java antes do resto é **a causa mais comum** de ambientes quebrados" — afirmação
  de frequência sem fonte (B5.02). Ou citar a origem, ou "uma causa comum".
- "Esse par … é **o que torna seguro** delegar deploys" — absoluto (B5.01); o restante do
  site prefere "reduz o risco".
- "Em 2024 e 2025, **a indústria inteira** passou pelo mesmo ciclo" — alcance (B5.03).

## 4. Recomendação

Usar, com escopo restrito:

1. **Onde:** páginas de guia, manual, proposta e case técnico (perfil Técnico/Híbrido),
   onde uma frase ambígua vira instrução errada — e vira tradução errada no `/en/`.
2. **Onde não:** ensaios e narrativas pessoais (`artifice`, `life`, `devin` em parte),
   em que a voz autoral pesa mais; ali só o modo Diagnóstico, sem reescrever.
3. **Como:** intervenção mínima, uma página por PR, com a tabela de alterações no PR.
   Absolutos e afirmações sem fonte vão para o autor, não para a correção automática.
4. **Não** colocar o `verificar.py` no `npm run gate`: ele sinaliza candidatos, e 27 de 27
   sinalizações do piloto foram descartadas ou rebaixadas pela leitura. Como catraca,
   viraria ruído.

## 5. Riscos

- **Churn no `/en/`.** O Argos retraduz o arquivo inteiro; o cache só reaproveitou 39 de
  299 segmentos, e trechos não editados mudaram de redação (alguns melhores, alguns piores:
  "deployed" → "implanted"). Cada página revisada gera um diff grande no espelho. Não é
  regressão da skill; é do tradutor, e vale saber antes de estender a 30 páginas.
- **Modelo de tradução fora do container.** O ambiente de nuvem não alcança o servidor
  do Argos; o piloto usou o modelo `pt→en 1.9` já instalado na máquina do autor.
- **Gate estático já vermelho no `main`.** `verify-a11y.py` acusa 22 erros com teto 21 sem
  nenhuma alteração deste piloto (confirmado com `git stash`). Não é deste PR.
