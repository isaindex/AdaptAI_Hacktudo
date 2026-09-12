/**
 * Adapt AI — Tela: Minhas Atividades (aluno)
 * O desafio e o resultado (telas 6 e 7 do protótipo) não viram páginas
 * novas: aparecem como cards flutuantes sobre esta mesma tela. O estado
 * da fila de atividades fica em variáveis (arrays/objetos) e a lista,
 * a barra de progresso e a recomendação são atualizadas a partir delas.
 */
(function (AdaptAI) {
  const { qs, qsa } = AdaptAI.util;
  const { abrirCardFlutuante } = AdaptAI.ui;

  const TOTAL_ATIVIDADES = 5;
  let concluidas = 3;
  let acertos = 3; // desempenho simulado das atividades já concluídas

  // Atividades ainda não feitas, em ordem. A primeira é sempre a "atual".
  const filaAtividades = [
    {
      id: '4',
      titulo: 'Desafio com imagem: troca gasosa nos alvéolos',
      formato: 'Imagem',
      enunciado: 'Observe a imagem e responda: qual estrutura é responsável pelas trocas gasosas?',
      alternativas: ['Traqueia', 'Brônquios', 'Alvéolos', 'Diafragma'],
      correta: 'Alvéolos',
      explicacao: 'Os alvéolos são estruturas onde ocorre a troca de oxigênio por gás carbônico com o sangue.'
    },
    {
      id: '5',
      titulo: 'Quiz: sistema respiratório (final)',
      formato: 'Quiz',
      enunciado: 'Qual a função do diafragma na respiração?',
      alternativas: [
        'Filtrar impurezas do ar',
        'Contrair e relaxar para permitir a entrada e saída de ar',
        'Produzir muco protetor',
        'Aquecer o ar antes de chegar aos pulmões'
      ],
      correta: 'Contrair e relaxar para permitir a entrada e saída de ar',
      explicacao: 'O diafragma se contrai e relaxa, mudando o volume da caixa torácica e permitindo a respiração.'
    }
  ];

  function atualizarProgresso() {
    const percentual = Math.round((concluidas / TOTAL_ATIVIDADES) * 100);
    const barra = document.getElementById('progresso-barra');
    const preenchido = document.getElementById('progresso-preenchido');
    const texto = document.getElementById('progresso-texto');

    barra.setAttribute('aria-valuenow', percentual);
    preenchido.style.width = percentual + '%';
    texto.textContent = percentual + '% concluído · ' + concluidas + ' de ' + TOTAL_ATIVIDADES + ' atividades';
  }

  function atualizarRecomendacao() {
    const secao = document.getElementById('recomendacao-section');
    const tituloEl = document.getElementById('recomendacao-titulo');
    const motivoEl = document.getElementById('recomendacao-motivo');

    if (filaAtividades.length === 0) {
      secao.innerHTML =
        '<span class="tag tag--recomendado">Tudo em dia</span>' +
        '<h2 class="recomendacao__titulo">Você concluiu todas as atividades desta aula!</h2>' +
        '<p class="recomendacao__motivo">Veja como foi seu desempenho na aba "Meu desempenho".</p>' +
        '<a class="button button--primary" href="aluno-meu-desempenho.html">Ver meu desempenho</a>';
      return;
    }

    const atual = filaAtividades[0];
    tituloEl.textContent = atual.titulo;
    motivoEl.textContent = 'Baseado no seu perfil: você aprende melhor com atividades em formato de ' + atual.formato.toLowerCase() + '.';
  }

  function marcarConcluida(id) {
    const item = document.querySelector('.atividade-card[data-atividade-id="' + id + '"]');
    if (!item) return;
    item.classList.remove('atividade-card--atual');
    item.classList.add('atividade-card--concluida');
    qs('.icon', item).className = 'icon icon--concluido';
    qs('.atividade-card__status', item).textContent = 'Concluída';
  }

  function promoverProximaAtual() {
    const proxima = filaAtividades[0];
    if (!proxima) return;
    const item = document.querySelector('.atividade-card[data-atividade-id="' + proxima.id + '"]');
    if (!item) return;
    item.classList.remove('atividade-card--proxima');
    item.classList.add('atividade-card--atual');
    qs('.icon', item).className = 'icon icon--atual';
    qs('.atividade-card__status', item).textContent = 'Atual';
  }

  function abrirResultado(acertou, atividade) {
    acertos += acertou ? 1 : 0;

    abrirCardFlutuante({
      titulo: 'Resultado',
      fechavel: false,
      conteudoHTML:
        '<p class="resultado__status">' + (acertou ? 'Você acertou!' : 'Não foi dessa vez.') + '</p>' +
        '<p><strong>Resposta correta:</strong> ' + atividade.correta + '</p>' +
        '<p>' + atividade.explicacao + '</p>' +
        '<dl class="resultado__desempenho">' +
          '<div><dt>Acertos</dt><dd>' + acertos + '/' + concluidas + '</dd></div>' +
          '<div><dt>Tempo</dt><dd>' + (Math.floor(Math.random() * 90) + 30) + ' s</dd></div>' +
        '</dl>' +
        '<div class="panel__acoes">' +
          '<button type="button" class="button button--primary" id="btn-proximo-desafio">Próximo desafio</button>' +
        '</div>'
    });

    qs('#btn-proximo-desafio').addEventListener('click', function () {
      AdaptAI.ui.fecharTodosCardsFlutuantes();

      marcarConcluida(atividade.id);
      filaAtividades.shift();
      concluidas += 1;
      promoverProximaAtual();
      atualizarProgresso();
      atualizarRecomendacao();
    });
  }

  function abrirDesafio() {
    const atividade = filaAtividades[0];
    if (!atividade) return;

    const alternativasHTML = atividade.alternativas.map(function (alternativa, indice) {
      return (
        '<label class="opcao-item">' +
          '<input type="radio" name="resposta-desafio" value="' + alternativa + '"' + (indice === 0 ? ' checked' : '') + '>' +
          '<span class="opcao-item__texto">' + alternativa + '</span>' +
        '</label>'
      );
    }).join('');

    const card = abrirCardFlutuante({
      titulo: atividade.titulo,
      conteudoHTML:
        '<span class="tag tag--formato">' + atividade.formato + '</span>' +
        '<p class="desafio__enunciado">' + atividade.enunciado + '</p>' +
        (atividade.formato === 'Imagem' ? '<div class="desafio__imagem-placeholder" aria-hidden="true">🫁</div>' : '') +
        '<div class="opcoes-lista" role="radiogroup">' + alternativasHTML + '</div>' +
        '<div class="panel__acoes">' +
          '<button type="button" class="button button--primary" id="btn-responder-desafio">Responder</button>' +
        '</div>'
    });

    qs('#btn-responder-desafio', card.elemento).addEventListener('click', function () {
      const selecionada = qs('input[name="resposta-desafio"]:checked', card.elemento);
      const acertou = selecionada && selecionada.value === atividade.correta;
      card.fechar();
      abrirResultado(acertou, atividade);
    });
  }

  document.getElementById('btn-comecar-atividade').addEventListener('click', abrirDesafio);

  document.addEventListener('click', function (evento) {
    const cardAtual = evento.target.closest('.atividade-card--atual');
    if (cardAtual) abrirDesafio();
  });

})(window.AdaptAI);
