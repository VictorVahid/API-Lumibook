# Documentação de JSONs e Regras de Negócio da API Lumibook

## Usuários

### POST /api/usuarios
**Request JSON:**
```json
{
  "nome": "João Silva",
  "email": "joao@instituicao.edu",
  "senha": "Senha@123",
  "role": "aluno", // ou papel: "aluno"
  "matricula": "20231234"
}
```
**Response JSON:**
```json
{
  "id": "...",
  "nome": "João Silva",
  "email": "joao@instituicao.edu",
  "role": "leitor",
  "matricula": "20231234"
}
```
**Regras de Negócio:**
- Email deve ser institucional.
- Senha forte obrigatória (mín. 8 caracteres, maiúscula, minúscula, número, especial).
- Alunos precisam de matrícula.
- Papel pode ser enviado como `role` ou `papel`.

### POST /api/usuarios/login
**Request JSON:**
```json
{
  "identificador": "joao@instituicao.edu", // ou matrícula
  "senha": "Senha@123"
}
```
**Response JSON:**
```json
{
  "id": "...",
  "nome": "João Silva",
  "email": "joao@instituicao.edu",
  "papel": "leitor",
  "matricula": "20231234",
  "token": "<jwt>"
}
```
**Regras de Negócio:**
- Retorna JWT válido por 7 dias.
- Login por email ou matrícula.

### GET /api/usuarios/:id
**Response JSON:**
```json
{
  "id": "...",
  "nome": "João Silva",
  "email": "joao@instituicao.edu",
  "role": "leitor",
  "matricula": "20231234"
}
```

---

## Livros

### POST /api/books
**Request JSON:**
```json
{
  "title": "Node.js Essencial",
  "author": "Fulano",
  "price": 50,
  "stock": 5
}
```
**Response JSON:**
```json
{
  "id": "...",
  "titulo": "Node.js Essencial",
  "autor": "Fulano",
  "price": 50,
  "stock": 5
}
```
**Regras de Negócio:**
- Título e autor obrigatórios.
- Campos opcionais: price, stock.

### GET /api/books
**Response JSON:**
```json
[
  {
    "id": "...",
    "titulo": "Node.js Essencial",
    "autor": "Fulano",
    "price": 50,
    "stock": 5
  }
]
```

---

## Autores

### POST /api/autores
**Request JSON:**
```json
{
  "nome": "José de Alencar",
  "bio": "Escritor brasileiro"
}
```
**Response JSON:**
```json
{
  "id": "...",
  "nome": "José de Alencar",
  "bio": "Escritor brasileiro"
}
```
**Regras de Negócio:**
- Nome obrigatório.
- Aceita campos antigos: biografia (vira bio), nacionalidade (vira nascimento).

### GET /api/autores
**Response JSON:**
```json
[
  {
    "id": "...",
    "nome": "José de Alencar",
    "bio": "Escritor brasileiro"
  }
]
```

---

## Editoras

### POST /api/editoras
**Request JSON:**
```json
{
  "nome": "Editora XPTO",
  "endereco": "Rua das Letras, 123",
  "contato": "contato@editora.com"
}
```
**Response JSON:**
```json
{
  "id": "...",
  "nome": "Editora XPTO",
  "endereco": "Rua das Letras, 123",
  "contato": "contato@editora.com"
}
```
**Regras de Negócio:**
- Nome obrigatório.
- Aceita campos antigos: cidade (vira endereco), pais (vira contato).

### GET /api/editoras
**Response JSON:**
```json
[
  {
    "id": "...",
    "nome": "Editora XPTO",
    "endereco": "Rua das Letras, 123",
    "contato": "contato@editora.com"
  }
]
```

---

## Exemplares

### POST /api/exemplares
**Request JSON:**
```json
{
  "livroId": "...",
  "status": "disponível",
  "localizacao": "Estante A"
}
```
**Response JSON:**
```json
{
  "id": "...",
  "livroId": "...",
  "status": "disponível",
  "localizacao": "Estante A"
}
```
**Regras de Negócio:**
- livroId e status obrigatórios.

### GET /api/exemplares
**Response JSON:**
```json
[
  {
    "id": "...",
    "livroId": "...",
    "status": "disponível",
    "localizacao": "Estante A"
  }
]
```

---

## Reservas

### POST /api/reservas
**Request JSON:**
```json
{
  "usuarioId": "...",
  "livroId": "...",
  "exemplarId": "...",
  "dataReserva": "2024-06-01T12:00:00.000Z"
}
```
**Response JSON:**
```json
{
  "id": "...",
  "usuarioId": "...",
  "livroId": "...",
  "exemplarId": "...",
  "dataReserva": "2024-06-01T12:00:00.000Z",
  "status": "ativa"
}
```
**Regras de Negócio:**
- Só permite reserva se exemplar estiver disponível.
- Um usuário não pode reservar o mesmo livro duas vezes sem devolver.

### GET /api/reservas
**Response JSON:**
```json
[
  {
    "id": "...",
    "usuarioId": "...",
    "livroId": "...",
    "exemplarId": "...",
    "dataReserva": "2024-06-01T12:00:00.000Z",
    "status": "ativa"
  }
]
```

---

## Multas

### POST /api/multas
**Request JSON:**
```json
{
  "usuarioId": "...",
  "reservaId": "...",
  "valor": 20,
  "status": "pendente"
}
```
**Response JSON:**
```json
{
  "id": "...",
  "usuarioId": "...",
  "reservaId": "...",
  "valor": 20,
  "status": "pendente"
}
```
**Regras de Negócio:**
- Só pode ser emitida para reservas atrasadas ou não devolvidas.
- Valor obrigatório.

### GET /api/multas
**Response JSON:**
```json
[
  {
    "id": "...",
    "usuarioId": "...",
    "reservaId": "...",
    "valor": 20,
    "status": "pendente"
  }
]
```

---

## Observações Gerais
- Todos os endpoints de listagem retornam arrays.
- Todos os endpoints de criação retornam o objeto criado.
- Erros retornam `{ "message": "..." }` e status HTTP adequado.
- JWT obrigatório para rotas protegidas. 