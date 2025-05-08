import mongoose from "mongoose";

const emprestimoSchema = new mongoose.Schema(
	{
		usuario_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Usuario",
			required: true,
		},
		data_emprestimo: {
			type: Date,
			default: Date.now,
		},
		data_prevista_devolucao: {
			type: Date,
			required: true,
		},
		itens: [
			{
				exemplar_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Exemplar",
					required: true,
				},
				data_devolucao_item: Date,
			},
		],
	},
	{ timestamps: true }
);

const Emprestimo = mongoose.model("Emprestimo", emprestimoSchema);
export default Emprestimo;
