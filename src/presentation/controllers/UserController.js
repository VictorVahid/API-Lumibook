const {
	CreateUser,
	GetUser,
	UpdateUser,
	DeleteUser,
} = require("../../usecases/userUseCases");
const MongooseUserRepo = require("../../infrastructure/mongoose/repositories/MongooseUserRepository");

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
