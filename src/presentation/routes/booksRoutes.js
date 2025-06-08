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

module.exports = router; 