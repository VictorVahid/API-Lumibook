import mongoose from "mongoose";

const livrosSchema = new mongoose.Schema(
	{
		titulo: {
			type: String,
			required: true,
			maxlength: 255,
		},
		autor: {
			type: String,
			required: true,
			maxlength: 255,
		},
		isbn: {
			type: String,
			required: true,
			maxlength: 20,
		},
		assunto: {
			type: String,
			required: true,
			maxlength: 255,
		},
		genero: {
			type: String,
			required: true,
			maxlength: 100,
		},
	},
	{
		timestamps: true,
	}
);

const Livro = mongoose.model("Livro", livrosSchema);


export default Livro;
