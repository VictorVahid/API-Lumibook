const express = require("express");
const router = express.Router();
const LoanModel = require("../../infrastructure/mongoose/models/Loan.js");
const ReservationModel = require("../../infrastructure/mongoose/models/ReservationSchema.js");

// Estatísticas de aluno
router.get("/alunos/:id/estatisticas", async (req, res) => {
  const usuarioId = req.params.id;
  // Limite fixo para aluno (ajuste se necessário)
  const limiteConcorrente = 3;

  // Buscar empréstimos ativos (status: 'ativo' ou 'atrasado')
  const livrosEmprestados = await LoanModel.countDocuments({ usuario: usuarioId, status: { $in: ["ativo", "atrasado"] } });

  // Buscar reservas ativas (status: 'pendente', 'ativa', 'atendida')
  const reservasAtivas = await ReservationModel.countDocuments({ usuarioId, status: { $in: ["pendente", "ativa", "atendida"] } });

  // Calcular livrosDisponiveis
  const livrosDisponiveis = Math.max(0, limiteConcorrente - (livrosEmprestados + reservasAtivas));

  res.json({
    livrosEmprestados,
    livrosDisponiveis,
    limiteConcorrente,
    devolucoesPendentes: 0, // ajuste se necessário
    reservasAtivas,
    historicoEmprestimos: 0, // ajuste se necessário
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