/**
 * Adapt AI — Tela: Minhas Turmas (professor)
 * Preenche cada card com os dados centralizados em assets/js/global/data.js,
 * evitando duplicar números entre esta tela e a de Acompanhamento.
 */
(function (AdaptAI) {
  const { qsa } = AdaptAI.util;
  const turmas = AdaptAI.data.turmas;

  function preencherCard(card) {
    const id = card.getAttribute("data-turma-id");
    const dados = turmas[id];
    if (!dados) return;

    qsa("[data-field]", card).forEach(function (elemento) {
      const campo = elemento.getAttribute("data-field");

      switch (campo) {
        case "alunos":
          elemento.textContent = dados.alunos;
          break;
        case "atividadesAtivas":
          elemento.textContent = dados.atividadesAtivas;
          break;
        case "desempenhoMedio":
          elemento.textContent = dados.desempenhoMedio + "%";
          break;
        default:
          elemento.textContent = dados[campo];
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    qsa(".turma-card").forEach(preencherCard);
  });
})(window.AdaptAI);
