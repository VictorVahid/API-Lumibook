const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
	usuarioId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
	acao: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
	detalhes: { type: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model("AuditLog", AuditLogSchema);
