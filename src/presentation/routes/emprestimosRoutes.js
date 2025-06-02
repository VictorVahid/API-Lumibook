const express = require("express");
const router = express.Router();

// Criar novo empréstimo
router.post("/emprestimos", async (req, res) => {
  let { usuarioId, livroId, itens, dataEmprestimo, dataPrevistaDevolucao, status } = req.body;
  if (!usuarioId) return res.status(400).json({ success: false, error: "usuarioId é obrigatório" });
  if (!livroId) return res.status(400).json({ success: false, error: "livroId é obrigatório" });
  if (!dataPrevistaDevolucao) return res.status(400).json({ success: false, error: "dataPrevistaDevolucao é obrigatória" });
  if (!itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ success: false, error: "É necessário informar ao menos um exemplar (itens)" });
  }
  if (!dataEmprestimo) dataEmprestimo = new Date().toISOString();
  if (!status) status = "ativo";
  const id = `mockEmprestimo_${Math.random().toString(36).substring(2, 10)}`;
  res.json({ success: true, data: { id, usuarioId, livroId, itens, dataEmprestimo, dataPrevistaDevolucao, status }, message: "Empréstimo criado!" });
});

// Devolver empréstimo
router.put("/emprestimos/:id/devolucao", (req, res) => {
  res.json({ success: true, message: "Devolução registrada!", id: req.params.id });
});

module.exports = router; 