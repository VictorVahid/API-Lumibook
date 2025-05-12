class ExemplarRepository {
	/** @param {object} exemplar */
	async create(exemplar) {
		throw new Error("Method not implemented");
	}

	/** @param {{ livroId?: string, status?: string }} filters */
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
module.exports = ExemplarRepository;
