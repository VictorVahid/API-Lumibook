const express = require("express");
const resCtrl = require("../controllers/ReservationController");
const reservationRouter = express.Router();

reservationRouter.get("/reservas", resCtrl.listReservations);
reservationRouter.post("/reservas", async (req, res) => {
  let { usuarioId, livroId, exemplarId, dataReserva } = req.body;
  if (!usuarioId) return res.status(400).json({ error: "usuarioId é obrigatório" });
  if (!exemplarId && livroId) {
    // Buscar exemplar disponível para o livroId (mock)
    exemplarId = "mockExemplarIdParaLivro_" + livroId;
  }
  if (!exemplarId) return res.status(400).json({ error: "É necessário informar exemplarId ou livroId válido" });
  if (!dataReserva) dataReserva = new Date().toISOString();
  // Aqui você salvaria no banco, por enquanto só retorna sucesso
  res.json({ success: true, data: { usuarioId, exemplarId, dataReserva }, message: "Reserva criada!" });
});
reservationRouter.get("/reservas/:id", resCtrl.getReservation);
reservationRouter.patch("/reservas/:id/status", resCtrl.patchReservationStatus);
reservationRouter.delete("/reservas/:id", resCtrl.deleteReservation);

module.exports = reservationRouter;
