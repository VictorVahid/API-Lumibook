import Livro from "../db/schemas/livros.js"; //Importa o model Livro.js dos schemas


export const createLivro = async (req, res) => {
	try {
		const newLivro = await Livro.create(req.body);
		res.status(201).json(newLivro); // 201: criado com sucesso
	} catch (error) {
		res.status(500).send(`Erro ao criar livro: ${error}`);
	}
};

export const getAllLivros = async (req, res) => {
	try {
		const livrosAll = await Livro.find();
		res.json(livrosAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar livros: ${error}`);
	}
};


export const getLivroById = async (req, res) => {
	try {
		const livro = await Livro.findById(req.params.id);
		if (!livro) return res.status(404).send("Livro não encontrado");
		res.json(livro);
	} catch (error) {
		res.status(500).send(`Erro ao buscar livro: ${error}`);
	}
};


export const updateLivro = async (req, res) => {
	try {
		const update = await Livro.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // Retorna o documento atualizado
		});
		if (!update) return res.status(404).send("Livro não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar livro: ${error}`);
	}
};


export const deleteLivro = async (req, res) => {
	try {
		const deleted = await Livro.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Livro não encontrado");
		res.status(200).json({
			message: "Livro deletado com sucesso",
			deletedLivro: deleted,
		});
	} catch (error) {
		res.status(500).send(`Erro ao deletar livro: ${error}`);
	}
};
