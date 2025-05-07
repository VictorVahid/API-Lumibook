import HistoricoStatusExemplar from "../db/schemas/historico_status_exemplar.js";

export const createHistoricoStatus = async (req, res) => {
	try {
		const newHistoricoStatus = await HistoricoStatusExemplar.create(req.body);
		res.status(201).json(newHistoricoStatus);
	} catch (error) {
		res.status(500).send(`Erro ao criar histórico de status: ${error}`);
	}
};

export const getAllHistoricoStatus = async (req, res) => {
	try {
		const historicoStatusAll = await HistoricoStatusExemplar.find()
			.populate("exemplar_id")
			.populate("funcionario_id");
		res.json(historicoStatusAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar histórico de status: ${error}`);
	}
};

export const getHistoricoStatusById = async (req, res) => {
	try {
		const historicoStatus = await HistoricoStatusExemplar.findById(
			req.params.id
		)
			.populate("exemplar_id")
			.populate("funcionario_id");
		if (!historicoStatus)
			return res.status(404).send("Histórico de status não encontrado");
		res.json(historicoStatus);
	} catch (error) {
		res.status(500).send(`Erro ao buscar histórico de status: ${error}`);
	}
};

// Pode não ser necessário UPDATE e DELETE para histórico
