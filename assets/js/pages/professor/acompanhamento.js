/**
 * Adapt AI — Tela: Acompanhamento da turma (professor)
 * As informações de cada turma ficam armazenadas em assets/js/global/data.js
 * (AdaptAI.data.turmas). Ao trocar a turma no seletor, esta tela apenas
 * re-renderiza o conteúdo com os dados daquela turma — nenhuma tela nova é
 * criada, tudo acontece dentro da mesma página.
 */
(function (AdaptAI) {
  const turmas = AdaptAI.data.turmas;

  const seletorTurma = document.getElementById("turma-select");
  const turmaTitulo = document.getElementById("turma-titulo");
  const turmaAtividadeAtual = document.getElementById("turma-atividade-atual");
  const metricAlunos = document.getElementById("metric-alunos");
  const metricConclusao = document.getElementById("metric-conclusao");
  const metricDesempenho = document.getElementById("metric-desempenho");
  const dificuldadesLista = document.getElementById("dificuldades-lista");
  const formatosLista = document.getElementById("formatos-lista");
  const insightsLista = document.getElementById("insights-lista");
  const usoPedagogico = document.getElementById("uso-pedagogico");

  function renderizarTurma(idTurma) {
    const dados = turmas[idTurma];
    if (!dados) return;

    turmaTitulo.textContent = dados.nome + " — Acompanhamento";
    turmaAtividadeAtual.textContent = dados.atividadeAtual;
    metricAlunos.textContent = dados.alunos;
    metricConclusao.textContent = dados.conclusao + "%";
    metricDesempenho.textContent = dados.desempenhoMedio + "%";

    dificuldadesLista.innerHTML = dados.dificuldades
      .map(function (item) {
        return (
          '<li class="ranking-item">' +
          '<span class="ranking-item__nome">' +
          item.nome +
          "</span>" +
          '<span class="ranking-item__valor">' +
          item.valor +
          "% de erro</span>" +
          "</li>"
        );
      })
      .join("");

    formatosLista.innerHTML = dados.formatos
      .map(function (item) {
        return (
          '<li class="formato-item">' +
          '<span class="formato-item__nome">' +
          item.nome +
          "</span>" +
          '<span class="formato-item__valor">' +
          item.valor +
          "% de conclusão</span>" +
          "</li>"
        );
      })
      .join("");

    insightsLista.innerHTML = dados.insights
      .map(function (texto) {
        return '<li class="insight-item">' + texto + "</li>";
      })
      .join("");

    usoPedagogico.textContent = "Sugestão: " + dados.sugestao;

    document
      .getElementById("acompanhamento-conteudo")
      .setAttribute("data-turma-id", idTurma);

    // mantém a turma selecionada na URL, para o link vindo de "Minhas turmas" funcionar
    const url = new URL(window.location.href);
    url.searchParams.set("turma", idTurma);
    window.history.replaceState({}, "", url);
  }

  function turmaInicial() {
    const params = new URLSearchParams(window.location.search);
    const daUrl = params.get("turma");
    return turmas[daUrl] ? daUrl : "8b";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const idInicial = turmaInicial();
    seletorTurma.value = idInicial;
    renderizarTurma(idInicial);

    seletorTurma.addEventListener("change", function () {
      renderizarTurma(seletorTurma.value);
    });
  });
})(window.AdaptAI);
