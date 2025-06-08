// src/presentation/routes/estatisticasRoutes.js
const express = require("express");
const router = express.Router();
const LoanModel = require("../../infrastructure/mongoose/models/Loan");
const ReservationModel = require("../../infrastructure/mongoose/models/Reservation");

// Estatísticas de aluno
router.get("/alunos/:id/estatisticas", async (req, res) => {
	const usuarioId = req.params.id;
	const limiteConcorrente = 3;

	const livrosEmprestados = await LoanModel.countDocuments({
		usuario: usuarioId,
		status: { $in: ["ativo", "atrasado"] },
	});
	const reservasAtivas = await ReservationModel.countDocuments({
		usuarioId,
		status: { $in: ["pendente", "ativa", "atendida"] },
	});
	const livrosDisponiveis = Math.max(
		0,
		limiteConcorrente - (livrosEmprestados + reservasAtivas)
	);

	res.json({
		success: true,
		data: {
			livrosEmprestados,
			livrosDisponiveis,
			limiteConcorrente,
			devolucoesPendentes: 0,
			reservasAtivas,
			historicoEmprestimos: 0,
			ultimaAtualizacao: new Date().toISOString(),
			tipoUsuario: "aluno",
		},
		error: null,
	});
});

// Estatísticas de professor
router.get("/professores/:id/estatisticas", (req, res) => {
	res.json({
		success: true,
		data: {
			livrosEmprestados: 2,
			limiteConcorrente: 10,
			devolucoesPendentes: 0,
			reservasAtivas: 1,
			historicoEmprestimos: 5,
			ultimaAtualizacao: new Date().toISOString(),
			tipoUsuario: "professor",
		},
		error: null,
	});
});

// Estatísticas de admin
router.get("/admin/:id/estatisticas", (req, res) => {
	res.json({
		success: true,
		data: {
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
		},
		error: null,
	});
});

// Atualizar estatística específica
router.put("/usuarios/:id/estatisticas/:statKey", (req, res) => {
	res.json({
		success: true,
		data: { statKey: req.params.statKey, newValue: req.body.value },
		error: null,
	});
});

// Estatísticas do sistema
router.get("/stats/system", (req, res) => {
	res.json({
		success: true,
		data: { totalObras: 1000, usuariosAtivos: 200, emprestimosHoje: 10 },
		error: null,
	});
});

// Estatísticas por usuário
router.get("/stats/user/:userId", (req, res) => {
	res.json({
		success: true,
		data: { emprestimos: 5, reservas: 2, multas: 0 },
		error: null,
	});
});

// Estatísticas por livro
router.get("/stats/book/:bookId", (req, res) => {
	res.json({
		success: true,
		data: { emprestimos: 20, reservas: 3 },
		error: null,
	});
});

module.exports = router;
