# 📚 API-Lumibook

Uma API RESTful robusta e escalável para **gestão completa de acervo e operações de uma livraria**, construída com Node.js, Express e MongoDB. Adota arquitetura limpa, separação de responsabilidades, testes automatizados e suporte a notificações por e-mail.

---

## 🔧 Funcionalidades

- **Livros**: Cadastro, edição, consulta e exclusão de obras
- **Exemplares**: Controle de cópias físicas (status, localização)
- **Usuários**: Gerenciamento completo de leitores
- **Empréstimos**: Registro, devolução e monitoramento de prazos
- **Itens de Empréstimo**: Vinculação de exemplares a empréstimos
- **Reservas**: Criação e cancelamento de reservas
- **Multas**: Geração automática e atualização de multas por atraso
- **Autores / Editoras**: Cadastro e manutenção
- **Funcionários**: Gerenciamento de colaboradores internos
- **Livro-Autor**: Relacionamento N\:N entre livros e autores
- **Auditoria**: Registro de ações críticas para rastreabilidade
- **Status**: Verificação de saúde da API
- **Notificações por e-mail**: Envio de lembretes e alertas

---

## 🚀 Tecnologias

### Core

- Node.js + Express
- MongoDB + Mongoose
- Clean Architecture + Separação de Camadas

### Suporte

- dotenv (configuração ambiente)
- cors (controle de origem)
- bcryptjs (hash de senha)

### Dev & Testes

- Jest + Supertest (testes automatizados)
- nodemon (hot reload)
- mongodb-memory-server (ambiente isolado para testes)

---

## ⚙️ Requisitos

- Node.js 14+
- MongoDB local ou Mongo Atlas

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/VictorVahid/API-Lumibook.git
cd API-Lumibook

# Instale dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite seu .env conforme necessário

# Execute a aplicação
dev: npm run dev
prod: npm start

# Execute os testes
npm test
```

---

## 📁 Estrutura

```
src/
├── controllers/         # Camada de entrada HTTP
├── domain/              # Entidades e interfaces de negócio
├── infrastructure/      # Banco de dados e serviços externos
│   └── services/        # Serviço de e-mail
├── routes/              # Endpoints REST
├── app.js               # Setup do Express
└── server.js            # Inicialização do servidor
```

---

## 🔐 .env Exemplo

```dotenv
PORT=3000
MONGO_URI=mongodb://<usuario>:<senha>@<host>:<porta>/<banco>
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=<email_user>
EMAIL_PASSWORD=<email_pass>
TEST_EMAIL=<email_teste>

```

---

## 📚 Documentação

- [→ Documentação de Endpoints (completa)](docs/endpoints.md)
- [→ Collection Postman](docs/lumibook-collection.json) _(pronta para importação)_

> A listagem completa de todos os endpoints foi movida para o arquivo `docs/endpoints.md` para manter o `README.md` limpo e objetivo. Consulte lá a referência completa por domínio.

---

## 🧪 Testes Automatizados

### Testes da API (Jest + Supertest)
1. Certifique-se de que o MongoDB está rodando e o .env tem a variável MONGO_URI correta.
2. Execute:
   ```bash
   npm test
   ```
   ou
   ```bash
   npx jest
   ```

---

## 🧪 Testando a API com o Postman

Uma Collection Postman completa está disponível no repositório para facilitar o teste e integração com a API.

### Como usar:
1. Baixe o arquivo `Lumibook_API.postman_collection.json` na raiz do projeto.
2. Abra o Postman e clique em **Import**.
3. Selecione o arquivo baixado.
4. Configure a variável `baseUrl` para o endereço da sua API (ex: `http://localhost:3001/api`).
5. Preencha as variáveis de ambiente (token, userId, etc) conforme for autenticando e criando entidades.
6. Execute as requisições desejadas!

## 🔒 Segurança

- Hash de senhas com bcrypt
- Nenhum dado sensível em commits
- Camada de domínio isolada

---

## 🤝 Contribuições

```bash
# Crie uma branch
 git checkout -b feature/minha-feature
# Envie Pull Request após commit e push
```

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para detalhes.
