class BookRepository {
	/** @param {object} book */
	async create(book) {
		throw new Error("Method not implemented");
	}

	/** @param {{ titulo?: string, autorId?: string, editoraId?: string, genero?: string }} filters */
	async findByFilters(filters) {
		throw new Error("Method not implemented");
	}

	/** @param {string} id */
	async findById(id) {
		throw new Error("Method not implemented");
	}

	/** @param {string} id, @param {object} data */
	async update(id, data) {
		throw new Error("Method not implemented");
	}

	/** @param {string} id */
	async delete(id) {
		throw new Error("Method not implemented");
	}
}
module.exports = BookRepository;
