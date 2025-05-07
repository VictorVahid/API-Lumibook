import Endereco from "../db/schemas/enderecos.js";

export const createEndereco = async (req, res) => {
	try {
		const newEndereco = await Endereco.create(req.body);
		res.status(201).json(newEndereco);
	} catch (error) {
		res.status(500).send(`Erro ao criar endereço: ${error}`);
	}
};

export const getAllEnderecos = async (req, res) => {
	try {
		const enderecosAll = await Endereco.find().populate("cidade_id");
		res.json(enderecosAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar endereços: ${error}`);
	}
};

export const getEnderecoById = async (req, res) => {
	try {
		const endereco = await Endereco.findById(req.params.id).populate(
			"cidade_id"
		);
		if (!endereco) return res.status(404).send("Endereço não encontrado");
		res.json(endereco);
	} catch (error) {
		res.status(500).send(`Erro ao buscar endereço: ${error}`);
	}
};

export const updateEndereco = async (req, res) => {
	try {
		const update = await Endereco.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		}).populate("cidade_id");
		if (!update) return res.status(404).send("Endereço não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar endereço: ${error}`);
	}
};

export const deleteEndereco = async (req, res) => {
	try {
		const deleted = await Endereco.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Endereço não encontrado");
		res
			.status(200)
			.json({
				message: "Endereço deletado com sucesso",
				deletedEndereco: deleted,
			});
	} catch (error) {
		res.status(500).send(`Erro ao deletar endereço: ${error}`);
	}
};
