const {
	CreateUser,
	GetUser,
	UpdateUser,
	DeleteUser,
} = require("../../usecases/userUseCases");
const MongooseUserRepo = require("../../infrastructure/mongoose/repositories/MongooseUserRepository");

const repoUser = new MongooseUserRepo();
const createUserUC = new CreateUser(repoUser);
const getUserUC = new GetUser(repoUser);
const updateUserUC = new UpdateUser(repoUser);
const deleteUserUC = new DeleteUser(repoUser);

exports.createUser = async (req, res) => {
	try {
		const result = await createUserUC.execute(req.body);
		res.status(201).json(result);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await getUserUC.execute(req.params.id);
		res.json(user);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
};

exports.patchUser = async (req, res) => {
	try {
		const updated = await updateUserUC.execute(req.params.id, req.body);
		res.json(updated);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const result = await deleteUserUC.execute(req.params.id);
		res.json(result);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
};
