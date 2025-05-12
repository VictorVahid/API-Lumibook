const Reservation = require("../domain/models/Reservation");

class CreateReservation {
	constructor(repo) {
		this.repo = repo;
	}
	/** data: { usuarioId, livroId, status? } */
	async execute(data) {
		if (!data.usuarioId) throw new Error("usuarioId é obrigatório");
		if (!data.livroId) throw new Error("livroId é obrigatório");
		data.status = data.status || "pendente";
		const reservation = new Reservation({ ...data });
		return await this.repo.create(reservation);
	}
}

class ListReservations {
	constructor(repo) {
		this.repo = repo;
	}
	/** filters: { usuarioId?, livroId?, status? } */
	async execute(filters) {
		return await this.repo.findByFilters(filters);
	}
}

class GetReservation {
	constructor(repo) {
		this.repo = repo;
	}
	async execute(id) {
		const resv = await this.repo.findById(id);
		if (!resv) throw new Error("Reserva não encontrada");
		return resv;
	}
}

class UpdateReservationStatus {
	constructor(repo) {
		this.repo = repo;
	}
	/** id: string, data: { status } */
	async execute(id, data) {
		if (!data.status) throw new Error("status é obrigatório");
		const updated = await this.repo.updateStatus(id, data);
		if (!updated) throw new Error("Reserva não encontrada");
		return updated;
	}
}

class CancelReservation {
	constructor(repo) {
		this.repo = repo;
	}
	async execute(id) {
		const existing = await this.repo.findById(id);
		if (!existing) throw new Error("Reserva não encontrada");
		await this.repo.delete(id);
		return { message: "Reserva cancelada com sucesso" };
	}
}

module.exports = {
	CreateReservation,
	ListReservations,
	GetReservation,
	UpdateReservationStatus,
	CancelReservation,
};
