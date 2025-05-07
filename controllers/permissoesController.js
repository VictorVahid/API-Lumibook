import Permissao from "../db/schemas/permissoes.js";

export const createPermissao = async (req, res) => {
	try {
		const newPermissao = await Permissao.create(req.body);
		res.status(201).json(newPermissao);
	} catch (error) {
		res.status(500).send(`Erro ao criar permissão: ${error}`);
	}
};

export const getAllPermissoes = async (req, res) => {
	try {
		const permissoesAll = await Permissao.find();
		res.json(permissoesAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar permissões: ${error}`);
	}
};

export const getPermissaoById = async (req, res) => {
	try {
		const permissao = await Permissao.findById(req.params.id);
		if (!permissao) return res.status(404).send("Permissão não encontrada");
		res.json(permissao);
	} catch (error) {
		res.status(500).send(`Erro ao buscar permissão: ${error}`);
	}
};

export const updatePermissao = async (req, res) => {
	try {
		const update = await Permissao.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!update) return res.status(404).send("Permissão não encontrada");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar permissão: ${error}`);
	}
};

export const deletePermissao = async (req, res) => {
	try {
		const deleted = await Permissao.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Permissão não encontrada");
		res
			.status(200)
			.json({
				message: "Permissão deletada com sucesso",
				deletedPermissao: deleted,
			});
	} catch (error) {
		res.status(500).send(`Erro ao deletar permissão: ${error}`);
	}
};
