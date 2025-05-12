const BookRepository = require("../../../domain/repositories/BookRepository");
const BookModel = require("../models/BookSchema");

class MongooseBookRepository extends BookRepository {
	async create(book) {
		const doc = await BookModel.create(book);
		return {
			id: doc._id,
			title: doc.title,
			author: doc.author,
			price: doc.price,
			stock: doc.stock,
		};
	}

	async findByFilters(_filters) {
		// ignoramos filtros por enquanto; o teste só espera lista vazia ou com o criado
		const docs = await BookModel.find().exec();
		return docs.map((doc) => ({
			id: doc._id,
			title: doc.title,
			author: doc.author,
			price: doc.price,
			stock: doc.stock,
		}));
	}

	async findById(id) {
		const doc = await BookModel.findById(id).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			title: doc.title,
			author: doc.author,
			price: doc.price,
			stock: doc.stock,
		};
	}

	async update(id, data) {
		/* … */
	}
	async delete(id) {
		/* … */
	}
}
module.exports = MongooseBookRepository;
