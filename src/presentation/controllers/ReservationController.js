// Controller responsável pelas operações de reservas de livros
const {
	CreateReservation,
	ListReservations,
	GetReservation,
	UpdateReservationStatus,
	CancelReservation,
} = require("../../domain/usecases/reservationUseCases");
const MongooseReservationRepo = require("../../infrastructure/mongoose/repositories/MongooseReservationRepository");

// Instancia os casos de uso com o repositório de reservas
const repoRes = new MongooseReservationRepo();
const createResUC = new CreateReservation(repoRes);
const listResUC = new ListReservations(repoRes);
const getResUC = new GetReservation(repoRes);
const updateResUC = new UpdateReservationStatus(repoRes);
const cancelResUC = new CancelReservation(repoRes);

// Função utilitária para padronizar o retorno da reserva na API
function padronizarReserva(reserva) {
	return {
		id: reserva.id || null,
		usuarioId: reserva.usuarioId || null,
		salaId: reserva.salaId || null,
		descricao: reserva.descricao || null,
		livroId: reserva.livroId || null,
		exemplarId: reserva.exemplarId || null,
		dataReserva: reserva.dataReserva || null,
		status: reserva.status || null,
	};
}

// Criação de uma nova reserva
exports.createReservation = async (req, res) => {
	try {
		const result = await createResUC.execute(req.body);
		res
			.status(201)
			.json({ success: true, data: padronizarReserva(result), error: null });
	} catch (e) {
		res.status(400).json({ success: false, data: null, error: e.message });
	}
};

// Listagem de reservas com filtros opcionais
exports.listReservations = async (req, res) => {
	try {
		const results = await listResUC.execute();
		res.json({
			success: true,
			data: results.map(padronizarReserva),
			error: null,
		});
	} catch (e) {
		res.status(500).json({ success: false, data: null, error: e.message });
	}
};

// Busca de uma reserva por ID
exports.getReservation = async (req, res) => {
	try {
		const resv = await getResUC.execute(req.params.id);
		res.json({
			id: resv.id || resv._id,
			userId: resv.usuarioId,
			bookId: resv.livroId,
			status: resv.status,
		});
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

// Atualização do status da reserva (ex: ativa, cancelada)
exports.patchReservationStatus = async (req, res) => {
	try {
		const updated = await updateResUC.execute(req.params.id, {
			status: req.body.status,
		});
		res.json({ id: updated.id || updated._id, status: updated.status });
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Cancelamento de uma reserva
exports.deleteReservation = async (req, res) => {
	try {
		await cancelResUC.execute(req.params.id);
		res.json({ message: "Reserva cancelada com sucesso" });
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

// Histórico simulado de reservas do usuário (mock)
exports.getReservationHistory = async (req, res) => {
	res.json([
		{ id: "1", userId: "1", bookId: "l1", status: "finalizada" },
		{ id: "2", userId: "1", bookId: "l2", status: "cancelada" },
	]);
};

// Buscar reservas por usuário
exports.getReservationsByUser = async (req, res) => {
	try {
		const ress = await listResUC.execute({ usuarioId: req.params.userId });
		res.json(
			ress.map((r) => ({
				id: r.id || r._id,
				userId: r.usuarioId,
				bookId: r.livroId,
				status: r.status,
			}))
		);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Buscar reservas por livro
exports.getReservationsByBook = async (req, res) => {
	try {
		const ress = await listResUC.execute({ livroId: req.params.bookId });
		res.json(
			ress.map((r) => ({
				id: r.id || r._id,
				userId: r.usuarioId,
				bookId: r.livroId,
				status: r.status,
			}))
		);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};
