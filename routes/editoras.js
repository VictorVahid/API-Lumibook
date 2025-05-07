import express from "express";
import {
	createEditora,
	getAllEditoras,
	getEditoraById,
	updateEditora,
	deleteEditora,
} from "../controllers/editorasController.js";

const router = express.Router();

router.post("/", createEditora);
router.get("/", getAllEditoras);
router.get("/:id", getEditoraById);
router.put("/:id", updateEditora);
router.delete("/:id", deleteEditora);

export default router;
