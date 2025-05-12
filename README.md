# API-Lumibook

Uma API RESTful para **gerenciamento completo de uma livraria**, desde o catálogo de livros até o controle de empréstimos, multas e auditoria de operações.

---

## ✨ Funcionalidades

* **Livros**: CRUD completo (título, autor, ISBN, assunto, gênero, etc.)
* **Exemplares**: Controle de cada cópia física (localização, status).
* **Usuários**: Cadastro, consulta e atualização de dados (nome, e-mail, telefone).
* **Empréstimos**: Registro, devolução e listagem de empréstimos (data de empréstimo, previsão e efetiva).
* **Itens de Empréstimo**: Itens vinculados a cada empréstimo (vários exemplares por empréstimo).
* **Reservas**: Usuários podem reservar livros indisponíveis.
* **Multas**: Geração automática de multas por atraso, com status de pagamento.
* **Autores**: Cadastro e gerenciamento de autores (nome, nacionalidade).
* **Editoras**: Cadastro e gerenciamento de editoras (nome, endereço, contato).
* **Funcionários**: Registro e consulta de funcionários da livraria.
* **Relacionamento Livro–Autor**: Associação de múltiplos autores a um livro.
* **Auditoria**: Logs de todas as operações críticas (quem fez, quando, detalhe da ação).
* **Endpoint de Status**: Rápida verificação de que a API está online.

---

## 📦 Tecnologias

* **Node.js** + **Express.js**
* **MongoDB** via **Mongoose**
* **dotenv** para variáveis de ambiente
* **cors**
* **bcryptjs** (hash de senhas)

### Dev & Test

* **nodemon** (reload automático)
* **Jest** + **Supertest** (testes unitários e de integração)
* **mongodb-memory-server** (banco em memória para testes)

---

## ⚙️ Pré-requisitos

* **Node.js** v14 ou superior
* **npm**
* **MongoDB** em execução (ou string Mongo Atlas)

---

## 🛠️ Instalação e Execução

1. **Clone o repositório**

   ```bash
   git clone https://github.com/VictorVahid/API-Lumibook.git
   cd API-Lumibook
   ```

2. **Instale dependências**

   ```bash
   npm install
   ```

3. **Configure o `.env`** na raiz:

   ```dotenv
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/lumibook
   ```

4. **Execute**

   * Desenvolvimento (autoreload):

     ```bash
     npm run dev
     ```
   * Produção:

     ```bash
     npm start
     ```

5. **Testes**

   ```bash
   npm test
   ```

---

## 🗂️ Estrutura de Pastas

```
src/
├── controllers/         # Lógica das rotas (HTTP)
├── domain/              # Entidades de negócio e interfaces de repositório
├── infrastructure/      # Conexão com Mongo & implementações de repositório
├── routes/              # Definição dos endpoints
├── services/            # Casos de uso (lógica aplicada)
├── app.js               # Configuração do Express
└── server.js            # Conexão com BD e start do servidor
```

---

## 🚀 Endpoints

> Base URL: `http://localhost:<PORT>/api`

### Status

* **GET** `/status`
  Verifica se a API está online.

---

### Livros

* **GET** `/livros`
* **POST** `/livros`
* **GET** `/livros/:id`
* **PUT** `/livros/:id`
* **PATCH** `/livros/:id`
* **DELETE** `/livros/:id`

---

### Exemplares

* **GET** `/exemplares`
* **POST** `/exemplares`
* **GET** `/exemplares/:id`
* **PATCH** `/exemplares/:id/status`
* **DELETE** `/exemplares/:id`

---

### Usuários

* **GET** `/usuarios`
* **POST** `/usuarios`
* **GET** `/usuarios/:id`
* **PUT** `/usuarios/:id`
* **PATCH** `/usuarios/:id`
* **DELETE** `/usuarios/:id`

---

### Empréstimos

* **GET** `/emprestimos`
* **POST** `/emprestimos`
* **GET** `/emprestimos/:id`
* **PUT** `/emprestimos/:id`
* **DELETE** `/emprestimos/:id`

---

### Itens de Empréstimo

* **GET** `/itensEmprestimo`
* **POST** `/itensEmprestimo`
* **GET** `/itensEmprestimo/:id`
* **PATCH** `/itensEmprestimo/:id`
* **DELETE** `/itensEmprestimo/:id`

---

### Reservas

* **GET** `/reservas`
* **POST** `/reservas`
* **GET** `/reservas/:id`
* **DELETE** `/reservas/:id`

---

### Multas

* **GET** `/multas`
* **POST** `/multas`
* **GET** `/multas/:id`
* **PUT** `/multas/:id`
* **DELETE** `/multas/:id`

---

### Autores

* **GET** `/autores`
* **POST** `/autores`
* **GET** `/autores/:id`
* **PUT** `/autores/:id`
* **DELETE** `/autores/:id`

---

### Editoras

* **GET** `/editoras`
* **POST** `/editoras`
* **GET** `/editoras/:id`
* **PUT** `/editoras/:id`
* **DELETE** `/editoras/:id`

---

### Funcionários

* **GET** `/funcionarios`
* **POST** `/funcionarios`
* **GET** `/funcionarios/:id`
* **PUT** `/funcionarios/:id`
* **DELETE** `/funcionarios/:id`

---

### Relacionamento Livro–Autor

* **GET** `/livrosAutores`
* **POST** `/livrosAutores`
* **DELETE** `/livrosAutores/:id`

---

### Auditoria

* **GET** `/auditoria/logs`
* **GET** `/auditoria/logs/:id`

---

## 🤝 Contribuição

1. Fork deste repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m "feat: nova funcionalidade"`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
