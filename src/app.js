const express = require("express");
const cors = require("cors");
const apiRoutes = require("./presentation/routes");

const app = express();

// Configurações de segurança e integração
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

// Middleware para permitir envio/recebimento de JSON
app.use(express.json());

// Rotas principais da API
app.use("/api", apiRoutes);

// Rota raiz opcional (útil para testes)
app.get("/", (req, res) => {
	res.send("🚀 API Lumibook está rodando!");
});

module.exports = app;
