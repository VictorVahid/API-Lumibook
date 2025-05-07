import mongoose from "mongoose";

const editorasSchema = new mongoose.Schema(
	{
		nome: {
			type: String,
			required: true,
			maxlength: 255,
		},
		cidade: {
			type: String,
			maxlength: 100,
		},
		estado: {
			type: String,
			maxlength: 50,
		},
		pais: {
			type: String,
			maxlength: 50,
		},
	},
	{
		timestamps: true,
	}
);

const Editora = mongoose.model("Editora", editorasSchema);

export default Editora;
