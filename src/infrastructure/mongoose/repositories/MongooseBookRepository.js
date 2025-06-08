const BookRepository = require("../../../domain/repositories/BookRepository");
const BookModel = require("../models/Book");
const mongoose = require("mongoose");

class MongooseBookRepository extends BookRepository {
	async create(book) {
		const doc = await BookModel.create(book);
		await doc.populate("authors");
		return this._toDomain(doc);
	}

	async findByFilters(filters = {}) {
		const query = {};
		if (filters.isbn) query.isbn = filters.isbn;
		if (filters.title) query.title = { $regex: filters.title, $options: "i" };
		if (filters.authors) query.authors = { $in: filters.authors };

		const docs = await BookModel.find(query).populate("authors").exec();
		return docs.map(this._toDomain);
	}

	async findById(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) return null;
		const doc = await BookModel.findById(id).populate("authors").exec();
		return doc ? this._toDomain(doc) : null;
	}

	async update(id, data) {
		if (!mongoose.Types.ObjectId.isValid(id)) return null;
		const doc = await BookModel.findByIdAndUpdate(id, data, {
			new: true,
		})
			.populate("authors")
			.exec();
		return doc ? this._toDomain(doc) : null;
	}

	async delete(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) return null;
		return await BookModel.findByIdAndDelete(id).exec();
	}

	_toDomain(doc) {
		return {
			id: doc._id,
			title: doc.title,
			authors: doc.authors,
			stock: doc.stock,
			ano: doc.ano,
			tipo: doc.tipo,
			categoria: doc.categoria,
			edicao: doc.edicao,
			idioma: doc.idioma,
			isbn: doc.isbn,
			localizacao: doc.localizacao,
			sinopse: doc.sinopse,
			paginas: doc.paginas,
			resumo: doc.resumo,
			editora: doc.editora,
			exemplares: doc.exemplares,
			disponivel: doc.disponivel,
		};
	}
}

module.exports = MongooseBookRepository;
