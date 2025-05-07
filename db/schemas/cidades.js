import mongoose from "mongoose";

const cidadesSchema = new mongoose.Schema(
	{
		nome: {
			type: String,
			required: true,
			maxlength: 100,
		},
		estado_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Estado",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Cidade = mongoose.model("Cidade", cidadesSchema);

export default Cidade;
