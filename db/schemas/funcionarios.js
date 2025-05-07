import mongoose from "mongoose";

const funcionariosSchema = new mongoose.Schema(
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
		cargo: {
			type: String,
			maxlength: 100,
		},
		ativo: {
			type: Boolean,
			default: true,
		},
		perfil_acesso_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "PerfilAcesso",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Funcionario = mongoose.model("Funcionario", funcionariosSchema);

export default Funcionario;
