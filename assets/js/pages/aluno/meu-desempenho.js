/**
 * Adapt AI — Tela: Meu Desempenho (aluno)
 * Anima o preenchimento suave das barras de progresso ao carregar a tela.
 */
document.addEventListener('DOMContentLoaded', function () {
  // Animação das barras horizontais
  const barras = document.querySelectorAll('.desempenho-item__fill, .barra__preenchido, .hero-stat-card__bar-fill');

  barras.forEach(function (barra) {
    const larguraFinal = barra.style.width || barra.getAttribute('data-width') || '100%';
    barra.style.width = '0%';
    setTimeout(function () {
      barra.style.transition = 'width 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)';
      barra.style.width = larguraFinal;
    }, 150);
  });

  // Animação do anel circular SVG
  const circuloBarra = document.querySelector('.circular-progress__bar');
  if (circuloBarra) {
    const raio = 40;
    const circunferencia = 2 * Math.PI * raio; // ~251.3
    const progressoEl = document.querySelector('.circular-progress');
    const valorProgresso = progressoEl ? Number(progressoEl.getAttribute('data-progress') || 78) : 78;
    const offsetFinal = circunferencia - (valorProgresso / 100) * circunferencia;

    circuloBarra.style.strokeDasharray = `${circunferencia}`;
    circuloBarra.style.strokeDashoffset = `${circunferencia}`;

    setTimeout(function () {
      circuloBarra.style.transition = 'stroke-dashoffset 1200ms cubic-bezier(0.2, 0.8, 0.2, 1)';
      circuloBarra.style.strokeDashoffset = `${offsetFinal}`;
    }, 200);
  }
});

