const User = require("../domain/models/User");
const bcrypt = require("bcryptjs");

class CreateUser {
	constructor(repo) {
		this.repo = repo;
	}
	/** data: { nome, email, senha, role?, ativo? } */
	async execute(data) {
		if (!data.nome || data.nome.trim() === "")
			throw new Error("Nome é obrigatório");
		if (!data.email || data.email.trim() === "")
			throw new Error("Email é obrigatório");
		if (!data.senha || data.senha.length < 6)
			throw new Error("Senha deve ter ao menos 6 caracteres");
		const senhaHash = await bcrypt.hash(data.senha, 10);
		const user = new User({ ...data, senhaHash });
		return await this.repo.create(user);
	}
}

class GetUser {
	constructor(repo) {
		this.repo = repo;
	}
	async execute(id) {
		const user = await this.repo.findById(id);
		if (!user) throw new Error("Usuário não encontrado");
		return user;
	}
}

class UpdateUser {
	constructor(repo) {
		this.repo = repo;
	}
	/** id: string, data: Partial<{ nome, email, senha, role, ativo }> */
	async execute(id, data) {
		if (data.senha) {
			if (data.senha.length < 6)
				throw new Error("Senha deve ter ao menos 6 caracteres");
			data.senhaHash = await bcrypt.hash(data.senha, 10);
			delete data.senha;
		}
		const updated = await this.repo.update(id, data);
		if (!updated) throw new Error("Usuário não encontrado");
		return updated;
	}
}

class DeleteUser {
	constructor(repo) {
		this.repo = repo;
	}
	async execute(id) {
		const existing = await this.repo.findById(id);
		if (!existing) throw new Error("Usuário não encontrado");
		await this.repo.delete(id);
		return { message: "Usuário removido com sucesso" };
	}
}

module.exports = {
	CreateUser,
	GetUser,
	UpdateUser,
	DeleteUser,
};
