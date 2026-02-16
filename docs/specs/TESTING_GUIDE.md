# E2E Testing Specification - Playwright

## Objetivo
Garantir que cada alteração no código não quebre a experiência do usuário nem o SEO.

## Regras de Ouro
1. **Critical Path**: Toda página nova deve ter um teste de carregamento (Status 200).
2. **SEO Check**: Validar se a tag `<title>` e `<meta description>` estão presentes.
3. **Responsividade**: Testar sempre em Desktop e Mobile (Pixel 5/iPhone).
4. **No Broken Links**: Verificar se os links internos não retornam 404.

## Comando de Vibe Coding
"Agente, analise a nova página `servicos.html` e gere um arquivo de teste em `tests/servicos.spec.js` seguindo o padrão definido em `docs/specs/TESTING_GUIDE.md`."