import mongoose from "mongoose";

// Define o schema dos livros com validações e restrições básicas
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
	},
	{
		timestamps: true,
	}
);

const Livro = mongoose.model("Livro", livrosSchema);

export default Livro;
