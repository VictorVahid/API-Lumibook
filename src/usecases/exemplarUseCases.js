// Casos de uso (usecases) para operações de exemplares de livros
const Exemplar = require("../domain/models/Exemplar");

// Criação de um novo exemplar com validação de campos obrigatórios
class CreateExemplar {
	constructor(repo) {
		this.repo = repo;
	}
	/** data: { livroId, status, localizacao? } */
	async execute(data) {
		if (!data.livroId) throw new Error("livroId é obrigatório");
		if (!data.status) throw new Error("status é obrigatório");
		const exemplar = new Exemplar({ ...data });
		return await this.repo.create(exemplar);
	}
}

// Listagem de exemplares com filtros opcionais
class ListExemplars {
	constructor(repo) {
		this.repo = repo;
	}
	/** filters: { livroId?, status? } */
	async execute(filters) {
		return await this.repo.findByFilters(filters);
	}
}

// Busca de um exemplar por ID
class GetExemplar {
	constructor(repo) {
		this.repo = repo;
	}
	async execute(id) {
		const ex = await this.repo.findById(id);
		if (!ex) throw new Error("Exemplar não encontrado");
		return ex;
	}
}

// Atualização do status do exemplar (ex: disponível, emprestado)
class ChangeExemplarStatus {
	constructor(repo) {
		this.repo = repo;
	}
	/** id: string, data: { status } */
	async execute(id, data) {
		if (!data.status) throw new Error("status é obrigatório");
		const updated = await this.repo.updateStatus(id, data);
		if (!updated) throw new Error("Exemplar não encontrado");
		return updated;
	}
}

// Remoção de um exemplar
class DeleteExemplar {
	constructor(repo) {
		this.repo = repo;
	}
	async execute(id) {
		const existing = await this.repo.findById(id);
		if (!existing) throw new Error("Exemplar não encontrado");
		await this.repo.delete(id);
		return { message: "Exemplar removido com sucesso" };
	}
}

module.exports = {
	CreateExemplar,
	ListExemplars,
	GetExemplar,
	ChangeExemplarStatus,
	DeleteExemplar,
};
