import express from "express";
import {
  createPermissao,
  getAllPermissoes,
  getPermissaoById,
  updatePermissao,
  deletePermissao,
} from "../controllers/permissoesController.js";

const router = express.Router();

router.post("/", createPermissao);
router.get("/", getAllPermissoes);
router.get("/:id", getPermissaoById);
router.put("/:id", updatePermissao);
router.delete("/:id", deletePermissao);

export default router;
