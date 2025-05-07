import mongoose from "mongoose";

// Define o schema dos livros com validações e restrições básicas
const livrosSchema = new mongoose.Schema(
	{
		titulo: {
			type: String,
			required: true, // Campo obrigatório
			maxlength: 255, // Limite de caracteres
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
		timestamps: true, // Cria campos createdAt e updatedAt automaticamente
	}
);

// Cria o modelo Livro baseado no schema acima
const Livro = mongoose.model("Livro", livrosSchema);

// Exporta o modelo para ser usado nos controllers
export default Livro;
