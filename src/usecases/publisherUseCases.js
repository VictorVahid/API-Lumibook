const Publisher = require("../domain/models/Publisher");

class CreatePublisher {
	constructor(repo) {
		this.repo = repo;
	}
	/** data: { nome, endereco?, contato? } */
	async execute(data) {
		if (
			!data.nome ||
			typeof data.nome !== "string" ||
			data.nome.trim() === ""
		) {
			throw new Error("Nome da editora é obrigatório");
		}
		const publisher = new Publisher({ ...data });
		return await this.repo.create(publisher);
	}
}

class ListPublishers {
	constructor(repo) {
		this.repo = repo;
	}
	async execute() {
		return await this.repo.findAll();
	}
}

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

class ReplacePublisher {
	constructor(repo) {
		this.repo = repo;
	}
	/** id: string, data: { nome, endereco?, contato? } */
	async execute(id, data) {
		if (!data.nome || data.nome.trim() === "") {
			throw new Error("Nome da editora é obrigatório");
		}
		const updated = await this.repo.update(id, data);
		if (!updated) throw new Error("Editora não encontrada");
		return updated;
	}
}

class PatchPublisher {
	constructor(repo) {
		this.repo = repo;
	}
	async execute(id, data) {
		if (data.nome !== undefined && data.nome.trim() === "") {
			throw new Error("Nome da editora não pode ficar vazio");
		}
		const patched = await this.repo.update(id, data);
		if (!patched) throw new Error("Editora não encontrada");
		return patched;
	}
}

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
