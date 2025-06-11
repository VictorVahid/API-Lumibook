const express = require("express");
const router = express.Router();

// Users
router.use("/users", require("./usersRoutes"));
// Librarians
router.use("/librarians", require("./librariansRoutes"));
// Audit
router.use("/audit", require("./auditRoutes"));
// Books
router.use("/books", require("./booksRoutes"));
// Works
router.use(require("./worksRoutes"));
// Copies
router.use(require("./copiesRoutes"));
// Authors
router.use("/authors", require("./authorsRoutes"));
// Publishers
router.use("/publishers", require("./publishersRoutes"));
// Reservations
router.use("/reservations", require("./reservationsRoutes"));
// Loans
router.use("/loans", require("./loansRoutes"));
// Fines
router.use("/fines", require("./finesRoutes"));
// Stats
router.use(require("./statsRoutes"));
// Admin
router.use("/admin", require("./adminRoutes"));
// Categories
router.use("/categories", require("./categoriesRoutes"));

// Rota de health check para testar conexão com o backend
router.get("/", (req, res) => {
	res.json({ success: true, data: { status: "ok" }, error: null });
});

module.exports = router;
