// Controller responsável pelas operações de multas
const {
	IssueFine,
	ListFines,
	GetFine,
	UpdateFineStatus,
} = require("../../usecases/fineUseCases");
const MongooseFineRepo = require("../../infrastructure/mongoose/repositories/MongooseFineRepository");

// Instancia os casos de uso com o repositório de multas
const repoFine = new MongooseFineRepo();
const issueFineUC = new IssueFine(repoFine);
const listFinesUC = new ListFines(repoFine);
const getFineUC = new GetFine(repoFine);
const updateFineUC = new UpdateFineStatus(repoFine);

// Criação de uma nova multa
exports.createFine = async (req, res) => {
	try {
		const result = await issueFineUC.execute(req.body);
		res.status(201).json(result);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Listagem de multas com filtros opcionais
exports.listFines = async (req, res) => {
	const filters = { usuarioId: req.query.usuarioId, status: req.query.status };
	const fines = await listFinesUC.execute(filters);
	res.json(fines);
};

// Busca de uma multa por ID
exports.getFine = async (req, res) => {
	try {
		const fine = await getFineUC.execute(req.params.id);
		res.json(fine);
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

// Atualização do status da multa (ex: paga, pendente)
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

// Pagamento de multa (altera status para 'paga')
exports.payFine = async (req, res) => {
	try {
		const updated = await updateFineUC.execute(req.params.id, { status: 'paga' });
		return res.status(200).json(updated);
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
};

// Histórico simulado de multas do usuário (mock)
exports.getFineHistory = async (req, res) => {
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

// Buscar multas por usuário
exports.getFinesByUser = async (req, res) => {
	try {
		const fines = await listFinesUC.execute({ usuarioId: req.params.userId });
		res.json(fines);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};
