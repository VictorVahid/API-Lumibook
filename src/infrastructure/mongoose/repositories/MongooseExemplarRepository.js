const ExemplarRepository = require("../../../domain/repositories/ExemplarRepository");
const ExemplarModel = require("../models/ExemplarSchema");

class MongooseExemplarRepository extends ExemplarRepository {
	async create(exemplar) {
		const doc = await ExemplarModel.create(exemplar);
		return {
			id: doc._id,
			livroId: doc.livroId,
			status: doc.status,
			localizacao: doc.localizacao,
		};
	}

	async findByFilters({ livroId, status }) {
		const query = {};
		if (livroId) query.livroId = livroId;
		if (status) query.status = status;
		const docs = await ExemplarModel.find(query).exec();
		return docs.map((doc) => ({
			id: doc._id,
			livroId: doc.livroId,
			status: doc.status,
			localizacao: doc.localizacao,
		}));
	}

	async findById(id) {
		const doc = await ExemplarModel.findById(id).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			livroId: doc.livroId,
			status: doc.status,
			localizacao: doc.localizacao,
		};
	}

	async updateStatus(id, { status }) {
		const doc = await ExemplarModel.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			livroId: doc.livroId,
			status: doc.status,
			localizacao: doc.localizacao,
		};
	}

	async delete(id) {
		await ExemplarModel.findByIdAndDelete(id).exec();
	}
}

module.exports = MongooseExemplarRepository;
