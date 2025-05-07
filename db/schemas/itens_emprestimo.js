import mongoose from "mongoose";

const itensEmprestimoSchema = new mongoose.Schema(
	{
		emprestimo_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Emprestimo",
			required: true,
		},
		exemplar_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Exemplar",
			required: true,
		},
		data_devolucao_item: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const ItemEmprestimo = mongoose.model("ItemEmprestimo", itensEmprestimoSchema);

export default ItemEmprestimo;
