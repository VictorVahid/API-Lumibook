import mongoose from "mongoose";

const perfisPermissoesSchema = new mongoose.Schema(
	{
		perfil_acesso_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "PerfilAcesso",
			required: true,
		},
		permissao_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Permissao",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const PerfilPermissao = mongoose.model(
	"PerfilPermissao",
	perfisPermissoesSchema
);

export default PerfilPermissao;
