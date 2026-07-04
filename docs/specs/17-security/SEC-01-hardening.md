---
id: SEC-01
titulo: Hardening — Superfície de Ataque do Portal
versao: 1.0.0
status: aprovado
dominio: security
depende-de: [CLI-01, CTR-08, ADR-001]
consumido-por: [A1, R2]
---

# SEC-01 — Hardening

## Contexto
Site estático sem backend: a superfície é o navegador do visitante. Riscos:
XSS via input do CLI/URL, injeção via localStorage adulterado, dependências
CDN. Sem dados sensíveis (biografia é pública por design).

## Regras
- RG-01 **Saída de texto:** exclusivamente `textContent`/`createTextNode` em
  CLI, log, balões e modal (reforça CLI-01 RG-03 e UI-03; grep de `innerHTML`
  no gate = zero ocorrências fora de templates estáticos sem interpolação).
- RG-02 **Entrada do CLI:** truncar 200 chars; sem `eval`/`Function`/
  `setTimeout(string)` em toda a base (grep no gate).
- RG-03 **localStorage:** tratar como INPUT HOSTIL — validar contra CTR-08
  campo a campo (tipos, enums, ranges); qualquer campo inválido → descartar o
  save inteiro (CTR-08 §Regras 6), nunca sanitizar parcialmente.
- RG-04 **Parâmetros de URL:** se houver deep-link (`?fase=2011`), validar
  contra anos de CTR-01; qualquer outro parâmetro é ignorado.
- RG-05 **CDN:** pins de versão exata (three@0.167.x, tone@14.8.x) + atributo
  `integrity` (SRI) nos scripts/import map onde o CDN suportar; `crossorigin`
  correto. Sem SRI possível no import map → documentar risco residual aceito.
- RG-06 **CSP** (meta tag, já que é estático): `default-src 'self'; script-src
  'self' https://cdn.jsdelivr.net; img-src 'self' data:; style-src 'self'
  'unsafe-inline'; connect-src 'none'` — ajustar na implantação conforme host
  das fontes; `connect-src 'none'` é a declaração forte: o jogo não fala com
  rede após o load.
- RG-07 **Sem coleta:** nenhum dado do visitante sai do navegador (OBS-01, se
  ativado, revisita esta regra com consentimento explícito).

## Casos extremos
- localStorage com 5MB de lixo na chave do jogo: parse em try/catch com limite
  de tamanho (ler no máx. 64kB) antes do JSON.parse.
- CDN fora do ar: import map falha → tela de erro do boot (GMP-06 RG-05
  cobre com mensagem de requisito + links irmãos).
- Extensões que injetam DOM: não defender (fora do modelo de ameaça), mas
  nunca ler DOM de volta como fonte de estado.

## Critérios de aceite
- [ ] Grep: zero `innerHTML` interpolado, zero `eval`/`Function`.
- [ ] Save adulterado (10 mutações de fuzzing) → descarte íntegro, jogo boota.
- [ ] CSP ativa sem quebrar CDN/fotos/fontes (teste nos 3 navegadores).
- [ ] Nenhuma requisição de rede após load completo (aba Network limpa).
