// bookMapper.js
const Book = require("../../../domain/models/Book");

function toDomain(bookDoc) {
	if (!bookDoc) return null;
	const data = bookDoc._doc || bookDoc;
	return new Book({
		id: data._id,
		title: data.title,
		authors: data.authors,
		stock: data.stock,
		ano: data.ano,
		tipo: data.tipo,
		categoria: data.categoria,
		edicao: data.edicao,
		idioma: data.idioma,
		isbn: data.isbn,
		localizacao: data.localizacao,
		sinopse: data.sinopse,
		paginas: data.paginas,
		resumo: data.resumo,
		editora: data.editora,
		exemplares: data.exemplares,
		disponivel: data.disponivel,
	});
}

function toPersistence(bookEntity) {
	if (!bookEntity) return null;
	return {
		title: bookEntity.title,
		authors: bookEntity.authors,
		stock: bookEntity.stock,
		ano: bookEntity.ano,
		tipo: bookEntity.tipo,
		categoria: bookEntity.categoria,
		edicao: bookEntity.edicao,
		idioma: bookEntity.idioma,
		isbn: bookEntity.isbn,
		localizacao: bookEntity.localizacao,
		sinopse: bookEntity.sinopse,
		paginas: bookEntity.paginas,
		resumo: bookEntity.resumo,
		editora: bookEntity.editora,
		exemplares: bookEntity.exemplares,
		disponivel: bookEntity.disponivel,
	};
}

module.exports = {
	toDomain,
	toPersistence,
};
