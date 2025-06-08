// src/infrastructure/mongoose/repositories/MongooseExemplarRepository.js

const ExemplarModel = require("../models/Exemplar");
const Exemplar = require("../../../domain/models/Exemplar");
const mongoose = require("mongoose");

class MongooseExemplarRepository {
	async create(exemplarEntity) {
		const exemplarData = {
			livro: exemplarEntity.livro,
			codigo: exemplarEntity.codigo,
			status: exemplarEntity.status,
		};

		const created = await ExemplarModel.create(exemplarData);
		return new Exemplar({
			id: created._id,
			livro: created.livro,
			codigo: created.codigo,
			status: created.status,
		});
	}

	async findById(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) return null;
		const found = await ExemplarModel.findById(id);
		if (!found) return null;
		return new Exemplar({
			id: found._id,
			livro: found.livro,
			codigo: found.codigo,
			status: found.status,
		});
	}

	async findByLivroId(livroId) {
		const exemplares = await ExemplarModel.find({ livro: livroId });
		return exemplares.map(
			(ex) =>
				new Exemplar({
					id: ex._id,
					livro: ex.livro,
					codigo: ex.codigo,
					status: ex.status,
				})
		);
	}

	async update(id, data) {
		if (!mongoose.Types.ObjectId.isValid(id)) return null;
		const updated = await ExemplarModel.findByIdAndUpdate(id, data, {
			new: true,
		});
		if (!updated) return null;
		return new Exemplar({
			id: updated._id,
			livro: updated.livro,
			codigo: updated.codigo,
			status: updated.status,
		});
	}

	async delete(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) return null;
		return await ExemplarModel.findByIdAndDelete(id);
	}

	async findAll() {
		const exemplares = await ExemplarModel.find();
		return exemplares.map(
			(ex) =>
				new Exemplar({
					id: ex._id,
					livro: ex.livro,
					codigo: ex.codigo,
					status: ex.status,
				})
		);
	}
}

module.exports = MongooseExemplarRepository;
