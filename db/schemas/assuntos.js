import mongoose from "mongoose";

const assuntosSchema = new mongoose.Schema(
	{
		nome: {
			type: String,
			required: true,
			maxlength: 100,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

const Assunto = mongoose.model("Assunto", assuntosSchema);

export default Assunto;
