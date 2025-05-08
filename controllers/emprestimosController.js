import Emprestimo from "../db/schemas/emprestimos.js";

export const createEmprestimo = async (req, res) => {
	try {
		const novoEmprestimo = new Emprestimo(req.body);
		const emprestimoSalvo = await novoEmprestimo.save();
		res.status(201).json(emprestimoSalvo);
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const getAllEmprestimos = async (req, res) => {
	try {
		const emprestimos = await Emprestimo.find()
			.populate("usuario_id")
			.populate("itens.exemplar_id");
		res.json(emprestimos);
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const getEmprestimoById = async (req, res) => {
	try {
		const emprestimo = await Emprestimo.findById(req.params.id)
			.populate("usuario_id")
			.populate("itens.exemplar_id");
		if (emprestimo) {
			res.json(emprestimo);
		} else {
			res.status(404).json({ mensagem: "Empréstimo não encontrado" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};

export const updateEmprestimo = async (req, res) => {
	try {
		const emprestimoAtualizado = await Emprestimo.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (emprestimoAtualizado) {
			res.json(emprestimoAtualizado);
		} else {
			res.status(404).json({ mensagem: "Empréstimo não encontrado" });
		}
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const deleteEmprestimo = async (req, res) => {
	try {
		const emprestimoDeletado = await Emprestimo.findByIdAndDelete(
			req.params.id
		);
		if (emprestimoDeletado) {
			res.status(204).send();
		} else {
			res.status(404).json({ mensagem: "Empréstimo não encontrado" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};
