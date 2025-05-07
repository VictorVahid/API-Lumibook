import express from "express";
import {
  createItemEmprestimo,
  getAllItensEmprestimo,
  getItemEmprestimoById,
  updateItemEmprestimo,
  deleteItemEmprestimo,
} from "../controllers/itensEmprestimoController.js";

const router = express.Router();

router.post("/", createItemEmprestimo);
router.get("/", getAllItensEmprestimo);
router.get("/:id", getItemEmprestimoById);
router.put("/:id", updateItemEmprestimo);
router.delete("/:id", deleteItemEmprestimo);

export default router;
