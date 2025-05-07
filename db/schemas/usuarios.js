import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema(
	{
		nome_completo: {
			type: String,
			required: true,
			maxlength: 255,
		},
		email: {
			type: String,
			required: true,
			maxlength: 255,
			unique: true,
		},
		senha_hash: {
			type: String,
			required: true,
			maxlength: 255,
		},
		tipo_usuario: {
			type: String,
			required: true,
			maxlength: 20,
			default: "Comum",
		},
		ativo: {
			type: Boolean,
			default: true,
		},
		endereco_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Endereco",
		},
		telefone_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Telefone",
		},
	},
	{
		timestamps: true,
	}
);

const Usuario = mongoose.model("Usuario", usuariosSchema);

export default Usuario;
