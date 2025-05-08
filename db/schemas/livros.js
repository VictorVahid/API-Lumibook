import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
	{
		titulo: { type: String, required: true, maxlength: 255 },
		isbn: { type: String, unique: true },
		categoria: { type: String },
		editora_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Editora",
			required: true,
		},
		autores: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Autor",
				required: true,
			},
		],
	},
	{ timestamps: true }
);

const Livro = mongoose.model("Livro", livroSchema);
export default Livro;
