import express from "express";
import {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
} from "../controllers/usuariosController.js";
import { autenticarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createUser); // registro público
router.get("/", autenticarToken, getAllUsers); // protegido
router.get("/:id", autenticarToken, getUserById); // protegido
router.put("/:id", autenticarToken, updateUser); // protegido
router.delete("/:id", autenticarToken, deleteUser); // protegido

export default router;
