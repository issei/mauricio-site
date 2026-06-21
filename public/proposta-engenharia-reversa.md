# Engenharia Reversa Assistida por IA — Mapear a Verdade do Legado

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/proposta-engenharia-reversa>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-05-01 · Atualizado: 2026-06-21.

## Em síntese

Antes de modernizar (To-Be), é preciso **congelar uma fotografia de alta fidelidade do que o sistema realmente faz hoje (As-Is)**. O conhecimento crítico costuma viver escondido — em Apex, em Flows fragmentados e na cabeça de poucos. Modernizar sem mapear é apagar regras vitais sem saber.

- **Descoberta guiada por jornadas** — parte-se de uma jornada de negócio e segue-se a trilha de execução, isolando o código morto.
- **Matriz de Evidências** — cruza insumos estrutural, de estado, operacional e humano para evitar falsos-positivos.
- **Inventário de Comportamentos** — regras core, efeitos colaterais e workarounds, classificados por confiança.
- **As-Is → contratos** — o inventário auditado vira a matéria-prima dos schemas de validação.

## Do passado ao futuro

O objetivo da engenharia reversa assistida por IA não é gerar documentação viva eterna — é congelar o As-Is com fidelidade suficiente para que arquitetos decidam, de forma auditável, o que preservar, redesenhar ou descontinuar. Cada regra catalogada vira, depois, uma cláusula nos schemas de validação.

## Perguntas frequentes

**O que é engenharia reversa assistida por IA?**

É o uso de IA para revelar e congelar, com alta fidelidade, o comportamento real de um sistema legado (o As-Is) antes de modernizá-lo. O objetivo não é gerar documentação eterna, e sim um inventário auditável para que arquitetos decidam o que preservar, redesenhar ou descontinuar.

**Por que congelar o As-Is antes de modernizar?**

Porque todo sistema legado sofre de "conhecimento tribal": regras que sustentam o negócio mas que ninguém escreveu. Modernizar sem mapear apaga regras vitais sem saber — o As-Is de alta fidelidade é a rede de segurança da transformação.

**Qual a melhor estratégia de descoberta?**

A descoberta guiada por jornadas críticas e risco (top-down com deep dive): parte-se de uma jornada de negócio, segue-se a trilha de execução (call stack) e mapeia-se todo componente que ela toca. Isso isola rapidamente o código morto, que não pertence a jornada nenhuma.

**O que é a Matriz de Evidências?**

É um pool multifacetado que evita falsos-positivos: insumos estruturais (metadados, Apex, Flows), de estado (Custom Metadata/Settings), operacionais (Event Monitoring, Debug Logs, que revelam o código zumbi) e humanos (commits, tickets, entrevistas, que dão o porquê da regra).

**O que é o Inventário de Comportamentos?**

É o ativo final do mapeamento: não um catálogo de IFs/ELSEs, mas regras core, efeitos colaterais e workarounds históricos, cada um classificado pela confiança da evidência. Ele é a matéria-prima dos contratos de validação da fase seguinte.

## Glossário

- **As-Is** — Fotografia de alta fidelidade do que o sistema realmente faz hoje, antes de modernizar.
- **Matriz de Evidências** — Pool multifacetado (estrutural, estado, operacional, humano) que evita falsos-positivos na descoberta.
- **Inventário de Comportamentos** — Regras core, efeitos colaterais e workarounds do As-Is, classificados por confiança da evidência.
- **Conhecimento tribal** — Regras que sustentam o negócio mas que ninguém documentou; vivem na cabeça de poucos.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
