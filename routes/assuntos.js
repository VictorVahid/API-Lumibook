import express from "express";
import {
  createAssunto,
  getAllAssuntos,
  getAssuntoById,
  updateAssunto,
  deleteAssunto,
} from "../controllers/assuntosController.js";

const router = express.Router();

router.post("/", createAssunto);
router.get("/", getAllAssuntos);
router.get("/:id", getAssuntoById);
router.put("/:id", updateAssunto);
router.delete("/:id", deleteAssunto);

export default router;