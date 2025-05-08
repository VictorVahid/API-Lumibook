import Editora from "../db/schemas/editoras.js";

export const createEditora = async (req, res) => {
	try {
		const novaEditora = new Editora(req.body);
		const editoraSalva = await novaEditora.save();
		res.status(201).json(editoraSalva);
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const getAllEditoras = async (req, res) => {
	try {
		const editoras = await Editora.find();
		res.json(editoras);
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const getEditoraById = async (req, res) => {
	try {
		const editora = await Editora.findById(req.params.id);
		if (editora) {
			res.json(editora);
		} else {
			res.status(404).json({ mensagem: "Editora não encontrada" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const updateEditora = async (req, res) => {
	try {
		const editoraAtualizada = await Editora.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (editoraAtualizada) {
			res.json(editoraAtualizada);
		} else {
			res.status(404).json({ mensagem: "Editora não encontrada" });
		}
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const deleteEditora = async (req, res) => {
	try {
		const editoraDeletada = await Editora.findByIdAndDelete(req.params.id);
		if (editoraDeletada) {
			res.status(204).send();
		} else {
			res.status(404).json({ mensagem: "Editora não encontrada" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};
