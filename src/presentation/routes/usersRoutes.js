const express = require("express");
const UserController = require("../controllers/UserController");
const requireAuth = require("../../middlewares/requireAuth");
const router = express.Router();
const ReservationModel = require("../../infrastructure/mongoose/models/Reservation");
const FineModel = require("../../infrastructure/mongoose/models/Fine");

// Register
router.post("/register", UserController.createUser);
// Login
router.post("/login", UserController.login);
// List all users
router.get("/", UserController.listUsers);
// Get user profile (protegido)
router.get("/profile", requireAuth, UserController.getUser);
// Get user by ID
router.get("/:id", UserController.getUser);
// Get user avatar
router.get("/:id/avatar", UserController.getAvatar);
// Get user activities
router.get("/:id/activities", UserController.getUserActivities);
// Update user stats
router.put("/:userId/stats/:statKey", UserController.getUserStats);
// Reservas ativas do usuário
router.get("/:id/reservas-ativas", requireAuth, async (req, res) => {
  const reservas = await ReservationModel.find({ usuarioId: req.params.id, status: { $in: ["pendente", "ativa"] } }).populate("livroId");
  res.json(reservas.map(r => ({
    id: r._id,
    tituloLivro: r.livroId && r.livroId.title ? r.livroId.title : null,
    dataReserva: r.dataReserva,
    status: r.status
  })));
});
// Reservas histórico do usuário
router.get("/:id/reservas-historico", requireAuth, async (req, res) => {
  const reservas = await ReservationModel.find({ usuarioId: req.params.id, status: { $in: ["finalizada", "cancelada", "atendida"] } }).populate("livroId");
  res.json(reservas.map(r => ({
    id: r._id,
    tituloLivro: r.livroId && r.livroId.title ? r.livroId.title : null,
    dataReserva: r.dataReserva,
    status: r.status
  })));
});
// Multas pendentes do usuário
router.get("/:id/multas", requireAuth, async (req, res) => {
  const multas = await FineModel.find({ usuarioId: req.params.id, status: "pendente" });
  res.json(multas.map(m => ({
    id: m._id,
    valor: m.valor,
    motivo: m.descricao || m.motivo || "Atraso/Outro"
  })));
});
// Multas histórico do usuário
router.get("/:id/multas-historico", requireAuth, async (req, res) => {
  const multas = await FineModel.find({ usuarioId: req.params.id, status: "paga" });
  res.json(multas.map(m => ({
    id: m._id,
    valor: m.valor,
    motivo: m.descricao || m.motivo || "Atraso/Outro"
  })));
});

module.exports = router; 