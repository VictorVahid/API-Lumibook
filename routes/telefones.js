import express from "express";
import {
  createTelefone,
  getAllTelefones,
  getTelefoneById,
  updateTelefone,
  deleteTelefone,
} from "../controllers/telefonesController.js";

const router = express.Router();

router.post("/", createTelefone);
router.get("/", getAllTelefones);
router.get("/:id", getTelefoneById);
router.put("/:id", updateTelefone);
router.delete("/:id", deleteTelefone);

export default router;
