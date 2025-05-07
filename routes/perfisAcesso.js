import express from "express";
import {
  createPerfilAcesso,
  getAllPerfisAcesso,
  getPerfilAcessoById,
  updatePerfilAcesso,
  deletePerfilAcesso,
} from "../controllers/perfisAcessoController.js";

const router = express.Router();

router.post("/", createPerfilAcesso);
router.get("/", getAllPerfisAcesso);
router.get("/:id", getPerfilAcessoById);
router.put("/:id", updatePerfilAcesso);
router.delete("/:id", deletePerfilAcesso);

export default router;
