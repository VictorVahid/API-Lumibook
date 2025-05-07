import mongoose from "mongoose";

const generosSchema = new mongoose.Schema(
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

const Genero = mongoose.model("Genero", generosSchema);

export default Genero;
