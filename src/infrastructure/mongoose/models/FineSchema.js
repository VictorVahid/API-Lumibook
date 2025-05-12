const mongoose = require("mongoose");

const FineSchema = new mongoose.Schema(
	{
		usuarioId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
		reservaId: {
			type: mongoose.Types.ObjectId,
			ref: "Reservation",
			required: true,
		},
		valor: { type: Number, required: true },
		status: { type: String, required: true, enum: ["pendente", "paga"] },
		dataGeracao: { type: Date, default: Date.now },
	},
	{ collection: "multas" }
);

module.exports = mongoose.model("Fine", FineSchema);
