class Publisher {
	constructor({ id, nome, endereco, contato }) {
		this.id = id;
		this.nome = nome;
		this.endereco = endereco;
		this.contato = contato;
		this.validate();
	}

	validate() {
		if (!this.nome || this.nome.trim() === "")
			throw new Error("Nome da editora é obrigatório");
	}
}
module.exports = Publisher;
