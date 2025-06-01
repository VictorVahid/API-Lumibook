const {
	CreateUser,
	GetUser,
	UpdateUser,
	DeleteUser,
} = require("../../usecases/userUseCases");
const MongooseUserRepo = require("../../infrastructure/mongoose/repositories/MongooseUserRepository");
const bcrypt = require("bcryptjs");

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
		return res.status(400).json({ error: e.message });
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await getUserUC.execute(req.params.id);
		return res.status(200).json(user);
	} catch (e) {
		return res.status(404).json({ error: e.message });
	}
};

exports.patchUser = async (req, res) => {
	try {
		const updated = await updateUserUC.execute(req.params.id, req.body);
		return res.status(200).json(updated);
	} catch (e) {
		return res.status(400).json({ error: e.message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const result = await deleteUserUC.execute(req.params.id);
		return res.status(200).json(result);
	} catch (e) {
		return res.status(404).json({ error: e.message });
	}
};

exports.login = async (req, res) => {
	const { identificador, senha } = req.body;
	if (!identificador || !senha) {
		return res.status(400).json({ error: "Identificador e senha são obrigatórios" });
	}
	let user;
	if (identificador.includes("@")) {
		user = await userRepo.findByEmail(identificador);
	} else {
		user = await userRepo.findByMatricula(identificador);
	}
	if (!user) {
		return res.status(400).json({ error: "Usuário não encontrado" });
	}
	const senhaCorreta = await bcrypt.compare(senha, user.senhaHash);
	if (!senhaCorreta) {
		return res.status(400).json({ error: "Senha inválida" });
	}
	return res.json({
		id: user.id || user._id,
		nome: user.nome,
		email: user.email,
		papel: user.role || user.papel,
		matricula: user.matricula
	});
};

exports.listUsers = async (req, res) => {
	try {
		const users = await userRepo.findAll();
		res.json(users);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};
