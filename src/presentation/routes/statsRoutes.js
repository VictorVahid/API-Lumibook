const express = require("express");
const EstatisticaController = require("../controllers/EstatisticaController");
const router = express.Router();

// Buscar estatísticas do usuário
router.get("/user/:userId", EstatisticaController.getUserStats);
// Atualizar estatística do usuário
router.put("/user/:userId/:statKey", EstatisticaController.atualizarEstatistica);

module.exports = router; 