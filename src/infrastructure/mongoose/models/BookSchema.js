const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		author: { type: String, required: true },
		price: { type: Number, required: true },
		stock: { type: Number, default: 0 },
		genero: { type: String },
		ano: { type: Number },
		tipo: { type: String },
		categoria: { type: String },
		edicao: { type: String },
		idioma: { type: String },
		isbn: { type: String },
		localizacao: { type: String },
		sinopse: { type: String },
		paginas: { type: Number },
		resumo: { type: String },
		editora: { type: String },
		exemplares: { type: [Object], default: [] },
		disponivel: { type: Boolean, default: true },
	},
	{ collection: "livros" }
);

module.exports = mongoose.model("Book", BookSchema);
