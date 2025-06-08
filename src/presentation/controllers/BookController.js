const {
	CreateBook,
	ListBooks,
	GetBook,
	ReplaceBook,
	PatchBook,
	DeleteBook,
	SearchBooks,
	GetBookByISBN,
} = require("../../domain/usecases/bookUseCases");

const MongooseBookRepo = require("../../infrastructure/mongoose/repositories/MongooseBookRepository");
const BookModel = require("../../infrastructure/mongoose/models/Book");
const ExemplarModel = require("../../infrastructure/mongoose/models/Exemplar");

const repoBook = new MongooseBookRepo();
const createBookUC = new CreateBook(repoBook);
const listBooksUC = new ListBooks(repoBook);
const getBookUC = new GetBook(repoBook);
const replaceBookUC = new ReplaceBook(repoBook);
const patchBookUC = new PatchBook(repoBook);
const deleteBookUC = new DeleteBook(repoBook);

async function traduzirLivro(livro) {
	if (!livro) return null;
	const obj = livro.toObject ? livro.toObject() : livro;
	obj.id = obj._id || obj.id || null;

	// Título
	obj.titulo = obj.titulo || obj.title || "";
	delete obj.title;

	// Autores (array de strings)
	if (obj.authors) {
		obj.autores = Array.isArray(obj.authors)
			? obj.authors.map((a) => (typeof a === "object" && a.nome ? a.nome : (typeof a === "string" ? a : "")))
			: [];
		delete obj.authors;
	} else if (!obj.autores) {
		obj.autores = [];
	}

	// ISBN
	obj.isbn = obj.isbn || "";
	// Ano
	obj.ano = obj.ano || null;
	// Tipo
	obj.tipo = obj.tipo || "";
	// Categoria
	obj.categoria = obj.categoria || "";
	// Editora
	obj.editora = obj.editora || "";

	// Exemplares (número)
	if (obj.exemplares === undefined) {
		obj.exemplares = 0;
	}
	// Disponível
	if (obj.disponivel === undefined) {
		obj.disponivel = false;
	}
	// Capa
	obj.capa = obj.capa || "";
	// Resumo
	obj.resumo = obj.resumo || "";

	return obj;
}

exports.createBook = async (req, res) => {
	try {
		if (!req.body.authors && typeof req.body.author === "string") {
			req.body.authors = [req.body.author];
			delete req.body.author;
		}
		// Preencher capa automaticamente se não vier
		if ((!req.body.capa || req.body.capa === "") && req.body.isbn) {
			req.body.capa = `https://covers.openlibrary.org/b/isbn/${req.body.isbn}-L.jpg`;
		}
		const book = await createBookUC.execute(req.body);
		const obj = await traduzirLivro(book);
		res.status(201).json(obj);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.getBook = async (req, res) => {
	try {
		const book = await getBookUC.execute(req.params.id);
		const obj = await traduzirLivro(book);
		res.json(obj);
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

exports.listBooks = async (req, res) => {
	try {
		const { search, category, available, limit, sort } = req.query;
		let booksQuery = BookModel.find();

		// Excluir livros removidos (exclusão lógica)
		if (BookModel.schema.paths.removido || BookModel.schema.paths.deleted || BookModel.schema.paths.ativo) {
			if (BookModel.schema.paths.removido) {
				booksQuery = booksQuery.find({ removido: { $ne: true } });
			}
			if (BookModel.schema.paths.deleted) {
				booksQuery = booksQuery.find({ deleted: { $ne: true } });
			}
			if (BookModel.schema.paths.ativo) {
				booksQuery = booksQuery.find({ ativo: { $ne: false } });
			}
		}

		if (search) {
			booksQuery = booksQuery.find({
				$or: [
					{ title: { $regex: new RegExp(search, "i") } },
					{ isbn: { $regex: new RegExp(search, "i") } },
					{ categoria: { $regex: new RegExp(search, "i") } },
				],
			});
		}

		if (category) {
			booksQuery = booksQuery.find({ categoria: category });
		}

		if (available !== undefined) {
			const availableBool = available === "true" || available === true;
			booksQuery = booksQuery.find({ disponivel: availableBool });
		}

		// Ordenação
		if (sort === "recentes" || !sort) {
			booksQuery = booksQuery.sort({ createdAt: -1 });
		}

		// Limite
		let limitNum = parseInt(limit);
		if (!isNaN(limitNum) && limitNum > 0) {
			booksQuery = booksQuery.limit(limitNum);
		}

		const books = await booksQuery.exec();
		const traduzidos = await Promise.all(books.map(traduzirLivro));
		res.json(traduzidos);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.getRecentBooks = async (req, res) => {
	try {
		const limit = parseInt(req.query.limit) || 3;
		const books = await BookModel.find().sort({ createdAt: -1 }).limit(limit);
		const traduzidos = await Promise.all(books.map(traduzirLivro));
		res.json(
			traduzidos.map((obj) => ({
				id: obj.id,
				titulo: obj.titulo,
				ano: obj.ano,
				disponivel: obj.disponivel,
			}))
		);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.getRelatedBooks = async (req, res) => {
	try {
		const bookId = req.params.bookId;
		const limit = parseInt(req.query.limit) || 3;
		const books = await listBooksUC.execute();

		const relacionados = books
			.filter((b) => String(b.id || b._id) !== String(bookId))
			.slice(0, limit);

		const traduzidos = await Promise.all(relacionados.map(traduzirLivro));
		res.json(
			traduzidos.map((obj) => ({
				id: obj.id,
				titulo: obj.titulo,
				capa: obj.capa || "",
				disponivel: obj.disponivel,
			}))
		);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.getBookByISBN = async (req, res) => {
	try {
		const isbn = req.params.isbn;
		const book = await BookModel.findOne({ isbn });
		if (!book) return res.status(404).json({ message: "Livro não encontrado" });
		const obj = await traduzirLivro(book);
		res.json({
			id: obj.id,
			titulo: obj.titulo,
			isbn: obj.isbn,
			disponivel: obj.disponivel,
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.updateBook = async (req, res) => {
	try {
		// Preencher capa automaticamente se não vier
		if ((!req.body.capa || req.body.capa === "") && req.body.isbn) {
			req.body.capa = `https://covers.openlibrary.org/b/isbn/${req.body.isbn}-L.jpg`;
		}
		const updated = await updateBookUC.execute(req.params.id, req.body);
		const obj = await traduzirLivro(updated);
		res.json({ id: obj.id, titulo: obj.titulo });
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.deleteBook = async (req, res) => {
	try {
		await deleteBookUC.execute(req.params.id);
		res.json({ message: "Livro excluído com sucesso" });
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

exports.searchBooks = async (req, res) => {
	try {
		const termo = typeof req.query.q === "string" ? req.query.q.trim() : "";
		if (!termo) {
			return res.json([]);
		}
		const books = await BookModel.find({
			$or: [
				{ title: { $regex: new RegExp(termo, "i") } },
				{ categoria: { $regex: new RegExp(termo, "i") } },
				{ authors: { $exists: true, $not: { $size: 0 } } },
			],
		}).populate("authors");

		// Filtrar por autores (nome)
		const filtrados = books.filter((livro) => {
			const autores = livro.authors || [];
			const autoresStr = Array.isArray(autores)
				? autores.map((a) => (a.nome ? a.nome : a)).join(", ")
				: autores;
			const texto = [
				livro.title,
				autoresStr,
				livro.categoria,
			].map((x) => (x || "").toLowerCase()).join(" ");
			return texto.includes(termo.toLowerCase());
		});

		const traduzidos = await Promise.all(filtrados.map(traduzirLivro));
		res.json(traduzidos);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};
