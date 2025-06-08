const express = require("express");
const obrasRouter = express.Router();
const BookModel = require("../../infrastructure/mongoose/models/Book");

// Verifica se já existe livro com título ou ISBN igual
obrasRouter.get("/obras/verificar-duplicata", async (req, res) => {
	try {
		const { titulo, isbn } = req.query;
		const query = {};

		if (titulo) query.title = { $regex: new RegExp(titulo, "i") };
		if (isbn) query.isbn = isbn;

		const livro = await BookModel.findOne(query).lean();

		res.json({
			success: true,
			data: {
				duplicado: !!livro,
				livro: livro
					? { id: livro._id, titulo: livro.title, isbn: livro.isbn }
					: null,
			},
			error: null,
		});
	} catch (err) {
		res.status(500).json({ success: false, data: null, error: err.message });
	}
});

// TIPOS DE OBRA
obrasRouter.get("/obras/tipos", (req, res) => {
	const tipos = ["Livro", "Tese", "Artigo", "Revista", "Manual", "Relatório"];
	res.json({
		success: true,
		data: tipos,
	});
});

// CATEGORIAS DE OBRA
obrasRouter.get("/obras/categorias", (req, res) => {
	const categorias = [
		"Fantasia",
		"Ficção Científica",
		"Tecnologia",
		"História",
		"Romance",
		"Educação",
		"Psicologia",
		"Engenharia",
	];
	res.json({
		success: true,
		data: categorias,
	});
});
module.exports = obrasRouter;
