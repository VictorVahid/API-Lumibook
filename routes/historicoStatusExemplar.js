import express from "express";
import {
  createHistoricoStatus,
  getAllHistoricoStatus,
  getHistoricoStatusById,
} from "../controllers/historicoStatusExemplarController.js";

const router = express.Router();

router.post("/", createHistoricoStatus);
router.get("/", getAllHistoricoStatus);
router.get("/:id", getHistoricoStatusById);


export default router;