// Casos de uso (usecases) para operações de usuários
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Criação de um novo usuário com validações de papel, email e senha
class CreateUser {
	constructor(repo) {
		this.repo = repo;
	}
	/** data: { name, email, password, role?, ativo?, telefone?, matricula? } */
	async execute(data) {
		// Aceita 'papel' como alias de 'role' para flexibilidade
		if (data.papel && !data.role) {
			data.role = data.papel;
		}
		// Mapeamento automático de papel para role (ex: aluno -> leitor)
		const papelMap = {
			aluno: "leitor",
			professor: "funcionario",
			admin: "admin",
		};
		if (data.role && papelMap[data.role]) {
			data.role = papelMap[data.role];
		}
		if (!data.name || typeof data.name !== "string" || data.name.trim() === "")
			throw new Error("Name é obrigatório e deve ser uma string");
		if (
			!data.email ||
			typeof data.email !== "string" ||
			data.email.trim() === ""
		)
			throw new Error("Email é obrigatório e deve ser uma string");
		const dominiosPermitidos = ["@instituicao.edu", "@universitas.edu.br"];
		if (!dominiosPermitidos.some((dominio) => data.email.endsWith(dominio))) {
			throw new Error(
				"Email deve ser institucional (" + dominiosPermitidos.join(" ou ") + ")"
			);
		}
		// Validação de senha forte
		if (!data.password || typeof data.password !== "string")
			throw new Error("Password é obrigatória e deve ser uma string");
		if (data.password.length < 8)
			throw new Error("Password deve ter no mínimo 8 caracteres");
		if (!/[A-Z]/.test(data.password))
			throw new Error("Password deve conter pelo menos uma letra maiúscula");
		if (!/[a-z]/.test(data.password))
			throw new Error("Password deve conter pelo menos uma letra minúscula");
		if (!/[0-9]/.test(data.password))
			throw new Error("Password deve conter pelo menos um número");
		if (!/[^A-Za-z0-9]/.test(data.password))
			throw new Error("Password deve conter pelo menos um caractere especial");
		if (data.telefone !== undefined && typeof data.telefone !== "string")
			throw new Error("Telefone deve ser uma string");
		if (data.role !== undefined && typeof data.role !== "string")
			throw new Error("Role deve ser uma string");
		if (data.role === "aluno") {
			if (
				!data.matricula ||
				typeof data.matricula !== "string" ||
				data.matricula.trim() === ""
			) {
				throw new Error(
					"Matrícula é obrigatória e deve ser uma string para alunos"
				);
			}
		}
		if (data.matricula !== undefined && typeof data.matricula !== "string")
			throw new Error("Matrícula deve ser uma string");
		const senhaHash = await bcrypt.hash(data.password, 10);
		const user = new User({ ...data, senhaHash });
		return await this.repo.create(user);
	}
}

// Busca de usuário por ID
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

// Atualização parcial dos dados do usuário
class UpdateUser {
	constructor(repo) {
		this.repo = repo;
	}
	/** id: string, data: Partial<{ name, email, password, role, ativo }> */
	async execute(id, data) {
		if (data.password) {
			if (data.password.length < 6)
				throw new Error("Password deve ter ao menos 6 caracteres");
			data.senhaHash = await bcrypt.hash(data.password, 10);
			delete data.password;
		}
		const updated = await this.repo.update(id, data);
		if (!updated) throw new Error("Usuário não encontrado");
		return updated;
	}
}

// Remoção de usuário
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
