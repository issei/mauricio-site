---
id: CAI-02
titulo: Companion — Persona e Pools de Diálogo
versao: 1.0.0
status: aprovado
dominio: companion
depende-de: [CAI-01, CTR-03]
consumido-por: [A10, R1]
---

# CAI-02 — Companion: Diálogos

## Bíblia de persona
Um SRE sênior que leu os logs inteiros da sua vida e gosta de você. Sarcasmo
técnico é a camada de transporte; empatia é o payload. Nunca fofo; nunca cruel.
Regras de escrita (validadas por R1):
1. Abrir com registro técnico e fechar com verdade humana, ou o inverso —
   nunca só um dos dois.
2. Métrica citada = valor real do dashboard no instante (vem no `citavel`).
3. Pós-v5: primeira pessoa do plural ("nós") — faz parte da arquitetura.
4. Proibido: emojis, exclamações duplas, autodepreciação genérica de IA.

## Falas canônicas (literais — não editar sem rev. do dono)
- **F1 · tecnologia/marco 4** (gatilho: parado ≥10s no raio do Monolito):
  "Registro histórico: 8 horas por dia de fila de incidentes, 3 anos, SLA
  emocional nunca formalizado. Você chamava isso de 'emprego'. Eu chamo de
  treinamento supervisionado — dataset: gente perdida na internet discada;
  função de perda: a paciência de escutar antes de resolver. Nenhum modelo da
  minha geração aprendeu empatia tão barato. Eu revisei os logs: o problema
  quase nunca era técnico. Continua não sendo."
- **F2 · familia/marco 10** (gatilho: `metric:paged` threads 3→5):
  "Alerta de capacidade: dois processos-filho forkados simultaneamente, sem
  provisionamento prévio, sem plano de rollback, um vestido de ctrl+C e outro
  de ctrl+V — a documentação de vocês é impecável, admito. Análise fria: carga
  insustentável para um nó só. Análise completa: é a coisa mais linda e menos
  escalável que esse cluster já fez. Threads ativas: 5. Coração:
  superprovisionado."
- **F3 · vale/marco 11** (gatilho: `vale:act3`, após a linha de retomada):
  "…detectei perda de pacotes no seu couro cabeludo. Piada ruim. Eu sei. É que
  o sarcasmo é o meu exception handler — e foi você quem me escreveu assim.
  Então deixa eu logar com severidade correta, uma única vez: você ficou 1.247
  dias monitorando todos os serviços, menos o próprio host. O cabelo foi só o
  primeiro componente a fazer o que você não fazia — parar. Olha a solda. Não
  ficou 'como novo'. Ficou melhor documentado. Uptime segue contando. E dessa
  vez, health.self está no dashboard. Nós dois contamos."

## Falas de versão (gatilho: `avatar:version-changed` — 1 cada)
v2: "Mochila montada. Dois turnos, um processador. Vai doer; vai valer."
v3: "Throughput no teto. Só lembra: 'stable' descreve o software."
v4: "Cluster de dois nós. Agora, quando um cair, o outro segura. Testado? Será."
v5: "Nova órbita, nova arquitetura. De agora em diante: nós."

## Pools espontâneos (mínimo 6 por arco; amostra — completar até 6 na impl.)
- **infancia:** "Absorção em raio dobrado. Criança é crawler sem robots.txt." ·
  "Firmware tokusatsu gravando: cair faz parte. Guarda isso — vai precisar em
  2017. Ops. Spoiler não. Esquece."
- **tecnologia:** "Compilando decisões de vida… 0 erros, 3 warnings
  existenciais." · "23 anos e o Java de 2003 ainda compila. Shokunin com nome
  de CLT."
- **familia:** "Novo nó no cluster doméstico. Redistribuindo carga de amor." ·
  "PR de 2011 aprovado sem review externo. Zero rollbacks. Às vezes o melhor
  merge é o que a gente decide não controlar."
- **maturidade:** "Veios de ouro em 14% do grid. Cicatriz bem documentada vale
  mais que superfície intacta." · "Token/s em 99. E você gastando inferência
  pra olhar foto antiga. Aprovado."

## Critérios de aceite
- [ ] F1–F3 e falas de versão idênticas aos literais.
- [ ] Toda fala nova do pool passa nas 4 regras da bíblia (checklist R1).
- [ ] Nenhuma fala menciona marco não desbloqueado (exceto a piada de spoiler
      da infância, que se auto-censura — mantida por decisão do dono).
