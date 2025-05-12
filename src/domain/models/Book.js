class Book {
	constructor({ id, title, author, price, stock }) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.price = price;
		this.stock = stock;
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
