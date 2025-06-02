const express = require("express");
const router = express.Router();

// Estatísticas de aluno
router.get("/alunos/:id/estatisticas", (req, res) => {
  res.json({
    livrosEmprestados: 1,
    limiteConcorrente: 3,
    devolucoesPendentes: 0,
    reservasAtivas: 0,
    historicoEmprestimos: 2,
    ultimaAtualizacao: new Date().toISOString(),
    tipoUsuario: "aluno"
  });
});

// Estatísticas de professor
router.get("/professores/:id/estatisticas", (req, res) => {
  res.json({
    livrosEmprestados: 2,
    limiteConcorrente: 10,
    devolucoesPendentes: 0,
    reservasAtivas: 1,
    historicoEmprestimos: 5,
    ultimaAtualizacao: new Date().toISOString(),
    tipoUsuario: "professor"
  });
});

// Estatísticas de admin
router.get("/admin/:id/estatisticas", (req, res) => {
  res.json({
    livrosEmprestados: 0,
    livrosDisponiveis: 0,
    limiteConcorrente: 0,
    devolucoesPendentes: 0,
    reservasAtivas: 0,
    historicoEmprestimos: 0,
    ultimaAtualizacao: new Date().toISOString(),
    tipoUsuario: "admin",
    multasPendentes: 0,
    pontosUsuario: 0,
    bibliografiasGerenciadas: 0,
    turmasAtivas: 0,
    livrosSolicitados: 0,
    fonte: "",
  });
});

// Atualizar estatística específica
router.put("/usuarios/:id/estatisticas/:statKey", (req, res) => {
  res.json({ success: true, statKey: req.params.statKey, newValue: req.body.value });
});

module.exports = router; 