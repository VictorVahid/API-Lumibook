const { ListAuditLogs, GetAuditLog } = require("../../usecases/auditUseCases");
const MongooseAuditRepo = require("../../infrastructure/mongoose/repositories/MongooseAuditLogRepository");

const repoAudit = new MongooseAuditRepo();
const listAuditUC = new ListAuditLogs(repoAudit);
const getAuditUC = new GetAuditLog(repoAudit);

exports.listLogs = async (req, res) => {
	try {
		const filters = {
			dataInicio: req.query.dataInicio,
			dataFim: req.query.dataFim,
			usuario: req.query.usuario,
			acao: req.query.acao,
		};
		const logs = await listAuditUC.execute(filters);
		res.json(logs);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

exports.getLog = async (req, res) => {
	try {
		const log = await getAuditUC.execute(req.params.id);
		res.json(log);
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
};
