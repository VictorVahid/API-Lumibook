// src/infrastructure/mongoose/repositories/MongooseUserRepository.js
const UserRepository = require("../../../domain/repositories/UserRepository");
const UserModel = require("../models/UserSchema");
const mongoose = require("mongoose");

class MongooseUserRepository extends UserRepository {
	async create(user) {
		const doc = await UserModel.create(user);
		return {
			id: doc._id,
			nome: doc.nome,
			email: doc.email,
			role: doc.role,
			ativo: doc.ativo,
		};
	}

	async findById(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		const doc = await UserModel.findById(id).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			nome: doc.nome,
			email: doc.email,
			role: doc.role,
			ativo: doc.ativo,
		};
	}

	async update(id, data) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		const doc = await UserModel.findByIdAndUpdate(id, data, {
			new: true,
		}).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			nome: doc.nome,
			email: doc.email,
			role: doc.role,
			ativo: doc.ativo,
		};
	}

	async delete(id) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null;
		}
		const doc = await UserModel.findByIdAndDelete(id).exec();
		if (!doc) return null;
		return {
			id: doc._id,
			nome: doc.nome,
			email: doc.email,
		};
	}

	async findAll() {
		return await UserModel.find({}, { senhaHash: 0, senha: 0 });
	}

	async findByEmail(email) {
		const doc = await UserModel.findOne({ email }).exec();
		if (!doc) return null;
		return doc.toObject();
	}

	async findByMatricula(matricula) {
		const doc = await UserModel.findOne({ matricula }).exec();
		if (!doc) return null;
		return doc.toObject();
	}
}

module.exports = MongooseUserRepository;
