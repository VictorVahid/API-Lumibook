const UserModel = require("../models/User");

class MongooseUserRepository {
	async create(userEntity) {
		const createdUser = await UserModel.create(userEntity);
		return this._toDTO(createdUser);
	}

	async findById(id) {
		const found = await UserModel.findById(id).select('+senhaHash');
		return this._toDTO(found);
	}

	async findByEmail(email) {
		const found = await UserModel.findOne({ email }).select('+senhaHash');
		return this._toDTO(found);
	}

	async update(id, data) {
		if (data.name) data.nome = data.name;
		if (data.password) data.senhaHash = data.password;

		const updated = await UserModel.findByIdAndUpdate(id, data, { new: true }).select('+senhaHash');
		return this._toDTO(updated);
	}

	async delete(id) {
		return await UserModel.findByIdAndDelete(id);
	}

	async findAll() {
		const users = await UserModel.find().select('+senhaHash');
		return users.map(this._toDTO);
	}

	_toDTO(user) {
		if (!user) return null;
		const obj = user.toObject ? user.toObject() : user;
		return {
			id: obj._id,
			nome: obj.nome,
			email: obj.email,
			role: obj.role,
			ativo: obj.ativo,
			telefone: obj.telefone,
			matricula: obj.matricula,
			senhaHash: obj.senhaHash,
		};
	}
}

module.exports = MongooseUserRepository;
