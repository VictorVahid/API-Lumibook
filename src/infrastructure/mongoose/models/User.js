const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  matricula: { type: String, unique: true, sparse: true },
  papel: { type: String, enum: ["aluno", "professor", "admin"], required: true },
  avatar: { type: String },
  statusConta: { type: String, enum: ["ativa", "bloqueada"], default: "ativa" },
  membroDesde: { type: Date, default: Date.now },
  senha: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema); 