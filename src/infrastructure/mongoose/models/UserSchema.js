const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		nome: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		senhaHash: { type: String, required: true },
		role: { type: String, default: "usuario" },
		ativo: { type: Boolean, default: true },
	},
	{ collection: "usuarios" }
);

module.exports = mongoose.model("User", UserSchema);
