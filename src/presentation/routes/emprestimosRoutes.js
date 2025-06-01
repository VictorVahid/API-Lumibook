const express = require("express");
const router = express.Router();

// Criar novo empréstimo
router.post("/emprestimos", async (req, res) => {
  let { usuarioId, livroId, itens, dataEmprestimo, dataPrevistaDevolucao } = req.body;
  if (!usuarioId) return res.status(400).json({ error: "usuarioId é obrigatório" });
  if (!dataPrevistaDevolucao) return res.status(400).json({ error: "dataPrevistaDevolucao é obrigatória" });
  if (!itens && livroId) {
    // Buscar exemplares disponíveis para o livroId (mock: array com 1 exemplar)
    itens = [ { exemplarId: "mockExemplarIdParaLivro_" + livroId } ];
  }
  if (!itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ error: "É necessário informar ao menos um exemplar (itens) ou livroId válido" });
  }
  if (!dataEmprestimo) dataEmprestimo = new Date().toISOString();
  // Aqui você salvaria no banco, por enquanto só retorna sucesso
  res.json({ success: true, data: { usuarioId, itens, dataEmprestimo, dataPrevistaDevolucao }, message: "Empréstimo criado!" });
});

// Devolver empréstimo
router.put("/emprestimos/:id/devolucao", (req, res) => {
  res.json({ success: true, message: "Devolução registrada!", id: req.params.id });
});

module.exports = router; 