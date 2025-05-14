 // src/server.js
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // opcional: suprime warnings futuros de strictQuery
const app = require("./app");

const PORT = process.env.PORT || 3000;

mongoose
	.connect(process.env.MONGO_URI) // sem flags depreceadas
	.then(() => {
		console.log("MongoDB conectado");
		app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
	})
	.catch((err) => {
		console.error("Erro ao conectar no MongoDB:", err);
		process.exit(1);
	});

