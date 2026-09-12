/**
 * Adapt AI — dados de demonstração
 * Em produção isso viria de uma API. Por enquanto os dados de cada turma
 * ficam centralizados aqui para alimentar tanto a tela de Turmas quanto a
 * de Acompanhamento, sem duplicar números nos dois lugares.
 */
window.AdaptAI = window.AdaptAI || {};

(function (AdaptAI) {
  const turmas = {
    "7a": {
      nome: "7º Ano A",
      disciplina: "Ciências",
      atividadeAtual: "Sistema Digestório",
      alunos: 28,
      atividadesAtivas: 2,
      conclusao: 65,
      desempenhoMedio: 74,
      dificuldades: [
        { nome: "Enzimas digestivas", valor: 38 },
        { nome: "Órgãos do sistema digestório", valor: 25 },
        { nome: "Absorção de nutrientes", valor: 15 },
      ],
      formatos: [
        { nome: "Imagem", valor: 85 },
        { nome: "Quiz", valor: 70 },
        { nome: "Texto", valor: 50 },
      ],
      insights: [
        "A turma responde melhor a atividades visuais do que a textos longos.",
        "Alunos revisam o conteúdo sobre enzimas mais de uma vez antes de acertar.",
      ],
      sugestao:
        'Reforçar "enzimas digestivas" com mais atividades em formato de imagem.',
    },

    "8b": {
      nome: "8º Ano B",
      disciplina: "Ciências",
      atividadeAtual: "Sistema Respiratório",
      alunos: 31,
      atividadesAtivas: 1,
      conclusao: 72,
      desempenhoMedio: 68,
      dificuldades: [
        { nome: "Trocas gasosas nos alvéolos", valor: 42 },
        { nome: "Nomenclatura das estruturas", valor: 31 },
        { nome: "Função do diafragma", valor: 18 },
      ],
      formatos: [
        { nome: "Imagem", valor: 89 },
        { nome: "Quiz", valor: 76 },
        { nome: "Texto", valor: 58 },
      ],
      insights: [
        "Alunos com atividades em imagem concluem 30% mais rápido do que com texto puro nesta turma.",
        "78% dos alunos que erraram a questão sobre alvéolos acertaram após revisar o desafio com imagem.",
      ],
      sugestao:
        'Reforçar "trocas gasosas nos alvéolos" com mais atividades em formato de imagem.',
    },

    "9a": {
      nome: "9º Ano A",
      disciplina: "Ciências",
      atividadeAtual: "Genética Básica",
      alunos: 26,
      atividadesAtivas: 3,
      conclusao: 80,
      desempenhoMedio: 81,
      dificuldades: [
        { nome: "Dominância e recessividade", valor: 29 },
        { nome: "Cruzamentos genéticos (Punnett)", valor: 22 },
        { nome: "Vocabulário da genética", valor: 12 },
      ],
      formatos: [
        { nome: "Quiz", valor: 91 },
        { nome: "Imagem", valor: 83 },
        { nome: "Texto", valor: 66 },
      ],
      insights: [
        "A turma tem bom desempenho geral, com destaque para atividades em quiz.",
        "Cruzamentos genéticos ainda geram dúvida mesmo depois da explicação em texto.",
      ],
      sugestao:
        "Adicionar um desafio prático de cruzamento genético (quadro de Punnett) para reforço.",
    },
  };

  AdaptAI.data = { turmas };
})(window.AdaptAI);
