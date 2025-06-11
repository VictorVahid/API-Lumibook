const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		authors: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
		],
		price: { type: Number },
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
	{ collection: "livros", timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);

module.exports = mongoose.models.Book || mongoose.model("Book", BookSchema);
