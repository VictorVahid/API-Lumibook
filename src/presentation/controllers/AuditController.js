// Controller responsável pelas operações de auditoria (logs de ações)
const { ListAuditLogs, GetAuditLog } = require("../../usecases/auditUseCases");
const MongooseAuditRepo = require("../../infrastructure/mongoose/repositories/MongooseAuditLogRepository");

// Instancia os casos de uso com o repositório de auditoria
const repoAudit = new MongooseAuditRepo();
const listAuditUC = new ListAuditLogs(repoAudit);
const getAuditUC = new GetAuditLog(repoAudit);

// Listagem de logs de auditoria com filtros opcionais
exports.listLogs = async (req, res) => {
	try {
		const filters = {
			dataInicio: req.query.dataInicio,
			dataFim: req.query.dataFim,
			usuario: req.query.usuario,
			acao: req.query.acao,
		};
		const logs = await listAuditUC.execute(filters);
		res.json(logs.map(log => ({
			id: log.id,
			acao: log.acao,
			usuario: log.usuarioId || null,
			data: log.timestamp || null,
			detalhes: log.detalhes || null
		})));
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

// Busca de um log de auditoria por ID
exports.getLog = async (req, res) => {
	try {
		const log = await getAuditUC.execute(req.params.id);
		res.json(log);
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};
