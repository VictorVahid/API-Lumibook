const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  livro: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tituloLivro: { type: String, required: true },
  dataEmprestimo: { type: Date, required: true, default: Date.now },
  dataPrevistaDevolucao: { type: Date, required: true },
  dataDevolucao: { type: Date },
  status: { type: String, enum: ["ativo", "devolvido", "atrasado"], default: "ativo" },
  renovacoes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Loan", LoanSchema); 