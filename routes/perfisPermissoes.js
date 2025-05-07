import express from "express";
import {
  createPerfilPermissao,
  getAllPerfisPermissoes,
  getPerfilPermissaoById,
  deletePerfilPermissao,
} from "../controllers/perfisPermissoesController.js";

const router = express.Router();

router.post("/", createPerfilPermissao);
router.get("/", getAllPerfisPermissoes);
router.get("/:id", getPerfilPermissaoById);
router.delete("/:id", deletePerfilPermissao);

export default router;
