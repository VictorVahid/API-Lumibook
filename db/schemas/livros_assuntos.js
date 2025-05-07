import mongoose from "mongoose";

const livrosAssuntosSchema = new mongoose.Schema(
	{
		livro_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Livro",
			required: true,
		},
		assunto_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Assunto",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const LivroAssunto = mongoose.model("LivroAssunto", livrosAssuntosSchema);

export default LivroAssunto;
