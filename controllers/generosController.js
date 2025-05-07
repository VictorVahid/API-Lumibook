import Genero from "../db/schemas/generos.js";

export const createGenero = async (req, res) => {
	try {
		const newGenero = await Genero.create(req.body);
		res.status(201).json(newGenero);
	} catch (error) {
		res.status(500).send(`Erro ao criar gênero: ${error}`);
	}
};

export const getAllGeneros = async (req, res) => {
	try {
		const generosAll = await Genero.find();
		res.json(generosAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar gêneros: ${error}`);
	}
};

export const getGeneroById = async (req, res) => {
	try {
		const genero = await Genero.findById(req.params.id);
		if (!genero) return res.status(404).send("Gênero não encontrado");
		res.json(genero);
	} catch (error) {
		res.status(500).send(`Erro ao buscar gênero: ${error}`);
	}
};

export const updateGenero = async (req, res) => {
	try {
		const update = await Genero.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!update) return res.status(404).send("Gênero não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar gênero: ${error}`);
	}
};

export const deleteGenero = async (req, res) => {
	try {
		const deleted = await Genero.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Gênero não encontrado");
		res
			.status(200)
			.json({ message: "Gênero deletado com sucesso", deletedGenero: deleted });
	} catch (error) {
		res.status(500).send(`Erro ao deletar gênero: ${error}`);
	}
};
