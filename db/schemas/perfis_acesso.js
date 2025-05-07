import mongoose from "mongoose";

const perfisAcessoSchema = new mongoose.Schema(
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

const PerfilAcesso = mongoose.model("PerfilAcesso", perfisAcessoSchema);

export default PerfilAcesso;
