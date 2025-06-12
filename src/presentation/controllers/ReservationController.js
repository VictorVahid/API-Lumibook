// Controller responsável pelas operações de reservas de livros
const {
	CreateReservation,
	ListReservations,
	GetReservation,
	UpdateReservationStatus,
	CancelReservation,
} = require("../../domain/usecases/reservationUseCases");
const MongooseReservationRepo = require("../../infrastructure/mongoose/repositories/MongooseReservationRepository");
const LoanModel = require("../../infrastructure/mongoose/models/Loan");
const ReservationModel = require("../../infrastructure/mongoose/models/Reservation");
const ExemplarModel = require("../../infrastructure/mongoose/models/Exemplar");
const BookModel = require("../../infrastructure/mongoose/models/Book");
const { calcularDataDevolucao } = require("../../utils/dateUtils");

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
		bookId: reserva.livroId || null,
		exemplarId: reserva.exemplarId || null,
		dataReserva: reserva.dataReserva || null,
		status: reserva.status || null,
	};
}

// Criação de uma nova reserva
exports.createReservation = async (req, res) => {
	try {
		const { livroId } = req.body;
		if (!livroId) {
			return res.status(400).json({ success: false, error: "livroId é obrigatório" });
		}
		// Verifica se há exemplares disponíveis pelo stock
		const livro = await BookModel.findById(livroId);
		if (!livro) {
			return res.status(404).json({ success: false, error: "Livro não encontrado" });
		}
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
		const filters = {};
		if (req.query.usuarioId) filters.usuarioId = req.query.usuarioId;
		if (req.query.bookId) filters.livroId = req.query.bookId;
		if (req.query.status) filters.status = req.query.status;
		const results = await listResUC.execute(filters);
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
		res.json(padronizarReserva(resv));
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
		const reserva = await ReservationModel.findById(req.params.id);
		if (!reserva) {
			return res.status(404).json({ message: "Reserva não encontrada" });
		}
		reserva.status = "cancelada";
		await reserva.save();
		res.json({ message: "Reserva cancelada com sucesso" });
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

// Histórico simulado de reservas do usuário (mock)
exports.getReservationHistory = async (req, res) => {
	res.json([
		{ id: "1", usuarioId: "1", bookId: "l1", status: "finalizada" },
		{ id: "2", usuarioId: "1", bookId: "l2", status: "cancelada" },
	]);
};

// Buscar reservas por usuário
exports.getReservationsByUser = async (req, res) => {
	try {
		const ress = await listResUC.execute({ usuarioId: req.params.usuarioId });
		res.json(ress.map(padronizarReserva));
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Buscar reservas por livro
exports.getReservationsByBook = async (req, res) => {
	try {
		const ress = await listResUC.execute({ livroId: req.params.bookId });
		res.json(ress.map(padronizarReserva));
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Endpoint para retirar livro reservado (transformar reserva em empréstimo)
exports.retirarReserva = async (req, res) => {
	try {
		const reserva = await ReservationModel.findById(req.params.id).populate("livroId");
		if (!reserva) {
			return res.status(404).json({ message: "Reserva não encontrada." });
		}
		if (reserva.status !== "pendente") {
			return res.status(400).json({ message: "Apenas reservas pendentes podem ser retiradas." });
		}
		// Atualiza status da reserva
		reserva.status = "finalizada";
		await reserva.save();
		// Cria empréstimo
		const dataEmprestimo = new Date();
		const dataPrevistaDevolucao = calcularDataDevolucao(dataEmprestimo);
		const novoEmprestimo = await LoanModel.create({
			usuario: reserva.usuarioId,
			livro: reserva.livroId._id,
			tituloLivro: reserva.livroId.title,
			dataEmprestimo,
			dataPrevistaDevolucao,
			status: "ativo"
		});
		return res.status(201).json({ success: true, data: novoEmprestimo });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};
