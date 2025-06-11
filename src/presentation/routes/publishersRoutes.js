const express = require("express");
const PublisherController = require("../controllers/PublisherController");
const router = express.Router();

// List all publishers
router.get("/", PublisherController.listPublishers);
// Create publisher
router.post("/", PublisherController.createPublisher);
// Get publisher by ID
router.get("/:id", PublisherController.getPublisher);
// Update publisher
router.patch("/:id", PublisherController.patchPublisher);
// Delete publisher
router.delete("/:id", PublisherController.deletePublisher);
// Search publishers
router.get("/search", PublisherController.searchPublishers);

module.exports = router; 