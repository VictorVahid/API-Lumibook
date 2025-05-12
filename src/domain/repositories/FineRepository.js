class FineRepository {
	/** @param {object} fine */
	async create(fine) {
		throw new Error("Method not implemented");
	}

	/** @param {{ usuarioId?: string, status?: string }} filters */
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
}
module.exports = FineRepository;
