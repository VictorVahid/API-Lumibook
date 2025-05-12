class AuditLog {
	constructor({ id, usuarioId, acao, timestamp, detalhes }) {
		this.id = id;
		this.usuarioId = usuarioId;
		this.acao = acao;
		this.timestamp = timestamp;
		this.detalhes = detalhes;
		this.validate();
	}

	validate() {
		if (!this.usuarioId) throw new Error("usuarioId é obrigatório");
		if (!this.acao || this.acao.trim() === "")
			throw new Error("ação é obrigatória");
	}
}
module.exports = AuditLog;
