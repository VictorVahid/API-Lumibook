const express = require("express");
const AuditController = require("../controllers/AuditController");
const router = express.Router();

// List audit logs
router.get("/logs", AuditController.listLogs);

// Rota de auditoria (mock)
router.get("/", (req, res) => res.json({ logs: [] }));

module.exports = router; 