# 📘 Documentação de Endpoints - API Lumibook

> Esta documentação lista todos os endpoints REST disponíveis na API Lumibook, organizados por domínio funcional, com exemplos de payloads.

---

## 🔎 Health Check

```
GET     /api/           # Verifica se a API está online
```

## 👤 Usuários

```
POST    /api/users/register         # Cadastro de usuário (aluno/professor)
POST    /api/users/login            # Login
GET     /api/users/profile          # Perfil autenticado (token)
GET     /api/users                  # Listar todos os usuários
GET     /api/users/:id              # Buscar usuário por ID
```

**Exemplo de cadastro (aluno):**
```json
{
  "nome": "João Aluno",
  "email": "joao@instituicao.edu",
  "senha": "Senha@123",
  "papel": "aluno",
  "matricula": "1234567"
}
```

**Exemplo de login:**
```json
{
  "email": "joao@instituicao.edu",
  "senha": "Senha@123"
}
```

---

## 👨‍💼 Admins

```
POST    /api/admin                  # Cadastro de admin
GET     /api/admin                  # Listar admins
```

---

## 👩‍💼 Bibliotecários

```
POST    /api/librarians             # Cadastro de bibliotecário
GET     /api/librarians             # Listar bibliotecários
```

---

## 📚 Livros

```
POST    /api/books                  # Cadastro de livro
GET     /api/books                  # Listar livros
GET     /api/books/:id              # Buscar livro por ID
PATCH   /api/books/:id              # Atualizar livro
DELETE  /api/books/:id              # Deletar livro
```

**Exemplo de cadastro:**
```json
{
  "title": "Dom Casmurro",
  "authors": ["<authorId>"],
  "isbn": "9788533615540",
  "ano": 1899,
  "categoria": "Romance",
  "editora": "<publisherId>",
  "stock": 5
}
```

---

## 📦 Exemplares

```
POST    /api/copies                 # Cadastro de exemplar
GET     /api/copies                 # Listar exemplares
```

---

## ✍️ Autores

```
POST    /api/authors                # Cadastro de autor
GET     /api/authors                # Listar autores
```

---

## 🏢 Editoras

```
POST    /api/publishers             # Cadastro de editora
GET     /api/publishers             # Listar editoras
```

---

## 📋 Reservas

```
POST    /api/reservations           # Criar reserva
GET     /api/reservations           # Listar reservas (filtros: userId, bookId)
GET     /api/reservations/:id       # Buscar reserva por ID
DELETE  /api/reservations/:id       # Cancelar reserva
```

**Exemplo de criação:**
```json
{
  "userId": "<userId>",
  "bookId": "<bookId>",
  "copyId": "<copyId>"
}
```

---

## 💸 Multas

```
POST    /api/fines                  # Criar multa
GET     /api/fines                  # Listar multas
POST    /api/fines/:id/pay          # Pagar multa
```

**Exemplo de criação:**
```json
{
  "userId": "<userId>",
  "value": 10.0,
  "reason": "Atraso na devolução"
}
```

---

## 📊 Estatísticas

```
GET     /api/stats/user/:userId     # Buscar estatísticas do usuário (token)
PUT     /api/stats/user/:userId/:statKey   # Atualizar estatística do usuário
```

**Exemplo de atualização:**
```json
{
  "valor": 5
}
```

---

## 📝 Auditoria

```
GET     /api/audit                  # Listar logs de auditoria
```

---

> Para exemplos completos de payloads e testes, consulte a Collection Postman no repositório.
