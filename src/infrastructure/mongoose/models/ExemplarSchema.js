const mongoose = require("mongoose");

const ExemplarSchema = new mongoose.Schema(
	{
		livroId: { type: mongoose.Types.ObjectId, ref: "Book", required: true },
		status: {
			type: String,
			required: true,
			enum: ["disponível", "emprestado", "indisponível"],
		},
		localizacao: { type: String },
	},
	{ collection: "exemplares" }
);

module.exports = mongoose.model("Exemplar", ExemplarSchema);
