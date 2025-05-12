const express = require("express");
const resCtrl = require("../controllers/ReservationController");
const reservationRouter = express.Router();

reservationRouter.get("/reservas", resCtrl.listReservations);
reservationRouter.post("/reservas", resCtrl.createReservation);
reservationRouter.get("/reservas/:id", resCtrl.getReservation);
reservationRouter.patch("/reservas/:id/status", resCtrl.patchReservationStatus);
reservationRouter.delete("/reservas/:id", resCtrl.deleteReservation);

module.exports = reservationRouter;
