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

exports.getUserStats = async (req, res) => {
	const { userId } = req.params;
	try {
		const stats = await repo.findByUserId(userId);
		const data = {
			usuario: stats?.usuario || userId,
			livrosLidos: stats?.valores?.livrosLidos ?? 0,
			reservasRealizadas: stats?.valores?.reservasRealizadas ?? 0,
			atrasos: stats?.valores?.atrasos ?? 0,
			livrosEmprestados: stats?.valores?.livrosEmprestados ?? 0,
			livrosDisponiveis: stats?.valores?.livrosDisponiveis ?? 0,
			limiteConcorrente: stats?.valores?.limiteConcorrente ?? 3,
			devolucoesPendentes: stats?.valores?.devolucoesPendentes ?? 0,
			reservasAtivas: stats?.valores?.reservasAtivas ?? 0,
			historicoEmprestimos: stats?.valores?.historicoEmprestimos ?? 0,
			ultimaAtualizacao: stats?.valores?.ultimaAtualizacao || new Date().toISOString(),
			fonte: stats?.valores?.fonte || 'api',
			tipoUsuario: stats?.valores?.tipoUsuario || 'aluno',
			multasPendentes: stats?.valores?.multasPendentes ?? 0,
			pontosUsuario: stats?.valores?.pontosUsuario ?? 0,
			bibliografiasGerenciadas: stats?.valores?.bibliografiasGerenciadas ?? 0,
			turmasAtivas: stats?.valores?.turmasAtivas ?? 0,
			livrosSolicitados: stats?.valores?.livrosSolicitados ?? 0
		};
		res.json({ success: true, data });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};
