/**
 * Adapt AI — Tela: Questionário do Aluno (aluno-form)
 * Gerencia a navegação suave entre as 3 etapas de preferências
 * e exibe o painel de celebração com animação ao finalizar.
 */
document.addEventListener('DOMContentLoaded', () => {
  const quizCardWrapper = document.getElementById('quizCardWrapper');
  const form = document.getElementById('formQuestionario');
  const resultadoFinal = document.getElementById('resultadoFinal');
  const btnAvancar = document.getElementById('btnAvancar');
  const btnVoltar = document.getElementById('btnVoltar');
  const quizStepTag = document.getElementById('quizStepTag');
  const progressoTexto = document.getElementById('progressoTexto');
  const formProgresso = document.getElementById('formProgresso');

  const perguntas = Array.from(form.querySelectorAll('.form-pergunta'));
  const totalPerguntas = perguntas.length;
  let indiceAtual = 0;

  function atualizarEstado() {
    // Exibe apenas a pergunta ativa
    perguntas.forEach((p, idx) => {
      p.hidden = idx !== indiceAtual;
    });

    // Atualiza barra e textos
    const progressoPercent = Math.round(((indiceAtual + 1) / totalPerguntas) * 100);
    formProgresso.style.width = `${progressoPercent}%`;
    quizStepTag.textContent = `Etapa ${indiceAtual + 1} de ${totalPerguntas}`;
    progressoTexto.textContent = `Pergunta ${indiceAtual + 1} de ${totalPerguntas}`;

    // Controla botão voltar
    if (indiceAtual > 0) {
      btnVoltar.style.display = 'inline-flex';
    } else {
      btnVoltar.style.display = 'none';
    }

    // Controla texto do botão avançar
    if (indiceAtual === totalPerguntas - 1) {
      btnAvancar.innerHTML = `
        <span>Enviar Preferências</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 8L6 12L14 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    } else {
      btnAvancar.innerHTML = `
        <span>Próxima</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
  }

  btnAvancar.addEventListener('click', () => {
    if (indiceAtual < totalPerguntas - 1) {
      indiceAtual++;
      atualizarEstado();
    } else {
      // Finalização do questionário
      if (quizCardWrapper) {
        quizCardWrapper.style.display = 'none';
      }
      form.hidden = true;
      resultadoFinal.hidden = false;
      resultadoFinal.style.display = 'flex';
      resultadoFinal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  btnVoltar.addEventListener('click', () => {
    if (indiceAtual > 0) {
      indiceAtual--;
      atualizarEstado();
    }
  });

  // Inicialização
  atualizarEstado();
});