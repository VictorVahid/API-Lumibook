const BookRepository = require("../../../domain/repositories/BookRepository");
const BookModel = require("../models/Book");
const mongoose = require("mongoose");

class MongooseBookRepository extends BookRepository {
	async create(book) {
		const doc = await BookModel.create(book);
		await doc.populate(["authors", "editora"]);
		return this._toDTO(doc);
	}

	async findByFilters(filters = {}) {
		const query = {};
		if (filters.isbn) query.isbn = filters.isbn;
		if (filters.title) query.title = { $regex: filters.title, $options: "i" };
		if (filters.authors) query.authors = { $in: filters.authors };

		const docs = await BookModel.find(query).populate(["authors", "editora"]).exec();
		return docs.map(this._toDTO);
	}

	async findById(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) return null;
		const doc = await BookModel.findById(id).populate(["authors", "editora"]).exec();
		return doc ? this._toDTO(doc) : null;
	}

	async update(id, data) {
		if (!mongoose.Types.ObjectId.isValid(id)) return null;
		const doc = await BookModel.findByIdAndUpdate(id, data, {
			new: true,
		})
			.populate(["authors", "editora"])
			.exec();
		return doc ? this._toDTO(doc) : null;
	}

	async delete(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) return null;
		return await BookModel.findByIdAndDelete(id).exec();
	}

	_toDTO(doc) {
		if (!doc) return null;
		const obj = doc.toObject ? doc.toObject() : doc;
		return {
			id: obj._id,
			title: obj.title,
			authors: Array.isArray(obj.authors)
				? obj.authors.map(a => ({ id: a._id || a.id, nome: a.nome }))
				: [],
			stock: obj.stock,
			ano: obj.ano,
			tipo: obj.tipo,
			categoria: obj.categoria,
			edicao: obj.edicao,
			idioma: obj.idioma,
			isbn: obj.isbn,
			localizacao: obj.localizacao,
			sinopse: obj.sinopse,
			paginas: obj.paginas,
			resumo: obj.resumo,
			editora: obj.editora && typeof obj.editora === 'object' ? { id: obj.editora._id || obj.editora.id, nome: obj.editora.nome } : obj.editora,
			exemplares: obj.exemplares,
			disponivel: obj.disponivel,
		};
	}
}

module.exports = MongooseBookRepository;
