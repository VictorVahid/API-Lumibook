const express = require("express");
const auditCtrl = require("../controllers/AuditController");
const auditoriaRouter = express.Router();

auditoriaRouter.get("/auditoria/logs", auditCtrl.listLogs);
auditoriaRouter.get("/auditoria/logs/:id", auditCtrl.getLog);

module.exports = auditoriaRouter;
