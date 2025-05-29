# 📘 Documentação de Endpoints - API Lumibook

> Esta documentação lista todos os endpoints REST disponíveis na API Lumibook, organizados por domínio funcional.

---

## 🔎 Status

```
GET     /api/status              # Verifica se a API está online
```

## 📚 Livros

```
GET     /api/livros
POST    /api/livros
GET     /api/livros/:id
PUT     /api/livros/:id
PATCH   /api/livros/:id
DELETE  /api/livros/:id
```

## 📦 Exemplares

```
GET     /api/exemplares
POST    /api/exemplares
GET     /api/exemplares/:id
PATCH   /api/exemplares/:id/status
DELETE  /api/exemplares/:id
```

## 👤 Usuários

```
GET     /api/usuarios
POST    /api/usuarios
GET     /api/usuarios/:id
PUT     /api/usuarios/:id
PATCH   /api/usuarios/:id
DELETE  /api/usuarios/:id
```

## 📕 Empréstimos

```
GET     /api/emprestimos
POST    /api/emprestimos
GET     /api/emprestimos/:id
PUT     /api/emprestimos/:id
DELETE  /api/emprestimos/:id
```

## 🧾 Itens de Empréstimo

```
GET     /api/itensEmprestimo
POST    /api/itensEmprestimo
GET     /api/itensEmprestimo/:id
PATCH   /api/itensEmprestimo/:id
DELETE  /api/itensEmprestimo/:id
```

## 📌 Reservas

```
GET     /api/reservas
POST    /api/reservas
GET     /api/reservas/:id
DELETE  /api/reservas/:id
```

## 💸 Multas

```
GET     /api/multas
POST    /api/multas
GET     /api/multas/:id
PUT     /api/multas/:id
DELETE  /api/multas/:id
```

## ✍️ Autores

```
GET     /api/autores
POST    /api/autores
GET     /api/autores/:id
PUT     /api/autores/:id
DELETE  /api/autores/:id
```

## 🏢 Editoras

```
GET     /api/editoras
POST    /api/editoras
GET     /api/editoras/:id
PUT     /api/editoras/:id
DELETE  /api/editoras/:id
```

## 👨‍💼 Funcionários

```
GET     /api/funcionarios
POST    /api/funcionarios
GET     /api/funcionarios/:id
PUT     /api/funcionarios/:id
DELETE  /api/funcionarios/:id
```

## 🔗 Livro–Autor

```
GET     /api/livrosAutores
POST    /api/livrosAutores
DELETE  /api/livrosAutores/:id
```

## 📋 Auditoria

```
GET     /api/auditoria/logs
GET     /api/auditoria/logs/:id
```

## 📨 Notificações por E-mail

```
POST    /api/notificacoes/emprestimos/:loanId  # Envia lembrete de empréstimo por e-mail
```

---

> Para exemplos de payloads JSON, consulte a Collection Postman disponível no repositório.
