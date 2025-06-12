const express = require("express");
const BookController = require("../controllers/BookController");
const router = express.Router();

// List works (alias for books)
router.get("/", BookController.listBooks);
// Get work types
router.get("/types", (req, res) => {
  res.json([
    "Livro",
    "Artigo",
    "Tese",
    "Dissertação",
    "Revista"
  ]);
});
// Get work categories
router.get("/categories", (req, res) => res.json([
  "Esportes",
  "Negócios",
  "Direito",
  "Política",
  "Educação",
  "Gastronomia",
  "Viagem",
  "Humor",
  "Drama",
  "Suspense",
  "Romance",
  "Aventura",
  "Biografia",
  "Ciência",
  "Tecnologia",
  "História",
  "Fantasia"
]));
// Check duplicate
router.get("/check-duplicate", (req, res) => res.json({ exists: false }));

module.exports = router; 