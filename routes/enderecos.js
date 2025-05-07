import express from "express";
import {
  createEndereco,
  getAllEnderecos,
  getEnderecoById,
  updateEndereco,
  deleteEndereco,
} from "../controllers/enderecosController.js";

const router = express.Router();

router.post("/", createEndereco);
router.get("/", getAllEnderecos);
router.get("/:id", getEnderecoById);
router.put("/:id", updateEndereco);
router.delete("/:id", deleteEndereco);

export default router;
