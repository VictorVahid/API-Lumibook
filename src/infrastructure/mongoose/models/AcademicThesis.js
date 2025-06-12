const mongoose = require("mongoose");

const AcademicThesisSchema = new mongoose.Schema({
  openAlexId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  authors: [{ type: String }],
  year: { type: Number },
  url: { type: String },
  type: { type: String },
  source: { type: String },
  extra: { type: Object },
}, { timestamps: true, collection: "academic_theses" });

module.exports = mongoose.model("AcademicThesis", AcademicThesisSchema); 