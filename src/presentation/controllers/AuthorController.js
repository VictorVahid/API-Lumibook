const {
	CreateAuthor,
	ListAuthors,
	GetAuthor,
	ReplaceAuthor,
	PatchAuthor,
	DeleteAuthor,
} = require("../../usecases/authorsUseCases");
const MongooseAuthorRepo = require("../../infrastructure/mongoose/repositories/MongooseAuthorRepository");

const repo = new MongooseAuthorRepo();
const createUC = new CreateAuthor(repo);
const listUC = new ListAuthors(repo);
const getUC = new GetAuthor(repo);
const replaceUC = new ReplaceAuthor(repo);
const patchUC = new PatchAuthor(repo);
const deleteUC = new DeleteAuthor(repo);

exports.createAuthor = async (req, res) => {
	try {
		const result = await createUC.execute(req.body);
		res.status(201).json(result);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.listAuthors = async (_req, res) => {
	const authors = await listUC.execute();
	res.json(authors);
};

exports.getAuthor = async (req, res) => {
	try {
		const author = await getUC.execute(req.params.id);
		res.json(author);
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

exports.replaceAuthor = async (req, res) => {
	try {
		const updated = await replaceUC.execute(req.params.id, req.body);
		res.json(updated);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.patchAuthor = async (req, res) => {
	try {
		const patched = await patchUC.execute(req.params.id, req.body);
		res.json(patched);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.deleteAuthor = async (req, res) => {
	try {
		const result = await deleteUC.execute(req.params.id);
		res.json(result);
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};
