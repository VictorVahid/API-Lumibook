import mongoose from "mongoose";

const auditoriaSchema = new mongoose.Schema(
	{
		usuario_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Usuario", 
		},
		tipo_acao: {
			type: String,
			required: true,
			maxlength: 50,
		},
		descricao: {
			type: String,
			maxlength: 255,
		},
		detalhes: {
			type: mongoose.Schema.Types.Mixed, 
		},
		data_hora: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const Auditoria = mongoose.model("Auditoria", auditoriaSchema);

export default Auditoria;
