const User = require("../domain/models/User");
const bcrypt = require("bcryptjs");

class CreateUser {
	constructor(repo) {
		this.repo = repo;
	}
	/** data: { nome, email, senha, role?, ativo?, telefone?, matricula? } */
	async execute(data) {
		// Aceitar 'papel' como alias de 'role'
		if (data.papel && !data.role) {
			data.role = data.papel;
		}
		if (!data.nome || typeof data.nome !== 'string' || data.nome.trim() === "")
			throw new Error("Nome é obrigatório e deve ser uma string");
		if (!data.email || typeof data.email !== 'string' || data.email.trim() === "")
			throw new Error("Email é obrigatório e deve ser uma string");
		const dominiosPermitidos = ['@instituicao.edu', '@universitas.edu.br'];
		if (!dominiosPermitidos.some(dominio => data.email.endsWith(dominio))) {
			throw new Error("Email deve ser institucional (" + dominiosPermitidos.join(' ou ') + ")");
		}
		// Validação de senha forte
		if (!data.senha || typeof data.senha !== 'string')
			throw new Error("Senha é obrigatória e deve ser uma string");
		if (data.senha.length < 8)
			throw new Error("Senha deve ter no mínimo 8 caracteres");
		if (!(/[A-Z]/.test(data.senha)))
			throw new Error("Senha deve conter pelo menos uma letra maiúscula");
		if (!(/[a-z]/.test(data.senha)))
			throw new Error("Senha deve conter pelo menos uma letra minúscula");
		if (!(/[0-9]/.test(data.senha)))
			throw new Error("Senha deve conter pelo menos um número");
		if (!(/[^A-Za-z0-9]/.test(data.senha)))
			throw new Error("Senha deve conter pelo menos um caractere especial");
		if (data.telefone !== undefined && typeof data.telefone !== 'string')
			throw new Error("Telefone deve ser uma string");
		if (data.role !== undefined && typeof data.role !== 'string')
			throw new Error("Role deve ser uma string");
		if (data.role === 'aluno') {
			if (!data.matricula || typeof data.matricula !== 'string' || data.matricula.trim() === "") {
				throw new Error("Matrícula é obrigatória e deve ser uma string para alunos");
			}
		}
		if (data.matricula !== undefined && typeof data.matricula !== 'string')
			throw new Error("Matrícula deve ser uma string");
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
