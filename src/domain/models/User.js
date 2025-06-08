class User {
	constructor({
		id,
		nome,
		email,
		senhaHash,
		role,
		ativo,
		telefone,
		matricula,
	}) {
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.senhaHash = senhaHash;
		this.role = role;
		this.ativo = ativo;
		this.telefone = telefone;
		this.matricula = matricula;
		this.validate();
	}

	validate() {
		if (!this.nome || this.nome.trim() === "")
			throw new Error("Nome do usuário é obrigatório"); // linha corrigida
		if (!this.email || this.email.trim() === "")
			throw new Error("Email é obrigatório");
	}
}

module.exports = User;
