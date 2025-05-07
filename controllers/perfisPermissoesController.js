import PerfilPermissao from "../db/schemas/perfis_permissoes.js";

export const createPerfilPermissao = async (req, res) => {
	try {
		const newPerfilPermissao = await PerfilPermissao.create(req.body);
		res.status(201).json(newPerfilPermissao);
	} catch (error) {
		res
			.status(500)
			.send(`Erro ao criar relacionamento perfil-permissão: ${error}`);
	}
};

export const getAllPerfisPermissoes = async (req, res) => {
	try {
		const perfisPermissoesAll = await PerfilPermissao.find()
			.populate("perfil_acesso_id")
			.populate("permissao_id");
		res.json(perfisPermissoesAll);
	} catch (error) {
		res
			.status(500)
			.send(`Erro ao buscar relacionamentos perfil-permissão: ${error}`);
	}
};

export const getPerfilPermissaoById = async (req, res) => {
	try {
		const perfilPermissao = await PerfilPermissao.findById(req.params.id)
			.populate("perfil_acesso_id")
			.populate("permissao_id");
		if (!perfilPermissao)
			return res
				.status(404)
				.send("Relacionamento perfil-permissão não encontrado");
		res.json(perfilPermissao);
	} catch (error) {
		res
			.status(500)
			.send(`Erro ao buscar relacionamento perfil-permissão: ${error}`);
	}
};

export const deletePerfilPermissao = async (req, res) => {
	try {
		const deleted = await PerfilPermissao.findByIdAndDelete(req.params.id);
		if (!deleted)
			return res
				.status(404)
				.send("Relacionamento perfil-permissão não encontrado");
		res
			.status(200)
			.json({
				message: "Relacionamento perfil-permissão deletado com sucesso",
				deletedPerfilPermissao: deleted,
			});
	} catch (error) {
		res
			.status(500)
			.send(`Erro ao deletar relacionamento perfil-permissão: ${error}`);
	}
};
