import PerfilAcesso from "../db/schemas/perfis_acesso.js";

export const createPerfilAcesso = async (req, res) => {
	try {
		const newPerfilAcesso = await PerfilAcesso.create(req.body);
		res.status(201).json(newPerfilAcesso);
	} catch (error) {
		res.status(500).send(`Erro ao criar perfil de acesso: ${error}`);
	}
};

export const getAllPerfisAcesso = async (req, res) => {
	try {
		const perfisAcessoAll = await PerfilAcesso.find();
		res.json(perfisAcessoAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar perfis de acesso: ${error}`);
	}
};

export const getPerfilAcessoById = async (req, res) => {
	try {
		const perfilAcesso = await PerfilAcesso.findById(req.params.id);
		if (!perfilAcesso)
			return res.status(404).send("Perfil de acesso não encontrado");
		res.json(perfilAcesso);
	} catch (error) {
		res.status(500).send(`Erro ao buscar perfil de acesso: ${error}`);
	}
};

export const updatePerfilAcesso = async (req, res) => {
	try {
		const update = await PerfilAcesso.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		if (!update) return res.status(404).send("Perfil de acesso não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar perfil de acesso: ${error}`);
	}
};

export const deletePerfilAcesso = async (req, res) => {
	try {
		const deleted = await PerfilAcesso.findByIdAndDelete(req.params.id);
		if (!deleted)
			return res.status(404).send("Perfil de acesso não encontrado");
		res
			.status(200)
			.json({
				message: "Perfil de acesso deletado com sucesso",
				deletedPerfilAcesso: deleted,
			});
	} catch (error) {
		res.status(500).send(`Erro ao deletar perfil de acesso: ${error}`);
	}
};
