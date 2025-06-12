const express = require("express");
const EstatisticaController = require("../controllers/EstatisticaController");
const router = express.Router();

// Atualizar estatística do usuário
router.put("/user/:userId/:statKey", EstatisticaController.atualizarEstatistica);

module.exports = router; 