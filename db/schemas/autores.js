import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
	{
		nome: { type: String, required: true, maxlength: 255 },
		biografia: { type: String },
	},
	{ timestamps: true }
);

const Autor = mongoose.model("Autor", autorSchema);
export default Autor;
