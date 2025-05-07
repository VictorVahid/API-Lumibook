import express from "express";
import {
	createCidade,
	getAllCidades,
	getCidadeById,
	updateCidade,
	deleteCidade,
} from "../controllers/cidadesController.js";

const router = express.Router();

router.post("/", createCidade);
router.get("/", getAllCidades);
router.get("/:id", getCidadeById);
router.put("/:id", updateCidade);
router.delete("/:id", deleteCidade);

export default router;
