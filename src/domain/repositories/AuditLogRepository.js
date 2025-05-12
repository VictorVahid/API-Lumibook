class AuditLogRepository {
	/**
	 * @param {{ dataInicio?: Date|string, dataFim?: Date|string, usuario?: string, acao?: string }} filters
	 * @returns {Promise<Array>}
	 */
	async findByFilters(filters) {
		throw new Error("Method not implemented");
	}

	/**
	 * @param {string} id
	 * @returns {Promise<object|null>}
	 */
	async findById(id) {
		throw new Error("Method not implemented");
	}
}
module.exports = AuditLogRepository;
