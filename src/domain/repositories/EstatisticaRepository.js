class EstatisticaRepository {
	async findByUserId(userId) {
		throw new Error("Not implemented");
	}

	async save(estatistica) {
		throw new Error("Not implemented");
	}

	async updateStat(userId, statKey, value) {
		throw new Error("Not implemented");
	}
}

module.exports = EstatisticaRepository;
