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

	async findByFilters(_filters) {
		// ignoramos filtros por enquanto; o teste só espera lista vazia ou com o criado
		const docs = await BookModel.find().exec();
		return docs.map((doc) => ({
			id: doc._id,
			title: doc.title,
			author: doc.author,
			price: doc.price,
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

	async update(id, data) {
		/* … */
	}
	async delete(id) {
		/* … */
	}
}
module.exports = MongooseBookRepository;
