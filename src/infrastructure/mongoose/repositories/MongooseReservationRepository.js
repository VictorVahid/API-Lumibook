const ReservationRepository = require("../../../domain/repositories/ReservationRepository");
const ReservationModel = require("../models/ReservationSchema");
const mongoose = require("mongoose");

class MongooseReservationRepository extends ReservationRepository {
	async create(reservation) {
		const doc = await ReservationModel.create(reservation);
		return {
			id: doc._id,
			usuarioId: doc.usuarioId,
			livroId: doc.livroId,
			status: doc.status,
			dataReserva: doc.dataReserva,
		};
	}

	async findByFilters({ usuarioId, livroId, status }) {
		const query = {};
		if (usuarioId) query.usuarioId = usuarioId;
		if (livroId) query.livroId = livroId;
		if (status) query.status = status;
		const docs = await ReservationModel.find(query).exec();
		return docs.map((doc) => ({
			id: doc._id,
			usuarioId: doc.usuarioId,
			livroId: doc.livroId,
			status: doc.status,
			dataReserva: doc.dataReserva,
		}));
	}

	async findById(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		const doc = await ReservationModel.findById(id).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			usuarioId: doc.usuarioId,
			livroId: doc.livroId,
			status: doc.status,
			dataReserva: doc.dataReserva,
		};
	}

	async updateStatus(id, { status }) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		const doc = await ReservationModel.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			usuarioId: doc.usuarioId,
			livroId: doc.livroId,
			status: doc.status,
			dataReserva: doc.dataReserva,
		};
	}

	async delete(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		await ReservationModel.findByIdAndDelete(id).exec();
	}
}

module.exports = MongooseReservationRepository;
