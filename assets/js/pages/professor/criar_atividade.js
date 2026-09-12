/**
 * Adapt AI — Tela: Criar Atividade (professor)
 * - Anexo de material em PDF (sem campo de texto livre).
 * - "Gerar atividades com IA" mostra um card flutuante de progresso
 *   (inspirado no protótipo enviado) e depois revela a etapa de revisão.
 * - Editar / excluir atividade e publicar usam cards flutuantes, sem criar
 *   novas telas HTML.
 */
(function (AdaptAI) {
  const { qs, qsa } = AdaptAI.util;
  const { abrirCardFlutuante } = AdaptAI.ui;

  // ---------- Anexo de PDF ----------
  const inputPdf = document.getElementById("material-pdf");
  const botaoAnexarPdf = document.getElementById("botao-anexar-pdf");
  const anexoVazio = document.getElementById("anexo-vazio");
  const anexoLista = document.getElementById("anexo-lista");

  let arquivoAnexado = null;

  function formatarTamanho(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  function renderizarAnexo() {
    if (!arquivoAnexado) {
      anexoVazio.hidden = false;
      anexoLista.hidden = true;
      anexoLista.innerHTML = "";
      return;
    }

    anexoVazio.hidden = true;
    anexoLista.hidden = false;
    anexoLista.innerHTML =
      '<li class="anexo-item">' +
      '<span class="anexo-item__nome">' +
      arquivoAnexado.name +
      "</span>" +
      '<span class="anexo-item__tamanho">' +
      formatarTamanho(arquivoAnexado.size) +
      "</span>" +
      '<button type="button" class="button button--texto" id="botao-remover-pdf">Remover</button>' +
      "</li>";

    qs("#botao-remover-pdf", anexoLista).addEventListener("click", function () {
      arquivoAnexado = null;
      inputPdf.value = "";
      renderizarAnexo();
    });
  }

  botaoAnexarPdf.addEventListener("click", function () {
    inputPdf.click();
  });

  inputPdf.addEventListener("change", function () {
    const arquivo = inputPdf.files[0];
    if (!arquivo) return;

    if (arquivo.type !== "application/pdf") {
      abrirCardFlutuante({
        titulo: "Arquivo inválido",
        conteudoHTML: "<p>Envie um arquivo em formato PDF.</p>",
      });
      inputPdf.value = "";
      return;
    }

    arquivoAnexado = arquivo;
    renderizarAnexo();
  });

  // ---------- Gerar atividades com IA ----------
  const formAula = document.getElementById("form-aula");
  const etapaConteudo = document.getElementById("etapa-conteudo");
  const etapaAtividadesGeradas = document.getElementById(
    "etapa-atividades-geradas",
  );
  const stepIndicadorItens = qsa(".step-indicator__item");

  const etapasGeracao = [
    "Analisando conteúdo do PDF",
    "Definindo nível e objetivos",
    "Gerando desafios e quiz",
    "Quase pronto",
  ];

  function irParaEtapa(numero) {
    stepIndicadorItens.forEach(function (item) {
      item.classList.toggle(
        "is-active",
        Number(item.getAttribute("data-step")) === numero,
      );
    });
  }

  function mostrarCardGerando() {
    const listaHTML = etapasGeracao
      .map(function (texto, indice) {
        return (
          '<li class="progresso-geracao__item" data-indice="' +
          indice +
          '">' +
          '<span class="progresso-geracao__marcador"></span>' +
          '<span class="progresso-geracao__texto">' +
          texto +
          "</span>" +
          "</li>"
        );
      })
      .join("");

    const card = abrirCardFlutuante({
      titulo: "Gerando atividades",
      conteudoHTML: '<ol class="progresso-geracao">' + listaHTML + "</ol>",
      fechavel: false,
    });

    const itens = qsa(".progresso-geracao__item", card.elemento);

    itens.forEach(function (item, indice) {
      setTimeout(
        function () {
          item.classList.add("is-concluido");
        },
        (indice + 1) * 650,
      );
    });

    setTimeout(
      function () {
        card.fechar();
        etapaConteudo.hidden = true;
        etapaAtividadesGeradas.hidden = false;
        irParaEtapa(2);
        etapaAtividadesGeradas.scrollIntoView({ behavior: "smooth" });
      },
      (etapasGeracao.length + 1) * 650,
    );
  }

  formAula.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (!arquivoAnexado) {
      abrirCardFlutuante({
        titulo: "Falta o material da aula",
        conteudoHTML:
          "<p>Anexe um PDF com o conteúdo antes de gerar as atividades.</p>",
      });
      return;
    }

    mostrarCardGerando();
  });

  document
    .querySelector('[data-action="voltar-conteudo"]')
    .addEventListener("click", function () {
      etapaAtividadesGeradas.hidden = true;
      etapaConteudo.hidden = false;
      irParaEtapa(1);
      etapaConteudo.scrollIntoView({ behavior: "smooth" });
    });

  // ---------- Editar / excluir atividade (cards flutuantes) ----------
  qsa(".icon-button--editar").forEach(function (botao) {
    botao.addEventListener("click", function () {
      const item = botao.closest(".atividade-item");
      const titulo = qs(".atividade-item__titulo", item);
      const descricao = qs(".atividade-item__descricao", item);

      const card = abrirCardFlutuante({
        titulo: "Editar atividade",
        conteudoHTML:
          '<div class="field">' +
          '<label for="editar-titulo">Título</label>' +
          '<input type="text" id="editar-titulo" value="' +
          titulo.textContent +
          '">' +
          "</div>" +
          '<div class="field">' +
          '<label for="editar-descricao">Descrição</label>' +
          '<textarea id="editar-descricao" rows="3">' +
          descricao.textContent +
          "</textarea>" +
          "</div>" +
          '<div class="panel__acoes">' +
          '<button type="button" class="button button--primary" id="salvar-edicao">Salvar</button>' +
          "</div>",
      });

      qs("#salvar-edicao", card.elemento).addEventListener(
        "click",
        function () {
          titulo.textContent = qs("#editar-titulo", card.elemento).value;
          descricao.textContent = qs("#editar-descricao", card.elemento).value;
          card.fechar();
        },
      );
    });
  });

  qsa(".icon-button--excluir").forEach(function (botao) {
    botao.addEventListener("click", function () {
      const item = botao.closest(".atividade-item");
      const titulo = qs(".atividade-item__titulo", item).textContent;

      const card = abrirCardFlutuante({
        titulo: "Remover atividade",
        conteudoHTML:
          '<p>Remover "' +
          titulo +
          '" desta aula?</p>' +
          '<div class="panel__acoes">' +
          '<button type="button" class="button button--secundario" id="cancelar-remocao">Cancelar</button>' +
          '<button type="button" class="button button--primary" id="confirmar-remocao">Remover</button>' +
          "</div>",
      });

      qs("#cancelar-remocao", card.elemento).addEventListener(
        "click",
        card.fechar,
      );
      qs("#confirmar-remocao", card.elemento).addEventListener(
        "click",
        function () {
          item.remove();
          card.fechar();
        },
      );
    });
  });

  // ---------- Publicar para a turma ----------
  document
    .querySelector('[data-action="publicar-turma"]')
    .addEventListener("click", function () {
      abrirCardFlutuante({
        titulo: "Aula publicada",
        conteudoHTML:
          "<p>As atividades foram publicadas para a turma. Os alunos já podem acessá-las pelo celular.</p>" +
          '<div class="panel__acoes">' +
          '<a class="button button--primary" href="professor-turmas.html">Voltar para minhas turmas</a>' +
          "</div>",
      });
    });
})(window.AdaptAI);
