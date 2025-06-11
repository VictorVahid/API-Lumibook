const express = require("express");
const BookController = require("../controllers/BookController");
const router = express.Router();

// List all books
router.get("/", BookController.listBooks);
// Create book
router.post("/", BookController.createBook);
// Get recent books
router.get("/recentes", BookController.listRecentBooks);
// Search books
router.get("/search", BookController.searchBooks);
// Get book by ISBN
router.get("/isbn/:isbn", BookController.getBookByISBN);
// Get related books
router.get("/related/:bookId", BookController.getRelatedBooks);
// Livros relacionados (realista)
router.get("/relacionados/:id", async (req, res) => {
  // Reutiliza a lógica do controller para livros relacionados
  req.params.bookId = req.params.id;
  req.query.limit = req.query.limit || 3;
  await BookController.getRelatedBooks(req, res);
});
// Livros relacionados (inteligente)
router.get("/relacionados/:id", BookController.getRelatedBooksInteligente);
// Atualizar livro
router.put("/:id", BookController.updateBook);
// Deletar livro
router.delete("/:id", BookController.deleteBook);
// Get book by ID (sempre por último)
router.get("/:id", BookController.getBook);

module.exports = router; 