const AuditLogRepository = require("../../../domain/repositories/AuditLogRepository");
const AuditLogModel = require("../models/AuditLog");
const mongoose = require("mongoose");

class MongooseAuditLogRepository extends AuditLogRepository {
	async findByFilters({ dataInicio, dataFim, usuario, acao }) {
		const query = {};
		if (dataInicio || dataFim) query.timestamp = {};
		if (dataInicio) query.timestamp.$gte = new Date(dataInicio);
		if (dataFim) query.timestamp.$lte = new Date(dataFim);
		if (usuario) query.usuarioId = usuario;
		if (acao) query.acao = acao;
		const docs = await AuditLogModel.find(query).exec();
		return docs.map((doc) => ({
			id: doc._id,
			usuarioId: doc.usuarioId,
			acao: doc.acao,
			timestamp: doc.timestamp,
			detalhes: doc.detalhes,
		}));
	}

	async findById(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		const doc = await AuditLogModel.findById(id).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			usuarioId: doc.usuarioId,
			acao: doc.acao,
			timestamp: doc.timestamp,
			detalhes: doc.detalhes,
		};
	}

	async delete(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		await AuditLogModel.findByIdAndDelete(id).exec();
	}
}

module.exports = MongooseAuditLogRepository;
