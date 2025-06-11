const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
}, { timestamps: true, collection: "categorias" });

module.exports = mongoose.model("Category", CategorySchema); 