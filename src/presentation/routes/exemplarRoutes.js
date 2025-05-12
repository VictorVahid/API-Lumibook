const express = require("express");
const exCtrl = require("../controllers/ExemplarController");
const exemplarRouter = express.Router();

exemplarRouter.get("/exemplares", exCtrl.listExemplars);
exemplarRouter.post("/exemplares", exCtrl.createExemplar);
exemplarRouter.get("/exemplares/:id", exCtrl.getExemplar);
exemplarRouter.patch("/exemplares/:id/status", exCtrl.patchExemplarStatus);
exemplarRouter.delete("/exemplares/:id", exCtrl.deleteExemplar);

module.exports = exemplarRouter;
