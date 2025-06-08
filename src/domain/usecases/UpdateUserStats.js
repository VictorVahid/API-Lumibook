const Estatistica = require("../models/Estatistica");

class UpdateUserStats {
	constructor(estatisticaRepo) {
		this.repo = estatisticaRepo;
	}

	async execute(userId, statKey, value) {
		const estatisticaExistente = await this.repo.findByUserId(userId);

		if (!estatisticaExistente) {
			const nova = new Estatistica({
				usuario: userId,
				valores: { [statKey]: value },
			});

			return await this.repo.save(nova);
		} else {
			return await this.repo.updateStat(userId, statKey, value);
		}
	}
}

module.exports = UpdateUserStats;
