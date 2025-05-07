import LivroAutor from "../db/schemas/livros_autores.js";

export const createLivroAutor = async (req, res) => {
	try {
		const newLivroAutor = await LivroAutor.create(req.body);
		res.status(201).json(newLivroAutor);
	} catch (error) {
		res.status(500).send(`Erro ao criar relacionamento livro-autor: ${error}`);
	}
};

export const getAllLivrosAutores = async (req, res) => {
	try {
		const livrosAutoresAll = await LivroAutor.find()
			.populate("livro_id")
			.populate("autor_id");
		res.json(livrosAutoresAll);
	} catch (error) {
		res
			.status(500)
			.send(`Erro ao buscar relacionamentos livro-autor: ${error}`);
	}
};

export const getLivroAutorById = async (req, res) => {
	try {
		const livroAutor = await LivroAutor.findById(req.params.id)
			.populate("livro_id")
			.populate("autor_id");
		if (!livroAutor)
			return res.status(404).send("Relacionamento livro-autor não encontrado");
		res.json(livroAutor);
	} catch (error) {
		res.status(500).send(`Erro ao buscar relacionamento livro-autor: ${error}`);
	}
};

export const deleteLivroAutor = async (req, res) => {
	try {
		const deleted = await LivroAutor.findByIdAndDelete(req.params.id);
		if (!deleted)
			return res.status(404).send("Relacionamento livro-autor não encontrado");
		res
			.status(200)
			.json({
				message: "Relacionamento livro-autor deletado com sucesso",
				deletedLivroAutor: deleted,
			});
	} catch (error) {
		res
			.status(500)
			.send(`Erro ao deletar relacionamento livro-autor: ${error}`);
	}
};
