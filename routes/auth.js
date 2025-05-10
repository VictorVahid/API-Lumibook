import express from "express";
import { login } from "../controllers/authController.js";
import { autenticarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/login", login);
router.get("/protected", autenticarToken, (req, res) => {
	res.status(200).json({ mensagem: "Acesso autorizado" });
});

export default router;

