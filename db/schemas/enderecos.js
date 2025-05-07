import mongoose from "mongoose";

const enderecosSchema = new mongoose.Schema(
	{
		rua: {
			type: String,
			required: true,
			maxlength: 255,
		},
		numero: {
			type: String,
			maxlength: 10,
		},
		complemento: {
			type: String,
			maxlength: 100,
		},
		bairro: {
			type: String,
			maxlength: 100,
		},
		cidade_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Cidade",
			required: true,
		},
		cep: {
			type: String,
			maxlength: 10,
		},
	},
	{
		timestamps: true,
	}
);

const Endereco = mongoose.model("Endereco", enderecosSchema);

export default Endereco;
