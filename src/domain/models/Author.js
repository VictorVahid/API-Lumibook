class Author {
	constructor({ id, nome, bio, nascimento }) {
		this.id = id;
		this.nome = nome;
		this.bio = bio;
		this.nascimento = nascimento;
		this.validate();
	}

	validate() {
		if (!this.nome || this.nome.trim() === "")
			throw new Error("Nome do autor é obrigatório");
	}
}
module.exports = Author;
