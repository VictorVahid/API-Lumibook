import express from "express";
import {
	createEmprestimo,
	getAllEmprestimos,
	getEmprestimoById,
	updateEmprestimo,
	deleteEmprestimo,
} from "../controllers/emprestimosController.js";

const router = express.Router();

router.post("/", createEmprestimo);
router.get("/", getAllEmprestimos);
router.get("/:id", getEmprestimoById);
router.put("/:id", updateEmprestimo);
router.delete("/:id", deleteEmprestimo);

export default router;
