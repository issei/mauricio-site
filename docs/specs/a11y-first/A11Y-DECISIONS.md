---
id: A11Y-DEC-DRAFT
titulo: Decisões propostas (rascunho) — a promover para `A11Y-DECISIONS.md` na raiz após aprovação
versao: 0.1.0
status: PROPOSTO — nenhuma decisão aqui está aprovada
data: 2026-10-03
---

# Decisões de acessibilidade — propostas

Critério A11Y.md: registrar aqui **escolhas entre alternativas igualmente conformantes**. Violação aceita de uma SC vai
para `EXCEPTIONS.md` (7 registradas na raiz: EXC-001…007). Cada decisão abaixo lista o que decide, a recomendação e **quem aprova**.

| ID | Decisão | Opções | Recomendação | Estado |
| :-- | :-- | :-- | :-- | :-- |
| D-01 | Como integrar o A11Y.md | A remoto · B cópia · C completa | **B** com carga preguiçosa; `tools/` copiados e executados (Q3) | **aprovado 2026-10-03** (autor) |
| D-02 | Perfil de conformidade | Shield (AAA) · **Standard (AA)** · Launchpad (A) | **Standard**. Exceções localizadas de 7:1 já existem (`apresentacao`) e permanecem | **aprovado** (brief original; registrado na raiz) |
| D-03 | Tema | só-escuro (hoje) · adicionar tema claro | **manter só-escuro**: não é exigência WCAG; o contraste se garante no token. Ressalva: `forced-colors`/alto contraste do SO **não auditado** — testar na Fase 5; **conflito de necessidades** (fotofobia × baixa visão que prefere claro) a registrar com os dois grupos nomeados, conforme A11Y.md §2.6 | proposto |
| D-04 | Botão de mídia (play/pause) | corrigir cada um no lugar · extrair um componente | **corrigir no lugar** se ≤ 3 usos reais; extrair se ≥ 4 (hoje: contar na Fase 4) | proposto |
| D-05 | Preferência de movimento | cada página lê `matchMedia` · leitor único | **manter por página** até haver ≥ 3 que precisem de reação em runtime (YAGNI); `ACC-01` já define `a11y:changed` para o jogo | proposto |
| D-06 | Páginas utilitárias públicas (`admin`, `admin-editor`, `diagnostic`, `test-github`, `mapmind`, `vsl`, `exemplopdi`, `boutique-empresarial-showcase`) | corrigir · remover da produção · `noindex` + exceção com prazo | **decisão do autor** (Q2). Sugestão: remover `test-github`, `diagnostic`; `admin*` atrás de autenticação/remover do bundle público; os demais corrigir | **decidido 2026-10-03:** corrigir só `boutique-empresarial-showcase`; o resto **não mexe** → `EXCEPTIONS.md` EXC-001…007 |
| D-07 | Libras / alternativa em língua de sinais para vídeo/áudio | só legenda+transcrição · adicionar janela de Libras | **legenda + transcrição** (obrigatório 1.2.x); Libras é **recomendação** (`guide-sign-language-br.md`), não SC — custo de produção alto | proposto |
| D-08 | Modal de cookies | `<dialog>`+`showModal()` · `div` + trap manual | **`<dialog>`** (menos código, comportamento nativo) | **aprovado 2026-10-03** (autor, "segue para a Fase 3") |
| D-09 | Alvo mínimo | 24 px (AA) · 44 px (House Rule) | **44 px** em nav/botões/consentimento; links em linha isentos; **24 px** é o piso inegociável | **aprovado 2026-10-03** |
| D-10 | Piso do texto de apoio | manter `gray-500` · adotar `gray-400 #99a1af` | **`#99a1af`** (5,85–7,74:1 medido) | **aprovado 2026-10-03** (autor) |
| D-11 | Verificação independente | só autor · segundo agente/contexto fresco | **fresh-context obrigatório** antes de qualquer `PASS`; `cross-agent` se houver ferramenta; senão `self-reported ⚠️` | proposto |

Cada decisão aprovada ganha: data, aprovador, link para o PR. Aprovar = mudar **Estado**; só então copiar para a raiz.
