const {
	CreateExemplar,
	GetExemplarById,
	UpdateExemplar,
	DeleteExemplar,
	ListExemplares,
} = require("../../domain/usecases/exemplarUseCases");

const MongooseExemplarRepo = require("../../infrastructure/mongoose/repositories/MongooseExemplarRepository");
const exemplarRepo = new MongooseExemplarRepo();

// Criação de exemplar
exports.createExemplar = async (req, res) => {
	try {
		const result = await new CreateExemplar(exemplarRepo).execute(req.body);
		res.status(201).json(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Listagem de exemplares
exports.listExemplares = async (req, res) => {
	try {
		const exemplares = await new ListExemplares(exemplarRepo).execute();
		res.json(exemplares);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Buscar exemplar por ID
exports.getExemplarById = async (req, res) => {
	try {
		const exemplar = await new GetExemplarById(exemplarRepo).execute(
			req.params.id
		);
		res.json(exemplar);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// Atualizar exemplar
exports.updateExemplar = async (req, res) => {
	try {
		const atualizado = await new UpdateExemplar(exemplarRepo).execute(
			req.params.id,
			req.body
		);
		res.json(atualizado);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Deletar exemplar
exports.deleteExemplar = async (req, res) => {
	try {
		await new DeleteExemplar(exemplarRepo).execute(req.params.id);
		res.json({ message: "Exemplar excluído com sucesso." });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
