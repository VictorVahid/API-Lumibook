import ItemEmprestimo from "../db/schemas/itens_emprestimo.js";

export const createItemEmprestimo = async (req, res) => {
	try {
		const newItemEmprestimo = await ItemEmprestimo.create(req.body);
		res.status(201).json(newItemEmprestimo);
	} catch (error) {
		res.status(500).send(`Erro ao criar item de empréstimo: ${error}`);
	}
};

export const getAllItensEmprestimo = async (req, res) => {
	try {
		const itensEmprestimoAll = await ItemEmprestimo.find()
			.populate("emprestimo_id")
			.populate("exemplar_id");
		res.json(itensEmprestimoAll);
	} catch (error) {
		res.status(500).send(`Erro ao buscar itens de empréstimo: ${error}`);
	}
};

export const getItemEmprestimoById = async (req, res) => {
	try {
		const itemEmprestimo = await ItemEmprestimo.findById(req.params.id)
			.populate("emprestimo_id")
			.populate("exemplar_id");
		if (!itemEmprestimo)
			return res.status(404).send("Item de empréstimo não encontrado");
		res.json(itemEmprestimo);
	} catch (error) {
		res.status(500).send(`Erro ao buscar item de empréstimo: ${error}`);
	}
};

export const updateItemEmprestimo = async (req, res) => {
	try {
		const update = await ItemEmprestimo.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		)
			.populate("emprestimo_id")
			.populate("exemplar_id");
		if (!update)
			return res.status(404).send("Item de empréstimo não encontrado");
		res.json(update);
	} catch (error) {
		res.status(500).send(`Erro ao atualizar item de empréstimo: ${error}`);
	}
};

export const deleteItemEmprestimo = async (req, res) => {
	try {
		const deleted = await ItemEmprestimo.findByIdAndDelete(req.params.id);
		if (!deleted)
			return res.status(404).send("Item de empréstimo não encontrado");
		res
			.status(200)
			.json({
				message: "Item de empréstimo deletado com sucesso",
				deletedItemEmprestimo: deleted,
			});
	} catch (error) {
		res.status(500).send(`Erro ao deletar item de empréstimo: ${error}`);
	}
};
