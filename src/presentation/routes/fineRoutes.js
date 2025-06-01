const express = require("express");
const fineCtrl = require("../controllers/FineController");
const fineRouter = express.Router();

fineRouter.get("/multas", fineCtrl.listFines);
fineRouter.post("/multas", fineCtrl.createFine);
fineRouter.get("/multas/:id", fineCtrl.getFine);
fineRouter.patch("/multas/:id/status", fineCtrl.patchFineStatus);
fineRouter.patch("/multas/:id/pagar", fineCtrl.payFine);

module.exports = fineRouter;
