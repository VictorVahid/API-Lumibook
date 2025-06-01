class Book {
	constructor({ id, title, author, price, stock, isbn, ano, tipo, categoria, edicao, idioma, paginas, resumo, localizacao, exemplares, adminId, dataCatalogacao, status, disponivel }) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.price = price;
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
		this.validate();
	}

	validate() {
		if (!this.title || this.title.trim() === "")
			throw new Error("Título do livro é obrigatório");
		if (!this.author || this.author.trim() === "")
			throw new Error("Autor do livro é obrigatório");
	}
}
module.exports = Book;
