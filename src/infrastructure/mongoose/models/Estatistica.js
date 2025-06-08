const mongoose = require("mongoose");

const EstatisticaSchema = new mongoose.Schema({
	usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
	valores: {
		livrosLidos: { type: Number, default: 0 },
		reservasRealizadas: { type: Number, default: 0 },
		atrasos: { type: Number, default: 0 },
	},
});

module.exports = mongoose.model("Estatistica", EstatisticaSchema); 