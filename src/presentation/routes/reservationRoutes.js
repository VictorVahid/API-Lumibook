const express = require("express");
const resCtrl = require("../controllers/ReservationController");
const reservationRouter = express.Router();

reservationRouter.get("/reservations", resCtrl.listReservations);
reservationRouter.post("/reservations", resCtrl.createReservation);
reservationRouter.get("/reservations/:id", resCtrl.getReservation);
reservationRouter.patch("/reservations/:id", resCtrl.patchReservationStatus);
reservationRouter.delete("/reservations/:id", resCtrl.deleteReservation);
reservationRouter.get("/reservations/user/:userId", resCtrl.getReservationsByUser);
reservationRouter.get("/reservations/book/:bookId", resCtrl.getReservationsByBook);
reservationRouter.get("/reservations/historico", resCtrl.getReservationHistory);

module.exports = reservationRouter;
