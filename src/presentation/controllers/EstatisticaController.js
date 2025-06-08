const MongooseEstatisticaRepo = require("../../infrastructure/mongoose/repositories/MongooseEstatisticaRepo");
const UpdateUserStats = require("../../domain/usecases/UpdateUserStats");

const repo = new MongooseEstatisticaRepo();
const updateUserStatsUC = new UpdateUserStats(repo);

exports.atualizarEstatistica = async (req, res) => {
	const { userId, statKey } = req.params;
	const { valor } = req.body;

	try {
		const resultado = await updateUserStatsUC.execute(userId, statKey, valor);
		res.json({ success: true, data: resultado });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};
