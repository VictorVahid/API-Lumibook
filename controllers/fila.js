import fila from "../db/schemas/fila.js"; 



export const createFila = async (req, res) => {
	try {
		const novaSolicitacao = new SolicitacaoLivro(req.body);
		const solicitacaoSalva = await novaSolicitacao.save();
		res.status(201).json(solicitacaoSalva);
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};


export const getAllFilas = async (req, res) => {
	try {
		const solicitacoes = await SolicitacaoLivro.find()
			.populate("usuario_id", "nome email") 
			.populate("exemplar_id"); 
		res.json(solicitacoes);
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};


export const getFilaById = async (req, res) => {
	try {
		const solicitacao = await SolicitacaoLivro.findById(req.params.id)
			.populate("usuario_id", "nome email")
			.populate("exemplar_id");
		if (solicitacao) {
			res.json(solicitacao);
		} else {
			res.status(404).json({ mensagem: "Solicitação não encontrada" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};


export const updateFila = async (req, res) => {
	try {
		const solicitacaoAtualizada = await SolicitacaoLivro.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true } 
		)
			.populate("usuario_id", "nome email")
			.populate("exemplar_id");
		if (solicitacaoAtualizada) {
			res.json(solicitacaoAtualizada);
		} else {
			res.status(404).json({ mensagem: "Solicitação não encontrada" });
		}
	} catch (erro) {
		res.status(400).json({ mensagem: erro.message });
	}
};

export const deleteFila = async (req, res) => {
	try {
		const solicitacaoDeletada = await SolicitacaoLivro.findByIdAndDelete(
			req.params.id
		);
		if (solicitacaoDeletada) {
			res.status(204).send(); 
		} else {
			res.status(404).json({ mensagem: "Solicitação não encontrada" });
		}
	} catch (erro) {
		res.status(500).json({ mensagem: erro.message });
	}
};
