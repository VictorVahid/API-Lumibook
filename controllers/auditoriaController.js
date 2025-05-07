import Auditoria from "../db/schemas/auditoria.js";

export const createAuditoriaLog = async (req, res) => {
	try {
		const newAuditoriaLog = await Auditoria.create(req.body);
		res.status(201).json(newAuditoriaLog);
	} catch (error) {
		res.status(500).send(`Erro ao criar log de auditoria: ${error}`);
	}
};

export const getAllAuditoriaLogs = async (req, res) => {
	try {
		const auditoriaLogsAll = await Auditoria.find().populate("usuario_id");
		res.json(auditoriaLogsAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar logs de auditoria: ${error}`);
	}
};

export const getAuditoriaLogById = async (req, res) => {
	try {
		const auditoriaLog = await Auditoria.findById(req.params.id).populate(
			"usuario_id"
		);
		if (!auditoriaLog)
			return res.status(404).send("Log de auditoria não encontrado");
		res.json(auditoriaLog);
	} catch (error) {
		res.status(500).send(`Erro ao buscar log de auditoria: ${error}`);
	}
};

// Geralmente não se atualiza ou deleta logs de auditoria
