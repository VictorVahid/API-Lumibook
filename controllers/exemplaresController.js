import Exemplar from "../db/schemas/exemplares.js";

export const createExemplar = async (req, res) => {
	try {
		const newExemplar = await Exemplar.create(req.body);
		res.status(201).json(newExemplar);
	} catch (error) {
		res.status(500).send(`Erro ao criar exemplar: ${error}`);
	}
};

export const getAllExemplares = async (req, res) => {
	try {
		const exemplaresAll = await Exemplar.find().populate("livro_id");
		res.json(exemplaresAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar exemplares: ${error}`);
	}
};

export const getExemplarById = async (req, res) => {
	try {
		const exemplar = await Exemplar.findById(req.params.id).populate(
			"livro_id"
		);
		if (!exemplar) return res.status(404).send("Exemplar não encontrado");
		res.json(exemplar);
	} catch (error) {
		res.status(500).send(`Erro ao buscar exemplar: ${error}`);
	}
};

export const updateExemplar = async (req, res) => {
	try {
		const update = await Exemplar.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		}).populate("livro_id");
		if (!update) return res.status(404).send("Exemplar não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar exemplar: ${error}`);
	}
};

export const deleteExemplar = async (req, res) => {
	try {
		const deleted = await Exemplar.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Exemplar não encontrado");
		res
			.status(200)
			.json({
				message: "Exemplar deletado com sucesso",
				deletedExemplar: deleted,
			});
	} catch (error) {
		res.status(500).send(`Erro ao deletar exemplar: ${error}`);
	}
};
