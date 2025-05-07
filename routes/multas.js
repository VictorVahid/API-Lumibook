import express from "express";
import {
	createMulta,
	getAllMultas,
	getMultaById,
	updateMulta,
	deleteMulta,
} from "../controllers/multasController.js";

const router = express.Router();

router.post("/", createMulta);
router.get("/", getAllMultas);
router.get("/:id", getMultaById);
router.put("/:id", updateMulta);
router.delete("/:id", deleteMulta);

export default router;
