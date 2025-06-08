const express = require("express");
const AuthorController = require("../controllers/AuthorController");
const router = express.Router();

// List all authors
router.get("/authors", AuthorController.listAuthors);
// Create author
router.post("/authors", AuthorController.createAuthor);
// Get author by ID
router.get("/authors/:id", AuthorController.getAuthor);
// Update author
router.patch("/authors/:id", AuthorController.patchAuthor);
// Delete author
router.delete("/authors/:id", AuthorController.deleteAuthor);
// Search authors
router.get("/authors/search", AuthorController.searchAuthors);

module.exports = router; 