// Criação de um novo empréstimo
exports.createLoan = async (req, res) => {
	const { usuarioId, dataEmprestimo, dataPrevistaDevolucao, itens } = req.body;
	if (!usuarioId)
		return res.status(400).json({ message: "usuarioId é obrigatório" });
	if (!dataPrevistaDevolucao)
		return res
			.status(400)
			.json({ message: "dataPrevistaDevolucao é obrigatória" });
	if (!itens || !Array.isArray(itens) || itens.length === 0) {
		return res
			.status(400)
			.json({ message: "É necessário informar ao menos um exemplar (itens)" });
	}
	const id = `mockEmprestimo_${Math.random().toString(36).substring(2, 10)}`;
	res.status(201).json({
		id,
		usuarioId,
		dataEmprestimo: dataEmprestimo || new Date().toISOString(),
		dataPrevistaDevolucao,
		itens,
		status: "ativo",
	});
};

// Listagem de empréstimos (mock)
exports.listLoans = async (req, res) => {
	res.json([
		{
			id: "mockEmprestimo_1",
			usuarioId: "user1",
			dataEmprestimo: "2025-05-29",
			dataPrevistaDevolucao: "2025-06-05",
			itens: ["ex1", "ex2"],
			status: "ativo",
		},
	]);
};

// Devolução de empréstimo (mock)
exports.returnLoan = async (req, res) => {
	res.json({ id: req.params.id, status: "devolvido" });
};

const LoanModel = require("../../infrastructure/mongoose/models/Loan");

exports.cancelLoan = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await LoanModel.findByIdAndDelete(id);
		if (!deleted) {
			return res
				.status(404)
				.json({ success: false, message: "Empréstimo não encontrado" });
		}
		res.json({ success: true, message: "Empréstimo cancelado com sucesso." });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};
