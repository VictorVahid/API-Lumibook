import mongoose from "mongoose";
const filaSchema = new mongoose.Schema(
	{
		usuario_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Usuario",
			required: true,
		},
		exemplar_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Exemplar",
			required: true,
		},
		data_solicitacao: { type: Date, default: Date.now },
		tipo: {
			type: String,
			enum: ["reserva", "emprestimo"],
			required: true,
			default: "reserva",
		},
		status: {
			type: String,
			enum: [
				"pendente",
				"disponivel_retirada",
				"emprestado",
				"devolvido",
				"cancelado",
			],
			default: "pendente",
			required: true,
		},
		data_emprestimo: { type: Date },
		data_devolucao_prevista: { type: Date },
		data_devolucao_efetiva: { type: Date },
		// Outros campos relevantes, como observações, etc.
	},
	{ timestamps: true }
);

const SolicitacaoLivro = mongoose.model(
	"SolicitacaoLivro",
	filaSchema
);
export default filaSchema;
