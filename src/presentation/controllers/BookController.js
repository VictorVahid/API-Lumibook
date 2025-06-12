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
const MongooseAuthorRepo = require("../../infrastructure/mongoose/repositories/MongooseAuthorRepository");
const MongoosePublisherRepo = require("../../infrastructure/mongoose/repositories/MongoosePublisherRepository");

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
	return {
		id: obj._id || obj.id || null,
		titulo: obj.title || obj.titulo || "",
		autores: Array.isArray(obj.authors)
			? obj.authors.map(a => (typeof a === "object" && a.nome ? a.nome : a))
			: [],
		stock: obj.stock,
		isbn: obj.isbn || "",
		ano: obj.ano || null,
		tipo: obj.tipo || "",
		categoria: obj.categoria || "",
		editora: obj.editora && typeof obj.editora === 'object' && obj.editora.nome ? obj.editora.nome : (typeof obj.editora === 'string' ? obj.editora : ""),
		paginas: obj.paginas || null,
		resumo: obj.resumo || "",
		localizacao: obj.localizacao || "",
		idioma: obj.idioma || "",
		disponivel: typeof obj.disponivel === 'boolean' ? obj.disponivel : true,
		capa: obj.capa || ""
	};
}

// Função utilitária para normalizar ISBN
function normalizarIsbn(isbn) {
	return isbn ? isbn.replace(/[^\dXx]/g, '') : '';
}

exports.createBook = async (req, res) => {
	try {
		if (!req.body.authors && typeof req.body.author === "string") {
			req.body.authors = [req.body.author];
			delete req.body.author;
		}
		// Preencher capa automaticamente se não vier
		if ((!req.body.capa || req.body.capa === "") && req.body.isbn) {
			if (req.body.isbn) req.body.isbn = normalizarIsbn(req.body.isbn);
			req.body.capa = `https://covers.openlibrary.org/b/isbn/${isbnLimpo}-L.jpg`;
		}
		// Usar apenas stock
		if (req.body.exemplares) delete req.body.exemplares;
		if (typeof req.body.stock !== "number") req.body.stock = 1;

		// --- NOVA LÓGICA: autores e editora por nome ---
		const AuthorRepo = new MongooseAuthorRepo();
		const PublisherRepo = new MongoosePublisherRepo();

		// Processa autores (array de nomes ou IDs)
		let authorIds = [];
		if (Array.isArray(req.body.authors)) {
			for (const autor of req.body.authors) {
				if (typeof autor === "string") {
					let found = await AuthorRepo.findByName(autor);
					if (!found) {
						found = await AuthorRepo.create({ nome: autor });
					}
					authorIds.push(found.id || found._id);
				} else if (typeof autor === "object" && autor.id) {
					authorIds.push(autor.id);
				} else if (typeof autor === "string" && autor.match(/^[a-f\d]{24}$/i)) {
					authorIds.push(autor);
				}
			}
		}

		// Processa editora (nome ou ID)
		let publisherId = req.body.publisher;
		if (typeof req.body.publisher === "string" && req.body.publisher.trim() !== "") {
			let found = await PublisherRepo.findByName(req.body.publisher);
			if (!found) {
				found = await PublisherRepo.create({ nome: req.body.publisher });
			}
			publisherId = found.id || found._id;
		}

		// Garante que ano é número
		let ano = req.body.ano;
		if (typeof ano === "string") {
			ano = parseInt(ano, 10);
		}

		const payload = {
			...req.body,
			authors: authorIds,
			publisher: publisherId,
			ano,
		};

		const book = await createBookUC.execute(payload);
		const obj = await traduzirLivro(book);
		res.status(201).json(obj);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.getBook = async (req, res) => {
	try {
		const book = await BookModel.findById(req.params.id);
		if (!book) return res.status(404).json({ message: "Livro não encontrado" });
		res.json(book);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.listBooks = async (req, res) => {
	try {
		const { q, category, available, limit, sort } = req.query;
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

		if (q) {
			// Filtro inicial: título e ISBN (apenas campos string)
			booksQuery = booksQuery.find({
				$or: [
					{ title: { $regex: q, $options: 'i' } },
					{ isbn: { $regex: q, $options: 'i' } },
				]
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

		// Popula autores para filtrar por nome
		const books = await booksQuery.populate("authors").exec();

		let filtrados = books;
		if (q) {
			const termo = q.toLowerCase();
			filtrados = books.filter((livro) => {
				const autores = livro.authors || [];
				const autoresStr = Array.isArray(autores)
					? autores.map((a) => (a.nome ? a.nome : a)).join(", ")
					: autores;
				return (
					(livro.title && livro.title.toLowerCase().includes(termo)) ||
					(livro.isbn && livro.isbn.toLowerCase().includes(termo)) ||
					(livro.ano && String(livro.ano).includes(termo)) ||
					(autoresStr && autoresStr.toLowerCase().includes(termo))
				);
			});
		}

		const traduzidos = await Promise.all(filtrados.map(traduzirLivro));
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
		const isbnLimpo = normalizarIsbn(req.params.isbn);
		const book = await BookModel.findOne({ isbn: isbnLimpo });
		if (!book) return res.status(404).json({ message: "Livro não encontrado" });
		const obj = await traduzirLivro(book);
		res.json({
			id: obj.id,
			titulo: obj.titulo,
			isbn: obj.isbn,
			disponivel: obj.disponivel,
			capa: obj.capa
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.updateBook = async (req, res) => {
	try {
		if ((!req.body.capa || req.body.capa === "") && req.body.isbn) {
			const isbnLimpo = normalizarIsbn(req.body.isbn);
			req.body.capa = `https://covers.openlibrary.org/b/isbn/${isbnLimpo}-L.jpg`;
		}
		if (req.body.exemplares) delete req.body.exemplares;

		// --- NOVA LÓGICA: autores e editora por nome ---
		const AuthorRepo = new MongooseAuthorRepo();
		const PublisherRepo = new MongoosePublisherRepo();

		// Processa autores (array de nomes ou IDs)
		let authorIds = [];
		if (Array.isArray(req.body.authors)) {
			for (const autor of req.body.authors) {
				if (typeof autor === "string") {
					let found = await AuthorRepo.findByName(autor);
					if (!found) {
						found = await AuthorRepo.create({ nome: autor });
					}
					authorIds.push(found.id || found._id);
				} else if (typeof autor === "object" && autor.id) {
					authorIds.push(autor.id);
				} else if (typeof autor === "string" && autor.match(/^[a-f\d]{24}$/i)) {
					authorIds.push(autor);
				}
			}
		}

		// Processa editora (nome ou ID)
		let publisherId = req.body.publisher;
		if (typeof req.body.publisher === "string" && req.body.publisher.trim() !== "") {
			let found = await PublisherRepo.findByName(req.body.publisher);
			if (!found) {
				found = await PublisherRepo.create({ nome: req.body.publisher });
			}
			publisherId = found.id || found._id;
		}

		// Garante que ano é número
		let ano = req.body.ano;
		if (typeof ano === "string") {
			ano = parseInt(ano, 10);
		}

		const payload = {
			...req.body,
			authors: authorIds,
			publisher: publisherId,
			ano,
		};

		const updated = await replaceBookUC.execute(req.params.id, payload);
		const obj = await traduzirLivro(updated);
		res.json({ id: obj.id, titulo: obj.titulo });
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.patchBook = async (req, res) => {
	try {
		if ((!req.body.capa || req.body.capa === "") && req.body.isbn) {
			const isbnLimpo = normalizarIsbn(req.body.isbn);
			req.body.capa = `https://covers.openlibrary.org/b/isbn/${isbnLimpo}-L.jpg`;
		}
		if (req.body.exemplares) delete req.body.exemplares;
		const updated = await patchBookUC.execute(req.params.id, req.body);
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
		const { q, tipo, categoria, ano, editora, idioma } = req.query;
		const filtro = {};

		// Busca textual ampla (apenas em campos string)
		if (q) {
			filtro.$or = [
				{ title: { $regex: new RegExp(q, "i") } },
				{ categoria: { $regex: new RegExp(q, "i") } },
				{ tipo: { $regex: new RegExp(q, "i") } },
				{ idioma: { $regex: new RegExp(q, "i") } },
				{ resumo: { $regex: new RegExp(q, "i") } },
				{ isbn: { $regex: new RegExp(q, "i") } },
			];
		}

		if (tipo) filtro.tipo = tipo;
		if (categoria) filtro.categoria = categoria;
		if (ano) filtro.ano = isNaN(Number(ano)) ? ano : Number(ano);

		// Busca por nome da editora (se editora for string)
		if (editora) {
			const PublisherRepo = new MongoosePublisherRepo();
			const found = await PublisherRepo.findByName(editora);
			if (found) {
				filtro.editora = found.id || found._id;
			} else {
				// Se não encontrar editora, retorna vazio
				return res.json([]);
			}
		}

		if (idioma) filtro.idioma = idioma;

		// Se nenhum filtro foi passado, retorna array vazio
		if (!q && !tipo && !categoria && !ano && !editora && !idioma) {
			return res.json([]);
		}

		const books = await BookModel.find(filtro).populate(["authors", "editora"]);
		const traduzidos = await Promise.all(books.map(traduzirLivro));
		res.json(traduzidos);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.getRelatedBooksInteligente = async (req, res) => {
	try {
		const { id } = req.params;
		const LIMITE = 8;
		const livro = await BookModel.findById(id);
		if (!livro) return res.status(404).json({ message: "Livro não encontrado" });

		// 1. Livros da mesma categoria e mesmo autor (excluindo o próprio)
		let relacionados = await BookModel.find({
			_id: { $ne: id },
			categoria: livro.categoria,
			authors: { $in: livro.authors }
		}).limit(LIMITE);

		// 2. Se não houver suficientes, buscar mais da mesma categoria (outros autores)
		if (relacionados.length < LIMITE) {
			const maisCategoria = await BookModel.find({
				_id: { $ne: id },
				categoria: livro.categoria,
				authors: { $nin: livro.authors }
			}).limit(LIMITE - relacionados.length);
			relacionados = relacionados.concat(maisCategoria);
		}

		// 3. Se ainda faltar, buscar livros do mesmo autor em outras categorias
		if (relacionados.length < LIMITE) {
			const maisAutor = await BookModel.find({
				_id: { $ne: id },
				categoria: { $ne: livro.categoria },
				authors: { $in: livro.authors }
			}).limit(LIMITE - relacionados.length);
			relacionados = relacionados.concat(maisAutor);
		}

		// 4. Completar até 8 livros
		relacionados = relacionados.slice(0, LIMITE);

		// 5. Retornar campos principais
		const resultado = relacionados.map(livro => ({
			id: livro._id,
			title: livro.title || livro.titulo,
			capa: livro.capa,
			categoria: livro.categoria,
			authors: livro.authors,
		}));

		res.json(resultado);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

// Endpoint para listar livros mais recentes
exports.listRecentBooks = async (req, res) => {
	try {
		const livros = await BookModel.find({})
			.sort({ createdAt: -1 })
			.limit(4)
			.populate("authors")
			.exec();
		const result = livros.map(l => ({
			id: l._id.toString(),
			titulo: l.title,
			autor: l.authors && l.authors.length > 0
				? (typeof l.authors[0] === "object" ? l.authors[0].nome || l.authors[0].name : l.authors[0])
				: null,
			capa: l.coverUrl || null,
			isbn: l.isbn || null,
			dataCadastro: l.createdAt ? l.createdAt.toISOString() : null,
			disponivel: typeof l.disponivel !== "undefined" ? l.disponivel : true
		}));
		return res.json(result);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

exports.debugBookStock = async (req, res) => {
	try {
		const book = await BookModel.findById(req.params.id);
		if (!book) return res.status(404).json({ message: "Livro não encontrado" });
		res.json({
			id: book._id,
			stock: book.stock,
			raw: book
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};
