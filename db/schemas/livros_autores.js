import mongoose from "mongoose";

const livrosAutoresSchema = new mongoose.Schema(
	{
		livro_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Livro",
			required: true,
		},
		autor_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Autor",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const LivroAutor = mongoose.model("LivroAutor", livrosAutoresSchema);

export default LivroAutor;
