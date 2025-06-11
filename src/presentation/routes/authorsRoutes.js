const express = require("express");
const AuthorController = require("../controllers/AuthorController");
const router = express.Router();

// List all authors
router.get("/", AuthorController.listAuthors);
// Create author
router.post("/", AuthorController.createAuthor);
// Get author by ID
router.get("/:id", AuthorController.getAuthor);
// Update author
router.patch("/:id", AuthorController.patchAuthor);
// Delete author
router.delete("/:id", AuthorController.deleteAuthor);
// Search authors
router.get("/search", AuthorController.searchAuthors);

module.exports = router; 