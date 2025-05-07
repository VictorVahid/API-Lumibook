import express from "express";
import Livro from "../db/schemas/livros.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
	try {
		const newLivro = await Livro.create(req.body);
		res.status(201).json(newLivro); // Use 201 para criação bem-sucedida
	} catch (error) {
		res.status(500).send(`Error creating livro: ${error}`);
	}
});

// READ ALL
router.get("/", async (req, res) => {
	try {
		const livrosAll = await Livro.find();
		res.json(livrosAll);
	} catch (error) {
		res.status(500).send(`Error fetching livros: ${error}`);
	}
});

// READ ONE
router.get("/:id", async (req, res) => {
	try {
		const livro = await Livro.findById(req.params.id);
		if (!livro) {
			return res.status(404).send("Livro not found");
		}
		res.json(livro);
	} catch (error) {
		res.status(500).send(`Error fetching livro: ${error}`);
	}
});

// UPDATE
router.put("/:id", async (req, res) => {
	try {
		const updateLivro = await Livro.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updateLivro) {
			return res.status(404).send("Livro not found");
		}
		res.json(updateLivro);
	} catch (error) {
		res.status(500).send(`Error updating livro: ${error}`);
	}
});

// DELETE
router.delete("/:id", async (req, res) => {
	try {
		const deleteLivro = await Livro.findByIdAndDelete(req.params.id);
		if (!deleteLivro) {
			return res.status(404).send("Livro not found");
		}
		res
			.status(200)
			.json({ message: "Livro deleted successfully", deletedLivro });
	} catch (error) {
		res.status(500).send(`Error deleting livro: ${error}`);
	}
});

export default router;
