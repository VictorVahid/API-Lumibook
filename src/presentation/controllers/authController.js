const MongooseUserRepo = require("../../infrastructure/mongoose/repositories/MongooseUserRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRepo = new MongooseUserRepo();

const generateToken = (user) =>
	jwt.sign(
		{ id: user.id ?? user._id, papel: user.papel ?? user.role },
		process.env.JWT_SECRET || "segredo",
		{ expiresIn: "7d" }
	);

exports.login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({
				success: false,
				data: null,
				error: "Email e senha são obrigatórios",
			});
	}

	try {
		const user = await userRepo.findByEmail(email);
		if (!user) {
			return res
				.status(404)
				.json({ success: false, data: null, error: "Usuário não encontrado" });
		}

		const senhaValida = await bcrypt.compare(password, user.senhaHash);
		if (!senhaValida) {
			return res
				.status(401)
				.json({ success: false, data: null, error: "Senha incorreta" });
		}

		const token = generateToken(user);

		return res.json({
			success: true,
			data: {
				id: user.id ?? user._id,
				name: user.name,
				email: user.email,
				papel: user.papel ?? user.role,
				matricula: user.matricula ?? null,
				tipoLogin: "email",
				avatarUrl: user.avatarUrl ?? user.avatar ?? null,
				token,
			},
			error: null,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, data: null, error: "Erro interno no servidor" });
	}
};
