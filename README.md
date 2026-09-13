# adapt.IA

> **Do conteúdo do professor à aprendizagem de cada estudante.**

O **adapt.IA** é um protótipo de plataforma educacional que transforma o conteúdo de uma aula em uma jornada de aprendizagem interativa. A experiência possui dois pontos de vista: o do professor, que cria atividades e acompanha suas turmas, e o do estudante, que responde a um questionário de preferências, recebe atividades personalizadas e acompanha seu progresso.

Este projeto foi desenvolvido para o **HACKTUDO 2026 — Tecnologia com Propósito**.

## Sobre o projeto

O smartphone pode competir com a atenção dos estudantes, mas também pode ser uma ferramenta pedagógica quando usado com um objetivo claro. O adapt.IA propõe uma experiência em que o mesmo conteúdo pode ser apresentado em diferentes formatos, considerando as preferências e o desempenho de cada estudante.

O protótipo demonstra esse ciclo:

```text
Professor cria uma aula
	↓
Anexa o material em PDF
	↓
Atividades são geradas para revisão
	↓
Estudante responde ao questionário de preferências
	↓
Atividade recomendada para o seu perfil
	↓
Resposta, feedback e progresso
	↓
Professor acompanha dificuldades e formatos mais eficazes
```

## O que está implementado

### Experiência do estudante

- Jornada inicial com trilha de desafios e progresso da aula;
- Questionário de preferências de aprendizagem em três etapas;
- Identificação de um perfil preferencial, como visual, leitura e escrita, prático ou auditivo;
- Lista de atividades personalizadas para a aula de Sistema Respiratório;
- Desafio interativo com imagem, alternativas e feedback de acerto ou erro;
- Atualização local de atividades concluídas e percentual de progresso;
- Tela de desempenho com domínio geral, XP, desafios concluídos, progresso por conteúdo e formatos recomendados.

### Experiência do professor

- Dashboard de acompanhamento da turma;
- Seleção entre as turmas 7º Ano A, 8º Ano B e 9º Ano A;
- Métricas de alunos, conclusão e desempenho médio;
- Visualização de dificuldades, formatos com maior conclusão e insights pedagógicos;
- Lista de turmas com atividade atual e desempenho médio;
- Criação de atividade a partir de um arquivo PDF;
- Simulação do processo de geração de atividades com IA;
- Etapa de revisão com edição, exclusão e publicação das atividades geradas;
- Navegação responsiva com menu lateral no desktop e menu hambúrguer no mobile.

## Limites atuais do protótipo

O sistema atual é um protótipo front-end estático. Para facilitar a demonstração, os dados ficam em [assets/js/global/data.js](assets/js/global/data.js) e os resultados são mantidos apenas em memória durante a navegação.

Ainda não estão conectados:

- back-end ou API;
- banco de dados;
- autenticação de estudantes e professores;
- serviço real de inteligência artificial;
- persistência de respostas, perfis ou progresso;
- upload de PDF para um servidor;
- geração efetiva de atividades a partir do conteúdo do arquivo.

O botão **Gerar atividades com IA** reproduz o fluxo visual de análise e geração, mas não chama uma API. O PDF selecionado também é validado apenas no navegador.

## Como executar

Não há etapa de build nem dependências de Node.js para executar o protótipo.

### Opção 1: abrir diretamente no navegador

Abra qualquer uma das páginas HTML, começando por:

- `aluno-inicio.html` para a jornada do estudante;
- `professor-acompanhamento.html` para o dashboard do professor.

Os scripts usam caminhos relativos e foram organizados para funcionar também ao abrir os arquivos diretamente no navegador.

### Opção 2: usar um servidor local

Na raiz da pasta `AdaptAI_Hacktudo`, execute:

```bash
python3 -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000/aluno-inicio.html
http://localhost:8000/professor-acompanhamento.html
```

## Estrutura do projeto

```text
AdaptAI_Hacktudo/
├── aluno-inicio.html
├── aluno-form.html
├── aluno-atividades-personalizadas.html
├── aluno-desafio.html
├── aluno-meu-desempenho.html
├── professor-acompanhamento.html
├── professor-turmas.html
├── professor-desafios.html
├── professor-criar-atividade.html
├── assets/
│   ├── css/
│   │   ├── global/
│   │   └── pages/
│   ├── images/
│   └── js/
│       ├── global/
│       └── pages/
├── README.md
```

## Tecnologias utilizadas

- HTML5;
- CSS3, com estilos globais e estilos específicos por página;
- JavaScript puro, sem framework;
- SVG e imagens locais para ícones, mascote e atividades;
- Google Fonts, com a família Baloo 2;
- APIs nativas do navegador, como `URLSearchParams`, `File API`, `localização no histórico` e manipulação do DOM.

O arquivo `assets/js/all.js` reúne imports para referência, mas as páginas utilizam os scripts necessários diretamente com tags `<script>` para continuarem funcionando sem um bundler.

## Privacidade e uso dos dados

O protótipo não envia dados para um servidor nem cria rankings públicos entre estudantes. Os números exibidos no acompanhamento e no desempenho são dados de demonstração definidos localmente.

Em uma versão de produção, será necessário definir autenticação, persistência, controle de acesso, consentimento e políticas de tratamento de dados de acordo com a LGPD e com o contexto escolar.

## Arquitetura planejada

A implementação atual cobre a camada de interface e uma simulação de comportamento. A evolução prevista é conectar essa interface a serviços reais:

```text
Interface HTML/CSS/JavaScript
	      ↓
	API da aplicação
	  ↙          ↘
Banco de dados     Serviço de IA
	      ↓
     Perfil, respostas, progresso
	      ↓
      Personalização e insights
```

Essa arquitetura é uma proposta para as próximas etapas, não um componente já entregue neste repositório.

## Próximos passos

- Conectar o front-end a um back-end e a um banco de dados;
- Implementar autenticação e perfis de acesso;
- Integrar uma API de IA para analisar materiais e gerar atividades;
- Persistir respostas, desempenho e evolução do perfil adaptativo;
- Substituir os dados demonstrativos do professor por dados reais;
- Implementar os itens de navegação ainda representados por links de demonstração;
- Testar a experiência com estudantes e professores;
- Validar acessibilidade, privacidade e uso responsável dos dados.

## Equipe

Projeto desenvolvido durante o **HACKTUDO 2026**, dentro do tema **Tecnologia com Propósito**.

> **adapt.IA — Mesmo conteúdo. Diferentes caminhos. Mais aprendizagem.**
