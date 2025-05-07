import express from "express";
import {
	createExemplar,
	getAllExemplares,
	getExemplarById,
	updateExemplar,
	deleteExemplar,
} from "../controllers/exemplaresController.js";

const router = express.Router();

router.post("/", createExemplar);
router.get("/", getAllExemplares);
router.get("/:id", getExemplarById);
router.put("/:id", updateExemplar);
router.delete("/:id", deleteExemplar);

export default router;
