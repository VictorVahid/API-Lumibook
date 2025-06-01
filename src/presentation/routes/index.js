const express = require("express");
const router = express.Router();

router.use(require("./auditoriaRoutes"));
router.use(require("./authorRoutes"));
router.use(require("./bookRoutes"));
router.use(require("./publisherRoutes"));
router.use(require("./exemplarRoutes"));
router.use(require("./reservationRoutes"));
router.use(require("./fineRoutes"));
router.use(require("./notificationsRoutes"))
router.use(require("./userRoutes"));
router.use(require("./obrasRoutes"));
router.use(require("./adminRoutes"));
router.use(require("./editorasRoutes"));
router.use(require("./emprestimosRoutes"));
router.use(require("./estatisticasRoutes"));
router.use(require("./historicoRoutes"));

// Rota de health check para testar conexão com o backend
router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
