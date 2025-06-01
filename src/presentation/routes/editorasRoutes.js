const express = require("express");
const router = express.Router();

// Buscar editoras por nome
router.get("/editoras/buscar", (req, res) => {
  const termo = req.query.q || "";
  // Retorno mockado
  res.json([
    { id: 1, nome: "Editora Exemplo" },
    { id: 2, nome: "Editora Teste" }
  ]);
});

module.exports = router; 