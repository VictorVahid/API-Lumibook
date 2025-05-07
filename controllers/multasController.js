import Multa from "../db/schemas/multas.js";

export const createMulta = async (req, res) => {
	try {
		const newMulta = await Multa.create(req.body);
		res.status(201).json(newMulta);
	} catch (error) {
		res.status(500).send(`Erro ao criar multa: ${error}`);
	}
};

export const getAllMultas = async (req, res) => {
	try {
		const multasAll = await Multa.find()
			.populate("emprestimo_id")
			.populate("usuario_id");
		res.json(multasAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar multas: ${error}`);
	}
};

export const getMultaById = async (req, res) => {
	try {
		const multa = await Multa.findById(req.params.id)
			.populate("emprestimo_id")
			.populate("usuario_id");
		if (!multa) return res.status(404).send("Multa não encontrada");
		res.json(multa);
	} catch (error) {
		res.status(500).send(`Erro ao buscar multa: ${error}`);
	}
};

export const updateMulta = async (req, res) => {
	try {
		const update = await Multa.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
			.populate("emprestimo_id")
			.populate("usuario_id");
		if (!update) return res.status(404).send("Multa não encontrada");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar multa: ${error}`);
	}
};

export const deleteMulta = async (req, res) => {
	try {
		const deleted = await Multa.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Multa não encontrada");
		res
			.status(200)
			.json({ message: "Multa deletada com sucesso", deletedMulta: deleted });
	} catch (error) {
		res.status(500).send(`Erro ao deletar multa: ${error}`);
	}
};
