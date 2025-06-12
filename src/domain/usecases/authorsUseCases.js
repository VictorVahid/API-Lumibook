// Casos de uso (usecases) para operações de autores
const Author = require("../models/Author");

// Criação de um novo autor com validação de campos obrigatórios
class CreateAuthor {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * data: { nome, bio?, nascimento? }
	 */
	async execute(data) {
		// Mapeamento extra para retrocompatibilidade
		if (data.biografia && !data.bio) data.bio = data.biografia;
		if (data.nacionalidade && !data.nascimento) data.nascimento = data.nacionalidade;
		const { nome } = data;
		if (!nome || typeof nome !== "string" || nome.trim() === "") {
			throw new Error("O nome do autor é obrigatório");
		}
		// Verifica duplicidade (case insensitive)
		const existente = await this.repo.findByName(nome);
		if (existente) {
			const err = new Error("Autor já existe");
			err.code = "ALREADY_EXISTS";
			err.data = { id: existente._id || existente.id, nome: existente.nome };
			throw err;
		}
		const author = new Author({ ...data });
		return await this.repo.create(author);
	}
}

// Listagem de autores
class ListAuthors {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * retorna array de authors
	 */
	async execute() {
		return await this.repo.findAll();
	}
}

// Busca de um autor por ID
class GetAuthor {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * id: string
	 */
	async execute(id) {
		const author = await this.repo.findById(id);
		if (!author) {
			throw new Error("Autor não encontrado");
		}
		return author;
	}
}

// Substituição completa dos dados de um autor
class ReplaceAuthor {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * id: string, data: { nome, bio?, nascimento? }
	 */
	async execute(id, data) {
		// Mapeamento extra para retrocompatibilidade
		if (data.biografia && !data.bio) data.bio = data.biografia;
		if (data.nacionalidade && !data.nascimento) data.nascimento = data.nacionalidade;
		if (
			!data.nome ||
			typeof data.nome !== "string" ||
			data.nome.trim() === ""
		) {
			throw new Error("O nome do autor é obrigatório");
		}
		const updated = await this.repo.update(id, data);
		if (!updated) {
			throw new Error("Autor não encontrado");
		}
		return updated;
	}
}

// Atualização parcial dos dados de um autor
class PatchAuthor {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * id: string, data: Partial<{ nome, bio, nascimento }>
	 */
	async execute(id, data) {
		// Mapeamento extra para retrocompatibilidade
		if (data.biografia && !data.bio) data.bio = data.biografia;
		if (data.nacionalidade && !data.nascimento) data.nascimento = data.nacionalidade;
		if (
			data.nome !== undefined &&
			(typeof data.nome !== "string" || data.nome.trim() === "")
		) {
			throw new Error("O nome do autor não pode estar vazio");
		}
		const patched = await this.repo.update(id, data);
		if (!patched) {
			throw new Error("Autor não encontrado");
		}
		return patched;
	}
}

// Remoção de um autor
class DeleteAuthor {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * id: string
	 */
	async execute(id) {
		const exists = await this.repo.findById(id);
		if (!exists) {
			throw new Error("Autor não encontrado");
		}
		await this.repo.delete(id);
		return { message: "Autor removido com sucesso" };
	}
}

module.exports = {
	CreateAuthor,
	ListAuthors,
	GetAuthor,
	ReplaceAuthor,
	PatchAuthor,
	DeleteAuthor,
};
