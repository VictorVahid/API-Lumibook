const MongooseEstatisticaRepo = require("../../infrastructure/mongoose/repositories/MongooseEstatisticaRepo");
const UpdateUserStats = require("../../domain/usecases/UpdateUserStats");
const LoanModel = require("../../infrastructure/mongoose/models/Loan");
const ReservationModel = require("../../infrastructure/mongoose/models/Reservation");
const FineModel = require("../../infrastructure/mongoose/models/Fine");

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
		// Buscar reservas ativas e popular o livro
		const reservas = await ReservationModel.find({
			usuarioId: userId,
			status: 'pendente'
		}).populate('livroId');

		const reservasRealizadas = reservas.length;

		// Buscar empréstimos atrasados e popular o livro
		const emprestimosAtrasadosArr = await LoanModel.find({
			usuarioId: userId,
			status: 'atrasado'
		}).populate('livro');

		const atrasos = emprestimosAtrasadosArr.length;

		// Contar empréstimos ativos ou atrasados
		const livrosLidos = await LoanModel.countDocuments({
			usuarioId: userId,
			status: { $in: ['ativo', 'atrasado'] }
		});

		// Contar multas pendentes
		const multasPendentes = await FineModel.countDocuments({
			usuarioId: userId,
			status: 'pendente'
		});

		res.json({
			success: true,
			data: {
				livrosLidos,
				reservasRealizadas,
				reservas: reservas.map(r => ({
					id: r._id,
					status: r.status,
					dataReserva: r.dataReserva,
					livro: r.livroId
				})),
				atrasos,
				emprestimosAtrasados: emprestimosAtrasadosArr.map(e => ({
					id: e._id,
					status: e.status,
					dataEmprestimo: e.dataEmprestimo,
					dataDevolucao: e.dataDevolucao,
					livro: e.livro
				})),
				multasPendentes,
				limiteConcorrente: 3,
				ultimaAtualizacao: new Date().toISOString()
			}
		});
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};
