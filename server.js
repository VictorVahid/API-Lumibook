import express from "express"; // Framework para criar servidor e rotas
import mongoose from "mongoose"; // ODM para trabalhar com MongoDB
import cors from "cors"; // Middleware para permitir requisições de outros domínios (ex: front-end)
import dotenv from "dotenv"; // Carrega variáveis de ambiente do arquivo .env
import livroRoutes from "./routes/livros.js"; // Rotas relacionadas ao recurso "livros"

dotenv.config(); // Carrega variáveis do .env

const app = express(); // Inicializa o app Express

// Middlewares globais
app.use(cors()); // Permite requisições CORS (de outros domínios)
app.use(express.json()); // Permite ler JSON no corpo das requisições

// Conexão com o MongoDB usando a URI do .env
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("✅ MongoDB conectado"))
	.catch((err) => console.error("❌ Erro ao conectar no MongoDB:", err));

// Rotas da aplicação
app.use("/api/livros", livroRoutes); // CRUD de livros
app.get("/api/status", (req, res) => {
	// Rota de status para verificar se API está no ar
	res.status(200).json({ status: "API online 🚀" });
});

// Inicializa o servidor na porta configurada ou padrão 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🟢 Servidor rodando na porta ${PORT}`);
});
