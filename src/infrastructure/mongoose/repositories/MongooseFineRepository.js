const FineRepository = require("../../../domain/repositories/FineRepository");
const FineModel = require("../models/FineSchema");
const mongoose = require("mongoose");

class MongooseFineRepository extends FineRepository {
	async create(fine) {
		const doc = await FineModel.create(fine);
		return {
			id: doc._id,
			usuarioId: doc.usuarioId,
			reservaId: doc.reservaId,
			valor: doc.valor,
			status: doc.status,
			dataGeracao: doc.dataGeracao,
		};
	}

	async findByFilters({ usuarioId, status }) {
		const query = {};
		if (usuarioId) query.usuarioId = usuarioId;
		if (status) query.status = status;
		const docs = await FineModel.find(query).exec();
		return docs.map((doc) => ({
			id: doc._id,
			usuarioId: doc.usuarioId,
			reservaId: doc.reservaId,
			valor: doc.valor,
			status: doc.status,
			dataGeracao: doc.dataGeracao,
		}));
	}

	async findById(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		const doc = await FineModel.findById(id).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			usuarioId: doc.usuarioId,
			reservaId: doc.reservaId,
			valor: doc.valor,
			status: doc.status,
			dataGeracao: doc.dataGeracao,
		};
	}

	async updateStatus(id, { status }) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		const doc = await FineModel.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			usuarioId: doc.usuarioId,
			reservaId: doc.reservaId,
			valor: doc.valor,
			status: doc.status,
			dataGeracao: doc.dataGeracao,
		};
	}
}

module.exports = MongooseFineRepository;
