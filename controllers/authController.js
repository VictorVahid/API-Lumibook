import Usuario from "../db/schemas/usuarios.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
	const { email, senha } = req.body;

	try {
		// Inclui explicitamente o campo "senha", já que ele tem select: false
		const usuario = await Usuario.findOne({ email }).select("+senha");

		if (!usuario) {
			return res.status(404).json({ mensagem: "Usuário não encontrado" });
		}

		const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

		if (!senhaCorreta) {
			return res.status(401).json({ mensagem: "Senha incorreta" });
		}

		const token = jwt.sign(
			{ id: usuario._id, role: usuario.role },
			process.env.JWT_SECRET,
			{ expiresIn: "8h" }
		);

		res.status(200).json({
			mensagem: "Login realizado com sucesso",
			token,
			usuario: {
				id: usuario._id,
				nome: usuario.nome,
				email: usuario.email,
				role: usuario.role,
			},
		});
	} catch (erro) {
		console.error("Erro ao fazer login:", erro.message);
		res
			.status(500)
			.json({ mensagem: "Erro ao fazer login", erro: erro.message });
	}
};
