const express = require("express");
const BibliotecarioController = require("../controllers/BibliotecarioController");
const router = express.Router();

// Register librarian
router.post("/librarians", BibliotecarioController.createBibliotecario);

module.exports = router; 