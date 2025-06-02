const {
	CreateUser,
	GetUser,
	UpdateUser,
	DeleteUser,
} = require("../../usecases/userUseCases");
const MongooseUserRepo = require("../../infrastructure/mongoose/repositories/MongooseUserRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRepo = new MongooseUserRepo();
const createUserUC = new CreateUser(userRepo);
const getUserUC = new GetUser(userRepo);
const updateUserUC = new UpdateUser(userRepo);
const deleteUserUC = new DeleteUser(userRepo);

function padronizarUsuario(user) {
	return {
		id: user.id || user._id || null,
		nome: user.nome || null,
		email: user.email || null,
		papel: user.papel || user.role || null,
		matricula: user.matricula || null,
		tipoLogin: user.tipoLogin || null,
		avatarUrl: user.avatarUrl || user.avatar || null,
		statusConta: user.statusConta || null,
		telefone: user.telefone || null
	};
}

exports.createUser = async (req, res) => {
	try {
		const { papel, role, matricula, email } = req.body;
		const papelFinal = papel || role;
		if (papelFinal === "aluno") {
			if (!matricula || !/^\d{7,}$/.test(matricula)) {
				return res.status(400).json({ message: "Matrícula obrigatória e deve conter ao menos 7 dígitos numéricos para aluno." });
			}
			// Email pode ser qualquer um
		} else if (papelFinal === "professor") {
			if (!email || !/^[^@]+@universitas\.edu\.br$/.test(email)) {
				return res.status(400).json({ message: "Email institucional obrigatório para professor." });
			}
			if (matricula) {
				return res.status(400).json({ message: "Professor não deve ter matrícula." });
			}
		} else if (papelFinal === "admin") {
			return res.status(403).json({ message: "Cadastro de admin não permitido pelo endpoint." });
		}
		const result = await createUserUC.execute(req.body);
		return res.status(201).json(padronizarUsuario(result));
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await getUserUC.execute(req.params.id);
		return res.status(200).json(padronizarUsuario(user));
	} catch (e) {
		return res.status(404).json({ message: e.message });
	}
};

exports.patchUser = async (req, res) => {
	try {
		const updated = await updateUserUC.execute(req.params.id, req.body);
		return res.status(200).json(padronizarUsuario(updated));
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
	const { identificador, senha } = req.body;
	if (!identificador || !senha) {
		return res.status(400).json({ message: "Identificador e senha são obrigatórios" });
	}
	let user;
	let papel = null;
	let tipoLogin = null;
	if (/^\d{7,}$/.test(identificador)) {
		// Matrícula: só aluno
		user = await userRepo.findByMatricula(identificador);
		papel = user && (user.papel || user.role);
		tipoLogin = "matricula";
		if (user && papel !== "aluno") {
			return res.status(403).json({ message: "Somente alunos podem logar com matrícula." });
		}
	} else if (identificador === "admin@universitas.edu.br") {
		user = await userRepo.findByEmail(identificador);
		papel = user && (user.papel || user.role);
		tipoLogin = "email";
		if (user && papel !== "admin") {
			return res.status(403).json({ message: "Somente admin pode logar com este email." });
		}
	} else if (/^[^@]+@universitas\.edu\.br$/.test(identificador)) {
		// Email institucional: só professor
		user = await userRepo.findByEmail(identificador);
		papel = user && (user.papel || user.role);
		tipoLogin = "email";
		if (user && papel !== "professor") {
			return res.status(403).json({ message: "Somente professores podem logar com email institucional." });
		}
	} else {
		return res.status(400).json({ message: "Identificador inválido para login." });
	}
	if (!user) {
		return res.status(400).json({ message: "Usuário não encontrado" });
	}
	const senhaCorreta = await bcrypt.compare(senha, user.senhaHash);
	if (!senhaCorreta) {
		return res.status(400).json({ message: "Senha inválida" });
	}
	const token = jwt.sign({ id: user.id || user._id, papel: papel }, process.env.JWT_SECRET || "segredo", { expiresIn: "7d" });
	return res.json({
		id: user.id || user._id,
		nome: user.nome,
		email: user.email,
		papel: papel,
		matricula: user.matricula || null,
		tipoLogin: tipoLogin,
		avatarUrl: user.avatarUrl || user.avatar || null,
		token
	});
};

exports.listUsers = async (req, res) => {
	try {
		const users = await userRepo.findAll();
		res.json(users);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.getAvatar = async (req, res) => {
	// Retorna avatarUrl em JSON
	const user = await userRepo.findById(req.params.id);
	if (!user) {
		return res.status(404).json({ message: "Usuário não encontrado" });
	}
	return res.json({ avatarUrl: user.avatarUrl || user.avatar || null });
};

exports.getUserStats = async (req, res) => {
	// Mock: estatísticas básicas
	res.json({
		livrosEmprestados: 2,
		livrosDisponiveis: 10,
		limiteConcorrente: 3,
		devolucoesPendentes: 0,
		reservasAtivas: 1,
		historicoEmprestimos: 5,
		ultimaAtualizacao: new Date().toISOString(),
		tipoUsuario: "aluno"
	});
};

exports.getUserActivities = async (req, res) => {
	// Mock: atividades do usuário
	const userId = req.params.id;
	res.json([
		{
			acao: "login",
			usuario: userId,
			data: new Date().toISOString(),
			detalhes: "Usuário realizou login"
		},
		{
			acao: "reserva_livro",
			usuario: userId,
			data: new Date().toISOString(),
			detalhes: "Usuário reservou um livro"
		}
	]);
};
