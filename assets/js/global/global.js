/**
 * Adapt AI — utilitários globais
 * Namespace único (window.AdaptAI) para evitar conflitos entre os scripts
 * de cada página, sem depender de ES Modules (funciona mesmo abrindo os
 * arquivos direto pelo navegador, sem servidor).
 */
window.AdaptAI = window.AdaptAI || {};

(function (AdaptAI) {
  function qs(seletor, escopo) {
    return (escopo || document).querySelector(seletor);
  }

  function qsa(seletor, escopo) {
    return Array.from((escopo || document).querySelectorAll(seletor));
  }

  /**
   * Cria e exibe um card flutuante (modal) sobre a tela atual.
   * @param {Object} opcoes
   * @param {string} opcoes.titulo
   * @param {string} opcoes.conteudoHTML - HTML interno do corpo do card
   * @param {boolean} [opcoes.fechavel=true] - mostra o botão de fechar / permite fechar clicando fora
   * @param {Function} [opcoes.aoFechar] - callback disparado quando o card é fechado
   * @returns {{elemento: HTMLElement, fechar: Function}}
   */
  function abrirCardFlutuante(opcoes) {
    const { titulo, conteudoHTML, fechavel = true, aoFechar } = opcoes;

    const overlay = document.createElement("div");
    overlay.className = "floating-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    overlay.innerHTML = `
      <div class="floating-card">
        <header class="floating-card__header">
          <h2 class="floating-card__titulo">${titulo || ""}</h2>
          ${fechavel ? '<button type="button" class="floating-card__fechar" aria-label="Fechar">&times;</button>' : ""}
        </header>
        <div class="floating-card__corpo">${conteudoHTML || ""}</div>
      </div>
    `;

    function fechar() {
      overlay.remove();
      document.removeEventListener("keydown", aoTeclarEsc);
      if (typeof aoFechar === "function") aoFechar();
    }

    function aoTeclarEsc(evento) {
      if (evento.key === "Escape" && fechavel) fechar();
    }

    if (fechavel) {
      overlay.addEventListener("click", function (evento) {
        if (evento.target === overlay) fechar();
      });
      qs(".floating-card__fechar", overlay).addEventListener("click", fechar);
      document.addEventListener("keydown", aoTeclarEsc);
    }

    document.body.appendChild(overlay);

    return { elemento: overlay, fechar: fechar };
  }

  function fecharTodosCardsFlutuantes() {
    qsa(".floating-overlay").forEach(function (overlay) {
      overlay.remove();
    });
  }

  AdaptAI.util = { qs, qsa };
  AdaptAI.ui = {
    abrirCardFlutuante,
    fecharTodosCardsFlutuantes,
  };
})(window.AdaptAI);
