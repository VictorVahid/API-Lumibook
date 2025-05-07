import Funcionario from "../db/schemas/funcionarios.js";

export const createFuncionario = async (req, res) => {
  try {
    const newFuncionario = await Funcionario.create(req.body);
    res.status(201).json(newFuncionario);
  } catch (error) {
    res.status(500).send(`Erro ao criar funcionário: ${error}`);
  }
};

export const getAllFuncionarios = async (req, res) => {
  try {
    const funcionariosAll = await Funcionario.find().populate("perfil_acesso_id");
    res.json(funcionariosAll);
  } catch (error) {
    res.status(500).send(`Erro ao buscar funcionários: ${error}`);
  }
};

export const getFuncionarioById = async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id).populate("perfil_acesso_id");
    if (!funcionario) return res.status(404).send("Funcionário não encontrado");
    res.json(funcionario);
  } catch (error) {
    res.status(500).send(`Erro ao buscar funcionário: ${error}`);
  }
};

export const updateFuncionario = async (req, res) => {
  try {
    const update = await Funcionario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("perfil_acesso_id");
    if (!update) return res.status(404).send("Funcionário não encontrado");
    res.json(update);
  } catch (error) {
    res.status(500).send(`Erro ao atualizar funcionário: ${error}`);
  }
};

export const deleteFuncionario = async (req, res) => {
  try {
    const deleted = await Funcionario.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Funcionário não encontrado");
    res.status(200).json({ message: "Funcionário deletado com sucesso", deletedFuncionario: deleted });
  } catch (error) {
    res.status(500).send(`Erro ao deletar funcionário: ${error}`);
  }
};
