# API Lumibook - CRUD de Livraria

Esta é uma API RESTful simples para gerenciar informações de uma livraria, permitindo operações de **C**riar, **R**ead (Ler), **U**pdate (Atualizar) e **D**elete (Deletar) em livros.

## 🚀 Tecnologias Utilizadas

* Node.js
* MongoDB
* Express.js
* Mongoose
* dotenv

## ⚙️ Pré-requisitos

* Node.js (>= 14.x recomendado)
* npm
* MongoDB rodando

## 🛠️ Instalação

1.  `git clone [https://github.com/VictorVahid/API-Lumibook.git](https://github.com/VictorVahid/API-Lumibook.git)`
2.  `cd API-Lumibook`
3.  `npm install`
4.  Crie um arquivo `.env` na raiz do projeto e adicione sua string de conexão MongoDB:
    ```
    MONGO_URI = "mongodb+srv://{User}:{password}@{clusterName}.q2wsorl.mongodb.net/?retryWrites=true&w=majority&appName={clusterName}"
    ```
    ⚠️ **Importante:** Substitua os placeholders pelas suas informações de conexão. O arquivo `.env` é ignorado pelo Git.

## ▶️ Execução da API

`node --watch server.js`

Servidor rodando em `http://localhost:3000`.

## 📚 Endpoints da API

* **Criar:** `POST /livros`
    ```json
    {
        "titulo": "",
        "autor": "",
        "isbn": "",
        "assunto": ""
    }
    ```
    Exemplo: `curl -X POST -H "Content-Type: application/json" -d '{"titulo": "O Pequeno Príncipe", "autor": "Antoine de Saint-Exupéry", "isbn": "978-85-9508-155-6", "assunto": "Literatura Infantil"}' http://localhost:3000/livros`

* **Ler:** `GET /livros`
    Exemplo: `curl http://localhost:3000/livros`

* **Atualizar:** `PUT /livros/{ID}`
    ```json
    {
        "titulo": "",
        "autor": "",
        "isbn": "",
        "assunto": ""
    }
    ```
    Exemplo: `curl -X PUT -H "Content-Type: application/json" -d '{"titulo": "O Pequeno Príncipe - Edição Especial"}' http://localhost:3000/livros/64f9xxxxxxxxx`

* **Deletar:** `DELETE /livros/{ID}`
    Exemplo: `curl -X DELETE http://localhost:3000/livros/64f9xxxxxxxxx`

## 🤝 Contribuição

Sinta-se à vontade para contribuir.
