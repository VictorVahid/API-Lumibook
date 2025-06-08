const UserModel = require("../models/User");
const { toDomain, toPersistence } = require("../mappers/userMapper");

class MongooseUserRepository {
	async create(userEntity) {
		const userData = toPersistence(userEntity);
		const createdUser = await UserModel.create(userData);
		return toDomain(createdUser);
	}

	async findById(id) {
		const found = await UserModel.findById(id);
		return toDomain(found);
	}

	async findByEmail(email) {
		const found = await UserModel.findOne({ email });
		return toDomain(found);
	}

	async update(id, data) {
		if (data.name) data.nome = data.name;
		if (data.password) data.senhaHash = data.password;

		const updated = await UserModel.findByIdAndUpdate(id, data, { new: true });
		return toDomain(updated);
	}

	async delete(id) {
		return await UserModel.findByIdAndDelete(id);
	}

	async findAll() {
		const users = await UserModel.find();
		return users.map(toDomain);
	}
}

module.exports = MongooseUserRepository;
