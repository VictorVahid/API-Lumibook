## 📖 API Lumibook - Sistema de Gerenciamento de Livraria

Esta API RESTful abrangente foi desenvolvida para gerenciar todos os aspectos de uma livraria, desde o catálogo de livros até o controle de empréstimos e usuários. Ela permite operações completas de **C**riar, **R**ead (Ler), **U**pdate (Atualizar) e **D**elete (Deletar) em diversas entidades da livraria.

## ✨ Novidades e Funcionalidades Adicionais

Além das funcionalidades básicas de CRUD de livros, esta API agora oferece suporte para:

* **Gerenciamento de Exemplares:** Controle individual de cada cópia de um livro.
* **Gestão de Usuários:** Cadastro e gerenciamento de informações dos usuários da livraria.
* **Empréstimos:** Registro e controle de empréstimos de livros, incluindo datas de devolução.
* **Reservas:** Permite que usuários reservem livros indisponíveis.
* **Multas:** Cálculo e registro de multas por atraso na devolução.
* **Gerenciamento de Autores:** Cadastro e informações sobre os autores dos livros.
* **Gerenciamento de Editoras:** Registro das editoras dos livros.
* **Gestão de Funcionários:** Cadastro e informações dos funcionários da livraria.
* **Itens de Empréstimo:** Detalhes de cada item emprestado em um empréstimo.
* **Relacionamento Livro-Autor:** Permite vincular múltiplos autores a um livro.
* **Auditoria:** Registro de atividades importantes realizadas na API para rastreamento e segurança.
* **Endpoint de Status:** Verifica se a API está online e funcionando corretamente.

## 🚀 Tecnologias Utilizadas

* Node.js
* MongoDB
* Express.js
* Mongoose
* cors
* dotenv

## ⚙️ Pré-requisitos

* Node.js (>= 14.x recomendado)
* npm
* MongoDB rodando

## 🛠️ Instalação

1.  `git clone [https://github.com/VictorVahid/API-Lumibook.git](https://github.com/VictorVahid/API-Lumibook.git)`
2.  `cd API-Lumibook`
3.  `npm install`
4.  Crie um arquivo `.env` na raiz do projeto e adicione sua string de conexão MongoDB e a porta desejada (opcional):

    ```
    MONGO_URI = "mongodb+srv://{User}:{password}@{clusterName}.q2wsorl.mongodb.net/?retryWrites=true&w=majority&appName={clusterName}"
    PORT=3000
    ```

    ⚠️ **Importante:** Substitua os placeholders pelas suas informações de conexão. O arquivo `.env` é ignorado pelo Git.

## ▶️ Execução da API

`node --watch server.js`

Servidor rodando em `http://localhost:3000` (ou na porta definida no `.env`).

## 📚 Endpoints da API

### Livros (`/api/livros`)

* **Criar Livro:** `POST /api/livros`
    ```json
    {
        "titulo": "",
        "autor": "",
        "isbn": "",
        "assunto": ""
    }
    ```
    Exemplo: `curl -X POST -H "Content-Type: application/json" -d '{"titulo": "Dom Quixote", "autor": "Miguel de Cervantes", "isbn": "978-85-7232-817-4", "assunto": "Romance"}' http://localhost:3000/api/livros`
* **Ler Livros:** `GET /api/livros`
    Exemplo: `curl http://localhost:3000/api/livros`
* **Atualizar Livro:** `PUT /api/livros/{ID}`
    ```json
    {
        "titulo": "",
        "autor": "",
        "isbn": "",
        "assunto": ""
    }
    ```
    Exemplo: `curl -X PUT -H "Content-Type: application/json" -d '{"titulo": "Dom Quixote de la Mancha"}' http://localhost:3000/api/livros/64f9yyyyyyyyyyy`
* **Deletar Livro:** `DELETE /api/livros/{ID}`
    Exemplo: `curl -X DELETE http://localhost:3000/api/livros/64f9yyyyyyyyyyy`

### Exemplares (`/api/exemplares`)

* **Criar Exemplar:** `POST /api/exemplares`
    ```json
    {
        "livro_id": "", // ID do livro ao qual o exemplar pertence
        "localizacao": "",
        "status": "Disponível" // Ex: Disponível, Emprestado, Reservado, Perdido
    }
    ```
    Exemplo: `curl -X POST -H "Content-Type: application/json" -d '{"livro_id": "64f9yyyyyyyyyyy", "localizacao": "Estante A, Prateleira 3", "status": "Disponível"}' http://localhost:3000/api/exemplares`
* **Ler Exemplares:** `GET /api/exemplares`
    Exemplo: `curl http://localhost:3000/api/exemplares`
* **Atualizar Exemplar:** `PUT /api/exemplares/{ID}`
    ```json
    {
        "localizacao": "",
        "status": ""
    }
    ```
    Exemplo: `curl -X PUT -H "Content-Type: application/json" -d '{"status": "Emprestado"}' http://localhost:3000/api/exemplares/6500zzzzzzzzzzz`
* **Deletar Exemplar:** `DELETE /api/exemplares/{ID}`
    Exemplo: `curl -X DELETE http://localhost:3000/api/exemplares/6500zzzzzzzzzzz`

### Usuários (`/api/usuarios`)

* **Criar Usuário:** `POST /api/usuarios`
    ```json
    {
        "nome": "",
        "email": "",
        "telefone": ""
    }
    ```
    Exemplo: `curl -X POST -H "Content-Type: application/json" -d '{"nome": "Ana Silva", "email": "ana.silva@email.com", "telefone": "9299999999"}' http://localhost:3000/api/usuarios`
* **Ler Usuários:** `GET /api/usuarios`
    Exemplo: `curl http://localhost:3000/api/usuarios`
* **Atualizar Usuário:** `PUT /api/usuarios/{ID}`
    ```json
    {
        "telefone": ""
    }
    ```
    Exemplo: `curl -X PUT -H "Content-Type: application/json" -d '{"telefone": "9288888888"}' http://localhost:3000/api/usuarios/6500aaaaaaaaaaa`
* **Deletar Usuário:** `DELETE /api/usuarios/{ID}`
    Exemplo: `curl -X DELETE http://localhost:3000/api/usuarios/6500aaaaaaaaaaa`

### Empréstimos (`/api/emprestimos`)

* **Criar Empréstimo:** `POST /api/emprestimos`
    ```json
    {
        "usuario_id": "", // ID do usuário que realizou o empréstimo
        "data_emprestimo": "YYYY-MM-DD",
        "data_devolucao_prevista": "YYYY-MM-DD",
        "itens": [ // Array de IDs dos exemplares emprestados
            ""
        ]
    }
    ```
    Exemplo: `curl -X POST -H "Content-Type: application/json" -d '{"usuario_id": "6500aaaaaaaaaaa", "data_emprestimo": "2025-05-07", "data_devolucao_prevista": "2025-05-14", "itens": ["6500zzzzzzzzzzz"]}' http://localhost:3000/api/emprestimos`
* **Ler Empréstimos:** `GET /api/emprestimos`
    Exemplo: `curl http://localhost:3000/api/emprestimos`
* **Atualizar Empréstimo:** `PUT /api/emprestimos/{ID}`
    ```json
    {
        "data_devolucao": "YYYY-MM-DD" // Data real da devolução
    }
    ```
    Exemplo: `curl -X PUT -H "Content-Type: application/json" -d '{"data_devolucao": "2025-05-13"}' http://localhost:3000/api/emprestimos/6500bbbbbbbbbbb`
* **Deletar Empréstimo:** `DELETE /api/emprestimos/{ID}`
    Exemplo: `curl -X DELETE http://localhost:3000/api/emprestimos/6500bbbbbbbbbbb`

### Reservas (`/api/reservas`)

* **Criar Reserva:** `POST /api/reservas`
    ```json
    {
        "usuario_id": "", // ID do usuário que está reservando
        "livro_id": "", // ID do livro a ser reservado
        "data_reserva": "YYYY-MM-DD"
    }
    ```
    Exemplo: `curl -X POST -H "Content-Type: application/json" -d '{"usuario_id": "6500aaaaaaaaaaa", "livro_id": "64f9yyyyyyyyyyy", "data_reserva": "2025-05-07"}' http://localhost:3000/api/reservas`
* **Ler Reservas:** `GET /api/reservas`
    Exemplo: `curl http://localhost:3000/api/reservas`
* **Deletar Reserva:** `DELETE /api/reservas/{ID}`
    Exemplo: `curl -X DELETE http://localhost:3000/api/reservas/6500cccccccccc`

### Multas (`/api/multas`)

* **Criar Multa:** `POST /api/multas`
    ```json
    {
        "emprestimo_id": "", // ID do empréstimo associado à multa
        "usuario_id": "", // ID do usuário que recebeu a multa
        "valor": 0.0,
        "data_vencimento": "YYYY-MM-DD",
        "status": "Pendente" // Ex: Pendente, Paga
    }
    ```
    Exemplo: `curl -X POST -H "Content-Type: application/json" -d '{"emprestimo_id": "6500bbbbbbbbbbb", "usuario_id": "6500aaaaaaaaaaa", "valor": 1.50, "data_vencimento": "2025-05-21", "status": "Pendente"}' http://localhost:3000/api/multas`
* **Ler Multas:** `GET /api/multas`
    Exemplo: `curl http://localhost:3000/api/multas`
* **Atualizar Multa:** `PUT /api/multas/{ID}`
    ```json
    {
        "status": "Paga"
    }
    ```
    Exemplo: `curl -X PUT -H "Content-Type: application/json" -d '{"status": "Paga"}' http://localhost:3000/api/multas/6500ddddddddddd`
* **Deletar Multa:** `DELETE /api/multas/{ID}`
    Exemplo: `curl -X DELETE http://localhost:3000/api/multas/6500ddddddddddd`

### Autores (`/api/autores`)

* **Criar Autor:** `POST /api/autores`
    ```json
    {
        "nome": "",
        "nacionalidade": ""
    }
    ```
    Exemplo: `curl -X POST -H "Content-Type: application/json" -d '{"nome": "J.R.R. Tolkien", "nacionalidade": "Britânico"}' http://localhost:3000/api/autores`
* **Ler Autores:** `GET /api/autores`
    Exemplo: `curl http://localhost:3000/api/autores`
* **Atualizar Autor:** `PUT /api/autores/{ID}`
    ```json
    {
        "nacionalidade": ""
    }
    ```
    Exemplo: `curl -X PUT -H "Content-Type: application/json" -d '{"nacionalidade": "Inglês"}' http://localhost:3000/api/autores/6500eeeeeeeeeee`
* **Deletar Autor:** `DELETE /api/autores/{ID}`
    Exemplo: `curl -X DELETE http://localhost:3000/api/autores/6500eeeeeeeeeee`

### Editoras (`/api/editoras`)

* **Criar Editora:** `POST /api/editoras`
    ```json
    {
        "nome": "",
        "localizacao": ""
    }
    ```
    Exemplo: `curl -X POST -H "Content-Type: application/json" -d '{"nome": "Martins Fontes", "localizacao": "São Paulo, Brasil"}' http://localhost:3000/api/editoras`
* **Ler Editoras:** `GET /api/editoras`
    Exemplo: `curl http://localhost:3000/api/editoras`
* **Atualizar Editora:** `PUT /api/editoras/{ID}`
    ```json
    {
        "localizacao": ""
    }
    ```
    Exemplo: `curl -X PUT -H "Content-Type: application/json" -d '{"localizacao": "Rio de Janeiro, Brasil"}' http://localhost:3000/api/editoras/6500fffffffffff`
* **Deletar Editora:** `DELETE /api/editoras/{ID}`
    Exemplo: `curl -X DELETE http://localhost:3000/api/editoras/6500fffffffffff`

### Funcionários (`/api/funcionarios`)

* **Criar Funcionário:** `POST /api/funcionarios`
    ```json
    {
        "nome": "",
        "cargo": "",
        "email": ""
    }
    ```
    Exemplo: `curl -X POST -H "Content-Type: application/json" -d '{"nome": "Maria Souza", "cargo": "Bibliotecária", "email": "maria.souza@email.com"}' http://localhost:3000/api/funcionarios`
* **Ler Funcionários:** `GET /api/funcionarios`
    Exemplo: `curl http://localhost:3000/api/funcionarios`
* **Atualizar Funcionário:** `PUT /api/funcionarios/{ID}`
    ```json
    {
        "cargo": ""
    }
    ```
    Exemplo: `curl -X PUT -H "Content-Type: application/json" -d '{"cargo": "Bibliotecário Chefe"}' http://localhost:3000/api/funcionarios/6500ggggggggggg`
* **Deletar Funcionário:** `DELETE /api/funcionarios/{ID}`
    Exemplo: `curl -X DELETE http://localhost:3000/api/funcionarios/6500ggggggggggg`

### Itens de Empréstimo (`/api/itensEmprestimo`)

* **Criar Item de Empréstimo:** `POST /api/itensEmprestimo`
    ```json
    {
        "emprestimo_id": "", // ID do empréstimo ao qual o item pertence
        "exemplar_id": "", // ID do exemplar emprestado
        "data_devolucao": "YYYY-MM-DD" // Data de devolução específica do item (pode ser diferente da data geral do empréstimo)
    }
    ```
    Exemplo: `curl -X POST -H "Content-Type: application/json" -d '{"emprestimo_id": "6500bbbbbbbbbbb", "exemplar_id": "6500zzzzzzzzzzz", "data_devolucao": "2025-05-14"}' http://localhost:3000/api/itensEmprestimo`
* **Ler Itens de Empréstimo:** `GET /api/itensEmprestimo`
    Exemplo: `curl http://localhost:3000/api/itensEmprestimo`
* **Atualizar Item de Empréstimo:** `PUT /api/itensEmprestimo/{ID}`
    ```json
    {
        "data_devolucao": "YYYY-MM-DD"
    }
    ```
    Exemplo: `curl -X PUT -H "Content-Type: application/json" -d '{"data_devolucao": "2025-05-20"}' http://localhost:3000/api/itensEmprest
