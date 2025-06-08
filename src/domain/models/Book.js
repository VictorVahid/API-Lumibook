// Modelo de domínio para Livro
class Book {
	constructor({
		id,
		title,
		authors,
		stock,
		isbn,
		ano,
		tipo,
		categoria,
		edicao,
		idioma,
		paginas,
		resumo,
		localizacao,
		exemplares,
		adminId,
		dataCatalogacao,
		status,
		disponivel,
		editora,
	}) {
		this.id = id;
		this.title = title;
		this.authors = authors;
		this.stock = stock;
		this.isbn = isbn;
		this.ano = ano;
		this.tipo = tipo;
		this.categoria = categoria;
		this.edicao = edicao;
		this.idioma = idioma;
		this.paginas = paginas;
		this.resumo = resumo;
		this.localizacao = localizacao;
		this.exemplares = exemplares;
		this.adminId = adminId;
		this.dataCatalogacao = dataCatalogacao;
		this.status = status;
		this.disponivel = disponivel;
		this.editora = editora; // ← Adicionado aqui
		this.validate();
	}

	// Validação de campos obrigatórios do livro
	validate() {
		if (!this.title || this.title.trim() === "")
			throw new Error("Título do livro é obrigatório");
		if (
			!this.authors ||
			!Array.isArray(this.authors) ||
			this.authors.length === 0
		)
			throw new Error("Pelo menos um autor é obrigatório");
	}
}
module.exports = Book;
