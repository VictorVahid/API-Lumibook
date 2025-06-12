const express = require("express");
const ExemplarController = require("../controllers/ExemplarController");
const router = express.Router();

// List all copies
router.get("/", ExemplarController.listExemplares);
// Create copy
router.post("/", ExemplarController.createExemplar);
// Get copy by ID
router.get("/:id", ExemplarController.getExemplarById);
// Update copy
router.patch("/:id", ExemplarController.updateExemplar);
// Delete copy
router.delete("/:id", ExemplarController.deleteExemplar);

module.exports = router; 