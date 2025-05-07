import express from "express";
import {
	createAutor,
	getAllAutores,
	getAutorById,
	updateAutor,
	deleteAutor,
} from "../controllers/autoresController.js";

const router = express.Router();

router.post("/", createAutor);
router.get("/", getAllAutores);
router.get("/:id", getAutorById);
router.put("/:id", updateAutor);
router.delete("/:id", deleteAutor);

export default router;
