// src/infrastructure/mongoose/repositories/MongooseAuthorRepository.js
const AuthorRepository = require("../../../domain/repositories/AuthorRepository");
const AuthorModel = require("../models/AuthorSchema");
const mongoose = require("mongoose");

class MongooseAuthorRepository extends AuthorRepository {
	async create(author) {
		const doc = await AuthorModel.create(author);
		return {
			id: doc._id,
			nome: doc.nome,
			bio: doc.bio,
			nascimento: doc.nascimento,
		};
	}

	async findAll() {
		const docs = await AuthorModel.find().exec();
		return docs.map((d) => ({
			id: d._id,
			nome: d.nome,
			bio: d.bio,
			nascimento: d.nascimento,
		}));
	}

	async findById(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		const doc = await AuthorModel.findById(id).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			nome: doc.nome,
			bio: doc.bio,
			nascimento: doc.nascimento,
		};
	}

	async update(id, data) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		const doc = await AuthorModel.findByIdAndUpdate(id, data, {
			new: true,
		}).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			nome: doc.nome,
			bio: doc.bio,
			nascimento: doc.nascimento,
		};
	}

	async delete(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		await AuthorModel.findByIdAndDelete(id).exec();
	}
}

module.exports = MongooseAuthorRepository;
