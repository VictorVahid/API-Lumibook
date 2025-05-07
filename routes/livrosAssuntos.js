import express from "express";
import {
  createLivroAssunto,
  getAllLivrosAssuntos,
  getLivroAssuntoById,
  deleteLivroAssunto,
} from "../controllers/livrosAssuntosController.js";

const router = express.Router();

router.post("/", createLivroAssunto);
router.get("/", getAllLivrosAssuntos);
router.get("/:id", getLivroAssuntoById);
router.delete("/:id", deleteLivroAssunto);

export default router;
