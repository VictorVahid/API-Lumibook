import Exemplar from "../db/schemas/exemplares.js";

export const createExemplar = async (req, res) => {
	try {
		const novoExemplar = new Exemplar(req.body);
		const exemplarSalvo = await novoExemplar.save();
		res.status(201).json(exemplarSalvo);
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const getAllExemplares = async (req, res) => {
	try {
		const exemplares = await Exemplar.find().populate("livro_id");
		res.json(exemplares);
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const getExemplarById = async (req, res) => {
	try {
		const exemplar = await Exemplar.findById(req.params.id).populate(
			"livro_id"
		);
		if (exemplar) {
			res.json(exemplar);
		} else {
			res.status(404).json({ mensagem: "Exemplar não encontrado" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const updateExemplar = async (req, res) => {
	try {
		const exemplarAtualizado = await Exemplar.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (exemplarAtualizado) {
			res.json(exemplarAtualizado);
		} else {
			res.status(404).json({ mensagem: "Exemplar não encontrado" });
		}
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const deleteExemplar = async (req, res) => {
	try {
		const exemplarDeletado = await Exemplar.findByIdAndDelete(req.params.id);
		if (exemplarDeletado) {
			res.status(204).send();
		} else {
			res.status(404).json({ mensagem: "Exemplar não encontrado" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};
