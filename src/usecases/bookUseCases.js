const Book = require("../domain/models/Book");

class CreateBook {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * data: { title, author, price?, stock? }
	 */
	async execute(data) {
		if (
			!data.title ||
			typeof data.title !== "string" ||
			data.title.trim() === ""
		) {
			throw new Error("O título do livro é obrigatório");
		}
		if (
			!data.author ||
			typeof data.author !== "string" ||
			data.author.trim() === ""
		) {
			throw new Error("O autor do livro é obrigatório");
		}
		const book = new Book({ ...data });
		return await this.repo.create(book);
	}
}

class ListBooks {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * filters: { titulo?, autorId?, editoraId?, genero? }
	 */
	async execute(filters) {
		return await this.repo.findByFilters(filters);
	}
}

class GetBook {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * id: string
	 */
	async execute(id) {
		const book = await this.repo.findById(id);
		if (!book) throw new Error("Livro não encontrado");
		return book;
	}
}

class ReplaceBook {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * id: string, data: { title, author, price?, stock? }
	 */
	async execute(id, data) {
		if (!data.title || data.title.trim() === "") {
			throw new Error("O título do livro é obrigatório");
		}
		if (!data.author || data.author.trim() === "") {
			throw new Error("O autor do livro é obrigatório");
		}
		const updated = await this.repo.update(id, data);
		if (!updated) throw new Error("Livro não encontrado");
		return updated;
	}
}

class PatchBook {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * id: string, data: Partial<{ title, author, price, stock, sinopse, paginas }>
	 */
	async execute(id, data) {
		if (data.title !== undefined && data.title.trim() === "") {
			throw new Error("O título do livro não pode ficar vazio");
		}
		const patched = await this.repo.update(id, data);
		if (!patched) throw new Error("Livro não encontrado");
		return patched;
	}
}

class DeleteBook {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * id: string
	 */
	async execute(id) {
		const exists = await this.repo.findById(id);
		if (!exists) throw new Error("Livro não encontrado");
		await this.repo.delete(id);
		return { message: "Livro removido com sucesso" };
	}
}

module.exports = {
	CreateBook,
	ListBooks,
	GetBook,
	ReplaceBook,
	PatchBook,
	DeleteBook,
};
