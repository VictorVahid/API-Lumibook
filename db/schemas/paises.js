import mongoose from "mongoose";

const paisesSchema = new mongoose.Schema(
	{
		nome: {
			type: String,
			required: true,
			maxlength: 100,
			unique: true,
		},
		codigo: {
			type: String,
			maxlength: 3,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

const Pais = mongoose.model("Pais", paisesSchema);

export default Pais;
