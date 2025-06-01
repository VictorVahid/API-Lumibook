const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  livro: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tituloLivro: { type: String, required: true },
  dataReserva: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ["ativa", "cancelada", "expirada"], default: "ativa" }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", ReservationSchema); 