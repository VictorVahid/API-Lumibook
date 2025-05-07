import express from "express";

import {
	createLivro,
	getAllLivros,
	getLivroById,
	updateLivro,
	deleteLivro,
} from "../controllers/livroController.js";

const router = express.Router();

// Rota POST
router.post("/", createLivro);

// Rota GET
router.get("/", getAllLivros);

// Rota GET
router.get("/:id", getLivroById);

// Rota PUT
router.put("/:id", updateLivro);

// Rota DELETE
router.delete("/:id", deleteLivro);

export default router;
