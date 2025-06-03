const express = require("express");
const authorCtrl = require("../controllers/AuthorController");
const authorRouter = express.Router();

authorRouter.get("/autores", authorCtrl.listAuthors);
authorRouter.post("/autores", authorCtrl.createAuthor);
authorRouter.get("/autores/:id", authorCtrl.getAuthor);
authorRouter.put("/autores/:id", authorCtrl.replaceAuthor);
authorRouter.patch("/autores/:id", authorCtrl.patchAuthor);
authorRouter.delete("/autores/:id", authorCtrl.deleteAuthor);

// Buscar autores por nome
authorRouter.get("/autores/buscar", authorCtrl.searchAuthors);

module.exports = authorRouter;
