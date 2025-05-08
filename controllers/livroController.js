import Livro from "../db/schemas/livros.js";

export const createLivro = async (req, res) => {
	try {
		const novoLivro = new Livro(req.body);
		const livroSalvo = await novoLivro.save();
		res.status(201).json(livroSalvo);
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const getAllLivros = async (req, res) => {
	try {
		const livros = await Livro.find()
			.populate("editora_id")
			.populate("autores"); // Popula os campos de relacionamento
		res.json(livros);
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const getLivroById = async (req, res) => {
	try {
		const livro = await Livro.findById(req.params.id)
			.populate("editora_id")
			.populate("autores");
		if (livro) {
			res.json(livro);
		} else {
			res.status(404).json({ mensagem: "Livro não encontrado" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const updateLivro = async (req, res) => {
	try {
		const livroAtualizado = await Livro.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (livroAtualizado) {
			res.json(livroAtualizado);
		} else {
			res.status(404).json({ mensagem: "Livro não encontrado" });
		}
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const deleteLivro = async (req, res) => {
	try {
		const livroDeletado = await Livro.findByIdAndDelete(req.params.id);
		if (livroDeletado) {
			res.status(204).send();
		} else {
			res.status(404).json({ mensagem: "Livro não encontrado" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};
