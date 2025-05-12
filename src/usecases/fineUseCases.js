const Fine = require("../domain/models/Fine");

class IssueFine {
	constructor(repo) {
		this.repo = repo;
	}
	/** data: { usuarioId, reservaId, valor, status? } */
	async execute(data) {
		if (!data.usuarioId) throw new Error("usuarioId é obrigatório");
		if (!data.reservaId) throw new Error("reservaId é obrigatório");
		if (data.valor == null) throw new Error("valor é obrigatório");
		data.status = data.status || "pendente";
		const fine = new Fine({ ...data });
		return await this.repo.create(fine);
	}
}

class ListFines {
	constructor(repo) {
		this.repo = repo;
	}
	/** filters: { usuarioId?, status? } */
	async execute(filters) {
		return await this.repo.findByFilters(filters);
	}
}

class GetFine {
	constructor(repo) {
		this.repo = repo;
	}
	async execute(id) {
		const fine = await this.repo.findById(id);
		if (!fine) throw new Error("Multa não encontrada");
		return fine;
	}
}

class UpdateFineStatus {
	constructor(repo) {
		this.repo = repo;
	}
	/** id: string, data: { status } */
	async execute(id, data) {
		if (!data.status) throw new Error("status é obrigatório");
		const updated = await this.repo.updateStatus(id, data);
		if (!updated) throw new Error("Multa não encontrada");
		return updated;
	}
}

module.exports = {
	IssueFine,
	ListFines,
	GetFine,
	UpdateFineStatus,
};
