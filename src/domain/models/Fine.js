class Fine {
	constructor({ id, usuarioId, reservaId, valor, status, dataGeracao }) {
		this.id = id;
		this.usuarioId = usuarioId;
		this.reservaId = reservaId;
		this.valor = valor;
		this.status = status;
		this.dataGeracao = dataGeracao;
		this.validate();
	}

	validate() {
		if (!this.usuarioId) throw new Error("usuarioId é obrigatório");
		if (!this.reservaId) throw new Error("reservaId é obrigatório");
		if (this.valor == null) throw new Error("valor é obrigatório");
	}
}
module.exports = Fine;
