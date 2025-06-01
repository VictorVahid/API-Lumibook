const {
	IssueFine,
	ListFines,
	GetFine,
	UpdateFineStatus,
} = require("../../usecases/fineUseCases");
const MongooseFineRepo = require("../../infrastructure/mongoose/repositories/MongooseFineRepository");

const repoFine = new MongooseFineRepo();
const issueFineUC = new IssueFine(repoFine);
const listFinesUC = new ListFines(repoFine);
const getFineUC = new GetFine(repoFine);
const updateFineUC = new UpdateFineStatus(repoFine);

exports.createFine = async (req, res) => {
	try {
		const result = await issueFineUC.execute(req.body);
		res.status(201).json(result);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.listFines = async (req, res) => {
	const filters = { usuarioId: req.query.usuarioId, status: req.query.status };
	const fines = await listFinesUC.execute(filters);
	res.json(fines);
};

exports.getFine = async (req, res) => {
	try {
		const fine = await getFineUC.execute(req.params.id);
		res.json(fine);
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

exports.patchFineStatus = async (req, res) => {
	try {
		const updated = await updateFineUC.execute(req.params.id, {
			status: req.body.status,
		});
		res.json(updated);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.payFine = async (req, res) => {
	try {
		const updated = await updateFineUC.execute(req.params.id, { status: 'paga' });
		return res.status(200).json(updated);
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};

exports.getFineHistory = async (req, res) => {
	// Mock: histórico de multas
	res.json([
		{
			id: "1",
			descricao: "Atraso na devolução",
			valor: 10,
			status: "paga"
		},
		{
			id: "2",
			descricao: "Livro danificado",
			valor: 20,
			status: "pendente"
		}
	]);
};
