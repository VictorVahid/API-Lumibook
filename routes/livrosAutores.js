import express from "express";
import {
  createLivroAutor,
  getAllLivrosAutores,
  getLivroAutorById,
  deleteLivroAutor,
} from "../controllers/livrosAutoresController.js";

const router = express.Router();

router.post("/", createLivroAutor);
router.get("/", getAllLivrosAutores);
router.get("/:id", getLivroAutorById);
router.delete("/:id", deleteLivroAutor);

export default router;
