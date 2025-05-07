import Autor from "../db/schemas/autores.js";

export const createAutor = async (req, res) => {
	try {
		const newAutor = await Autor.create(req.body);
		res.status(201).json(newAutor);
	} catch (error) {
		res.status(500).send(`Erro ao criar autor: ${error}`);
	}
};

export const getAllAutores = async (req, res) => {
	try {
		const autoresAll = await Autor.find();
		res.json(autoresAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar autores: ${error}`);
	}
};

export const getAutorById = async (req, res) => {
	try {
		const autor = await Autor.findById(req.params.id);
		if (!autor) return res.status(404).send("Autor não encontrado");
		res.json(autor);
	} catch (error) {
		res.status(500).send(`Erro ao buscar autor: ${error}`);
	}
};

export const updateAutor = async (req, res) => {
	try {
		const update = await Autor.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!update) return res.status(404).send("Autor não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar autor: ${error}`);
	}
};

export const deleteAutor = async (req, res) => {
	try {
		const deleted = await Autor.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Autor não encontrado");
		res
			.status(200)
			.json({ message: "Autor deletado com sucesso", deletedAutor: deleted });
	} catch (error) {
		res.status(500).send(`Erro ao deletar autor: ${error}`);
	}
};
