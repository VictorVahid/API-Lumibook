import mongoose from "mongoose";

const reservasSchema = new mongoose.Schema(
	{
		exemplar_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Exemplar",
			required: true,
		},
		usuario_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Usuario",
			required: true,
		},
		data_reserva: {
			type: Date,
			default: Date.now,
		},
		notificado: {
			type: Boolean,
			default: false,
		},
		expiracao: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Reserva = mongoose.model("Reserva", reservasSchema);

export default Reserva;
