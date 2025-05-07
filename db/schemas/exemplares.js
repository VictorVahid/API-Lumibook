import mongoose from "mongoose";

const exemplaresSchema = new mongoose.Schema(
	{
		livro_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Livro",
			required: true,
		},
		codigo_barras: {
			type: String,
			required: true,
			unique: true,
		},
		status: {
			type: String,
			required: true,
			maxlength: 20,
			default: "Disponível",
		},
	},
	{
		timestamps: true,
	}
);

const Exemplar = mongoose.model("Exemplar", exemplaresSchema);

export default Exemplar;
