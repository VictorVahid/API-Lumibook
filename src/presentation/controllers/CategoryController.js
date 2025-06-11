const CategoryModel = require("../../infrastructure/mongoose/models/Category");

exports.listCategories = async (req, res) => {
  try {
    const categorias = await CategoryModel.find().sort({ nome: 1 });
    res.json({ categorias });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome || typeof nome !== "string" || nome.trim().length < 2) {
      return res.status(400).json({ message: "Nome da categoria é obrigatório e deve ter pelo menos 2 caracteres." });
    }
    const exists = await CategoryModel.findOne({ nome: new RegExp(`^${nome}$`, "i") });
    if (exists) {
      return res.status(409).json({ message: "Categoria já existe." });
    }
    const nova = await CategoryModel.create({ nome });
    res.status(201).json(nova);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categoria = await CategoryModel.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }
    res.json(categoria);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}; 