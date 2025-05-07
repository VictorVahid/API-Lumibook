import mongoose from "mongoose";

const emprestimosSchema = new mongoose.Schema(
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
		data_devolucao_prevista: {
			type: Date,
			required: true,
		},
		data_devolucao: {
			type: Date,
		},
		status: {
			type: String,
			required: true,
			maxlength: 20,
			default: "Em andamento",
		},
		observacoes: {
			type: String,
			maxlength: 255,
		},
		numero_renovacoes: {
			type: Number,
			default: 0,
		},
		datas_devolucao: [Date], 
	},
	{
		timestamps: true,
	}
);

const Emprestimo = mongoose.model("Emprestimo", emprestimosSchema);

export default Emprestimo;
