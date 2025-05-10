import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema(
	{
		nome: { type: String, required: true, maxlength: 255 },
		email: { type: String, required: true, unique: true, maxlength: 255 },
		senha: { type: String, required: true, select: false },
		telefone: {
			ddd: { type: String, required: true, maxlength: 3 },
			numero: { type: String, required: true, maxlength: 10 },
		},
		endereco: {
			rua: { type: String, required: true, maxlength: 255 },
			numero: { type: String, required: true, maxlength: 10 },
			complemento: { type: String, maxlength: 100 },
			bairro: { type: String, required: true, maxlength: 100 },
			cidade: { type: String, required: true, maxlength: 100 },
			estado: { type: String, required: true, maxlength: 100 },
			pais: { type: String, required: true, maxlength: 100 },
			cep: { type: String, required: true, maxlength: 20 },
		},
		role: {
			type: String,
			enum: ["usuario", "funcionario", "admin"],
			default: "usuario",
			required: true,
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
		},
	},
	{ timestamps: true }
);

usuarioSchema.pre("save", async function (next) {
	if (!this.isModified("senha")) return next();
	try {
		const salt = await bcrypt.genSalt(10);
		this.senha = await bcrypt.hash(this.senha, salt);
		next();
	} catch (err) {
		next(err);
	}
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;

