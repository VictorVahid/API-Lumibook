const express = require("express");
const router = express.Router();

// Criar novo empréstimo
router.post("/emprestimos", (req, res) => {
  res.json({ success: true, message: "Empréstimo criado!", data: req.body });
});

// Devolver empréstimo
router.put("/emprestimos/:id/devolucao", (req, res) => {
  res.json({ success: true, message: "Devolução registrada!", id: req.params.id });
});

module.exports = router; 