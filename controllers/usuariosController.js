import Usuario from "../db/schemas/usuarios.js";

export const createUser = async (req, res) => {
	try {
		const newUser = await Usuario.create(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).send(`Erro ao criar usuário: ${error}`);
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const usersAll = await Usuario.find()
			.populate("endereco_id")
			.populate("telefone_id");
		res.json(usersAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar usuários: ${error}`);
	}
};

export const getUserById = async (req, res) => {
	try {
		const user = await Usuario.findById(req.params.id)
			.populate("endereco_id")
			.populate("telefone_id");
		if (!user) return res.status(404).send("Usuário não encontrado");
		res.json(user);
	} catch (error) {
		res.status(500).send(`Erro ao buscar usuário: ${error}`);
	}
};

export const updateUser = async (req, res) => {
	try {
		const update = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
			.populate("endereco_id")
			.populate("telefone_id");
		if (!update) return res.status(404).send("Usuário não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar usuário: ${error}`);
	}
};

export const deleteUser = async (req, res) => {
	try {
		const deleted = await Usuario.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Usuário não encontrado");
		res
			.status(200)
			.json({ message: "Usuário deletado com sucesso", deletedUser: deleted });
	} catch (error) {
		res.status(500).send(`Erro ao deletar usuário: ${error}`);
	}
};
