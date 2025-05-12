const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		author: { type: String, required: true }, // <— string, p/ passar o teste
		price: { type: Number, required: true },
		stock: { type: Number, default: 0 },
		genero: { type: String },
		sinopse: { type: String },
		paginas: { type: Number },
	},
	{ collection: "livros" }
);

module.exports = mongoose.model("Book", BookSchema);
