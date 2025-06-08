const express = require("express");
const ExemplarController = require("../controllers/ExemplarController");
const router = express.Router();

// List all copies
router.get("/copies", ExemplarController.listExemplares);
// Create copy
router.post("/copies", ExemplarController.createExemplar);
// Get copy by ID
router.get("/copies/:id", ExemplarController.getExemplarById);
// Update copy
router.patch("/copies/:id", ExemplarController.updateExemplar);
// Delete copy
router.delete("/copies/:id", ExemplarController.deleteExemplar);

module.exports = router; 