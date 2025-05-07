import express from "express";
import {
  createAuditoriaLog,
  getAllAuditoriaLogs,
  getAuditoriaLogById,
} from "../controllers/auditoriaController.js";

const router = express.Router();

router.post("/", createAuditoriaLog);
router.get("/", getAllAuditoriaLogs);
router.get("/:id", getAuditoriaLogById);

export default router;