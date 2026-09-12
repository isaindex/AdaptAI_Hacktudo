/**
 * Adapt AI — Tela: Perfil de Aprendizagem (teste de 1º acesso)
 * As 4 perguntas do teste ficam guardadas em uma variável (array) e são
 * renderizadas uma de cada vez dentro do MESMO formulário do HTML —
 * nenhuma tela nova é criada. Ao final, um card flutuante mostra o
 * perfil identificado antes de seguir para as atividades.
 */
(function (AdaptAI) {
  const { qsa } = AdaptAI.util;
  const { abrirCardFlutuante } = AdaptAI.ui;

  const perguntas = [
    {
      enunciado: 'Quando você quer entender um assunto novo, o que mais te ajuda?',
      opcoes: [
        { texto: 'Ver um vídeo ou uma imagem explicando', perfil: 'visual' },
        { texto: 'Ler um texto explicando com calma', perfil: 'texto' },
        { texto: 'Tentar resolver um exercício e ir aprendendo na prática', perfil: 'pratico' },
        { texto: 'Ouvir alguém explicando em voz alta', perfil: 'auditivo' }
      ]
    },
    {
      enunciado: 'Depois de errar uma questão, o que ajuda mais a entender o erro?',
      opcoes: [
        { texto: 'Ver a explicação com uma imagem ou diagrama', perfil: 'visual' },
        { texto: 'Ler uma explicação detalhada em texto', perfil: 'texto' },
        { texto: 'Tentar de novo em um exercício parecido', perfil: 'pratico' },
        { texto: 'Ouvir alguém explicando o raciocínio', perfil: 'auditivo' }
      ]
    },
    {
      enunciado: 'Como você prefere revisar o conteúdo antes de uma prova?',
      opcoes: [
        { texto: 'Resumos visuais, mapas mentais ou imagens', perfil: 'visual' },
        { texto: 'Releitura do material em texto', perfil: 'texto' },
        { texto: 'Resolvendo exercícios antigos', perfil: 'pratico' },
        { texto: 'Explicando o conteúdo em voz alta pra alguém', perfil: 'auditivo' }
      ]
    },
    {
      enunciado: 'Se pudesse escolher, que tipo de atividade você faria primeiro?',
      opcoes: [
        { texto: 'Um desafio com imagem', perfil: 'visual' },
        { texto: 'Um texto pra ler e responder', perfil: 'texto' },
        { texto: 'Um problema pra resolver na prática', perfil: 'pratico' },
        { texto: 'Um áudio ou vídeo explicativo', perfil: 'auditivo' }
      ]
    }
  ];

  const nomesPerfil = {
    visual: 'Visual',
    texto: 'Leitura e escrita',
    pratico: 'Prático',
    auditivo: 'Auditivo'
  };

  const respostas = [];
  let indiceAtual = 0;

  const form = document.getElementById('form-pergunta');
  const legenda = document.getElementById('pergunta-enunciado');
  const opcoesLista = document.getElementById('opcoes-lista');
  const dots = qsa('.progress-dots__item');

  function renderizarPergunta(indice) {
    const pergunta = perguntas[indice];
    legenda.textContent = pergunta.enunciado;

    const labels = qsa('.opcao-item', opcoesLista);
    labels.forEach(function (label, i) {
      const opcao = pergunta.opcoes[i];
      const input = label.querySelector('input');
      const texto = label.querySelector('.opcao-item__texto');
      input.value = opcao.perfil;
      input.checked = i === 0;
      texto.textContent = opcao.texto;
    });

    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === indice);
      dot.classList.toggle('is-completo', i < indice);
    });
  }

  function perfilDominante() {
    const contagem = { visual: 0, texto: 0, pratico: 0, auditivo: 0 };
    respostas.forEach(function (perfil) {
      if (contagem[perfil] !== undefined) contagem[perfil] += 1;
    });

    return Object.keys(contagem).reduce(function (a, b) {
      return contagem[a] >= contagem[b] ? a : b;
    });
  }

  function mostrarResultado() {
    const perfil = perfilDominante();

    abrirCardFlutuante({
      titulo: 'Perfil identificado',
      fechavel: false,
      conteudoHTML:
        '<p>Seu perfil de aprendizagem: <strong>' + nomesPerfil[perfil] + '</strong></p>' +
        '<p>Vamos priorizar atividades desse formato para você. Isso pode mudar conforme você for respondendo mais atividades.</p>' +
        '<div class="panel__acoes">' +
          '<a class="button button--primary" href="aluno-atividades-personalizadas.html">Começar a aprender</a>' +
        '</div>'
    });
  }

  function irParaProximaPergunta(respostaSelecionada) {
    respostas.push(respostaSelecionada);
    indiceAtual += 1;

    if (indiceAtual < perguntas.length) {
      renderizarPergunta(indiceAtual);
    } else {
      mostrarResultado();
    }
  }

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const selecionado = form.querySelector('input[name="pergunta-atual"]:checked');
    irParaProximaPergunta(selecionado ? selecionado.value : null);
  });

  document.querySelector('[data-action="pular-pergunta"]').addEventListener('click', function () {
    irParaProximaPergunta(null);
  });

  renderizarPergunta(indiceAtual);

})(window.AdaptAI);
