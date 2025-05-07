import express from "express";
import {
	createEstado,
	getAllEstados,
	getEstadoById,
	updateEstado,
	deleteEstado,
} from "../controllers/estadosController.js";

const router = express.Router();

router.post("/", createEstado);
router.get("/", getAllEstados);
router.get("/:id", getEstadoById);
router.put("/:id", updateEstado);
router.delete("/:id", deleteEstado);

export default router;
