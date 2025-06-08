const mongoose = require("mongoose");

const PublisherSchema = new mongoose.Schema(
	{
		nome: { type: String, required: true },
		endereco: { type: String },
		contato: { type: String },
	},
	{ collection: "editoras" }
);

module.exports = mongoose.model("Publisher", PublisherSchema);

module.exports =
	mongoose.models.Publisher || mongoose.model("Publisher", PublisherSchema);
