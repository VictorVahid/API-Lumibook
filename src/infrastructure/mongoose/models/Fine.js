const mongoose = require("mongoose");

const FineSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  status: { type: String, enum: ["pendente", "paga"], default: "pendente" },
  data: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Fine", FineSchema); 