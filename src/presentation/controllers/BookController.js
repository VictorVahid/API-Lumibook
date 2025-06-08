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
	obj.id = obj._id;

	if (obj.title) {
		obj.titulo = obj.title;
		delete obj.title;
	}

	if (obj.authors) {
		obj.autores = Array.isArray(obj.authors)
			? obj.authors.map((a) =>
					a.nome ? { id: a.id || a._id, nome: a.nome } : a
			  )
			: obj.authors;
		delete obj.authors;
	}

	obj.exemplares = await ExemplarModel.countDocuments({ livro: obj.id });
	const exemplares = await ExemplarModel.find({ livro: obj.id });
	obj.disponivel = exemplares.some((ex) => ex.status === "disponível");

	return obj;
}

exports.createBook = async (req, res) => {
	try {
		if (!req.body.authors && typeof req.body.author === "string") {
			req.body.authors = [req.body.author];
			delete req.body.author;
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
		const { search, category, available } = req.query;
		let books = await listBooksUC.execute();
		const traduzidos = await Promise.all(books.map(traduzirLivro));

		let filtrados = traduzidos;

		if (search) {
			filtrados = filtrados.filter((livro) => {
				const texto = [
					livro.titulo,
					(livro.autores || []).map((a) => a.nome).join(", "),
					livro.isbn,
					livro.categoria,
					livro.tipo,
					livro.resumo,
				]
					.map((x) => (x || "").toLowerCase())
					.join(" ");
				return texto.includes(search.toLowerCase());
			});
		}

		if (category) {
			filtrados = filtrados.filter(
				(livro) =>
					(livro.categoria || "").toLowerCase() === category.toLowerCase()
			);
		}

		if (available !== undefined) {
			const availableBool = available === "true" || available === true;
			filtrados = filtrados.filter(
				(livro) => livro.disponivel === availableBool
			);
		}

		res.json(filtrados);
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
		const books = await listBooksUC.execute();
		const traduzidos = await Promise.all(books.map(traduzirLivro));
		const filtrados = traduzidos.filter((livro) => {
			const texto = [
				livro.titulo,
				(livro.autores || []).map((a) => a.nome).join(", "),
				livro.isbn,
				livro.categoria,
				livro.tipo,
				livro.resumo,
			]
				.map((x) => (x || "").toLowerCase())
				.join(" ");
			return texto.includes(termo.toLowerCase());
		});
		res.json(filtrados);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};
