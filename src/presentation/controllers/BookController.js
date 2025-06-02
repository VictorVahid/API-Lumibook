const {
	CreateBook,
	ListBooks,
	GetBook,
	ReplaceBook,
	PatchBook,
	DeleteBook,
} = require("../../usecases/bookUseCases");
const MongooseBookRepo = require("../../infrastructure/mongoose/repositories/MongooseBookRepository");
const BookModel = require("../../infrastructure/mongoose/models/BookSchema");

const repoBook = new MongooseBookRepo();
const createBookUC = new CreateBook(repoBook);
const listBooksUC = new ListBooks(repoBook);
const getBookUC = new GetBook(repoBook);
const replaceBookUC = new ReplaceBook(repoBook);
const patchBookUC = new PatchBook(repoBook);
const deleteBookUC = new DeleteBook(repoBook);

function traduzirLivro(livro) {
	if (!livro) return livro;
	const obj = { ...livro._doc || livro };
	obj.id = livro.id || livro._id || obj.id || obj._id || null;
	if (obj.title) {
		obj.titulo = obj.title;
		delete obj.title;
	}
	if (obj.author) {
		obj.autor = obj.author;
		delete obj.author;
	}
	// Garantir todos os campos esperados
	obj.ano = obj.ano ?? null;
	obj.tipo = obj.tipo ?? null;
	obj.categoria = obj.categoria ?? null;
	obj.edicao = obj.edicao ?? null;
	obj.idioma = obj.idioma ?? null;
	obj.isbn = obj.isbn ?? null;
	obj.localizacao = obj.localizacao ?? null;
	obj.sinopse = obj.sinopse ?? null;
	obj.paginas = obj.paginas ?? null;
	obj.resumo = obj.resumo ?? null;
	obj.editora = obj.editora ?? null;
	obj.exemplares = obj.exemplares ?? [];
	obj.disponivel = obj.disponivel ?? true;
	return obj;
}

exports.createBook = async (req, res) => {
	try {
		const result = await createBookUC.execute(req.body);
		res.status(201).json(traduzirLivro(result));
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.listBooks = async (req, res) => {
	try {
		const books = await listBooksUC.execute({});
		res.json(books.map(traduzirLivro));
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getBook = async (req, res) => {
	try {
		const book = await getBookUC.execute(req.params.id);
		res.json(traduzirLivro(book));
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

exports.replaceBook = async (req, res) => {
	try {
		const updated = await replaceBookUC.execute(req.params.id, req.body);
		res.json(traduzirLivro(updated));
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.patchBook = async (req, res) => {
	try {
		const patched = await patchBookUC.execute(req.params.id, req.body);
		res.json(traduzirLivro(patched));
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.deleteBook = async (req, res) => {
	try {
		const result = await deleteBookUC.execute(req.params.id);
		res.json(traduzirLivro(result));
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

exports.getRecentBooks = async (req, res) => {
	const limit = parseInt(req.query.limit) || 5;
	try {
		const books = await BookModel.find().sort({ createdAt: -1 }).limit(limit);
		res.json(books.map(traduzirLivro));
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.getRelatedBooks = async (req, res) => {
	// Mock: retorna livros relacionados (poderia ser por categoria, autor, etc)
	const bookId = req.params.bookId;
	const books = await listBooksUC.execute({});
	const relacionados = books.filter(b => b.id !== bookId).slice(0, 3);
	res.json(relacionados.map(traduzirLivro));
};

exports.getBookByISBN = async (req, res) => {
	const isbn = req.params.isbn;
	const books = await listBooksUC.execute({});
	const book = books.find(b => b.isbn === isbn);
	if (!book) return res.status(404).json({ message: "Livro não encontrado" });
	res.json(traduzirLivro(book));
};

exports.searchBooks = async (req, res) => {
	const termo = req.query.q || "";
	const books = await listBooksUC.execute({});
	const filtrados = books.filter(livro => {
		const texto = [livro.title, livro.author, livro.isbn, livro.categoria, livro.tipo, livro.resumo]
			.map(x => (x || "").toLowerCase()).join(" ");
		return texto.includes(termo.toLowerCase());
	});
	res.json(filtrados.map(traduzirLivro));
};
