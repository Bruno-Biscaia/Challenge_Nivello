<h1>Challenge Nivello 2023</h1>


<h2>Descrição do Projeto:</h2>
<p>Este projeto, denominado Challenge Nivello 2023, é uma aplicação web desenvolvida usando Next.js com TypeScript no frontend e C#/.NET no backend.
  O objetivo principal deste projeto é criar uma aplicação que cadastre usuários e seja possivel realizar um CRUD completo nessa aplicação.</p>
  
  <h4>Desafios e Regras Gerais:</h4>
<ul>
  <li>Um usuário não pode criar um novo usuário ou alterar a role de um usuário para uma role igual ou acima da dele.</li>
  <li>Um usuário não pode alterar sua própria role</li>
  <li>Clean code e solid devem ser respeitados.</li>
</ul>

 <h4>Regras para BackEnd:</h4>
<ul>
  <li>Criar um projeto de API que contenha uma estrutura clean:
    - API, Service, Infraestructure (para as interfaces), Repository.
  </li>
  <li>Nessa API teremos 2 controllers, um UserController e um RoleController.</li>
  <li>Na User Controller teremos métodos HTTP para obter um usuario (GET), obter vários usuários com filtro de role (GET), método de login (POST), criar um novo usuário (POST) e editar um usuário (PUT)</li>
  <li>Na Role Controller teremos métodos HTTP para obter todas as Roles (GET).</li>
  <li>Em todos os métodos (menos no login) será enviado pelo front o id do usuário logado na propriedade (currentUserId)</li>
  <li>Para acesso ao banco (me peça as credenciais) pode usar qualquer coisa: Entity, Ado.NET, Subsonic, Dapper.</li>
  <li>Utilizar Injeção de dependência, utilizar criptografia ao salvar a senha e ao fazer login.</li>
</ul>

 <h4>Regras para FrontEnd:</h4>
<ul>
  <li>Criar um projeto de REACT (npx create-next-app@latest) que contenha uma estrutura:
    - Services (para as requests), models (para os objetos type script), views (para as telas), components (para os componentes)
  </li>
  <li>3 telas - Uma de login que deve ser pública (apenas salvar o currentUserId de uma maneira global), uma de Usuários que deve ser privada (somente logada, deve enviar nas requests a propriedade currentUserId) para listar, criar ou editar um usuário e uma de edição do usuário selecionado, passando o ID por parâmetro.</li>
  <li>Na tela de edição de usuário, o usuário pode apenas alterar a role do usuário selecionado e seu nome.</li>
  <li>Um botão de logout que retorna para página inicial (login).</li>
  <li>Exibir validações retornadas pelo backend.</li>
  <li>Padrões: Componentização (atomic design), HTTP (axios), Context API (de forma explícita), Functional Component, props, hooks e HOC (precisa ter um).</li>
  <li>Utilizar Tailwind  para uma formatação de estilo e responsividade (importante!)</li>
</ul>

<h2>Tecnologias Utilizadas:</h2>
<ul>
  <li><strong>Frontend:</strong> Next.js, TypeScript</li>
  <li><strong>Backend:</strong> C#/.NET</li>
  <li><strong>Banco de Dados:</strong> [Nome do Banco de Dados, se aplicável]</li>
  <li><strong>Outros:</strong> [Liste outras tecnologias ou bibliotecas usadas, como autenticação, estilização, etc.]</li>
</ul>

<h2>Configuração do Ambiente:</h2>

<h3>Pré-requisitos:</h3>
<ul>
  <li>Node.js (versão X.X.X ou superior)</li>
  <li>.NET SDK (versão X.X ou superior)</li>
  <li>[Outras dependências, se houver]</li>
</ul>

<h3>Instalação:</h3>
<ol>
  <li>Clone o repositório do projeto:
    <code>git clone https://github.com/seu-usuario/challenge-nivello-2023.git</code></li>
  <li>Navegue até o diretório do projeto:
    <code>cd challenge-nivello-2023</code></li>
  <li><strong>Frontend (Next.js)</strong></li>
  <ul>
    <li>Instale as dependências do frontend:
      <code>cd frontend</code>
      <code>npm install</code></li>
    <li>Inicie o servidor de desenvolvimento:
      <code>npm run dev</code></li>
  </ul>
  <li><strong>Backend (.NET)</strong></li>
  <ul>
    <li>Navegue até o diretório do backend:
      <code>cd backend</code></li>
    <li>[Instruções específicas para configurar o ambiente do backend]</li>
    <li>Inicie o servidor backend:
      <code>dotnet run</code></li>
  </ul>
</ol>

<h2>Estrutura do Projeto</h2>
<pre>
challenge-nivello-2023/
|-- frontend/                  # Código-fonte do frontend Next.js
|   |-- pages/                 # Páginas da aplicação
|   |-- components/            # Componentes reutilizáveis
|   |-- styles/                # Estilos globais e de componentes
|   |-- ...
|-- backend/                   # Código-fonte do backend C#/.NET
|   |-- Controllers/           # Controladores da API
|   |-- Models/                # Modelos de dados
|   |-- Services/              # Lógica de negócios e serviços
|   |-- ...
|-- README.md                  # Documentação do projeto
|-- ...
</pre>

<h2>Contribuição</h2>
<p>Para contribuir com este projeto, siga as diretrizes de contribuição e envie um pull request com suas alterações.</p>

<h2>Licença</h2>
<p>Este projeto está licenciado sob a <a href="LICENSE">Licença MIT</a>.</p>
