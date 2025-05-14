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

module.exports = router;
