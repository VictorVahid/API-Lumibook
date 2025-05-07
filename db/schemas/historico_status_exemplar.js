import mongoose from "mongoose";

const historicoStatusExemplarSchema = new mongoose.Schema(
	{
		exemplar_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Exemplar",
			required: true,
		},
		status: {
			type: String,
			required: true,
			maxlength: 20,
		},
		data_alteracao: {
			type: Date,
			default: Date.now,
		},
		funcionario_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Funcionario",
		},
	},
	{
		timestamps: true,
	}
);

const HistoricoStatusExemplar = mongoose.model(
	"HistoricoStatusExemplar",
	historicoStatusExemplarSchema
);

export default HistoricoStatusExemplar;
