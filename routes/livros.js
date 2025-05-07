import express from "express";

// Importa os controladores responsáveis por cada operação CRUD
import {
	createLivro,
	getAllLivros,
	getLivroById,
	updateLivro,
	deleteLivro,
} from "../controllers/livroController.js";

const router = express.Router();

// Rota POST - cria um novo livro
router.post("/", createLivro);

// Rota GET - retorna todos os livros
router.get("/", getAllLivros);

// Rota GET - retorna um livro pelo ID
router.get("/:id", getLivroById);

// Rota PUT - atualiza um livro pelo ID
router.put("/:id", updateLivro);

// Rota DELETE - remove um livro pelo ID
router.delete("/:id", deleteLivro);

// Exporta as rotas para serem usadas no server.js
export default router;
