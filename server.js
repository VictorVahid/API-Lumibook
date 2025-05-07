// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import livrosRoutes from "./routes/livros.js";

dotenv.config();
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Connect to DB
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to DB");
	} catch (err) {
		console.log(`Erro ao conectar com o MongoDB: ${err}`);
	}
};
connectDB();

//Rotas - livros
app.use("/livros", livrosRoutes);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
