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

// Função utilitária para normalizar ISBN
function normalizarIsbn(isbn) {
	return isbn ? isbn.replace(/[-\s]/g, '') : '';
}

exports.createBook = async (req, res) => {
	try {
		if (!req.body.authors && typeof req.body.author === "string") {
			req.body.authors = [req.body.author];
			delete req.body.author;
		}
		// Preencher capa automaticamente se não vier
		if ((!req.body.capa || req.body.capa === "") && req.body.isbn) {
			const isbnLimpo = normalizarIsbn(req.body.isbn);
			req.body.capa = `https://covers.openlibrary.org/b/isbn/${isbnLimpo}-L.jpg`;
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
		const exemplares = Array.isArray(book.exemplares) ? book.exemplares : [];
		const stock = exemplares.filter(e => e.status === 'disponivel' || e.status === 'available').length;
		res.json({ ...obj, stock });
	} catch (e) {
		res.status(404).json({ message: e.message });
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
		const isbn = req.params.isbn;
		const book = await BookModel.findOne({ isbn });
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
		// Preencher capa automaticamente se não vier
		if ((!req.body.capa || req.body.capa === "") && req.body.isbn) {
			const isbnLimpo = normalizarIsbn(req.body.isbn);
			req.body.capa = `https://covers.openlibrary.org/b/isbn/${isbnLimpo}-L.jpg`;
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
		const { q, tipo, categoria, ano, editora, idioma } = req.query;
		const filtro = {};

		if (q) {
			// Busca textual ampla
			filtro.$or = [
				{ title: { $regex: new RegExp(q, "i") } },
				{ categoria: { $regex: new RegExp(q, "i") } },
				{ tipo: { $regex: new RegExp(q, "i") } },
				{ editora: { $regex: new RegExp(q, "i") } },
				{ idioma: { $regex: new RegExp(q, "i") } },
				{ resumo: { $regex: new RegExp(q, "i") } },
				{ isbn: { $regex: new RegExp(q, "i") } },
			];
		}
		if (tipo) filtro.tipo = tipo;
		if (categoria) filtro.categoria = categoria;
		if (ano) filtro.ano = isNaN(Number(ano)) ? ano : Number(ano);
		if (editora) filtro.editora = editora;
		if (idioma) filtro.idioma = idioma;

		// Se nenhum filtro foi passado, retorna array vazio
		if (!q && !tipo && !categoria && !ano && !editora && !idioma) {
			return res.json([]);
		}

		const books = await BookModel.find(filtro).populate("authors");
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
