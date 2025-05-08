import Autor from "../db/schemas/autores.js";

export const createAutor = async (req, res) => {
	try {
		const novoAutor = new Autor(req.body);
		const autorSalvo = await novoAutor.save();
		res.status(201).json(autorSalvo);
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const getAllAutores = async (req, res) => {
	try {
		const autores = await Autor.find();
		res.json(autores);
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const getAutorById = async (req, res) => {
	try {
		const autor = await Autor.findById(req.params.id);
		if (autor) {
			res.json(autor);
		} else {
			res.status(404).json({ mensagem: "Autor não encontrado" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const updateAutor = async (req, res) => {
	try {
		const autorAtualizado = await Autor.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (autorAtualizado) {
			res.json(autorAtualizado);
		} else {
			res.status(404).json({ mensagem: "Autor não encontrado" });
		}
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const deleteAutor = async (req, res) => {
	try {
		const autorDeletado = await Autor.findByIdAndDelete(req.params.id);
		if (autorDeletado) {
			res.status(204).send();
		} else {
			res.status(404).json({ mensagem: "Autor não encontrado" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};
