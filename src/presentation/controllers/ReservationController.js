const {
	CreateReservation,
	ListReservations,
	GetReservation,
	UpdateReservationStatus,
	CancelReservation,
} = require("../../usecases/reservationUseCases");
const MongooseReservationRepo = require("../../infrastructure/mongoose/repositories/MongooseReservationRepository");

const repoRes = new MongooseReservationRepo();
const createResUC = new CreateReservation(repoRes);
const listResUC = new ListReservations(repoRes);
const getResUC = new GetReservation(repoRes);
const updateResUC = new UpdateReservationStatus(repoRes);
const cancelResUC = new CancelReservation(repoRes);

exports.createReservation = async (req, res) => {
	try {
		const result = await createResUC.execute(req.body);
		res.status(201).json(result);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

exports.listReservations = async (req, res) => {
	const filters = {
		usuarioId: req.query.usuarioId,
		livroId: req.query.livroId,
		status: req.query.status,
	};
	const ress = await listResUC.execute(filters);
	res.json(ress);
};

exports.getReservation = async (req, res) => {
	try {
		const resv = await getResUC.execute(req.params.id);
		res.json(resv);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
};

exports.patchReservationStatus = async (req, res) => {
	try {
		const updated = await updateResUC.execute(req.params.id, {
			status: req.body.status,
		});
		res.json(updated);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

exports.deleteReservation = async (req, res) => {
	try {
		const result = await cancelResUC.execute(req.params.id);
		res.json(result);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
};
