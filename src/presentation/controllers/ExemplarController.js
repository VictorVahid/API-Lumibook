const {
	CreateExemplar,
	ListExemplars,
	GetExemplar,
	ChangeExemplarStatus,
	DeleteExemplar,
} = require("../../usecases/exemplarUseCases");
const MongooseExemplarRepo = require("../../infrastructure/mongoose/repositories/MongooseExemplarRepository");

const repoEx = new MongooseExemplarRepo();
const createExUC = new CreateExemplar(repoEx);
const listExUC = new ListExemplars(repoEx);
const getExUC = new GetExemplar(repoEx);
const changeExUC = new ChangeExemplarStatus(repoEx);
const deleteExUC = new DeleteExemplar(repoEx);

exports.createExemplar = async (req, res) => {
	try {
		const result = await createExUC.execute(req.body);
		res.status(201).json(result);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.listExemplars = async (req, res) => {
	const filters = { livroId: req.query.livroId, status: req.query.status };
	const exs = await listExUC.execute(filters);
	res.json(exs);
};

exports.getExemplar = async (req, res) => {
	try {
		const ex = await getExUC.execute(req.params.id);
		res.json(ex);
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

exports.patchExemplarStatus = async (req, res) => {
	try {
		const updated = await changeExUC.execute(req.params.id, {
			status: req.body.status,
		});
		res.json(updated);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.deleteExemplar = async (req, res) => {
	try {
		const result = await deleteExUC.execute(req.params.id);
		res.json(result);
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};
