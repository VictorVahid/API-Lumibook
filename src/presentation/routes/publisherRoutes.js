const express = require("express");
const pubCtrl = require("../controllers/PublisherController");
const publisherRouter = express.Router();

publisherRouter.get("/editoras", pubCtrl.listPublishers);
publisherRouter.post("/editoras", pubCtrl.createPublisher);
publisherRouter.get("/editoras/:id", pubCtrl.getPublisher);
publisherRouter.put("/editoras/:id", pubCtrl.replacePublisher);
publisherRouter.patch("/editoras/:id", pubCtrl.patchPublisher);
publisherRouter.delete("/editoras/:id", pubCtrl.deletePublisher);

// Buscar editoras por nome
// publisherRouter.get("/editoras/buscar", pubCtrl.searchPublishers); // Adicionar se necessário

module.exports = publisherRouter;
