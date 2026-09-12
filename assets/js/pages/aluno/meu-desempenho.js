/**
 * Adapt AI — Tela: Meu Desempenho (aluno)
 * Os valores em si vêm do HTML (renderizados pelo backend no futuro).
 * Aqui só cuidamos da pequena animação de preenchimento das barras ao
 * carregar a tela, para reforçar a leitura dos dados.
 */
(function (AdaptAI) {
  const { qsa } = AdaptAI.util;

  document.addEventListener('DOMContentLoaded', function () {
    const barras = qsa('.barra__preenchido');

    barras.forEach(function (barra) {
      const larguraFinal = barra.style.width;
      barra.style.width = '0%';
      requestAnimationFrame(function () {
        barra.style.transition = 'width 600ms ease-out';
        barra.style.width = larguraFinal;
      });
    });
  });

})(window.AdaptAI);
