const express = require("express");
const LoanController = require("../controllers/LoanController");
const router = express.Router();

// Apenas rotas com handlers válidos
router.post("/", LoanController.createLoan);
router.get("/", LoanController.listLoans);
router.get("/ativos", LoanController.listUserActiveLoans);
router.get("/:id", LoanController.getLoan);
// Adicione outras rotas GET/PUT/DELETE conforme implementar no controller

module.exports = router; 