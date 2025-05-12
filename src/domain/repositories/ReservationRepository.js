class ReservationRepository {
	/** @param {object} reservation */
	async create(reservation) {
		throw new Error("Method not implemented");
	}

	/** @param {{ usuarioId?: string, livroId?: string, status?: string }} filters */
	async findByFilters(filters) {
		throw new Error("Method not implemented");
	}

	/** @param {string} id */
	async findById(id) {
		throw new Error("Method not implemented");
	}

	/** @param {string} id, @param {{ status: string }} data */
	async updateStatus(id, data) {
		throw new Error("Method not implemented");
	}

	/** @param {string} id */
	async delete(id) {
		throw new Error("Method not implemented");
	}
}
module.exports = ReservationRepository;
