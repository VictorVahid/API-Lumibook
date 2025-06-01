const express = require("express");
const router = express.Router();

// Catalogar nova obra
router.post("/admin/obras/catalogar", (req, res) => {
  // Aqui você salvaria no banco, por enquanto só retorna sucesso
  res.json({ success: true, data: req.body, message: "Obra catalogada com sucesso!" });
});

router.get("/admin/stats", (req, res) => {
	res.json({
		usuarios: 100,
		livros: 500,
		exemplares: 1200,
		reservas: 30,
		multas: 5,
		emprestimos: 80,
		atualizadoEm: new Date().toISOString()
	});
});

router.get("/admin/activities", (req, res) => {
	res.json([
		{ acao: "login", usuario: "admin", data: new Date().toISOString() },
		{ acao: "cadastro_livro", usuario: "admin", data: new Date().toISOString() }
	]);
});

module.exports = router; 