const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
	nome: { type: String, required: true },
	bio: { type: String },
	nascimento: { type: Date },
});

module.exports = mongoose.model("Author", AuthorSchema);
