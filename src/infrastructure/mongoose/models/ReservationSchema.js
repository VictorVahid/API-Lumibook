const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
	{
		usuarioId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
		livroId: { type: mongoose.Types.ObjectId, ref: "Book", required: true },
		status: {
			type: String,
			required: true,
			enum: ["pendente", "atendida", "cancelada"],
		},
		dataReserva: { type: Date, default: Date.now },
	},
	{ collection: "reservas" }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
