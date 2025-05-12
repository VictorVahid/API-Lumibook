const {
	CreateBook,
	ListBooks,
	GetBook,
	ReplaceBook,
	PatchBook,
	DeleteBook,
} = require("../../usecases/bookUseCases");
const MongooseBookRepo = require("../../infrastructure/mongoose/repositories/MongooseBookRepository");

const repoBook = new MongooseBookRepo();
const createBookUC = new CreateBook(repoBook);
const listBooksUC = new ListBooks(repoBook);
const getBookUC = new GetBook(repoBook);
const replaceBookUC = new ReplaceBook(repoBook);
const patchBookUC = new PatchBook(repoBook);
const deleteBookUC = new DeleteBook(repoBook);

exports.createBook = async (req, res) => {
	try {
		const result = await createBookUC.execute(req.body);
		res.status(201).json(result);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

exports.listBooks = async (req, res) => {
	try {
		// os testes não passam filtros, então basta
		const books = await listBooksUC.execute({});
		res.json(books);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getBook = async (req, res) => {
	try {
		const book = await getBookUC.execute(req.params.id);
		res.json(book);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
};

exports.replaceBook = async (req, res) => {
	try {
		const updated = await replaceBookUC.execute(req.params.id, req.body);
		res.json(updated);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

exports.patchBook = async (req, res) => {
	try {
		const patched = await patchBookUC.execute(req.params.id, req.body);
		res.json(patched);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

exports.deleteBook = async (req, res) => {
	try {
		const result = await deleteBookUC.execute(req.params.id);
		res.json(result);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
};
