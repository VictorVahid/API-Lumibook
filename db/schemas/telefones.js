import mongoose from "mongoose";

const telefonesSchema = new mongoose.Schema(
	{
		ddd: {
			type: String,
			required: true,
			maxlength: 3,
		},
		numero: {
			type: String,
			required: true,
			maxlength: 10,
		},
		tipo: {
			type: String,
			enum: ["Fixo", "Celular"],
			default: "Celular",
		},
	},
	{
		timestamps: true,
	}
);

const Telefone = mongoose.model("Telefone", telefonesSchema);

export default Telefone;
