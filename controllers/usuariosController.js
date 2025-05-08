import Usuario from "../db/schemas/usuarios.js";

export const createUser = async (req, res) => {
	try {
		const novoUsuario = new Usuario(req.body);
		const usuarioSalvo = await novoUsuario.save();
		res.status(201).json(usuarioSalvo);
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const usuarios = await Usuario.find();
		res.json(usuarios);
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const getUserById = async (req, res) => {
	try {
		const usuario = await Usuario.findById(req.params.id);
		if (usuario) {
			res.json(usuario);
		} else {
			res.status(404).json({ mensagem: "Usuário não encontrado" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const usuarioAtualizado = await Usuario.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (usuarioAtualizado) {
			res.json(usuarioAtualizado);
		} else {
			res.status(404).json({ mensagem: "Usuário não encontrado" });
		}
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const usuarioDeletado = await Usuario.findByIdAndDelete(req.params.id);
		if (usuarioDeletado) {
			res.status(204).send();
		} else {
			res.status(404).json({ mensagem: "Usuário não encontrado" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};
