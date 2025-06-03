const express = require("express");
const bookCtrl = require("../controllers/BookController");
const requireAuth = require("../../middlewares/requireAuth");
const requireBibliotecarioOuAdmin = require("../../middlewares/requireBibliotecarioOuAdmin");
const bookRouter = express.Router();

// Listagem e busca de livros (acesso público)
bookRouter.get("/books", bookCtrl.listBooks);
bookRouter.get("/books/recentes", bookCtrl.getRecentBooks);
bookRouter.get("/books/relacionados/:bookId", bookCtrl.getRelatedBooks);
bookRouter.get("/books/isbn/:isbn", bookCtrl.getBookByISBN);
bookRouter.get("/books/search", bookCtrl.searchBooks);
bookRouter.get("/books/:id", bookCtrl.getBook);

// Rotas protegidas: apenas admin ou bibliotecário pode cadastrar, editar ou excluir livros
bookRouter.post("/books", requireAuth, requireBibliotecarioOuAdmin, bookCtrl.createBook);
bookRouter.put("/books/:id", requireAuth, requireBibliotecarioOuAdmin, bookCtrl.replaceBook);
bookRouter.patch("/books/:id", requireAuth, requireBibliotecarioOuAdmin, bookCtrl.patchBook);
bookRouter.delete("/books/:id", requireAuth, requireBibliotecarioOuAdmin, bookCtrl.deleteBook);

module.exports = bookRouter;
