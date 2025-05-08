import Multa from "../db/schemas/multas.js";

export const createMulta = async (req, res) => {
	try {
		const novaMulta = new Multa(req.body);
		const multaSalva = await novaMulta.save();
		res.status(201).json(multaSalva);
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const getAllMultas = async (req, res) => {
	try {
		const multas = await Multa.find()
			.populate("emprestimo_id")
			.populate("usuario_id");
		res.json(multas);
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const getMultaById = async (req, res) => {
	try {
		const multa = await Multa.findById(req.params.id)
			.populate("emprestimo_id")
			.populate("usuario_id");
		if (multa) {
			res.json(multa);
		} else {
			res.status(404).json({ mensagem: "Multa não encontrada" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const updateMulta = async (req, res) => {
	try {
		const multaAtualizada = await Multa.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (multaAtualizada) {
			res.json(multaAtualizada);
		} else {
			res.status(404).json({ mensagem: "Multa não encontrada" });
		}
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const deleteMulta = async (req, res) => {
	try {
		const multaDeletada = await Multa.findByIdAndDelete(req.params.id);
		if (multaDeletada) {
			res.status(204).send();
		} else {
			res.status(404).json({ mensagem: "Multa não encontrada" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};
