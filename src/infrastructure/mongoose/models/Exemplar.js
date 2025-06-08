const mongoose = require("mongoose");

const ExemplarSchema = new mongoose.Schema(
	{
		livro: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
			required: true,
		},
		status: {
			type: String,
			enum: ["disponível", "emprestado", "reservado", "danificado"],
			default: "disponível",
		},
		localizacao: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports =
	mongoose.models.Exemplar || mongoose.model("Exemplar", ExemplarSchema);
