import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema(
	{
		nome: {
			type: String,
			required: true,
			maxlength: 255,
		},
		cnpj: {
			type: String,
			required: true,
			unique: true,
			maxlength: 20,
		},
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
	},
	{
		timestamps: true,
	}
);

const Editora = mongoose.model("Editora", editoraSchema);

export default Editora;
