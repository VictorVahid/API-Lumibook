import mongoose from "mongoose";

const permissoesSchema = new mongoose.Schema(
	{
		nome: {
			type: String,
			required: true,
			maxlength: 100,
			unique: true,
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

const Permissao = mongoose.model("Permissao", permissoesSchema);

export default Permissao;
