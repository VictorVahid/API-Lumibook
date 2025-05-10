import express from "express";
import {
	createAuditoriaLog,
	getAllAuditoriaLogs,
	getAuditoriaLogById,
} from "../controllers/auditoriaController.js";


const router = express.Router();

router.post("/logs", createAuditoriaLog);
router.get("/logs", getAllAuditoriaLogs);
router.get("/:id", getAuditoriaLogById);

export default router;
