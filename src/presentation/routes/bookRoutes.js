const express = require("express");
const bookCtrl = require("../controllers/BookController");
const bookRouter = express.Router();

bookRouter.get("/books", bookCtrl.listBooks);
bookRouter.post("/books", bookCtrl.createBook);
bookRouter.get("/books/:id", bookCtrl.getBook);
bookRouter.put("/books/:id", bookCtrl.replaceBook);
bookRouter.patch("/books/:id", bookCtrl.patchBook);
bookRouter.delete("/books/:id", bookCtrl.deleteBook);

module.exports = bookRouter;
