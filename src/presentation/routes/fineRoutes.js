const express = require("express");
const fineCtrl = require("../controllers/FineController");
const fineRouter = express.Router();

fineRouter.get("/fines", fineCtrl.listFines);
fineRouter.post("/fines", fineCtrl.createFine);
fineRouter.get("/fines/:id", fineCtrl.getFine);
fineRouter.patch("/fines/:id/status", fineCtrl.patchFineStatus);
fineRouter.post("/fines/:fineId/pay", fineCtrl.payFine);
fineRouter.get("/fines/user/:userId", fineCtrl.getFinesByUser);
fineRouter.get("/fines/history/:userId", fineCtrl.getFineHistory);

module.exports = fineRouter;
