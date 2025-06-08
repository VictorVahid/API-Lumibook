const express = require("express");
const PublisherController = require("../controllers/PublisherController");
const router = express.Router();

// List all publishers
router.get("/publishers", PublisherController.listPublishers);
// Create publisher
router.post("/publishers", PublisherController.createPublisher);
// Get publisher by ID
router.get("/publishers/:id", PublisherController.getPublisher);
// Update publisher
router.patch("/publishers/:id", PublisherController.patchPublisher);
// Delete publisher
router.delete("/publishers/:id", PublisherController.deletePublisher);
// Search publishers
router.get("/publishers/search", PublisherController.searchPublishers);

module.exports = router; 