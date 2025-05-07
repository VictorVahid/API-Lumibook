import Cidade from "../db/schemas/cidades.js";

export const createCidade = async (req, res) => {
	try {
		const newCidade = await Cidade.create(req.body);
		res.status(201).json(newCidade);
	} catch (error) {
		res.status(500).send(`Erro ao criar cidade: ${error}`);
	}
};

export const getAllCidades = async (req, res) => {
	try {
		const cidadesAll = await Cidade.find().populate("estado_id");
		res.json(cidadesAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar cidades: ${error}`);
	}
};

export const getCidadeById = async (req, res) => {
	try {
		const cidade = await Cidade.findById(req.params.id).populate("estado_id");
		if (!cidade) return res.status(404).send("Cidade não encontrada");
		res.json(cidade);
	} catch (error) {
		res.status(500).send(`Erro ao buscar cidade: ${error}`);
	}
};

export const updateCidade = async (req, res) => {
	try {
		const update = await Cidade.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		}).populate("estado_id");
		if (!update) return res.status(404).send("Cidade não encontrada");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar cidade: ${error}`);
	}
};

export const deleteCidade = async (req, res) => {
	try {
		const deleted = await Cidade.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Cidade não encontrada");
		res
			.status(200)
			.json({ message: "Cidade deletada com sucesso", deletedCidade: deleted });
	} catch (error) {
		res.status(500).send(`Erro ao deletar cidade: ${error}`);
	}
};
