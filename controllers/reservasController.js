import Reserva from "../db/schemas/reservas.js";

export const createReserva = async (req, res) => {
	try {
		const novaReserva = new Reserva(req.body);
		const reservaSalva = await novaReserva.save();
		res.status(201).json(reservaSalva);
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const getAllReservas = async (req, res) => {
	try {
		const reservas = await Reserva.find()
			.populate("exemplar_id")
			.populate("usuario_id");
		res.json(reservas);
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const getReservaById = async (req, res) => {
	try {
		const reserva = await Reserva.findById(req.params.id)
			.populate("exemplar_id")
			.populate("usuario_id");
		if (reserva) {
			res.json(reserva);
		} else {
			res.status(404).json({ mensagem: "Reserva não encontrada" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const updateReserva = async (req, res) => {
	try {
		const reservaAtualizada = await Reserva.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (reservaAtualizada) {
			res.json(reservaAtualizada);
		} else {
			res.status(404).json({ mensagem: "Reserva não encontrada" });
		}
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const deleteReserva = async (req, res) => {
	try {
		const reservaDeletada = await Reserva.findByIdAndDelete(req.params.id);
		if (reservaDeletada) {
			res.status(204).send();
		} else {
			res.status(404).json({ mensagem: "Reserva não encontrada" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};
