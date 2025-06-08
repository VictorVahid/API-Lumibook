const express = require("express");
const AuditController = require("../controllers/AuditController");
const router = express.Router();

// List audit logs
router.get("/audit/logs", AuditController.listLogs);

module.exports = router; 