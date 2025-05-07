import LivroAssunto from "../db/schemas/livros_assuntos.js";

export const createLivroAssunto = async (req, res) => {
	try {
		const newLivroAssunto = await LivroAssunto.create(req.body);
		res.status(201).json(newLivroAssunto);
	} catch (error) {
		res
			.status(500)
			.send(`Erro ao criar relacionamento livro-assunto: ${error}`);
	}
};

export const getAllLivrosAssuntos = async (req, res) => {
	try {
		const livrosAssuntosAll = await LivroAssunto.find()
			.populate("livro_id")
			.populate("assunto_id");
		res.json(livrosAssuntosAll);
	} catch (error) {
		res
			.status(500)
			.send(`Erro ao buscar relacionamentos livro-assunto: ${error}`);
	}
};

export const getLivroAssuntoById = async (req, res) => {
	try {
		const livroAssunto = await LivroAssunto.findById(req.params.id)
			.populate("livro_id")
			.populate("assunto_id");
		if (!livroAssunto)
			return res
				.status(404)
				.send("Relacionamento livro-assunto não encontrado");
		res.json(livroAssunto);
	} catch (error) {
		res
			.status(500)
			.send(`Erro ao buscar relacionamento livro-assunto: ${error}`);
	}
};

export const deleteLivroAssunto = async (req, res) => {
	try {
		const deleted = await LivroAssunto.findByIdAndDelete(req.params.id);
		if (!deleted)
			return res
				.status(404)
				.send("Relacionamento livro-assunto não encontrado");
		res
			.status(200)
			.json({
				message: "Relacionamento livro-assunto deletado com sucesso",
				deletedLivroAssunto: deleted,
			});
	} catch (error) {
		res
			.status(500)
			.send(`Erro ao deletar relacionamento livro-assunto: ${error}`);
	}
};
