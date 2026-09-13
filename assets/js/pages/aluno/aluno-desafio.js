/**
 * Adapt AI — Tela: Desafio Interativo (Telas 2 e 3)
 * Controla a seleção de opções, avaliação da resposta e transição de estados.
 */
document.addEventListener('DOMContentLoaded', () => {
  const opcoes = document.querySelectorAll('.desafio-opcao');
  const btnAction = document.getElementById('btnDesafioAction');
  const toast = document.getElementById('desafioToast');
  
  let opcaoSelecionada = 'D'; // Alvéolos pré-selecionado conforme Tela 2
  let respondido = false;

  // Trata o clique nas alternativas
  opcoes.forEach(opcao => {
    opcao.addEventListener('click', () => {
      if (respondido) return; // Não altera após responder

      opcoes.forEach(o => o.classList.remove('is-selected'));
      opcao.classList.add('is-selected');
      opcaoSelecionada = opcao.dataset.valor;

      btnAction.disabled = false;
      btnAction.textContent = 'Responder';
      btnAction.className = 'btn-desafio-action btn-desafio-action--responder';
    });
  });

  // Trata o clique no botão de ação (Responder / Continue)
  btnAction.addEventListener('click', () => {
    if (!respondido) {
      respondido = true;
      const opcaoCorreta = document.querySelector('.desafio-opcao[data-valor="D"]');

      if (opcaoSelecionada === 'D') {
        // Usuário acertou: destaca opção D em verde
        opcaoCorreta.classList.remove('is-selected');
        opcaoCorreta.classList.add('is-correct');

        mostrarToast('Excelente! Você acertou! A estrutura correta é Alvéolos.', 'success');
      } else {
        // Usuário errou:
        // 1. Marca a alternativa escolhida na paleta LARANJA
        const opcaoErrada = document.querySelector(`.desafio-opcao[data-valor="${opcaoSelecionada}"]`);
        if (opcaoErrada) {
          opcaoErrada.classList.remove('is-selected');
          opcaoErrada.classList.add('is-wrong');
        }

        // 2. Informa/destaca a alternativa CORRETA na paleta VERDE
        if (opcaoCorreta) {
          opcaoCorreta.classList.add('is-correct');
        }

        // 3. Feedback em laranja informando a resposta certa (sem pedir para tentar novamente)
        mostrarToast('Resposta incorreta! A estrutura correta é: D (Alvéolos).', 'error');
      }

      // Em ambos os casos, habilita o botão para "Continue" (roxo)
      btnAction.textContent = 'Continue';
      btnAction.className = 'btn-desafio-action btn-desafio-action--continue';
    } else {
      // Estado: Usuário clica em Continue
      mostrarToast('Desafio concluído! Retornando à jornada...', 'success');
      setTimeout(() => {
        window.location.href = 'aluno-inicio.html';
      }, 900);
    }
  });

  function mostrarToast(mensagem, tipo = 'success') {
    if (!toast) return;
    toast.textContent = mensagem;
    toast.className = `desafio-feedback-toast desafio-feedback-toast--${tipo} show`;
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});
