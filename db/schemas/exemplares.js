import mongoose from "mongoose";

const exemplarSchema = new mongoose.Schema(
	{
		livro_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Livro",
			required: true,
		},
		codigo_exemplar: { type: String, required: true, unique: true },
		situacao: {
			type: String,
			enum: ["disponivel", "emprestado", "reservado", "indisponivel"],
			default: "disponivel",
		},
	},
	{ timestamps: true }
);

const Exemplar = mongoose.model("Exemplar", exemplarSchema);
export default Exemplar;
