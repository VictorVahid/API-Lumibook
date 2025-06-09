const express = require("express");
const router = express.Router();

// Users
router.use(require("./usersRoutes"));
// Librarians
router.use(require("./librariansRoutes"));
// Audit
router.use(require("./auditRoutes"));
// Books
router.use(require("./booksRoutes"));
// Works
router.use(require("./worksRoutes"));
// Copies
router.use(require("./copiesRoutes"));
// Authors
router.use(require("./authorsRoutes"));
// Publishers
router.use(require("./publishersRoutes"));
// Reservations
router.use(require("./reservationsRoutes"));
// Fines
router.use(require("./finesRoutes"));
// Stats
router.use(require("./statsRoutes"));
// Admin
router.use(require("./adminRoutes"));
// Categories
router.use(require("./categoriesRoutes"));

// Rota de health check para testar conexão com o backend
router.get("/", (req, res) => {
	res.json({ success: true, data: { status: "ok" }, error: null });
});

module.exports = router;
