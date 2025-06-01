class Publisher {
	constructor({ id, nome, endereco, contato, cidade, pais }) {
		this.id = id;
		this.nome = nome;
		this.endereco = endereco;
		this.contato = contato;
		this.cidade = cidade;
		this.pais = pais;
		this.validate();
	}

	validate() {
		if (!this.nome || this.nome.trim() === "")
			throw new Error("Nome da editora é obrigatório");
	}
}
module.exports = Publisher;
