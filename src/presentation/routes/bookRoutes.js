const express = require("express");
const router = express.Router();
const BookController = require("../controllers/BookController");
const requireAuth = require("../../middlewares/requireAuth");

// Listar todos os livros
router.get("/livros", BookController.listBooks);

// Criar um novo livro
router.post("/livros", requireAuth, BookController.createBook);

// Buscar livro por ID
router.get("/livros/:id", BookController.getBook);

// Atualizar livro (PATCH parcial)
router.patch("/livros/:id", requireAuth, BookController.updateBook);

// Atualizar livro (PUT completo)
router.put("/livros/:id", requireAuth, BookController.updateBook);

// Deletar livro
router.delete("/livros/:id", requireAuth, BookController.deleteBook);

// Buscar livro por ISBN
router.get("/livros/isbn/:isbn", BookController.getBookByISBN);

// Buscar livros relacionados
router.get("/livros/relacionados/:bookId", BookController.getRelatedBooks);

// Buscar livros mais recentes
router.get("/livros/recentes", BookController.getRecentBooks);

// Busca por termo
router.get("/livros/buscar", BookController.searchBooks);

module.exports = router;
