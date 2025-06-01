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

exports.createUser = async (req, res) => {
	try {
		const result = await createUserUC.execute(req.body);
		return res.status(201).json(result);
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await getUserUC.execute(req.params.id);
		return res.status(200).json(user);
	} catch (e) {
		return res.status(404).json({ message: e.message });
	}
};

exports.patchUser = async (req, res) => {
	try {
		const updated = await updateUserUC.execute(req.params.id, req.body);
		return res.status(200).json(updated);
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
	if (identificador.includes("@")) {
		user = await userRepo.findByEmail(identificador);
	} else {
		user = await userRepo.findByMatricula(identificador);
	}
	if (!user) {
		return res.status(400).json({ message: "Usuário não encontrado" });
	}
	const senhaCorreta = await bcrypt.compare(senha, user.senhaHash);
	if (!senhaCorreta) {
		return res.status(400).json({ message: "Senha inválida" });
	}
	const token = jwt.sign({ id: user.id || user._id, papel: user.role || user.papel }, process.env.JWT_SECRET || "segredo", { expiresIn: "7d" });
	return res.json({
		id: user.id || user._id,
		nome: user.nome,
		email: user.email,
		papel: user.role || user.papel,
		matricula: user.matricula,
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
	// Placeholder: retorna um SVG base64 simples
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='100%' height='100%' fill='#eee'/><text x='50%' y='50%' font-size='24' text-anchor='middle' fill='#888' dy='.3em'>U</text></svg>`;
	const base64 = Buffer.from(svg).toString('base64');
	res.type('image/svg+xml');
	res.send(Buffer.from(svg));
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
