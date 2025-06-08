const express = require("express");
const router = express.Router();

const ExemplarController = require("../controllers/ExemplarController");

// Rotas para exemplares
router.post("/exemplares", ExemplarController.createExemplar);
router.get("/exemplares", ExemplarController.listExemplares);
router.get("/exemplares/:id", ExemplarController.getExemplarById);
router.put("/exemplares/:id", ExemplarController.updateExemplar);
router.delete("/exemplares/:id", ExemplarController.deleteExemplar);

module.exports = router;
