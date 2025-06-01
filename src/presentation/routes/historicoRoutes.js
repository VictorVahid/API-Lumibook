const express = require("express");
const router = express.Router();

// Histórico de empréstimos de aluno
router.get("/alunos/:id/historico-emprestimos", (req, res) => {
  res.json([
    { livro: "Livro A", dataEmprestimo: "2024-01-01", devolvido: true },
    { livro: "Livro B", dataEmprestimo: "2024-02-01", devolvido: false }
  ]);
});

// Histórico de empréstimos de professor
router.get("/professores/:id/historico-emprestimos", (req, res) => {
  res.json([
    { livro: "Livro X", dataEmprestimo: "2024-01-10", devolvido: true },
    { livro: "Livro Y", dataEmprestimo: "2024-03-01", devolvido: false }
  ]);
});

module.exports = router; 