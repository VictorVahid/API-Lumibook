import Auditoria from "../db/schemas/auditoria.js";

export const createAuditoriaLog = async (req, res) => {
	try {
		const novaAuditoria = new Auditoria(req.body);
		const auditoriaSalva = await novaAuditoria.save();
		res.status(201).json(auditoriaSalva);
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const getAllAuditoriaLogs = async (req, res) => {
	try {
		const auditorias = await Auditoria.find().populate("usuario_id");
		res.json(auditorias);
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const getAuditoriaLogById = async (req, res) => {
	try {
		const auditoria = await Auditoria.findById(req.params.id).populate(
			"usuario_id"
		);
		if (auditoria) {
			res.json(auditoria);
		} else {
			res.status(404).json({ mensagem: "Auditoria não encontrada" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};
