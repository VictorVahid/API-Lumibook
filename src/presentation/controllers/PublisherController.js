// Controller responsável pelas operações relacionadas a editoras
const {
	CreatePublisher,
	ListPublishers,
	GetPublisher,
	ReplacePublisher,
	PatchPublisher,
	DeletePublisher,
} = require("../../usecases/publisherUseCases");
const MongoosePublisherRepo = require("../../infrastructure/mongoose/repositories/MongoosePublisherRepository");

// Instancia os casos de uso com o repositório de editoras
const repoPub = new MongoosePublisherRepo();
const createPubUC = new CreatePublisher(repoPub);
const listPubUC = new ListPublishers(repoPub);
const getPubUC = new GetPublisher(repoPub);
const replacePubUC = new ReplacePublisher(repoPub);
const patchPubUC = new PatchPublisher(repoPub);
const deletePubUC = new DeletePublisher(repoPub);

// Criação de uma nova editora
exports.createPublisher = async (req, res) => {
	try {
		const result = await createPubUC.execute(req.body);
		res.status(201).json({
			id: result.id || result._id,
			nome: result.nome
		});
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Listagem de todas as editoras
exports.listPublishers = async (_req, res) => {
	const pubs = await listPubUC.execute();
	res.json(pubs.map(p => ({ id: p.id || p._id, nome: p.nome })));
};

// Busca de uma editora por ID
exports.getPublisher = async (req, res) => {
	try {
		const pub = await getPubUC.execute(req.params.id);
		res.json({ id: pub.id || pub._id, nome: pub.nome });
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

// Substituição completa dos dados de uma editora
exports.replacePublisher = async (req, res) => {
	try {
		const updated = await replacePubUC.execute(req.params.id, req.body);
		res.json({ success: true, data: updated, message: "Editora substituída com sucesso" });
	} catch (e) {
		res.status(400).json({ success: false, message: e.message });
	}
};

// Atualização parcial dos dados de uma editora
exports.patchPublisher = async (req, res) => {
	try {
		const patched = await patchPubUC.execute(req.params.id, req.body);
		if (req.body.cidade) {
			return res.json({ id: patched.id || patched._id, cidade: req.body.cidade });
		}
		if (req.body.nome) {
			return res.json({ id: patched.id || patched._id, nome: patched.nome });
		}
		res.json({ id: patched.id || patched._id });
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// Remoção de uma editora
exports.deletePublisher = async (req, res) => {
	try {
		await deletePubUC.execute(req.params.id);
		res.json({ message: "Editora removida" });
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

// Buscar editoras por nome
exports.searchPublishers = async (req, res) => {
	const termo = (req.query.q || "").toLowerCase();
	const pubs = await listPubUC.execute();
	const filtrados = pubs.filter(p => p.nome && p.nome.toLowerCase().includes(termo));
	res.json(filtrados.map(p => ({ id: p.id || p._id, nome: p.nome })));
};
