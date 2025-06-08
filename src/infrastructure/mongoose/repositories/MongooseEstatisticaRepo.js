const Estatistica = require("../../../domain/models/Estatistica");
const EstatisticaModel = require("../models/Estatistica");

class MongooseEstatisticaRepo {
	async findByUserId(userId) {
		const data = await EstatisticaModel.findOne({ usuario: userId });
		return data ? new Estatistica(data) : null;
	}

	async save(estatistica) {
		return await EstatisticaModel.create(estatistica);
	}

	async updateStat(userId, statKey, value) {
		const update = {};
		update[`valores.${statKey}`] = value;

		const result = await EstatisticaModel.findOneAndUpdate(
			{ usuario: userId },
			{ $set: update },
			{ new: true, upsert: true }
		);

		return result;
	}
}

module.exports = MongooseEstatisticaRepo;
