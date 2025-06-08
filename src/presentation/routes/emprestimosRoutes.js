const express = require("express");
const router = express.Router();
const LoanController = require("../controllers/LoanController");

// Criar novo empréstimo
router.post("/emprestimos", LoanController.createLoan);

// Listar empréstimos
router.get("/emprestimos", LoanController.listLoans);

// Devolver empréstimo
router.put("/emprestimos/:id/devolucao", LoanController.returnLoan);

// Cancelar empréstimo
router.delete("/emprestimos/:id", LoanController.cancelLoan);

module.exports = router;
