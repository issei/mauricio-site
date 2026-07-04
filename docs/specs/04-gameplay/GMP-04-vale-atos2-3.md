---
id: GMP-04
titulo: Fase 2017 (Vale) — Atos II e III: Crash e Solda
versao: 1.0.0
status: aprovado
dominio: gameplay
depende-de: [GMP-03, CTR-02, CTR-05, CTR-07]
consumido-por: [A5]
---

# GMP-04 — Vale, Atos II–III

## Contexto
Continuação de GMP-03. Do raio do Monolito quebrado até o rebase final.
Sequência inteira sem checkpoint: save no meio reinicia a fase (CTR-08).

## Ato II — O Crash
- RG-01 Monolito encontrado JÁ quebrado (único do jogo): 3 fragmentos flutuando
  desalinhados; shockwave em loop truncado (dispara, engasga a 40%, reinicia a
  cada 3s); flash preso em meio-frame (safe-mode: meio-dip de luminância).
- RG-02 Ao entrar no raio, publicar `vale:act2`. Queda de cabelo em cena:
  CMP-02 dissolve o componente `hair` em partículas-glifo que caem e apagam
  (reuso do buffer de shockwave — PRF-01). CLI imprime sozinho:
  `> hardware: componente 'hair' desmontado sem autorização do usuário.`
- RG-03 Decode com hold (GMP-02) — travessia mais longa (~9s, 3 ciclos), imagem
  presa em 14px, texto com backspaces (strings em NAR-02).
- RG-04 Merge conflict obrigatório: CLI entra em `forced-open` (tela cheia,
  movimento bloqueado — CTR-05). Bloco exibido (literal):
```
CONFLICT (content): merge conflict in self/prioridades.yml
<<<<<<< HEAD (cuidar_de_todos)
    ponto_de_apoio: [esposa, filha, gemeo_1, gemeo_2, time, cliente]
    ponto_de_falha: [eu]
=======
    saude: incluída_na_conta
>>>>>>> cuidar_de_si
```
- RG-05 Resolução exige, em ordem: `git add saude.self` → `git merge --continue`.
  Tab-autocomplete vale (`git me⇥`). Qualquer outro comando →
  `> não há rota ao redor. só através.`
- RG-06 Mobile: composer por tokens (CLI-02) — teclado do SO nunca invocado.
- RG-07 Ao completar: publicar `vale:merge-resolved`.

## Ato III — A Solda
- RG-08 CUE-VALE-04 (silêncio): 4s invioláveis — zero beeps, falas, logs.
- RG-09 Solda: publicar `scar:gilded` (scar-2017); linha dourada percorre as
  fissuras dos 3 fragmentos em ~14s total, sem skip; CUE-VALE-05 (1 nota
  hirajoshi por segmento). Fragmentos realinham SEM apagar rachaduras.
- RG-10 Ouro escorre ao grid: células rachadas religam em dourado permanente
  (RND-02); demais religam na cor do arco.
- RG-11 Rebase do avatar em cena (v4→v5): circuitos dourados acendem; Companion
  desce para órbita da cabeça; primeira fala pós-silêncio:
  `> retomando contagem. você nunca saiu do ar.` — seguida da fala canônica
  completa (CAI-02 §Fala-3).
- RG-12 Primeiro broto de bambu: cresce 2 nós ao lado do Monolito e PARA
  (completa no marco 12).
- RG-13 Telemetria: stress 97→31 (ramp 3s); linha de referência dourada fixa em
  97 (UI-01); `[INFO] post-mortem publicado. blameless. ação preventiva:
  equilíbrio, refeito diariamente.` · CUE-VALE-06 encerra.
- RG-14 Corredor à frente: reconstrução do rebase (plataformas nomeadas
  sysgen→telefonica→indra→serasa→rede — NAR-03).

## Casos extremos
- Chegada via `cd 2017` sem fases anteriores: sequência funciona standalone
  (dependências só de estado interno da fase).
- Reload no meio do Ato II: fase reinicia no Ato I (CTR-08).
- Digitar comandos com erro repetidamente: sem punição; a cada 3 erros o prompt
  reimprime os comandos esperados como dica fantasma.

## Critérios de aceite
- [ ] Impossível sair da fase entre `vale:act2` e `vale:merge-resolved`.
- [ ] Silêncio de 4s sem NENHUM áudio (inclusive via SFX).
- [ ] Solda de 14s sem skip; scar-2017 persistida como `gilded` (CTR-08).
- [ ] Completável 100% por toque no mobile.
