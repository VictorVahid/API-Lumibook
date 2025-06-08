const express = require("express");
const FineController = require("../controllers/FineController");
const router = express.Router();

// List all fines
router.get("/fines", FineController.listFines);
// Create fine
router.post("/fines", FineController.createFine);
// Get fine by ID
router.get("/fines/:id", FineController.getFine);
// Update fine
router.patch("/fines/:id", FineController.patchFineStatus);
// Pay fine
router.post("/fines/:id/pay", FineController.payFine);
// Get fines by user
router.get("/fines/user/:userId", FineController.getFinesByUser);
// Fine history
router.get("/fines/history/:userId", FineController.getFineHistory);

module.exports = router; 