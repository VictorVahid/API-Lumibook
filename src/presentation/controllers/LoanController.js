const jwt = require("jsonwebtoken");
const LoanModel = require("../../infrastructure/mongoose/models/Loan");
const BookModel = require("../../infrastructure/mongoose/models/Book");

// Criação de um novo empréstimo
exports.createLoan = async (req, res) => {
	const { usuarioId, livroId, tituloLivro, dataEmprestimo, dataPrevistaDevolucao } = req.body;
	if (!usuarioId)
		return res.status(400).json({ message: "usuarioId é obrigatório" });
	if (!livroId)
		return res.status(400).json({ message: "livroId é obrigatório" });
	if (!tituloLivro)
		return res.status(400).json({ message: "tituloLivro é obrigatório" });
	if (!dataPrevistaDevolucao)
		return res
			.status(400)
			.json({ message: "dataPrevistaDevolucao é obrigatória" });

	try {
		const novoEmprestimo = await LoanModel.create({
			usuario: usuarioId,
			livro: livroId,
			tituloLivro,
			dataEmprestimo: dataEmprestimo || new Date(),
			dataDevolucao: null,
			status: "ativo"
		});
		res.status(201).json({ success: true, data: novoEmprestimo });
	} catch (e) {
		res.status(500).json({ success: false, error: e.message });
	}
};

// Listagem real de empréstimos
exports.listLoans = async (req, res) => {
	try {
		const loans = await LoanModel.find().populate("livro usuario");
		const result = loans.map(l => ({
			id: l._id.toString(),
			usuario: l.usuario,
			livro: l.livro,
			tituloLivro: l.tituloLivro,
			dataEmprestimo: l.dataEmprestimo,
			dataDevolucao: l.dataDevolucao,
			status: l.status
		}));
		res.json(result);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

// Buscar empréstimo por ID
exports.getLoan = async (req, res) => {
	try {
		const l = await LoanModel.findById(req.params.id).populate("livro usuario");
		if (!l) return res.status(404).json({ message: "Empréstimo não encontrado" });
		res.json({
			id: l._id.toString(),
			usuario: l.usuario,
			livro: l.livro,
			tituloLivro: l.tituloLivro,
			dataEmprestimo: l.dataEmprestimo,
			dataDevolucao: l.dataDevolucao,
			status: l.status
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

// Devolução de empréstimo (mock)
exports.returnLoan = async (req, res) => {
	res.json({ id: req.params.id, status: "devolvido" });
};

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

// Endpoint para listar empréstimos ativos do usuário autenticado
exports.listUserActiveLoans = async (req, res) => {
	try {
		const auth = req.headers.authorization;
		if (!auth || !auth.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Token não fornecido" });
		}
		const token = auth.replace("Bearer ", "");
		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET || "segredo");
		} catch (e) {
			return res.status(401).json({ message: "Token inválido" });
		}
		const userId = decoded.id;
		// Buscar empréstimos ativos do usuário
		const loans = await LoanModel.find({ usuario: userId, status: "ativo" }).populate("livro");
		const result = loans.map(l => ({
			id: l._id.toString(),
			tituloLivro: l.tituloLivro || (l.livro && l.livro.title) || null,
			autor: l.livro && l.livro.authors && l.livro.authors.length > 0 ? l.livro.authors[0] : null,
			capa: l.livro && l.livro.coverUrl ? l.livro.coverUrl : null,
			isbn: l.livro && l.livro.isbn ? l.livro.isbn : null,
			dataEmprestimo: l.dataEmprestimo ? new Date(l.dataEmprestimo).toISOString() : null,
			dataPrevistaDevolucao: l.dataPrevistaDevolucao ? new Date(l.dataPrevistaDevolucao).toISOString() : null
		}));
		return res.json(result);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};
