class Exemplar {
	constructor({ id, livroId, status, localizacao }) {
		this.id = id;
		this.livroId = livroId;
		this.status = status;
		this.localizacao = localizacao;
		this.validate();
	}

	validate() {
		if (!this.livroId) throw new Error("livroId é obrigatório");
		if (!this.status) throw new Error("status é obrigatório");
	}
}
module.exports = Exemplar;
