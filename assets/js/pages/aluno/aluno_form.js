document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formQuestionario');
  const resultadoFinal = document.getElementById('resultadoFinal');
  const btnAvancar = document.getElementById('btnAvancar');
  const perguntaAtualEl = document.getElementById('perguntaAtual');
  const totalPerguntasEl = document.getElementById('totalPerguntas');
  const formProgresso = document.getElementById('formProgresso');

  const perguntas = Array.from(form.querySelectorAll('.form-pergunta'));
  const totalPerguntas = perguntas.length;
  totalPerguntasEl.textContent = totalPerguntas;

  let indiceAtual = 0;

  function atualizarProgresso() {
    perguntaAtualEl.textContent = indiceAtual + 1;
    formProgresso.style.width = `${((indiceAtual + 1) / totalPerguntas) * 100}%`;
  }

  function avancarPergunta() {
    
    perguntas[indiceAtual].hidden = true;

    const ultimaPergunta = indiceAtual === totalPerguntas - 1;

    if (ultimaPergunta) {
      form.hidden = true;
      resultadoFinal.hidden = false;
      resultadoFinal.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }


    indiceAtual++;
    perguntas[indiceAtual].hidden = false;

    atualizarProgresso();

    if (indiceAtual === totalPerguntas - 1) {
      btnAvancar.textContent = 'Enviar';
    }
  }

  btnAvancar.addEventListener('click', avancarPergunta);

  atualizarProgresso();
});