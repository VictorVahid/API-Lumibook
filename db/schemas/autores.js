import mongoose from "mongoose";

const autoresSchema = new mongoose.Schema(
	{
		nome: {
			type: String,
			required: true,
			maxlength: 255,
		},
		data_nascimento: {
			type: Date,
		},
		nacionalidade: {
			type: String,
			maxlength: 100,
		},
	},
	{
		timestamps: true,
	}
);

const Autor = mongoose.model("Autor", autoresSchema);

export default Autor;
