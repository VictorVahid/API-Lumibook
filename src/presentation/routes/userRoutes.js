const express = require("express");
const userCtrl = require("../controllers/UserController");
const authController = require("../controllers/authController");
const requireAuth = require("../../middlewares/requireAuth");
const userRouter = express.Router();

userRouter.post("/usuarios/login", authController.login);
userRouter.post("/usuarios/register", userCtrl.createUser);
userRouter.post("/usuarios", userCtrl.createUser);
userRouter.get("/usuarios", userCtrl.listUsers);
userRouter.get("/usuarios/:id", userCtrl.getUser);
userRouter.patch("/usuarios/:id", requireAuth, userCtrl.patchUser);
userRouter.delete("/usuarios/:id", requireAuth, userCtrl.deleteUser);
userRouter.get("/usuarios/:id/avatar", userCtrl.getAvatar);
userRouter.get("/usuarios/:id/stats", userCtrl.getUserStats);
userRouter.get("/usuarios/perfil", requireAuth, userCtrl.getUser);
userRouter.patch("/usuarios/perfil", requireAuth, userCtrl.patchUser);
userRouter.get(
	"/usuarios/:id/atividades",
	requireAuth,
	userCtrl.getUserActivities
);

// Alias para compatibilidade com rota esperada no frontend
userRouter.get("/usuarios/:id/estatisticas", (req, res, next) => {
	req.url = `/alunos/${req.params.id}/estatisticas`;
	next();
});

// PUT /api/usuarios/atualizar
userRouter.put("/usuarios/atualizar", requireAuth, userCtrl.patchUser);

const LoanModel = require("../../infrastructure/mongoose/models/Loan");

userRouter.get("/alunos/:id/historico-emprestimos", async (req, res) => {
	try {
		const { id } = req.params;
		const historico = await LoanModel.find({ usuario: id }).lean();
		res.json(historico);
	} catch (err) {
		res.status(500).json({ error: "Erro ao buscar histórico do aluno." });
	}
});

userRouter.get("/professores/:id/historico-emprestimos", async (req, res) => {
	try {
		const { id } = req.params;
		const historico = await LoanModel.find({ usuario: id }).lean(); // mesma lógica
		res.json(historico);
	} catch (err) {
		res.status(500).json({ error: "Erro ao buscar histórico do professor." });
	}
});

const EstatisticaController = require("../controllers/EstatisticaController");

userRouter.put(
	"/usuarios/:userId/estatisticas/:statKey",
	requireAuth,
	EstatisticaController.atualizarEstatistica
);

module.exports = userRouter;
