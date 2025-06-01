const express = require("express");
const router = express.Router();

// Tipos de obra
router.get("/obras/tipos", (req, res) => {
  res.json(["Livro", "Revista", "Tese", "Periódico"]);
});

// Categorias de obra
router.get("/obras/categorias", (req, res) => {
  res.json(["Ficção", "Não-ficção", "Ciência", "Tecnologia"]);
});

module.exports = router; 