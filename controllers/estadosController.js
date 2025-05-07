import Estado from "../db/schemas/estados.js";

export const createEstado = async (req, res) => {
	try {
		const newEstado = await Estado.create(req.body);
		res.status(201).json(newEstado);
	} catch (error) {
		res.status(500).send(`Erro ao criar estado: ${error}`);
	}
};

export const getAllEstados = async (req, res) => {
	try {
		const estadosAll = await Estado.find().populate("pais_id");
		res.json(estadosAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar estados: ${error}`);
	}
};

export const getEstadoById = async (req, res) => {
	try {
		const estado = await Estado.findById(req.params.id).populate("pais_id");
		if (!estado) return res.status(404).send("Estado não encontrado");
		res.json(estado);
	} catch (error) {
		res.status(500).send(`Erro ao buscar estado: ${error}`);
	}
};

export const updateEstado = async (req, res) => {
	try {
		const update = await Estado.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		}).populate("pais_id");
		if (!update) return res.status(404).send("Estado não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar estado: ${error}`);
	}
};

export const deleteEstado = async (req, res) => {
	try {
		const deleted = await Estado.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Estado não encontrado");
		res
			.status(200)
			.json({ message: "Estado deletado com sucesso", deletedEstado: deleted });
	} catch (error) {
		res.status(500).send(`Erro ao deletar estado: ${error}`);
	}
};
