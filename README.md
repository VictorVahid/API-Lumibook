# API Lumibook - CRUD de Livraria

Esta é uma API RESTful simples para gerenciar informações de uma livraria, permitindo operações de Criar, Ler, Atualizar e Deletar (CRUD) em livros.

## Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript para o backend.
* **MongoDB:** Banco de dados NoSQL para armazenar os dados dos livros.
* **Express.js:** Framework web minimalista e flexível para Node.js.
* **Mongoose:** Biblioteca para modelagem de objetos MongoDB e interação com o banco de dados no Node.js.
* **dotenv:** Módulo para carregar variáveis de ambiente de um arquivo `.env`.

## Pré-requisitos

* **Node.js** (versão >= 14.x recomendada) instalado em sua máquina.
* **npm** (geralmente instalado com Node.js).
* Uma instância do **MongoDB** rodando (localmente ou em um serviço como MongoDB Atlas).

## Instalação

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/VictorVahid/API-Lumibook.git](https://github.com/VictorVahid/API-Lumibook.git)
    cd API-Lumibook
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configuração das Variáveis de Ambiente:**

    * Crie um arquivo `.env` na raiz do projeto.
    * Adicione a sua string de conexão com o MongoDB neste arquivo, seguindo o exemplo:

        ```
        MONGODB_URI=mongodb+srv://<seu_usuario>:<sua_senha>@<seu_cluster>.mongodb.net/<seu_banco_de_dados>?retryWrites=true&w=majority
        ```

        **Importante:** Substitua `<seu_usuario>`, `<sua_senha>`, `<seu_cluster>` e `<seu_banco_de_dados>` pelas suas credenciais e informações de conexão do MongoDB. **Este arquivo `.env` não deve ser compartilhado publicamente e é ignorado pelo Git para segurança.**

## Execução da API

Para iniciar o servidor da API em modo de observação (para que as alterações no código reiniciem o servidor automaticamente), execute o seguinte comando:

```bash
node --watch server.js
