---
id: P00
titulo: Análise do Projeto (Fase 0)
versao: 1.0.0
status: aprovado
dominio: project
depende-de: []
consumido-por: [todos-os-agentes]
fonte: docs/gdd-lifeos-terminal-evolutivo.md
---

# P00 — Análise do Projeto

## Objetivos
1. Portal gamificado 3D em navegador que narra a vida de Maurício Yokoyama Issei (1982–2026) como infraestrutura de TI em evolução contínua.
2. Metáfora estrutural: engenharia de sistemas (Git, SRE, versionamento). Metáfora emocional: filosofias japonesas (Shokunin, Kintsugi, Take/bambu).
3. Experiência contemplativa, sem condição de derrota, duração ~30–40 min.

## Escopo
- INCLUI: corredor 3D com 12 quadrantes narrativos, avatar com 5 versões, CLI funcional, dashboard SRE com 4 métricas, companion de IA, áudio 100% procedural, fase-chave "O Vale" (2017), acessibilidade (safe-mode), mobile touch.
- EXCLUI: multiplayer, backend/servidor, persistência entre dispositivos, assets 3D importados, samples de áudio, build step, monetização.

## Domínio
Narrativa interativa biográfica. Vocabulário obrigatório: engenharia de sistemas (commit, merge, thread, uptime, deploy). Vocabulário proibido: fantasia de RPG (HP, XP, magia, inventário).

## Stakeholders
- Dono do produto e protagonista: Maurício Issei (biografia real — dados factuais são invariantes, ver P00 §Premissas).
- Público: recrutadores, pares técnicos, visitantes do site mauricio.issei.com.br.

## Requisitos de alto nível
- RF-01 Navegação 3D por corredor com 12 quadrantes (WASD/setas/touch).
- RF-02 Revelação de memórias via Monolitos com decode progressivo.
- RF-03 CLI estilo Quake com comandos Git-temáticos.
- RF-04 Telemetria (Stress, Active Threads, LoC, Token/s) determinística por fase.
- RF-05 Avatar evolui em 5 versões dirigidas pela fase (nunca pelo jogador).
- RF-06 Companion comenta por arco; orbita a cabeça a partir da v5.
- RF-07 Fase 2017 com merge conflict obrigatório e solda Kintsugi.
- RF-08 Safe-mode fotossensível + prefers-reduced-motion (paridade de conteúdo).
- RNF-01 Sem build: ES Modules + import maps + CDN (Three.js r167, Tone.js 14.8).
- RNF-02 60fps alvo desktop / 30fps mínimo mobile; fallback degradando pós-FX.
- RNF-03 Nenhuma alocação de objetos no loop de frame.
- RNF-04 Áudio só inicia após gesto do usuário.

## Restrições
- WebGL2 + import maps obrigatórios (sem fallback para navegadores antigos).
- Fotos em `fotos/*.jpg|png|jpeg` (estrutura existente do site).
- Documentos desta árvore: ≤150 linhas cada (consumo por agentes de 8k tokens).

## Riscos
| ID | Risco | Mitigação |
|---|---|---|
| R-01 | Sequência do Vale parecer bug real | Regra anti-freeze (feedback ≤1,5s) — ver GMP-02 |
| R-02 | Teclado mobile quebrar imersão | Composição por tokens — ver CLI-02 |
| R-03 | Sobrecarga cognitiva do HUD | Estados AMBIENT/PAGED/FOCUS — ver UI-02 |
| R-04 | Fotossensibilidade/cinetose | Safe-mode traduzido — ver ACC-01 |
| R-05 | Custo cumulativo de shaders em mobile | Budgets — ver PRF-01 |

## Premissas (fatos biográficos invariantes — NUNCA alterar)
1982 nascimento · anos 80 tokusatsu · 1998 auditor Shopping Eldorado (16 anos) · 2000–03 callcenter provedor · 2001–05 Mackenzie (Sistemas de Informação) · abril/2004 morte do pai · 2003 início carreira dev (Sysgen) · 2011 casamento (conheceu em 2009) · 2012 primogênita · 2016 gêmeos (ctrl+C/ctrl+V) · jan/2017 alopecia + esposa internada · dez/2017 Serasa · fev/2018 Rede (atual) · 2026 HEAD: 5 threads.

## Dúvidas em aberto
- D-01: hospedagem final da página (rota `/lifeos.html`?) — decisão do dono.
- D-02: reutilizar fotos existentes ou novas? Premissa atual: existentes.
