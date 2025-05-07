import Emprestimo from "../db/schemas/emprestimos.js";
import ItemEmprestimo from "../db/schemas/itens_emprestimo.js"; // Importe o model de ItemEmprestimo

export const createEmprestimo = async (req, res) => {
	try {
		const newEmprestimo = await Emprestimo.create({
			usuario_id: req.body.usuario_id,
			data_devolucao_prevista: req.body.data_devolucao_prevista,
			observacoes: req.body.observacoes,
		});

		// Assumindo que req.body.exemplares é um array de ObjectIds de Exemplar
		if (req.body.exemplares && Array.isArray(req.body.exemplares)) {
			await Promise.all(
				req.body.exemplares.map(async (exemplarId) => {
					await ItemEmprestimo.create({
						emprestimo_id: newEmprestimo._id,
						exemplar_id: exemplarId,
					});
				})
			);
		}

		const emprestimoCompleto = await Emprestimo.findById(newEmprestimo._id)
			.populate("usuario_id")
			.populate({
				path: "itens",
				populate: { path: "exemplar_id", populate: "livro_id" },
			});

		res.status(201).json(emprestimoCompleto);
	} catch (error) {
		res.status(500).send(`Erro ao criar empréstimo: ${error}`);
	}
};

export const getAllEmprestimos = async (req, res) => {
	try {
		const emprestimosAll = await Emprestimo.find()
			.populate("usuario_id")
			.populate({
				path: "itens",
				populate: { path: "exemplar_id", populate: "livro_id" },
			});
		res.json(emprestimosAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar empréstimos: ${error}`);
	}
};

export const getEmprestimoById = async (req, res) => {
	try {
		const emprestimo = await Emprestimo.findById(req.params.id)
			.populate("usuario_id")
			.populate({
				path: "itens",
				populate: { path: "exemplar_id", populate: "livro_id" },
			});
		if (!emprestimo) return res.status(404).send("Empréstimo não encontrado");
		res.json(emprestimo);
	} catch (error) {
		res.status(500).send(`Erro ao buscar empréstimo: ${error}`);
	}
};

export const updateEmprestimo = async (req, res) => {
	try {
		const update = await Emprestimo.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
			.populate("usuario_id")
			.populate({
				path: "itens",
				populate: { path: "exemplar_id", populate: "livro_id" },
			});
		if (!update) return res.status(404).send("Empréstimo não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar empréstimo: ${error}`);
	}
};

export const deleteEmprestimo = async (req, res) => {
	try {
		const deleted = await Emprestimo.findByIdAndDelete(req.params.id);
		await ItemEmprestimo.deleteMany({ emprestimo_id: req.params.id }); // Remove itens relacionados
		if (!deleted) return res.status(404).send("Empréstimo não encontrado");
		res
			.status(200)
			.json({
				message: "Empréstimo deletado com sucesso",
				deletedEmprestimo: deleted,
			});
	} catch (error) {
		res.status(500).send(`Erro ao deletar empréstimo: ${error}`);
	}
};
