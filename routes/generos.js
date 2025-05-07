import express from "express";
import {
  createGenero,
  getAllGeneros,
  getGeneroById,
  updateGenero,
  deleteGenero,
} from "../controllers/generosController.js";

const router = express.Router();

router.post("/", createGenero);
router.get("/", getAllGeneros);
router.get("/:id", getGeneroById);
router.put("/:id", updateGenero);
router.delete("/:id", deleteGenero);

export default router;
