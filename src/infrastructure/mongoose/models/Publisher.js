const mongoose = require("mongoose");

const PublisherSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String },
  contato: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Publisher", PublisherSchema); 