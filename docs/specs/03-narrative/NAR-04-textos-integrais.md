---
id: NAR-04
titulo: Textos Integrais Congelados (strings do jogador)
versao: 1.0.0
status: aprovado (dono, 2026-07-04)
dominio: narrative
depende-de: [NAR-01, NAR-02, NAR-03, CAI-02, GMP-04, GMP-06]
consumido-por: [R1, A4, A5, A8, A9, A10]
---

# NAR-04 — Strings Congeladas

## Contexto
Fonte ÚNICA de toda string visível ao jogador que não esteja em outro doc.
Após aprovação do dono, `status: aprovado` congela tudo — R1 reprova qualquer
paráfrase. Textos de memórias: NAR-01/02. Falas do Companion: CAI-02.
Bloco de conflito/PR: NAR-03. Comandos do Vale: GMP-04. Boot/final: GMP-06.

## Prompts e mensagens de sistema (CLI)
- Erro genérico: `comando não encontrado: {raw}. tente 'help'.`
- Memória bloqueada: `<bloqueado> — este log ainda não foi decodificado.`
- `cd` inválido: `ano fora do repositório. anos válidos: 'ls memories'.`
- Bloqueio do Vale: `> não há rota ao redor. só através.`
- Dica fantasma (3 erros): `$ git add saude.self` + `$ git merge --continue`
- Distratores (CLI-02 RG-04): `--force`: `> forçar já foi tentado. por anos.`
  · `--abort`: `> abortar não está no seu histórico.`

## Decode e hold (GMP-02)
- Prompt de hold: `SEGURE PARA SUSTENTAR A DECODIFICAÇÃO ▸ {pct}%`
- Pedido de respiração: `> solte. respire. segure de novo.`
- Typewriter com backspace (marco 11): `a conta venceu tod█toda de uma vez.`
- Typewriter com backspace (marco 6): `meu paai█pai.`

## Log de produção (linhas roteirizadas — além dos templates de UI-03)
- Vale u8: `[WARN] health.self: sem monitoração há 1.247 dias`
- Vale u20/30/40: `[WARN] packet loss: 12%` · `23%` · `41%`
- Vale u46: `[ERROR] esposa.status: internada — thread blocked`
- Marco 6: `[FATAL] host origem: unreachable.`
- Pós-merge: `[INFO] post-mortem publicado. blameless. ação preventiva:
  equilíbrio, refeito diariamente.`
- Alopecia: `> hardware: componente 'hair' desmontado sem autorização do usuário.`
- Retomada: `> retomando contagem. você nunca saiu do ar.`
- Conflito acadêmico resolvido: `resolved: ambos. custo: férias inteiras, 5 anos.`

## Cherry-pick (marco 10, saída do CLI)
```
$ git cherry-pick a2003 --onto feature/personal-lifestyle
> aplicando: "triagem de incidentes simultâneos sob privação de sono"
> origem: callcenter (2000–2003) · destino: madrugada com gêmeos (2016)
> conflitos: nenhum. essa habilidade sempre foi sobre gente.
```

## HUD e rótulos
- Métricas: `STRESS` · `ACTIVE THREADS` · `LOC COMPILED` · `TOKEN/S`
- Linha dourada: rótulo `max` · Botão terminal: `>_` · Fechar modal: `[ESC] fechar`
- Splash: ver GMP-06 RG-01/03/04 (literais lá).

## Regras
- RG-01 Nenhuma string visível fora dos docs citados; agente que precisar de
  string nova retorna LACUNA (AGT-01 RG-4).
- RG-02 Ortografia PT-BR; minúsculas no estilo terminal (exceto rótulos HUD).
- RG-03 Aprovação do dono muda `status` e versão → 1.0.0; a partir daí,
  mudança de string = MINOR com changelog.

## Critérios de aceite
- [ ] Grep do código: toda string do jogador rastreável a um doc (matriz TST-02).
- [ ] Zero strings hardcoded fora dos módulos de dados.
