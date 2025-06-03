# Lumibook API - Fluxos, Regras de Negócio e Rotas

## Sumário
- [Usuários](#usuários)
- [Livros](#livros)
- [Autores](#autores)
- [Editoras](#editoras)
- [Reservas](#reservas)
- [Empréstimos](#empréstimos)
- [Multas](#multas)
- [Estatísticas](#estatísticas)
- [Notificações](#notificações)
- [Auditoria](#auditoria)
- [Histórico](#histórico)
- [Obras](#obras)
- [Bibliotecário](#bibliotecário)
- [Admin](#admin)
- [Exemplares](#exemplares)

---

## Usuários
### Regras de Negócio
- Cadastro permitido apenas para alunos e professores via API pública.
- Aluno: matrícula obrigatória (mínimo 7 dígitos numéricos).
- Professor: e-mail institucional obrigatório (@universitas.edu.br), não pode ter matrícula.
- Admin/bibliotecário: cadastro apenas via endpoint restrito.
- Login pode ser por matrícula (aluno) ou e-mail institucional (professor/admin).
- Senha é validada via hash (bcrypt).
- JWT obrigatório para rotas protegidas (perfil, atualização, etc).

### Rotas
- `POST   /api/usuarios/login` - Login de usuário
- `POST   /api/usuarios/register` - Cadastro de usuário
- `POST   /api/usuarios` - Cadastro de usuário
- `GET    /api/usuarios` - Listar usuários
- `GET    /api/usuarios/:id` - Buscar usuário por ID
- `PATCH  /api/usuarios/:id` - Atualizar usuário
- `DELETE /api/usuarios/:id` - Remover usuário
- `GET    /api/usuarios/:id/avatar` - Avatar do usuário
- `GET    /api/usuarios/:id/stats` - Estatísticas do usuário
- `GET    /api/usuarios/perfil` - Perfil autenticado (JWT)
- `PATCH  /api/usuarios/perfil` - Atualizar perfil autenticado
- `GET    /api/usuarios/:id/atividades` - Atividades do usuário

---

## Livros
### Regras de Negócio
- Cadastro, edição e exclusão apenas para admin/bibliotecário (JWT + role).
- Filtros de busca: título, autor, ISBN, categoria, disponibilidade.
- Tradução automática de campos (title → titulo, author → autor, etc).

### Rotas
- `GET    /api/books` - Listar livros
- `GET    /api/books/recentes` - Livros mais recentes
- `GET    /api/books/relacionados/:bookId` - Livros relacionados
- `GET    /api/books/isbn/:isbn` - Buscar por ISBN
- `GET    /api/books/search` - Buscar livros
- `GET    /api/books/:id` - Buscar livro por ID
- `POST   /api/books` - Criar livro (protegido)
- `PUT    /api/books/:id` - Substituir livro (protegido)
- `PATCH  /api/books/:id` - Atualizar livro (protegido)
- `DELETE /api/books/:id` - Remover livro (protegido)

---

## Autores
### Regras de Negócio
- Cadastro, edição e exclusão de autores.
- Busca por nome.

### Rotas
- `GET    /api/autores` - Listar autores
- `POST   /api/autores` - Criar autor
- `GET    /api/autores/:id` - Buscar autor por ID
- `PUT    /api/autores/:id` - Substituir autor
- `PATCH  /api/autores/:id` - Atualizar autor
- `DELETE /api/autores/:id` - Remover autor
- `GET    /api/autores/buscar?q=nome` - Buscar autores por nome

---

## Editoras
### Regras de Negócio
- Cadastro, edição e exclusão de editoras.
- Busca por nome.

### Rotas
- `GET    /api/editoras` - Listar editoras
- `POST   /api/editoras` - Criar editora
- `GET    /api/editoras/:id` - Buscar editora por ID
- `PUT    /api/editoras/:id` - Substituir editora
- `PATCH  /api/editoras/:id` - Atualizar editora
- `DELETE /api/editoras/:id` - Remover editora
- `GET    /api/editoras/buscar?q=nome` - Buscar editoras por nome

---

## Reservas
### Regras de Negócio
- Usuário pode reservar exemplar disponível.
- Cancelamento e histórico de reservas.
- Filtros por usuário, livro e status.

### Rotas
- `GET    /api/reservations` - Listar reservas
- `POST   /api/reservations` - Criar reserva
- `GET    /api/reservations/:id` - Buscar reserva por ID
- `PATCH  /api/reservations/:id` - Atualizar status da reserva
- `DELETE /api/reservations/:id` - Cancelar reserva
- `GET    /api/reservations/user/:userId` - Reservas por usuário
- `GET    /api/reservations/book/:bookId` - Reservas por livro
- `GET    /api/reservations/historico` - Histórico de reservas (mock)

---

## Empréstimos
### Regras de Negócio
- Usuário pode realizar empréstimo se não exceder limite e não possuir multas pendentes.
- Devolução de empréstimo altera status.
- Mock para integração inicial.

### Rotas
- `POST   /api/emprestimos` - Criar empréstimo
- `GET    /api/emprestimos` - Listar empréstimos
- `PUT    /api/emprestimos/:id/devolucao` - Devolver empréstimo

---

## Multas
### Regras de Negócio
- Multa gerada por atraso ou dano.
- Pagamento de multa altera status para "paga".
- Filtros por usuário e status.

### Rotas
- `GET    /api/fines` - Listar multas
- `POST   /api/fines` - Criar multa
- `GET    /api/fines/:id` - Buscar multa por ID
- `PATCH  /api/fines/:id/status` - Atualizar status da multa
- `POST   /api/fines/:fineId/pay` - Pagar multa
- `GET    /api/fines/user/:userId` - Multas por usuário
- `GET    /api/fines/history/:userId` - Histórico de multas (mock)

---

## Estatísticas
### Regras de Negócio
- Estatísticas por tipo de usuário (aluno, professor, admin).
- Atualização de estatísticas específicas.

### Rotas
- `GET    /api/alunos/:id/estatisticas` - Estatísticas de aluno
- `GET    /api/professores/:id/estatisticas` - Estatísticas de professor
- `GET    /api/admin/:id/estatisticas` - Estatísticas de admin
- `PUT    /api/usuarios/:id/estatisticas/:statKey` - Atualizar estatística
- `GET    /api/stats/system` - Estatísticas do sistema
- `GET    /api/stats/user/:userId` - Estatísticas do usuário
- `GET    /api/stats/book/:bookId` - Estatísticas do livro

---

## Notificações
### Regras de Negócio
- Envio de lembrete de devolução de empréstimo por e-mail.

### Rotas
- `POST   /api/loans/:loanId/reminder` - Enviar lembrete de devolução

---

## Auditoria
### Regras de Negócio
- Registro e consulta de logs de ações administrativas.

### Rotas
- `GET    /api/auditoria/logs` - Listar logs
- `GET    /api/auditoria/logs/:id` - Buscar log por ID

---

## Histórico
### Regras de Negócio
- Histórico de empréstimos por usuário (mock).

### Rotas
- `GET    /api/alunos/:id/historico-emprestimos` - Histórico de aluno
- `GET    /api/professores/:id/historico-emprestimos` - Histórico de professor

---

## Obras
### Regras de Negócio
- Consulta de tipos, categorias e verificação de duplicidade.

### Rotas
- `GET    /api/obras/tipos` - Tipos de obra
- `GET    /api/obras/categorias` - Categorias de obra
- `GET    /api/obras/verificar-duplicata` - Verificar duplicidade

---

## Bibliotecário
### Regras de Negócio
- Cadastro de bibliotecário apenas por admin (JWT + role).

### Rotas
- `POST   /api/bibliotecarios` - Cadastrar bibliotecário (protegido)

---

## Admin
### Regras de Negócio
- Catalogação de obras e estatísticas administrativas.

### Rotas
- `POST   /api/admin/obras/catalogar` - Catalogar obra
- `GET    /api/admin/stats` - Estatísticas administrativas
- `GET    /api/admin/activities` - Atividades administrativas

---

## Exemplares
### Regras de Negócio
- Cadastro, edição, exclusão e alteração de status de exemplares.

### Rotas
- `GET    /api/exemplares` - Listar exemplares
- `POST   /api/exemplares` - Criar exemplar
- `GET    /api/exemplares/:id` - Buscar exemplar por ID
- `PATCH  /api/exemplares/:id/status` - Atualizar status do exemplar
- `DELETE /api/exemplares/:id` - Remover exemplar

---

## Observações Gerais
- Todas as rotas principais estão sob o prefixo `/api`.
- JWT obrigatório para rotas protegidas.
- Respostas seguem o padrão JSON esperado pelo front, sem wrappers desnecessários.
- Campos e nomes de rotas padronizados conforme especificação do front. 