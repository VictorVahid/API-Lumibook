import Pais from "../db/schemas/paises.js";

export const createPais = async (req, res) => {
	try {
		const newPais = await Pais.create(req.body);
		res.status(201).json(newPais);
	} catch (error) {
		res.status(500).send(`Erro ao criar país: ${error}`);
	}
};

export const getAllPaises = async (req, res) => {
	try {
		const paisesAll = await Pais.find();
		res.json(paisesAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar países: ${error}`);
	}
};

export const getPaisById = async (req, res) => {
	try {
		const pais = await Pais.findById(req.params.id);
		if (!pais) return res.status(404).send("País não encontrado");
		res.json(pais);
	} catch (error) {
		res.status(500).send(`Erro ao buscar país: ${error}`);
	}
};

export const updatePais = async (req, res) => {
	try {
		const update = await Pais.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!update) return res.status(404).send("País não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar país: ${error}`);
	}
};

export const deletePais = async (req, res) => {
	try {
		const deleted = await Pais.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("País não encontrado");
		res
			.status(200)
			.json({ message: "País deletado com sucesso", deletedPais: deleted });
	} catch (error) {
		res.status(500).send(`Erro ao deletar país: ${error}`);
	}
};
