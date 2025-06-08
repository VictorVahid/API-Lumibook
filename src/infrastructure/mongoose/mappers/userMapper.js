const User = require("../../../domain/models/User");

// Converte User (domínio) → Dados para o schema do Mongoose
function toPersistence(userEntity) {
	return {
		nome: userEntity.name,
		email: userEntity.email,
		senhaHash: userEntity.senhaHash,
		role: userEntity.role,
		ativo: userEntity.ativo,
		telefone: userEntity.telefone,
		matricula: userEntity.matricula,
	};
}

// Converte UserModel (Mongoose) → Entidade User (domínio)
function toDomain(userDoc) {
	if (!userDoc) return null;
	return new User({
		id: userDoc._id,
		name: userDoc.nome,
		email: userDoc.email,
		senhaHash: userDoc.senhaHash,
		role: userDoc.role,
		ativo: userDoc.ativo,
		telefone: userDoc.telefone,
		matricula: userDoc.matricula,
	});
}

module.exports = { toPersistence, toDomain };
