const PublisherRepository = require("../../../domain/repositories/PublisherRepository");
const PublisherModel = require("../models/PublisherSchema");

class MongoosePublisherRepository extends PublisherRepository {
	async create(publisher) {
		const doc = await PublisherModel.create(publisher);
		return {
			id: doc._id,
			nome: doc.nome,
			endereco: doc.endereco,
			contato: doc.contato,
		};
	}

	async findAll() {
		const docs = await PublisherModel.find().exec();
		return docs.map((doc) => ({
			id: doc._id,
			nome: doc.nome,
			endereco: doc.endereco,
			contato: doc.contato,
		}));
	}

	async findById(id) {
		const doc = await PublisherModel.findById(id).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			nome: doc.nome,
			endereco: doc.endereco,
			contato: doc.contato,
		};
	}

	async update(id, data) {
		const doc = await PublisherModel.findByIdAndUpdate(id, data, {
			new: true,
		}).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			nome: doc.nome,
			endereco: doc.endereco,
			contato: doc.contato,
		};
	}

	async delete(id) {
		await PublisherModel.findByIdAndDelete(id).exec();
	}
}

module.exports = MongoosePublisherRepository;
