// Controller responsável pelas operações relacionadas a livros
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

// Instancia os casos de uso com o repositório de livros
const repoBook = new MongooseBookRepo();
const createBookUC = new CreateBook(repoBook);
const listBooksUC = new ListBooks(repoBook);
const getBookUC = new GetBook(repoBook);
const replaceBookUC = new ReplaceBook(repoBook);
const patchBookUC = new PatchBook(repoBook);
const deleteBookUC = new DeleteBook(repoBook);

// Função utilitária para traduzir campos do livro para o padrão da API
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

// Criação de um novo livro
exports.createBook = async (req, res) => {
	try {
		const result = await createBookUC.execute(req.body);
		const obj = traduzirLivro(result);
		res.status(201).json({
			id: obj.id,
			titulo: obj.titulo,
			autor: obj.autor,
			isbn: obj.isbn,
			ano: obj.ano,
			tipo: obj.tipo,
			categoria: obj.categoria,
			editora: obj.editora,
			idioma: obj.idioma,
			paginas: obj.paginas,
			resumo: obj.resumo,
			localizacao: obj.localizacao,
			exemplares: obj.exemplares,
			disponivel: obj.disponivel
		});
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Listagem de todos os livros
exports.listBooks = async (req, res) => {
	try {
		// Filtros do front: search, category, available
		const { search, category, available } = req.query;
		let books = await listBooksUC.execute({});
		if (search) {
			books = books.filter(livro => {
				const texto = [livro.titulo || livro.title, livro.autor || livro.author, livro.isbn, livro.categoria, livro.tipo, livro.resumo]
					.map(x => (x || "").toLowerCase()).join(" ");
				return texto.includes(search.toLowerCase());
			});
		}
		if (category) {
			books = books.filter(livro => (livro.categoria || '').toLowerCase() === category.toLowerCase());
		}
		if (available !== undefined) {
			const availableBool = available === 'true' || available === true;
			books = books.filter(livro => livro.disponivel === availableBool);
		}
		res.json(books.map(livro => {
			const obj = traduzirLivro(livro);
			return {
				id: obj.id,
				titulo: obj.titulo,
				autor: obj.autor,
				isbn: obj.isbn,
				ano: obj.ano,
				tipo: obj.tipo,
				categoria: obj.categoria,
				editora: obj.editora,
				idioma: obj.idioma,
				paginas: obj.paginas,
				resumo: obj.resumo,
				localizacao: obj.localizacao,
				exemplares: obj.exemplares,
				disponivel: obj.disponivel
			};
		}));
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Busca de um livro por ID
exports.getBook = async (req, res) => {
	try {
		const book = await getBookUC.execute(req.params.id);
		const obj = traduzirLivro(book);
		res.json({
			id: obj.id,
			titulo: obj.titulo,
			autor: obj.autor
		});
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

// Substituição completa dos dados de um livro
exports.replaceBook = async (req, res) => {
	try {
		const updated = await replaceBookUC.execute(req.params.id, req.body);
		const obj = traduzirLivro(updated);
		// Retornar apenas campos atualizados (exemplo: id, titulo)
		res.json({
			id: obj.id,
			titulo: obj.titulo
		});
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Atualização parcial dos dados de um livro
exports.patchBook = async (req, res) => {
	try {
		const patched = await patchBookUC.execute(req.params.id, req.body);
		const obj = traduzirLivro(patched);
		// Exemplo: se categoria foi alterada, retornar { id, categoria }
		if (req.body.categoria) {
			return res.json({ id: obj.id, categoria: obj.categoria });
		}
		// Caso genérico: retornar id e campos alterados
		const resp = { id: obj.id };
		Object.keys(req.body).forEach(k => { if (obj[k] !== undefined) resp[k] = obj[k]; });
		res.json(resp);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Remoção de um livro
exports.deleteBook = async (req, res) => {
	try {
		await deleteBookUC.execute(req.params.id);
		res.json({ message: "Livro excluído com sucesso" });
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

// Retorna os livros mais recentes cadastrados (limitado por query param)
exports.getRecentBooks = async (req, res) => {
	const limit = parseInt(req.query.limit) || 5;
	try {
		const books = await BookModel.find().sort({ createdAt: -1 }).limit(limit);
		res.json(books.map(livro => {
			const obj = traduzirLivro(livro);
			return {
				id: obj.id,
				titulo: obj.titulo,
				ano: obj.ano
			};
		}));
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

// Retorna até 3 livros "relacionados" (exemplo simplificado)
exports.getRelatedBooks = async (req, res) => {
	const bookId = req.params.bookId;
	const books = await listBooksUC.execute({});
	const relacionados = books.filter(b => b.id !== bookId).slice(0, 3);
	res.json(relacionados.map(livro => {
		const obj = traduzirLivro(livro);
		return {
			id: obj.id,
			titulo: obj.titulo
		};
	}));
};

// Busca livro pelo ISBN
exports.getBookByISBN = async (req, res) => {
	const isbn = req.params.isbn;
	const books = await listBooksUC.execute({});
	const book = books.find(b => b.isbn === isbn);
	if (!book) return res.status(404).json({ message: "Livro não encontrado" });
	const obj = traduzirLivro(book);
	res.json({
		id: obj.id,
		titulo: obj.titulo,
		isbn: obj.isbn
	});
};

// Busca livros por termo textual (busca simples)
exports.searchBooks = async (req, res) => {
	const termo = req.query.q || "";
	const books = await listBooksUC.execute({});
	const filtrados = books.filter(livro => {
		const texto = [livro.titulo || livro.title, livro.autor || livro.author, livro.isbn, livro.categoria, livro.tipo, livro.resumo]
			.map(x => (x || "").toLowerCase()).join(" ");
		return texto.includes(termo.toLowerCase());
	});
	res.json(filtrados.map(traduzirLivro));
};
