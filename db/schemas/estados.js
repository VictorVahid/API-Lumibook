import mongoose from "mongoose";

const estadosSchema = new mongoose.Schema(
	{
		nome: {
			type: String,
			required: true,
			maxlength: 100,
		},
		uf: {
			type: String,
			required: true,
			maxlength: 2,
			unique: true,
		},
		pais_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Pais",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Estado = mongoose.model("Estado", estadosSchema);

export default Estado;
