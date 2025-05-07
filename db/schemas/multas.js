import mongoose from "mongoose";

const multasSchema = new mongoose.Schema(
	{
		emprestimo_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Emprestimo",
			required: true,
		},
		usuario_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Usuario",
			required: true,
		},
		valor: {
			type: Number,
			required: true,
		},
		data_vencimento: {
			type: Date,
			required: true,
		},
		data_pagamento: {
			type: Date,
		},
		status: {
			type: String,
			enum: ["Pendente", "Paga", "Vencida"],
			default: "Pendente",
			required: true,
		},
		descricao: {
			type: String,
			maxlength: 255,
		},
	},
	{
		timestamps: true,
	}
);

const Multa = mongoose.model("Multa", multasSchema);

export default Multa;
