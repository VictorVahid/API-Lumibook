const express = require("express");
const BookController = require("../controllers/BookController");
const router = express.Router();

// List works (alias for books)
router.get("/works", BookController.listBooks);
// Get work types
router.get("/works/types", (req, res) => res.json(["Book", "E-book", "Periodical"]));
// Get work categories
router.get("/works/categories", (req, res) => res.json(["Fiction", "Non-fiction", "Science", "History"]));
// Check duplicate
router.get("/works/check-duplicate", (req, res) => res.json({ exists: false }));

module.exports = router; 