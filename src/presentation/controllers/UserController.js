const {
	CreateUser,
	GetUser,
	UpdateUser,
	DeleteUser,
} = require("../../domain/usecases/userUseCases.js");
const MongooseUserRepo = require("../../infrastructure/mongoose/repositories/MongooseUserRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const LoanModel = require("../../infrastructure/mongoose/models/Loan");
const FineModel = require("../../infrastructure/mongoose/models/Fine");
const ReservationModel = require("../../infrastructure/mongoose/models/Reservation");
const BookModel = require("../../infrastructure/mongoose/models/Book");

const userRepo = new MongooseUserRepo();
const createUserUC = new CreateUser(userRepo);
const getUserUC = new GetUser(userRepo);
const updateUserUC = new UpdateUser(userRepo);
const deleteUserUC = new DeleteUser(userRepo);

function padronizarUsuario(user) {
	return {
		id: user.id || user._id || null,
		nome: user.nome || user.name || null,
		email: user.email || null,
		papel: papelFrontEnd(user.papel || user.role || null),
		matricula: user.matricula || null,
		tipoLogin: user.tipoLogin || null,
		avatarUrl: user.avatarUrl || user.avatar || null,
		statusConta: user.statusConta != null ? user.statusConta : "ativa",
		telefone: user.telefone || null,
	};
}

function calcularMembroDesde(user) {
	try {
		let date;
		if (user && user.createdAt) {
			date = new Date(user.createdAt);
		} else if (user && user._id && typeof user._id === 'string' && user._id.length === 24) {
			date = new Date(parseInt(user._id.substring(0, 8), 16) * 1000);
		} else {
			return "Desconhecido";
		}
		const meses = [
			"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
			"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
		];
		return `${meses[date.getMonth()]} ${date.getFullYear()}`;
	} catch (e) {
		return "Desconhecido";
	}
}

function papelFrontEnd(papel) {
	if (papel === 'leitor') return 'aluno';
	if (papel === 'funcionario') return 'professor';
	return papel;
}

exports.createUser = async (req, res) => {
	try {
		// Aceitar tanto português quanto inglês
		const nome = req.body.nome || req.body.name;
		const senha = req.body.senha || req.body.password;
		const papel = req.body.papel || req.body.role;
		const email = req.body.email;
		const telefone = req.body.telefone || req.body.phone;
		const matricula = req.body.matricula;

		const papelFinal = (papel || "").toLowerCase();

		if (papelFinal === "aluno") {
			if (!matricula || !/^\d{7,}$/.test(matricula)) {
				return res.status(400).json({
					success: false,
					data: null,
					error:
						"Matrícula obrigatória e deve conter ao menos 7 dígitos numéricos para aluno.",
				});
			}
			// Para aluno, qualquer e-mail é aceito
		} else if (papelFinal === "professor") {
			const dominiosPermitidos = ["@instituicao.edu", "@universitas.edu.br"];
			if (!email || !dominiosPermitidos.some((dominio) => email.endsWith(dominio))) {
				return res.status(400).json({
					success: false,
					data: null,
					error: "Email institucional obrigatório para professor.",
				});
			}
			if (matricula) {
				return res.status(400).json({
					success: false,
					data: null,
					error: "Professor não deve ter matrícula.",
				});
			}
		} else {
			return res.status(403).json({
				success: false,
				data: null,
				error: "Cadastro permitido apenas para alunos e professores.",
			});
		}

		if (!nome || typeof nome !== "string" || nome.trim() === "") {
			return res
				.status(400)
				.json({ success: false, error: "Nome do usuário é obrigatório" });
		}
		if (!senha || typeof senha !== "string" || senha.trim() === "") {
			return res.status(400).json({
				success: false,
				error: "Password é obrigatória e deve ser uma string",
			});
		}

		const senhaHash = await bcrypt.hash(senha, 10);

		// Montar payload padronizado para o use case
		const payload = {
			name: nome,
			email,
			password: senha,
			role: papelFinal,
			telefone,
			matricula,
		};

		const result = await createUserUC.execute(payload);
		return res.status(201).json({
			success: true,
			data: {
				id: result.id || result._id,
				nome: result.nome || result.name,
				email: result.email,
				papel: result.papel || result.role,
			},
			error: null,
		});
	} catch (e) {
		return res
			.status(400)
			.json({ success: false, data: null, error: e.message });
	}
};

exports.getUser = async (req, res) => {
	try {
		let user;
		if (req.user && req.originalUrl.endsWith("/profile")) {
			user = await getUserUC.execute(req.user.id);
		} else {
			user = await getUserUC.execute(req.params.id);
		}
		return res.status(200).json({
			id: user.id || user._id,
			nome: user.nome || user.name,
			email: user.email,
			matricula: user.matricula || null,
			papel: papelFrontEnd(user.papel || user.role || null),
			avatar: user.avatarUrl || user.avatar || null,
			statusConta: user.statusConta || "ativa",
			membroDesde: calcularMembroDesde(user)
		});
	} catch (e) {
		return res.status(404).json({ message: e.message });
	}
};

exports.patchUser = async (req, res) => {
	try {
		if (req.body.password && req.body.password.length < 8) {
			return res
				.status(400)
				.json({ message: "Password deve ter ao menos 8 caracteres" });
		}
		let updated;
		if (req.user && req.path === "/perfil") {
			updated = await updateUserUC.execute(req.user.id, req.body);
			return res.status(200).json({
				id: updated.id || updated._id,
				name: updated.nome,
				telefone: updated.telefone,
			});
		} else {
			updated = await updateUserUC.execute(req.params.id, req.body);
			return res.status(200).json(padronizarUsuario(updated));
		}
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const result = await deleteUserUC.execute(req.params.id);
		return res.status(200).json(result);
	} catch (e) {
		return res.status(404).json({ message: e.message });
	}
};

exports.login = async (req, res) => {
	const email = req.body.email;
	const matricula = req.body.matricula;
	const password = req.body.password || req.body.senha;

	if ((!email && !matricula) || !password) {
		return res.status(400).json({
			success: false,
			data: null,
			error: "Email ou matrícula e senha são obrigatórios",
		});
	}

	let user;
	if (email) {
		user = await userRepo.findByEmail(email);
		// Só permite login de admin, professor ou bibliotecário por email
		if (user && !["admin", "professor", "bibliotecario"].includes(user.role)) {
			return res.status(403).json({
				success: false,
				data: null,
				error: "Login por e-mail permitido apenas para admin, professor ou bibliotecário"
			});
		}
	} else if (matricula) {
		user = await userRepo.findByMatricula(matricula);
		// Só permite login de aluno por matrícula
		if (user && user.role !== "aluno") {
			return res.status(403).json({
				success: false,
				data: null,
				error: "Login por matrícula permitido apenas para alunos"
			});
		}
	}

	if (!user) {
		return res
			.status(400)
			.json({ success: false, data: null, error: "Usuário não encontrado" });
	}
	if (!user.senhaHash) {
		return res.status(400).json({
			success: false,
			data: null,
			error: "Usuário sem senha cadastrada ou cadastro inconsistente"
		});
	}
	const senhaCorreta = await bcrypt.compare(password, user.senhaHash);
	if (!senhaCorreta) {
		return res
			.status(400)
			.json({ success: false, data: null, error: "Password inválido" });
	}
	const papelFront = (user.papel || user.role) === 'leitor' ? 'aluno' : (user.papel || user.role) === 'funcionario' ? 'professor' : (user.papel || user.role);
	const token = jwt.sign(
		{ id: user.id || user._id, papel: papelFront },
		process.env.JWT_SECRET || "segredo",
		{ expiresIn: "7d" }
	);
	return res.json({
		success: true,
		data: {
			id: user.id || user._id,
			nome: user.nome || user.name,
			email: user.email,
			papel: papelFront,
			matricula: user.matricula || null,
			token,
		},
		error: null,
	});
};

exports.listUsers = async (req, res) => {
	try {
		const users = await userRepo.findAll();
		const padronizados = users.map(padronizarUsuario);
		res.json(padronizados);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.getAvatar = async (req, res) => {
	const user = await userRepo.findById(req.params.id);
	if (!user) {
		return res.status(404).json({ message: "Usuário não encontrado" });
	}
	return res.json({ avatarUrl: user.avatarUrl || user.avatar || null });
};

exports.getUserStats = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await getUserUC.execute(userId);
		const papel = user.papel || user.role;
		// Exemplo de obtenção dos dados (ajuste conforme sua lógica real):
		const limiteConcorrente = 3;
		const livrosDisponiveis = await BookModel.countDocuments({ disponivel: true });
		const livrosEmprestados = await LoanModel.countDocuments({ usuario: userId, status: { $in: ["ativo", "atrasado"] } });
		const reservasDocs = await ReservationModel.find({ usuarioId: userId }).populate("livroId");
		const reservas = reservasDocs.map(r => ({
			id: r._id.toString(),
			status: r.status,
			dataReserva: r.dataReserva ? new Date(r.dataReserva).toISOString() : null,
			tituloLivro: r.livroId && r.livroId.title ? r.livroId.title : null
		}));
		const reservasRealizadas = reservas.length;
		const atrasos = await LoanModel.countDocuments({ usuario: userId, status: "atrasado" });
		const emprestimosAtrasadosDocs = await LoanModel.find({ usuario: userId, status: "atrasado" }).populate("livroId");
		const emprestimosAtrasados = emprestimosAtrasadosDocs.map(e => ({
			id: e._id.toString(),
			status: e.status,
			dataEmprestimo: e.dataEmprestimo ? new Date(e.dataEmprestimo).toISOString() : null,
			dataDevolucao: e.dataDevolucao ? new Date(e.dataDevolucao).toISOString() : null,
			tituloLivro: e.livroId && e.livroId.title ? e.livroId.title : null
		}));
		const multasPendentes = await FineModel.countDocuments({ usuarioId: userId, status: "pendente" });
		const bibliografiasGerenciadas = papel === "professor" ? (user.bibliografiasGerenciadas || 0) : undefined;
		const fonte = "Sistema Lumibook";
		const ultimaAtualizacao = new Date().toISOString();
		// Monta o objeto final, garantindo todos os campos obrigatórios
		const stats = {
			livrosDisponiveis: Number(livrosDisponiveis),
			livrosEmprestados: Number(livrosEmprestados),
			reservasRealizadas: Number(reservasRealizadas),
			reservas: reservas,
			atrasos: Number(atrasos),
			emprestimosAtrasados: Array.isArray(emprestimosAtrasados) ? emprestimosAtrasados : [],
			multasPendentes: Number(multasPendentes),
			limiteConcorrente: Number(limiteConcorrente),
			fonte,
			ultimaAtualizacao
		};
		if (papel === "professor") {
			stats.bibliografiasGerenciadas = Number(bibliografiasGerenciadas || 0);
		}
		// Garante que todos os campos obrigatórios estejam presentes
		[
			"livrosDisponiveis",
			"livrosEmprestados",
			"reservasRealizadas",
			"reservas",
			"atrasos",
			"emprestimosAtrasados",
			"multasPendentes",
			"limiteConcorrente",
			"fonte",
			"ultimaAtualizacao"
		].forEach(campo => {
			if (typeof stats[campo] === "undefined") {
				stats[campo] = campo === "reservas" || campo === "emprestimosAtrasados" ? [] : 0;
			}
		});
		return res.status(200).json(stats);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

exports.getUserActivities = async (req, res) => {
	const userId = req.params.id;
	res.json([
		{
			tipo: "emprestimo",
			livroId: "456",
			titulo: "Livro Teste",
			data: "2024-03-20",
			status: "ativo",
		},
	]);
};

// Estatísticas de aluno
exports.getStudentStats = async (req, res) => {
	const usuarioId = req.params.id;
	const limiteConcorrente = 3;

	try {
		const livrosEmprestados = await LoanModel.countDocuments({
			usuario: usuarioId,
			status: { $in: ["ativo", "atrasado"] },
		});

		const reservasAtivas = await ReservationModel.countDocuments({
			usuarioId,
			status: { $in: ["pendente", "ativa", "atendida"] },
		});

		const multasPendentes = await FineModel.countDocuments({
			usuario: usuarioId,
			status: { $ne: "paga" },
		});

		const devolucoesPendentes = await LoanModel.countDocuments({
			usuario: usuarioId,
			status: "atrasado",
		});

		const livrosDisponiveis = Math.max(
			0,
			limiteConcorrente - (livrosEmprestados + reservasAtivas)
		);

		res.json({
			livrosEmprestados,
			multasPendentes,
			devolucoesPendentes,
			livrosDisponiveis,
			limiteConcorrente,
			ultimaAtualizacao: new Date(),
			fonte: "Sistema Lumibook",
			bibliografiasGerenciadas: 0,
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
