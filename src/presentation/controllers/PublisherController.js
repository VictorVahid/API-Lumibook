const {
	CreatePublisher,
	ListPublishers,
	GetPublisher,
	ReplacePublisher,
	PatchPublisher,
	DeletePublisher,
} = require("../../usecases/publisherUseCases");
const MongoosePublisherRepo = require("../../infrastructure/mongoose/repositories/MongoosePublisherRepository");

const repoPub = new MongoosePublisherRepo();
const createPubUC = new CreatePublisher(repoPub);
const listPubUC = new ListPublishers(repoPub);
const getPubUC = new GetPublisher(repoPub);
const replacePubUC = new ReplacePublisher(repoPub);
const patchPubUC = new PatchPublisher(repoPub);
const deletePubUC = new DeletePublisher(repoPub);

exports.createPublisher = async (req, res) => {
	try {
		const result = await createPubUC.execute(req.body);
		res.status(201).json(result);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

exports.listPublishers = async (_req, res) => {
	const pubs = await listPubUC.execute();
	res.json(pubs);
};

exports.getPublisher = async (req, res) => {
	try {
		const pub = await getPubUC.execute(req.params.id);
		res.json(pub);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
};

exports.replacePublisher = async (req, res) => {
	try {
		const updated = await replacePubUC.execute(req.params.id, req.body);
		res.json(updated);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

exports.patchPublisher = async (req, res) => {
	try {
		const patched = await patchPubUC.execute(req.params.id, req.body);
		res.json(patched);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

exports.deletePublisher = async (req, res) => {
	try {
		const result = await deletePubUC.execute(req.params.id);
		res.json(result);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
};
