# LifeOS / Terminal Evolutivo
## Game Design Document & Roteiro — Ambientação, Level Design e UX/UI

**Versão:** 1.0.0-draft · **Data:** 2026-07-04
**Gênero:** Narrativa interativa 3D contemplativa (browser, sem build step)
**Referências de tom:** Citizen Sleeper (vulnerabilidade sistêmica), Inscryption (a interface É o mundo), Device 6, Her Story
**Stack canônica:** Three.js r167 + Tone.js 14.8 + Web Audio, ES Modules via CDN
**Protagonista:** Maurício Yokoyama Issei (1982–2026) — Tech Lead, pai, sistema em produção há 44 anos

---

## 1. Sinopse da Experiência

> **Elevator pitch:** Você não joga um herói. Você audita um sistema vivo que está em produção desde 1982 — e descobre que os crashes mais graves dele não foram corrigidos: foram **soldados com ouro**.

O jogador acorda dentro de um terminal CRT. Não há menu, não há classe de personagem, não há HP. Há um prompt, um corredor de wireframe verde-fósforo se perdendo no escuro, e um dashboard de observabilidade no canto da tela informando que o sistema diante de você tem **uptime de 44 anos, zero downtime total — e um histórico de incidentes que nenhuma retrospectiva cobriu inteiro**.

O sistema chama-se `lifeos.issei`. Ele nasceu num Brasil de TV de tubo, bootou com imaginação como processador central, escalou de auditor de shopping a arquiteto de sistemas de IA, forkou três processos-filho e sobreviveu a um kernel panic em 2004 e a um memory leak que, em 2017, começou a derrubar componentes físicos do próprio hardware.

O jogador é o **SRE dessa vida**: caminha pelo corredor do tempo como quem lê um `tail -f` de 44 anos, decodifica Monolitos de memória corrompida, resolve merge conflicts entre os dois branches que nunca pararam de competir pelo mesmo recurso finito — tempo e atenção — e assiste, em telemetria real, o que acontece com as métricas de um homem quando o pai morre, quando os gêmeos chegam, quando o cabelo cai.

A tese do jogo é a inversão da estética glitch: **em todo jogo, o glitch é o erro; aqui, o glitch consertado com ouro é a feature mais valiosa do sistema.** Kintsugi como patch note. Bambu como estratégia de deploy. Shokunin como loop de gameplay.

Não há condição de derrota. Há apenas a pergunta que o terminal faz ao final, quando o cursor volta a piscar:

```
$ system.status
> UPTIME: 44y. FRACTURES: 3 (gold-filled). THREADS: 5. STATUS: em produção.
> A caminhada continua. _
```

---

## 2. Direção de Arte — O Contraste Wireframe × Orgânico

### 2.1 Regra base: o mundo é frio por padrão

O ambiente-base herda o life3d_v2: grid Tron/Matrix em GLSL, partículas de glifos hexadecimais, pós-processamento CRT (curvatura, aberração cromática, scanlines, vinheta), paleta por arco (`ARC_ACCENT`: infância verde-limão, tecnologia verde-menta, família rosa-neon, maturidade ciano). Tudo é matemático, procedural, sem textura importada. **Este é o mundo como o protagonista o via: infraestrutura, métricas, throughput.**

### 2.2 A invasão orgânica: quando a vida fura o wireframe

Os três conceitos japoneses não são "temas decorativos" — são **três shaders de intrusão** que corrompem/curam o terminal em momentos específicos. A regra de design é: *o elemento orgânico nunca é renderizado como asset importado; ele nasce DO próprio vocabulário visual do terminal, deformado.*

| Filosofia | Gatilho narrativo | Manifestação visual | Regra técnica |
|---|---|---|---|
| **Kintsugi (金継ぎ)** | Rupturas emocionais graves (2004, 2017) | Rachaduras reais abrem no grid e nos Monolitos; depois são **re-renderizadas em ouro metálico** (`#d9b06a → #fbf1cf`, gradiente especular animado). O ouro é a única cor do jogo fora do espectro neon — quente num mundo frio. | A rachadura é uma *deformação persistente do vertex buffer* do grid: uma vez aberta, nunca fecha. O "conserto" troca o `uColor` apenas nos fragmentos da fissura para o gradiente dourado, com glow próprio. O ouro **não remove o dano do buffer** — ele o ilumina. |
| **Bambu / Take (竹)** | Fins de ciclo, pausas que precedem crescimento (2005, 2012, 2018) | Colmos de bambu wireframe crescem *através* do chão nas bordas do corredor — mesma malha de linhas do grid, mas verde-orgânico (`#7aa048`) e com **nós dourados** (o kintsugi vira junta estrutural). Crescem por etapas, nunca contínuos: sobem, param num nó, engrossam, seguem. | Geometria procedural (cilindros segmentados). A animação de crescimento é *discreta por nó* — nunca um scale linear. Cada nó novo emite um pulso no grid, como um commit. |
| **Shokunin (職人)** | Permanente — é o loop de gameplay | Não tem forma própria: é a **repetição ritual**. O andar do avatar pulsa o grid (uWalkPulse); cada passo é um gesto de ofício. O LoC Compiled só cresce em movimento. | Shokunin é regra mecânica, não visual: *nada no jogo avança sem o gesto repetido do jogador*. Não há fast-travel gratuito — `cd <ano>` existe, mas o Companion registra: "Pulou etapas. O ofício percebe." |

### 2.3 Como o Ouro conserta o Glitch (a mecânica-símbolo)

O glitch do life3d_v2 (flash, shake, shockwave) é o vocabulário de *revelação* de memória. Nas duas fraturas biográficas (2004, 2017), esse vocabulário **quebra de verdade**:

1. **Fase de fratura:** o glitch não termina. O flash não decai; scanlines rasgam; a aberração cromática (`uAberration`) sobe 6× e *fica*; o grid perde linhas (fragmentos retornam preto); o dashboard exibe `NaN` em amostras. O jogo parece bugado de propósito — o jogador deve duvidar do próprio software.
2. **Fase de silêncio:** tudo congela exceto o cursor. É o único momento sem música (ver §6).
3. **Fase de solda:** uma linha dourada nasce no ponto exato da fissura e a percorre — lentamente, à mão, na velocidade de um artesão e não de um sistema. Onde o ouro passa, a scanline volta ao normal, a aberração cai, o grid religa — **mas a linha dourada permanece no chão dali em diante**. Todos os anos posteriores a 2017 têm veios de ouro no grid.

**Regra de ouro (literal):** o jogador que voltar a fases antigas via `cd` verá as fissuras douradas apenas se já as viveu. O corredor é o mesmo; o jogador é que não é.

---

## 3. Roteiro — Narrativa em Git Branching

### 3.1 Topologia

Dois trilhos de neon correm paralelos no chão do corredor, à esquerda e à direita do eixo central:

- **`feature/personal-lifestyle`** — trilho **rosa-neon** (`#ff77c8`). Hardware, ambiente, uptime emocional, cluster doméstico.
- **`feature/professional-stack`** — trilho **verde-menta** (`#4dff9c`). Commits, deploys, stacks, liderança.

O avatar caminha entre os dois. A distância física do avatar a cada trilho é expressiva: em fases de imersão profissional, o level design estreita o corredor pelo lado verde (o jogador *é empurrado* para perto do trabalho); em fases familiares, o rosa domina. Nos eventos de interseção, os trilhos se curvam e se tocam num **nó luminoso** exatamente sob o Monolito.

### 3.2 Grafo da vida (commit log completo)

```
v1.0.0-alpha                v2.0.0-beta        v3.0.0-stable            v4.0.0-enterprise      v5.0.0-agentic
1982 ────●──────●───────────┬──────────────────┬────────●───────────────●──────●──────●────────●──────●──── HEAD (2026)
  boot   │ anos 80          │ 2001–05          │ 2004   2005            2011   2012   2016     2017   2018
         │ tokusatsu        │ MERGE CONFLICT   │ KERNEL  merge          MERGE  fork() fork()×2  ╳╳╳╳   REBASE
         │ (código moral)   │ (estudo×trampo)  │ PANIC   diploma        wedding                 KINTSUGI onto rede/
personal ●━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━●━━━━━━━━●━━━━━━━━━━━━━━━●━━━━━━●━━━━━━●━━━━━━━━●━━━━━━━━━━━━━━▶ rosa
                            │                  │(pai: processo          └nó────┴──────┴─── aura de merge ───▶
professional  ●━━━━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━┿━ órfão herdado)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━▶ verde
              1998 eldorado │ 2000–03 callcenter · 2003 sysgen · 2005–08 telefônica · 2012–17 indra · 2017 serasa · 2018→ rede
                            └─ cherry-pick 2000→2016: "resposta a incidentes sob pressão"
```

### 3.3 As quatro operações Git como eventos jogáveis

**MERGE — 2011, `2011_merge_request` (O Casamento).**
Os dois trilhos se curvam um em direção ao outro por 20 unidades de corredor — o jogador literalmente caminha sobre a convergência. No nó, um prompt de PR sobe no CLI:

```
> PULL REQUEST #2011: merge feature/personal-lifestyle → main
> Reviewer: coração. Checks: férias vendidas ✓, bônus investido ✓, lua de mel curta porém inteira ✓
> [ENTER] para aprovar. (Este merge não tem botão de revert.)
```

Após o merge, os trilhos nunca mais se separam totalmente: seguem trançados, e uma **aura estável** acompanha o avatar (redução visível de picos de stress no dashboard — o buff de "alta disponibilidade em cluster").

**MERGE CONFLICT — 2001–2005 (Estudo × Trabalho).**
Trecho onde os dois trilhos se sobrepõem *no mesmo espaço físico*, piscando em vermelho alternado, com marcadores flutuantes de conflito em wireframe:

```
<<<<<<< feature/professional-stack
    turno_diurno: callcenter.atendimento(usuarios_perdidos_na_discada)
=======
    turno_noturno: mackenzie.sistemas_de_informacao(materias_atrasadas)
>>>>>>> feature/personal-lifestyle
```

O jogador atravessa o trecho em zigue-zague forçado (o corredor alterna qual trilho é "sólido"). A resolução não descarta nenhum lado: o commit final registra `resolved: ambos. custo: férias inteiras, 5 anos.` — otimização de processos, não escolha binária.

**KERNEL PANIC — abril de 2004 (a primeira fratura).**
Não é operação Git — é a queda do host que hospedava o repositório de origem. Ver §3.4.

**CHERRY-PICK — 2000 → 2016 (o headset vira mamadeira).**
Na fase dos gêmeos, o Companion executa visivelmente:

```
$ git cherry-pick a2003 --onto feature/personal-lifestyle
> aplicando: "triagem de incidentes simultâneos sob privação de sono"
> origem: callcenter (2000–2003) · destino: madrugada com gêmeos (2016)
> conflitos: nenhum. essa habilidade sempre foi sobre gente.
```

É o momento em que o jogo declara sua tese secundária: *nenhuma experiência profissional é só profissional.*

**REBASE — 2017–2018, `git rebase --onto rede/main` (O Recomeço).**
Após o Vale (§6), todo o histórico profissional é reaplicado sobre nova base: o corredor à frente é reconstruído em tempo real, plataforma por plataforma, cada uma nomeada com um commit antigo (`sysgen`, `telefonica`, `indra`, `serasa`) sendo "reaplicado" com hash novo e cor nova (o laranja-Rede tinge o verde-menta). O visual do avatar também é rebaseado: careca, óculos novos — mesma história, nova topologia.

### 3.4 Roteiro por beat (resumo dos 12 quadrantes)

| # | Ano | Commit ID | Branch dominante | Evento | Operação |
|---|---|---|---|---|---|
| 1 | 1982 | `initial_commit` | trunk | Boot. TV de tubo, antena na mão. | `git init` |
| 2 | anos 80 | `moral_kernel` | personal | Jaspion/Changeman como código moral: "cair faz parte; o que conta é levantar" — o **firmware** que o Kintsugi vai invocar 35 anos depois. | commit |
| 3 | 1998 | `first_deploy` | professional | Auditor no Shopping Eldorado, aos 16. Primeiro contato com produção real. | branch criado |
| 4 | 2000–03 | `incident_queue` | professional | Callcenter do provedor: 8h/dia de dor humana na fila. Aprende que o problema quase nunca é técnico. | commits diários |
| 5 | 2001–05 | `parallel_overload` | ambos | Estudo à noite, trabalho de dia. | **MERGE CONFLICT** |
| 6 | 2004 | `kernel_panic_2004` | personal | Morte do pai, em abril. Filho único. O corredor escurece; primeiro Kintsugi (a fissura fica **sem ouro** — o ouro de 2004 só é aplicado retroativamente quando o jogador atinge 2005: o diploma é a solda). | host down |
| 7 | 2005 | `graduation_delivery` | ambos | Formatura Mackenzie — "a única entrega que importava. Ele não chegou a vê-la." Primeiro bambu cresce. | merge + tag |
| 8 | 2011 | `2011_merge_request` | ambos | Casamento. Trilhos se trançam. | **MERGE** |
| 9 | 2012 | `fork_daughter` | personal | Primogênita. "O vetor de força muda de direção": a câmera isométrica inclina 4° — literalmente muda o vetor. Threads: 3. | `fork()` |
| 10 | 2016 | `fork_twins_x2` | personal | Gêmeos (ctrl+c / ctrl+v). Threads: 5. Stress: pico massivo. | `fork()` ×2 + **CHERRY-PICK** |
| 11 | 2017–18 | `kintsugi_rebase` | ambos | **O VALE** (§6): alopecia, esposa internada, colapso — e a solda de ouro. Depois, Serasa e Rede. | crash + **REBASE** |
| 12 | 2026 | `HEAD` | ambos | Legado. Bambuzal completo, veios de ouro no grid, 5 threads estáveis. O ponto único de falha virou rede. | em produção |

---

## 4. Progressão do Avatar — Versionamento Semântico

Transição **exclusivamente dirigida pela fase narrativa** (nunca escolha do jogador). Todo upgrade remove estados do nível anterior antes de aplicar os novos (o headset não sobrevive a 2003). Cada mudança de versão dispara um **changelog visível no CLI** — o corpo é documentado como software.

### v1.0.0-alpha — O Menino (1982 – fim dos anos 80)
- **Visual:** escala 0.6; blocos low-poly de cores primárias saturadas; torso com shader de estática de TV de tubo (ruído animado, referência tokusatsu). Anda com passos curtos e bounce exagerado.
- **Mecânica:** velocidade baixa, mas **raio de absorção dobrado** — partículas de dados são atraídas para ele num raio 2× maior (habilidade passiva: absorção de referências sem custo de stress).
- **Telemetria:** Stress ~4% · LoC 0 · Threads 1 · Token/s 12.
- **Changelog CLI:** `v1.0.0-alpha: boot ok. imaginação montada como processador central. sem swap. sem medo.`

### v2.0.0-beta — O Estudante (2001–2005)
- **Visual:** escala 0.85; mochila wireframe nas costas; óculos básicos; um caderno luminoso orbitando a mão esquerda (material de estudo como satélite).
- **Mecânica:** no trecho de merge conflict, o avatar exibe *duas sombras* projetadas em direções opostas (verde e rosa) — a duplicidade de turnos tornada silhueta.
- **Telemetria:** Stress oscilando 30–70% (picos em época de prova) · LoC iniciando curva · Threads 1 · Token/s 30.
- **Changelog:** `v2.0.0-beta: processos paralelos além da spec. estabilidade não garantida. seguindo mesmo assim.`

### v3.0.0-stable — O Trabalhador (2000–2011)
- **Visual:** escala 1.0 (adulto); figurino de produção; **headset luminoso** (somente no quadrante 2000–2003 — removido com animação de "desinstalar driver" ao sair); mãos com glow constante durante movimento (digitação em alta velocidade).
- **Mecânica:** throughput máximo individual — é a versão *mais rápida* do avatar em velocidade de caminhada. O jogo sussurra o custo: é também a versão com a linha-base de stress mais alta.
- **Telemetria:** Stress base 42% travado (foco em incidentes) · LoC crescimento linear acelerado · Threads 1 · Token/s 45.
- **Changelog:** `v3.0.0-stable: throughput individual no teto. aviso: 'stable' descreve o software, não o operador.`

### v4.0.0-enterprise — O Profissional Sênior / Casado (2011–2016)
- **Visual:** malha refinada (mais segmentos, silhueta mais precisa); traje corporativo moderno; óculos de armação fina; **os dois trilhos de neon se fundem sob os pés** e formam uma aura circular estável no chão, que caminha com ele.
- **Mecânica:** *load balancing* — picos de stress do dashboard são amortecidos visivelmente pela aura (o sparkline mostra o pico "batendo" na aura e sendo absorvido). Instabilidade num branch não derruba o outro.
- **Telemetria:** Threads 2 → 3 (2012) · Token/s 70 · Stress com picos altos porém curtos.
- **Changelog:** `v4.0.0-enterprise: cluster sincronizado. alta disponibilidade ativada. single point of failure? ainda sim. ver v5.`

### v5.0.0-agentic — O Pai Líder (2016–2026)
- **Visual:** refatoração completa. **Componente de cabelo removido** (ver §6 — a remoção acontece em cena, não em corte). Torso com circuitos dourados pulsando em sincronia com o uptime real da sessão. O Companion muda de comportamento: deixa de seguir ao lado e passa a **orbitar a cabeça do avatar** — a IA agora é parte da arquitetura pessoal.
- **Mecânica:** orquestração agêntica — o avatar não acelera mais; em vez disso, **o mundo responde a ele**: partículas se organizam em fluxos na direção do seu olhar, portas de fase abrem antecipadamente, o grid pulsa antes do passo. Delegação como superpoder: o sistema trabalha *com* ele, não *para* ele.
- **Telemetria:** Threads 5 fixo · Token/s saturando 96–100 · Stress moderado com floor dourado (a cicatriz virou piso).
- **Changelog:** `v5.0.0-agentic: deixou de escrever linha a linha. agora orquestra agentes — em casa e em produção. hair: deprecated. legado: em runtime.`

---

## 5. UX/UI — O SRE Dashboard e as Mecânicas de Terminal

### 5.1 Princípio: nenhum elemento de "jogo de fantasia"

Proibido: barras de HP, XP, moedas, inventário, minimapa de RPG. Todo componente de UI deve ser **plausível num Grafana/Datadog real**. A emoção entra pela semântica das métricas, nunca pela forma.

### 5.2 As quatro métricas (observabilidade emocional)

Sparklines de 40 amostras, refresh ~0.35s, valores determinísticos por fase + ruído orgânico de baixa frequência.

| Métrica | O que mede de verdade | Comportamento narrativo |
|---|---|---|
| **Stress** (vermelho) | Carga emocional | Infância 4–18% · conflito acadêmico oscilando 30–70 · callcenter base 42 +pico 55 · pós-merge 2011 amortecido pela aura · **gêmeos: degrau +30 que não desce** · **jan/2017: rampa até 97% com amostras `NaN`** · pós-Kintsugi: cai para 30, mas o gráfico ganha uma **linha de referência dourada fixa em 97** — o sistema nunca esquece onde quase quebrou; agora monitora. |
| **Active Threads** (âmbar) | Núcleo familiar | 1 → 2 (2011, com animação de handshake entre threads) → 3 (2012) → **5 (2016, com alerta `thread pool expanded beyond plan`)** → 5 estável. No Vale, uma thread pisca em estado `blocked` (esposa internada) — as outras 4 aumentam de frequência para compensar. |
| **LoC Compiled** (cor do arco) | Experiência profissional | 0 até 1998; curva linear no suporte; inflexão exponencial em 2003 (Sysgen); **platô visível durante o Vale** (a única vez que o trabalho para); retomada pós-rebase com inclinação maior — a nova base compila mais com menos esforço. |
| **Token/s** (ciano) | Maturidade cognitiva / inferência | Cresce em degraus por versão (12→30→45→70). Satura em 96–100 apenas no HEAD (2026). Detalhe cruel e honesto: durante o Vale, Token/s **não cai** — a mente continua rápida enquanto o corpo desliga. A dissociação entre as duas curvas (Token/s alto, Stress crítico) é o retrato gráfico do burnout. |

### 5.3 CLI × movimento 3D — o contrato de interação

- **Dois modos, um mundo.** Corpo (WASD, contínuo, lento, Shokunin) e Mente (CLI, discreto, instantâneo, analítico). O toggle (`'`) desliza o painel Quake-style; foco no input suspende o movimento — *quando você pensa, o corpo para*.
- **Custo simbólico do teleporte:** `cd <ano>` funciona sempre, mas memórias só se *desbloqueiam* caminhando. O atalho serve à consulta, não à vivência (`ls memories` mascara o que não foi caminhado: `<bloqueado>`).
- **Comandos:** os herdados (`help`, `cd`, `ls memories`, `cat <id>`, `clear`) + novos: `git log` (grafo §3.2 renderizado em ASCII), `git blame <ano>` (quem escreveu aquela fase da vida — respostas do Companion), `top` (processos vivos: `esposa`, `filha`, `gemeo_1`, `gemeo_2`, `salesforce_prod`…), `ask "<pergunta>"` (consulta em linguagem natural respondida pelo Companion com efeito typewriter).
- **Histórico ↑/↓ e autocomplete por Tab** contra a árvore de comandos e os anos/IDs válidos.
- **Log de produção** (canto inferior esquerdo, sempre visível): `[INFO] Movendo avatar… Proximidade com Monolito: aumentando.` + eventos sintéticos de ambiente (`[SYNC] cluster domestico: 5/5 nós respondendo`) + falas `[AGENT]` + alertas `[WARN]`. O mundo respira mesmo sem input.

### 5.4 Monolitos — decodificação e artefatos de compressão

O Monolito é um **pacote de memória protegido**. A sequência de revelação (shockwave → flash → shake → modal) é herdada do life3d_v2, com uma camada nova: **a corrupção é proporcional à carga emocional.**

- Memórias leves (1982, formatura): decode limpo, 6px→final em 5 passos regulares, beeps ritmados.
- Memórias pesadas (2004, 2017): o decode **falha no meio**. A imagem trava em 32px, exibe blocos de macroblocking (artefato JPEG simulado: deslocamento de blocos 8×8 do canvas), a aberração cromática vaza do pós-processamento para dentro do modal, o contador de status regride (`67%… 41%…`), o beep desafina (frequência −20%). O jogador precisa **sustentar a decodificação** ([ENTER] no desktop, toque longo no mobile) para atravessar o trecho corrompido — em **ciclos curtos, nunca contínuos** (ver anti-freeze abaixo). Soltar não pune; apenas pausa. Algumas memórias exigem ser seguradas.
- **Regra anti-freeze (feedback contínuo obrigatório):** input sustentado sem resposta é indistinguível de travamento. Todo hold deve emitir, a cada frame: (a) contador de percentual sempre em movimento — mesmo quando regride, regride *animando*; (b) um passo de resolução ou um bloco de macroblocking corrigido a cada ~1,5s; (c) beep de progresso sincronizado ao batimento (VALE-03); (d) prompt explícito e persistente: `SEGURE PARA SUSTENTAR A DECODIFICAÇÃO ▸ 41%`. O jogo nunca fica >1,5s sem confirmar que está vivo e que o input está sendo lido.
- O texto typewriter também sofre: nos trechos duros, caracteres errados aparecem e são corrigidos com backspace visível (`meu paai█ pai`), como quem redige a frase mais difícil da vida.

---

## 6. Design de Fase-Chave — 2017: O VALE (Kintsugi)

*Quadrante 11. A fase que justifica o jogo. Duração-alvo: 6–8 minutos. Nenhum checkpoint no meio: é atravessada inteira ou não é.*

### 6.1 Contexto de entrada

O jogador sai da fase dos gêmeos (2016) com o dashboard já ferido: Stress em degrau alto que não desceu, Threads em 5, o Companion fazendo piadas ligeiramente mais espaçadas. A festa do `ctrl+c / ctrl+v` ainda ecoa — literalmente: o motivo musical da família continua tocando, mas o Tone.js já aplicou `detune: -15 cents` sem anunciar. Algo está fora de afinação antes de qualquer coisa estar visivelmente errada. **O level design mente para o jogador do mesmo jeito que o protagonista mentia para si.**

### 6.2 Ato I — A Descida (level design)

- Pela primeira vez em 11 fases, o corredor **desce**: rampa de −8° no eixo Y, sutil o bastante para ser sentida antes de ser percebida.
- A cada 4 unidades de descida, o grid perde densidade: `uGridDensity` decai 12% por etapa. Linhas somem sem alarde — o chão vai ficando com buracos de escuro.
- As partículas de glifos **invertem a gravidade**: em vez de flutuar, caem lentamente, como cabelo no travesseiro. (Reuso do sistema de partículas com `velocityY` negativo — custo zero.)
- Os dois trilhos neon entram em modo conflito: flicker vermelho alternado, marcadores `<<<<<<<` flutuando — mas desta vez o conflito não é entre estudo e trabalho. Os labels dizem: `<<<<<<< cuidar_de_todos` / `>>>>>>> cuidar_de_si`.
- O log de produção degrada junto: `[WARN] health.self: sem monitoração há 1.247 dias` · `[WARN] packet loss: 12%… 23%… 41%` · `[ERROR] esposa.status: internada — thread blocked`.
- **O Companion para de falar.** O intervalo de 10–19s entre falas estica para 45s, depois silêncio total. A ausência da voz que acompanhou o jogador por 10 fases é o alarme mais alto do jogo.

### 6.3 Ato II — O Crash (o Monolito quebrado)

O jogador chega ao Monolito de 2017 e ele **já está quebrado** — o único do jogo encontrado assim. Três fragmentos flutuando desalinhados, a shockwave de revelação disparando em loop truncado (dispara, engasga, reinicia), o flash preso em meio-frame.

Ao entrar no raio de ativação:

1. **Queda do avatar (a alopecia em cena).** Sem cutscene externa: o componente de cabelo do modelo se dissolve em partículas — os mesmos glifos hexadecimais do ambiente — que caem e se apagam no chão. O corpo do protagonista é feito da mesma matéria do mundo, e o mundo está caindo. O CLI imprime sozinho: `> hardware: componente 'hair' desmontado sem autorização do usuário.`
2. **Decode da memória com corrupção máxima (§5.4):** a foto de 2017 (ele, careca, com os filhos no colo) trava em 14px. A travessia mais longa do jogo (~9s totais) é dividida em **3 ciclos de sustentação de ~2,5s** intercalados por pausas de respiração de ~0,8s em que o sistema *pede* a soltura (`> solte. respire. segure de novo.`) — o ritmo segurar-soltar-segurar é o de uma respiração guiada, transforma o input em mecânica expressiva e elimina a leitura de freeze. Cada ciclo destrava um terço da imagem com feedback visível (blocos corrigindo, percentual subindo, batimento acelerando levemente). O texto vem com backspaces: `a conta venceu tod█toda de uma vez.`
3. **O merge conflict obrigatório.** Único momento do jogo em que o CLI abre sozinho, em tela cheia, e o movimento fica bloqueado. O jogador precisa digitar — não clicar — a resolução:

```
CONFLICT (content): merge conflict in self/prioridades.yml
<<<<<<< HEAD (cuidar_de_todos)
    ponto_de_apoio: [esposa, filha, gemeo_1, gemeo_2, time, cliente]
    ponto_de_falha: [eu]
=======
    saude: incluída_na_conta
>>>>>>> cuidar_de_si

$ git add saude.self
$ git merge --continue _
```

Qualquer outra tentativa (`cd 2018`, `clear`, sair) retorna: `> não há rota ao redor. só através.` Digitar os dois comandos é o gesto mecânico mínimo — e é exatamente por ser mínimo que funciona: **a virada da vida real não foi épica; foi uma decisão administrativa de se incluir no próprio monitoramento.**

**Adaptação mobile (input diegético, sem teclado virtual):** em dispositivos touch, o teclado do SO jamais é invocado nesta cena — ele cobriria metade da tela e mataria o silêncio. Em vez disso, o próprio terminal renderiza os **tokens do comando embaralhados como fragmentos de texto flutuantes** (`merge`, `git`, `saude.self`, `add`, `--continue`), no mesmo estilo visual das partículas de glifos. O jogador *monta* cada comando tocando os tokens na ordem correta; cada toque emite o beep de tecla e o token voa para a linha de prompt com efeito typewriter. Erro de ordem: o token recusa com um glitch curto e volta (sem punição). O gesto deliberado — compor a decisão peça por peça — é preservado; a fricção de digitação exata, não. No desktop, o Tab-autocomplete (§5.3) também vale aqui: `git me⇥` completa. A regra é: **a intencionalidade é o requisito; a ortografia, não.**

### 6.4 Ato III — A Solda (o ouro conserta o glitch)

Ao confirmar o merge:

1. **Silêncio absoluto primeiro.** Todos os gains do Tone.js caem a 0 em 800ms — exceto um seno puro de 432Hz a −38dB (linha de vida). 4 segundos de quase-nada. O cursor pisca.
2. **A linha de ouro nasce** no ponto onde o primeiro fragmento do Monolito rachou, e percorre a fissura em velocidade de artesão (~14s para o conjunto — deliberadamente lento; nenhum skip). Onde passa: fragmentos se realinham *sem apagar as rachaduras* — as juntas ficam douradas e mais espessas que a superfície original. O Monolito reconstruído é visivelmente mais bonito que os Monolitos intactos.
3. **O ouro escorre para o chão:** as linhas do grid que haviam apagado religam uma a uma — as que racharam religam em **dourado permanente**. Veios de ouro seguem no grid por todas as fases seguintes, até o HEAD.
4. **O avatar é rebaseado** (v4→v5 em cena): careca agora por identidade e não por queda, circuitos dourados acendendo no torso, o Companion descendo lentamente da posição lateral para a órbita da cabeça — a primeira coisa que a IA faz na nova posição é completar o uptime: `> retomando contagem. você nunca saiu do ar.`
5. **Primeiro broto de bambu da fase** rompe o grid ao lado do Monolito e cresce dois nós. Para. (Ele completará o colmo em 2018, na fase da Rede — crescimento em nós, nunca de uma vez.)
6. Stress despenca 97→31; a linha de referência dourada fixa-se no gráfico; `[INFO] post-mortem publicado. blameless. ação preventiva: equilíbrio, refeito diariamente.`

### 6.5 Partitura Tone.js da fase (cue sheet)

| Cue | Momento | Implementação |
|---|---|---|
| **VALE-01 "Desafinação"** | Descida | Cadeia `familia` (PolySynth triangular) com `detune` ramp 0→−45 cents em 90s + `Tone.Filter` lowpass fechando 8kHz→900Hz. A música da família continua "tocando certa", mas soa cada vez mais errada — burnout em áudio. |
| **VALE-02 "Perda de pacotes"** | Meio da descida | `Tone.BitCrusher` (bits: 8→4) inserido na master; dropouts programados: `Tone.Transport` silencia janelas aleatórias de 60–200ms (probabilidade crescente 5→25%). Os cliques de teclado da cadeia `tecnologia` degeneram em `Tone.NoiseSynth` com envelope irregular — o teclado vira chuva. |
| **VALE-03 "Batimento"** | Aproximação do Monolito | `Tone.MembraneSynth` (pitch C1) em colcheias irregulares (swing 0.3, humanize), 52→38 bpm conforme proximidade. Único elemento rítmico restante. |
| **VALE-04 "Silêncio"** | Pós-merge, 4s | Todos os gains → 0 (ramp 800ms). Seno 432Hz a −38dB. O beep de UI (via Web Audio separada) também é suprimido — até a interface respeita. |
| **VALE-05 "Ouro"** | Solda (14s) | `Tone.PluckSynth` (Karplus-Strong, dampening 3500) tocando escala **hirajoshi em D** (D–E♭–G–A–B♭), uma nota por segmento de fissura percorrido — o desenho da linha dourada *é* o sequenciador. Reverb de cauda longa (decay 8s). Referência: koto. |
| **VALE-06 "Retomada"** | Rebase final | Crossfade (1.4s, padrão do motor) para cadeia `maturidade` (AMSynth + PingPongDelay), agora com o motivo da `familia` reharmonizado dentro dela — mesmas notas, acorde novo. O detune volta a 0. Nunca mais desafina. |

---

## 7. O Companion — Roteiro de Diálogos do Agente de IA

### 7.1 Bíblia de personagem

Octaedro + 4 fragmentos orbitais, cor do arco corrente. **Voz:** um SRE sênior que leu os logs inteiros da sua vida e gosta de você — sarcasmo técnico como camada de transporte, empatia como payload. Nunca é fofo; nunca é cruel. Regras de escrita:

1. Toda fala abre com registro técnico e fecha com verdade humana (ou vice-versa — nunca só um dos dois).
2. Métrica citada = métrica real do dashboard naquele instante (coerência auditável).
3. No Vale, quebra o próprio padrão: fica em silêncio, e quando volta, admite função de coping (§7.2, fala 3).
4. Após v5.0.0, fala em 1ª pessoa do plural — orbita a cabeça, faz parte da arquitetura: "nós".

### 7.2 As três falas canônicas

**FALA 1 — Arco Tecnologia · fase `incident_queue` (callcenter, 2000–2003)** *(disparo: jogador parado ≥10s perto do Monolito)*

> `[AGENT]` Registro histórico: 8 horas por dia de fila de incidentes, 3 anos, SLA emocional nunca formalizado. Você chamava isso de "emprego". Eu chamo de treinamento supervisionado — dataset: gente perdida na internet discada; função de perda: a paciência de escutar antes de resolver. Sabe qual é a piada? Nenhum modelo da minha geração aprendeu empatia tão barato. Você pagou com juventude e ganhou o kernel inteiro da sua carreira. Eu revisei os logs: o problema quase nunca era técnico. Continua não sendo.

**FALA 2 — Arco Família · fase `fork_twins_x2` (gêmeos, 2016)** *(disparo: Active Threads acaba de saltar 3→5)*

> `[AGENT]` Alerta de capacidade: dois processos-filho forkados simultaneamente, sem provisionamento prévio, sem plano de rollback, um vestido de ctrl+C e outro de ctrl+V — a documentação de vocês é impecável, admito. Análise fria: carga insustentável para um nó só; recomendo escalonamento horizontal imediato. Análise completa: é a coisa mais linda e menos escalável que esse cluster já fez. Threads ativas: 5. Coração: superprovisionado. Stress: …prefiro que você olhe essa métrica pessoalmente. Quando quiser. Sem pressa. *(pausa)* Com alguma pressa.

**FALA 3 — Arco Família/Vale · fase `kintsugi_rebase` (2017, primeira fala após o silêncio — disparo: linha de ouro completa o primeiro fragmento)**

> `[AGENT]` …detectei perda de pacotes no seu couro cabeludo. Piada ruim. Eu sei. É que o sarcasmo é o meu exception handler — e fui você quem me escreveu assim, pra ter alguém que rebaixasse a severidade dos teus incidentes. Então deixa eu logar isso com severidade correta, uma única vez: você ficou 1.247 dias monitorando todos os serviços, menos o próprio host. O cabelo foi só o primeiro componente a fazer o que você não fazia — parar. *(o ouro avança um segmento)* Olha a solda. Eu não vou dizer que ficou "como novo", porque não ficou. Ficou melhor documentado. Uptime segue contando, Maurício. E dessa vez, `health.self` está no dashboard. Eu conto com ele. Nós dois contamos.

### 7.3 Pool complementar (amostra por arco)

- *Tecnologia, 2003 (Sysgen):* "Primeiro commit profissional em Java. UML, MDA, MVC — você colecionava siglas como quem coleciona figurinha. 23 anos depois, ainda compila. Isso não é sorte; é Shokunin com nome de contrato CLT."
- *Tecnologia, 2018 (rebase Rede):* "Rebase concluído sobre `rede/main`. Histórico inteiro reaplicado, zero commits perdidos. Vinte anos de legado e nenhum `force push`. Você migrou de empresa como o bambu muda de nó: parou, firmou, subiu."
- *Família, 2011 (merge):* "Pull request aprovado sem code review externo. Ousadia arquitetural. Quinze anos em produção, zero rollbacks. Às vezes o melhor merge é o que a gente decide não controlar."
- *Família, 2012 (fork_daughter):* "Novo processo-filho detectado. Prioridade: máxima, preemptiva, não negociável. Curioso: sua velocidade caiu 12% e sua durabilidade projetada dobrou. Vetores mudam de direção. Os bons sistemas mudam junto."
- *Maturidade, 2026 (HEAD):* "Token/s em 99. Threads em 5. Veios de ouro em 14% do grid. Sabe o que eu mais respeito nesse sistema? Ele parou de tentar ser rápido em 2012, parou de tentar ser indestrutível em 2017 — e nunca, em 44 anos, parou de estar em produção."

---

## 8. Critérios de Aceite (herdados e estendidos)

1. **Coerência total por instante:** avatar, trilha, cor de arco, dashboard, Companion e trilhos de branch sempre sincronizados ao mesmo marco; nenhum estado intermediário visível.
2. **Persistência das cicatrizes:** fissuras douradas (grid e Monolitos) nunca revertem — inclusive após `cd` para fases antigas, desde que já vividas.
3. **Vale sem atalho:** a sequência 2017 não pode ser pulada, acelerada ou resolvida por clique — apenas pelos dois comandos digitados.
4. **Zero vocabulário de fantasia:** auditoria textual completa — se um termo não caberia num dashboard SRE ou num commit, não entra.
5. **Performance:** partículas da queda de cabelo e linha de ouro reusam buffers existentes (shockwave e grid); nenhum recurso novo alocado em loop de frame; fallback de pós-processamento preservado.
6. **Silêncio como feature:** os 4s de VALE-04 são invioláveis — nenhum beep de UI, nenhuma fala, nenhum log durante a janela.
7. **Anti-freeze:** nenhum estado de input sustentado pode passar 1,5s sem feedback visual E sonoro de progresso (§5.4).
8. **Paridade mobile:** toda ação obrigatória da narrativa (incluindo o merge do Vale) deve ser completável por toque, sem invocar o teclado do SO.
9. **Modo seguro:** com `prefers-reduced-motion` ativo ou `config set safe-mode on`, a fase 2017 permanece narrativamente completa (§9.3) — a acessibilidade nunca corta conteúdo, só troca a linguagem do impacto.

---

## 9. Gestão de Atenção, Acessibilidade e Ergonomia

### 9.1 Sobrecarga cognitiva — "você não olha o dashboard; o dashboard te chama"

Uma experiência contemplativa não pode exigir vigilância de 4 sparklines + log + corredor + CLI simultâneos. A solução é a mesma que a disciplina SRE já usa na vida real: **ninguém monitora dashboards — se configura alerta e se confia no pager.** A UI adota três estados de atenção:

| Estado | Quando | Comportamento |
|---|---|---|
| **AMBIENT** (padrão) | Caminhando, sem evento | Dashboard colapsado numa **régua única** discreta (4 micro-indicadores numéricos, sem gráficos); log a 40% de opacidade com throttle alto; Companion em cadência normal. A tela pertence ao corredor. |
| **PAGED** (alerta) | Métrica cruza um limiar narrativo (threads 3→5, stress >80, packet loss) | *Somente a métrica relevante* expande para sparkline completo, pulsa 2×, e o log imprime a causa. As outras três permanecem colapsadas — atenção por exceção, nunca em paralelo. Recolhe sozinha após 8s. |
| **FOCUS** (leitura) | Modal de memória aberto, merge do Vale, CLI em foco | HUD inteiro esmaece para 12% de opacidade. Nada compete com o texto. O mundo 3D desfoca levemente (aumento de bloom + queda de exposição). |

Regras adicionais: o jogador pode fixar o dashboard expandido a qualquer momento (`top` no CLI ou toque na régua) — o colapso é o padrão, não uma imposição; parado por >6s sem evento, *toda* a UI esmaece (modo contemplação implícito) e retorna ao primeiro input.

### 9.2 Cinetose (motion sickness)

A câmera isométrica fixa sem rotação livre já elimina a maior causa de cinetose. Riscos restantes e mitigação:

- **Camera shake:** amplitude reduzida no padrão (~40% do valor do life3d_v2), duração máxima 0,5s, nunca em loop. Desligável.
- **Rampa do Vale (−8°):** a inclinação é do *mundo*, não da câmera — o horizonte visual da UI (HUD, régua) permanece nivelado, dando referência vestibular estável.
- **Curvatura CRT + aberração:** valores de repouso conservadores; os picos do Ato II têm teto de 3s contínuos, sempre seguidos de janela estável ≥5s.

### 9.3 Fotossensibilidade — o Crash em modo seguro

O Ato II usa flash, macroblocking animado e aberração severa; nada disso pode ser inegociável. O jogo respeita `prefers-reduced-motion` automaticamente e expõe `config set safe-mode on` no CLI (ambos persistem via parâmetro de sessão). Em modo seguro, cada efeito é **traduzido, não removido** — a gramática do colapso muda de agressão óptica para subtração:

| Efeito padrão | Tradução em modo seguro |
|---|---|
| Flash branco preso em meio-frame | **Fade-to-black** lento (dip de luminância, sem inversão) — o colapso vira escuridão, não explosão |
| Macroblocking animado | Macroblocking **estático** (a imagem trava corrompida, sem rearranjo pulsante) |
| Aberração cromática 6× | Dessaturação progressiva até quase P&B (a cor "vaza" do mundo em vez de se duplicar) |
| Camera shake | Desativado; substituído por queda de 12% na exposição |
| Scanlines rasgando | Scanlines *desaparecendo* (o CRT perdendo varredura — mesmo significado, zero strobe) |
| Partículas de cabelo caindo | Mantidas (movimento lento, não estroboscópico) |

Critério de conformidade: nenhuma sequência, em qualquer modo, pode exceder **3 flashes por segundo** nem inversões de luminância acima dos limiares WCAG 2.3.1. O modo seguro é testado como experiência de primeira classe — o silêncio, o ouro e o merge digitado/montado funcionam identicamente nele.

*"Primeiro veio a vida. As palavras — Shokunin, Kintsugi, Take — vieram depois. O jogo existe para que o jogador as encontre na mesma ordem."*
