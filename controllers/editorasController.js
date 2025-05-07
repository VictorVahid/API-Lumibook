import Editora from "../db/schemas/editoras.js";

export const createEditora = async (req, res) => {
	try {
		const newEditora = await Editora.create(req.body);
		res.status(201).json(newEditora);
	} catch (error) {
		res.status(500).send(`Erro ao criar editora: ${error}`);
	}
};

export const getAllEditoras = async (req, res) => {
	try {
		const editorasAll = await Editora.find();
		res.json(editorasAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar editoras: ${error}`);
	}
};

export const getEditoraById = async (req, res) => {
	try {
		const editora = await Editora.findById(req.params.id);
		if (!editora) return res.status(404).send("Editora não encontrada");
		res.json(editora);
	} catch (error) {
		res.status(500).send(`Erro ao buscar editora: ${error}`);
	}
};

export const updateEditora = async (req, res) => {
	try {
		const update = await Editora.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!update) return res.status(404).send("Editora não encontrada");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar editora: ${error}`);
	}
};

export const deleteEditora = async (req, res) => {
	try {
		const deleted = await Editora.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Editora não encontrada");
		res
			.status(200)
			.json({
				message: "Editora deletada com sucesso",
				deletedEditora: deleted,
			});
	} catch (error) {
		res.status(500).send(`Erro ao deletar editora: ${error}`);
	}
};
