// Abre/fecha o menu hambúrguer do aluno (equivalente ao do professor)
    (function () {
      var btnAbrir = document.getElementById('btn-hamburguer-aluno');
      var btnFechar = document.getElementById('btn-fechar-sidebar-aluno');
      var backdrop = document.getElementById('sidebar-backdrop-aluno');
      var sidebar = document.getElementById('sidebar-aluno');

      function abrirMenu() {
        sidebar.classList.add('is-open');
        backdrop.classList.add('is-visible');
        btnAbrir.setAttribute('aria-expanded', 'true');
      }

      function fecharMenu() {
        sidebar.classList.remove('is-open');
        backdrop.classList.remove('is-visible');
        btnAbrir.setAttribute('aria-expanded', 'false');
      }

      btnAbrir.addEventListener('click', abrirMenu);
      btnFechar.addEventListener('click', fecharMenu);
      backdrop.addEventListener('click', fecharMenu);
    })();