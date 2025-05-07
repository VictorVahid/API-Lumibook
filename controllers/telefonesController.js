import Telefone from "../db/schemas/telefones.js";

export const createTelefone = async (req, res) => {
	try {
		const newTelefone = await Telefone.create(req.body);
		res.status(201).json(newTelefone);
	} catch (error) {
		res.status(500).send(`Erro ao criar telefone: ${error}`);
	}
};

export const getAllTelefones = async (req, res) => {
	try {
		const telefonesAll = await Telefone.find();
		res.json(telefonesAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar telefones: ${error}`);
	}
};

export const getTelefoneById = async (req, res) => {
	try {
		const telefone = await Telefone.findById(req.params.id);
		if (!telefone) return res.status(404).send("Telefone não encontrado");
		res.json(telefone);
	} catch (error) {
		res.status(500).send(`Erro ao buscar telefone: ${error}`);
	}
};

export const updateTelefone = async (req, res) => {
	try {
		const update = await Telefone.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!update) return res.status(404).send("Telefone não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar telefone: ${error}`);
	}
};

export const deleteTelefone = async (req, res) => {
	try {
		const deleted = await Telefone.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Telefone não encontrado");
		res
			.status(200)
			.json({
				message: "Telefone deletado com sucesso",
				deletedTelefone: deleted,
			});
	} catch (error) {
		res.status(500).send(`Erro ao deletar telefone: ${error}`);
	}
};
