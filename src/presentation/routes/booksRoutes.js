const express = require("express");
const BookController = require("../controllers/BookController");
const router = express.Router();

// List all books
router.get("/books", BookController.listBooks);
// Create book
router.post("/books", BookController.createBook);
// Get book by ID
router.get("/books/:id", BookController.getBook);
// Get book by ISBN
router.get("/books/isbn/:isbn", BookController.getBookByISBN);
// Get related books
router.get("/books/related/:bookId", BookController.getRelatedBooks);
// Get recent books
router.get("/books/recent", BookController.getRecentBooks);
// Search books
router.get("/books/search", BookController.searchBooks);
// Atualizar livro
router.put("/books/:id", BookController.updateBook);
// Deletar livro
router.delete("/books/:id", BookController.deleteBook);

// Livros relacionados (realista)
router.get("/books/relacionados/:id", async (req, res) => {
  // Reutiliza a lógica do controller para livros relacionados
  req.params.bookId = req.params.id;
  req.query.limit = req.query.limit || 3;
  await BookController.getRelatedBooks(req, res);
});

// Livros relacionados (inteligente)
router.get("/books/relacionados/:id", BookController.getRelatedBooksInteligente);

module.exports = router; 