import Assunto from "../db/schemas/assuntos.js";

export const createAssunto = async (req, res) => {
	try {
		const newAssunto = await Assunto.create(req.body);
		res.status(201).json(newAssunto);
	} catch (error) {
		res.status(500).send(`Erro ao criar assunto: ${error}`);
	}
};

export const getAllAssuntos = async (req, res) => {
	try {
		const assuntosAll = await Assunto.find();
		res.json(assuntosAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar assuntos: ${error}`);
	}
};

export const getAssuntoById = async (req, res) => {
	try {
		const assunto = await Assunto.findById(req.params.id);
		if (!assunto) return res.status(404).send("Assunto não encontrado");
		res.json(assunto);
	} catch (error) {
		res.status(500).send(`Erro ao buscar assunto: ${error}`);
	}
};

export const updateAssunto = async (req, res) => {
	try {
		const update = await Assunto.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!update) return res.status(404).send("Assunto não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar assunto: ${error}`);
	}
};

export const deleteAssunto = async (req, res) => {
	try {
		const deleted = await Assunto.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Assunto não encontrado");
		res
			.status(200)
			.json({
				message: "Assunto deletado com sucesso",
				deletedAssunto: deleted,
			});
	} catch (error) {
		res.status(500).send(`Erro ao deletar assunto: ${error}`);
	}
};
