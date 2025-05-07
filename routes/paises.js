import express from "express";
import {
	createPais,
	getAllPaises,
	getPaisById,
	updatePais,
	deletePais,
} from "../controllers/paisesController.js";

const router = express.Router();

router.post("/", createPais);
router.get("/", getAllPaises);
router.get("/:id", getPaisById);
router.put("/:id", updatePais);
router.delete("/:id", deletePais);

export default router;
