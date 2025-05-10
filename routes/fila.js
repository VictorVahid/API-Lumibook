import express from "express";
import {
	createFila,
	getAllFilas,
	getFilaById,
	updateFila,
	deleteFila,
} from "../controllers/fila.js";

const router = express.Router();

router.post("/", createFila);
router.get("/", getAllFilas);
router.get("/:id", getFilaById);
router.put("/:id", updateFila);
router.delete("/:id", deleteFila);

export default router;
