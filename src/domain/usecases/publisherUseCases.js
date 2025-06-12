// Casos de uso (usecases) para operações de editoras
const Publisher = require("../models/Publisher");

// Criação de uma nova editora com validação de campos obrigatórios
class CreatePublisher {
	constructor(repo) {
		this.repo = repo;
	}
	/** data: { nome, endereco?, contato? } */
	async execute(data) {
		// Mapeamento extra para retrocompatibilidade
		if (data.cidade && !data.endereco) data.endereco = data.cidade;
		if (data.pais && !data.contato) data.contato = data.pais;
		if (
			!data.nome ||
			typeof data.nome !== "string" ||
			data.nome.trim() === ""
		) {
			throw new Error("Nome da editora é obrigatório");
		}
		// Verifica duplicidade (case insensitive)
		const existente = await this.repo.findByName(data.nome);
		if (existente) {
			const err = new Error("Editora já existe");
			err.code = "ALREADY_EXISTS";
			err.data = { id: existente._id || existente.id, nome: existente.nome };
			throw err;
		}
		const publisher = new Publisher({ ...data });
		return await this.repo.create(publisher);
	}
}

// Listagem de editoras
class ListPublishers {
	constructor(repo) {
		this.repo = repo;
	}
	async execute() {
		return await this.repo.findAll();
	}
}

// Busca de uma editora por ID
class GetPublisher {
	constructor(repo) {
		this.repo = repo;
	}
	async execute(id) {
		const publisher = await this.repo.findById(id);
		if (!publisher) throw new Error("Editora não encontrada");
		return publisher;
	}
}

// Substituição completa dos dados de uma editora
class ReplacePublisher {
	constructor(repo) {
		this.repo = repo;
	}
	/** id: string, data: { nome, endereco?, contato? } */
	async execute(id, data) {
		// Mapeamento extra para retrocompatibilidade
		if (data.cidade && !data.endereco) data.endereco = data.cidade;
		if (data.pais && !data.contato) data.contato = data.pais;
		if (!data.nome || data.nome.trim() === "") {
			throw new Error("Nome da editora é obrigatório");
		}
		const updated = await this.repo.update(id, data);
		if (!updated) throw new Error("Editora não encontrada");
		return updated;
	}
}

// Atualização parcial dos dados de uma editora
class PatchPublisher {
	constructor(repo) {
		this.repo = repo;
	}
	async execute(id, data) {
		// Mapeamento extra para retrocompatibilidade
		if (data.cidade && !data.endereco) data.endereco = data.cidade;
		if (data.pais && !data.contato) data.contato = data.pais;
		if (data.nome !== undefined && data.nome.trim() === "") {
			throw new Error("Nome da editora não pode ficar vazio");
		}
		const patched = await this.repo.update(id, data);
		if (!patched) throw new Error("Editora não encontrada");
		return patched;
	}
}

// Remoção de uma editora
class DeletePublisher {
	constructor(repo) {
		this.repo = repo;
	}
	async execute(id) {
		const existing = await this.repo.findById(id);
		if (!existing) throw new Error("Editora não encontrada");
		await this.repo.delete(id);
		return { message: "Editora removida com sucesso" };
	}
}

module.exports = {
	CreatePublisher,
	ListPublishers,
	GetPublisher,
	ReplacePublisher,
	PatchPublisher,
	DeletePublisher,
};
