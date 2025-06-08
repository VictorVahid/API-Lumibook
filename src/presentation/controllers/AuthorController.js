// Controller responsável pelas operações relacionadas a autores
const {
	CreateAuthor,
	ListAuthors,
	GetAuthor,
	ReplaceAuthor,
	PatchAuthor,
	DeleteAuthor,
} = require("../../domain/usecases/authorsUseCases");
const MongooseAuthorRepo = require("../../infrastructure/mongoose/repositories/MongooseAuthorRepository");
const BookModel = require("../../infrastructure/mongoose/models/Book");

// Instancia os casos de uso com o repositório de autores
const repo = new MongooseAuthorRepo();
const createUC = new CreateAuthor(repo);
const listUC = new ListAuthors(repo);
const getUC = new GetAuthor(repo);
const replaceUC = new ReplaceAuthor(repo);
const patchUC = new PatchAuthor(repo);
const deleteUC = new DeleteAuthor(repo);

// Criação de um novo autor
exports.createAuthor = async (req, res) => {
	try {
		const result = await createUC.execute(req.body);
		res.status(201).json({
			id: result.id || result._id,
			nome: result.nome,
		});
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Listagem de todos os autores
exports.listAuthors = async (_req, res) => {
	// Buscar todos os livros e extrair os IDs dos autores
	const livros = await BookModel.find({}, "authors").lean();
	const idsAutores = new Set();
	livros.forEach((livro) => {
		if (Array.isArray(livro.authors)) {
			livro.authors.forEach((id) => idsAutores.add(String(id)));
		}
	});
	const authors = await listUC.execute();
	const autoresComLivros = authors.filter((a) =>
		idsAutores.has(String(a.id || a._id))
	);
	res.json(autoresComLivros.map((a) => ({ id: a.id || a._id, nome: a.nome })));
};

// Busca de um autor por ID
exports.getAuthor = async (req, res) => {
	try {
		const author = await getUC.execute(req.params.id);
		res.json({ id: author.id || author._id, nome: author.nome });
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

// Substituição completa dos dados de um autor
exports.replaceAuthor = async (req, res) => {
	try {
		const updated = await replaceUC.execute(req.params.id, req.body);
		res.json({ id: updated.id || updated._id, nome: updated.nome });
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Atualização parcial dos dados de um autor
exports.patchAuthor = async (req, res) => {
	try {
		const patched = await patchUC.execute(req.params.id, req.body);
		if (req.body.biografia) {
			return res.json({
				id: patched.id || patched._id,
				biografia: req.body.biografia,
			});
		}
		if (req.body.nome) {
			return res.json({ id: patched.id || patched._id, nome: patched.nome });
		}
		res.json({ id: patched.id || patched._id });
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Remoção de um autor
exports.deleteAuthor = async (req, res) => {
	try {
		await deleteUC.execute(req.params.id);
		res.json({ message: "Autor removido" });
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

// Buscar autores por nome
exports.searchAuthors = async (req, res) => {
	const termo = (req.query.q || "").toLowerCase();
	const authors = await listUC.execute();
	const filtrados = authors.filter(
		(a) => a.nome && a.nome.toLowerCase().includes(termo)
	);
	res.json(filtrados.map((a) => ({ id: a.id || a._id, nome: a.nome })));
};
