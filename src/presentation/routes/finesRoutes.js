const express = require("express");
const FineController = require("../controllers/FineController");
const router = express.Router();

// List all fines
router.get("/", FineController.listFines);
// Create fine
router.post("/", FineController.createFine);
// Get fine by ID
router.get("/:id", FineController.getFine);
// Update fine
router.patch("/:id", FineController.patchFineStatus);
// Pay fine
router.post("/:id/pay", FineController.payFine);
// Get fines by user
router.get("/user/:userId", FineController.getFinesByUser);
// Fine history
router.get("/history/:userId", FineController.getFineHistory);

module.exports = router; 