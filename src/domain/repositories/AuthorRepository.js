class AuthorRepository {
	/** @param {object} author */
	async create(author) {
		throw new Error("Method not implemented");
	}

	/** @returns {Promise<Array>} */
	async findAll() {
		throw new Error("Method not implemented");
	}

	/** @param {string} id
	 *  @returns {Promise<object|null>}
	 */
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
module.exports = AuthorRepository;
