// Casos de uso (usecases) para operações de auditoria (logs)
// Permite listar e buscar logs de ações do sistema
class ListAuditLogs {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * filters: { dataInicio?, dataFim?, usuario?, acao? }
	 */
	async execute(filters) {
		return await this.repo.findByFilters(filters);
	}
}

class GetAuditLog {
	constructor(repo) {
		this.repo = repo;
	}

	/**
	 * id: string
	 */
	async execute(id) {
		const log = await this.repo.findById(id);
		if (!log) throw new Error("Log de auditoria não encontrado");
		return log;
	}
}

module.exports = {
	ListAuditLogs,
	GetAuditLog,
};
