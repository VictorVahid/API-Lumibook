class CreateExemplar {
	constructor(repository) {
		this.repository = repository;
	}

	async execute(data) {
		return await this.repository.create(data);
	}
}

class GetExemplarById {
	constructor(repository) {
		this.repository = repository;
	}

	async execute(id) {
		return await this.repository.findById(id);
	}
}

class ListExemplaresByLivro {
	constructor(repository) {
		this.repository = repository;
	}

	async execute(livroId) {
		return await this.repository.findAllByLivro(livroId);
	}
}

class UpdateExemplar {
	constructor(repository) {
		this.repository = repository;
	}

	async execute(id, update) {
		return await this.repository.update(id, update);
	}
}

class DeleteExemplar {
	constructor(repository) {
		this.repository = repository;
	}

	async execute(id) {
		return await this.repository.delete(id);
	}
}

module.exports = {
	CreateExemplar,
	GetExemplarById,
	ListExemplaresByLivro,
	UpdateExemplar,
	DeleteExemplar,
};
