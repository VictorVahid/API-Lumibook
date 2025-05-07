import Reserva from "../db/schemas/reservas.js";

export const createReserva = async (req, res) => {
	try {
		const newReserva = await Reserva.create(req.body);
		res.status(201).json(newReserva);
	} catch (error) {
		res.status(500).send(`Erro ao criar reserva: ${error}`);
	}
};

export const getAllReservas = async (req, res) => {
	try {
		const reservasAll = await Reserva.find()
			.populate("exemplar_id")
			.populate("usuario_id");
		res.json(reservasAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar reservas: ${error}`);
	}
};

export const getReservaById = async (req, res) => {
	try {
		const reserva = await Reserva.findById(req.params.id)
			.populate("exemplar_id")
			.populate("usuario_id");
		if (!reserva) return res.status(404).send("Reserva não encontrada");
		res.json(reserva);
	} catch (error) {
		res.status(500).send(`Erro ao buscar reserva: ${error}`);
	}
};

export const updateReserva = async (req, res) => {
	try {
		const update = await Reserva.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
			.populate("exemplar_id")
			.populate("usuario_id");
		if (!update) return res.status(404).send("Reserva não encontrada");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar reserva: ${error}`);
	}
};

export const deleteReserva = async (req, res) => {
	try {
		const deleted = await Reserva.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send("Reserva não encontrada");
		res
			.status(200)
			.json({
				message: "Reserva deletada com sucesso",
				deletedReserva: deleted,
			});
	} catch (error) {
		res.status(500).send(`Erro ao deletar reserva: ${error}`);
	}
};
