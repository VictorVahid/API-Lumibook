import express from "express"; 
import mongoose from "mongoose"; 
import cors from "cors"; 
import dotenv from "dotenv"; 
import livroRoutes from "./routes/livros.js"; 

dotenv.config(); 

const app = express(); 

// Middlewares globais
app.use(cors()); 
app.use(express.json()); 

// Conexão com o MongoDB usando a URI do .env
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("✅ MongoDB conectado"))
	.catch((err) => console.error("❌ Erro ao conectar no MongoDB:", err));

// Rotas da aplicação
app.use("/api/livros", livroRoutes); 
app.get("/api/status", (req, res) => {
	res.status(200).json({ status: "API online 🚀" });
});

// Inicializa o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🟢 Servidor rodando na porta ${PORT}`);
});
