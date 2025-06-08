const express = require("express");
const statsRouter = express.Router();
const LoanModel = require("../../infrastructure/mongoose/models/Loan");
const ReservationModel = require("../../infrastructure/mongoose/models/Reservation");
const BookModel = require("../../infrastructure/mongoose/models/Book");

// Estatísticas de usuário
statsRouter.get("/stats/user/:userId", async (req, res) => {
	const { userId } = req.params;

	try {
		const loans = await LoanModel.countDocuments({ usuario: userId });
		const reservations = await ReservationModel.countDocuments({
			usuarioId: userId,
		});

		res.json({
			userId,
			totalLoans: loans,
			totalReservations: reservations,
		});
	} catch (error) {
		res.status(500).json({ error: "Erro ao obter estatísticas do usuário." });
	}
});

// Estatísticas globais do sistema
statsRouter.get("/stats/system", async (req, res) => {
	try {
		const totalLoans = await LoanModel.countDocuments();
		const totalReservations = await ReservationModel.countDocuments();
		const totalBooks = await BookModel.countDocuments();

		res.json({
			totalLoans,
			totalReservations,
			totalBooks,
		});
	} catch (error) {
		res.status(500).json({ error: "Erro ao obter estatísticas do sistema." });
	}
});

// Estatísticas por livro
statsRouter.get("/stats/book/:bookId", async (req, res) => {
	const { bookId } = req.params;

	try {
		const loanCount = await LoanModel.countDocuments({ livro: bookId });
		const reservationCount = await ReservationModel.countDocuments({
			livro: bookId,
		});

		res.json({
			bookId,
			loanCount,
			reservationCount,
		});
	} catch (error) {
		res.status(500).json({ error: "Erro ao obter estatísticas do livro." });
	}
});

module.exports = statsRouter;
