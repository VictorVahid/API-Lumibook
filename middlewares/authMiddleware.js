import jwt from "jsonwebtoken";

export const autenticarToken = (req, res, next) => {
	const token = req.headers["authorization"]?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ mensagem: "Token não fornecido" });
	}

	try {
		const usuario = jwt.verify(token, process.env.JWT_SECRET);
		req.usuario = usuario;
		next();
	} catch (erro) {
		res.status(403).json({ mensagem: "Token inválido ou expirado" });
	}
};
