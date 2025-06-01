const mongoose = require("mongoose");

const ExemplarSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  status: { type: String, enum: ["disponivel", "emprestado", "danificado"], default: "disponivel" }
});

const BookSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  ano: { type: Number, required: true },
  isbn: { type: String, required: true, unique: true },
  editora: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher", required: true },
  tipo: { type: String, enum: ["Livro", "E-book", "Periódico", "Tese"], required: true },
  categoria: { type: String, required: true },
  localizacao: { type: String, required: true },
  exemplares: [ExemplarSchema],
  disponivel: { type: Boolean, default: true },
  edicao: { type: String },
  idioma: { type: String },
  paginas: { type: Number },
  resumo: { type: String }
}, { timestamps: true });

BookSchema.virtual("exemplaresInfo").get(function() {
  const total = this.exemplares.length;
  const disponiveis = this.exemplares.filter(e => e.status === "disponivel").length;
  return { disponiveis, total };
});
BookSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Book", BookSchema); 