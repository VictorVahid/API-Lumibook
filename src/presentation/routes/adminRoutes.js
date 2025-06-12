const express = require("express");
const BookController = require("../controllers/BookController");
const DashboardController = require("../controllers/DashboardController");
const router = express.Router();

// Catalog work (admin)
router.post("/works/catalog", BookController.createBook);
// Admin stats (mock)
router.get("/stats", (req, res) => res.json({ users: 100, books: 500, loans: 80 }));
// Admin activities (mock)
router.get("/activities", (req, res) => res.json([{ action: "login", user: "admin", date: new Date().toISOString() }]));
// Dashboard global
router.get("/dashboard", DashboardController.getDashboard);

module.exports = router; 