class Author {
	constructor({ id, nome, bio, biografia, nascimento, nacionalidade }) {
		this.id = id;
		this.nome = nome;
		this.bio = bio || biografia;
		this.nascimento = nascimento;
		this.nacionalidade = nacionalidade;
		this.validate();
	}

	validate() {
		if (!this.nome || this.nome.trim() === "")
			throw new Error("Nome do autor é obrigatório");
	}
}
module.exports = Author;
