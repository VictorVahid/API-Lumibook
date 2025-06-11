const express = require("express");
const ReservationController = require("../controllers/ReservationController");
const router = express.Router();

// List all reservations
router.get("/", ReservationController.listReservations);
// Create reservation
router.post("/", ReservationController.createReservation);
// Get reservation by ID
router.get("/:id", ReservationController.getReservation);
// Update reservation
router.patch("/:id", ReservationController.patchReservationStatus);
// Delete reservation
router.delete("/:id", ReservationController.deleteReservation);
// Get reservations by user
router.get("/user/:userId", ReservationController.getReservationsByUser);
// Get reservations by book
router.get("/book/:bookId", ReservationController.getReservationsByBook);
// Reservation history
router.get("/history", ReservationController.getReservationHistory);
// Retirar reserva
router.post("/:id/retirar", ReservationController.retirarReserva);

module.exports = router; 