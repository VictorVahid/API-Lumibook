import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Livro from "./db/schemas/livros.js";

dotenv.config();

const app = express();
const port = 3000;

//Middlewares
app.use(express.json());

//Conect to DB
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to DB");
	} catch (err) {
		console.log(`Erro ao conectar com o MongoDB: ${err}`);
	}
};
connectDB();

//CREATE
app.post("/livros", async (req, res) => {
	try {
		const newLivro = await Livro.create(req.body);
		res.json(newLivro);
	} catch (error) {
		res.status(500).send(`Error: ${error}`);
	}
});

//READ
app.get("/livros", async (req, res) => {
	try {
		const livrosAll = await Livro.find();
		res.json(livrosAll);
	} catch (error) {
		res.send(`Error: ${error}`);
	}
});

//UPDATE
app.put("/livros/:id", async (req, res) => {
	try {
		const updateLivro = await Livro.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(updateLivro);
	} catch (error) {
		res.send(`Error: ${error}`);
	}
});

//DELETE
app.delete("/livros/:id", async (req, res) => {
	try {
		const deleteLivro = await Livro.findByIdAndDelete(req.params.id);
		if (!deleteLivro) {
			return res.status(404).send("Livro not found");
		}
		res.json(deleteLivro);
	} catch (error) {
		res.status(500).send(`Error: ${error}`);
	}
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
