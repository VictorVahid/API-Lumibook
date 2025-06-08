// Casos de uso (usecases) para operações de livros
const Book = require("../models/Book");
const MongooseAuthorRepo = require("../../infrastructure/mongoose/repositories/MongooseAuthorRepository");
const authorRepo = new MongooseAuthorRepo();

// Criação de um novo livro com validação de campos obrigatórios
class CreateBook {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * data: { title, authors, stock? }
	 */
	async execute(data) {
		if (
			!data.title ||
			typeof data.title !== "string" ||
			data.title.trim() === ""
		) {
			throw new Error("O título do livro é obrigatório");
		}

		// Novo fluxo: autores
		if (
			!data.authors ||
			!Array.isArray(data.authors) ||
			data.authors.length === 0
		) {
			throw new Error("Pelo menos um autor é obrigatório");
		}

		// Para cada autor, buscar/criar e pegar o ID
		const authorIds = [];
		for (const autor of data.authors) {
			let nomeAutor = typeof autor === "string" ? autor : autor.nome;
			if (
				!nomeAutor ||
				typeof nomeAutor !== "string" ||
				nomeAutor.trim() === ""
			) {
				throw new Error("Nome do autor inválido");
			}
			// Buscar autor existente
			let autorExistente = (await authorRepo.findAll()).find(
				(a) => a.nome.toLowerCase() === nomeAutor.toLowerCase()
			);
			if (!autorExistente) {
				autorExistente = await authorRepo.create({ nome: nomeAutor });
			}
			authorIds.push(autorExistente.id);
		}

		// Verifica se já existe livro com o mesmo ISBN
		if (data.isbn) {
			const livros = await this.repo.findByFilters({ isbn: data.isbn });
			if (livros.length > 0) {
				// Já existe, incrementa o stock e adiciona exemplar
				const livroExistente = livros[0];
				const novoStock = (livroExistente.stock || 0) + (data.stock || 1);

				// Gera novo exemplar
				const novoExemplar = {
					codigo: `EX${Date.now()}`,
					status: "disponivel",
				};

				// Atualiza o array de exemplares
				const exemplaresAtualizados = Array.isArray(livroExistente.exemplares)
					? [...livroExistente.exemplares, novoExemplar]
					: [novoExemplar];

				const atualizado = await this.repo.update(livroExistente.id, {
					stock: novoStock,
					exemplares: exemplaresAtualizados,
				});
				return atualizado;
			}
		}

		// Se não existe, cria normalmente (com pelo menos 1 exemplar)
		const novoExemplar = {
			codigo: `EX${Date.now()}`,
			status: "disponivel",
		};
		const exemplares =
			data.exemplares && data.exemplares.length > 0
				? data.exemplares
				: [novoExemplar];

		const book = new Book({ ...data, authors: authorIds, exemplares });
		return await this.repo.create(book);
	}
}

// Listagem de livros com filtros opcionais
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

// Busca de um livro por ID
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

// Substituição completa dos dados de um livro
class ReplaceBook {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * id: string, data: { title, authors, stock? }
	 */
	async execute(id, data) {
		if (!data.title || data.title.trim() === "") {
			throw new Error("O título do livro é obrigatório");
		}
		if (
			!data.authors ||
			!Array.isArray(data.authors) ||
			data.authors.length === 0
		) {
			throw new Error("Pelo menos um autor é obrigatório");
		}
		const updated = await this.repo.update(id, data);
		if (!updated) throw new Error("Livro não encontrado");
		return updated;
	}
}

// Atualização parcial dos dados de um livro
class PatchBook {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * id: string, data: Partial<{ title, authors, stock, sinopse, paginas }>
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

// Remoção de um livro
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

class SearchBooks {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * termo: string
	 */
	async execute(termo) {
		if (!termo || typeof termo !== "string") {
			throw new Error("Termo de busca inválido");
		}

		const books = await this.repo.findAll(); // ou findByFilters({})
		const termoLower = termo.toLowerCase();

		return books.filter((livro) => {
			const textoBusca = [
				livro.title,
				(livro.authors || []).map((a) => a.nome).join(", ") || "",
				livro.isbn,
				livro.categoria,
				livro.tipo,
				livro.resumo,
			]
				.map((x) => (x || "").toLowerCase())
				.join(" ");

			return textoBusca.includes(termoLower);
		});
	}
}

class GetBookByISBN {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * isbn: string
	 */
	async execute(isbn) {
		if (!isbn || typeof isbn !== "string") {
			throw new Error("ISBN inválido");
		}

		const books = await this.repo.findByFilters({ isbn });
		if (books.length === 0) {
			throw new Error("Livro não encontrado");
		}
		return books[0]; // retorna o primeiro encontrado
	}
}
module.exports = {
	CreateBook,
	ListBooks,
	GetBook,
	ReplaceBook,
	PatchBook,
	DeleteBook,
	SearchBooks,
	GetBookByISBN,
};
