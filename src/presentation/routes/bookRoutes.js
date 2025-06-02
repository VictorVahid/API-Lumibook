const express = require("express");
const bookCtrl = require("../controllers/BookController");
const bookRouter = express.Router();

bookRouter.get("/books", bookCtrl.listBooks);
bookRouter.post("/books", bookCtrl.createBook);
bookRouter.get("/books/:id", bookCtrl.getBook);
bookRouter.put("/books/:id", bookCtrl.replaceBook);
bookRouter.patch("/books/:id", bookCtrl.patchBook);
bookRouter.delete("/books/:id", bookCtrl.deleteBook);
bookRouter.get("/livros/recentes", bookCtrl.getRecentBooks);
bookRouter.get("/livros/relacionados/:bookId", bookCtrl.getRelatedBooks);
bookRouter.get("/livros/isbn/:isbn", bookCtrl.getBookByISBN);
bookRouter.get("/livros/buscar", bookCtrl.searchBooks);
bookRouter.get("/livros/:id", bookCtrl.getBook);

// Buscar livros
// bookRouter.get("/livros/buscar", bookCtrl.searchBooks); // Adicionar se necessário

module.exports = bookRouter;
