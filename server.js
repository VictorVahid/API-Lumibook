import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Rotas
import livroRoutes from "./routes/livros.js";
import exemplaresRoutes from "./routes/exemplares.js";
import usuariosRoutes from "./routes/usuarios.js";
import emprestimosRoutes from "./routes/emprestimos.js";
import reservasRoutes from "./routes/reservas.js";
import multasRoutes from "./routes/multas.js";
import autoresRoutes from "./routes/autores.js";
import editorasRoutes from "./routes/editoras.js";
import funcionariosRoutes from "./routes/funcionarios.js";
import itensEmprestimoRoutes from "./routes/itensEmprestimo.js";
import livrosAutoresRoutes from "./routes/livrosAutores.js";
import auditoriaRoutes from "./routes/auditoria.js";

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
app.use("/api/exemplares", exemplaresRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/emprestimos", emprestimosRoutes);
app.use("/api/reservas", reservasRoutes);
app.use("/api/multas", multasRoutes);
app.use("/api/autores", autoresRoutes);
app.use("/api/editoras", editorasRoutes);
app.use("/api/funcionarios", funcionariosRoutes);
app.use("/api/itensEmprestimo", itensEmprestimoRoutes);
app.use("/api/livrosAutores", livrosAutoresRoutes);

app.use("/api/auditoria", auditoriaRoutes);

app.get("/api/status", (req, res) => {
	res.status(200).json({ status: "API online 🚀" });
});

// Inicializa o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🟢 Servidor rodando na porta: http://localhost:${PORT} `);
});
