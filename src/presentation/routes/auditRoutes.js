const express = require("express");
const AuditController = require("../controllers/AuditController");
const router = express.Router();

// List audit logs
router.get("/audit/logs", AuditController.listLogs);

// Rota de auditoria (mock)
router.get("/audit", (req, res) => {
  res.json({ logs: [] });
});

module.exports = router; 