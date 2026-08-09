// Conteúdo do questionário de autodiagnóstico (Seção 04 da spec).
// Separado da lógica (diagnostic.js) seguindo o padrão da casa
// (ver src/js/eai-quiz-data.js + src/js/eai-quiz.js).

export const QUESTIONS = [
  {
    id: 'q1',
    dim: 'invisibilidade',
    text: 'Como a sua empresa avalia a sua produtividade diária?',
    options: [
      { value: 'A', weight: 2, label: 'Pela contagem de tarefas/pontos fechados no Jira e visibilidade nas reuniões diárias.', tag: 'Peso de Invisibilidade: Alto' },
      { value: 'B', weight: 1, label: 'Pelo lançamento frequente de novas funcionalidades perceptíveis aos diretores.', tag: 'Peso de Invisibilidade: Médio' },
      { value: 'C', weight: 0, label: 'Pela complexidade dos problemas resolvidos, elegância arquitetural e estabilidade dos sistemas.', tag: 'Peso de Invisibilidade: Baixo' },
    ],
  },
  {
    id: 'q2',
    dim: 'extrativismo',
    text: 'Quanto tempo do seu dia é investido em orientar colegas, resolver conflitos e documentar processos?',
    options: [
      { value: 'A', weight: 2, label: 'Mais de 30% do meu tempo, mas essa dedicação não entra nas minhas metas formais de promoção.', tag: 'Extrativismo: Crítico' },
      { value: 'B', weight: 1, label: 'Faço isso pontualmente, mas sinto que prejudica minha entrega individual de código.', tag: 'Extrativismo: Moderado' },
      { value: 'C', weight: 0, label: 'Essa atividade é registrada, contabilizada e valorizada na minha avaliação de desempenho.', tag: 'Extrativismo: Nulo' },
    ],
  },
  {
    id: 'q3',
    dim: 'isomorfismo',
    text: 'O que acontece quando você recusa uma vaga de gestão para continuar na engenharia?',
    options: [
      { value: 'A', weight: 2, label: 'Sou visto como alguém "sem ambição", "estagnado" ou "pouco flexível".', tag: 'Sinal de Isomorfismo Hierárquico' },
      { value: 'B', weight: 1, label: 'Permaneço no mesmo nível salarial e perco poder de influência nas decisões.', tag: 'Sinal de Falsa Carreira em Y' },
      { value: 'C', weight: 0, label: 'Tenho acesso a uma trilha técnica paralela com equiparação salarial e poder de veto estratégico.', tag: 'Sinal de Maturidade' },
    ],
  },
  {
    id: 'q4',
    dim: 'autoexploracao',
    text: 'Quando ocorre um colapso na entrega ou na sua promoção, qual é a sua reação imediata?',
    options: [
      { value: 'A', weight: 2, label: 'Pergunto a mim mesmo "Onde foi que eu errei?" e me exijo trabalhar mais horas para compensar.', tag: 'Autoexploração / Sociedade do Desempenho' },
      { value: 'B', weight: 1, label: 'Sinto raiva da liderança, mas permaneço quieto por lealdade ao time.', tag: 'Otimismo Cruel / Lealdade Passiva' },
      { value: 'C', weight: 0, label: 'Reconheço a falha estrutural da empresa e separo minha identidade pessoal do cargo.', tag: 'Emancipação Identitária' },
    ],
  },
];

// Caminhos de Emancipação Positiva (spec 01, WU-05).
// Deliberadamente construtivos: o diagnóstico não termina em denúncia da
// estrutura, e sim em movimentos que o profissional controla a partir de
// segunda-feira. Cada item é uma ação, não um lamento.
export const ANTIDOTES = [
  'Torne legível o trabalho invisível: registre risco evitado, complexidade removida e autonomia gerada nos seus liderados — o que não é medido não é discutido, e você não precisa de permissão para começar a medir.',
  'Leve o vocabulário para o ciclo de avaliação: proponha MCSR, ISOM e AEGW como critérios explícitos, com exemplos do seu próprio semestre. Negociação com dados muda mais que reclamação.',
  'Exerça liderança de influência: alinhar times, comunicar trade-offs e sustentar um rumo arquitetural é ofício sênior legítimo — não é politicagem, e é o que faz o bom trabalho sobreviver na organização.',
  'Separe identidade de cargo: seu ofício e sua reputação técnica são seus e são portáteis. Se a estrutura não muda depois de um ciclo honesto de negociação, escolher uma organização que já reconheça esse valor também é um resultado do diagnóstico.',
];
