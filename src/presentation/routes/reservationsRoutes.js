const express = require("express");
const ReservationController = require("../controllers/ReservationController");
const router = express.Router();

// List all reservations
router.get("/reservations", ReservationController.listReservations);
// Create reservation
router.post("/reservations", ReservationController.createReservation);
// Get reservation by ID
router.get("/reservations/:id", ReservationController.getReservation);
// Update reservation
router.patch("/reservations/:id", ReservationController.patchReservationStatus);
// Delete reservation
router.delete("/reservations/:id", ReservationController.deleteReservation);
// Get reservations by user
router.get("/reservations/user/:userId", ReservationController.getReservationsByUser);
// Get reservations by book
router.get("/reservations/book/:bookId", ReservationController.getReservationsByBook);
// Reservation history
router.get("/reservations/history", ReservationController.getReservationHistory);

module.exports = router; 